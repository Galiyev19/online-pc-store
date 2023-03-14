import React, { useState } from 'react'
import { motion, AnimatePresence} from 'framer-motion'

//import Bootstrap Componentts
import { Container } from 'react-bootstrap'

//import local image
import Logo from '../../../assets/images/logo.png'

//import React Icons
import { FaInstagram } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaWhatsappSquare } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'

//import Components
import AuthModal from '../../HomeScreen/Header/Modals/Auth/AuthModal'


import './Footer.css'


const Footer = () => {

    const [isOpenInfo, setIsOpenInfo] = useState(false)
    const [isOpenService, setOpenService] = useState(false)
    



    return (
        <Container fluid={true} className='bg-dark border-top'>
            <div className="footer_offset">
                <div className="footer_offset__item">
                    <div className='footer_blocks'>
                        <img src={Logo} className="logo_img__footer" />
                        <h4 className='text-white'>+7 (777) 777-77-77</h4>
                        <h4 className='text-white'>+7 (111) 111-11-11</h4>
                        <p className='text-secondary mb-1'>Пн-вс: с 10:00 до 21:00</p>
                        <p className='text-white mb-1'> Улица Вязов, 1428, Спрингвуд, Огайо, США</p>
                    </div>
                    <div className='footer_blocks'>
                        <h4 className='text-white'>Информация</h4>
                        <span className='text-white mb-1'>Акции</span>
                        <span className='text-white mb-1'>Кредит</span>
                        <span className='text-white mb-1'>Оплата и доставка</span>
                        <span className='text-white mb-1'>Гарантия</span>
                        <span className='text-white mb-1'>Частые вопросы</span>
                        <span className='text-white mb-1'>Блог</span>
                        <span className='text-white mb-1'>О нас</span>
                        <span className='text-white mb-1'>Политика конфиденциальности</span>
                    </div>
                    <div className='footer_block_mob'>
                        <div className='d-flex w-100 justify-content-between' onClick={() => setIsOpenInfo(!isOpenInfo)}>
                            <h4 className='text-white' >Информация</h4>
                            <IoIosArrowDown className='text-white fs-4' />
                        </div>
                        <AnimatePresence>
                        {
                            isOpenInfo &&
                            <motion.ul className='footer_list_mob'
                            initial={{height:0}}
                            animate={{height: 'auto'}}
                            exit={{height: 0}}
                            style={{overflow: 'hidden'}}
                            transition={{duration: .85}}>
                                <motion.li className='text-white mb-1'>Акции</motion.li>
                                <motion.li className='text-white mb-1'>Кредит</motion.li>
                                <motion.li className='text-white mb-1'>Оплата и доставка</motion.li>
                                <motion.li className='text-white mb-1'>Гарантия</motion.li>
                                <motion.li className='text-white mb-1'>Частые вопросы</motion.li>
                                <motion.li className='text-white mb-1'>Блог</motion.li>
                                <motion.li className='text-white mb-1'>О нас</motion.li>
                                <motion.li className='text-white mb-1'>Политика конфиденциальности</motion.li>
                               
                            </motion.ul>
                        }
                        </AnimatePresence>
                    </div>
                    <div className='footer_block_mob'>
                        <div className='d-flex w-100 justify-content-between' onClick={() => setOpenService(!isOpenService)}>
                            <h4 className='text-white' >Услуги и сервисы</h4>
                            <IoIosArrowDown className='text-white fs-4' />
                        </div>
                        <AnimatePresence>
                        {
                            isOpenService &&
                            <motion.ul className='footer_list_mob'
                            initial={{height:0}}
                            animate={{height: 'auto'}}
                            exit={{height: 0}}
                            style={{overflow: 'hidden'}}
                            transition={{duration: .85}}>
                                <motion.li className='text-white mb-1'>Сервисный центр</motion.li>
                                <motion.li className='text-white mb-1'>Магазин Б/У товара</motion.li>
                                <motion.li className='text-white mb-1'>Скупка Б/У</motion.li>
                                <motion.li className='text-white mb-1'>Ремонт ПК и оргтехники</motion.li>
                                <motion.li className='text-white mb-1'>Компьютерная помощь</motion.li>
                                <motion.li className='text-white mb-1'>Cотрудничество</motion.li>
                                <motion.li className='text-white mb-1'>Главная</motion.li>
                            </motion.ul>
                        }
                        </AnimatePresence>
                    </div>
                    <div className='footer_blocks'>
                        <h4 className='text-white'>Услуги и сервисы</h4>
                        <span className='text-white mb-1'>Сервисный центр</span>
                        <span className='text-white mb-1'>Магазин Б/У товара</span>
                        <span className='text-white mb-1'>Скупка Б/У </span>
                        <span className='text-white mb-1'>Ремонт ПК и оргтехники</span>
                        <span className='text-white mb-1'>Компьютерная помощь</span>
                        <span className='text-white mb-1'>Сотрудничество</span>
                        <span className='text-white mb-1'>Главная</span>
                    </div>
                    <div className='footer_block__last'>
                        <div className='footer_blocks_social'>
                            <h4 className='text-white'>Следите за нами</h4>
                            <div className='d-flex flex-row w-100 justify-content-between mt-2 mb-2'>
                                <FaInstagram className='footer_icons__social' />
                                <FaFacebook className='footer_icons__social' />
                                <FaTelegram className='footer_icons__social' />
                                <FaWhatsappSquare className='footer_icons__social' />
                                <FaYoutube className='footer_icons__social' />
                                <FaLinkedinIn className='footer_icons__social' />
                            </div>
                        </div>
                        <div className='footer_blocks_social'>
                            <p className='text-white'>Подписывайтесь на скидки</p>
                            <div className='d-flex flex-row'>
                                <input className='form-control' placeholder='Укажите ваш email...' />
                                <button className='btn btn-secondary'><FiSend /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='line'></div>
                <div className='footer_under_block'>
                    <span className='text-white'>
                        Дизайн сайта: <span className='text-danger'>Galiyev Alisher</span>
                    </span>
                    <span className='text-white'>
                        Разработка: <span className='text-danger'>Galiyev Alisher</span>
                    </span>
                </div>
            </div>
        </Container>


    )
}

export default Footer