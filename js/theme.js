define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var ThemePageHeader = require('theme/adapt-kineo-theme/js/theme-page-header');

	
	// Create Page Header View if enabled on the content object

	Adapt.on('pageView:postRender', function(view) {
		var pageHeaderConfig = view.model.get('_theme')._pageHeader;
		if (pageHeaderConfig._isEnabled) {
			new ThemePageHeader({
				model: new Backbone.Model({
					_pageHeaderConfig: pageHeaderConfig
				}),
				el: $(".page-header")
			});
		}
		
	});

});