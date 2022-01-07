import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PopularProducts = () => {
  const [PopularProducts, setPopularProducts] = useState([]);
  const [visible, setVisible] = useState(3);
  const [buttonToggle, setButtonToggle] = useState(false);

  const showMoreItems = () => {
    setButtonToggle(!buttonToggle);
    setVisible((prevValue) => prevValue + 3);
  };

  const showLessItems = () => {
    setButtonToggle(!buttonToggle);
    setVisible((prevValue) => prevValue - 3);
  };

  useEffect(() => {
    const getFeaturedProducts = async () => {
      const response = await axios
        .get("https://classibazaar.com.au/api/deal/popular_deals")
        .catch((err) => {
          console.log(err);
        });
        setPopularProducts(response.data);
    };
    getFeaturedProducts();
  }, []);

  return (
    <>
      <h2 className="featuredTitle">Popular</h2>
      <div className="span" />
      <div className="featuredProducts">
        {PopularProducts.slice(0, visible).map((product) => (
          <div className="productCard" key={product.id}>
            <Link to="/details" className="link">
            <img src={product.image.thumbnail} alt="" />
            <div className="productCardBottom">
              <div className="productCardLeft">
                <p>{product.dealstitle}</p>
                <p className="ellipsis">{product.subtitle}</p>
              </div>
              <div className="productCardRight">
                <p>{product.discount}% OFF</p>
                <p>${product.product_price}</p>
                <p>${product.actual_price}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
      {buttonToggle ? (
        <button className="showMore" onClick={showLessItems}>
          See less
        </button>
      ) : (
        <button className="showMore" onClick={showMoreItems}>
          See more
        </button>
      )}
    </>
  );
};

export default PopularProducts;
