import React from "react"


//import Bootstrap components
import {Container} from "react-bootstrap"

//import Components
import CatalogList from "./CatalogList/CatalogList";

//import Style
import "./Catalog.css"




const Catalog = ({bg}) => {


    return(
        <Container fluid={true} className={!bg ? ['catalog_container','bg-white'] : ['catalog_container','bg-dark'] }>
            <section className="catalog_offset">
                <div className="d-flex w-100 mb-2">
                    <h1 className="home_catalog_list_test">Каталог</h1>
                </div>
                <CatalogList/>
            </section>
        </Container>
    )
}

export default  Catalog;