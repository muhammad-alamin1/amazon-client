/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart
    // console.log(props)
    const total = cart.reduce((total , item) =>total + item.price,0);
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price * product.quantity
        
    // }

    let shipping = 0;
    if (total > 35) {
        shipping = 0
    }
    else if (total > 15) {
        shipping = 4.99
    }
    else if (total > 0) {
        shipping = 12.99
    }

    const tax = Math.round(total / 10)

    const formateNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision);
    }

    return (
        <div>

            <h3 className="text-primary">Order Summary</h3>
            <p>Items Ordered       : {cart.length}</p>
            <p>Product Price       : {formateNumber(total)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + VAT    : {formateNumber(tax)}</small></p>
            <p>Total Price         : {formateNumber(total + shipping + tax)}</p>
            {
                props.children
            }
            
        </div>
    )
}
export default Cart