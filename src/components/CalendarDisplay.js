import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import firebase from "firebase/app";
import 'firebase/firestore';
import { useEffect, useState } from 'react';
import '../styles/Calendar.css'

function CalendarDisplay(){

    const [events, eventsUpdate] = useState([])
    const localizer = momentLocalizer(moment)

    useEffect(()=>{
        let useruid = firebase.auth().currentUser.uid;
        
        let getEvent = firebase.firestore().collection(String(useruid)).doc('data');
        getEvent.get().then((doc)=>{
            if(doc.exists){
                let response = doc.data().events;
                response.forEach((val, index)=>{
                    response[index].id = index;
                    response[index].start = response[index].start.toDate();
                    response[index].end = response[index].end.toDate();
                })
                eventsUpdate(response);
            }else {
                firebase.firestore().collection(String(useruid)).doc('data').set({
                    events:[]
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [])

    console.log('events', events);

    function handleSelect(e){
        const title = window.prompt('New Event name')
        if (title){
            let eventAdd = {
                'title' : title,
                'id' : events.length,
                'start': e.start,
                'end': e.end
            }
            let test = events;
            console.log(test);
            test.push(eventAdd);
            console.log(test);
            eventsUpdate(test);
            let useruid = firebase.auth().currentUser.uid;
            let updateEvent = firebase.firestore().collection(String(useruid)).doc('data');
            updateEvent.update({
                events: events
            }).then(()=>{document.location.reload();}).catch((error)=>{console.log(error)})
        }
        
    }

    return (<div id='calendar'>
                <Calendar localizer={localizer}
                          events={events}
                          onSelectEvent={event => window.location = '/calendar/event/' + event.id}
                          onSelectSlot={e => handleSelect(e)}
                          selectable={true}
                          defaultView='day'
                />
            </div>)
}

export default CalendarDisplay;