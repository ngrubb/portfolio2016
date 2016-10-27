var NG = (function(NG, $) {

  NG.FeatureSelector = {

    active: false,
    slideLoaded: 0,

    init: function() {

      if ( $('.feature').length < 1 )
        return;

      this.bind();

    },

    bind: function() {

      $('.project').unbind( "click" );
      $('.project').click( this.toggleFeature );

    },

    toggleFeature: function() {

      var slide = $(this).data('project');

      if ( slide != NG.FeatureSelector.slideLoaded ) {

        NG.FeatureSelector.slideLoaded = slide;
        $('.feature').slideUp( 600, NG.FeatureSelector.loadSlide );

        if ( NG.FeatureSelector.active == false ) {
          console.log( NG.FeatureSelector.active );
          NG.FeatureSelector.active = true;
        }

      }
      else if ( slide == NG.FeatureSelector.slideLoaded && NG.FeatureSelector.active == true ) {
        $('.feature').slideUp( 600 );
        NG.FeatureSelector.active = false;
        NG.FeatureSelector.slideLoaded = 0;
      }



      // NG.FeatureSelector.scrollTo();

    },

    loadSlide: function() {

      slide = NG.FeatureSelector.slideLoaded;
      var project = $('.project[data-project="'+ slide + '"]');

      var image = $(project).find('.project-image').text();
      var title = $(project).find('.project-title').text();
      var company = $(project).find('.project-company').text();
      var description = $(project).find('.project-description').html();
      var link = $(project).find('.project-link').text();
      var code = $(project).find('.project-code').text();

      $('.feature-image img').attr( 'src', image );
      $('.feature-title').text( title );
      $('.feature-company').text( company );
      $('.feature-description').html( description );

      if ( link != 'false' ) {
        $('.feature-link').attr( 'href', link );
        $('.feature-link').show();
      }
      else {
        $('.feature-link').hide();
      }

      if ( code != 'false' ) {
        $('.feature-code').attr( 'href', code );
        $('.feature-code').show();
      }
      else {
        $('.feature-code').hide();
      }

      $('.feature').slideDown( 800 );
      $('html, body').animate({
        scrollTop: $("#work").offset().top
      }, 800);

    },

  }



  /**
   * Doc Ready
   */
  $(function() {

    // NG.FeatureSelector.init();

  });

  return NG;
}(NG || {}, jQuery));
