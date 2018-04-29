/* ********************************
 *  			Draw
 *  All functions that pertain to
 *  drawing on the canvas.
 * ********************************
 */

function updateAnimation(time) {
	//Draw all the things
	drawCanvas();

	//Request new animation
	requestID = requestAnimationFrame(updateAnimation);
}

function drawCanvas() {
	canvasContext = canvas.getContext("2d");
	
	//Draw canvas
	drawRect(0, 0, canvas.width, canvas.height, "black");

	//Draw ball
	drawCircle(ball.xPos, ball.yPos, ball.diameter, ball.color);

	//Draw left paddle (Left => Player)
	drawRect(player.xPos, player.yPos, player.width, player.height, player.color);

	//Draw right paddle (right => bot)
	drawRect(botPaddle.xPos, botPaddle.yPos, botPaddle.width, botPaddle.height, botPaddle.color);

	//Draw Scores
	canvasContext.fillText(playerScore, 100, 100);

	canvasContext.fillText(botScore, canvas.width-100, 100);
}

function drawCircle(centerX, centerY, diameter, color) {
	console.log(color);
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, diameter/2, 0, Math.PI*2, true);
	canvasContext.fill();
}

function drawRect(leftX, topY, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX, topY, width, height);
}