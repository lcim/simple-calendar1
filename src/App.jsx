import {  useState } from 'react'
// import CreateEvents from "./CreateEvents"
// import MyCalendar from './MyCalendar'
import CreateEvents2 from "./CreateEvents2"
import MyCalendar2 from './MyCalendar2'

import { useEffect } from 'react';

function App() {
  // add a single event object
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", isActive: false })
  
  // all events
  const [allEvents, setAllEvents] = useState(JSON.parse(localStorage.getItem("events")) || [])
 
  // create a function that converts stringed dates from localStorage back to date Objects.
  function convertStringToDate() {
    const parsedDate = JSON.parse(localStorage.getItem("events"))
    const convertedEvents = parsedDate.map(evt => {
      return { ...evt, start: new Date(evt.start), end: new Date(evt.end), isActive: false  }
    })
    setAllEvents(convertedEvents)
  }

  useEffect(
    convertStringToDate, [setAllEvents])

  // Add new event
  const addNewEvent = () => {
    setAllEvents(prev => {
      return ([...prev, {title: newEvent.title, start: newEvent.start, end: newEvent.end,  isActive: false }])
    })
    setNewEvent(evt => ({...evt, title: "", start: "", end: "", isActive: false }))
  }

  // Create event
  const createSingleEvent = (<CreateEvents2 
    newEvent={newEvent} setNewEvent={setNewEvent}
    addNewEvent={() => addNewEvent()}
  />)    
 
  const calendarEvents = (
    <MyCalendar2
      allEvents={allEvents}
      setAllEvents={setAllEvents}
      />
  )


  return (
    <main>
      <div className="title">
        Simple Calendar
      </div>
      {createSingleEvent}
      {calendarEvents}
    </main>
  )
}

export default App