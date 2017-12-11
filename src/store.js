import {createStore} from 'redux'

const intializeState = {
    username: "this is a test"
}

export const Reducer = (state = intializeState, action) => {
    console.log(action)
    let tempState = Object.assign(state)
    switch(action.type) {
        case "USER_NAME":
            tempState.username = action.payload
            break

        case "SET_USER":
            tempState.user = action.payload
            break

        case "ADD_PIC":
            tempState.user.friends.push(action.payload)
            break
        
        default: 
            break
    }
    console.log(tempState)
    return tempState
}

var store = createStore(Reducer)


export default store