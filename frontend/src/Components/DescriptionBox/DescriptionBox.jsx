import React from 'react'
import './DescriptionBox.css'
 

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
    </div>
    <div className='descriptionbox-description'>
        <p>E-commerce (electronic commerce) is the practice of buying and selling goods, services, or digital products over the internet. It involves online transactions between businesses, consumers, or a combination of both and includes activities such as online shopping, electronic payments, online auctions, and internet banking. E-commerce enables businesses to reach a global audience, operate 24/7, and reduce costs associated with physical storefronts, while providing consumers with convenience and a wider variety of products and services.</p>
        <p>E-commerce displays product listings, a shopping cart for selecting items, secure payment options, customer reviews, promotions, search tools, customer accounts for order management, and access to customer support.</p>
    </div>
    </div>
  )
}

export default DescriptionBox
