import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import tz from 'moment-timezone';
import './App.css';
import Guests from './components/Guests/Guests';
import Companies from './components/Companies/Companies';
import Message from './components/Message/Message';
import NewMessage from './components/NewMessage/NewMessage';

class App extends Component {
  constructor() {
    super()

    this.state = {
      guests: [],
      companies: [],
      messages: [],
      selectedGuest: {
        id: '',
        greeting: '',
        firstName: '',
        lastName: '',
        reservation: {
          roomNumber: '',
          startTimestamp: '',
          endTimestamp: '',
          startDate: '',
          endDate: '',
          startTime: '',
          endTime: ''
        }
      },
      selectedCompany: {
        id: '',
        company: '',
        city: '',
        timezone: 'US/Central'
      },
      selectedMessage: {
        id: '',
        messageDescription: '',
        messageText: '',
      },
      show: false,
      startTime: '',
      endTime: '',
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
      .then(response => this.setState({ guests: response.data }))
      .catch(err => console.log(err))
  }

  getCompanies = () => {
    axios({
      method: 'GET',
      url: '/api/companies'
    })
      .then(response => this.setState({ companies: response.data }))
      .catch(err => console.log(err))
  }

  getMessages = () => {
    axios({
      method: 'GET',
      url: '/api/messages'
    })
      .then(response => this.setState({ messages: response.data }))
      .catch(err => console.log(err))
  }

  setGreeting = () => {
    var today = new Date()
    var curHr = today.getHours()
    if (curHr < 12) {
      return this.setState({ selectedGuest: { ...this.state.selectedGuest, greeting: 'Good morning' } });
    } else if (curHr < 18) {
      return this.setState({ selectedGuest: { ...this.state.selectedGuest, greeting: 'Good afternoon' } });
    } else {
      return this.setState({ selectedGuest: { ...this.state.selectedGuest, greeting: 'Good evening' } });
    }
  }

  setTime = (stamp) => {
    let timestamp = new Date(stamp * 1000);
    return moment(timestamp).tz(this.state.selectedCompany.timezone).format('h:mm a');
  }

  setDate = (stamp) => {
    let timestamp = new Date(stamp * 1000);
    return moment(timestamp).format('MMMM Do, YYYY');
  }


  handleGuestSelect = (e) => {
    let selectedGuest;
    this.state.guests.forEach(guest => {
      if (guest.id === Number(e.target.value)) {
        return selectedGuest = guest;
      }
    });
    this.setState({
      selectedGuest: {
        ...this.state.selectedGuest,
        ...selectedGuest,
        reservation: {
          ...selectedGuest.reservation,
          startDate: this.setDate(selectedGuest.reservation.startTimestamp),
          endDate: this.setDate(selectedGuest.reservation.endTimestamp),
          startTime: this.setTime(selectedGuest.reservation.startTimestamp),
          endTime: this.setTime(selectedGuest.reservation.endTimestamp),
        }
      }
    });
  }

  handleCompanySelect = (e) => {
    if(this.state.selectedGuest.id !== '') {
      this.setState({
        selectedGuest:{
          ...this.state.selectedGuest,
          reservation: {
            ...this.state.selectedGuest.reservation,
            startTime: this.setTime(this.state.selectedGuest.reservation.startTimestamp),
            endTime: this.setTime(this.state.selectedGuest.reservation.endTimestamp),
          }
        }
      })
    };
    let selectedCompany;
    this.state.companies.forEach(company => {
      if (company.id === Number(e.target.value)) {
        return selectedCompany = company;
      }
    });
    this.setState({ selectedCompany });
  }

  handleMessageSelect = (e) => {
    let selectedMessage;
    this.state.messages.forEach(message => {
      if (message.id === Number(e.target.value)) {
        selectedMessage = message;
      }
    });
    this.setState({ selectedMessage });
  }

  setFinalMessageText = () => {
    if (this.state.selectedGuest.firstName === '') {
      return alert('Please select a guest.');
    } else if (this.state.selectedCompany.company === '') {
      return alert('Please select a company.');
    } else if (this.state.selectedMessage.messageText === '') {
      return alert('Please select a message template.');
    }

    let message = this.state.selectedMessage.messageText;
    let variables = { ...this.state.selectedCompany, ...this.state.selectedGuest };
    message = this.replacePlaceholders(variables, message);
    this.setState({ finalMessage: message })
    return message;
  }

  replacePlaceholders = (obj, message) => {
    for (let i in obj) {
      if (typeof obj[i] !== "object") {
        message = message.replace('%' + i + '%', obj[i]);
      } else {
        message = this.replacePlaceholders(obj[i], message);
      }
    }
    return message;
  }

  addMessageTemplate = (message) => {
    let messageToAdd = { ...message, id: this.state.messages.length + 1 };
    axios({
      method: 'POST',
      url: '/api/newmessage',
      data: messageToAdd
    })
      .then(response => this.getMessages())
      .catch(err => console.log(err));
  }

  showTrue = () => {
    this.setState({ show: true });
  }

  showFalse = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <div className="App">
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
        <button className="btnImportant" onClick={this.setFinalMessageText}>See Message</button>
        <p>- OR -</p>
        <button onClick={this.showTrue} className="btnImportant">Create Custom Template</button>
        <NewMessage
          selectedGuest={this.state.selectedGuest}
          selectedCompany={this.state.selectedCompany}
          addMessageTemplate={this.addMessageTemplate}
          show={this.state.show}
          showFalse={this.showFalse}
        />
      </div>
    );
  }
}

export default App;
