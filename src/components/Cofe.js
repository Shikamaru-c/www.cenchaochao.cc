import React from 'react'

function Cofe (props) {
  const minutes = props.minutes
  let count = Math.round(minutes / 5)
  count = count === 0 ? 1 : count
  let tmpArray = []
  while (count > 0) {
    tmpArray.push(0)
    count--
  }
  return (
    <span role="img" aria-label="cofe">
    {
      tmpArray.map(i => '☕')
    }
    </span>
  ) 
}

export default Cofe