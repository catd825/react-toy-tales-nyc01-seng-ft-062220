import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {
  
  renderToys = () => {
    console.log("rendering toys", this.props)
    return this.props.toyArray.map(toyObj => <ToyCard key={toyObj.id} toyObj={toyObj} deleteHandler={this.props.deleteHandler} likeHandler={this.props.likeHandler} />)
  }

  render() {
  return(
    <div id="toy-collection">
      {this.renderToys()}
    </div>
    )
  }
}

export default ToyContainer;
