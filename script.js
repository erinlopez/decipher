let words = [];
    let selectedWord = "";
    let scrambledWord = "";
    let guessCount = 0; // Initialize guess count
    let streak = 0;

    // Fetch words from the text file
    async function fetchWords() {
        const response = await fetch('common-7-letter-words.txt');
        const text = await response.text();
        words = text.split('\n').map(word => word.trim()).filter(word => word);
        setupGame();
    }

    function scrambleWord(word) {
        return word.toLowerCase().split('').sort(() => Math.random() - 0.5).join('');
    }

    function setupGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        scrambledWord = scrambleWord(selectedWord);
        document.getElementById('scrambledWord').innerText = scrambledWord;
        document.getElementById('message').innerText = '';
        document.getElementById('correctCount').innerText = '';
        guessCount = 0; // Reset guess count

        document.getElementById('guessCount').innerText = 'Guesses: ' + guessCount; // Reset guess count display
        document.getElementById('userInput').value = '';
        document.getElementById('streak').innerText = 'Streak: ' + streak;
    }

    function checkGuess() {
        const userGuess = document.getElementById('userInput').value.trim().toLowerCase();
        const messageElement = document.getElementById('message');
        const correctCountElement = document.getElementById('correctCount');
        const guessCountElement = document.getElementById('guessCount');
        const streakCountElement = document.getElementById('streak');
        guessCount++; // Increment guess count

        if (userGuess === selectedWord.toLowerCase()) {
            messageElement.innerText = 'Correct! The word was: ' + selectedWord;
            guessCountElement.innerText = 'Guesses: ' + guessCount;
            streak++;
            streakCountElement.innerText = 'Streak: ' + streak;
            setTimeout(setupGame, 2500); // Restart after 2 seconds
        } else {
            // Count letters in the correct position
            let correctCount = 0;
            streak = 0;
            for (let i = 0; i < Math.min(userGuess.length, selectedWord.length); i++) {
                if (userGuess[i] === selectedWord[i]) {
                    correctCount++;
                }
            }
            messageElement.innerText = 'Try again!';
            correctCountElement.innerText = 'Correct Letters: ' + correctCount;
            guessCountElement.innerText = 'Guesses: ' + guessCount; 
            streakCountElement.innerText = 'Streak: ' + streak;
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          checkGuess();
        }

      });
    // Initialize the game
    fetchWords().catch(err => {
        console.error('Error loading words:', err);
        document.getElementById('message').innerText = 'Failed to load words.';
    });