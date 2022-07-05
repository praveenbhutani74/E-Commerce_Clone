import React from 'react'

import { Rating } from "@material-ui/lab";
import profileImage from '../../Image/download.png'

const Review = ({review}) => {
  
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={profileImage} alt="UserImage" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  )
}

export default Review