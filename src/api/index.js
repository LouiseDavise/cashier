import firebase from 'firebase';
import async from 'async';
// Pusher
import Pusher from 'pusher-js';


var firebaseConfig = {
    apiKey: "AIzaSyDMyI56XMfCRPJ6y2-429ARHe7AxUoW7c4",
    authDomain: "ezbooking-4c292.firebaseapp.com",
    projectId: "ezbooking-4c292",
    storageBucket: "ezbooking-4c292.appspot.com",
    messagingSenderId: "405621452976",
    appId: "1:405621452976:web:58ff865f3edeed6e0f4b75",
    measurementId: "G-D8S7LWEDY8"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}
const auth = firebase.auth();

const db = firebase.firestore();

export function login(name, user, password) {
    return new Promise((resolve, reject) => {
        auth.signInWithUserAndPassword(user, password).then(() => {
            resolve("Login success with result => ", name, user, password)
        })
        .catch(err => reject(err))
    })
}