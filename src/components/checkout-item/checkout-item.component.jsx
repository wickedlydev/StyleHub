import React, { useContext } from 'react'
import './checkout-item.component.scss';
import { CartContext } from '../../contexts/cartcontexts';

const CheckOutItem = ({cartItem}) => {
    const {imageUrl, name, price, quantity} = cartItem;
    const {RemoveItemsfromCart, AddItemstoCart, RemoveItemfromCheckOut} = useContext(CartContext);

    return (
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl} alt={name} />
        </div>

        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={() => RemoveItemsfromCart(cartItem)}>
                &#10094;
            </div>
        <span className='value'>{quantity}</span>
            <div className='arrow' onClick={() => AddItemstoCart(cartItem)}>
                &#10095;
            </div>
      </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={() => RemoveItemfromCheckOut(cartItem)}>&#10005;</div>
    </div>
    )
}

export default CheckOutItem