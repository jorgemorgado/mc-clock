/*
 * World Clock
 *
 * Copyright (c) 2011 Jorge Morgado <jorge@morgado.ch>
 * GPL License
 */

/*
 * This function's code has been copied from the World Clock example 
 * (http://www.proglogic.com/code/javascript/time/worldclock.php)
 */
function worldClock(zone, region) {	
	var dst = 0;
	var time = new Date();
	var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000);
	var gmtTime = new Date(gmtMS);
	var day = gmtTime.getDate();
	var month = gmtTime.getMonth();
	var year = gmtTime.getYear();
	var ret = "";

	if (year < 1000) { year += 1900; }

	var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
	if (year % 4 == 0) { monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"); }
	if (year % 100 == 0 && year % 400 != 0) { monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"); }

	var hr = gmtTime.getHours() + zone;
	var min = gmtTime.getMinutes();
	var sec = gmtTime.getSeconds();
	
	if (hr >= 24) {
		hr = hr - 24;
		day -= -1;
	}
	if (hr < 0) {
		hr -= -24;
		day -= 1;
	}
	if (hr < 10) {
		hr = " " + hr;
	}
	if (min < 10) {
		min = "0" + min;
	}
	if (sec < 10) {
		sec = "0" + sec;
	}
	if (day <= 0) {
		if (month == 0) {
			month = 11;
			year -= 1;
		}
		else {
			month = month - 1;
		}
		day = monthDays[month];
	}
	if (day > monthDays[month]) {
		day = 1;
		if (month == 11) {
			month = 0;
			year -= -1;
		}
		else {
			month -= -1;
		}
	}

	if (region == "NAmerica") {
		var startDST = new Date();
		var endDST = new Date();
		startDST.setMonth(3);
		startDST.setHours(2);
		startDST.setDate(1);
		var dayDST = startDST.getDay();
		if (dayDST != 0) {
			startDST.setDate(8 - dayDST);
		}
		else {
			startDST.setDate(1);
		}
		endDST.setMonth(9);
		endDST.setHours(1);
		endDST.setDate(31);
		dayDST = endDST.getDay();
		endDST.setDate(31 - dayDST);
		var currentTime = new Date();
		currentTime.setMonth(month);
		currentTime.setYear(year);
		currentTime.setDate(day);
		currentTime.setHours(hr);
		if (currentTime >= startDST && currentTime < endDST) { dst = 1; }
	}
	else if (region == "Europe") {
		var startDST = new Date();
		var endDST = new Date();
		startDST.setMonth(2);
		startDST.setHours(1);
		startDST.setDate(31);
		var dayDST = startDST.getDay();
		startDST.setDate(31 - dayDST);
		endDST.setMonth(9);
		endDST.setHours(0);
		endDST.setDate(31);
		dayDST = endDST.getDay();
		endDST.setDate(31 - dayDST);
		var currentTime = new Date();
		currentTime.setMonth(month);
		currentTime.setYear(year);
		currentTime.setDate(day);
		currentTime.setHours(hr);
		if (currentTime >= startDST && currentTime < endDST) { dst = 1; }
	}
	else if (region == "SAmerica") {
		var startDST = new Date();
		var endDST = new Date();
		startDST.setMonth(9);
		startDST.setHours(0);
		startDST.setDate(1);
		var dayDST = startDST.getDay();
		if (dayDST != 0) {
			startDST.setDate(22 - dayDST);
		}
		else {
			startDST.setDate(15);
		}
		endDST.setMonth(1);
		endDST.setHours(11);
		endDST.setDate(1);
		dayDST = endDST.getDay();
		if (dayDST != 0) {
			endDST.setDate(21 - dayDST);
		}
		else {
			endDST.setDate(14);
		}
		var currentTime = new Date();
		currentTime.setMonth(month);
		currentTime.setYear(year);
		currentTime.setDate(day);
		currentTime.setHours(hr);
		if (currentTime >= startDST || currentTime < endDST) { dst = 1; }
	}
	else if (region == "Cairo") {
		var startDST = new Date();
		var endDST = new Date();
		startDST.setMonth(3);
		startDST.setHours(0);
		startDST.setDate(30);
		var dayDST = startDST.getDay();
		if (dayDST < 5) {
			startDST.setDate(28 - dayDST);
		}
		else {
			startDST.setDate(35 - dayDST);
		}
		endDST.setMonth(8);
		endDST.setHours(11);
		endDST.setDate(30);
		dayDST = endDST.getDay();
		if (dayDST < 4) {
			endDST.setDate(27 - dayDST);
		}
		else {
			endDST.setDate(34 - dayDST);
		}
		var currentTime = new Date();
		currentTime.setMonth(month);
		currentTime.setYear(year);
		currentTime.setDate(day);
		currentTime.setHours(hr);
		if (currentTime >= startDST && currentTime < endDST) { dst = 1; }
	}
	else if (region == "Israel") {
		var startDST = new Date();
		var endDST = new Date();
		startDST.setMonth(3);
		startDST.setHours(2);
		startDST.setDate(1);
		endDST.setMonth(8);
		endDST.setHours(2);
		endDST.setDate(25);
		dayDST = endDST.getDay();
		if (dayDST != 0) {
			endDST.setDate(32 - dayDST);
		}
		else {
			endDST.setDate(1);
			endDST.setMonth(9);
		}
		var currentTime = new Date();
		currentTime.setMonth(month);
		currentTime.setYear(year);
		currentTime.setDate(day);
		currentTime.setHours(hr);
		if (currentTime >= startDST && currentTime < endDST) { dst = 1; }
	}
	else if (region == "Beirut") {
		var startDST = new Date();
		var endDST = new Date();
		startDST.setMonth(2);
		startDST.setHours(0);
		startDST.setDate(31);
		var dayDST = startDST.getDay();
		startDST.setDate(31 - dayDST);
		endDST.setMonth(9);
		endDST.setHours(11);
		endDST.setDate(31);
		dayDST = endDST.getDay();
		endDST.setDate(30 - dayDST);
		var currentTime = new Date();
		currentTime.setMonth(month);
		currentTime.setYear(year);
		currentTime.setDate(day);
		currentTime.setHours(hr);
		if (currentTime >= startDST && currentTime < endDST) { dst = 1; }
	}
	else if (region == "Baghdad") {
		var startDST = new Date();
		var endDST = new Date();
		startDST.setMonth(3);
		startDST.setHours(3);
		startDST.setDate(1);
		endDST.setMonth(9);
		endDST.setHours(3);
		endDST.setDate(1);
		dayDST = endDST.getDay();
		var currentTime = new Date();
		currentTime.setMonth(month);
		currentTime.setYear(year);
		currentTime.setDate(day);
		currentTime.setHours(hr);
		if (currentTime >= startDST && currentTime < endDST) { dst = 1; }
	}
	else if (region == "Australia") {
		var startDST = new Date();
		var endDST = new Date();
		startDST.setMonth(9);
		startDST.setHours(2);
		startDST.setDate(31);
		var dayDST = startDST.getDay();
		startDST.setDate(31 - dayDST);
		endDST.setMonth(2);
		endDST.setHours(2);
		endDST.setDate(31);
		dayDST = endDST.getDay();
		endDST.setDate(31 - dayDST);
		var currentTime = new Date();
		currentTime.setMonth(month);
		currentTime.setYear(year);
		currentTime.setDate(day);
		currentTime.setHours(hr);
		if (currentTime >= startDST || currentTime < endDST) { dst = 1; }
	}

	if (dst == 1) {
		hr -= -1;
		if (hr >= 24) {
			hr = hr - 24;
			day -= -1;
		}
		if (hr < 10) {
			hr = " " + hr;
		}
		if (day > monthDays[month]) {
			day = 1;
			if (month == 11) {
				month = 0;
				year -= -1;
			}
			else {
				month -= -1;
			}
		}

		ret = monthArray[month] + " " + day + ", " + year + "\n" + hr + ":" + min + ":" + sec + "\nDST";
	}
	else {
		ret = monthArray[month] + " " + day + ", " + year + "\n" + hr + ":" + min + ":" + sec;
	}

	return ret;
}

/*
// Some examples:
alert('GMT: ' + worldClock(0, "Greenwich"));
alert('Vancouver: ' + worldClock(-8, "NAmerica"));
alert('SanFrancisco: ' + worldClock(-8, "NAmerica"));
alert('Seattle: ' + worldClock(-8, "NAmerica"));
alert('LosAngeles: ' + worldClock(-8, "NAmerica"));
alert('Denver: ' + worldClock(-7, "NAmerica"));
alert('MexicoCity: ' + worldClock(-6, "NAmerica"));
alert('Houston: ' + worldClock(-6, "NAmerica"));
alert('Minneapolis: ' + worldClock(-6, "NAmerica"));
alert('NewOrleans: ' + worldClock(-6, "NAmerica"));
alert('Chicago: ' + worldClock(-6, "NAmerica"));
alert('Montgomery: ' + worldClock(-6, "NAmerica"));
alert('Indianapolis: ' + worldClock(-5, "NAmerica"));
alert('Atlanta: ' + worldClock(-5, "NAmerica"));
alert('Detroit: ' + worldClock(-5, "NAmerica"));
alert('Miami: ' + worldClock(-5, "NAmerica"));
alert('WashingtonDC: ' + worldClock(-5, "NAmerica"));
alert('Philadelphia: ' + worldClock(-5, "NAmerica"));
alert('NewYork: ' + worldClock(-5, "NAmerica"));
alert('Montreal: ' + worldClock(-5, "NAmerica"));
alert('Boston: ' + worldClock(-5, "NAmerica"));
alert('BuenosAires: ' + worldClock(-3, "BuenosAires"));
alert('SaoPaulo: ' + worldClock(-3, "SAmerica"));
alert('RioDeJaneiro: ' + worldClock(-3, "SAmerica"));
alert('Lisbon: ' + worldClock(0, "Europe"));
alert('Dublin: ' + worldClock(0, "Europe"));
alert('London: ' + worldClock(0, "Europe"));
alert('Madrid: ' + worldClock(1, "Europe"));
alert('Barcelona: ' + worldClock(1, "Europe"));
alert('Paris: ' + worldClock(1, "Europe"));
alert('Brussels: ' + worldClock(1, "Europe"));
alert('Amsterdam: ' + worldClock(1, "Europe"));
alert('Frankfurt: ' + worldClock(1, "Europe"));
alert('Bern: ' + worldClock(1, "Europe"));
alert('Rome: ' + worldClock(1, "Europe"));
alert('Berlin: ' + worldClock(1, "Europe"));
alert('Prague: ' + worldClock(1, "Europe"));
alert('Vienna: ' + worldClock(1, "Europe"));
alert('Stockholm: ' + worldClock(1, "Europe"));
alert('Athens: ' + worldClock(2, "Europe"));
alert('Helsinki: ' + worldClock(2, "Europe"));
alert('Minsk: ' + worldClock(2, "Europe"));
alert('Istanbul: ' + worldClock(2, "Europe"));
alert('Cairo: ' + worldClock(2, "Cairo"));
alert('Jerusalem: ' + worldClock(2, "Israel"));
alert('Beirut: ' + worldClock(2, "Beirut"));
alert('Moscow: ' + worldClock(3, "Europe"));
alert('Baghdad: ' + worldClock(3, "Baghdad"));
alert('Dubai: ' + worldClock(4, "Dubai"));
alert('Bangkok: ' + worldClock(7, "Bangkok"));
alert('Jakarta: ' + worldClock(7, "Jakarta"));
alert('HongKong: ' + worldClock(8, "HongKong"));
alert('Beijing: ' + worldClock(8, "Beijing"));
alert('Shanghai: ' + worldClock(8, "Shanghai"));
alert('Seoul: ' + worldClock(9, "Seoul"));
alert('Tokyo: ' + worldClock(9, "Tokyo"));
alert('Melbourne: ' + worldClock(10, "Australia"));
alert('Sydney: ' + worldClock(10, "Australia"));
alert('Brisbane: ' + worldClock(10, "Brisbane"));
alert('Vladivostok: ' + worldClock(10, "Europe"));
alert('Kamchatka: ' + worldClock(12, "Europe"));
*/
