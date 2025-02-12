(() => {
    'use strict';

    // Global variables
    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playerPoints = 0,
        computerPoints = 0;

    // HTML references
    const btnNewGame = document.querySelector('#btn-new-game'),
        btnRequestCard = document.querySelector('#btn-request-card'),
        btnStop = document.querySelector('#btn-stop');

    const playerCards = document.querySelector('#player-cards')
        computerCards = document.querySelector('#computer-cards'),
        smallTags = document.querySelectorAll('small');

    // Function that initializes the game 
    const initGame = () => {
        createDeck();
    };

    // Función que crea un nuevo deck
    const createDeck = () => {
        deck = [];

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

        return _.shuffle(deck);
    };

    // Función que permite tomar una carta
    const requestCard = () => {
        if (deck.length === 0) {
            throw 'No cards on deck';
        }

        return deck.pop();
    };

    // requestCard();

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        
        return isNaN(value)
                ? (value === 'A' ? 11 : 10)
                : (value * 1);
    };

    const computerTurn = (minPoints) => {
        do {
            const card = requestCard();
            computerPoints += cardValue(card);

            smallTags[1].innerText = computerPoints;

            const imgCard = document.createElement('img');
            imgCard.src = `assets/cards/${card}.png`;
            imgCard.classList.add('blackjack-card');
            
            computerCards.append(imgCard);

            if (minPoints > 21) {
                break;
            }
        } while ((computerPoints < minPoints) && (minPoints <= 21));

        setTimeout(() => {
            if (computerPoints === minPoints) {
                alert('Draw');
            } else if (minPoints > 21) {
                alert('Computer wins');
            } else if (computerPoints > 21) {
                alert('Player wins');
            } else {
                alert('Computer wins');
            }
        }, 100);
    };

    // Events
    btnRequestCard.addEventListener('click', () => {
        const card = requestCard();
        playerPoints += cardValue(card);

        smallTags[0].innerText = playerPoints;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('blackjack-card');
        
        playerCards.append(imgCard);

        if (playerPoints > 21) {
            btnRequestCard.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        } else if (playerPoints === 21) {
            btnRequestCard.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        }
    });

    btnStop.addEventListener('click', () => {
        btnRequestCard.disabled = true;
        btnStop.disabled = true;

        computerTurn(playerPoints);
    });

    btnNewGame.addEventListener('click', () => {
        deck = [];
        createDeck();

        playerPoints = 0;
        computerPoints = 0;

        smallTags[0].innerText = 0;
        smallTags[1].innerText = 0;

        playerCards.innerHTML = '';
        computerCards.innerHTML = '';

        btnRequestCard.disabled = false;
        btnStop.disabled = false;
    });
})();