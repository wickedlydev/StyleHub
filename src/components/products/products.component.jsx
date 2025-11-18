import { useContext } from 'react';
import Button from '../../components/button/button.component';
import './products.component.scss';
import { CartContext } from '../../contexts/cartcontexts';

const Products = ({products}) => {
    const {name, price, imageUrl} = products;
    console.log(name);
    const {AddItemstoCart} = useContext(CartContext);

    const onClickHandler = () => {
        AddItemstoCart(products);
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name}/>

            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>

            <Button label='Add to Cart' buttonType='inverted' onClick={onClickHandler}/>
        </div>
    )
}

export default Products;