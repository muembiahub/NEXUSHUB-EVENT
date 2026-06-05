const events = [];
let nextEventId = 1;

function getAllEvents() {
  return events;
}

function getEventById(id) {
  return events.find((event) => event.id === id);
}

function createEvent(data) {
  const event = {
    id: String(nextEventId++),
    name: data.name || '',
    description: data.description || '',
    date: data.date || '',
    location: data.location || '',
    capacity: Number(data.capacity) || 0,
    createdAt: new Date().toISOString(),
  };

  events.push(event);
  return event;
}

function updateEvent(id, data) {
  const event = getEventById(id);
  if (!event) return null;

  event.name = data.name ?? event.name;
  event.description = data.description ?? event.description;
  event.date = data.date ?? event.date;
  event.location = data.location ?? event.location;
  event.capacity = data.capacity !== undefined ? Number(data.capacity) : event.capacity;

  return event;
}

function deleteEvent(id) {
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) return null;
  return events.splice(index, 1)[0];
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
