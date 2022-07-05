import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import MetaData from "../Layout/MetaData";
import "./Home.css";
import { clearErrors, getAllProduct } from "../../actions/productaction";
import { useSelector, useDispatch } from "react-redux";
// import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import { useAlert } from "react-alert";

import Loader from "../Loading/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const alertmessage = useAlert();

  const { error, products, loading } = useSelector((state) => state.products);
 
 
  console.log(products);
  // const alert=useAlert();
  useEffect(() => {
    if (error) {
       alertmessage.error(error);
       dispatch(clearErrors);
    }

    dispatch(getAllProduct());
  }, [dispatch, error,alertmessage]);

  return (
    <Fragment>
      {loading ? (
        <Loader cards={5} />
      ) : (
        <>
          <MetaData title="ShoppingStock" />

          <div className="banner">
            <p>WELCOME TO SHOPPINGSTOCK</p>
            <h1>GRAB AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Home;
