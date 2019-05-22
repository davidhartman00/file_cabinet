// Script Name..: preventDoubleClick.js
// Date Created.: 08/10/2017
// Author.......: David Hartman
// Description..: prevent double clikc across a large web site
//



	/*
	Below... here you will two versions of the "prevent double click".
	The first just prevents, with the option of a message
	The secound instutes a counter, so that the Fn can pop an alert if X
	times or more clicks happen (presently set to 3 times)
	*/

$(window).on("load", function(){
	
		$(document).on('click', 'a, :button, input[type=submit]', function(e){
			var lastClicked = $.data(this,'lastClicked'),
			now = new Date().getTime();
			if(lastClicked && (now - lastClicked < 2000)) {
				e.preventDefault()

// you can alert the user to their double click if you would like
// alert('Your Request is received and being processed. \n Please allow the servers time to finish your request')

			}
			else {
				$.data(this, 'lastClicked', now)
			}
		})


/*
Below... if you would like a message after target is clicked 3 or more times.
*/
		$(document).on('click', 'a, :button, input[type=submit]', function(e){
			var lastClicked = $.data(this,'lastClicked')
			var timesClicked = $.data(this, 'timesClicked')
			counter = 0

			now = new Date().getTime();

// console.log(lastClicked, "lastClicked");
// console.log(this, "this");
// console.log(e.target, "target");
// console.log(now, "now");
// console.log(timesClicked, 'timesClicked');

			if(lastClicked && (now - lastClicked < 2000)) {
				timesClicked ++
				e.preventDefault()
				$.data(this, 'timesClicked', timesClicked)
					if (timesClicked && timesClicked > 2) {

						alert('Your Request is received and being processed. \n Please allow the servers time to finish your request')
					}


			}
			else {
				counter++
				$.data(this, 'lastClicked', now)
				$.data(this, 'timesClicked', counter)
			}
		})


})
