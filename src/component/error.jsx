import React, {Component} from 'react';

export default class Error extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className='error-container'>
               <p>unfortunately an error has occurred please try again later!</p>
            </div>
        )
    }
}
        