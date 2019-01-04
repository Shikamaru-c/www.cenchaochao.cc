import React from 'react'
import { Link } from 'react-router-dom'
import avatar from './avatar.png'
import config from '../blog.config.json'

function Bio () {
  const AUTHOR = config.author
  const INTRO = config.intro
  return (
    <div style={styles.bio}>
      <Link to="/"><img src={avatar} alt="avatar" style={styles.avatar} width="56" height="56" /></Link>
      <p style={styles.p}>
        <a className="external-link" href="https://github.com/cenchaochao" alt="github" target="_blank" rel="noopener noreferrer">{ AUTHOR }</a>的个人博客<br/>
        { INTRO }
      </p>
    </div>
  )
}

let styles = {
  bio: {
    display: 'flex',
    marginTop: 42,
    marginBottom: 70,
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: '10px',
    borderRadius: '50%',
  },
  p: {
    margin: 0
  }
}

export default Bio