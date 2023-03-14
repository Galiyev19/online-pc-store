import React, {useState, useEffect} from "react"
import {useParams, Link} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion'


//import Bootstrap components
import { Offcanvas } from "react-bootstrap";


const MobileFilter = (props) => {

    //PROPS
    const {showFilter, handleCloseFiler, categories, data, onClickBrand, onClickPrice} = props

    //MAX PRICE IN CATALOG FOR FILTER
    const [max, setMax] = useState(0)
    //MIN PRICE IN CATALOG FOR FILTER
    const [min, setMin] = useState(0)
    //BRANDS FILTER
    const [brands, setBrands] = useState([])
    //LIST FOR ONLY PC PARTS
    const [list, setList] = useState([])
    //START RANGE FOR FILTER PRICE
    const [first, setFirst] = useState(0)
    //END RANGE FOR FILTER PRICE
    const [second, setSecond] = useState(0)

    const firstRangePrice = (value) => {
        setFirst(value)
    }

    const secondRangePrice = (value) => {
        setSecond(value)
    }


    const FilterByPrice = () => {
        onClickPrice(first, second)
    }

    //CATEGORY FOR SEARCH
    const {category} = useParams()


    const categoryName = categories.find(item => item.engVersion === category)

    //GET UNIQUE BRAND
    const getUniqueBrand = (arr) => {
        const result = arr.reduce((acc, item) => {
            if (acc.includes(item.brand)) {
                return acc;
            }
            return [...acc, item.brand];
        }, []);
        return result
    }

    useEffect(() => {

        //set min max price
        const arr = []
        data.forEach(item => arr.push(item.price))
        let max = Math.max.apply(null, arr)
        let min = Math.min.apply(null, arr)
        setMax(max)
        setMin(min)

        //SET UNIQUE BRAND
        const unique = getUniqueBrand(data)
        setBrands(unique)


        //set List for pc-parts
        setList(categories[1]?.subCategories)

    }, [data, category])


    return (
        <>
            <Offcanvas show={showFilter} onHide={handleCloseFiler}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Фильтр</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex flex-column w-100 text-center align-items-center justify-content-between'>
                        <div className='d-flex flex-column flex-start w-100 text-start'>
                            <h4 className='main_text_h4'>Категория</h4>
                            <span className='main_text_span mb-1'>{categoryName?.categoryName}</span>
                            {
                                category === "pc-parts" || category === "RAM" || category === "CPU" || category === "GPU" || category === "SSD" || category === "cases" || category === "power-supplies" || category === "motherboards" ?
                                    <AnimatePresence>
                                        <motion.ul className='d-flex flex-column '
                                        >
                                            {
                                                list?.map(item =>
                                                    <Link to={`/catalog/${item.engVersion}`} key={item.id}
                                                          className="link mb-2 main_text_p mt-2">{item.name}</Link>
                                                )
                                            }
                                        </motion.ul>

                                    </AnimatePresence> : null
                            }
                        </div>
                        <div className='d-flex flex-row w-100 justify-content-between mb-2 mt-3'>
                            <div className='d-flex flex-column text-start w-100'>
                                <span className='mb-2 main_text_span'>От</span>
                                <input type="text" placeholder={min?.toLocaleString()} className='w-100 me-1'
                                       onChange={(e) => firstRangePrice(parseInt(e.target.value))}/>
                            </div>
                            <div className='d-flex flex-column text-start w-100'>
                                <span className='mb-2 main_text_span'>До</span>
                                <input placeholder={max.toLocaleString()} className='w-100 ms-1'
                                       onChange={(e) => secondRangePrice(parseInt(e.target.value))}/>
                            </div>
                        </div>
                        <div className="d-flex w-100 mb-2">
                            <button className="btn btn-success" onClick={() => FilterByPrice()}>искать</button>
                        </div>
                        <div className='d-flex flex-column w-100 text-start'>
                            <span className='main_text_span mt-2 mb-1'>Производитель</span>
                            <span className='link' onClick={() => onClickBrand("все")}>Все</span>
                            {
                                brands.map((item, index) =>
                                    <span className='link' key={index} onClick={() => onClickBrand(item)}>{item}</span>
                                )
                            }
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default MobileFilter;