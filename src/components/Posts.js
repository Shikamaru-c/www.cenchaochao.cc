import React from 'react'
import { Link } from 'react-router-dom'
import beautifyUrl from '../utils/beautifyUrl.js'
import { getAllPosts } from '../apis'

function Posts () {
  return (
    <div>
      {
        getAllPosts().map((post, index) => {
          return (
            <div key={index}>
              <Link to={`/${beautifyUrl(post.title)}/`}>{ post.title }</Link>
              <div>{ post.date }</div>
              <div>{ post.spoiler }</div>
              <div>{ post.readingTime.text }</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Posts
