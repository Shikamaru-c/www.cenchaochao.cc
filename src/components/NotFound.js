import React from 'react'
import { Link } from 'react-router-dom'

function NotFound () {
  return (
    <div style={styles.div}>
      <h1 style={styles.h1}>Not Found</h1>
      <p>
        I haven’t written this post yet.<br/>
        <Link to="/" className="external-link">return to the blog.</Link>
      </p>
    </div>
  )
}

const styles = {
  h1: {
    marginTop: 56,
    marginBottom: 28,
  }
}

export default NotFound