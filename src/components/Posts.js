import React from 'react'
import { Link } from 'react-router-dom'
import Desc from './Desc.js'
import { getAllPosts } from '../apis'

function Posts () {
  return (
    <div>
      {
        getAllPosts().map((post, index) => {
          return (
            <div key={index} style={styles.post}>
              <h3 style={styles.title}><Link to={`/${post.url}/`}>{ post.title }</Link></h3>
              <Desc date={post.date} readingTime={post.readingTime} />
              <p style={styles.spoiler}>{ post.spoiler }</p>
            </div>
          )
        })
      }
    </div>
  )
}

const styles = {
  post: {
    marginTop: 56,
    marginBottom: 28,
  },
  title: {
    marginBottom: '7px',
    fontSize: 23,
    lineHeight: '25px',
    fontWeight: 900,
  },
  spoiler: {
    marginTop: 0,
  }
}

export default Posts
