import {
    useState
} from "react";
import firebase from "firebase/app";

import '../styles/Login.css';

function Login() {
    const [email, emailUpdate] = useState('');
    const [psswrd, psswrdUpdate] = useState('');
    const [pseudo, pseudoUpdate] = useState('');
    const [reco, recoUpdate] = useState(false);
    const [mailGood, mailGoodUpdate] = useState(false);
    const [psswrdGood, psswrdGoodUpdate] = useState(false);

    function buttonAccess(mail, password){
        if(mail && password){
            document.querySelector('#logButton').classList.remove('hidden');
        }else{
            document.querySelector('#logButton').classList.add('hidden');
        }
    }


    function checkMailFormat(e){
        let value = e.target.value;
        /* eslint "no-control-regex": 0 */
        let mailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if(mailRegex.test(value)){
            document.querySelector('#mail').classList.remove('false');
            document.querySelector('#mail').classList.add('good');
            mailGoodUpdate(true);
            emailUpdate(value)
        }
        else{
            mailGoodUpdate(false);
            document.querySelector('#mail').classList.remove('good');
            document.querySelector('#mail').classList.add('false');
        }

        buttonAccess(mailGood, psswrdGood);

    }

    function checkPasswordFormat(e){
        let value = e.target.value;
        let passwordRegex = /\w{6,}/;
        if(passwordRegex.test(value)){
            document.querySelector('#password').classList.remove('false');
            document.querySelector('#password').classList.add('good');
            psswrdGoodUpdate(true);
            psswrdUpdate(value)
        }
        else{
            document.querySelector('#password').classList.remove('good');
            document.querySelector('#password').classList.add('false');
            psswrdGoodUpdate(false)
        }

        console.log(mailGood, psswrdGood)
        buttonAccess(mailGood, psswrdGood);

    }

    function callLog(method) {
        if (method === 'connexion') {
            let promise = firebase.auth().signInWithEmailAndPassword(email, psswrd);
            promise.then(() => {
            }).catch(() => {
                recoUpdate(true)
            });
        } else if (method === 'inscription') {
            let promise = firebase.auth().createUserWithEmailAndPassword(email, psswrd);
            promise.then(() => {
                let useruid = firebase.auth().currentUser.uid;
                let promiseName = firebase.firestore().collection(String(useruid)).doc('info').set({
                    name:pseudo
                });
                promiseName.then(()=>{
                }).catch((error)=>{
                    console.log(error)
                })

            }).catch(() => {
                recoUpdate(true)
            });
        }

    }

    function displayPannel(){
        document.querySelector('#signIn').classList.toggle('hidden');
        document.querySelector('#login').classList.toggle('hidden');
    }

    return (
        <div id='user'>
            <div id='login'>
                <h2>Se connecter</h2>
                {reco ? <h3>Utilisateur introuvable, merci de crée un compte !</h3> : null}
                <input type='text' onChange={(e)=>emailUpdate(e.target.value)} placeholder='Mail' ></input>
                <input type='text' onChange={(e)=>psswrdUpdate(e.target.value)} placeholder='Password'></input>
                <div className='line'>
                    <p onClick={()=>displayPannel()} id='methodButton' >S'inscrire</p>
                    <p onClick={()=>callLog('connexion')}>Se connecter</p>
                </div>
            </div>
            <div className='hidden' id='signIn'>
                <h2>S'inscrire</h2>
                    <input type='text' onChange={(e)=>pseudoUpdate(e.target.value)} placeholder='Pseudo' id='pseudo' ></input>
                    <input type='text' onChange={(e)=>checkMailFormat(e)} placeholder='Mail' id='mail' ></input>
                    <input type='text' onChange={(e)=>checkPasswordFormat(e)} placeholder='Password' id='password'></input>
                    <div className='line'>
                        <p onClick={()=>displayPannel()} id='methodButton' >Se connecter</p>
                        <p onClick={()=>callLog('inscription')} id='logButton' className='hidden'>S'inscrire</p>
                    </div>
            </div>
        </div>
    )
}

export default Login;