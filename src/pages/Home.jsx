import React from 'react'
import Hero from '../components/Hero'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <>
    <div className="mt-10">
      <Hero/>
      <div>
        <Category />
        <div>
          <BestSeller />
          <div>
           < NewsLetter />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home