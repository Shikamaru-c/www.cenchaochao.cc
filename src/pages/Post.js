import React, { Component } from 'react'
import posts from '../posts/posts.json'
import beautifyUrl from '../utils/beautifyUrl.js'

class Post extends Component {
  constructor () {
    super()
    this.state = {
      content: null
    }
  }
  componentDidMount () {
    const postTitle = this.props.location.pathname.slice(1, -1)
    const post = posts.filter(post => beautifyUrl(post.header.title) === postTitle)[0]
    let content
    if (post) {
      content = post.content
      this.setState({
        content
      })
    }
  }
  render () {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
    )
  }
}

export default Post