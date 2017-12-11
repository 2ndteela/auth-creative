import React, { Component } from 'react';
import axios from 'axios'
import './style.css'
import store from '../../store'
import { NavLink } from 'react-router-dom';

export class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                friends: []
            },
            bigPic: null
         }
    }

    componentDidMount() {
        const userId = {id: this.props.match.params.id}
        let temp = this
        axios.post('http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:3456/get-user', userId)
        .then ((res, req, err) => {
            console.log(res.data)
            this.setState({
                user: res.data
            })
            console.log(this.state)
        })
    }

    callModal() {
        if(this.state.bigPic)
        return (
        <div id='modal-container' onClick={()=>this.view(null)}>
            <div id='modal-screen'></div>
            <div id='modal'>
                <img src={this.state.bigPic}/>
            </div>
        </div>
        )
        else return null
    }

    view(url) {
        if(this.state.bigPic)
        this.setState({
            bigPic: null
        })
        else {
            this.setState({
                bigPic: url
            })
        }
    }

    render() { 
        if(this.state.user) {
        return ( 
            <div>
                <div className='header'>
                    <h1>Old Friends</h1>
                    <div id='home-linx'>
                        <NavLink to={`/new-friend/${this.props.match.params.id}`}>Make New Friends</NavLink>
                        <NavLink to='/' className='right-button'>Sign Out</NavLink>
                    </div>
                    
                </div>
                <div id='fren-list'>
                    {this.state.user.friends.map((thing, itr) => (
                        <img className='old-fren' src={thing} alt='fren' key={itr + '_fren'} onClick={()=>this.view(thing)} />
                    ))}
                </div>
                {this.callModal()}
            </div>
         )
    }
    else return null
    }
}
 
export default Review;