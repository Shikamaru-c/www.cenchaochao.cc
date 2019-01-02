import React from 'react'
import posts from '../posts/posts.json'

function Posts () {
  return (
    <div>
      {
        posts.map(post => {
          const header = post.header
          return (
            <div key={Math.random()}>
              <div>{ header.title }</div>
              <div>{ header.date }</div>
              <div>{ header.spoiler }</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Posts
