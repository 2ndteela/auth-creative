import React, { Component } from 'react';
import axios from 'axios'
import { NavLink } from "react-router-dom";
import './style.css'
import store from '../../store'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: null
         }
    }

    componentWillMount() {
        const userId = {id: this.props.match.params.id}
        axios.post('http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:3456/get-user', userId)
        .then ((res, req, err) => {
            console.log(res.data)
            this.setState ({
                username: res.data.username
            })
            const action = {
                type: "SET_USER",
                payload: res.data
            }
            store.dispatch(action)
        })
    }
    render() { 
        return ( 
            <div>
                <div className ='header fixed'>
                    <h1>{this.state.username}</h1>
                </div>
                <div id='profile-splash'>
                <NavLink to={`/new-friend/${this.props.match.params.id}`}>
                    <div id='swipe-pic'>
                        <h1>Find New Friends</h1>
                        <div className='profile-screen' id='swipe-screen'></div>
                    </div>
                </NavLink>
                <NavLink to={`/review/${this.props.match.params.id}`}>
                    <div id='review-pic'>
                        <h1>Review</h1>
                        <div className='profile-screen' id='review-screen'></div>
                    </div>
                </NavLink>
                </div>
            </div>
         )
    }
}
 
export default Login