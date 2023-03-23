import React from 'react'
import { Link } from 'react-router-dom'
import CategoryCard from '../CategoryCard/CategoryCard'
import "./CategoryPreview.css"

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="mt-5">
      <div>
            <Link to={`/category/${title}`} className="text-decoration-none">
              <h2 className='title1'>
                {title.toUpperCase()}
              </h2>
            </Link>
            <div className=" row ">
                {products?.filter((_, i) => i < 4).map((product) => (
                    <CategoryCard key={product.id} products={product} />
                ))}
            </div>
            <Link to={`/category/${title}`} className="text-decoration-none"><p className="explore">Explore More</p></Link>
      </div>
    </div>
  )
}

export default CategoryPreview