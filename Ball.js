// Basic Ball Constructor
function Ball(xPos, yPos, diameter, xVel, yVel, color) {
	this.diameter = diameter,

	this.xPos = xPos,
	this.yPos = yPos,

	this.xVelocity = xVel,
	this.yVelocity = yVel,
	this.color = color,

	this.invertX = function() {
		ball.xVelocity = ball.xVelocity * -1;
	},

	this.invertY = function() {
		ball.yVelocity = ball.yVelocity * -1;
	},

	this.collisionBox = function() {
		//Returns left, top, right, bot positional values to determine where is collision box is.
		return {
			left: this.xPos - this.diameter/2,
			right: this.xPos + this.diameter/2,
			top: this.yPos - diameter/2,
			bot: this.yPos + diameter/2
		};
	}

	this.getRandomVelocity = function(xRange, xMin, yRange, yMin) {
		this.xVelocity = Math.floor(Math.random() * xRange + xMin);
		this.yVelocity = Math.floor(Math.random() * yRange + yMin);

		// If the value is greater, make xVelocity negative.
		// i.e. 50% chance of being a negative value.
		if (Math.random() > 0.5) {
			this.xVelocity *= -1;
		} // Else - Do nothing

		// If the value is greater, make yVelocity negative.
		if (Math.random() > 0.5) {
			this.yVelocity *= -1;
		} // Else - Do nothing
	}

	this.getRandomColor = function() {
		this.color = golden_ratio_hex(0.4, 0.95);
	}
}
