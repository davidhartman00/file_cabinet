function isDate (value) {
	arrayofdaysinmonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	// find the delimeter
	// DASH or SLASH
	// - or /
	checkfordash = value.indexOf("-");
	checkforslash = value.indexOf("/");
	checkfordot = value.indexOf(".");
	if (checkfordash >= 0) {
		thedelimiter = "-";
	} else if (checkforslash >= 0) {
			thedelimiter = "/";
	} else if (checkfordot >= 0) {
			thedelimiter = ".";
	} else {
			return false;
	}

	arrayofvalues = value.split(thedelimiter);
	if (arrayofvalues.length != 3) {
		return false;
	}
	if (isNaN(arrayofvalues[0]) || isNaN(arrayofvalues[1]) || isNaN(arrayofvalues[2])) {
		return false;
	}
	if (arrayofvalues[0].length > 2 || arrayofvalues[1].length > 2 || arrayofvalues[2].length != 4) {
		if(arrayofvalues[0].length > 2 || arrayofvalues[1].length > 2 || arrayofvalues[2].length != 2){
			return false;
		}
	}
	if(arrayofvalues[2].length == 2){
		presentYear = new Date().getFullYear();
		arrayOfYear = (''+presentYear).split('');
		lastTwo = arrayOfYear.slice(2);
		lastTwo = parseInt(lastTwo[0]+lastTwo[1]);
		if (parseInt(arrayofvalues[2]) <= (lastTwo + 5 )){
			arrayofvalues[2] = ''+parseInt(arrayofvalues[2]+ 2000);
		}else{
			arrayofvalues[2] = ''+parseInt(arrayofvalues[2]+ 1900);
		}
	}
	if (arrayofvalues[0] == '0' || arrayofvalues[1] == '0' || arrayofvalues[2] == '0') {
		return false;
	}
	if (parseInt(arrayofvalues[0]) > 12 || parseInt(arrayofvalues[0]) < 1) {
		return false;
	}
	if (parseInt(arrayofvalues[0]) != 2) {
		if (parseInt(arrayofvalues[1]) > parseInt(arrayofdaysinmonth)) {
			return false;
		}
	} else {
		if (isLeap(arrayofvalues[2])) {
			if (parseInt(arrayofvalues[1]) > 29) {
				return false;
			}
		} else {
			if (parseInt(arrayofvalues[1]) > 28) {
				return false;
			}
		}
	}
	if (parseInt(arrayofvalues[2]) < 1900 || parseInt(arrayofvalues[2]) > 2100) {
		return false;
	}

	return true;
}