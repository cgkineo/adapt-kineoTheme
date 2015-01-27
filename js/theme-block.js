define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var ThemeBlockView = Backbone.View.extend({

		initialize: function() {
			this.setStyles();
			this.listenTo(Adapt, 'device:resize', this.setStyles);
			this.listenTo(Adapt, 'remove', this.remove);
		},

		setStyles: function() {
			this.setBackground();
			this.setMinHeight();
		},

		setBackground: function() {
			var backgroundImage = '';
			var backgroundImages = this.model.get('_themeBlockConfig')._backgroundImage;

			var backgroundColor = this.model.get('_themeBlockConfig')._backgroundColor;
			
			if (backgroundImages) {

				if (Adapt.device.screenSize == 'large') {
					backgroundImage = backgroundImages._desktop;
				} else {
					backgroundImage = backgroundImages._mobile;
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
			var minHeights = this.model.get('_themeBlockConfig')._minimumBlockHeights;

			if (minHeights) {

				if(Adapt.device.screenSize == 'large') {
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
		}

	});

	return ThemeBlockView;
	
});