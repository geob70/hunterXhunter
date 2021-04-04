<template>
  <div class="game-background">
    <div class="board-div">
      <div class="board-desc">
        <span>Grid: <strong>{{ dimension }} x {{ dimension }}</strong></span>
        <life :percentage="health" />
        <span>Time spent: <strong>{{ timeSpent }} secs</strong></span>
      </div>
      <div class="game-board game-con" :style="{ gridTemplateRows: getGrid }">
        <div
          class="game-board"
          :style="{ gridTemplateColumns: getGrid }"
          v-for="(grid, index) in getBoard"
          :key="index"
        >
          <div class="cell" v-for="(cell, i) in grid" :key="i">
            <img draggable="false"
              v-if="cell.hasFood()"
              width="28px"
              height="28px"
              src="~/assets/food.png"
              alt=""
            />
            <img draggable="false"
              v-if="cell.holdHunter()"
              width="33px"
              height="33px"
              src="~/assets/character.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="board-desc">
        <span>Maximum moves: <strong>{{ max_move }}</strong></span>
        <span>Total moves: <strong>{{ hunterMoves }}</strong></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Cell } from "./cell";
import Life from "~/components/life/life.vue";

export default Vue.extend({
  mounted() {
    this.board = new Array<Array<Cell>>(); // creates a 2D array of class type Cell
    let grid = this.$store.state.grid; // fetch the user grid size
    this.food = grid; // set the number of foods
    this.max_move = Math.floor((grid * grid) / 2); // set maximum number of moves


    // create cells in the 2D array - this.board
    for (let i = 0; i < grid; i++) {
      let row = new Array<Cell>();
      for (let j = 0; j < grid; j++) {
        let cell = new Cell(false, false, true); // instance of an empty cell class
        row.push(cell);
      }
      this.board.push(row);
    }

    // create a dummy array that converts the board 2D array to a 1D array
    // which would help us place food randomly on the board
    let array = new Array(grid * grid);
    for (let i = 0; i < array.length; i++) {
      array[i] = i;
    }

    this.generateFood(array, grid, grid); // method that places food randomly on the board

    window.addEventListener("keydown", this.handleKeyPress); // create an event listener that listens to any key press

    this.count = setInterval(this.counter, 1000); // create out time counter that runs every 1 second
  },
  beforeDestroy() {
    clearInterval(this.count); // kill our counter before leaving page
    window.removeEventListener("keydown", this.handleKeyPress); // kill our event listener before leaving page
  },
  data() {
    return {
      board: [] as Cell[][], // 2d board
      hunterPosition: new Array<number>(2),// hunter current position
      food: 0,
      moves: 0, // number of hunter's moves
      max_move: 0,
      seconds: 0,
      minutes: 0,
      count: null as any,
      health: 100 // health bar
    };
  },
  computed: {
    dimension: function(): number {
      return this.$store.state.grid;
    },
    timeSpent: function(): string {
      return `${this.minutes < 10 ? "0" + this.minutes : this.minutes}:${
        this.seconds < 10 ? "0" + this.seconds : this.seconds
      }`;
    },
    getBoard: function(): Array<Array<Cell>> {
      return this.board;
    },
    hunterMoves: function(): number {
      return this.moves;
    },
    getGrid: function(): string { // returns the grid column template depending on the grid size
      let grid = this.$store.state.grid;
      let _grid = "";
      for (let i = 0; i < grid; i++) {
        _grid += "auto ";
      }
      _grid.substring(0, _grid.length - 1);
      return _grid;
    }
  },
  methods: {
    generateFood: function(
      arr: Array<number>,
      food: number,
      grid: number
    ): void { // a recursive function that places food at random positions
      if (food == 0) {
        this.placeHunter(arr, grid);
        return;
      }
      let min = 0;
      let max = arr.length;

      let random = Math.floor(Math.random() * max); // random number from 0 to size of array (1D array)


      // converts the 1D array to 2D
      // 
      this.board[Math.trunc(arr[random] / grid)][arr[random] % grid].setFood();
      this.board[Math.trunc(arr[random] / grid)][arr[random] % grid].setEmpty(
        false
      );

      let temp = new Array(...arr);

      let top = arr.splice(min, random);
      let bottom = temp.splice(random + 1, max);

      let newArr = [...top, ...bottom];
      food--;

      this.generateFood(newArr, food, grid);
    },
    placeHunter: function(arr: Array<number>, grid: number): void {
      let min = 0;
      let max = arr.length;

      let random = Math.floor(Math.random() * max);

      this.hunterPosition[0] = Math.trunc(arr[random] / grid);
      this.hunterPosition[1] = arr[random] % grid;

      this.board[Math.trunc(arr[random] / grid)][
        arr[random] % grid
      ].setHunter();
      this.board[Math.trunc(arr[random] / grid)][arr[random] % grid].setEmpty(
        false
      );
    },
    handleKeyPress: function(event: any): void {
      if (event.key === "ArrowDown") this.moveDown();
      if (event.key === "ArrowUp") this.moveUp();
      if (event.key === "ArrowRight") this.moveRight();
      if (event.key === "ArrowLeft") this.moveLeft();

      this.gameOverCondition();
    },
    moveDown: function(): void {
      if (this.hunterPosition[0] == this.board.length - 1) return;

      // set current hunter cell as empty
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].removeHunter();
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setEmpty(true);

      this.hunterPosition[0]++;

      if (
        this.board[this.hunterPosition[0]][this.hunterPosition[1]].hasFood()
      ) {
        this.board[this.hunterPosition[0]][this.hunterPosition[1]].removeFood();
        this.food--;
      }
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setHunter();
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setEmpty(
        false
      );
      this.moves++;
      this.getHealthLeft();
    },
    moveUp: function(): void {
      if (this.hunterPosition[0] == 0) return;

      // set current hunter cell as empty
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].removeHunter();
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setEmpty(true);

      this.hunterPosition[0]--;

      if (
        this.board[this.hunterPosition[0]][this.hunterPosition[1]].hasFood()
      ) {
        this.board[this.hunterPosition[0]][this.hunterPosition[1]].removeFood();
        this.food--;
      }
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setHunter();
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setEmpty(
        false
      );
      this.moves++;
      this.getHealthLeft();
    },
    moveRight: function(): void {
      if (this.hunterPosition[1] == this.board.length - 1) return;

      // set current hunter cell as empty
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].removeHunter();
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setEmpty(true);

      this.hunterPosition[1]++;

      if (
        this.board[this.hunterPosition[0]][this.hunterPosition[1]].hasFood()
      ) {
        this.board[this.hunterPosition[0]][this.hunterPosition[1]].removeFood();
        this.food--;
      }
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setHunter();
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setEmpty(
        false
      );
      this.moves++;
      this.getHealthLeft();
    },
    moveLeft: function(): void {
      if (this.hunterPosition[1] == 0) return;

      // set current hunter cell as empty
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].removeHunter();
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setEmpty(true);

      this.hunterPosition[1]--;

      if (
        this.board[this.hunterPosition[0]][this.hunterPosition[1]].hasFood()
      ) {
        this.board[this.hunterPosition[0]][this.hunterPosition[1]].removeFood();
        this.food--;
      }
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setHunter();
      this.board[this.hunterPosition[0]][this.hunterPosition[1]].setEmpty(
        false
      );
      this.moves++;
      this.getHealthLeft();
    },
    gameOverCondition: function(): void {
      if (this.food == 0) {
        this.$store.commit("SET_TIME", this.minutes * 60 + this.seconds);
        this.$router.push("/bravo/bravo");
        return;
      } else if (this.max_move === this.moves) {
        this.$store.commit("SET_FOOD", this.$store.state.grid - this.food);
        this.$store.commit("SET_TIME", this.minutes * 60 + this.seconds);
        this.$router.push("/game-over/gameOver");
        return;
      }
    },
    counter: function(): void {
      this.seconds++;

      if (this.seconds == 60) {
        this.minutes++;
        this.seconds = 0;
      }
    },
    getHealthLeft: function(): void {
      this.health = ((this.max_move - this.moves) * 100) / this.max_move;
    }
  },
  components: {
    Life
  }
});
</script>
<style lang="scss" scoped>
@import "./game.scss";
</style>
