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
      selectedGuest: {},
      selectedCompany: {},
      selectedMessage: {},
      finalMessage: '',
    }

  }

  componentDidMount() {
    this.getGuests();
    this.getCompanies();
    this.getMessages();
    this.setGreeting();
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
    this.setState({selectedGuest: {...this.state.selectedGuest, selectedGuest}});
  }

  handleCompanySelect = (e) => {
    let selectedCompany;
    this.state.companies.forEach(company => {
      if(company.id === Number(e.target.value)) {
        return selectedCompany = company;
      }
    });
    this.setState({selectedCompany});
  }

  handleMessageSelect = (e) => {
    let selectedMessage;
    this.state.messages.forEach(message => {
      if(message.id === Number(e.target.value)) {
        selectedMessage = message;
      }
    });
    this.setState({selectedMessage});
  }

  setFinalMessageText = () => {
    let message = this.state.selectedMessage.messageText;
    let variables = {...this.state.selectedCompany, ...this.state.selectedGuest};
    message = this.replacePlaceholders(variables, message);
    this.setState({finalMessage: message})
    return message;
  }

  replacePlaceholders = (obj, message) => {
    for(let i in obj) {
      if(typeof obj[i] !== "object") {
        message = message.replace('%' + i + '%', obj[i]);
      } else {
        message = this.replacePlaceholders(obj[i], message);
      }
    }
    return message;
  }

  setGreeting = () => {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      return this.setState({selectedGuest:{...this.state.selectedGuest, greeting: 'Good morning'}});
    } else if (curHr < 18) {
      return this.setState({selectedGuest:{...this.state.selectedGuest, greeting: 'Good afternoon'}});
    } else {
      return this.setState({selectedGuest:{...this.state.selectedGuest, greeting: 'Good evening'}});
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Message Generator</h1>
        <Guests 
          guests={this.state.guests}
          handleSelect={this.handleGuestSelect}
        />
        <Companies 
          companies={this.state.companies}
          handleSelect={this.handleCompanySelect}
        />
        <Message 
          messages={this.state.messages}
          handleMessageSelect={this.handleMessageSelect}
        />
        <p>{this.state.finalMessage}</p>
        <button onClick={this.setFinalMessageText}>Generate Message</button>

      </div>
    );
  }
}

export default App;
