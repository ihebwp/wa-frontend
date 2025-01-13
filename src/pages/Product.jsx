import { Fragment, useContext, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getAllProducts } from "../services/productService";
import { DarkModeContext } from "../contexte";
import Appbar from "../components/Appbar";

const Product = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const [selectedProduct, setSelectedProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState();

  useEffect(() => {
    getAllProducts().then((a) => {
      setProducts(a);

      window.scrollTo(0, 0);
      for (let i = 0; i < a.length; i++) {
        if (a[i]._id === id) {
          setSelectedProduct(a[i]);
        }
      }
      // setSelectedProduct(
      //   a.filter((item) => parseInt(item._id) === parseInt(id))
      // );
      setRelatedProducts(
        products.filter(
          (item) =>
            item.productName === selectedProduct?.productName &&
            item._id !== selectedProduct?._id
        )
      );
    });
  }, []);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Appbar />
      {products.length > 0 && (
        <>
          <Banner title={selectedProduct?.productName} />
          <ProductDetails selectedProduct={selectedProduct} />
          <ProductReviews selectedProduct={selectedProduct} />
          <section
            style={{
              color: darkMode ? "#000" : "#fff",
              backgroundColor: darkMode ? "#fff" : "#000",
            }}
            className="related-products"
          >
            <Container>
              <h3>You might also like</h3>
            </Container>
            <ShopList productItems={relatedProducts} />
          </section>
        </>
      )}
    </Fragment>
  );
};

export default Product;
