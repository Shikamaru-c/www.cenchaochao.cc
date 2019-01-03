import React from 'react'
import { Link } from 'react-router-dom'
import posts from '../posts/posts.json'

function Posts () {
  return (
    <div>
      {
        posts.map(post => {
          const header = post.header
          return (
            <Link key={Math.random()} to={`/${header.title}/`}>
              <div>{ header.title }</div>
              <div>{ header.date }</div>
              <div>{ header.spoiler }</div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default Posts
