import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

//import Bootstrap components
import {Container, Tabs, Tab} from 'react-bootstrap';

import OrderList from "./OrderList/OrderList";

//import React icons
import {FaRegUserCircle} from 'react-icons/fa'
import {MdModeEditOutline} from 'react-icons/md'

//import Style
import "./Profile.css"




const Profile = ({bg}) => {

    const [data, setData] = useState(null)
    const [id, setId] = useState('')
    const [orderList, setOrderList] = useState([])

    //ORDER LIST USER
    const orders = useSelector(state => state.orders.orders)


    //GET DATA FROM SERVER BY ID
    const getInfo = async () => {
        try {
            const response = await fetch(`/user/${id}`)
            const data = await response.json()
            setData(data);

            const orders = data.orders
            setOrderList(orders)

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        setId(localStorage.getItem('token'))
        getInfo()
    }, [id])


    return (
        <Container fluid={true} className={!bg ? ['profile_container', 'bg-white'] : ['profile_container', 'bg-dark']}>
            <section className="profile_offset">
                {/*TABS IN PROFILE*/}
                <Tabs>
                    {/*PROFILE INFO*/}
                    <Tab title="Личные данные" eventKey="Личные данные">
                        <div className='profile_main_block'>
                            <div className='d-flex flex-column'>
                                {
                                    data?.photoUrl ? <img src={data?.photoUrl} className="profile_img"/> :
                                        <FaRegUserCircle className='profile_img'/>
                                }

                                {/* <input type="file" accept="image/*"  onClick={(e) => handleUpload(e)} />
                                <button onClick={upLoad}>Загрузить</button> */}
                            </div>
                            <div className='profile_user_data_grid'>
                                <div className='d-flex flex-column'>
                                    <span className='mb-2 fw-bold text-secondary'>Имя профиля</span>
                                    <span className='mb-2 fw-bold text-secondary'>ФИО</span>
                                    <span className='mb-2 fw-bold text-secondary'>email</span>
                                    <span className='mb-2 fw-bold text-secondary'>Телефон</span>
                                    <span className='mb-2 fw-bold text-secondary'>Основной способ доставки</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span className=' w-100 text-secondary d-flex justify-content-between'>
                                        {data?.disPlayName || data?.username}
                                        <MdModeEditOutline className='edit_icon'/>
                                    </span>
                                    <span className=' text-secondary w-100 d-flex  justify-content-between'>
                                        {data?.fullName || <span>Отсутвует</span>}
                                        <MdModeEditOutline className='edit_icon'/>
                                    </span>
                                    <span className=' text-secondary w-100 d-flex justify-content-between'>
                                        {data?.email}
                                        <MdModeEditOutline className='edit_icon'/>
                                    </span>
                                    <span className=' text-secondary w-100 d-flex justify-content-between'>
                                        {data?.phone || <span>Отсутвует</span>}
                                        <MdModeEditOutline className='edit_icon'/>
                                    </span>
                                    <span className=' text-secondary w-100 d-flex justify-content-between'>
                                        {data?.deliveryMethod || <span>Отсутвует</span>}
                                        <MdModeEditOutline className='edit_icon'/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    {/* ORDER LIST */}
                    <Tab title="История покупок" eventKey="История покупок">
                        <div className="d-flex flex-column w-100">
                            <h2>Покупки</h2>
                            {
                                orderList === undefined ? null : orderList.map(item =>
                                    <div
                                        className="order_list_block bg-light rounded  shadow bg-body  "
                                        key={item.id}>
                                        <div className="d-flex flex-column">
                                            <p>Номер заказа: <span className="main_text_span">{item.id}</span> от <span
                                                className="main_text_span">{item.orderDate}</span></p>
                                            <div>
                                                <h3>Товары</h3>
                                                {
                                                    item.orders.length <= 0 ? null :
                                                        <OrderList orderList={item.orders}/>
                                                }

                                            </div>
                                        </div>
                                        <div className="order_list_block_user_info">
                                            <div className='order_list_block_user_info_item'>
                                                <h3>Данные о доставке</h3>
                                                <div className="d-flex flex-column">
                                                    <span>Способ доставки</span>
                                                    <span className="main_text_span">{item.deliveryMethod}</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <span>ФИО получателя</span>
                                                    <span className="main_text_span">{item.fullName}</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <span>Телефон получателя</span>
                                                    <span className="main_text_span">{item.phone}</span>
                                                </div>
                                            </div>
                                            <div className="order_list_block_user_info_item">
                                                <h3>Данные об оплате</h3>
                                                <div className="d-flex flex-column">
                                                    <span>Способ оплаты</span>
                                                    <span className="main_text_span">{item.payMethod}</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <span>Статус</span>
                                                    <span className="main_text_span">{item.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Tab>
                </Tabs>
            </section>
        </Container>
    )

    // src={user.photoURL !== "" ? user.photoURL : <FaRegUserCircle/>}

}

export default Profile;