import {
    useParams
} from "react-router-dom";
import firebase from "firebase/app";
import 'firebase/firestore';
import {
    useEffect,
    useState
} from 'react';
import '../styles/Event.css'

function EventDisplay(){
    const {
        eventId
      } = useParams();
    
    const [reponse, reponseUpdate] = useState({
        'Viandes': '',
        'Féculents': '',
        'Verts': '',
        'Laitage': '',
        'Fruit': ''
    })
    const [addField, addFieldUpdate] = useState('')
    const [typeChange, typeChangeUpdate] = useState('null')

    useEffect((eventId) => {
        let useruid = firebase.auth().currentUser.uid;

        let getEvent = firebase.firestore().collection(String(useruid)).doc('event');
        getEvent.get().then((doc) => {
            if (doc.exists) {
                let response = doc.data();
                console.log(Object.keys(response).length, eventId)
                if(eventId-1 >  Object.keys(response).length){
                    throw new Error('Event inexistant');
                }
                if (response[eventId] === undefined) {
                    firebase.firestore().collection(String(useruid)).doc('event').update({[eventId]: {
                        'Viandes': '',
                        'Féculents': '',
                        'Verts': '',
                        'Laitage': '',
                        'Fruit': ''
                    }}
                    );
                    reponseUpdate({
                        'Viandes': '',
                        'Féculents': '',
                        'Verts': '',
                        'Laitage': '',
                        'Fruit': ''
                    });
                } else {
                    reponseUpdate(response[eventId]);
                }
            } else {
                firebase.firestore().collection(String(useruid)).doc('event').set({
                    [eventId]: {
                        'Viandes': '',
                        'Féculents': '',
                        'Verts': '',
                        'Laitage': '',
                        'Fruit': ''
                    }
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            window.location = '/calendar'
        });
    }, [])

    function sendField(){
        let test = reponse;
        test[typeChange] = addField;
        let useruid = firebase.auth().currentUser.uid;
        let updateEvent = firebase.firestore().collection(String(useruid)).doc('event');
        updateEvent.update({
            [eventId]: test
        }).then(()=>{document.location.reload();}).catch((error)=>{console.log(error)})
    }

      return (
          <div id='eventDetails'>
              <div className='dataDisplay'>
                <h2>Viandes</h2>
                <p>{reponse.Viandes}</p>
                <h2>Féculents/Légumes secs</h2>
                <p>{reponse.Féculent}</p>
                <h2>Légumes verts</h2>
                <p>{reponse.Verts}</p>
                <h2>Laitage</h2>
                <p>{reponse.Laitage}</p>
                <h2>Fruits</h2>
                <p>{reponse.Fruit}</p>
              </div>
                <div className='addField'>
                <h3>Ajouter une valeur</h3>
                <select onChange={(e) => typeChangeUpdate(e.target.value)}>
                    <option value='null'>Choisissez une valeur</option>
                    <option value='Viandes'>Viandes</option>
                    <option value='Féculent'>Féculents/Légumes secs</option>
                    <option value='Verts'>Légumes verts</option>
                    <option value='Laitage'>Laitage</option>
                    <option value='Fruit'>Fruits</option>
                </select>
                <input type='text' onChange={(e) => addFieldUpdate(e.target.value)} placeholder='Votre aliment' ></input>
                {typeChange !== 'null' && addField !== '' ? <p onClick={()=>sendField()}>Ajouter</p>:  null}
                </div>
          </div>
      )
}

export default EventDisplay;