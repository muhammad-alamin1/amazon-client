import './Product.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Product = (props) => {
    // console.log(props)
    const {img,name,seller,price,stock,key} = props.product
    return (
        <div className="product">
            <div>
                <img className="images" src={img} alt='product'/>
            </div>
            <div >
                <h4 className="product-name"><Link to={'/product/'+key}>{name}</Link></h4>
                <p>by: {seller}</p>
                <p><strong>$ {price}</strong></p>
                <p>only {stock} left stock -order soon </p>

                {props.showAddToCart &&   <button onClick={() =>props.handleAddProduct(props.product)} type="button" className="btn btn-primary"><FontAwesomeIcon icon={faShoppingCart} />add to card</button>}
            </div>
        </div>
    )
}

export default Product