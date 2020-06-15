import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDzGGsXiRvSbVgjHv90kLL4vctSF8k9e0U",
    authDomain: "lsm-6881b.firebaseapp.com",
    databaseURL: "https://lsm-6881b.firebaseio.com",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.database();