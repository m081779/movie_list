let idArr = [];
let vidId = '';
//function that captures input from textarea, validates it, 
//and then posts it to the server.
function createmovie(movie) {
	let input = movie || $('#movieInput').val().trim();
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

function queryMovie(movie, event, element) {
	let queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=d3306ff0";
	getVideo(movie+" movie trailer");
	console.log('movie from query:', movie)
	$.ajax({
		url: queryURL,
		type: 'GET'
	}).done((movieData)=>{
		console.log('movieData from get request:',movieData)
		showMovieModal(movieData);
		positionModal(event, element)
	});
}

function positionModal(event, element) {
	let x = event.originalEvent.x;
	console.log(topOitem, leftOitem)
	// $('#movieModal').css({
	// 	'top': element.offset().top - $('#movieModal').height() - element.height()*1.5,
	// });
}

function showMovieModal(data) {
	let {Title, Plot, imdbRating, year, Runtime, Actors} = data;
	$('#movieTitle').text('');
	$('#movieRatings').text('');
	$('#movieActors').text('');
	$('#moviePlot').text('');
	if (data) {		
		$('#movieModal').show();
	} 
	if (data.Error) {
		$('#movieTitle').text('No information for this movie');
		$('#movieRatings').hide().val('');
		$('#movieActors').hide().val('');
		$('#moviePlot').hide().val('');
	} else {
		for (var i = 0; i < data.Ratings.length; i++) {
			let {Source, Value} = data.Ratings[i];
			let li = $('<li class="rating">')
						.text(`${Source}: ${Value}`)
						.appendTo('#movieRatings');
			if (i !== data.Ratings.length - 1) {
				$('#movieRatings').append('<li>|</li>');
			}
		}
		$('#movieRatings').show();
		$('#movieTitle').text(Title);
		$('#movieActors').show().text(`Starring: ${Actors}`);
		$('#moviePlot').show().text(Plot);
	}
}

function hideMovieModal() {
	$('#movieModal').hide();
}

function init() {
	gapi.client.setApiKey('AIzaSyBlwnFUqu7sXdnRvYhnrEDn7ZMgOulZW2k');
	gapi.client.load('youtube', 'v3', function () {
		//youtube api is ready
	})
}

function getVideo(movie) {	
	idArr = [];
	let request = gapi.client.youtube.search.list({
		part: 'snippet',
		type: 'video',
		q: encodeURIComponent(movie).replace(/%20/g, '+'),
		maxResults: 20,
		order: 'viewCount',

	});

	request.execute(function (result) {
		if (result) {
			for (var i = 0; i < result.items.length; i++) {
				idArr.push(result.items[i].id.videoId)
			}
			vidId = idArr[0];
			let url = `https://www.youtube.com/embed/${idArr[0]}`;
			$('#trailer').attr('src', url)
		}
	});
}

function showNextTrailer() {
	let index = idArr.indexOf(vidId);
	vidId = idArr[index+1];
	let url = `https://www.youtube.com/embed/${vidId}`;
	$('#trailer').attr('src', url)
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
$('#movieInput').keydown(function (e) {
	let key = e.which;
	if(key == 13) {
		createmovie();  
	}
});

//event listener for watch buttons to execute put request
$(document).on('click', '.watch', function (event) {
	event.preventDefault();
	let id = $(this).attr('id');
	$.ajax('/api/'+id, {
		type: 'PUT'
	}).then(function () {
		location.reload();
	});
});

$(document).on('click', '.movieName', function (event) {
	event.preventDefault();
	let movie = $(this).data('moviename');
	queryMovie(movie, event, $(this));
});

$('.close').on('click', function (event) {
	event.preventDefault();
	hideMovieModal();
});

$('#nextButton').on('click', function (event) {
	event.preventDefault();
	showNextTrailer();
});