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
		console.log("shrink" + this.curSize);
		
		if (this.curSize < 0) {
			this.curSize = 0;
		}
	}
	
	this.draw = function(context) {
		canvasContext.fillStyle = this.color;
		canvasContext.font = this.curSize + "px " + this.font;
		var x = this.xPos-((this.curSize*this.message.length)/(this.message.length/2)); //Centers text
		canvasContext.fillText(this.message, x, this.yPos);
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