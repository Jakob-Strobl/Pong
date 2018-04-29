function Paddle(xPos, yPos, width, height, color) {
	this.xPos = xPos;
	this.yPos = yPos;
	this.height = height;
	this.width = width;
	this.color = color;

	//Center yPos
	this.setY = function(y) {
		this.yPos = y - this.height/2;
	}

	this.getY = function() {
		return this.yPos + this.height/2;
	}

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
	}

	//Collision
	this.collides = function(ball) {
		if (this.inside(ball.collisionBox())) {
			console.log("Collides");
			return true;
		}
	}
}