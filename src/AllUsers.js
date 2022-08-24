import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios'
import {Context} from './context/Context'

function AllUsers(props) {

    
    const initialState = {
        loading: true,
        post: [],
        error: ''
    }

    const reducer = (state,action) => {
        switch(action.type){
            case 'FETCH_SUCCESS':
                console.log("success")
                // action.payload.map(item => setAllUserId(prevArray => [...prevArray, item.id]))
                // console.log(allUserId)
                return {
                    loading: false,
                    post: action.payload,
                    error: ''    
            }
            case 'FETCH_ERROR':
                console.log("fail")
                return {
                    loading: false,
                    post: {},
                    error: 'Something went wrong'    
            }
            default: 
                return {
                loading: false,
                post: [],
                error: 'default error'    
        }
        }
    }
    const {allUserId, setAllUserId } = useContext(Context)
    useEffect(() => {
        axios.get('http://localhost:8081/api/users')
        .then(response => {
            dispatch({type: "FETCH_SUCCESS", payload: response.data})
            response.data.map(item => setAllUserId(prevArray => [...prevArray, item.id]))
            console.log(allUserId)
            
        }) 
        .catch(error => {
            dispatch({type: "FETCH_ERROR"})
        })
        state.post.map(item => setAllUserId(prevArray => [...prevArray, item.id]))
        // console.log(allUserId)
    },[])

    // useEffect(() => {
    //     state.post.map(item => setAllUserId(prevArray => [...prevArray, item.id]))
    // },[allUserId])

    const [state,dispatch]=useReducer(reducer, initialState)
    //state.post.map(item => setAllUserId(prevArray => [...prevArray, item.id]))
    //console.log(allUserId)
    return (
        <div>
            <h3> Showing All Users </h3>
            <div style = {{textAlign: 'center' }}> 
                
                <ol style ={{textAlign: 'left', listStylePosition: 'inside', width: '600px', margin: '0 auto'} }>
                    {state.post.map(item =>  <li key={item.id}> <ul> <li> id {item.id} </li><li> <span style={{fontWeight: 'bold'}}> First Name: </span> {item.firstName} </li> <li> <span style={{fontWeight: 'bold'}}> Last Name: </span> {item.lastName} </li>
                    <li> <span style={{fontWeight: 'bold'}}> Password: </span> {item.password} </li></ul></li>)}
                </ol>
            </div>
        </div>
    );
}

export default AllUsers;