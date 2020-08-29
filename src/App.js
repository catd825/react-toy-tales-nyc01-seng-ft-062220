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
    let newToyList = [...this.state.toyData, newToy]

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
    .then(toys => this.setState({toyData: newToyList}, () => console.log(this.state)))
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
        <ToyContainer toyArray={this.state.toyData} />
      </>
    );
  }

}

export default App;
