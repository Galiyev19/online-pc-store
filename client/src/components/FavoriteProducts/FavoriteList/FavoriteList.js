import React from 'react'
import {Link} from "react-router-dom";

import {MdFavoriteBorder} from "react-icons/md";
import Card from "react-bootstrap/Card";

import "./FavoriteList.css"

const FavoriteList = ({ favoriteList }) => {

    return(
        <>
            {
                favoriteList.map(item =>
                    <Card key={item.id} style={{ width: '18rem' }} className="fav_card_block">
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
                            <button className="btn-hover color-1">В корзину</button>
                            <MdFavoriteBorder className="icon_fav_red"/>
                        </div>
                    </Card>
                )
            }
        </>
    )
}

export default FavoriteList;