import React from 'react'


//import components
import Banner from './Banner/Banner'
import CustomersChoise from './CustomersChoise/CustomersChoise'
import BestSellers from './BestSellers/BestSellers'
import News from './News/News'

//import Bootstrap-Components
import { Container } from 'react-bootstrap'

//import Components
import HomeCatalogList from './HomeCatalogList/HomeCatalogList'




//import Style
import './Home.css'



const Home = ({bg}) => {

  return (
    <Container fluid="true" className={!bg ? ['bg-white','light_mode'] : ['bg-dark','dark_mode']}>
      <Container className='home_container'>
        {/* BANNER */}
        <div className='d-flex w-100 mb-2'>
          <Banner bg={bg}/>
        </div>
      </Container>


      {/* Catalog List Block */}
      <Container className='home_container'>
        <div  className='d-flex w-100 mt-2'>
          <HomeCatalogList/>
        </div>
      </Container>
      
      {/* CUSTOMER CHOOSE */}
      <Container className='home_container'>
        <div className='d-flex w-100 mt-2'>

          <CustomersChoise bg={bg} />

        </div>
      </Container>

      {/* BEST SELLERS */}
      <Container fluid={true}  className={!bg ? ['light_mode','section_bestSellers__home'] : ['bg-dark','dark_mode']}>
        <Container className='home_container'>
          <BestSellers bg={bg}/>
        </Container>
      </Container>
    
      <Container fluid={true} className='home_container'>
        {/* NEWS BLOCK */}
        <div className='d-flex w-100  rounded p-2 p-2'>
          <News />
        </div>
      </Container>

    </Container>


  )
}

export default Home