import { React, useState, useEffect } from 'react';

import './App.css'

const PLAYER = "Player";
const DEALER = "Dealer";

const CARD = {
  S: ["🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🂨", "🂩", "🂪", "🂫", "🂭", "🂮"],
  H: ["🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾"],
  D: ["🃁", "🃂", "🃃", "🃄", "🃅", "🃆", "🃇", "🃈", "🃉", "🃊", "🃋", "🃍", "🃎"],
  C: ["🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🃞"],
  BACK: "🂠"
}

function App() {
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);

  const [isHidden, setIsHidden] = useState(true);
  const [decks, setDecks] = useState([]);

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  useEffect(() => {
    startNewGame(); 
  }, []);

  useEffect(() => {
    if(playerScore === 21) {
      // alert('Black Jack!');
    }
  }, [playerScore]);

  const startNewGame = () => {
    const initDecks = generateDeck();
    const shuffleDecks = shuffleDeck(initDecks);
    const {playerCards, dealerCards} = shareDeck(shuffleDecks);
    calcScore(playerCards, PLAYER);
    calcScore(dealerCards, DEALER);
  }

  const generateDeck = _ => {
    const values =["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const types = ["S", "H", "D", "C"];

    let initDecks = [];

    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        initDecks.push({number: values[j], suit: types[i]});
      }
    }
    return initDecks;
  }

  const shuffleDeck = (deck) => {
    let shuffleDecks = [...deck];

    for (let i = 0; i < shuffleDecks.length; i++) {
      const j = Math.floor(Math.random() * shuffleDecks.length);
      let temp = shuffleDecks[i];
      shuffleDecks[i] = shuffleDecks[j];
      shuffleDecks[j] = temp;
    }

    return shuffleDecks;
  }

  const shareDeck = (deck) => {
    let playerCards = [];
    let dealerCards = [];

    for(let i = 0; i < 4; i++) {
      if(i % 2 == 0) {
        playerCards.push(deck.pop());
      } else {
        dealerCards.push(deck.pop());
      }
    }
    
    setPlayerCards(playerCards);
    setDealerCards(dealerCards);
    setDecks(deck);

    return {playerCards, dealerCards};
  }

  const addCard = (user) => {
    let remaningDecks = [...decks];
    let cards = [];
    
    if(user === PLAYER) {
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
  }

  const calcScore = (cards, user) => {
    let totalScore = 0;

    cards.forEach((card) => {
      totalScore += getValue(card);
    });

    const aCards = cards.filter((card) => {
      return card.number === "A";
    });

    aCards.forEach((card) => {
      if((totalScore + 11) > 21) {
        totalScore += 1;
      } else if((totalScore + 11) === 21) {
        if (aCards.length > 1) {
          totalScore += 1;
        }
        else {
          totalScore += 11;
        }
      } else {
        totalScore += 11;
      }
    })

    if(user === PLAYER) {
      setPlayerScore(totalScore);
    } else if(user === DEALER) {
      setDealerScore(totalScore);
    }
  }

  const getValue = (card) => {
    const value = card.number;

    if (isNaN(value)) {
      if (value === "A") {
        return 0;
      } else {
        return 10;
      }
    }

    return parseInt(value) + 1;
  }



  const onReset = _ => {
    setIsHidden(true);
    startNewGame(); 
  }

  const onHit = _ => {
    if(playerScore < 21) {
      const cards = addCard(PLAYER);
      calcScore(cards, PLAYER);
    }
  } 

  const onStay = _ => {
    setIsHidden(false);
    // 점수 계산
  }

  return (
    <>
    <button onClick={onReset}>Reset</button>
    <h2>Dealer: <span id="dealer-sum">{dealerScore}</span></h2>
    <div id="dealer-cards" style={{fontSize:"800%"}}>
      {
        dealerCards.map((card, index) => {
          if(isHidden === true && index > 0) {
            return CARD.BACK;
          }
          if(isNaN(card.number)) {
            if(card.number === "A") {
              return CARD[card.suit][0];
            } else if(card.number === "J") {
              return CARD[card.suit][10];
            } else if(card.number === "Q") {
              return CARD[card.suit][11];
            } else if(card.number === "K") {
              return CARD[card.suit][12];
            }
          } else {
            return CARD[card.suit][card.number]
          }
        })
      }
    </div>

    <h2>You: <span id="your-sum">{playerScore}</span></h2>
    <div id="your-cards" style={{fontSize:"800%"}}>
      {
        playerCards.map((card) => {
          if(isNaN(card.number)) {
            if(card.number === "A") {
              return CARD[card.suit][0];
            } else if(card.number === "J") {
              return CARD[card.suit][10];
            } else if(card.number === "Q") {
              return CARD[card.suit][11];
            } else if(card.number === "K") {
              return CARD[card.suit][12];
            }
          } else {
            return CARD[card.suit][card.number]
          }
        })
      }
    </div>

    <br/>
    <button onClick={onHit}>Hit</button>
    <button onClick={onStay}>Stay</button>
    <p id="results"></p>
    </>
  );
}

export default App;
