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
	
	//Particles
	p.draw(canvasContext);

	//Draw Scores
	//Firefox was showing a high cost of usage.
	renderText(playerScore, 100, 100, 32, "sans-serif");
	renderText(botScore, canvas.width-100, 100, 32, "sans-serif");

	//Draw ball
	drawBall(ball.draw(ballAnimTick, curTick));

	//Draw left paddle (Left => Player)
	drawPaddle(player.draw(animTick, curTick, ball.color));

	//Draw right paddle (right => bot)
	drawPaddleFlipped(botPaddle.draw(animTick, curTick, ball.color));
	
}

function drawBall(ball) {
	drawCircle(ball.x, ball.y, ball.diameter, ball.color);
}

function drawCircle(centerX, centerY, diameter, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, diameter/2, 0, Math.PI*2, true);
	canvasContext.fill();
}

function drawPaddle(paddle) {
	canvasContext.fillStyle = paddle.color;
	canvasContext.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawPaddleFlipped(paddle) {
	canvasContext.save();
	canvasContext.scale(-1,1);
	canvasContext.fillStyle = paddle.color;
	canvasContext.fillRect(-paddle.x, paddle.y, paddle.width, paddle.height);
	canvasContext.restore();
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