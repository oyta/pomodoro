export class Slider {
  constructor({ elId, unit, title }) {
    this.key = `pomo-slider-${elId}`;
    this.el = document.getElementById(elId);
    this.unit = unit;
    this.title = title;
    this.popoverEl = document.getElementById(`${elId}Popover`);
    this.loadConfig();
    this.setupListeners();
    this.popoverEl.innerHTML = `${this.title}<br />${this.el.value} ${this.unit}`;
  }

  setupListeners() {
    this.el.addEventListener("pointerover", (e) =>
      this.popoverEl.showPopover(),
    );
    this.el.addEventListener("input", this.valueChangeHandler.bind(this));
    this.el.addEventListener(
      "pointerout",
      this.resetShowLabelTimeout.bind(this),
    );
  }

  valueChangeHandler(event) {
    this.popoverEl.innerHTML = `${this.title}<br />${this.el.value} ${this.unit}`;
    this.popoverEl.showPopover();
    this.resetShowLabelTimeout();
    localStorage.setItem(this.key, this.getStorageString());
  }

  getStorageString() {
    return JSON.stringify({
      id: this.el.id,
      value: this.el.value,
    });
  }

  resetShowLabelTimeout() {
    clearInterval(this.timeout);
    this.timeout = setTimeout(() => this.popoverEl.hidePopover(), 4000);
  }

  loadConfig() {
    const storedJSON = localStorage.getItem(this.key);
    if (storedJSON === null) {
      return;
    }

    const storedObject = JSON.parse(storedJSON);
    if (
      storedObject.hasOwnProperty("id") &&
      storedObject.hasOwnProperty("value")
    ) {
      this.el.value = Number(storedObject.value);
    }
  }
}
