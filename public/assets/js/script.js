
//function that captures input from textarea, validates it, 
//and then posts it to the server.
function createBurger(burger) {
	let input = burger || $('#burger').val().trim();
	input = input.charAt(0).toUpperCase() + input.slice(1);
	let clean = /^[a-zA-Z][a-zA-Z0-9 \-']+$/.test(input);
	$('#burger').val('');
	if (clean) {
		$('#burger').attr('placeholder', '');
		let burger = {};
		burger.burger_name = input;
		$.post('/api/burger', burger).then(function (response) {
			location.reload();
		});
	} else {
		$('#burger').attr('placeholder', 'Input may not be empty or contain special characters')
	}
}

//initializing annyang speech-to-text functionality
if (annyang) {

	// property defines command, passes
	//anything said after 'add' as an argument to 
	//createBurger function and calls it.
	var commands = {
		'add *burger': createBurger
	};

	// Add our commands to annyang 
	annyang.addCommands(commands);

	// Start listening. 
	annyang.start();
} else {
	let h4 = $('<h4>');
	h4.addClass('warning text-center')
	  .text('Your browser doesn\'t support speech recognition')
	  .prependTo('form');
}

//event listener for submit button
$('#submit').on('click', function (event) {
	event.preventDefault();
	createBurger();
});

//event listener for enter key
$('#burger').keydown(function (e) {
 var key = e.which;
 if(key == 13) // the enter key code
  {
   createBurger();  
  }
});

//event listener for devour buttons to execute put request
$(document).on('click', '.devour', function (event) {
	event.preventDefault();
	let id = $(this).attr('id');
	console.log(id)
	$.ajax('/api/'+id, {
		type: 'PUT'
	}).then(function () {
		location.reload();
	});
});
