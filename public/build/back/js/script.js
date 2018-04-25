webpackJsonp([2],{

/***/ "./assets/back/js/script/config.js":
/*!*****************************************!*\
  !*** ./assets/back/js/script/config.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


app.config({

  /*
  |--------------------------------------------------------------------------
  | Provide
  |--------------------------------------------------------------------------
  |
  | Specify an array of the name of vendors that should be load in all pages.
  | Visit following URL to see a list of available vendors.
  |
  | https://thetheme.io/theadmin/help/article-dependency-injection.html#provider-list
  |
  */

  provide: ['typeahead'],

  /*
  |--------------------------------------------------------------------------
  | Google API Key
  |--------------------------------------------------------------------------
  |
  | Here you may specify your Google API key if you need to use Google Maps
  | in your application
  |
  | Warning: You should replace the following value with your own Api Key.
  | Since this is our own API Key, we can't guarantee that this value always
  | works for you.
  |
  | https://developers.google.com/maps/documentation/javascript/get-api-key
  |
  */

  googleApiKey: 'AIzaSyDRBLFOTTh2NFM93HpUA4ZrA99yKnCAsto',

  /*
  |--------------------------------------------------------------------------
  | Google Analytics Tracking
  |--------------------------------------------------------------------------
  |
  | If you want to use Google Analytics, you can specify your Tracking ID in
  | this option. Your key would be a value like: UA-12345678-9
  |
  */

  googleAnalyticsId: '',

  /*
  |--------------------------------------------------------------------------
  | Smooth Scroll
  |--------------------------------------------------------------------------
  |
  | By changing the value of this option to true, the browser's scrollbar
  | moves smoothly on scroll.
  |
  */

  smoothScroll: false,

  /*
  |--------------------------------------------------------------------------
  | Save States
  |--------------------------------------------------------------------------
  |
  | If you turn on this option, we save the state of your application to load
  | them on the next visit (e.g. make topbar fixed).
  |
  | Supported states: Topbar fix, Sidebar fold
  |
  */

  saveState: false

});

/***/ }),

/***/ "./assets/back/js/script/main.js":
/*!***************************************!*\
  !*** ./assets/back/js/script/main.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./config */ "./assets/back/js/script/config.js");
__webpack_require__(/*! ./util.js */ "./assets/back/js/script/util.js");

/*
|--------------------------------------------------------------------------
| Application Is Ready
|--------------------------------------------------------------------------
|
| When all the dependencies of the page are loaded and executed,
| the application automatically call this function. You can consider it as
| a replacer for jQuery ready function - "$( document ).ready()".
|
*/

app.ready(function () {

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | Import initialization of plugins that used in your application
  |
  */

  __webpack_require__(/*! ./plugins/typeahead.js */ "./assets/back/js/script/plugins/typeahead.js");

  /*
  |--------------------------------------------------------------------------
  | Paritials
  |--------------------------------------------------------------------------
  |
  | Import your main application code
  |
  */

  __webpack_require__(/*! ./partials/notification.js */ "./assets/back/js/script/partials/notification.js");
  __webpack_require__(/*! ./partials/color-changer.js */ "./assets/back/js/script/partials/color-changer.js");
  __webpack_require__(/*! ./partials/icon.js */ "./assets/back/js/script/partials/icon.js");
  __webpack_require__(/*! ./partials/quickview.js */ "./assets/back/js/script/partials/quickview.js");
  __webpack_require__(/*! ./partials/sidebar.js */ "./assets/back/js/script/partials/sidebar.js");
  __webpack_require__(/*! ./partials/timeline.js */ "./assets/back/js/script/partials/timeline.js");
});

/***/ }),

/***/ "./assets/back/js/script/partials/color-changer.js":
/*!*********************************************************!*\
  !*** ./assets/back/js/script/partials/color-changer.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/*
|--------------------------------------------------------------------------
| Color Changer
|--------------------------------------------------------------------------
|
| This is a tiny code to implement color changer for our demonstrations.
|
*/

var demo_colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'purple', 'pink', 'cyan', 'yellow', 'brown', 'dark'];

/*
 * Color changer using base pallet name
 */
$('[data-provide~="demo-color-changer"]').each(function () {
  var target = $(this).data('target'),
      baseClass = $(this).data('base-class'),
      html = '',
      name = $(this).dataAttr('name', ''),
      checked = $(this).dataAttr('checked', ''),
      exclude = $(this).dataAttr('exclude', ''),
      prefix = '';

  if ($(this).hasDataAttr('pale')) {
    prefix = 'pale-';
  }

  if (name == '') {
    name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  }

  html = '<div class="color-selector color-selector-sm">';

  $.each(demo_colors, function (i, key) {

    // Check if we need to exclude any code
    if (exclude.indexOf(key) > -1) {
      return;
    }

    var color = prefix + key;
    html += '<label' + (prefix === 'pale-' ? ' class="inverse"' : '') + '><input type="radio" value="' + color + '" name="' + name + '"' + (checked === key ? ' checked' : '') + '><span class="bg-' + color + '"></span></label>';
  });

  html += '</div>';

  $(this).replaceWith(html);

  // Listen to the change event of checkboxes
  $(document).on('change', 'input[name="' + name + '"]', function () {
    var val = $('input[name="' + name + '"]:checked').val();
    $(target).attr('class', baseClass + val);
  });
});

/***/ }),

/***/ "./assets/back/js/script/partials/icon.js":
/*!************************************************!*\
  !*** ./assets/back/js/script/partials/icon.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/*
|--------------------------------------------------------------------------
| Icons
|--------------------------------------------------------------------------
|
| Handle some behaviors in icons demo page
|
*/

$(document).on('change', '#icon-font-changer', function () {
  var size = $(this).find('option:selected').text();
  $('.demo-icons-list').attr('class', 'demo-icons-list icons-size-' + size);
});

$(document).on('mouseenter', '.demo-icons-list li', function () {
  var value = $(this).dataAttr('clipboard-text');
  $('#icon-selected').removeClass('text-secondary text-danger').addClass('text-info').text(value);
});

$(document).on('click', '.demo-icons-list li', function () {
  var value = $(this).dataAttr('clipboard-text');
  value += '<small class="sidetitle">COPIED</small>';
  $('#icon-selected').removeClass('text-secondary text-info').addClass('text-danger').html(value);
});

$(document).on('mouseleave', '.demo-icons-list', function () {
  $('#icon-selected').removeClass('text-info text-danger').addClass('text-secondary').text('Click an icon to copy the class name');
});

// Search
$.expr.pseudos.iconsSearch = function (a, i, m) {
  return $(a).dataAttr('clipboard-text').toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

$('#icons-search-input').on('keyup', function (e) {
  var s = $(this).val().trim(),
      icons = $(".tab-pane:not(#tab-search-result) .demo-icons-list li"),
      tabular = $('#icon-tabs').length;

  if (!tabular) {
    icons = $(".demo-icons-list li");
  }

  if (s === '') {
    icons.show();
    $('#icon-tabs li:eq(1) a').tab('show');
  } else {
    icons.not(':iconsSearch(' + s + ')').hide();
    icons.filter(':iconsSearch(' + s + ')').show();

    if (tabular) {
      // Show results in another tab
      $('#tab-search-result ul').html(icons.filter(':iconsSearch(' + s + ')').outerHTML());
      $('#icon-tabs li:first a').tab('show');
    }
  }
});

// Remove search results on change tab
$('#icon-tabs li:first a').on('hide.bs.tab', function () {
  $('#icons-search-input').val('');
  $(".demo-icons-list li").show();
});

/***/ }),

/***/ "./assets/back/js/script/partials/notification.js":
/*!********************************************************!*\
  !*** ./assets/back/js/script/partials/notification.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



/*
 * Display a warning when the page opened using "file" protocol
 */
if (location.protocol == 'file:') {
  app.toast('Please open the page using "http" protocol for full functionality.', {
    duration: 15000,
    actionTitle: 'Read more',
    actionUrl: ''
  });
}

/***/ }),

/***/ "./assets/back/js/script/partials/quickview.js":
/*!*****************************************************!*\
  !*** ./assets/back/js/script/partials/quickview.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/*
 * Setting tab in the global quickview (#qv-global)
 */

// Topbar background color
$(document).on('change', 'input[name="global-topbar-color"]', function () {
  var val = $('input[name="global-topbar-color"]:checked').val();
  if (val == 'default') {
    $('body > .topbar').removeClass('topbar-inverse').css('background-color', '#fff');
  } else {
    $('body > .topbar').addClass('topbar-inverse').css('background-color', '#' + val);
  }
});

// Sidebar background color
$(document).on('change', 'input[name="global-sidebar-color"]', function () {
  var val = $('input[name="global-sidebar-color"]:checked').val();
  $('.sidebar').removeClass('sidebar-light sidebar-dark sidebar-default');
  $('.sidebar').addClass('sidebar-' + val);
});

// Sidebar menu color
$(document).on('change', 'input[name="global-sidebar-menu-color"]', function () {
  var val = $('input[name="global-sidebar-menu-color"]:checked').val();
  $(".sidebar").removeClass(function (index, className) {
    return (className.match(/(^|\s)sidebar-color-\S+/g) || []).join(' ');
  }).addClass('sidebar-color-' + val);
});

/***/ }),

/***/ "./assets/back/js/script/partials/sidebar.js":
/*!***************************************************!*\
  !*** ./assets/back/js/script/partials/sidebar.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/*
|--------------------------------------------------------------------------
| Sidebar
|--------------------------------------------------------------------------
|
| Handle some behaviors in sidebar demo page
|
*/

// Reset button
$(document).on('click', '#sidebar-reset-btn', function () {
  $('.sidebar').attr('class', 'sidebar');
  $('.sidebar-header').removeClass('sidebar-header-inverse');
  $('.sidebar .menu').attr('class', 'menu');
  $('body').removeClass('sidebar-folded');
});

// Header background color
$(document).on('change', 'input[name="sidebar-header-bg-color"]', function () {
  var val = $('input[name="sidebar-header-bg-color"]:checked').val();
  $('.sidebar-header').css('background-color', val);
});

/***/ }),

/***/ "./assets/back/js/script/partials/timeline.js":
/*!****************************************************!*\
  !*** ./assets/back/js/script/partials/timeline.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/*
|--------------------------------------------------------------------------
| Timeline
|--------------------------------------------------------------------------
|
| Handle some behaviors in timelines demo page
|
*/

// Content position
$(document).on('click', '#timeline-alignment-selector .btn', function () {
  var val = $(this).children('input').val();
  $('#demo-timeline-alignment').attr('class', 'timeline timeline-content-' + val);
});

// Point size
$(document).on('click', '#timeline-size-selector .btn', function () {
  var val = $(this).children('input').val();
  $('#demo-timeline-size').attr('class', 'timeline timeline-content-right timeline-point-' + val);
});

/***/ }),

/***/ "./assets/back/js/script/plugins/typeahead.js":
/*!****************************************************!*\
  !*** ./assets/back/js/script/plugins/typeahead.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {


/*
 * Search in Theadmin components
 */
if (window["Bloodhound"]) {
  var theadminComponents = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('tokens'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
      url: app.dir.assets + 'data/json/files.json',
      cache: false
    }
  });

  $('#theadmin-search input').typeahead(null, {
    name: 'theadmin-components',
    display: 'title',
    source: theadminComponents,
    templates: {
      suggestion: function suggestion(data) {
        return '<a href="' + location.origin + '/' + data.url + '"><h6 class="mb-1">' + data.title + '</h6><small>' + data.description + '</small></a>';
      }
    }
  });

  $('#theadmin-search input').bind('typeahead:select', function (ev, data) {
    window.location.href = location.origin + '/' + data.url;
  });

  $('#theadmin-search input').bind('typeahead:open', function (ev, data) {
    $(this).closest('#theadmin-search').find('.lookup-placeholder span').css('opacity', '0');
  });

  $('#theadmin-search input').bind('typeahead:close', function (ev, data) {
    if ($(this).val() == "") {
      $(this).closest('#theadmin-search').find('.lookup-placeholder span').css('opacity', '1');
    }
  });
}

/***/ }),

/***/ "./assets/back/js/script/util.js":
/*!***************************************!*\
  !*** ./assets/back/js/script/util.js ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {



/***/ })

},["./assets/back/js/script/main.js"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zY3JpcHQvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NjcmlwdC9tYWluLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NjcmlwdC9wYXJ0aWFscy9jb2xvci1jaGFuZ2VyLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NjcmlwdC9wYXJ0aWFscy9pY29uLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9iYWNrL2pzL3NjcmlwdC9wYXJ0aWFscy9ub3RpZmljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc2NyaXB0L3BhcnRpYWxzL3F1aWNrdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zY3JpcHQvcGFydGlhbHMvc2lkZWJhci5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvYmFjay9qcy9zY3JpcHQvcGFydGlhbHMvdGltZWxpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2JhY2svanMvc2NyaXB0L3BsdWdpbnMvdHlwZWFoZWFkLmpzIl0sIm5hbWVzIjpbImFwcCIsImNvbmZpZyIsInByb3ZpZGUiLCJnb29nbGVBcGlLZXkiLCJnb29nbGVBbmFseXRpY3NJZCIsInNtb290aFNjcm9sbCIsInNhdmVTdGF0ZSIsInJlcXVpcmUiLCJyZWFkeSIsImRlbW9fY29sb3JzIiwiJCIsImVhY2giLCJ0YXJnZXQiLCJkYXRhIiwiYmFzZUNsYXNzIiwiaHRtbCIsIm5hbWUiLCJkYXRhQXR0ciIsImNoZWNrZWQiLCJleGNsdWRlIiwicHJlZml4IiwiaGFzRGF0YUF0dHIiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJyZXBsYWNlIiwic3Vic3RyIiwiaSIsImtleSIsImluZGV4T2YiLCJjb2xvciIsInJlcGxhY2VXaXRoIiwiZG9jdW1lbnQiLCJvbiIsInZhbCIsImF0dHIiLCJzaXplIiwiZmluZCIsInRleHQiLCJ2YWx1ZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJleHByIiwicHNldWRvcyIsImljb25zU2VhcmNoIiwiYSIsIm0iLCJ0b1VwcGVyQ2FzZSIsImUiLCJzIiwidHJpbSIsImljb25zIiwidGFidWxhciIsImxlbmd0aCIsInNob3ciLCJ0YWIiLCJub3QiLCJoaWRlIiwiZmlsdGVyIiwib3V0ZXJIVE1MIiwibG9jYXRpb24iLCJwcm90b2NvbCIsInRvYXN0IiwiZHVyYXRpb24iLCJhY3Rpb25UaXRsZSIsImFjdGlvblVybCIsImNzcyIsImluZGV4IiwiY2xhc3NOYW1lIiwibWF0Y2giLCJqb2luIiwiY2hpbGRyZW4iLCJ3aW5kb3ciLCJ0aGVhZG1pbkNvbXBvbmVudHMiLCJCbG9vZGhvdW5kIiwiZGF0dW1Ub2tlbml6ZXIiLCJ0b2tlbml6ZXJzIiwib2JqIiwid2hpdGVzcGFjZSIsInF1ZXJ5VG9rZW5pemVyIiwicHJlZmV0Y2giLCJ1cmwiLCJkaXIiLCJhc3NldHMiLCJjYWNoZSIsInR5cGVhaGVhZCIsImRpc3BsYXkiLCJzb3VyY2UiLCJ0ZW1wbGF0ZXMiLCJzdWdnZXN0aW9uIiwib3JpZ2luIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImJpbmQiLCJldiIsImhyZWYiLCJjbG9zZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBQSxJQUFJQyxNQUFKLENBQVc7O0FBRVQ7Ozs7Ozs7Ozs7OztBQVlBQyxXQUFTLENBQUMsV0FBRCxDQWRBOztBQWdCVDs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQUMsZ0JBQWMseUNBaENMOztBQWtDVDs7Ozs7Ozs7OztBQVVBQyxxQkFBbUIsRUE1Q1Y7O0FBOENUOzs7Ozs7Ozs7O0FBVUFDLGdCQUFjLEtBeERMOztBQTBEVDs7Ozs7Ozs7Ozs7O0FBWUFDLGFBQVc7O0FBdEVGLENBQVgsRTs7Ozs7Ozs7Ozs7OztBQ0RBOztBQUlBLG1CQUFBQyxDQUFRLG1EQUFSO0FBQ0EsbUJBQUFBLENBQVEsa0RBQVI7O0FBSUE7Ozs7Ozs7Ozs7O0FBV0FQLElBQUlRLEtBQUos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RzlFLEtBQUsrRSxXQUFyRyxHQUFrSCxjQUF6SDtBQUNEO0FBSFE7QUFKK0IsR0FBNUM7O0FBV0FsRixJQUFFLHdCQUFGLEVBQTRCbUYsSUFBNUIsQ0FBaUMsa0JBQWpDLEVBQXFELFVBQVNDLEVBQVQsRUFBYWpGLElBQWIsRUFBbUI7QUFDdEUyRCxXQUFPWixRQUFQLENBQWdCbUMsSUFBaEIsR0FBdUJuQyxTQUFTOEIsTUFBVCxHQUFpQixHQUFqQixHQUFzQjdFLEtBQUtvRSxHQUFsRDtBQUNELEdBRkQ7O0FBSUF2RSxJQUFFLHdCQUFGLEVBQTRCbUYsSUFBNUIsQ0FBaUMsZ0JBQWpDLEVBQW1ELFVBQVNDLEVBQVQsRUFBYWpGLElBQWIsRUFBbUI7QUFDcEVILE1BQUUsSUFBRixFQUFRc0YsT0FBUixDQUFnQixrQkFBaEIsRUFBb0MzRCxJQUFwQyxDQUF5QywwQkFBekMsRUFBcUU2QixHQUFyRSxDQUF5RSxTQUF6RSxFQUFvRixHQUFwRjtBQUNELEdBRkQ7O0FBSUF4RCxJQUFFLHdCQUFGLEVBQTRCbUYsSUFBNUIsQ0FBaUMsaUJBQWpDLEVBQW9ELFVBQVNDLEVBQVQsRUFBYWpGLElBQWIsRUFBbUI7QUFDckUsUUFBS0gsRUFBRSxJQUFGLEVBQVF3QixHQUFSLE1BQWlCLEVBQXRCLEVBQTJCO0FBQ3pCeEIsUUFBRSxJQUFGLEVBQVFzRixPQUFSLENBQWdCLGtCQUFoQixFQUFvQzNELElBQXBDLENBQXlDLDBCQUF6QyxFQUFxRTZCLEdBQXJFLENBQXlFLFNBQXpFLEVBQW9GLEdBQXBGO0FBQ0Q7QUFDRixHQUpEO0FBS0QsQyIsImZpbGUiOiJqcy9zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmFwcC5jb25maWcoe1xuXG4gIC8qXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8IFByb3ZpZGVcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBTcGVjaWZ5IGFuIGFycmF5IG9mIHRoZSBuYW1lIG9mIHZlbmRvcnMgdGhhdCBzaG91bGQgYmUgbG9hZCBpbiBhbGwgcGFnZXMuXG4gIHwgVmlzaXQgZm9sbG93aW5nIFVSTCB0byBzZWUgYSBsaXN0IG9mIGF2YWlsYWJsZSB2ZW5kb3JzLlxuICB8XG4gIHwgaHR0cHM6Ly90aGV0aGVtZS5pby90aGVhZG1pbi9oZWxwL2FydGljbGUtZGVwZW5kZW5jeS1pbmplY3Rpb24uaHRtbCNwcm92aWRlci1saXN0XG4gIHxcbiAgKi9cblxuICBwcm92aWRlOiBbJ3R5cGVhaGVhZCddLFxuXG4gIC8qXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8IEdvb2dsZSBBUEkgS2V5XG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8XG4gIHwgSGVyZSB5b3UgbWF5IHNwZWNpZnkgeW91ciBHb29nbGUgQVBJIGtleSBpZiB5b3UgbmVlZCB0byB1c2UgR29vZ2xlIE1hcHNcbiAgfCBpbiB5b3VyIGFwcGxpY2F0aW9uXG4gIHxcbiAgfCBXYXJuaW5nOiBZb3Ugc2hvdWxkIHJlcGxhY2UgdGhlIGZvbGxvd2luZyB2YWx1ZSB3aXRoIHlvdXIgb3duIEFwaSBLZXkuXG4gIHwgU2luY2UgdGhpcyBpcyBvdXIgb3duIEFQSSBLZXksIHdlIGNhbid0IGd1YXJhbnRlZSB0aGF0IHRoaXMgdmFsdWUgYWx3YXlzXG4gIHwgd29ya3MgZm9yIHlvdS5cbiAgfFxuICB8IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2dldC1hcGkta2V5XG4gIHxcbiAgKi9cblxuICBnb29nbGVBcGlLZXk6ICdBSXphU3lEUkJMRk9UVGgyTkZNOTNIcFVBNFpyQTk5eUtuQ0FzdG8nLFxuXG4gIC8qXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8IEdvb2dsZSBBbmFseXRpY3MgVHJhY2tpbmdcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBJZiB5b3Ugd2FudCB0byB1c2UgR29vZ2xlIEFuYWx5dGljcywgeW91IGNhbiBzcGVjaWZ5IHlvdXIgVHJhY2tpbmcgSUQgaW5cbiAgfCB0aGlzIG9wdGlvbi4gWW91ciBrZXkgd291bGQgYmUgYSB2YWx1ZSBsaWtlOiBVQS0xMjM0NTY3OC05XG4gIHxcbiAgKi9cblxuICBnb29nbGVBbmFseXRpY3NJZDogJycsXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgU21vb3RoIFNjcm9sbFxuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IEJ5IGNoYW5naW5nIHRoZSB2YWx1ZSBvZiB0aGlzIG9wdGlvbiB0byB0cnVlLCB0aGUgYnJvd3NlcidzIHNjcm9sbGJhclxuICB8IG1vdmVzIHNtb290aGx5IG9uIHNjcm9sbC5cbiAgfFxuICAqL1xuXG4gIHNtb290aFNjcm9sbDogZmFsc2UsXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgU2F2ZSBTdGF0ZXNcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHxcbiAgfCBJZiB5b3UgdHVybiBvbiB0aGlzIG9wdGlvbiwgd2Ugc2F2ZSB0aGUgc3RhdGUgb2YgeW91ciBhcHBsaWNhdGlvbiB0byBsb2FkXG4gIHwgdGhlbSBvbiB0aGUgbmV4dCB2aXNpdCAoZS5nLiBtYWtlIHRvcGJhciBmaXhlZCkuXG4gIHxcbiAgfCBTdXBwb3J0ZWQgc3RhdGVzOiBUb3BiYXIgZml4LCBTaWRlYmFyIGZvbGRcbiAgfFxuICAqL1xuXG4gIHNhdmVTdGF0ZTogZmFsc2UsXG5cblxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zY3JpcHQvY29uZmlnLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxucmVxdWlyZSgnLi9jb25maWcnKTtcbnJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG5cblxuLypcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBBcHBsaWNhdGlvbiBJcyBSZWFkeVxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58XG58IFdoZW4gYWxsIHRoZSBkZXBlbmRlbmNpZXMgb2YgdGhlIHBhZ2UgYXJlIGxvYWRlZCBhbmQgZXhlY3V0ZWQsXG58IHRoZSBhcHBsaWNhdGlvbiBhdXRvbWF0aWNhbGx5IGNhbGwgdGhpcyBmdW5jdGlvbi4gWW91IGNhbiBjb25zaWRlciBpdCBhc1xufCBhIHJlcGxhY2VyIGZvciBqUXVlcnkgcmVhZHkgZnVuY3Rpb24gLSBcIiQoIGRvY3VtZW50ICkucmVhZHkoKVwiLlxufFxuKi9cblxuYXBwLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG5cbiAgLypcbiAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHwgUGx1Z2luc1xuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IEltcG9ydCBpbml0aWFsaXphdGlvbiBvZiBwbHVnaW5zIHRoYXQgdXNlZCBpbiB5b3VyIGFwcGxpY2F0aW9uXG4gIHxcbiAgKi9cblxuICByZXF1aXJlKCcuL3BsdWdpbnMvdHlwZWFoZWFkLmpzJyk7XG5cblxuXG4gIC8qXG4gIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB8IFBhcml0aWFsc1xuICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgfFxuICB8IEltcG9ydCB5b3VyIG1haW4gYXBwbGljYXRpb24gY29kZVxuICB8XG4gICovXG5cbiAgcmVxdWlyZSgnLi9wYXJ0aWFscy9ub3RpZmljYXRpb24uanMnKTtcbiAgcmVxdWlyZSgnLi9wYXJ0aWFscy9jb2xvci1jaGFuZ2VyLmpzJyk7XG4gIHJlcXVpcmUoJy4vcGFydGlhbHMvaWNvbi5qcycpO1xuICByZXF1aXJlKCcuL3BhcnRpYWxzL3F1aWNrdmlldy5qcycpO1xuICByZXF1aXJlKCcuL3BhcnRpYWxzL3NpZGViYXIuanMnKTtcbiAgcmVxdWlyZSgnLi9wYXJ0aWFscy90aW1lbGluZS5qcycpO1xuXG5cbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc2NyaXB0L21haW4uanMiLCJcbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29sb3IgQ2hhbmdlclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58XG58IFRoaXMgaXMgYSB0aW55IGNvZGUgdG8gaW1wbGVtZW50IGNvbG9yIGNoYW5nZXIgZm9yIG91ciBkZW1vbnN0cmF0aW9ucy5cbnxcbiovXG5cbnZhciBkZW1vX2NvbG9ycyA9IFsncHJpbWFyeScsICdzZWNvbmRhcnknLCAnc3VjY2VzcycsICdpbmZvJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgJ3B1cnBsZScsICdwaW5rJywgJ2N5YW4nLCAneWVsbG93JywgJ2Jyb3duJywgJ2RhcmsnXTtcblxuXG4vKlxuICogQ29sb3IgY2hhbmdlciB1c2luZyBiYXNlIHBhbGxldCBuYW1lXG4gKi9cbiQoJ1tkYXRhLXByb3ZpZGV+PVwiZGVtby1jb2xvci1jaGFuZ2VyXCJdJykuZWFjaChmdW5jdGlvbigpe1xuICB2YXIgdGFyZ2V0ICAgID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSxcbiAgICAgIGJhc2VDbGFzcyA9ICQodGhpcykuZGF0YSgnYmFzZS1jbGFzcycpLFxuICAgICAgaHRtbCAgICAgID0gJycsXG4gICAgICBuYW1lICAgICAgPSAkKHRoaXMpLmRhdGFBdHRyKCduYW1lJywgJycpLFxuICAgICAgY2hlY2tlZCAgID0gJCh0aGlzKS5kYXRhQXR0cignY2hlY2tlZCcsICcnKSxcbiAgICAgIGV4Y2x1ZGUgICA9ICQodGhpcykuZGF0YUF0dHIoJ2V4Y2x1ZGUnLCAnJyksXG4gICAgICBwcmVmaXggICAgPSAnJztcblxuICBpZiAoICQodGhpcykuaGFzRGF0YUF0dHIoJ3BhbGUnKSApIHtcbiAgICBwcmVmaXggPSAncGFsZS0nO1xuICB9XG5cbiAgaWYgKCBuYW1lID09ICcnICkge1xuICAgIG5hbWUgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKC9bXmEtel0rL2csICcnKS5zdWJzdHIoMCwgNSk7XG4gIH1cblxuICBodG1sID0gJzxkaXYgY2xhc3M9XCJjb2xvci1zZWxlY3RvciBjb2xvci1zZWxlY3Rvci1zbVwiPic7XG5cbiAgJC5lYWNoKCBkZW1vX2NvbG9ycywgZnVuY3Rpb24oaSwga2V5KXtcblxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gZXhjbHVkZSBhbnkgY29kZVxuICAgIGlmICggZXhjbHVkZS5pbmRleE9mKGtleSkgPiAtMSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY29sb3IgPSBwcmVmaXggKyBrZXk7XG4gICAgaHRtbCArPSAnPGxhYmVsJysgKHByZWZpeCA9PT0gJ3BhbGUtJyA/ICcgY2xhc3M9XCJpbnZlcnNlXCInIDogJycpICsnPjxpbnB1dCB0eXBlPVwicmFkaW9cIiB2YWx1ZT1cIidcbiAgICAgICAgICsgY29sb3IgKydcIiBuYW1lPVwiJysgbmFtZSArJ1wiJysgKGNoZWNrZWQgPT09IGtleSA/ICcgY2hlY2tlZCcgOiAnJykgKyc+PHNwYW4gY2xhc3M9XCJiZy0nXG4gICAgICAgICArIGNvbG9yICsnXCI+PC9zcGFuPjwvbGFiZWw+JztcbiAgfSk7XG5cbiAgaHRtbCArPSAnPC9kaXY+JztcblxuICAkKHRoaXMpLnJlcGxhY2VXaXRoKGh0bWwpO1xuXG4gIC8vIExpc3RlbiB0byB0aGUgY2hhbmdlIGV2ZW50IG9mIGNoZWNrYm94ZXNcbiAgJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdpbnB1dFtuYW1lPVwiJysgbmFtZSArJ1wiXScsIGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZhbCA9ICQoJ2lucHV0W25hbWU9XCInKyBuYW1lICsnXCJdOmNoZWNrZWQnKS52YWwoKTtcbiAgICAkKHRhcmdldCkuYXR0cignY2xhc3MnLCBiYXNlQ2xhc3MgKyB2YWwpO1xuICB9KTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc2NyaXB0L3BhcnRpYWxzL2NvbG9yLWNoYW5nZXIuanMiLCJcbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgSWNvbnNcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufFxufCBIYW5kbGUgc29tZSBiZWhhdmlvcnMgaW4gaWNvbnMgZGVtbyBwYWdlXG58XG4qL1xuXG4kKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNpY29uLWZvbnQtY2hhbmdlcicsIGZ1bmN0aW9uKCkge1xuICB2YXIgc2l6ZSA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykudGV4dCgpO1xuICAkKCcuZGVtby1pY29ucy1saXN0JykuYXR0cignY2xhc3MnLCAnZGVtby1pY29ucy1saXN0IGljb25zLXNpemUtJysgc2l6ZSk7XG59KTtcblxuJChkb2N1bWVudCkub24oJ21vdXNlZW50ZXInLCAnLmRlbW8taWNvbnMtbGlzdCBsaScsIGZ1bmN0aW9uKCl7XG4gIHZhciB2YWx1ZSA9ICQodGhpcykuZGF0YUF0dHIoJ2NsaXBib2FyZC10ZXh0Jyk7XG4gICQoJyNpY29uLXNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3RleHQtc2Vjb25kYXJ5IHRleHQtZGFuZ2VyJykuYWRkQ2xhc3MoJ3RleHQtaW5mbycpLnRleHQodmFsdWUpO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZGVtby1pY29ucy1saXN0IGxpJywgZnVuY3Rpb24oKXtcbiAgdmFyIHZhbHVlID0gJCh0aGlzKS5kYXRhQXR0cignY2xpcGJvYXJkLXRleHQnKTtcbiAgdmFsdWUgKz0gJzxzbWFsbCBjbGFzcz1cInNpZGV0aXRsZVwiPkNPUElFRDwvc21hbGw+JztcbiAgJCgnI2ljb24tc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygndGV4dC1zZWNvbmRhcnkgdGV4dC1pbmZvJykuYWRkQ2xhc3MoJ3RleHQtZGFuZ2VyJykuaHRtbCh2YWx1ZSk7XG59KTtcblxuJChkb2N1bWVudCkub24oJ21vdXNlbGVhdmUnLCAnLmRlbW8taWNvbnMtbGlzdCcsIGZ1bmN0aW9uKCl7XG4gICQoJyNpY29uLXNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3RleHQtaW5mbyB0ZXh0LWRhbmdlcicpLmFkZENsYXNzKCd0ZXh0LXNlY29uZGFyeScpLnRleHQoJ0NsaWNrIGFuIGljb24gdG8gY29weSB0aGUgY2xhc3MgbmFtZScpO1xufSk7XG5cbi8vIFNlYXJjaFxuJC5leHByLnBzZXVkb3MuaWNvbnNTZWFyY2ggPSBmdW5jdGlvbihhLCBpLCBtKSB7XG4gIHJldHVybiAkKGEpLmRhdGFBdHRyKCdjbGlwYm9hcmQtdGV4dCcpLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihtWzNdLnRvVXBwZXJDYXNlKCkpID49IDA7XG59O1xuXG4kKCcjaWNvbnMtc2VhcmNoLWlucHV0Jykub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICB2YXIgcyAgICAgICA9ICQodGhpcykudmFsKCkudHJpbSgpLFxuICAgICAgaWNvbnMgICA9ICQoXCIudGFiLXBhbmU6bm90KCN0YWItc2VhcmNoLXJlc3VsdCkgLmRlbW8taWNvbnMtbGlzdCBsaVwiKSxcbiAgICAgIHRhYnVsYXIgPSAkKCcjaWNvbi10YWJzJykubGVuZ3RoO1xuXG4gIGlmICggIXRhYnVsYXIgKSB7XG4gICAgaWNvbnMgPSAkKFwiLmRlbW8taWNvbnMtbGlzdCBsaVwiKVxuICB9XG5cbiAgaWYgKHMgPT09ICcnKSB7XG4gICAgaWNvbnMuc2hvdygpO1xuICAgICQoJyNpY29uLXRhYnMgbGk6ZXEoMSkgYScpLnRhYignc2hvdycpO1xuICB9XG4gIGVsc2Uge1xuICAgIGljb25zLm5vdCgnOmljb25zU2VhcmNoKCcgKyBzICsgJyknKS5oaWRlKCk7XG4gICAgaWNvbnMuZmlsdGVyKCc6aWNvbnNTZWFyY2goJyArIHMgKyAnKScpLnNob3coKTtcblxuICAgIGlmICggdGFidWxhciApIHtcbiAgICAgIC8vIFNob3cgcmVzdWx0cyBpbiBhbm90aGVyIHRhYlxuICAgICAgJCgnI3RhYi1zZWFyY2gtcmVzdWx0IHVsJykuaHRtbCggaWNvbnMuZmlsdGVyKCc6aWNvbnNTZWFyY2goJyArIHMgKyAnKScpLm91dGVySFRNTCgpICk7XG4gICAgICAkKCcjaWNvbi10YWJzIGxpOmZpcnN0IGEnKS50YWIoJ3Nob3cnKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBSZW1vdmUgc2VhcmNoIHJlc3VsdHMgb24gY2hhbmdlIHRhYlxuJCgnI2ljb24tdGFicyBsaTpmaXJzdCBhJykub24oJ2hpZGUuYnMudGFiJywgZnVuY3Rpb24oKSB7XG4gICQoJyNpY29ucy1zZWFyY2gtaW5wdXQnKS52YWwoJycpO1xuICAkKFwiLmRlbW8taWNvbnMtbGlzdCBsaVwiKS5zaG93KCk7XG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc2NyaXB0L3BhcnRpYWxzL2ljb24uanMiLCJcblxuLypcbiAqIERpc3BsYXkgYSB3YXJuaW5nIHdoZW4gdGhlIHBhZ2Ugb3BlbmVkIHVzaW5nIFwiZmlsZVwiIHByb3RvY29sXG4gKi9cbmlmICggbG9jYXRpb24ucHJvdG9jb2wgPT0gJ2ZpbGU6JyApIHtcbiAgYXBwLnRvYXN0KCdQbGVhc2Ugb3BlbiB0aGUgcGFnZSB1c2luZyBcImh0dHBcIiBwcm90b2NvbCBmb3IgZnVsbCBmdW5jdGlvbmFsaXR5LicsIHtcbiAgICBkdXJhdGlvbjogMTUwMDAsXG4gICAgYWN0aW9uVGl0bGU6ICdSZWFkIG1vcmUnLFxuICAgIGFjdGlvblVybDogJydcbiAgfSlcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc2NyaXB0L3BhcnRpYWxzL25vdGlmaWNhdGlvbi5qcyIsIlxuLypcbiAqIFNldHRpbmcgdGFiIGluIHRoZSBnbG9iYWwgcXVpY2t2aWV3ICgjcXYtZ2xvYmFsKVxuICovXG5cbi8vIFRvcGJhciBiYWNrZ3JvdW5kIGNvbG9yXG4kKGRvY3VtZW50KS5vbignY2hhbmdlJywgJ2lucHV0W25hbWU9XCJnbG9iYWwtdG9wYmFyLWNvbG9yXCJdJywgZnVuY3Rpb24oKXtcbiAgdmFyIHZhbCA9ICQoJ2lucHV0W25hbWU9XCJnbG9iYWwtdG9wYmFyLWNvbG9yXCJdOmNoZWNrZWQnKS52YWwoKTtcbiAgaWYgKCB2YWwgPT0gJ2RlZmF1bHQnICkge1xuICAgICQoJ2JvZHkgPiAudG9wYmFyJykucmVtb3ZlQ2xhc3MoJ3RvcGJhci1pbnZlcnNlJykuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNmZmYnKTtcbiAgfVxuICBlbHNlIHtcbiAgICAkKCdib2R5ID4gLnRvcGJhcicpLmFkZENsYXNzKCd0b3BiYXItaW52ZXJzZScpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICcjJysgdmFsKTtcbiAgfVxufSk7XG5cbi8vIFNpZGViYXIgYmFja2dyb3VuZCBjb2xvclxuJChkb2N1bWVudCkub24oJ2NoYW5nZScsICdpbnB1dFtuYW1lPVwiZ2xvYmFsLXNpZGViYXItY29sb3JcIl0nLCBmdW5jdGlvbigpe1xuICB2YXIgdmFsID0gJCgnaW5wdXRbbmFtZT1cImdsb2JhbC1zaWRlYmFyLWNvbG9yXCJdOmNoZWNrZWQnKS52YWwoKTtcbiAgJCgnLnNpZGViYXInKS5yZW1vdmVDbGFzcygnc2lkZWJhci1saWdodCBzaWRlYmFyLWRhcmsgc2lkZWJhci1kZWZhdWx0Jyk7XG4gICQoJy5zaWRlYmFyJykuYWRkQ2xhc3MoJ3NpZGViYXItJysgdmFsKTtcbn0pO1xuXG4vLyBTaWRlYmFyIG1lbnUgY29sb3JcbiQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnaW5wdXRbbmFtZT1cImdsb2JhbC1zaWRlYmFyLW1lbnUtY29sb3JcIl0nLCBmdW5jdGlvbigpe1xuICB2YXIgdmFsID0gJCgnaW5wdXRbbmFtZT1cImdsb2JhbC1zaWRlYmFyLW1lbnUtY29sb3JcIl06Y2hlY2tlZCcpLnZhbCgpO1xuICAkKFwiLnNpZGViYXJcIikucmVtb3ZlQ2xhc3MgKGZ1bmN0aW9uIChpbmRleCwgY2xhc3NOYW1lKSB7XG4gICAgICByZXR1cm4gKGNsYXNzTmFtZS5tYXRjaCAoLyhefFxccylzaWRlYmFyLWNvbG9yLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgfSkuYWRkQ2xhc3MoICdzaWRlYmFyLWNvbG9yLScrIHZhbCApO1xuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2JhY2svanMvc2NyaXB0L3BhcnRpYWxzL3F1aWNrdmlldy5qcyIsIlxuLypcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBTaWRlYmFyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnxcbnwgSGFuZGxlIHNvbWUgYmVoYXZpb3JzIGluIHNpZGViYXIgZGVtbyBwYWdlXG58XG4qL1xuXG4vLyBSZXNldCBidXR0b25cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjc2lkZWJhci1yZXNldC1idG4nLCBmdW5jdGlvbigpe1xuICAkKCcuc2lkZWJhcicpLmF0dHIoJ2NsYXNzJywgJ3NpZGViYXInKTtcbiAgJCgnLnNpZGViYXItaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ3NpZGViYXItaGVhZGVyLWludmVyc2UnKVxuICAkKCcuc2lkZWJhciAubWVudScpLmF0dHIoJ2NsYXNzJywgJ21lbnUnKTtcbiAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdzaWRlYmFyLWZvbGRlZCcpO1xufSk7XG5cbi8vIEhlYWRlciBiYWNrZ3JvdW5kIGNvbG9yXG4kKGRvY3VtZW50KS5vbignY2hhbmdlJywgJ2lucHV0W25hbWU9XCJzaWRlYmFyLWhlYWRlci1iZy1jb2xvclwiXScsIGZ1bmN0aW9uKCl7XG4gIHZhciB2YWwgPSAkKCdpbnB1dFtuYW1lPVwic2lkZWJhci1oZWFkZXItYmctY29sb3JcIl06Y2hlY2tlZCcpLnZhbCgpO1xuICAkKCcuc2lkZWJhci1oZWFkZXInKS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCB2YWwpO1xufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9iYWNrL2pzL3NjcmlwdC9wYXJ0aWFscy9zaWRlYmFyLmpzIiwiXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IFRpbWVsaW5lXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnxcbnwgSGFuZGxlIHNvbWUgYmVoYXZpb3JzIGluIHRpbWVsaW5lcyBkZW1vIHBhZ2VcbnxcbiovXG5cblxuLy8gQ29udGVudCBwb3NpdGlvblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0aW1lbGluZS1hbGlnbm1lbnQtc2VsZWN0b3IgLmJ0bicsIGZ1bmN0aW9uKCl7XG4gIHZhciB2YWwgPSAkKHRoaXMpLmNoaWxkcmVuKCdpbnB1dCcpLnZhbCgpO1xuICAkKCcjZGVtby10aW1lbGluZS1hbGlnbm1lbnQnKS5hdHRyKCdjbGFzcycsICd0aW1lbGluZSB0aW1lbGluZS1jb250ZW50LScrIHZhbCk7XG59KTtcblxuLy8gUG9pbnQgc2l6ZVxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyN0aW1lbGluZS1zaXplLXNlbGVjdG9yIC5idG4nLCBmdW5jdGlvbigpe1xuICB2YXIgdmFsID0gJCh0aGlzKS5jaGlsZHJlbignaW5wdXQnKS52YWwoKTtcbiAgJCgnI2RlbW8tdGltZWxpbmUtc2l6ZScpLmF0dHIoJ2NsYXNzJywgJ3RpbWVsaW5lIHRpbWVsaW5lLWNvbnRlbnQtcmlnaHQgdGltZWxpbmUtcG9pbnQtJysgdmFsKTtcbn0pO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zY3JpcHQvcGFydGlhbHMvdGltZWxpbmUuanMiLCJcbi8qXG4gKiBTZWFyY2ggaW4gVGhlYWRtaW4gY29tcG9uZW50c1xuICovXG5pZiAoIHdpbmRvd1tcIkJsb29kaG91bmRcIl0gKSB7XG4gIHZhciB0aGVhZG1pbkNvbXBvbmVudHMgPSBuZXcgQmxvb2Rob3VuZCh7XG4gICAgZGF0dW1Ub2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy5vYmoud2hpdGVzcGFjZSgndG9rZW5zJyksXG4gICAgcXVlcnlUb2tlbml6ZXI6IEJsb29kaG91bmQudG9rZW5pemVycy53aGl0ZXNwYWNlLFxuICAgIHByZWZldGNoOiB7XG4gICAgICB1cmw6IGFwcC5kaXIuYXNzZXRzICsgJ2RhdGEvanNvbi9maWxlcy5qc29uJyxcbiAgICAgIGNhY2hlOiBmYWxzZVxuICAgIH1cbiAgfSk7XG5cbiAgJCgnI3RoZWFkbWluLXNlYXJjaCBpbnB1dCcpLnR5cGVhaGVhZChudWxsLCB7XG4gICAgbmFtZTogJ3RoZWFkbWluLWNvbXBvbmVudHMnLFxuICAgIGRpc3BsYXk6ICd0aXRsZScsXG4gICAgc291cmNlOiB0aGVhZG1pbkNvbXBvbmVudHMsXG4gICAgdGVtcGxhdGVzOiB7XG4gICAgICBzdWdnZXN0aW9uOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHJldHVybiAnPGEgaHJlZj1cIicrIGxvY2F0aW9uLm9yaWdpbiArJy8nKyBkYXRhLnVybCArJ1wiPjxoNiBjbGFzcz1cIm1iLTFcIj4nKyBkYXRhLnRpdGxlICsnPC9oNj48c21hbGw+JysgZGF0YS5kZXNjcmlwdGlvbiArJzwvc21hbGw+PC9hPic7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAkKCcjdGhlYWRtaW4tc2VhcmNoIGlucHV0JykuYmluZCgndHlwZWFoZWFkOnNlbGVjdCcsIGZ1bmN0aW9uKGV2LCBkYXRhKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5vcmlnaW4gKycvJysgZGF0YS51cmw7XG4gIH0pO1xuXG4gICQoJyN0aGVhZG1pbi1zZWFyY2ggaW5wdXQnKS5iaW5kKCd0eXBlYWhlYWQ6b3BlbicsIGZ1bmN0aW9uKGV2LCBkYXRhKSB7XG4gICAgJCh0aGlzKS5jbG9zZXN0KCcjdGhlYWRtaW4tc2VhcmNoJykuZmluZCgnLmxvb2t1cC1wbGFjZWhvbGRlciBzcGFuJykuY3NzKCdvcGFjaXR5JywgJzAnKTtcbiAgfSk7XG5cbiAgJCgnI3RoZWFkbWluLXNlYXJjaCBpbnB1dCcpLmJpbmQoJ3R5cGVhaGVhZDpjbG9zZScsIGZ1bmN0aW9uKGV2LCBkYXRhKSB7XG4gICAgaWYgKCAkKHRoaXMpLnZhbCgpID09IFwiXCIgKSB7XG4gICAgICAkKHRoaXMpLmNsb3Nlc3QoJyN0aGVhZG1pbi1zZWFyY2gnKS5maW5kKCcubG9va3VwLXBsYWNlaG9sZGVyIHNwYW4nKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvYmFjay9qcy9zY3JpcHQvcGx1Z2lucy90eXBlYWhlYWQuanMiXSwic291cmNlUm9vdCI6IiJ9