import { CardsDataJSON } from "@services"
import { CardColor, CardSymbol, IPlayingCard, IWildCard } from "alacrity-shared"

export const TOTAL_PLAYING_CARDS = 92
export const TOTAL_WILD_CARDS = 8

export const shuffle = (list: any[]) =>
  list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

export const getDrawPile = ({
  cardsData,
}: {
  cardsData: CardsDataJSON
}): (IPlayingCard | IWildCard)[] => {
  const difficulties = Object.keys(cardsData)
  const symbols = Object.values(CardSymbol)

  const TOTAL_CARDS_PER_DIFFICULTY = TOTAL_PLAYING_CARDS / difficulties.length
  const TOTAL_CARDS_PER_SYMBOL = Math.ceil(TOTAL_PLAYING_CARDS / symbols.length)

  const selectedWords = difficulties.reduce((prev, curr) => {
    const selectedWordsForDifficulty = shuffle(cardsData[curr]).slice(0, TOTAL_CARDS_PER_DIFFICULTY)

    return [...prev, ...selectedWordsForDifficulty]
  }, [])

  const cardColors = [
    CardColor.BLACK,
    CardColor.NAVY,
    CardColor.ORANGE,
    CardColor.RED,
    CardColor.SAND,
  ]

  const unshuffledDrawPile = symbols.reduce((prev: IPlayingCard[], curr, idx) => {
    const color = cardColors[(idx + 1) % cardColors.length]
    const currentCards = selectedWords.splice(0, TOTAL_CARDS_PER_SYMBOL).map(
      (card): IPlayingCard => ({
        type: "playing",
        text: card,
        color,
        symbol: curr,
      }),
    )

    return [...prev, ...currentCards]
  }, [])

  const wildCardPile: IWildCard[] = []
  const symbolSet = new Set()

  while (wildCardPile.length < TOTAL_WILD_CARDS) {
    const shuffledSymbols = shuffle(symbols)
    const a = Math.floor(Math.random() * shuffledSymbols.length)
    const b = Math.floor(Math.random() * shuffledSymbols.length)
    const symbolB = shuffledSymbols[b]
    const symbolA = shuffledSymbols[a]
    const chosenSymbols = [symbolA, symbolB]
    const flippedChosenSymbols = [symbolB, symbolA]

    if (
      symbolA !== symbolB &&
      !symbolSet.has(JSON.stringify(chosenSymbols)) &&
      !symbolSet.has(JSON.stringify(flippedChosenSymbols))
    ) {
      const color = cardColors[Math.floor(Math.random() * cardColors.length)]
      wildCardPile.push({
        type: "wildCard" as const,
        symbols: chosenSymbols,
        color,
      })
      symbolSet.add(JSON.stringify(chosenSymbols))
      symbolSet.add(JSON.stringify(flippedChosenSymbols))
    } else {
      ;[shuffledSymbols[a], shuffledSymbols[b]] = [shuffledSymbols[b], shuffledSymbols[a]]
    }
  }

  const drawPile = shuffle([...unshuffledDrawPile, ...wildCardPile])

  return drawPile
}
