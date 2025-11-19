import { useContext } from 'react';
import ShoppingBag from '../../assets/shopping-bag.svg?react';
import './cart-icon.component.scss'
import { CartContext } from '../../contexts/cartcontexts';

const CartIcon = () => {
    const {cartOpen, setcartOpen, cartCount} = useContext(CartContext);

    const toggleCart = () => {
        setcartOpen(!cartOpen);
    }
    
    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingBag className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon