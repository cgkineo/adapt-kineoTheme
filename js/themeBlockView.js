define([ "./themeView", "core/js/adapt" ], function(ThemeView, Adapt) {

	var ThemeBlockView = ThemeView.extend({

		className: function() {
			return this.model.get("_isDividerBlock") ? "divider-block" : "";
		},

		setCustomStyles: function() {
			this.setMinHeight();
		},

		setMinHeight: function() {
			var minHeights = this.model.get("_minimumHeights");

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

			if (minHeight) this.$el.css("min-height", minHeight + "px");
		},

		onRemove: function() {}
	});

	return ThemeBlockView;

});
