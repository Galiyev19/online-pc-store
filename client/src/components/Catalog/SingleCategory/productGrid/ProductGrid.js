import React, {useEffect} from 'react'
import { motion } from "framer-motion"
import {  useDispatch} from "react-redux"
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

//import actions from redux
import { addShoppingCart } from '../../../../store/slices/shoppingCartSlice';

//import Bootstrap components
import Card from 'react-bootstrap/Card';

//import React icons
import {MdFavoriteBorder} from "react-icons/md"

import "./ProductGrid.css"


const ProductGrid = ({ products }) => {


    const dispatch = useDispatch()


    //ADD ITEM IN SHOPPING CART
    const addItem = (id) => {
        const idx = products.findIndex(item => item.id === id)
        dispatch(addShoppingCart(products[idx]))

    }





    return(
        <div className='grid-template-list'>
            {
                products.map(item => {
                    return(
                        <motion.div whileHover={{scale: 1.1}} transition={{duration: .5, }}  className="space-card-block h-100"  key={item.id}>
                            <Card  className="card_block pad-16 d-flex justify-content-around">
                                <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                                    <Card.Img variant="top" src={item.img}  className="w-100"/>
                                </div>
                                <Card.Body as={Link} className='mb-2 d-flex justify-content-end flex-column link'  to={`/catalog/${item.category}/${item.id}`} >
                                    <Card.Text className='fw-bold main_text'>{item.title}</Card.Text>
                                    <Card.Title>{item.price.toLocaleString()} тенге</Card.Title>
                                </Card.Body>
                                <div className='card__footer'>
                                    <button className="btn-hover color-1" onClick={() => addItem(item.id)}>В корзину</button>
                                    <MdFavoriteBorder className='icon_fav' />
                                </div>
                            </Card>
                        </motion.div>
                    )
                })
            }
        </div>
    )

}


export default ProductGrid;