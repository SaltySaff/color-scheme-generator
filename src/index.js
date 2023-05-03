/* eslint-disable no-param-reassign */

const generateColorContainers = (count) => {
  const containers = [];
  const colorsContainer = document.getElementById("colors-container");
  let newDiv;

  for (let i = 0; i < count; i += 1) {
    newDiv = document.createElement("div");
    newDiv.className = "color-container";
    newDiv.id = `color${i + 1}`;
    containers.push(newDiv);
    colorsContainer.appendChild(newDiv);
  }
  return containers;
};

const generateColorNameContainers = (count) => {
  const names = [];
  const colorsNameContainer = document.getElementById("colors-name-container");
  let newDivName;

  for (let i = 0; i < count; i += 1) {
    newDivName = document.createElement("div");
    newDivName.className = "color-name";
    newDivName.id = `color${i + 1}-name`;
    names.push(newDivName);
    colorsNameContainer.appendChild(newDivName);
  }
  return names;
};

const getRandomHexColor = () => {
  const hexChars = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i += 1) {
    const randomIndex = Math.floor(Math.random() * 16);
    color += hexChars[randomIndex];
  }
  return color;
};

const colorContainers = generateColorContainers(5);
const colorNameContainers = generateColorNameContainers(5);

const renderColors = (colorsArray) => {
  colorContainers.forEach((colorEl, index) => {
    colorEl.style.backgroundColor = colorsArray[index];
  });
};

const renderColorNames = (namesArray) => {
  colorNameContainers.forEach((colorEl, index) => {
    colorEl.textContent = namesArray[index]
  })
}

const getColorsArray = (scheme) => {
  const colors = [];
  scheme.colors.forEach((color) => {
    colors.push(color.hex.value);
  });
  return colors;
};

const getColorNamesArray = (scheme) => {
  const colorNames = []
  scheme.colors.forEach((color) => {
    colorNames.push(`${color.name.value}\n${color.hex.value}`);
  });
  return colorNames;

}

const fetchScheme = (color) => {
  const selectedMode = document.getElementById("mode-select").value;
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${selectedMode}&count=5`
  )
    .then((res) => res.json())
    .then((scheme) => {
      const colorsArray = getColorsArray(scheme);
      const namesArray = getColorNamesArray(scheme);
      renderColors(colorsArray);
      renderColorNames(namesArray)
    });
};

const getSchemeBtn = document.getElementById("get-scheme-btn");
const colorPicker = document.getElementById("color-picker");

fetchScheme(getRandomHexColor().substring(1));

getSchemeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchScheme(colorPicker.value.substring(1));
});
