import React, { useState } from 'react'
import LoaderContext from './LoaderContext'

const LoaderState = (props) => {
    let [isLoaderEnable, setIsLoaderEnable] = useState(false)
  return (
    <div>
        <LoaderContext.Provider value={{isLoaderEnable, setIsLoaderEnable}}>
            {props.children}
        </LoaderContext.Provider>
    </div>
  )
}

export default LoaderState