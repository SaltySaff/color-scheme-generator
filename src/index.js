/* eslint-disable no-param-reassign */

const generateColorContainers = (count) => {
  const containers = []
  const colorsContainer = document.getElementById("colors-container")
  let newDiv;

  for (let i = 0; i < count; i += 1) {
    newDiv = document.createElement('div');
    newDiv.className = "color-container"
    newDiv.id = `color${i + 1}`
    containers.push(newDiv)
    colorsContainer.appendChild(newDiv)
  }
  console.log(containers)
  return containers
};

const getRandomHexColor = () => {
    const hexChars = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i += 1) {
        const randomIndex = Math.floor(Math.random() * 16)
        color += hexChars[randomIndex]
    }
    return color
}

const colorContainers = generateColorContainers(5);

const renderColors = (colorsArray) => {
  colorContainers.forEach((colorEl, index) => {
    colorEl.style.backgroundColor = colorsArray[index];
  });
};

const getColorsArray = (scheme) => {
  const colors = [];
  scheme.colors.forEach((color) => {
    colors.push(color.hex.value);
  });
  return colors;
};

const fetchScheme = (color) => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=analogic&count=5`
  )
    .then((res) => res.json())
    .then((scheme) => {
      const colorsArray = getColorsArray(scheme);
      renderColors(colorsArray);
    });
};

const getSchemeBtn = document.getElementById("get-scheme-btn");
const colorPicker = document.getElementById("color-picker")
fetchScheme(getRandomHexColor().substring(1))

getSchemeBtn.addEventListener("click", (e) => {
  e.preventDefault()
  fetchScheme(colorPicker.value.substring(1));
});
