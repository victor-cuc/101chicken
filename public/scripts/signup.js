$(document).ready(function() {
	const loginForm = $('#registration-form');
	loginForm.form({
		fields: {
			name: {
				identifier: 'username',
				rules: [
					{
						type: 'empty',
						prompt: 'Please enter a username'
					}
				]
			},
			password: {
				identifier: 'password',
				rules: [
					{
						type: 'empty',
						prompt: 'Please enter a password'
					},
					{
						type: 'minLength[6]',
						prompt: 'Your password must be at least {ruleValue} characters'
					}
				]
			}
		}
	});
});
