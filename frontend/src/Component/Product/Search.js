import React, { Fragment, useState } from "react";
import "./Search.css";
import { useNavigate } from 'react-router-dom';
import MetaData from "../Layout/MetaData";
const Search = () => {
  let navigate = useNavigate();
  const [keyword, setKey] = useState("");

  const seacrhSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
        <div>
        <MetaData title="Search a product ---ShoopingStock" />
          <form className="searchBox" onSubmit={seacrhSubmit}>
            <div>
            <h2 className="SearchTitle">WHAT ARE YOU LOOKING FOR?</h2>
          
            </div>
            <input
              type="text"
              placeholder="Type to search ..."
              onChange={(e) => setKey(e.target.value)}
            />
            <input type="submit" value="Search" />
            
          </form>
          
        </div>
    
    </Fragment>
  );
};

export default Search;
