import React, { useContext, useState } from "react";
import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"; // Importer useSelector
import { addToCart } from "../../app/features/cart/cartSlice";
import { DarkModeContext } from "../../contexte";
import EditProductModal from "../modals/editProduct";
import { deleteProduct } from "../../services/productService";
import Swal from 'sweetalert2'

const ProductCard = ({ title, productItem }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const router = useNavigate();
  const { user } = useSelector((state) => state.auth); // Utiliser useSelector

  const handleClick = () => {
    router(`/shop/${productItem._id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    await deleteProduct(productItem._id);
    window.open("/shop");
  
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < Number(productItem.reviews[0].rating); i++) {
      stars.push(<i className="fa fa-star" key={i}></i>);
    }
    return stars;
  };

  return (
    <Col
      style={{
        color: darkMode ? "#000" : "#fff",
        backgroundColor: darkMode ? "#fff" : "#000",
      }}
      md={3}
      sm={5}
      xs={10}
      className="product mtop"
    >
      {title === "Promo" && (
        <span
          style={{
            color: darkMode ? "#fff" : "#000",
            backgroundColor: darkMode ? "#000" : "gold",
          }}
          className="discount"
        >
          {productItem.discount}%Off
        </span>
      )}
      <img
        loading="lazy"
        onClick={handleClick}
        //src={`https://backend-e-commerce-9fdb.onrender.com/uploads/${productItem.imgUrl}`}
        //  src={productItem.imgLink}
        src={`http://localhost:4000/uploads/${productItem.imgUrl}`}
               //alt={selectedProduct?.productName}
      />
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={handleClick}>{productItem.productName}</h3>
        <div className="rate">{productItem.reviews[0] && renderStars()}</div>
        <div className="price">
          <h4
            style={{
              color: darkMode ? "#000" : "#fff",
            }}
          >
            {productItem.price} DNT
          </h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={handleAddToCart}
          >
            <ion-icon name="add"></ion-icon>
          </button>
          {user?.user?.role === "admin" && ( // Utiliser === au lieu de ==
            <>
              <button aria-label="Edit" className="edit" onClick={handleEdit}>
                <ion-icon name="pencil-outline"></ion-icon>
              </button>
              <button
                aria-label="Delete"
                className="delete"
                onClick={handleDelete}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </>
          )}
        </div>
      </div>
      {showEditModal && ( // Afficher le composant modal seulement si showEditModal est vrai
        <EditProductModal
          open={showEditModal}
          handleClose={() => setShowEditModal(false)}
          product={productItem}
        />
      )}
    </Col>
  );
};

export default ProductCard;
