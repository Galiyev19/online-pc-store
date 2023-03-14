import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'


//import Actions from Redux
import { addShoppingCart } from '../../../store/slices/shoppingCartSlice';
import {addFavorite} from "../../../store/slices/favoriteSlice";

//import components
import Partners from './Partners/Partners';

//import Bootstrap components
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

//import React icons

import { MdFavoriteBorder } from "react-icons/md"

import Carousel from 'react-multi-carousel';

//import style for this components
import "./BestSellers.css"



const BestSellers = ({ bg }) => {

    //FOR REACT CAROUSEL
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 4,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 632, min: 420 },
            items: 1,
            slidesToSlide: 1
        }
    };


    const [randomProducts, setRandomProducts] = useState([])
    const dispatch = useDispatch()

    const products = useSelector(state => state.allProducts.allProducts)
    const favorites = useSelector(state => state.favorites.favorites)


    //RANDOM PRODUCT FOR LIST
    const getRandomProduct = () => {
        const arr = []
        products.forEach((item, index) => {
            if (index <= 20) {
                const index = Math.floor(Math.random() * (products.length));
                arr.push(products[index])
            }

            setRandomProducts(arr)
        })
    }

    //ADD TO SHOPPING CART
    const addItem = (id) => {
        const idx = products.findIndex(item => item.id === id)
        dispatch(addShoppingCart(products[idx]))
    }

    //ADD TO FAVORITE LIST
    const addItemFavorite = (id) => {
        const idx = products.findIndex(item => item.id === id)
        dispatch(addFavorite(products[idx]))
    }

    useEffect(() => {

        getRandomProduct()

    }, [products])


    return (
        <div className='d-flex w-100 flex-column position-relative'>
            <h2 >Хиты продаж</h2>
            <Carousel responsive={responsive} className='best_sellers_block'  >
                {/* PRODUCT LIST*/}
                {
                    randomProducts.map(item =>
                            <Card key={item.id} style={{ width: '18rem' }} className="bestSellers__card" >
                                <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                                    <Card.Img variant="top" src={item.img} />
                                </div>
                                <Card.Body className='mb-2 link' as={Link} to={`/catalog/${item.category}/${item.id}`}>
                                    <Card.Text className='main_text_p'>
                                        {item.title}
                                    </Card.Text>
                                    <Card.Title className='main_text_h5'>{item.price.toLocaleString()} тенге</Card.Title>
                                </Card.Body>
                                <div className='card__footer'>
                                    <button className="btn-hover color-1" onClick={() => addItem(item.id)}>В корзину</button>
                                    <MdFavoriteBorder
                                        onClick={() => addItemFavorite(item.id)}
                                        className={favorites.find(fav => fav.id === item.id ) ? "icon_fav_red" : 'icon_fav'}
                                    />
                                </div>
                            </Card>
                    )
                }
            </Carousel>
            {/*PARTNERS LIST*/}
            <Container fluid={true} className="my-5 w-100">
                <h2 className='mb-2'>Партнеры</h2>
                <Partners />
            </Container>

        </div>
    )


}

export default BestSellers;