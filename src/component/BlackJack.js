import { React, useState, useEffect, Fragment } from "react";

const PLAYER = "Player";
const DEALER = "Dealer";

const CARD = {
  S: ["🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"],
  H: ["🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾"],
  D: ["🃁", "🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎"],
  C: ["🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞"],
  BACK: "🂠",
};

const MESSAGE = {
  WIN: "Player Win!",
  LOSE: "Dealer Win!",
  BURST: "Burst!",
  DRAW: "Draw!",
  BLACK: "Black Jack!",
};

const GAME = {
  INIT: 0,
  START: 1,
  STAY: 2,
  WIN: 3,
  LOSE: 4,
  DRAW: 5,
  BLACK: 6,
};

function BlackJack() {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const [decks, setDecks] = useState([]);

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  const [gameState, setGameState] = useState(GAME.INIT);
  const [resultMessage, setReusltMessage] = useState("");

  useEffect(() => {
    startNewGame();
    setGameState(GAME.START);
  }, []);

  useEffect(() => {
    calcScore(playerCards, PLAYER);
  }, [playerCards]);

  useEffect(() => {
    calcScore(dealerCards, DEALER);
  }, [dealerCards]);

  useEffect(() => {
    const hiddenDealerCards = dealerCards.filter(
      (card) => card.hidden === true
    );

    if (hiddenDealerCards.length === 0) {
      if (dealerScore >= 1 && dealerScore <= 16) {
        addCard(DEALER);
      } else if (dealerScore >= 17 && gameState === GAME.STAY) {
        checkWin();
      }
    }
  }, [dealerScore]);

  const checkWin = () => {
    if (dealerScore === playerScore) {
      console.log("draw");
      setGameState(GAME.DRAW);
      setReusltMessage(MESSAGE.DRAW);
    } else if (dealerScore > 21 || dealerScore < playerScore) {
      setGameState(GAME.WIN);
      setReusltMessage(MESSAGE.WIN);
    } else if (dealerScore <= 21 && dealerScore > playerScore) {
      console.log("lose");
      setGameState(GAME.LOSE);
      setReusltMessage(MESSAGE.LOSE);
    }
  };

  useEffect(() => {
    if (playerScore === 21) {
      setReusltMessage(MESSAGE.BLACK);
      setGameState(GAME.BLACK);
      openDealerCards();
    } else if (playerScore > 21) {
      setReusltMessage(MESSAGE.BURST);
      setGameState(GAME.LOSE);
      openDealerCards();
    }
  }, [playerScore]);

  const startNewGame = () => {
    const initDecks = generateDeck();
    const shuffleDecks = shuffleDeck(initDecks);
    shareDeck(shuffleDecks);
  };

  const generateDeck = () => {
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const types = ["S", "H", "D", "C"];

    let initDecks = [];

    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        initDecks.push({ number: values[j], suit: types[i], hidden: false });
      }
    }
    return initDecks;
  };

  const shuffleDeck = (deck) => {
    let shuffleDecks = [...deck];

    for (let i = 0; i < shuffleDecks.length; i++) {
      const j = Math.floor(Math.random() * shuffleDecks.length);
      let temp = shuffleDecks[i];
      shuffleDecks[i] = shuffleDecks[j];
      shuffleDecks[j] = temp;
    }

    return shuffleDecks;
  };

  const shareDeck = (deck) => {
    let playerCards = [];
    let dealerCards = [];

    for (let i = 0; i < 4; i++) {
      if (i % 2 === 0) {
        playerCards.push(deck.pop());
      } else {
        dealerCards.push(deck.pop());
      }
    }

    dealerCards[1].hidden = true;

    setPlayerCards(playerCards);
    setDealerCards(dealerCards);
    setDecks(deck);

    return { playerCards, dealerCards };
  };

  const addCard = (user) => {
    let remaningDecks = [...decks];
    let cards = [];

    if (user === PLAYER) {
      cards = [...playerCards];
      cards.push(remaningDecks.pop());
      setPlayerCards(cards);
    } else if (user === DEALER) {
      cards = [...dealerCards];
      cards.push(remaningDecks.pop());
      setDealerCards(cards);
    }
    setDecks(remaningDecks);

    return cards;
  };

  const calcScore = (cards, user) => {
    let totalScore = 0;

    cards.forEach((card) => {
      if (!card.hidden) {
        totalScore += getValue(card);
      }
    });

    const aCards = cards.filter((card) => {
      return card.number === "A";
    });

    aCards.forEach((card) => {
      if (!card.hidden) {
        if (totalScore + 11 > 21) {
          totalScore += 1;
        } else if (totalScore + 11 === 21) {
          if (aCards.length > 1) {
            totalScore += 1;
          } else {
            totalScore += 11;
          }
        } else {
          totalScore += 11;
        }
      }
    });

    if (user === PLAYER) {
      setPlayerScore(totalScore);
    } else if (user === DEALER) {
      setDealerScore(totalScore);
    }
  };

  const getValue = (card) => {
    const value = card.number;

    if (isNaN(value)) {
      if (value === "A") {
        return 0;
      } else {
        return 10;
      }
    }

    return parseInt(value);
  };

  const onReset = () => {
    setReusltMessage("");
    startNewGame();
  };

  const onHit = () => {
    if (playerScore < 21) {
      addCard(PLAYER);
    }
  };

  const onStay = () => {
    openDealerCards();
    setGameState(GAME.STAY);
  };

  const openDealerCards = () => {
    dealerCards.filter((card) => {
      if (card.hidden === true) {
        card.hidden = false;
      }
      return card;
    });
    setDealerCards([...dealerCards]);
  };

  return (
    <Fragment>
      <button onClick={onReset}>Reset</button>
      <h2>
        Dealer: <span id="dealer-sum">{dealerScore}</span>
      </h2>
      <div id="dealer-cards" style={{ fontSize: "800%" }}>
        {dealerCards.map((card) => {
          if (card.hidden) {
            return CARD.BACK;
          }
          if (isNaN(card.number)) {
            if (card.number === "A") {
              return CARD[card.suit][0];
            } else if (card.number === "J") {
              return CARD[card.suit][10];
            } else if (card.number === "Q") {
              return CARD[card.suit][11];
            } else if (card.number === "K") {
              return CARD[card.suit][12];
            }
          } else {
            return CARD[card.suit][card.number - 1];
          }
        })}
      </div>

      <h2>
        You: <span id="your-sum">{playerScore}</span>
      </h2>
      <div id="your-cards" style={{ fontSize: "800%" }}>
        {playerCards.map((card) => {
          if (isNaN(card.number)) {
            if (card.number === "A") {
              return CARD[card.suit][0];
            } else if (card.number === "J") {
              return CARD[card.suit][10];
            } else if (card.number === "Q") {
              return CARD[card.suit][11];
            } else if (card.number === "K") {
              return CARD[card.suit][12];
            }
          } else {
            return CARD[card.suit][card.number - 1];
          }
        })}
      </div>

      <br />
      <button onClick={onHit}>Hit</button>
      <button onClick={onStay}>Stay</button>
      <p id="results">{resultMessage}</p>
    </Fragment>
  );
}

export default BlackJack;
