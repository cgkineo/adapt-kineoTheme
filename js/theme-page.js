define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	
	var ThemePageView = Backbone.View.extend({

		initialize: function() {
			this.setStyles();
			this.listenTo(Adapt, 'device:changed', this.setStyles);
			this.listenTo(Adapt, 'remove', this.onRemove);
		},

		events: {
			"click .page-header-scroll-button-inner": "onScrollButtonClicked"
		},

		setStyles: function() {
			this.setThemePalette();
			this.addPageClasses();
			this.setBackground();
			this.setMinHeight();
		},

		setThemePalette: function() {
			var themePalette = this.model.get('_themePageConfig')._themePalette;

			$('html').removeClass(Adapt.course._last);

			if (themePalette) {
				$('html').addClass(themePalette);
				Adapt.course._last = themePalette;
			}
		},

		onRemove: function() {
			this.remove();
			
			var themePalette = this.model.get('_themePageConfig')._themePalette;

			if (themePalette) {
				$('html').removeClass(themePalette);
			}
		},

		addPageClasses: function() {
			var pageClasses = this.model.get('_classes');

			if (pageClasses) {
				this.$el.addClass(pageClasses);
			}
		},

		setBackground: function() {
			var pageHeader = this.model.get('_themePageConfig')._pageHeader;
			var pageFooter = this.model.get('_themePageConfig')._pageFooter;

			if (pageHeader) {
				var backgroundColor = this.model.get('_themePageConfig')._pageHeader._backgroundColor;

				if (backgroundColor) {
					this.$('.page-header').css({
						backgroundColor: backgroundColor
					});
				};

				var backgroundImage = '';
				var backgroundImages = this.model.get('_themePageConfig')._pageHeader._backgroundImage;

				if (backgroundImages) {
					if (Adapt.device.screenSize == 'large') {
						backgroundImage = backgroundImages._large;
					} else if (Adapt.device.screenSize == 'medium') {
						backgroundImage = backgroundImages._medium;
					} else {
						backgroundImage = backgroundImages._small;
					};

					this.$('.page-header').css({
						backgroundImage: 'url(' + backgroundImage + ')'
					});

				}
			};

			if (pageFooter) {
				var backgroundColor = this.model.get('_themePageConfig')._pageFooter._backgroundColor;
				
				if (backgroundColor) {
					this.$('.page-footer').css({
						backgroundColor: backgroundColor
					});
				};

				var backgroundImage = '';
				var backgroundImages = this.model.get('_themePageConfig')._pageFooter._backgroundImage;

				if (backgroundImages) {
					if (Adapt.device.screenSize == 'large') {
						backgroundImage = backgroundImages._large;
					} else if (Adapt.device.screenSize == 'medium') {
						backgroundImage = backgroundImages._medium;
					} else {
						backgroundImage = backgroundImages._small;
					};

					this.$('.page-footer').css({
						backgroundImage: 'url(' + backgroundImage + ')'
					});

				}
			}
		},

		setMinHeight: function() {
			var pageHeader = this.model.get('_themePageConfig')._pageHeader;
			var pageFooter = this.model.get('_themePageConfig')._pageFooter;

			if (pageHeader) {
				var minHeight = 0;
				var minHeights = this.model.get('_themePageConfig')._pageHeader._minimumHeights;

				if (minHeights) {
					if (Adapt.device.screenSize == 'large') {
						minHeight = minHeights._large;
					} else if (Adapt.device.screenSize == 'medium') {
						minHeight = minHeights._medium;
					} else {
						minHeight = minHeights._small;
					}
				}

				this.$('.page-header').css({
					minHeight: minHeight + "px"
				});
			};

			if (pageFooter) {
				var minHeight = 0;
				var minHeights = this.model.get('_themePageConfig')._pageFooter._minimumHeights;

				if (minHeights) {
					if (Adapt.device.screenSize == 'large') {
						minHeight = minHeights._large;
					} else if (Adapt.device.screenSize == 'medium') {
						minHeight = minHeights._medium;
					} else {
						minHeight = minHeights._small;
					}
				}

				this.$('.page-footer').css({
					minHeight: minHeight + "px"
				});
			}
		},

		onScrollButtonClicked: function(event) {
			if (event) event.preventDefault();

			var offset = this.$('.page-header').height();
			
			$("html, body").velocity("scroll", {
				duration: 800,
				offset: offset + "px",
				mobileHA: false 
			});
		}

	});

	return ThemePageView;
});
