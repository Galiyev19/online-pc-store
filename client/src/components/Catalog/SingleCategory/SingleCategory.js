import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


//import Bootstrap components
import { Button, Container } from "react-bootstrap"


//import React Icons
import { RiArrowDropLeftLine } from 'react-icons/ri'
import { FcFilledFilter } from 'react-icons/fc'

//import Components
import ProductGrid from "./productGrid/ProductGrid";
import Filter from "../Filter/Filter";
import MobileFilter from "../Filter/MobileFilter/MobileFilter";

//import Style
import "./SingleCategory.css"


const SingleCategory = ({ bg }) => {

    // const [countProducts,setCountProducts] = useState(0)
    // const [categoryName,setCategoryName] = useState(null)

    const { category } = useParams()
    //PRODUCT LIST
    const [products, setProducts] = useState([])
    //SUBCATEGORY LIST
    const [subCategory, setSubCategory] = useState({})
    //VALUE FOR SORT IN BRANDS
    const [value, setValue] = useState("все")
    //FOR SHOW FILTER IN MOBILE VERSION
    const [showFilter, setShowFilter] = useState(false);

    //SHOW AND CLOSE MOBILE FILTER
    const handleCloseFiler = () => setShowFilter(false);
    const handleShowFilter = () => setShowFilter(true);


    const categories = useSelector(state => state.categories.categories)
    const categoryName = categories.find(item => item.engVersion === category)

    const navigate = useNavigate()

    //BACK TO CATALOG
    const goBack = () => navigate("/catalog")

    //GET SORTED DATA  BY CATEGORY
    const getData = async () => {

        const response = await fetch(`/catalog/${category}`)
        const data = await response.json()
        setProducts(data)

    }

    //GET SORTED DATA BY PRICE
    const getSortPrice = (first, second) => {
        const newdata = products.filter(function (item) {
            return item.price >= first &&
                item.price <= second;
        });
        setProducts(newdata)
    }

    //GET DATA SORTER BY BRAND
    const getSortData = (value) => {
        setValue(value)
        const arr = products.filter(item => item.brand === value)
        setProducts(arr)
    }

    useEffect(() => {

        if (value === "все") {
            getData()
        }

        const subCategory = categories[1]?.subCategories.find(item => item.engVersion === category)
        setSubCategory(subCategory)

    }, [value, category, categories])



    return (
        <Container fluid={true} className={!bg ? ['single_category_container', 'bg-white'] : ['single_category_container', 'bg-dark']}>
            <section className="single_category_offset">
                <span className="link_go_back" onClick={() => goBack()}><RiArrowDropLeftLine className="fs-4" /> Каталог</span>
                <div className="d-flex flex-row w-100 align-items-center">
                    <h1 className={!bg ? ['fw-normal'] : ['fw-normal text-white']}>{categoryName?.categoryName || subCategory?.name}</h1>
                    <span className="text-secondary mx-3">{products.length} товара</span>
                </div>
                <Button className="btn btn-primary w-25 btn_filter" onClick={handleShowFilter}>
                    <FcFilledFilter />
                    <span className="main_text_span ms-2">Фильтр</span>
                    </Button>

                <MobileFilter showFilter={showFilter} handleCloseFiler={handleCloseFiler}
                value={value} data={products} categories={categories} category={category} onClickBrand={getSortData} onClickPrice={getSortPrice}
                />

                <div className="d-flex w-100">
                    <div className="filter_block">
                        <Filter bg={bg} value={value} data={products} categories={categories} onClickBrand={getSortData} onClickPrice={getSortPrice} />
                    </div>
                    <div className="product_grid">
                        <ProductGrid products={products} />
                    </div>
                </div>
            </section>
        </Container>
    )
}

export default SingleCategory;