"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

$(document).ready(function () {
  $(window).scroll(function () {
    var height = $(window).scrollTop();
  });
  $('.sidebar__menu').on('click', 'a', function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 800);
  });
  $('.sidebar__menu-item a').bind('click', function (e) {
    var anchor = $(this);
    var hh = 45;

    if ($('.sidebar__toggle-btn:checked')) {
      $('.sidebar__toggle-btn').prop('checked', false);
    }
  });
  $('body').AddClassAnimation();
  $('#formBtn').click(function () {
    $('.form').removeClass('not-active');
    $('.form').addClass('active');
  });
  $('.js-notActive').click(function () {
    $('.form').addClass('not-active');
  });
});
$('.popup-btn').click(function () {
  $('.popup').addClass('open');
});
$('.js-close').click(function () {
  $('.popup').removeClass('open');
});

if (document.querySelector('.clock')) {
  var clock = document.querySelector('.clock');

  var tick = function tick() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var html = "\n    <span>".concat(h, "</span> :\n    <span>").concat(m, "</span>\n    ");
    clock.innerHTML = html;
  };

  setInterval(tick, 1000);
}

(function ($) {
  var addClassAnimation = {
    elementAnim: '.js-animate',
    classAnim: 'is-animated'
  };

  addClassAnimation.add = function () {
    var element = this.elementAnim;
    var addClass = this.classAnim;
    $(element).each(function () {
      var $this = $(this);
      var offsetEl = $this.offset();

      if (offsetEl.top <= $(document).scrollTop() + $(window).height() / 1.3) {
        $this.addClass(addClass);
      }
    });
  };

  $.fn.AddClassAnimation = function (options) {
    if (options && _typeof(options) === 'object') {
      $.extend(addClassAnimation, options);
    }

    var $this = $(this);
    addClassAnimation.add($this);
    $(window).on('scroll', function () {
      addClassAnimation.add($this);
    });
    return this;
  };
})(jQuery);

var msg = document.querySelector('.msg');
var gsapMsg = gsap.to('.msg', 0.25, {
  autoAlpha: 1,
  y: -40,
  ease: Expo.inOut,
  paused: true
});
var arrInput = document.querySelectorAll('.aInput');

function send(event, php) {
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
  for (var i = 0, count = arrInput.length; i < count; i++) {
    arrInput[i].classList.remove('inputerror');
  }

  event.target.querySelector('button').disabled = true;
  showMsg('Wait. Sending...', '#b1b1b1');
  var req = new XMLHttpRequest();
  req.open('POST', php, true);

  req.onload = function () {
    event.target.querySelector('button').disabled = false;

    if (req.status >= 200 && req.status < 400) {
      var json = JSON.parse(this.response);

      if (json.result === 'success') {
        showMsg('Message send', '#36AE46', '1000');
        setTimeout(function () {
          document.getElementsByClassName('msg')[0].style.opacity = '0';
        }, 2000);
        event.target.reset();
      } else if (json.result === 'email') {
        showMsg('Error. Need email', '#DC352F');
        setTimeout(function () {
          document.getElementsByClassName('msg')[0].style.opacity = '0';
        }, 2000);
        document.querySelector('#email').classList.add('inputerror');
      }
    } else {
      showMsg('Server error. number: ' + req.status, '#DC352F');
      setTimeout(function () {
        document.getElementsByClassName('msg')[0].style.opacity = '0';
      }, 2000);
    }
  };

  req.onerror = function () {
    showMsg('Error sending request', '#DC352F');
  };

  req.send(new FormData(event.target));
}

function showMsg(message, color) {
  msg.innerText = message;
  msg.style.background = color;
  gsapMsg.restart();
}

function inputFile(e) {
  var el = e.target.parentNode.querySelector('.count');
  if (e.target.value !== '') el.innerHTML = 'Selected files: ' + e.target.files.length;else el.innerHTML = 'Select file';
}

for (var i = 0, count = arrInput.length; i < count; i++) {
  arrInput[i].addEventListener('focus', function () {
    this.nextElementSibling.classList.add('active');
  });
  arrInput[i].addEventListener('blur', function () {
    if (this.value === false) {
      this.nextElementSibling.classList.remove('active');
    }
  });
}

window.onload = function () {
  var loadPage = gsap.timeline();
  loadPage.to('#form', 0.7, {
    autoAlpha: 1,
    y: 0,
    ease: Expo.inOut
  });
  loadPage.to('.link', 0.7, {
    autoAlpha: 1,
    y: 0,
    ease: Expo.inOut
  }, 0);
  loadPage.to('.input-wrap', 0.5, {
    stagger: 0.15,
    autoAlpha: 1,
    y: 0,
    ease: Expo.inOut
  }, 0.35);
  loadPage.to('.file-wrap, .button', 0.5, {
    stagger: 0.15,
    autoAlpha: 1,
    x: 0,
    ease: Expo.inOut
  }, 0.6);
};

jQuery(window).scroll(function () {
  var $sections = $('section');
  $sections.each(function (i, el) {
    var top = $(el).offset().top - 100;
    var bottom = top + $(el).height();
    var scroll = $(window).scrollTop();
    var id = $(el).attr('id');

    if (scroll > top && scroll < bottom) {
      $('a.sidebar-active').removeClass('sidebar-active');
      $('a[href="#' + id + '"]').addClass('sidebar-active');
    }
  });
});