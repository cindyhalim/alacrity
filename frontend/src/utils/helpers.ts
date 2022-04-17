import { useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useAppSelector } from "src/redux/utils"

export const getIsAdmin = () => !window.location.pathname.slice(1)

export const useMainPlayer = () => {
  const players = useAppSelector((state) => state.currentGame?.players || [])
  const playerId = useAppSelector((state) => state.playerId)
  const mainPlayer = players.find((player) => player.id === playerId)

  return mainPlayer
}

export const usePrevious = (value: any) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useCardAnimationSequence = () => {
  const [isFlipped, setisFlipped] = useState<boolean>(false)
  const cardAnimation = useAnimation()

  const addSequence = async (): Promise<void> => {
    if (isFlipped) setisFlipped(false)
    await cardAnimation.start({
      translateX: [-40, 0],
      transition: { duration: 0.2, ease: "linear" },
    })
    setisFlipped(true)
    return await cardAnimation.start({
      rotateY: [90, 0],
      transition: { duration: 0.2 },
    })
  }

  const removeSequence = async (): Promise<void> => {
    await cardAnimation.start({
      translateX: [0, -80, 0],
      transition: { duration: 0.3, ease: "linear" },
    })
  }

  return { cardAnimation, addSequence, removeSequence, isFlipped }
}
