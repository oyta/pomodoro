import { Slider } from "./slider.js";
import { ClockView } from "./clockView.js";
import { Timer } from "./timer.js";

const clock = new ClockView("output", new Timer());

new Slider({
  elId: "workLength",
  unit: "minutt",
  title: "Arbeidsintervall",
});

new Slider({
  elId: "pauseLength",
  unit: "minutt",
  title: "Pauseintervall",
});

new Slider({
  elId: "extendedPauseLength",
  unit: "minutt",
  title: "Lang pause",
});

clock.timer.setDurationInputIds({
  pauseDurationId: "pauseLength",
  workDurationId: "workLength",
});
