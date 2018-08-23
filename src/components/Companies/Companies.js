import React from 'react';

const Companies = (props) => {

    let companies = props.companies.map(company => {
        return <option key={company.id} value={company.id}>{company.company}</option>
    });

    return(
        <div>
            <h2>Please select a company</h2>
            <select onChange={props.handleSelect} defaultValue=" ">
                <option value=" " disabled> </option>
                {companies}
            </select>
        </div>
    )
}

export default Companies;