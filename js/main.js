const colorInput = document.querySelector('input[type="color"]');
const colorDiv = document.querySelector('.color');
const colorHexParagraph = document.querySelector('.color-hex');
const guessButton = document.querySelector('.color-btn');

let turn = 0;

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomHexColor = () =>
  '#' +
  getRandom(0, 255).toString(16).padStart(2, '0') +
  getRandom(0, 255).toString(16).padStart(2, '0') +
  getRandom(0, 255).toString(16).padStart(2, '0');

const hexToRgbArray = (color) => {
  const r = parseInt(color[1] + color[2], 16);
  const g = parseInt(color[3] + color[4], 16);
  const b = parseInt(color[5] + color[6], 16);

  return [r, g, b];
};

const rgb2lab = (rgb) => {
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255,
    x,
    y,
    z;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};

const checkComp = (rgbA, rgbB) => {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / 1.0;
  let deltaCkcsc = deltaC / sc;
  let deltaHkhsh = deltaH / sh;
  let i =
    deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
};

let colorToGuess = getRandomHexColor().toUpperCase();
let guessedColor = '#000000';
colorDiv.style.backgroundColor = colorToGuess;

console.log(colorToGuess);

colorInput.addEventListener('input', () => {
  guessedColor = colorInput.value.toUpperCase();
  colorHexParagraph.innerText = guessedColor;
});

const checks = document.querySelectorAll('.check');

guessButton.addEventListener('click', () => {
  if (!turn) {
    for (const check of checks) {
      check.style.backgroundColor = '#dbdbdb';
    }
  }

  turn++;

  console.log(turn);

  for (let i = 0; i < turn; i++) {
    checks[i].style.backgroundColor = 'lightgreen';
  }

  if (turn == 5) {
    turn = 0;
  }

  colorDiv.innerHTML =
    '<p>' +
    Math.floor(
      100 -
        (checkComp(hexToRgbArray(guessedColor), hexToRgbArray(colorToGuess)) %
          100),
    ) +
    '%</p>';
});
