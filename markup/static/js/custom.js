$(document).ready(function () {
    var $burger = $('.js-header-burger');
    var $nav = $('.js-header-toggle nav');
    $burger.on('click', function () {
        $(this).toggleClass('open');
        $('.header').toggleClass('open');
        $nav.toggleClass('open');
        $('body').toggleClass('fixed-position');
    });

    $(window).scroll(function () {
        var height = $(window).scrollTop();

        if (height > 50) {
            $('.js-header').addClass('is-scroll');
        } else {
            $('.js-header').removeClass('is-scroll');
        }
    });



    //form
    var FormValidator = (function($, window){

        'use strict';

        function FormValidator(formSelector) {
            this.$form = $(formSelector);
            this.errorMsgs = [];
            this.fieldArray = [];
        }

        /**
         Attributes:
         @selector (required)
         @name (optional)
         @required (optional, default is false)
         @match (optional, regex)
         @sameAs (optional, a field to be the same)
         @error (optional, error callback function)
         @success (optional, success callback function)
         **/

        FormValidator.prototype.config = function(fieldArray) {
            if( Object.prototype.toString.call( fieldArray ) !== '[object Array]' ) {
                /*throw new Error('Parameters must be array');*/
                return;
            }
            this.fieldArray = fieldArray;
        }


        FormValidator.prototype.submit = function() {

            this.errorMsgs.length = 0;

            for(var i=0; i<this.fieldArray.length; i++) {

                var field = this.fieldArray[i];
                if( Object.prototype.toString.call( field ) !== '[object Object]' ) {
                    throw new Error('Each field must be object');
                    return;
                }

                field.error = field.error || function(){};
                field.success = field.success || function(){};

                if ( !field.selector ) {
                    throw new Error('Attribute selector is required');
                    return;
                }
                field.$element = this.$form.find($(field.selector));

                if (field.$element.length > 0) {
                    if (!this.isRequiredValid(field)) {
                        //invalid
                        this.errorMsgs.push({name: field.name, msg: this.generateMessage('required', field.name), attribute: 'required'});
                        continue;
                    };

                    if (!this.isMatchValid(field)) {
                        //invalid
                        this.errorMsgs.push({name: field.name, msg: this.generateMessage('match', field.name), attribute: 'match'});
                        continue;
                    };

                    if (!this.isTheSame(field)) {
                        //invalid
                        this.errorMsgs.push({name: field.name, msg: this.generateMessage('sameAs', field.name), attribute: 'sameAs'});
                        continue;
                    };
                    // console.log(field);
                    field.success.call(field);

                }
            }

            if(this.errorMsgs.length > 0)
                return false;

            return true;

        }


        FormValidator.prototype.isRequiredValid = function(field) {

            var isRequired = field.required || false;
            if (!isRequired)
                return true;

            if (field.$element.val()) {
                return true;
            } else {
                //execute error function
                field.error.call(field);
                return false;
            }

        }

        FormValidator.prototype.isMatchValid = function(field) {

            var regex = field.match || false;
            if (!regex)
                return true;

            if (field.$element.val().match(regex)) {
                return true;
            } else {
                field.error.call(field);
                return false;
            }

        }

        FormValidator.prototype.isTheSame = function(field) {
            var $anotherEle = this.$form.find($(field.sameAs));
            if ($anotherEle.length == 0)
                return true;

            if (field.$element.val() == $anotherEle.val()) {
                return true;
            } else {
                field.error.call(field);
                return false;
            }
        }


        FormValidator.prototype.generateMessage = function(attr, name) {

            name = name || 'This field';
            var msg = '';
            switch(attr) {

                case 'required':
                    msg = name + ' is required';
                    break;
                case 'match':
                    msg = name + ' doesn\'t match the pattern';
                    break;
                case 'sameAs':
                    msg = name + ' should be the same';
                    break;

                default:
                    break;

            }
            return msg;
        }
        return FormValidator;
    })(jQuery, window);



// load
    $(document).ready(function(){

        //register form validation
        window.validator = new FormValidator('.register-form');
        validator.config([
            //first name
            {
                selector: '[name="name"]',
                name: 'Name',
                match: new RegExp('[a-zA-Z]','g'),
                required: true,
                error: function() {
                    this.$element.closest('.form-group').addClass('has-error');
                },
                success: function() {
                    this.$element.closest('.form-group').removeClass('has-error');
                },
            },
            //email
            {
                selector: '[name="email"]',
                name: 'Email',
                required: true,
                match: new RegExp("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$","g"),
                error: function() {
                    this.$element.closest('.form-group').addClass('has-error');
                },
                success: function() {
                    this.$element.closest('.form-group').removeClass('has-error');
                },
            },
            //password
            {
                selector: '[name="password"]',
                name: 'Password',
                required: true,
                match: new RegExp("^(?=.*[a-z])(?=.*[0-9]).*$", "g"),
                error: function() {
                    this.$element.closest('.form-group').addClass('has-error');
                },
                success: function() {
                    this.$element.closest('.form-group').removeClass('has-error');
                },
            },
            //password2
            {
                selector: '[name="password2"]',
                name: 'Password again',
                required: true,
                sameAs: '[name="password"]',
                error: function() {
                    this.$element.closest('.form-group').addClass('has-error');
                },
                success: function() {
                    this.$element.closest('.form-group').removeClass('has-error');
                },
            }

        ]);

        //validate begins
        $('.register-form').submit(function(){
            if (validator.submit()) // all legal
                return true;

            //something illegal, output error messages
            $('.register-alert').empty();
            validator.errorMsgs.forEach(function(obj){

                // customize error message
                if (obj.name == 'Password again' && obj.attribute == 'sameAs') {
                    obj.msg = obj.msg + ' as password';
                }

                var $err = $('<p class="text-danger">'+obj.msg+'</p>')
                $('.register-alert').append($err);
            })

            $('.register-alert').removeClass('hidden');
            return false;
        }) //form submit

    })



});

$(document).ready(function () {
    //add animation BODY
    $('body').AddClassAnimation();

    //header responsive
    const burgerMenu = document.getElementById("burger");
    const navbarMenu = document.getElementById("menu");

    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active");
        navbarMenu.classList.toggle("active");

        if (navbarMenu.classList.contains("active")) {
            navbarMenu.style.maxHeight = navbarMenu.scrollHeight + "px";
        } else {
            navbarMenu.removeAttribute("style");
        }
    });
    //header responsive END

});


//CLOCK
if (document.querySelector('.clock')) {
    const clock = document.querySelector('.clock');

    const tick = () => {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();

        const html = `
    <span>${h}</span> :
    <span>${m}</span>
    `;
        clock.innerHTML = html;
    };

    setInterval(tick, 1000);
}
//CLOCK END

//Scroll animation
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
        if (options && typeof options === 'object') {
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
//Scroll animation END

//FORM, MESSAGE
var msg = document.querySelector('.msg');
var gsapMsg = gsap.to('.msg', 0.25, {
    autoAlpha: 1, y: -40, ease: Expo.inOut, paused: true
});

var arrInput = document.querySelectorAll('.aInput');

function send(event, php) {
    // event.preventDefault ? event.preventDefault() : event.returnValue = false;
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
            const json = JSON.parse(this.response);
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
    if (e.target.value !== '') el.innerHTML = 'Selected files: ' + e.target.files.length;
    else el.innerHTML = 'Select file';
}

for (var i = 0, count = arrInput.length; i < count; i++) {
    arrInput[i].addEventListener('focus', function () {
        this.nextElementSibling.classList.add('active');
    });
    arrInput[i].addEventListener('blur', function () {
        if (this.value === false) { this.nextElementSibling.classList.remove('active'); }
    });
}

window.onload = function () {
    var loadPage = gsap.timeline();
    loadPage.to('#form', 0.7, { autoAlpha: 1, y: 0, ease: Expo.inOut });
    loadPage.to('.link', 0.7, { autoAlpha: 1, y: 0, ease: Expo.inOut }, 0);
    loadPage.to('.input-wrap', 0.5, {
        stagger: 0.15, autoAlpha: 1, y: 0, ease: Expo.inOut
    }, 0.35);
    loadPage.to('.file-wrap, .button', 0.5, {
        stagger: 0.15, autoAlpha: 1, x: 0, ease: Expo.inOut
    }, 0.6);
};

//FORM MESSAGE END
$(function() {
    if ($('#sticky-sidebar').length) {
        let el = $("#sticky-sidebar");
        let stickyTop = el.offset().top;
        let stickyHeight = el.height();
        $(window).scroll(function() {
            let limit = $('.wrapper__content').outerHeight() - stickyHeight + 20;
            let windowTop = $(window).scrollTop();
            if (stickyTop < windowTop) {
                el.css({
                    position: 'fixed',
                    top: '20px'
                });
            } else {
                el.css('position', 'static');
            }
            if (limit < windowTop) {
                let diff = limit - windowTop;
                el.css({
                    top: diff
                });
            }
        });
    }
});

