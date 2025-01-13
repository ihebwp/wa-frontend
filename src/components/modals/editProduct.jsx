import React, { useState } from "react";
import { TextField, Modal, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../services/productService.js";

const EditProductModal = ({ open, handleClose, product }) => {
  const [editedProductData, setEditedProductData] = useState({ ...product });
  const [imgUrl, setImgUrl] = useState(product.imgUrl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setEditedProductData({
      ...editedProductData,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e) => {
    setImgUrl(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", editedProductData.productName);
      formData.append("price", editedProductData.price);
      formData.append("category", editedProductData.category);
      formData.append("description", editedProductData.description);
      formData.append("discount", editedProductData.discount);
      formData.append("newProduct", editedProductData.newProduct);
      formData.append("imgUrl", imgUrl);

      await updateProduct(product._id, formData);

      navigate("/");
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 5,
        }}
      >
        <Typography sx={{ mb: "25px", fontWeight: "bold" }}>
          Edit Product
        </Typography>
        <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
          <TextField
            sx={{ width: "100%", mb: "15px" }}
            id="productName"
            name="productName"
            label="Product Name"
            variant="outlined"
            value={editedProductData.productName}
            onChange={onChange}
          />
          <TextField
            sx={{ width: "100%", mb: "15px" }}
            id="price"
            name="price"
            label="Price"
            variant="outlined"
            value={editedProductData.price}
            onChange={onChange}
          />
          <TextField
            sx={{ width: "100%", mb: "15px" }}
            id="category"
            name="category"
            label="Category"
            variant="outlined"
            value={editedProductData.category}
            onChange={onChange}
          />
          <TextField
            sx={{ width: "100%", mb: "15px" }}
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            value={editedProductData.description}
            onChange={onChange}
          />
          <TextField
            sx={{ width: "100%", mb: "15px" }}
            id="discount"
            name="discount"
            label="Discount"
            variant="outlined"
            value={editedProductData.discount}
            onChange={onChange}
          />
          <TextField
            sx={{ width: "100%", mb: "15px" }}
            id="newProduct"
            name="newProduct"
            label="New Product"
            variant="outlined"
            value={editedProductData.newProduct}
            onChange={onChange}
          />
         
          <input
            sx={{ width: "100%", mb: "15px" }}
            type="file"
            name="imgUrl"
            label="Image"
            variant="outlined"
            onChange={onFileChange}
          />
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
  );
};

export default EditProductModal;
