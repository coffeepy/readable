const api = "http://127.0.0.1:3001";

let token = localStorage.token
  ? localStorage.token
  : Math.random().toString(36).substr(-8)

const headers = {
  Authorization: token,
  Accept: "application/json",
  'Content-Type': 'application/json'
}

const postHeaders = {
    headers,
    method: "post",
}
// meow! Categories
export const getAllCats = () => {
  return fetch(`${api}/categories`, { headers })
    .then((res)=> res.json())
}
// posts
export const getAllPosts = () => {
  return fetch(`${api}/posts`, { headers })
    .then((res)=> res.json())
}

export const getPost = (id) => {
  return fetch(`${api}/posts/${id}`, { headers })
    .then((res)=> res.json())
}

export const postPost = (data) => {
  // i heard you like posts
  const headers_ = {
    ...postHeaders,
    body: JSON.stringify(data)
  }
  return fetch(`${api}/posts`, { ...headers_ })
    .then((res)=> res.json())
}
// comments
export const getAllComments = () => {
  return fetch(`${api}/posts`, { headers })
    .then((res)=> res.json())
}

export const postComment = (data) => {
  const headers_ = {
    ...postHeaders,
    body: JSON.stringify(data)
  }
  return fetch(`${api}/comments`, { ...headers_ })
    .then((res)=> res.json())
}
