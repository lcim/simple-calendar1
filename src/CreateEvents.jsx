import { PropTypes } from "prop-types"
// import differenceInCalendarDays from "date-fns/differenceInCalendarDays"
// import differenceInBusinessDays from "date-fns/differenceInBusinessDays"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default function NewEvents({ setNewEvent, newEvent, addNewEvent }) {    
    // console.log(newEvent.title, newEvent.start, newEvent.end, newEvent.isTime)
    
    return (
        <div className="events">
            <input type="text" value={newEvent.title} placeholder="Add event title" onChange={(e) => setNewEvent(evt => { return {...evt, title: e.target.value} })} />
            <div className="date-picker">
                <DatePicker className="date-time-picker" type="text" selected={newEvent.start} showTimeSelect dateFormat="Pp" placeholder="Add start time" 
                onChange={(start ) => setNewEvent( { ...newEvent, start } )} />
                <DatePicker className="date-time-picker" type="text" selected={newEvent.end} showTimeSelect dateFormat="Pp" placeholder="Add end time" 
                    onChange={(end) => setNewEvent({ ...newEvent, end })} />
            </div>
            <button className="btn-submit" onClick={ () => newEvent.end && newEvent.start && newEvent.title && addNewEvent()}>Enter</button>
        </div>
    )
}

NewEvents.propTypes = {
    end: PropTypes.string,
    start: PropTypes.instanceOf(Date),
    title: PropTypes.instanceOf(Date),
    newEvent: PropTypes.object,
    setNewEvent: PropTypes.func,
    addNewEvent: PropTypes.func,
}