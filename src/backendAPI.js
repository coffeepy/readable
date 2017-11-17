const api = "http://127.0.0.1:3001";

let token = localStorage.token
  ? localStorage.token
  : Math.random().toString(36).substr(-8)

const headers = {
  Authorization: token,
  Accept: "application/json"
}
// meow!
export const getAllCats = () => {
  return fetch(`${api}/categories`, { headers })
    .then((res)=> res.json())
    .then((data)=> data.categories)
}
export const getAllPosts = () => {
  return fetch(`${api}/posts`, { headers })
    .then((res)=> res.json())
}
