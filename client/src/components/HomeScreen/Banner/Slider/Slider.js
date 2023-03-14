import React from 'react'

//import Bootstrap component
import Carousel from 'react-bootstrap/Carousel';

//import Style
import "./Slider.css"

const Slider = (props) => {

    const {data} = props


    return(
        <Carousel className='d-flex w-100' variant='dark'  interval='10000'> 
        {
            data.map((item) => {
                return<Carousel.Item key={item.id}  data-bs-interval="false">
                    <img src={item.url} className="slider_img" />
                    <Carousel.Caption className='slider_text_block'>
                        <h4 className='main_text_h5'>TEXT BANNER</h4>
                        <p className='main_text_p text-primary'>BANNER DESCRIPTION SMALL TEXT</p>
                    </Carousel.Caption>
                </Carousel.Item>;
            })}
    </Carousel>
    )
}

export default Slider;
