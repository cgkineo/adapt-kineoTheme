define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var ThemePageHeader = require('theme/adapt-kineo-theme/js/theme-page-header');
	var ThemeBlock = require('theme/adapt-kineo-theme/js/theme-block');
	var ThemeArticle = require('theme/adapt-kineo-theme/js/theme-article');
	
	// Page Header View

	Adapt.on('pageView:postRender', function(view) {
		var theme = view.model.get('_theme');

		if (theme) {
			var pageHeaderConfig = theme._pageHeader;
			if (pageHeaderConfig._isEnabled) {
				new ThemePageHeader({
					model: new Backbone.Model({
						_pageHeaderConfig: pageHeaderConfig
					}),
					el: $(".page-header")
				});
			}
		}
		
	});

	// Article

	Adapt.on('articleView:postRender', function(view) {
		var theme = view.model.get('_theme');
		
		if (theme) {
			new ThemeArticle({
				model: new Backbone.Model({
					_themeArticleConfig: theme
				}),
				el: view.$el
			});
		}
		
	});

	// Block

	Adapt.on('blockView:postRender', function(view) {
		var theme = view.model.get('_theme');
		
		if (theme) {
			new ThemeBlock({
				model: new Backbone.Model({
					_themeBlockConfig: theme
				}),
				el: view.$el
			});
		}
		
	});

	
});