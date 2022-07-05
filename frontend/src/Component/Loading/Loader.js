import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Loader.css'

import React from 'react'

const Loader = ({cards}) => {
  return (
      Array(cards).fill(0).map((item,i)=>(<div className='Card' key={i} ><div className='card-skelton' key={i}>
      <div className='left-col' >
      <Skeleton circle={true} inline={true} enableAnimation={true} />

      </div>
      <div className='right-col'>
      <Skeleton count={5} style={{marginBottom: ".6rem"}}/>
      </div>
    </div>
    </div>
      ))
   
  )
}

export default Loader