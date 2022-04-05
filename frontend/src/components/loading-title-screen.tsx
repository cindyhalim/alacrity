import React, { useEffect, useRef } from "react"
import { BaseTitleScreen } from "./base-title-screen"
import loadingAnimation from "../assets/loading.json"
import lottie, { AnimationItem } from "lottie-web"
import { Box } from "rebass"

export const LoadingTitleScreen: React.FC = () => {
  const element = useRef<HTMLDivElement>(null)
  const lottieInstance = useRef<AnimationItem>()

  useEffect(() => {
    if (element.current) {
      lottieInstance.current = lottie.loadAnimation({
        animationData: loadingAnimation,
        container: element.current,
      })
      lottieInstance.current.setSpeed(3)
    }
  }, [])

  return (
    <BaseTitleScreen sx={{ justifyContent: "center" }}>
      <Box sx={{ width: 100, height: 100 }} ref={element}></Box>
    </BaseTitleScreen>
  )
}
