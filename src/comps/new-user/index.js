import React, { Component } from 'react';
import axios from 'axios'
import './style.css'
import {withRouter} from 'react-router-dom'
import store from '../../store'

export class newUser extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    send() {
        const inputs = document.querySelectorAll('input')
        let itr = 0;
        for(itr of inputs) {
            if(itr.value === '') {
                alert('Fill out all feilds')
                return
            }
        }

        if(inputs[2].value !== inputs[3].value) {
            alert('Passwords do not match')
            return
        }

        const toSend = {
            username: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value,
            friends: []
        }
        axios.post('http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:3456/new-user', toSend)
        .then((res, req, send) => {
            console.log(res.data)
            if(res.data.insertedCount) {
                this.props.history.push(`/login/${res.data.insertedIds[0]}`)
            }
        })
    }

    render() { 
        return ( 
            <div>
                <div className='header fixed'>
                    <h1>Welcome home</h1>
                </div>
                <div id='new-user-container'>
                    <div id='new-user-modal'>
                        <input placeholder='Username' />
                        <input placeholder='Email' />
                        <input placeholder='Password' type='password'/>
                        <input placeholder='Confirm Password' type='password' />
                        <button onClick={()=> this.send()}>Sign Me Up!</button>
                    </div>
                </div>
                <div id='new-user-screen'>

                </div>
            </div>
         )
    }
}
 
export default withRouter(newUser);