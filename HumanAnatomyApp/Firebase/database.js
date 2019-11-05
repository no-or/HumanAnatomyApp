/**
 * @class Database
 */

import * as firebase from "firebase";
import Quizzes from "../screens/QuizzesScreen";

class Database {

    /**
     * Gets a quiz from its id
     * @param quizId
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    static getQuizWithId(quizId) {

        let quizPath = `/Quizzes/${quizId}`;

        return firebase.database().ref(quizPath).once('value').then(function (snapshot) {
            const quiz = snapshot.val() || 'Anonymous';
            console.log(quiz);
        });
    }
}

module.exports = Database;