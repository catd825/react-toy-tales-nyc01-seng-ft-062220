import React, { Component } from 'react';

class ToyCard extends Component {

  deleteHelper = () => {
    this.props.deleteHandler(this.props.toyObj.id)
    // console.log(this.props.toyObj.id)
  }

  likeHelper = () => {
    this.props.likeHandler(this.props.toyObj)
    // console.log(this.props.toyObj)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toyObj.name}</h2>
        <img src={this.props.toyObj.image} alt={this.props.toyObj.name} className="toy-avatar" />
        <p>{this.props.toyObj.likes} Likes </p>
        <button className="like-btn" onClick={this.likeHelper}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.deleteHelper}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
