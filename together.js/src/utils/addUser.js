const addUser = (UserList, userID, setUserList) => {
  if (UserList.indexOf(userID) === -1) {
    UserList.push(userID);
    setUserList(UserList);
  }
}

export default addUser;