import {firebaseConfig} from '../credentials-firebase.js'
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CalendarDisplay from './CalendarDisplay';
import Login from './Login.js';
import Header from './Header.js';
import Welcome from './Welcome.js';
import '../styles/App.css';
import EventDisplay from './EventDisplay';
import Account from './Account';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/login'>
          <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
              {
                  <>
                    <IfFirebaseAuthed >
                      <Account />
                    </IfFirebaseAuthed>
                    <IfFirebaseUnAuthed>
                      <Login/>
                    </IfFirebaseUnAuthed>
                  </>
              }
            </FirebaseAuthProvider>
          </Route>
          <Route exact path='/calendar/event/:eventId'>
            <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
              {
                  <>
                    <IfFirebaseAuthed >
                      <EventDisplay/>
                    </IfFirebaseAuthed>
                    <IfFirebaseUnAuthed>
                    <Welcome />
                    </IfFirebaseUnAuthed>
                  </>
              }
            </FirebaseAuthProvider>
          </Route>
          <Route exact path='/calendar'>
            <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
              {
                  <>
                    <IfFirebaseAuthed >
                      <CalendarDisplay />
                    </IfFirebaseAuthed>
                    <IfFirebaseUnAuthed>
                    <Welcome />
                    </IfFirebaseUnAuthed>
                  </>
              }
            </FirebaseAuthProvider>
          </Route>
          <Route exact path='/'>
            <Welcome />
          </Route>
          <Route exact path='/404'>
            <p>PERDU</p>
          </Route>
          <Redirect to='/404'/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
