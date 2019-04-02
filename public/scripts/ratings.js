$(document).ready(function() {
	const ratingBar = $('.ui.rating');
	const ratingValue = $('#rating-value');
	const submitButton = $('#submit-button');

	ratingValue.val(null);

	ratingBar.rating().click(function() {
		ratingValue.val(ratingBar.rating('get rating'));
	});

	submitButton.click(function(e) {
		if (ratingValue.val() < 1) {
			e.preventDefault();
			alert('Please rate!');
		}
	});
});
