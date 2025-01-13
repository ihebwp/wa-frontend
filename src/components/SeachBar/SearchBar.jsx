import { useEffect, useState } from "react";
import "./searchbar.css";
import { getAllProducts } from "../../services/productService";

const SearchBar = ({ setFilterList }) => {
  const [searchWord, setSearchWord] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((response) => {
      if(response){

        setProducts(response);
      }else {
        setProducts([]);

      }
    });
  }, []);

  const handleChange = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchWord(input);
  };

  useEffect(() => {
    setFilterList(
      products.filter((item) =>
        item.productName.toLowerCase().includes(searchWord)
      )
    );
  }, [searchWord, products, setFilterList]);

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." value={searchWord} onChange={handleChange} />
      <ion-icon name="search-outline" className="search-icon"></ion-icon>
    </div>
  );
};

export default SearchBar;
