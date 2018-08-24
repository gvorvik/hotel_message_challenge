import React from 'react';

const Message = (props) => {
    
    let messages = props.messages.map(message => {
        return <option key={message.id} value={message.id}>{message.messageDescription}</option>
    });;


    return(
        <div>
            <h2>Message</h2>
            <select defaultValue=" " onChange={props.handleMessageSelect}>
                <option disabled value=" "> </option>
                {messages}
            </select>
        </div>
    )
}

export default Message;