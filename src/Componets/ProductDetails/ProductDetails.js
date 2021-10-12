import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    // const [product , setProduct] = useState({});

    // useEffect(() => {
    //     fetch('http://localhost:5000/product/' + productKey)
    //         .then((response) =>response.json())
    //         .then((data) =>setProduct(data))
    //         .catch((error) =>console.error(error));
    // },[productKey])
    const [loading , setLoading] =  useState(true)
    const product = fakeData.find(pd =>pd.key === productKey)
    console.log(product)


     // title change 
    document.title = 'Product Detail';
    return (
        <div>
            <Product showAddToCart = {false}  product={product}  />
        </div>
    );
};


export default ProductDetails;