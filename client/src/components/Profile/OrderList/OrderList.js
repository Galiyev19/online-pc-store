import React from 'react'


import "./OrderList.css"

const OrderList = ({orderList}) => {


    return(
        <>
        {
            orderList.map(item =>
                <div className="orderList_card_info_block bg-body "  key={item.id}>
                    <img alt="product image" className='img_shoppingCart' src={item.product.img}  />
                    <div className="orderList_card_info_block_item">
                        <div className="d-flex flex-column m-3 w-50">
                            <span className="title">{item.product.title}</span>
                            <span className="title">{item.product.price.toLocaleString()} тг. <span className="price_des">за шт.</span></span>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center m-3 w-25">
                            <span className="count">Количество {item.count}</span>
                        </div>
                        <div className="d-flex align-items-center min-w">
                            <span className="price">{item.total.toLocaleString()} тг.</span>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

export default  OrderList;