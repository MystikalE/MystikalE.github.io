<!DOCTYPE html>
<html lang="en">
<head>
	<title>
		VacStatus @yield('title')
	</title>
	
	@include('layout.head')
</head>
<body>

	<div id="app"></div>

	<div class="container"><div class="notification"></div></div>
	
	<script>
		var flashNotification = {
			 @if(session('success'))
				type: 'success',
				message: '{{ session('success') }}'
			@elseif(session('error'))
				type: 'error',
				message: '{{ session('error') }}'
			@endif
		};
	</script>

	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
	<script src="/js/all.js"></script>

	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-50795838-1', 'auto');
		ga('send', 'pageview');
	</script>
</body>
</html>