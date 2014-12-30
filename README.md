adapt-kineo-theme
=================

##A base theme for Kineo projects.

###Introduction

###Page Header

Applied to page content objects.

Auto switches between desktop and mobile background images.

If isEnabled is set to false, the standard page title is rendered.

```
"_theme": {
    "_pageHeader": {
        "_isEnabled": true,
        "_layout": "left",
        "_backgroundImage": {
            "_desktop": "course/en/images/base_assets/hero_image.jpg",
            "_mobile": "course/en/images/base_assets/hero_image_mobile.jpg"
        }
    }
}
```



###Depreciated Mixins:

```
.responsive-large;
.responsive-medium;
.responsive-small;
```
