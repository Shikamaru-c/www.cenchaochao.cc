import React from 'react'
import { Link } from 'react-router-dom'
import posts from '../posts/posts.json'
import beautifyUrl from '../utils/beautifyUrl.js'

function Posts () {
  return (
    <div>
      {
        posts.map((post, index) => {
          const header = post.header
          return (
            <div key={index}>
              <Link to={`/${beautifyUrl(header.title)}/`}>{ header.title }</Link>
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
