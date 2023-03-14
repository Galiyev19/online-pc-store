import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector} from "react-redux";
import {useAuthState} from "react-firebase-hooks/auth";
import auth from "../../firebase";

//import Bootstrap components
import { Container, Modal } from 'react-bootstrap'

//import React icons
import { BsCart4 } from "react-icons/bs"
import { FaDollarSign } from "react-icons/fa"



//import components
import ShoppingCartList from './ShoppingCartList/ShoppingCartList';

//import style
import './ShoppingCart.css'


const ShoppingCart = ({ bg }) => {

  //SUM PRICE
  const [total, setTotal] = useState(null)
  //MODAL
  const [smShow, setSmShow] = useState(false);

  const shoppingCart = useSelector(state => state.shoppingCart.shoppingCart)

  const quantityProducts = shoppingCart.reduce((acc, item) => acc + item.count, 0);
  const navigate = useNavigate()

  const [user] = useAuthState(auth)

  //IF USER NOT SIGN IN OPEN MODAL
  const order = () => {
    user !== null ? navigate('/order') : setSmShow(true)
  }

  useEffect(() => {
    const res = shoppingCart.reduce((acc, item) => acc + item.total, 0)
    setTotal(res)
  }, [quantityProducts, total])

  return (
    <Container fluid={true} className={!bg ? ['shoppingCart_container', 'bg-white', 'light_mode'] : ['shoppingCart_container', 'bg-dark', 'dark_mode']}>
      <section className="shoppingCart_offset">
        <h1 className="home_catalog_list_test">Корзина</h1>
        {/*SHOPPING CART BLOCK*/}
        <div className='shoppingCart_main'>
          {/*SHOPPING CART LIST*/}
          {
            shoppingCart.length !== 0
              ? <ShoppingCartList shoppingCart={shoppingCart} /> :
              <div className="shopping_cart_head_text">
                <BsCart4 className="shopping_cart_icon" />
                <h3 >Ваша корзина пуста</h3>
                <p><Link className="link_to_catalog" to="/catalog">Нажмите здесь</Link>,  чтобы продолжить покупки</p>
              </div>
          }

          {/*SHOPPING CART TOTAL*/}
          {
            shoppingCart.length !== 0 ?
            
            <div className="shoppingCart_main_total border border-light rounded shadow">
            <h2 >Итого</h2>
            <div className="d-flex justify-content-between mb-3 p-2">
              <span><span className="fw-bold">{quantityProducts}</span> товара на сумму</span>
              <div className="d-flex align-items-center">
                <span className="total_text ">{total?.toLocaleString()} тенге</span>
                <FaDollarSign className="text-white" />
              </div>
            </div>
            <div className="d-flex align-items-start">
              <span className="fs-2 ">К оплате</span>
              <div className="d-flex align-items-center">
                <span className="fs-2  mx-3 ">{total?.toLocaleString()}</span>
                <span>тенге</span>
              </div>
            </div>
            <button onClick={() => order()}  className="btn btn-success mt-5 mb-2">Оформить заказ</button>
          </div> : null
          }
        </div>

      {/*  MODAL FOR SIGNUP OR LOGIN*/}
        <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Small Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span className="main_text_span">
              Авторизуйтесь либо зарегистрируйтесь
              чтобы оформить заказ:)
            </span>
          </Modal.Body>
        </Modal>


      </section>
    </Container>
  )

}

export default ShoppingCart