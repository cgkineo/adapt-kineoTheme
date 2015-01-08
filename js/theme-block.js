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
		}

	});

	return ThemeBlockView;
	
});