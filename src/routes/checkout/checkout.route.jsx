import React, { useContext } from 'react'
import './checkout.route.scss'
import { CartContext } from '../../contexts/cartcontexts'
import CheckOutItem from '../../components/checkout-item/checkout-item.component'

const Checkout = () => {
    const {cartItems, totalPrice} = useContext(CartContext);
    // console.log()

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) => (
                <CheckOutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <div className='total'>TOTAL: {totalPrice}</div>
        </div>
    )
}

export default Checkout

// What is a checkout page??

// Well, we want the cart items in here. so basically image, quantity,  name, price