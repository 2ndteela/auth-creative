import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './style.css'
import pupper from '../../pics/corgi-puppy.jpg'
import kitty from '../../pics/kitty.jpg';
import hedgehog from '../../pics/hedgehog.jpg';
import axios from 'axios'
import store from '../../store'

const pic = (path, caption) => (
    <div className='home-pic'>
        <img src={path} alt='pupper'/>
        <div className='caption'>{caption}</div>
    </div>
)

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userID: null
         }
    }

    login() {
        const inputs = document.querySelectorAll('input')
        const toSend = {
            email: inputs[0].value,
            password: inputs[1].value
        }
        console.log(toSend)
        axios.post('http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:3456/users', toSend)
        .then((res, req, err) => {
            if (!res.data.message) {
                console.log(res.data)
                this.props.history.push(`/login/${res.data._id}`)
            }
            else alert(res.data.message)
        })
    }
    
    componentDidMount() {
        const test = Math.floor(Math.random() * 3)
        const list = document.querySelectorAll('.pic-num-div')
        list[test].style.display = 'flex'
        list[test].style.opacity = 1
        list[test].style.top = '0px';
    }

    render() { 
        return ( 
            <div id='home-container'>
                <div className='header'>
                    <div id='icon-img'>
                        <img src='http://www.clker.com/cliparts/K/G/n/S/T/a/blue-pawprint-md.png' alt='logo'/>
                        <h1>Tinder Fur Pets!</h1>
                    </div>
                    <div id='home-linx'>
                        <div className='home-inputs'>
                            <input placeholder='Email' />
                            <input placeholder='Password' type='password' />
                        </div>
                        <div className='home-inputs'>
                            <button onClick={() => this.login()} id='log-in'>Log In</button>
                            <NavLink id='new-user' to='/new-user'>Sign Up</NavLink>
                        </div>
                    </div>
                </div>
                <div id='main-page-container'>
                    <div id='pics-div'>
                        <div id='one-pic' className='pic-num-div'>
                            {pic(pupper, "Man's best pup :)")}
                        </div>
                        <div id='two-pic' className='pic-num-div'>
                            {pic(kitty, "Doin' a boop")}
                        </div>
                        <div id='three-pic' className='pic-num-div'>
                            {pic(hedgehog, "So snuggly")}
                        </div>
                    </div>
                    <div>
                        <p>Find a furry friend near you!</p>
                    </div>
                </div>
            </div>
         )
    }
}
 
export default withRouter(Home);