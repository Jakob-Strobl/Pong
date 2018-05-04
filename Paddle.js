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
		this.yPos = y;
	};

	this.getY = function() {
		return this.yPos - this.height/2;
	};

	this.inside = function(box) {
		if (box.left >= this.xPos 
			&& box.left <= this.xPos + this.width
			&& box.bot >= this.getY()
			&& box.top <= this.getY()+ this.height) {
			return true;
		}
		if (box.right >= this.xPos
			&& box.right <= this.xPos + this.width
			&& box.bot >= this.getY()
			&& box.top <= this.getY() + this.height) {
			return true;
		}

		return false;
	};

	// Check if the ball collides with paddle.
	this.collides = function(ball) {
		if (this.inside(ball.collisionBox())) {
			this.draw = this.drawPaddleBounce; //Swap draw function with pop animation
			console.log("switch");
			return true;
		}
	};
	
	// Return parameters to draw figures
	this.drawPaddle = function() {
		return {
			x: this.xPos,
			y: this.getY(),
			width: this.width,
			height: this.height,
			color: this.color
		};
	};
	
	// Make a "pop" animation when the ball hits the paddle.
	// Assume that times are in seconds
	// Animation lasts ~0.2 seconds.
 	this.drawPaddleBounce = function(startTime, curTime, ballColor) {
		
		// Initially change the color to the ball
		if (this.color == this.baseColor) {
			this.color = ballColor;
		}
		else { // Shift color back to the original paddle color
			this.color = rgb_to_hex(shift_to_color(hex_to_rgb(this.color), hex_to_rgb(this.baseColor),  0.1));
		}
		
		// For 75 ms ~5 frames, shrink the paddle
		if (curTime - startTime < 75) {
			this.shiftSize(this.baseWidth*0.7, this.baseHeight*1.4, 0.5, 0.2);
		} // For the next ~25 frames, bring paddle to original size);
		else if (curTime - startTime < 500) {
			this.shiftSize(this.baseWidth, this.baseHeight, 0.55, 0.15);
		}
		else {
			//Make sure values go back to original state
			this.color = this.baseColor;	
			this.width = this.baseWidth;
			this.height = this.baseHeight;
			//Reassign draw() back to normal drawPaddle()
			this.draw = this.drawPaddle;
		}
		
		// Return all draw parameters
		return this.drawPaddle();
	};
	
	this.shiftSize = function(w, h, rateW, rateH) {
		console.log(this.width);
		this.width = Math.round((w - this.width) * rateW + this.width);
		this.height = Math.floor((h - this.height) * rateH + this.height);
		console.log("After" + this.width);
	}
	
	// Wrapper draw function that by default draw the Paddle
	// NOTE: For this assignment to work, the functions (e.g. drawPaddle()) have to be previously defined.
	this.draw = this.drawPaddle;
}