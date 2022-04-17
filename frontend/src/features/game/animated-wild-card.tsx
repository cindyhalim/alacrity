import { IWildCard } from "alacrity-shared"
import React, { useEffect } from "react"
import { useCardAnimationSequence, usePrevious } from "src/utils/helpers"
import { AnimatedCardWrapper, WildCard } from "src/components"

export const AnimatedWildCard: React.FC<{ symbols: IWildCard["symbols"] }> = ({ symbols }) => {
  const { cardAnimation, addSequence, isFlipped } = useCardAnimationSequence()
  const currSymbols = JSON.stringify(symbols)
  const prevSymbols = usePrevious(currSymbols)

  useEffect(() => {
    if (prevSymbols !== currSymbols) {
      addSequence()
    }
  }, [currSymbols])

  return (
    <AnimatedCardWrapper
      id="wild-card-animation"
      cardSize={"medium"}
      animate={cardAnimation}
      isFlipped={isFlipped}
    >
      <WildCard symbols={symbols} />
    </AnimatedCardWrapper>
  )
}
