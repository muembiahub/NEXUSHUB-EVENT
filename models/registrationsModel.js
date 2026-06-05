const registrations = [];
let nextRegistrationId = 1;

function getAllRegistrations() {
  return registrations;
}

function getRegistrationById(id) {
  return registrations.find((registration) => registration.id === id);
}

function createRegistration(data) {
  const registration = {
    id: String(nextRegistrationId++),
    eventId: data.eventId || '',
    userId: data.userId || '',
    status: data.status || 'registered',
    registeredAt: new Date().toISOString(),
  };

  registrations.push(registration);
  return registration;
}

function updateRegistration(id, data) {
  const registration = getRegistrationById(id);
  if (!registration) return null;

  registration.status = data.status ?? registration.status;
  registration.eventId = data.eventId ?? registration.eventId;
  registration.userId = data.userId ?? registration.userId;

  return registration;
}

function deleteRegistration(id) {
  const index = registrations.findIndex((registration) => registration.id === id);
  if (index === -1) return null;
  return registrations.splice(index, 1)[0];
}

module.exports = {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};
