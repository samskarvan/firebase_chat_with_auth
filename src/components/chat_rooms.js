import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateRooms, setRoom } from '../actions';
import { db } from '../firebase';

class ChatRooms extends Component {
    componentDidMount(){
        this.dbRef = db.ref('/chat-rooms');
        
        this.dbRef.on('value', snapshot => {
            this.props.updateRooms(snapshot.val());
        });
    }

    componentWillUnmount(){
        this.dbRef.off();
    }

    selectRoom(room){
        this.props.setRoom(room.name);

        this.props.history.push(`/chat/${room.chatId}`);
    }

    render(){
        const { rooms } = this.props;

        const roomList = Object.keys(rooms).map(k => {
            return (
                <li className="collection-item" key={k} onClick={() => this.selectRoom(rooms[k])}>
                    {rooms[k].name}
                </li>
            );
        });

        return (
            <div>
                <h1 className="center">Available Rooms</h1>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <ul className="collection">
                            {roomList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        rooms: state.chat.rooms
    }
}

export default connect(mapStateToProps, { updateRooms, setRoom })(ChatRooms);
