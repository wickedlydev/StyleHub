import './cartdropdown.component.scss';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cartcontexts';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';

const CartDropDown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate("/checkout");
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.length ? (
                    cartItems.map((item) => (
                        // console.log(item);
                        <CartItem key={item.id} item={item} />
                    ))
                ) : (
                    <span className='empty-message'>Cart Is Empty</span>
                )}
            </div>
            <Button label='Buy' buttonType='inverted' onClick={goToCheckout}/>
        </div>
    )
}

export default CartDropDown;