import React from 'react'
import { render } from 'react-dom'
import styles from './styles/app'
import ReviewPanel from './components/ReviewPanel'

class ReviewApp extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="review">
        <ReviewPanel />
      </div>
    )
  }
  
}

render(
  <ReviewApp />, 
  document.getElementById('app')
)