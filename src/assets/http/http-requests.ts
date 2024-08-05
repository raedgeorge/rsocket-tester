import axios from "axios";

const fireBasekey = "AIzaSyBxXA5lNiq9DTSAL9wFUXVojWHQiC2HD_U";

const firebaseLoginUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
  fireBasekey;

export const login = async (model: {
  email: string;
  password: string;
  returnSecureToken: boolean;
}) => {
  return await axios.post(firebaseLoginUrl, model);
};
