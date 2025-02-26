import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const CommandList = () => {
  const [commands, setCommands] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null); // Store the logged-in user's ID
  const [updatedStatuses, setUpdatedStatuses] = useState({}); // Store updated statuses
  const [selectedProducts, setSelectedProducts] = useState([]); // Store selected products

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user")); // Retrieve the entire object
    const user = storedData?.user; // Access the `user` part from the object

    // Check if the user object exists and has an admin role
    if (!user || user.role !== "admin") {
      navigate("/login"); // Redirect to login if user is not admin or doesn't exist
    } else {
      setIsAdmin(true); // User is admin, so set isAdmin to true
      setUserId(user._id); // Set the user ID
    }

    const fetchCommands = async () => {
      try {
        let response;
        if (isAdmin) {
          response = await axios.get("http://localhost:4000/commands");
        } else {
          response = await axios.get(`http://localhost:4000/commands/user/${userId}`);
        }
        setCommands(response.data); // Update state with commands data
      } catch (error) {
        console.error("Error fetching commands:", error);
      }
    };

    if (isAdmin) {
      fetchCommands(); // Fetch commands if admin
    }
  }, [isAdmin, userId, navigate]);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setUpdatedStatuses((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const handleDeleteCommand = async (id) => {
    if (!window.confirm("Are you sure you want to delete this command?")) return;

    try {
      await axios.delete(`http://localhost:4000/command/${id}`);

      // Mise à jour de l'état après suppression
      setCommands((prevCommands) =>
        prevCommands.filter((command) => command.idCommand !== id)
      );

      console.log("Command deleted successfully!");
    } catch (error) {
      console.error("Error deleting command:", error);
    }
  };

  // Save status update to the backend
  const handleSaveStatus = async (id) => {
    try {
      const newStatus = updatedStatuses[id];
      if (!newStatus) return;

      await axios.put(`http://localhost:4000/command/${id}/status`, { status: newStatus });

      setCommands((prevCommands) =>
        prevCommands.map((command) =>
          command.idCommand === id ? { ...command, status: newStatus } : command
        )
      );

      // Clear updated status
      setUpdatedStatuses((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });

      console.log("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Function to handle "Add New Command" button click
  const handleAddNewCommand = () => {
    navigate("/shop"); // Redirect to /shop
  };

  // Function to show details of products in a command
  const handleShowDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/command/${id}/products`);
      setSelectedProducts(response.data);
      alert(`Produits : ${response.data.map((p) => p.name).join(", ")}`);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits :", error);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Liste des Commandes
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="command table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell sx={{ color: "white" }}>ID Commande</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Utilisateur
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Nombre de Produits
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Prix Total
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Statut
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commands.map((command) => (
              <TableRow key={command.idCommand}>
                <TableCell component="th" scope="row">
                  {command.idCommand || "N/A"}
                </TableCell>
                <TableCell align="right">{command.userName || "N/A"}</TableCell>
                <TableCell align="right">{command.numberOfProducts || 0}</TableCell>
                <TableCell align="right">
                  {command.prixTotal ? `${command.prixTotal} DNT` : "0 DNT"}
                </TableCell>
                <TableCell align="right">
                  <Select
                    value={updatedStatuses[command.idCommand] || command.status}
                    onChange={(e) => handleStatusChange(command.idCommand, e.target.value)}
                    size="small"
                  >
                    {["pending", "confirmed", "shipped", "delivered", "cancelled"].map(
                      (status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveStatus(command.idCommand)}
                    disabled={!updatedStatuses[command.idCommand]} // Disable button if no change
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleDeleteCommand(command.idCommand)}
                  >
                    Delete
                  </Button>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/shop")}>
          Go for Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default CommandList;
