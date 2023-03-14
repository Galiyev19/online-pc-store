import React from 'react'
import {Link} from 'react-router-dom'


import "./HomeCatalogList.css"


const HomeCatalogList = () => {


    return (
        <section className='catalog_list_main'>
        <div className='catalogList__container'>
            <Link className='catalog_list_blocks'  to="/catalog/laptops">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url("https://overclockers.ru/st/legacy/blog/403761/258629_O.png")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>Ноутбук</span>
                    </div>
                </div>
            </Link>
            <Link className='catalog_list_blocks'  to="/catalog/RAM">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url("https://storables.com/wp-content/uploads/2020/05/random-access-memory.jpeg")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>ОЗУ</span>
                    </div>
                </div>
            </Link>
            <Link className='catalog_list_blocks' to="/catalog/GPU">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url(" https://www.ferra.ru/imgs/2018/11/26/11/2559762/6da80d89f04827ca8f2d62a54a8fe4ea95df0fb2.jpg")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>Видеокарты</span>
                    </div>
                </div>
            </Link>
            <Link className='catalog_list_blocks' to="/catalog/monitors">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url("https://topmonitorov.ru/wp-content/uploads/2020/12/dell-ultrasharp-4k-monitor-feature-image.jpg")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>Мониторы</span>
                    </div>
                </div>
            </Link>

            <Link className='catalog_list_blocks' to="/catalog/CPU">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url("https://celes.club/uploads/posts/2022-06/1654472645_10-celes-club-p-protsessor-oboi-krasivie-12.jpg")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>Процессоры</span>
                    </div>
                </div>
            </Link>
            <Link className='catalog_list_blocks' to="/catalog/SSD">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url("https://avatars.mds.yandex.net/i?id=9f026e6613d2f41cca1f385e24e93a6324ecfa70-5916060-images-thumbs&n=13")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>SSD накопители</span>
                    </div>
                </div>
            </Link>
            <Link className='catalog_list_blocks' to="/catalog/cases">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url("https://sun9-80.userapi.com/impf/c852232/v852232787/1e5397/OuFvRats_ks.jpg?size=1280x854&quality=96&sign=94b46b0e5b096c604b58ba2e840f7527&type=album")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>Корпуса</span>
                    </div>
                </div>
            </Link>
            <Link className='catalog_list_blocks' to="/catalog/motherboards">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url("https://phonoteka.org/uploads/posts/2021-07/1625237002_2-phonoteka-org-p-materinskaya-plata-oboi-oboi-krasivo-2.jpg")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>Материнские платы</span>
                    </div>
                </div>
            </Link>
            <Link className='catalog_list_blocks' to="/catalog/power-supplies">
                <div className='catalog_list_blocks_item'
                    style={{ backgroundImage: 'url("https://i2hard.ru/upload/resize_cache/iblock/502/1200_675_2/5029054512456fcb76a66d03c17120dd.jpg")' }}>
                    <div className="catalog_list_text_block">
                        <span className='text-white home_catalog_list_test'>Блок питания</span>
                    </div>
                </div>
            </Link>

        </div>
        </section>
    )
}

export default HomeCatalogList;