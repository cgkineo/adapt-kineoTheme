define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var ThemePageHeaderView = Backbone.View.extend({

		initialize: function() {
			this.setup();
			this.listenTo(Adapt, 'device:resize', this.setBackground);
			this.listenTo(Adapt, 'remove', this.remove);
		},

		setup: function() {
			this.setBackground();
		},

		setBackground: function() {
			var backgrounImage = '';
			var backgrounds = this.model.get('_pageHeaderConfig')._backgroundImage;
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

	return ThemePageHeaderView;
	
});