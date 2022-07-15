import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartActions';
import CartItemCard from './CartItemCard';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import { Typography } from "@material-ui/core";
import "./CartItems.css"
import { Link } from "react-router-dom";

const CartItem = () => {
  const dispatch=useDispatch();
  const {cartItems }=useSelector((state)=>state.cart);
  console.log(cartItems);

  const increaseQuantity=(id,quantity,stock)=>{

    if(quantity>=stock){
      return;
    }
    const qty=quantity+1;
    dispatch(addItemsToCart(id,qty));
  }
  const decreaseQuantity=(id,quantity,stock)=>{

    if(1>=quantity){
      return;
    }
    const qty=quantity-1;
    dispatch(addItemsToCart(id,qty));
  }
  const deleteCartItems=(id)=>{
    dispatch(removeItemsFromCart(id));
  }

  return (
    <Fragment>
    {cartItems.length === 0 ? (
      <div className="emptyCart">
        <RemoveShoppingCartIcon />

        <Typography>No Product in Your Cart</Typography>
        <Link to="/products">View Products</Link>
      </div>
    ) : (
      <Fragment>
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.product,
                        item.quantity,
                        item.stock
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartSubtotal">{`₹${
                  item.price * item.quantity
                }`}</p>
              </div>
            ))}

          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button >Check Out</button>
            </div>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default CartItem