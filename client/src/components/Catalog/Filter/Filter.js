import React, { useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'


//import styl for Filter
import './Filter.css'


export const Filter = ({ categories, data, onClickBrand, bg, onClickPrice }) => {


    const [max, setMax] = useState(0)
    const [min, setMin] = useState(0)
    const [brands, setBrands] = useState([])
    const [isActive, setIsActive] = useState(0)
   
    const [list, setList] = useState([])
    const [first, setFirst] = useState(0)
    const [second, setSecond] = useState(0)

    const { category } = useParams()


    const categoryName = categories.find(item => item.engVersion === category)

    //SET RANGE FOR FIRST PRICE
    const firstRangePrice = (value) => {
        setFirst(value)
    }

    //SET RANGE FOR FIRST PRICE
    const secondRangePrice = (value) => {
        setSecond(value)
    }

    //SET FOR FILTER BY BRAND
    const onClick = (value) => {
        onClickBrand(value)
        setIsActive(value)
    }

    //GET LIST FOR UNIQUE BRAND
    const getUniqueBrand = (arr) => {
        const result = arr.reduce((acc, item) => {
            if (acc.includes(item.brand)) {
                return acc;
            }
            return [...acc, item.brand];
        }, []);
        return result
    }

    const FilterByPrice = () => {
        onClickPrice(first, second)
    }

    useEffect(() => {

        //set min max price
        const arr = []
        data.forEach(item => arr.push(item.price))
        let max = Math.max.apply(null, arr)
        let min = Math.min.apply(null, arr)
        setMax(max)
        setMin(min)

    
        const unique = getUniqueBrand(data)        
        setBrands(unique)
    
        //set List for pc-parts
        setList(categories[1]?.subCategories)

    }, [data, category])


    return (
        <div>
            <div className='d-flex flex-column w-100 text-center align-items-center justify-content-between'>
                <div className='d-flex flex-column flex-start w-100 text-start'>
                    <h4 className={!bg ? ['main_text_h4'] : ['text-white main_text_h4']}>Категория</h4>
                    <span  className={!bg ? ['fw-normal main_text_span mb-1'] : ['fw-normal text-white main_text_span mb-1']}>{categoryName?.categoryName}</span>
                    {
                        category === "pc-parts" || category === "RAM" || category === "CPU" || category === "GPU" || category === "SSD" || category === "cases" || category === "power-supplies" || category === "motherboards" ?
                            <AnimatePresence>                         
                            <motion.ul className='d-flex flex-column '
                            >
                                {
                                    list?.map(item =>
                                        <Link to={`/catalog/${item.engVersion}`} key={item.id} className="link mb-2 main_text_p mt-2">{item.name}</Link>
                                    )
                                }
                            </motion.ul> 
                           
                            </AnimatePresence> : null
                    }
                </div>
                <div className='d-flex flex-row w-100 justify-content-between mb-2 mt-3'>
                    <div className='d-flex flex-column text-start w-100'>
                        <span className={ !bg ? ['mb-2 main_text_span'] : ['text-white mb-2 main_text_span'] } >От</span>
                        <input type="text" placeholder={min?.toLocaleString()} className='w-100 me-1' onChange={(e) => firstRangePrice(parseInt(e.target.value))} />
                    </div>
                    <div className='d-flex flex-column text-start w-100'>
                        <span className={ !bg ? ['mb-2 main_text_span'] : ['text-white mb-2 main_text_span'] }>До</span>
                        <input placeholder={max.toLocaleString()} className='w-100 ms-1' onChange={(e) => secondRangePrice(parseInt(e.target.value))} />
                    </div>
                </div>
                <div className="d-flex w-100 mb-2">
                    <button className="btn btn-success" onClick={() => FilterByPrice()}>искать</button>
                </div>
                <div className='d-flex flex-column w-100 text-start'>
                    <span className={!bg ? ['main_text_span '] : ['main_text_span text-white']}>Производитель</span>
                    <span className={ !bg ? ['link'] : ['link text-white'] } onClick={() => onClick("все")}>Все</span>
                    {
                        brands.map((item, index) =>
                          <span className={ !bg ? ['link'] : ['link text-white'] } key={index}  onClick={() => onClick(item)}>{item}</span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Filter;