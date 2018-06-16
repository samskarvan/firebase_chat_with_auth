import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateInput, sendMessageToDatabase, clearInput } from '../actions';

class MessageInput extends Component {
    sendMessage(e){
        e.preventDefault();

        const { message, roomId, clearInput, username } = this.props;

        sendMessageToDatabase(roomId, message, username);

        clearInput('message');
    }

    updateMessage(e){
        const { name, value } = e.target;

        this.props.updateInput(name, value);
    }

    render(){
        const { message } = this.props;

        return (
            <div className="row">
                <form className="col s12" onSubmit={this.sendMessage.bind(this)}>
                    <div className="row">
                        <div className="col s6 offset-s3">
                            <input onChange={this.updateMessage.bind(this)} value={message} type="text" name="message" placeholder="Enter message to send"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        message: state.input.message,
        username: state.user.username
    }
}

export default connect(mapStateToProps, { updateInput, clearInput })(MessageInput);
