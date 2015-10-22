module.exports = function(grunt) {
  var timestamp = Math.floor(Date.now() / 1000);
  // Project configuration.
  grunt.initConfig({
  sprite: {
      buildSocialRetina: {
          'src': ['social-icons/*2x.png'],
          'destImg': 'sprites/social-icons-sprite2x' + timestamp + '.png',
          'destCSS': 'sass/_social-icons-sprite2x.sass',
          'padding': 20,
          'algorithm': 'binary-tree',
          'engine': 'auto',
          'imgPath': 'sprites/social-icons-sprite2x' + timestamp + '.png',
      },
      buildSocial: {
          'src': ['social-icons/*.png', '!<%= sprite.buildSocialRetina.src %>'],
          // destImg should be same as in sprite:buildretina task, but without @2x
          'destImg': 'sprites/social-icons-sprite' + timestamp + '.png',
          // padding should be twice smaller, than padding in sprite:buildretina task
          'padding': 10,
          // path to template
          // 'cssTemplate': 'mustache-templates/retina.template.mustache',
          'imgPath': 'sprites/social-icons-sprite' + timestamp + '.png',

          // don't edit below
          // 'cssVarMap': function (sprite) {
          //     sprite.image = sprite.image.replace(".png", "");
          // },
          'algorithm': '<%= sprite.buildSocialRetina.algorithm %>',
          'destCSS': 'sass/_social-icons-sprite.sass',
          'engine': '<%= sprite.buildSocialRetina.engine %>'
      },
      buildAppRetina: {
          'src': ['app-icons/*2x.png'],
          'destImg': 'sprites/app-icons-sprite2x' + timestamp + '.png',
          'destCSS': 'sass/_app-icons-sprite2x.sass',
          'padding': 20,
          'algorithm': 'binary-tree',
          'engine': 'auto',
          'imgPath': 'sprites/app-icons-sprite2x' + timestamp + '.png',
      },
      buildApp: {
          'src': ['app-icons/*.png', '!<%= sprite.buildAppRetina.src %>'],
          // destImg should be same as in sprite:buildretina task, but without @2x
          'destImg': 'sprites/app-icons-sprite' + timestamp + '.png',
          // padding should be twice smaller, than padding in sprite:buildretina task
          'padding': 10,
          // path to template
          // 'cssTemplate': 'mustache-templates/retina.template.mustache',
          'imgPath': 'sprites/app-icons-sprite' + timestamp + '.png',

          // don't edit below
          // 'cssVarMap': function (sprite) {
          //     sprite.image = sprite.image.replace(".png", "");
          // },
          'algorithm': '<%= sprite.buildAppRetina.algorithm %>',
          'destCSS': 'sass/_app-icons-sprite.sass',
          'engine': '<%= sprite.buildAppRetina.engine %>'
      }
  }
  });
 
  // npm tasks
  grunt.loadNpmTasks('grunt-spritesmith');
  
  // grunt tasks
  
  //run 'grunt' runs all the tasks
  grunt.registerTask('default', 'sprite');

  // 'grunt social' builds the social icons only
  grunt.registerTask('social', ['sprite:buildSocial', 'sprite:buildSocialRetina']);
  
  // 'grunt app' builds the app icons only
  grunt.registerTask('app', ['sprite:buildApp', 'sprite:buildAppRetina']);
};