import React from 'react'
import {useDispatch} from "react-redux"
import {increaseCount, decreaseCount, deleteItem} from "../../../store/slices/shoppingCartSlice"

//import React icons
import {FaDollarSign} from "react-icons/fa"
import {BsTrash} from "react-icons/bs"


import "./ShoppingCartList.css"

const ShoppingCartList = ({shoppingCart}) => {


    const dispatch = useDispatch()

    const increase = (id) => {
        dispatch(increaseCount(id))
    }


    const deacrease = (id) => {
        dispatch(decreaseCount(id))
    }


    const deleteCart = (id) => {
        dispatch(deleteItem(id))
    }


    return (
        <div>
            {
                shoppingCart.map(item =>
                    <div className="shoppingcart__block bg-light rounded shadow bg-body" key={item.id}>
                        <div className="shoppingcart__block_img">
                            <img alt="product image" className='img_shoppingCart' src={item.product.img}/>
                        </div>
                        <div className="shoppingcart__block_item">
                            <div className="d-flex flex-column m-3 w-50">
                                <span className="title">{item.product.title}</span>
                                <span className="title">{item.product.price.toLocaleString()} тг. <span
                                    className="price_des">за шт.</span></span>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-center m-3 w-25">
                                <button className="btn btn-danger" onClick={() => {
                                    deacrease(item.id)
                                }}>-
                                </button>
                                <span className="count">{item.count}</span>
                                <button className="btn btn-success" onClick={() => {
                                    increase(item.id)
                                }}>+
                                </button>
                            </div>
                            <div className="d-flex align-items-center min-w">
                                <span className="price">{item.total.toLocaleString()} тг.</span>
                            </div>
                            <BsTrash className="trash" onClick={() => {
                                deleteCart(item.id)
                            }}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ShoppingCartList;

