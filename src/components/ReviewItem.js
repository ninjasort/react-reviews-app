import React, { Component } from 'react'
import StarRating from 'react-star-rating'

export default class ReviewItem extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    let { review } = this.props
    return (
      <div className="review-item">
        <img className="review-item__image" src={review.avatar} />
        <h3 className="review-item__heading">{review.name}</h3>
        <span>
          <StarRating  
            name="react-star-rating" 
            totalStars={5} 
            rating={3} 
            size={20}
            disabled={true} />
        </span>
        <div className="review-item__content">{review.comments}</div>
      </div>
    )
  }
  
}