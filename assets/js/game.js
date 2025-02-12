/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Swords
 */

let deck = [];

const types = ['C', 'D', 'H', 'S'];

const specials = ['A', 'J', 'Q', 'K'];

// Función que crea un nuevo deck
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let type of types) {
            deck.push(`${i}${type}`);
        }
    }

    for (let type of types) {
        for (let special of specials) {
            deck.push(`${special}${type}`);
        }
    }

    deck = _.shuffle(deck);

    return deck;
};

createDeck();

// Función que permite tomar una carta
const requestCard = () => {
    if (deck.length === 0) {
        throw 'No cards on deck';
    }

    const card = deck.pop();

    console.log(`Card selected ${card}`);

    return card;
};

// requestCard();

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    
    return isNaN(value)
            ? (value === 'A' ? 11 : 10)
            : (value * 1);
};

const value = cardValue(requestCard());
console.log(value);