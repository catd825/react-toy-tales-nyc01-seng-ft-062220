import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {
  
  renderToys = () => {
    console.log("rendering toys", this.props)
    return this.props.toyArray.map(toyObj => <ToyCard key={toyObj.key} toyObj={toyObj} />)
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
