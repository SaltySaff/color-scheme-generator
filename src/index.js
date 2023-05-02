/* eslint-disable no-param-reassign */
const renderColors = (colorsArray) => {
  const colorOne = document.getElementById("color-one");
  const colorTwo = document.getElementById("color-two");
  const colorThree = document.getElementById("color-three");
  const colorsElArray = [colorOne, colorTwo, colorThree];

  colorsElArray.forEach((colorEl, index) => {
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
    `https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=analogic&count=3`
  )
    .then((res) => res.json())
    .then((scheme) => {
      const colorsArray = getColorsArray(scheme);
      renderColors(colorsArray);
    });
};

const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("input", (e) => {
  fetchScheme(e.target.value.substring(1));
});
