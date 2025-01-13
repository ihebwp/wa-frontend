import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import "./product-review.css";
import Rating from "../Rating.jsx";
import { DarkModeContext } from "../../contexte/index.jsx";

const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");
  const [userRating, setUserRating] = useState(0);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  return (
    <section  style={{
      color: darkMode ? "#000" : "#fff",
      backgroundColor: darkMode ? "#fff" : "#000",
    }} className="product-reviews">
      <Container>
        <ul>
          <li
            style={{color: darkMode ? "#000" : "#fff", }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{color: darkMode ? "#000" : "#fff", }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({selectedProduct?.reviews.length})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p><strong>{selectedProduct?.description}</strong></p>
        ) : (
          <div className="rates">
            <div className="rate-comment">
              <h3>Product Rating</h3>
              <p>Your Rating: {userRating}</p>
              <Rating
                initialRating={userRating}
                maxRating={5}
                onRatingChange={handleRatingChange}
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;
