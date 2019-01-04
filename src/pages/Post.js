import React, { Component } from 'react'
import Layout from '../components/Layout.js'
import Desc from '../components/Desc.js'
import NotFound from '../components/NotFound.js'
import Bio from '../components/Bio.js'
import { getPost } from '../apis'
import './github-markdown.css'

class Post extends Component {
  constructor () {
    super()
    this.state = {
      post: null
    }
  }
  componentDidMount () {
    const url = this.props.location.pathname.slice(1, -1)
    const post = getPost(url)
    post && this.setState({
      post
    })
  }
  render () {
    const post = this.state.post
    const EDIT_URL = 'https://github.com/cenchaochao/cenchaochao.io/edit/master/src/posts/'
    return (
      <Layout>
        {
          post ? (
            <>
              <h1 style={styles.title}>{post.header.title}</h1>
              <Desc date={post.header.date} readingTime={post.header.readingTime} />
              <div className="markdown-body" style={styles.mdWrapper} dangerouslySetInnerHTML={{ __html: post.content }} />
              <div style={styles.linkWrapper}>
                <a className="external-link" href={EDIT_URL + post.header.url + '.md'} alt="github" target="_blank" rel="noopener noreferrer">Edit on Github</a>
              </div>
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
    marginTop: 28,
    marginBottom: 28
  },
  linkWrapper: {
    fontSize: 16,
    lineHeight: '28px'
  }
}

export default Post