import React, { Component } from 'react'
import { getPost } from '../apis'

class Post extends Component {
  constructor () {
    super()
    this.state = {
      post: null
    }
  }
  componentDidMount () {
    const postTitle = this.props.location.pathname.slice(1, -1)
    const post = getPost(postTitle)
    post && this.setState({
      post
    })
  }
  render () {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.post.content }} />
    )
  }
}

export default Post