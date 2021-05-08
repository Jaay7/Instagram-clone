import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = async (username, password) => {
  fetch("http://192.168.0.103:3000/signup", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": username,
      "password": password
    })
  })
  .then((response) => response.json())
  .then( async (data) => {
    console.log(data)
    try {
      await AsyncStorage.setItem('token', data.token)
    } catch (error) {
      console.log(error)
    }
  })
}

export default Signup;

// export const Signin = async (username, password) => {
//   fetch("http://192.168.0.167:3000/signin", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "username": username,
//       "password": password
//     })
//   })
//   .then((response) => response.json())
//   .then( async (data) => {
//     console.log(data)
//     try {
//       await AsyncStorage.setItem('token', data.token)
//     } catch (error) {
//       console.log(error)
//     }
//   })
//   .catch((error) => {
//     console.log(error.message);
//     throw error;
//   })
// }

// export const Signout = async() => {
//   await AsyncStorage.removeItem('token')
// } 