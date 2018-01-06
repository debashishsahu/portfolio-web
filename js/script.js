/*-------------------------------------------
Float Sidebar in home page
---------------------------------------------*/

function floatingDiv() {
  var $floatingElement = $("#hero");
  if (window.innerWidth > 1023) {
      $floatingElement.css('height', '100vh');
      let
          maxY = $('footer').offset().top - $floatingElement.outerHeight(),
          y = $(window).scrollTop();

      if ($floatingElement) {
          if (y == 0) {
              $floatingElement.removeClass("div-top div-middle div-bottom").addClass("div-top").css({ "top": "" });
          } 
          else if (y < maxY) {
              $floatingElement.removeClass("div-top div-middle div-bottom").addClass("div-middle").css({ "top": "" });
          } 
          else if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $floatingElement.css('height', '100vh').css('height', '-='+$('footer').outerHeight());
            
            maxY = $('footer').offset().top - $floatingElement.outerHeight();
            $floatingElement.removeClass("div-top div-middle div-bottom").addClass("div-bottom").css({ "top": maxY + "px" });
          }
      }
  }
};

$( window ).scroll(function(e) {
  floatingDiv();
});


  /*-------------------------------------------
Api call for sending email
---------------------------------------------*/
var message = "";
var emailSentModal = $('#emailSentModal');

// When the user clicks on <span> (x), close the modal
$(".closeEmailModal").click(function() {
    emailSentModal.fadeOut();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == emailSentModal) {
        emailSentModal.fadeOut();
    }
}

//$("#sendMessage").on("click", function() {
function submitForm() {
  // body...
    message = $("#contact-form").serialize();
    var userName = $("#miniusername").val();
    var userEmail = $("#miniemail").val();
    var userDescription = $("#message").val();
    var bodyData = {name: userName, email: userEmail, description: userDescription};

    var formspreeUrl = "//formspree.io/debashish.sahu@imaginea.com";
    console.log(formspreeUrl);

    /*$.ajax({
        url: formspreeUrl, 
        type: "POST",
        data: {name: userName, email: userEmail, description: userDescription},
        dataType: "json",
        success: function(data){
          emailSentModal.fadeIn();
          $("#miniusername").val("");
          $("#miniemail").val("");
          $("#message").val("");
        }
    });
    return false;*/
    var xhr = new XMLHttpRequest();
    xhr.open('POST', formspreeUrl, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onloadend = function (res) {
      if (res.target.status === 200){
        emailSentModal.fadeIn();
          $("#miniusername").val("");
          $("#miniemail").val("");
          $("#message").val("");
      } else {
        console.log("error");
      }
    }

    xhr.send(bodyData);
}
//});

$(function() {

  /*-------------------------------------------
Animate menu button
---------------------------------------------*/
  $("#navButton").click(function(e){
    e.preventDefault();
    $(".navigationBar").toggleClass("menu-bar-animate");
    $(".navigationBar nav").fadeToggle(500);
    //$("body").toggleClass("remove-scroll");
  });

  $("#navButton").hover(function(e){
    $(".custom-menu-bar").toggleClass("highlight");
  });

  $(".menu-fullscreen li").click(function(e){
    $(".navigationBar nav").fadeOut(500);
    $(".navigationBar").removeClass("menu-bar-animate");
    $(".menu-fullscreen li.active").removeClass('active');
    $(this).addClass('active');
  });


/*-------------------------------------------
Load Page
---------------------------------------------*/

	$('body').waitForImages({
		finished: function() {
				Website();
				$('body').jKit();
		},
		waitForAll: true
	});


/*-------------------------------------------
Ajax link page transitions
---------------------------------------------*/

	$("a.ajax-link").live("click", function(){
		$this = $(this);
		var link = $this.attr('href');
		var current_url = $(location).attr('href');

		if( link != current_url && link != '#' ) {
		$.ajax({
			url:link,
			processData:true,
			dataType:'html',
			success:function(data){
				document.title = $(data).filter('title').text();
				current_url = link;
        if (typeof history.pushState != 'undefined') history.pushState(data, 'Page', link);

          setTimeout(function(){
          $('#preloader').delay(50).fadeIn(600);
          $('html, body').delay(1000).animate({ scrollTop:  0  },1000);

					setTimeout(function(){

            $('#ajax-content').html($(data).filter('#ajax-content').html());
            $('#ajax-sidebar').html($(data).filter('#ajax-sidebar').html());

						$('body').waitForImages({
							finished: function() {
								Website();
								backLoading();
								$('.opacity-nav').delay(50).fadeOut(600);
              },
              waitForAll: true
						});
					},1000);
					},0);
			}
		});
    }
    return false;
	});


/*-------------------------------------------
When you click back arrow
---------------------------------------------*/


function backLoading() {
    $(window).on("popstate", function () {
        $('body').fadeOut('slow',function(){
            location.reload();
        });
        $('body').fadeIn();
    });
}

/*-------------------------------------------
Load Page - next Open Site
---------------------------------------------*/

function Website() {
		CheckScripts();
		Masonry();
		$('body').jKit();
		backgroundmenu();
		setTimeout(function(){
			$(".preloader").fadeOut(500);
		},2000);
		setTimeout(function(){
			$('header').fadeIn();
		},500);
}


/*-------------------------------------------
Init and check list scripts
---------------------------------------------*/

function CheckScripts() {

  $(document).ready(function(){
    preloaderCheck();
    Typewriting();
    sidebarhero();
  });

}


/*-------------------------------------------
Masonry Check Script
---------------------------------------------*/

function Masonry() {
       var $container = $('.portfolio-grid');

       $container.imagesLoaded( function(){
         $container.masonry({
           itemSelector : 'li'
         });
       });
}


/*-------------------------------------------
Multi purpose init Background menu
---------------------------------------------*/

function backgroundmenu() {

  $(document).ready(function(){
     if($("#header-fade").length) {

         $(window).scroll(function(){
            if ($(this).scrollTop() > 10) {
                $('header').fadeOut();
            } else {
                $('header').fadeIn();
            }
        });
     }

     if($("#header-white").length) {

         $(window).scroll(function(){
            if ($(this).scrollTop() > 10) {
                $('header').css( "background", "white" );
                $('header .logo > a').css( "borderBottom", "0" );

            } else {
                $('header').css( "background", "none" );
            }
        });
     }


  });

}

/*-------------------------------------------
Typewriting init script
---------------------------------------------*/

function Typewriting() {


$(document).ready(function(){
	setTimeout( function(){
		if($("#site-type").length) {
        $(".typewrite span").typed({
            strings: ["Interaction ", "User Experience "],
            typeSpeed: 80,
            backDelay: 500,
            loop: true,
            contentType: 'html', // or text
            // defaults to false for infinite loop
            loopCount: false,
        });
    }
	}, 3000);
});
}


/*-------------------------------------------
Amazing Fade with scroll Sidebar
---------------------------------------------*/

function sidebarhero() {

  /*if($("#hero").length) {
    var fadeStart=100,fadeUntil=800,fading = $('#hero');

    $(window).bind('scroll', function(){
        var offset = $(document).scrollTop()
            ,opacity=0
        ;
        if( offset<=fadeStart ){
            opacity=1;
        }else if( offset<=fadeUntil ){
            opacity=1-offset/fadeUntil;
        }
        fading.css('opacity',opacity);
    });
  }*/
}


/*-------------------------------------------
Open Check Scription
---------------------------------------------*/

function OpenCheck() {
    setTimeout(function() {
        hidePreloader();
    }, 1000);
}


/*-------------------------------------------
Check Preloader
---------------------------------------------*/

function preloaderCheck() {
    showPreloader();
    $(window).load(function() {
        hidePreloader();
    });
}

/*-------------------------------------------
Functions Show / Hide Preloader
---------------------------------------------*/

function showPreloader() {
  $(".preloader").fadeIn("slow");
}

function hidePreloader() {
  $(".preloader").delay(2000).fadeOut("slow");
}



})//End
