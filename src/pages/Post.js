import React, { Component } from 'react'
import { getPost } from '../apis'

class Post extends Component {
  constructor () {
    super()
    this.state = {
      content: null
    }
  }
  componentDidMount () {
    const postTitle = this.props.location.pathname.slice(1, -1)
    const post = getPost(postTitle)
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