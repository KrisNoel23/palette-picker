import { getPalettes, initializePalettesIfEmpty, addPalette } from "./local-storage.js";
import { renderPalette } from "./dom-helpers";

const handleFormSubmit = (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Get form values
  const title = document.querySelector("#title").value;
  const colorOne = document.querySelector("#color1").value;
  const colorTwo = document.querySelector("#color2").value;
  const colorThree = document.querySelector("#color3").value;
  const temperature = document.querySelector("input[name='temperature']:checked").value;

  if (!title || !colorOne || !colorTwo || !colorThree || !temperature) {
    alert("Please fill in all fields correctly.");
    return;
  }

  // Create new palette object
  const newPalette = { uuid: crypto.randomUUID(), title, colors: [colorOne, colorTwo, colorThree], temperature };

  // Save palette to local storage
  addPalette(newPalette);

  // Render the new palette
  renderPalette(newPalette.uuid, newPalette.title, newPalette.colors, newPalette.temperature);

  // Clear form fields
  document.querySelector("#palette-form").reset();
};

// Main function that handles loading and form submission
const main = () => {
  // Initialize palettes if local storage is empty
  initializePalettesIfEmpty();
  
  // Render stored palettes from local storage
  const palettes = getPalettes();

  for (const paletteId in palettes) {
    const { uuid, title, colors, temperature } = palettes[paletteId];
    renderPalette(uuid, title, colors, temperature); // Ensures palettes are rendered on load
  }

  // Handle form submission
  document.querySelector("#palette-form").addEventListener("submit", handleFormSubmit);
};

document.addEventListener("DOMContentLoaded", main);
