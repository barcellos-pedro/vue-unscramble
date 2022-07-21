<script>
import { wordsList } from './assets/words.json';
import { Game } from './game';

const game = new Game(wordsList);

export default {
  data() {
    return {
      game,
      answer: '',
      error: false,
      errorMessage: 'Wrong answer. Try again!'
    }
  },
  methods: {
    submit() {
      if (!this.game.submit(this.answer)) {
        this.error = true;
        return;
      }

      this.answer = ''
      this.error = false;

      if (!this.game.nextWord()) {
        this.gameOver()
      }
    },
    skip() {
      console.log(this.game)
      this.game.skip() ? this.game.getNextWord() : this.gameOver();
    },
    gameOver() {
      alert(`Congratulations!\n\nYour score: ${this.game.score}`);
      this.game.reset();
      this.error = false;
    },
    quit() {
      this.gameOver();
    }
  },
}
</script>

<template>
  <main>
    <header>
      <p>Words: {{ game.wordCount }} of {{ game.maxWords }}</p>
      <p>Score: {{ game.score }}</p>
    </header>

    <h1>
      <label for="answer">
        {{ game.currentScrambledWord }}
      </label>
    </h1>

    <form @submit.prevent="submit">
      <input type="text" id="answer" v-model="answer">
    </form>
    <p v-if="error">{{ errorMessage }}</p>

    <footer class="actions">
      <button type="button" @click="skip">Skip</button>
      <button type="button" @click="submit">Submit</button>
      <button type="button" @click="quit">Quit</button>
    </footer>
  </main>
</template>

<style>
@import './assets/base.css';

main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

header,
footer {
  display: flex;
  margin: 2em 0;
}

header,
footer {
  gap: 0 2em;
}

input {
  margin-top: 1em;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}

button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 2px solid transparent;
}

button:hover {
  cursor: pointer;
}

button:active {
  border: 2px solid black;
}
</style>
