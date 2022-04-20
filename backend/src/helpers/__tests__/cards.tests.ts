import { CardsDataJSON } from "@services"
import { IPlayingCard, IWildCard } from "alacrity-shared"
import { getDrawPile, TOTAL_PLAYING_CARDS, TOTAL_WILD_CARDS } from "../cards"
import * as cardsData from "./cards-data.json"

describe("cards", () => {
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
