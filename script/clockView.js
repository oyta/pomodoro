import { TimerState } from "./timer.js";

export class ClockView {
  constructor(elId, timer) {
    this.el = document.getElementById(elId);
    this.timer = timer;
    this.el.addEventListener("click", this.clickHandler.bind(this));
    this.interval = setInterval(this.draw.bind(this), 1000);
  }

  draw() {
    if (this.timer.state === TimerState.PAUSE) {
      this.el.classList.add("pause");
      this.el.classList.remove("work", "halt");
    } else if (this.timer.state === TimerState.WORK) {
      this.el.classList.add("work");
      this.el.classList.remove("pause", "halt");
    } else if (this.timer.state === TimerState.SERVICE_HALT) {
      this.el.classList.add("halt");
      this.el.classList.remove("work", "pause");
    }

    this.el.innerHTML = this.timer.timeLeft();
    this.el.innerHTML +=
      this.timer.state === TimerState.SERVICE_HALT
        ? `<div class="haultToggle">&#9654;</div>`
        : `<div class="haultToggle">&#9724;</div>`;
  }

  clickHandler(event) {
    if (event.target.closest(".haultToggle") === null) {
      this.timer.changeState();
    } else {
      this.timer.state === TimerState.SERVICE_HALT
        ? this.timer.run()
        : this.timer.halt();
    }
  }
}
