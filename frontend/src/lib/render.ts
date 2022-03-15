import { isElectron } from "./utils"

declare const window: { electronAPI: any }

if (isElectron()) {
  document
    .getElementById("minimizeWindow")
    .addEventListener("click", function (e) {
      window.electronAPI.minimizeWindow()
    })

  document
    .getElementById("closeWindow")
    .addEventListener("click", function (e) {
      window.electronAPI.closeWindow()
      console.log("HERE")
    })
}
