import React from 'react'

function Layout (props) {
  return (
    <div style={styles.layout}>{ props.children }</div>
  )
}

const styles = {
  layout: {
    boxSizing: 'border-box',
    maxWidth: 630,
    margin: 'auto',
    padding: 20
  }
}

export default Layout
