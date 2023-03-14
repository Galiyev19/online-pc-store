import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'



import './ProductDay.css'

const ProductDay = ({ bg }) => {


    const [productDay, setProductDay] = useState([])


    const products = useSelector(state => state.allProducts.allProducts)


    // GET RANDOM PRODUCT
    const getRandomProduct = () => {
        setProductDay(products[0])
        setInterval(() => {
            const index = Math.floor(Math.random() * (products.length));
            // console.log(products[index])
            setProductDay(products[index])
        }, 10000)
    }

    useEffect(() => {
        getRandomProduct()
    }, [products])

    return (
        <Link className='productDay__block' to={`/catalog/computers/${productDay?.id}`}>
            <div className="productDay__block_item">
                <h2 className='main_text_h2  text_color_black mb-2'>Товар дня</h2>
                <div className='d-flex flex-column mt-3'>
                    <div className='d-flex align-items-center justify-content-center mb-2'>
                        <img src={productDay?.img} className='img_card' />
                    </div>
                    <h2 className='main_text_h2 mb-2 mt-2 text_color_black'>{productDay?.price?.toLocaleString()} тенге</h2>
                    <p className='main_text_p mt-2 text_color_black'>{productDay?.title}</p>
                </div>
            </div>
        </Link>
    )

}

export default ProductDay
