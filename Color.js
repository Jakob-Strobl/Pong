//Functions For Random Color

// hsv_to_rgb was taken from Martin Ankerl
// I adopted it to JS code.

// HSV values in [0 ... 1]
// Function returns [r, g, b] from 0 to 255
function hsv_to_rgb(h, s, v) {
	var r, g, b;

	var h_i = Math.floor(h * 6);
	var f = h*6 - h_i;
	var p = v * (1 - s);
	var q = v * (1 - f*s);
	var t = v * (1 - (1 - f) * s);

	if (h_i === 0) {
		r = v;
		g = t;
		b = p;
	} 
	else if (h_i === 1) {
		r = q;
		g = v;
		b = p;
	}
	else if (h_i === 2) {
		r = p;
		g = v;
		b = t;
	}
	else if (h_i === 3) {
		r = p;
		g = q;
		b = v;
	}
	else if (h_i === 4) {
		r = t;
		g = p;
		b = v;
	}
	else if (h_i === 5) {
		r = v;
		g = p;
		b = q;
	}

	return {
		r: Math.floor(r*256),
		g: Math.floor(g*256),
		b: Math.floor(b*256)
	}
}

function hex_to_rgb(hex) {
	return {
		r: parseInt(hex.substring(1,3),16),
		g: parseInt(hex.substring(3,5),16),
		b: parseInt(hex.substring(5,7),16)
	};
}

function rgb_to_hex(rgb) {
	var hex = "#" + rgb.r.toString(16).toUpperCase() + rgb.g.toString(16).toUpperCase() + rgb.b.toString(16).toUpperCase();
	return hex;
}

//Generate a random hsv
function rand_hsv() {
	return Math.random();
}

// Same stuff from a blogpost by Martin Ankerl
function golden_ratio_h() {
	var golden_ratio = 0.618033988749895;
	var h = Math.random();
	h = h + golden_ratio;
	h = h % 1;
	return h;
}

// Computes a random h, and returns a converted hsv to rgb values
function golden_ratio_rgb(s, v) {
	var h = golden_ratio_h();
	return hsv_to_rgb(h, s, v);
}

function golden_ratio_hex(s, v) {
	var rgb = golden_ratio_rgb(s, v);
	var hex = "#" + rgb.r.toString(16).toUpperCase() + rgb.g.toString(16).toUpperCase() + rgb.b.toString(16).toUpperCase();
	return hex;
}

function shift_to_color(curRGB, destRGB, shift) {
	curRGB.r = Math.ceil((destRGB.r - curRGB.r) * shift) + curRGB.r;
	
	//console.log("r: " +  destRGB.g + " - " + curRGB.g);
	curRGB.g = Math.ceil((destRGB.g - curRGB.g) * shift) + curRGB.g;

	curRGB.b = Math.ceil((destRGB.b - curRGB.b) * shift) + curRGB.b;

	return curRGB;
}