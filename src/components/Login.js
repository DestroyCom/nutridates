import { useState } from "react";
import firebase from "firebase/app";

function Login(){
    const [email, emailUpdate] = useState('');
    const [psswrd, psswrdUpdate] = useState('');
    const [reco, recoUpdate] = useState(false);

    function callLog(method){
        if(method === 'connexion'){
            let promise = firebase.auth().signInWithEmailAndPassword(email,psswrd);
            promise.then(()=>{window.location = '/calendar'}).catch(recoUpdate(true));
        }
        else if(method === 'inscription'){
            let promise = firebase.auth().createUserWithEmailAndPassword(email,psswrd);
            promise.then(()=>{window.location = '/calendar'}).catch(recoUpdate(true));
        }
        
    }

    return (
        <div id='login'>
            {reco ? <h3>Utilisateur introuvable, merci de crée un compte !</h3> : null}
            <label>Email</label>
            <input type='text' onChange={(e)=>emailUpdate(e.target.value)} ></input>
            <label>Password</label>
            <input type='text' onChange={(e)=>psswrdUpdate(e.target.value)}></input>
            <button onClick={()=>callLog('connexion')}>Se connecter</button>
            <button onClick={()=>callLog('inscription')}>S'inscrire</button>
        </div>
    )
}

export default Login;