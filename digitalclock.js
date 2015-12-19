/*
 * Digital Clock
 *
 * Copyright (c) 2011 Jorge Morgado <jorge@morgado.ch>
 * GPL License
 */

var big = new Array(
	"images/0_big.png",
	"images/1_big.png",
	"images/2_big.png",
	"images/3_big.png",
	"images/4_big.png",
	"images/5_big.png",
	"images/6_big.png",
	"images/7_big.png",
	"images/8_big.png",
	"images/9_big.png"
);

var small = new Array(
	"images/0_small.png",
	"images/1_small.png",
	"images/2_small.png",
	"images/3_small.png",
	"images/4_small.png",
	"images/5_small.png",
	"images/6_small.png",
	"images/7_small.png",
	"images/8_small.png",
	"images/9_small.png"
);

var am = "images/am.png";
var pm = "images/pm.png";

var FREQUENCY = 4;	// blinks the colon for a quarter of a second
var visible = true;
var count = 1;

window.onload = setTimers();

function setTimers() {
	var timer1 = new Timer();

	timer1.start('doClock()', 1000);
}

function doColon() {
	if (count++ == FREQUENCY) {
		count = 1;
		visible = false;
		DOM.get("zrh_colon").style.visibility = 'hidden';
		DOM.get("nyk_colon").style.visibility = 'hidden';
		DOM.get("syd_colon").style.visibility = 'hidden';
	} else if (visible == false) {
		visible = true;
		DOM.get("zrh_colon").style.visibility = 'visible';
		DOM.get("nyk_colon").style.visibility = 'visible';
		DOM.get("syd_colon").style.visibility = 'visible';
	}
}

function doClock() {
	var zurich = setDigital(worldClock(1, "Europe").split("\n", 2)[1]);
	document.zrh_hour1.src = zurich[0];
	document.zrh_hour2.src = zurich[1];
	document.zrh_min1.src = zurich[2];
	document.zrh_min2.src = zurich[3];
	document.zrh_sec1.src = zurich[4];
	document.zrh_sec2.src = zurich[5];
	document.zrh_ampm.src = zurich[6];

	var newyork = setDigital(worldClock(-5, "NAmerica").split("\n", 2)[1]);
	document.nyk_hour1.src = newyork[0];
	document.nyk_hour2.src = newyork[1];
	document.nyk_min1.src = newyork[2];
	document.nyk_min2.src = newyork[3];
	document.nyk_sec1.src = newyork[4];
	document.nyk_sec2.src = newyork[5];
	document.nyk_ampm.src = newyork[6];

	var sydney = setDigital(worldClock(10, "Australia").split("\n", 2)[1]);
	document.syd_hour1.src = sydney[0];
	document.syd_hour2.src = sydney[1];
	document.syd_min1.src = sydney[2];
	document.syd_min2.src = sydney[3];
	document.syd_sec1.src = sydney[4];
	document.syd_sec2.src = sydney[5];
	document.syd_ampm.src = sydney[6];
}

/*
 * Fixes the time string returned by the worldClock for the digital clock:
 * - 24-hour times are converted to 12-hour and AM/PM is added
 * - time units with only one digit are prefixed with a zero
 */
function setDigital(time) {
	var parts = time.split(":", 3);
	var ampm = am;

	hour = Math.floor(parts[0]) + 100;
	min = Math.floor(parts[1]) + 100;
	sec = Math.floor(parts[2]) + 100;

	if (hour == 100) {
		hour = 112;
		ampm = am;
	}
	else if (hour < 112) {
		ampm = am;
	}
	else if (hour == 112) {
		ampm = pm;
	}
	else if (hour > 112) {
		ampm = pm;
		hour = hour - 12;
	}
	total = '' + hour + min + sec;

	return new Array(
		big[total.substring(1,2)],
		big[total.substring(2,3)],
		big[total.substring(4,5)],
		big[total.substring(5,6)],
		small[total.substring(7,8)],
		small[total.substring(8,9)],
		ampm
	);
}
