import React from "react"
import { BaseTitleScreen } from "./base-title-screen"

interface ILoadingTitleScreenProps {
  text?: string
}
export const LoadingTitleScreen: React.FC<ILoadingTitleScreenProps> = ({ text }) => {
  return <BaseTitleScreen>{text}</BaseTitleScreen>
}
