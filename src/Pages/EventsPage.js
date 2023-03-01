import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading . . .</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:3001/events");

  if (!response.ok) {
    //throw new Response(JSON.stringify({message: 'Could not fetch events'}), {status: 500});
    throw json({message: 'Could not fetch events'}, {status: 500})
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents()
  })
}
