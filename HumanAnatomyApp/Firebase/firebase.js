import * as firebase from 'firebase';

class Firebase {
    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyBy07lITMGCFrl331G7scyj57NbcArqyko",
            authDomain: "anatomy-doods.firebaseapp.com",
            databaseURL: "https://anatomy-doods.firebaseio.com",
            projectId: "anatomy-doods",
            storageBucket: "anatomy-doods.appspot.com",
            messagingSenderId: "143443088639",
            appId: "1:143443088639:web:dfb4548006e060a45528ca",
            measurementId: "G-NY0K3FKRCQ"
        });
    }

}

module.exports = Firebase;