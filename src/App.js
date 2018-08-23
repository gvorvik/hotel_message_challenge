import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Guests from './components/Guests/Guests';
import Companies from './components/Companies/Companies';
import Message from './components/Message/Message';

class App extends Component {
  constructor() {
    super()

    this.state = {
      guests: [],
      companies: [],
      messages: [],
      selectedGuest: {

      },
      selectedCompany: {
        id: '',
        company: '',
        city: '',
        timezone: ''
      },
      selectedMessage: {

      },
    }

  }

  componentDidMount() {
    this.getGuests();
    this.getCompanies();
    this.getMessages();
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

  getMessages = () => {
    axios({
      method: 'GET',
      url: '/api/messages'
    })
    .then(response=> this.setState({messages: response.data}))
    .catch(err=>console.log(err))
  }

  handleGuestSelect = (e) => {
    let selectedGuest;
    this.state.guests.forEach(guest => {
      if(guest.id === Number(e.target.value)) {
        return selectedGuest = guest;
      }
    });
    this.setState({selectedGuest});
  }

  handleCompanySelect = (e) => {
    let selectedCompany;
    this.state.companies.forEach(guest => {
      if(guest.id === Number(e.target.value)) {
        return selectedCompany = guest;
      }
    });
    this.setState({selectedCompany});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Message Generator</h1>
        </header>
        <Guests 
          guests={this.state.guests}
          handleSelect={this.handleGuestSelect}
        />
        <Companies 
          companies={this.state.companies}
          handleSelect={this.handleCompanySelect}
        />
        <Message 
          selectedCompany={this.state.selectedCompany}
          selectedGuest={this.state.selectedGuest}
        />
      </div>
    );
  }
}

export default App;
