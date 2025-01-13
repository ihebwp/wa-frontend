import React, { useState } from "react";
import { TextField, Modal, Button, Box, Typography, MenuItem, FormControl, Select, FormHelperText } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/productService.js";
import { DarkModeContext } from "../../contexte/index.jsx";

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

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
  });
  const [imgUrl, setimgUrl] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useContext(DarkModeContext)
  const [loading, setLoading] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onChange = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileChange = (e) => {
    setimgUrl(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();


    reader.onloadstart = () => setLoading(true);
    reader.onload = (e) => {
      const content = e.target.result;

      setLoading(false);
      // You can process the file content here, such as parsing it for calculator input
    };

    reader.readAsText(file);

  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("productName", productData.productName);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      formData.append("discount", productData.discount);
      formData.append("newProduct", productData.newProduct);
      formData.append("imgUrl", imgUrl);
      await addProduct(formData);

      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <Button
        color="info"
        variant="contained"
        onClick={handleOpen}
        style={{ marginLeft: "50px",backgroundColor:darkMode ? '#0f3460' : '#fff',color:darkMode ? '#fff' : 'black' }}
      >
        Add product
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ mb: "25px", fontWeight: "bold" }}>
            Add new product
          </Typography>
          <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
            <Box sx={{ mb: "15px" }}>
              <TextField
                sx={{ width: "100%", p: "5px" }}
                id="outlined-basic"
                name="productName"
                label="Product Name"
                variant="outlined"
                onChange={onChange}
                required
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                sx={{ width: "100%", p: "5px" }}
                id="outlined-basic"
                name="price"
                label="Price"
                variant="outlined"
                onChange={onChange}
                required
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                sx={{ width: "100%", p: "5px" }}
                id="outlined-basic"
                name="category"
                label="Category"
                variant="outlined"
                onChange={onChange}
                required
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                sx={{ width: "100%", p: "5px" }}
                id="outlined-basic"
                name="description"
                label="Description"
                variant="outlined"
                onChange={onChange}
                required
              />
            </Box>
          
            <Box sx={{ mb: "15px" }}>
              <TextField
                sx={{ width: "100%", p: "5px" }}
                id="outlined-basic"
                name="discount"
                label="discount"
                variant="outlined"
                onChange={onChange}
              />
            </Box>
            <Box sx={{ mb: "15px" }}>
              <TextField
                sx={{ width: "100%", p: "5px" }}
                id="outlined-basic"
                name="newProduct"
                label="newProduct"
                variant="outlined"
                onChange={onChange}
              />
                {/* <FormControl sx={{ p: '5px', minWidth: '100%' }}>
        <Select
         
          onChange={onChange}
          name="newProduct"
          displayEmpty
          inputProps={{ 'aria-label': 'New product' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Yes</MenuItem>
          <MenuItem value={20}>No</MenuItem>
        </Select>
        <FormHelperText>New product</FormHelperText>
      </FormControl> */}
            </Box>
          
            <input
              sx={{ width: "100%" }}
              type="file"
              name="imgUrl"
              label="Image"
              variant="outlined"
              onChange={onFileChange}
            />
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
              <Button
                color="success"
                variant="contained"
                type="submit"
                sx={{ width: "85px" }}
              >
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
