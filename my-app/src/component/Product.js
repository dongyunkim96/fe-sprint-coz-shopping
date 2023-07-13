import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark, removeFromBookmark } from "../Store";
import { MdStar } from "react-icons/md";
import Modal from "./Modal";
import "./Product.css";

const productType = {
    PRODUCT: "Product",
    BRAND: "Brand",
    EXHIBITION: "Exhibition",
    CATEGORY: "Category",
};

const Product = ({ productData }) => {
    const dispatch = useDispatch();
    const getBookmarkArr = useSelector((state) => state.bookmarkItem);

    const [imgClicked, setImageClicked] = useState(false);
    const [imageTarget, setImageTarget] = useState("");
    const [imageName, setImageName] = useState("");

    const onClickBookmark = (item) => {
        if (Array.isArray(getBookmarkArr) && getBookmarkArr.some((bookmarkItem) => bookmarkItem.id === item.id)) {
            dispatch(removeFromBookmark(item));
            localStorage.setItem("bookmark", JSON.stringify(getBookmarkArr.filter((removeItem) => removeItem.id != item.id)));
        }
        else {
            dispatch(addToBookmark(item));
            localStorage.setItem("bookmark", JSON.stringify([...getBookmarkArr, item]));
        }
    };

    const imgClickHandler = (imageUrl, image_Name) => {
        setImageClicked(!imgClicked);
        setImageTarget(imageUrl);
        setImageName(image_Name);
    };

    return (
        <ul className="productList-Container">
            {productData.map((item, i) => {
                switch (item.type) {
                    case productType.PRODUCT:
                        return (
                            <li key={`${item.id}-${i}`}>
                                <div className="product-image">
                                    <img onClick={() => imgClickHandler(item.image_url, item.title)} src={item.image_url} />
                                    <MdStar className={Array.isArray(getBookmarkArr) && getBookmarkArr.some((bookmarkItem) => bookmarkItem.id === item.id) ? "starIcon Toggle" : "starIcon"} onClick={() => onClickBookmark(item)} />
                                </div>
                                <div className="product-info">
                                    <div>{item.title}</div>
                                    <div>{`${item.discountPercentage}%`}</div>
                                </div>
                                <div className="product-price">
                                    {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"}
                                </div>
                            </li>
                        );
                    case productType.BRAND:
                        return (
                            <li key={`${item.id}-${i}`}>
                                <div className="product-image">
                                    <img onClick={() => imgClickHandler(item.brand_image_url, item.brand_name)} src={item.brand_image_url} />
                                    <MdStar className={Array.isArray(getBookmarkArr) && getBookmarkArr.some((bookmarkItem) => bookmarkItem.id === item.id) ? "starIcon Toggle" : "starIcon"} onClick={() => onClickBookmark(item)} />
                                </div>
                                <div className="brand-info">
                                    <div>{item.brand_name}</div>
                                    <div>관심고객수</div>
                                </div>
                                <div className="brand-follower">
                                    {item.follower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </div>
                            </li>
                        );
                    case productType.EXHIBITION:
                        return (
                            <li key={`${item.id}-${i}`}>
                                <div className="product-image">
                                  <img
                                    onClick={() => imgClickHandler(item.image_url, item.title)}
                                    src={item.image_url}
                                  ></img>
                                  <MdStar
                                    className={
                                      Array.isArray(getBookmarkArr) &&
                                      getBookmarkArr.some(
                                        (bookmarkItem) => bookmarkItem.id === item.id
                                      )
                                        ? "starIcon Toggle"
                                        : "starIcon"
                                    }
                                    onClick={() => onClickBookmark(item)}
                                  />
                                </div>
                                <div className="exhibition-title">{item.title}</div>
                                <div className="exhibition-subtitle">{item.subtitle}</div>
                            </li>
                        );                     
                }
            })}
            {imgClicked && (
                <Modal
                  imgUrl={imageTarget}
                  imgName={imageName}
                  onClose={imgClickHandler} />
            )}
        </ul>
    );
};
export default Product;