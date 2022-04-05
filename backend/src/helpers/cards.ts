import { CardsDataJSON } from "@services"
import { CardSymbol, IPlayingCard, IWildCard } from "alacrity-shared"

export const TOTAL_PLAYING_CARDS = 92
export const TOTAL_WILD_CARDS = 8

export const shuffle = (list: any[]) =>
  list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

export const generateUniqueRandomFromList = ({ max, list }: { max: number; list: string[] }) => {
  const set: Set<string> = new Set(list)
  const unshuffledListFromSet = Array.from(set)
  const shuffled = shuffle(unshuffledListFromSet).slice(0, max)

  return shuffled
}

export const getDrawPile = ({
  cardsData,
}: {
  cardsData: CardsDataJSON
}): (IPlayingCard | IWildCard)[] => {
  const difficulties = Object.keys(cardsData)
  const TOTAL_CARDS_PER_DIFFICULTY = TOTAL_PLAYING_CARDS / difficulties.length
  const TOTAL_CARDS_PER_SYMBOL = Math.ceil(TOTAL_PLAYING_CARDS / TOTAL_WILD_CARDS)

  const symbols = Object.values(CardSymbol)

  const selectedWords = difficulties.reduce((prev, curr) => {
    const selectedWordsForDifficulty = generateUniqueRandomFromList({
      max: TOTAL_CARDS_PER_DIFFICULTY,
      list: cardsData[curr],
    })

    return [...prev, ...selectedWordsForDifficulty]
  }, [])

  const unshuffledDrawPile = symbols.reduce((prev: IPlayingCard[], curr) => {
    const currentCards = selectedWords.splice(0, TOTAL_CARDS_PER_SYMBOL).map(
      (card): IPlayingCard => ({
        type: "playing",
        text: card,
        symbol: curr,
      }),
    )

    return [...prev, ...currentCards]
  }, [])

  const shuffledSymbolA = shuffle(symbols)
  let shuffledSymbolB = shuffle(symbols)

  const wildCardPile = []
  const symbolSet = new Set()

  while (wildCardPile.length < TOTAL_WILD_CARDS) {
    const symbolB = shuffledSymbolB.pop()
    const symbolA = shuffledSymbolA.pop()
    const chosenSymbols = [symbolA, symbolB]
    const flippedChosenSymbols = [symbolB, symbolA]

    if (
      symbolA !== symbolB &&
      !symbolSet.has(JSON.stringify(chosenSymbols)) &&
      !symbolSet.has(JSON.stringify(flippedChosenSymbols))
    ) {
      wildCardPile.push({
        type: "wildCard" as const,
        symbols: chosenSymbols,
      })
      symbolSet.add(JSON.stringify(chosenSymbols))
      symbolSet.add(JSON.stringify(flippedChosenSymbols))
    } else {
      shuffledSymbolB.push(symbolB)
      shuffledSymbolA.push(symbolA)
      shuffledSymbolB = shuffle(shuffledSymbolB)
    }
  }

  const drawPile = shuffle([...unshuffledDrawPile, ...wildCardPile])
  return drawPile
}
