import './Shop.css'
import React, { useEffect, useState } from 'react'
import fakeData from '../../fakeData'
import Product from '../Product/Product'
import Cart from '../Cart/Cart'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const Shop = () => {
    // console.log(fakeData)
     const first10 = fakeData.slice(0, 20);// comment because data load to server not fake data
    const [products, setProducts] = useState(fakeData) // first10
    const [cart, setCart] = useState([])
    console.log(cart)

    // products data load to server
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(response => response.json())
    //         .then(data => setProducts(data))
    //         .catch(error => console.error(error));
    // }, [])


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys, products)
        if (products.length > 0) {
            const previousCart = productKeys.map(existingKey => {
                const product = fakeData.find(pd =>pd.key === existingKey)  //fakeData line
                // const product = products.find(pd => pd.key === existingKey);
                // product.quantity = savedCart[existingKey];
                return product;
            })
            setCart(previousCart)
        }

    }, [products])

    const handleAddProduct = (product) => {
        // console.log(`product`,product)
        let newCart = [...cart, product]
        setCart(newCart)
        const ToBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;

        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = sameProduct.quantity + count;
            const others = cart.filter(pd => pd.key !== ToBeAddedKey)
            newCart = [...others, sameProduct]
        } else {
            product.quantity = 1;
            newCart = [...cart, product]
        }


        addToDatabaseCart(product.key, count);
    }


    // title change 
    document.title = 'SHOP';

    return (
        <div className="twin-container">
            <div className="product-container">

                {
                    products.map(pd => <Product key={pd.key} product={pd} handleAddProduct={handleAddProduct} showAddToCart={true} />)
                }
            </div>
            <div className="card-container">

                <Cart cart={cart} >
                    <Link to="/review"><Button variant="primary">Review Order</Button></Link>

                </Cart>

            </div>

        </div>
    )
}

export default Shop;