$('#refreshLogo').addClass('fa-spin');
$(document).ready(function(){
	$('#btcstats').click(function(e){
		e.preventDefault();
		$('#mainBody').load('bitcoin.html');
	});
	$('#sysstats').click(function(e){
		e.preventDefault();
		$('#mainBody').load('system.html');
	});
	
	$('#refreshLogo').removeClass('fa-spin');
});