import types from './types';
import { db, auth } from '../firebase';

export function createAccount(userData){
    return async dispatch => {
        try {
           await auth.createUserWithEmailAndPassword(userData.email, userData.password);
            
           const newUser = auth.currentUser;
            // TODO Add username to user, update redux state with user info
            
            console.log('New User:', newUser);

            await newUser.updateProfile({
                displayName: userData.username
            });
        } catch(err){
            console.log('Create Account Error:', err.message);
        }
    }
}

export function signOutUser(){
    return async dispatch => {
        try{
            await auth.signOut();

            console.log('sign out user');
        }catch(err){
            console.log('error!!!!!!!!!!', err.message);
        }
    }
}

export function signInUser({email, password}){
    return async dispatch =>{
        try{
            await auth.signInWithEmailAndPassword(email, password);
        }catch(err){
            console.log('hay un eror lol:', err.message);
            //dispatch error for UX
        }
    }
}
export function signInAction(user){
    return{
        type: types.SIGN_IN,
        email: user.email,
        username: user.displayName
    }
}

export function signOutAction(){
    return{
        type: types.SIGN_OUT
    }
}
export function updateChat(chatLog){

    return {
        type: types.UPDATE_CHAT_LOG,
        chatLog
    }
}

export function updateInput(name, value){
    return {
        type: types.UPDATE_INPUT,
        payload: { name, value }
    }
}

export function sendMessageToDatabase(id, message, username){
    db.ref(`/chat-logs/${id}`).push({
        name: username,
        message
    });
}

export function clearManyInputs(names){
    const toClear = {};

    names.map (name => {
        toClear[name] = '';
    });

    return{
        type: types.CLEAR_MANY_INPUTS,
        payload: toClear
    }
}
export function clearInput(name){
    return {
        type: types.CLEAR_INPUT,
        payload: name
    }
}

export function setRoom(name){
    return {
        type: types.SET_ROOM,
        payload: name
    }
}

export function updateRooms(rooms){
    return {
        type: types.UPDATE_ROOMS,
        payload: rooms
    }
}

export async function createRoom(name){

    const firstMessage = {
        0: {
            message: `Welcome to room: ${name}`,
            name: 'Admin'
        }
    }

    const newChat = await db.ref('/chat-logs').push(firstMessage);

    const newRoom = {
        name,
        chatId: newChat.key
    }

    const response = await db.ref('/chat-rooms').push(newRoom);

    return newChat.key;
}

export function clearChatData(){
    return {
        type: types.CLEAR_CHAT_DATA
    }
}
