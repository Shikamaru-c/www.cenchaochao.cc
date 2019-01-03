import React from 'react'
import Bio from '../components/Bio'
import Posts from '../components/Posts'
import Layout from '../components/Layout'

function Home () {
  return (
    <Layout>
      <Bio></Bio>
      <Posts></Posts>
    </Layout>
  )
}

export default Home