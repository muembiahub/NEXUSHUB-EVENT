const users = [];
let nextUserId = 1;

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(data) {
  const user = {
    id: String(nextUserId++),
    name: data.name || '',
    email: data.email || '',
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
}

function updateUser(id, data) {
  const user = getUserById(id);
  if (!user) return null;

  user.name = data.name ?? user.name;
  user.email = data.email ?? user.email;

  return user;
}

function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  return users.splice(index, 1)[0];
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
