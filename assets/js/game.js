const myModule = (() => {
    'use strict';

    // Global variables
    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    // HTML references
    const btnNewGame = document.querySelector('#btn-new-game'),
        btnRequestCard = document.querySelector('#btn-request-card'),
        btnStop = document.querySelector('#btn-stop');

    const cardsDiv = document.querySelectorAll('.cards-div'),
        smallTags = document.querySelectorAll('small');

    // Función que inicializa el juego
    const initGame = (playersNumber = 2) => {
        deck = createDeck();

        playersPoints = [];
        for (let i = 0; i < playersNumber; i++) {
            playersPoints.push(0);
        }

        smallTags.forEach((smallTag) => smallTag.innerText = 0);

        cardsDiv.forEach((cardsDiv) => cardsDiv.innerHTML = '');

        btnRequestCard.disabled = false;
        btnStop.disabled = false;
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

    // Función que retorna el valor de una carta
    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        
        return isNaN(value)
                ? (value === 'A' ? 11 : 10)
                : (value * 1);
    };

    // Función que permite acumular puntos
    // Turno: 0 = player, 1 = computer
    const comulatePoints = (card, playerTurn) => {
        playersPoints[playerTurn] += cardValue(card);

        smallTags[playerTurn].innerText = playersPoints[playerTurn];

        return playersPoints[playerTurn];
    };

    const createCard = (card, playerTurn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('blackjack-card');
        
        cardsDiv[playerTurn].append(imgCard);
    };

    const chooseWinner = () => {
        const [minPoints, computerPoints] = playersPoints;

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

    // Función que permite que la computadora juegue
    const computerTurn = (minPoints) => {
        let computerPoints = 0;

        do {
            const card = requestCard();

            computerPoints = comulatePoints(card, playersPoints.length - 1);

            createCard(card, playersPoints.length - 1);
        } while ((computerPoints < minPoints) && (minPoints <= 21));

        chooseWinner();
    };

    // Events
    btnRequestCard.addEventListener('click', () => {
        const card = requestCard();

        const playerPoints = comulatePoints(card, 0);

        createCard(card, 0);

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

        computerTurn(playersPoints[0]);
    });

    btnNewGame.addEventListener('click', () => {
        initGame();
    });

    return {
        newGame: initGame,
    };
})();