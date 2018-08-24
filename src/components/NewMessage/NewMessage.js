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
        if(this.state.messageDescription === '') {
            return alert('Please enter a message name');
        } else if(this.state.messageText === '') {
            return alert('Please enter message text');
        }
        this.props.addMessageTemplate(this.state);
        this.setState({            
            messageDescription: '',
            messageText: ''
        });
        this.props.showFalse();
    }

    logValue = (e) => {
        this.setState({messageText: this.state.messageText + e.target.value});
    }

    render() {

        if (!this.props.show) {
            return null;
        }

        let variables = { ...this.props.selectedGuest, ...this.props.selectedCompany};

        let buttons = [];

        for (let i in variables) {
            if(typeof variables[i] === "object") {
                for(let j in variables[i]) {
                    let value = `%${j}%`;
                    buttons = [...buttons, <button key={j} value={value} onClick={this.logValue}>{j}</button>]
                }
            } else {
                let value = `%${i}%`;
                buttons = [...buttons, <button key={i} value={value} onClick={this.logValue}>{i}</button>]
            }
        }

        return (
            <div id="customTemplateDiv">
                <div>
                    <h2>Create Custom Message Template</h2>
                    <div>
                        <label htmlFor="messageDescription">Message Name</label>
                        <input name="messageDescription" value={this.state.messageDescription} onChange={this.handleChange} type="text" id="messageName"/>
                    </div>
                    <div>
                        <h3>Insert Placeholder</h3>
                        {buttons}
                    </div>
                    <textarea rows="6" cols="50" name="messageText" value={this.state.messageText} onChange={this.handleChange} id="customMessage"></textarea>
                    <button className="btnImportant" onClick={this.handleSubmit}>Add Template</button>
                    <button className="btnImportant" onClick={this.props.showFalse}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default NewMessage;