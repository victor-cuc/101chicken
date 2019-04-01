// $(document).ready(function() {
//   const buttons = $(".ui.menu").find(".ui.item");

//   for (var i=0; i<buttons.length; i++) {
//     buttons[i].click(function() {
//       var current = $(".active.item");
//       current[0].className = current[0].className.replace(" active", "");
//       this.className += " active";
//     });
//   }
// });

// $(function() {
//   $(".ui.item").click(function() {
//      // remove classes from all
//      $(".ui.item").removeClass("active");
//      // add class to the one we clicked
//      $(this).addClass("active");
//   });
// });
// function setActiveLink(setActive){
//   if ($(".item").hasClass('active'))
//       $(".item").removeClass('active');
//   if (setActive)
//       $("#"+setActive).addClass('active');
// }

// $(function() {
//   $(".item").click(function() {
//       setActiveLink(this.id);
//   });
// });

$(document).ready(function() {
	$(function() {
		var current = location.pathname;
		$('#nav a').each(function() {
			var $this = $(this);
			// if the current path is like this link, make it active
			console.log(current);
			console.log($this.attr('href'));
			if ($this.attr('href') === current) {
				$this.addClass('active');
			}
		});
	});
});
