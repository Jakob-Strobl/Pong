/* ********************************
 *  			Draw
 *  All functions that pertain to
 *  drawing on the canvas.
 * ********************************
 */

function updateAnimation(time) {
	//Update Objects
	updateObjects();

	//Draw all the things
	drawCanvas();

	//Request new animation
	requestID = requestAnimationFrame(updateAnimation);
}

function drawCanvas() {
	canvasContext = canvas.getContext("2d", {alpha:false});
	
	//Draw canvas
	drawRect(0, 0, canvas.width, canvas.height, "black");

	//Draw Scores
	//Firefox was showing a high cost of usage.
	renderText(playerScore, 100, 100, 32, "sans-serif");
	renderText(botScore, canvas.width-100, 100, 32, "sans-serif");

	//Draw ball
	drawCircle(ball.xPos, ball.yPos, ball.diameter, ball.color);

	//Draw left paddle (Left => Player)
	drawRect(player.xPos, player.yPos, player.width, player.height, player.color);

	//Draw right paddle (right => bot)
	drawRect(botPaddle.xPos, botPaddle.yPos, botPaddle.width, botPaddle.height, botPaddle.color);
}

function drawCircle(centerX, centerY, diameter, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, diameter/2, 0, Math.PI*2, true);
	canvasContext.fill();
}

function drawRect(leftX, topY, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX, topY, width, height);
}

function renderText(message, xPos, yPos, size, font) {
	canvasContext.fillStyle = "white";
	canvasContext.font = size + "px " + font;
	canvasContext.fillText(message, xPos, yPos);

}