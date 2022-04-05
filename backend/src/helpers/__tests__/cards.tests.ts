import { CardsDataJSON } from "@services"
import { IPlayingCard, IWildCard } from "alacrity-shared"
import {
  generateUniqueRandomFromList,
  getDrawPile,
  TOTAL_PLAYING_CARDS,
  TOTAL_WILD_CARDS,
} from "../cards"
import * as cardsData from "./cards-data.json"

describe("cards", () => {
  describe("generateUniqueRandomFromList", () => {
    it("does not error out if list is smaller than max", () => {
      const categories = [
        "Amino acid",
        "Romantic era musician",
        "Programming language",
        "Foreign film",
        "South American dish",
        "Historical general",
        "Fictional metal/mineral",
        "Celebrity birthday",
      ]
      const list = generateUniqueRandomFromList({ max: 100, list: categories })

      expect(list).toBeDefined()
      expect(list.length).toEqual(categories.length)
    })

    it("returns correct list if max provided is less than or equal size of list", () => {
      const categories = [
        "Amino acid",
        "Romantic era musician",
        "Programming language",
        "Foreign film",
        "South American dish",
        "Historical general",
        "Fictional metal/mineral",
        "Celebrity birthday",
      ]
      const list = generateUniqueRandomFromList({ max: 6, list: categories })

      expect(list).toBeDefined()
      expect(list.length).toEqual(6)
    })

    it("returns no dupes", () => {
      const categoriesWithDupes = [
        "Amino acid",
        "Romantic era musician",
        "Programming language",
        "Foreign film",
        "South American dish",
        "Historical general",
        "Fictional metal/mineral",
        "Amino acid",
      ]
      const list = generateUniqueRandomFromList({ max: 8, list: categoriesWithDupes })
      expect(list).toBeDefined()
      expect(list.length).toEqual(7)
    })
  })

  describe("getCardPile", () => {
    it("returns 92 playing cards with no dupes", () => {
      const data: CardsDataJSON = cardsData

      const drawPile = getDrawPile({ cardsData: data })
      const playingCards = drawPile.filter((card): card is IPlayingCard => card.type === "playing")

      expect(playingCards).toBeDefined()
      expect(playingCards.length).toBe(TOTAL_PLAYING_CARDS)

      const cards = playingCards.map((card) => JSON.stringify(card))
      const set = new Set(cards)

      expect(set.size).toBe(playingCards.length)
    })

    it("it returns 8 unique wild cards with no dupes", () => {
      const data: CardsDataJSON = cardsData

      const drawPile = getDrawPile({ cardsData: data })
      const wildCards = drawPile.filter((card): card is IWildCard => card.type === "wildCard")

      expect(wildCards).toBeDefined()
      expect(wildCards.length).toBe(TOTAL_WILD_CARDS)

      const cards = wildCards.map((card) => JSON.stringify(card))
      const cardsSymbolsFlipped = wildCards.map((card) =>
        JSON.stringify({
          ...card,
          symbols: [card.symbols[1], card.symbols[0]],
        }),
      )

      const set = new Set([...cards, ...cardsSymbolsFlipped])

      expect(set.size).toBe(wildCards.length * 2)
    })
  })
})
