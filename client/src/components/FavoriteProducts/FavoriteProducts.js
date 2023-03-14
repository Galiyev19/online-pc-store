import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

//IMPORT ACTIONS FROM REDUX
import {clearFav} from "../../store/slices/favoriteSlice";

//IMPORT BOOTSTRAP COMPONENTS
import { Container } from 'react-bootstrap'

//IMPORT LOCALE COMPONENTS
import FavoriteList from "./FavoriteList/FavoriteList";

//IMPORT STYLE
import "./FavoriteProducts.css"

const FavoriteProducts = ({ bg }) => {

    const favorites = useSelector(state => state.favorites.favorites)
    const dispatch = useDispatch()
    // console.log(favorites)

    useEffect(() => {
        console.log(favorites)
    }, [favorites])

    return (
        <Container fluid={true} className={!bg ? ['favorite_products_container','bg-white','light_mode'] : ['favorite_products_container','bg-dark','dark_mode']}>
            <section className="favorite_products_container__offset">
                <div className="d-flex justify-content-between">
                    <h1 className="home_catalog_list_test">Избранное</h1>
                    <span className="main_text_span link" onClick={() => dispatch(clearFav())}>Очистить</span>
                </div>
                {
                    favorites.length === 0
                    ?
                        <div className="d-flex w-100">
                            <h5 className="fw-normal text_color">Список избранных элементов пуст</h5>
                        </div>
                    :
                        null
                }

                <div className="d-flex card_list">
                    <FavoriteList favoriteList={favorites}/>
                </div>
            </section>
        </Container>
    )
}

export default FavoriteProducts;