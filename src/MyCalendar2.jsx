import  { useEffect, } from 'react'
import { PropTypes } from "prop-types"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css"
// import fr from 'date-fns/locale/fr'
// import es from 'date-fns/locale/es'
// import parseISO from 'date-fns/parseISO'
// import { compareAsc, formatDistance, formatDuration,formatDistanceToNowStrict, formatDistanceToNow, formatDistanceStrict, subDays, addDays, formatRelative, getDefaultOptions, intervalToDuration, intlFormat, intlFormatDistance, isEqual, isMatch, set, sub, toDate, } from 'date-fns'

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const locales = {
    "en-US": enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), {weekStartsOn: 1}),
    getDay,
    locales,
})

// localStorage.clear()
export default function MyCalendar(props) {
    const allEvt = props.allEvents;
    const setAllEvt = props.setAllEvents;
    useEffect(
        (() => localStorage.setItem("events", JSON.stringify(allEvt))), [allEvt]
    )

    // props.allEvents.map((evt) => {
    //     if(compareAsc(parseISO(evt.start), parseISO(evt.end)) === 0) {
    //         alert(`Your event ${evt.title} is over!`)
    //     } 
    //     if(compareAsc(parseISO(evt.start), new Date()) === 0) {
    //         alert(`Your event ${evt.title} has Started!`)
    //     }
    // })
    
    // const handleEdit = (title, start, end, index) => {
    //     setAllEvt(evts => {
    //         const allEvtCopy = [...evts];
    //         allEvtCopy[index] = { title: title, start: start, end: end };
    //         return allEvtCopy
    //     })
    // }
    
    
    const handleDeletions = (e) => {
        const confirmDelete = window.confirm("Wanna delete this event?");
        const myEvents = [...allEvt]
        const ind = myEvents.indexOf(e)
        myEvents.splice(ind, 1)
        { confirmDelete && setAllEvt(myEvents) }
    
    }


    return (<div>
        <Calendar
            localizer={localizer}
            // components={props.allEvents}
            events={props.allEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleDeletions}
            style={{ minWidth: "200px", minHeight:"400px", margin: "44px" }}
            popup
            selectable
        />
    </div>)
    
}
MyCalendar.propTypes = {
    allEvents: PropTypes.array,
    setAllEvents: PropTypes.func,
}
