import Firebase from 'firebase/app'

export default ({ Vue }) => {

    const FirebaseConfig = {
        apiKey: "AIzaSyCX5ErvKR5qhKdgeXAGHn5yEJdAGJfUpyI",
        authDomain: "laberu.firebaseapp.com",
        projectId: "laberu",
        storageBucket: "laberu.appspot.com",
        messagingSenderId: "887970080889",
        appId: "1:887970080889:web:fe9bfb938753ef14568ca8",
        measurementId: "G-9V6TZG3HVT"
    }
    Firebase.initializeApp(FirebaseConfig);
    Vue.prototype.$firebase = Firebase;
    Vue.prototype.$auth = Firebase.auth();
}