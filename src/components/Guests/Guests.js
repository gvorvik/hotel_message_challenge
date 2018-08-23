import React from 'react';

const Guests = (props) => {

    let guests = props.guests.map(guest => {
        return <option key={guest.id} value={guest.id}>{guest.firstName} {guest.lastName}</option>
    });

    return(
        <div>
            <h2>Please Select A Guest</h2>
            <select onChange={props.handleSelect} defaultValue=" ">
                <option disabled value=" "> </option>
                {guests}
            </select>
        </div>
    )
}

export default Guests