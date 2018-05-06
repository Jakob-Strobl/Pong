//User interface 

//Pop Up Text
function PopupText(message, xPos, yPos, maxSize, color, font) {
	this.curSize = 0;
	this.maxSize = maxSize;
	
	this.message = message;
	this.color = color;
	
	this.font = font;
	
	this.xPos = xPos;
	this.yPos = yPos;
	
	//Causes the popup scaling
	this.expandText = function(rate) {
		this.curSize = this.curSize + (this.maxSize - this.curSize) * rate;
		this.curSize = Math.ceil(this.curSize);
	}
	
	this.shrinkText = function(rate) {
		this.curSize = this.curSize + ((0 - this.curSize) * rate);
		this.curSize = Math.floor(this.curSize);
		
		if (this.curSize < 0) {
			this.curSize = 0;
		}
	}
	
	this.draw = function(context) {
		context.fillStyle = this.color;
		context.font = this.curSize + "px " + this.font;
		context.textAlign = "center";
		context.fillText(this.message, this.xPos, this.yPos);
	}
}

function TimedPopupText(popup) {
	
	this.startTime = 0;
	
	this.popMessage = popup;
	this.initialized = false;
	
	this.init = function() {
		this.startTime = Date.now();
		this.initialized = true;
	}
	
	this.renderTimedMessage = function(context, time) {
		if (this.initialized == true) {
			var delta = Date.now() - this.startTime;
			this.popMessage.expandText(false);
			this.popMessage.draw(context);
			
			if (delta <= time/2) {
				this.popMessage.expandText(0.2);
			}
			else {
				this.popMessage.shrinkText(0.2);
			}
			
			this.popMessage.draw(context);
			
			//End message
			if (delta >= time || this.popMessage.curSize == 0) {
				this.initialized = false;
			}
		}
	}
}

function ScoreText(score, xPos, yPos, baseSize, color, font) {
	this.curSize = baseSize;
	this.baseSize = baseSize;
	this.minSize = baseSize;
	this.maxSize = baseSize * 1.5;
	this.leadSize = this.maxSize;
	
	this.score = score;
	this.color = color;
	
	this.font = font;
	
	this.xPos = xPos;
	this.yPos = yPos;
	
	this.bounce = false;
	this.shrink = false;
	
	//Causes the popup scaling
	this.expandText = function(max, rate) {
		this.curSize = this.curSize + (max - this.curSize) * rate;
		this.curSize = Math.ceil(this.curSize);
		
		if (this.curSize > max) {
			this.curSize = max;
		}
	}
	
	this.shrinkText = function(min, rate) {
		this.curSize = this.curSize + ((min - this.curSize) * rate);
		this.curSize = Math.floor(this.curSize);
		
		if (this.curSize < min) {
			this.curSize = min;
		}
	}
	
	this.incScore = function() {
		this.score += 1;
	}
	
	this.initBounce = function(lead) {
		if (lead == false) {
			this.curSize = this.baseSize;
		}
		else {
			this.curSize = this.leadSize;
		}
		
		this.bounce = true;
	}
	
	this.initGrow = function() {
		if (this.minSize != this.leadSize) {
			this.curSize = this.baseSize;
			this.maxSize = this.leadSize * 1.5;
			this.minSize = this.leadSize;
		}
	}
	
	this.initShrink = function() {
		this.maxSize = this.baseSize * 1.5;
		this.minSize = this.baseSize;
		this.shrink = true;
	}
	
	this.renderBounceableText = function(context, rate) {
		if (this.bounce) {
			if (!this.shrink && this.curSize < this.maxSize) {
				this.expandText(this.maxSize, rate);
			}
			else if (this.curSize > this.minSize) {
				this.shrink = true;
				this.shrinkText(this.minSize, rate*0.5);
			}
			else {
				this.bounce = false;
				this.shrink = false;
			}
		}
		else if (!this.bounce && this.shrink) {
			if (this.curSize > this.baseSize) {
				this.shrinkText(this.minSize, rate*0.5);
			}
			else {
				this.shrink = false;
			}
		}
		
		this.draw(context);
	}
	
	this.draw = function(context) {
		canvasContext.fillStyle = this.color;
		canvasContext.font = this.curSize + "px " + this.font;
		context.textAlign = "center";
		context.textBaseline = "middle";
		canvasContext.fillText(this.score, this.xPos, this.yPos);
	}
}