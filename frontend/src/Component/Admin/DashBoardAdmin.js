import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./DashBoardAdmin.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Line,Doughnut } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import { useDispatch, useSelector } from "react-redux";
import {  getAdminProduct } from "../../actions/productaction";
import { getAllOrders } from "../../actions/OrderAction";
import { getAllUsers } from "../../actions/UserAction";


const DashBoardAdmin = () => {

  const dispatch=useDispatch();
 const {products}=useSelector((state)=>state.products);
 const {orders}=useSelector((state)=>state.allOrders);
 const { users } = useSelector((state) => state.allUsers);
 let outOfStock = 0;

 products &&
   products.forEach((item) => {
     if (item.Stock === 0) {
       outOfStock += 1;
     }
   });
   let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });


 useEffect(()=>{
  dispatch(getAdminProduct())
  dispatch(getAllOrders());
  dispatch(getAllUsers());
 },[dispatch]);

  const lineCharts = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["blue"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutChartState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products&&products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders&&orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
       
        <div className="lineChart">
          <Line data={lineCharts} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutChartState} />
        </div>

      </div>
    </div>
  );
};

export default DashBoardAdmin;
