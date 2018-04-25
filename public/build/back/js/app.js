webpackJsonp([0],{

/***/ "./assets/back/js/src/app-extra.js":
/*!*****************************************!*\
  !*** ./assets/back/js/src/app-extra.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// App
// =====================
//
+function ($) {

  // Plugins that embedded inside code.min.js
  //
  app.initCorePlugins = function () {

    provider.initAnimsition();

    // Enable using transform for Popper
    Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;

    // Enable tooltip
    //
    $('[data-provide~="tooltip"]').each(function () {
      var color = '';

      if ($(this).hasDataAttr('tooltip-color')) {
        color = ' tooltip-' + $(this).data('tooltip-color');
      }

      $(this).tooltip({
        container: 'body',
        trigger: 'hover',
        template: '<div class="tooltip' + color + '" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
      });
    });

    // Enable popover
    //
    $('[data-provide~="popover"]').popover({
      container: 'body'
    });

    // Scrollable
    //
    $('.modal-right .modal-body, .modal-left .modal-body').perfectScrollbar();
    $('.scrollable').perfectScrollbar({
      wheelPropagation: false,
      wheelSpeed: .5
    });

    // Child areas that shouldn't work with Bootstrap's collapse plugin
    //
    $(document).on('click', '.no-collapsing', function (e) {
      e.stopPropagation();
    });
  };

  // Plugins and small codes for theadmin
  //
  app.initThePlugins = function () {

    // Disable demonstrative links!
    //
    $(document).on('click', 'a[href="#"]', function (e) {
      e.preventDefault();
    });

    // Back to top
    //
    $(document).on('click', '[data-provide~="scrollup"]', function () {
      $('html, body').animate({ scrollTop: 0 }, 600);
      return false;
    });

    // Fix for .nav-tabs dropdown-menu
    //
    $(document).on('click', '.nav-tabs .dropdown-item', function () {
      $(this).siblings('.dropdown-item.active').removeClass('active');
    });

    // Upload
    //
    $(document).on('click', '.file-browser', function () {
      var $browser = $(this);
      if ($browser.hasClass('form-control')) {
        setTimeout(function () {
          $browser.closest('.file-group').find('[type="file"]').trigger('click');
        }, 300);
      } else {
        var file = $browser.closest('.file-group').find('[type="file"]');
        file.on('click', function (e) {
          e.stopPropagation();
        });
        file.trigger('click');
      }
    });

    // Event to change file name after file selection
    $(document).on('change', '.file-group [type="file"]', function () {
      var input = $(this)[0];
      var len = input.files.length;
      var filename = '';

      for (var i = 0; i < len; ++i) {
        filename += input.files.item(i).name + ', ';
      }
      filename = filename.substr(0, filename.length - 2);
      $(this).closest('.file-group').find('.file-value').val(filename).text(filename).focus();
    });

    // Update file name for bootstrap custom file upload
    $(document).on('change', '.custom-file-input', function () {
      var filename = $(this).val().split('\\').pop();
      $(this).next('.custom-file-control').attr('data-input-value', filename);
    });
    $('.custom-file-control:not([data-input-value])').attr('data-input-value', 'Choose file...');

    // Combined group
    //
    var form_combined_selector = '.form-type-combine .form-group, .form-type-combine.form-group, .form-type-combine .input-group-input';
    $(document).on('click', form_combined_selector, function () {
      $(this).find('.form-control').focus();
    });
    $(document).on('focusin', form_combined_selector, function () {
      $(this).addClass('focused');
    });
    $(document).on('focusout', form_combined_selector, function () {
      $(this).removeClass('focused');
    });

    // Material input
    //
    $(document).on('focus', '.form-type-material .form-control:not(.bootstrap-select)', function () {
      materialDoFloat($(this));
    });

    $(document).on('focusout', '.form-type-material .form-control:not(.bootstrap-select)', function () {
      if ($(this).val() === "") {
        materialNoFloat($(this));
      }
    });

    $(".form-type-material .form-control").each(function () {
      if ($(this).val().length > 0) {
        if ($(this).is('[data-provide~="selectpicker"]')) {
          return;
        }
        materialDoFloat($(this));
      }
    });

    // Select picker
    $(document).on('show.bs.select', '.form-type-material [data-provide~="selectpicker"]', function () {
      materialDoFloat($(this));
    });

    $(document).on('hidden.bs.select', '.form-type-material [data-provide~="selectpicker"]', function () {
      if ($(this).selectpicker('val').length == 0) {
        materialNoFloat($(this));
      }
    });

    $(document).on('loaded.bs.select', '.form-type-material [data-provide~="selectpicker"]', function () {
      if ($(this).selectpicker('val').length > 0) {
        materialDoFloat($(this));
      }
    });

    function materialDoFloat(e) {
      if (e.parent('.input-group-input').length) {
        e.parent('.input-group-input').addClass('do-float');
      } else {
        e.closest('.form-group').addClass("do-float");
      }
    }

    function materialNoFloat(e) {
      if (e.parent('.input-group-input').length) {
        e.parent('.input-group-input').removeClass('do-float');
      } else {
        e.closest('.form-group').removeClass("do-float");
      }
    }

    // Sticky block
    //
    $(window).on('scroll', function () {

      var window_top = $(window).scrollTop();

      $('[data-provide~="sticker"]').each(function () {
        if (!$(this).hasDataAttr('original-top')) {
          $(this).attr('data-original-top', $(this).offset().top);
        }

        var target = app.getTarget($(this)),
            stick_start = $(this).dataAttr('original-top'),
            stick_end = $(target).offset().top + $(target).height(),
            el_width = $(this).width(),
            el_top = 0;

        if (topbar.isFixed()) {
          el_top = $('.topbar').height();
        }

        var styles = {
          left: $(this).offset().left,
          width: el_width,
          top: el_top
        };

        if (window_top > stick_start && window_top <= stick_end) {
          if (!$(this).hasClass('sticker-stick')) {
            $(this).addClass('sticker-stick').css(styles);
            $(target).css('margin-top', $(this).height());
          }
        } else {
          $(this).removeClass('sticker-stick');
          $(target).css('margin-top', 0);
        }
      });
    });

    // Tables
    //

    // Selectall
    $(document).on('change', '[data-provide~="selectall"] thead .custom-checkbox :checkbox', function () {
      var th = $(this).closest('th'),
          index = th.closest('tr').children().index(th),
          checked = $(this).prop("checked");
      $(this).closest('table').find('tr td:nth-child(' + (index + 1) + ') :checkbox').each(function () {
        $(this).prop('checked', checked);
        if (checked) {
          $(this).closest('tr').addClass('active');
        } else {
          $(this).closest('tr').removeClass('active');
        }
      });
    });

    $(document).on('change', '[data-provide~="selectall"] tbody .custom-checkbox :checkbox', function () {
      if ($(this).prop("checked")) {
        $(this).closest('tr').addClass('active');
      } else {
        $(this).closest('tr').removeClass('active');
      }
    });

    // Selectable
    $(document).on('click', '.table[data-provide~="selectable"] tbody tr', function () {
      var input = $(this).children('td:nth-child(1)').find('input');
      input.prop('checked', !input.prop("checked"));

      if (input.prop("checked")) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });

    // Media
    //

    // Selectall
    $(document).on('change', '.media-list[data-provide~="selectall"] .media-list-header :checkbox, .media-list[data-provide~="selectall"] .media-list-footer :checkbox', function () {
      var list = $(this).closest('.media-list');
      var checked = $(this).prop("checked");
      $(list).find('.media-list-body .custom-checkbox [type="checkbox"]').each(function () {

        $(this).prop('checked', checked);
        if (checked) {
          $(this).closest('.media').addClass('active');
        } else {
          $(this).closest('.media').removeClass('active');
        }
      });
    });

    $(document).on('change', '[data-provide~="selectall"] .media .custom-checkbox input', function () {
      if ($(this).prop("checked")) {
        $(this).closest('.media').addClass('active');
      } else {
        $(this).closest('.media').removeClass('active');
      }
    });

    // TODO:
    // Checkable
    /*
    $(document).on('click', '.media[data-provide~="checkable"], .media-list[data-provide~="checkable"] .media:not(.media-list-header):not(.media-list-footer)', function(){
      var input = $(this).find(':checkbox, :radio');
      input.prop('checked', !input.prop("checked"));
       if ( input.prop("checked") ) {
        $(this).addClass('active');
      }
      else {
        $(this).removeClass('active');
      }
    });
    */

    // Click to select
    $(document).on('click', '.media[data-provide~="selectable"], .media-list[data-provide~="selectable"] .media:not(.media-list-header):not(.media-list-footer)', function () {
      var input = $(this).find('input');
      input.prop('checked', !input.prop("checked"));

      if (input.prop("checked")) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });

    // Search
    $('[data-provide~="media-search"]').on('keyup', function (e) {
      var s = $(this).val().trim(),
          medias = $(this).closest('.media-list').find('.media:not(.media-list-header):not(.media-list-footer)');

      if (s === '') {
        medias.show();
      } else {
        medias.not(':search(' + s + ')').hide();
        medias.filter(':search(' + s + ')').show();
      }
    });

    // Auto-exapnd textareas
    //
    $(document).on('keydown', '.auto-expand', function () {
      var e = $(this);
      setTimeout(function () {
        e.scrollTop(0).css('height', e.prop('scrollHeight') + 'px');
      }, 0);
    });

    // Pre toggler
    //
    $(document).on('click', '.code-toggler .btn', function () {
      $(this).closest('.code').find('pre').slideToggle();
    });

    // TODO:
    // Media collapsable
    //
    //$(document).on('click', '.media-collapsible [data-toggle="collapse"]', function(e) {
    //e.stopPropagation();
    //$(this).parent('.media-collapsible').children('.collapse').collapse('toggle');
    //});


    // Input range
    //
    $(document).on('change mousemove', '.input-range input', function () {
      $(this).closest('.input-range').find('.value').text($(this).val());
    });

    // Avatar
    //

    // Remove button
    $(document).on('click', '.avatar-pill .close', function () {
      $(this).closest('.avatar').fadeOut(function () {
        $(this).remove();
      });
    });

    // More button
    $(document).on('click', '[data-provide~="more-avatar"]', function () {
      var list = $(this).closest('.avatar-list');

      $(this).fadeOut(function () {
        $(this).remove();

        if ($(this).hasDataAttr('url')) {
          $('<div>').load($(this).data('url'), function () {
            var avatars = $(this).html();
            list.append(avatars);
          });
        }
      });
    });

    // Ripple for flat button
    //
    $(document).on('click', '.btn-flat:not(.no-wave)', function (e) {
      var x = e.pageX;
      var y = e.pageY;
      var clickY = y - $(this).offset().top;
      var clickX = x - $(this).offset().left;
      var box = this;

      var setX = parseInt(clickX);
      var setY = parseInt(clickY);
      $(this).find("svg").remove();
      $(this).append('<svg><circle cx="' + setX + '" cy="' + setY + '" r="' + 0 + '"></circle></svg>');

      var circle = $(box).find("circle");
      circle.animate({
        "r": $(box).outerWidth()
      }, {
        duration: 400,
        step: function step(val) {
          circle.attr("r", val);
        },
        complete: function complete() {
          circle.fadeOut('fast');
        }
      });
    });

    // Callout
    //
    $(document).on('click', '[data-dismiss="callout"]', function () {
      $(this).closest('.callout').fadeOut(function () {
        $(this).remove();
      });
    });

    // Tabs
    //
    $(document).on('click', '[data-dismiss="tab"]', function () {
      $(this).closest('.nav-item').fadeOut(function () {
        $(this).remove();
      });
    });

    // Rating
    //
    var ratingCheckHandle = function ratingCheckHandle(rating) {
      if (rating.find('input:checked').length) {
        rating.attr('data-has-rate', 'true');
      } else {
        rating.attr('data-has-rate', 'false');
      }
    };

    $(document).on('click', '.rating-remove', function () {
      $(this).closest('.rating').find('input').prop('checked', false);
      ratingCheckHandle($(this).closest('.rating'));
    });

    $('.rating').each(function () {
      ratingCheckHandle($(this));
    });

    $(document).on('change', '.rating input', function () {
      ratingCheckHandle($(this).closest('.rating'));
    });

    // Loader
    //
    $(document).on('click', '[data-provide~="loader"]', function (e) {
      e.preventDefault();

      var target = app.getTarget($(this));
      var url = app.getURL($(this));

      if ($(this).hasDataAttr('spinner')) {
        var spinner = $(this).data('spinner');
        $(target).html(spinner);
      }

      $(target).load(url);
    });

    // Lookup textual
    //
    $(document).on('click', '.lookup-textual .lookup-placeholder', function () {
      $(this).closest('.lookup').find('input').focus();
    });

    $(document).on('focus blur keyup', '.lookup-textual input', function () {
      var placeholder = $(this).closest('.lookup').find('.lookup-placeholder');
      if ($(this).val() == '') {
        placeholder.css('display', 'inline-block');
      } else {
        placeholder.css('display', 'none');
      }
    });

    // Fullscreen lookup
    //
    $(document).on('keyup', '.lookup-fullscreen[data-url] .lookup-form input', function () {
      var keyword = $(this).val();
      var lookup = $(this).closest('.lookup-fullscreen');
      var url = lookup.data('url');
      lookup.find('.lookup-results').load(url, { s: keyword });
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/app-init.js":
/*!****************************************!*\
  !*** ./assets/back/js/src/app-init.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


// initialize app
//
+function ($) {
  app.init();
  topbar.init();
  sidebar.init();
  topbar_menu.init();
  quickview.init();
  dock.init();
  aside.init();
  lookup.init();

  cards.init();

  app.isReady();
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/app.js":
/*!***********************************!*\
  !*** ./assets/back/js/src/app.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// =====================
// App
// =====================
//

+function ($, window) {
  var app = {
    name: 'TheAdmin',
    version: '1.0.0',
    corejs: $('script[src*="core.min.js"]').attr('src')
  };

  app.dir = {
    home: app.corejs.replace('assets/js/core.min.js', ''),
    assets: app.corejs.replace('js/core.min.js', ''),
    vendor: app.corejs.replace('js/core.min.js', 'vendor/')

    // Change app.dir values if user assigned another url
    //
  };var assets_dir_el = $('[data-assets-url]');
  if (assets_dir_el.length) {
    var assets_dir = assets_dir_el.data('assets-url');
    if ('/' !== assets_dir.slice(-1)) {
      assets_dir += '/';
    }

    app.dir.assets = assets_dir;
    app.dir.vendor = assets_dir + 'vendor/';
  }

  app.defaults = {

    provide: null,
    googleApiKey: null,
    googleAnalyticsKey: null,
    smoothScroll: false,
    saveState: false,

    // Toast
    //
    toast: {
      duration: 4000,
      actionTitle: '',
      actionUrl: '',
      actionColor: 'warning'
    },

    // Modaler
    //
    modaler: {
      url: '',
      isModal: false,
      html: '',
      target: '',
      type: '',
      size: '',
      title: '',
      backdrop: true,
      headerVisible: true,
      footerVisible: true,
      confirmVisible: true,
      confirmText: 'Ok',
      confirmClass: 'btn btn-w-sm btn-flat btn-primary',
      cancelVisible: false,
      cancelText: 'Cancel',
      cancelClass: 'btn btn-w-sm btn-flat btn-secondary',
      bodyExtraClass: '',
      spinner: '<div class="h-200 center-vh"><svg class="spinner-circle-material-svg" viewBox="0 0 50 50"><circle class="circle" cx="25" cy="25" r="20"></svg></div>',

      autoDestroy: true,

      // Events
      onShow: null,
      onShown: null,
      onHide: null,
      onHidden: null,
      onConfirm: null,
      onCancel: null,

      // Private options
      modalId: null
    },

    // Google map
    //
    googleMap: {
      lat: '',
      lng: '',
      zoom: 13,
      markerLat: '',
      markerLng: '',
      markerIcon: '',
      style: ''
    }

  };

  // Breakpoint values
  //
  app.breakpoint = {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200
  };

  // Application colors
  //
  app.colors = {
    primary: "#33cabb",
    secondary: "#e4eaec",
    success: "#46be8a",
    info: "#48b0f7",
    warning: "#f2a654",
    danger: "#f96868",
    bg: "#f3f5f6",
    text: "#616a78",
    textSecondary: "#929daf"

    // Fonts
    //
  };app.font = {
    body: 'Roboto, sans-serif',
    title: 'Roboto, sans-serif'

    // Local variables
    //
  };var readyCallbacks = [];

  app.getReadyCallbacksString = function () {
    return readyCallbacks.toString();
  };

  app.ready = function (callback) {
    readyCallbacks.push(callback);
  };

  var count = 0;

  app.isReady = function () {
    count++;
    if (count != 2) {
      return;
    }

    $(function () {

      // Init plugins
      provider.callCallbacks();

      // Run ready callbacks
      for (var i = 0; i < readyCallbacks.length; i++) {

        try {
          readyCallbacks[i]();
        } catch (e) {
          console.error(e);
        }
      }
      readyCallbacks = [];

      // Preloader
      var preloader = $('.preloader');
      if (preloader.length) {
        var speed = preloader.dataAttr('hide-spped', 600);
        preloader.fadeOut(speed);
      }
    });
  };

  app.provide = function (vendors) {
    if (Array.isArray(vendors)) {
      var len = vendors.length;
      for (var i = 0; i < len; i++) {
        provider.inject(vendors[i]);
      }
    } else {
      provider.inject(vendors);
    }
  };

  app.init = function () {

    provider.init();

    app.initCorePlugins();
    app.initThePlugins();
  };

  // Call a function
  //
  app.call = function (functionName /*, args */) {
    if (functionName == '' || functionName == 'provider.undefined') {
      console.log('UNDEFINED FUNC');
      return;
    }

    var args = Array.prototype.slice.call(arguments, 1);
    var context = window;
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }

    try {
      return context[func].apply(context, args);
    } catch (e) {
      console.error(e);
    }
  };

  // Load a JS file
  //
  app.loadScript = function (url, callback) {
    $.getScript(url, callback);
  };

  // Load a CSS file and insert ot after core.css.min
  //
  app.loadStyle = function (url, base) {
    if (url == '') {
      return;
    }

    if (base === undefined) {
      base = '';
    }

    if (Array.isArray(url)) {
      for (var i = 0; i < url.length; i++) {
        $('head link:first').after($('<link href="' + base + url[i] + '" rel="stylesheet">'));
      }
    } else {
      $('head link:first').after($('<link href="' + base + url + '" rel="stylesheet">'));
    }
  };

  app.key = function (key, fn) {
    app.unkey(key);
    $(document).on('keydown.' + app._normalizeKey(key), null, key, fn);
  };

  app.unkey = function (key) {
    $(document).off('keydown.' + app._normalizeKey(key));
  };

  app._normalizeKey = function (key) {
    return key.replace('+', '_');
  };

  // Get target of an action from element.
  //
  // It can be 'data-target' or 'href' attribute.
  // We support 'next' and 'prev' values to target next or previous element. In this case, we return jQuery element.
  //
  app.getTarget = function (e) {
    var target;
    if (e.hasDataAttr('target')) {
      target = e.data('target');
    } else {
      target = e.attr('href');
    }

    if (target == 'next') {
      target = $(e).next();
    } else if (target == 'prev') {
      target = $(e).prev();
    }

    if (target == undefined) {
      return false;
    }

    return target;
  };

  // Get URL of an action from element.
  //
  // It can be 'data-url' or 'href' attribute.
  //
  app.getURL = function (e) {
    var url;
    if (e.hasDataAttr('url')) {
      url = e.data('url');
    } else {
      url = e.attr('href');
    }

    return url;
  };

  // Config application
  //
  app.config = function (options) {

    // Rteurn config value
    if (typeof options === 'string') {
      return app.defaults[options];
    }

    // Save configs
    $.extend(true, app.defaults, options);

    // Provide required plugins
    //
    if (app.defaults.provide) {
      app.provide(app.defaults.provide);
    }

    // Make necessary changes
    //
    if (app.defaults.smoothscroll) {
      app.provide('smoothscroll');
    }

    // Google map
    //
    if ($('[data-provide~="map"]').length && window["google.maps.Map"] === undefined) {
      $.getScript("https://maps.googleapis.com/maps/api/js?key=" + app.defaults.googleApiKey + "&callback=app.map");
    }

    // Google Analytics
    //
    if (app.defaults.googleAnalyticsKey) {
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

      ga('create', app.defaults.googleAnalyticsKey, 'auto');
      ga('send', 'pageview');
    }

    // Recover saved states
    //
    if (app.defaults.saveState) {
      var states = app.state();
      if (states['sidebar.folded']) {
        sidebar.fold();
      }

      if (states['topbar.fixed']) {
        topbar.fix();
      }
    }
  };

  // Register shortcuts
  //
  app.shortcut = function (keys) {
    $.each(keys, function (key, fn) {
      app.key(key, fn);
    });
  };

  // Convert data-attributes options to Javascript object
  //
  app.getDataOptions = function (el, castList) {
    var options = {};

    $.each($(el).data(), function (key, value) {

      key = app.dataToOption(key);

      // Escape data-provide
      if (key == 'provide') {
        return;
      }

      if (castList != undefined) {
        var type = castList[key];
        switch (type) {
          case 'bool':
            value = Boolean(value);
            break;

          case 'num':
            value = Number(value);
            break;

          case 'array':
            value = value.split(',');
            break;

          default:

        }
      }

      options[key] = value;
    });

    return options;
  };

  // Save app state
  //
  app.state = function (key, value) {
    if (localStorage.theadmin === undefined) {
      localStorage.theadmin = '{}';
    }

    var states = JSON.parse(localStorage.theadmin);
    if (arguments.length == 0) {
      return states;
    } else if (arguments.length == 1) {
      return states[key];
    } else if (arguments.length == 2 && app.defaults.saveState) {
      states[key] = value;
      localStorage.theadmin = JSON.stringify(states);
    }
  };

  app.toggleState = function (key) {
    if (app.defaults.saveState) {
      var states = app.state();
      states[key] = !states[key];
      localStorage.theadmin = JSON.stringify(states);
    }
  };

  app.state.remove = function (key) {
    localStorage.removeItem(key);
  };

  app.state.clear = function () {
    localStorage.clear();
  };

  // Generate an almost unique ID
  //
  app.guid = function (len) {
    if (len == undefined) {
      len = 5;
    }
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, len);
  };

  // Convert fooBarBaz to foo-bar-baz
  //
  app.optionToData = function (name) {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase();
  };

  // Convert foo-bar-baz to fooBarBaz
  //
  app.dataToOption = function (name) {
    return name.replace(/-([a-z])/g, function (x) {
      return x[1].toUpperCase();
    });
  };

  // Escape HTML strings
  //
  app.htmlEscape = function (html) {
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    };
    var source = '(?:' + Object.keys(escapeMap).join('|') + ')',
        testRegexp = new RegExp(source),
        replaceRegexp = new RegExp(source, 'g'),
        string = html == null ? '' : '' + html;
    return testRegexp.test(string) ? string.replace(replaceRegexp, function (match) {
      return escapeMap[match];
    }) : string;
  };

  window.app = app;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/component/aside.js":
/*!***********************************************!*\
  !*** ./assets/back/js/src/component/aside.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


// =====================
// Page aside
// =====================
//
+function ($, window) {

  var aside = {};

  aside.init = function () {

    $('.aside-body').perfectScrollbar();

    // Handle page aside toggler
    $(document).on('click', '.aside-toggler', function () {
      aside.toggle();
    });
  };

  aside.toggle = function () {
    $('body').toggleClass('aside-open');
  };

  aside.open = function () {
    $('body').addClass('aside-open');
  };

  aside.close = function () {
    $('body').removeClass('side-open');
  };

  window.aside = aside;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/component/cards.js":
/*!***********************************************!*\
  !*** ./assets/back/js/src/component/cards.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


// =====================
// Cards
// =====================
//
+function ($, window) {

  var cards = {};

  cards.init = function () {

    // Close
    //
    $(document).on('click', '.card-btn-close', function () {
      $(this).parents('.card').fadeOut(600, function () {
        if ($(this).parent().children().length == 1) {
          $(this).parent().remove();
        } else {
          $(this).remove();
        }
      });
    });

    // Slide up/down
    //
    $(document).on('click', '.card-btn-slide', function () {
      $(this).toggleClass('rotate-180').parents('.card').find('.card-content').slideToggle();
    });

    // Maximize
    //
    $(document).on('click', '.card-btn-maximize', function () {
      $(this).parents('.card').toggleClass('card-maximize').removeClass('card-fullscreen');
    });

    // Fullscreen
    //
    $(document).on('click', '.card-btn-fullscreen', function () {
      $(this).parents('.card').toggleClass('card-fullscreen').removeClass('card-maximize');
    });

    // Refresh
    //
    $(document).on('click', '.card-btn-reload', function (e) {
      e.preventDefault();
      var url = $(this).attr('href');
      var $card = $(this).parents('.card');

      if (url == "#") {
        return;
      }

      $card.find('.card-loading').addClass('reveal');
      $card.find('.card-content').load(url, function () {
        $card.find('.card-loading').removeClass('reveal');
      });
    });

    // Carousel
    //
    $('.card-carousel').each(function () {
      var interval = false;

      if ($(this).hasDataAttr('ride')) {
        interval = 5000;
      }

      $(this).carousel({
        interval: interval
      });
    });

    $(document).on('click', '.card-btn-next', function () {
      $(this).parents('.card-carousel').carousel('next');
    });
    $(document).on('click', '.card-btn-prev', function () {
      $(this).parents('.card-carousel').carousel('prev');
    });
    $(document).on('click', '.card-carousel .carousel-indicators li', function () {
      $(this).parents('.card-carousel').carousel($(this).data('slide-to'));
      $(this).parent().find('.active').removeClass('active');
      $(this).addClass('active');
    });
  };

  cards.fix = function () {};

  window.cards = cards;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/component/dock.js":
/*!**********************************************!*\
  !*** ./assets/back/js/src/component/dock.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Dock
// =====================
//
+function ($, window) {

  var dock = {};
  var interval_blink = [],
      interval_shake = [];

  dock.init = function () {

    $('.dock-body').perfectScrollbar({
      wheelPropagation: false
    });

    // Handle dock openner
    //
    $(document).on('click', '[data-toggle="dock"]', function (e) {
      e.preventDefault();

      var target = app.getTarget($(this));
      dock.toggle(target, $(this));
    });

    // Dock closer
    //
    $(document).on('click', '[data-dock="close"], [data-dismiss="dock"]', function () {
      dock.close($(this).closest('.dock'));
    });

    // Handle minimize
    //
    $(document).on('click', '[data-dock="minimize"], .dock.minimize .dock-header', function () {
      dock.toggleMinimize($(this).closest('.dock'));
    });

    // Handle maximize
    //
    $(document).on('click', '[data-dock="maximize"]', function () {
      dock.toggleMaximize($(this).closest('.dock'));
    });

    // TODO:
    // Stop blink/shake when dock get focus
    //
    $(document).on('click', '.dock', function () {
      //var e = $(this).attr('id');
      //dock.stopBlink(e);
      //dock.stopShake(e);
    });

    // Close dock when backdrop touches
    //
    $(document).on('click', '.dock .close', function () {
      var dock = $(this).closest('.dock');
      dock.close(dock);
    });
  };

  // Toggle open/close
  //
  dock.toggle = function (target, toggler) {
    if ($(target).hasClass('reveal')) {
      dock.close(target);
    } else {
      dock.open(target, toggler);
    }
  };

  // Open dock
  //
  dock.open = function (target, toggler) {
    var dock_el = $(target),
        body_el = dock_el.find('.dock-body');

    dock_el.prependTo(dock_el.closest('.dock-list')).addClass('reveal');

    // Load data from url
    if (dock_el.hasDataAttr('url') && 'true' !== dock_el.data('url-has-loaded')) {
      dock._loader(dock_el);
    } else if (body_el.hasDataAttr('url') && 'true' !== body_el.data('url-has-loaded')) {
      dock._loader(body_el);
    }
  };

  // Close dock
  //
  dock.close = function (e) {
    dock.unMaximize(e);
    $(e).removeClass('reveal minimize');
  };

  // Toggle minimize state
  //
  dock.toggleMinimize = function (e) {

    if ($(e).hasClass('minimize')) {
      $(e).removeClass('minimize');
    } else {
      dock.unMaximize(e);
      $(e).addClass('minimize');
    }
  };

  // Toggle maximize/fullscreen state
  dock.toggleMaximize = function (e) {
    if ($(e).hasClass('maximize')) {
      dock.unMaximize(e);
    } else {
      dock.maximize(e);
    }
  };

  // Make it fullscreen
  //
  dock.maximize = function (e) {
    $(e).removeClass('minimize').addClass('maximize').closest('.dock-list').addClass('maximize');
  };

  // Back to initial size from maximize state
  //
  dock.unMaximize = function (e) {
    $(e).removeClass('maximize').closest('.dock-list').removeClass('maximize');
  };

  // Blinking
  //
  dock.blink = function (e) {
    clearInterval(interval_blink[e]);
    $(e).toggleClass("blink");
    interval_blink[e] = setInterval(function () {
      $(e).toggleClass("blink");
    }, 1000);
  };

  dock.stopBlink = function (e) {
    clearInterval(interval_blink[e]);
    $(e).removeClass("blink");
  };

  // Shakeing
  //
  dock.shake = function (e) {
    clearInterval(interval_shake[e]);
    $(e).toggleClass("shake");
    interval_shake[e] = setInterval(function () {
      $(e).toggleClass("shake");
    }, 1500);
  };

  dock.stopShake = function (e) {
    clearInterval(interval_shake[e]);
    $(e).removeClass("shake");
  };

  // Private methods
  //
  dock._loader = function (target) {
    target.load(target.data('url'), function () {

      target.find('.dock-body').perfectScrollbar({
        wheelPropagation: false
      });

      // Callback function
      if (target.hasDataAttr('on-load')) {
        window[target.data('on-load')].call();
      }

      // Don't load it next time, if don't need to
      if (target.hasDataAttr('always-reload') && 'true' === target.data('always-reload')) {} else {
        target.data('url-has-loaded', 'true');
      }
    });
  };

  window.dock = dock;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/component/lookup.js":
/*!************************************************!*\
  !*** ./assets/back/js/src/component/lookup.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Lookup
// =====================
//
+function ($, window) {

  var lookup = {};

  lookup.init = function () {

    // Handle lookup openner
    //
    $(document).on('click', '[data-toggle="lookup"]', function (e) {
      e.preventDefault();
      var target = app.getTarget($(this));

      if (target == false) {
        lookup.close($(this).closest('.lookup-fullscreen'));
      } else {
        lookup.toggle(target);
      }
    });
  };

  // Toggle open/close state of fullscreen lookup
  //
  lookup.toggle = function (e) {
    if ($(e).hasClass('reveal')) {
      lookup.close(e);
    } else {
      lookup.open(e);
    }
  };

  // Close fullscreen lookup
  //
  lookup.close = function (e) {
    $(e).removeClass('reveal');
    $('body').removeClass('no-scroll');
  };

  // Close fullscreen lookup
  //
  lookup.open = function (e) {
    $(e).addClass('reveal');
    $(e).find('.lookup-form input').focus();
    $('body').addClass('no-scroll');
  };

  window.lookup = lookup;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/component/quickview.js":
/*!***************************************************!*\
  !*** ./assets/back/js/src/component/quickview.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Quickview
// =====================
//
+function ($, window) {

  var quickview = {};

  quickview.init = function () {

    $('.quickview-body').perfectScrollbar();

    // Update scrollbar on tab change
    //
    $(document).on('shown.bs.tab', '.quickview-header a[data-toggle="tab"]', function (e) {
      $(this).closest('.quickview').find('.quickview-body').perfectScrollbar('update');
    });

    // Quickview closer
    //
    $(document).on('click', '[data-dismiss="quickview"]', function () {
      quickview.close($(this).closest('.quickview'));
    });

    // Handle quickview openner
    //
    $(document).on('click', '[data-toggle="quickview"]', function (e) {
      e.preventDefault();
      var target = app.getTarget($(this));

      if (target == false) {
        quickview.close($(this).closest('.quickview'));
      } else {
        quickview.toggle(target);
      }
    });

    // Close quickview when backdrop touches
    //
    $(document).on('click', '.backdrop-quickview', function () {
      var qv = $(this).attr('data-target');
      quickview.close(qv);
    });
    $(document).on('click', '.quickview .close, [data-dismiss="quickview"]', function () {
      var qv = $(this).closest('.quickview');
      quickview.close(qv);
    });
  };

  // Toggle open/close state
  //
  quickview.toggle = function (e) {
    if ($(e).hasClass('reveal')) {
      quickview.close(e);
    } else {
      quickview.open(e);
    }
  };

  // Open quickview
  //
  quickview.open = function (e) {
    var quickview = $(e);

    // Load content from URL if required
    if (quickview.hasDataAttr('url') && 'true' !== quickview.data('url-has-loaded')) {
      quickview.load(quickview.data('url'), function () {
        $('.quickview-body').perfectScrollbar();
        // Don't load it next time, if don't need to
        if (quickview.hasDataAttr('always-reload') && 'true' === quickview.data('always-reload')) {} else {
          quickview.data('url-has-loaded', 'true');
        }
      });
    }

    // Open it
    quickview.addClass('reveal').not('.backdrop-remove').after('<div class="app-backdrop backdrop-quickview" data-target="' + e + '"></div>');
  };

  // Close quickview
  //
  quickview.close = function (e) {
    $(e).removeClass('reveal');
    $('.backdrop-quickview').remove();
  };

  window.quickview = quickview;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/component/sidebar.js":
/*!*************************************************!*\
  !*** ./assets/back/js/src/component/sidebar.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Sidebar
// =====================
//
+function ($, window) {

  var sidebar = {};

  sidebar.init = function () {

    // Scrollable
    //
    $('.sidebar-navigation').perfectScrollbar();

    // Handle sidebar openner
    //
    $(document).on('click', '.sidebar-toggler', function () {
      sidebar.open();
    });

    // Close sidebar when backdrop touches
    //
    $(document).on('click', '.backdrop-sidebar', function () {
      sidebar.close();
    });

    // Slide up/down menu item on click
    //
    $(document).on('click', '.sidebar .menu-link', function () {
      var $submenu = $(this).next('.menu-submenu');
      if ($submenu.length < 1) return;

      if ($submenu.is(":visible")) {
        $submenu.slideUp(function () {
          $('.sidebar .menu-item.open').removeClass('open');
        });
        $(this).removeClass('open');
        return;
      }

      $('.sidebar .menu-submenu:visible').slideUp();
      $('.sidebar .menu-link').removeClass('open');
      $submenu.slideToggle(function () {
        $('.sidebar .menu-item.open').removeClass('open');
      });
      $(this).addClass('open');
    });

    // Handle fold toggler
    //
    $(document).on('click', '.sidebar-toggle-fold', function () {
      sidebar.toggleFold();
    });
  };

  sidebar.toggleFold = function () {
    $('body').toggleClass('sidebar-folded');
    app.toggleState('sidebar.folded');
  };

  sidebar.fold = function () {
    $('body').addClass('sidebar-folded');
    app.state('sidebar.folded', true);
  };

  sidebar.unfold = function () {
    $('body').removeClass('sidebar-folded');
    app.state('sidebar.folded', false);
  };

  sidebar.open = function () {
    $('body').addClass('sidebar-open').prepend('<div class="app-backdrop backdrop-sidebar"></div>');
  };

  sidebar.close = function () {
    $('body').removeClass('sidebar-open');
    $('.backdrop-sidebar').remove();
  };

  window.sidebar = sidebar;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/component/topbar-menu.js":
/*!*****************************************************!*\
  !*** ./assets/back/js/src/component/topbar-menu.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


// =====================
// Topbar menu (Horizontal menu)
// =====================
//
+function ($, window) {

  var topbar_menu = {};

  topbar_menu.init = function () {

    // Handle sidebar openner
    //
    $(document).on('click', '.topbar-menu-toggler', function () {
      topbar_menu.open();
    });

    // Close sidebar when backdrop touches
    //
    $(document).on('click', '.backdrop-topbar-menu', function () {
      topbar_menu.close();
    });

    // Don't follow in large devices
    //
    var breakon = app.breakpoint.lg;

    if ($('body').hasClass('topbar-toggleable-xs')) {
      breakon = app.breakpoint.xs;
    } else if ($('body').hasClass('topbar-toggleable-sm')) {
      breakon = app.breakpoint.sm;
    } else if ($('body').hasClass('topbar-toggleable-md')) {
      breakon = app.breakpoint.md;
    }

    if ($(document).width() > breakon) {
      return;
    }

    // Slide up/down menu item on click
    //
    $(document).on('click', '.topbar .menu-link', function () {
      var $submenu = $(this).next('.menu-submenu');
      if ($submenu.length < 1) return;

      if ($submenu.is(":visible")) {
        $submenu.slideUp(function () {
          $('.topbar .menu-item.open').removeClass('open');
        });
        $(this).removeClass('open');
        return;
      }

      $('.topbar .menu-submenu:visible').slideUp();
      $('.topbar .menu-link').removeClass('open');
      $submenu.slideDown(function () {
        $('.topbar .menu-item.open').removeClass('open');
      });
      $(this).addClass('open');
    });
  };

  // Open menu
  //
  topbar_menu.open = function () {
    $('body').addClass('topbar-menu-open').find('.topbar').prepend('<div class="app-backdrop backdrop-topbar-menu"></div>');
  };

  // Close menu
  //
  topbar_menu.close = function () {
    $('body').removeClass('topbar-menu-open');
    $('.backdrop-topbar-menu').remove();
  };

  window.topbar_menu = topbar_menu;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/component/topbar.js":
/*!************************************************!*\
  !*** ./assets/back/js/src/component/topbar.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Topbar
// =====================
//
+function ($, window) {

  var topbar = {};

  topbar.init = function () {

    // Scrollable
    //
    $('.topbar .list-group').each(function () {
      if ($(this).height() > 265) {
        $(this).perfectScrollbar();
      }
    });
  };

  // Toggle fix/unfix state
  //
  topbar.toggleFix = function () {
    $('.topbar').toggleClass('topbar-unfix');
    app.toggleState('topbar.fixed');
  };

  // Fix to top
  //
  topbar.fix = function () {
    $('.topbar').removeClass('topbar-unfix');
    app.state('topbar.fixed', true);
  };

  // Unfix from top
  //
  topbar.unfix = function () {
    $('.topbar').addClass('topbar-unfix');
    app.state('topbar.fixed', false);
  };

  // Return 'true' if topbar is fixed to top
  //
  topbar.isFixed = function () {
    if ($('.topbar.topbar-unfix').length) {
      return false;
    }
    return true;
  };

  window.topbar = topbar;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/jquery-extends.js":
/*!**********************************************!*\
  !*** ./assets/back/js/src/jquery-extends.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


// Check if an element has a specific data attribute
//
jQuery.fn.hasDataAttr = function (name) {
  return $(this)[0].hasAttribute('data-' + name);
};

// Get data attribute. If element doesn't have the attribute, return default value
//
jQuery.fn.dataAttr = function (name, def) {
  return $(this)[0].getAttribute('data-' + name) || def;
};

// Return outerHTML (inclusing the element) code
//
jQuery.fn.outerHTML = function () {
  var html = '';
  this.each(function () {
    html += $(this).prop("outerHTML");
  });
  return html;
};

// Return HTML code of all the selected elements
//
jQuery.fn.fullHTML = function () {
  var html = '';
  $(this).each(function () {
    html += $(this).outerHTML();
  });
  return html;
};

// Instance search
//
// $.expr[':'] -> $.expr.pseudos
jQuery.expr[':'].search = function (a, i, m) {
  return $(a).html().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

// Scroll to end
//
jQuery.fn.scrollToEnd = function () {
  $(this).scrollTop($(this).prop("scrollHeight"));
  return this;
};

/***/ }),

/***/ "./assets/back/js/src/plugin/map.js":
/*!******************************************!*\
  !*** ./assets/back/js/src/plugin/map.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


// =====================
// Map
// =====================
//
+function ($) {

  app.map = function () {

    $('[data-provide~="map"]').each(function () {

      var setting = $.extend({}, app.defaults.googleMap, app.getDataOptions($(this)));

      var map = new google.maps.Map($(this)[0], {
        center: {
          lat: Number(setting.lat),
          lng: Number(setting.lng)
        },
        zoom: Number(setting.zoom)
      });

      var marker = new google.maps.Marker({
        position: {
          lat: Number(setting.markerLat),
          lng: Number(setting.markerLng)
        },
        map: map,
        animation: google.maps.Animation.DROP,
        icon: setting.markerIcon
      });

      var infowindow = new google.maps.InfoWindow({
        content: $(this).dataAttr('info', '')
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });

      switch (setting.style) {
        case 'light':
          map.set('styles', [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]);
          break;

        case 'dark':
          map.set('styles', [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]);
          break;

        default:
          if (Array.isArray(setting.style)) {
            map.set('styles', setting.style);
          }
      }
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/plugin/modaler.js":
/*!**********************************************!*\
  !*** ./assets/back/js/src/plugin/modaler.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Modaler
// =====================
//
+function ($) {

  app.modaler = function (options) {

    var setting = $.extend({}, app.defaults.modaler, options);

    var handleCallback = function handleCallback() {

      // Bootstrap modal events
      //
      if (setting.onShow) {
        $('#' + id).on('show.bs.modal', function (e) {
          app.call(setting.onShow, e);
        });
      }

      if (setting.onShown) {
        $('#' + id).on('shown.bs.modal', function (e) {
          app.call(setting.onShown, e);
        });
      }

      if (setting.onHide) {
        $('#' + id).on('hide.bs.modal', function (e) {
          app.call(setting.onHide, e);
        });
      }

      if (setting.onHidden) {
        $('#' + id).on('hidden.bs.modal', function (e) {
          app.call(setting.onHidden, e);
        });
      }

      // Handle confirm callback
      //
      $('#' + id).find('[data-perform="confirm"]').on('click', function () {

        // Hasn't set
        if (setting.onConfirm == null) {
          return;
        }

        // Is a function
        if ($.isFunction(setting.onConfirm)) {
          setting.onConfirm($('#' + id));
          return;
        }

        // Is string value, so call it
        if (setting.onConfirm.substring) {
          app.call(setting.onConfirm, $('#' + id));
        }
      });

      // Handle cancel callback
      //
      $('#' + id).find('[data-perform="cancel"]').on('click', function () {

        // Hasn't set
        if (setting.onCancel == null) {
          return;
        }

        // Is a function
        if ($.isFunction(setting.onCancel)) {
          setting.onCancel($('#' + id));
          return;
        }

        // Is string value, so call it
        if (setting.onCancel.substring) {
          app.call(setting.onCancel, $('#' + id));
        }
      });
    };

    if (setting.modalId) {
      $('#' + setting.modalId).modal('show');
      return;
    }

    var id = 'modal-' + app.guid();

    //----------------------------------
    // We recieve modal markup from url
    //
    if (setting.isModal) {

      $('<div>').load(setting.url, function () {
        $('body').append($(this).find('.modal').attr('id', id).outerHTML());

        $('#' + id).modal('show');

        // Destroy after close
        //
        if (setting.autoDestroy) {
          $('#' + id).on('hidden.bs.modal', function () {
            $('#' + id).remove();
          });
        } else {
          $(setting.this).attr('data-modal-id', id);
        }

        handleCallback();
      });
    }

    ////----------------------------------
    // We should design the modal
    //
    else {

        switch (setting.size) {
          case 'sm':
            setting.size = 'modal-sm';
            break;

          case 'lg':
            setting.size = 'modal-lg';
            break;

          default:
          //setting.size = '';
        }

        if (setting.type) {
          setting.type = 'modal-' + setting.type;
        }

        // Header code
        //
        var html_header = '';
        if (setting.headerVisible) {
          html_header += '<div class="modal-header"> \
            <h5 class="modal-title">' + setting.title + '</h5> \
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button> \
          </div>';
        }

        // Footer code
        //
        var html_footer = '';
        if (setting.footerVisible) {
          html_footer += '<div class="modal-footer">';

          if (setting.cancelVisible) {
            html_footer += '<button class="' + setting.cancelClass + '" data-dismiss="modal" data-perform="cancel">' + setting.cancelText + '</button>';
          }

          if (setting.confirmVisible) {
            html_footer += '<button class="' + setting.confirmClass + '" data-dismiss="modal" data-perform="confirm">' + setting.confirmText + '</button>';
          }

          html_footer += '</div>';
        }

        // Modal code
        //
        var modal_html = '<div class="modal fade ' + setting.type + '" id="' + id + '" tabindex="-1"' + (!setting.backdrop ? ' data-backdrop="false"' : '') + '> \
            <div class="modal-dialog ' + setting.size + '"> \
              <div class="modal-content"> \
                ' + html_header + ' \
                <div class="modal-body ' + setting.bodyExtraClass + '"> \
                  ' + setting.spinner + ' \
                </div> \
                ' + html_footer + ' \
              </div> \
            </div> \
          </div>';

        // Show modal
        $('body').append(modal_html);
        $('#' + id).modal('show');

        // Destroy after close
        //
        if (setting.autoDestroy) {
          $('#' + id).on('hidden.bs.modal', function () {
            $('#' + id).remove();
          });
        } else {
          $(setting.this).attr('data-modal-id', id);
        }

        // Load data into the modal
        //
        if (setting.url) {
          $('#' + id).find('.modal-body').load(setting.url, function () {
            //$(this).removeClass('p-a-0');
            handleCallback();
          });
        } else if (setting.html) {
          $('#' + id).find('.modal-body').html(setting.html);
          handleCallback();
        } else if (setting.target) {
          $('#' + id).find('.modal-body').html($(setting.target).html());
          handleCallback();
        }
      }
  };

  // Enable data attribute options
  $(document).on('click', '[data-provide~="modaler"]', function () {
    app.modaler(app.getDataOptions($(this)));
    //app.modaler.apply($(this), options);
  });
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/plugin/toast.js":
/*!********************************************!*\
  !*** ./assets/back/js/src/plugin/toast.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


// =====================
// Toast plugin
// =====================
//
+function ($) {

  app.toast = function (text, options) {

    var setting = $.extend({}, app.defaults.toast, options);

    // Make sure .the-toast exists
    if ($('.toast').length < 1) {
      $('<div class="toast"><div class="text"></div><div class="action"></div></div>').appendTo('body');
    }
    var $toast = $('.toast');

    // Action HTML
    var action = '';
    if (setting.actionTitle != '') {
      action = '<a class="text-' + setting.actionColor + '" href="' + setting.actionUrl + '">' + setting.actionTitle + '</a>';
    }

    // Close previous toast if it is open
    if ($toast.hasClass('reveal')) {
      $toast.finish().queue(function (next) {
        $(this).removeClass('reveal');
        next();
      }).delay(300);
    }

    // Configure the toast and show it
    $toast.delay(1).queue(function (next) {
      $(this).find('.text').text(text).next('.action').html(action);
      $(this).addClass('reveal');
      next();
    }).delay(setting.duration).queue(function (next) {
      $(this).removeClass('reveal');
      next();
    });
  };

  // Enable data attribute options
  $(document).on('click', '[data-provide~="toast"]', function () {
    var text = $(this).data('text');
    app.toast(text, app.getDataOptions($(this)));
  });
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/chart.js":
/*!**********************************************!*\
  !*** ./assets/back/js/src/provider/chart.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Chart plugins
// =====================
//
+function ($) {

  provider.initCharts = function () {

    provider.initPeity();
    provider.initSparkline();
    provider.initEasyPieChart();
    provider.initChartjs();
  };

  // Peity
  //
  provider.initPeity = function () {
    if (!$.fn.peity) {
      return;
    }

    provider.provide('peity', function () {
      var type = $(this).dataAttr('type', '');

      switch (type) {
        case 'pie':
          var options = {
            width: 38,
            height: 38,
            radius: 8,
            fill: app.colors.primary + ',' + app.colors.bg
          };
          options = $.extend(options, app.getDataOptions($(this)));

          if (options.size) {
            options.width = options.height = options.size;
          }

          options.fill = options.fill.split(',');

          $(this).peity("pie", options);
          break;

        case 'donut':
          var options = {
            width: 38,
            height: 38,
            radius: 8,
            fill: app.colors.primary + ',' + app.colors.bg
          };
          options = $.extend(options, app.getDataOptions($(this)));

          if (options.size) {
            options.width = options.height = options.size;
          }

          options.fill = options.fill.split(',');

          $(this).peity("donut", options);
          break;

        case 'line':
          var options = {
            height: 38,
            width: 120,
            delimiter: ',',
            min: 0,
            max: null,
            fill: app.colors.bg,
            stroke: app.colors.primary,
            strokeWidth: 1
          };
          options = $.extend(options, app.getDataOptions($(this)));

          $(this).peity("line", options);
          break;

        case 'bar':
          var options = {
            height: 38,
            width: 120,
            delimiter: ',',
            min: 0,
            max: null,
            padding: 0.2,
            fill: app.colors.primary
          };
          options = $.extend(options, app.getDataOptions($(this)));

          options.fill = options.fill.split(',');

          $(this).peity("bar", options);
          break;
      }
    });
  };

  // Easy pie chart
  //
  provider.initEasyPieChart = function () {
    if (!$.fn.easyPieChart) {
      return;
    }

    provider.provide('easypie', function () {
      var options = {
        barColor: app.colors.primary,
        trackColor: app.colors.bg
      };
      options = $.extend(options, app.getDataOptions($(this)));

      if (options.color) {
        options.barColor = options.color;
        options.trackColor = app.colors.bg;
      }

      $(this).easyPieChart(options);
    });
  };

  // Sparkline
  //
  provider.initSparkline = function () {
    if (!$.fn.sparkline) {
      return;
    }

    var defColor = 'rgba(51,202,185,0.5)',
        spotColor = app.colors.primary,
        spotHighlightColor = app.colors.danger,
        negColor = app.colors.danger;

    $.extend($.fn.sparkline.defaults.common, {
      enableTagOptions: true,
      tagOptionsPrefix: 'data-',
      tagValuesAttribute: 'data-values',
      lineColor: defColor,
      fillColor: defColor
    });

    $.extend($.fn.sparkline.defaults.line, {
      spotColor: spotColor,
      minSpotColor: spotColor,
      maxSpotColor: spotColor,
      highlightSpotColor: spotHighlightColor,
      highlightLineColor: null,
      height: 38
    });

    $.extend($.fn.sparkline.defaults.bar, {
      barWidth: 7,
      barSpacing: 4,
      barColor: defColor,
      negBarColor: negColor,
      zeroColor: defColor,
      stackedBarColor: [defColor, negColor],
      height: 38
    });

    $.extend($.fn.sparkline.defaults.tristate, {
      barWidth: 7,
      barSpacing: 4,
      posBarColor: defColor,
      negBarColor: negColor,
      zeroBarColor: '#e3e4e5',
      height: 38
    });

    $.extend($.fn.sparkline.defaults.discrete, {
      thresholdColor: negColor,
      height: 38
    });

    $.extend($.fn.sparkline.defaults.pie, {
      sliceColors: [defColor, negColor],
      width: 38,
      height: 38
    });

    $.extend($.fn.sparkline.defaults.box, {
      boxLineColor: '#e3e4e5',
      boxFillColor: '#f3f5f6',
      whiskerColor: app.colors.primary,
      outlierLineColor: defColor,
      outlierFillColor: defColor,
      medianColor: negColor,
      targetColor: defColor
    });

    $.extend($.fn.sparkline.defaults.bullet, {
      targetWidth: 2,
      targetColor: negColor,
      performanceColor: defColor,
      rangeColors: ['#f3f5f6', '#ebeced', '#e3e4e5']
    });

    provider.provide('sparkline', function () {
      var options = {};
      options = $.extend(options, app.getDataOptions($(this)));

      $(this).sparkline('html', options);
    });
  };

  // Chart.js
  //
  provider.initChartjs = function () {
    if (!window['Chart'] != undefined) {
      return;
    }

    // Globals
    //
    $.extend(Chart.defaults.global, {
      defaultFontColor: app.colors.text,
      defaultFontSize: 13,
      defaultColor: 'rgba(0,0,0,0.05)'
    });

    // Globals
    //
    $.extend(Chart.defaults.scale.gridLines, {
      color: 'rgba(0,0,0,0.05)',
      zeroLineColor: 'rgba(0,0,0,0.15)'
    });

    // Legend labels
    //
    $.extend(Chart.defaults.global.legend.labels, {
      boxWidth: 24,
      padding: 16
    });

    // Tooltip
    //
    $.extend(Chart.defaults.global.tooltips, {
      backgroundColor: 'rgba(0,0,0,0.7)',
      bodySpacing: 6,
      titleMarginBottom: 8,

      xPadding: 12,
      yPadding: 12,
      caretSize: 8,
      cornerRadius: 2
    });

    // Arc
    //
    $.extend(Chart.defaults.global.elements.arc, {
      backgroundColor: 'rgba(51,202,185,0.5)'
    });

    // Line
    //
    $.extend(Chart.defaults.global.elements.line, {
      backgroundColor: 'rgba(51,202,185,0.5)',
      borderColor: 'rgba(51,202,185,0.5)',
      borderWidth: 1
    });

    // Point
    //
    $.extend(Chart.defaults.global.elements.point, {
      backgroundColor: 'rgba(51,202,185,0.5)',
      borderColor: '#fff'
    });

    // Rectangle
    //
    $.extend(Chart.defaults.global.elements.rectangle, {
      backgroundColor: 'rgba(51,202,185,0.5)',
      borderColor: '#fff'
    });
  };

  // Morris
  //
  provider.initMorris = function () {
    if (!window['Morris'] != undefined) {
      return;
    }
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/code.js":
/*!*********************************************!*\
  !*** ./assets/back/js/src/provider/code.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Code plugins
// =====================
//
+function ($) {

  provider.initCodes = function () {

    provider.initPrism();
    provider.initClipboard();
  };

  provider.initPrism = function () {

    $('pre:not(.no-copy) > code[class*="language-"]').each(function () {
      $(this).before('<button class="btn btn-sm btn-bold btn-secondary clipboard-copy">Copy</button>');
    });

    // Move copy button when the content is scrolling
    $('.clipboard-copy').parent().on('scroll', function () {
      $(this).find('.clipboard-copy').css('transform', 'translate(' + $(this).scrollLeft() + 'px, ' + $(this).scrollTop() + 'px)');
    });

    if ($('.clipboard-copy').length > 0) {
      var clipboardSnippets = new Clipboard('.clipboard-copy', {
        target: function target(trigger) {
          return trigger.nextElementSibling;
        }
      });

      clipboardSnippets.on('success', function (e) {
        e.clearSelection();
        app.toast('Copied.');
      });
    }
  };

  provider.initClipboard = function () {
    new Clipboard('[data-clipboard-text]');
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/editor.js":
/*!***********************************************!*\
  !*** ./assets/back/js/src/provider/editor.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Editor plugins
// =====================
//
+function ($) {

  provider.initEditors = function () {

    provider.initSummernote();
  };

  provider.initSummernote = function () {
    if (!$.fn.summernote) {
      return;
    }

    provider.provide('summernote', function () {
      var options = {
        dialogsInBody: true,
        dialogsFade: true
      };
      options = $.extend(options, app.getDataOptions($(this)));

      if (options.toolbar) {
        switch (options.toolbar.toLowerCase()) {
          case 'slim':
            options.toolbar = [
            // [groupName, [list of button]]
            ['style', ['bold', 'underline', 'clear']], ['color', ['color']], ['para', ['ul', 'ol']], ['insert', ['link', 'picture']]];
            break;

          case 'full':
            options.toolbar = [
            // [groupName, [list of button]]
            ['para_style', ['style']], ['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough', 'superscript', 'subscript']], ['fontsize', ['fontname', 'fontsize', 'height']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph', 'hr']], ['table', ['table']], ['insert', ['link', 'picture', 'video']], ['do', ['undo', 'redo']], ['misc', ['fullscreen', 'codeview', 'help']]];
            break;
        }
      }

      $(this).summernote(options);
    });

    $(document).on('click', '[data-summernote-edit]', function () {
      var target = $(this).data('summernote-edit');
      $(target).summernote({ focus: true });
    });

    $(document).on('click', '[data-summernote-save]', function () {
      var target = $(this).data('summernote-save');
      var callback = $(this).data('callback');
      var markup = $(target).summernote('code');
      $(target).summernote('destroy');
      app.call(callback, markup);
    });
  };

  provider.initQuill = function () {
    if (window['Quill'] === undefined) {
      return;
    }

    provider.provide('quill', function () {

      var options = {
        theme: 'snow'
      };

      var toolbarFullOptions = [[{ 'font': [] }, { 'header': [1, 2, 3, 4, 5, 6, false] }, { 'size': ['small', false, 'large', 'huge'] }], ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], [{ 'direction': 'rtl' }, { 'align': [] }], // text direction
      ['link', 'image', 'video'], ['clean'] // remove formatting button
      ];

      $.extend(options, app.getDataOptions($(this)));

      if (options.toolbar !== undefined) {
        var toolbar = options.toolbar.toLowerCase();
        if (toolbar == 'full') {

          // TODO:
          // Load highlight js
          /*
          $LAB.script('highlight/highlight.pack.js');
          if ( options.codeStyle === undefined ) {
            app.loadStyle('highlight/styles/monokai-sublime.css', app.dir.vendor);
          }
          else {
            app.loadStyle('highlight/styles/'+ options.codeStyle +'.css', app.dir.vendor);
          }
          */

          options.modules = {
            //syntax: 'true',
            toolbar: toolbarFullOptions
          };
        }
      }

      new Quill($(this)[0], options);
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/emoji.js":
/*!**********************************************!*\
  !*** ./assets/back/js/src/provider/emoji.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Emoji plugins
// =====================
//
+function ($) {

  provider.initEmojies = function () {

    provider.initEmojione();
  };

  provider.initEmojione = function () {
    if (window["emojione"] === undefined) {
      return;
    }

    emojione.imageType = 'svg';
    emojione.sprites = true;
    emojione.ascii = true;
    emojione.imagePathSVGSprites = app.dir.vendor + '/emojione/emojione.svg';

    provider.provide('emoji', function () {
      var original = $(this).html();
      // use .shortnameToImage if only converting shortnames (for slightly better performance)
      var converted = emojione.toImage(original);
      $(this).html(converted);
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/form.js":
/*!*********************************************!*\
  !*** ./assets/back/js/src/provider/form.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Form plugins
// =====================
//
+function ($) {

  provider.initForms = function () {

    provider.initSelectpicker();
    provider.initDatepicker();
    provider.initMinicolor();
    provider.initClockpicker();
    provider.initMaxlength();
    provider.initStrength();
    provider.initTagsinput();
    provider.initKnob();
    provider.initNouislider();
    provider.initSwitchery();
    provider.initFormatter();
    provider.initValidation();
    provider.initWizard();
  };

  // Selectpicker
  //
  provider.initSelectpicker = function () {

    if (!$.fn.selectpicker) {
      return;
    }

    provider.provide('selectpicker', function () {
      $(this).selectpicker({
        iconBase: '',
        tickIcon: 'ti-check',
        style: 'btn-light'
      });
    });
  };

  // Datepicker
  //
  provider.initDatepicker = function () {
    if (!$.fn.datepicker) {
      return;
    }

    $.fn.datepicker.defaults.multidateSeparator = ", ";

    provider.provide('datepicker', function () {
      if ($(this).prop("tagName") == 'INPUT') {
        $(this).datepicker();
      } else {
        $(this).datepicker({
          inputs: [$(this).find('input:first'), $(this).find('input:last')]
        });
      }
    });
  };

  // Minicolor
  //
  provider.initMinicolor = function () {
    if (!$.fn.minicolors) {
      return;
    }

    provider.provide('colorpicker', function () {
      var options = {
        change: function change(value, opacity) {
          if (!value) return;
          if (opacity) value += ', ' + opacity;
        },
        theme: 'bootstrap'
      };

      options = $.extend(options, app.getDataOptions($(this)));

      if ('rgba' === options.format) {
        options.format = 'rgb';
        options.opacity = true;
      }

      if ($(this).attr('data-swatches')) {
        options.swatches = $(this).attr('data-swatches').split('|');
      }

      $(this).minicolors(options);
    });
  };

  // Clockpicker
  //
  provider.initClockpicker = function () {
    if (!$.fn.clockpicker) {
      return;
    }

    provider.provide('clockpicker', function () {
      $(this).clockpicker({
        donetext: 'Done'
      });
    });
  };

  // Max length control
  //
  provider.initMaxlength = function () {
    if (!$.fn.maxlength) {
      return;
    }

    provider.provide('maxlength', function () {
      var options = {
        warningClass: 'badge badge-warning',
        limitReachedClass: 'badge badge-danger',
        placement: 'bottom-right-inside'
      };

      options = $.extend(options, app.getDataOptions($(this)));
      $(this).maxlength(options);
    });
  };

  // Password strength
  //
  provider.initPwStrength = function () {
    if (!$.fn.pwstrength) {
      return;
    }

    provider.provide('pwstrength', function () {
      var options = {
        ui: {
          bootstrap4: true,
          progressBarEmptyPercentage: 0,
          showVerdicts: false
        },
        common: {
          usernameField: $(this).dataAttr('username', '#username')
        }
      };

      $(this).pwstrength(options);
      $(this).add($(this).next()).wrapAll('<div class="pwstrength"></div>');

      // Vertical progress
      if ($(this).is('[data-vertical="true"]')) {
        var height = $(this).outerHeight() - 10,
            right = -height / 2 + 7,
            bottom = height / 2 + 4;
        $(this).next('.progress').css({
          width: height,
          right: right,
          bottom: bottom
        });
      }
    });
  };

  // Tags input
  //
  provider.initTagsinput = function () {
    if (!$.fn.tagsinput) {
      return;
    }

    provider.provide('tagsinput', function () {
      $(this).tagsinput();
    });
  };

  // Knob
  //
  provider.initKnob = function () {
    if (!$.fn.knob) {
      return;
    }

    provider.provide('knob', function () {
      var options = {
        thickness: .1,
        width: 120,
        height: 120,
        fgColor: app.colors.primary,
        bgColor: app.colors.bg
      };

      options = $.extend(options, app.getDataOptions($(this)));
      $(this).knob(options);
    });
  };

  // NoUiSlider
  //
  provider.initNouislider = function () {
    if (window['noUiSlider'] === undefined) {
      return;
    }

    provider.provide('slider', function (index, element) {
      var options = {
        range: {
          'min': Number($(this).dataAttr('min', 0)),
          'max': Number($(this).dataAttr('max', 100))
        },
        step: 1,
        start: $(this).dataAttr('value', 0),
        connect: 'lower',
        margin: 0,
        limit: 100,
        orientation: 'horizontal',
        direction: 'ltr',
        tooltips: false,
        animate: true,
        behaviour: 'tap',

        format: {
          to: function to(value) {
            return value;
          },
          from: function from(value) {
            return value;
          }
        }
      };

      options = $.extend(options, app.getDataOptions($(this)));

      var target = $(this).dataAttr('target', 'none');

      // If it's range slider
      if (typeof options.start === 'string' && options.start.indexOf(',') > -1) {
        options.start = options.start.split(",");

        if (!$(this).hasDataAttr('connect')) {
          options.connect = true;
        }

        if (!$(this).hasDataAttr('behaviour')) {
          options.behaviour = 'tap-drag';
        }
      } else {
        delete options.limit; // Limit option should be available for linear sliders
      }

      // If it's vertical
      if (options.orientation == 'vertical') {
        if (!$(this).hasDataAttr('direction')) {
          options.direction = 'rtl';
        }
      }

      // Target
      if (target != 'none') {
        if (target == 'next') {
          target = $(this).next();
        } else if (target == 'prev') {
          target = $(this).prev();
        }
      }

      // Create it
      noUiSlider.create(element, options);

      // Event update
      element.noUiSlider.on('update', function (values, handle) {
        var strVal = values.toString();
        $(target).text(strVal).val(strVal);

        if ($(element).hasDataAttr('on-update')) {
          app.call($(element).data('on-update'), values);
        }
      });

      // Event change
      element.noUiSlider.on('change', function (values, handle) {
        if ($(element).hasDataAttr('on-change')) {
          app.call($(element).data('on-change'), values);
        }
      });
    });
  };

  // Switchery
  //
  provider.initSwitchery = function () {
    if (window['Switchery'] === undefined) {
      return;
    }

    provider.provide('switchery', function () {
      var options = {
        color: app.colors.primary,
        speed: '0.5s'
      };

      options = $.extend(options, app.getDataOptions($(this)));
      new Switchery(this, options);
    });
  };

  // Mask / Formatter
  //
  provider.initFormatter = function () {
    if (!$.fn.formatter) {
      return;
    }

    provider.provide('formatter', function () {
      var options = {
        pattern: $(this).data('format'),
        persistent: $(this).dataAttr('persistent', true)
      };

      $(this).formatter(options);
    });
  };

  // Validator
  //
  provider.initValidation = function () {
    if (!$.fn.validator) {
      return;
    }

    $.fn.validator.Constructor.FOCUS_OFFSET = 100;

    provider.provide('validation', function () {
      $(this).validator();
    });

    $(document).on('click', '[data-perform="validation"]', function () {
      var target = app.getTarget($(this));

      if (target == undefined) {
        $(this).parents('[data-provide="validation"]').validator('validate');
      } else {
        $(target).parents('[data-provide="validation"]').validator('validate');
      }
    });
  };

  // Wizard
  //
  provider.initWizard = function () {
    if (!$.fn.bootstrapWizard) {
      return;
    }

    provider.provide('wizard', function () {

      var wizard = $(this);
      var nav_item = $(this).find('.nav-item');
      var tab_pane = $(this).find('.tab-pane');

      wizard.bootstrapWizard({
        tabClass: 'nav-process',
        nextSelector: '[data-wizard="next"]',
        previousSelector: '[data-wizard="prev"]',
        firstSelector: '[data-wizard="first"]',
        lastSelector: '[data-wizard="last"]',
        finishSelector: '[data-wizard="finish"]',
        backSelector: '[data-wizard="back"]',

        onTabClick: function onTabClick(tab, navigation, index) {
          if (!wizard.is('[data-navigateable="true"]')) {
            return false;
          }
        },

        onNext: function onNext(tab, navigation, index) {

          var current_index = wizard.bootstrapWizard('currentIndex');
          var curr_tab = tab_pane.eq(current_index);
          var tab = tab_pane.eq(index);

          // Validator
          var validator_selector = '[data-provide="validation"]';
          var validator = curr_tab.find(validator_selector).addBack(validator_selector);
          if (validator.length) {
            validator.validator('validate');
            if (validator.find('.has-error').length) {
              return false;
            }
          }

          // Callback
          //
          if (wizard.hasDataAttr('on-next')) {
            app.call(wizard.data('on-next'), tab, navigation, index);
          }
        },

        onBack: function onBack(tab, navigation, index) {

          // Callback
          //
          if (wizard.hasDataAttr('on-back')) {
            app.call(wizard.data('on-back'), tab, navigation, index);
          }
        },

        onPrevious: function onPrevious(tab, navigation, index) {

          // Callback
          //
          if (wizard.hasDataAttr('on-previous')) {
            app.call(wizard.data('on-previous'), tab, navigation, index);
          }
        },

        onTabShow: function onTabShow(tab, navigation, index) {

          var tab = tab_pane.eq(index);
          var nav = nav_item.eq(index);
          var max = wizard.bootstrapWizard('navigationLength');

          // Finish button
          if (index == max) {
            wizard.find('[data-wizard="next"]').addClass('d-none');
            wizard.find('[data-wizard="finish"]').removeClass('d-none');
          } else {
            wizard.find('[data-wizard="next"]').removeClass('d-none');
            wizard.find('[data-wizard="finish"]').addClass('d-none');
          }

          // Nav classes
          navigation.children().removeClass('processing');
          navigation.children(':lt(' + index + '):not(.complete)').addClass('complete');
          nav.addClass('processing');

          if (!wizard.is('[data-stay-complete="true"]')) {
            navigation.children(':gt(' + index + ').complete').removeClass('complete');
          }

          // Ajax load
          if (tab.hasDataAttr('url')) {
            tab.load(tab.data('url'));
          }

          // Callback for tab
          if (tab.hasDataAttr('callback')) {
            app.call(tab.data('callback'), tab);
          }

          // Callback for wizard
          //
          if (wizard.hasDataAttr('on-tab-show')) {
            app.call(wizard.data('on-tab-show'), tab, navigation, index);
          }
        },

        onFinish: function onFinish(tab, navigation, index) {

          var curr_tab = tab_pane.eq(index);

          // Validator
          var validator_selector = '[data-provide="validation"]';
          var validator = curr_tab.find(validator_selector).addBack(validator_selector);
          if (validator.length) {
            validator.validator('validate');
            if (validator.find('.has-error').length) {
              validator.closest('form').one('submit', function (e) {
                e.preventDefault();
              });
              return false;
            }
          }

          // Navigation
          var nav = nav_item.eq(index);
          nav.addClass('complete').removeClass('processing');

          // Callback
          //
          if (wizard.hasDataAttr('on-finish')) {
            app.call(wizard.data('on-finish'), tab, navigation, index);
          }
        }

      });
    });
  };

  // Typeahead
  //
  provider.initTypeahead = function () {};
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/icon.js":
/*!*********************************************!*\
  !*** ./assets/back/js/src/provider/icon.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Icon plugins
// =====================
//
+function ($) {

  provider.initIcons = function () {

    provider.initI8icons();
  };

  provider.initI8icons = function () {

    provider.provide('iconI8', function () {
      $(document).i8icons(function (icons) {
        icons.defaultIconSetUrl(app.dir.vendor + 'i8-icon/i8-color-icons.svg');
      });
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/map.js":
/*!********************************************!*\
  !*** ./assets/back/js/src/provider/map.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Map plugins
// =====================
//
+function ($) {

  provider.initMaps = function () {};

  provider.initMap = function () {};

  provider.initMapael = function () {};
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/misc.js":
/*!*********************************************!*\
  !*** ./assets/back/js/src/provider/misc.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Editor plugins
// =====================
//
+function ($) {

  provider.initMiscs = function () {

    provider.initJustifiedGallery();
  };

  provider.initFullcalendar = function () {
    if (!$.fn.fullCalendar) {
      return;
    }
  };

  provider.initJustifiedGallery = function () {
    if (!$.fn.justifiedGallery) {
      return;
    }

    provider.provide('justified', function () {
      var options = {
        captions: false,
        cssAnimation: true,
        imagesAnimationDuration: 500
      };

      $.extend(options, app.getDataOptions($(this)));
      $(this).justifiedGallery(options);
    });
  };

  // Animate On Scroll
  //
  provider.initAos = function () {

    if (window['AOS'] === undefined) {
      return;
    }

    provider.provide('aos', function () {
      AOS.init({
        duration: 800
      });
    });
  };

  provider.initTyped = function () {

    if (window['Typed'] === undefined) {
      return;
    }

    provider.provide('typed', function () {
      var strings = $(this).data('type').split('|');
      var options = {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
      };

      $.extend(options, app.getDataOptions($(this)));
      var typed = new Typed($(this)[0], options);
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/provider-list.js":
/*!******************************************************!*\
  !*** ./assets/back/js/src/provider/provider-list.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// provider list
// =====================
//
+function ($) {

  //
  //
  provider.list = {

    // ======================================================================
    // Chart
    //
    easypie: {
      selector: 'easypie',
      callback: 'initEasyPieChart',
      css: '',
      js: 'easypiechart/jquery.easypiechart.min.js'
    },

    peity: {
      selector: 'peity',
      callback: 'initPeity',
      css: '',
      js: 'jquery.peity/jquery.peity.min.js'
    },

    sparkline: {
      selector: 'sparkline',
      callback: 'initSparkline',
      css: '',
      js: 'sparkline/sparkline.min.js'
    },

    chartjs: {
      selector: 'chartjs',
      callback: 'initChartjs',
      css: '',
      js: ['chartjs/Chart.min.js', 'moment/moment.min.js']
    },

    morris: {
      selector: 'morris',
      callback: 'initMorris',
      css: 'morris/morris.css',
      js: ['raphael/raphael.min.js', 'morris/morris.min.js']
    },

    // ======================================================================
    // Code
    //
    prism: {
      selector: '$ code[class*="language-"]',
      callback: 'initPrism',
      css: 'prism/prism.css',
      js: ['prism/prism.js', 'clipboard/clipboard.min.js']
    },

    clipboard: {
      selector: '$ [data-clipboard-text]',
      callback: 'initClipboard',
      js: 'clipboard/clipboard.min.js'
    },

    // ======================================================================
    // Editor
    //
    summernote: {
      selector: 'summernote',
      callback: 'initSummernote',
      css: 'summernote/summernote.css',
      js: 'summernote/summernote.min.js'
    },

    quill: {
      selector: 'quill',
      callback: 'initQuill',
      css: [
      //'highlight/styles/monokai-sublime.css',
      'quill/quill.bubble.css', 'quill/quill.snow.css'],
      js: [
      //'highlight/highlight.pack.js',
      'quill/quill.min.js']
    },

    // ======================================================================
    // Emoji
    //
    emoji: {
      selector: 'emoji',
      callback: 'initEmojione',
      css: '',
      js: 'emojione/emojione.min.js'
    },

    // ======================================================================
    // Form
    //
    selectpicker: {
      selector: 'selectpicker',
      callback: 'initSelectpicker',
      css: 'bootstrap-select/css/bootstrap-select.min.css',
      js: 'bootstrap-select/js/bootstrap-select.min.js'
    },

    datepicker: {
      selector: 'datepicker',
      callback: 'initDatepicker',
      css: 'bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
      js: 'bootstrap-datepicker/js/bootstrap-datepicker.min.js'
    },

    timepicker: {
      selector: 'timepicker',
      //callback: '',
      css: 'bootstrap-timepicker/bootstrap-timepicker.min.css',
      js: 'bootstrap-timepicker/bootstrap-timepicker.min.js'
    },

    colorpicker: {
      selector: 'colorpicker',
      callback: 'initMinicolor',
      css: 'jquery-minicolors/jquery.minicolors.css',
      js: 'jquery-minicolors/jquery.minicolors.min.js'
    },

    clockpicker: {
      selector: 'clockpicker',
      callback: 'initClockpicker',
      css: 'bootstrap-clockpicker/bootstrap-clockpicker.min.css',
      js: 'bootstrap-clockpicker/bootstrap-clockpicker.min.js'
    },

    maxlength: {
      selector: 'maxlength',
      callback: 'initMaxlength',
      css: '',
      js: 'bootstrap-maxlength/bootstrap-maxlength.min.js'
    },

    pwstrength: {
      selector: 'pwstrength',
      callback: 'initPwStrength',
      css: '',
      js: 'bootstrap-pwstrength/pwstrength-bootstrap.min.js'
    },

    tagsinput: {
      selector: 'tagsinput',
      callback: 'initTagsinput',
      css: 'bootstrap-tagsinput/bootstrap-tagsinput.css',
      js: 'bootstrap-tagsinput/bootstrap-tagsinput.min.js'
    },

    knob: {
      selector: 'knob',
      callback: 'initKnob',
      css: '',
      js: 'knob/jquery.knob.min.js'
    },

    slider: {
      selector: 'slider',
      callback: 'initNouislider',
      css: 'nouislider/nouislider.min.css',
      js: 'nouislider/nouislider.min.js'
    },

    switchery: {
      selector: 'switchery',
      callback: 'initSwitchery',
      css: 'switchery/switchery.min.css',
      js: 'switchery/switchery.min.js'
    },

    formatter: {
      selector: '$ [data-format]',
      callback: 'initFormatter',
      css: '',
      js: 'formatter/jquery.formatter.min.js'
    },

    // New version upon finishing alpha releases of Bootstrap
    validation: {
      selector: 'validation',
      callback: 'initValidation',
      css: '',
      js: 'bootstrap-validator/validator-bs4.min.js'
    },

    wizard: {
      selector: 'wizard',
      callback: 'initWizard',
      css: '',
      js: 'bootstrap-wizard/bootstrap-wizard.min.js'
    },

    typeahead: {
      selector: 'typeahead',
      js: ['typeahead/bloodhound.min.js', 'typeahead/typeahead.jquery.min.js']
    },

    bloodhound: {
      selector: 'bloodhound',
      js: 'typeahead/bloodhound.min.js'
    },

    // ======================================================================
    // Icon
    //
    iconMaterial: {
      selector: '$ .material-icons',
      css: 'material-icons/css/material-icons.css'
    },

    icon7Stroke: {
      selector: '$ [class*="pe-7s-"]',
      css: ['pe-icon-7-stroke/css/pe-icon-7-stroke.min.css', 'pe-icon-7-stroke/css/helper.min.css']
    },

    iconIon: {
      selector: '$ [class*="ion-"]',
      css: 'ionicons/css/ionicons.min.css'
    },

    iconI8: {
      selector: '$ [data-i8-icon]',
      callback: 'initI8icons',
      css: '',
      js: 'i8-icon/jquery-i8-icon.min.js'
    },

    // ======================================================================
    // Map
    //
    map: {
      selector: 'map',
      callback: 'initMap',
      css: '',
      js: 'https://maps.googleapis.com/maps/api/js?key=' + app.defaults.googleApiKey + '&callback=app.map'
    },

    mapael: {
      selector: 'mapael',
      callback: 'initMapael',
      css: '',
      js: ['jquery.mousewheel/jquery.mousewheel.min.js', 'raphael/raphael.min.js', 'mapael/jquery.mapael.min.js']
    },

    // ======================================================================
    // Table
    //
    table: {
      selector: 'table',
      callback: 'initBootstrapTable',
      css: 'bootstrap-table/bootstrap-table.min.css',
      js: ['bootstrap-table/bootstrap-table.min.js', 'bootstrap-table/extensions/editable/bootstrap-table-editable.min.js', 'bootstrap-table/extensions/export/bootstrap-table-export.min.js', 'bootstrap-table/extensions/resizable/bootstrap-table-resizable.min.js', 'bootstrap-table/extensions/mobile/bootstrap-table-mobile.min.js', 'bootstrap-table/extensions/filter-control/bootstrap-table-filter-control.min.js', 'bootstrap-table/extensions/multiple-sort/bootstrap-table-multiple-sort.min.js']
    },

    jsgrid: {
      selector: 'jsgrid',
      callback: 'initJsGrid',
      css: ['jsgrid/jsgrid.min.css', 'jsgrid/jsgrid-theme.min.css'],
      js: 'jsgrid/jsgrid.min.js'
    },

    datatables: {
      selector: 'datatables',
      callback: 'initDatatables',
      css: 'datatables/css/dataTables.bootstrap4.min.css',
      js: ['datatables/js/jquery.dataTables.min.js', 'datatables/js/dataTables.bootstrap4.min.js']
    },

    // ======================================================================
    // UI
    //
    sweetalert: {
      selector: 'sweetalert',
      callback: 'initSweetalert2',
      css: 'sweetalert2/sweetalert2.min.css',
      js: 'sweetalert2/sweetalert2.min.js'
    },

    lity: {
      selector: 'lity',
      callback: 'initLity',
      css: 'lity/lity.min.css',
      js: 'lity/lity.min.js'
    },

    sortable: {
      selector: 'sortable',
      callback: 'initSortable',
      css: '',
      js: 'html5sortable/html.sortable.min.js'
    },

    shepherd: {
      selector: 'shepherd',
      callback: 'initShepherd',
      css: 'shepherd/css/shepherd-theme-arrows-plain-buttons.css',
      js: ['shepherd/js/tether.js', 'shepherd/js/shepherd.min.js']
    },

    shuffle: {
      selector: 'shuffle',
      callback: 'initShuffle',
      css: '',
      js: ['imagesloaded/imagesloaded.pkgd.min.js', 'shuffle/shuffle.min.js']
    },

    photoswipe: {
      selector: 'photoswipe',
      callback: 'initPhotoswipe',
      css: ['photoswipe/photoswipe.min.css', 'photoswipe/default-skin/default-skin.min.css'],
      js: 'photoswipe/jquery.photoswipe-global.js'
    },

    swiper: {
      selector: 'swiper',
      callback: 'initSwiper',
      css: 'swiper/css/swiper.min.css',
      js: 'swiper/js/swiper.min.js'
    },

    fullscreen: {
      selector: 'fullscreen',
      callback: 'initFullscreen',
      js: 'screenfull/screenfull.min.js'
    },

    jqueryui: {
      selector: 'jqueryui',
      //callback: 'initFullscreen',
      js: 'jqueryui/jquery-ui.min.js'
    },

    // ======================================================================
    // Upload
    //
    dropify: {
      selector: 'dropify',
      callback: 'initDropify',
      css: 'dropify/css/dropify.min.css',
      js: 'dropify/js/dropify.min.js'
    },

    dropzone: {
      selector: 'dropzone',
      callback: 'initDropzone',
      css: 'dropzone/min/dropzone.min.css',
      js: 'dropzone/min/dropzone.min.js'
    },

    // ======================================================================
    // Misc
    //
    fullcalendar: {
      selector: 'fullcalendar',
      callback: 'initFullcalendar',
      css: 'fullcalendar/fullcalendar.min.css',
      js: ['moment/moment.min.js', 'fullcalendar/fullcalendar.min.js']
    },

    justified: {
      selector: 'justified-gallery',
      callback: 'initJustifiedGallery',
      css: 'justified-gallery/css/justifiedGallery.min.css',
      js: 'justified-gallery/js/jquery.justifiedGallery.min.js'
    },

    animate: {
      selector: '$ .animated',
      css: 'animate/animate.min.css'
    },

    intercoolerjs: {
      selector: '$ [ic-get-from], [ic-post-to], [ic-put-to], [ic-patch-to], [ic-delete-from], [data-ic-get-from], [data-ic-post-to], [data-ic-put-to], [data-ic-patch-to], [data-ic-delete-from]',
      js: 'intercoolerjs/intercoolerjs.min.js'
    },

    smoothscroll: {
      selector: 'smoothscroll',
      js: 'smoothscroll/smoothscroll.min.js'
    },

    aos: {
      selector: '$ [data-aos]',
      callback: 'initAos',
      css: 'aos/aos.css',
      js: 'aos/aos.js'
    },

    typed: {
      selector: 'typing',
      callback: 'initTyped',
      js: 'typed.js/typed.min.js'
    },

    // ======================================================================
    // Misc
    //


    vuejs: {
      selector: 'vuejs',
      js: 'vuejs/vue.min.js'
    },

    reactjs: {
      selector: 'reactjs',
      js: ['reactjs/react.min.js', 'reactjs/react-dom.min.js']
    }

  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/provider.js":
/*!*************************************************!*\
  !*** ./assets/back/js/src/provider/provider.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// provider
// =====================
//
+function ($, window) {

  var provider = {};
  provider.callbacks = [];

  var msobservers = [];
  var loaded = [];
  var firstLoad = true;
  var observer;

  var MsObserver = function MsObserver(selector, callback) {
    this.selector = selector;
    this.callback = callback;
  };

  provider.init = function () {

    $LAB.setGlobalDefaults({
      BasePath: app.dir.vendor,
      AlwaysPreserveOrder: true,
      AllowDuplicates: false
      //Debug: true
    });

    provider.inject();
    provider.observeDOM();
  };

  provider.observeDOM = function () {
    app.ready(function () {
      observer = new MutationObserver(function (mutations) {
        provider.inject();
        for (var i = 0; i < msobservers.length; i++) {
          $(msobservers[i].selector).each(msobservers[i].callback);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true, attributes: false });
    });
  };

  // All of the plugins should initialize using this function
  //
  provider.provide = function (selector, init_callback, isRawSelector) {

    if (!isRawSelector === true) {
      selector = provider.getSelector(provider.list[selector].selector);
    }

    // Call once per element
    var seen = [];
    var callbackOnce = function callbackOnce() {
      // Do not run script if it's provided from a <script> or has data-init="false"
      if ($(this).is('script') || $(this).data('init') == false) {
        return;
      }

      if (seen.indexOf(this) == -1) {
        seen.push(this);
        $(this).each(init_callback);
      }
    };

    $(selector).each(callbackOnce);
    msobservers.push(new MsObserver(selector, callbackOnce));
  };

  provider.inject = function (pluginName) {

    if (pluginName !== undefined) {
      var vendor = provider.list[pluginName];

      if (vendor === undefined) {
        return;
      }

      // Check if it's already loaded
      if (loaded.indexOf(pluginName) > -1) {
        return;
      }

      // Load css files
      if ('css' in vendor) {
        app.loadStyle(vendor.css, app.dir.vendor);
      }

      // Load js files
      if ('js' in vendor) {
        var js = vendor.js;

        if (Array.isArray(js)) {
          for (var i = 0; i < js.length; i++) {
            $LAB.queueScript(js[i]);
          }
        } else {
          $LAB.queueScript(js);
        }
      }

      // Queue callbacks
      if ('callback' in vendor) {
        //console.log(vendor.callback);
        $LAB.queueWait(function () {
          app.call('provider.' + vendor.callback);
        });
      }

      // Add to loaded list
      loaded.push(pluginName);

      $LAB.runQueue();

      return;
    }

    var localCallbacks = [];

    // Fetch dependencies from DOM
    //
    $.each(provider.list, function (name, vendor) {

      // Check if it's already loaded
      if (loaded.indexOf(name) > -1) {
        return;
      }

      // Check if any element exists for the plugin
      if (!$(provider.getSelector(vendor.selector)).length) {
        return;
      }

      // Load css files
      if ('css' in vendor) {
        app.loadStyle(vendor.css, app.dir.vendor);
      }

      // Load js files
      if ('js' in vendor) {
        var js = vendor.js;

        if (Array.isArray(js)) {
          for (var i = 0; i < js.length; i++) {
            $LAB.queueScript(js[i]);
          }
        } else {
          $LAB.queueScript(js);
        }
      }

      // Queue callbacks
      if ('callback' in vendor) {
        localCallbacks.push(vendor.callback);
      }

      // Add to loaded list
      loaded.push(name);
    });

    if (firstLoad) {
      provider.injectExtra();

      $LAB.queueWait(function () {
        provider.callbacks = localCallbacks;
        app.isReady();
      });
      firstLoad = false;
    } else {
      $LAB.queueWait(function () {
        for (var i = 0; i < localCallbacks.length; i++) {
          app.call('provider.' + localCallbacks[i]);
        }
      });
    }

    $LAB.runQueue();
  };

  provider.injectExtra = function () {

    // Load Mapael required maps
    //
    $('[data-mapael-map]').each(function () {
      var js = 'mapael/maps/' + $(this).data('mapael-map') + '.min.js';
      $LAB.queueScript(js);
    });
  };

  // Inject plugins if they called in app.ready()
  //
  provider.injectCalledVendors = function () {
    var callbacksStr = app.getReadyCallbacksString();
    var localCallbacks = [];

    var searchList = {
      typeahead: ').typeahead('
    };

    $.each(searchList, function (name, keyword) {
      if (callbacksStr.indexOf(keyword) == -1) {
        return;
      }

      var vendor = provider.list[name];

      // Check if it's already loaded
      if (loaded.indexOf(name) > -1) {
        return;
      }

      // Load css files
      if ('css' in vendor) {
        app.loadStyle(vendor.css, app.dir.vendor);
      }

      // Load js files
      if ('js' in vendor) {
        var js = vendor.js;

        if (Array.isArray(js)) {
          for (var i = 0; i < js.length; i++) {
            $LAB.queueScript(js[i]);
          }
        } else {
          $LAB.queueScript(js);
        }
      }

      // Queue callbacks
      if ('callback' in vendor) {
        localCallbacks.push(vendor.callback);
      }

      // Add to loaded list
      loaded.push(name);
    });

    $LAB.queueWait(function () {
      for (var i = 0; i < localCallbacks.length; i++) {
        app.call('provider.' + localCallbacks[i]);
      }
    });

    $LAB.runQueue();
  };

  provider.callCallbacks = function (list) {
    for (var i = 0; i < provider.callbacks.length; i++) {
      app.call('provider.' + provider.callbacks[i]);
    }
    provider.callbacks = [];
  };

  provider.getSelector = function (str) {
    var selector = '[data-provide~="' + str + '"]';
    if (str.indexOf('$ ') == 0) {
      selector = str.substr(2);
    }
    return selector;
  };

  window.provider = provider;
}(jQuery, window);

/***/ }),

/***/ "./assets/back/js/src/provider/table.js":
/*!**********************************************!*\
  !*** ./assets/back/js/src/provider/table.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Table plugins
// =====================
//
+function ($) {

  provider.initTables = function () {

    provider.initBootstrapTable();
  };

  provider.initBootstrapTable = function () {
    if (!$.fn.bootstrapTable) {
      return;
    }

    jQuery.fn.bootstrapTable.defaults.classes = 'table';

    provider.provide('table', function () {
      $(this).bootstrapTable();
    });

    $('.fixed-table-body').perfectScrollbar();
  };

  provider.initJsGrid = function () {
    if (!$.fn.jsGrid) {
      return;
    }
  };

  provider.initDatatables = function () {
    if (!$.fn.DataTable) {
      return;
    }

    provider.provide('datatables', function () {
      $(this).DataTable();
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/ui.js":
/*!*******************************************!*\
  !*** ./assets/back/js/src/provider/ui.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// =====================
// UI plugins
// =====================
//
+function ($) {

  provider.initUIs = function () {

    provider.initSweetalert2();
    provider.initAnimsition();
    provider.initLity();
    provider.initSortable();
    provider.initShepherd();
    provider.initFilterizr();
  };

  provider.initSweetalert2 = function () {
    if (window['swal'] === undefined) {
      return;
    }

    sweetAlert.setDefaults({
      confirmButtonClass: 'btn btn-bold btn-primary',
      cancelButtonClass: 'btn btn-bold btn-secondary',
      buttonsStyling: false
    });
  };

  // Animsition page transition
  //
  provider.initAnimsition = function () {
    if (!$.fn.animsition) {
      return;
    }

    provider.provide('.animsition', function () {

      $(this).animsition({
        linkElement: '[data-provide~="animsition"], .animsition-link',
        loadingInner: ''
      });
    }, true);
  };

  // Lity
  //
  provider.initLity = function () {
    if (window['lity'] === undefined) {
      return;
    }

    $(document).on('click', '[data-provide~="lity"]', lity);
  };

  // Dragable / Sortable
  //
  provider.initSortable = function () {
    if (window['sortable'] === undefined) {
      return;
    }

    provider.provide('sortable', function (index, element) {
      sortable(element, {
        dragImage: null,
        forcePlaceholderSize: true,
        items: $(this).dataAttr('items', null),
        handle: $(this).dataAttr('sortable-handle', null)
      });

      sortable($(this))[0].addEventListener('sortupdate', function (e) {

        if (!$(this).hasDataAttr('on-change')) {
          return;
        }

        var callback = $(this).data('on-change');

        app.call(callback, e.detail);
      });
    });
  };

  // Tour
  //
  provider.initShepherd = function () {
    if (window['Shepherd'] === undefined) {
      return;
    }

    Shepherd.on('start', function () {
      $('body').prepend('<div class="app-backdrop backdrop-tour"></div>');
    });

    Shepherd.on('inactive', function () {
      $('.app-backdrop.backdrop-tour').remove();
    });
  };

  // Shuffle
  //
  provider.initShuffle = function () {
    if (window['Shuffle'] === undefined) {
      return;
    }

    var Shuffle = window.Shuffle;

    Shuffle.options.itemSelector = '[data-shuffle="item"]';
    Shuffle.options.sizer = '[data-shuffle="sizer"]';
    Shuffle.options.delimeter = ',';
    Shuffle.options.speed = 500;

    provider.provide('shuffle', function () {

      var list = $(this).find('[data-shuffle="list"]');
      var filter = $(this).find('[data-shuffle="filter"]');
      var shuffleInstance = new Shuffle(list);

      if (filter.length) {

        $(filter).find('[data-shuffle="button"]').each(function () {
          $(this).on('click', function () {
            var btn = $(this);
            var isActive = btn.hasClass('active');
            var btnGroup = btn.data('group');

            $(this).closest('[data-shuffle="filter"]').find('[data-shuffle="button"].active').removeClass('active');

            var filterGroup;
            if (isActive) {
              btn.removeClass('active');
              filterGroup = Shuffle.ALL_ITEMS;
            } else {
              btn.addClass('active');
              filterGroup = btnGroup;
            }

            shuffleInstance.filter(filterGroup);
          });
        });
      }

      $(this).imagesLoaded(function () {
        shuffleInstance.layout();
      });
    });
  };

  // PhotoSwipe
  //
  provider.initPhotoswipe = function () {
    if (!$.fn.photoSwipe) {
      return;
    }

    provider.provide('photoswipe', function () {
      var photoswipe = $(this);
      var selector = $(this).dataAttr('slide-selector', 'img');

      var options = {};
      var cast = _defineProperty({
        escKey: 'bool',
        loop: 'bool',
        pinchToClose: 'bool',
        arrowKeys: 'bool',
        history: 'bool',
        modal: 'bool',
        index: 'num',
        bgOpacity: 'num',
        timeToIdle: 'num',
        spacing: 'num'
      }, 'spacing', 'array');

      options = $.extend(options, app.getDataOptions($(this), cast));

      var events = {
        close: function close() {
          if (photoswipe.hasDataAttr('on-close')) {
            app.call(photoswipe.data('on-close'));
          }
        }
      };

      $(this).photoSwipe(selector, options, events);
    });
  };

  // Make an element fullscreen
  //
  provider.initFullscreen = function () {
    if (window['screenfull'] === undefined) {
      return;
    }

    if (!screenfull.enabled) {
      return;
    }

    var selector = '[data-provide~="fullscreen"]';

    $(selector).each(function () {
      $(this).data('fullscreen-default-html', $(this).html());
    });

    document.addEventListener(screenfull.raw.fullscreenchange, function () {
      if (screenfull.isFullscreen) {
        $(selector).each(function () {
          $(this).addClass('is-fullscreen');
        });
      } else {
        $(selector).each(function () {
          $(this).removeClass('is-fullscreen');
        });
      }
    });

    $(document).on('click', selector, function () {
      screenfull.toggle();
    });
  };

  // Swiper carousel/slider
  //
  provider.initSwiper = function () {
    if (window['Swiper'] === undefined) {
      return;
    }

    provider.provide('swiper', function () {
      var options = {
        autoplay: 0,
        speed: 1000,
        loop: true,
        breakpoints: {
          // when window width is <= 640px
          480: {
            slidesPerView: 1
          }
        }
      };

      var swiper = $(this);

      if (swiper.find('.swiper-button-next').length) {
        options.nextButton = '.swiper-button-next';
      }

      if (swiper.find('.swiper-button-prev').length) {
        options.prevButton = '.swiper-button-prev';
      }

      if (swiper.find('.swiper-pagination').length) {
        options.pagination = '.swiper-pagination';
        options.paginationClickable = true;

        swiper.addClass('swiper-pagination-outside');
      }

      options = $.extend(options, app.getDataOptions($(this)));

      new Swiper(swiper, options);
    });
  };
}(jQuery);

/***/ }),

/***/ "./assets/back/js/src/provider/upload.js":
/*!***********************************************!*\
  !*** ./assets/back/js/src/provider/upload.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



// =====================
// Upload plugins
// =====================
//
+function ($) {

  provider.initUploads = function () {

    provider.initDropify();
    provider.initDropzone();
  };

  provider.initDropify = function () {
    if (!$.fn.dropify) {
      return;
    }

    provider.provide('dropify', function () {
      $(this).dropify();
    });
  };

  provider.initDropzone = function () {
    if (!$.fn.dropzone) {
      return;
    }

    Dropzone.autoDiscover = false;

    provider.provide('dropzone', function () {
      var options = {};
      options = $.extend(options, app.getDataOptions($(this)));
      $(this).addClass('dropzone');
      $(this).dropzone(options);
    });
  };
}(jQuery);

/***/ }),

/***/ 0:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./assets/back/js/src/jquery-extends.js ./assets/back/js/src/app.js ./assets/back/js/src/provider/provider.js ./assets/back/js/src/provider/provider-list.js ./assets/back/js/src/provider/chart.js ./assets/back/js/src/provider/code.js ./assets/back/js/src/provider/editor.js ./assets/back/js/src/provider/emoji.js ./assets/back/js/src/provider/form.js ./assets/back/js/src/provider/icon.js ./assets/back/js/src/provider/map.js ./assets/back/js/src/provider/table.js ./assets/back/js/src/provider/ui.js ./assets/back/js/src/provider/upload.js ./assets/back/js/src/provider/misc.js ./assets/back/js/src/plugin/map.js ./assets/back/js/src/plugin/modaler.js ./assets/back/js/src/plugin/toast.js ./assets/back/js/src/component/aside.js ./assets/back/js/src/component/topbar.js ./assets/back/js/src/component/sidebar.js ./assets/back/js/src/component/quickview.js ./assets/back/js/src/component/dock.js ./assets/back/js/src/component/topbar-menu.js ./assets/back/js/src/component/lookup.js ./assets/back/js/src/component/cards.js ./assets/back/js/src/app-extra.js ./assets/back/js/src/app-init.js ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./assets/back/js/src/jquery-extends.js */"./assets/back/js/src/jquery-extends.js");
__webpack_require__(/*! ./assets/back/js/src/app.js */"./assets/back/js/src/app.js");
__webpack_require__(/*! ./assets/back/js/src/provider/provider.js */"./assets/back/js/src/provider/provider.js");
__webpack_require__(/*! ./assets/back/js/src/provider/provider-list.js */"./assets/back/js/src/provider/provider-list.js");
__webpack_require__(/*! ./assets/back/js/src/provider/chart.js */"./assets/back/js/src/provider/chart.js");
__webpack_require__(/*! ./assets/back/js/src/provider/code.js */"./assets/back/js/src/provider/code.js");
__webpack_require__(/*! ./assets/back/js/src/provider/editor.js */"./assets/back/js/src/provider/editor.js");
__webpack_require__(/*! ./assets/back/js/src/provider/emoji.js */"./assets/back/js/src/provider/emoji.js");
__webpack_require__(/*! ./assets/back/js/src/provider/form.js */"./assets/back/js/src/provider/form.js");
__webpack_require__(/*! ./assets/back/js/src/provider/icon.js */"./assets/back/js/src/provider/icon.js");
__webpack_require__(/*! ./assets/back/js/src/provider/map.js */"./assets/back/js/src/provider/map.js");
__webpack_require__(/*! ./assets/back/js/src/provider/table.js */"./assets/back/js/src/provider/table.js");
__webpack_require__(/*! ./assets/back/js/src/provider/ui.js */"./assets/back/js/src/provider/ui.js");
__webpack_require__(/*! ./assets/back/js/src/provider/upload.js */"./assets/back/js/src/provider/upload.js");
__webpack_require__(/*! ./assets/back/js/src/provider/misc.js */"./assets/back/js/src/provider/misc.js");
__webpack_require__(/*! ./assets/back/js/src/plugin/map.js */"./assets/back/js/src/plugin/map.js");
__webpack_require__(/*! ./assets/back/js/src/plugin/modaler.js */"./assets/back/js/src/plugin/modaler.js");
__webpack_require__(/*! ./assets/back/js/src/plugin/toast.js */"./assets/back/js/src/plugin/toast.js");
__webpack_require__(/*! ./assets/back/js/src/component/aside.js */"./assets/back/js/src/component/aside.js");
__webpack_require__(/*! ./assets/back/js/src/component/topbar.js */"./assets/back/js/src/component/topbar.js");
__webpack_require__(/*! ./assets/back/js/src/component/sidebar.js */"./assets/back/js/src/component/sidebar.js");
__webpack_require__(/*! ./assets/back/js/src/component/quickview.js */"./assets/back/js/src/component/quickview.js");
__webpack_require__(/*! ./assets/back/js/src/component/dock.js */"./assets/back/js/src/component/dock.js");
__webpack_require__(/*! ./assets/back/js/src/component/topbar-menu.js */"./assets/back/js/src/component/topbar-menu.js");
__webpack_require__(/*! ./assets/back/js/src/component/lookup.js */"./assets/back/js/src/component/lookup.js");
__webpack_require__(/*! ./assets/back/js/src/component/cards.js */"./assets/back/js/src/component/cards.js");
__webpack_require__(/*! ./assets/back/js/src/app-extra.js */"./assets/back/js/src/app-extra.js");
module.exports = __webpack_require__(/*! ./assets/back/js/src/app-init.js */"./assets/back/js/src/app-init.js");


/***/ })

},[0]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvYXBwLWV4dHJhLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9hcHAtaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9jb21wb25lbnQvYXNpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc3JjL2NvbXBvbmVudC9jYXJkcy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvY29tcG9uZW50L2RvY2suanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc3JjL2NvbXBvbmVudC9sb29rdXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc3JjL2NvbXBvbmVudC9xdWlja3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc3JjL2NvbXBvbmVudC9zaWRlYmFyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9jb21wb25lbnQvdG9wYmFyLW1lbnUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc3JjL2NvbXBvbmVudC90b3BiYXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc3JjL2pxdWVyeS1leHRlbmRzLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9wbHVnaW4vbWFwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9wbHVnaW4vbW9kYWxlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvcGx1Z2luL3RvYXN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci9jaGFydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvY29kZS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvZWRpdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci9lbW9qaS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvaWNvbi5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvbWFwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci9taXNjLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci9wcm92aWRlci1saXN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci9wcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvdGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc3JjL3Byb3ZpZGVyL3VpLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci91cGxvYWQuanMiXSwibmFtZXMiOlsiJCIsImFwcCIsImluaXRDb3JlUGx1Z2lucyIsInByb3ZpZGVyIiwiaW5pdEFuaW1zaXRpb24iLCJQb3BwZXIiLCJEZWZhdWx0cyIsIm1vZGlmaWVycyIsImNvbXB1dGVTdHlsZSIsImdwdUFjY2VsZXJhdGlvbiIsImVhY2giLCJjb2xvciIsImhhc0RhdGFBdHRyIiwiZGF0YSIsInRvb2x0aXAiLCJjb250YWluZXIiLCJ0cmlnZ2VyIiwidGVtcGxhdGUiLCJwb3BvdmVyIiwicGVyZmVjdFNjcm9sbGJhciIsIndoZWVsUHJvcGFnYXRpb24iLCJ3aGVlbFNwZWVkIiwiZG9jdW1lbnQiLCJvbiIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJpbml0VGhlUGx1Z2lucyIsInByZXZlbnREZWZhdWx0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCIkYnJvd3NlciIsImhhc0NsYXNzIiwic2V0VGltZW91dCIsImNsb3Nlc3QiLCJmaW5kIiwiZmlsZSIsImlucHV0IiwibGVuIiwiZmlsZXMiLCJsZW5ndGgiLCJmaWxlbmFtZSIsImkiLCJpdGVtIiwibmFtZSIsInN1YnN0ciIsInZhbCIsInRleHQiLCJmb2N1cyIsInNwbGl0IiwicG9wIiwibmV4dCIsImF0dHIiLCJmb3JtX2NvbWJpbmVkX3NlbGVjdG9yIiwiYWRkQ2xhc3MiLCJtYXRlcmlhbERvRmxvYXQiLCJtYXRlcmlhbE5vRmxvYXQiLCJpcyIsInNlbGVjdHBpY2tlciIsInBhcmVudCIsIndpbmRvdyIsIndpbmRvd190b3AiLCJvZmZzZXQiLCJ0b3AiLCJ0YXJnZXQiLCJnZXRUYXJnZXQiLCJzdGlja19zdGFydCIsImRhdGFBdHRyIiwic3RpY2tfZW5kIiwiaGVpZ2h0IiwiZWxfd2lkdGgiLCJ3aWR0aCIsImVsX3RvcCIsInRvcGJhciIsImlzRml4ZWQiLCJzdHlsZXMiLCJsZWZ0IiwiY3NzIiwidGgiLCJpbmRleCIsImNoaWxkcmVuIiwiY2hlY2tlZCIsInByb3AiLCJsaXN0IiwicyIsInRyaW0iLCJtZWRpYXMiLCJzaG93Iiwibm90IiwiaGlkZSIsImZpbHRlciIsInNsaWRlVG9nZ2xlIiwiZmFkZU91dCIsInJlbW92ZSIsImxvYWQiLCJhdmF0YXJzIiwiaHRtbCIsImFwcGVuZCIsIngiLCJwYWdlWCIsInkiLCJwYWdlWSIsImNsaWNrWSIsImNsaWNrWCIsImJveCIsInNldFgiLCJwYXJzZUludCIsInNldFkiLCJjaXJjbGUiLCJvdXRlcldpZHRoIiwiZHVyYXRpb24iLCJzdGVwIiwiY29tcGxldGUiLCJyYXRpbmdDaGVja0hhbmRsZSIsInJhdGluZyIsInVybCIsImdldFVSTCIsInNwaW5uZXIiLCJwbGFjZWhvbGRlciIsImtleXdvcmQiLCJsb29rdXAiLCJqUXVlcnkiLCJpbml0Iiwic2lkZWJhciIsInRvcGJhcl9tZW51IiwicXVpY2t2aWV3IiwiZG9jayIsImFzaWRlIiwiY2FyZHMiLCJpc1JlYWR5IiwidmVyc2lvbiIsImNvcmVqcyIsImRpciIsImhvbWUiLCJyZXBsYWNlIiwiYXNzZXRzIiwidmVuZG9yIiwiYXNzZXRzX2Rpcl9lbCIsImFzc2V0c19kaXIiLCJzbGljZSIsImRlZmF1bHRzIiwicHJvdmlkZSIsImdvb2dsZUFwaUtleSIsImdvb2dsZUFuYWx5dGljc0tleSIsInNtb290aFNjcm9sbCIsInNhdmVTdGF0ZSIsInRvYXN0IiwiYWN0aW9uVGl0bGUiLCJhY3Rpb25VcmwiLCJhY3Rpb25Db2xvciIsIm1vZGFsZXIiLCJpc01vZGFsIiwidHlwZSIsInNpemUiLCJ0aXRsZSIsImJhY2tkcm9wIiwiaGVhZGVyVmlzaWJsZSIsImZvb3RlclZpc2libGUiLCJjb25maXJtVmlzaWJsZSIsImNvbmZpcm1UZXh0IiwiY29uZmlybUNsYXNzIiwiY2FuY2VsVmlzaWJsZSIsImNhbmNlbFRleHQiLCJjYW5jZWxDbGFzcyIsImJvZHlFeHRyYUNsYXNzIiwiYXV0b0Rlc3Ryb3kiLCJvblNob3ciLCJvblNob3duIiwib25IaWRlIiwib25IaWRkZW4iLCJvbkNvbmZpcm0iLCJvbkNhbmNlbCIsIm1vZGFsSWQiLCJnb29nbGVNYXAiLCJsYXQiLCJsbmciLCJ6b29tIiwibWFya2VyTGF0IiwibWFya2VyTG5nIiwibWFya2VySWNvbiIsInN0eWxlIiwiYnJlYWtwb2ludCIsInhzIiwic20iLCJtZCIsImxnIiwiY29sb3JzIiwicHJpbWFyeSIsInNlY29uZGFyeSIsInN1Y2Nlc3MiLCJpbmZvIiwid2FybmluZyIsImRhbmdlciIsImJnIiwidGV4dFNlY29uZGFyeSIsImZvbnQiLCJib2R5IiwicmVhZHlDYWxsYmFja3MiLCJnZXRSZWFkeUNhbGxiYWNrc1N0cmluZyIsInRvU3RyaW5nIiwicmVhZHkiLCJjYWxsYmFjayIsInB1c2giLCJjb3VudCIsImNhbGxDYWxsYmFja3MiLCJjb25zb2xlIiwiZXJyb3IiLCJwcmVsb2FkZXIiLCJzcGVlZCIsInZlbmRvcnMiLCJBcnJheSIsImlzQXJyYXkiLCJpbmplY3QiLCJjYWxsIiwiZnVuY3Rpb25OYW1lIiwibG9nIiwiYXJncyIsInByb3RvdHlwZSIsImFyZ3VtZW50cyIsImNvbnRleHQiLCJuYW1lc3BhY2VzIiwiZnVuYyIsImFwcGx5IiwibG9hZFNjcmlwdCIsImdldFNjcmlwdCIsImxvYWRTdHlsZSIsImJhc2UiLCJ1bmRlZmluZWQiLCJhZnRlciIsImtleSIsImZuIiwidW5rZXkiLCJfbm9ybWFsaXplS2V5Iiwib2ZmIiwicHJldiIsImNvbmZpZyIsIm9wdGlvbnMiLCJleHRlbmQiLCJzbW9vdGhzY3JvbGwiLCJvIiwiZyIsInIiLCJhIiwibSIsInEiLCJsIiwiRGF0ZSIsImNyZWF0ZUVsZW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImFzeW5jIiwic3JjIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImdhIiwic3RhdGVzIiwic3RhdGUiLCJmb2xkIiwiZml4Iiwic2hvcnRjdXQiLCJrZXlzIiwiZ2V0RGF0YU9wdGlvbnMiLCJlbCIsImNhc3RMaXN0IiwidmFsdWUiLCJkYXRhVG9PcHRpb24iLCJCb29sZWFuIiwiTnVtYmVyIiwibG9jYWxTdG9yYWdlIiwidGhlYWRtaW4iLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJ0b2dnbGVTdGF0ZSIsInJlbW92ZUl0ZW0iLCJjbGVhciIsImd1aWQiLCJNYXRoIiwicmFuZG9tIiwib3B0aW9uVG9EYXRhIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsImh0bWxFc2NhcGUiLCJlc2NhcGVNYXAiLCJzb3VyY2UiLCJPYmplY3QiLCJqb2luIiwidGVzdFJlZ2V4cCIsIlJlZ0V4cCIsInJlcGxhY2VSZWdleHAiLCJzdHJpbmciLCJ0ZXN0IiwibWF0Y2giLCJ0b2dnbGUiLCJ0b2dnbGVDbGFzcyIsIm9wZW4iLCJjbG9zZSIsInBhcmVudHMiLCIkY2FyZCIsImludGVydmFsIiwiY2Fyb3VzZWwiLCJpbnRlcnZhbF9ibGluayIsImludGVydmFsX3NoYWtlIiwidG9nZ2xlTWluaW1pemUiLCJ0b2dnbGVNYXhpbWl6ZSIsInRvZ2dsZXIiLCJkb2NrX2VsIiwiYm9keV9lbCIsInByZXBlbmRUbyIsIl9sb2FkZXIiLCJ1bk1heGltaXplIiwibWF4aW1pemUiLCJibGluayIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInN0b3BCbGluayIsInNoYWtlIiwic3RvcFNoYWtlIiwicXYiLCIkc3VibWVudSIsInNsaWRlVXAiLCJ0b2dnbGVGb2xkIiwidW5mb2xkIiwicHJlcGVuZCIsImJyZWFrb24iLCJzbGlkZURvd24iLCJ0b2dnbGVGaXgiLCJ1bmZpeCIsImhhc0F0dHJpYnV0ZSIsImRlZiIsImdldEF0dHJpYnV0ZSIsIm91dGVySFRNTCIsImZ1bGxIVE1MIiwiZXhwciIsInNlYXJjaCIsImluZGV4T2YiLCJzY3JvbGxUb0VuZCIsIm1hcCIsInNldHRpbmciLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiY2VudGVyIiwibWFya2VyIiwiTWFya2VyIiwicG9zaXRpb24iLCJhbmltYXRpb24iLCJBbmltYXRpb24iLCJEUk9QIiwiaWNvbiIsImluZm93aW5kb3ciLCJJbmZvV2luZG93IiwiY29udGVudCIsImFkZExpc3RlbmVyIiwic2V0IiwiaGFuZGxlQ2FsbGJhY2siLCJpZCIsImlzRnVuY3Rpb24iLCJzdWJzdHJpbmciLCJtb2RhbCIsInRoaXMiLCJodG1sX2hlYWRlciIsImh0bWxfZm9vdGVyIiwibW9kYWxfaHRtbCIsImFwcGVuZFRvIiwiJHRvYXN0IiwiYWN0aW9uIiwiZmluaXNoIiwicXVldWUiLCJkZWxheSIsImluaXRDaGFydHMiLCJpbml0UGVpdHkiLCJpbml0U3BhcmtsaW5lIiwiaW5pdEVhc3lQaWVDaGFydCIsImluaXRDaGFydGpzIiwicGVpdHkiLCJyYWRpdXMiLCJmaWxsIiwiZGVsaW1pdGVyIiwibWluIiwibWF4Iiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJwYWRkaW5nIiwiZWFzeVBpZUNoYXJ0IiwiYmFyQ29sb3IiLCJ0cmFja0NvbG9yIiwic3BhcmtsaW5lIiwiZGVmQ29sb3IiLCJzcG90Q29sb3IiLCJzcG90SGlnaGxpZ2h0Q29sb3IiLCJuZWdDb2xvciIsImNvbW1vbiIsImVuYWJsZVRhZ09wdGlvbnMiLCJ0YWdPcHRpb25zUHJlZml4IiwidGFnVmFsdWVzQXR0cmlidXRlIiwibGluZUNvbG9yIiwiZmlsbENvbG9yIiwibGluZSIsIm1pblNwb3RDb2xvciIsIm1heFNwb3RDb2xvciIsImhpZ2hsaWdodFNwb3RDb2xvciIsImhpZ2hsaWdodExpbmVDb2xvciIsImJhciIsImJhcldpZHRoIiwiYmFyU3BhY2luZyIsIm5lZ0JhckNvbG9yIiwiemVyb0NvbG9yIiwic3RhY2tlZEJhckNvbG9yIiwidHJpc3RhdGUiLCJwb3NCYXJDb2xvciIsInplcm9CYXJDb2xvciIsImRpc2NyZXRlIiwidGhyZXNob2xkQ29sb3IiLCJwaWUiLCJzbGljZUNvbG9ycyIsImJveExpbmVDb2xvciIsImJveEZpbGxDb2xvciIsIndoaXNrZXJDb2xvciIsIm91dGxpZXJMaW5lQ29sb3IiLCJvdXRsaWVyRmlsbENvbG9yIiwibWVkaWFuQ29sb3IiLCJ0YXJnZXRDb2xvciIsImJ1bGxldCIsInRhcmdldFdpZHRoIiwicGVyZm9ybWFuY2VDb2xvciIsInJhbmdlQ29sb3JzIiwiQ2hhcnQiLCJnbG9iYWwiLCJkZWZhdWx0Rm9udENvbG9yIiwiZGVmYXVsdEZvbnRTaXplIiwiZGVmYXVsdENvbG9yIiwic2NhbGUiLCJncmlkTGluZXMiLCJ6ZXJvTGluZUNvbG9yIiwibGVnZW5kIiwibGFiZWxzIiwiYm94V2lkdGgiLCJ0b29sdGlwcyIsImJhY2tncm91bmRDb2xvciIsImJvZHlTcGFjaW5nIiwidGl0bGVNYXJnaW5Cb3R0b20iLCJ4UGFkZGluZyIsInlQYWRkaW5nIiwiY2FyZXRTaXplIiwiY29ybmVyUmFkaXVzIiwiZWxlbWVudHMiLCJhcmMiLCJib3JkZXJDb2xvciIsImJvcmRlcldpZHRoIiwicG9pbnQiLCJyZWN0YW5nbGUiLCJpbml0TW9ycmlzIiwiaW5pdENvZGVzIiwiaW5pdFByaXNtIiwiaW5pdENsaXBib2FyZCIsImJlZm9yZSIsInNjcm9sbExlZnQiLCJjbGlwYm9hcmRTbmlwcGV0cyIsIkNsaXBib2FyZCIsIm5leHRFbGVtZW50U2libGluZyIsImNsZWFyU2VsZWN0aW9uIiwiaW5pdEVkaXRvcnMiLCJpbml0U3VtbWVybm90ZSIsInN1bW1lcm5vdGUiLCJkaWFsb2dzSW5Cb2R5IiwiZGlhbG9nc0ZhZGUiLCJ0b29sYmFyIiwibWFya3VwIiwiaW5pdFF1aWxsIiwidGhlbWUiLCJ0b29sYmFyRnVsbE9wdGlvbnMiLCJtb2R1bGVzIiwiUXVpbGwiLCJpbml0RW1vamllcyIsImluaXRFbW9qaW9uZSIsImVtb2ppb25lIiwiaW1hZ2VUeXBlIiwic3ByaXRlcyIsImFzY2lpIiwiaW1hZ2VQYXRoU1ZHU3ByaXRlcyIsIm9yaWdpbmFsIiwiY29udmVydGVkIiwidG9JbWFnZSIsImluaXRGb3JtcyIsImluaXRTZWxlY3RwaWNrZXIiLCJpbml0RGF0ZXBpY2tlciIsImluaXRNaW5pY29sb3IiLCJpbml0Q2xvY2twaWNrZXIiLCJpbml0TWF4bGVuZ3RoIiwiaW5pdFN0cmVuZ3RoIiwiaW5pdFRhZ3NpbnB1dCIsImluaXRLbm9iIiwiaW5pdE5vdWlzbGlkZXIiLCJpbml0U3dpdGNoZXJ5IiwiaW5pdEZvcm1hdHRlciIsImluaXRWYWxpZGF0aW9uIiwiaW5pdFdpemFyZCIsImljb25CYXNlIiwidGlja0ljb24iLCJkYXRlcGlja2VyIiwibXVsdGlkYXRlU2VwYXJhdG9yIiwiaW5wdXRzIiwibWluaWNvbG9ycyIsImNoYW5nZSIsIm9wYWNpdHkiLCJmb3JtYXQiLCJzd2F0Y2hlcyIsImNsb2NrcGlja2VyIiwiZG9uZXRleHQiLCJtYXhsZW5ndGgiLCJ3YXJuaW5nQ2xhc3MiLCJsaW1pdFJlYWNoZWRDbGFzcyIsInBsYWNlbWVudCIsImluaXRQd1N0cmVuZ3RoIiwicHdzdHJlbmd0aCIsInVpIiwiYm9vdHN0cmFwNCIsInByb2dyZXNzQmFyRW1wdHlQZXJjZW50YWdlIiwic2hvd1ZlcmRpY3RzIiwidXNlcm5hbWVGaWVsZCIsImFkZCIsIndyYXBBbGwiLCJvdXRlckhlaWdodCIsInJpZ2h0IiwiYm90dG9tIiwidGFnc2lucHV0Iiwia25vYiIsInRoaWNrbmVzcyIsImZnQ29sb3IiLCJiZ0NvbG9yIiwiZWxlbWVudCIsInJhbmdlIiwic3RhcnQiLCJjb25uZWN0IiwibWFyZ2luIiwibGltaXQiLCJvcmllbnRhdGlvbiIsImRpcmVjdGlvbiIsImJlaGF2aW91ciIsInRvIiwiZnJvbSIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJ2YWx1ZXMiLCJoYW5kbGUiLCJzdHJWYWwiLCJTd2l0Y2hlcnkiLCJmb3JtYXR0ZXIiLCJwYXR0ZXJuIiwicGVyc2lzdGVudCIsInZhbGlkYXRvciIsIkNvbnN0cnVjdG9yIiwiRk9DVVNfT0ZGU0VUIiwiYm9vdHN0cmFwV2l6YXJkIiwid2l6YXJkIiwibmF2X2l0ZW0iLCJ0YWJfcGFuZSIsInRhYkNsYXNzIiwibmV4dFNlbGVjdG9yIiwicHJldmlvdXNTZWxlY3RvciIsImZpcnN0U2VsZWN0b3IiLCJsYXN0U2VsZWN0b3IiLCJmaW5pc2hTZWxlY3RvciIsImJhY2tTZWxlY3RvciIsIm9uVGFiQ2xpY2siLCJ0YWIiLCJuYXZpZ2F0aW9uIiwib25OZXh0IiwiY3VycmVudF9pbmRleCIsImN1cnJfdGFiIiwiZXEiLCJ2YWxpZGF0b3Jfc2VsZWN0b3IiLCJhZGRCYWNrIiwib25CYWNrIiwib25QcmV2aW91cyIsIm9uVGFiU2hvdyIsIm5hdiIsIm9uRmluaXNoIiwib25lIiwiaW5pdFR5cGVhaGVhZCIsImluaXRJY29ucyIsImluaXRJOGljb25zIiwiaThpY29ucyIsImljb25zIiwiZGVmYXVsdEljb25TZXRVcmwiLCJpbml0TWFwcyIsImluaXRNYXAiLCJpbml0TWFwYWVsIiwiaW5pdE1pc2NzIiwiaW5pdEp1c3RpZmllZEdhbGxlcnkiLCJpbml0RnVsbGNhbGVuZGFyIiwiZnVsbENhbGVuZGFyIiwianVzdGlmaWVkR2FsbGVyeSIsImNhcHRpb25zIiwiY3NzQW5pbWF0aW9uIiwiaW1hZ2VzQW5pbWF0aW9uRHVyYXRpb24iLCJpbml0QW9zIiwiQU9TIiwiaW5pdFR5cGVkIiwic3RyaW5ncyIsInR5cGVTcGVlZCIsImJhY2tTcGVlZCIsImxvb3AiLCJ0eXBlZCIsIlR5cGVkIiwiZWFzeXBpZSIsInNlbGVjdG9yIiwianMiLCJjaGFydGpzIiwibW9ycmlzIiwicHJpc20iLCJjbGlwYm9hcmQiLCJxdWlsbCIsImVtb2ppIiwidGltZXBpY2tlciIsImNvbG9ycGlja2VyIiwic2xpZGVyIiwic3dpdGNoZXJ5IiwidmFsaWRhdGlvbiIsInR5cGVhaGVhZCIsImJsb29kaG91bmQiLCJpY29uTWF0ZXJpYWwiLCJpY29uN1N0cm9rZSIsImljb25Jb24iLCJpY29uSTgiLCJtYXBhZWwiLCJ0YWJsZSIsImpzZ3JpZCIsImRhdGF0YWJsZXMiLCJzd2VldGFsZXJ0IiwibGl0eSIsInNvcnRhYmxlIiwic2hlcGhlcmQiLCJzaHVmZmxlIiwicGhvdG9zd2lwZSIsInN3aXBlciIsImZ1bGxzY3JlZW4iLCJqcXVlcnl1aSIsImRyb3BpZnkiLCJkcm9wem9uZSIsImZ1bGxjYWxlbmRhciIsImp1c3RpZmllZCIsImludGVyY29vbGVyanMiLCJhb3MiLCJ2dWVqcyIsInJlYWN0anMiLCJjYWxsYmFja3MiLCJtc29ic2VydmVycyIsImxvYWRlZCIsImZpcnN0TG9hZCIsIm9ic2VydmVyIiwiTXNPYnNlcnZlciIsIiRMQUIiLCJzZXRHbG9iYWxEZWZhdWx0cyIsIkJhc2VQYXRoIiwiQWx3YXlzUHJlc2VydmVPcmRlciIsIkFsbG93RHVwbGljYXRlcyIsIm9ic2VydmVET00iLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJhdHRyaWJ1dGVzIiwiaW5pdF9jYWxsYmFjayIsImlzUmF3U2VsZWN0b3IiLCJnZXRTZWxlY3RvciIsInNlZW4iLCJjYWxsYmFja09uY2UiLCJwbHVnaW5OYW1lIiwicXVldWVTY3JpcHQiLCJxdWV1ZVdhaXQiLCJydW5RdWV1ZSIsImxvY2FsQ2FsbGJhY2tzIiwiaW5qZWN0RXh0cmEiLCJpbmplY3RDYWxsZWRWZW5kb3JzIiwiY2FsbGJhY2tzU3RyIiwic2VhcmNoTGlzdCIsInN0ciIsImluaXRUYWJsZXMiLCJpbml0Qm9vdHN0cmFwVGFibGUiLCJib290c3RyYXBUYWJsZSIsImNsYXNzZXMiLCJpbml0SnNHcmlkIiwianNHcmlkIiwiaW5pdERhdGF0YWJsZXMiLCJEYXRhVGFibGUiLCJpbml0VUlzIiwiaW5pdFN3ZWV0YWxlcnQyIiwiaW5pdExpdHkiLCJpbml0U29ydGFibGUiLCJpbml0U2hlcGhlcmQiLCJpbml0RmlsdGVyaXpyIiwic3dlZXRBbGVydCIsInNldERlZmF1bHRzIiwiY29uZmlybUJ1dHRvbkNsYXNzIiwiY2FuY2VsQnV0dG9uQ2xhc3MiLCJidXR0b25zU3R5bGluZyIsImFuaW1zaXRpb24iLCJsaW5rRWxlbWVudCIsImxvYWRpbmdJbm5lciIsImRyYWdJbWFnZSIsImZvcmNlUGxhY2Vob2xkZXJTaXplIiwiaXRlbXMiLCJhZGRFdmVudExpc3RlbmVyIiwiZGV0YWlsIiwiU2hlcGhlcmQiLCJpbml0U2h1ZmZsZSIsIlNodWZmbGUiLCJpdGVtU2VsZWN0b3IiLCJzaXplciIsImRlbGltZXRlciIsInNodWZmbGVJbnN0YW5jZSIsImJ0biIsImlzQWN0aXZlIiwiYnRuR3JvdXAiLCJmaWx0ZXJHcm91cCIsIkFMTF9JVEVNUyIsImltYWdlc0xvYWRlZCIsImxheW91dCIsImluaXRQaG90b3N3aXBlIiwicGhvdG9Td2lwZSIsImNhc3QiLCJlc2NLZXkiLCJwaW5jaFRvQ2xvc2UiLCJhcnJvd0tleXMiLCJoaXN0b3J5IiwiYmdPcGFjaXR5IiwidGltZVRvSWRsZSIsInNwYWNpbmciLCJldmVudHMiLCJpbml0RnVsbHNjcmVlbiIsInNjcmVlbmZ1bGwiLCJlbmFibGVkIiwicmF3IiwiZnVsbHNjcmVlbmNoYW5nZSIsImlzRnVsbHNjcmVlbiIsImluaXRTd2lwZXIiLCJhdXRvcGxheSIsImJyZWFrcG9pbnRzIiwic2xpZGVzUGVyVmlldyIsIm5leHRCdXR0b24iLCJwcmV2QnV0dG9uIiwicGFnaW5hdGlvbiIsInBhZ2luYXRpb25DbGlja2FibGUiLCJTd2lwZXIiLCJpbml0VXBsb2FkcyIsImluaXREcm9waWZ5IiwiaW5pdERyb3B6b25lIiwiRHJvcHpvbmUiLCJhdXRvRGlzY292ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxVQUFTQSxDQUFULEVBQVc7O0FBSVY7QUFDQTtBQUNBQyxNQUFJQyxlQUFKLEdBQXNCLFlBQVc7O0FBRS9CQyxhQUFTQyxjQUFUOztBQUVBO0FBQ0FDLFdBQU9DLFFBQVAsQ0FBZ0JDLFNBQWhCLENBQTBCQyxZQUExQixDQUF1Q0MsZUFBdkMsR0FBeUQsS0FBekQ7O0FBRUE7QUFDQTtBQUNBVCxNQUFFLDJCQUFGLEVBQStCVSxJQUEvQixDQUFvQyxZQUFXO0FBQzdDLFVBQUlDLFFBQVEsRUFBWjs7QUFFQSxVQUFLWCxFQUFFLElBQUYsRUFBUVksV0FBUixDQUFvQixlQUFwQixDQUFMLEVBQTRDO0FBQzFDRCxnQkFBUSxjQUFhWCxFQUFFLElBQUYsRUFBUWEsSUFBUixDQUFhLGVBQWIsQ0FBckI7QUFDRDs7QUFFRGIsUUFBRSxJQUFGLEVBQVFjLE9BQVIsQ0FBZ0I7QUFDZEMsbUJBQVcsTUFERztBQUVkQyxpQkFBUyxPQUZLO0FBR2RDLGtCQUFVLHdCQUF1Qk4sS0FBdkIsR0FBOEI7QUFIMUIsT0FBaEI7QUFLRCxLQVpEOztBQWVBO0FBQ0E7QUFDQVgsTUFBRSwyQkFBRixFQUErQmtCLE9BQS9CLENBQXVDO0FBQ3JDSCxpQkFBVztBQUQwQixLQUF2Qzs7QUFNQTtBQUNBO0FBQ0FmLE1BQUUsbURBQUYsRUFBdURtQixnQkFBdkQ7QUFDQW5CLE1BQUUsYUFBRixFQUFpQm1CLGdCQUFqQixDQUFrQztBQUNoQ0Msd0JBQWtCLEtB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QUFJRCxHQVREOztBQWFBNW5CLFdBQVMwdUIsWUFBVCxHQUF3QixZQUFXO0FBQ2pDLFFBQUssQ0FBRTd1QixFQUFFdU8sRUFBRixDQUFLeVosUUFBWixFQUF1QjtBQUNyQjtBQUNEOztBQUVEOEcsYUFBU0MsWUFBVCxHQUF3QixLQUF4Qjs7QUFFQTV1QixhQUFTMkksT0FBVCxDQUFpQixVQUFqQixFQUE2QixZQUFVO0FBQ3JDLFVBQUkrRixVQUFVLEVBQWQ7QUFDQUEsZ0JBQVU3TyxFQUFFOE8sTUFBRixDQUFVRCxPQUFWLEVBQW1CNU8sSUFBSW9RLGNBQUosQ0FBb0JyUSxFQUFFLElBQUYsQ0FBcEIsQ0FBbkIsQ0FBVjtBQUNBQSxRQUFFLElBQUYsRUFBUXVELFFBQVIsQ0FBaUIsVUFBakI7QUFDQXZELFFBQUUsSUFBRixFQUFRZ29CLFFBQVIsQ0FBa0JuWixPQUFsQjtBQUNELEtBTEQ7QUFPRCxHQWREO0FBaUJELENBMUNBLENBMENDbkgsTUExQ0QsQ0FBRCxDIiwiZmlsZSI6ImpzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5cblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBBcHBcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkKXtcblxuXG5cbiAgLy8gUGx1Z2lucyB0aGF0IGVtYmVkZGVkIGluc2lkZSBjb2RlLm1pbi5qc1xuICAvL1xuICBhcHAuaW5pdENvcmVQbHVnaW5zID0gZnVuY3Rpb24oKSB7XG5cbiAgICBwcm92aWRlci5pbml0QW5pbXNpdGlvbigpO1xuXG4gICAgLy8gRW5hYmxlIHVzaW5nIHRyYW5zZm9ybSBmb3IgUG9wcGVyXG4gICAgUG9wcGVyLkRlZmF1bHRzLm1vZGlmaWVycy5jb21wdXRlU3R5bGUuZ3B1QWNjZWxlcmF0aW9uID0gZmFsc2U7XG5cbiAgICAvLyBFbmFibGUgdG9vbHRpcFxuICAgIC8vXG4gICAgJCgnW2RhdGEtcHJvdmlkZX49XCJ0b29sdGlwXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjb2xvciA9ICcnO1xuXG4gICAgICBpZiAoICQodGhpcykuaGFzRGF0YUF0dHIoJ3Rvb2x0aXAtY29sb3InKSApIHtcbiAgICAgICAgY29sb3IgPSAnIHRvb2x0aXAtJysgJCh0aGlzKS5kYXRhKCd0b29sdGlwLWNvbG9yJyk7XG4gICAgICB9XG5cbiAgICAgICQodGhpcykudG9vbHRpcCh7XG4gICAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgICB0cmlnZ2VyOiAnaG92ZXInLFxuICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJ0b29sdGlwJysgY29sb3IgKydcIiByb2xlPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+J1xuICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIC8vIEVuYWJsZSBwb3BvdmVyXG4gICAgLy9cbiAgICAkKCdbZGF0YS1wcm92aWRlfj1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKHtcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknXG4gICAgfSk7XG5cblxuXG4gICAgLy8gU2Nyb2xsYWJsZVxuICAgIC8vXG4gICAgJCgnLm1vZGFsLXJpZ2h0IC5tb2RhbC1ib2R5LCAubW9kYWwtbGVmdCAubW9kYWwtYm9keScpLnBlcmZlY3RTY3JvbGxiYXIoKTtcbiAgICAkKCcuc2Nyb2xsYWJsZScpLnBlcmZlY3RTY3JvbGxiYXIoe1xuICAgICAgd2hlZWxQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICB3aGVlbFNwZWVkOiAuNSxcbiAgICB9KTtcblxuXG4gICAgLy8gQ2hpbGQgYXJlYXMgdGhhdCBzaG91bGRuJ3Qgd29yayB3aXRoIEJvb3RzdHJhcCdzIGNvbGxhcHNlIHBsdWdpblxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5uby1jb2xsYXBzaW5nJywgZnVuY3Rpb24oZSl7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pXG5cblxuICB9XG5cblxuXG4gIC8vIFBsdWdpbnMgYW5kIHNtYWxsIGNvZGVzIGZvciB0aGVhZG1pblxuICAvL1xuICBhcHAuaW5pdFRoZVBsdWdpbnMgPSBmdW5jdGlvbigpIHtcblxuXG4gICAgLy8gRGlzYWJsZSBkZW1vbnN0cmF0aXZlIGxpbmtzIVxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2FbaHJlZj1cIiNcIl0nLCBmdW5jdGlvbihlKXtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuXG4gICAgLy8gQmFjayB0byB0b3BcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1wcm92aWRlfj1cInNjcm9sbHVwXCJdJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wIDogMH0sIDYwMCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cblxuICAgIC8vIEZpeCBmb3IgLm5hdi10YWJzIGRyb3Bkb3duLW1lbnVcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcubmF2LXRhYnMgLmRyb3Bkb3duLWl0ZW0nLCBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuc2libGluZ3MoJy5kcm9wZG93bi1pdGVtLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuXG5cblxuXG5cblxuXG4gICAgLy8gVXBsb2FkXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZpbGUtYnJvd3NlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyICRicm93c2VyID0gJCh0aGlzKTtcbiAgICAgIGlmICggJGJyb3dzZXIuaGFzQ2xhc3MoJ2Zvcm0tY29udHJvbCcpICkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJGJyb3dzZXIuY2xvc2VzdCgnLmZpbGUtZ3JvdXAnKS5maW5kKCdbdHlwZT1cImZpbGVcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9LDMwMCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGZpbGUgPSAkYnJvd3Nlci5jbG9zZXN0KCcuZmlsZS1ncm91cCcpLmZpbmQoJ1t0eXBlPVwiZmlsZVwiXScpO1xuICAgICAgICBmaWxlLm9uKCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZpbGUudHJpZ2dlcignY2xpY2snKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEV2ZW50IHRvIGNoYW5nZSBmaWxlIG5hbWUgYWZ0ZXIgZmlsZSBzZWxlY3Rpb25cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJy5maWxlLWdyb3VwIFt0eXBlPVwiZmlsZVwiXScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpWzBdO1xuICAgICAgdmFyIGxlbiA9IGlucHV0LmZpbGVzLmxlbmd0aDtcbiAgICAgIHZhciBmaWxlbmFtZSA9ICcnO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgIGZpbGVuYW1lICs9IGlucHV0LmZpbGVzLml0ZW0oaSkubmFtZSArICcsICc7XG4gICAgICB9XG4gICAgICBmaWxlbmFtZSA9IGZpbGVuYW1lLnN1YnN0cigwLCBmaWxlbmFtZS5sZW5ndGgtMik7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5maWxlLWdyb3VwJykuZmluZCgnLmZpbGUtdmFsdWUnKS52YWwoZmlsZW5hbWUpLnRleHQoZmlsZW5hbWUpLmZvY3VzKCk7XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgZmlsZSBuYW1lIGZvciBib290c3RyYXAgY3VzdG9tIGZpbGUgdXBsb2FkXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICcuY3VzdG9tLWZpbGUtaW5wdXQnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGZpbGVuYW1lID0gJCh0aGlzKS52YWwoKS5zcGxpdCgnXFxcXCcpLnBvcCgpO1xuICAgICAgJCh0aGlzKS5uZXh0KCcuY3VzdG9tLWZpbGUtY29udHJvbCcpLmF0dHIoJ2RhdGEtaW5wdXQtdmFsdWUnLCBmaWxlbmFtZSk7XG4gICAgfSk7XG4gICAgJCgnLmN1c3RvbS1maWxlLWNvbnRyb2w6bm90KFtkYXRhLWlucHV0LXZhbHVlXSknKS5hdHRyKCdkYXRhLWlucHV0LXZhbHVlJywgJ0Nob29zZSBmaWxlLi4uJyk7XG5cblxuXG5cblxuXG5cbiAgICAvLyBDb21iaW5lZCBncm91cFxuICAgIC8vXG4gICAgdmFyIGZvcm1fY29tYmluZWRfc2VsZWN0b3IgPSAnLmZvcm0tdHlwZS1jb21iaW5lIC5mb3JtLWdyb3VwLCAuZm9ybS10eXBlLWNvbWJpbmUuZm9ybS1ncm91cCwgLmZvcm0tdHlwZS1jb21iaW5lIC5pbnB1dC1ncm91cC1pbnB1dCc7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZm9ybV9jb21iaW5lZF9zZWxlY3RvciwgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykuZmluZCgnLmZvcm0tY29udHJvbCcpLmZvY3VzKCk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2ZvY3VzaW4nLCBmb3JtX2NvbWJpbmVkX3NlbGVjdG9yLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZm9jdXNlZCcpO1xuICAgIH0pO1xuICAgICQoZG9jdW1lbnQpLm9uKCdmb2N1c291dCcsIGZvcm1fY29tYmluZWRfc2VsZWN0b3IsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdmb2N1c2VkJyk7XG4gICAgfSk7XG5cblxuXG4gICAgLy8gTWF0ZXJpYWwgaW5wdXRcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdmb2N1cycsICcuZm9ybS10eXBlLW1hdGVyaWFsIC5mb3JtLWNvbnRyb2w6bm90KC5ib290c3RyYXAtc2VsZWN0KScsIGZ1bmN0aW9uKCl7XG4gICAgICBtYXRlcmlhbERvRmxvYXQoJCh0aGlzKSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignZm9jdXNvdXQnLCAnLmZvcm0tdHlwZS1tYXRlcmlhbCAuZm9ybS1jb250cm9sOm5vdCguYm9vdHN0cmFwLXNlbGVjdCknLCBmdW5jdGlvbigpe1xuICAgICAgaWYoJCh0aGlzKS52YWwoKSA9PT0gXCJcIikge1xuICAgICAgICBtYXRlcmlhbE5vRmxvYXQoJCh0aGlzKSk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgICQoXCIuZm9ybS10eXBlLW1hdGVyaWFsIC5mb3JtLWNvbnRyb2xcIikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgaWYgKCAkKHRoaXMpLnZhbCgpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIGlmICggJCh0aGlzKS5pcygnW2RhdGEtcHJvdmlkZX49XCJzZWxlY3RwaWNrZXJcIl0nKSApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbWF0ZXJpYWxEb0Zsb2F0KCQodGhpcykpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2VsZWN0IHBpY2tlclxuICAgICQoZG9jdW1lbnQpLm9uKCdzaG93LmJzLnNlbGVjdCcsICcuZm9ybS10eXBlLW1hdGVyaWFsIFtkYXRhLXByb3ZpZGV+PVwic2VsZWN0cGlja2VyXCJdJywgZnVuY3Rpb24oKXtcbiAgICAgIG1hdGVyaWFsRG9GbG9hdCgkKHRoaXMpKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdoaWRkZW4uYnMuc2VsZWN0JywgJy5mb3JtLXR5cGUtbWF0ZXJpYWwgW2RhdGEtcHJvdmlkZX49XCJzZWxlY3RwaWNrZXJcIl0nLCBmdW5jdGlvbigpe1xuICAgICAgaWYgKCAkKHRoaXMpLnNlbGVjdHBpY2tlcigndmFsJykubGVuZ3RoID09IDAgKSB7XG4gICAgICAgIG1hdGVyaWFsTm9GbG9hdCgkKHRoaXMpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdsb2FkZWQuYnMuc2VsZWN0JywgJy5mb3JtLXR5cGUtbWF0ZXJpYWwgW2RhdGEtcHJvdmlkZX49XCJzZWxlY3RwaWNrZXJcIl0nLCBmdW5jdGlvbigpe1xuICAgICAgaWYgKCAkKHRoaXMpLnNlbGVjdHBpY2tlcigndmFsJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgbWF0ZXJpYWxEb0Zsb2F0KCQodGhpcykpO1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBtYXRlcmlhbERvRmxvYXQoZSkge1xuICAgICAgaWYgKCBlLnBhcmVudCgnLmlucHV0LWdyb3VwLWlucHV0JykubGVuZ3RoICkge1xuICAgICAgICBlLnBhcmVudCgnLmlucHV0LWdyb3VwLWlucHV0JykuYWRkQ2xhc3MoJ2RvLWZsb2F0Jyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKFwiZG8tZmxvYXRcIik7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBtYXRlcmlhbE5vRmxvYXQoZSkge1xuICAgICAgaWYgKCBlLnBhcmVudCgnLmlucHV0LWdyb3VwLWlucHV0JykubGVuZ3RoICkge1xuICAgICAgICBlLnBhcmVudCgnLmlucHV0LWdyb3VwLWlucHV0JykucmVtb3ZlQ2xhc3MoJ2RvLWZsb2F0Jyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLnJlbW92ZUNsYXNzKFwiZG8tZmxvYXRcIik7XG4gICAgICB9XG4gICAgfVxuXG5cblxuXG5cblxuICAgIC8vIFN0aWNreSBibG9ja1xuICAgIC8vXG4gICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIHdpbmRvd190b3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICQoJ1tkYXRhLXByb3ZpZGV+PVwic3RpY2tlclwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKCAhJCh0aGlzKS5oYXNEYXRhQXR0cignb3JpZ2luYWwtdG9wJykgKSB7XG4gICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRvcCcsICQodGhpcykub2Zmc2V0KCkudG9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0YXJnZXQgICAgICA9IGFwcC5nZXRUYXJnZXQoICQodGhpcykgKSxcbiAgICAgICAgICAgIHN0aWNrX3N0YXJ0ID0gJCh0aGlzKS5kYXRhQXR0cignb3JpZ2luYWwtdG9wJyksXG4gICAgICAgICAgICBzdGlja19lbmQgICA9ICQodGFyZ2V0KS5vZmZzZXQoKS50b3AgKyAkKHRhcmdldCkuaGVpZ2h0KCksXG4gICAgICAgICAgICBlbF93aWR0aCAgICA9ICQodGhpcykud2lkdGgoKSxcbiAgICAgICAgICAgIGVsX3RvcCAgICAgID0gMDtcblxuXG4gICAgICAgIGlmICggdG9wYmFyLmlzRml4ZWQoKSApIHtcbiAgICAgICAgICBlbF90b3AgPSAkKCcudG9wYmFyJykuaGVpZ2h0KCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICAgICAgbGVmdDogJCh0aGlzKS5vZmZzZXQoKS5sZWZ0LFxuICAgICAgICAgIHdpZHRoOiBlbF93aWR0aCxcbiAgICAgICAgICB0b3A6IGVsX3RvcFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpbmRvd190b3AgPiBzdGlja19zdGFydCAmJiB3aW5kb3dfdG9wIDw9IHN0aWNrX2VuZCkge1xuICAgICAgICAgIGlmICggISQodGhpcykuaGFzQ2xhc3MoJ3N0aWNrZXItc3RpY2snKSApIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3N0aWNrZXItc3RpY2snKS5jc3Moc3R5bGVzKTtcbiAgICAgICAgICAgICQodGFyZ2V0KS5jc3MoJ21hcmdpbi10b3AnLCAkKHRoaXMpLmhlaWdodCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnc3RpY2tlci1zdGljaycpO1xuICAgICAgICAgICQodGFyZ2V0KS5jc3MoJ21hcmdpbi10b3AnLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuXG5cbiAgICAvLyBUYWJsZXNcbiAgICAvL1xuXG4gICAgLy8gU2VsZWN0YWxsXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdbZGF0YS1wcm92aWRlfj1cInNlbGVjdGFsbFwiXSB0aGVhZCAuY3VzdG9tLWNoZWNrYm94IDpjaGVja2JveCcsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGggICAgICA9ICQodGhpcykuY2xvc2VzdCgndGgnKSxcbiAgICAgICAgICBpbmRleCAgID0gdGguY2xvc2VzdCgndHInKS5jaGlsZHJlbigpLmluZGV4KHRoKSxcbiAgICAgICAgICBjaGVja2VkID0gJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKTtcbiAgICAgICQodGhpcykuY2xvc2VzdCgndGFibGUnKS5maW5kKCd0ciB0ZDpudGgtY2hpbGQoJysgKGluZGV4KzEpICsnKSA6Y2hlY2tib3gnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWQpO1xuICAgICAgICBpZiAoIGNoZWNrZWQgKSB7XG4gICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCd0cicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJ3RyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdbZGF0YS1wcm92aWRlfj1cInNlbGVjdGFsbFwiXSB0Ym9keSAuY3VzdG9tLWNoZWNrYm94IDpjaGVja2JveCcsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoICQodGhpcykucHJvcChcImNoZWNrZWRcIikgKSB7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgndHInKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCd0cicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gU2VsZWN0YWJsZVxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcudGFibGVbZGF0YS1wcm92aWRlfj1cInNlbGVjdGFibGVcIl0gdGJvZHkgdHInLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKS5jaGlsZHJlbigndGQ6bnRoLWNoaWxkKDEpJykuZmluZCgnaW5wdXQnKTtcbiAgICAgIGlucHV0LnByb3AoJ2NoZWNrZWQnLCAhaW5wdXQucHJvcChcImNoZWNrZWRcIikpO1xuXG4gICAgICBpZiAoIGlucHV0LnByb3AoXCJjaGVja2VkXCIpICkge1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG5cbiAgICAvLyBNZWRpYVxuICAgIC8vXG5cbiAgICAvLyBTZWxlY3RhbGxcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJy5tZWRpYS1saXN0W2RhdGEtcHJvdmlkZX49XCJzZWxlY3RhbGxcIl0gLm1lZGlhLWxpc3QtaGVhZGVyIDpjaGVja2JveCwgLm1lZGlhLWxpc3RbZGF0YS1wcm92aWRlfj1cInNlbGVjdGFsbFwiXSAubWVkaWEtbGlzdC1mb290ZXIgOmNoZWNrYm94JywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBsaXN0ID0gJCh0aGlzKS5jbG9zZXN0KCcubWVkaWEtbGlzdCcpO1xuICAgICAgdmFyIGNoZWNrZWQgPSAkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpO1xuICAgICAgJChsaXN0KS5maW5kKCcubWVkaWEtbGlzdC1ib2R5IC5jdXN0b20tY2hlY2tib3ggW3R5cGU9XCJjaGVja2JveFwiXScpLmVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkKTtcbiAgICAgICAgaWYgKCBjaGVja2VkICkge1xuICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLm1lZGlhJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLm1lZGlhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdbZGF0YS1wcm92aWRlfj1cInNlbGVjdGFsbFwiXSAubWVkaWEgLmN1c3RvbS1jaGVja2JveCBpbnB1dCcsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoICQodGhpcykucHJvcChcImNoZWNrZWRcIikgKSB7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLm1lZGlhJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLm1lZGlhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVE9ETzpcbiAgICAvLyBDaGVja2FibGVcbiAgICAvKlxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcubWVkaWFbZGF0YS1wcm92aWRlfj1cImNoZWNrYWJsZVwiXSwgLm1lZGlhLWxpc3RbZGF0YS1wcm92aWRlfj1cImNoZWNrYWJsZVwiXSAubWVkaWE6bm90KC5tZWRpYS1saXN0LWhlYWRlcik6bm90KC5tZWRpYS1saXN0LWZvb3RlciknLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKS5maW5kKCc6Y2hlY2tib3gsIDpyYWRpbycpO1xuICAgICAgaW5wdXQucHJvcCgnY2hlY2tlZCcsICFpbnB1dC5wcm9wKFwiY2hlY2tlZFwiKSk7XG5cbiAgICAgIGlmICggaW5wdXQucHJvcChcImNoZWNrZWRcIikgKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICovXG5cbiAgICAvLyBDbGljayB0byBzZWxlY3RcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLm1lZGlhW2RhdGEtcHJvdmlkZX49XCJzZWxlY3RhYmxlXCJdLCAubWVkaWEtbGlzdFtkYXRhLXByb3ZpZGV+PVwic2VsZWN0YWJsZVwiXSAubWVkaWE6bm90KC5tZWRpYS1saXN0LWhlYWRlcik6bm90KC5tZWRpYS1saXN0LWZvb3RlciknLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKS5maW5kKCdpbnB1dCcpO1xuICAgICAgaW5wdXQucHJvcCgnY2hlY2tlZCcsICFpbnB1dC5wcm9wKFwiY2hlY2tlZFwiKSk7XG5cbiAgICAgIGlmICggaW5wdXQucHJvcChcImNoZWNrZWRcIikgKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyBTZWFyY2hcbiAgICAkKCdbZGF0YS1wcm92aWRlfj1cIm1lZGlhLXNlYXJjaFwiXScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBzICAgICAgID0gJCh0aGlzKS52YWwoKS50cmltKCksXG4gICAgICAgICAgbWVkaWFzICA9ICQodGhpcykuY2xvc2VzdCgnLm1lZGlhLWxpc3QnKS5maW5kKCcubWVkaWE6bm90KC5tZWRpYS1saXN0LWhlYWRlcik6bm90KC5tZWRpYS1saXN0LWZvb3RlciknKTtcblxuICAgICAgaWYgKHMgPT09ICcnKSB7XG4gICAgICAgIG1lZGlhcy5zaG93KCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbWVkaWFzLm5vdCgnOnNlYXJjaCgnICsgcyArICcpJykuaGlkZSgpO1xuICAgICAgICBtZWRpYXMuZmlsdGVyKCc6c2VhcmNoKCcgKyBzICsgJyknKS5zaG93KCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuXG4gICAgLy8gQXV0by1leGFwbmQgdGV4dGFyZWFzXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsICcuYXV0by1leHBhbmQnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGUgPSAkKHRoaXMpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBlLnNjcm9sbFRvcCgwKS5jc3MoJ2hlaWdodCcsIGUucHJvcCgnc2Nyb2xsSGVpZ2h0JykgKydweCcpO1xuICAgICAgfSwwKTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBQcmUgdG9nZ2xlclxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jb2RlLXRvZ2dsZXIgLmJ0bicsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jb2RlJykuZmluZCgncHJlJykuc2xpZGVUb2dnbGUoKTtcbiAgICB9KTtcblxuXG4gICAgLy8gVE9ETzpcbiAgICAvLyBNZWRpYSBjb2xsYXBzYWJsZVxuICAgIC8vXG4gICAgLy8kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLm1lZGlhLWNvbGxhcHNpYmxlIFtkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJywgZnVuY3Rpb24oZSkge1xuICAgICAgLy9lLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgLy8kKHRoaXMpLnBhcmVudCgnLm1lZGlhLWNvbGxhcHNpYmxlJykuY2hpbGRyZW4oJy5jb2xsYXBzZScpLmNvbGxhcHNlKCd0b2dnbGUnKTtcbiAgICAvL30pO1xuXG5cblxuICAgIC8vIElucHV0IHJhbmdlXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlIG1vdXNlbW92ZScsICcuaW5wdXQtcmFuZ2UgaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLmlucHV0LXJhbmdlJykuZmluZCgnLnZhbHVlJykudGV4dCgkKHRoaXMpLnZhbCgpKTtcbiAgICB9KTtcblxuXG5cblxuXG5cbiAgICAvLyBBdmF0YXJcbiAgICAvL1xuXG4gICAgLy8gUmVtb3ZlIGJ1dHRvblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYXZhdGFyLXBpbGwgLmNsb3NlJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5hdmF0YXInKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIE1vcmUgYnV0dG9uXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLXByb3ZpZGV+PVwibW9yZS1hdmF0YXJcIl0nLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGxpc3QgPSAkKHRoaXMpLmNsb3Nlc3QoJy5hdmF0YXItbGlzdCcpO1xuXG4gICAgICAkKHRoaXMpLmZhZGVPdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcblxuICAgICAgICBpZiAoICQodGhpcykuaGFzRGF0YUF0dHIoJ3VybCcpICkge1xuICAgICAgICAgICQoJzxkaXY+JykubG9hZCggJCh0aGlzKS5kYXRhKCd1cmwnKSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBhdmF0YXJzID0gJCh0aGlzKS5odG1sKCk7XG4gICAgICAgICAgICBsaXN0LmFwcGVuZChhdmF0YXJzKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG5cblxuICAgIC8vIFJpcHBsZSBmb3IgZmxhdCBidXR0b25cbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYnRuLWZsYXQ6bm90KC5uby13YXZlKScsIGZ1bmN0aW9uKGUpe1xuICAgICAgdmFyIHggPSBlLnBhZ2VYO1xuICAgICAgdmFyIHkgPSBlLnBhZ2VZO1xuICAgICAgdmFyIGNsaWNrWSA9IHkgLSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcbiAgICAgIHZhciBjbGlja1ggPSB4IC0gJCh0aGlzKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgdmFyIGJveCA9IHRoaXM7XG5cbiAgICAgIHZhciBzZXRYID0gcGFyc2VJbnQoY2xpY2tYKTtcbiAgICAgIHZhciBzZXRZID0gcGFyc2VJbnQoY2xpY2tZKTtcbiAgICAgICQodGhpcykuZmluZChcInN2Z1wiKS5yZW1vdmUoKTtcbiAgICAgICQodGhpcykuYXBwZW5kKCc8c3ZnPjxjaXJjbGUgY3g9XCInK3NldFgrJ1wiIGN5PVwiJytzZXRZKydcIiByPVwiJyswKydcIj48L2NpcmNsZT48L3N2Zz4nKTtcblxuICAgICAgdmFyIGNpcmNsZSA9ICQoYm94KS5maW5kKFwiY2lyY2xlXCIpO1xuICAgICAgY2lyY2xlLmFuaW1hdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBcInJcIiA6ICQoYm94KS5vdXRlcldpZHRoKClcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICAgICAgc3RlcDogZnVuY3Rpb24odmFsKXtcbiAgICAgICAgICAgIGNpcmNsZS5hdHRyKFwiclwiLCB2YWwpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2lyY2xlLmZhZGVPdXQoJ2Zhc3QnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cblxuXG5cbiAgICAvLyBDYWxsb3V0XG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtZGlzbWlzcz1cImNhbGxvdXRcIl0nLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuY2FsbG91dCcpLmZhZGVPdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cblxuXG4gICAgLy8gVGFic1xuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLWRpc21pc3M9XCJ0YWJcIl0nLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5jbG9zZXN0KCcubmF2LWl0ZW0nKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBSYXRpbmdcbiAgICAvL1xuICAgIHZhciByYXRpbmdDaGVja0hhbmRsZSA9IGZ1bmN0aW9uKHJhdGluZykge1xuICAgICAgaWYgKCByYXRpbmcuZmluZCgnaW5wdXQ6Y2hlY2tlZCcpLmxlbmd0aCApIHtcbiAgICAgICAgcmF0aW5nLmF0dHIoJ2RhdGEtaGFzLXJhdGUnLCAndHJ1ZScpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJhdGluZy5hdHRyKCdkYXRhLWhhcy1yYXRlJywgJ2ZhbHNlJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5yYXRpbmctcmVtb3ZlJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykuY2xvc2VzdCgnLnJhdGluZycpLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgIHJhdGluZ0NoZWNrSGFuZGxlKCAkKHRoaXMpLmNsb3Nlc3QoJy5yYXRpbmcnKSApO1xuICAgIH0pO1xuXG4gICAgJCgnLnJhdGluZycpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHJhdGluZ0NoZWNrSGFuZGxlKCAkKHRoaXMpICk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJy5yYXRpbmcgaW5wdXQnLCBmdW5jdGlvbigpe1xuICAgICAgcmF0aW5nQ2hlY2tIYW5kbGUoICQodGhpcykuY2xvc2VzdCgnLnJhdGluZycpICk7XG4gICAgfSk7XG5cblxuXG5cbiAgICAvLyBMb2FkZXJcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1wcm92aWRlfj1cImxvYWRlclwiXScsIGZ1bmN0aW9uKGUpe1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdGFyZ2V0ICA9IGFwcC5nZXRUYXJnZXQoICQodGhpcykgKTtcbiAgICAgIHZhciB1cmwgICAgID0gYXBwLmdldFVSTCggJCh0aGlzKSApO1xuXG4gICAgICBpZiAoICQodGhpcykuaGFzRGF0YUF0dHIoJ3NwaW5uZXInKSApIHtcbiAgICAgICAgdmFyIHNwaW5uZXIgPSAkKHRoaXMpLmRhdGEoJ3NwaW5uZXInKTtcbiAgICAgICAgJCh0YXJnZXQpLmh0bWwoc3Bpbm5lcik7XG4gICAgICB9XG5cbiAgICAgICQodGFyZ2V0KS5sb2FkKHVybCk7XG4gICAgfSk7XG5cblxuXG5cblxuXG4gICAgLy8gTG9va3VwIHRleHR1YWxcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcubG9va3VwLXRleHR1YWwgLmxvb2t1cC1wbGFjZWhvbGRlcicsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5sb29rdXAnKS5maW5kKCdpbnB1dCcpLmZvY3VzKCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignZm9jdXMgYmx1ciBrZXl1cCcsICcubG9va3VwLXRleHR1YWwgaW5wdXQnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHBsYWNlaG9sZGVyID0gJCh0aGlzKS5jbG9zZXN0KCcubG9va3VwJykuZmluZCgnLmxvb2t1cC1wbGFjZWhvbGRlcicpO1xuICAgICAgaWYgKCAkKHRoaXMpLnZhbCgpID09ICcnICkge1xuICAgICAgICBwbGFjZWhvbGRlci5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcGxhY2Vob2xkZXIuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG5cbiAgICAvLyBGdWxsc2NyZWVuIGxvb2t1cFxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgJy5sb29rdXAtZnVsbHNjcmVlbltkYXRhLXVybF0gLmxvb2t1cC1mb3JtIGlucHV0JywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBrZXl3b3JkID0gJCh0aGlzKS52YWwoKTtcbiAgICAgIHZhciBsb29rdXAgPSAkKHRoaXMpLmNsb3Nlc3QoJy5sb29rdXAtZnVsbHNjcmVlbicpO1xuICAgICAgdmFyIHVybCA9IGxvb2t1cC5kYXRhKCd1cmwnKTtcbiAgICAgIGxvb2t1cC5maW5kKCcubG9va3VwLXJlc3VsdHMnKS5sb2FkKHVybCwge3M6IGtleXdvcmR9KTtcbiAgICB9KTtcblxuXG5cblxuICB9XG5cblxuXG59KGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvYXBwLWV4dHJhLmpzIiwiXG4vLyBpbml0aWFsaXplIGFwcFxuLy9cbitmdW5jdGlvbigkKSB7XG4gIGFwcC5pbml0KCk7XG4gIHRvcGJhci5pbml0KCk7XG4gIHNpZGViYXIuaW5pdCgpO1xuICB0b3BiYXJfbWVudS5pbml0KCk7XG4gIHF1aWNrdmlldy5pbml0KCk7XG4gIGRvY2suaW5pdCgpO1xuICBhc2lkZS5pbml0KCk7XG4gIGxvb2t1cC5pbml0KCk7XG5cbiAgY2FyZHMuaW5pdCgpO1xuXG4gIGFwcC5pc1JlYWR5KCk7XG5cbn0oalF1ZXJ5KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc3JjL2FwcC1pbml0LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBBcHBcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkLCB3aW5kb3cpe1xuICB2YXIgYXBwID0ge1xuICAgIG5hbWU6ICAgICAgICdUaGVBZG1pbicsXG4gICAgdmVyc2lvbjogICAgJzEuMC4wJyxcbiAgICBjb3JlanM6ICAgICAkKCdzY3JpcHRbc3JjKj1cImNvcmUubWluLmpzXCJdJykuYXR0cignc3JjJyksXG4gIH07XG5cblxuICBhcHAuZGlyID0ge1xuICAgIGhvbWU6ICAgYXBwLmNvcmVqcy5yZXBsYWNlKCdhc3NldHMvanMvY29yZS5taW4uanMnLCAnJyksXG4gICAgYXNzZXRzOiBhcHAuY29yZWpzLnJlcGxhY2UoJ2pzL2NvcmUubWluLmpzJywgJycpLFxuICAgIHZlbmRvcjogYXBwLmNvcmVqcy5yZXBsYWNlKCdqcy9jb3JlLm1pbi5qcycsICd2ZW5kb3IvJylcbiAgfVxuXG5cbiAgLy8gQ2hhbmdlIGFwcC5kaXIgdmFsdWVzIGlmIHVzZXIgYXNzaWduZWQgYW5vdGhlciB1cmxcbiAgLy9cbiAgdmFyIGFzc2V0c19kaXJfZWwgPSAkKCdbZGF0YS1hc3NldHMtdXJsXScpO1xuICBpZiAoIGFzc2V0c19kaXJfZWwubGVuZ3RoICkge1xuICAgIHZhciBhc3NldHNfZGlyID0gYXNzZXRzX2Rpcl9lbC5kYXRhKCdhc3NldHMtdXJsJyk7XG4gICAgaWYgKCAnLycgIT09IGFzc2V0c19kaXIuc2xpY2UoLTEpICkge1xuICAgICAgYXNzZXRzX2RpciArPSAnLyc7XG4gICAgfVxuXG4gICAgYXBwLmRpci5hc3NldHMgPSBhc3NldHNfZGlyO1xuICAgIGFwcC5kaXIudmVuZG9yID0gYXNzZXRzX2RpciArICd2ZW5kb3IvJztcbiAgfVxuXG5cblxuICBhcHAuZGVmYXVsdHMgPSB7XG5cbiAgICBwcm92aWRlOiBudWxsLFxuICAgIGdvb2dsZUFwaUtleTogbnVsbCxcbiAgICBnb29nbGVBbmFseXRpY3NLZXk6IG51bGwsXG4gICAgc21vb3RoU2Nyb2xsOiBmYWxzZSxcbiAgICBzYXZlU3RhdGU6IGZhbHNlLFxuXG4gICAgLy8gVG9hc3RcbiAgICAvL1xuICAgIHRvYXN0OiB7XG4gICAgICBkdXJhdGlvbjogICAgNDAwMCxcbiAgICAgIGFjdGlvblRpdGxlOiAnJyxcbiAgICAgIGFjdGlvblVybDogICAnJyxcbiAgICAgIGFjdGlvbkNvbG9yOiAnd2FybmluZycsXG4gICAgfSxcblxuXG5cblxuICAgIC8vIE1vZGFsZXJcbiAgICAvL1xuICAgIG1vZGFsZXI6IHtcbiAgICAgIHVybDogJycsXG4gICAgICBpc01vZGFsOiBmYWxzZSxcbiAgICAgIGh0bWw6ICcnLFxuICAgICAgdGFyZ2V0OiAnJyxcbiAgICAgIHR5cGU6ICcnLFxuICAgICAgc2l6ZTogJycsXG4gICAgICB0aXRsZTogJycsXG4gICAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICAgIGhlYWRlclZpc2libGU6IHRydWUsXG4gICAgICBmb290ZXJWaXNpYmxlOiB0cnVlLFxuICAgICAgY29uZmlybVZpc2libGU6IHRydWUsXG4gICAgICBjb25maXJtVGV4dDogJ09rJyxcbiAgICAgIGNvbmZpcm1DbGFzczogJ2J0biBidG4tdy1zbSBidG4tZmxhdCBidG4tcHJpbWFyeScsXG4gICAgICBjYW5jZWxWaXNpYmxlOiBmYWxzZSxcbiAgICAgIGNhbmNlbFRleHQ6ICdDYW5jZWwnLFxuICAgICAgY2FuY2VsQ2xhc3M6ICdidG4gYnRuLXctc20gYnRuLWZsYXQgYnRuLXNlY29uZGFyeScsXG4gICAgICBib2R5RXh0cmFDbGFzczogJycsXG4gICAgICBzcGlubmVyOiAnPGRpdiBjbGFzcz1cImgtMjAwIGNlbnRlci12aFwiPjxzdmcgY2xhc3M9XCJzcGlubmVyLWNpcmNsZS1tYXRlcmlhbC1zdmdcIiB2aWV3Qm94PVwiMCAwIDUwIDUwXCI+PGNpcmNsZSBjbGFzcz1cImNpcmNsZVwiIGN4PVwiMjVcIiBjeT1cIjI1XCIgcj1cIjIwXCI+PC9zdmc+PC9kaXY+JyxcblxuICAgICAgYXV0b0Rlc3Ryb3k6IHRydWUsXG5cbiAgICAgIC8vIEV2ZW50c1xuICAgICAgb25TaG93OiBudWxsLFxuICAgICAgb25TaG93bjogbnVsbCxcbiAgICAgIG9uSGlkZTogbnVsbCxcbiAgICAgIG9uSGlkZGVuOiBudWxsLFxuICAgICAgb25Db25maXJtOiBudWxsLFxuICAgICAgb25DYW5jZWw6IG51bGwsXG5cbiAgICAgIC8vIFByaXZhdGUgb3B0aW9uc1xuICAgICAgbW9kYWxJZDogbnVsbCxcbiAgICB9LFxuXG5cblxuXG4gICAgLy8gR29vZ2xlIG1hcFxuICAgIC8vXG4gICAgZ29vZ2xlTWFwOiB7XG4gICAgICBsYXQ6ICcnLFxuICAgICAgbG5nOiAnJyxcbiAgICAgIHpvb206IDEzLFxuICAgICAgbWFya2VyTGF0OiAnJyxcbiAgICAgIG1hcmtlckxuZzogJycsXG4gICAgICBtYXJrZXJJY29uOiAnJyxcbiAgICAgIHN0eWxlOiAnJ1xuICAgIH1cblxuXG5cbiAgfTtcblxuXG5cblxuICAvLyBCcmVha3BvaW50IHZhbHVlc1xuICAvL1xuICBhcHAuYnJlYWtwb2ludCA9IHtcbiAgICB4czogNTc2LFxuICAgIHNtOiA3NjgsXG4gICAgbWQ6IDk5MixcbiAgICBsZzogMTIwMFxuICB9O1xuXG5cblxuXG4gIC8vIEFwcGxpY2F0aW9uIGNvbG9yc1xuICAvL1xuICBhcHAuY29sb3JzID0ge1xuICAgIHByaW1hcnk6ICAgICAgIFwiIzMzY2FiYlwiLFxuICAgIHNlY29uZGFyeTogICAgIFwiI2U0ZWFlY1wiLFxuICAgIHN1Y2Nlc3M6ICAgICAgIFwiIzQ2YmU4YVwiLFxuICAgIGluZm86ICAgICAgICAgIFwiIzQ4YjBmN1wiLFxuICAgIHdhcm5pbmc6ICAgICAgIFwiI2YyYTY1NFwiLFxuICAgIGRhbmdlcjogICAgICAgIFwiI2Y5Njg2OFwiLFxuICAgIGJnOiAgICAgICAgICAgIFwiI2YzZjVmNlwiLFxuICAgIHRleHQ6ICAgICAgICAgIFwiIzYxNmE3OFwiLFxuICAgIHRleHRTZWNvbmRhcnk6IFwiIzkyOWRhZlwiLFxuICB9XG5cbiAgLy8gRm9udHNcbiAgLy9cbiAgYXBwLmZvbnQgPSB7XG4gICAgYm9keTogICdSb2JvdG8sIHNhbnMtc2VyaWYnLFxuICAgIHRpdGxlOiAnUm9ib3RvLCBzYW5zLXNlcmlmJyxcbiAgfVxuXG4gIC8vIExvY2FsIHZhcmlhYmxlc1xuICAvL1xuICB2YXIgcmVhZHlDYWxsYmFja3MgPSBbXTtcblxuXG4gIGFwcC5nZXRSZWFkeUNhbGxiYWNrc1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiByZWFkeUNhbGxiYWNrcy50b1N0cmluZygpO1xuICB9XG5cblxuICBhcHAucmVhZHkgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHJlYWR5Q2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGNvdW50ID0gMDtcblxuICBhcHAuaXNSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgIGNvdW50Kys7XG4gICAgaWYgKGNvdW50ICE9IDIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkKGZ1bmN0aW9uKCl7XG5cbiAgICAgIC8vIEluaXQgcGx1Z2luc1xuICAgICAgcHJvdmlkZXIuY2FsbENhbGxiYWNrcygpO1xuXG4gICAgICAvLyBSdW4gcmVhZHkgY2FsbGJhY2tzXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlYWR5Q2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZWFkeUNhbGxiYWNrc1tpXSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpe1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlYWR5Q2FsbGJhY2tzID0gW107XG5cblxuICAgICAgLy8gUHJlbG9hZGVyXG4gICAgICB2YXIgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xuICAgICAgaWYgKCBwcmVsb2FkZXIubGVuZ3RoICkge1xuICAgICAgICB2YXIgc3BlZWQgPSBwcmVsb2FkZXIuZGF0YUF0dHIoJ2hpZGUtc3BwZWQnLCA2MDApO1xuICAgICAgICBwcmVsb2FkZXIuZmFkZU91dChzcGVlZCk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfTtcblxuXG5cbiAgYXBwLnByb3ZpZGUgPSBmdW5jdGlvbih2ZW5kb3JzKSB7XG4gICAgaWYgKCBBcnJheS5pc0FycmF5KHZlbmRvcnMpICkge1xuICAgICAgdmFyIGxlbiA9IHZlbmRvcnMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBwcm92aWRlci5pbmplY3QodmVuZG9yc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcHJvdmlkZXIuaW5qZWN0KHZlbmRvcnMpO1xuICAgIH1cbiAgfTtcblxuXG5cblxuICBhcHAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcHJvdmlkZXIuaW5pdCgpO1xuXG4gICAgYXBwLmluaXRDb3JlUGx1Z2lucygpO1xuICAgIGFwcC5pbml0VGhlUGx1Z2lucygpO1xuXG4gIH07XG5cblxuXG5cbiAgLy8gQ2FsbCBhIGZ1bmN0aW9uXG4gIC8vXG4gIGFwcC5jYWxsID0gZnVuY3Rpb24oZnVuY3Rpb25OYW1lIC8qLCBhcmdzICovKSB7XG4gICAgaWYgKCBmdW5jdGlvbk5hbWUgPT0gJycgfHwgZnVuY3Rpb25OYW1lID09ICdwcm92aWRlci51bmRlZmluZWQnICkge1xuICAgICAgY29uc29sZS5sb2coJ1VOREVGSU5FRCBGVU5DJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBjb250ZXh0ID0gd2luZG93O1xuICAgIHZhciBuYW1lc3BhY2VzID0gZnVuY3Rpb25OYW1lLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIgZnVuYyA9IG5hbWVzcGFjZXMucG9wKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lc3BhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb250ZXh0ID0gY29udGV4dFtuYW1lc3BhY2VzW2ldXTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGNvbnRleHRbZnVuY10uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cblxuXG4gIH07XG5cblxuXG5cbiAgLy8gTG9hZCBhIEpTIGZpbGVcbiAgLy9cbiAgYXBwLmxvYWRTY3JpcHQgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuICAgICQuZ2V0U2NyaXB0KHVybCwgY2FsbGJhY2spO1xuICB9O1xuXG5cblxuXG4gIC8vIExvYWQgYSBDU1MgZmlsZSBhbmQgaW5zZXJ0IG90IGFmdGVyIGNvcmUuY3NzLm1pblxuICAvL1xuICBhcHAubG9hZFN0eWxlID0gZnVuY3Rpb24odXJsLCBiYXNlKSB7XG4gICAgaWYgKCB1cmwgPT0gJycgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCBiYXNlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICBiYXNlID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KHVybCkgKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVybC5sZW5ndGg7IGkrKykge1xuICAgICAgICAkKCdoZWFkIGxpbms6Zmlyc3QnKS5hZnRlciggJCgnPGxpbmsgaHJlZj1cIicrIGJhc2UgKyB1cmxbaV0gKydcIiByZWw9XCJzdHlsZXNoZWV0XCI+JykgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAkKCdoZWFkIGxpbms6Zmlyc3QnKS5hZnRlciggJCgnPGxpbmsgaHJlZj1cIicrIGJhc2UgKyB1cmwgKydcIiByZWw9XCJzdHlsZXNoZWV0XCI+JykgKTtcbiAgICB9XG4gIH07XG5cblxuXG5cbiAgYXBwLmtleSA9IGZ1bmN0aW9uKGtleSwgZm4pIHtcbiAgICBhcHAudW5rZXkoa2V5KTtcbiAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bi4nKyBhcHAuX25vcm1hbGl6ZUtleShrZXkpLCBudWxsLCBrZXksIGZuKTtcbiAgfVxuXG5cbiAgYXBwLnVua2V5ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgJChkb2N1bWVudCkub2ZmKCdrZXlkb3duLicrIGFwcC5fbm9ybWFsaXplS2V5KGtleSkpO1xuICB9XG5cblxuICBhcHAuX25vcm1hbGl6ZUtleSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBrZXkucmVwbGFjZSgnKycsICdfJyk7XG4gIH1cblxuXG5cbiAgLy8gR2V0IHRhcmdldCBvZiBhbiBhY3Rpb24gZnJvbSBlbGVtZW50LlxuICAvL1xuICAvLyBJdCBjYW4gYmUgJ2RhdGEtdGFyZ2V0JyBvciAnaHJlZicgYXR0cmlidXRlLlxuICAvLyBXZSBzdXBwb3J0ICduZXh0JyBhbmQgJ3ByZXYnIHZhbHVlcyB0byB0YXJnZXQgbmV4dCBvciBwcmV2aW91cyBlbGVtZW50LiBJbiB0aGlzIGNhc2UsIHdlIHJldHVybiBqUXVlcnkgZWxlbWVudC5cbiAgLy9cbiAgYXBwLmdldFRhcmdldCA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIGlmICggZS5oYXNEYXRhQXR0cigndGFyZ2V0JykgKSB7XG4gICAgICB0YXJnZXQgPSBlLmRhdGEoJ3RhcmdldCcpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRhcmdldCA9IGUuYXR0cignaHJlZicpO1xuICAgIH1cblxuICAgIGlmICggdGFyZ2V0ID09ICduZXh0JyApIHtcbiAgICAgIHRhcmdldCA9ICQoZSkubmV4dCgpO1xuICAgIH1cbiAgICBlbHNlIGlmICggdGFyZ2V0ID09ICdwcmV2JyApIHtcbiAgICAgIHRhcmdldCA9ICQoZSkucHJldigpO1xuICAgIH1cblxuICAgIGlmICggdGFyZ2V0ID09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG5cblxuXG5cbiAgLy8gR2V0IFVSTCBvZiBhbiBhY3Rpb24gZnJvbSBlbGVtZW50LlxuICAvL1xuICAvLyBJdCBjYW4gYmUgJ2RhdGEtdXJsJyBvciAnaHJlZicgYXR0cmlidXRlLlxuICAvL1xuICBhcHAuZ2V0VVJMID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciB1cmw7XG4gICAgaWYgKCBlLmhhc0RhdGFBdHRyKCd1cmwnKSApIHtcbiAgICAgIHVybCA9IGUuZGF0YSgndXJsJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdXJsID0gZS5hdHRyKCdocmVmJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuXG5cbiAgLy8gQ29uZmlnIGFwcGxpY2F0aW9uXG4gIC8vXG4gIGFwcC5jb25maWcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgICAvLyBSdGV1cm4gY29uZmlnIHZhbHVlXG4gICAgaWYgKCB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycgKSB7XG4gICAgICByZXR1cm4gYXBwLmRlZmF1bHRzW29wdGlvbnNdO1xuICAgIH1cblxuXG4gICAgLy8gU2F2ZSBjb25maWdzXG4gICAgJC5leHRlbmQodHJ1ZSwgYXBwLmRlZmF1bHRzLCBvcHRpb25zKTtcblxuXG4gICAgLy8gUHJvdmlkZSByZXF1aXJlZCBwbHVnaW5zXG4gICAgLy9cbiAgICBpZiAoIGFwcC5kZWZhdWx0cy5wcm92aWRlICkge1xuICAgICAgYXBwLnByb3ZpZGUoYXBwLmRlZmF1bHRzLnByb3ZpZGUpO1xuICAgIH1cblxuICAgIC8vIE1ha2UgbmVjZXNzYXJ5IGNoYW5nZXNcbiAgICAvL1xuICAgIGlmICggYXBwLmRlZmF1bHRzLnNtb290aHNjcm9sbCApIHtcbiAgICAgIGFwcC5wcm92aWRlKCdzbW9vdGhzY3JvbGwnKTtcbiAgICB9XG5cblxuXG4gICAgLy8gR29vZ2xlIG1hcFxuICAgIC8vXG4gICAgaWYgKCAkKCdbZGF0YS1wcm92aWRlfj1cIm1hcFwiXScpLmxlbmd0aCAmJiB3aW5kb3dbXCJnb29nbGUubWFwcy5NYXBcIl0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICQuZ2V0U2NyaXB0KFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT1cIisgYXBwLmRlZmF1bHRzLmdvb2dsZUFwaUtleSArXCImY2FsbGJhY2s9YXBwLm1hcFwiKTtcbiAgICB9XG5cblxuICAgIC8vIEdvb2dsZSBBbmFseXRpY3NcbiAgICAvL1xuICAgIGlmICggYXBwLmRlZmF1bHRzLmdvb2dsZUFuYWx5dGljc0tleSApIHtcbiAgICAgIChmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpWydHb29nbGVBbmFseXRpY3NPYmplY3QnXT1yO2lbcl09aVtyXXx8ZnVuY3Rpb24oKXtcbiAgICAgIChpW3JdLnE9aVtyXS5xfHxbXSkucHVzaChhcmd1bWVudHMpfSxpW3JdLmw9MSpuZXcgRGF0ZSgpO2E9cy5jcmVhdGVFbGVtZW50KG8pLFxuICAgICAgbT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKVxuICAgICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCdodHRwczovL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnLCdnYScpO1xuXG4gICAgICBnYSgnY3JlYXRlJywgYXBwLmRlZmF1bHRzLmdvb2dsZUFuYWx5dGljc0tleSwgJ2F1dG8nKTtcbiAgICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7XG4gICAgfVxuXG5cbiAgICAvLyBSZWNvdmVyIHNhdmVkIHN0YXRlc1xuICAgIC8vXG4gICAgaWYgKCBhcHAuZGVmYXVsdHMuc2F2ZVN0YXRlICkge1xuICAgICAgdmFyIHN0YXRlcyA9IGFwcC5zdGF0ZSgpO1xuICAgICAgaWYgKCBzdGF0ZXNbJ3NpZGViYXIuZm9sZGVkJ10gKSB7XG4gICAgICAgIHNpZGViYXIuZm9sZCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIHN0YXRlc1sndG9wYmFyLmZpeGVkJ10gKSB7XG4gICAgICAgIHRvcGJhci5maXgoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8vIFJlZ2lzdGVyIHNob3J0Y3V0c1xuICAvL1xuICBhcHAuc2hvcnRjdXQgPSBmdW5jdGlvbihrZXlzKSB7XG4gICAgJC5lYWNoKCBrZXlzLCBmdW5jdGlvbihrZXksIGZuKSB7XG4gICAgICBhcHAua2V5KGtleSwgZm4pO1xuICAgIH0pXG4gIH1cblxuXG5cbiAgLy8gQ29udmVydCBkYXRhLWF0dHJpYnV0ZXMgb3B0aW9ucyB0byBKYXZhc2NyaXB0IG9iamVjdFxuICAvL1xuICBhcHAuZ2V0RGF0YU9wdGlvbnMgPSBmdW5jdGlvbihlbCwgY2FzdExpc3QpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHt9O1xuXG4gICAgJC5lYWNoKCAkKGVsKS5kYXRhKCksIGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuXG4gICAgICBrZXkgPSBhcHAuZGF0YVRvT3B0aW9uKGtleSk7XG5cbiAgICAgIC8vIEVzY2FwZSBkYXRhLXByb3ZpZGVcbiAgICAgIGlmICgga2V5ID09ICdwcm92aWRlJyApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIGNhc3RMaXN0ICE9IHVuZGVmaW5lZCApIHtcbiAgICAgICAgdmFyIHR5cGUgPSBjYXN0TGlzdFtrZXldO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlICdib29sJzpcbiAgICAgICAgICAgIHZhbHVlID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ251bSc6XG4gICAgICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuXG5cbiAgLy8gU2F2ZSBhcHAgc3RhdGVcbiAgLy9cbiAgYXBwLnN0YXRlID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIGlmICggbG9jYWxTdG9yYWdlLnRoZWFkbWluID09PSB1bmRlZmluZWQgKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UudGhlYWRtaW4gPSAne30nO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZXMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS50aGVhZG1pbik7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIHN0YXRlcztcbiAgICB9XG4gICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAxKSB7XG4gICAgICByZXR1cm4gc3RhdGVzW2tleV07XG4gICAgfVxuICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMiAmJiBhcHAuZGVmYXVsdHMuc2F2ZVN0YXRlKSB7XG4gICAgICBzdGF0ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgbG9jYWxTdG9yYWdlLnRoZWFkbWluID0gSlNPTi5zdHJpbmdpZnkoc3RhdGVzKTtcbiAgICB9XG4gIH1cblxuICBhcHAudG9nZ2xlU3RhdGUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIGFwcC5kZWZhdWx0cy5zYXZlU3RhdGUgKSB7XG4gICAgICB2YXIgc3RhdGVzID0gYXBwLnN0YXRlKCk7XG4gICAgICBzdGF0ZXNba2V5XSA9ICFzdGF0ZXNba2V5XTtcbiAgICAgIGxvY2FsU3RvcmFnZS50aGVhZG1pbiA9IEpTT04uc3RyaW5naWZ5KHN0YXRlcyk7XG4gICAgfVxuICB9XG5cbiAgYXBwLnN0YXRlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICBhcHAuc3RhdGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgfVxuXG5cbiAgLy8gR2VuZXJhdGUgYW4gYWxtb3N0IHVuaXF1ZSBJRFxuICAvL1xuICBhcHAuZ3VpZCA9IGZ1bmN0aW9uKGxlbikge1xuICAgIGlmICggbGVuID09IHVuZGVmaW5lZCkge1xuICAgICAgbGVuID0gNTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnJlcGxhY2UoL1teYS16XSsvZywgJycpLnN1YnN0cigwLCBsZW4pO1xuICB9XG5cblxuXG4gIC8vIENvbnZlcnQgZm9vQmFyQmF6IHRvIGZvby1iYXItYmF6XG4gIC8vXG4gIGFwcC5vcHRpb25Ub0RhdGEgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUucmVwbGFjZSgvKFtBLVpdKS9nLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cblxuICAvLyBDb252ZXJ0IGZvby1iYXItYmF6IHRvIGZvb0JhckJhelxuICAvL1xuICBhcHAuZGF0YVRvT3B0aW9uID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uKHgpe3JldHVybiB4WzFdLnRvVXBwZXJDYXNlKCk7fSk7XG4gIH1cblxuXG4gIC8vIEVzY2FwZSBIVE1MIHN0cmluZ3NcbiAgLy9cbiAgYXBwLmh0bWxFc2NhcGUgPSBmdW5jdGlvbihodG1sKSB7XG4gICAgdmFyIGVzY2FwZU1hcCA9IHtcbiAgICAgICcmJzogJyZhbXA7JyxcbiAgICAgICc8JzogJyZsdDsnLFxuICAgICAgJz4nOiAnJmd0OycsXG4gICAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAgIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgICAgICdgJzogJyYjeDYwOydcbiAgICB9O1xuICAgIHZhciBzb3VyY2UgPSAnKD86JyArIE9iamVjdC5rZXlzKGVzY2FwZU1hcCkuam9pbignfCcpICsgJyknLFxuICAgICAgICB0ZXN0UmVnZXhwID0gbmV3IFJlZ0V4cChzb3VyY2UpLFxuICAgICAgICByZXBsYWNlUmVnZXhwID0gbmV3IFJlZ0V4cChzb3VyY2UsICdnJyksXG4gICAgICAgIHN0cmluZyA9IGh0bWwgPT0gbnVsbCA/ICcnIDogJycgKyBodG1sO1xuICAgIHJldHVybiB0ZXN0UmVnZXhwLnRlc3Qoc3RyaW5nKSA/IHN0cmluZy5yZXBsYWNlKHJlcGxhY2VSZWdleHAsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgcmV0dXJuIGVzY2FwZU1hcFttYXRjaF07XG4gICAgfSkgOiBzdHJpbmc7XG4gIH1cblxuXG5cbiAgd2luZG93LmFwcCA9IGFwcDtcbn0oalF1ZXJ5LCB3aW5kb3cpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc3JjL2FwcC5qcyIsIlxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBQYWdlIGFzaWRlXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vXG4rZnVuY3Rpb24oJCwgd2luZG93KXtcblxuICB2YXIgYXNpZGUgPSB7fTtcblxuICBhc2lkZS5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAkKCcuYXNpZGUtYm9keScpLnBlcmZlY3RTY3JvbGxiYXIoKTtcblxuICAgIC8vIEhhbmRsZSBwYWdlIGFzaWRlIHRvZ2dsZXJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmFzaWRlLXRvZ2dsZXInLCBmdW5jdGlvbigpIHtcbiAgICAgIGFzaWRlLnRvZ2dsZSgpO1xuICAgIH0pO1xuXG4gIH07XG5cblxuICBhc2lkZS50b2dnbGUgPSBmdW5jdGlvbigpIHtcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ2FzaWRlLW9wZW4nKTtcbiAgfVxuXG5cbiAgYXNpZGUub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnYXNpZGUtb3BlbicpO1xuICB9XG5cblxuICBhc2lkZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2lkZS1vcGVuJyk7XG4gIH1cblxuXG4gIHdpbmRvdy5hc2lkZSA9IGFzaWRlO1xufShqUXVlcnksIHdpbmRvdyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvY29tcG9uZW50L2FzaWRlLmpzIiwiXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vIENhcmRzXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vXG4rZnVuY3Rpb24oJCwgd2luZG93KXtcblxuICB2YXIgY2FyZHMgPSB7fTtcblxuICBjYXJkcy5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBDbG9zZVxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jYXJkLWJ0bi1jbG9zZScsIGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuY2FyZCcpLmZhZGVPdXQoNjAwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkuY2hpbGRyZW4oKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cblxuXG4gICAgLy8gU2xpZGUgdXAvZG93blxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jYXJkLWJ0bi1zbGlkZScsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdyb3RhdGUtMTgwJykucGFyZW50cygnLmNhcmQnKS5maW5kKCcuY2FyZC1jb250ZW50Jykuc2xpZGVUb2dnbGUoKTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBNYXhpbWl6ZVxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jYXJkLWJ0bi1tYXhpbWl6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnBhcmVudHMoJy5jYXJkJykudG9nZ2xlQ2xhc3MoJ2NhcmQtbWF4aW1pemUnKS5yZW1vdmVDbGFzcygnY2FyZC1mdWxsc2NyZWVuJyk7XG4gICAgfSk7XG5cblxuXG4gICAgLy8gRnVsbHNjcmVlblxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jYXJkLWJ0bi1mdWxsc2NyZWVuJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykucGFyZW50cygnLmNhcmQnKS50b2dnbGVDbGFzcygnY2FyZC1mdWxsc2NyZWVuJykucmVtb3ZlQ2xhc3MoJ2NhcmQtbWF4aW1pemUnKTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBSZWZyZXNoXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNhcmQtYnRuLXJlbG9hZCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciB1cmwgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgIHZhciAkY2FyZCA9ICQodGhpcykucGFyZW50cygnLmNhcmQnKTtcblxuICAgICAgaWYgKHVybCA9PSBcIiNcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICRjYXJkLmZpbmQoJy5jYXJkLWxvYWRpbmcnKS5hZGRDbGFzcygncmV2ZWFsJyk7XG4gICAgICAkY2FyZC5maW5kKCcuY2FyZC1jb250ZW50JykubG9hZCh1cmwsIGZ1bmN0aW9uKCl7XG4gICAgICAgICRjYXJkLmZpbmQoJy5jYXJkLWxvYWRpbmcnKS5yZW1vdmVDbGFzcygncmV2ZWFsJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBDYXJvdXNlbFxuICAgIC8vXG4gICAgJCgnLmNhcmQtY2Fyb3VzZWwnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaW50ZXJ2YWwgPSBmYWxzZTtcblxuICAgICAgaWYgKCAkKHRoaXMpLmhhc0RhdGFBdHRyKCdyaWRlJykgKSB7XG4gICAgICAgIGludGVydmFsID0gNTAwMDtcbiAgICAgIH1cblxuICAgICAgJCh0aGlzKS5jYXJvdXNlbCh7XG4gICAgICAgIGludGVydmFsOiBpbnRlcnZhbFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNhcmQtYnRuLW5leHQnLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5wYXJlbnRzKCcuY2FyZC1jYXJvdXNlbCcpLmNhcm91c2VsKCduZXh0Jyk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jYXJkLWJ0bi1wcmV2JywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykucGFyZW50cygnLmNhcmQtY2Fyb3VzZWwnKS5jYXJvdXNlbCgncHJldicpO1xuICAgIH0pO1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY2FyZC1jYXJvdXNlbCAuY2Fyb3VzZWwtaW5kaWNhdG9ycyBsaScsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnBhcmVudHMoJy5jYXJkLWNhcm91c2VsJykuY2Fyb3VzZWwoJCh0aGlzKS5kYXRhKCdzbGlkZS10bycpKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gIH07XG5cbiAgY2FyZHMuZml4ID0gZnVuY3Rpb24oKSB7XG5cbiAgfVxuXG4gIHdpbmRvdy5jYXJkcyA9IGNhcmRzO1xufShqUXVlcnksIHdpbmRvdyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvY29tcG9uZW50L2NhcmRzLmpzIiwiXG5cbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy8gRG9ja1xuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQsIHdpbmRvdyl7XG5cbiAgdmFyIGRvY2sgPSB7fTtcbiAgdmFyIGludGVydmFsX2JsaW5rID0gW10sXG4gICAgICBpbnRlcnZhbF9zaGFrZSA9IFtdO1xuXG4gIGRvY2suaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgJCgnLmRvY2stYm9keScpLnBlcmZlY3RTY3JvbGxiYXIoe1xuICAgICAgd2hlZWxQcm9wYWdhdGlvbjogZmFsc2VcbiAgICB9KTtcblxuXG5cbiAgICAvLyBIYW5kbGUgZG9jayBvcGVubmVyXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdG9nZ2xlPVwiZG9ja1wiXScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHRhcmdldCA9IGFwcC5nZXRUYXJnZXQoICQodGhpcykgKTtcbiAgICAgIGRvY2sudG9nZ2xlKCB0YXJnZXQsICQodGhpcykgKTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBEb2NrIGNsb3NlclxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLWRvY2s9XCJjbG9zZVwiXSwgW2RhdGEtZGlzbWlzcz1cImRvY2tcIl0nLCBmdW5jdGlvbigpe1xuICAgICAgZG9jay5jbG9zZSggJCh0aGlzKS5jbG9zZXN0KCcuZG9jaycpICk7XG4gICAgfSk7XG5cblxuICAgIC8vIEhhbmRsZSBtaW5pbWl6ZVxuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ1tkYXRhLWRvY2s9XCJtaW5pbWl6ZVwiXSwgLmRvY2subWluaW1pemUgLmRvY2staGVhZGVyJywgZnVuY3Rpb24oKXtcbiAgICAgIGRvY2sudG9nZ2xlTWluaW1pemUoICQodGhpcykuY2xvc2VzdCgnLmRvY2snKSApO1xuICAgIH0pO1xuXG5cbiAgICAvLyBIYW5kbGUgbWF4aW1pemVcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1kb2NrPVwibWF4aW1pemVcIl0nLCBmdW5jdGlvbigpe1xuICAgICAgZG9jay50b2dnbGVNYXhpbWl6ZSggJCh0aGlzKS5jbG9zZXN0KCcuZG9jaycpICk7XG4gICAgfSk7XG5cblxuICAgIC8vIFRPRE86XG4gICAgLy8gU3RvcCBibGluay9zaGFrZSB3aGVuIGRvY2sgZ2V0IGZvY3VzXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmRvY2snLCBmdW5jdGlvbigpe1xuICAgICAgLy92YXIgZSA9ICQodGhpcykuYXR0cignaWQnKTtcbiAgICAgIC8vZG9jay5zdG9wQmxpbmsoZSk7XG4gICAgICAvL2RvY2suc3RvcFNoYWtlKGUpO1xuICAgIH0pO1xuXG5cblxuICAgIC8vIENsb3NlIGRvY2sgd2hlbiBiYWNrZHJvcCB0b3VjaGVzXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmRvY2sgLmNsb3NlJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkb2NrID0gJCh0aGlzKS5jbG9zZXN0KCcuZG9jaycpO1xuICAgICAgZG9jay5jbG9zZShkb2NrKTtcbiAgICB9KTtcblxuICB9O1xuXG5cbiAgLy8gVG9nZ2xlIG9wZW4vY2xvc2VcbiAgLy9cbiAgZG9jay50b2dnbGUgPSBmdW5jdGlvbih0YXJnZXQsIHRvZ2dsZXIpIHtcbiAgICBpZiAoICQodGFyZ2V0KS5oYXNDbGFzcygncmV2ZWFsJykgKSB7XG4gICAgICBkb2NrLmNsb3NlKHRhcmdldCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZG9jay5vcGVuKHRhcmdldCwgdG9nZ2xlcik7XG4gICAgfVxuICB9O1xuXG5cbiAgLy8gT3BlbiBkb2NrXG4gIC8vXG4gIGRvY2sub3BlbiA9IGZ1bmN0aW9uKHRhcmdldCwgdG9nZ2xlcikge1xuICAgIHZhciBkb2NrX2VsID0gJCh0YXJnZXQpLFxuICAgICAgICBib2R5X2VsID0gZG9ja19lbC5maW5kKCcuZG9jay1ib2R5Jyk7XG5cbiAgICBkb2NrX2VsLnByZXBlbmRUbyggZG9ja19lbC5jbG9zZXN0KCcuZG9jay1saXN0JykgKS5hZGRDbGFzcygncmV2ZWFsJyk7XG5cbiAgICAvLyBMb2FkIGRhdGEgZnJvbSB1cmxcbiAgICBpZiAoIGRvY2tfZWwuaGFzRGF0YUF0dHIoJ3VybCcpICYmICd0cnVlJyAhPT0gZG9ja19lbC5kYXRhKCd1cmwtaGFzLWxvYWRlZCcpICkge1xuICAgICAgZG9jay5fbG9hZGVyKCBkb2NrX2VsICk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCBib2R5X2VsLmhhc0RhdGFBdHRyKCd1cmwnKSAmJiAndHJ1ZScgIT09IGJvZHlfZWwuZGF0YSgndXJsLWhhcy1sb2FkZWQnKSApIHtcbiAgICAgIGRvY2suX2xvYWRlciggYm9keV9lbCApO1xuICAgIH1cblxuICB9O1xuXG5cblxuICAvLyBDbG9zZSBkb2NrXG4gIC8vXG4gIGRvY2suY2xvc2UgPSBmdW5jdGlvbihlKSB7XG4gICAgZG9jay51bk1heGltaXplKGUpO1xuICAgICQoZSkucmVtb3ZlQ2xhc3MoJ3JldmVhbCBtaW5pbWl6ZScpO1xuICB9O1xuXG5cblxuICAvLyBUb2dnbGUgbWluaW1pemUgc3RhdGVcbiAgLy9cbiAgZG9jay50b2dnbGVNaW5pbWl6ZSA9IGZ1bmN0aW9uKGUpIHtcblxuICAgIGlmICggJChlKS5oYXNDbGFzcygnbWluaW1pemUnKSApIHtcbiAgICAgICQoZSkucmVtb3ZlQ2xhc3MoJ21pbmltaXplJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZG9jay51bk1heGltaXplKGUpO1xuICAgICAgJChlKS5hZGRDbGFzcygnbWluaW1pemUnKTtcbiAgICB9XG5cbiAgfTtcblxuXG5cbiAgLy8gVG9nZ2xlIG1heGltaXplL2Z1bGxzY3JlZW4gc3RhdGVcbiAgZG9jay50b2dnbGVNYXhpbWl6ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoICQoZSkuaGFzQ2xhc3MoJ21heGltaXplJykgKSB7XG4gICAgICBkb2NrLnVuTWF4aW1pemUoZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZG9jay5tYXhpbWl6ZShlKTtcbiAgICB9XG4gIH07XG5cblxuICAvLyBNYWtlIGl0IGZ1bGxzY3JlZW5cbiAgLy9cbiAgZG9jay5tYXhpbWl6ZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAkKGUpLnJlbW92ZUNsYXNzKCdtaW5pbWl6ZScpLmFkZENsYXNzKCdtYXhpbWl6ZScpLmNsb3Nlc3QoJy5kb2NrLWxpc3QnKS5hZGRDbGFzcygnbWF4aW1pemUnKTtcbiAgfTtcblxuXG4gIC8vIEJhY2sgdG8gaW5pdGlhbCBzaXplIGZyb20gbWF4aW1pemUgc3RhdGVcbiAgLy9cbiAgZG9jay51bk1heGltaXplID0gZnVuY3Rpb24oZSkge1xuICAgICQoZSkucmVtb3ZlQ2xhc3MoJ21heGltaXplJykuY2xvc2VzdCgnLmRvY2stbGlzdCcpLnJlbW92ZUNsYXNzKCdtYXhpbWl6ZScpO1xuICB9O1xuXG5cblxuICAvLyBCbGlua2luZ1xuICAvL1xuICBkb2NrLmJsaW5rID0gZnVuY3Rpb24oZSkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfYmxpbmtbZV0pO1xuICAgICQoZSkudG9nZ2xlQ2xhc3MoXCJibGlua1wiKTtcbiAgICBpbnRlcnZhbF9ibGlua1tlXSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAkKGUpLnRvZ2dsZUNsYXNzKFwiYmxpbmtcIik7XG4gICAgfSwxMDAwKVxuICB9O1xuXG4gIGRvY2suc3RvcEJsaW5rID0gZnVuY3Rpb24oZSkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfYmxpbmtbZV0pO1xuICAgICQoZSkucmVtb3ZlQ2xhc3MoXCJibGlua1wiKTtcbiAgfTtcblxuXG5cbiAgLy8gU2hha2VpbmdcbiAgLy9cbiAgZG9jay5zaGFrZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsX3NoYWtlW2VdKTtcbiAgICAkKGUpLnRvZ2dsZUNsYXNzKFwic2hha2VcIik7XG4gICAgaW50ZXJ2YWxfc2hha2VbZV0gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgJChlKS50b2dnbGVDbGFzcyhcInNoYWtlXCIpO1xuICAgIH0sMTUwMClcbiAgfTtcblxuICBkb2NrLnN0b3BTaGFrZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsX3NoYWtlW2VdKTtcbiAgICAkKGUpLnJlbW92ZUNsYXNzKFwic2hha2VcIik7XG4gIH07XG5cblxuICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgLy9cbiAgZG9jay5fbG9hZGVyID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdGFyZ2V0LmxvYWQoIHRhcmdldC5kYXRhKCd1cmwnKSwgZnVuY3Rpb24oKXtcblxuICAgICAgdGFyZ2V0LmZpbmQoJy5kb2NrLWJvZHknKS5wZXJmZWN0U2Nyb2xsYmFyKHtcbiAgICAgICAgd2hlZWxQcm9wYWdhdGlvbjogZmFsc2VcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDYWxsYmFjayBmdW5jdGlvblxuICAgICAgaWYgKCB0YXJnZXQuaGFzRGF0YUF0dHIoJ29uLWxvYWQnKSApIHtcbiAgICAgICAgd2luZG93WyB0YXJnZXQuZGF0YSgnb24tbG9hZCcpIF0uY2FsbCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBEb24ndCBsb2FkIGl0IG5leHQgdGltZSwgaWYgZG9uJ3QgbmVlZCB0b1xuICAgICAgaWYgKCB0YXJnZXQuaGFzRGF0YUF0dHIoJ2Fsd2F5cy1yZWxvYWQnKSAmJiAndHJ1ZScgPT09IHRhcmdldC5kYXRhKCdhbHdheXMtcmVsb2FkJykgKSB7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5kYXRhKCd1cmwtaGFzLWxvYWRlZCcsICd0cnVlJyk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgfTtcblxuXG5cbiAgd2luZG93LmRvY2sgPSBkb2NrO1xufShqUXVlcnksIHdpbmRvdyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvY29tcG9uZW50L2RvY2suanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBMb29rdXBcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkLCB3aW5kb3cpe1xuXG4gIHZhciBsb29rdXAgPSB7fTtcblxuICBsb29rdXAuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gSGFuZGxlIGxvb2t1cCBvcGVubmVyXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtdG9nZ2xlPVwibG9va3VwXCJdJywgZnVuY3Rpb24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIHRhcmdldCA9IGFwcC5nZXRUYXJnZXQoJCh0aGlzKSk7XG5cbiAgICAgIGlmICh0YXJnZXQgPT0gZmFsc2UpIHtcbiAgICAgICAgbG9va3VwLmNsb3NlKCAkKHRoaXMpLmNsb3Nlc3QoJy5sb29rdXAtZnVsbHNjcmVlbicpIClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsb29rdXAudG9nZ2xlKHRhcmdldCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfTtcblxuXG5cbiAgLy8gVG9nZ2xlIG9wZW4vY2xvc2Ugc3RhdGUgb2YgZnVsbHNjcmVlbiBsb29rdXBcbiAgLy9cbiAgbG9va3VwLnRvZ2dsZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoICQoZSkuaGFzQ2xhc3MoJ3JldmVhbCcpICkge1xuICAgICAgbG9va3VwLmNsb3NlKGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvb2t1cC5vcGVuKGUpO1xuICAgIH1cbiAgfTtcblxuXG5cbiAgLy8gQ2xvc2UgZnVsbHNjcmVlbiBsb29rdXBcbiAgLy9cbiAgbG9va3VwLmNsb3NlID0gZnVuY3Rpb24oZSkge1xuICAgICQoZSkucmVtb3ZlQ2xhc3MoJ3JldmVhbCcpO1xuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbm8tc2Nyb2xsJyk7XG4gIH07XG5cblxuXG4gIC8vIENsb3NlIGZ1bGxzY3JlZW4gbG9va3VwXG4gIC8vXG4gIGxvb2t1cC5vcGVuID0gZnVuY3Rpb24oZSkge1xuICAgICQoZSkuYWRkQ2xhc3MoJ3JldmVhbCcpO1xuICAgICQoZSkuZmluZCgnLmxvb2t1cC1mb3JtIGlucHV0JykuZm9jdXMoKTtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ25vLXNjcm9sbCcpO1xuICB9O1xuXG5cbiAgd2luZG93Lmxvb2t1cCA9IGxvb2t1cDtcbn0oalF1ZXJ5LCB3aW5kb3cpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc3JjL2NvbXBvbmVudC9sb29rdXAuanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBRdWlja3ZpZXdcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkLCB3aW5kb3cpe1xuXG4gIHZhciBxdWlja3ZpZXcgPSB7fTtcblxuICBxdWlja3ZpZXcuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgICAkKCcucXVpY2t2aWV3LWJvZHknKS5wZXJmZWN0U2Nyb2xsYmFyKCk7XG5cbiAgICAvLyBVcGRhdGUgc2Nyb2xsYmFyIG9uIHRhYiBjaGFuZ2VcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdzaG93bi5icy50YWInLCAnLnF1aWNrdmlldy1oZWFkZXIgYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5xdWlja3ZpZXcnKS5maW5kKCcucXVpY2t2aWV3LWJvZHknKS5wZXJmZWN0U2Nyb2xsYmFyKCd1cGRhdGUnKTtcbiAgICB9KVxuXG5cblxuICAgIC8vIFF1aWNrdmlldyBjbG9zZXJcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1kaXNtaXNzPVwicXVpY2t2aWV3XCJdJywgZnVuY3Rpb24oKXtcbiAgICAgIHF1aWNrdmlldy5jbG9zZSggJCh0aGlzKS5jbG9zZXN0KCcucXVpY2t2aWV3JykgKTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBIYW5kbGUgcXVpY2t2aWV3IG9wZW5uZXJcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS10b2dnbGU9XCJxdWlja3ZpZXdcIl0nLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgdGFyZ2V0ID0gYXBwLmdldFRhcmdldCgkKHRoaXMpKTtcblxuICAgICAgaWYgKHRhcmdldCA9PSBmYWxzZSkge1xuICAgICAgICBxdWlja3ZpZXcuY2xvc2UoICQodGhpcykuY2xvc2VzdCgnLnF1aWNrdmlldycpIClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBxdWlja3ZpZXcudG9nZ2xlKHRhcmdldCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuXG4gICAgLy8gQ2xvc2UgcXVpY2t2aWV3IHdoZW4gYmFja2Ryb3AgdG91Y2hlc1xuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5iYWNrZHJvcC1xdWlja3ZpZXcnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHF2ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXRhcmdldCcpO1xuICAgICAgcXVpY2t2aWV3LmNsb3NlKHF2KTtcbiAgICB9KTtcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnF1aWNrdmlldyAuY2xvc2UsIFtkYXRhLWRpc21pc3M9XCJxdWlja3ZpZXdcIl0nLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHF2ID0gJCh0aGlzKS5jbG9zZXN0KCcucXVpY2t2aWV3Jyk7XG4gICAgICBxdWlja3ZpZXcuY2xvc2UocXYpO1xuICAgIH0pO1xuXG4gIH07XG5cblxuXG4gIC8vIFRvZ2dsZSBvcGVuL2Nsb3NlIHN0YXRlXG4gIC8vXG4gIHF1aWNrdmlldy50b2dnbGUgPSBmdW5jdGlvbihlKSB7XG4gICAgaWYgKCAkKGUpLmhhc0NsYXNzKCdyZXZlYWwnKSApIHtcbiAgICAgIHF1aWNrdmlldy5jbG9zZShlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBxdWlja3ZpZXcub3BlbihlKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgLy8gT3BlbiBxdWlja3ZpZXdcbiAgLy9cbiAgcXVpY2t2aWV3Lm9wZW4gPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHF1aWNrdmlldyA9ICQoZSk7XG5cbiAgICAvLyBMb2FkIGNvbnRlbnQgZnJvbSBVUkwgaWYgcmVxdWlyZWRcbiAgICBpZiAoIHF1aWNrdmlldy5oYXNEYXRhQXR0cigndXJsJykgJiYgJ3RydWUnICE9PSBxdWlja3ZpZXcuZGF0YSgndXJsLWhhcy1sb2FkZWQnKSApIHtcbiAgICAgIHF1aWNrdmlldy5sb2FkKCBxdWlja3ZpZXcuZGF0YSgndXJsJyksIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcucXVpY2t2aWV3LWJvZHknKS5wZXJmZWN0U2Nyb2xsYmFyKCk7XG4gICAgICAgIC8vIERvbid0IGxvYWQgaXQgbmV4dCB0aW1lLCBpZiBkb24ndCBuZWVkIHRvXG4gICAgICAgIGlmICggcXVpY2t2aWV3Lmhhc0RhdGFBdHRyKCdhbHdheXMtcmVsb2FkJykgJiYgJ3RydWUnID09PSBxdWlja3ZpZXcuZGF0YSgnYWx3YXlzLXJlbG9hZCcpICkge1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVpY2t2aWV3LmRhdGEoJ3VybC1oYXMtbG9hZGVkJywgJ3RydWUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT3BlbiBpdFxuICAgIHF1aWNrdmlldy5hZGRDbGFzcygncmV2ZWFsJykubm90KCcuYmFja2Ryb3AtcmVtb3ZlJykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJhcHAtYmFja2Ryb3AgYmFja2Ryb3AtcXVpY2t2aWV3XCIgZGF0YS10YXJnZXQ9XCInKyBlICsnXCI+PC9kaXY+Jyk7XG4gIH07XG5cblxuXG4gIC8vIENsb3NlIHF1aWNrdmlld1xuICAvL1xuICBxdWlja3ZpZXcuY2xvc2UgPSBmdW5jdGlvbihlKSB7XG4gICAgJChlKS5yZW1vdmVDbGFzcygncmV2ZWFsJyk7XG4gICAgJCgnLmJhY2tkcm9wLXF1aWNrdmlldycpLnJlbW92ZSgpO1xuICB9O1xuXG5cblxuICB3aW5kb3cucXVpY2t2aWV3ID0gcXVpY2t2aWV3O1xufShqUXVlcnksIHdpbmRvdyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvY29tcG9uZW50L3F1aWNrdmlldy5qcyIsIlxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vIFNpZGViYXJcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkLCB3aW5kb3cpe1xuXG4gIHZhciBzaWRlYmFyID0ge307XG5cbiAgc2lkZWJhci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBTY3JvbGxhYmxlXG4gICAgLy9cbiAgICAkKCcuc2lkZWJhci1uYXZpZ2F0aW9uJykucGVyZmVjdFNjcm9sbGJhcigpO1xuXG5cblxuICAgIC8vIEhhbmRsZSBzaWRlYmFyIG9wZW5uZXJcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2lkZWJhci10b2dnbGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICBzaWRlYmFyLm9wZW4oKTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBDbG9zZSBzaWRlYmFyIHdoZW4gYmFja2Ryb3AgdG91Y2hlc1xuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5iYWNrZHJvcC1zaWRlYmFyJywgZnVuY3Rpb24oKXtcbiAgICAgIHNpZGViYXIuY2xvc2UoKTtcbiAgICB9KTtcblxuXG5cbiAgICAvLyBTbGlkZSB1cC9kb3duIG1lbnUgaXRlbSBvbiBjbGlja1xuICAgIC8vXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5zaWRlYmFyIC5tZW51LWxpbmsnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyICRzdWJtZW51ID0gJCh0aGlzKS5uZXh0KCcubWVudS1zdWJtZW51Jyk7XG4gICAgICBpZiAoJHN1Ym1lbnUubGVuZ3RoIDwgMSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBpZiAoJHN1Ym1lbnUuaXMoXCI6dmlzaWJsZVwiKSkge1xuICAgICAgICAkc3VibWVudS5zbGlkZVVwKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLnNpZGViYXIgLm1lbnUtaXRlbS5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAkKCcuc2lkZWJhciAubWVudS1zdWJtZW51OnZpc2libGUnKS5zbGlkZVVwKCk7XG4gICAgICAkKCcuc2lkZWJhciAubWVudS1saW5rJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICRzdWJtZW51LnNsaWRlVG9nZ2xlKGZ1bmN0aW9uKCl7XG4gICAgICAgICQoJy5zaWRlYmFyIC5tZW51LWl0ZW0ub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9KTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBmb2xkIHRvZ2dsZXJcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuc2lkZWJhci10b2dnbGUtZm9sZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgc2lkZWJhci50b2dnbGVGb2xkKCk7XG4gICAgfSk7XG5cbiAgfTtcblxuXG5cblxuICBzaWRlYmFyLnRvZ2dsZUZvbGQgPSBmdW5jdGlvbigpIHtcbiAgICAkKCdib2R5JykudG9nZ2xlQ2xhc3MoJ3NpZGViYXItZm9sZGVkJyk7XG4gICAgYXBwLnRvZ2dsZVN0YXRlKCdzaWRlYmFyLmZvbGRlZCcpO1xuICB9XG5cbiAgc2lkZWJhci5mb2xkID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdzaWRlYmFyLWZvbGRlZCcpO1xuICAgIGFwcC5zdGF0ZSgnc2lkZWJhci5mb2xkZWQnLCB0cnVlKTtcbiAgfVxuXG4gIHNpZGViYXIudW5mb2xkID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdzaWRlYmFyLWZvbGRlZCcpO1xuICAgIGFwcC5zdGF0ZSgnc2lkZWJhci5mb2xkZWQnLCBmYWxzZSk7XG4gIH1cblxuXG5cblxuICBzaWRlYmFyLm9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ3NpZGViYXItb3BlbicpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJhcHAtYmFja2Ryb3AgYmFja2Ryb3Atc2lkZWJhclwiPjwvZGl2PicpO1xuICB9XG5cbiAgc2lkZWJhci5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2lkZWJhci1vcGVuJyk7XG4gICAgJCgnLmJhY2tkcm9wLXNpZGViYXInKS5yZW1vdmUoKTtcbiAgfVxuXG5cbiAgd2luZG93LnNpZGViYXIgPSBzaWRlYmFyO1xufShqUXVlcnksIHdpbmRvdyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvY29tcG9uZW50L3NpZGViYXIuanMiLCJcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy8gVG9wYmFyIG1lbnUgKEhvcml6b250YWwgbWVudSlcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkLCB3aW5kb3cpe1xuXG4gIHZhciB0b3BiYXJfbWVudSA9IHt9O1xuXG4gIHRvcGJhcl9tZW51LmluaXQgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIEhhbmRsZSBzaWRlYmFyIG9wZW5uZXJcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcudG9wYmFyLW1lbnUtdG9nZ2xlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgdG9wYmFyX21lbnUub3BlbigpO1xuICAgIH0pO1xuXG5cblxuICAgIC8vIENsb3NlIHNpZGViYXIgd2hlbiBiYWNrZHJvcCB0b3VjaGVzXG4gICAgLy9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJhY2tkcm9wLXRvcGJhci1tZW51JywgZnVuY3Rpb24oKXtcbiAgICAgIHRvcGJhcl9tZW51LmNsb3NlKCk7XG4gICAgfSk7XG5cblxuXG4gICAgLy8gRG9uJ3QgZm9sbG93IGluIGxhcmdlIGRldmljZXNcbiAgICAvL1xuICAgIHZhciBicmVha29uID0gYXBwLmJyZWFrcG9pbnQubGc7XG5cbiAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCd0b3BiYXItdG9nZ2xlYWJsZS14cycpKSB7XG4gICAgICBicmVha29uID0gYXBwLmJyZWFrcG9pbnQueHM7XG4gICAgfVxuICAgIGVsc2UgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygndG9wYmFyLXRvZ2dsZWFibGUtc20nKSkge1xuICAgICAgYnJlYWtvbiA9IGFwcC5icmVha3BvaW50LnNtO1xuICAgIH1cbiAgICBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3RvcGJhci10b2dnbGVhYmxlLW1kJykpIHtcbiAgICAgIGJyZWFrb24gPSBhcHAuYnJlYWtwb2ludC5tZDtcbiAgICB9XG5cbiAgICBpZiAoJChkb2N1bWVudCkud2lkdGgoKSA+IGJyZWFrb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuXG4gICAgLy8gU2xpZGUgdXAvZG93biBtZW51IGl0ZW0gb24gY2xpY2tcbiAgICAvL1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcudG9wYmFyIC5tZW51LWxpbmsnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyICRzdWJtZW51ID0gJCh0aGlzKS5uZXh0KCcubWVudS1zdWJtZW51Jyk7XG4gICAgICBpZiAoJHN1Ym1lbnUubGVuZ3RoIDwgMSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBpZiAoJHN1Ym1lbnUuaXMoXCI6dmlzaWJsZVwiKSkge1xuICAgICAgICAkc3VibWVudS5zbGlkZVVwKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnLnRvcGJhciAubWVudS1pdGVtLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICB9KTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgICQoJy50b3BiYXIgLm1lbnUtc3VibWVudTp2aXNpYmxlJykuc2xpZGVVcCgpO1xuICAgICAgJCgnLnRvcGJhciAubWVudS1saW5rJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICRzdWJtZW51LnNsaWRlRG93bihmdW5jdGlvbigpe1xuICAgICAgICAkKCcudG9wYmFyIC5tZW51LWl0ZW0ub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9KTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICB9KTtcblxuICB9O1xuXG5cblxuICAvLyBPcGVuIG1lbnVcbiAgLy9cbiAgdG9wYmFyX21lbnUub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcygndG9wYmFyLW1lbnUtb3BlbicpLmZpbmQoJy50b3BiYXInKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYXBwLWJhY2tkcm9wIGJhY2tkcm9wLXRvcGJhci1tZW51XCI+PC9kaXY+Jyk7XG4gIH1cblxuXG4gIC8vIENsb3NlIG1lbnVcbiAgLy9cbiAgdG9wYmFyX21lbnUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3RvcGJhci1tZW51LW9wZW4nKTtcbiAgICAkKCcuYmFja2Ryb3AtdG9wYmFyLW1lbnUnKS5yZW1vdmUoKTtcbiAgfVxuXG5cbiAgd2luZG93LnRvcGJhcl9tZW51ID0gdG9wYmFyX21lbnU7XG59KGpRdWVyeSwgd2luZG93KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9iYWNrL2pzL3NyYy9jb21wb25lbnQvdG9wYmFyLW1lbnUuanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBUb3BiYXJcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkLCB3aW5kb3cpe1xuXG4gIHZhciB0b3BiYXIgPSB7fTtcblxuICB0b3BiYXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gU2Nyb2xsYWJsZVxuICAgIC8vXG4gICAgJCgnLnRvcGJhciAubGlzdC1ncm91cCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJCh0aGlzKS5oZWlnaHQoKSA+IDI2NSkge1xuICAgICAgICAkKHRoaXMpLnBlcmZlY3RTY3JvbGxiYXIoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9O1xuXG5cbiAgLy8gVG9nZ2xlIGZpeC91bmZpeCBzdGF0ZVxuICAvL1xuICB0b3BiYXIudG9nZ2xlRml4ID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnLnRvcGJhcicpLnRvZ2dsZUNsYXNzKCd0b3BiYXItdW5maXgnKTtcbiAgICBhcHAudG9nZ2xlU3RhdGUoJ3RvcGJhci5maXhlZCcpO1xuICB9XG5cblxuICAvLyBGaXggdG8gdG9wXG4gIC8vXG4gIHRvcGJhci5maXggPSBmdW5jdGlvbigpIHtcbiAgICAkKCcudG9wYmFyJykucmVtb3ZlQ2xhc3MoJ3RvcGJhci11bmZpeCcpO1xuICAgIGFwcC5zdGF0ZSgndG9wYmFyLmZpeGVkJywgdHJ1ZSk7XG4gIH1cblxuXG4gIC8vIFVuZml4IGZyb20gdG9wXG4gIC8vXG4gIHRvcGJhci51bmZpeCA9IGZ1bmN0aW9uKCkge1xuICAgICQoJy50b3BiYXInKS5hZGRDbGFzcygndG9wYmFyLXVuZml4Jyk7XG4gICAgYXBwLnN0YXRlKCd0b3BiYXIuZml4ZWQnLCBmYWxzZSk7XG4gIH1cblxuXG5cbiAgLy8gUmV0dXJuICd0cnVlJyBpZiB0b3BiYXIgaXMgZml4ZWQgdG8gdG9wXG4gIC8vXG4gIHRvcGJhci5pc0ZpeGVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAkKCcudG9wYmFyLnRvcGJhci11bmZpeCcpLmxlbmd0aCApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB3aW5kb3cudG9wYmFyID0gdG9wYmFyO1xufShqUXVlcnksIHdpbmRvdyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvY29tcG9uZW50L3RvcGJhci5qcyIsIlxuLy8gQ2hlY2sgaWYgYW4gZWxlbWVudCBoYXMgYSBzcGVjaWZpYyBkYXRhIGF0dHJpYnV0ZVxuLy9cbmpRdWVyeS5mbi5oYXNEYXRhQXR0ciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuICQodGhpcylbMF0uaGFzQXR0cmlidXRlKCdkYXRhLScrIG5hbWUpO1xufTtcblxuXG5cbi8vIEdldCBkYXRhIGF0dHJpYnV0ZS4gSWYgZWxlbWVudCBkb2Vzbid0IGhhdmUgdGhlIGF0dHJpYnV0ZSwgcmV0dXJuIGRlZmF1bHQgdmFsdWVcbi8vXG5qUXVlcnkuZm4uZGF0YUF0dHIgPSBmdW5jdGlvbihuYW1lLCBkZWYpIHtcbiAgcmV0dXJuICQodGhpcylbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLScrIG5hbWUpIHx8IGRlZjtcbn07XG5cblxuXG4vLyBSZXR1cm4gb3V0ZXJIVE1MIChpbmNsdXNpbmcgdGhlIGVsZW1lbnQpIGNvZGVcbi8vXG5qUXVlcnkuZm4ub3V0ZXJIVE1MID0gZnVuY3Rpb24oKSB7XG4gIHZhciBodG1sID0gJyc7XG4gIHRoaXMuZWFjaChmdW5jdGlvbigpe1xuICAgIGh0bWwgKz0gJCh0aGlzKS5wcm9wKFwib3V0ZXJIVE1MXCIpO1xuICB9KVxuICByZXR1cm4gaHRtbDtcbn07XG5cblxuLy8gUmV0dXJuIEhUTUwgY29kZSBvZiBhbGwgdGhlIHNlbGVjdGVkIGVsZW1lbnRzXG4vL1xualF1ZXJ5LmZuLmZ1bGxIVE1MID0gZnVuY3Rpb24oKSB7XG4gIHZhciBodG1sID0gJyc7XG4gICQodGhpcykuZWFjaChmdW5jdGlvbigpe1xuICAgIGh0bWwgKz0gJCh0aGlzKS5vdXRlckhUTUwoKTtcbiAgfSk7XG4gIHJldHVybiBodG1sO1xufTtcblxuLy8gSW5zdGFuY2Ugc2VhcmNoXG4vL1xuLy8gJC5leHByWyc6J10gLT4gJC5leHByLnBzZXVkb3NcbmpRdWVyeS5leHByWyc6J10uc2VhcmNoID0gZnVuY3Rpb24oYSwgaSwgbSkge1xuICByZXR1cm4gJChhKS5odG1sKCkudG9VcHBlckNhc2UoKS5pbmRleE9mKG1bM10udG9VcHBlckNhc2UoKSkgPj0gMDtcbn07XG5cblxuLy8gU2Nyb2xsIHRvIGVuZFxuLy9cbmpRdWVyeS5mbi5zY3JvbGxUb0VuZCA9IGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLnNjcm9sbFRvcCggJCh0aGlzKS5wcm9wKFwic2Nyb2xsSGVpZ2h0XCIpICk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9iYWNrL2pzL3NyYy9qcXVlcnktZXh0ZW5kcy5qcyIsIlxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBNYXBcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkKXtcblxuXG4gIGFwcC5tYXAgPSBmdW5jdGlvbigpIHtcblxuICAgICQoJ1tkYXRhLXByb3ZpZGV+PVwibWFwXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIHNldHRpbmcgPSAkLmV4dGVuZCh7fSwgYXBwLmRlZmF1bHRzLmdvb2dsZU1hcCwgYXBwLmdldERhdGFPcHRpb25zKCQodGhpcykpKTtcblxuICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoICQodGhpcylbMF0sIHtcbiAgICAgICAgY2VudGVyOiB7XG4gICAgICAgICAgbGF0OiBOdW1iZXIoc2V0dGluZy5sYXQpLFxuICAgICAgICAgIGxuZzogTnVtYmVyKHNldHRpbmcubG5nKVxuICAgICAgICB9LFxuICAgICAgICB6b29tOiBOdW1iZXIoc2V0dGluZy56b29tKVxuICAgICAgfSk7XG5cbiAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICBsYXQ6IE51bWJlcihzZXR0aW5nLm1hcmtlckxhdCksXG4gICAgICAgICAgbG5nOiBOdW1iZXIoc2V0dGluZy5tYXJrZXJMbmcpXG4gICAgICAgIH0sXG4gICAgICAgIG1hcDogbWFwLFxuICAgICAgICBhbmltYXRpb246IGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5EUk9QLFxuICAgICAgICBpY29uOiBzZXR0aW5nLm1hcmtlckljb25cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgaW5mb3dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KHtcbiAgICAgICAgY29udGVudDogJCh0aGlzKS5kYXRhQXR0cignaW5mbycsICcnKVxuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaW5mb3dpbmRvdy5vcGVuKG1hcCwgbWFya2VyKTtcbiAgICAgIH0pO1xuXG4gICAgICBzd2l0Y2ggKHNldHRpbmcuc3R5bGUpIHtcbiAgICAgICAgY2FzZSAnbGlnaHQnOlxuICAgICAgICAgIG1hcC5zZXQoJ3N0eWxlcycsIFt7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2U5ZTllOVwifSx7XCJsaWdodG5lc3NcIjoxN31dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmNWY1ZjVcIn0se1wibGlnaHRuZXNzXCI6MjB9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn0se1wibGlnaHRuZXNzXCI6MTd9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoyOX0se1wid2VpZ2h0XCI6MC4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZmZmZmZcIn0se1wibGlnaHRuZXNzXCI6MTh9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmNWY1ZjVcIn0se1wibGlnaHRuZXNzXCI6MjF9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaS5wYXJrXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNkZWRlZGVcIn0se1wibGlnaHRuZXNzXCI6MjF9XX0se1wiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifSx7XCJjb2xvclwiOlwiI2ZmZmZmZlwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuZmlsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6MzZ9LHtcImNvbG9yXCI6XCIjMzMzMzMzXCJ9LHtcImxpZ2h0bmVzc1wiOjQwfV19LHtcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9LHtcImxpZ2h0bmVzc1wiOjE5fV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiNmZWZlZmVcIn0se1wibGlnaHRuZXNzXCI6MjB9XX0se1wiZmVhdHVyZVR5cGVcIjpcImFkbWluaXN0cmF0aXZlXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnkuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZmVmZWZlXCJ9LHtcImxpZ2h0bmVzc1wiOjE3fSx7XCJ3ZWlnaHRcIjoxLjJ9XX1dKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdkYXJrJzpcbiAgICAgICAgICBtYXAuc2V0KCdzdHlsZXMnLCBbe1wiZmVhdHVyZVR5cGVcIjpcImFsbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wic2F0dXJhdGlvblwiOjM2fSx7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjo0MH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWxsXCIsXCJlbGVtZW50VHlwZVwiOlwibGFiZWxzLnRleHQuc3Ryb2tlXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9uXCJ9LHtcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE2fV19LHtcImZlYXR1cmVUeXBlXCI6XCJhbGxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeS5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjIwfV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxN30se1wid2VpZ2h0XCI6MS4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJsYW5kc2NhcGVcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyMH1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MjF9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTd9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5LnN0cm9rZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoyOX0se1wid2VpZ2h0XCI6MC4yfV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkLmFydGVyaWFsXCIsXCJlbGVtZW50VHlwZVwiOlwiZ2VvbWV0cnlcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiMwMDAwMDBcIn0se1wibGlnaHRuZXNzXCI6MTh9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQubG9jYWxcIixcImVsZW1lbnRUeXBlXCI6XCJnZW9tZXRyeVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzAwMDAwMFwifSx7XCJsaWdodG5lc3NcIjoxNn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE5fV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImdlb21ldHJ5XCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjMDAwMDAwXCJ9LHtcImxpZ2h0bmVzc1wiOjE3fV19XSlcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICggQXJyYXkuaXNBcnJheShzZXR0aW5nLnN0eWxlKSApIHtcbiAgICAgICAgICAgIG1hcC5zZXQoJ3N0eWxlcycsIHNldHRpbmcuc3R5bGUpO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0pO1xuICB9XG5cblxuXG59KGpRdWVyeSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9iYWNrL2pzL3NyYy9wbHVnaW4vbWFwLmpzIiwiXG5cbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy8gTW9kYWxlclxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQpe1xuXG5cblxuICBhcHAubW9kYWxlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgIHZhciBzZXR0aW5nID0gJC5leHRlbmQoe30sIGFwcC5kZWZhdWx0cy5tb2RhbGVyLCBvcHRpb25zKTtcblxuXG5cbiAgICB2YXIgaGFuZGxlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gQm9vdHN0cmFwIG1vZGFsIGV2ZW50c1xuICAgICAgLy9cbiAgICAgIGlmICggc2V0dGluZy5vblNob3cgKSB7XG4gICAgICAgICQoJyMnKyBpZCkub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBhcHAuY2FsbCggc2V0dGluZy5vblNob3csIGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCBzZXR0aW5nLm9uU2hvd24gKSB7XG4gICAgICAgICQoJyMnKyBpZCkub24oJ3Nob3duLmJzLm1vZGFsJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgYXBwLmNhbGwoIHNldHRpbmcub25TaG93biwgZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIHNldHRpbmcub25IaWRlICkge1xuICAgICAgICAkKCcjJysgaWQpLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgYXBwLmNhbGwoIHNldHRpbmcub25IaWRlLCBlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICggc2V0dGluZy5vbkhpZGRlbiApIHtcbiAgICAgICAgJCgnIycrIGlkKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgYXBwLmNhbGwoIHNldHRpbmcub25IaWRkZW4sIGUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBIYW5kbGUgY29uZmlybSBjYWxsYmFja1xuICAgICAgLy9cbiAgICAgICQoJyMnKyBpZCkuZmluZCgnW2RhdGEtcGVyZm9ybT1cImNvbmZpcm1cIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXG4gICAgICAgIC8vIEhhc24ndCBzZXRcbiAgICAgICAgaWYgKCBzZXR0aW5nLm9uQ29uZmlybSA9PSBudWxsICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGEgZnVuY3Rpb25cbiAgICAgICAgaWYgKCAkLmlzRnVuY3Rpb24oc2V0dGluZy5vbkNvbmZpcm0pICkge1xuICAgICAgICAgIHNldHRpbmcub25Db25maXJtKCQoJyMnKyBpZCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIHN0cmluZyB2YWx1ZSwgc28gY2FsbCBpdFxuICAgICAgICBpZiAoIHNldHRpbmcub25Db25maXJtLnN1YnN0cmluZyApIHtcbiAgICAgICAgICBhcHAuY2FsbCggc2V0dGluZy5vbkNvbmZpcm0sICQoJyMnKyBpZCkgKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuXG4gICAgICAvLyBIYW5kbGUgY2FuY2VsIGNhbGxiYWNrXG4gICAgICAvL1xuICAgICAgJCgnIycrIGlkKS5maW5kKCdbZGF0YS1wZXJmb3JtPVwiY2FuY2VsXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblxuICAgICAgICAvLyBIYXNuJ3Qgc2V0XG4gICAgICAgIGlmICggc2V0dGluZy5vbkNhbmNlbCA9PSBudWxsICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGEgZnVuY3Rpb25cbiAgICAgICAgaWYgKCAkLmlzRnVuY3Rpb24oc2V0dGluZy5vbkNhbmNlbCkgKSB7XG4gICAgICAgICAgc2V0dGluZy5vbkNhbmNlbCgkKCcjJysgaWQpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBzdHJpbmcgdmFsdWUsIHNvIGNhbGwgaXRcbiAgICAgICAgaWYgKCBzZXR0aW5nLm9uQ2FuY2VsLnN1YnN0cmluZyApIHtcbiAgICAgICAgICBhcHAuY2FsbCggc2V0dGluZy5vbkNhbmNlbCwgJCgnIycrIGlkKSApO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuXG4gICAgaWYgKCBzZXR0aW5nLm1vZGFsSWQgKSB7XG4gICAgICAkKCcjJysgc2V0dGluZy5tb2RhbElkKS5tb2RhbCgnc2hvdycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgdmFyIGlkID0gJ21vZGFsLScrIGFwcC5ndWlkKCk7XG5cblxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gV2UgcmVjaWV2ZSBtb2RhbCBtYXJrdXAgZnJvbSB1cmxcbiAgICAvL1xuICAgIGlmIChzZXR0aW5nLmlzTW9kYWwpIHtcblxuICAgICAgJCgnPGRpdj4nKS5sb2FkKCBzZXR0aW5nLnVybCwgZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZCggJCh0aGlzKS5maW5kKCcubW9kYWwnKS5hdHRyKCdpZCcsIGlkKS5vdXRlckhUTUwoKSApO1xuXG4gICAgICAgICQoJyMnKyBpZCkubW9kYWwoJ3Nob3cnKTtcblxuXG4gICAgICAgIC8vIERlc3Ryb3kgYWZ0ZXIgY2xvc2VcbiAgICAgICAgLy9cbiAgICAgICAgaWYgKCBzZXR0aW5nLmF1dG9EZXN0cm95ICkge1xuICAgICAgICAgICQoJyMnKyBpZCkub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcjJysgaWQpLnJlbW92ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICQoc2V0dGluZy50aGlzKS5hdHRyKCdkYXRhLW1vZGFsLWlkJywgaWQpO1xuICAgICAgICB9XG5cblxuICAgICAgICBoYW5kbGVDYWxsYmFjaygpO1xuXG5cbiAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBXZSBzaG91bGQgZGVzaWduIHRoZSBtb2RhbFxuICAgIC8vXG4gICAgZWxzZSB7XG5cbiAgICAgIHN3aXRjaCAoc2V0dGluZy5zaXplKSB7XG4gICAgICAgIGNhc2UgJ3NtJzpcbiAgICAgICAgICBzZXR0aW5nLnNpemUgPSAnbW9kYWwtc20nO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2xnJzpcbiAgICAgICAgICBzZXR0aW5nLnNpemUgPSAnbW9kYWwtbGcnO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy9zZXR0aW5nLnNpemUgPSAnJztcbiAgICAgIH1cblxuXG4gICAgICBpZiAoIHNldHRpbmcudHlwZSApIHtcbiAgICAgICAgc2V0dGluZy50eXBlID0gJ21vZGFsLScrIHNldHRpbmcudHlwZTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBIZWFkZXIgY29kZVxuICAgICAgLy9cbiAgICAgIHZhciBodG1sX2hlYWRlciA9ICcnO1xuICAgICAgaWYgKCBzZXR0aW5nLmhlYWRlclZpc2libGUgKSB7XG4gICAgICAgIGh0bWxfaGVhZGVyICs9XG4gICAgICAgICAgJzxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj4gXFxcbiAgICAgICAgICAgIDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+Jysgc2V0dGluZy50aXRsZSArJzwvaDU+IFxcXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPiBcXFxuICAgICAgICAgIDwvZGl2Pic7XG4gICAgICB9XG5cblxuICAgICAgLy8gRm9vdGVyIGNvZGVcbiAgICAgIC8vXG4gICAgICB2YXIgaHRtbF9mb290ZXIgPSAnJztcbiAgICAgIGlmICggc2V0dGluZy5mb290ZXJWaXNpYmxlICkge1xuICAgICAgICBodG1sX2Zvb3RlciArPSAnPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPic7XG5cbiAgICAgICAgaWYgKCBzZXR0aW5nLmNhbmNlbFZpc2libGUgKSB7XG4gICAgICAgICAgaHRtbF9mb290ZXIgKz0gJzxidXR0b24gY2xhc3M9XCInKyBzZXR0aW5nLmNhbmNlbENsYXNzICsnXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBkYXRhLXBlcmZvcm09XCJjYW5jZWxcIj4nKyBzZXR0aW5nLmNhbmNlbFRleHQgKyc8L2J1dHRvbj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBzZXR0aW5nLmNvbmZpcm1WaXNpYmxlICkge1xuICAgICAgICAgIGh0bWxfZm9vdGVyICs9ICc8YnV0dG9uIGNsYXNzPVwiJysgc2V0dGluZy5jb25maXJtQ2xhc3MgKydcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGRhdGEtcGVyZm9ybT1cImNvbmZpcm1cIj4nKyBzZXR0aW5nLmNvbmZpcm1UZXh0ICsnPC9idXR0b24+JztcbiAgICAgICAgfVxuXG4gICAgICAgIGh0bWxfZm9vdGVyICs9ICc8L2Rpdj4nO1xuICAgICAgfVxuXG4gICAgICAvLyBNb2RhbCBjb2RlXG4gICAgICAvL1xuICAgICAgdmFyIG1vZGFsX2h0bWwgPVxuICAgICAgICAgICc8ZGl2IGNsYXNzPVwibW9kYWwgZmFkZSAnKyBzZXR0aW5nLnR5cGUgKydcIiBpZD1cIicrIGlkICsnXCIgdGFiaW5kZXg9XCItMVwiJysgKCAhc2V0dGluZy5iYWNrZHJvcCA/ICcgZGF0YS1iYWNrZHJvcD1cImZhbHNlXCInIDogJycpICsnPiBcXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyAnKyBzZXR0aW5nLnNpemUgKydcIj4gXFxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj4gXFxcbiAgICAgICAgICAgICAgICAnKyBodG1sX2hlYWRlciArJyBcXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5ICcrIHNldHRpbmcuYm9keUV4dHJhQ2xhc3MgKydcIj4gXFxcbiAgICAgICAgICAgICAgICAgICcrIHNldHRpbmcuc3Bpbm5lciArJyBcXFxuICAgICAgICAgICAgICAgIDwvZGl2PiBcXFxuICAgICAgICAgICAgICAgICcrIGh0bWxfZm9vdGVyICsnIFxcXG4gICAgICAgICAgICAgIDwvZGl2PiBcXFxuICAgICAgICAgICAgPC9kaXY+IFxcXG4gICAgICAgICAgPC9kaXY+JztcblxuXG4gICAgICAvLyBTaG93IG1vZGFsXG4gICAgICAkKCdib2R5JykuYXBwZW5kKG1vZGFsX2h0bWwpO1xuICAgICAgJCgnIycrIGlkKS5tb2RhbCgnc2hvdycpO1xuXG5cbiAgICAgIC8vIERlc3Ryb3kgYWZ0ZXIgY2xvc2VcbiAgICAgIC8vXG4gICAgICBpZiAoIHNldHRpbmcuYXV0b0Rlc3Ryb3kgKSB7XG4gICAgICAgICQoJyMnKyBpZCkub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnIycrIGlkKS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJChzZXR0aW5nLnRoaXMpLmF0dHIoJ2RhdGEtbW9kYWwtaWQnLCBpZCk7XG4gICAgICB9XG5cblxuICAgICAgLy8gTG9hZCBkYXRhIGludG8gdGhlIG1vZGFsXG4gICAgICAvL1xuICAgICAgaWYgKCBzZXR0aW5nLnVybCApIHtcbiAgICAgICAgJCgnIycrIGlkKS5maW5kKCcubW9kYWwtYm9keScpLmxvYWQoc2V0dGluZy51cmwsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8kKHRoaXMpLnJlbW92ZUNsYXNzKCdwLWEtMCcpO1xuICAgICAgICAgIGhhbmRsZUNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIHNldHRpbmcuaHRtbCApIHtcbiAgICAgICAgJCgnIycrIGlkKS5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoc2V0dGluZy5odG1sKTtcbiAgICAgICAgaGFuZGxlQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCBzZXR0aW5nLnRhcmdldCApIHtcbiAgICAgICAgJCgnIycrIGlkKS5maW5kKCcubW9kYWwtYm9keScpLmh0bWwoICQoc2V0dGluZy50YXJnZXQpLmh0bWwoKSApO1xuICAgICAgICBoYW5kbGVDYWxsYmFjaygpO1xuICAgICAgfVxuXG5cblxuXG4gICAgfVxuXG5cblxuXG4gIH1cblxuXG4gIC8vIEVuYWJsZSBkYXRhIGF0dHJpYnV0ZSBvcHRpb25zXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1wcm92aWRlfj1cIm1vZGFsZXJcIl0nLCBmdW5jdGlvbigpe1xuICAgIGFwcC5tb2RhbGVyKCBhcHAuZ2V0RGF0YU9wdGlvbnMoJCh0aGlzKSkgKTtcbiAgICAvL2FwcC5tb2RhbGVyLmFwcGx5KCQodGhpcyksIG9wdGlvbnMpO1xuICB9KTtcblxuXG5cblxufShqUXVlcnkpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvcGx1Z2luL21vZGFsZXIuanMiLCJcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy8gVG9hc3QgcGx1Z2luXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vXG4rZnVuY3Rpb24oJCl7XG5cblxuICBhcHAudG9hc3QgPSBmdW5jdGlvbih0ZXh0LCBvcHRpb25zKSB7XG5cbiAgICB2YXIgc2V0dGluZyA9ICQuZXh0ZW5kKHt9LCBhcHAuZGVmYXVsdHMudG9hc3QsIG9wdGlvbnMpO1xuXG5cbiAgICAvLyBNYWtlIHN1cmUgLnRoZS10b2FzdCBleGlzdHNcbiAgICBpZiAoJCgnLnRvYXN0JykubGVuZ3RoIDwgMSkge1xuICAgICAgJCgnPGRpdiBjbGFzcz1cInRvYXN0XCI+PGRpdiBjbGFzcz1cInRleHRcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYWN0aW9uXCI+PC9kaXY+PC9kaXY+JykuYXBwZW5kVG8oJ2JvZHknKTtcbiAgICB9XG4gICAgdmFyICR0b2FzdCA9ICQoJy50b2FzdCcpO1xuXG4gICAgLy8gQWN0aW9uIEhUTUxcbiAgICB2YXIgYWN0aW9uID0gJyc7XG4gICAgaWYgKHNldHRpbmcuYWN0aW9uVGl0bGUgIT0gJycpIHtcbiAgICAgIGFjdGlvbiA9ICc8YSBjbGFzcz1cInRleHQtJysgc2V0dGluZy5hY3Rpb25Db2xvciArJ1wiIGhyZWY9XCInKyBzZXR0aW5nLmFjdGlvblVybCArJ1wiPicrIHNldHRpbmcuYWN0aW9uVGl0bGUgKyc8L2E+J1xuICAgIH1cblxuICAgIC8vIENsb3NlIHByZXZpb3VzIHRvYXN0IGlmIGl0IGlzIG9wZW5cbiAgICBpZiAoJHRvYXN0Lmhhc0NsYXNzKCdyZXZlYWwnKSkge1xuICAgICAgJHRvYXN0XG4gICAgICAgIC5maW5pc2goKVxuICAgICAgICAucXVldWUoZnVuY3Rpb24obmV4dCl7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygncmV2ZWFsJyk7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KVxuICAgICAgICAuZGVsYXkoMzAwKTtcbiAgICB9XG5cbiAgICAvLyBDb25maWd1cmUgdGhlIHRvYXN0IGFuZCBzaG93IGl0XG4gICAgJHRvYXN0XG4gICAgICAuZGVsYXkoMSlcbiAgICAgIC5xdWV1ZShmdW5jdGlvbihuZXh0KXtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcudGV4dCcpLnRleHQodGV4dCkubmV4dCgnLmFjdGlvbicpLmh0bWwoYWN0aW9uKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygncmV2ZWFsJyk7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pXG4gICAgICAuZGVsYXkoc2V0dGluZy5kdXJhdGlvbilcbiAgICAgIC5xdWV1ZShmdW5jdGlvbihuZXh0KXtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygncmV2ZWFsJyk7XG4gICAgICAgIG5leHQoKTtcbiAgICAgIH0pO1xuXG4gIH1cblxuXG4gIC8vIEVuYWJsZSBkYXRhIGF0dHJpYnV0ZSBvcHRpb25zXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1wcm92aWRlfj1cInRvYXN0XCJdJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgdGV4dCA9ICQodGhpcykuZGF0YSgndGV4dCcpO1xuICAgIGFwcC50b2FzdCh0ZXh0LCBhcHAuZ2V0RGF0YU9wdGlvbnMoJCh0aGlzKSkgKTtcbiAgfSk7XG5cblxuXG59KGpRdWVyeSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9iYWNrL2pzL3NyYy9wbHVnaW4vdG9hc3QuanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBDaGFydCBwbHVnaW5zXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vXG4rZnVuY3Rpb24oJCl7XG5cblxuICBwcm92aWRlci5pbml0Q2hhcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBwcm92aWRlci5pbml0UGVpdHkoKTtcbiAgICBwcm92aWRlci5pbml0U3BhcmtsaW5lKCk7XG4gICAgcHJvdmlkZXIuaW5pdEVhc3lQaWVDaGFydCgpO1xuICAgIHByb3ZpZGVyLmluaXRDaGFydGpzKCk7XG5cbiAgfTtcblxuXG5cblxuICAvLyBQZWl0eVxuICAvL1xuICBwcm92aWRlci5pbml0UGVpdHkgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi5wZWl0eSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm92aWRlci5wcm92aWRlKCdwZWl0eScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdHlwZSA9ICQodGhpcykuZGF0YUF0dHIoJ3R5cGUnLCAnJyk7XG5cbiAgICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ3BpZSc6XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogMzgsXG4gICAgICAgICAgICBoZWlnaHQ6IDM4LFxuICAgICAgICAgICAgcmFkaXVzOiA4LFxuICAgICAgICAgICAgZmlsbDogYXBwLmNvbG9ycy5wcmltYXJ5ICsnLCcrIGFwcC5jb2xvcnMuYmcsXG4gICAgICAgICAgfVxuICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25zLCBhcHAuZ2V0RGF0YU9wdGlvbnMoICQodGhpcykgKSk7XG5cbiAgICAgICAgICBpZiAoIG9wdGlvbnMuc2l6ZSApIHtcbiAgICAgICAgICAgIG9wdGlvbnMud2lkdGggPSBvcHRpb25zLmhlaWdodCA9IG9wdGlvbnMuc2l6ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcHRpb25zLmZpbGwgPSBvcHRpb25zLmZpbGwuc3BsaXQoJywnKTtcblxuICAgICAgICAgICQodGhpcykucGVpdHkoXCJwaWVcIiwgb3B0aW9ucyk7XG4gICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICBjYXNlICdkb251dCc6XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogMzgsXG4gICAgICAgICAgICBoZWlnaHQ6IDM4LFxuICAgICAgICAgICAgcmFkaXVzOiA4LFxuICAgICAgICAgICAgZmlsbDogYXBwLmNvbG9ycy5wcmltYXJ5ICsnLCcrIGFwcC5jb2xvcnMuYmcsXG4gICAgICAgICAgfVxuICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25zLCBhcHAuZ2V0RGF0YU9wdGlvbnMoICQodGhpcykgKSk7XG5cbiAgICAgICAgICBpZiAoIG9wdGlvbnMuc2l6ZSApIHtcbiAgICAgICAgICAgIG9wdGlvbnMud2lkdGggPSBvcHRpb25zLmhlaWdodCA9IG9wdGlvbnMuc2l6ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcHRpb25zLmZpbGwgPSBvcHRpb25zLmZpbGwuc3BsaXQoJywnKTtcblxuICAgICAgICAgICQodGhpcykucGVpdHkoXCJkb251dFwiLCBvcHRpb25zKTtcbiAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgaGVpZ2h0OiAzOCxcbiAgICAgICAgICAgIHdpZHRoOiAxMjAsXG4gICAgICAgICAgICBkZWxpbWl0ZXI6ICcsJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogbnVsbCxcbiAgICAgICAgICAgIGZpbGw6IGFwcC5jb2xvcnMuYmcsXG4gICAgICAgICAgICBzdHJva2U6IGFwcC5jb2xvcnMucHJpbWFyeSxcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICAgIH1cbiAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQob3B0aW9ucywgYXBwLmdldERhdGFPcHRpb25zKCAkKHRoaXMpICkpO1xuXG4gICAgICAgICAgJCh0aGlzKS5wZWl0eShcImxpbmVcIiwgb3B0aW9ucyk7XG4gICAgICAgICAgYnJlYWs7XG5cblxuICAgICAgICBjYXNlICdiYXInOlxuICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgaGVpZ2h0OiAzOCxcbiAgICAgICAgICAgIHdpZHRoOiAxMjAsXG4gICAgICAgICAgICBkZWxpbWl0ZXI6ICcsJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogbnVsbCxcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuMixcbiAgICAgICAgICAgIGZpbGw6IGFwcC5jb2xvcnMucHJpbWFyeSxcbiAgICAgICAgICB9XG4gICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKTtcblxuICAgICAgICAgIG9wdGlvbnMuZmlsbCA9IG9wdGlvbnMuZmlsbC5zcGxpdCgnLCcpO1xuXG4gICAgICAgICAgJCh0aGlzKS5wZWl0eShcImJhclwiLCBvcHRpb25zKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuXG4gICAgfSk7XG5cbiAgfTtcblxuXG5cblxuICAvLyBFYXN5IHBpZSBjaGFydFxuICAvL1xuICBwcm92aWRlci5pbml0RWFzeVBpZUNoYXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhJC5mbi5lYXN5UGllQ2hhcnQgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICBwcm92aWRlci5wcm92aWRlKCdlYXN5cGllJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBiYXJDb2xvcjogYXBwLmNvbG9ycy5wcmltYXJ5LFxuICAgICAgICB0cmFja0NvbG9yOiBhcHAuY29sb3JzLmJnLFxuICAgICAgfTtcbiAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZChvcHRpb25zLCBhcHAuZ2V0RGF0YU9wdGlvbnMoICQodGhpcykgKSk7XG5cbiAgICAgIGlmICggb3B0aW9ucy5jb2xvciApIHtcbiAgICAgICAgb3B0aW9ucy5iYXJDb2xvciA9IG9wdGlvbnMuY29sb3I7XG4gICAgICAgIG9wdGlvbnMudHJhY2tDb2xvciA9IGFwcC5jb2xvcnMuYmc7XG4gICAgICB9XG5cbiAgICAgICQodGhpcykuZWFzeVBpZUNoYXJ0KG9wdGlvbnMpO1xuICAgIH0pO1xuXG4gIH07XG5cblxuXG5cblxuICAvLyBTcGFya2xpbmVcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdFNwYXJrbGluZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggISQuZm4uc3BhcmtsaW5lICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgdmFyIGRlZkNvbG9yID0gJ3JnYmEoNTEsMjAyLDE4NSwwLjUpJyxcbiAgICAgICAgc3BvdENvbG9yID0gYXBwLmNvbG9ycy5wcmltYXJ5LFxuICAgICAgICBzcG90SGlnaGxpZ2h0Q29sb3IgPSBhcHAuY29sb3JzLmRhbmdlcixcbiAgICAgICAgbmVnQ29sb3IgPSBhcHAuY29sb3JzLmRhbmdlcjtcblxuICAgICQuZXh0ZW5kKCQuZm4uc3BhcmtsaW5lLmRlZmF1bHRzLmNvbW1vbiwge1xuICAgICAgZW5hYmxlVGFnT3B0aW9uczogdHJ1ZSxcbiAgICAgIHRhZ09wdGlvbnNQcmVmaXg6ICdkYXRhLScsXG4gICAgICB0YWdWYWx1ZXNBdHRyaWJ1dGU6ICdkYXRhLXZhbHVlcycsXG4gICAgICBsaW5lQ29sb3I6IGRlZkNvbG9yLFxuICAgICAgZmlsbENvbG9yOiBkZWZDb2xvcixcbiAgICB9KTtcblxuXG4gICAgJC5leHRlbmQoJC5mbi5zcGFya2xpbmUuZGVmYXVsdHMubGluZSwge1xuICAgICAgc3BvdENvbG9yOiBzcG90Q29sb3IsXG4gICAgICBtaW5TcG90Q29sb3I6IHNwb3RDb2xvcixcbiAgICAgIG1heFNwb3RDb2xvcjogc3BvdENvbG9yLFxuICAgICAgaGlnaGxpZ2h0U3BvdENvbG9yOiBzcG90SGlnaGxpZ2h0Q29sb3IsXG4gICAgICBoaWdobGlnaHRMaW5lQ29sb3I6IG51bGwsXG4gICAgICBoZWlnaHQ6IDM4LFxuICAgIH0pO1xuXG5cbiAgICAkLmV4dGVuZCgkLmZuLnNwYXJrbGluZS5kZWZhdWx0cy5iYXIsIHtcbiAgICAgIGJhcldpZHRoOiA3LFxuICAgICAgYmFyU3BhY2luZzogNCxcbiAgICAgIGJhckNvbG9yOiBkZWZDb2xvcixcbiAgICAgIG5lZ0JhckNvbG9yOiBuZWdDb2xvcixcbiAgICAgIHplcm9Db2xvcjogZGVmQ29sb3IsXG4gICAgICBzdGFja2VkQmFyQ29sb3I6IFtkZWZDb2xvciwgbmVnQ29sb3JdLFxuICAgICAgaGVpZ2h0OiAzOCxcbiAgICB9KTtcblxuXG4gICAgJC5leHRlbmQoJC5mbi5zcGFya2xpbmUuZGVmYXVsdHMudHJpc3RhdGUsIHtcbiAgICAgIGJhcldpZHRoOiA3LFxuICAgICAgYmFyU3BhY2luZzogNCxcbiAgICAgIHBvc0JhckNvbG9yOiBkZWZDb2xvcixcbiAgICAgIG5lZ0JhckNvbG9yOiBuZWdDb2xvcixcbiAgICAgIHplcm9CYXJDb2xvcjogJyNlM2U0ZTUnLFxuICAgICAgaGVpZ2h0OiAzOCxcbiAgICB9KTtcblxuXG4gICAgJC5leHRlbmQoJC5mbi5zcGFya2xpbmUuZGVmYXVsdHMuZGlzY3JldGUsIHtcbiAgICAgIHRocmVzaG9sZENvbG9yOiBuZWdDb2xvcixcbiAgICAgIGhlaWdodDogMzgsXG4gICAgfSk7XG5cblxuICAgICQuZXh0ZW5kKCQuZm4uc3BhcmtsaW5lLmRlZmF1bHRzLnBpZSwge1xuICAgICAgc2xpY2VDb2xvcnM6IFtkZWZDb2xvciwgbmVnQ29sb3JdLFxuICAgICAgd2lkdGg6IDM4LFxuICAgICAgaGVpZ2h0OiAzOCxcbiAgICB9KTtcblxuXG4gICAgJC5leHRlbmQoJC5mbi5zcGFya2xpbmUuZGVmYXVsdHMuYm94LCB7XG4gICAgICBib3hMaW5lQ29sb3I6ICcjZTNlNGU1JyxcbiAgICAgIGJveEZpbGxDb2xvcjogJyNmM2Y1ZjYnLFxuICAgICAgd2hpc2tlckNvbG9yOiBhcHAuY29sb3JzLnByaW1hcnksXG4gICAgICBvdXRsaWVyTGluZUNvbG9yOiBkZWZDb2xvcixcbiAgICAgIG91dGxpZXJGaWxsQ29sb3I6IGRlZkNvbG9yLFxuICAgICAgbWVkaWFuQ29sb3I6IG5lZ0NvbG9yLFxuICAgICAgdGFyZ2V0Q29sb3I6IGRlZkNvbG9yLFxuICAgIH0pO1xuXG5cbiAgICAkLmV4dGVuZCgkLmZuLnNwYXJrbGluZS5kZWZhdWx0cy5idWxsZXQsIHtcbiAgICAgIHRhcmdldFdpZHRoOiAyLFxuICAgICAgdGFyZ2V0Q29sb3I6IG5lZ0NvbG9yLFxuICAgICAgcGVyZm9ybWFuY2VDb2xvcjogZGVmQ29sb3IsXG4gICAgICByYW5nZUNvbG9yczogWycjZjNmNWY2JywgJyNlYmVjZWQnLCAnI2UzZTRlNSddLFxuICAgIH0pO1xuXG5cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ3NwYXJrbGluZScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgb3B0aW9ucyA9IHt9XG4gICAgICBvcHRpb25zID0gJC5leHRlbmQob3B0aW9ucywgYXBwLmdldERhdGFPcHRpb25zKCAkKHRoaXMpICkpO1xuXG4gICAgICAkKHRoaXMpLnNwYXJrbGluZSgnaHRtbCcsIG9wdGlvbnMpO1xuICAgIH0pO1xuXG5cbiAgfTtcblxuXG5cbiAgLy8gQ2hhcnQuanNcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdENoYXJ0anMgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICF3aW5kb3dbJ0NoYXJ0J10gIT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgLy8gR2xvYmFsc1xuICAgIC8vXG4gICAgJC5leHRlbmQoQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLCB7XG4gICAgICBkZWZhdWx0Rm9udENvbG9yOiBhcHAuY29sb3JzLnRleHQsXG4gICAgICBkZWZhdWx0Rm9udFNpemU6IDEzLFxuICAgICAgZGVmYXVsdENvbG9yOiAncmdiYSgwLDAsMCwwLjA1KScsXG4gICAgfSk7XG5cblxuICAgIC8vIEdsb2JhbHNcbiAgICAvL1xuICAgICQuZXh0ZW5kKENoYXJ0LmRlZmF1bHRzLnNjYWxlLmdyaWRMaW5lcywge1xuICAgICAgY29sb3I6ICdyZ2JhKDAsMCwwLDAuMDUpJyxcbiAgICAgIHplcm9MaW5lQ29sb3I6ICdyZ2JhKDAsMCwwLDAuMTUpJyxcbiAgICB9KTtcblxuXG5cbiAgICAvLyBMZWdlbmQgbGFiZWxzXG4gICAgLy9cbiAgICAkLmV4dGVuZChDaGFydC5kZWZhdWx0cy5nbG9iYWwubGVnZW5kLmxhYmVscywge1xuICAgICAgYm94V2lkdGg6IDI0LFxuICAgICAgcGFkZGluZzogMTYsXG4gICAgfSk7XG5cblxuICAgIC8vIFRvb2x0aXBcbiAgICAvL1xuICAgICQuZXh0ZW5kKENoYXJ0LmRlZmF1bHRzLmdsb2JhbC50b29sdGlwcywge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwLjcpJyxcbiAgICAgIGJvZHlTcGFjaW5nOiA2LFxuICAgICAgdGl0bGVNYXJnaW5Cb3R0b206IDgsXG5cbiAgICAgIHhQYWRkaW5nOiAxMixcbiAgICAgIHlQYWRkaW5nOiAxMixcbiAgICAgIGNhcmV0U2l6ZTogOCxcbiAgICAgIGNvcm5lclJhZGl1czogMixcbiAgICB9KTtcblxuXG4gICAgLy8gQXJjXG4gICAgLy9cbiAgICAkLmV4dGVuZChDaGFydC5kZWZhdWx0cy5nbG9iYWwuZWxlbWVudHMuYXJjLCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDUxLDIwMiwxODUsMC41KScsXG4gICAgfSk7XG5cblxuICAgIC8vIExpbmVcbiAgICAvL1xuICAgICQuZXh0ZW5kKENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5saW5lLCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDUxLDIwMiwxODUsMC41KScsXG4gICAgICBib3JkZXJDb2xvcjogJ3JnYmEoNTEsMjAyLDE4NSwwLjUpJyxcbiAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgIH0pO1xuXG5cbiAgICAvLyBQb2ludFxuICAgIC8vXG4gICAgJC5leHRlbmQoQ2hhcnQuZGVmYXVsdHMuZ2xvYmFsLmVsZW1lbnRzLnBvaW50LCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDUxLDIwMiwxODUsMC41KScsXG4gICAgICBib3JkZXJDb2xvcjogJyNmZmYnLFxuICAgIH0pO1xuXG5cbiAgICAvLyBSZWN0YW5nbGVcbiAgICAvL1xuICAgICQuZXh0ZW5kKENoYXJ0LmRlZmF1bHRzLmdsb2JhbC5lbGVtZW50cy5yZWN0YW5nbGUsIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoNTEsMjAyLDE4NSwwLjUpJyxcbiAgICAgIGJvcmRlckNvbG9yOiAnI2ZmZicsXG4gICAgfSk7XG5cblxuICB9O1xuXG5cblxuICAvLyBNb3JyaXNcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdE1vcnJpcyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggIXdpbmRvd1snTW9ycmlzJ10gIT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICB9O1xuXG5cblxuXG59KGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvY2hhcnQuanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBDb2RlIHBsdWdpbnNcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkKXtcblxuXG4gIHByb3ZpZGVyLmluaXRDb2RlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcHJvdmlkZXIuaW5pdFByaXNtKCk7XG4gICAgcHJvdmlkZXIuaW5pdENsaXBib2FyZCgpO1xuXG4gIH07XG5cblxuXG4gIHByb3ZpZGVyLmluaXRQcmlzbSA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgICAkKCdwcmU6bm90KC5uby1jb3B5KSA+IGNvZGVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcykuYmVmb3JlKCc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tYm9sZCBidG4tc2Vjb25kYXJ5IGNsaXBib2FyZC1jb3B5XCI+Q29weTwvYnV0dG9uPicpO1xuICAgIH0pO1xuXG4gICAgLy8gTW92ZSBjb3B5IGJ1dHRvbiB3aGVuIHRoZSBjb250ZW50IGlzIHNjcm9sbGluZ1xuICAgICQoJy5jbGlwYm9hcmQtY29weScpLnBhcmVudCgpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5maW5kKCcuY2xpcGJvYXJkLWNvcHknKS5jc3MoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJysgJCh0aGlzKS5zY3JvbGxMZWZ0KCkgKydweCwgJysgJCh0aGlzKS5zY3JvbGxUb3AoKSArJ3B4KScpO1xuICAgIH0pO1xuXG4gICAgaWYgKCQoJy5jbGlwYm9hcmQtY29weScpLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBjbGlwYm9hcmRTbmlwcGV0cyA9IG5ldyBDbGlwYm9hcmQoJy5jbGlwYm9hcmQtY29weScsIHtcbiAgICAgICAgdGFyZ2V0OiBmdW5jdGlvbih0cmlnZ2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyaWdnZXIubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY2xpcGJvYXJkU25pcHBldHMub24oJ3N1Y2Nlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgYXBwLnRvYXN0KCdDb3BpZWQuJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cblxuXG5cblxuICBwcm92aWRlci5pbml0Q2xpcGJvYXJkID0gZnVuY3Rpb24oKSB7XG4gICAgbmV3IENsaXBib2FyZCgnW2RhdGEtY2xpcGJvYXJkLXRleHRdJyk7XG5cbiAgfTtcblxuXG5cblxufShqUXVlcnkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc3JjL3Byb3ZpZGVyL2NvZGUuanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBFZGl0b3IgcGx1Z2luc1xuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQpe1xuXG5cbiAgcHJvdmlkZXIuaW5pdEVkaXRvcnMgPSBmdW5jdGlvbigpIHtcblxuICAgIHByb3ZpZGVyLmluaXRTdW1tZXJub3RlKCk7XG5cbiAgfTtcblxuXG5cblxuXG4gIHByb3ZpZGVyLmluaXRTdW1tZXJub3RlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhICQuZm4uc3VtbWVybm90ZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ3N1bW1lcm5vdGUnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGRpYWxvZ3NJbkJvZHk6IHRydWUsXG4gICAgICAgIGRpYWxvZ3NGYWRlOiB0cnVlXG4gICAgICB9O1xuICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKTtcblxuICAgICAgaWYgKCBvcHRpb25zLnRvb2xiYXIgKSB7XG4gICAgICAgIHN3aXRjaCggb3B0aW9ucy50b29sYmFyLnRvTG93ZXJDYXNlKCkgKSB7XG4gICAgICAgICAgY2FzZSAnc2xpbSc6XG4gICAgICAgICAgICBvcHRpb25zLnRvb2xiYXIgPSBbXG4gICAgICAgICAgICAgIC8vIFtncm91cE5hbWUsIFtsaXN0IG9mIGJ1dHRvbl1dXG4gICAgICAgICAgICAgIFsnc3R5bGUnLCBbJ2JvbGQnLCAndW5kZXJsaW5lJywgJ2NsZWFyJ11dLFxuICAgICAgICAgICAgICBbJ2NvbG9yJywgWydjb2xvciddXSxcbiAgICAgICAgICAgICAgWydwYXJhJywgWyd1bCcsICdvbCddXSxcbiAgICAgICAgICAgICAgWydpbnNlcnQnLCBbJ2xpbmsnLCAncGljdHVyZSddXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnZnVsbCc6XG4gICAgICAgICAgICBvcHRpb25zLnRvb2xiYXIgPSBbXG4gICAgICAgICAgICAgIC8vIFtncm91cE5hbWUsIFtsaXN0IG9mIGJ1dHRvbl1dXG4gICAgICAgICAgICAgIFsncGFyYV9zdHlsZScsIFsnc3R5bGUnXV0sXG4gICAgICAgICAgICAgIFsnc3R5bGUnLCBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdjbGVhciddXSxcbiAgICAgICAgICAgICAgWydmb250JywgWydzdHJpa2V0aHJvdWdoJywgJ3N1cGVyc2NyaXB0JywgJ3N1YnNjcmlwdCddXSxcbiAgICAgICAgICAgICAgWydmb250c2l6ZScsIFsnZm9udG5hbWUnLCAnZm9udHNpemUnLCAnaGVpZ2h0J11dLFxuICAgICAgICAgICAgICBbJ2NvbG9yJywgWydjb2xvciddXSxcbiAgICAgICAgICAgICAgWydwYXJhJywgWyd1bCcsICdvbCcsICdwYXJhZ3JhcGgnLCAnaHInXV0sXG4gICAgICAgICAgICAgIFsndGFibGUnLCBbJ3RhYmxlJ11dLFxuICAgICAgICAgICAgICBbJ2luc2VydCcsIFsnbGluaycsICdwaWN0dXJlJywgJ3ZpZGVvJ11dLFxuICAgICAgICAgICAgICBbJ2RvJywgWyd1bmRvJywgJ3JlZG8nXV0sXG4gICAgICAgICAgICAgIFsnbWlzYycsIFsnZnVsbHNjcmVlbicsICdjb2RldmlldycsICdoZWxwJ11dXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJCh0aGlzKS5zdW1tZXJub3RlKG9wdGlvbnMpO1xuICAgIH0pO1xuXG5cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1zdW1tZXJub3RlLWVkaXRdJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3N1bW1lcm5vdGUtZWRpdCcpO1xuICAgICAgJCh0YXJnZXQpLnN1bW1lcm5vdGUoe2ZvY3VzOiB0cnVlfSk7XG4gICAgfSk7XG5cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1zdW1tZXJub3RlLXNhdmVdJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmRhdGEoJ3N1bW1lcm5vdGUtc2F2ZScpO1xuICAgICAgdmFyIGNhbGxiYWNrID0gJCh0aGlzKS5kYXRhKCdjYWxsYmFjaycpO1xuICAgICAgdmFyIG1hcmt1cCA9ICQodGFyZ2V0KS5zdW1tZXJub3RlKCdjb2RlJyk7XG4gICAgICAkKHRhcmdldCkuc3VtbWVybm90ZSgnZGVzdHJveScpO1xuICAgICAgYXBwLmNhbGwoY2FsbGJhY2ssIG1hcmt1cCk7XG4gICAgfSk7XG5cbiAgfTtcblxuXG5cblxuXG5cbiAgcHJvdmlkZXIuaW5pdFF1aWxsID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCB3aW5kb3dbJ1F1aWxsJ10gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ3F1aWxsJywgZnVuY3Rpb24oKXtcblxuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHRoZW1lOiAnc25vdydcbiAgICAgIH07XG5cbiAgICAgIHZhciB0b29sYmFyRnVsbE9wdGlvbnMgPSBbXG4gICAgICAgIFtcbiAgICAgICAgICB7ICdmb250JzogW10gfSxcbiAgICAgICAgICB7ICdoZWFkZXInOiBbMSwgMiwgMywgNCwgNSwgNiwgZmFsc2VdIH0sXG4gICAgICAgICAgeyAnc2l6ZSc6IFsnc21hbGwnLCBmYWxzZSwgJ2xhcmdlJywgJ2h1Z2UnXSB9XG4gICAgICAgIF0sXG4gICAgICAgIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLCAgICAgICAgLy8gdG9nZ2xlZCBidXR0b25zXG4gICAgICAgIFt7ICdjb2xvcic6IFtdIH0sIHsgJ2JhY2tncm91bmQnOiBbXSB9XSwgICAgICAgICAgLy8gZHJvcGRvd24gd2l0aCBkZWZhdWx0cyBmcm9tIHRoZW1lXG4gICAgICAgIFt7ICdzY3JpcHQnOiAnc3ViJ30sIHsgJ3NjcmlwdCc6ICdzdXBlcicgfV0sXG4gICAgICAgIFt7ICdoZWFkZXInOiAxIH0sIHsgJ2hlYWRlcic6IDIgfSwgJ2Jsb2NrcXVvdGUnLCAnY29kZS1ibG9jayddLFxuICAgICAgICBbeyAnbGlzdCc6ICdvcmRlcmVkJ30sIHsgJ2xpc3QnOiAnYnVsbGV0JyB9LCB7ICdpbmRlbnQnOiAnLTEnfSwgeyAnaW5kZW50JzogJysxJyB9XSxcbiAgICAgICAgW3sgJ2RpcmVjdGlvbic6ICdydGwnIH0sIHsgJ2FsaWduJzogW10gfV0sICAgICAgICAvLyB0ZXh0IGRpcmVjdGlvblxuICAgICAgICBbJ2xpbmsnLCAnaW1hZ2UnLCAndmlkZW8nXSxcbiAgICAgICAgWydjbGVhbiddICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZm9ybWF0dGluZyBidXR0b25cbiAgICAgIF07XG5cbiAgICAgICQuZXh0ZW5kKG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKTtcblxuICAgICAgaWYgKCBvcHRpb25zLnRvb2xiYXIgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgdmFyIHRvb2xiYXIgPSBvcHRpb25zLnRvb2xiYXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCB0b29sYmFyID09ICdmdWxsJyApIHtcblxuICAgICAgICAgIC8vIFRPRE86XG4gICAgICAgICAgLy8gTG9hZCBoaWdobGlnaHQganNcbiAgICAgICAgICAvKlxuICAgICAgICAgICRMQUIuc2NyaXB0KCdoaWdobGlnaHQvaGlnaGxpZ2h0LnBhY2suanMnKTtcbiAgICAgICAgICBpZiAoIG9wdGlvbnMuY29kZVN0eWxlID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICBhcHAubG9hZFN0eWxlKCdoaWdobGlnaHQvc3R5bGVzL21vbm9rYWktc3VibGltZS5jc3MnLCBhcHAuZGlyLnZlbmRvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXBwLmxvYWRTdHlsZSgnaGlnaGxpZ2h0L3N0eWxlcy8nKyBvcHRpb25zLmNvZGVTdHlsZSArJy5jc3MnLCBhcHAuZGlyLnZlbmRvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgICovXG5cbiAgICAgICAgICBvcHRpb25zLm1vZHVsZXMgPSB7XG4gICAgICAgICAgICAvL3N5bnRheDogJ3RydWUnLFxuICAgICAgICAgICAgdG9vbGJhcjogdG9vbGJhckZ1bGxPcHRpb25zXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuZXcgUXVpbGwoICQodGhpcylbMF0sIG9wdGlvbnMpO1xuXG4gICAgfSk7XG5cblxuICB9O1xuXG59KGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvZWRpdG9yLmpzIiwiXG5cbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy8gRW1vamkgcGx1Z2luc1xuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQpe1xuXG5cbiAgcHJvdmlkZXIuaW5pdEVtb2ppZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHByb3ZpZGVyLmluaXRFbW9qaW9uZSgpO1xuXG4gIH07XG5cblxuICBwcm92aWRlci5pbml0RW1vamlvbmUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIHdpbmRvd1tcImVtb2ppb25lXCJdID09PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZW1vamlvbmUuaW1hZ2VUeXBlID0gJ3N2Zyc7XG4gICAgZW1vamlvbmUuc3ByaXRlcyA9IHRydWU7XG4gICAgZW1vamlvbmUuYXNjaWkgPSB0cnVlO1xuICAgIGVtb2ppb25lLmltYWdlUGF0aFNWR1Nwcml0ZXMgPSBhcHAuZGlyLnZlbmRvciArJy9lbW9qaW9uZS9lbW9qaW9uZS5zdmcnO1xuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgnZW1vamknLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIG9yaWdpbmFsID0gJCh0aGlzKS5odG1sKCk7XG4gICAgICAvLyB1c2UgLnNob3J0bmFtZVRvSW1hZ2UgaWYgb25seSBjb252ZXJ0aW5nIHNob3J0bmFtZXMgKGZvciBzbGlnaHRseSBiZXR0ZXIgcGVyZm9ybWFuY2UpXG4gICAgICB2YXIgY29udmVydGVkID0gZW1vamlvbmUudG9JbWFnZShvcmlnaW5hbCk7XG4gICAgICAkKHRoaXMpLmh0bWwoY29udmVydGVkKTtcbiAgICB9KTtcblxuICB9O1xuXG5cbn0oalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci9lbW9qaS5qcyIsIlxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vIEZvcm0gcGx1Z2luc1xuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQpe1xuXG5cbiAgcHJvdmlkZXIuaW5pdEZvcm1zID0gZnVuY3Rpb24oKSB7XG5cbiAgICBwcm92aWRlci5pbml0U2VsZWN0cGlja2VyKCk7XG4gICAgcHJvdmlkZXIuaW5pdERhdGVwaWNrZXIoKTtcbiAgICBwcm92aWRlci5pbml0TWluaWNvbG9yKCk7XG4gICAgcHJvdmlkZXIuaW5pdENsb2NrcGlja2VyKCk7XG4gICAgcHJvdmlkZXIuaW5pdE1heGxlbmd0aCgpO1xuICAgIHByb3ZpZGVyLmluaXRTdHJlbmd0aCgpO1xuICAgIHByb3ZpZGVyLmluaXRUYWdzaW5wdXQoKTtcbiAgICBwcm92aWRlci5pbml0S25vYigpO1xuICAgIHByb3ZpZGVyLmluaXROb3Vpc2xpZGVyKCk7XG4gICAgcHJvdmlkZXIuaW5pdFN3aXRjaGVyeSgpO1xuICAgIHByb3ZpZGVyLmluaXRGb3JtYXR0ZXIoKTtcbiAgICBwcm92aWRlci5pbml0VmFsaWRhdGlvbigpO1xuICAgIHByb3ZpZGVyLmluaXRXaXphcmQoKTtcblxuICB9O1xuXG5cblxuICAvLyBTZWxlY3RwaWNrZXJcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdFNlbGVjdHBpY2tlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKCAhICQuZm4uc2VsZWN0cGlja2VyICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ3NlbGVjdHBpY2tlcicsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnNlbGVjdHBpY2tlcih7XG4gICAgICAgIGljb25CYXNlOiAnJyxcbiAgICAgICAgdGlja0ljb246ICd0aS1jaGVjaycsXG4gICAgICAgIHN0eWxlOiAnYnRuLWxpZ2h0J1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfTtcblxuXG5cblxuICAvLyBEYXRlcGlja2VyXG4gIC8vXG4gIHByb3ZpZGVyLmluaXREYXRlcGlja2VyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhICQuZm4uZGF0ZXBpY2tlciApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkLmZuLmRhdGVwaWNrZXIuZGVmYXVsdHMubXVsdGlkYXRlU2VwYXJhdG9yID0gXCIsIFwiO1xuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgnZGF0ZXBpY2tlcicsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoICQodGhpcykucHJvcChcInRhZ05hbWVcIikgPT0gJ0lOUFVUJyApIHtcbiAgICAgICAgJCh0aGlzKS5kYXRlcGlja2VyKCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0aGlzKS5kYXRlcGlja2VyKHtcbiAgICAgICAgICBpbnB1dHM6IFskKHRoaXMpLmZpbmQoJ2lucHV0OmZpcnN0JyksICQodGhpcykuZmluZCgnaW5wdXQ6bGFzdCcpXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuXG5cblxuICAvLyBNaW5pY29sb3JcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdE1pbmljb2xvciA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggISAkLmZuLm1pbmljb2xvcnMgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgnY29sb3JwaWNrZXInLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsdWUsIG9wYWNpdHkpIHtcbiAgICAgICAgICBpZiggIXZhbHVlICkgcmV0dXJuO1xuICAgICAgICAgIGlmKCBvcGFjaXR5ICkgdmFsdWUgKz0gJywgJyArIG9wYWNpdHk7XG4gICAgICAgIH0sXG4gICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwJ1xuICAgICAgfTtcblxuXG4gICAgICBvcHRpb25zID0gJC5leHRlbmQoIG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKTtcblxuICAgICAgaWYgKCAncmdiYScgPT09IG9wdGlvbnMuZm9ybWF0ICkge1xuICAgICAgICBvcHRpb25zLmZvcm1hdCA9ICdyZ2InO1xuICAgICAgICBvcHRpb25zLm9wYWNpdHkgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoICQodGhpcykuYXR0cignZGF0YS1zd2F0Y2hlcycpICkge1xuICAgICAgICBvcHRpb25zLnN3YXRjaGVzID0gJCh0aGlzKS5hdHRyKCdkYXRhLXN3YXRjaGVzJykuc3BsaXQoJ3wnKTtcbiAgICAgIH1cblxuXG4gICAgICAkKHRoaXMpLm1pbmljb2xvcnMoIG9wdGlvbnMgKTtcbiAgICB9KTtcblxuXG4gIH1cblxuXG5cblxuICAvLyBDbG9ja3BpY2tlclxuICAvL1xuICBwcm92aWRlci5pbml0Q2xvY2twaWNrZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi5jbG9ja3BpY2tlciApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm92aWRlci5wcm92aWRlKCdjbG9ja3BpY2tlcicsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLmNsb2NrcGlja2VyKHtcbiAgICAgICAgZG9uZXRleHQ6ICdEb25lJ1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfVxuXG5cblxuXG4gIC8vIE1heCBsZW5ndGggY29udHJvbFxuICAvL1xuICBwcm92aWRlci5pbml0TWF4bGVuZ3RoID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhICQuZm4ubWF4bGVuZ3RoICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ21heGxlbmd0aCcsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgd2FybmluZ0NsYXNzOiAnYmFkZ2UgYmFkZ2Utd2FybmluZycsXG4gICAgICAgIGxpbWl0UmVhY2hlZENsYXNzOiAnYmFkZ2UgYmFkZ2UtZGFuZ2VyJyxcbiAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tLXJpZ2h0LWluc2lkZScsXG4gICAgICB9O1xuXG4gICAgICBvcHRpb25zID0gJC5leHRlbmQoIG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKTtcbiAgICAgICQodGhpcykubWF4bGVuZ3RoKG9wdGlvbnMpO1xuICAgIH0pO1xuXG4gIH1cblxuXG5cblxuICAvLyBQYXNzd29yZCBzdHJlbmd0aFxuICAvL1xuICBwcm92aWRlci5pbml0UHdTdHJlbmd0aCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggISAkLmZuLnB3c3RyZW5ndGggKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgncHdzdHJlbmd0aCcsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgdWkgOiB7XG4gICAgICAgICAgYm9vdHN0cmFwNDogdHJ1ZSxcbiAgICAgICAgICBwcm9ncmVzc0JhckVtcHR5UGVyY2VudGFnZTogMCxcbiAgICAgICAgICBzaG93VmVyZGljdHM6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1vbiA6IHtcbiAgICAgICAgICB1c2VybmFtZUZpZWxkOiAkKHRoaXMpLmRhdGFBdHRyKCd1c2VybmFtZScsICcjdXNlcm5hbWUnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQodGhpcykucHdzdHJlbmd0aChvcHRpb25zKTtcbiAgICAgICQodGhpcykuYWRkKCAkKHRoaXMpLm5leHQoKSApLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJwd3N0cmVuZ3RoXCI+PC9kaXY+Jyk7XG5cbiAgICAgIC8vIFZlcnRpY2FsIHByb2dyZXNzXG4gICAgICBpZiAoICQodGhpcykuaXMoJ1tkYXRhLXZlcnRpY2FsPVwidHJ1ZVwiXScpICkge1xuICAgICAgICB2YXIgaGVpZ2h0ID0gJCh0aGlzKS5vdXRlckhlaWdodCgpIC0gMTAsXG4gICAgICAgICAgICByaWdodCAgPSAtaGVpZ2h0IC8gMiArIDcsXG4gICAgICAgICAgICBib3R0b20gPSBoZWlnaHQgLyAyICsgNDtcbiAgICAgICAgJCh0aGlzKS5uZXh0KCcucHJvZ3Jlc3MnKS5jc3Moe1xuICAgICAgICAgIHdpZHRoOiBoZWlnaHQsXG4gICAgICAgICAgcmlnaHQ6IHJpZ2h0LFxuICAgICAgICAgIGJvdHRvbTogYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuXG5cblxuICAvLyBUYWdzIGlucHV0XG4gIC8vXG4gIHByb3ZpZGVyLmluaXRUYWdzaW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi50YWdzaW5wdXQgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgndGFnc2lucHV0JywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykudGFnc2lucHV0KCk7XG4gICAgfSk7XG5cbiAgfVxuXG5cblxuXG4gIC8vIEtub2JcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdEtub2IgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi5rbm9iICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ2tub2InLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHRoaWNrbmVzczogLjEsXG4gICAgICAgIHdpZHRoOiAxMjAsXG4gICAgICAgIGhlaWdodDogMTIwLFxuICAgICAgICBmZ0NvbG9yOiBhcHAuY29sb3JzLnByaW1hcnksXG4gICAgICAgIGJnQ29sb3I6IGFwcC5jb2xvcnMuYmcsXG4gICAgICB9O1xuXG4gICAgICBvcHRpb25zID0gJC5leHRlbmQoIG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKTtcbiAgICAgICQodGhpcykua25vYiggb3B0aW9ucyApO1xuICAgIH0pO1xuXG4gIH1cblxuXG5cblxuICAvLyBOb1VpU2xpZGVyXG4gIC8vXG4gIHByb3ZpZGVyLmluaXROb3Vpc2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCB3aW5kb3dbJ25vVWlTbGlkZXInXSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ3NsaWRlcicsIGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KXtcbiAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICByYW5nZToge1xuICAgICAgICAgICdtaW4nICAgICA6IE51bWJlciggJCh0aGlzKS5kYXRhQXR0cignbWluJywgMCkgKSxcbiAgICAgICAgICAnbWF4JyAgICAgOiBOdW1iZXIoICQodGhpcykuZGF0YUF0dHIoJ21heCcsIDEwMCkgKVxuICAgICAgICB9LFxuICAgICAgICBzdGVwICAgICAgICA6IDEsXG4gICAgICAgIHN0YXJ0ICAgICAgIDogJCh0aGlzKS5kYXRhQXR0cigndmFsdWUnLCAwKSxcbiAgICAgICAgY29ubmVjdCAgICAgOiAnbG93ZXInLFxuICAgICAgICBtYXJnaW4gICAgICA6IDAsXG4gICAgICAgIGxpbWl0ICAgICAgIDogMTAwLFxuICAgICAgICBvcmllbnRhdGlvbiA6ICdob3Jpem9udGFsJyxcbiAgICAgICAgZGlyZWN0aW9uICAgOiAnbHRyJyxcbiAgICAgICAgdG9vbHRpcHMgICAgOiBmYWxzZSxcbiAgICAgICAgYW5pbWF0ZSAgICAgOiB0cnVlLFxuICAgICAgICBiZWhhdmlvdXIgICA6ICd0YXAnLFxuXG4gICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgIHRvOiBmdW5jdGlvbiAoIHZhbHVlICkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZnJvbTogZnVuY3Rpb24gKCB2YWx1ZSApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKCBvcHRpb25zLCBhcHAuZ2V0RGF0YU9wdGlvbnMoICQodGhpcykgKSk7XG5cbiAgICAgIHZhciB0YXJnZXQgICAgICA9ICQodGhpcykuZGF0YUF0dHIoJ3RhcmdldCcsICdub25lJyk7XG5cbiAgICAgIC8vIElmIGl0J3MgcmFuZ2Ugc2xpZGVyXG4gICAgICBpZiAoIHR5cGVvZiBvcHRpb25zLnN0YXJ0ID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLnN0YXJ0LmluZGV4T2YoJywnKSA+IC0xICkge1xuICAgICAgICBvcHRpb25zLnN0YXJ0ID0gb3B0aW9ucy5zdGFydC5zcGxpdChcIixcIik7XG5cblxuICAgICAgICBpZiAoICEkKHRoaXMpLmhhc0RhdGFBdHRyKCdjb25uZWN0JykgKSB7XG4gICAgICAgICAgb3B0aW9ucy5jb25uZWN0ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggISQodGhpcykuaGFzRGF0YUF0dHIoJ2JlaGF2aW91cicpICkge1xuICAgICAgICAgIG9wdGlvbnMuYmVoYXZpb3VyID0gJ3RhcC1kcmFnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLmxpbWl0OyAvLyBMaW1pdCBvcHRpb24gc2hvdWxkIGJlIGF2YWlsYWJsZSBmb3IgbGluZWFyIHNsaWRlcnNcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQncyB2ZXJ0aWNhbFxuICAgICAgaWYgKCBvcHRpb25zLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgKSB7XG4gICAgICAgIGlmICggISQodGhpcykuaGFzRGF0YUF0dHIoJ2RpcmVjdGlvbicpICkge1xuICAgICAgICAgIG9wdGlvbnMuZGlyZWN0aW9uID0gJ3J0bCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGFyZ2V0XG4gICAgICBpZiAoIHRhcmdldCAhPSAnbm9uZScgKSB7XG4gICAgICAgIGlmICggdGFyZ2V0ID09ICduZXh0JyApIHtcbiAgICAgICAgICB0YXJnZXQgPSAkKHRoaXMpLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggdGFyZ2V0ID09ICdwcmV2JyApIHtcbiAgICAgICAgICB0YXJnZXQgPSAkKHRoaXMpLnByZXYoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIC8vIENyZWF0ZSBpdFxuICAgICAgbm9VaVNsaWRlci5jcmVhdGUoZWxlbWVudCwgb3B0aW9ucyk7XG5cbiAgICAgIC8vIEV2ZW50IHVwZGF0ZVxuICAgICAgZWxlbWVudC5ub1VpU2xpZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xuICAgICAgICB2YXIgc3RyVmFsID0gdmFsdWVzLnRvU3RyaW5nKCk7XG4gICAgICAgICQodGFyZ2V0KS50ZXh0KHN0clZhbCkudmFsKHN0clZhbCk7XG5cbiAgICAgICAgaWYgKCAkKGVsZW1lbnQpLmhhc0RhdGFBdHRyKCdvbi11cGRhdGUnKSApIHtcbiAgICAgICAgICBhcHAuY2FsbCggJChlbGVtZW50KS5kYXRhKCdvbi11cGRhdGUnKSwgdmFsdWVzICk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICAgIC8vIEV2ZW50IGNoYW5nZVxuICAgICAgZWxlbWVudC5ub1VpU2xpZGVyLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbih2YWx1ZXMsIGhhbmRsZSkge1xuICAgICAgICBpZiAoICQoZWxlbWVudCkuaGFzRGF0YUF0dHIoJ29uLWNoYW5nZScpICkge1xuICAgICAgICAgIGFwcC5jYWxsKCAkKGVsZW1lbnQpLmRhdGEoJ29uLWNoYW5nZScpLCB2YWx1ZXMgKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICB9XG5cblxuXG5cbiAgLy8gU3dpdGNoZXJ5XG4gIC8vXG4gIHByb3ZpZGVyLmluaXRTd2l0Y2hlcnkgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIHdpbmRvd1snU3dpdGNoZXJ5J10gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm92aWRlci5wcm92aWRlKCdzd2l0Y2hlcnknLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGNvbG9yOiBhcHAuY29sb3JzLnByaW1hcnksXG4gICAgICAgIHNwZWVkOiAnMC41cydcbiAgICAgIH1cblxuICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKCBvcHRpb25zLCBhcHAuZ2V0RGF0YU9wdGlvbnMoICQodGhpcykgKSk7XG4gICAgICBuZXcgU3dpdGNoZXJ5KHRoaXMsIG9wdGlvbnMpO1xuICAgIH0pO1xuXG4gIH1cblxuXG5cblxuICAvLyBNYXNrIC8gRm9ybWF0dGVyXG4gIC8vXG4gIHByb3ZpZGVyLmluaXRGb3JtYXR0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi5mb3JtYXR0ZXIgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgnZm9ybWF0dGVyJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBwYXR0ZXJuOiAkKHRoaXMpLmRhdGEoJ2Zvcm1hdCcpLFxuICAgICAgICBwZXJzaXN0ZW50OiAkKHRoaXMpLmRhdGFBdHRyKCdwZXJzaXN0ZW50JywgdHJ1ZSksXG4gICAgICB9XG5cbiAgICAgICQodGhpcykuZm9ybWF0dGVyKCBvcHRpb25zICk7XG4gICAgfSk7XG5cbiAgfVxuXG5cblxuXG4gIC8vIFZhbGlkYXRvclxuICAvL1xuICBwcm92aWRlci5pbml0VmFsaWRhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggISAkLmZuLnZhbGlkYXRvciApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkLmZuLnZhbGlkYXRvci5Db25zdHJ1Y3Rvci5GT0NVU19PRkZTRVQgPSAxMDA7XG5cbiAgICBwcm92aWRlci5wcm92aWRlKCd2YWxpZGF0aW9uJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykudmFsaWRhdG9yKCk7XG4gICAgfSk7XG5cblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1wZXJmb3JtPVwidmFsaWRhdGlvblwiXScsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGFyZ2V0ID0gYXBwLmdldFRhcmdldCgkKHRoaXMpKTtcblxuICAgICAgaWYgKCB0YXJnZXQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICQodGhpcykucGFyZW50cygnW2RhdGEtcHJvdmlkZT1cInZhbGlkYXRpb25cIl0nKS52YWxpZGF0b3IoJ3ZhbGlkYXRlJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJCh0YXJnZXQpLnBhcmVudHMoJ1tkYXRhLXByb3ZpZGU9XCJ2YWxpZGF0aW9uXCJdJykudmFsaWRhdG9yKCd2YWxpZGF0ZScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuXG5cblxuICAvLyBXaXphcmRcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdFdpemFyZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggISAkLmZuLmJvb3RzdHJhcFdpemFyZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm92aWRlci5wcm92aWRlKCd3aXphcmQnLCBmdW5jdGlvbigpe1xuXG4gICAgICB2YXIgd2l6YXJkICAgPSAkKHRoaXMpO1xuICAgICAgdmFyIG5hdl9pdGVtID0gJCh0aGlzKS5maW5kKCcubmF2LWl0ZW0nKTtcbiAgICAgIHZhciB0YWJfcGFuZSA9ICQodGhpcykuZmluZCgnLnRhYi1wYW5lJyk7XG5cbiAgICAgIHdpemFyZC5ib290c3RyYXBXaXphcmQoe1xuICAgICAgICB0YWJDbGFzczogICAgICAgICAnbmF2LXByb2Nlc3MnLFxuICAgICAgICBuZXh0U2VsZWN0b3I6ICAgICAnW2RhdGEtd2l6YXJkPVwibmV4dFwiXScsXG4gICAgICAgIHByZXZpb3VzU2VsZWN0b3I6ICdbZGF0YS13aXphcmQ9XCJwcmV2XCJdJyxcbiAgICAgICAgZmlyc3RTZWxlY3RvcjogICAgJ1tkYXRhLXdpemFyZD1cImZpcnN0XCJdJyxcbiAgICAgICAgbGFzdFNlbGVjdG9yOiAgICAgJ1tkYXRhLXdpemFyZD1cImxhc3RcIl0nLFxuICAgICAgICBmaW5pc2hTZWxlY3RvcjogICAnW2RhdGEtd2l6YXJkPVwiZmluaXNoXCJdJyxcbiAgICAgICAgYmFja1NlbGVjdG9yOiAgICAgJ1tkYXRhLXdpemFyZD1cImJhY2tcIl0nLFxuXG4gICAgICAgIG9uVGFiQ2xpY2s6IGZ1bmN0aW9uKHRhYiwgbmF2aWdhdGlvbiwgaW5kZXgpIHtcbiAgICAgICAgICBpZiAoICF3aXphcmQuaXMoJ1tkYXRhLW5hdmlnYXRlYWJsZT1cInRydWVcIl0nKSApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cblxuICAgICAgICBvbk5leHQ6IGZ1bmN0aW9uKHRhYiwgbmF2aWdhdGlvbiwgaW5kZXgpIHtcblxuICAgICAgICAgIHZhciBjdXJyZW50X2luZGV4ID0gd2l6YXJkLmJvb3RzdHJhcFdpemFyZCgnY3VycmVudEluZGV4Jyk7XG4gICAgICAgICAgdmFyIGN1cnJfdGFiID0gdGFiX3BhbmUuZXEoY3VycmVudF9pbmRleCk7XG4gICAgICAgICAgdmFyIHRhYiA9IHRhYl9wYW5lLmVxKGluZGV4KTtcblxuICAgICAgICAgIC8vIFZhbGlkYXRvclxuICAgICAgICAgIHZhciB2YWxpZGF0b3Jfc2VsZWN0b3IgPSAnW2RhdGEtcHJvdmlkZT1cInZhbGlkYXRpb25cIl0nO1xuICAgICAgICAgIHZhciB2YWxpZGF0b3IgPSBjdXJyX3RhYi5maW5kKHZhbGlkYXRvcl9zZWxlY3RvcikuYWRkQmFjayh2YWxpZGF0b3Jfc2VsZWN0b3IpO1xuICAgICAgICAgIGlmICggdmFsaWRhdG9yLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci52YWxpZGF0b3IoJ3ZhbGlkYXRlJyk7XG4gICAgICAgICAgICBpZiAoIHZhbGlkYXRvci5maW5kKCcuaGFzLWVycm9yJykubGVuZ3RoICkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICAvLyBDYWxsYmFja1xuICAgICAgICAgIC8vXG4gICAgICAgICAgaWYgKCB3aXphcmQuaGFzRGF0YUF0dHIoJ29uLW5leHQnKSApIHtcbiAgICAgICAgICAgIGFwcC5jYWxsKCB3aXphcmQuZGF0YSgnb24tbmV4dCcpLCB0YWIsIG5hdmlnYXRpb24sIGluZGV4ICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG5cbiAgICAgICAgb25CYWNrOiBmdW5jdGlvbih0YWIsIG5hdmlnYXRpb24sIGluZGV4KSB7XG5cbiAgICAgICAgICAvLyBDYWxsYmFja1xuICAgICAgICAgIC8vXG4gICAgICAgICAgaWYgKCB3aXphcmQuaGFzRGF0YUF0dHIoJ29uLWJhY2snKSApIHtcbiAgICAgICAgICAgIGFwcC5jYWxsKCB3aXphcmQuZGF0YSgnb24tYmFjaycpLCB0YWIsIG5hdmlnYXRpb24sIGluZGV4ICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG5cbiAgICAgICAgb25QcmV2aW91czogZnVuY3Rpb24odGFiLCBuYXZpZ2F0aW9uLCBpbmRleCkge1xuXG4gICAgICAgICAgLy8gQ2FsbGJhY2tcbiAgICAgICAgICAvL1xuICAgICAgICAgIGlmICggd2l6YXJkLmhhc0RhdGFBdHRyKCdvbi1wcmV2aW91cycpICkge1xuICAgICAgICAgICAgYXBwLmNhbGwoIHdpemFyZC5kYXRhKCdvbi1wcmV2aW91cycpLCB0YWIsIG5hdmlnYXRpb24sIGluZGV4ICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG5cbiAgICAgICAgb25UYWJTaG93OiBmdW5jdGlvbih0YWIsIG5hdmlnYXRpb24sIGluZGV4KSB7XG5cbiAgICAgICAgICB2YXIgdGFiID0gdGFiX3BhbmUuZXEoaW5kZXgpO1xuICAgICAgICAgIHZhciBuYXYgPSBuYXZfaXRlbS5lcShpbmRleCk7XG4gICAgICAgICAgdmFyIG1heCA9IHdpemFyZC5ib290c3RyYXBXaXphcmQoJ25hdmlnYXRpb25MZW5ndGgnKTtcblxuICAgICAgICAgIC8vIEZpbmlzaCBidXR0b25cbiAgICAgICAgICBpZiAoIGluZGV4ID09IG1heCApIHtcbiAgICAgICAgICAgIHdpemFyZC5maW5kKCdbZGF0YS13aXphcmQ9XCJuZXh0XCJdJykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgd2l6YXJkLmZpbmQoJ1tkYXRhLXdpemFyZD1cImZpbmlzaFwiXScpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aXphcmQuZmluZCgnW2RhdGEtd2l6YXJkPVwibmV4dFwiXScpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIHdpemFyZC5maW5kKCdbZGF0YS13aXphcmQ9XCJmaW5pc2hcIl0nKS5hZGRDbGFzcygnZC1ub25lJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTmF2IGNsYXNzZXNcbiAgICAgICAgICBuYXZpZ2F0aW9uLmNoaWxkcmVuKCkucmVtb3ZlQ2xhc3MoJ3Byb2Nlc3NpbmcnKTtcbiAgICAgICAgICBuYXZpZ2F0aW9uLmNoaWxkcmVuKCc6bHQoJysgaW5kZXggKycpOm5vdCguY29tcGxldGUpJykuYWRkQ2xhc3MoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgbmF2LmFkZENsYXNzKCdwcm9jZXNzaW5nJyk7XG5cbiAgICAgICAgICBpZiAoICF3aXphcmQuaXMoJ1tkYXRhLXN0YXktY29tcGxldGU9XCJ0cnVlXCJdJykgKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLmNoaWxkcmVuKCc6Z3QoJysgaW5kZXggKycpLmNvbXBsZXRlJykucmVtb3ZlQ2xhc3MoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQWpheCBsb2FkXG4gICAgICAgICAgaWYgKCB0YWIuaGFzRGF0YUF0dHIoJ3VybCcpICkge1xuICAgICAgICAgICAgdGFiLmxvYWQoIHRhYi5kYXRhKCd1cmwnKSApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENhbGxiYWNrIGZvciB0YWJcbiAgICAgICAgICBpZiAoIHRhYi5oYXNEYXRhQXR0cignY2FsbGJhY2snKSApIHtcbiAgICAgICAgICAgIGFwcC5jYWxsKCB0YWIuZGF0YSgnY2FsbGJhY2snKSwgdGFiICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2FsbGJhY2sgZm9yIHdpemFyZFxuICAgICAgICAgIC8vXG4gICAgICAgICAgaWYgKCB3aXphcmQuaGFzRGF0YUF0dHIoJ29uLXRhYi1zaG93JykgKSB7XG4gICAgICAgICAgICBhcHAuY2FsbCggd2l6YXJkLmRhdGEoJ29uLXRhYi1zaG93JyksIHRhYiwgbmF2aWdhdGlvbiwgaW5kZXggKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuXG4gICAgICAgIG9uRmluaXNoOiBmdW5jdGlvbih0YWIsIG5hdmlnYXRpb24sIGluZGV4KSB7XG5cbiAgICAgICAgICB2YXIgY3Vycl90YWIgPSB0YWJfcGFuZS5lcShpbmRleCk7XG5cbiAgICAgICAgICAvLyBWYWxpZGF0b3JcbiAgICAgICAgICB2YXIgdmFsaWRhdG9yX3NlbGVjdG9yID0gJ1tkYXRhLXByb3ZpZGU9XCJ2YWxpZGF0aW9uXCJdJztcbiAgICAgICAgICB2YXIgdmFsaWRhdG9yID0gY3Vycl90YWIuZmluZCh2YWxpZGF0b3Jfc2VsZWN0b3IpLmFkZEJhY2sodmFsaWRhdG9yX3NlbGVjdG9yKTtcbiAgICAgICAgICBpZiAoIHZhbGlkYXRvci5sZW5ndGggKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IudmFsaWRhdG9yKCd2YWxpZGF0ZScpO1xuICAgICAgICAgICAgaWYgKCB2YWxpZGF0b3IuZmluZCgnLmhhcy1lcnJvcicpLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgdmFsaWRhdG9yLmNsb3Nlc3QoJ2Zvcm0nKS5vbmUoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTmF2aWdhdGlvblxuICAgICAgICAgIHZhciBuYXYgPSBuYXZfaXRlbS5lcShpbmRleCk7XG4gICAgICAgICAgbmF2LmFkZENsYXNzKCdjb21wbGV0ZScpLnJlbW92ZUNsYXNzKCdwcm9jZXNzaW5nJyk7XG5cbiAgICAgICAgICAvLyBDYWxsYmFja1xuICAgICAgICAgIC8vXG4gICAgICAgICAgaWYgKCB3aXphcmQuaGFzRGF0YUF0dHIoJ29uLWZpbmlzaCcpICkge1xuICAgICAgICAgICAgYXBwLmNhbGwoIHdpemFyZC5kYXRhKCdvbi1maW5pc2gnKSwgdGFiLCBuYXZpZ2F0aW9uLCBpbmRleCApO1xuICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfVxuXG5cblxuXG5cblxuXG4gIC8vIFR5cGVhaGVhZFxuICAvL1xuICBwcm92aWRlci5pbml0VHlwZWFoZWFkID0gZnVuY3Rpb24oKSB7XG5cblxuXG4gIH07XG5cblxuXG5cblxuXG59KGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvZm9ybS5qcyIsIlxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vIEljb24gcGx1Z2luc1xuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQpe1xuXG5cbiAgcHJvdmlkZXIuaW5pdEljb25zID0gZnVuY3Rpb24oKSB7XG5cbiAgICBwcm92aWRlci5pbml0SThpY29ucygpO1xuXG4gIH07XG5cblxuICBwcm92aWRlci5pbml0SThpY29ucyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgnaWNvbkk4JywgZnVuY3Rpb24oKXtcbiAgICAgICQoZG9jdW1lbnQpLmk4aWNvbnMoZnVuY3Rpb24oaWNvbnMpIHtcbiAgICAgICAgaWNvbnMuZGVmYXVsdEljb25TZXRVcmwoYXBwLmRpci52ZW5kb3IgKydpOC1pY29uL2k4LWNvbG9yLWljb25zLnN2ZycpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfTtcblxuXG5cbn0oalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci9pY29uLmpzIiwiXG5cbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy8gTWFwIHBsdWdpbnNcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkKXtcblxuICBwcm92aWRlci5pbml0TWFwcyA9IGZ1bmN0aW9uKCkge1xuXG4gIH07XG5cblxuICBwcm92aWRlci5pbml0TWFwID0gZnVuY3Rpb24oKSB7XG5cbiAgfTtcblxuXG5cbiAgcHJvdmlkZXIuaW5pdE1hcGFlbCA9IGZ1bmN0aW9uKCkge1xuXG4gIH07XG5cblxufShqUXVlcnkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc3JjL3Byb3ZpZGVyL21hcC5qcyIsIlxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vIEVkaXRvciBwbHVnaW5zXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vXG4rZnVuY3Rpb24oJCl7XG5cblxuICBwcm92aWRlci5pbml0TWlzY3MgPSBmdW5jdGlvbigpIHtcblxuICAgIHByb3ZpZGVyLmluaXRKdXN0aWZpZWRHYWxsZXJ5KCk7XG5cbiAgfTtcblxuXG4gIHByb3ZpZGVyLmluaXRGdWxsY2FsZW5kYXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi5mdWxsQ2FsZW5kYXIgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gIH07XG5cblxuXG5cblxuXG4gIHByb3ZpZGVyLmluaXRKdXN0aWZpZWRHYWxsZXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhICQuZm4uanVzdGlmaWVkR2FsbGVyeSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ2p1c3RpZmllZCcsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgY2FwdGlvbnM6IGZhbHNlLFxuICAgICAgICBjc3NBbmltYXRpb246IHRydWUsXG4gICAgICAgIGltYWdlc0FuaW1hdGlvbkR1cmF0aW9uOiA1MDBcbiAgICAgIH07XG5cbiAgICAgICQuZXh0ZW5kKG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKVxuICAgICAgJCh0aGlzKS5qdXN0aWZpZWRHYWxsZXJ5KG9wdGlvbnMpO1xuICAgIH0pO1xuXG4gIH07XG5cblxuXG5cblxuICAvLyBBbmltYXRlIE9uIFNjcm9sbFxuICAvL1xuICBwcm92aWRlci5pbml0QW9zID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoIHdpbmRvd1snQU9TJ10gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm92aWRlci5wcm92aWRlKCdhb3MnLCBmdW5jdGlvbigpe1xuICAgICAgQU9TLmluaXQoe1xuICAgICAgICBkdXJhdGlvbjogODAwXG4gICAgICB9KTtcbiAgICB9KTtcblxuICB9O1xuXG5cblxuXG5cbiAgcHJvdmlkZXIuaW5pdFR5cGVkID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoIHdpbmRvd1snVHlwZWQnXSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgndHlwZWQnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHN0cmluZ3MgPSAkKHRoaXMpLmRhdGEoJ3R5cGUnKS5zcGxpdCgnfCcpO1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHN0cmluZ3M6IHN0cmluZ3MsXG4gICAgICAgIHR5cGVTcGVlZDogNTAsXG4gICAgICAgIGJhY2tTcGVlZDogMzAsXG4gICAgICAgIGxvb3A6IHRydWVcbiAgICAgIH07XG5cbiAgICAgICQuZXh0ZW5kKG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKVxuICAgICAgdmFyIHR5cGVkID0gbmV3IFR5cGVkKCAkKHRoaXMpWzBdLCBvcHRpb25zICk7XG5cbiAgICB9KTtcblxuICB9O1xuXG5cblxuXG59KGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvbWlzYy5qcyIsIlxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vIHByb3ZpZGVyIGxpc3Rcbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy9cbitmdW5jdGlvbigkKXtcblxuXG4gIC8vXG4gIC8vXG4gIHByb3ZpZGVyLmxpc3QgPSB7XG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gQ2hhcnRcbiAgICAvL1xuICAgIGVhc3lwaWU6IHtcbiAgICAgIHNlbGVjdG9yOiAnZWFzeXBpZScsXG4gICAgICBjYWxsYmFjazogJ2luaXRFYXN5UGllQ2hhcnQnLFxuICAgICAgY3NzOiAgICAgICcnLFxuICAgICAganM6ICAgICAgICdlYXN5cGllY2hhcnQvanF1ZXJ5LmVhc3lwaWVjaGFydC5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIHBlaXR5OiB7XG4gICAgICBzZWxlY3RvcjogJ3BlaXR5JyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdFBlaXR5JyxcbiAgICAgIGNzczogICAgICAnJyxcbiAgICAgIGpzOiAgICAgICAnanF1ZXJ5LnBlaXR5L2pxdWVyeS5wZWl0eS5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIHNwYXJrbGluZToge1xuICAgICAgc2VsZWN0b3I6ICdzcGFya2xpbmUnLFxuICAgICAgY2FsbGJhY2s6ICdpbml0U3BhcmtsaW5lJyxcbiAgICAgIGNzczogICAgICAnJyxcbiAgICAgIGpzOiAgICAgICAnc3BhcmtsaW5lL3NwYXJrbGluZS5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIGNoYXJ0anM6IHtcbiAgICAgIHNlbGVjdG9yOiAnY2hhcnRqcycsXG4gICAgICBjYWxsYmFjazogJ2luaXRDaGFydGpzJyxcbiAgICAgIGNzczogICAgICAnJyxcbiAgICAgIGpzOiAgICAgICBbXG4gICAgICAgICAgICAgICAgICAnY2hhcnRqcy9DaGFydC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgJ21vbWVudC9tb21lbnQubWluLmpzJyxcbiAgICAgICAgICAgICAgICBdXG4gICAgfSxcblxuXG4gICAgbW9ycmlzOiB7XG4gICAgICBzZWxlY3RvcjogJ21vcnJpcycsXG4gICAgICBjYWxsYmFjazogJ2luaXRNb3JyaXMnLFxuICAgICAgY3NzOiAgICAgICdtb3JyaXMvbW9ycmlzLmNzcycsXG4gICAgICBqczogICAgICAgW1xuICAgICAgICAgICAgICAgICAgJ3JhcGhhZWwvcmFwaGFlbC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgJ21vcnJpcy9tb3JyaXMubWluLmpzJyxcbiAgICAgICAgICAgICAgICBdXG4gICAgfSxcblxuXG5cblxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gQ29kZVxuICAgIC8vXG4gICAgcHJpc206IHtcbiAgICAgIHNlbGVjdG9yOiAnJCBjb2RlW2NsYXNzKj1cImxhbmd1YWdlLVwiXScsXG4gICAgICBjYWxsYmFjazogJ2luaXRQcmlzbScsXG4gICAgICBjc3M6ICAgICAgJ3ByaXNtL3ByaXNtLmNzcycsXG4gICAgICBqczogICAgICAgW1xuICAgICAgICAgICAgICAgICAgJ3ByaXNtL3ByaXNtLmpzJyxcbiAgICAgICAgICAgICAgICAgICdjbGlwYm9hcmQvY2xpcGJvYXJkLm1pbi5qcydcbiAgICAgICAgICAgICAgICBdXG4gICAgfSxcblxuXG5cbiAgICBjbGlwYm9hcmQ6IHtcbiAgICAgIHNlbGVjdG9yOiAnJCBbZGF0YS1jbGlwYm9hcmQtdGV4dF0nLFxuICAgICAgY2FsbGJhY2s6ICdpbml0Q2xpcGJvYXJkJyxcbiAgICAgIGpzOiAgICAgICAnY2xpcGJvYXJkL2NsaXBib2FyZC5taW4uanMnXG4gICAgfSxcblxuXG5cblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBFZGl0b3JcbiAgICAvL1xuICAgIHN1bW1lcm5vdGU6IHtcbiAgICAgIHNlbGVjdG9yOiAnc3VtbWVybm90ZScsXG4gICAgICBjYWxsYmFjazogJ2luaXRTdW1tZXJub3RlJyxcbiAgICAgIGNzczogICAgICAnc3VtbWVybm90ZS9zdW1tZXJub3RlLmNzcycsXG4gICAgICBqczogICAgICAgJ3N1bW1lcm5vdGUvc3VtbWVybm90ZS5taW4uanMnLFxuICAgIH0sXG5cblxuXG5cbiAgICBxdWlsbDoge1xuICAgICAgc2VsZWN0b3I6ICdxdWlsbCcsXG4gICAgICBjYWxsYmFjazogJ2luaXRRdWlsbCcsXG4gICAgICBjc3M6ICAgICAgW1xuICAgICAgICAgICAgICAgICAgLy8naGlnaGxpZ2h0L3N0eWxlcy9tb25va2FpLXN1YmxpbWUuY3NzJyxcbiAgICAgICAgICAgICAgICAgICdxdWlsbC9xdWlsbC5idWJibGUuY3NzJyxcbiAgICAgICAgICAgICAgICAgICdxdWlsbC9xdWlsbC5zbm93LmNzcycsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgIGpzOiAgICAgICBbXG4gICAgICAgICAgICAgICAgICAvLydoaWdobGlnaHQvaGlnaGxpZ2h0LnBhY2suanMnLFxuICAgICAgICAgICAgICAgICAgJ3F1aWxsL3F1aWxsLm1pbi5qcycsXG4gICAgICAgICAgICAgICAgXVxuICAgIH0sXG5cblxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gRW1vamlcbiAgICAvL1xuICAgIGVtb2ppOiB7XG4gICAgICBzZWxlY3RvcjogJ2Vtb2ppJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdEVtb2ppb25lJyxcbiAgICAgIGNzczogICAgICAnJyxcbiAgICAgIGpzOiAgICAgICAnZW1vamlvbmUvZW1vamlvbmUubWluLmpzJyxcbiAgICB9LFxuXG5cblxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gRm9ybVxuICAgIC8vXG4gICAgc2VsZWN0cGlja2VyOiB7XG4gICAgICBzZWxlY3RvcjogJ3NlbGVjdHBpY2tlcicsXG4gICAgICBjYWxsYmFjazogJ2luaXRTZWxlY3RwaWNrZXInLFxuICAgICAgY3NzOiAgICAgICdib290c3RyYXAtc2VsZWN0L2Nzcy9ib290c3RyYXAtc2VsZWN0Lm1pbi5jc3MnLFxuICAgICAganM6ICAgICAgICdib290c3RyYXAtc2VsZWN0L2pzL2Jvb3RzdHJhcC1zZWxlY3QubWluLmpzJyxcbiAgICB9LFxuXG5cbiAgICBkYXRlcGlja2VyOiB7XG4gICAgICBzZWxlY3RvcjogJ2RhdGVwaWNrZXInLFxuICAgICAgY2FsbGJhY2s6ICdpbml0RGF0ZXBpY2tlcicsXG4gICAgICBjc3M6ICAgICAgJ2Jvb3RzdHJhcC1kYXRlcGlja2VyL2Nzcy9ib290c3RyYXAtZGF0ZXBpY2tlcjMubWluLmNzcycsXG4gICAgICBqczogICAgICAgJ2Jvb3RzdHJhcC1kYXRlcGlja2VyL2pzL2Jvb3RzdHJhcC1kYXRlcGlja2VyLm1pbi5qcycsXG4gICAgfSxcblxuXG4gICAgdGltZXBpY2tlcjoge1xuICAgICAgc2VsZWN0b3I6ICd0aW1lcGlja2VyJyxcbiAgICAgIC8vY2FsbGJhY2s6ICcnLFxuICAgICAgY3NzOiAgICAgICdib290c3RyYXAtdGltZXBpY2tlci9ib290c3RyYXAtdGltZXBpY2tlci5taW4uY3NzJyxcbiAgICAgIGpzOiAgICAgICAnYm9vdHN0cmFwLXRpbWVwaWNrZXIvYm9vdHN0cmFwLXRpbWVwaWNrZXIubWluLmpzJyxcbiAgICB9LFxuXG5cbiAgICBjb2xvcnBpY2tlcjoge1xuICAgICAgc2VsZWN0b3I6ICdjb2xvcnBpY2tlcicsXG4gICAgICBjYWxsYmFjazogJ2luaXRNaW5pY29sb3InLFxuICAgICAgY3NzOiAgICAgICdqcXVlcnktbWluaWNvbG9ycy9qcXVlcnkubWluaWNvbG9ycy5jc3MnLFxuICAgICAganM6ICAgICAgICdqcXVlcnktbWluaWNvbG9ycy9qcXVlcnkubWluaWNvbG9ycy5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIGNsb2NrcGlja2VyOiB7XG4gICAgICBzZWxlY3RvcjogJ2Nsb2NrcGlja2VyJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdENsb2NrcGlja2VyJyxcbiAgICAgIGNzczogICAgICAnYm9vdHN0cmFwLWNsb2NrcGlja2VyL2Jvb3RzdHJhcC1jbG9ja3BpY2tlci5taW4uY3NzJyxcbiAgICAgIGpzOiAgICAgICAnYm9vdHN0cmFwLWNsb2NrcGlja2VyL2Jvb3RzdHJhcC1jbG9ja3BpY2tlci5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIG1heGxlbmd0aDoge1xuICAgICAgc2VsZWN0b3I6ICdtYXhsZW5ndGgnLFxuICAgICAgY2FsbGJhY2s6ICdpbml0TWF4bGVuZ3RoJyxcbiAgICAgIGNzczogICAgICAnJyxcbiAgICAgIGpzOiAgICAgICAnYm9vdHN0cmFwLW1heGxlbmd0aC9ib290c3RyYXAtbWF4bGVuZ3RoLm1pbi5qcycsXG4gICAgfSxcblxuXG4gICAgcHdzdHJlbmd0aDoge1xuICAgICAgc2VsZWN0b3I6ICdwd3N0cmVuZ3RoJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdFB3U3RyZW5ndGgnLFxuICAgICAgY3NzOiAgICAgICcnLFxuICAgICAganM6ICAgICAgICdib290c3RyYXAtcHdzdHJlbmd0aC9wd3N0cmVuZ3RoLWJvb3RzdHJhcC5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIHRhZ3NpbnB1dDoge1xuICAgICAgc2VsZWN0b3I6ICd0YWdzaW5wdXQnLFxuICAgICAgY2FsbGJhY2s6ICdpbml0VGFnc2lucHV0JyxcbiAgICAgIGNzczogICAgICAnYm9vdHN0cmFwLXRhZ3NpbnB1dC9ib290c3RyYXAtdGFnc2lucHV0LmNzcycsXG4gICAgICBqczogICAgICAgJ2Jvb3RzdHJhcC10YWdzaW5wdXQvYm9vdHN0cmFwLXRhZ3NpbnB1dC5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIGtub2I6IHtcbiAgICAgIHNlbGVjdG9yOiAna25vYicsXG4gICAgICBjYWxsYmFjazogJ2luaXRLbm9iJyxcbiAgICAgIGNzczogICAgICAnJyxcbiAgICAgIGpzOiAgICAgICAna25vYi9qcXVlcnkua25vYi5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIHNsaWRlcjoge1xuICAgICAgc2VsZWN0b3I6ICdzbGlkZXInLFxuICAgICAgY2FsbGJhY2s6ICdpbml0Tm91aXNsaWRlcicsXG4gICAgICBjc3M6ICAgICAgJ25vdWlzbGlkZXIvbm91aXNsaWRlci5taW4uY3NzJyxcbiAgICAgIGpzOiAgICAgICAnbm91aXNsaWRlci9ub3Vpc2xpZGVyLm1pbi5qcycsXG4gICAgfSxcblxuXG4gICAgc3dpdGNoZXJ5OiB7XG4gICAgICBzZWxlY3RvcjogJ3N3aXRjaGVyeScsXG4gICAgICBjYWxsYmFjazogJ2luaXRTd2l0Y2hlcnknLFxuICAgICAgY3NzOiAgICAgICdzd2l0Y2hlcnkvc3dpdGNoZXJ5Lm1pbi5jc3MnLFxuICAgICAganM6ICAgICAgICdzd2l0Y2hlcnkvc3dpdGNoZXJ5Lm1pbi5qcycsXG4gICAgfSxcblxuXG4gICAgZm9ybWF0dGVyOiB7XG4gICAgICBzZWxlY3RvcjogJyQgW2RhdGEtZm9ybWF0XScsXG4gICAgICBjYWxsYmFjazogJ2luaXRGb3JtYXR0ZXInLFxuICAgICAgY3NzOiAgICAgICcnLFxuICAgICAganM6ICAgICAgICdmb3JtYXR0ZXIvanF1ZXJ5LmZvcm1hdHRlci5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIC8vIE5ldyB2ZXJzaW9uIHVwb24gZmluaXNoaW5nIGFscGhhIHJlbGVhc2VzIG9mIEJvb3RzdHJhcFxuICAgIHZhbGlkYXRpb246IHtcbiAgICAgIHNlbGVjdG9yOiAndmFsaWRhdGlvbicsXG4gICAgICBjYWxsYmFjazogJ2luaXRWYWxpZGF0aW9uJyxcbiAgICAgIGNzczogICAgICAnJyxcbiAgICAgIGpzOiAgICAgICAnYm9vdHN0cmFwLXZhbGlkYXRvci92YWxpZGF0b3ItYnM0Lm1pbi5qcycsXG4gICAgfSxcblxuXG4gICAgd2l6YXJkOiB7XG4gICAgICBzZWxlY3RvcjogJ3dpemFyZCcsXG4gICAgICBjYWxsYmFjazogJ2luaXRXaXphcmQnLFxuICAgICAgY3NzOiAgICAgICcnLFxuICAgICAganM6ICAgICAgICdib290c3RyYXAtd2l6YXJkL2Jvb3RzdHJhcC13aXphcmQubWluLmpzJyxcbiAgICB9LFxuXG5cbiAgICB0eXBlYWhlYWQ6IHtcbiAgICAgIHNlbGVjdG9yOiAndHlwZWFoZWFkJyxcbiAgICAgIGpzOiAgICAgICBbXG4gICAgICAgICAgICAgICAgICAndHlwZWFoZWFkL2Jsb29kaG91bmQubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICd0eXBlYWhlYWQvdHlwZWFoZWFkLmpxdWVyeS5taW4uanMnXG4gICAgICAgICAgICAgICAgXSxcbiAgICB9LFxuXG5cbiAgICBibG9vZGhvdW5kOiB7XG4gICAgICBzZWxlY3RvcjogJ2Jsb29kaG91bmQnLFxuICAgICAganM6ICAgICAgICd0eXBlYWhlYWQvYmxvb2Rob3VuZC5taW4uanMnLFxuICAgIH0sXG5cblxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gSWNvblxuICAgIC8vXG4gICAgaWNvbk1hdGVyaWFsOiB7XG4gICAgICBzZWxlY3RvcjogJyQgLm1hdGVyaWFsLWljb25zJyxcbiAgICAgIGNzczogICAgICAnbWF0ZXJpYWwtaWNvbnMvY3NzL21hdGVyaWFsLWljb25zLmNzcycsXG4gICAgfSxcblxuXG4gICAgaWNvbjdTdHJva2U6IHtcbiAgICAgIHNlbGVjdG9yOiAnJCBbY2xhc3MqPVwicGUtN3MtXCJdJyxcbiAgICAgIGNzczogICAgICBbXG4gICAgICAgICAgICAgICAgICAncGUtaWNvbi03LXN0cm9rZS9jc3MvcGUtaWNvbi03LXN0cm9rZS5taW4uY3NzJyxcbiAgICAgICAgICAgICAgICAgICdwZS1pY29uLTctc3Ryb2tlL2Nzcy9oZWxwZXIubWluLmNzcydcbiAgICAgICAgICAgICAgICBdXG4gICAgfSxcblxuXG4gICAgaWNvbklvbjoge1xuICAgICAgc2VsZWN0b3I6ICckIFtjbGFzcyo9XCJpb24tXCJdJyxcbiAgICAgIGNzczogICAgICAnaW9uaWNvbnMvY3NzL2lvbmljb25zLm1pbi5jc3MnLFxuICAgIH0sXG5cblxuICAgIGljb25JODoge1xuICAgICAgc2VsZWN0b3I6ICckIFtkYXRhLWk4LWljb25dJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdEk4aWNvbnMnLFxuICAgICAgY3NzOiAgICAgICcnLFxuICAgICAganM6ICAgICAgICdpOC1pY29uL2pxdWVyeS1pOC1pY29uLm1pbi5qcycsXG4gICAgfSxcblxuXG5cblxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIE1hcFxuICAgIC8vXG4gICAgbWFwOiB7XG4gICAgICBzZWxlY3RvcjogJ21hcCcsXG4gICAgICBjYWxsYmFjazogJ2luaXRNYXAnLFxuICAgICAgY3NzOiAgICAgICcnLFxuICAgICAganM6ICAgICAgICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanM/a2V5PScrIGFwcC5kZWZhdWx0cy5nb29nbGVBcGlLZXkgKycmY2FsbGJhY2s9YXBwLm1hcCcsXG4gICAgfSxcblxuXG4gICAgbWFwYWVsOiB7XG4gICAgICBzZWxlY3RvcjogJ21hcGFlbCcsXG4gICAgICBjYWxsYmFjazogJ2luaXRNYXBhZWwnLFxuICAgICAgY3NzOiAgICAgICcnLFxuICAgICAganM6ICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICdqcXVlcnkubW91c2V3aGVlbC9qcXVlcnkubW91c2V3aGVlbC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgJ3JhcGhhZWwvcmFwaGFlbC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgJ21hcGFlbC9qcXVlcnkubWFwYWVsLm1pbi5qcydcbiAgICAgICAgICAgICAgICBdLFxuICAgIH0sXG5cblxuXG5cblxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFRhYmxlXG4gICAgLy9cbiAgICB0YWJsZToge1xuICAgICAgc2VsZWN0b3I6ICd0YWJsZScsXG4gICAgICBjYWxsYmFjazogJ2luaXRCb290c3RyYXBUYWJsZScsXG4gICAgICBjc3M6ICAgICAgJ2Jvb3RzdHJhcC10YWJsZS9ib290c3RyYXAtdGFibGUubWluLmNzcycsXG4gICAgICBqczogICAgICAgW1xuICAgICAgICAgICAgICAgICAgJ2Jvb3RzdHJhcC10YWJsZS9ib290c3RyYXAtdGFibGUubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICdib290c3RyYXAtdGFibGUvZXh0ZW5zaW9ucy9lZGl0YWJsZS9ib290c3RyYXAtdGFibGUtZWRpdGFibGUubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICdib290c3RyYXAtdGFibGUvZXh0ZW5zaW9ucy9leHBvcnQvYm9vdHN0cmFwLXRhYmxlLWV4cG9ydC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgJ2Jvb3RzdHJhcC10YWJsZS9leHRlbnNpb25zL3Jlc2l6YWJsZS9ib290c3RyYXAtdGFibGUtcmVzaXphYmxlLm1pbi5qcycsXG4gICAgICAgICAgICAgICAgICAnYm9vdHN0cmFwLXRhYmxlL2V4dGVuc2lvbnMvbW9iaWxlL2Jvb3RzdHJhcC10YWJsZS1tb2JpbGUubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICdib290c3RyYXAtdGFibGUvZXh0ZW5zaW9ucy9maWx0ZXItY29udHJvbC9ib290c3RyYXAtdGFibGUtZmlsdGVyLWNvbnRyb2wubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICdib290c3RyYXAtdGFibGUvZXh0ZW5zaW9ucy9tdWx0aXBsZS1zb3J0L2Jvb3RzdHJhcC10YWJsZS1tdWx0aXBsZS1zb3J0Lm1pbi5qcydcbiAgICAgICAgICAgICAgICBdXG4gICAgfSxcblxuXG5cbiAgICBqc2dyaWQ6IHtcbiAgICAgIHNlbGVjdG9yOiAnanNncmlkJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdEpzR3JpZCcsXG4gICAgICBjc3M6ICAgICAgW1xuICAgICAgICAgICAgICAgICAgJ2pzZ3JpZC9qc2dyaWQubWluLmNzcycsXG4gICAgICAgICAgICAgICAgICAnanNncmlkL2pzZ3JpZC10aGVtZS5taW4uY3NzJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICBqczogICAgICAgJ2pzZ3JpZC9qc2dyaWQubWluLmpzJ1xuICAgIH0sXG5cblxuXG4gICAgZGF0YXRhYmxlczoge1xuICAgICAgc2VsZWN0b3I6ICdkYXRhdGFibGVzJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdERhdGF0YWJsZXMnLFxuICAgICAgY3NzOiAgICAgICdkYXRhdGFibGVzL2Nzcy9kYXRhVGFibGVzLmJvb3RzdHJhcDQubWluLmNzcycsXG4gICAgICBqczogICAgICAgW1xuICAgICAgICAgICAgICAgICAgJ2RhdGF0YWJsZXMvanMvanF1ZXJ5LmRhdGFUYWJsZXMubWluLmpzJyxcbiAgICAgICAgICAgICAgICAgICdkYXRhdGFibGVzL2pzL2RhdGFUYWJsZXMuYm9vdHN0cmFwNC5taW4uanMnLFxuICAgICAgICAgICAgICAgIF1cbiAgICB9LFxuXG5cblxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gVUlcbiAgICAvL1xuICAgIHN3ZWV0YWxlcnQ6IHtcbiAgICAgIHNlbGVjdG9yOiAnc3dlZXRhbGVydCcsXG4gICAgICBjYWxsYmFjazogJ2luaXRTd2VldGFsZXJ0MicsXG4gICAgICBjc3M6ICAgICAgJ3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyLm1pbi5jc3MnLFxuICAgICAganM6ICAgICAgICdzd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIGxpdHk6IHtcbiAgICAgIHNlbGVjdG9yOiAnbGl0eScsXG4gICAgICBjYWxsYmFjazogJ2luaXRMaXR5JyxcbiAgICAgIGNzczogICAgICAnbGl0eS9saXR5Lm1pbi5jc3MnLFxuICAgICAganM6ICAgICAgICdsaXR5L2xpdHkubWluLmpzJyxcbiAgICB9LFxuXG5cbiAgICBzb3J0YWJsZToge1xuICAgICAgc2VsZWN0b3I6ICdzb3J0YWJsZScsXG4gICAgICBjYWxsYmFjazogJ2luaXRTb3J0YWJsZScsXG4gICAgICBjc3M6ICAgICAgJycsXG4gICAgICBqczogICAgICAgJ2h0bWw1c29ydGFibGUvaHRtbC5zb3J0YWJsZS5taW4uanMnLFxuICAgIH0sXG5cblxuICAgIHNoZXBoZXJkOiB7XG4gICAgICBzZWxlY3RvcjogJ3NoZXBoZXJkJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdFNoZXBoZXJkJyxcbiAgICAgIGNzczogICAgICAnc2hlcGhlcmQvY3NzL3NoZXBoZXJkLXRoZW1lLWFycm93cy1wbGFpbi1idXR0b25zLmNzcycsXG4gICAgICBqczogICAgICAgW1xuICAgICAgICAgICAgICAgICAgJ3NoZXBoZXJkL2pzL3RldGhlci5qcycsXG4gICAgICAgICAgICAgICAgICAnc2hlcGhlcmQvanMvc2hlcGhlcmQubWluLmpzJyxcbiAgICAgICAgICAgICAgICBdLFxuICAgIH0sXG5cblxuICAgIHNodWZmbGU6IHtcbiAgICAgIHNlbGVjdG9yOiAnc2h1ZmZsZScsXG4gICAgICBjYWxsYmFjazogJ2luaXRTaHVmZmxlJyxcbiAgICAgIGNzczogICAgICAnJyxcbiAgICAgIGpzOiAgICAgICBbXG4gICAgICAgICAgICAgICAgICAnaW1hZ2VzbG9hZGVkL2ltYWdlc2xvYWRlZC5wa2dkLm1pbi5qcycsXG4gICAgICAgICAgICAgICAgICAnc2h1ZmZsZS9zaHVmZmxlLm1pbi5qcycsXG4gICAgICAgICAgICAgICAgXVxuICAgIH0sXG5cblxuICAgIHBob3Rvc3dpcGU6IHtcbiAgICAgIHNlbGVjdG9yOiAncGhvdG9zd2lwZScsXG4gICAgICBjYWxsYmFjazogJ2luaXRQaG90b3N3aXBlJyxcbiAgICAgIGNzczogICAgICBbXG4gICAgICAgICAgICAgICAgICAncGhvdG9zd2lwZS9waG90b3N3aXBlLm1pbi5jc3MnLFxuICAgICAgICAgICAgICAgICAgJ3Bob3Rvc3dpcGUvZGVmYXVsdC1za2luL2RlZmF1bHQtc2tpbi5taW4uY3NzJ1xuICAgICAgICAgICAgICAgIF0sXG4gICAgICBqczogICAgICAgJ3Bob3Rvc3dpcGUvanF1ZXJ5LnBob3Rvc3dpcGUtZ2xvYmFsLmpzJyxcbiAgICB9LFxuXG5cbiAgICBzd2lwZXI6IHtcbiAgICAgIHNlbGVjdG9yOiAnc3dpcGVyJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdFN3aXBlcicsXG4gICAgICBjc3M6ICAgICAgJ3N3aXBlci9jc3Mvc3dpcGVyLm1pbi5jc3MnLFxuICAgICAganM6ICAgICAgICdzd2lwZXIvanMvc3dpcGVyLm1pbi5qcycsXG4gICAgfSxcblxuXG4gICAgZnVsbHNjcmVlbjoge1xuICAgICAgc2VsZWN0b3I6ICdmdWxsc2NyZWVuJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdEZ1bGxzY3JlZW4nLFxuICAgICAganM6ICAgICAgICdzY3JlZW5mdWxsL3NjcmVlbmZ1bGwubWluLmpzJyxcbiAgICB9LFxuXG5cbiAgICBqcXVlcnl1aToge1xuICAgICAgc2VsZWN0b3I6ICdqcXVlcnl1aScsXG4gICAgICAvL2NhbGxiYWNrOiAnaW5pdEZ1bGxzY3JlZW4nLFxuICAgICAganM6ICAgICAgICdqcXVlcnl1aS9qcXVlcnktdWkubWluLmpzJyxcbiAgICB9LFxuXG5cblxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIFVwbG9hZFxuICAgIC8vXG4gICAgZHJvcGlmeToge1xuICAgICAgc2VsZWN0b3I6ICdkcm9waWZ5JyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdERyb3BpZnknLFxuICAgICAgY3NzOiAgICAgICdkcm9waWZ5L2Nzcy9kcm9waWZ5Lm1pbi5jc3MnLFxuICAgICAganM6ICAgICAgICdkcm9waWZ5L2pzL2Ryb3BpZnkubWluLmpzJyxcbiAgICB9LFxuXG5cbiAgICBkcm9wem9uZToge1xuICAgICAgc2VsZWN0b3I6ICdkcm9wem9uZScsXG4gICAgICBjYWxsYmFjazogJ2luaXREcm9wem9uZScsXG4gICAgICBjc3M6ICAgICAgJ2Ryb3B6b25lL21pbi9kcm9wem9uZS5taW4uY3NzJyxcbiAgICAgIGpzOiAgICAgICAnZHJvcHpvbmUvbWluL2Ryb3B6b25lLm1pbi5qcycsXG4gICAgfSxcblxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gTWlzY1xuICAgIC8vXG4gICAgZnVsbGNhbGVuZGFyOiB7XG4gICAgICBzZWxlY3RvcjogJ2Z1bGxjYWxlbmRhcicsXG4gICAgICBjYWxsYmFjazogJ2luaXRGdWxsY2FsZW5kYXInLFxuICAgICAgY3NzOiAgICAgICdmdWxsY2FsZW5kYXIvZnVsbGNhbGVuZGFyLm1pbi5jc3MnLFxuICAgICAganM6ICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICdtb21lbnQvbW9tZW50Lm1pbi5qcycsXG4gICAgICAgICAgICAgICAgICAnZnVsbGNhbGVuZGFyL2Z1bGxjYWxlbmRhci5taW4uanMnLFxuICAgICAgICAgICAgICAgIF1cbiAgICB9LFxuXG5cblxuICAgIGp1c3RpZmllZDoge1xuICAgICAgc2VsZWN0b3I6ICdqdXN0aWZpZWQtZ2FsbGVyeScsXG4gICAgICBjYWxsYmFjazogJ2luaXRKdXN0aWZpZWRHYWxsZXJ5JyxcbiAgICAgIGNzczogICAgICAnanVzdGlmaWVkLWdhbGxlcnkvY3NzL2p1c3RpZmllZEdhbGxlcnkubWluLmNzcycsXG4gICAgICBqczogICAgICAgJ2p1c3RpZmllZC1nYWxsZXJ5L2pzL2pxdWVyeS5qdXN0aWZpZWRHYWxsZXJ5Lm1pbi5qcycsXG4gICAgfSxcblxuXG5cbiAgICBhbmltYXRlOiB7XG4gICAgICBzZWxlY3RvcjogJyQgLmFuaW1hdGVkJyxcbiAgICAgIGNzczogICAgICAnYW5pbWF0ZS9hbmltYXRlLm1pbi5jc3MnLFxuICAgIH0sXG5cblxuXG4gICAgaW50ZXJjb29sZXJqczoge1xuICAgICAgc2VsZWN0b3I6ICckIFtpYy1nZXQtZnJvbV0sIFtpYy1wb3N0LXRvXSwgW2ljLXB1dC10b10sIFtpYy1wYXRjaC10b10sIFtpYy1kZWxldGUtZnJvbV0sIFtkYXRhLWljLWdldC1mcm9tXSwgW2RhdGEtaWMtcG9zdC10b10sIFtkYXRhLWljLXB1dC10b10sIFtkYXRhLWljLXBhdGNoLXRvXSwgW2RhdGEtaWMtZGVsZXRlLWZyb21dJyxcbiAgICAgIGpzOiAgICAgICAnaW50ZXJjb29sZXJqcy9pbnRlcmNvb2xlcmpzLm1pbi5qcycsXG4gICAgfSxcblxuXG5cbiAgICBzbW9vdGhzY3JvbGw6IHtcbiAgICAgIHNlbGVjdG9yOiAnc21vb3Roc2Nyb2xsJyxcbiAgICAgIGpzOiAgICAgICAnc21vb3Roc2Nyb2xsL3Ntb290aHNjcm9sbC5taW4uanMnLFxuICAgIH0sXG5cblxuXG4gICAgYW9zOiB7XG4gICAgICBzZWxlY3RvcjogJyQgW2RhdGEtYW9zXScsXG4gICAgICBjYWxsYmFjazogJ2luaXRBb3MnLFxuICAgICAgY3NzOiAgICAgICdhb3MvYW9zLmNzcycsXG4gICAgICBqczogICAgICAgJ2Fvcy9hb3MuanMnLFxuICAgIH0sXG5cblxuXG4gICAgdHlwZWQ6IHtcbiAgICAgIHNlbGVjdG9yOiAndHlwaW5nJyxcbiAgICAgIGNhbGxiYWNrOiAnaW5pdFR5cGVkJyxcbiAgICAgIGpzOiAgICAgICAndHlwZWQuanMvdHlwZWQubWluLmpzJyxcbiAgICB9LFxuXG5cblxuXG5cbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gTWlzY1xuICAgIC8vXG5cblxuICAgIHZ1ZWpzOiB7XG4gICAgICBzZWxlY3RvcjogJ3Z1ZWpzJyxcbiAgICAgIGpzOiAgICAgICAndnVlanMvdnVlLm1pbi5qcycsXG4gICAgfSxcblxuXG4gICAgcmVhY3Rqczoge1xuICAgICAgc2VsZWN0b3I6ICdyZWFjdGpzJyxcbiAgICAgIGpzOiAgICAgICBbXG4gICAgICAgICAgICAgICAgICAncmVhY3Rqcy9yZWFjdC5taW4uanMnLFxuICAgICAgICAgICAgICAgICAgJ3JlYWN0anMvcmVhY3QtZG9tLm1pbi5qcycsXG4gICAgICAgICAgICAgICAgXSxcbiAgICB9LFxuXG5cbiAgfVxuXG5cblxufShqUXVlcnkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc3JjL3Byb3ZpZGVyL3Byb3ZpZGVyLWxpc3QuanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBwcm92aWRlclxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQsIHdpbmRvdyl7XG5cbiAgdmFyIHByb3ZpZGVyID0ge307XG4gIHByb3ZpZGVyLmNhbGxiYWNrcyA9IFtdO1xuXG4gIHZhciBtc29ic2VydmVycyA9IFtdO1xuICB2YXIgbG9hZGVkID0gW107XG4gIHZhciBmaXJzdExvYWQgPSB0cnVlO1xuICB2YXIgb2JzZXJ2ZXI7XG5cbiAgdmFyIE1zT2JzZXJ2ZXIgPSBmdW5jdGlvbihzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICB9XG5cblxuXG4gIHByb3ZpZGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICAgICRMQUIuc2V0R2xvYmFsRGVmYXVsdHMoe1xuICAgICAgQmFzZVBhdGg6IGFwcC5kaXIudmVuZG9yLFxuICAgICAgQWx3YXlzUHJlc2VydmVPcmRlcjogdHJ1ZSxcbiAgICAgIEFsbG93RHVwbGljYXRlczogZmFsc2UsXG4gICAgICAvL0RlYnVnOiB0cnVlXG4gICAgfSk7XG5cbiAgICBwcm92aWRlci5pbmplY3QoKTtcbiAgICBwcm92aWRlci5vYnNlcnZlRE9NKCk7XG4gIH07XG5cblxuXG5cbiAgcHJvdmlkZXIub2JzZXJ2ZURPTSA9IGZ1bmN0aW9uKCkge1xuICAgIGFwcC5yZWFkeShmdW5jdGlvbigpe1xuICAgICAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcbiAgICAgICAgcHJvdmlkZXIuaW5qZWN0KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNvYnNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAkKG1zb2JzZXJ2ZXJzW2ldLnNlbGVjdG9yKS5lYWNoKG1zb2JzZXJ2ZXJzW2ldLmNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlLCBhdHRyaWJ1dGVzOiBmYWxzZX0pO1xuICAgIH0pO1xuICB9XG5cblxuXG4gIC8vIEFsbCBvZiB0aGUgcGx1Z2lucyBzaG91bGQgaW5pdGlhbGl6ZSB1c2luZyB0aGlzIGZ1bmN0aW9uXG4gIC8vXG4gIHByb3ZpZGVyLnByb3ZpZGUgPSBmdW5jdGlvbihzZWxlY3RvciwgaW5pdF9jYWxsYmFjaywgaXNSYXdTZWxlY3Rvcikge1xuXG4gICAgaWYgKCAhIGlzUmF3U2VsZWN0b3IgPT09IHRydWUgKSB7XG4gICAgICBzZWxlY3RvciA9IHByb3ZpZGVyLmdldFNlbGVjdG9yKHByb3ZpZGVyLmxpc3Rbc2VsZWN0b3JdLnNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICAvLyBDYWxsIG9uY2UgcGVyIGVsZW1lbnRcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIHZhciBjYWxsYmFja09uY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIERvIG5vdCBydW4gc2NyaXB0IGlmIGl0J3MgcHJvdmlkZWQgZnJvbSBhIDxzY3JpcHQ+IG9yIGhhcyBkYXRhLWluaXQ9XCJmYWxzZVwiXG4gICAgICBpZiAoICQodGhpcykuaXMoJ3NjcmlwdCcpIHx8ICQodGhpcykuZGF0YSgnaW5pdCcpID09IGZhbHNlICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWVuLmluZGV4T2YodGhpcykgPT0gLTEpIHtcbiAgICAgICAgc2Vlbi5wdXNoKHRoaXMpO1xuICAgICAgICAkKHRoaXMpLmVhY2goaW5pdF9jYWxsYmFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJChzZWxlY3RvcikuZWFjaChjYWxsYmFja09uY2UpO1xuICAgIG1zb2JzZXJ2ZXJzLnB1c2gobmV3IE1zT2JzZXJ2ZXIoc2VsZWN0b3IsIGNhbGxiYWNrT25jZSkpO1xuICB9O1xuXG5cblxuXG4gIHByb3ZpZGVyLmluamVjdCA9IGZ1bmN0aW9uKHBsdWdpbk5hbWUpIHtcblxuICAgIGlmICggcGx1Z2luTmFtZSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgdmFyIHZlbmRvciA9IHByb3ZpZGVyLmxpc3RbcGx1Z2luTmFtZV07XG5cblxuICAgICAgaWYgKCB2ZW5kb3IgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBpZiBpdCdzIGFscmVhZHkgbG9hZGVkXG4gICAgICBpZiAoIGxvYWRlZC5pbmRleE9mKHBsdWdpbk5hbWUpID4gLTEgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTG9hZCBjc3MgZmlsZXNcbiAgICAgIGlmICggJ2NzcycgaW4gdmVuZG9yICkge1xuICAgICAgICBhcHAubG9hZFN0eWxlKHZlbmRvci5jc3MsIGFwcC5kaXIudmVuZG9yKTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBMb2FkIGpzIGZpbGVzXG4gICAgICBpZiAoICdqcycgaW4gdmVuZG9yICkge1xuICAgICAgICB2YXIganMgPSB2ZW5kb3IuanM7XG5cbiAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KGpzKSApIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAkTEFCLnF1ZXVlU2NyaXB0KGpzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJExBQi5xdWV1ZVNjcmlwdChqcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICAvLyBRdWV1ZSBjYWxsYmFja3NcbiAgICAgIGlmICggJ2NhbGxiYWNrJyBpbiB2ZW5kb3IgKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2codmVuZG9yLmNhbGxiYWNrKTtcbiAgICAgICAgJExBQi5xdWV1ZVdhaXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYXBwLmNhbGwoJ3Byb3ZpZGVyLicrIHZlbmRvci5jYWxsYmFjayk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cblxuICAgICAgLy8gQWRkIHRvIGxvYWRlZCBsaXN0XG4gICAgICBsb2FkZWQucHVzaChwbHVnaW5OYW1lKTtcblxuICAgICAgJExBQi5ydW5RdWV1ZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cblxuXG5cbiAgICB2YXIgbG9jYWxDYWxsYmFja3MgPSBbXTtcblxuICAgIC8vIEZldGNoIGRlcGVuZGVuY2llcyBmcm9tIERPTVxuICAgIC8vXG4gICAgJC5lYWNoKHByb3ZpZGVyLmxpc3QsIGZ1bmN0aW9uKG5hbWUsIHZlbmRvcikge1xuXG4gICAgICAvLyBDaGVjayBpZiBpdCdzIGFscmVhZHkgbG9hZGVkXG4gICAgICBpZiAoIGxvYWRlZC5pbmRleE9mKG5hbWUpID4gLTEgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgaWYgYW55IGVsZW1lbnQgZXhpc3RzIGZvciB0aGUgcGx1Z2luXG4gICAgICBpZiAoICEgJCggcHJvdmlkZXIuZ2V0U2VsZWN0b3IodmVuZG9yLnNlbGVjdG9yKSApLmxlbmd0aCApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG5cbiAgICAgIC8vIExvYWQgY3NzIGZpbGVzXG4gICAgICBpZiAoICdjc3MnIGluIHZlbmRvciApIHtcbiAgICAgICAgYXBwLmxvYWRTdHlsZSh2ZW5kb3IuY3NzLCBhcHAuZGlyLnZlbmRvcik7XG4gICAgICB9XG5cblxuICAgICAgLy8gTG9hZCBqcyBmaWxlc1xuICAgICAgaWYgKCAnanMnIGluIHZlbmRvciApIHtcbiAgICAgICAgdmFyIGpzID0gdmVuZG9yLmpzO1xuXG4gICAgICAgIGlmICggQXJyYXkuaXNBcnJheShqcykgKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgJExBQi5xdWV1ZVNjcmlwdChqc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICRMQUIucXVldWVTY3JpcHQoanMpO1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgLy8gUXVldWUgY2FsbGJhY2tzXG4gICAgICBpZiAoICdjYWxsYmFjaycgaW4gdmVuZG9yICkge1xuICAgICAgICBsb2NhbENhbGxiYWNrcy5wdXNoKHZlbmRvci5jYWxsYmFjayk7XG4gICAgICB9XG5cblxuICAgICAgLy8gQWRkIHRvIGxvYWRlZCBsaXN0XG4gICAgICBsb2FkZWQucHVzaChuYW1lKTtcblxuICAgIH0pO1xuXG5cblxuICAgIGlmIChmaXJzdExvYWQpIHtcbiAgICAgIHByb3ZpZGVyLmluamVjdEV4dHJhKCk7XG5cbiAgICAgICRMQUIucXVldWVXYWl0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwcm92aWRlci5jYWxsYmFja3MgPSBsb2NhbENhbGxiYWNrcztcbiAgICAgICAgYXBwLmlzUmVhZHkoKTtcbiAgICAgIH0pO1xuICAgICAgZmlyc3RMb2FkID0gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgJExBQi5xdWV1ZVdhaXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGkgPTA7IGkgPCBsb2NhbENhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFwcC5jYWxsKCdwcm92aWRlci4nKyBsb2NhbENhbGxiYWNrc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgJExBQi5ydW5RdWV1ZSgpO1xuXG4gIH1cblxuXG5cblxuXG4gIHByb3ZpZGVyLmluamVjdEV4dHJhID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBMb2FkIE1hcGFlbCByZXF1aXJlZCBtYXBzXG4gICAgLy9cbiAgICAkKCdbZGF0YS1tYXBhZWwtbWFwXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciBqcyA9ICdtYXBhZWwvbWFwcy8nKyAkKHRoaXMpLmRhdGEoJ21hcGFlbC1tYXAnKSArJy5taW4uanMnO1xuICAgICAgJExBQi5xdWV1ZVNjcmlwdChqcyk7XG4gICAgfSk7XG5cbiAgfVxuXG5cblxuXG5cbiAgLy8gSW5qZWN0IHBsdWdpbnMgaWYgdGhleSBjYWxsZWQgaW4gYXBwLnJlYWR5KClcbiAgLy9cbiAgcHJvdmlkZXIuaW5qZWN0Q2FsbGVkVmVuZG9ycyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYWxsYmFja3NTdHIgPSBhcHAuZ2V0UmVhZHlDYWxsYmFja3NTdHJpbmcoKTtcbiAgICB2YXIgbG9jYWxDYWxsYmFja3MgPSBbXTtcblxuICAgIHZhciBzZWFyY2hMaXN0ID0ge1xuICAgICAgdHlwZWFoZWFkOiAnKS50eXBlYWhlYWQoJ1xuICAgIH1cblxuXG4gICAgJC5lYWNoKHNlYXJjaExpc3QsIGZ1bmN0aW9uKG5hbWUsIGtleXdvcmQpe1xuICAgICAgaWYgKCBjYWxsYmFja3NTdHIuaW5kZXhPZihrZXl3b3JkKSA9PSAtMSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmVuZG9yID0gcHJvdmlkZXIubGlzdFtuYW1lXTtcblxuXG4gICAgICAvLyBDaGVjayBpZiBpdCdzIGFscmVhZHkgbG9hZGVkXG4gICAgICBpZiAoIGxvYWRlZC5pbmRleE9mKG5hbWUpID4gLTEgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTG9hZCBjc3MgZmlsZXNcbiAgICAgIGlmICggJ2NzcycgaW4gdmVuZG9yICkge1xuICAgICAgICBhcHAubG9hZFN0eWxlKHZlbmRvci5jc3MsIGFwcC5kaXIudmVuZG9yKTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBMb2FkIGpzIGZpbGVzXG4gICAgICBpZiAoICdqcycgaW4gdmVuZG9yICkge1xuICAgICAgICB2YXIganMgPSB2ZW5kb3IuanM7XG5cbiAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KGpzKSApIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAkTEFCLnF1ZXVlU2NyaXB0KGpzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJExBQi5xdWV1ZVNjcmlwdChqcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuXG4gICAgICAvLyBRdWV1ZSBjYWxsYmFja3NcbiAgICAgIGlmICggJ2NhbGxiYWNrJyBpbiB2ZW5kb3IgKSB7XG4gICAgICAgIGxvY2FsQ2FsbGJhY2tzLnB1c2godmVuZG9yLmNhbGxiYWNrKTtcbiAgICAgIH1cblxuXG4gICAgICAvLyBBZGQgdG8gbG9hZGVkIGxpc3RcbiAgICAgIGxvYWRlZC5wdXNoKG5hbWUpO1xuXG4gICAgfSk7XG5cblxuXG4gICAgJExBQi5xdWV1ZVdhaXQoZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0wOyBpIDwgbG9jYWxDYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXBwLmNhbGwoJ3Byb3ZpZGVyLicrIGxvY2FsQ2FsbGJhY2tzW2ldKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRMQUIucnVuUXVldWUoKTtcblxuICB9XG5cblxuXG5cbiAgcHJvdmlkZXIuY2FsbENhbGxiYWNrcyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgICBmb3IgKHZhciBpID0wOyBpIDwgcHJvdmlkZXIuY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcHAuY2FsbCgncHJvdmlkZXIuJysgcHJvdmlkZXIuY2FsbGJhY2tzW2ldKTtcbiAgICB9XG4gICAgcHJvdmlkZXIuY2FsbGJhY2tzID0gW107XG4gIH1cblxuXG5cblxuXG4gIHByb3ZpZGVyLmdldFNlbGVjdG9yID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gJ1tkYXRhLXByb3ZpZGV+PVwiJysgc3RyICsnXCJdJztcbiAgICBpZiAoIHN0ci5pbmRleE9mKCckICcpID09IDAgKSB7XG4gICAgICBzZWxlY3RvciA9IHN0ci5zdWJzdHIoMik7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuXG5cblxuICB3aW5kb3cucHJvdmlkZXIgPSBwcm92aWRlcjtcbn0oalF1ZXJ5LCB3aW5kb3cpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc3JjL3Byb3ZpZGVyL3Byb3ZpZGVyLmpzIiwiXG5cbi8vID09PT09PT09PT09PT09PT09PT09PVxuLy8gVGFibGUgcGx1Z2luc1xuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQpe1xuXG5cblxuICBwcm92aWRlci5pbml0VGFibGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBwcm92aWRlci5pbml0Qm9vdHN0cmFwVGFibGUoKTtcblxuICB9O1xuXG5cblxuXG4gIHByb3ZpZGVyLmluaXRCb290c3RyYXBUYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggISAkLmZuLmJvb3RzdHJhcFRhYmxlICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGpRdWVyeS5mbi5ib290c3RyYXBUYWJsZS5kZWZhdWx0cy5jbGFzc2VzID0gJ3RhYmxlJztcblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ3RhYmxlJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykuYm9vdHN0cmFwVGFibGUoKTtcbiAgICB9KTtcblxuXG4gICAgJCgnLmZpeGVkLXRhYmxlLWJvZHknKS5wZXJmZWN0U2Nyb2xsYmFyKCk7XG5cbiAgfTtcblxuXG5cblxuICBwcm92aWRlci5pbml0SnNHcmlkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhICQuZm4uanNHcmlkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfTtcblxuXG5cblxuICBwcm92aWRlci5pbml0RGF0YXRhYmxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggISAkLmZuLkRhdGFUYWJsZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm92aWRlci5wcm92aWRlKCdkYXRhdGFibGVzJywgZnVuY3Rpb24oKXtcbiAgICAgICQodGhpcykuRGF0YVRhYmxlKCk7XG4gICAgfSk7XG5cbiAgfTtcblxuXG5cblxuXG59KGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvdGFibGUuanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBVSSBwbHVnaW5zXG4vLyA9PT09PT09PT09PT09PT09PT09PT1cbi8vXG4rZnVuY3Rpb24oJCl7XG5cblxuXG4gIHByb3ZpZGVyLmluaXRVSXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHByb3ZpZGVyLmluaXRTd2VldGFsZXJ0MigpO1xuICAgIHByb3ZpZGVyLmluaXRBbmltc2l0aW9uKCk7XG4gICAgcHJvdmlkZXIuaW5pdExpdHkoKTtcbiAgICBwcm92aWRlci5pbml0U29ydGFibGUoKTtcbiAgICBwcm92aWRlci5pbml0U2hlcGhlcmQoKTtcbiAgICBwcm92aWRlci5pbml0RmlsdGVyaXpyKCk7XG5cbiAgfTtcblxuXG5cblxuXG4gIHByb3ZpZGVyLmluaXRTd2VldGFsZXJ0MiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggd2luZG93Wydzd2FsJ10gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2VldEFsZXJ0LnNldERlZmF1bHRzKHtcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0biBidG4tYm9sZCBidG4tcHJpbWFyeScsXG4gICAgICBjYW5jZWxCdXR0b25DbGFzczogJ2J0biBidG4tYm9sZCBidG4tc2Vjb25kYXJ5JyxcbiAgICAgIGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxuICAgIH0pO1xuXG4gIH07XG5cblxuXG4gIC8vIEFuaW1zaXRpb24gcGFnZSB0cmFuc2l0aW9uXG4gIC8vXG4gIHByb3ZpZGVyLmluaXRBbmltc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCAhICQuZm4uYW5pbXNpdGlvbiApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcm92aWRlci5wcm92aWRlKCcuYW5pbXNpdGlvbicsIGZ1bmN0aW9uKCl7XG5cbiAgICAgICQodGhpcykuYW5pbXNpdGlvbih7XG4gICAgICAgIGxpbmtFbGVtZW50OiAnW2RhdGEtcHJvdmlkZX49XCJhbmltc2l0aW9uXCJdLCAuYW5pbXNpdGlvbi1saW5rJyxcbiAgICAgICAgbG9hZGluZ0lubmVyOiAnJyxcbiAgICAgIH0pO1xuICAgIH0sIHRydWUpO1xuXG4gIH07XG5cblxuXG5cbiAgLy8gTGl0eVxuICAvL1xuICBwcm92aWRlci5pbml0TGl0eSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggd2luZG93WydsaXR5J10gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2RhdGEtcHJvdmlkZX49XCJsaXR5XCJdJywgbGl0eSk7XG5cbiAgfTtcblxuXG5cblxuICAvLyBEcmFnYWJsZSAvIFNvcnRhYmxlXG4gIC8vXG4gIHByb3ZpZGVyLmluaXRTb3J0YWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggd2luZG93Wydzb3J0YWJsZSddID09PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgnc29ydGFibGUnLCBmdW5jdGlvbihpbmRleCwgZWxlbWVudCl7XG4gICAgICBzb3J0YWJsZShlbGVtZW50LCB7XG4gICAgICAgIGRyYWdJbWFnZTogbnVsbCxcbiAgICAgICAgZm9yY2VQbGFjZWhvbGRlclNpemU6IHRydWUsXG4gICAgICAgIGl0ZW1zOiAkKHRoaXMpLmRhdGFBdHRyKCdpdGVtcycsIG51bGwpLFxuICAgICAgICBoYW5kbGU6ICQodGhpcykuZGF0YUF0dHIoJ3NvcnRhYmxlLWhhbmRsZScsIG51bGwpXG4gICAgICB9KTtcblxuICAgICAgc29ydGFibGUoJCh0aGlzKSlbMF0uYWRkRXZlbnRMaXN0ZW5lcignc29ydHVwZGF0ZScsIGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICBpZiAoICEkKHRoaXMpLmhhc0RhdGFBdHRyKCdvbi1jaGFuZ2UnKSApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2FsbGJhY2sgPSAkKHRoaXMpLmRhdGEoJ29uLWNoYW5nZScpO1xuXG4gICAgICAgIGFwcC5jYWxsKGNhbGxiYWNrLCBlLmRldGFpbCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICB9O1xuXG5cblxuXG4gIC8vIFRvdXJcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdFNoZXBoZXJkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCB3aW5kb3dbJ1NoZXBoZXJkJ10gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBTaGVwaGVyZC5vbignc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICQoJ2JvZHknKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiYXBwLWJhY2tkcm9wIGJhY2tkcm9wLXRvdXJcIj48L2Rpdj4nKTtcbiAgICB9KTtcblxuICAgIFNoZXBoZXJkLm9uKCdpbmFjdGl2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgJCgnLmFwcC1iYWNrZHJvcC5iYWNrZHJvcC10b3VyJykucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgfTtcblxuXG5cblxuICAvLyBTaHVmZmxlXG4gIC8vXG4gIHByb3ZpZGVyLmluaXRTaHVmZmxlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCB3aW5kb3dbJ1NodWZmbGUnXSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBTaHVmZmxlID0gd2luZG93LlNodWZmbGU7XG5cbiAgICBTaHVmZmxlLm9wdGlvbnMuaXRlbVNlbGVjdG9yID0gJ1tkYXRhLXNodWZmbGU9XCJpdGVtXCJdJztcbiAgICBTaHVmZmxlLm9wdGlvbnMuc2l6ZXIgPSAnW2RhdGEtc2h1ZmZsZT1cInNpemVyXCJdJztcbiAgICBTaHVmZmxlLm9wdGlvbnMuZGVsaW1ldGVyID0gJywnO1xuICAgIFNodWZmbGUub3B0aW9ucy5zcGVlZCA9IDUwMDtcblxuXG4gICAgcHJvdmlkZXIucHJvdmlkZSgnc2h1ZmZsZScsIGZ1bmN0aW9uKCl7XG5cbiAgICAgIHZhciBsaXN0ID0gJCh0aGlzKS5maW5kKCdbZGF0YS1zaHVmZmxlPVwibGlzdFwiXScpO1xuICAgICAgdmFyIGZpbHRlciA9ICQodGhpcykuZmluZCgnW2RhdGEtc2h1ZmZsZT1cImZpbHRlclwiXScpO1xuICAgICAgdmFyIHNodWZmbGVJbnN0YW5jZSA9IG5ldyBTaHVmZmxlKGxpc3QpO1xuXG5cblxuICAgICAgaWYgKCBmaWx0ZXIubGVuZ3RoICkge1xuXG4gICAgICAgICQoZmlsdGVyKS5maW5kKCdbZGF0YS1zaHVmZmxlPVwiYnV0dG9uXCJdJykuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBidG4gPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGlzQWN0aXZlID0gYnRuLmhhc0NsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHZhciBidG5Hcm91cCA9IGJ0bi5kYXRhKCdncm91cCcpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJ1tkYXRhLXNodWZmbGU9XCJmaWx0ZXJcIl0nKS5maW5kKCdbZGF0YS1zaHVmZmxlPVwiYnV0dG9uXCJdLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgdmFyIGZpbHRlckdyb3VwO1xuICAgICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgIGJ0bi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgIGZpbHRlckdyb3VwID0gU2h1ZmZsZS5BTExfSVRFTVM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBidG4uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICBmaWx0ZXJHcm91cCA9IGJ0bkdyb3VwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaHVmZmxlSW5zdGFuY2UuZmlsdGVyKGZpbHRlckdyb3VwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuXG4gICAgICAkKCB0aGlzICkuaW1hZ2VzTG9hZGVkKCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2h1ZmZsZUluc3RhbmNlLmxheW91dCgpXG4gICAgICB9ICk7XG5cbiAgICB9KTtcblxuICB9O1xuXG5cblxuXG4gIC8vIFBob3RvU3dpcGVcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdFBob3Rvc3dpcGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi5waG90b1N3aXBlICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ3Bob3Rvc3dpcGUnLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHBob3Rvc3dpcGUgPSAkKHRoaXMpO1xuICAgICAgdmFyIHNlbGVjdG9yID0gJCh0aGlzKS5kYXRhQXR0cignc2xpZGUtc2VsZWN0b3InLCAnaW1nJyk7XG5cbiAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICB2YXIgY2FzdCA9IHtcbiAgICAgICAgZXNjS2V5OiAnYm9vbCcsXG4gICAgICAgIGxvb3A6ICdib29sJyxcbiAgICAgICAgcGluY2hUb0Nsb3NlOiAnYm9vbCcsXG4gICAgICAgIGFycm93S2V5czogJ2Jvb2wnLFxuICAgICAgICBoaXN0b3J5OiAnYm9vbCcsXG4gICAgICAgIG1vZGFsOiAnYm9vbCcsXG4gICAgICAgIGluZGV4OiAnbnVtJyxcbiAgICAgICAgYmdPcGFjaXR5OiAnbnVtJyxcbiAgICAgICAgdGltZVRvSWRsZTogJ251bScsXG4gICAgICAgIHNwYWNpbmc6ICdudW0nLFxuICAgICAgICBzcGFjaW5nOiAnYXJyYXknLFxuICAgICAgfVxuXG4gICAgICBvcHRpb25zID0gJC5leHRlbmQoIG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSwgY2FzdCApKTtcblxuICAgICAgdmFyIGV2ZW50cyA9IHtcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICggcGhvdG9zd2lwZS5oYXNEYXRhQXR0cignb24tY2xvc2UnKSApIHtcbiAgICAgICAgICAgIGFwcC5jYWxsKCBwaG90b3N3aXBlLmRhdGEoJ29uLWNsb3NlJykgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgICQodGhpcykucGhvdG9Td2lwZShzZWxlY3Rvciwgb3B0aW9ucywgZXZlbnRzKTtcbiAgICB9KTtcblxuICB9O1xuXG5cblxuICAvLyBNYWtlIGFuIGVsZW1lbnQgZnVsbHNjcmVlblxuICAvL1xuICBwcm92aWRlci5pbml0RnVsbHNjcmVlbiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggd2luZG93WydzY3JlZW5mdWxsJ10gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoICEgc2NyZWVuZnVsbC5lbmFibGVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzZWxlY3RvciA9ICdbZGF0YS1wcm92aWRlfj1cImZ1bGxzY3JlZW5cIl0nO1xuXG4gICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5kYXRhKCdmdWxsc2NyZWVuLWRlZmF1bHQtaHRtbCcsICQodGhpcykuaHRtbCgpKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NyZWVuZnVsbC5yYXcuZnVsbHNjcmVlbmNoYW5nZSwgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2NyZWVuZnVsbC5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWZ1bGxzY3JlZW4nKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtZnVsbHNjcmVlbicpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgc2VsZWN0b3IsIGZ1bmN0aW9uKCl7XG4gICAgICBzY3JlZW5mdWxsLnRvZ2dsZSgpO1xuICAgIH0pO1xuXG4gIH07XG5cblxuXG4gIC8vIFN3aXBlciBjYXJvdXNlbC9zbGlkZXJcbiAgLy9cbiAgcHJvdmlkZXIuaW5pdFN3aXBlciA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICggd2luZG93WydTd2lwZXInXSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ3N3aXBlcicsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgYXV0b3BsYXk6IDAsXG4gICAgICAgIHNwZWVkOiAxMDAwLFxuICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgIC8vIHdoZW4gd2luZG93IHdpZHRoIGlzIDw9IDY0MHB4XG4gICAgICAgICAgNDgwOiB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgc3dpcGVyID0gJCh0aGlzKTtcblxuICAgICAgaWYgKCBzd2lwZXIuZmluZCgnLnN3aXBlci1idXR0b24tbmV4dCcpLmxlbmd0aCApIHtcbiAgICAgICAgb3B0aW9ucy5uZXh0QnV0dG9uID0gJy5zd2lwZXItYnV0dG9uLW5leHQnO1xuICAgICAgfVxuXG4gICAgICBpZiAoIHN3aXBlci5maW5kKCcuc3dpcGVyLWJ1dHRvbi1wcmV2JykubGVuZ3RoICkge1xuICAgICAgICBvcHRpb25zLnByZXZCdXR0b24gPSAnLnN3aXBlci1idXR0b24tcHJldic7XG4gICAgICB9XG5cbiAgICAgIGlmICggc3dpcGVyLmZpbmQoJy5zd2lwZXItcGFnaW5hdGlvbicpLmxlbmd0aCApIHtcbiAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uID0gJy5zd2lwZXItcGFnaW5hdGlvbic7XG4gICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbkNsaWNrYWJsZSA9IHRydWU7XG5cbiAgICAgICAgc3dpcGVyLmFkZENsYXNzKCdzd2lwZXItcGFnaW5hdGlvbi1vdXRzaWRlJyk7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCggb3B0aW9ucywgYXBwLmdldERhdGFPcHRpb25zKCAkKHRoaXMpICkpO1xuXG4gICAgICBuZXcgU3dpcGVyICggc3dpcGVyLCBvcHRpb25zICk7XG5cbiAgICB9KTtcblxuICB9O1xuXG5cblxuXG59KGpRdWVyeSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zcmMvcHJvdmlkZXIvdWkuanMiLCJcblxuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vLyBVcGxvYWQgcGx1Z2luc1xuLy8gPT09PT09PT09PT09PT09PT09PT09XG4vL1xuK2Z1bmN0aW9uKCQpe1xuXG5cblxuICBwcm92aWRlci5pbml0VXBsb2FkcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcHJvdmlkZXIuaW5pdERyb3BpZnkoKTtcbiAgICBwcm92aWRlci5pbml0RHJvcHpvbmUoKTtcblxuICB9O1xuXG5cbiAgcHJvdmlkZXIuaW5pdERyb3BpZnkgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi5kcm9waWZ5ICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ2Ryb3BpZnknLCBmdW5jdGlvbigpe1xuICAgICAgJCh0aGlzKS5kcm9waWZ5KCk7XG4gICAgfSk7XG5cbiAgfVxuXG5cblxuICBwcm92aWRlci5pbml0RHJvcHpvbmUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoICEgJC5mbi5kcm9wem9uZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBEcm9wem9uZS5hdXRvRGlzY292ZXIgPSBmYWxzZTtcblxuICAgIHByb3ZpZGVyLnByb3ZpZGUoJ2Ryb3B6b25lJywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICBvcHRpb25zID0gJC5leHRlbmQoIG9wdGlvbnMsIGFwcC5nZXREYXRhT3B0aW9ucyggJCh0aGlzKSApKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Ryb3B6b25lJyk7XG4gICAgICAkKHRoaXMpLmRyb3B6b25lKCBvcHRpb25zICk7XG4gICAgfSk7XG5cbiAgfVxuXG5cbn0oalF1ZXJ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9iYWNrL2pzL3NyYy9wcm92aWRlci91cGxvYWQuanMiXSwic291cmNlUm9vdCI6IiJ9