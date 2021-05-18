import React, { useEffect, useState } from 'react';

function Events(props) {
  const { events } = props;
  const [ timeRef, setTimeRef ] = useState(null);

  useEffect(() => {
    if (events.length === 1 && events[0].event === 'load') setTimeRef(Date.now())
  }, [setTimeRef, events])

  return(
    <div className="Events">
      <h3>Events</h3>
      <div className="event-list">
        {
          !!events && events.map(event => (
            <div className="event-row">
              {`${event.event} (${Date.now() - timeRef}ms)`}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Events;
