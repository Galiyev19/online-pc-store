import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
//BOOTSTRAP COMPONENTS
import { Container } from 'react-bootstrap'
//MUI COMPONENTS
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
//REACT ICONS
import { AiFillCheckCircle } from 'react-icons/ai'
//REDUX
import { clearShoppingCart } from '../../store/slices/shoppingCartSlice';
import { addOrder } from '../../store/slices/orderSlice';

import './Order.css'

const Order = ({ bg }) => {

    const [id, setId] = useState('')
    const [data, setData] = useState(null)
    //DATA FROM INPUT FOR ORDER
    const [delivery, setDelivery] = useState("Самовывоз из магазина")
    const [pay, setPay] = useState("Наличными при полученииe")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [addressDelivery, setAddressDelivery] = useState("")

    const [check, setCheck] = useState(false)
    const [orderFinish, setOrderFinish] = useState(false)
    //TOTAL PRICE ORDER
    const [total, setTotal] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const shoppingCart = useSelector(state => state.shoppingCart.shoppingCart)

    const quantityProducts = shoppingCart.reduce((acc, item) => acc + item.count, 0);



    //GHECK REGEXP FOR PHONE
    const handlePhone = (value) => {
        const reg = /^\+?77([0124567][0-8]\d{7})$/
        if (reg.test(value)) {
            setPhone(value)
        } else {
            alert('Error')
        }
    }

    //CHECK DELIVERY METHOD
    const onChangeDelivery = (e) => {
        setDelivery(e.target.value)
    }

    //CHECK PAY METHOD
    const onChangePay = (e) => {
        setPay(e.target.value)
    }


    //GER INFO BY ID
    const getInfo = async () => {
        try {
            const response = await fetch(`/user/${id}`)
            const data = await response.json()
            setData(data);
        } catch (e) {
            console.log(e)
        }

    }

    //ORDER BTN
    const orderHandler = () => {
        if (fullName === "" || phone === "") {
            setCheck(true)
        } else {
            setCheck(false)
            setOrderFinish(true)

            const orderDate = new Date()
            const orderId = Date.now()
            //OBJECT for send on server
            const obj = {
                id: orderId,
                token: id,
                orderDate: orderDate.toLocaleString(),
                fullName: fullName,
                phone: phone,
                orders: shoppingCart,
                deliveryMethod: delivery,
                payMethod: pay,
                status: "В обработке",
                addressDelivery:  addressDelivery,
            }

            //SEND TO SERVEr
            fetch("/addOrder",{
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            })

            console.log(obj)
            dispatch(addOrder(obj))

        }
    }


    //AFTER ORDER BACK TO HOME PAGE
    const goBackShoppingCart = () => {

        //AFTER ORDER GO BACK ON CATALOG
        navigate("/catalog");
        dispatch(clearShoppingCart())

    }

    useEffect(() => {

        const res = shoppingCart.reduce((acc, item) => acc + item.total, 0)
        setTotal(res)

        setId(localStorage.getItem('token'))

        getInfo()
    
        if(shoppingCart.length === 0){
            navigate("/catalog")
        }

    }, [quantityProducts, total, shoppingCart])

    return (
        <Container fluid={true} className={!bg ? ['order_container', 'bg-white', 'light_mode'] : ['order_container', 'bg-dark', 'dark_mode']}>
            <section className='order_offset'>
                {
                    !orderFinish ?
                        <div className="order_main">
                            <span className='back_text' onClick={() => navigate('/shopping-cart')}>в корзину</span>
                            <h1>Оформление заказа</h1>
                            <div className='oder_main_info_block'>
                                {/* БЛОК С ДАННЫМИ ПОЛЬЗОВАТЕЛЯ */}
                                <div className='oder_main_info__input_block'>
                                    <div className='d-flex w-100 flex-column border rounded border-secondary p-2 me-2 mb-2'>
                                        <h4>Покупатель</h4>
                                        <div className='order_main__user_contacts_input'>
                                            <h5>Ваши контактные данные</h5>
                                            <div className='order_main__user_contacts_input_item'>
                                                {
                                                    data?.fullName !== "" ?
                                                        <div className='d-flex flex-column w-100 me-1'>
                                                            <span>ФИО</span>
                                                            <input className='form-control' type="text" onBlur={(e) => setFullName(e.target.value)} placeholder="Введите ваше ФИО" />
                                                            <span className={!check ? "hide_order_error" : "show_order_error"}>Поле не должно быть пустым</span>
                                                        </div>
                                                        :
                                                        <div className='d-flex flex-row w-100 ms-1 align-items-center justify-content-center'>
                                                            <p className='mb'>ФИО - <span className='main_text_span'>{data?.fullName}</span></p>
                                                        </div>
                                                }

                                                {
                                                    data?.email === "" ?
                                                        <div className='d-flex flex-column w-100 ms-1'>
                                                            <span>Email</span>
                                                            <input className='form-control' type="email" />
                                                        </div>
                                                        :
                                                        <div className='email_block'>
                                                            <p className='mb'>Ваша электронная почта - <span className='main_text_span'>{data?.email}</span></p>
                                                        </div>
                                                }
                                            </div>
                                            <div className='d-flex flex-column w-50 me-1 mt-1'>
                                                <span>Телефон</span>
                                                <input className='form-control' placeholder='+7 (xxx) xxx-xx-xx' type="text" onBlur={(e) => handlePhone(e.target.value)} />
                                                <span className={!check ? "hide_order_error" : "hide_order_error"}>Поле не должно быть пустым</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* БЛОК СПОСОБ ДОСТАВКИ */}
                                    <div className='d-flex w-100 flex-column border rounded border-secondary p-2 mt-1'>
                                        <h4>Способ доставки</h4>
                                        <div className='d-flex flex-column'>
                                            <div className='d-flex flex-column w-100'>
                                                <FormControlLabel value="Самовывоз из магазина" control={<Radio checked={delivery === 'Самовывоз из магазина'} onChange={onChangeDelivery} color="success" />} label="Самовывоз из магазина" />
                                                <span>Адрес: Улица Вязов, 1428, Спрингвуд, Огайо, США</span>
                                            </div>
                                            <FormControlLabel value="Доставка курьером" control={<Radio checked={delivery === 'Доставка курьером'} onChange={onChangeDelivery} color="success" />} label="Доставка курьером" />
                                            <span className="mb-1 ">1 рабочий день</span>
                                            <input placeholder='Введите адрес доставки' className={delivery === "Доставка курьером" ? "show" : "hide"}  onChange={(e) => setAddressDelivery(e.target.value)}/>

                                        </div>
                                    </div>
                                    {/* БЛОК СПОСОБ ОПЛАТЫ */}
                                    <div className='d-flex w-100 flex-column border rounded border-secondary p-2 mt-1'>
                                        <h4>Способ оплаты</h4>
                                        <div className='d-flex flex-column'>
                                            <FormControlLabel value="Наличными при полученииe" control={<Radio checked={pay === 'Наличными при полученииe'} onChange={onChangePay} color="success" />} label="Наличными при получении" />
                                            <FormControlLabel value="Оплата картой" control={<Radio onChange={onChangePay} checked={pay === 'Оплата картой'} color="success" />} label="Оплата картой" />
                                            <FormControlLabel value="Kaspi QR" control={<Radio onChange={onChangePay} checked={pay === 'Kaspi QR'} color="success" />} label="Kaspi QR" />
                                        </div>
                                    </div>
                                    {/*БЛОК ПОДТВЕРЖДЕНИЯ ЗАКАЗА  */}
                                    <div className='d-flex flex-column w-100 mt-2'>
                                        <p>Подтверждая заказ, я принимаю условия <span className='text-primary'>пользовательского соглашения</span></p>
                                        <button className='btn btn-success w-50' onClick={() => orderHandler()}>Оформить заказ</button>
                                    </div>
                                </div>

                                {/* БЛОК ИТОГО */}
                                <div className='oder_main_info__total_block border rounded border-secondary p-2 order_info_block '>
                                    <h4>Итого</h4>
                                    <div className='d-flex w-100 justify-content-between mb-2'>
                                        <span className="main_text_p">{quantityProducts} товара на сумму</span>
                                        <span className="main_text_span">{total} тенге</span>
                                    </div>
                                    <div className='d-flex w-100 justify-content-between mt-2 mb-2'>
                                        <span className="main_text_p">Стоимость доставки</span>
                                        <span className="main_text_span">Бесплатно</span>
                                    </div>
                                    <div className='line mb-2 mt-2'></div>
                                    <div className="d-flex flex-column justify-content-between w-100 mt-2 mb-2">
                                        <p className="main_text_span mb-1">Доставка: <span className="main_text_span ms-2">{delivery}</span></p>
                                        <span>1 рабочий день</span>
                                    </div>
                                    <div className="d-flex flex-column justify-content-between w-100 mt-2 mb-2">
                                        <p className="main_text_span mb-1">Оплата: <span className="main_text_span ms-2">{pay}</span></p>
                                        <span>1 рабочий день</span>
                                    </div>
                                    <div className='d-flex w-100 justify-content-between mt-2 mb-2'>
                                        <span>Итого к оплате</span>
                                        <span className='home_catalog_list_test'>{total} <span className='main_text_p'>тенге</span></span>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        :
                        <div className='d-flex w-100 flex-column align-items-center'>
                            <AiFillCheckCircle className='order_icon_size text-success'/>
                            <h2>Благодарим за заказ!</h2>
                            <button className='btn btn-primary' onClick={() => goBackShoppingCart()}>Продолжить покупки</button>
                        </div>
                }
            </section>
        </Container>
    )


}

export default Order;