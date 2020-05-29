import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = "MobileFlashcards:deck"

export function fetchDeckResults () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function addDeck(deck) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY,JSON.stringify(deck))
}

export function addCard(card,deckId) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[deckId]={
          ...decks[deckId],
          questions:[...decks[deckId].questions,card]
      };
      AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(decks));
    })
}

export function removeDeck(deckId) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const decks = JSON.parse(results);
            decks[deckId] = undefined;
            delete decks[deckId];
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
        })
}