import firebase from "firebase/app";
import "firebase/auth";
import {
    Link
} from "react-router-dom";
import {
    useState,
    useEffect
} from "react";
import '../styles/Account.css'

function Account() {

    const [reponse, reponseUpdate] = useState({
        name: ''
    })

    useEffect(() => {
        let useruid = firebase.auth().currentUser.uid;

        let getEvent = firebase.firestore().collection(String(useruid)).doc('info');
        getEvent.get().then((doc) => {
            if (doc.exists) {
                let response = doc.data();
                reponseUpdate(response);
            } else {
                console.log('doc no exist')
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [])

    console.log(reponse)

    //<Link>Ma liste de course</Link> - Future maj

    return (
        <div id='account'>
            <h2>Bonjour,</h2>
            <h3>{reponse.name.toUpperCase()}</h3>
            <div>
                <Link to='/calendar'>Mon agenda</Link>
                <p onClick={()=>{firebase.auth().signOut()}}>Me deconnecter</p>
            </div>
        </div>
    );
}

export default Account;