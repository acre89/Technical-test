## Technical Test Cresci Alexandre

### Context

In order to create a basic UI to allow tests on my program, I choose to create a local website in vanilla HTML/CSS. Moreover, the function that are asked in the instruction are in the app.js file in vanilla JS. 

### Image verification function

The png format verification is made in the HTML <input> tag.

&rarr; **Verify size :** The function verify the size of the image and allow to return if the size is correct in the UI. In order to use the function, we need to create an Image() element.

&rarr; **Check image color :** The function uses a canva object in order to iterately count the pixel that have a specified color condition (in our case we take R > 200, G > 50 and B < 100) and shows in the UI if there is a majority (>50%) of pixel that satisfy the condition.

Moreover the UI allows the user if the file does not fit the correct size to adapt his image while scaling it down or cover the frame.