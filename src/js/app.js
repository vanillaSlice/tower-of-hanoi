import 'papercss/dist/paper.css';
import '../css/app.css';

const INITIAL_DISKS = 4;
const MIN_DISKS = 1;
const MAX_DISKS = 10;
const SOLVE_TIMEOUT = 200;

class App {
  constructor() {
    this.initState();
    this.initElements();
    this.addListeners();
  }

  initState() {
    this.state = {
      disks: INITIAL_DISKS,
      moves: 0,
      towers: [this.range(INITIAL_DISKS), [], []],
      isBeingSolved: false,
      timeoutId: null,
      selectedDisk: null,
      selectedTower: null,
    };
  }

  range(n) {
    return [...Array(n).keys()];
  }

  initElements() {
    this.getElements();
    this.resetElements();
  }

  getElements() {
    this.disksLabel = document.querySelector('.js-disks-label');
    this.increaseDisksBtn = document.querySelector('.js-increase-disks-btn');
    this.decreaseDisksBtn = document.querySelector('.js-decrease-disks-btn');
    this.currentMovesLabel = document.querySelector('.js-current-moves-label');
    this.restartBtn = document.querySelector('.js-restart-btn');
    this.solveBtn = document.querySelector('.js-solve-btn');
    this.winMessage = document.querySelector('.js-win-message');
    this.disks = [...document.querySelectorAll('.js-disk')];
    this.towers = [...document.querySelectorAll('.js-tower')];
    this.minMovesLabel = document.querySelector('.js-min-moves-label');
  }

  resetElements() {
    this.disksLabel.textContent = this.state.disks;
    this.currentMovesLabel.textContent = this.state.moves;
    this.winMessage.classList.add('hidden');

    // reset disk element classes and position back on first tower
    this.disks.forEach((disk, i) => {
      disk.remove();
      disk.classList.remove('selected');
      disk.classList.toggle('hidden', i >= this.state.disks);
      this.towers[0].appendChild(disk);
    });

    this.minMovesLabel.textContent = this.calculateMinimumMoves(this.state.disks);
  }

  calculateMinimumMoves(disks) {
    return (2 ** disks) - 1;
  }

  addListeners() {
    this.increaseDisksBtn.addEventListener('click', () => this.handleDisksBtnClick(this.state.disks + 1));
    this.decreaseDisksBtn.addEventListener('click', () => this.handleDisksBtnClick(this.state.disks - 1));
    this.restartBtn.addEventListener('click', () => this.handleRestartBtnClick());
    this.solveBtn.addEventListener('click', () => this.handleSolveBtnClick());
    this.towers.forEach((tower, i) => tower.addEventListener('click', () => this.handleTowerClick(i)));
  }

  handleDisksBtnClick(disks) {
    if (disks < MIN_DISKS || disks > MAX_DISKS) {
      return;
    }

    this.state.disks = disks;
    this.resetState();
    this.resetElements();
  }

  resetState() {
    this.state.moves = 0;
    this.state.towers = [this.range(this.state.disks), [], []];
    this.state.isBeingSolved = false;
    clearTimeout(this.state.timeoutId);
    this.state.timeoutId = null;
    this.state.selectedDisk = null;
    this.state.selectedTower = null;
  }

  handleRestartBtnClick() {
    this.resetState();
    this.resetElements();
  }

  handleSolveBtnClick() {
    this.resetState();
    this.resetElements();

    const isEven = this.state.disks % 2 === 0;
    let sequence = 0;

    const solve = () => {
      if (isEven) {
        if (sequence === 0) {
          this.moveDisk(0, 1);
          sequence += 1;
        } else if (sequence === 1) {
          this.moveDisk(0, 2);
          sequence += 1;
        } else {
          this.moveDisk(1, 2);
          sequence = 0;
        }
      } else if (sequence === 0) {
        this.moveDisk(0, 2);
        sequence += 1;
      } else if (sequence === 1) {
        this.moveDisk(0, 1);
        sequence += 1;
      } else {
        this.moveDisk(1, 2);
        sequence = 0;
      }

      this.state.moves += 1;
      this.currentMovesLabel.textContent = this.state.moves;

      if (!this.isSolved()) {
        this.state.timeoutId = setTimeout(solve, SOLVE_TIMEOUT);
      } else {
        this.state.isBeingSolved = false;
      }
    };

    this.state.isBeingSolved = true;
    this.state.timeoutId = setTimeout(solve, SOLVE_TIMEOUT);
  }

  moveDisk(d1, d2) {
    const a = this.state.towers[d1][0] === undefined ? Infinity : this.state.towers[d1][0];
    const c = this.state.towers[d2][0] === undefined ? Infinity : this.state.towers[d2][0];
    if (a < c) {
      const disk = this.disks[a];
      this.state.towers[d1].shift();
      this.towers[d2].prepend(disk);
      this.state.towers[d2].unshift(a);
    } else {
      const disk = this.disks[c];
      this.state.towers[d2].shift();
      this.towers[d1].prepend(disk);
      this.state.towers[d1].unshift(c);
    }
  }

  isSolved() {
    const expected = this.range(this.state.disks);
    const actual = this.state.towers[2];
    for (let i = 0; i < expected.length; i += 1) {
      if (expected[i] !== actual[i]) {
        return false;
      }
    }
    return true;
  }

  handleTowerClick(tower) {
    if (this.state.isBeingSolved) {
      return;
    }

    if (this.state.selectedDisk !== null) {
      if (this.state.towers[tower][0] < this.state.selectedDisk) {
        return;
      }

      if (this.state.selectedTower !== tower) {
        this.towers[tower].prepend(this.disks[this.state.selectedDisk]);
        this.state.towers[this.state.selectedTower].shift();
        this.state.towers[tower].unshift(this.state.selectedDisk);
        this.state.moves += 1;
      }
      this.disks[this.state.selectedDisk].classList.remove('selected');
      this.state.selectedDisk = null;
      this.state.selectedTower = null;
      this.currentMovesLabel.textContent = this.state.moves;
      this.winMessage.classList.toggle('hidden', !this.isSolved());
    } else if (this.state.towers[tower][0] !== undefined) {
      this.state.selectedTower = tower;
      [this.state.selectedDisk] = this.state.towers[tower];
      this.disks[this.state.selectedDisk].classList.add('selected');
    }
  }

  show() {
    document.querySelector('.js-game').classList.remove('hidden');
  }
}

new App().show();
