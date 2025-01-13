import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useContext, useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { getAllProducts } from "../services/productService";
import AddProduct from "../components/modals/addProduct.jsx";
import { useSelector } from "react-redux";
import { DarkModeContext } from "../contexte/index.jsx";
import Appbar from './../components/Appbar';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    getAllProducts().then((a) => {
      if(a){
        setProducts(a);
      setFilterList(a); // Initialize filterList with all products
      }
     
    });
  }, []);

  useWindowScrollToTop();

  return (
    <Fragment>
      <Appbar />
      <Banner title="Products" />
      <section
        style={{
          color: darkMode ? "#000" : "#fff",
          backgroundColor: darkMode ? "#fff" : "#000",
        }}
        className="filter-bar"
      >
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect  setFilterList={setFilterList} products={products} />
            </Col>
            <Col md={4}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
            {user?.user?.role === "admin" && (
              <Col md={4}>
                <AddProduct />
              </Col>
            )}
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
