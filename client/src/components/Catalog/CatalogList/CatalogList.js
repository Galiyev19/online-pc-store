import React from "react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";

import "./CatalogList.css"

const CatalogList = () => {

    //DATA FROM REDUX
    const categories = useSelector(state => state.categories.categories)

    return(
        <div className="catalog_list_grid_block">
            {
                categories.map(categories =>
                    <Link to={`/catalog/${categories.engVersion}`}  className="catalog_list_box" key={categories.id}>
                        <img src={categories.icon} className="catalog_list_img_size" />
                        <span className="main_text_span">{categories.categoryName}</span>
                    </Link>
                )
            }
        </div>
    )
}

export default  CatalogList;