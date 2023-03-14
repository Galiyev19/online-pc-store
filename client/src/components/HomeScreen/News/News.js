import React from 'react'

import {Card} from "react-bootstrap"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import './News.css'

const News = () => {


    //FOR REACT CAROUSEL
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
          }
    };

    const test = [1,2,3]
    return(
        <div className='news_block'>
            <h2>Новости</h2>
            <Carousel responsive={responsive} infinite={true} className='news_block_item'  >
                {
                    test.map(item => 
                        <Card  key={[item]} className="news_card">
                        <Card.Img variant="top" src='https://happycoding.io/images/stanley-1.jpg'  />
                        <Card.Body>
                            <Card.Title>Вакансия! Требуется контент-менеджер </Card.Title>
                            <Card.Text>Интернет-магазину V-COMP на постоянную работу, требуется контент-менеджер. Работа удаленно (на дому), не сложная...</Card.Text>
                        </Card.Body>
                        </Card>
                    )
                }
            </Carousel>
        </div>
    )
}


export default News;