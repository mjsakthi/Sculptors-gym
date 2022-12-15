/********************************************
 * REVOLUTION 5.4.6.4 EXTENSION - ACTIONS
 * @version: 2.1.0 (22.11.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/

!(function ($) {
  "use strict";
  function getScrollRoot() {
    var e,
      t = document.documentElement,
      o = document.body,
      a =
        (void 0 !== window.pageYOffset ? window.pageYOffset : null) ||
        o.scrollTop ||
        t.scrollTop;
    return (
      (t.scrollTop = o.scrollTop = a + (a > 0) ? -1 : 1),
      (e = t.scrollTop !== a ? t : o),
      (e.scrollTop = a),
      e
    );
  }
  var _R = jQuery.fn.revolution,
    _ISM = _R.is_mobile(),
    extension = {
      alias: "Actions Min JS",
      name: "revolution.extensions.actions.min.js",
      min_core: "5.4.5",
      version: "2.1.0",
    };
  jQuery.extend(!0, _R, {
    checkActions: function (e, t, o) {
      if ("stop" === _R.compare_version(extension).check) return !1;
      checkActions_intern(e, t, o);
    },
  });
  var checkActions_intern = function (e, t, o) {
      o &&
        jQuery.each(o, function (o, a) {
          (a.delay = parseInt(a.delay, 0) / 1e3),
            e.addClass("tp-withaction"),
            t.fullscreen_esclistener ||
              ("exitfullscreen" != a.action &&
                "togglefullscreen" != a.action) ||
              (jQuery(document).keyup(function (t) {
                27 == t.keyCode &&
                  jQuery("#rs-go-fullscreen").length > 0 &&
                  e.trigger(a.event);
              }),
              (t.fullscreen_esclistener = !0));
          var r =
            "backgroundvideo" == a.layer
              ? jQuery(".rs-background-video-layer")
              : "firstvideo" == a.layer
              ? jQuery(".tp-revslider-slidesli").find(".tp-videolayer")
              : jQuery("#" + a.layer);
          switch (
            (-1 !=
              jQuery.inArray(a.action, [
                "toggleslider",
                "toggle_mute_video",
                "toggle_global_mute_video",
                "togglefullscreen",
              ]) && e.data("togglelisteners", !0),
            a.action)
          ) {
            case "togglevideo":
              jQuery.each(r, function (t, o) {
                var a = (o = jQuery(o)).data("videotoggledby");
                void 0 == a && (a = new Array()),
                  a.push(e),
                  o.data("videotoggledby", a);
              });
              break;
            case "togglelayer":
              jQuery.each(r, function (t, o) {
                var r = (o = jQuery(o)).data("layertoggledby");
                void 0 == r && (r = new Array()),
                  r.push(e),
                  o.data("layertoggledby", r),
                  o.data("triggered_startstatus", a.layerstatus);
              });
              break;
            case "toggle_mute_video":
            case "toggle_global_mute_video":
              jQuery.each(r, function (t, o) {
                var a = (o = jQuery(o)).data("videomutetoggledby");
                void 0 == a && (a = new Array()),
                  a.push(e),
                  o.data("videomutetoggledby", a);
              });
              break;
            case "toggleslider":
              void 0 == t.slidertoggledby && (t.slidertoggledby = new Array()),
                t.slidertoggledby.push(e);
              break;
            case "togglefullscreen":
              void 0 == t.fullscreentoggledby &&
                (t.fullscreentoggledby = new Array()),
                t.fullscreentoggledby.push(e);
          }
          switch (
            (e.on(a.event, function () {
              if ("click" === a.event && e.hasClass("tp-temporarydisabled"))
                return !1;
              var o =
                "backgroundvideo" == a.layer
                  ? jQuery(
                      ".active-revslide .slotholder .rs-background-video-layer"
                    )
                  : "firstvideo" == a.layer
                  ? jQuery(".active-revslide .tp-videolayer").first()
                  : jQuery("#" + a.layer);
              if (
                "stoplayer" == a.action ||
                "togglelayer" == a.action ||
                "startlayer" == a.action
              ) {
                if (o.length > 0) {
                  var r = o.data();
                  void 0 !== r.clicked_time_stamp &&
                    new Date().getTime() - r.clicked_time_stamp > 150 &&
                    (clearTimeout(r.triggerdelayIn),
                    clearTimeout(r.triggerdelayOut)),
                    (r.clicked_time_stamp = new Date().getTime()),
                    "startlayer" == a.action ||
                    ("togglelayer" == a.action &&
                      "in" != o.data("animdirection"))
                      ? ((r.animdirection = "in"),
                        (r.triggerstate = "on"),
                        _R.toggleState(r.layertoggledby),
                        _R.playAnimationFrame &&
                          (clearTimeout(r.triggerdelayIn),
                          (r.triggerdelayIn = setTimeout(function () {
                            _R.playAnimationFrame({
                              caption: o,
                              opt: t,
                              frame: "frame_0",
                              triggerdirection: "in",
                              triggerframein: "frame_0",
                              triggerframeout: "frame_999",
                            });
                          }, 1e3 * a.delay))))
                      : ("stoplayer" == a.action ||
                          ("togglelayer" == a.action &&
                            "out" != o.data("animdirection"))) &&
                        ((r.animdirection = "out"),
                        (r.triggered = !0),
                        (r.triggerstate = "off"),
                        _R.stopVideo && _R.stopVideo(o, t),
                        _R.unToggleState(r.layertoggledby),
                        _R.endMoveCaption &&
                          (clearTimeout(r.triggerdelayOut),
                          (r.triggerdelayOut = setTimeout(function () {
                            _R.playAnimationFrame({
                              caption: o,
                              opt: t,
                              frame: "frame_999",
                              triggerdirection: "out",
                              triggerframein: "frame_0",
                              triggerframeout: "frame_999",
                            });
                          }, 1e3 * a.delay))));
                }
              } else
                !_ISM ||
                ("playvideo" != a.action &&
                  "stopvideo" != a.action &&
                  "togglevideo" != a.action &&
                  "mutevideo" != a.action &&
                  "unmutevideo" != a.action &&
                  "toggle_mute_video" != a.action &&
                  "toggle_global_mute_video" != a.action)
                  ? ((a.delay =
                      "NaN" === a.delay || NaN === a.delay ? 0 : a.delay),
                    _R.isSafari11()
                      ? actionSwitches(o, t, a, e)
                      : punchgs.TweenLite.delayedCall(
                          a.delay,
                          function () {
                            actionSwitches(o, t, a, e);
                          },
                          [o, t, a, e]
                        ))
                  : actionSwitches(o, t, a, e);
            }),
            a.action)
          ) {
            case "togglelayer":
            case "startlayer":
            case "playlayer":
            case "stoplayer":
              var l = (r = jQuery("#" + a.layer)).data();
              r.length > 0 &&
                void 0 !== l &&
                ((void 0 !== l.frames && "bytrigger" != l.frames[0].delay) ||
                  (void 0 === l.frames && "bytrigger" !== l.start)) &&
                (l.triggerstate = "on");
          }
        });
    },
    actionSwitches = function (tnc, opt, a, _nc) {
      switch (a.action) {
        case "scrollbelow":
          (a.speed = void 0 !== a.speed ? a.speed : 400),
            (a.ease = void 0 !== a.ease ? a.ease : punchgs.Power2.easeOut),
            _nc.addClass("tp-scrollbelowslider"),
            _nc.data("scrolloffset", a.offset),
            _nc.data("scrolldelay", a.delay),
            _nc.data("scrollspeed", a.speed),
            _nc.data("scrollease", a.ease);
          var off = getOffContH(opt.fullScreenOffsetContainer) || 0,
            aof = parseInt(a.offset, 0) || 0;
          (off = off - aof || 0), (opt.scrollRoot = jQuery(document));
          var sobj = { _y: opt.scrollRoot.scrollTop() };
          punchgs.TweenLite.to(sobj, a.speed / 1e3, {
            _y: opt.c.offset().top + jQuery(opt.li[0]).height() - off,
            ease: a.ease,
            onUpdate: function () {
              opt.scrollRoot.scrollTop(sobj._y);
            },
          });
          break;
        case "callback":
          eval(a.callback);
          break;
        case "jumptoslide":
          switch (a.slide.toLowerCase()) {
            case "+1":
            case "next":
              (opt.sc_indicator = "arrow"), _R.callingNewSlide(opt.c, 1);
              break;
            case "previous":
            case "prev":
            case "-1":
              (opt.sc_indicator = "arrow"), _R.callingNewSlide(opt.c, -1);
              break;
            default:
              var ts = jQuery.isNumeric(a.slide)
                ? parseInt(a.slide, 0)
                : a.slide;
              _R.callingNewSlide(opt.c, ts);
          }
          break;
        case "simplelink":
          window.open(a.url, a.target);
          break;
        case "toggleslider":
          (opt.noloopanymore = 0),
            "playing" == opt.sliderstatus
              ? (opt.c.revpause(),
                (opt.forcepause_viatoggle = !0),
                _R.unToggleState(opt.slidertoggledby))
              : ((opt.forcepause_viatoggle = !1),
                opt.c.revresume(),
                _R.toggleState(opt.slidertoggledby));
          break;
        case "pauseslider":
          opt.c.revpause(), _R.unToggleState(opt.slidertoggledby);
          break;
        case "playslider":
          (opt.noloopanymore = 0),
            opt.c.revresume(),
            _R.toggleState(opt.slidertoggledby);
          break;
        case "playvideo":
          tnc.length > 0 && _R.playVideo(tnc, opt);
          break;
        case "stopvideo":
          tnc.length > 0 && _R.stopVideo && _R.stopVideo(tnc, opt);
          break;
        case "togglevideo":
          tnc.length > 0 &&
            (_R.isVideoPlaying(tnc, opt)
              ? _R.stopVideo && _R.stopVideo(tnc, opt)
              : _R.playVideo(tnc, opt));
          break;
        case "mutevideo":
          tnc.length > 0 && _R.muteVideo(tnc, opt);
          break;
        case "unmutevideo":
          tnc.length > 0 && _R.unMuteVideo && _R.unMuteVideo(tnc, opt);
          break;
        case "toggle_mute_video":
          tnc.length > 0 &&
            (_R.isVideoMuted(tnc, opt)
              ? _R.unMuteVideo(tnc, opt)
              : _R.muteVideo && _R.muteVideo(tnc, opt)),
            _nc.toggleClass("rs-toggle-content-active");
          break;
        case "toggle_global_mute_video":
          !0 === opt.globalmute
            ? ((opt.globalmute = !1),
              void 0 != opt.playingvideos &&
                opt.playingvideos.length > 0 &&
                jQuery.each(opt.playingvideos, function (e, t) {
                  _R.unMuteVideo && _R.unMuteVideo(t, opt);
                }))
            : ((opt.globalmute = !0),
              void 0 != opt.playingvideos &&
                opt.playingvideos.length > 0 &&
                jQuery.each(opt.playingvideos, function (e, t) {
                  _R.muteVideo && _R.muteVideo(t, opt);
                })),
            _nc.toggleClass("rs-toggle-content-active");
          break;
        case "simulateclick":
          tnc.length > 0 && tnc.click();
          break;
        case "toggleclass":
          tnc.length > 0 &&
            (tnc.hasClass(a.classname)
              ? tnc.removeClass(a.classname)
              : tnc.addClass(a.classname));
          break;
        case "gofullscreen":
        case "exitfullscreen":
        case "togglefullscreen":
          if (
            jQuery(".rs-go-fullscreen").length > 0 &&
            ("togglefullscreen" == a.action || "exitfullscreen" == a.action)
          ) {
            jQuery(".rs-go-fullscreen").removeClass("rs-go-fullscreen");
            var gf =
              opt.c.closest(".forcefullwidth_wrapper_tp_banner").length > 0
                ? opt.c.closest(".forcefullwidth_wrapper_tp_banner")
                : opt.c.closest(".rev_slider_wrapper");
            (opt.minHeight = opt.oldminheight),
              (opt.infullscreenmode = !1),
              opt.c.revredraw(),
              jQuery(window).trigger("resize"),
              _R.unToggleState(opt.fullscreentoggledby);
          } else if (
            0 == jQuery(".rs-go-fullscreen").length &&
            ("togglefullscreen" == a.action || "gofullscreen" == a.action)
          ) {
            var gf =
              opt.c.closest(".forcefullwidth_wrapper_tp_banner").length > 0
                ? opt.c.closest(".forcefullwidth_wrapper_tp_banner")
                : opt.c.closest(".rev_slider_wrapper");
            gf.addClass("rs-go-fullscreen"),
              (opt.oldminheight = opt.minHeight),
              (opt.minHeight = jQuery(window).height()),
              (opt.infullscreenmode = !0),
              opt.c.revredraw(),
              jQuery(window).trigger("resize"),
              _R.toggleState(opt.fullscreentoggledby);
          }
          break;
        default:
          var obj = {};
          (obj.event = a),
            (obj.layer = _nc),
            opt.c.trigger("layeraction", [obj]);
      }
    },
    getOffContH = function (e) {
      if (void 0 == e) return 0;
      if (e.split(",").length > 1) {
        var t = e.split(","),
          o = 0;
        return (
          t &&
            jQuery.each(t, function (e, t) {
              jQuery(t).length > 0 && (o += jQuery(t).outerHeight(!0));
            }),
          o
        );
      }
      return jQuery(e).height();
    };
})(jQuery);

/********************************************
 * REVOLUTION 5.4 EXTENSION - CAROUSEL
 * @version: 1.2.1 (18.11.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
!(function (a) {
  "use strict";
  var b = jQuery.fn.revolution,
    c = {
      alias: "Carousel Min JS",
      name: "revolution.extensions.carousel.min.js",
      min_core: "5.3.0",
      version: "1.2.1",
    };
  jQuery.extend(!0, b, {
    prepareCarousel: function (a, d, h, i) {
      return (
        "stop" !== b.compare_version(c).check &&
        ((h = a.carousel.lastdirection = f(h, a.carousel.lastdirection)),
        e(a),
        (a.carousel.slide_offset_target = j(a)),
        void (void 0 !== i
          ? g(a, h, !1, 0)
          : void 0 == d
          ? b.carouselToEvalPosition(a, h)
          : g(a, h, !1)))
      );
    },
    carouselToEvalPosition: function (a, c) {
      var d = a.carousel;
      c = d.lastdirection = f(c, d.lastdirection);
      var e =
          "center" === d.horizontal_align
            ? (d.wrapwidth / 2 - d.slide_width / 2 - d.slide_globaloffset) /
              d.slide_width
            : (0 - d.slide_globaloffset) / d.slide_width,
        h = b.simp(e, a.slideamount, !1),
        i = h - Math.floor(h),
        j = 0,
        k = -1 * (Math.ceil(h) - h),
        l = -1 * (Math.floor(h) - h);
      (j =
        (i >= 0.3 && "left" === c) || (i >= 0.7 && "right" === c)
          ? k
          : (i < 0.3 && "left" === c) || (i < 0.7 && "right" === c)
          ? l
          : j),
        (j =
          "off" === d.infinity
            ? h < 0
              ? h
              : e > a.slideamount - 1
              ? e - (a.slideamount - 1)
              : j
            : j),
        (d.slide_offset_target = j * d.slide_width),
        0 !== Math.abs(d.slide_offset_target)
          ? g(a, c, !0)
          : b.organiseCarousel(a, c);
    },
    organiseCarousel: function (a, b, c, d) {
      b =
        void 0 === b ||
        "down" == b ||
        "up" == b ||
        null === b ||
        jQuery.isEmptyObject(b)
          ? "left"
          : b;
      for (
        var e = a.carousel,
          f = new Array(),
          g = e.slides.length,
          i = ("right" === e.horizontal_align ? a.width : 0, 0);
        i < g;
        i++
      ) {
        var j = i * e.slide_width + e.slide_offset;
        "on" === e.infinity &&
          ((j =
            j > e.wrapwidth - e.inneroffset && "right" == b
              ? e.slide_offset - (e.slides.length - i) * e.slide_width
              : j),
          (j =
            j < 0 - e.inneroffset - e.slide_width && "left" == b
              ? j + e.maxwidth
              : j)),
          (f[i] = j);
      }
      var k = 999;
      e.slides &&
        jQuery.each(e.slides, function (d, h) {
          var i = f[d];
          "on" === e.infinity &&
            ((i =
              i > e.wrapwidth - e.inneroffset && "left" === b
                ? f[0] - (g - d) * e.slide_width
                : i),
            (i =
              i < 0 - e.inneroffset - e.slide_width
                ? "left" == b
                  ? i + e.maxwidth
                  : "right" === b
                  ? f[g - 1] + (d + 1) * e.slide_width
                  : i
                : i));
          var j = new Object();
          j.left = i + e.inneroffset;
          var l =
              "center" === e.horizontal_align
                ? (Math.abs(e.wrapwidth / 2) - (j.left + e.slide_width / 2)) /
                  e.slide_width
                : (e.inneroffset - j.left) / e.slide_width,
            n = "center" === e.horizontal_align ? 2 : 1;
          if (
            (((c && Math.abs(l) < k) || 0 === l) &&
              ((k = Math.abs(l)), (e.focused = d)),
            (j.width = e.slide_width),
            (j.x = 0),
            (j.transformPerspective = 1200),
            (j.transformOrigin = "50% " + e.vertical_align),
            "on" === e.fadeout)
          )
            if ("on" === e.vary_fade)
              j.autoAlpha =
                1 - Math.abs((1 / Math.ceil(e.maxVisibleItems / n)) * l);
            else
              switch (e.horizontal_align) {
                case "center":
                  j.autoAlpha =
                    Math.abs(l) < Math.ceil(e.maxVisibleItems / n - 1)
                      ? 1
                      : 1 - (Math.abs(l) - Math.floor(Math.abs(l)));
                  break;
                case "left":
                  j.autoAlpha =
                    l < 1 && l > 0
                      ? 1 - l
                      : Math.abs(l) > e.maxVisibleItems - 1
                      ? 1 - (Math.abs(l) - (e.maxVisibleItems - 1))
                      : 1;
                  break;
                case "right":
                  j.autoAlpha =
                    l > -1 && l < 0
                      ? 1 - Math.abs(l)
                      : l > e.maxVisibleItems - 1
                      ? 1 - (Math.abs(l) - (e.maxVisibleItems - 1))
                      : 1;
              }
          else
            j.autoAlpha =
              Math.abs(l) < Math.ceil(e.maxVisibleItems / n) ? 1 : 0;
          if (void 0 !== e.minScale && e.minScale > 0)
            if ("on" === e.vary_scale) {
              j.scale =
                1 -
                Math.abs(
                  (e.minScale / 100 / Math.ceil(e.maxVisibleItems / n)) * l
                );
              var o = (e.slide_width - e.slide_width * j.scale) * Math.abs(l);
            } else {
              j.scale =
                l >= 1 || l <= -1
                  ? 1 - e.minScale / 100
                  : (100 - e.minScale * Math.abs(l)) / 100;
              var o =
                (e.slide_width - e.slide_width * (1 - e.minScale / 100)) *
                Math.abs(l);
            }
          void 0 !== e.maxRotation &&
            0 != Math.abs(e.maxRotation) &&
            ("on" === e.vary_rotation
              ? ((j.rotationY =
                  Math.abs(e.maxRotation) -
                  Math.abs(
                    (1 - Math.abs((1 / Math.ceil(e.maxVisibleItems / n)) * l)) *
                      e.maxRotation
                  )),
                (j.autoAlpha = Math.abs(j.rotationY) > 90 ? 0 : j.autoAlpha))
              : (j.rotationY =
                  l >= 1 || l <= -1
                    ? e.maxRotation
                    : Math.abs(l) * e.maxRotation),
            (j.rotationY = l < 0 ? j.rotationY * -1 : j.rotationY)),
            (j.x = -1 * e.space * l),
            (j.left = Math.floor(j.left)),
            (j.x = Math.floor(j.x)),
            void 0 !== j.scale ? (l < 0 ? j.x - o : j.x + o) : j.x,
            (j.zIndex = Math.round(100 - Math.abs(5 * l))),
            (j.transformStyle =
              "3D" != a.parallax.type && "3d" != a.parallax.type
                ? "flat"
                : "preserve-3d"),
            punchgs.TweenLite.set(h, j);
        }),
        d &&
          (a.c.find(".next-revslide").removeClass("next-revslide"),
          jQuery(e.slides[e.focused]).addClass("next-revslide"),
          a.c.trigger("revolution.nextslide.waiting"));
      e.wrapwidth / 2 - e.slide_offset,
        e.maxwidth + e.slide_offset - e.wrapwidth / 2;
    },
  });
  var d = function (a) {
      var b = a.carousel;
      (b.infbackup = b.infinity),
        (b.maxVisiblebackup = b.maxVisibleItems),
        (b.slide_globaloffset = "none"),
        (b.slide_offset = 0),
        (b.wrap = a.c.find(".tp-carousel-wrapper")),
        (b.slides = a.c.find(".tp-revslider-slidesli")),
        0 !== b.maxRotation &&
          ("3D" != a.parallax.type && "3d" != a.parallax.type
            ? punchgs.TweenLite.set(b.wrap, {
                perspective: 1200,
                transformStyle: "flat",
              })
            : punchgs.TweenLite.set(b.wrap, {
                perspective: 1600,
                transformStyle: "preserve-3d",
              })),
        void 0 !== b.border_radius &&
          parseInt(b.border_radius, 0) > 0 &&
          punchgs.TweenLite.set(a.c.find(".tp-revslider-slidesli"), {
            borderRadius: b.border_radius,
          });
    },
    e = function (a) {
      void 0 === a.bw && b.setSize(a);
      var c = a.carousel,
        e = b.getHorizontalOffset(a.c, "left"),
        f = b.getHorizontalOffset(a.c, "right");
      void 0 === c.wrap && d(a),
        (c.slide_width =
          "on" !== c.stretch ? a.gridwidth[a.curWinRange] * a.bw : a.c.width()),
        (c.maxwidth = a.slideamount * c.slide_width),
        c.maxVisiblebackup > c.slides.length + 1 &&
          (c.maxVisibleItems = c.slides.length + 2),
        (c.wrapwidth =
          c.maxVisibleItems * c.slide_width +
          (c.maxVisibleItems - 1) * c.space),
        (c.wrapwidth =
          "auto" != a.sliderLayout
            ? c.wrapwidth > a.c.closest(".tp-simpleresponsive").width()
              ? a.c.closest(".tp-simpleresponsive").width()
              : c.wrapwidth
            : c.wrapwidth > a.ul.width()
            ? a.ul.width()
            : c.wrapwidth),
        (c.infinity = c.wrapwidth >= c.maxwidth ? "off" : c.infbackup),
        (c.wrapoffset =
          "center" === c.horizontal_align
            ? (a.c.width() - f - e - c.wrapwidth) / 2
            : 0),
        (c.wrapoffset =
          "auto" != a.sliderLayout && a.outernav
            ? 0
            : c.wrapoffset < e
            ? e
            : c.wrapoffset);
      var g = "hidden";
      ("3D" != a.parallax.type && "3d" != a.parallax.type) || (g = "visible"),
        "right" === c.horizontal_align
          ? punchgs.TweenLite.set(c.wrap, {
              left: "auto",
              right: c.wrapoffset + "px",
              width: c.wrapwidth,
              overflow: g,
            })
          : punchgs.TweenLite.set(c.wrap, {
              right: "auto",
              left: c.wrapoffset + "px",
              width: c.wrapwidth,
              overflow: g,
            }),
        (c.inneroffset =
          "right" === c.horizontal_align ? c.wrapwidth - c.slide_width : 0),
        (c.realoffset = Math.abs(c.wrap.position().left)),
        (c.windhalf = jQuery(window).width() / 2);
    },
    f = function (a, b) {
      return null === a || jQuery.isEmptyObject(a)
        ? b
        : void 0 === a
        ? "right"
        : a;
    },
    g = function (a, c, d, e) {
      var g = a.carousel;
      c = g.lastdirection = f(c, g.lastdirection);
      var h = new Object(),
        i = d ? punchgs.Power2.easeOut : g.easing;
      (h.from = 0),
        (h.to = g.slide_offset_target),
        (e = void 0 === e ? g.speed / 1e3 : e),
        (e = d ? 0.4 : e),
        void 0 !== g.positionanim && g.positionanim.pause(),
        (g.positionanim = punchgs.TweenLite.to(h, e, {
          from: h.to,
          onUpdate: function () {
            (g.slide_offset = g.slide_globaloffset + h.from),
              (g.slide_offset = b.simp(g.slide_offset, g.maxwidth)),
              b.organiseCarousel(a, c, !1, !1);
          },
          onComplete: function () {
            (g.slide_globaloffset =
              "off" === g.infinity
                ? g.slide_globaloffset + g.slide_offset_target
                : b.simp(
                    g.slide_globaloffset + g.slide_offset_target,
                    g.maxwidth
                  )),
              (g.slide_offset = b.simp(g.slide_offset, g.maxwidth)),
              b.organiseCarousel(a, c, !1, !0);
            var e = jQuery(a.li[g.focused]);
            a.c.find(".next-revslide").removeClass("next-revslide"),
              d && b.callingNewSlide(a.c, e.data("index"));
          },
          ease: i,
        }));
    },
    h = function (a, b) {
      return Math.abs(a) > Math.abs(b)
        ? a > 0
          ? a - Math.abs(Math.floor(a / b) * b)
          : a + Math.abs(Math.floor(a / b) * b)
        : a;
    },
    i = function (a, b, c) {
      var c,
        c,
        d = b - a,
        e = b - c - a;
      return (d = h(d, c)), (e = h(e, c)), Math.abs(d) > Math.abs(e) ? e : d;
    },
    j = function (a) {
      var c = 0,
        d = a.carousel;
      if (
        (void 0 !== d.positionanim && d.positionanim.kill(),
        "none" == d.slide_globaloffset)
      )
        d.slide_globaloffset = c =
          "center" === d.horizontal_align
            ? d.wrapwidth / 2 - d.slide_width / 2
            : 0;
      else {
        (d.slide_globaloffset = d.slide_offset), (d.slide_offset = 0);
        var e = a.c.find(".processing-revslide").index(),
          f =
            "center" === d.horizontal_align
              ? (d.wrapwidth / 2 - d.slide_width / 2 - d.slide_globaloffset) /
                d.slide_width
              : (0 - d.slide_globaloffset) / d.slide_width;
        (f = b.simp(f, a.slideamount, !1)),
          (e = e >= 0 ? e : a.c.find(".active-revslide").index()),
          (e = e >= 0 ? e : 0),
          (c = "off" === d.infinity ? f - e : -i(f, e, a.slideamount)),
          (c *= d.slide_width);
      }
      return c;
    };
})(jQuery);

/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - KEN BURN
 * @version: 1.3.1 (15.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
!(function (a) {
  "use strict";
  var b = jQuery.fn.revolution,
    c = {
      alias: "KenBurns Min JS",
      name: "revolution.extensions.kenburn.min.js",
      min_core: "5.4",
      version: "1.3.1",
    };
  jQuery.extend(!0, b, {
    stopKenBurn: function (a) {
      if ("stop" === b.compare_version(c).check) return !1;
      void 0 != a.data("kbtl") && a.data("kbtl").pause();
    },
    startKenBurn: function (a, d, e) {
      if ("stop" === b.compare_version(c).check) return !1;
      var f = a.data(),
        g = a.find(".defaultimg"),
        h = g.data("lazyload") || g.data("src"),
        j =
          (f.owidth,
          f.oheight,
          "carousel" === d.sliderType ? d.carousel.slide_width : d.ul.width()),
        k = d.ul.height();
      if (
        (a.data("kbtl") && a.data("kbtl").kill(),
        (e = e || 0),
        0 == a.find(".tp-kbimg").length)
      ) {
        var m = g.data("mediafilter");
        (m = void 0 === m ? "" : m),
          a.append(
            '<div class="tp-kbimg-wrap ' +
              m +
              '" style="z-index:2;width:100%;height:100%;top:0px;left:0px;position:absolute;"><img class="tp-kbimg" src="' +
              h +
              '" style="position:absolute;" width="' +
              f.owidth +
              '" height="' +
              f.oheight +
              '"></div>'
          ),
          a.data("kenburn", a.find(".tp-kbimg"));
      }
      var n = function (a, b, c, d, e, f, g) {
          var h = a * c,
            i = b * c,
            j = Math.abs(d - h),
            k = Math.abs(e - i),
            l = new Object();
          return (
            (l.l = (0 - f) * j),
            (l.r = l.l + h),
            (l.t = (0 - g) * k),
            (l.b = l.t + i),
            (l.h = f),
            (l.v = g),
            l
          );
        },
        o = function (a, b, c, d, e) {
          var f = a.bgposition.split(" ") || "center center",
            g =
              "center" == f[0]
                ? "50%"
                : "left" == f[0] || "left" == f[1]
                ? "0%"
                : "right" == f[0] || "right" == f[1]
                ? "100%"
                : f[0],
            h =
              "center" == f[1]
                ? "50%"
                : "top" == f[0] || "top" == f[1]
                ? "0%"
                : "bottom" == f[0] || "bottom" == f[1]
                ? "100%"
                : f[1];
          (g = parseInt(g, 0) / 100 || 0), (h = parseInt(h, 0) / 100 || 0);
          var i = new Object();
          return (
            (i.start = n(
              e.start.width,
              e.start.height,
              e.start.scale,
              b,
              c,
              g,
              h
            )),
            (i.end = n(e.start.width, e.start.height, e.end.scale, b, c, g, h)),
            i
          );
        },
        p = function (a, b, c) {
          var d = c.scalestart / 100,
            e = c.scaleend / 100,
            f =
              void 0 != c.offsetstart
                ? c.offsetstart.split(" ") || [0, 0]
                : [0, 0],
            g =
              void 0 != c.offsetend ? c.offsetend.split(" ") || [0, 0] : [0, 0];
          c.bgposition =
            "center center" == c.bgposition ? "50% 50%" : c.bgposition;
          var h = new Object(),
            i = a * d,
            k = (c.owidth, c.oheight, a * e);
          c.owidth, c.oheight;
          if (
            ((h.start = new Object()),
            (h.starto = new Object()),
            (h.end = new Object()),
            (h.endo = new Object()),
            (h.start.width = a),
            (h.start.height = (h.start.width / c.owidth) * c.oheight),
            h.start.height < b)
          ) {
            var m = b / h.start.height;
            (h.start.height = b), (h.start.width = h.start.width * m);
          }
          (h.start.transformOrigin = c.bgposition),
            (h.start.scale = d),
            (h.end.scale = e),
            (c.rotatestart = 0 === c.rotatestart ? 0.01 : c.rotatestart),
            (h.start.rotation = c.rotatestart + "deg"),
            (h.end.rotation = c.rotateend + "deg");
          var n = o(c, a, b, f, h);
          (f[0] = parseFloat(f[0]) + n.start.l),
            (g[0] = parseFloat(g[0]) + n.end.l),
            (f[1] = parseFloat(f[1]) + n.start.t),
            (g[1] = parseFloat(g[1]) + n.end.t);
          var p = n.start.r - n.start.l,
            q = n.start.b - n.start.t,
            r = n.end.r - n.end.l,
            s = n.end.b - n.end.t;
          return (
            (f[0] = f[0] > 0 ? 0 : p + f[0] < a ? a - p : f[0]),
            (g[0] = g[0] > 0 ? 0 : r + g[0] < a ? a - r : g[0]),
            (f[1] = f[1] > 0 ? 0 : q + f[1] < b ? b - q : f[1]),
            (g[1] = g[1] > 0 ? 0 : s + g[1] < b ? b - s : g[1]),
            (h.starto.x = f[0] + "px"),
            (h.starto.y = f[1] + "px"),
            (h.endo.x = g[0] + "px"),
            (h.endo.y = g[1] + "px"),
            (h.end.ease = h.endo.ease = c.ease),
            (h.end.force3D = h.endo.force3D = !0),
            h
          );
        };
      void 0 != a.data("kbtl") && (a.data("kbtl").kill(), a.removeData("kbtl"));
      var q = a.data("kenburn"),
        r = q.parent(),
        s = p(j, k, f),
        t = new punchgs.TimelineLite();
      if (
        (t.pause(),
        (s.start.transformOrigin = "0% 0%"),
        (s.starto.transformOrigin = "0% 0%"),
        t.add(punchgs.TweenLite.fromTo(q, f.duration / 1e3, s.start, s.end), 0),
        t.add(
          punchgs.TweenLite.fromTo(r, f.duration / 1e3, s.starto, s.endo),
          0
        ),
        void 0 !== f.blurstart &&
          void 0 !== f.blurend &&
          (0 !== f.blurstart || 0 !== f.blurend))
      ) {
        var u = { a: f.blurstart },
          v = { a: f.blurend, ease: s.endo.ease },
          w = new punchgs.TweenLite(u, f.duration / 1e3, v);
        w.eventCallback(
          "onUpdate",
          function (a) {
            punchgs.TweenLite.set(a, {
              filter: "blur(" + u.a + "px)",
              webkitFilter: "blur(" + u.a + "px)",
            });
          },
          [r]
        ),
          t.add(w, 0);
      }
      t.progress(e), t.play(), a.data("kbtl", t);
    },
  });
})(jQuery);

/************************************************
 * REVOLUTION 5.4.6.5 EXTENSION - LAYER ANIMATION
 * @version: 3.6.5 (10.06.2018)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 ************************************************/
!(function (e) {
  "use strict";
  var A = jQuery.fn.revolution,
    l =
      (A.is_mobile(),
      A.is_android(),
      {
        alias: "LayerAnimation Min JS",
        name: "revolution.extensions.layeranimation.min.js",
        min_core: "5.4.6.4",
        version: "3.6.5",
      });
  jQuery.extend(!0, A, {
    updateMarkup: function (e, t) {
      var i = jQuery(e).data();
      if (void 0 !== i.start && !i.frames_added && void 0 === i.frames) {
        var a = new Array(),
          n = F(B(), i.transform_in, void 0, !1),
          r = F(B(), i.transform_out, void 0, !1),
          o = F(B(), i.transform_hover, void 0, !1);
        jQuery.isNumeric(i.end) &&
          jQuery.isNumeric(i.start) &&
          jQuery.isNumeric(n.speed) &&
          (i.end =
            parseInt(i.end, 0) -
            (parseInt(i.start, 0) + parseFloat(n.speed, 0))),
          a.push({
            frame: "0",
            delay: i.start,
            from: i.transform_in,
            to: i.transform_idle,
            split: i.splitin,
            speed: n.speed,
            ease: n.anim.ease,
            mask: i.mask_in,
            splitdelay: i.elementdelay,
          }),
          a.push({
            frame: "5",
            delay: i.end,
            to: i.transform_out,
            split: i.splitout,
            speed: r.speed,
            ease: r.anim.ease,
            mask: i.mask_out,
            splitdelay: i.elementdelay,
          }),
          i.transform_hover &&
            a.push({
              frame: "hover",
              to: i.transform_hover,
              style: i.style_hover,
              speed: o.speed,
              ease: o.anim.ease,
              splitdelay: i.elementdelay,
            }),
          (i.frames = a);
      }
      if (!i.frames_added) {
        if (
          ((i.inframeindex = 0),
          (i.outframeindex = -1),
          (i.hoverframeindex = -1),
          void 0 !== i.frames)
        )
          for (var s = 0; s < i.frames.length; s++)
            void 0 !== i.frames[s].sfx_effect &&
              0 <= i.frames[s].sfx_effect.indexOf("block") &&
              (0 === s
                ? ((i.frames[s].from = "o:0"), (i.frames[s].to = "o:1"))
                : (i.frames[s].to = "o:0"),
              (i._sfx = "block")),
              void 0 === i.frames[0].from && (i.frames[0].from = "o:inherit"),
              0 === i.frames[0].delay && (i.frames[0].delay = 20),
              "hover" === i.frames[s].frame
                ? (i.hoverframeindex = s)
                : ("frame_999" !== i.frames[s].frame &&
                    "frame_out" !== i.frames[s].frame &&
                    "last" !== i.frames[s].frame &&
                    "end" !== i.frames[s].frame) ||
                  (i.outframeindex = s),
              void 0 !== i.frames[s].split &&
                i.frames[s].split.match(/chars|words|lines/g) &&
                (i.splittext = !0);
        (i.outframeindex =
          -1 === i.outframeindex
            ? -1 === i.hoverframeindex
              ? i.frames.length - 1
              : i.frames.length - 2
            : i.outframeindex),
          (i.frames_added = !0);
      }
    },
    animcompleted: function (e, t) {
      var i = e.data(),
        a = i.videotype,
        n = i.autoplay,
        r = i.autoplayonlyfirsttime;
      null != a &&
        "none" != a &&
        (1 == n || "true" == n || "on" == n || "1sttime" == n || r
          ? (("carousel" !== t.sliderType ||
              ("carousel" === t.sliderType &&
                "on" === t.carousel.showLayersAllTime &&
                e.closest("li").hasClass("active-revslide")) ||
              ("carousel" === t.sliderType &&
                "on" !== t.carousel.showLayersAllTime &&
                e.closest("li").hasClass("active-revslide"))) &&
              A.playVideo(e, t),
            A.toggleState(e.data("videotoggledby")),
            (r || "1sttime" == n) &&
              ((i.autoplayonlyfirsttime = !1), (i.autoplay = "off")))
          : ("no1sttime" == n && (i.datasetautoplay = "on"),
            A.unToggleState(e.data("videotoggledby"))));
    },
    handleStaticLayers: function (e, t) {
      var i = parseInt(e.data("startslide"), 0),
        a = parseInt(e.data("endslide"), 0);
      i < 0 && (i = 0),
        a < 0 && (a = t.realslideamount),
        0 === i && a === t.realslideamount - 1 && (a = t.realslideamount + 1),
        e.data("startslide", i),
        e.data("endslide", a);
    },
    animateTheCaptions: function (e) {
      if ("stop" === A.compare_version(l).check) return !1;
      var p = e.opt,
        t = e.slide,
        n = e.recall,
        i = e.maintimeline,
        r = e.preset,
        o = e.startslideanimat,
        s =
          "carousel" === p.sliderType
            ? 0
            : p.width / 2 - (p.gridwidth[p.curWinRange] * p.bw) / 2,
        a = t.data("index");
      if (
        ((p.layers = p.layers || new Object()),
        (p.layers[a] = p.layers[a] || t.find(".tp-caption")),
        (p.layers.static =
          p.layers.static || p.c.find(".tp-static-layers").find(".tp-caption")),
        void 0 === p.timelines && A.createTimelineStructure(p),
        (p.conh = p.c.height()),
        (p.conw = p.c.width()),
        (p.ulw = p.ul.width()),
        (p.ulh = p.ul.height()),
        p.debugMode)
      ) {
        t.addClass("indebugmode"),
          t.find(".helpgrid").remove(),
          p.c.find(".hglayerinfo").remove(),
          t.append(
            '<div class="helpgrid" style="width:' +
              p.gridwidth[p.curWinRange] * p.bw +
              "px;height:" +
              p.gridheight[p.curWinRange] * p.bw +
              'px;"></div>'
          );
        var d = t.find(".helpgrid");
        d.append(
          '<div class="hginfo">Zoom:' +
            Math.round(100 * p.bw) +
            "% &nbsp;&nbsp;&nbsp; Device Level:" +
            p.curWinRange +
            "&nbsp;&nbsp;&nbsp; Grid Preset:" +
            p.gridwidth[p.curWinRange] +
            "x" +
            p.gridheight[p.curWinRange] +
            "</div>"
        ),
          p.c.append('<div class="hglayerinfo"></div>'),
          d.append('<div class="tlhg"></div>');
      }
      void 0 !== a &&
        p.layers[a] &&
        jQuery.each(p.layers[a], function (e, t) {
          var i = jQuery(this);
          A.updateMarkup(this, p),
            A.prepareSingleCaption({
              caption: i,
              opt: p,
              offsetx: s,
              offsety: 0,
              index: e,
              recall: n,
              preset: r,
            }),
            (r && 0 !== o) ||
              A.buildFullTimeLine({
                caption: i,
                opt: p,
                offsetx: s,
                offsety: 0,
                index: e,
                recall: n,
                preset: r,
                regenerate: 0 === o,
              }),
            n &&
              "carousel" === p.sliderType &&
              "on" === p.carousel.showLayersAllTime &&
              A.animcompleted(i, p);
        }),
        p.layers.static &&
          jQuery.each(p.layers.static, function (e, t) {
            var i = jQuery(this),
              a = i.data();
            !0 !== a.hoveredstatus && !0 !== a.inhoveroutanimation
              ? (A.updateMarkup(this, p),
                A.prepareSingleCaption({
                  caption: i,
                  opt: p,
                  offsetx: s,
                  offsety: 0,
                  index: e,
                  recall: n,
                  preset: r,
                }),
                (r && 0 !== o) ||
                  !0 === a.veryfirstststic ||
                  (A.buildFullTimeLine({
                    caption: i,
                    opt: p,
                    offsetx: s,
                    offsety: 0,
                    index: e,
                    recall: n,
                    preset: r,
                    regenerate: 0 === o,
                  }),
                  (a.veryfirstststic = !0)),
                n &&
                  "carousel" === p.sliderType &&
                  "on" === p.carousel.showLayersAllTime &&
                  A.animcompleted(i, p))
              : A.prepareSingleCaption({
                  caption: i,
                  opt: p,
                  offsetx: s,
                  offsety: 0,
                  index: e,
                  recall: n,
                  preset: r,
                });
          });
      var g = -1 === p.nextSlide || void 0 === p.nextSlide ? 0 : p.nextSlide;
      void 0 !== p.rowzones &&
        (g = g > p.rowzones.length ? p.rowzones.length : g),
        null != p.rowzones &&
          0 < p.rowzones.length &&
          null != p.rowzones[g] &&
          0 <= g &&
          g <= p.rowzones.length &&
          0 < p.rowzones[g].length &&
          A.setSize(p),
        r ||
          (void 0 !== o &&
            (void 0 !== a &&
              jQuery.each(p.timelines[a].layers, function (e, t) {
                var i = t.layer.data();
                ("none" !== t.wrapper && void 0 !== t.wrapper) ||
                  ("keep" == t.triggerstate && "on" === i.triggerstate
                    ? A.playAnimationFrame({
                        caption: t.layer,
                        opt: p,
                        frame: "frame_0",
                        triggerdirection: "in",
                        triggerframein: "frame_0",
                        triggerframeout: "frame_999",
                      })
                    : t.timeline.restart());
              }),
            p.timelines.staticlayers &&
              jQuery.each(p.timelines.staticlayers.layers, function (e, t) {
                var i = t.layer.data(),
                  a = g >= t.firstslide && g <= t.lastslide,
                  n = g < t.firstslide || g > t.lastslide,
                  r = t.timeline.getLabelTime("slide_" + t.firstslide),
                  o = t.timeline.getLabelTime("slide_" + t.lastslide),
                  s = i.static_layer_timeline_time,
                  d =
                    "in" === i.animdirection ||
                    ("out" !== i.animdirection && void 0),
                  l = "bytrigger" === i.frames[0].delay,
                  m =
                    (i.frames[i.frames.length - 1].delay,
                    i.triggered_startstatus),
                  c = i.lasttriggerstate;
                !0 !== i.hoveredstatus &&
                  1 != i.inhoveroutanimation &&
                  (void 0 !== s &&
                    d &&
                    ("keep" == c
                      ? (A.playAnimationFrame({
                          caption: t.layer,
                          opt: p,
                          frame: "frame_0",
                          triggerdirection: "in",
                          triggerframein: "frame_0",
                          triggerframeout: "frame_999",
                        }),
                        i.triggeredtimeline.time(s))
                      : !0 !== i.hoveredstatus && t.timeline.time(s)),
                  "reset" === c &&
                    "hidden" === m &&
                    (t.timeline.time(0), (i.animdirection = "out")),
                  a
                    ? d
                      ? g === t.lastslide &&
                        (t.timeline.play(o), (i.animdirection = "in"))
                      : (l || "in" === i.animdirection || t.timeline.play(r),
                        (("visible" == m && "keep" !== c) ||
                          ("keep" === c && !0 === d) ||
                          ("visible" == m && void 0 === d)) &&
                          (t.timeline.play(r + 0.01), (i.animdirection = "in")))
                    : n && d && t.timeline.play("frame_999"));
              }))),
        null != i &&
          setTimeout(function () {
            i.resume();
          }, 30);
    },
    prepareSingleCaption: function (e) {
      var t = e.caption,
        i = t.data(),
        a = e.opt,
        n = e.recall,
        r = e.recall,
        o = (e.preset, jQuery("body").hasClass("rtl"));
      if (
        ((i._pw = void 0 === i._pw ? t.closest(".tp-parallax-wrap") : i._pw),
        (i._lw = void 0 === i._lw ? t.closest(".tp-loop-wrap") : i._lw),
        (i._mw = void 0 === i._mw ? t.closest(".tp-mask-wrap") : i._mw),
        (i._responsive = i.responsive || "on"),
        (i._respoffset = i.responsive_offset || "on"),
        (i._ba = i.basealign || "grid"),
        (i._gw = "grid" === i._ba ? a.width : a.ulw),
        (i._gh = "grid" === i._ba ? a.height : a.ulh),
        (i._lig =
          void 0 === i._lig
            ? t.hasClass("rev_layer_in_group")
              ? t.closest(".rev_group")
              : t.hasClass("rev_layer_in_column")
              ? t.closest(".rev_column_inner")
              : t.hasClass("rev_column_inner")
              ? t.closest(".rev_row")
              : "none"
            : i._lig),
        (i._column =
          void 0 === i._column
            ? t.hasClass("rev_column_inner")
              ? t.closest(".rev_column")
              : "none"
            : i._column),
        (i._row =
          void 0 === i._row
            ? t.hasClass("rev_column_inner")
              ? t.closest(".rev_row")
              : "none"
            : i._row),
        (i._ingroup =
          void 0 === i._ingroup
            ? !(t.hasClass("rev_group") || !t.closest(".rev_group"))
            : i._ingroup),
        (i._isgroup =
          void 0 === i._isgroup ? !!t.hasClass("rev_group") : i._isgroup),
        (i._nctype = i.type || "none"),
        (i._cbgc_auto =
          void 0 === i._cbgc_auto
            ? "column" === i._nctype && i._pw.find(".rev_column_bg_auto_sized")
            : i._cbgc_auto),
        (i._cbgc_man =
          void 0 === i._cbgc_man
            ? "column" === i._nctype && i._pw.find(".rev_column_bg_man_sized")
            : i._cbgc_man),
        (i._slideid =
          i._slideid || t.closest(".tp-revslider-slidesli").data("index")),
        (i._id = void 0 === i._id ? t.data("id") || t.attr("id") : i._id),
        (i._slidelink =
          void 0 === i._slidelink
            ? void 0 !== t.hasClass("slidelink") && t.hasClass("slidelink")
            : i._slidelink),
        void 0 === i._li &&
          (t.hasClass("tp-static-layer")
            ? ((i._isstatic = !0),
              (i._li = t.closest(".tp-static-layers")),
              (i._slideid = "staticlayers"))
            : (i._li = t.closest(".tp-revslider-slidesli"))),
        (i._row =
          void 0 === i._row
            ? "column" === i._nctype && i._pw.closest(".rev_row")
            : i._row),
        void 0 === i._togglelisteners && t.find(".rs-toggled-content")
          ? ((i._togglelisteners = !0),
            void 0 === i.actions &&
              t.click(function () {
                A.swaptoggleState(t);
              }))
          : (i._togglelisteners = !1),
        "fullscreen" == a.sliderLayout &&
          (e.offsety = i._gh / 2 - (a.gridheight[a.curWinRange] * a.bh) / 2),
        ("on" == a.autoHeight || (null != a.minHeight && 0 < a.minHeight)) &&
          (e.offsety = a.conh / 2 - (a.gridheight[a.curWinRange] * a.bh) / 2),
        e.offsety < 0 && (e.offsety = 0),
        a.debugMode)
      ) {
        t.closest("li")
          .find(".helpgrid")
          .css({ top: e.offsety + "px", left: e.offsetx + "px" });
        var s = a.c.find(".hglayerinfo");
        t.on("hover, mouseenter", function () {
          var i = "";
          t.data() &&
            jQuery.each(t.data(), function (e, t) {
              "object" != typeof t &&
                (i =
                  i +
                  '<span style="white-space:nowrap"><span style="color:#27ae60">' +
                  e +
                  ":</span>" +
                  t +
                  "</span>&nbsp; &nbsp; ");
            }),
            s.html(i);
        });
      }
      if (
        ("off" ===
          (void 0 === i.visibility
            ? "oon"
            : N(i.visibility, a)[a.forcedWinRange] ||
              N(i.visibility, a) ||
              "ooon") ||
        (i._gw < a.hideCaptionAtLimit && "on" == i.captionhidden) ||
        i._gw < a.hideAllCaptionAtLimit
          ? i._pw.addClass("tp-hidden-caption")
          : i._pw.removeClass("tp-hidden-caption"),
        (i.layertype = "html"),
        e.offsetx < 0 && (e.offsetx = 0),
        null != i.thumbimage &&
          null == i.videoposter &&
          (i.videoposter = i.thumbimage),
        0 < t.find("img").length)
      ) {
        var d = t.find("img");
        (i.layertype = "image"),
          0 == d.width() && d.css({ width: "auto" }),
          0 == d.height() && d.css({ height: "auto" }),
          null == d.data("ww") && 0 < d.width() && d.data("ww", d.width()),
          null == d.data("hh") && 0 < d.height() && d.data("hh", d.height());
        var l = d.data("ww"),
          m = d.data("hh"),
          c = "slide" == i._ba ? a.ulw : a.gridwidth[a.curWinRange],
          p = "slide" == i._ba ? a.ulh : a.gridheight[a.curWinRange],
          g =
            "full" ===
              (l =
                N(d.data("ww"), a)[a.curWinRange] ||
                N(d.data("ww"), a) ||
                "auto") || "full-proportional" === l,
          u =
            "full" ===
              (m =
                N(d.data("hh"), a)[a.curWinRange] ||
                N(d.data("hh"), a) ||
                "auto") || "full-proportional" === m;
        if ("full-proportional" === l) {
          var f = d.data("owidth"),
            h = d.data("oheight");
          f / c < h / p ? (m = h * ((l = c) / f)) : (l = f * ((m = p) / h));
        } else
          (l = g
            ? c
            : !jQuery.isNumeric(l) && 0 < l.indexOf("%")
            ? l
            : parseFloat(l)),
            (m = u
              ? p
              : !jQuery.isNumeric(m) && 0 < m.indexOf("%")
              ? m
              : parseFloat(m));
        (l = void 0 === l ? 0 : l),
          (m = void 0 === m ? 0 : m),
          "off" !== i._responsive
            ? ("grid" != i._ba && g
                ? jQuery.isNumeric(l)
                  ? d.css({ width: l + "px" })
                  : d.css({ width: l })
                : jQuery.isNumeric(l)
                ? d.css({ width: l * a.bw + "px" })
                : d.css({ width: l }),
              "grid" != i._ba && u
                ? jQuery.isNumeric(m)
                  ? d.css({ height: m + "px" })
                  : d.css({ height: m })
                : jQuery.isNumeric(m)
                ? d.css({ height: m * a.bh + "px" })
                : d.css({ height: m }))
            : d.css({ width: l, height: m }),
          i._ingroup &&
            "row" !== i._nctype &&
            (void 0 !== l &&
              !jQuery.isNumeric(l) &&
              "string" === jQuery.type(l) &&
              0 < l.indexOf("%") &&
              punchgs.TweenLite.set([i._lw, i._pw, i._mw], { minWidth: l }),
            void 0 !== m &&
              !jQuery.isNumeric(m) &&
              "string" === jQuery.type(m) &&
              0 < m.indexOf("%") &&
              punchgs.TweenLite.set([i._lw, i._pw, i._mw], { minHeight: m }));
      }
      if ("slide" === i._ba) (e.offsetx = 0), (e.offsety = 0);
      else if (
        i._isstatic &&
        void 0 !== a.carousel &&
        void 0 !== a.carousel.horizontal_align &&
        "carousel" === a.sliderType
      ) {
        switch (a.carousel.horizontal_align) {
          case "center":
            e.offsetx = 0 + (a.ulw - a.gridwidth[a.curWinRange] * a.bw) / 2;
            break;
          case "left":
            break;
          case "right":
            e.offsetx = a.ulw - a.gridwidth[a.curWinRange] * a.bw;
        }
        e.offsetx = e.offsetx < 0 ? 0 : e.offsetx;
      }
      var v = "html5" == i.audio ? "audio" : "video";
      if (
        t.hasClass("tp-videolayer") ||
        t.hasClass("tp-audiolayer") ||
        0 < t.find("iframe").length ||
        0 < t.find(v).length
      ) {
        if (
          ((i.layertype = "video"),
          A.manageVideoLayer && A.manageVideoLayer(t, a, n, r),
          !n && !r)
        ) {
          i.videotype;
          A.resetVideo && A.resetVideo(t, a, e.preset);
        }
        var _ = i.aspectratio;
        null != _ && 1 < _.split(":").length && A.prepareCoveredVideo(a, t);
        d = t.find("iframe") ? t.find("iframe") : (d = t.find(v));
        var b = !t.find("iframe"),
          y = t.hasClass("coverscreenvideo");
        d.css({ display: "block" }),
          null == t.data("videowidth") &&
            (t.data("videowidth", d.width()),
            t.data("videoheight", d.height()));
        (l =
          N(t.data("videowidth"), a)[a.curWinRange] ||
          N(t.data("videowidth"), a) ||
          "auto"),
          (m =
            N(t.data("videoheight"), a)[a.curWinRange] ||
            N(t.data("videoheight"), a) ||
            "auto");
        (l =
          "auto" === l || (!jQuery.isNumeric(l) && 0 < l.indexOf("%"))
            ? "auto" === l
              ? "auto"
              : "grid" === i._ba
              ? a.gridwidth[a.curWinRange] * a.bw
              : i._gw
            : parseFloat(l) * a.bw + "px"),
          (m =
            "auto" === m || (!jQuery.isNumeric(m) && 0 < m.indexOf("%"))
              ? "auto" === m
                ? "auto"
                : "grid" === i._ba
                ? a.gridheight[a.curWinRange] * a.bw
                : i._gh
              : parseFloat(m) * a.bh + "px"),
          (i.cssobj = void 0 === i.cssobj ? V(t, 0) : i.cssobj);
        var w = Z(i.cssobj, a);
        if (
          ("auto" == w.lineHeight && (w.lineHeight = w.fontSize + 4),
          t.hasClass("fullscreenvideo") || y)
        ) {
          (e.offsetx = 0), (e.offsety = 0), t.data("x", 0), t.data("y", 0);
          var x = i._gh;
          "on" == a.autoHeight && (x = a.conh),
            t.css({ width: i._gw, height: x });
        } else
          punchgs.TweenLite.set(t, {
            paddingTop: Math.round(w.paddingTop * a.bh) + "px",
            paddingBottom: Math.round(w.paddingBottom * a.bh) + "px",
            paddingLeft: Math.round(w.paddingLeft * a.bw) + "px",
            paddingRight: Math.round(w.paddingRight * a.bw) + "px",
            marginTop: w.marginTop * a.bh + "px",
            marginBottom: w.marginBottom * a.bh + "px",
            marginLeft: w.marginLeft * a.bw + "px",
            marginRight: w.marginRight * a.bw + "px",
            borderTopWidth: Math.round(w.borderTopWidth * a.bh) + "px",
            borderBottomWidth: Math.round(w.borderBottomWidth * a.bh) + "px",
            borderLeftWidth: Math.round(w.borderLeftWidth * a.bw) + "px",
            borderRightWidth: Math.round(w.borderRightWidth * a.bw) + "px",
            width: l,
            height: m,
          });
        ((0 == b && !y) ||
          (1 != i.forcecover && !t.hasClass("fullscreenvideo") && !y)) &&
          (d.width(l), d.height(m)),
          i._ingroup &&
            null !== i.videowidth &&
            void 0 !== i.videowidth &&
            !jQuery.isNumeric(i.videowidth) &&
            0 < i.videowidth.indexOf("%") &&
            punchgs.TweenLite.set([i._lw, i._pw, i._mw], {
              minWidth: i.videowidth,
            });
      }
      E(t, a, 0, i._responsive),
        t.hasClass("tp-resizeme") &&
          t.find("*").each(function () {
            E(jQuery(this), a, "rekursive", i._responsive);
          });
      var T = t.outerHeight(),
        k = t.css("backgroundColor");
      D(t, ".frontcorner", "left", "borderRight", "borderTopColor", T, k),
        D(
          t,
          ".frontcornertop",
          "left",
          "borderRight",
          "borderBottomColor",
          T,
          k
        ),
        D(t, ".backcorner", "right", "borderLeft", "borderBottomColor", T, k),
        D(t, ".backcornertop", "right", "borderLeft", "borderTopColor", T, k),
        "on" == a.fullScreenAlignForce && ((e.offsetx = 0), (e.offsety = 0)),
        "block" === i._sfx &&
          void 0 === i._bmask &&
          ((i._bmask = jQuery('<div class="tp-blockmask"></div>')),
          i._mw.append(i._bmask)),
        (i.arrobj = new Object()),
        (i.arrobj.voa = N(i.voffset, a)[a.curWinRange] || N(i.voffset, a)[0]),
        (i.arrobj.hoa = N(i.hoffset, a)[a.curWinRange] || N(i.hoffset, a)[0]),
        (i.arrobj.elx = N(i.x, a)[a.curWinRange] || N(i.x, a)[0]),
        (i.arrobj.ely = N(i.y, a)[a.curWinRange] || N(i.y, a)[0]);
      var j = 0 == i.arrobj.voa.length ? 0 : i.arrobj.voa,
        L = 0 == i.arrobj.hoa.length ? 0 : i.arrobj.hoa,
        I = 0 == i.arrobj.elx.length ? 0 : i.arrobj.elx,
        W = 0 == i.arrobj.ely.length ? 0 : i.arrobj.ely;
      (i.eow = t.outerWidth(!0)),
        (i.eoh = t.outerHeight(!0)),
        0 == i.eow && 0 == i.eoh && ((i.eow = a.ulw), (i.eoh = a.ulh));
      var R = "off" !== i._respoffset ? parseInt(j, 0) * a.bw : parseInt(j, 0),
        C = "off" !== i._respoffset ? parseInt(L, 0) * a.bw : parseInt(L, 0),
        z = "grid" === i._ba ? a.gridwidth[a.curWinRange] * a.bw : i._gw,
        O = "grid" === i._ba ? a.gridheight[a.curWinRange] * a.bw : i._gh;
      "on" == a.fullScreenAlignForce && ((z = a.ulw), (O = a.ulh)),
        "none" !== i._lig &&
          null != i._lig &&
          ((z = i._lig.width()),
          (O = i._lig.height()),
          (e.offsetx = 0),
          (e.offsety = 0)),
        (I =
          "center" === I || "middle" === I
            ? z / 2 - i.eow / 2 + C
            : "left" === I
            ? C
            : "right" === I
            ? z - i.eow - C
            : "off" !== i._respoffset
            ? I * a.bw
            : I),
        (W =
          "center" == W || "middle" == W
            ? O / 2 - i.eoh / 2 + R
            : "top" == W
            ? R
            : "bottom" == W
            ? O - i.eoh - R
            : "off" !== i._respoffset
            ? W * a.bw
            : W),
        o && !i._slidelink && (I += i.eow),
        i._slidelink && (I = 0),
        (i.calcx = parseInt(I, 0) + e.offsetx),
        (i.calcy = parseInt(W, 0) + e.offsety);
      var Q = t.css("z-Index");
      if ("row" !== i._nctype && "column" !== i._nctype)
        punchgs.TweenLite.set(i._pw, {
          zIndex: Q,
          top: i.calcy,
          left: i.calcx,
          overwrite: "auto",
        });
      else if ("row" !== i._nctype)
        punchgs.TweenLite.set(i._pw, {
          zIndex: Q,
          width: i.columnwidth,
          top: 0,
          left: 0,
          overwrite: "auto",
        });
      else if ("row" === i._nctype) {
        var S = "grid" === i._ba ? z + "px" : "100%";
        punchgs.TweenLite.set(i._pw, {
          zIndex: Q,
          width: S,
          top: 0,
          left: e.offsetx,
          overwrite: "auto",
        });
      }
      if (
        (void 0 !== i.blendmode &&
          punchgs.TweenLite.set(i._pw, { mixBlendMode: i.blendmode }),
        "row" === i._nctype &&
          (i.columnbreak <= a.curWinRange
            ? t.addClass("rev_break_columns")
            : t.removeClass("rev_break_columns")),
        "on" == i.loopanimation &&
          punchgs.TweenLite.set(i._lw, { minWidth: i.eow, minHeight: i.eoh }),
        "column" === i._nctype)
      ) {
        var M = void 0 !== t[0]._gsTransform ? t[0]._gsTransform.y : 0,
          P = parseInt(i._column[0].style.paddingTop, 0);
        punchgs.TweenLite.set(t, { y: 0 }),
          punchgs.TweenLite.set(i._cbgc_man, {
            y: parseInt(P + i._column.offset().top - t.offset().top, 0),
          }),
          punchgs.TweenLite.set(t, { y: M });
      }
      i._ingroup &&
        "row" !== i._nctype &&
        (void 0 !== i._groupw &&
          !jQuery.isNumeric(i._groupw) &&
          0 < i._groupw.indexOf("%") &&
          punchgs.TweenLite.set([i._lw, i._pw, i._mw], { minWidth: i._groupw }),
        void 0 !== i._grouph &&
          !jQuery.isNumeric(i._grouph) &&
          0 < i._grouph.indexOf("%") &&
          punchgs.TweenLite.set([i._lw, i._pw, i._mw], {
            minHeight: i._grouph,
          }));
    },
    createTimelineStructure: function (s) {
      (s.timelines = s.timelines || new Object()),
        s.c.find(".tp-revslider-slidesli, .tp-static-layers").each(function () {
          var e = jQuery(this),
            o = e.data("index");
          (s.timelines[o] = s.timelines[o] || {}),
            (s.timelines[o].layers = s.timelines[o].layers || new Object()),
            e.find(".tp-caption").each(function (e) {
              var t, i, a, n, r;
              (t = jQuery(this)),
                (i = s.timelines[o].layers),
                (a = o),
                (r = new punchgs.TimelineLite({ paused: !0 })),
                ((i = i || new Object())[t.attr("id")] =
                  i[t.attr("id")] || new Object()),
                "staticlayers" === a &&
                  ((i[t.attr("id")].firstslide = t.data("startslide")),
                  (i[t.attr("id")].lastslide = t.data("endslide"))),
                t.data("slideid", a),
                (i[t.attr("id")].defclasses = n = t[0].className),
                (i[t.attr("id")].wrapper =
                  0 <= n.indexOf("rev_layer_in_column")
                    ? t.closest(".rev_column_inner")
                    : 0 <= n.indexOf("rev_column_inner")
                    ? t.closest(".rev_row")
                    : 0 <= n.indexOf("rev_layer_in_group")
                    ? t.closest(".rev_group")
                    : "none"),
                (i[t.attr("id")].timeline = r),
                (i[t.attr("id")].layer = t),
                (i[t.attr("id")].triggerstate = t.data("lasttriggerstate")),
                (i[t.attr("id")].dchildren =
                  0 <= n.indexOf("rev_row")
                    ? t[0].getElementsByClassName("rev_column_inner")
                    : 0 <= n.indexOf("rev_column_inner")
                    ? t[0].getElementsByClassName("tp-caption")
                    : 0 <= n.indexOf("rev_group")
                    ? t[0].getElementsByClassName("rev_layer_in_group")
                    : "none"),
                t.data("timeline", r);
            });
        });
    },
    buildFullTimeLine: function (e) {
      var t,
        i,
        a = e.caption,
        n = a.data(),
        r = e.opt,
        o = {},
        s = h();
      if (
        !(t = r.timelines[n._slideid].layers[n._id]).generated ||
        !0 === e.regenerate
      ) {
        if (
          ((i = t.timeline),
          (t.generated = !0),
          void 0 !== n.current_timeline && !0 !== e.regenerate
            ? ((n.current_timeline_pause = n.current_timeline.paused()),
              (n.current_timeline_time = n.current_timeline.time()),
              (n.current_is_nc_timeline = i === n.current_timeline),
              (n.static_layer_timeline_time = n.current_timeline_time))
            : ((n.static_layer_timeline_time = n.current_timeline_time),
              (n.current_timeline_time = 0),
              n.current_timeline && n.current_timeline.clear()),
          i.clear(),
          (o.svg = null != n.svg_src && a.find("svg")),
          o.svg &&
            ((n.idlesvg = f(n.svg_idle, u())),
            punchgs.TweenLite.set(o.svg, n.idlesvg.anim)),
          -1 !== n.hoverframeindex &&
            void 0 !== n.hoverframeindex &&
            !a.hasClass("rs-hover-ready"))
        ) {
          if (
            (a.addClass("rs-hover-ready"),
            (n.hovertimelines = {}),
            (n.hoveranim = F(s, n.frames[n.hoverframeindex].to)),
            (n.hoveranim = v(n.hoveranim, n.frames[n.hoverframeindex].style)),
            o.svg)
          ) {
            var d = f(n.svg_hover, u());
            null != n.hoveranim.anim.color &&
              ((d.anim.fill = n.hoveranim.anim.color),
              (n.idlesvg.anim.css.fill = o.svg.css("fill"))),
              (n.hoversvg = d);
          }
          a.hover(
            function (e) {
              var t = {
                  caption: jQuery(e.currentTarget),
                  opt: r,
                  firstframe: "frame_0",
                  lastframe: "frame_999",
                },
                i = (g(t), t.caption),
                a = i.data(),
                n = a.frames[a.hoverframeindex];
              (a.forcehover = n.force),
                (a.hovertimelines.item = punchgs.TweenLite.to(
                  i,
                  n.speed / 1e3,
                  a.hoveranim.anim
                )),
                (a.hoverzIndex ||
                  (a.hoveranim.anim && a.hoveranim.anim.zIndex)) &&
                  ((a.basiczindex =
                    void 0 === a.basiczindex ? a.cssobj.zIndex : a.basiczindex),
                  (a.hoverzIndex =
                    void 0 === a.hoverzIndex
                      ? a.hoveranim.anim.zIndex
                      : a.hoverzIndex),
                  (a.inhoverinanimation = !0),
                  0 === n.speed && (a.inhoverinanimation = !1),
                  (a.hovertimelines.pwhoveranim = punchgs.TweenLite.to(
                    a._pw,
                    n.speed / 1e3,
                    { overwrite: "auto", zIndex: a.hoverzIndex }
                  )),
                  a.hovertimelines.pwhoveranim.eventCallback(
                    "onComplete",
                    function (e) {
                      e.inhoverinanimation = !1;
                    },
                    [a]
                  )),
                o.svg &&
                  (a.hovertimelines.svghoveranim = punchgs.TweenLite.to(
                    [o.svg, o.svg.find("path")],
                    n.speed / 1e3,
                    a.hoversvg.anim
                  )),
                (a.hoveredstatus = !0);
            },
            function (e) {
              var t = {
                  caption: jQuery(e.currentTarget),
                  opt: r,
                  firstframe: "frame_0",
                  lastframe: "frame_999",
                },
                i = (g(t), t.caption),
                a = i.data(),
                n = a.frames[a.hoverframeindex];
              (a.hoveredstatus = !1),
                (a.inhoveroutanimation = !0),
                a.hovertimelines.item.pause(),
                (a.hovertimelines.item = punchgs.TweenLite.to(
                  i,
                  n.speed / 1e3,
                  jQuery.extend(!0, {}, a._gsTransformTo)
                )),
                0 == n.speed && (a.inhoveroutanimation = !1),
                a.hovertimelines.item.eventCallback(
                  "onComplete",
                  function (e) {
                    e.inhoveroutanimation = !1;
                  },
                  [a]
                ),
                void 0 !== a.hovertimelines.pwhoveranim &&
                  (a.hovertimelines.pwhoveranim = punchgs.TweenLite.to(
                    a._pw,
                    n.speed / 1e3,
                    { overwrite: "auto", zIndex: a.basiczindex }
                  )),
                o.svg &&
                  punchgs.TweenLite.to(
                    [o.svg, o.svg.find("path")],
                    n.speed / 1e3,
                    a.idlesvg.anim
                  );
            }
          );
        }
        for (var l = 0; l < n.frames.length; l++)
          if (l !== n.hoverframeindex) {
            var m =
              l === n.inframeindex
                ? "frame_0"
                : l === n.outframeindex || "frame_999" === n.frames[l].frame
                ? "frame_999"
                : "frame_" + l;
            (t[(n.frames[l].framename = m)] = {}),
              (t[m].timeline = new punchgs.TimelineLite({ align: "normal" }));
            var c = n.frames[l].delay,
              p =
                (n.triggered_startstatus,
                void 0 !== c
                  ? 0 <= jQuery.inArray(c, ["slideenter", "bytrigger", "wait"])
                    ? c
                    : parseInt(c, 0) / 1e3
                  : "wait");
            void 0 !== t.firstslide &&
              "frame_0" === m &&
              (i.addLabel("slide_" + t.firstslide + "_pause", 0),
              i.addPause("slide_" + t.firstslide + "_pause"),
              i.addLabel("slide_" + t.firstslide, "+=0.005")),
              void 0 !== t.lastslide &&
                "frame_999" === m &&
                (i.addLabel("slide_" + t.lastslide + "_pause", "+=0.01"),
                i.addPause("slide_" + t.lastslide + "_pause"),
                i.addLabel("slide_" + t.lastslide, "+=0.005")),
              jQuery.isNumeric(p)
                ? i.addLabel(m, "+=" + p)
                : (i.addLabel("pause_" + l, "+=0.01"),
                  i.addPause("pause_" + l),
                  i.addLabel(m, "+=0.01")),
              (i = A.createFrameOnTimeline({
                caption: e.caption,
                timeline: i,
                label: m,
                frameindex: l,
                opt: r,
              }));
          }
        e.regenerate ||
          (n.current_is_nc_timeline && (n.current_timeline = i),
          n.current_timeline_pause
            ? i.pause(n.current_timeline_time)
            : i.time(n.current_timeline_time));
      }
    },
    createFrameOnTimeline: function (e) {
      var t = e.caption,
        i = t.data(),
        a = e.label,
        n = e.timeline,
        r = e.frameindex,
        o = e.opt,
        s = t,
        d = {},
        l = o.timelines[i._slideid].layers[i._id],
        m = i.frames.length - 1,
        c = i.frames[r].split,
        p = i.frames[r].split_direction,
        g = i.frames[r].sfx_effect,
        u = !1;
      if (
        ((p = void 0 === p ? "forward" : p),
        -1 !== i.hoverframeindex && i.hoverframeindex == m && (m -= 1),
        (d.content = new punchgs.TimelineLite({ align: "normal" })),
        (d.mask = new punchgs.TimelineLite({ align: "normal" })),
        void 0 === n.vars.id && (n.vars.id = Math.round(1e5 * Math.random())),
        "column" === i._nctype &&
          (n.add(
            punchgs.TweenLite.set(i._cbgc_man, { visibility: "visible" }),
            a
          ),
          n.add(
            punchgs.TweenLite.set(i._cbgc_auto, { visibility: "hidden" }),
            a
          )),
        i.splittext && 0 === r)
      ) {
        void 0 !== i.mySplitText && i.mySplitText.revert();
        var f = 0 < t.find("a").length ? t.find("a") : t;
        (i.mySplitText = new punchgs.SplitText(f, {
          type: "chars,words,lines",
          charsClass: "tp-splitted tp-charsplit",
          wordsClass: "tp-splitted tp-wordsplit",
          linesClass: "tp-splitted tp-linesplit",
        })),
          t.addClass("splitted");
      }
      void 0 !== i.mySplitText &&
        c &&
        c.match(/chars|words|lines/g) &&
        ((s = i.mySplitText[c]), (u = !0));
      var h,
        v,
        _ =
          r !== i.outframeindex
            ? F(B(), i.frames[r].to, void 0, u, s.length - 1)
            : void 0 !== i.frames[r].to &&
              null === i.frames[r].to.match(/auto:auto/g)
            ? F(X(), i.frames[r].to, 1 == o.sdir, u, s.length - 1)
            : F(
                X(),
                i.frames[i.inframeindex].from,
                0 == o.sdir,
                u,
                s.length - 1
              ),
        b =
          void 0 !== i.frames[r].from
            ? F(_, i.frames[i.inframeindex].from, 1 == o.sdir, u, s.length - 1)
            : void 0,
        y = i.frames[r].splitdelay;
      if (
        (0 !== r || e.fromcurrentstate
          ? (v = H(i.frames[r].mask))
          : (h = H(i.frames[r].mask)),
        (_.anim.ease =
          void 0 === i.frames[r].ease
            ? punchgs.Power1.easeInOut
            : i.frames[r].ease),
        void 0 !== b &&
          ((b.anim.ease =
            void 0 === i.frames[r].ease
              ? punchgs.Power1.easeInOut
              : i.frames[r].ease),
          (b.speed =
            void 0 === i.frames[r].speed ? b.speed : i.frames[r].speed),
          (b.anim.x =
            b.anim.x * o.bw ||
            Y(b.anim.x, o, i.eow, i.eoh, i.calcy, i.calcx, "horizontal")),
          (b.anim.y =
            b.anim.y * o.bw ||
            Y(b.anim.y, o, i.eow, i.eoh, i.calcy, i.calcx, "vertical"))),
        void 0 !== _ &&
          ((_.anim.ease =
            void 0 === i.frames[r].ease
              ? punchgs.Power1.easeInOut
              : i.frames[r].ease),
          (_.speed =
            void 0 === i.frames[r].speed ? _.speed : i.frames[r].speed),
          (_.anim.x =
            _.anim.x * o.bw ||
            Y(_.anim.x, o, i.eow, i.eoh, i.calcy, i.calcx, "horizontal")),
          (_.anim.y =
            _.anim.y * o.bw ||
            Y(_.anim.y, o, i.eow, i.eoh, i.calcy, i.calcx, "vertical"))),
        t.data("iframes") &&
          n.add(
            punchgs.TweenLite.set(t.find("iframe"), { autoAlpha: 1 }),
            a + "+=0.001"
          ),
        r === i.outframeindex &&
          (i.frames[r].to && i.frames[r].to.match(/auto:auto/g),
          (_.speed =
            void 0 === i.frames[r].speed || "inherit" === i.frames[r].speed
              ? i.frames[i.inframeindex].speed
              : i.frames[r].speed),
          (_.anim.ease =
            void 0 === i.frames[r].ease || "inherit" === i.frames[r].ease
              ? i.frames[i.inframeindex].ease
              : i.frames[r].ease),
          (_.anim.overwrite = "auto")),
        0 !== r || e.fromcurrentstate)
      )
        0 === r && e.fromcurrentstate && (_.speed = b.speed);
      else {
        if (s != t) {
          var w = jQuery.extend({}, _.anim, !0);
          n.add(punchgs.TweenLite.set(t, _.anim), a),
            ((_ = B()).ease = w.ease),
            void 0 !== w.filter && (_.anim.filter = w.filter),
            void 0 !== w["-webkit-filter"] &&
              (_.anim["-webkit-filter"] = w["-webkit-filter"]);
        }
        (b.anim.visibility = "hidden"),
          (b.anim.immediateRender = !0),
          (_.anim.visibility = "visible");
      }
      e.fromcurrentstate && (_.anim.immediateRender = !0);
      var x = -1;
      if (
        (0 === r &&
          !e.fromcurrentstate &&
          void 0 !== i._bmask &&
          void 0 !== g &&
          0 <= g.indexOf("block")) ||
        (r === i.outframeindex &&
          !e.fromcurrentstate &&
          void 0 !== i._bmask &&
          void 0 !== g &&
          0 <= g.indexOf("block"))
      ) {
        var T = 0 === r ? b.speed / 1e3 / 2 : _.speed / 1e3 / 2,
          k = [
            { scaleY: 1, scaleX: 0, transformOrigin: "0% 50%" },
            { scaleY: 1, scaleX: 1, ease: _.anim.ease },
          ],
          j = {
            scaleY: 1,
            scaleX: 0,
            transformOrigin: "100% 50%",
            ease: _.anim.ease,
          };
        switch (((x = void 0 === y ? T : y + T), g)) {
          case "blocktoleft":
          case "blockfromright":
            (k[0].transformOrigin = "100% 50%"), (j.transformOrigin = "0% 50%");
            break;
          case "blockfromtop":
          case "blocktobottom":
            (k = [
              { scaleX: 1, scaleY: 0, transformOrigin: "50% 0%" },
              { scaleX: 1, scaleY: 1, ease: _.anim.ease },
            ]),
              (j = {
                scaleX: 1,
                scaleY: 0,
                transformOrigin: "50% 100%",
                ease: _.anim.ease,
              });
            break;
          case "blocktotop":
          case "blockfrombottom":
            (k = [
              { scaleX: 1, scaleY: 0, transformOrigin: "50% 100%" },
              { scaleX: 1, scaleY: 1, ease: _.anim.ease },
            ]),
              (j = {
                scaleX: 1,
                scaleY: 0,
                transformOrigin: "50% 0%",
                ease: _.anim.ease,
              });
        }
        (k[0].background = i.frames[r].sfxcolor),
          n.add(d.mask.fromTo(i._bmask, T, k[0], k[1], y), a),
          n.add(d.mask.to(i._bmask, T, j, x), a);
      }
      if (u) var L = M(s.length - 1, p);
      if (0 !== r || e.fromcurrentstate)
        if ("block" === i._sfx_out && r === i.outframeindex)
          n.add(d.content.staggerTo(s, 0.001, { autoAlpha: 0, delay: x }), a),
            n.add(
              d.content.staggerTo(s, _.speed / 1e3 / 2 - 0.001, {
                x: 0,
                delay: x,
              }),
              a + "+=0.001"
            );
        else if (u && void 0 !== L) {
          R = { to: P(_.anim) };
          for (var I in s) {
            z = jQuery.extend({}, _.anim);
            for (var W in R.to)
              (z[W] = parseInt(R.to[W].values[R.to[W].index], 0)),
                (R.to[W].index =
                  R.to[W].index < R.to[W].len ? R.to[W].index + 1 : 0);
            void 0 !== i.frames[r].color && (z.color = i.frames[r].color),
              void 0 !== i.frames[r].bgcolor &&
                (z.backgroundColor = i.frames[r].bgcolor),
              n.add(d.content.to(s[L[I]], _.speed / 1e3, z, y * I), a);
          }
        } else
          void 0 !== i.frames[r].color && (_.anim.color = i.frames[r].color),
            void 0 !== i.frames[r].bgcolor &&
              (_.anim.backgroundColor = i.frames[r].bgcolor),
            n.add(d.content.staggerTo(s, _.speed / 1e3, _.anim, y), a);
      else if ("block" === i._sfx_in)
        n.add(
          d.content.staggerFromTo(
            s,
            0.05,
            { x: 0, y: 0, autoAlpha: 0 },
            { x: 0, y: 0, autoAlpha: 1, delay: x }
          ),
          a
        );
      else if (u && void 0 !== L) {
        var R = { from: P(b.anim), to: P(_.anim) };
        for (var I in s) {
          var C = jQuery.extend({}, b.anim),
            z = jQuery.extend({}, _.anim);
          for (var W in R.from)
            (C[W] = parseInt(R.from[W].values[R.from[W].index], 0)),
              (R.from[W].index =
                R.from[W].index < R.from[W].len ? R.from[W].index + 1 : 0);
          (z.ease = C.ease),
            void 0 !== i.frames[r].color &&
              ((C.color = i.frames[r].color),
              (z.color = i.cssobj.styleProps.color)),
            void 0 !== i.frames[r].bgcolor &&
              ((C.backgroundColor = i.frames[r].bgcolor),
              (z.backgroundColor = i.cssobj.styleProps["background-color"])),
            n.add(d.content.fromTo(s[L[I]], b.speed / 1e3, C, z, y * I), a);
        }
      } else
        void 0 !== i.frames[r].color &&
          ((b.anim.color = i.frames[r].color),
          (_.anim.color = i.cssobj.styleProps.color)),
          void 0 !== i.frames[r].bgcolor &&
            ((b.anim.backgroundColor = i.frames[r].bgcolor),
            (_.anim.backgroundColor = i.cssobj.styleProps["background-color"])),
          n.add(
            d.content.staggerFromTo(s, b.speed / 1e3, b.anim, _.anim, y),
            a
          );
      return (
        void 0 === v ||
          !1 === v ||
          (0 === r && e.ignorefirstframe) ||
          ((v.anim.ease =
            void 0 === v.anim.ease || "inherit" === v.anim.ease
              ? i.frames[0].ease
              : v.anim.ease),
          (v.anim.overflow = "hidden"),
          (v.anim.x =
            v.anim.x * o.bw ||
            Y(v.anim.x, o, i.eow, i.eoh, i.calcy, i.calcx, "horizontal")),
          (v.anim.y =
            v.anim.y * o.bw ||
            Y(v.anim.y, o, i.eow, i.eoh, i.calcy, i.calcx, "vertical"))),
        (0 === r && h && !1 !== h && !e.fromcurrentstate) ||
        (0 === r && e.ignorefirstframe)
          ? (((v = new Object()).anim = new Object()),
            (v.anim.overwrite = "auto"),
            (v.anim.ease = _.anim.ease),
            (v.anim.x = v.anim.y = 0),
            h &&
              !1 !== h &&
              ((h.anim.x =
                h.anim.x * o.bw ||
                Y(h.anim.x, o, i.eow, i.eoh, i.calcy, i.calcx, "horizontal")),
              (h.anim.y =
                h.anim.y * o.bw ||
                Y(h.anim.y, o, i.eow, i.eoh, i.calcy, i.calcx, "vertical")),
              (h.anim.overflow = "hidden")))
          : 0 === r && n.add(d.mask.set(i._mw, { overflow: "visible" }), a),
        void 0 !== h && void 0 !== v && !1 !== h && !1 !== v
          ? n.add(d.mask.fromTo(i._mw, b.speed / 1e3, h.anim, v.anim, y), a)
          : void 0 !== v &&
            !1 !== v &&
            n.add(d.mask.to(i._mw, _.speed / 1e3, v.anim, y), a),
        n.addLabel(a + "_end"),
        i._gsTransformTo &&
          r === m &&
          i.hoveredstatus &&
          (i.hovertimelines.item = punchgs.TweenLite.to(
            t,
            0,
            i._gsTransformTo
          )),
        (i._gsTransformTo = !1),
        d.content.eventCallback("onStart", O, [
          r,
          l,
          i._pw,
          i,
          n,
          _.anim,
          t,
          e.updateStaticTimeline,
          o,
        ]),
        d.content.eventCallback("onUpdate", Q, [
          a,
          i._id,
          i._pw,
          i,
          n,
          r,
          jQuery.extend(!0, {}, _.anim),
          e.updateStaticTimeline,
          t,
          o,
        ]),
        d.content.eventCallback("onComplete", S, [
          r,
          i.frames.length,
          m,
          i._pw,
          i,
          n,
          e.updateStaticTimeline,
          t,
          o,
        ]),
        n
      );
    },
    endMoveCaption: function (e) {
      (e.firstframe = "frame_0"), (e.lastframe = "frame_999");
      var t = g(e),
        i = e.caption.data();
      if (
        (void 0 !== e.frame
          ? t.timeline.play(e.frame)
          : (!t.static ||
              e.currentslide >= t.removeonslide ||
              e.currentslide < t.showonslide) &&
            ((t.outnow = new punchgs.TimelineLite()),
            t.timeline.pause(),
            !0 === i.visibleelement &&
              A.createFrameOnTimeline({
                caption: e.caption,
                timeline: t.outnow,
                label: "outnow",
                frameindex: e.caption.data("outframeindex"),
                opt: e.opt,
                fromcurrentstate: !0,
              }).play()),
        e.checkchildrens &&
          t.timeline_obj &&
          t.timeline_obj.dchildren &&
          "none" !== t.timeline_obj.dchildren &&
          0 < t.timeline_obj.dchildren.length)
      )
        for (var a = 0; a < t.timeline_obj.dchildren.length; a++)
          A.endMoveCaption({
            caption: jQuery(t.timeline_obj.dchildren[a]),
            opt: e.opt,
          });
    },
    playAnimationFrame: function (e) {
      (e.firstframe = e.triggerframein), (e.lastframe = e.triggerframeout);
      var t,
        i = g(e),
        a = e.caption.data(),
        n = 0;
      for (var r in a.frames) a.frames[r].framename === e.frame && (t = n), n++;
      void 0 !== a.triggeredtimeline && a.triggeredtimeline.pause(),
        (a.triggeredtimeline = new punchgs.TimelineLite()),
        i.timeline.pause();
      var o = !0 === a.visibleelement;
      a.triggeredtimeline = A.createFrameOnTimeline({
        caption: e.caption,
        timeline: a.triggeredtimeline,
        label: "triggered",
        frameindex: t,
        updateStaticTimeline: !0,
        opt: e.opt,
        ignorefirstframe: !0,
        fromcurrentstate: o,
      }).play();
    },
    removeTheCaptions: function (e, i) {
      if ("stop" === A.compare_version(l).check) return !1;
      var t = e.data("index"),
        a = new Array();
      i.layers[t] &&
        jQuery.each(i.layers[t], function (e, t) {
          a.push(t);
        });
      var n = A.currentSlideIndex(i);
      a &&
        jQuery.each(a, function (e) {
          var t = jQuery(this);
          "carousel" === i.sliderType && "on" === i.carousel.showLayersAllTime
            ? (clearTimeout(t.data("videoplaywait")),
              A.stopVideo && A.stopVideo(t, i))
            : (r(t),
              clearTimeout(t.data("videoplaywait")),
              A.endMoveCaption({ caption: t, opt: i, currentslide: n })),
            A.removeMediaFromList && A.removeMediaFromList(t, i),
            (i.lastplayedvideos = []);
        });
    },
  });
  var O = function (e, t, i, a, n, r, o, s, d) {
      var l = {};
      if (
        ((l.layer = o),
        (l.eventtype =
          0 === e
            ? "enterstage"
            : e === a.outframeindex
            ? "leavestage"
            : "framestarted"),
        (l.layertype = o.data("layertype")),
        (a.active = !0),
        (l.frame_index = e),
        (l.layersettings = o.data()),
        d.c.trigger("revolution.layeraction", [l]),
        "on" == a.loopanimation && c(a._lw, d.bw),
        "enterstage" === l.eventtype &&
          ((a.animdirection = "in"),
          (a.visibleelement = !0),
          A.toggleState(a.layertoggledby)),
        "none" !== t.dchildren &&
          void 0 !== t.dchildren &&
          0 < t.dchildren.length)
      )
        if (0 === e)
          for (var m = 0; m < t.dchildren.length; m++)
            jQuery(t.dchildren[m]).data("timeline").play(0);
        else if (e === a.outframeindex)
          for (m = 0; m < t.dchildren.length; m++)
            A.endMoveCaption({
              caption: jQuery(t.dchildren[m]),
              opt: d,
              checkchildrens: !0,
            });
      punchgs.TweenLite.set(i, { visibility: "visible" }),
        (a.current_frame = e),
        (a.current_timeline = n),
        (a.current_timeline_time = n.time()),
        s && (a.static_layer_timeline_time = a.current_timeline_time),
        (a.last_frame_started = e);
    },
    Q = function (e, t, i, a, n, r, o, s, d, l) {
      "column" === a._nctype && b(d, l),
        punchgs.TweenLite.set(i, { visibility: "visible" }),
        (a.current_frame = r),
        (a.current_timeline = n),
        (a.current_timeline_time = n.time()),
        s && (a.static_layer_timeline_time = a.current_timeline_time),
        void 0 !== a.hoveranim &&
          !1 === a._gsTransformTo &&
          ((a._gsTransformTo = o),
          a._gsTransformTo &&
            a._gsTransformTo.startAt &&
            delete a._gsTransformTo.startAt,
          void 0 === a.cssobj.styleProps.css
            ? (a._gsTransformTo = jQuery.extend(
                !0,
                {},
                a.cssobj.styleProps,
                a._gsTransformTo
              ))
            : (a._gsTransformTo = jQuery.extend(
                !0,
                {},
                a.cssobj.styleProps.css,
                a._gsTransformTo
              ))),
        (a.visibleelement = !0);
    },
    S = function (e, t, i, a, n, r, o, s, d) {
      var l = {};
      (l.layer = s),
        (l.eventtype =
          0 === e
            ? "enteredstage"
            : e === t - 1 || e === i
            ? "leftstage"
            : "frameended"),
        (l.layertype = s.data("layertype")),
        (l.layersettings = s.data()),
        d.c.trigger("revolution.layeraction", [l]),
        "leftstage" !== l.eventtype && A.animcompleted(s, d),
        "leftstage" === l.eventtype && A.stopVideo && A.stopVideo(s, d),
        "column" === n._nctype &&
          (punchgs.TweenLite.to(n._cbgc_man, 0.01, { visibility: "hidden" }),
          punchgs.TweenLite.to(n._cbgc_auto, 0.01, { visibility: "visible" })),
        "leftstage" === l.eventtype &&
          ((n.active = !1),
          punchgs.TweenLite.set(a, { visibility: "hidden", overwrite: "auto" }),
          (n.animdirection = "out"),
          (n.visibleelement = !1),
          A.unToggleState(n.layertoggledby),
          "video" === n._nctype &&
            A.resetVideo &&
            setTimeout(function () {
              A.resetVideo(s, d);
            }, 100)),
        (n.current_frame = e),
        (n.current_timeline = r),
        (n.current_timeline_time = r.time()),
        o && (n.static_layer_timeline_time = n.current_timeline_time);
    },
    g = function (e) {
      var t = {};
      return (
        (e.firstframe = void 0 === e.firstframe ? "frame_0" : e.firstframe),
        (e.lastframe = void 0 === e.lastframe ? "frame_999" : e.lastframe),
        (t.id = e.caption.data("id") || e.caption.attr("id")),
        (t.slideid =
          e.caption.data("slideid") ||
          e.caption.closest(".tp-revslider-slidesli").data("index")),
        (t.timeline_obj = e.opt.timelines[t.slideid].layers[t.id]),
        (t.timeline = t.timeline_obj.timeline),
        (t.ffs = t.timeline.getLabelTime(e.firstframe)),
        (t.ffe = t.timeline.getLabelTime(e.firstframe + "_end")),
        (t.lfs = t.timeline.getLabelTime(e.lastframe)),
        (t.lfe = t.timeline.getLabelTime(e.lastframe + "_end")),
        (t.ct = t.timeline.time()),
        (t.static =
          null != t.timeline_obj.firstslide ||
          null != t.timeline_obj.lastslide),
        t.static &&
          ((t.showonslide = t.timeline_obj.firstslide),
          (t.removeonslide = t.timeline_obj.lastslide)),
        t
      );
    },
    M = function (e, t) {
      var i = new Array();
      switch (t) {
        case "forward":
        case "random":
          for (var a = 0; a <= e; a++) i.push(a);
          "random" === t &&
            (i = (function (e) {
              for (var t, i, a = e.length; 0 !== a; )
                (i = Math.floor(Math.random() * a)),
                  (t = e[(a -= 1)]),
                  (e[a] = e[i]),
                  (e[i] = t);
              return e;
            })(i));
          break;
        case "backward":
          for (a = 0; a <= e; a++) i.push(e - a);
          break;
        case "middletoedge":
          var n = Math.ceil(e / 2),
            r = n - 1,
            o = n + 1;
          i.push(n);
          for (a = 0; a < n; a++)
            0 <= r && i.push(r), o <= e && i.push(o), r--, o++;
          break;
        case "edgetomiddle":
          for (r = e, o = 0, a = 0; a <= Math.floor(e / 2); a++)
            i.push(r), o < r && i.push(o), r--, o++;
      }
      return i;
    },
    P = function (e) {
      var t = {};
      for (var i in e)
        "string" == typeof e[i] &&
          0 <= e[i].indexOf("|") &&
          (void 0 === t[i] && (t[i] = { index: 0 }),
          (t[i].values = e[i].replace("[", "").replace("]", "").split("|")),
          (t[i].len = t[i].values.length - 1));
      return t;
    },
    B = function (e) {
      return (
        ((e = void 0 === e ? new Object() : e).anim =
          void 0 === e.anim ? new Object() : e.anim),
        (e.anim.x = void 0 === e.anim.x ? 0 : e.anim.x),
        (e.anim.y = void 0 === e.anim.y ? 0 : e.anim.y),
        (e.anim.z = void 0 === e.anim.z ? 0 : e.anim.z),
        (e.anim.rotationX = void 0 === e.anim.rotationX ? 0 : e.anim.rotationX),
        (e.anim.rotationY = void 0 === e.anim.rotationY ? 0 : e.anim.rotationY),
        (e.anim.rotationZ = void 0 === e.anim.rotationZ ? 0 : e.anim.rotationZ),
        (e.anim.scaleX = void 0 === e.anim.scaleX ? 1 : e.anim.scaleX),
        (e.anim.scaleY = void 0 === e.anim.scaleY ? 1 : e.anim.scaleY),
        (e.anim.skewX = void 0 === e.anim.skewX ? 0 : e.anim.skewX),
        (e.anim.skewY = void 0 === e.anim.skewY ? 0 : e.anim.skewY),
        (e.anim.opacity = void 0 === e.anim.opacity ? 1 : e.anim.opacity),
        (e.anim.transformOrigin =
          void 0 === e.anim.transformOrigin
            ? "50% 50%"
            : e.anim.transformOrigin),
        (e.anim.transformPerspective =
          void 0 === e.anim.transformPerspective
            ? 600
            : e.anim.transformPerspective),
        (e.anim.rotation = void 0 === e.anim.rotation ? 0 : e.anim.rotation),
        (e.anim.force3D = void 0 === e.anim.force3D ? "auto" : e.anim.force3D),
        (e.anim.autoAlpha = void 0 === e.anim.autoAlpha ? 1 : e.anim.autoAlpha),
        (e.anim.visibility =
          void 0 === e.anim.visibility ? "visible" : e.anim.visibility),
        (e.anim.overwrite =
          void 0 === e.anim.overwrite ? "auto" : e.anim.overwrite),
        (e.speed = void 0 === e.speed ? 0.3 : e.speed),
        (e.filter =
          void 0 === e.filter
            ? "blur(0px) grayscale(0%) brightness(100%)"
            : e.filter),
        (e["-webkit-filter"] =
          void 0 === e["-webkit-filter"]
            ? "blur(0px) grayscale(0%) brightness(100%)"
            : e["-webkit-filter"]),
        e
      );
    },
    u = function () {
      var e = new Object();
      return (
        (e.anim = new Object()),
        (e.anim.stroke = "none"),
        (e.anim.strokeWidth = 0),
        (e.anim.strokeDasharray = "none"),
        (e.anim.strokeDashoffset = "0"),
        e
      );
    },
    f = function (e, r) {
      var t = e.split(";");
      return (
        t &&
          jQuery.each(t, function (e, t) {
            var i = t.split(":"),
              a = i[0],
              n = i[1];
            "sc" == a && (r.anim.stroke = n),
              "sw" == a && (r.anim.strokeWidth = n),
              "sda" == a && (r.anim.strokeDasharray = n),
              "sdo" == a && (r.anim.strokeDashoffset = n);
          }),
        r
      );
    },
    X = function () {
      var e = new Object();
      return (
        (e.anim = new Object()),
        (e.anim.x = 0),
        (e.anim.y = 0),
        (e.anim.z = 0),
        e
      );
    },
    h = function () {
      var e = new Object();
      return (e.anim = new Object()), (e.speed = 0.2), e;
    },
    m = function (e, t, i, a, n) {
      if (((n = void 0 === n ? "" : n), jQuery.isNumeric(parseFloat(e))))
        return parseFloat(e) + n;
      if (void 0 === e || "inherit" === e) return t + "ext";
      if (1 < e.split("{").length) {
        var r = e.split(","),
          o = parseFloat(r[1].split("}")[0]);
        if (
          ((r = parseFloat(r[0].split("{")[1])), void 0 !== i && void 0 !== a)
        ) {
          parseInt(Math.random() * (o - r), 0), parseInt(r, 0);
          for (var s = 0; s < a; s++)
            e =
              e +
              "|" +
              (parseInt(Math.random() * (o - r), 0) + parseInt(r, 0)) +
              n;
          e += "]";
        } else e = Math.random() * (o - r) + r;
      }
      return e;
    },
    Y = function (e, t, i, a, n, r, o) {
      return (
        !jQuery.isNumeric(e) && e.match(/%]/g)
          ? ((e = e.split("[")[1].split("]")[0]),
            "horizontal" == o
              ? (e = ((i + 2) * parseInt(e, 0)) / 100)
              : "vertical" == o && (e = ((a + 2) * parseInt(e, 0)) / 100))
          : (e =
              "top" ===
                (e =
                  "left" ===
                    (e =
                      "layer_top" ===
                      (e =
                        "layer_left" === e
                          ? 0 - i
                          : "layer_right" === e
                          ? i
                          : e)
                        ? 0 - a
                        : "layer_bottom" === e
                        ? a
                        : e) || "stage_left" === e
                    ? 0 - i - r
                    : "right" === e || "stage_right" === e
                    ? t.conw - r
                    : "center" === e || "stage_center" === e
                    ? t.conw / 2 - i / 2 - r
                    : e) || "stage_top" === e
                ? 0 - a - n
                : "bottom" === e || "stage_bottom" === e
                ? t.conh - n
                : "middle" === e || "stage_middle" === e
                ? t.conh / 2 - a / 2 - n
                : e),
        e
      );
    },
    F = function (e, t, r, o, s) {
      var d = new Object();
      if (((d = jQuery.extend(!0, {}, d, e)), void 0 === t)) return d;
      var i = t.split(";"),
        l = "";
      return (
        i &&
          jQuery.each(i, function (e, t) {
            var i = t.split(":"),
              a = i[0],
              n = i[1];
            r &&
              "none" !== r &&
              null != n &&
              0 < n.length &&
              n.match(/\(R\)/) &&
              ("[" ===
                (n =
                  "right" === (n = n.replace("(R)", ""))
                    ? "left"
                    : "left" === n
                    ? "right"
                    : "top" === n
                    ? "bottom"
                    : "bottom" === n
                    ? "top"
                    : n)[0] && "-" === n[1]
                ? (n = n.replace("[-", "["))
                : "[" === n[0] && "-" !== n[1]
                ? (n = n.replace("[", "[-"))
                : "-" === n[0]
                ? (n = n.replace("-", ""))
                : n[0].match(/[1-9]/) && (n = "-" + n)),
              null != n &&
                ((n = n.replace(/\(R\)/, "")),
                ("rotationX" != a && "rX" != a) ||
                  (d.anim.rotationX = m(n, d.anim.rotationX, o, s, "deg")),
                ("rotationY" != a && "rY" != a) ||
                  (d.anim.rotationY = m(n, d.anim.rotationY, o, s, "deg")),
                ("rotationZ" != a && "rZ" != a) ||
                  (d.anim.rotation = m(n, d.anim.rotationZ, o, s, "deg")),
                ("scaleX" != a && "sX" != a) ||
                  (d.anim.scaleX = m(n, d.anim.scaleX, o, s)),
                ("scaleY" != a && "sY" != a) ||
                  (d.anim.scaleY = m(n, d.anim.scaleY, o, s)),
                ("opacity" != a && "o" != a) ||
                  (d.anim.opacity = m(n, d.anim.opacity, o, s)),
                "fb" == a &&
                  (l =
                    "" === l
                      ? "blur(" + parseInt(n, 0) + "px)"
                      : l + " blur(" + parseInt(n, 0) + "px)"),
                "fg" == a &&
                  (l =
                    "" === l
                      ? "grayscale(" + parseInt(n, 0) + "%)"
                      : l + " grayscale(" + parseInt(n, 0) + "%)"),
                "fbr" == a &&
                  (l =
                    "" === l
                      ? "brightness(" + parseInt(n, 0) + "%)"
                      : l + " brightness(" + parseInt(n, 0) + "%)"),
                0 === d.anim.opacity && (d.anim.autoAlpha = 0),
                (d.anim.opacity = 0 == d.anim.opacity ? 1e-4 : d.anim.opacity),
                ("skewX" != a && "skX" != a) ||
                  (d.anim.skewX = m(n, d.anim.skewX, o, s)),
                ("skewY" != a && "skY" != a) ||
                  (d.anim.skewY = m(n, d.anim.skewY, o, s)),
                "x" == a && (d.anim.x = m(n, d.anim.x, o, s)),
                "y" == a && (d.anim.y = m(n, d.anim.y, o, s)),
                "z" == a && (d.anim.z = m(n, d.anim.z, o, s)),
                ("transformOrigin" != a && "tO" != a) ||
                  (d.anim.transformOrigin = n.toString()),
                ("transformPerspective" != a && "tP" != a) ||
                  (d.anim.transformPerspective = parseInt(n, 0)),
                ("speed" != a && "s" != a) || (d.speed = parseFloat(n)));
          }),
        "" !== l && ((d.anim["-webkit-filter"] = l), (d.anim.filter = l)),
        d
      );
    },
    H = function (e) {
      if (void 0 === e) return !1;
      var n = new Object();
      n.anim = new Object();
      var t = e.split(";");
      return (
        t &&
          jQuery.each(t, function (e, t) {
            var i = (t = t.split(":"))[0],
              a = t[1];
            "x" == i && (n.anim.x = a),
              "y" == i && (n.anim.y = a),
              "s" == i && (n.speed = parseFloat(a)),
              ("e" != i && "ease" != i) || (n.anim.ease = a);
          }),
        n
      );
    },
    N = function (i, e, t) {
      if (
        (null == i && (i = 0),
        !jQuery.isArray(i) &&
          "string" === jQuery.type(i) &&
          (1 < i.split(",").length || 1 < i.split("[").length))
      ) {
        var a = (i = (i = i.replace("[", "")).replace("]", "")).match(/'/g)
          ? i.split("',")
          : i.split(",");
        (i = new Array()),
          a &&
            jQuery.each(a, function (e, t) {
              (t = (t = t.replace("'", "")).replace("'", "")), i.push(t);
            });
      } else {
        var n = i;
        jQuery.isArray(i) || (i = new Array()).push(n);
      }
      n = i[i.length - 1];
      if (i.length < e.rle) for (var r = 1; r <= e.curWinRange; r++) i.push(n);
      return i;
    };
  function D(e, t, i, a, n, r, o) {
    var s = e.find(t);
    s.css("borderWidth", r + "px"),
      s.css(i, 0 - r + "px"),
      s.css(a, "0px solid transparent"),
      s.css(n, o);
  }
  var v = function (a, e) {
      if (void 0 === e) return a;
      var t = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(
        "c:",
        "color:"
      )).replace("bg:", "background-color:")).replace(
        "bw:",
        "border-width:"
      )).replace("bc:", "border-color:")).replace(
        "br:",
        "borderRadius:"
      )).replace("bs:", "border-style:")).replace(
        "td:",
        "text-decoration:"
      )).replace("zi:", "zIndex:")).split(";");
      return (
        t &&
          jQuery.each(t, function (e, t) {
            var i = t.split(":");
            0 < i[0].length &&
              ("background-color" === i[0] &&
                0 <= i[1].indexOf("gradient") &&
                (i[0] = "background"),
              (a.anim[i[0]] = i[1]));
          }),
        a
      );
    },
    V = function (e, t) {
      var i,
        a = new Object(),
        n = !1;
      if (
        ("rekursive" == t &&
          (i = e.closest(".tp-caption")) &&
          e.css("fontSize") === i.css("fontSize") &&
          e.css("fontWeight") === i.css("fontWeight") &&
          e.css("lineHeight") === i.css("lineHeight") &&
          (n = !0),
        (a.basealign = e.data("basealign") || "grid"),
        (a.fontSize = n
          ? void 0 === i.data("fontsize")
            ? parseInt(i.css("fontSize"), 0) || 0
            : i.data("fontsize")
          : void 0 === e.data("fontsize")
          ? parseInt(e.css("fontSize"), 0) || 0
          : e.data("fontsize")),
        (a.fontWeight = n
          ? void 0 === i.data("fontweight")
            ? parseInt(i.css("fontWeight"), 0) || 0
            : i.data("fontweight")
          : void 0 === e.data("fontweight")
          ? parseInt(e.css("fontWeight"), 0) || 0
          : e.data("fontweight")),
        (a.whiteSpace = n
          ? void 0 === i.data("whitespace")
            ? i.css("whitespace") || "normal"
            : i.data("whitespace")
          : void 0 === e.data("whitespace")
          ? e.css("whitespace") || "normal"
          : e.data("whitespace")),
        (a.textAlign = n
          ? void 0 === i.data("textalign")
            ? i.css("textalign") || "inherit"
            : i.data("textalign")
          : void 0 === e.data("textalign")
          ? e.css("textalign") || "inherit"
          : e.data("textalign")),
        (a.zIndex = n
          ? void 0 === i.data("zIndex")
            ? i.css("zIndex") || "inherit"
            : i.data("zIndex")
          : void 0 === e.data("zIndex")
          ? e.css("zIndex") || "inherit"
          : e.data("zIndex")),
        -1 !==
          jQuery.inArray(e.data("layertype"), ["video", "image", "audio"]) ||
        e.is("img")
          ? (a.lineHeight = 0)
          : (a.lineHeight = n
              ? void 0 === i.data("lineheight")
                ? parseInt(i.css("lineHeight"), 0) || 0
                : i.data("lineheight")
              : void 0 === e.data("lineheight")
              ? parseInt(e.css("lineHeight"), 0) || 0
              : e.data("lineheight")),
        (a.letterSpacing = n
          ? void 0 === i.data("letterspacing")
            ? parseFloat(i.css("letterSpacing"), 0) || 0
            : i.data("letterspacing")
          : void 0 === e.data("letterspacing")
          ? parseFloat(e.css("letterSpacing")) || 0
          : e.data("letterspacing")),
        (a.paddingTop =
          void 0 === e.data("paddingtop")
            ? parseInt(e.css("paddingTop"), 0) || 0
            : e.data("paddingtop")),
        (a.paddingBottom =
          void 0 === e.data("paddingbottom")
            ? parseInt(e.css("paddingBottom"), 0) || 0
            : e.data("paddingbottom")),
        (a.paddingLeft =
          void 0 === e.data("paddingleft")
            ? parseInt(e.css("paddingLeft"), 0) || 0
            : e.data("paddingleft")),
        (a.paddingRight =
          void 0 === e.data("paddingright")
            ? parseInt(e.css("paddingRight"), 0) || 0
            : e.data("paddingright")),
        (a.marginTop =
          void 0 === e.data("margintop")
            ? parseInt(e.css("marginTop"), 0) || 0
            : e.data("margintop")),
        (a.marginBottom =
          void 0 === e.data("marginbottom")
            ? parseInt(e.css("marginBottom"), 0) || 0
            : e.data("marginbottom")),
        (a.marginLeft =
          void 0 === e.data("marginleft")
            ? parseInt(e.css("marginLeft"), 0) || 0
            : e.data("marginleft")),
        (a.marginRight =
          void 0 === e.data("marginright")
            ? parseInt(e.css("marginRight"), 0) || 0
            : e.data("marginright")),
        (a.borderTopWidth =
          void 0 === e.data("bordertopwidth")
            ? parseInt(e.css("borderTopWidth"), 0) || 0
            : e.data("bordertopwidth")),
        (a.borderBottomWidth =
          void 0 === e.data("borderbottomwidth")
            ? parseInt(e.css("borderBottomWidth"), 0) || 0
            : e.data("borderbottomwidth")),
        (a.borderLeftWidth =
          void 0 === e.data("borderleftwidth")
            ? parseInt(e.css("borderLeftWidth"), 0) || 0
            : e.data("borderleftwidth")),
        (a.borderRightWidth =
          void 0 === e.data("borderrightwidth")
            ? parseInt(e.css("borderRightWidth"), 0) || 0
            : e.data("borderrightwidth")),
        "rekursive" != t)
      ) {
        if (
          ((a.color =
            void 0 === e.data("color") ? "nopredefinedcolor" : e.data("color")),
          (a.whiteSpace = n
            ? void 0 === i.data("whitespace")
              ? i.css("whiteSpace") || "nowrap"
              : i.data("whitespace")
            : void 0 === e.data("whitespace")
            ? e.css("whiteSpace") || "nowrap"
            : e.data("whitespace")),
          (a.textAlign = n
            ? void 0 === i.data("textalign")
              ? i.css("textalign") || "inherit"
              : i.data("textalign")
            : void 0 === e.data("textalign")
            ? e.css("textalign") || "inherit"
            : e.data("textalign")),
          (a.fontWeight = n
            ? void 0 === i.data("fontweight")
              ? parseInt(i.css("fontWeight"), 0) || 0
              : i.data("fontweight")
            : void 0 === e.data("fontweight")
            ? parseInt(e.css("fontWeight"), 0) || 0
            : e.data("fontweight")),
          (a.minWidth =
            void 0 === e.data("width")
              ? parseInt(e.css("minWidth"), 0) || 0
              : e.data("width")),
          (a.minHeight =
            void 0 === e.data("height")
              ? parseInt(e.css("minHeight"), 0) || 0
              : e.data("height")),
          null != e.data("videowidth") && null != e.data("videoheight"))
        ) {
          var r = e.data("videowidth"),
            o = e.data("videoheight");
          (r = "100%" === r ? "none" : r),
            (o = "100%" === o ? "none" : o),
            e.data("width", r),
            e.data("height", o);
        }
        (a.maxWidth =
          void 0 === e.data("width")
            ? parseInt(e.css("maxWidth"), 0) || "none"
            : e.data("width")),
          (a.maxHeight =
            -1 !== jQuery.inArray(e.data("type"), ["column", "row"])
              ? "none"
              : void 0 === e.data("height")
              ? parseInt(e.css("maxHeight"), 0) || "none"
              : e.data("height")),
          (a.wan =
            void 0 === e.data("wan")
              ? parseInt(e.css("-webkit-transition"), 0) || "none"
              : e.data("wan")),
          (a.moan =
            void 0 === e.data("moan")
              ? parseInt(e.css("-moz-animation-transition"), 0) || "none"
              : e.data("moan")),
          (a.man =
            void 0 === e.data("man")
              ? parseInt(e.css("-ms-animation-transition"), 0) || "none"
              : e.data("man")),
          (a.ani =
            void 0 === e.data("ani")
              ? parseInt(e.css("transition"), 0) || "none"
              : e.data("ani"));
      }
      return (
        (a.styleProps = {
          borderTopLeftRadius: e[0].style.borderTopLeftRadius,
          borderTopRightRadius: e[0].style.borderTopRightRadius,
          borderBottomRightRadius: e[0].style.borderBottomRightRadius,
          borderBottomLeftRadius: e[0].style.borderBottomLeftRadius,
          background: e[0].style.background,
          boxShadow: e[0].style.boxShadow,
          "background-color": e[0].style["background-color"],
          "border-top-color": e[0].style["border-top-color"],
          "border-bottom-color": e[0].style["border-bottom-color"],
          "border-right-color": e[0].style["border-right-color"],
          "border-left-color": e[0].style["border-left-color"],
          "border-top-style": e[0].style["border-top-style"],
          "border-bottom-style": e[0].style["border-bottom-style"],
          "border-left-style": e[0].style["border-left-style"],
          "border-right-style": e[0].style["border-right-style"],
          "border-left-width": e[0].style["border-left-width"],
          "border-right-width": e[0].style["border-right-width"],
          "border-bottom-width": e[0].style["border-bottom-width"],
          "border-top-width": e[0].style["border-top-width"],
          color: e[0].style.color,
          "text-decoration": e[0].style["text-decoration"],
          "font-style": e[0].style["font-style"],
        }),
        ("" !== a.styleProps.background &&
          void 0 !== a.styleProps.background &&
          a.styleProps.background !== a.styleProps["background-color"]) ||
          delete a.styleProps.background,
        "" == a.styleProps.color && (a.styleProps.color = e.css("color")),
        a
      );
    },
    Z = function (a, n) {
      var r = new Object();
      return (
        a &&
          jQuery.each(a, function (e, t) {
            var i = N(t, n)[n.curWinRange];
            r[e] = void 0 !== i ? i : a[e];
          }),
        r
      );
    },
    _ = function (e, t, i, a) {
      return (e =
        "full" === (e = jQuery.isNumeric(e) ? e * t + "px" : e)
          ? a
          : "auto" === e || "none" === e
          ? i
          : e);
    },
    E = function (e, t, i, a) {
      var n = e.data();
      n = void 0 === n ? {} : n;
      try {
        if ("BR" == e[0].nodeName || "br" == e[0].tagName) return !1;
      } catch (e) {}
      n.cssobj = void 0 === n.cssobj ? V(e, i) : n.cssobj;
      var r = Z(n.cssobj, t),
        o = t.bw,
        s = t.bh;
      "off" === a && (s = o = 1),
        "auto" == r.lineHeight && (r.lineHeight = r.fontSize + 4);
      var d = {
        Top: r.marginTop,
        Bottom: r.marginBottom,
        Left: r.marginLeft,
        Right: r.marginRight,
      };
      if (
        ("column" === n._nctype &&
          (punchgs.TweenLite.set(n._column, {
            paddingTop: Math.round(r.marginTop * s) + "px",
            paddingBottom: Math.round(r.marginBottom * s) + "px",
            paddingLeft: Math.round(r.marginLeft * o) + "px",
            paddingRight: Math.round(r.marginRight * o) + "px",
          }),
          (d = { Top: 0, Bottom: 0, Left: 0, Right: 0 })),
        !e.hasClass("tp-splitted"))
      ) {
        if (
          (e.css("-webkit-transition", "none"),
          e.css("-moz-transition", "none"),
          e.css("-ms-transition", "none"),
          e.css("transition", "none"),
          (void 0 !== e.data("transform_hover") ||
            void 0 !== e.data("style_hover")) &&
            punchgs.TweenLite.set(e, r.styleProps),
          punchgs.TweenLite.set(e, {
            fontSize: Math.round(r.fontSize * o) + "px",
            fontWeight: r.fontWeight,
            letterSpacing: Math.floor(r.letterSpacing * o) + "px",
            paddingTop: Math.round(r.paddingTop * s) + "px",
            paddingBottom: Math.round(r.paddingBottom * s) + "px",
            paddingLeft: Math.round(r.paddingLeft * o) + "px",
            paddingRight: Math.round(r.paddingRight * o) + "px",
            marginTop: d.Top * s + "px",
            marginBottom: d.Bottom * s + "px",
            marginLeft: d.Left * o + "px",
            marginRight: d.Right * o + "px",
            borderTopWidth: Math.round(r.borderTopWidth * s) + "px",
            borderBottomWidth: Math.round(r.borderBottomWidth * s) + "px",
            borderLeftWidth: Math.round(r.borderLeftWidth * o) + "px",
            borderRightWidth: Math.round(r.borderRightWidth * o) + "px",
            lineHeight: Math.round(r.lineHeight * s) + "px",
            textAlign: r.textAlign,
            overwrite: "auto",
          }),
          "rekursive" != i)
        ) {
          var l = "slide" == r.basealign ? t.ulw : t.gridwidth[t.curWinRange],
            m = "slide" == r.basealign ? t.ulh : t.gridheight[t.curWinRange],
            c = _(r.maxWidth, o, "none", l),
            p = _(r.maxHeight, s, "none", m),
            g = _(r.minWidth, o, "0px", l),
            u = _(r.minHeight, s, "0px", m);
          if (
            ((g = void 0 === g ? 0 : g),
            (u = void 0 === u ? 0 : u),
            (c = void 0 === c ? "none" : c),
            (p = void 0 === p ? "none" : p),
            n._isgroup &&
              ("#1/1#" === g && (g = c = l),
              "#1/2#" === g && (g = c = l / 2),
              "#1/3#" === g && (g = c = l / 3),
              "#1/4#" === g && (g = c = l / 4),
              "#1/5#" === g && (g = c = l / 5),
              "#1/6#" === g && (g = c = l / 6),
              "#2/3#" === g && (g = c = (l / 3) * 2),
              "#3/4#" === g && (g = c = (l / 4) * 3),
              "#2/5#" === g && (g = c = (l / 5) * 2),
              "#3/5#" === g && (g = c = (l / 5) * 3),
              "#4/5#" === g && (g = c = (l / 5) * 4),
              "#3/6#" === g && (g = c = (l / 6) * 3),
              "#4/6#" === g && (g = c = (l / 6) * 4),
              "#5/6#" === g && (g = c = (l / 6) * 5)),
            n._ingroup && ((n._groupw = g), (n._grouph = u)),
            punchgs.TweenLite.set(e, {
              maxWidth: c,
              maxHeight: p,
              minWidth: g,
              minHeight: u,
              whiteSpace: r.whiteSpace,
              textAlign: r.textAlign,
              overwrite: "auto",
            }),
            "nopredefinedcolor" != r.color &&
              punchgs.TweenLite.set(e, { color: r.color, overwrite: "auto" }),
            null != n.svg_src)
          ) {
            var f =
              "nopredefinedcolor" != r.color && null != r.color
                ? r.color
                : null != r.css &&
                  "nopredefinedcolor" != r.css.color &&
                  null != r.css.color
                ? r.css.color
                : null != r.styleProps.color
                ? r.styleProps.color
                : null != r.styleProps.css &&
                  null != r.styleProps.css.color &&
                  r.styleProps.css.color;
            0 != f &&
              (punchgs.TweenLite.set(e.find("svg"), {
                fill: f,
                overwrite: "auto",
              }),
              punchgs.TweenLite.set(e.find("svg path"), {
                fill: f,
                overwrite: "auto",
              }));
          }
        }
        "column" === n._nctype &&
          (void 0 === n._column_bg_set &&
            ((n._column_bg_set = e.css("backgroundColor")),
            (n._column_bg_image = e.css("backgroundImage")),
            (n._column_bg_image_repeat = e.css("backgroundRepeat")),
            (n._column_bg_image_position = e.css("backgroundPosition")),
            (n._column_bg_image_size = e.css("backgroundSize")),
            (n._column_bg_opacity = e.data("bgopacity")),
            (n._column_bg_opacity =
              void 0 === n._column_bg_opacity ? 1 : n._column_bg_opacity),
            punchgs.TweenLite.set(e, {
              backgroundColor: "transparent",
              backgroundImage: "",
            })),
          setTimeout(function () {
            b(e, t);
          }, 1),
          n._cbgc_auto &&
            0 < n._cbgc_auto.length &&
            ((n._cbgc_auto[0].style.backgroundSize = n._column_bg_image_size),
            jQuery.isArray(r.marginLeft)
              ? punchgs.TweenLite.set(n._cbgc_auto, {
                  borderTopWidth: r.marginTop[t.curWinRange] * s + "px",
                  borderLeftWidth: r.marginLeft[t.curWinRange] * o + "px",
                  borderRightWidth: r.marginRight[t.curWinRange] * o + "px",
                  borderBottomWidth: r.marginBottom[t.curWinRange] * s + "px",
                  backgroundColor: n._column_bg_set,
                  backgroundImage: n._column_bg_image,
                  backgroundRepeat: n._column_bg_image_repeat,
                  backgroundPosition: n._column_bg_image_position,
                  opacity: n._column_bg_opacity,
                })
              : punchgs.TweenLite.set(n._cbgc_auto, {
                  borderTopWidth: r.marginTop * s + "px",
                  borderLeftWidth: r.marginLeft * o + "px",
                  borderRightWidth: r.marginRight * o + "px",
                  borderBottomWidth: r.marginBottom * s + "px",
                  backgroundColor: n._column_bg_set,
                  backgroundImage: n._column_bg_image,
                  backgroundRepeat: n._column_bg_image_repeat,
                  backgroundPosition: n._column_bg_image_position,
                  opacity: n._column_bg_opacity,
                }))),
          setTimeout(function () {
            e.css("-webkit-transition", e.data("wan")),
              e.css("-moz-transition", e.data("moan")),
              e.css("-ms-transition", e.data("man")),
              e.css("transition", e.data("ani"));
          }, 30);
      }
    },
    b = function (e, t) {
      var i,
        a,
        n,
        r = e.data();
      r._cbgc_man &&
        0 < r._cbgc_man.length &&
        (jQuery.isArray(r.cssobj.marginLeft)
          ? (r.cssobj.marginLeft[t.curWinRange] * t.bw,
            (i = r.cssobj.marginTop[t.curWinRange] * t.bh),
            (a = r.cssobj.marginBottom[t.curWinRange] * t.bh),
            r.cssobj.marginRight[t.curWinRange],
            t.bw)
          : (r.cssobj.marginLeft * t.bw,
            (i = r.cssobj.marginTop * t.bh),
            (a = r.cssobj.marginBottom * t.bh),
            r.cssobj.marginRight,
            t.bw),
        (n = r._row.hasClass("rev_break_columns")
          ? "100%"
          : r._row.height() - (i + a) + "px"),
        (r._cbgc_man[0].style.backgroundSize = r._column_bg_image_size),
        punchgs.TweenLite.set(r._cbgc_man, {
          width: "100%",
          height: n,
          backgroundColor: r._column_bg_set,
          backgroundImage: r._column_bg_image,
          backgroundRepeat: r._column_bg_image_repeat,
          backgroundPosition: r._column_bg_image_position,
          overwrite: "auto",
          opacity: r._column_bg_opacity,
        }));
    },
    c = function (e, t) {
      var i = e.data();
      if (e.hasClass("rs-pendulum") && null == i._loop_timeline) {
        i._loop_timeline = new punchgs.TimelineLite();
        var a = null == e.data("startdeg") ? -20 : e.data("startdeg"),
          n = null == e.data("enddeg") ? 20 : e.data("enddeg"),
          r = null == e.data("speed") ? 2 : e.data("speed"),
          o = null == e.data("origin") ? "50% 50%" : e.data("origin"),
          s =
            null == e.data("easing")
              ? punchgs.Power2.easeInOut
              : e.data("easing");
        (a *= t),
          (n *= t),
          i._loop_timeline.append(
            new punchgs.TweenLite.fromTo(
              e,
              r,
              { force3D: "auto", rotation: a, transformOrigin: o },
              { rotation: n, ease: s }
            )
          ),
          i._loop_timeline.append(
            new punchgs.TweenLite.fromTo(
              e,
              r,
              { force3D: "auto", rotation: n, transformOrigin: o },
              {
                rotation: a,
                ease: s,
                onComplete: function () {
                  i._loop_timeline.restart();
                },
              }
            )
          );
      }
      if (e.hasClass("rs-rotate") && null == i._loop_timeline) {
        i._loop_timeline = new punchgs.TimelineLite();
        (a = null == e.data("startdeg") ? 0 : e.data("startdeg")),
          (n = null == e.data("enddeg") ? 360 : e.data("enddeg")),
          (r = null == e.data("speed") ? 2 : e.data("speed")),
          (o = null == e.data("origin") ? "50% 50%" : e.data("origin")),
          (s =
            null == e.data("easing")
              ? punchgs.Power2.easeInOut
              : e.data("easing"));
        (a *= t),
          (n *= t),
          i._loop_timeline.append(
            new punchgs.TweenLite.fromTo(
              e,
              r,
              { force3D: "auto", rotation: a, transformOrigin: o },
              {
                rotation: n,
                ease: s,
                onComplete: function () {
                  i._loop_timeline.restart();
                },
              }
            )
          );
      }
      if (e.hasClass("rs-slideloop") && null == i._loop_timeline) {
        i._loop_timeline = new punchgs.TimelineLite();
        var d = null == e.data("xs") ? 0 : e.data("xs"),
          l = null == e.data("ys") ? 0 : e.data("ys"),
          m = null == e.data("xe") ? 0 : e.data("xe"),
          c = null == e.data("ye") ? 0 : e.data("ye");
        (r = null == e.data("speed") ? 2 : e.data("speed")),
          (s =
            null == e.data("easing")
              ? punchgs.Power2.easeInOut
              : e.data("easing"));
        (d *= t),
          (l *= t),
          (m *= t),
          (c *= t),
          i._loop_timeline.append(
            new punchgs.TweenLite.fromTo(
              e,
              r,
              { force3D: "auto", x: d, y: l },
              { x: m, y: c, ease: s }
            )
          ),
          i._loop_timeline.append(
            new punchgs.TweenLite.fromTo(
              e,
              r,
              { force3D: "auto", x: m, y: c },
              {
                x: d,
                y: l,
                onComplete: function () {
                  i._loop_timeline.restart();
                },
              }
            )
          );
      }
      if (e.hasClass("rs-pulse") && null == i._loop_timeline) {
        i._loop_timeline = new punchgs.TimelineLite();
        var p = null == e.data("zoomstart") ? 0 : e.data("zoomstart"),
          g = null == e.data("zoomend") ? 0 : e.data("zoomend");
        (r = null == e.data("speed") ? 2 : e.data("speed")),
          (s =
            null == e.data("easing")
              ? punchgs.Power2.easeInOut
              : e.data("easing"));
        i._loop_timeline.append(
          new punchgs.TweenLite.fromTo(
            e,
            r,
            { force3D: "auto", scale: p },
            { scale: g, ease: s }
          )
        ),
          i._loop_timeline.append(
            new punchgs.TweenLite.fromTo(
              e,
              r,
              { force3D: "auto", scale: g },
              {
                scale: p,
                onComplete: function () {
                  i._loop_timeline.restart();
                },
              }
            )
          );
      }
      if (e.hasClass("rs-wave") && null == i._loop_timeline) {
        i._loop_timeline = new punchgs.TimelineLite();
        var u = null == e.data("angle") ? 10 : parseInt(e.data("angle"), 0),
          f = null == e.data("radius") ? 10 : parseInt(e.data("radius"), 0),
          h =
            ((r = null == e.data("speed") ? -20 : e.data("speed")),
            (o = null == e.data("origin") ? "50% 50%" : e.data("origin")).split(
              " "
            )),
          v = new Object();
        1 <= h.length
          ? ((v.x = h[0]), (v.y = h[1]))
          : ((v.x = "50%"), (v.y = "50%")),
          (f *= t);
        var _ = (parseInt(v.x, 0) / 100 - 0.5) * e.width(),
          b = (parseInt(v.y, 0) / 100 - 0.5) * e.height(),
          y = {
            a: 0,
            ang: u,
            element: e,
            unit: f,
            xoffset: 0 + _,
            yoffset: -1 * f + b,
          },
          w = parseInt(u, 0),
          x = new punchgs.TweenLite.fromTo(
            y,
            r,
            { a: 0 + w },
            { a: 360 + w, force3D: "auto", ease: punchgs.Linear.easeNone }
          );
        x.eventCallback(
          "onUpdate",
          function (e) {
            var t = e.a * (Math.PI / 180),
              i = e.yoffset + e.unit * (1 - Math.sin(t)),
              a = e.xoffset + Math.cos(t) * e.unit;
            punchgs.TweenLite.to(e.element, 0.1, {
              force3D: "auto",
              x: a,
              y: i,
            });
          },
          [y]
        ),
          x.eventCallback(
            "onComplete",
            function (e) {
              e._loop_timeline.restart();
            },
            [i]
          ),
          i._loop_timeline.append(x);
      }
    },
    r = function (e) {
      e.closest(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(
        function () {
          null != this._loop_timeline &&
            (this._loop_timeline.pause(), (this._loop_timeline = null));
        }
      );
    };
})(jQuery);

/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - NAVIGATION
 * @version: 1.3.5 (06.04.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
!(function (a) {
  "use strict";
  var b = jQuery.fn.revolution,
    c = b.is_mobile(),
    d = {
      alias: "Navigation Min JS",
      name: "revolution.extensions.navigation.min.js",
      min_core: "5.4.0",
      version: "1.3.5",
    };
  jQuery.extend(!0, b, {
    hideUnHideNav: function (a) {
      var b = a.c.width(),
        c = a.navigation.arrows,
        d = a.navigation.bullets,
        e = a.navigation.thumbnails,
        f = a.navigation.tabs;
      m(c) && y(a.c.find(".tparrows"), c.hide_under, b, c.hide_over),
        m(d) && y(a.c.find(".tp-bullets"), d.hide_under, b, d.hide_over),
        m(e) &&
          y(a.c.parent().find(".tp-thumbs"), e.hide_under, b, e.hide_over),
        m(f) && y(a.c.parent().find(".tp-tabs"), f.hide_under, b, f.hide_over),
        x(a);
    },
    resizeThumbsTabs: function (a, b) {
      if (
        (a.navigation && a.navigation.tabs.enable) ||
        (a.navigation && a.navigation.thumbnails.enable)
      ) {
        var c = (jQuery(window).width() - 480) / 500,
          d = new punchgs.TimelineLite(),
          e = a.navigation.tabs,
          g = a.navigation.thumbnails,
          h = a.navigation.bullets;
        if (
          (d.pause(),
          (c = c > 1 ? 1 : c < 0 ? 0 : c),
          m(e) &&
            (b || e.width > e.min_width) &&
            f(c, d, a.c, e, a.slideamount, "tab"),
          m(g) &&
            (b || g.width > g.min_width) &&
            f(c, d, a.c, g, a.slideamount, "thumb"),
          m(h) && b)
        ) {
          var i = a.c.find(".tp-bullets");
          i.find(".tp-bullet").each(function (a) {
            var b = jQuery(this),
              c = a + 1,
              d =
                b.outerWidth() + parseInt(void 0 === h.space ? 0 : h.space, 0),
              e =
                b.outerHeight() + parseInt(void 0 === h.space ? 0 : h.space, 0);
            "vertical" === h.direction
              ? (b.css({ top: (c - 1) * e + "px", left: "0px" }),
                i.css({
                  height: (c - 1) * e + b.outerHeight(),
                  width: b.outerWidth(),
                }))
              : (b.css({ left: (c - 1) * d + "px", top: "0px" }),
                i.css({
                  width: (c - 1) * d + b.outerWidth(),
                  height: b.outerHeight(),
                }));
          });
        }
        d.play(), x(a);
      }
      return !0;
    },
    updateNavIndexes: function (a) {
      function d(a) {
        c.find(a).lenght > 0 &&
          c.find(a).each(function (a) {
            jQuery(this).data("liindex", a);
          });
      }
      var c = a.c;
      d(".tp-tab"),
        d(".tp-bullet"),
        d(".tp-thumb"),
        b.resizeThumbsTabs(a, !0),
        b.manageNavigation(a);
    },
    manageNavigation: function (a) {
      var c = b.getHorizontalOffset(a.c.parent(), "left"),
        d = b.getHorizontalOffset(a.c.parent(), "right");
      m(a.navigation.bullets) &&
        ("fullscreen" != a.sliderLayout &&
          "fullwidth" != a.sliderLayout &&
          ((a.navigation.bullets.h_offset_old =
            void 0 === a.navigation.bullets.h_offset_old
              ? a.navigation.bullets.h_offset
              : a.navigation.bullets.h_offset_old),
          (a.navigation.bullets.h_offset =
            "center" === a.navigation.bullets.h_align
              ? a.navigation.bullets.h_offset_old + c / 2 - d / 2
              : a.navigation.bullets.h_offset_old + c - d)),
        t(a.c.find(".tp-bullets"), a.navigation.bullets, a)),
        m(a.navigation.thumbnails) &&
          t(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails, a),
        m(a.navigation.tabs) &&
          t(a.c.parent().find(".tp-tabs"), a.navigation.tabs, a),
        m(a.navigation.arrows) &&
          ("fullscreen" != a.sliderLayout &&
            "fullwidth" != a.sliderLayout &&
            ((a.navigation.arrows.left.h_offset_old =
              void 0 === a.navigation.arrows.left.h_offset_old
                ? a.navigation.arrows.left.h_offset
                : a.navigation.arrows.left.h_offset_old),
            (a.navigation.arrows.left.h_offset =
              "right" === a.navigation.arrows.left.h_align
                ? a.navigation.arrows.left.h_offset_old + d
                : a.navigation.arrows.left.h_offset_old + c),
            (a.navigation.arrows.right.h_offset_old =
              void 0 === a.navigation.arrows.right.h_offset_old
                ? a.navigation.arrows.right.h_offset
                : a.navigation.arrows.right.h_offset_old),
            (a.navigation.arrows.right.h_offset =
              "right" === a.navigation.arrows.right.h_align
                ? a.navigation.arrows.right.h_offset_old + d
                : a.navigation.arrows.right.h_offset_old + c)),
          t(a.c.find(".tp-leftarrow.tparrows"), a.navigation.arrows.left, a),
          t(a.c.find(".tp-rightarrow.tparrows"), a.navigation.arrows.right, a)),
        m(a.navigation.thumbnails) &&
          e(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails),
        m(a.navigation.tabs) &&
          e(a.c.parent().find(".tp-tabs"), a.navigation.tabs);
    },
    createNavigation: function (a, f) {
      if ("stop" === b.compare_version(d).check) return !1;
      var g = a.parent(),
        j = f.navigation.arrows,
        n = f.navigation.bullets,
        r = f.navigation.thumbnails,
        s = f.navigation.tabs,
        t = m(j),
        v = m(n),
        x = m(r),
        y = m(s);
      h(a, f),
        i(a, f),
        t && q(a, j, f),
        f.li.each(function (b) {
          var c = jQuery(f.li[f.li.length - 1 - b]),
            d = jQuery(this);
          v && (f.navigation.bullets.rtl ? u(a, n, c, f) : u(a, n, d, f)),
            x &&
              (f.navigation.thumbnails.rtl
                ? w(a, r, c, "tp-thumb", f)
                : w(a, r, d, "tp-thumb", f)),
            y &&
              (f.navigation.tabs.rtl
                ? w(a, s, c, "tp-tab", f)
                : w(a, s, d, "tp-tab", f));
        }),
        a.bind(
          "revolution.slide.onafterswap revolution.nextslide.waiting",
          function () {
            var b =
              0 == a.find(".next-revslide").length
                ? a.find(".active-revslide").data("index")
                : a.find(".next-revslide").data("index");
            a.find(".tp-bullet").each(function () {
              var a = jQuery(this);
              a.data("liref") === b
                ? a.addClass("selected")
                : a.removeClass("selected");
            }),
              g.find(".tp-thumb, .tp-tab").each(function () {
                var a = jQuery(this);
                a.data("liref") === b
                  ? (a.addClass("selected"),
                    a.hasClass("tp-tab")
                      ? e(g.find(".tp-tabs"), s)
                      : e(g.find(".tp-thumbs"), r))
                  : a.removeClass("selected");
              });
            var c = 0,
              d = !1;
            f.thumbs &&
              jQuery.each(f.thumbs, function (a, e) {
                (c = !1 === d ? a : c), (d = e.id === b || a === b || d);
              });
            var h = c > 0 ? c - 1 : f.slideamount - 1,
              i = c + 1 == f.slideamount ? 0 : c + 1;
            if (!0 === j.enable) {
              var k = j.tmp;
              if (
                (void 0 != f.thumbs[h] &&
                  jQuery.each(f.thumbs[h].params, function (a, b) {
                    k = k.replace(b.from, b.to);
                  }),
                j.left.j.html(k),
                (k = j.tmp),
                i > f.slideamount)
              )
                return;
              jQuery.each(f.thumbs[i].params, function (a, b) {
                k = k.replace(b.from, b.to);
              }),
                j.right.j.html(k),
                j.rtl
                  ? (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), {
                      backgroundImage: "url(" + f.thumbs[i].src + ")",
                    }),
                    punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), {
                      backgroundImage: "url(" + f.thumbs[h].src + ")",
                    }))
                  : (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), {
                      backgroundImage: "url(" + f.thumbs[h].src + ")",
                    }),
                    punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), {
                      backgroundImage: "url(" + f.thumbs[i].src + ")",
                    }));
            }
          }
        ),
        l(j),
        l(n),
        l(r),
        l(s),
        g.on("mouseenter mousemove", function () {
          g.hasClass("tp-mouseover") ||
            (g.addClass("tp-mouseover"),
            punchgs.TweenLite.killDelayedCallsTo(p),
            t && j.hide_onleave && p(g.find(".tparrows"), j, "show"),
            v && n.hide_onleave && p(g.find(".tp-bullets"), n, "show"),
            x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "show"),
            y && s.hide_onleave && p(g.find(".tp-tabs"), s, "show"),
            c && (g.removeClass("tp-mouseover"), o(a, f)));
        }),
        g.on("mouseleave", function () {
          g.removeClass("tp-mouseover"), o(a, f);
        }),
        t && j.hide_onleave && p(g.find(".tparrows"), j, "hide", 0),
        v && n.hide_onleave && p(g.find(".tp-bullets"), n, "hide", 0),
        x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "hide", 0),
        y && s.hide_onleave && p(g.find(".tp-tabs"), s, "hide", 0),
        x && k(g.find(".tp-thumbs"), f),
        y && k(g.find(".tp-tabs"), f),
        "carousel" === f.sliderType && k(a, f, !0),
        ("on" === f.navigation.touch.touchOnDesktop ||
          ("on" == f.navigation.touch.touchenabled && c)) &&
          k(a, f, "swipebased");
    },
  });
  var e = function (a, b) {
      var d =
          (a.hasClass("tp-thumbs"),
          a.hasClass("tp-thumbs") ? ".tp-thumb-mask" : ".tp-tab-mask"),
        e = a.hasClass("tp-thumbs")
          ? ".tp-thumbs-inner-wrapper"
          : ".tp-tabs-inner-wrapper",
        f = a.hasClass("tp-thumbs") ? ".tp-thumb" : ".tp-tab",
        g = a.find(d),
        h = g.find(e),
        i = b.direction,
        j =
          "vertical" === i
            ? g.find(f).first().outerHeight(!0) + b.space
            : g.find(f).first().outerWidth(!0) + b.space,
        k = "vertical" === i ? g.height() : g.width(),
        l = parseInt(g.find(f + ".selected").data("liindex"), 0),
        m = k / j,
        n = "vertical" === i ? g.height() : g.width(),
        o = 0 - l * j,
        p = "vertical" === i ? h.height() : h.width(),
        q = o < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : o,
        r = h.data("offset");
      m > 2 &&
        ((q = o - (r + j) <= 0 ? (o - (r + j) < 0 - j ? r : q + j) : q),
        (q =
          o - j + r + k < j && o + (Math.round(m) - 2) * j < r
            ? o + (Math.round(m) - 2) * j
            : q)),
        (q = q < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : q),
        "vertical" !== i && g.width() >= h.width() && (q = 0),
        "vertical" === i && g.height() >= h.height() && (q = 0),
        a.hasClass("dragged") ||
          ("vertical" === i
            ? h.data(
                "tmmove",
                punchgs.TweenLite.to(h, 0.5, {
                  top: q + "px",
                  ease: punchgs.Power3.easeInOut,
                })
              )
            : h.data(
                "tmmove",
                punchgs.TweenLite.to(h, 0.5, {
                  left: q + "px",
                  ease: punchgs.Power3.easeInOut,
                })
              ),
          h.data("offset", q));
    },
    f = function (a, b, c, d, e, f) {
      var g = c.parent().find(".tp-" + f + "s"),
        h = g.find(".tp-" + f + "s-inner-wrapper"),
        i = g.find(".tp-" + f + "-mask"),
        j = d.width * a < d.min_width ? d.min_width : Math.round(d.width * a),
        k = Math.round((j / d.width) * d.height),
        l = "vertical" === d.direction ? j : j * e + d.space * (e - 1),
        m = "vertical" === d.direction ? k * e + d.space * (e - 1) : k,
        n =
          "vertical" === d.direction
            ? { width: j + "px" }
            : { height: k + "px" };
      b.add(punchgs.TweenLite.set(g, n)),
        b.add(punchgs.TweenLite.set(h, { width: l + "px", height: m + "px" })),
        b.add(punchgs.TweenLite.set(i, { width: l + "px", height: m + "px" }));
      var o = h.find(".tp-" + f);
      return (
        o &&
          jQuery.each(o, function (a, c) {
            "vertical" === d.direction
              ? b.add(
                  punchgs.TweenLite.set(c, {
                    top:
                      a * (k + parseInt(void 0 === d.space ? 0 : d.space, 0)),
                    width: j + "px",
                    height: k + "px",
                  })
                )
              : "horizontal" === d.direction &&
                b.add(
                  punchgs.TweenLite.set(c, {
                    left:
                      a * (j + parseInt(void 0 === d.space ? 0 : d.space, 0)),
                    width: j + "px",
                    height: k + "px",
                  })
                );
          }),
        b
      );
    },
    g = function (a) {
      var b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = 1,
        g = 1,
        h = 1;
      return (
        "detail" in a && (c = a.detail),
        "wheelDelta" in a && (c = -a.wheelDelta / 120),
        "wheelDeltaY" in a && (c = -a.wheelDeltaY / 120),
        "wheelDeltaX" in a && (b = -a.wheelDeltaX / 120),
        "axis" in a && a.axis === a.HORIZONTAL_AXIS && ((b = c), (c = 0)),
        (d = b * f),
        (e = c * f),
        "deltaY" in a && (e = a.deltaY),
        "deltaX" in a && (d = a.deltaX),
        (d || e) &&
          a.deltaMode &&
          (1 == a.deltaMode ? ((d *= g), (e *= g)) : ((d *= h), (e *= h))),
        d && !b && (b = d < 1 ? -1 : 1),
        e && !c && (c = e < 1 ? -1 : 1),
        (e = navigator.userAgent.match(/mozilla/i) ? 10 * e : e),
        (e > 300 || e < -300) && (e /= 10),
        { spinX: b, spinY: c, pixelX: d, pixelY: e }
      );
    },
    h = function (a, c) {
      "on" === c.navigation.keyboardNavigation &&
        jQuery(document).keydown(function (d) {
          (("horizontal" == c.navigation.keyboard_direction &&
            39 == d.keyCode) ||
            ("vertical" == c.navigation.keyboard_direction &&
              40 == d.keyCode)) &&
            ((c.sc_indicator = "arrow"),
            (c.sc_indicator_dir = 0),
            b.callingNewSlide(a, 1)),
            (("horizontal" == c.navigation.keyboard_direction &&
              37 == d.keyCode) ||
              ("vertical" == c.navigation.keyboard_direction &&
                38 == d.keyCode)) &&
              ((c.sc_indicator = "arrow"),
              (c.sc_indicator_dir = 1),
              b.callingNewSlide(a, -1));
        });
    },
    i = function (a, c) {
      if (
        "on" === c.navigation.mouseScrollNavigation ||
        "carousel" === c.navigation.mouseScrollNavigation
      ) {
        (c.isIEEleven = !!navigator.userAgent.match(/Trident.*rv\:11\./)),
          (c.isSafari = !!navigator.userAgent.match(/safari/i)),
          (c.ischrome = !!navigator.userAgent.match(/chrome/i));
        var d = c.ischrome
            ? -49
            : c.isIEEleven || c.isSafari
            ? -9
            : navigator.userAgent.match(/mozilla/i)
            ? -29
            : -49,
          e = c.ischrome
            ? 49
            : c.isIEEleven || c.isSafari
            ? 9
            : navigator.userAgent.match(/mozilla/i)
            ? 29
            : 49;
        a.on("mousewheel DOMMouseScroll", function (f) {
          var h = g(f.originalEvent),
            i = a.find(".tp-revslider-slidesli.active-revslide").index(),
            j = a.find(".tp-revslider-slidesli.processing-revslide").index(),
            k = (-1 != i && 0 == i) || (-1 != j && 0 == j),
            l =
              (-1 != i && i == c.slideamount - 1) ||
              (1 != j && j == c.slideamount - 1),
            m = !0;
          "carousel" == c.navigation.mouseScrollNavigation && (k = l = !1),
            -1 == j
              ? h.pixelY < d
                ? (k ||
                    ((c.sc_indicator = "arrow"),
                    "reverse" !== c.navigation.mouseScrollReverse &&
                      ((c.sc_indicator_dir = 1), b.callingNewSlide(a, -1)),
                    (m = !1)),
                  l ||
                    ((c.sc_indicator = "arrow"),
                    "reverse" === c.navigation.mouseScrollReverse &&
                      ((c.sc_indicator_dir = 0), b.callingNewSlide(a, 1)),
                    (m = !1)))
                : h.pixelY > e &&
                  (l ||
                    ((c.sc_indicator = "arrow"),
                    "reverse" !== c.navigation.mouseScrollReverse &&
                      ((c.sc_indicator_dir = 0), b.callingNewSlide(a, 1)),
                    (m = !1)),
                  k ||
                    ((c.sc_indicator = "arrow"),
                    "reverse" === c.navigation.mouseScrollReverse &&
                      ((c.sc_indicator_dir = 1), b.callingNewSlide(a, -1)),
                    (m = !1)))
              : (m = !1);
          var n = c.c.offset().top - jQuery("body").scrollTop(),
            o = n + c.c.height();
          return (
            "carousel" != c.navigation.mouseScrollNavigation
              ? ("reverse" !== c.navigation.mouseScrollReverse &&
                  ((n > 0 && h.pixelY > 0) ||
                    (o < jQuery(window).height() && h.pixelY < 0)) &&
                  (m = !0),
                "reverse" === c.navigation.mouseScrollReverse &&
                  ((n < 0 && h.pixelY < 0) ||
                    (o > jQuery(window).height() && h.pixelY > 0)) &&
                  (m = !0))
              : (m = !1),
            0 == m ? (f.preventDefault(f), !1) : void 0
          );
        });
      }
    },
    j = function (a, b, d) {
      return (
        (a = c
          ? jQuery(d.target).closest("." + a).length ||
            jQuery(d.srcElement).closest("." + a).length
          : jQuery(d.toElement).closest("." + a).length ||
            jQuery(d.originalTarget).closest("." + a).length),
        !0 === a || 1 === a ? 1 : 0
      );
    },
    k = function (a, d, e) {
      var f = d.carousel;
      jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"),
        (f.Limit = "endless");
      var h = (c || b.get_browser(), a),
        i =
          "vertical" === d.navigation.thumbnails.direction ||
          "vertical" === d.navigation.tabs.direction
            ? "none"
            : "vertical",
        k = d.navigation.touch.swipe_direction || "horizontal";
      (i = "swipebased" == e && "vertical" == k ? "none" : e ? "vertical" : i),
        jQuery.fn.swipetp || (jQuery.fn.swipetp = jQuery.fn.swipe),
        (jQuery.fn.swipetp.defaults &&
          jQuery.fn.swipetp.defaults.excludedElements) ||
          jQuery.fn.swipetp.defaults ||
          (jQuery.fn.swipetp.defaults = new Object()),
        (jQuery.fn.swipetp.defaults.excludedElements =
          "label, button, input, select, textarea, .noSwipe"),
        h.swipetp({
          allowPageScroll: i,
          triggerOnTouchLeave: !0,
          treshold: d.navigation.touch.swipe_treshold,
          fingers: d.navigation.touch.swipe_min_touches,
          excludeElements: jQuery.fn.swipetp.defaults.excludedElements,
          swipeStatus: function (e, g, h, i, l, m, n) {
            var o = j("rev_slider_wrapper", a, e),
              p = j("tp-thumbs", a, e),
              q = j("tp-tabs", a, e),
              r = jQuery(this).attr("class"),
              s = !!r.match(/tp-tabs|tp-thumb/gi);
            if (
              "carousel" === d.sliderType &&
              ((("move" === g || "end" === g || "cancel" == g) &&
                d.dragStartedOverSlider &&
                !d.dragStartedOverThumbs &&
                !d.dragStartedOverTabs) ||
                ("start" === g && o > 0 && 0 === p && 0 === q))
            ) {
              if (c && ("up" === h || "down" === h)) return;
              switch (
                ((d.dragStartedOverSlider = !0),
                (i =
                  h && h.match(/left|up/g)
                    ? Math.round(-1 * i)
                    : (i = Math.round(1 * i))),
                g)
              ) {
                case "start":
                  void 0 !== f.positionanim &&
                    (f.positionanim.kill(),
                    (f.slide_globaloffset =
                      "off" === f.infinity
                        ? f.slide_offset
                        : b.simp(f.slide_offset, f.maxwidth))),
                    (f.overpull = "none"),
                    f.wrap.addClass("dragged");
                  break;
                case "move":
                  if (
                    (d.c
                      .find(".tp-withaction")
                      .addClass("tp-temporarydisabled"),
                    (f.slide_offset =
                      "off" === f.infinity
                        ? f.slide_globaloffset + i
                        : b.simp(f.slide_globaloffset + i, f.maxwidth)),
                    "off" === f.infinity)
                  ) {
                    var t =
                      "center" === f.horizontal_align
                        ? (f.wrapwidth / 2 -
                            f.slide_width / 2 -
                            f.slide_offset) /
                          f.slide_width
                        : (0 - f.slide_offset) / f.slide_width;
                    ("none" !== f.overpull && 0 !== f.overpull) ||
                    !(t < 0 || t > d.slideamount - 1)
                      ? t >= 0 &&
                        t <= d.slideamount - 1 &&
                        ((t >= 0 && i > f.overpull) ||
                          (t <= d.slideamount - 1 && i < f.overpull)) &&
                        (f.overpull = 0)
                      : (f.overpull = i),
                      (f.slide_offset =
                        t < 0
                          ? f.slide_offset +
                            (f.overpull - i) / 1.1 +
                            Math.sqrt(Math.abs((f.overpull - i) / 1.1))
                          : t > d.slideamount - 1
                          ? f.slide_offset +
                            (f.overpull - i) / 1.1 -
                            Math.sqrt(Math.abs((f.overpull - i) / 1.1))
                          : f.slide_offset);
                  }
                  b.organiseCarousel(d, h, !0, !0);
                  break;
                case "end":
                case "cancel":
                  (f.slide_globaloffset = f.slide_offset),
                    f.wrap.removeClass("dragged"),
                    b.carouselToEvalPosition(d, h),
                    (d.dragStartedOverSlider = !1),
                    (d.dragStartedOverThumbs = !1),
                    (d.dragStartedOverTabs = !1),
                    setTimeout(function () {
                      d.c
                        .find(".tp-withaction")
                        .removeClass("tp-temporarydisabled");
                    }, 19);
              }
            } else {
              if (
                (("move" !== g && "end" !== g && "cancel" != g) ||
                  d.dragStartedOverSlider ||
                  (!d.dragStartedOverThumbs && !d.dragStartedOverTabs)) &&
                !("start" === g && o > 0 && (p > 0 || q > 0))
              ) {
                if ("end" == g && !s) {
                  if (
                    ((d.sc_indicator = "arrow"),
                    ("horizontal" == k && "left" == h) ||
                      ("vertical" == k && "up" == h))
                  )
                    return (
                      (d.sc_indicator_dir = 0), b.callingNewSlide(d.c, 1), !1
                    );
                  if (
                    ("horizontal" == k && "right" == h) ||
                    ("vertical" == k && "down" == h)
                  )
                    return (
                      (d.sc_indicator_dir = 1), b.callingNewSlide(d.c, -1), !1
                    );
                }
                return (
                  (d.dragStartedOverSlider = !1),
                  (d.dragStartedOverThumbs = !1),
                  (d.dragStartedOverTabs = !1),
                  !0
                );
              }
              p > 0 && (d.dragStartedOverThumbs = !0),
                q > 0 && (d.dragStartedOverTabs = !0);
              var u = d.dragStartedOverThumbs ? ".tp-thumbs" : ".tp-tabs",
                v = d.dragStartedOverThumbs ? ".tp-thumb-mask" : ".tp-tab-mask",
                w = d.dragStartedOverThumbs
                  ? ".tp-thumbs-inner-wrapper"
                  : ".tp-tabs-inner-wrapper",
                x = d.dragStartedOverThumbs ? ".tp-thumb" : ".tp-tab",
                y = d.dragStartedOverThumbs
                  ? d.navigation.thumbnails
                  : d.navigation.tabs;
              i =
                h && h.match(/left|up/g)
                  ? Math.round(-1 * i)
                  : (i = Math.round(1 * i));
              var z = a.parent().find(v),
                A = z.find(w),
                B = y.direction,
                C = "vertical" === B ? A.height() : A.width(),
                D = "vertical" === B ? z.height() : z.width(),
                E =
                  "vertical" === B
                    ? z.find(x).first().outerHeight(!0) + y.space
                    : z.find(x).first().outerWidth(!0) + y.space,
                F =
                  void 0 === A.data("offset")
                    ? 0
                    : parseInt(A.data("offset"), 0),
                G = 0;
              switch (g) {
                case "start":
                  a.parent().find(u).addClass("dragged"),
                    (F =
                      "vertical" === B ? A.position().top : A.position().left),
                    A.data("offset", F),
                    A.data("tmmove") && A.data("tmmove").pause();
                  break;
                case "move":
                  if (C <= D) return !1;
                  (G = F + i),
                    (G =
                      G > 0
                        ? "horizontal" === B
                          ? G - A.width() * (((G / A.width()) * G) / A.width())
                          : G -
                            A.height() * (((G / A.height()) * G) / A.height())
                        : G);
                  var H =
                    "vertical" === B
                      ? 0 - (A.height() - z.height())
                      : 0 - (A.width() - z.width());
                  (G =
                    G < H
                      ? "horizontal" === B
                        ? G +
                          (((A.width() * (G - H)) / A.width()) * (G - H)) /
                            A.width()
                        : G +
                          (((A.height() * (G - H)) / A.height()) * (G - H)) /
                            A.height()
                      : G),
                    "vertical" === B
                      ? punchgs.TweenLite.set(A, { top: G + "px" })
                      : punchgs.TweenLite.set(A, { left: G + "px" });
                  break;
                case "end":
                case "cancel":
                  if (s)
                    return (
                      (G = F + i),
                      (G =
                        "vertical" === B
                          ? G < 0 - (A.height() - z.height())
                            ? 0 - (A.height() - z.height())
                            : G
                          : G < 0 - (A.width() - z.width())
                          ? 0 - (A.width() - z.width())
                          : G),
                      (G = G > 0 ? 0 : G),
                      (G =
                        Math.abs(i) > E / 10
                          ? i <= 0
                            ? Math.floor(G / E) * E
                            : Math.ceil(G / E) * E
                          : i < 0
                          ? Math.ceil(G / E) * E
                          : Math.floor(G / E) * E),
                      (G =
                        "vertical" === B
                          ? G < 0 - (A.height() - z.height())
                            ? 0 - (A.height() - z.height())
                            : G
                          : G < 0 - (A.width() - z.width())
                          ? 0 - (A.width() - z.width())
                          : G),
                      (G = G > 0 ? 0 : G),
                      "vertical" === B
                        ? punchgs.TweenLite.to(A, 0.5, {
                            top: G + "px",
                            ease: punchgs.Power3.easeOut,
                          })
                        : punchgs.TweenLite.to(A, 0.5, {
                            left: G + "px",
                            ease: punchgs.Power3.easeOut,
                          }),
                      (G =
                        G ||
                        ("vertical" === B
                          ? A.position().top
                          : A.position().left)),
                      A.data("offset", G),
                      A.data("distance", i),
                      setTimeout(function () {
                        (d.dragStartedOverSlider = !1),
                          (d.dragStartedOverThumbs = !1),
                          (d.dragStartedOverTabs = !1);
                      }, 100),
                      a.parent().find(u).removeClass("dragged"),
                      !1
                    );
              }
            }
          },
        });
    },
    l = function (a) {
      (a.hide_delay = jQuery.isNumeric(parseInt(a.hide_delay, 0))
        ? a.hide_delay / 1e3
        : 0.2),
        (a.hide_delay_mobile = jQuery.isNumeric(
          parseInt(a.hide_delay_mobile, 0)
        )
          ? a.hide_delay_mobile / 1e3
          : 0.2);
    },
    m = function (a) {
      return a && a.enable;
    },
    n = function (a) {
      return (
        a &&
        a.enable &&
        !0 === a.hide_onleave &&
        (void 0 === a.position || !a.position.match(/outer/g))
      );
    },
    o = function (a, b) {
      var d = a.parent();
      n(b.navigation.arrows) &&
        punchgs.TweenLite.delayedCall(
          c
            ? b.navigation.arrows.hide_delay_mobile
            : b.navigation.arrows.hide_delay,
          p,
          [d.find(".tparrows"), b.navigation.arrows, "hide"]
        ),
        n(b.navigation.bullets) &&
          punchgs.TweenLite.delayedCall(
            c
              ? b.navigation.bullets.hide_delay_mobile
              : b.navigation.bullets.hide_delay,
            p,
            [d.find(".tp-bullets"), b.navigation.bullets, "hide"]
          ),
        n(b.navigation.thumbnails) &&
          punchgs.TweenLite.delayedCall(
            c
              ? b.navigation.thumbnails.hide_delay_mobile
              : b.navigation.thumbnails.hide_delay,
            p,
            [d.find(".tp-thumbs"), b.navigation.thumbnails, "hide"]
          ),
        n(b.navigation.tabs) &&
          punchgs.TweenLite.delayedCall(
            c
              ? b.navigation.tabs.hide_delay_mobile
              : b.navigation.tabs.hide_delay,
            p,
            [d.find(".tp-tabs"), b.navigation.tabs, "hide"]
          );
    },
    p = function (a, b, c, d) {
      switch (((d = void 0 === d ? 0.5 : d), c)) {
        case "show":
          punchgs.TweenLite.to(a, d, {
            autoAlpha: 1,
            ease: punchgs.Power3.easeInOut,
            overwrite: "auto",
          });
          break;
        case "hide":
          punchgs.TweenLite.to(a, d, {
            autoAlpha: 0,
            ease: punchgs.Power3.easeInOu,
            overwrite: "auto",
          });
      }
    },
    q = function (a, b, c) {
      (b.style = void 0 === b.style ? "" : b.style),
        (b.left.style = void 0 === b.left.style ? "" : b.left.style),
        (b.right.style = void 0 === b.right.style ? "" : b.right.style),
        0 === a.find(".tp-leftarrow.tparrows").length &&
          a.append(
            '<div class="tp-leftarrow tparrows ' +
              b.style +
              " " +
              b.left.style +
              '">' +
              b.tmp +
              "</div>"
          ),
        0 === a.find(".tp-rightarrow.tparrows").length &&
          a.append(
            '<div class="tp-rightarrow tparrows ' +
              b.style +
              " " +
              b.right.style +
              '">' +
              b.tmp +
              "</div>"
          );
      var d = a.find(".tp-leftarrow.tparrows"),
        e = a.find(".tp-rightarrow.tparrows");
      b.rtl
        ? (d.click(function () {
            (c.sc_indicator = "arrow"), (c.sc_indicator_dir = 0), a.revnext();
          }),
          e.click(function () {
            (c.sc_indicator = "arrow"), (c.sc_indicator_dir = 1), a.revprev();
          }))
        : (e.click(function () {
            (c.sc_indicator = "arrow"), (c.sc_indicator_dir = 0), a.revnext();
          }),
          d.click(function () {
            (c.sc_indicator = "arrow"), (c.sc_indicator_dir = 1), a.revprev();
          })),
        (b.right.j = a.find(".tp-rightarrow.tparrows")),
        (b.left.j = a.find(".tp-leftarrow.tparrows")),
        (b.padding_top = parseInt(c.carousel.padding_top || 0, 0)),
        (b.padding_bottom = parseInt(c.carousel.padding_bottom || 0, 0)),
        t(d, b.left, c),
        t(e, b.right, c),
        (b.left.opt = c),
        (b.right.opt = c),
        ("outer-left" != b.position && "outer-right" != b.position) ||
          (c.outernav = !0);
    },
    r = function (a, b, c) {
      var d = a.outerHeight(!0),
        f =
          (a.outerWidth(!0),
          void 0 == b.opt ? 0 : 0 == c.conh ? c.height : c.conh),
        g =
          "layergrid" == b.container
            ? "fullscreen" == c.sliderLayout
              ? c.height / 2 - (c.gridheight[c.curWinRange] * c.bh) / 2
              : "on" == c.autoHeight ||
                (void 0 != c.minHeight && c.minHeight > 0)
              ? f / 2 - (c.gridheight[c.curWinRange] * c.bh) / 2
              : 0
            : 0,
        h =
          "top" === b.v_align
            ? { top: "0px", y: Math.round(b.v_offset + g) + "px" }
            : "center" === b.v_align
            ? { top: "50%", y: Math.round(0 - d / 2 + b.v_offset) + "px" }
            : { top: "100%", y: Math.round(0 - (d + b.v_offset + g)) + "px" };
      a.hasClass("outer-bottom") || punchgs.TweenLite.set(a, h);
    },
    s = function (a, b, c) {
      var e = (a.outerHeight(!0), a.outerWidth(!0)),
        f =
          "layergrid" == b.container
            ? "carousel" === c.sliderType
              ? 0
              : c.width / 2 - (c.gridwidth[c.curWinRange] * c.bw) / 2
            : 0,
        g =
          "left" === b.h_align
            ? { left: "0px", x: Math.round(b.h_offset + f) + "px" }
            : "center" === b.h_align
            ? { left: "50%", x: Math.round(0 - e / 2 + b.h_offset) + "px" }
            : { left: "100%", x: Math.round(0 - (e + b.h_offset + f)) + "px" };
      punchgs.TweenLite.set(a, g);
    },
    t = function (a, b, c) {
      var d =
          a.closest(".tp-simpleresponsive").length > 0
            ? a.closest(".tp-simpleresponsive")
            : a.closest(".tp-revslider-mainul").length > 0
            ? a.closest(".tp-revslider-mainul")
            : a.closest(".rev_slider_wrapper").length > 0
            ? a.closest(".rev_slider_wrapper")
            : a.parent().find(".tp-revslider-mainul"),
        e = d.width(),
        f = d.height();
      if (
        (r(a, b, c),
        s(a, b, c),
        "outer-left" !== b.position ||
        ("fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout)
          ? "outer-right" !== b.position ||
            ("fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout) ||
            punchgs.TweenLite.set(a, {
              right: 0 - a.outerWidth() + "px",
              x: b.h_offset + "px",
            })
          : punchgs.TweenLite.set(a, {
              left: 0 - a.outerWidth() + "px",
              x: b.h_offset + "px",
            }),
        a.hasClass("tp-thumbs") || a.hasClass("tp-tabs"))
      ) {
        var g = a.data("wr_padding"),
          h = a.data("maxw"),
          i = a.data("maxh"),
          j = a.hasClass("tp-thumbs")
            ? a.find(".tp-thumb-mask")
            : a.find(".tp-tab-mask"),
          k = parseInt(b.padding_top || 0, 0),
          l = parseInt(b.padding_bottom || 0, 0);
        h > e && "outer-left" !== b.position && "outer-right" !== b.position
          ? (punchgs.TweenLite.set(a, {
              left: "0px",
              x: 0,
              maxWidth: e - 2 * g + "px",
            }),
            punchgs.TweenLite.set(j, { maxWidth: e - 2 * g + "px" }))
          : (punchgs.TweenLite.set(a, { maxWidth: h + "px" }),
            punchgs.TweenLite.set(j, { maxWidth: h + "px" })),
          i + 2 * g > f &&
          "outer-bottom" !== b.position &&
          "outer-top" !== b.position
            ? (punchgs.TweenLite.set(a, {
                top: "0px",
                y: 0,
                maxHeight: k + l + (f - 2 * g) + "px",
              }),
              punchgs.TweenLite.set(j, {
                maxHeight: k + l + (f - 2 * g) + "px",
              }))
            : (punchgs.TweenLite.set(a, { maxHeight: i + "px" }),
              punchgs.TweenLite.set(j, { maxHeight: i + "px" })),
          "outer-left" !== b.position &&
            "outer-right" !== b.position &&
            ((k = 0), (l = 0)),
          !0 === b.span && "vertical" === b.direction
            ? (punchgs.TweenLite.set(a, {
                maxHeight: k + l + (f - 2 * g) + "px",
                height: k + l + (f - 2 * g) + "px",
                top: 0 - k,
                y: 0,
              }),
              r(j, b, c))
            : !0 === b.span &&
              "horizontal" === b.direction &&
              (punchgs.TweenLite.set(a, {
                maxWidth: "100%",
                width: e - 2 * g + "px",
                left: 0,
                x: 0,
              }),
              s(j, b, c));
      }
    },
    u = function (a, b, c, d) {
      0 === a.find(".tp-bullets").length &&
        ((b.style = void 0 === b.style ? "" : b.style),
        a.append(
          '<div class="tp-bullets ' + b.style + " " + b.direction + '"></div>'
        ));
      var e = a.find(".tp-bullets"),
        f = c.data("index"),
        g = b.tmp;
      jQuery.each(d.thumbs[c.index()].params, function (a, b) {
        g = g.replace(b.from, b.to);
      }),
        e.append('<div class="justaddedbullet tp-bullet">' + g + "</div>");
      var h = a.find(".justaddedbullet"),
        i = a.find(".tp-bullet").length,
        j = h.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0),
        k = h.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0);
      "vertical" === b.direction
        ? (h.css({ top: (i - 1) * k + "px", left: "0px" }),
          e.css({
            height: (i - 1) * k + h.outerHeight(),
            width: h.outerWidth(),
          }))
        : (h.css({ left: (i - 1) * j + "px", top: "0px" }),
          e.css({
            width: (i - 1) * j + h.outerWidth(),
            height: h.outerHeight(),
          })),
        h
          .find(".tp-bullet-image")
          .css({ backgroundImage: "url(" + d.thumbs[c.index()].src + ")" }),
        h.data("liref", f),
        h.click(function () {
          (d.sc_indicator = "bullet"),
            a.revcallslidewithid(f),
            a.find(".tp-bullet").removeClass("selected"),
            jQuery(this).addClass("selected");
        }),
        h.removeClass("justaddedbullet"),
        (b.padding_top = parseInt(d.carousel.padding_top || 0, 0)),
        (b.padding_bottom = parseInt(d.carousel.padding_bottom || 0, 0)),
        (b.opt = d),
        ("outer-left" != b.position && "outer-right" != b.position) ||
          (d.outernav = !0),
        e.addClass("nav-pos-hor-" + b.h_align),
        e.addClass("nav-pos-ver-" + b.v_align),
        e.addClass("nav-dir-" + b.direction),
        t(e, b, d);
    },
    w = function (a, b, c, d, e) {
      var f = "tp-thumb" === d ? ".tp-thumbs" : ".tp-tabs",
        g = "tp-thumb" === d ? ".tp-thumb-mask" : ".tp-tab-mask",
        h =
          "tp-thumb" === d
            ? ".tp-thumbs-inner-wrapper"
            : ".tp-tabs-inner-wrapper",
        i = "tp-thumb" === d ? ".tp-thumb" : ".tp-tab",
        j = "tp-thumb" === d ? ".tp-thumb-image" : ".tp-tab-image";
      if (
        ((b.visibleAmount =
          b.visibleAmount > e.slideamount ? e.slideamount : b.visibleAmount),
        (b.sliderLayout = e.sliderLayout),
        0 === a.parent().find(f).length)
      ) {
        b.style = void 0 === b.style ? "" : b.style;
        var k = !0 === b.span ? "tp-span-wrapper" : "",
          l =
            '<div class="' +
            d +
            "s " +
            k +
            " " +
            b.position +
            " " +
            b.style +
            '"><div class="' +
            d +
            '-mask"><div class="' +
            d +
            's-inner-wrapper" style="position:relative;"></div></div></div>';
        "outer-top" === b.position
          ? a.parent().prepend(l)
          : "outer-bottom" === b.position
          ? a.after(l)
          : a.append(l),
          (b.padding_top = parseInt(e.carousel.padding_top || 0, 0)),
          (b.padding_bottom = parseInt(e.carousel.padding_bottom || 0, 0)),
          ("outer-left" != b.position && "outer-right" != b.position) ||
            (e.outernav = !0);
      }
      var m = c.data("index"),
        n = a.parent().find(f),
        o = n.find(g),
        p = o.find(h),
        q =
          "horizontal" === b.direction
            ? b.width * b.visibleAmount + b.space * (b.visibleAmount - 1)
            : b.width,
        r =
          "horizontal" === b.direction
            ? b.height
            : b.height * b.visibleAmount + b.space * (b.visibleAmount - 1),
        s = b.tmp;
      jQuery.each(e.thumbs[c.index()].params, function (a, b) {
        s = s.replace(b.from, b.to);
      }),
        p.append(
          '<div data-liindex="' +
            c.index() +
            '" data-liref="' +
            m +
            '" class="justaddedthumb ' +
            d +
            '" style="width:' +
            b.width +
            "px;height:" +
            b.height +
            'px;">' +
            s +
            "</div>"
        );
      var u = n.find(".justaddedthumb"),
        v = n.find(i).length,
        w = u.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0),
        x = u.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0);
      u
        .find(j)
        .css({ backgroundImage: "url(" + e.thumbs[c.index()].src + ")" }),
        "vertical" === b.direction
          ? (u.css({ top: (v - 1) * x + "px", left: "0px" }),
            p.css({
              height: (v - 1) * x + u.outerHeight(),
              width: u.outerWidth(),
            }))
          : (u.css({ left: (v - 1) * w + "px", top: "0px" }),
            p.css({
              width: (v - 1) * w + u.outerWidth(),
              height: u.outerHeight(),
            })),
        n.data("maxw", q),
        n.data("maxh", r),
        n.data("wr_padding", b.wrapper_padding);
      var y =
        "outer-top" === b.position || "outer-bottom" === b.position
          ? "relative"
          : "absolute";
      ("outer-top" !== b.position && "outer-bottom" !== b.position) ||
        b.h_align;
      o.css({
        maxWidth: q + "px",
        maxHeight: r + "px",
        overflow: "hidden",
        position: "relative",
      }),
        n.css({
          maxWidth: q + "px",
          maxHeight: r + "px",
          overflow: "visible",
          position: y,
          background: b.wrapper_color,
          padding: b.wrapper_padding + "px",
          boxSizing: "contet-box",
        }),
        u.click(function () {
          e.sc_indicator = "bullet";
          var b = a.parent().find(h).data("distance");
          (b = void 0 === b ? 0 : b),
            Math.abs(b) < 10 &&
              (a.revcallslidewithid(m),
              a.parent().find(f).removeClass("selected"),
              jQuery(this).addClass("selected"));
        }),
        u.removeClass("justaddedthumb"),
        (b.opt = e),
        n.addClass("nav-pos-hor-" + b.h_align),
        n.addClass("nav-pos-ver-" + b.v_align),
        n.addClass("nav-dir-" + b.direction),
        t(n, b, e);
    },
    x = function (a) {
      var b = a.c.parent().find(".outer-top"),
        c = a.c.parent().find(".outer-bottom");
      (a.top_outer = b.hasClass("tp-forcenotvisible")
        ? 0
        : b.outerHeight() || 0),
        (a.bottom_outer = c.hasClass("tp-forcenotvisible")
          ? 0
          : c.outerHeight() || 0);
    },
    y = function (a, b, c, d) {
      b > c || c > d
        ? a.addClass("tp-forcenotvisible")
        : a.removeClass("tp-forcenotvisible");
    };
})(jQuery);

/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - NAVIGATION
 * @version: 1.3.5 (06.04.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
!(function (a) {
  "use strict";
  var b = jQuery.fn.revolution,
    c = b.is_mobile(),
    d = {
      alias: "Navigation Min JS",
      name: "revolution.extensions.navigation.min.js",
      min_core: "5.4.0",
      version: "1.3.5",
    };
  jQuery.extend(!0, b, {
    hideUnHideNav: function (a) {
      var b = a.c.width(),
        c = a.navigation.arrows,
        d = a.navigation.bullets,
        e = a.navigation.thumbnails,
        f = a.navigation.tabs;
      m(c) && y(a.c.find(".tparrows"), c.hide_under, b, c.hide_over),
        m(d) && y(a.c.find(".tp-bullets"), d.hide_under, b, d.hide_over),
        m(e) &&
          y(a.c.parent().find(".tp-thumbs"), e.hide_under, b, e.hide_over),
        m(f) && y(a.c.parent().find(".tp-tabs"), f.hide_under, b, f.hide_over),
        x(a);
    },
    resizeThumbsTabs: function (a, b) {
      if (
        (a.navigation && a.navigation.tabs.enable) ||
        (a.navigation && a.navigation.thumbnails.enable)
      ) {
        var c = (jQuery(window).width() - 480) / 500,
          d = new punchgs.TimelineLite(),
          e = a.navigation.tabs,
          g = a.navigation.thumbnails,
          h = a.navigation.bullets;
        if (
          (d.pause(),
          (c = c > 1 ? 1 : c < 0 ? 0 : c),
          m(e) &&
            (b || e.width > e.min_width) &&
            f(c, d, a.c, e, a.slideamount, "tab"),
          m(g) &&
            (b || g.width > g.min_width) &&
            f(c, d, a.c, g, a.slideamount, "thumb"),
          m(h) && b)
        ) {
          var i = a.c.find(".tp-bullets");
          i.find(".tp-bullet").each(function (a) {
            var b = jQuery(this),
              c = a + 1,
              d =
                b.outerWidth() + parseInt(void 0 === h.space ? 0 : h.space, 0),
              e =
                b.outerHeight() + parseInt(void 0 === h.space ? 0 : h.space, 0);
            "vertical" === h.direction
              ? (b.css({ top: (c - 1) * e + "px", left: "0px" }),
                i.css({
                  height: (c - 1) * e + b.outerHeight(),
                  width: b.outerWidth(),
                }))
              : (b.css({ left: (c - 1) * d + "px", top: "0px" }),
                i.css({
                  width: (c - 1) * d + b.outerWidth(),
                  height: b.outerHeight(),
                }));
          });
        }
        d.play(), x(a);
      }
      return !0;
    },
    updateNavIndexes: function (a) {
      function d(a) {
        c.find(a).lenght > 0 &&
          c.find(a).each(function (a) {
            jQuery(this).data("liindex", a);
          });
      }
      var c = a.c;
      d(".tp-tab"),
        d(".tp-bullet"),
        d(".tp-thumb"),
        b.resizeThumbsTabs(a, !0),
        b.manageNavigation(a);
    },
    manageNavigation: function (a) {
      var c = b.getHorizontalOffset(a.c.parent(), "left"),
        d = b.getHorizontalOffset(a.c.parent(), "right");
      m(a.navigation.bullets) &&
        ("fullscreen" != a.sliderLayout &&
          "fullwidth" != a.sliderLayout &&
          ((a.navigation.bullets.h_offset_old =
            void 0 === a.navigation.bullets.h_offset_old
              ? a.navigation.bullets.h_offset
              : a.navigation.bullets.h_offset_old),
          (a.navigation.bullets.h_offset =
            "center" === a.navigation.bullets.h_align
              ? a.navigation.bullets.h_offset_old + c / 2 - d / 2
              : a.navigation.bullets.h_offset_old + c - d)),
        t(a.c.find(".tp-bullets"), a.navigation.bullets, a)),
        m(a.navigation.thumbnails) &&
          t(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails, a),
        m(a.navigation.tabs) &&
          t(a.c.parent().find(".tp-tabs"), a.navigation.tabs, a),
        m(a.navigation.arrows) &&
          ("fullscreen" != a.sliderLayout &&
            "fullwidth" != a.sliderLayout &&
            ((a.navigation.arrows.left.h_offset_old =
              void 0 === a.navigation.arrows.left.h_offset_old
                ? a.navigation.arrows.left.h_offset
                : a.navigation.arrows.left.h_offset_old),
            (a.navigation.arrows.left.h_offset =
              "right" === a.navigation.arrows.left.h_align
                ? a.navigation.arrows.left.h_offset_old + d
                : a.navigation.arrows.left.h_offset_old + c),
            (a.navigation.arrows.right.h_offset_old =
              void 0 === a.navigation.arrows.right.h_offset_old
                ? a.navigation.arrows.right.h_offset
                : a.navigation.arrows.right.h_offset_old),
            (a.navigation.arrows.right.h_offset =
              "right" === a.navigation.arrows.right.h_align
                ? a.navigation.arrows.right.h_offset_old + d
                : a.navigation.arrows.right.h_offset_old + c)),
          t(a.c.find(".tp-leftarrow.tparrows"), a.navigation.arrows.left, a),
          t(a.c.find(".tp-rightarrow.tparrows"), a.navigation.arrows.right, a)),
        m(a.navigation.thumbnails) &&
          e(a.c.parent().find(".tp-thumbs"), a.navigation.thumbnails),
        m(a.navigation.tabs) &&
          e(a.c.parent().find(".tp-tabs"), a.navigation.tabs);
    },
    createNavigation: function (a, f) {
      if ("stop" === b.compare_version(d).check) return !1;
      var g = a.parent(),
        j = f.navigation.arrows,
        n = f.navigation.bullets,
        r = f.navigation.thumbnails,
        s = f.navigation.tabs,
        t = m(j),
        v = m(n),
        x = m(r),
        y = m(s);
      h(a, f),
        i(a, f),
        t && q(a, j, f),
        f.li.each(function (b) {
          var c = jQuery(f.li[f.li.length - 1 - b]),
            d = jQuery(this);
          v && (f.navigation.bullets.rtl ? u(a, n, c, f) : u(a, n, d, f)),
            x &&
              (f.navigation.thumbnails.rtl
                ? w(a, r, c, "tp-thumb", f)
                : w(a, r, d, "tp-thumb", f)),
            y &&
              (f.navigation.tabs.rtl
                ? w(a, s, c, "tp-tab", f)
                : w(a, s, d, "tp-tab", f));
        }),
        a.bind(
          "revolution.slide.onafterswap revolution.nextslide.waiting",
          function () {
            var b =
              0 == a.find(".next-revslide").length
                ? a.find(".active-revslide").data("index")
                : a.find(".next-revslide").data("index");
            a.find(".tp-bullet").each(function () {
              var a = jQuery(this);
              a.data("liref") === b
                ? a.addClass("selected")
                : a.removeClass("selected");
            }),
              g.find(".tp-thumb, .tp-tab").each(function () {
                var a = jQuery(this);
                a.data("liref") === b
                  ? (a.addClass("selected"),
                    a.hasClass("tp-tab")
                      ? e(g.find(".tp-tabs"), s)
                      : e(g.find(".tp-thumbs"), r))
                  : a.removeClass("selected");
              });
            var c = 0,
              d = !1;
            f.thumbs &&
              jQuery.each(f.thumbs, function (a, e) {
                (c = !1 === d ? a : c), (d = e.id === b || a === b || d);
              });
            var h = c > 0 ? c - 1 : f.slideamount - 1,
              i = c + 1 == f.slideamount ? 0 : c + 1;
            if (!0 === j.enable) {
              var k = j.tmp;
              if (
                (void 0 != f.thumbs[h] &&
                  jQuery.each(f.thumbs[h].params, function (a, b) {
                    k = k.replace(b.from, b.to);
                  }),
                j.left.j.html(k),
                (k = j.tmp),
                i > f.slideamount)
              )
                return;
              jQuery.each(f.thumbs[i].params, function (a, b) {
                k = k.replace(b.from, b.to);
              }),
                j.right.j.html(k),
                j.rtl
                  ? (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), {
                      backgroundImage: "url(" + f.thumbs[i].src + ")",
                    }),
                    punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), {
                      backgroundImage: "url(" + f.thumbs[h].src + ")",
                    }))
                  : (punchgs.TweenLite.set(j.left.j.find(".tp-arr-imgholder"), {
                      backgroundImage: "url(" + f.thumbs[h].src + ")",
                    }),
                    punchgs.TweenLite.set(j.right.j.find(".tp-arr-imgholder"), {
                      backgroundImage: "url(" + f.thumbs[i].src + ")",
                    }));
            }
          }
        ),
        l(j),
        l(n),
        l(r),
        l(s),
        g.on("mouseenter mousemove", function () {
          g.hasClass("tp-mouseover") ||
            (g.addClass("tp-mouseover"),
            punchgs.TweenLite.killDelayedCallsTo(p),
            t && j.hide_onleave && p(g.find(".tparrows"), j, "show"),
            v && n.hide_onleave && p(g.find(".tp-bullets"), n, "show"),
            x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "show"),
            y && s.hide_onleave && p(g.find(".tp-tabs"), s, "show"),
            c && (g.removeClass("tp-mouseover"), o(a, f)));
        }),
        g.on("mouseleave", function () {
          g.removeClass("tp-mouseover"), o(a, f);
        }),
        t && j.hide_onleave && p(g.find(".tparrows"), j, "hide", 0),
        v && n.hide_onleave && p(g.find(".tp-bullets"), n, "hide", 0),
        x && r.hide_onleave && p(g.find(".tp-thumbs"), r, "hide", 0),
        y && s.hide_onleave && p(g.find(".tp-tabs"), s, "hide", 0),
        x && k(g.find(".tp-thumbs"), f),
        y && k(g.find(".tp-tabs"), f),
        "carousel" === f.sliderType && k(a, f, !0),
        ("on" === f.navigation.touch.touchOnDesktop ||
          ("on" == f.navigation.touch.touchenabled && c)) &&
          k(a, f, "swipebased");
    },
  });
  var e = function (a, b) {
      var d =
          (a.hasClass("tp-thumbs"),
          a.hasClass("tp-thumbs") ? ".tp-thumb-mask" : ".tp-tab-mask"),
        e = a.hasClass("tp-thumbs")
          ? ".tp-thumbs-inner-wrapper"
          : ".tp-tabs-inner-wrapper",
        f = a.hasClass("tp-thumbs") ? ".tp-thumb" : ".tp-tab",
        g = a.find(d),
        h = g.find(e),
        i = b.direction,
        j =
          "vertical" === i
            ? g.find(f).first().outerHeight(!0) + b.space
            : g.find(f).first().outerWidth(!0) + b.space,
        k = "vertical" === i ? g.height() : g.width(),
        l = parseInt(g.find(f + ".selected").data("liindex"), 0),
        m = k / j,
        n = "vertical" === i ? g.height() : g.width(),
        o = 0 - l * j,
        p = "vertical" === i ? h.height() : h.width(),
        q = o < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : o,
        r = h.data("offset");
      m > 2 &&
        ((q = o - (r + j) <= 0 ? (o - (r + j) < 0 - j ? r : q + j) : q),
        (q =
          o - j + r + k < j && o + (Math.round(m) - 2) * j < r
            ? o + (Math.round(m) - 2) * j
            : q)),
        (q = q < 0 - (p - n) ? 0 - (p - n) : q > 0 ? 0 : q),
        "vertical" !== i && g.width() >= h.width() && (q = 0),
        "vertical" === i && g.height() >= h.height() && (q = 0),
        a.hasClass("dragged") ||
          ("vertical" === i
            ? h.data(
                "tmmove",
                punchgs.TweenLite.to(h, 0.5, {
                  top: q + "px",
                  ease: punchgs.Power3.easeInOut,
                })
              )
            : h.data(
                "tmmove",
                punchgs.TweenLite.to(h, 0.5, {
                  left: q + "px",
                  ease: punchgs.Power3.easeInOut,
                })
              ),
          h.data("offset", q));
    },
    f = function (a, b, c, d, e, f) {
      var g = c.parent().find(".tp-" + f + "s"),
        h = g.find(".tp-" + f + "s-inner-wrapper"),
        i = g.find(".tp-" + f + "-mask"),
        j = d.width * a < d.min_width ? d.min_width : Math.round(d.width * a),
        k = Math.round((j / d.width) * d.height),
        l = "vertical" === d.direction ? j : j * e + d.space * (e - 1),
        m = "vertical" === d.direction ? k * e + d.space * (e - 1) : k,
        n =
          "vertical" === d.direction
            ? { width: j + "px" }
            : { height: k + "px" };
      b.add(punchgs.TweenLite.set(g, n)),
        b.add(punchgs.TweenLite.set(h, { width: l + "px", height: m + "px" })),
        b.add(punchgs.TweenLite.set(i, { width: l + "px", height: m + "px" }));
      var o = h.find(".tp-" + f);
      return (
        o &&
          jQuery.each(o, function (a, c) {
            "vertical" === d.direction
              ? b.add(
                  punchgs.TweenLite.set(c, {
                    top:
                      a * (k + parseInt(void 0 === d.space ? 0 : d.space, 0)),
                    width: j + "px",
                    height: k + "px",
                  })
                )
              : "horizontal" === d.direction &&
                b.add(
                  punchgs.TweenLite.set(c, {
                    left:
                      a * (j + parseInt(void 0 === d.space ? 0 : d.space, 0)),
                    width: j + "px",
                    height: k + "px",
                  })
                );
          }),
        b
      );
    },
    g = function (a) {
      var b = 0,
        c = 0,
        d = 0,
        e = 0,
        f = 1,
        g = 1,
        h = 1;
      return (
        "detail" in a && (c = a.detail),
        "wheelDelta" in a && (c = -a.wheelDelta / 120),
        "wheelDeltaY" in a && (c = -a.wheelDeltaY / 120),
        "wheelDeltaX" in a && (b = -a.wheelDeltaX / 120),
        "axis" in a && a.axis === a.HORIZONTAL_AXIS && ((b = c), (c = 0)),
        (d = b * f),
        (e = c * f),
        "deltaY" in a && (e = a.deltaY),
        "deltaX" in a && (d = a.deltaX),
        (d || e) &&
          a.deltaMode &&
          (1 == a.deltaMode ? ((d *= g), (e *= g)) : ((d *= h), (e *= h))),
        d && !b && (b = d < 1 ? -1 : 1),
        e && !c && (c = e < 1 ? -1 : 1),
        (e = navigator.userAgent.match(/mozilla/i) ? 10 * e : e),
        (e > 300 || e < -300) && (e /= 10),
        { spinX: b, spinY: c, pixelX: d, pixelY: e }
      );
    },
    h = function (a, c) {
      "on" === c.navigation.keyboardNavigation &&
        jQuery(document).keydown(function (d) {
          (("horizontal" == c.navigation.keyboard_direction &&
            39 == d.keyCode) ||
            ("vertical" == c.navigation.keyboard_direction &&
              40 == d.keyCode)) &&
            ((c.sc_indicator = "arrow"),
            (c.sc_indicator_dir = 0),
            b.callingNewSlide(a, 1)),
            (("horizontal" == c.navigation.keyboard_direction &&
              37 == d.keyCode) ||
              ("vertical" == c.navigation.keyboard_direction &&
                38 == d.keyCode)) &&
              ((c.sc_indicator = "arrow"),
              (c.sc_indicator_dir = 1),
              b.callingNewSlide(a, -1));
        });
    },
    i = function (a, c) {
      if (
        "on" === c.navigation.mouseScrollNavigation ||
        "carousel" === c.navigation.mouseScrollNavigation
      ) {
        (c.isIEEleven = !!navigator.userAgent.match(/Trident.*rv\:11\./)),
          (c.isSafari = !!navigator.userAgent.match(/safari/i)),
          (c.ischrome = !!navigator.userAgent.match(/chrome/i));
        var d = c.ischrome
            ? -49
            : c.isIEEleven || c.isSafari
            ? -9
            : navigator.userAgent.match(/mozilla/i)
            ? -29
            : -49,
          e = c.ischrome
            ? 49
            : c.isIEEleven || c.isSafari
            ? 9
            : navigator.userAgent.match(/mozilla/i)
            ? 29
            : 49;
        a.on("mousewheel DOMMouseScroll", function (f) {
          var h = g(f.originalEvent),
            i = a.find(".tp-revslider-slidesli.active-revslide").index(),
            j = a.find(".tp-revslider-slidesli.processing-revslide").index(),
            k = (-1 != i && 0 == i) || (-1 != j && 0 == j),
            l =
              (-1 != i && i == c.slideamount - 1) ||
              (1 != j && j == c.slideamount - 1),
            m = !0;
          "carousel" == c.navigation.mouseScrollNavigation && (k = l = !1),
            -1 == j
              ? h.pixelY < d
                ? (k ||
                    ((c.sc_indicator = "arrow"),
                    "reverse" !== c.navigation.mouseScrollReverse &&
                      ((c.sc_indicator_dir = 1), b.callingNewSlide(a, -1)),
                    (m = !1)),
                  l ||
                    ((c.sc_indicator = "arrow"),
                    "reverse" === c.navigation.mouseScrollReverse &&
                      ((c.sc_indicator_dir = 0), b.callingNewSlide(a, 1)),
                    (m = !1)))
                : h.pixelY > e &&
                  (l ||
                    ((c.sc_indicator = "arrow"),
                    "reverse" !== c.navigation.mouseScrollReverse &&
                      ((c.sc_indicator_dir = 0), b.callingNewSlide(a, 1)),
                    (m = !1)),
                  k ||
                    ((c.sc_indicator = "arrow"),
                    "reverse" === c.navigation.mouseScrollReverse &&
                      ((c.sc_indicator_dir = 1), b.callingNewSlide(a, -1)),
                    (m = !1)))
              : (m = !1);
          var n = c.c.offset().top - jQuery("body").scrollTop(),
            o = n + c.c.height();
          return (
            "carousel" != c.navigation.mouseScrollNavigation
              ? ("reverse" !== c.navigation.mouseScrollReverse &&
                  ((n > 0 && h.pixelY > 0) ||
                    (o < jQuery(window).height() && h.pixelY < 0)) &&
                  (m = !0),
                "reverse" === c.navigation.mouseScrollReverse &&
                  ((n < 0 && h.pixelY < 0) ||
                    (o > jQuery(window).height() && h.pixelY > 0)) &&
                  (m = !0))
              : (m = !1),
            0 == m ? (f.preventDefault(f), !1) : void 0
          );
        });
      }
    },
    j = function (a, b, d) {
      return (
        (a = c
          ? jQuery(d.target).closest("." + a).length ||
            jQuery(d.srcElement).closest("." + a).length
          : jQuery(d.toElement).closest("." + a).length ||
            jQuery(d.originalTarget).closest("." + a).length),
        !0 === a || 1 === a ? 1 : 0
      );
    },
    k = function (a, d, e) {
      var f = d.carousel;
      jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"),
        (f.Limit = "endless");
      var h = (c || b.get_browser(), a),
        i =
          "vertical" === d.navigation.thumbnails.direction ||
          "vertical" === d.navigation.tabs.direction
            ? "none"
            : "vertical",
        k = d.navigation.touch.swipe_direction || "horizontal";
      (i = "swipebased" == e && "vertical" == k ? "none" : e ? "vertical" : i),
        jQuery.fn.swipetp || (jQuery.fn.swipetp = jQuery.fn.swipe),
        (jQuery.fn.swipetp.defaults &&
          jQuery.fn.swipetp.defaults.excludedElements) ||
          jQuery.fn.swipetp.defaults ||
          (jQuery.fn.swipetp.defaults = new Object()),
        (jQuery.fn.swipetp.defaults.excludedElements =
          "label, button, input, select, textarea, .noSwipe"),
        h.swipetp({
          allowPageScroll: i,
          triggerOnTouchLeave: !0,
          treshold: d.navigation.touch.swipe_treshold,
          fingers: d.navigation.touch.swipe_min_touches,
          excludeElements: jQuery.fn.swipetp.defaults.excludedElements,
          swipeStatus: function (e, g, h, i, l, m, n) {
            var o = j("rev_slider_wrapper", a, e),
              p = j("tp-thumbs", a, e),
              q = j("tp-tabs", a, e),
              r = jQuery(this).attr("class"),
              s = !!r.match(/tp-tabs|tp-thumb/gi);
            if (
              "carousel" === d.sliderType &&
              ((("move" === g || "end" === g || "cancel" == g) &&
                d.dragStartedOverSlider &&
                !d.dragStartedOverThumbs &&
                !d.dragStartedOverTabs) ||
                ("start" === g && o > 0 && 0 === p && 0 === q))
            ) {
              if (c && ("up" === h || "down" === h)) return;
              switch (
                ((d.dragStartedOverSlider = !0),
                (i =
                  h && h.match(/left|up/g)
                    ? Math.round(-1 * i)
                    : (i = Math.round(1 * i))),
                g)
              ) {
                case "start":
                  void 0 !== f.positionanim &&
                    (f.positionanim.kill(),
                    (f.slide_globaloffset =
                      "off" === f.infinity
                        ? f.slide_offset
                        : b.simp(f.slide_offset, f.maxwidth))),
                    (f.overpull = "none"),
                    f.wrap.addClass("dragged");
                  break;
                case "move":
                  if (
                    (d.c
                      .find(".tp-withaction")
                      .addClass("tp-temporarydisabled"),
                    (f.slide_offset =
                      "off" === f.infinity
                        ? f.slide_globaloffset + i
                        : b.simp(f.slide_globaloffset + i, f.maxwidth)),
                    "off" === f.infinity)
                  ) {
                    var t =
                      "center" === f.horizontal_align
                        ? (f.wrapwidth / 2 -
                            f.slide_width / 2 -
                            f.slide_offset) /
                          f.slide_width
                        : (0 - f.slide_offset) / f.slide_width;
                    ("none" !== f.overpull && 0 !== f.overpull) ||
                    !(t < 0 || t > d.slideamount - 1)
                      ? t >= 0 &&
                        t <= d.slideamount - 1 &&
                        ((t >= 0 && i > f.overpull) ||
                          (t <= d.slideamount - 1 && i < f.overpull)) &&
                        (f.overpull = 0)
                      : (f.overpull = i),
                      (f.slide_offset =
                        t < 0
                          ? f.slide_offset +
                            (f.overpull - i) / 1.1 +
                            Math.sqrt(Math.abs((f.overpull - i) / 1.1))
                          : t > d.slideamount - 1
                          ? f.slide_offset +
                            (f.overpull - i) / 1.1 -
                            Math.sqrt(Math.abs((f.overpull - i) / 1.1))
                          : f.slide_offset);
                  }
                  b.organiseCarousel(d, h, !0, !0);
                  break;
                case "end":
                case "cancel":
                  (f.slide_globaloffset = f.slide_offset),
                    f.wrap.removeClass("dragged"),
                    b.carouselToEvalPosition(d, h),
                    (d.dragStartedOverSlider = !1),
                    (d.dragStartedOverThumbs = !1),
                    (d.dragStartedOverTabs = !1),
                    setTimeout(function () {
                      d.c
                        .find(".tp-withaction")
                        .removeClass("tp-temporarydisabled");
                    }, 19);
              }
            } else {
              if (
                (("move" !== g && "end" !== g && "cancel" != g) ||
                  d.dragStartedOverSlider ||
                  (!d.dragStartedOverThumbs && !d.dragStartedOverTabs)) &&
                !("start" === g && o > 0 && (p > 0 || q > 0))
              ) {
                if ("end" == g && !s) {
                  if (
                    ((d.sc_indicator = "arrow"),
                    ("horizontal" == k && "left" == h) ||
                      ("vertical" == k && "up" == h))
                  )
                    return (
                      (d.sc_indicator_dir = 0), b.callingNewSlide(d.c, 1), !1
                    );
                  if (
                    ("horizontal" == k && "right" == h) ||
                    ("vertical" == k && "down" == h)
                  )
                    return (
                      (d.sc_indicator_dir = 1), b.callingNewSlide(d.c, -1), !1
                    );
                }
                return (
                  (d.dragStartedOverSlider = !1),
                  (d.dragStartedOverThumbs = !1),
                  (d.dragStartedOverTabs = !1),
                  !0
                );
              }
              p > 0 && (d.dragStartedOverThumbs = !0),
                q > 0 && (d.dragStartedOverTabs = !0);
              var u = d.dragStartedOverThumbs ? ".tp-thumbs" : ".tp-tabs",
                v = d.dragStartedOverThumbs ? ".tp-thumb-mask" : ".tp-tab-mask",
                w = d.dragStartedOverThumbs
                  ? ".tp-thumbs-inner-wrapper"
                  : ".tp-tabs-inner-wrapper",
                x = d.dragStartedOverThumbs ? ".tp-thumb" : ".tp-tab",
                y = d.dragStartedOverThumbs
                  ? d.navigation.thumbnails
                  : d.navigation.tabs;
              i =
                h && h.match(/left|up/g)
                  ? Math.round(-1 * i)
                  : (i = Math.round(1 * i));
              var z = a.parent().find(v),
                A = z.find(w),
                B = y.direction,
                C = "vertical" === B ? A.height() : A.width(),
                D = "vertical" === B ? z.height() : z.width(),
                E =
                  "vertical" === B
                    ? z.find(x).first().outerHeight(!0) + y.space
                    : z.find(x).first().outerWidth(!0) + y.space,
                F =
                  void 0 === A.data("offset")
                    ? 0
                    : parseInt(A.data("offset"), 0),
                G = 0;
              switch (g) {
                case "start":
                  a.parent().find(u).addClass("dragged"),
                    (F =
                      "vertical" === B ? A.position().top : A.position().left),
                    A.data("offset", F),
                    A.data("tmmove") && A.data("tmmove").pause();
                  break;
                case "move":
                  if (C <= D) return !1;
                  (G = F + i),
                    (G =
                      G > 0
                        ? "horizontal" === B
                          ? G - A.width() * (((G / A.width()) * G) / A.width())
                          : G -
                            A.height() * (((G / A.height()) * G) / A.height())
                        : G);
                  var H =
                    "vertical" === B
                      ? 0 - (A.height() - z.height())
                      : 0 - (A.width() - z.width());
                  (G =
                    G < H
                      ? "horizontal" === B
                        ? G +
                          (((A.width() * (G - H)) / A.width()) * (G - H)) /
                            A.width()
                        : G +
                          (((A.height() * (G - H)) / A.height()) * (G - H)) /
                            A.height()
                      : G),
                    "vertical" === B
                      ? punchgs.TweenLite.set(A, { top: G + "px" })
                      : punchgs.TweenLite.set(A, { left: G + "px" });
                  break;
                case "end":
                case "cancel":
                  if (s)
                    return (
                      (G = F + i),
                      (G =
                        "vertical" === B
                          ? G < 0 - (A.height() - z.height())
                            ? 0 - (A.height() - z.height())
                            : G
                          : G < 0 - (A.width() - z.width())
                          ? 0 - (A.width() - z.width())
                          : G),
                      (G = G > 0 ? 0 : G),
                      (G =
                        Math.abs(i) > E / 10
                          ? i <= 0
                            ? Math.floor(G / E) * E
                            : Math.ceil(G / E) * E
                          : i < 0
                          ? Math.ceil(G / E) * E
                          : Math.floor(G / E) * E),
                      (G =
                        "vertical" === B
                          ? G < 0 - (A.height() - z.height())
                            ? 0 - (A.height() - z.height())
                            : G
                          : G < 0 - (A.width() - z.width())
                          ? 0 - (A.width() - z.width())
                          : G),
                      (G = G > 0 ? 0 : G),
                      "vertical" === B
                        ? punchgs.TweenLite.to(A, 0.5, {
                            top: G + "px",
                            ease: punchgs.Power3.easeOut,
                          })
                        : punchgs.TweenLite.to(A, 0.5, {
                            left: G + "px",
                            ease: punchgs.Power3.easeOut,
                          }),
                      (G =
                        G ||
                        ("vertical" === B
                          ? A.position().top
                          : A.position().left)),
                      A.data("offset", G),
                      A.data("distance", i),
                      setTimeout(function () {
                        (d.dragStartedOverSlider = !1),
                          (d.dragStartedOverThumbs = !1),
                          (d.dragStartedOverTabs = !1);
                      }, 100),
                      a.parent().find(u).removeClass("dragged"),
                      !1
                    );
              }
            }
          },
        });
    },
    l = function (a) {
      (a.hide_delay = jQuery.isNumeric(parseInt(a.hide_delay, 0))
        ? a.hide_delay / 1e3
        : 0.2),
        (a.hide_delay_mobile = jQuery.isNumeric(
          parseInt(a.hide_delay_mobile, 0)
        )
          ? a.hide_delay_mobile / 1e3
          : 0.2);
    },
    m = function (a) {
      return a && a.enable;
    },
    n = function (a) {
      return (
        a &&
        a.enable &&
        !0 === a.hide_onleave &&
        (void 0 === a.position || !a.position.match(/outer/g))
      );
    },
    o = function (a, b) {
      var d = a.parent();
      n(b.navigation.arrows) &&
        punchgs.TweenLite.delayedCall(
          c
            ? b.navigation.arrows.hide_delay_mobile
            : b.navigation.arrows.hide_delay,
          p,
          [d.find(".tparrows"), b.navigation.arrows, "hide"]
        ),
        n(b.navigation.bullets) &&
          punchgs.TweenLite.delayedCall(
            c
              ? b.navigation.bullets.hide_delay_mobile
              : b.navigation.bullets.hide_delay,
            p,
            [d.find(".tp-bullets"), b.navigation.bullets, "hide"]
          ),
        n(b.navigation.thumbnails) &&
          punchgs.TweenLite.delayedCall(
            c
              ? b.navigation.thumbnails.hide_delay_mobile
              : b.navigation.thumbnails.hide_delay,
            p,
            [d.find(".tp-thumbs"), b.navigation.thumbnails, "hide"]
          ),
        n(b.navigation.tabs) &&
          punchgs.TweenLite.delayedCall(
            c
              ? b.navigation.tabs.hide_delay_mobile
              : b.navigation.tabs.hide_delay,
            p,
            [d.find(".tp-tabs"), b.navigation.tabs, "hide"]
          );
    },
    p = function (a, b, c, d) {
      switch (((d = void 0 === d ? 0.5 : d), c)) {
        case "show":
          punchgs.TweenLite.to(a, d, {
            autoAlpha: 1,
            ease: punchgs.Power3.easeInOut,
            overwrite: "auto",
          });
          break;
        case "hide":
          punchgs.TweenLite.to(a, d, {
            autoAlpha: 0,
            ease: punchgs.Power3.easeInOu,
            overwrite: "auto",
          });
      }
    },
    q = function (a, b, c) {
      (b.style = void 0 === b.style ? "" : b.style),
        (b.left.style = void 0 === b.left.style ? "" : b.left.style),
        (b.right.style = void 0 === b.right.style ? "" : b.right.style),
        0 === a.find(".tp-leftarrow.tparrows").length &&
          a.append(
            '<div class="tp-leftarrow tparrows ' +
              b.style +
              " " +
              b.left.style +
              '">' +
              b.tmp +
              "</div>"
          ),
        0 === a.find(".tp-rightarrow.tparrows").length &&
          a.append(
            '<div class="tp-rightarrow tparrows ' +
              b.style +
              " " +
              b.right.style +
              '">' +
              b.tmp +
              "</div>"
          );
      var d = a.find(".tp-leftarrow.tparrows"),
        e = a.find(".tp-rightarrow.tparrows");
      b.rtl
        ? (d.click(function () {
            (c.sc_indicator = "arrow"), (c.sc_indicator_dir = 0), a.revnext();
          }),
          e.click(function () {
            (c.sc_indicator = "arrow"), (c.sc_indicator_dir = 1), a.revprev();
          }))
        : (e.click(function () {
            (c.sc_indicator = "arrow"), (c.sc_indicator_dir = 0), a.revnext();
          }),
          d.click(function () {
            (c.sc_indicator = "arrow"), (c.sc_indicator_dir = 1), a.revprev();
          })),
        (b.right.j = a.find(".tp-rightarrow.tparrows")),
        (b.left.j = a.find(".tp-leftarrow.tparrows")),
        (b.padding_top = parseInt(c.carousel.padding_top || 0, 0)),
        (b.padding_bottom = parseInt(c.carousel.padding_bottom || 0, 0)),
        t(d, b.left, c),
        t(e, b.right, c),
        (b.left.opt = c),
        (b.right.opt = c),
        ("outer-left" != b.position && "outer-right" != b.position) ||
          (c.outernav = !0);
    },
    r = function (a, b, c) {
      var d = a.outerHeight(!0),
        f =
          (a.outerWidth(!0),
          void 0 == b.opt ? 0 : 0 == c.conh ? c.height : c.conh),
        g =
          "layergrid" == b.container
            ? "fullscreen" == c.sliderLayout
              ? c.height / 2 - (c.gridheight[c.curWinRange] * c.bh) / 2
              : "on" == c.autoHeight ||
                (void 0 != c.minHeight && c.minHeight > 0)
              ? f / 2 - (c.gridheight[c.curWinRange] * c.bh) / 2
              : 0
            : 0,
        h =
          "top" === b.v_align
            ? { top: "0px", y: Math.round(b.v_offset + g) + "px" }
            : "center" === b.v_align
            ? { top: "50%", y: Math.round(0 - d / 2 + b.v_offset) + "px" }
            : { top: "100%", y: Math.round(0 - (d + b.v_offset + g)) + "px" };
      a.hasClass("outer-bottom") || punchgs.TweenLite.set(a, h);
    },
    s = function (a, b, c) {
      var e = (a.outerHeight(!0), a.outerWidth(!0)),
        f =
          "layergrid" == b.container
            ? "carousel" === c.sliderType
              ? 0
              : c.width / 2 - (c.gridwidth[c.curWinRange] * c.bw) / 2
            : 0,
        g =
          "left" === b.h_align
            ? { left: "0px", x: Math.round(b.h_offset + f) + "px" }
            : "center" === b.h_align
            ? { left: "50%", x: Math.round(0 - e / 2 + b.h_offset) + "px" }
            : { left: "100%", x: Math.round(0 - (e + b.h_offset + f)) + "px" };
      punchgs.TweenLite.set(a, g);
    },
    t = function (a, b, c) {
      var d =
          a.closest(".tp-simpleresponsive").length > 0
            ? a.closest(".tp-simpleresponsive")
            : a.closest(".tp-revslider-mainul").length > 0
            ? a.closest(".tp-revslider-mainul")
            : a.closest(".rev_slider_wrapper").length > 0
            ? a.closest(".rev_slider_wrapper")
            : a.parent().find(".tp-revslider-mainul"),
        e = d.width(),
        f = d.height();
      if (
        (r(a, b, c),
        s(a, b, c),
        "outer-left" !== b.position ||
        ("fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout)
          ? "outer-right" !== b.position ||
            ("fullwidth" != b.sliderLayout && "fullscreen" != b.sliderLayout) ||
            punchgs.TweenLite.set(a, {
              right: 0 - a.outerWidth() + "px",
              x: b.h_offset + "px",
            })
          : punchgs.TweenLite.set(a, {
              left: 0 - a.outerWidth() + "px",
              x: b.h_offset + "px",
            }),
        a.hasClass("tp-thumbs") || a.hasClass("tp-tabs"))
      ) {
        var g = a.data("wr_padding"),
          h = a.data("maxw"),
          i = a.data("maxh"),
          j = a.hasClass("tp-thumbs")
            ? a.find(".tp-thumb-mask")
            : a.find(".tp-tab-mask"),
          k = parseInt(b.padding_top || 0, 0),
          l = parseInt(b.padding_bottom || 0, 0);
        h > e && "outer-left" !== b.position && "outer-right" !== b.position
          ? (punchgs.TweenLite.set(a, {
              left: "0px",
              x: 0,
              maxWidth: e - 2 * g + "px",
            }),
            punchgs.TweenLite.set(j, { maxWidth: e - 2 * g + "px" }))
          : (punchgs.TweenLite.set(a, { maxWidth: h + "px" }),
            punchgs.TweenLite.set(j, { maxWidth: h + "px" })),
          i + 2 * g > f &&
          "outer-bottom" !== b.position &&
          "outer-top" !== b.position
            ? (punchgs.TweenLite.set(a, {
                top: "0px",
                y: 0,
                maxHeight: k + l + (f - 2 * g) + "px",
              }),
              punchgs.TweenLite.set(j, {
                maxHeight: k + l + (f - 2 * g) + "px",
              }))
            : (punchgs.TweenLite.set(a, { maxHeight: i + "px" }),
              punchgs.TweenLite.set(j, { maxHeight: i + "px" })),
          "outer-left" !== b.position &&
            "outer-right" !== b.position &&
            ((k = 0), (l = 0)),
          !0 === b.span && "vertical" === b.direction
            ? (punchgs.TweenLite.set(a, {
                maxHeight: k + l + (f - 2 * g) + "px",
                height: k + l + (f - 2 * g) + "px",
                top: 0 - k,
                y: 0,
              }),
              r(j, b, c))
            : !0 === b.span &&
              "horizontal" === b.direction &&
              (punchgs.TweenLite.set(a, {
                maxWidth: "100%",
                width: e - 2 * g + "px",
                left: 0,
                x: 0,
              }),
              s(j, b, c));
      }
    },
    u = function (a, b, c, d) {
      0 === a.find(".tp-bullets").length &&
        ((b.style = void 0 === b.style ? "" : b.style),
        a.append(
          '<div class="tp-bullets ' + b.style + " " + b.direction + '"></div>'
        ));
      var e = a.find(".tp-bullets"),
        f = c.data("index"),
        g = b.tmp;
      jQuery.each(d.thumbs[c.index()].params, function (a, b) {
        g = g.replace(b.from, b.to);
      }),
        e.append('<div class="justaddedbullet tp-bullet">' + g + "</div>");
      var h = a.find(".justaddedbullet"),
        i = a.find(".tp-bullet").length,
        j = h.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0),
        k = h.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0);
      "vertical" === b.direction
        ? (h.css({ top: (i - 1) * k + "px", left: "0px" }),
          e.css({
            height: (i - 1) * k + h.outerHeight(),
            width: h.outerWidth(),
          }))
        : (h.css({ left: (i - 1) * j + "px", top: "0px" }),
          e.css({
            width: (i - 1) * j + h.outerWidth(),
            height: h.outerHeight(),
          })),
        h
          .find(".tp-bullet-image")
          .css({ backgroundImage: "url(" + d.thumbs[c.index()].src + ")" }),
        h.data("liref", f),
        h.click(function () {
          (d.sc_indicator = "bullet"),
            a.revcallslidewithid(f),
            a.find(".tp-bullet").removeClass("selected"),
            jQuery(this).addClass("selected");
        }),
        h.removeClass("justaddedbullet"),
        (b.padding_top = parseInt(d.carousel.padding_top || 0, 0)),
        (b.padding_bottom = parseInt(d.carousel.padding_bottom || 0, 0)),
        (b.opt = d),
        ("outer-left" != b.position && "outer-right" != b.position) ||
          (d.outernav = !0),
        e.addClass("nav-pos-hor-" + b.h_align),
        e.addClass("nav-pos-ver-" + b.v_align),
        e.addClass("nav-dir-" + b.direction),
        t(e, b, d);
    },
    w = function (a, b, c, d, e) {
      var f = "tp-thumb" === d ? ".tp-thumbs" : ".tp-tabs",
        g = "tp-thumb" === d ? ".tp-thumb-mask" : ".tp-tab-mask",
        h =
          "tp-thumb" === d
            ? ".tp-thumbs-inner-wrapper"
            : ".tp-tabs-inner-wrapper",
        i = "tp-thumb" === d ? ".tp-thumb" : ".tp-tab",
        j = "tp-thumb" === d ? ".tp-thumb-image" : ".tp-tab-image";
      if (
        ((b.visibleAmount =
          b.visibleAmount > e.slideamount ? e.slideamount : b.visibleAmount),
        (b.sliderLayout = e.sliderLayout),
        0 === a.parent().find(f).length)
      ) {
        b.style = void 0 === b.style ? "" : b.style;
        var k = !0 === b.span ? "tp-span-wrapper" : "",
          l =
            '<div class="' +
            d +
            "s " +
            k +
            " " +
            b.position +
            " " +
            b.style +
            '"><div class="' +
            d +
            '-mask"><div class="' +
            d +
            's-inner-wrapper" style="position:relative;"></div></div></div>';
        "outer-top" === b.position
          ? a.parent().prepend(l)
          : "outer-bottom" === b.position
          ? a.after(l)
          : a.append(l),
          (b.padding_top = parseInt(e.carousel.padding_top || 0, 0)),
          (b.padding_bottom = parseInt(e.carousel.padding_bottom || 0, 0)),
          ("outer-left" != b.position && "outer-right" != b.position) ||
            (e.outernav = !0);
      }
      var m = c.data("index"),
        n = a.parent().find(f),
        o = n.find(g),
        p = o.find(h),
        q =
          "horizontal" === b.direction
            ? b.width * b.visibleAmount + b.space * (b.visibleAmount - 1)
            : b.width,
        r =
          "horizontal" === b.direction
            ? b.height
            : b.height * b.visibleAmount + b.space * (b.visibleAmount - 1),
        s = b.tmp;
      jQuery.each(e.thumbs[c.index()].params, function (a, b) {
        s = s.replace(b.from, b.to);
      }),
        p.append(
          '<div data-liindex="' +
            c.index() +
            '" data-liref="' +
            m +
            '" class="justaddedthumb ' +
            d +
            '" style="width:' +
            b.width +
            "px;height:" +
            b.height +
            'px;">' +
            s +
            "</div>"
        );
      var u = n.find(".justaddedthumb"),
        v = n.find(i).length,
        w = u.outerWidth() + parseInt(void 0 === b.space ? 0 : b.space, 0),
        x = u.outerHeight() + parseInt(void 0 === b.space ? 0 : b.space, 0);
      u
        .find(j)
        .css({ backgroundImage: "url(" + e.thumbs[c.index()].src + ")" }),
        "vertical" === b.direction
          ? (u.css({ top: (v - 1) * x + "px", left: "0px" }),
            p.css({
              height: (v - 1) * x + u.outerHeight(),
              width: u.outerWidth(),
            }))
          : (u.css({ left: (v - 1) * w + "px", top: "0px" }),
            p.css({
              width: (v - 1) * w + u.outerWidth(),
              height: u.outerHeight(),
            })),
        n.data("maxw", q),
        n.data("maxh", r),
        n.data("wr_padding", b.wrapper_padding);
      var y =
        "outer-top" === b.position || "outer-bottom" === b.position
          ? "relative"
          : "absolute";
      ("outer-top" !== b.position && "outer-bottom" !== b.position) ||
        b.h_align;
      o.css({
        maxWidth: q + "px",
        maxHeight: r + "px",
        overflow: "hidden",
        position: "relative",
      }),
        n.css({
          maxWidth: q + "px",
          maxHeight: r + "px",
          overflow: "visible",
          position: y,
          background: b.wrapper_color,
          padding: b.wrapper_padding + "px",
          boxSizing: "contet-box",
        }),
        u.click(function () {
          e.sc_indicator = "bullet";
          var b = a.parent().find(h).data("distance");
          (b = void 0 === b ? 0 : b),
            Math.abs(b) < 10 &&
              (a.revcallslidewithid(m),
              a.parent().find(f).removeClass("selected"),
              jQuery(this).addClass("selected"));
        }),
        u.removeClass("justaddedthumb"),
        (b.opt = e),
        n.addClass("nav-pos-hor-" + b.h_align),
        n.addClass("nav-pos-ver-" + b.v_align),
        n.addClass("nav-dir-" + b.direction),
        t(n, b, e);
    },
    x = function (a) {
      var b = a.c.parent().find(".outer-top"),
        c = a.c.parent().find(".outer-bottom");
      (a.top_outer = b.hasClass("tp-forcenotvisible")
        ? 0
        : b.outerHeight() || 0),
        (a.bottom_outer = c.hasClass("tp-forcenotvisible")
          ? 0
          : c.outerHeight() || 0);
    },
    y = function (a, b, c, d) {
      b > c || c > d
        ? a.addClass("tp-forcenotvisible")
        : a.removeClass("tp-forcenotvisible");
    };
})(jQuery);

/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - PARALLAX
 * @version: 2.2.3 (17.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
!(function (a) {
  "use strict";
  function e(a, b) {
    a.lastscrolltop = b;
  }
  var b = jQuery.fn.revolution,
    c = b.is_mobile(),
    d = {
      alias: "Parallax Min JS",
      name: "revolution.extensions.parallax.min.js",
      min_core: "5.4.5",
      version: "2.2.3",
    };
  jQuery.extend(!0, b, {
    checkForParallax: function (a, e) {
      function g(a) {
        if ("3D" == f.type || "3d" == f.type) {
          a
            .find(".slotholder")
            .wrapAll(
              '<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'
            ),
            a
              .find(".tp-parallax-wrap")
              .wrapAll(
                '<div class="dddwrapper-layer" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:5;overflow:' +
                  f.ddd_layer_overflow +
                  ';"></div>'
              ),
            a
              .find(".rs-parallaxlevel-tobggroup")
              .closest(".tp-parallax-wrap")
              .wrapAll(
                '<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>'
              );
          var b = a.find(".dddwrapper"),
            c = a.find(".dddwrapper-layer");
          a.find(".dddwrapper-layertobggroup").appendTo(b),
            "carousel" == e.sliderType &&
              ("on" == f.ddd_shadow && b.addClass("dddwrappershadow"),
              punchgs.TweenLite.set(b, {
                borderRadius: e.carousel.border_radius,
              })),
            punchgs.TweenLite.set(a, {
              overflow: "visible",
              transformStyle: "preserve-3d",
              perspective: 1600,
            }),
            punchgs.TweenLite.set(b, {
              force3D: "auto",
              transformOrigin: "50% 50%",
            }),
            punchgs.TweenLite.set(c, {
              force3D: "auto",
              transformOrigin: "50% 50%",
              zIndex: 5,
            }),
            punchgs.TweenLite.set(e.ul, {
              transformStyle: "preserve-3d",
              transformPerspective: 1600,
            });
        }
      }
      if ("stop" === b.compare_version(d).check) return !1;
      var f = e.parallax;
      if (!f.done) {
        if (((f.done = !0), c && "on" == f.disable_onmobile)) return !1;
        ("3D" != f.type && "3d" != f.type) ||
          (punchgs.TweenLite.set(e.c, { overflow: f.ddd_overflow }),
          punchgs.TweenLite.set(e.ul, { overflow: f.ddd_overflow }),
          "carousel" != e.sliderType &&
            "on" == f.ddd_shadow &&
            (e.c.prepend('<div class="dddwrappershadow"></div>'),
            punchgs.TweenLite.set(e.c.find(".dddwrappershadow"), {
              force3D: "auto",
              transformPerspective: 1600,
              transformOrigin: "50% 50%",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }))),
          e.li.each(function () {
            g(jQuery(this));
          }),
          ("3D" == f.type || "3d" == f.type) &&
            e.c.find(".tp-static-layers").length > 0 &&
            (punchgs.TweenLite.set(e.c.find(".tp-static-layers"), {
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }),
            g(e.c.find(".tp-static-layers"))),
          (f.pcontainers = new Array()),
          (f.pcontainer_depths = new Array()),
          (f.bgcontainers = new Array()),
          (f.bgcontainer_depths = new Array()),
          e.c
            .find(
              ".tp-revslider-slidesli .slotholder, .tp-revslider-slidesli .rs-background-video-layer"
            )
            .each(function () {
              var a = jQuery(this),
                b = a.data("bgparallax") || e.parallax.bgparallax;
              void 0 !== (b = "on" == b ? 1 : b) &&
                "off" !== b &&
                (f.bgcontainers.push(a),
                f.bgcontainer_depths.push(
                  e.parallax.levels[parseInt(b, 0) - 1] / 100
                ));
            });
        for (var h = 1; h <= f.levels.length; h++)
          e.c.find(".rs-parallaxlevel-" + h).each(function () {
            var a = jQuery(this),
              b = a.closest(".tp-parallax-wrap");
            b.data("parallaxlevel", f.levels[h - 1]),
              b.addClass("tp-parallax-container"),
              f.pcontainers.push(b),
              f.pcontainer_depths.push(f.levels[h - 1]);
          });
        ("mouse" != f.type &&
          "scroll+mouse" != f.type &&
          "mouse+scroll" != f.type &&
          "3D" != f.type &&
          "3d" != f.type) ||
          (a.mouseenter(function (b) {
            var c = a.find(".active-revslide"),
              d = a.offset().top,
              e = a.offset().left,
              f = b.pageX - e,
              g = b.pageY - d;
            c.data("enterx", f), c.data("entery", g);
          }),
          a.on(
            "mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath",
            function (b, c) {
              var d = c && c.li ? c.li : a.find(".active-revslide");
              if ("enterpoint" == f.origo) {
                var g = a.offset().top,
                  h = a.offset().left;
                void 0 == d.data("enterx") && d.data("enterx", b.pageX - h),
                  void 0 == d.data("entery") && d.data("entery", b.pageY - g);
                var i = d.data("enterx") || b.pageX - h,
                  j = d.data("entery") || b.pageY - g,
                  k = i - (b.pageX - h),
                  l = j - (b.pageY - g),
                  m = f.speed / 1e3 || 0.4;
              } else
                var g = a.offset().top,
                  h = a.offset().left,
                  k = e.conw / 2 - (b.pageX - h),
                  l = e.conh / 2 - (b.pageY - g),
                  m = f.speed / 1e3 || 3;
              "mouseleave" == b.type &&
                ((k = f.ddd_lasth || 0), (l = f.ddd_lastv || 0), (m = 1.5));
              for (var n = 0; n < f.pcontainers.length; n++) {
                var o = f.pcontainers[n],
                  p = f.pcontainer_depths[n],
                  q = "3D" == f.type || "3d" == f.type ? p / 200 : p / 100,
                  r = k * q,
                  s = l * q;
                "scroll+mouse" == f.type || "mouse+scroll" == f.type
                  ? punchgs.TweenLite.to(o, m, {
                      force3D: "auto",
                      x: r,
                      ease: punchgs.Power3.easeOut,
                      overwrite: "all",
                    })
                  : punchgs.TweenLite.to(o, m, {
                      force3D: "auto",
                      x: r,
                      y: s,
                      ease: punchgs.Power3.easeOut,
                      overwrite: "all",
                    });
              }
              if ("3D" == f.type || "3d" == f.type) {
                var t =
                  ".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer";
                "carousel" === e.sliderType &&
                  (t =
                    ".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"),
                  e.c.find(t).each(function () {
                    var a = jQuery(this),
                      c = f.levels[f.levels.length - 1] / 200,
                      d = k * c,
                      g = l * c,
                      h =
                        0 == e.conw
                          ? 0
                          : Math.round((k / e.conw) * c * 100) || 0,
                      i =
                        0 == e.conh
                          ? 0
                          : Math.round((l / e.conh) * c * 100) || 0,
                      j = a.closest("li"),
                      n = 0,
                      o = !1;
                    a.hasClass("dddwrapper-layer") &&
                      ((n = f.ddd_z_correction || 65), (o = !0)),
                      a.hasClass("dddwrapper-layer") && ((d = 0), (g = 0)),
                      j.hasClass("active-revslide") ||
                      "carousel" != e.sliderType
                        ? "on" != f.ddd_bgfreeze || o
                          ? punchgs.TweenLite.to(a, m, {
                              rotationX: i,
                              rotationY: -h,
                              x: d,
                              z: n,
                              y: g,
                              ease: punchgs.Power3.easeOut,
                              overwrite: "all",
                            })
                          : punchgs.TweenLite.to(a, 0.5, {
                              force3D: "auto",
                              rotationY: 0,
                              rotationX: 0,
                              z: 0,
                              ease: punchgs.Power3.easeOut,
                              overwrite: "all",
                            })
                        : punchgs.TweenLite.to(a, 0.5, {
                            force3D: "auto",
                            rotationY: 0,
                            x: 0,
                            y: 0,
                            rotationX: 0,
                            z: 0,
                            ease: punchgs.Power3.easeOut,
                            overwrite: "all",
                          }),
                      "mouseleave" == b.type &&
                        punchgs.TweenLite.to(jQuery(this), 3.8, {
                          z: 0,
                          ease: punchgs.Power3.easeOut,
                        });
                  });
              }
            }
          ),
          c &&
            (window.ondeviceorientation = function (b) {
              var c = Math.round(b.beta || 0) - 70,
                d = Math.round(b.gamma || 0),
                g = a.find(".active-revslide");
              if (jQuery(window).width() > jQuery(window).height()) {
                var h = d;
                (d = c), (c = h);
              }
              var i = a.width(),
                j = a.height(),
                k = (360 / i) * d,
                l = (180 / j) * c,
                m = f.speed / 1e3 || 3,
                n = [];
              if (
                (g.find(".tp-parallax-container").each(function (a) {
                  n.push(jQuery(this));
                }),
                a
                  .find(".tp-static-layers .tp-parallax-container")
                  .each(function () {
                    n.push(jQuery(this));
                  }),
                jQuery.each(n, function () {
                  var a = jQuery(this),
                    b = parseInt(a.data("parallaxlevel"), 0),
                    c = b / 100,
                    d = k * c * 2,
                    e = l * c * 4;
                  punchgs.TweenLite.to(a, m, {
                    force3D: "auto",
                    x: d,
                    y: e,
                    ease: punchgs.Power3.easeOut,
                    overwrite: "all",
                  });
                }),
                "3D" == f.type || "3d" == f.type)
              ) {
                var o =
                  ".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer";
                "carousel" === e.sliderType &&
                  (o =
                    ".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"),
                  e.c.find(o).each(function () {
                    var a = jQuery(this),
                      c = f.levels[f.levels.length - 1] / 200,
                      d = k * c,
                      g = l * c * 3,
                      h =
                        0 == e.conw
                          ? 0
                          : Math.round((k / e.conw) * c * 500) || 0,
                      i =
                        0 == e.conh
                          ? 0
                          : Math.round((l / e.conh) * c * 700) || 0,
                      j = a.closest("li"),
                      n = 0,
                      o = !1;
                    a.hasClass("dddwrapper-layer") &&
                      ((n = f.ddd_z_correction || 65), (o = !0)),
                      a.hasClass("dddwrapper-layer") && ((d = 0), (g = 0)),
                      j.hasClass("active-revslide") ||
                      "carousel" != e.sliderType
                        ? "on" != f.ddd_bgfreeze || o
                          ? punchgs.TweenLite.to(a, m, {
                              rotationX: i,
                              rotationY: -h,
                              x: d,
                              z: n,
                              y: g,
                              ease: punchgs.Power3.easeOut,
                              overwrite: "all",
                            })
                          : punchgs.TweenLite.to(a, 0.5, {
                              force3D: "auto",
                              rotationY: 0,
                              rotationX: 0,
                              z: 0,
                              ease: punchgs.Power3.easeOut,
                              overwrite: "all",
                            })
                        : punchgs.TweenLite.to(a, 0.5, {
                            force3D: "auto",
                            rotationY: 0,
                            z: 0,
                            x: 0,
                            y: 0,
                            rotationX: 0,
                            ease: punchgs.Power3.easeOut,
                            overwrite: "all",
                          }),
                      "mouseleave" == b.type &&
                        punchgs.TweenLite.to(jQuery(this), 3.8, {
                          z: 0,
                          ease: punchgs.Power3.easeOut,
                        });
                  });
              }
            }));
        var i = e.scrolleffect;
        if (((i.bgs = new Array()), i.on)) {
          if ("on" === i.on_slidebg)
            for (var h = 0; h < e.allslotholder.length; h++)
              i.bgs.push(e.allslotholder[h]);
          (i.multiplicator_layers = parseFloat(i.multiplicator_layers)),
            (i.multiplicator = parseFloat(i.multiplicator));
        }
        void 0 !== i.layers && 0 === i.layers.length && (i.layers = !1),
          void 0 !== i.bgs && 0 === i.bgs.length && (i.bgs = !1),
          b.scrollTicker(e, a);
      }
    },
    scrollTicker: function (a, d) {
      1 != a.scrollTicker &&
        ((a.scrollTicker = !0),
        c
          ? (punchgs.TweenLite.ticker.fps(150),
            punchgs.TweenLite.ticker.addEventListener(
              "tick",
              function () {
                b.scrollHandling(a);
              },
              d,
              !1,
              1
            ))
          : document.addEventListener(
              "scroll",
              function (c) {
                b.scrollHandling(a, !0);
              },
              { passive: !0 }
            )),
        b.scrollHandling(a, !0);
    },
    scrollHandling: function (a, d, f) {
      if (
        ((a.lastwindowheight = a.lastwindowheight || window.innerHeight),
        (a.conh =
          0 === a.conh || void 0 === a.conh
            ? a.infullscreenmode
              ? a.minHeight
              : a.c.height()
            : a.conh),
        a.lastscrolltop == window.scrollY && !a.duringslidechange && !d)
      )
        return !1;
      punchgs.TweenLite.delayedCall(0.2, e, [a, window.scrollY]);
      var g = a.c[0].getBoundingClientRect(),
        h = a.viewPort,
        i = a.parallax,
        j =
          g.top < 0 || g.height > a.lastwindowheight
            ? g.top / g.height
            : g.bottom > a.lastwindowheight
            ? (g.bottom - a.lastwindowheight) / g.height
            : 0;
      if (
        ((a.scrollproc = j),
        b.callBackHandling && b.callBackHandling(a, "parallax", "start"),
        h.enable)
      ) {
        var k = 1 - Math.abs(j);
        (k = k < 0 ? 0 : k),
          jQuery.isNumeric(h.visible_area) ||
            (-1 !== h.visible_area.indexOf("%") &&
              (h.visible_area = parseInt(h.visible_area) / 100)),
          1 - h.visible_area <= k
            ? a.inviewport || ((a.inviewport = !0), b.enterInViewPort(a))
            : a.inviewport && ((a.inviewport = !1), b.leaveViewPort(a));
      }
      if (c && "on" == i.disable_onmobile) return !1;
      if ("3d" != i.type && "3D" != i.type) {
        if (
          ("scroll" == i.type ||
            "scroll+mouse" == i.type ||
            "mouse+scroll" == i.type) &&
          i.pcontainers
        )
          for (var l = 0; l < i.pcontainers.length; l++)
            if (i.pcontainers[l].length > 0) {
              var m = i.pcontainers[l],
                n = i.pcontainer_depths[l] / 100,
                o = Math.round(j * (-n * a.conh) * 10) / 10 || 0,
                p = void 0 !== f ? f : i.speedls / 1e3 || 0;
              m.data("parallaxoffset", o),
                punchgs.TweenLite.to(m, p, {
                  overwrite: "auto",
                  force3D: "auto",
                  y: o,
                });
            }
        if (i.bgcontainers)
          for (var l = 0; l < i.bgcontainers.length; l++) {
            var q = i.bgcontainers[l],
              r = i.bgcontainer_depths[l],
              o = j * (-r * a.conh) || 0,
              p = void 0 !== f ? f : i.speedbg / 1e3 || 0;
            punchgs.TweenLite.to(q, p, {
              position: "absolute",
              top: "0px",
              left: "0px",
              backfaceVisibility: "hidden",
              force3D: "true",
              y: o + "px",
            });
          }
      }
      var s = a.scrolleffect;
      if (s.on && ("on" !== s.disable_on_mobile || !c)) {
        var t = Math.abs(j) - s.tilt / 100;
        if (((t = t < 0 ? 0 : t), !1 !== s.layers)) {
          var u = 1 - t * s.multiplicator_layers,
            v = {
              backfaceVisibility: "hidden",
              force3D: "true",
              z: 0.001,
              perspective: 600,
            };
          if (
            ("top" == s.direction && j >= 0 && (u = 1),
            "bottom" == s.direction && j <= 0 && (u = 1),
            (u = u > 1 ? 1 : u < 0 ? 0 : u),
            "on" === s.fade && (v.opacity = u),
            "on" === s.scale)
          ) {
            var w = u;
            v.scale = 1 - w + 1;
          }
          if ("on" === s.blur) {
            var x = (1 - u) * s.maxblur;
            (v["-webkit-filter"] = "blur(" + x + "px)"),
              (v.filter = "blur(" + x + "px)");
          }
          if ("on" === s.grayscale) {
            var y = 100 * (1 - u),
              z = "grayscale(" + y + "%)";
            (v["-webkit-filter"] =
              void 0 === v["-webkit-filter"]
                ? z
                : v["-webkit-filter"] + " " + z),
              (v.filter = void 0 === v.filter ? z : v.filter + " " + z);
          }
          punchgs.TweenLite.set(s.layers, v);
        }
        if (!1 !== s.bgs) {
          var u = 1 - t * s.multiplicator,
            v = { backfaceVisibility: "hidden", force3D: "true" };
          if (
            ("top" == s.direction && j >= 0 && (u = 1),
            "bottom" == s.direction && j <= 0 && (u = 1),
            (u = u > 1 ? 1 : u < 0 ? 0 : u),
            "on" === s.fade && (v.opacity = u),
            "on" === s.scale)
          ) {
            var w = u;
            punchgs.TweenLite.set(jQuery(".tp-kbimg-wrap"), {
              transformOrigin: "50% 50%",
              scale: w,
              force3D: !0,
            });
          }
          if ("on" === s.blur) {
            var x = (1 - u) * s.maxblur;
            (v["-webkit-filter"] = "blur(" + x + "px)"),
              (v.filter = "blur(" + x + "px)");
          }
          if ("on" === s.grayscale) {
            var y = 100 * (1 - u),
              z = "grayscale(" + y + "%)";
            (v["-webkit-filter"] =
              void 0 === v["-webkit-filter"]
                ? z
                : v["-webkit-filter"] + " " + z),
              (v.filter = void 0 === v.filter ? z : v.filter + " " + z);
          }
          punchgs.TweenLite.set(s.bgs, v);
        }
      }
      b.callBackHandling && b.callBackHandling(a, "parallax", "end");
    },
  });
})(jQuery);

/************************************************
 * REVOLUTION 5.4.6.5 EXTENSION - SLIDE ANIMATIONS
 * @version: 1.8 (17.05.2017)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 ************************************************/
!(function (t) {
  "use strict";
  var L = jQuery.fn.revolution,
    l = {
      alias: "SlideAnimations Min JS",
      name: "revolution.extensions.slideanims.min.js",
      min_core: "5.4.5",
      version: "1.8",
    };
  jQuery.extend(!0, L, {
    animateSlide: function (t, e, o, a, i, n, r, s) {
      return "stop" === L.compare_version(l).check
        ? s
        : d(t, e, o, a, i, n, r, s);
    },
  });
  var ct = function (t, e, o, a) {
    var i = t,
      n = i.find(".defaultimg"),
      r = n.data("mediafilter"),
      s = i.data("zoomstart"),
      l = i.data("rotationstart");
    null != n.data("currotate") && (l = n.data("currotate")),
      null != n.data("curscale") && "box" == a
        ? (s = 100 * n.data("curscale"))
        : null != n.data("curscale") && (s = n.data("curscale")),
      L.slotSize(n, e);
    var d = n.attr("src"),
      h = n.data("bgcolor"),
      f = e.width,
      c = e.height,
      u = n.data("fxof");
    void 0 === h && (h = n.css("backgroundColor")),
      "on" == e.autoHeight && (c = e.c.height()),
      null == u && (u = 0);
    var p = 0,
      g = n.data("bgfit"),
      w = n.data("bgrepeat"),
      m = n.data("bgposition");
    null == g && (g = "cover"),
      null == w && (w = "no-repeat"),
      null == m && (m = "center center");
    var v = "";
    switch (
      ((v =
        void 0 !== h && 0 <= h.indexOf("gradient")
          ? "background:" + h
          : "background-color:" +
            h +
            ";background-image:url(" +
            d +
            ");background-repeat:" +
            w +
            ";background-size:" +
            g +
            ";background-position:" +
            m),
      a)
    ) {
      case "box":
        for (var y = 0, x = 0, T = 0; T < e.slots; T++) {
          for (var z = (x = 0); z < e.slots; z++)
            i.append(
              '<div class="slot" style="position:absolute;top:' +
                (0 + x) +
                "px;left:" +
                (u + y) +
                "px;width:" +
                e.slotw +
                "px;height:" +
                e.sloth +
                'px;overflow:hidden;"><div class="slotslide ' +
                r +
                '" data-x="' +
                y +
                '" data-y="' +
                x +
                '" style="position:absolute;top:0px;left:0px;width:' +
                e.slotw +
                "px;height:" +
                e.sloth +
                'px;overflow:hidden;"><div style="position:absolute;top:' +
                (0 - x) +
                "px;left:" +
                (0 - y) +
                "px;width:" +
                f +
                "px;height:" +
                c +
                "px;" +
                v +
                ';"></div></div></div>'
            ),
              (x += e.sloth),
              null != s &&
                null != l &&
                punchgs.TweenLite.set(i.find(".slot").last(), { rotationZ: l });
          y += e.slotw;
        }
        break;
      case "vertical":
      case "horizontal":
        if ("horizontal" == a) {
          if (!o) p = 0 - e.slotw;
          for (z = 0; z < e.slots; z++)
            i.append(
              '<div class="slot" style="position:absolute;top:0px;left:' +
                (u + z * e.slotw) +
                "px;overflow:hidden;width:" +
                (e.slotw + 0.3) +
                "px;height:" +
                c +
                'px"><div class="slotslide ' +
                r +
                '" style="position:absolute;top:0px;left:' +
                p +
                "px;width:" +
                (e.slotw + 0.6) +
                "px;height:" +
                c +
                'px;overflow:hidden;"><div style="position:absolute;top:0px;left:' +
                (0 - z * e.slotw) +
                "px;width:" +
                f +
                "px;height:" +
                c +
                "px;" +
                v +
                ';"></div></div></div>'
            ),
              null != s &&
                null != l &&
                punchgs.TweenLite.set(i.find(".slot").last(), { rotationZ: l });
        } else {
          if (!o) p = 0 - e.sloth;
          for (z = 0; z < e.slots + 2; z++)
            i.append(
              '<div class="slot" style="position:absolute;top:' +
                (0 + z * e.sloth) +
                "px;left:" +
                u +
                "px;overflow:hidden;width:" +
                f +
                "px;height:" +
                e.sloth +
                'px"><div class="slotslide ' +
                r +
                '" style="position:absolute;top:' +
                p +
                "px;left:0px;width:" +
                f +
                "px;height:" +
                e.sloth +
                'px;overflow:hidden;"><div style="position:absolute;top:' +
                (0 - z * e.sloth) +
                "px;left:0px;width:" +
                f +
                "px;height:" +
                c +
                "px;" +
                v +
                ';"></div></div></div>'
            ),
              null != s &&
                null != l &&
                punchgs.TweenLite.set(i.find(".slot").last(), { rotationZ: l });
        }
    }
  };
  var ut = function (t, e) {
      return null == e || jQuery.isNumeric(t)
        ? t
        : null == t
        ? t
        : t.split(",")[e];
    },
    d = function (a, t, e, o, i, n, r, s) {
      var l = e[0].opt,
        d = i.index(),
        h = o.index() < d ? 1 : 0;
      "arrow" == l.sc_indicator && (h = l.sc_indicator_dir);
      var f = (function (t, o, e, a) {
          var i = t[0].opt,
            n = punchgs.Power1.easeIn,
            r = punchgs.Power1.easeOut,
            s = punchgs.Power1.easeInOut,
            l = punchgs.Power2.easeIn,
            d = punchgs.Power2.easeOut,
            h = punchgs.Power2.easeInOut,
            f = (punchgs.Power3.easeIn, punchgs.Power3.easeOut),
            c = punchgs.Power3.easeInOut,
            u = [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 28, 29, 30,
              31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
            ],
            p = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27],
            g = 0,
            w = 1,
            m = 0,
            v = 0,
            y =
              (new Array(),
              [
                ["boxslide", 0, 1, 10, 0, "box", !1, null, 0, r, r, 500, 6],
                ["boxfade", 1, 0, 10, 0, "box", !1, null, 1, s, s, 700, 5],
                [
                  "slotslide-horizontal",
                  2,
                  0,
                  0,
                  200,
                  "horizontal",
                  !0,
                  !1,
                  2,
                  h,
                  h,
                  700,
                  3,
                ],
                [
                  "slotslide-vertical",
                  3,
                  0,
                  0,
                  200,
                  "vertical",
                  !0,
                  !1,
                  3,
                  h,
                  h,
                  700,
                  3,
                ],
                [
                  "curtain-1",
                  4,
                  3,
                  0,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  4,
                  r,
                  r,
                  300,
                  5,
                ],
                [
                  "curtain-2",
                  5,
                  3,
                  0,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  5,
                  r,
                  r,
                  300,
                  5,
                ],
                [
                  "curtain-3",
                  6,
                  3,
                  25,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  6,
                  r,
                  r,
                  300,
                  5,
                ],
                [
                  "slotzoom-horizontal",
                  7,
                  0,
                  0,
                  400,
                  "horizontal",
                  !0,
                  !0,
                  7,
                  r,
                  r,
                  300,
                  7,
                ],
                [
                  "slotzoom-vertical",
                  8,
                  0,
                  0,
                  0,
                  "vertical",
                  !0,
                  !0,
                  8,
                  d,
                  d,
                  500,
                  8,
                ],
                [
                  "slotfade-horizontal",
                  9,
                  0,
                  0,
                  1e3,
                  "horizontal",
                  !0,
                  null,
                  9,
                  d,
                  d,
                  2e3,
                  10,
                ],
                [
                  "slotfade-vertical",
                  10,
                  0,
                  0,
                  1e3,
                  "vertical",
                  !0,
                  null,
                  10,
                  d,
                  d,
                  2e3,
                  10,
                ],
                [
                  "fade",
                  11,
                  0,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "crossfade",
                  11,
                  1,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadethroughdark",
                  11,
                  2,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadethroughlight",
                  11,
                  3,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadethroughtransparent",
                  11,
                  4,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "slideleft",
                  12,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  12,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideup",
                  13,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  13,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slidedown",
                  14,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  14,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideright",
                  15,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  15,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideoverleft",
                  12,
                  7,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  12,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideoverup",
                  13,
                  7,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  13,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideoverdown",
                  14,
                  7,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  14,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideoverright",
                  15,
                  7,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  15,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideremoveleft",
                  12,
                  8,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  12,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideremoveup",
                  13,
                  8,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  13,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideremovedown",
                  14,
                  8,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  14,
                  c,
                  c,
                  1e3,
                  1,
                ],
                [
                  "slideremoveright",
                  15,
                  8,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  15,
                  c,
                  c,
                  1e3,
                  1,
                ],
                ["papercut", 16, 0, 0, 600, "", null, null, 16, c, c, 1e3, 2],
                [
                  "3dcurtain-horizontal",
                  17,
                  0,
                  20,
                  100,
                  "vertical",
                  !1,
                  !0,
                  17,
                  s,
                  s,
                  500,
                  7,
                ],
                [
                  "3dcurtain-vertical",
                  18,
                  0,
                  10,
                  100,
                  "horizontal",
                  !1,
                  !0,
                  18,
                  s,
                  s,
                  500,
                  5,
                ],
                [
                  "cubic",
                  19,
                  0,
                  20,
                  600,
                  "horizontal",
                  !1,
                  !0,
                  19,
                  c,
                  c,
                  500,
                  1,
                ],
                [
                  "cube",
                  19,
                  0,
                  20,
                  600,
                  "horizontal",
                  !1,
                  !0,
                  20,
                  c,
                  c,
                  500,
                  1,
                ],
                ["flyin", 20, 0, 4, 600, "vertical", !1, !0, 21, f, c, 500, 1],
                [
                  "turnoff",
                  21,
                  0,
                  1,
                  500,
                  "horizontal",
                  !1,
                  !0,
                  22,
                  c,
                  c,
                  500,
                  1,
                ],
                [
                  "incube",
                  22,
                  0,
                  20,
                  200,
                  "horizontal",
                  !1,
                  !0,
                  23,
                  h,
                  h,
                  500,
                  1,
                ],
                [
                  "cubic-horizontal",
                  23,
                  0,
                  20,
                  500,
                  "vertical",
                  !1,
                  !0,
                  24,
                  d,
                  d,
                  500,
                  1,
                ],
                [
                  "cube-horizontal",
                  23,
                  0,
                  20,
                  500,
                  "vertical",
                  !1,
                  !0,
                  25,
                  d,
                  d,
                  500,
                  1,
                ],
                [
                  "incube-horizontal",
                  24,
                  0,
                  20,
                  500,
                  "vertical",
                  !1,
                  !0,
                  26,
                  h,
                  h,
                  500,
                  1,
                ],
                [
                  "turnoff-vertical",
                  25,
                  0,
                  1,
                  200,
                  "horizontal",
                  !1,
                  !0,
                  27,
                  h,
                  h,
                  500,
                  1,
                ],
                [
                  "fadefromright",
                  12,
                  1,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  28,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadefromleft",
                  15,
                  1,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  29,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadefromtop",
                  14,
                  1,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  30,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadefrombottom",
                  13,
                  1,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  31,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadetoleftfadefromright",
                  12,
                  2,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  32,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadetorightfadefromleft",
                  15,
                  2,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  33,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadetobottomfadefromtop",
                  14,
                  2,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  34,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "fadetotopfadefrombottom",
                  13,
                  2,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  35,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "parallaxtoright",
                  15,
                  3,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  36,
                  h,
                  l,
                  1500,
                  1,
                ],
                [
                  "parallaxtoleft",
                  12,
                  3,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  37,
                  h,
                  l,
                  1500,
                  1,
                ],
                [
                  "parallaxtotop",
                  14,
                  3,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  38,
                  h,
                  n,
                  1500,
                  1,
                ],
                [
                  "parallaxtobottom",
                  13,
                  3,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  39,
                  h,
                  n,
                  1500,
                  1,
                ],
                [
                  "scaledownfromright",
                  12,
                  4,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  40,
                  h,
                  l,
                  1e3,
                  1,
                ],
                [
                  "scaledownfromleft",
                  15,
                  4,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  41,
                  h,
                  l,
                  1e3,
                  1,
                ],
                [
                  "scaledownfromtop",
                  14,
                  4,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  42,
                  h,
                  l,
                  1e3,
                  1,
                ],
                [
                  "scaledownfrombottom",
                  13,
                  4,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  43,
                  h,
                  l,
                  1e3,
                  1,
                ],
                [
                  "zoomout",
                  13,
                  5,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  44,
                  h,
                  l,
                  1e3,
                  1,
                ],
                ["zoomin", 13, 6, 1, 0, "horizontal", !0, !0, 45, h, l, 1e3, 1],
                [
                  "slidingoverlayup",
                  27,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  47,
                  s,
                  r,
                  2e3,
                  1,
                ],
                [
                  "slidingoverlaydown",
                  28,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  48,
                  s,
                  r,
                  2e3,
                  1,
                ],
                [
                  "slidingoverlayright",
                  30,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  49,
                  s,
                  r,
                  2e3,
                  1,
                ],
                [
                  "slidingoverlayleft",
                  29,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  50,
                  s,
                  r,
                  2e3,
                  1,
                ],
                [
                  "parallaxcirclesup",
                  31,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  51,
                  h,
                  n,
                  1500,
                  1,
                ],
                [
                  "parallaxcirclesdown",
                  32,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  52,
                  h,
                  n,
                  1500,
                  1,
                ],
                [
                  "parallaxcirclesright",
                  33,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  53,
                  h,
                  n,
                  1500,
                  1,
                ],
                [
                  "parallaxcirclesleft",
                  34,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  54,
                  h,
                  n,
                  1500,
                  1,
                ],
                [
                  "notransition",
                  26,
                  0,
                  1,
                  0,
                  "horizontal",
                  !0,
                  null,
                  46,
                  h,
                  l,
                  1e3,
                  1,
                ],
                [
                  "parallaxright",
                  15,
                  3,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  55,
                  h,
                  l,
                  1500,
                  1,
                ],
                [
                  "parallaxleft",
                  12,
                  3,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  56,
                  h,
                  l,
                  1500,
                  1,
                ],
                [
                  "parallaxup",
                  14,
                  3,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  57,
                  h,
                  n,
                  1500,
                  1,
                ],
                [
                  "parallaxdown",
                  13,
                  3,
                  1,
                  0,
                  "horizontal",
                  !0,
                  !0,
                  58,
                  h,
                  n,
                  1500,
                  1,
                ],
                [
                  "grayscale",
                  11,
                  5,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "grayscalecross",
                  11,
                  6,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "brightness",
                  11,
                  7,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "brightnesscross",
                  11,
                  8,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "blurlight",
                  11,
                  9,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "blurlightcross",
                  11,
                  10,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "blurstrong",
                  11,
                  9,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
                [
                  "blurstrongcross",
                  11,
                  10,
                  1,
                  300,
                  "horizontal",
                  !0,
                  null,
                  11,
                  h,
                  h,
                  1e3,
                  1,
                ],
              ]);
          (i.duringslidechange = !0),
            (i.testanims = !1),
            1 == i.testanims &&
              ((i.nexttesttransform =
                void 0 === i.nexttesttransform ? 34 : i.nexttesttransform + 1),
              (i.nexttesttransform =
                70 < i.nexttesttransform ? 0 : i.nexttesttransform),
              (o = y[i.nexttesttransform][0]),
              console.log(
                o +
                  "  " +
                  i.nexttesttransform +
                  "  " +
                  y[i.nexttesttransform][1] +
                  "  " +
                  y[i.nexttesttransform][2]
              )),
            jQuery.each(
              [
                "parallaxcircles",
                "slidingoverlay",
                "slide",
                "slideover",
                "slideremove",
                "parallax",
                "parralaxto",
              ],
              function (t, e) {
                o == e + "horizontal" &&
                  (o = 1 != a ? e + "left" : e + "right"),
                  o == e + "vertical" && (o = 1 != a ? e + "up" : e + "down");
              }
            ),
            "random" == o &&
              ((o = Math.round(Math.random() * y.length - 1)),
              y.length - 1 < o && (o = y.length - 1)),
            "random-static" == o &&
              ((o = Math.round(Math.random() * u.length - 1)),
              u.length - 1 < o && (o = u.length - 1),
              (o = u[o])),
            "random-premium" == o &&
              ((o = Math.round(Math.random() * p.length - 1)),
              p.length - 1 < o && (o = p.length - 1),
              (o = p[o]));
          if (
            1 == i.isJoomla &&
            null != window.MooTools &&
            -1 !=
              [
                12, 13, 14, 15, 16, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
                39, 40, 41, 42, 43, 44, 45,
              ].indexOf(o)
          ) {
            var x = Math.round(Math.random() * (p.length - 2)) + 1;
            p.length - 1 < x && (x = p.length - 1),
              0 == x && (x = 1),
              (o = p[x]);
          }
          jQuery.each(y, function (t, e) {
            (e[0] != o && e[8] != o) || ((g = e[1]), (w = e[2]), (m = v)),
              (v += 1);
          }),
            30 < g && (g = 30),
            g < 0 && (g = 0);
          var T = new Object();
          return (T.nexttrans = g), (T.STA = y[m]), (T.specials = w), T;
        })(e, t, 0, h),
        c = f.STA,
        u = f.specials;
      a = f.nexttrans;
      "on" == n.data("kenburns") && (a = 11);
      var p = o.data("nexttransid") || 0,
        g = ut(o.data("masterspeed"), p);
      (g =
        (g =
          "default" === g
            ? c[11]
            : "random" === g
            ? Math.round(1e3 * Math.random() + 300)
            : null != g
            ? parseInt(g, 0)
            : c[11]) > l.delay
          ? l.delay
          : g),
        (g += c[4]),
        (l.slots = ut(o.data("slotamount"), p)),
        (l.slots =
          null == l.slots || "default" == l.slots
            ? c[12]
            : "random" == l.slots
            ? Math.round(12 * Math.random() + 4)
            : l.slots),
        (l.slots =
          l.slots < 1
            ? "boxslide" == t
              ? Math.round(6 * Math.random() + 3)
              : "flyin" == t
              ? Math.round(4 * Math.random() + 1)
              : l.slots
            : l.slots),
        (l.slots = (4 == a || 5 == a || 6 == a) && l.slots < 3 ? 3 : l.slots),
        (l.slots = 0 != c[3] ? Math.min(l.slots, c[3]) : l.slots),
        (l.slots =
          9 == a ? l.width / l.slots : 10 == a ? l.height / l.slots : l.slots),
        (l.rotate = ut(o.data("rotate"), p)),
        (l.rotate =
          null == l.rotate || "default" == l.rotate
            ? 0
            : 999 == l.rotate || "random" == l.rotate
            ? Math.round(360 * Math.random())
            : l.rotate),
        (l.rotate = l.ie || l.ie9 ? 0 : l.rotate),
        11 != a &&
          (null != c[7] && ct(r, l, c[7], c[5]),
          null != c[6] && ct(n, l, c[6], c[5])),
        s.add(
          punchgs.TweenLite.set(n.find(".defaultvid"), {
            y: 0,
            x: 0,
            top: 0,
            left: 0,
            scale: 1,
          }),
          0
        ),
        s.add(
          punchgs.TweenLite.set(r.find(".defaultvid"), {
            y: 0,
            x: 0,
            top: 0,
            left: 0,
            scale: 1,
          }),
          0
        ),
        s.add(
          punchgs.TweenLite.set(n.find(".defaultvid"), { y: "+0%", x: "+0%" }),
          0
        ),
        s.add(
          punchgs.TweenLite.set(r.find(".defaultvid"), { y: "+0%", x: "+0%" }),
          0
        ),
        s.add(
          punchgs.TweenLite.set(n, { autoAlpha: 1, y: "+0%", x: "+0%" }),
          0
        ),
        s.add(
          punchgs.TweenLite.set(r, { autoAlpha: 1, y: "+0%", x: "+0%" }),
          0
        ),
        s.add(
          punchgs.TweenLite.set(n.parent(), { backgroundColor: "transparent" }),
          0
        ),
        s.add(
          punchgs.TweenLite.set(r.parent(), { backgroundColor: "transparent" }),
          0
        );
      var w = ut(o.data("easein"), p),
        m = ut(o.data("easeout"), p);
      if (
        ((w =
          "default" === w
            ? c[9] || punchgs.Power2.easeInOut
            : w || c[9] || punchgs.Power2.easeInOut),
        (m =
          "default" === m
            ? c[10] || punchgs.Power2.easeInOut
            : m || c[10] || punchgs.Power2.easeInOut),
        0 == a)
      ) {
        var v = Math.ceil(l.height / l.sloth),
          y = 0;
        n.find(".slotslide").each(function (t) {
          var e = jQuery(this);
          (y += 1) == v && (y = 0),
            s.add(
              punchgs.TweenLite.from(e, g / 600, {
                opacity: 0,
                top: 0 - l.sloth,
                left: 0 - l.slotw,
                rotation: l.rotate,
                force3D: "auto",
                ease: w,
              }),
              (15 * t + 30 * y) / 1500
            );
        });
      }
      if (1 == a) {
        var x;
        n.find(".slotslide").each(function (t) {
          var e = jQuery(this),
            o = Math.random() * g + 300,
            a = 500 * Math.random() + 200;
          x < o + a && ((x = a + a), t),
            s.add(
              punchgs.TweenLite.from(e, o / 1e3, {
                autoAlpha: 0,
                force3D: "auto",
                rotation: l.rotate,
                ease: w,
              }),
              a / 1e3
            );
        });
      }
      if (2 == a) {
        var T = new punchgs.TimelineLite();
        r.find(".slotslide").each(function () {
          var t = jQuery(this);
          T.add(
            punchgs.TweenLite.to(t, g / 1e3, {
              left: l.slotw,
              ease: w,
              force3D: "auto",
              rotation: 0 - l.rotate,
            }),
            0
          ),
            s.add(T, 0);
        }),
          n.find(".slotslide").each(function () {
            var t = jQuery(this);
            T.add(
              punchgs.TweenLite.from(t, g / 1e3, {
                left: 0 - l.slotw,
                ease: w,
                force3D: "auto",
                rotation: l.rotate,
              }),
              0
            ),
              s.add(T, 0);
          });
      }
      if (3 == a) {
        T = new punchgs.TimelineLite();
        r.find(".slotslide").each(function () {
          var t = jQuery(this);
          T.add(
            punchgs.TweenLite.to(t, g / 1e3, {
              top: l.sloth,
              ease: w,
              rotation: l.rotate,
              force3D: "auto",
              transformPerspective: 600,
            }),
            0
          ),
            s.add(T, 0);
        }),
          n.find(".slotslide").each(function () {
            var t = jQuery(this);
            T.add(
              punchgs.TweenLite.from(t, g / 1e3, {
                top: 0 - l.sloth,
                rotation: l.rotate,
                ease: m,
                force3D: "auto",
                transformPerspective: 600,
              }),
              0
            ),
              s.add(T, 0);
          });
      }
      if (4 == a || 5 == a) {
        setTimeout(function () {
          r.find(".defaultimg").css({ opacity: 0 });
        }, 100);
        var z = g / 1e3;
        T = new punchgs.TimelineLite();
        r.find(".slotslide").each(function (t) {
          var e = jQuery(this),
            o = (t * z) / l.slots;
          5 == a && (o = ((l.slots - t - 1) * z) / l.slots / 1.5),
            T.add(
              punchgs.TweenLite.to(e, 3 * z, {
                transformPerspective: 600,
                force3D: "auto",
                top: 0 + l.height,
                opacity: 0.5,
                rotation: l.rotate,
                ease: w,
                delay: o,
              }),
              0
            ),
            s.add(T, 0);
        }),
          n.find(".slotslide").each(function (t) {
            var e = jQuery(this),
              o = (t * z) / l.slots;
            5 == a && (o = ((l.slots - t - 1) * z) / l.slots / 1.5),
              T.add(
                punchgs.TweenLite.from(e, 3 * z, {
                  top: 0 - l.height,
                  opacity: 0.5,
                  rotation: l.rotate,
                  force3D: "auto",
                  ease: punchgs.eo,
                  delay: o,
                }),
                0
              ),
              s.add(T, 0);
          });
      }
      if (6 == a) {
        l.slots < 2 && (l.slots = 2), l.slots % 2 && (l.slots = l.slots + 1);
        T = new punchgs.TimelineLite();
        setTimeout(function () {
          r.find(".defaultimg").css({ opacity: 0 });
        }, 100),
          r.find(".slotslide").each(function (t) {
            var e = jQuery(this);
            if (t + 1 < l.slots / 2) var o = 90 * (t + 2);
            else o = 90 * (2 + l.slots - t);
            T.add(
              punchgs.TweenLite.to(e, (g + o) / 1e3, {
                top: 0 + l.height,
                opacity: 1,
                force3D: "auto",
                rotation: l.rotate,
                ease: w,
              }),
              0
            ),
              s.add(T, 0);
          }),
          n.find(".slotslide").each(function (t) {
            var e = jQuery(this);
            if (t + 1 < l.slots / 2) var o = 90 * (t + 2);
            else o = 90 * (2 + l.slots - t);
            T.add(
              punchgs.TweenLite.from(e, (g + o) / 1e3, {
                top: 0 - l.height,
                opacity: 1,
                force3D: "auto",
                rotation: l.rotate,
                ease: m,
              }),
              0
            ),
              s.add(T, 0);
          });
      }
      if (7 == a) {
        (g *= 2) > l.delay && (g = l.delay);
        T = new punchgs.TimelineLite();
        setTimeout(function () {
          r.find(".defaultimg").css({ opacity: 0 });
        }, 100),
          r.find(".slotslide").each(function () {
            var t = jQuery(this).find("div");
            T.add(
              punchgs.TweenLite.to(t, g / 1e3, {
                left: 0 - l.slotw / 2 + "px",
                top: 0 - l.height / 2 + "px",
                width: 2 * l.slotw + "px",
                height: 2 * l.height + "px",
                opacity: 0,
                rotation: l.rotate,
                force3D: "auto",
                ease: w,
              }),
              0
            ),
              s.add(T, 0);
          }),
          n.find(".slotslide").each(function (t) {
            var e = jQuery(this).find("div");
            T.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 1e3,
                { left: 0, top: 0, opacity: 0, transformPerspective: 600 },
                {
                  left: 0 - t * l.slotw + "px",
                  ease: m,
                  force3D: "auto",
                  top: "0px",
                  width: l.width,
                  height: l.height,
                  opacity: 1,
                  rotation: 0,
                  delay: 0.1,
                }
              ),
              0
            ),
              s.add(T, 0);
          });
      }
      if (8 == a) {
        (g *= 3) > l.delay && (g = l.delay);
        T = new punchgs.TimelineLite();
        r.find(".slotslide").each(function () {
          var t = jQuery(this).find("div");
          T.add(
            punchgs.TweenLite.to(t, g / 1e3, {
              left: 0 - l.width / 2 + "px",
              top: 0 - l.sloth / 2 + "px",
              width: 2 * l.width + "px",
              height: 2 * l.sloth + "px",
              force3D: "auto",
              ease: w,
              opacity: 0,
              rotation: l.rotate,
            }),
            0
          ),
            s.add(T, 0);
        }),
          n.find(".slotslide").each(function (t) {
            var e = jQuery(this).find("div");
            T.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 1e3,
                { left: 0, top: 0, opacity: 0, force3D: "auto" },
                {
                  left: "0px",
                  top: 0 - t * l.sloth + "px",
                  width: n.find(".defaultimg").data("neww") + "px",
                  height: n.find(".defaultimg").data("newh") + "px",
                  opacity: 1,
                  ease: m,
                  rotation: 0,
                }
              ),
              0
            ),
              s.add(T, 0);
          });
      }
      if (9 == a || 10 == a) {
        n.find(".slotslide").each(function (t) {
          var e = jQuery(this);
          0,
            s.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 2e3,
                { autoAlpha: 0, force3D: "auto", transformPerspective: 600 },
                { autoAlpha: 1, ease: w, delay: (t * l.slots) / 100 / 2e3 }
              ),
              0
            );
        });
      }
      if (27 == a || 28 == a || 29 == a || 30 == a) {
        var L = n.find(".slot"),
          b = 27 == a || 29 == a ? "-100%" : "+100%",
          A = 27 == a || 29 == a ? "+100%" : "-100%",
          D = 27 == a || 29 == a ? "-80%" : "80%",
          j = 27 == a || 29 == a ? "+80%" : "-80%",
          Q = 27 == a || 29 == a ? "+10%" : "-10%",
          M = { overwrite: "all" },
          P = { autoAlpha: 0, zIndex: 1, force3D: "auto", ease: w },
          k = {
            position: "inherit",
            autoAlpha: 0,
            overwrite: "all",
            zIndex: 1,
          },
          O = { autoAlpha: 1, force3D: "auto", ease: m },
          I = { overwrite: "all", zIndex: 2, opacity: 1, autoAlpha: 1 },
          X = { autoAlpha: 1, force3D: "auto", overwrite: "all", ease: w },
          Y = { overwrite: "all", zIndex: 2, autoAlpha: 1 },
          S = { autoAlpha: 1, force3D: "auto", ease: w },
          _ = 1 == (27 == a || 28 == a ? 1 : 2) ? "y" : "x";
        (M[_] = "0px"),
          (P[_] = b),
          (k[_] = Q),
          (O[_] = "0%"),
          (I[_] = A),
          (X[_] = b),
          (Y[_] = D),
          (S[_] = j),
          L.append(
            '<span style="background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:absolute;top:0px;left:0px;display:block;z-index:2"></span>'
          ),
          s.add(punchgs.TweenLite.fromTo(r, g / 1e3, M, P), 0),
          s.add(
            punchgs.TweenLite.fromTo(n.find(".defaultimg"), g / 2e3, k, O),
            g / 2e3
          ),
          s.add(punchgs.TweenLite.fromTo(L, g / 1e3, I, X), 0),
          s.add(
            punchgs.TweenLite.fromTo(L.find(".slotslide div"), g / 1e3, Y, S),
            0
          );
      }
      if (31 == a || 32 == a || 33 == a || 34 == a) {
        (g = 6e3), (w = punchgs.Power3.easeInOut);
        var C = g / 1e3;
        (mas = C - C / 5),
          (_nt = a),
          (fy = 31 == _nt ? "+100%" : 32 == _nt ? "-100%" : "0%"),
          (fx = 33 == _nt ? "+100%" : 34 == _nt ? "-100%" : "0%"),
          (ty = 31 == _nt ? "-100%" : 32 == _nt ? "+100%" : "0%"),
          (tx = 33 == _nt ? "-100%" : 34 == _nt ? "+100%" : "0%"),
          s.add(
            punchgs.TweenLite.fromTo(
              r,
              C - 0.2 * C,
              { y: 0, x: 0 },
              { y: ty, x: tx, ease: m }
            ),
            0.2 * C
          ),
          s.add(
            punchgs.TweenLite.fromTo(
              n,
              C,
              { y: fy, x: fx },
              { y: "0%", x: "0%", ease: w }
            ),
            0
          ),
          n.find(".slot").remove(),
          n.find(".defaultimg").clone().appendTo(n).addClass("slot"),
          (function (t, f, c, e, u) {
            var o = t.find(".slot"),
              p = [2, 1.2, 0.9, 0.7, 0.55, 0.42],
              g = t.width(),
              w = t.height();
            o.wrap(
              '<div class="slot-circle-wrapper" style="overflow:hidden;position:absolute;border:1px solid #fff"></div>'
            );
            for (var a = 0; a < 6; a++) o.parent().clone(!1).appendTo(nextsh);
            t.find(".slot-circle-wrapper").each(function (t) {
              if (t < 6) {
                var e = jQuery(this),
                  o = e.find(".slot"),
                  a = w < g ? p[t] * g : p[t] * w,
                  i = a / 2 - g / 2 + 0,
                  n = a / 2 - w / 2 + 0,
                  r = {
                    scale: 1,
                    transformOrigo: "50% 50%",
                    width: a + "px",
                    height: a + "px",
                    top: w / 2 - a / 2 + "px",
                    left:
                      (33 == c
                        ? g / 2 - a / 2
                        : 34 == c
                        ? g - a
                        : g / 2 - a / 2) + "px",
                    borderRadius: 0 != t ? "50%" : "0",
                  },
                  s = {
                    scale: 1,
                    top: w / 2 - a / 2,
                    left: g / 2 - a / 2,
                    ease: u,
                  },
                  l = {
                    width: g,
                    height: w,
                    autoAlpha: 1,
                    top: n + "px",
                    position: "absolute",
                    left: (33 == c ? i : 34 == c ? i + g / 2 : i) + "px",
                  },
                  d = { top: n + "px", left: i + "px", ease: u },
                  h = f;
                mtl.add(punchgs.TweenLite.fromTo(e, h, r, s), 0),
                  mtl.add(punchgs.TweenLite.fromTo(o, h, l, d), 0),
                  mtl.add(
                    punchgs.TweenLite.fromTo(
                      e,
                      0.001,
                      { autoAlpha: 0 },
                      { autoAlpha: 1 }
                    ),
                    0
                  );
              }
            });
          })(n, C, _nt, 0, w);
      }
      if (11 == a) {
        12 < u && (u = 0);
        var V = 2 == u ? "#000000" : 3 == u ? "#ffffff" : "transparent";
        switch (u) {
          case 0:
            s.add(
              punchgs.TweenLite.fromTo(
                n,
                g / 1e3,
                { autoAlpha: 0 },
                { autoAlpha: 1, force3D: "auto", ease: w }
              ),
              0
            );
            break;
          case 1:
            s.add(
              punchgs.TweenLite.fromTo(
                n,
                g / 1e3,
                { autoAlpha: 0 },
                { autoAlpha: 1, force3D: "auto", ease: w }
              ),
              0
            ),
              s.add(
                punchgs.TweenLite.fromTo(
                  r,
                  g / 1e3,
                  { autoAlpha: 1 },
                  { autoAlpha: 0, force3D: "auto", ease: w }
                ),
                0
              );
            break;
          case 2:
          case 3:
          case 4:
            s.add(
              punchgs.TweenLite.set(r.parent(), {
                backgroundColor: V,
                force3D: "auto",
              }),
              0
            ),
              s.add(
                punchgs.TweenLite.set(n.parent(), {
                  backgroundColor: "transparent",
                  force3D: "auto",
                }),
                0
              ),
              s.add(
                punchgs.TweenLite.to(r, g / 2e3, {
                  autoAlpha: 0,
                  force3D: "auto",
                  ease: w,
                }),
                0
              ),
              s.add(
                punchgs.TweenLite.fromTo(
                  n,
                  g / 2e3,
                  { autoAlpha: 0 },
                  { autoAlpha: 1, force3D: "auto", ease: w }
                ),
                g / 2e3
              );
            break;
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
            var Z =
                "blur(" +
                (0 <= jQuery.inArray(u, [9, 10])
                  ? 5
                  : 0 <= jQuery.inArray(u, [11, 12])
                  ? 10
                  : 0) +
                "px) grayscale(" +
                (0 <= jQuery.inArray(u, [5, 6, 7, 8]) ? 100 : 0) +
                "%) brightness(" +
                (0 <= jQuery.inArray(u, [7, 8]) ? 300 : 0) +
                "%)",
              H = "blur(0px) grayscale(0%) brightness(100%)";
            s.add(
              punchgs.TweenLite.fromTo(
                n,
                g / 1e3,
                { autoAlpha: 0, filter: Z, "-webkit-filter": Z },
                {
                  autoAlpha: 1,
                  filter: H,
                  "-webkit-filter": H,
                  force3D: "auto",
                  ease: w,
                }
              ),
              0
            ),
              0 <= jQuery.inArray(u, [6, 8, 10]) &&
                s.add(
                  punchgs.TweenLite.fromTo(
                    r,
                    g / 1e3,
                    { autoAlpha: 1, filter: H, "-webkit-filter": H },
                    {
                      autoAlpha: 0,
                      force3D: "auto",
                      ease: w,
                      filter: Z,
                      "-webkit-filter": Z,
                    }
                  ),
                  0
                );
        }
        s.add(
          punchgs.TweenLite.set(n.find(".defaultimg"), { autoAlpha: 1 }),
          0
        ),
          s.add(
            punchgs.TweenLite.set(r.find("defaultimg"), { autoAlpha: 1 }),
            0
          );
      }
      if (26 == a) {
        (g = 0),
          s.add(
            punchgs.TweenLite.fromTo(
              n,
              g / 1e3,
              { autoAlpha: 0 },
              { autoAlpha: 1, force3D: "auto", ease: w }
            ),
            0
          ),
          s.add(
            punchgs.TweenLite.to(r, g / 1e3, {
              autoAlpha: 0,
              force3D: "auto",
              ease: w,
            }),
            0
          ),
          s.add(
            punchgs.TweenLite.set(n.find(".defaultimg"), { autoAlpha: 1 }),
            0
          ),
          s.add(
            punchgs.TweenLite.set(r.find("defaultimg"), { autoAlpha: 1 }),
            0
          );
      }
      if (12 == a || 13 == a || 14 == a || 15 == a) {
        (g = g) > l.delay && (g = l.delay),
          setTimeout(function () {
            punchgs.TweenLite.set(r.find(".defaultimg"), { autoAlpha: 0 });
          }, 100);
        var J = l.width,
          N = l.height,
          R = n.find(".slotslide, .defaultvid"),
          q = 0,
          B = 0,
          E = 1,
          F = 1,
          G = 1,
          K = g / 1e3,
          U = K;
        ("fullwidth" != l.sliderLayout && "fullscreen" != l.sliderLayout) ||
          ((J = R.width()), (N = R.height())),
          12 == a
            ? (q = J)
            : 15 == a
            ? (q = 0 - J)
            : 13 == a
            ? (B = N)
            : 14 == a && (B = 0 - N),
          1 == u && (E = 0),
          2 == u && (E = 0),
          3 == u && (K = g / 1300),
          (4 != u && 5 != u) || (F = 0.6),
          6 == u && (F = 1.4),
          (5 != u && 6 != u) || ((G = 1.4), (B = q = N = J = E = 0)),
          6 == u && (G = 0.6);
        7 == u && (N = J = 0);
        var W = n.find(".slotslide"),
          $ = r.find(".slotslide, .defaultvid");
        if (
          (s.add(punchgs.TweenLite.set(i, { zIndex: 15 }), 0),
          s.add(punchgs.TweenLite.set(o, { zIndex: 20 }), 0),
          8 == u
            ? (s.add(punchgs.TweenLite.set(i, { zIndex: 20 }), 0),
              s.add(punchgs.TweenLite.set(o, { zIndex: 15 }), 0),
              s.add(
                punchgs.TweenLite.set(W, {
                  left: 0,
                  top: 0,
                  scale: 1,
                  opacity: 1,
                  rotation: 0,
                  ease: w,
                  force3D: "auto",
                }),
                0
              ))
            : s.add(
                punchgs.TweenLite.from(W, K, {
                  left: q,
                  top: B,
                  scale: G,
                  opacity: E,
                  rotation: l.rotate,
                  ease: w,
                  force3D: "auto",
                }),
                0
              ),
          (4 != u && 5 != u) || (N = J = 0),
          1 != u)
        )
          switch (a) {
            case 12:
              s.add(
                punchgs.TweenLite.to($, U, {
                  left: 0 - J + "px",
                  force3D: "auto",
                  scale: F,
                  opacity: E,
                  rotation: l.rotate,
                  ease: m,
                }),
                0
              );
              break;
            case 15:
              s.add(
                punchgs.TweenLite.to($, U, {
                  left: J + "px",
                  force3D: "auto",
                  scale: F,
                  opacity: E,
                  rotation: l.rotate,
                  ease: m,
                }),
                0
              );
              break;
            case 13:
              s.add(
                punchgs.TweenLite.to($, U, {
                  top: 0 - N + "px",
                  force3D: "auto",
                  scale: F,
                  opacity: E,
                  rotation: l.rotate,
                  ease: m,
                }),
                0
              );
              break;
            case 14:
              s.add(
                punchgs.TweenLite.to($, U, {
                  top: N + "px",
                  force3D: "auto",
                  scale: F,
                  opacity: E,
                  rotation: l.rotate,
                  ease: m,
                }),
                0
              );
          }
      }
      if (16 == a) {
        T = new punchgs.TimelineLite();
        s.add(
          punchgs.TweenLite.set(i, { position: "absolute", "z-index": 20 }),
          0
        ),
          s.add(
            punchgs.TweenLite.set(o, { position: "absolute", "z-index": 15 }),
            0
          ),
          i.wrapInner(
            '<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>'
          ),
          i.find(".tp-half-one").clone(!0).appendTo(i).addClass("tp-half-two"),
          i.find(".tp-half-two").removeClass("tp-half-one");
        (J = l.width), (N = l.height);
        "on" == l.autoHeight && (N = e.height()),
          i
            .find(".tp-half-one .defaultimg")
            .wrap(
              '<div class="tp-papercut" style="width:' +
                J +
                "px;height:" +
                N +
                'px;"></div>'
            ),
          i
            .find(".tp-half-two .defaultimg")
            .wrap(
              '<div class="tp-papercut" style="width:' +
                J +
                "px;height:" +
                N +
                'px;"></div>'
            ),
          i
            .find(".tp-half-two .defaultimg")
            .css({ position: "absolute", top: "-50%" }),
          i
            .find(".tp-half-two .tp-caption")
            .wrapAll(
              '<div style="position:absolute;top:-50%;left:0px;"></div>'
            ),
          s.add(
            punchgs.TweenLite.set(i.find(".tp-half-two"), {
              width: J,
              height: N,
              overflow: "hidden",
              zIndex: 15,
              position: "absolute",
              top: N / 2,
              left: "0px",
              transformPerspective: 600,
              transformOrigin: "center bottom",
            }),
            0
          ),
          s.add(
            punchgs.TweenLite.set(i.find(".tp-half-one"), {
              width: J,
              height: N / 2,
              overflow: "visible",
              zIndex: 10,
              position: "absolute",
              top: "0px",
              left: "0px",
              transformPerspective: 600,
              transformOrigin: "center top",
            }),
            0
          );
        i.find(".defaultimg");
        var tt = Math.round(20 * Math.random() - 10),
          et = Math.round(20 * Math.random() - 10),
          ot = Math.round(20 * Math.random() - 10),
          at = 0.4 * Math.random() - 0.2,
          it = 0.4 * Math.random() - 0.2,
          nt = 1 * Math.random() + 1,
          rt = 1 * Math.random() + 1,
          st = 0.3 * Math.random() + 0.3;
        s.add(
          punchgs.TweenLite.set(i.find(".tp-half-one"), { overflow: "hidden" }),
          0
        ),
          s.add(
            punchgs.TweenLite.fromTo(
              i.find(".tp-half-one"),
              g / 800,
              {
                width: J,
                height: N / 2,
                position: "absolute",
                top: "0px",
                left: "0px",
                force3D: "auto",
                transformOrigin: "center top",
              },
              {
                scale: nt,
                rotation: tt,
                y: 0 - N - N / 4,
                autoAlpha: 0,
                ease: w,
              }
            ),
            0
          ),
          s.add(
            punchgs.TweenLite.fromTo(
              i.find(".tp-half-two"),
              g / 800,
              {
                width: J,
                height: N,
                overflow: "hidden",
                position: "absolute",
                top: N / 2,
                left: "0px",
                force3D: "auto",
                transformOrigin: "center bottom",
              },
              {
                scale: rt,
                rotation: et,
                y: N + N / 4,
                ease: w,
                autoAlpha: 0,
                onComplete: function () {
                  punchgs.TweenLite.set(i, {
                    position: "absolute",
                    "z-index": 15,
                  }),
                    punchgs.TweenLite.set(o, {
                      position: "absolute",
                      "z-index": 20,
                    }),
                    0 < i.find(".tp-half-one").length &&
                      (i.find(".tp-half-one .defaultimg").unwrap(),
                      i.find(".tp-half-one .slotholder").unwrap()),
                    i.find(".tp-half-two").remove();
                },
              }
            ),
            0
          ),
          T.add(
            punchgs.TweenLite.set(n.find(".defaultimg"), { autoAlpha: 1 }),
            0
          ),
          null != i.html() &&
            s.add(
              punchgs.TweenLite.fromTo(
                o,
                (g - 200) / 1e3,
                {
                  scale: st,
                  x: (l.width / 4) * at,
                  y: (N / 4) * it,
                  rotation: ot,
                  force3D: "auto",
                  transformOrigin: "center center",
                  ease: m,
                },
                { autoAlpha: 1, scale: 1, x: 0, y: 0, rotation: 0 }
              ),
              0
            ),
          s.add(T, 0);
      }
      if (
        (17 == a &&
          n.find(".slotslide").each(function (t) {
            var e = jQuery(this);
            s.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 800,
                {
                  opacity: 0,
                  rotationY: 0,
                  scale: 0.9,
                  rotationX: -110,
                  force3D: "auto",
                  transformPerspective: 600,
                  transformOrigin: "center center",
                },
                {
                  opacity: 1,
                  top: 0,
                  left: 0,
                  scale: 1,
                  rotation: 0,
                  rotationX: 0,
                  force3D: "auto",
                  rotationY: 0,
                  ease: w,
                  delay: 0.06 * t,
                }
              ),
              0
            );
          }),
        18 == a &&
          n.find(".slotslide").each(function (t) {
            var e = jQuery(this);
            s.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 500,
                {
                  autoAlpha: 0,
                  rotationY: 110,
                  scale: 0.9,
                  rotationX: 10,
                  force3D: "auto",
                  transformPerspective: 600,
                  transformOrigin: "center center",
                },
                {
                  autoAlpha: 1,
                  top: 0,
                  left: 0,
                  scale: 1,
                  rotation: 0,
                  rotationX: 0,
                  force3D: "auto",
                  rotationY: 0,
                  ease: w,
                  delay: 0.06 * t,
                }
              ),
              0
            );
          }),
        19 == a || 22 == a)
      ) {
        T = new punchgs.TimelineLite();
        s.add(punchgs.TweenLite.set(i, { zIndex: 20 }), 0),
          s.add(punchgs.TweenLite.set(o, { zIndex: 20 }), 0),
          setTimeout(function () {
            r.find(".defaultimg").css({ opacity: 0 });
          }, 100);
        var lt = 90,
          dt = ((E = 1), "center center ");
        1 == h && (lt = -90),
          19 == a
            ? ((dt = dt + "-" + l.height / 2), (E = 0))
            : (dt += l.height / 2),
          punchgs.TweenLite.set(e, {
            transformStyle: "flat",
            backfaceVisibility: "hidden",
            transformPerspective: 600,
          }),
          n.find(".slotslide").each(function (t) {
            var e = jQuery(this);
            T.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 1e3,
                {
                  transformStyle: "flat",
                  backfaceVisibility: "hidden",
                  left: 0,
                  rotationY: l.rotate,
                  z: 10,
                  top: 0,
                  scale: 1,
                  force3D: "auto",
                  transformPerspective: 600,
                  transformOrigin: dt,
                  rotationX: lt,
                },
                {
                  left: 0,
                  rotationY: 0,
                  top: 0,
                  z: 0,
                  scale: 1,
                  force3D: "auto",
                  rotationX: 0,
                  delay: (50 * t) / 1e3,
                  ease: w,
                }
              ),
              0
            ),
              T.add(
                punchgs.TweenLite.to(e, 0.1, {
                  autoAlpha: 1,
                  delay: (50 * t) / 1e3,
                }),
                0
              ),
              s.add(T);
          }),
          r.find(".slotslide").each(function (t) {
            var e = jQuery(this),
              o = -90;
            1 == h && (o = 90),
              T.add(
                punchgs.TweenLite.fromTo(
                  e,
                  g / 1e3,
                  {
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    autoAlpha: 1,
                    rotationY: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: dt,
                    rotationX: 0,
                  },
                  {
                    autoAlpha: 1,
                    rotationY: l.rotate,
                    top: 0,
                    z: 10,
                    scale: 1,
                    rotationX: o,
                    delay: (50 * t) / 1e3,
                    force3D: "auto",
                    ease: m,
                  }
                ),
                0
              ),
              s.add(T);
          }),
          s.add(punchgs.TweenLite.set(i, { zIndex: 18 }), 0);
      }
      if (20 == a) {
        if (
          (setTimeout(function () {
            r.find(".defaultimg").css({ opacity: 0 });
          }, 100),
          1 == h)
        ) {
          var ht = -l.width;
          (lt = 80), (dt = "20% 70% -" + l.height / 2);
        } else (ht = l.width), (lt = -80), (dt = "80% 70% -" + l.height / 2);
        n.find(".slotslide").each(function (t) {
          var e = jQuery(this),
            o = (50 * t) / 1e3;
          s.add(
            punchgs.TweenLite.fromTo(
              e,
              g / 1e3,
              {
                left: ht,
                rotationX: 40,
                z: -600,
                opacity: E,
                top: 0,
                scale: 1,
                force3D: "auto",
                transformPerspective: 600,
                transformOrigin: dt,
                transformStyle: "flat",
                rotationY: lt,
              },
              {
                left: 0,
                rotationX: 0,
                opacity: 1,
                top: 0,
                z: 0,
                scale: 1,
                rotationY: 0,
                delay: o,
                ease: w,
              }
            ),
            0
          );
        }),
          r.find(".slotslide").each(function (t) {
            var e = jQuery(this),
              o = (50 * t) / 1e3;
            if (((o = 0 < t ? o + g / 9e3 : 0), 1 != h))
              var a = -l.width / 2,
                i = 30,
                n = "20% 70% -" + l.height / 2;
            else (a = l.width / 2), (i = -30), (n = "80% 70% -" + l.height / 2);
            (m = punchgs.Power2.easeInOut),
              s.add(
                punchgs.TweenLite.fromTo(
                  e,
                  g / 1e3,
                  {
                    opacity: 1,
                    rotationX: 0,
                    top: 0,
                    z: 0,
                    scale: 1,
                    left: 0,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: n,
                    transformStyle: "flat",
                    rotationY: 0,
                  },
                  {
                    opacity: 1,
                    rotationX: 20,
                    top: 0,
                    z: -600,
                    left: a,
                    force3D: "auto",
                    rotationY: i,
                    delay: o,
                    ease: m,
                  }
                ),
                0
              );
          });
      }
      if (21 == a || 25 == a) {
        setTimeout(function () {
          r.find(".defaultimg").css({ opacity: 0 });
        }, 100);
        (lt = 90), (ht = -l.width);
        var ft = -lt;
        if (1 == h)
          if (25 == a) {
            dt = "center top 0";
            lt = l.rotate;
          } else {
            dt = "left center 0";
            ft = l.rotate;
          }
        else if (((ht = l.width), (lt = -90), 25 == a)) {
          dt = "center bottom 0";
          (ft = -lt), (lt = l.rotate);
        } else {
          dt = "right center 0";
          ft = l.rotate;
        }
        n.find(".slotslide").each(function (t) {
          var e = jQuery(this),
            o = g / 1.5 / 3;
          s.add(
            punchgs.TweenLite.fromTo(
              e,
              (2 * o) / 1e3,
              {
                left: 0,
                transformStyle: "flat",
                rotationX: ft,
                z: 0,
                autoAlpha: 0,
                top: 0,
                scale: 1,
                force3D: "auto",
                transformPerspective: 1200,
                transformOrigin: dt,
                rotationY: lt,
              },
              {
                left: 0,
                rotationX: 0,
                top: 0,
                z: 0,
                autoAlpha: 1,
                scale: 1,
                rotationY: 0,
                force3D: "auto",
                delay: o / 1e3,
                ease: w,
              }
            ),
            0
          );
        }),
          1 != h
            ? ((ht = -l.width),
              (lt = 90),
              25 == a
                ? ((dt = "center top 0"), (ft = -lt), (lt = l.rotate))
                : ((dt = "left center 0"), (ft = l.rotate)))
            : ((ht = l.width),
              (lt = -90),
              25 == a
                ? ((dt = "center bottom 0"), (ft = -lt), (lt = l.rotate))
                : ((dt = "right center 0"), (ft = l.rotate))),
          r.find(".slotslide").each(function (t) {
            var e = jQuery(this);
            s.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 1e3,
                {
                  left: 0,
                  transformStyle: "flat",
                  rotationX: 0,
                  z: 0,
                  autoAlpha: 1,
                  top: 0,
                  scale: 1,
                  force3D: "auto",
                  transformPerspective: 1200,
                  transformOrigin: dt,
                  rotationY: 0,
                },
                {
                  left: 0,
                  rotationX: ft,
                  top: 0,
                  z: 0,
                  autoAlpha: 1,
                  force3D: "auto",
                  scale: 1,
                  rotationY: lt,
                  ease: m,
                }
              ),
              0
            );
          });
      }
      if (23 == a || 24 == a) {
        setTimeout(function () {
          r.find(".defaultimg").css({ opacity: 0 });
        }, 100);
        (lt = -90), (E = 1);
        if ((1 == h && (lt = 90), 23 == a)) {
          dt = "center center -" + l.width / 2;
          E = 0;
        } else dt = "center center " + l.width / 2;
        punchgs.TweenLite.set(e, {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          perspective: 2500,
        }),
          n.find(".slotslide").each(function (t) {
            var e = jQuery(this);
            s.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 1e3,
                {
                  left: 0,
                  rotationX: l.rotate,
                  force3D: "auto",
                  opacity: E,
                  top: 0,
                  scale: 1,
                  transformPerspective: 1200,
                  transformOrigin: dt,
                  rotationY: lt,
                },
                {
                  left: 0,
                  rotationX: 0,
                  autoAlpha: 1,
                  top: 0,
                  z: 0,
                  scale: 1,
                  rotationY: 0,
                  delay: (50 * t) / 500,
                  ease: w,
                }
              ),
              0
            );
          }),
          (lt = 90),
          1 == h && (lt = -90),
          r.find(".slotslide").each(function (t) {
            var e = jQuery(this);
            s.add(
              punchgs.TweenLite.fromTo(
                e,
                g / 1e3,
                {
                  left: 0,
                  rotationX: 0,
                  top: 0,
                  z: 0,
                  scale: 1,
                  force3D: "auto",
                  transformStyle: "flat",
                  transformPerspective: 1200,
                  transformOrigin: dt,
                  rotationY: 0,
                },
                {
                  left: 0,
                  rotationX: l.rotate,
                  top: 0,
                  scale: 1,
                  rotationY: lt,
                  delay: (50 * t) / 500,
                  ease: m,
                }
              ),
              0
            ),
              23 == a &&
                s.add(
                  punchgs.TweenLite.fromTo(
                    e,
                    g / 2e3,
                    { autoAlpha: 1 },
                    { autoAlpha: 0, delay: (50 * t) / 500 + g / 3e3, ease: m }
                  ),
                  0
                );
          });
      }
      return s;
    };
})(jQuery);

/********************************************
 * REVOLUTION 5.4.6.5 EXTENSION - VIDEO FUNCTIONS
 * @version: 2.2.2 (04.06.2018)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
!(function (e) {
  "use strict";
  var I = jQuery.fn.revolution,
    _ = I.is_mobile(),
    S =
      (I.is_android(),
      {
        alias: "Video Min JS",
        name: "revolution.extensions.video.min.js",
        min_core: "5.4.8",
        version: "2.2.2",
      });
  function j(e) {
    return null == e
      ? -1
      : jQuery.isNumeric(e)
      ? e
      : 1 < e.split(":").length
      ? 60 * parseInt(e.split(":")[0], 0) + parseInt(e.split(":")[1], 0)
      : e;
  }
  jQuery.extend(!0, I, {
    preLoadAudio: function (e, a) {
      if ("stop" === I.compare_version(S).check) return !1;
      e.find(".tp-audiolayer").each(function () {
        var e = jQuery(this),
          t = {};
        0 === e.find("audio").length &&
          ((t.src = null != e.data("videomp4") ? e.data("videomp4") : ""),
          (t.pre = e.data("videopreload") || ""),
          void 0 === e.attr("id") &&
            e.attr("audio-layer-" + Math.round(199999 * Math.random())),
          (t.id = e.attr("id")),
          (t.status = "prepared"),
          (t.start = jQuery.now()),
          (t.waittime = 1e3 * e.data("videopreloadwait") || 5e3),
          ("auto" != t.pre &&
            "canplaythrough" != t.pre &&
            "canplay" != t.pre &&
            "progress" != t.pre) ||
            (void 0 === a.audioqueue && (a.audioqueue = []),
            a.audioqueue.push(t),
            I.manageVideoLayer(e, a)));
      });
    },
    preLoadAudioDone: function (a, e, i) {
      e.audioqueue &&
        0 < e.audioqueue.length &&
        jQuery.each(e.audioqueue, function (e, t) {
          a.data("videomp4") !== t.src ||
            (t.pre !== i && "auto" !== t.pre) ||
            (t.status = "loaded");
        });
    },
    resetVideo: function (e, t, a, i) {
      var o = e.data();
      switch (o.videotype) {
        case "youtube":
          o.player;
          try {
            if ("on" == o.forcerewind) {
              var d = -1 == (l = j(e.data("videostartat"))),
                n = 1 === o.bgvideo || 0 < e.find(".tp-videoposter").length;
              null != o.player &&
                ((l = -1 == l ? 0 : l),
                o.player.seekTo(l),
                o.player.pauseVideo());
            }
          } catch (e) {}
          0 == e.find(".tp-videoposter").length &&
            1 !== o.bgvideo &&
            !0 !== a &&
            punchgs.TweenLite.to(e.find("iframe"), 0.3, {
              autoAlpha: 1,
              display: "block",
              ease: punchgs.Power3.easeInOut,
            });
          break;
        case "vimeo":
          var r = e.data("vimeoplayer");
          try {
            if ("on" == o.forcerewind) {
              var l = j(o.videostartat);
              (d = -1 == l),
                (n = 1 === o.bgvideo || 0 < e.find(".tp-videoposter").length);
              ((0 !== (l = -1 == l ? 0 : l) && !d) || n) &&
                r.pause().then(function () {
                  r.setCurrentTime(l);
                });
            }
          } catch (e) {}
          0 == e.find(".tp-videoposter").length &&
            1 !== o.bgvideo &&
            !0 !== a &&
            punchgs.TweenLite.to(e.find("iframe"), 0.3, {
              autoAlpha: 1,
              display: "block",
              ease: punchgs.Power3.easeInOut,
            });
          break;
        case "html5":
          if (_ && 1 == o.disablevideoonmobile) return !1;
          var s = "html5" == o.audio ? "audio" : "video",
            u = e.find(s),
            p = u[0];
          if (
            (punchgs.TweenLite.to(u, 0.3, {
              autoAlpha: 1,
              display: "block",
              ease: punchgs.Power3.easeInOut,
            }),
            "on" == o.forcerewind && !e.hasClass("videoisplaying"))
          )
            try {
              l = j(o.videostartat);
              p.currentTime = -1 == l ? 0 : l;
            } catch (e) {}
          ("mute" == o.volume ||
            I.lastToggleState(e.videomutetoggledby) ||
            !0 === t.globalmute) &&
            (p.muted = !0);
      }
    },
    isVideoMuted: function (e, t) {
      var a = !1,
        i = e.data();
      switch (i.videotype) {
        case "youtube":
          try {
            a = i.player.isMuted();
          } catch (e) {}
          break;
        case "vimeo":
          try {
            "mute" == i.volume && (a = !0);
          } catch (e) {}
          break;
        case "html5":
          var o = "html5" == i.audio ? "audio" : "video";
          e.find(o)[0].muted && (a = !0);
      }
      return a;
    },
    muteVideo: function (e, t) {
      var a = e.data();
      switch (a.videotype) {
        case "youtube":
          try {
            a.player.mute();
          } catch (e) {}
          break;
        case "vimeo":
          try {
            var i = e.data("vimeoplayer");
            e.data("volume", "mute"), i.setVolume(0);
          } catch (e) {}
          break;
        case "html5":
          var o = "html5" == a.audio ? "audio" : "video";
          e.find(o)[0].muted = !0;
      }
    },
    unMuteVideo: function (e, t) {
      if (!0 !== t.globalmute) {
        var a = e.data();
        switch (a.videotype) {
          case "youtube":
            try {
              a.player.unMute();
            } catch (e) {}
            break;
          case "vimeo":
            try {
              var i = e.data("vimeoplayer");
              e.data("volume", "1"), i.setVolume(1);
            } catch (e) {}
            break;
          case "html5":
            var o = "html5" == a.audio ? "audio" : "video";
            e.find(o)[0].muted = !1;
        }
      }
    },
    stopVideo: function (e, t) {
      var a = e.data();
      switch (
        (t.leaveViewPortBasedStop || (t.lastplayedvideos = []),
        (t.leaveViewPortBasedStop = !1),
        a.videotype)
      ) {
        case "youtube":
          try {
            var i = a.player;
            if (2 === i.getPlayerState() || 5 === i.getPlayerState()) return;
            i.pauseVideo(),
              (a.youtubepausecalled = !0),
              setTimeout(function () {
                a.youtubepausecalled = !1;
              }, 80);
          } catch (e) {
            console.log("Issue at YouTube Video Pause:"), console.log(e);
          }
          break;
        case "vimeo":
          try {
            e.data("vimeoplayer").pause(),
              (a.vimeopausecalled = !0),
              setTimeout(function () {
                a.vimeopausecalled = !1;
              }, 80);
          } catch (e) {
            console.log("Issue at Vimeo Video Pause:"), console.log(e);
          }
          break;
        case "html5":
          var o = "html5" == a.audio ? "audio" : "video",
            d = e.find(o),
            n = d[0];
          null != d && null != n && n.pause();
      }
    },
    playVideo: function (a, i) {
      clearTimeout(a.data("videoplaywait"));
      var e = a.data();
      switch (e.videotype) {
        case "youtube":
          if (0 == a.find("iframe").length)
            a.append(a.data("videomarkup")), O(a, i, !0);
          else if (null != e.player.playVideo) {
            var t = j(a.data("videostartat")),
              o = e.player.getCurrentTime();
            1 == a.data("nextslideatend-triggered") &&
              ((o = -1), a.data("nextslideatend-triggered", 0)),
              -1 != t && o < t && e.player.seekTo(t),
              !0 !== e.youtubepausecalled && e.player.playVideo();
          } else
            a.data(
              "videoplaywait",
              setTimeout(function () {
                !0 !== e.youtubepausecalled && I.playVideo(a, i);
              }, 50)
            );
          break;
        case "vimeo":
          if (0 == a.find("iframe").length)
            a.removeData("vimeoplayer"),
              a.append(a.data("videomarkup")),
              O(a, i, !0);
          else if (a.hasClass("rs-apiready")) {
            var d,
              n = a.find("iframe").attr("id");
            a.data("vimeoplayer")
              ? (d = a.data("vimeoplayer"))
              : ((d = new Vimeo.Player(n)), a.data("vimeoplayer", d)),
              d.getPaused()
                ? setTimeout(function () {
                    var e = j(a.data("videostartat")),
                      t = a.data("currenttime");
                    t || (t = 0),
                      1 == a.data("nextslideatend-triggered") &&
                        ((t = -1), a.data("nextslideatend-triggered", 0)),
                      -1 != e && t < e && d.setCurrentTime(e),
                      d.play();
                  }, 510)
                : a.data(
                    "videoplaywait",
                    setTimeout(function () {
                      !0 !== e.vimeopausecalled && I.playVideo(a, i);
                    }, 50)
                  );
          } else
            a.data(
              "videoplaywait",
              setTimeout(function () {
                !0 !== e.vimeopausecalled && I.playVideo(a, i);
              }, 50)
            );
          break;
        case "html5":
          var r = "html5" == e.audio ? "audio" : "video",
            l = a.find(r),
            s = l[0];
          if (1 != l.parent().data("metaloaded"))
            A(
              s,
              "loadedmetadata",
              (function (e) {
                I.resetVideo(e, i), s.play();
                var t = j(e.data("videostartat")),
                  a = s.currentTime;
                1 == e.data("nextslideatend-triggered") &&
                  ((a = -1), e.data("nextslideatend-triggered", 0)),
                  -1 != t && a < t && (s.currentTime = t);
              })(a)
            );
          else {
            s.play();
            (t = j(a.data("videostartat"))), (o = s.currentTime);
            1 == a.data("nextslideatend-triggered") &&
              ((o = -1), a.data("nextslideatend-triggered", 0)),
              -1 != t && o < t && (s.currentTime = t);
          }
      }
    },
    isVideoPlaying: function (a, e) {
      var i = !1;
      return (
        null != e.playingvideos &&
          jQuery.each(e.playingvideos, function (e, t) {
            a.attr("id") == t.attr("id") && (i = !0);
          }),
        i
      );
    },
    removeMediaFromList: function (e, t) {
      V(e, t);
    },
    prepareCoveredVideo: function (e, t) {
      if (
        (!t.hasClass("tp-caption") || t.hasClass("coverscreenvideo")) &&
        (void 0 === t.data("vimeoid") || void 0 !== t.data("vimeoplayerloaded"))
      ) {
        var a = {};
        (a.ifr = t.find("iframe, video")),
          (a.asp = t.data("aspectratio")),
          (a.wa = a.asp.split(":")[0]),
          (a.ha = a.asp.split(":")[1]),
          (a.vd = a.wa / a.ha);
        var i =
          "carousel" !== e.sliderType
            ? e.conw
            : t.closest(".tp-revslider-slidesli").width();
        if (0 === i || 0 === e.conh)
          return (
            I.setSize(e),
            clearTimeout(a.ifr.data("resizelistener")),
            void a.ifr.data(
              "resizelistener",
              setTimeout(function () {
                I.prepareCoveredVideo(e, t);
              }, 100)
            )
          );
        var o = i / e.conh,
          d = (o / a.vd) * 100,
          n = (a.vd / o) * 100;
        o > a.vd
          ? punchgs.TweenLite.set(a.ifr, {
              height: d + "%",
              width: "100%",
              top: -(d - 100) / 2 + "%",
              left: "0px",
              position: "absolute",
            })
          : punchgs.TweenLite.set(a.ifr, {
              width: n + "%",
              height: "100%",
              left: -(n - 100) / 2 + "%",
              top: "0px",
              position: "absolute",
            }),
          a.ifr.hasClass("resizelistener") ||
            (a.ifr.addClass("resizelistener"),
            jQuery(window).resize(function () {
              I.prepareCoveredVideo(e, t),
                clearTimeout(a.ifr.data("resizelistener")),
                a.ifr.data(
                  "resizelistener",
                  setTimeout(function () {
                    I.prepareCoveredVideo(e, t);
                  }, 90)
                );
            }));
      }
    },
    checkVideoApis: function (e, t, a) {
      location.protocol;
      if (
        ((null != e.data("ytid") ||
          (0 < e.find("iframe").length &&
            0 <
              e.find("iframe").attr("src").toLowerCase().indexOf("youtube"))) &&
          (t.youtubeapineeded = !0),
        (null != e.data("ytid") ||
          (0 < e.find("iframe").length &&
            0 <
              e.find("iframe").attr("src").toLowerCase().indexOf("youtube"))) &&
          0 == a.addedyt)
      ) {
        (t.youtubestarttime = jQuery.now()), (a.addedyt = 1);
        var i = document.createElement("script");
        i.src = "https://www.youtube.com/iframe_api";
        var o = document.getElementsByTagName("script")[0],
          d = !0;
        jQuery("head")
          .find("*")
          .each(function () {
            "https://www.youtube.com/iframe_api" == jQuery(this).attr("src") &&
              (d = !1);
          }),
          d && o.parentNode.insertBefore(i, o);
      }
      if (
        ((null != e.data("vimeoid") ||
          (0 < e.find("iframe").length &&
            0 < e.find("iframe").attr("src").toLowerCase().indexOf("vimeo"))) &&
          (t.vimeoapineeded = !0),
        (null != e.data("vimeoid") ||
          (0 < e.find("iframe").length &&
            0 < e.find("iframe").attr("src").toLowerCase().indexOf("vimeo"))) &&
          0 == a.addedvim)
      ) {
        (t.vimeostarttime = jQuery.now()), (a.addedvim = 1);
        var n = document.createElement("script");
        (o = document.getElementsByTagName("script")[0]), (d = !0);
        (n.src = "https://player.vimeo.com/api/player.js"),
          jQuery("head")
            .find("*")
            .each(function () {
              "https://player.vimeo.com/api/player.js" ==
                jQuery(this).attr("src") && (d = !1);
            }),
          d && o.parentNode.insertBefore(n, o);
      }
      return a;
    },
    manageVideoLayer: function (i, o, e, t) {
      if ("stop" === I.compare_version(S).check) return !1;
      var a = i.data(),
        d = a.videoattributes,
        n = a.ytid,
        r = a.vimeoid,
        l =
          "auto" === a.videopreload ||
          "canplay" === a.videopreload ||
          "canplaythrough" === a.videopreload ||
          "progress" === a.videopreload
            ? "auto"
            : a.videopreload,
        s = a.videomp4,
        u = a.videowebm,
        p = a.videoogv,
        v = a.allowfullscreenvideo,
        c = a.videocontrols,
        m = "http",
        g =
          "loop" == a.videoloop
            ? "loop"
            : "loopandnoslidestop" == a.videoloop
            ? "loop"
            : "",
        y =
          null != s || null != u
            ? "html5"
            : null != n && 1 < String(n).length
            ? "youtube"
            : null != r && 1 < String(r).length
            ? "vimeo"
            : "none",
        f = "html5" == a.audio ? "audio" : "video",
        h =
          "html5" == y && 0 == i.find(f).length
            ? "html5"
            : "youtube" == y && 0 == i.find("iframe").length
            ? "youtube"
            : "vimeo" == y && 0 == i.find("iframe").length
            ? "vimeo"
            : "none";
      switch (((g = !0 === a.nextslideatend ? "" : g), (a.videotype = y), h)) {
        case "html5":
          "controls" != c && (c = "");
          f = "video";
          "html5" == a.audio && ((f = "audio"), i.addClass("tp-audio-html5"));
          var b = "";
          "video" === f &&
            (I.is_mobile() || I.isSafari11()) &&
            ("on" === a.autoplay || "true" === a.autoplay || !0 === a.autoplay
              ? (b = "muted playsinline autoplay")
              : (1 != a.videoinline &&
                  "true" !== a.videoinline &&
                  1 !== a.videoinline) ||
                (b += " playsinline"));
          var w =
            "<" +
            f +
            " " +
            b +
            ' style="object-fit:cover;background-size:cover;visible:hidden;width:100%; height:100%" class="" ' +
            g +
            ' preload="' +
            l +
            '">';
          "auto" == l && (o.mediapreload = !0),
            "video" === f
              ? (null != u &&
                  "firefox" == I.get_browser().toLowerCase() &&
                  (w = w + '<source src="' + u + '" type="video/webm" />'),
                null != s &&
                  (w = w + '<source src="' + s + '" type="video/mp4" />'),
                null != p &&
                  (w = w + '<source src="' + p + '" type="video/ogg" />'))
              : "audio" === f &&
                (null != s &&
                  (w = w + '<source src="' + s + '" type="audio/mpeg" />'),
                null != p &&
                  (w = w + '<source src="' + p + '" type="audio/ogg" />')),
            (w = w + "</" + f + ">");
          var T = "";
          ("true" !== v && !0 !== v) ||
            (T =
              '<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div>'),
            "controls" == c &&
              (w =
                w +
                '<div class="tp-video-controls"><div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div><div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div><div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div>' +
                T +
                "</div>"),
            i.data("videomarkup", w),
            i.append(w),
            ((_ && 1 == i.data("disablevideoonmobile")) || I.isIE(8)) &&
              i.find(f).remove(),
            i.find(f).each(function (e) {
              var t,
                a = jQuery(this);
              a.parent().hasClass("html5vid") ||
                a.wrap(
                  '<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>'
                ),
                1 != a.parent().data("metaloaded") &&
                  A(
                    this,
                    "loadedmetadata",
                    (Q((t = i), o), void I.resetVideo(t, o))
                  );
            });
          break;
        case "youtube":
          (m = "https"),
            "none" == c &&
              -1 ==
                (d = d.replace("controls=1", "controls=0"))
                  .toLowerCase()
                  .indexOf("controls") &&
              (d += "&controls=0"),
            (!0 === a.videoinline ||
              "true" === a.videoinline ||
              1 === a.videoinline ||
              i.hasClass("rs-background-video-layer") ||
              "on" === i.data("autoplay")) &&
              (d += "&playsinline=1");
          var k = j(i.data("videostartat")),
            x = j(i.data("videoendat"));
          -1 != k && (d = d + "&start=" + k), -1 != x && (d = d + "&end=" + x);
          var V = d.split("origin=" + m + "://"),
            L = "";
          1 < V.length
            ? ((L = V[0] + "origin=" + m + "://"),
              self.location.href.match(/www/gi) &&
                !V[1].match(/www/gi) &&
                (L += "www."),
              (L += V[1]))
            : (L = d);
          var C = "true" === v || !0 === v ? "allowfullscreen" : "";
          i.data(
            "videomarkup",
            '<iframe type="text/html" src="' +
              m +
              "://www.youtube-nocookie.com/embed/" +
              n +
              "?" +
              L +
              '" ' +
              C +
              ' width="100%" height="100%" style="opacity:0;width:100%;height:100%"></iframe>'
          );
          break;
        case "vimeo":
          (m = "https"),
            i.data(
              "videomarkup",
              '<iframe src="' +
                m +
                "://player.vimeo.com/video/" +
                r +
                "?" +
                d +
                '" webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="100%" style="opacity:0;visibility:hidden;width:100%;height:100%"></iframe>'
            );
      }
      var P = _ && "on" == i.data("noposteronmobile");
      if (null != a.videoposter && 2 < a.videoposter.length && !P)
        0 == i.find(".tp-videoposter").length &&
          i.append(
            '<div class="tp-videoposter noSwipe" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:3;background-image:url(' +
              a.videoposter +
              '); background-size:cover;background-position:center center;"></div>'
          ),
          0 == i.find("iframe").length &&
            i.find(".tp-videoposter").click(function () {
              if ((I.playVideo(i, o), _)) {
                if (1 == i.data("disablevideoonmobile")) return !1;
                punchgs.TweenLite.to(i.find(".tp-videoposter"), 0.3, {
                  autoAlpha: 0,
                  force3D: "auto",
                  ease: punchgs.Power3.easeInOut,
                }),
                  punchgs.TweenLite.to(i.find("iframe"), 0.3, {
                    autoAlpha: 1,
                    display: "block",
                    ease: punchgs.Power3.easeInOut,
                  });
              }
            });
      else {
        if (_ && 1 == i.data("disablevideoonmobile")) return !1;
        0 != i.find("iframe").length ||
          ("youtube" != y && "vimeo" != y) ||
          (i.removeData("vimeoplayer"),
          i.append(i.data("videomarkup")),
          O(i, o, !1));
      }
      "none" != i.data("dottedoverlay") &&
        null != i.data("dottedoverlay") &&
        1 != i.find(".tp-dottedoverlay").length &&
        i.append(
          '<div class="tp-dottedoverlay ' + i.data("dottedoverlay") + '"></div>'
        ),
        i.addClass("HasListener"),
        1 == i.data("bgvideo") &&
          (i.data("ytid")
            ? punchgs.TweenLite.set(i.find("iframe"), { opacity: 0 })
            : punchgs.TweenLite.set(i.find("video, iframe"), { autoAlpha: 0 }));
    },
  });
  var A = function (e, t, a) {
      e.addEventListener
        ? e.addEventListener(t, a, { capture: !1, passive: !0 })
        : e.attachEvent(t, a, { capture: !1, passive: !0 });
    },
    b = function (e, t, a) {
      var i = {};
      return (i.video = e), (i.videotype = t), (i.settings = a), i;
    },
    w = function (e, t) {
      if (1 == t.data("bgvideo") || 1 == t.data("forcecover")) {
        1 === t.data("forcecover") &&
          t.removeClass("fullscreenvideo").addClass("coverscreenvideo");
        var a = t.data("aspectratio");
        void 0 === a &&
          a.split(":").length <= 1 &&
          t.data("aspectratio", "16:9"),
          I.prepareCoveredVideo(e, t);
      }
    },
    O = function (r, o, e) {
      var l = r.data(),
        t = r.find("iframe"),
        a = "iframe" + Math.round(1e5 * Math.random() + 1),
        d = l.videoloop,
        n = "loopandnoslidestop" != d;
      if (
        ((d = "loop" == d || "loopandnoslidestop" == d),
        w(o, r),
        t.attr("id", a),
        e && r.data("startvideonow", !0),
        1 !== r.data("videolistenerexist"))
      )
        switch (l.videotype) {
          case "youtube":
            var s = new YT.Player(a, {
              events: {
                onStateChange: function (e) {
                  var t = r.closest(".tp-simpleresponsive"),
                    a = (l.videorate, r.data("videostart"), k());
                  if (e.data == YT.PlayerState.PLAYING)
                    punchgs.TweenLite.to(r.find(".tp-videoposter"), 0.3, {
                      autoAlpha: 0,
                      force3D: "auto",
                      ease: punchgs.Power3.easeInOut,
                    }),
                      punchgs.TweenLite.to(r.find("iframe"), 0.3, {
                        autoAlpha: 1,
                        display: "block",
                        ease: punchgs.Power3.easeInOut,
                      }),
                      "mute" == r.data("volume") ||
                      I.lastToggleState(r.data("videomutetoggledby")) ||
                      !0 === o.globalmute
                        ? s.mute()
                        : (s.unMute(),
                          s.setVolume(parseInt(r.data("volume"), 0) || 75)),
                      (o.videoplaying = !0),
                      x(r, o),
                      n ? o.c.trigger("stoptimer") : (o.videoplaying = !1),
                      o.c.trigger(
                        "revolution.slide.onvideoplay",
                        b(s, "youtube", r.data())
                      ),
                      I.toggleState(l.videotoggledby);
                  else {
                    if (0 == e.data && d) {
                      var i = j(r.data("videostartat"));
                      -1 != i && s.seekTo(i),
                        s.playVideo(),
                        I.toggleState(l.videotoggledby);
                    }
                    a ||
                      (0 != e.data && 2 != e.data) ||
                      !(
                        ("on" == r.data("showcoveronpause") &&
                          0 < r.find(".tp-videoposter").length) ||
                        (1 === r.data("bgvideo") &&
                          0 < r.find(".rs-fullvideo-cover").length)
                      ) ||
                      (1 === r.data("bgvideo")
                        ? punchgs.TweenLite.to(
                            r.find(".rs-fullvideo-cover"),
                            0.1,
                            {
                              autoAlpha: 1,
                              force3D: "auto",
                              ease: punchgs.Power3.easeInOut,
                            }
                          )
                        : punchgs.TweenLite.to(r.find(".tp-videoposter"), 0.1, {
                            autoAlpha: 1,
                            force3D: "auto",
                            ease: punchgs.Power3.easeInOut,
                          }),
                      punchgs.TweenLite.to(r.find("iframe"), 0.1, {
                        autoAlpha: 0,
                        ease: punchgs.Power3.easeInOut,
                      })),
                      -1 != e.data &&
                        3 != e.data &&
                        ((o.videoplaying = !1),
                        (o.tonpause = !1),
                        V(r, o),
                        t.trigger("starttimer"),
                        o.c.trigger(
                          "revolution.slide.onvideostop",
                          b(s, "youtube", r.data())
                        ),
                        (null != o.currentLayerVideoIsPlaying &&
                          o.currentLayerVideoIsPlaying.attr("id") !=
                            r.attr("id")) ||
                          I.unToggleState(l.videotoggledby)),
                      0 == e.data && 1 == r.data("nextslideatend")
                        ? (T(),
                          r.data("nextslideatend-triggered", 1),
                          o.c.revnext(),
                          V(r, o))
                        : (V(r, o),
                          (o.videoplaying = !1),
                          t.trigger("starttimer"),
                          o.c.trigger(
                            "revolution.slide.onvideostop",
                            b(s, "youtube", r.data())
                          ),
                          (null != o.currentLayerVideoIsPlaying &&
                            o.currentLayerVideoIsPlaying.attr("id") !=
                              r.attr("id")) ||
                            I.unToggleState(l.videotoggledby));
                  }
                },
                onReady: function (e) {
                  var t,
                    a = I.is_mobile(),
                    i = r.hasClass("tp-videolayer");
                  if (a || I.isSafari11()) {
                    var o = i && "off" !== r.data("autoplay");
                    if (r.hasClass("rs-background-video-layer") || o)
                      (a && i) ||
                        ((t = !0),
                        s.setVolume(0),
                        r.data("volume", "mute"),
                        s.mute(),
                        clearTimeout(r.data("mobilevideotimr")),
                        r.data(
                          "mobilevideotimr",
                          setTimeout(function () {
                            s.playVideo();
                          }, 500)
                        ));
                  }
                  t || "mute" != r.data("volume") || (s.setVolume(0), s.mute());
                  var d = l.videorate;
                  r.data("videostart");
                  if (
                    (r.addClass("rs-apiready"),
                    null != d && e.target.setPlaybackRate(parseFloat(d)),
                    r.find(".tp-videoposter").unbind("click"),
                    r.find(".tp-videoposter").click(function () {
                      _ || s.playVideo();
                    }),
                    r.data("startvideonow"))
                  ) {
                    l.player.playVideo();
                    var n = j(r.data("videostartat"));
                    -1 != n && l.player.seekTo(n);
                  }
                  r.data("videolistenerexist", 1);
                },
              },
            });
            r.data("player", s);
            break;
          case "vimeo":
            for (
              var i, u = t.attr("src"), p = {}, v = u, c = /([^&=]+)=([^&]*)/g;
              (i = c.exec(v));

            )
              p[decodeURIComponent(i[1])] = decodeURIComponent(i[2]);
            u = (u =
              null != p.player_id
                ? u.replace(p.player_id, a)
                : u + "&player_id=" + a).replace(/&api=0|&api=1/g, "");
            var m = I.is_mobile(),
              g = r.data("autoplay"),
              y = (r.data("volume"), m || I.isSafari11());
            r.hasClass("rs-background-video-layer");
            (g = "on" === g || "true" === g || !0 === g) &&
              y &&
              ((u +=
                "?autoplay=1&autopause=0&muted=1&background=1&playsinline=1"),
              r.data({ vimeoplaysinline: !0, volume: "mute" })),
              t.attr("src", u);
            (s = r.find("iframe")[0]), jQuery("#" + a);
            if (
              (r.data("vimeoplayer")
                ? (h = r.data("vimeoplayer"))
                : ((h = new Vimeo.Player(a)), r.data("vimeoplayer", h)),
              h.on("loaded", function (e) {
                var t = {};
                h.getVideoWidth().then(function (e) {
                  (t.width = e),
                    void 0 !== t.width &&
                      void 0 !== t.height &&
                      (r.data("aspectratio", t.width + ":" + t.height),
                      r.data("vimeoplayerloaded", !0),
                      w(o, r));
                }),
                  h.getVideoHeight().then(function (e) {
                    (t.height = e),
                      void 0 !== t.width &&
                        void 0 !== t.height &&
                        (r.data("aspectratio", t.width + ":" + t.height),
                        r.data("vimeoplayerloaded", !0),
                        w(o, r));
                  });
              }),
              r.addClass("rs-apiready"),
              h.on("play", function (e) {
                r.data("nextslidecalled", 0),
                  punchgs.TweenLite.to(r.find(".tp-videoposter"), 0.3, {
                    autoAlpha: 0,
                    force3D: "auto",
                    ease: punchgs.Power3.easeInOut,
                  }),
                  punchgs.TweenLite.to(r.find("iframe"), 0.3, {
                    autoAlpha: 1,
                    display: "block",
                    ease: punchgs.Power3.easeInOut,
                  }),
                  o.c.trigger(
                    "revolution.slide.onvideoplay",
                    b(h, "vimeo", r.data())
                  ),
                  (o.videoplaying = !0),
                  x(r, o),
                  n ? o.c.trigger("stoptimer") : (o.videoplaying = !1),
                  r.data("vimeoplaysinline") ||
                    ("mute" == r.data("volume") ||
                    I.lastToggleState(r.data("videomutetoggledby")) ||
                    !0 === o.globalmute
                      ? h.setVolume(0)
                      : h.setVolume(
                          parseInt(r.data("volume"), 0) / 100 || 0.75
                        ),
                    I.toggleState(l.videotoggledby));
              }),
              h.on("timeupdate", function (e) {
                var t = j(r.data("videoendat"));
                if (
                  (r.data("currenttime", e.seconds),
                  0 != t &&
                    Math.abs(t - e.seconds) < 1 &&
                    t > e.seconds &&
                    1 != r.data("nextslidecalled"))
                )
                  if (d) {
                    h.play();
                    var a = j(r.data("videostartat"));
                    -1 != a && h.setCurrentTime(a);
                  } else
                    1 == r.data("nextslideatend") &&
                      (r.data("nextslideatend-triggered", 1),
                      r.data("nextslidecalled", 1),
                      o.c.revnext()),
                      h.pause();
              }),
              h.on("ended", function (e) {
                V(r, o),
                  (o.videoplaying = !1),
                  o.c.trigger("starttimer"),
                  o.c.trigger(
                    "revolution.slide.onvideostop",
                    b(h, "vimeo", r.data())
                  ),
                  1 == r.data("nextslideatend") &&
                    (r.data("nextslideatend-triggered", 1), o.c.revnext()),
                  (null != o.currentLayerVideoIsPlaying &&
                    o.currentLayerVideoIsPlaying.attr("id") != r.attr("id")) ||
                    I.unToggleState(l.videotoggledby);
              }),
              h.on("pause", function (e) {
                (("on" == r.data("showcoveronpause") &&
                  0 < r.find(".tp-videoposter").length) ||
                  (1 === r.data("bgvideo") &&
                    0 < r.find(".rs-fullvideo-cover").length)) &&
                  (1 === r.data("bgvideo")
                    ? punchgs.TweenLite.to(r.find(".rs-fullvideo-cover"), 0.1, {
                        autoAlpha: 1,
                        force3D: "auto",
                        ease: punchgs.Power3.easeInOut,
                      })
                    : punchgs.TweenLite.to(r.find(".tp-videoposter"), 0.1, {
                        autoAlpha: 1,
                        force3D: "auto",
                        ease: punchgs.Power3.easeInOut,
                      }),
                  punchgs.TweenLite.to(r.find("iframe"), 0.1, {
                    autoAlpha: 0,
                    ease: punchgs.Power3.easeInOut,
                  })),
                  (o.videoplaying = !1),
                  (o.tonpause = !1),
                  V(r, o),
                  o.c.trigger("starttimer"),
                  o.c.trigger(
                    "revolution.slide.onvideostop",
                    b(h, "vimeo", r.data())
                  ),
                  (null != o.currentLayerVideoIsPlaying &&
                    o.currentLayerVideoIsPlaying.attr("id") != r.attr("id")) ||
                    I.unToggleState(l.videotoggledby);
              }),
              r.find(".tp-videoposter").unbind("click"),
              r.find(".tp-videoposter").click(function () {
                if (!_) return h.play(), !1;
              }),
              r.data("startvideonow"))
            )
              h.play(),
                -1 != (f = j(r.data("videostartat"))) && h.setCurrentTime(f);
            r.data("videolistenerexist", 1);
        }
      else {
        var f = j(r.data("videostartat"));
        switch (l.videotype) {
          case "youtube":
            e && (l.player.playVideo(), -1 != f && l.player.seekTo());
            break;
          case "vimeo":
            var h;
            if (e) (h = r.data("vimeoplayer")).play(), -1 != f && h.seekTo(f);
        }
      }
    },
    T = function () {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitExitFullscreen && document.webkitExitFullscreen();
    },
    k = function () {
      try {
        if (void 0 !== window.fullScreen) return window.fullScreen;
        var e = 5;
        return (
          jQuery.browser.webkit &&
            /Apple Computer/.test(navigator.vendor) &&
            (e = 42),
          screen.width == window.innerWidth &&
            Math.abs(screen.height - window.innerHeight) < e
        );
      } catch (e) {}
    },
    Q = function (o, d, e) {
      if (_ && 1 == o.data("disablevideoonmobile")) return !1;
      var n = o.data(),
        t = "html5" == n.audio ? "audio" : "video",
        a = o.find(t),
        r = a[0],
        i = a.parent(),
        l = n.videoloop,
        s = "loopandnoslidestop" != l;
      if (
        ((l = "loop" == l || "loopandnoslidestop" == l),
        i.data("metaloaded", 1),
        1 != o.data("bgvideo") ||
          ("none" !== n.videoloop && !1 !== n.videoloop) ||
          (s = !1),
        null == a.attr("control") &&
          (0 != o.find(".tp-video-play-button").length ||
            _ ||
            o.append(
              '<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'
            ),
          o.find("video, .tp-poster, .tp-video-play-button").click(function () {
            o.hasClass("videoisplaying") ? r.pause() : r.play();
          })),
        1 == o.data("forcecover") ||
          o.hasClass("fullscreenvideo") ||
          1 == o.data("bgvideo"))
      )
        if (1 == o.data("forcecover") || 1 == o.data("bgvideo")) {
          i.addClass("fullcoveredvideo");
          var u = o.data("aspectratio");
          (void 0 !== u && 1 != u.split(":").length) ||
            o.data("aspectratio", "16:9"),
            I.prepareCoveredVideo(d, o);
        } else i.addClass("fullscreenvideo");
      var p = o.find(".tp-vid-play-pause")[0],
        v = o.find(".tp-vid-mute")[0],
        c = o.find(".tp-vid-full-screen")[0],
        m = o.find(".tp-seek-bar")[0],
        g = o.find(".tp-volume-bar")[0];
      null != p &&
        A(p, "click", function () {
          1 == r.paused ? r.play() : r.pause();
        }),
        null != v &&
          A(v, "click", function () {
            0 == r.muted
              ? ((r.muted = !0), (v.innerHTML = "Unmute"))
              : ((r.muted = !1), (v.innerHTML = "Mute"));
          }),
        null != c &&
          c &&
          A(c, "click", function () {
            r.requestFullscreen
              ? r.requestFullscreen()
              : r.mozRequestFullScreen
              ? r.mozRequestFullScreen()
              : r.webkitRequestFullscreen && r.webkitRequestFullscreen();
          }),
        null != m &&
          (A(m, "change", function () {
            var e = r.duration * (m.value / 100);
            r.currentTime = e;
          }),
          A(m, "mousedown", function () {
            o.addClass("seekbardragged"), r.pause();
          }),
          A(m, "mouseup", function () {
            o.removeClass("seekbardragged"), r.play();
          })),
        A(r, "canplaythrough", function () {
          I.preLoadAudioDone(o, d, "canplaythrough");
        }),
        A(r, "canplay", function () {
          I.preLoadAudioDone(o, d, "canplay");
        }),
        A(r, "progress", function () {
          I.preLoadAudioDone(o, d, "progress");
        }),
        A(r, "timeupdate", function () {
          var e = (100 / r.duration) * r.currentTime,
            t = j(o.data("videoendat")),
            a = r.currentTime;
          if (
            (null != m && (m.value = e),
            0 != t &&
              -1 != t &&
              Math.abs(t - a) <= 0.3 &&
              a < t &&
              1 != o.data("nextslidecalled"))
          )
            if (l) {
              r.play();
              var i = j(o.data("videostartat"));
              -1 != i && (r.currentTime = i);
            } else
              1 == o.data("nextslideatend") &&
                (o.data("nextslideatend-triggered", 1),
                o.data("nextslidecalled", 1),
                (d.just_called_nextslide_at_htmltimer = !0),
                d.c.revnext(),
                setTimeout(function () {
                  d.just_called_nextslide_at_htmltimer = !1;
                }, 1e3)),
                r.pause();
        }),
        null != g &&
          A(g, "change", function () {
            r.volume = g.value;
          }),
        A(r, "play", function () {
          o.data("nextslidecalled", 0);
          var e = o.data("volume");
          (e = null != e && "mute" != e ? parseFloat(e) / 100 : e),
            I.is_mobile() ||
              I.isSafari11() ||
              (!0 === d.globalmute ? (r.muted = !0) : (r.muted = !1),
              1 < e && (e /= 100),
              "mute" == e ? (r.muted = !0) : null != e && (r.volume = e)),
            o.addClass("videoisplaying");
          var t = "html5" == n.audio ? "audio" : "video";
          x(o, d),
            s && "audio" != t
              ? ((d.videoplaying = !0),
                d.c.trigger("stoptimer"),
                d.c.trigger("revolution.slide.onvideoplay", b(r, "html5", n)))
              : ((d.videoplaying = !1),
                "audio" != t && d.c.trigger("starttimer"),
                d.c.trigger("revolution.slide.onvideostop", b(r, "html5", n))),
            punchgs.TweenLite.to(o.find(".tp-videoposter"), 0.3, {
              autoAlpha: 0,
              force3D: "auto",
              ease: punchgs.Power3.easeInOut,
            }),
            punchgs.TweenLite.to(o.find(t), 0.3, {
              autoAlpha: 1,
              display: "block",
              ease: punchgs.Power3.easeInOut,
            });
          var a = o.find(".tp-vid-play-pause")[0],
            i = o.find(".tp-vid-mute")[0];
          null != a && (a.innerHTML = "Pause"),
            null != i && r.muted && (i.innerHTML = "Unmute"),
            I.toggleState(n.videotoggledby);
        }),
        A(r, "pause", function (e) {
          var t = "html5" == n.audio ? "audio" : "video";
          !k() &&
            0 < o.find(".tp-videoposter").length &&
            "on" == o.data("showcoveronpause") &&
            !o.hasClass("seekbardragged") &&
            (punchgs.TweenLite.to(o.find(".tp-videoposter"), 0.3, {
              autoAlpha: 1,
              force3D: "auto",
              ease: punchgs.Power3.easeInOut,
            }),
            punchgs.TweenLite.to(o.find(t), 0.3, {
              autoAlpha: 0,
              ease: punchgs.Power3.easeInOut,
            })),
            o.removeClass("videoisplaying"),
            (d.videoplaying = !1),
            V(o, d),
            "audio" != t && d.c.trigger("starttimer"),
            d.c.trigger(
              "revolution.slide.onvideostop",
              b(r, "html5", o.data())
            );
          var a = o.find(".tp-vid-play-pause")[0];
          null != a && (a.innerHTML = "Play"),
            (null != d.currentLayerVideoIsPlaying &&
              d.currentLayerVideoIsPlaying.attr("id") != o.attr("id")) ||
              I.unToggleState(n.videotoggledby);
        }),
        A(r, "ended", function () {
          T(),
            V(o, d),
            (d.videoplaying = !1),
            V(o, d),
            "audio" != t && d.c.trigger("starttimer"),
            d.c.trigger(
              "revolution.slide.onvideostop",
              b(r, "html5", o.data())
            ),
            !0 === o.data("nextslideatend") &&
              0 < r.currentTime &&
              (1 == !d.just_called_nextslide_at_htmltimer &&
                (o.data("nextslideatend-triggered", 1),
                d.c.revnext(),
                (d.just_called_nextslide_at_htmltimer = !0)),
              setTimeout(function () {
                d.just_called_nextslide_at_htmltimer = !1;
              }, 1500)),
            o.removeClass("videoisplaying");
        });
    },
    x = function (e, a) {
      null == a.playingvideos && (a.playingvideos = new Array()),
        e.data("stopallvideos") &&
          null != a.playingvideos &&
          0 < a.playingvideos.length &&
          ((a.lastplayedvideos = jQuery.extend(!0, [], a.playingvideos)),
          jQuery.each(a.playingvideos, function (e, t) {
            I.stopVideo(t, a);
          })),
        a.playingvideos.push(e),
        (a.currentLayerVideoIsPlaying = e);
    },
    V = function (e, t) {
      null != t.playingvideos &&
        0 <= jQuery.inArray(e, t.playingvideos) &&
        t.playingvideos.splice(jQuery.inArray(e, t.playingvideos), 1);
    };
})(jQuery);
