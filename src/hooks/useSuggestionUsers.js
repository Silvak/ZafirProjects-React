import { useEffect, useState } from "react";
import { axiosInstance } from "../config/apiConfig";

//TODO: crear un componente estilado que muestre las sugerencias mas lindas

function useSuggestionUsers() {
  const [users, setUsers] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [filteredLeaders, setFilteredLeaders] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  //users
  async function fetchUsers() {
    try {
      const { data } = await axiosInstance.get("/user");
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // receive the type where you use it
  const handleSuggestionChange = (e, type) => {
    const inputValue = e.target.value;

    // for input leader
    if (type === "leader") {
      setSelectedLeader(inputValue);
      if (inputValue === "") {
        setFilteredLeaders([]);
      } else {
        const filter = users.filter((user) => {
          return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
        });
        setFilteredLeaders(filter);
      }
    } // for input member
    else if (type === "member") {
      setSelectedMember(inputValue);

      if (inputValue === "") {
        setFilteredMembers([]);
      } else {
        const filter = users.filter((user) => {
          return user.name.toUpperCase().startsWith(inputValue.toUpperCase());
        });
        setFilteredMembers(filter);
      }
    }
  };

  const handleSuggestionClick = (user, type) => {
    if (type === "leader") {
      setSelectedLeader(user.name);
      setFilteredLeaders([]);
    } else {
      setSelectedMember(user.name);
      setFilteredMembers([]);
    }
  };

  return {
    selectedLeader,
    selectedMember,
    filteredLeaders,
    filteredMembers,
    handleSuggestionChange,
    handleSuggestionClick,
  };
}

export default useSuggestionUsers;
