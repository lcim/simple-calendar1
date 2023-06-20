import {  useState } from 'react'
import CreateEvents from "./CreateEvents"
import MyCalendar from './MyCalendar'
import { useEffect } from 'react';

function App() {
  // add a single event object
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", isTime: false })
  
  // all events
  const [allEvents, setAllEvents] = useState(JSON.parse(localStorage.getItem("events")) || [])
 
  // create a function that converts stringed dates from localStorage back to date Objects.
  function convertStringToDate() {
    const parsedDate = JSON.parse(localStorage.getItem("events"))
    const convertedEvents = parsedDate.map(evt => {
      return { ...evt, start: new Date(evt.start), end: new Date(evt.end) }
    })
    setAllEvents(convertedEvents)
  }

  useEffect(convertStringToDate, [setAllEvents])

  // Add new event
  const addNewEvent = () => {
    setAllEvents(prev => {
      return ([...prev, newEvent])
    })
    setNewEvent(evt => ({...evt, title: "", start: "", end: ""}))
  }

  // Create event
  const createSingleEvent = (<CreateEvents 
    newEvent={newEvent} setNewEvent={setNewEvent}
    addNewEvent={() => addNewEvent()}
  />)    
 
  const calendarEvents = (
    <MyCalendar
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