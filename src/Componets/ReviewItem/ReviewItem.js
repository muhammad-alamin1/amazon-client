import React from 'react';

const ReviewItem = (props) => {
    console.log(props)
    const {img, name,quantity,key,price} = props.product

    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'150px'
    
    }

    return (
        <div style={reviewItemStyle} className="review-item">
            <img src={img} alt="" />
            <h4 className="product-name">{name}</h4>
            <p >Quantity : {quantity}</p>
            <p>Price : {price}</p>
            <button className="btn btn-primary" onClick={() =>props.handleRemoveProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;