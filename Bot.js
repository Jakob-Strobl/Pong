// All Functions that pertain to the core functionality of the bot
function getComfortZone() {
	var center = botPaddle.yPos;
	var zone = 0.2;
	
	return {
		top: center - ((botPaddle.height/2)*zone),
		bot: center + ((botPaddle.height/2)*zone)
	};
}

function computeBotMove() {
	//Once the ball is 150 px away, pick how we will bounce the ball.
	if (attemptCurveBall == 0 && botPaddle.xPos - ball.xPos < 300) {
		if (Math.random() < 0.1) {
			console.log("ATTEMPTING CURVE BALL");
			attemptCurveBall = 2;
		}
		else {
			attemptCurveBall = 1;
		}
	}
	
	if (attemptCurveBall == 2) {
		// If ball is 50 px away and moving to the right, attemptCurveBall
		if (botPaddle.xPos - ball.xPos < 300 && ball.xVelocity > 0)
			botCurveBall();
		else 
			botMove();
	}
	else {
		botMove();
	}
}

function botMove() {
	var botCenter = botPaddle.yPos;
	var comfortZone = getComfortZone();
	
	var ballSpeed = Math.abs(ball.yVelocity);
	var distance;
	
	var move;
	var negate = false;
	
	//If in the comfort zone, dont move.
	if (ball.yPos < comfortZone.top) {
		distance = Math.abs(comfortZone.top - ball.yPos);
		negate = true;
	}
	else if (ball.yPos > comfortZone.bot) {
		distance = Math.abs(comfortZone.bot - ball.yPos);
	}
	else { //Inside comfort zone
		distance = 0;
	}
	
	move = Math.round((distance/(ballSpeed+2)) * distance);
	if (move > 75)
		move = 75;
	else if (move < -75)
		move = -75;
	
	if (negate)
		botPaddle.setY(botCenter - move);
	else
		botPaddle.setY(botCenter + move);
}

function botCurveBall() {
	var botCenter = botPaddle.yPos;
	
	var ballSpeed = Math.abs(ball.yVelocity);
	var yDistance = Math.abs(botCenter - ball.yPos);
	
	//xDistance from the farthest right point of the ball.
	var xDistance = botPaddle.xPos - (ball.xPos + ball.diameter/2);
	
	//This is the distance we might want to begin striking at
	var strikeDistance = ball.xVelocity/12;
	
	var move = 0;
	var negate = false;
	
	if (xDistance < strikeDistance && ball.yPos < botCenter) {
		move = yDistance/(xDistance/12);
		move = move/(ballSpeed/60);
		negate = true;
	}
	else if (xDistance < strikeDistance) {
		move = yDistance/(xDistance/20);
		move = move/(ballSpeed/60);
	}
	else { //Not far enough away to do a curve
		//So we want to move away from the ball.
		if (ball.yPos < botPaddle.yPos - 10) {
			move = -(xDistance/yDistance);
		}
		else if (ball.yPos > botPaddle.yPos + botPaddle.height + 10) {
			move = -(xDistance/yDistance);
		}
		else if (ball.yPos < botCenter) {
			move = xDistance/yDistance / (ballSpeed/120);
		}
		else {
			move = -(xDistance/yDistance) / (ballSpeed/120);
		}
	}
	
	move = Math.round(move);
	
	if (negate)
		botPaddle.setY(botCenter - move);
	else
		botPaddle.setY(botCenter + move);
	
}