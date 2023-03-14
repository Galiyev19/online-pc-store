import React, { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";

//GET DATA FROM FIREBASE ONLY BANNER
import { db } from '../../../firebase'

//IMPORT COMPONENTS
import Slider from './Slider/Slider';
import ProductDay from './ProductDay/ProductDay';

import { Container } from 'react-bootstrap';

import './Banner.css'

const Banner = ({ bg }) => {

    const [data, setData] = useState([])

    //GET DATA FROM FIREBASE ONLY BANNER *** ЗАБЫЛ ПЕРЕНЕСТИ ЭТИ ДАННЫЕ НА СВОЙ СЕРВЕР
    const getData = async () => {
        const colRef = collection(db, 'banners')

        const snapshots = await getDocs(colRef)

        const docs = snapshots.docs.map((item) => {
            const response = item.data()

            response.id = item.id

            return response

        })

        setData(docs)

    }

  
    
    useEffect(() => {
        getData()
    }, [])


    return (
        <Container className='d-flex flex-row' fluid={true}>
            <div className='banner_container'>
                {/* SLIDER BLOCK */}
                <Slider data={data} className="w-50" />

                {/* \PRODUCT DAY BLOCK*/}
                <ProductDay bg={bg} />
            </div>
        </Container>
    )
}

export default Banner;