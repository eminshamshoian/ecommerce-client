import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({ product }) => {
    return (
        <div class='card-deck px-3 py-4'>
            <div class='card homepage-card'>
                <ShowImage
                    className='card-img-top'
                    item={product}
                    url='product'
                />
                <div class='card-body px-3'>
                    <h4>{product.name}</h4>
                    {/* <p>{product.description}</p> */}
                    <p className='card-price'>${product.price}</p>
                    <p>
                        {product.quantity === 0 ? (
                            'Out of Stock'
                        ) : (
                            <p className='in-stock'>In-Stock</p>
                        )}
                    </p>
                    <Link to='/'>
                        <button className='view-product-button'>View</button>
                    </Link>
                    <button className='add-cart-button mx-3'>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
