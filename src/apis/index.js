import posts from '../posts/posts.json'

export function getAllPosts () {
  return posts.map(post => post.header)
}

export function getPost (url) {
  return posts.filter(post => post.header.url === url)[0]
}