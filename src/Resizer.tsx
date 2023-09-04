import { RefObject, useEffect, useState } from 'react'
import * as THREE from 'three'
import { isMobile } from 'react-device-detect'

export function Resizer(groupRef: RefObject<THREE.Group>) {

  const [scale, setScale] = useState(0)

  useEffect(() => {
    const resizeListener = () => {
      if (groupRef.current) {
        const boundingBox = new THREE.Box3().setFromObject(groupRef.current)
        const currentHeight = boundingBox.max.y - boundingBox.min.y
        const currentWidth = boundingBox.max.x - boundingBox.min.x
        const desiredScale = isMobile? window.innerWidth / currentWidth :  window.innerHeight / currentHeight
        setScale(desiredScale)
      }
    }

    window.addEventListener('resize', resizeListener)
    resizeListener()

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [groupRef])

  if (!groupRef.current) {
    return undefined
  }

  return scale
}
