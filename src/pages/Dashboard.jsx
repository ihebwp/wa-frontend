import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import { Pie, Line, Bar } from "react-chartjs-2"; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
import './Dashboard.css';  // Import the CSS file

// Register the chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [commandCount, setCommandCount] = useState(0);  // New state for command count
  const [categoryData, setCategoryData] = useState([]); 
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [priceDistributionData, setPriceDistributionData] = useState([]);
  const [discountedVsNonDiscountedData, setDiscountedVsNonDiscountedData] = useState([]);
  const [commandCategoryData, setCommandCategoryData] = useState([]); 

  const navigate = useNavigate(); 

// Check if the user is an admin before rendering
useEffect(() => {
  const storedData = localStorage.getItem("user");
  console.log("Raw user from localStorage:", storedData);

  if (!storedData) {
    console.log("No user data in localStorage.");
    navigate("/login");
    return;
  }

  const parsedData = JSON.parse(storedData);
  const user = parsedData.user; // Access the `user` object within the parsed data
  console.log("Parsed user from localStorage:", user);

  if (user?.role !== "admin") {
    console.log("Access Denied: Not an admin");
    navigate("/login");
  } else {
    console.log("Access Granted: Admin role");
  }
}, [navigate]);




  // Fetch user stats from the backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/dashboard/user-stats")
      .then((response) => {
        setUserCount(response.data.userCount);
      })
      .catch((error) => console.error("Error fetching user stats:", error));
  }, []);

  // Fetch product stats from the backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/dashboard/product-stats")
      .then((response) => {
        setProductCount(response.data.productCount);
      })
      .catch((error) => console.error("Error fetching product stats:", error));
  }, []);

  // Fetch total number of commands
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/dashboard/commands/total")
      .then((response) => {
        setCommandCount(response.data.commandCount);  // Set command count
      })
      .catch((error) => console.error("Error fetching command count:", error));
  }, []);

  // Fetch product count by category
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/dashboard/product-count-by-category")
      .then((response) => {
        setCategoryData(response.data); 
      })
      .catch((error) => console.error("Error fetching category data:", error));
  }, []);

  // Fetch user growth over time
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/dashboard/user-growth")
      .then((response) => {
        setUserGrowthData(response.data); 
      })
      .catch((error) => console.error("Error fetching user growth data:", error));
  }, []);

    // NEW: Fetch Commands by Category
    useEffect(() => {
      axios.get("http://localhost:4000/api/dashboard/commands-by-category")
        .then((response) => setCommandCategoryData(response.data))
        .catch((error) => console.error("Error fetching command category data:", error));
    }, []);

  // Fetch product price distribution
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/dashboard/product-price-distribution")
      .then((response) => {
        setPriceDistributionData(response.data); 
      })
      .catch((error) => console.error("Error fetching price distribution data:", error));
  }, []);

  // Fetch discounted vs non-discounted product count
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/dashboard/discounted-vs-non-discounted")
      .then((response) => {
        setDiscountedVsNonDiscountedData(response.data); 
      })
      .catch((error) => console.error("Error fetching discounted vs non-discounted data:", error));
  }, []);

  // Handle "Return to Home" button click
  const handleReturnToHome = () => {
    navigate("/");  
  };

  // Prepare pie chart data
  const pieChartData = {
    labels: categoryData.map((category) => category._id),
    datasets: [
      {
        label: "Number of Products",
        data: categoryData.map((category) => category.count),
        backgroundColor: [
          "#3f51b5", 
          "#ff7043", 
          "#4caf50", 
          "#ffeb3b", 
          "#9c27b0",
        ],
      },
    ],
  };

   // Pie Chart Data: Commands by Category
   const commandCategoryChartData = {
    labels: commandCategoryData.map((status) => status._id),
    datasets: [
      {
        label: "Number of Commands",
        data: commandCategoryData.map((status) => status.count),
        backgroundColor: ["#ff5733", "#33ff57", "#3357ff", "#ff33a8", "#ffd633"], // Different colors
      },
    ],
  };

  // Prepare user growth over time chart data (line chart)
  const userGrowthChartData = {
    labels: userGrowthData.map((item) => `Month ${item._id}`),
    datasets: [
      {
        label: "User Growth Over Time",
        data: userGrowthData.map((item) => item.count),
        borderColor: "#3f51b5",
        fill: false,
        tension: 0.1,
        borderWidth: 4,  // Réduire la largeur de la ligne à 1px

      },
    ],
  };

  // Prepare price distribution chart data (bar chart)
  const priceDistributionChartData = {
    labels: priceDistributionData.map((item) => item._id),
    datasets: [
      {
        label: "Price Distribution",
        data: priceDistributionData.map((item) => item.count),
        backgroundColor: "#4caf50",
        borderWidth: 10,  // Réduire la largeur de la bordure

        
      },
    ],
  };

  // Prepare discounted vs non-discounted products chart data (bar chart)
  const discountedVsNonDiscountedChartData = {
    labels: ["Discounted", "Non-Discounted"],
    datasets: [
      {
        label: "Product Count",
        data: [
          discountedVsNonDiscountedData.discounted,
          discountedVsNonDiscountedData.nonDiscounted,
        ],
        backgroundColor: ["#ff7043", "#4caf50"],
        borderWidth: 17,  // Réduire la largeur de la bordure

      },
    ],
     
  };

  return (
    <div className="dashboard-container">
      {/* Return to Home Button */}
      <Box className="return-btn">
        <Button
          variant="contained"
          color="primary"
          onClick={handleReturnToHome}
        >
          Return to Home
        </Button>
      </Box>

      {/* Dashboard Header */}
      <Typography className="dashboard-header">Dashboard Admin</Typography>
      <Typography className="dashboard-description">
        "Manage users, products, and more from this centralized dashboard."
      </Typography>

      {/* Grid Layout for User/Product/Command Cards */}
      <Grid container spacing={4} className="grid-cards justify-content-center">
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{userCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">{productCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Commands Card */}
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Commands</Typography>
              <Typography variant="h4">{commandCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
     
      {/* Grid Layout for Charts */}
      <Grid container spacing={4} className="chart-grid">
        {/* Chart for Product Count by Category */}
        <Grid item xs={12} sm={6} md={6}>
          <div className="chart-container">
            <Typography variant="h5">Products by Category</Typography>
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
                maintainAspectRatio: false,
                cutout: "50%",

              }}
              style={{ height: '300px', width: '100%' }}
            />
          </div>
        </Grid>
         {/* NEW: Commands by Category Pie Chart */}
         <Grid item xs={12} sm={6} md={6}>
          <div className="chart-container">
            <Typography variant="h5">Commands by Status </Typography>
            <Pie data={commandCategoryChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </Grid>

        {/* User Growth Over Time Chart (Line Chart) */}
        <Grid item xs={12} sm={6} md={4}>
          <div className="chart-container">
            <Typography variant="h5">User Growth Over Time</Typography>
            <Line
              data={userGrowthChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
                maintainAspectRatio: false,
              }}
              style={{ height: '85%', width: '100%' }}
            />
          </div>
        </Grid>

        {/* Product Price Distribution Chart (Bar Chart) */}
        <Grid item xs={12} sm={6} md={4}>
          <div className="chart-container">
            <Typography variant="h5">Product Price Distribution</Typography>
            <Bar
              data={priceDistributionChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
                maintainAspectRatio: false,
              }}
              style={{ height: '85%', width: '100%' }}
            />
          </div>
        </Grid>

        {/* Discounted vs Non-Discounted Products (Bar Chart) */}
        <Grid item xs={12} sm={6} md={4}>
          <div className="chart-container">
            <Typography variant="h5">Discounted vs Non-Discounted Products</Typography>
            <Bar
              data={discountedVsNonDiscountedChartData}
              
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
                maintainAspectRatio: false,
              }}
              style={{ height: '85%', width: '100%'
                
               }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
