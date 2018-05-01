// All Functions that pertain to the core functionality of the bot
function computeBotMove() {
	var botCenter = botPaddle.getY();
	if(botCenter < ball.yPos) {
		botPaddle.yPos += 4;
	}
	else if (botCenter > ball.yPos) {
		botPaddle.yPos -= 4;
	}
}