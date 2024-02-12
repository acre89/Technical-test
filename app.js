const imageInput = document.getElementById("image-input");
const imageFrame = document.getElementById("image-frame");
const textSize = document.getElementById("size");
const btnContainer = document.getElementById("btn-container");
const textHappy = document.getElementById("happy");

var file = false;

// Function that start after choosing a file,
// the function manages the entire procedure and secondary functions
imageInput.addEventListener("change", (event) => {
  imageFrame.src = "";
  file = event.target.files[0];
  console.log(file);
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    imageFrame.src = event.target.result;
  });
  // Creating an image to properly use the function verifySize
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = function () {
    reader.readAsDataURL(file);
    if (verifySize(img) == true) {
      textSize.textContent = "Your image is properly sized (512x512)";
      btnContainer.style.display = "none";
    } else {
      imageFrame.style.objectFit = "scale-down";
      textSize.textContent =
        "Your image is not correctly sized (" +
        img.width +
        "x" +
        img.height +
        ") which style do you prefer ?";
      btnContainer.style.display = "flex";
    }
    checkImageColor(img);
  };
});

function verifySize(image) {
  return image.width == 512 && image.height == 512;
}

function checkImageColor(image) {
  // In order to count "happy" pixel we need to iterate all image pixels
  // To achieve this, we create an off-screen canva element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Creating a counter of "happy" pixels
  var happyPixels = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    // Creating a subjective condition of what a happy pixel is
    if (r > 200 && g > 50 && b < 100) {
      happyPixels++;
    }
  }

  const totalPixels = imageData.width * imageData.height;
  const happinessPercentage = (happyPixels / totalPixels) * 100;

  if (happinessPercentage >= 50) {
    textHappy.textContent = "Your image gives an happy feeling !";
  } else {
    textHappy.textContent = "Your image could give an happier feeling :(";
  }
}


// Choosing style of a different size image
function scaleDownBtn() {
  imageFrame.style.objectFit = "scale-down";
}

function coverBtn() {
  imageFrame.style.objectFit = "cover";
}
