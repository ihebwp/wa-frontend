import Select from "react-select";
import { useContext, useState } from "react";
import { DarkModeContext } from "../contexte";

const FilterSelect = ({ setFilterList, products }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [darkMode] = useContext(DarkModeContext); 

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption.value === "all") {
      setFilterList(products); // Show all products
    } else {
      const minPrice = selectedOption.value.min;
      const maxPrice = selectedOption.value.max;
      const filteredProducts = products.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
      setFilterList(filteredProducts);
    }
  };

  const options = [
    { value: "all", label: "All" },
    { value: { min: 0, max: 100 }, label: "0 - 100" },
    { value: { min: 101, max: 200 }, label: "101 - 200" },
    { value: { min: 201, max: 300 }, label: "201 - 300" },
    // Add more ranges as needed
  ];

  // Custom styles for dark mode
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? '#0f3460' : '#fff',
      color: darkMode ? "#fff" : "#000",
      borderRadius: "5px",
      border: "none",
      boxShadow: "none",
      width: "200px",
      height: "40px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? (darkMode ? "#3a3a3a" : "#0f3460") : "#0f3460",
      color: state.isSelected ? (darkMode ? "#fff" : "black") : (darkMode ? "#fff" : "white"),
      "&:hover": {
        backgroundColor: darkMode ? "#3a3a3a" : "#3a3a3a",
        color: darkMode ? "#fff" : "#fff",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: darkMode ? "#fff" : "#000",
    }),
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      placeholder="Filter By Price "
      onChange={handleChange}
      styles={customStyles} // Apply custom styles
    />
  );
};

export default FilterSelect;
