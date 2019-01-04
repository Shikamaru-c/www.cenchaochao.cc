import React from 'react'
import Cofe from './Cofe.js'

function Desc (props) {
  return (
    <small style={styles.desc}>{ props.date } • <Cofe minutes={props.readingTime.minutes} />{ props.readingTime.text }</small>
  )
}

const styles = {
  desc: {
    fontSize: 13,
    lineHeight: '22px',
  }
}

export default Desc