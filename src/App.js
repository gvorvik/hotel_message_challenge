import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Guests from './components/Guests/Guests';
import Companies from './components/Companies/Companies';

class App extends Component {
  constructor() {
    super()

    this.state = {
      guests: [],
      companies: [],
    }

  }

  componentDidMount() {
    this.getGuests();
    this.getCompanies();
  }

  getGuests = () => {
    axios({
      method: 'GET',
      url: '/api/guests'
    })
    .then(response=> this.setState({guests: response.data}))
    .catch(err=>console.log(err))
  }

  getCompanies = () => {
    axios({
      method: 'GET',
      url: '/api/companies'
    })
    .then(response => this.setState({companies: response.data}))
    .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Message Generator</h1>
        </header>
        <Guests 
          guests={this.state.guests}
        />
        <Companies 
          companies={this.state.companies}
        />
      </div>
    );
  }
}

export default App;
