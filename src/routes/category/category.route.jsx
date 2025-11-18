import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../contexts/categoriescontexts';
import Products from '../../components/products/products.component';
import './category.route.scss'

const Category = () => {
    const {category} = useParams();
    const {categories} = useContext(CategoriesContext);

    // The reason we will be using useState now, is because if we reload the page
    // /shop/hats page then the categories object won't be populated till the asynchronous call is completed.
    // we can still work without useState in this scenario

    // console.log(category)
    // return (
    //     <div className='category-container'>
    //         <h2 className='category-title'>{category.toUpperCase()}</h2>
    //         {
    //             categories[category] && categories[category].map((product) => (
    //                 <Products key={product.id} products={product} />
    //             ))
    //         }
    //     </div>
    // )

    const [products, setproducts] = useState(categories[category]);

    useEffect(() => {
        setproducts(categories[category]);
    }, [categories, category]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products && products.map((product) => (
                        <Products key={product.id} products={product} />
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Category