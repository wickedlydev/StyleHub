import { useContext } from 'react';
import {ReactComponent as ShoppingBag} from '../../assets/shopping-bag.svg';
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