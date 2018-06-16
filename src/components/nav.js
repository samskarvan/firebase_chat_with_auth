import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {signOutUser} from '../actions';

const Nav = props => {
    const {auth, username} = props.user;
    console.log('auth:', auth, username);

    const navStyle = {
        padding: '0 10px'
    };

    const renderLinks = () =>{
        if(auth){
            return(
               <Fragment>
                   <li>
                        <Link to="/chat-rooms">Chat Rooms</Link>
                    </li>
                    <li>
                        <Link to="/create-room">Create Chat Room</Link>
                    </li>
                    <button onClick={props.signOutUser} className="btn grey-lighten2">{username ? `Hello ${username}! Sign Out`: ''}</button>
                </Fragment>
            )
        }else{
            return(
                <Fragment>
                    <li>
                        <Link to="/sign-up">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/sign-in">Sign In</Link>
                    </li>
                </Fragment> 
            )
        }
    }
    
    return (
        <nav className="grey darken-2" style={navStyle}>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Chatty App</Link>
                <ul className="right">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {renderLinks()}
                </ul>
            </div>
        </nav>
    );
}

function mstp(state){
    return{
        user:state.user
    }
}
export default connect(mstp, {signOutUser})(Nav);
