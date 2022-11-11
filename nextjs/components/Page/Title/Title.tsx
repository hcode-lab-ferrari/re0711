import React from 'react'

const Title = ({value}:{value:string}) => {
  return (
    <header className="page-title">
        <h2>{value}</h2>
        <hr/>
    </header>
  )
}

export default Title