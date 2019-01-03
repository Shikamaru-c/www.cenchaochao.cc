import React from 'react'

function Layout (props) {
  return (
    <div style={styles.layout}>{ props.children }</div>
  )
}

const styles = {
  layout: {
    maxWidth: 630,
    margin: 'auto'
  }
}

export default Layout
