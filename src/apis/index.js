import posts from '../posts/posts.json'
import beautifyUrl from '../utils/beautifyUrl.js'

export function getAllPosts () {
  return posts.map(post => post.header)
}

export function getPost (title) {
  return posts.filter(post => beautifyUrl(post.header.title) === title)[0]
}