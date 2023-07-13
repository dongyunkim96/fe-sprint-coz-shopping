import React, { useCallback, useEffect, useState } from "react";
import "./Productpage.css";
import Product from "../component/Product";
import ProductCategory from "../component/ProductCategory";
import { useInView } from "react-intersection-observer";

const PRODUCTCOUNT = 10;
const TOTAL_PRODUCTS = 100;

const ProductPage = () => {
    const bookmark = [];
    const [productList, setProductList] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categoryType, setCategoryType] = useState("All");
    const [isLoading, setIsLoading] = useState(false);
    const [ref, inView] = useInView();

    const productFetch = useCallback((startIndex) => {
        setIsLoading(true);
        fetch("http://cozshopping.codestates-seb.link/api/v1/products")
          .then((res) => res.json())
          .then((data) => {
            const filteredData = data.slice(startIndex, startIndex + PRODUCTCOUNT);

            setProductList((prevList) => {
                const existingIds = prevList.map((product) => product.id);
                const filteredProducts = filteredData.filter((product) => !existingIds.includes(product.id));
            return [...new Set([...prevList, ...filteredProducts])];
            });
            setIsLoading(false);
          });
    }, []);

    useEffect(() => {
        if (inView && productList.length <= TOTAL_PRODUCTS) {
            const startIndex = productList.length;
            productFetch(startIndex);
        }
        else {
            return;
        }
    }, [inView, productFetch, productList.length, isLoading]);

    useEffect(() => {
        if (categoryType === "All") {
            setFiltered(productList);
        }
        else {
            setFiltered(productList.filter((product) => product.type === categoryType));
        }
    }, [categoryType, productList]);

    useEffect(() => {
        if (productList.length === 0) {
            productFetch();
        }
    }, [productFetch]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            productFetch();
        }
    }, [productFetch]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const setCategory = (type) => {
        setCategoryType(type);
    };

    return (
        <div className="wrapper">
            <div className="category-container">
                <ProductCategory setCategory={setCategory} />
            </div>
            <div className="category-product-list">
                <Product className="productPage-product" productData={categoryType === "All" ? productList : filtered} getBookmarkItem={bookmark} />
            </div>
            {isLoading && productList.length < TOTAL_PRODUCTS && (<div>Loading...</div>)}
        </div>
    );
};
export default ProductPage;