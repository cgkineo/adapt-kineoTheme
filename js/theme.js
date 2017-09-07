define(function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var ThemePage = require('./theme-page');
	var ThemeArticle = require('./theme-article');
	var ThemeBlock = require('./theme-block');
	var currentPage;
	
	// themeConfig page helper
	// =======================
	Adapt.on('pageView:preRender', function(view) {
		currentPage = view.model;
	});
	
	Adapt.on('remove', function(view) {
		currentPage = undefined;
	});
	
	Adapt.once("app:dataReady" , function() { 
		Handlebars.registerHelper("themeConfig", function(options){	
			// console.log(currentPage);
			if (!currentPage) return;
			options.data.root._theme = _.extend({}, currentPage.get("_theme"), options.data.root._theme);
		});
	});
	
	// Page View
	// =========
	Adapt.on('pageView:postRender', function(view) {
		var theme = view.model.get('_theme');

		if (theme) {
			new ThemePage({
				model: new Backbone.Model({
					_themePageConfig: theme
				}),
				el: view.$el
			});
		}
		
	});

	// Article View
	// ============
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

	// Block View
	// ==========
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
