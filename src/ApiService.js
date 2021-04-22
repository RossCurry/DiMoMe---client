const usersDB = [];
let fakeId = 1;

const registerNewUser = (newUser) => {

  //TODO fetch to server, send new user to DB
  // TODO return user from server with id
  // TODO use id to login to profile/:id
  const user = {...newUser, id: fakeId}
  const { email, id, name, localSelector, localName} = user;
  const registeredUser = {
      email: atob(email) , 
      name: atob(name) , 
      localType: atob(localSelector) , 
      localName: atob(localName),
      id: id,
  }
  fakeId++
  // go to profile by returning user to auth page with id
  usersDB.push(registeredUser);
  return registeredUser;


}

module.exports = {registerNewUser, usersDB}