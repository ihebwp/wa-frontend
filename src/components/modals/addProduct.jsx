import React, { useEffect, useState, useContext } from "react";
import { 
  TextField, Modal, Button, Box, Typography, MenuItem, 
  FormControl, Select, FormHelperText 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/productService.js";
import { DarkModeContext } from "../../contexte/index.jsx";
import axios from "axios";  

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};

const allowedCategories = [
  "Computing", "Phones", "Storage", "Printing", "Multimedia", 
  "Appliances", "Security", "Office",
];

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
    discount: "",
    newProduct: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]); 
  const navigate = useNavigate();
  const [darkMode] = useContext(DarkModeContext);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChange = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    setProductData((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data: ", productData);

    try {
      const formData = new FormData();
      formData.append("productName", productData.productName);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      formData.append("discount", productData.discount);
      formData.append("newProduct", productData.newProduct);

      if (selectedFile) {
        formData.append("imgUrl", selectedFile);
      }

      await addProduct(formData);
      handleClose();
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Button
        color="info"
        variant="contained"
        onClick={handleOpen}
        style={{
          marginLeft: "50px",
          backgroundColor: darkMode ? "#0f3460" : "#fff",
          color: darkMode ? "#fff" : "black",
        }}
      >
        Add product
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ mb: "25px", fontWeight: "bold" }}>
            Add new product
          </Typography>
          <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
            <Box sx={{ mb: "15px" }}>
              <TextField
                fullWidth
                name="productName"
                label="Product Name"
                variant="outlined"
                onChange={onChange}
                required
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                fullWidth
                name="price"
                label="Price"
                variant="outlined"
                onChange={onChange}
                required
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <FormControl fullWidth required>
                <Select
                  name="category"
                  value={productData.category}
                  onChange={handleCategoryChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Choose a Category</em>
                  </MenuItem>
                  {allowedCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Category</FormHelperText>
              </FormControl>
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                onChange={onChange}
                required
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                fullWidth
                name="discount"
                label="Discount"
                variant="outlined"
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                fullWidth
                name="newProduct"
                label="New Product"
                variant="outlined"
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <input type="file" name="imgUrl" onChange={onFileChange} />
            </Box>
            {loading && <div>Loading...</div>}
            <Box sx={{ textAlign: "end" }}>
              <Button
                color="error"
                variant="outlined"
                sx={{ mr: "15px", width: "85px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button color="success" variant="contained" type="submit" sx={{ width: "85px" }}>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProduct;
