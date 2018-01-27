import 'papercss/dist/paper.css';
import '../css/app.css';

const MIN_DISKS = 1;
const MAX_DISKS = 10;

class App {
  constructor() {
    this.initState();
    this.initElements();
    this.addListeners();
  }

  initState() {
    this.state = {
      disks: 3,
      moves: 0,
      towers: [],
      isBeingSolved: false,
    };
  }

  initElements() {
    this.disksLabel = document.querySelector('.js-disks-label');
    this.disksLabel.textContent = this.state.disks;
    this.increaseDisksBtn = document.querySelector('.js-increase-disks-btn');
    this.decreaseDisksBtn = document.querySelector('.js-decrease-disks-btn');
    this.currentMovesLabel = document.querySelector('.js-current-moves-label');
    this.currentMovesLabel.textContent = 0;
    this.minMovesLabel = document.querySelector('.js-min-moves-label');
    this.minMovesLabel.textContent = 7;
  }

  addListeners() {
    this.increaseDisksBtn.addEventListener('click', () => this.updateNumberOfDisks(this.state.disks + 1));
    this.decreaseDisksBtn.addEventListener('click', () => this.updateNumberOfDisks(this.state.disks - 1));
  }

  updateNumberOfDisks(disks) {
    if (disks < MIN_DISKS || disks > MAX_DISKS) {
      return;
    }

    this.state.disks = disks;
    this.disksLabel.textContent = disks;
  }
}

new App();
