import { IWildCard } from "alacrity-shared"
import React, { useEffect } from "react"
import { useCardAnimationSequence, usePrevious } from "src/utils/helpers"
import { AnimatedCardWrapper, Card } from "src/components"

export const WildCard: React.FC<IWildCard> = (wildCard) => {
  const { cardAnimation, addSequence, isRevealed } = useCardAnimationSequence()
  const currSymbols = JSON.stringify(wildCard.symbols)
  const prevSymbols = usePrevious(currSymbols)

  useEffect(() => {
    if (prevSymbols !== currSymbols) {
      addSequence()
    }
  }, [currSymbols])

  return (
    <AnimatedCardWrapper id="wild-card-animation" animate={cardAnimation}>
      <Card cardData={wildCard} color={wildCard.color} side={isRevealed ? "front" : "back"} />
    </AnimatedCardWrapper>
  )
}
