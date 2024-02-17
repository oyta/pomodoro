export const TimerState = {
  PAUSE: 0,
  WORK: 1,
  SERVICE_HALT: 2,
};

export class Timer {
  constructor(pauseDuration = 5, workDuration = 25, audioSignalPath = null) {
    this.pauseDuration = pauseDuration * 60 * 1000;
    this.workDuration = workDuration * 60 * 1000;
    this.state = TimerState.WORK;
    this.start = Date.now();
    this.interval = setInterval(this.update.bind(this), 1000);
    this.audioSignalPath = audioSignalPath;
  }

  setDurationInputIds({ pauseDurationId, workDurationId }) {
    this.setDurationInputs({
      pauseDurationInputElement: document.getElementById(pauseDurationId),
      workDurationInputElement: document.getElementById(workDurationId),
    });
  }
  setDurationInputs({ pauseDurationInputElement, workDurationInputElement }) {
    this.pauseDuration = Number(pauseDurationInputElement.value) * 60 * 1000;
    this.workDuration = Number(workDurationInputElement.value) * 60 * 1000;

    pauseDurationInputElement.addEventListener(
      "systemchange",
      (e) => (this.pauseDuration = Number(e.target.value) * 60 * 1000),
    );
    workDurationInputElement.addEventListener(
      "change",
      (e) => (this.workDuration = Number(e.target.value) * 60 * 1000),
    );
  }

  update() {
    if (this.state === TimerState.SERVICE_HALT) {
      return;
    }

    const diff = Date.now() - this.start;
    if (
      (this.state === TimerState.PAUSE && diff > this.pauseDuration) ||
      (this.state === TimerState.WORK && diff > this.workDuration)
    ) {
      this.changeState();
    }
  }

  timeSinceStart() {
    return this.timeSince(Date.now(), this.start);
  }

  timeLeft() {
    if (this.state === TimerState.SERVICE_HALT) {
      return "Timer stoppa";
    }

    return this.timeSince(
      this.start +
        (this.state === TimerState.PAUSE
          ? this.pauseDuration
          : this.workDuration),
      Date.now(),
    );
  }

  timeSince(now, then) {
    const diff = now - then;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor(
      ((diff % (1000 * 60 * 60)) % (1000 * 60)) / 1000,
    );
    let returnString =
      this.state === TimerState.PAUSE ? "Pause <br />" : "Fokus <br />";
    returnString += "<small>";
    returnString += hours > 0 ? hours + " hours " : "";
    returnString += minutes > 0 ? minutes + " minutes " : "";
    returnString += seconds + " seconds";
    returnString += "</small>";

    return returnString;
  }

  changeState() {
    this.start = Date.now();

    if (
      this.state === TimerState.PAUSE ||
      this.state === TimerState.SERVICE_HALT
    ) {
      this.state = TimerState.WORK;
    } else if (this.state === TimerState.WORK) {
      this.state = TimerState.PAUSE;
    }

    if (this.audioSignalPath !== null) {
      new Audio(this.audioSignalPath).play();
    }
  }

  halt() {
    this.state = TimerState.SERVICE_HALT;
  }

  run() {
    this.changeState();
  }
}
