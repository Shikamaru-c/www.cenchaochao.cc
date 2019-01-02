import React from 'react'
import avatar from './avatar.png'
import config from '../blog.config.json'

function Bio () {
  const AUTHOR = config.author
  return (
    <div style={styles.bio}>
      <img src={avatar} alt="avatar" style={styles.avatar} width="56" height="56" />
      <p>{ AUTHOR }的个人博客</p>
    </div>
  )
}

let styles = {
  bio: {
    display: 'flex'
  },
  avatar: {
    width: 56,
    height: 56,
    marginRight: '10px',
    borderRadius: '50%'
  }
}

export default Bio