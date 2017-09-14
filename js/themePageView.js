define([ "./themeView", "core/js/adapt" ], function(ThemeView, Adapt) {

	var ThemePageView = ThemeView.extend({

		className: function() {
			return this.model.get("_classes");
		},

		events: {
			"click .page-header-scroll-button-inner": "onScrollButtonClick"
		},

		setCustomStyles: function() {
			this.setThemePalette();
			this.processHeaderAndFooter();
		},

		setThemePalette: function() {
			$("html").addClass(this.model.get("_themePalette"));
		},

		processHeaderAndFooter: function() {
			var header = this.model.get("_pageHeader");
			var footer = this.model.get("_pageFooter");
			var $header = this.$(".page-header");
			var $footer = this.$(".page-footer");

			if (header) {
				this.setElementBackground($header, header);
				this.setElementMinHeight($header, header);
			}

			if (footer) {
				this.setElementBackground($footer, footer);
				this.setElementMinHeight($footer, footer);
			}
		},

		setElementBackground: function($element, config) {
			var backgroundImages = config._backgroundImage;

			if (!backgroundImages) return;

			var backgroundImage;

			switch (Adapt.device.screenSize) {
				case "large":
					backgroundImage = backgroundImages._large;
					break;
				case "medium":
					backgroundImage = backgroundImages._medium;
					break;
				default:
					backgroundImage = backgroundImages._small;
			}

			if (!backgroundImage) return;

			$element
				.addClass("has-background-image")
				.css("background-image", "url(" + backgroundImage + ")");
		},

		setElementMinHeight: function($element, config) {
			var minHeights = config._minimumHeights;

			if (!minHeights) return;

			var minHeight;

			switch (Adapt.device.screenSize) {
				case "large":
					minHeight = minHeights._large;
					break;
				case "medium":
					minHeight = minHeights._medium;
					break;
				default:
					minHeight = minHeights._small;
			}

			if (minHeight) $element.css("min-height", minHeight + "px");
		},

		onScrollButtonClick: function() {
			Adapt.scrollTo('.article', { duration: 800 });
		},

		onRemove: function() {
			$("html").removeClass(this.model.get("_themePalette"));
		}

	});

	return ThemePageView;

});
