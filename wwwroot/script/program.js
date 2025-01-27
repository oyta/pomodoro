import { LocalStorageConstants } from "./localStorageKeys.js";
import { LocalStorageHandler } from "./persistentStorage.js";
import { Pomodoro } from "./pomodoro.js";
export class Program {
  async run() {
    this.configureServiceWorker();
    this.configureEventListeners();
    this.storage = new LocalStorageHandler();
    new Pomodoro().run();
  }

  configureEventListeners() {
    const settingsPanel = document.querySelector(".toolbar");
    settingsPanel.addEventListener("click", this.toggleSettingsMenu);

    const button = document.getElementById("toggleNotificationsButton");
    button.addEventListener("click", async () => {
      const result = await window.Notification.requestPermission();
      if (result === "granted") {
        await registration.showNotification("🍅", {
          body: "Notification from Pomo is set up.",
        });
        this.storage.set(
          LocalStorageHandler.getKey(
            LocalStorageConstants.keyNotificationSubscriptionStatus,
          ),
          "granted",
        );
      } else if (result === "denied") {
        this.storage.set(
          LocalStorageHandler.getKey(
            LocalStorageConstants.keyNotificationSubscriptionStatus,
          ),
          "denied",
        );
      }
    });
  }

  async configureServiceWorker() {
    this.registration = await navigator.serviceWorker.register(
      "serviceworker.js",
      {
        scope: "./",
      },
    );
  }

  toggleSettingsMenu(event) {
    event.target.classList.toggle("show");
  }
}

new Program().run();
