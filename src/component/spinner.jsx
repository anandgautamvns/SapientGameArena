import React, {Component} from 'react';
import loaderGif from './../assets/images/blocks-loader.gif';

export default class Spinner extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className='loader-container'>
               <img src={loaderGif} alt=''/>
            </div>
        )
    }
}
        