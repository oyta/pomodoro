import { LocalStorageConstants } from "./localStorageKeys.js";
import { LocalStorageHandler } from "./persistentStorage.js";
import { Pomodoro } from "./pomodoro.js";
import { NotificationPermissionHandler } from "./notificationPermissionHandler.js";
import { Observer } from "./observer.js";
export class Program extends Observer {
  async run() {
    this.configureNotificationPermission();
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

  configureNotificationPermission() {
    console.log("Setting up notification permission handler");
    this.notificationPermissionHandler = new NotificationPermissionHandler();
    this.notificationPermissionHandler.addObserver(this);
  }

  toggleSettingsMenu(event) {
    event.target.classList.toggle("show");
  }

  notify(data) {
    super.notify(data);
    if (data.name === "notificationPermission.stateChange") {
      console.log(
        `State has changed to ${this.notificationPermissionHandler.state}.`,
      );
      const button = document.getElementById("toggleNotificationsButton");
      if (this.notificationPermissionHandler.isGranted()) {
        button.disabled = true;
        button.innerText = "Notifications are on";
      } else {
        button.disable = false;
        button.innerText = "Turn on notifications";
      }
    }
  }
}

new Program().run();
