define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var ThemeArticleView = Backbone.View.extend({

		initialize: function() {
			this.setStyles();
			this.listenTo(Adapt, 'device:resize', this.setStyles);
			this.listenTo(Adapt, 'remove', this.remove);
		},

		setStyles: function() {
			this.setBackground();
		},

		setBackground: function() {
			var backgroundImage = '';
			var backgroundImages = this.model.get('_themeArticleConfig')._backgroundImage;

			var backgroundColor = this.model.get('_themeArticleConfig')._backgroundColor;
			
			if (backgroundImages) {

				if (Adapt.device.screenSize == 'large') {
					backgroundImage = backgroundImages._large;
				} else if (Adapt.device.screenSize == 'medium') {
					backgroundImage = backgroundImages._medium;
				} else {
					backgroundImage = backgroundImages._mobile;
				}

				this.$el.css({
					backgroundImage: 'url(' + backgroundImage + ')'
				});
				
			} else if (backgroundColor) {
				this.$el.css({
					backgroundColor: backgroundColor
				});
			}
		}

	});

	return ThemeArticleView;
	
});