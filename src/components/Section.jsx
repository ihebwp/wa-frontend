import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";

const Section = ({ title, bgColor, productItems ,color }) => {
  const discountProds= productItems.filter((discProd)=> discProd.discount>"0%")
  const newProds= productItems.filter((newProd)=> newProd.newProduct ===true)
  return (
    <section style={{ background: bgColor, color }}>
      <Container>
        <div className="heading">
          <h1>{title}</h1>
        </div>
        {title === 'Promo'&& 
        <Row className="justify-content-center">
        
        {discountProds.map((productItem) => {
          return (
            <ProductCard
              key={productItem.id}
              title={title}
              productItem={productItem}
            />
          );
        })}
      </Row>
        }
        {title == 'Nouveaux Arrivés'&& 
        <Row className="justify-content-center">
        
        {newProds.map((productItem) => {
          return (
            <ProductCard
              key={productItem.id}
              title={title}
              productItem={productItem}
            />
          );
        })}
      </Row>
        }
        
        {title == 'Meilleures ventes'&& 
        <Row className="justify-content-center">
        
        {productItems.map((productItem) => {
          return (
            <ProductCard
              key={productItem.id}
              title={title}
              productItem={productItem}
            />
          );
        })}
      </Row>
        }
        
      </Container>
    </section>
  );
};

export default Section;
