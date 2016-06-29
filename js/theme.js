define([
	"coreJS/adapt",
	'./theme-page-header'.
	'./theme-block',
	'./theme-article'
], function(Adapt, ThemePageHeader, ThemeBlock, ThemeArticle) {
	
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
