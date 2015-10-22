# Assets
Retina sprites using grunt-spritesmith.

### Create an icon in Illustrator
- Head to `/illustrator-files` and open up `Entelo-Vector-Social-Icons.ai`
- Create your icon as a new layer, name it something sane.

### Automagic export
Let's run an Illustrator script (.jsx) that will output our new icon as a .png at two sizes with proper naming.
- In Illustrator: File » Scripts » Other Script » `EnteloSocialIcons-IllustratorExportScript.jsx`

The script will now save your *visible (not hidden)* layers as two files to `/social-icons`.  It will use your Illustrator layer name as the filename.

`github.png` at 20x20px & `github2x.png` at 40x40px

Now you've got a folder full of individual icons (at 1x and 2x).  Have a look at them, does everything look right?  Any stray files in here?  Get rid of them.  Are the 2x files EXACTLY twice the size of their 1x counterpart? Cool.




## Grunt
Time to use Grunt to combine all these images into a single 'sprite' image and generate all the SASS we'll need to use the icons.

### Install homebrew, npm & grunt
Install homebrew

`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Then, `brew update` to ensure your Homebrew is up to date &  `brew doctor` to make sure your system is ready to brew.

Next, install Node (npm will be installed with node):
`brew install node`

Install the grunt command-line interface
`npm install -g grunt-cli`

Run `npm install` which will install dependencies for this project found in `package.json` (you may need to use sudo).

### Grunt Spritesmith
When we run grunt in the 'assets' directory it's going to use our `Gruntfile.js` to grab our individual icons and then configure Spritesmith to output our sprite and SASS.

`grunt social`
- Finds all images in `/social-icons` and creates `social-icons-sprite.png` and `social-icons-sprite2x.png` inside `/sprites`.  
- Outputs `_social-icons-sprite.sass` and `_social-icons-sprite2x.sass` in `/sass`.

`grunt app`
  - Finds all images in `/app-icons` and creates `app-icons-sprite.png` and `app-icons-sprite2x.png` inside `/sprites`.  
  - Outputs `_app-icons-sprite.sass` and `_app-icons-sprite2x.sass` in `/sass`.

Learn more about Spritesmith: https://github.com/Ensighten/spritesmith


## Putting it all together

Import both stylesheets
``` sass
@import "social-icons-sprite"
@import "social-icons-sprite2x"
```

```sass
.service-icon.github
  @include sprite-retina($github, $github2x)
```

Retina mixin
```sass
//wow, look here, it's media query stuff for retina sprite
@mixin sprite-background-size($sprite)
  background-size: nth($sprite, 7) nth($sprite, 8)
 
@mixin sprite-retina($sprite, $sprite2x)
  @include sprite($sprite)
 
  @media only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-device-pixel-ratio: 1.5)
    @include sprite-image($sprite2x)
    @include sprite-background-size($sprite)
```
# retina-sprite-o-matic
