import axios from "axios";


//const API_URL = "https://backend-e-commerce-9fdb.onrender.com";
const API_URL = 'http://localhost:4000'


async function getAllProducts() {
  try {
    const response = await axios.get(API_URL + "/products");
    return response.data;
  } catch (error) {
    console.log('Error fetching all products:', error.message)
  }
}

async function getProductById(id) {
  try {
    const response = await axios.get(API_URL+`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
}

async function addProduct(formData) {
  try {
    const response = await axios.post(API_URL + '/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type for file upload
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

async function updateProduct(id, productData) {
  try {
    const response = await axios.put(API_URL + `/product/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
}



async function deleteProduct(id) {
  try {
    const response = await axios.delete(API_URL+`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
}

export { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct };