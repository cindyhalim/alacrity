import { CardSymbol } from "alacrity-shared"
import { AnimationControls, motion } from "framer-motion"
import React from "react"
import { Card, TCardSize } from "./card"

interface IAnimatedCardWrapperProps {
  animate: AnimationControls
  id: string
  cardSize: TCardSize
  isFlipped: boolean
}
export const AnimatedCardWrapper: React.FC<IAnimatedCardWrapperProps> = ({
  animate,
  id,
  cardSize,
  isFlipped,
  children,
}) => (
  <motion.div key={id} animate={animate}>
    {!isFlipped ? (
      <Card symbol={CardSymbol.CIRCLE} text={"SLIDING CARD"} size={cardSize} side={"back"} />
    ) : (
      children
    )}
  </motion.div>
)
