import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDMyI56XMfCRPJ6y2-429ARHe7AxUoW7c4",
    authDomain: "projects-9d0cc.firebaseapp.com",
    databaseURL: "https://projects-9d0cc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "projects-9d0cc",
    storageBucket: "projects-9d0cc.appspot.com",
    messagingSenderId: "645954454508",
    appId: "1:645954454508:web:f17b34a3ce835ee8acf6c9",
    measurementId: "G-4VZ741V09C"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}
const auth = firebase.auth();

const storage = firebase.storage();
const db = firebase.firestore();

export function login(name, email, password) {
    console.log(name, email, password);
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password).then(() => {
            resolve("Login success with result => ", name, email, password)
        })
            .catch(err => reject(true))
    })
}

export function logout() {
    auth.signOut();
}

export function onUserChanged(eventListener) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in', user);
            if (eventListener) {
                eventListener(user);
            }
        }
        else {
            console.log('Not logged in');
            if (eventListener)
                eventListener(null);
        }
    })
}

export function uploadImage(image) {
    return new Promise((resolve, reject) => {
        const task = storage.ref(image.name).put(image);
        task.on('state_changed', (snapshot) => {
        }, (err) => {
            reject(err);
        }, () => {
            storage.ref(image.name).getDownloadURL().then((url) => {
                resolve(url);
            })
        })
    })
}
export function addImage({ name, size, type, url, UUID }) {
    return new Promise((resolve, reject) => {
        db.collection('images').add({
            name, size, type, url, UUID
        })
            .then(() => resolve(true))
            .catch((err) => reject(err))
    })
}



export function addItem({ name, image, type, price, date }) {
    return new Promise((resolve, reject) => {
        db.collection('cashierItem').add(
            { name, image, type, price, date }
        ).then(() => {
            resolve(true)
        })
            .catch((err) => reject(err))
    })
}

export function getItem() {
    return new Promise((resolve, reject) => {
        db.collection('cashierItem').get().then((items) => {
            let arr = [];
            for (let i = 0; i < items.docs.length; i++) {
                arr.push({
                    id: items.docs[i].id,
                    name: items.docs[i].data().name,
                    image: items.docs[i].data().image,
                    type: items.docs[i].data().type,
                    price: items.docs[i].data().price,
                    date: items.docs[i].data().date,
                })
            }
            resolve(arr);
        })
            .catch((err) => reject(err))
    })
}