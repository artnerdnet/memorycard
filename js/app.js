    /*
    * Create a list that holds all of your cards
    */
   let cards = document.getElementsByClassName('card');
   let allCards = [...cards];
   let openCard = [];
   let allStars = document.querySelector(".stars");
   let matchedCard = document.getElementsByClassName("match");
   const moves = document.querySelector('.moves');
   const deck = document.querySelector(".deck");
   const restartBtn = document.querySelector('.restart');
   let gameStart = false;
   let movesCount = 0;

   window.addEventListener("load", startingGame);
   restartBtn.addEventListener("click", startingGame);
   restartBtn.addEventListener("click", restartStars);




   // start and restarts game 
   function startingGame() {
       openCard = [];
       movesCount = 0;
       shuffleThis(); //shufflecards
       hideAndShow(); // hides and shows cards for a second
       gameStart = true;  
       timeOfFirstClick = new Date().getTime(); // registers the timer
       restartStars();
   }

   deck.addEventListener("click", handler);

   function handler(e) { //removes the listener for the click in the deck after the first click so it won't restart the timer
       e.target.removeEventListener(e.type, arguments.callee);
       let refreshIntervalId = setInterval(function() {
       if (gameStart == true) {
           const currentTime = new Date().getTime();
           const elapsed = currentTime - timeOfFirstClick;
           const minutes = Math.floor(elapsed / 60000); // this claculates the number of minutes passed 
           const remaining = elapsed - (minutes * 60000);
           const seconds = Math.floor(remaining / 1000);
           timer.innerHTML =  minutes + " mins " + seconds + " secs";
       }
   }, 1000);
   }


function restartStars(){
   for (i = 0; i < 3; i++) {removeStar()};
   gimme3Stars();
   movesCount = 0;
}

   function youWin(){
       // clearInterval(refreshIntervalId);   
       const finalTime = timer.innerHTML;
       const finalScore = movesCount.innerText;
       if (matchedCard.length == 16) {
           setTimeout(function() {alert('You win! Your start rating was ' + finalScore + ' stars and ' + movesCount + ' moves in '  + finalTime);
           startingGame();
           for (i = 0; i < 3; i++) {removeStar();} // sets the stars and moves to 0
           gimme3Stars(); // sets the stars and moves to 3
       }, 500);    
   }
   }


   function youLost() {
           if (movesCount == 10) {
           alert('You lost! Try again');
           hideCards();
           startingGame();
           for (i = 0; i < 3; i++) {removeStar();}
           gimme3Stars(); // sets the stars and moves to 3
       }
   }


   // this adds the clicked card to the array, only allowing 2 cards to be stored at once
   function showCard() {
       this.className += ' show open';
       // 
       openCard.push(this);
       const len = openCard.length;
       if (len === 2) {
           compareCards();
       }
   };


   function removeStar() { 
       allStars.children[0] && allStars.children[0].remove();
       moves.innerText = movesCount;
   }

   function gimme3Stars() {
       for ( i = 0; i < 3; i++) {
           let li = document.createElement("li");
           li.setAttribute("class", "fa fa-star");
           allStars.appendChild(li);
           moves.innerText = movesCount;
       }
   }

   // this adds the event listener to all cards 
   for (i = 0; i < allCards.length; i++) {
       card = allCards[i];
       card.addEventListener('click', showCard);
       card.addEventListener("click", youWin);
       card.addEventListener("click", youLost);
   }

   function rightCard() {    
       openCard[1].classList.add('match');
       openCard[0].classList.add('match');
       if (openCard > 2) {
           openCard = [];
       }

   }

   function wrongCard() {
    movesCount += 1;

       for (let n of openCard) {
           n.classList.add('wrong');
       }
   };

   function hideCards() {
       for (let n of openCard) {
           n.classList.remove('open', 'show', 'wrong');
       }
   }


   function compareCards() {
       if (openCard[0].innerHTML == openCard[1].innerHTML) {
           rightCard();
           openCard = [];
       } else {
           wrongCard();
           setTimeout(function() {
               hideCards();
               openCard = [];
               removeStar();
           }, 1000);
       };
   }

   function hideAndShow(){
       for (i = 0; i < allCards.length; i++) {
           allCards[i].classList.add('show', 'open');
       }
       setTimeout(function() {
           for (i = 0; i < allCards.length; i++) {
               allCards[i].classList.remove('show', 'open');
           }
       }, 1000);
   }


   /* Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

   // Shuffle function from http://stackoverflow.com/a/2450976
   function shuffle(array) {
       var currentIndex = array.length,
           temporaryValue, randomIndex;

       while (currentIndex !== 0) {
           randomIndex = Math.floor(Math.random() * currentIndex);
           currentIndex -= 1;
           temporaryValue = array[currentIndex];
           array[currentIndex] = array[randomIndex];
           array[randomIndex] = temporaryValue;
       }

       return array;
   }

   function shuffleThis() {
       for (j = 0; j < cards.length; j++) {
           cards[j].classList.remove("open", "show", "match"); // * * * I added "match" too. * * *
       };

       allCards = shuffle(allCards);
       // remove all exisiting classes from each card
       for (i = 0; i < allCards.length; i++) {
           deck.innerHTML = "";
           for (const ca of allCards) {
               deck.appendChild(ca);
           }
       }

   }



   /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   
   notes:

   // cards[i].classList.toggle("show");  // this toggles
   
   */
