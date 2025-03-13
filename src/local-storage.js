import startingPalettes  from "../palettes.json" 

/**
 * Save data to local storage
 */

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieve data from local storage
 */
const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err)
    return null;
  }
};

/**
 * Save palettes to local storage
 */
export const setPalettes = (newPalettes) => {
  setLocalStorageKey("palettes", newPalettes);
};

/**
 * Get saved palettes from local storage
 */
export const getPalettes = () => {
  const storedPalette = getLocalStorageKey("palettes");
  if (!storedPalette) {
    return {};
  }
  return storedPalette// Ensure it returns an empty array if no palettes exist
};

/**
 * Initialize palettes if local storage is empty and render them, If no palettes in local storage, use starting palettes
 */
export const initializePalettesIfEmpty = () => {
  let storedPalettes = getPalettes();
  if (!storedPalettes || Object.keys(storedPalettes).length === 0) {
    setPalettes(startingPalettes);
  }
};

/**
 * Add a new palette to local storage and render it
 */
export const addPalette = (newPalette) => {
  console.log(startingPalettes)
  const palettes = getPalettes();
  palettes[newPalette.uuid] = newPalette; // Add the new palette to the array
  setPalettes(palettes);
};

/**
 * Delete a palette by its ID and update local storage
 */
export const deletePaletteByID = (id) => {
  const palettes = getPalettes();
  delete palettes[id];
  setPalettes(palettes);

  const palette = document.getElementById(id);
  palette.remove();
};

