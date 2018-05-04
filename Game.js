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
	botPaddle = new Paddle(canvas.width-10, canvas.height/2, 10, 100, "#FFFFFF");
	playerScore = 0;
	botScore = 0;

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
	
	lastTick = curTick; // Set previous time with the current time for next updateObjects call.
}

function moveBall() {

	//Update positions
	//Get the current time so we can calculate the deltaTime for ball.move()
	ball.move(accModifier, (curTick - lastTick)/1000);

	// Check if ball hit an edge
	if (ball.yPos <= 0  + ball.diameter/2) {
		// Ball passed top edge
		ball.invertY();
	}
	else if (ball.yPos >= canvas.height - ball.diameter/2) {
		// Ball passed bottom edge
		ball.invertY();
	} 
	else if (player.collides(ball)) {
		ball.invertX();
		animTick = curTick;
	}
	else if (botPaddle.collides(ball)) {
		ball.invertX();
		animTick = curTick;
	}

	//Check for scoring
	if (ball.xPos <= 0 - ball.diameter/2) {
		botScore++;
		newBall();
	}
	else if (ball.xPos >= canvas.width + ball.diameter/2) {
		playerScore++;
		newBall();
	}

}

function newBall() {
	var temp = new Ball(canvas.width/2, canvas.height/2, ballDiameter);
	ball = temp;
	ball.getRandomVelocity(100,400,300,50);
	ball.getRandomColor();
}
