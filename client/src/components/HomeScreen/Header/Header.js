import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-bootstrap'
import { useAuthState } from "react-firebase-hooks/auth"
import { useSelector } from "react-redux"

//Import components
import AuthModal from './Modals/Auth/AuthModal';
import DropDownsItem from './DropDownsItem/DropDownsItem'
import ItemsInCart from './ItemsInCart/ItemsInCart'

//FireBase
import auth from '../../../firebase'
import { signOut } from "firebase/auth"

//Import Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

//Import Icons
import { FaSearch } from 'react-icons/fa'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { MdShoppingCart } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { FaRegUserCircle } from "react-icons/fa"
import { BsFillSunFill } from 'react-icons/bs'
import { BsFillMoonFill } from 'react-icons/bs'
import {ImExit} from 'react-icons/im'

//import local image
import Logo from '../../../assets/images/logo.png'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'


import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'


const Header = ({ bg, handleClickBgWhite, handleClickBgDark }) => {



    //redux categories
    const categories = useSelector(state => state.categories.categories)


    //modal
    const [modalShow, setModalShow] = useState(false)
    //user info
    const [user] = useAuthState(auth)


    //logout from acc
    const logOut = () => {
        signOut(auth)
    }


    //hide modal
    const hideModal = () => {
        setModalShow(false)

    }

    //color for dropdown
    const [isOpen, setIsOpen] = useState(false)

    //open modal for sign-up
    const handleToogle = () => {
        setIsOpen(!isOpen)
    }




    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top' className='w-100 border-bottom'>
            <Container className='w-100 justify-content-start'>
                {/* LOGO */}
                <NavLink as={Link} to='/'>
                    <Navbar.Brand><img className='logo__img' src={Logo} /></Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='mb-2' />
                {/* DROPDOWN BUTTON */}
                <Navbar.Collapse id="responsive-navbar-nav" className='w-100'>
                    <Nav className='catalog_btn'>
                        <DropdownButton
                            id="dropdown-button-dark-example2"
                            variant={!isOpen ? 'secondary' : 'light'}
                            menuVariant="dark"
                            title={<span className='main_text'><RxHamburgerMenu className='mx-2 fs-4' />Каталог</span>}
                            onClick={() => handleToogle()}
                        >
                            <DropDownsItem categories={categories} />
                        </DropdownButton>
                    </Nav>
                    {/* SEARCH INPUT*/}
                    <Nav className='w-100 d-flex flex-row'>
                        <input placeholder='Я хочу найти' className='w-100 form-control me-1' />
                        <button className='btn bg-light text-center'><FaSearch /></button>
                    </Nav>
                    {/* NAV FOR USER PROFILE SHOPPING CART FAVORITE */}
                    <Nav className='nav_left'>
                        <Nav.Link className='header_icon main_text' as={Link} to="/favorite-products">
                            <MdOutlineFavoriteBorder className='fs-4 mb-1' />
                            Избранное
                        </Nav.Link>

                        <Nav.Link as={Link} to="/shopping-cart" className='header_icon main_text'>
                            <MdShoppingCart className='fs-4 mb-1' />
                            Корзина
                            <ItemsInCart />
                        </Nav.Link>
                        {
                            user !== null ?
                                <Nav className="d-flex flex-row align-items-center">
                                    <div className="user_img_block">
                                        {
                                            user.photoURL !== null
                                                ?
                                                <img alt="user img" src={user.photoURL} className="img_user" />
                                                : <FaRegUserCircle className='text-white fs-2' />
                                        }
                                    </div>
                                    <div className="d-flex align-items-center m-2">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='main_text'>
                                                {user.displayName || user.email}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to="/profile" className='main_text'>Личный кабинет </Dropdown.Item>
                                                <Dropdown.Item onClick={logOut} className="main_text">Выйти</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Nav>
                                :
                                <Nav.Link className='d-flex flex-column align-items-center ms-2 main_text' onClick={() => setModalShow(true)}>
                                    <FaRegUser className='fs-4 mb-1' />
                                    Вход
                                </Nav.Link>
                        }
                        <AuthModal show={modalShow} onHide={hideModal} user={user} />
                    </Nav>
                </Navbar.Collapse>
                {/* FOR MOBILE BLOCK */}
                <div className='mobile_user_info'>
                    <div className='d-flex flex-row'>
                        <BsFillSunFill className='bg_icons' onClick={() => handleClickBgWhite()} />
                        <BsFillMoonFill className='bg_icons' onClick={() => handleClickBgDark()} />
                    </div>
                    <div className='header_store_icons main_text'>
                        <Nav.Link as={Link} className='mobile_header_icon' to={"/favorite-products"}>
                            <MdOutlineFavoriteBorder className='fs-4 mb-1 me-1 text-white' />
                        </Nav.Link>
                        <Nav.Link as={Link} className='mobile_header_icon' to={"/shopping-cart"}>
                            <MdShoppingCart className='fs-4 mb-1 text-white ms-2' />
                            <ItemsInCart className="text-white" />
                        </Nav.Link>
                        {
                            user === null ?
                                <Nav.Link className='d-flex flex-column align-items-center  main_text' onClick={() => setModalShow(true)}>
                                    <FaRegUser className='fs-4 text-white ms-2' />
                                </Nav.Link>
                                :
                                <Nav as={Link} to="/profile" className="d-flex flex-row align-items-center">
                                    <div className="user_img_block">
                                        {
                                            user.photoURL !== null
                                                ?
                                                    <img alt="user img" src={user.photoURL} className="img_user" />
                                                :
                                                <FaRegUserCircle className='text-white fs-2' />

                                        }
                                        <div className="header_user_dropdown">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='main_text'>
                                                    {user?.displayName || user?.email}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to="/profile" className='main_text'>Личный кабинет </Dropdown.Item>
                                                    <Dropdown.Item onClick={logOut} className="main_text">Выйти</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Nav>
                        }
                        {/* EXIT FROM ACC*/}
                        {
                            user !== null ?
                                <Nav.Link className="mobile_header_icon" onClick={logOut}>
                                    <ImExit className='fs-4 text-white ms-2'/>
                                </Nav.Link> : null
                        }
                    </div>
                </div>
            </Container>
        </Navbar>

    )
}

export default Header