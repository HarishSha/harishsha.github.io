function isDefined(objectToValidate, defaultValue) {
    return "undefined" == typeof objectToValidate ? "undefined" == typeof defaultValue ? !1 : defaultValue : "undefined" == typeof defaultValue ? !0 : objectToValidate
}

function FormBuilder(pars) {
    var _this = this;
    return this.params = isDefined(pars, {}), this.formValidator = null, this.id = (new Date).getTime(), this.uploader = this.params.form_uploader, isDefined(this.params.form_selector) ? (this.form = $(this.params.form_selector), 0 == this.form.length ? !1 : isDefined(this.params.submit_selector) ? (this.submitButton = $(this.params.submit_selector, this.form), 0 == this.submitButton.length ? !1 : (this.submitButton.data("form", this.form), "submit" != this.submitButton.attr("type") && this.submitButton.bind("click", function(e) {
        e.preventDefault(), _this.form.valid() && _this.form.submit()
    }), isDefined(this.params.validation) && (this.createValidation(this.params.validation), isDefined(this.params.validation.conditional_required) && this.createConditionalRequired(this.params.validation.conditional_required)), jQuery.validator.addMethod("selectcheck", function(value) {
        return "0" != value
    }, "year required"), jQuery.validator.addMethod("postalcode_pt", function(value) {
        var pattern = /[0-9]{4}\-[0-9]{3}/;
        return pattern.test(value) && 8 == value.length || "" == value
    }), jQuery.validator.addMethod("breeders_code", function(value) {
        return 4 == value.length || 0 == value.length
    }), jQuery.validator.addMethod("where_to_buy", function(value) {
        return "" != value
    }), jQuery.validator.addMethod("select_required", function(val) {
        var value = null == val ? "" : val;
        return "" != value
    }), void jQuery.validator.addMethod("added_pets", function(value) {
        if ("" != value) {
            var jData = $.parseJSON(decodeURIComponent(value));
            return null != jData && jData.length > 0 ? !0 : !1
        }
        return !1
    }))) : !1) : !1
}

function Portfolio($scope, $element) {
    var _this = this;
    this.projects = {}, this.scope = $scope, this.modal = !1, this.win = $(window), this.block = $element, this.modalObj = $(".modal", this.block), this.winW = null, this.win.bind("scroll.Portfolio", function() {
        _this.scrollHandler()
    }), this.win.bind("resize.Portfolio", function() {
        _this.resizeHandler(!0)
    });
    for (var i = 0; i < _portfolioList.length; i++) {
        var o = _portfolioList[i];
        this.projects[o._id] = o;
        for (var newSliderImages = [], n = 0; n < this.projects[o._id].images.length; n++) {
            var img = this.projects[o._id].images[n];
            newSliderImages.push(0 == n ? {
                src: img,
                active: !0
            } : {
                src: img,
                active: !1
            })
        }
        this.projects[o._id].images = newSliderImages
    }
    this.resizeHandler(!1), this.win.bind("load.Portfolio", function() {
        _this.resizeHandler(!1)
    })
}

function ScrollControler() {
    var that = this;
    this.scrollable = $("html, body"), this.isAnim = !this.scrollable.hasClass("no-anim"), this.scrollT = this.scrollable.scrollTop(), this.win = $(window), this.winH = this.win.height(), this.win.resize(function() {
        that.resizeHandler()
    }), this.objCon = $("section.contact"), this.objCon.posTop = this.objCon.offset().top, this.objCon.hasAnimClass = !1, this.objConLks = $(".network > a", this.objCon), this.win.scroll(function() {
        that.scrollHandler()
    }), this.resizeHandler()
}

function Navigation() {
    var that = this;
    this.body = $("body"), this.menu = $("header"), this.buttons = $(".second-nav a, header a, body > footer .bt-up, section.banner .bt-down"), this.targetAttr = "target", this.contAttr = "content", this.scrollable = $("html, body"), this.navItems = $("header nav a"), this.buttons.bind("click.Navigation", function(e) {
        e.preventDefault(), that.goToItem($(this))
    }), this.totalH = this.body.height(), this.win = $(window), this.win.bind("scroll.Navigation", function() {
        that.scrollHandler()
    }), this.win.bind("resize.Navigation", function() {
        that.resizeHandler()
    }), this.openMenu = $("section.banner"), this.openMenuVal = 68, this.closeMenu = $("section.contact"), this.sections = $("section").not(this.openMenu).not(".quote"), this.resizeHandler()
}

function ProfileGallery() {
    this.cont = $("section.profile"), this.imgList = $("figure img", this.cont), this.lgth = this.imgList.length, this.ci = 0, this.timer = null, this.startTimeout()
}

function ContactForm() {
    var that = this;
    this.cont = $("form"), new FormBuilder({
        form_selector: ".contact form",
        parent_line_selector: ".ln",
        error_selector: ".err",
        submit_selector: 'input[type="submit"]',
        validation: {
            rules: {
                name: {
                    required: !0
                },
                email: {
                    required: !0,
                    email: !0
                },
                message: {
                    required: !0
                }
            },
            messages: {
                required: "Please, fill this required field.",
                email: "Please, insert a valid email."
            }
        }
    }), this.submitBtn = $("input[type=submit]", this.cont), this.submitBtn.bind("click.ContactForm", function(e) {
        e.preventDefault(), that.cont.valid() && that.sendEmail()
    })
}

function TwitterWall($scope, $timeout) {
    this.list = [], this.scope = $scope, this.timeOut = $timeout, this.isMobile = mobilecheck(), this.socket = null, this.positions = [{
        current: null
    }, {
        current: null,
        out: 8,
        hidden: !1
    }, {
        current: null,
        out: 7,
        hidden: !1
    }, {
        current: null,
        out: 10,
        hidden: !1
    }, {
        current: null,
        out: 6,
        hidden: null
    }, {
        current: null,
        out: 14,
        hidden: !1
    }, {
        current: null,
        out: 13,
        hidden: !1
    }, {
        current: null,
        out: 9,
        hidden: !1
    }, {
        current: null,
        out: 12,
        hidden: !1
    }, {
        current: null,
        out: 11,
        hidden: !1
    }, {
        current: null,
        hidden: !0
    }, {
        current: null,
        hidden: !0
    }, {
        current: null,
        hidden: !0
    }, {
        current: null,
        hidden: !0
    }], this.connectFirst()
}! function(e, undefined) {
    function j(e) {
        var t = e.length,
            n = x.type(e);
        return x.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function A(e) {
        var t = D[e] = {};
        return x.each(e.match(w) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function F() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = x.expando + Math.random()
    }

    function P(e, t, n) {
        var r;
        if (n === undefined && 1 === e.nodeType)
            if (r = "data-" + t.replace(O, "-$1").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : H.test(n) ? JSON.parse(n) : n
                } catch (i) {}
                L.set(e, t, n)
            } else n = undefined;
        return n
    }

    function U() {
        return !0
    }

    function Y() {
        return !1
    }

    function V() {
        try {
            return o.activeElement
        } catch (e) {}
    }

    function Z(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function et(e, t, n) {
        if (x.isFunction(t)) return x.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return x.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (G.test(t)) return x.filter(t, e, n);
            t = x.filter(t, e)
        }
        return x.grep(e, function(e) {
            return g.call(t, e) >= 0 !== n
        })
    }

    function pt(e, t) {
        return x.nodeName(e, "table") && x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function ft(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function ht(e) {
        var t = ut.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function dt(e, t) {
        for (var n = e.length, r = 0; n > r; r++) q.set(e[r], "globalEval", !t || q.get(t[r], "globalEval"))
    }

    function gt(e, t) {
        var n, r, i, o, s, a, u, l;
        if (1 === t.nodeType) {
            if (q.hasData(e) && (o = q.access(e), s = q.set(t, o), l = o.events)) {
                delete s.handle, s.events = {};
                for (i in l)
                    for (n = 0, r = l[i].length; r > n; n++) x.event.add(t, i, l[i][n])
            }
            L.hasData(e) && (a = L.access(e), u = x.extend({}, a), L.set(t, u))
        }
    }

    function mt(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && x.nodeName(e, t) ? x.merge([e], n) : n
    }

    function yt(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && ot.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    function At(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Dt.length; i--;)
            if (t = Dt[i] + n, t in e) return t;
        return r
    }

    function Lt(e, t) {
        return e = t || e, "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e)
    }

    function qt(t) {
        return e.getComputedStyle(t, null)
    }

    function Ht(e, t) {
        for (var n, r, i, o = [], s = 0, a = e.length; a > s; s++) r = e[s], r.style && (o[s] = q.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Lt(r) && (o[s] = q.access(r, "olddisplay", Rt(r.nodeName)))) : o[s] || (i = Lt(r), (n && "none" !== n || !i) && q.set(r, "olddisplay", i ? n : x.css(r, "display"))));
        for (s = 0; a > s; s++) r = e[s], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
        return e
    }

    function Ot(e, t, n) {
        var r = Tt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function Ft(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > o; o += 2) "margin" === n && (s += x.css(e, n + jt[o], !0, i)), r ? ("content" === n && (s -= x.css(e, "padding" + jt[o], !0, i)), "margin" !== n && (s -= x.css(e, "border" + jt[o] + "Width", !0, i))) : (s += x.css(e, "padding" + jt[o], !0, i), "padding" !== n && (s += x.css(e, "border" + jt[o] + "Width", !0, i)));
        return s
    }

    function Pt(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = qt(e),
            s = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = vt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Ct.test(i)) return i;
            r = s && (x.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + Ft(e, t, n || (s ? "border" : "content"), r, o) + "px"
    }

    function Rt(e) {
        var t = o,
            n = Nt[e];
        return n || (n = Mt(e, t), "none" !== n && n || (xt = (xt || x("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (xt[0].contentWindow || xt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = Mt(e, t), xt.detach()), Nt[e] = n), n
    }

    function Mt(e, t) {
        var n = x(t.createElement(e)).appendTo(t.body),
            r = x.css(n[0], "display");
        return n.remove(), r
    }

    function _t(e, t, n, r) {
        var i;
        if (x.isArray(t)) x.each(t, function(t, i) {
            n || $t.test(e) ? r(e, i) : _t(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== x.type(t)) r(e, t);
        else
            for (i in t) _t(e + "[" + i + "]", t[i], n, r)
    }

    function un(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(w) || [];
            if (x.isFunction(n))
                for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function ln(e, t, n, r) {
        function s(a) {
            var u;
            return i[a] = !0, x.each(e[a] || [], function(e, a) {
                var l = a(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : undefined : (t.dataTypes.unshift(l), s(l), !1)
            }), u
        }
        var i = {},
            o = e === on;
        return s(t.dataTypes[0]) || !i["*"] && s("*")
    }

    function cn(e, t) {
        var n, r, i = x.ajaxSettings.flatOptions || {};
        for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && x.extend(!0, e, r), e
    }

    function pn(e, t, n) {
        for (var r, i, o, s, a = e.contents, u = e.dataTypes;
            "*" === u[0];) u.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in a)
                if (a[i] && a[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                s || (s = i)
            }
            o = o || s
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : undefined
    }

    function fn(e, t, n, r) {
        var i, o, s, a, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
        for (o = c.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (s = l[u + " " + o] || l["* " + o], !s)
                for (i in l)
                    if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                        s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                        break
                    }
            if (s !== !0)
                if (s && e["throws"]) t = s(t);
                else try {
                    t = s(t)
                } catch (p) {
                    return {
                        state: "parsererror",
                        error: s ? p : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function En() {
        return setTimeout(function() {
            xn = undefined
        }), xn = x.now()
    }

    function Sn(e, t, n) {
        for (var r, i = (Nn[t] || []).concat(Nn["*"]), o = 0, s = i.length; s > o; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function jn(e, t, n) {
        var r, i, o = 0,
            s = kn.length,
            a = x.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = xn || En(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, s = 0, u = l.tweens.length; u > s; s++) l.tweens[s].run(o);
                return a.notifyWith(e, [l, o, n]), 1 > o && u ? n : (a.resolveWith(e, [l]), !1)
            },
            l = a.promise({
                elem: e,
                props: x.extend({}, t),
                opts: x.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: xn || En(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = x.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (Dn(c, l.opts.specialEasing); s > o; o++)
            if (r = kn[o].call(l, e, c, l.opts)) return r;
        return x.map(c, Sn, l), x.isFunction(l.opts.start) && l.opts.start.call(e, l), x.fx.timer(x.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function Dn(e, t) {
        var n, r, i, o, s;
        for (n in e)
            if (r = x.camelCase(n), i = t[r], o = e[n], x.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = x.cssHooks[r], s && "expand" in s) {
                o = s.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
    }

    function An(e, t, n) {
        var r, i, o, s, a, u, l = this,
            c = {},
            p = e.style,
            f = e.nodeType && Lt(e),
            h = q.get(e, "fxshow");
        n.queue || (a = x._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function() {
            a.unqueued || u()
        }), a.unqueued++, l.always(function() {
            l.always(function() {
                a.unqueued--, x.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === x.css(e, "display") && "none" === x.css(e, "float") && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", l.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], wn.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (f ? "hide" : "show")) {
                    if ("show" !== i || !h || h[r] === undefined) continue;
                    f = !0
                }
                c[r] = h && h[r] || x.style(e, r)
            }
        if (!x.isEmptyObject(c)) {
            h ? "hidden" in h && (f = h.hidden) : h = q.access(e, "fxshow", {}), o && (h.hidden = !f), f ? x(e).show() : l.done(function() {
                x(e).hide()
            }), l.done(function() {
                var t;
                q.remove(e, "fxshow");
                for (t in c) x.style(e, t, c[t])
            });
            for (r in c) s = Sn(f ? h[r] : 0, r, l), r in h || (h[r] = s.start, f && (s.end = s.start, s.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function Ln(e, t, n, r, i) {
        return new Ln.prototype.init(e, t, n, r, i)
    }

    function qn(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = jt[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function Hn(e) {
        return x.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var t, n, r = typeof undefined,
        i = e.location,
        o = e.document,
        s = o.documentElement,
        a = e.jQuery,
        u = e.$,
        l = {},
        c = [],
        p = "2.0.3",
        f = c.concat,
        h = c.push,
        d = c.slice,
        g = c.indexOf,
        m = l.toString,
        y = l.hasOwnProperty,
        v = p.trim,
        x = function(e, n) {
            return new x.fn.init(e, n, t)
        },
        b = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        w = /\S+/g,
        T = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        k = /^-ms-/,
        N = /-([\da-z])/gi,
        E = function(e, t) {
            return t.toUpperCase()
        },
        S = function() {
            o.removeEventListener("DOMContentLoaded", S, !1), e.removeEventListener("load", S, !1), x.ready()
        };
    x.fn = x.prototype = {
            jquery: p,
            constructor: x,
            init: function(e, t, n) {
                var r, i;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : T.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                    if (r[1]) {
                        if (t = t instanceof x ? t[0] : t, x.merge(this, x.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : o, !0)), C.test(r[1]) && x.isPlainObject(t))
                            for (r in t) x.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                        return this
                    }
                    return i = o.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = o, this.selector = e, this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : x.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), x.makeArray(e, this))
            },
            selector: "",
            length: 0,
            toArray: function() {
                return d.call(this)
            },
            get: function(e) {
                return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
            },
            pushStack: function(e) {
                var t = x.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e, t) {
                return x.each(this, e, t)
            },
            ready: function(e) {
                return x.ready.promise().done(e), this
            },
            slice: function() {
                return this.pushStack(d.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            },
            map: function(e) {
                return this.pushStack(x.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: h,
            sort: [].sort,
            splice: [].splice
        }, x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function() {
            var e, t, n, r, i, o, s = arguments[0] || {},
                a = 1,
                u = arguments.length,
                l = !1;
            for ("boolean" == typeof s && (l = s, s = arguments[1] || {}, a = 2), "object" == typeof s || x.isFunction(s) || (s = {}), u === a && (s = this, --a); u > a; a++)
                if (null != (e = arguments[a]))
                    for (t in e) n = s[t], r = e[t], s !== r && (l && r && (x.isPlainObject(r) || (i = x.isArray(r))) ? (i ? (i = !1, o = n && x.isArray(n) ? n : []) : o = n && x.isPlainObject(n) ? n : {}, s[t] = x.extend(l, o, r)) : r !== undefined && (s[t] = r));
            return s
        }, x.extend({
            expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""),
            noConflict: function(t) {
                return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = a), x
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? x.readyWait++ : x.ready(!0)
            },
            ready: function(e) {
                (e === !0 ? --x.readyWait : x.isReady) || (x.isReady = !0, e !== !0 && --x.readyWait > 0 || (n.resolveWith(o, [x]), x.fn.trigger && x(o).trigger("ready").off("ready")))
            },
            isFunction: function(e) {
                return "function" === x.type(e)
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return null != e && e === e.window
            },
            isNumeric: function(e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e
            },
            isPlainObject: function(e) {
                if ("object" !== x.type(e) || e.nodeType || x.isWindow(e)) return !1;
                try {
                    if (e.constructor && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1
                } catch (t) {
                    return !1
                }
                return !0
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            error: function(e) {
                throw Error(e)
            },
            parseHTML: function(e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && (n = t, t = !1), t = t || o;
                var r = C.exec(e),
                    i = !n && [];
                return r ? [t.createElement(r[1])] : (r = x.buildFragment([e], t, i), i && x(i).remove(), x.merge([], r.childNodes))
            },
            parseJSON: JSON.parse,
            parseXML: function(e) {
                var t, n;
                if (!e || "string" != typeof e) return null;
                try {
                    n = new DOMParser, t = n.parseFromString(e, "text/xml")
                } catch (r) {
                    t = undefined
                }
                return (!t || t.getElementsByTagName("parsererror").length) && x.error("Invalid XML: " + e), t
            },
            noop: function() {},
            globalEval: function(e) {
                var t, n = eval;
                e = x.trim(e), e && (1 === e.indexOf("use strict") ? (t = o.createElement("script"), t.text = e, o.head.appendChild(t).parentNode.removeChild(t)) : n(e))
            },
            camelCase: function(e) {
                return e.replace(k, "ms-").replace(N, E)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, n) {
                var r, i = 0,
                    o = e.length,
                    s = j(e);
                if (n) {
                    if (s)
                        for (; o > i && (r = t.apply(e[i], n), r !== !1); i++);
                    else
                        for (i in e)
                            if (r = t.apply(e[i], n), r === !1) break
                } else if (s)
                    for (; o > i && (r = t.call(e[i], i, e[i]), r !== !1); i++);
                else
                    for (i in e)
                        if (r = t.call(e[i], i, e[i]), r === !1) break; return e
            },
            trim: function(e) {
                return null == e ? "" : v.call(e)
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (j(Object(e)) ? x.merge(n, "string" == typeof e ? [e] : e) : h.call(n, e)), n
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : g.call(t, e, n)
            },
            merge: function(e, t) {
                var n = t.length,
                    r = e.length,
                    i = 0;
                if ("number" == typeof n)
                    for (; n > i; i++) e[r++] = t[i];
                else
                    for (; t[i] !== undefined;) e[r++] = t[i++];
                return e.length = r, e
            },
            grep: function(e, t, n) {
                var r, i = [],
                    o = 0,
                    s = e.length;
                for (n = !!n; s > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]);
                return i
            },
            map: function(e, t, n) {
                var r, i = 0,
                    o = e.length,
                    s = j(e),
                    a = [];
                if (s)
                    for (; o > i; i++) r = t(e[i], i, n), null != r && (a[a.length] = r);
                else
                    for (i in e) r = t(e[i], i, n), null != r && (a[a.length] = r);
                return f.apply([], a)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, r, i;
                return "string" == typeof t && (n = e[t], t = e, e = n), x.isFunction(e) ? (r = d.call(arguments, 2), i = function() {
                    return e.apply(t || this, r.concat(d.call(arguments)))
                }, i.guid = e.guid = e.guid || x.guid++, i) : undefined
            },
            access: function(e, t, n, r, i, o, s) {
                var a = 0,
                    u = e.length,
                    l = null == n;
                if ("object" === x.type(n)) {
                    i = !0;
                    for (a in n) x.access(e, t, a, n[a], !0, o, s)
                } else if (r !== undefined && (i = !0, x.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                        return l.call(x(e), n)
                    })), t))
                    for (; u > a; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
                return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
            },
            now: Date.now,
            swap: function(e, t, n, r) {
                var i, o, s = {};
                for (o in t) s[o] = e.style[o], e.style[o] = t[o];
                i = n.apply(e, r || []);
                for (o in t) e.style[o] = s[o];
                return i
            }
        }), x.ready.promise = function(t) {
            return n || (n = x.Deferred(), "complete" === o.readyState ? setTimeout(x.ready) : (o.addEventListener("DOMContentLoaded", S, !1), e.addEventListener("load", S, !1))), n.promise(t)
        }, x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            l["[object " + t + "]"] = t.toLowerCase()
        }), t = x(o),
        function(e, undefined) {
            function ot(e, t, r, i) {
                var o, s, a, u, l, f, g, m, x, w;
                if ((t ? t.ownerDocument || t : b) !== p && c(t), t = t || p, r = r || [], !e || "string" != typeof e) return r;
                if (1 !== (u = t.nodeType) && 9 !== u) return [];
                if (h && !i) {
                    if (o = K.exec(e))
                        if (a = o[1]) {
                            if (9 === u) {
                                if (s = t.getElementById(a), !s || !s.parentNode) return r;
                                if (s.id === a) return r.push(s), r
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && y(t, s) && s.id === a) return r.push(s), r
                        } else {
                            if (o[2]) return O.apply(r, t.getElementsByTagName(e)), r;
                            if ((a = o[3]) && n.getElementsByClassName && t.getElementsByClassName) return O.apply(r, t.getElementsByClassName(a)), r
                        }
                    if (n.qsa && (!d || !d.test(e))) {
                        if (m = g = v, x = t, w = 9 === u && e, 1 === u && "object" !== t.nodeName.toLowerCase()) {
                            for (f = gt(e), (g = t.getAttribute("id")) ? m = g.replace(tt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", l = f.length; l--;) f[l] = m + mt(f[l]);
                            x = U.test(e) && t.parentNode || t, w = f.join(",")
                        }
                        if (w) try {
                            return O.apply(r, x.querySelectorAll(w)), r
                        } catch (T) {} finally {
                            g || t.removeAttribute("id")
                        }
                    }
                }
                return kt(e.replace(z, "$1"), t, r, i)
            }

            function st() {
                function t(n, r) {
                    return e.push(n += " ") > i.cacheLength && delete t[e.shift()], t[n] = r
                }
                var e = [];
                return t
            }

            function at(e) {
                return e[v] = !0, e
            }

            function ut(e) {
                var t = p.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function lt(e, t) {
                for (var n = e.split("|"), r = e.length; r--;) i.attrHandle[n[r]] = t
            }

            function ct(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || D) - (~e.sourceIndex || D);
                if (r) return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function pt(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function ft(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function ht(e) {
                return at(function(t) {
                    return t = +t, at(function(n, r) {
                        for (var i, o = e([], n.length, t), s = o.length; s--;) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function dt() {}

            function gt(e, t) {
                var n, r, o, s, a, u, l, c = k[e + " "];
                if (c) return t ? 0 : c.slice(0);
                for (a = e, u = [], l = i.preFilter; a;) {
                    (!n || (r = _.exec(a))) && (r && (a = a.slice(r[0].length) || a), u.push(o = [])), n = !1, (r = X.exec(a)) && (n = r.shift(), o.push({
                        value: n,
                        type: r[0].replace(z, " ")
                    }), a = a.slice(n.length));
                    for (s in i.filter) !(r = J[s].exec(a)) || l[s] && !(r = l[s](r)) || (n = r.shift(), o.push({
                        value: n,
                        type: s,
                        matches: r
                    }), a = a.slice(n.length));
                    if (!n) break
                }
                return t ? a.length : a ? ot.error(e) : k(e, u).slice(0)
            }

            function mt(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
                return r
            }

            function yt(e, t, n) {
                var i = t.dir,
                    o = n && "parentNode" === i,
                    s = T++;
                return t.first ? function(t, n, r) {
                    for (; t = t[i];)
                        if (1 === t.nodeType || o) return e(t, n, r)
                } : function(t, n, a) {
                    var u, l, c, p = w + " " + s;
                    if (a) {
                        for (; t = t[i];)
                            if ((1 === t.nodeType || o) && e(t, n, a)) return !0
                    } else
                        for (; t = t[i];)
                            if (1 === t.nodeType || o)
                                if (c = t[v] || (t[v] = {}), (l = c[i]) && l[0] === p) {
                                    if ((u = l[1]) === !0 || u === r) return u === !0
                                } else if (l = c[i] = [p], l[1] = e(t, n, a) || r, l[1] === !0) return !0
                }
            }

            function vt(e) {
                return e.length > 1 ? function(t, n, r) {
                    for (var i = e.length; i--;)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function xt(e, t, n, r, i) {
                for (var o, s = [], a = 0, u = e.length, l = null != t; u > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
                return s
            }

            function bt(e, t, n, r, i, o) {
                return r && !r[v] && (r = bt(r)), i && !i[v] && (i = bt(i, o)), at(function(o, s, a, u) {
                    var l, c, p, f = [],
                        h = [],
                        d = s.length,
                        g = o || Ct(t || "*", a.nodeType ? [a] : a, []),
                        m = !e || !o && t ? g : xt(g, f, e, a, u),
                        y = n ? i || (o ? e : d || r) ? [] : s : m;
                    if (n && n(m, y, a, u), r)
                        for (l = xt(y, h), r(l, [], a, u), c = l.length; c--;)(p = l[c]) && (y[h[c]] = !(m[h[c]] = p));
                    if (o) {
                        if (i || e) {
                            if (i) {
                                for (l = [], c = y.length; c--;)(p = y[c]) && l.push(m[c] = p);
                                i(null, y = [], l, u)
                            }
                            for (c = y.length; c--;)(p = y[c]) && (l = i ? P.call(o, p) : f[c]) > -1 && (o[l] = !(s[l] = p))
                        }
                    } else y = xt(y === s ? y.splice(d, y.length) : y), i ? i(null, s, y, u) : O.apply(s, y)
                })
            }

            function wt(e) {
                for (var t, n, r, o = e.length, s = i.relative[e[0].type], a = s || i.relative[" "], l = s ? 1 : 0, c = yt(function(e) {
                        return e === t
                    }, a, !0), p = yt(function(e) {
                        return P.call(t, e) > -1
                    }, a, !0), f = [function(e, n, r) {
                        return !s && (r || n !== u) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r))
                    }]; o > l; l++)
                    if (n = i.relative[e[l].type]) f = [yt(vt(f), n)];
                    else {
                        if (n = i.filter[e[l].type].apply(null, e[l].matches), n[v]) {
                            for (r = ++l; o > r && !i.relative[e[r].type]; r++);
                            return bt(l > 1 && vt(f), l > 1 && mt(e.slice(0, l - 1).concat({
                                value: " " === e[l - 2].type ? "*" : ""
                            })).replace(z, "$1"), n, r > l && wt(e.slice(l, r)), o > r && wt(e = e.slice(r)), o > r && mt(e))
                        }
                        f.push(n)
                    }
                return vt(f)
            }

            function Tt(e, t) {
                var n = 0,
                    o = t.length > 0,
                    s = e.length > 0,
                    a = function(a, l, c, f, h) {
                        var d, g, m, y = [],
                            v = 0,
                            x = "0",
                            b = a && [],
                            T = null != h,
                            C = u,
                            k = a || s && i.find.TAG("*", h && l.parentNode || l),
                            N = w += null == C ? 1 : Math.random() || .1;
                        for (T && (u = l !== p && l, r = n); null != (d = k[x]); x++) {
                            if (s && d) {
                                for (g = 0; m = e[g++];)
                                    if (m(d, l, c)) {
                                        f.push(d);
                                        break
                                    }
                                T && (w = N, r = ++n)
                            }
                            o && ((d = !m && d) && v--, a && b.push(d))
                        }
                        if (v += x, o && x !== v) {
                            for (g = 0; m = t[g++];) m(b, y, l, c);
                            if (a) {
                                if (v > 0)
                                    for (; x--;) b[x] || y[x] || (y[x] = q.call(f));
                                y = xt(y)
                            }
                            O.apply(f, y), T && !a && y.length > 0 && v + t.length > 1 && ot.uniqueSort(f)
                        }
                        return T && (w = N, u = C), b
                    };
                return o ? at(a) : a
            }

            function Ct(e, t, n) {
                for (var r = 0, i = t.length; i > r; r++) ot(e, t[r], n);
                return n
            }

            function kt(e, t, r, o) {
                var s, u, l, c, p, f = gt(e);
                if (!o && 1 === f.length) {
                    if (u = f[0] = f[0].slice(0), u.length > 2 && "ID" === (l = u[0]).type && n.getById && 9 === t.nodeType && h && i.relative[u[1].type]) {
                        if (t = (i.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t) return r;
                        e = e.slice(u.shift().value.length)
                    }
                    for (s = J.needsContext.test(e) ? 0 : u.length; s-- && (l = u[s], !i.relative[c = l.type]);)
                        if ((p = i.find[c]) && (o = p(l.matches[0].replace(nt, rt), U.test(u[0].type) && t.parentNode || t))) {
                            if (u.splice(s, 1), e = o.length && mt(u), !e) return O.apply(r, o), r;
                            break
                        }
                }
                return a(e, f)(o, t, !h, r, U.test(e)), r
            }
            var t, n, r, i, o, s, a, u, l, c, p, f, h, d, g, m, y, v = "sizzle" + -new Date,
                b = e.document,
                w = 0,
                T = 0,
                C = st(),
                k = st(),
                N = st(),
                E = !1,
                S = function(e, t) {
                    return e === t ? (E = !0, 0) : 0
                },
                j = typeof undefined,
                D = 1 << 31,
                A = {}.hasOwnProperty,
                L = [],
                q = L.pop,
                H = L.push,
                O = L.push,
                F = L.slice,
                P = L.indexOf || function(e) {
                    for (var t = 0, n = this.length; n > t; t++)
                        if (this[t] === e) return t;
                    return -1
                },
                R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                M = "[\\x20\\t\\r\\n\\f]",
                W = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                $ = W.replace("w", "w#"),
                B = "\\[" + M + "*(" + W + ")" + M + "*(?:([*^$|!~]?=)" + M + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + $ + ")|)|)" + M + "*\\]",
                I = ":(" + W + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + B.replace(3, 8) + ")*)|.*)\\)|)",
                z = RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
                _ = RegExp("^" + M + "*," + M + "*"),
                X = RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
                U = RegExp(M + "*[+~]"),
                Y = RegExp("=" + M + "*([^\\]'\"]*)" + M + "*\\]", "g"),
                V = RegExp(I),
                G = RegExp("^" + $ + "$"),
                J = {
                    ID: RegExp("^#(" + W + ")"),
                    CLASS: RegExp("^\\.(" + W + ")"),
                    TAG: RegExp("^(" + W.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + B),
                    PSEUDO: RegExp("^" + I),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                    bool: RegExp("^(?:" + R + ")$", "i"),
                    needsContext: RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
                },
                Q = /^[^{]+\{\s*\[native \w/,
                K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                Z = /^(?:input|select|textarea|button)$/i,
                et = /^h\d$/i,
                tt = /'|\\/g,
                nt = RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
                rt = function(e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
                };
            try {
                O.apply(L = F.call(b.childNodes), b.childNodes), L[b.childNodes.length].nodeType
            } catch (it) {
                O = {
                    apply: L.length ? function(e, t) {
                        H.apply(e, F.call(t))
                    } : function(e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++];);
                        e.length = n - 1
                    }
                }
            }
            s = ot.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, n = ot.support = {}, c = ot.setDocument = function(e) {
                var t = e ? e.ownerDocument || e : b,
                    r = t.defaultView;
                return t !== p && 9 === t.nodeType && t.documentElement ? (p = t, f = t.documentElement, h = !s(t), r && r.attachEvent && r !== r.top && r.attachEvent("onbeforeunload", function() {
                    c()
                }), n.attributes = ut(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), n.getElementsByTagName = ut(function(e) {
                    return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
                }), n.getElementsByClassName = ut(function(e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), n.getById = ut(function(e) {
                    return f.appendChild(e).id = v, !t.getElementsByName || !t.getElementsByName(v).length
                }), n.getById ? (i.find.ID = function(e, t) {
                    if (typeof t.getElementById !== j && h) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, i.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete i.find.ID, i.filter.ID = function(e) {
                    var t = e.replace(nt, rt);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== j && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), i.find.TAG = n.getElementsByTagName ? function(e, t) {
                    return typeof t.getElementsByTagName !== j ? t.getElementsByTagName(e) : undefined
                } : function(e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, i.find.CLASS = n.getElementsByClassName && function(e, t) {
                    return typeof t.getElementsByClassName !== j && h ? t.getElementsByClassName(e) : undefined
                }, g = [], d = [], (n.qsa = Q.test(t.querySelectorAll)) && (ut(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || d.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll(":checked").length || d.push(":checked")
                }), ut(function(e) {
                    var n = t.createElement("input");
                    n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && d.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || d.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), d.push(",.*:")
                })), (n.matchesSelector = Q.test(m = f.webkitMatchesSelector || f.mozMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && ut(function(e) {
                    n.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", I)
                }), d = d.length && RegExp(d.join("|")), g = g.length && RegExp(g.join("|")), y = Q.test(f.contains) || f.compareDocumentPosition ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, S = f.compareDocumentPosition ? function(e, r) {
                    if (e === r) return E = !0, 0;
                    var i = r.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(r);
                    return i ? 1 & i || !n.sortDetached && r.compareDocumentPosition(e) === i ? e === t || y(b, e) ? -1 : r === t || y(b, r) ? 1 : l ? P.call(l, e) - P.call(l, r) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                } : function(e, n) {
                    var r, i = 0,
                        o = e.parentNode,
                        s = n.parentNode,
                        a = [e],
                        u = [n];
                    if (e === n) return E = !0, 0;
                    if (!o || !s) return e === t ? -1 : n === t ? 1 : o ? -1 : s ? 1 : l ? P.call(l, e) - P.call(l, n) : 0;
                    if (o === s) return ct(e, n);
                    for (r = e; r = r.parentNode;) a.unshift(r);
                    for (r = n; r = r.parentNode;) u.unshift(r);
                    for (; a[i] === u[i];) i++;
                    return i ? ct(a[i], u[i]) : a[i] === b ? -1 : u[i] === b ? 1 : 0
                }, t) : p
            }, ot.matches = function(e, t) {
                return ot(e, null, null, t)
            }, ot.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Y, "='$1']"), !(!n.matchesSelector || !h || g && g.test(t) || d && d.test(t))) try {
                    var r = m.call(e, t);
                    if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                } catch (i) {}
                return ot(t, p, null, [e]).length > 0
            }, ot.contains = function(e, t) {
                return (e.ownerDocument || e) !== p && c(e), y(e, t)
            }, ot.attr = function(e, t) {
                (e.ownerDocument || e) !== p && c(e);
                var r = i.attrHandle[t.toLowerCase()],
                    o = r && A.call(i.attrHandle, t.toLowerCase()) ? r(e, t, !h) : undefined;
                return o === undefined ? n.attributes || !h ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null : o
            }, ot.error = function(e) {
                throw Error("Syntax error, unrecognized expression: " + e)
            }, ot.uniqueSort = function(e) {
                var t, r = [],
                    i = 0,
                    o = 0;
                if (E = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(S), E) {
                    for (; t = e[o++];) t === e[o] && (i = r.push(o));
                    for (; i--;) e.splice(r[i], 1)
                }
                return e
            }, o = ot.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    for (; t = e[r]; r++) n += o(t);
                return n
            }, i = ot.selectors = {
                cacheLength: 50,
                createPseudo: at,
                match: J,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(nt, rt), e[3] = (e[4] || e[5] || "").replace(nt, rt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ot.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[5] && e[2];
                        return J.CHILD.test(e[0]) ? null : (e[3] && e[4] !== undefined ? e[2] = e[4] : n && V.test(n) && (t = gt(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(nt, rt).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = C[e + " "];
                        return t || (t = RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && C(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== j && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var i = ot.attr(r, e);
                            return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3),
                            s = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === r && 0 === i ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, u) {
                            var l, c, p, f, h, d, g = o !== s ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                y = a && t.nodeName.toLowerCase(),
                                x = !u && !a;
                            if (m) {
                                if (o) {
                                    for (; g;) {
                                        for (p = t; p = p[g];)
                                            if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
                                        d = g = "only" === e && !d && "nextSibling"
                                    }
                                    return !0
                                }
                                if (d = [s ? m.firstChild : m.lastChild], s && x) {
                                    for (c = m[v] || (m[v] = {}), l = c[e] || [], h = l[0] === w && l[1], f = l[0] === w && l[2], p = h && m.childNodes[h]; p = ++h && p && p[g] || (f = h = 0) || d.pop();)
                                        if (1 === p.nodeType && ++f && p === t) {
                                            c[e] = [w, h, f];
                                            break
                                        }
                                } else if (x && (l = (t[v] || (t[v] = {}))[e]) && l[0] === w) f = l[1];
                                else
                                    for (;
                                        (p = ++h && p && p[g] || (f = h = 0) || d.pop()) && ((a ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++f || (x && ((p[v] || (p[v] = {}))[e] = [w, f]), p !== t)););
                                return f -= i, f === r || 0 === f % r && f / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                        return r[v] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function(e, n) {
                            for (var i, o = r(e, t), s = o.length; s--;) i = P.call(e, o[s]), e[i] = !(n[i] = o[s])
                        }) : function(e) {
                            return r(e, 0, n)
                        }) : r
                    }
                },
                pseudos: {
                    not: at(function(e) {
                        var t = [],
                            n = [],
                            r = a(e.replace(z, "$1"));
                        return r[v] ? at(function(e, t, n, i) {
                            for (var o, s = r(e, null, i, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
                        }) : function(e, i, o) {
                            return t[0] = e, r(t, null, o, n), !n.pop()
                        }
                    }),
                    has: at(function(e) {
                        return function(t) {
                            return ot(e, t).length > 0
                        }
                    }),
                    contains: at(function(e) {
                        return function(t) {
                            return (t.textContent || t.innerText || o(t)).indexOf(e) > -1
                        }
                    }),
                    lang: at(function(e) {
                        return G.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === f
                    },
                    focus: function(e) {
                        return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !i.pseudos.empty(e)
                    },
                    header: function(e) {
                        return et.test(e.nodeName)
                    },
                    input: function(e) {
                        return Z.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                    },
                    first: ht(function() {
                        return [0]
                    }),
                    last: ht(function(e, t) {
                        return [t - 1]
                    }),
                    eq: ht(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: ht(function(e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: ht(function(e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: ht(function(e, t, n) {
                        for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: ht(function(e, t, n) {
                        for (var r = 0 > n ? n + t : n; t > ++r;) e.push(r);
                        return e
                    })
                }
            }, i.pseudos.nth = i.pseudos.eq;
            for (t in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) i.pseudos[t] = pt(t);
            for (t in {
                    submit: !0,
                    reset: !0
                }) i.pseudos[t] = ft(t);
            dt.prototype = i.filters = i.pseudos, i.setFilters = new dt, a = ot.compile = function(e, t) {
                var n, r = [],
                    i = [],
                    o = N[e + " "];
                if (!o) {
                    for (t || (t = gt(e)), n = t.length; n--;) o = wt(t[n]), o[v] ? r.push(o) : i.push(o);
                    o = N(e, Tt(i, r))
                }
                return o
            }, n.sortStable = v.split("").sort(S).join("") === v, n.detectDuplicates = E, c(), n.sortDetached = ut(function(e) {
                return 1 & e.compareDocumentPosition(p.createElement("div"))
            }), ut(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || lt("type|href|height|width", function(e, t, n) {
                return n ? undefined : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), n.attributes && ut(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || lt("value", function(e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? undefined : e.defaultValue
            }), ut(function(e) {
                return null == e.getAttribute("disabled")
            }) || lt(R, function(e, t, n) {
                var r;
                return n ? undefined : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
            }), x.find = ot, x.expr = ot.selectors, x.expr[":"] = x.expr.pseudos, x.unique = ot.uniqueSort, x.text = ot.getText, x.isXMLDoc = ot.isXML, x.contains = ot.contains
        }(e);
    var D = {};
    x.Callbacks = function(e) {
        e = "string" == typeof e ? D[e] || A(e) : x.extend({}, e);
        var t, n, r, i, o, s, a = [],
            u = !e.once && [],
            l = function(p) {
                for (t = e.memory && p, n = !0, s = i || 0, i = 0, o = a.length, r = !0; a && o > s; s++)
                    if (a[s].apply(p[0], p[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                r = !1, a && (u ? u.length && l(u.shift()) : t ? a = [] : c.disable())
            },
            c = {
                add: function() {
                    if (a) {
                        var n = a.length;
                        ! function s(t) {
                            x.each(t, function(t, n) {
                                var r = x.type(n);
                                "function" === r ? e.unique && c.has(n) || a.push(n) : n && n.length && "string" !== r && s(n)
                            })
                        }(arguments), r ? o = a.length : t && (i = n, l(t))
                    }
                    return this
                },
                remove: function() {
                    return a && x.each(arguments, function(e, t) {
                        for (var n;
                            (n = x.inArray(t, a, n)) > -1;) a.splice(n, 1), r && (o >= n && o--, s >= n && s--)
                    }), this
                },
                has: function(e) {
                    return e ? x.inArray(e, a) > -1 : !(!a || !a.length)
                },
                empty: function() {
                    return a = [], o = 0, this
                },
                disable: function() {
                    return a = u = t = undefined, this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return u = undefined, t || c.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(e, t) {
                    return !a || n && !u || (t = t || [], t = [e, t.slice ? t.slice() : t], r ? u.push(t) : l(t)), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return c
    }, x.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", x.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", x.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", x.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return x.Deferred(function(n) {
                            x.each(t, function(t, o) {
                                var s = o[0],
                                    a = x.isFunction(e[t]) && e[t];
                                i[o[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && x.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? x.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, x.each(t, function(e, o) {
                var s = o[2],
                    a = o[3];
                r[o[1]] = s.add, a && s.add(function() {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = s.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var a, u, l, t = 0,
                n = d.call(arguments),
                r = n.length,
                i = 1 !== r || e && x.isFunction(e.promise) ? r : 0,
                o = 1 === i ? e : x.Deferred(),
                s = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --i || o.resolveWith(t, n)
                    }
                };
            if (r > 1)
                for (a = Array(r), u = Array(r), l = Array(r); r > t; t++) n[t] && x.isFunction(n[t].promise) ? n[t].promise().done(s(t, l, n)).fail(o.reject).progress(s(t, u, a)) : --i;
            return i || o.resolveWith(l, n), o.promise()
        }
    }), x.support = function(t) {
        var n = o.createElement("input"),
            r = o.createDocumentFragment(),
            i = o.createElement("div"),
            s = o.createElement("select"),
            a = s.appendChild(o.createElement("option"));
        return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = a.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !a.disabled, n = o.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === i.style.backgroundClip, x(function() {
            var n, r, s = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                a = o.getElementsByTagName("body")[0];
            a && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", x.swap(a, null != a.style.zoom ? {
                zoom: 1
            } : {}, function() {
                t.boxSizing = 4 === i.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
                width: "4px"
            }).width, r = i.appendChild(o.createElement("div")), r.style.cssText = i.style.cssText = s, r.style.marginRight = r.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), a.removeChild(n))
        }), t) : t
    }({});
    var L, q, H = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        O = /([A-Z])/g;
    F.uid = 1, F.accepts = function(e) {
        return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0
    }, F.prototype = {
        key: function(e) {
            if (!F.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = F.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, x.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(e, t, n) {
            var r, i = this.key(e),
                o = this.cache[i];
            if ("string" == typeof t) o[t] = n;
            else if (x.isEmptyObject(o)) x.extend(this.cache[i], t);
            else
                for (r in t) o[r] = t[r];
            return o
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return t === undefined ? n : n[t]
        },
        access: function(e, t, n) {
            var r;
            return t === undefined || t && "string" == typeof t && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, x.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
        },
        remove: function(e, t) {
            var n, r, i, o = this.key(e),
                s = this.cache[o];
            if (t === undefined) this.cache[o] = {};
            else {
                x.isArray(t) ? r = t.concat(t.map(x.camelCase)) : (i = x.camelCase(t), t in s ? r = [t, i] : (r = i, r = r in s ? [r] : r.match(w) || [])), n = r.length;
                for (; n--;) delete s[r[n]]
            }
        },
        hasData: function(e) {
            return !x.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    }, L = new F, q = new F, x.extend({
        acceptData: F.accepts,
        hasData: function(e) {
            return L.hasData(e) || q.hasData(e)
        },
        data: function(e, t, n) {
            return L.access(e, t, n)
        },
        removeData: function(e, t) {
            L.remove(e, t)
        },
        _data: function(e, t, n) {
            return q.access(e, t, n)
        },
        _removeData: function(e, t) {
            q.remove(e, t)
        }
    }), x.fn.extend({
        data: function(e, t) {
            var n, r, i = this[0],
                o = 0,
                s = null;
            if (e === undefined) {
                if (this.length && (s = L.get(i), 1 === i.nodeType && !q.get(i, "hasDataAttrs"))) {
                    for (n = i.attributes; n.length > o; o++) r = n[o].name, 0 === r.indexOf("data-") && (r = x.camelCase(r.slice(5)), P(i, r, s[r]));
                    q.set(i, "hasDataAttrs", !0)
                }
                return s
            }
            return "object" == typeof e ? this.each(function() {
                L.set(this, e)
            }) : x.access(this, function(t) {
                var n, r = x.camelCase(e);
                if (i && t === undefined) {
                    if (n = L.get(i, e), n !== undefined) return n;
                    if (n = L.get(i, r), n !== undefined) return n;
                    if (n = P(i, r, undefined), n !== undefined) return n
                } else this.each(function() {
                    var n = L.get(this, r);
                    L.set(this, r, t), -1 !== e.indexOf("-") && n !== undefined && L.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                L.remove(this, e)
            })
        }
    }), x.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = q.get(e, t), n && (!r || x.isArray(n) ? r = q.access(e, t, x.makeArray(n)) : r.push(n)), r || []) : undefined
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = x.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = x._queueHooks(e, t),
                s = function() {
                    x.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return q.get(e, n) || q.access(e, n, {
                empty: x.Callbacks("once memory").add(function() {
                    q.remove(e, [t + "queue", n])
                })
            })
        }
    }), x.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), n > arguments.length ? x.queue(this[0], e) : t === undefined ? this : this.each(function() {
                var n = x.queue(this, e, t);
                x._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && x.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                x.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = x.fx ? x.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = x.Deferred(),
                o = this,
                s = this.length,
                a = function() {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = undefined), e = e || "fx"; s--;) n = q.get(o[s], e + "queueHooks"), n && n.empty && (r++, n.empty.add(a));
            return a(), i.promise(t)
        }
    });
    var R, M, W = /[\t\r\n\f]/g,
        $ = /\r/g,
        B = /^(?:input|select|textarea|button)$/i;
    x.fn.extend({
        attr: function(e, t) {
            return x.access(this, x.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                x.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return x.access(this, x.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[x.propFix[e] || e]
            })
        },
        addClass: function(e) {
            var t, n, r, i, o, s = 0,
                a = this.length,
                u = "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).addClass(e.call(this, t, this.className))
            });
            if (u)
                for (t = (e || "").match(w) || []; a > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : " ")) {
                        for (o = 0; i = t[o++];) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
                        n.className = x.trim(r)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, s = 0,
                a = this.length,
                u = 0 === arguments.length || "string" == typeof e && e;
            if (x.isFunction(e)) return this.each(function(t) {
                x(this).removeClass(e.call(this, t, this.className))
            });
            if (u)
                for (t = (e || "").match(w) || []; a > s; s++)
                    if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(W, " ") : "")) {
                        for (o = 0; i = t[o++];)
                            for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                        n.className = e ? x.trim(r) : ""
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(x.isFunction(e) ? function(n) {
                x(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function() {
                if ("string" === n)
                    for (var t, i = 0, o = x(this), s = e.match(w) || []; t = s[i++];) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                else(n === r || "boolean" === n) && (this.className && q.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : q.get(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(W, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = x.isFunction(e), this.each(function(n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, x(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : x.isArray(i) && (i = x.map(i, function(e) {
                    return null == e ? "" : e + ""
                })), t = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()], t && "set" in t && t.set(this, i, "value") !== undefined || (this.value = i))
            })) : i ? (t = x.valHooks[i.type] || x.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, "string" == typeof n ? n.replace($, "") : null == n ? "" : n)) : void 0
        }
    }), x.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, s = o ? null : [], a = o ? i + 1 : r.length, u = 0 > i ? a : o ? i : 0; a > u; u++)
                        if (n = r[u], !(!n.selected && u !== i || (x.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && x.nodeName(n.parentNode, "optgroup"))) {
                            if (t = x(n).val(), o) return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = x.makeArray(t), s = i.length; s--;) r = i[s], (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        },
        attr: function(e, t, n) {
            var i, o, s = e.nodeType;
            return e && 3 !== s && 8 !== s && 2 !== s ? typeof e.getAttribute === r ? x.prop(e, t, n) : (1 === s && x.isXMLDoc(e) || (t = t.toLowerCase(), i = x.attrHooks[t] || (x.expr.match.bool.test(t) ? M : R)), n === undefined ? i && "get" in i && null !== (o = i.get(e, t)) ? o : (o = x.find.attr(e, t), null == o ? undefined : o) : null !== n ? i && "set" in i && (o = i.set(e, n, t)) !== undefined ? o : (e.setAttribute(t, n + ""), n) : (x.removeAttr(e, t), undefined)) : void 0
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                o = t && t.match(w);
            if (o && 1 === e.nodeType)
                for (; n = o[i++];) r = x.propFix[n] || n, x.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!x.support.radioValue && "radio" === t && x.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, o, s = e.nodeType;
            return e && 3 !== s && 8 !== s && 2 !== s ? (o = 1 !== s || !x.isXMLDoc(e), o && (t = x.propFix[t] || t, i = x.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || B.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), M = {
        set: function(e, t, n) {
            return t === !1 ? x.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, x.each(x.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = x.expr.attrHandle[t] || x.find.attr;
        x.expr.attrHandle[t] = function(e, t, r) {
            var i = x.expr.attrHandle[t],
                o = r ? undefined : (x.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
            return x.expr.attrHandle[t] = i, o
        }
    }), x.support.optSelected || (x.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        x.propFix[this.toLowerCase()] = this
    }), x.each(["radio", "checkbox"], function() {
        x.valHooks[this] = {
            set: function(e, t) {
                return x.isArray(t) ? e.checked = x.inArray(x(e).val(), t) >= 0 : undefined
            }
        }, x.support.checkOn || (x.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var I = /^key/,
        z = /^(?:mouse|contextmenu)|click/,
        _ = /^(?:focusinfocus|focusoutblur)$/,
        X = /^([^.]*)(?:\.(.+)|)$/;
    x.event = {
        global: {},
        add: function(e, t, n, i, o) {
            var s, a, u, l, c, p, f, h, d, g, m, y = q.get(e);
            if (y) {
                for (n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = x.guid++), (l = y.events) || (l = y.events = {}), (a = y.handle) || (a = y.handle = function(e) {
                        return typeof x === r || e && x.event.triggered === e.type ? undefined : x.event.dispatch.apply(a.elem, arguments)
                    }, a.elem = e), t = (t || "").match(w) || [""], c = t.length; c--;) u = X.exec(t[c]) || [], d = m = u[1], g = (u[2] || "").split(".").sort(), d && (f = x.event.special[d] || {}, d = (o ? f.delegateType : f.bindType) || d, f = x.event.special[d] || {}, p = x.extend({
                    type: d,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && x.expr.match.needsContext.test(o),
                    namespace: g.join(".")
                }, s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, f.setup && f.setup.call(e, i, g, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), f.add && (f.add.call(e, p), p.handler.guid || (p.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, p) : h.push(p), x.event.global[d] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o, s, a, u, l, c, p, f, h, d, g, m = q.hasData(e) && q.get(e);
            if (m && (u = m.events)) {
                for (t = (t || "").match(w) || [""], l = t.length; l--;)
                    if (a = X.exec(t[l]) || [], h = g = a[1], d = (a[2] || "").split(".").sort(), h) {
                        for (p = x.event.special[h] || {}, h = (r ? p.delegateType : p.bindType) || h, f = u[h] || [], a = a[2] && RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = f.length; o--;) c = f[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, p.remove && p.remove.call(e, c));
                        s && !f.length && (p.teardown && p.teardown.call(e, d, m.handle) !== !1 || x.removeEvent(e, h, m.handle), delete u[h])
                    } else
                        for (h in u) x.event.remove(e, h + t[l], n, r, !0);
                x.isEmptyObject(u) && (delete m.handle, q.remove(e, "events"))
            }
        },
        trigger: function(t, n, r, i) {
            var s, a, u, l, c, p, f, h = [r || o],
                d = y.call(t, "type") ? t.type : t,
                g = y.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = u = r = r || o, 3 !== r.nodeType && 8 !== r.nodeType && !_.test(d + x.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = 0 > d.indexOf(":") && "on" + d, t = t[x.expando] ? t : new x.Event(d, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = g.join("."), t.namespace_re = t.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = null == n ? [t] : x.makeArray(n, [t]), f = x.event.special[d] || {}, i || !f.trigger || f.trigger.apply(r, n) !== !1)) {
                if (!i && !f.noBubble && !x.isWindow(r)) {
                    for (l = f.delegateType || d, _.test(l + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), u = a;
                    u === (r.ownerDocument || o) && h.push(u.defaultView || u.parentWindow || e)
                }
                for (s = 0;
                    (a = h[s++]) && !t.isPropagationStopped();) t.type = s > 1 ? l : f.bindType || d, p = (q.get(a, "events") || {})[t.type] && q.get(a, "handle"), p && p.apply(a, n), p = c && a[c], p && x.acceptData(a) && p.apply && p.apply(a, n) === !1 && t.preventDefault();
                return t.type = d, i || t.isDefaultPrevented() || f._default && f._default.apply(h.pop(), n) !== !1 || !x.acceptData(r) || c && x.isFunction(r[d]) && !x.isWindow(r) && (u = r[c], u && (r[c] = null), x.event.triggered = d, r[d](), x.event.triggered = undefined, u && (r[c] = u)), t.result
            }
        },
        dispatch: function(e) {
            e = x.event.fix(e);
            var t, n, r, i, o, s = [],
                a = d.call(arguments),
                u = (q.get(this, "events") || {})[e.type] || [],
                l = x.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (s = x.event.handlers.call(this, e, u), t = 0;
                    (i = s[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = i.elem, n = 0;
                        (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, r = ((x.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, a), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, s = [],
                a = t.delegateCount,
                u = e.target;
            if (a && u.nodeType && (!e.button || "click" !== e.type))
                for (; u !== this; u = u.parentNode || this)
                    if (u.disabled !== !0 || "click" !== e.type) {
                        for (r = [], n = 0; a > n; n++) o = t[n], i = o.selector + " ", r[i] === undefined && (r[i] = o.needsContext ? x(i, this).index(u) >= 0 : x.find(i, this, null, [u]).length), r[i] && r.push(o);
                        r.length && s.push({
                            elem: u,
                            handlers: r
                        })
                    }
            return t.length > a && s.push({
                elem: this,
                handlers: t.slice(a)
            }), s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, s = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || o, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || s === undefined || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[x.expando]) return e;
            var t, n, r, i = e.type,
                s = e,
                a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = z.test(i) ? this.mouseHooks : I.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new x.Event(s), t = r.length; t--;) n = r[t], e[n] = s[n];
            return e.target || (e.target = o), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== V() && this.focus ? (this.focus(), !1) : undefined
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === V() && this.blur ? (this.blur(), !1) : undefined
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && x.nodeName(this, "input") ? (this.click(), !1) : undefined
                },
                _default: function(e) {
                    return x.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== undefined && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = x.extend(new x.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, x.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, x.Event = function(e, t) {
        return this instanceof x.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? U : Y) : this.type = e, t && x.extend(this, t), this.timeStamp = e && e.timeStamp || x.now(), this[x.expando] = !0, undefined) : new x.Event(e, t)
    }, x.Event.prototype = {
        isDefaultPrevented: Y,
        isPropagationStopped: Y,
        isImmediatePropagationStopped: Y,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = U, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = U, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = U, this.stopPropagation()
        }
    }, x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        x.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return (!i || i !== r && !x.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), x.support.focusinBubbles || x.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                x.event.simulate(t, e.target, x.event.fix(e), !0)
            };
        x.event.special[t] = {
            setup: function() {
                0 === n++ && o.addEventListener(e, r, !0)
            },
            teardown: function() {
                0 === --n && o.removeEventListener(e, r, !0)
            }
        }
    }), x.fn.extend({
        on: function(e, t, n, r, i) {
            var o, s;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = undefined);
                for (s in e) this.on(s, t, n, e[s], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = undefined) : null == r && ("string" == typeof t ? (r = n, n = undefined) : (r = n, n = t, t = undefined)), r === !1) r = Y;
            else if (!r) return this;
            return 1 === i && (o = r, r = function(e) {
                return x().off(e), o.apply(this, arguments)
            }, r.guid = o.guid || (o.guid = x.guid++)), this.each(function() {
                x.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, x(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = undefined), n === !1 && (n = Y), this.each(function() {
                x.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                x.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? x.event.trigger(e, t, n, !0) : undefined
        }
    });
    var G = /^.[^:#\[\.,]*$/,
        J = /^(?:parents|prev(?:Until|All))/,
        Q = x.expr.match.needsContext,
        K = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    x.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(x(e).filter(function() {
                for (t = 0; i > t; t++)
                    if (x.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) x.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? x.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        has: function(e) {
            var t = x(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++)
                    if (x.contains(this, t[e])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(et(this, e || [], !0))
        },
        filter: function(e) {
            return this.pushStack(et(this, e || [], !1))
        },
        is: function(e) {
            return !!et(this, "string" == typeof e && Q.test(e) ? x(e) : e || [], !1).length
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, o = [], s = Q.test(e) || "string" != typeof e ? x(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (11 > n.nodeType && (s ? s.index(n) > -1 : 1 === n.nodeType && x.find.matchesSelector(n, e))) {
                        n = o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? x.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? g.call(x(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? x(e, t) : x.makeArray(e && e.nodeType ? [e] : e),
                r = x.merge(this.get(), n);
            return this.pushStack(x.unique(r))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), x.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return x.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return x.dir(e, "parentNode", n)
        },
        next: function(e) {
            return Z(e, "nextSibling")
        },
        prev: function(e) {
            return Z(e, "previousSibling")
        },
        nextAll: function(e) {
            return x.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return x.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return x.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return x.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return x.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return x.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || x.merge([], e.childNodes)
        }
    }, function(e, t) {
        x.fn[e] = function(n, r) {
            var i = x.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = x.filter(r, i)), this.length > 1 && (K[e] || x.unique(i), J.test(e) && i.reverse()), this.pushStack(i)
        }
    }), x.extend({
        filter: function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? x.find.matchesSelector(r, e) ? [r] : [] : x.find.matches(e, x.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        },
        dir: function(e, t, n) {
            for (var r = [], i = n !== undefined;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (i && x(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var tt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        nt = /<([\w:]+)/,
        rt = /<|&#?\w+;/,
        it = /<(?:script|style|link)/i,
        ot = /^(?:checkbox|radio)$/i,
        st = /checked\s*(?:[^=]|=\s*.checked.)/i,
        at = /^$|\/(?:java|ecma)script/i,
        ut = /^true\/(.*)/,
        lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ct = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ct.optgroup = ct.option, ct.tbody = ct.tfoot = ct.colgroup = ct.caption = ct.thead, ct.th = ct.td, x.fn.extend({
        text: function(e) {
            return x.access(this, function(e) {
                return e === undefined ? x.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pt(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = pt(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? x.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || x.cleanData(mt(n)), n.parentNode && (t && x.contains(n.ownerDocument, n) && dt(mt(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (x.cleanData(mt(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return x.clone(this, e, t)
            })
        },
        html: function(e) {
            return x.access(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !it.test(e) && !ct[(nt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(tt, "<$1></$2>");
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (x.cleanData(mt(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = x.map(this, function(e) {
                    return [e.nextSibling, e.parentNode]
                }),
                t = 0;
            return this.domManip(arguments, function(n) {
                var r = e[t++],
                    i = e[t++];
                i && (r && r.parentNode !== i && (r = this.nextSibling), x(this).remove(), i.insertBefore(n, r))
            }, !0), t ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t, n) {
            e = f.apply([], e);
            var r, i, o, s, a, u, l = 0,
                c = this.length,
                p = this,
                h = c - 1,
                d = e[0],
                g = x.isFunction(d);
            if (g || !(1 >= c || "string" != typeof d || x.support.checkClone) && st.test(d)) return this.each(function(r) {
                var i = p.eq(r);
                g && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
            });
            if (c && (r = x.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                for (o = x.map(mt(r, "script"), ft), s = o.length; c > l; l++) a = r, l !== h && (a = x.clone(a, !0, !0), s && x.merge(o, mt(a, "script"))), t.call(this[l], a, l);
                if (s)
                    for (u = o[o.length - 1].ownerDocument, x.map(o, ht), l = 0; s > l; l++) a = o[l], at.test(a.type || "") && !q.access(a, "globalEval") && x.contains(u, a) && (a.src ? x._evalUrl(a.src) : x.globalEval(a.textContent.replace(lt, "")))
            }
            return this
        }
    }), x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        x.fn[e] = function(e) {
            for (var n, r = [], i = x(e), o = i.length - 1, s = 0; o >= s; s++) n = s === o ? this : this.clone(!0), x(i[s])[t](n), h.apply(r, n.get());
            return this.pushStack(r)
        }
    }), x.extend({
        clone: function(e, t, n) {
            var r, i, o, s, a = e.cloneNode(!0),
                u = x.contains(e.ownerDocument, e);
            if (!(x.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || x.isXMLDoc(e)))
                for (s = mt(a), o = mt(e), r = 0, i = o.length; i > r; r++) yt(o[r], s[r]);
            if (t)
                if (n)
                    for (o = o || mt(e), s = s || mt(a), r = 0, i = o.length; i > r; r++) gt(o[r], s[r]);
                else gt(e, a);
            return s = mt(a, "script"), s.length > 0 && dt(s, !u && mt(e, "script")), a
        },
        buildFragment: function(e, t, n, r) {
            for (var i, o, s, a, u, l, c = 0, p = e.length, f = t.createDocumentFragment(), h = []; p > c; c++)
                if (i = e[c], i || 0 === i)
                    if ("object" === x.type(i)) x.merge(h, i.nodeType ? [i] : i);
                    else if (rt.test(i)) {
                for (o = o || f.appendChild(t.createElement("div")), s = (nt.exec(i) || ["", ""])[1].toLowerCase(), a = ct[s] || ct._default, o.innerHTML = a[1] + i.replace(tt, "<$1></$2>") + a[2], l = a[0]; l--;) o = o.lastChild;
                x.merge(h, o.childNodes), o = f.firstChild, o.textContent = ""
            } else h.push(t.createTextNode(i));
            for (f.textContent = "", c = 0; i = h[c++];)
                if ((!r || -1 === x.inArray(i, r)) && (u = x.contains(i.ownerDocument, i), o = mt(f.appendChild(i), "script"), u && dt(o), n))
                    for (l = 0; i = o[l++];) at.test(i.type || "") && n.push(i);
            return f
        },
        cleanData: function(e) {
            for (var t, n, r, i, o, s, a = x.event.special, u = 0;
                (n = e[u]) !== undefined; u++) {
                if (F.accepts(n) && (o = n[q.expando], o && (t = q.cache[o]))) {
                    if (r = Object.keys(t.events || {}), r.length)
                        for (s = 0;
                            (i = r[s]) !== undefined; s++) a[i] ? x.event.remove(n, i) : x.removeEvent(n, i, t.handle);
                    q.cache[o] && delete q.cache[o]
                }
                delete L.cache[n[L.expando]]
            }
        },
        _evalUrl: function(e) {
            return x.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    }), x.fn.extend({
        wrapAll: function(e) {
            var t;
            return x.isFunction(e) ? this.each(function(t) {
                x(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = x(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return this.each(x.isFunction(e) ? function(t) {
                x(this).wrapInner(e.call(this, t))
            } : function() {
                var t = x(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = x.isFunction(e);
            return this.each(function(n) {
                x(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                x.nodeName(this, "body") || x(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var vt, xt, bt = /^(none|table(?!-c[ea]).+)/,
        wt = /^margin/,
        Tt = RegExp("^(" + b + ")(.*)$", "i"),
        Ct = RegExp("^(" + b + ")(?!px)[a-z%]+$", "i"),
        kt = RegExp("^([+-])=(" + b + ")", "i"),
        Nt = {
            BODY: "block"
        },
        Et = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        St = {
            letterSpacing: 0,
            fontWeight: 400
        },
        jt = ["Top", "Right", "Bottom", "Left"],
        Dt = ["Webkit", "O", "Moz", "ms"];
    x.fn.extend({
        css: function(e, t) {
            return x.access(this, function(e, t, n) {
                var r, i, o = {},
                    s = 0;
                if (x.isArray(t)) {
                    for (r = qt(e), i = t.length; i > s; s++) o[t[s]] = x.css(e, t[s], !1, r);
                    return o
                }
                return n !== undefined ? x.style(e, t, n) : x.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return Ht(this, !0)
        },
        hide: function() {
            return Ht(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                Lt(this) ? x(this).show() : x(this).hide()
            })
        }
    }), x.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = vt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, s, a = x.camelCase(t),
                    u = e.style;
                return t = x.cssProps[a] || (x.cssProps[a] = At(u, a)), s = x.cssHooks[t] || x.cssHooks[a], n === undefined ? s && "get" in s && (i = s.get(e, !1, r)) !== undefined ? i : u[t] : (o = typeof n, "string" === o && (i = kt.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(x.css(e, t)), o = "number"), null == n || "number" === o && isNaN(n) || ("number" !== o || x.cssNumber[a] || (n += "px"), x.support.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), s && "set" in s && (n = s.set(e, n, r)) === undefined || (u[t] = n)), undefined)
            }
        },
        css: function(e, t, n, r) {
            var i, o, s, a = x.camelCase(t);
            return t = x.cssProps[a] || (x.cssProps[a] = At(e.style, a)), s = x.cssHooks[t] || x.cssHooks[a], s && "get" in s && (i = s.get(e, !0, n)), i === undefined && (i = vt(e, t, r)), "normal" === i && t in St && (i = St[t]), "" === n || n ? (o = parseFloat(i), n === !0 || x.isNumeric(o) ? o || 0 : i) : i
        }
    }), vt = function(e, t, n) {
        var r, i, o, s = n || qt(e),
            a = s ? s.getPropertyValue(t) || s[t] : undefined,
            u = e.style;
        return s && ("" !== a || x.contains(e.ownerDocument, e) || (a = x.style(e, t)), Ct.test(a) && wt.test(t) && (r = u.width, i = u.minWidth, o = u.maxWidth, u.minWidth = u.maxWidth = u.width = a, a = s.width, u.width = r, u.minWidth = i, u.maxWidth = o)), a
    }, x.each(["height", "width"], function(e, t) {
        x.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? 0 === e.offsetWidth && bt.test(x.css(e, "display")) ? x.swap(e, Et, function() {
                    return Pt(e, t, r)
                }) : Pt(e, t, r) : undefined
            },
            set: function(e, n, r) {
                var i = r && qt(e);
                return Ot(e, n, r ? Ft(e, t, r, x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), x(function() {
        x.support.reliableMarginRight || (x.cssHooks.marginRight = {
            get: function(e, t) {
                return t ? x.swap(e, {
                    display: "inline-block"
                }, vt, [e, "marginRight"]) : undefined
            }
        }), !x.support.pixelPosition && x.fn.position && x.each(["top", "left"], function(e, t) {
            x.cssHooks[t] = {
                get: function(e, n) {
                    return n ? (n = vt(e, t), Ct.test(n) ? x(e).position()[t] + "px" : n) : undefined
                }
            }
        })
    }), x.expr && x.expr.filters && (x.expr.filters.hidden = function(e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight
    }, x.expr.filters.visible = function(e) {
        return !x.expr.filters.hidden(e)
    }), x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        x.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + jt[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, wt.test(e) || (x.cssHooks[e + t].set = Ot)
    });
    var Wt = /%20/g,
        $t = /\[\]$/,
        Bt = /\r?\n/g,
        It = /^(?:submit|button|image|reset|file)$/i,
        zt = /^(?:input|select|textarea|keygen)/i;
    x.fn.extend({
        serialize: function() {
            return x.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = x.prop(this, "elements");
                return e ? x.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !x(this).is(":disabled") && zt.test(this.nodeName) && !It.test(e) && (this.checked || !ot.test(e))
            }).map(function(e, t) {
                var n = x(this).val();
                return null == n ? null : x.isArray(n) ? x.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Bt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Bt, "\r\n")
                }
            }).get()
        }
    }), x.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = x.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (t === undefined && (t = x.ajaxSettings && x.ajaxSettings.traditional), x.isArray(e) || e.jquery && !x.isPlainObject(e)) x.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) _t(n, e[n], t, i);
        return r.join("&").replace(Wt, "+")
    }, x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        x.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), x.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Xt, Ut, Yt = x.now(),
        Vt = /\?/,
        Gt = /#.*$/,
        Jt = /([?&])_=[^&]*/,
        Qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Kt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Zt = /^(?:GET|HEAD)$/,
        en = /^\/\//,
        tn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        nn = x.fn.load,
        rn = {},
        on = {},
        sn = "*/".concat("*");
    try {
        Ut = i.href
    } catch (an) {
        Ut = o.createElement("a"), Ut.href = "", Ut = Ut.href
    }
    Xt = tn.exec(Ut.toLowerCase()) || [], x.fn.load = function(e, t, n) {
        if ("string" != typeof e && nn) return nn.apply(this, arguments);
        var r, i, o, s = this,
            a = e.indexOf(" ");
        return a >= 0 && (r = e.slice(a), e = e.slice(0, a)), x.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (i = "POST"), s.length > 0 && x.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, s.html(r ? x("<div>").append(x.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            s.each(n, o || [e.responseText, t, e])
        }), this
    }, x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        x.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ut,
            type: "GET",
            isLocal: Kt.test(Xt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": sn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": x.parseJSON,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? cn(cn(e, x.ajaxSettings), t) : cn(x.ajaxSettings, e)
        },
        ajaxPrefilter: un(rn),
        ajaxTransport: un(on),
        ajax: function(e, t) {
            function k(e, t, o, a) {
                var l, m, y, b, w, C = t;
                2 !== v && (v = 2, s && clearTimeout(s), n = undefined, i = a || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (b = pn(c, T, o)), b = fn(c, b, T, l), l ? (c.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (x.lastModified[r] = w), w = T.getResponseHeader("etag"), w && (x.etag[r] = w)), 204 === e || "HEAD" === c.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, m = b.data, y = b.error, l = !y)) : (y = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (t || C) + "", l ? h.resolveWith(p, [m, C, T]) : h.rejectWith(p, [T, C, y]), T.statusCode(g), g = undefined, u && f.trigger(l ? "ajaxSuccess" : "ajaxError", [T, c, l ? m : y]), d.fireWith(p, [T, C]), u && (f.trigger("ajaxComplete", [T, c]), --x.active || x.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (t = e, e = undefined), t = t || {};
            var n, r, i, o, s, a, u, l, c = x.ajaxSetup({}, t),
                p = c.context || c,
                f = c.context && (p.nodeType || p.jquery) ? x(p) : x.event,
                h = x.Deferred(),
                d = x.Callbacks("once memory"),
                g = c.statusCode || {},
                m = {},
                y = {},
                v = 0,
                b = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === v) {
                            if (!o)
                                for (o = {}; t = Qt.exec(i);) o[t[1].toLowerCase()] = t[2];
                            t = o[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === v ? i : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return v || (e = y[n] = y[n] || e, m[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return v || (c.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > v)
                                for (t in e) g[t] = [g[t], e[t]];
                            else T.always(e[T.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || b;
                        return n && n.abort(t), k(0, t), this
                    }
                };
            if (h.promise(T).complete = d.add, T.success = T.done, T.error = T.fail, c.url = ((e || c.url || Ut) + "").replace(Gt, "").replace(en, Xt[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = x.trim(c.dataType || "*").toLowerCase().match(w) || [""], null == c.crossDomain && (a = tn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === Xt[1] && a[2] === Xt[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (Xt[3] || ("http:" === Xt[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = x.param(c.data, c.traditional)), ln(rn, c, t, T), 2 === v) return T;
            u = c.global, u && 0 === x.active++ && x.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Zt.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (Vt.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = Jt.test(r) ? r.replace(Jt, "$1_=" + Yt++) : r + (Vt.test(r) ? "&" : "?") + "_=" + Yt++)), c.ifModified && (x.lastModified[r] && T.setRequestHeader("If-Modified-Since", x.lastModified[r]), x.etag[r] && T.setRequestHeader("If-None-Match", x.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && T.setRequestHeader("Content-Type", c.contentType), T.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + sn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) T.setRequestHeader(l, c.headers[l]);
            if (c.beforeSend && (c.beforeSend.call(p, T, c) === !1 || 2 === v)) return T.abort();
            b = "abort";
            for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) T[l](c[l]);
            if (n = ln(on, c, t, T)) {
                T.readyState = 1, u && f.trigger("ajaxSend", [T, c]), c.async && c.timeout > 0 && (s = setTimeout(function() {
                    T.abort("timeout")
                }, c.timeout));
                try {
                    v = 1, n.send(m, k)
                } catch (C) {
                    if (!(2 > v)) throw C;
                    k(-1, C)
                }
            } else k(-1, "No Transport");
            return T
        },
        getJSON: function(e, t, n) {
            return x.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return x.get(e, undefined, t, "script")
        }
    }), x.each(["get", "post"], function(e, t) {
        x[t] = function(e, n, r, i) {
            return x.isFunction(n) && (i = i || r, r = n, n = undefined), x.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return x.globalEval(e), e
            }
        }
    }), x.ajaxPrefilter("script", function(e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), x.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = x("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                    }), o.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var hn = [],
        dn = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = hn.pop() || x.expando + "_" + Yt++;
            return this[e] = !0, e
        }
    }), x.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, s, a = t.jsonp !== !1 && (dn.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && dn.test(t.data) && "data");
        return a || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = x.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(dn, "$1" + i) : t.jsonp !== !1 && (t.url += (Vt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return s || x.error(i + " was not called"), s[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            s = arguments
        }, r.always(function() {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, hn.push(i)), s && x.isFunction(o) && o(s[0]), s = o = undefined
        }), "script") : undefined
    }), x.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var gn = x.ajaxSettings.xhr(),
        mn = {
            0: 200,
            1223: 204
        },
        yn = 0,
        vn = {};
    e.ActiveXObject && x(e).on("unload", function() {
        for (var e in vn) vn[e]();
        vn = undefined
    }), x.support.cors = !!gn && "withCredentials" in gn, x.support.ajax = gn = !!gn, x.ajaxTransport(function(e) {
        var t;
        return x.support.cors || gn && !e.crossDomain ? {
            send: function(n, r) {
                var i, o, s = e.xhr();
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                    for (i in e.xhrFields) s[i] = e.xhrFields[i];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) s.setRequestHeader(i, n[i]);
                t = function(e) {
                    return function() {
                        t && (delete vn[o], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status || 404, s.statusText) : r(mn[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                            text: s.responseText
                        } : undefined, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), s.onerror = t("error"), t = vn[o = yn++] = t("abort"), s.send(e.hasContent && e.data || null)
            },
            abort: function() {
                t && t()
            }
        } : undefined
    });
    var xn, bn, wn = /^(?:toggle|show|hide)$/,
        Tn = RegExp("^(?:([+-])=|)(" + b + ")([a-z%]*)$", "i"),
        Cn = /queueHooks$/,
        kn = [An],
        Nn = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = Tn.exec(t),
                    o = i && i[3] || (x.cssNumber[e] ? "" : "px"),
                    s = (x.cssNumber[e] || "px" !== o && +r) && Tn.exec(x.css(n.elem, e)),
                    a = 1,
                    u = 20;
                if (s && s[3] !== o) {
                    o = o || s[3], i = i || [], s = +r || 1;
                    do a = a || ".5", s /= a, x.style(n.elem, e, s + o); while (a !== (a = n.cur() / r) && 1 !== a && --u)
                }
                return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    x.Animation = x.extend(jn, {
        tweener: function(e, t) {
            x.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++) n = e[r], Nn[n] = Nn[n] || [], Nn[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? kn.unshift(e) : kn.push(e)
        }
    }), x.Tween = Ln, Ln.prototype = {
        constructor: Ln,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (x.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Ln.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ln.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Ln.propHooks[this.prop];
            return this.pos = t = this.options.duration ? x.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ln.propHooks._default.set(this), this
        }
    }, Ln.prototype.init.prototype = Ln.prototype, Ln.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = x.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                x.fx.step[e.prop] ? x.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop]) ? x.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Ln.propHooks.scrollTop = Ln.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, x.each(["toggle", "show", "hide"], function(e, t) {
        var n = x.fn[t];
        x.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(qn(t, !0), e, r, i)
        }
    }), x.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Lt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = x.isEmptyObject(e),
                o = x.speed(t, n, r),
                s = function() {
                    var t = jn(this, x.extend({}, e), o);
                    (i || q.get(this, "finish")) && t.stop(!0)
                };
            return s.finish = s, i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    o = x.timers,
                    s = q.get(this);
                if (i) s[i] && s[i].stop && r(s[i]);
                else
                    for (i in s) s[i] && s[i].stop && Cn.test(i) && r(s[i]);
                for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                (t || !n) && x.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = q.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = x.timers,
                    s = r ? r.length : 0;
                for (n.finish = !0, x.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), x.each({
        slideDown: qn("show"),
        slideUp: qn("hide"),
        slideToggle: qn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        x.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), x.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? x.extend({}, e) : {
            complete: n || !n && t || x.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !x.isFunction(t) && t
        };
        return r.duration = x.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in x.fx.speeds ? x.fx.speeds[r.duration] : x.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            x.isFunction(r.old) && r.old.call(this), r.queue && x.dequeue(this, r.queue)
        }, r
    }, x.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, x.timers = [], x.fx = Ln.prototype.init, x.fx.tick = function() {
        var e, t = x.timers,
            n = 0;
        for (xn = x.now(); t.length > n; n++) e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || x.fx.stop(), xn = undefined
    }, x.fx.timer = function(e) {
        e() && x.timers.push(e) && x.fx.start()
    }, x.fx.interval = 13, x.fx.start = function() {
        bn || (bn = setInterval(x.fx.tick, x.fx.interval))
    }, x.fx.stop = function() {
        clearInterval(bn), bn = null
    }, x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, x.fx.step = {}, x.expr && x.expr.filters && (x.expr.filters.animated = function(e) {
        return x.grep(x.timers, function(t) {
            return e === t.elem
        }).length
    }), x.fn.offset = function(e) {
        if (arguments.length) return e === undefined ? this : this.each(function(t) {
            x.offset.setOffset(this, e, t)
        });
        var t, n, i = this[0],
            o = {
                top: 0,
                left: 0
            },
            s = i && i.ownerDocument;
        return s ? (t = s.documentElement, x.contains(t, i) ? (typeof i.getBoundingClientRect !== r && (o = i.getBoundingClientRect()), n = Hn(s), {
            top: o.top + n.pageYOffset - t.clientTop,
            left: o.left + n.pageXOffset - t.clientLeft
        }) : o) : void 0
    }, x.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, s, a, u, l, c = x.css(e, "position"),
                p = x(e),
                f = {};
            "static" === c && (e.style.position = "relative"), a = p.offset(), o = x.css(e, "top"), u = x.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = p.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0), x.isFunction(t) && (t = t.call(e, n, a)), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + i), "using" in t ? t.using.call(e, f) : p.css(f)
        }
    }, x.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === x.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), x.nodeName(e[0], "html") || (r = e.offset()), r.top += x.css(e[0], "borderTopWidth", !0), r.left += x.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - x.css(n, "marginTop", !0),
                    left: t.left - r.left - x.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || s; e && !x.nodeName(e, "html") && "static" === x.css(e, "position");) e = e.offsetParent;
                return e || s
            })
        }
    }), x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, n) {
        var r = "pageYOffset" === n;
        x.fn[t] = function(i) {
            return x.access(this, function(t, i, o) {
                var s = Hn(t);
                return o === undefined ? s ? s[n] : t[i] : (s ? s.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[i] = o, undefined)
            }, t, i, arguments.length, null)
        }
    }), x.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        x.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            x.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    s = n || (r === !0 || i === !0 ? "margin" : "border");
                return x.access(this, function(t, n, r) {
                    var i;
                    return x.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? x.css(t, n, s) : x.style(t, n, r, s)
                }, t, o ? r : undefined, o, null)
            }
        })
    }), x.fn.size = function() {
        return this.length
    }, x.fn.andSelf = x.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = x : "function" == typeof define && define.amd && define("jquery", [], function() {
        return x
    }), "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = x)
}(window),
function(W, X, u) {
    "use strict";

    function z(b) {
        return function() {
            var c, a = arguments[0],
                a = "[" + (b ? b + ":" : "") + a + "] http://errors.angularjs.org/1.2.28/" + (b ? b + "/" : "") + a;
            for (c = 1; c < arguments.length; c++) a = a + (1 == c ? "?" : "&") + "p" + (c - 1) + "=" + encodeURIComponent("function" == typeof arguments[c] ? arguments[c].toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof arguments[c] ? "undefined" : "string" != typeof arguments[c] ? JSON.stringify(arguments[c]) : arguments[c]);
            return Error(a)
        }
    }

    function Sa(b) {
        if (null == b || Ja(b)) return !1;
        var a = b.length;
        return 1 === b.nodeType && a ? !0 : G(b) || L(b) || 0 === a || "number" == typeof a && a > 0 && a - 1 in b
    }

    function r(b, a, c) {
        var d;
        if (b)
            if (N(b))
                for (d in b) "prototype" == d || "length" == d || "name" == d || b.hasOwnProperty && !b.hasOwnProperty(d) || a.call(c, b[d], d);
            else if (L(b) || Sa(b))
            for (d = 0; d < b.length; d++) a.call(c, b[d], d);
        else if (b.forEach && b.forEach !== r) b.forEach(a, c);
        else
            for (d in b) b.hasOwnProperty(d) && a.call(c, b[d], d);
        return b
    }

    function Xb(b) {
        var c, a = [];
        for (c in b) b.hasOwnProperty(c) && a.push(c);
        return a.sort()
    }

    function Sc(b, a, c) {
        for (var d = Xb(b), e = 0; e < d.length; e++) a.call(c, b[d[e]], d[e]);
        return d
    }

    function Yb(b) {
        return function(a, c) {
            b(c, a)
        }
    }

    function ib() {
        for (var a, b = na.length; b;) {
            if (b--, a = na[b].charCodeAt(0), 57 == a) return na[b] = "A", na.join("");
            if (90 != a) return na[b] = String.fromCharCode(a + 1), na.join("");
            na[b] = "0"
        }
        return na.unshift("0"), na.join("")
    }

    function Zb(b, a) {
        a ? b.$$hashKey = a : delete b.$$hashKey
    }

    function E(b) {
        var a = b.$$hashKey;
        return r(arguments, function(a) {
            a !== b && r(a, function(a, c) {
                b[c] = a
            })
        }), Zb(b, a), b
    }

    function U(b) {
        return parseInt(b, 10)
    }

    function $b(b, a) {
        return E(new(E(function() {}, {
            prototype: b
        })), a)
    }

    function v() {}

    function ga(b) {
        return b
    }

    function aa(b) {
        return function() {
            return b
        }
    }

    function F(b) {
        return "undefined" == typeof b
    }

    function D(b) {
        return "undefined" != typeof b
    }

    function T(b) {
        return null != b && "object" == typeof b
    }

    function G(b) {
        return "string" == typeof b
    }

    function jb(b) {
        return "number" == typeof b
    }

    function va(b) {
        return "[object Date]" === Ba.call(b)
    }

    function N(b) {
        return "function" == typeof b
    }

    function kb(b) {
        return "[object RegExp]" === Ba.call(b)
    }

    function Ja(b) {
        return b && b.document && b.location && b.alert && b.setInterval
    }

    function Tc(b) {
        return !(!b || !(b.nodeName || b.prop && b.attr && b.find))
    }

    function Uc(b, a, c) {
        var d = [];
        return r(b, function(b, f, g) {
            d.push(a.call(c, b, f, g))
        }), d
    }

    function Ta(b, a) {
        if (b.indexOf) return b.indexOf(a);
        for (var c = 0; c < b.length; c++)
            if (a === b[c]) return c;
        return -1
    }

    function Ua(b, a) {
        var c = Ta(b, a);
        return c >= 0 && b.splice(c, 1), a
    }

    function Ka(b, a, c, d) {
        if (Ja(b) || b && b.$evalAsync && b.$watch) throw Va("cpws");
        if (a) {
            if (b === a) throw Va("cpi");
            if (c = c || [], d = d || [], T(b)) {
                var e = Ta(c, b);
                if (-1 !== e) return d[e];
                c.push(b), d.push(a)
            }
            if (L(b))
                for (var f = a.length = 0; f < b.length; f++) e = Ka(b[f], null, c, d), T(b[f]) && (c.push(b[f]), d.push(e)), a.push(e);
            else {
                var g = a.$$hashKey;
                L(a) ? a.length = 0 : r(a, function(b, c) {
                    delete a[c]
                });
                for (f in b) e = Ka(b[f], null, c, d), T(b[f]) && (c.push(b[f]), d.push(e)), a[f] = e;
                Zb(a, g)
            }
        } else(a = b) && (L(b) ? a = Ka(b, [], c, d) : va(b) ? a = new Date(b.getTime()) : kb(b) ? (a = RegExp(b.source, b.toString().match(/[^\/]*$/)[0]), a.lastIndex = b.lastIndex) : T(b) && (a = Ka(b, {}, c, d)));
        return a
    }

    function ha(b, a) {
        if (L(b)) {
            a = a || [];
            for (var c = 0; c < b.length; c++) a[c] = b[c]
        } else if (T(b))
            for (c in a = a || {}, b) !lb.call(b, c) || "$" === c.charAt(0) && "$" === c.charAt(1) || (a[c] = b[c]);
        return a || b
    }

    function Ca(b, a) {
        if (b === a) return !0;
        if (null === b || null === a) return !1;
        if (b !== b && a !== a) return !0;
        var d, c = typeof b;
        if (c == typeof a && "object" == c) {
            if (!L(b)) {
                if (va(b)) return va(a) ? isNaN(b.getTime()) && isNaN(a.getTime()) || b.getTime() === a.getTime() : !1;
                if (kb(b) && kb(a)) return b.toString() == a.toString();
                if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || Ja(b) || Ja(a) || L(a)) return !1;
                c = {};
                for (d in b)
                    if ("$" !== d.charAt(0) && !N(b[d])) {
                        if (!Ca(b[d], a[d])) return !1;
                        c[d] = !0
                    }
                for (d in a)
                    if (!c.hasOwnProperty(d) && "$" !== d.charAt(0) && a[d] !== u && !N(a[d])) return !1;
                return !0
            }
            if (!L(a)) return !1;
            if ((c = b.length) == a.length) {
                for (d = 0; c > d; d++)
                    if (!Ca(b[d], a[d])) return !1;
                return !0
            }
        }
        return !1
    }

    function Bb(b, a) {
        var c = 2 < arguments.length ? wa.call(arguments, 2) : [];
        return !N(a) || a instanceof RegExp ? a : c.length ? function() {
            return arguments.length ? a.apply(b, c.concat(wa.call(arguments, 0))) : a.apply(b, c)
        } : function() {
            return arguments.length ? a.apply(b, arguments) : a.call(b)
        }
    }

    function Vc(b, a) {
        var c = a;
        return "string" == typeof b && "$" === b.charAt(0) ? c = u : Ja(a) ? c = "$WINDOW" : a && X === a ? c = "$DOCUMENT" : a && a.$evalAsync && a.$watch && (c = "$SCOPE"), c
    }

    function oa(b, a) {
        return "undefined" == typeof b ? u : JSON.stringify(b, Vc, a ? "  " : null)
    }

    function ac(b) {
        return G(b) ? JSON.parse(b) : b
    }

    function Wa(b) {
        return "function" == typeof b ? b = !0 : b && 0 !== b.length ? (b = x("" + b), b = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)) : b = !1, b
    }

    function ia(b) {
        b = A(b).clone();
        try {
            b.empty()
        } catch (a) {}
        var c = A("<div>").append(b).html();
        try {
            return 3 === b[0].nodeType ? x(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + x(b)
            })
        } catch (d) {
            return x(c)
        }
    }

    function bc(b) {
        try {
            return decodeURIComponent(b)
        } catch (a) {}
    }

    function cc(b) {
        var c, d, a = {};
        return r((b || "").split("&"), function(b) {
            b && (c = b.replace(/\+/g, "%20").split("="), d = bc(c[0]), D(d) && (b = D(c[1]) ? bc(c[1]) : !0, lb.call(a, d) ? L(a[d]) ? a[d].push(b) : a[d] = [a[d], b] : a[d] = b))
        }), a
    }

    function Cb(b) {
        var a = [];
        return r(b, function(b, d) {
            L(b) ? r(b, function(b) {
                a.push(Da(d, !0) + (!0 === b ? "" : "=" + Da(b, !0)))
            }) : a.push(Da(d, !0) + (!0 === b ? "" : "=" + Da(b, !0)))
        }), a.length ? a.join("&") : ""
    }

    function mb(b) {
        return Da(b, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function Da(b, a) {
        return encodeURIComponent(b).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, a ? "%20" : "+")
    }

    function Wc(b, a) {
        function c(a) {
            a && d.push(a)
        }
        var e, f, d = [b],
            g = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
            h = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        r(g, function(a) {
            g[a] = !0, c(X.getElementById(a)), a = a.replace(":", "\\:"), b.querySelectorAll && (r(b.querySelectorAll("." + a), c), r(b.querySelectorAll("." + a + "\\:"), c), r(b.querySelectorAll("[" + a + "]"), c))
        }), r(d, function(a) {
            if (!e) {
                var b = h.exec(" " + a.className + " ");
                b ? (e = a, f = (b[2] || "").replace(/\s+/g, ",")) : r(a.attributes, function(b) {
                    !e && g[b.name] && (e = a, f = b.value)
                })
            }
        }), e && a(e, f ? [f] : [])
    }

    function dc(b, a) {
        var c = function() {
                if (b = A(b), b.injector()) {
                    var c = b[0] === X ? "document" : ia(b);
                    throw Va("btstrpd", c.replace(/</, "&lt;").replace(/>/, "&gt;"))
                }
                return a = a || [], a.unshift(["$provide", function(a) {
                    a.value("$rootElement", b)
                }]), a.unshift("ng"), c = ec(a), c.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function(a, b, c, d) {
                    a.$apply(function() {
                        b.data("$injector", d), c(b)(a)
                    })
                }]), c
            },
            d = /^NG_DEFER_BOOTSTRAP!/;
        return W && !d.test(W.name) ? c() : (W.name = W.name.replace(d, ""), void(Xa.resumeBootstrap = function(b) {
            r(b, function(b) {
                a.push(b)
            }), c()
        }))
    }

    function nb(b, a) {
        return a = a || "_", b.replace(Xc, function(b, d) {
            return (d ? a : "") + b.toLowerCase()
        })
    }

    function Db(b, a, c) {
        if (!b) throw Va("areq", a || "?", c || "required");
        return b
    }

    function Ya(b, a, c) {
        return c && L(b) && (b = b[b.length - 1]), Db(N(b), a, "not a function, got " + (b && "object" == typeof b ? b.constructor.name || "Object" : typeof b)), b
    }

    function Ea(b, a) {
        if ("hasOwnProperty" === b) throw Va("badname", a)
    }

    function fc(b, a, c) {
        if (!a) return b;
        a = a.split(".");
        for (var d, e = b, f = a.length, g = 0; f > g; g++) d = a[g], b && (b = (e = b)[d]);
        return !c && N(b) ? Bb(e, b) : b
    }

    function Eb(b) {
        var a = b[0];
        if (b = b[b.length - 1], a === b) return A(a);
        var c = [a];
        do {
            if (a = a.nextSibling, !a) break;
            c.push(a)
        } while (a !== b);
        return A(c)
    }

    function Yc(b) {
        var a = z("$injector"),
            c = z("ng");
        return b = b.angular || (b.angular = {}), b.$$minErr = b.$$minErr || z, b.module || (b.module = function() {
            var b = {};
            return function(e, f, g) {
                if ("hasOwnProperty" === e) throw c("badname", "module");
                return f && b.hasOwnProperty(e) && (b[e] = null), b[e] || (b[e] = function() {
                    function b(a, d, e) {
                        return function() {
                            return c[e || "push"]([a, d, arguments]), n
                        }
                    }
                    if (!f) throw a("nomod", e);
                    var c = [],
                        d = [],
                        l = b("$injector", "invoke"),
                        n = {
                            _invokeQueue: c,
                            _runBlocks: d,
                            requires: f,
                            name: e,
                            provider: b("$provide", "provider"),
                            factory: b("$provide", "factory"),
                            service: b("$provide", "service"),
                            value: b("$provide", "value"),
                            constant: b("$provide", "constant", "unshift"),
                            animation: b("$animateProvider", "register"),
                            filter: b("$filterProvider", "register"),
                            controller: b("$controllerProvider", "register"),
                            directive: b("$compileProvider", "directive"),
                            config: l,
                            run: function(a) {
                                return d.push(a), this
                            }
                        };
                    return g && l(g), n
                }())
            }
        }())
    }

    function Zc(b) {
        E(b, {
            bootstrap: dc,
            copy: Ka,
            extend: E,
            equals: Ca,
            element: A,
            forEach: r,
            injector: ec,
            noop: v,
            bind: Bb,
            toJson: oa,
            fromJson: ac,
            identity: ga,
            isUndefined: F,
            isDefined: D,
            isString: G,
            isFunction: N,
            isObject: T,
            isNumber: jb,
            isElement: Tc,
            isArray: L,
            version: $c,
            isDate: va,
            lowercase: x,
            uppercase: La,
            callbacks: {
                counter: 0
            },
            $$minErr: z,
            $$csp: Za
        }), $a = Yc(W);
        try {
            $a("ngLocale")
        } catch (a) {
            $a("ngLocale", []).provider("$locale", ad)
        }
        $a("ng", ["ngLocale"], ["$provide", function(a) {
            a.provider({
                $$sanitizeUri: bd
            }), a.provider("$compile", gc).directive({
                a: cd,
                input: hc,
                textarea: hc,
                form: dd,
                script: ed,
                select: fd,
                style: gd,
                option: hd,
                ngBind: id,
                ngBindHtml: jd,
                ngBindTemplate: kd,
                ngClass: ld,
                ngClassEven: md,
                ngClassOdd: nd,
                ngCloak: od,
                ngController: pd,
                ngForm: qd,
                ngHide: rd,
                ngIf: sd,
                ngInclude: td,
                ngInit: ud,
                ngNonBindable: vd,
                ngPluralize: wd,
                ngRepeat: xd,
                ngShow: yd,
                ngStyle: zd,
                ngSwitch: Ad,
                ngSwitchWhen: Bd,
                ngSwitchDefault: Cd,
                ngOptions: Dd,
                ngTransclude: Ed,
                ngModel: Fd,
                ngList: Gd,
                ngChange: Hd,
                required: ic,
                ngRequired: ic,
                ngValue: Id
            }).directive({
                ngInclude: Jd
            }).directive(Fb).directive(jc), a.provider({
                $anchorScroll: Kd,
                $animate: Ld,
                $browser: Md,
                $cacheFactory: Nd,
                $controller: Od,
                $document: Pd,
                $exceptionHandler: Qd,
                $filter: kc,
                $interpolate: Rd,
                $interval: Sd,
                $http: Td,
                $httpBackend: Ud,
                $location: Vd,
                $log: Wd,
                $parse: Xd,
                $rootScope: Yd,
                $q: Zd,
                $sce: $d,
                $sceDelegate: ae,
                $sniffer: be,
                $templateCache: ce,
                $timeout: de,
                $window: ee,
                $$rAF: fe,
                $$asyncCallback: ge
            })
        }])
    }

    function ab(b) {
        return b.replace(he, function(a, b, d, e) {
            return e ? d.toUpperCase() : d
        }).replace(ie, "Moz$1")
    }

    function Gb(b, a, c, d) {
        function e(b) {
            var m, l, n, q, p, s, e = c && b ? [this.filter(b)] : [this],
                k = a;
            if (!d || null != b)
                for (; e.length;)
                    for (m = e.shift(), l = 0, n = m.length; n > l; l++)
                        for (q = A(m[l]), k ? q.triggerHandler("$destroy") : k = !k, p = 0, q = (s = q.children()).length; q > p; p++) e.push(Fa(s[p]));
            return f.apply(this, arguments)
        }
        var f = Fa.fn[b],
            f = f.$original || f;
        e.$original = f, Fa.fn[b] = e
    }

    function S(b) {
        if (b instanceof S) return b;
        if (G(b) && (b = $(b)), !(this instanceof S)) {
            if (G(b) && "<" != b.charAt(0)) throw Hb("nosel");
            return new S(b)
        }
        if (G(b)) {
            var a = b;
            b = X;
            var c;
            if (c = je.exec(a)) b = [b.createElement(c[1])];
            else {
                var e, d = b;
                if (b = d.createDocumentFragment(), c = [], Ib.test(a)) {
                    for (d = b.appendChild(d.createElement("div")), e = (ke.exec(a) || ["", ""])[1].toLowerCase(), e = da[e] || da._default, d.innerHTML = "<div>&#160;</div>" + e[1] + a.replace(le, "<$1></$2>") + e[2], d.removeChild(d.firstChild), a = e[0]; a--;) d = d.lastChild;
                    for (a = 0, e = d.childNodes.length; e > a; ++a) c.push(d.childNodes[a]);
                    d = b.firstChild, d.textContent = ""
                } else c.push(d.createTextNode(a));
                b.textContent = "", b.innerHTML = "", b = c
            }
            Jb(this, b), A(X.createDocumentFragment()).append(this)
        } else Jb(this, b)
    }

    function Kb(b) {
        return b.cloneNode(!0)
    }

    function Ma(b) {
        Lb(b);
        var a = 0;
        for (b = b.childNodes || []; a < b.length; a++) Ma(b[a])
    }

    function lc(b, a, c, d) {
        if (D(d)) throw Hb("offargs");
        var e = pa(b, "events");
        pa(b, "handle") && (F(a) ? r(e, function(a, c) {
            bb(b, c, a), delete e[c]
        }) : r(a.split(" "), function(a) {
            F(c) ? (bb(b, a, e[a]), delete e[a]) : Ua(e[a] || [], c)
        }))
    }

    function Lb(b, a) {
        var c = b.ng339,
            d = cb[c];
        d && (a ? delete cb[c].data[a] : (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), lc(b)), delete cb[c], b.ng339 = u))
    }

    function pa(b, a, c) {
        var d = b.ng339,
            d = cb[d || -1];
        return D(c) ? (d || (b.ng339 = d = ++me, d = cb[d] = {}), void(d[a] = c)) : d && d[a]
    }

    function Mb(b, a, c) {
        var d = pa(b, "data"),
            e = D(c),
            f = !e && D(a),
            g = f && !T(a);
        if (d || g || pa(b, "data", d = {}), e) d[a] = c;
        else {
            if (!f) return d;
            if (g) return d && d[a];
            E(d, a)
        }
    }

    function Nb(b, a) {
        return b.getAttribute ? -1 < (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + a + " ") : !1
    }

    function ob(b, a) {
        a && b.setAttribute && r(a.split(" "), function(a) {
            b.setAttribute("class", $((" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + $(a) + " ", " ")))
        })
    }

    function pb(b, a) {
        if (a && b.setAttribute) {
            var c = (" " + (b.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            r(a.split(" "), function(a) {
                a = $(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
            }), b.setAttribute("class", $(c))
        }
    }

    function Jb(b, a) {
        if (a) {
            a = a.nodeName || !D(a.length) || Ja(a) ? [a] : a;
            for (var c = 0; c < a.length; c++) b.push(a[c])
        }
    }

    function mc(b, a) {
        return qb(b, "$" + (a || "ngController") + "Controller")
    }

    function qb(b, a, c) {
        for (9 == b.nodeType && (b = b.documentElement), a = L(a) ? a : [a]; b;) {
            for (var d = 0, e = a.length; e > d; d++)
                if ((c = A.data(b, a[d])) !== u) return c;
            b = b.parentNode || 11 === b.nodeType && b.host
        }
    }

    function nc(b) {
        for (var a = 0, c = b.childNodes; a < c.length; a++) Ma(c[a]);
        for (; b.firstChild;) b.removeChild(b.firstChild)
    }

    function oc(b, a) {
        var c = rb[a.toLowerCase()];
        return c && pc[b.nodeName] && c
    }

    function ne(b, a) {
        var c = function(c, e) {
            if (c.preventDefault || (c.preventDefault = function() {
                    c.returnValue = !1
                }), c.stopPropagation || (c.stopPropagation = function() {
                    c.cancelBubble = !0
                }), c.target || (c.target = c.srcElement || X), F(c.defaultPrevented)) {
                var f = c.preventDefault;
                c.preventDefault = function() {
                    c.defaultPrevented = !0, f.call(c)
                }, c.defaultPrevented = !1
            }
            c.isDefaultPrevented = function() {
                return c.defaultPrevented || !1 === c.returnValue
            };
            var g = ha(a[e || c.type] || []);
            r(g, function(a) {
                a.call(b, c)
            }), 8 >= R ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, delete c.stopPropagation, delete c.isDefaultPrevented)
        };
        return c.elem = b, c
    }

    function Na(b, a) {
        var d, c = typeof b;
        return "function" == c || "object" == c && null !== b ? "function" == typeof(d = b.$$hashKey) ? d = b.$$hashKey() : d === u && (d = b.$$hashKey = (a || ib)()) : d = b, c + ":" + d
    }

    function db(b, a) {
        if (a) {
            var c = 0;
            this.nextUid = function() {
                return ++c
            }
        }
        r(b, this.put, this)
    }

    function qc(b) {
        var a, c;
        return "function" == typeof b ? (a = b.$inject) || (a = [], b.length && (c = b.toString().replace(oe, ""), c = c.match(pe), r(c[1].split(qe), function(b) {
            b.replace(re, function(b, c, d) {
                a.push(d)
            })
        })), b.$inject = a) : L(b) ? (c = b.length - 1, Ya(b[c], "fn"), a = b.slice(0, c)) : Ya(b, "fn", !0), a
    }

    function ec(b) {
        function a(a) {
            return function(b, c) {
                return T(b) ? void r(b, Yb(a)) : a(b, c)
            }
        }

        function c(a, b) {
            if (Ea(a, "service"), (N(b) || L(b)) && (b = n.instantiate(b)), !b.$get) throw eb("pget", a);
            return l[a + h] = b
        }

        function d(a, b) {
            return c(a, {
                $get: b
            })
        }

        function e(a) {
            var c, d, f, h, b = [];
            return r(a, function(a) {
                if (!m.get(a)) {
                    m.put(a, !0);
                    try {
                        if (G(a))
                            for (c = $a(a), b = b.concat(e(c.requires)).concat(c._runBlocks), d = c._invokeQueue, f = 0, h = d.length; h > f; f++) {
                                var g = d[f],
                                    k = n.get(g[0]);
                                k[g[1]].apply(k, g[2])
                            } else N(a) ? b.push(n.invoke(a)) : L(a) ? b.push(n.invoke(a)) : Ya(a, "module")
                    } catch (p) {
                        throw L(a) && (a = a[a.length - 1]), p.message && p.stack && -1 == p.stack.indexOf(p.message) && (p = p.message + "\n" + p.stack), eb("modulerr", a, p.stack || p.message || p)
                    }
                }
            }), b
        }

        function f(a, b) {
            function c(d) {
                if (a.hasOwnProperty(d)) {
                    if (a[d] === g) throw eb("cdep", d + " <- " + k.join(" <- "));
                    return a[d]
                }
                try {
                    return k.unshift(d), a[d] = g, a[d] = b(d)
                } catch (e) {
                    throw a[d] === g && delete a[d], e
                } finally {
                    k.shift()
                }
            }

            function d(a, b, e) {
                var g, k, p, f = [],
                    h = qc(a);
                for (k = 0, g = h.length; g > k; k++) {
                    if (p = h[k], "string" != typeof p) throw eb("itkn", p);
                    f.push(e && e.hasOwnProperty(p) ? e[p] : c(p))
                }
                return L(a) && (a = a[g]), a.apply(b, f)
            }
            return {
                invoke: d,
                instantiate: function(a, b) {
                    var e, c = function() {};
                    return c.prototype = (L(a) ? a[a.length - 1] : a).prototype, c = new c, e = d(a, c, b), T(e) || N(e) ? e : c
                },
                get: c,
                annotate: qc,
                has: function(b) {
                    return l.hasOwnProperty(b + h) || a.hasOwnProperty(b)
                }
            }
        }
        var g = {},
            h = "Provider",
            k = [],
            m = new db([], !0),
            l = {
                $provide: {
                    provider: a(c),
                    factory: a(d),
                    service: a(function(a, b) {
                        return d(a, ["$injector", function(a) {
                            return a.instantiate(b)
                        }])
                    }),
                    value: a(function(a, b) {
                        return d(a, aa(b))
                    }),
                    constant: a(function(a, b) {
                        Ea(a, "constant"), l[a] = b, q[a] = b
                    }),
                    decorator: function(a, b) {
                        var c = n.get(a + h),
                            d = c.$get;
                        c.$get = function() {
                            var a = p.invoke(d, c);
                            return p.invoke(b, null, {
                                $delegate: a
                            })
                        }
                    }
                }
            },
            n = l.$injector = f(l, function() {
                throw eb("unpr", k.join(" <- "))
            }),
            q = {},
            p = q.$injector = f(q, function(a) {
                return a = n.get(a + h), p.invoke(a.$get, a)
            });
        return r(e(b), function(a) {
            p.invoke(a || v)
        }), p
    }

    function Kd() {
        var b = !0;
        this.disableAutoScrolling = function() {
            b = !1
        }, this.$get = ["$window", "$location", "$rootScope", function(a, c, d) {
            function e(a) {
                var b = null;
                return r(a, function(a) {
                    b || "a" !== x(a.nodeName) || (b = a)
                }), b
            }

            function f() {
                var d, b = c.hash();
                b ? (d = g.getElementById(b)) ? d.scrollIntoView() : (d = e(g.getElementsByName(b))) ? d.scrollIntoView() : "top" === b && a.scrollTo(0, 0) : a.scrollTo(0, 0)
            }
            var g = a.document;
            return b && d.$watch(function() {
                return c.hash()
            }, function() {
                d.$evalAsync(f)
            }), f
        }]
    }

    function ge() {
        this.$get = ["$$rAF", "$timeout", function(b, a) {
            return b.supported ? function(a) {
                return b(a)
            } : function(b) {
                return a(b, 0, !1)
            }
        }]
    }

    function se(b, a, c, d) {
        function e(a) {
            try {
                a.apply(null, wa.call(arguments, 1))
            } finally {
                if (s--, 0 === s)
                    for (; J.length;) try {
                        J.pop()()
                    } catch (b) {
                        c.error(b)
                    }
            }
        }

        function f(a, b) {
            ! function ea() {
                r(w, function(a) {
                    a()
                }), t = b(ea, a)
            }()
        }

        function g() {
            y != h.url() && (y = h.url(), r(ba, function(a) {
                a(h.url())
            }))
        }
        var h = this,
            k = a[0],
            m = b.location,
            l = b.history,
            n = b.setTimeout,
            q = b.clearTimeout,
            p = {};
        h.isMock = !1;
        var s = 0,
            J = [];
        h.$$completeOutstandingRequest = e, h.$$incOutstandingRequestCount = function() {
            s++
        }, h.notifyWhenNoOutstandingRequests = function(a) {
            r(w, function(a) {
                a()
            }), 0 === s ? a() : J.push(a)
        };
        var t, w = [];
        h.addPollFn = function(a) {
            return F(t) && f(100, n), w.push(a), a
        };
        var y = m.href,
            K = a.find("base"),
            B = null;
        h.url = function(a, c) {
            if (m !== b.location && (m = b.location), l !== b.history && (l = b.history), !a) return B || m.href.replace(/%27/g, "'");
            if (y != a) {
                var e = y && Ga(y) === Ga(a);
                return y = a, !e && d.history ? c ? l.replaceState(null, "", a) : (l.pushState(null, "", a), K.attr("href", K.attr("href"))) : (e || (B = a), c ? m.replace(a) : m.href = a), h
            }
        };
        var ba = [],
            O = !1;
        h.onUrlChange = function(a) {
            return O || (d.history && A(b).on("popstate", g), d.hashchange ? A(b).on("hashchange", g) : h.addPollFn(g), O = !0), ba.push(a), a
        }, h.$$checkUrlChange = g, h.baseHref = function() {
            var a = K.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        };
        var M = {},
            ca = "",
            P = h.baseHref();
        h.cookies = function(a, b) {
            var d, e, f, h;
            if (!a) {
                if (k.cookie !== ca)
                    for (ca = k.cookie, d = ca.split("; "), M = {}, f = 0; f < d.length; f++) e = d[f], h = e.indexOf("="), h > 0 && (a = unescape(e.substring(0, h)), M[a] === u && (M[a] = unescape(e.substring(h + 1))));
                return M
            }
            b === u ? k.cookie = escape(a) + "=;path=" + P + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : G(b) && (d = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + P).length + 1, d > 4096 && c.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + d + " > 4096 bytes)!"))
        }, h.defer = function(a, b) {
            var c;
            return s++, c = n(function() {
                delete p[c], e(a)
            }, b || 0), p[c] = !0, c
        }, h.defer.cancel = function(a) {
            return p[a] ? (delete p[a], q(a), e(v), !0) : !1
        }
    }

    function Md() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(b, a, c, d) {
            return new se(b, d, a, c)
        }]
    }

    function Nd() {
        this.$get = function() {
            function b(b, d) {
                function e(a) {
                    a != n && (q ? q == a && (q = a.n) : q = a, f(a.n, a.p), f(a, n), n = a, n.n = null)
                }

                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a))
                }
                if (b in a) throw z("$cacheFactory")("iid", b);
                var g = 0,
                    h = E({}, d, {
                        id: b
                    }),
                    k = {},
                    m = d && d.capacity || Number.MAX_VALUE,
                    l = {},
                    n = null,
                    q = null;
                return a[b] = {
                    put: function(a, b) {
                        if (m < Number.MAX_VALUE) {
                            var c = l[a] || (l[a] = {
                                key: a
                            });
                            e(c)
                        }
                        return F(b) ? void 0 : (a in k || g++, k[a] = b, g > m && this.remove(q.key), b)
                    },
                    get: function(a) {
                        if (m < Number.MAX_VALUE) {
                            var b = l[a];
                            if (!b) return;
                            e(b)
                        }
                        return k[a]
                    },
                    remove: function(a) {
                        if (m < Number.MAX_VALUE) {
                            var b = l[a];
                            if (!b) return;
                            b == n && (n = b.p), b == q && (q = b.n), f(b.n, b.p), delete l[a]
                        }
                        delete k[a], g--
                    },
                    removeAll: function() {
                        k = {}, g = 0, l = {}, n = q = null
                    },
                    destroy: function() {
                        l = h = k = null, delete a[b]
                    },
                    info: function() {
                        return E({}, h, {
                            size: g
                        })
                    }
                }
            }
            var a = {};
            return b.info = function() {
                var b = {};
                return r(a, function(a, e) {
                    b[e] = a.info()
                }), b
            }, b.get = function(b) {
                return a[b]
            }, b
        }
    }

    function ce() {
        this.$get = ["$cacheFactory", function(b) {
            return b("templates")
        }]
    }

    function gc(b, a) {
        var c = {},
            d = "Directive",
            e = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/,
            f = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/,
            g = /^(on[a-z]+|formaction)$/;
        this.directive = function k(a, e) {
            return Ea(a, "directive"), G(a) ? (Db(e, "directiveFactory"), c.hasOwnProperty(a) || (c[a] = [], b.factory(a + d, ["$injector", "$exceptionHandler", function(b, d) {
                var e = [];
                return r(c[a], function(c, f) {
                    try {
                        var g = b.invoke(c);
                        N(g) ? g = {
                            compile: aa(g)
                        } : !g.compile && g.link && (g.compile = aa(g.link)), g.priority = g.priority || 0, g.index = f, g.name = g.name || a, g.require = g.require || g.controller && g.name, g.restrict = g.restrict || "A", e.push(g)
                    } catch (k) {
                        d(k)
                    }
                }), e
            }])), c[a].push(e)) : r(a, Yb(k)), this
        }, this.aHrefSanitizationWhitelist = function(b) {
            return D(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function(b) {
            return D(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist()
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, b, l, n, q, p, s, J, w, t, y, K) {
            function B(a, b, c, d, e) {
                a instanceof A || (a = A(a)), r(a, function(b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = A(b).wrap("<span></span>").parent()[0])
                });
                var f = O(a, b, a, c, d, e);
                return ba(a, "ng-scope"),
                    function(b, c, d, e) {
                        Db(b, "scope");
                        var g = c ? Oa.clone.call(a) : a;
                        r(d, function(a, b) {
                            g.data("$" + b + "Controller", a)
                        }), d = 0;
                        for (var k = g.length; k > d; d++) {
                            var p = g[d].nodeType;
                            1 !== p && 9 !== p || g.eq(d).data("$scope", b)
                        }
                        return c && c(g, b), f && f(b, g, g, e), g
                    }
            }

            function ba(a, b) {
                try {
                    a.addClass(b)
                } catch (c) {}
            }

            function O(a, b, c, d, e, f) {
                function g(a, c, d, e) {
                    var f, p, l, m, q, n, w;
                    f = c.length;
                    var s = Array(f);
                    for (m = 0; f > m; m++) s[m] = c[m];
                    for (n = m = 0, q = k.length; q > m; n++) p = s[n], c = k[m++], f = k[m++], c ? (c.scope ? (l = a.$new(), A.data(p, "$scope", l)) : l = a, w = c.transcludeOnThisElement ? M(a, c.transclude, e) : !c.templateOnThisElement && e ? e : !e && b ? M(a, b) : null, c(f, l, p, d, w)) : f && f(a, p.childNodes, u, e)
                }
                for (var p, l, m, q, k = [], n = 0; n < a.length; n++) p = new Ob, l = ca(a[n], [], p, 0 === n ? d : u, e), (f = l.length ? I(l, a[n], p, b, c, null, [], [], f) : null) && f.scope && ba(p.$$element, "ng-scope"), p = f && f.terminal || !(m = a[n].childNodes) || !m.length ? null : O(m, f ? (f.transcludeOnThisElement || !f.templateOnThisElement) && f.transclude : b), k.push(f, p), q = q || f || p, f = null;
                return q ? g : null
            }

            function M(a, b, c) {
                return function(d, e, f) {
                    var g = !1;
                    return d || (d = a.$new(), g = d.$$transcluded = !0), e = b(d, e, f, c), g && e.on("$destroy", function() {
                        d.$destroy()
                    }), e
                }
            }

            function ca(a, b, c, d, g) {
                var p, k = c.$attr;
                switch (a.nodeType) {
                    case 1:
                        ea(b, qa(Pa(a).toLowerCase()), "E", d, g);
                        for (var l, m, q, n = a.attributes, w = 0, s = n && n.length; s > w; w++) {
                            var t = !1,
                                J = !1;
                            if (l = n[w], !R || R >= 8 || l.specified) {
                                p = l.name, m = $(l.value), l = qa(p), (q = U.test(l)) && (p = nb(l.substr(6), "-"));
                                var y = l.replace(/(Start|End)$/, "");
                                l === y + "Start" && (t = p, J = p.substr(0, p.length - 5) + "end", p = p.substr(0, p.length - 6)), l = qa(p.toLowerCase()), k[l] = p, (q || !c.hasOwnProperty(l)) && (c[l] = m, oc(a, l) && (c[l] = !0)), S(a, b, m, l), ea(b, l, "A", d, g, t, J)
                            }
                        }
                        if (a = a.className, G(a) && "" !== a)
                            for (; p = f.exec(a);) l = qa(p[2]), ea(b, l, "C", d, g) && (c[l] = $(p[3])), a = a.substr(p.index + p[0].length);
                        break;
                    case 3:
                        x(b, a.nodeValue);
                        break;
                    case 8:
                        try {
                            (p = e.exec(a.nodeValue)) && (l = qa(p[1]), ea(b, l, "M", d, g) && (c[l] = $(p[2])))
                        } catch (B) {}
                }
                return b.sort(F), b
            }

            function P(a, b, c) {
                var d = [],
                    e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw ja("uterdir", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
                    } while (e > 0)
                } else d.push(a);
                return A(d)
            }

            function C(a, b, c) {
                return function(d, e, f, g, k) {
                    return e = P(e[0], b, c), a(d, e, f, g, k)
                }
            }

            function I(a, c, d, e, f, g, k, q, n) {
                function w(a, b, c, d) {
                    a && (c && (a = C(a, c, d)), a.require = H.require, a.directiveName = z, (K === H || H.$$isolateScope) && (a = rc(a, {
                        isolateScope: !0
                    })), k.push(a)), b && (c && (b = C(b, c, d)), b.require = H.require, b.directiveName = z, (K === H || H.$$isolateScope) && (b = rc(b, {
                        isolateScope: !0
                    })), q.push(b))
                }

                function t(a, b, c, d) {
                    var e, f = "data",
                        g = !1;
                    if (G(b)) {
                        for (;
                            "^" == (e = b.charAt(0)) || "?" == e;) b = b.substr(1), "^" == e && (f = "inheritedData"), g = g || "?" == e;
                        if (e = null, d && "data" === f && (e = d[b]), e = e || c[f]("$" + b + "Controller"), !e && !g) throw ja("ctreq", b, a)
                    } else L(b) && (e = [], r(b, function(b) {
                        e.push(t(a, b, c, d))
                    }));
                    return e
                }

                function J(a, e, f, g, n) {
                    function w(a, b) {
                        var c;
                        return 2 > arguments.length && (b = a, a = u), Ia && (c = ca), n(a, b, c)
                    }
                    var y, Q, B, M, C, P, ra, ca = {};
                    if (y = c === f ? d : ha(d, new Ob(A(f), d.$attr)), Q = y.$$element, K) {
                        var ue = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                        P = e.$new(!0), !I || I !== K && I !== K.$$originalDirective ? Q.data("$isolateScopeNoTemplate", P) : Q.data("$isolateScope", P), ba(Q, "ng-isolate-scope"), r(K.scope, function(a, c) {
                            var k, l, n, q, d = a.match(ue) || [],
                                f = d[3] || c,
                                g = "?" == d[2],
                                d = d[1];
                            switch (P.$$isolateBindings[c] = d + f, d) {
                                case "@":
                                    y.$observe(f, function(a) {
                                        P[c] = a
                                    }), y.$$observers[f].$$scope = e, y[f] && (P[c] = b(y[f])(e));
                                    break;
                                case "=":
                                    if (g && !y[f]) break;
                                    l = p(y[f]), q = l.literal ? Ca : function(a, b) {
                                        return a === b || a !== a && b !== b
                                    }, n = l.assign || function() {
                                        throw k = P[c] = l(e), ja("nonassign", y[f], K.name)
                                    }, k = P[c] = l(e), P.$watch(function() {
                                        var a = l(e);
                                        return q(a, P[c]) || (q(a, k) ? n(e, a = P[c]) : P[c] = a), k = a
                                    }, null, l.literal);
                                    break;
                                case "&":
                                    l = p(y[f]), P[c] = function(a) {
                                        return l(e, a)
                                    };
                                    break;
                                default:
                                    throw ja("iscp", K.name, c, a)
                            }
                        })
                    }
                    for (ra = n && w, O && r(O, function(a) {
                            var c, b = {
                                $scope: a === K || a.$$isolateScope ? P : e,
                                $element: Q,
                                $attrs: y,
                                $transclude: ra
                            };
                            C = a.controller, "@" == C && (C = y[a.name]), c = s(C, b), ca[a.name] = c, Ia || Q.data("$" + a.name + "Controller", c), a.controllerAs && (b.$scope[a.controllerAs] = c)
                        }), g = 0, B = k.length; B > g; g++) try {
                        (M = k[g])(M.isolateScope ? P : e, Q, y, M.require && t(M.directiveName, M.require, Q, ca), ra)
                    } catch (H) {
                        l(H, ia(Q))
                    }
                    for (g = e, K && (K.template || null === K.templateUrl) && (g = P), a && a(g, f.childNodes, u, n), g = q.length - 1; g >= 0; g--) try {
                        (M = q[g])(M.isolateScope ? P : e, Q, y, M.require && t(M.directiveName, M.require, Q, ca), ra)
                    } catch (D) {
                        l(D, ia(Q))
                    }
                }
                n = n || {};
                for (var M, H, z, V, R, y = -Number.MAX_VALUE, O = n.controllerDirectives, K = n.newIsolateScopeDirective, I = n.templateDirective, ea = n.nonTlbTranscludeDirective, F = !1, E = !1, Ia = n.hasElementTranscludeDirective, x = d.$$element = A(c), S = e, Ha = 0, sa = a.length; sa > Ha; Ha++) {
                    H = a[Ha];
                    var U = H.$$start,
                        Y = H.$$end;
                    if (U && (x = P(c, U, Y)), V = u, y > H.priority) break;
                    if ((V = H.scope) && (M = M || H, H.templateUrl || (fb("new/isolated scope", K, H, x), T(V) && (K = H))), z = H.name, !H.templateUrl && H.controller && (V = H.controller, O = O || {}, fb("'" + z + "' controller", O[z], H, x), O[z] = H), (V = H.transclude) && (F = !0, H.$$tlb || (fb("transclusion", ea, H, x), ea = H), "element" == V ? (Ia = !0, y = H.priority, V = x, x = d.$$element = A(X.createComment(" " + z + ": " + d[z] + " ")), c = x[0], ra(f, wa.call(V, 0), c), S = B(V, e, y, g && g.name, {
                            nonTlbTranscludeDirective: ea
                        })) : (V = A(Kb(c)).contents(), x.empty(), S = B(V, e))), H.template)
                        if (E = !0, fb("template", I, H, x), I = H, V = N(H.template) ? H.template(x, d) : H.template, V = W(V), H.replace) {
                            if (g = H, V = Ib.test(V) ? A($(V)) : [], c = V[0], 1 != V.length || 1 !== c.nodeType) throw ja("tplrt", z, "");
                            ra(f, x, c), sa = {
                                $attr: {}
                            }, V = ca(c, [], sa);
                            var Z = a.splice(Ha + 1, a.length - (Ha + 1));
                            K && D(V), a = a.concat(V).concat(Z), v(d, sa), sa = a.length
                        } else x.html(V);
                    if (H.templateUrl) E = !0, fb("template", I, H, x), I = H, H.replace && (g = H), J = te(a.splice(Ha, a.length - Ha), x, d, f, F && S, k, q, {
                        controllerDirectives: O,
                        newIsolateScopeDirective: K,
                        templateDirective: I,
                        nonTlbTranscludeDirective: ea
                    }), sa = a.length;
                    else if (H.compile) try {
                        R = H.compile(x, d, S), N(R) ? w(null, R, U, Y) : R && w(R.pre, R.post, U, Y)
                    } catch (ve) {
                        l(ve, ia(x))
                    }
                    H.terminal && (J.terminal = !0, y = Math.max(y, H.priority))
                }
                return J.scope = M && !0 === M.scope, J.transcludeOnThisElement = F, J.templateOnThisElement = E, J.transclude = S, n.hasElementTranscludeDirective = Ia, J
            }

            function D(a) {
                for (var b = 0, c = a.length; c > b; b++) a[b] = $b(a[b], {
                    $$isolateScope: !0
                })
            }

            function ea(b, e, f, g, p, m, n) {
                if (e === p) return null;
                if (p = null, c.hasOwnProperty(e)) {
                    var q;
                    e = a.get(e + d);
                    for (var w = 0, s = e.length; s > w; w++) try {
                        q = e[w], (g === u || g > q.priority) && -1 != q.restrict.indexOf(f) && (m && (q = $b(q, {
                            $$start: m,
                            $$end: n
                        })), b.push(q), p = q)
                    } catch (y) {
                        l(y)
                    }
                }
                return p
            }

            function v(a, b) {
                var c = b.$attr,
                    d = a.$attr,
                    e = a.$$element;
                r(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
                }), r(b, function(b, f) {
                    "class" == f ? (ba(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                })
            }

            function te(a, b, c, d, e, f, g, k) {
                var l, m, p = [],
                    w = b[0],
                    s = a.shift(),
                    y = E({}, s, {
                        templateUrl: null,
                        transclude: null,
                        replace: null,
                        $$originalDirective: s
                    }),
                    J = N(s.templateUrl) ? s.templateUrl(b, c) : s.templateUrl;
                return b.empty(), n.get(t.getTrustedResourceUrl(J), {
                        cache: q
                    }).success(function(q) {
                        var n, t;
                        if (q = W(q), s.replace) {
                            if (q = Ib.test(q) ? A($(q)) : [], n = q[0], 1 != q.length || 1 !== n.nodeType) throw ja("tplrt", s.name, J);
                            q = {
                                $attr: {}
                            }, ra(d, b, n);
                            var B = ca(n, [], q);
                            T(s.scope) && D(B), a = B.concat(a), v(c, q)
                        } else n = w, b.html(q);
                        for (a.unshift(y), l = I(a, n, c, e, b, s, f, g, k), r(d, function(a, c) {
                                a == n && (d[c] = b[0])
                            }), m = O(b[0].childNodes, e); p.length;) {
                            q = p.shift(), t = p.shift();
                            var K = p.shift(),
                                C = p.shift(),
                                B = b[0];
                            if (t !== w) {
                                var P = t.className;
                                k.hasElementTranscludeDirective && s.replace || (B = Kb(n)), ra(K, A(t), B), ba(A(B), P)
                            }
                            t = l.transcludeOnThisElement ? M(q, l.transclude, C) : C, l(m, q, B, d, t)
                        }
                        p = null
                    }).error(function(a, b, c, d) {
                        throw ja("tpload", d.url)
                    }),
                    function(a, b, c, d, e) {
                        a = e, p ? (p.push(b), p.push(c), p.push(d), p.push(a)) : (l.transcludeOnThisElement && (a = M(b, l.transclude, e)), l(m, b, c, d, a))
                    }
            }

            function F(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
            }

            function fb(a, b, c, d) {
                if (b) throw ja("multidir", b.name, c.name, a, ia(d))
            }

            function x(a, c) {
                var d = b(c, !0);
                d && a.push({
                    priority: 0,
                    compile: function(a) {
                        var b = a.parent().length;
                        return b && ba(a.parent(), "ng-binding"),
                            function(a, c) {
                                var e = c.parent(),
                                    f = e.data("$binding") || [];
                                f.push(d), e.data("$binding", f), b || ba(e, "ng-binding"), a.$watch(d, function(a) {
                                    c[0].nodeValue = a
                                })
                            }
                    }
                })
            }

            function z(a, b) {
                if ("srcdoc" == b) return t.HTML;
                var c = Pa(a);
                return "xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b) ? t.RESOURCE_URL : void 0
            }

            function S(a, c, d, e) {
                var f = b(d, !0);
                if (f) {
                    if ("multiple" === e && "SELECT" === Pa(a)) throw ja("selmulti", ia(a));
                    c.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(c, d, k) {
                                    if (d = k.$$observers || (k.$$observers = {}), g.test(e)) throw ja("nodomevents");
                                    (f = b(k[e], !0, z(a, e))) && (k[e] = f(c), (d[e] || (d[e] = [])).$$inter = !0, (k.$$observers && k.$$observers[e].$$scope || c).$watch(f, function(a, b) {
                                        "class" === e && a != b ? k.$updateClass(a, b) : k.$set(e, a)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function ra(a, b, c) {
                var g, k, d = b[0],
                    e = b.length,
                    f = d.parentNode;
                if (a)
                    for (g = 0, k = a.length; k > g; g++)
                        if (a[g] == d) {
                            a[g++] = c, k = g + e - 1;
                            for (var p = a.length; p > g; g++, k++) p > k ? a[g] = a[k] : delete a[g];
                            a.length -= e - 1;
                            break
                        }
                for (f && f.replaceChild(c, d), a = X.createDocumentFragment(), a.appendChild(d), c[A.expando] = d[A.expando], d = 1, e = b.length; e > d; d++) f = b[d], A(f).remove(), a.appendChild(f), delete b[d];
                b[0] = c, b.length = 1
            }

            function rc(a, b) {
                return E(function() {
                    return a.apply(null, arguments)
                }, a, b)
            }
            var Ob = function(a, b) {
                this.$$element = a, this.$attr = b || {}
            };
            Ob.prototype = {
                $normalize: qa,
                $addClass: function(a) {
                    a && 0 < a.length && y.addClass(this.$$element, a)
                },
                $removeClass: function(a) {
                    a && 0 < a.length && y.removeClass(this.$$element, a)
                },
                $updateClass: function(a, b) {
                    var c = sc(a, b),
                        d = sc(b, a);
                    0 === c.length ? y.removeClass(this.$$element, d) : 0 === d.length ? y.addClass(this.$$element, c) : y.setClass(this.$$element, c, d)
                },
                $set: function(a, b, c, d) {
                    var e = oc(this.$$element[0], a);
                    e && (this.$$element.prop(a, b), d = e), this[a] = b, d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = nb(a, "-")), e = Pa(this.$$element), ("A" === e && "href" === a || "IMG" === e && "src" === a) && (this[a] = b = K(b, "src" === a)), !1 !== c && (null === b || b === u ? this.$$element.removeAttr(d) : this.$$element.attr(d, b)), (c = this.$$observers) && r(c[a], function(a) {
                        try {
                            a(b)
                        } catch (c) {
                            l(c)
                        }
                    })
                },
                $observe: function(a, b) {
                    var c = this,
                        d = c.$$observers || (c.$$observers = {}),
                        e = d[a] || (d[a] = []);
                    return e.push(b), J.$evalAsync(function() {
                        e.$$inter || b(c[a])
                    }), b
                }
            };
            var sa = b.startSymbol(),
                Ia = b.endSymbol(),
                W = "{{" == sa || "}}" == Ia ? ga : function(a) {
                    return a.replace(/\{\{/g, sa).replace(/}}/g, Ia)
                },
                U = /^ngAttr[A-Z]/;
            return B
        }]
    }

    function qa(b) {
        return ab(b.replace(we, ""))
    }

    function sc(b, a) {
        var c = "",
            d = b.split(/\s+/),
            e = a.split(/\s+/),
            f = 0;
        a: for (; f < d.length; f++) {
            for (var g = d[f], h = 0; h < e.length; h++)
                if (g == e[h]) continue a;
            c += (0 < c.length ? " " : "") + g
        }
        return c
    }

    function Od() {
        var b = {},
            a = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(a, d) {
            Ea(a, "controller"), T(a) ? E(b, a) : b[a] = d
        }, this.$get = ["$injector", "$window", function(c, d) {
            return function(e, f) {
                var g, h, k;
                if (G(e) && (g = e.match(a), h = g[1], k = g[3], e = b.hasOwnProperty(h) ? b[h] : fc(f.$scope, h, !0) || fc(d, h, !0), Ya(e, h, !0)), g = c.instantiate(e, f), k) {
                    if (!f || "object" != typeof f.$scope) throw z("$controller")("noscp", h || e.name, k);
                    f.$scope[k] = g
                }
                return g
            }
        }]
    }

    function Pd() {
        this.$get = ["$window", function(b) {
            return A(b.document)
        }]
    }

    function Qd() {
        this.$get = ["$log", function(b) {
            return function() {
                b.error.apply(b, arguments)
            }
        }]
    }

    function tc(b) {
        var c, d, e, a = {};
        return b ? (r(b.split("\n"), function(b) {
            e = b.indexOf(":"), c = x($(b.substr(0, e))), d = $(b.substr(e + 1)), c && (a[c] = a[c] ? a[c] + ", " + d : d)
        }), a) : a
    }

    function uc(b) {
        var a = T(b) ? b : u;
        return function(c) {
            return a || (a = tc(b)), c ? a[x(c)] || null : a
        }
    }

    function vc(b, a, c) {
        return N(c) ? c(b, a) : (r(c, function(c) {
            b = c(b, a)
        }), b)
    }

    function Td() {
        var b = /^\s*(\[|\{[^\{])/,
            a = /[\}\]]\s*$/,
            c = /^\)\]\}',?\n/,
            d = {
                "Content-Type": "application/json;charset=utf-8"
            },
            e = this.defaults = {
                transformResponse: [function(d) {
                    return G(d) && (d = d.replace(c, ""), b.test(d) && a.test(d) && (d = ac(d))), d
                }],
                transformRequest: [function(a) {
                    return T(a) && "[object File]" !== Ba.call(a) && "[object Blob]" !== Ba.call(a) ? oa(a) : a
                }],
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    },
                    post: ha(d),
                    put: ha(d),
                    patch: ha(d)
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN"
            },
            f = this.interceptors = [],
            g = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, c, d, n, q) {
            function p(a) {
                function b(a) {
                    var d = E({}, a, {
                        data: vc(a.data, a.headers, c.transformResponse)
                    });
                    return 200 <= a.status && 300 > a.status ? d : n.reject(d)
                }
                var c = {
                        method: "get",
                        transformRequest: e.transformRequest,
                        transformResponse: e.transformResponse
                    },
                    d = function(a) {
                        var d, f, b = e.headers,
                            c = E({}, a.headers),
                            b = E({}, b.common, b[x(a.method)]);
                        a: for (d in b) {
                            a = x(d);
                            for (f in c)
                                if (x(f) === a) continue a;
                            c[d] = b[d]
                        }
                        return function(a) {
                            var b;
                            r(a, function(c, d) {
                                N(c) && (b = c(), null != b ? a[d] = b : delete a[d])
                            })
                        }(c), c
                    }(a);
                E(c, a), c.headers = d, c.method = La(c.method);
                var f = [function(a) {
                        d = a.headers;
                        var c = vc(a.data, uc(d), a.transformRequest);
                        return F(c) && r(d, function(a, b) {
                            "content-type" === x(b) && delete d[b]
                        }), F(a.withCredentials) && !F(e.withCredentials) && (a.withCredentials = e.withCredentials), s(a, c, d).then(b, b)
                    }, u],
                    g = n.when(c);
                for (r(t, function(a) {
                        (a.request || a.requestError) && f.unshift(a.request, a.requestError), (a.response || a.responseError) && f.push(a.response, a.responseError)
                    }); f.length;) {
                    a = f.shift();
                    var h = f.shift(),
                        g = g.then(a, h)
                }
                return g.success = function(a) {
                    return g.then(function(b) {
                        a(b.data, b.status, b.headers, c)
                    }), g
                }, g.error = function(a) {
                    return g.then(null, function(b) {
                        a(b.data, b.status, b.headers, c)
                    }), g
                }, g
            }

            function s(c, f, g) {
                function m(a, b, c, e) {
                    C && (a >= 200 && 300 > a ? C.put(A, [a, b, tc(c), e]) : C.remove(A)), q(b, a, c, e), d.$$phase || d.$apply()
                }

                function q(a, b, d, e) {
                    b = Math.max(b, 0), (b >= 200 && 300 > b ? t.resolve : t.reject)({
                        data: a,
                        status: b,
                        headers: uc(d),
                        config: c,
                        statusText: e
                    })
                }

                function s() {
                    var a = Ta(p.pendingRequests, c); - 1 !== a && p.pendingRequests.splice(a, 1)
                }
                var C, I, t = n.defer(),
                    r = t.promise,
                    A = J(c.url, c.params);
                if (p.pendingRequests.push(c), r.then(s, s), !c.cache && !e.cache || !1 === c.cache || "GET" !== c.method && "JSONP" !== c.method || (C = T(c.cache) ? c.cache : T(e.cache) ? e.cache : w), C)
                    if (I = C.get(A), D(I)) {
                        if (I && N(I.then)) return I.then(s, s), I;
                        L(I) ? q(I[1], I[0], ha(I[2]), I[3]) : q(I, 200, {}, "OK")
                    } else C.put(A, r);
                return F(I) && ((I = Pb(c.url) ? b.cookies()[c.xsrfCookieName || e.xsrfCookieName] : u) && (g[c.xsrfHeaderName || e.xsrfHeaderName] = I), a(c.method, A, f, m, g, c.timeout, c.withCredentials, c.responseType)), r
            }

            function J(a, b) {
                if (!b) return a;
                var c = [];
                return Sc(b, function(a, b) {
                    null === a || F(a) || (L(a) || (a = [a]), r(a, function(a) {
                        T(a) && (a = va(a) ? a.toISOString() : oa(a)), c.push(Da(b) + "=" + Da(a))
                    }))
                }), 0 < c.length && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")), a
            }
            var w = c("$http"),
                t = [];
            return r(f, function(a) {
                    t.unshift(G(a) ? q.get(a) : q.invoke(a))
                }), r(g, function(a, b) {
                    var c = G(a) ? q.get(a) : q.invoke(a);
                    t.splice(b, 0, {
                        response: function(a) {
                            return c(n.when(a))
                        },
                        responseError: function(a) {
                            return c(n.reject(a))
                        }
                    })
                }), p.pendingRequests = [],
                function() {
                    r(arguments, function(a) {
                        p[a] = function(b, c) {
                            return p(E(c || {}, {
                                method: a,
                                url: b
                            }))
                        }
                    })
                }("get", "delete", "head", "jsonp"),
                function() {
                    r(arguments, function(a) {
                        p[a] = function(b, c, d) {
                            return p(E(d || {}, {
                                method: a,
                                url: b,
                                data: c
                            }))
                        }
                    })
                }("post", "put", "patch"), p.defaults = e, p
        }]
    }

    function xe(b) {
        if (8 >= R && (!b.match(/^(get|post|head|put|delete|options)$/i) || !W.XMLHttpRequest)) return new W.ActiveXObject("Microsoft.XMLHTTP");
        if (W.XMLHttpRequest) return new W.XMLHttpRequest;
        throw z("$httpBackend")("noxhr")
    }

    function Ud() {
        this.$get = ["$browser", "$window", "$document", function(b, a, c) {
            return ye(b, xe, b.defer, a.angular.callbacks, c[0])
        }]
    }

    function ye(b, a, c, d, e) {
        function f(a, b, c) {
            var f = e.createElement("script"),
                g = null;
            return f.type = "text/javascript", f.src = a, f.async = !0, g = function(a) {
                bb(f, "load", g), bb(f, "error", g), e.body.removeChild(f), f = null;
                var h = -1,
                    s = "unknown";
                a && ("load" !== a.type || d[b].called || (a = {
                    type: "error"
                }), s = a.type, h = "error" === a.type ? 404 : 200), c && c(h, s)
            }, sb(f, "load", g), sb(f, "error", g), 8 >= R && (f.onreadystatechange = function() {
                G(f.readyState) && /loaded|complete/.test(f.readyState) && (f.onreadystatechange = null, g({
                    type: "load"
                }))
            }), e.body.appendChild(f), g
        }
        var g = -1;
        return function(e, k, m, l, n, q, p, s) {
            function J() {
                t = g, K && K(), B && B.abort()
            }

            function w(a, d, e, f, g) {
                O && c.cancel(O), K = B = null, 0 === d && (d = e ? 200 : "file" == xa(k).protocol ? 404 : 0), a(1223 === d ? 204 : d, e, f, g || ""), b.$$completeOutstandingRequest(v)
            }
            var t;
            if (b.$$incOutstandingRequestCount(), k = k || b.url(), "jsonp" == x(e)) {
                var y = "_" + (d.counter++).toString(36);
                d[y] = function(a) {
                    d[y].data = a, d[y].called = !0
                };
                var K = f(k.replace("JSON_CALLBACK", "angular.callbacks." + y), y, function(a, b) {
                    w(l, a, d[y].data, "", b), d[y] = v
                })
            } else {
                var B = a(e);
                if (B.open(e, k, !0), r(n, function(a, b) {
                        D(a) && B.setRequestHeader(b, a)
                    }), B.onreadystatechange = function() {
                        if (B && 4 == B.readyState) {
                            var a = null,
                                b = null,
                                c = "";
                            t !== g && (a = B.getAllResponseHeaders(), b = "response" in B ? B.response : B.responseText), t === g && 10 > R || (c = B.statusText), w(l, t || B.status, b, a, c)
                        }
                    }, p && (B.withCredentials = !0), s) try {
                    B.responseType = s
                } catch (ba) {
                    if ("json" !== s) throw ba
                }
                B.send(m || null)
            }
            if (q > 0) var O = c(J, q);
            else q && N(q.then) && q.then(J)
        }
    }

    function Rd() {
        var b = "{{",
            a = "}}";
        this.startSymbol = function(a) {
            return a ? (b = a, this) : b
        }, this.endSymbol = function(b) {
            return b ? (a = b, this) : a
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(f, m, l) {
                for (var n, q, p = 0, s = [], J = f.length, w = !1, t = []; J > p;) - 1 != (n = f.indexOf(b, p)) && -1 != (q = f.indexOf(a, n + g)) ? (p != n && s.push(f.substring(p, n)), s.push(p = c(w = f.substring(n + g, q))), p.exp = w, p = q + h, w = !0) : (p != J && s.push(f.substring(p)), p = J);
                if ((J = s.length) || (s.push(""), J = 1), l && 1 < s.length) throw wc("noconcat", f);
                return !m || w ? (t.length = J, p = function(a) {
                    try {
                        for (var g, b = 0, c = J; c > b; b++) {
                            if ("function" == typeof(g = s[b]))
                                if (g = g(a), g = l ? e.getTrusted(l, g) : e.valueOf(g), null == g) g = "";
                                else switch (typeof g) {
                                    case "string":
                                        break;
                                    case "number":
                                        g = "" + g;
                                        break;
                                    default:
                                        g = oa(g)
                                }
                                t[b] = g
                        }
                        return t.join("")
                    } catch (h) {
                        a = wc("interr", f, h.toString()), d(a)
                    }
                }, p.exp = f, p.parts = s, p) : void 0
            }
            var g = b.length,
                h = a.length;
            return f.startSymbol = function() {
                return b
            }, f.endSymbol = function() {
                return a
            }, f
        }]
    }

    function Sd() {
        this.$get = ["$rootScope", "$window", "$q", function(b, a, c) {
            function d(d, g, h, k) {
                var m = a.setInterval,
                    l = a.clearInterval,
                    n = c.defer(),
                    q = n.promise,
                    p = 0,
                    s = D(k) && !k;
                return h = D(h) ? h : 0, q.then(null, null, d), q.$$intervalId = m(function() {
                    n.notify(p++), h > 0 && p >= h && (n.resolve(p), l(q.$$intervalId), delete e[q.$$intervalId]), s || b.$apply()
                }, g), e[q.$$intervalId] = n, q
            }
            var e = {};
            return d.cancel = function(b) {
                return b && b.$$intervalId in e ? (e[b.$$intervalId].reject("canceled"), a.clearInterval(b.$$intervalId), delete e[b.$$intervalId], !0) : !1
            }, d
        }]
    }

    function ad() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January February March April May June July August September October November December".split(" "),
                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(b) {
                    return 1 === b ? "one" : "other"
                }
            }
        }
    }

    function Qb(b) {
        b = b.split("/");
        for (var a = b.length; a--;) b[a] = mb(b[a]);
        return b.join("/")
    }

    function xc(b, a, c) {
        b = xa(b, c), a.$$protocol = b.protocol, a.$$host = b.hostname, a.$$port = U(b.port) || ze[b.protocol] || null
    }

    function yc(b, a, c) {
        var d = "/" !== b.charAt(0);
        d && (b = "/" + b), b = xa(b, c), a.$$path = decodeURIComponent(d && "/" === b.pathname.charAt(0) ? b.pathname.substring(1) : b.pathname), a.$$search = cc(b.search), a.$$hash = decodeURIComponent(b.hash), a.$$path && "/" != a.$$path.charAt(0) && (a.$$path = "/" + a.$$path)
    }

    function ta(b, a) {
        return 0 === a.indexOf(b) ? a.substr(b.length) : void 0
    }

    function Ga(b) {
        var a = b.indexOf("#");
        return -1 == a ? b : b.substr(0, a)
    }

    function Rb(b) {
        return b.substr(0, Ga(b).lastIndexOf("/") + 1)
    }

    function zc(b, a) {
        this.$$html5 = !0, a = a || "";
        var c = Rb(b);
        xc(b, this, b), this.$$parse = function(a) {
            var e = ta(c, a);
            if (!G(e)) throw Sb("ipthprfx", a, c);
            yc(e, this, b), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function() {
            var a = Cb(this.$$search),
                b = this.$$hash ? "#" + mb(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = c + this.$$url.substr(1)
        }, this.$$parseLinkUrl = function(d) {
            var f, g;
            return (f = ta(b, d)) !== u ? (g = f, g = (f = ta(a, f)) !== u ? c + (ta("/", f) || f) : b + g) : (f = ta(c, d)) !== u ? g = c + f : c == d + "/" && (g = c), g && this.$$parse(g), !!g
        }
    }

    function Tb(b, a) {
        var c = Rb(b);
        xc(b, this, b), this.$$parse = function(d) {
            var e = ta(b, d) || ta(c, d),
                e = "#" == e.charAt(0) ? ta(a, e) : this.$$html5 ? e : "";
            if (!G(e)) throw Sb("ihshprfx", d, a);
            yc(e, this, b), d = this.$$path;
            var f = /^\/[A-Z]:(\/.*)/;
            0 === e.indexOf(b) && (e = e.replace(b, "")), f.exec(e) || (d = (e = f.exec(d)) ? e[1] : d), this.$$path = d, this.$$compose()
        }, this.$$compose = function() {
            var c = Cb(this.$$search),
                e = this.$$hash ? "#" + mb(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (c ? "?" + c : "") + e, this.$$absUrl = b + (this.$$url ? a + this.$$url : "")
        }, this.$$parseLinkUrl = function(a) {
            return Ga(b) == Ga(a) ? (this.$$parse(a), !0) : !1
        }
    }

    function Ac(b, a) {
        this.$$html5 = !0, Tb.apply(this, arguments);
        var c = Rb(b);
        this.$$parseLinkUrl = function(d) {
            var f, g;
            return b == Ga(d) ? f = d : (g = ta(c, d)) ? f = b + a + g : c === d + "/" && (f = c), f && this.$$parse(f), !!f
        }, this.$$compose = function() {
            var c = Cb(this.$$search),
                e = this.$$hash ? "#" + mb(this.$$hash) : "";
            this.$$url = Qb(this.$$path) + (c ? "?" + c : "") + e, this.$$absUrl = b + a + this.$$url
        }
    }

    function tb(b) {
        return function() {
            return this[b]
        }
    }

    function Bc(b, a) {
        return function(c) {
            return F(c) ? this[b] : (this[b] = a(c), this.$$compose(), this)
        }
    }

    function Vd() {
        var b = "",
            a = !1;
        this.hashPrefix = function(a) {
            return D(a) ? (b = a, this) : b
        }, this.html5Mode = function(b) {
            return D(b) ? (a = b, this) : a
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function(c, d, e, f) {
            function g(a) {
                c.$broadcast("$locationChangeSuccess", h.absUrl(), a)
            }
            var h, k = d.baseHref(),
                m = d.url();
            a ? (k = m.substring(0, m.indexOf("/", m.indexOf("//") + 2)) + (k || "/"), e = e.history ? zc : Ac) : (k = Ga(m), e = Tb), h = new e(k, "#" + b), h.$$parseLinkUrl(m, m);
            var l = /^\s*(javascript|mailto):/i;
            f.on("click", function(a) {
                if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
                    for (var b = A(a.target);
                        "a" !== x(b[0].nodeName);)
                        if (b[0] === f[0] || !(b = b.parent())[0]) return;
                    var e = b.prop("href"),
                        g = b.attr("href") || b.attr("xlink:href");
                    T(e) && "[object SVGAnimatedString]" === e.toString() && (e = xa(e.animVal).href), l.test(e) || !e || b.attr("target") || a.isDefaultPrevented() || !h.$$parseLinkUrl(e, g) || (a.preventDefault(), h.absUrl() != d.url() && (c.$apply(), W.angular["ff-684208-preventDefault"] = !0))
                }
            }), h.absUrl() != m && d.url(h.absUrl(), !0), d.onUrlChange(function(a) {
                h.absUrl() != a && (c.$evalAsync(function() {
                    var b = h.absUrl();
                    h.$$parse(a), c.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (h.$$parse(b), d.url(b)) : g(b)
                }), c.$$phase || c.$digest())
            });
            var n = 0;
            return c.$watch(function() {
                var a = d.url(),
                    b = h.$$replace;
                return n && a == h.absUrl() || (n++, c.$evalAsync(function() {
                    c.$broadcast("$locationChangeStart", h.absUrl(), a).defaultPrevented ? h.$$parse(a) : (d.url(h.absUrl(), b), g(a))
                })), h.$$replace = !1, n
            }), h
        }]
    }

    function Wd() {
        var b = !0,
            a = this;
        this.debugEnabled = function(a) {
            return D(a) ? (b = a, this) : b
        }, this.$get = ["$window", function(c) {
            function d(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
            }

            function e(a) {
                var b = c.console || {},
                    e = b[a] || b.log || v;
                a = !1;
                try {
                    a = !!e.apply
                } catch (k) {}
                return a ? function() {
                    var a = [];
                    return r(arguments, function(b) {
                        a.push(d(b))
                    }), e.apply(b, a)
                } : function(a, b) {
                    e(a, null == b ? "" : b)
                }
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        b && c.apply(a, arguments)
                    }
                }()
            }
        }]
    }

    function ka(b, a) {
        if ("__defineGetter__" === b || "__defineSetter__" === b || "__lookupGetter__" === b || "__lookupSetter__" === b || "__proto__" === b) throw la("isecfld", a);
        return b
    }

    function ma(b, a) {
        if (b) {
            if (b.constructor === b) throw la("isecfn", a);
            if (b.document && b.location && b.alert && b.setInterval) throw la("isecwindow", a);
            if (b.children && (b.nodeName || b.prop && b.attr && b.find)) throw la("isecdom", a);
            if (b === Object) throw la("isecobj", a)
        }
        return b
    }

    function ub(b, a, c, d, e) {
        ma(b, d), e = e || {}, a = a.split(".");
        for (var f, g = 0; 1 < a.length; g++) {
            f = ka(a.shift(), d);
            var h = ma(b[f], d);
            h || (h = {}, b[f] = h), b = h, b.then && e.unwrapPromises && (ya(d), "$$v" in b || function(a) {
                a.then(function(b) {
                    a.$$v = b
                })
            }(b), b.$$v === u && (b.$$v = {}), b = b.$$v)
        }
        return f = ka(a.shift(), d), ma(b[f], d), b[f] = c
    }

    function Qa(b) {
        return "constructor" == b
    }

    function Cc(b, a, c, d, e, f, g) {
        ka(b, f), ka(a, f), ka(c, f), ka(d, f), ka(e, f);
        var h = function(a) {
                return ma(a, f)
            },
            k = g.expensiveChecks,
            m = k || Qa(b) ? h : ga,
            l = k || Qa(a) ? h : ga,
            n = k || Qa(c) ? h : ga,
            q = k || Qa(d) ? h : ga,
            p = k || Qa(e) ? h : ga;
        return g.unwrapPromises ? function(g, h) {
            var t, k = h && h.hasOwnProperty(b) ? h : g;
            return null == k ? k : ((k = m(k[b])) && k.then && (ya(f), "$$v" in k || (t = k, t.$$v = u, t.then(function(a) {
                t.$$v = m(a)
            })), k = m(k.$$v)), a ? null == k ? u : ((k = l(k[a])) && k.then && (ya(f), "$$v" in k || (t = k, t.$$v = u, t.then(function(a) {
                t.$$v = l(a)
            })), k = l(k.$$v)), c ? null == k ? u : ((k = n(k[c])) && k.then && (ya(f), "$$v" in k || (t = k, t.$$v = u, t.then(function(a) {
                t.$$v = n(a)
            })), k = n(k.$$v)), d ? null == k ? u : ((k = q(k[d])) && k.then && (ya(f), "$$v" in k || (t = k, t.$$v = u, t.then(function(a) {
                t.$$v = q(a)
            })), k = q(k.$$v)), e ? null == k ? u : ((k = p(k[e])) && k.then && (ya(f), "$$v" in k || (t = k, t.$$v = u, t.then(function(a) {
                t.$$v = p(a)
            })), k = p(k.$$v)), k) : k) : k) : k) : k)
        } : function(f, g) {
            var h = g && g.hasOwnProperty(b) ? g : f;
            return null == h ? h : (h = m(h[b]), a ? null == h ? u : (h = l(h[a]), c ? null == h ? u : (h = n(h[c]), d ? null == h ? u : (h = q(h[d]), e ? null == h ? u : h = p(h[e]) : h) : h) : h) : h)
        }
    }

    function Ae(b, a) {
        return function(c, d) {
            return b(c, d, ya, ma, a)
        }
    }

    function Dc(b, a, c) {
        var d = a.expensiveChecks,
            e = d ? Be : Ce;
        if (e.hasOwnProperty(b)) return e[b];
        var h, f = b.split("."),
            g = f.length;
        if (a.csp) h = 6 > g ? Cc(f[0], f[1], f[2], f[3], f[4], c, a) : function(b, d) {
            var h, e = 0;
            do h = Cc(f[e++], f[e++], f[e++], f[e++], f[e++], c, a)(b, d), d = u, b = h; while (g > e);
            return h
        };
        else {
            var k = "var p;\n";
            d && (k += "s = eso(s, fe);\nl = eso(l, fe);\n");
            var m = d;
            r(f, function(b, e) {
                ka(b, c);
                var f = (e ? "s" : '((l&&l.hasOwnProperty("' + b + '"))?l:s)') + '["' + b + '"]',
                    g = d || Qa(b);
                g && (f = "eso(" + f + ", fe)", m = !0), k += "if(s == null) return undefined;\ns=" + f + ";\n", a.unwrapPromises && (k += 'if (s && s.then) {\n pw("' + c.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=' + (g ? "eso(v)" : "v") + ";});\n}\n s=" + (g ? "eso(s.$$v)" : "s.$$v") + "\n}\n")
            }), k += "return s;", h = new Function("s", "l", "pw", "eso", "fe", k), h.toString = aa(k), (m || a.unwrapPromises) && (h = Ae(h, c))
        }
        return "hasOwnProperty" !== b && (e[b] = h), h
    }

    function Xd() {
        var b = {},
            a = {},
            c = {
                csp: !1,
                unwrapPromises: !1,
                logPromiseWarnings: !0,
                expensiveChecks: !1
            };
        this.unwrapPromises = function(a) {
            return D(a) ? (c.unwrapPromises = !!a, this) : c.unwrapPromises
        }, this.logPromiseWarnings = function(a) {
            return D(a) ? (c.logPromiseWarnings = a, this) : c.logPromiseWarnings
        }, this.$get = ["$filter", "$sniffer", "$log", function(d, e, f) {
            c.csp = e.csp;
            var g = {
                csp: c.csp,
                unwrapPromises: c.unwrapPromises,
                logPromiseWarnings: c.logPromiseWarnings,
                expensiveChecks: !0
            };
            return ya = function(a) {
                    c.logPromiseWarnings && !Ec.hasOwnProperty(a) && (Ec[a] = !0, f.warn("[$parse] Promise found in the expression `" + a + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
                },
                function(e, f) {
                    var m;
                    switch (typeof e) {
                        case "string":
                            var l = f ? a : b;
                            if (l.hasOwnProperty(e)) return l[e];
                            m = f ? g : c;
                            var n = new Ub(m);
                            return m = new gb(n, d, m).parse(e), "hasOwnProperty" !== e && (l[e] = m), m;
                        case "function":
                            return e;
                        default:
                            return v
                    }
                }
        }]
    }

    function Zd() {
        this.$get = ["$rootScope", "$exceptionHandler", function(b, a) {
            return De(function(a) {
                b.$evalAsync(a)
            }, a)
        }]
    }

    function De(b, a) {
        function c(a) {
            return a
        }

        function d(a) {
            return g(a)
        }
        var e = function() {
                var m, l, g = [];
                return l = {
                    resolve: function(a) {
                        if (g) {
                            var c = g;
                            g = u, m = f(a), c.length && b(function() {
                                for (var a, b = 0, d = c.length; d > b; b++) a = c[b], m.then(a[0], a[1], a[2])
                            })
                        }
                    },
                    reject: function(a) {
                        l.resolve(h(a))
                    },
                    notify: function(a) {
                        if (g) {
                            var c = g;
                            g.length && b(function() {
                                for (var b, d = 0, e = c.length; e > d; d++) b = c[d], b[2](a)
                            })
                        }
                    },
                    promise: {
                        then: function(b, f, h) {
                            var l = e(),
                                J = function(d) {
                                    try {
                                        l.resolve((N(b) ? b : c)(d))
                                    } catch (e) {
                                        l.reject(e), a(e)
                                    }
                                },
                                w = function(b) {
                                    try {
                                        l.resolve((N(f) ? f : d)(b))
                                    } catch (c) {
                                        l.reject(c), a(c)
                                    }
                                },
                                t = function(b) {
                                    try {
                                        l.notify((N(h) ? h : c)(b))
                                    } catch (d) {
                                        a(d)
                                    }
                                };
                            return g ? g.push([J, w, t]) : m.then(J, w, t), l.promise
                        },
                        "catch": function(a) {
                            return this.then(null, a)
                        },
                        "finally": function(a) {
                            function b(a, c) {
                                var d = e();
                                return c ? d.resolve(a) : d.reject(a), d.promise
                            }

                            function d(e, f) {
                                var g = null;
                                try {
                                    g = (a || c)()
                                } catch (h) {
                                    return b(h, !1)
                                }
                                return g && N(g.then) ? g.then(function() {
                                    return b(e, f)
                                }, function(a) {
                                    return b(a, !1)
                                }) : b(e, f)
                            }
                            return this.then(function(a) {
                                return d(a, !0)
                            }, function(a) {
                                return d(a, !1)
                            })
                        }
                    }
                }
            },
            f = function(a) {
                return a && N(a.then) ? a : {
                    then: function(c) {
                        var d = e();
                        return b(function() {
                            d.resolve(c(a))
                        }), d.promise
                    }
                }
            },
            g = function(a) {
                var b = e();
                return b.reject(a), b.promise
            },
            h = function(c) {
                return {
                    then: function(f, g) {
                        var h = e();
                        return b(function() {
                            try {
                                h.resolve((N(g) ? g : d)(c))
                            } catch (b) {
                                h.reject(b), a(b)
                            }
                        }), h.promise
                    }
                }
            };
        return {
            defer: e,
            reject: g,
            when: function(h, m, l, n) {
                var p, q = e(),
                    s = function(b) {
                        try {
                            return (N(m) ? m : c)(b)
                        } catch (d) {
                            return a(d), g(d)
                        }
                    },
                    J = function(b) {
                        try {
                            return (N(l) ? l : d)(b)
                        } catch (c) {
                            return a(c), g(c)
                        }
                    },
                    w = function(b) {
                        try {
                            return (N(n) ? n : c)(b)
                        } catch (d) {
                            a(d)
                        }
                    };
                return b(function() {
                    f(h).then(function(a) {
                        p || (p = !0, q.resolve(f(a).then(s, J, w)))
                    }, function(a) {
                        p || (p = !0, q.resolve(J(a)))
                    }, function(a) {
                        p || q.notify(w(a))
                    })
                }), q.promise
            },
            all: function(a) {
                var b = e(),
                    c = 0,
                    d = L(a) ? [] : {};
                return r(a, function(a, e) {
                    c++, f(a).then(function(a) {
                        d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
                    }, function(a) {
                        d.hasOwnProperty(e) || b.reject(a)
                    })
                }), 0 === c && b.resolve(d), b.promise
            }
        }
    }

    function fe() {
        this.$get = ["$window", "$timeout", function(b, a) {
            var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame,
                d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame,
                e = !!c,
                f = e ? function(a) {
                    var b = c(a);
                    return function() {
                        d(b)
                    }
                } : function(b) {
                    var c = a(b, 16.66, !1);
                    return function() {
                        a.cancel(c)
                    }
                };
            return f.supported = e, f
        }]
    }

    function Yd() {
        var b = 10,
            a = z("$rootScope"),
            c = null;
        this.digestTtl = function(a) {
            return arguments.length && (b = a), b
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(d, e, f, g) {
            function h() {
                this.$id = ib(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
            }

            function k(b) {
                if (q.$$phase) throw a("inprog", q.$$phase);
                q.$$phase = b
            }

            function m(a, b) {
                var c = f(a);
                return Ya(c, b), c
            }

            function l(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent)
            }

            function n() {}
            h.prototype = {
                constructor: h,
                $new: function(a) {
                    return a ? (a = new h, a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (this.$$childScopeClass || (this.$$childScopeClass = function() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$id = ib(), this.$$childScopeClass = null
                    }, this.$$childScopeClass.prototype = this), a = new this.$$childScopeClass), a["this"] = a, a.$parent = this, a.$$prevSibling = this.$$childTail, this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a, a
                },
                $watch: function(a, b, d) {
                    var e = m(a, "watch"),
                        f = this.$$watchers,
                        g = {
                            fn: b,
                            last: n,
                            get: e,
                            exp: a,
                            eq: !!d
                        };
                    if (c = null, !N(b)) {
                        var h = m(b || v, "listener");
                        g.fn = function(a, b, c) {
                            h(c)
                        }
                    }
                    if ("string" == typeof a && e.constant) {
                        var k = g.fn;
                        g.fn = function(a, b, c) {
                            k.call(this, a, b, c), Ua(f, g)
                        }
                    }
                    return f || (f = this.$$watchers = []), f.unshift(g),
                        function() {
                            Ua(f, g), c = null
                        }
                },
                $watchCollection: function(a, b) {
                    var d, e, g, c = this,
                        h = 1 < b.length,
                        k = 0,
                        l = f(a),
                        m = [],
                        n = {},
                        q = !0,
                        r = 0;
                    return this.$watch(function() {
                        d = l(c);
                        var a, b, f;
                        if (T(d))
                            if (Sa(d))
                                for (e !== m && (e = m, r = e.length = 0, k++), a = d.length, r !== a && (k++, e.length = r = a), b = 0; a > b; b++) f = e[b] !== e[b] && d[b] !== d[b], f || e[b] === d[b] || (k++, e[b] = d[b]);
                            else {
                                e !== n && (e = n = {}, r = 0, k++), a = 0;
                                for (b in d) d.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? (f = e[b] !== e[b] && d[b] !== d[b], f || e[b] === d[b] || (k++, e[b] = d[b])) : (r++, e[b] = d[b], k++));
                                if (r > a)
                                    for (b in k++, e) e.hasOwnProperty(b) && !d.hasOwnProperty(b) && (r--, delete e[b])
                            } else e !== d && (e = d, k++);
                        return k
                    }, function() {
                        if (q ? (q = !1, b(d, d, c)) : b(d, g, c), h)
                            if (T(d))
                                if (Sa(d)) {
                                    g = Array(d.length);
                                    for (var a = 0; a < d.length; a++) g[a] = d[a]
                                } else
                                    for (a in g = {}, d) lb.call(d, a) && (g[a] = d[a]);
                        else g = d
                    })
                },
                $digest: function() {
                    var d, f, h, l, K, B, O, A, P, C, m = this.$$asyncQueue,
                        r = this.$$postDigestQueue,
                        u = b,
                        M = [];
                    k("$digest"), g.$$checkUrlChange(), c = null;
                    do {
                        for (B = !1, O = this; m.length;) {
                            try {
                                C = m.shift(), C.scope.$eval(C.expression)
                            } catch (I) {
                                q.$$phase = null, e(I)
                            }
                            c = null
                        }
                        a: do {
                            if (l = O.$$watchers)
                                for (K = l.length; K--;) try {
                                    if (d = l[K])
                                        if ((f = d.get(O)) === (h = d.last) || (d.eq ? Ca(f, h) : "number" == typeof f && "number" == typeof h && isNaN(f) && isNaN(h))) {
                                            if (d === c) {
                                                B = !1;
                                                break a
                                            }
                                        } else B = !0, c = d, d.last = d.eq ? Ka(f, null) : f, d.fn(f, h === n ? f : h, O), 5 > u && (A = 4 - u, M[A] || (M[A] = []), P = N(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp, P += "; newVal: " + oa(f) + "; oldVal: " + oa(h), M[A].push(P))
                                } catch (D) {
                                    q.$$phase = null, e(D)
                                }
                            if (!(l = O.$$childHead || O !== this && O.$$nextSibling))
                                for (; O !== this && !(l = O.$$nextSibling);) O = O.$parent
                        } while (O = l);
                        if ((B || m.length) && !u--) throw q.$$phase = null, a("infdig", b, oa(M))
                    } while (B || m.length);
                    for (q.$$phase = null; r.length;) try {
                        r.shift()()
                    } catch (x) {
                        e(x)
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this !== q && (r(this.$$listenerCount, Bb(null, l, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = v, this.$on = this.$watch = function() {
                            return v
                        })
                    }
                },
                $eval: function(a, b) {
                    return f(a)(this, b)
                },
                $evalAsync: function(a) {
                    q.$$phase || q.$$asyncQueue.length || g.defer(function() {
                        q.$$asyncQueue.length && q.$digest()
                    }), this.$$asyncQueue.push({
                        scope: this,
                        expression: a
                    })
                },
                $$postDigest: function(a) {
                    this.$$postDigestQueue.push(a)
                },
                $apply: function(a) {
                    try {
                        return k("$apply"), this.$eval(a)
                    } catch (b) {
                        e(b)
                    } finally {
                        q.$$phase = null;
                        try {
                            q.$digest()
                        } catch (c) {
                            throw e(c), c
                        }
                    }
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []), c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        var d = Ta(c, b); - 1 !== d && (c[d] = null, l(e, 1, a))
                    }
                },
                $emit: function(a) {
                    var d, l, m, c = [],
                        f = this,
                        g = !1,
                        h = {
                            name: a,
                            targetScope: f,
                            stopPropagation: function() {
                                g = !0
                            },
                            preventDefault: function() {
                                h.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        },
                        k = [h].concat(wa.call(arguments, 1));
                    do {
                        for (d = f.$$listeners[a] || c, h.currentScope = f, l = 0, m = d.length; m > l; l++)
                            if (d[l]) try {
                                d[l].apply(null, k)
                            } catch (n) {
                                e(n)
                            } else d.splice(l, 1), l--, m--;
                        if (g) break;
                        f = f.$parent
                    } while (f);
                    return h
                },
                $broadcast: function(a) {
                    for (var h, k, c = this, d = this, f = {
                            name: a,
                            targetScope: this,
                            preventDefault: function() {
                                f.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        }, g = [f].concat(wa.call(arguments, 1)); c = d;) {
                        for (f.currentScope = c, d = c.$$listeners[a] || [], h = 0, k = d.length; k > h; h++)
                            if (d[h]) try {
                                d[h].apply(null, g)
                            } catch (l) {
                                e(l)
                            } else d.splice(h, 1), h--, k--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling))
                            for (; c !== this && !(d = c.$$nextSibling);) c = c.$parent
                    }
                    return f
                }
            };
            var q = new h;
            return q
        }]
    }

    function bd() {
        var b = /^\s*(https?|ftp|mailto|tel|file):/,
            a = /^\s*((https?|ftp|file):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(a) {
            return D(a) ? (b = a, this) : b
        }, this.imgSrcSanitizationWhitelist = function(b) {
            return D(b) ? (a = b, this) : a
        }, this.$get = function() {
            return function(c, d) {
                var f, e = d ? a : b;
                return R && !(R >= 8) || (f = xa(c).href, "" === f || f.match(e)) ? c : "unsafe:" + f
            }
        }
    }

    function Ee(b) {
        if ("self" === b) return b;
        if (G(b)) {
            if (-1 < b.indexOf("***")) throw za("iwcard", b);
            return b = b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), RegExp("^" + b + "$")
        }
        if (kb(b)) return RegExp("^" + b.source + "$");
        throw za("imatcher")
    }

    function Fc(b) {
        var a = [];
        return D(b) && r(b, function(b) {
            a.push(Ee(b))
        }), a
    }

    function ae() {
        this.SCE_CONTEXTS = fa;
        var b = ["self"],
            a = [];
        this.resourceUrlWhitelist = function(a) {
            return arguments.length && (b = Fc(a)), b
        }, this.resourceUrlBlacklist = function(b) {
            return arguments.length && (a = Fc(b)), a
        }, this.$get = ["$injector", function(c) {
            function d(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a
                    }
                };
                return a && (b.prototype = new a), b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue()
                }, b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString()
                }, b
            }
            var e = function() {
                throw za("unsafe")
            };
            c.has("$sanitize") && (e = c.get("$sanitize"));
            var f = d(),
                g = {};
            return g[fa.HTML] = d(f), g[fa.CSS] = d(f), g[fa.URL] = d(f), g[fa.JS] = d(f), g[fa.RESOURCE_URL] = d(g[fa.URL]), {
                trustAs: function(a, b) {
                    var c = g.hasOwnProperty(a) ? g[a] : null;
                    if (!c) throw za("icontext", a, b);
                    if (null === b || b === u || "" === b) return b;
                    if ("string" != typeof b) throw za("itype", a);
                    return new c(b)
                },
                getTrusted: function(c, d) {
                    if (null === d || d === u || "" === d) return d;
                    var f = g.hasOwnProperty(c) ? g[c] : null;
                    if (f && d instanceof f) return d.$$unwrapTrustedValue();
                    if (c === fa.RESOURCE_URL) {
                        var l, n, f = xa(d.toString()),
                            q = !1;
                        for (l = 0, n = b.length; n > l; l++)
                            if ("self" === b[l] ? Pb(f) : b[l].exec(f.href)) {
                                q = !0;
                                break
                            }
                        if (q)
                            for (l = 0, n = a.length; n > l; l++)
                                if ("self" === a[l] ? Pb(f) : a[l].exec(f.href)) {
                                    q = !1;
                                    break
                                }
                        if (q) return d;
                        throw za("insecurl", d.toString())
                    }
                    if (c === fa.HTML) return e(d);
                    throw za("unsafe")
                },
                valueOf: function(a) {
                    return a instanceof f ? a.$$unwrapTrustedValue() : a
                }
            }
        }]
    }

    function $d() {
        var b = !0;
        this.enabled = function(a) {
            return arguments.length && (b = !!a), b
        }, this.$get = ["$parse", "$sniffer", "$sceDelegate", function(a, c, d) {
            if (b && c.msie && 8 > c.msieDocumentMode) throw za("iequirks");
            var e = ha(fa);
            e.isEnabled = function() {
                return b
            }, e.trustAs = d.trustAs, e.getTrusted = d.getTrusted, e.valueOf = d.valueOf, b || (e.trustAs = e.getTrusted = function(a, b) {
                return b
            }, e.valueOf = ga), e.parseAs = function(b, c) {
                var d = a(c);
                return d.literal && d.constant ? d : function(a, c) {
                    return e.getTrusted(b, d(a, c))
                }
            };
            var f = e.parseAs,
                g = e.getTrusted,
                h = e.trustAs;
            return r(fa, function(a, b) {
                var c = x(b);
                e[ab("parse_as_" + c)] = function(b) {
                    return f(a, b)
                }, e[ab("get_trusted_" + c)] = function(b) {
                    return g(a, b)
                }, e[ab("trust_as_" + c)] = function(b) {
                    return h(a, b)
                }
            }), e
        }]
    }

    function be() {
        this.$get = ["$window", "$document", function(b, a) {
            var h, c = {},
                d = U((/android (\d+)/.exec(x((b.navigator || {}).userAgent)) || [])[1]),
                e = /Boxee/i.test((b.navigator || {}).userAgent),
                f = a[0] || {},
                g = f.documentMode,
                k = /^(Moz|webkit|O|ms)(?=[A-Z])/,
                m = f.body && f.body.style,
                l = !1,
                n = !1;
            if (m) {
                for (var q in m)
                    if (l = k.exec(q)) {
                        h = l[0], h = h.substr(0, 1).toUpperCase() + h.substr(1);
                        break
                    }
                h || (h = "WebkitOpacity" in m && "webkit"), l = !!("transition" in m || h + "Transition" in m), n = !!("animation" in m || h + "Animation" in m), !d || l && n || (l = G(f.body.style.webkitTransition), n = G(f.body.style.webkitAnimation))
            }
            return {
                history: !(!b.history || !b.history.pushState || 4 > d || e),
                hashchange: "onhashchange" in b && (!g || g > 7),
                hasEvent: function(a) {
                    if ("input" == a && 9 == R) return !1;
                    if (F(c[a])) {
                        var b = f.createElement("div");
                        c[a] = "on" + a in b
                    }
                    return c[a]
                },
                csp: Za(),
                vendorPrefix: h,
                transitions: l,
                animations: n,
                android: d,
                msie: R,
                msieDocumentMode: g
            }
        }]
    }

    function de() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function(b, a, c, d) {
            function e(e, h, k) {
                var m = c.defer(),
                    l = m.promise,
                    n = D(k) && !k;
                return h = a.defer(function() {
                    try {
                        m.resolve(e())
                    } catch (a) {
                        m.reject(a), d(a)
                    } finally {
                        delete f[l.$$timeoutId]
                    }
                    n || b.$apply()
                }, h), l.$$timeoutId = h, f[h] = m, l
            }
            var f = {};
            return e.cancel = function(b) {
                return b && b.$$timeoutId in f ? (f[b.$$timeoutId].reject("canceled"), delete f[b.$$timeoutId], a.defer.cancel(b.$$timeoutId)) : !1
            }, e
        }]
    }

    function xa(b) {
        var c = b;
        return R && (Y.setAttribute("href", c), c = Y.href), Y.setAttribute("href", c), {
            href: Y.href,
            protocol: Y.protocol ? Y.protocol.replace(/:$/, "") : "",
            host: Y.host,
            search: Y.search ? Y.search.replace(/^\?/, "") : "",
            hash: Y.hash ? Y.hash.replace(/^#/, "") : "",
            hostname: Y.hostname,
            port: Y.port,
            pathname: "/" === Y.pathname.charAt(0) ? Y.pathname : "/" + Y.pathname
        }
    }

    function Pb(b) {
        return b = G(b) ? xa(b) : b, b.protocol === Gc.protocol && b.host === Gc.host
    }

    function ee() {
        this.$get = aa(W)
    }

    function kc(b) {
        function a(d, e) {
            if (T(d)) {
                var f = {};
                return r(d, function(b, c) {
                    f[c] = a(c, b)
                }), f
            }
            return b.factory(d + c, e)
        }
        var c = "Filter";
        this.register = a, this.$get = ["$injector", function(a) {
            return function(b) {
                return a.get(b + c)
            }
        }], a("currency", Hc), a("date", Ic), a("filter", Fe), a("json", Ge), a("limitTo", He), a("lowercase", Ie), a("number", Jc), a("orderBy", Kc), a("uppercase", Je)
    }

    function Fe() {
        return function(b, a, c) {
            if (!L(b)) return b;
            var d = typeof c,
                e = [];
            e.check = function(a) {
                for (var b = 0; b < e.length; b++)
                    if (!e[b](a)) return !1;
                return !0
            }, "function" !== d && (c = "boolean" === d && c ? function(a, b) {
                return Xa.equals(a, b)
            } : function(a, b) {
                if (a && b && "object" == typeof a && "object" == typeof b) {
                    for (var d in a)
                        if ("$" !== d.charAt(0) && lb.call(a, d) && c(a[d], b[d])) return !0;
                    return !1
                }
                return b = ("" + b).toLowerCase(), -1 < ("" + a).toLowerCase().indexOf(b)
            });
            var f = function(a, b) {
                if ("string" == typeof b && "!" === b.charAt(0)) return !f(a, b.substr(1));
                switch (typeof a) {
                    case "boolean":
                    case "number":
                    case "string":
                        return c(a, b);
                    case "object":
                        switch (typeof b) {
                            case "object":
                                return c(a, b);
                            default:
                                for (var d in a)
                                    if ("$" !== d.charAt(0) && f(a[d], b)) return !0
                        }
                        return !1;
                    case "array":
                        for (d = 0; d < a.length; d++)
                            if (f(a[d], b)) return !0;
                        return !1;
                    default:
                        return !1
                }
            };
            switch (typeof a) {
                case "boolean":
                case "number":
                case "string":
                    a = {
                        $: a
                    };
                case "object":
                    for (var g in a)(function(b) {
                        "undefined" != typeof a[b] && e.push(function(c) {
                            return f("$" == b ? c : c && c[b], a[b])
                        })
                    })(g);
                    break;
                case "function":
                    e.push(a);
                    break;
                default:
                    return b
            }
            for (d = [], g = 0; g < b.length; g++) {
                var h = b[g];
                e.check(h) && d.push(h)
            }
            return d
        }
    }

    function Hc(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            return F(d) && (d = a.CURRENCY_SYM), Lc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d)
        }
    }

    function Jc(b) {
        var a = b.NUMBER_FORMATS;
        return function(b, d) {
            return Lc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d)
        }
    }

    function Lc(b, a, c, d, e) {
        if (null == b || !isFinite(b) || T(b)) return "";
        var f = 0 > b;
        b = Math.abs(b);
        var g = b + "",
            h = "",
            k = [],
            m = !1;
        if (-1 !== g.indexOf("e")) {
            var l = g.match(/([\d\.]+)e(-?)(\d+)/);
            l && "-" == l[2] && l[3] > e + 1 ? (g = "0", b = 0) : (h = g, m = !0)
        }
        if (m) e > 0 && b > -1 && 1 > b && (h = b.toFixed(e));
        else {
            g = (g.split(Mc)[1] || "").length, F(e) && (e = Math.min(Math.max(a.minFrac, g), a.maxFrac)), b = +(Math.round(+(b.toString() + "e" + e)).toString() + "e" + -e), 0 === b && (f = !1), b = ("" + b).split(Mc), g = b[0], b = b[1] || "";
            var l = 0,
                n = a.lgSize,
                q = a.gSize;
            if (g.length >= n + q)
                for (l = g.length - n, m = 0; l > m; m++) 0 === (l - m) % q && 0 !== m && (h += c), h += g.charAt(m);
            for (m = l; m < g.length; m++) 0 === (g.length - m) % n && 0 !== m && (h += c), h += g.charAt(m);
            for (; b.length < e;) b += "0";
            e && "0" !== e && (h += d + b.substr(0, e))
        }
        return k.push(f ? a.negPre : a.posPre), k.push(h), k.push(f ? a.negSuf : a.posSuf), k.join("")
    }

    function Vb(b, a, c) {
        var d = "";
        for (0 > b && (d = "-", b = -b), b = "" + b; b.length < a;) b = "0" + b;
        return c && (b = b.substr(b.length - a)), d + b
    }

    function Z(b, a, c, d) {
        return c = c || 0,
            function(e) {
                return e = e["get" + b](), (c > 0 || e > -c) && (e += c), 0 === e && -12 == c && (e = 12), Vb(e, a, d)
            }
    }

    function vb(b, a) {
        return function(c, d) {
            var e = c["get" + b](),
                f = La(a ? "SHORT" + b : b);
            return d[f][e]
        }
    }

    function Ic(b) {
        function a(a) {
            var b;
            if (b = a.match(c)) {
                a = new Date(0);
                var f = 0,
                    g = 0,
                    h = b[8] ? a.setUTCFullYear : a.setFullYear,
                    k = b[8] ? a.setUTCHours : a.setHours;
                b[9] && (f = U(b[9] + b[10]), g = U(b[9] + b[11])), h.call(a, U(b[1]), U(b[2]) - 1, U(b[3])), f = U(b[4] || 0) - f, g = U(b[5] || 0) - g, h = U(b[6] || 0), b = Math.round(1e3 * parseFloat("0." + (b[7] || 0))), k.call(a, f, g, h, b)
            }
            return a
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, e) {
            var h, k, f = "",
                g = [];
            if (e = e || "mediumDate", e = b.DATETIME_FORMATS[e] || e, G(c) && (c = Ke.test(c) ? U(c) : a(c)), jb(c) && (c = new Date(c)), !va(c)) return c;
            for (; e;)(k = Le.exec(e)) ? (g = g.concat(wa.call(k, 1)), e = g.pop()) : (g.push(e), e = null);
            return r(g, function(a) {
                h = Me[a], f += h ? h(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), f
        }
    }

    function Ge() {
        return function(b) {
            return oa(b, !0)
        }
    }

    function He() {
        return function(b, a) {
            if (!L(b) && !G(b)) return b;
            if (a = 1 / 0 === Math.abs(Number(a)) ? Number(a) : U(a), G(b)) return a ? a >= 0 ? b.slice(0, a) : b.slice(a, b.length) : "";
            var d, e, c = [];
            for (a > b.length ? a = b.length : a < -b.length && (a = -b.length), a > 0 ? (d = 0, e = a) : (d = b.length + a, e = b.length); e > d; d++) c.push(b[d]);
            return c
        }
    }

    function Kc(b) {
        return function(a, c, d) {
            function e(a, b) {
                return Wa(b) ? function(b, c) {
                    return a(c, b)
                } : a
            }

            function f(a, b) {
                var c = typeof a,
                    d = typeof b;
                return c == d ? (va(a) && va(b) && (a = a.valueOf(), b = b.valueOf()), "string" == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
            }
            return Sa(a) ? (c = L(c) ? c : [c], 0 === c.length && (c = ["+"]), c = Uc(c, function(a) {
                var c = !1,
                    d = a || ga;
                if (G(a)) {
                    if (("+" == a.charAt(0) || "-" == a.charAt(0)) && (c = "-" == a.charAt(0), a = a.substring(1)), "" === a) return e(function(a, b) {
                        return f(a, b)
                    }, c);
                    if (d = b(a), d.constant) {
                        var m = d();
                        return e(function(a, b) {
                            return f(a[m], b[m])
                        }, c)
                    }
                }
                return e(function(a, b) {
                    return f(d(a), d(b))
                }, c)
            }), wa.call(a).sort(e(function(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e) return e
                }
                return 0
            }, d))) : a
        }
    }

    function Aa(b) {
        return N(b) && (b = {
            link: b
        }), b.restrict = b.restrict || "AC", aa(b)
    }

    function Nc(b, a, c, d) {
        function e(a, c) {
            c = c ? "-" + nb(c, "-") : "", d.setClass(b, (a ? wb : xb) + c, (a ? xb : wb) + c)
        }
        var f = this,
            g = b.parent().controller("form") || yb,
            h = 0,
            k = f.$error = {},
            m = [];
        f.$name = a.name || a.ngForm, f.$dirty = !1, f.$pristine = !0, f.$valid = !0, f.$invalid = !1, g.$addControl(f), b.addClass(Ra), e(!0), f.$addControl = function(a) {
            Ea(a.$name, "input"), m.push(a), a.$name && (f[a.$name] = a)
        }, f.$removeControl = function(a) {
            a.$name && f[a.$name] === a && delete f[a.$name], r(k, function(b, c) {
                f.$setValidity(c, !0, a)
            }), Ua(m, a)
        }, f.$setValidity = function(a, b, c) {
            var d = k[a];
            if (b) d && (Ua(d, c), d.length || (h--, h || (e(b), f.$valid = !0, f.$invalid = !1), k[a] = !1, e(!0, a), g.$setValidity(a, !0, f)));
            else {
                if (h || e(b), d) {
                    if (-1 != Ta(d, c)) return
                } else k[a] = d = [], h++, e(!1, a), g.$setValidity(a, !1, f);
                d.push(c), f.$valid = !1, f.$invalid = !0
            }
        }, f.$setDirty = function() {
            d.removeClass(b, Ra), d.addClass(b, zb), f.$dirty = !0, f.$pristine = !1, g.$setDirty()
        }, f.$setPristine = function() {
            d.removeClass(b, zb), d.addClass(b, Ra), f.$dirty = !1, f.$pristine = !0, r(m, function(a) {
                a.$setPristine()
            })
        }
    }

    function ua(b, a, c, d) {
        return b.$setValidity(a, c), c ? d : u
    }

    function Oc(b, a) {
        var c, d;
        if (a)
            for (c = 0; c < a.length; ++c)
                if (d = a[c], b[d]) return !0;
        return !1
    }

    function Ne(b, a, c, d, e) {
        T(e) && (b.$$hasNativeValidators = !0, b.$parsers.push(function(f) {
            return b.$error[a] || Oc(e, d) || !Oc(e, c) ? f : void b.$setValidity(a, !1)
        }))
    }

    function Ab(b, a, c, d, e, f) {
        var g = a.prop(Oe),
            h = a[0].placeholder,
            k = {},
            m = x(a[0].type);
        if (d.$$validityState = g, !e.android) {
            var l = !1;
            a.on("compositionstart", function() {
                l = !0
            }), a.on("compositionend", function() {
                l = !1, n()
            })
        }
        var n = function(e) {
            if (!l) {
                var f = a.val();
                R && "input" === (e || k).type && a[0].placeholder !== h ? h = a[0].placeholder : ("password" !== m && Wa(c.ngTrim || "T") && (f = $(f)), e = g && d.$$hasNativeValidators, (d.$viewValue !== f || "" === f && e) && (b.$root.$$phase ? d.$setViewValue(f) : b.$apply(function() {
                    d.$setViewValue(f)
                })))
            }
        };
        if (e.hasEvent("input")) a.on("input", n);
        else {
            var q, p = function() {
                q || (q = f.defer(function() {
                    n(), q = null
                }))
            };
            a.on("keydown", function(a) {
                a = a.keyCode, 91 === a || a > 15 && 19 > a || a >= 37 && 40 >= a || p()
            }), e.hasEvent("paste") && a.on("paste cut", p)
        }
        a.on("change", n), d.$render = function() {
            a.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue)
        };
        var s = c.ngPattern;
        if (s && ((e = s.match(/^\/(.*)\/([gim]*)$/)) ? (s = RegExp(e[1], e[2]), e = function(a) {
                return ua(d, "pattern", d.$isEmpty(a) || s.test(a), a)
            }) : e = function(c) {
                var e = b.$eval(s);
                if (!e || !e.test) throw z("ngPattern")("noregexp", s, e, ia(a));
                return ua(d, "pattern", d.$isEmpty(c) || e.test(c), c)
            }, d.$formatters.push(e), d.$parsers.push(e)), c.ngMinlength) {
            var r = U(c.ngMinlength);
            e = function(a) {
                return ua(d, "minlength", d.$isEmpty(a) || a.length >= r, a)
            }, d.$parsers.push(e), d.$formatters.push(e)
        }
        if (c.ngMaxlength) {
            var w = U(c.ngMaxlength);
            e = function(a) {
                return ua(d, "maxlength", d.$isEmpty(a) || a.length <= w, a)
            }, d.$parsers.push(e), d.$formatters.push(e)
        }
    }

    function Wb(b, a) {
        return b = "ngClass" + b, ["$animate", function(c) {
            function d(a, b) {
                var c = [],
                    d = 0;
                a: for (; d < a.length; d++) {
                    for (var e = a[d], l = 0; l < b.length; l++)
                        if (e == b[l]) continue a;
                    c.push(e)
                }
                return c
            }

            function e(a) {
                if (!L(a)) {
                    if (G(a)) return a.split(" ");
                    if (T(a)) {
                        var b = [];
                        return r(a, function(a, c) {
                            a && (b = b.concat(c.split(" ")))
                        }), b
                    }
                }
                return a
            }
            return {
                restrict: "AC",
                link: function(f, g, h) {
                    function k(a, b) {
                        var c = g.data("$classCounts") || {},
                            d = [];
                        return r(a, function(a) {
                            (b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && d.push(a))
                        }), g.data("$classCounts", c), d.join(" ")
                    }

                    function m(b) {
                        if (!0 === a || f.$index % 2 === a) {
                            var m = e(b || []);
                            if (l) {
                                if (!Ca(b, l)) {
                                    var s = e(l),
                                        p = d(m, s),
                                        m = d(s, m),
                                        m = k(m, -1),
                                        p = k(p, 1);
                                    0 === p.length ? c.removeClass(g, m) : 0 === m.length ? c.addClass(g, p) : c.setClass(g, p, m)
                                }
                            } else {
                                var p = k(m, 1);
                                h.$addClass(p)
                            }
                        }
                        l = ha(b)
                    }
                    var l;
                    f.$watch(h[b], m, !0), h.$observe("class", function() {
                        m(f.$eval(h[b]))
                    }), "ngClass" !== b && f.$watch("$index", function(c, d) {
                        var g = 1 & c;
                        if (g !== (1 & d)) {
                            var l = e(f.$eval(h[b]));
                            g === a ? (g = k(l, 1), h.$addClass(g)) : (g = k(l, -1), h.$removeClass(g))
                        }
                    })
                }
            }
        }]
    }
    var R, A, Fa, $a, Pa, Oe = "validity",
        x = function(b) {
            return G(b) ? b.toLowerCase() : b
        },
        lb = Object.prototype.hasOwnProperty,
        La = function(b) {
            return G(b) ? b.toUpperCase() : b
        },
        wa = [].slice,
        Pe = [].push,
        Ba = Object.prototype.toString,
        Va = z("ng"),
        Xa = W.angular || (W.angular = {}),
        na = ["0", "0", "0"];
    R = U((/msie (\d+)/.exec(x(navigator.userAgent)) || [])[1]), isNaN(R) && (R = U((/trident\/.*; rv:(\d+)/.exec(x(navigator.userAgent)) || [])[1])), v.$inject = [], ga.$inject = [];
    var L = function() {
            return N(Array.isArray) ? Array.isArray : function(b) {
                return "[object Array]" === Ba.call(b)
            }
        }(),
        $ = function() {
            return String.prototype.trim ? function(b) {
                return G(b) ? b.trim() : b
            } : function(b) {
                return G(b) ? b.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : b
            }
        }();
    Pa = 9 > R ? function(b) {
        return b = b.nodeName ? b : b[0], b.scopeName && "HTML" != b.scopeName ? La(b.scopeName + ":" + b.nodeName) : b.nodeName
    } : function(b) {
        return b.nodeName ? b.nodeName : b[0].nodeName
    };
    var Za = function() {
            if (D(Za.isActive_)) return Za.isActive_;
            var b = !(!X.querySelector("[ng-csp]") && !X.querySelector("[data-ng-csp]"));
            if (!b) try {
                new Function("")
            } catch (a) {
                b = !0
            }
            return Za.isActive_ = b
        },
        Xc = /[A-Z]/g,
        $c = {
            full: "1.2.28",
            major: 1,
            minor: 2,
            dot: 28,
            codeName: "finnish-disembarkation"
        };
    S.expando = "ng339";
    var cb = S.cache = {},
        me = 1,
        sb = W.document.addEventListener ? function(b, a, c) {
            b.addEventListener(a, c, !1)
        } : function(b, a, c) {
            b.attachEvent("on" + a, c)
        },
        bb = W.document.removeEventListener ? function(b, a, c) {
            b.removeEventListener(a, c, !1)
        } : function(b, a, c) {
            b.detachEvent("on" + a, c)
        };
    S._data = function(b) {
        return this.cache[b[this.expando]] || {}
    };
    var he = /([\:\-\_]+(.))/g,
        ie = /^moz([A-Z])/,
        Hb = z("jqLite"),
        je = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Ib = /<|&#?\w+;/,
        ke = /<([\w:]+)/,
        le = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        da = {
            option: [1, '<select multiple="multiple">', "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    da.optgroup = da.option, da.tbody = da.tfoot = da.colgroup = da.caption = da.thead, da.th = da.td;
    var Oa = S.prototype = {
            ready: function(b) {
                function a() {
                    c || (c = !0, b())
                }
                var c = !1;
                "complete" === X.readyState ? setTimeout(a) : (this.on("DOMContentLoaded", a), S(W).on("load", a))
            },
            toString: function() {
                var b = [];
                return r(this, function(a) {
                    b.push("" + a)
                }), "[" + b.join(", ") + "]"
            },
            eq: function(b) {
                return A(b >= 0 ? this[b] : this[this.length + b])
            },
            length: 0,
            push: Pe,
            sort: [].sort,
            splice: [].splice
        },
        rb = {};
    r("multiple selected checked disabled readOnly required open".split(" "), function(b) {
        rb[x(b)] = b
    });
    var pc = {};
    r("input select option textarea button form details".split(" "), function(b) {
        pc[La(b)] = !0
    }), r({
        data: Mb,
        removeData: Lb
    }, function(b, a) {
        S[a] = b
    }), r({
        data: Mb,
        inheritedData: qb,
        scope: function(b) {
            return A.data(b, "$scope") || qb(b.parentNode || b, ["$isolateScope", "$scope"])
        },
        isolateScope: function(b) {
            return A.data(b, "$isolateScope") || A.data(b, "$isolateScopeNoTemplate")
        },
        controller: mc,
        injector: function(b) {
            return qb(b, "$injector")
        },
        removeAttr: function(b, a) {
            b.removeAttribute(a)
        },
        hasClass: Nb,
        css: function(b, a, c) {
            if (a = ab(a), !D(c)) {
                var d;
                return 8 >= R && (d = b.currentStyle && b.currentStyle[a], "" === d && (d = "auto")), d = d || b.style[a], 8 >= R && (d = "" === d ? u : d), d
            }
            b.style[a] = c
        },
        attr: function(b, a, c) {
            var d = x(a);
            if (rb[d]) {
                if (!D(c)) return b[a] || (b.attributes.getNamedItem(a) || v).specified ? d : u;
                c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d))
            } else if (D(c)) b.setAttribute(a, c);
            else if (b.getAttribute) return b = b.getAttribute(a, 2), null === b ? u : b
        },
        prop: function(b, a, c) {
            return D(c) ? void(b[a] = c) : b[a]
        },
        text: function() {
            function b(b, d) {
                var e = a[b.nodeType];
                return F(d) ? e ? b[e] : "" : void(b[e] = d)
            }
            var a = [];
            return 9 > R ? (a[1] = "innerText", a[3] = "nodeValue") : a[1] = a[3] = "textContent", b.$dv = "", b
        }(),
        val: function(b, a) {
            if (F(a)) {
                if ("SELECT" === Pa(b) && b.multiple) {
                    var c = [];
                    return r(b.options, function(a) {
                        a.selected && c.push(a.value || a.text)
                    }), 0 === c.length ? null : c
                }
                return b.value
            }
            b.value = a
        },
        html: function(b, a) {
            if (F(a)) return b.innerHTML;
            for (var c = 0, d = b.childNodes; c < d.length; c++) Ma(d[c]);
            b.innerHTML = a
        },
        empty: nc
    }, function(b, a) {
        S.prototype[a] = function(a, d) {
            var e, f, g = this.length;
            if (b !== nc && (2 == b.length && b !== Nb && b !== mc ? a : d) === u) {
                if (T(a)) {
                    for (e = 0; g > e; e++)
                        if (b === Mb) b(this[e], a);
                        else
                            for (f in a) b(this[e], f, a[f]);
                    return this
                }
                for (e = b.$dv, g = e === u ? Math.min(g, 1) : g, f = 0; g > f; f++) {
                    var h = b(this[f], a, d);
                    e = e ? e + h : h
                }
                return e
            }
            for (e = 0; g > e; e++) b(this[e], a, d);
            return this
        }
    }), r({
        removeData: Lb,
        dealoc: Ma,
        on: function a(c, d, e, f) {
            if (D(f)) throw Hb("onargs");
            var g = pa(c, "events"),
                h = pa(c, "handle");
            g || pa(c, "events", g = {}), h || pa(c, "handle", h = ne(c, g)), r(d.split(" "), function(d) {
                var f = g[d];
                if (!f) {
                    if ("mouseenter" == d || "mouseleave" == d) {
                        var l = X.body.contains || X.body.compareDocumentPosition ? function(a, c) {
                            var d = 9 === a.nodeType ? a.documentElement : a,
                                e = c && c.parentNode;
                            return a === e || !(!e || 1 !== e.nodeType || !(d.contains ? d.contains(e) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(e)))
                        } : function(a, c) {
                            if (c)
                                for (; c = c.parentNode;)
                                    if (c === a) return !0;
                            return !1
                        };
                        g[d] = [], a(c, {
                            mouseleave: "mouseout",
                            mouseenter: "mouseover"
                        }[d], function(a) {
                            var c = a.relatedTarget;
                            c && (c === this || l(this, c)) || h(a, d)
                        })
                    } else sb(c, d, h), g[d] = [];
                    f = g[d]
                }
                f.push(e)
            })
        },
        off: lc,
        one: function(a, c, d) {
            a = A(a), a.on(c, function f() {
                a.off(c, d), a.off(c, f)
            }), a.on(c, d)
        },
        replaceWith: function(a, c) {
            var d, e = a.parentNode;
            Ma(a), r(new S(c), function(c) {
                d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a), d = c
            })
        },
        children: function(a) {
            var c = [];
            return r(a.childNodes, function(a) {
                1 === a.nodeType && c.push(a)
            }), c
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || []
        },
        append: function(a, c) {
            r(new S(c), function(c) {
                1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(c)
            })
        },
        prepend: function(a, c) {
            if (1 === a.nodeType) {
                var d = a.firstChild;
                r(new S(c), function(c) {
                    a.insertBefore(c, d)
                })
            }
        },
        wrap: function(a, c) {
            c = A(c)[0];
            var d = a.parentNode;
            d && d.replaceChild(c, a), c.appendChild(a)
        },
        remove: function(a) {
            Ma(a);
            var c = a.parentNode;
            c && c.removeChild(a)
        },
        after: function(a, c) {
            var d = a,
                e = a.parentNode;
            r(new S(c), function(a) {
                e.insertBefore(a, d.nextSibling), d = a
            })
        },
        addClass: pb,
        removeClass: ob,
        toggleClass: function(a, c, d) {
            c && r(c.split(" "), function(c) {
                var f = d;
                F(f) && (f = !Nb(a, c)), (f ? pb : ob)(a, c)
            })
        },
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        },
        next: function(a) {
            if (a.nextElementSibling) return a.nextElementSibling;
            for (a = a.nextSibling; null != a && 1 !== a.nodeType;) a = a.nextSibling;
            return a
        },
        find: function(a, c) {
            return a.getElementsByTagName ? a.getElementsByTagName(c) : []
        },
        clone: Kb,
        triggerHandler: function(a, c, d) {
            var e, f;
            e = c.type || c;
            var g = (pa(a, "events") || {})[e];
            g && (e = {
                preventDefault: function() {
                    this.defaultPrevented = !0
                },
                isDefaultPrevented: function() {
                    return !0 === this.defaultPrevented
                },
                stopPropagation: v,
                type: e,
                target: a
            }, c.type && (e = E(e, c)), c = ha(g), f = d ? [e].concat(d) : [e], r(c, function(c) {
                c.apply(a, f)
            }))
        }
    }, function(a, c) {
        S.prototype[c] = function(c, e, f) {
            for (var g, h = 0; h < this.length; h++) F(g) ? (g = a(this[h], c, e, f), D(g) && (g = A(g))) : Jb(g, a(this[h], c, e, f));
            return D(g) ? g : this
        }, S.prototype.bind = S.prototype.on, S.prototype.unbind = S.prototype.off
    }), db.prototype = {
        put: function(a, c) {
            this[Na(a, this.nextUid)] = c
        },
        get: function(a) {
            return this[Na(a, this.nextUid)]
        },
        remove: function(a) {
            var c = this[a = Na(a, this.nextUid)];
            return delete this[a], c
        }
    };
    var pe = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
        qe = /,/,
        re = /^\s*(_?)(\S+?)\1\s*$/,
        oe = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
        eb = z("$injector"),
        Qe = z("$animate"),
        Ld = ["$provide", function(a) {
            this.$$selectors = {}, this.register = function(c, d) {
                var e = c + "-animation";
                if (c && "." != c.charAt(0)) throw Qe("notcsel", c);
                this.$$selectors[c.substr(1)] = e, a.factory(e, d)
            }, this.classNameFilter = function(a) {
                return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null), this.$$classNameFilter
            }, this.$get = ["$timeout", "$$asyncCallback", function(a, d) {
                return {
                    enter: function(a, c, g, h) {
                        g ? g.after(a) : (c && c[0] || (c = g.parent()), c.append(a)), h && d(h)
                    },
                    leave: function(a, c) {
                        a.remove(), c && d(c)
                    },
                    move: function(a, c, d, h) {
                        this.enter(a, c, d, h)
                    },
                    addClass: function(a, c, g) {
                        c = G(c) ? c : L(c) ? c.join(" ") : "", r(a, function(a) {
                            pb(a, c)
                        }), g && d(g)
                    },
                    removeClass: function(a, c, g) {
                        c = G(c) ? c : L(c) ? c.join(" ") : "", r(a, function(a) {
                            ob(a, c)
                        }), g && d(g)
                    },
                    setClass: function(a, c, g, h) {
                        r(a, function(a) {
                            pb(a, c), ob(a, g)
                        }), h && d(h)
                    },
                    enabled: v
                }
            }]
        }],
        ja = z("$compile");
    gc.$inject = ["$provide", "$$sanitizeUriProvider"];
    var we = /^(x[\:\-_]|data[\:\-_])/i,
        wc = z("$interpolate"),
        Re = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
        ze = {
            http: 80,
            https: 443,
            ftp: 21
        },
        Sb = z("$location");
    Ac.prototype = Tb.prototype = zc.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: tb("$$absUrl"),
        url: function(a) {
            return F(a) ? this.$$url : (a = Re.exec(a), a[1] && this.path(decodeURIComponent(a[1])), (a[2] || a[1]) && this.search(a[3] || ""), this.hash(a[5] || ""), this)
        },
        protocol: tb("$$protocol"),
        host: tb("$$host"),
        port: tb("$$port"),
        path: Bc("$$path", function(a) {
            return a = null !== a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a
        }),
        search: function(a, c) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (G(a) || jb(a)) a = a.toString(), this.$$search = cc(a);
                    else {
                        if (!T(a)) throw Sb("isrcharg");
                        r(a, function(c, e) {
                            null == c && delete a[e]
                        }), this.$$search = a
                    }
                    break;
                default:
                    F(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c
            }
            return this.$$compose(), this
        },
        hash: Bc("$$hash", function(a) {
            return null !== a ? a.toString() : ""
        }),
        replace: function() {
            return this.$$replace = !0, this
        }
    };
    var ya, la = z("$parse"),
        Ec = {},
        Se = Function.prototype.call,
        Te = Function.prototype.apply,
        Pc = Function.prototype.bind,
        hb = {
            "null": function() {
                return null
            },
            "true": function() {
                return !0
            },
            "false": function() {
                return !1
            },
            undefined: v,
            "+": function(a, c, d, e) {
                return d = d(a, c), e = e(a, c), D(d) ? D(e) ? d + e : d : D(e) ? e : u
            },
            "-": function(a, c, d, e) {
                return d = d(a, c), e = e(a, c), (D(d) ? d : 0) - (D(e) ? e : 0)
            },
            "*": function(a, c, d, e) {
                return d(a, c) * e(a, c)
            },
            "/": function(a, c, d, e) {
                return d(a, c) / e(a, c)
            },
            "%": function(a, c, d, e) {
                return d(a, c) % e(a, c)
            },
            "^": function(a, c, d, e) {
                return d(a, c) ^ e(a, c)
            },
            "=": v,
            "===": function(a, c, d, e) {
                return d(a, c) === e(a, c)
            },
            "!==": function(a, c, d, e) {
                return d(a, c) !== e(a, c)
            },
            "==": function(a, c, d, e) {
                return d(a, c) == e(a, c)
            },
            "!=": function(a, c, d, e) {
                return d(a, c) != e(a, c)
            },
            "<": function(a, c, d, e) {
                return d(a, c) < e(a, c)
            },
            ">": function(a, c, d, e) {
                return d(a, c) > e(a, c)
            },
            "<=": function(a, c, d, e) {
                return d(a, c) <= e(a, c)
            },
            ">=": function(a, c, d, e) {
                return d(a, c) >= e(a, c)
            },
            "&&": function(a, c, d, e) {
                return d(a, c) && e(a, c)
            },
            "||": function(a, c, d, e) {
                return d(a, c) || e(a, c)
            },
            "&": function(a, c, d, e) {
                return d(a, c) & e(a, c)
            },
            "|": function(a, c, d, e) {
                return e(a, c)(a, c, d(a, c))
            },
            "!": function(a, c, d) {
                return !d(a, c)
            }
        },
        Ue = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "	",
            v: "",
            "'": "'",
            '"': '"'
        },
        Ub = function(a) {
            this.options = a
        };
    Ub.prototype = {
        constructor: Ub,
        lex: function(a) {
            for (this.text = a, this.index = 0, this.ch = u, this.lastCh = ":", this.tokens = []; this.index < this.text.length;) {
                if (this.ch = this.text.charAt(this.index), this.is("\"'")) this.readString(this.ch);
                else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
                else if (this.isIdent(this.ch)) this.readIdent();
                else if (this.is("(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: this.ch
                }), this.index++;
                else {
                    if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue
                    }
                    a = this.ch + this.peek();
                    var c = a + this.peek(2),
                        d = hb[this.ch],
                        e = hb[a],
                        f = hb[c];
                    f ? (this.tokens.push({
                        index: this.index,
                        text: c,
                        fn: f
                    }), this.index += 3) : e ? (this.tokens.push({
                        index: this.index,
                        text: a,
                        fn: e
                    }), this.index += 2) : d ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: d
                    }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
                this.lastCh = this.ch
            }
            return this.tokens
        },
        is: function(a) {
            return -1 !== a.indexOf(this.ch)
        },
        was: function(a) {
            return -1 !== a.indexOf(this.lastCh)
        },
        peek: function(a) {
            return a = a || 1, this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1
        },
        isNumber: function(a) {
            return a >= "0" && "9" >= a
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
        },
        isIdent: function(a) {
            return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a)
        },
        throwError: function(a, c, d) {
            throw d = d || this.index, c = D(c) ? "s " + c + "-" + this.index + " [" + this.text.substring(c, d) + "]" : " " + d, la("lexerr", a, c, this.text)
        },
        readNumber: function() {
            for (var a = "", c = this.index; this.index < this.text.length;) {
                var d = x(this.text.charAt(this.index));
                if ("." == d || this.isNumber(d)) a += d;
                else {
                    var e = this.peek();
                    if ("e" == d && this.isExpOperator(e)) a += d;
                    else if (this.isExpOperator(d) && e && this.isNumber(e) && "e" == a.charAt(a.length - 1)) a += d;
                    else {
                        if (!this.isExpOperator(d) || e && this.isNumber(e) || "e" != a.charAt(a.length - 1)) break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            a *= 1, this.tokens.push({
                index: c,
                text: a,
                literal: !0,
                constant: !0,
                fn: function() {
                    return a
                }
            })
        },
        readIdent: function() {
            for (var e, f, g, h, a = this, c = "", d = this.index; this.index < this.text.length && (h = this.text.charAt(this.index), "." === h || this.isIdent(h) || this.isNumber(h));) "." === h && (e = this.index), c += h, this.index++;
            if (e)
                for (f = this.index; f < this.text.length;) {
                    if (h = this.text.charAt(f), "(" === h) {
                        g = c.substr(e - d + 1), c = c.substr(0, e - d), this.index = f;
                        break
                    }
                    if (!this.isWhitespace(h)) break;
                    f++
                }
            if (d = {
                    index: d,
                    text: c
                }, hb.hasOwnProperty(c)) d.fn = hb[c], d.literal = !0, d.constant = !0;
            else {
                var k = Dc(c, this.options, this.text);
                d.fn = E(function(a, c) {
                    return k(a, c)
                }, {
                    assign: function(d, e) {
                        return ub(d, c, e, a.text, a.options)
                    }
                })
            }
            this.tokens.push(d), g && (this.tokens.push({
                index: e,
                text: "."
            }), this.tokens.push({
                index: e + 1,
                text: g
            }))
        },
        readString: function(a) {
            var c = this.index;
            this.index++;
            for (var d = "", e = a, f = !1; this.index < this.text.length;) {
                var g = this.text.charAt(this.index),
                    e = e + g;
                if (f) "u" === g ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + f + "]"), this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d += Ue[g] || g, f = !1;
                else if ("\\" === g) f = !0;
                else {
                    if (g === a) return this.index++, void this.tokens.push({
                        index: c,
                        text: e,
                        string: d,
                        literal: !0,
                        constant: !0,
                        fn: function() {
                            return d
                        }
                    });
                    d += g
                }
                this.index++
            }
            this.throwError("Unterminated quote", c)
        }
    };
    var gb = function(a, c, d) {
        this.lexer = a, this.$filter = c, this.options = d
    };
    gb.ZERO = E(function() {
        return 0
    }, {
        constant: !0
    }), gb.prototype = {
        constructor: gb,
        parse: function(a) {
            return this.text = a, this.tokens = this.lexer.lex(a), a = this.statements(), 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), a.literal = !!a.literal, a.constant = !!a.constant, a
        },
        primary: function() {
            var a;
            if (this.expect("(")) a = this.filterChain(), this.consume(")");
            else if (this.expect("[")) a = this.arrayDeclaration();
            else if (this.expect("{")) a = this.object();
            else {
                var c = this.expect();
                (a = c.fn) || this.throwError("not a primary expression", c), a.literal = !!c.literal, a.constant = !!c.constant
            }
            for (var d; c = this.expect("(", "[", ".");) "(" === c.text ? (a = this.functionCall(a, d), d = null) : "[" === c.text ? (d = a, a = this.objectIndex(a)) : "." === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a
        },
        throwError: function(a, c) {
            throw la("syntax", c.text, a, c.index + 1, this.text, this.text.substring(c.index))
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw la("ueoe", this.text);
            return this.tokens[0]
        },
        peek: function(a, c, d, e) {
            if (0 < this.tokens.length) {
                var f = this.tokens[0],
                    g = f.text;
                if (g === a || g === c || g === d || g === e || !(a || c || d || e)) return f
            }
            return !1
        },
        expect: function(a, c, d, e) {
            return (a = this.peek(a, c, d, e)) ? (this.tokens.shift(), a) : !1
        },
        consume: function(a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
        },
        unaryFn: function(a, c) {
            return E(function(d, e) {
                return a(d, e, c)
            }, {
                constant: c.constant
            })
        },
        ternaryFn: function(a, c, d) {
            return E(function(e, f) {
                return a(e, f) ? c(e, f) : d(e, f)
            }, {
                constant: a.constant && c.constant && d.constant
            })
        },
        binaryFn: function(a, c, d) {
            return E(function(e, f) {
                return c(e, f, a, d)
            }, {
                constant: a.constant && d.constant
            })
        },
        statements: function() {
            for (var a = [];;)
                if (0 < this.tokens.length && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";")) return 1 === a.length ? a[0] : function(c, d) {
                    for (var e, f = 0; f < a.length; f++) {
                        var g = a[f];
                        g && (e = g(c, d))
                    }
                    return e
                }
        },
        filterChain: function() {
            for (var c, a = this.expression();;) {
                if (!(c = this.expect("|"))) return a;
                a = this.binaryFn(a, c.fn, this.filter())
            }
        },
        filter: function() {
            for (var a = this.expect(), c = this.$filter(a.text), d = [];;) {
                if (!(a = this.expect(":"))) {
                    var e = function(a, e, h) {
                        h = [h];
                        for (var k = 0; k < d.length; k++) h.push(d[k](a, e));
                        return c.apply(a, h)
                    };
                    return function() {
                        return e
                    }
                }
                d.push(this.expression())
            }
        },
        expression: function() {
            return this.assignment()
        },
        assignment: function() {
            var c, d, a = this.ternary();
            return (d = this.expect("=")) ? (a.assign || this.throwError("implies assignment but [" + this.text.substring(0, d.index) + "] can not be assigned to", d), c = this.ternary(), function(d, f) {
                return a.assign(d, c(d, f), f)
            }) : a
        },
        ternary: function() {
            var c, d, a = this.logicalOR();
            return this.expect("?") ? (c = this.assignment(), (d = this.expect(":")) ? this.ternaryFn(a, c, this.assignment()) : void this.throwError("expected :", d)) : a
        },
        logicalOR: function() {
            for (var c, a = this.logicalAND();;) {
                if (!(c = this.expect("||"))) return a;
                a = this.binaryFn(a, c.fn, this.logicalAND())
            }
        },
        logicalAND: function() {
            var c, a = this.equality();
            return (c = this.expect("&&")) && (a = this.binaryFn(a, c.fn, this.logicalAND())), a
        },
        equality: function() {
            var c, a = this.relational();
            return (c = this.expect("==", "!=", "===", "!==")) && (a = this.binaryFn(a, c.fn, this.equality())), a
        },
        relational: function() {
            var c, a = this.additive();
            return (c = this.expect("<", ">", "<=", ">=")) && (a = this.binaryFn(a, c.fn, this.relational())), a
        },
        additive: function() {
            for (var c, a = this.multiplicative(); c = this.expect("+", "-");) a = this.binaryFn(a, c.fn, this.multiplicative());
            return a
        },
        multiplicative: function() {
            for (var c, a = this.unary(); c = this.expect("*", "/", "%");) a = this.binaryFn(a, c.fn, this.unary());
            return a
        },
        unary: function() {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(gb.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
        },
        fieldAccess: function(a) {
            var c = this,
                d = this.expect().text,
                e = Dc(d, this.options, this.text);
            return E(function(c, d, h) {
                return e(h || a(c, d))
            }, {
                assign: function(e, g, h) {
                    return (h = a(e, h)) || a.assign(e, h = {}), ub(h, d, g, c.text, c.options)
                }
            })
        },
        objectIndex: function(a) {
            var c = this,
                d = this.expression();
            return this.consume("]"), E(function(e, f) {
                var k, g = a(e, f),
                    h = d(e, f);
                return ka(h, c.text), g ? ((g = ma(g[h], c.text)) && g.then && c.options.unwrapPromises && (k = g, "$$v" in g || (k.$$v = u, k.then(function(a) {
                    k.$$v = a
                })), g = g.$$v), g) : u
            }, {
                assign: function(e, f, g) {
                    var h = ka(d(e, g), c.text);
                    return (g = ma(a(e, g), c.text)) || a.assign(e, g = {}), g[h] = f
                }
            })
        },
        functionCall: function(a, c) {
            var d = [];
            if (")" !== this.peekToken().text)
                do d.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var e = this;
            return function(f, g) {
                for (var h = [], k = c ? c(f, g) : f, m = 0; m < d.length; m++) h.push(ma(d[m](f, g), e.text));
                m = a(f, g, k) || v, ma(k, e.text);
                var l = e.text;
                if (m) {
                    if (m.constructor === m) throw la("isecfn", l);
                    if (m === Se || m === Te || Pc && m === Pc) throw la("isecff", l)
                }
                return h = m.apply ? m.apply(k, h) : m(h[0], h[1], h[2], h[3], h[4]), ma(h, e.text)
            }
        },
        arrayDeclaration: function() {
            var a = [],
                c = !0;
            if ("]" !== this.peekToken().text)
                do {
                    if (this.peek("]")) break;
                    var d = this.expression();
                    a.push(d), d.constant || (c = !1)
                } while (this.expect(","));
            return this.consume("]"), E(function(c, d) {
                for (var g = [], h = 0; h < a.length; h++) g.push(a[h](c, d));
                return g
            }, {
                literal: !0,
                constant: c
            })
        },
        object: function() {
            var a = [],
                c = !0;
            if ("}" !== this.peekToken().text)
                do {
                    if (this.peek("}")) break;
                    var d = this.expect(),
                        d = d.string || d.text;
                    this.consume(":");
                    var e = this.expression();
                    a.push({
                        key: d,
                        value: e
                    }), e.constant || (c = !1)
                } while (this.expect(","));
            return this.consume("}"), E(function(c, d) {
                for (var e = {}, k = 0; k < a.length; k++) {
                    var m = a[k];
                    e[m.key] = m.value(c, d)
                }
                return e
            }, {
                literal: !0,
                constant: c
            })
        }
    };
    var Ce = {},
        Be = {},
        za = z("$sce"),
        fa = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
        },
        Y = X.createElement("a"),
        Gc = xa(W.location.href, !0);
    kc.$inject = ["$provide"], Hc.$inject = ["$locale"], Jc.$inject = ["$locale"];
    var Mc = ".",
        Me = {
            yyyy: Z("FullYear", 4),
            yy: Z("FullYear", 2, 0, !0),
            y: Z("FullYear", 1),
            MMMM: vb("Month"),
            MMM: vb("Month", !0),
            MM: Z("Month", 2, 1),
            M: Z("Month", 1, 1),
            dd: Z("Date", 2),
            d: Z("Date", 1),
            HH: Z("Hours", 2),
            H: Z("Hours", 1),
            hh: Z("Hours", 2, -12),
            h: Z("Hours", 1, -12),
            mm: Z("Minutes", 2),
            m: Z("Minutes", 1),
            ss: Z("Seconds", 2),
            s: Z("Seconds", 1),
            sss: Z("Milliseconds", 3),
            EEEE: vb("Day"),
            EEE: vb("Day", !0),
            a: function(a, c) {
                return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1]
            },
            Z: function(a) {
                return a = -1 * a.getTimezoneOffset(), a = (a >= 0 ? "+" : "") + (Vb(Math[a > 0 ? "floor" : "ceil"](a / 60), 2) + Vb(Math.abs(a % 60), 2))
            }
        },
        Le = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
        Ke = /^\-?\d+$/;
    Ic.$inject = ["$locale"];
    var Ie = aa(x),
        Je = aa(La);
    Kc.$inject = ["$parse"];
    var cd = aa({
            restrict: "E",
            compile: function(a, c) {
                return 8 >= R && (c.href || c.name || c.$set("href", ""), a.append(X.createComment("IE fix"))), c.href || c.xlinkHref || c.name ? void 0 : function(a, c) {
                    var f = "[object SVGAnimatedString]" === Ba.call(c.prop("href")) ? "xlink:href" : "href";
                    c.on("click", function(a) {
                        c.attr(f) || a.preventDefault()
                    })
                }
            }
        }),
        Fb = {};
    r(rb, function(a, c) {
        if ("multiple" != a) {
            var d = qa("ng-" + c);
            Fb[d] = function() {
                return {
                    priority: 100,
                    link: function(a, f, g) {
                        a.$watch(g[d], function(a) {
                            g.$set(c, !!a)
                        })
                    }
                }
            }
        }
    }), r(["src", "srcset", "href"], function(a) {
        var c = qa("ng-" + a);
        Fb[c] = function() {
            return {
                priority: 99,
                link: function(d, e, f) {
                    var g = a,
                        h = a;
                    "href" === a && "[object SVGAnimatedString]" === Ba.call(e.prop("href")) && (h = "xlinkHref", f.$attr[h] = "xlink:href", g = null), f.$observe(c, function(c) {
                        c ? (f.$set(h, c), R && g && e.prop(g, f[h])) : "href" === a && f.$set(h, null)
                    })
                }
            }
        }
    });
    var yb = {
        $addControl: v,
        $removeControl: v,
        $setValidity: v,
        $setDirty: v,
        $setPristine: v
    };
    Nc.$inject = ["$element", "$attrs", "$scope", "$animate"];
    var Qc = function(a) {
            return ["$timeout", function(c) {
                return {
                    name: "form",
                    restrict: a ? "EAC" : "E",
                    controller: Nc,
                    compile: function() {
                        return {
                            pre: function(a, e, f, g) {
                                if (!f.action) {
                                    var h = function(a) {
                                        a.preventDefault ? a.preventDefault() : a.returnValue = !1
                                    };
                                    sb(e[0], "submit", h), e.on("$destroy", function() {
                                        c(function() {
                                            bb(e[0], "submit", h)
                                        }, 0, !1)
                                    })
                                }
                                var k = e.parent().controller("form"),
                                    m = f.name || f.ngForm;
                                m && ub(a, m, g, m), k && e.on("$destroy", function() {
                                    k.$removeControl(g), m && ub(a, m, u, m), E(g, yb)
                                })
                            }
                        }
                    }
                }
            }]
        },
        dd = Qc(),
        qd = Qc(!0),
        Ve = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        We = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
        Xe = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
        Rc = {
            text: Ab,
            number: function(a, c, d, e, f, g) {
                Ab(a, c, d, e, f, g), e.$parsers.push(function(a) {
                    var c = e.$isEmpty(a);
                    return c || Xe.test(a) ? (e.$setValidity("number", !0), "" === a ? null : c ? a : parseFloat(a)) : (e.$setValidity("number", !1), u)
                }), Ne(e, "number", Ye, null, e.$$validityState), e.$formatters.push(function(a) {
                    return e.$isEmpty(a) ? "" : "" + a
                }), d.min && (a = function(a) {
                    var c = parseFloat(d.min);
                    return ua(e, "min", e.$isEmpty(a) || a >= c, a)
                }, e.$parsers.push(a), e.$formatters.push(a)), d.max && (a = function(a) {
                    var c = parseFloat(d.max);
                    return ua(e, "max", e.$isEmpty(a) || c >= a, a)
                }, e.$parsers.push(a), e.$formatters.push(a)), e.$formatters.push(function(a) {
                    return ua(e, "number", e.$isEmpty(a) || jb(a), a)
                })
            },
            url: function(a, c, d, e, f, g) {
                Ab(a, c, d, e, f, g), a = function(a) {
                    return ua(e, "url", e.$isEmpty(a) || Ve.test(a), a)
                }, e.$formatters.push(a), e.$parsers.push(a)
            },
            email: function(a, c, d, e, f, g) {
                Ab(a, c, d, e, f, g), a = function(a) {
                    return ua(e, "email", e.$isEmpty(a) || We.test(a), a)
                }, e.$formatters.push(a), e.$parsers.push(a)
            },
            radio: function(a, c, d, e) {
                F(d.name) && c.attr("name", ib()), c.on("click", function() {
                    c[0].checked && a.$apply(function() {
                        e.$setViewValue(d.value)
                    })
                }), e.$render = function() {
                    c[0].checked = d.value == e.$viewValue
                }, d.$observe("value", e.$render)
            },
            checkbox: function(a, c, d, e) {
                var f = d.ngTrueValue,
                    g = d.ngFalseValue;
                G(f) || (f = !0), G(g) || (g = !1), c.on("click", function() {
                    a.$apply(function() {
                        e.$setViewValue(c[0].checked)
                    })
                }), e.$render = function() {
                    c[0].checked = e.$viewValue
                }, e.$isEmpty = function(a) {
                    return a !== f
                }, e.$formatters.push(function(a) {
                    return a === f
                }), e.$parsers.push(function(a) {
                    return a ? f : g
                })
            },
            hidden: v,
            button: v,
            submit: v,
            reset: v,
            file: v
        },
        Ye = ["badInput"],
        hc = ["$browser", "$sniffer", function(a, c) {
            return {
                restrict: "E",
                require: "?ngModel",
                link: function(d, e, f, g) {
                    g && (Rc[x(f.type)] || Rc.text)(d, e, f, g, c, a)
                }
            }
        }],
        wb = "ng-valid",
        xb = "ng-invalid",
        Ra = "ng-pristine",
        zb = "ng-dirty",
        Ze = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function(a, c, d, e, f, g) {
            function h(a, c) {
                c = c ? "-" + nb(c, "-") : "", g.removeClass(e, (a ? xb : wb) + c), g.addClass(e, (a ? wb : xb) + c)
            }
            this.$modelValue = this.$viewValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = d.name;
            var k = f(d.ngModel),
                m = k.assign;
            if (!m) throw z("ngModel")("nonassign", d.ngModel, ia(e));
            this.$render = v, this.$isEmpty = function(a) {
                return F(a) || "" === a || null === a || a !== a
            };
            var l = e.inheritedData("$formController") || yb,
                n = 0,
                q = this.$error = {};
            e.addClass(Ra), h(!0), this.$setValidity = function(a, c) {
                q[a] !== !c && (c ? (q[a] && n--, n || (h(!0), this.$valid = !0, this.$invalid = !1)) : (h(!1), this.$invalid = !0, this.$valid = !1, n++), q[a] = !c, h(c, a), l.$setValidity(a, c, this))
            }, this.$setPristine = function() {
                this.$dirty = !1, this.$pristine = !0, g.removeClass(e, zb), g.addClass(e, Ra)
            }, this.$setViewValue = function(d) {
                this.$viewValue = d, this.$pristine && (this.$dirty = !0, this.$pristine = !1, g.removeClass(e, Ra), g.addClass(e, zb), l.$setDirty()), r(this.$parsers, function(a) {
                    d = a(d)
                }), this.$modelValue !== d && (this.$modelValue = d, m(a, d), r(this.$viewChangeListeners, function(a) {
                    try {
                        a()
                    } catch (d) {
                        c(d)
                    }
                }))
            };
            var p = this;
            a.$watch(function() {
                var c = k(a);
                if (p.$modelValue !== c) {
                    var d = p.$formatters,
                        e = d.length;
                    for (p.$modelValue = c; e--;) c = d[e](c);
                    p.$viewValue !== c && (p.$viewValue = c, p.$render())
                }
                return c
            })
        }],
        Fd = function() {
            return {
                require: ["ngModel", "^?form"],
                controller: Ze,
                link: function(a, c, d, e) {
                    var f = e[0],
                        g = e[1] || yb;
                    g.$addControl(f), a.$on("$destroy", function() {
                        g.$removeControl(f)
                    })
                }
            }
        },
        Hd = aa({
            require: "ngModel",
            link: function(a, c, d, e) {
                e.$viewChangeListeners.push(function() {
                    a.$eval(d.ngChange)
                })
            }
        }),
        ic = function() {
            return {
                require: "?ngModel",
                link: function(a, c, d, e) {
                    if (e) {
                        d.required = !0;
                        var f = function(a) {
                            return d.required && e.$isEmpty(a) ? void e.$setValidity("required", !1) : (e.$setValidity("required", !0), a)
                        };
                        e.$formatters.push(f), e.$parsers.unshift(f), d.$observe("required", function() {
                            f(e.$viewValue)
                        })
                    }
                }
            }
        },
        Gd = function() {
            return {
                require: "ngModel",
                link: function(a, c, d, e) {
                    var f = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ",";
                    e.$parsers.push(function(a) {
                        if (!F(a)) {
                            var c = [];
                            return a && r(a.split(f), function(a) {
                                a && c.push($(a))
                            }), c
                        }
                    }), e.$formatters.push(function(a) {
                        return L(a) ? a.join(", ") : u
                    }), e.$isEmpty = function(a) {
                        return !a || !a.length
                    }
                }
            }
        },
        $e = /^(true|false|\d+)$/,
        Id = function() {
            return {
                priority: 100,
                compile: function(a, c) {
                    return $e.test(c.ngValue) ? function(a, c, f) {
                        f.$set("value", a.$eval(f.ngValue))
                    } : function(a, c, f) {
                        a.$watch(f.ngValue, function(a) {
                            f.$set("value", a)
                        })
                    }
                }
            }
        },
        id = Aa({
            compile: function(a) {
                return a.addClass("ng-binding"),
                    function(a, d, e) {
                        d.data("$binding", e.ngBind), a.$watch(e.ngBind, function(a) {
                            d.text(a == u ? "" : a)
                        })
                    }
            }
        }),
        kd = ["$interpolate", function(a) {
            return function(c, d, e) {
                c = a(d.attr(e.$attr.ngBindTemplate)), d.addClass("ng-binding").data("$binding", c), e.$observe("ngBindTemplate", function(a) {
                    d.text(a)
                })
            }
        }],
        jd = ["$sce", "$parse", function(a, c) {
            return {
                compile: function(d) {
                    return d.addClass("ng-binding"),
                        function(d, f, g) {
                            f.data("$binding", g.ngBindHtml);
                            var h = c(g.ngBindHtml);
                            d.$watch(function() {
                                return (h(d) || "").toString()
                            }, function() {
                                f.html(a.getTrustedHtml(h(d)) || "")
                            })
                        }
                }
            }
        }],
        ld = Wb("", !0),
        nd = Wb("Odd", 0),
        md = Wb("Even", 1),
        od = Aa({
            compile: function(a, c) {
                c.$set("ngCloak", u), a.removeClass("ng-cloak")
            }
        }),
        pd = [function() {
            return {
                scope: !0,
                controller: "@",
                priority: 500
            }
        }],
        jc = {},
        af = {
            blur: !0,
            focus: !0
        };
    r("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var c = qa("ng-" + a);
        jc[c] = ["$parse", "$rootScope", function(d, e) {
            return {
                compile: function(f, g) {
                    var h = d(g[c], !0);
                    return function(c, d) {
                        d.on(a, function(d) {
                            var f = function() {
                                h(c, {
                                    $event: d
                                })
                            };
                            af[a] && e.$$phase ? c.$evalAsync(f) : c.$apply(f)
                        })
                    }
                }
            }
        }]
    });
    var sd = ["$animate", function(a) {
            return {
                transclude: "element",
                priority: 600,
                terminal: !0,
                restrict: "A",
                $$tlb: !0,
                link: function(c, d, e, f, g) {
                    var h, k, m;
                    c.$watch(e.ngIf, function(f) {
                        Wa(f) ? k || (k = c.$new(), g(k, function(c) {
                            c[c.length++] = X.createComment(" end ngIf: " + e.ngIf + " "), h = {
                                clone: c
                            }, a.enter(c, d.parent(), d)
                        })) : (m && (m.remove(), m = null), k && (k.$destroy(), k = null), h && (m = Eb(h.clone), a.leave(m, function() {
                            m = null
                        }), h = null))
                    })
                }
            }
        }],
        td = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function(a, c, d, e, f) {
            return {
                restrict: "ECA",
                priority: 400,
                terminal: !0,
                transclude: "element",
                controller: Xa.noop,
                compile: function(g, h) {
                    var k = h.ngInclude || h.src,
                        m = h.onload || "",
                        l = h.autoscroll;
                    return function(g, h, p, r, J) {
                        var t, y, u, w = 0,
                            B = function() {
                                y && (y.remove(), y = null), t && (t.$destroy(), t = null), u && (e.leave(u, function() {
                                    y = null
                                }), y = u, u = null)
                            };
                        g.$watch(f.parseAsResourceUrl(k), function(f) {
                            var k = function() {
                                    !D(l) || l && !g.$eval(l) || d()
                                },
                                p = ++w;
                            f ? (a.get(f, {
                                cache: c
                            }).success(function(a) {
                                if (p === w) {
                                    var c = g.$new();
                                    r.template = a, a = J(c, function(a) {
                                        B(), e.enter(a, null, h, k)
                                    }), t = c, u = a, t.$emit("$includeContentLoaded"), g.$eval(m)
                                }
                            }).error(function() {
                                p === w && B()
                            }), g.$emit("$includeContentRequested")) : (B(), r.template = null)
                        })
                    }
                }
            }
        }],
        Jd = ["$compile", function(a) {
            return {
                restrict: "ECA",
                priority: -400,
                require: "ngInclude",
                link: function(c, d, e, f) {
                    d.html(f.template), a(d.contents())(c)
                }
            }
        }],
        ud = Aa({
            priority: 450,
            compile: function() {
                return {
                    pre: function(a, c, d) {
                        a.$eval(d.ngInit)
                    }
                }
            }
        }),
        vd = Aa({
            terminal: !0,
            priority: 1e3
        }),
        wd = ["$locale", "$interpolate", function(a, c) {
            var d = /{}/g;
            return {
                restrict: "EA",
                link: function(e, f, g) {
                    var h = g.count,
                        k = g.$attr.when && f.attr(g.$attr.when),
                        m = g.offset || 0,
                        l = e.$eval(k) || {},
                        n = {},
                        q = c.startSymbol(),
                        p = c.endSymbol(),
                        s = /^when(Minus)?(.+)$/;
                    r(g, function(a, c) {
                        s.test(c) && (l[x(c.replace("when", "").replace("Minus", "-"))] = f.attr(g.$attr[c]))
                    }), r(l, function(a, e) {
                        n[e] = c(a.replace(d, q + h + "-" + m + p))
                    }), e.$watch(function() {
                        var c = parseFloat(e.$eval(h));
                        return isNaN(c) ? "" : (c in l || (c = a.pluralCat(c - m)), n[c](e, f, !0))
                    }, function(a) {
                        f.text(a)
                    })
                }
            }
        }],
        xd = ["$parse", "$animate", function(a, c) {
            var d = z("ngRepeat");
            return {
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                $$tlb: !0,
                link: function(e, f, g, h, k) {
                    var n, q, p, s, u, w, m = g.ngRepeat,
                        l = m.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
                        t = {
                            $id: Na
                        };
                    if (!l) throw d("iexp", m);
                    if (g = l[1], h = l[2], (l = l[3]) ? (n = a(l), q = function(a, c, d) {
                            return w && (t[w] = a), t[u] = c, t.$index = d, n(e, t)
                        }) : (p = function(a, c) {
                            return Na(c)
                        }, s = function(a) {
                            return a
                        }), l = g.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !l) throw d("iidexp", g);
                    u = l[3] || l[1], w = l[2];
                    var y = {};
                    e.$watchCollection(h, function(a) {
                        var g, h, n, D, C, I, x, G, v, z, l = f[0],
                            t = {},
                            F = [];
                        if (Sa(a)) v = a, G = q || p;
                        else {
                            G = q || s, v = [];
                            for (I in a) a.hasOwnProperty(I) && "$" != I.charAt(0) && v.push(I);
                            v.sort()
                        }
                        for (D = v.length, h = F.length = v.length, g = 0; h > g; g++)
                            if (I = a === v ? g : v[g], x = a[I], n = G(I, x, g), Ea(n, "`track by` id"), y.hasOwnProperty(n)) z = y[n], delete y[n], t[n] = z, F[g] = z;
                            else {
                                if (t.hasOwnProperty(n)) throw r(F, function(a) {
                                    a && a.scope && (y[a.id] = a)
                                }), d("dupes", m, n, oa(x));
                                F[g] = {
                                    id: n
                                }, t[n] = !1
                            }
                        for (I in y) y.hasOwnProperty(I) && (z = y[I], g = Eb(z.clone), c.leave(g), r(g, function(a) {
                            a.$$NG_REMOVED = !0
                        }), z.scope.$destroy());
                        for (g = 0, h = v.length; h > g; g++) {
                            if (I = a === v ? g : v[g], x = a[I], z = F[g], F[g - 1] && (l = F[g - 1].clone[F[g - 1].clone.length - 1]), z.scope) {
                                C = z.scope, n = l;
                                do n = n.nextSibling; while (n && n.$$NG_REMOVED);
                                z.clone[0] != n && c.move(Eb(z.clone), null, A(l)), l = z.clone[z.clone.length - 1]
                            } else C = e.$new();
                            C[u] = x, w && (C[w] = I), C.$index = g, C.$first = 0 === g, C.$last = g === D - 1, C.$middle = !(C.$first || C.$last), C.$odd = !(C.$even = 0 === (1 & g)), z.scope || k(C, function(a) {
                                a[a.length++] = X.createComment(" end ngRepeat: " + m + " "), c.enter(a, null, A(l)), l = a, z.scope = C, z.clone = a, t[z.id] = z
                            })
                        }
                        y = t
                    })
                }
            }
        }],
        yd = ["$animate", function(a) {
            return function(c, d, e) {
                c.$watch(e.ngShow, function(c) {
                    a[Wa(c) ? "removeClass" : "addClass"](d, "ng-hide")
                })
            }
        }],
        rd = ["$animate", function(a) {
            return function(c, d, e) {
                c.$watch(e.ngHide, function(c) {
                    a[Wa(c) ? "addClass" : "removeClass"](d, "ng-hide")
                })
            }
        }],
        zd = Aa(function(a, c, d) {
            a.$watch(d.ngStyle, function(a, d) {
                d && a !== d && r(d, function(a, d) {
                    c.css(d, "")
                }), a && c.css(a)
            }, !0)
        }),
        Ad = ["$animate", function(a) {
            return {
                restrict: "EA",
                require: "ngSwitch",
                controller: ["$scope", function() {
                    this.cases = {}
                }],
                link: function(c, d, e, f) {
                    var g = [],
                        h = [],
                        k = [],
                        m = [];
                    c.$watch(e.ngSwitch || e.on, function(d) {
                        var n, q;
                        for (n = 0, q = k.length; q > n; ++n) k[n].remove();
                        for (n = k.length = 0, q = m.length; q > n; ++n) {
                            var p = h[n];
                            m[n].$destroy(), k[n] = p, a.leave(p, function() {
                                k.splice(n, 1)
                            })
                        }
                        h.length = 0, m.length = 0, (g = f.cases["!" + d] || f.cases["?"]) && (c.$eval(e.change), r(g, function(d) {
                            var e = c.$new();
                            m.push(e), d.transclude(e, function(c) {
                                var e = d.element;
                                h.push(c), a.enter(c, e.parent(), e)
                            })
                        }))
                    })
                }
            }
        }],
        Bd = Aa({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function(a, c, d, e, f) {
                e.cases["!" + d.ngSwitchWhen] = e.cases["!" + d.ngSwitchWhen] || [], e.cases["!" + d.ngSwitchWhen].push({
                    transclude: f,
                    element: c
                })
            }
        }),
        Cd = Aa({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function(a, c, d, e, f) {
                e.cases["?"] = e.cases["?"] || [], e.cases["?"].push({
                    transclude: f,
                    element: c
                })
            }
        }),
        Ed = Aa({
            link: function(a, c, d, e, f) {
                if (!f) throw z("ngTransclude")("orphan", ia(c));
                f(function(a) {
                    c.empty(), c.append(a)
                })
            }
        }),
        ed = ["$templateCache", function(a) {
            return {
                restrict: "E",
                terminal: !0,
                compile: function(c, d) {
                    "text/ng-template" == d.type && a.put(d.id, c[0].text)
                }
            }
        }],
        bf = z("ngOptions"),
        Dd = aa({
            terminal: !0
        }),
        fd = ["$compile", "$parse", function(a, c) {
            var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                e = {
                    $setViewValue: v
                };
            return {
                restrict: "E",
                require: ["select", "?ngModel"],
                controller: ["$element", "$scope", "$attrs", function(a, c, d) {
                    var n, k = this,
                        m = {},
                        l = e;
                    k.databound = d.ngModel, k.init = function(a, c, d) {
                        l = a, n = d
                    }, k.addOption = function(c) {
                        Ea(c, '"option value"'), m[c] = !0, l.$viewValue == c && (a.val(c), n.parent() && n.remove())
                    }, k.removeOption = function(a) {
                        this.hasOption(a) && (delete m[a], l.$viewValue == a && this.renderUnknownOption(a))
                    }, k.renderUnknownOption = function(c) {
                        c = "? " + Na(c) + " ?", n.val(c), a.prepend(n), a.val(c), n.prop("selected", !0)
                    }, k.hasOption = function(a) {
                        return m.hasOwnProperty(a)
                    }, c.$on("$destroy", function() {
                        k.renderUnknownOption = v
                    })
                }],
                link: function(e, g, h, k) {
                    function m(a, c, d, e) {
                        d.$render = function() {
                            var a = d.$viewValue;
                            e.hasOption(a) ? (x.parent() && x.remove(), c.val(a), "" === a && w.prop("selected", !0)) : F(a) && w ? c.val("") : e.renderUnknownOption(a)
                        }, c.on("change", function() {
                            a.$apply(function() {
                                x.parent() && x.remove(), d.$setViewValue(c.val())
                            })
                        })
                    }

                    function l(a, c, d) {
                        var e;
                        d.$render = function() {
                            var a = new db(d.$viewValue);
                            r(c.find("option"), function(c) {
                                c.selected = D(a.get(c.value))
                            })
                        }, a.$watch(function() {
                            Ca(e, d.$viewValue) || (e = ha(d.$viewValue), d.$render())
                        }), c.on("change", function() {
                            a.$apply(function() {
                                var a = [];
                                r(c.find("option"), function(c) {
                                    c.selected && a.push(c.value)
                                }), d.$setViewValue(a)
                            })
                        })
                    }

                    function n(e, f, g) {
                        function h() {
                            var d, k, s, u, v, a = {
                                    "": []
                                },
                                c = [""];
                            s = g.$modelValue, u = A(e) || [];
                            var G, Q, C, F = n ? Xb(u) : u;
                            if (Q = {}, C = !1, p)
                                if (k = g.$modelValue, w && L(k))
                                    for (C = new db([]), d = {}, v = 0; v < k.length; v++) d[m] = k[v], C.put(w(e, d), k[v]);
                                else C = new db(k);
                            v = C;
                            var E, K;
                            for (C = 0; G = F.length, G > C; C++) {
                                if (k = C, n) {
                                    if (k = F[C], "$" === k.charAt(0)) continue;
                                    Q[n] = k
                                }
                                Q[m] = u[k], d = r(e, Q) || "", (k = a[d]) || (k = a[d] = [], c.push(d)), p ? d = D(v.remove(w ? w(e, Q) : x(e, Q))) : (w ? (d = {}, d[m] = s, d = w(e, d) === w(e, Q)) : d = s === x(e, Q), v = v || d), E = l(e, Q), E = D(E) ? E : "", k.push({
                                    id: w ? w(e, Q) : n ? F[C] : C,
                                    label: E,
                                    selected: d
                                })
                            }
                            for (p || (z || null === s ? a[""].unshift({
                                    id: "",
                                    label: "",
                                    selected: !v
                                }) : v || a[""].unshift({
                                    id: "?",
                                    label: "",
                                    selected: !0
                                })), Q = 0, F = c.length; F > Q; Q++) {
                                for (d = c[Q], k = a[d], B.length <= Q ? (s = {
                                        element: y.clone().attr("label", d),
                                        label: k.label
                                    }, u = [s], B.push(u), f.append(s.element)) : (u = B[Q], s = u[0], s.label != d && s.element.attr("label", s.label = d)), E = null, C = 0, G = k.length; G > C; C++) d = k[C], (v = u[C + 1]) ? (E = v.element, v.label !== d.label && (E.text(v.label = d.label), E.prop("label", v.label)), v.id !== d.id && E.val(v.id = d.id), E[0].selected !== d.selected && (E.prop("selected", v.selected = d.selected), R && E.prop("selected", v.selected))) : ("" === d.id && z ? K = z : (K = t.clone()).val(d.id).prop("selected", d.selected).attr("selected", d.selected).prop("label", d.label).text(d.label), u.push({
                                    element: K,
                                    label: d.label,
                                    id: d.id,
                                    selected: d.selected
                                }), q.addOption(d.label, K), E ? E.after(K) : s.element.append(K), E = K);
                                for (C++; u.length > C;) d = u.pop(), q.removeOption(d.label), d.element.remove()
                            }
                            for (; B.length > Q;) B.pop()[0].element.remove()
                        }
                        var k;
                        if (!(k = s.match(d))) throw bf("iexp", s, ia(f));
                        var l = c(k[2] || k[1]),
                            m = k[4] || k[6],
                            n = k[5],
                            r = c(k[3] || ""),
                            x = c(k[2] ? k[1] : m),
                            A = c(k[7]),
                            w = k[8] ? c(k[8]) : null,
                            B = [
                                [{
                                    element: f,
                                    label: ""
                                }]
                            ];
                        z && (a(z)(e), z.removeClass("ng-scope"), z.remove()), f.empty(), f.on("change", function() {
                            e.$apply(function() {
                                var a, k, l, q, r, s, t, v, c = A(e) || [],
                                    d = {};
                                if (p) {
                                    for (l = [], r = 0, t = B.length; t > r; r++)
                                        for (a = B[r], q = 1, s = a.length; s > q; q++)
                                            if ((k = a[q].element)[0].selected) {
                                                if (k = k.val(), n && (d[n] = k), w)
                                                    for (v = 0; v < c.length && (d[m] = c[v], w(e, d) != k); v++);
                                                else d[m] = c[k];
                                                l.push(x(e, d))
                                            }
                                } else if (k = f.val(), "?" == k) l = u;
                                else if ("" === k) l = null;
                                else if (w) {
                                    for (v = 0; v < c.length; v++)
                                        if (d[m] = c[v], w(e, d) == k) {
                                            l = x(e, d);
                                            break
                                        }
                                } else d[m] = c[k], n && (d[n] = k), l = x(e, d);
                                g.$setViewValue(l), h()
                            })
                        }), g.$render = h, e.$watchCollection(A, h), e.$watchCollection(function() {
                            var a = {},
                                c = A(e);
                            if (c) {
                                for (var d = Array(c.length), f = 0, g = c.length; g > f; f++) a[m] = c[f], d[f] = l(e, a);
                                return d
                            }
                        }, h), p && e.$watchCollection(function() {
                            return g.$modelValue
                        }, h)
                    }
                    if (k[1]) {
                        var q = k[0];
                        k = k[1];
                        var w, p = h.multiple,
                            s = h.ngOptions,
                            z = !1,
                            t = A(X.createElement("option")),
                            y = A(X.createElement("optgroup")),
                            x = t.clone();
                        h = 0;
                        for (var B = g.children(), v = B.length; v > h; h++)
                            if ("" === B[h].value) {
                                w = z = B.eq(h);
                                break
                            }
                        q.init(k, z, x), p && (k.$isEmpty = function(a) {
                            return !a || 0 === a.length
                        }), s ? n(e, g, k) : p ? l(e, g, k) : m(e, g, k, q)
                    }
                }
            }
        }],
        hd = ["$interpolate", function(a) {
            var c = {
                addOption: v,
                removeOption: v
            };
            return {
                restrict: "E",
                priority: 100,
                compile: function(d, e) {
                    if (F(e.value)) {
                        var f = a(d.text(), !0);
                        f || e.$set("value", d.text())
                    }
                    return function(a, d, e) {
                        var m = d.parent(),
                            l = m.data("$selectController") || m.parent().data("$selectController");
                        l && l.databound ? d.prop("selected", !1) : l = c, f ? a.$watch(f, function(a, c) {
                            e.$set("value", a), a !== c && l.removeOption(c), l.addOption(a)
                        }) : l.addOption(e.value), d.on("$destroy", function() {
                            l.removeOption(e.value)
                        })
                    }
                }
            }
        }],
        gd = aa({
            restrict: "E",
            terminal: !0
        });
    W.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : ((Fa = W.jQuery) && Fa.fn.on ? (A = Fa, E(Fa.fn, {
        scope: Oa.scope,
        isolateScope: Oa.isolateScope,
        controller: Oa.controller,
        injector: Oa.injector,
        inheritedData: Oa.inheritedData
    }), Gb("remove", !0, !0, !1), Gb("empty", !1, !1, !1), Gb("html", !1, !1, !0)) : A = S, Xa.element = A, Zc(Xa), A(X).ready(function() {
        Wc(X, dc)
    }))
}(window, document), !window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>'),
    function(G, d, P) {
        "use strict";
        d.module("ngAnimate", ["ng"]).directive("ngAnimateChildren", function() {
            return function(H, z, e) {
                e = e.ngAnimateChildren, d.isString(e) && 0 === e.length ? z.data("$$ngAnimateChildren", !0) : H.$watch(e, function(d) {
                    z.data("$$ngAnimateChildren", !!d)
                })
            }
        }).factory("$$animateReflow", ["$$rAF", "$document", function(d) {
            return function(e) {
                return d(function() {
                    e()
                })
            }
        }]).config(["$provide", "$animateProvider", function(H, z) {
            function e(d) {
                for (var e = 0; e < d.length; e++) {
                    var g = d[e];
                    if (g.nodeType == ba) return g
                }
            }

            function E(g) {
                return d.element(e(g))
            }
            var q = d.noop,
                w = d.forEach,
                Q = z.$$selectors,
                ba = 1,
                g = "$$ngAnimateState",
                ga = "$$ngAnimateChildren",
                I = "ng-animate",
                h = {
                    running: !0
                };
            H.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", function(y, G, aa, J, K, k) {
                function R(a) {
                    var b = a.data(g) || {};
                    b.running = !0, a.data(g, b)
                }

                function ha(a) {
                    if (a) {
                        var b = [],
                            c = {};
                        a = a.substr(1).split("."), (aa.transitions || aa.animations) && b.push(G.get(Q[""]));
                        for (var f = 0; f < a.length; f++) {
                            var d = a[f],
                                e = Q[d];
                            e && !c[d] && (b.push(G.get(e)), c[d] = !0)
                        }
                        return b
                    }
                }

                function M(a, b, c) {
                    function f(a, b) {
                        var c = a[b],
                            d = a["before" + b.charAt(0).toUpperCase() + b.substr(1)];
                        return c || d ? ("leave" == b && (d = c, c = null), S.push({
                            event: b,
                            fn: c
                        }), n.push({
                            event: b,
                            fn: d
                        }), !0) : void 0
                    }

                    function e(b, d, f) {
                        var g = [];
                        w(b, function(a) {
                            a.fn && g.push(a)
                        });
                        var r = 0;
                        w(g, function(b, e) {
                            var C = function() {
                                a: {
                                    if (d) {
                                        if ((d[e] || q)(), ++r < g.length) break a;
                                        d = null
                                    }
                                    f()
                                }
                            };
                            switch (b.event) {
                                case "setClass":
                                    d.push(b.fn(a, l, A, C));
                                    break;
                                case "addClass":
                                    d.push(b.fn(a, l || c, C));
                                    break;
                                case "removeClass":
                                    d.push(b.fn(a, A || c, C));
                                    break;
                                default:
                                    d.push(b.fn(a, C))
                            }
                        }), d && 0 === d.length && f()
                    }
                    var g = a[0];
                    if (g) {
                        var l, A, p = "setClass" == b,
                            h = p || "addClass" == b || "removeClass" == b;
                        d.isArray(c) && (l = c[0], A = c[1], c = l + " " + A);
                        var k = a.attr("class") + " " + c;
                        if (U(k)) {
                            var t = q,
                                v = [],
                                n = [],
                                x = q,
                                u = [],
                                S = [],
                                k = (" " + k).replace(/\s+/g, ".");
                            return w(ha(k), function(a) {
                                !f(a, b) && p && (f(a, "addClass"), f(a, "removeClass"))
                            }), {
                                node: g,
                                event: b,
                                className: c,
                                isClassBased: h,
                                isSetClassOperation: p,
                                before: function(a) {
                                    t = a, e(n, v, function() {
                                        t = q, a()
                                    })
                                },
                                after: function(a) {
                                    x = a, e(S, u, function() {
                                        x = q, a()
                                    })
                                },
                                cancel: function() {
                                    v && (w(v, function(a) {
                                        (a || q)(!0)
                                    }), t(!0)), u && (w(u, function(a) {
                                        (a || q)(!0)
                                    }), x(!0))
                                }
                            }
                        }
                    }
                }

                function F(a, b, c, f, e, m, p) {
                    function k(d) {
                        var e = "$animate:" + d;
                        x && x[e] && 0 < x[e].length && K(function() {
                            c.triggerHandler(e, {
                                event: a,
                                className: b
                            })
                        })
                    }

                    function l() {
                        k("before")
                    }

                    function A() {
                        k("after")
                    }

                    function q() {
                        k("close"), p && K(function() {
                            p()
                        })
                    }

                    function t() {
                        t.hasBeenRun || (t.hasBeenRun = !0, m())
                    }

                    function v() {
                        if (!v.hasBeenRun) {
                            v.hasBeenRun = !0;
                            var e = c.data(g);
                            e && (n && n.isClassBased ? B(c, b) : (K(function() {
                                var e = c.data(g) || {};
                                s == e.index && B(c, b, a)
                            }), c.data(g, e))), q()
                        }
                    }
                    var n = M(c, a, b);
                    if (n) {
                        b = n.className;
                        var x = d.element._data(n.node),
                            x = x && x.events;
                        f || (f = e ? e.parent() : c.parent());
                        var u = c.data(g) || {};
                        e = u.active || {};
                        var D, h = u.totalActive || 0,
                            C = u.last;
                        if (n.isClassBased && (D = u.running || u.disabled || C && !C.isClassBased), D || N(c, f)) t(), l(), A(), v();
                        else {
                            if (f = !1, h > 0) {
                                if (D = [], n.isClassBased) "setClass" == C.event ? (D.push(C), B(c, b)) : e[b] && (y = e[b], y.event == a ? f = !0 : (D.push(y), B(c, b)));
                                else if ("leave" == a && e["ng-leave"]) f = !0;
                                else {
                                    for (var y in e) D.push(e[y]), B(c, y);
                                    e = {}, h = 0
                                }
                                0 < D.length && w(D, function(a) {
                                    a.cancel()
                                })
                            }
                            if (!n.isClassBased || n.isSetClassOperation || f || (f = "addClass" == a == c.hasClass(b)), f) t(), l(), A(), q();
                            else {
                                "leave" == a && c.one("$destroy", function(a) {
                                    a = d.element(this);
                                    var b = a.data(g);
                                    b && (b = b.active["ng-leave"]) && (b.cancel(), B(a, "ng-leave"))
                                }), c.addClass(I);
                                var s = O++;
                                h++, e[b] = n, c.data(g, {
                                    last: n,
                                    active: e,
                                    index: s,
                                    totalActive: h
                                }), l(), n.before(function(e) {
                                    var d = c.data(g);
                                    e = e || !d || !d.active[b] || n.isClassBased && d.active[b].event != a, t(), !0 === e ? v() : (A(), n.after(v))
                                })
                            }
                        }
                    } else t(), l(), A(), v()
                }

                function V(a) {
                    (a = e(a)) && (a = d.isFunction(a.getElementsByClassName) ? a.getElementsByClassName(I) : a.querySelectorAll("." + I), w(a, function(a) {
                        a = d.element(a), (a = a.data(g)) && a.active && w(a.active, function(a) {
                            a.cancel()
                        })
                    }))
                }

                function B(a, b) {
                    if (e(a) == e(J)) h.disabled || (h.running = !1, h.structural = !1);
                    else if (b) {
                        var c = a.data(g) || {},
                            d = !0 === b;
                        !d && c.active && c.active[b] && (c.totalActive--, delete c.active[b]), (d || !c.totalActive) && (a.removeClass(I), a.removeData(g))
                    }
                }

                function N(a, b) {
                    if (h.disabled) return !0;
                    if (e(a) == e(J)) return h.running;
                    var c, f, k;
                    do {
                        if (0 === b.length) break;
                        var m = e(b) == e(J),
                            p = m ? h : b.data(g) || {};
                        if (p.disabled) return !0;
                        m && (k = !0), !1 !== c && (m = b.data(ga), d.isDefined(m) && (c = m)), f = f || p.running || p.last && !p.last.isClassBased
                    } while (b = b.parent());
                    return !k || !c && f
                }
                var O = 0;
                J.data(g, h), k.$$postDigest(function() {
                    k.$$postDigest(function() {
                        h.running = !1
                    })
                });
                var W = z.classNameFilter(),
                    U = W ? function(a) {
                        return W.test(a)
                    } : function() {
                        return !0
                    };
                return {
                    enter: function(a, b, c, e) {
                        a = d.element(a), b = b && d.element(b), c = c && d.element(c), R(a), y.enter(a, b, c), k.$$postDigest(function() {
                            a = E(a), F("enter", "ng-enter", a, b, c, q, e)
                        })
                    },
                    leave: function(a, b) {
                        a = d.element(a), V(a), R(a), k.$$postDigest(function() {
                            F("leave", "ng-leave", E(a), null, null, function() {
                                y.leave(a)
                            }, b)
                        })
                    },
                    move: function(a, b, c, e) {
                        a = d.element(a), b = b && d.element(b), c = c && d.element(c), V(a), R(a), y.move(a, b, c), k.$$postDigest(function() {
                            a = E(a), F("move", "ng-move", a, b, c, q, e)
                        })
                    },
                    addClass: function(a, b, c) {
                        a = d.element(a), a = E(a), F("addClass", b, a, null, null, function() {
                            y.addClass(a, b)
                        }, c)
                    },
                    removeClass: function(a, b, c) {
                        a = d.element(a), a = E(a), F("removeClass", b, a, null, null, function() {
                            y.removeClass(a, b)
                        }, c)
                    },
                    setClass: function(a, b, c, e) {
                        a = d.element(a), a = E(a), F("setClass", [b, c], a, null, null, function() {
                            y.setClass(a, b, c)
                        }, e)
                    },
                    enabled: function(a, b) {
                        switch (arguments.length) {
                            case 2:
                                if (a) B(b);
                                else {
                                    var c = b.data(g) || {};
                                    c.disabled = !0, b.data(g, c)
                                }
                                break;
                            case 1:
                                h.disabled = !a;
                                break;
                            default:
                                a = !h.disabled
                        }
                        return !!a
                    }
                }
            }]), z.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function(g, h, z, J) {
                function K() {
                    L || (L = J(function() {
                        T = [], L = null, s = {}
                    }))
                }

                function k(a, X) {
                    L && L(), T.push(X), L = J(function() {
                        w(T, function(a) {
                            a()
                        }), T = [], L = null, s = {}
                    })
                }

                function E(a, X) {
                    var b = e(a);
                    a = d.element(b), Y.push(a), b = Date.now() + X, fa >= b || (z.cancel(ea), fa = b, ea = z(function() {
                        R(Y), Y = []
                    }, X, !1))
                }

                function R(a) {
                    w(a, function(a) {
                        (a = a.data(u)) && (a.closeAnimationFn || q)()
                    })
                }

                function I(a, b) {
                    var c = b ? s[b] : null;
                    if (!c) {
                        var h, Z, $, m, e = 0,
                            d = 0,
                            f = 0,
                            k = 0;
                        w(a, function(a) {
                            if (a.nodeType == ba) {
                                a = g.getComputedStyle(a) || {}, $ = a[p + Q], e = Math.max(M($), e), m = a[p + t], h = a[p + v], d = Math.max(M(h), d), Z = a[l + v], k = Math.max(M(Z), k);
                                var b = M(a[l + Q]);
                                b > 0 && (b *= parseInt(a[l + n], 10) || 1), f = Math.max(b, f)
                            }
                        }), c = {
                            total: 0,
                            transitionPropertyStyle: m,
                            transitionDurationStyle: $,
                            transitionDelayStyle: h,
                            transitionDelay: d,
                            transitionDuration: e,
                            animationDelayStyle: Z,
                            animationDelay: k,
                            animationDuration: f
                        }, b && (s[b] = c)
                    }
                    return c
                }

                function M(a) {
                    var b = 0;
                    return a = d.isString(a) ? a.split(/\s*,\s*/) : [], w(a, function(a) {
                        b = Math.max(parseFloat(a) || 0, b)
                    }), b
                }

                function F(a) {
                    var b = a.parent(),
                        c = b.data(x);
                    return c || (b.data(x, ++da), c = da), c + "-" + e(a).getAttribute("class")
                }

                function V(a, b, c, d) {
                    var f = F(b),
                        g = f + " " + c,
                        k = s[g] ? ++s[g].total : 0,
                        h = {};
                    if (k > 0) {
                        var m = c + "-stagger",
                            h = f + " " + m;
                        (f = !s[h]) && b.addClass(m), h = I(b, h), f && b.removeClass(m)
                    }
                    d = d || function(a) {
                        return a()
                    }, b.addClass(c);
                    var m = b.data(u) || {},
                        n = d(function() {
                            return I(b, g)
                        });
                    return d = n.transitionDuration, f = n.animationDuration, 0 === d && 0 === f ? (b.removeClass(c), !1) : (b.data(u, {
                        running: m.running || 0,
                        itemIndex: k,
                        stagger: h,
                        timings: n,
                        closeAnimationFn: q
                    }), a = 0 < m.running || "setClass" == a, d > 0 && B(b, c, a), f > 0 && 0 < h.animationDelay && 0 === h.animationDuration && (e(b).style[l] = "none 0s"), !0)
                }

                function B(a, b, c) {
                    "ng-enter" != b && "ng-move" != b && "ng-leave" != b && c ? a.addClass(S) : e(a).style[p + t] = "none"
                }

                function N(a) {
                    var c = p + t,
                        d = e(a);
                    d.style[c] && 0 < d.style[c].length && (d.style[c] = ""), a.removeClass(S)
                }

                function O(a) {
                    var b = l;
                    a = e(a), a.style[b] && 0 < a.style[b].length && (a.style[b] = "")
                }

                function W(a, b, c, d) {
                    function g(a) {
                        b.off(z, h), b.removeClass(n), f(b, c), a = e(b);
                        for (var d in s) a.style.removeProperty(s[d])
                    }

                    function h(a) {
                        a.stopPropagation();
                        var b = a.originalEvent || a;
                        a = b.$manualTimeStamp || b.timeStamp || Date.now(), b = parseFloat(b.elapsedTime.toFixed(C)), Math.max(a - y, 0) >= x && b >= t && d()
                    }
                    var k = e(b);
                    if (a = b.data(u), -1 != k.getAttribute("class").indexOf(c) && a) {
                        var n = "";
                        w(c.split(" "), function(a, b) {
                            n += (b > 0 ? " " : "") + a + "-active"
                        });
                        var p = a.stagger,
                            l = a.timings,
                            q = a.itemIndex,
                            t = Math.max(l.transitionDuration, l.animationDuration),
                            v = Math.max(l.transitionDelay, l.animationDelay),
                            x = v * ca,
                            y = Date.now(),
                            z = A + " " + H,
                            r = "",
                            s = [];
                        if (0 < l.transitionDuration) {
                            var B = l.transitionPropertyStyle; - 1 == B.indexOf("all") && (r += m + "transition-property: " + B + ";", r += m + "transition-duration: " + l.transitionDurationStyle + ";", s.push(m + "transition-property"), s.push(m + "transition-duration"))
                        }
                        return q > 0 && (0 < p.transitionDelay && 0 === p.transitionDuration && (r += m + "transition-delay: " + U(l.transitionDelayStyle, p.transitionDelay, q) + "; ", s.push(m + "transition-delay")), 0 < p.animationDelay && 0 === p.animationDuration && (r += m + "animation-delay: " + U(l.animationDelayStyle, p.animationDelay, q) + "; ", s.push(m + "animation-delay"))), 0 < s.length && (l = k.getAttribute("style") || "", k.setAttribute("style", l + "; " + r)), b.on(z, h), b.addClass(n), a.closeAnimationFn = function() {
                            g(), d()
                        }, k = (q * (Math.max(p.animationDelay, p.transitionDelay) || 0) + (v + t) * D) * ca, a.running++, E(b, k), g
                    }
                    d()
                }

                function U(a, b, c) {
                    var d = "";
                    return w(a.split(","), function(a, e) {
                        d += (e > 0 ? "," : "") + (c * b + parseInt(a, 10)) + "s"
                    }), d
                }

                function a(a, b, c, d) {
                    return V(a, b, c, d) ? function(a) {
                        a && f(b, c)
                    } : void 0
                }

                function b(a, b, c, d) {
                    return b.data(u) ? W(a, b, c, d) : (f(b, c), void d())
                }

                function c(c, d, e, f) {
                    var g = a(c, d, e);
                    if (g) {
                        var h = g;
                        return k(d, function() {
                                N(d, e), O(d), h = b(c, d, e, f)
                            }),
                            function(a) {
                                (h || q)(a)
                            }
                    }
                    K(), f()
                }

                function f(a, b) {
                    a.removeClass(b);
                    var c = a.data(u);
                    c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData(u))
                }

                function r(a, b) {
                    var c = "";
                    return a = d.isArray(a) ? a : a.split(/\s+/), w(a, function(a, d) {
                        a && 0 < a.length && (c += (d > 0 ? " " : "") + a + b)
                    }), c
                }
                var p, H, l, A, m = "";
                G.ontransitionend === P && G.onwebkittransitionend !== P ? (m = "-webkit-", p = "WebkitTransition", H = "webkitTransitionEnd transitionend") : (p = "transition", H = "transitionend"), G.onanimationend === P && G.onwebkitanimationend !== P ? (m = "-webkit-", l = "WebkitAnimation", A = "webkitAnimationEnd animationend") : (l = "animation", A = "animationend");
                var L, Q = "Duration",
                    t = "Property",
                    v = "Delay",
                    n = "IterationCount",
                    x = "$$ngAnimateKey",
                    u = "$$ngAnimateCSS3Data",
                    S = "ng-animate-block-transitions",
                    C = 3,
                    D = 1.5,
                    ca = 1e3,
                    s = {},
                    da = 0,
                    T = [],
                    ea = null,
                    fa = 0,
                    Y = [];
                return {
                    enter: function(a, b) {
                        return c("enter", a, "ng-enter", b)
                    },
                    leave: function(a, b) {
                        return c("leave", a, "ng-leave", b)
                    },
                    move: function(a, b) {
                        return c("move", a, "ng-move", b)
                    },
                    beforeSetClass: function(b, c, d, e) {
                        var f = r(d, "-remove") + " " + r(c, "-add"),
                            g = a("setClass", b, f, function(a) {
                                var e = b.attr("class");
                                return b.removeClass(d), b.addClass(c), a = a(), b.attr("class", e), a
                            });
                        return g ? (k(b, function() {
                            N(b, f), O(b), e()
                        }), g) : (K(), void e())
                    },
                    beforeAddClass: function(b, c, d) {
                        var e = a("addClass", b, r(c, "-add"), function(a) {
                            return b.addClass(c), a = a(), b.removeClass(c), a
                        });
                        return e ? (k(b, function() {
                            N(b, c), O(b), d()
                        }), e) : (K(), void d())
                    },
                    setClass: function(a, c, d, e) {
                        return d = r(d, "-remove"), c = r(c, "-add"), b("setClass", a, d + " " + c, e)
                    },
                    addClass: function(a, c, d) {
                        return b("addClass", a, r(c, "-add"), d)
                    },
                    beforeRemoveClass: function(b, c, d) {
                        var e = a("removeClass", b, r(c, "-remove"), function(a) {
                            var d = b.attr("class");
                            return b.removeClass(c), a = a(), b.attr("class", d), a
                        });
                        return e ? (k(b, function() {
                            N(b, c), O(b), d()
                        }), e) : void d()
                    },
                    removeClass: function(a, c, d) {
                        return b("removeClass", a, r(c, "-remove"), d)
                    }
                }
            }])
        }])
    }(window, window.angular),
    function(q, g, r) {
        "use strict";

        function F(a) {
            var d = [];
            return t(d, g.noop).chars(a), d.join("")
        }

        function l(a) {
            var d = {};
            a = a.split(",");
            var c;
            for (c = 0; c < a.length; c++) d[a[c]] = !0;
            return d
        }

        function G(a, d) {
            function c(a, b, c, h) {
                if (b = g.lowercase(b), u[b])
                    for (; f.last() && v[f.last()];) e("", f.last());
                w[b] && f.last() == b && e("", b), (h = x[b] || !!h) || f.push(b);
                var n = {};
                c.replace(H, function(a, b, d, c, e) {
                    n[b] = s(d || c || e || "")
                }), d.start && d.start(b, n, h)
            }

            function e(a, b) {
                var e, c = 0;
                if (b = g.lowercase(b))
                    for (c = f.length - 1; c >= 0 && f[c] != b; c--);
                if (c >= 0) {
                    for (e = f.length - 1; e >= c; e--) d.end && d.end(f[e]);
                    f.length = c
                }
            }
            "string" != typeof a && (a = null === a || "undefined" == typeof a ? "" : "" + a);
            var b, k, h, f = [],
                n = a;
            for (f.last = function() {
                    return f[f.length - 1]
                }; a;) {
                if (h = "", k = !0, f.last() && y[f.last()] ? (a = a.replace(RegExp("(.*)<\\s*\\/\\s*" + f.last() + "[^>]*>", "i"), function(a, b) {
                        return b = b.replace(I, "$1").replace(J, "$1"), d.chars && d.chars(s(b)), ""
                    }), e("", f.last())) : (0 === a.indexOf("<!--") ? (b = a.indexOf("--", 4), b >= 0 && a.lastIndexOf("-->", b) === b && (d.comment && d.comment(a.substring(4, b)), a = a.substring(b + 3), k = !1)) : z.test(a) ? (b = a.match(z)) && (a = a.replace(b[0], ""), k = !1) : K.test(a) ? (b = a.match(A)) && (a = a.substring(b[0].length), b[0].replace(A, e), k = !1) : L.test(a) && ((b = a.match(B)) ? (b[4] && (a = a.substring(b[0].length), b[0].replace(B, c)), k = !1) : (h += "<", a = a.substring(1))), k && (b = a.indexOf("<"), h += 0 > b ? a : a.substring(0, b), a = 0 > b ? "" : a.substring(b), d.chars && d.chars(s(h)))), a == n) throw M("badparse", a);
                n = a
            }
            e()
        }

        function s(a) {
            if (!a) return "";
            var d = N.exec(a);
            a = d[1];
            var c = d[3];
            return (d = d[2]) && (p.innerHTML = d.replace(/</g, "&lt;"), d = "textContent" in p ? p.textContent : p.innerText), a + d + c
        }

        function C(a) {
            return a.replace(/&/g, "&amp;").replace(O, function(a) {
                var c = a.charCodeAt(0);
                return a = a.charCodeAt(1), "&#" + (1024 * (c - 55296) + (a - 56320) + 65536) + ";"
            }).replace(P, function(a) {
                return "&#" + a.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function t(a, d) {
            var c = !1,
                e = g.bind(a, a.push);
            return {
                start: function(a, k, f) {
                    a = g.lowercase(a), !c && y[a] && (c = a), c || !0 !== D[a] || (e("<"), e(a), g.forEach(k, function(c, f) {
                        var m = g.lowercase(f),
                            k = "img" === a && "src" === m || "background" === m;
                        !0 !== Q[m] || !0 === E[m] && !d(c, k) || (e(" "), e(f), e('="'), e(C(c)), e('"'))
                    }), e(f ? "/>" : ">"))
                },
                end: function(a) {
                    a = g.lowercase(a), c || !0 !== D[a] || (e("</"), e(a), e(">")), a == c && (c = !1)
                },
                chars: function(a) {
                    c || e(C(a))
                }
            }
        }
        var M = g.$$minErr("$sanitize"),
            B = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
            A = /^<\/\s*([\w:-]+)[^>]*>/,
            H = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
            L = /^</,
            K = /^<\//,
            I = /\x3c!--(.*?)--\x3e/g,
            z = /<!DOCTYPE([^>]*?)>/i,
            J = /<!\[CDATA\[(.*?)]]\x3e/g,
            O = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            P = /([^\#-~| |!])/g,
            x = l("area,br,col,hr,img,wbr");
        q = l("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), r = l("rp,rt");
        var w = g.extend({}, r, q),
            u = g.extend({}, q, l("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
            v = g.extend({}, r, l("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
            y = l("script,style"),
            D = g.extend({}, x, u, v, w),
            E = l("background,cite,href,longdesc,src,usemap"),
            Q = g.extend({}, E, l("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),
            p = document.createElement("pre"),
            N = /^(\s*)([\s\S]*?)(\s*)$/;
        g.module("ngSanitize", []).provider("$sanitize", function() {
            this.$get = ["$$sanitizeUri", function(a) {
                return function(d) {
                    var c = [];
                    return G(d, t(c, function(c, b) {
                        return !/^unsafe/.test(a(c, b))
                    })), c.join("")
                }
            }]
        }), g.module("ngSanitize").filter("linky", ["$sanitize", function(a) {
            var d = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/,
                c = /^mailto:/;
            return function(e, b) {
                function k(a) {
                    a && m.push(F(a))
                }

                function f(a, c) {
                    m.push("<a "), g.isDefined(b) && (m.push('target="'), m.push(b), m.push('" ')), m.push('href="', a.replace('"', "&quot;"), '">'), k(c), m.push("</a>")
                }
                if (!e) return e;
                for (var n, l, p, h = e, m = []; n = h.match(d);) l = n[0], n[2] == n[3] && (l = "mailto:" + l), p = n.index, k(h.substr(0, p)), f(l, n[0].replace(c, "")), h = h.substring(p + n[0].length);
                return k(h), a(m.join(""))
            }
        }])
    }(window, window.angular);
var io = "undefined" == typeof module ? {} : module.exports;
! function() {
    if (function(a, b) {
            var c = a;
            c.version = "0.9.16", c.protocol = 1, c.transports = [], c.j = [], c.sockets = {}, c.connect = function(a, d) {
                var f, g, e = c.util.parseUri(a);
                b && b.location && (e.protocol = e.protocol || b.location.protocol.slice(0, -1), e.host = e.host || (b.document ? b.document.domain : b.location.hostname), e.port = e.port || b.location.port), f = c.util.uniqueUri(e);
                var h = {
                    host: e.host,
                    secure: "https" == e.protocol,
                    port: e.port || ("https" == e.protocol ? 443 : 80),
                    query: e.query || ""
                };
                return c.util.merge(h, d), (h["force new connection"] || !c.sockets[f]) && (g = new c.Socket(h)), !h["force new connection"] && g && (c.sockets[f] = g), g = g || c.sockets[f], g.of(e.path.length > 1 ? e.path : "")
            }
        }("object" == typeof module ? module.exports : this.io = {}, this), function(a, b) {
            var c = a.util = {},
                d = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                e = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            c.parseUri = function(a) {
                for (var b = d.exec(a || ""), c = {}, f = 14; f--;) c[e[f]] = b[f] || "";
                return c
            }, c.uniqueUri = function(a) {
                var c = a.protocol,
                    d = a.host,
                    e = a.port;
                return "document" in b ? (d = d || document.domain, e = e || ("https" == c && "https:" !== document.location.protocol ? 443 : document.location.port)) : (d = d || "localhost", !e && "https" == c && (e = 443)), (c || "http") + "://" + d + ":" + (e || 80)
            }, c.query = function(a, b) {
                var d = c.chunkQuery(a || ""),
                    e = [];
                c.merge(d, c.chunkQuery(b || ""));
                for (var f in d) d.hasOwnProperty(f) && e.push(f + "=" + d[f]);
                return e.length ? "?" + e.join("&") : ""
            }, c.chunkQuery = function(a) {
                for (var f, b = {}, c = a.split("&"), d = 0, e = c.length; e > d; ++d) f = c[d].split("="), f[0] && (b[f[0]] = f[1]);
                return b
            };
            var f = !1;
            c.load = function(a) {
                return "document" in b && "complete" === document.readyState || f ? a() : void c.on(b, "load", a, !1)
            }, c.on = function(a, b, c, d) {
                a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, d)
            }, c.request = function(a) {
                if (a && "undefined" != typeof XDomainRequest && !c.ua.hasCORS) return new XDomainRequest;
                if ("undefined" != typeof XMLHttpRequest && (!a || c.ua.hasCORS)) return new XMLHttpRequest;
                if (!a) try {
                    return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                } catch (b) {}
                return null
            }, "undefined" != typeof window && c.load(function() {
                f = !0
            }), c.defer = function(a) {
                return c.ua.webkit && "undefined" == typeof importScripts ? void c.load(function() {
                    setTimeout(a, 100)
                }) : a()
            }, c.merge = function(b, d, e, f) {
                var i, g = f || [],
                    h = "undefined" == typeof e ? 2 : e;
                for (i in d) d.hasOwnProperty(i) && c.indexOf(g, i) < 0 && ("object" == typeof b[i] && h ? c.merge(b[i], d[i], h - 1, g) : (b[i] = d[i], g.push(d[i])));
                return b
            }, c.mixin = function(a, b) {
                c.merge(a.prototype, b.prototype)
            }, c.inherit = function(a, b) {
                function c() {}
                c.prototype = b.prototype, a.prototype = new c
            }, c.isArray = Array.isArray || function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }, c.intersect = function(a, b) {
                for (var d = [], e = a.length > b.length ? a : b, f = a.length > b.length ? b : a, g = 0, h = f.length; h > g; g++) ~c.indexOf(e, f[g]) && d.push(f[g]);
                return d
            }, c.indexOf = function(a, b, c) {
                for (var d = a.length, c = 0 > c ? 0 > c + d ? 0 : c + d : c || 0; d > c && a[c] !== b; c++);
                return c >= d ? -1 : c
            }, c.toArray = function(a) {
                for (var b = [], c = 0, d = a.length; d > c; c++) b.push(a[c]);
                return b
            }, c.ua = {}, c.ua.hasCORS = "undefined" != typeof XMLHttpRequest && function() {
                try {
                    var a = new XMLHttpRequest
                } catch (b) {
                    return !1
                }
                return void 0 != a.withCredentials
            }(), c.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent), c.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)
        }("undefined" != typeof io ? io : module.exports, this), function(a, b) {
            function c() {}
            a.EventEmitter = c, c.prototype.on = function(a, c) {
                return this.$events || (this.$events = {}), this.$events[a] ? b.util.isArray(this.$events[a]) ? this.$events[a].push(c) : this.$events[a] = [this.$events[a], c] : this.$events[a] = c, this
            }, c.prototype.addListener = c.prototype.on, c.prototype.once = function(a, b) {
                function d() {
                    c.removeListener(a, d), b.apply(this, arguments)
                }
                var c = this;
                return d.listener = b, this.on(a, d), this
            }, c.prototype.removeListener = function(a, c) {
                if (this.$events && this.$events[a]) {
                    var d = this.$events[a];
                    if (b.util.isArray(d)) {
                        for (var e = -1, f = 0, g = d.length; g > f; f++)
                            if (d[f] === c || d[f].listener && d[f].listener === c) {
                                e = f;
                                break
                            }
                        if (0 > e) return this;
                        d.splice(e, 1), d.length || delete this.$events[a]
                    } else(d === c || d.listener && d.listener === c) && delete this.$events[a]
                }
                return this
            }, c.prototype.removeAllListeners = function(a) {
                return void 0 === a ? (this.$events = {}, this) : (this.$events && this.$events[a] && (this.$events[a] = null), this)
            }, c.prototype.listeners = function(a) {
                return this.$events || (this.$events = {}), this.$events[a] || (this.$events[a] = []), b.util.isArray(this.$events[a]) || (this.$events[a] = [this.$events[a]]), this.$events[a]
            }, c.prototype.emit = function(a) {
                if (!this.$events) return !1;
                var c = this.$events[a];
                if (!c) return !1;
                var d = Array.prototype.slice.call(arguments, 1);
                if ("function" == typeof c) c.apply(this, d);
                else {
                    if (!b.util.isArray(c)) return !1;
                    for (var e = c.slice(), f = 0, g = e.length; g > f; f++) e[f].apply(this, d)
                }
                return !0
            }
        }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(exports, nativeJSON) {
            function f(a) {
                return 10 > a ? "0" + a : a
            }

            function date(a) {
                return isFinite(a.valueOf()) ? a.getUTCFullYear() + "-" + f(a.getUTCMonth() + 1) + "-" + f(a.getUTCDate()) + "T" + f(a.getUTCHours()) + ":" + f(a.getUTCMinutes()) + ":" + f(a.getUTCSeconds()) + "Z" : null
            }

            function quote(a) {
                return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
                    var b = meta[a];
                    return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + a + '"'
            }

            function str(a, b) {
                var c, d, e, f, h, g = gap,
                    i = b[a];
                switch (i instanceof Date && (i = date(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
                    case "string":
                        return quote(i);
                    case "number":
                        return isFinite(i) ? String(i) : "null";
                    case "boolean":
                    case "null":
                        return String(i);
                    case "object":
                        if (!i) return "null";
                        if (gap += indent, h = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                            for (f = i.length, c = 0; f > c; c += 1) h[c] = str(c, i) || "null";
                            return e = 0 === h.length ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g, e
                        }
                        if (rep && "object" == typeof rep)
                            for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                        else
                            for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                        return e = 0 === h.length ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g, e
                }
            }
            if (nativeJSON && nativeJSON.parse) return exports.JSON = {
                parse: nativeJSON.parse,
                stringify: nativeJSON.stringify
            };
            var JSON = exports.JSON = {},
                cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                rep;
            JSON.stringify = function(a, b, c) {
                var d;
                if (gap = "", indent = "", "number" == typeof c)
                    for (d = 0; c > d; d += 1) indent += " ";
                else "string" == typeof c && (indent = c);
                if (rep = b, !b || "function" == typeof b || "object" == typeof b && "number" == typeof b.length) return str("", {
                    "": a
                });
                throw new Error("JSON.stringify")
            }, JSON.parse = function(text, reviver) {
                function walk(a, b) {
                    var c, d, e = a[b];
                    if (e && "object" == typeof e)
                        for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
                    return reviver.call(a, b, e)
                }
                var j;
                if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse")
            }
        }("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0), function(a, b) {
            var c = a.parser = {},
                d = c.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],
                e = c.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
                f = c.advice = ["reconnect"],
                g = b.JSON,
                h = b.util.indexOf;
            c.encodePacket = function(a) {
                var b = h(d, a.type),
                    c = a.id || "",
                    i = a.endpoint || "",
                    j = a.ack,
                    k = null;
                switch (a.type) {
                    case "error":
                        var l = a.reason ? h(e, a.reason) : "",
                            m = a.advice ? h(f, a.advice) : "";
                        ("" !== l || "" !== m) && (k = l + ("" !== m ? "+" + m : ""));
                        break;
                    case "message":
                        "" !== a.data && (k = a.data);
                        break;
                    case "event":
                        var n = {
                            name: a.name
                        };
                        a.args && a.args.length && (n.args = a.args), k = g.stringify(n);
                        break;
                    case "json":
                        k = g.stringify(a.data);
                        break;
                    case "connect":
                        a.qs && (k = a.qs);
                        break;
                    case "ack":
                        k = a.ackId + (a.args && a.args.length ? "+" + g.stringify(a.args) : "")
                }
                var o = [b, c + ("data" == j ? "+" : ""), i];
                return null !== k && void 0 !== k && o.push(k), o.join(":")
            }, c.encodePayload = function(a) {
                var b = "";
                if (1 == a.length) return a[0];
                for (var c = 0, d = a.length; d > c; c++) {
                    var e = a[c];
                    b += "�" + e.length + "�" + a[c]
                }
                return b
            };
            var i = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
            c.decodePacket = function(a) {
                var b = a.match(i);
                if (!b) return {};
                var c = b[2] || "",
                    a = b[5] || "",
                    h = {
                        type: d[b[1]],
                        endpoint: b[4] || ""
                    };
                switch (c && (h.id = c, h.ack = b[3] ? "data" : !0), h.type) {
                    case "error":
                        var b = a.split("+");
                        h.reason = e[b[0]] || "", h.advice = f[b[1]] || "";
                        break;
                    case "message":
                        h.data = a || "";
                        break;
                    case "event":
                        try {
                            var j = g.parse(a);
                            h.name = j.name, h.args = j.args
                        } catch (k) {}
                        h.args = h.args || [];
                        break;
                    case "json":
                        try {
                            h.data = g.parse(a)
                        } catch (k) {}
                        break;
                    case "connect":
                        h.qs = a || "";
                        break;
                    case "ack":
                        var b = a.match(/^([0-9]+)(\+)?(.*)/);
                        if (b && (h.ackId = b[1], h.args = [], b[3])) try {
                            h.args = b[3] ? g.parse(b[3]) : []
                        } catch (k) {}
                        break;
                    case "disconnect":
                    case "heartbeat":
                }
                return h
            }, c.decodePayload = function(a) {
                if ("�" == a.charAt(0)) {
                    for (var b = [], d = 1, e = ""; d < a.length; d++) "�" == a.charAt(d) ? (b.push(c.decodePacket(a.substr(d + 1).substr(0, e))), d += Number(e) + 1, e = "") : e += a.charAt(d);
                    return b
                }
                return [c.decodePacket(a)]
            }
        }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(a, b) {
            function c(a, b) {
                this.socket = a, this.sessid = b
            }
            a.Transport = c, b.util.mixin(c, b.EventEmitter), c.prototype.heartbeats = function() {
                return !0
            }, c.prototype.onData = function(a) {
                if (this.clearCloseTimeout(), (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout(), "" !== a) {
                    var c = b.parser.decodePayload(a);
                    if (c && c.length)
                        for (var d = 0, e = c.length; e > d; d++) this.onPacket(c[d])
                }
                return this
            }, c.prototype.onPacket = function(a) {
                return this.socket.setHeartbeatTimeout(), "heartbeat" == a.type ? this.onHeartbeat() : ("connect" == a.type && "" == a.endpoint && this.onConnect(), "error" == a.type && "reconnect" == a.advice && (this.isOpen = !1), this.socket.onPacket(a), this)
            }, c.prototype.setCloseTimeout = function() {
                if (!this.closeTimeout) {
                    var a = this;
                    this.closeTimeout = setTimeout(function() {
                        a.onDisconnect()
                    }, this.socket.closeTimeout)
                }
            }, c.prototype.onDisconnect = function() {
                return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
            }, c.prototype.onConnect = function() {
                return this.socket.onConnect(), this
            }, c.prototype.clearCloseTimeout = function() {
                this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
            }, c.prototype.clearTimeouts = function() {
                this.clearCloseTimeout(), this.reopenTimeout && clearTimeout(this.reopenTimeout)
            }, c.prototype.packet = function(a) {
                this.send(b.parser.encodePacket(a))
            }, c.prototype.onHeartbeat = function() {
                this.packet({
                    type: "heartbeat"
                })
            }, c.prototype.onOpen = function() {
                this.isOpen = !0, this.clearCloseTimeout(), this.socket.onOpen()
            }, c.prototype.onClose = function() {
                this.isOpen = !1, this.socket.onClose(), this.onDisconnect()
            }, c.prototype.prepareUrl = function() {
                var a = this.socket.options;
                return this.scheme() + "://" + a.host + ":" + a.port + "/" + a.resource + "/" + b.protocol + "/" + this.name + "/" + this.sessid
            }, c.prototype.ready = function(a, b) {
                b.call(this)
            }
        }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(a, b, c) {
            function d(a) {
                if (this.options = {
                        port: 80,
                        secure: !1,
                        document: "document" in c ? document : !1,
                        resource: "socket.io",
                        transports: b.transports,
                        "connect timeout": 1e4,
                        "try multiple transports": !0,
                        reconnect: !0,
                        "reconnection delay": 500,
                        "reconnection limit": 1 / 0,
                        "reopen delay": 3e3,
                        "max reconnection attempts": 10,
                        "sync disconnect on unload": !1,
                        "auto connect": !0,
                        "flash policy port": 10843,
                        manualFlush: !1
                    }, b.util.merge(this.options, a), this.connected = !1, this.open = !1, this.connecting = !1, this.reconnecting = !1, this.namespaces = {}, this.buffer = [], this.doBuffer = !1, this.options["sync disconnect on unload"] && (!this.isXDomain() || b.util.ua.hasCORS)) {
                    var d = this;
                    b.util.on(c, "beforeunload", function() {
                        d.disconnectSync()
                    }, !1)
                }
                this.options["auto connect"] && this.connect()
            }

            function e() {}
            a.Socket = d, b.util.mixin(d, b.EventEmitter), d.prototype.of = function(a) {
                return this.namespaces[a] || (this.namespaces[a] = new b.SocketNamespace(this, a), "" !== a && this.namespaces[a].packet({
                    type: "connect"
                })), this.namespaces[a]
            }, d.prototype.publish = function() {
                this.emit.apply(this, arguments);
                var a;
                for (var b in this.namespaces) this.namespaces.hasOwnProperty(b) && (a = this.of(b), a.$emit.apply(a, arguments))
            }, d.prototype.handshake = function(a) {
                function f(b) {
                    b instanceof Error ? (c.connecting = !1, c.onError(b.message)) : a.apply(null, b.split(":"))
                }
                var c = this,
                    d = this.options,
                    g = ["http" + (d.secure ? "s" : "") + ":/", d.host + ":" + d.port, d.resource, b.protocol, b.util.query(this.options.query, "t=" + +new Date)].join("/");
                if (this.isXDomain() && !b.util.ua.hasCORS) {
                    var h = document.getElementsByTagName("script")[0],
                        i = document.createElement("script");
                    i.src = g + "&jsonp=" + b.j.length, h.parentNode.insertBefore(i, h), b.j.push(function(a) {
                        f(a), i.parentNode.removeChild(i)
                    })
                } else {
                    var j = b.util.request();
                    j.open("GET", g, !0), this.isXDomain() && (j.withCredentials = !0), j.onreadystatechange = function() {
                        4 == j.readyState && (j.onreadystatechange = e, 200 == j.status ? f(j.responseText) : 403 == j.status ? c.onError(j.responseText) : (c.connecting = !1, !c.reconnecting && c.onError(j.responseText)))
                    }, j.send(null)
                }
            }, d.prototype.getTransport = function(a) {
                for (var f, c = a || this.transports, e = 0; f = c[e]; e++)
                    if (b.Transport[f] && b.Transport[f].check(this) && (!this.isXDomain() || b.Transport[f].xdomainCheck(this))) return new b.Transport[f](this, this.sessionid);
                return null
            }, d.prototype.connect = function(a) {
                if (this.connecting) return this;
                var c = this;
                return c.connecting = !0, this.handshake(function(d, e, f, g) {
                    function h(a) {
                        return c.transport && c.transport.clearTimeouts(), c.transport = c.getTransport(a), c.transport ? void c.transport.ready(c, function() {
                            c.connecting = !0, c.publish("connecting", c.transport.name), c.transport.open(), c.options["connect timeout"] && (c.connectTimeoutTimer = setTimeout(function() {
                                if (!c.connected && (c.connecting = !1, c.options["try multiple transports"])) {
                                    for (var a = c.transports; a.length > 0 && a.splice(0, 1)[0] != c.transport.name;);
                                    a.length ? h(a) : c.publish("connect_failed")
                                }
                            }, c.options["connect timeout"]))
                        }) : c.publish("connect_failed")
                    }
                    c.sessionid = d, c.closeTimeout = 1e3 * f, c.heartbeatTimeout = 1e3 * e, c.transports || (c.transports = c.origTransports = g ? b.util.intersect(g.split(","), c.options.transports) : c.options.transports), c.setHeartbeatTimeout(), h(c.transports), c.once("connect", function() {
                        clearTimeout(c.connectTimeoutTimer), a && "function" == typeof a && a()
                    })
                }), this
            }, d.prototype.setHeartbeatTimeout = function() {
                if (clearTimeout(this.heartbeatTimeoutTimer), !this.transport || this.transport.heartbeats()) {
                    var a = this;
                    this.heartbeatTimeoutTimer = setTimeout(function() {
                        a.transport.onClose()
                    }, this.heartbeatTimeout)
                }
            }, d.prototype.packet = function(a) {
                return this.connected && !this.doBuffer ? this.transport.packet(a) : this.buffer.push(a), this
            }, d.prototype.setBuffer = function(a) {
                this.doBuffer = a, !a && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
            }, d.prototype.flushBuffer = function() {
                this.transport.payload(this.buffer), this.buffer = []
            }, d.prototype.disconnect = function() {
                return (this.connected || this.connecting) && (this.open && this.of("").packet({
                    type: "disconnect"
                }), this.onDisconnect("booted")), this
            }, d.prototype.disconnectSync = function() {
                var a = b.util.request(),
                    c = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, b.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
                a.open("GET", c, !1), a.send(null), this.onDisconnect("booted")
            }, d.prototype.isXDomain = function() {
                var a = c.location.port || ("https:" == c.location.protocol ? 443 : 80);
                return this.options.host !== c.location.hostname || this.options.port != a
            }, d.prototype.onConnect = function() {
                this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
            }, d.prototype.onOpen = function() {
                this.open = !0
            }, d.prototype.onClose = function() {
                this.open = !1, clearTimeout(this.heartbeatTimeoutTimer)
            }, d.prototype.onPacket = function(a) {
                this.of(a.endpoint).onPacket(a)
            }, d.prototype.onError = function(a) {
                a && a.advice && "reconnect" === a.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect()), this.publish("error", a && a.reason ? a.reason : a)
            }, d.prototype.onDisconnect = function(a) {
                var b = this.connected,
                    c = this.connecting;
                this.connected = !1, this.connecting = !1, this.open = !1, (b || c) && (this.transport.close(), this.transport.clearTimeouts(), b && (this.publish("disconnect", a), "booted" != a && this.options.reconnect && !this.reconnecting && this.reconnect()))
            }, d.prototype.reconnect = function() {
                function e() {
                    if (a.connected) {
                        for (var b in a.namespaces) a.namespaces.hasOwnProperty(b) && "" !== b && a.namespaces[b].packet({
                            type: "connect"
                        });
                        a.publish("reconnect", a.transport.name, a.reconnectionAttempts)
                    }
                    clearTimeout(a.reconnectionTimer), a.removeListener("connect_failed", f), a.removeListener("connect", f), a.reconnecting = !1, delete a.reconnectionAttempts, delete a.reconnectionDelay, delete a.reconnectionTimer, delete a.redoTransports, a.options["try multiple transports"] = c
                }

                function f() {
                    return a.reconnecting ? a.connected ? e() : a.connecting && a.reconnecting ? a.reconnectionTimer = setTimeout(f, 1e3) : void(a.reconnectionAttempts++ >= b ? a.redoTransports ? (a.publish("reconnect_failed"), e()) : (a.on("connect_failed", f), a.options["try multiple transports"] = !0, a.transports = a.origTransports, a.transport = a.getTransport(), a.redoTransports = !0, a.connect()) : (a.reconnectionDelay < d && (a.reconnectionDelay *= 2), a.connect(), a.publish("reconnecting", a.reconnectionDelay, a.reconnectionAttempts), a.reconnectionTimer = setTimeout(f, a.reconnectionDelay))) : void 0
                }
                this.reconnecting = !0, this.reconnectionAttempts = 0, this.reconnectionDelay = this.options["reconnection delay"];
                var a = this,
                    b = this.options["max reconnection attempts"],
                    c = this.options["try multiple transports"],
                    d = this.options["reconnection limit"];
                this.options["try multiple transports"] = !1, this.reconnectionTimer = setTimeout(f, this.reconnectionDelay), this.on("connect", f)
            }
        }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(a, b) {
            function c(a, b) {
                this.socket = a, this.name = b || "", this.flags = {}, this.json = new d(this, "json"), this.ackPackets = 0, this.acks = {}
            }

            function d(a, b) {
                this.namespace = a, this.name = b
            }
            a.SocketNamespace = c, b.util.mixin(c, b.EventEmitter), c.prototype.$emit = b.EventEmitter.prototype.emit, c.prototype.of = function() {
                return this.socket.of.apply(this.socket, arguments)
            }, c.prototype.packet = function(a) {
                return a.endpoint = this.name, this.socket.packet(a), this.flags = {}, this
            }, c.prototype.send = function(a, b) {
                var c = {
                    type: this.flags.json ? "json" : "message",
                    data: a
                };
                return "function" == typeof b && (c.id = ++this.ackPackets, c.ack = !0, this.acks[c.id] = b), this.packet(c)
            }, c.prototype.emit = function(a) {
                var b = Array.prototype.slice.call(arguments, 1),
                    c = b[b.length - 1],
                    d = {
                        type: "event",
                        name: a
                    };
                return "function" == typeof c && (d.id = ++this.ackPackets, d.ack = "data", this.acks[d.id] = c, b = b.slice(0, b.length - 1)), d.args = b, this.packet(d)
            }, c.prototype.disconnect = function() {
                return "" === this.name ? this.socket.disconnect() : (this.packet({
                    type: "disconnect"
                }), this.$emit("disconnect")), this
            }, c.prototype.onPacket = function(a) {
                function d() {
                    c.packet({
                        type: "ack",
                        args: b.util.toArray(arguments),
                        ackId: a.id
                    })
                }
                var c = this;
                switch (a.type) {
                    case "connect":
                        this.$emit("connect");
                        break;
                    case "disconnect":
                        "" === this.name ? this.socket.onDisconnect(a.reason || "booted") : this.$emit("disconnect", a.reason);
                        break;
                    case "message":
                    case "json":
                        var e = ["message", a.data];
                        "data" == a.ack ? e.push(d) : a.ack && this.packet({
                            type: "ack",
                            ackId: a.id
                        }), this.$emit.apply(this, e);
                        break;
                    case "event":
                        var e = [a.name].concat(a.args);
                        "data" == a.ack && e.push(d), this.$emit.apply(this, e);
                        break;
                    case "ack":
                        this.acks[a.ackId] && (this.acks[a.ackId].apply(this, a.args), delete this.acks[a.ackId]);
                        break;
                    case "error":
                        a.advice ? this.socket.onError(a) : "unauthorized" == a.reason ? this.$emit("connect_failed", a.reason) : this.$emit("error", a.reason)
                }
            }, d.prototype.send = function() {
                this.namespace.flags[this.name] = !0, this.namespace.send.apply(this.namespace, arguments)
            }, d.prototype.emit = function() {
                this.namespace.flags[this.name] = !0, this.namespace.emit.apply(this.namespace, arguments)
            }
        }("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports), function(a, b, c) {
            function d() {
                b.Transport.apply(this, arguments)
            }
            a.websocket = d, b.util.inherit(d, b.Transport), d.prototype.name = "websocket", d.prototype.open = function() {
                var e, a = b.util.query(this.socket.options.query),
                    d = this;
                return e || (e = c.MozWebSocket || c.WebSocket), this.websocket = new e(this.prepareUrl() + a), this.websocket.onopen = function() {
                    d.onOpen(), d.socket.setBuffer(!1)
                }, this.websocket.onmessage = function(a) {
                    d.onData(a.data)
                }, this.websocket.onclose = function() {
                    d.onClose(), d.socket.setBuffer(!0)
                }, this.websocket.onerror = function(a) {
                    d.onError(a)
                }, this
            }, d.prototype.send = b.util.ua.iDevice ? function(a) {
                var b = this;
                return setTimeout(function() {
                    b.websocket.send(a)
                }, 0), this
            } : function(a) {
                return this.websocket.send(a), this
            }, d.prototype.payload = function(a) {
                for (var b = 0, c = a.length; c > b; b++) this.packet(a[b]);
                return this
            }, d.prototype.close = function() {
                return this.websocket.close(), this
            }, d.prototype.onError = function(a) {
                this.socket.onError(a)
            }, d.prototype.scheme = function() {
                return this.socket.options.secure ? "wss" : "ws"
            }, d.check = function() {
                return "WebSocket" in c && !("__addTask" in WebSocket) || "MozWebSocket" in c
            }, d.xdomainCheck = function() {
                return !0
            }, b.transports.push("websocket")
        }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), function(a, b) {
            function c() {
                b.Transport.websocket.apply(this, arguments)
            }
            a.flashsocket = c, b.util.inherit(c, b.Transport.websocket), c.prototype.name = "flashsocket", c.prototype.open = function() {
                var a = this,
                    c = arguments;
                return WebSocket.__addTask(function() {
                    b.Transport.websocket.prototype.open.apply(a, c)
                }), this
            }, c.prototype.send = function() {
                var a = this,
                    c = arguments;
                return WebSocket.__addTask(function() {
                    b.Transport.websocket.prototype.send.apply(a, c)
                }), this
            }, c.prototype.close = function() {
                return WebSocket.__tasks.length = 0, b.Transport.websocket.prototype.close.call(this), this
            }, c.prototype.ready = function(a, d) {
                function e() {
                    var b = a.options,
                        e = b["flash policy port"],
                        g = ["http" + (b.secure ? "s" : "") + ":/", b.host + ":" + b.port, b.resource, "static/flashsocket", "WebSocketMain" + (a.isXDomain() ? "Insecure" : "") + ".swf"];
                    c.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = g.join("/")), 843 !== e && WebSocket.loadFlashPolicyFile("xmlsocket://" + b.host + ":" + e), WebSocket.__initialize(), c.loaded = !0), d.call(f)
                }
                var f = this;
                return document.body ? e() : void b.util.load(e)
            }, c.check = function() {
                return "undefined" != typeof WebSocket && "__initialize" in WebSocket && swfobject ? swfobject.getFlashPlayerVersion().major >= 10 : !1
            }, c.xdomainCheck = function() {
                return !0
            }, "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0), b.transports.push("flashsocket")
        }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports), "undefined" != typeof window) var swfobject = function() {
        function A() {
            if (!t) {
                try {
                    var a = i.getElementsByTagName("body")[0].appendChild(Q("span"));
                    a.parentNode.removeChild(a)
                } catch (b) {
                    return
                }
                t = !0;
                for (var c = l.length, d = 0; c > d; d++) l[d]()
            }
        }

        function B(a) {
            t ? a() : l[l.length] = a
        }

        function C(b) {
            if (typeof h.addEventListener != a) h.addEventListener("load", b, !1);
            else if (typeof i.addEventListener != a) i.addEventListener("load", b, !1);
            else if (typeof h.attachEvent != a) R(h, "onload", b);
            else if ("function" == typeof h.onload) {
                var c = h.onload;
                h.onload = function() {
                    c(), b()
                }
            } else h.onload = b
        }

        function D() {
            k ? E() : F()
        }

        function E() {
            var c = i.getElementsByTagName("body")[0],
                d = Q(b);
            d.setAttribute("type", e);
            var f = c.appendChild(d);
            if (f) {
                var g = 0;
                ! function() {
                    if (typeof f.GetVariable != a) {
                        var b = f.GetVariable("$version");
                        b && (b = b.split(" ")[1].split(","), y.pv = [parseInt(b[0], 10), parseInt(b[1], 10), parseInt(b[2], 10)])
                    } else if (10 > g) return g++, void setTimeout(arguments.callee, 10);
                    c.removeChild(d), f = null, F()
                }()
            } else F()
        }

        function F() {
            var b = m.length;
            if (b > 0)
                for (var c = 0; b > c; c++) {
                    var d = m[c].id,
                        e = m[c].callbackFn,
                        f = {
                            success: !1,
                            id: d
                        };
                    if (y.pv[0] > 0) {
                        var g = P(d);
                        if (g)
                            if (!S(m[c].swfVersion) || y.wk && y.wk < 312)
                                if (m[c].expressInstall && H()) {
                                    var h = {};
                                    h.data = m[c].expressInstall, h.width = g.getAttribute("width") || "0", h.height = g.getAttribute("height") || "0", g.getAttribute("class") && (h.styleclass = g.getAttribute("class")), g.getAttribute("align") && (h.align = g.getAttribute("align"));
                                    for (var i = {}, j = g.getElementsByTagName("param"), k = j.length, l = 0; k > l; l++) "movie" != j[l].getAttribute("name").toLowerCase() && (i[j[l].getAttribute("name")] = j[l].getAttribute("value"));
                                    I(h, i, d, e)
                                } else J(g), e && e(f);
                        else U(d, !0), e && (f.success = !0, f.ref = G(d), e(f))
                    } else if (U(d, !0), e) {
                        var n = G(d);
                        n && typeof n.SetVariable != a && (f.success = !0, f.ref = n), e(f)
                    }
                }
        }

        function G(c) {
            var d = null,
                e = P(c);
            if (e && "OBJECT" == e.nodeName)
                if (typeof e.SetVariable != a) d = e;
                else {
                    var f = e.getElementsByTagName(b)[0];
                    f && (d = f)
                }
            return d
        }

        function H() {
            return !u && S("6.0.65") && (y.win || y.mac) && !(y.wk && y.wk < 312)
        }

        function I(b, c, d, e) {
            u = !0, r = e || null, s = {
                success: !1,
                id: d
            };
            var g = P(d);
            if (g) {
                "OBJECT" == g.nodeName ? (p = K(g), q = null) : (p = g, q = d), b.id = f, (typeof b.width == a || !/%$/.test(b.width) && parseInt(b.width, 10) < 310) && (b.width = "310"), (typeof b.height == a || !/%$/.test(b.height) && parseInt(b.height, 10) < 137) && (b.height = "137"), i.title = i.title.slice(0, 47) + " - Flash Player Installation";
                var j = y.ie && y.win ? ["Active"].concat("").join("X") : "PlugIn",
                    k = "MMredirectURL=" + h.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + j + "&MMdoctitle=" + i.title;
                if (typeof c.flashvars != a ? c.flashvars += "&" + k : c.flashvars = k, y.ie && y.win && 4 != g.readyState) {
                    var l = Q("div");
                    d += "SWFObjectNew", l.setAttribute("id", d), g.parentNode.insertBefore(l, g), g.style.display = "none",
                        function() {
                            4 == g.readyState ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10)
                        }()
                }
                L(b, c, d)
            }
        }

        function J(a) {
            if (y.ie && y.win && 4 != a.readyState) {
                var b = Q("div");
                a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(K(a), b), a.style.display = "none",
                    function() {
                        4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                    }()
            } else a.parentNode.replaceChild(K(a), a)
        }

        function K(a) {
            var c = Q("div");
            if (y.win && y.ie) c.innerHTML = a.innerHTML;
            else {
                var d = a.getElementsByTagName(b)[0];
                if (d) {
                    var e = d.childNodes;
                    if (e)
                        for (var f = e.length, g = 0; f > g; g++)(1 != e[g].nodeType || "PARAM" != e[g].nodeName) && 8 != e[g].nodeType && c.appendChild(e[g].cloneNode(!0))
                }
            }
            return c
        }

        function L(c, d, f) {
            var g, h = P(f);
            if (y.wk && y.wk < 312) return g;
            if (h)
                if (typeof c.id == a && (c.id = f), y.ie && y.win) {
                    var i = "";
                    for (var j in c) c[j] != Object.prototype[j] && ("data" == j.toLowerCase() ? d.movie = c[j] : "styleclass" == j.toLowerCase() ? i += ' class="' + c[j] + '"' : "classid" != j.toLowerCase() && (i += " " + j + '="' + c[j] + '"'));
                    var k = "";
                    for (var l in d) d[l] != Object.prototype[l] && (k += '<param name="' + l + '" value="' + d[l] + '" />');
                    h.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + k + "</object>", n[n.length] = c.id, g = P(c.id)
                } else {
                    var m = Q(b);
                    m.setAttribute("type", e);
                    for (var o in c) c[o] != Object.prototype[o] && ("styleclass" == o.toLowerCase() ? m.setAttribute("class", c[o]) : "classid" != o.toLowerCase() && m.setAttribute(o, c[o]));
                    for (var p in d) d[p] != Object.prototype[p] && "movie" != p.toLowerCase() && M(m, p, d[p]);
                    h.parentNode.replaceChild(m, h), g = m
                }
            return g
        }

        function M(a, b, c) {
            var d = Q("param");
            d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
        }

        function N(a) {
            var b = P(a);
            b && "OBJECT" == b.nodeName && (y.ie && y.win ? (b.style.display = "none", function() {
                4 == b.readyState ? O(a) : setTimeout(arguments.callee, 10)
            }()) : b.parentNode.removeChild(b))
        }

        function O(a) {
            var b = P(a);
            if (b) {
                for (var c in b) "function" == typeof b[c] && (b[c] = null);
                b.parentNode.removeChild(b)
            }
        }

        function P(a) {
            var b = null;
            try {
                b = i.getElementById(a)
            } catch (c) {}
            return b
        }

        function Q(a) {
            return i.createElement(a)
        }

        function R(a, b, c) {
            a.attachEvent(b, c), o[o.length] = [a, b, c]
        }

        function S(a) {
            var b = y.pv,
                c = a.split(".");
            return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
        }

        function T(c, d, e, f) {
            if (!y.ie || !y.mac) {
                var g = i.getElementsByTagName("head")[0];
                if (g) {
                    var h = e && "string" == typeof e ? e : "screen";
                    if (f && (v = null, w = null), !v || w != h) {
                        var j = Q("style");
                        j.setAttribute("type", "text/css"), j.setAttribute("media", h), v = g.appendChild(j), y.ie && y.win && typeof i.styleSheets != a && i.styleSheets.length > 0 && (v = i.styleSheets[i.styleSheets.length - 1]), w = h
                    }
                    y.ie && y.win ? v && typeof v.addRule == b && v.addRule(c, d) : v && typeof i.createTextNode != a && v.appendChild(i.createTextNode(c + " {" + d + "}"))
                }
            }
        }

        function U(a, b) {
            if (x) {
                var c = b ? "visible" : "hidden";
                t && P(a) ? P(a).style.visibility = c : T("#" + a, "visibility:" + c)
            }
        }

        function V(b) {
            var c = /[\\\"<>\.;]/,
                d = null != c.exec(b);
            return d && typeof encodeURIComponent != a ? encodeURIComponent(b) : b
        } {
            var p, q, r, s, v, w, a = "undefined",
                b = "object",
                c = "Shockwave Flash",
                d = "ShockwaveFlash.ShockwaveFlash",
                e = "application/x-shockwave-flash",
                f = "SWFObjectExprInst",
                g = "onreadystatechange",
                h = window,
                i = document,
                j = navigator,
                k = !1,
                l = [D],
                m = [],
                n = [],
                o = [],
                t = !1,
                u = !1,
                x = !0,
                y = function() {
                    var f = typeof i.getElementById != a && typeof i.getElementsByTagName != a && typeof i.createElement != a,
                        g = j.userAgent.toLowerCase(),
                        l = j.platform.toLowerCase(),
                        m = /win/.test(l ? l : g),
                        n = /mac/.test(l ? l : g),
                        o = /webkit/.test(g) ? parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                        p = !1,
                        q = [0, 0, 0],
                        r = null;
                    if (typeof j.plugins != a && typeof j.plugins[c] == b) r = j.plugins[c].description, r && (typeof j.mimeTypes == a || !j.mimeTypes[e] || !!j.mimeTypes[e].enabledPlugin) && (k = !0, p = !1, r = r.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), q[0] = parseInt(r.replace(/^(.*)\..*$/, "$1"), 10), q[1] = parseInt(r.replace(/^.*\.(.*)\s.*$/, "$1"), 10), q[2] = /[a-zA-Z]/.test(r) ? parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                    else if (typeof h[["Active"].concat("Object").join("X")] != a) try {
                        var s = new(window[["Active"].concat("Object").join("X")])(d);
                        s && (r = s.GetVariable("$version"), r && (p = !0, r = r.split(" ")[1].split(","), q = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]))
                    } catch (t) {}
                    return {
                        w3: f,
                        pv: q,
                        wk: o,
                        ie: p,
                        win: m,
                        mac: n
                    }
                }();
            ! function() {
                y.w3 && ((typeof i.readyState != a && "complete" == i.readyState || typeof i.readyState == a && (i.getElementsByTagName("body")[0] || i.body)) && A(), t || (typeof i.addEventListener != a && i.addEventListener("DOMContentLoaded", A, !1), y.ie && y.win && (i.attachEvent(g, function() {
                    "complete" == i.readyState && (i.detachEvent(g, arguments.callee), A())
                }), h == top && function() {
                    if (!t) {
                        try {
                            i.documentElement.doScroll("left")
                        } catch (a) {
                            return void setTimeout(arguments.callee, 0)
                        }
                        A()
                    }
                }()), y.wk && function() {
                    return t ? void 0 : /loaded|complete/.test(i.readyState) ? void A() : void setTimeout(arguments.callee, 0)
                }(), C(A)))
            }(),
            function() {
                y.ie && y.win && window.attachEvent("onunload", function() {
                    for (var a = o.length, b = 0; a > b; b++) o[b][0].detachEvent(o[b][1], o[b][2]);
                    for (var c = n.length, d = 0; c > d; d++) N(n[d]);
                    for (var e in y) y[e] = null;
                    y = null;
                    for (var f in swfobject) swfobject[f] = null;
                    swfobject = null
                })
            }()
        }
        return {
            registerObject: function(a, b, c, d) {
                if (y.w3 && a && b) {
                    var e = {};
                    e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, m[m.length] = e, U(a, !1)
                } else d && d({
                    success: !1,
                    id: a
                })
            },
            getObjectById: function(a) {
                return y.w3 ? G(a) : void 0
            },
            embedSWF: function(c, d, e, f, g, h, i, j, k, l) {
                var m = {
                    success: !1,
                    id: d
                };
                y.w3 && !(y.wk && y.wk < 312) && c && d && e && f && g ? (U(d, !1), B(function() {
                    e += "", f += "";
                    var n = {};
                    if (k && typeof k === b)
                        for (var o in k) n[o] = k[o];
                    n.data = c, n.width = e, n.height = f;
                    var p = {};
                    if (j && typeof j === b)
                        for (var q in j) p[q] = j[q];
                    if (i && typeof i === b)
                        for (var r in i) typeof p.flashvars != a ? p.flashvars += "&" + r + "=" + i[r] : p.flashvars = r + "=" + i[r];
                    if (S(g)) {
                        var s = L(n, p, d);
                        n.id == d && U(d, !0), m.success = !0, m.ref = s
                    } else {
                        if (h && H()) return n.data = h, void I(n, p, d, l);
                        U(d, !0)
                    }
                    l && l(m)
                })) : l && l(m)
            },
            switchOffAutoHideShow: function() {
                x = !1
            },
            ua: y,
            getFlashPlayerVersion: function() {
                return {
                    major: y.pv[0],
                    minor: y.pv[1],
                    release: y.pv[2]
                }
            },
            hasFlashPlayerVersion: S,
            createSWF: function(a, b, c) {
                return y.w3 ? L(a, b, c) : void 0
            },
            showExpressInstall: function(a, b, c, d) {
                y.w3 && H() && I(a, b, c, d)
            },
            removeSWF: function(a) {
                y.w3 && N(a)
            },
            createCSS: function(a, b, c, d) {
                y.w3 && T(a, b, c, d)
            },
            addDomLoadEvent: B,
            addLoadEvent: C,
            getQueryParamValue: function(a) {
                var b = i.location.search || i.location.hash;
                if (b) {
                    if (/\?/.test(b) && (b = b.split("?")[1]), null == a) return V(b);
                    for (var c = b.split("&"), d = 0; d < c.length; d++)
                        if (c[d].substring(0, c[d].indexOf("=")) == a) return V(c[d].substring(c[d].indexOf("=") + 1))
                }
                return ""
            },
            expressInstallCallback: function() {
                if (u) {
                    var a = P(f);
                    a && p && (a.parentNode.replaceChild(p, a), q && (U(q, !0), y.ie && y.win && (p.style.display = "block")), r && r(s)), u = !1
                }
            }
        }
    }();
    ! function() {
        if ("undefined" != typeof window && !window.WebSocket) {
            var a = window.console;
            return a && a.log && a.error || (a = {
                log: function() {},
                error: function() {}
            }), swfobject.hasFlashPlayerVersion("10.0.0") ? ("file:" == location.protocol && a.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(a, b, c, d, e) {
                var f = this;
                f.__id = WebSocket.__nextId++, WebSocket.__instances[f.__id] = f, f.readyState = WebSocket.CONNECTING, f.bufferedAmount = 0, f.__events = {}, b ? "string" == typeof b && (b = [b]) : b = [], setTimeout(function() {
                    WebSocket.__addTask(function() {
                        WebSocket.__flash.create(f.__id, a, b, c || null, d || 0, e || null)
                    })
                }, 0)
            }, WebSocket.prototype.send = function(a) {
                if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
                var b = WebSocket.__flash.send(this.__id, encodeURIComponent(a));
                return 0 > b ? !0 : (this.bufferedAmount += b, !1)
            }, WebSocket.prototype.close = function() {
                this.readyState != WebSocket.CLOSED && this.readyState != WebSocket.CLOSING && (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
            }, WebSocket.prototype.addEventListener = function(a, b) {
                a in this.__events || (this.__events[a] = []), this.__events[a].push(b)
            }, WebSocket.prototype.removeEventListener = function(a, b) {
                if (a in this.__events)
                    for (var d = this.__events[a], e = d.length - 1; e >= 0; --e)
                        if (d[e] === b) {
                            d.splice(e, 1);
                            break
                        }
            }, WebSocket.prototype.dispatchEvent = function(a) {
                for (var b = this.__events[a.type] || [], c = 0; c < b.length; ++c) b[c](a);
                var d = this["on" + a.type];
                d && d(a)
            }, WebSocket.prototype.__handleEvent = function(a) {
                "readyState" in a && (this.readyState = a.readyState), "protocol" in a && (this.protocol = a.protocol);
                var b;
                if ("open" == a.type || "error" == a.type) b = this.__createSimpleEvent(a.type);
                else if ("close" == a.type) b = this.__createSimpleEvent("close");
                else {
                    if ("message" != a.type) throw "unknown event type: " + a.type;
                    var c = decodeURIComponent(a.message);
                    b = this.__createMessageEvent("message", c)
                }
                this.dispatchEvent(b)
            }, WebSocket.prototype.__createSimpleEvent = function(a) {
                if (document.createEvent && window.Event) {
                    var b = document.createEvent("Event");
                    return b.initEvent(a, !1, !1), b
                }
                return {
                    type: a,
                    bubbles: !1,
                    cancelable: !1
                }
            }, WebSocket.prototype.__createMessageEvent = function(a, b) {
                if (document.createEvent && window.MessageEvent && !window.opera) {
                    var c = document.createEvent("MessageEvent");
                    return c.initMessageEvent("message", !1, !1, b, null, null, window, null), c
                }
                return {
                    type: a,
                    data: b,
                    bubbles: !1,
                    cancelable: !1
                }
            }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile = function(a) {
                WebSocket.__addTask(function() {
                    WebSocket.__flash.loadManualPolicyFile(a)
                })
            }, WebSocket.__initialize = function() {
                if (!WebSocket.__flash) {
                    if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), !window.WEB_SOCKET_SWF_LOCATION) return void a.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
                    var b = document.createElement("div");
                    b.id = "webSocketContainer", b.style.position = "absolute", WebSocket.__isFlashLite() ? (b.style.left = "0px", b.style.top = "0px") : (b.style.left = "-100px", b.style.top = "-100px");
                    var c = document.createElement("div");
                    c.id = "webSocketFlash", b.appendChild(c), document.body.appendChild(b), swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                        hasPriority: !0,
                        swliveconnect: !0,
                        allowScriptAccess: "always"
                    }, null, function(b) {
                        b.success || a.error("[WebSocket] swfobject.embedSWF failed")
                    })
                }
            }, WebSocket.__onFlashInitialized = function() {
                setTimeout(function() {
                    WebSocket.__flash = document.getElementById("webSocketFlash"), WebSocket.__flash.setCallerUrl(location.href), WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
                    for (var a = 0; a < WebSocket.__tasks.length; ++a) WebSocket.__tasks[a]();
                    WebSocket.__tasks = []
                }, 0)
            }, WebSocket.__onFlashEvent = function() {
                return setTimeout(function() {
                    try {
                        for (var b = WebSocket.__flash.receiveEvents(), c = 0; c < b.length; ++c) WebSocket.__instances[b[c].webSocketId].__handleEvent(b[c])
                    } catch (d) {
                        a.error(d)
                    }
                }, 0), !0
            }, WebSocket.__log = function(b) {
                a.log(decodeURIComponent(b))
            }, WebSocket.__error = function(b) {
                a.error(decodeURIComponent(b))
            }, WebSocket.__addTask = function(a) {
                WebSocket.__flash ? a() : WebSocket.__tasks.push(a)
            }, WebSocket.__isFlashLite = function() {
                if (!window.navigator || !window.navigator.mimeTypes) return !1;
                var a = window.navigator.mimeTypes["application/x-shockwave-flash"];
                return a && a.enabledPlugin && a.enabledPlugin.filename && a.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
            }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
                WebSocket.__initialize()
            }, !1) : window.attachEvent("onload", function() {
                WebSocket.__initialize()
            })), void 0) : void a.error("Flash Player >= 10.0.0 is required.")
        }
    }(),
    function(a, b, c) {
        function d(a) {
            a && (b.Transport.apply(this, arguments), this.sendBuffer = [])
        }

        function e() {}
        a.XHR = d, b.util.inherit(d, b.Transport), d.prototype.open = function() {
            return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
        }, d.prototype.payload = function(a) {
            for (var c = [], d = 0, e = a.length; e > d; d++) c.push(b.parser.encodePacket(a[d]));
            this.send(b.parser.encodePayload(c))
        }, d.prototype.send = function(a) {
            return this.post(a), this
        }, d.prototype.post = function(a) {
            function d() {
                4 == this.readyState && (this.onreadystatechange = e, b.posting = !1, 200 == this.status ? b.socket.setBuffer(!1) : b.onClose())
            }

            function f() {
                this.onload = e, b.socket.setBuffer(!1)
            }
            var b = this;
            this.socket.setBuffer(!0), this.sendXHR = this.request("POST"), c.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror = f : this.sendXHR.onreadystatechange = d, this.sendXHR.send(a)
        }, d.prototype.close = function() {
            return this.onClose(), this
        }, d.prototype.request = function(a) {
            var c = b.util.request(this.socket.isXDomain()),
                d = b.util.query(this.socket.options.query, "t=" + +new Date);
            if (c.open(a || "GET", this.prepareUrl() + d, !0), "POST" == a) try {
                c.setRequestHeader ? c.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : c.contentType = "text/plain"
            } catch (e) {}
            return c
        }, d.prototype.scheme = function() {
            return this.socket.options.secure ? "https" : "http"
        }, d.check = function(a, d) {
            try {
                var e = b.util.request(d),
                    f = c.XDomainRequest && e instanceof XDomainRequest,
                    g = a && a.options && a.options.secure ? "https:" : "http:",
                    h = c.location && g != c.location.protocol;
                if (e && (!f || !h)) return !0
            } catch (i) {}
            return !1
        }, d.xdomainCheck = function(a) {
            return d.check(a, !0)
        }
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this),
    function(a, b) {
        function c() {
            b.Transport.XHR.apply(this, arguments)
        }
        a.htmlfile = c, b.util.inherit(c, b.Transport.XHR), c.prototype.name = "htmlfile", c.prototype.get = function() {
            this.doc = new(window[["Active"].concat("Object").join("X")])("htmlfile"), this.doc.open(), this.doc.write("<html></html>"), this.doc.close(), this.doc.parentWindow.s = this;
            var a = this.doc.createElement("div");
            a.className = "socketio", this.doc.body.appendChild(a), this.iframe = this.doc.createElement("iframe"), a.appendChild(this.iframe);
            var c = this,
                d = b.util.query(this.socket.options.query, "t=" + +new Date);
            this.iframe.src = this.prepareUrl() + d, b.util.on(window, "unload", function() {
                c.destroy()
            })
        }, c.prototype._ = function(a, b) {
            a = a.replace(/\\\//g, "/"), this.onData(a);
            try {
                var c = b.getElementsByTagName("script")[0];
                c.parentNode.removeChild(c)
            } catch (d) {}
        }, c.prototype.destroy = function() {
            if (this.iframe) {
                try {
                    this.iframe.src = "about:blank"
                } catch (a) {}
                this.doc = null, this.iframe.parentNode.removeChild(this.iframe), this.iframe = null, CollectGarbage()
            }
        }, c.prototype.close = function() {
            return this.destroy(), b.Transport.XHR.prototype.close.call(this)
        }, c.check = function(a) {
            if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window) try {
                var c = new(window[["Active"].concat("Object").join("X")])("htmlfile");
                return c && b.Transport.XHR.check(a)
            } catch (d) {}
            return !1
        }, c.xdomainCheck = function() {
            return !1
        }, b.transports.push("htmlfile")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports),
    function(a, b, c) {
        function d() {
            b.Transport.XHR.apply(this, arguments)
        }

        function e() {}
        a["xhr-polling"] = d, b.util.inherit(d, b.Transport.XHR), b.util.merge(d, b.Transport.XHR), d.prototype.name = "xhr-polling", d.prototype.heartbeats = function() {
            return !1
        }, d.prototype.open = function() {
            var a = this;
            return b.Transport.XHR.prototype.open.call(a), !1
        }, d.prototype.get = function() {
            function b() {
                4 == this.readyState && (this.onreadystatechange = e, 200 == this.status ? (a.onData(this.responseText), a.get()) : a.onClose())
            }

            function d() {
                this.onload = e, this.onerror = e, a.retryCounter = 1, a.onData(this.responseText), a.get()
            }

            function f() {
                a.retryCounter++, !a.retryCounter || a.retryCounter > 3 ? a.onClose() : a.get()
            }
            if (this.isOpen) {
                var a = this;
                this.xhr = this.request(), c.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = d, this.xhr.onerror = f) : this.xhr.onreadystatechange = b, this.xhr.send(null)
            }
        }, d.prototype.onClose = function() {
            if (b.Transport.XHR.prototype.onClose.call(this), this.xhr) {
                this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = e;
                try {
                    this.xhr.abort()
                } catch (a) {}
                this.xhr = null
            }
        }, d.prototype.ready = function(a, c) {
            var d = this;
            b.util.defer(function() {
                c.call(d)
            })
        }, b.transports.push("xhr-polling")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this),
    function(a, b, c) {
        function e() {
            b.Transport["xhr-polling"].apply(this, arguments), this.index = b.j.length;
            var c = this;
            b.j.push(function(a) {
                c._(a)
            })
        }
        var d = c.document && "MozAppearance" in c.document.documentElement.style;
        a["jsonp-polling"] = e, b.util.inherit(e, b.Transport["xhr-polling"]), e.prototype.name = "jsonp-polling", e.prototype.post = function(a) {
            function i() {
                j(), c.socket.setBuffer(!1)
            }

            function j() {
                c.iframe && c.form.removeChild(c.iframe);
                try {
                    h = document.createElement('<iframe name="' + c.iframeId + '">')
                } catch (a) {
                    h = document.createElement("iframe"), h.name = c.iframeId
                }
                h.id = c.iframeId, c.form.appendChild(h), c.iframe = h
            }
            var c = this,
                d = b.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
            if (!this.form) {
                var h, e = document.createElement("form"),
                    f = document.createElement("textarea"),
                    g = this.iframeId = "socketio_iframe_" + this.index;
                e.className = "socketio", e.style.position = "absolute", e.style.top = "0px", e.style.left = "0px", e.style.display = "none", e.target = g, e.method = "POST", e.setAttribute("accept-charset", "utf-8"), f.name = "d", e.appendChild(f), document.body.appendChild(e), this.form = e, this.area = f
            }
            this.form.action = this.prepareUrl() + d, j(), this.area.value = b.JSON.stringify(a);
            try {
                this.form.submit()
            } catch (k) {}
            this.iframe.attachEvent ? h.onreadystatechange = function() {
                "complete" == c.iframe.readyState && i()
            } : this.iframe.onload = i, this.socket.setBuffer(!0)
        }, e.prototype.get = function() {
            var a = this,
                c = document.createElement("script"),
                e = b.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), c.async = !0, c.src = this.prepareUrl() + e, c.onerror = function() {
                a.onClose()
            };
            var f = document.getElementsByTagName("script")[0];
            f.parentNode.insertBefore(c, f), this.script = c, d && setTimeout(function() {
                var a = document.createElement("iframe");
                document.body.appendChild(a), document.body.removeChild(a)
            }, 100)
        }, e.prototype._ = function(a) {
            return this.onData(a), this.isOpen && this.get(), this
        }, e.prototype.ready = function(a, c) {
            var e = this;
            return d ? void b.util.load(function() {
                c.call(e)
            }) : c.call(this)
        }, e.check = function() {
            return "document" in c
        }, e.xdomainCheck = function() {
            return !0
        }, b.transports.push("jsonp-polling")
    }("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this), "function" == typeof define && define.amd && define([], function() {
        return io
    })
}(),
function($) {
    $.extend($.fn, {
        validate: function(options) {
            if (!this.length) return void(options && options.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var validator = $.data(this[0], "validator");
            return validator ? validator : (this.attr("novalidate", "novalidate"), validator = new $.validator(options, this[0]), $.data(this[0], "validator", validator), validator.settings.onsubmit && (this.validateDelegate(":submit", "click", function(event) {
                validator.settings.submitHandler && (validator.submitButton = event.target), $(event.target).hasClass("cancel") && (validator.cancelSubmit = !0)
            }), this.submit(function(event) {
                function handle() {
                    var hidden;
                    return validator.settings.submitHandler ? (validator.submitButton && (hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm)), validator.settings.submitHandler.call(validator, validator.currentForm, event), validator.submitButton && hidden.remove(), !1) : !0
                }
                return validator.settings.debug && event.preventDefault(), validator.cancelSubmit ? (validator.cancelSubmit = !1, handle()) : validator.form() ? validator.pendingRequest ? (validator.formSubmitted = !0, !1) : handle() : (validator.focusInvalid(), !1)
            })), validator)
        },
        valid: function() {
            if ($(this[0]).is("form")) return this.validate().form();
            var valid = !0,
                validator = $(this[0].form).validate();
            return this.each(function() {
                valid &= validator.element(this)
            }), valid
        },
        removeAttrs: function(attributes) {
            var result = {},
                $element = this;
            return $.each(attributes.split(/\s/), function(index, value) {
                result[value] = $element.attr(value), $element.removeAttr(value)
            }), result
        },
        rules: function(command, argument) {
            var element = this[0];
            if (command) {
                var settings = $.data(element.form, "validator").settings,
                    staticRules = settings.rules,
                    existingRules = $.validator.staticRules(element);
                switch (command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument)), staticRules[element.name] = existingRules, argument.messages && (settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages));
                        break;
                    case "remove":
                        if (!argument) return delete staticRules[element.name], existingRules;
                        var filtered = {};
                        return $.each(argument.split(/\s/), function(index, method) {
                            filtered[method] = existingRules[method], delete existingRules[method]
                        }), filtered
                }
            }
            var data = $.validator.normalizeRules($.extend({}, $.validator.classRules(element), $.validator.attributeRules(element), $.validator.dataRules(element), $.validator.staticRules(element)), element);
            if (data.required) {
                var param = data.required;
                delete data.required, data = $.extend({
                    required: param
                }, data)
            }
            return data
        }
    }), $.extend($.expr[":"], {
        blank: function(a) {
            return !$.trim("" + a.value)
        },
        filled: function(a) {
            return !!$.trim("" + a.value)
        },
        unchecked: function(a) {
            return !a.checked
        }
    }), $.validator = function(options, form) {
        this.settings = $.extend(!0, {}, $.validator.defaults, options), this.currentForm = form, this.init()
    }, $.validator.format = function(source, params) {
        return 1 === arguments.length ? function() {
            var args = $.makeArray(arguments);
            return args.unshift(source), $.validator.format.apply(this, args)
        } : (arguments.length > 2 && params.constructor !== Array && (params = $.makeArray(arguments).slice(1)), params.constructor !== Array && (params = [params]), $.each(params, function(i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
                return n
            })
        }), source)
    }, $.extend($.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: !0,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(element) {
                this.lastActive = element, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(element)).hide())
            },
            onfocusout: function(element) {
                this.checkable(element) || !(element.name in this.submitted) && this.optional(element) || this.element(element)
            },
            onkeyup: function(element, event) {
                (9 !== event.which || "" !== this.elementValue(element)) && (element.name in this.submitted || element === this.lastElement) && this.element(element)
            },
            onclick: function(element) {
                element.name in this.submitted ? this.element(element) : element.parentNode.name in this.submitted && this.element(element.parentNode)
            },
            highlight: function(element, errorClass, validClass) {
                "radio" === element.type ? this.findByName(element.name).addClass(errorClass).removeClass(validClass) : $(element).addClass(errorClass).removeClass(validClass)
            },
            unhighlight: function(element, errorClass, validClass) {
                "radio" === element.type ? this.findByName(element.name).removeClass(errorClass).addClass(validClass) : $(element).removeClass(errorClass).addClass(validClass)
            }
        },
        setDefaults: function(settings) {
            $.extend($.validator.defaults, settings)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function delegate(event) {
                    var validator = $.data(this[0].form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, "");
                    validator.settings[eventType] && validator.settings[eventType].call(validator, this[0], event)
                }
                this.labelContainer = $(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm), this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var groups = this.groups = {};
                $.each(this.settings.groups, function(key, value) {
                    "string" == typeof value && (value = value.split(/\s/)), $.each(value, function(index, name) {
                        groups[name] = key
                    })
                });
                var rules = this.settings.rules;
                $.each(rules, function(key, value) {
                    rules[key] = $.validator.normalizeRule(value)
                }), $(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click change ifChanged", delegate), this.settings.invalidHandler && $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function() {
                return this.checkForm(), $.extend(this.submitted, this.errorMap), this.invalid = $.extend({}, this.errorMap), this.valid() || $(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var i = 0, elements = this.currentElements = this.elements(); elements[i]; i++) this.check(elements[i]);
                return this.valid()
            },
            element: function(element) {
                element = this.validationTargetFor(this.clean(element)), this.lastElement = element, this.prepareElement(element), this.currentElements = $(element);
                var result = this.check(element) !== !1;
                return result ? delete this.invalid[element.name] : this.invalid[element.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), result
            },
            showErrors: function(errors) {
                if (errors) {
                    $.extend(this.errorMap, errors), this.errorList = [];
                    for (var name in errors) this.errorList.push({
                        message: errors[name],
                        element: this.findByName(name)[0]
                    });
                    this.successList = $.grep(this.successList, function(element) {
                        return !(element.name in errors)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                $.fn.resetForm && $(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(obj) {
                var count = 0;
                for (var i in obj) count++;
                return count
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {}
            },
            findLastActive: function() {
                var lastActive = this.lastActive;
                return lastActive && 1 === $.grep(this.errorList, function(n) {
                    return n.element.name === lastActive.name
                }).length && lastActive
            },
            elements: function() {
                var validator = this,
                    rulesCache = {};
                return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    return !this.name && validator.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in rulesCache || !validator.objectLength($(this).rules()) ? !1 : (rulesCache[this.name] = !0, !0)
                })
            },
            clean: function(selector) {
                return $(selector)[0]
            },
            errors: function() {
                var errorClass = this.settings.errorClass.replace(" ", ".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = $([]), this.toHide = $([]), this.currentElements = $([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(element) {
                this.reset(), this.toHide = this.errorsFor(element)
            },
            elementValue: function(element) {
                var type = $(element).attr("type"),
                    val = $(element).val();
                return "radio" === type || "checkbox" === type ? $("input[name='" + $(element).attr("name") + "']:checked").val() : "string" == typeof val ? val.replace(/\r/g, "") : val
            },
            check: function(element) {
                element = this.validationTargetFor(this.clean(element));
                var result, rules = $(element).rules(),
                    dependencyMismatch = !1,
                    val = this.elementValue(element);
                for (var method in rules) {
                    var rule = {
                        method: method,
                        parameters: rules[method]
                    };
                    try {
                        if (result = $.validator.methods[method].call(this, val, element, rule.parameters), "dependency-mismatch" === result) {
                            dependencyMismatch = !0;
                            continue
                        }
                        if (dependencyMismatch = !1, "pending" === result) return void(this.toHide = this.toHide.not(this.errorsFor(element)));
                        if (!result) return this.formatAndAdd(element, rule), !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occured when checking element " + element.id + ", check the '" + rule.method + "' method.", e), e
                    }
                }
                return dependencyMismatch ? void 0 : (this.objectLength(rules) && this.successList.push(element), !0)
            },
            customDataMessage: function(element, method) {
                return $(element).data("msg-" + method.toLowerCase()) || element.attributes && $(element).attr("data-msg-" + method.toLowerCase())
            },
            customMessage: function(name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method])
            },
            findDefined: function() {
                for (var i = 0; i < arguments.length; i++)
                    if (void 0 !== arguments[i]) return arguments[i];
                return void 0
            },
            defaultMessage: function(element, method) {
                return this.findDefined(this.customMessage(element.name, method), this.customDataMessage(element, method), !this.settings.ignoreTitle && element.title || void 0, $.validator.messages[method], "<strong>Warning: No message defined for " + element.name + "</strong>")
            },
            formatAndAdd: function(element, rule) {
                var message = this.defaultMessage(element, rule.method),
                    theregex = /\$?\{(\d+)\}/g;
                "function" == typeof message ? message = message.call(this, rule.parameters, element) : theregex.test(message) && (message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters)), this.errorList.push({
                    message: message,
                    element: element
                }), this.errorMap[element.name] = message, this.submitted[element.name] = message
            },
            addWrapper: function(toToggle) {
                return this.settings.wrapper && (toToggle = toToggle.add(toToggle.parent(this.settings.wrapper))), toToggle
            },
            defaultShowErrors: function() {
                var i, elements;
                for (i = 0; this.errorList[i]; i++) {
                    var error = this.errorList[i];
                    this.settings.highlight && this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass), this.showLabel(error.element, error.message)
                }
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (i = 0; this.successList[i]; i++) this.showLabel(this.successList[i]);
                if (this.settings.unhighlight)
                    for (i = 0, elements = this.validElements(); elements[i]; i++) this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return $(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(element, message) {
                var label = this.errorsFor(element);
                label.length ? (label.removeClass(this.settings.validClass).addClass(this.settings.errorClass), label.html(message), this.settings.errorPlacement && this.settings.errorPlacement(label, $(element))) : (label = $("<" + this.settings.errorElement + ">").attr("for", this.idOrName(element)).addClass(this.settings.errorClass).html(message || ""), this.settings.wrapper && (label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(label).length || (this.settings.errorPlacement ? this.settings.errorPlacement(label, $(element)) : label.insertAfter(element))), !message && this.settings.success && (label.text(""), "string" == typeof this.settings.success ? label.addClass(this.settings.success) : this.settings.success(label, element)), this.toShow = this.toShow.add(label)
            },
            errorsFor: function(element) {
                var name = this.idOrName(element);
                return this.errors().filter(function() {
                    return $(this).attr("for") === name
                })
            },
            idOrName: function(element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name)
            },
            validationTargetFor: function(element) {
                return this.checkable(element) && (element = this.findByName(element.name).not(this.settings.ignore)[0]), element
            },
            checkable: function(element) {
                return /radio|checkbox/i.test(element.type)
            },
            findByName: function(name) {
                return $(this.currentForm).find("[name='" + name + "']")
            },
            getLength: function(value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) return this.findByName(element.name).filter(":checked").length
                }
                return value.length
            },
            depend: function(param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : !0
            },
            dependTypes: {
                "boolean": function(param) {
                    return param
                },
                string: function(param, element) {
                    return !!$(param, element.form).length
                },
                "function": function(param, element) {
                    return param(element)
                }
            },
            optional: function(element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch"
            },
            startRequest: function(element) {
                this.pending[element.name] || (this.pendingRequest++, this.pending[element.name] = !0)
            },
            stopRequest: function(element, valid) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[element.name], valid && 0 === this.pendingRequest && this.formSubmitted && this.form() ? ($(this.currentForm).submit(), this.formSubmitted = !1) : !valid && 0 === this.pendingRequest && this.formSubmitted && ($(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(element, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(className, rules) {
            className.constructor === String ? this.classRuleSettings[className] = rules : $.extend(this.classRuleSettings, className)
        },
        classRules: function(element) {
            var rules = {},
                classes = $(element).attr("class");
            return classes && $.each(classes.split(" "), function() {
                this in $.validator.classRuleSettings && $.extend(rules, $.validator.classRuleSettings[this])
            }), rules
        },
        attributeRules: function(element) {
            var rules = {},
                $element = $(element);
            for (var method in $.validator.methods) {
                var value;
                "required" === method ? (value = $element.get(0).getAttribute(method), "" === value && (value = !0), value = !!value) : value = $element.attr(method), value ? rules[method] = value : $element[0].getAttribute("type") === method && (rules[method] = !0)
            }
            return rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) && delete rules.maxlength, rules
        },
        dataRules: function(element) {
            var method, value, rules = {},
                $element = $(element);
            for (method in $.validator.methods) value = $element.data("rule-" + method.toLowerCase()), void 0 !== value && (rules[method] = value);
            return rules
        },
        staticRules: function(element) {
            var rules = {},
                validator = $.data(element.form, "validator");
            return validator.settings.rules && (rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {}), rules
        },
        normalizeRules: function(rules, element) {
            return $.each(rules, function(prop, val) {
                if (val === !1) return void delete rules[prop];
                if (val.param || val.depends) {
                    var keepRule = !0;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element)
                    }
                    keepRule ? rules[prop] = void 0 !== val.param ? val.param : !0 : delete rules[prop]
                }
            }), $.each(rules, function(rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter
            }), $.each(["minlength", "maxlength"], function() {
                rules[this] && (rules[this] = Number(rules[this]))
            }), $.each(["rangelength"], function() {
                var parts;
                rules[this] && ($.isArray(rules[this]) ? rules[this] = [Number(rules[this][0]), Number(rules[this][1])] : "string" == typeof rules[this] && (parts = rules[this].split(/[\s,]+/), rules[this] = [Number(parts[0]), Number(parts[1])]))
            }), $.validator.autoCreateRanges && (rules.min && rules.max && (rules.range = [rules.min, rules.max], delete rules.min, delete rules.max), rules.minlength && rules.maxlength && (rules.rangelength = [rules.minlength, rules.maxlength], delete rules.minlength, delete rules.maxlength)), rules
        },
        normalizeRule: function(data) {
            if ("string" == typeof data) {
                var transformed = {};
                $.each(data.split(/\s/), function() {
                    transformed[this] = !0
                }), data = transformed
            }
            return data
        },
        addMethod: function(name, method, message) {
            $.validator.methods[name] = method, $.validator.messages[name] = void 0 !== message ? message : $.validator.messages[name], method.length < 3 && $.validator.addClassRules(name, $.validator.normalizeRule(name))
        },
        methods: {
            required: function(value, element, param) {
                if (!this.depend(param, element)) return "dependency-mismatch";
                if ("select" === element.nodeName.toLowerCase()) {
                    var val = $(element).val();
                    return val && val.length > 0
                }
                return this.checkable(element) ? this.getLength(value, element) > 0 : $.trim(value).length > 0
            },
            remote: function(value, element, param) {
                if (this.optional(element)) return "dependency-mismatch";
                var previous = this.previousValue(element);
                if (this.settings.messages[element.name] || (this.settings.messages[element.name] = {}), previous.originalMessage = this.settings.messages[element.name].remote, this.settings.messages[element.name].remote = previous.message, param = "string" == typeof param && {
                        url: param
                    } || param, previous.old === value) return previous.valid;
                previous.old = value;
                var validator = this;
                this.startRequest(element);
                var data = {};
                return data[element.name] = value, $.ajax($.extend(!0, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        var valid = response === !0 || "true" === response;
                        if (valid) {
                            var submitted = validator.formSubmitted;
                            validator.prepareElement(element), validator.formSubmitted = submitted, validator.successList.push(element), delete validator.invalid[element.name], validator.showErrors()
                        } else {
                            var errors = {},
                                message = response || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message, validator.invalid[element.name] = !0, validator.showErrors(errors)
                        }
                        previous.valid = valid, validator.stopRequest(element, valid)
                    }
                }, param)), "pending"
            },
            minlength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length >= param
            },
            maxlength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || param >= length
            },
            rangelength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length >= param[0] && length <= param[1]
            },
            min: function(value, element, param) {
                return this.optional(element) || value >= param
            },
            max: function(value, element, param) {
                return this.optional(element) || param >= value
            },
            range: function(value, element, param) {
                return this.optional(element) || value >= param[0] && value <= param[1]
            },
            email: function(value, element) {
                return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)
            },
            url: function(value, element) {
                return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
            },
            date: function(value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString())
            },
            dateISO: function(value, element) {
                return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value)
            },
            number: function(value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
            },
            digits: function(value, element) {
                return this.optional(element) || /^\d+$/.test(value)
            },
            creditcard: function(value, element) {
                if (this.optional(element)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(value)) return !1;
                var nCheck = 0,
                    nDigit = 0,
                    bEven = !1;
                value = value.replace(/\D/g, "");
                for (var n = value.length - 1; n >= 0; n--) {
                    var cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10), bEven && (nDigit *= 2) > 9 && (nDigit -= 9), nCheck += nDigit, bEven = !bEven
                }
                return nCheck % 10 === 0
            },
            equalTo: function(value, element, param) {
                var target = $(param);
                return this.settings.onfocusout && target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    $(element).valid()
                }), value === target.val()
            }
        }
    }), $.format = $.validator.format
}(jQuery),
function($) {
    var pendingRequests = {};
    if ($.ajaxPrefilter) $.ajaxPrefilter(function(settings, _, xhr) {
        var port = settings.port;
        "abort" === settings.mode && (pendingRequests[port] && pendingRequests[port].abort(), pendingRequests[port] = xhr)
    });
    else {
        var ajax = $.ajax;
        $.ajax = function(settings) {
            var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                port = ("port" in settings ? settings : $.ajaxSettings).port;
            return "abort" === mode ? (pendingRequests[port] && pendingRequests[port].abort(), pendingRequests[port] = ajax.apply(this, arguments)) : ajax.apply(this, arguments)
        }
    }
}(jQuery),
function($) {
    $.extend($.fn, {
        validateDelegate: function(delegate, type, handler) {
            return this.bind(type, function(event) {
                var target = $(event.target);
                return target.is(delegate) ? handler.apply(target, arguments) : void 0
            })
        }
    })
}(jQuery),
function() {
    function stripHtml(value) {
        return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/[.(),;:!?%#$'"_+=\/\-]*/g, "")
    }
    jQuery.validator.addMethod("maxWords", function(value, element, params) {
        return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length <= params
    }, jQuery.validator.format("Please enter {0} words or less.")), jQuery.validator.addMethod("minWords", function(value, element, params) {
        return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params
    }, jQuery.validator.format("Please enter at least {0} words.")), jQuery.validator.addMethod("rangeWords", function(value, element, params) {
        var valueStripped = stripHtml(value),
            regex = /\b\w+\b/g;
        return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1]
    }, jQuery.validator.format("Please enter between {0} and {1} words."))
}(), jQuery.validator.addMethod("letterswithbasicpunc", function(value, element) {
    return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value)
}, "Letters or punctuation only please"), jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^\w+$/i.test(value)
}, "Letters, numbers, and underscores only please"), jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value)
}, "Letters only please"), jQuery.validator.addMethod("nowhitespace", function(value, element) {
    return this.optional(element) || /^\S+$/i.test(value)
}, "No white space please"), jQuery.validator.addMethod("ziprange", function(value, element) {
    return this.optional(element) || /^90[2-5]\d\{2\}-\d{4}$/.test(value)
}, "Your ZIP-code must be in the range 902xx-xxxx to 905-xx-xxxx"), jQuery.validator.addMethod("zipcodeUS", function(value, element) {
    return this.optional(element) || /\d{5}-\d{4}$|^\d{5}$/.test(value)
}, "The specified US ZIP Code is invalid"), jQuery.validator.addMethod("integer", function(value, element) {
    return this.optional(element) || /^-?\d+$/.test(value)
}, "A positive or negative non-decimal number please"), jQuery.validator.addMethod("vinUS", function(v) {
    if (17 !== v.length) return !1;
    var i, n, d, f, cd, cdv, LL = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        VL = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9],
        FL = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2],
        rs = 0;
    for (i = 0; 17 > i; i++) {
        if (f = FL[i], d = v.slice(i, i + 1), 8 === i && (cdv = d), isNaN(d)) {
            for (n = 0; n < LL.length; n++)
                if (d.toUpperCase() === LL[n]) {
                    d = VL[n], d *= f, isNaN(cdv) && 8 === n && (cdv = LL[n]);
                    break
                }
        } else d *= f;
        rs += d
    }
    return cd = rs % 11, 10 === cd && (cd = "X"), cd === cdv ? !0 : !1
}, "The specified vehicle identification number (VIN) is invalid."), jQuery.validator.addMethod("dateITA", function(value, element) {
    var check = !1,
        re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (re.test(value)) {
        var adata = value.split("/"),
            gg = parseInt(adata[0], 10),
            mm = parseInt(adata[1], 10),
            aaaa = parseInt(adata[2], 10),
            xdata = new Date(aaaa, mm - 1, gg);
        check = xdata.getFullYear() === aaaa && xdata.getMonth() === mm - 1 && xdata.getDate() === gg ? !0 : !1
    } else check = !1;
    return this.optional(element) || check
}, "Please enter a correct date"), jQuery.validator.addMethod("dateNL", function(value, element) {
    return this.optional(element) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(value)
}, "Vul hier een geldige datum in."), jQuery.validator.addMethod("time", function(value, element) {
    return this.optional(element) || /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/.test(value)
}, "Please enter a valid time, between 00:00 and 23:59"), jQuery.validator.addMethod("time12h", function(value, element) {
    return this.optional(element) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}( ?[AP]M))$/i.test(value)
}, "Please enter a valid time in 12-hour format"), jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
    return phone_number = phone_number.replace(/\s+/g, ""), this.optional(element) || phone_number.length > 9 && phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)
}, "Please specify a valid phone number"), jQuery.validator.addMethod("phoneUK", function(phone_number, element) {
    return phone_number = phone_number.replace(/\(|\)|\s+|-/g, ""), this.optional(element) || phone_number.length > 9 && phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:(?:\d{5}\)?\s?\d{4,5})|(?:\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3}))|(?:\d{3}\)?\s?\d{3}\s?\d{3,4})|(?:\d{2}\)?\s?\d{4}\s?\d{4}))$/)
}, "Please specify a valid phone number"), jQuery.validator.addMethod("mobileUK", function(phone_number, element) {
    return phone_number = phone_number.replace(/\s+|-/g, ""), this.optional(element) || phone_number.length > 9 && phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[45789]\d{2}|624)\s?\d{3}\s?\d{3})$/)
}, "Please specify a valid mobile number"), jQuery.validator.addMethod("phonesUK", function(phone_number, element) {
    return phone_number = phone_number.replace(/\s+|-/g, ""), this.optional(element) || phone_number.length > 9 && phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[45789]\d{8}|624\d{6})))$/)
}, "Please specify a valid uk phone number"), jQuery.validator.addMethod("postcodeUK", function(postcode, element) {
    return postcode = postcode.toUpperCase().replace(/\s+/g, ""), this.optional(element) || postcode.match(/^([^QZ][^IJZ]{0,1}\d{1,2})(\d[^CIKMOV]{2})$/) || postcode.match(/^([^QV]\d[ABCDEFGHJKSTUW])(\d[^CIKMOV]{2})$/) || postcode.match(/^([^QV][^IJZ]\d[ABEHMNPRVWXY])(\d[^CIKMOV]{2})$/) || postcode.match(/^(GIR)(0AA)$/) || postcode.match(/^(BFPO)(\d{1,4})$/) || postcode.match(/^(BFPO)(C\/O\d{1,3})$/)
}, "Please specify a valid postcode"), jQuery.validator.addMethod("strippedminlength", function(value, element, param) {
    return jQuery(value).text().length >= param
}, jQuery.validator.format("Please enter at least {0} characters")), jQuery.validator.addMethod("email2", function(value, element) {
    return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value)
}, jQuery.validator.messages.email), jQuery.validator.addMethod("url2", function(value, element) {
    return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
}, jQuery.validator.messages.url), jQuery.validator.addMethod("creditcardtypes", function(value, element, param) {
    if (/[^0-9\-]+/.test(value)) return !1;
    value = value.replace(/\D/g, "");
    var validTypes = 0;
    return param.mastercard && (validTypes |= 1), param.visa && (validTypes |= 2), param.amex && (validTypes |= 4), param.dinersclub && (validTypes |= 8), param.enroute && (validTypes |= 16), param.discover && (validTypes |= 32), param.jcb && (validTypes |= 64), param.unknown && (validTypes |= 128), param.all && (validTypes = 255), 1 & validTypes && /^(5[12345])/.test(value) ? 16 === value.length : 2 & validTypes && /^(4)/.test(value) ? 16 === value.length : 4 & validTypes && /^(3[47])/.test(value) ? 15 === value.length : 8 & validTypes && /^(3(0[012345]|[68]))/.test(value) ? 14 === value.length : 16 & validTypes && /^(2(014|149))/.test(value) ? 15 === value.length : 32 & validTypes && /^(6011)/.test(value) ? 16 === value.length : 64 & validTypes && /^(3)/.test(value) ? 16 === value.length : 64 & validTypes && /^(2131|1800)/.test(value) ? 15 === value.length : 128 & validTypes ? !0 : !1
}, "Please enter a valid credit card number."), jQuery.validator.addMethod("ipv4", function(value, element) {
    return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value)
}, "Please enter a valid IP v4 address."), jQuery.validator.addMethod("ipv6", function(value, element) {
    return this.optional(element) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value)
}, "Please enter a valid IP v6 address."), jQuery.validator.addMethod("pattern", function(value, element, param) {
    return this.optional(element) ? !0 : ("string" == typeof param && (param = new RegExp("^(?:" + param + ")$")), param.test(value))
}, "Invalid format."), jQuery.validator.addMethod("require_from_group", function(value, element, options) {
    var validator = this,
        selector = options[1],
        validOrNot = $(selector, element.form).filter(function() {
            return validator.elementValue(this)
        }).length >= options[0];
    if (!$(element).data("being_validated")) {
        var fields = $(selector, element.form);
        fields.data("being_validated", !0), fields.valid(), fields.data("being_validated", !1)
    }
    return validOrNot
}, jQuery.format("Please fill at least {0} of these fields.")), jQuery.validator.addMethod("skip_or_fill_minimum", function(value, element, options) {
    var validator = this,
        numberRequired = options[0],
        selector = options[1],
        numberFilled = $(selector, element.form).filter(function() {
            return validator.elementValue(this)
        }).length,
        valid = numberFilled >= numberRequired || 0 === numberFilled;
    if (!$(element).data("being_validated")) {
        var fields = $(selector, element.form);
        fields.data("being_validated", !0), fields.valid(), fields.data("being_validated", !1)
    }
    return valid
}, jQuery.format("Please either skip these fields or fill at least {0} of them.")), jQuery.validator.addMethod("accept", function(value, element, param) {
    var i, file, typeParam = "string" == typeof param ? param.replace(/\s/g, "").replace(/,/g, "|") : "image/*",
        optionalValue = this.optional(element);
    if (optionalValue) return optionalValue;
    if ("file" === $(element).attr("type") && (typeParam = typeParam.replace(/\*/g, ".*"), element.files && element.files.length))
        for (i = 0; i < element.files.length; i++)
            if (file = element.files[i], !file.type.match(new RegExp(".?(" + typeParam + ")$", "i"))) return !1;
    return !0
}, jQuery.format("Please enter a value with a valid mimetype.")), jQuery.validator.addMethod("extension", function(value, element, param) {
    return param = "string" == typeof param ? param.replace(/,/g, "|") : "png|jpe?g|gif", this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"))
}, jQuery.format("Please enter a value with a valid extension.")), jQuery.extend(jQuery.validator.messages, {
    required: "Campo obrigatório",
    equalTo: "O campo inserido terá de ser igual. Por favor, insira novamente.",
    remote: "Please fix this field.",
    email: "Por favor, insira um e-mail válido.",
    url: "Por favor, insira um url válido. Por exemplo: http://www.axa.pt",
    date: "Por favor, insira uma data válida.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Por favor, insira apenas números.",
    creditcard: "Please enter a valid credit card number.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Por favor, insira no máximo {0} caracteres."),
    minlength: jQuery.validator.format("Por favor, insira pelo menos {0} caracteres."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Por favor no máximo {0} elementos."),
    min: jQuery.validator.format("Por favor insira pelo menos {0} elemento."),
    postalcode_pt: "Por favor, insira o código postal no formato correto. Ex.: 1600-077"
}), FormBuilder.prototype.createValidation = function(validationParams) {
    var _this = this,
        rules = [];
    isDefined(validationParams.messages) && this.addValidationMessages(validationParams.messages), isDefined(validationParams.rules) && (rules = validationParams.rules), this.formValidator = this.form.validate({
        ignore: isDefined(validationParams.ignore),
        rules: rules,
        errorPlacement: function(error, element) {
            _this.errorPlacement(error, element)
        },
        success: function(error, element) {
            _this.validationSuccess(error, element)
        }
    })
}, FormBuilder.prototype.addValidationMessages = function(messagesObject) {
    jQuery.extend(jQuery.validator.messages, messagesObject)
}, FormBuilder.prototype.errorPlacement = function(error, ele) {
    var element = $(ele),
        parentData = $(ele).data("parentLineSelector"),
        err = null;
    err = isDefined(parentData, !1) ? $(parentData).find(isDefined(this.params.error_selector, ".frm-error")) : element.closest(isDefined(this.params.parent_line_selector, ".form-group")).find(isDefined(this.params.error_selector, ".frm-error")), err.html(error), err.show()
}, FormBuilder.prototype.validationSuccess = function(error, ele) {
    var element = $(ele),
        parentData = $(ele).data("parentLineSelector"),
        err = null;
    err = isDefined(parentData, !1) ? $(parentData).find(isDefined(this.params.error_selector, ".frm-error")) : element.closest(isDefined(this.params.parent_line_selector, ".form-group")).find(isDefined(this.params.error_selector, ".frm-error")), err.hide()
}, FormBuilder.prototype.submitForm = function() {
    this.formValidator.form()
}, FormBuilder.prototype.createConditionalRequired = function(conditions) {
    for (var i = 0; i < conditions.length; i++) {
        var obj = conditions[i];
        this.bindConditionals(obj)
    }
}, FormBuilder.prototype.bindConditionals = function(obj) {
    function eventHandler() {
        var startsWith = !1;
        null != startCheck && (startsWith = 0 == cond.val().indexOf(startCheck.toLowerCase()) || 0 == cond.val().indexOf(startCheck));
        var rules = {
            required: !0
        };
        for (var prop in rulesObj) rules[prop] = rulesObj[prop];
        if (cond.is(":checked") || cond.val() == val && null != val || startsWith) req.rules("add", rules), blockToShow.length > 0 && blockToShow.show();
        else {
            for (var removeProp in rules) req.rules("remove", removeProp);
            blockToShow.length > 0 && blockToShow.hide()
        }
    }
    var idVal = (new Date).getTime(),
        req = $(obj.required_selector),
        cond = $(obj.condition_selector),
        rulesObj = isDefined(obj.rules, {}),
        startCheck = isDefined(obj.starts_with, null),
        blockToShow = "undefined" != typeof obj.parent_block ? req.parents(obj.parent_block) : [],
        val = isDefined(obj.value_to_check, null);
    cond.bind("change.FormBuilder" + idVal + " ifChanged.FormBuilder" + idVal + " keyup.FormBuilder" + idVal, eventHandler), eventHandler()
}, jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b
    },
    easeInOutQuad: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t + b : -c / 2 * (--t * (t - 2) - 1) + b
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOutCubic: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOutQuart: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t * t + b : -c / 2 * ((t -= 2) * t * t * t - 2) + b
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOutQuint: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? c / 2 * t * t * t * t * t + b : c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },
    easeInExpo: function(x, t, b, c, d) {
        return 0 == t ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOutExpo: function(x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOutExpo: function(x, t, b, c, d) {
        return 0 == t ? b : t == d ? b + c : (t /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (t - 1)) + b : c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOutCirc: function(x, t, b, c, d) {
        return (t /= d / 2) < 1 ? -c / 2 * (Math.sqrt(1 - t * t) - 1) + b : c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158,
            p = 0,
            a = c;
        if (0 == t) return b;
        if (1 == (t /= d)) return b + c;
        if (p || (p = .3 * d), a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * d - s) * Math.PI / p)) + b
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158,
            p = 0,
            a = c;
        if (0 == t) return b;
        if (1 == (t /= d)) return b + c;
        if (p || (p = .3 * d), a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin(2 * (t * d - s) * Math.PI / p) + c + b
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158,
            p = 0,
            a = c;
        if (0 == t) return b;
        if (2 == (t /= d / 2)) return b + c;
        if (p || (p = .3 * d * 1.5), a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return 1 > t ? -.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * d - s) * Math.PI / p) + b : a * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * d - s) * Math.PI / p) * .5 + c + b
    },
    easeInBack: function(x, t, b, c, d, s) {
        return void 0 == s && (s = 1.70158), c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOutBack: function(x, t, b, c, d, s) {
        return void 0 == s && (s = 1.70158), c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        return void 0 == s && (s = 1.70158), (t /= d / 2) < 1 ? c / 2 * t * t * (((s *= 1.525) + 1) * t - s) + b : c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
    },
    easeOutBounce: function(x, t, b, c, d) {
        return (t /= d) < 1 / 2.75 ? 7.5625 * c * t * t + b : 2 / 2.75 > t ? c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b : 2.5 / 2.75 > t ? c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b : c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b
    },
    easeInOutBounce: function(x, t, b, c, d) {
        return d / 2 > t ? .5 * jQuery.easing.easeInBounce(x, 2 * t, 0, c, d) + b : .5 * jQuery.easing.easeOutBounce(x, 2 * t - d, 0, c, d) + .5 * c + b
    }
});
var _portfolio, _scrollControl, _navigationControl, _profileGallery, _contactForm;
window.mobilecheck = function() {
    var check = !1;
    return function(a) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) && (check = !0)
    }(navigator.userAgent || navigator.vendor || window.opera), check
};
var harishPortfolioApp = angular.module("harishPortfolioApp", ["ngSanitize", "ngAnimate"], ["$interpolateProvider", function($interpolateProvider) {
    $interpolateProvider.startSymbol("[["), $interpolateProvider.endSymbol("]]")
}]);
harishPortfolioApp.config(["$controllerProvider", "$animateProvider", function($controllerProvider, $animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/)
}]), harishPortfolioApp.filter("reverse", function() {
    return function(items) {
        return items.slice().reverse()
    }
}), Portfolio.prototype.show = function(e, id) {
    e.preventDefault(), this.scope.current = this.projects[id], ga("send", "event", "Portfolio", this.projects[id].title), this.modal = !0, this.resizeHandler(!1)
}, Portfolio.prototype.hide = function() {
    this.modal = !1
}, Portfolio.prototype.showDetailImage = function(images, item) {
    for (var i = 0; i < images.length; i++) images[i].active = images[i] == item
}, Portfolio.prototype.scrollHandler = function() {
    var vTop = this.win.scrollTop();
    if (vTop >= this.blockTop && vTop <= this.blockTop + this.blockH - this.modalH - 120 - 60) {
        var valueToSet = vTop - this.blockTop;
        this.modalObj.css({
            top: valueToSet
        })
    }
}, Portfolio.prototype.resizeHandler = function(isResize) {
    var newW = this.win.width();
    return this.winW == newW && isResize ? !1 : (this.winW = newW, this.blockH = this.block.outerHeight(), this.modalH = this.modalObj.height(), this.blockTop = this.block.offset().top, isResize && this.modalObj.css({
        top: 0
    }), void this.scrollHandler())
}, ScrollControler.prototype.scrollHandler = function() {
    this.scrollT = this.win.scrollTop(), this.scrollT + this.winH >= this.objCon.posTop + this.winH / 2 && !this.objCon.hasAnimClass && this.isAnim && (this.objCon.addClass("anim"), this.objCon.hasAnimClass = !0)
}, ScrollControler.prototype.refreshPositions = function() {
    this.objCon.posTop = this.objCon.offset().top
}, ScrollControler.prototype.resizeHandler = function() {
    var _this = this,
        newW = this.win.width(),
        newH = this.win.height();
    return this.winW == newW && this.winH == newH ? !1 : (this.winH = newH, this.winW = newW, this.refreshPositions(), this.objConLks.css(this.winW < 902 ? {
        marginLeft: -((902 - this.winW) / 2)
    } : {
        marginLeft: 0
    }), this.objCon.removeClass("anim"), clearTimeout(this.timeOut), void(this.timeOut = setTimeout(function() {
        _this.objCon.hasAnimClass = !1, _this.scrollHandler()
    }, 100)))
}, Navigation.prototype.goToItem = function(obj) {
    this.scrollable.stop(!0, !1);
    var posGoTo, tar = (obj.attr("href").replace("#", "/"), obj.attr("data-" + this.targetAttr)),
        goTo = $("[data-" + this.contAttr + '="' + tar + '"]').eq(0);
    ga("send", "pageview", "/" + obj.text().toLowerCase()), posGoTo = "true" == goTo.attr("data-center") ? goTo.offset().top - (_scrollControl.winH / 2 - goTo.outerHeight() / 2) : goTo.offset().top, this.scrollable.animate({
        scrollTop: posGoTo - 48
    }, 1800, "easeInOutQuint")
}, Navigation.prototype.scrollHandler = function() {
    var _this = this,
        current = -1,
        valTop = this.win.scrollTop();
    valTop >= this.openMenuVal ? this.body.addClass("opened") : this.body.removeClass("opened");
    for (var i = 0; i < this.secTops.length; i++) {
        var obj = this.secTops[i];
        valTop >= obj - _this.winH / 2 && valTop < this.secTops[i + 1] - _this.winH / 2 && (current = i)
    }
    this.navItems.removeClass("act"), -1 != current && this.navItems.eq(current).addClass("act")
}, Navigation.prototype.resizeHandler = function() {
    this.winW = this.win.width(), this.winH = this.win.height(), this.openMenuVal = this.winW > 900 ? 68 : 0, this.secTops = [];
    for (var z = 0; z < this.sections.length; z++) this.secTops.push(this.sections.eq(z).offset().top);
    this.secTops.push(this.totalH), this.scrollHandler()
}, ProfileGallery.prototype.startTimeout = function() {
    var that = this;
    this.timer = setTimeout(function() {
        that.changeImage()
    }, 4e3)
}, ProfileGallery.prototype.changeImage = function() {
    this.stopTimeout();
    var cur = this.ci;
    this.imgList.eq(cur).fadeOut(1700), cur + 1 >= this.lgth ? cur = 0 : cur++, this.imgList.eq(cur).fadeIn(1700), this.ci = cur, this.startTimeout()
}, ProfileGallery.prototype.stopTimeout = function() {
    clearTimeout(this.timer)
}, ContactForm.prototype.sendEmail = function() {
    var _this = this;
    this.cont.addClass("sending"), $.ajax({
        type: "POST",
        url: "/sendEmail",
        data: this.cont.serialize(),
        success: function(data) {
            data.success ? _this.successSendingEmail() : _this.errorSendingEmail()
        },
        error: function() {
            _this.errorSendingEmail()
        }
    })
}, ContactForm.prototype.successSendingEmail = function() {
    this.cont.addClass("success"), this.cont.removeClass("sending")
}, ContactForm.prototype.errorSendingEmail = function() {
    this.cont.removeClass("sending"), this.cont.removeClass("success")
}, TwitterWall.prototype.processTweetData = function(data) {
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        this.showTweet(this.createTweet(obj))
    }
    this.scope.$digest()
}, TwitterWall.prototype.connectFirst = function() {
    var _this = this;
    $.ajax({
        url: "/getFirstTweets",
        type: "POST",
        dataType: "json",
        data: {
            token: $("#tweetToken").val()
        },
        success: function(res) {
            res.success && (_this.processTweetData(res.tweets), _this.socket = io.connect(window.location.hostname), _this.socket.on("data", function(data) {
                _this.processTweetData(data)
            }))
        }
    })
}, TwitterWall.prototype.createTweet = function(data) {
    var hashRegex = new RegExp("#([^\\s]*)", "g"),
        retweetRegex = new RegExp("RT @([^\\s]*):", "g"),
        linksRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return {
        name: data.name,
        username: data.username,
        image: data.image,
        text: data.text.replace(hashRegex, "<em>#$1</em>").replace(retweetRegex, "<strong>RT @$1: </strong>").replace(linksRegex, '<a href="$1" target="_blank">$1</a>'),
        imageVisible: !0,
        created_at: data.created_at,
        date: data.date,
        tweeturl: data.tweeturl,
        classname: "tweet" + (this.list.length % 5 + 1).toString()
    }
}, TwitterWall.prototype.showTweet = function(tweet) {
    this.checkPosition(tweet), this.list.push(tweet)
}, TwitterWall.prototype.checkPosition = function(tweet) {
    if (this.list.length > 0) {
        var curr = (this.list.length - 1) % 4 + 1,
            currPos = this.positions[curr];
        if (null != currPos.current) {
            var nextOut1 = this.positions[currPos.out - 1];
            if (null != nextOut1.current) {
                var nextOut2 = this.positions[nextOut1.out - 1];
                if (null != nextOut2.current && "undefined" != typeof nextOut2.out) {
                    var nextOut3 = this.positions[nextOut2.out - 1];
                    nextOut2.current.position = "pos" + nextOut2.out.toString(), nextOut3.current = nextOut2.current
                }
                nextOut1.current.position = "pos" + nextOut1.out.toString(), nextOut2.current = nextOut1.current
            }
            currPos.current.position = "pos" + currPos.out.toString(), nextOut1.current = currPos.current
        }
        this.positions[0].current.position = "pos" + (curr + 1).toString(), currPos.current = this.positions[0].current
    }
    this.positions[0].current = tweet, this.positions[0].current.position = "pos1"
}, TwitterWall.prototype.tweetThis = function(e) {
    e.preventDefault(), ga("send", "event", "Twitter", "Carregou no botão do Twitter");
    var width = 575,
        height = 400,
        left = ($(window).width() - width) / 2,
        top = ($(window).height() - height) / 2,
        url = e.currentTarget.href + "?text=" + encodeURIComponent("Check out the new @goncalocardo_o’s portfolio, developed using #mongoDB, #AngularJS and #nodejs. #harish"),
        opts = "status=1,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
    return window.open(url, "twitter", opts), !1
}, $.fn.smallMenu = function() {
    var menu = $(this);
    menu.bind("click.smallMenu", function() {
        menu.hasClass("active") ? menu.removeClass("active") : menu.addClass("active")
    })
};