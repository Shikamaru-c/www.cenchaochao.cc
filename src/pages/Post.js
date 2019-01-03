import React, { Component } from 'react'
import Layout from '../components/Layout.js'
import Desc from '../components/Desc.js'
import NotFound from '../components/NotFound.js'
import Bio from '../components/Bio.js'
import { getPost } from '../apis'

class Post extends Component {
  constructor () {
    super()
    this.state = {
      post: null
    }
  }
  componentDidMount () {
    const title = this.props.location.pathname.slice(1, -1)
    const post = getPost(title)
    post && this.setState({
      post
    })
  }
  render () {
    const post = this.state.post
    return (
      <Layout>
        {
          post ? (
            <>
              <h1 style={styles.title}>{post.header.title}</h1>
              <Desc date={post.header.date} readingTime={post.header.readingTime} />
              <div style={styles.mdWrapper} dangerouslySetInnerHTML={{ __html: post.content }} />
              <Bio />
            </>
          ) : <NotFound />
        }
      </Layout>
    )
  }
}

const styles = {
  title: {
    marginTop: 42,
    marginBottom: 0,
    fontSize: 40,
    lineHeight: '44px',
    fontWeight: 900,
    fontFamily: 'Merriweather, Georgia, serif',
    color: 'rgba(0, 0, 0, .9)'
  },
  mdWrapper: {
    marginTop: 28
  }
}

export default Post