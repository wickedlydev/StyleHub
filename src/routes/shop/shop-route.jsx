import {Routes, Route} from 'react-router-dom'
import './shop-route.scss'
import CategoriesPreview from '../categories-preview/categories-preview.route'
import Category from '../category/category.route'

const Shop = () => {
    return (
        <Routes>
            <Route index path="/" element={<CategoriesPreview />} />
            <Route path="/:category" element={<Category />} />
        </Routes>
    )
}

export default Shop;