(function(t) {
    "use strict";
    function e(t) {
        if (t) {
            if ("string" == typeof o[t])
                return t;
            t = t.charAt(0).toUpperCase() + t.slice(1);
            for (var e, n = 0, s = i.length; s > n; n++)
                if (e = i[n] + t,
                "string" == typeof o[e])
                    return e
        }
    }
    var i = "Webkit Moz ms Ms O".split(" ")
      , o = document.documentElement.style;
    "function" == typeof define && define.amd ? define(function() {
        return e
    }) : t.getStyleProperty = e
}
)(window),
function(t) {
    "use strict";
    function e(t) {
        var e = parseFloat(t);
        return -1 === t.indexOf("%") && !isNaN(e) && e
    }
    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0, i = r.length; i > e; e++) {
            t[r[e]] = 0
        }
        return t
    }
    function o(t) {
        function o(t) {
            if ("string" == typeof t && (t = document.querySelector(t)),
            t && "object" == typeof t && t.nodeType) {
                var o = s(t);
                if ("none" === o.display)
                    return i();
                var h = {};
                h.width = t.offsetWidth,
                h.height = t.offsetHeight;
                for (var p = h.isBorderBox = !(!a || !o[a] || "border-box" !== o[a]), l = 0, u = r.length; u > l; l++) {
                    var c = r[l]
                      , d = o[c]
                      , f = parseFloat(d);
                    h[c] = isNaN(f) ? 0 : f
                }
                var m = h.paddingLeft + h.paddingRight
                  , y = h.paddingTop + h.paddingBottom
                  , g = h.marginLeft + h.marginRight
                  , v = h.marginTop + h.marginBottom
                  , C = h.borderLeftWidth + h.borderRightWidth
                  , b = h.borderTopWidth + h.borderBottomWidth
                  , _ = p && n
                  , S = e(o.width);
                !1 !== S && (h.width = S + (_ ? 0 : m + C));
                var x = e(o.height);
                return !1 !== x && (h.height = x + (_ ? 0 : y + b)),
                h.innerWidth = h.width - (m + C),
                h.innerHeight = h.height - (y + b),
                h.outerWidth = h.width + g,
                h.outerHeight = h.height + v,
                h
            }
        }
        var n, a = t("boxSizing");
        return function() {
            if (a) {
                var t = document.createElement("div");
                t.style.width = "200px",
                t.style.padding = "1px 2px 3px 4px",
                t.style.borderStyle = "solid",
                t.style.borderWidth = "1px 2px 3px 4px",
                t.style[a] = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(t);
                var o = s(t);
                n = 200 === e(o.width),
                i.removeChild(t)
            }
        }(),
        o
    }
    var n = document.defaultView
      , s = n && n.getComputedStyle ? function(t) {
        return n.getComputedStyle(t, null)
    }
    : function(t) {
        return t.currentStyle
    }
      , r = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define(["get-style-property"], o) : t.getSize = o(t.getStyleProperty)
}(window),
function(t) {
    "use strict";
    var e = document.documentElement
      , i = function() {};
    e.addEventListener ? i = function(t, e, i) {
        t.addEventListener(e, i, !1)
    }
    : e.attachEvent && (i = function(e, i, o) {
        e[i + o] = o.handleEvent ? function() {
            var e = t.event;
            e.target = e.target || e.srcElement,
            o.handleEvent.call(o, e)
        }
        : function() {
            var i = t.event;
            i.target = i.target || i.srcElement,
            o.call(e, i)
        }
        ,
        e.attachEvent("on" + i, e[i + o])
    }
    );
    var o = function() {};
    e.removeEventListener ? o = function(t, e, i) {
        t.removeEventListener(e, i, !1)
    }
    : e.detachEvent && (o = function(t, e, i) {
        t.detachEvent("on" + e, t[e + i]);
        try {
            delete t[e + i]
        } catch (o) {
            t[e + i] = void 0
        }
    }
    );
    var n = {
        bind: i,
        unbind: o
    };
    "function" == typeof define && define.amd ? define(n) : t.eventie = n
}(this),
function(t) {
    "use strict";
    function e(t) {
        "function" == typeof t && (e.isReady ? t() : s.push(t))
    }
    function i(t) {
        var i = "readystatechange" === t.type && "complete" !== n.readyState;
        if (!e.isReady && !i) {
            e.isReady = !0;
            for (var o = 0, r = s.length; r > o; o++) {
                (0,
                s[o])()
            }
        }
    }
    function o(o) {
        return o.bind(n, "DOMContentLoaded", i),
        o.bind(n, "readystatechange", i),
        o.bind(t, "load", i),
        e
    }
    var n = t.document
      , s = [];
    e.isReady = !1,
    "function" == typeof define && define.amd ? define(["eventie"], o) : t.docReady = o(t.eventie)
}(this),
function(t) {
    "use strict";
    function e() {}
    function i(t, e) {
        if (n)
            return e.indexOf(t);
        for (var i = e.length; i--; )
            if (e[i] === t)
                return i;
        return -1
    }
    var o = e.prototype
      , n = !!Array.prototype.indexOf;
    o._getEvents = function() {
        return this._events || (this._events = {})
    }
    ,
    o.getListeners = function(t) {
        var e, i, o = this._getEvents();
        if ("object" == typeof t) {
            e = {};
            for (i in o)
                o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
        } else
            e = o[t] || (o[t] = []);
        return e
    }
    ,
    o.getListenersAsObject = function(t) {
        var e, i = this.getListeners(t);
        return i instanceof Array && (e = {},
        e[t] = i),
        e || i
    }
    ,
    o.addListener = function(t, e) {
        var o, n = this.getListenersAsObject(t);
        for (o in n)
            n.hasOwnProperty(o) && -1 === i(e, n[o]) && n[o].push(e);
        return this
    }
    ,
    o.on = o.addListener,
    o.defineEvent = function(t) {
        return this.getListeners(t),
        this
    }
    ,
    o.defineEvents = function(t) {
        for (var e = 0; t.length > e; e += 1)
            this.defineEvent(t[e]);
        return this
    }
    ,
    o.removeListener = function(t, e) {
        var o, n, s = this.getListenersAsObject(t);
        for (n in s)
            s.hasOwnProperty(n) && -1 !== (o = i(e, s[n])) && s[n].splice(o, 1);
        return this
    }
    ,
    o.off = o.removeListener,
    o.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e)
    }
    ,
    o.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e)
    }
    ,
    o.manipulateListeners = function(t, e, i) {
        var o, n, s = t ? this.removeListener : this.addListener, r = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
            for (o = i.length; o--; )
                s.call(this, e, i[o]);
        else
            for (o in e)
                e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? s.call(this, o, n) : r.call(this, o, n));
        return this
    }
    ,
    o.removeEvent = function(t) {
        var e, i = typeof t, o = this._getEvents();
        if ("string" === i)
            delete o[t];
        else if ("object" === i)
            for (e in o)
                o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else
            delete this._events;
        return this
    }
    ,
    o.emitEvent = function(t, e) {
        var i, o, n = this.getListenersAsObject(t);
        for (o in n)
            if (n.hasOwnProperty(o))
                for (i = n[o].length; i--; )
                    !0 === (e ? n[o][i].apply(null, e) : n[o][i]()) && this.removeListener(t, n[o][i]);
        return this
    }
    ,
    o.trigger = o.emitEvent,
    o.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e)
    }
    ,
    "function" == typeof define && define.amd ? define(function() {
        return e
    }) : t.EventEmitter = e
}(this),
function(t) {
    "use strict";
    function e() {}
    function i(t) {
        function i(e) {
            e.prototype.option || (e.prototype.option = function(e) {
                t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
            }
            )
        }
        function n(e, i) {
            t.fn[e] = function(n) {
                if ("string" == typeof n) {
                    for (var r = o.call(arguments, 1), a = 0, h = this.length; h > a; a++) {
                        var p = this[a]
                          , l = t.data(p, e);
                        if (l)
                            if (t.isFunction(l[n]) && "_" !== n.charAt(0)) {
                                var u = l[n].apply(l, r);
                                if (void 0 !== u)
                                    return u
                            } else
                                s("no such method '" + n + "' for " + e + " instance");
                        else
                            s("cannot call methods on " + e + " prior to initialization; attempted to call '" + n + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var o = t.data(this, e);
                    o ? (o.option(n),
                    o._init()) : (o = new i(this,n),
                    t.data(this, e, o))
                })
            }
        }
        if (t) {
            var s = "undefined" == typeof console ? e : function(t) {
                console.error(t)
            }
            ;
            t.bridget = function(t, e) {
                i(e),
                n(t, e)
            }
        }
    }
    var o = Array.prototype.slice;
    "function" == typeof define && define.amd ? define(["jquery"], i) : i(t.jQuery)
}(window),
function(t, e) {
    "use strict";
    function i(t, e) {
        return t[a](e)
    }
    function o(t) {
        if (!t.parentNode) {
            document.createDocumentFragment().appendChild(t)
        }
    }
    function n(t, e) {
        o(t);
        for (var i = t.parentNode.querySelectorAll(e), n = 0, s = i.length; s > n; n++)
            if (i[n] === t)
                return !0;
        return !1
    }
    function s(t, e) {
        return o(t),
        i(t, e)
    }
    var r, a = function() {
        if (e.matchesSelector)
            return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], i = 0, o = t.length; o > i; i++) {
            var n = t[i]
              , s = n + "MatchesSelector";
            if (e[s])
                return s
        }
    }();
    if (a) {
        var h = document.createElement("div")
          , p = i(h, "div");
        r = p ? i : s
    } else
        r = n;
    "function" == typeof define && define.amd ? define(function() {
        return r
    }) : window.matchesSelector = r
}(0, Element.prototype),
function(t) {
    "use strict";
    function e(t, e) {
        t && (this.element = t,
        this.layout = e,
        this.position = {
            x: 0,
            y: 0
        },
        this._create())
    }
    var i = t.getSize
      , o = t.getStyleProperty
      , n = t.EventEmitter
      , s = document.defaultView
      , r = s && s.getComputedStyle ? function(t) {
        return s.getComputedStyle(t, null)
    }
    : function(t) {
        return t.currentStyle
    }
      , a = o("transition")
      , h = o("transform")
      , p = a && h
      , l = !!o("perspective")
      , u = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend"
    }[a]
      , c = ["transform", "transition", "transitionDuration", "transitionProperty"]
      , d = function() {
        for (var t = {}, e = 0, i = c.length; i > e; e++) {
            var n = c[e]
              , s = o(n);
            s && s !== n && (t[n] = s)
        }
        return t
    }();
    (function(t, e) {
        for (var i in e)
            t[i] = e[i]
    }
    )(e.prototype, n.prototype),
    e.prototype._create = function() {
        this.css({
            position: "absolute"
        })
    }
    ,
    e.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    e.prototype.getSize = function() {
        this.size = i(this.element)
    }
    ,
    e.prototype.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            e[d[i] || i] = t[i]
        }
    }
    ,
    e.prototype.getPosition = function() {
        var t = r(this.element)
          , e = this.layout.options
          , i = e.isOriginLeft
          , o = e.isOriginTop
          , n = parseInt(t[i ? "left" : "right"], 10)
          , s = parseInt(t[o ? "top" : "bottom"], 10);
        n = isNaN(n) ? 0 : n,
        s = isNaN(s) ? 0 : s;
        var a = this.layout.size;
        n -= i ? a.paddingLeft : a.paddingRight,
        s -= o ? a.paddingTop : a.paddingBottom,
        this.position.x = n,
        this.position.y = s
    }
    ,
    e.prototype.layoutPosition = function() {
        var t = this.layout.size
          , e = this.layout.options
          , i = {};
        e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px",
        i.right = "") : (i.right = this.position.x + t.paddingRight + "px",
        i.left = ""),
        e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px",
        i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px",
        i.top = ""),
        this.css(i),
        this.emitEvent("layout", [this])
    }
    ;
    var f = l ? function(t, e) {
        return "translate3d(" + t + "px, " + e + "px, 0)"
    }
    : function(t, e) {
        return "translate(" + t + "px, " + e + "px)"
    }
    ;
    e.prototype._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x
          , o = this.position.y
          , n = parseInt(t, 10)
          , s = parseInt(e, 10)
          , r = n === this.position.x && s === this.position.y;
        if (this.setPosition(t, e),
        r && !this.isTransitioning)
            return void this.layoutPosition();
        var a = t - i
          , h = e - o
          , p = {}
          , l = this.layout.options;
        a = l.isOriginLeft ? a : -a,
        h = l.isOriginTop ? h : -h,
        p.transform = f(a, h),
        this.transition({
            to: p,
            onTransitionEnd: this.layoutPosition,
            isCleaning: !0
        })
    }
    ,
    e.prototype.goTo = function(t, e) {
        this.setPosition(t, e),
        this.layoutPosition()
    }
    ,
    e.prototype.moveTo = p ? e.prototype._transitionTo : e.prototype.goTo,
    e.prototype.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10),
        this.position.y = parseInt(e, 10)
    }
    ,
    e.prototype._nonTransition = function(t) {
        this.css(t.to),
        t.isCleaning && this._removeStyles(t.to),
        t.onTransitionEnd && t.onTransitionEnd.call(this)
    }
    ,
    e.prototype._transition = function(t) {
        var e = this.layout.options.transitionDuration;
        if (!parseFloat(e))
            return void this._nonTransition(t);
        var i = t.to
          , o = [];
        for (var n in i)
            o.push(n);
        var s = {};
        if (s.transitionProperty = o.join(","),
        s.transitionDuration = e,
        this.element.addEventListener(u, this, !1),
        (t.isCleaning || t.onTransitionEnd) && this.on("transitionEnd", function(e) {
            return t.isCleaning && e._removeStyles(i),
            t.onTransitionEnd && t.onTransitionEnd.call(e),
            !0
        }),
        t.from) {
            this.css(t.from);
            this.element.offsetHeight;
            null
        }
        this.css(s),
        this.css(i),
        this.isTransitioning = !0
    }
    ,
    e.prototype.transition = e.prototype[a ? "_transition" : "_nonTransition"],
    e.prototype.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }
    ,
    e.prototype.onotransitionend = function(t) {
        this.ontransitionend(t)
    }
    ,
    e.prototype.ontransitionend = function(t) {
        t.target === this.element && (this.removeTransitionStyles(),
        this.element.removeEventListener(u, this, !1),
        this.isTransitioning = !1,
        this.emitEvent("transitionEnd", [this]))
    }
    ,
    e.prototype._removeStyles = function(t) {
        var e = {};
        for (var i in t)
            e[i] = "";
        this.css(e)
    }
    ;
    var m = {
        transitionProperty: "",
        transitionDuration: ""
    };
    e.prototype.removeTransitionStyles = function() {
        this.css(m)
    }
    ,
    e.prototype.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
        this.emitEvent("remove", [this])
    }
    ,
    e.prototype.remove = a ? function() {
        var t = this;
        this.on("transitionEnd", function() {
            return t.removeElem(),
            !0
        }),
        this.hide()
    }
    : e.prototype.removeElem,
    e.prototype.reveal = function() {
        this.css({
            display: ""
        });
        var t = this.layout.options;
        this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0
        })
    }
    ,
    e.prototype.hide = function() {
        this.css({
            display: ""
        });
        var t = this.layout.options;
        this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: function() {
                this.css({
                    display: "none"
                })
            }
        })
    }
    ,
    e.prototype.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }
    ,
    t.Outlayer = {
        Item: e
    }
}(window),
function(t) {
    "use strict";
    function e(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    function i(t) {
        return "[object Array]" === v.call(t)
    }
    function o(t) {
        var e = [];
        if (i(t))
            e = t;
        else if ("number" == typeof t.length)
            for (var o = 0, n = t.length; n > o; o++)
                e.push(t[o]);
        else
            e.push(t);
        return e
    }
    function n(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    function s(t, i) {
        if ("string" == typeof t && (t = f.querySelector(t)),
        !t || !C(t))
            return void (m && m.error("Bad " + this.settings.namespace + " element: " + t));
        this.element = t,
        this.options = e({}, this.options),
        e(this.options, i);
        var o = ++_;
        this.element.outlayerGUID = o,
        S[o] = this,
        this._create(),
        this.options.isInitLayout && this.layout()
    }
    function r(t, i) {
        t.prototype[i] = e({}, s.prototype[i])
    }
    var a = t.Outlayer
      , h = a.Item
      , p = t.docReady
      , l = t.EventEmitter
      , u = t.eventie
      , c = t.getSize
      , d = t.matchesSelector
      , f = t.document
      , m = t.console
      , y = t.jQuery
      , g = function() {}
      , v = Object.prototype.toString
      , C = "object" == typeof HTMLElement ? function(t) {
        return t instanceof HTMLElement
    }
    : function(t) {
        return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
    }
      , b = Array.prototype.indexOf ? function(t, e) {
        return t.indexOf(e)
    }
    : function(t, e) {
        for (var i = 0, o = t.length; o > i; i++)
            if (t[i] === e)
                return i;
        return -1
    }
      , _ = 0
      , S = {};
    s.prototype.settings = {
        namespace: "outlayer",
        item: a.Item
    },
    s.prototype.options = {
        containerStyle: {
            position: "relative"
        },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    },
    e(s.prototype, l.prototype),
    s.prototype._create = function() {
        this.reloadItems(),
        this.stamps = [],
        this.stamp(this.options.stamp),
        e(this.element.style, this.options.containerStyle),
        this.options.isResizeBound && this.bindResize()
    }
    ,
    s.prototype.reloadItems = function() {
        this.items = this._getItems(this.element.children)
    }
    ,
    s.prototype._getItems = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.settings.item, o = [], n = 0, s = e.length; s > n; n++) {
            var r = e[n]
              , a = new i(r,this,this.options.itemOptions);
            o.push(a)
        }
        return o
    }
    ,
    s.prototype._filterFindItemElements = function(t) {
        t = o(t);
        var e = this.options.itemSelector;
        if (!e)
            return t;
        for (var i = [], n = 0, s = t.length; s > n; n++) {
            var r = t[n];
            d(r, e) && i.push(r);
            for (var a = r.querySelectorAll(e), h = 0, p = a.length; p > h; h++)
                i.push(a[h])
        }
        return i
    }
    ,
    s.prototype.getItemElements = function() {
        for (var t = [], e = 0, i = this.items.length; i > e; e++)
            t.push(this.items[e].element);
        return t
    }
    ,
    s.prototype.layout = function() {
        this._resetLayout(),
        this._manageStamps();
        var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, t),
        this._isLayoutInited = !0
    }
    ,
    s.prototype._init = s.prototype.layout,
    s.prototype._resetLayout = function() {
        this.getSize()
    }
    ,
    s.prototype.getSize = function() {
        this.size = c(this.element)
    }
    ,
    s.prototype._getMeasurement = function(t, e) {
        var i, o = this.options[t];
        o ? ("string" == typeof o ? i = this.element.querySelector(o) : C(o) && (i = o),
        this[t] = i ? c(i)[e] : o) : this[t] = 0
    }
    ,
    s.prototype.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t),
        this._layoutItems(t, e),
        this._postLayout()
    }
    ,
    s.prototype._getItemsForLayout = function(t) {
        for (var e = [], i = 0, o = t.length; o > i; i++) {
            var n = t[i];
            n.isIgnored || e.push(n)
        }
        return e
    }
    ,
    s.prototype._layoutItems = function(t, e) {
        if (!t || !t.length)
            return void this.emitEvent("layoutComplete", [this, t]);
        this._itemsOn(t, "layout", function() {
            this.emitEvent("layoutComplete", [this, t])
        });
        for (var i = [], o = 0, n = t.length; n > o; o++) {
            var s = t[o]
              , r = this._getItemLayoutPosition(s);
            r.item = s,
            r.isInstant = e,
            i.push(r)
        }
        this._processLayoutQueue(i)
    }
    ,
    s.prototype._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }
    ,
    s.prototype._processLayoutQueue = function(t) {
        for (var e = 0, i = t.length; i > e; e++) {
            var o = t[e];
            this._positionItem(o.item, o.x, o.y, o.isInstant)
        }
    }
    ,
    s.prototype._positionItem = function(t, e, i, o) {
        o ? t.goTo(e, i) : t.moveTo(e, i)
    }
    ,
    s.prototype._postLayout = function() {
        var t = this._getContainerSize();
        t && (this._setContainerMeasure(t.width, !0),
        this._setContainerMeasure(t.height, !1))
    }
    ,
    s.prototype._getContainerSize = g,
    s.prototype._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
            t = Math.max(t, 0),
            this.element.style[e ? "width" : "height"] = t + "px"
        }
    }
    ,
    s.prototype._itemsOn = function(t, e, i) {
        function o() {
            return n++,
            n === s && i.call(r),
            !0
        }
        for (var n = 0, s = t.length, r = this, a = 0, h = t.length; h > a; a++) {
            t[a].on(e, o)
        }
    }
    ,
    s.prototype.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }
    ,
    s.prototype.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }
    ,
    s.prototype.stamp = function(t) {
        if (t = this._find(t)) {
            this.stamps = this.stamps.concat(t);
            for (var e = 0, i = t.length; i > e; e++) {
                var o = t[e];
                this.ignore(o)
            }
        }
    }
    ,
    s.prototype.unstamp = function(t) {
        if (t = this._find(t))
            for (var e = 0, i = t.length; i > e; e++) {
                var o = t[e]
                  , n = b(this.stamps, o);
                -1 !== n && this.stamps.splice(n, 1),
                this.unignore(o)
            }
    }
    ,
    s.prototype._find = function(t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
        t = o(t)) : void 0
    }
    ,
    s.prototype._manageStamps = function() {
        if (this.stamps && this.stamps.length) {
            this._getBoundingRect();
            for (var t = 0, e = this.stamps.length; e > t; t++) {
                var i = this.stamps[t];
                this._manageStamp(i)
            }
        }
    }
    ,
    s.prototype._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect()
          , e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }
    ,
    s.prototype._manageStamp = g,
    s.prototype._getElementOffset = function(t) {
        var e = t.getBoundingClientRect()
          , i = this._boundingRect
          , o = c(t);
        return {
            left: e.left - i.left - o.marginLeft,
            top: e.top - i.top - o.marginTop,
            right: i.right - e.right - o.marginRight,
            bottom: i.bottom - e.bottom - o.marginBottom
        }
    }
    ,
    s.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    s.prototype.bindResize = function() {
        this.isResizeBound || (u.bind(t, "resize", this),
        this.isResizeBound = !0)
    }
    ,
    s.prototype.unbindResize = function() {
        u.unbind(t, "resize", this),
        this.isResizeBound = !1
    }
    ,
    s.prototype.onresize = function() {
        function t() {
            e.resize()
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var e = this;
        this.resizeTimeout = setTimeout(t, 100)
    }
    ,
    s.prototype.resize = function() {
        var t = c(this.element);
        this.size && t && t.innerWidth === this.size.innerWidth || (this.layout(),
        delete this.resizeTimeout)
    }
    ,
    s.prototype.addItems = function(t) {
        var e = this._getItems(t);
        if (e.length)
            return this.items = this.items.concat(e),
            e
    }
    ,
    s.prototype.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0),
        this.reveal(e))
    }
    ,
    s.prototype.prepended = function(t) {
        var e = this._getItems(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i),
            this._resetLayout(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i)
        }
    }
    ,
    s.prototype.reveal = function(t) {
        if (t && t.length)
            for (var e = 0, i = t.length; i > e; e++) {
                var o = t[e];
                o.reveal()
            }
    }
    ,
    s.prototype.hide = function(t) {
        if (t && t.length)
            for (var e = 0, i = t.length; i > e; e++) {
                var o = t[e];
                o.hide()
            }
    }
    ,
    s.prototype.getItem = function(t) {
        for (var e = 0, i = this.items.length; i > e; e++) {
            var o = this.items[e];
            if (o.element === t)
                return o
        }
    }
    ,
    s.prototype.getItems = function(t) {
        if (t && t.length) {
            for (var e = [], i = 0, o = t.length; o > i; i++) {
                var n = t[i]
                  , s = this.getItem(n);
                s && e.push(s)
            }
            return e
        }
    }
    ,
    s.prototype.remove = function(t) {
        t = o(t);
        var e = this.getItems(t);
        this._itemsOn(e, "remove", function() {
            this.emitEvent("removeComplete", [this, e])
        });
        for (var i = 0, n = e.length; n > i; i++) {
            var s = e[i];
            s.remove();
            var r = b(this.items, s);
            this.items.splice(r, 1)
        }
    }
    ,
    s.prototype.destroy = function() {
        var t = this.element.style;
        t.height = "",
        t.position = "",
        t.width = "";
        for (var e = 0, i = this.items.length; i > e; e++) {
            this.items[e].destroy()
        }
        this.unbindResize(),
        delete this.element.outlayerGUID
    }
    ,
    s.data = function(t) {
        var e = t && t.outlayerGUID;
        return e && S[e]
    }
    ,
    s.create = function(t, i) {
        function o() {
            s.apply(this, arguments)
        }
        return e(o.prototype, s.prototype),
        r(o, "options"),
        r(o, "settings"),
        e(o.prototype.options, i),
        o.prototype.settings.namespace = t,
        o.data = s.data,
        o.Item = function() {
            h.apply(this, arguments)
        }
        ,
        o.Item.prototype = new s.Item,
        o.prototype.settings.item = o.Item,
        p(function() {
            for (var e = n(t), i = f.querySelectorAll(".js-" + e), s = "data-" + e + "-options", r = 0, a = i.length; a > r; r++) {
                var h, p = i[r], l = p.getAttribute(s);
                try {
                    h = l && JSON.parse(l)
                } catch (t) {
                    m && m.error("Error parsing " + s + " on " + p.nodeName.toLowerCase() + (p.id ? "#" + p.id : "") + ": " + t);
                    continue
                }
                var u = new o(p,h);
                y && y.data(p, t, u)
            }
        }),
        y && y.bridget && y.bridget(t, o),
        o
    }
    ,
    s.Item = h,
    t.Outlayer = s
}(window),
function(t) {
    "use strict";
    function e(t, e) {
        var o = t.create("masonry");
        return o.prototype._resetLayout = function() {
            this.getSize(),
            this._getMeasurement("columnWidth", "outerWidth"),
            this._getMeasurement("gutter", "outerWidth"),
            this.measureColumns();
            var t = this.cols;
            for (this.colYs = []; t--; )
                this.colYs.push(0);
            this.maxY = 0
        }
        ,
        o.prototype.measureColumns = function() {
            var t = this._getSizingContainer()
              , i = this.items[0]
              , o = i && i.element;
            this.columnWidth || (this.columnWidth = o ? e(o).outerWidth : this.size.innerWidth),
            this.columnWidth += this.gutter,
            this._containerWidth = e(t).innerWidth,
            this.cols = Math.floor((this._containerWidth + this.gutter) / this.columnWidth),
            this.cols = Math.max(this.cols, 1)
        }
        ,
        o.prototype._getSizingContainer = function() {
            return this.options.isFitWidth ? this.element.parentNode : this.element
        }
        ,
        o.prototype._getItemLayoutPosition = function(t) {
            t.getSize();
            var e = Math.ceil(t.size.outerWidth / this.columnWidth);
            e = Math.min(e, this.cols);
            for (var o = this._getColGroup(e), n = Math.min.apply(Math, o), s = i(o, n), r = {
                x: this.columnWidth * s,
                y: n
            }, a = n + t.size.outerHeight, h = this.cols + 1 - o.length, p = 0; h > p; p++)
                this.colYs[s + p] = a;
            return r
        }
        ,
        o.prototype._getColGroup = function(t) {
            if (1 === t)
                return this.colYs;
            for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
                var n = this.colYs.slice(o, o + t);
                e[o] = Math.max.apply(Math, n)
            }
            return e
        }
        ,
        o.prototype._manageStamp = function(t) {
            var i = e(t)
              , o = this._getElementOffset(t)
              , n = this.options.isOriginLeft ? o.left : o.right
              , s = n + i.outerWidth
              , r = Math.floor(n / this.columnWidth);
            r = Math.max(0, r);
            var a = Math.floor(s / this.columnWidth);
            a = Math.min(this.cols - 1, a);
            for (var h = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, p = r; a >= p; p++)
                this.colYs[p] = Math.max(h, this.colYs[p])
        }
        ,
        o.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {
                height: this.maxY
            };
            return this.options.isFitWidth && (t.width = this._getContainerFitWidth()),
            t
        }
        ,
        o.prototype._getContainerFitWidth = function() {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; )
                t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }
        ,
        o.prototype.resize = function() {
            var t = this._getSizingContainer()
              , i = e(t);
            this.size && i && i.innerWidth === this._containerWidth || (this.layout(),
            delete this.resizeTimeout)
        }
        ,
        o
    }
    var i = Array.prototype.indexOf ? function(t, e) {
        return t.indexOf(e)
    }
    : function(t, e) {
        for (var i = 0, o = t.length; o > i; i++) {
            if (t[i] === e)
                return i
        }
        return -1
    }
    ;
    "function" == typeof define && define.amd ? define(["outlayer", "get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
}(window);
var MasonryController = function(t, e) {
    var i = this;
    this.resize = _.debounce(_.bind(this._resize, this), 200),
    MasonryController.super_.apply(this, arguments),
    this.itemClass = "item",
    this.itemSelector = "." + this.itemClass,
    this.itemsInSlice = 6,
    this.editMode = !1,
    this.init(e),
    $(this.el).on("click", "." + this.itemClass, function(t) {
        var e = $(t.currentTarget).index() - 1;
        i.itemClick(i.items[e], e, t.target, t)
    })
};
utils.inherits(MasonryController, SimpleAppProto),
MasonryController.prototype.itemClick = function(t, e, i, o) {
    switch (this.props.galleryImageOnClickAction) {
    case "zoomMode":
        Wix.pushState(JSON.stringify({
            cmd: "zoom",
            args: [e]
        }));
        break;
    case "goToLink":
        this.openLink(t.href, t.target, t.linkType, o, t["data-anchor"], this.mainPageId, t.link);
        break;
    default:
        Wix.pushState(JSON.stringify({
            cmd: "itemClicked",
            args: [e]
        }))
    }
    return !1
}
,
MasonryController.prototype.itemTemplate = _.template('<div class="<%=itemClass%>"><div class="overlay"></div><img src="<%=img.src%>"><% if(description || title) {  %><div class="sb-description"><% if(title) { %><h3 class="title" title="<%=title%>"><%=title%></h3><% } %><% if(description) { %><div class="desc"><%=description%></div><% } %></div><% } %></div>'),
MasonryController.prototype.init = function(t) {
    this.items = t.items || [],
    this.props = t.props || {},
    this.gutterSize = this.props.margin,
    this.columnsCount = Math.min(this.props.numCols, this.items.length),
    this.el.html('<div class="grid-sizer"></div>'),
    this.gridSizer = $(".grid-sizer"),
    this.createDom(),
    this.createLayout(),
    this.calculateLayoutSizes(),
    this.updateLayout(),
    this._resize()
}
,
MasonryController.prototype.zoomClosed = function() {}
,
MasonryController.prototype._resize = function() {
    this.calculateLayoutSizes(),
    this.updateLayout(),
    $(".show-more").css("top", this.el.height()),
    Wix.setHeight(this.el.height() + $(".show-more", this.el).outerHeight())
}
,
MasonryController.prototype.destroy = function() {
    this.msnry.destroy()
}
,
MasonryController.prototype.createDom = function() {
    var t = this;
    this.el.html('<div class="grid-sizer"></div>'),
    this.calculateLayoutSizes();
    var e = document.createDocumentFragment()
      , i = this.items.length;
    "mobile" == this.deviceType && (i = Math.min(this.items.length, this.itemsInSlice)),
    this.itemsInViewport = i;
    for (var o = 0; o < i; o++) {
        var n = this.items[o];
        e.appendChild(t.createSingleItem(n, o))
    }
    this.el.append(e),
    this.itemsInViewport < this.items.length && ($('<div class="show-more">Show More</div>').appendTo(this.el).click(_.bind(this.displayMore, this)),
    $(".show-more").css("color", this.props.textButtonColor || "#4A4A4A"))
}
,
MasonryController.prototype.displayMore = function() {
    for (var t = Math.min(this.items.length, this.itemsInViewport + this.itemsInSlice), e = this.itemsInViewport; e < t; e++) {
        var i = this.items[e]
          , o = this.createSingleItem(i, e);
        this.el.append(o),
        this.msnry.appended(o)
    }
    this.itemsInViewport = t,
    this.itemsInViewport >= this.items.length ? $(".show-more", this.el).remove() : $(".show-more", this.el).appendTo(this.el),
    this.resize()
}
,
MasonryController.prototype.createLayout = function() {
    var t = {
        columnWidth: ".grid-sizer",
        itemSelector: "." + this.itemClass,
        gutter: this.gutterSize,
        isResizeBound: !1
    };
    this.msnry = new Masonry(this.el[0],t)
}
,
MasonryController.prototype.updateSettings = function(t) {
    var e = ["uri", "title", "description"]
      , i = !1;
    this.mainPageId = t.mainPageId,
    "mobile" == this.deviceType && (this.gutterSize = t.props.margin),
    utils.isEqualQuality(this.quality, t.quality) || (i = !0),
    this.quality = t.quality || {};
    var o = Math.min(t.props.numCols, t.items.length);
    if (this.gutterSize == t.props.margin && this.columnsCount == o && this.props.textMode == t.props.textMode || (i = !0),
    this.columnsCount = o,
    this.items.length != t.items.length)
        i = !0;
    else
        for (var n = 0; n < this.items.length; n++) {
            if (utils.propertiesChanged(this.items[n], t.items[n], e)) {
                i = !0;
                break
            }
            _.extend(this.items[n], t.items[n])
        }
    this.props = t.props,
    i ? (this.destroy(),
    this.init(t)) : this.resize()
}
,
MasonryController.prototype.calculateLayoutSizes = function() {
    this.gridSizer = $(".grid-sizer"),
    this.wrapperWidth = $("body").width() - 6;
    var t = this.wrapperWidth - this.gutterSize * (this.columnsCount - 1);
    this.columnWidth = Math.floor(t / this.columnsCount),
    this.gridSizer.width(this.columnWidth),
    $("." + this.itemClass, this.el).width(this.columnWidth)
}
,
MasonryController.prototype.updateLayout = function() {
    var t = this;
    if (!(this.wrapperWidth < 0)) {
        if (this.props.alignText && this.el.css("text-align", this.props.alignText),
        this.props.font && (utils.loadGoogleFontIfNeeded(this.props.font),
        this.el.css("font-family", utils.fontFamilyDegradation(this.props.font))),
        this.props.textColor) {
            var e = this.props.textColor;
            this.props.alphaTextColor && (e = utils.hexToRgba(this.props.textColor, this.props.alphaTextColor)),
            $("." + this.itemClass + " .title", this.el).css("color", e),
            $(".show-more").css("color", e)
        }
        if (this.props.descriptionColor) {
            var i = this.props.descriptionColor;
            this.props.alphaDescriptionTextColor && (i = utils.hexToRgba(this.props.descriptionColor, this.props.alphaDescriptionTextColor)),
            $("." + this.itemClass + " .desc", this.el).css("color", i)
        }
        if (this.props.backgroundMouseoverColor) {
            var o = this.props.backgroundMouseoverColor;
            void 0 !== this.props.alphaBackgroundMouseoverColor && $.support.opacity && (o = utils.hexToRgba(this.props.backgroundMouseoverColor, this.props.alphaBackgroundMouseoverColor));
            var n = "#viewport " + t.itemSelector + ":hover .overlay"
              , s = utils.insertCssRule(t, n + " { background-color: " + o + "!important; }");
            s.style.backgroundColor = o,
            $.support.opacity || (s.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)",
            s.style.filter = "alpha(opacity=50)",
            s.style.opacity = .5)
        }
        if (this.props.textBackgroundColor) {
            var r = this.props.textBackgroundColor;
            void 0 !== this.props.alphaTextBackgroundColor && (r = utils.hexToRgba(this.props.textBackgroundColor, this.props.alphaTextBackgroundColor)),
            $("." + this.itemClass + " .sb-description", this.el).css("background-color", r)
        }
        var a = utils.pyramid.isOverThresholdChange() || this.preRender
          , h = "disabled" === t.props.galleryImageOnClickAction
          , p = "goToLink" === t.props.galleryImageOnClickAction
          , l = {
            marginBottom: t.gutterSize + "px",
            boxShadow: t.props.boxShadowIsOn ? t.props.boxShadow : "none"
        }
          , t = this;
        $("." + this.itemClass, this.el).each(function() {
            var e = $(this).data("item");
            if (e) {
                $(this).css(l);
                var i = $(".overlay", this);
                h || p && _.isEmpty(e.href) ? (i.hide(),
                $(this).css("cursor", "")) : (i.show(),
                $(this).css("cursor", "pointer")),
                $("img", this).attr("src", function() {
                    var o = utils.getVerticalColumnImageSize(t.columnWidth, e.width, e.height);
                    return this.width = o.width,
                    this.height = o.height,
                    i.height(o.height),
                    a ? utils.getResizedImageUrl(e.uri, this.width, this.height, {
                        siteQuality: t.quality,
                        maxWidth: e.width,
                        maxHeight: e.height
                    }) : this.src
                })
            }
        }),
        this.msnry.layout(),
        this.preRender = !1
    }
}
,
MasonryController.prototype.createSingleItem = function(t, e) {
    this.preRender = !0;
    var i = this.itemTemplate
      , o = {
        itemClass: this.itemClass,
        img: {
            src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        },
        title: null,
        description: null
    };
    switch (this.props.textMode) {
    case "titleAndDescription":
        o.title = t.title,
        o.description = t.description;
        break;
    case "titleOnly":
        o.title = t.title;
        break;
    case "descriptionOnly":
        o.description = t.description
    }
    var n = i(o)
      , s = $(n);
    return s.data("item", t),
    s[0]
}
;
