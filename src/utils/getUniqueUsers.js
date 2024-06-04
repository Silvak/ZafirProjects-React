export default function getUniqueUsers(users) {
  const uniqueUsers = users.reduce((acc, user) => {
    const key = user.name;
    if (!acc[key]) {
      acc[key] = user;
    }
    return acc;
  }, {});

  const result = Object.values(uniqueUsers);

  return result;
}
