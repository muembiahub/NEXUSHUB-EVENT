const oauthUsers = [];

function findUserByProvider(provider, providerId) {
  return oauthUsers.find((user) => user.provider === provider && user.providerId === providerId);
}

function createOrUpdateOAuthUser({ provider, providerId, displayName, email, avatar }) {
  let user = findUserByProvider(provider, providerId);
  if (user) {
    user.displayName = displayName || user.displayName;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;
    return user;
  }

  user = {
    id: `${provider}-${providerId}`,
    provider,
    providerId,
    displayName: displayName || '',
    email: email || '',
    avatar: avatar || '',
    createdAt: new Date().toISOString(),
  };

  oauthUsers.push(user);
  return user;
}

function getUserById(id) {
  return oauthUsers.find((user) => user.id === id);
}

function getAllAuthUsers() {
  return oauthUsers;
}

module.exports = {
  createOrUpdateOAuthUser,
  findUserByProvider,
  getUserById,
  getAllAuthUsers,
};
