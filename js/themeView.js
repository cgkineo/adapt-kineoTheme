define([ "core/js/adapt" ], function(Adapt) {

	var ThemeView = Backbone.View.extend({

		className: function() {},

		initialize: function() {
			this.setStyles();

			this.listenTo(Adapt, {
				"device:resize": this.onDeviceResize,
				"remove": this.remove
			});
		},

		onDeviceResize: function() {
			this.setStyles();
		},

		remove: function() {
			Backbone.View.prototype.remove.call(this);

			this.onRemove();
		},

		setStyles: function() {
			this.setClasses();
			this.setBackground();
			this.setCustomStyles();
		},

		setClasses: function() {
			this.$el.addClass(this.className());
		},

		setBackground: function() {
			var backgroundImages = this.model.get("_backgroundImage");

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

			this.$el
				.addClass("has-background-image")
				.css("background-image", "url(" + backgroundImage + ")");
		},

		setCustomStyles: function() {},

		onRemove: function() {}

	});

	return ThemeView;

});
