import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import {auth} from '../firebase';
import Nav from './nav';
import Home from './home';
import Chat from './chat';
import CreateChatRoom from './create_chat_room';
import ChatRooms from './chat_rooms';
import SignUp from './sign_up';

class App extends Component{
    componentDidMount(){
        auth.onAuthStateChanged(user=>{
            user ? console.log('user:', user.displayName) : console.log('no user found');
        })
    }
    render(){
        return(
            <div>
                <Nav/>
                <div className="container">
                    <Route exact path="/" component={Home}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/chat/:id" component={Chat}/>
                    <Route path="/chat-rooms" component={ChatRooms}/>
                    <Route path="/create-room" component={CreateChatRoom}/>
                </div>
            </div>
        )
    }

}
   

export default App;
