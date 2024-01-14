import { Window } from '@tauri-apps/api/window'
import { invoke } from "@tauri-apps/api/core";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});

const mainWindow = Window.getByLabel('main')!;
document
  .getElementById('titlebar-minimize')!
  .addEventListener('click', () => mainWindow.minimize())
document
  .getElementById('titlebar-maximize')!
  .addEventListener('click', () => mainWindow.toggleMaximize())
document
  .getElementById('titlebar-close')!
  .addEventListener('click', () => mainWindow.close())