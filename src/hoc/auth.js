import React, {Component} from 'react';
import {connect} from 'react-redux';

export default (WrappedComponent, redirect=false, path ='/')=>{
    class Auth extends Component{
        componentDidMount(){
            this.props.auth && redirect || !this.props.auth && !redirect ? this.props.history.push(path) : null;
        }

        componentDidUpdate(){
            this.props.auth && redirect || !this.props.auth && !redirect ? this.props.history.push(path) : null;
        }
        render(){
            return <WrappedComponent {...this.props}/>
        }
    }

    function mstp(state){
        return{
            auth:state.user.auth
        }
    }

    return connect(mstp)(Auth);
}