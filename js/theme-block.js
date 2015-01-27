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
			var backgrounds = this.model.get('_themeBlockConfig')._backgroundImage;
			
			if (backgrounds) {

				if (Adapt.device.screenSize == 'large') {
					backgroundImage = backgrounds._desktop;
				} else {
					backgroundImage = backgrounds._mobile;
				}
			}

			this.$el.css({
				backgroundImage: 'url(' + backgroundImage + ')'
			});
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