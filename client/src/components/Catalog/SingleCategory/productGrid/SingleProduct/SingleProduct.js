import React, { useState ,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'


//import Bootstrap components
import { Container } from "react-bootstrap";

//import actions from redux
import { addShoppingCart } from "../../../../../store/slices/shoppingCartSlice"


import "./SingleProduct.css"

const SingleProduct = ({ bg }) => {

    //PRODUCT LIST
    const [product, setProduct] = useState(null)

    //ID for send on server
    const { id } = useParams();
    const dispatch = useDispatch()

    //DATA FROM REDUX
    const products = useSelector(state => state.allProducts.allProducts)

    //GET SINGLE PRODUCT INFO
    const getSinlgeProduct = async () => {
        const response = await fetch(`/products/${id}`)
        const data = await response.json()
        setProduct(data)
    }


    //ADD ITEM TO SHOPPING CART
    const addItem = (id) => {
        const idx = products.findIndex(item => item.id === id)
        dispatch(addShoppingCart(products[idx]))
    }

    useEffect(() => {
        getSinlgeProduct()
    }, [products])

    return (
        <Container fluid={true} className={!bg ? ['single_category_container', 'bg-white'] : ['single_category_container', 'bg-dark']}>
            <section className="single_category_offset">
                <div className='main_singleProduct'>
                    <div className='main_singleProduct_img_block'>
                        <img src={product?.img} className="w-75 h-75" />
                    </div>
                    <div className='main_singleProduct_info_block'>
                        <h2 className='mb-5'>{product?.title}</h2>
                        <div className='main_singleProduct_info_block__item'>
                            <div className='d-flex flex-column w-50 p-2'>
                                <span className='mb-2'>Гарантия - 12 месяцов</span>
                                {!product?.brand ? "" : <span className='mb-2'>Производитель - {product?.brand}</span>}
                                {!product?.CPU ? "" : <span className='mb-2'>Процессор - {product?.CPU}</span>}
                                {!product?.GPU ? "" : <span className='mb-2'>Видеокарта - {product?.GPU}</span>}
                                {!product?.RAM ? "" : <span className='mb-2'>Оперативная память - {product?.RAM}</span>}
                                {!product?.SSD ? "" : <span className='mb-2'>SSD - {product?.SSD}</span>}
                                {!product?.motherBoard ? "" : <span className='mb-2'>Материнская платка - {product?.motherBoard}</span>}
                                {!product?.size ? "" : <span className='mb-2'>Объем памяти - {product?.size}</span>}
                                {!product?.type ? "" : <span className='mb-2'>Тип памяти - {product?.type}</span>}
                                {!product?.display ? "" : <span className='mb-2'>Экран - {product?.display}</span>}
                                {!product?.refresh ? "" : <span className='mb-2'>Макс. частота обновления экрана (Гц) - {product?.refresh} Гц</span>}
                                {!product?.model ? "" : <span className='mb-2'>Модель - {product?.model} Гц</span>}
                            </div>
                            <div className='main_singleProduct_info_block__btn'>
                                <h2>{(product?.price)?.toLocaleString()} тенге</h2>
                                <button className="btn-hover color-1 w-100" onClick={() => addItem(product?.id)}>В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <h5>Описание</h5>
                    <p className='main_text_p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tempor nec feugiat nisl. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Porttitor massa id neque aliquam vestibulum morbi blandit. Quam adipiscing vitae proin sagittis nisl. Ultrices eros in cursus turpis. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Odio eu feugiat pretium nibh ipsum consequat nisl. Tincidunt praesent semper feugiat nibh sed pulvinar. Consectetur lorem donec massa sapien faucibus. Vitae ultricies leo integer malesuada nunc vel.</p>
                </div>
                <div className='d-flex flex-column'>
                    <h5>Особенности</h5>
                    <p className='main_text_p'>
                        -Urna molestie at elementum eu facilisis sed odio morbi. In dictum non consectetur a erat nam at.
                    </p>
                    <p className='main_text_p'>
                        -Pellentesque habitant morbi tristique senectus et netus et. Mollis aliquam ut porttitor leo a diam sollicitudin.
                    </p>
                    <p className='main_text_p'>
                        -Posuere lorem ipsum dolor sit. Elementum nisi quis eleifend quam.
                    </p>
                    <p className='main_text_p'>
                        -Facilisis gravida neque convallis a cras semper auctor neque vitae. Consectetur lorem donec massa sapien faucibus.
                    </p>
                </div>
            </section>
        </Container>
    )
}

export default SingleProduct;