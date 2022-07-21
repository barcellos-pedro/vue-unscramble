const MAX_WORDS = 10;
const SCORE_INCREMENT = 20;

class Game {
  wordsList = [];
  wordsPlayed = [];
  currentWord = "";
  currentScrambledWord = "";
  wordCount = 0;
  score = 0;

  constructor(wordsList) {
    this.maxWords = MAX_WORDS;
    this.wordsList = wordsList;
    this.getNextWord();
  }

  reset() {
    this.wordCount = 0;
    this.score = 0;
    this.wordsPlayed = [];
    this.getNextWord();
  }

  getRandomWord() {
    return this.wordsList[Math.floor(Math.random() * this.wordsList.length)];
  }

  nextWord() {
    if (this.wordCount <= MAX_WORDS) {
      this.getNextWord();
      return true;
    }
    return false;
  }

  getNextWord() {
    let randomWord = this.getRandomWord();

    if (this.wordsPlayed.includes(randomWord)) {
      randomWord = this.getRandomWord();
    }

    this.currentWord = randomWord;
    this.wordsPlayed.push(this.currentWord);
    this.getScrambledWord();
  }

  getScrambledWord() {
    let wordLetters = [...this.currentWord];

    // shuffle the word characters (letters)
    for (let i = wordLetters.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = wordLetters[i];
      wordLetters[i] = wordLetters[j];
      wordLetters[j] = temp;
    }

    this.currentScrambledWord = wordLetters.join("");

    // shuffle again to make sure the word doesn't display normal
    if (this.currentScrambledWord == this.currentWord) {
      this.getScrambledWord();
    }
  }

  skip() {
    this.wordCount += 1;
    return this.nextWord() ? true : false;
  }

  submit(answer) {
    if (answer.toLowerCase() !== this.currentWord.toLowerCase()) {
      return false;
    }
    this.score += SCORE_INCREMENT;
    this.wordCount += 1;
    return true;
  }
}

export { Game, MAX_WORDS };
