import { CardsDataJSON } from "@services"
import { CardSymbol, IPlayingCard, IWildCard } from "alacrity-shared"

export const TOTAL_PLAYING_CARDS = 92
export const TOTAL_WILD_CARDS = 8

export const generateUniqueRandomFromList = ({
  min = 0,
  max,
  list,
}: {
  min?: number
  max: number
  list: string[]
}) => {
  const set: Set<string> = new Set()
  const listSize = list.length
  let safeMax = max

  if (safeMax > listSize) {
    safeMax = listSize
  }

  while (set.size !== safeMax) {
    const random = Math.floor(Math.random() * (safeMax - min + 1)) + min
    if (!set.has(list[random])) {
      set.add(list[random])
    }
  }

  return Array.from(set)
}

export const shuffle = (list: any[]) =>
  list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

export const getCardPile = ({
  cardsData,
}: {
  cardsData: CardsDataJSON
}): { drawPile: IPlayingCard[]; wildCardPile: IWildCard[] } => {
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

  const drawPile = shuffle(unshuffledDrawPile)

  const shuffledSymbolA = shuffle(symbols)
  let shuffledSymbolB = shuffle(symbols)

  const wildCardPile = []

  while (wildCardPile.length < TOTAL_WILD_CARDS) {
    const symbolA = shuffledSymbolA.pop()
    const symbolB = shuffledSymbolB.pop()

    if (symbolA !== symbolB) {
      wildCardPile.push({
        type: "wildCard" as const,
        symbols: [symbolA, symbolB],
      })
    } else {
      shuffledSymbolB.push(symbolB)
      shuffledSymbolA.push(symbolA)
      shuffledSymbolB = shuffle(shuffledSymbolB)
    }
  }

  return { drawPile, wildCardPile }
}
