import Jazzicon from 'react-jazzicon';
import React from "react";

function AddressIcon(props){     
    const address = props.address;    
    const diameter = props.diameter;    
    const jazz = parseInt(address.slice(2,10),16);
    return(
        <Jazzicon diameter={diameter} seed = { jazz } />
    );
}


export default AddressIcon