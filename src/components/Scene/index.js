import React, { useEffect, useRef } from 'react'

import './Scene.css'
import { makeScene, unmakeScene, playPointLock } from './Scripts'
export default function Scene() {
  const sceneRef = useRef()
  useEffect(() => {
    makeScene(sceneRef)

    return () => {
      unmakeScene()
    }
  }, [])

  return (
    <div className="scene" ref={sceneRef}>
      <button className="btnplay" onClick={() => playPointLock()}>
        play
      </button>
    </div>
  )
}
