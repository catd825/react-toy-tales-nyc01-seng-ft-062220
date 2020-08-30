import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import toyData from './data'


class App extends React.Component{

  state = {
    toyData: [],
    display: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    console.log(this.state, "mounted")
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toyData => this.setState({toyData: toyData}))
  }
  

  submitHandler = (newToy) => {
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newToy)
    }

    fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(newToy => this.setState({toyData: [...this.state.toyData, newToy]}, () => console.log(this.state)))
  }

  deleteHandler = (id) => {
    let toyUrl = "http://localhost:3000/toys/"
    let newToyArray = this.state.toyData.filter(toy => {
        return toy.id !== id
    })

    this.setState({toyData: newToyArray})

    const configObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }

    fetch(toyUrl + id, configObj)
    .then(response => response.json())

  }


  likeHandler = (likedObj) => {

    let id = likedObj.id
    let newLikes = likedObj.likes + 1

    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({likes: newLikes})
    }

    fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(response => response.json())
    .then(updatedObj => {
      let newArray = [...this.state.toyData]
      let toy = newArray.find(toyObj => toyObj.id === updatedObj.id)
      toy.likes = newLikes
      this.setState({toyData: newArray})
    })
  }


  render(){
    console.log("render app", this.state)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm submitHandler={this.submitHandler} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toyArray={this.state.toyData} deleteHandler={this.deleteHandler} likeHandler={this.likeHandler} />
      </>
    );
  }

}

export default App;
