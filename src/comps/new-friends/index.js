import React, { Component } from 'react';
import axios from 'axios';
import './style.css'
import { NavLink } from 'react-router-dom'
import store from '../../store'

const loadingImage = (state) => {
    if(state) {
        return <img src={state} alt='friend' />
    }
    return <h1 id='loading'>One Second...</h1>
    
}

export class NewFriend extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dog: true,
            cat: false,
            img: ''
         }
    }

    getTwo() {
        this.setState({img: false})
        if(this.state.dog) {
        axios.get('https://dog.ceo/api/breeds/image/random')
        .then((res, req, err) => {
            if(err) console.log(err)
            this.setState({
                img: res.data.message
            })
        })
        }
        else {
        axios.get('http://random.cat/meow')
        .then((res, req, err) => {
            if(err) console.log(err)
            this.setState({
                img: res.data.file
            })
        })
    }
    }

    pickOne(val) {
        const options = document.getElementById('friend-selector').childNodes
        if(val === 'dog') {
            this.setState({cat: false, dog: true})
            options[0].classList.add('highlighted')
            options[1].classList.remove('highlighted')
            axios.get('https://dog.ceo/api/breeds/image/random')
            .then((res, req, err) => {
                if(err) console.log(err)
                this.setState({
                    img: res.data.message
                })
            })
        }
        else {
            this.setState({cat: true, dog: false})
            options[1].classList.add('highlighted')
            options[0].classList.remove('highlighted')
            axios.get('http://random.cat/meow')
            .then((res, req, err) => {
                if(err) console.log(err)
                this.setState({
                    img: res.data.file
                })
            })
        }
    }

    yay() {
        if(this.state.img) {
            const toSend = {
                id: this.props.match.params.id,
                url: this.state.img
            }
            axios.put('http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:3456/new-pic', toSend)
            .then((res, req, err) => {
                if(res.data.test) {
                    console.log('new picture added')
                    this.getTwo()
                }
            })
        }
    }

    nay() {
        if(this.state.img) this.getTwo()
    }

    componentWillMount() {
        this.getTwo()
    }

    render() { 
        return ( 
            <div>
                <div className='header fixed' id='lots-of-words'>
                    <h1>New Friend Finder</h1>
                    <div id='home-linx'>
                        <NavLink to={`/review/${this.props.match.params.id}`}>Review</NavLink>
                        <NavLink to='/' className='right-button'>Sign out</NavLink>
                    </div>
                </div>
                <div id='new-friend-container'>
                    <div id='possible-friend'>
                        <div id='friend-selector'>
                            <span className='highlighted' onClick={()=>this.pickOne('dog')}>Dogs</span>
                            <span onClick={()=>this.pickOne('cat')}>Cats</span>
                        </div>
                        {loadingImage(this.state.img)}
                        <div id='friend-buttons'>
                        <button id='sad' onClick={()=>this.nay()}>Nay!</button>
                        <button id='happy' onClick={()=>this.yay()}>Yay!</button>
                    </div>
                    </div>
                </div>
            </div>
         )
    }
}
 
export default NewFriend;