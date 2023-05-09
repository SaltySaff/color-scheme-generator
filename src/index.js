const getContainersHtml = (count) => {
  let html = "";
  for (let i = 0; i < count; i += 1) {
    html += `
      <div class="color-container">
        <div class="color" id="color${i + 1}"></div>
        <div class="color-name" id="color${i + 1}-name"></div>
        <div class="color-name" id="color${i + 1}-hex"></div>
      </div>
    `
  }
  return html;
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

const render = (colors) => {
  const colorsContainer = document.getElementById("colors-container")
  colorsContainer.innerHTML = getContainersHtml(5)

  colors.forEach((color, index) => {
    document.getElementById(`color${index + 1}`).style.backgroundColor = color.hex.value
    document.getElementById(`color${index + 1}-name`).textContent = color.name.value
    document.getElementById(`color${index + 1}-hex`).textContent = color.hex.value
  });
};

const fetchScheme = (colorHex) => {
  const selectedMode = document.getElementById("mode-select").value;
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorHex}&format=json&mode=${selectedMode}&count=5`
  )
    .then((res) => res.json())
    .then((scheme) => {
      const { colors } = scheme;
      render(colors)
    });
};

const getSchemeBtn = document.getElementById("get-scheme-btn");
const colorPicker = document.getElementById("color-picker");

fetchScheme(getRandomHexColor().substring(1));

getSchemeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchScheme(colorPicker.value.substring(1));
});
