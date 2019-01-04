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
              <h3 style={styles.title}><Link to={`/${post.url}/`} style={styles.link}>{ post.title }</Link></h3>
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
    fontFamily: 'Merriweather, Georgia, serif'
  },
  title: {
    marginBottom: '7px',
    fontSize: 23,
    lineHeight: '25px',
    fontWeight: 900,
    color: '#d23669'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  spoiler: {
    marginTop: 0,
    fontSize: 16,
    lineHeight: '28px',
    color: 'rgba(0, 0, 0, .9)'
  }
}

export default Posts
