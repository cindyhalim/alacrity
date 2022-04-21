import { IWildCard } from "alacrity-shared"
import React, { useEffect } from "react"
import { useCardAnimationSequence, usePrevious } from "src/utils/helpers"
import { Card } from "src/components"
import { motion } from "framer-motion"

export const WildCard: React.FC<IWildCard> = (wildCard) => {
  const { cardAnimation, addSequence, isRevealed } = useCardAnimationSequence()
  const currSymbols = JSON.stringify(wildCard.symbols)
  const prevSymbols = usePrevious(currSymbols)

  useEffect(() => {
    if (prevSymbols !== currSymbols) {
      addSequence()
    }
  }, [currSymbols, addSequence, prevSymbols])

  return (
    <motion.div id="wild-card-animation" animate={cardAnimation}>
      <Card cardData={wildCard} color={wildCard.color} side={isRevealed ? "front" : "back"} />
    </motion.div>
  )
}
