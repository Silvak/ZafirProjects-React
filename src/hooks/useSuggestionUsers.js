import { useEffect, useState } from 'react';
import { axiosInstance } from '../config/apiConfig';

function useSuggestionUsers() {
  const [users, setUsers] = useState([]);

  //users
  async function fetchUsers() {
    try {
      const { data } = await axiosInstance.get('/user');
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
  };
}

export default useSuggestionUsers;
