import React from 'react';
import ReactDOM from 'react-dom';
import ReviewItem from './ReviewItem';

export default class ReviewList extends React.Component {

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
            <li key={`review-${i}`}>
              <ReviewItem review={review} />
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