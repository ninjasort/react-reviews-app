import React from 'react';
import ReactDOM from 'react-dom';
import ReviewsList from './ReviewsList';
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

export default class ReviewModal extends React.Component {

  static defaultProps = {
    formFields: {
      name: '',
      rating: 0,
      comments: '',
      avatar: ''
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      formFields: props.formFields
    };
  }
  
  resetForm() {
    this.setState({
      formFields: {
        name: '',
        rating: 0,
        comments: '',
        avatar: ''
      }
    });
  }

  handleReviewSubmission(fields, e) {
    e.preventDefault();
    // submit the form
    this.props.onSubmitReview(this.state.formFields);
    // clean up the state
    this.resetForm();
  }

  updateAvatarPreview(e, data) {
    let formFields = Object.assign({}, this.state.formFields, {
      avatar: data.dataURI
    });
    this.setState({
      formFields
    });
  }
  
  handleChange(key, e) {
    let formFields = Object.assign({}, this.state.formFields, {
      [key]: e.target.value
    });
    this.setState({formFields});
  }

  handleRatingChange(e, data) {
    let formFields = Object.assign({}, this.state.formFields, {
      rating: data.rating
    });
    this.setState({formFields});
  }

  render() {
    let { modalIsOpen, product } = this.props;
    return (
      <Modal 
        backdropClosesModal
        isOpen={modalIsOpen} 
        onCancel={e => {
          this.resetForm.call(this);
          this.props.onToggleModal.call(this)
        }}>
        <ModalHeader 
          showCloseButton 
          onClose={e => {
            this.resetForm.call(this);
            this.props.onToggleModal.call(this)
          }}>
          <img src={product.image} width="75" />
          <div className="Modal__header__text">
            <h5>Write a review for</h5>
            <h2>{product.title}</h2>
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
                onChange={this.handleChange.bind(this, 'name')} 
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
                onChange={this.handleChange.bind(this, 'comments')}
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
    );
  }
}