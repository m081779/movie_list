
//function that captures input from textarea, validates it, 
//and then posts it to the server.
function createmovie(movie) {
	console.log('asdfasdfasdf',$('#movie'))
	let input = movie || $('#movie').val().trim();
	input = input.charAt(0).toUpperCase() + input.slice(1);
	let clean = /^[a-zA-Z][a-zA-Z0-9 \-']+$/.test(input);
	$('#movie').val('');
	if (clean) {
		$('#movie').attr('placeholder', '');
		let movie = {};
		movie.movie_name = input;
		$.post('/api/movie', movie).then(function (response) {
			location.reload();
		});
	} else {
		$('#movie').attr('placeholder', 'Input may not be empty or contain special characters')
	}
}

//initializing annyang speech-to-text functionality
if (annyang) {

	// property defines command, passes
	//anything said after 'add' as an argument to 
	//createmovie function and calls it.
	var commands = {
		'add *movie': createmovie
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
	createmovie();
});

//event listener for enter key
$('#movie').keydown(function (e) {
 var key = e.which;
 if(key == 13) // the enter key code
  {
   createmovie();  
  }
});

//event listener for watch buttons to execute put request
$(document).on('click', '.watch', function (event) {
	event.preventDefault();
	let id = $(this).attr('id');
	console.log(id)
	$.ajax('/api/'+id, {
		type: 'PUT'
	}).then(function () {
		location.reload();
	});
});
