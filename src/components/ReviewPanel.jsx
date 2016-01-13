import React from 'react';
import ReactDOM from 'react-dom';
import ReviewList from './ReviewList';
import ReviewModal from './ReviewModal';
import {
  Button, 
  Modal, 
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormField,
  FormInput,
  FileUpload
} from 'elemental';

export default class ReviewPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        title: 'React.js Essentials',
        author: 'Artemij Fedosejev',
        description: 'React.js Essentials will take you on a fast-paced journey through building your own maintainable React.js application. Begin by exploring how you can create single and multiple user interface elements. Create stateless and stateful components and make them reactive, learn to interact between your components and lifecycle methods and gauge how to effectively integrate your user interface components with other JavaScript libraries. Delve deep into the core elements of the Flux architecture and learn how to manage your application using stores. Finish by going that extra mile with the Jest test framework, running multiple tests on your application and find solutions to scale it further without complexity.',
        image: '/assets/img/reactjs-essentials.jpg',
        link: 'http://amzn.to/1N1lLUT'
      },
      callToAction: 'Buy Book',
      reviewItems: [
        { name: 'Alex', avatar: 'assets/img/avatar-1.jpg', rating: 2, comments: 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag, ugh fashion axe Pitchfork tousled freegan asymmetrical literally twee Thundercats. Whatever Blue Bottle Neutra irony 8-bit. Kogi ethnic ugh fashion axe bicycle rights.'},
        { name: 'Andrew', avatar: 'assets/img/avatar-2.jpg', rating: 4, comments: 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag, ugh fashion axe Pitchfork tousled freegan asymmetrical literally twee Thundercats. Whatever Blue Bottle Neutra irony 8-bit. Kogi ethnic ugh fashion axe bicycle rights.'}
      ],
      modalIsOpen: false
    };
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  handleSubmitReview(fields) {
    for(const field in fields) {
      if (!fields[field]) {
        this.setState({
          error: 'Please fill in all fields.'
        });
        return false;
      }
    }
    this.toggleModal();
    let reviewItems = this.state.reviewItems.concat(fields);
    this.setState({
      error: '',
      reviewItems
    });
  }

  render() {
    let { product, callToAction } = this.state;
    return (
      <div className="review-panel">
        <div className="review-product">
          <div className="review-product__image">
            <a href={product.link}>
              <img src={product.image} width="200" />
            </a>
          </div>
          <div className="review-product__details">
            <h2>{product.title}</h2>
            <h4>{product.author}</h4>
            <p>{product.description}</p>
            <a href={product.link} className="review-product__btn btn btn-primary">{callToAction}</a>
          </div>
        </div>
        <ReviewList 
          reviews={this.state.reviewItems} 
          onOpenModal={this.toggleModal.bind(this)} />
        <ReviewModal 
          product={product}
          modalIsOpen={this.state.modalIsOpen} 
          error={this.state.error} 
          onToggleModal={this.toggleModal.bind(this)}
          onSubmitReview={this.handleSubmitReview.bind(this)} />
      </div>
    );
  }
}