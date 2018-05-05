/*	PARTICLE EFFECTS
 *    Everything needed to draw particles.
 */
 
function Particles(number) {
	this.numParticles = number;
	this.particles;
	
	this.create = function(xPos, yPos, color, diameter, xCalc, yCalc) {
		this.particles = [];
		for (var i = 0; i < this.numParticles; i++) {
			this.particles.push(new Particle(xPos, yPos, color, diameter, xCalc, yCalc));
		}
	}
	
	
	this.update = function() {
		if (this.particles != 0) {
			for (var i = 0; i < this.numParticles; i++) {
				this.particles[i].update();
			}
		}
	}
	
	this.draw = function(context) {
		if (this.particles != 0) {
			for (var i = 0; i < this.numParticles; i++) {
				this.particles[i].draw(context);
			}
			
			//Clear particles from reference if 
			if (this.particles[0].color == "#000000") {
				console.log("Clearing Particles");
				this.clear();
			}
		}
	}
	
	this.clear = function() {
		this.particles = 0;
	}
}

function Particle(xPos, yPos, color, diameter, xVelCalc, yVelCalc) {
	this.xPos = xPos;
	this.yPos = yPos;
	this.diameter = Math.random() * diameter;
	this.color = color;
	
	this.xVelocity = (Math.random() * 10)-5;
	this.yVelocity = -(Math.random() * 10 + 2);
	
	this.yAcc = 0.5;
	
	
	this.update = function() {
		//Update position
		this.yVelocity = this.yVelocity + this.yAcc;
		
		this.xPos += this.xVelocity;
		this.yPos += this.yVelocity;
		
		//Update color
		var particleRGB = hex_to_rgb(this.color);
		var targetRGB = hex_to_rgb("#000000");
		this.color = rgb_to_hex(shift_to_black(particleRGB, 0.05));
		console.log(this.color);
	}
	
	this.draw = function(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.xPos, this.yPos, this.diameter/2, 0, 2*Math.PI, true);
		context.fill();
	}
}