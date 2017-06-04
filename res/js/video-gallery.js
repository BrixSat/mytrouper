(function(c, e) {
    c.APYTLoader = function(f) {
        function e() {
            if (Ga.length) {
                N = Ga.shift();
                m = N.type;
                if(urlParam('playlist')==undefined){
                  var c = N.path;
                }else{
                  var c = urlParam('playlist');
                }
                Ca = [];
                Xa = 0;
                wb = 1;
                jb = N.limit ? N.limit : 200;
                Da = N.order ? N.order : "relevance";
                if ("youtube_single" == m || "youtube_single_list" == m) c = "https://www.googleapis.com/youtube/v3/videos?id=" + c + "&key=" + ga + "&part=snippet,contentDetails,statistics,status";
                else if (-1 == za.inArray(Da, pc) && (Da = "relevance"), "youtube_playlist" == m) c = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=50&playlistId=" +
                    c + "&key=" + ga + "";
                else if ("youtube_video_query" == m) c = "https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=50&order=" + Da + "&q=" + (N.query || N.path) + "&key=" + ga + "";
                else if ("youtube_user_channels" == m) c = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&maxResults=50&forUsername=" + c + "&key=" + ga + "";
                else if ("youtube_channel" == m) c = "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=" + c + "&key=" + ga + "";
                else {
                    alert("Wrong youtube type V3!");
                    return
                }
                T(c)
            } else za(R).trigger("APYTLoader.END_LOAD", [Ya])
        }

        function T(c) {
            za.ajax({
                url: c,
                dataType: "jsonp"
            }).done(function(c) {
                c.error && c.error.message && alert(c.error.message);
                var f, t = c.items.length;
                t + Xa > jb && (t = jb - Xa);
                for (f = 0; f < t; f++)
                    if (_item = c.items[f]) "youtube_playlist" == m || "youtube_single" == m || "youtube_single_list" == m ? ("private" != _item.status.privacyStatus && Ya.push(F(_item, m)), Xa++) : "youtube_video_query" == m ? (Ya.push(F(_item, m)), Xa++) : "youtube_user_channels" != m && "youtube_channel" != m || Ca.push(_item.contentDetails.relatedPlaylists.uploads);
                if ("youtube_single" == m || "youtube_single_list" == m) e();
                else if ("youtube_user_channels" != m && "youtube_channel" != m)
                    if (wb += 50, wb < jb)
                        if (wb <= c.pageInfo.totalResults && c.nextPageToken) {
                            f = N.path;
                            if ("youtube_playlist" == m) var R = "https://www.googleapis.com/youtube/v3/playlistItems?pageToken=" + c.nextPageToken + "&part=snippet,status,contentDetails&maxResults=50&playlistId=" + f + "&key=" + ga + "";
                            else "youtube_video_query" == m && (R = "https://www.googleapis.com/youtube/v3/search?pageToken=" + c.nextPageToken + "&part=id,snippet&maxResults=50&order=" +
                                Da + "&q=" + f + "&key=" + ga + "");
                            T(R)
                        } else e();
                else kb && (Ea++, Ea < Ca.length ? (wb = 0, Ha = Ca[Ea], R = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=50&playlistId=" + Ha + "&key=" + ga + "", T(R)) : (kb = !1, e())), e();
                else Ca.length ? (1 < Ca.length && (kb = !0), Ha = Ca[Ea], R = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status,contentDetails&maxResults=50&playlistId=" + Ha + "&key=" + ga + "", m = "youtube_playlist", T(R)) : e()
            }).fail(function(c, f, m) {
                alert("There was an error retrieveing youtube data: " +
                    c.responseText);
                e()
            })
        }

        function F(c, f) {
            var e = jQuery.extend(!0, {}, N);
            e.deeplink && "youtube_single" != e.type && (e.deeplink += (Xa + 1).toString());
            e.data = c;
            e.type = "youtube";
            e.origtype = f;
            "youtube_single" == f || "youtube_single_list" == f ? e.id = c.id : "youtube_playlist" == f ? e.id = c.contentDetails.videoId : "youtube_video_query" == f && (e.id = c.id.videoId);
            e.title || (e.title = c.snippet.title ? c.snippet.title : null);
            e.description || (e.description = c.snippet.description ? c.snippet.description : null);
            !e.thumb && c.snippet.thumbnails && (c.snippet.thumbnails.medium ?
                e.thumb = c.snippet.thumbnails.medium.url : c.snippet.thumbnails.standard && (e.thumb = c.snippet.thumbnails.standard.url));
            return e
        }
        var R = this,
            za = jQuery.noConflict(),
            m, N, Ga = [],
            Ya = [],
            Ca = [],
            Ea = 0,
            Ha, kb, wb, Xa, jb, Da, pc = "date rating relevance title videoCount viewCount".split(" "),
            ga = f.ytAppId;
        za.inArray(c.location.protocol, ["http:", "https:"]);
        this.setData = function(c) {
            ga && "" != ga ? (Ya = [], Ga = za.extend(!0, [], [c]), e()) : alert("Youtube API key missing! Please set API key in player settings.")
        }
    }
})(window, jQuery);
var vplp_mediaArr = [],
    audio = document.createElement("audio"),
    mp3Support, oggSupport, html5Support = !1;
audio.canPlayType && (html5Support = !0, mp3Support = !!audio.canPlayType && "" != audio.canPlayType("audio/mpeg"), oggSupport = !!audio.canPlayType && "" != audio.canPlayType('audio/ogg; codecs="vorbis"'));
var isMobile = /Android|webOS|iPhone|iPad|iPod|sony|BlackBerry/i.test(navigator.userAgent),
    isIOS = !1,
    agent = navigator.userAgent,
    isAndroid = -1 < agent.indexOf("Android"),
    isiPhoneIpod = -1 < agent.indexOf("iPhone") || -1 < agent.indexOf("iPod"),
    isiPad = -1 < agent.indexOf("iPad");
if (-1 < agent.indexOf("iPhone") || -1 < agent.indexOf("iPod") || -1 < agent.indexOf("iPad")) isIOS = !0;
var mobile_type;
if (-1 < agent.indexOf("iPhone") || -1 < agent.indexOf("iPod") || -1 < agent.indexOf("iPad")) - 1 < agent.indexOf("iPhone") ? mobile_type = "iPhone" : -1 < agent.indexOf("iPod") ? mobile_type = "iPod" : -1 < agent.indexOf("iPad") && (mobile_type = "iPad");
var isSafari = 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor"),
    isChrome = !isSafari && testCSS("WebkitTransform");
isIOS && navigator.userAgent.match("CriOS") && (isChrome = !0);
var isOpera = !(!window.opera || !window.opera.version);

function testCSS(c) {
    return c in document.documentElement.style
}
var isWindows = !1; - 1 !== agent.toLowerCase().indexOf("windows") && (isWindows = !0);
var isIE = !1,
    ieBelow9 = !1,
    ieBelow8 = !1,
    ie_check = getInternetExplorerVersion(); - 1 != ie_check && (isIE = !0, 9 > ie_check && (ieBelow9 = !0), 8 > ie_check && (ieBelow8 = !0));

function getInternetExplorerVersion() {
    var c = -1;
    if ("Microsoft Internet Explorer" == navigator.appName) {
        var e = navigator.userAgent,
            f = /MSIE ([0-9]{1,}[.0-9]{0,})/;
        null != f.exec(e) && (c = parseFloat(RegExp.$1))
    } else "Netscape" == navigator.appName && (e = navigator.userAgent, f = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/, null != f.exec(e) && (c = parseFloat(RegExp.$1)));
    return c
}
var hasLocalStorage = supports_local_storage();

function supports_local_storage() {
    try {
        return "localStorage" in window && null !== window.localStorage
    } catch (c) {
        return !1
    }
}

function injectFbSdk(c) {
    var e, f = "https:" == window.location.protocol ? "https:" : "http:";
    if (!window.FB && c && !document.body.querySelector("#fb-root")) return e = document.createElement("script"), e.text = "window.fbAsyncInit=function(){FB.init({appId:'" + c + "',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='" + f + "//connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk')",
        c = document.createElement("div"), c.id = "fb-root", document.body.appendChild(c), document.body.appendChild(e)
}
(function(c) {
    c.fn.vplp = function(e, f) {
        function t() {
            Aa.css({
                display: "block"
            });
            var b = 0;
            xb.find("li").each(function() {
                b += c(this).outerHeight(!0)
            });
            xb.height() < Hd.offset().top ? Aa.css({
                top: -b + "px",
                display: "none"
            }) : Aa.css({
                top: Hd.height() + "px",
                display: "none"
            });
            Sc = !0
        }

        function T() {
            Za.css({
                display: "block"
            });
            var b = 0;
            lb.find("li").each(function() {
                b += c(this).outerHeight(!0)
            });
            lb.height() < Id.offset().top ? Za.css({
                top: -b + "px",
                display: "none"
            }) : Za.css({
                top: Id.height() + "px",
                display: "none"
            })
        }

        function F(b) {
            var d = yb,
                c =
                qa,
                e = parseInt(c.css("left"), 10),
                c = c.width(),
                f = d.width();
            d.css("left", (c - f - 25) / c * (b.pageX - e) + 10 + "px")
        }

        function R() {
            var b, d, c, e, f = !1,
                l = qa,
                k = yb;
            k.unbind("touchstart.ap touchmove.ap touchend.ap click.ap-touchclick").bind("touchstart.ap", function(p) {
                if (!g) return !1;
                if (!zb) return !0;
                p = p.originalEvent.touches[0];
                b = k.position().left;
                k.position();
                d = p.pageX;
                c = p.pageY;
                e = !1;
                f = !0
            }).bind("touchmove.ap", function(p) {
                if (f) {
                    p = p.originalEvent.touches[0];
                    var r = b - d + p.pageX,
                        L = l.width();
                    0 < r && (r = 0);
                    r < L - k.width() && (r = L - k.width());
                    k.css("left", r + "px");
                    e = e || 5 < Math.abs(d - p.pageX) || 5 < Math.abs(c - p.pageY);
                    return !1
                }
            }).bind("touchend.ap", function(b) {
                f = !1
            }).bind("click.ap-touchclick", function(b) {
                if (e) return e = !1
            })
        }

        function za() {
            "_blank" == e.contextMenuTarget ? (wa && Fa(), window.open(e.contextMenuLink)) : window.location = e.contextMenuLink
        }

        function m(b) {
            if ("disabled" == Jd) return !1;
            if ("custom" == Jd) {
                if (c(b.target).hasClass("embed_code")) return !0;
                b.preventDefault();
                b.stopPropagation();
                contextMenu.css({
                    left: b.pageX + "px",
                    top: b.pageY + "px",
                    display: "block"
                });
                qc.one("click.apvideo", N)
            }
        }

        function N() {
            qc.unbind("click.apvideo", N);
            contextMenu.css("display", "none")
        }

        function Ga(b) {
            if (!g || n || rc) return !1;
            if (!Ab) {
                if (Ia) {
                    if (b = b.originalEvent.touches, !(b && 0 < b.length)) return !1
                } else b.preventDefault();
                Ab = !0;
                ra.bind(Vb, function(b) {
                    a: {
                        var d;
                        if (Ia) {
                            if (b.originalEvent.touches && b.originalEvent.touches.length) d = b.originalEvent.touches;
                            else if (b.originalEvent.changedTouches && b.originalEvent.changedTouches.length) d = b.originalEvent.changedTouches;
                            else break a;
                            if (1 < d.length) break a;
                            d = d[0]
                        } else d = b;
                        b.preventDefault();
                        Ya(d.pageX)
                    }
                });
                ra.bind(mb, function(b) {
                    a: if (Ab) {
                        Ab = !1;
                        ra.unbind(Vb).unbind(mb);
                        var d;
                        if (Ia) {
                            if (b.originalEvent.touches && b.originalEvent.touches.length) d = b.originalEvent.touches;
                            else if (b.originalEvent.changedTouches && b.originalEvent.changedTouches.length) d = b.originalEvent.changedTouches;
                            else break a;
                            if (1 < d.length) break a;
                            d = d[0]
                        } else d = b;
                        b.preventDefault();
                        Ya(d.pageX)
                    }
                })
            }
            return !1
        }

        function Ya(b) {
            var d;
            d = b - Kd.offset().left;
            0 > d ? d = 0 : d > ka && (d = ka);
            b = Math.max(0, Math.min(1,
                d / ka));
            if ("local" == x)
                if (sc.css("width", d + "px"), C) {
                    if (S) {
                        b *= q.duration;
                        b = b.toFixed(1);
                        try {
                            q.currentTime = b
                        } catch (p) {}
                    }
                } else "undefined" !== typeof z(B) && z(B).pb_seek(b);
            else "youtube" == x && (C ? v && (b *= v.getDuration(), b = b.toFixed(1), v.seek(b)) : "undefined" !== typeof z(B) && z(B).pb_seek(b))
        }

        function Ca() {
            if (!S || ca && Wb) return !1;
            Ja && tc.css("display", "block").tooltipster("show");
            Bb.bind("mousemove", Ha).bind("mouseout", Ea);
            ra.bind("mouseout", Ea)
        }

        function Ea() {
            if (!S) return !1;
            Ja && tc.css("display", "none").tooltipster("hide");
            Bb.unbind("mousemove", Ha).unbind("mouseout", Ea);
            ra.unbind("mouseout", Ea)
        }

        function Ha(b) {
            var d = b.pageX - Kd.offset().left;
            0 > d ? d = 0 : d > ka && (d = ka);
            b = parseInt(b.pageX - Bb.offset().left - tc.width() / 2, 10);
            tc.css("left", b + "px");
            var d = Math.max(0, Math.min(1, d / ka)),
                c, e;
            if ("local" == x)
                if (C) c = d * q.duration, e = q.duration;
                else if ("undefined" !== typeof z(B)) e = z(B).pb_getFlashDuration(), c = d * e;
            else return;
            else if ("youtube" == x)
                if (C) c = d * v.getDuration(), e = v.getDuration();
                else if ("undefined" !== typeof z(B)) e = z(B).pb_getFlashDuration(),
                c = d * e;
            else return;
            Ja && tc.tooltipster("content", Tc(c) + " | " + Uc(e))
        }

        function kb() {
            U && clearTimeout(U);
            Ka.css("display", "none");
            uc = !1
        }

        function wb(b) {
            if (!g || n || Ab) return !1;
            if (!rc) {
                if (Ia) {
                    if (b = b.originalEvent.touches, !(b && 0 < b.length)) return !1
                } else b.preventDefault();
                rc = !0;
                ra.bind(Vb, function(b) {
                    a: {
                        var d;
                        if (Ia) {
                            if (b.originalEvent.touches && b.originalEvent.touches.length) d = b.originalEvent.touches;
                            else if (b.originalEvent.changedTouches && b.originalEvent.changedTouches.length) d = b.originalEvent.changedTouches;
                            else break a;
                            if (1 < d.length) break a;
                            d = d[0]
                        } else d = b;
                        b.preventDefault();
                        Xa(d.pageY)
                    }
                }).bind(mb, function(b) {
                    a: if (rc) {
                        rc = !1;
                        ra.unbind(Vb).unbind(mb);
                        var d;
                        if (Ia) {
                            if (b.originalEvent.touches && b.originalEvent.touches.length) d = b.originalEvent.touches;
                            else if (b.originalEvent.changedTouches && b.originalEvent.changedTouches.length) d = b.originalEvent.changedTouches;
                            else break a;
                            if (1 < d.length) break a;
                            d = d[0]
                        } else d = b;
                        b.preventDefault();
                        Xa(d.pageY)
                    }
                })
            }
            return !1
        }

        function Xa(b) {
            J = Math.max(0, Math.min(1, (b - Ld.offset().top) /
                Xb));
            J = 1 - J;
            Da()
        }

        function jb() {
            if (!g || n) return !1;
            0 < J ? (Vc = J, J = 0) : J = Vc
        }

        function Da() {
            Ie.css("height", J * Xb + "px");
            C ? "local" == x ? q && (q.volume = J) : v && v.setVolume(J) : "undefined" !== typeof z(B) && z(B).pb_setVolume(J);
            0 == J ? (k.find(".player_volume").find("i").removeClass("fa-volume-up").addClass("fa-volume-off"), nb && Je.find("span").html("UnMute")) : 0 < J && (k.find(".player_volume").find("i").removeClass("fa-volume-off").addClass("fa-volume-up"), nb && Je.find("span").html("Mute"));
            isMobile && Wc && (U && clearTimeout(U), U = setTimeout(kb,
                Xc))
        }

        function pc() {
            Wc && U && clearTimeout(U);
            Ja && ob.css("display", "block").tooltipster("show");
            Ka.bind("mousemove", He).bind("mouseout", ga);
            ra.bind("mouseout", ga)
        }

        function ga() {
            Wc && (U && clearTimeout(U), U = setTimeout(kb, Xc));
            Ja && ob.css("display", "none").tooltipster("hide");
            Ka.unbind("mousemove", He).unbind("mouseout", ga);
            ra.unbind("mouseout", ga)
        }

        function He(b) {
            b = b.pageY - Ld.offset().top;
            0 > b ? b = 0 : b > Xb && (b = Xb);
            var d = parseInt(b - ob.height() / 2 + Vf, 10);
            ob.css("top", d + "px");
            b = parseInt(100 * (1 - Math.max(0, Math.min(1,
                b / Xb))), 10);
            Ja && ob.tooltipster("content", b + " %")
        }

        function Uf() {
            var b, d, c, e, f, l = !1;
            H.unbind("touchstart.ap touchmove.ap touchend.ap click.ap-touchclick").bind("touchstart.ap", function(p) {
                if (!g || n) return !1;
                if (!zb) return !0;
                p = p.originalEvent.touches[0];
                b = H.position().left;
                d = H.position().top;
                c = p.pageX;
                e = p.pageY;
                f = !1;
                l = !0
            }).bind("touchmove.ap", function(p) {
                if (l) {
                    p = p.originalEvent.touches[0];
                    if ("horizontal" == V) {
                        var r = b - c + p.pageX,
                            L = la.width();
                        0 < r ? (r = 0, Z("off")) : Z("on");
                        r < L - E ? (r = L - E, ha("off")) : ha("on");
                        H.css("left",
                            r + "px")
                    } else r = d - e + p.pageY, L = la.height(), 0 < r ? (r = 0, Z("off")) : Z("on"), r < L - E ? (r = L - E, ha("off")) : ha("on"), H.css("top", r + "px");
                    f = f || 5 < Math.abs(c - p.pageX) || 5 < Math.abs(e - p.pageY);
                    return !1
                }
            }).bind("touchend.ap", function(b) {
                l = !1
            }).bind("click.ap-touchclick", function(b) {
                if (f) return f = !1
            })
        }

        function Z(b) {
            "on" == b ? Cb && Cb.css("display", "block") : Cb && Cb.css("display", "none")
        }

        function ha(b) {
            "on" == b ? Db && Db.css("display", "block") : Db && Db.css("display", "none")
        }

        function Gd() {
            if ("horizontal" == V) {
                var b = la.width(),
                    d;
                E > b ? (Z("on"),
                    ha("on"), zb = !0, d = parseInt(H.css("left"), 10), d < b - E ? (P && clearInterval(P), d = b - E) : 0 < d && (d = 0), H.css("left", d + "px"), 0 <= parseInt(H.css("left"), 10) && Z("off")) : (Z("off"), ha("off"), zb = !1)
            } else b = la.height(), E > b ? (Z("on"), ha("on"), zb = !0, d = parseInt(H.css("top"), 10), d < b - E ? (P && clearInterval(P), d = b - E) : 0 < d && (d = 0), H.css("top", d + "px"), 0 <= parseInt(H.css("top"), 10) && Z("off")) : (Z("off"), ha("off"), zb = !1)
        }

        function Md() {
          return;
            "scroll" == $a ? "list" == u && (Yb ? "block" == ma.css("display") && ($b.reinitialise(), "vertical" == V ? ($b.scrollToY(0),
                c(".jspPane").css("top", "0px")) : ($b.scrollToX(0), c(".jspPane").css("left", "0px"))) : (Yb = Zb, Yb.bind("jsp-initialised", function(b, d) {}), "horizontal" == V ? (Yb.jScrollPane({
                horizontalDragMinWidth: 100,
                horizontalDragMaxWidth: 100
            }), isMobile || Zb.bind("mousewheel", Wf)) : Yb.jScrollPane({
                verticalDragMinHeight: 100,
                verticalDragMaxHeight: 100,
                mouseWheelSpeed: 30,
                contentWidth: "0px"
            }), $b = Yb.data("jsp"))) : "buttons" == $a && (Cb = k.find(".thumbBackward").css({
                cursor: "pointer",
                display: "none"
            }).bind(ac, function() {
                if (!g || n) return !1;
                P && clearInterval(P);
                P = setInterval(function() {
                    var b;
                    "horizontal" == V ? (b = parseInt(H.css("left"), 10), b += 50, 0 < b ? (P && clearInterval(P), b = 0, Z("off")) : Z("on"), H.css("left", b + "px")) : (b = parseInt(H.css("top"), 10), b += 50, 0 < b ? (P && clearInterval(P), b = 0, Z("off")) : Z("on"), H.css("top", b + "px"));
                    ha("on")
                }, 100);
                return !1
            }).bind(mb, function() {
                P && clearInterval(P);
                return !1
            }), Db = k.find(".thumbForward").css({
                cursor: "pointer",
                display: "none"
            }).bind(ac, function() {
                if (!g || n) return !1;
                P && clearInterval(P);
                P = setInterval(function() {
                    var b;
                    "horizontal" == V ? (b = parseInt(H.css("left"), 10), w = la.width(), b -= 50, b < w - E ? (P && clearInterval(P), b = w - E, ha("off")) : ha("on"), H.css("left", b + "px")) : (b = parseInt(H.css("top"), 10), h = la.height(), b -= 50, b < h - E ? (P && clearInterval(P), b = h - E, ha("off")) : ha("on"), H.css("top", b + "px"));
                    Z("on")
                }, 100);
                return !1
            }).bind(mb, function() {
                P && clearInterval(P);
                return !1
            }), Gd(), isMobile || Zb.bind("mousewheel", function(b, d, c, e) {
                if (!g || n) return !1;
                b = 0 < d ? 1 : -1;
                c = "vertical" == V ? la.height() : la.width();
                if ("horizontal" == V) {
                    if (E < c) return !1;
                    d = parseInt(H.css("left"),
                        10);
                    d += 50 * b;
                    0 < d ? d = 0 : d < c - E && (d = c - E);
                    H.css("left", d + "px")
                } else {
                    if (E < c) return !1;
                    d = parseInt(H.css("top"), 10);
                    d += 50 * b;
                    0 < d ? d = 0 : d < c - E && (d = c - E);
                    H.css("top", d + "px")
                }
                0 == d ? (Z("off"), ha("on")) : d <= c - E ? (ha("off"), Z("on")) : (Z("on"), ha("on"), zb = !0);
                return !1
            }))
        }

        function Wf(b, d, c, e) {
            if (!g || n) return !1;
            $b && $b.scrollByX(100 * (0 < d ? -1 : 1));
            return !1
        }

        function Xf() {
            n || (vc && clearInterval(vc), ab && clearTimeout(ab), Yc(Nd))
        }

        function Yf() {
            ab && clearTimeout(ab);
            Yc(Nd)
        }

        function Ke(b) {
            var d = b.length,
                c = "",
                e = 0,
                f, l;
            for (e; e < d; e++)
                if (f = b.charAt(e).toLowerCase(),
                    "\\" == f && (f = "/"), l = f.charCodeAt(0), 97 <= l && 122 >= l || 48 <= l && 57 >= l || 0 <= "_-".indexOf(f)) c += f;
            return c
        }

        function Yc(b) {
            b.stopPropagation();
            Od || (Od = !0);
            if ("/" == b.value && (pb = !0, c.address.history(!1), !G(qb))) {
                c.address.value(qb);
                c.address.history() || c.address.history(!0);
                return
            }
            La = b.value;
            "/" == La.charAt(0) && (La = La.substring(1));
            "/" == La.charAt(La.length - 1) && (La = La.substring(0, La.length - 1));
            b = La;
            var d;
            0 < b.indexOf("/") ? (bc = !0, Zc = d = b.substr(0, b.indexOf("/")), Eb = b.substr(b.indexOf("/") + 1)) : (Zc = b, bc = !1, Eb = null, d =
                b);
            b = Ke(d);
            d = !1;
            var e = 0,
                f = X.length;
            for (e; e < f; e++)
                if (X[e].categoryName == b) {
                    na = e;
                    ia = X[e].id;
                    d = !0;
                    break
                }
            if (!d) return -1 == c.inArray(b, Le) && alert("404 page not found, check your deeplinks first level!"), c.address.history(!1), !1;
            pb = !1;
            void 0 == $c || $c != na ? Fb() : Eb ? Me(Eb) ? y.getCounter() != cc ? (pb = !0, -1 != y.getCounter() && bb(), y.setCounter(cc, !1)) : (Pd(), Gb()) : (alert("404 page not found, check your deeplinks second level!"), c.address.history(!1)) : Ne()
        }

        function Me(b) {
            var d = !1,
                c = 0,
                e = X[na].mediaName,
                f = e.length;
            for (c; c <
                f; c++)
                if (e[c] == b) {
                    cc = c;
                    d = !0;
                    break
                }
            return d ? !0 : !1
        }

        function ad() {
            cb = Hb = !1;
            oa.css("display", "none");
            n = !1
        }

        function dc() {
            cb = !1;
            oa.css("display", "none");
            if (!g) {
                g = !0;
                Qd();
                "list" == u && (Oe ? O.bind("mouseenter", Zf).bind("mouseleave", $f) : db());
                sa && !bd && (ma.bind("mouseleave", ag), qc.on("mouseleave", rb));
                "undefined" !== typeof vplpSetupDone && setTimeout(function() {
                    clearTimeout(this);
                    vplpSetupDone(K, M)
                }, 50);
                if (Rd) {
                    var b = Rd.find("option[value='" + ia + "']").text();
                    isMobile ? c(e.dropdownId).find('.lp_playlist option[value="' +
                        ia + '"]').prop("selected", !0) : c(e.dropdownId).find(".sbSelector").text(b)
                }
                wc.removeClass("hidden").addClass("visible")
            }
            if (!Sd && (Sd = !0, "list" == u && !cb && 0 < D)) {
                if (da) {
                    if (bc)
                        if (Eb) {
                            if (!Me(Eb)) {
                                alert("404 page not found, check your deeplinks second level!");
                                c.address.history(!1);
                                return
                            }
                            pb = !0;
                            y.setCounter(cc, !1)
                        } else c.address.value(qb), c.address.history() || c.address.history(!0)
                } else b = parseInt(e.activeItem, 10), b > D - 1 && (b = D - 1), -1 < b && y.setCounter(b, !1);
                Td()
            }
            Ja && k.find(".ap_tooltip").tooltipster({
                onlyOne: !0,
                updateAnimation: !1,
                offsetY: 3,
                speed: 0
            })
        }

        function xc(b) {
            ta++;
            ta > D - 1 ? Pe ? (Pe = !1, oa.css("display", "none"), dc()) : bg() : cd()
        }

        function cd() {
            var b = aa[ta].type;
            /local/.test(b) ? (eb.push(aa[ta]), xc()) : /folder/.test(b) ? cg() : /xml/.test(b) ? dg() : /youtube/.test(b) && Qe.setData(aa[ta])
        }

        function Fb() {
            n = !0;
            oa.css("display", "block");
            if (!Re)
                if (Re = !0, C) "list" == u && Q.css("display", "block");
                else {
                    Q.remove();
                    eg();
                    return
                }
            W && dd();
            yc = !1;
            if (!Se) {
                Se = !0;
                var b = c("<div/>").addClass("playlistNonSelected").css("opacity", 0).appendTo(ma);
                Te = parseInt(b.css("marginBottom"), 10);
                Ue = parseInt(b.css("marginRight"), 10);
                b.width();
                b.height();
                b.remove();
                b = null;
                b = c("<div/>").addClass("playlistThumb").css("opacity", 0).appendTo(ma);
                ed = b.width();
                fd = b.height();
                thumbLeft = parseInt(b.css("left"), 10);
                thumbTop = parseInt(b.css("top"), 10);
                b.remove();
                b = null
            }
            $c = na;
            ta = 0;
            eb = [];
            aa = [];
            var d, e, b = c(ec.find("div[id=" + ia + "]"));
            if (0 == b.length) return alert("Failed playlist selection! No playlist with id: " + ia), ad(), !1;
            W = b;
            Ve = ia;
            b.children("div[class*=playlistNonSelected]").each(function() {
                e =
                    c(this);
                d = Ud(e);
                aa.push(d)
            });
            D = aa.length;
            0 < D ? cd() : xc()
        }

        function cg() {
            var b = c(aa[ta].item),
                d = b.attr("data-path"),
                e = pa + "includes/folder_parser.php",
                d = "wall" == u || "wall_popup" == u ? d + fg : d + "/main/",
                d = d.replace(/\/\//g, "/"),
                d = {
                    type: ["mp4"],
                    dir: d,
                    subdirs: !1,
                    limit: 1E4
                };
            da && (We = b.attr("data-address"), Vd = 0);
            c.ajax({
                type: "GET",
                url: e,
                data: d,
                dataType: "json"
            }).done(function(b) {
                gg(b, "filename");
                var d = 0,
                    e = b.length,
                    f, p, r;
                for (d; d < e; d++) f = b[d], p = f.dirname, p = p.replace(/\\/g, "/"), p = p.replace(/\\'/g, "'"), p = p.replace(/\\"/g,
                    '"'), p = p.replace(/\\0/g, "\x00"), p = p.replace(/\\\\/g, "\\"), p = p.substr(f.root.length), r = p + "/" + f.basename, r = r.replace(/\/\//g, "/"), p = {
                    type: "local",
                    origtype: "folder"
                }, /.mp4/.test(r) && (p.mp4 = r, p.preview = r.substr(0, r.lastIndexOf(".")) + ".jpg", p.video_preview = p.mp4.replace("/main/", "/preview/"), p.thumb = p.preview.replace("/main/", "/preview/"), p.title = f.filename, p.item = aa[ta].item.clone(), da && (p.deeplink = We + (Vd + 1).toString(), p.item.attr({
                    "data-address": p.deeplink
                }), Vd++), p.item.attr({
                    "data-type": "local",
                    "data-mp4": p.mp4,
                    "data-preview": p.preview,
                    "data-video-preview": p.video_preview,
                    "data-thumb": p.thumb
                }), c('<div class="ap_title">' + p.title + "</div>").appendTo(p.item), eb.push(p));
                xc()
            }).fail(function(b, d, c) {
                alert("There was an error processing folder: " + b.responseText);
                ad()
            })
        }

        function dg() {
            var b = aa[ta],
                d = 0,
                e = ta;
            aa.splice(e, 1);
            c.ajax({
                type: "GET",
                url: b.path,
                dataType: "html",
                cache: !1
            }).done(function(b) {
                var f, p;
                c(b).children("div[class*=playlistNonSelected]").each(function() {
                    f = c(this);
                    p = Ud(f);
                    aa.splice(e, 0, p);
                    e++;
                    d++
                });
                D +=
                    d - 1;
                --ta;
                xc()
            }).fail(function(b, d, c) {
                alert("There was an error processing xml: " + b.responseText);
                ad()
            })
        }

        function bg() {
            var b = 0,
                d = cb ? ua : I.length,
                f = eb.length,
                r, L, l, k, g, m, n, t, q, v, x, z, B, E = 0,
                F = [];
            if (da) {
                if (!na && 0 !== na) {
                    var C = {};
                    r = "ap_playlist" + Xe;
                    Le.push(r);
                    Xe++;
                    C.categoryName = C.id = r;
                    C.fromapi = !0;
                    X.push(C);
                    $c = na = X.length - 1;
                    Zc = r;
                    c.address.value(r)
                }
                X[na].mediaName ? C = X[na].mediaName : (C = [], X[na].mediaName = C);
                r = c.address.strict() ? "#/" : "#";
                var H = Ye + r + Zc + "/"
            }
            for (b; b < f; b++) {
                var A = b + d;
                cb && E++;
                l = eb[b];
                r = l.type;
                L =
                    c("<div/>").addClass("playlistNonSelected").attr({
                        "data-id": A,
                        "data-type": r
                    });
                bd || (cb ? (zc ? zc.after(L) : fc ? L.appendTo(W) : W.children().eq(ua).before(L), zc = L) : L.appendTo(gc));
                g = null;
                da && (g = Ke(l.deeplink), C.splice(A, 0, g), g = da ? H + l.deeplink : Ye, l.deeplink = g);
                n = c("<div/>").addClass("playlistThumb").appendTo(L);
                hc.splice(A, 0, n);
                (g = l.thumb ? l.thumb : null) ? (m = c('<img class="thumb hidden" src="' + g + '" alt=""/>').appendTo(n), Ac.splice(A, 0, m)) : Ac.splice(A, 0, "");
                F.push(m ? m : "");
                n = l.title ? l.title : "";
                q = l.description_short ?
                    l.description_short : "";
                k = l.description ? l.description : "";
                "local" != r && (G(q) && (q = k), 50 < q.length && (q = q.substr(0, 50) + "..."));
                "list" == u && c('<div class="playlistInfo"><p><span class="playlistTitle">' + n + '</span><br><span class="playlistContent">' + q + "</span></p></div>").appendTo(L);
                var J = l.item ? l.item.attr("class").replace("playlistNonSelected", "") : "";
                t = c("<div/>").addClass("hitdiv").css({
                    cursor: "pointer"
                }).attr("dataTitle", "hitdiv");
                "list" == u ? (t.appendTo(L), fb.splice(A, 0, t), L.bind("click", Wd).attr("data-id",
                    b + d)) : "wall" == u ? (v = l.lightbox ? l.lightbox.link ? l.lightbox.link : null : null, x = l.lightbox ? l.lightbox.hook ? l.lightbox.hook : null : null, z = l.lightbox ? l.lightbox.weblink ? l.lightbox.weblink : null : null, B = l.lightbox ? l.lightbox.target ? l.lightbox.target : "_blank" : null, Hb && Xd && (x = "fancybox-" + Xd.replace(/\s+/g, ""), v = Y + "//www.youtube.com/watch?v=" + l.id), l.origtype && "youtube_single" != l.origtype && x && (v = Y + "//www.youtube.com/watch?v=" + l.id), k = L, "local" == r ? Ze("local", L, A, n, q, x, v, B, z, g, k, t, J) : Ze("yt", L, A, n, q, x, v, B, z, g, k, t,
                    J)) : "wall_popup" == u && (t.appendTo(L), fb.splice(A, 0, t), L.bind("click", Wd).data("no_action", "true").attr("data-id", A), "local" != r && Hb && (g = c('<div class="playlistNonSelected" data-type="youtube_single" data-path="' + l.id + '" ></div>').appendTo(ec.find("#" + e.activePlaylist)), da && g.attr("data-address", l.deeplink)));
                isMobile || L.bind("mouseenter", hg).bind("mouseleave", ig).attr("data-id", A);
                sa && jg(A);
                I.splice(A, 0, {
                    id: A,
                    type: r,
                    item: L,
                    data: l
                });
                l.item && l.item.find("div[class='ap_adv']").length && (I[A].advert = kg(l.item.find("div[class='ap_adv']").eq(0)))
            }
            for (var T =
                    0, f = F.length, b = 0; b < f; b++) setTimeout(function() {
                F[T].removeClass("hidden").addClass("visible");
                T++
            }, 50 + 50 * b);
            zc = null;
            W = gc;
            D = I.length;
            $e();
            la.find(".playlistInfo").length && la.find(".playlistInfo").dotdotdot();
            la.find(".ap_wall_title").length && la.find(".ap_wall_title").dotdotdot();
            "list" == u ? (af(), Md()) : "wall" == u && Yd && c("a[data-fancybox-group^='fancybox-']").fancybox({
                openEffect: "none",
                closeEffect: "none",
                prevEffect: "none",
                nextEffect: "none",
                mouseWheel: !1,
                arrows: !1,
                helpers: {
                    media: {},
                    title: {
                        type: "inside"
                    },
                    thumbs: {
                        width: 50,
                        height: 50
                    }
                },
                beforeLoad: function() {
                    sa && rb();
                    "undefined" !== typeof vplpItemTriggered && vplpItemTriggered(K, M, c(this.element).attr("data-id"))
                },
                afterLoad: function() {
                    var b = this.title ? this.title : " ",
                        d = c(this.element).find("img").attr("alt") ? c(this.element).find("img").attr("alt") : " ";
                    this.title = "<h3>" + b + "</h3>" + d + "<br />"
                }
            });
            da && -1 != e.activeItem && !bc && (f = e.activeItem, f > D - 1 && (f = D - 1), bc = !0, qb += "/" + I[f].data.deeplink.substr(I[f].data.deeplink.lastIndexOf("/") + 1));
            cb || Hb ? (f = y.getCounter(), y.setPlaylistItems(D, !1), ua <= f && (fc || y.reSetCounter(f + E)), "list" == u && (gd ? (gd = !1, ic && !isMobile && jc(!0), y.setCounter(ua, !1)) : ic && (bb(), y.setCounter(ua, !1)))) : y.setPlaylistItems(D);
            ad();
            dc();
            0 == D && "undefined" !== typeof vplpPlaylistEmpty && vplpPlaylistEmpty(K, M);
            setTimeout(function() {
                vplpPlaylistLoaded(K, M, y.getCounter())
            }, 50);
            yc = !0
        }

        function Ze(b, d, e, f, g, l, k, m, n, t, q, u, v) {
            l && k ? (Yd = !0, a = c('<a class="fancybox hitdiv" href="' + k + '" data-fancybox-group="fancybox-' + l + '" title="' + f + '" data-id="' + e + '"/>').css({
                    background: "#111",
                    opacity: 0
                }).appendTo(q),
                img = c('<img src="' + t + '" alt="' + g + '"/>').css("display", "none").appendTo(a), fb.splice(e, 0, ""), G(v) || a.addClass(v)) : n ? (a = c('<a class="hitdiv" href="' + n + '" target="' + m + '" data-id="' + e + '"/>').appendTo(q), fb.splice(e, 0, "")) : (u.appendTo(q), d.bind("click", Wd).data("no_action", "true").attr("data-id", e), fb.splice(e, 0, u))
        }

        function jg(b) {
            c("<div/>").addClass("thumb_vid").attr({
                dataTitle: "videoDiv"
            }).prependTo(hc[b]);
            var d = c("<div/>").addClass("thumbPreloader").appendTo(hc[b]);
            hd.splice(b, 0, d)
        }

        function af() {
            if (0 <
                D) {
                var b = 0,
                    d;
                for (b; b < D; b++) d = c(I[b].item), "horizontal" == V ? d.css("marginRight", Ue + "px") : d.css("marginBottom", Te + "px");
                "vertical" == V ? I[D - 1].item.css("marginBottom", "0px") : I[D - 1].item.css("marginRight", "0px");
                b = E = 0;
                for (b; b < D; b++) d = c(I[b].item), E = "horizontal" == V ? E + d.outerWidth(!0) : E + d.outerHeight(!0);
                "buttons" == $a ? ("horizontal" == V && Zb.width(E), Gd()) : "scroll" == $a && "horizontal" == V && W.width(E);
                "buttons" == $a && ("horizontal" == V ? (b = la.width(), E <= b && H.css("left", "0px")) : (b = la.height(), E <= b && H.css("top", "0px")))
            }
        }

        function $e() {
            var b = 0;
            D = I.length;
            for (b; b < D; b++) I[b].id = b, c(I[b].item).attr("data-id", b).find("[data-id]").each(function() {
                c(this).attr("data-id", b)
            })
        }

        function hg(b) {
            if (!g || n) return !1;
            b || (b = window.event);
            b.cancelBubble ? b.cancelBubble = !0 : b.stopPropagation && b.stopPropagation();
            var d = c(b.currentTarget);
            b = parseInt(d.attr("data-id"), 10);
            var f = c(I[b].item),
                r = I[b].data;
            if (b == y.getCounter()) return "undefined" !== typeof playlistItemRollover && playlistItemRollover(K, M, f, b), !1;
            Bc = d.attr("data-type");
            "list" == u &&
                d.removeClass("playlistNonSelected").addClass("playlistSelected");
            d = r.video_preview || r.id;
            sa && d && (bf = c(hc[b]), Zd = c(Ac[b]).removeClass("visible").addClass("hidden"), gb = c(hd[b]).css("display", "block"), Ib = bf.find("div[class=thumb_vid]"), C ? "local" == Bc ? (id = r.video_preview, r = "" + ('<video class="preview_video_cont" width="' + ed + '" height="' + fd + '" preload="auto" playsinline>'), r += '<source src="' + id + '" />', r += "</video>", isAndroid || (d = r.match(/\/\>/), r = r.slice(0, d.index) + 'type="video/mp4"' + r.slice(d.index)),
                Ib.html(r), Jb = Ib.find(".preview_video_cont"), Cc = Jb[0], Jb.bind("ended", cf).bind("canplaythrough", $d).bind("canplay", ae)) : (be = r.id, ce = !1, youtubeIframePreview.appendTo(Ib), isIE && youtubeIframePreview.css({
                left: -Kb + "px",
                width: "320px",
                height: "240px"
            }), lg()) : (id = "local" == Bc ? r.video_preview : r.id, b = parseInt(16777215 * Math.random(), 10), jd.empty().appendTo(Ib).append(df(b)), r = {
                mt: Bc,
                mp: id,
                cw: ed,
                ch: fd,
                defaultVolume: J,
                flash_id: e.flash_id
            }, mg(r)));
            "undefined" !== typeof playlistItemRollover && playlistItemRollover(K,
                M, f, b);
            return !1
        }

        function cf() {
            try {
                Cc.currentTime = 0
            } catch (b) {}
            Cc.play()
        }

        function $d() {
            ef()
        }

        function ae() {
            ef()
        }

        function ef() {
            Jb && Jb.unbind("canplaythrough", $d).unbind("canplay", ae);
            gb && gb.css("display", "none");
            Cc && Cc.play()
        }

        function rb() {
            kd && clearInterval(kd);
            C ? "local" == Bc ? (Jb && Jb.unbind("ended", cf).unbind("canplaythrough", $d).unbind("canplay", ae).find("source").attr("src", ""), Ib && Ib.html("")) : (hb && (c(hb).off("ap_YoutubePlayer.START_PLAY"), hb.clean(!0), hb = null), isIE && youtubeIframePreview.css({
                left: -Kb +
                    "px"
            })) : (Ma && clearInterval(Ma), jd.empty());
            gb && gb.css("display", "none");
            Zd && Zd.removeClass("hidden").addClass("visible")
        }

        function ig(b) {
            if (!g || n) return !1;
            b || (b = window.event);
            b.cancelBubble ? b.cancelBubble = !0 : b.stopPropagation && b.stopPropagation();
            b = c(b.currentTarget);
            var d = parseInt(b.attr("data-id"), 10),
                e = c(I[d].item);
            if (d == y.getCounter()) return "undefined" !== typeof vplpPlaylistItemRollout && vplpPlaylistItemRollout(K, M, e, d), !1;
            sa && rb();
            "list" == u && b.hasClass("playlistSelected") && b.removeClass("playlistSelected").addClass("playlistNonSelected");
            "undefined" !== typeof vplpPlaylistItemRollout && vplpPlaylistItemRollout(K, M, e, d);
            return !1
        }

        function Wd(b) {
            if (!g || n) return !1;
            b || (b = window.event);
            b.cancelBubble ? b.cancelBubble = !0 : b.stopPropagation && b.stopPropagation();
            b = c(b.currentTarget).attr("data-id");
            if ("list" == u) {
                if (b == y.getCounter()) return !1;
                sa && rb();
                bb();
                y.processPlaylistRequest(b)
            } else "wall_popup" != u || f || "undefined" === typeof open_popup || (e.activeItem = b, isIOS && isChrome && hasLocalStorage && (localStorage.setItem("vplp_wall_popup_mltp_settings", JSON.stringify(e)),
                localStorage.setItem("vplp_wall_act_playlist", escape(ec.wrap("<p>").parent().html()))), open_popup(e, parseInt(b, 10)));
            return !1
        }

        function bb() {
            if ("wall" == u || "wall_popup" == u) return !1;
            if (-1 != y.getCounter()) {
                var b = y.getCounter(),
                    d = c(I[b].item);
                if (d) {
                    var e = d.attr("data-id");
                    d.removeClass("playlistSelected").addClass("playlistNonSelected");
                    "undefined" !== typeof vplpPlaylistItemEnabled && vplpPlaylistItemEnabled(K, M, d, e)
                }
                "list" == u && (b = fb[b]) && b.css("cursor", "pointer")
            }
        }

        function Pd() {
            if ("wall" == u || "wall_popup" ==
                u) return !1;
            var b = y.getCounter(),
                d = c(I[b].item);
            if (d) {
                var e = d.attr("data-id");
                d.removeClass("playlistNonSelected").addClass("playlistSelected");
                "undefined" !== typeof vplpPlaylistItemDisabled && vplpPlaylistItemDisabled(K, M, d, e)
            }
            "list" == u && (b = fb[b]) && b.css("cursor", "default")
        }

        function ng(b) {
            var d;
            if (!g || n) return !1;
            b || (b = window.event);
            b.cancelBubble ? b.cancelBubble = !0 : b.stopPropagation && b.stopPropagation();
            d = c(b.currentTarget).attr("class").split(" ");
            if (-1 != c.inArray("player_toggleControl", d)) Dc = !0, Fa();
            else if (-1 != c.inArray("player_volume", d)) isMobile ? Wc ? (U && clearTimeout(U), uc ? (Ka.css("display", "none"), uc = !1) : (Ka.css("display", "block"), uc = !0, U = setTimeout(kb, Xc))) : (jb(), Da()) : (jb(), Da());
            else if (-1 != c.inArray("info_toggle", d)) de();
            else if (-1 != c.inArray("ap_share_btn", d)) qa.toggle(), Na.css("display", "none"), sb = !1;
            else if (-1 != c.inArray("player_fullscreen", d)) ff(!0), Ja && c(b.currentTarget).tooltipster("hide");
            else if (-1 != c.inArray("player_download", d)) {
                if (!kc) {
                    d = y.getCounter();
                    b = I[d].data.title;
                    d = I[d].data.download;
                    d.indexOf("\\") && (d = d.replace(/\\/g, "/"));
                    if (!d.match(/^http([s]?):\/\/.*/)) {
                        var e = window.location.href,
                            e = e.substr(0, e.lastIndexOf("/") + 1);
                        /^\.\.\//i.test(d) && (d = d.substr(3), "/" == e.charAt(e.length - 1) && (e = e.substr(0, e.lastIndexOf("/"))), e = e.substr(0, e.lastIndexOf("/") + 1));
                        d = e + d
                    }
                    b = b.replace(/[^A-Z0-9\-\_\.]+/ig, "_");
                    40 < b.length && (b = b.substr(0, 40) + "...");
                    0 < d.lastIndexOf(".") && (e = d.substr(d.lastIndexOf(".")), (new RegExp("/" + e + "$/i")).test(b) || (b += e));
                    isMobile ? (kc = !0, og ? (gf || (ee = hf()) && (gf = !0), ee ? jf(ee,
                        b, d) : kc = !1) : (e = hf()) ? jf(e, b, d) : kc = !1) : pg.attr("src", pa + "includes/dl.php?path=" + d + "&name=" + b)
                }
            } else -1 != c.inArray("player_prev", d) ? g && (bb(), y.advanceHandler(-1, !0)) : -1 != c.inArray("player_next", d) && fe();
            return !1
        }

        function qg(b) {
            b.preventDefault();
            if (!g || n) return !1;
            c(b.currentTarget).find("i").removeClass("icon_color").addClass("icon_rollover_color")
        }

        function rg(b) {
            b.preventDefault();
            if (!g || n) return !1;
            c(b.currentTarget).find("i").removeClass("icon_rollover_color").addClass("icon_color")
        }

        function fe() {
            g &&
                (bb(), y.advanceHandler(1, !0))
        }

        function Ne() {
            g && x && (bb(), x && Ec(), y.reSetCounter())
        }

        function dd() {
            kd && clearInterval(kd);
            Ec();
            Q.html("").css("display", "none");
            sa && rb();
            gc.empty();
            da && (X[na].mediaName = []);
            Yd = Lb = yc = cb = !1;
            D = 0;
            eb = [];
            I = [];
            y.reSetCounter();
            zc = null;
            hc = [];
            Ac = [];
            hd = [];
            fb = [];
            sb = !1;
            E = 0;
            "list" == u && "buttons" == $a && ("horizontal" == V ? H.css("left", "0px") : H.css("top", "0px"), Cb && Cb.css("display", "none"), Db && Db.css("display", "none"));
            Sd = !1
        }

        function Gb(b) {
            if (tb = b ? b : null) {
                ld && clearInterval(ld);
                Oa && clearInterval(Oa);
                Pa && Pa.hide();
                if (x && "local" == x)
                    if (C) {
                        if (q) {
                            q.pause();
                            try {
                                q.currentTime = 0
                            } catch (Tg) {}
                            q.src = ""
                        }
                        ea && ea.unbind("ended", Fc).unbind("loadedmetadata", ge).unbind("waiting", he).unbind("playing", ie).unbind("play", lc).unbind("pause", Gc);
                        Q.css("display", "none");
                        !isMobile & C ? (Q.html(""), Lb = !1) : ib && ea && ea.removeAttr("id").removeClass("captioned")
                    } else "undefined" !== typeof z(B) && z(B).pb_dispose();
                else x && "youtube" == x && (C ? (v && v.stop(), xa.css("left", -Kb + "px")) : "undefined" !== typeof z(B) && z(B).pb_dispose());
                kf();
                Dc = ic =
                    Hc = S = wa = !1;
                "undefined" !== typeof captionator && captionator.destroy();
                Aa.css("display", "none")
            } else Ec();
            if (!tb) {
                !mc && I[y.getCounter()].advert ? (A = I[y.getCounter()].advert, ca = !0) : (A = I[y.getCounter()].data, ca = !1, mc = !0);
                x = A.type;
                "local" == x && je("local");
                if (C && "local" == x && A.subs) {
                    b = A.subs;
                    var d, f = b.length,
                        r, g, l;
                    xb = c("<ul class='captions_menu'></ul>").appendTo(Aa);
                    for (d = 0; d < f; d++) {
                        g = c(b[d]);
                        r = c("<li/>").appendTo(xb);
                        r = c('<a href="#"/>').text(g.attr("label")).addClass("captionOut").attr("data-srclang", g.attr("srclang")).on("click",
                            lf).appendTo(r);
                        if (!isMobile) r.on("mouseover", mf).on("mouseout", nf);
                        g.attr("default") && (l = !0, Ic = r.removeClass("captionOut").addClass("captionOver").data("active", !0).css("cursor", "default"))
                    }
                    r = c("<li/>").appendTo(xb);
                    r = c('<a href="#"/>').text("None").addClass("captionOut").attr("data-srclang", "none").on("click", lf).appendTo(r);
                    l || (Ic = r.removeClass("captionOut").addClass("captionOver").data("active", !0).css("cursor", "default"));
                    if (!isMobile) r.on("mouseover", mf).on("mouseout", nf);
                    Aa.css("top", -Aa.height() -
                        5 + "px");
                    md.css("display", "block");
                    ib = !0
                }
                ca && Jc && (Wb = e.disableSeekbarInAdvert, Mb = !1, A.skip_time ? (Qa = A.skip_time, Nb.show(), nd.empty().show().append(c('<img class="adv_thumb" src="' + I[y.getCounter()].data.thumb + '" alt=""/>'))) : (Qa = null, nd.hide(), Nb.hide(), od.show(), Wb = !1))
            }
            if ("local" == x) {
                l = 0;
                b = Ob.length;
                var k;
                for (l; l < b; l++)
                    if (d = Ob[l], Pb == d.quality) {
                        k = d.mp4;
                        "undefined" !== typeof vplpQualityChange && vplpQualityChange(K, M, Pb);
                        break
                    }
            } else k = A.id;
            Ra = k;
            "local" == x ? Sa ? C ? of() : "undefined" !== typeof z(B) && (z(B).pb_play(Ra,
                Ta, ja.width(), ja.height(), "local", !0, tb ? Qb : null), S = !0) : (sg(), db()) : "youtube" == x && (C ? tg() : "undefined" !== typeof z(B) && (z(B).pb_play(Ra, Ta, ja.width(), ja.height(), "youtube", pd, null, A.quality ? A.quality : "default"), Sa && (S = !0)));
            "list" == u && "undefined" !== typeof vplpItemTriggered && vplpItemTriggered(K, M, y.getCounter())
        }

        function Ec() {
            ld && clearInterval(ld);
            Oa && clearInterval(Oa);
            Sc = null;
            nc.hide();
            od.hide();
            qd();
            Na.css("display", "none");
            ke.css("display", "none");
            sb = !1;
            Kc && qa.css("display", "none");
            rd.css("display",
                "none");
            Pa && Pa.hide();
            if (x && "local" == x)
                if (C) {
                    if (q) {
                        q.pause();
                        try {
                            q.currentTime = 0
                        } catch (b) {}
                        q.src = ""
                    }
                    ea && ea.unbind("ended", Fc).unbind("loadedmetadata", ge).unbind("waiting", he).unbind("playing", ie).unbind("play", lc).unbind("pause", Gc);
                    Q.css("display", "none");
                    !isMobile & C ? (Q.html(""), Lb = !1) : ib && ea && ea.removeAttr("id").removeClass("captioned")
                } else "undefined" !== typeof z(B) && z(B).pb_dispose();
            else x && "youtube" == x && (C ? (v && v.stop(), xa.css("left", -Kb + "px")) : "undefined" !== typeof z(B) && z(B).pb_dispose());
            ub("off");
            ba && (ba.remove(), ba = null);
            Ua.css("display", "none");
            lb && lb.remove();
            sd.css("display", "none");
            Za.css("display", "none");
            kf();
            ic = Hc = S = wa = !1;
            oc();
            Va = Wa = null;
            ca || (mc = !1);
            "undefined" !== typeof captionator && captionator.destroy();
            xb && xb.remove();
            md.css("display", "none");
            Aa.css("display", "none");
            Dc = ib = !1
        }

        function ub(b) {
            "off" == b ? pf.css("display", "none") : pf.css("display", "block")
        }

        function tg() {
            qf || Q.css("display", "none");
            le ? (Rb(), v.initVideo(Ra, A.quality)) : (xa = c("<div class='youtubeIframeMain'/>").prependTo(O),
                Pa = c('<div class="click_blocker"></div>').on("click", function(b) {
                    b.preventDefault();
                    if (!g || n) return !1;
                    Fa()
                }).appendTo(xa), v = c.apvplp_youtubePlayer({
                    autoPlay: pd,
                    defaultVolume: J,
                    mediaPath: Ra,
                    youtubeHolder: xa,
                    youtubeChromeless: ug,
                    isMobile: isMobile,
                    initialAutoplay: me,
                    quality: A.quality,
                    protocol: Y
                }, e), c(v).bind("ap_YoutubePlayer.YT_READY", function() {
                    Rb()
                }), c(v).bind("ap_YoutubePlayer.START_PLAY", function() {
                    S = qf = !0;
                    isMobile || jc(!0);
                    je("youtube");
                    Rb();
                    tb || ne();
                    db();
                    Oa && clearInterval(Oa);
                    Oa = setInterval(rf,
                        sf);
                    ub("on");
                    "fullscreen" == ya && Pa.show()
                }), c(v).bind("ap_YoutubePlayer.END_PLAY", function() {
                    Fc()
                }), c(v).bind("ap_YoutubePlayer.STATE_PLAYING", function() {
                    lc()
                }), c(v).bind("ap_YoutubePlayer.STATE_PAUSED", function() {
                    Gc()
                }), c(v).bind("ap_YoutubePlayer.STATE_CUED", function() {
                    oa.css("display", "none")
                }), c(v).on("ap_YoutubePlayer.QUALITY_CHANGE", function(b, d) {
                    tf(d);
                    "undefined" !== typeof vplpQualityChange && vplpQualityChange(K, M, d)
                }), le = !0);
            setTimeout(function() {
                oa.css("display", "none")
            }, 1E3);
            db()
        }

        function lg() {
            ce ?
                hb.initVideo(be) : (hb = c.apvplp_youtubePlayer({
                    autoPlay: !0,
                    defaultVolume: 0,
                    mediaPath: be,
                    youtubeHolder: youtubeIframePreview,
                    youtubeChromeless: !0,
                    isMobile: isMobile,
                    initialAutoplay: me,
                    quality: "small",
                    small_embed: !0,
                    isIE: isIE,
                    protocol: Y
                }, e), c(hb).on("ap_YoutubePlayer.START_PLAY", function() {
                    isIE && youtubeIframePreview.css({
                        left: "0px",
                        width: ed + "px",
                        height: fd + "px"
                    });
                    gb && gb.css("display", "none")
                }), c(hb).bind("ap_YoutubePlayer.END_PLAY", function() {
                    hb.play()
                }), ce = !0)
        }

        function sg() {
            Ua.css("display", "block");
            oa.css("display",
                "block");
            var b = A.preview + "?rand=" + 99999999 * Math.random();
            ba = c(new Image).addClass("ap_media").css({
                position: "absolute",
                display: "block",
                opacity: 0
            }).on("load", function() {
                oa.css("display", "none");
                oe = this.width;
                pe = this.height;
                Va = this.width;
                Wa = this.height;
                ba.appendTo(Ua);
                qe(ba);
                ba.animate({
                    opacity: 1
                }, {
                    duration: 500
                });
                ub("on")
            }).on("error", function(b) {}).attr("src", b)
        }

        function of() {
            oa.css("display", "block");
            Ra += "?rand=" + 99999999 * Math.random();
            if (Lb) Q.css({
                    opacity: 0,
                    display: "block"
                }), ea = Q.find("video[class=ap_media]"),
                q = ea[0], q.src = Ra, q.load();
            else {
                var b;
                b = "" + ('<video class="ap_media" width="' + Va + '" height="' + Wa + '" playsinline>');
                b += '<source src="' + Ra + '" />';
                b += "</video>";
                if (!isAndroid) {
                    var d = b.match(/\/\>/);
                    b = b.slice(0, d.index) + 'type="video/mp4"' + b.slice(d.index)
                }
                Q.css({
                    opacity: 0,
                    display: "block"
                }).html(b);
                ea = Q.find("video[class=ap_media]");
                q = ea[0]
            }
            q.volume = J;
            ea.css("position", "absolute").bind("ended", Fc).bind("loadedmetadata", ge).bind("waiting", he).bind("playing", ie).bind("play", lc).bind("pause", Gc);
            isIOS && !Lb ?
                (q.src = Ra, q.load()) : isAndroid && !Lb && (q.play(), ub("off"), ba && ba.stop().animate({
                    opacity: 0
                }, {
                    duration: 500,
                    complete: function() {
                        ba.remove();
                        ba = null
                    }
                }), S = !0, db());
            Lb = !0;
            ib && (ea.append(A.subs), Ua.css("display", "block"), b = Q.height(), d = va.height(), captionator.captionify(".ap_media", null, {
                controlHeight: d + 10 + "px",
                appendCueCanvasTo: ".mediaPreview"
            }, b), captionator.setRedraw(!0), ea.find("track").remove(), uf())
        }

        function he(b) {
            oa.css("display", "block")
        }

        function ie(b) {
            oa.css("display", "none")
        }

        function lc(b) {
            re.find("i").removeClass("fa-play").addClass("fa-pause");
            nb && se.find("span").html("Pause");
            ub("off");
            oa.css("display", "none");
            Hc || (isiPhoneIpod && k.find(".big_play").remove(), "undefined" !== typeof vplpVideoStart && vplpVideoStart(K, M, y.getCounter()), Hc = !0);
            "undefined" !== typeof vplpPlay && vplpPlay(K, M, y.getCounter());
            wa = !0
        }

        function Gc(b) {
            !Dc && ca && Hc && wa && void 0 != A.link && (void 0 != A.target && "_blank" == A.target ? window.open(A.link) : window.location = A.link);
            Dc = !1;
            re.find("i").removeClass("fa-pause").addClass("fa-play");
            nb && se.find("span").html("Play");
            ub("on");
            "undefined" !==
            typeof vplpPause && vplpPause(K, M, y.getCounter());
            wa = !1
        }

        function ge(b) {
            q.videoWidth && (Va = q.videoWidth);
            q.videoHeight && (Wa = q.videoHeight);
            Rb();
            Oa && clearInterval(Oa);
            Oa = setInterval(rf, sf);
            q.play();
            S = !0;
            Q.stop().animate({
                opacity: 1
            }, {
                duration: 300
            });
            if (tb && Qb) try {
                q.currentTime = Qb - 2
            } catch (d) {}
            tb || ne();
            isMobile ? Sa = !0 : jc(!0);
            db()
        }

        function jc(b) {
            Sa = pd = me = b;
            v && v.setAutoPlay(b)
        }

        function Fa() {
            if (-1 == y.getCounter()) return !1;
            "local" == x ? S || Sa ? C ? q.paused ? q.play() : q.pause() : "undefined" !== typeof z(B) && z(B).pb_togglePlayback() :
                (oa.css("display", "block"), ub("off"), ba && ba.stop().animate({
                    opacity: 0
                }, {
                    duration: 500,
                    complete: function() {
                        ba.remove();
                        ba = null
                    }
                }), C ? of() : "undefined" !== typeof z(B) && z(B).pb_play(Ra, Ta, ja.width(), ja.height(), "local", !0, tb ? Qb : null)) : "youtube" == x && (C ? v && v.togglePlayback() : ("undefined" !== typeof z(B) && z(B).pb_togglePlayback(), S = !0));
            S = !0;
            return !1
        }

        function rf() {
            var b;
            if ("local" == x) {
                if (C) {
                    Lc.find("p").html(Tc(q.currentTime));
                    Mc.find("p").html(Uc(q.duration));
                    if (!Ab) {
                        sc.width(q.currentTime / q.duration * ka);
                        try {
                            var d =
                                Math.floor(q.buffered.end(0))
                        } catch (p) {}
                        isNaN(d) || (b = d / Math.floor(q.duration), isNaN(b) || td.width(b * ka))
                    }
                    b = parseInt(parseInt(q.currentTime), 10)
                }
            } else "youtube" == x && C && (Lc.find("p").html(Tc(v.getCurrentTime())), Mc.find("p").html(Uc(v.getDuration())), v && !Ab && (sc.width(v.getCurrentTime() / v.getDuration() * ka), b = v.getVideoBytesLoaded() / v.getVideoBytesTotal(), td.width(b * ka), b = parseInt(v.getCurrentTime(), 10)));
            ca && Jc && null != Qa && !Mb && (b < Qa ? Nb.find("p").html(vf + " " + (Qa - b).toString()) : (Mb = !0, nd.hide(), Nb.hide(),
                od.show(), Wb = !1))
        }

        function Fc() {
            "undefined" !== typeof vplpVideoEnd && vplpVideoEnd(K, M, y.getCounter());
            if (ca) mc = !0, Gb();
            else if (vg) fe();
            else if ("local" == x) {
                if (C) {
                    try {
                        q.currentTime = 0
                    } catch (b) {}
                    q.paused && q.play();
                    Sa || q.pause()
                }
            } else "youtube" == x && C && (Sa ? v.play() : ub("off"))
        }

        function lf(b) {
            b.preventDefault();
            b = c(this);
            if (1 == b.data("active")) return !1;
            Ic && Ic.removeClass("captionOver").addClass("captionOut").data("active", !1).css("cursor", "pointer");
            Ic = b.removeClass("captionOut").addClass("captionOver").data("active", !0).css("cursor", "default");
            Nc = b.attr("data-srclang");
            uf();
            "undefined" !== typeof vplpCaptionChange && vplpCaptionChange(K, M, Nc)
        }

        function uf() {
            if (Nc) {
                var b = q.textTracksNew,
                    d = 0,
                    c = b.length;
                if ("none" == Nc)
                    for (d; d < c; d++) b[d].mode = 0;
                else
                    for (d; d < c; d++) b[d].mode = b[d].language == Nc ? 2 : 0
            }
        }

        function mf() {
            c(this).removeClass("captionOut").addClass("captionOver");
            return !1
        }

        function nf() {
            1 != c(this).data("active") && c(this).removeClass("captionOver").addClass("captionOut");
            return !1
        }

        function je(b, d, e) {
            if ("youtube" == b) {
                var f =
                    v.getQualityLevels();
                Pb = v.getCurrQuality()
            } else "youtube_flash" == b ? (f = e, Pb = d) : (f = [], Ob = [], wf = [], c.each(c(A.item)[0].attributes, function(b, d) {
                if (/mp4/.test(d.name) && 0 == d.name.indexOf("data-mp4")) {
                    var c = d.name.substr(9).toLowerCase();
                    G(c) && (c = "default");
                    f.push(c);
                    Ob.push({
                        quality: c,
                        mp4: d.value
                    })
                }
            }), Pb = d ? d : Ob[0].quality);
            if (0 != f.length) {
                b = 0;
                d = f.length;
                var p;
                lb = c("<ul class='quality_menu'></ul>").appendTo(Za);
                for (b; b < d; b++) e = f[b], p = c("<li/>").appendTo(lb), p = c('<a href="#"/>').text(e).addClass("qualityOut").attr("data-quality",
                    e).bind("click", wg).appendTo(p), isMobile || p.bind("mouseover", xg).bind("mouseout", yg), wf.push({
                    quality: e,
                    item: p
                }), Pb == e && (default_exist = !0, Sb = p.removeClass("qualityOut").addClass("qualityOver").data("active", !0).css("cursor", "default"));
                sd.css("display", "block");
                oc()
            }
        }

        function tf(b) {
            lb && lb.find("a").each(function() {
                c(this).attr("data-quality") == b && (Sb && Sb.removeClass("qualityOver").addClass("qualityOut").data("active", !1).css("cursor", "pointer"), Sb = c(this).removeClass("qualityOut").addClass("qualityOver").data("active", !0).css("cursor", "default"))
            })
        }

        function wg() {
            var b = c(this);
            if (1 == b.data("active")) return !1;
            Sb && Sb.removeClass("qualityOver").addClass("qualityOut").data("active", !1).css("cursor", "pointer");
            b && (Sb = b.removeClass("qualityOut").addClass("qualityOver").data("active", !0).css("cursor", "default"));
            b = b.attr("data-quality");
            if ("local" == x) {
                var d = 0,
                    e = Ob.length;
                for (d; d < e; d++)
                    if (b == Ob[d].quality) {
                        Pb = b;
                        break
                    }
                Qb = null;
                if (C) {
                    if (q) try {
                        Qb = q.currentTime
                    } catch (r) {}
                } else "undefined" !== typeof z(B) && (Qb = z(B).pb_getTime());
                Gb(!0)
            } else v.setPlaybackQuality(b);
            return !1
        }

        function xg() {
            c(this).removeClass("qualityOut").addClass("qualityOver");
            return !1
        }

        function yg() {
            1 != c(this).data("active") && c(this).removeClass("qualityOver").addClass("qualityOut");
            return !1
        }

        function jf(b, d, e) {
            c.ajax({
                type: "POST",
                url: pa + "includes/mail.php",
                data: "mail=" + b + "&name=" + d + "&path=" + e
            }).done(function(b) {
                kc = !1
            }).fail(function(b, d, c) {
                alert("Send email error: " + b.responseText);
                xf();
                kc = !1
            });
            ud.css({
                marginTop: -ud.height() / 2 + "px",
                display: "block"
            }).stop().animate({
                opacity: 1
            }, {
                duration: 500
            });
            Oc && clearTimeout(Oc);
            Oc = setTimeout(xf, zg)
        }

        function xf() {
            Oc && clearTimeout(Oc);
            ud.stop().animate({
                opacity: 0
            }, {
                duration: 500,
                complete: function() {
                    ud.css("display", "none")
                }
            })
        }

        function hf() {
            for (var b = prompt("Please enter your email address where download link will be sent:"), d = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                (!d.test(b) || G(b)) && null != b;) b = prompt("Please enter a valid email address:");
            return b
        }

        function yf() {
            var b = parseInt(16777215 * Math.random(), 10);
            jd = c("<div/>").addClass("flashPreview").append(df(b));
            jd.prependTo(gc);
            Ma && clearInterval(Ma);
            Ma = setInterval(function() {
                "undefined" !== typeof z(Tb) && void 0 != z(Tb).setData && (clearInterval(Ma), e.flash_id || (e.flash_id = vplp_mediaArr.length - 1), z(Tb).setData(e), G(ia) ? dc() : Fb())
            }, 20)
        }

        function df(b) {
            var d = pa + "fallback2.swf";
            b = "flashPreview" + b;
            Tb = "#" + b;
            return c('<object id="' + b + '" type="application/x-shockwave-flash" data="' + d + '" width="100%" height="100%"><param name="movie" value="' + d + '" /><param name="allowScriptAccess" value="always" /><param name="bgcolor" value="#000000" /><param name="allowfullscreen" value="true" /><param name="wmode" value="transparent" /><a href="' +
                Y + '//get.adobe.com/flashplayer/" target="_blank"><img src="' + Y + '//www.adobe.com/images/shared/download_buttons/get_flash_player.gif" /></a></object>')
        }

        function mg(b) {
            Ma && clearInterval(Ma);
            Ma = setInterval(function() {
                "undefined" !== typeof z(Tb) && void 0 != z(Tb).pb_play && (clearInterval(Ma), z(Tb).pb_play(b))
            }, 20)
        }

        function Ag() {
            void 0 != z(B).setData && (te && clearInterval(te), z(B).setData(e), sa ? yf() : G(ia) ? dc() : Fb())
        }

        function z(b) {
            "#" == b.charAt(0) && (b = b.substr(1));
            return isSafari ? window[b] : -1 != navigator.appName.indexOf("Microsoft") ?
                window[b] : document[b]
        }

        function eg() {
            if ("list" == u) {
                var b = vplp_mediaArr.length - 1,
                    d = "flashMain" + b;
                B = "#" + d;
                e.flash_id = b;
                b = pa + "fallback.swf";
                d = c('<object id="' + d + '" type="application/x-shockwave-flash" data="' + b + '" width="100%" height="100%"><param name="movie" value="' + b + '" /><param name="allowScriptAccess" value="always" /><param name="bgcolor" value="#000000" /><param name="allowfullscreen" value="true" /><param name="wmode" value="transparent" /><a href="' + Y + '//get.adobe.com/flashplayer/" target="_blank"><img src="' +
                    Y + '//www.adobe.com/images/shared/download_buttons/get_flash_player.gif" /></a></object>');
                c("<div/>").addClass("flashMain").append(d).prependTo(O);
                var f = setInterval(function() {
                    "undefined" !== typeof z(B) && (clearInterval(f), te = setInterval(Ag, 100))
                }, 50)
            } else sa ? yf() : G(ia) ? dc() : Fb()
        }

        function ne() {
            vd = !1;
            void 0 != A.description && (vd = !0, Bg.html(A.description), ke.css({
                opacity: 0,
                display: "block"
            }).stop().animate({
                opacity: 1
            }, {
                duration: 500
            }), Cg && de());
            A.download && rd.css("display", "block");
            oc()
        }

        function de() {
            sb ?
                (Na.stop().animate({
                    opacity: 0
                }, {
                    duration: 500,
                    complete: function() {
                        Na.css("display", "none")
                    }
                }), sb = !1) : (Kc && qa.hide(), Na.css({
                    opacity: 0,
                    display: "block"
                }), Ub ? (Ub.reinitialise(), Ub.scrollToY(0)) : (Ub = Na.jScrollPane().data().jsp, Na.bind("jsp-initialised", function(b, d) {}), Na.jScrollPane({
                    verticalDragMinHeight: 100,
                    verticalDragMaxHeight: 100,
                    mouseWheelSpeed: 30
                })), Na.stop().animate({
                    opacity: 1
                }, {
                    duration: 500
                }), sb = !0)
        }

        function zf() {
            Ub && (Ub.reinitialise(), Ub.scrollToY(0))
        }

        function Dg(b) {
            if (!g || n) return !1;
            "list" ==
            u && ("undefined" === typeof b && (parseInt(ma.css("left"), 10) != -Kb ? b = "off" : "on"), "off" == b ? (sa && rb(), ma.css("left"), ma.css("left", -Kb + "px")) : ue())
        }

        function Zf(b) {
            if (!g || n || !W) return !1;
            b || (b = window.event);
            b.cancelBubble ? b.cancelBubble = !0 : b.stopPropagation && b.stopPropagation();
            db();
            return !1
        }

        function $f(b) {
            if (!g || n || !W) return !1;
            b || (b = window.event);
            b.cancelBubble ? b.cancelBubble = !0 : b.stopPropagation && b.stopPropagation();
            Oe && "fullscreen" != ya && qd();
            return !1
        }

        function ag(b) {
            if (!g || n || !W) return !1;
            b || (b = window.event);
            b.cancelBubble ? b.cancelBubble = !0 : b.stopPropagation && b.stopPropagation();
            return !1
        }

        function db() {
            if ("wall" == u || "wall_popup" == u) return !1;
            ca ? vd && vb.css("display", "block") : vb.css("display", "block");
            if (!S) return !1;
            ca ? (Af && va.css("display", "block"), Jc && nc.css("display", "block")) : va.css("display", "block");
            oc()
        }

        function Td() {
            if ("wall" == u || "wall_popup" == u) return !1;
            ca ? vd && vb.css("display", "block") : vb.css("display", "block");
            if (!S) return !1;
            ca ? (Af && va.css("display", "block"), Jc && nc.css("display", "block")) : va.css("display",
                "block")
        }

        function qd() {
            if ("wall" == u || "wall_popup" == u) return !1;
            vb.css("display", "none");
            va.css("display", "none");
            Ja && k.find(".tooltipstered").tooltipster("hide");
            ca && nc && nc.css("display", "none")
        }

        function Qd() {
            ue();
            "fullscreen" == ya ? wd() : "local" == x ? S ? C && Rb() : qe(ba) : "youtube" == x && Rb();
            oc();
            sb && zf();
            if (Kc) {
                yb.css("left", 0);
                var b = yb.width();
                b + parseInt(qa.css("left"), 10) > O.width() && (b = O.width() - parseInt(qa.css("left"), 10));
                qa.width(b)
            }
            ib && (b = Q.height(), captionator.setHeight(b), captionator.setRedraw(!1))
        }

        function ue() {
            if (!bd && "list" == u) {
                if ("fullscreen" != ya) {
                    var b = 0 != k.width() ? k.width() : Math.max(Pc.width(), document.documentElement.clientWidth),
                        d = 0 != k.height() ? k.height() : ve();
                    "vertical" == V ? (b < 400 + xd ? (ma.removeClass("playlistHolder").addClass("playlistHolder_small"), O.css({
                        width: b - ma.width() + "px"
                    })) : (O.css({
                        width: (we ? b - xd : b - xd > Bf ? Bf : b - xd) + "px"
                    }), ma.removeClass("playlistHolder_small").addClass("playlistHolder")), b = O.width(), ma.css({
                        left: b + "px"
                    }), Q.css({
                        width: b + "px"
                    }), Ua.css({
                        width: b + "px"
                    }), xa && xa.css({
                        width: b +
                            "px"
                    }), va.css({
                        width: b + "px"
                    })) : (we && (O.css({
                        height: d - ma.height() + "px"
                    }), b = O.height(), xa && xa.css({
                        height: b + "px"
                    }), Q.css({
                        height: b + "px"
                    }), Ua.css({
                        height: b + "px"
                    }), va.css({
                        top: b - va.height() + "px"
                    })), ma.css({
                        left: "0px"
                    }))
                } else b = O.width(), d = O.height(), "vertical" == V ? (O.css({
                    width: b + "px"
                }), Q.css({
                    width: b + "px"
                }), Ua.css({
                    width: b + "px"
                }), va.css({
                    width: b + "px"
                })) : we && (O.css({
                    height: d + "px"
                }), Q.css({
                    height: d + "px"
                }), Ua.css({
                    height: d + "px"
                }), xa && xa.css({
                    height: d + "px"
                }), va.css({
                    top: O.height() - va.height() + "px"
                }));
                b = E =
                    0;
                for (b; b < D; b++) d = c(I[b].item), E = "horizontal" == V ? E + d.outerWidth(!0) : E + d.outerHeight(!0);
                "buttons" == $a ? ("horizontal" == V ? (H.css("left", "0px"), Zb.width(E)) : H.css("top", "0px"), Gd()) : "scroll" == $a && ("horizontal" == V && W.width(E), Md())
            }
        }

        function wd() {
            fa && clearTimeout(fa);
            ra.unbind("mousemove", xe);
            "fullscreen" == ya ? (c("html").addClass("fsOverflow"), "list" == u && O.removeClass("playerHolder").addClass("playerHolder_fs"), isMobile ? fa = setTimeout(function() {
                clearTimeout(fa);
                ye()
            }, Qc) : (ra.bind("mousemove", xe), fa = setTimeout(function() {
                clearTimeout(fa);
                xe()
            }, Qc)), Pa && "local" != x && Pa.show(), Dg("off"), Cf("off"), "undefined" !== typeof vplpFsEnter && vplpFsEnter(K, M)) : (c("html").removeClass("fsOverflow"), "list" == u && O.removeClass("playerHolder_fs").addClass("playerHolder"), Pa && Pa.hide(), Cf("on"), "undefined" !== typeof vplpFsExit && vplpFsExit(K, M));
            ue();
            ba && qe(ba);
            C && Rb();
            sb && zf();
            oc();
            db();
            ib && (Rc && clearTimeout(Rc), Rc = setTimeout(Eg, 100))
        }

        function Eg() {
            Rc && clearTimeout(Rc);
            var b = Q.height();
            captionator.setHeight(b)
        }

        function xe(b) {
            if (!S) return !1;
            fa && clearTimeout(fa);
            b && (Df != b.clientX && Td(), Df = b.clientX);
            fa = setTimeout(function() {
                qd()
            }, Qc)
        }

        function ye() {
            fa && clearTimeout(fa);
            qd();
            fa = setTimeout(function() {
                clearTimeout(fa);
                ye()
            }, Qc)
        }

        function oc() {
            var b = "block" == Lc.css("display") ? Fg : 0,
                d = "block" == Mc.css("display") ? Gg : 0,
                c = "block" == ze.css("display") ? Hg : 0,
                e = "block" == Ae.css("display") ? Ig : 0,
                f = "block" == md.css("display") ? Jg : 0,
                l = "block" == sd.css("display") ? Kg : 0,
                g = "block" == rd.css("display") ? Lg : 0;
            Mg && (e = 0);
            Ef = Ng + b + d + c + e + f + l + g;
            Ff = va.width();
            ka = Ff - Ef - Gf;
            Bb.width(ka + Gf - 1);
            Kd.width(ka)
        }

        function qe(b) {
            if (!b) return !1;
            var d, c, e;
            c = Ua.width();
            e = Ua.height();
            0 == Ta ? d = Be() : 1 == Ta ? d = yd(!0, b, oe, pe) : 2 == Ta && (d = yd(!1, b, oe, pe));
            c = parseInt((c - d.width) / 2, 10);
            e = parseInt((e - d.height) / 2, 10);
            b.css({
                width: d.width + "px",
                height: d.height + "px",
                left: c + "px",
                top: e + "px"
            })
        }

        function Rb() {
            if (-1 == y.getCounter()) return !1;
            var b, d, c;
            d = Q.width();
            c = Q.height();
            0 == Ta ? b = Be() : 1 == Ta ? b = yd(!0) : 2 == Ta && (b = yd(!1));
            d = parseInt((d - b.width) / 2, 10);
            c = parseInt((c - b.height) / 2, 10);
            "local" == x ? ea && ea.css({
                width: b.width + "px",
                height: b.height +
                    "px",
                left: d + "px",
                top: c + "px"
            }) : "youtube" == x && xa && xa.css({
                width: b.width + "px",
                height: b.height + "px",
                left: d + "px",
                top: c + "px"
            })
        }

        function yd(b, d, c, e) {
            var f = O.width(),
                l = 0 != Hf("h") ? Hf("h") : ve(),
                p = {};
            d ? "undefined" !== typeof c && "undefined" !== typeof e ? d = e : (c = d.width(), d = d.height()) : (d = Be(), c = d.width, d = d.height);
            e = (f - 0) / (l - 0);
            var g = c / d;
            g < e ? b ? (p.width = (l - 0) / d * c, p.height = l - 0) : (p.height = (f - 0) / c * d, p.width = f - 0) : g > e ? b ? (p.height = (f - 0) / c * d, p.width = f - 0) : (p.width = (l - 0) / d * c, p.height = l - 0) : (p.width = f - 0, p.height = l - 0);
            return p
        }

        function Be() {
            var b = {};
            "local" == x ? !Va || isNaN(Va) || !Wa || isNaN(Wa) ? q ? (b.width = q.videoWidth, b.height = q.videoHeight) : (b.width = 640, b.height = 360) : (b.width = Va, b.height = Wa) : "youtube" == x && (!Va || isNaN(Va) || !Wa || isNaN(Wa) ? (b.width = 640, b.height = 360) : (b.width = Va, b.height = Wa));
            return b
        }

        function Hf(b) {
            return "w" == b ? "normal" == ya ? ja.width() : Math.max(Pc.width(), document.documentElement.clientWidth) : "normal" == ya ? ja.height() : ve()
        }

        function ve() {
            return Math.max(Pc.height(), document.documentElement.clientHeight)
        }

        function Cf(b) {
            "on" ==
            b ? (Ae.find("i").removeClass().addClass("fa fa-expand ap_fs_ent icon_color"), nb && If.find("span").html("Fullscreen")) : (Ae.find("i").removeClass().addClass("fa fa-compress ap_fs_exit icon_color"), nb && If.find("span").html("Exit Fullscreen"))
        }

        function ff(b) {
            Ce = 0;
            ya = "normal" == ya ? "fullscreen" : "normal";
            if (zd) {
                var d = document.documentElement;
                d.requestFullscreen ? document.fullscreenElement || document.fullscreenElement ? document.exitFullscreen() : d.requestFullscreen() : d.webkitRequestFullScreen ? document.webkitIsFullScreen ?
                    document.webkitCancelFullScreen() : d.webkitRequestFullScreen() : d.msRequestFullscreen ? document.msIsFullscreen || document.msFullscreenElement ? document.msExitFullscreen() : d.msRequestFullscreen() : d.mozRequestFullScreen && (document.fullscreenElement || document.mozFullScreenElement ? document.mozCancelFullScreen() : d.mozRequestFullScreen())
            }
            zd ? "normal" == ya && b && wd() : (wd(), ib && captionator.setRedraw(!1))
        }

        function G(b) {
            return 0 == b.replace(/^\s+|\s+$/g, "").length
        }

        function kf() {
            Lc.find("p").html("00:00");
            Mc.find("p").html("00:00");
            sc.width(0);
            td.width(0)
        }

        function gg(b, d, c) {
            "title" == d ? b.sort(function(b, d) {
                return b.title == d.title ? 0 : b.title < d.title ? -1 : 1
            }) : "type" == d ? b.sort(function(b, d) {
                return b.type == d.type ? 0 : b.type < d.type ? -1 : 1
            }) : "filename" == d && b.sort(function(b, d) {
                return b.filename == d.filename ? 0 : b.filename < d.filename ? -1 : 1
            });
            c && b.reverse()
        }

        function Tc(b) {
            b = Math.round(b);
            minutes = Math.floor(b / 60);
            minutes = 10 <= minutes ? minutes : "0" + minutes;
            b = Math.floor(b % 60);
            return minutes + ":" + (10 <= b ? b : "0" + b)
        }

        function Uc(b) {
            b = Math.round(b);
            minutes =
                Math.floor(b / 60);
            minutes = 10 <= minutes ? minutes : "0" + minutes;
            b = Math.floor(b % 60);
            return minutes + ":" + (10 <= b ? b : "0" + b)
        }

        function Ud(b) {
            var d = {};
            d.item = b.clone();
            d.type = b.attr("data-type");
            "local" != d.type && (d.path = d.id = b.attr("data-path"), void 0 == b.attr("data-limit") || G(b.attr("data-limit")) || (d.limit = parseInt(b.attr("data-limit"), 10)), void 0 == b.attr("data-order") || G(b.attr("data-order")) || (d.order = b.attr("data-order")), void 0 == b.attr("data-query") || G(b.attr("data-query")) || (d.query = b.attr("data-query")), void 0 ==
                b.attr("data-quality") || G(b.attr("data-quality")) || (d.quality = b.attr("data-quality")));
            if (da) {
                if (void 0 == b.attr("data-address") || G(b.attr("data-address"))) return b = "local" == d.type ? b.attr("data-mp4") : b.attr("data-path"), alert("data-address attribute missing on playlist item: " + b), !1;
                d.deeplink = b.attr("data-address")
            }
            void 0 == b.attr("data-preview") || G(b.attr("data-preview")) || (d.preview = b.attr("data-preview"));
            void 0 == b.attr("data-thumb") || G(b.attr("data-thumb")) || (d.thumb = b.attr("data-thumb"));
            void 0 ==
                b.attr("data-video-preview") || G(b.attr("data-video-preview")) || (d.video_preview = b.attr("data-video-preview"));
            void 0 == b.attr("data-download") || G(b.attr("data-download")) || (d.download = b.attr("data-download"));
            d.lightbox = {};
            void 0 == b.attr("data-link") || G(b.attr("data-link")) || (d.lightbox.link = b.attr("data-link"));
            void 0 == b.attr("data-hook") || G(b.attr("data-hook")) || (d.lightbox.hook = b.attr("data-hook"));
            void 0 == b.attr("data-weblink") || G(b.attr("data-weblink")) || (d.lightbox.weblink = b.attr("data-weblink"));
            void 0 == b.attr("data-target") || G(b.attr("data-target")) || (d.lightbox.target = b.attr("data-target"));
            b.children("div[class='ap_title']").length && (d.title = c.trim(b.children("div[class='ap_title']").html()));
            b.children("div[class='ap_short_desc']").length && (d.description_short = c.trim(b.children("div[class='ap_short_desc']").html()));
            b.children("div[class='ap_desc']").length && (d.description = c.trim(b.children("div[class='ap_desc']").html()));
            b.children("div[class='track_list']").length && (d.subs = b.children("div[class='track_list']").children());
            return d
        }

        function kg(b) {
            var d = {};
            d.item = b.clone();
            d.type = b.attr("data-type");
            void 0 == b.attr("data-path") || G(b.attr("data-path")) || (d.id = b.attr("data-path"));
            void 0 != b.attr("data-skipEnableTime") && 0 < parseInt(b.attr("data-skipEnableTime"), 10) && (d.skip_time = parseInt(b.attr("data-skipEnableTime"), 10));
            void 0 == b.attr("data-link") || G(b.attr("data-link")) || (d.link = b.attr("data-link"), d.target = "_blank", void 0 == b.attr("data-target") || G(b.attr("data-target")) || (d.target = b.attr("data-target")));
            void 0 == b.attr("data-preview") ||
                G(b.attr("data-preview")) || (d.preview = b.attr("data-preview"));
            b.children("div[class='ap_desc']").length && (d.description = c.trim(b.children("div[class='ap_desc']").html()));
            b.children("div[class='track_list']").length && (d.subs = b.children("div[class='track_list']").children());
            return d
        }

        function Jf(b) {
            var d = ec.find("div[id=" + b + "]").children("div[class*=playlistNonSelected]").eq(0),
                c = d.attr("data-type"),
                d = "local" == c || "youtube_single" == c ? d.attr("data-address") : d.attr("data-address") + 1;
            return b + ("/" + d + "/")
        }
        var pa = e.sourcePath || "",
            g = !1,
            K = this;
        vplp_mediaArr.push({
            player_id: K,
            mediaId: e.mediaId
        });
        var qc = c("body"),
            Pc = c(window),
            ra = c(document),
            Ye = window.location.href,
            Y = window.location.protocol;
        "file:" == Y && (Y = "http:");
        var ac = "",
            Vb = "",
            mb = "",
            Ia, zb = !0;
        "ontouchstart" in window ? (Ia = !0, ac = "touchstart.ap", Vb = "touchmove.ap", mb = "touchend.ap") : (Ia = !1, ac = "mousedown.ap", Vb = "mousemove.ap", mb = "mouseup.ap");
        var Df = 0,
            Kf = function() {
                var b = document.createElement("video");
                return !(!b.canPlayType || !b.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/,
                    ""))
            }();
        (function() {
            var b = document.createElement("video");
            return !(!b.canPlayType || !b.canPlayType('video/ogg; codecs="theora, vorbis"').replace(/no/, ""))
        })();
        (function() {
            var b = document.createElement("video");
            return !(!b.canPlayType || !b.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, ""))
        })();
        var C = !!document.createElement("video").canPlayType;
        if ("list" == e.playlistType) {
            var Ba = '<div class="componentWrapper"><div class="playerHolder"><div class="mediaHolder"></div><div class="mediaPreview"></div><div class="preloader"></div><div class="big_play"><i class="fa fa-play ap_bplay icon_color"></i></div>';
            G(e.logoPath) || (Ba += '<div class="playerLogo hidden ap_tooltip" data-aptitle="' + e.logoTooltipText + '"><a href="' + e.logoUrl + '" target="' + e.logoTarget + '"><img src="' + e.logoPath + '" alt="' + e.logoTooltipText + '" /></a></div>');
            Ba += '<div class="playerControls"><div class="player_toggleControl"><i class="fa fa-play ap_play icon_color"></i></div><div class="player_mediaTime_current"><p>00:00</p></div><div class="player_seekbar"><div class="progress_bg"><div class="load_level"></div><div class="progress_level"></div></div><div class="player_progress_tooltip ap_tooltip" data-aptitle="Time"></div></div><div class="player_mediaTime_total"><p>00:00</p></div><div class="player_captions"><div class="caption_holder"></div><div class="caption_btn ap_tooltip" data-aptitle="Captions"><i class="fa fa-file-text-o ap_cc icon_color"></i></div></div><div class="player_quality"><div class="quality_holder"></div><div class="quality_btn ap_tooltip" data-aptitle="Quality"><i class="fa fa-gear ap_qual icon_color"></i></div></div><div class="player_download ap_tooltip" data-aptitle="Download video"><i class="fa fa-download ap_down icon_color"></i></div><div class="player_volume_wrapper"><div class="player_volume ap_tooltip" data-aptitle="Volume"><i class="fa fa-volume-up ap_vol icon_color"></i></div><div class="volume_seekbar"><div class="player_volume_tooltip ap_tooltip" data-aptitle="Volume"></div><div class="volume_bg"></div><div class="volume_level"></div></div></div><div class="player_fullscreen ap_tooltip" data-aptitle="Toggle Fullscreen"><i class="fa fa-expand ap_fs_ent icon_color"></i></div></div><div class="infoHolder"><div class="info_inner"></div></div><div class="player_addon"><div class="info_toggle ap_tooltip" data-aptitle="Description"><i class="fa fa-info-circle ap_pl_info icon_color"></i></div>';
            e.useShare && (Ba += '<div class="ap_share"><div class="ap_share_btn ap_tooltip" data-aptitle="Share"><i class="fa fa-share-square ap_pl_share icon_color"></i></div><div class="ap_share_holder"><div class="ap_share_wrapper"><ul><li><a class="ap_tooltip" href="#" data-type="facebook" data-aptitle="Share on Facebook"><i class="fa fa-facebook-square"></i></a></li><li><a class="ap_tooltip" href="#" data-type="twitter" data-aptitle="Share on Twitter"><i class="fa fa-twitter-square"></i></a></li><li><a class="ap_tooltip" href="#" data-type="google" data-aptitle="Share on Google"><i class="fa fa-google-plus-square"></i></a></li><li><a class="ap_tooltip" href="#" data-type="pinterest" data-aptitle="Share on Pinterest"><i class="fa fa-pinterest-square"></i></a></li><li><a class="ap_tooltip" href="#" data-type="stumbleupon" data-aptitle="Share on Stumbleupon"><i class="fa fa-stumbleupon"></i></a></li></ul></div></div></div>');
            Ba += '</div><div class="ap_adv_skip"><div class="ap_adv_msg"><p>' + e.advertSkipVideoText + '</p></div><div class="ap_adv_img"></div><div class="ap_adv_msg_end"><p>' + e.advertSkipBtnText + "</p></div></div></div>";
            e.showPlaylist && (Ba += '<div class="playlistHolder"><div class="componentPlaylist"><div class="playlist_inner"><div class="playlist_content"></div></div></div>', "buttons" == e.scrollType && (Ba = "vertical" == e.playlistOrientation ? Ba + '<div class="thumbBackward"><i class="fa fa-chevron-up ap_pl_back icon_color"></i></div><div class="thumbForward"><i class="fa fa-chevron-down ap_pl_forw icon_color"></i></div></div>' :
                Ba + '<div class="thumbBackward"><i class="fa fa-chevron-left ap_pl_back icon_color"></i></div><div class="thumbForward"><i class="fa fa-chevron-right ap_pl_forw icon_color"></i></div></div>'));
            Ba += "</div>";
            "popup_list.html" == e.popupUrl && (Ba += '<div class="popup_toggle"><p>OPEN IN POPUP</p></div>')
        } else Ba = '<div class="componentWrapper"><div class="playlistHolder"><div class="componentPlaylist"><div class="playlist_inner"><div class="playlist_content"></div></div></div></div> </div><div class="preloader"></div>';
        c(Ba).appendTo(c(this));
        var k = c(this),
            ja = k.find(".componentWrapper"),
            la = k.find(".componentPlaylist");
        k.find(".innerWrapper");
        var u = e.playlistType,
            Zb = "list" == u ? k.find(".playlist_inner") : ja.find(".playlist_inner"),
            gc = k.find(".playlist_content"),
            ma = k.find(".playlistHolder"),
            bd = e.showPlaylist ? !1 : !0,
            ec = c(e.playlistList).css("display", "none"),
            O = k.find(".playerHolder"),
            Bf = O.width(),
            xd = ma.width(),
            Lc = k.find(".player_mediaTime_current"),
            Mc = k.find(".player_mediaTime_total"),
            va = k.find(".playerControls"),
            re = k.find(".player_toggleControl"),
            Bb = k.find(".player_seekbar"),
            Kd = k.find(".progress_bg"),
            td = k.find(".load_level"),
            sc = k.find(".progress_level"),
            Ka = k.find(".volume_seekbar").css("zIndex", 300),
            Ld = k.find(".volume_bg"),
            Ie = k.find(".volume_level"),
            Ae = k.find(".player_fullscreen"),
            md = k.find(".player_captions"),
            Aa = k.find(".caption_holder").css("zIndex", 301),
            wc = k.find(".playerLogo"),
            Ad = e.logoPosition,
            Bd = e.logoXOffset,
            Cd = e.logoYOffset;
        "tl" == Ad ? wc.css({
            top: Cd + "px",
            left: Bd + "px"
        }) : "tr" == Ad ? wc.css({
            top: Cd + "px",
            right: Bd + "px"
        }) : "bl" == Ad ? wc.css({
            bottom: Cd +
                "px",
            left: Bd + "px"
        }) : "br" == Ad && wc.css({
            bottom: Cd + "px",
            right: Bd + "px"
        });
        var Hd = k.find(".caption_btn").css("cursor", "pointer"),
            Nc;
        if (isMobile) Hd.on("click", function() {
            if (!g || n) return !1;
            Za.css("display", "none");
            Sc || t();
            Aa.toggle();
            return !1
        });
        else md.bind("mouseenter", function(b) {
            if (!g || n) return !1;
            Sc || t();
            Aa.css("display", "block")
        }).bind("mouseleave", function(b) {
            if (!g || n) return !1;
            Aa.css("display", "none")
        });
        var Af = e.showControlsInAdvert,
            Wb = e.disableSeekbarInAdvert,
            Jc = e.showSkipButtonInAdvert,
            Qa, Mb, nc = k.find(".ap_adv_skip").css("cursor",
                "pointer").bind("click", function() {
                if (!g || n || !ca || Qa && !Mb) return !1;
                mc = !0;
                isMobile || jc(!0);
                Gb();
                return !1
            }),
            nd = k.find(".ap_adv_img"),
            Nb = k.find(".ap_adv_msg"),
            od = k.find(".ap_adv_msg_end"),
            vf = Nb.find("p").html(),
            sd = ja.find(".player_quality"),
            Za = ja.find(".quality_holder").css("zIndex", 303),
            Id = ja.find(".quality_btn").css("cursor", "pointer");
        if (isMobile) Id.on("click", function() {
            if (!g || n) return !1;
            Aa.css("display", "none");
            T();
            Za.toggle();
            return !1
        });
        else sd.bind("mouseenter", function(b) {
            if (!g || n) return !1;
            T();
            Za.css("display", "block")
        }).bind("mouseleave", function(b) {
            if (!g || n) return !1;
            Za.css("display", "none")
        });
        var rd = k.find(".player_download"),
            kc, gf, ee, pg = 0 == ja.find("iframe[class='dl_iframe']").length ? c('<iframe class="dl_iframe"/>').css({
                position: "absolute",
                left: -Kb + "px",
                display: "none"
            }).appendTo(ja) : ja.find("iframe[class='dl_iframe']");
        if (isMobile) var Oc, zg = 2E3,
            ud = 0 == O.find("div[class='download_confirm']").length ? c('<div class="download_confirm"><p>DOWNLOAD STARTING</p></DIV>').css({
                opacity: 0,
                zIndex: 1E3
            }).appendTo(O) :
            O.find("div[class='download_confirm']");
        var B, Tb, jd, xa, Pa, Ma, sa = isMobile ? !1 : e.useLivePreview;
        C && sa && (youtubeIframePreview = c('<div class="youtubeIframePreview"/>'));
        var Kb = 1E4,
            O = k.find(".playerHolder"),
            Q = k.find(".mediaHolder").bind("click", function() {
                if (!g || n) return !1;
                Fa();
                return !1
            }),
            Ua = k.find(".mediaPreview").bind("click", function() {
                if (!g || n) return !1;
                Fa();
                return !1
            }),
            vb = k.find(".player_addon"),
            Kc;
        k.find(".ap_share").length && (Kc = !0);
        if (Kc) {
            k.find(".ap_share_btn");
            var qa = k.find(".ap_share_holder");
            vb.css({
                visibility: "hidden",
                display: "block"
            });
            qa.css("display", "block");
            var Lf = 0,
                Mf = [],
                Nf, yb = k.find(".ap_share_wrapper");
            yb.find("ul").children("li").each(function() {
                Lf += c(this).outerWidth(!0);
                Mf.push(c(this).children("a[class*=ap_tooltip]"));
                "facebook" == c(this).children("a[class*=ap_tooltip]").attr("data-type").toLowerCase() && (Nf = !0)
            });
            Nf && e.fsAppId && injectFbSdk(e.fsAppId);
            yb.width(Lf);
            vb.css({
                visibility: "visible",
                display: "none"
            });
            qa.css("display", "none");
            isMobile ? Ia && R() : qa.bind("mouseenter", function() {
                if (!g || yb.width() <=
                    qa.width()) return !1;
                qa.unbind("mousemove").bind("mousemove", F);
                return !1
            }).bind("mouseleave", function() {
                if (!g) return !1;
                qa.unbind("mousemove");
                return !1
            });
            c(Mf).each(function() {
                c(this).bind("click", function(b) {
                    y.getCounter();
                    if (A) {
                        var d = c(this).attr("data-type").toLowerCase(),
                            e = (window.screen.width - 600) / 2,
                            f = (window.screen.height - 300) / 2,
                            g = A,
                            l, k = g.title,
                            m = g.description,
                            n = g.title + " \n" + g.description,
                            t;
                        t = g.thumb;
                        var q = document.createElement("a");
                        q.href = t;
                        t = q.href;
                        g = g.deeplink ? g.deeplink : window.location.href;
                        if ("facebook" == d) {
                            if (l = Y + "//www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(t), window.FB) return console.log(g, t, k), window.FB && FB.ui({
                                method: "feed",
                                link: g,
                                picture: t,
                                caption: k
                            }), !1
                        } else "twitter" == d ? l = Y + "//twitter.com/share?url=" + encodeURIComponent(g) + "&text=" + encodeURIComponent(n) : "google" == d ? l = Y + "//plus.google.com/share?url=" + encodeURIComponent(t) : "pinterest" == d ? l = "https://www.pinterest.com/pin/create/button?url=" + encodeURIComponent(t) + "&description=" + encodeURIComponent(k) + "&media=" + encodeURIComponent(t) :
                            "linkedin" == d ? l = Y + "//www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(t) + "&title=" + encodeURIComponent(k) + "&summary=" + encodeURIComponent(m) : "digg" == d ? l = Y + "//digg.com/submit?url=" + encodeURIComponent(g) : "reddit" == d ? l = Y + "//reddit.com/submit?url=" + encodeURIComponent(g) + "&title=" + encodeURIComponent(n) : "tumblr" == d ? l = Y + "//www.tumblr.com/share/link?url=" + encodeURIComponent(g) + "&name=" + encodeURIComponent(k) + "&description=" + encodeURIComponent(m) : "stumbleupon" == d ? l = Y + "//www.stumbleupon.com/submit?url=" +
                            encodeURIComponent(g) + "&title=" + encodeURIComponent(k) : "delicious" == d && (l = Y + "//del.icio.us/post?url=" + encodeURIComponent(g) + "&title=" + encodeURIComponent(n));
                        l && window.open(l, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=600,height=300,left=" + e + ",top=" + f + "")
                    }
                    Ja && c(b.currentTarget).tooltipster("hide");
                    return !1
                })
            })
        }
        var ke = k.find(".info_toggle"),
            Na = k.find(".infoHolder"),
            ze = k.find(".player_volume"),
            pf = k.find(".big_play").css("cursor", "pointer").bind("click", function() {
                if (!g || n) return !1;
                Fa();
                return !1
            });
        k.find(".ap_bplay");
        var Bg = k.find(".info_inner"),
            oa = k.find(".preloader");
        k.find(".playlistControls");
        var oe, pe, A, ca, mc, Se, Hc = !1,
            zc, ld, Vd, yc = !1,
            fc, ua, cb, ic, gd, Xd, aa = [],
            Ob = [],
            wf = [],
            Qb, Pb, tb, M = e.mediaId,
            fg = e.wallPath,
            Sa = e.autoPlay,
            pd = e.autoPlay,
            me = e.autoPlay;
        isMobile && (pd = Sa = !1);
        var vg = e.autoAdvanceToNextVideo,
            Oe = isMobile ? !1 : e.autoHideControls,
            Cg = e.autoOpenDescription,
            V = e.playlistOrientation,
            $a = e.scrollType,
            Dd = e.randomPlay,
            Ed = e.loopingOn,
            Ta = e.aspectRatio,
            we = e.layout100perc,
            Ja = isMobile ? !1 :
            e.useTooltips,
            og = e.autoReuseMailForDownload;
        bd && ma.css("display", "none");
        Kf || (C = !1, Kf = !0);
        var cc, Of, Sd = !1;
        if ("wall" == u || "wall_popup" == u) cc = -1;
        isMobile && (Ta = 1);
        isiPhoneIpod && (Na.remove(), va.remove(), vb.remove(), c(e.dropdownId).remove(), c("#videoSearch").remove(), k.after(nc.css({
            position: "relative",
            "float": "left",
            clear: "both",
            left: 0,
            top: 0
        })));
        var Dc = !1,
            I = [],
            ia, Ve, n = !1,
            Yd = !1,
            Lb = !1,
            vd, Jb, Cc, W, Bc, Te, Ue, bf, Zd, gb, Ib, Ce = 0,
            zd = !1,
            Mg = !1;
        (function() {
            var b = !1;
            if (document.fullscreenEnabled || document.webkitFullscreenEnabled ||
                document.mozFullScreenEnabled || document.msFullscreenEnabled) b = !0;
            else if (document.documentElement.requestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.msRequestFullscreen || document.documentElement.oRequestFullscreen || document.documentElement.webkitRequestFullScreen) b = !0;
            return b
        })() && (zd = !0);
        isIOS && k.find(".player_volume_wrapper").remove();
        var Ng = k.find(".player_toggleControl").outerWidth(!0),
            Fg = k.find(".player_mediaTime_current").outerWidth(!0),
            Gg = k.find(".player_mediaTime_total").outerWidth(!0),
            Hg = k.find(".player_volume_wrapper").outerWidth(!0),
            Ig = k.find(".player_fullscreen").outerWidth(!0),
            Jg = k.find(".player_captions").outerWidth(!0),
            Kg = k.find(".player_quality").outerWidth(!0),
            Lg = k.find(".player_download").outerWidth(!0),
            v, hb, ta = 0,
            eb = [],
            le, ce, ug = !0,
            qf, ba, ib, Rc, Ic, xb, Sc, Sb, lb, S, Ra, id, be, wa, ed, fd, kd, te, Re, Qc = e.controlsTimeout,
            fa, sf = 100,
            Oa, hc = [],
            Ac = [],
            fb = [],
            hd = [],
            D = 0,
            Va, Wa, x, ya = "normal",
            ea, q, sb, Ub, Yb, $b, Cb, Db, P, E, H;
        "list" == u && "buttons" == $a && (H = Zb, Ia && Uf());
        var Qe = new APYTLoader(e);
        c(Qe).on("APYTLoader.END_LOAD",
            function(b, d) {
                var c, e = d.length,
                    f;
                for (c = 0; c < e; c++) f = d[c], Hb || (f.item = aa[ta].item.clone()), eb.push(f);
                xc()
            });
        var Pf = [re, k.find(".ap_share_btn"), ke, k.find(".player_volume"), k.find(".player_fullscreen"), rd, k.find(".player_prev"), k.find(".player_next"), k.find(".thumbBackward"), k.find(".thumbForward"), k.find(".quality_btn"), k.find(".caption_btn")],
            Qf, Og = Pf.length,
            Fd = 0;
        for (Fd; Fd < Og; Fd++) Qf = c(Pf[Fd]).css("cursor", "pointer").bind("click", ng), isMobile || Qf.bind("mouseenter", qg).bind("mouseleave", rg);
        var nb;
        if (e.contextMenuType) {
            nb = !0;
            var Jd = e.contextMenuType,
                De = '<div class="ap-context-menu"><ul><li class="ap-context-play"><span>Play</span></li><li class="ap-context-mute"><span>Mute</span></li><li class="ap-context-full"><span>Fullscreen</span></li>';
            G(e.contextMenuText) || (De += '<li class="ap-context-copyright"><span>' + e.contextMenuText + "</span></li>");
            De += "</ul></div>";
            contextMenu = c(De);
            "custom" == Jd && contextMenu.appendTo(qc);
            var se = c(".ap-context-play").css("cursor", "pointer").on("click", Fa),
                If = c(".ap-context-full").css("cursor",
                    "pointer").on("click", ff),
                Je = c(".ap-context-mute").css("cursor", "pointer").on("click", function() {
                    jb();
                    Da()
                });
            if (!G(e.contextMenuLink)) c(".ap-context-copyright").css("cursor", "pointer").on("click", za);
            Sa || se.find("span").html("Play");
            qc.on("mouseleave", N);
            ra.bind("contextmenu", N).keyup(function(b) {
                27 == b.keyCode && N()
            });
            k.bind("contextmenu", m)
        }
        var Ab = !1,
            Ef, Ff, ka, Gf = 30;
        Bb.css("cursor", "pointer").bind(ac, function(b) {
            if (ca && Wb) return !1;
            Ga(b);
            return !1
        });
        if (!isMobile) {
            var tc = k.find(".player_progress_tooltip").css({
                left: parseInt(Bb.css("left"),
                    10) + "px",
                zIndex: 302
            });
            Bb.bind("mouseover", Ca)
        }
        var Wc = !0,
            J = e.defaultVolume,
            Vc;
        0 > J && (J = 0);
        0 == J ? Vc = .5 : 1 < J && (J = 1);
        0 != J && (Vc = J);
        var rc = !1,
            Xb = Ld.height();
        Ie.css("height", J * Xb + "px");
        var uc = !1,
            U, Xc = 3E3;
        isMobile ? ze.bind("click", function() {
            if (!g) return !1;
            U && clearTimeout(U);
            return !1
        }) : ze.bind("mouseover", function() {
            if (!g) return !1;
            U && clearTimeout(U);
            Ka.css("display", "block");
            uc = !0;
            return !1
        }).bind("mouseout", function() {
            if (!g) return !1;
            U && clearTimeout(U);
            U = setTimeout(kb, Xc);
            return !1
        });
        0 == J && k.find(".player_volume").find("i").removeClass("fa-volume-up").addClass("fa-volume-off");
        Ka.css("cursor", "pointer").bind(ac, function(b) {
            wb(b);
            return !1
        });
        if (!isMobile) {
            Ka.bind("mouseover", pc);
            var ob = ja.find(".player_volume_tooltip"),
                Vf = parseInt(ob.css("top"), 10);
            ob.bind("mouseenter", function() {
                Ka.unbind("mouseover", pc);
                ob.css("display", "none")
            }).bind("mouseleave", function() {
                Ka.bind("mouseover", pc)
            })
        }
        var Pe, Hb = !1,
            Le = [];
        c("#ap_api_num_res");
        var Rf = c("#ap_api_query_title"),
            Ee = c("#ap_api_query_v").focusin(function() {
                Rf.removeClass("ap_hap_error")
            }),
            Pg = c("#ap_api_limit_v").on("keyup.ap", function() {
                this.value =
                    this.value.replace(/[^0-9]/g, "")
            }),
            Qg = c("#ap_api_youtube_sort_v"),
            Sf = c("#api_panel_wrap"),
            Rg = c("#ap_api_append"),
            Tf = c(".toggle_search");
        c("#ap_api_youtube_feature_v");
        var Sg = c("#ap_api_path_title_v"),
            Fe;
        c("#api_panel_title_wrap").css("cursor", "pointer").bind("click", function(b) {
            if (!g || n) return !1;
            Fe ? (Sf.hide(400), Tf.removeClass("toggle_search_close").addClass("toggle_search"), Fe = !1) : (Sf.show(400), Tf.removeClass("toggle_search").addClass("toggle_search_close"), Fe = !0);
            return !1
        });
        c("#ap_api_execute").find("span").css("cursor",
            "pointer").bind("click", function(b) {
            if (!g || n) return !1;
            if (G(Ee.val())) return Rf.addClass("ap_hap_error"), alert("Please fill missing fields!"), !1;
            ta = 0;
            eb = [];
            aa = [];
            b = {
                fromapi: !0,
                type: "youtube_video_query"
            };
            b.path = b.id = Sg.val();
            b.order = Qg.val();
            b.limit = parseInt(Pg.val(), 10);
            b.query = Xd = Ee.val();
            da && (b.deeplink = Ee.val());
            aa.push(b);
            if ("yes" != Rg.find('input:radio[name="ap_api_append"]:checked').val() && (dd(), da)) {
                na = null;
                bc = !1;
                Eb = null;
                b = 0;
                var d = X.length;
                for (b; b < d; b++) X[b] && X[b].fromapi && X.splice(b, 1)
            }
            D = aa.length;
            Hb = !0;
            oa.css("display", "block");
            cd();
            return !1
        });
        var y = c.playlistManager({
            randomPlay: Dd,
            loopingOn: Ed
        });
        c(y).bind("ap_PlaylistManager.COUNTER_READY", function() {
            Ec();
            Of = y.getCounter();
            da ? pb ? (pb = !1, Pd(), Gb()) : (c.address.value(X[na].categoryName + "/" + X[na].mediaName[y.getCounter()]), c.address.history() || c.address.history(!0)) : (Pd(), Gb())
        }).bind("ap_PlaylistManager.PLAYLIST_END", function() {
            "undefined" !== typeof vplpPlaylistEnd && vplpPlaylistEnd(K, M)
        }).bind("ap_PlaylistManager.PLAYLIST_END_ALERT", function() {
            "undefined" !==
            typeof vplpPlaylistEnd && vplpPlaylistEnd(K, M)
        });
        var X = [],
            Ge;
        ec.children("div[data-address]").each(function() {
            var b = {};
            Ge = c(this);
            b.categoryName = Ge.attr("data-address");
            b.id = Ge.attr("id");
            X.push(b)
        });
        var Xe = X.length + 1,
            da = e.useDeeplink;
        if ("wall" == u || "wall_popup" == u) da = !1;
        if (da) {
            c.address.strict();
            var We, bc = !1,
                Eb, Zc, La, pb = !1,
                Od = !1,
                ab, Nd, qb = e.activePlaylist,
                na, $c, vc;
            c.address.internalChange(function(b) {
                b.stopPropagation();
                Yc(b)
            });
            c.address.externalChange(function(b) {
                b.stopPropagation();
                Nd = b;
                n ? (ab && clearTimeout(ab),
                    vc && clearInterval(vc), vc = setInterval(Xf, 100)) : Od ? (ab && clearTimeout(ab), ab = setTimeout(Yf, 500)) : "/" == b.value ? (pb = !0, c.address.history(!1), G(qb) || c.address.value(qb)) : G(b.value) ? (pb = !0, c.address.history(!1), G(qb) || (c.address.value(qb), c.address.history() || c.address.history(!0))) : Yc(b)
            })
        } else ia = e.activePlaylist, G(ia) ? dc() : Fb();
        if (function() {
                var b = !1,
                    d = document.URL,
                    c = d.indexOf("://") + 3,
                    e = d.indexOf("/", c),
                    d = d.substring(c, e).split("."),
                    c = [1059, 653, 969, 1728, 1403],
                    e = [],
                    f, g, k, m, n = d.length,
                    t, q;
                for (f = 0; f < n; f++) {
                    q =
                        d[f];
                    t = q.length;
                    k = g = 0;
                    for (g; g < t; g++) m = q.charAt(g), k += m.charCodeAt(0);
                    e.push(k)
                }
                f = 0;
                n = e.length;
                t = c.length;
                f;
                a: for (; f < n; f++)
                    for (g = 0, g; g < t; g++)
                        if (e[f] == c[g]) {
                            b = !0;
                            break a
                        }
                return b
            }()) {
            this.apvplp_flashPreviewVideoStart = function() {
                gb && gb.css("display", "none")
            };
            this.apvplp_flashVideoPause = function() {
                Gc()
            };
            this.apvplp_flashVideoResume = function() {
                lc()
            };
            this.apvplp_flashVideoEnd = function() {
                Fc()
            };
            this.apvplp_flashVideoStart = function() {
                S = !0;
                lc();
                db();
                tb || ne()
            };
            this.apvplp_dataUpdateFlash = function(b, d, c, e) {
                td.width(b /
                    d * ka);
                sc.width(c / e * ka);
                Lc.html(Tc(c));
                Mc.html(Uc(e));
                ca && Jc && null != Qa && !Mb && (parseInt(c, 10) < Qa ? Nb.find("p").html(vf + " " + (Qa - parseInt(c, 10)).toString()) : (Mb = !0, nd.hide(), Nb.hide(), od.show(), Wb = !1))
            };
            this.checkQuality = function(b, c, e) {
                je(b, c, e)
            };
            this.apvplp_flashYtQualityChange = function(b) {
                tf(b);
                "undefined" !== typeof vplpQualityChange && vplpQualityChange(K, M, b)
            };
            "list" == u && Pc.resize(function() {
                if (!g || n) return !1;
                Qd()
            });
            isMobile && Pc.doubletap(function() {
                setTimeout(function() {
                        clearTimeout(c(this));
                        Qd()
                    },
                    500)
            });
            isMobile && ra.bind("touchend.ap2", function(b) {
                "fullscreen" == ya && (fa && clearTimeout(fa), Td(), fa = setTimeout(function() {
                    clearTimeout(fa);
                    ye()
                }, Qc))
            });
            if ("list" == u && zd) ra.on("fullscreenchange mozfullscreenchange MSFullscreenChange webkitfullscreenchange", function(b) {
                "fullscreen" == ya && 0 < Ce && (ya = "normal", wd(), nb && N());
                Ce = 1;
                ib && captionator.setRedraw(!1)
            });
            this.playMedia = function() {
                if (!g || n || !x || wa) return !1;
                "local" == x ? Fa() : "youtube" == x && v && v.play();
                wa = !0
            };
            this.pauseMedia = function() {
                if (!g || n || !x || !wa) return !1;
                "local" == x ? Fa() : "youtube" == x && v && v.pause();
                wa = !1
            };
            this.checkMedia = function(b) {
                if (!g || n || !x) return !1;
                b = b.toLowerCase();
                wa && "pause" == b && ("local" == x ? Fa() : "youtube" == x && v && v.pause(), wa = !1)
            };
            this.togglePlayBack = function() {
                if (!g || n || "wall" == u || "wall_popup" == u || !x) return !1;
                Fa()
            };
            this.nextMedia = function() {
                if (!g || n || !W || "wall" == u || "wall_popup" == u) return !1;
                fe()
            };
            this.previousMedia = function() {
                if (!g || n || !W || "wall" == u || "wall_popup" == u) return !1;
                g && (bb(), y.advanceHandler(-1, !0))
            };
            this.setAutoPlay = function(b) {
                if (!g) return !1;
                jc(b)
            };
            this.getAutoPlay = function() {
                return g ? Sa : !1
            };
            this.getVolume = function() {
                return !g || n ? !1 : J
            };
            this.setVolume = function(b) {
                if (!g || n || "wall" == u || "wall_popup" == u || !S) return !1;
                0 > b ? b = 0 : 1 < b && (b = 1);
                J = b;
                Da()
            };
            this.toggleShuffle = function() {
                if (!g || n) return !1;
                Dd = Dd ? !1 : !0;
                y.setRandom(Dd)
            };
            this.toggleLoop = function() {
                if (!g || n) return !1;
                Ed = Ed ? !1 : !0;
                y.setLooping(Ed)
            };
            this.seek = function(b) {
                if (!g || n) return !1;
                if ("local" == x)
                    if (C) {
                        if (S) try {
                            q.currentTime = b
                        } catch (d) {}
                    } else "undefined" !== typeof z(B) && z(B).pb_seek(b);
                else "youtube" ==
                    x && (C ? v && v.seek(b) : "undefined" !== typeof z(B) && z(B).pb_seek(b))
            };
            this.destroyMedia = function() {
                if (!g || n || "wall" == u || "wall_popup" == u) return !1;
                Ne()
            };
            this.destroyPlaylist = function() {
                if (!g || n) return !1;
                dd();
                ia = W = null
            };
            this.toggleDescription = function() {
                if (!g || n || "wall" == u || "wall_popup" == u || -1 == y.getCounter()) return !1;
                de()
            };
            this.getTitle = function(b) {
                return !g || n ? !1 : A ? A.title : null
            };
            this.getDescription = function(b) {
                return !g || n ? !1 : A ? A.description : null
            };
            this.loadMedia = function(b) {
                if (!g || n) return !1;
                if ("list" == u)
                    if (da)
                        if ("string" ===
                            typeof b) c.address.value(b);
                        else return alert("Invalid value loadMedia Deeplink!"), !1;
                else if ("number" === typeof b) {
                    if (!W) return !1;
                    0 > b ? b = 0 : b > D - 1 && (b = D - 1);
                    bb();
                    y.processPlaylistRequest(b)
                } else if ("string" === typeof b) {
                    if (ia == b) return !1;
                    ia = b;
                    Fb()
                } else return alert("Invalid value loadMedia no Deeplink!"), !1;
                else if ("number" === typeof b) 0 > b ? b = 0 : b > D - 1 && (b = D - 1), bb(), y.processPlaylistRequest(b);
                else if ("string" === typeof b) {
                    if (ia == b) return !1;
                    ia = b;
                    Fb()
                } else return alert("Invalid value loadMedia Wall Layout!"), !1
            };
            this.addTrack = function(b, d, e, f) {
                if (!g || n) return !1;
                if ("undefined" === typeof b) return alert("addTrack method requires format parameter. AddTrack failed."), !1;
                if ("undefined" === typeof d) return alert("addTrack method requires track parameter. AddTrack failed."), !1;
                ic = !1;
                "undefined" !== typeof e && (ic = e);
                e = 1;
                var k = !1;
                if ("string" !== typeof d && "[object Object]" !== Object.prototype.toString.call(d))
                    if ("[object Array]" === Object.prototype.toString.call(d)) e = d.length, k = !0;
                    else return alert("addTrack method requires track as string, object or array parameter. AddTrack failed."), !1;
                ua = f;
                fc = !1;
                cb = !0;
                if (W)
                    if ("undefined" !== typeof ua) {
                        if (0 > ua || ua > D) return alert('Invalid position to insert track to. Position number "' + f + '" doesnt exist. AddTrack failed.'), !1;
                        ua == D && (fc = !0)
                    } else fc = !0, ua = D;
                else {
                    if ("undefined" !== typeof ua) {
                        if (0 != ua) return alert('Invalid position to insert track to. Position number "' + f + '" doesnt exist. AddTrack failed.'), !1
                    } else ua = 0;
                    fc = !0
                }
                n = !0;
                oa.css("display", "block");
                yc = !1;
                Hb = !0;
                ta = 0;
                eb = [];
                aa = [];
                f = 0;
                var l;
                for (f; f < e; f++)
                    if (l = k ? d[f] : d, "html" == b) {
                        var m;
                        l = c(l);
                        m =
                            c("<div>").append(l.clone()).html();
                        l = document.createElement("div");
                        l.innerHTML = m;
                        l = c(l.firstChild);
                        l = Ud(l);
                        aa.push(l)
                    }
                D = aa.length;
                gd = !1;
                W || (gd = !0);
                W = gc;
                cd()
            };
            this.removeTrack = function(b) {
                if (!g || n || !W) return !1;
                if ("undefined" === typeof b) return alert("removeTrack method requires track parameter. removeTrack failed."), !1;
                if (c.isNumeric(b))
                    if (c.isNumeric(b)) {
                        if (b = parseInt(b, 10), 0 > b || b > D - 1) return alert('Invalid track number. Track number  "' + b + '" doesnt exist. RemoveTrack failed.'), !1
                    } else return alert("removeTrack method requires either a track number or a track title to remove. removeTrack failed."), !1;
                else {
                    var d = 0,
                        e = !1;
                    for (d; d < D; d++)
                        if (b == A.title) {
                            b = d;
                            e = !0;
                            break
                        }
                    if (!e) return alert('Track with name "' + b + '" doesnt exist. RemoveTrack failed.'), !1
                }
                I[b] ? (d = b, sa && rb(), I.splice(d, 1), fb.splice(d, 1), hc.splice(d, 1), Ac.splice(d, 1), sa && hd.splice(d, 1), gc.children(".playlistNonSelected, .playlistSelected").eq(d).remove(), da && X[na].mediaName.splice(d, 1), $e(), "list" == u && (af(), Md()), D = I.length, 0 < D ? (d = y.getCounter(), b == d ? (Ec(), y.setPlaylistItems(D)) : (y.setPlaylistItems(D, !1), b < d && y.reSetCounter(y.getCounter() -
                    1))) : (dd(), W = null, "undefined" !== typeof vplpPlaylistEmpty && vplpPlaylistEmpty(K, M))) : alert('RemoveTrack with id "' + b + '" failed.')
            };
            this.cleanPreviewVideo = function() {
                if (!g || n || !sa) return !1;
                rb()
            };
            this.getMediaCount = function() {
                if (!g || n) return !1;
                var b = D;
                return !isNaN(parseFloat(b)) && isFinite(b) ? D : 0
            };
            this.getMediaId = function() {
                return g ? M : !1
            };
            this.getMediaPlaying = function() {
                return !g || n ? !1 : wa
            };
            this.getPlaylistTransition = function() {
                return n
            };
            this.getPlaylistLoaded = function() {
                return yc
            };
            this.getVideoInited = function() {
                return !g ||
                    n ? !1 : S
            };
            this.getSetupDone = function() {
                return g
            };
            this.getPlaylistList = function() {
                return !g || n ? !1 : ec
            };
            this.getActiveItem = function() {
                return !g || n ? !1 : Of
            };
            this.setActiveItem = function(b) {
                if (!g || n) return !1;
                cc = b
            };
            this.getActivePlaylist = function() {
                return !g || n ? !1 : Ve
            };
            this.getPlaylistData = function() {
                return g && !n && W ? I : !1
            };
            this.setPlaylistData = function(b) {
                if (!g || n || !b) return !1;
                I = jQuery.extend(!0, [], b);
                D = I.length
            };
            this.getSettings = function() {
                return !g || n ? !1 : e ? e : null
            };
            this.getPlaylist = function() {
                return !g || n ? !1 : la
            };
            this.cleanYt = function() {
                if (!g || n) return !1;
                v && (c(v).unbind(), v.clean(), v = null);
                le = !1
            };
            this.skipIntro = function() {
                if (!g || n || !ca || Qa && !Mb) return !1;
                mc = !0;
                isMobile || jc(!0);
                Gb();
                return !1
            };
            this.getIsMobile = function() {
                return isMobile
            };
            var Rd;
            c(e.dropdownId).find(".lp_playlist").length && (Rd = isMobile ? c(e.dropdownId).find(".lp_playlist").change(function() {
                var b = c(this).val();
                e.useDeeplink && Jf(b);
                K.loadMedia(b)
            }) : c(e.dropdownId).find(".lp_playlist").selectbox({
                onChange: function(b, c) {
                    e.useDeeplink && (b = Jf(b));
                    K.loadMedia(b)
                }
            }));
            return this
        }
    }
})(jQuery);

function vplpSetupDone(c, e) {
    if ("popup_single" == e && hasLocalStorage && localStorage.getItem("vplp_single_track")) {
        var f = localStorage.getItem("vplp_single_track");
        c.destroyMedia();
        c.addTrack("html", f, !0)
    }
}

function vplpPlaylistEnd(c, e) {}

function vplpPlaylistLoaded(c, e) {
    if ("wall_clear2" == e) {
        var f = c.getPlaylistData(),
            t = 0,
            T = f.length,
            F, R, za;
        for (t; t < T; t++) F = f[t], F.item && !F.item.data("has_wallInfo") && (R = F.data.title, za = F.data.description_short || F.data.description, jQuery('<div class="wallInfo"><span class="wallTitle">' + R + '</span><br><span class="wallContent">' + za + "</span></div>").appendTo(F.item), F.item.data("has_wallInfo", !0));
        c.getPlaylist().find(".wallInfo").dotdotdot()
    }
}

function vplpItemTriggered(c, e, f) {}

function vplpVideoStart(c, e, f) {}

function vplpPlay(c, e, f) {
    if ("undefined" !== typeof vplp_mediaArr && vplp_mediaArr.length)
        for (c = 0, f = vplp_mediaArr.length, c; c < f; c++) e != vplp_mediaArr[c].mediaId && vplp_mediaArr[c].player_id.checkMedia("pause")
}

function vplpPause(c, e, f) {}

function vplpVideoEnd(c, e, f) {}

function vplpPlaylistItemEnabled(c, e, f, t) {}

function vplpPlaylistItemDisabled(c, e, f, t) {}

function playlistItemRollover(c, e, f, t) {}

function vplpPlaylistItemRollout(c, e, f, t) {}

function vplpPlaylistEmpty(c, e) {}

function vplpFsEnter(c, e) {}

function vplpFsExit(c, e) {}

function vplpCaptionChange(c, e, f) {}

function vplpQualityChange(c, e, f) {}(function(c) {
    var e = /android|iphone|ipad/i.test(navigator.userAgent.toLowerCase()) ? "touchend" : "click";
    c.fn.doubletap = function(f, t) {
        t = null == t ? 300 : t;
        this.bind(e, function(e) {
            var F = (new Date).getTime(),
                T = c(this).data("lastTouch") || F + 1,
                T = F - T;
            T < t && 0 < T ? (c(this).data("lastTouch", null), null !== f && "function" === typeof f && f(e)) : c(this).data("lastTouch", F)
        })
    }
})(jQuery);
(function(c) {
    function e(e, t) {
        function f(e) {
            m.playerReady = !0;
            m.forcePreviewStop || (c(m).trigger("ap_YoutubePlayer.YT_READY"), "undefined" !== typeof m._player.setVolume && m._player.setVolume(100 * m._defaultVolume), m._autoPlay && m._player.playVideo())
        }

        function F(e) {
            c(m).trigger("ap_YoutubePlayer.QUALITY_CHANGE", [e.data])
        }

        function R(e) {
            if (m.forceMainStop && (m.forceMainStop = !1, "undefined" !== typeof m._player.stopVideo)) {
                m._player.stopVideo();
                c(m).trigger("ap_YoutubePlayer.FORCE_MAIN_STOP");
                return
            } - 1 != e.data &&
                (0 == e.data ? (c(m).trigger("ap_YoutubePlayer.END_PLAY"), m.loop && m._player.playVideo()) : 1 == e.data ? (m.forcePreviewStop && "undefined" !== typeof m._player.stopVideo && m._player.stopVideo(), m._autoPlay = !0, m.small_embed && "undefined" !== typeof m._player.setVolume && m._player.setVolume(100 * m._defaultVolume), m._inited || (c(m).trigger("ap_YoutubePlayer.START_PLAY"), m._inited = !0, !m.small_embed && m.quality ? m._player.setPlaybackQuality(m.quality) : m.small_embed && m._player.setPlaybackQuality(m._player.getAvailableQualityLevels()[m._player.getAvailableQualityLevels().length -
                    1])), m.new_quality && (m._player.setPlaybackQuality(m.new_quality), m.new_quality = null), c(m).trigger("ap_YoutubePlayer.STATE_PLAYING")) : 2 == e.data ? c(m).trigger("ap_YoutubePlayer.STATE_PAUSED") : 3 == e.data ? m.new_quality && (m._player.setPlaybackQuality(m.new_quality), m.new_quality = null) : 5 == e.data && c(m).trigger("ap_YoutubePlayer.STATE_CUED"))
        }

        function za(e) {
            c(m).trigger("ap_YoutubePlayer.ERROR_HANDLER", [e.data])
        }
        var m = this;
        this.isIE = e.isIE ? e.isIE : !1;
        this.isMobile = e.isMobile;
        this.initialAutoplay = e.initialAutoplay;
        this._inited = !1;
        this._player;
        this._autoPlay = e.autoPlay;
        this._defaultVolume = e.defaultVolume;
        this._youtubeHolder = e.youtubeHolder;
        this._frameId = "ytplayer" + Math.floor(16777215 * Math.random());
        e.quality && (this.quality = e.quality);
        e.small_embed && (this.small_embed = e.small_embed);
        e.loop && (this.loop = e.loop);
        this.lastID;
        this.playerReadyInterval = 100;
        this.playerReadyIntervalID;
        this.playerReady = !1;
        this.protocol = e.protocol;
        0 == e.youtubeChromeless && (t.useControls = !0, t.ytShowinfo = !0);
        this.new_quality;
        var N = "?controls=" +
            (t.useControls ? 1 : 0).toString(),
            Ga = "&amp;autohide=" + (t.autoHideControls ? 1 : 0).toString(),
            Ya = "&amp;showinfo=" + (t.ytShowinfo ? 1 : 0).toString(),
            Ca = "&amp;modestbranding=" + (t.ytModestbranding ? 1 : 0).toString(),
            Ea = "&amp;rel=" + (t.ytRel ? 1 : 0).toString();
        this.forcePreviewStop = this.forceMainStop = !1;
        this.youtubeVideoIframe = c("<iframe />", {
            frameborder: 0,
            src: "https://www.youtube.com/embed/" + e.mediaPath + N + Ea + Ya + Ga + "&amp;enablejsapi=1&amp;playsinline=1" + Ca + "&amp;wmode=transparent",
            width: "100%",
            height: "100%",
            id: this._frameId,
            webkitAllowFullScreen: !0,
            mozallowfullscreen: !0,
            allowFullScreen: !0
        });
        this._youtubeHolder.css("display", "block").append(this.youtubeVideoIframe);
        N = document.createElement("script");
        N.src = this.protocol + "//www.youtube.com/iframe_api";
        Ga = document.getElementsByTagName("script")[0];
        Ga.parentNode.insertBefore(N, Ga);
        var Ha = setInterval(function() {
                window.YT && window.YT.Player && (Ha && clearInterval(Ha), m._player = new YT.Player(m._frameId, {
                    events: {
                        onReady: f,
                        onPlaybackQualityChange: F,
                        onStateChange: R,
                        onError: za
                    }
                }))
            },
            100);
        window.onYouTubeIframeAPIReady = function() {}
    }
    c.apvplp_youtubePlayer = function(c, t) {
        return new e(c, t)
    };
    e.prototype = {
        clean: function(c) {
            this._player && ("undefined" !== typeof this._player.stopVideo && this._player.stopVideo(), this._player = null);
            this.youtubeVideoIframe && (this.youtubeVideoIframe.attr("src", ""), this.youtubeVideoIframe.remove(), this.youtubeVideoIframe = null);
            this._youtubeHolder && this._youtubeHolder.empty().css("display", "none")
        },
        stopPreview: function() {
            this.forcePreviewStop = !0
        },
        initVideo: function(c,
            e) {
            this.forcePreviewStop = this.forceMainStop = !1;
            this.quality = e;
            if (this.playerReady) this._player && (this._inited = !1, this._autoPlay ? "undefined" !== typeof this._player.loadVideoById && this._player.loadVideoById(c) : "undefined" !== typeof this._player.cueVideoById && this._player.cueVideoById(c));
            else {
                var f = this;
                this.lastID = c;
                this.playerReadyIntervalID || (this.playerReadyIntervalID = setInterval(function() {
                        f.playerReady && (f.playerReadyIntervalID && clearInterval(f.playerReadyIntervalID), f.forceMainStop || f.initVideo(f.lastID))
                    },
                    this.playerReadyInterval))
            }
        },
        stop: function() {
            this.forceMainStop = !0;
            this._player && "undefined" !== typeof this._player.stopVideo && this._player.stopVideo()
        },
        play: function() {
            this._player && "undefined" !== typeof this._player.playVideo && this._player.playVideo()
        },
        pause: function() {
            this._player && "undefined" !== typeof this._player.pauseVideo && this._player.pauseVideo()
        },
        togglePlayback: function(c) {
            if (this._player)
                if (void 0 == c) {
                    if ("undefined" === typeof this._player.getPlayerState) return !1;
                    c = this._player.getPlayerState();
                    1 == c ? "undefined" !== typeof this._player.pauseVideo && this._player.pauseVideo() : 2 == c ? "undefined" !== typeof this._player.playVideo && this._player.playVideo() : -1 != c && 5 != c && 0 != c || "undefined" === typeof this._player.playVideo || this._player.playVideo()
                } else c ? "undefined" !== typeof this._player.playVideo && this._player.playVideo() : "undefined" !== typeof this._player.pauseVideo && this._player.pauseVideo()
        },
        seek: function(c) {
            this._player && "undefined" !== typeof this._player.seekTo && this._player.seekTo(c)
        },
        isMuted: function() {
            if (this._player &&
                "undefined" !== typeof this._player.isMuted) return this._player.isMuted()
        },
        getDuration: function() {
            if (this._player && "undefined" !== typeof this._player.getDuration) return this._player.getDuration()
        },
        getCurrentTime: function() {
            if (this._player && "undefined" !== typeof this._player.getCurrentTime) return this._player.getCurrentTime()
        },
        getVideoLoadedFraction: function() {
            if (this._player && "undefined" !== typeof this._player.getVideoLoadedFraction) return this._player.getVideoLoadedFraction()
        },
        getVideoBytesLoaded: function() {
            if (this._player &&
                "undefined" !== typeof this._player.getVideoBytesLoaded) return this._player.getVideoBytesLoaded()
        },
        getVideoBytesTotal: function() {
            if (this._player && "undefined" !== typeof this._player.getVideoBytesTotal) return this._player.getVideoBytesTotal()
        },
        setVolume: function(c) {
            0 > c ? vol = 0 : 1 < c && (c = 1);
            this._player && "undefined" !== typeof this._player.setVolume && this._player.setVolume(100 * c)
        },
        getPlayerState: function() {
            if (this._player && "undefined" !== typeof this._player.getPlayerState) return this._player.getPlayerState()
        },
        setAutoPlay: function(c) {
            this._autoPlay = c
        },
        getQualityLevels: function() {
            return this._player.getAvailableQualityLevels()
        },
        getCurrQuality: function() {
            return this._player.getPlaybackQuality()
        },
        setPlaybackQuality: function(c) {
            this._player.pauseVideo();
            this.new_quality = c;
            this._player.playVideo()
        }
    }
})(jQuery);
(function(c) {
    function e(c) {
        this._loopingOn = c.loopingOn;
        this._randomPlay = c.randomPlay;
        this._playlistItems;
        this._lastInOrder = !1;
        this._counter = -1;
        this._lastPlayedFromPlaylistClick;
        this._lastRandomCounter;
        this._traceCounter = this._randomPaused = !1;
        this._randomArr = [];
        this._playlistSelect = !1
    }
    c.playlistManager = function(c) {
        return new e(c)
    };
    e.prototype = {
        setCounter: function(c, e) {
            "undefined" === typeof e && (e = !0);
            this._counter = e ? this._counter + parseInt(c, 10) : parseInt(c, 10);
            this._checkCounter()
        },
        getCounter: function() {
            return this._randomPlay ?
                this._playlistSelect ? this._counter : this._randomArr[this._counter] : this._counter
        },
        advanceHandler: function(c) {
            this._playlistSelect = !1;
            this._randomPaused ? this._handleRandomPaused(c) : this.setCounter(c)
        },
        processPlaylistRequest: function(c) {
            this._playlistSelect = !1;
            this._randomPlay && (this._playlistSelect = !0, this._lastPlayedFromPlaylistClick = c, this._randomPaused || (this._lastRandomCounter = this._counter, this._randomPaused = !0));
            this.setCounter(c, !1)
        },
        getLastInOrder: function() {
            return this._lastInOrder
        },
        getRandomPaused: function() {
            return this._randomPaused
        },
        setPlaylistItems: function(c, e) {
            "undefined" === typeof e && (e = !0);
            e && (this._counter = -1);
            this._playlistItems = c;
            this._randomPlay && this._makeRandomList()
        },
        reSetCounter: function(c) {
            "undefined" === typeof c ? this._counter = -1 : (c = parseInt(c, 10), this._playlistItems ? (c > this._playlistItems - 1 ? c = this._playlistItems - 1 : 0 > c && (c = 0), this._counter = c) : this._counter = -1)
        },
        setRandom: function(c) {
            (this._randomPlay = c) && this._makeRandomList();
            this._randomChange()
        },
        setLooping: function(c) {
            this._loopingOn = c
        },
        setTraceCounter: function(c) {
            this._traceCounter =
                c
        },
        _handleRandomPaused: function(e) {
            var f = c(this);
            this._randomPaused = !1;
            this._lastRandomCounter + e > this._playlistItems - 1 ? (this._counter = this._playlistItems - 1, f.trigger("ap_PlaylistManager.COUNTER_READY")) : 0 > this._lastRandomCounter + e ? (this._counter = 0, f.trigger("ap_PlaylistManager.COUNTER_READY")) : this.setCounter(this._lastRandomCounter + e, !1)
        },
        _randomChange: function() {
            this._randomPlay ? (this._activeIndexFirst(), this._counter = 0) : this._randomPaused ? (this._counter = this._lastPlayedFromPlaylistClick, this._randomPaused = !1) : this._counter = this._randomArr[this._counter]
        },
        _checkCounter: function() {
            if (isNaN(this._counter)) alert("ap_PlaylistManager message: No active media, counter = " + this._counter);
            else {
                var e = c(this);
                this._lastInOrder = !1;
                this._loopingOn ? (this._randomPlay ? this._counter > this._playlistItems - 1 ? (this._counter = this._randomArr[this._playlistItems - 1], this._makeRandomList(), this._firstIndexCheck(), this._counter = 0, e.trigger("ap_PlaylistManager.PLAYLIST_END_ALERT")) : 0 > this._counter && (this._counter = this._randomArr[0],
                    this._makeRandomList(), this._lastIndexCheck(), this._counter = this._playlistItems - 1) : this._counter > this._playlistItems - 1 ? (this._counter = 0, e.trigger("ap_PlaylistManager.PLAYLIST_END_ALERT")) : 0 > this._counter && (this._counter = this._playlistItems - 1), e.trigger("ap_PlaylistManager.COUNTER_READY")) : (this._counter > this._playlistItems - 1 ? (this._counter = this._playlistItems - 1, this._lastInOrder = !0) : 0 > this._counter && (this._counter = 0), this._lastInOrder ? e.trigger("ap_PlaylistManager.PLAYLIST_END") : e.trigger("ap_PlaylistManager.COUNTER_READY"));
                this._traceCounter && console.log("counter = " + this.getCounter())
            }
        },
        _makeRandomList: function() {
            3 > this._playlistItems || (this._randomArr = this._randomiseIndex(this._playlistItems))
        },
        _firstIndexCheck: function() {
            if (this._randomArr[0] == this._counter) {
                var c = this._randomArr.splice(0, 1);
                this._randomArr.push(c)
            }
        },
        _lastIndexCheck: function() {
            if (this._randomArr[this._playlistItems - 1] == this._counter) {
                var c = this._randomArr.splice(this._playlistItems - 1, 1);
                this._randomArr.unshift(c)
            }
        },
        _activeIndexFirst: function() {
            var c =
                0,
                e = this._randomArr.length;
            for (c; c < e; c++)
                if (this._randomArr[c] == this._counter) {
                    if (0 == c) break;
                    c = this._randomArr.splice(c, 1);
                    this._randomArr.unshift(parseInt(c, 10));
                    break
                }
        },
        _randomiseIndex: function(c) {
            var e = [],
                f = [],
                F = 0;
            for (F; F < c; F++) e[F] = F;
            var F = 0,
                R;
            for (F; F < c; F++) R = Math.round(Math.random() * (e.length - 1)), f[F] = e[R], e.splice(R, 1);
            return f
        }
    }
})(jQuery);
var vplp_tracks_list = ['<div class="playlistNonSelected" data-address="local1" data-type="local" data-mp4="../media/video/1/main/01.mp4" data-preview="../media/video/1/main/01.jpg" data-thumb="../media/video/1/preview/01.jpg" data-video-preview="../media/video/1/preview/01.mp4"></div>', '<div class="playlistNonSelected" data-address="local2" data-type="local" data-mp4="../media/video/1/main/02.mp4" data-preview="../media/video/1/main/02.jpg" data-thumb="../media/video/1/preview/02.jpg" data-video-preview="../media/video/1/preview/02.mp4"></div>'],
    vplp_tracks_list2 = ['<div class="playlistNonSelected" data-address="youtube_single1" data-type="youtube_single" data-path="F08U2yCxbYg" ></div>', '<div class="playlistNonSelected" data-address="youtube_single2" data-type="youtube_single" data-path="jXSxzMTrKq0" ></div>', '<div class="playlistNonSelected" data-address="youtube_single3" data-type="youtube_single" data-path="NY-4XAQR_uk" ></div>'];

function isReady() {
    return "complete" === document.readyState
}

function apvplp_flashVideoEnd(c) {
    "undefined" !== typeof vplp_mediaArr && vplp_mediaArr[c.id] && vplp_mediaArr[c.id].player_id.apvplp_flashVideoEnd()
}

function apvplp_flashVideoStart(c) {
    "undefined" !== typeof vplp_mediaArr && vplp_mediaArr[c.id] && (vplp_mediaArr[c.id].player_id.apvplp_flashVideoStart(), c.cc && c.quality && vplp_mediaArr[c.id].player_id.checkQuality("youtube_flash", c.cc, c.quality))
}

function apvplp_flashVideoPause(c) {
    "undefined" !== typeof vplp_mediaArr && vplp_mediaArr[c.id] && vplp_mediaArr[c.id].player_id.apvplp_flashVideoPause()
}

function apvplp_flashVideoResume(c) {
    "undefined" !== typeof vplp_mediaArr && vplp_mediaArr[c.id] && vplp_mediaArr[c.id].player_id.apvplp_flashVideoResume()
}

function apvplp_dataUpdateFlash(c) {
    "undefined" !== typeof vplp_mediaArr && vplp_mediaArr[c.id] && vplp_mediaArr[c.id].player_id.apvplp_dataUpdateFlash(c.bl, c.bt, c.t, c.d)
}

function apvplp_flashYtQualityChange(c) {
    "undefined" !== typeof vplp_mediaArr && vplp_mediaArr[c.id] && vplp_mediaArr[c.id].player_id.apvplp_flashYtQualityChange(c.cc)
}

function apvplp_flashPreviewVideoStart(c) {
    "undefined" !== typeof vplp_mediaArr && vplp_mediaArr[c.id] && vplp_mediaArr[c.id].player_id.apvplp_flashPreviewVideoStart()
}
var hap_popup;

function notify_popup(c) {
    if (hap_popup && void 0 != hap_popup.initPopup) try {
        if (void 0 != hap_popup.initPopup) {
            var e = hap_player.getSettings();
            e.activePlaylist = hap_player.getActivePlaylist();
            var f = isIE ? hap_player.getPlaylistList().clone(!0, !0).wrap("<p>").parent().html() : hap_player.getPlaylistList().clone(!0, !0);
            "wall_popup" == c ? hap_popup.initPopup(f, e) : "list_popup" == c && (e.activeItem = hap_player.getActiveItem(), hap_popup.initPopup(f, e))
        }
    } catch (t) {
        return alert("parent notify_popup error: " + t.message), !1
    }
}

function open_popup(c, e) {
    var f = c.popupUrl,
        t = c.popupWidth,
        T = c.popupHeight,
        F = (window.screen.width - t) / 2,
        R = (window.screen.height - T) / 2;
    if (!hap_popup || hap_popup.closed) {
        hap_popup = window.open(f, "hap_popup_window", "menubar=no,toolbar=no,location=no,scrollbars=1,resizable,width=" + t + ",height=" + T + ",left=" + F + ",top=" + R + "");
        if (!hap_popup) return alert("Player can not be opened in a popup window because your browser is blocking Pop-Ups. You need to allow Pop-Ups in browser for this site to use the Player."), !1;
        window.focus &&
            hap_popup.focus()
    } else void 0 != hap_popup.loadMedia && hap_popup.loadMedia(e);
    return !1
}

function open_player(c, e) {
    jQuery("#mainWrapper").css("display", "block");
    jQuery(".popup_toggle").show();
    hap_player.getSettings().activeItem = e;
    hap_player.loadMedia(c)
};
