Adapt Kineo Theme
================

### Contents

 - Overview
 - Theme Guide
 - Workflow
 - Best Practices
 - Maintenance

## Overview

The Adapt Kineo theme's main purpose is to make styling courses more efficient for Kineo's current production process. The theme will also aid in making styles more consistent, reducing boilerplate code and adding extra functionality such as the ability to add background images via JSON.

Using this theme requires intermediate knowledge in styling with Adapt and the documentation is aimed at people who are already familiar with the core concepts.

Experience using the [Adapt Vanilla Theme](https://github.com/adaptlearning/adapt-contrib-vanilla) would be useful.


## Theme Guide

 - Variables
 -  The "_theme" attribute
 - Background Images
 - Boilerplate LESS files
 - Page Header
 - Templates
 - JS


### Variables

One of the fist thing's you'll notice is that almost all variables have been removed. Technically they are still there in a new file called adapt-defaults.less. This is to maintain compatibility with open source.

The main reason for the removal of the standard variables is that we found they were difficult to work with on large projects where there is a lot of bespoke styling.

The variables now just include:

colors.less
widths.less

As you can imagine, both files contain variables relevant to their file names.

#### Colors.less

```
@green: #97C93C;
@red: #E30613;
```

Colors are now defined by the actual color name rather than using confusing names such as primary/secondary color. It's also much easier to read styling in another file by seeing color variables named as actual colors.

#### Widths.less

```
@device-width-small: 520px;
@device-width-medium: 760px;
@device-width-large: 900px;
```

Use widths to set consistent breakpoints for media queries.

### The "_theme" attribute

```
"_theme": {}
```

This attribute is now added to contentObjects/articles/blocks for any theme functionality. The Kineo theme contains additional functionality such as adding background images and color from the JSON, page headers, scroll buttons etc.

This also helps keep all theming JSON in one place, and makes it easier to port over to a new course if needed.

**Examples complete with comments can be found in the [example.json](https://github.com/cgkineo/adapt-kineo-theme/blob/master/example.json) file.**

### Background Images & Colors

It's now possible to add background images/colors to articles and blocks entirely via JSON.

Here is an example of how to add a background image:

```
"_theme": {
    "_backgroundImage": {
            "_large": "course/en/images/largeImage.jpg",
            "_medium": "course/en/images/mediumImage.jpg",
            "_small": "course/en/images/smallImage.jpg"
    }
}
```

You must set background images for all sizes. You can also set the same image for all widths though it is recommended you consider file sizes for mobile.

Example of background color:

```
"_theme": {
    "_backgroundColor": "#EA1B75"
}
```

**Only include either a background image or color.**


### Boilerplate LESS files

You'll notice that as part of this theme there a lot of extra files in the less folder compared to the Adapt vanilla theme. These files have all the CSS style rules for all current Adapt components/extensions (contrib & Kineo) setup and ready to go.

Files will be added to the theme as new components and extensions are built.

### Page Header

```
"_theme": {
    "_pageHeader": {
        "_isEnabled": true,
        "_layout": "left",
        "_showScrollButton": true,
        "_backgroundImage": {
            "_large": "course/en/images/largeHeader.jpg",
            "_medium": "course/en/images/mediumHeader.jpg",
            "_small": "course/en/images/smallHeader.jpg"
        },
        "_minimumHeights": {
            "_large": 500,
            "_medium": 400,
            "_small": 300
        }
    }
}
```

Adding page header's is a very common task so it is now possible to set this up entirely via JSON.

Add the above JSON to the page contentObject.

The attributes are largely self explanatory, "_showScrollButton" adds a button to the bottom of the header to allow the use to scroll down the page to the first article.

Any custom styling can be done in the page-header.less file.

### Templates

Templates are mostly the same, page header functionality has been added to the page.hbs, not much else has changed from the Vanilla theme.

### JS

The Kineo theme adds functionality that can't be achieved solely via html/css in the JS folder.

There are theme-views for article, block and the page header. The theme attribute is used to pass in configuration to the view.

## Workflow 

We have found that following the below process has been the most efficient:

 - Setup
 - Setting theme attributes
 - Variables
 - Fonts
 - Components/Extensions
 - Test

### Setup

A good starting point is to have all the components and extensions needed for your course installed. You can use the [command line tools](https://github.com/cgkineo/cgkineo-cli) for this.

Next step is to set up the JSON for your course, this wouldn't necessary be the final content, just all the components and extensions. At Kineo we usually set up what we call a p101 which includes an example of all the components and extensions used in the course.

It would also be beneficial to get any assets linked up in the JSON, however using the standard course assets is fine at this stage.

Since the theme comes with a boilerplate less for all components/extensions, it would be a good idea to remove what you don't need to keep things manageable. In the event you add another component to your course, simply grab the file from this repository and drop it into your course in the relevant location.

### Setting theme attributes

Use the theme attribute (explained in the The "_theme" attribute section of this document) to setup the page header, article/block background images/color.

This is also a good time to assess how the content layout should be structured. Sometimes you'll need only one article per page, but depending on background image use, you might need more. It might mean reworking how the JSON is structured in your setup.

### Variables

At Kineo we are provided with an Art Direction and a style guide to work from. These are extremely useful to have since they guide you in styling your course.

We need to set up the colors and fonts required for the course. These should be outlined in the style guide. Add the colors to the colors.less file:

```
@darkGrey: #424242;
@gold: #2E2C2B;
@green: #97C93C;
@red: #E30613;
@pink: #EA1B75;
@purple: #681A4F;
```

**You will need to be aware that removing the colors that are already present in this fill will make the course unable to compile**. This is due to the color variables being used in the various less files.

It might be worth just adding to the colors file rather than replacing. Once you gain more experience working with this theme you will find you might not need to compile until you have applied your colors in all the relevant places and replaced all the variables that were defined before.

During this step you should also make any necessary changes in the widths.less file.

### Fonts

Most of the projects at Kineo use google fonts. Use the @import statement in the fonts.less file and setup all the global sizes and weights.

If the project isn't using google fonts, you would still add your @font-face rules to fonts.less file.

### Components/Extensions

This step requires you to go into all the component and extension less files and apply the relevant styles and variable changes.

Depending on the development work required, this might only require changing the color variables and font sizes.

More bespoke work can of course be done, the aim of the boilerplate style rules is for quickly covering all the basic styling.

If new components or extensions are created/added you will need to setup a less file for it in the theme. It's recommended that even if the component or extension is unique to the course, to setup a separate less file in the theme to keep the code organised and consistent.


### Test

Make sure to check your work across your target browsers and devices. Remember that transparent colors and rounded corners aren't support in IE8, so now's a good time to make sure this doesn't affect the course too much.


## Best Practices

 - Variables
 - Mixins
 - Using !important
 - New LESS files
 - Adding JSON attributes
 - Nesting
 - Code Organisation
 
### Variables
 - **Don't use variables from the adapt-defaults.less file for theming**, these are only there for compatibility reasons and for building new components and extensions.
 - Do try to keep a low number of variables, a large number of variables makes the project more confusing when working in a team.
 - Keep related variables in the same file.
 - Instead of defining variables for different shades of a color, use the darken and lighten functions to achieve the same effect. See the [LESS documentation for more info.](http://lesscss.org/functions/#color-operations)
 - **Use clear and and easy to understand variable names.** For example, @colOne is much less useful than @red.

### Fonts

 - Set a fallback font for any imported font. Usually this would be Arial or Times depending on the main font used. This [explanation](http://maconprinting.com/serif-versus-san-serif-fonts) will help shed some light on which fallback font to use.
 - Try not to use too many web fonts since this impacts loading times. A good idea is to stick to two fonts maximum with 2-3 weights each.
 - IE8 tends to be really bad at rendering web fonts, the theme currently defaults IE8 to use Arial, change this to Times if you are using a serif font.

 
### Mixins
 - Use mixins wherever you find yourself repeating the same style rules. For an example see the transitions.less file
 - Mixins, while a powerful tool can be made quite complicated for others in your team to understand. Try to comment anything unusual.
 - Documentation for mixins can be found [here.](http://lesscss.org/features/#mixins-feature)

### Using !important

 - **!important should only be used sparingly where necessary**. Where possible code should be overwritten at the route where it is being set. If you find your code is being overwritten it's best practice to inspect the element to find out.
 - A good example for using the !important statement it to make sure a disabled state color is applied

### New LESS files

 - Sometimes it might be necessary to setup a  new less file for a new component or extension. It's best to avoid copying all style rules and attributes across from the original file. Keep things simple by only adding theme based style rules and attributes.

### Adding JSON attributes

 - Add new JSON attributes inside ```"_theme": {}```. This will help keep all theme related JSON together.

### Nesting

 - LESS allows you the ability to nest style rules. While this is a very useful feature, try to avoid deep nesting. This makes overwriting rules more difficult and can be much harder to follow. The theme tries to stick to 2 levels deep, only going over if necessary.


### Code Organisation

 - Keep general style rules in the relevant LESS files. For example, all block styles should be in blocks.less
 - If you are styling for example a very bespoke block with a lot of style rules, it is a good idea to move this into it's own file.
 - **Keep new LESS file names relevant.**

## Maintenance

This theme is intended to be a good starting point for all new projects. While we have tried to cover all possible use cases there will be a need to keep the theme updated to the latest changes in the Adapt framework.

New components and extensions should be catered for by creating a LESS file and adding to this theme.

It will also be very useful to log any issues or improvements to Github. Try not to just fix the issue in the current project, this will mean having to fix the same issue again.

It's also a good idea to check to see if the issue you are having hasn't already been reported.

The Kineo theme is being maintained by the Kineo Front End Developer team.

