import { CardsDataJSON } from "@services"
import {
  generateUniqueRandomFromList,
  getCardPile,
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
  })

  describe("getCardPile", () => {
    it("returns correct length of drawPiles with no dupes", () => {
      const data: CardsDataJSON = cardsData

      const { drawPile } = getCardPile({ cardsData: data })

      expect(drawPile).toBeDefined()
      expect(drawPile.length).toBe(TOTAL_PLAYING_CARDS)

      const cards = drawPile.map((card) => JSON.stringify(card))
      const set = new Set(cards)

      expect(set.size).toBe(drawPile.length)
    })

    it("it returns 8 unique wild cards", () => {
      const data: CardsDataJSON = cardsData

      const { wildCardPile } = getCardPile({ cardsData: data })

      expect(wildCardPile).toBeDefined()
      expect(wildCardPile.length).toBe(TOTAL_WILD_CARDS)

      const cards = wildCardPile.map((card) => JSON.stringify(card))
      const cardsSymbolsFlipped = wildCardPile.map((card) =>
        JSON.stringify({
          ...card,
          symbols: [card.symbols[1], card.symbols[0]],
        }),
      )

      const set = new Set([...cards, ...cardsSymbolsFlipped])

      expect(set.size).toBe(wildCardPile.length * 2)
    })
  })
})
