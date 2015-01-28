define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var ThemePageHeaderView = Backbone.View.extend({

		initialize: function() {
			this.setStyles();
			this.listenTo(Adapt, 'device:resize', this.setStyles);
			this.listenTo(Adapt, 'remove', this.remove);
		},

		events: {
			"click .page-header-scroll-button": "onScrollButtonClicked"
		},

		setStyles: function() {
			this.setBackground();
			this.setMinHeight();
		},

		setBackground: function() {
			var backgroundImage = '';
			var backgroundImages = this.model.get('_pageHeaderConfig')._backgroundImage;

			var backgroundColor = this.model.get('_pageHeaderConfig')._backgroundColor;

			if (backgroundImages) {

				if (Adapt.device.screenSize == 'large') {
					backgroundImage = backgroundImages._large;
				} else if (Adapt.device.screenSize == 'medium') {
					backgroundImage = backgroundImages._medium;
				} else {
					backgroundImage = backgroundImages._small;
				};

				this.$el.css({
					backgroundImage: 'url(' + backgroundImage + ')'
				});

			} else if (backgroundColor) {
				this.$el.css({
					backgroundColor: backgroundColor
				});
			}
		},

		setMinHeight: function() {
			var minHeight = 0;
			var minHeights = this.model.get('_pageHeaderConfig')._minimumHeaderHeights;
			if (minHeights) {

				if (Adapt.device.screenSize == 'large') {
					minHeight = minHeights._large;
				} else if (Adapt.device.screenSize == 'medium') {
					minHeight = minHeights._medium;
				} else {
					minHeight = minHeights._small;
				}
			}

			this.$el.css({
				minHeight: minHeight + "px"
			});
		},

		onScrollButtonClicked: function(event) {
			if (event) event.preventDefault();
			var offset = this.$el.height();
			$("html, body").velocity("scroll", {
				duration: 800,
				offset: offset + "px",
				mobileHA: false 
			});
		}

	});

	return ThemePageHeaderView;
	
});