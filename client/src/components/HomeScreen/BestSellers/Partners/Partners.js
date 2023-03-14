import React from 'react'

//import Icons 
import {SiLenovo} from 'react-icons/si'


import './Partners.css'

const partners = [
    {id: 1, icons: "https://softex.ru/images/vendors/vlogo_1575552044.png"},
    {id: 2, icons: "https://www.notebook-center.ru/image/logo/asus_logo.jpg"},
    {id: 3, icons: "https://zapravka365.ru/wp-content/uploads/2018/02/1000px-Samsung_Logo-200x100.png"},
    {id: 4, icons: "https://object.pscloud.io/cms/cms/Banners/banner_acer_5057_ru-Ru_desktop.png"},
    {id: 5, icons: "https://congreso.america-digital.com/wp-content/uploads/2019/08/INTEL-200x100.png"},
    {id: 6, icons: "https://i.work.ua/employer_design/7/8/6/1177786_company_logo_1.png"}
]

const Partners = () => {

    return(
        <div className='partners_block'>
           {
            partners.map(item => 
                <div className='partners_item'  key={item.id}>
                    <img src={item.icons} />
                </div>
            )
           }
        </div>
    )
}

export default Partners;