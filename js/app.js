    /*
    * Create a list that holds all of your cards
    */
    let cards = document.getElementsByClassName('card');
    let allCards = [...cards];
    let openCard = [];
    var allStars = document.querySelector(".stars");
    let matchedCard = document.getElementsByClassName("match");
    const moves = document.querySelector('.moves');
    const deck = document.querySelector(".deck");
    const restartBtn = document.querySelector('.restart');
    let gameStart = false;

    window.addEventListener("load", startingGame);
    restartBtn.addEventListener("click", startingGame);
    restartBtn.addEventListener("click", restartStars);




    // start and restarts game 
    function startingGame() {
        openCard = [];
        shuffleThis(); //shufflecards
        hideAndShow(); // hides and shows cards for a second
        gameStart = true;  
        timeOfFirstClick = new Date().getTime(); // registers the timer
    }

    deck.addEventListener("click", handler);

    function handler(e) { //removes the listener for the click in the deck after the first click so it won't restart the timer
        e.target.removeEventListener(e.type, arguments.callee);
    let refreshIntervalId = setInterval(function() {
        if (gameStart == true) {
            var currentTime = new Date().getTime();
            var elapsed = currentTime - timeOfFirstClick;
            var minutes = Math.floor(elapsed / 60000); // this claculates the number of minutes passed 
            var remaining = elapsed - (minutes * 60000);
            var seconds = Math.floor(remaining / 1000);
            timer.innerHTML =  minutes + " mins " + seconds + " secs";
        }
    }, 1000);
    }


function restartStars(){
    for (i = 0; i < 3; i++) {removeStar()};
    gimme3Stars();
}

    function youWin(){
        // clearInterval(refreshIntervalId);   
        const finalTime = timer.innerHTML;
        const finalScore = moves.innerText;
        if (matchedCard.length == 16) {
            setTimeout(function() {alert('You win! Your start rating was ' + finalScore + ' stars in '  + finalTime);
            startingGame();
            for (i = 0; i < 3; i++) {removeStar();} // sets the stars and moves to 0
            gimme3Stars(); // sets the stars and moves to 3
        }, 500);    
    }
    }


    function youLost() {
            if (moves.innerText == 0) {
            alert('You lost! Try again');
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
        var len = openCard.length;
        if (len === 2) {
            compareCards();
        }
    };


    function removeStar() { 
        allStars.children[0] && allStars.children[0].remove();
        moves.innerText = allStars.children.length;
    }

    function gimme3Stars() {
        for (var i = 0; i < 3; i++) {
            var li = document.createElement("li");
            li.setAttribute("class", "fa fa-star");
            allStars.appendChild(li);
            moves.innerText = allStars.children.length;
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
        for (var j = 0; j < cards.length; j++) {
            cards[j].classList.remove("open", "show", "match"); // * * * I added "match" too. * * *
        };

        allCards = shuffle(allCards);
        // remove all exisiting classes from each card
        for (var i = 0; i < allCards.length; i++) {
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
