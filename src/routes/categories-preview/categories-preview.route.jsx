import React, { Fragment, useContext } from 'react'
import { CategoriesContext } from '../../contexts/categoriescontexts'
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const {categories} = useContext(CategoriesContext);

    return (
        <Fragment>
            {
                Object.keys(categories).map((category) => {
                    const SingleCategory = categories[category]
                    return (
                        <CategoryPreview key={category} title={category} products={SingleCategory} />
                    )
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview