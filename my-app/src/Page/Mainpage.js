import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "../component/Product";
import { MdOutlineCommentsDisabled } from "react-icons/md";
import "./Mainpage.css";

const MainPage = () => {
    const [productData, setProductData] = useState([]);
    const getBookmarkArr = useSelector((state) => state.getBookmarkItem);

    useEffect(() => {
        fetch("http://cozshopping.codestates-seb.link/api/v1/products?count=4")
          .then((res) => res.json())
          .then((data) => setProductData(data));
    }, []);

    return (
        <div className="wrapper">
          <div className="contentWrapper">
            <div className="content">
                <div className="product-list">
                    <div className="product-title">Product List</div>
                    <Product productData={productData} />
                </div>
                <div className="product-list bookmark-list">
                  <div className="bookmark-title">Bookmarked List</div>
                  {getBookmarkArr ? (
                    <Product className="bookmark-product" productData={getBookmarkArr.slice(0, 4)} />) : (<MdOutlineCommentsDisabled className="nodataImage" />
                  )}
                </div>                
            </div>
          </div>
        </div> 
        
    )
}
export default MainPage;