import React, { useState } from 'react'
import AnimedNumber from '../components/common/AnimedNumber'
import ProductAnimation from '../components/common/3d'
export default function App() {
  const [value, setValue] = useState(5)

  return (

    <div className=" items-center justify-center h-screen">
      <AnimedNumber value={value} onChange={setValue} min={0} max={10} />


      <ProductAnimation />
    </div>  


  )
}
