import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './reviews.jsx';
import StarRating from 'react-star-rating';
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
      title: 'React.js Essentials',
      author: 'Artemij Fedosejev',
      description: 'React.js Essentials will take you on a fast-paced journey through building your own maintainable React.js application. Begin by exploring how you can create single and multiple user interface elements. Create stateless and stateful components and make them reactive, learn to interact between your components and lifecycle methods and gauge how to effectively integrate your user interface components with other JavaScript libraries. Delve deep into the core elements of the Flux architecture and learn how to manage your application using stores. Finish by going that extra mile with the Jest test framework, running multiple tests on your application and find solutions to scale it further without complexity.',
      image: '/assets/img/reactjs-essentials.jpg',
      callToAction: 'Buy Book',
      modalIsOpen: true,
      formFields: {},
      reviewItems: [
        { name: 'Alex', avatar: 'assets/img/avatar-1.jpg', rating: 2, comments: 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag, ugh fashion axe Pitchfork tousled freegan asymmetrical literally twee Thundercats. Whatever Blue Bottle Neutra irony 8-bit. Kogi ethnic ugh fashion axe bicycle rights.'},
        { name: 'Andrew', avatar: 'assets/img/avatar-2.jpg', rating: 4, comments: 'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag, ugh fashion axe Pitchfork tousled freegan asymmetrical literally twee Thundercats. Whatever Blue Bottle Neutra irony 8-bit. Kogi ethnic ugh fashion axe bicycle rights.'}
      ]
    };
  }

  handleReviewSubmission(e, fields) {
    e.preventDefault();
    var reviewItems = !!this.state.reviewItems.length ? this.state.reviewItems.concat(fields) : [fields];
    console.log(reviewItems);
    this.setState({
      // either add a review item or start an array with the first one
      reviewItems: reviewItems,
      // clear the form state
      formFields: {
        name: '',
        rating: 0,
        comments: '',
        avatar: ''
      },
      // close the modal
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  updateAvatarPreview(e, data) {
    console.log(data);
  }
  
  handleChange(key) {
    return (e) => {
      var state = this.state.formFields;
      state[key] = e.target.value;
      this.setState(state);
    }
  }

  handleRatingChange(e, data) {
    var state = this.state.formFields;
    state['rating'] = data.rating;
    this.setState(state);
  }
  
  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  render() {
    return (
      <div className="review-panel">
        <div className="review-product">
          <div className="review-product__image">
            <img src={this.state.image} width="200" />
          </div>
          <div className="review-product__details">
            <h2>{this.state.title}</h2>
            <h4>{this.state.author}</h4>
            <p>{this.state.description}</p>
            <a href="/" className="review-product__btn btn btn-primary">{this.state.callToAction}</a>
          </div>
        </div>
        <Reviews reviews={this.state.reviewItems} onOpenModal={this.toggleModal.bind(this)} />
        <Modal isOpen={this.state.modalIsOpen} onCancel={this.toggleModal.bind(this)} backdropClosesModal>
          <ModalHeader showCloseButton onClose={this.toggleModal.bind(this)}>
            <img src={this.state.image} width="75" />
            <div className="Modal__header__text">
              <h5>Write a review for</h5>
              <h2>{this.state.title}</h2>
            </div>
          </ModalHeader>
          <ModalBody>
            <Form ref="formRef" onSubmit={this.handleReviewSubmission.bind(this, this.state.formFields)}>
              <FormField label="Name" htmlFor="name">
                <FormInput 
                  name="name"
                  autofocus 
                  type="text" 
                  placeholder="Enter name"
                  onChange={this.handleChange.call(this, 'name')} 
                  value={this.state.formFields.name} />
              </FormField>
              <FormField label="Rating" htmlFor="rating">
                <StarRating 
                  name="rating" 
                  totalStars={5} 
                  size={20} 
                  onRatingClick={this.handleRatingChange.bind(this)}
                  rating={this.state.formFields.rating} />
              </FormField>
              <FormField label="Comments" htmlFor="comments">
                <FormInput 
                  name="comments" 
                  placeholder="Enter comments" 
                  onChange={this.handleChange.call(this, 'comments')}
                  value={this.state.formFields.comments} 
                  multiline />
              </FormField>
              <FormField label="Avatar" htmlFor="avatar">
                <FileUpload 
                  name="avatar"
                  onChange={this.updateAvatarPreview.bind(this)}>
                </FileUpload>
              </FormField>
              <FormField className="text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
              </FormField>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}