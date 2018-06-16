import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {signInAction, signOutAction} from '../actions';
import {auth} from '../firebase';
import Nav from './nav';
import Home from './home';
import Chat from './chat';
import CreateChatRoom from './create_chat_room';
import ChatRooms from './chat_rooms';
import SignUp from './sign_up';
import SignIn from './sign_in';
import RouteAuth from '../hoc/auth';

class App extends Component{
    componentDidMount(){
        auth.onAuthStateChanged(user=>{
            user ? (console.log('user:', user.displayName), this.props.signInAction(user))  : (console.log('no user found'),  this.props.signOutAction());


            // if(user){
            //     console.log('user:', user.displayName)
            //     this.props.signInAction(user);
            // }else{
            //     console.log('no user found');
            //     this.props.signOutAction();
            // }
            
        })
    }
    render(){
        return(
            <div>
                <Nav/>
                <div className="container">
                    <Route exact path="/" component={Home}/>
                    <Route path="/sign-up" component={RouteAuth(SignUp,true, '/chat-rooms')}/>
                    <Route path="/sign-in" component={RouteAuth(SignIn, true, '/chat-rooms')}/>
                    <Route path="/chat/:id" component={RouteAuth(Chat)}/>
                    <Route path="/chat-rooms" component={RouteAuth(ChatRooms)}/>
                    <Route path="/create-room" component={RouteAuth(CreateChatRoom)}/>
                </div>
            </div>
        )
    }

}
   

export default withRouter(connect(null, {signInAction, signOutAction})(App));
