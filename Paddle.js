function Paddle(xPos, yPos, width, height, color) {
	this.xPos = xPos;
	this.yPos = yPos;
	
	this.width = width;
	this.height = height;
	
	this.speed = 0;
	
	//Hex value
	this.color = color;
	
	// base____ variables store the original values the paddle was instantiated with.
	this.baseWidth = width;
	this.baseHeight = height;
	this.baseColor = color; //Hex
	

	// Everytime we set Y, we can also calculate the speed. 
	// You should call setY() to set the speed.
	// If the system can't render at the speed of the monitor, there might be miscaluclations of the speed.
	this.setY = function(y) {
		this.speed = this.yPos - y;
		//console.log(this.speed);
		this.yPos = y;
	};
	
	// Returned a centered Y position
	this.getY = function() {
		return this.yPos - this.getDynamicHeight()/2;
	};
	
	// Return a width based off of the speed of the paddle.
	// Desmos.com for graph: y = width/(1 + x * 0.01);
	this.getDynamicWidth = function() {
		var w = this.width / (1 + Math.abs(this.speed) *  0.01);
		return w;
	}
	
	// Return a height based off of the speed of the paddle.
	// Desmos.com for graph: y = (height/(1 + x * 0.01))  + 2 * height;
	this.getDynamicHeight = function() {
		var h = -(this.height / (1 + Math.abs(this.speed) * 0.01)) + 2 * this.height;
		return h;
	}
	
	// Check if part of a collisionBox is inside of the paddle.
	this.inside = function(box) {
		// Might provide minor improvements since getY() is only called once.
		var paddleX = this.xPos;
		var paddleY = this.getY();
		
		// Get the dynamic height for the bounds of the paddle's ht box
		var paddleHeight = this.getDynamicHeight();
		var paddleWidth = this.getDynamicWidth();
		
		if (box.left >= paddleX - paddleWidth * 2
			&& box.left <= paddleX + paddleWidth
			&& box.bot >= paddleY
			&& box.top <= paddleY + paddleHeight) {
			return true;
		}
		// paddleX - this.width accounts for the flipped x-axis for the bot paddle.
		if (box.right >= paddleX - paddleWidth
			&& box.right <= paddleX + paddleWidth * 2
			&& box.bot >= paddleY
			&& box.top <= paddleY + paddleHeight) {
			return true;
		}

		return false;
	};

	// Check if the ball collides with paddle.
	this.collides = function(ballHB) {
		if (this.inside(ballHB)) {
			this.draw = this.drawPaddleBounce; //Swap draw function with pop animation
			return true;
		}
	};
	
	// Return parameters to draw figures
	this.drawPaddle = function() {
		var w = this.getDynamicWidth();
		var h = this.getDynamicHeight();
		
		// EDGE CASE: 
		//		Set speed back to zero, in case the user stops moving the mouse abrubtly. 
		this.speed = 0;
		
		return {
			x: this.xPos,
			y: this.getY(),
			width: w,
			height: h,
			color: this.color
		};
	};
	
	// Make a "pop" animation when the ball hits the paddle.
	// Assume that times are in milliseconds
	// Animation lasts ~0.5 seconds.
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
			//Make sure values go back to original state at the end.
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
		this.width = Math.round((w - this.width) * rateW + this.width);
		this.height = Math.floor((h - this.height) * rateH + this.height);
	}
	
	// Wrapper draw function that by default draw the Paddle
	// NOTE: For this assignment to work, the functions (e.g. drawPaddle()) have to be previously defined.
	this.draw = this.drawPaddle;
}