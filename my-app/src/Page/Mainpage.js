import React from "react";
import "./Mainpage.css";

const MainPage = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetch("http://cozshopping.codestates-seb.link/api/v1/products?count=4")
          .then((res) => res.json())
          .then((data) => setProductData(data));
    }, []);

    return (
        <div>
        <div>
        <div>상품 리스트</div>
        <Product productData={productData} />
        </div>
        <div>
            <div>북마크 리스트</div>        
        </div>
        </div>
    )
}
