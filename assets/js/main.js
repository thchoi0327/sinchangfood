/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href');

							// ✅ [이 줄을 추가하세요]
						if (!id || id.charAt(0) !== '#') return;

						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function () {
								// Activate section
								$section.removeClass('inactive');
							  
								if ($nav_a.filter('.active-locked').length == 0) {
									$nav_a.removeClass('active');
									$this.addClass('active');
								
									// ✅ 스크롤해서 보이도록
									$this[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
								  } else if ($this.hasClass('active-locked')) {
									$this.removeClass('active-locked');
								  }
							  }
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
			.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});


		// 모바일 스와이프 감지 (열기)
		let touchStartX = null;

		window.addEventListener('touchstart', function (e) {
		if (e.touches.length === 1) {
			touchStartX = e.touches[0].clientX;
		}
		});

		window.addEventListener('touchend', function (e) {
		if (!touchStartX) return;

		let touchEndX = e.changedTouches[0].clientX;
		let deltaX = touchStartX - touchEndX;

		// 오른쪽 → 왼쪽으로 강하게 스와이프 (예: 100px 이상)
		if (deltaX > 50) {
			// 모바일 화면에서만 동작하게 제한
			if (window.innerWidth <= 980) {
			$('body').addClass('header-visible'); // 메뉴 열기
			}
		}

		touchStartX = null;
		});

})(jQuery);