import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory()


    const handlePlaceOrder = () => {
        history.push('/shipment');
    }

    const handleRemoveProduct = (productKey) => {

        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);

        // fetch('',{
        //     method:'POST',
        //     headers:{ 
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(productKeys)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     setCart(data)
        // })

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key]
            return product
        })
        setCart(cartProducts);
    }, [])

    let thankYou ;
    if(orderPlaced){
        thankYou =  <img src={happyImage} alt="happyImag" />
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} product={pd} handleRemoveProduct={handleRemoveProduct} />)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <button onClick={handlePlaceOrder} className="btn btn-primary">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;