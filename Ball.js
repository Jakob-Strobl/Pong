// Basic Ball Constructor
// Values for velocity and acceleration are all culculated by pixels/second.
function Ball(xPos, yPos, diameter, xVel, yVel, color) {
	this.diameter = diameter;
	this.baseDiameter = diameter;

	this.xPos = xPos;
	this.yPos = yPos;

	this.xVelocity = xVel;
	this.yVelocity = yVel;

	this.color = color;
	
	this.particles = new Particles(10);

	// Move the ball with an acceleration object {x:~, y:~} and a delta Time value
	// Accelaration is pixels/second, deltaT = # of second(s)
	// Using time for calculations, means ball movement/position is independent of frame rate.
	this.move = function(a, deltaT) {
		//Calculate new velocity based off of time and acceleration
		this.xVelocity = this.xVelocity + (a.x * deltaT);
		this.yVelocity = this.yVelocity + (a.y * deltaT);

		this.xPos += this.xVelocity * deltaT;
		this.yPos += this.yVelocity * deltaT;
	};

	this.invertX = function() {
		this.xVelocity = this.xVelocity * -1;
	};

	this.invertY = function() {
		this.yVelocity = this.yVelocity * -1;
	};

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
	};

	this.getRandomColor = function() {
		this.color = golden_ratio_hex(0.5, 0.95);
	};

	this.collisionBox = function() {
		//Returns left, top, right, bot positional values to determine where is collision box is.
		
		//Use base diameter so animation doesnt cause infinite expansion
		return {
			left: this.xPos - this.baseDiameter/2,
			right: this.xPos + this.baseDiameter/2,
			top: this.yPos - this.baseDiameter/2,
			bot: this.yPos + this.baseDiameter/2
		};
	};
	
	this.drawBall = function() {
		return {
			x: this.xPos,
			y: this.yPos,
			diameter: this.diameter,
			color: this.color
		};
	};
	
	this.drawBallBounce = function(startTime, curTime, context) {
		var deltaTime = curTime - startTime;
		
		if (deltaTime < 100) {
			this.diameter = this.shiftDiameter(this.baseDiameter*1.3, 0.6);
		}
		else if (deltaTime < 300) {
			this.diameter = this.shiftDiameter(this.baseDiameter, 0.02);
		}
		else if (this.particles.particles == 0) {
			this.diameter = this.baseDiameter;
			
			//Switch back to standard draw
			this.draw = this.drawBall;
		}
		
		//Add particle effects on bounce
		this.particles.update();
		this.particles.draw(context);
		
		return this.drawBall();
	};
	
	this.draw = this.drawBall;
	
	this.shiftDiameter = function(targetDiameter, rate) {
		return Math.floor((targetDiameter - this.diameter) * rate + this.diameter);
	};
	
	this.createParticles = function() {
		this.particles.create(this.xPos, this.yPos, this.color, 5, this.diameter, -20);
	}
}
