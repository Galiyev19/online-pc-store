import React, { useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "react-router-dom"
import { Container, Nav, Navbar } from 'react-bootstrap'

import {FaHome, FaRegUserCircle} from 'react-icons/fa'
import { AiFillAppstore } from 'react-icons/ai'
import { MdShoppingCart } from 'react-icons/md'
import { MdFavorite } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'

import auth from '../../../../firebase'
import AuthModal from '../../Header/Modals/Auth/AuthModal'

import './FooterMobile.css'

const FooterMobile = () => {

    const [modalShow, setModalShow] = useState(false)
    const [user] = useAuthState(auth)

    const hideModal = () => {
        setModalShow(false)
    }


    return (
        <Container className="tab_mobile" fluid={true}>
            <Navbar className='d-flex container w-100 justify-content-between'>
                <Link className='mobile_menu_tab_item' to='/'>
                    <FaHome className='fs-2' />
                    <span className='text-dark'>Главная</span>
                </Link>
                <Link className='mobile_menu_tab_item' to={"/catalog"} >
                    <AiFillAppstore className='fs-2' />
                    <span className='text-dark'>Каталог</span>
                </Link>
                <Link className='mobile_menu_tab_item' to="/shopping-cart">
                    <MdShoppingCart className='fs-2' />
                    <span className='text-dark'>Корзина</span>
                </Link>
                <Link className='mobile_menu_tab_item' to="/favorite-products">
                    <MdFavorite className='fs-2' />
                    <span className='text-dark'>Избранное</span>
                </Link>
                {
                    user !== null
                        ?
                        <Link className='mobile_menu_tab_item' to='/profile'>
                            {
                                user.photoURL !== null
                                    ?
                                    <img alt="user img" src={user.photoURL} className="img_user" />
                                    : <FaRegUserCircle className='fs-2' />
                            }
                            <span className='text-dark'>Кабинет</span>
                        </Link>
                        :
                        <Link className='mobile_menu_tab_item' onClick={() => setModalShow(true)}>
                            <FaUserAlt className='fs-2' />
                            <span className='text-dark'>Вход</span>
                        </Link>

                }
            </Navbar>
            <AuthModal show={modalShow} onHide={hideModal} />
        </Container>
    )
}

export default FooterMobile;