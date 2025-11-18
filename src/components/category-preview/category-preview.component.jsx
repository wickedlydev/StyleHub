import React from 'react'
import Products from '../products/products.component';
import './category-preview.component.scss'
import { Link } from 'react-router-dom';

const CategoryPreview = ({title, products}) => {
    const PreviewComponents = products.slice(0, 4);
    console.log(PreviewComponents);
    return (
        <div className='category-preview-container'>
        <h2>
            <Link className='title' to={title}>{title.toUpperCase()}</Link>
        </h2>
        <div className='preview'>
            {
                PreviewComponents.map((product) => (
                    <Products key={product.id} products={product}/>
                ))
            }
        </div>
    </div>
    )
}

export default CategoryPreview