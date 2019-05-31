jQuery(document).ready(function() {

	var fade = 0; //default state is set to no fade same as 0
	var status = "<?php echo ($_GET['status']);?>";

	jQuery('input').mousedown(function() { //on click on the input element 

		jQuery(".container").css("opacity", "initial"); //opacity is set to the intiall 100%

	  fade = 1; //fade is set to 1 this means that it will stay 100% opacity no mate what

	});

	jQuery(window).mousedown(function () { //when the user clicks out the elment it changes the fade to 0.6

	    jQuery('.container').css("opacity", "0.6"); //css class for container is set to 0.6

	    fade = 0; //fade is set to opacity of 0.6

	});
	 
	jQuery('.container').mousedown(function (event) { 
	    
	    event.stopPropagation();

	});

	jQuery('.container').mouseenter(function() { //when the mouse enter the container the opacity is set to initial

	  jQuery(this).css("opacity", "initial"); //opacity = initial

	  jQuery(this).css("transition", "0.3s"); //transition of opacity

	});

	jQuery('.container').mouseleave(function() { // when the mouse leaves
		
		  if(fade == 0) { // if the fade var equals 0 then set opacity to 0.6

			  jQuery(this).css("opacity", "0.6"); //css class for container is set to 0.6

			  jQuery(this).css("transition", "0.3s"); //transition of opacity


		  } else { //else if the dosnt leave

		  	jQuery(this).css("opacity", "initial"); //opacity = initial

		  }
		//   fade = 1;
		//   if(fade == 0) { // if the fade var equals 0 then set opacity to 0.6

		// 	  jQuery(this).css("opacity", "intial"); //css class for container is set to initial

		// 	  jQuery(this).css("transition", "0.3s"); //transition of opacity

		//   } else { //else if the dosnt leave

		//   	jQuery(this).css("opacity", "0.6"); //opacity = initial

		//   	jQuery(this).css("transition", "0.3s"); //transition of opacity

		// }

	});

});