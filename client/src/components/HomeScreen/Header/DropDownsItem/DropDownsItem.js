import React from 'react'
import { Dropdown } from 'react-bootstrap'
import {Link} from "react-router-dom"
import {BsBorderAll}  from "react-icons/bs"

import "./DropDownItem.css"

const DropDownsItem = ({ categories }) => {

    return (
        <div className='list'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: .85 }}>
            <Dropdown.Item as={Link} to="/catalog" className='main_text'><BsBorderAll className='fs-3 text-secondary me-2'/>Все категории </Dropdown.Item>
            {
                categories.map(item =>
                    <Dropdown.Item as={Link} to={`/catalog/${item.engVersion}`} key={item.id} className="dropDown_item main_text">
                        <img src={item.icon} style={{ height: '42px', width: '42px', backgroundColor: 'transparent' }} />
                        <span className='mx-2'>{item.categoryName}</span>
                    </Dropdown.Item>
                )
            }
        </div>
        
    )
}

export default DropDownsItem