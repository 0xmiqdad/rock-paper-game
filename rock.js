document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const resultDiv = document.querySelector('.result');
    const userChoiceDiv = document.getElementById('user-choice');
    const computerChoiceDiv = document.getElementById('computer-choice');
    const outcomeDiv = document.getElementById('outcome');
    const playAgainButton = document.getElementById('play-again');
    const scoreValue = document.getElementById('score-value');

    let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
    scoreValue.textContent = score;

    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const userChoice = choice.getAttribute('data-choice');
            const computerChoice = getComputerChoice();
            const result = determineWinner(userChoice, computerChoice);

            userChoiceDiv.textContent = getEmoji(userChoice);
            computerChoiceDiv.textContent = getEmoji(computerChoice);
            outcomeDiv.textContent = result;

            if (result === 'YOU WIN') {
                score++;
            } else if (result === 'YOU LOSE') {
                score--;
            }

            scoreValue.textContent = score;
            localStorage.setItem('score', score);

            resultDiv.classList.remove('hidden');
        });
    });

    playAgainButton.addEventListener('click', () => {
        resultDiv.classList.add('hidden');
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'DRAW';
        }

        const winConditions = {
            rock: ['scissors', 'lizard'],
            paper: ['rock', 'spock'],
            scissors: ['paper', 'lizard'],
            lizard: ['spock', 'paper'],
            spock: ['scissors', 'rock']
        };

        if (winConditions[userChoice].includes(computerChoice)) {
            return 'YOU WIN';
        } else {
            return 'YOU LOSE';
        }
    }

    function getEmoji(choice) {
        const emojis = {
            rock: '✊',
            paper: '✋',
            scissors: '✌️',
            lizard: '🦎',
            spock: '🖖'
        };
        return emojis[choice];
    }
});