function Paddle(xPos, yPos, width, height, color) {
	this.xPos = xPos;
	this.yPos = yPos;
	
	this.height = height;
	this.baseHeight = height;
	this.width = width;
	this.baseWidth = width;
	
	//Hex values
	this.color = color;
	this.baseColor = color;
	
	// base____ variables store the original values the paddle was instantiated with.
	

	//Center yPos
	this.setY = function(y) {
		this.yPos = y - this.height/2;
	};

	this.getY = function() {
		return this.yPos + this.height/2;
	};

	this.inside = function(box) {
		if (box.left >= this.xPos 
			&& box.left <= this.xPos + this.width
			&& box.bot >= this.yPos
			&& box.top <= this.yPos + this.height) {
			return true;
		}
		if (box.right >= this.xPos
			&& box.right <= this.xPos + this.width
			&& box.bot >= this.yPos
			&& box.top <= this.yPos + this.height) {
			return true;
		}

		return false;
	};

	// Check if the ball collides with paddle.
	this.collides = function(ball) {
		if (this.inside(ball.collisionBox())) {
			this.draw = this.pop; //Swap draw function with pop animation
			console.log("switch");
			return true;
		}
	};
	
	// Return parameters to draw figures
	this.drawPaddle = function() {
		return {
			x: this.xPos,
			y: this.yPos,
			width: this.width,
			height: this.height,
			color: this.color
		};
	};
	
	// Make a "pop" animation when the ball hits the paddle.
	// Assume that times are in seconds
	// Animation lasts ~0.2 seconds.
 	this.pop = function(startTime, curTime, ballColor) {
		
		// Initially change the color to the ball
		if (this.color == this.baseColor) {
			this.color = ballColor;
		}
		
		//Shift color back to the original paddle color
		if (curTime - startTime < 500) {
			var paddleRGB = hex_to_rgb(this.color);
			this.color = rgb_to_hex(shift_to_color(paddleRGB, hex_to_rgb(this.baseColor),  0.1));
		}
		else {
			//Make sure the shift is complete.
			this.color = this.baseColor;	
			//Reassign draw() back to normal drawPaddle()
			this.draw = this.drawPaddle;
		}
		
		// Return all draw parameters
		return this.drawPaddle();
	};
	
	// Wrapper draw function that by default draw the Paddle
	// NOTE: For this assignment to work, the functions (e.g. drawPaddle()) have to be previously defined.
	this.draw = this.drawPaddle;
}