window.addEventListener("DOMContentLoaded", () => {
	document.getElementById("prompt_button").addEventListener("click", myFunction);
	function myFunction()
	{
		let response = window.prompt('Prompt');
		console.log(response);
	}
});	