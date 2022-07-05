import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllProduct } from "../../actions/productaction";
import Product from "../Home/Product";
import "./Allproducts.css";
import Loader from "../Loading/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"
import { Rating } from "@material-ui/lab";

const categories=[
  "Laptop",
  "SmartPhones",
  "Jeans",
  "T-Shirt",
  "Footwear",
  "Camera",
  "Shirt"
];
const options = {
  size: "large",
  value: 1,
  readOnly: true,
  precision: 0.5,
};

const AllProducts = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0,50000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = React.useState(0);

  const { products, loading, error,ProductCount,resultPerPage,filteredProductsCount} = useSelector(
    (state) => state.products
  );

 

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    console.log(e);
    setCurrentPage(e);
  };

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getAllProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch, alert, error, keyword,currentPage,price,category,ratings]);


  let FileredCount=filteredProductsCount;

  
  return (
  
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Categories</Typography>
                <hr></hr>
                <ul className="">
                  {categories.map((category)=>(
                    <li className="category-link"
                    key={category}
                    onClick={()=>setCategory(category)}
                    
                    >{category}</li>
                  ))}
                </ul>

                
                <Typography>Filter by price</Typography>
                <hr></hr>
                <Slider
                 value={price}
                 onChange={handleChange}
                 valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                aria-label="Small steps"
                 min={0}
                 max={50000}
                />
                 <Typography component="legend">Filter by rating</Typography>
                <hr></hr>
                <Rating 
                 name="simple-controlled"
                 value={ratings}
                 onChange={(event, newValue) => {
                   setRatings(newValue);
                 }}
                />
          </div>
         
         {
          resultPerPage<FileredCount && (
            <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={ProductCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
          )
         }
         
       
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllProducts;
