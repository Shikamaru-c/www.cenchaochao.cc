import React from 'react'
import { Link } from 'react-router-dom'

function NotFound () {
  return (
    <div style={styles.div}>
      <h1 style={styles.h1}>Not Found</h1>
      <p style={styles.p}>
        I haven’t written this post yet.<br/>
        <Link to="/" style={styles.link}>return to the blog.</Link>
      </p>
    </div>
  )
}

const styles = {
  div: {
    fontFamily: 'Merriweather, Georgia, serif',
    color: 'rgba(0, 0, 0, .9)'
  },
  h1: {
    marginTop: 56,
    marginBottom: 28,
    fontSize: 40,
    lineHeight: '44px',
  },
  p: {
    fontSize: 16,
    lineHeight:  '28px',
  },
  link: {
    color: '#d23669'
  }
}

export default NotFound