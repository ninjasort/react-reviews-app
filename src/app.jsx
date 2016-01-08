import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/app.scss';

// components
import ReviewPanel from './components/review-panel.jsx';

class ReviewApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="review">
        <ReviewPanel />
      </div>
    );
  }
}

ReactDOM.render(<ReviewApp />, document.getElementById('app'));