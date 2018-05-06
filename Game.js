//Imports
//Ball.js --> Ball()
//Paddle.js --> Paddle()

//margin pixel size from style sheet.
const htmlMargin = 10;

var canvas;
var canvasContext;

//Game Loop Data
var requestID;
var updateInterval;
var gameFPS = 60;

//Ball Object
const ballDiameter = 30;
var ball;
var oldBallColor;
var player; 
var botPaddle;

var accModifier = { 
	x: 0,
	y: 0
};

var playerScore; 
var botScore;

var lastTick = Date.now();//Divide by 1000 to conver time to seconds.
var curTick;
var animTick;
var ballAnimTick;

//Particles 
var p;

//Pop up messages
var playerPopUp;
var botPopUp;
var playerScoreText;
var botScoreText;

/* ********************************
 *  		Initialize Game
 * ********************************
 */

window.onload = function() {
	console.log("HTML Loaded");
	canvas = document.getElementById("gameCanvas");

	//Set Canvas dimensions
	canvas.width = ((window.innerWidth * 1) - (htmlMargin * 2));
	canvas.height = ((window.innerHeight * 1) - (htmlMargin * 2));

	//Construct Objects
	newBall();
	
	player = new Paddle(0, canvas.height/2, 10, 100, "#FFFFFF");
	botPaddle = new Paddle(canvas.width, canvas.height/2, 10, 100, "#FFFFFF");
	
	p = new Particles(15);
	
	playerPopUp = new TimedPopupText(new PopupText("CURVE BALL!", 200, 175, 48, "white", "sans-serif"));
	botPopUp = new TimedPopupText(new PopupText("CURVE BALL!", canvas.width-200, 175, 48, "white", "sans-serif"));
	playerScoreText = new ScoreText(0, 100, 100, 32, "white", "sans-serif");
	botScoreText = new ScoreText(0, canvas.width-100, 100, 32, "white", "sans-serif");
	
	drawCanvas(); // Draw canvas ASAP before settingAnimationFrame
	run(); 	//Start game
}

function run() {

	//Mouse listener event
	canvas.addEventListener('mousemove', 
			function(evt) {
				var mousePos = getMousePos(evt);
				player.setY(mousePos.y);
			});
	
	//Request animation frame for animation Loop
	requestID = requestAnimationFrame(updateAnimation);
}

/* ********************************
 *  		  User Input
 * ********************************
 */

function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x: mouseX,
		y: mouseY
	};
}


/* ********************************
 *  			Update
 * ********************************
 */

function updateObjects() {
	curTick = Date.now(); // Get new time for all update functions
	//Divide by 1000 to conver time to seconds.
	moveBall();
	computeBotMove();
	
	//Particles 
	p.update();
	
	lastTick = curTick; // Set previous time with the current time for next updateObjects call.
}

function moveBall() {
	//Update positions
	//Get the current time so we can calculate the deltaTime for ball.move()
	ball.move(accModifier, (curTick - lastTick)/1000);
		
	var ballHitBox = ball.collisionBox();

	// Check if ball hit an edge
	if (ballHitBox.top <= 0) {
		// Ball passed top edge
		ball.invertY();
		
		//EDGE CASE: Make sure the ball doesn't double bounce on wall.
		ball.yPos += 2;
		
		// Zero y acceleration modifier after coliding with the walls.
		//accModifier.x = 0;
		accModifier.y = 0;
		ballAnimTick = curTick;
		
		// Start the ball animation draw function
		ball.createParticles();
		ball.draw = ball.drawBallBounce;
	}
	else if (ballHitBox.bot >= canvas.height) {
		// Ball passed bottom edge
		ball.invertY();
		
		//EDGE CASE: Make sure the ball doesn't double bounce on wall.
		ball.yPos -= 2;
		
		// Zero y acceleration modifier after coliding with the walls.
		//accModifier.x = 0;
		accModifier.y = 0;
		
		// Timing for animation
		ballAnimTick = curTick;
		
		// Start the ball animation draw function
		ball.createParticles();
		ball.draw = ball.drawBallBounce;
	} 
	else if (player.collides(ballHitBox)) {
		// check for curve bounce
		// Normal bounce
		ball.invertX();
		ball.xPos += 2;
		
		// If paddle speed > 20, curve shot
		if (Math.abs(player.speed) > 20) {
			accModifier.y = ball.yVelocity/player.speed * (Math.abs(player.speed));
			playerPopUp.init();
		}
		
		animTick = curTick;
		ballAnimTick = curTick;
		
		// Start the ball animation draw function
		ball.createParticles();
		ball.draw = ball.drawBallBounce;
	}
	else if (botPaddle.collides(ballHitBox)) {
		ball.invertX();
		ball.xPos -= 2;
		
		if (Math.abs(botPaddle.speed) > 20) {
			accModifier.y = ball.yVelocity/botPaddle.speed * (Math.abs(botPaddle.speed));
			botPopUp.init();
		}
		
		animTick = curTick;
		ballAnimTick = curTick;
		
		// Start the ball animation draw function
		ball.createParticles();
		ball.draw = ball.drawBallBounce;
	}

	// Check for scoring
	// Bot Scores
	if (ball.xPos <= (0 - (ball.diameter * 2))) {
		updateScoreBoard(false);
		oldBallColor = ball.color;
		p.create(canvas.width-93, 90, oldBallColor, 5, 7, -15);
		newBall();
	}// Player Scores
	else if (ball.xPos >= (canvas.width + (ball.diameter * 2))) {
		updateScoreBoard(true);
		oldBallColor = ball.color;
		p.create(107, 90, oldBallColor, 5, 7, -15);
		newBall();
	}

}

function updateScoreBoard(playerScored) {
	if (playerScored == false) {
		botScoreText.incScore();
		
		if (botScoreText.score == playerScoreText.score) {
			playerScoreText.initShrink();
			botScoreText.initBounce(false);
		}
		else if (botScoreText.score > playerScoreText.score) {
			botScoreText.initGrow();
			botScoreText.initBounce(true);
		}
		else {
			botScoreText.initBounce(false);
		}
	} 
	else {
		playerScoreText.incScore();
		//Player has bigger number if their score is greater
		if (playerScoreText.score == botScoreText.score) {
			botScoreText.initShrink();
			playerScoreText.initBounce(false);
		}
		else if (playerScoreText.score > botScoreText.score) {
			playerScoreText.initGrow();
			playerScoreText.initBounce(true);
		}
		else {
			playerScoreText.initBounce(false);
		}
	}
}

function newBall() {
	var temp = new Ball(canvas.width/2, canvas.height/2, ballDiameter);
	ball = temp;
	ball.getRandomVelocity(100,600,400,50);
	ball.getRandomColor();

	// Reset acceleration modifier after creating a new ball
	accModifier.x = 0;
	accModifier.y = 0;
}
