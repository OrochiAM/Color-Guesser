const colorInput = document.querySelector('input[type="color"]');
const colorHexParagraph = document.querySelector('.color-hex');
console.log(colorInput.value);

let colorToGuess;

colorInput.addEventListener('input', () => {
  colorHexParagraph.innerText = colorInput.value.toUpperCase();
});
