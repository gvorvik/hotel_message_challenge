import React, { Component } from 'react';

class NewMessage extends Component {
    constructor() {
        super();
        this.state = {
            messageDescription: '',
            messageText: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () => {
        this.props.addMessageTemplate(this.state);
        this.setState({            
            messageDescription: '',
            messageText: ''
        });
    }

    logValue = (e) => {
        this.setState({messageText: this.state.messageText + e.target.value});
    }

    render() {
        let variables = { ...this.props.selectedGuest, ...this.props.selectedCompany};

        let buttons = [];

        for (let i in variables) {
            let value = `%${i}%`;
            buttons = [...buttons, <button key={i} value={value} onClick={this.logValue}>{i}</button>]
        }

        return (
            <div>
                <h2>Create Custom Message Template</h2>
                <div>
                    <h3>Insert Placeholder</h3>
                    {buttons}
                </div>
                <div>
                    <label htmlFor="messageDescription">Message Name</label>
                    <input name="messageDescription" value={this.state.messageDescription} onChange={this.handleChange} type="text" id="messageName"/>
                </div>
                <textarea name="messageText" value={this.state.messageText} onChange={this.handleChange} id="customMessage"></textarea>
                <button id="addTemplate" onClick={this.handleSubmit}>Add Template</button>
            </div>
        )
    }
}

export default NewMessage;