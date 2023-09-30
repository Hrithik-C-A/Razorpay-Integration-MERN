import React from 'react'
import Card from './components/Card'
import { products } from './products'

const App = () => {
  return (
    <div className='h-[100vh] flex justify-center'>
      { products.map(item => <Card key={item._id} image={item.image} name={item.name} price={item.price} currency={item.currency} receipt={item.receipt} notes={item.notes}/>) }
    </div>
  )
}

export default App