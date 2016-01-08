import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from 'react-star-rating';

export default class Reviews extends React.Component {

  static propTypes = {
    onOpenModal: React.PropTypes.func,
    reviews: React.PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      title: 'Reviews'
    };
  }

  renderReviews() {
    if (this.props.reviews.length) {
      return this.props.reviews.map((review, i) => {
        return (
            <li key={`review-${i}`} className="review-item">
              <img src={review.avatar} className="review-item__image" />
              <h3 className="review-item__heading">{review.name}</h3>
              <StarRating name="react-star-rating" totalStars={5} rating={3} size={20} />
              <div className="review-item__content">{review.comments}</div>
            </li>
          );
      });
    }
  }

  render() {
    return (
      <div className="reviews">
        <h2 className="reviews__title">{this.state.title}</h2>
        <button className="reviews__btn btn btn-primary" onClick={this.props.onOpenModal.bind(this)}>Write a Review</button>
        <div className="reviews-list">
          <ul>
            {this.renderReviews.call(this)}
          </ul>
        </div>
      </div>
    );
  }
}