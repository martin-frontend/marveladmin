var lottTranslator;
!(function() {
    "use strict";
    var _ = {
            7128: function(_, e, a) {
                var t = a(1095)(a(4366), "DataView");
                _.exports = t;
            },
            8431: function(_, e, a) {
                var t = a(2514),
                    n = a(5485),
                    i = a(243),
                    r = a(8454),
                    o = a(3984);
                function l(_) {
                    var e = -1,
                        a = null == _ ? 0 : _.length;
                    for (this.clear(); ++e < a; ) {
                        var t = _[e];
                        this.set(t[0], t[1]);
                    }
                }
                (l.prototype.clear = t),
                    (l.prototype.delete = n),
                    (l.prototype.get = i),
                    (l.prototype.has = r),
                    (l.prototype.set = o),
                    (_.exports = l);
            },
            3472: function(_, e, a) {
                var t = a(9801),
                    n = a(2442),
                    i = a(8146),
                    r = a(4612),
                    o = a(6275);
                function l(_) {
                    var e = -1,
                        a = null == _ ? 0 : _.length;
                    for (this.clear(); ++e < a; ) {
                        var t = _[e];
                        this.set(t[0], t[1]);
                    }
                }
                (l.prototype.clear = t),
                    (l.prototype.delete = n),
                    (l.prototype.get = i),
                    (l.prototype.has = r),
                    (l.prototype.set = o),
                    (_.exports = l);
            },
            6588: function(_, e, a) {
                var t = a(1095)(a(4366), "Map");
                _.exports = t;
            },
            460: function(_, e, a) {
                var t = a(4917),
                    n = a(6890),
                    i = a(9413),
                    r = a(3583),
                    o = a(9399);
                function l(_) {
                    var e = -1,
                        a = null == _ ? 0 : _.length;
                    for (this.clear(); ++e < a; ) {
                        var t = _[e];
                        this.set(t[0], t[1]);
                    }
                }
                (l.prototype.clear = t),
                    (l.prototype.delete = n),
                    (l.prototype.get = i),
                    (l.prototype.has = r),
                    (l.prototype.set = o),
                    (_.exports = l);
            },
            9019: function(_, e, a) {
                var t = a(1095)(a(4366), "Promise");
                _.exports = t;
            },
            6202: function(_, e, a) {
                var t = a(1095)(a(4366), "Set");
                _.exports = t;
            },
            2051: function(_, e, a) {
                var t = a(460),
                    n = a(939),
                    i = a(7451);
                function r(_) {
                    var e = -1,
                        a = null == _ ? 0 : _.length;
                    for (this.__data__ = new t(); ++e < a; ) this.add(_[e]);
                }
                (r.prototype.add = r.prototype.push = n), (r.prototype.has = i), (_.exports = r);
            },
            9245: function(_, e, a) {
                var t = a(3472),
                    n = a(8276),
                    i = a(2342),
                    r = a(8062),
                    o = a(1857),
                    l = a(8969);
                function u(_) {
                    var e = (this.__data__ = new t(_));
                    this.size = e.size;
                }
                (u.prototype.clear = n),
                    (u.prototype.delete = i),
                    (u.prototype.get = r),
                    (u.prototype.has = o),
                    (u.prototype.set = l),
                    (_.exports = u);
            },
            7206: function(_, e, a) {
                var t = a(4366).Symbol;
                _.exports = t;
            },
            7729: function(_, e, a) {
                var t = a(4366).Uint8Array;
                _.exports = t;
            },
            3975: function(_, e, a) {
                var t = a(1095)(a(4366), "WeakMap");
                _.exports = t;
            },
            8998: function(_) {
                _.exports = function(_, e, a) {
                    switch (a.length) {
                        case 0:
                            return _.call(e);
                        case 1:
                            return _.call(e, a[0]);
                        case 2:
                            return _.call(e, a[0], a[1]);
                        case 3:
                            return _.call(e, a[0], a[1], a[2]);
                    }
                    return _.apply(e, a);
                };
            },
            7422: function(_) {
                _.exports = function(_, e) {
                    for (var a = -1, t = null == _ ? 0 : _.length, n = 0, i = []; ++a < t; ) {
                        var r = _[a];
                        e(r, a, _) && (i[n++] = r);
                    }
                    return i;
                };
            },
            558: function(_, e, a) {
                var t = a(7498),
                    n = a(3255),
                    i = a(1304),
                    r = a(8448),
                    o = a(2049),
                    l = a(7592),
                    u = Object.prototype.hasOwnProperty;
                _.exports = function(_, e) {
                    var a = i(_),
                        s = !a && n(_),
                        d = !a && !s && r(_),
                        S = !a && !s && !d && l(_),
                        c = a || s || d || S,
                        T = c ? t(_.length, String) : [],
                        E = T.length;
                    for (var y in _)
                        (!e && !u.call(_, y)) ||
                            (c &&
                                ("length" == y ||
                                    (d && ("offset" == y || "parent" == y)) ||
                                    (S && ("buffer" == y || "byteLength" == y || "byteOffset" == y)) ||
                                    o(y, E))) ||
                            T.push(y);
                    return T;
                };
            },
            3994: function(_) {
                _.exports = function(_, e) {
                    for (var a = -1, t = null == _ ? 0 : _.length, n = Array(t); ++a < t; ) n[a] = e(_[a], a, _);
                    return n;
                };
            },
            6873: function(_) {
                _.exports = function(_, e) {
                    for (var a = -1, t = e.length, n = _.length; ++a < t; ) _[n + a] = e[a];
                    return _;
                };
            },
            8842: function(_) {
                _.exports = function(_, e) {
                    for (var a = -1, t = null == _ ? 0 : _.length; ++a < t; ) if (e(_[a], a, _)) return !0;
                    return !1;
                };
            },
            8537: function(_, e, a) {
                var t = a(5682)("length");
                _.exports = t;
            },
            2738: function(_) {
                _.exports = function(_) {
                    return _.split("");
                };
            },
            5509: function(_, e, a) {
                var t = a(3114);
                _.exports = function(_, e) {
                    for (var a = _.length; a--; ) if (t(_[a][0], e)) return a;
                    return -1;
                };
            },
            9506: function(_, e, a) {
                var t = a(6195),
                    n = a(9087)(t);
                _.exports = n;
            },
            8621: function(_) {
                _.exports = function(_, e, a, t) {
                    for (var n = _.length, i = a + (t ? 1 : -1); t ? i-- : ++i < n; ) if (e(_[i], i, _)) return i;
                    return -1;
                };
            },
            1725: function(_, e, a) {
                var t = a(6873),
                    n = a(1542);
                _.exports = function _(e, a, i, r, o) {
                    var l = -1,
                        u = e.length;
                    for (i || (i = n), o || (o = []); ++l < u; ) {
                        var s = e[l];
                        a > 0 && i(s) ? (a > 1 ? _(s, a - 1, i, r, o) : t(o, s)) : r || (o[o.length] = s);
                    }
                    return o;
                };
            },
            3742: function(_, e, a) {
                var t = a(5257)();
                _.exports = t;
            },
            6195: function(_, e, a) {
                var t = a(3742),
                    n = a(3115);
                _.exports = function(_, e) {
                    return _ && t(_, e, n);
                };
            },
            2457: function(_, e, a) {
                var t = a(3378),
                    n = a(9998);
                _.exports = function(_, e) {
                    for (var a = 0, i = (e = t(e, _)).length; null != _ && a < i; ) _ = _[n(e[a++])];
                    return a && a == i ? _ : void 0;
                };
            },
            3921: function(_, e, a) {
                var t = a(6873),
                    n = a(1304);
                _.exports = function(_, e, a) {
                    var i = e(_);
                    return n(_) ? i : t(i, a(_));
                };
            },
            7807: function(_, e, a) {
                var t = a(7206),
                    n = a(3187),
                    i = a(2778),
                    r = t ? t.toStringTag : void 0;
                _.exports = function(_) {
                    return null == _
                        ? void 0 === _
                            ? "[object Undefined]"
                            : "[object Null]"
                        : r && r in Object(_)
                        ? n(_)
                        : i(_);
                };
            },
            3430: function(_) {
                _.exports = function(_, e) {
                    return null != _ && e in Object(_);
                };
            },
            9353: function(_, e, a) {
                var t = a(7807),
                    n = a(8667);
                _.exports = function(_) {
                    return n(_) && "[object Arguments]" == t(_);
                };
            },
            8725: function(_, e, a) {
                var t = a(4221),
                    n = a(8667);
                _.exports = function _(e, a, i, r, o) {
                    return (
                        e === a || (null == e || null == a || (!n(e) && !n(a)) ? e != e && a != a : t(e, a, i, r, _, o))
                    );
                };
            },
            4221: function(_, e, a) {
                var t = a(9245),
                    n = a(5824),
                    i = a(6037),
                    r = a(5988),
                    o = a(8657),
                    l = a(1304),
                    u = a(8448),
                    s = a(7592),
                    d = "[object Arguments]",
                    S = "[object Array]",
                    c = "[object Object]",
                    T = Object.prototype.hasOwnProperty;
                _.exports = function(_, e, a, E, y, O) {
                    var m = l(_),
                        N = l(e),
                        p = m ? S : o(_),
                        P = N ? S : o(e),
                        A = (p = p == d ? c : p) == c,
                        g = (P = P == d ? c : P) == c,
                        R = p == P;
                    if (R && u(_)) {
                        if (!u(e)) return !1;
                        (m = !0), (A = !1);
                    }
                    if (R && !A) return O || (O = new t()), m || s(_) ? n(_, e, a, E, y, O) : i(_, e, p, a, E, y, O);
                    if (!(1 & a)) {
                        var L = A && T.call(_, "__wrapped__"),
                            C = g && T.call(e, "__wrapped__");
                        if (L || C) {
                            var h = L ? _.value() : _,
                                f = C ? e.value() : e;
                            return O || (O = new t()), y(h, f, a, E, O);
                        }
                    }
                    return !!R && (O || (O = new t()), r(_, e, a, E, y, O));
                };
            },
            687: function(_, e, a) {
                var t = a(9245),
                    n = a(8725);
                _.exports = function(_, e, a, i) {
                    var r = a.length,
                        o = r,
                        l = !i;
                    if (null == _) return !o;
                    for (_ = Object(_); r--; ) {
                        var u = a[r];
                        if (l && u[2] ? u[1] !== _[u[0]] : !(u[0] in _)) return !1;
                    }
                    for (; ++r < o; ) {
                        var s = (u = a[r])[0],
                            d = _[s],
                            S = u[1];
                        if (l && u[2]) {
                            if (void 0 === d && !(s in _)) return !1;
                        } else {
                            var c = new t();
                            if (i) var T = i(d, S, s, _, e, c);
                            if (!(void 0 === T ? n(S, d, 3, i, c) : T)) return !1;
                        }
                    }
                    return !0;
                };
            },
            2254: function(_, e, a) {
                var t = a(5220),
                    n = a(4528),
                    i = a(1716),
                    r = a(8255),
                    o = /^\[object .+?Constructor\]$/,
                    l = Function.prototype,
                    u = Object.prototype,
                    s = l.toString,
                    d = u.hasOwnProperty,
                    S = RegExp(
                        "^" +
                            s
                                .call(d)
                                .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                                .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") +
                            "$"
                    );
                _.exports = function(_) {
                    return !(!i(_) || n(_)) && (t(_) ? S : o).test(r(_));
                };
            },
            3723: function(_, e, a) {
                var t = a(7807),
                    n = a(5543),
                    i = a(8667),
                    r = {};
                (r["[object Float32Array]"] = r["[object Float64Array]"] = r["[object Int8Array]"] = r[
                    "[object Int16Array]"
                ] = r["[object Int32Array]"] = r["[object Uint8Array]"] = r["[object Uint8ClampedArray]"] = r[
                    "[object Uint16Array]"
                ] = r["[object Uint32Array]"] = !0),
                    (r["[object Arguments]"] = r["[object Array]"] = r["[object ArrayBuffer]"] = r[
                        "[object Boolean]"
                    ] = r["[object DataView]"] = r["[object Date]"] = r["[object Error]"] = r["[object Function]"] = r[
                        "[object Map]"
                    ] = r["[object Number]"] = r["[object Object]"] = r["[object RegExp]"] = r["[object Set]"] = r[
                        "[object String]"
                    ] = r["[object WeakMap]"] = !1),
                    (_.exports = function(_) {
                        return i(_) && n(_.length) && !!r[t(_)];
                    });
            },
            5391: function(_, e, a) {
                function t(_) {
                    return (
                        (t =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        t(_)
                    );
                }
                var n = a(4445),
                    i = a(2034),
                    r = a(3967),
                    o = a(1304),
                    l = a(8395);
                _.exports = function(_) {
                    return "function" == typeof _
                        ? _
                        : null == _
                        ? r
                        : "object" == t(_)
                        ? o(_)
                            ? i(_[0], _[1])
                            : n(_)
                        : l(_);
                };
            },
            571: function(_, e, a) {
                var t = a(2563),
                    n = a(7548),
                    i = Object.prototype.hasOwnProperty;
                _.exports = function(_) {
                    if (!t(_)) return n(_);
                    var e = [];
                    for (var a in Object(_)) i.call(_, a) && "constructor" != a && e.push(a);
                    return e;
                };
            },
            6558: function(_, e, a) {
                var t = a(9506),
                    n = a(3347);
                _.exports = function(_, e) {
                    var a = -1,
                        i = n(_) ? Array(_.length) : [];
                    return (
                        t(_, function(_, t, n) {
                            i[++a] = e(_, t, n);
                        }),
                        i
                    );
                };
            },
            4445: function(_, e, a) {
                var t = a(687),
                    n = a(6539),
                    i = a(9398);
                _.exports = function(_) {
                    var e = n(_);
                    return 1 == e.length && e[0][2]
                        ? i(e[0][0], e[0][1])
                        : function(a) {
                              return a === _ || t(a, _, e);
                          };
                };
            },
            2034: function(_, e, a) {
                var t = a(8725),
                    n = a(1139),
                    i = a(8997),
                    r = a(8225),
                    o = a(1771),
                    l = a(9398),
                    u = a(9998);
                _.exports = function(_, e) {
                    return r(_) && o(e)
                        ? l(u(_), e)
                        : function(a) {
                              var r = n(a, _);
                              return void 0 === r && r === e ? i(a, _) : t(e, r, 3);
                          };
                };
            },
            1506: function(_, e, a) {
                var t = a(3994),
                    n = a(2457),
                    i = a(5391),
                    r = a(6558),
                    o = a(9661),
                    l = a(6618),
                    u = a(8260),
                    s = a(3967),
                    d = a(1304);
                _.exports = function(_, e, a) {
                    e = e.length
                        ? t(e, function(_) {
                              return d(_)
                                  ? function(e) {
                                        return n(e, 1 === _.length ? _[0] : _);
                                    }
                                  : _;
                          })
                        : [s];
                    var S = -1;
                    e = t(e, l(i));
                    var c = r(_, function(_, a, n) {
                        return {
                            criteria: t(e, function(e) {
                                return e(_);
                            }),
                            index: ++S,
                            value: _,
                        };
                    });
                    return o(c, function(_, e) {
                        return u(_, e, a);
                    });
                };
            },
            5682: function(_) {
                _.exports = function(_) {
                    return function(e) {
                        return null == e ? void 0 : e[_];
                    };
                };
            },
            4526: function(_, e, a) {
                var t = a(2457);
                _.exports = function(_) {
                    return function(e) {
                        return t(e, _);
                    };
                };
            },
            1598: function(_) {
                var e = Math.floor;
                _.exports = function(_, a) {
                    var t = "";
                    if (!_ || a < 1 || a > 9007199254740991) return t;
                    do {
                        a % 2 && (t += _), (a = e(a / 2)) && (_ += _);
                    } while (a);
                    return t;
                };
            },
            6307: function(_, e, a) {
                var t = a(3967),
                    n = a(5212),
                    i = a(9125);
                _.exports = function(_, e) {
                    return i(n(_, e, t), _ + "");
                };
            },
            6986: function(_, e, a) {
                var t = a(5464),
                    n = a(3612),
                    i = a(3967),
                    r = n
                        ? function(_, e) {
                              return n(_, "toString", { configurable: !0, enumerable: !1, value: t(e), writable: !0 });
                          }
                        : i;
                _.exports = r;
            },
            2323: function(_) {
                _.exports = function(_, e, a) {
                    var t = -1,
                        n = _.length;
                    e < 0 && (e = -e > n ? 0 : n + e),
                        (a = a > n ? n : a) < 0 && (a += n),
                        (n = e > a ? 0 : (a - e) >>> 0),
                        (e >>>= 0);
                    for (var i = Array(n); ++t < n; ) i[t] = _[t + e];
                    return i;
                };
            },
            9661: function(_) {
                _.exports = function(_, e) {
                    var a = _.length;
                    for (_.sort(e); a--; ) _[a] = _[a].value;
                    return _;
                };
            },
            7498: function(_) {
                _.exports = function(_, e) {
                    for (var a = -1, t = Array(_); ++a < _; ) t[a] = e(a);
                    return t;
                };
            },
            9697: function(_, e, a) {
                var t = a(7206),
                    n = a(3994),
                    i = a(1304),
                    r = a(2570),
                    o = t ? t.prototype : void 0,
                    l = o ? o.toString : void 0;
                _.exports = function _(e) {
                    if ("string" == typeof e) return e;
                    if (i(e)) return n(e, _) + "";
                    if (r(e)) return l ? l.call(e) : "";
                    var a = e + "";
                    return "0" == a && 1 / e == -Infinity ? "-0" : a;
                };
            },
            4182: function(_, e, a) {
                var t = a(9135),
                    n = /^\s+/;
                _.exports = function(_) {
                    return _ ? _.slice(0, t(_) + 1).replace(n, "") : _;
                };
            },
            6618: function(_) {
                _.exports = function(_) {
                    return function(e) {
                        return _(e);
                    };
                };
            },
            2210: function(_) {
                _.exports = function(_, e) {
                    return _.has(e);
                };
            },
            3378: function(_, e, a) {
                var t = a(1304),
                    n = a(8225),
                    i = a(2140),
                    r = a(31);
                _.exports = function(_, e) {
                    return t(_) ? _ : n(_, e) ? [_] : i(r(_));
                };
            },
            6559: function(_, e, a) {
                var t = a(2323);
                _.exports = function(_, e, a) {
                    var n = _.length;
                    return (a = void 0 === a ? n : a), !e && a >= n ? _ : t(_, e, a);
                };
            },
            5474: function(_, e, a) {
                var t = a(2570);
                _.exports = function(_, e) {
                    if (_ !== e) {
                        var a = void 0 !== _,
                            n = null === _,
                            i = _ == _,
                            r = t(_),
                            o = void 0 !== e,
                            l = null === e,
                            u = e == e,
                            s = t(e);
                        if ((!l && !s && !r && _ > e) || (r && o && u && !l && !s) || (n && o && u) || (!a && u) || !i)
                            return 1;
                        if ((!n && !r && !s && _ < e) || (s && a && i && !n && !r) || (l && a && i) || (!o && i) || !u)
                            return -1;
                    }
                    return 0;
                };
            },
            8260: function(_, e, a) {
                var t = a(5474);
                _.exports = function(_, e, a) {
                    for (var n = -1, i = _.criteria, r = e.criteria, o = i.length, l = a.length; ++n < o; ) {
                        var u = t(i[n], r[n]);
                        if (u) return n >= l ? u : u * ("desc" == a[n] ? -1 : 1);
                    }
                    return _.index - e.index;
                };
            },
            8510: function(_, e, a) {
                var t = a(4366)["__core-js_shared__"];
                _.exports = t;
            },
            9087: function(_, e, a) {
                var t = a(3347);
                _.exports = function(_, e) {
                    return function(a, n) {
                        if (null == a) return a;
                        if (!t(a)) return _(a, n);
                        for (
                            var i = a.length, r = e ? i : -1, o = Object(a);
                            (e ? r-- : ++r < i) && !1 !== n(o[r], r, o);

                        );
                        return a;
                    };
                };
            },
            5257: function(_) {
                _.exports = function(_) {
                    return function(e, a, t) {
                        for (var n = -1, i = Object(e), r = t(e), o = r.length; o--; ) {
                            var l = r[_ ? o : ++n];
                            if (!1 === a(i[l], l, i)) break;
                        }
                        return e;
                    };
                };
            },
            5479: function(_, e, a) {
                var t = a(5391),
                    n = a(3347),
                    i = a(3115);
                _.exports = function(_) {
                    return function(e, a, r) {
                        var o = Object(e);
                        if (!n(e)) {
                            var l = t(a, 3);
                            (e = i(e)),
                                (a = function(_) {
                                    return l(o[_], _, o);
                                });
                        }
                        var u = _(e, a, r);
                        return u > -1 ? o[l ? e[u] : u] : void 0;
                    };
                };
            },
            4449: function(_, e, a) {
                var t = a(1598),
                    n = a(9697),
                    i = a(6559),
                    r = a(9130),
                    o = a(8460),
                    l = a(1200),
                    u = Math.ceil;
                _.exports = function(_, e) {
                    var a = (e = void 0 === e ? " " : n(e)).length;
                    if (a < 2) return a ? t(e, _) : e;
                    var s = t(e, u(_ / o(e)));
                    return r(e) ? i(l(s), 0, _).join("") : s.slice(0, _);
                };
            },
            3612: function(_, e, a) {
                var t = a(1095),
                    n = (function() {
                        try {
                            var _ = t(Object, "defineProperty");
                            return _({}, "", {}), _;
                        } catch (e) {}
                    })();
                _.exports = n;
            },
            5824: function(_, e, a) {
                var t = a(2051),
                    n = a(8842),
                    i = a(2210);
                _.exports = function(_, e, a, r, o, l) {
                    var u = 1 & a,
                        s = _.length,
                        d = e.length;
                    if (s != d && !(u && d > s)) return !1;
                    var S = l.get(_),
                        c = l.get(e);
                    if (S && c) return S == e && c == _;
                    var T = -1,
                        E = !0,
                        y = 2 & a ? new t() : void 0;
                    for (l.set(_, e), l.set(e, _); ++T < s; ) {
                        var O = _[T],
                            m = e[T];
                        if (r) var N = u ? r(m, O, T, e, _, l) : r(O, m, T, _, e, l);
                        if (void 0 !== N) {
                            if (N) continue;
                            E = !1;
                            break;
                        }
                        if (y) {
                            if (
                                !n(e, function(_, e) {
                                    if (!i(y, e) && (O === _ || o(O, _, a, r, l))) return y.push(e);
                                })
                            ) {
                                E = !1;
                                break;
                            }
                        } else if (O !== m && !o(O, m, a, r, l)) {
                            E = !1;
                            break;
                        }
                    }
                    return l.delete(_), l.delete(e), E;
                };
            },
            6037: function(_, e, a) {
                var t = a(7206),
                    n = a(7729),
                    i = a(3114),
                    r = a(5824),
                    o = a(1483),
                    l = a(5487),
                    u = t ? t.prototype : void 0,
                    s = u ? u.valueOf : void 0;
                _.exports = function(_, e, a, t, u, d, S) {
                    switch (a) {
                        case "[object DataView]":
                            if (_.byteLength != e.byteLength || _.byteOffset != e.byteOffset) return !1;
                            (_ = _.buffer), (e = e.buffer);
                        case "[object ArrayBuffer]":
                            return !(_.byteLength != e.byteLength || !d(new n(_), new n(e)));
                        case "[object Boolean]":
                        case "[object Date]":
                        case "[object Number]":
                            return i(+_, +e);
                        case "[object Error]":
                            return _.name == e.name && _.message == e.message;
                        case "[object RegExp]":
                        case "[object String]":
                            return _ == e + "";
                        case "[object Map]":
                            var c = o;
                        case "[object Set]":
                            var T = 1 & t;
                            if ((c || (c = l), _.size != e.size && !T)) return !1;
                            var E = S.get(_);
                            if (E) return E == e;
                            (t |= 2), S.set(_, e);
                            var y = r(c(_), c(e), t, u, d, S);
                            return S.delete(_), y;
                        case "[object Symbol]":
                            if (s) return s.call(_) == s.call(e);
                    }
                    return !1;
                };
            },
            5988: function(_, e, a) {
                var t = a(5582),
                    n = Object.prototype.hasOwnProperty;
                _.exports = function(_, e, a, i, r, o) {
                    var l = 1 & a,
                        u = t(_),
                        s = u.length;
                    if (s != t(e).length && !l) return !1;
                    for (var d = s; d--; ) {
                        var S = u[d];
                        if (!(l ? S in e : n.call(e, S))) return !1;
                    }
                    var c = o.get(_),
                        T = o.get(e);
                    if (c && T) return c == e && T == _;
                    var E = !0;
                    o.set(_, e), o.set(e, _);
                    for (var y = l; ++d < s; ) {
                        var O = _[(S = u[d])],
                            m = e[S];
                        if (i) var N = l ? i(m, O, S, e, _, o) : i(O, m, S, _, e, o);
                        if (!(void 0 === N ? O === m || r(O, m, a, i, o) : N)) {
                            E = !1;
                            break;
                        }
                        y || (y = "constructor" == S);
                    }
                    if (E && !y) {
                        var p = _.constructor,
                            P = e.constructor;
                        p == P ||
                            !("constructor" in _) ||
                            !("constructor" in e) ||
                            ("function" == typeof p && p instanceof p && "function" == typeof P && P instanceof P) ||
                            (E = !1);
                    }
                    return o.delete(_), o.delete(e), E;
                };
            },
            4891: function(_, e, a) {
                function t(_) {
                    return (
                        (t =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        t(_)
                    );
                }
                var n = "object" == (void 0 === a.g ? "undefined" : t(a.g)) && a.g && a.g.Object === Object && a.g;
                _.exports = n;
            },
            5582: function(_, e, a) {
                var t = a(3921),
                    n = a(461),
                    i = a(3115);
                _.exports = function(_) {
                    return t(_, i, n);
                };
            },
            3872: function(_, e, a) {
                var t = a(2754);
                _.exports = function(_, e) {
                    var a = _.__data__;
                    return t(e) ? a["string" == typeof e ? "string" : "hash"] : a.map;
                };
            },
            6539: function(_, e, a) {
                var t = a(1771),
                    n = a(3115);
                _.exports = function(_) {
                    for (var e = n(_), a = e.length; a--; ) {
                        var i = e[a],
                            r = _[i];
                        e[a] = [i, r, t(r)];
                    }
                    return e;
                };
            },
            1095: function(_, e, a) {
                var t = a(2254),
                    n = a(4781);
                _.exports = function(_, e) {
                    var a = n(_, e);
                    return t(a) ? a : void 0;
                };
            },
            3187: function(_, e, a) {
                var t = a(7206),
                    n = Object.prototype,
                    i = n.hasOwnProperty,
                    r = n.toString,
                    o = t ? t.toStringTag : void 0;
                _.exports = function(_) {
                    var e = i.call(_, o),
                        a = _[o];
                    try {
                        _[o] = void 0;
                        var t = !0;
                    } catch (l) {}
                    var n = r.call(_);
                    return t && (e ? (_[o] = a) : delete _[o]), n;
                };
            },
            461: function(_, e, a) {
                var t = a(7422),
                    n = a(2616),
                    i = Object.prototype.propertyIsEnumerable,
                    r = Object.getOwnPropertySymbols,
                    o = r
                        ? function(_) {
                              return null == _
                                  ? []
                                  : ((_ = Object(_)),
                                    t(r(_), function(e) {
                                        return i.call(_, e);
                                    }));
                          }
                        : n;
                _.exports = o;
            },
            8657: function(_, e, a) {
                var t = a(7128),
                    n = a(6588),
                    i = a(9019),
                    r = a(6202),
                    o = a(3975),
                    l = a(7807),
                    u = a(8255),
                    s = "[object Map]",
                    d = "[object Promise]",
                    S = "[object Set]",
                    c = "[object WeakMap]",
                    T = "[object DataView]",
                    E = u(t),
                    y = u(n),
                    O = u(i),
                    m = u(r),
                    N = u(o),
                    p = l;
                ((t && p(new t(new ArrayBuffer(1))) != T) ||
                    (n && p(new n()) != s) ||
                    (i && p(i.resolve()) != d) ||
                    (r && p(new r()) != S) ||
                    (o && p(new o()) != c)) &&
                    (p = function(_) {
                        var e = l(_),
                            a = "[object Object]" == e ? _.constructor : void 0,
                            t = a ? u(a) : "";
                        if (t)
                            switch (t) {
                                case E:
                                    return T;
                                case y:
                                    return s;
                                case O:
                                    return d;
                                case m:
                                    return S;
                                case N:
                                    return c;
                            }
                        return e;
                    }),
                    (_.exports = p);
            },
            4781: function(_) {
                _.exports = function(_, e) {
                    return null == _ ? void 0 : _[e];
                };
            },
            7952: function(_, e, a) {
                var t = a(3378),
                    n = a(3255),
                    i = a(1304),
                    r = a(2049),
                    o = a(5543),
                    l = a(9998);
                _.exports = function(_, e, a) {
                    for (var u = -1, s = (e = t(e, _)).length, d = !1; ++u < s; ) {
                        var S = l(e[u]);
                        if (!(d = null != _ && a(_, S))) break;
                        _ = _[S];
                    }
                    return d || ++u != s ? d : !!(s = null == _ ? 0 : _.length) && o(s) && r(S, s) && (i(_) || n(_));
                };
            },
            9130: function(_) {
                var e = RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");
                _.exports = function(_) {
                    return e.test(_);
                };
            },
            2514: function(_, e, a) {
                var t = a(9535);
                _.exports = function() {
                    (this.__data__ = t ? t(null) : {}), (this.size = 0);
                };
            },
            5485: function(_) {
                _.exports = function(_) {
                    var e = this.has(_) && delete this.__data__[_];
                    return (this.size -= e ? 1 : 0), e;
                };
            },
            243: function(_, e, a) {
                var t = a(9535),
                    n = Object.prototype.hasOwnProperty;
                _.exports = function(_) {
                    var e = this.__data__;
                    if (t) {
                        var a = e[_];
                        return "__lodash_hash_undefined__" === a ? void 0 : a;
                    }
                    return n.call(e, _) ? e[_] : void 0;
                };
            },
            8454: function(_, e, a) {
                var t = a(9535),
                    n = Object.prototype.hasOwnProperty;
                _.exports = function(_) {
                    var e = this.__data__;
                    return t ? void 0 !== e[_] : n.call(e, _);
                };
            },
            3984: function(_, e, a) {
                var t = a(9535);
                _.exports = function(_, e) {
                    var a = this.__data__;
                    return (
                        (this.size += this.has(_) ? 0 : 1),
                        (a[_] = t && void 0 === e ? "__lodash_hash_undefined__" : e),
                        this
                    );
                };
            },
            1542: function(_, e, a) {
                var t = a(7206),
                    n = a(3255),
                    i = a(1304),
                    r = t ? t.isConcatSpreadable : void 0;
                _.exports = function(_) {
                    return i(_) || n(_) || !!(r && _ && _[r]);
                };
            },
            2049: function(_) {
                function e(_) {
                    return (
                        (e =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        e(_)
                    );
                }
                var a = /^(?:0|[1-9]\d*)$/;
                _.exports = function(_, t) {
                    var n = e(_);
                    return (
                        !!(t = null == t ? 9007199254740991 : t) &&
                        ("number" == n || ("symbol" != n && a.test(_))) &&
                        _ > -1 &&
                        _ % 1 == 0 &&
                        _ < t
                    );
                };
            },
            965: function(_, e, a) {
                function t(_) {
                    return (
                        (t =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        t(_)
                    );
                }
                var n = a(3114),
                    i = a(3347),
                    r = a(2049),
                    o = a(1716);
                _.exports = function(_, e, a) {
                    if (!o(a)) return !1;
                    var l = t(e);
                    return !!("number" == l ? i(a) && r(e, a.length) : "string" == l && e in a) && n(a[e], _);
                };
            },
            8225: function(_, e, a) {
                function t(_) {
                    return (
                        (t =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        t(_)
                    );
                }
                var n = a(1304),
                    i = a(2570),
                    r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
                    o = /^\w*$/;
                _.exports = function(_, e) {
                    if (n(_)) return !1;
                    var a = t(_);
                    return (
                        !("number" != a && "symbol" != a && "boolean" != a && null != _ && !i(_)) ||
                        o.test(_) || !r.test(_) || (null != e && _ in Object(e))
                    );
                };
            },
            2754: function(_) {
                function e(_) {
                    return (
                        (e =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        e(_)
                    );
                }
                _.exports = function(_) {
                    var a = e(_);
                    return "string" == a || "number" == a || "symbol" == a || "boolean" == a
                        ? "__proto__" !== _
                        : null === _;
                };
            },
            4528: function(_, e, a) {
                var t,
                    n = a(8510),
                    i = (t = /[^.]+$/.exec((n && n.keys && n.keys.IE_PROTO) || "")) ? "Symbol(src)_1." + t : "";
                _.exports = function(_) {
                    return !!i && i in _;
                };
            },
            2563: function(_) {
                var e = Object.prototype;
                _.exports = function(_) {
                    var a = _ && _.constructor;
                    return _ === (("function" == typeof a && a.prototype) || e);
                };
            },
            1771: function(_, e, a) {
                var t = a(1716);
                _.exports = function(_) {
                    return _ == _ && !t(_);
                };
            },
            9801: function(_) {
                _.exports = function() {
                    (this.__data__ = []), (this.size = 0);
                };
            },
            2442: function(_, e, a) {
                var t = a(5509),
                    n = Array.prototype.splice;
                _.exports = function(_) {
                    var e = this.__data__,
                        a = t(e, _);
                    return !(a < 0) && (a == e.length - 1 ? e.pop() : n.call(e, a, 1), --this.size, !0);
                };
            },
            8146: function(_, e, a) {
                var t = a(5509);
                _.exports = function(_) {
                    var e = this.__data__,
                        a = t(e, _);
                    return a < 0 ? void 0 : e[a][1];
                };
            },
            4612: function(_, e, a) {
                var t = a(5509);
                _.exports = function(_) {
                    return t(this.__data__, _) > -1;
                };
            },
            6275: function(_, e, a) {
                var t = a(5509);
                _.exports = function(_, e) {
                    var a = this.__data__,
                        n = t(a, _);
                    return n < 0 ? (++this.size, a.push([_, e])) : (a[n][1] = e), this;
                };
            },
            4917: function(_, e, a) {
                var t = a(8431),
                    n = a(3472),
                    i = a(6588);
                _.exports = function() {
                    (this.size = 0), (this.__data__ = { hash: new t(), map: new (i || n)(), string: new t() });
                };
            },
            6890: function(_, e, a) {
                var t = a(3872);
                _.exports = function(_) {
                    var e = t(this, _).delete(_);
                    return (this.size -= e ? 1 : 0), e;
                };
            },
            9413: function(_, e, a) {
                var t = a(3872);
                _.exports = function(_) {
                    return t(this, _).get(_);
                };
            },
            3583: function(_, e, a) {
                var t = a(3872);
                _.exports = function(_) {
                    return t(this, _).has(_);
                };
            },
            9399: function(_, e, a) {
                var t = a(3872);
                _.exports = function(_, e) {
                    var a = t(this, _),
                        n = a.size;
                    return a.set(_, e), (this.size += a.size == n ? 0 : 1), this;
                };
            },
            1483: function(_) {
                _.exports = function(_) {
                    var e = -1,
                        a = Array(_.size);
                    return (
                        _.forEach(function(_, t) {
                            a[++e] = [t, _];
                        }),
                        a
                    );
                };
            },
            9398: function(_) {
                _.exports = function(_, e) {
                    return function(a) {
                        return null != a && a[_] === e && (void 0 !== e || _ in Object(a));
                    };
                };
            },
            2415: function(_, e, a) {
                var t = a(6210);
                _.exports = function(_) {
                    var e = t(_, function(_) {
                            return 500 === a.size && a.clear(), _;
                        }),
                        a = e.cache;
                    return e;
                };
            },
            9535: function(_, e, a) {
                var t = a(1095)(Object, "create");
                _.exports = t;
            },
            7548: function(_, e, a) {
                var t = a(8033)(Object.keys, Object);
                _.exports = t;
            },
            8820: function(_, e, a) {
                function t(_) {
                    return (
                        (t =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        t(_)
                    );
                }
                _ = a.nmd(_);
                var n = a(4891),
                    i = "object" == t(e) && e && !e.nodeType && e,
                    r = i && "object" == t(_) && _ && !_.nodeType && _,
                    o = r && r.exports === i && n.process,
                    l = (function() {
                        try {
                            var _ = r && r.require && r.require("util").types;
                            return _ || (o && o.binding && o.binding("util"));
                        } catch (e) {}
                    })();
                _.exports = l;
            },
            2778: function(_) {
                var e = Object.prototype.toString;
                _.exports = function(_) {
                    return e.call(_);
                };
            },
            8033: function(_) {
                _.exports = function(_, e) {
                    return function(a) {
                        return _(e(a));
                    };
                };
            },
            5212: function(_, e, a) {
                var t = a(8998),
                    n = Math.max;
                _.exports = function(_, e, a) {
                    return (
                        (e = n(void 0 === e ? _.length - 1 : e, 0)),
                        function() {
                            for (var i = arguments, r = -1, o = n(i.length - e, 0), l = Array(o); ++r < o; )
                                l[r] = i[e + r];
                            r = -1;
                            for (var u = Array(e + 1); ++r < e; ) u[r] = i[r];
                            return (u[e] = a(l)), t(_, this, u);
                        }
                    );
                };
            },
            4366: function(_, e, a) {
                function t(_) {
                    return (
                        (t =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        t(_)
                    );
                }
                var n = a(4891),
                    i =
                        "object" == ("undefined" == typeof self ? "undefined" : t(self)) &&
                        self &&
                        self.Object === Object &&
                        self,
                    r = n || i || Function("return this")();
                _.exports = r;
            },
            939: function(_) {
                _.exports = function(_) {
                    return this.__data__.set(_, "__lodash_hash_undefined__"), this;
                };
            },
            7451: function(_) {
                _.exports = function(_) {
                    return this.__data__.has(_);
                };
            },
            5487: function(_) {
                _.exports = function(_) {
                    var e = -1,
                        a = Array(_.size);
                    return (
                        _.forEach(function(_) {
                            a[++e] = _;
                        }),
                        a
                    );
                };
            },
            9125: function(_, e, a) {
                var t = a(6986),
                    n = a(2929)(t);
                _.exports = n;
            },
            2929: function(_) {
                var e = Date.now;
                _.exports = function(_) {
                    var a = 0,
                        t = 0;
                    return function() {
                        var n = e(),
                            i = 16 - (n - t);
                        if (((t = n), i > 0)) {
                            if (++a >= 800) return arguments[0];
                        } else a = 0;
                        return _.apply(void 0, arguments);
                    };
                };
            },
            8276: function(_, e, a) {
                var t = a(3472);
                _.exports = function() {
                    (this.__data__ = new t()), (this.size = 0);
                };
            },
            2342: function(_) {
                _.exports = function(_) {
                    var e = this.__data__,
                        a = e.delete(_);
                    return (this.size = e.size), a;
                };
            },
            8062: function(_) {
                _.exports = function(_) {
                    return this.__data__.get(_);
                };
            },
            1857: function(_) {
                _.exports = function(_) {
                    return this.__data__.has(_);
                };
            },
            8969: function(_, e, a) {
                var t = a(3472),
                    n = a(6588),
                    i = a(460);
                _.exports = function(_, e) {
                    var a = this.__data__;
                    if (a instanceof t) {
                        var r = a.__data__;
                        if (!n || r.length < 199) return r.push([_, e]), (this.size = ++a.size), this;
                        a = this.__data__ = new i(r);
                    }
                    return a.set(_, e), (this.size = a.size), this;
                };
            },
            8460: function(_, e, a) {
                var t = a(8537),
                    n = a(9130),
                    i = a(3167);
                _.exports = function(_) {
                    return n(_) ? i(_) : t(_);
                };
            },
            1200: function(_, e, a) {
                var t = a(2738),
                    n = a(9130),
                    i = a(9706);
                _.exports = function(_) {
                    return n(_) ? i(_) : t(_);
                };
            },
            2140: function(_, e, a) {
                var t = a(2415),
                    n = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
                    i = /\\(\\)?/g,
                    r = t(function(_) {
                        var e = [];
                        return (
                            46 === _.charCodeAt(0) && e.push(""),
                            _.replace(n, function(_, a, t, n) {
                                e.push(t ? n.replace(i, "$1") : a || _);
                            }),
                            e
                        );
                    });
                _.exports = r;
            },
            9998: function(_, e, a) {
                var t = a(2570);
                _.exports = function(_) {
                    if ("string" == typeof _ || t(_)) return _;
                    var e = _ + "";
                    return "0" == e && 1 / _ == -Infinity ? "-0" : e;
                };
            },
            8255: function(_) {
                var e = Function.prototype.toString;
                _.exports = function(_) {
                    if (null != _) {
                        try {
                            return e.call(_);
                        } catch (a) {}
                        try {
                            return _ + "";
                        } catch (a) {}
                    }
                    return "";
                };
            },
            9135: function(_) {
                var e = /\s/;
                _.exports = function(_) {
                    for (var a = _.length; a-- && e.test(_.charAt(a)); );
                    return a;
                };
            },
            3167: function(_) {
                var e = "[\\ud800-\\udfff]",
                    a = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
                    t = "\\ud83c[\\udffb-\\udfff]",
                    n = "[^\\ud800-\\udfff]",
                    i = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                    r = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                    o = "(?:" + a + "|" + t + ")" + "?",
                    l = "[\\ufe0e\\ufe0f]?",
                    u = l + o + ("(?:\\u200d(?:" + [n, i, r].join("|") + ")" + l + o + ")*"),
                    s = "(?:" + [n + a + "?", a, i, r, e].join("|") + ")",
                    d = RegExp(t + "(?=" + t + ")|" + s + u, "g");
                _.exports = function(_) {
                    for (var e = (d.lastIndex = 0); d.test(_); ) ++e;
                    return e;
                };
            },
            9706: function(_) {
                var e = "[\\ud800-\\udfff]",
                    a = "[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",
                    t = "\\ud83c[\\udffb-\\udfff]",
                    n = "[^\\ud800-\\udfff]",
                    i = "(?:\\ud83c[\\udde6-\\uddff]){2}",
                    r = "[\\ud800-\\udbff][\\udc00-\\udfff]",
                    o = "(?:" + a + "|" + t + ")" + "?",
                    l = "[\\ufe0e\\ufe0f]?",
                    u = l + o + ("(?:\\u200d(?:" + [n, i, r].join("|") + ")" + l + o + ")*"),
                    s = "(?:" + [n + a + "?", a, i, r, e].join("|") + ")",
                    d = RegExp(t + "(?=" + t + ")|" + s + u, "g");
                _.exports = function(_) {
                    return _.match(d) || [];
                };
            },
            5418: function(_) {
                _.exports = function(_) {
                    for (var e = -1, a = null == _ ? 0 : _.length, t = 0, n = []; ++e < a; ) {
                        var i = _[e];
                        i && (n[t++] = i);
                    }
                    return n;
                };
            },
            5464: function(_) {
                _.exports = function(_) {
                    return function() {
                        return _;
                    };
                };
            },
            3114: function(_) {
                _.exports = function(_, e) {
                    return _ === e || (_ != _ && e != e);
                };
            },
            5457: function(_, e, a) {
                var t = a(5479)(a(3153));
                _.exports = t;
            },
            3153: function(_, e, a) {
                var t = a(8621),
                    n = a(5391),
                    i = a(3457),
                    r = Math.max;
                _.exports = function(_, e, a) {
                    var o = null == _ ? 0 : _.length;
                    if (!o) return -1;
                    var l = null == a ? 0 : i(a);
                    return l < 0 && (l = r(o + l, 0)), t(_, n(e, 3), l);
                };
            },
            1139: function(_, e, a) {
                var t = a(2457);
                _.exports = function(_, e, a) {
                    var n = null == _ ? void 0 : t(_, e);
                    return void 0 === n ? a : n;
                };
            },
            8997: function(_, e, a) {
                var t = a(3430),
                    n = a(7952);
                _.exports = function(_, e) {
                    return null != _ && n(_, e, t);
                };
            },
            3967: function(_) {
                _.exports = function(_) {
                    return _;
                };
            },
            3255: function(_, e, a) {
                var t = a(9353),
                    n = a(8667),
                    i = Object.prototype,
                    r = i.hasOwnProperty,
                    o = i.propertyIsEnumerable,
                    l = t(
                        (function() {
                            return arguments;
                        })()
                    )
                        ? t
                        : function(_) {
                              return n(_) && r.call(_, "callee") && !o.call(_, "callee");
                          };
                _.exports = l;
            },
            1304: function(_) {
                var e = Array.isArray;
                _.exports = e;
            },
            3347: function(_, e, a) {
                var t = a(5220),
                    n = a(5543);
                _.exports = function(_) {
                    return null != _ && n(_.length) && !t(_);
                };
            },
            8448: function(_, e, a) {
                function t(_) {
                    return (
                        (t =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        t(_)
                    );
                }
                _ = a.nmd(_);
                var n = a(4366),
                    i = a(298),
                    r = "object" == t(e) && e && !e.nodeType && e,
                    o = r && "object" == t(_) && _ && !_.nodeType && _,
                    l = o && o.exports === r ? n.Buffer : void 0,
                    u = (l ? l.isBuffer : void 0) || i;
                _.exports = u;
            },
            5220: function(_, e, a) {
                var t = a(7807),
                    n = a(1716);
                _.exports = function(_) {
                    if (!n(_)) return !1;
                    var e = t(_);
                    return (
                        "[object Function]" == e ||
                        "[object GeneratorFunction]" == e ||
                        "[object AsyncFunction]" == e ||
                        "[object Proxy]" == e
                    );
                };
            },
            5543: function(_) {
                _.exports = function(_) {
                    return "number" == typeof _ && _ > -1 && _ % 1 == 0 && _ <= 9007199254740991;
                };
            },
            4006: function(_, e, a) {
                var t = a(7807),
                    n = a(8667);
                _.exports = function(_) {
                    return "number" == typeof _ || (n(_) && "[object Number]" == t(_));
                };
            },
            1716: function(_) {
                function e(_) {
                    return (
                        (e =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        e(_)
                    );
                }
                _.exports = function(_) {
                    var a = e(_);
                    return null != _ && ("object" == a || "function" == a);
                };
            },
            8667: function(_) {
                function e(_) {
                    return (
                        (e =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        e(_)
                    );
                }
                _.exports = function(_) {
                    return null != _ && "object" == e(_);
                };
            },
            2570: function(_, e, a) {
                function t(_) {
                    return (
                        (t =
                            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                ? function(_) {
                                      return typeof _;
                                  }
                                : function(_) {
                                      return _ &&
                                          "function" == typeof Symbol &&
                                          _.constructor === Symbol &&
                                          _ !== Symbol.prototype
                                          ? "symbol"
                                          : typeof _;
                                  }),
                        t(_)
                    );
                }
                var n = a(7807),
                    i = a(8667);
                _.exports = function(_) {
                    return "symbol" == t(_) || (i(_) && "[object Symbol]" == n(_));
                };
            },
            7592: function(_, e, a) {
                var t = a(3723),
                    n = a(6618),
                    i = a(8820),
                    r = i && i.isTypedArray,
                    o = r ? n(r) : t;
                _.exports = o;
            },
            3115: function(_, e, a) {
                var t = a(558),
                    n = a(571),
                    i = a(3347);
                _.exports = function(_) {
                    return i(_) ? t(_) : n(_);
                };
            },
            6210: function(_, e, a) {
                var t = a(460);
                function n(_, e) {
                    if ("function" != typeof _ || (null != e && "function" != typeof e))
                        throw new TypeError("Expected a function");
                    var a = function a() {
                        var t = arguments,
                            n = e ? e.apply(this, t) : t[0],
                            i = a.cache;
                        if (i.has(n)) return i.get(n);
                        var r = _.apply(this, t);
                        return (a.cache = i.set(n, r) || i), r;
                    };
                    return (a.cache = new (n.Cache || t)()), a;
                }
                (n.Cache = t), (_.exports = n);
            },
            1099: function(_, e, a) {
                var t = a(4449),
                    n = a(8460),
                    i = a(3457),
                    r = a(31);
                _.exports = function(_, e, a) {
                    _ = r(_);
                    var o = (e = i(e)) ? n(_) : 0;
                    return e && o < e ? t(e - o, a) + _ : _;
                };
            },
            8395: function(_, e, a) {
                var t = a(5682),
                    n = a(4526),
                    i = a(8225),
                    r = a(9998);
                _.exports = function(_) {
                    return i(_) ? t(r(_)) : n(_);
                };
            },
            7025: function(_, e, a) {
                var t = a(31);
                _.exports = function() {
                    var _ = arguments,
                        e = t(_[0]);
                    return _.length < 3 ? e : e.replace(_[1], _[2]);
                };
            },
            3532: function(_) {
                var e = Array.prototype.reverse;
                _.exports = function(_) {
                    return null == _ ? _ : e.call(_);
                };
            },
            7074: function(_, e, a) {
                var t = a(1725),
                    n = a(1506),
                    i = a(6307),
                    r = a(965),
                    o = i(function(_, e) {
                        if (null == _) return [];
                        var a = e.length;
                        return (
                            a > 1 && r(_, e[0], e[1]) ? (e = []) : a > 2 && r(e[0], e[1], e[2]) && (e = [e[0]]),
                            n(_, t(e, 1), [])
                        );
                    });
                _.exports = o;
            },
            2616: function(_) {
                _.exports = function() {
                    return [];
                };
            },
            298: function(_) {
                _.exports = function() {
                    return !1;
                };
            },
            4790: function(_, e, a) {
                var t = a(1666),
                    n = 1 / 0;
                _.exports = function(_) {
                    return _
                        ? (_ = t(_)) === n || _ === -1 / 0
                            ? 17976931348623157e292 * (_ < 0 ? -1 : 1)
                            : _ == _
                            ? _
                            : 0
                        : 0 === _
                        ? _
                        : 0;
                };
            },
            3457: function(_, e, a) {
                var t = a(4790);
                _.exports = function(_) {
                    var e = t(_),
                        a = e % 1;
                    return e == e ? (a ? e - a : e) : 0;
                };
            },
            1666: function(_, e, a) {
                var t = a(4182),
                    n = a(1716),
                    i = a(2570),
                    r = /^[-+]0x[0-9a-f]+$/i,
                    o = /^0b[01]+$/i,
                    l = /^0o[0-7]+$/i,
                    u = parseInt;
                _.exports = function(_) {
                    if ("number" == typeof _) return _;
                    if (i(_)) return NaN;
                    if (n(_)) {
                        var e = "function" == typeof _.valueOf ? _.valueOf() : _;
                        _ = n(e) ? e + "" : e;
                    }
                    if ("string" != typeof _) return 0 === _ ? _ : +_;
                    _ = t(_);
                    var a = o.test(_);
                    return a || l.test(_) ? u(_.slice(2), a ? 2 : 8) : r.test(_) ? NaN : +_;
                };
            },
            31: function(_, e, a) {
                var t = a(9697);
                _.exports = function(_) {
                    return null == _ ? "" : t(_);
                };
            },
            9748: function(_, e) {
                function a(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function t(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var t = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? a(Object(t), !0).forEach(function(e) {
                                  n(_, e, t[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(t))
                            : a(Object(t)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(t, e));
                              });
                    }
                    return _;
                }
                function n(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.playMenuDefaultActive = e.orderDigitsI18n = e.groupCodeDefaultActive = e.defaultActivePlayMenu = e.default = e.PlayMenu = void 0);
                var i = {
                        digitsI18n: {
                            0: "startDigit.ones",
                            1: "startDigit.tens",
                            2: "startDigit.hundreds",
                            3: "startDigit.thousands",
                            4: "startDigit.tenThousands",
                        },
                    },
                    r = {
                        digitsI18n: {
                            1: "startDigit.tenThousands2",
                            2: "startDigit.thousands2",
                            3: "startDigit.hundreds2",
                            4: "startDigit.tens2",
                            5: "startDigit.ones2",
                        },
                    },
                    o = {
                        digitsI18n: {
                            0: "startDigit.pk10_first",
                            1: "startDigit.pk10_second",
                            2: "startDigit.pk10_third",
                            3: "startDigit.pk10_fourth",
                            4: "startDigit.pk10_fifth",
                            5: "startDigit.pk10_sixth",
                            6: "startDigit.pk10_seventh",
                            7: "startDigit.pk10_eighth",
                            8: "startDigit.pk10_ninth",
                            9: "startDigit.pk10_tenth",
                        },
                    },
                    l = {
                        FixedPlace: t({}, i),
                        FixedPlace_Last_4: t({}, i),
                        FixedPlace_Last_3: t({}, i),
                        FixedPlace_Last_2: t({}, i),
                        FixedPlace_Last_1: t({}, i),
                        FixedPlace_ZY: t({}, i),
                        Any2Sum_SSC: t({}, r),
                        Any2Com_SSC_Single: t({}, r),
                        Any3Sum_SSC: t({}, r),
                        Any2Com_SSC: t({}, r),
                        Any3Com3_SSC: t({}, r),
                        Any3Com_SSC: t({}, r),
                        Any3Com6_SSC: t({}, r),
                        Any4Com12_SSC: t({}, r),
                        Any4Com6_SSC: t({}, r),
                        Any4Com4_SSC: t({}, r),
                        Any4Com24_SSC: t({}, r),
                        FixedPlace_11X5: t(
                            {},
                            {
                                digitsI18n: {
                                    4: "startDigit.first",
                                    3: "startDigit.second",
                                    2: "startDigit.third",
                                    1: "startDigit.fourth",
                                    0: "startDigit.fifth",
                                },
                            }
                        ),
                        FixedPlace_LF: t({}, i),
                        First5Fixed_PK10: t({}, o),
                        Last5Fixed_PK10: t({}, o),
                        First5BSOE_PK10: t({}, o),
                        Last5BSOE_PK10: t({}, o),
                        Choose1_Fixed_Place_4D: t({}, i),
                    };
                e.orderDigitsI18n = l;
                e.default = {};
                e.groupCodeDefaultActive = {
                    SSC: { defaultActive: "Last_3", subPlayMenu: { defaultActive: "Last3Straight" } },
                    "11X5": { defaultActive: "First_3_11X5", subPlayMenu: { defaultActive: "First3Straight_11X5" } },
                    PK10: { defaultActive: "Fixed_Place_PK10", subPlayMenu: { defaultActive: "First5Fixed_PK10" } },
                    LF: { defaultActive: "Last_3_3D", subPlayMenu: { defaultActive: "Last3Straight_LF" } },
                    K3: { defaultActive: "Sum_Number_K3", subPlayMenu: { defaultActive: "Sum_K3" } },
                };
                e.playMenuDefaultActive = {
                    FC3D: { defaultActive: "Last_3_3D", subPlayMenu: { defaultActive: "Last3Straight_LF" } },
                    TCP3P5: { defaultActive: "P3_Straight_LF", subPlayMenu: { defaultActive: "P3Straight_LF" } },
                    HK6: { defaultActive: "Special_LHC", subPlayMenu: {} },
                    TCSSC: { defaultActive: "Last_3", subPlayMenu: { defaultActive: "Last3Straight" } },
                    TC11X5: { defaultActive: "First_3_11X5", subPlayMenu: { defaultActive: "First3Straight_11X5" } },
                };
                e.defaultActivePlayMenu = {
                    trad: {
                        group: {
                            SSC: { active: "Last_3", subPlayMenu: { active: "Last3Straight" } },
                            "11X5": { active: "First_3_11X5", subPlayMenu: { active: "First3Straight_11X5" } },
                            PK10: { active: "Fixed_Place_PK10", subPlayMenu: { active: "First5Fixed_PK10" } },
                            LF: { active: "Last_3_3D", subPlayMenu: { active: "Last3Straight_LF" } },
                            K3: { active: "Sum_K3", subPlayMenu: { active: "Sum_K3" } },
                        },
                        endsWith: {
                            "3D": { active: "Last_3_3D", subPlayMenu: { active: "Last3Straight_LF" } },
                            P5: { active: "P3_Straight_LF", subPlayMenu: { active: "P3Straight_LF" } },
                        },
                    },
                    ent: {
                        group: {
                            SSC: { active: "Combined_ENT" },
                            "11X5": { active: "Two_Side_11X5_ENT" },
                            PK10: { active: "Two_Side_PK10" },
                            LHC: { active: "Special_LHC" },
                            PCB: { active: "Combined_PCB" },
                            K3: { active: "Combined_K3_ENT" },
                        },
                    },
                };
                e.PlayMenu = {
                    Any_KENO: 2647,
                    Fun_KENO: 2656,
                    Any_L2_KENO: 2648,
                    Total_Sum_BST_KENO: 2657,
                    Total_Sum_OE_KENO: 2658,
                    Total_Sum_PASS_KENO: 2659,
                    UpDown_KENO: 2660,
                    OddEven_KENO: 2661,
                    WuXing_KENO: 2662,
                    Any1_KENO: 2649,
                    Any2_KENO: 2650,
                    Any3_KENO: 2651,
                    Any4_KENO: 2652,
                    Any5_KENO: 2653,
                    Any6_KENO: 2654,
                    Any7_KENO: 2655,
                    Last1Straight: 13,
                    FixedPlace: 14,
                    Last2Straight: 15,
                    Last2Com: 16,
                    Last2Join: 19,
                    Last2Sum: 20,
                    Last3Straight: 21,
                    Last3Com3: 23,
                    Last3Com6: 24,
                    Last3Com: 25,
                    Last3Join: 26,
                    Last3StraightCom: 27,
                    Last3Sum: 28,
                    Last4Straight: 29,
                    Last4Join: 30,
                    FixedPlace_Last_4: 2015,
                    FixedPlace_Last_3: 2016,
                    FixedPlace_Last_2: 2017,
                    FixedPlace_Last_1: 2018,
                    FixedPlace_ZY: 2014,
                    First2Straight: 34,
                    First2Com: 35,
                    First2Split: 36,
                    First2Join: 38,
                    First2Sum: 39,
                    First3Straight: 40,
                    First3Com3: 42,
                    First3Com6: 43,
                    First3Com: 44,
                    First3Join: 45,
                    First3StraightCom: 46,
                    First3Sum: 47,
                    First4Straight: 48,
                    First4Join: 49,
                    Middle3Straight: 50,
                    Middle3Com3: 52,
                    Middle3Com6: 53,
                    Middle3Com: 54,
                    Middle3Join: 55,
                    Middle3StraightCom: 56,
                    Middle3Sum: 57,
                    First4Straight_Single: 83,
                    First4Join_Single: 84,
                    Last4Straight_Single: 85,
                    Last4Join_Single: 86,
                    First3Straight_Single: 87,
                    First3Join_Single: 88,
                    Middle3Straight_Single: 89,
                    Middle3Join_Single: 90,
                    Last3Straight_Single: 91,
                    Last3Join_Single: 92,
                    First2Straight_Single: 93,
                    First2Join_Single: 94,
                    Last2Straight_Single: 95,
                    Last2Join_Single: 96,
                    First2Straight_LF: 1416,
                    First2Straight_LF_Single: 112,
                    P3Straight_LF: 1430,
                    P3Straight_LF_Single: 114,
                    P3Last2Straight_LF: 1440,
                    P3Last2Straight_LF_Single: 116,
                    P3Com_LF: 1434,
                    P5First2Straight_LF: 1438,
                    P5First2Straight_LF_Single: 115,
                    FixedPlace_LF_FC3D: 1422,
                    FixedPlace_LF_P3P5: 1447,
                    FixedPlace_11X5: 923,
                    First2BSOE: 62,
                    Last2BSOE: 63,
                    First2BSOE_LF: 1420,
                    Last2BSOE_LF_FC3D: 1421,
                    P5First2BSOE_LF: 1444,
                    P3Last2BSOE_LF: 1445,
                    Last2BSOE_LF_P3P5: 1446,
                    OECounts_11X5: 916,
                    AllCom120: 1601,
                    AllCom60: 1602,
                    AllCom30: 1603,
                    AllCom20: 1604,
                    AllCom10: 1605,
                    AllCom5: 1606,
                    F4Com24: 1607,
                    F4Com12: 1608,
                    F4Com6: 1609,
                    F4Com4: 1610,
                    L4Com24: 1611,
                    L4Com12: 1612,
                    L4Com6: 1613,
                    L4Com4: 1614,
                    Choose1_Fixed_Place_4D: 2246,
                    Any2_Straight_4D: 2249,
                    Any2_Straight_Single_4D: 2250,
                    Any3_Straight_4D: 2253,
                    Any3_Straight_Single_4D: 2254,
                    Any4_Straight_4D: 2257,
                    Any4_Straight_Single_4D: 2258,
                    Choose2_Any_Code_4D: 2261,
                    Choose3_Any_Code_4D: 2264,
                    Dragon_Tiger_10T_T_SSC: 1738,
                    Dragon_Tiger_10T_H_SSC: 1739,
                    Dragon_Tiger_10T_10_SSC: 1740,
                    Dragon_Tiger_10T_1_SSC: 1741,
                    Dragon_Tiger_T_H_SSC: 1742,
                    Dragon_Tiger_T_10_SSC: 1743,
                    Dragon_Tiger_T_1_SSC: 1744,
                    Dragon_Tiger_H_10_SSC: 1745,
                    Dragon_Tiger_H_1_SSC: 1746,
                    Dragon_Tiger_10_1_SSC: 1747,
                    New_Dragon_Tiger_10T_T_SSC: 2665,
                    New_Dragon_Tiger_10T_H_SSC: 2666,
                    New_Dragon_Tiger_10T_10_SSC: 2667,
                    New_Dragon_Tiger_10T_1_SSC: 2668,
                    New_Dragon_Tiger_T_H_SSC: 2669,
                    New_Dragon_Tiger_T_10_SSC: 2670,
                    New_Dragon_Tiger_T_1_SSC: 2671,
                    New_Dragon_Tiger_H_10_SSC: 2672,
                    New_Dragon_Tiger_H_1_SSC: 2673,
                    New_Dragon_Tiger_10_1_SSC: 2674,
                    First2ComAnyCode: 64,
                    First2StraightAnyCode: 65,
                    First3ComAnyCode1: 66,
                    First3ComAnyCode2: 67,
                    First3StraightAnyCode1: 68,
                    First3StraightAnyCode2: 69,
                    Last2ComAnyCode: 70,
                    Last2StraightAnyCode: 71,
                    Last3ComAnyCode1: 72,
                    Last3ComAnyCode2: 73,
                    Last3StraightAnyCode1: 74,
                    Last3StraightAnyCode2: 75,
                    Middle3ComAnyCode1: 76,
                    Middle3ComAnyCode2: 77,
                    Middle3StraightAnyCode1: 78,
                    Middle3StraightAnyCode2: 79,
                    Last4StraightAnyCode1_SSC: 1748,
                    Last4StraightAnyCode2_SSC: 1749,
                    AllStraightAnyCode1_SSC: 1750,
                    AllStraightAnyCode2_SSC: 1751,
                    AllStraightAnyCode3_SSC: 1752,
                    anyComChoose2: 2029,
                    anyComChoose3: 2030,
                    AnyShow1_SSC: 169,
                    AnyShow2_SSC: 170,
                    AnyShow3_SSC: 171,
                    AnyShow4_SSC: 172,
                    Combined_ENT: 1753,
                    First_ENT: 1754,
                    Second_ENT: 1764,
                    Third_ENT: 1774,
                    Fourth_ENT: 1784,
                    Fifth_ENT: 1794,
                    Two_Side_ENT: 1828,
                    Dragon_Tiger_Tie_ENT: 1841,
                    Five_Have_One_ENT: 1853,
                    NN_SSC_MAIN_ENT: 2019,
                    HK5_SSC_MAIN_ENT: 2026,
                    Any4Com24_SSC: 174,
                    Any4Com12_SSC: 175,
                    Any4Com6_SSC: 176,
                    Any4Com4_SSC: 177,
                    Any3Sum_SSC: 178,
                    Any3Com3_SSC: 179,
                    Any3Com6_SSC: 180,
                    Any3Com_SSC: 181,
                    Any2Sum_SSC: 182,
                    Any2Com_SSC: 183,
                    Any2Com_SSC_Single: 184,
                    Special_Zodiac_LHC: 1691,
                    Not_Winning_Numbers_LHC: 1688,
                    Normal_FirstToSixth_LHC: 1657,
                    Normal_Special_Animal_Or_Tail_LHC: 1654,
                    Head_Tail_LHC: 1649,
                    Two_Sides_LHC: 1642,
                    Color_LHC: 1634,
                    Normal_Fixed_Place_LHC: 1622,
                    Normal_LHC: 1619,
                    Special_LHC: 1615,
                    Special_Combine_Zodiac_LHC: 1728,
                    Join_Zodiac: 2031,
                    Join_Main_LHC: 2040,
                    Special_Combine_Chinese_Zodiac_LHC: 1730,
                    SpecialA_Animal_LHC: 1713,
                    Fixed_Sixth_Color_LHC: 1712,
                    Fixed_Sixth_BSOE_LHC: 1710,
                    Fixed_Fifth_Color_LHC: 1709,
                    Fixed_Fifth_BSOE_LHC: 1707,
                    Fixed_Fourth_Color_LHC: 1706,
                    Fixed_Fourth_BSOE_LHC: 1704,
                    Fixed_Third_Color_LHC: 1703,
                    Fixed_Third_BSOE_LHC: 1701,
                    Fixed_Second_Color_LHC: 1700,
                    Fixed_Second_BSOE_LHC: 1698,
                    Fixed_First_Color_LHC: 1697,
                    Normal_First_TOSum_BSOE_LHC: 1665,
                    Fixed_First_TOSum_OE_LHC: 1696,
                    Fixed_Second_TOSum_OE_LHC: 1699,
                    Fixed_Third_TOSum_OE_LHC: 1702,
                    Fixed_Fourth_TOSum_OE_LHC: 1705,
                    Fixed_Fifth_TOSum_OE_LHC: 1708,
                    Fixed_Sixth_TOSum_OE_LHC: 1711,
                    Fixed_First_BSOE_LHC: 1695,
                    Normal_Special_One_Zodiac_LHC: 1694,
                    Special_Zodiac_Straight_LHC: 1693,
                    Normal_Sixth_Tail_BS_LHC: 1687,
                    Normal_Sixth_TOSum_BSOE_LHC: 1685,
                    Normal_Fifth_Tail_BS_LHC: 1683,
                    Normal_Fifth_TOSum_BSOE_LHC: 1681,
                    Normal_Fourth_Tail_BS_LHC: 1679,
                    Normal_Fourth_TOSum_BSOE_LHC: 1677,
                    Normal_Third_Tail_BS_LHC: 1675,
                    Normal_Third_TOSum_BSOE_LHC: 1673,
                    Normal_Second_Tail_BS_LHC: 1671,
                    Normal_Second_TOSum_BSOE_LHC: 1669,
                    Normal_First_Tail_BS_LHC: 1667,
                    Normal_Special_Tail_No_LHC: 1656,
                    Head_Tail_Special_LHC: 1651,
                    Two_Sides_Total_Sum_BSOE_LHC: 1648,
                    Special_Animal_LHC: 1714,
                    Special_TOSum_BSOE_LHC: 1641,
                    Special_Tail_BS_LHC: 1639,
                    Special_BS_OE_LHC: 1633,
                    SpecialA_TOSum_BSOE_LHC: 1640,
                    SpecialA_Tail_BS_LHC: 1638,
                    Color_BS_OE_LHC: 1637,
                    Color_BSOE_LHC: 1636,
                    Color_Straight_LHC: 1635,
                    SpecialA_BS_OE_LHC: 1632,
                    Special_BSOE_LHC: 1631,
                    SpecialA_BSOE_LHC: 1630,
                    Sixth_Fixed_LHC: 1628,
                    Fifth_Fixed_LHC: 1627,
                    Fourth_Fixed_LHC: 1626,
                    Third_Fixed_LHC: 1625,
                    Second_Fixed_LHC: 1624,
                    First_Fixed_LHC: 1623,
                    Normal_Straight_LHC: 1621,
                    SpecialA_Straight_LHC: 1617,
                    SpecialB_Straight_LHC: 1618,
                    Normal_Sixth_LHC: 1663,
                    Normal_Fifth_LHC: 1662,
                    Normal_Fourth_LHC: 1661,
                    Normal_Third_LHC: 1660,
                    Normal_Second_LHC: 1659,
                    Normal_First_LHC: 1658,
                    Normal_Special_One_Zodiac_Straight_LHC: 1731,
                    Normal_Special_Tail_LHC: 1655,
                    Fixed_First_Fun_LHC: 1722,
                    Fixed_Second_Fun_LHC: 1723,
                    Fixed_Third_Fun_LHC: 1724,
                    Fixed_Fourth_Fun_LHC: 1725,
                    Fixed_Fifth_Fun_LHC: 1726,
                    Fixed_Sixth_Fun_LHC: 1727,
                    Two_Join_Zodiac_Main_LHC: 2032,
                    Two_Join_Zodiac_LHC: 2033,
                    Three_Join_Zodiac_Main_LHC: 2034,
                    Three_Join_Zodiac_LHC: 2035,
                    Four_Join_Zodiac_Main_LHC: 2036,
                    Four_Join_Zodiac_LHC: 2037,
                    Five_Join_Zodiac_Main_LHC: 2038,
                    Five_Join_Zodiac_LHC: 2039,
                    Two_In_Normal_Main_LHC: 2041,
                    Two_In_Normal_LHC: 2042,
                    Three_In_Normal_Main_LHC: 2043,
                    Three_In_Normal_LHC: 2044,
                    Four_In_Normal_Main_LHC: 2045,
                    Four_In_Normal_LHC: 2046,
                    Two_Of_Three_In_Normal_Main_LHC: 2047,
                    Two_Of_Three_In_Normal_LHC: 2048,
                    Two_In_Normal_Or_Special_Main_LHC: 2049,
                    Two_In_Normal_Or_Special_LHC: 2050,
                    In_Normal_And_Special_Main_LHC: 2051,
                    In_Normal_And_Special_LHC: 2052,
                    Not_Winning_Numbers_Straight_LHC: 1689,
                    "5_Not_in_Winning_Numbers_Main_LHC": 2147,
                    "6_Not_in_Winning_Numbers_Main_LHC": 2149,
                    "7_Not_in_Winning_Numbers_Main_LHC": 2151,
                    "8_Not_in_Winning_Numbers_Main_LHC": 2153,
                    "9_Not_in_Winning_Numbers_Main_LHC": 2155,
                    "10_Not_in_Winning_Numbers_Main_LHC": 2157,
                    "11_Not_in_Winning_Numbers_Main_LHC": 2159,
                    "12_Not_in_Winning_Numbers_Main_LHC": 2161,
                    Choose_Not_in_Winning_Numbers_LHC: 1690,
                    "5_Not_in_Winning_Numbers_LHC": 2148,
                    "6_Not_in_Winning_Numbers_LHC": 2150,
                    "7_Not_in_Winning_Numbers_LHC": 2152,
                    "8_Not_in_Winning_Numbers_LHC": 2154,
                    "9_Not_in_Winning_Numbers_LHC": 2156,
                    "10_Not_in_Winning_Numbers_LHC": 2158,
                    "11_Not_in_Winning_Numbers_LHC": 2160,
                    "12_Not_in_Winning_Numbers_LHC": 2162,
                    Any2_Dantuo_11X5: 2572,
                    Any3_Dantuo_11X5: 2573,
                    Any4_Dantuo_11X5: 2574,
                    Any5_Dantuo_11X5: 2575,
                    Any6_Dantuo_11X5: 2576,
                    Any7_Dantuo_11X5: 2577,
                    Any8_Dantuo_11X5: 2578,
                    Dragon_Tiger_Tie_5_4_ENT: 1843,
                    Dragon_Tiger_Tie_5_3_ENT: 1844,
                    Dragon_Tiger_Tie_5_2_ENT: 1845,
                    Dragon_Tiger_Tie_4_3_ENT: 1847,
                    Dragon_Tiger_Tie_4_2_ENT: 1848,
                    Dragon_Tiger_Tie_4_1_ENT: 1849,
                    Dragon_Tiger_Tie_3_2_ENT: 1850,
                    Dragon_Tiger_Tie_3_1_ENT: 1851,
                    Dragon_Tiger_Tie_2_1_ENT: 1852,
                    Five_Have_One_Straight_ENT: 1855,
                    Combine_First_Straight_ENT: 1805,
                    Combine_First_BSOE_ENT: 1806,
                    Combine_Second_Straight_ENT: 1808,
                    Combine_Second_BSOE_ENT: 1809,
                    Combine_Third_Straight_ENT: 1811,
                    Combine_Third_BSOE_ENT: 1812,
                    Combine_Fourth_Straight_ENT: 1814,
                    Combine_Fourth_BSOE_ENT: 1815,
                    Combine_Fifth_Straight_ENT: 1817,
                    Combine_Fifth_BSOE_ENT: 1818,
                    Combine_First3_ENT: 1820,
                    Combine_Middle3_ENT: 1822,
                    Combine_Last3_ENT: 1824,
                    Combine_Total_Sum_ENT: 1826,
                    Combine_Dragon_Tiger_Tie_ENT: 1827,
                    First1_PK10: 1457,
                    First2_PK10: 1458,
                    First3_PK10: 1459,
                    First4_PK10: 1460,
                    First5_PK10: 1461,
                    First5Fixed_PK10: 1462,
                    Last5Fixed_PK10: 1463,
                    First2Sum_PK10: 1464,
                    First3Sum_PK10: 1465,
                    FirstLastSum_PK10: 1466,
                    SixToTenthPlace_PK10: 9999,
                    First5BSOE_PK10: 1467,
                    Last5BSOE_PK10: 1468,
                    First2SumBSOE_PK10: 1469,
                    Dragon_Tiger_1_VS_10: 1470,
                    Dragon_Tiger_2_VS_9: 1471,
                    Dragon_Tiger_3_VS_8: 1472,
                    Dragon_Tiger_4_VS_7: 1473,
                    Dragon_Tiger_5_VS_6: 1474,
                    Quick_Play_PK10: 99999,
                    Two_Side_PK10: 1856,
                    Sum_PK10: 1884,
                    Fixed_Place_PK10: 1888,
                    Dragon_Tiger_PK10: 1899,
                    FirstPlace_PK10: 1889,
                    SecondPlace_PK10: 1890,
                    ThirdPlace_PK10: 1891,
                    FourthPlace_PK10: 1892,
                    FifthPlace_PK10: 1893,
                    SixthPlace_PK10: 1894,
                    SeventhPlace_PK10: 1895,
                    EighthPlace_PK10: 1896,
                    NinthPlace_PK10: 1897,
                    TenthPlace_PK10: 1898,
                    Two_Side_First2SumBSOE_PK10: 1858,
                    Two_Side_FirstPlace_PK10: 1860,
                    Two_Side_FirstPlace_Dragon_PK10: 1861,
                    Two_Side_SecondPlace_PK10: 1863,
                    Two_Side_SecondPlace_Dragon_PK10: 1864,
                    Two_Side_ThirdPlace_PK10: 1866,
                    Two_Side_ThirdPlace_Dragon_PK10: 1867,
                    Two_Side_FourthPlace_PK10: 1869,
                    Two_Side_FourthPlace_Dragon_PK10: 1870,
                    Two_Side_FifthPlace_PK10: 1872,
                    Two_Side_FifthPlace_Dragon_PK10: 1873,
                    Two_Side_SixthPlace_PK10: 1875,
                    Two_Side_SeventhPlace_PK10: 1877,
                    Two_Side_EighthPlace_PK10: 1879,
                    Two_Side_NinthPlace_PK10: 1881,
                    Two_Side_TenthPlace_PK10: 1883,
                    Dragon_Tiger_1_VS_10_PK10: 1861,
                    Dragon_Tiger_2_VS_9_PK10: 1864,
                    Dragon_Tiger_3_VS_8_PK10: 1867,
                    Dragon_Tiger_4_VS_7_PK10: 1870,
                    Dragon_Tiger_5_VS_6_PK10: 1873,
                    Fan_Tan_PK10: 2541,
                    Fan_Tan_Fan_PK10: 2543,
                    Fan_Tan_Jiao_PK10: 2545,
                    Fan_Tan_Nian_PK10: 2547,
                    Fan_Tan_BSOE_PK10: 2549,
                    Combined_PCB: 1905,
                    Special_PCB: 1906,
                    SpecialSum_PCB: 1907,
                    Two_Side_PCB: 1908,
                    SpecialBSOE_PCB: 1909,
                    Special_BS_OE_PCB: 1910,
                    BOSE_WITH_TIE_PCB: 2163,
                    BS_OE_WITH_TIE_PCB: 2164,
                    BOSE_ONLY_TIE_PCB: 2165,
                    BS_OE_ONLY_TIE_PCB: 2166,
                    BOSE_ALL_KILL_PCB: 2167,
                    BS_OE_ALL_KILL_PCB: 2168,
                    Special_Extremum_BS_PCB: 1911,
                    Color_PCB: 1913,
                    Boazi_PCB: 1914,
                    SpecialCom3_PCB: 1915,
                    Sum_K3: 1917,
                    Single_Same_3_K3: 1919,
                    All_Same_3_K3: 1920,
                    Different_3_K3: 1922,
                    All_Even_3_K3: 1924,
                    Single_Same_2_K3: 1926,
                    Multi_Same_2_K3: 1927,
                    Different_2_K3: 1929,
                    Sum_BS_OE_K3: 1931,
                    Sum_Com_BS_OE_K3: 2236,
                    Any_Code_Win_K3: 2240,
                    Any_Code_Not_Win_K3: 2241,
                    Show_Hand: 2271,
                    Boazi_K3: 2272,
                    Straight_K3: 2273,
                    Com_3_K3: 2274,
                    Half_Straight_K3: 2275,
                    Different_SH_3_K3: 2276,
                    All_Same_2_K3: 2277,
                    All_Different_3_K3: 2278,
                    Combined_K3_ENT: 1932,
                    Sum_K3_ENT: 1934,
                    Sum_BS_OE_K3_ENT: 1936,
                    Different_2_K3_ENT: 1938,
                    Single_Same_K3_ENT: 1940,
                    Boazi_K3_ENT: 1942,
                    Any_Boazi_K3_ENT: 1943,
                    Single_Same_2_K3_ENT: 1945,
                    Sum_Baozi_Kill_K3_ENT: 2053,
                    Sum_BS_OE_Baozi_Kill_K3_ENT: 2054,
                    Red_Black_Combine_K3_Ent: 2227,
                    Red_Black_Num_K3_Ent: 2228,
                    Red_Num_Com_K3_Ent: 2229,
                    Black_Num_Com_K3_Ent: 2230,
                    Red_Num_BSOE_K3_ENT: 2269,
                    Black_Num_BSOE_K3_ENT: 2270,
                    SUM_COM_BS_OE_K3_ENT: 2238,
                    Any_Code_Not_Win_K3_Ent: 2243,
                    Two_Side_11X5_ENT: 1946,
                    Two_Side_Total_Sum_Group_11X5_ENT: 1948,
                    Two_Side_First_BSOE_11X5_ENT: 1950,
                    Two_Side_Second_BSOE_11X5_ENT: 1952,
                    Two_Side_Third_BSOE_11X5_ENT: 1954,
                    Two_Side_Fourth_BSOE_11X5_ENT: 1956,
                    Two_Side_Fifth_BSOE_11X5_ENT: 1958,
                    First_LV1_11X5_ENT: 1959,
                    First_11X5_ENT: 1961,
                    Second_LV1_11X5_ENT: 1964,
                    Second_11X5_ENT: 1966,
                    Third_LV1_11X5_ENT: 1969,
                    Third_11X5_ENT: 1971,
                    Fourth_LV1_11X5_ENT: 1974,
                    Fourth_11X5_ENT: 1976,
                    Fifth_LV1_11X5_ENT: 1979,
                    Fifth_11X5_ENT: 1981,
                    Any_11X5_ENT: 1984,
                    Any1_11X5_ENT: 1986,
                    Any2_11X5_ENT: 1987,
                    Any3_11X5_ENT: 1988,
                    Any4_11X5_ENT: 1989,
                    Any5_11X5_ENT: 1990,
                    Any6_11X5_ENT: 1991,
                    Any7_11X5_ENT: 1992,
                    Any8_11X5_ENT: 1993,
                    Com_11X5_ENT: 1994,
                    First2_Com_11X5_ENT: 1996,
                    First3_Com_11X5_ENT: 1997,
                    Straight_11X5_ENT: 1998,
                    First2_Straight_11X5_ENT: 2e3,
                    First3_Straight_11X5_ENT: 2001,
                    Dragon_Tiger_11X5_ENT: 2002,
                    Dragon_Tiger_5_4_11X5_ENT: 2004,
                    Dragon_Tiger_5_3_11X5_ENT: 2005,
                    Dragon_Tiger_5_2_11X5_ENT: 2006,
                    Dragon_Tiger_5_1_11X5_ENT: 2007,
                    Dragon_Tiger_4_3_11X5_ENT: 2008,
                    Dragon_Tiger_4_2_11X5_ENT: 2009,
                    Dragon_Tiger_4_1_11X5_ENT: 2010,
                    Dragon_Tiger_3_2_11X5_ENT: 2011,
                    Dragon_Tiger_3_1_11X5_ENT: 2012,
                    Dragon_Tiger_2_1_11X5_ENT: 2013,
                    NN_SSC_ENT: 2021,
                    NN_HAS_SSC_ENT: 2023,
                    NN_SSC_BSOE_ENT: 2025,
                    HK5_SSC_ENT: 2028,
                    Sum_BSOE_SSC: 2071,
                    Sum_BS_OE_SSC: 2072,
                    First2_Baodan_SSC: 2073,
                    Last2_Baodan_SSC: 2074,
                    First3C_Baodan_SSC: 2075,
                    Middle3_Baodan_SSC: 2076,
                    Last3_Baodan_SSC: 2077,
                    First2_Span_SSC: 2078,
                    Last2_Span_SSC: 2079,
                    First3C_Span_SSC: 2080,
                    Middle3_Span_SSC: 2081,
                    Last3_Span_SSC: 2082,
                    First4Choose1Any_SSC: 2083,
                    First4Choose2Any_SSC: 2084,
                    Last4Choose1Any_SSC: 2085,
                    Last4Choose2Any_SSC: 2086,
                    First3Choose2Any_SSC: 2087,
                    Mid3Choose2Any_SSC: 2088,
                    Last3Choose2Any_SSC: 2089,
                    First3_Special_SSC: 2113,
                    First3_Special_3_SSC: 2114,
                    Middle3_Special_SSC: 2115,
                    Middle3_Special_3_SSC: 2116,
                    Last3_Special_SSC: 2117,
                    Last3_Special_3_SSC: 2118,
                    "2_Num_TL3D": 2684,
                    "3_Num_TL3D": 2689,
                    Any_Place_TL3D: 2694,
                    "2_Num_TL4D": 2697,
                    "3_Num_TL4D": 2702,
                    "4_Num_TL4D": 2707,
                    Any_Place_TL4D: 2712,
                    "2_Num_TL6D": 2715,
                    "3_Num_TL6D": 2720,
                    "4_Num_TL6D": 2725,
                    Any_Place_TL6D: 2730,
                    Last_2_Straight_Main_TL3D: 2685,
                    Last_2_Combine_Main_TL3D: 2687,
                    Last_3_Straight_Main_TL3D: 2690,
                    Last_3_Combine_Main_TL3D: 2692,
                    "1_At_Any_Last_2_Main_TL3D": 2695,
                    Last_2_Straight_Main_TL4D: 2698,
                    Last_2_Combine_Main_TL4D: 2700,
                    Last_3_Straight_Main_TL4D: 2703,
                    Last_3_Combine_Main_TL4D: 2705,
                    Last_4_Straight_Main_TL4D: 2708,
                    Last_4_Combine_Main_TL4D: 2710,
                    "1_At_Any_Last_2_Main_TL4D": 2713,
                    Last_2_Straight_Main_TL6D: 2716,
                    Last_2_Combine_Main_TL6D: 2718,
                    Last_3_Straight_Main_TL6D: 2721,
                    Last_3_Combine_Main_TL6D: 2723,
                    Last_4_Straight_Main_TL6D: 2726,
                    Last_4_Combine_Main_TL6D: 2728,
                    "1_At_Any_Last_2_Main_TL6D": 2731,
                    Last_2_Straight_TL3D: 2686,
                    Last_2_Combine_TL3D: 2688,
                    Last_3_Straight_TL3D: 2691,
                    Last_3_Combine_TL3D: 2693,
                    "1_At_Any_Last_2_TL3D": 2696,
                    Last_2_Straight_TL4D: 2699,
                    Last_2_Combine_TL4D: 2701,
                    Last_3_Straight_TL4D: 2704,
                    Last_3_Combine_TL4D: 2706,
                    Last_4_Straight_TL4D: 2709,
                    Last_4_Combine_TL4D: 2711,
                    "1_At_Any_Last_2_TL4D": 2714,
                    Last_2_Straight_TL6D: 2717,
                    Last_2_Combine_TL6D: 2719,
                    Last_3_Straight_TL6D: 2722,
                    Last_3_Combine_TL6D: 2724,
                    Last_4_Straight_TL6D: 2727,
                    Last_4_Combine_TL6D: 2729,
                    "1_At_Any_Last_2_TL6D": 2732,
                    Last_3_THAI: 2055,
                    "2_Star_THAI": 2060,
                    Any_Place_THAI: 2067,
                    Hoo_Hey_How_Main_THAI: 2297,
                    Hoo_Hey_How_Play_THAI: 2299,
                    Fan_Tan_THAI: 2497,
                    Fan_Tan_Fan_THAI: 2499,
                    Fan_Tan_Jiao_THAI: 2501,
                    Fan_Tan_Nian_THAI: 2503,
                    Fan_Tan_BSOE_THAI: 2505,
                    LAST_3_STRAIGHT_THAI: 2057,
                    LAST_3_COMBINE_THAI: 2059,
                    LAST_2_STRAIGHT_THAI: 2062,
                    LAST_2_COMBINE_THAI: 2064,
                    "2_STRAIGHT_ADD_THAI": 2066,
                    "1_AT_ANY_LAST_3_THAI": 2069,
                    Prize_2_Straight_THAI: 2645,
                    Special_Prize_2_Straight_THAI: 2646,
                    Any_Roll_Last_2_North_VNC: 2517,
                    Any_Roll_Last_3_North_VNC: 2521,
                    Any_Roll_Last_4_North_VNC: 2525,
                    Any_Roll_Last_2_South_VNC: 2530,
                    Any_Roll_Last_3_South_VNC: 2534,
                    Any_Roll_Last_4_South_VNC: 2538,
                    Any_Roll_Last_2_1K_North_VNC: 2641,
                    Any_Roll_Last_2_1K_South_VNC: 2642,
                    Last_3_Straight_THAI_Multi: 2485,
                    Last_3_Straight_THAI_Single: 2486,
                    Last_3_Combine_THAI_Multi: 2487,
                    "2_Straight_Add_THAI_Multi": 2480,
                    "2_Straight_Add_THAI_Single": 2481,
                    Last_2_Combine_THAI_Multi: 2482,
                    Last_2_Straight_THAI_Multi: 2483,
                    Last_2_Straight_THAI_Single: 2484,
                    Last_4_VNC: 2090,
                    Last_3_VNC: 2095,
                    "2_Star_VNC": 2100,
                    Any_Place_VNC: 2105,
                    Any_Roll_North_VNC: 2515,
                    Any_Roll_South_VNC: 2528,
                    Not_Winning_Numbers_North_VNC: 2550,
                    Not_Winning_Numbers_South_VNC: 2560,
                    Bunch_North_VNC: 2598,
                    Bunch_South_VNC: 2608,
                    Hoo_Hey_How_Main_VNC: 2300,
                    Fan_Tan_VNC: 2488,
                    SicBO_VK3: 2618,
                    First_To_Tenth_VPK10: 2624,
                    First_Second_Sum_VPK10: 2627,
                    Dragon_Tiger_VPK10: 2630,
                    Single_Dice_Main_VK3: 2619,
                    Dice_Sum_Main_VK3: 2620,
                    Surround_Dice_Main_VK3: 2621,
                    All_Surround_Dice_Main_VK3: 2622,
                    Dice_BSOE_Main_VK3: 2623,
                    First_To_Tenth_Guess_Rank_VPK10: 2625,
                    First_To_Tenth_BSOE_VPK10: 2626,
                    First_Second_Sum_Main_VPK10: 2628,
                    First_Second_Sum_BSOE_VPK10: 2629,
                    Dragon_Tiger_Main_PK10: 2631,
                    LAST_4_STRAIGHT_1ST_VNC: 2092,
                    LAST_4_COMBINE_1ST_VNC: 2094,
                    LAST_3_STRAIGHT_1ST_VNC: 2097,
                    LAST_3_COMBINE_1ST_VNC: 2099,
                    LAST_2_STRAIGHT_1ST_VNC: 2102,
                    LAST_2_STRAIGHT_2ND_VNC: 2104,
                    LAST_2_ANY_1ST_VNC: 2107,
                    LAST_2_ANY_2ND_VNC: 2109,
                    Bunch_2_North_VNC: 2601,
                    Bunch_3_North_VNC: 2604,
                    Bunch_4_North_VNC: 2607,
                    Bunch_2_South_VNC: 2611,
                    Bunch_3_South_VNC: 2614,
                    Bunch_4_South_VNC: 2617,
                    Any_Roll_Last_2_North_VNC_Multi: 2518,
                    Any_Roll_Last_2_North_VNC_Single: 2519,
                    Any_Roll_Last_3_North_VNC_Multi: 2522,
                    Any_Roll_Last_3_North_VNC_Single: 2523,
                    Any_Roll_Last_4_North_VNC_Multi: 2526,
                    Any_Roll_Last_4_North_VNC_Single: 2527,
                    "4_Not_Winning_Numbers_North_VNC": 2552,
                    "4_Not_Winning_Numbers_Single_North_VNC": 2553,
                    "8_Not_Winning_Numbers_North_VNC": 2555,
                    "8_Not_Winning_Numbers_Single_North_VNC": 2556,
                    "10_Not_Winning_Numbers_North_VNC": 2558,
                    "10_Not_Winning_Numbers_Single_North_VNC": 2559,
                    Last_2_1st_7th_North_VNC: 2585,
                    Last_2_1st_7th_North_VNC_Single: 2586,
                    Last_2_1st_7th_North_VNC_Multi: 2587,
                    Last_2_7th_North_VNC: 2588,
                    Last_2_7th_North_VNC_Single: 2589,
                    Last_2_7th_North_VNC_Multi: 2590,
                    Any_Roll_Last_2_South_VNC_Multi: 2531,
                    Any_Roll_Last_2_South_VNC_Single: 2532,
                    Any_Roll_Last_3_South_VNC_Multi: 2535,
                    Any_Roll_Last_3_South_VNC_Single: 2536,
                    Any_Roll_Last_4_South_VNC_Multi: 2539,
                    Any_Roll_Last_4_South_VNC_Single: 2540,
                    "4_Not_Winning_Numbers_South_VNC": 2562,
                    "4_Not_Winning_Numbers_Single_South_VNC": 2563,
                    "8_Not_Winning_Numbers_South_VNC": 2565,
                    "8_Not_Winning_Numbers_Single_South_VNC": 2566,
                    "10_Not_Winning_Numbers_South_VNC": 2568,
                    "10_Not_Winning_Numbers_Single_South_VNC": 2569,
                    Last_2_1st_8th_South_VNC: 2592,
                    Last_2_1st_8th_South_VNC_Single: 2593,
                    Last_2_1st_8th_South_VNC_Multi: 2594,
                    Last_2_8th_South_VNC: 2595,
                    Last_2_8th_South_VNC_Single: 2596,
                    Last_2_8th_South_VNC_Multi: 2597,
                    Last_4_Straight_1st_VNC_Multi: 2286,
                    Last_4_Straight_1st_VNC_Single: 2287,
                    Last_3_Straight_1st_VNC_Multi: 2284,
                    Last_3_Straight_1st_VNC_Single: 2285,
                    Last_3_Combine_1st_VNC_Multi: 2283,
                    Last_2_Straight_1st_VNC_Multi: 2279,
                    Last_2_Straight_1st_VNC_Single: 2280,
                    Last_2_Straight_2nd_VNC_Multi: 2281,
                    Last_2_Straight_2nd_VNC_Single: 2282,
                    Ten_Digit_1st_VNC: 2580,
                    Unit_Digit_1st_VNC: 2581,
                    Ten_Digit_2nd_VNC: 2582,
                    Unit_Digit_2nd_VNC: 2583,
                    Fixed_Place_4D_VNC: 263700,
                    Fixed_Place_4D_Unit_VNC: 2637,
                    Fixed_Place_4D_Ten_VNC: 2638,
                    Fixed_Place_4D_hundred_VNC: 2639,
                    Fixed_Place_4D_Thousand_VNC: 2640,
                    Hoo_Hey_How_Play_VNC: 2302,
                    Fan_Tan_Fan_VNC: 2490,
                    Fan_Tan_Jiao_VNC: 2492,
                    Fan_Tan_Nian_VNC: 2494,
                    Fan_Tan_BSOE_VNC: 2496,
                    "4_Num_LAO": 2127,
                    "3_Num_LAO": 2132,
                    "2_Num_LAO": 2137,
                    Any_LAO: 2142,
                    Hoo_Hey_How_Main_LAO: 2303,
                    Hoo_Hey_How_Play_LAO: 2305,
                    Fan_Tan_LAO: 2506,
                    Fan_Tan_Fan_LAO: 2508,
                    Fan_Tan_Jiao_LAO: 2510,
                    Fan_Tan_Nian_LAO: 2512,
                    Fan_Tan_BSOE_LAO: 2514,
                    LAST_4_STRAIGHT_LAO: 2129,
                    LAST_4_COMBINE_LAO: 2131,
                    LAST_3_STRAIGHT_LAO: 2134,
                    LAST_3_COMBINE_LAO: 2136,
                    LAST_2_STRAIGHT_LAO: 2139,
                    FIRST_2_STRAIGHT_LAO: 2141,
                    LAST_2_ANY_LAO: 2144,
                    FIRST_2_ANY_LAO: 2146,
                    Fixed_Place_4D: 2632,
                    Fixed_Place_4D_Unit: 2633,
                    Fixed_Place_4D_Ten: 2634,
                    Fixed_Place_4D_hundred: 2635,
                    Fixed_Place_4D_Thousand: 2636,
                    Last_2_Straight_LAO_Multi: 2288,
                    Last_2_Straight_LAO_Single: 2289,
                    First_2_Straight_LAO_Multi: 2290,
                    First_2_Straight_LAO_Single: 2291,
                    Last_3_Combine_LAO_Multi: 2292,
                    Last_3_Straight_LAO_Multi: 2293,
                    Last_3_Straight_LAO_Single: 2294,
                    Last_4_Straight_LAO_Multi: 2295,
                    Last_4_Straight_LAO_Single: 2296,
                    Baccarat_SSC_ENT: 2123,
                    Baccarat_With_Pair_SSC_ENT: 2125,
                    Baccarat_No_Pair_SSC_ENT: 2126,
                    One_Word_Position_Main_LF: 2169,
                    Hundreds_Fixed_Place_Main_LF: 2170,
                    Hundreds_Fixed_Place_LF: 2171,
                    Hundreds_BSOE_LF: 2172,
                    Hundreds_Prime_And_Composite_LF: 2173,
                    Tens_Fixed_Place_Main_LF: 2174,
                    Tens_Fixed_Place_LF: 2175,
                    Tens_BSOE_LF: 2176,
                    Tens_Prime_And_Composite_LF: 2177,
                    Units_Fixed_Place_Main_LF: 2178,
                    Units_Fixed_Place_LF: 2179,
                    Units_BSOE_LF: 2180,
                    Units_Prime_And_Composite_LF: 2181,
                    One_Word_Combine_Main_LF: 2182,
                    One_Word_Combine_L2_LF: 2183,
                    One_Word_Combine_LF: 2184,
                    Two_Word_Position_Main_LF: 2185,
                    Hundreds_Tens_Fixed_Place_Main_LF: 2186,
                    Hundreds_Tens_Fixed_Place_LF: 2187,
                    Hundreds_Units_Fixed_Place_Main_LF: 2188,
                    Hundreds_Units_Fixed_Place_LF: 2189,
                    Tens_Units_Fixed_Place_Main_LF: 2190,
                    Tens_Units_Fixed_Place_LF: 2191,
                    Two_Word_Combine_Main_LF: 2192,
                    Two_Word_Combine_Second_LF: 2193,
                    Two_Word_Combine_LF: 2194,
                    Two_Word_Sum_Main_LF: 2195,
                    Hundreds_Tens_Sum_Main_LF: 2196,
                    Hundreds_Tens_Sum_LF: 2197,
                    Hundreds_Tens_Sum_Last_LF: 2198,
                    Hundreds_Units_Sum_Main_LF: 2199,
                    Hundreds_Units_Sum_LF: 2200,
                    Hundreds_Units_Sum_Last_LF: 2201,
                    Tens_Tens_Sum_Main_LF: 2202,
                    Tens_Units_Sum_LF: 2203,
                    Tens_Units_Sum_Last_LF: 2204,
                    Three_Word_Position_Main_LF: 2205,
                    Hundreds_Tens_Units_Fixed_Place_Main_LF: 2206,
                    Hundreds_Tens_Units_Fixed_Place_LF: 2207,
                    Three_Word_Com_MAIN_LF: 2208,
                    Three_Word_Com_Second_LF: 2209,
                    Three_Word_Com_LF: 2210,
                    Three_Word_Total_Sum_LF: 2211,
                    Hundreds_Tens_Units_Sum_MAIN_LF: 2212,
                    Hundreds_Tens_Units_Sum_LF: 2213,
                    Hundreds_Tens_Units_Sum_Tail_LF: 2214,
                    Hundreds_Tens_Units_Com3_MAIN_LF: 2215,
                    Hundreds_Tens_Units_Com3_Second_LF: 2216,
                    Hundreds_Tens_Units_Com3_LF: 2217,
                    Hundreds_Tens_Units_Com6_MAIN_LF: 2218,
                    Hundreds_Tens_Units_Com6_Second_LF: 2219,
                    Hundreds_Tens_Units_Com6_LF: 2220,
                    Span_LF: 2221,
                    Span_MAIN_LF: 2222,
                    Hundreds_Tens_Units_Span_LF: 2223,
                    Hundreds_Tens_Span_LF: 2224,
                    Hundreds_Units_Span_LF: 2225,
                    Tens_Units_Span_LF: 2226,
                    Dragon_Tiger_K3_Ent: 2231,
                    Dragon_Tiger_1_VS_2_K3_Ent: 2233,
                    Dragon_Tiger_1_VS_3_K3_Ent: 2234,
                    Dragon_Tiger_2_VS_3_K3_Ent: 2235,
                    Span_All_K3: 2266,
                    Span_K3_Ent: 2267,
                    Span_All_K3_Ent: 2268,
                    Last3Straight_LF: 1408,
                    Last3Straight_LF_Single: 111,
                    Last3Sum_LF: 1409,
                    Last3Com3_LF: 1410,
                    Last3Com6_LF: 1411,
                    Last3ComSum_LF: 1412,
                    Last3Com_LF: 1413,
                    First2Com_LF: 1417,
                    Last2Straight_LF: 1418,
                    Last2Straight_LF_Single: 113,
                    Last2Com_LF_3D: 1419,
                    Last3StraightAnyCode1_LF: 1414,
                    Last3StraightAnyCode2_LF: 1415,
                    FixedPlace_LF: 1422,
                    P3Sum_LF: 1431,
                    P3Com3_LF: 1432,
                    P3Com6_LF: 1433,
                    P3ComSum_LF: 1435,
                    P3StraightAnyCode1_LF: 1436,
                    P3StraightAnyCode2_LF: 1437,
                    P5First2Com_LF: 1439,
                    P5Last2Straight_LF: 1442,
                    P5Last2Straight_LF_Single: 166,
                    P3Last2Com_LF: 1441,
                    Last2Com_LF_P3P5: 1443,
                    First2_PK10_Single: 1732,
                    First3_PK10_Single: 1733,
                    First4_PK10_Single: 1734,
                    First5_PK10_Single: 1735,
                    Any2_11X5_Single: 100,
                    Any3_11X5_Single: 101,
                    Any4_11X5_Single: 102,
                    Any5_11X5_Single: 103,
                    Any6_11X5_Single: 104,
                    Any7_11X5_Single: 105,
                    Any8_11X5_Single: 106,
                    First3Straight_11X5_Single: 107,
                    First3Com_11X5_Single: 108,
                    First2Straight_11X5_Single: 109,
                    First2Com_11X5_Single: 110,
                    All5Straight_Single: 80,
                    All5All_Single: 81,
                    All5Join_Single: 82,
                    Any2_Single: 97,
                    Any3_Single: 98,
                    Any4_Single: 99,
                    Dice_BS_VTX: 2675,
                    Dice_BS_Main_VTX: 2676,
                    XocDia_VXD: 2677,
                    XocDia_BS_Main_VXD: 2678,
                    XocDia_OD_Main_VXD: 2679,
                    XocDia_4R_Main_VXD: 2680,
                    XocDia_4W_Main_VXD: 2681,
                    XocDia_3W1R_Main_VXD: 2682,
                    XocDia_3R1W_Main_VXD: 2683,
                };
            },
            5266: function(_, e, a) {
                var t;
                function n(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function i(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? n(Object(a), !0).forEach(function(e) {
                                  r(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : n(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function r(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var o = i(
                    i({}, ((t = a(9694)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        shoppingBasket: "Cart",
                        confirmBetting: "Confirm the Bet",
                        clearBallText: "Clear",
                        addToBetSlip: "Add to the bets cart",
                        betNow: "Betting",
                        betSuccess: "Bet Success",
                        confirmBetInfos: "Please Confirm the Betting Details",
                        balance: "Balance",
                        betAmountOverMaxAmount:
                            "Your bet has exceeded the maximum amount.<br />The maximum bet amount for this division is %@.",
                        totalAmount: "Total Amount",
                        currency: "¥",
                        currencyThb: "฿",
                        confirm: "Confirm",
                        winningAmount: "Win Amount",
                        betHistory: "Bet History",
                        bettingTime: "Betting Time",
                        orderNumber: "Order Number",
                        bettingAmount: "Betting Amount",
                        winningNumber: "Bonus Number",
                        betNumber: "Bet Number",
                        pastDraw: "Past",
                        drawHistory: "Draw History",
                        drawResult: "Draw Result",
                        processing: "Processing",
                        betFail: "Bet Failed",
                        betFailed: "Incorrect/Incomplete Playslip. Processing failed.",
                        detail: "Details",
                        recentlyGames: "Bet Games",
                        bettingApproach: { 1: "Straight", 2: "Single", 3: "Multi" },
                        orderStatus: {
                            orderStatus_0: "All",
                            orderStatus_2: "IN PROGRESS",
                            orderStatus_4: "Won",
                            orderStatus_5: "No Prize",
                            orderStatus_6: "Cancelled",
                            orderStatus_7: "Cancelled",
                            orderStatus_8: "Cancelled",
                            orderStatus_12: "Cancelled",
                            orderStatus_14: "Incomlpete",
                            orderStatus_16: "Tie",
                            orderStatus_17: "Cancelled",
                            orderStatus_99: "Invalid Order",
                        },
                        betDigit: {
                            THOUSANDS: "Thousands",
                            HUNDREDS: "Hundreds",
                            TENS: "Tens",
                            ONES: "Ones",
                            COM: "Group",
                        },
                        pickRow: { all: "All", big: "Big", small: "Small", odd: "Odd", even: "Even", clear: "Delete" },
                        pk10Ranking: {
                            1: "1st",
                            2: "2nd",
                            3: "3rd",
                            4: "4th",
                            5: "5th",
                            6: "6th",
                            7: "7th",
                            8: "8th",
                            9: "9th",
                            10: "10th",
                        },
                        ball: {
                            fishPrawnCrab: { fish: "Fish", prawn: "Prawn", crab: "Crab" },
                            BSOE: { big: "Big", small: "Small", odd: "Odd", even: "Even" },
                            K3_BSOE: { big: "Big", small: "Small", odd: "Odd", even: "Even" },
                            PK10_BSOE: { big: "Big", small: "Small", odd: "Odd", even: "Even" },
                            VNC_PK10_DragonTiger: { dragon: "Dragon", tiger: "Tiger" },
                            fanTanFan: { 1: "1 Fan", 2: "2 Fan", 3: "3 Fan", 4: "4 Fan" },
                            fanTanJiao: { "1_2": "1-2 Kwok", "1_4": "1-4 Kwok", "2_3": "2-3 Kwok", "3_4": "3-4 Kwok" },
                            fanTanNian: {
                                "1_2": "1 Nim 2",
                                "1_3": "1 Nim 3",
                                "1_4": "1 Nim 4",
                                "2_1": "2 Nim 1",
                                "2_3": "2 Nim 3",
                                "2_4": "2 Nim 4",
                                "3_1": "3 Nim 1",
                                "3_2": "3 Nim 2",
                                "3_4": "3 Nim 4",
                                "4_1": "4 Nim 1",
                                "4_2": "4 Nim 2",
                                "4_3": "4 Nim 3",
                            },
                            sicBoAllSurroundDice: { 1: "Any Triple" },
                            sicBoDiceOdds: { 1: "ONE DICE", 2: "TWO DICE", 3: "THREE DICE" },
                            kenoFunBall: {
                                big: "Big",
                                small: "Small",
                                sumOdd: "Odd",
                                sumEven: "Even",
                                sum: "Tie",
                                bigSumOdd: "Big&Odd",
                                bigSumEven: "Big&Even",
                                smallSumOdd: "Small&Odd",
                                smallSumEven: "Small&Even",
                                up: "Top",
                                down: "Bottom",
                                middle: "Tie",
                                ballOdd: "Odds",
                                ballEven: "Evens",
                                equal: "Tie",
                                gold: "Gold",
                                wood: "Wood",
                                water: "Water",
                                fire: "Fire",
                                earth: "Earth",
                            },
                        },
                        vxd: {
                            allRed: "All Red",
                            allWhite: "All White",
                            threeWoneR: "3 White+1 Red",
                            threeRoneW: "3 Red+1 White",
                        },
                        kenoAnySelector: {
                            up: "Top",
                            down: "Bottom",
                            sumOdd: "Odd",
                            sumEven: "Even",
                            upSumOdd: "Top&Odd",
                            upSumEven: "Top&Even",
                            downSumOdd: "Bottom&Odd",
                            downSumEven: "Bottom&Even",
                            clear: "Clear",
                        },
                        kenoRoadmap: {
                            big: "B",
                            small: "S",
                            bigSmall: "B/S",
                            sum: "E",
                            sumOdd: "O",
                            sumEven: "E",
                            sumOddSumEven: "O/E",
                            up: "T",
                            down: "B",
                            upDown: "T/B",
                            middle: "-",
                            ballOdd: "O",
                            ballEven: "E",
                            ballOddBallEven: "O/T/E",
                            equal: "T",
                            gold: "-",
                            wood: "-",
                            water: "-",
                            fire: "-",
                            earth: "-",
                            WuXing: "5E",
                        },
                        prizeListPrizeType: {
                            P_FIRST: "First Prize",
                            P_SECOND: "Second Prize",
                            P_BIG: "Big",
                            P_SMALL: "Small",
                            P_ODD: "Odd",
                            P_EVEN: "Even",
                            VTX_BS_BIG: "Big",
                            VTX_BS_SMALL: "Small",
                            Hoo_Hey_How_0: "Fish",
                            Hoo_Hey_How_1: "Prawn",
                            Hoo_Hey_How_2: "Crab",
                            P_Fan_1: "1 Fan",
                            P_Fan_2: "2 Fan",
                            P_Fan_3: "3 Fan",
                            P_Fan_0: "4 Fan",
                            P_Jiao_12: "1-2 Kwok",
                            P_Jiao_10: "1-4 Kwok",
                            P_Jiao_23: "2-3 Kwok",
                            P_Jiao_30: "3-4 Kwok",
                            P_1NIAN2: "1 Nim 2",
                            P_1NIAN3: "1 Nim 3",
                            P_1NIAN4: "1 Nim 4",
                            P_2NIAN1: "2 Nim 1",
                            P_2NIAN3: "2 Nim 3",
                            P_2NIAN4: "2 Nim 4",
                            P_3NIAN1: "3 Nim 1",
                            P_3NIAN2: "3 Nim 2",
                            P_3NIAN4: "3 Nim 4",
                            P_4NIAN1: "4 Nim 1",
                            P_4NIAN2: "4 Nim 2",
                            P_4NIAN3: "4 Nim 3",
                            VXD_BS_BIG: "Big",
                            VXD_BS_SMALL: "Small",
                            VXD_OE_ODD: "Odd",
                            VXD_OE_EVEN: "Even",
                            VXD_4R_1: "All Red",
                            VXD_4W_1: "All White",
                            VXD_3W1R_1: "3 White + 1 Red",
                            VXD_3R1W_1: "3 Red + 1 White",
                        },
                        seriesControlMapping: { 0: "MAX", 1: "MIN", 2: "BAR" },
                        errorCode: {
                            LGS_BETTING_GAME_CLOSED_ERROR: "Lottery Closed",
                            LGS_BETTING_GAME_FESTIVAL_ERROR: "Lottery Closed",
                            LGS_BETTING_GAME_PAUSED_ERROR: "Lottery Closed",
                            LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "Lottery Closed",
                            LGS_BETTING_AMOUNT_OVER_LIMITS: "Bet Amount is over limit",
                            LGS_BETTING_MULTIPLE_OVER_LIMITS: "Multiple bets exceeded the maximum limit.",
                            LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "Bet rebate value is less than 0",
                            LGS_BETTING_ILLEGAL_ERROR: "The betting failed, parameters do not meet the requirements",
                            LGS_BETTING_WITH_INVALID_TOKEN_ERROR: "Your session is expired, please try again later",
                            LGS_CANCEL_ORDER_ARGUMENT_ERROR: "Bet cancel error",
                            LGS_BETTING_NUMBER_OVER_LIMITS:
                                "No. %@ is currently sold out and closed for betting, please try another number or come back later.",
                            ORDER_NOT_DRAWABLE: "Lottery Results pending",
                            LGS_CANCEL_ORDER_INACTIVITY: "The current system cannot cancel membership",
                            LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "Cancellations fee is less than the amount of bets",
                            LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR: "Error cancelling straight number bet",
                            LGS_BETTING_MODE_CLOSED_ERROR: "Betting mode is closed.",
                            LGS_BETTING_MODE_NOT_ALLOW_ERROR: "Bet mode is not allowed.",
                            SYSTEM_NOT_ALLOW_BETTING: "Game closed, please wait until next time.",
                            BETTING_ITEM_LIMIT: "Bet exceeds the limit",
                            LGS_CANCEL_ORDER_NOT_AVAILABLE: "Bet has been locked and cannot be cancelled.",
                            ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "Insufficient Balance",
                            CANCEL_CHASE_ORDER_IS_NOT_LAST_START:
                                "Chasing number needs to be cancelled from last game.",
                            ORDER_IS_CANCELED: "The bet has been cancelled.",
                            "account.balance.not.enough": "Not enough balance.",
                            ACCOUNT_BALANCE_NOT_ENOUGH: "Insufficient balance in main wallet",
                            ACCOUNT_TRANSFER_EXCEED_MIN: "Minimum transfer amount is 0.01 yuan",
                            UNKNOWN_ERROR: "System error",
                            CONNECTION_ERROR_:
                                "The location you are trying to access the website from, is currently restricted.",
                            CUSTOMER_LOGOUT_: "You are not logged in yet, please login first!",
                            DRAW_FAIL_ERROR_: "System is busy. Bet failed.",
                            NOT_SUPPORT_LANDSCAPE: "Please use portrait mode for best experience.",
                            LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS: "Following Bet Stakes is over limit stakes",
                            BETTING_STAKES_IS_OVER_LIMIT_STAKES: "Bet Stakes is over limit stakes",
                            ORDER_ALREADY_CANCELED: "The bet has been cancelled.",
                            STAKES_IS_OVER_LIMIT_ERROR: "Bet Stakes is over limit stakes",
                            BALANCE_NOT_ENOUGH_ERROR: "Insufficient Balance",
                            BETTING_AMOUNT_OVER_LIMITS_ERROR: "Bet Amount is over limit",
                            CALCULATE_BETTING_AMOUNT_ERROR: "Incorrect bet, please try again.",
                            IILLEGAL_BALL_NUMBER_ERROR: "Incorrect bet, please try again.",
                            ILLEGAL_BETTING_ARGUMENT_ERROR: "Incorrect bet, please try again.",
                            SYSTEM_NOT_ALLOW_CHASE: "The betting failed, parameters do not meet the requirements",
                            NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR: "Incorrect bet, please try again.",
                            CALCULATE_STAKES_ERROR: "Incorrect bet, please try again.",
                            PLAY_NOT_SUPPORTED_ERROR: "Gameplay is under maintenance, please try again.",
                            BOOK_FAILED_ERROR: "Insufficient Balance",
                            WALLET_NOT_EXISTS_ERROR: "Insufficient Balance",
                            B2B_TX_FAILED: "Insufficient Balance",
                            DEMO_NOT_SUPPORTED_ERROR: "Please log in with your official account",
                            ORDER_PRIZE_NOT_FOUND_ERROR: "Game is under maintenance, please try again.",
                            ORDER_SAVED_FAILED: "Game is under maintenance, please try again.",
                            PLATFORM_SETTING_NOT_FOUND_ERROR: "Game is under maintenance, please try again.",
                            NOT_AVAILABLE_FOR_SALE_ERROR: "Game is under maintenance, please try again.",
                            PLAY_NOT_FOUND_ERROR: "Game is under maintenance, please try again.",
                            GAME_SETTING_NOT_FOUND: "Game is under maintenance, please try again.",
                            GAME_DRWW_TIME_PARSE_ERROR: "Game is under maintenance, please try again.",
                            ACCOUNT_NOT_FOUND_ERROR: "Account is abnormal, please log in again",
                            GAME_URL_NOT_FOUND: "Account is abnormal, please log in again",
                            INVALID_TOKEN: "Please log in with your official account",
                            USER_NOT_LOGIN: "Please log in with your official account",
                            CANCEL_ORDER_ERROR: "Incorrect Cancel Order, please try again.",
                            INTERNAL_SERVER_ERROR: "System error",
                            OBJECT_NOT_EXIST: "Invalid bet, please try again.",
                            ILLEGAL_PARAMS_VALUE: "Invalid bet, please try again.",
                            BETTING_MULTIPLE_OVER_LIMITS_ERROR: "Multiple bets exceeded the maximum limit.",
                            GAME_CLOSED_ERROR: "Lottery Closed",
                            STAKES_ABOVE_LIMIT: "Bet Stakes is over limit stakes > %@",
                            REQUEST_TIME_OUT: "request time out, please check your internet",
                            PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR: "Bet Stakes is over limit stakes > %@2",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS:
                                "No. %@ is currently sold out and closed for betting, please try another number or come back later.",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR: "Following Bet Stakes is over limit stakes",
                        },
                        gameHistoryCancel: "Are you sure you want to cancel this ticket？",
                        gameHistoryCancel_success: "cancelled",
                        gameHistoryCancel_failed: "Error occured when cancelling bet.",
                        gameCode: { THAIGOV: "Thailand Government Lottery", TCGTHGOV: "TCG Thailand Lottery" },
                        drawInterval: "Lottery time",
                        drawFrequency: "Lottery frequency",
                        chooseFile: "Upload File",
                        filterRepeat: "Remove Duplicate Number",
                        betsNTotalAmount:
                            '<div class="font-bold">%@</div>Bet/s，TOTAL BET<div class="font-bold">%@</div>，',
                        predictionAmount: 'will win<div class="red-words">%@</div>',
                        willWin: "will win",
                        filterResultMsg: "Remove Duplicate %@ Invalid no. %@",
                        odds: "Payouts",
                        amount: "Stake",
                        manualBetPlaceHolderSEA:
                            'Please type your bets here or upload a txt file. The format is per sample below :\n\nNOTE:  You can use "," or ";" or "<Space>" or new line to separate the numbers you are betting.',
                        defaultMode: "Default Lott Play Mode",
                        defaultBetting: "Default Lott Play Betting",
                        defaultBettingApproach: "Set BettingApproach",
                        MultipleDefaultBetting: "Multiple Game Default Betting config",
                        MultipleDefaultMode: "Multiple Game Default Mode config",
                        SaveDefaultPlayBetting: "Save Default PlayBetting",
                        MultipleBonusOrBetLimit: "Multiple Game Bonus ＆ bet limit",
                        MultipleBonus: "Multiple Game Bonus config",
                        ResumeAfterSave: "Resume after save",
                        ParameterValue: "Parameter Value",
                        AllBets: "All bets",
                        LimitBets: "Limit bets",
                        LimitOnlyBetMaxOdds: "Limit only bet Max odds",
                        LimitOnlyBetMinOdds: "Limit only bet Min odds",
                        LimitOnlyBetBar: "Optional",
                        NoData: "No Data",
                        region: {
                            THAI: "Thailand",
                            VNC: "Vietnam",
                            LAO: "Laos",
                            MAS: "Malaysia",
                            SGC: "Singapore",
                            TWC: "Taiwan",
                            STOCK: "Stock",
                        },
                        multiple: "Multiple",
                        syncMultipleBets: "Change the Bath Multiple Bets",
                        gameName: "Bet Type",
                        gameContent: "Bet Details",
                        odds1Time: "Payouts/1Time",
                        betAmount: "Bet Count",
                        drawPrize: {
                            specialPrize: "Special",
                            firstPrize: "1st Prize",
                            secondPrize: "2nd Prize",
                            thirdPrize: "3rd Prize",
                            fourthPrize: "4th Prize",
                            fifthPrize: "5th Prize",
                            sixthPrize: "6th Prize",
                            seventhPrize: "7th Prize",
                            eighthPrize: "8th Prize",
                        },
                    }
                );
                e.default = o;
            },
            9694: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    playId: {
                        2056: "EXACT",
                        2058: "ANY",
                        2061: "EXACT",
                        2063: "ANY",
                        2065: "Bonus digit",
                        2068: "Random Back 3 Digits",
                        2055: "3D",
                        2057: "EXACT 3D-1st",
                        2059: "ANY 3D-1st",
                        2643: "Second Prize",
                        2644: "Second Special",
                        2645: "EXACT 3D-2nd",
                        2646: "EXACT 3D-2nd Special",
                        2675: "Tài Xỉu",
                        2676: "Big Small",
                        2677: "Xoc Dia",
                        2678: "Big Small",
                        2679: "Odd Even",
                        2680: "All Red",
                        2681: "All White",
                        2682: "3 White+1 Red",
                        2683: "3 Red+1 White",
                        2060: "2D",
                        2062: "EXACT 2D-1st",
                        2064: "ANY 2D-1st",
                        2066: "EXACT 2D-Special ",
                        2067: "1D",
                        2069: "ANY 1D-1st",
                        2480: "Norm EXACT 2D-Special ",
                        2481: "Manual Enter EXACT 2D-Special ",
                        2482: "Norm ANY 2D-1st",
                        2483: "Norm EXACT 2D-1st",
                        2484: "Manual Enter  EXACT 2D-1st",
                        2485: "Norm EXACT 3D-1st",
                        2486: "Manual Enter EXACT 3D-1st",
                        2487: "Norm ANY 3D-1st",
                        2297: "FishPrawnCrab",
                        2298: "FishPrawnCrab",
                        2299: "FishPrawnCrab",
                        2497: "FanTan",
                        2498: "Fan",
                        2499: "Fan",
                        2500: "Kwok",
                        2501: "Kwok",
                        2502: "Nim",
                        2503: "Nim",
                        2504: "BSOE",
                        2505: "BSOE",
                        2090: "4D",
                        2095: "3D",
                        2100: "2D",
                        2105: "1D",
                        2515: "AnyRoll",
                        2528: "AnyRoll",
                        2550: "FailParlay",
                        2560: "FailParlay",
                        2598: "Parlay",
                        2608: "Parlay",
                        2300: "FishPrawnCrab",
                        2488: "FanTan",
                        2618: "Sic Bo Fast3",
                        2624: "Ranking",
                        2627: "Sum of 1st & 2nd",
                        2630: "Dragon&Tiger",
                        2091: "EXACT",
                        2093: "ANY",
                        2096: "EXACT",
                        2098: "ANY",
                        2101: "EXACT",
                        2103: "EXACT",
                        2301: "FishPrawnCrab",
                        2489: "Fan",
                        2491: "Kwok",
                        2493: "Nim",
                        2495: "BSOE",
                        2619: "Single Dice Bet",
                        2620: "Three Dice Total",
                        2621: "Triple",
                        2622: "Any Triple ",
                        2623: "BSOE",
                        2625: "Ranking",
                        2626: "1-10 BSOE",
                        2628: "Sum of 1st & 2nd",
                        2629: "BSOE1&2 of Sum",
                        2631: "Dragon&Tiger",
                        2516: "Last 2D of AnyResult",
                        2520: "Last 3D of AnyResult",
                        2524: "Last 4D of AnyResult",
                        2551: "FailParlay 4",
                        2554: "FailParlay 8",
                        2557: "FailParlay 10",
                        2599: "Parlay 2",
                        2602: "Parlay 3",
                        2605: "Parlay 4",
                        2584: "Head 2D & Special",
                        2529: "Last 2D of AnyResult",
                        2533: "Last 3D of AnyResult",
                        2537: "Last 4D of AnyResult",
                        2561: "FailParlay 4 ",
                        2564: "FailParlay 8",
                        2567: "FailParlay 10",
                        2609: "Parlay 2",
                        2612: "Parlay 3",
                        2615: "Parlay 4",
                        2591: "Head 2D & Special",
                        2106: "一等二星不定位",
                        2108: "二等二星不定位",
                        2579: "特等二星不定位",
                        2092: "EXACT 4D-Special",
                        2094: "ANY 4D-Special",
                        2097: "EXACT 3D-Special",
                        2099: "ANY 3D-Special",
                        2102: "EXACT 2D-Special",
                        2104: "EXACT 2D-1st",
                        2107: "ANY 1D-Special",
                        2109: "ANY 1D-1st",
                        2601: "Parlay 2",
                        2604: "Parlay 3",
                        2607: "Parlay 4",
                        2611: "Parlay 2",
                        2614: "Parlay 3",
                        2617: "Parlay 4",
                        2552: "FailParlay 4",
                        2555: "FailParlay 8",
                        2558: "FailParlay 10",
                        2562: "FailParlay 4",
                        2565: "FailParlay 8",
                        2568: "FailParlay 10",
                        2517: "Last 2D of AnyResult",
                        2521: "Last 3D of AnyResult",
                        2525: "Last 4D of AnyResult",
                        2530: "Last 2D of AnyResult",
                        2534: "Last 3D of AnyResult",
                        2538: "Last 4D of AnyResult",
                        2641: "Last 2D 1K of AnyResult",
                        2642: "Last 2D 1K of AnyResult",
                        2586: "Head 2D & Special",
                        2589: "Head 2D",
                        2593: "Head 2D & Special",
                        2596: "Head 2D",
                        2580: "Tens-Special",
                        2581: "Ones-Special",
                        2582: "Tens-1st",
                        2583: "Ones-1st",
                        2302: "FishPrawnCrab",
                        2490: "Fan",
                        2492: "Kwok",
                        2494: "Nim",
                        2496: "BSOE",
                        2518: "Norm Last 2D of AnyResult",
                        2519: "Manual Last 2D of AnyResult",
                        2522: "Norm Last 3D of AnyResult",
                        2523: "Manual Last 3D of AnyResult",
                        2526: "Norm Last 4D of AnyResult",
                        2527: "Manual Last 4D of AnyResult",
                        2553: "Manual FailParlay 4",
                        2556: "Manual FailParlay 8",
                        2559: "Manual FailParlay 10",
                        2587: "Norm Head 2D & Special",
                        2590: "Norm Head 2D",
                        2531: "Norm Last 2D of AnyResult",
                        2532: "Manual Last 2D of AnyResult",
                        2535: "Norm Last 3D of AnyResult",
                        2536: "Manual Last 3D of AnyResult",
                        2539: "Norm Last 4D of AnyResult",
                        2540: "Manual Last 4D of AnyResult",
                        2563: "Manual FailParlay 4",
                        2566: "Manual FailParlay 8",
                        2569: "Manual FailParlay 10",
                        2594: "Norm Head 2D & Special",
                        2597: "Norm Head 2D",
                        2286: "Norm EXACT 4D-Special",
                        2287: "Manual EXACT 4D-Special",
                        2284: "Norm EXACT 3D-Special",
                        2285: "Manual EXACT 3D-Special",
                        2283: "Norm ANY 3D-Special",
                        2279: "Norm EXACT 2D-Special",
                        2280: "Manual Enter EXACT 2D-Special",
                        2281: "Norm EXACT 2D-1st",
                        2282: "Manual Enter EXACT 2D-1st",
                        2127: "4D",
                        2132: "3D",
                        2137: "2D",
                        2142: "1D",
                        2128: "EXACT",
                        2130: "ANY",
                        2133: "EXACT",
                        2135: "ANY",
                        2138: "EXACT",
                        2140: "EXACT",
                        2129: "EXACT 4D",
                        2131: "ANY 4D",
                        2134: "EXACT 3D",
                        2136: "ANY 3D",
                        2139: "EXACT 2D-last",
                        2141: "EXACT 2D-first",
                        2144: "ANY 1D-last",
                        2146: "ANY 1D-first",
                        2632: "Position",
                        2633: "Position (Ones)",
                        2634: "Position (Tens)",
                        2635: "Position (Hundreds)",
                        2636: "Position (Thousands)",
                        263700: "Position",
                        2637: "Position (Ones)",
                        2638: "Position (Tens)",
                        2639: "Position (Hundreds)",
                        2640: "Position (Thousands)",
                        2288: "Norm EXACT 2D-last",
                        2289: "Manual Enter EXACT 2D-last",
                        2290: "Norm EXACT 2D-first",
                        2291: "Manual Enter EXACT 2D-first",
                        2292: "Norm ANY 3D",
                        2293: "Norm EXACT 3D",
                        2294: "Manual Enter EXACT 3D",
                        2295: "Norm EXACT 4D",
                        2296: "Manual Enter EXACT 4D",
                        2303: "FishPrawnCrab",
                        2304: "FishPrawnCrab",
                        2305: "FishPrawnCrab",
                        2506: "FanTan",
                        2507: "Fan",
                        2508: "Fan",
                        2509: "Kwok",
                        2510: "Kwok",
                        2511: "Nim",
                        2512: "Nim",
                        2513: "BSOE",
                        2514: "BSOE",
                        2647: "Pick",
                        2656: "Combinations",
                        2648: "Pick",
                        2657: "Big, Exact Score, Small",
                        2658: "Odd, Even",
                        2659: "Parlay Big Small, Odd Even",
                        2660: "Top, Tie, Bottom",
                        2661: "Odds, Tie, Evens",
                        2662: "Five Element",
                        2649: "Pick 1",
                        2650: "Pick 2",
                        2651: "Pick 3",
                        2652: "Pick 4",
                        2653: "Pick 5",
                        2654: "Pick 6",
                        2655: "Pick 7",
                    },
                };
                e.default = a;
            },
            6675: function(_, e, a) {
                var t;
                function n(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function i(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? n(Object(a), !0).forEach(function(e) {
                                  r(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : n(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function r(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var o = i(
                    i({}, ((t = a(2628)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        orderStatus: {
                            orderStatus_0: "All",
                            orderStatus_2: "Sukses",
                            orderStatus_4: "Menang",
                            orderStatus_5: "Kalah",
                            orderStatus_6: "Batal",
                            orderStatus_7: "Batal",
                            orderStatus_8: "Batal",
                            orderStatus_12: "Batal",
                            orderStatus_14: "Incomlpete",
                            orderStatus_16: "Tie",
                            orderStatus_17: "Batal",
                            orderStatus_99: "Invalid Order",
                        },
                        betDigit: {
                            THOUSANDS: "Ribuan",
                            HUNDREDS: "Ratusan",
                            TENS: "Puluhan",
                            ONES: "Satuan",
                            COM: "Group",
                        },
                        pickRow: { all: "All", big: "Big", small: "Small", odd: "Odd", even: "Even", clear: "Delete" },
                        pk10Ranking: {
                            1: "Pertama",
                            2: "Kedua",
                            3: "ketiga",
                            4: "keempat",
                            5: "kelima",
                            6: "keenam",
                            7: "ketujuh",
                            8: "kedelapan",
                            9: "kesembilan",
                            10: "kesepuluh",
                        },
                        ball: {
                            fishPrawnCrab: { fish: "Ikan", prawn: "Udang", crab: "Kepiting" },
                            BSOE: { big: "Besar", small: "Kecil", odd: "Aneh", even: "Genap" },
                            K3_BSOE: { big: "Besar", small: "Kecil", odd: "Aneh", even: "Genap" },
                            PK10_BSOE: { big: "Besar", small: "Kecil", odd: "Aneh", even: "Genap" },
                            VNC_PK10_DragonTiger: { dragon: "Dragon", tiger: "Tiger" },
                            fanTanFan: { 1: "1 Fan", 2: "2 Fan", 3: "3 Fan", 4: "4 Fan" },
                            fanTanJiao: { "1_2": "1-2 Kwok", "1_4": "1-4 Kwok", "2_3": "2-3 Kwok", "3_4": "3-4 Kwok" },
                            fanTanNian: {
                                "1_2": "1 Nim 2",
                                "1_3": "1 Nim 3",
                                "1_4": "1 Nim 4",
                                "2_1": "2 Nim 1",
                                "2_3": "2 Nim 3",
                                "2_4": "2 Nim 4",
                                "3_1": "3 Nim 1",
                                "3_2": "3 Nim 2",
                                "3_4": "3 Nim 4",
                                "4_1": "4 Nim 1",
                                "4_2": "4 Nim 2",
                                "4_3": "4 Nim 3",
                            },
                            sicBoAllSurroundDice: { 1: "3 apa" },
                            sicBoDiceOdds: { 1: "ONE DICE", 2: "TWO DICE", 3: "THREE DICE" },
                            kenoFunBall: {
                                big: "Big",
                                small: "Small",
                                sumOdd: "Odd",
                                sumEven: "Even",
                                sum: "Tie",
                                bigSumOdd: "Big&Odd",
                                bigSumEven: "Big&Even",
                                smallSumOdd: "Small&Odd",
                                smallSumEven: "Small&Even",
                                up: "Top",
                                down: "Bottom",
                                middle: "Tie",
                                ballOdd: "Odds",
                                ballEven: "Evens",
                                equal: "Tie",
                                gold: "Gold",
                                wood: "Wood",
                                water: "Water",
                                fire: "Fire",
                                earth: "Earth",
                            },
                        },
                        vxd: {
                            allRed: "4 Merah",
                            allWhite: "4 Putih ",
                            threeWoneR: "3 Putih + 1 Merah",
                            threeRoneW: "3 Merah + 1 Putih",
                        },
                        kenoAnySelector: {
                            up: "Top",
                            down: "Bottom",
                            sumOdd: "Odd",
                            sumEven: "Even",
                            upSumOdd: "Top&Odd",
                            upSumEven: "Top&Even",
                            downSumOdd: "Bottom&Odd",
                            downSumEven: "Bottom&Even",
                            clear: "Clear",
                        },
                        kenoRoadmap: {
                            big: "B",
                            small: "S",
                            bigSmall: "B/S",
                            sum: "E",
                            sumOdd: "O",
                            sumEven: "E",
                            sumOddSumEven: "O/E",
                            up: "T",
                            down: "B",
                            upDown: "T/B",
                            middle: "-",
                            ballOdd: "O",
                            ballEven: "E",
                            ballOddBallEven: "O/T/E",
                            equal: "T",
                            gold: "-",
                            wood: "-",
                            water: "-",
                            fire: "-",
                            earth: "-",
                            WuXing: "5E",
                        },
                        prizeListPrizeType: {
                            VTX_BS_BIG: "Besar",
                            VTX_BS_SMALL: "Kecil",
                            VXD_BS_BIG: "Besar",
                            VXD_BS_SMALL: "Kecil",
                            VXD_OE_ODD: "Odd",
                            VXD_OE_EVEN: "Even",
                            VXD_4R_1: "4 Merah",
                            VXD_4W_1: "4 Putih",
                            VXD_3W1R_1: "3 Putih+1 Merah",
                            VXD_3R1W_1: "3 Merah+1 Putih",
                        },
                        errorCode: {
                            LGS_BETTING_GAME_CLOSED_ERROR: "Lottery Closed",
                            LGS_BETTING_GAME_FESTIVAL_ERROR: "Lottery Closed",
                            LGS_BETTING_GAME_PAUSED_ERROR: "Lottery Closed",
                            LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "Lottery Closed",
                            LGS_BETTING_AMOUNT_OVER_LIMITS: "Bet Amount is over limit",
                            LGS_BETTING_MULTIPLE_OVER_LIMITS: "Multiple bets exceeded the maximum limit.",
                            LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "Bet rebate value is less than 0",
                            LGS_BETTING_ILLEGAL_ERROR: "Incorrect bet, please try again.",
                            LGS_BETTING_WITH_INVALID_TOKEN_ERROR: "Your session is expired, please try again later",
                            LGS_CANCEL_ORDER_ARGUMENT_ERROR: "Bet cancel error",
                            LGS_BETTING_NUMBER_OVER_LIMITS: "No.%@. Jumlah batas taruhan sudah melebihi dari stok.",
                            ORDER_NOT_DRAWABLE: "Lottery Results pending",
                            LGS_CANCEL_ORDER_INACTIVITY: "The current system cannot cancel membership",
                            LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "Cancellations fee is less than the amount of bets",
                            LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR: "Error cancelling straight number bet",
                            LGS_BETTING_MODE_CLOSED_ERROR: "Betting mode is closed.",
                            LGS_BETTING_MODE_NOT_ALLOW_ERROR: "Bet mode is not allowed.",
                            SYSTEM_NOT_ALLOW_BETTING: "Game closed, please wait until next time.",
                            BETTING_ITEM_LIMIT: "Bet exceeds the limit",
                            LGS_CANCEL_ORDER_NOT_AVAILABLE: "Bet has been locked and cannot be cancelled.",
                            ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "Insufficient Balance",
                            CANCEL_CHASE_ORDER_IS_NOT_LAST_START:
                                "Chasing number needs to be cancelled from last game.",
                            ORDER_IS_CANCELED: "The bet has been cancelled.",
                            "account.balance.not.enough": "Not enough balance.",
                            ACCOUNT_BALANCE_NOT_ENOUGH: "Insufficient balance in main wallet",
                            ACCOUNT_TRANSFER_EXCEED_MIN: "Minimum transfer amount is 0.01 yuan",
                            UNKNOWN_ERROR: "System error",
                            CONNECTION_ERROR_:
                                "The location you are trying to access the website from, is currently restricted.",
                            CUSTOMER_LOGOUT_: "You are not logged in yet, please login first!",
                            DRAW_FAIL_ERROR_: "System is busy. Bet failed.",
                            NOT_SUPPORT_LANDSCAPE: "Please use portrait mode for best experience.",
                            LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS:
                                "Jumlah batas taruhan sudah melebihi dari stok.",
                            BETTING_STAKES_IS_OVER_LIMIT_STAKES: "Taruhan Taruhan lebih dari batas taruhannya",
                            ORDER_ALREADY_CANCELED: "The bet has been cancelled.",
                            STAKES_IS_OVER_LIMIT_ERROR: "Taruhan Taruhan lebih dari batas taruhannya",
                            BALANCE_NOT_ENOUGH_ERROR: "Saldo tidak mencukupi",
                            BETTING_AMOUNT_OVER_LIMITS_ERROR: "Slip taruhan penuh",
                            CALCULATE_BETTING_AMOUNT_ERROR: "Rincian bet yang tidak dikenali. Silakan coba lagi.",
                            IILLEGAL_BALL_NUMBER_ERROR: "Rincian bet yang tidak dikenali. Silakan coba lagi.",
                            ILLEGAL_BETTING_ARGUMENT_ERROR: "Rincian bet yang tidak dikenali. Silakan coba lagi.",
                            SYSTEM_NOT_ALLOW_CHASE: "Rincian bet yang tidak dikenali. Silakan coba lagi.",
                            NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR: "Rincian bet yang tidak dikenali. Silakan coba lagi.",
                            CALCULATE_STAKES_ERROR: "Rincian bet yang tidak dikenali. Silakan coba lagi.",
                            PLAY_NOT_SUPPORTED_ERROR: "Game sedang dalam perbaikan, coba lagi nanti!",
                            BOOK_FAILED_ERROR: "Harap tunggu sementara semua pembayaran sedang dilakukan！",
                            WALLET_NOT_EXISTS_ERROR: "Harap tunggu sementara semua pembayaran sedang dilakukan！",
                            B2B_TX_FAILED: "Harap tunggu sementara semua pembayaran sedang dilakukan！",
                            DEMO_NOT_SUPPORTED_ERROR: "Silakan masuk dengan akun resmi Anda",
                            ORDER_PRIZE_NOT_FOUND_ERROR: "Tidak ada catatan terkait yang ditemukan",
                            ORDER_SAVED_FAILED: "Gagal membaca pesanan, coba lagi nanti!",
                            PLATFORM_SETTING_NOT_FOUND_ERROR: "Game sedang dalam perbaikan, coba lagi nanti!",
                            NOT_AVAILABLE_FOR_SALE_ERROR: "Game sedang dalam perbaikan, coba lagi nanti!",
                            PLAY_NOT_FOUND_ERROR: "Game sedang dalam perbaikan, coba lagi nanti!",
                            GAME_SETTING_NOT_FOUND: "Game sedang dalam perbaikan, coba lagi nanti!",
                            GAME_DRWW_TIME_PARSE_ERROR: "Gagal membaca waktu pengundian, coba lagi nanti!",
                            ACCOUNT_NOT_FOUND_ERROR: "Silakan masuk dengan akun resmi Anda",
                            GAME_URL_NOT_FOUND: "Silakan masuk dengan akun resmi Anda",
                            INVALID_TOKEN: "Silakan masuk dengan akun resmi Anda",
                            USER_NOT_LOGIN: "Silakan masuk dengan akun resmi Anda",
                            CANCEL_ORDER_ERROR: "Pembatalan pesanan tidak valid",
                            INTERNAL_SERVER_ERROR: "System error",
                            OBJECT_NOT_EXIST: "System error",
                            ILLEGAL_PARAMS_VALUE: "System error",
                            BETTING_MULTIPLE_OVER_LIMITS_ERROR: "Multiple bets exceeded the maximum limit.",
                            GAME_CLOSED_ERROR: "Lottery Closed",
                            STAKES_ABOVE_LIMIT: "Taruhan Taruhan lebih dari batas taruhannya > %@",
                            PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "Taruhan maksimum yang diizinkan untuk dijual dengan dua digit yang sama setelah nomor taruhan %@ adalah %@.",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS:
                                "No.%@. Jumlah batas taruhan sudah melebihi dari stok.",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "Jumlah batas taruhan sudah melebihi dari stok.",
                        },
                        drawFrequency: "Frekuensi the draw",
                        chooseFile: "unggah data",
                        clearBallText: "PASANG",
                        addToBetSlip: "Tambah Taruhan",
                        filterRepeat: "Hapus Nomor Gandakan",
                        pastDraw: "Hasil",
                        betsNTotalAmount:
                            '<div class="font-bold">%@</div>Bet/s，TOTAL BET<div class="font-bold">%@</div>，',
                        predictionAmount: 'akan menang<div class="red-words">%@</div>',
                        willWin: "akan menang",
                        filterResultMsg: "Remove Duplicate%@ Invalid no.%@",
                        odds: "Peluang",
                        amount: "Stake",
                        manualBetPlaceHolderSEA:
                            'Please type your bets here or upload a txt file. The format is per sample below :\n\nNOTE:  You can use "," or ";" or "<Space>" or new line to separate the numbers you are betting.',
                        detail: "Detil Bet",
                        multiple: "Banyak",
                        syncMultipleBets: "Sync Multiple Bets",
                        recentlyGames: "Bet Games",
                        gameName: "Jenis",
                        gameContent: "Detil Bet",
                        odds1Time: "Menangkan / 1Time",
                        betAmount: "Hitungan",
                        drawPrize: {
                            specialPrize: "Spesial",
                            firstPrize: "Hadiah Pertama",
                            secondPrize: "Hadiah Kedua",
                            thirdPrize: "3rd Prize",
                            fourthPrize: "4th Prize",
                            fifthPrize: "5th Prize",
                            sixthPrize: "6th Prize",
                            seventhPrize: "7th Prize",
                            eighthPrize: "8th Prize",
                        },
                    }
                );
                e.default = o;
            },
            2628: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    playId: {
                        2056: "TEPAT",
                        2058: "ANY",
                        2061: "TEPAT",
                        2063: "ANY",
                        2065: "直选加开",
                        2068: "后三不定位",
                        2055: "3D",
                        2057: "3D yang tepat -1st",
                        2059: "3D Apa saja - 1st",
                        2643: "Hadiah Kedua",
                        2644: "Spesial Kedua",
                        2645: "3D yang tepat - 2nd",
                        2646: "3D yang tepat spesial -2nd",
                        2675: "Tài Xỉu",
                        2676: "Besar Kecil",
                        2677: "Xoc Dia",
                        2678: "Besar Kecil",
                        2679: "Odd Even",
                        2680: "4 Merah",
                        2681: "4 Putih",
                        2682: "3 Putih + 1 Merah",
                        2683: "3 Merah + 1 Putih",
                        2060: "2D",
                        2062: "2D Yang tepat - 1st",
                        2064: "2D Apa saja - 1st",
                        2066: "2D tepat -Spesial",
                        2067: "1D",
                        2069: "1D apa saja -1st",
                        2480: "Norma Dua digit spesial berurutan",
                        2481: "Manual Dua digit spesial berurutan",
                        2482: "Norma Dua digit tanpa urutan - 1st",
                        2483: "Norma Dua digit berurutan - 1st",
                        2484: "Manual  Dua digit berurutan - 1st",
                        2485: "Norma Tiga digit berurutan - 1st",
                        2486: "Manual Tiga digit berurutan - 1st",
                        2487: "Norma Tiga digit tanpa urutan - 1st",
                        2297: "FPC",
                        2298: "FPC",
                        2299: "FPC",
                        2497: "FanTan",
                        2498: "Fan",
                        2499: "Fan",
                        2500: "Kwok",
                        2501: "Kwok",
                        2502: "Nim",
                        2503: "Nim",
                        2504: "BesarKecilAnehGenap",
                        2505: "BesarKecilAnehGenap",
                        2090: "4D",
                        2095: "3D",
                        2100: "2D",
                        2105: "1D",
                        2515: "Gulungan Apapun",
                        2528: "Gulungan Apapun",
                        2550: "Gagal parlay",
                        2560: "Gagal parlay",
                        2598: "Parlay",
                        2608: "Parlay",
                        2300: "Ikan udang kepiting",
                        2488: "FanTan",
                        2618: "Super Sicbo",
                        2624: "1 - 10 Peringkat",
                        2627: "Jumlah pertama & kedua",
                        2630: "Naga & harimau",
                        2091: "TEPAT",
                        2093: "ANY",
                        2096: "TEPAT",
                        2098: "ANY",
                        2101: "TEPAT",
                        2103: "TEPAT",
                        2301: "Ikan udang kepiting",
                        2489: "Fan",
                        2491: "Kwok",
                        2493: "Nim",
                        2495: "BesarKecilAnehGenap",
                        2619: "Taruhan satu dua",
                        2620: "Total tiga dadu",
                        2621: "Tiga lipat",
                        2622: "Tiga lipat apa saja",
                        2623: "BesarKecilAnehGenap",
                        2625: "1 - 10 Peringkat",
                        2626: "1-10 BSOE",
                        2628: "Jumlah pertama & kedua",
                        2629: "Jumlah BSOE 1 & 2",
                        2631: "Naga & harimau",
                        2516: "2D terakhir dari hasil apa pun",
                        2520: "3D terakhir dari hasil apa pun",
                        2524: "4D terakhir dari hasil apa pun",
                        2551: "Gagal parlay 4",
                        2554: "Gagal parlay 8",
                        2557: "Gagal parlay 10",
                        2599: "Parlay 2",
                        2602: "Parlay 3",
                        2605: "Parlay 4",
                        2584: "Kepala 2D &spesial",
                        2529: "2D terakhir dari hasil apa pun",
                        2533: "3D terakhir dari hasil apa pun",
                        2537: "4D terakhir dari hasil apa pun",
                        2561: "Gagal parlay 4",
                        2564: "Gagal parlay 8",
                        2567: "Gagal parlay 10",
                        2609: "Parlay 2",
                        2612: "Parlay 3",
                        2615: "Parlay 4",
                        2591: "Kepala 2D &spesial",
                        2106: "一等二星不定位",
                        2108: "二等二星不定位",
                        2579: "特等二星不定位",
                        2092: "Tepat 4D -spesial",
                        2094: "Apa saja 4D - spesial",
                        2097: "Tepat 3D -spesial",
                        2099: "Apa saja 3D -spesial",
                        2102: "Tepat 2D -spesial",
                        2104: "Tepat 2D - 1st",
                        2107: "Apa saja 1D -spesial",
                        2109: "Apa saja 1D-1st",
                        2601: "Parlay 2",
                        2604: "Parlay 3",
                        2607: "Parlay 4",
                        2611: "Parlay 2",
                        2614: "Parlay 3",
                        2617: "Parlay 4",
                        2552: "Gagal parlay 4",
                        2555: "Gagal parlay 8",
                        2558: "Gagalparlay 10",
                        2562: "Gagal parlay 4",
                        2565: "Gagal parlay 8",
                        2568: "Gagalparlay 10",
                        2517: "2D terakhir dari hasil apa pun",
                        2521: "3D terakhir dari hasil apa pun",
                        2525: "4D terakhir dari hasil apa pun",
                        2530: "2D terakhir dari hasil apa pun",
                        2534: "3D terakhir dari hasil apa pun",
                        2538: "4D terakhir dari hasil apa pun",
                        2641: "2D 1k terakhir dari hasil apa pun",
                        2642: "2D 1k terakhir dari hasil apa pun",
                        2586: "Kepala 2D &spesial",
                        2589: "Kepala 2D",
                        2593: "Kepala 2D &spesial",
                        2596: "Kepala 2D",
                        2580: "Puluhan - spesial",
                        2581: "Satu -spesial",
                        2582: "Puluhan -1st",
                        2583: "Satu -1st",
                        2302: "FishPrawnCrab",
                        2490: "Fan",
                        2492: "Kwok",
                        2494: "Nim",
                        2496: "BesarKecilAnehGenap",
                        2518: "Norm Last 2D of AnyResult",
                        2519: "Manual Last 2D of AnyResult",
                        2522: "Norm Last 3D of AnyResult",
                        2523: "Manual Last 3D of AnyResult",
                        2526: "Norm Last 4D of AnyResult",
                        2527: "Manual Last 4D of AnyResult",
                        2553: "Manual Kegagalan Parlay 4",
                        2556: "Manual Kegagalan Parlay 8",
                        2559: "Manual Kegagalan Parlay 10",
                        2587: "Norm Head 2D & Special",
                        2590: "Norm Head 2D",
                        2531: "Norm Last 2D of AnyResult",
                        2532: "Manual Last 2D of AnyResult",
                        2535: "Norm Last 3D of AnyResult",
                        2536: "Manual Last 3D of AnyResult",
                        2539: "Norm Last 4D of AnyResult",
                        2540: "Manual Last 4D of AnyResult",
                        2563: "Manual Kegagalan Parlay 4",
                        2566: "Manual Kegagalan Parlay 8",
                        2569: "Manual Kegagalan Parlay 10",
                        2594: "Norm Head 2D & Special",
                        2597: "Norm Head 2D",
                        2286: "Norma Empat digit berurutan - 1st",
                        2287: "Manual Empat digit berurutan - 1st",
                        2284: "Norma Tiga digit berurutan - 1st",
                        2285: "Manual  Tiga digit berurutan - 1st",
                        2283: "Norma Tiga digit tanpa urutan - 1st",
                        2279: "Norm EXACT 2D-1st",
                        2280: "Manual Dua digit berurutan - 1st",
                        2281: "Norm EXACT 2D-1st",
                        2282: "Manual Enter EXACT 2D-1st",
                        2127: "4D",
                        2132: "3D",
                        2137: "2D",
                        2142: "1D",
                        2128: "TEPAT",
                        2130: "ANY",
                        2133: "TEPAT",
                        2135: "ANY",
                        2138: "TEPAT",
                        2140: "TEPAT",
                        2129: "Tepat 4D",
                        2131: "Apa saja 4D",
                        2134: "Tepat 3D",
                        2136: "Apa saja 3D",
                        2139: "Tepat 2D -terakhir",
                        2141: "Tepat 2D -pertama",
                        2144: "apa saja 1D -terakhir",
                        2146: "Apa saja 1D -pertama",
                        2632: "Posisi",
                        2633: "Posisi (Satuan)",
                        2634: "Posisi (Puluhan)",
                        2635: "Posisi (Ratusan)",
                        2636: "Posisi (Ribuan)",
                        263700: "Posisi",
                        2637: "Posisi (Satuan)",
                        2638: "Posisi (Puluhan)",
                        2639: "Posisi (Ratusan)",
                        2640: "Posisi (Ribuan)",
                        2288: "Norma Dua digit berurutan - Terakhir",
                        2289: "Manual Dua digit berurutan - Terakhir",
                        2290: "Norma Dua digit berurutan - Pertama",
                        2291: "Manual Dua digit berurutan - Pertama",
                        2292: "Norma Tiga digit tanpa urutan",
                        2293: "Norma Tiga digit berurutan",
                        2294: "Manual Tiga digit berurutan",
                        2295: "Norma Empat digit berurutan",
                        2296: "Manual Empat digit berurutan",
                        2303: "Ikan udang kepiting",
                        2304: "Ikan udang kepiting",
                        2305: "Ikan udang kepiting",
                        2506: "FanTan",
                        2507: "Fan",
                        2508: "Fan",
                        2509: "Kwok",
                        2510: "Kwok",
                        2511: "Nim",
                        2512: "Nim",
                        2513: "BesarKecilAnehGenap",
                        2514: "BesarKecilAnehGenap",
                        2647: "Pick",
                        2656: "Combinations",
                        2648: "Pick",
                        2657: "Big, Exact Score, Small",
                        2658: "Odd, Even",
                        2659: "Parlay Big Small, Odd Even",
                        2660: "Top, Tie, Bottom",
                        2661: "Odds, Tie, Evens",
                        2662: "Five Element",
                        2649: "Pick 1",
                        2650: "Pick 2",
                        2651: "Pick 3",
                        2652: "Pick 4",
                        2653: "Pick 5",
                        2654: "Pick 6",
                        2655: "Pick 7",
                    },
                };
                e.default = a;
            },
            4488: function(_, e, a) {
                var t;
                function n(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function i(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? n(Object(a), !0).forEach(function(e) {
                                  r(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : n(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function r(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var o = i(
                    i({}, ((t = a(7978)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        shoppingBasket: "カート",
                        confirmBetting: "ベットしますか？",
                        clearBallText: "クリアー",
                        addToBetSlip: "Add To Bet Slip",
                        betNow: "べットする",
                        betSuccess: "ベット完了",
                        confirmBetInfos: "ベット内容の確認",
                        balance: "残高",
                        betAmountOverMaxAmount: "ベット額は最大額を超えました。この分裂の最大ベット額は%@元",
                        totalAmount: "合計",
                        currency: "¥",
                        currencyThb: "฿",
                        confirm: "確認",
                        winningAmount: "当選額",
                        betHistory: "ベット履歴",
                        bettingTime: "ベット時間",
                        orderNumber: "ベット番号",
                        bettingAmount: "ベット額",
                        winningNumber: "当選番号",
                        betNumber: "ベット番号",
                        drawHistory: "宝くじ履歴",
                        drawResult: "宝くじ結果",
                        processing: "処理中",
                        betFail: "ベット失敗",
                        betFailed: "ベットを完了できませんでした",
                        orderStatus: {
                            orderStatus_0: "すべて",
                            orderStatus_2: "処理中",
                            orderStatus_4: "完了",
                            orderStatus_5: "取消",
                            orderStatus_6: "取消",
                            orderStatus_7: "取消",
                            orderStatus_8: "取消",
                            orderStatus_12: "取消",
                            orderStatus_14: "未完了",
                            orderStatus_16: "タイ",
                            orderStatus_17: "取消",
                            orderStatus_99: "注文無効",
                        },
                        errorCode: {
                            LGS_BETTING_GAME_CLOSED_ERROR: "宝くじ終了。",
                            LGS_BETTING_GAME_FESTIVAL_ERROR: "宝くじ終了。",
                            LGS_BETTING_GAME_PAUSED_ERROR: "宝くじ終了。",
                            LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "宝くじ終了。",
                            LGS_BETTING_AMOUNT_OVER_LIMITS: "ベット額は最大ベット額を超えてます。",
                            LGS_BETTING_MULTIPLE_OVER_LIMITS: "複数のベットが上限を超えました。",
                            LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "ベットリベート値が0未満",
                            LGS_BETTING_ILLEGAL_ERROR: "失敗しました、このベットは無効です！",
                            LGS_BETTING_WITH_INVALID_TOKEN_ERROR:
                                "アカウントはログアウトされました。再度ログインしてください。",
                            LGS_CANCEL_ORDER_ARGUMENT_ERROR: "ベットキャンセルエラー",
                            LGS_BETTING_NUMBER_OVER_LIMITS: "投注號碼%@達到當前庫存允許銷售的最大投注數額。",
                            ORDER_NOT_DRAWABLE: "宝くじ結果保留中",
                            LGS_CANCEL_ORDER_INACTIVITY: "現在のシステム上退会はできません。",
                            LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "エラー。キャンセル料はベット額より少ないです。",
                            LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR: "ストレートナンバーベットキャンセルエラー",
                            LGS_BETTING_MODE_CLOSED_ERROR: "ベットモードは終了してます。",
                            LGS_BETTING_MODE_NOT_ALLOW_ERROR: "ベットモードは許可されていません。",
                            SYSTEM_NOT_ALLOW_BETTING: "ゲームは終了しました。次回までお待ち下さい。",
                            SYSTEM_NOT_ALLOW_CHASE: "このゲーム内番号を追いかけることはできません。",
                            BETTING_ITEM_LIMIT: "ベット額が制限を超えてます",
                            LGS_CANCEL_ORDER_NOT_AVAILABLE: "ベットはロックされているため取消できません。",
                            ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "宝くじ残高足りません。",
                            CANCEL_CHASE_ORDER_IS_NOT_LAST_START:
                                "追跡番号は、最後のベットから取り消す必要があります。",
                            ORDER_IS_CANCELED: "ベットは取消済み。",
                            "account.balance.not.enough": "残高不足",
                            ACCOUNT_BALANCE_NOT_ENOUGH: "メインオウレット残高不足",
                            ACCOUNT_TRANSFER_EXCEED_MIN: "最低の送金額は0.01元です。",
                            UNKNOWN_ERROR: "システムエラー",
                            CONNECTION_ERROR_:
                                "お客さんの地域ではインタネット速度が遅いです、しばらくしてからもう一度試すか、カスタマーセンターにご連絡ください。ありがとうございます。",
                            CUSTOMER_LOGOUT_: "ログインしてください。",
                            DRAW_FAIL_ERROR_: "ベット失敗。システムが混雑してます。",
                            NOT_SUPPORT_LANDSCAPE: "横向きをサポートしません。",
                        },
                        gameHistoryCancel: "ベットをキャンセルしますか？",
                        gameHistoryCancel_success: "ベットをキャンセルしました。",
                        gameHistoryCancel_failed: "ベットのキャンセル失敗しました。",
                        gameCode: { THAIGOV: "タイ政府宝くじ", TCGTHGOV: "TCGタイ宝くじ" },
                        drawInterval: "宝くじ開時間",
                        drawFrequency: "宝くじ頻度",
                    }
                );
                e.default = o;
            },
            7978: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    playId: {
                        2056: "ストレート",
                        2058: "ボックス",
                        2061: "ストレート",
                        2063: "ボックス",
                        2065: "ボーナス数字",
                        2068: "ランダム下３桁",
                        2055: "ナンバーズ３",
                        2057: "上３桁",
                        2059: "下３桁",
                        2060: "ナンバーズ２",
                        2062: "上２桁",
                        2064: "真中２桁",
                        2066: "下２桁",
                        2067: "追いかけ番号",
                        2069: "ランダム上３桁",
                        2090: "ナンバーズ4",
                        2095: "ナンバーズ３",
                        2100: "ナンバーズ２",
                        2105: "ランダム選択",
                        2092: "上４桁",
                        2094: "下４桁",
                        2097: "上３桁",
                        2099: "真中３桁",
                        2102: "上２桁",
                        2104: "下２桁",
                        2107: "ランダム上２桁",
                        2109: "ランダム下２桁",
                        2127: "ナンバーズ4",
                        2132: "ナンバーズ３",
                        2137: "ナンバーズ２",
                        2142: "ランダム選択",
                        2129: "上４桁",
                        2131: "下４桁",
                        2134: "上３桁",
                        2136: "下３桁",
                        2139: "上２桁",
                        2141: "下２桁",
                        2144: "ランダム上２桁",
                        2146: "ランダム下２桁",
                        2647: "Pick",
                        2656: "Combinations",
                        2648: "Pick",
                        2657: "Big, Exact Score, Small",
                        2658: "Odd, Even",
                        2659: "Parlay Big Small, Odd Even",
                        2660: "Top, Tie, Bottom",
                        2661: "Odds, Tie, Evens",
                        2662: "Five Element",
                        2649: "Pick 1",
                        2650: "Pick 2",
                        2651: "Pick 3",
                        2652: "Pick 4",
                        2653: "Pick 5",
                        2654: "Pick 6",
                        2655: "Pick 7",
                    },
                };
                e.default = a;
            },
            35: function(_, e, a) {
                var t;
                function n(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function i(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? n(Object(a), !0).forEach(function(e) {
                                  r(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : n(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function r(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var o = i(
                    i({}, ((t = a(6997)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        shoppingBasket: "កន្រ្តក",
                        confirmBetting: "បញ្ជក់ការភ្ជាល់",
                        clearBallText: "លុបលេខបាល់",
                        addToBetSlip: "កើនឡើង",
                        betNow: "ចាក់ឥឡូវ",
                        betSuccess: "ការចាក់ជោគជ័យ",
                        confirmBetInfos: "បញ្ជាក់ទិន័្ទយកាចាក់",
                        balance: "តុល្យភាព",
                        betAmountOverMaxAmount: "ទឹកប្រាក់ភ្នាល់លើសចំនួនកំណត់",
                        totalAmount: "ទឹកប្រាក់សរុប",
                        currency: "៛",
                        currencyThb: "",
                        confirm: "បញ្ជាក់",
                        winningAmount: "ទឹកប្រាក់ដែលឈ្នះ",
                        betHistory: "ប្រវត្តិនៃការភ្នាល់",
                        bettingTime: "ពេលនៃកាភ្នាល់",
                        orderNumber: "ជ្រើសរើសលេខ",
                        bettingAmount: "ទឹកប្រាក់ដែលត្រូវភ្នាល់",
                        winningNumber: "លេខដែលឈ្នះ",
                        betNumber: "លេខដែលត្រូវភ្នាល់",
                        drawHistory: "បើកប្រវត្តិ",
                        pastDraw: "លទ្ធផល",
                        drawResult: "លទ្ធផលស្មើ",
                        processing: "កំពុងដំណើរការ",
                        betFail: "ការភ្នាល់មិនជោគជ័យ",
                        betFailed: "ការភ្នាល់មិនជោគជ័យ!",
                        detail: "ការចេញលេខ.",
                        recentlyGames: "ការភ្នាល់នៅ",
                        orderStatus: {
                            orderStatus_0: "ពត៌មានលំអិត",
                            orderStatus_2: "កំពុងដំណើរការ",
                            orderStatus_4: "បានឈ្នះ",
                            orderStatus_5: "មិនឈ្នះ",
                            orderStatus_6: "លុបចោល",
                            orderStatus_7: "លុបចោល",
                            orderStatus_8: "លុបចោល",
                            orderStatus_12: "លុបចោល",
                            orderStatus_14: "មិនបានបើក",
                            orderStatus_16: "ចង",
                            orderStatus_17: "លុបចោល",
                            orderStatus_99: "លំដាប់មិនត្រឹមត្រូវ",
                        },
                        betDigit: { THOUSANDS: "ពាន់", HUNDREDS: "រយ", TENS: "ដប់", ONES: "ឯក", COM: "ក្រុម" },
                        pickRow: { all: "ទាំង", big: "ធំ", small: "តូច", odd: "សេស", even: "លេខគូ", clear: "លុប" },
                        pk10Ranking: {
                            1: "1st",
                            2: "2nd",
                            3: "3rd",
                            4: "4th",
                            5: "5th",
                            6: "6th",
                            7: "7th",
                            8: "8th",
                            9: "9th",
                            10: "10th",
                        },
                        ball: {
                            fishPrawnCrab: { fish: "ត្", prawn: "បង្", crab: "ក្តាម" },
                            BSOE: { big: "ធំ", small: "តូច", odd: "សេស", even: "គូ" },
                            K3_BSOE: { big: "Big", small: "Small", odd: "Odd", even: "Even" },
                            PK10_BSOE: { big: "Big", small: "Small", odd: "Odd", even: "Even" },
                            VNC_PK10_DragonTiger: { dragon: "Dragon", tiger: "Tiger" },
                            fanTanFan: { 1: "1 Fan", 2: "2 Fan", 3: "3 Fan", 4: "4 Fan" },
                            fanTanJiao: { "1_2": "1-2 Kwok", "1_4": "1-4 Kwok", "2_3": "2-3 Kwok", "3_4": "3-4 Kwok" },
                            fanTanNian: {
                                "1_2": "1 Nim 2",
                                "1_3": "1 Nim 3",
                                "1_4": "1 Nim 4",
                                "2_1": "2 Nim 1",
                                "2_3": "2 Nim 3",
                                "2_4": "2 Nim 4",
                                "3_1": "3 Nim 1",
                                "3_2": "3 Nim 2",
                                "3_4": "3 Nim 4",
                                "4_1": "4 Nim 1",
                                "4_2": "4 Nim 2",
                                "4_3": "4 Nim 3",
                            },
                            sicBoAllSurroundDice: { 1: "Any Triple" },
                            sicBoDiceOdds: { 1: "ONE DICE", 2: "TWO DICE", 3: "THREE DICE" },
                            kenoFunBall: {
                                big: "Big",
                                small: "Small",
                                sumOdd: "Odd",
                                sumEven: "Even",
                                sum: "Tie",
                                bigSumOdd: "Big&Odd",
                                bigSumEven: "Big&Even",
                                smallSumOdd: "Small&Odd",
                                smallSumEven: "Small&Even",
                                up: "Top",
                                down: "Bottom",
                                middle: "Tie",
                                ballOdd: "Odds",
                                ballEven: "Evens",
                                equal: "Tie",
                                gold: "Gold",
                                wood: "Wood",
                                water: "Water",
                                fire: "Fire",
                                earth: "Earth",
                            },
                        },
                        vxd: {
                            allRed: "4 ក្រហម",
                            allWhite: "4 ពណ៌ស",
                            threeWoneR: "3 ពណ៌ស+1 ក្រហម",
                            threeRoneW: "3 ក្រហម+1 ពណ៌ស",
                        },
                        kenoAnySelector: {
                            up: "Top",
                            down: "Bottom",
                            sumOdd: "Odd",
                            sumEven: "Even",
                            upSumOdd: "Top&Odd",
                            upSumEven: "Top&Even",
                            downSumOdd: "Bottom&Odd",
                            downSumEven: "Bottom&Even",
                            clear: "Clear",
                        },
                        kenoRoadmap: {
                            big: "B",
                            small: "S",
                            bigSmall: "B/S",
                            sum: "E",
                            sumOdd: "O",
                            sumEven: "E",
                            sumOddSumEven: "O/E",
                            up: "T",
                            down: "B",
                            upDown: "T/B",
                            middle: "-",
                            ballOdd: "O",
                            ballEven: "E",
                            ballOddBallEven: "O/T/E",
                            equal: "T",
                            gold: "-",
                            wood: "-",
                            water: "-",
                            fire: "-",
                            earth: "-",
                            WuXing: "5E",
                        },
                        prizeListPrizeType: {
                            VTX_BS_BIG: "Big",
                            VTX_BS_SMALL: "Small",
                            VXD_BS_BIG: "ធំ",
                            VXD_BS_SMALL: "តូច",
                            VXD_OE_ODD: "លេខសេស",
                            VXD_OE_EVEN: "សូម្បីតែ",
                            VXD_4R_1: "4 ក្រហម",
                            VXD_4W_1: "4 ពណ៌ស",
                            VXD_3W1R_1: "3 ពណ៌ស + 1 ក្រហម",
                            VXD_3R1W_1: "3 ក្រហម + 1 ពណ៌ស",
                        },
                        errorCode: {
                            LGS_BETTING_GAME_CLOSED_ERROR: "អិលជីអេស-ការភ្នាល់ឆ្នោតត្រូវបានបិទ-បរាជ័យ",
                            LGS_BETTING_GAME_FESTIVAL_ERROR: "អិលជីអេស-ការភ្នាល់ឆ្នោតនៃពិធីបុណ្យ-បរាជ័យ",
                            LGS_BETTING_GAME_PAUSED_ERROR: "អិលជីអេស-ការភ្នាល់ឆ្នោតត្រូវបានផ្អាក-បរាជ័យ",
                            LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "អិលជីអេស-ការភ្នាល់មីនុយត្រូវបានបិទ-បរាជ័យ",
                            LGS_BETTING_AMOUNT_OVER_LIMITS: "អិលជីអេស-ទឹកប្រាក់នៃកាភ្នាល់លើសចំនួន",
                            LGS_BETTING_MULTIPLE_OVER_LIMITS: "ភ្នាល់លើសចំនួនអតិបរមាដែលបានកំណត់",
                            LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "តំលៃបញ្ចុះនៃការតិចជាង0",
                            LGS_BETTING_ILLEGAL_ERROR: "ភ្នាល់មិនអនុលោមនិងកាភ្នាល់-បរាជ័យ",
                            LGS_BETTING_WITH_INVALID_TOKEN_ERROR: "គណនីត្រូវបានចាកចេញសូមចូលម្តងទៀត",
                            LGS_CANCEL_ORDER_ARGUMENT_ERROR: "កំហុសក្នុងការតាមដានប៉ារ៉ាមែត្រ-បរាជ័យ",
                            LGS_BETTING_NUMBER_OVER_LIMITS:
                                "លេខភ្នាល់លេខ %@ ឈានដល់ចំនួនទឹកប្រាក់ភ្នាល់អតិបរមាដែលអនុញ្ញាតឱ្យលក់នៅក្នុងសារពើភ័ណ្ឌបច្ចុប្បន្ន។",
                            ORDER_NOT_DRAWABLE: "ការបញ្ជាទិញមិនត្រូវបានផ្តល់ជូន",
                            LGS_CANCEL_ORDER_INACTIVITY: "ប្រព័ន្ធបច្ចុប្បន្នមិនអាចប្រើសំរាប់ដកសមាជិកបានទេ",
                            LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "អិលជីអេស-ការដកប្រាក់តិចជាងចំនួនទឹកប្រាក់ភ្នាល់",
                            LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR:
                                "អិលជីអេស-បញ្ជាទិញ-សេវា-អិលអេស-ប្រុងប្រយ័ត្ន-ជ្រើសរើដ-បរាជ័យ",
                            LGS_BETTING_MODE_CLOSED_ERROR: "អិលជីអេស-ការភ្នាល់បិទ-បរាជ័យ",
                            LGS_BETTING_MODE_NOT_ALLOW_ERROR: "អិលជីអេស-ការភ្នាល់មិនអនុញ្ញាត-បរាជ័យ",
                            SYSTEM_NOT_ALLOW_BETTING: "ប្រព័ន្ធមិនអនុញ្ញតការភ្នាល់",
                            BETTING_ITEM_LIMIT: "ការភ្នាល់លើសដែនកំនត់",
                            LGS_CANCEL_ORDER_NOT_AVAILABLE: "អិលជីអេដ-បដិសេធ-បញ្ជា-មិន-មាន",
                            ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "សមតុល្យរបស់អ្នកមិនគ្រប់គ្រាន់",
                            CANCEL_CHASE_ORDER_IS_NOT_LAST_START: "លេខដែលត្រូវភ្នាល់ត្រូវដកចេញកំឡុងពេលចុងក្រោយ",
                            ORDER_IS_CANCELED: "បញ្ជាទិញ-គី-បោះបង់",
                            "account.balance.not.enough": "ទឹកប្រាក់ក្នុងគណនីមិនគ្រប់គ្រាន់",
                            ACCOUNT_BALANCE_NOT_ENOUGH: "ទឹកប្រាក់ក្នុងគណនីមិនគ្រប់គ្រាន់",
                            ACCOUNT_TRANSFER_EXCEED_MIN: "ទឹកប្រាក់ផ្ទេរមិនអាចតិចជាង0.01",
                            UNKNOWN_ERROR: "មិនស្គាល់-បោះបង់",
                            CONNECTION_ERROR_:
                                "ល្បឿនបណ្តាញក្នុងតំបន់ត្រូវបានពន្យាពេលសូមព្យាយាមម្តងទៀតនៅពេលក្រោយឫទាក់ទងសេវាកម្មអតិថិជន.សូមអរគុណ",
                            CUSTOMER_LOGOUT_: "អតិថិជន-ចាកចេញ!",
                            DRAW_FAIL_ERROR_: "ប្រព័ន្ធនេះរវល់គារភ្នាល់-បរាជ័យ",
                            NOT_SUPPORT_LANDSCAPE: "មិនអាច-កំណត់-ទេសភាព",
                            LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS:
                                "ឈានដល់ចំនួនទឹកប្រាក់ភ្នាល់អតិបរមាដែលអនុញ្ញាតឱ្យលក់នៅក្នុងសារពើភ័ណ្ឌបច្ចុប្បន្ន។",
                            BETTING_STAKES_IS_OVER_LIMIT_STAKES: "ចំនួនកំណត់ចំណាំបានលើសដែនកំណត់ខាងលើ",
                            ORDER_ALREADY_CANCELED: "បញ្ជាទិញ-គី-បោះបង់",
                            STAKES_IS_OVER_LIMIT_ERROR: "ចំនួនកំណត់ចំណាំបានលើសដែនកំណត់ខាងលើ",
                            BALANCE_NOT_ENOUGH_ERROR: "ទឹកប្រាក់មិនគ្រប់គ្រាន់",
                            BETTING_AMOUNT_OVER_LIMITS_ERROR: "ការភ្នាល់បរាជ័យចំនួនភ្នាល់លើសចំនួនអតិបរមា",
                            CALCULATE_BETTING_AMOUNT_ERROR: "មិនអាចសន្និដ្ឋានទិន្នន័យភ្នាល់បាន សូមព្យាយាមម្តងទៀត",
                            IILLEGAL_BALL_NUMBER_ERROR: "មិនអាចសន្និដ្ឋានទិន្នន័យភ្នាល់បាន សូមព្យាយាមម្តងទៀត",
                            ILLEGAL_BETTING_ARGUMENT_ERROR: "មិនអាចសន្និដ្ឋានទិន្នន័យភ្នាល់បាន សូមព្យាយាមម្តងទៀត",
                            SYSTEM_NOT_ALLOW_CHASE: "មិនអាចសន្និដ្ឋានទិន្នន័យភ្នាល់បាន សូមព្យាយាមម្តងទៀត",
                            NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR: "មិនអាចសន្និដ្ឋានទិន្នន័យភ្នាល់បាន សូមព្យាយាមម្តងទៀត",
                            CALCULATE_STAKES_ERROR: "មិនអាចសន្និដ្ឋានទិន្នន័យភ្នាល់បាន សូមព្យាយាមម្តងទៀត",
                            PLAY_NOT_SUPPORTED_ERROR: "ល្បែងមិនមានទេ",
                            BOOK_FAILED_ERROR: "សូមរង់ចាំខណៈពេលដែលការទូទាត់ទាំងអស់កំពុងដំណើរការ!",
                            WALLET_NOT_EXISTS_ERROR: "សូមរង់ចាំខណៈពេលដែលការទូទាត់ទាំងអស់កំពុងដំណើរការ!",
                            B2B_TX_FAILED: "សូមរង់ចាំខណៈពេលដែលការទូទាត់ទាំងអស់កំពុងដំណើរការ!",
                            DEMO_NOT_SUPPORTED_ERROR: "សូមចូលដោយប្រើគណនីផ្លូវការរបស់អ្នក",
                            ORDER_PRIZE_NOT_FOUND_ERROR: "មិនមានកំណត់ត្រាពាក់ព័ន្ធទេ",
                            ORDER_SAVED_FAILED: "បានបរាជ័យក្នុងការអានការបញ្ជាទិញសូមព្យាយាមម្តងទៀតនៅពេលក្រោយ!",
                            PLATFORM_SETTING_NOT_FOUND_ERROR: "ល្បែងមិនមានទេ",
                            NOT_AVAILABLE_FOR_SALE_ERROR: "ល្បែងមិនមានទេ",
                            PLAY_NOT_FOUND_ERROR: "ល្បែងមិនមានទេ",
                            GAME_SETTING_NOT_FOUND: "ល្បែងមិនមានទេ",
                            GAME_DRWW_TIME_PARSE_ERROR: "បានបរាជ័យក្នុងការអានពេលវេលាគូរសូមព្យាយាមម្តងទៀតពេលក្រោយ!",
                            ACCOUNT_NOT_FOUND_ERROR: "សូមចូលដោយប្រើគណនីផ្លូវការរបស់អ្នក",
                            GAME_URL_NOT_FOUND: "សូមចូលដោយប្រើគណនីផ្លូវការរបស់អ្នក",
                            INVALID_TOKEN: "សូមចូលដោយប្រើគណនីផ្លូវការរបស់អ្នក",
                            USER_NOT_LOGIN: "សូមចូលដោយប្រើគណនីផ្លូវការរបស់អ្នក",
                            CANCEL_ORDER_ERROR: "បោះបង់ការបញ្ជាទិញមិនត្រឹមត្រូវ",
                            INTERNAL_SERVER_ERROR: "មិនស្គាល់-បោះបង់",
                            OBJECT_NOT_EXIST: "មិនស្គាល់-បោះបង់",
                            ILLEGAL_PARAMS_VALUE: "មិនស្គាល់-បោះបង់",
                            BETTING_MULTIPLE_OVER_LIMITS_ERROR: "ភ្នាល់លើសចំនួនអតិបរមាដែលបានកំណត់",
                            GAME_CLOSED_ERROR: "អិលជីអេស-ការភ្នាល់ឆ្នោតត្រូវបានបិទ-បរាជ័យ",
                            STAKES_ABOVE_LIMIT: "ចំនួនកំណត់ចំណាំបានលើសដែនកំណត់ខាងលើ > %@",
                            PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "จำนวนเงินเดิมพันสูงสุดที่อนุญาตให้ขายได้ด้วยตัวเลขสองหลักเดียวกันหลังหมายเลขเดิมพัน %@ คือ  %@",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS:
                                "លេខភ្នាល់លេខ %@ ឈានដល់ចំនួនទឹកប្រាក់ភ្នាល់អតិបរមាដែលអនុញ្ញាតឱ្យលក់នៅក្នុងសារពើភ័ណ្ឌបច្ចុប្បន្ន។",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "ឈានដល់ចំនួនទឹកប្រាក់ភ្នាល់អតិបរមាដែលអនុញ្ញាតឱ្យលក់នៅក្នុងសារពើភ័ណ្ឌបច្ចុប្បន្ន។",
                        },
                        gameHistoryCancel: "ប្រវត្តិល្បែងត្រូវបានលុប",
                        gameHistoryCancel_success: "ប្រវត្តិល្បែងត្រូវបានលុបដោយ-ជោគជ័យ",
                        gameHistoryCancel_failed: "ប្រវត្តិល្បែងត្រូវបានលុបដោយ-មិនជោគជ័យ",
                        gameCode: { THAIGOV: "រដ្ឋាភិបាលថៃ", TCGTHGOV: "TCGរដ្ឋាភិបាល" },
                        drawFrequency: "ការចាប់",
                        chooseFile: "ផ្ទុកឡើង",
                        filterRepeat: "លុបស្ទួន",
                        betsNTotalAmount:
                            'ភ្នាល់<div class="font-bold">%@</div>ប៉ុ，ភ្នាល់សរុប<div class="font-bold">%@</div>，',
                        predictionAmount: 'ហាងឆេង<div class="red-words">%@</div>',
                        willWin: "ហាងឆេង",
                        filterResultMsg: "%@  រូវបានត្រង មលេខ %@ មិនត្រឹមត្រូវ",
                        odds: "ហាងឆេង",
                        amount: "ចំនួនភ្នាល់",
                        manualBetPlaceHolderSEA:
                            "ចំណាំនីមួយៗអាចត្រូវបានបំបែកដោយកូនសោបញ្ជាក់, ចន្លោះ [], ក្បៀស [,] ឬសញ្ញាក្បៀស [;]\nសូមនាំចូលឯកសារ TXT ថតចម្លងឬបញ្ចូលទម្រង់គាំទ្រដូចខាងក្រោម៖",
                        multiple: "ច្រើន",
                        syncMultipleBets: "បាច់ច្រើន",
                        gameName: "ប្រភេទ",
                        gameContent: "មាតិកា",
                        odds1Time: "ប្រាក់រង្វា/បរិមា",
                        betAmount: "បរិមាណ",
                        drawPrize: {
                            specialPrize: "ពិសេស",
                            firstPrize: "ង្វាន់ទី1",
                            secondPrize: "ង្វាន់ទី2",
                            thirdPrize: "ង្វាន់ទី3",
                            fourthPrize: "ង្វាន់ទី4",
                            fifthPrize: "ង្វាន់ទី5",
                            sixthPrize: "ង្វាន់ទី6",
                            seventhPrize: "ង្វាន់ទី7",
                            eighthPrize: "ង្វាន់ទី8",
                        },
                    }
                );
                e.default = o;
            },
            6997: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    playId: {
                        2056: "ជាក់ស្តែង",
                        2058: "ក្រុម",
                        2061: "ជាក់ស្តែង",
                        2063: "ក្រុម",
                        2065: "ការបោះឆ្នោតដោយផ្ទាល់",
                        2068: "បីចុងក្រោយមិនត្រូវបានដាក់",
                        2055: "3D",
                        2057: "តួលេខបីខ្ទង់",
                        2059: "លេខបីខ្ទង់លើ",
                        2643: "Second Prize",
                        2644: "Second Special",
                        2645: "EXACT 3D-2nd",
                        2646: "EXACT 3D-2nd Special",
                        2675: "Tài Xỉu",
                        2676: "Big Small",
                        2677: "Xoc Dia",
                        2678: "ធំ តូច",
                        2679: "លេខសេស សូម្បីតែ",
                        2680: "4 ក្រហម",
                        2681: "4 ពណ៌ស",
                        2682: "3 ពណ៌ស + 1 ក្រហម",
                        2683: "3 ក្រហម + 1 ពណ៌ស",
                        2060: "2D",
                        2062: "តួលេខពីខ្ទង់",
                        2064: "លេខពីរខ្ទង់លើ",
                        2066: "អវិជ្ជមានលេខពីរខ្ទង់",
                        2067: "1D",
                        2069: "រត់បីខ្ទង់",
                        2480: "Norm EXACT 2D-Special ",
                        2481: "Manual Enter EXACT 2D-Special ",
                        2482: "Norm ANY 2D-1st",
                        2483: "Norm EXACT 2D-1st",
                        2484: "Manual Enter  EXACT 2D-1st",
                        2485: "Norm EXACT 3D-1st",
                        2486: "Manual Enter EXACT 3D-1st",
                        2487: "Norm ANY 3D-1st",
                        2297: "ត្រីនិងក្តាម",
                        2298: "ត្រីនិងក្តាម",
                        2299: "ត្រីនិងក្តាម",
                        2497: "ហ្វានតាន់",
                        2498: "Fan",
                        2499: "Fan",
                        2500: "Nim",
                        2501: "Nim",
                        2502: "Kwok",
                        2503: "Kwok",
                        2504: "ធំតូចសេសគូ",
                        2505: "ធំតូចសេសគូ",
                        2090: "4D",
                        2095: "3D",
                        2100: "2D",
                        2105: "1D",
                        2515: "AnyRoll",
                        2528: "AnyRoll",
                        2550: "FailParlay",
                        2560: "FailParlay",
                        2598: "Parlay",
                        2608: "Parlay",
                        2300: "ត្រីនិងក្តាម",
                        2488: "ហ្វានតាន់",
                        2618: "Sic Bo Fast3",
                        2624: "Ranking",
                        2627: "Sum of 1st & 2nd",
                        2630: "Dragon&Tiger",
                        2091: "ជាក់ស្តែង",
                        2093: "ក្រុម",
                        2096: "ជាក់ស្តែង",
                        2098: "ក្រុម",
                        2101: "ជាក់ស្តែង",
                        2103: "ជាក់ស្តែង",
                        2301: "ត្រីនិងក្តាម",
                        2489: "Fan",
                        2491: "Nim",
                        2493: "Kwok",
                        2495: "ធំតូចសេសគូ",
                        2619: "Single Dice Bet",
                        2620: "Three Dice Total",
                        2621: "Specific Triples",
                        2622: "Any Triple ",
                        2623: "ធំតូចសេសគូ",
                        2625: "Ranking",
                        2626: "1-10 BSOE",
                        2628: "Sum of 1st & 2nd",
                        2629: "BSOE1&2 of Sum",
                        2631: "Dragon&Tiger",
                        2516: "Last 2D of AnyResult",
                        2520: "Last 3D of AnyResult",
                        2524: "Last 4D of AnyResult",
                        2551: "FailParlay 4",
                        2554: "FailParlay 8",
                        2557: "FailParlay 10",
                        2599: "Parlay 2",
                        2602: "Parlay 3",
                        2605: "Parlay 4",
                        2584: "Head 2D & Special",
                        2529: "Last 2D of AnyResult",
                        2533: "Last 3D of AnyResult",
                        2537: "Last 4D of AnyResult",
                        2561: "FailParlay 4 ",
                        2564: "FailParlay 8",
                        2567: "FailParlay 10",
                        2609: "Parlay 2",
                        2612: "Parlay 3",
                        2615: "Parlay 4",
                        2591: "Head 2D & Special",
                        2106: "一等二星不定位",
                        2108: "二等二星不定位",
                        2579: "特等二星不定位",
                        2092: "តួលេខពបួនខ្ទង់",
                        2094: "លេខបួនខ្ទង់លើ",
                        2097: "តួលេខបីខ្ទង់",
                        2099: "លេខបីខ្ទង់លើ",
                        2102: "តួលេខពីរខ្ទង់",
                        2104: "EXACT 2D-1st",
                        2107: "រត់ពីរខ្ទង់",
                        2109: "រត់ពីរខ្ទង់ខាងក្រោម",
                        2601: "Parlay 2",
                        2604: "Parlay 3",
                        2607: "Parlay 4",
                        2611: "Parlay 2",
                        2614: "Parlay 3",
                        2617: "Parlay 4",
                        2552: "FailParlay 4",
                        2555: "FailParlay 8",
                        2558: "FailParlay 10",
                        2562: "FailParlay 4",
                        2565: "FailParlay 8",
                        2568: "FailParlay 10",
                        2517: "Last 2D of AnyResult",
                        2521: "Last 3D of AnyResult",
                        2525: "Last 4D of AnyResult",
                        2530: "Last 2D of AnyResult",
                        2534: "Last 3D of AnyResult",
                        2538: "Last 4D of AnyResult",
                        2641: "Last 2D 1K of AnyResult",
                        2642: "Last 2D 1K of AnyResult",
                        2586: "Head 2D & Special",
                        2589: "Head 2D",
                        2593: "Head 2D & Special",
                        2596: "Head 2D",
                        2580: "Tens-Special",
                        2581: "Ones-Special",
                        2582: "Tens-Special",
                        2583: "Ones-Special",
                        2302: "ត្រីនិងក្តាម",
                        2490: "Fan",
                        2492: "Nim",
                        2494: "Kwok",
                        2496: "ធំតូចសេសគូ",
                        2518: "Norm Last 2D of AnyResult",
                        2519: "Manual Last 2D of AnyResult",
                        2522: "Norm Last 3D of AnyResult",
                        2523: "Manual Last 3D of AnyResult",
                        2526: "Norm Last 4D of AnyResult",
                        2527: "Manual Last 4D of AnyResult",
                        2553: "Manual FailParlay 4",
                        2556: "Manual FailParlay 8",
                        2559: "Manual FailParlay 10",
                        2587: "Norm Head 2D & Special",
                        2590: "Norm Head 2D",
                        2531: "Norm Last 2D of AnyResult",
                        2532: "Manual Last 2D of AnyResult",
                        2535: "Norm Last 3D of AnyResult",
                        2536: "Manual Last 3D of AnyResult",
                        2539: "Norm Last 4D of AnyResult",
                        2540: "Manual Last 4D of AnyResult",
                        2563: "Manual FailParlay 4",
                        2566: "Manual FailParlay 8",
                        2569: "Manual FailParlay 10",
                        2594: "Norm Head 2D & Special",
                        2597: "Norm Head 2D",
                        2286: "Norm EXACT 4D-1st",
                        2287: "Manual Enter EXACT 4D-1st",
                        2284: "Norm EXACT 3D-1st",
                        2285: "Manual Enter EXACT 3D-1st",
                        2283: "Norm ANY 3D-1st",
                        2279: "Norm EXACT 2D-1st",
                        2280: "Manual Enter EXACT 2D-1st",
                        2281: "Norm EXACT 2D-1st",
                        2282: "Manual Enter EXACT 2D-1st",
                        2127: "4D",
                        2132: "3D",
                        2137: "2D",
                        2142: "1D",
                        2128: "ជាក់ស្តែង",
                        2130: "ក្រុម",
                        2133: "ជាក់ស្តែង",
                        2135: "ក្រុម",
                        2138: "ជាក់ស្តែង",
                        2140: "ជាក់ស្តែង",
                        2129: "តួលេខពបួនខ្ទង់",
                        2131: "លេខបួនខ្ទង់លើ",
                        2134: "តួលេខបីខ្ទង់",
                        2136: "លេខបីខ្ទង់លើ",
                        2139: "តួលេខពីខ្ទង់",
                        2141: "លេខពីរខ្ទង់ក្រោម",
                        2144: "រត់ពីរខ្ទង់ខាងលើ",
                        2146: "រត់ពីរខ្ទង់ខាងក្រោម",
                        2632: "ចំនាត់ថ្នាក់",
                        2633: "ចំនាត់ថ្នាក់ (ឯក)",
                        2634: "ចំនាត់ថ្នាក់ (ដប់)",
                        2635: "ចំនាត់ថ្នាក់ (រយ)",
                        2636: "ចំនាត់ថ្នាក់ (ពាន់)",
                        263700: "ចំនាត់ថ្នាក់",
                        2637: "ចំនាត់ថ្នាក់ (ឯក)",
                        2638: "ចំនាត់ថ្នាក់ (ដប់)",
                        2639: "ចំនាត់ថ្នាក់ (រយ)",
                        2640: "ចំនាត់ថ្នាក់ (ពាន់)",
                        2288: "Norm EXACT 2D-last",
                        2289: "Manual Enter EXACT 2D-last",
                        2290: "Norm EXACT 2D-first",
                        2291: "Manual Enter EXACT 2D-first",
                        2292: "Norm ANY 3D",
                        2293: "Norm EXACT 3D",
                        2294: "Manual Enter EXACT 3D",
                        2295: "Norm EXACT 4D",
                        2296: "Manual Enter EXACT 4D",
                        2303: "ត្រីនិងក្តាម",
                        2304: "ត្រីនិងក្តាម",
                        2305: "ត្រីនិងក្តាម",
                        2506: "ហ្វានតាន់",
                        2507: "Fan",
                        2508: "Fan",
                        2509: "Nim",
                        2510: "Nim",
                        2511: "Kwok",
                        2512: "Kwok",
                        2513: "ធំតូចសេសគូ",
                        2514: "ធំតូចសេសគូ",
                        2647: "Pick",
                        2656: "Combinations",
                        2648: "Pick",
                        2657: "Big, Exact Score, Small",
                        2658: "Odd, Even",
                        2659: "Parlay Big Small, Odd Even",
                        2660: "Top, Tie, Bottom",
                        2661: "Odds, Tie, Evens",
                        2662: "Five Element",
                        2649: "Pick 1",
                        2650: "Pick 2",
                        2651: "Pick 3",
                        2652: "Pick 4",
                        2653: "Pick 5",
                        2654: "Pick 6",
                        2655: "Pick 7",
                    },
                };
                e.default = a;
            },
            7931: function(_, e, a) {
                var t;
                function n(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function i(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? n(Object(a), !0).forEach(function(e) {
                                  r(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : n(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function r(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var o = i(
                    i({}, ((t = a(9694)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        orderStatus: {
                            orderStatus_0: "All",
                            orderStatus_2: "베팅수락",
                            orderStatus_4: "승리",
                            orderStatus_5: "돈을 잃다",
                            orderStatus_6: "취소",
                            orderStatus_7: "취소",
                            orderStatus_8: "취소",
                            orderStatus_12: "취소",
                            orderStatus_14: "Incomlpete",
                            orderStatus_16: "무승부",
                            orderStatus_17: "취소",
                            orderStatus_99: "Invalid Order",
                        },
                        betDigit: { THOUSANDS: "수천", HUNDREDS: "백", TENS: "열", ONES: "단위", COM: "그룹" },
                        pickRow: { all: "모두", big: "빅", small: "스몰", odd: "홀수", even: "짝수", clear: "지우다" },
                        pk10Ranking: {
                            1: "1 번",
                            2: "2 번",
                            3: "3 번",
                            4: "4 번",
                            5: "5 번",
                            6: "6 번",
                            7: "7 번",
                            8: "8 번",
                            9: "9 번",
                            10: "10 번",
                        },
                        ball: {
                            fishPrawnCrab: { fish: "물고기", prawn: "왕새우", crab: "대게" },
                            BSOE: { big: "빅 베팅", small: "스몰 베팅", odd: "홀수 베팅", even: "짝수 베팅" },
                            K3_BSOE: { big: "Big", small: "Small", odd: "Odd", even: "Even" },
                            PK10_BSOE: { big: "빅", small: "스몰", odd: "홀수", even: "짝수" },
                            VNC_PK10_DragonTiger: { dragonTiger: "Dragon&Tiger" },
                            fanTanFan: { 1: "1 Fan", 2: "2 Fan", 3: "3 Fan", 4: "4 Fan" },
                            fanTanJiao: { "1_2": "1-2 Kwok", "1_4": "1-4 Kwok", "2_3": "2-3 Kwok", "3_4": "3-4 Kwok" },
                            fanTanNian: {
                                "1_2": "1 Nim 2",
                                "1_3": "1 Nim 3",
                                "1_4": "1 Nim 4",
                                "2_1": "2 Nim 1",
                                "2_3": "2 Nim 3",
                                "2_4": "2 Nim 4",
                                "3_1": "3 Nim 1",
                                "3_2": "3 Nim 2",
                                "3_4": "3 Nim 4",
                                "4_1": "4 Nim 1",
                                "4_2": "4 Nim 2",
                                "4_3": "4 Nim 3",
                            },
                            sicBoAllSurroundDice: { 1: "Any Triple" },
                            sicBoDiceOdds: { 1: "ONE DICE", 2: "TWO DICE", 3: "THREE DICE" },
                        },
                        vxd: {
                            allRed: "빨강",
                            allWhite: "모두 흰색",
                            threeWoneR: "흰색3+빨강1",
                            threeRoneW: "빨강3+흰색1",
                        },
                        prizeListPrizeType: {
                            VTX_BS_BIG: "빅",
                            VTX_BS_SMALL: "스몰",
                            VXD_BS_BIG: "빅",
                            VXD_BS_SMALL: "스몰",
                            VXD_OE_ODD: "홀",
                            VXD_OE_EVEN: "짝",
                            VXD_4R_1: "빨강",
                            VXD_4W_1: "모두 흰색",
                            VXD_3W1R_1: "흰색3+빨강1",
                            VXD_3R1W_1: "빨강3+흰색1",
                        },
                        errorCode: {
                            LGS_BETTING_GAME_CLOSED_ERROR: "Lottery Closed",
                            LGS_BETTING_GAME_FESTIVAL_ERROR: "Lottery Closed",
                            LGS_BETTING_GAME_PAUSED_ERROR: "Lottery Closed",
                            LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "Lottery Closed",
                            LGS_BETTING_AMOUNT_OVER_LIMITS: "Bet Amount is over limit",
                            LGS_BETTING_MULTIPLE_OVER_LIMITS: "Multiple bets exceeded the maximum limit.",
                            LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "Bet rebate value is less than 0",
                            LGS_BETTING_ILLEGAL_ERROR: "Incorrect bet, please try again.",
                            LGS_BETTING_WITH_INVALID_TOKEN_ERROR: "Your session is expired, please try again later",
                            LGS_CANCEL_ORDER_ARGUMENT_ERROR: "Bet cancel error",
                            LGS_BETTING_NUMBER_OVER_LIMITS: "%@. 이미 베팅 한도 금액이 재고를 초과했습니다.",
                            ORDER_NOT_DRAWABLE: "Lottery Results pending",
                            LGS_CANCEL_ORDER_INACTIVITY: "The current system cannot cancel membership",
                            LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "Cancellations fee is less than the amount of bets",
                            LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR: "Error cancelling straight number bet",
                            LGS_BETTING_MODE_CLOSED_ERROR: "Betting mode is closed.",
                            LGS_BETTING_MODE_NOT_ALLOW_ERROR: "Bet mode is not allowed.",
                            SYSTEM_NOT_ALLOW_BETTING: "Game closed, please wait until next time.",
                            BETTING_ITEM_LIMIT: "Bet exceeds the limit",
                            LGS_CANCEL_ORDER_NOT_AVAILABLE: "Bet has been locked and cannot be cancelled.",
                            ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "Insufficient Balance",
                            CANCEL_CHASE_ORDER_IS_NOT_LAST_START:
                                "Chasing number needs to be cancelled from last game.",
                            ORDER_IS_CANCELED: "The bet has been cancelled.",
                            "account.balance.not.enough": "Not enough balance.",
                            ACCOUNT_BALANCE_NOT_ENOUGH: "Insufficient balance in main wallet",
                            ACCOUNT_TRANSFER_EXCEED_MIN: "Minimum transfer amount is 0.01 yuan",
                            UNKNOWN_ERROR: "System error",
                            CONNECTION_ERROR_:
                                "The location you are trying to access the website from, is currently restricted.",
                            CUSTOMER_LOGOUT_: "You are not logged in yet, please login first!",
                            DRAW_FAIL_ERROR_: "System is busy. Bet failed.",
                            NOT_SUPPORT_LANDSCAPE: "Please use portrait mode for best experience.",
                            LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS: "이미 베팅 한도 금액이 재고를 초과했습니다.",
                            BETTING_STAKES_IS_OVER_LIMIT_STAKES: "베팅 말뚝이 한도 초과",
                            ORDER_ALREADY_CANCELED: "The bet has been cancelled.",
                            STAKES_IS_OVER_LIMIT_ERROR: "베팅 말뚝이 한도 초과",
                            BALANCE_NOT_ENOUGH_ERROR: "잔액 부족",
                            BETTING_AMOUNT_OVER_LIMITS_ERROR: "최대치를 초과하였습니다",
                            CALCULATE_BETTING_AMOUNT_ERROR: "베팅 내역이 확인되지 않습니다. 나중에 다시 시도해 주세요.",
                            IILLEGAL_BALL_NUMBER_ERROR: "베팅 내역이 확인되지 않습니다. 나중에 다시 시도해 주세요.",
                            ILLEGAL_BETTING_ARGUMENT_ERROR: "베팅 내역이 확인되지 않습니다. 나중에 다시 시도해 주세요.",
                            SYSTEM_NOT_ALLOW_CHASE: "베팅 내역이 확인되지 않습니다. 나중에 다시 시도해 주세요.",
                            NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR:
                                "베팅 내역이 확인되지 않습니다. 나중에 다시 시도해 주세요.",
                            CALCULATE_STAKES_ERROR: "베팅 내역이 확인되지 않습니다. 나중에 다시 시도해 주세요.",
                            PLAY_NOT_SUPPORTED_ERROR: "게임이 존재하지 않습니다",
                            BOOK_FAILED_ERROR: "모든 결제가 진행되는 동안 기다려주세요!",
                            WALLET_NOT_EXISTS_ERROR: "모든 결제가 진행되는 동안 기다려주세요!",
                            B2B_TX_FAILED: "모든 결제가 진행되는 동안 기다려주세요!",
                            DEMO_NOT_SUPPORTED_ERROR: "공식 계정으로 로그인하세요",
                            ORDER_PRIZE_NOT_FOUND_ERROR: "관련 기록이 없습니다",
                            ORDER_SAVED_FAILED: "주문을 읽지 못했습니다. 나중에 다시 시도하십시오!",
                            PLATFORM_SETTING_NOT_FOUND_ERROR: "게임이 존재하지 않습니다",
                            NOT_AVAILABLE_FOR_SALE_ERROR: "게임이 존재하지 않습니다",
                            PLAY_NOT_FOUND_ERROR: "게임이 존재하지 않습니다",
                            GAME_SETTING_NOT_FOUND: "게임이 존재하지 않습니다",
                            GAME_DRWW_TIME_PARSE_ERROR: "추첨 시간을 읽지 못했습니다. 나중에 다시 시도하세요!",
                            ACCOUNT_NOT_FOUND_ERROR: "공식 계정으로 로그인하세요",
                            GAME_URL_NOT_FOUND: "공식 계정으로 로그인하세요",
                            INVALID_TOKEN: "공식 계정으로 로그인하세요",
                            USER_NOT_LOGIN: "공식 계정으로 로그인하세요",
                            CANCEL_ORDER_ERROR: "주문 취소가 잘못되었습니다십시오",
                            INTERNAL_SERVER_ERROR: "System error",
                            OBJECT_NOT_EXIST: "System error",
                            ILLEGAL_PARAMS_VALUE: "System error",
                            BETTING_MULTIPLE_OVER_LIMITS_ERROR: "Multiple bets exceeded the maximum limit.",
                            GAME_CLOSED_ERROR: "Lottery Closed",
                            STAKES_ABOVE_LIMIT: "베팅 말뚝이 한도 초과 > %@",
                            PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "%@ 베팅 번호 이후 동일한 두 자리로 판매가 허용되는 최대 판돈은 %@입니다",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS: "%@. 이미 베팅 한도 금액이 재고를 초과했습니다.",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR: "이미 베팅 한도 금액이 재고를 초과했습니다.",
                        },
                        drawFrequency: "추첨 빈도",
                        chooseFile: "가져오려면",
                        clearBallText: "삭제",
                        addToBetSlip: "슬립에 추가",
                        filterRepeat: "중복 제거",
                        pastDraw: "결과",
                        betsNTotalAmount:
                            '<div class="font-bold">%@</div>내기，총 베팅<div class="font-bold">%@</div>，',
                        predictionAmount: '보너스<div class="red-words">%@</div>',
                        willWin: "보너스",
                        filterResultMsg: "%@ 중복제거 %@ 무효",
                        odds: "배당",
                        amount: "금액",
                        manualBetPlaceHolderSEA:
                            '텍스트 파일을 가져오려면 파일을 열거나 외부 데이터 범위로 텍스트 파일을 가져올 수 있습니다.\n갈라진사용 되는 가지 텍스트 파일 형식은 다음과 같습니다 TXT 파일.  참고:   차별 " , "  및 " ; "   및   "<우주 >" 열을 가져오거나 있습니다.\n보기를 들어 설명하다',
                        detail: "베팅 정보",
                        multiple: "배수",
                        syncMultipleBets: "동기화",
                        recentlyGames: "오픈베팅",
                        gameName: "범주",
                        gameContent: "베팅 정보",
                        odds1Time: "보너스/조합",
                        betAmount: "조합",
                        drawPrize: {
                            specialPrize: "스페셜",
                            firstPrize: "1등",
                            secondPrize: "2등",
                            thirdPrize: "3등",
                            fourthPrize: "4등",
                            fifthPrize: "5등",
                            sixthPrize: "6등",
                            seventhPrize: "7등",
                            eighthPrize: "8등",
                        },
                    }
                );
                e.default = o;
            },
            2589: function(_, e, a) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var t = l(a(5457)),
                    n = l(a(7074)),
                    i = l(a(5418)),
                    r = a(9748),
                    o = a(814);
                function l(_) {
                    return _ && _.__esModule ? _ : { default: _ };
                }
                function u(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function s(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? u(Object(a), !0).forEach(function(e) {
                                  d(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : u(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function d(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                var S = {
                    items: [
                        r.PlayMenu.SpecialCom3_PCB,
                        r.PlayMenu.First2_Straight_11X5_ENT,
                        r.PlayMenu.First3_Straight_11X5_ENT,
                        r.PlayMenu.Last2Straight,
                        r.PlayMenu.First2Straight,
                        r.PlayMenu.Last3Straight,
                        r.PlayMenu.Middle3Straight,
                        r.PlayMenu.First3Straight,
                        r.PlayMenu.Last3Join,
                        r.PlayMenu.Middle3Join,
                        r.PlayMenu.First3Join,
                        r.PlayMenu.Last4Straight,
                        r.PlayMenu.First4Straight,
                        r.PlayMenu.Last4Join,
                        r.PlayMenu.First4Join,
                        r.PlayMenu.L4Com12,
                        r.PlayMenu.L4Com4,
                        r.PlayMenu.F4Com12,
                        r.PlayMenu.F4Com4,
                        r.PlayMenu.AllCom60,
                        r.PlayMenu.AllCom30,
                        r.PlayMenu.AllCom20,
                        r.PlayMenu.AllCom10,
                        r.PlayMenu.AllCom5,
                        r.PlayMenu.Last2Join,
                        r.PlayMenu.First2Join,
                        r.PlayMenu.AllStraightAnyCode2_SSC,
                        r.PlayMenu.AllStraightAnyCode3_SSC,
                        r.PlayMenu.Last4StraightAnyCode2_SSC,
                        r.PlayMenu.First3StraightAnyCode2,
                        r.PlayMenu.Middle3StraightAnyCode2,
                        r.PlayMenu.Last3StraightAnyCode2,
                        r.PlayMenu.First3ComAnyCode2,
                        r.PlayMenu.Middle3ComAnyCode2,
                        r.PlayMenu.Last3ComAnyCode2,
                        r.PlayMenu.First1_PK10,
                        r.PlayMenu.First2_PK10,
                        r.PlayMenu.First3_PK10,
                        r.PlayMenu.First4_PK10,
                        r.PlayMenu.First5_PK10,
                        r.PlayMenu.First2BSOE,
                        r.PlayMenu.Last2BSOE,
                        r.PlayMenu.Any2_Straight_4D,
                        r.PlayMenu.Any3_Straight_4D,
                        r.PlayMenu.Any4_Straight_4D,
                        r.PlayMenu.Any2_Dantuo_11X5,
                        r.PlayMenu.Any3_Dantuo_11X5,
                        r.PlayMenu.Any4_Dantuo_11X5,
                        r.PlayMenu.Any5_Dantuo_11X5,
                        r.PlayMenu.Any6_Dantuo_11X5,
                        r.PlayMenu.Any7_Dantuo_11X5,
                        r.PlayMenu.Any8_Dantuo_11X5,
                        r.PlayMenu.Dragon_Tiger_Main_PK10,
                        r.PlayMenu.First_To_Tenth_Guess_Rank_VPK10,
                        r.PlayMenu.First_To_Tenth_BSOE_VPK10,
                    ],
                };
                function c(_) {
                    var e = function() {
                            for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++) a[t] = arguments[t];
                            return o.i18nWithLang.apply(void 0, [_].concat(a));
                        },
                        a = ["big", "small", "odd", "even"],
                        t = ["prime", "composite"],
                        l = ["tenThousands2", "thousands2", "hundreds2", "tens2", "ones2"],
                        u = {
                            FUN: {
                                0: "big",
                                1: "small",
                                2: "sumOdd",
                                3: "sumEven",
                                4: "sum",
                                5: "bigSumOdd",
                                6: "bigSumEven",
                                7: "smallSumOdd",
                                8: "smallSumEven",
                                9: "up",
                                10: "down",
                                11: "middle",
                                12: "ballOdd",
                                13: "ballEven",
                                14: "equal",
                                15: "gold",
                                16: "wood",
                                17: "water",
                                18: "fire",
                                19: "earth",
                            },
                        },
                        d = {
                            SUM_BSOE: ["totalBig", "totalSmall", "totalOdd", "totalEven"],
                            TOTAL_SUM_BSOE: ["specialSumBig", "specialSumSmall", "specialSumOdd", "specialSumEven"],
                            BSOE: ["specialBig", "specialSmall", "specialOdd", "specialEven"],
                            BS_OE: {
                                "02": "specialBigOdd",
                                "03": "specialBigEven",
                                12: "specialSmallOdd",
                                13: "specialSmallEven",
                            },
                            NNBSOE: ["NNBig", "NNSmall", "NNOdd", "NNEven"],
                            BALL_TOSUM_BSOE_KEY: [
                                "specialTOSumBig",
                                "specialTOSumSmall",
                                "specialTOSumOdd",
                                "specialTOSumEven",
                            ],
                            TAIL_BS_KEY: ["specialTailBig", "specialTailSmall"],
                            SPECIAL_ZODIAC: {
                                1: "specialSkyAnimal",
                                2: "specialGroundAnimal",
                                3: "specialHomeAnimal",
                                4: "specialWildAnimal",
                                5: "specialFirst6Animal",
                                6: "specialLast6Animal",
                            },
                            COLOR_BALL: { 1: "colorStraightRed", 2: "colorStraightBlue", 3: "colorStraightGreen" },
                            COLOR_BSOE: {
                                12: "redOdd",
                                13: "redEven",
                                10: "redBig",
                                11: "redSmall",
                                22: "blueOdd",
                                23: "blueEven",
                                20: "blueBig",
                                21: "blueSmall",
                                32: "greenOdd",
                                33: "greenEven",
                                30: "greenBig",
                                31: "greenSmall",
                            },
                            COLOR_BS_OE: {
                                102: "redBigOdd",
                                103: "redBigEven",
                                112: "redSmallOdd",
                                113: "redSmallEven",
                                202: "blueBigOdd",
                                203: "blueBigEven",
                                212: "blueSmallOdd",
                                213: "blueSmallEven",
                                302: "greenBigOdd",
                                303: "greenBigEven",
                                312: "greenSmallOdd",
                                313: "greenSmallEven",
                            },
                            ZODIAC: {
                                1: "specialRat",
                                2: "specialOx",
                                3: "specialTiger",
                                4: "specialRabbit",
                                5: "specialDragon",
                                6: "specialSnake",
                                7: "specialHorse",
                                8: "specialGoat",
                                9: "specialMonkey",
                                10: "specialRooster",
                                11: "specialDog",
                                12: "specialPig",
                            },
                            HEAD_TAIL: {
                                10: "headZero",
                                11: "headOne",
                                12: "headTwo",
                                13: "headThree",
                                14: "headFour",
                                21: "tailOne",
                                22: "tailTwo",
                                23: "tailThree",
                                24: "tailFour",
                                25: "tailFive",
                                26: "tailSix",
                                27: "tailSeven",
                                28: "tailEight",
                                29: "tailNine",
                                20: "tailZero",
                            },
                            FIXED_BSOE: {
                                FIRST: ["firstBig", "firstSmall", "firstOdd", "firstEven"],
                                SECOND: ["secondBig", "secondSmall", "secondOdd", "secondEven"],
                                THIRD: ["thirdBig", "thirdSmall", "thirdOdd", "thirdEven"],
                                FOURTH: ["fourthBig", "fourthSmall", "fourthOdd", "fourthEven"],
                                FIFTH: ["fifthBig", "fifthSmall", "fifthOdd", "fifthEven"],
                                SIXTH: ["sixthBig", "sixthSmall", "sixthOdd", "sixthEven"],
                            },
                            FIXED_TOSum_OE: {
                                FIRST: { 2: "firstSumOdd", 3: "firstSumEven" },
                                SECOND: { 2: "secondSumOdd", 3: "secondSumEven" },
                                THIRD: { 2: "thirdSumOdd", 3: "thirdSumEven" },
                                FOURTH: { 2: "fourthSumOdd", 3: "fourthSumEven" },
                                FIFTH: { 2: "fifthSumOdd", 3: "fifthSumEven" },
                                SIXTH: { 2: "sixthSumOdd", 3: "sixthSumEven" },
                            },
                            FIXED_Color: {
                                FIRST: { 1: "firstRed", 2: "firstBlue", 3: "firstGreen" },
                                SECOND: { 1: "secondRed", 2: "secondBlue", 3: "secondGreen" },
                                THIRD: { 1: "thirdRed", 2: "thirdBlue", 3: "thirdGreen" },
                                FOURTH: { 1: "fourthRed", 2: "fourthBlue", 3: "fourthGreen" },
                                FIFTH: { 1: "fifthRed", 2: "fifthBlue", 3: "fifthGreen" },
                                SIXTH: { 1: "sixthRed", 2: "sixthBlue", 3: "sixthGreen" },
                            },
                            TOSum_BSOE: ["normalTOSumBig", "normalTOSumSmall", "normalTOSumOdd", "normalTOSumEven"],
                            Tail_BS: ["normalTailBig", "normalTailSmall"],
                            NORMAL_BSOE: ["normalBig", "normalSmall", "normalOdd", "normalEven"],
                        },
                        S = ["banker", "player", "tie", "bankerPair", "playerPair"],
                        c = {
                            "01": "fiveOfAKind",
                            "02": "fourOfAKind",
                            "03": "fullHouse",
                            "04": "straight",
                            "05": "treeOfAKind",
                            "06": "twoPair",
                            "07": "onePair",
                            "08": "highCard",
                        },
                        T = { 0: "baozi", 1: "straight", 2: "pair", 3: "zu6", 4: "halfStraight" },
                        E = {
                            BS_OE: { "02": "bigOdd", "03": "bigEven", 12: "smallOdd", 13: "smallEven" },
                            Extremum_BS: { 0: "extremumBig", 1: "extremumSmall" },
                            Color: { 1: "colorStraightRed", 2: "colorStraightBlue", 3: "colorStraightGreen" },
                        },
                        y = {
                            Total_Sum_Group: [
                                "twoSideSumGroupBig",
                                "twoSideSumGroupSmall",
                                "twoSideSumGroupOdd",
                                "twoSideSumGroupEven",
                                "twoSideSumGroupTailBig",
                                "twoSideSumGroupTailSmall",
                            ],
                            Dragon_Tiger: ["specialTiger", "specialDragon"],
                        },
                        O = { COMBALL_BSOE: { "02": "bigOdd", "03": "bigEven", 12: "smallOdd", 13: "smallEven" } },
                        m = { 0: "fish", 1: "prawn", 2: "crab" },
                        N = {
                            "4R_Main_VXD": { 1: "allRed" },
                            "4W_Main_VXD": { 1: "allWhite" },
                            "3W1R_Main_VXD": { 1: "threeWoneR" },
                            "3R1W_Main_VXD": { 1: "threeRoneW" },
                        },
                        p = function(_) {
                            switch (_) {
                                case "1":
                                    return e("ball.dragonTigerTie.dragon");
                                case "12":
                                    return e("ball.dragonTigerTie.dragonOdd");
                                case "13":
                                    return e("ball.dragonTigerTie.dragonEven");
                                case "0":
                                    return e("ball.dragonTigerTie.tiger");
                                case "02":
                                    return e("ball.dragonTigerTie.tigerOdd");
                                case "03":
                                    return e("ball.dragonTigerTie.tigerEven");
                                case "2":
                                    return e("ball.dragonTigerTie.tie");
                                default:
                                    return "";
                            }
                        },
                        P = function(_) {
                            var a = _.split("@");
                            return {
                                digitPosText: (0, n.default)(a[0].split("")).reduce(function(_, a) {
                                    var t = parseInt(a) - 1;
                                    return "".concat(_).concat(e("startDigit.".concat(l[t])));
                                }, ""),
                                ballTextArray: (0, i.default)(a[1].split(",")),
                            };
                        },
                        A = {
                            "4R_Main_VXD": {
                                items: [r.PlayMenu.XocDia_4R_Main_VXD],
                                getText: function(_) {
                                    return e("vxd.".concat(N["4R_Main_VXD"][_]));
                                },
                            },
                            "4W_Main_VXD": {
                                items: [r.PlayMenu.XocDia_4W_Main_VXD],
                                getText: function(_) {
                                    return e("vxd.".concat(N["4W_Main_VXD"][_]));
                                },
                            },
                            "3W1R_Main_VXD": {
                                items: [r.PlayMenu.XocDia_3W1R_Main_VXD],
                                getText: function(_) {
                                    return e("vxd.".concat(N["3W1R_Main_VXD"][_]));
                                },
                            },
                            "3R1W_Main_VXD": {
                                items: [r.PlayMenu.XocDia_3R1W_Main_VXD],
                                getText: function(_) {
                                    return e("vxd.".concat(N["3R1W_Main_VXD"][_]));
                                },
                            },
                        },
                        g = {
                            BALL_NUMBER_LHC: {
                                items: [
                                    r.PlayMenu.SpecialA_Straight_LHC,
                                    r.PlayMenu.SpecialB_Straight_LHC,
                                    r.PlayMenu.Normal_Straight_LHC,
                                    r.PlayMenu.First_Fixed_LHC,
                                    r.PlayMenu.Second_Fixed_LHC,
                                    r.PlayMenu.Third_Fixed_LHC,
                                    r.PlayMenu.Fourth_Fixed_LHC,
                                    r.PlayMenu.Fifth_Fixed_LHC,
                                    r.PlayMenu.Sixth_Fixed_LHC,
                                    r.PlayMenu.Choose_Not_in_Winning_Numbers_LHC,
                                    r.PlayMenu["5_Not_in_Winning_Numbers_LHC"],
                                    r.PlayMenu["6_Not_in_Winning_Numbers_LHC"],
                                    r.PlayMenu["7_Not_in_Winning_Numbers_LHC"],
                                    r.PlayMenu["8_Not_in_Winning_Numbers_LHC"],
                                    r.PlayMenu["9_Not_in_Winning_Numbers_LHC"],
                                    r.PlayMenu["10_Not_in_Winning_Numbers_LHC"],
                                    r.PlayMenu["11_Not_in_Winning_Numbers_LHC"],
                                    r.PlayMenu["12_Not_in_Winning_Numbers_LHC"],
                                    r.PlayMenu.Two_In_Normal_LHC,
                                    r.PlayMenu.Three_In_Normal_LHC,
                                    r.PlayMenu.Four_In_Normal_LHC,
                                    r.PlayMenu.Two_Of_Three_In_Normal_LHC,
                                    r.PlayMenu.Two_In_Normal_Or_Special_LHC,
                                    r.PlayMenu.In_Normal_And_Special_LHC,
                                    r.PlayMenu.Combine_First_Straight_ENT,
                                    r.PlayMenu.Combine_Second_Straight_ENT,
                                    r.PlayMenu.Combine_Third_Straight_ENT,
                                    r.PlayMenu.Combine_Fourth_Straight_ENT,
                                    r.PlayMenu.Combine_Fifth_Straight_ENT,
                                    r.PlayMenu.Five_Have_One_Straight_ENT,
                                ],
                                getText: function(_) {
                                    return _.split("-").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            BSOE_LHC: {
                                items: [r.PlayMenu.SpecialA_BSOE_LHC, r.PlayMenu.Special_BSOE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.BSOE[_]));
                                },
                            },
                            BS_OE_LHC: {
                                items: [r.PlayMenu.Special_BS_OE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.BS_OE[_]));
                                },
                            },
                            SPECIAL_TOSum_BSOE_LHC: {
                                items: [r.PlayMenu.SpecialA_TOSum_BSOE_LHC, r.PlayMenu.Special_TOSum_BSOE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.BALL_TOSUM_BSOE_KEY[_]));
                                },
                            },
                            SPECIAL_Tail_BS_LHC: {
                                items: [r.PlayMenu.SpecialA_Tail_BS_LHC, r.PlayMenu.Special_Tail_BS_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.TAIL_BS_KEY[_]));
                                },
                            },
                            SPECIAL_ZODIAC_LHC: {
                                items: [r.PlayMenu.SpecialA_Animal_LHC, r.PlayMenu.Special_Animal_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.SPECIAL_ZODIAC[_]));
                                },
                            },
                            TOTAL_SUM_BSOE_LHC: {
                                items: [r.PlayMenu.Two_Sides_Total_Sum_BSOE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.TOTAL_SUM_BSOE[_]));
                                },
                            },
                            COLOR_BALL_LHC: {
                                items: [
                                    r.PlayMenu.Color_Straight_LHC,
                                    r.PlayMenu.Fixed_First_Color_LHC,
                                    r.PlayMenu.Fixed_Second_Color_LHC,
                                    r.PlayMenu.Fixed_Third_Color_LHC,
                                    r.PlayMenu.Fixed_Fourth_Color_LHC,
                                    r.PlayMenu.Fixed_Fifth_Color_LHC,
                                    r.PlayMenu.Fixed_Sixth_Color_LHC,
                                ],
                                getText: function(_) {
                                    return e("playKey.".concat(d.COLOR_BALL[_]));
                                },
                            },
                            COLOR_BSOE_LHC: {
                                items: [r.PlayMenu.Color_BSOE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.COLOR_BSOE[_]));
                                },
                            },
                            COLOR_BS_OE_LHC: {
                                items: [r.PlayMenu.Color_BS_OE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.COLOR_BS_OE[_]));
                                },
                            },
                            ZODIAC_LHC: {
                                items: [
                                    r.PlayMenu.Special_Zodiac_Straight_LHC,
                                    r.PlayMenu.Normal_Special_One_Zodiac_LHC,
                                ],
                                getText: function(_) {
                                    return e("playKey.".concat(d.ZODIAC[_]));
                                },
                            },
                            HEAD_TAIL_LHC: {
                                items: [r.PlayMenu.Head_Tail_Special_LHC, r.PlayMenu.Normal_Special_Tail_No_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.HEAD_TAIL[_]));
                                },
                            },
                            COMBINE_ZODIAC_LHC: {
                                items: [
                                    r.PlayMenu.Special_Combine_Chinese_Zodiac_LHC,
                                    r.PlayMenu.Two_Join_Zodiac_LHC,
                                    r.PlayMenu.Three_Join_Zodiac_LHC,
                                    r.PlayMenu.Four_Join_Zodiac_LHC,
                                    r.PlayMenu.Five_Join_Zodiac_LHC,
                                ],
                                getText: function(_) {
                                    return _.split("-").reduce(function(_, a) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e("playKey.".concat(d.ZODIAC[parseInt(a)])));
                                    }, "");
                                },
                            },
                            SUM_BSOE_LHC: {
                                items: [r.PlayMenu.Combine_Total_Sum_ENT],
                                getText: function(_) {
                                    return e("playKey.".concat(d.SUM_BSOE[_]));
                                },
                            },
                            FOURTH_FIXED_BSOE_LHC: {
                                items: [r.PlayMenu.Fixed_Fourth_BSOE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.FIXED_BSOE.FOURTH[_]));
                                },
                            },
                            FIRST_FIXED_TOSum_OE_LHC: {
                                items: [r.PlayMenu.Fixed_First_TOSum_OE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.FIXED_TOSum_OE.FIRST[_]));
                                },
                            },
                            SECOND_FIXED_TOSum_OE_LHC: {
                                items: [r.PlayMenu.Fixed_Second_TOSum_OE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.FIXED_TOSum_OE.SECOND[_]));
                                },
                            },
                            THIRD_FIXED_TOSum_OE_LHC: {
                                items: [r.PlayMenu.Fixed_Third_TOSum_OE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.FIXED_TOSum_OE.THIRD[_]));
                                },
                            },
                            FOURTH_FIXED_TOSum_OE_LHC: {
                                items: [r.PlayMenu.Fixed_Fourth_TOSum_OE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.FIXED_TOSum_OE.FOURTH[_]));
                                },
                            },
                            FIFTH_FIXED_TOSum_OE_LHC: {
                                items: [r.PlayMenu.Fixed_Fifth_TOSum_OE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.FIXED_TOSum_OE.FIFTH[_]));
                                },
                            },
                            SIXTH_FIXED_TOSum_OE_LHC: {
                                items: [r.PlayMenu.Fixed_Sixth_TOSum_OE_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.FIXED_TOSum_OE.SIXTH[_]));
                                },
                            },
                            FIRST_FIXED_COLOR_LHC: {
                                items: [r.PlayMenu.Fixed_First_Color_LHC],
                                getText: function(_) {
                                    return e("playKey.".concat(d.FIXED_Color.FIRST[_]));
                                },
                            },
                            NORMAL_BSOE_LHC: {
                                items: [
                                    r.PlayMenu.Fixed_First_BSOE_LHC,
                                    r.PlayMenu.Fixed_Second_BSOE_LHC,
                                    r.PlayMenu.Fixed_Third_BSOE_LHC,
                                    r.PlayMenu.Fixed_Fourth_BSOE_LHC,
                                    r.PlayMenu.Fixed_Fifth_BSOE_LHC,
                                    r.PlayMenu.Fixed_Sixth_BSOE_LHC,
                                ],
                                getText: function(_) {
                                    return e("playKey.".concat(d.NORMAL_BSOE[_]));
                                },
                            },
                            TOSum_BSOE_LHC: {
                                items: [
                                    r.PlayMenu.Normal_First_TOSum_BSOE_LHC,
                                    r.PlayMenu.Normal_Second_TOSum_BSOE_LHC,
                                    r.PlayMenu.Normal_Third_TOSum_BSOE_LHC,
                                    r.PlayMenu.Normal_Fourth_TOSum_BSOE_LHC,
                                    r.PlayMenu.Normal_Fifth_TOSum_BSOE_LHC,
                                    r.PlayMenu.Normal_Sixth_TOSum_BSOE_LHC,
                                ],
                                getText: function(_) {
                                    return e("playKey.".concat(d.TOSum_BSOE[_]));
                                },
                            },
                            TAIL_BS_LHC: {
                                items: [
                                    r.PlayMenu.Normal_First_Tail_BS_LHC,
                                    r.PlayMenu.Normal_Second_Tail_BS_LHC,
                                    r.PlayMenu.Normal_Third_Tail_BS_LHC,
                                    r.PlayMenu.Normal_Fourth_Tail_BS_LHC,
                                    r.PlayMenu.Normal_Fifth_Tail_BS_LHC,
                                    r.PlayMenu.Normal_Sixth_Tail_BS_LHC,
                                ],
                                getText: function(_) {
                                    return e("playKey.".concat(d.Tail_BS[_]));
                                },
                            },
                        },
                        R = {
                            BALL_NUMBER_PK10: {
                                items: [
                                    r.PlayMenu.First5Fixed_PK10,
                                    r.PlayMenu.Last5Fixed_PK10,
                                    r.PlayMenu.FirstPlace_PK10,
                                    r.PlayMenu.SecondPlace_PK10,
                                    r.PlayMenu.ThirdPlace_PK10,
                                    r.PlayMenu.FourthPlace_PK10,
                                    r.PlayMenu.FifthPlace_PK10,
                                    r.PlayMenu.SixthPlace_PK10,
                                    r.PlayMenu.SeventhPlace_PK10,
                                    r.PlayMenu.EighthPlace_PK10,
                                    r.PlayMenu.NinthPlace_PK10,
                                    r.PlayMenu.TenthPlace_PK10,
                                ],
                                getText: function(_) {
                                    return _.split("-").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            NUMBER_WITH_HYPHEN: {
                                items: [
                                    r.PlayMenu.First1_PK10,
                                    r.PlayMenu.First2_PK10,
                                    r.PlayMenu.First3_PK10,
                                    r.PlayMenu.First4_PK10,
                                    r.PlayMenu.First5_PK10,
                                ],
                                getText: function(_) {
                                    return _.split(",")
                                        .reduce(function(_, e) {
                                            return ""
                                                .concat(_)
                                                .concat(_ && e ? " | " : " ")
                                                .concat(e);
                                        }, "")
                                        .replace(/-/g, " ");
                                },
                            },
                            FAN_PK10: {
                                items: [r.PlayMenu.Fan_Tan_Fan_PK10],
                                getText: function(_) {
                                    return e("ball.fanTanFan.".concat(_.replace("0", "4")));
                                },
                            },
                            JIAO_PK10: {
                                items: [r.PlayMenu.Fan_Tan_Jiao_PK10],
                                getText: function(_) {
                                    return e(
                                        "ball.fanTanJiao.".concat(
                                            _.replace("0", "4")
                                                .split("")
                                                .join("_")
                                        )
                                    );
                                },
                            },
                            NIAN_PK10: {
                                items: [r.PlayMenu.Fan_Tan_Nian_PK10],
                                getText: function(_) {
                                    return e(
                                        "ball.fanTanNian.".concat(
                                            _.replace("0", "4")
                                                .split("")
                                                .join("_")
                                        )
                                    );
                                },
                            },
                        },
                        L = {
                            BALL_NUMBER_PCB: {
                                items: [r.PlayMenu.SpecialSum_PCB],
                                getText: function(_) {
                                    return _.split("-").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            BS_OE_PCB: {
                                items: [
                                    r.PlayMenu.Special_BS_OE_PCB,
                                    r.PlayMenu.BS_OE_WITH_TIE_PCB,
                                    r.PlayMenu.BS_OE_ONLY_TIE_PCB,
                                    r.PlayMenu.BS_OE_ALL_KILL_PCB,
                                ],
                                getText: function(_) {
                                    return e("playKey.".concat(E.BS_OE[_]));
                                },
                            },
                            Extremum_BS_PCB: {
                                items: [r.PlayMenu.Special_Extremum_BS_PCB],
                                getText: function(_) {
                                    return e("playKey.".concat(E.Extremum_BS[_]));
                                },
                            },
                            Color_PCB: {
                                items: [r.PlayMenu.Color_PCB],
                                getText: function(_) {
                                    return e("playKey.".concat(E.Color[_]));
                                },
                            },
                            Boazi_PCB: {
                                items: [r.PlayMenu.Boazi_PCB],
                                getText: function() {
                                    return e("playKey.baozi");
                                },
                            },
                            SpecialCom3_PCB: {
                                items: [r.PlayMenu.SpecialCom3_PCB],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                        },
                        C = {
                            BALL_NUMBER_K3: {
                                items: [
                                    r.PlayMenu.Sum_K3_ENT,
                                    r.PlayMenu.Single_Same_K3_ENT,
                                    r.PlayMenu.Sum_Baozi_Kill_K3_ENT,
                                ],
                                getText: function(_) {
                                    return _.split("-").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            SINGLE_SAME_3_K3: {
                                items: [r.PlayMenu.Single_Same_3_K3],
                                getText: function(_) {
                                    return _.split("-").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? "  " : "")
                                            .concat(e)
                                            .concat(e)
                                            .concat(e);
                                    }, "");
                                },
                            },
                            MULTI_BALL_NUMBER_K3: {
                                items: [r.PlayMenu.Different_3_K3, r.PlayMenu.Different_2_K3],
                                getText: function(_) {
                                    return _.split("").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            SINGLE_SAME_2_K3: {
                                items: [r.PlayMenu.Single_Same_2_K3],
                                getText: function(_) {
                                    return _.split("").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? "".concat(_, " | ") : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            MULTI_SAME_2_K3: {
                                items: [r.PlayMenu.Multi_Same_2_K3],
                                getText: function(_) {
                                    return _.split("").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? "  " : "")
                                            .concat(e)
                                            .concat(e);
                                    }, "");
                                },
                            },
                            ALL_SAME_3_K3: {
                                items: [r.PlayMenu.All_Same_3_K3],
                                getText: function() {
                                    return e("playKey.allThreeSame");
                                },
                            },
                            ALL_SAME_2_K3: {
                                items: [r.PlayMenu.All_Same_2_K3],
                                getText: function() {
                                    return e("ball.k3.All_Same_2_K3");
                                },
                            },
                            All_Different_3_K3: {
                                items: [r.PlayMenu.All_Different_3_K3],
                                getText: function() {
                                    return e("ball.k3.All_Different_3_K3");
                                },
                            },
                            Boazi_K3: {
                                items: [r.PlayMenu.Boazi_K3],
                                getText: function() {
                                    return e("playKey.baozi");
                                },
                            },
                            Straight_K3: {
                                items: [r.PlayMenu.Straight_K3],
                                getText: function() {
                                    return e("playKey.straightK3");
                                },
                            },
                            Com_3_K3: {
                                items: [r.PlayMenu.Com_3_K3],
                                getText: function() {
                                    return e("playKey.pair");
                                },
                            },
                            Half_Straight_K3: {
                                items: [r.PlayMenu.Half_Straight_K3],
                                getText: function() {
                                    return e("playKey.halfStraight");
                                },
                            },
                            Different_SH_3_K3: {
                                items: [r.PlayMenu.Different_SH_3_K3],
                                getText: function() {
                                    return e("playKey.za3");
                                },
                            },
                            ALL_EVEN_3_K3: {
                                items: [r.PlayMenu.All_Even_3_K3],
                                getText: function() {
                                    return e("playKey.allThreeEven");
                                },
                            },
                            BOAZI: {
                                items: [r.PlayMenu.Boazi_K3_ENT],
                                getText: function(_) {
                                    return _.split("").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " " : "")
                                            .concat(e, " | ")
                                            .concat(e, " | ")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            ANY_BOAZI: {
                                items: [r.PlayMenu.Any_Boazi_K3_ENT],
                                getText: function() {
                                    return e("playKey.any_Boazi");
                                },
                            },
                            SUM_COM_BS_OE_K3_ENT: {
                                items: [r.PlayMenu.SUM_COM_BS_OE_K3_ENT],
                                getText: function(_) {
                                    var a = _.replace(/[,]/g, "");
                                    return 2 === a.length
                                        ? e("ball.comBSOE.".concat(O.COMBALL_BSOE[a]))
                                        : a
                                              .sort()
                                              .map(function(_) {
                                                  return e("ball.comBSOE.".concat(O.COMBALL_BSOE[_]));
                                              })
                                              .join(" | ");
                                },
                            },
                            Sum_Com_BS_OE_K3: {
                                items: [r.PlayMenu.Sum_Com_BS_OE_K3],
                                getText: function(_) {
                                    var a = _.replace(/[,]/g, "");
                                    return 2 === a.length
                                        ? e("ball.comBSOE.".concat(O.COMBALL_BSOE[a]))
                                        : a
                                              .split("|")
                                              .sort()
                                              .map(function(_) {
                                                  return e("ball.comBSOE.".concat(O.COMBALL_BSOE[_]));
                                              })
                                              .join(" | ");
                                },
                            },
                            Any_Code_Win_K3: {
                                items: [r.PlayMenu.Any_Code_Win_K3],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Any_Code_Not_Win_K3: {
                                items: [r.PlayMenu.Any_Code_Not_Win_K3],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Any_Code_Not_Win_K3_Ent: {
                                items: [r.PlayMenu.Any_Code_Not_Win_K3_Ent],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Different_2_K3_ENT: {
                                items: [r.PlayMenu.Different_2_K3_ENT],
                                getText: function(_) {
                                    return _.split("").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Single_Same_2_K3_ENT: {
                                items: [r.PlayMenu.Single_Same_2_K3_ENT],
                                getText: function(_) {
                                    return _.split("").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " " : "")
                                            .concat(e, " | ")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Red_Black_Num_K3_Ent: {
                                items: [r.PlayMenu.Red_Black_Num_K3_Ent],
                                getText: function(_) {
                                    return (e("playKey.num_combine".concat(_)) || "").split(",")[0];
                                },
                            },
                            Red_Num_Com_K3_Ent: {
                                items: [r.PlayMenu.Red_Num_Com_K3_Ent],
                                getText: function(_) {
                                    return (_ || "").split(",")[0];
                                },
                            },
                            Black_Num_Com_K3_Ent: {
                                items: [r.PlayMenu.Black_Num_Com_K3_Ent],
                                getText: function(_) {
                                    return (_ || "").split(",")[0];
                                },
                            },
                            SPAN_K3: {
                                items: [r.PlayMenu.Span_All_K3, r.PlayMenu.Span_All_K3_Ent],
                                getText: function(_) {
                                    return _.split("-").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                        },
                        h = {
                            Two_Side_Total_Sum_Group: {
                                items: [r.PlayMenu.Two_Side_Total_Sum_Group_11X5_ENT],
                                getText: function(_) {
                                    return e("playKey.".concat(y.Total_Sum_Group[_]));
                                },
                            },
                            Ball_Number_11X5: {
                                items: [
                                    r.PlayMenu.First_11X5_ENT,
                                    r.PlayMenu.Second_11X5_ENT,
                                    r.PlayMenu.Third_11X5_ENT,
                                    r.PlayMenu.Fourth_11X5_ENT,
                                    r.PlayMenu.Fifth_11X5_ENT,
                                    r.PlayMenu.Any1_11X5_ENT,
                                    r.PlayMenu.Any2_11X5_ENT,
                                    r.PlayMenu.Any3_11X5_ENT,
                                    r.PlayMenu.Any4_11X5_ENT,
                                    r.PlayMenu.Any5_11X5_ENT,
                                    r.PlayMenu.Any6_11X5_ENT,
                                    r.PlayMenu.Any7_11X5_ENT,
                                    r.PlayMenu.Any8_11X5_ENT,
                                ],
                                getText: function(_) {
                                    return _.split("-").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Com_11X5: {
                                items: [r.PlayMenu.First2_Com_11X5_ENT, r.PlayMenu.First3_Com_11X5_ENT],
                                getText: function(_) {
                                    return _.split("_").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Straight_11X5: {
                                items: [r.PlayMenu.First2_Straight_11X5_ENT, r.PlayMenu.First3_Straight_11X5_ENT],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ && e ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Dragon_Tiger: {
                                items: [
                                    r.PlayMenu.Dragon_Tiger_5_4_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_5_3_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_5_2_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_5_1_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_4_3_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_4_2_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_4_1_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_3_2_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_3_1_11X5_ENT,
                                    r.PlayMenu.Dragon_Tiger_2_1_11X5_ENT,
                                ],
                                getText: function(_) {
                                    return e("playKey.".concat(y.Dragon_Tiger[_]));
                                },
                            },
                            DanTuo_11X5: {
                                items: [
                                    r.PlayMenu.Any2_Dantuo_11X5,
                                    r.PlayMenu.Any3_Dantuo_11X5,
                                    r.PlayMenu.Any4_Dantuo_11X5,
                                    r.PlayMenu.Any5_Dantuo_11X5,
                                    r.PlayMenu.Any6_Dantuo_11X5,
                                    r.PlayMenu.Any7_Dantuo_11X5,
                                    r.PlayMenu.Any8_Dantuo_11X5,
                                ],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ && e ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                        },
                        f = {
                            Ball_Number: {
                                items: [
                                    r.PlayMenu.FixedPlace,
                                    r.PlayMenu.Last2Straight,
                                    r.PlayMenu.First2Straight,
                                    r.PlayMenu.Last3Straight,
                                    r.PlayMenu.Middle3Straight,
                                    r.PlayMenu.First3Straight,
                                    r.PlayMenu.Last3Join,
                                    r.PlayMenu.Middle3Join,
                                    r.PlayMenu.First3Join,
                                    r.PlayMenu.Last3StraightCom,
                                    r.PlayMenu.Middle3StraightCom,
                                    r.PlayMenu.First3StraightCom,
                                    r.PlayMenu.First3Com3,
                                    r.PlayMenu.Middle3Com3,
                                    r.PlayMenu.Last3Com3,
                                    r.PlayMenu.First3Com6,
                                    r.PlayMenu.Middle3Com6,
                                    r.PlayMenu.Last3Com6,
                                    r.PlayMenu.Last3Com,
                                    r.PlayMenu.Middle3Com,
                                    r.PlayMenu.First3Com,
                                    r.PlayMenu.Last4Straight,
                                    r.PlayMenu.First4Straight,
                                    r.PlayMenu.Last4Join,
                                    r.PlayMenu.First4Join,
                                    r.PlayMenu.L4Com24,
                                    r.PlayMenu.L4Com12,
                                    r.PlayMenu.L4Com6,
                                    r.PlayMenu.L4Com4,
                                    r.PlayMenu.F4Com24,
                                    r.PlayMenu.F4Com12,
                                    r.PlayMenu.F4Com6,
                                    r.PlayMenu.F4Com4,
                                    r.PlayMenu.AllCom120,
                                    r.PlayMenu.AllCom60,
                                    r.PlayMenu.AllCom30,
                                    r.PlayMenu.AllCom20,
                                    r.PlayMenu.AllCom10,
                                    r.PlayMenu.AllCom5,
                                    r.PlayMenu.Last2Join,
                                    r.PlayMenu.First2Join,
                                    r.PlayMenu.Last2Com,
                                    r.PlayMenu.First2Com,
                                    r.PlayMenu.AllStraightAnyCode1_SSC,
                                    r.PlayMenu.AllStraightAnyCode2_SSC,
                                    r.PlayMenu.AllStraightAnyCode3_SSC,
                                    r.PlayMenu.Last4StraightAnyCode1_SSC,
                                    r.PlayMenu.Last4StraightAnyCode2_SSC,
                                    r.PlayMenu.First3StraightAnyCode1,
                                    r.PlayMenu.First3StraightAnyCode2,
                                    r.PlayMenu.Middle3StraightAnyCode1,
                                    r.PlayMenu.Middle3StraightAnyCode2,
                                    r.PlayMenu.Last3StraightAnyCode1,
                                    r.PlayMenu.Last3StraightAnyCode2,
                                    r.PlayMenu.First2StraightAnyCode,
                                    r.PlayMenu.Last2StraightAnyCode,
                                    r.PlayMenu.First3ComAnyCode1,
                                    r.PlayMenu.First3ComAnyCode2,
                                    r.PlayMenu.Middle3ComAnyCode1,
                                    r.PlayMenu.Middle3ComAnyCode2,
                                    r.PlayMenu.Last3ComAnyCode1,
                                    r.PlayMenu.Last3ComAnyCode2,
                                    r.PlayMenu.First2ComAnyCode,
                                    r.PlayMenu.Last2ComAnyCode,
                                    r.PlayMenu.AnyShow1_SSC,
                                    r.PlayMenu.AnyShow2_SSC,
                                    r.PlayMenu.AnyShow3_SSC,
                                    r.PlayMenu.AnyShow4_SSC,
                                    r.PlayMenu.Last1Straight,
                                    r.PlayMenu.FixedPlace_Last_4,
                                    r.PlayMenu.FixedPlace_Last_3,
                                    r.PlayMenu.FixedPlace_Last_2,
                                    r.PlayMenu.FixedPlace_Last_1,
                                    r.PlayMenu.anyComChoose2,
                                    r.PlayMenu.anyComChoose3,
                                    r.PlayMenu.First2_Baodan_SSC,
                                    r.PlayMenu.Last2_Baodan_SSC,
                                    r.PlayMenu.First3C_Baodan_SSC,
                                    r.PlayMenu.Middle3_Baodan_SSC,
                                    r.PlayMenu.Last3_Baodan_SSC,
                                    r.PlayMenu.First2_Span_SSC,
                                    r.PlayMenu.Last2_Span_SSC,
                                    r.PlayMenu.First3C_Span_SSC,
                                    r.PlayMenu.Middle3_Span_SSC,
                                    r.PlayMenu.Last3_Span_SSC,
                                    r.PlayMenu.First4Choose1Any_SSC,
                                    r.PlayMenu.First4Choose2Any_SSC,
                                    r.PlayMenu.Last4Choose1Any_SSC,
                                    r.PlayMenu.Last4Choose2Any_SSC,
                                    r.PlayMenu.First3Choose2Any_SSC,
                                    r.PlayMenu.Mid3Choose2Any_SSC,
                                    r.PlayMenu.Last3Choose2Any_SSC,
                                    1885,
                                    1886,
                                    1887,
                                ],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ && e ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Ball_Number_With_Space: {
                                items: [
                                    r.PlayMenu.Last2Straight_Single,
                                    r.PlayMenu.First2Straight_Single,
                                    r.PlayMenu.Last3Straight_Single,
                                    r.PlayMenu.Middle3Straight_Single,
                                    r.PlayMenu.First3Straight_Single,
                                    r.PlayMenu.Last3Join_Single,
                                    r.PlayMenu.Middle3Join_Single,
                                    r.PlayMenu.First3Join_Single,
                                    r.PlayMenu.Last4Straight_Single,
                                    r.PlayMenu.First4Straight_Single,
                                    r.PlayMenu.Last4Join_Single,
                                    r.PlayMenu.First4Join_Single,
                                    r.PlayMenu.Last2Join_Single,
                                    r.PlayMenu.First2Join_Single,
                                ],
                                getText: function(_) {
                                    return _.split("|").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ && e ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            Special_SSC: {
                                items: [
                                    r.PlayMenu.First3_Special_SSC,
                                    r.PlayMenu.First3_Special_3_SSC,
                                    r.PlayMenu.Middle3_Special_SSC,
                                    r.PlayMenu.Middle3_Special_3_SSC,
                                    r.PlayMenu.Last3_Special_SSC,
                                    r.PlayMenu.Last3_Special_3_SSC,
                                ],
                                getText: function(_) {
                                    return (function(_) {
                                        for (var a = _.split("|"), t = 0; t < a.length; t += 1)
                                            a[t] = e("playKey.".concat(T[a[t]]));
                                        return a.join("|");
                                    })(_);
                                },
                            },
                        },
                        M = {
                            NN_NUMBER: {
                                items: [r.PlayMenu.NN_SSC_ENT],
                                getText: function(_) {
                                    return e("playKey.nn".concat(parseInt(_)));
                                },
                            },
                            NN_HAS: {
                                items: [r.PlayMenu.NN_HAS_SSC_ENT],
                                getText: function(_) {
                                    return e("playKey.nnHas".concat(_));
                                },
                            },
                            NN_BSOE: {
                                items: [r.PlayMenu.NN_SSC_BSOE_ENT],
                                getText: function(_) {
                                    return e("playKey.".concat(d.NNBSOE[_]));
                                },
                            },
                        },
                        b = {
                            HK5: {
                                items: [r.PlayMenu.HK5_SSC_ENT],
                                getText: function(_) {
                                    return e("playKey.".concat(c[_]));
                                },
                            },
                        },
                        D = {
                            Baccarat: {
                                items: [r.PlayMenu.Baccarat_With_Pair_SSC_ENT, r.PlayMenu.Baccarat_No_Pair_SSC_ENT],
                                getText: function(_) {
                                    return e("playKey.".concat(S[_]));
                                },
                            },
                        },
                        B = {
                            Thai: {
                                items: [
                                    r.PlayMenu.LAST_3_STRAIGHT_THAI,
                                    r.PlayMenu.LAST_3_COMBINE_THAI,
                                    r.PlayMenu.LAST_2_STRAIGHT_THAI,
                                    r.PlayMenu.LAST_2_COMBINE_THAI,
                                    r.PlayMenu["2_STRAIGHT_ADD_THAI"],
                                    r.PlayMenu["1_AT_ANY_LAST_3_THAI"],
                                    r.PlayMenu.LAST_4_STRAIGHT_1ST_VNC,
                                    r.PlayMenu.LAST_4_COMBINE_1ST_VNC,
                                    r.PlayMenu.LAST_3_STRAIGHT_1ST_VNC,
                                    r.PlayMenu.LAST_3_COMBINE_1ST_VNC,
                                    r.PlayMenu.LAST_2_STRAIGHT_1ST_VNC,
                                    r.PlayMenu.LAST_2_STRAIGHT_2ND_VNC,
                                    r.PlayMenu.LAST_2_ANY_1ST_VNC,
                                    r.PlayMenu.LAST_2_ANY_2ND_VNC,
                                    r.PlayMenu.LAST_4_STRAIGHT_LAO,
                                    r.PlayMenu.LAST_4_COMBINE_LAO,
                                    r.PlayMenu.LAST_3_STRAIGHT_LAO,
                                    r.PlayMenu.LAST_3_COMBINE_LAO,
                                    r.PlayMenu.LAST_2_STRAIGHT_LAO,
                                    r.PlayMenu.FIRST_2_STRAIGHT_LAO,
                                    r.PlayMenu.LAST_2_ANY_LAO,
                                    r.PlayMenu.FIRST_2_ANY_LAO,
                                    r.PlayMenu.Any_Roll_Last_2_North_VNC,
                                    r.PlayMenu.Any_Roll_Last_2_1K_North_VNC,
                                    r.PlayMenu.Any_Roll_Last_2_1K_South_VNC,
                                    r.PlayMenu.Any_Roll_Last_3_North_VNC,
                                    r.PlayMenu.Any_Roll_Last_4_North_VNC,
                                    r.PlayMenu.Any_Roll_Last_2_South_VNC,
                                    r.PlayMenu.Any_Roll_Last_3_South_VNC,
                                    r.PlayMenu.Any_Roll_Last_4_South_VNC,
                                    r.PlayMenu["4_Not_Winning_Numbers_North_VNC"],
                                    r.PlayMenu["8_Not_Winning_Numbers_North_VNC"],
                                    r.PlayMenu["10_Not_Winning_Numbers_North_VNC"],
                                    r.PlayMenu.Bunch_2_North_VNC,
                                    r.PlayMenu.Bunch_3_North_VNC,
                                    r.PlayMenu.Bunch_4_North_VNC,
                                    r.PlayMenu.Bunch_2_South_VNC,
                                    r.PlayMenu.Bunch_3_South_VNC,
                                    r.PlayMenu.Bunch_4_South_VNC,
                                    r.PlayMenu.Last_2_1st_7th_North_VNC_Single,
                                    r.PlayMenu.Last_2_7th_North_VNC_Single,
                                    r.PlayMenu.Last_2_1st_8th_South_VNC_Single,
                                    r.PlayMenu.Last_2_8th_South_VNC_Single,
                                    r.PlayMenu.Ten_Digit_1st_VNC,
                                    r.PlayMenu.Unit_Digit_1st_VNC,
                                    r.PlayMenu.Ten_Digit_2nd_VNC,
                                    r.PlayMenu.Unit_Digit_2nd_VNC,
                                    r.PlayMenu.Fixed_Place_4D_Unit,
                                    r.PlayMenu.Fixed_Place_4D_Ten,
                                    r.PlayMenu.Fixed_Place_4D_hundred,
                                    r.PlayMenu.Fixed_Place_4D_Thousand,
                                    r.PlayMenu.Fixed_Place_4D_Unit_VNC,
                                    r.PlayMenu.Fixed_Place_4D_Ten_VNC,
                                    r.PlayMenu.Fixed_Place_4D_hundred_VNC,
                                    r.PlayMenu.Fixed_Place_4D_Thousand_VNC,
                                    r.PlayMenu.Prize_2_Straight_THAI,
                                    r.PlayMenu.Special_Prize_2_Straight_THAI,
                                ],
                                getText: function(_) {
                                    return (_ || "").replace(/,/g, "").replace(/\|/g, ",");
                                },
                            },
                            MULTI: {
                                items: [
                                    r.PlayMenu.Last_3_Straight_THAI_Multi,
                                    r.PlayMenu.Last_3_Combine_THAI_Multi,
                                    r.PlayMenu["2_Straight_Add_THAI_Multi"],
                                    r.PlayMenu.Last_2_Combine_THAI_Multi,
                                    r.PlayMenu.Last_2_Straight_THAI_Multi,
                                    r.PlayMenu.Any_Roll_Last_2_North_VNC_Multi,
                                    r.PlayMenu.Any_Roll_Last_3_North_VNC_Multi,
                                    r.PlayMenu.Any_Roll_Last_4_North_VNC_Multi,
                                    r.PlayMenu.Any_Roll_Last_2_South_VNC_Multi,
                                    r.PlayMenu.Any_Roll_Last_3_South_VNC_Multi,
                                    r.PlayMenu.Any_Roll_Last_4_South_VNC_Multi,
                                    r.PlayMenu.Last_4_Straight_1st_VNC_Multi,
                                    r.PlayMenu.Last_3_Straight_1st_VNC_Multi,
                                    r.PlayMenu.Last_3_Straight_1st_VNC_Single,
                                    r.PlayMenu.Last_2_Straight_1st_VNC_Multi,
                                    r.PlayMenu.Last_2_Straight_2nd_VNC_Multi,
                                    r.PlayMenu.First_2_Straight_LAO_Multi,
                                    r.PlayMenu.Last_3_Combine_LAO_Multi,
                                    r.PlayMenu.Last_3_Straight_LAO_Multi,
                                    r.PlayMenu.Last_4_Straight_LAO_Multi,
                                ],
                                getText: function() {
                                    var _ = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                                    return _.split(",")
                                        .filter(function(_) {
                                            return "" !== _;
                                        })
                                        .join(",");
                                },
                            },
                            FISH_PRAWN_CRAB: {
                                items: [
                                    r.PlayMenu.Hoo_Hey_How_Play_THAI,
                                    r.PlayMenu.Hoo_Hey_How_Play_VNC,
                                    r.PlayMenu.Hoo_Hey_How_Play_LAO,
                                ],
                                getText: function(_) {
                                    return e("ball.fishPrawnCrab.".concat(m[_]));
                                },
                            },
                            FAN: {
                                items: [
                                    r.PlayMenu.Fan_Tan_Fan_THAI,
                                    r.PlayMenu.Fan_Tan_Fan_VNC,
                                    r.PlayMenu.Fan_Tan_Fan_LAO,
                                ],
                                getText: function(_) {
                                    return e("ball.fanTanFan.".concat(_.replace("0", "4")));
                                },
                            },
                            JIAO: {
                                items: [
                                    r.PlayMenu.Fan_Tan_Jiao_THAI,
                                    r.PlayMenu.Fan_Tan_Jiao_VNC,
                                    r.PlayMenu.Fan_Tan_Jiao_LAO,
                                ],
                                getText: function(_) {
                                    return e(
                                        "ball.fanTanJiao.".concat(
                                            _.replace("0", "4")
                                                .split("")
                                                .join("_")
                                        )
                                    );
                                },
                            },
                            NIAN: {
                                items: [
                                    r.PlayMenu.Fan_Tan_Nian_THAI,
                                    r.PlayMenu.Fan_Tan_Nian_VNC,
                                    r.PlayMenu.Fan_Tan_Nian_LAO,
                                ],
                                getText: function(_) {
                                    return e(
                                        "ball.fanTanNian.".concat(
                                            _.replace("0", "4")
                                                .split("")
                                                .join("_")
                                        )
                                    );
                                },
                            },
                            SICBO_ALL_SURROUND: {
                                items: [r.PlayMenu.All_Surround_Dice_Main_VK3],
                                getText: function(_) {
                                    return e("ball.sicBoAllSurroundDice.".concat(_));
                                },
                            },
                            SICBO_OTHER: {
                                items: [
                                    r.PlayMenu.Single_Dice_Main_VK3,
                                    r.PlayMenu.Dice_Sum_Main_VK3,
                                    r.PlayMenu.Surround_Dice_Main_VK3,
                                ],
                                getText: function(_) {
                                    return _;
                                },
                            },
                        },
                        I = {
                            NUMBER_LF: {
                                items: [
                                    r.PlayMenu.Hundreds_Fixed_Place_LF,
                                    r.PlayMenu.Hundreds_BSOE_LF,
                                    r.PlayMenu.Hundreds_Prime_And_Composite_LF,
                                    r.PlayMenu.Tens_Fixed_Place_LF,
                                    r.PlayMenu.Tens_BSOE_LF,
                                    r.PlayMenu.Tens_Prime_And_Composite_LF,
                                    r.PlayMenu.Units_Fixed_Place_LF,
                                    r.PlayMenu.Units_BSOE_LF,
                                    r.PlayMenu.Units_Prime_And_Composite_LF,
                                    r.PlayMenu.Hundreds_Tens_Fixed_Place_LF,
                                    r.PlayMenu.Hundreds_Units_Fixed_Place_LF,
                                    r.PlayMenu.Tens_Units_Fixed_Place_LF,
                                    r.PlayMenu.Hundreds_Tens_Units_Fixed_Place_LF,
                                    r.PlayMenu.Two_Word_Combine_LF,
                                    r.PlayMenu.Three_Word_Com_LF,
                                    r.PlayMenu.Hundreds_Tens_Sum_LF,
                                    r.PlayMenu.Hundreds_Tens_Sum_Last_LF,
                                    r.PlayMenu.Hundreds_Units_Sum_LF,
                                    r.PlayMenu.Hundreds_Units_Sum_Last_LF,
                                    r.PlayMenu.Tens_Units_Sum_LF,
                                    r.PlayMenu.Tens_Units_Sum_Last_LF,
                                    r.PlayMenu.Hundreds_Tens_Units_Sum_LF,
                                    r.PlayMenu.Hundreds_Tens_Units_Sum_Tail_LF,
                                    r.PlayMenu.One_Word_Combine_LF,
                                    r.PlayMenu.Hundreds_Tens_Units_Com3_LF,
                                    r.PlayMenu.Hundreds_Tens_Units_Com6_LF,
                                    r.PlayMenu.Hundreds_Tens_Units_Span_LF,
                                    r.PlayMenu.Hundreds_Tens_Span_LF,
                                    r.PlayMenu.Hundreds_Units_Span_LF,
                                    r.PlayMenu.Tens_Units_Span_LF,
                                    r.PlayMenu.Choose1_Fixed_Place_4D,
                                    r.PlayMenu.Choose2_Any_Code_4D,
                                    r.PlayMenu.Choose3_Any_Code_4D,
                                ],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ ? " " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            ANY_NUMBER_LF: {
                                items: [
                                    r.PlayMenu.Any2_Straight_4D,
                                    r.PlayMenu.Any3_Straight_4D,
                                    r.PlayMenu.Any4_Straight_4D,
                                ],
                                getText: function(_) {
                                    return _.split(",").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ && e ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                            SINGLE_LF: {
                                items: [
                                    r.PlayMenu.Any2_Straight_Single_4D,
                                    r.PlayMenu.Any3_Straight_Single_4D,
                                    r.PlayMenu.Any4_Straight_Single_4D,
                                ],
                                getText: function(_) {
                                    return _.split("|").reduce(function(_, e) {
                                        return ""
                                            .concat(_)
                                            .concat(_ && e ? " | " : "")
                                            .concat(e);
                                    }, "");
                                },
                            },
                        },
                        v = {
                            KENO_FUN: {
                                items: [
                                    r.PlayMenu.Total_Sum_BST_KENO,
                                    r.PlayMenu.Total_Sum_OE_KENO,
                                    r.PlayMenu.Total_Sum_PASS_KENO,
                                    r.PlayMenu.UpDown_KENO,
                                    r.PlayMenu.OddEven_KENO,
                                    r.PlayMenu.WuXing_KENO,
                                ],
                                getText: function(_) {
                                    return e("ball.kenoFunBall.".concat(u.FUN[_]));
                                },
                            },
                            KENO_ANY: {
                                items: [
                                    r.PlayMenu.Any1_KENO,
                                    r.PlayMenu.Any2_KENO,
                                    r.PlayMenu.Any3_KENO,
                                    r.PlayMenu.Any4_KENO,
                                    r.PlayMenu.Any5_KENO,
                                    r.PlayMenu.Any6_KENO,
                                    r.PlayMenu.Any7_KENO,
                                ],
                                getText: function(_) {
                                    return _;
                                },
                            },
                        };
                    return s(
                        s(
                            s(
                                s(
                                    s(
                                        s(
                                            s(
                                                s(
                                                    s(
                                                        s(
                                                            s(
                                                                s(
                                                                    s(
                                                                        {
                                                                            BSOE: {
                                                                                items: [
                                                                                    r.PlayMenu.First2BSOE_LF,
                                                                                    r.PlayMenu.Last2BSOE_LF_FC3D,
                                                                                    r.PlayMenu.P5First2BSOE_LF,
                                                                                    r.PlayMenu.P3Last2BSOE_LF,
                                                                                    r.PlayMenu.Last2BSOE_LF_P3P5,
                                                                                    r.PlayMenu.First5BSOE_PK10,
                                                                                    r.PlayMenu.Last5BSOE_PK10,
                                                                                    r.PlayMenu.First2SumBSOE_PK10,
                                                                                    r.PlayMenu.Combine_First_BSOE_ENT,
                                                                                    r.PlayMenu.Combine_Second_BSOE_ENT,
                                                                                    r.PlayMenu.Combine_Third_BSOE_ENT,
                                                                                    r.PlayMenu.Combine_Fourth_BSOE_ENT,
                                                                                    r.PlayMenu.Combine_Fifth_BSOE_ENT,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_First2SumBSOE_PK10,
                                                                                    r.PlayMenu.Two_Side_FirstPlace_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_SecondPlace_PK10,
                                                                                    r.PlayMenu.Two_Side_ThirdPlace_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_FourthPlace_PK10,
                                                                                    r.PlayMenu.Two_Side_FifthPlace_PK10,
                                                                                    r.PlayMenu.Two_Side_SixthPlace_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_SeventhPlace_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_EighthPlace_PK10,
                                                                                    r.PlayMenu.Two_Side_NinthPlace_PK10,
                                                                                    r.PlayMenu.Two_Side_TenthPlace_PK10,
                                                                                    r.PlayMenu.First5BSOE_PK10,
                                                                                    r.PlayMenu.Last5BSOE_PK10,
                                                                                    r.PlayMenu.First2SumBSOE_PK10,
                                                                                    r.PlayMenu.Fan_Tan_BSOE_PK10,
                                                                                    r.PlayMenu.SpecialBSOE_PCB,
                                                                                    r.PlayMenu.BOSE_WITH_TIE_PCB,
                                                                                    r.PlayMenu.BOSE_ONLY_TIE_PCB,
                                                                                    r.PlayMenu.BOSE_ALL_KILL_PCB,
                                                                                    r.PlayMenu.Sum_BS_OE_K3,
                                                                                    r.PlayMenu.Sum_BS_OE_K3_ENT,
                                                                                    r.PlayMenu
                                                                                        .Sum_BS_OE_Baozi_Kill_K3_ENT,
                                                                                    r.PlayMenu.Red_Num_BSOE_K3_ENT,
                                                                                    r.PlayMenu.Black_Num_BSOE_K3_ENT,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_First_BSOE_11X5_ENT,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_Second_BSOE_11X5_ENT,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_Third_BSOE_11X5_ENT,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_Fourth_BSOE_11X5_ENT,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_Fifth_BSOE_11X5_ENT,
                                                                                    r.PlayMenu.Hundreds_BSOE_LF,
                                                                                    r.PlayMenu.Tens_BSOE_LF,
                                                                                    r.PlayMenu.Units_BSOE_LF,
                                                                                    r.PlayMenu.Fan_Tan_BSOE_THAI,
                                                                                    r.PlayMenu.Fan_Tan_BSOE_VNC,
                                                                                    r.PlayMenu.Fan_Tan_BSOE_LAO,
                                                                                    r.PlayMenu.Dice_BSOE_Main_VK3,
                                                                                    r.PlayMenu
                                                                                        .First_Second_Sum_BSOE_VPK10,
                                                                                    r.PlayMenu.Dice_BS_Main_VTX,
                                                                                    r.PlayMenu.XocDia_BS_Main_VXD,
                                                                                    r.PlayMenu.XocDia_OD_Main_VXD,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return _.split("_").reduce(function(
                                                                                        _,
                                                                                        t
                                                                                    ) {
                                                                                        return ""
                                                                                            .concat(_)
                                                                                            .concat(_ ? " | " : "")
                                                                                            .concat(
                                                                                                e(
                                                                                                    "ball.BSOE.".concat(
                                                                                                        a[parseInt(t)]
                                                                                                    )
                                                                                                )
                                                                                            );
                                                                                    },
                                                                                    "");
                                                                                },
                                                                            },
                                                                            COM_BSOE: {
                                                                                items: [
                                                                                    r.PlayMenu.First2BSOE,
                                                                                    r.PlayMenu.Last2BSOE,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return _.split(",").reduce(function(
                                                                                        _,
                                                                                        t
                                                                                    ) {
                                                                                        var n;
                                                                                        return ""
                                                                                            .concat(_)
                                                                                            .concat(_ && t ? " | " : "")
                                                                                            .concat(
                                                                                                "" === (n = t)
                                                                                                    ? ""
                                                                                                    : n
                                                                                                          .split("")
                                                                                                          .sort()
                                                                                                          .map(function(
                                                                                                              _
                                                                                                          ) {
                                                                                                              return e(
                                                                                                                  "ball.BSOE.".concat(
                                                                                                                      a[
                                                                                                                          _
                                                                                                                      ]
                                                                                                                  )
                                                                                                              );
                                                                                                          })
                                                                                                          .join(" ")
                                                                                            );
                                                                                    },
                                                                                    "");
                                                                                },
                                                                            },
                                                                            PRIME_COMPOSITE: {
                                                                                items: [
                                                                                    r.PlayMenu
                                                                                        .Hundreds_Prime_And_Composite_LF,
                                                                                    r.PlayMenu
                                                                                        .Tens_Prime_And_Composite_LF,
                                                                                    r.PlayMenu
                                                                                        .Units_Prime_And_Composite_LF,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return _.split("_").reduce(function(
                                                                                        _,
                                                                                        a
                                                                                    ) {
                                                                                        return ""
                                                                                            .concat(_)
                                                                                            .concat(_ ? " | " : "")
                                                                                            .concat(
                                                                                                e(
                                                                                                    "ball.PC.".concat(
                                                                                                        t[parseInt(a)]
                                                                                                    )
                                                                                                )
                                                                                            );
                                                                                    },
                                                                                    "");
                                                                                },
                                                                            },
                                                                            DRAGON_TIGER: {
                                                                                items: [
                                                                                    r.PlayMenu.Dragon_Tiger_1_VS_10,
                                                                                    r.PlayMenu.Dragon_Tiger_2_VS_9,
                                                                                    r.PlayMenu.Dragon_Tiger_3_VS_8,
                                                                                    r.PlayMenu.Dragon_Tiger_4_VS_7,
                                                                                    r.PlayMenu.Dragon_Tiger_5_VS_6,
                                                                                    r.PlayMenu.Dragon_Tiger_1_VS_10,
                                                                                    r.PlayMenu.Dragon_Tiger_2_VS_9,
                                                                                    r.PlayMenu.Dragon_Tiger_3_VS_8,
                                                                                    r.PlayMenu.Dragon_Tiger_4_VS_7,
                                                                                    r.PlayMenu.Dragon_Tiger_5_VS_6,
                                                                                    r.PlayMenu
                                                                                        .Dragon_Tiger_1_VS_10_PK10,
                                                                                    r.PlayMenu.Dragon_Tiger_2_VS_9_PK10,
                                                                                    r.PlayMenu.Dragon_Tiger_3_VS_8_PK10,
                                                                                    r.PlayMenu.Dragon_Tiger_4_VS_7_PK10,
                                                                                    r.PlayMenu.Dragon_Tiger_5_VS_6_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_FirstPlace_Dragon_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_SecondPlace_Dragon_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_ThirdPlace_Dragon_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_FourthPlace_Dragon_PK10,
                                                                                    r.PlayMenu
                                                                                        .Two_Side_FifthPlace_Dragon_PK10,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return e(
                                                                                        "ball.dragonTiger.".concat(
                                                                                            "1" === _
                                                                                                ? "dragon"
                                                                                                : "tiger"
                                                                                        )
                                                                                    );
                                                                                },
                                                                            },
                                                                            DRAGON_TIGER_TIE_ENT: {
                                                                                items: [
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_5_4_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_5_3_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_5_2_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_5_1_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_4_3_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_4_2_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_4_1_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_3_2_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_3_1_ENT,
                                                                                    r.PlayMenu.Dragon_Tiger_Tie_2_1_ENT,
                                                                                    r.PlayMenu
                                                                                        .Combine_Dragon_Tiger_Tie_ENT,
                                                                                    r.PlayMenu
                                                                                        .Dragon_Tiger_1_VS_2_K3_Ent,
                                                                                    r.PlayMenu
                                                                                        .Dragon_Tiger_1_VS_3_K3_Ent,
                                                                                    r.PlayMenu
                                                                                        .Dragon_Tiger_2_VS_3_K3_Ent,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return p(_);
                                                                                },
                                                                            },
                                                                            DRAGON_TIGER_TIE: {
                                                                                items: [
                                                                                    r.PlayMenu.Dragon_Tiger_10T_T_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_10T_H_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_10T_10_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_10T_1_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_T_H_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_T_10_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_T_1_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_H_10_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_H_1_SSC,
                                                                                    r.PlayMenu.Dragon_Tiger_10_1_SSC,
                                                                                    r.PlayMenu
                                                                                        .New_Dragon_Tiger_10T_T_SSC,
                                                                                    r.PlayMenu
                                                                                        .New_Dragon_Tiger_10T_H_SSC,
                                                                                    r.PlayMenu
                                                                                        .New_Dragon_Tiger_10T_10_SSC,
                                                                                    r.PlayMenu
                                                                                        .New_Dragon_Tiger_10T_1_SSC,
                                                                                    r.PlayMenu.New_Dragon_Tiger_T_H_SSC,
                                                                                    r.PlayMenu.New_Dragon_Tiger_T_1_SSC,
                                                                                    r.PlayMenu
                                                                                        .New_Dragon_Tiger_H_10_SSC,
                                                                                    r.PlayMenu.New_Dragon_Tiger_H_1_SSC,
                                                                                    r.PlayMenu
                                                                                        .New_Dragon_Tiger_10_1_SSC,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return _.split("|").reduce(function(
                                                                                        _,
                                                                                        e
                                                                                    ) {
                                                                                        return ""
                                                                                            .concat(_)
                                                                                            .concat(_ && e ? " | " : "")
                                                                                            .concat(p(e));
                                                                                    },
                                                                                    "");
                                                                                },
                                                                            },
                                                                            OE_COUNTS: {
                                                                                items: [r.PlayMenu.OECounts_11X5],
                                                                                getText: function(_) {
                                                                                    return e(
                                                                                        "ball.OECounts.".concat(_)
                                                                                    );
                                                                                },
                                                                            },
                                                                            GROUP_ENT: {
                                                                                items: [
                                                                                    r.PlayMenu.Combine_First3_ENT,
                                                                                    r.PlayMenu.Combine_Middle3_ENT,
                                                                                    r.PlayMenu.Combine_Last3_ENT,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return e(
                                                                                        "ball.GroupENT.".concat(_)
                                                                                    );
                                                                                },
                                                                            },
                                                                            ANY_COM_SSC: {
                                                                                items: [
                                                                                    r.PlayMenu.Any4Com24_SSC,
                                                                                    r.PlayMenu.Any4Com12_SSC,
                                                                                    r.PlayMenu.Any4Com6_SSC,
                                                                                    r.PlayMenu.Any4Com4_SSC,
                                                                                    r.PlayMenu.Any3Com3_SSC,
                                                                                    r.PlayMenu.Any3Com6_SSC,
                                                                                    r.PlayMenu.Any2Com_SSC,
                                                                                ],
                                                                                getText: function(_, e) {
                                                                                    var a = P(e);
                                                                                    return "("
                                                                                        .concat(a.digitPosText, ") ")
                                                                                        .concat(
                                                                                            a.ballTextArray.join(" | ")
                                                                                        );
                                                                                },
                                                                            },
                                                                            ANY_COM_SSC_Single: {
                                                                                items: [
                                                                                    r.PlayMenu.Any3Com_SSC,
                                                                                    r.PlayMenu.Any2Com_SSC_Single,
                                                                                ],
                                                                                getText: function(_, e) {
                                                                                    var a = P(e);
                                                                                    return "("
                                                                                        .concat(a.digitPosText, ") ")
                                                                                        .concat(
                                                                                            a.ballTextArray
                                                                                                .join()
                                                                                                .replace(/\|/g, "  ")
                                                                                                .replace(/,/g, "")
                                                                                        );
                                                                                },
                                                                            },
                                                                            SUM_BALL_NUMBER: {
                                                                                items: [
                                                                                    r.PlayMenu.First3Sum,
                                                                                    r.PlayMenu.Middle3Sum,
                                                                                    r.PlayMenu.Last3Sum,
                                                                                    r.PlayMenu.First2Sum,
                                                                                    r.PlayMenu.Last2Sum,
                                                                                    r.PlayMenu.Last3Sum_LF,
                                                                                    r.PlayMenu.Last3ComSum_LF,
                                                                                    r.PlayMenu.P3Sum_LF,
                                                                                    r.PlayMenu.P3ComSum_LF,
                                                                                    r.PlayMenu.Sum_K3,
                                                                                    1464,
                                                                                    1465,
                                                                                    1466,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return _.split("|").reduce(function(
                                                                                        _,
                                                                                        e
                                                                                    ) {
                                                                                        return ""
                                                                                            .concat(_)
                                                                                            .concat(_ && e ? " | " : "")
                                                                                            .concat(e);
                                                                                    },
                                                                                    "");
                                                                                },
                                                                            },
                                                                            ANY_SUM_BALL_NUMBER: {
                                                                                items: [
                                                                                    r.PlayMenu.Any2Sum_SSC,
                                                                                    r.PlayMenu.Any3Sum_SSC,
                                                                                ],
                                                                                getText: function(_, e) {
                                                                                    var a = P(e),
                                                                                        t = a.digitPosText,
                                                                                        n = a.ballTextArray
                                                                                            .join("")
                                                                                            .replace(/\|/g, " | ");
                                                                                    return "("
                                                                                        .concat(t, ") ")
                                                                                        .concat(n);
                                                                                },
                                                                            },
                                                                            SUM_BSOE: {
                                                                                items: [r.PlayMenu.Sum_BSOE_SSC],
                                                                                getText: function(_) {
                                                                                    return 1 === _.length
                                                                                        ? e("ball.sumBSOE.".concat(_))
                                                                                        : _.split("|")
                                                                                              .sort()
                                                                                              .map(function(_) {
                                                                                                  return e(
                                                                                                      "ball.sumBSOE.".concat(
                                                                                                          _
                                                                                                      )
                                                                                                  );
                                                                                              })
                                                                                              .join(" | ");
                                                                                },
                                                                            },
                                                                            SUM_BS_OE: {
                                                                                items: [r.PlayMenu.Sum_BS_OE_SSC],
                                                                                getText: function(_) {
                                                                                    return 2 === _.length
                                                                                        ? e(
                                                                                              "ball.sumBSOE.".concat(
                                                                                                  _.split("").join("_")
                                                                                              )
                                                                                          )
                                                                                        : _.split("|")
                                                                                              .sort()
                                                                                              .map(function(_) {
                                                                                                  return e(
                                                                                                      "ball.sumBSOE.".concat(
                                                                                                          _.split(
                                                                                                              ""
                                                                                                          ).join("_")
                                                                                                      )
                                                                                                  );
                                                                                              })
                                                                                              .join(" | ");
                                                                                },
                                                                            },
                                                                            VN_PK10_DRAGON_TIGER: {
                                                                                items: [
                                                                                    r.PlayMenu.Dragon_Tiger_Main_PK10,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    var a = _.split(","),
                                                                                        t = a[0].split("-");
                                                                                    return ""
                                                                                        .concat(
                                                                                            e(
                                                                                                "pk10Ranking.".concat(
                                                                                                    t[0]
                                                                                                )
                                                                                            ),
                                                                                            " VS "
                                                                                        )
                                                                                        .concat(
                                                                                            e(
                                                                                                "pk10Ranking.".concat(
                                                                                                    t[1]
                                                                                                )
                                                                                            ),
                                                                                            " @ "
                                                                                        )
                                                                                        .concat(t[a[1]]);
                                                                                },
                                                                            },
                                                                            VN_PK10_FIRST_TO_TENTH_GUESS_RANK: {
                                                                                items: [
                                                                                    r.PlayMenu
                                                                                        .First_To_Tenth_Guess_Rank_VPK10,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    var a = _.split(",");
                                                                                    return ""
                                                                                        .concat(
                                                                                            e(
                                                                                                "pk10Ranking.".concat(
                                                                                                    a[0]
                                                                                                )
                                                                                            ),
                                                                                            " @ "
                                                                                        )
                                                                                        .concat(a[1]);
                                                                                },
                                                                            },
                                                                            VN_PK10_FIRST_TO_BSOE: {
                                                                                items: [
                                                                                    r.PlayMenu
                                                                                        .First_To_Tenth_BSOE_VPK10,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    var a = _.split(","),
                                                                                        t = {
                                                                                            0: "ball.PK10_BSOE.big",
                                                                                            1: "ball.PK10_BSOE.small",
                                                                                            2: "ball.PK10_BSOE.odd",
                                                                                            3: "ball.PK10_BSOE.even",
                                                                                        }[a[1]];
                                                                                    return ""
                                                                                        .concat(
                                                                                            e(
                                                                                                "pk10Ranking.".concat(
                                                                                                    a[0]
                                                                                                )
                                                                                            ),
                                                                                            " @ "
                                                                                        )
                                                                                        .concat(e(t));
                                                                                },
                                                                            },
                                                                            VN_PK10_SUM: {
                                                                                items: [
                                                                                    r.PlayMenu
                                                                                        .First_Second_Sum_Main_VPK10,
                                                                                ],
                                                                                getText: function(_) {
                                                                                    return _;
                                                                                },
                                                                            },
                                                                            STRAIGHT_LF: {
                                                                                items: [
                                                                                    r.PlayMenu.Last3Straight_LF,
                                                                                    r.PlayMenu.First2Straight_LF,
                                                                                    r.PlayMenu.Last2Straight_LF,
                                                                                    r.PlayMenu.Last3StraightAnyCode1_LF,
                                                                                    r.PlayMenu.Last3StraightAnyCode2_LF,
                                                                                    r.PlayMenu.P3Straight_LF,
                                                                                    r.PlayMenu.P3StraightAnyCode1_LF,
                                                                                    r.PlayMenu.P3StraightAnyCode2_LF,
                                                                                    r.PlayMenu.P5First2Straight_LF,
                                                                                    r.PlayMenu.P3Last2Straight_LF,
                                                                                    r.PlayMenu.P5Last2Straight_LF,
                                                                                ],
                                                                                getText: function(_, e) {
                                                                                    return e
                                                                                        .replace(/\|/g, " ")
                                                                                        .split(",")
                                                                                        .filter(function(_) {
                                                                                            return 0 === _ || _;
                                                                                        })
                                                                                        .join(" | ");
                                                                                },
                                                                            },
                                                                            STRAIGHT_LF_SINGLE: {
                                                                                items: [
                                                                                    r.PlayMenu.Last3Straight_LF_Single,
                                                                                    r.PlayMenu.First2Straight_LF_Single,
                                                                                    r.PlayMenu.Last2Straight_LF_Single,
                                                                                    r.PlayMenu.P3Straight_LF_Single,
                                                                                    r.PlayMenu
                                                                                        .P5First2Straight_LF_Single,
                                                                                    r.PlayMenu
                                                                                        .P3Last2Straight_LF_Single,
                                                                                    r.PlayMenu
                                                                                        .P5Last2Straight_LF_Single,
                                                                                ],
                                                                                getText: function(_, e) {
                                                                                    return e
                                                                                        .split("|")
                                                                                        .map(function(_) {
                                                                                            return _.split(",")
                                                                                                .filter(function(_) {
                                                                                                    return 0 === _ || _;
                                                                                                })
                                                                                                .join(" | ");
                                                                                        })
                                                                                        .join("; ");
                                                                                },
                                                                            },
                                                                            NON_STRAIGHT_LF: {
                                                                                items: [
                                                                                    r.PlayMenu.Last3Com3_LF,
                                                                                    r.PlayMenu.Last3Com6_LF,
                                                                                    r.PlayMenu.Last3Com_LF,
                                                                                    r.PlayMenu.First2Com_LF,
                                                                                    r.PlayMenu.Last2Com_LF_3D,
                                                                                    r.PlayMenu.FixedPlace_LF,
                                                                                    r.PlayMenu.P3Com3_LF,
                                                                                    r.PlayMenu.P3Com6_LF,
                                                                                    r.PlayMenu.P5First2Com_LF,
                                                                                    r.PlayMenu.P3Last2Com_LF,
                                                                                    r.PlayMenu.Last2Com_LF_P3P5,
                                                                                    r.PlayMenu.Last2BSOE_LF,
                                                                                    r.PlayMenu.FixedPlace_LF_P3P5,
                                                                                ],
                                                                                getText: function(_, e) {
                                                                                    return e
                                                                                        .replace(/,/g, "")
                                                                                        .replace(/\|/g, " | ");
                                                                                },
                                                                            },
                                                                            play_type_SINGLE: {
                                                                                items: [
                                                                                    r.PlayMenu.First2_PK10_Single,
                                                                                    r.PlayMenu.First3_PK10_Single,
                                                                                    r.PlayMenu.First4_PK10_Single,
                                                                                    r.PlayMenu.First5_PK10_Single,
                                                                                    r.PlayMenu.Any2_11X5_Single,
                                                                                    r.PlayMenu.Any3_11X5_Single,
                                                                                    r.PlayMenu.Any4_11X5_Single,
                                                                                    r.PlayMenu.Any5_11X5_Single,
                                                                                    r.PlayMenu.Any6_11X5_Single,
                                                                                    r.PlayMenu.Any7_11X5_Single,
                                                                                    r.PlayMenu.Any8_11X5_Single,
                                                                                    r.PlayMenu
                                                                                        .First3Straight_11X5_Single,
                                                                                    r.PlayMenu.First3Com_11X5_Single,
                                                                                    r.PlayMenu
                                                                                        .First2Straight_11X5_Single,
                                                                                    r.PlayMenu.First2Com_11X5_Single,
                                                                                    r.PlayMenu.All5Straight_Single,
                                                                                    r.PlayMenu.All5All_Single,
                                                                                    r.PlayMenu.All5Join_Single,
                                                                                    r.PlayMenu.Any2_Single,
                                                                                    r.PlayMenu.Any3_Single,
                                                                                    r.PlayMenu.Any4_Single,
                                                                                ],
                                                                                getText: function(_, e) {
                                                                                    return e
                                                                                        .split("|")
                                                                                        .map(function(_) {
                                                                                            return _.split(",")
                                                                                                .filter(function(_) {
                                                                                                    return 0 === _ || _;
                                                                                                })
                                                                                                .join(" | ");
                                                                                        })
                                                                                        .join("; ");
                                                                                },
                                                                            },
                                                                        },
                                                                        A
                                                                    ),
                                                                    R
                                                                ),
                                                                g
                                                            ),
                                                            L
                                                        ),
                                                        C
                                                    ),
                                                    h
                                                ),
                                                f
                                            ),
                                            M
                                        ),
                                        b
                                    ),
                                    D
                                ),
                                B
                            ),
                            I
                        ),
                        v
                    );
                }
                var T = {
                    getText: function(_, e, a) {
                        if (!_ || !e) return "";
                        var n = c(a),
                            i = (0, t.default)(n, function(e) {
                                return e.items.indexOf(_) > -1;
                            }),
                            r = (0, t.default)(S, function(e) {
                                return e.indexOf(_) > -1;
                            });
                        return i ? (r ? i.getText(e) : i.getText(e.replace(/,/g, ""), e)) : e;
                    },
                };
                e.default = T;
            },
            814: function(_, e, a) {
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.lang = e.i18nWithLang = e.i18n = e.default = void 0);
                var t = E(a(8395)),
                    n = E(a(7025)),
                    i = E(a(8249)),
                    r = E(a(9746)),
                    o = E(a(1460)),
                    l = E(a(35)),
                    u = E(a(5266)),
                    s = E(a(4488)),
                    d = E(a(6675)),
                    S = E(a(7931)),
                    c = E(a(6567)),
                    T = E(a(5306));
                function E(_) {
                    return _ && _.__esModule ? _ : { default: _ };
                }
                var y = {
                    ZH_CN: i.default,
                    TH: r.default,
                    VI: o.default,
                    KM: l.default,
                    EN: u.default,
                    JA: s.default,
                    ID: d.default,
                    KO: S.default,
                    TW: c.default,
                    PT: T.default,
                };
                e.lang = y;
                var O = function(_) {
                        var e = y[_];
                        if (_ && e) return e;
                        if (!window || "undefined" == typeof window) return y.ZH_CN;
                        var a = window.location.pathname;
                        if (-1 !== a.indexOf("/lotto/") || -1 !== a.indexOf("/lotto-h5/")) return y.ZH_CN;
                        var t = window.localStorage.lang;
                        return t
                            ? y[t]
                                ? y[t]
                                : ((t = t.toUpperCase().replace("-", "_")), y[t] ? y[t] : y.ZH_CN)
                            : y.ZH_CN;
                    },
                    m = function(_, e) {
                        for (var a = arguments.length, i = new Array(a > 2 ? a - 2 : 0), r = 2; r < a; r++)
                            i[r - 2] = arguments[r];
                        var o = O(_),
                            l = (0, t.default)(e)(o);
                        if (!l) return e;
                        if (i.length > 0) {
                            var u = 0;
                            return (0, n.default)(l, /%@([0-9]+)?/g, function(_, e) {
                                var a = e ? parseInt(e) - 1 : u;
                                u += 1;
                                var t = i[a];
                                return null === t ? "(null)" : void 0 === t ? "" : t;
                            });
                        }
                        return l;
                    },
                    N = function(_) {
                        for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), t = 1; t < e; t++)
                            a[t - 1] = arguments[t];
                        return m.apply(void 0, [void 0, _].concat(a));
                    };
                e.i18n = N;
                var p = m;
                e.i18nWithLang = p;
                e.default = {};
            },
            5306: function(_, e, a) {
                var t;
                function n(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function i(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? n(Object(a), !0).forEach(function(e) {
                                  r(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : n(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function r(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var o = i(
                    i({}, ((t = a(2321)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        betDigit: {
                            THOUSANDS: "Milhares",
                            HUNDREDS: "Centenas",
                            TENS: "Dezenas",
                            ONES: "uns",
                            COM: "Grupo",
                        },
                        pk10Ranking: {
                            1: "1º",
                            2: "2º",
                            3: "3º",
                            4: "4º",
                            5: "5º",
                            6: "6º",
                            7: "7º",
                            8: "8º",
                            9: "9º",
                            10: "10º",
                        },
                        ball: {
                            BSOE: { big: "Grande", small: "Pequeno", odd: "Ímpar", even: "Mesmo" },
                            K3_BSOE: { big: "Grande", small: "Pequeno", odd: "Ímpar", even: "Mesmo" },
                            PK10_BSOE: { big: "Grande", small: "Pequeno", odd: "Ímpar", even: "Mesmo" },
                            VNC_PK10_DragonTiger: { dragon: "Dragão", tiger: "Tigre" },
                            fishPrawnCrab: { fish: " Peixe", prawn: "Camarão", crab: "Caranguejo" },
                            fanTanFan: { 1: "1Ventilador", 2: "2Ventilador", 3: "3Ventilador", 4: "4Ventilador" },
                            fanTanJiao: { "1_2": "1-2 Kwok", "1_4": "1-4 Kwok", "2_3": "2-3 Kwok", "3_4": "3-4 Kwok" },
                            fanTanNian: {
                                "1_2": "1 Nim 2",
                                "1_3": "1 Nim 3",
                                "1_4": "1 Nim 4",
                                "2_1": "2 Nim 1",
                                "2_3": "2 Nim 3",
                                "2_4": "2 Nim 4",
                                "3_1": "3 Nim 1",
                                "3_2": "3 Nim 2",
                                "3_4": "3 Nim 4",
                                "4_1": "4 Nim 1",
                                "4_2": "4 Nim 2",
                                "4_3": "4 Nim 3",
                            },
                            sicBoAllSurroundDice: { 1: "Qualquer triplo" },
                            sicBoDiceOdds: { 1: "UM DADO", 2: "DOIS DADOS", 3: "TRÊS DADOS" },
                            kenoFunBall: {
                                big: "Big",
                                small: "Small",
                                sumOdd: "Odd",
                                sumEven: "Even",
                                sum: "Tie",
                                bigSumOdd: "Big&Odd",
                                bigSumEven: "Big&Even",
                                smallSumOdd: "Small&Odd",
                                smallSumEven: "Small&Even",
                                up: "Top",
                                down: "Bottom",
                                middle: "Tie",
                                ballOdd: "Odds",
                                ballEven: "Evens",
                                equal: "Tie",
                                gold: "Gold",
                                wood: "Wood",
                                water: "Water",
                                fire: "Fire",
                                earth: "Earth",
                            },
                        },
                        vxd: {
                            allRed: "Tudo vermelho",
                            allWhite: "Tudo branco",
                            threeWoneR: "3 branco+1 vermelho",
                            threeRoneW: "3 vermelho+1 branco",
                        },
                        kenoAnySelector: {
                            up: "Top",
                            down: "Bottom",
                            sumOdd: "Odd",
                            sumEven: "Even",
                            upSumOdd: "Top&Odd",
                            upSumEven: "Top&Even",
                            downSumOdd: "Bottom&Odd",
                            downSumEven: "Bottom&Even",
                            clear: "Clear",
                        },
                        kenoRoadmap: {
                            big: "B",
                            small: "S",
                            bigSmall: "B/S",
                            sum: "E",
                            sumOdd: "O",
                            sumEven: "E",
                            sumOddSumEven: "O/E",
                            up: "T",
                            down: "B",
                            upDown: "T/B",
                            middle: "-",
                            ballOdd: "O",
                            ballEven: "E",
                            ballOddBallEven: "O/T/E",
                            equal: "T",
                            gold: "-",
                            wood: "-",
                            water: "-",
                            fire: "-",
                            earth: "-",
                            WuXing: "5E",
                        },
                        gameCode: { THAIGOV: "Thailand Government Lottery", TCGTHGOV: "TCG Thailand Lottery" },
                        orderStatus: {
                            orderStatus_0: "TUDO",
                            orderStatus_2: "EM PROGRESSO",
                            orderStatus_4: "Ganhou",
                            orderStatus_5: "Sem Prémio",
                            orderStatus_6: "Cancelado",
                            orderStatus_7: "Cancelado",
                            orderStatus_8: "Cancelado",
                            orderStatus_12: "Cancelado",
                            orderStatus_14: "Incomlpete",
                            orderStatus_16: "Laço",
                            orderStatus_17: "Cancelado",
                            orderStatus_99: "Invalid Order",
                        },
                        errorCode: {
                            LGS_BETTING_GAME_CLOSED_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            LGS_BETTING_GAME_FESTIVAL_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            LGS_BETTING_GAME_PAUSED_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            LGS_BETTING_PLAY_MENU_CLOSED_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            LGS_BETTING_AMOUNT_OVER_LIMITS: "Bet Amount is over limit",
                            LGS_ITEM_BETTING_AMOUNT_OVER_LIMITS:
                                "Não. %@ está esgotado e fechado para apostas, tente outro número ou volte mais tarde.",
                            LGS_BETTING_MULTIPLE_OVER_LIMITS: "Multiple bets exceeded the maximum limit.",
                            LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "Bet rebate value is less than 0",
                            LGS_BETTING_ILLEGAL_ERROR: "Aposta incorreta, por favor tente novamente.",
                            LGS_BETTING_WITH_INVALID_TOKEN_ERROR:
                                "Sua sessão expirou, por favor tente novamente mais tarde",
                            LGS_CANCEL_ORDER_ARGUMENT_ERROR: "Bet cancel error",
                            LGS_BETTING_NUMBER_OVER_LIMITS:
                                "Não. %@ está esgotado e fechado para apostas, tente outro número ou volte mais tarde.",
                            ORDER_NOT_DRAWABLE: "Lottery Results pending",
                            LGS_CANCEL_ORDER_INACTIVITY: "The current system cannot cancel membership",
                            LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "Cancellations fee is less than the amount of bets",
                            LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR: "Error cancelling straight number bet",
                            LGS_BETTING_MODE_CLOSED_ERROR: "Betting mode is closed.",
                            LGS_BETTING_MODE_NOT_ALLOW_ERROR: "Bet mode is not allowed.",
                            SYSTEM_NOT_ALLOW_BETTING: "Game closed, please wait until next time.",
                            BETTING_ITEM_LIMIT: "Bet exceeds the limit",
                            LGS_CANCEL_ORDER_NOT_AVAILABLE: "Bet has been locked and cannot be cancelled.",
                            ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "Saldo insuficiente",
                            CANCEL_CHASE_ORDER_IS_NOT_LAST_START:
                                "Chasing number needs to be cancelled from last game.",
                            ORDER_IS_CANCELED: "The bet has been cancelled.",
                            "account.balance.not.enough": "Not enough balance.",
                            ACCOUNT_BALANCE_NOT_ENOUGH: "Saldo insuficiente",
                            ACCOUNT_TRANSFER_EXCEED_MIN: "Minimum transfer amount is 0.01 yuan",
                            UNKNOWN_ERROR: "System error",
                            CONNECTION_ERROR_:
                                "O local de onde você está tentando acessar o site está restrito no momento.",
                            CANCEL_ORDER_FAILED: "Cancelar pedido incorreto, tente novamente.",
                            CUSTOMER_LOGOUT_: "Por favor, faça login com sua conta oficial",
                            DRAW_FAIL_ERROR_: "Aposta incorreta, por favor tente novamente.",
                            NOT_SUPPORT_LANDSCAPE: "Use o modo retrato para obter a melhor experiência.",
                            LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS:
                                "Os seguintes números excederam o limite de compra atual, por favor aposte novamente, o valor restante pode ser comprado",
                            BETTING_STAKES_IS_OVER_LIMIT_STAKES: "Bet Stakes is over limit stakes",
                            ORDER_ALREADY_CANCELED: "The bet has been cancelled.",
                            STAKES_IS_OVER_LIMIT_ERROR: "Bet Stakes is over limit stakes",
                            BALANCE_NOT_ENOUGH_ERROR: "Saldo insuficiente",
                            BETTING_AMOUNT_OVER_LIMITS_ERROR: "Bet Amount is over limit",
                            CALCULATE_BETTING_AMOUNT_ERROR: "Aposta incorreta, por favor tente novamente.",
                            IILLEGAL_BALL_NUMBER_ERROR: "Aposta incorreta, por favor tente novamente.",
                            ILLEGAL_BETTING_ARGUMENT_ERROR: "Aposta incorreta, por favor tente novamente.",
                            SYSTEM_NOT_ALLOW_CHASE: "Aposta incorreta, por favor tente novamente.",
                            NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR: "Aposta incorreta, por favor tente novamente.",
                            CALCULATE_STAKES_ERROR: "Aposta incorreta, por favor tente novamente.",
                            PLAY_NOT_SUPPORTED_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            BOOK_FAILED_ERROR: "Aguarde enquanto todos os fundos estão sendo recuperados！",
                            WALLET_NOT_EXISTS_ERROR: "Aposta incorreta, por favor tente novamente.",
                            B2B_TX_FAILED: "Aguarde enquanto todos os fundos estão sendo recuperados！",
                            DEMO_NOT_SUPPORTED_ERROR: "Por favor, faça login com sua conta oficial",
                            ORDER_PRIZE_NOT_FOUND_ERROR:
                                "Nenhum prêmio relacionado encontrado, por favor, tente novamente.",
                            ORDER_SAVED_FAILED: "Nenhum prêmio relacionado encontrado, por favor, tente novamente.",
                            PLATFORM_SETTING_NOT_FOUND_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            PLAY_NOT_FOUND_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            GAME_SETTING_NOT_FOUND:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            GAME_DRWW_TIME_PARSE_ERROR:
                                "Nenhum tempo de sorteio relacionado encontrado, tente novamente.",
                            ACCOUNT_NOT_FOUND_ERROR: "Por favor, faça login com sua conta oficial",
                            GAME_URL_NOT_FOUND: "Por favor, faça login com sua conta oficial",
                            INVALID_TOKEN: "Por favor, faça login com sua conta oficial",
                            USER_NOT_LOGIN: "Por favor, faça login com sua conta oficial",
                            CANCEL_ORDER_ERROR: "Cancelar pedido incorreto, tente novamente.",
                            NOT_AVAILABLE_FOR_SALE_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            INTERNAL_SERVER_ERROR:
                                "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            OBJECT_NOT_EXIST: "Aposta incorreta, por favor tente novamente.",
                            ILLEGAL_PARAMS_VALUE: "Aposta incorreta, por favor tente novamente.",
                            BETTING_MULTIPLE_OVER_LIMITS_ERROR: "Aposta incorreta, por favor tente novamente.",
                            GAME_CLOSED_ERROR: "Nenhuma recreação relacionada encontrada, por favor, tente novamente.",
                            STAKES_ABOVE_LIMIT: "Aposta de apostas é acima de limites de apostas> %@",
                            REQUEST_TIME_OUT:
                                "O local de onde você está tentando acessar o site está restrito no momento.",
                            PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "Aposta de apostas é acima de limites de apostas> %@",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS:
                                "Não. %@ está esgotado e fechado para apostas, tente outro número ou volte mais tarde.",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "Os seguintes números excederam o limite de compra atual, por favor aposte novamente, o valor restante pode ser comprado",
                        },
                        recentlyGames: "Jogos de Aposta",
                        gameHistoryCancel: "Tem certeza de que deseja cancelar este tíquete？",
                        gameHistoryCancel_failed: "UNKNOWN_ERROR",
                        gameHistoryCancel_success: "cancelled",
                        orderNumber: "Bilhete #",
                        bettingTime: "Hora da aposta",
                        numero: "Empate #",
                        winningNumber: "Winning Number",
                        shoppingBasket: "Boletim de apostas",
                        betHistory: "Bet Records",
                        betRecord: "Bet Records",
                        confirmBetting: "Confirme",
                        betAmount: "Contagem de apostas",
                        betNumber: "Bet Number",
                        multiple: "Múltiplo",
                        syncMultipleBets: "Sincronizar Apostas Múltiplas",
                        betFailed: "Aposta incorreta, por favor tente novamente.",
                        winningAmount: "Vencer",
                        bettingAmount: "Custo",
                        manualBetPlaceHolderSEA:
                            'Por favor, digite suas apostas aqui ou envie um arquivo txt. O formato é por exemplo abaixo:\n\nNOTA: Você pode usar "," ou ";" ou "<Espaço>" ou uma nova linha para separar os números que você está apostando.',
                        filterResultMsg: "Remover Duplicado %@ Nº inválido. %@",
                        chooseFile: "Upload File",
                        clearBallText: "Excluir",
                        addToBetSlip: "Adicionar ao boletim de apostas",
                        filterRepeat: "Remover duplicado ＆ nº inválido.",
                        drawResult: "Resultado",
                        betNow: "Bet Now",
                        pastDraw: "Resultados",
                        drawHistory: "Resultados",
                        betFail: "Aposta incorreta, por favor tente novamente.",
                        confirmBetInfos: "Please Confirm the Betting Details",
                        odds: "Pagamentos",
                        amount: "Estaca",
                        balance: "Balance",
                        totalAmount: "Aposta Total",
                        totalCount: "TOTAL",
                        gameName: "Tipo de aposta",
                        gameContent: "Detalhes da aposta",
                        odds1Time: "Pagamentos / 1Tempo",
                        detail: "Detalhes",
                        processing: "Em progresso",
                        clear: "Excluir",
                        confirm: "Confirme",
                        pickRow: {
                            all: "Voltar",
                            big: "Grande",
                            small: "Pequena",
                            odd: "Ímpar",
                            even: "Até",
                            clear: "Excluir",
                        },
                        betAmountOverMaxAmount: "O valor da aposta está acima do limite> %@",
                        drawInterval: "Lottery time",
                        drawFrequency: "Lottery frequency",
                        currency: "¥",
                        currencyThb: "฿",
                        betsNTotalAmount:
                            '<div class="font-bold">%@</div>Bet/s，TOTAL BET<div class="font-bold">%@</div>，',
                        predictionAmount: 'will win<div class="red-words">%@</div>',
                        willWin: "irá vencer",
                        drawPrize: {
                            specialPrize: "Especial",
                            firstPrize: "1º Prémio",
                            secondPrize: "2º Prémio",
                            thirdPrize: "3º Prémio",
                            fourthPrize: "4º Prémio",
                            fifthPrize: "5º Prémio",
                            sixthPrize: "6º Prémio",
                            seventhPrize: "7º Prémio",
                            eighthPrize: "8º Prémio",
                        },
                        prizeListPrizeType: {
                            VTX_BS_BIG: "Grande",
                            VTX_BS_SMALL: "Pequeno",
                            VXD_BS_BIG: "Grande",
                            VXD_BS_SMALL: "Pequeno",
                            VXD_OE_ODD: "Ímpar",
                            VXD_OE_EVEN: "Mesmo",
                            VXD_4R_1: "Tudo vermelho",
                            VXD_4W_1: "Tudo branco",
                            VXD_3W1R_1: "3 branco + 1 vermelho",
                            VXD_3R1W_1: "3 vermelho + 1 branco",
                        },
                    }
                );
                e.default = o;
            },
            2321: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    playId: {
                        2056: "EXACT",
                        2058: "QUALQUER",
                        2061: "EXACT",
                        2063: "QUALQUER",
                        2065: "Bonus digit",
                        2068: "Random Back 3 Digits",
                        2055: "3D",
                        2057: "EXACT 3D-1o",
                        2059: "QUALQUER 3D-1o",
                        2643: "Segundo prêmio",
                        2644: "Segundo especial",
                        2645: "EXACT 3D-2nd",
                        2646: "EXACT 3D-2nd Special",
                        2675: "Tài Xỉu",
                        2676: "Grande Pequeno",
                        2677: "Xoc Dia",
                        2678: "Grande Pequeno",
                        2679: "Ímpar Mesmo",
                        2680: "Tudo vermelho",
                        2681: "Tudo branco",
                        2682: "3 branco + 1 vermelho",
                        2683: "3 vermelho + 1 branco",
                        2060: "2D",
                        2062: "EXACT 2D-1o",
                        2064: "QUALQUER 2D-1o",
                        2066: "EXACT 2D-Special ",
                        2067: "1D",
                        2069: "QUALQUER 1D-1o",
                        2481: "Manual Enter EXACT 2D-Special ",
                        2482: "Norm ANY 2D-1o",
                        2483: "Norm EXACT 2D-1o",
                        2484: "Manual Enter  EXACT 2D-1o",
                        2485: "Norm EXACT 3D-1o",
                        2486: "Manual Enter EXACT 3D-1o",
                        2487: "Norm ANY 3D-1o",
                        2297: "FPC",
                        2298: "FPC",
                        2299: "FPC",
                        2497: "FanTan",
                        2498: "Ventilador",
                        2499: "Ventilador",
                        2500: "Kwok",
                        2501: "Kwok",
                        2502: "Nim",
                        2503: "Nim",
                        2504: "BSOE",
                        2505: "BSOE",
                        2090: "4D",
                        2095: "3D",
                        2100: "2D",
                        2105: "1D",
                        2515: "AnyRoll",
                        2528: "AnyRoll",
                        2550: "FailParlay",
                        2560: "FailParlay",
                        2598: "Parlay",
                        2608: "ParlaSegundo especialy",
                        2300: "FPC",
                        2488: "FanTan",
                        2618: "Super SicBo",
                        2624: "Classificação 1-10",
                        2627: "Soma de 1ª e 2ª",
                        2630: "Dragão e tigre",
                        2091: "EXACT",
                        2093: "QUALQUER",
                        2096: "EXACT",
                        2098: "QUALQUER",
                        2101: "EXACT",
                        2103: "EXACT",
                        2301: "FPC",
                        2489: "Ventilador",
                        2491: "Kwok",
                        2493: "Nim",
                        2495: "BSOE",
                        2619: "Aposta de dados simples",
                        2620: "Três dados no total",
                        2621: "Triplo",
                        2622: "Qualquer triplo",
                        2623: "BSOE",
                        2625: "Classificação 1-10",
                        2626: "1-10 BSOE",
                        2628: "Soma de 1ª e 2ª",
                        2629: "BSOE1 e 2 da soma",
                        2631: "Dragão e tigre",
                        2516: "Último 2D of AnyResult",
                        2520: "Último 3D of AnyResult",
                        2524: "Último 4D of AnyResult",
                        2551: "FailParlay 4",
                        2554: "FailParlay 8",
                        2557: "FailParlay 10",
                        2599: "Parlay 2",
                        2602: "Parlay 3",
                        2605: "Parlay 4",
                        2584: "Cabeça 2D e especial",
                        2529: "Último 2D of AnyResult",
                        2533: "Último 3D of AnyResult",
                        2537: "Último 4D of AnyResult",
                        2561: "FailParlay 4 ",
                        2564: "FailParlay 8",
                        2567: "FailParlay 10",
                        2609: "Parlay 2",
                        2612: "Parlay 3",
                        2615: "Parlay 4",
                        2591: "Cabeça 2D e especial",
                        2106: "一等二星不定位",
                        2108: "二等二星不定位",
                        2579: "特等二星不定位",
                        2092: "EXACT 4D-Special",
                        2094: "QUALQUER 4D-Special",
                        2097: "EXACT 3D-Special",
                        2099: "QUALQUER 3D-Special",
                        2102: "EXACT 2D-Special",
                        2104: "EXACT 2D-1o",
                        2107: "QUALQUER 1D-Special",
                        2109: "QUALQUER 1D-1o",
                        2601: "Parlay 2",
                        2604: "Parlay 3",
                        2607: "Parlay 4",
                        2611: "Parlay 2",
                        2614: "Parlay 3",
                        2617: "Parlay 4",
                        2552: "FailParlay 4",
                        2555: "FailParlay 8",
                        2558: "FailParlay 10",
                        2562: "FailParlay 4",
                        2565: "FailParlay 8",
                        2568: "FailParlay 10",
                        2517: "Último 2D de AnyResult",
                        2521: "Último 3D de AnyResult",
                        2525: "Último 4D de AnyResult",
                        2530: "Último 2D de AnyResult",
                        2534: "Último 3D de AnyResult",
                        2538: "Último 4D de AnyResult",
                        2641: "Último 2D 1K de AnyResult",
                        2642: "Último 2D 1K de AnyResult",
                        2586: "Cabeça 2D e especial",
                        2589: "Cabeça 2D",
                        2593: "Cabeça 2D e especial",
                        2596: "Cabeça 2D",
                        2580: "Dez-Special",
                        2581: "Um-Special",
                        2582: "Dez-1o",
                        2583: "Um-1o",
                        2302: "FPC",
                        2490: "Ventilador",
                        2492: "Kwok",
                        2494: "Nim",
                        2496: "BSOE",
                        2518: "Norm Last 2D of AnyResult",
                        2519: "Manual Last 2D of AnyResult",
                        2522: "Norm Last 3D of AnyResult",
                        2523: "Manual Last 3D of AnyResult",
                        2526: "Norm Last 4D of AnyResult",
                        2527: "Manual Last 4D of AnyResult",
                        2553: "Manual FailParlay 4",
                        2556: "Manual FailParlay 8",
                        2559: "Manual FailParlay 10",
                        2587: "Norm Head 2D & Special",
                        2590: "Norm Head 2D",
                        2531: "Norm Last 2D of AnyResult",
                        2532: "Manual Last 2D of AnyResult",
                        2535: "Norm Last 3D of AnyResult",
                        2536: "Manual Last 3D of AnyResult",
                        2539: "Norm Last 4D of AnyResult",
                        2540: "Manual Last 4D of AnyResult",
                        2563: "Manual FailParlay 4",
                        2566: "Manual FailParlay 8",
                        2569: "Manual FailParlay 10",
                        2594: "Norm Head 2D & Special",
                        2597: "Norm Head 2D",
                        2286: "Norm EXACT 4D-Special",
                        2287: "Manual EXACT 4D-Special",
                        2284: "Norm EXACT 3D-Special",
                        2285: "Manual EXACT 3D-Special",
                        2283: "Norm ANY 3D-Special",
                        2279: "Norm EXACT 2D-Special",
                        2280: "Manual Enter EXACT 2D-Special",
                        2281: "Norm EXACT 2D-1st",
                        2282: "Manual Enter EXACT 2D-1st",
                        2127: "4D",
                        2132: "3D",
                        2137: "2D",
                        2142: "1D",
                        2128: "EXACT",
                        2130: "QUALQUER",
                        2133: "EXACT",
                        2135: "QUALQUER",
                        2138: "EXACT",
                        2140: "EXACT",
                        2129: "EXACT 4D",
                        2131: "QUALQUER 4D",
                        2134: "EXACT 3D",
                        2136: "QUALQUER 3D",
                        2139: "EXACT 2D-último",
                        2141: "EXACT 2D-primeiro",
                        2144: "QUALQUER 1D-último",
                        2146: "QUALQUER 1D-primeiro",
                        2632: "Posição",
                        2633: "Posição (uns)",
                        2634: "Posição (Dezenas)",
                        2635: "Posição (Centenas)",
                        2636: "Posição (Milhares)",
                        263700: "Posição",
                        2637: "Posição (uns)",
                        2638: "Posição (Dezenas)",
                        2639: "Posição (Centenas)",
                        2640: "Posição (Milhares)",
                        2288: "Norm EXACT 2D-last",
                        2289: "Manual Enter EXACT 2D-last",
                        2290: "Norm EXACT 2D-first",
                        2291: "Manual Enter EXACT 2D-first",
                        2292: "Norm ANY 3D",
                        2293: "Norm EXACT 3D",
                        2294: "Manual Enter EXACT 3D",
                        2295: "Norm EXACT 4D",
                        2296: "Manual Enter EXACT 4D",
                        2303: "FPC",
                        2304: "FPC",
                        2305: "FPC",
                        2506: "FanTan",
                        2507: "Ventilador",
                        2508: "Ventilador",
                        2509: "Kwok",
                        2510: "Kwok",
                        2511: "Nim",
                        2512: "Nim",
                        2513: "BSOE",
                        2514: "BSOE",
                        2647: "Pick",
                        2656: "Combinations",
                        2648: "Pick",
                        2657: "Big, Exact Score, Small",
                        2658: "Odd, Even",
                        2659: "Parlay Big Small, Odd Even",
                        2660: "Top, Tie, Bottom",
                        2661: "Odds, Tie, Evens",
                        2662: "Five Element",
                        2649: "Pick 1",
                        2650: "Pick 2",
                        2651: "Pick 3",
                        2652: "Pick 4",
                        2653: "Pick 5",
                        2654: "Pick 6",
                        2655: "Pick 7",
                    },
                };
                e.default = a;
            },
            9746: function(_, e, a) {
                var t;
                function n(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function i(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? n(Object(a), !0).forEach(function(e) {
                                  r(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : n(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function r(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var o = i(
                    i({}, ((t = a(3938)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        shoppingBasket: "รายการแทง",
                        confirmBetting: "ส่งโพย",
                        clearBallText: "ลบข้อมูล",
                        addToBetSlip: "เพิ่มบิลการเดิมพัน",
                        betNow: "แทงหวย",
                        betSuccess: "ส่งโพยสำเร็จ",
                        confirmBetInfos: "ตรวจโพยอีกครั้งก่อนส่งโพย",
                        balance: "ยอดเงินคงเหลือ",
                        betAmountOverMaxAmount: "จำนวนเงินเดิมพัน เกินขีดจำกัด",
                        totalAmount: "จำนวนเงินทั้งหมด",
                        currency: "฿",
                        currencyThb: "฿",
                        confirm: "ยืนยัน",
                        winningAmount: "เงินรางวัล",
                        betHistory: "รายการโพยย้อนหลัง",
                        bettingTime: "เวลาแทง",
                        orderNumber: "รายการโพย",
                        bettingAmount: "ยอดแทง",
                        winningNumber: "เลขผลรางวัล",
                        betNumber: "เลขที่แทง",
                        pastDraw: "ผล",
                        drawHistory: "ดูผลรางวัลย้อนหลัง",
                        drawResult: "ผลรางวัล",
                        processing: "กำลังโหลด",
                        betFail: "ใส่ราคาไม่ตรงเงื่อนไข",
                        betFailed: "ใส่ราคาไม่ตรงเงื่อนไข!!",
                        detail: "รายการเดิมพัน",
                        recentlyGames: "เปิดการเดิมพัน",
                        orderStatus: {
                            orderStatus_0: "รายละเอียด",
                            orderStatus_2: "สำเร็จ",
                            orderStatus_4: "ชนะเงินรางวัล",
                            orderStatus_5: "เสียเงิน",
                            orderStatus_6: "ยกเลิก",
                            orderStatus_7: "ยกเลิก",
                            orderStatus_8: "ยกเลิก",
                            orderStatus_12: "ยกเลิก",
                            orderStatus_14: "ไม่มีการจับรางวัล",
                            orderStatus_16: "วาด",
                            orderStatus_17: "ยกเลิก",
                            orderStatus_99: "โมฆะ",
                        },
                        betDigit: {
                            THOUSANDS: "หลักพัน",
                            HUNDREDS: "หลักร้อย",
                            TENS: "หลักสิบ",
                            ONES: "หลักหน่วย",
                            COM: "กลุ่ม",
                        },
                        pickRow: { all: "รูด", big: "สูง", small: "ต่ำ", odd: "คี่", even: "คู่", clear: "ลบ" },
                        pk10Ranking: {
                            1: "1st",
                            2: "2nd",
                            3: "3rd",
                            4: "4th",
                            5: "5th",
                            6: "6th",
                            7: "7th",
                            8: "8th",
                            9: "9th",
                            10: "10th",
                        },
                        ball: {
                            fishPrawnCrab: { fish: "ปลาเล็ก", prawn: "กุ้งขาว", crab: "ปูดำ" },
                            BSOE: { big: "ใหญ่", small: "เล็ก", odd: "คี่", even: "คู่" },
                            K3_BSOE: { big: "ใหญ่", small: "เล็ก", odd: "คี่", even: "คู่" },
                            PK10_BSOE: { big: "สูง", small: "ต่ำ", odd: "คี่", even: "คู่" },
                            VNC_PK10_DragonTiger: { dragon: "Dragon", tiger: "Tiger" },
                            fanTanFan: { 1: "1 Fan", 2: "2 Fan", 3: "3 Fan", 4: "4 Fan" },
                            fanTanJiao: { "1_2": "1-2 Kwok", "1_4": "1-4 Kwok", "2_3": "2-3 Kwok", "3_4": "3-4 Kwok" },
                            fanTanNian: {
                                "1_2": "1 Nim 2",
                                "1_3": "1 Nim 3",
                                "1_4": "1 Nim 4",
                                "2_1": "2 Nim 1",
                                "2_3": "2 Nim 3",
                                "2_4": "2 Nim 4",
                                "3_1": "3 Nim 1",
                                "3_2": "3 Nim 2",
                                "3_4": "3 Nim 4",
                                "4_1": "4 Nim 1",
                                "4_2": "4 Nim 2",
                                "4_3": "4 Nim 3",
                            },
                            sicBoAllSurroundDice: { 1: "ตอง" },
                            sicBoDiceOdds: { 1: "ONE DICE", 2: "TWO DICE", 3: "THREE DICE" },
                            kenoFunBall: {
                                big: "สูง",
                                small: "ต่ำ",
                                sumOdd: "คี่",
                                sumEven: "คู่",
                                sum: "เสมอ",
                                bigSumOdd: "สูง&คี่",
                                bigSumEven: "สูง&คู่",
                                smallSumOdd: "ต่ำ&คี่",
                                smallSumEven: "ต่ำ&คู่",
                                up: "บน",
                                down: "ล่าง",
                                middle: "เสมอ",
                                ballOdd: "คี่",
                                ballEven: "คู่",
                                equal: "เสมอ",
                                gold: "ทอง",
                                wood: "ไม้",
                                water: "น้ำ",
                                fire: "ไฟ",
                                earth: "โลก",
                            },
                        },
                        vxd: {
                            allRed: "แดงทั้งหมด",
                            allWhite: "เหรียญขาว",
                            threeWoneR: "เหรียญขาว 3+เหรียญแดง 1",
                            threeRoneW: "เหรียญแดง 3+เหรียญขาว 1",
                        },
                        kenoAnySelector: {
                            up: "บน",
                            down: "ล่าง",
                            sumOdd: "คี่",
                            sumEven: "คู่",
                            upSumOdd: "บน&คี่",
                            upSumEven: "บน&คู่",
                            downSumOdd: "ล่าง&คี่",
                            downSumEven: "ล่าง&คู่",
                            clear: "ลบ",
                        },
                        kenoRoadmap: {
                            big: "B",
                            small: "S",
                            bigSmall: "B/S",
                            sum: "E",
                            sumOdd: "O",
                            sumEven: "E",
                            sumOddSumEven: "O/E",
                            up: "T",
                            down: "B",
                            upDown: "T/B",
                            middle: "-",
                            ballOdd: "O",
                            ballEven: "E",
                            ballOddBallEven: "O/T/E",
                            equal: "T",
                            gold: "-",
                            wood: "-",
                            water: "-",
                            fire: "-",
                            earth: "-",
                            WuXing: "5E",
                        },
                        prizeListPrizeType: {
                            VTX_BS_BIG: "ใหญ่",
                            VTX_BS_SMALL: "เล็ก",
                            VXD_BS_BIG: "ใหญ่",
                            VXD_BS_SMALL: "เล็ก",
                            VXD_OE_ODD: "คี่",
                            VXD_OE_EVEN: "คู่",
                            VXD_4R_1: "แดงทั้งหมด",
                            VXD_4W_1: "เหรียญขาว",
                            VXD_3W1R_1: "เหรียญขาว 3+ เหรียญแดง 1",
                            VXD_3R1W_1: "เหรียญแดง 3+ เหรียญขาว 1",
                        },
                        errorCode: {
                            LGS_BETTING_GAME_CLOSED_ERROR: "หวยปิดรับแทง",
                            LGS_BETTING_GAME_FESTIVAL_ERROR: "หวยปิดรับแทง",
                            LGS_BETTING_GAME_PAUSED_ERROR: "หวยปิดรับแทง",
                            LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "หวยปิดรับแทง",
                            LGS_BETTING_AMOUNT_OVER_LIMITS: "ยอดแทงเกินจำนวนที่กำหนด",
                            LGS_BETTING_MULTIPLE_OVER_LIMITS: "LGS_BETTING_MULTIPLE_OVER_LIMITS",
                            LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO",
                            LGS_BETTING_ILLEGAL_ERROR: "ยอดแทงไม่ถูกต้อง แทงไม่สำเร็จ",
                            LGS_BETTING_WITH_INVALID_TOKEN_ERROR: "กรุณาเข้าระบบใหม่อีกครั้ง",
                            LGS_CANCEL_ORDER_ARGUMENT_ERROR: "LGS_CANCEL_ORDER_ARGUMENT_ERROR",
                            LGS_BETTING_NUMBER_OVER_LIMITS:
                                "%@ เกินขีด จำกัด การเดิมพันแล้วจำนวนที่อนุญาต สินค้าคงคลังเป็นศูนย์",
                            ORDER_NOT_DRAWABLE: "อยู่ระหว่างการรอผล",
                            LGS_CANCEL_ORDER_INACTIVITY: "ไม่สามารยกเลิกรายการนี้",
                            LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT",
                            LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR:
                                "LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR",
                            LGS_BETTING_MODE_CLOSED_ERROR: "ปิดรับแทงแล้ว ไม่สามารถแทงได้",
                            LGS_BETTING_MODE_NOT_ALLOW_ERROR: "ไม่สามารถแทงได้",
                            SYSTEM_NOT_ALLOW_BETTING: "เกมล์นี้ปิดรับแทงแล้ว",
                            BETTING_ITEM_LIMIT: "รายการสั่งซื้อเกินขีดจำกัด",
                            LGS_CANCEL_ORDER_NOT_AVAILABLE: "รับรายการเรียบร้อยแล้ว ไม่สามารถยกเลิกได้",
                            ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "ยอดคงเหลือไม่พอ",
                            CANCEL_CHASE_ORDER_IS_NOT_LAST_START: "CANCEL_CHASE_ORDER_IS_NOT_LAST_START",
                            ORDER_IS_CANCELED: "ยกเลิกคำสั่งซื้อ",
                            "account.balance.not.enough": "ยอดเงินคงเหลือไม่พอ",
                            ACCOUNT_BALANCE_NOT_ENOUGH: "ยอดเงินคงเหลือไม่พอ",
                            ACCOUNT_TRANSFER_EXCEED_MIN: "ACCOUNT_TRANSFER_EXCEED_MIN",
                            UNKNOWN_ERROR: "ระบบผิดพลาค",
                            CONNECTION_ERROR_:
                                "กรุณาตรวจสอบสัญญาณอินเตอร์เนท และ ลองเข้าระบบใหม่อีกครั้ง หรือ ติดต่อฝ่ายบริการลูกค้า",
                            CUSTOMER_LOGOUT_: "คุณยังไม่ได้เข้าสู่ระบบ กรุณาเข้าสู่ระบบก่อน",
                            DRAW_FAIL_ERROR_: "ระบบไม่ว่าง กรุณาลองไหม่อีกครั้ง",
                            NOT_SUPPORT_LANDSCAPE: "หน้าจอไม่สามารถตั้งเป็นแนวนอน",
                            LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS:
                                "เกินขีด จำกัด การเดิมพันแล้วจำนวนที่อนุญาต สินค้า",
                            BETTING_STAKES_IS_OVER_LIMIT_STAKES: "เดิมพันเดิมพันสูงกว่าวงเงินเดิมพันสูงสุด",
                            ORDER_ALREADY_CANCELED: "ยกเลิกคำสั่งซื้อ",
                            STAKES_IS_OVER_LIMIT_ERROR: "เดิมพันเดิมพันสูงกว่าวงเงินเดิมพันสูงสุด",
                            BALANCE_NOT_ENOUGH_ERROR: "ยอดคงเหลือไม่พอ",
                            BETTING_AMOUNT_OVER_LIMITS_ERROR: "รายการเดิมพันเต็ม",
                            CALCULATE_BETTING_AMOUNT_ERROR: "ไม่พบรายละเอียดการเดิมพัน โปรดลองใหม่อีกครั้ง",
                            IILLEGAL_BALL_NUMBER_ERROR: "ไม่พบรายละเอียดการเดิมพัน โปรดลองใหม่อีกครั้ง",
                            ILLEGAL_BETTING_ARGUMENT_ERROR: "ไม่พบรายละเอียดการเดิมพัน โปรดลองใหม่อีกครั้ง",
                            SYSTEM_NOT_ALLOW_CHASE: "ไม่พบรายละเอียดการเดิมพัน โปรดลองใหม่อีกครั้ง",
                            NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR: "ไม่พบรายละเอียดการเดิมพัน โปรดลองใหม่อีกครั้ง",
                            CALCULATE_STAKES_ERROR: "ไม่พบรายละเอียดการเดิมพัน โปรดลองใหม่อีกครั้ง",
                            PLAY_NOT_SUPPORTED_ERROR: "การเล่นเกมอยู่ระหว่างการบำรุงรักษาโปรดลองอีกครั้งในภายหลัง!",
                            BOOK_FAILED_ERROR: "โปรดรอในขณะที่กำลังเรียกเงินทั้งหมด！",
                            WALLET_NOT_EXISTS_ERROR: "โปรดรอในขณะที่กำลังเรียกเงินทั้งหมด！",
                            B2B_TX_FAILED: "โปรดรอในขณะที่กำลังเรียกเงินทั้งหมด！",
                            DEMO_NOT_SUPPORTED_ERROR: "กรุณาเข้าสู่ระบบด้วยบัญชีทางการของคุณ",
                            ORDER_PRIZE_NOT_FOUND_ERROR: "ไม่พบบันทึกที่เกี่ยวข้อง",
                            ORDER_SAVED_FAILED: "การอ่านคำสั่งซื้อล้มเหลวโปรดลองอีกครั้งในภายหลัง!",
                            PLATFORM_SETTING_NOT_FOUND_ERROR:
                                "การเล่นเกมอยู่ระหว่างการบำรุงรักษาโปรดลองอีกครั้งในภายหลัง!",
                            NOT_AVAILABLE_FOR_SALE_ERROR: "การเล่นเกมอยู่ระหว่างการบำรุงรักษาโปรดลองอีกครั้งในภายหลัง!",
                            PLAY_NOT_FOUND_ERROR: "การเล่นเกมอยู่ระหว่างการบำรุงรักษาโปรดลองอีกครั้งในภายหลัง!",
                            GAME_SETTING_NOT_FOUND: "การเล่นเกมอยู่ระหว่างการบำรุงรักษาโปรดลองอีกครั้งในภายหลัง!",
                            GAME_DRWW_TIME_PARSE_ERROR: "ไม่สามารถอ่านเวลาออกรางวัลโปรดลองอีกครั้งในภายหลัง!",
                            ACCOUNT_NOT_FOUND_ERROR: "กรุณาเข้าสู่ระบบด้วยบัญชีทางการของคุณ",
                            GAME_URL_NOT_FOUND: "กรุณาเข้าสู่ระบบด้วยบัญชีทางการของคุณ",
                            INVALID_TOKEN: "กรุณาเข้าสู่ระบบด้วยบัญชีทางการของคุณ",
                            USER_NOT_LOGIN: "กรุณาเข้าสู่ระบบด้วยบัญชีทางการของคุณ",
                            CANCEL_ORDER_ERROR: "การยกเลิกคำสั่งซื้อไม่ถูกต้อง",
                            INTERNAL_SERVER_ERROR: "ระบบผิดพลาค",
                            OBJECT_NOT_EXIST: "ระบบผิดพลาค",
                            ILLEGAL_PARAMS_VALUE: "ระบบผิดพลาค",
                            BETTING_MULTIPLE_OVER_LIMITS_ERROR: "LGS_BETTING_MULTIPLE_OVER_LIMITS",
                            GAME_CLOSED_ERROR: "หวยปิดรับแทง",
                            STAKES_ABOVE_LIMIT: "เดิมพันเดิมพันสูงกว่าวงเงินเดิมพันสูงสุด > %@",
                            PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "จำนวนเงินเดิมพันสูงสุดที่อนุญาตให้ขายได้ด้วยตัวเลขสองหลักเดียวกันหลังหมายเลขเดิมพัน %@ คือ %@",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS:
                                "%@ เกินขีด จำกัด การเดิมพันแล้วจำนวนที่อนุญาต สินค้าคงคลังเป็นศูนย์",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "เกินขีด จำกัด การเดิมพันแล้วจำนวนที่อนุญาต สินค้า",
                        },
                        gameHistoryCancel: "ยกเลิกคำสั่งซื้อหรือไม่",
                        gameHistoryCancel_success: "สำเร็จ",
                        gameHistoryCancel_failed: "ล้มเหลว",
                        gameCode: { THAIGOV: "หวยรัฐบาล", TCGTHGOV: "หวย (HL8)" },
                        drawFrequency: "เวลาการออกผล",
                        chooseFile: "ที่อัพโหลด",
                        filterRepeat: "ลบหมายเลขซ้ำ",
                        betsNTotalAmount:
                            '<div class="font-bold">%@</div>รายการ，รวมยอดแทง<div class="font-bold">%@</div>，',
                        predictionAmount: 'เรทชนะ<div class="red-words">%@</div>',
                        willWin: "อัตราการเดิมพัน",
                        filterResultMsg: "ลบหมายเลขซ้ำ %@ โมฆะ %@",
                        odds: "จ่าย",
                        amount: "ใส่ราคา",
                        multiple: "หลาย",
                        syncMultipleBets: "ความหลาย",
                        manualBetPlaceHolderSEA:
                            "ซึ่งเป็น TXT File ที่เป็นตัวคั่น หรือ\nซึ่งไฟล์ประเภท delimited นี้ คุณสามารถใช้คอมม่า (,) หรือ เครื่องหมายเซมิคอลอน (;) หรือเว้นวรรค：",
                        gameName: "เดิมพัน",
                        gameContent: "เดิมพัน",
                        odds1Time: "จ่าย/ทีม 1",
                        betAmount: "การรวมกัน",
                        drawPrize: {
                            specialPrize: "รางวัลที่S",
                            firstPrize: "รางวัลที่1",
                            secondPrize: "รางวัลที่2",
                            thirdPrize: "รางวัลที่3",
                            fourthPrize: "รางวัลที่4",
                            fifthPrize: "รางวัลที่5",
                            sixthPrize: "รางวัลที่6",
                            seventhPrize: "รางวัลที่7",
                            eighthPrize: "รางวัลที่8",
                        },
                    }
                );
                e.default = o;
            },
            3938: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    playId: {
                        2056: "เหมือนกัน",
                        2058: "ตองใดๆ",
                        2061: "เหมือนกัน",
                        2063: "ตองใดๆ",
                        2065: "ล่าง",
                        2068: "บน",
                        2055: "สามตัว",
                        2057: "สามตัวบน",
                        2059: "สามตัวโต๊ด",
                        2643: "เลขหน้า 3 ตัว",
                        2644: "เลขท้าย 3 ตัว",
                        2645: "เลขหน้า 3 ตัว",
                        2646: "เลขท้าย 3 ตัว",
                        2675: "ไฮโลเวียดนาม",
                        2676: "ใหญ่เล็ก",
                        2677: "เหรียญสีนำโชค",
                        2678: "ใหญ่เล็ก",
                        2679: "คี่คู่",
                        2680: "แดงทั้งหมด",
                        2681: "เหรียญขาว",
                        2682: "เหรียญขาว 3+ เหรียญแดง 1",
                        2683: "เหรียญแดง 3+ เหรียญขาว 1",
                        2060: "สองตัว",
                        2062: "สองตัวบน",
                        2064: "สองตัวโต๊ด",
                        2066: "สองตัวล่าง",
                        2067: "เลขวิ่ง",
                        2069: "วิ่ง 3 ตัวบน",
                        2480: "บรรทัดฐาน สองตัวล่าง",
                        2481: "ป้อนด้วยตนเอง สองตัวล่าง",
                        2482: "บรรทัดฐาน สองตัวบนโต๊ด",
                        2483: "บรรทัดฐาน  สองตัวบน",
                        2484: "ป้อนด้วยตนเอง  สองตัวบน",
                        2485: "บรรทัดฐาน สามตัวบน",
                        2486: "ป้อนด้วยตนเอง สามตัวบน",
                        2487: "บรรทัดฐาน สามตัวโต้ด",
                        2297: "น้ำเต้าปูปลา",
                        2298: "น้ำเต้าปูปลา",
                        2299: "น้ำเต้าปูปลา",
                        2497: "ซุปเปอร์กำถั่ว",
                        2498: "Fan",
                        2499: "Fan",
                        2500: "Kwok",
                        2501: "Kwok",
                        2502: "Nim",
                        2503: "Nim",
                        2504: "ใหญ่เล็กคี่คู่",
                        2505: "ใหญ่เล็กคี่คู่",
                        2090: "สี่ตัว",
                        2095: "สามตัว",
                        2100: "สองตัว",
                        2105: "เลขวิ่ง",
                        2515: "ทุกรางวัล",
                        2528: "ทุกรางวัล",
                        2550: "ตัวไม่ตรง",
                        2560: "ตัวไม่ตรง",
                        2598: "พาร์เลย์",
                        2608: "พาร์เลย์",
                        2300: "น้ำเต้าปูปลา",
                        2488: "ซุปเปอร์กำถั่ว",
                        2618: "ไฮโล",
                        2624: "การจัดอันดับ",
                        2627: "ครั้งแรกและครั้งที่สอง",
                        2630: "เสือมังกร",
                        2091: "เหมือนกัน",
                        2093: "ตองใดๆ",
                        2096: "เหมือนกัน",
                        2098: "ตองใดๆ",
                        2101: "เหมือนกัน",
                        2103: "เหมือนกัน",
                        2301: "น้ำเต้าปูปลา",
                        2489: "Fan",
                        2491: "Kwok",
                        2493: "Nim",
                        2495: "ใหญ่เล็กคี่คู่",
                        2619: "การแทงเต็งเลข",
                        2620: "แทงจำนวนแต้ม",
                        2621: "แทงลูกตอง",
                        2622: "แทงลูกตองรวม",
                        2623: "ใหญ่เล็กคี่คู่",
                        2625: "การจัดอันดับ",
                        2626: "สูงต่ำคี่คู่",
                        2628: "ครั้งแรกและครั้งที่สอง",
                        2629: "ผลรวมใหญเล็ก",
                        2631: "เสือมังกร",
                        2516: "เลขท้าย2ตัว",
                        2520: "เลขท้าย3ตัว",
                        2524: "เลขท้าย4ตัว",
                        2551: "ไม่ตรงทั้ง4ตัว",
                        2554: "ไม่ตรงทั้ง8ตัว",
                        2557: "ไม่ตรงทั้ง10ตัว",
                        2599: "พาร์เลย์ 2",
                        2602: "พาร์เลย์ 3",
                        2605: "พาร์เลย์ 4",
                        2584: "2D รางวัลที่ และพิเศษ",
                        2529: "เลขท้าย2ตัว",
                        2533: "เลขท้าย3ตัว",
                        2537: "เลขท้าย4ตัว",
                        2561: "ไม่ตรงทั้ง4ตัว",
                        2564: "ไม่ตรงทั้ง8ตัว",
                        2567: "ไม่ตรงทั้ง10ตัว",
                        2609: "พาร์เลย์ 2",
                        2612: "พาร์เลย์ 3",
                        2615: "พาร์เลย์ 4",
                        2591: "2D รางวัลที่ และพิเศษ",
                        2106: "一等二星不定位",
                        2108: "二等二星不定位",
                        2579: "特等二星不定位",
                        2092: "4 ตัวบน",
                        2094: "4 ตัวบนโต๊ด",
                        2097: "สามตัวบน",
                        2099: "สามตัวโต๊ด",
                        2102: "สองตัวบน",
                        2104: "สองตัวล่าง",
                        2107: "วิ่งบน",
                        2109: "วิ่งล่าง",
                        2601: "พาร์เลย์ 2",
                        2604: "พาร์เลย์ 3",
                        2607: "พาร์เลย์ 4",
                        2611: "พาร์เลย์ 2",
                        2614: "พาร์เลย์ 3",
                        2617: "พาร์เลย์ 4",
                        2552: "ไม่ตรงทั้ง4ตัว",
                        2555: "ไม่ตรงทั้ง8ตัว",
                        2558: "ไม่ตรงทั้ง10ตัว",
                        2562: "ไม่ตรงทั้ง4ตัว",
                        2565: "ไม่ตรงทั้ง8ตัว",
                        2568: "ไม่ตรงทั้ง10ตัว",
                        2517: "เลขท้าย2ตัว",
                        2521: "เลขท้าย3ตัว",
                        2525: "เลขท้าย4ตัว",
                        2530: "เลขท้าย2ตัว",
                        2534: "เลขท้าย3ตัว",
                        2538: "เลขท้าย4ตัว",
                        2641: "เลขท้าย2ตัว1K",
                        2642: "เลขท้าย2ตัว1K",
                        2586: "2D รางวัลที่ และพิเศษ",
                        2589: "พิเศษเลขท้าย2ตัว",
                        2593: "2D รางวัลที่ และพิเศษ",
                        2596: "พิเศษเลขท้าย2ตัว",
                        2580: "เลขวิ่ง หลักสิบ",
                        2581: "เลขวิ่ง หลักหน่วย",
                        2582: "รางวัลที่1 หลักสิบ",
                        2583: "รางวัลที่1 หลักหน่วย",
                        2302: "น้ำเต้าปูปลา",
                        2490: "Fan",
                        2492: "Kwok",
                        2494: "Nim",
                        2496: "ใหญ่เล็กคี่คู่",
                        2518: "เลขท้าย2ตัว บรรทัดฐาน",
                        2519: "เลขท้าย2ตัว ป้อนด้วยตนเอง",
                        2522: "เลขท้าย3ตัว บรรทัดฐาน",
                        2523: "เลขท้าย3ตัว ป้อนด้วยตนเอง",
                        2526: "เลขท้าย4ตัว บรรทัดฐาน",
                        2527: "เลขท้าย4ตัว ป้อนด้วยตนเอง",
                        2553: "ไม่ตรงทั้ง4ตัว ป้อนด้วยตนเอง",
                        2556: "ไม่ตรงทั้ง8ตัว ป้อนด้วยตนเอง",
                        2559: "ไม่ตรงทั้ง10ตัว ป้อนด้วยตนเอง",
                        2587: "บรรทัดฐาน 2D รางวัลที่ และพิเศษ",
                        2590: "บรรทัดฐาน พิเศษเลขท้าย2ตัว",
                        2531: "เลขท้าย2ตัว บรรทัดฐาน",
                        2532: "เลขท้าย2ตัว ป้อนด้วยตนเอง",
                        2535: "เลขท้าย3ตัว บรรทัดฐาน",
                        2536: "เลขท้าย3ตัว ป้อนด้วยตนเอง",
                        2539: "เลขท้าย4ตัว บรรทัดฐาน",
                        2540: "เลขท้าย4ตัว ป้อนด้วยตนเอง",
                        2563: "ไม่ตรงทั้ง4ตัว ป้อนด้วยตนเอง",
                        2566: "ไม่ตรงทั้ง8ตัว ป้อนด้วยตนเอง",
                        2569: "ไม่ตรงทั้ง10ตัว ป้อนด้วยตนเอง",
                        2594: "บรรทัดฐาน 2D รางวัลที่ และพิเศษ",
                        2597: "บรรทัดฐาน พิเศษเลขท้าย2ตัว",
                        2286: "บรรทัดฐาน 4 ตัวบน",
                        2287: "ป้อนด้วยตนเอง 4 ตัวบน",
                        2284: "บรรทัดฐาน สามตัวบน",
                        2285: "ป้อนด้วยตนเอง สามตัวบน",
                        2283: "บรรทัดฐาน สามตัวโต้ด",
                        2279: "บรรทัดฐาน สองตัวบน",
                        2280: "ป้อนด้วยตนเอง สองตัวบน",
                        2281: "บรรทัดฐาน สองตัวล่าง",
                        2282: "ป้อนด้วยตนเอง สองตัวล่าง",
                        2127: "สี่ตัว",
                        2132: "สามตัว",
                        2137: "สองตัว",
                        2142: "เลขวิ่ง",
                        2128: "เหมือนกัน",
                        2130: "ตองใดๆ",
                        2133: "เหมือนกัน",
                        2135: "ตองใดๆ",
                        2138: "เหมือนกัน",
                        2140: "เหมือนกัน",
                        2129: " 4 ตัวบน",
                        2131: " 4 ตัวบนโต๊ด",
                        2134: "สามตัวบน",
                        2136: "สามตัวโต๊ด",
                        2139: "สองตัวบน",
                        2141: "สองตัวล่าง",
                        2144: "วิ่งบน",
                        2146: "วิ่งล่าง",
                        2632: "เลขวิ่ง",
                        2633: "เลขวิ่ง (หลักหน่วย)",
                        2634: "เลขวิ่ง (หลักสิบ)",
                        2635: "เลขวิ่ง (หลักร้อย)",
                        2636: "เลขวิ่ง (หลักพัน)",
                        263700: "เลขวิ่ง",
                        2637: "เลขวิ่ง (หลักหน่วย)",
                        2638: "เลขวิ่ง (หลักสิบ)",
                        2639: "เลขวิ่ง (หลักร้อย)",
                        2640: "เลขวิ่ง (หลักพัน)",
                        2288: "บรรทัดฐาน สองตัวบน",
                        2289: "ป้อนด้วยตนเอง สองตัวบน",
                        2290: "บรรทัดฐาน สองตัวล่าง",
                        2291: "ป้อนด้วยตนเอง สองตัวล่าง",
                        2292: "บรรทัดฐาน สามตัวโต้ด",
                        2293: "บรรทัดฐาน สามตัวบน",
                        2294: "ป้อนด้วยตนเอง สามตัวบน",
                        2295: "บรรทัดฐาน 4 ตัวบน",
                        2296: "ป้อนด้วยตนเอง 4 ตัวบน",
                        2303: "น้ำเต้าปูปลา",
                        2304: "น้ำเต้าปูปลา",
                        2305: "น้ำเต้าปูปลา",
                        2506: "ซุปเปอร์กำถั่ว",
                        2507: "Fan",
                        2508: "Fan",
                        2509: "Kwok",
                        2510: "Kwok",
                        2511: "Nim",
                        2512: "Nim",
                        2513: "ใหญ่เล็กคี่คู่",
                        2514: "ใหญ่เล็กคี่คู่",
                        2647: "เลือก",
                        2656: "การรวมกัน",
                        2648: "เลือก",
                        2657: "สูง, คะแนนสะสม, ต่ำ",
                        2658: "คี่, คู่",
                        2659: "พาร์เลย์ สูง ต่ำ, คี่ คู่",
                        2660: "บน, เสมอ, ล่าง",
                        2661: "คี่, เสมอ, คู่",
                        2662: "ห้าอันดับ",
                        2649: "เลือก 1",
                        2650: "เลือก 2",
                        2651: "เลือก 3",
                        2652: "เลือก 4",
                        2653: "เลือก 5",
                        2654: "เลือก 6",
                        2655: "เลือก 7",
                    },
                };
                e.default = a;
            },
            6567: function(_, e, a) {
                var t, n;
                function i(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function r(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? i(Object(a), !0).forEach(function(e) {
                                  o(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : i(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function o(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var l = r(
                    r({}, ((t = a(2698)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        shoppingBasket: "購彩籃",
                        confirmBetting: "確認投注",
                        clearBallText: "清除選號",
                        addToBetSlip: "加入購物車",
                        betNow: "立即投注",
                        betSuccess: "恭喜, 下注成功",
                        betPartialSuccess: "餘額不足，部份生成訂單成功",
                        confirmBetInfos: "請確認投注訊息",
                        balance: "餘額",
                        betAmountOverMaxAmount: "您目前的投注金額大於最大可投注金額<br />當前模式最大投注金額為%@元!!",
                        totalAmount: "總金額",
                        currency: "¥",
                        currencyThb: "$",
                        confirm: "確認",
                        winningAmount: "中獎金額",
                        betHistory: "投注歷史",
                        bettingTime: "投注時間",
                        orderNumber: "訂單編號",
                        bettingAmount: "投注金額",
                        winningNumber: "開獎號碼",
                        betNumber: "投注號碼",
                        pastDraw: "開獎紀錄",
                        drawHistory: "開獎歷史",
                        drawResult: "開獎結果",
                        processing: "進行中",
                        betFail: "下注失敗",
                        betFailed: "生成訂單失敗",
                        detail: "詳細",
                        status: "狀態",
                        recentlyGames: "最近遊戲",
                        orderStatus: {
                            orderStatus_0: "全部",
                            orderStatus_2: "進行中",
                            orderStatus_4: "已中獎",
                            orderStatus_5: "未中獎",
                            orderStatus_6: "追中撤單",
                            orderStatus_7: "出號撤單",
                            orderStatus_8: "個人撤單",
                            orderStatus_12: "空開撤單",
                            orderStatus_14: "未開獎",
                            orderStatus_16: "和局",
                            orderStatus_17: "個人撤單",
                            orderStatus_99: "無效訂單",
                        },
                        betDigit: { THOUSANDS: "千位", HUNDREDS: "百位", TENS: "十位", ONES: "個位", COM: "組選" },
                        pickRow: { all: "全", big: "大", small: "小", odd: "奇", even: "偶", clear: "清" },
                        pk10Ranking: {
                            1: "第1名",
                            2: "第2名",
                            3: "第3名",
                            4: "第4名",
                            5: "第5名",
                            6: "第6名",
                            7: "第7名",
                            8: "第8名",
                            9: "第9名",
                            10: "第10名",
                        },
                        ball: {
                            fishPrawnCrab: { fish: "魚", prawn: "大蝦", crab: "螃蟹" },
                            BSOE: { big: "大", small: "小", odd: "單", even: "雙", tie: "和" },
                            K3_BSOE: { big: "大", small: "小", odd: "單", even: "雙" },
                            PK10_BSOE: { big: "大", small: "小", odd: "單", even: "雙" },
                            VNC_PK10_DragonTiger: { dragon: "龍", tiger: "虎" },
                            fanTanFan: { 1: "1番", 2: "2番", 3: "3番", 4: "4番" },
                            fanTanJiao: { "1_2": "1-2角", "1_4": "1-4角", "2_3": "2-3角", "3_4": "3-4角" },
                            fanTanNian: {
                                "1_2": "1念2",
                                "1_3": "1念3",
                                "1_4": "1念4",
                                "2_1": "2念1",
                                "2_3": "2念3",
                                "2_4": "2念4",
                                "3_1": "3念1",
                                "3_2": "3念2",
                                "3_4": "3念4",
                                "4_1": "4念1",
                                "4_2": "4念2",
                                "4_3": "4念3",
                            },
                            sicBoAllSurroundDice: { 1: "全圍" },
                            sicBoDiceOdds: { 1: "單骰", 2: "雙骰", 3: "三骰" },
                            kenoFunBall: {
                                big: "大",
                                small: "小",
                                sumOdd: "單",
                                sumEven: "雙",
                                sum: "和",
                                bigSumOdd: "大單",
                                bigSumEven: "大雙",
                                smallSumOdd: "小單",
                                smallSumEven: "小雙",
                                up: "上",
                                down: "下",
                                middle: "中",
                                ballOdd: "奇",
                                ballEven: "偶",
                                equal: "和",
                                gold: "金",
                                wood: "木",
                                water: "水",
                                fire: "火",
                                earth: "土",
                            },
                        },
                        vxd: { allRed: "全红", allWhite: "全白", threeWoneR: "3白+1红", threeRoneW: "3红+1白" },
                        kenoAnySelector: {
                            up: "上",
                            down: "下",
                            sumOdd: "單",
                            sumEven: "雙",
                            upSumOdd: "上單",
                            upSumEven: "上雙",
                            downSumOdd: "下單",
                            downSumEven: "下雙",
                            clear: "清",
                        },
                        kenoRoadmap: {
                            big: "大",
                            small: "小",
                            bigSmall: "大小",
                            sum: "和",
                            sumOdd: "單",
                            sumEven: "雙",
                            sumOddSumEven: "單雙",
                            up: "上",
                            down: "下",
                            upDown: "上下",
                            middle: "中",
                            ballOdd: "奇",
                            ballEven: "偶",
                            ballOddBallEven: "奇偶",
                            equal: "和",
                            gold: "金",
                            wood: "木",
                            water: "水",
                            fire: "火",
                            earth: "土",
                            WuXing: "五行",
                        },
                        errorCode:
                            ((n = {
                                LGS_BETTING_GAME_CLOSED_ERROR: "投注彩種已關閉",
                                LGS_BETTING_GAME_FESTIVAL_ERROR: "投注彩種已關閉",
                                LGS_BETTING_GAME_PAUSED_ERROR: "投注彩種已關閉",
                                LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "投注玩法已關閉",
                                LGS_BETTING_AMOUNT_OVER_LIMITS: "您的投注金額已超過允許的上限",
                                LGS_ITEM_BETTING_AMOUNT_OVER_LIMITS: "%@的單注最大可投金額已超過允許的上限",
                                LGS_BETTING_MULTIPLE_OVER_LIMITS: "您的倍數超過允許的上限",
                                LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "投注返點值小於0",
                                LGS_BETTING_ILLEGAL_ERROR: "投注參數不符合規定，投注失敗！ ",
                                LGS_BETTING_WITH_INVALID_TOKEN_ERROR: "帳號已登出，請重新登錄",
                                LGS_CANCEL_ORDER_ARGUMENT_ERROR: "追號參數錯誤",
                                LGS_BETTING_NUMBER_OVER_LIMITS: "投注號碼%@達到當前庫存允許銷售的最大投注數額。",
                                ORDER_NOT_DRAWABLE: "訂單尚未開獎",
                                LGS_CANCEL_ORDER_INACTIVITY: "當前系統不能進行會員撤單",
                                LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "撤單手續費小於投注金額",
                                LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR: "低頻彩撤單有直選靚號",
                                LGS_BETTING_MODE_CLOSED_ERROR: "投注模式關閉不允許投注",
                                LGS_BETTING_MODE_NOT_ALLOW_ERROR: "不允許使用此投注模式",
                                SYSTEM_NOT_ALLOW_BETTING: "本期已封盤，請待下一期開始",
                                BETTING_ITEM_LIMIT: "訂單內容超出系統限制",
                                LGS_CANCEL_ORDER_NOT_AVAILABLE: "訂單已經鎖定，無法撤單",
                                ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "您的彩票餘額不足",
                                CANCEL_CHASE_ORDER_IS_NOT_LAST_START: "追號單需從最後一期開始撤單",
                                ORDER_IS_CANCELED: "該訂單已經撤單",
                                "account.balance.not.enough": "中心錢包餘額不足",
                                ACCOUNT_BALANCE_NOT_ENOUGH: "中心錢包餘額不足",
                                ACCOUNT_TRANSFER_EXCEED_MIN: "最低轉帳金額不可低於0.01元",
                                UNKNOWN_ERROR: "系統錯誤",
                                CONNECTION_ERROR_: "所在地區網速延遲，請稍後再試或與客服聯繫，謝謝！ ",
                                CANCEL_ORDER_FAILED: "撤單失敗",
                                CUSTOMER_LOGOUT_: "您還沒有登錄，請先登錄！ ",
                                DRAW_FAIL_ERROR_: "系統繁忙，投注失敗！ ",
                                NOT_SUPPORT_LANDSCAPE: "不支持橫屏",
                                CAN_NOT_BETTING_NOT_IN_SALE_TIME: "當前彩種暫時沒有開始銷售 請稍後再試",
                                LGS_HIT_DRAWBACK_NOT_AVAILABLE: "中獎即停不可使用",
                                LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS:
                                    "此號碼已超出當前期購買額度，請與客服聯繫",
                            }),
                            o(
                                n,
                                "LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS",
                                "以下號碼已超出當前期購買額度，請重新下注，剩餘可購買金額如下"
                            ),
                            o(n, "BETTING_STAKES_IS_OVER_LIMIT_STAKES", "投注注數已超過允許的上限"),
                            o(n, "ORDER_ALREADY_CANCELED", "該訂單已經撤單"),
                            o(n, "STAKES_IS_OVER_LIMIT_ERROR", "投注注數已超過允許的上限"),
                            o(n, "BALANCE_NOT_ENOUGH_ERROR", "餘額不足"),
                            o(n, "BETTING_AMOUNT_OVER_LIMITS_ERROR", "投注金額已超過允許的上限"),
                            o(n, "CALCULATE_BETTING_AMOUNT_ERROR", "投注失敗，請稍後再試或與客服聯繫！"),
                            o(n, "IILLEGAL_BALL_NUMBER_ERROR", "投注失敗，請稍後再試或與客服聯繫！"),
                            o(n, "ILLEGAL_BETTING_ARGUMENT_ERROR", "投注失敗，請稍後再試或與客服聯繫！"),
                            o(n, "SYSTEM_NOT_ALLOW_CHASE", "投注失敗，請稍後再試或與客服聯繫！"),
                            o(n, "NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR", "投注失敗，請稍後再試或與客服聯繫！"),
                            o(n, "CALCULATE_STAKES_ERROR", "投注失敗，請稍後再試或與客服聯繫！"),
                            o(n, "PLAY_NOT_SUPPORTED_ERROR", "玩法維護中，請稍後再試!"),
                            o(n, "BOOK_FAILED_ERROR", "請確認所有錢包資金，稍候再試！"),
                            o(n, "WALLET_NOT_EXISTS_ERROR", "請確認所有錢包資金，稍候再試！"),
                            o(n, "B2B_TX_FAILED", "請確認所有錢包資金，稍候再試！"),
                            o(n, "DEMO_NOT_SUPPORTED_ERROR", "不支援試玩"),
                            o(n, "ORDER_PRIZE_NOT_FOUND_ERROR", "獎金讀取失敗，請稍後再試!"),
                            o(n, "order_saved_failed", "訂單讀取失敗，請稍後再試!"),
                            o(n, "PLATFORM_SETTING_NOT_FOUND_ERROR", "玩法維護中，請稍後再試!"),
                            o(n, "PLAY_NOT_FOUND_ERROR", "玩法維護中，請稍後再試!"),
                            o(n, "GAME_SETTING_NOT_FOUND", "玩法維護中，請稍後再試!"),
                            o(n, "GAME_DRWW_TIME_PARSE_ERROR", "開獎時間讀取失敗，請稍後再試!"),
                            o(n, "ACCOUNT_NOT_FOUND_ERROR", "帳號異常請重新登入!"),
                            o(n, "GAME_URL_NOT_FOUND", "帳號異常請重新登入!"),
                            o(n, "INVALID_TOKEN", "帳號異常請重新登入!"),
                            o(n, "USER_NOT_LOGIN", "帳號異常請重新登入!"),
                            o(n, "CANCEL_ORDER_ERROR", "撤單失敗"),
                            o(n, "NOT_AVAILABLE_FOR_SALE_ERROR", "遊戲維護中，請稍後再試!"),
                            o(n, "INTERNAL_SERVER_ERROR", "系統錯誤"),
                            o(n, "OBJECT_NOT_EXIST", "系統錯誤"),
                            o(n, "ILLEGAL_PARAMS_VALUE", "系統錯誤"),
                            o(n, "BETTING_MULTIPLE_OVER_LIMITS_ERROR", "您的倍數超過允許的上限"),
                            o(n, "GAME_CLOSED_ERROR", "投注彩種已關閉"),
                            o(
                                n,
                                "STAKES_ABOVE_LIMIT",
                                "您好，平台规则不能全包投注，即同期同玩法投注%@以上的号码，故该注單平台暂不能受理，请修改您的投注内容再来下注，给您带来不便，还请谅解；"
                            ),
                            o(
                                n,
                                "PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR",
                                "投注號碼%@後二位相同數字每期允許銷售的最大投注數額%@元。"
                            ),
                            o(
                                n,
                                "BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS",
                                "投注號碼%@達到當前庫存允許銷售的最大投注數額。"
                            ),
                            o(
                                n,
                                "BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR",
                                "以下號碼已超出當前期購買額度，請重新下注，剩餘可購買金額如下"
                            ),
                            n),
                        gameHistoryCancel: "確定撤單？",
                        gameHistoryCancel_success: "撤單成功",
                        gameHistoryCancel_failed: "UNKNOWN_ERROR",
                        gameCode: { THAIGOV: "泰國彩", TCGTHGOV: "TCG泰彩" },
                        drawInterval: "開獎時間",
                        drawFrequency: "開獎頻率",
                        totalCount: "合計",
                        playRule: "玩法規則",
                        chooseFile: "上傳文件",
                        filterRepeat: "過濾重複/無效號",
                        betsNTotalAmount:
                            '您選擇了<div class="font-bold">%@</div>注，共<div class="font-bold">%@</div>元，',
                        predictionAmount: '單注最高可中<div class="red-words">%@</div>元',
                        willWin: "預計中獎金額",
                        filterResultMsg: "已經過濾%@组重複號，%@組無效號",
                        odds: "獎金",
                        amount: "金額",
                        multiple: "倍數",
                        syncMultipleBets: "批量修改倍數",
                        manualBetPlaceHolderSEA:
                            "每注之間可以用確認鍵丶空格[]丶逗號[,]或者分號[;]隔開\n請導入TXT文件丶複製或者輸入支持格式如下：",
                        gameName: "玩法名稱",
                        gameContent: "玩法內容",
                        odds1Time: "獎金/注",
                        betAmount: "注數",
                        drawPrize: {
                            specialPrize: "特等獎",
                            firstPrize: "一等獎",
                            secondPrize: "二等獎",
                            thirdPrize: "三等獎",
                            fourthPrize: "四等獎",
                            fifthPrize: "五等獎",
                            sixthPrize: "六等獎",
                            seventhPrize: "七等獎",
                            eighthPrize: "八等獎",
                        },
                    }
                );
                e.default = l;
            },
            2698: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    playId: {
                        2056: "上正",
                        2058: "上反",
                        2061: "上正",
                        2063: "上反",
                        2065: "直選加開",
                        2068: "後三不定位",
                        2055: "三數",
                        2057: "上正三位數",
                        2059: "上反三位數",
                        2643: "二等",
                        2644: "二特",
                        2645: "二等三位數",
                        2646: "二特三位數",
                        2675: "越式大小",
                        2676: "大小",
                        2677: "色碟",
                        2678: "大小",
                        2679: "單雙",
                        2680: "全紅",
                        2681: "全白",
                        2682: "3白+1紅",
                        2683: "3紅+1白",
                        2060: "二數",
                        2062: "上正二位數",
                        2064: "上反二位數",
                        2066: "下正二位數",
                        2067: "跑數",
                        2069: "上跑三位數",
                        2297: "魚蝦蟹",
                        2298: "魚蝦蟹",
                        2299: "魚蝦蟹",
                        2497: "番攤",
                        2498: "番",
                        2499: "番",
                        2500: "角",
                        2501: "角",
                        2502: "念",
                        2503: "念",
                        2504: "大小單雙",
                        2505: "大小單雙",
                        2480: "下正二位數（包注）",
                        2481: "下正二位數（輸入）",
                        2482: "上反二位數（包注）",
                        2483: "上正二位數（包注）",
                        2484: "上正二位數（輸入）",
                        2485: "上正三位數（包注）",
                        2486: "上正三位數（輸入）",
                        2487: "上反三位數（包注）",
                        2090: "四數",
                        2095: "三數",
                        2100: "二數",
                        2105: "跑數",
                        2515: "包膽",
                        2528: "包膽",
                        2550: "自選不中",
                        2560: "自選不中",
                        2598: "過關",
                        2608: "過關",
                        2300: "魚蝦蟹",
                        2488: "番攤",
                        2618: "骰寶快三",
                        2624: "第1-10名排名",
                        2627: "冠亞和值",
                        2630: "龍虎鬥",
                        2091: "上正",
                        2093: "上反",
                        2096: "上正",
                        2098: "上反",
                        2101: "上正",
                        2103: "下正",
                        2301: "鱼虾蟹",
                        2489: "番",
                        2491: "角",
                        2493: "念",
                        2495: "大小單雙",
                        2619: "單骰",
                        2620: "和值",
                        2621: "圍骰",
                        2622: "全圍",
                        2623: "大小單雙",
                        2625: "第1-10名排名",
                        2626: "第1-10名大小單雙",
                        2628: "冠亞和值",
                        2629: "冠亞和大小單雙",
                        2631: "龍虎鬥",
                        2516: "后二包膽",
                        2520: "后三包膽",
                        2524: "后四包膽",
                        2551: "四位不中",
                        2554: "八位不中",
                        2557: "十位不中",
                        2599: "過2關",
                        2602: "過3關",
                        2605: "過4關",
                        2584: "二數頭尾",
                        2529: "后二包膽",
                        2533: "后三包膽",
                        2537: "后四包膽",
                        2561: "四位不中",
                        2564: "八位不中",
                        2567: "十位不中",
                        2609: "過2關",
                        2612: "過3關",
                        2615: "過4關",
                        2591: "二數頭尾",
                        2106: "一等二星不定位",
                        2108: "二等二星不定位",
                        2579: "特等二星不定位",
                        2517: "後二包膽",
                        2521: "後三包膽",
                        2525: "後四包膽",
                        2530: "後二包膽",
                        2534: "後三包膽",
                        2538: "後四包膽",
                        2641: "後二包膽1K",
                        2642: "後二包膽1K",
                        2092: "上正四位數",
                        2094: "上反四位數",
                        2097: "上正三位數",
                        2099: "上反三位數",
                        2102: "上正二位數",
                        2104: "下正二位數",
                        2107: "上跑兩位數",
                        2109: "下跑兩位數",
                        2601: "過2關",
                        2604: "過3關",
                        2607: "過4關",
                        2611: "過2關",
                        2614: "過3關",
                        2617: "過4關",
                        2552: "任四不中 ",
                        2555: "任八不中 ",
                        2558: "任十不中 ",
                        2562: "任四不中",
                        2565: "任八不中",
                        2568: "任十不中",
                        2586: "二數頭尾",
                        2589: "二數頭",
                        2593: "二數頭尾",
                        2596: "二數頭",
                        2580: "特等十位",
                        2581: "特等個位",
                        2582: "一等十位",
                        2583: "一等個位",
                        2302: "魚蝦蟹",
                        2490: "番",
                        2492: "角",
                        2494: "念",
                        2496: "大小單雙",
                        2518: "後二包膽(包注)",
                        2519: "後二包膽(輸入)",
                        2522: "後三包膽(包注)",
                        2523: "後三包膽(輸入)",
                        2526: "後四包膽(包注)",
                        2527: "後四包膽(輸入)",
                        2553: "任四不中（輸入）",
                        2556: "任八不中（輸入）",
                        2559: "任十不中（輸入）",
                        2587: "二數頭尾（包注）",
                        2590: "二數頭（包注）",
                        2531: "後二包膽(包注)",
                        2532: "後二包膽(輸入)",
                        2535: "後三包膽(包注)",
                        2536: "後三包膽(輸入)",
                        2539: "後四包膽(包注)",
                        2540: "後四包膽(輸入)",
                        2563: "任四不中（輸入)",
                        2566: "任八不中（輸入)",
                        2569: "任十不中（輸入)",
                        2594: "二數頭尾（包注）",
                        2597: "二數頭（包注）",
                        2286: "上正四位數（包注）",
                        2287: "上正四位數（輸入）",
                        2284: "上正三位數（包注）",
                        2285: "上正三位數（輸入）",
                        2283: "上反三位數（包注）",
                        2279: "上正二位數（包注）",
                        2280: "上正二位數（輸入）",
                        2281: "下正二位數（包注）",
                        2282: "下正二位數（輸入）",
                        2127: "四數",
                        2132: "三數",
                        2137: "二數",
                        2142: "跑數",
                        2128: "上正",
                        2130: "上反",
                        2133: "上正",
                        2135: "上反",
                        2138: "上正",
                        2140: "下正",
                        2129: "上正四位數",
                        2131: "上反四位數",
                        2134: "上正三位數",
                        2136: "上反三位數",
                        2139: "上正二位數",
                        2141: "下正二位數",
                        2144: "上跑兩位數",
                        2146: "下跑兩位數",
                        2632: "一數",
                        2633: "一數 (個位)",
                        2634: "一數 (十位)",
                        2635: "一數 (百位)",
                        2636: "一數 (千位)",
                        263700: "一數",
                        2637: "一數 (個位)",
                        2638: "一數 (十位)",
                        2639: "一數 (百位)",
                        2640: "一數 (千位)",
                        2288: "上正二位数（包注）",
                        2289: "上正二位数（輸入）",
                        2290: "下正二位数（包注）",
                        2291: "下正二位数（輸入）",
                        2292: "上反三位数（包注）",
                        2293: "上正三位数（包注）",
                        2294: "上正三位数（輸入）",
                        2295: "上正四位数（包注）",
                        2296: "上正四位数（輸入）",
                        2303: "魚蝦蟹",
                        2304: "魚蝦蟹",
                        2305: "魚蝦蟹",
                        2506: "番攤",
                        2507: "番",
                        2508: "番",
                        2509: "角",
                        2510: "角",
                        2511: "念",
                        2512: "念",
                        2513: "大小單雙",
                        2514: "大小單雙",
                        2647: "任選",
                        2656: "趣味",
                        2648: "任選",
                        2657: "總和大小",
                        2658: "總和單雙",
                        2659: "總和過關",
                        2660: "上下盤",
                        2661: "奇偶盤",
                        2662: "五行",
                        2649: "任選一",
                        2650: "任選二",
                        2651: "任選三",
                        2652: "任選四",
                        2653: "任選五",
                        2654: "任選六",
                        2655: "任選七",
                    },
                };
                e.default = a;
            },
            1460: function(_, e, a) {
                var t;
                function n(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function i(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? n(Object(a), !0).forEach(function(e) {
                                  r(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : n(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function r(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var o = i(
                    i({}, ((t = a(2555)) && t.__esModule ? t : { default: t }).default),
                    {},
                    {
                        shoppingBasket: "rổ mua xổ số",
                        confirmBetting: "Đặt Cược",
                        clearBallText: "Xóa Tất Cả",
                        addToBetSlip: "Thêm vé cược",
                        betNow: "Cược Ngay",
                        betSuccess: "chúc mừng, đặt cược thành công",
                        confirmBetInfos: "hãy xác nhận thông tin đặt cược",
                        balance: "số tiền dư",
                        betAmountOverMaxAmount:
                            "số tiền đặt cược trước mắt của bạn lớn hơn số tiền lớn nhất có thể đặt , mô thức trước đó số tiền đặt cược lớn nhất là",
                        totalAmount: "tổng tiền",
                        currency: "tệ",
                        currencyThb: "",
                        confirm: "Đặt Cược",
                        winningAmount: "số tiền trúng giải",
                        betHistory: "lịch sử đặt cược",
                        bettingTime: "thời gian đặt cược",
                        orderNumber: "mã đơn đặt",
                        bettingAmount: "Số Tiền",
                        winningNumber: "KẾT QUẢ",
                        betNumber: "mã đặt cược",
                        openHistory: "lịch sử mở giải",
                        pastDraw: "KẾT QUẢ",
                        drawHistory: "lịch sử mở giải",
                        drawResult: "kết quả mở giải",
                        processing: "đang tiến hành",
                        betFail: "đặt cược thất bại",
                        betFailed: "tạo đơn hàng thất bại",
                        detail: "CHI TIẾT CƯỢC",
                        recentlyGames: "CƯỢC MỞ",
                        orderStatus: {
                            orderStatus_0: "toàn bộ",
                            orderStatus_2: "Thành Công",
                            orderStatus_4: "Cược Thắng",
                            orderStatus_5: "Cược Thua",
                            orderStatus_6: "Hủy bỏ",
                            orderStatus_7: "Hủy bỏ",
                            orderStatus_8: "Hủy bỏ",
                            orderStatus_12: "Hủy bỏ",
                            orderStatus_14: "chưa mở giải",
                            orderStatus_16: "Hoà",
                            orderStatus_17: "Hủy bỏ",
                            orderStatus_99: "đơn hàng vô hiệu",
                        },
                        betDigit: { THOUSANDS: "Nghìn", HUNDREDS: "Trăm", TENS: "Chục", ONES: "Đơn vị", COM: "Nhóm" },
                        pickRow: { all: "Tất cả", big: "Tài", small: "Xỉu", odd: "Lẻ", even: "Chẵn", clear: "Xóa" },
                        pk10Ranking: {
                            1: "Thứ 1",
                            2: "Thứ 2",
                            3: "Thứ 3",
                            4: "Thứ 4",
                            5: "Thứ 5",
                            6: "Thứ 6",
                            7: "Thứ 7",
                            8: "Thứ 8",
                            9: "Thứ 9",
                            10: "Thứ 10",
                        },
                        ball: {
                            fishPrawnCrab: { fish: "cá", prawn: "Tôm", crab: "cua" },
                            BSOE: { big: "Tài", small: "Xỉu", odd: "Lẻ", even: "Chẵn" },
                            K3_BSOE: { big: "Tài", small: "Xỉu", odd: "Lẻ", even: "Chẵn" },
                            PK10_BSOE: { big: "Tài", small: "Xỉu", odd: "Lẻ", even: "Chẵn" },
                            VNC_PK10_DragonTiger: { dragon: "Rồng", tiger: "Hổ" },
                            fanTanFan: { 1: "1 Fan", 2: "2 Fan", 3: "3 Fan", 4: "4 Fan" },
                            fanTanJiao: { "1_2": "1-2 Kwok", "1_4": "1-4 Kwok", "2_3": "2-3 Kwok", "3_4": "3-4 Kwok" },
                            fanTanNian: {
                                "1_2": "1 Nim 2",
                                "1_3": "1 Nim 3",
                                "1_4": "1 Nim 4",
                                "2_1": "2 Nim 1",
                                "2_3": "2 Nim 3",
                                "2_4": "2 Nim 4",
                                "3_1": "3 Nim 1",
                                "3_2": "3 Nim 2",
                                "3_4": "3 Nim 4",
                                "4_1": "4 Nim 1",
                                "4_2": "4 Nim 2",
                                "4_3": "4 Nim 3",
                            },
                            sicBoAllSurroundDice: { 1: "Bộ ba bất kỳ" },
                            sicBoDiceOdds: { 1: "ONE DICE", 2: "TWO DICE", 3: "THREE DICE" },
                            kenoFunBall: {
                                big: "Tài",
                                small: "Xỉu",
                                sumOdd: "TàiLẻ",
                                sumEven: "Chẳn",
                                sum: "Hòa",
                                bigSumOdd: "Tài&TàiLẻ",
                                bigSumEven: "Tài&Chẳn",
                                smallSumOdd: "Xỉu&TàiLẻ",
                                smallSumEven: "Xỉu&Chẳn",
                                up: "Trên",
                                down: "Dưới",
                                middle: "Hòa",
                                ballOdd: "Lẻ",
                                ballEven: "Chẵn",
                                equal: "Hòa",
                                gold: "Kim",
                                wood: "Mộc",
                                water: "Thủy",
                                fire: "Hỏa",
                                earth: "Thổ",
                            },
                        },
                        vxd: {
                            allRed: "4 Đỏ",
                            allWhite: "4 Trắng",
                            threeWoneR: "3 Trắng+1 Đỏ",
                            threeRoneW: "3 Đỏ+1 Trắng",
                        },
                        kenoAnySelector: {
                            up: "Trên",
                            down: "Dưới",
                            sumOdd: "TàiLẻ",
                            sumEven: "Chẳn",
                            upSumOdd: "Trên&TàiLẻ",
                            upSumEven: "Trên&Chẳn",
                            downSumOdd: "Dưới&TàiLẻ",
                            downSumEven: "Dưới&Chẳn",
                            clear: "Xóa",
                        },
                        kenoRoadmap: {
                            big: "B",
                            small: "S",
                            bigSmall: "B/S",
                            sum: "E",
                            sumOdd: "O",
                            sumEven: "E",
                            sumOddSumEven: "O/E",
                            up: "T",
                            down: "B",
                            upDown: "T/B",
                            middle: "-",
                            ballOdd: "O",
                            ballEven: "E",
                            ballOddBallEven: "O/T/E",
                            equal: "T",
                            gold: "-",
                            wood: "-",
                            water: "-",
                            fire: "-",
                            earth: "-",
                            WuXing: "5E",
                        },
                        prizeListPrizeType: {
                            VTX_BS_BIG: "Tài",
                            VTX_BS_SMALL: "Xỉu",
                            VXD_BS_BIG: "Tài",
                            VXD_BS_SMALL: "Xỉu",
                            VXD_OE_ODD: "Lẻ",
                            VXD_OE_EVEN: "Chẵn",
                            VXD_4R_1: "4 Đỏ",
                            VXD_4W_1: "4 Trắng",
                            VXD_3W1R_1: "3 Trắng + 1 Đỏ",
                            VXD_3R1W_1: "3 Đỏ + 1 Trắng",
                        },
                        errorCode: {
                            LGS_BETTING_GAME_CLOSED_ERROR: "trang đặt cược đã đóng",
                            LGS_BETTING_GAME_FESTIVAL_ERROR: "trang đặt cược đã đóng",
                            LGS_BETTING_GAME_PAUSED_ERROR: "trang đặt cược đã đóng",
                            LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "trang đặt cược đã đóng",
                            LGS_BETTING_AMOUNT_OVER_LIMITS:
                                "số tiền đặt cược của bạn đã vượt quá giới hạn trên cho phép",
                            LGS_BETTING_MULTIPLE_OVER_LIMITS:
                                "đặt cược có hiệu lực của bạn vượt quá giới hạn trên cho phép",
                            LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "lời nhuận đặt cược nhỏ hơn 0",
                            LGS_BETTING_ILLEGAL_ERROR: "tham số đặt cược không hợp quy định, đặt cược thất bại!",
                            LGS_BETTING_WITH_INVALID_TOKEN_ERROR: "số tài khoản đã đăng xuất, vui lòng đăng nhập lại",
                            LGS_CANCEL_ORDER_ARGUMENT_ERROR: "lỗi tham số nuôi số ",
                            LGS_BETTING_NUMBER_OVER_LIMITS:
                                "số %@ đặt cược đã đạt mức tối đa trong kho, Bạn có thể đặt cược cho lượt sau.",
                            ORDER_NOT_DRAWABLE: "đơn đặt chưa mở giải",
                            LGS_CANCEL_ORDER_INACTIVITY: "hệ thống trước đó không thể tiến hành rút đơn hội viên",
                            LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "phí thủ tục rút đơn nhỏ hơn số tiền đặt cược",
                            LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR:
                                "rút đơn vé tần xuất thấp có chọn ngay số đẹp",
                            LGS_BETTING_MODE_CLOSED_ERROR: "mô thức đặt cược đã đóng không cho phép đặt cược",
                            LGS_BETTING_MODE_NOT_ALLOW_ERROR: "không cho phép sử dụng mô thức đặt cược",
                            SYSTEM_NOT_ALLOW_BETTING: "kì này đã khóa bàn, xin đợi kì sau bắt đầu",
                            BETTING_ITEM_LIMIT: "nội dung đơn đặt hàng vượt quá giới hạn hệ thống",
                            LGS_CANCEL_ORDER_NOT_AVAILABLE: "đơn hàng đã bị khóa, không thể rút đơn",
                            ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "vé số của bạn số dư không đủ",
                            CANCEL_CHASE_ORDER_IS_NOT_LAST_START:
                                "đơn nuôi số cần phải từ thời kì cuối cùng bắt đầu rút đơn",
                            ORDER_IS_CANCELED: "đơn hàng này đã rút đơn",
                            "account.balance.not.enough": "số dư không đủ",
                            ACCOUNT_BALANCE_NOT_ENOUGH: "ví trung tâm số dư không đủ",
                            ACCOUNT_TRANSFER_EXCEED_MIN: "số tiền chuyển khoản nhỏ nhất không thể nhỏ hơn 0.01 tệ",
                            UNKNOWN_ERROR: "lỗi hệ thống",
                            CONNECTION_ERROR_:
                                "tốc độ mạng đang trì hoãn,vui lòng một lát sau thử lại hoặc liên hệ chăm sóc khác hàng, cảm ơn!",
                            CUSTOMER_LOGOUT_: "bạn chưa đăng nhập, vui lòng đăng nhập !",
                            DRAW_FAIL_ERROR_: "hệ thống bận, đặt cược thất bại!",
                            NOT_SUPPORT_LANDSCAPE: "không hỗ trợ để ngang màn hình",
                            LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS: "đặt cược đã đạt mức tối đa trong kho",
                            BETTING_STAKES_IS_OVER_LIMIT_STAKES: "Cược đặt cược vượt quá giới hạn",
                            ORDER_ALREADY_CANCELED: "đơn hàng này đã rút đơn",
                            STAKES_IS_OVER_LIMIT_ERROR: "Cược đặt cược vượt quá giới hạn",
                            BALANCE_NOT_ENOUGH_ERROR: "Không Đủ Số Dư Để Đặt Cược",
                            BETTING_AMOUNT_OVER_LIMITS_ERROR: "Vượt quá số lượng cược tối đa",
                            CALCULATE_BETTING_AMOUNT_ERROR: "Chi tiết vé cược không được công nhận. Vui lòng thử lại.",
                            IILLEGAL_BALL_NUMBER_ERROR: "Chi tiết vé cược không được công nhận. Vui lòng thử lại.",
                            ILLEGAL_BETTING_ARGUMENT_ERROR: "Chi tiết vé cược không được công nhận. Vui lòng thử lại.",
                            SYSTEM_NOT_ALLOW_CHASE: "Chi tiết vé cược không được công nhận. Vui lòng thử lại.",
                            NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR:
                                "Chi tiết vé cược không được công nhận. Vui lòng thử lại.",
                            CALCULATE_STAKES_ERROR: "Chi tiết vé cược không được công nhận. Vui lòng thử lại.",
                            PLAY_NOT_SUPPORTED_ERROR: "Trò chơi đang được bảo trì, vui lòng thử lại sau!",
                            BOOK_FAILED_ERROR: "Đang thu hồi ngân sách tất cả các  ,Xin vui lòng chờ!",
                            WALLET_NOT_EXISTS_ERROR: "Đang thu hồi ngân sách tất cả các  ,Xin vui lòng chờ!",
                            B2B_TX_FAILED: "Đang thu hồi ngân sách tất cả các  ,Xin vui lòng chờ!",
                            DEMO_NOT_SUPPORTED_ERROR: "Vui lòng đăng nhập bằng tài khoản chính thức của bạn",
                            ORDER_PRIZE_NOT_FOUND_ERROR: "Không có tiền cược!",
                            ORDER_SAVED_FAILED: "Không đọc được đơn đặt hàng, vui lòng thử lại sau!",
                            PLATFORM_SETTING_NOT_FOUND_ERROR: "Trò chơi đang được bảo trì, vui lòng thử lại sau!",
                            NOT_AVAILABLE_FOR_SALE_ERROR: "Trò chơi đang được bảo trì, vui lòng thử lại sau!",
                            PLAY_NOT_FOUND_ERROR: "Trò chơi đang được bảo trì, vui lòng thử lại sau!",
                            GAME_SETTING_NOT_FOUND: "Trò chơi đang được bảo trì, vui lòng thử lại sau!",
                            GAME_DRWW_TIME_PARSE_ERROR: "Không đọc được thời gian rút thăm, vui lòng thử lại sau!",
                            ACCOUNT_NOT_FOUND_ERROR: "Vui lòng đăng nhập bằng tài khoản chính thức của bạn",
                            GAME_URL_NOT_FOUND: "Vui lòng đăng nhập bằng tài khoản chính thức của bạn",
                            INVALID_TOKEN: "Vui lòng đăng nhập bằng tài khoản chính thức của bạn",
                            USER_NOT_LOGIN: "Vui lòng đăng nhập bằng tài khoản chính thức của bạn",
                            CANCEL_ORDER_ERROR: "Hủy đơn hàng không hợp lệ",
                            INTERNAL_SERVER_ERROR: "lỗi hệ thống",
                            OBJECT_NOT_EXIST: "lỗi hệ thống",
                            ILLEGAL_PARAMS_VALUE: "lỗi hệ thống",
                            BETTING_MULTIPLE_OVER_LIMITS_ERROR:
                                "đặt cược có hiệu lực của bạn vượt quá giới hạn trên cho phép",
                            GAME_CLOSED_ERROR: "trang đặt cược đã đóng",
                            STAKES_ABOVE_LIMIT:
                                "Chào bạn, Quy định đặt cược là không được bao toàn bộ số, nghĩa là cùng 1 kỳ cùng 1 kiểu chơi cược quá %@ tổng các số. Nên đơn cược này tạm thời không được chấp nhận. Xin vui lòng sửa lại nội dung đơn cược. Mọi bất tiện xin quý khách vui lòng bỏ qua.",
                            PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                "Đặt cược tối đa %@2/ số %@1 đối với các số có 2 chữ số cuối giống nhau.",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS:
                                "số %@ đặt cược đã đạt mức tối đa trong kho, Bạn có thể đặt cược cho lượt sau.",
                            BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR: "đặt cược đã đạt mức tối đa trong kho",
                        },
                        gameHistoryCancel: "xác nhận bỏ đơn",
                        gameHistoryCancel_success: "bỏ đơn thành công",
                        gameHistoryCancel_failed: "UNKNOWN_ERROR",
                        gameCode: { THAIGOV: "xổ số chính phủ thái lan", TCGTHGOV: "xổ số TCG" },
                        availableAt: "Có sẵn tại",
                        and: "Và",
                        batchModify: "Chỉnh sửa nhiều giá trị trong 1 lần",
                        cancelBet: "Huỷ",
                        containNumber: "Chứa số",
                        exceedLimitedAmount: "Vượt quá số tiền đặt cược tối đa",
                        gameRule: "Luật chơi của các loại xổ số",
                        lookPrizeInfo: "Kiểm tra thông tin mở thưởng",
                        noRecordFound: "Không có hồ sơ",
                        playList: "Danh sách luật chơi",
                        playComparisonNumero: "So sánh xu hướng biến động của số kết quả",
                        quickSelect: "Sàng lọc nhanh",
                        tensNumber: "Mười chữ số",
                        unitsNumber: "Số hàng đơn vị",
                        underMaintenance: "Đang bảo trì",
                        award: "Lịch sử mở thưởng",
                        shuffleBet: "Cược thẻ",
                        noRecord: "Chưa có hồ sơ",
                        win: "Tiền thưởng",
                        minimumBetPerBet: "Số tiền tối thiểu của 1 lần cược",
                        betAmountMax: "Số tiền tối đa của 1 lần cược",
                        betAmountMaxByNumero: "Số tiền đặt cược tối đa trong một kì",
                        drawFrequencyInfoByDay: "%@ Mỗi ngày",
                        erease: "Về 0 ",
                        backSpace: "Trả về",
                        today: "Hôm Nay",
                        yesterday: "Hôm Qua",
                        lastSevenDays: "7 Ngày Gần Nhất",
                        thaiRuletit: "Luật chơi và Số mở thưởng của xổ số Thái Lan",
                        thaiEveryMonth: "Xổ số của chính phủ Thái Lan sẽ quay vào 15.20 ngày 1 và 16 mỗi tháng",
                        thaiIfChangeDate: "(Nếu bạn thay đổi ngày hoặc giờ, vui lòng theo dõi trang web chính thức)",
                        thaiPlayComparison:
                            "Vui lòng tham khảo hình bên dưới để so sánh xu hướng biến động của số  kết quả",
                        thaiIfVoid:
                            "Lưu ý: Hủy cược nếu lần cược chính thức này hết hạn ,không xuất hiện số kết quả, tiến hành vào lượt kế tiếp",
                        firstPrize: "Giải nhất",
                        secondPrize: "Giải nhì",
                        secondPrizeSpecial: "Giải nhì đặc biệt",
                        SpecialPrize: "Số đặc biệt",
                        hnRuletit: "Quy tắc xổ số Việt Nam (Hà Nội)",
                        hnEverysix: "Xổ số Hà Nội Việt Nam sẽ được quay vào lúc 18:00 mỗi ngày ",
                        hnPlaynumLookdown:
                            "Vui lòng tham khảo hình bên dưới để so sánh xu hướng biến động của số  kết quả",
                        hnVoidnext:
                            "Lưu ý: Hủy cược nếu lần cược chính thức này hết hạn ,không xuất hiện số kết quả, tiến hành vào lượt kế tiếp",
                        vncFirstPrize: "Giải nhất",
                        officialSite: "Trang Chính Thức",
                        drawFrequency: "Tần số quay",
                        chooseFile: "tải lên",
                        filterRepeat: "Xóa số trùng lặp",
                        betsNTotalAmount:
                            'Đã chọn<div class="font-bold">%@</div>số，Số Tiền Cược<div class="font-bold">%@</div>，',
                        predictionAmount: 'Tiền thắng<div class="red-words">%@</div>',
                        willWin: "Tỷ Lệ Cược",
                        filterResultMsg: "trùng lặp %@ không hợp lệ %@",
                        odds: "Tỉ lệ",
                        amount: "Trên mỗi cược",
                        multiple: "Cấp Số Nhân",
                        syncMultipleBets: "Đồng bộ cược",
                        manualBetPlaceHolderSEA:
                            'Giữa mỗi cược cần phân cách bởi dấu chấm phẩy ";" hoặc dấu phẩy\n"," hoặc khoảng trắng " "\nSử dụng tệp TXT hoặc dán Ví dụ:',
                        gameName: "Tên Cược",
                        gameContent: "Số Cược",
                        odds1Time: "Tiền Thắng / 1 Lần",
                        betAmount: "Tổng Cược",
                        query: "Tìm Kiếm",
                        drawPrize: {
                            specialPrize: "Giải ĐB",
                            firstPrize: "Giải nhất",
                            secondPrize: "Giải nhì",
                            thirdPrize: "Giải ba",
                            fourthPrize: "Giải tư",
                            fifthPrize: "Giải năm",
                            sixthPrize: "Giải sáu",
                            seventhPrize: "Giải bảy",
                            eighthPrize: "Giải tám",
                        },
                    }
                );
                e.default = o;
            },
            2555: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    playId: {
                        2056: "Chính Xác",
                        2058: "Bất Kỳ",
                        2061: "Chính Xác",
                        2063: "Bất Kỳ",
                        2065: "chọn ngay thêm mở",
                        2068: "sau 3 không định vị",
                        2055: "3 số",
                        2057: "3 Càng Đặc Biệt",
                        2059: "Xiên 3 Đặc Biệt",
                        2643: "Giải Nhì",
                        2644: "Giải Nhì Đặt Biệt",
                        2645: "3 Càng Giải Nhì",
                        2646: "3 Càng Giải Nhì Đặt Biệt",
                        2675: "Tài Xỉu",
                        2676: "Tài Xỉu",
                        2677: "Xóc Đĩa",
                        2678: "Tài Xỉu",
                        2679: "Lẻ Chẵn",
                        2680: "4 Đỏ",
                        2681: "4 Trắng",
                        2682: "3 Trắng + 1 Đỏ",
                        2683: "3 Đỏ + 1 Trắng",
                        2060: "2 số",
                        2062: "Đề Đặc Biệt",
                        2064: "Xiên 2 Giải Nhất",
                        2066: "Đề Giải Nhất",
                        2067: "chạy số",
                        2069: "Xiên Số Giải Nhất",
                        2480: "Đề Giải Nhất- Chọn Số",
                        2481: "Đề Giải Nhất - Nhập Số",
                        2482: "Xiên 2 Giải Nhất - Chọn Số",
                        2483: "Đề Đặc Biệt - Chọn Số",
                        2484: "Đề Đặc Biệt - Nhập Số",
                        2485: "3 Càng Đặc Biệt - Chọn Số",
                        2486: "3 Càng Đặc Biệt - Nhập Số",
                        2487: "Xiên 3 Đặc Biệt - Chọn Số",
                        2297: "cược Bầu Cua",
                        2298: "cược Bầu Cua",
                        2299: "cược Bầu Cua",
                        2497: "FanTan",
                        2498: "Fan",
                        2499: "Fan",
                        2500: "Kwok",
                        2501: "Kwok",
                        2502: "Nim",
                        2503: "Nim",
                        2504: "TàiXỉuLẻChẵn",
                        2505: "TàiXỉuLẻChẵn",
                        2090: "4 Càng",
                        2095: "3 Càng",
                        2100: "Đánh Đề",
                        2105: "Đầu Đuôi",
                        2515: "Bao Lô",
                        2528: "Bao Lô",
                        2550: "Lô Trượt",
                        2560: "Lô Trượt",
                        2598: "Lô Xiên",
                        2608: "Lô Xiên",
                        2300: "Bầu Cua",
                        2488: "FanTan",
                        2618: "Siêu Sicbo",
                        2624: "Vị trí xếp hạng",
                        2627: "Tổng thứ 1 và thứ 2",
                        2630: "Rồng vs Hổ",
                        2091: "Chính Xác",
                        2093: "Bất Kỳ",
                        2096: "Chính Xác",
                        2098: "Bất Kỳ",
                        2101: "Chính Xác",
                        2103: "Bất Kỳ",
                        2301: "Bầu Cua",
                        2489: "Fan",
                        2491: "Kwok",
                        2493: "Nim",
                        2495: "TàiXỉuLẻChẵn",
                        2619: "Bất kỳ 1",
                        2620: "Tổng",
                        2621: "Bộ 3 số nhất định",
                        2622: "Bộ 3 bất kỳ",
                        2623: "TàiXỉuLẻChẵn",
                        2625: "Vị trí xếp hạng",
                        2626: "TXLC",
                        2628: "Tổng thứ 1 và thứ 2",
                        2629: "Tổng lớn nhỏ",
                        2631: "Rồng vs Hổ",
                        2516: "Lô 2 Số",
                        2520: "Lô 3 Số",
                        2524: "Lô 4 Số",
                        2551: "Trượt Xiên 4",
                        2554: "Trượt Xiên 8",
                        2557: "Trượt Xiên 10",
                        2599: "Xiên 2",
                        2602: "Xiên 3",
                        2605: "Xiên 4",
                        2584: "Đề Đầu Đuôi-Nhanh",
                        2529: "Lô 2 Số",
                        2533: "Lô 3 Số",
                        2537: "Lô 4 Số",
                        2561: "Trượt Xiên 4",
                        2564: "Trượt Xiên 8",
                        2567: "Trượt Xiên 10",
                        2609: "Xiên 2",
                        2612: "Xiên 3",
                        2615: "Xiên 4",
                        2591: "Đề Đầu Đuôi-Nhanh",
                        2106: "一等二星不定位",
                        2108: "二等二星不定位",
                        2579: "特等二星不定位",
                        2092: "4 Càng Đặc Biệt",
                        2094: "Xiên 4 Đặc Biệt",
                        2097: "3 Càng Đặc Biệt",
                        2099: "Xiên 3 Đặc Biệt",
                        2102: "Đề Đặc Biệt",
                        2104: "Đề Giải Nhất",
                        2107: "Xiên Đăc Biệt",
                        2109: "Xiên Giải Nhất",
                        2601: "Xiên 2",
                        2604: "Xiên 3",
                        2607: "Xiên 4",
                        2611: "Xiên 2",
                        2614: "Xiên 3",
                        2617: "Xiên 4",
                        2552: "Trượt Xiên 4",
                        2555: "Trượt Xiên 8",
                        2558: "Trượt Xiên 10",
                        2562: "Trượt Xiên 4",
                        2565: "Trượt Xiên 8",
                        2568: "Trượt Xiên 10",
                        2517: "Lô 2 Số",
                        2521: "Lô 3 Số",
                        2525: "Lô 4 Số",
                        2530: "Lô 2 Số",
                        2534: "Lô 3 Số",
                        2538: "Lô 4 Số",
                        2641: "Lô 2 Số 1K",
                        2642: "Lô 2 Số 1K",
                        2586: "Đề Đầu Đuôi",
                        2589: "Đề Giải 7",
                        2593: "Đề Đầu Đuôi",
                        2596: "Đề Đầu",
                        2580: "Đầu Đặc Biệt ",
                        2581: "Đuôi Đặc Biệt",
                        2582: "Đầu Giải Nhất",
                        2583: "Đuôi Giải Nhất",
                        2302: "Bầu Cua",
                        2490: "Fan",
                        2492: "Kwok",
                        2494: "Nim",
                        2496: "TàiXỉuLẻChẵn",
                        2518: "Lô 2 Số - Chọn Số",
                        2519: "Lô 2 Số - Nhập Số",
                        2522: "Lô 3 Số - Chọn Số",
                        2523: "Lô 3 Số - Nhập Số",
                        2526: "Lô 4 Số - Chọn Số",
                        2527: "Lô 4 Số - Nhập Số",
                        2553: "Trượt Xiên 4 - Nhập Số",
                        2556: "Trượt Xiên 8 - Nhập Số",
                        2559: "Trượt Xiên 10 - Nhập Số",
                        2587: "Đề Đầu Đuôi-Chọn Số",
                        2590: "Đề Giải 7-Chọn Số",
                        2531: "Lô 2 Số - Chọn Số",
                        2532: "Lô 2 Số - Nhập Số",
                        2535: "Lô 3 Số - Chọn Số",
                        2536: "Lô 3 Số - Nhập Số",
                        2539: "Lô 4 Số - Chọn Số",
                        2540: "Lô 4 Số - Nhập Số",
                        2563: "Trượt Xiên 4 - Nhập Số",
                        2566: "Trượt Xiên 8 - Nhập Số",
                        2569: "Trượt Xiên 10 - Nhập Số",
                        2594: "Đề Đầu Đuôi-Chọn Số",
                        2597: "Đề Đầu-Chọn Số",
                        2286: "4 Càng Đặc Biệt - Chọn Số",
                        2287: "4 Càng Đặc Biệt - Nhập Số",
                        2284: "3 Càng Đặc Biệt - Chọn Số",
                        2285: "3 Càng Đặc Biệt - Nhập Số",
                        2283: "Xiên 3 Đặc Biệt - Chọn Số",
                        2279: "Đề Đặc Biệt - Chọn Số",
                        2280: "Đề Đặc Biệt - Nhập Số",
                        2281: "Đề Giải Nhất- Chọn Số",
                        2282: "Đề Giải Nhất - Nhập Số",
                        2127: "4 số",
                        2132: "3 số",
                        2137: "2 số",
                        2142: "chạy số",
                        2128: "Chính Xác",
                        2130: "Bất Kỳ",
                        2133: "Chính Xác",
                        2135: "Bất Kỳ",
                        2138: "Chính Xác",
                        2140: "Chính Xác",
                        2129: "4 Càng Đặc Biệt",
                        2131: "Xiên 4 Đặc Biệt",
                        2134: "3 Càng Đặc Biệt",
                        2136: "Xiên 3 Đặc Biệt",
                        2139: "Đề Đặc Biệt",
                        2141: "Đề Giải Nhất",
                        2144: "Xiên Đăc Biệt",
                        2146: "Xiên Giải Nhất",
                        2632: "VỊ TRÍ",
                        2633: "VỊ TRÍ (Đơn vị)",
                        2634: "VỊ TRÍ (Chục)",
                        2635: "VỊ TRÍ (Trăm)",
                        2636: "VỊ TRÍ (Nghìn)",
                        263700: "VỊ TRÍ",
                        2637: "VỊ TRÍ (Đơn vị)",
                        2638: "VỊ TRÍ (Chục)",
                        2639: "VỊ TRÍ (Trăm)",
                        2640: "VỊ TRÍ (Nghìn)",
                        2288: "Đề Đặc Biệt - Chọn Số",
                        2289: "Đề Đặc Biệt - Nhập Số",
                        2290: "Đề Giải Nhất- Chọn Số",
                        2291: "Đề Giải Nhất - Nhập Số",
                        2292: "Xiên 3 Đặc Biệt - Chọn Số",
                        2293: "3 càng đặc biệt - chọn số",
                        2294: "3 càng đặc biệt - nhập số",
                        2295: "4 Càng Đặc Biệt - Chọn Số",
                        2296: "4 Càng Đặc Biệt - Nhập Số",
                        2303: "cược Bầu Cua",
                        2304: "cược Bầu Cua",
                        2305: "cược Bầu Cua",
                        2506: "FanTan",
                        2507: "Fan",
                        2508: "Fan",
                        2509: "Kwok",
                        2510: "Kwok",
                        2511: "Nim",
                        2512: "Nim",
                        2513: "TàiXỉuLẻChẵn",
                        2514: "TàiXỉuLẻChẵn",
                        2647: "Chọn",
                        2656: "Kết hợp",
                        2648: "Chọn",
                        2657: "Lớn, Điểm cũ, Nhỏ",
                        2658: "Lẻ, Chẵn",
                        2659: "Xiên Lớn Nhỏ, Lẻ Chẵn",
                        2660: "Trên, Hòa, Dưới",
                        2661: "Lẻ, Hòa, Chẳn",
                        2662: "Năm yếu tố",
                        2649: "Chọn 1",
                        2650: "Chọn 2",
                        2651: "Chọn 3",
                        2652: "Chọn 4",
                        2653: "Chọn 5",
                        2654: "Chọn 6",
                        2655: "Chọn 7",
                    },
                };
                e.default = a;
            },
            8286: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    baseGame: {
                        gameCode: {
                            FFC: "天成分分彩",
                            WFC: "天成1.5分彩",
                            SSC: "天成五分彩",
                            PK10: "天成PK10",
                            "11X5": "天成十一选五",
                            "3MC": "天成30秒彩",
                        },
                    },
                };
                e.default = a;
            },
            8249: function(_, e, a) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var t,
                    n = o(a(2123)),
                    i = o(a(8286)),
                    r = o(a(3321));
                function o(_) {
                    return _ && _.__esModule ? _ : { default: _ };
                }
                function l(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function u(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? l(Object(a), !0).forEach(function(e) {
                                  s(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : l(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function s(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                var d = u(
                    u(
                        u({}, n.default),
                        {},
                        {
                            bettingApproach: { 1: "标准选号", 2: "单式选号", 3: "复式选号" },
                            prizeMode: { Lott: "官方", Tradition: "官方", ZY: "智贏" },
                            betDigit: {
                                TEN_THOUSANDS: "万位",
                                THOUSANDS: "千位",
                                HUNDREDS: "百位",
                                TENS: "十位",
                                ONES: "个位",
                                FC3D_HUNDREDS: "百位",
                                FC3D_TENS: "十位",
                                FC3D_ONES: "个位",
                                COM: "组选",
                                COM3: "组三",
                                COM6: "组六",
                                SINGLE: "单号",
                                REPEAT2: "二重号",
                                REPEAT3: "三重号",
                                REPEAT4: "四重号",
                                SPEC: "特殊",
                                FIRST: "第一位",
                                SECOND: "第二位",
                                THIRD: "第三位",
                                FOURTH: "第四位",
                                FIFTH: "第五位",
                                PK10_FIRST: "冠军",
                                PK10_SECOND: "亚军",
                                PK10_THIRD: "季军",
                                PK10_FOURTH: "第四名",
                                PK10_FIFTH: "第五名",
                                PK10_SIXTH: "第六名",
                                PK10_SEVENTH: "第七名",
                                PK10_EIGHTH: "第八名",
                                PK10_NINTH: "第九名",
                                PK10_TENTH: "第十名",
                                STRAIGHT_COM: "直组",
                                SUM: "和值",
                                DAN: "胆码",
                                DAN1: "一胆",
                                DAN2: "二胆",
                                DAN3: "三胆",
                                ANY1: "任选一",
                                ANY2: "任选二",
                                ANY3: "任选三",
                                ANY4: "任选四",
                                ANY5: "任选五",
                                ANY6: "任选六",
                                ANY7: "任选七",
                                ANY8: "任选八",
                                MIDDLE: "猜中位",
                                FIRST2_SUM: "冠亚和",
                                FIRST3_SUM: "冠亚季和",
                                FIRST_LAST_SUM: "首尾和",
                                DRAGON_TIGER: "龙vs虎",
                                DRAGON_TIGER_TIE: "龙虎和",
                                Single_Same_3_K3: "三同号单选",
                                NEW_DRAGON_TIGER: "龙vs虎",
                                All_Same_3_K3: "三同号通选",
                                Different_3_K3: "三不同号",
                                All_Different_3_K3: "三不同号通选",
                                All_Same_2_K3: "二同号通选",
                                All_Even_3_K3: "三连号通选",
                                Single_2_Same: "同号",
                                Single_2_Not_Same: "不同号",
                                Multi_Same_2_K3: "二同号复选",
                                Different_2_K3: "二不同号",
                                Sum_BS_OE_K3: "和值大小单双",
                                Sum_Com_BS_OE_K3: "和值组合大小单双",
                                Any_Code_Win_K3: "猜必出",
                                Any_Code_Not_Win_K3: "猜必不出",
                                Show_Hand: "梭哈",
                                Boazi_K3: "豹子",
                                Straight_K3: "全顺",
                                Com_3_K3: "对子",
                                Half_Straight_K3: "半顺",
                                Different_SH_3_K3: "杂三",
                                filterRepeat: "过滤重复号",
                                BAO_DAN: "包胆",
                                SPAN: "跨度",
                                BACCARAT: "百家乐",
                                Two_Num_Any_Code_4D: "二字现",
                                Three_Num_Any_Code_4D: "三字现",
                                TUO: "拖码",
                            },
                            startDigit: {
                                ones: "（个）",
                                tens: "（十）",
                                hundreds: "（百）",
                                thousands: "（千）",
                                tenThousands: "（万）",
                                ones2: "个",
                                tens2: "十",
                                hundreds2: "百",
                                thousands2: "千",
                                tenThousands2: "万",
                                first: "（第一位）",
                                second: "（第二位）",
                                third: "（第三位）",
                                fourth: "（第四位）",
                                fifth: "（第五位）",
                                pk10_first: "（冠军）",
                                pk10_second: "（亚军）",
                                pk10_third: "（季军）",
                                pk10_fourth: "（第四名）",
                                pk10_fifth: "（第五名）",
                                pk10_sixth: "（第六名）",
                                pk10_seventh: "（第七名）",
                                pk10_eighth: "（第八名）",
                                pk10_ninth: "（第九名）",
                                pk10_tenth: "（第十名）",
                            },
                            betMode: {
                                1: "元",
                                2: "角",
                                3: "分",
                                4: "厘",
                                5: "十",
                                6: "百",
                                7: "千",
                                Thousand: "千",
                                Hundred: "百",
                                Ten: "十",
                                Dollar: "元",
                                Dime: "角",
                                Cent: "分",
                                Thousandth: "厘",
                                USD: "美元",
                            },
                            pk10Ranking: {
                                1: "第1名",
                                2: "第2名",
                                3: "第3名",
                                4: "第4名",
                                5: "第5名",
                                6: "第6名",
                                7: "第7名",
                                8: "第8名",
                                9: "第9名",
                                10: "第10名",
                            },
                            ball: {
                                PC: { prime: "质", composite: "合" },
                                BSOE: { big: "大", small: "小", odd: "单", even: "双", tie: "和" },
                                K3_BSOE: { big: "大", small: "小", odd: "单", even: "双" },
                                PK10_BSOE: { big: "大", small: "小", odd: "单", even: "双" },
                                VNC_PK10_DragonTiger: { dragon: "龙", tiger: "虎" },
                                OECounts: {
                                    "05": "0单5双",
                                    14: "1单4双",
                                    23: "2单3双",
                                    32: "3单2双",
                                    41: "4单1双",
                                    50: "5单0双",
                                },
                                GroupENT: { 0: "豹子", 1: "顺子", 2: "对子", 3: "杂六", 4: "半顺" },
                                dragonTiger: { dragon: "龙", tiger: "虎" },
                                dragonTigerTie: {
                                    dragon: "龙",
                                    dragonOdd: "龙单",
                                    dragonEven: "龙双",
                                    tiger: "虎",
                                    tigerOdd: "虎单",
                                    tigerEven: "虎双",
                                    tie: "和",
                                },
                                k3: {
                                    All_Same_3_K3: "三同号通选",
                                    All_Even_3_K3: "三连号通选",
                                    All_Same_2_K3: "二同号通选",
                                    All_Different_3_K3: "三不同号通选",
                                    Single_Same_3_K3_ball_1: "111",
                                    Single_Same_3_K3_ball_2: "222",
                                    Single_Same_3_K3_ball_3: "333",
                                    Single_Same_3_K3_ball_4: "444",
                                    Single_Same_3_K3_ball_5: "555",
                                    Single_Same_3_K3_ball_6: "666",
                                    Single_2_Same_ball_1: "11",
                                    Single_2_Same_ball_2: "22",
                                    Single_2_Same_ball_3: "33",
                                    Single_2_Same_ball_4: "44",
                                    Single_2_Same_ball_5: "55",
                                    Single_2_Same_ball_6: "66",
                                    Boazi_K3: "豹子",
                                    Straight_K3: "全顺",
                                    Com_3_K3: "对子",
                                    Half_Straight_K3: "半顺",
                                    Different_SH_3_K3: "杂三",
                                },
                                NN: { NNNoHave: "无", NuNu: "牛" },
                                comBSOE: { bigOdd: "大单", bigEven: "大双", smallOdd: "小单", smallEven: "小双" },
                                sumBSOE: {
                                    0: "总和大",
                                    1: "总和小",
                                    2: "总和单",
                                    3: "总和双",
                                    "0_2": "总和大单",
                                    "0_3": "总和大双",
                                    "1_2": "总和小单",
                                    "1_3": "总和小双",
                                },
                                baccarat: {
                                    banker: "庄",
                                    player: "闲",
                                    tie: "和",
                                    bankerPair: "庄对",
                                    playerPair: "闲对",
                                },
                                redBlackNum: { red: "红", black: "黑" },
                                fishPrawnCrab: { fish: "鱼", prawn: "大虾", crab: "螃蟹" },
                                fanTanFan: { 1: "1番", 2: "2番", 3: "3番", 4: "4番" },
                                fanTanJiao: { "1_2": "1-2角", "1_4": "1-4角", "2_3": "2-3角", "3_4": "3-4角" },
                                fanTanNian: {
                                    "1_2": "1念2",
                                    "1_3": "1念3",
                                    "1_4": "1念4",
                                    "2_1": "2念1",
                                    "2_3": "2念3",
                                    "2_4": "2念4",
                                    "3_1": "3念1",
                                    "3_2": "3念2",
                                    "3_4": "3念4",
                                    "4_1": "4念1",
                                    "4_2": "4念2",
                                    "4_3": "4念3",
                                },
                                sicBoAllSurroundDice: { 1: "全围" },
                                sicBoDiceOdds: { 1: "单骰", 2: "双骰", 3: "三骰" },
                                kenoFunBall: {
                                    big: "大",
                                    small: "小",
                                    sumOdd: "单",
                                    sumEven: "双",
                                    sum: "和",
                                    bigSumOdd: "大单",
                                    bigSumEven: "大双",
                                    smallSumOdd: "小单",
                                    smallSumEven: "小双",
                                    up: "上",
                                    down: "下",
                                    middle: "中",
                                    ballOdd: "奇",
                                    ballEven: "偶",
                                    equal: "和",
                                    gold: "金",
                                    wood: "木",
                                    water: "水",
                                    fire: "火",
                                    earth: "土",
                                },
                                KENO: {
                                    sum: "和值:%@",
                                    big: "大",
                                    small: "小",
                                    equal: "和",
                                    up: "上",
                                    down: "下",
                                    middle: "中",
                                    single: "奇",
                                    pair: "偶",
                                    odd: "单",
                                    even: "双",
                                    golden: "金",
                                    wood: "木",
                                    water: "水",
                                    fire: "火",
                                    earth: "土",
                                    none: "-",
                                },
                            },
                            vxd: { allRed: "全红", allWhite: "全白", threeWoneR: "3白+1红", threeRoneW: "3红+1白" },
                            kenoAnySelector: {
                                up: "上",
                                down: "下",
                                sumOdd: "单",
                                sumEven: "双",
                                upSumOdd: "上单",
                                upSumEven: "上双",
                                downSumOdd: "下单",
                                downSumEven: "下双",
                                clear: "清",
                            },
                            kenoRoadmap: {
                                big: "大",
                                small: "小",
                                bigSmall: "大小",
                                sum: "和",
                                sumOdd: "单",
                                sumEven: "双",
                                sumOddSumEven: "单双",
                                up: "上",
                                down: "下",
                                upDown: "上下",
                                middle: "中",
                                ballOdd: "奇",
                                ballEven: "偶",
                                ballOddBallEven: "奇偶",
                                equal: "和",
                                gold: "金",
                                wood: "木",
                                water: "水",
                                fire: "火",
                                earth: "土",
                                WuXing: "五行",
                            },
                            gameGroupCode: {
                                SSC: "时时彩",
                                "11X5": "十一选五",
                                LF: "低频彩",
                                PK10: "PK10",
                                LHC: "六合彩",
                                TC: "视频彩",
                                PCB: "PC蛋蛋",
                                KENO: "快乐8",
                                K3: "快三",
                                BTS: "区块链",
                                THAI: "泰彩",
                                VNC: "越南彩",
                                LAO: "老挝彩",
                                VTX: "越式大小",
                                ST: "电玩彩",
                                DLT: "大乐透",
                                MAS: "马来西亚彩",
                                SGC: "新加坡彩",
                                SSQ: "双色球",
                                STOCK: "股票彩",
                                TWC: "台湾彩",
                            },
                            gameCode: {
                                T2KFFC: "2000分分彩",
                                T2KWFC: "2000 1.5分彩",
                                T2KSSC: "2000五分彩",
                                T2K11X5: "2000十一选五",
                                T2KPK10: "2000PK10",
                                TXFFC: "腾讯分分彩",
                                CASSC: "加拿大3.5分彩",
                                KRSSC: "韩国1.5分彩",
                                TWSSC: "台湾5分彩",
                                BJSSC: "北京5分彩",
                                TDJWFC: "东京1.5分彩",
                                DJSSC: "东京1.5分彩",
                                CQSSC: "重庆时时彩",
                                HLJSSC: "黑龙江时时彩",
                                XJSSC: "新疆时时彩",
                                TJSSC: "天津时时彩",
                                SD11X5: "山东十一选五",
                                JX11X5: "江西十一选五",
                                GD11X5: "广东十一选五",
                                FC3D: "福彩3D",
                                TCP3P5: "体彩P3P5",
                                BJPK10: "北京赛车PK10",
                                XYPK10: "幸运飞艇",
                                HK6: "香港6合彩",
                                THAIGOV: "泰政府彩",
                                TCGTHGOV: "TCG泰彩",
                                CQTX5FC: "重庆腾讯彩",
                            },
                            "2000cai": {
                                gameCode: {
                                    T2KFFC: "2000分分彩",
                                    T2KWFC: "2000 1.5分彩",
                                    T2KSSC: "2000五分彩",
                                    T2K11X5: "2000十一选五",
                                    T2KPK10: "2000PK10",
                                    TXFFC: "腾讯分分彩",
                                    CASSC: "加拿大3.5分彩",
                                    KRSSC: "韩国1.5分彩",
                                    TWSSC: "台湾5分彩",
                                    BJSSC: "北京5分彩",
                                    TDJWFC: "东京1.5分彩",
                                    DJSSC: "东京1.5分彩",
                                    CQSSC: "重庆时时彩",
                                    HLJSSC: "黑龙江时时彩",
                                    XJSSC: "新疆时时彩",
                                    TJSSC: "天津时时彩",
                                    SD11X5: "山东十一选五",
                                    JX11X5: "江西十一选五",
                                    GD11X5: "广东十一选五",
                                    FC3D: "福彩3D",
                                    TCP3P5: "体彩P3P5",
                                    BJPK10: "北京赛车PK10",
                                    XYPK10: "幸运飞艇",
                                    HK6: "香港6合彩",
                                    THAIGOV: "泰政府彩",
                                    TCGTHGOV: "TCG泰彩",
                                    CQTX5FC: "重庆腾讯彩",
                                },
                            },
                            orderStatus: {
                                orderStatus_0: "全部",
                                orderStatus_2: "进行中",
                                orderStatus_4: "已中奖",
                                orderStatus_5: "未中奖",
                                orderStatus_6: "追中撤单",
                                orderStatus_7: "出号撤单",
                                orderStatus_8: "个人撤单",
                                orderStatus_12: "空开撤单",
                                orderStatus_14: "未开奖",
                                orderStatus_16: "和局",
                                orderStatus_17: "个人撤单",
                                orderStatus_99: "无效订单",
                            },
                            errorCode: {
                                LGS_BETTING_GAME_CLOSED_ERROR: "投注彩种已关闭",
                                LGS_BETTING_GAME_FESTIVAL_ERROR: "投注彩种已关闭",
                                LGS_BETTING_GAME_PAUSED_ERROR: "该彩种暂停销售，请稍后再试",
                                LGS_BETTING_PLAY_MENU_CLOSED_ERROR: "投注玩法已关闭",
                                LGS_BETTING_AMOUNT_OVER_LIMITS: "您的投注金额已超过允许的上限",
                                LGS_ITEM_BETTING_AMOUNT_OVER_LIMITS:
                                    "提示：您好，平台规则同期同玩法号码累加投注 %@ 以上金额，故该注单平台暂不能受理，请修改您的投注内容再进行下注，给您带来不便，还请谅解。",
                                LGS_BETTING_MULTIPLE_OVER_LIMITS: "您的倍数超过允许的上限",
                                LGS_BETTING_RETURN_VALUE_SMALLER_THAN_ZERO: "投注返点值小于0",
                                LGS_BETTING_ILLEGAL_ERROR: "投注参数不符合规定，投注失败！",
                                LGS_BETTING_WITH_INVALID_TOKEN_ERROR: "账号已登出，请重新登录",
                                LGS_CANCEL_ORDER_ARGUMENT_ERROR: "追号参数错误",
                                LGS_BETTING_NUMBER_OVER_LIMITS: "投注号码%@达到当前庫存允许销售的最大投注数额。",
                                ORDER_NOT_DRAWABLE: "订单尚未开奖",
                                DRAW_IS_DRAWABLE: "认购时间已截止",
                                CROWDFUNDING_NOT_SUPPORT: "认购彩种已关闭",
                                LGS_CANCEL_ORDER_INACTIVITY: "当前系统不能进行会员撤单",
                                LGS_CANCEL_ORDER_SERIVCE_CHARGE_LIMIT: "撤单手续费小于投注金额",
                                LGS_CANCEL_ORDER_SERVICE_LF_PRETTY_CHOOSE_ERROR: "低频彩撤单有直选靓号",
                                LGS_BETTING_MODE_CLOSED_ERROR: "投注模式关闭不允许投注",
                                LGS_BETTING_MODE_NOT_ALLOW_ERROR: "不允许使用此投注模式",
                                SYSTEM_NOT_ALLOW_BETTING: "本期已封盘，请待下一期开始",
                                BETTING_ITEM_LIMIT: "订单内容超出系统限制",
                                LGS_CANCEL_ORDER_NOT_AVAILABLE: "订单已经锁定，无法撤单",
                                ACS_AVAILABLE_BALANCE_NOT_ENOUGH: "您的彩票余额不足",
                                CANCEL_CHASE_ORDER_IS_NOT_LAST_START: "追号单需从最后一期开始撤单",
                                ORDER_IS_CANCELED: "该订单已经撤单",
                                "account.balance.not.enough": "中心钱包余额不足",
                                ACCOUNT_BALANCE_NOT_ENOUGH: "中心钱包余额不足",
                                ACCOUNT_TRANSFER_EXCEED_MIN: "最低转账金额不可低于0.01元",
                                UNKNOWN_ERROR: "系统错误",
                                CONNECTION_ERROR_: "所在地区网速延迟，请稍后再试或与客服联系，谢谢！",
                                CANCEL_ORDER_FAILED: "撤单失败",
                                CUSTOMER_LOGOUT_: "您还没有登录，请先登录！",
                                DRAW_FAIL_ERROR_: "系统繁忙，投注失败！",
                                NOT_SUPPORT_LANDSCAPE: "不支持横屏",
                                CAN_NOT_BETTING_NOT_IN_SALE_TIME: "当前彩种暂时没有开始销售 请稍后再试",
                                LGS_HIT_DRAWBACK_NOT_AVAILABLE: "中奖即停不可使用",
                                LGS_MERCHANT_ITEM_BETTING_AMOUNT_OVER_LIMITS:
                                    "以下号码已超出当前期购买额度，请重新下注，剩余可购买金额如下",
                                BETTING_STAKES_IS_OVER_LIMIT_STAKES: "投注注数已超过允许的上限",
                                NOT_SUPPORT_TRIAL_CUSTOMER: "该帐号尚未开放此彩种",
                                ORDER_ALREADY_CANCELED: "该订单已经撤单",
                                STAKES_IS_OVER_LIMIT_ERROR: "投注注数已超过允许的上限",
                                BALANCE_NOT_ENOUGH_ERROR: "餘額不足",
                                BETTING_AMOUNT_OVER_LIMITS_ERROR: "投注金额已超过允许的上限",
                                CALCULATE_BETTING_AMOUNT_ERROR: "投注失败，请稍后再试或与客服联系！",
                                IILLEGAL_BALL_NUMBER_ERROR: "投注失败，请稍后再试或与客服联系！",
                                ILLEGAL_BETTING_ARGUMENT_ERROR: "投注失败，请稍后再试或与客服联系！",
                                SYSTEM_NOT_ALLOW_CHASE: "投注失败，请稍后再试或与客服联系！",
                                NOT_ALLOWED_TO_HIT_DRAWBACK_ERROR: "投注失败，请稍后再试或与客服联系！",
                                CALCULATE_STAKES_ERROR: "投注失败，请稍后再试或与客服联系！",
                                PLAY_NOT_SUPPORTED_ERROR: "玩法维护中，请稍后再试!",
                                BOOK_FAILED_ERROR: "请确认所有钱包资金，稍候再试！",
                                WALLET_NOT_EXISTS_ERROR: "请确认所有钱包资金，稍候再试！",
                                B2B_TX_FAILED: "请确认所有钱包资金，稍候再试！",
                                DEMO_NOT_SUPPORTED_ERROR: "不支援試玩",
                                ORDER_PRIZE_NOT_FOUND_ERROR: "奖金读取失败，请稍后再试!",
                                ORDER_SAVED_FAILED: "订单读取失败，请稍后再试!",
                                PLATFORM_SETTING_NOT_FOUND_ERROR: "玩法维护中，请稍后再试!",
                                PLAY_NOT_FOUND_ERROR: "玩法维护中，请稍后再试!",
                                GAME_SETTING_NOT_FOUND: "玩法维护中，请稍后再试!",
                                GAME_DRWW_TIME_PARSE_ERROR: "开奖时间读取失败，请稍后再试!",
                                ACCOUNT_NOT_FOUND_ERROR: "帐号异常请重新登入!",
                                GAME_URL_NOT_FOUND: "帐号异常请重新登入!",
                                INVALID_TOKEN: "帐号异常请重新登入!",
                                USER_NOT_LOGIN: "帐号异常请重新登入!",
                                CANCEL_ORDER_ERROR: "撤单失败",
                                NOT_AVAILABLE_FOR_SALE_ERROR: "游戏维护中，请稍后再试!",
                                INTERNAL_SERVER_ERROR: "系统错误",
                                OBJECT_NOT_EXIST: "系统错误",
                                ILLEGAL_PARAMS_VALUE: "系统错误",
                                BETTING_MULTIPLE_OVER_LIMITS_ERROR: "您的倍数超过允许的上限",
                                GAME_CLOSED_ERROR: "投注彩种已关闭",
                                STAKES_ABOVE_LIMIT:
                                    "您好，平台规则不能全包投注，即同期同玩法投注%@以上的号码，故该注单平台暂不能受理，请修改您的投注内容再来下注，给您带来不便，还请谅解；",
                                REQUEST_TIME_OUT: "您的网路不给力，请稍后再试！",
                                PAIR_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                    "投注号码%@后二位相同数字每期允许销售的最大投注数额%@元。",
                                BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS: "投注号码%@达到当前庫存允许销售的最大投注数额。",
                                BET_NUMBER_BETTING_AMOUNT_OVER_LIMITS_ERROR:
                                    "以下号码已超出当前期购买额度，请重新下注，剩余可购买金额如下",
                            },
                            chasingStatus: { All: "全部", Chasing: "仅追号单", NonChasing: "非追号单" },
                            winNoFragment: {
                                "02": "大单",
                                "03": "大双",
                                12: "小单",
                                13: "小双",
                                com2: "组二",
                                com3: "组三",
                                com4: "组四",
                                com5: "组五",
                                com6: "组六",
                                com12: "组12",
                                com20: "组20",
                                com24: "组24",
                                com30: "组30",
                                com60: "组60",
                                com120: "组120",
                                baozi: "豹子",
                                singleSame2: "对子(二同号)",
                                K3Com6: "组六(三不同)",
                                K3Baozi: "豹子(三同号)",
                                BS: "大小",
                                OE: "单双",
                                big: "大",
                                small: "小",
                                odd: "单",
                                even: "双",
                                pair: "对子",
                                zu6: "杂六",
                                straight: "顺子",
                                halfStraight: "半顺",
                                fan: "番",
                                fanBS: "番大小",
                                fanOE: "番单双",
                            },
                            zodiac: {
                                1: "鼠",
                                2: "牛",
                                3: "虎",
                                4: "兔",
                                5: "龙",
                                6: "蛇",
                                7: "马",
                                8: "羊",
                                9: "猴",
                                10: "鸡",
                                11: "狗",
                                12: "猪",
                            },
                            drawPeriod: {
                                T2KFFC: "开奖时间：00:00-23:59, 共1440期 每1分钟开奖",
                                TCGFFC: "开奖时间：00:00-23:59, 共1440期 每1分钟开奖",
                                DLAFFC: "开奖时间：00:00-23:59, 共1440期 每1分钟开奖",
                                CHFFC: "开奖时间：00:01-23:59, 共1439期 每1分钟开奖",
                                T2KWFC: "开奖时间：00:00:00-23:58:30, 共960期 每1.5分钟开奖",
                                DLAWFC: "开奖时间：00:00:00-23:58:30, 共960期 每1.5分钟开奖",
                                TCGWFC: "开奖时间：00:00:00-23:58:30, 共960期 每1.5分钟开奖",
                                CHWFC: "开奖时间：23:01:30-次日23:00:00, 共920期 每1.5分钟开奖",
                                T2KSSC: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                TCGSSC: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                DLASSC: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                CHSSC: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                T2K11X5: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                TCG11X5: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                DLA11X5: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                CH11X5: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                T2KPK10: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                TCGPK10: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                DLAPK10: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                CHPK10: "开奖时间：00:00:00-23:55:30, 共288期 每5分钟开奖",
                                TXFFC: "开奖时间：00:00-23:59, 共1440期 每1分钟开奖",
                                CASSC:
                                    "开奖时间: 20:00 — 19:00(官网每天7:00pm到8:00pm间都会暂停一会), 共395期  每3.5分钟开奖",
                                KRSSC: "开奖时间：00:11:00-次日00:09:30, 共288期 每1.5分钟开奖",
                                TWSSC: "开奖时间：07:05-23:55, 共203期 每5分钟开奖",
                                BJSSC: "开奖时间：09:05-23:55, 共179期 每5分钟开奖",
                                DJSSC: "开奖时间：23:01:30-次日23:00:00, 共920期 每1.5分钟开奖",
                                TDJWFC: "开奖时间：23:01:30-次日23:00:00, 共920期 每1.5分钟开奖",
                                CQSSC:
                                    "开奖时间：10:00-次日1:55, 共120期    10:00-22:00期间 每10分钟开奖，22:00-01:55期间 每5分钟开奖",
                                HLJSSC: "开奖时间：08:50-22:40, 共84期 每10分钟开奖",
                                XJSSC: "开奖时间：10:10-次日02:00, 共96期 每10分钟开奖",
                                TJSSC: "开奖时间：09:08-22:58, 共84期 每10分钟开奖",
                                SD11X5: "开奖时间：08:35-22:55, 共87期 每10分钟开奖",
                                JX11X5: "开奖时间：09:10-23:00, 共84期 每10分钟开奖",
                                GD11X5: "开奖时间：09:10-23:00, 共84期 每10分钟开奖",
                                FC3D: "开奖时间: 20:30",
                                TCP3P5: "开奖时间: 20:30",
                                BJPK10: "开奖时间：09:07:30-23:57:30，共179期 每5分钟开奖",
                                XYPK10: "开奖时间：13:09-次日04:04，共180期 每5分钟开奖",
                                HK6: "开奖时间: 21:30",
                                TX28: "开奖时间：00:00-23:59, 共1440期 每1分钟开奖",
                            },
                            timeDuration: { hour: "時", minute: "分", second: "秒" },
                            chart: {
                                line: "折线",
                                gapBar: "遗漏分层",
                                horizontalLine: "辅助线",
                                downloadHistory: "下载历史开奖号",
                                arithmetic: "正序",
                                about: "使用说明",
                                nearlyNumeros: "最近%@期",
                                numberSpread: "号码分布",
                                largeSmallRatio: "大小比",
                                oddEvenRatio: "奇偶比",
                                primCompRatio: "质合比",
                                first: "冠军位",
                                second: "亚军位",
                                third: "季军位",
                                fourth: "第四名位",
                                fifth: "第五名位",
                                sixth: "第六名位",
                                seventh: "第七名位",
                                eighth: "第八名位",
                                ninth: "第九名位",
                                tenth: "第十名位",
                                bigSmallOddEven: "大小单双",
                                firstSecond: "冠亚",
                                firstSecondThird: "冠亚季",
                                firstLast: "首尾",
                                totalTimes: "出现总次数",
                                avgHotGap: "平均遗漏值",
                                maxGap: "最大遗漏值",
                                maxCombo: "最大连出值",
                                numerosCount: "期数",
                                goBet: "投注去",
                                fan: "番",
                                draw: "和局",
                                totalSumOdd: "总和单",
                                totalSumEven: "总和双",
                                totalSumBig: "总和大",
                                totalSumSmall: "总和小",
                                sumOdd: "合单",
                                sumEven: "合双",
                                sumBig: "合大",
                                sumSmall: "合小",
                                tailBig: "尾大",
                                tailSmall: "尾小",
                                time: "开奖时间",
                                normalOne: "正码一",
                                normalTwo: "正码二",
                                normalThree: "正码三",
                                normalFour: "正码四",
                                normalFive: "正码五",
                                normalSix: "正码六",
                                special: "特码",
                                sum: "总和",
                                total: "总数",
                                bigSmall: "大小",
                                oddEven: "单双",
                                colorBall: "色波",
                                sumOddEven: "合单双",
                                sumBigSmall: "合大小",
                                bigSmallTail: "大小尾",
                                ballOne: "第一球",
                                ballTwo: "第二球",
                                ballThree: "第三球",
                                firstBall: "第1球",
                                secondBall: "第2球",
                                thirdBall: "第3球",
                                fourthBall: "第4球",
                                fifthBall: "第5球",
                                SSC_first: "万",
                                SSC_second: "千",
                                SSC_third: "百",
                                SSC_fourth: "十",
                                SSC_fifth: "个",
                                "11X5_first": "一位",
                                "11X5_second": "二位",
                                "11X5_third": "三位",
                                "11X5_fourth": "四位",
                                "11X5_fifth": "五位",
                                PK10_first: "冠军",
                                PK10_second: "亚军",
                                PK10_third: "季军",
                                PK10_fourth: "四位",
                                PK10_fifth: "五位",
                                PK10_sixth: "六位",
                                PK10_seventh: "七位",
                                PK10_eighth: "八位",
                                PK10_ninth: "九位",
                                PK10_tenth: "十位",
                                PK10_fanTan: "番摊",
                                K3_first: "百",
                                K3_second: "十",
                                K3_third: "个",
                                K3_sum: "和值",
                                K3_sum_trend: "和值走势",
                                K3_single_same: "同号",
                                drawNumber: "开奖号码",
                                sumValue: "和值",
                                singleSame2: "对子",
                                com6: "组六",
                                baozi: "豹子",
                                specialPlay: "特殊",
                                first3: "前三",
                                middle3: "中三",
                                last3: "后三",
                            },
                            quickBetLHC: {
                                odd: "单码",
                                smallOdd: "小单",
                                sumOdd: "合单",
                                even: "双码",
                                smallEven: "小双",
                                sumEven: "合双",
                                big: "大码",
                                bigOdd: "大单",
                                sumBig: "合大",
                                small: "小码",
                                bigEven: "大双",
                                sumSmall: "合小",
                                head0: "0头",
                                tail0: "0尾",
                                tail5: "5尾",
                                head1: "1头",
                                tail1: "1尾",
                                tail6: "6尾",
                                head2: "2头",
                                tail2: "2尾",
                                tail7: "7尾",
                                head3: "3头",
                                tail3: "3尾",
                                tail8: "8尾",
                                head4: "4头",
                                tail4: "4尾",
                                tail9: "9尾",
                                rat: "鼠",
                                dragon: "龙",
                                monkey: "猴",
                                ox: "牛",
                                snake: "蛇",
                                rooster: "鸡",
                                tiger: "虎",
                                horse: "马",
                                dog: "狗",
                                rabbit: "兔",
                                goat: "羊",
                                pig: "猪",
                                red: "红",
                                blue: "蓝",
                                green: "绿",
                                redOdd: "红单",
                                blueOdd: "蓝单",
                                greenOdd: "绿单",
                                redEven: "红双",
                                blueEven: "蓝双",
                                greenEven: "绿双",
                                redBig: "红大",
                                blueBig: "蓝大",
                                greenBig: "绿大",
                                redSmall: "红小",
                                blueSmall: "蓝小",
                                greenSmall: "绿小",
                            },
                            filter: { pair: "只对子", nonPair: "杀对子" },
                            yes: "是",
                            no: "否",
                            All: "全部",
                            allGames: "全部游戏",
                            topGames: "热门游戏",
                            recentlyGames: "最近游戏",
                            newTag: "新",
                            hotTag: "热",
                            status: "状态",
                            system: "系统",
                            drawDrawback: "撤单",
                            gameHistoryCancel: "确定撤单？",
                            gameHistoryCancel_failed: "UNKNOWN_ERROR",
                            gameHistoryCancel_success: "撤单成功",
                            gameType: "游戏类型",
                            orderNumber: "订单编号",
                            bettingTime: "投注时间",
                            numero: "游戏奖期",
                            winningNumber: "开奖号码",
                            planBettingAmount_hasDollar: "投注金额(元)",
                            winningAmount_hasDollar: "中奖金额(元)",
                            currentBet: "当前投注",
                            shoppingBasket: "购彩篮",
                            betHistory: "投注历史",
                            betRecord: "投注记录",
                            random_one: "机选1注",
                            random_five: "机选5注",
                            one_key_all_clear: "一键清空",
                            clearShoppingCart: "清空号码",
                            wouldLikeChasing: "我要追号",
                            confirmBetting: "确认投注",
                            youHaveChosen: "你选择了",
                            total: "共",
                            stakes: "注",
                            betAmount: "注数",
                            dollars: "元",
                            playGroupType: "玩法类型",
                            betNumber: "投注号码",
                            mode: "模式",
                            operate: "操作",
                            multiple: "倍数",
                            unitMultiple: "倍",
                            syncMultipleBets: "批量修改倍数",
                            personal: "个人",
                            currentHot: "当前冷热",
                            currentGap: "当前遗漏",
                            drawThanCancelOrder: "开和撤单",
                            hot: "冷热",
                            gap: "遗漏",
                            betLog: "投注记录",
                            chaseLog: "追号记录",
                            leaveUseESCKey: "按ESC离开",
                            betFailed: "生成订单失败",
                            lott: "彩票",
                            selectTooManyBalls: "当前玩法最多只能选择%@个号球！",
                            changeDecimal: "切换小数点",
                            chasingPhaseAmount: "%@期",
                            chasingChildOrder: "子单",
                            noResult: "没有查到符合条件的数据",
                            betNumero: "投注期号",
                            chase: "追号",
                            chaseStartNumero: "起始期号",
                            chaseEndNumero: "截止期号",
                            chasePlanPhase: "计划期数",
                            chaseActualPhase: "实际期数",
                            planBettingAmount: "计划投注金额",
                            actualBettingAmount: "有效投注金额",
                            winningAmount: "中奖金额",
                            planBettingAmount_summary: "计划投注金额合计",
                            actualBettingAmount_summary: "有效投注金额合计",
                            winningAmount_summary: "中奖金额合计",
                            planBettingAmount_daily: "注额",
                            unbalancedAmount_daily: "未结算计划金额",
                            winningAmount_daily: "今日输赢",
                            ensure: "确定",
                            cancel: "取消",
                            newCategory: "新增分类",
                            date: "日期",
                            time: "时间",
                            lastTime: "剩余时间",
                            to: "到",
                            game: "游戏",
                            duplicateDrawBack: "多选撤单",
                            duplicateDrawBackCheck: "是否进行撤单？",
                            duplicate: "多选",
                            order: "订单",
                            lock: "锁定",
                            numeroAbbreviation: "期号",
                            thisNumero: "本期",
                            nextNumero: "下期",
                            manualDigitsTip:
                                "提示：至少选<span>%@</span>个位置,您已选了<span>%@</span>个位置，系统将自动生成<span>%@</span>个方案。",
                            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
                            monthNames: [
                                "一月",
                                "二月",
                                "三月",
                                "四月",
                                "五月",
                                "六月",
                                "七月",
                                "八月",
                                "九月",
                                "十月",
                                "十一月",
                                "十二月",
                            ],
                            numberScaleName: ["万", "亿", "兆"],
                            query: "查找",
                            bettingAmount: "投注金额",
                            betAmountMinLimit: "单笔最小投注上限",
                            betAmountMaxLimitByNumero: "单期最大投注上限",
                            chasingNumeros: {
                                sameMultiplesChasing: "普通追号",
                                addMultiplesChasing: "翻倍追号",
                                profitMarginChasing: "利润率追号",
                                startFrom: "起始",
                                current: "(当前)",
                                chasing: "追",
                                popUp1: "包含当前最多追%@期",
                                numero: "期",
                                numeroNumber: "期号",
                                multiples: "倍数",
                                interval: "每隔",
                                startMultiples: "起始倍数",
                                lowestYield: "最低利润率",
                                generateChasingNumber: "生成追号",
                                chasingNumeros: "追号期号",
                                currentBet: "当前投入(元)",
                                sumBet: "累计投入(元)",
                                currentWinAmount: "当期奖金",
                                yield: "利润率",
                                winStop: "中奖即停",
                                youChase: "你追号",
                                confirmChasing: "确认追号",
                                chooseItem: "选择",
                                tip1: "您原计划实现%@期,实际实现%@期",
                                tip2_1: "您的翻倍计划无法生成",
                                tip2_2: "因为隔期倍数超过系统上限",
                                tip3_1: "您目前的投注金额大于最大可投注金额",
                                tip3_2: "当前模式最大投注金额为%@元!",
                                tip4_1: "您输入的追号期数格式不正确",
                                tip4_2: "只能输入大于或等于1的整数",
                                tip5: "当前彩种的最大追号期数不能超过%@期",
                                tip6_1: "您输入的投注倍数格式不正确",
                                tip6_2: "只能输入大于或等于1的整数",
                                tip7: "您的最大投注倍数不能超过%@倍",
                                tip8_1: "您输入的间隔期数格式不正确",
                                tip8_2: "只能输入大于或等于1的整数",
                                tip9: "间隔期数不能超过您输入的追号期数 目前最大间隔为%@期",
                                tip10_1: "您输入的隔期倍数格式不正确",
                                tip10_2: "只能输入大于或等于1的整数",
                                tip11: "您的最大隔期倍数不能超过%@倍",
                                tip12_1: "您输入的最低收益率格式不正确",
                                tip12_2: "只能输入正整数或小数!",
                            },
                            betStakes: "投注注数",
                            betOdds: "投注赔率",
                            orderStatusTitle: "订单状态",
                            playMenuType: "玩法模式",
                            back: "返回",
                            relativeChasingRecord: "追号相关记录",
                            series: "系列",
                            betContent: "投注内容",
                            gamePlayMenu: "游戏玩法",
                            totalChaseAmount: "追号期数",
                            true: "是",
                            false: "否",
                            winningStop: "中奖停止",
                            abandoning: "出号即停",
                            actualBetAmount: "实际投注金额",
                            isCompleted: "是否结束",
                            choose: "选择",
                            pkModeConfirmMsg: "订单含有单挑玩法，奖金上限额 %@ ，超出的奖金无效",
                            pkModeWarning: "此订单含有单挑模式，如中奖系统将自动扣除超出单挑奖金的金额",
                            skipOneClickBetMsg: "本次后不再进行确认提示",
                            manualBetPlaceHolder:
                                '每注之间可以用回车丶空格[]丶逗号[,]或者分号[;]、["|"]隔开\n请导入TXT文件丶复制或者输入支持格式如下：',
                            manualBetPlaceHolder_2Digit:
                                '每注之间可以用回车丶逗号[,]或者分号[;]、["|"]隔开\n请导入TXT文件丶复制或者输入支持格式如下：',
                            manualBetPlaceHolder_h5:
                                '每注之间可以用回车丶空格[]丶逗号[,]或者分号[;]、["|"]隔开，请导入TXT文件丶复制或者输入支持格式如下：',
                            manualBetPlaceHolder_2Digit_h5:
                                '每注之间可以用回车丶逗号[,]或者分号[;]、["|"]，请导入TXT文件丶隔开复制或者输入支持格式如下：',
                            manualBetPlaceHolderSEA:
                                "每注之间可以用回车丶空格[]丶逗号[,]或者分号[;]隔开\n请导入TXT文件丶复制或者输入支持格式如下：",
                            manualBetFormatError: "您的投注内容不符合要求<br />里面还有字母或者中文！",
                            multipleFormatError: "您输入的投注倍数格式不正确<br />只能输入大于或等于1的数字！",
                            multipleMaxError: "您的最大投注倍数不能超过 %@ 倍",
                            pleaseChooseFile: "请您选择文件!",
                            fileOnlySupportTxt: "您选择的文件类型不符合要求,<br />目前只支持txt文本格式的文件！",
                            fileTooLarge: "您选择的文件大小超过 %@,<br />目前只支持 %@ 大小的文件！",
                            filterResultMsg: "已经过滤%@组重复号，%@组无效号",
                            chooseFile: "选择文件",
                            clearBallText: "清除选号",
                            category: "分类",
                            addToBetSlip: "加入购物车",
                            filterRepeat: "过滤重复/无效号",
                            lostSeriesData: "缺少系列资料",
                            logInTimeOut: "登入超时 请重新登入",
                            searchOrdersTimeOut: "系统繁忙，请稍后再试",
                            noNumero: "当前彩种暂时没有开始销售 请稍候再试",
                            unstableNetwork: "当前地区网络不稳定，请稍后再试！ 谢谢",
                            subPlayMenuEmpty: "此彩种暂无玩法开放，请选择其他彩种",
                            gameEmpty: "该彩种已关闭",
                            drawing: "正在开奖",
                            countDown: "倒计时",
                            drawResult: "开奖结果",
                            cqsscWinNo: "重庆时时彩%@期",
                            txffcLastStatistic: "腾讯5分钟前人数",
                            txffcCurrentStatistic: "腾讯当前人数",
                            cqtx5cWave: "腾讯5分钟波动值",
                            mixValueCount: "混合总和计算",
                            drawTrend: "开奖走势",
                            betNow: "立即投注",
                            betNowTrad: "官方玩法",
                            betNowElott: "盘口玩法",
                            betNowEnt: "娱乐城玩法",
                            betNowEnterGame: "进入玩法",
                            addToCart: "添加至购彩篮",
                            betDirect: "直接投注",
                            lastDraw: "上期开奖",
                            numeroFormat: "第%@期",
                            trendChart: "走势图",
                            pastDraw: "开奖纪录",
                            drawHistory: "开奖历史",
                            autoTransferTip: "您的彩票余额不足，请问您是否选择从您的中心钱包余额中扣除 %@ ？",
                            transferFailed: "转账失败",
                            transferTimeout: "转账超时",
                            betStakeOverLimit: "该玩法可投上限为%@注，请重新下注！谢谢",
                            betRowStakeOverLimit: "该玩法单列可投上限为%@注，请重新下注！谢谢",
                            overBetAmountMax: "超过单笔投注最大金额",
                            drawAnnouncement: "开奖公告",
                            onceAlertDialog:
                                "{欢迎归来}<br />此次游戏维护升级时间较长，天成致以最诚挚的歉意，为您奉上专属红包，已为您派发到您的彩票钱包，祝您体验愉快。",
                            today: "今天",
                            yesterday: "昨天",
                            beforeYesterday: "前天",
                            week: "近七天",
                            month: "近三十天",
                            chooseRange: "自定义",
                            lastThree: "后三",
                            bigSmall: "大小",
                            oddEven: "奇偶",
                            prize: "奖金",
                            prizeRebate: "奖/返",
                            currentPrize: "最高奖金",
                            playTypePrize: "玩法奖金",
                            add: "添加",
                            addNums: "添加号码",
                            oneClickBet: "一键投注",
                            winDescription: "玩法说明",
                            gameDrawTimesInfo: "彩种说明",
                            lobby: "大厅",
                            openWinningNumber: "开奖",
                            bet: "投注",
                            longDragonBet: "长龙",
                            trend: "走势",
                            winningHistory: "记录",
                            drawRemainTime: "距离开奖还剩",
                            lockTip: "%@第%@期已结束<br />请留意投注期号。",
                            numeroNo: "第",
                            numeroPeriod: "期",
                            numeroWinNoFormat: "期开奖号码",
                            drawDate: "开奖日期",
                            suspendSales: "暂停销售",
                            defaultAmount: "预设金额",
                            haveChosen: "已选中",
                            roadMapChart: "路子图",
                            quickBet: "快捷投注",
                            quickEnter: "快打输入",
                            bothSideDragon: "两面长龙",
                            reset: "重置",
                            atLeastChooseOneNumber: "请选择号码下注！！",
                            wrongBetAmount: "您输入类型不正确或没有输入实际金额！",
                            betSuccess: "恭喜, 下注成功",
                            betPartialSuccess: "余额不足，部份生成訂单成功",
                            betFail: "下注失敗",
                            confirmBetInfos: "请确认投注信息",
                            number: "号码",
                            odds: "奖金",
                            amount: "金额",
                            amountByStakes: "单注金额",
                            expectedToWin: "预计可赢",
                            balance: "余额",
                            noRecord: "目前没有投注纪录, 进入",
                            goToBet: "去投注",
                            betOrderCount: "组数",
                            totalAmount: "总金额",
                            totalCount: "合计",
                            totalBettingAmount: "本期已投总额",
                            totalItemBettingAmount: "玩法本期已投总额",
                            currentTotalAmount: "本次投注金額",
                            colorStraight: "色波",
                            colorBSOE: "半波",
                            colorBS_OE: "半半波",
                            chineseZodiac: "生肖",
                            numberAbbrev: "号",
                            type: "种类",
                            gameName: "玩法名称",
                            gameContent: "玩法内容",
                            odds1Time: "奖金/注",
                            numbers: {
                                1: "一",
                                2: "二",
                                3: "三",
                                4: "四",
                                5: "五",
                                6: "六",
                                7: "七",
                                8: "八",
                                9: "九",
                                10: "十",
                                11: "十一",
                                12: "十二",
                            },
                            noHit: "不中",
                            checked: "勾选",
                            detail: "详细",
                            detailInfo: "查看详情",
                            more: "更多",
                            pk: "单挑",
                            choseVariety: "选彩种",
                            chosePlayItem: "选玩法",
                            playMode: "玩法",
                            processing: "进行中",
                            selectAll: "全选",
                            playRule: "玩法规则",
                            backHome: "返回首页",
                            backToLobby: "返回大厅",
                            BTSplayRule: "区块链彩票说明",
                            STplayRule: "电玩彩彩票说明",
                            normal: "一般",
                            quickly: "快捷",
                            loading: "资料读取中...",
                            noData: "当前无符合数据 !",
                            save: "保存",
                            disable: "禁用",
                            enable: "启用",
                            unSetting: "未设置",
                            clear: "清空",
                            count: "组",
                            confirm: "确认",
                            betOrderTotal: "总计",
                            stakesNum: "注数",
                            pleaseKeyAmount: "请输入金额",
                            entertainment: "娱乐城",
                            tradition: "官方",
                            quicklyAmount: "快选金额",
                            quicklyAmountInfo: "注意：设置只保存在您的电脑，清空浏览器缓存或更换电脑会显示默认值。",
                            playMenuHot: "出码排行",
                            playMenuGap: "遗漏排行",
                            times: "期数",
                            types: "分类",
                            sum: "总和",
                            sumValue: "和值",
                            firstBall: "第一球",
                            secondBall: "第二球",
                            thirdBall: "第三球",
                            fourthBall: "第四球",
                            fifthBall: "第五球",
                            first2: "前二",
                            first3: "前三",
                            middle3: "中三",
                            last3: "后三",
                            dragonTigerTie: "龙虎和",
                            twoSide: "两面",
                            pastime: "趣味",
                            Dragon_Tiger_Tie_5_4_ENT: "万千 第一球vs第二球",
                            Dragon_Tiger_Tie_5_3_ENT: "万百 第一球vs第三球",
                            Dragon_Tiger_Tie_5_2_ENT: "万十 第一球vs第四球",
                            Dragon_Tiger_Tie_5_1_ENT: "万个 第一球vs第五球",
                            Dragon_Tiger_Tie_4_3_ENT: "千百 第二球vs第三球",
                            Dragon_Tiger_Tie_4_2_ENT: "千十 第二球vs第四球",
                            Dragon_Tiger_Tie_4_1_ENT: "千个 第二球vs第五球",
                            Dragon_Tiger_Tie_3_2_ENT: "百十 第三球vs第四球",
                            Dragon_Tiger_Tie_3_1_ENT: "百个 第三球vs第五球",
                            Dragon_Tiger_Tie_2_1_ENT: "十个 第四球vs第五球",
                            NN_SSC_ENT: "牛牛牌型",
                            NN_SSC_BSOE_ENT: "牛牛大小单双",
                            NN_HAS_SSC_ENT: "牛牛有牛无牛",
                            HK5_SSC_ENT: "梭哈牌型",
                            Normal_First_LHC: "正码一",
                            Normal_Second_LHC: "正码二",
                            Normal_Third_LHC: "正码三",
                            Normal_Fourth_LHC: "正码四",
                            Normal_Fifth_LHC: "正码五",
                            Normal_Sixth_LHC: "正码六",
                            Color_Straight_LHC: "色波",
                            Color_BSOE_LHC: "半波",
                            Color_BS_OE_LHC: "半半波",
                            First2SumBSOE_PK10: "冠亚和大小单双",
                            FirstPlace_PK10: "冠军",
                            SecondPlace_PK10: "亚军",
                            ThirdPlace_PK10: "季军",
                            FourthPlace_PK10: "第四名",
                            FifthPlace_PK10: "第五名",
                            SixthPlace_PK10: "第六名",
                            SeventhPlace_PK10: "第七名",
                            EighthPlace_PK10: "第八名",
                            NinthPlace_PK10: "第九名",
                            TenthPlace_PK10: "第十名",
                            Dragon_Tiger_1_VS_10_PK10: "冠军vs第十名",
                            Dragon_Tiger_2_VS_9_PK10: "亚军vs第九名",
                            Dragon_Tiger_3_VS_8_PK10: "季军vs第八名",
                            Dragon_Tiger_4_VS_7_PK10: "第四名vs第七名",
                            Dragon_Tiger_5_VS_6_PK10: "第五名vs第六名",
                            BS_OE: "和值大小单双",
                            SUM_COM_BS_OE: "和值组合大小单双",
                            BS_OE_Baozi_Kill: "和值-大小单双",
                            Different_2: "两连",
                            Single_Same: "独胆",
                            Any_Code_Not_Win: "不出胆",
                            Boazi: "豹子",
                            Single_Same_2: "对子",
                            Red_Black_Num_K3_Ent: "红黑码",
                            Red_Black_BSOE: "红黑大小单双",
                            Red_Num_Com_K3_Ent: "红码组合",
                            Black_Num_Com_K3_Ent: "黑码组合",
                            Dragon_Tiger_1_VS_2_K3_Ent: "第一球 vs 第二球",
                            Dragon_Tiger_1_VS_3_K3_Ent: "第一球 vs 第三球",
                            Dragon_Tiger_2_VS_3_K3_Ent: "第二球 vs 第三球",
                            Span_All_K3_Ent: "跨度",
                            Two_Side_Total_Sum_Group_11X5: "总和",
                            Any1_11X5: "一中一",
                            Any2_11X5: "二中二",
                            Any3_11X5: "三中三",
                            Any4_11X5: "四中四",
                            Any5_11X5: "五中五",
                            Any6_11X5: "六中五",
                            Any7_11X5: "七中五",
                            Any8_11X5: "八中五",
                            First2_Com_11X5: "前二组选 (娱乐)",
                            First3_Com_11X5: "前三组选 (娱乐)",
                            First2_Straight_11X5_ENT: "前二直选 (娱乐)",
                            First3_Straight_11X5_ENT: "前三直选 (娱乐)",
                            Hundreds_Tens_Sum_LF: "百十和数",
                            Hundreds_Tens_Sum_Last_LF: "百十和数尾数",
                            Hundreds_Units_Sum_LF: "百个和数",
                            Hundreds_Units_Sum_Last_LF: "百个和数尾数",
                            Tens_Units_Sum_LF: "十个和数",
                            Tens_Units_Sum_Last_LF: "十个和数尾数",
                            Hundreds_Tens_Units_Sum_LF: "百十个和数",
                            Hundreds_Tens_Units_Sum_Tail_LF: "百十个和数尾数",
                            P_KENO_ANY1_1: "选1中1",
                            P_KENO_ANY2_2: "选2中2",
                            P_KENO_ANY3_2: "选3中2",
                            P_KENO_ANY3_3: "选3中3",
                            P_KENO_ANY4_2: "选4中2",
                            P_KENO_ANY4_3: "选4中3",
                            P_KENO_ANY4_4: "选4中4",
                            P_KENO_ANY5_3: "选5中3",
                            P_KENO_ANY5_4: "选5中4",
                            P_KENO_ANY5_5: "选5中5",
                            P_KENO_ANY6_3: "选6中3",
                            P_KENO_ANY6_4: "选6中4",
                            P_KENO_ANY6_5: "选6中5",
                            P_KENO_ANY6_6: "选6中6",
                            P_KENO_ANY7_0: "选7中0",
                            P_KENO_ANY7_4: "选7中4",
                            P_KENO_ANY7_5: "选7中5",
                            P_KENO_ANY7_6: "选7中6",
                            P_KENO_ANY7_7: "选7中7",
                            P_KENO_FUN_0: "大",
                            P_KENO_FUN_1: "小",
                            P_KENO_FUN_4: "和",
                            P_KENO_FUN_2: "单",
                            P_KENO_FUN_3: "双",
                            P_KENO_FUN_5: "总大单",
                            P_KENO_FUN_6: "总大双",
                            P_KENO_FUN_7: "总小单",
                            P_KENO_FUN_8: "总小双",
                            P_KENO_FUN_9: "上",
                            P_KENO_FUN_10: "下",
                            P_KENO_FUN_11: "中",
                            P_KENO_FUN_12: "奇",
                            P_KENO_FUN_13: "偶",
                            P_KENO_FUN_14: "和",
                            P_KENO_FUN_15: "金",
                            P_KENO_FUN_16: "木",
                            P_KENO_FUN_17: "水",
                            P_KENO_FUN_18: "火",
                            P_KENO_FUN_19: "土",
                            pickRow: { all: "全", big: "大", small: "小", odd: "奇", even: "偶", clear: "清" },
                            roadMap: {
                                combine: "整合",
                                dragonTiger: "龙虎斗",
                                dragonTigerTie: "龙虎和",
                                number: "单码",
                                BSOE: "大小单双",
                                NN: "牛牛",
                                baccarat: "百家乐",
                                firstBall: "第一球",
                                firstBallBS: "第一球大小",
                                firstBallOE: "第一球单双",
                                secondBall: "第二球",
                                secondBallBS: "第二球大小",
                                secondBallOE: "第二球单双",
                                thirdBall: "第三球",
                                thirdBallBS: "第三球大小",
                                thirdBallOE: "第三球单双",
                                fourthBall: "第四球",
                                fourthBallBS: "第四球大小",
                                fourthBallOE: "第四球单双",
                                fifthBall: "第五球",
                                fifthBallBS: "第五球大小",
                                fifthBallOE: "第五球单双",
                                sumBigSmall: "总和大小",
                                sumOddEven: "总和单双",
                                oneVsTwo: "1VS2",
                                oneVsThree: "1VS3",
                                oneVsFour: "1VS4",
                                oneVsFive: "1VS5",
                                twoVsThree: "2VS3",
                                twoVsFour: "2VS4",
                                twoVsFive: "2VS5",
                                threeVsFour: "3VS4",
                                threeVsFive: "3VS5",
                                fourVsFive: "4VS5",
                                NNBS: "牛大小",
                                NNOE: "牛单双",
                                bankerPlayerTie: "庄闲和",
                                oneVsTen: "1VS10",
                                twoVsNine: "2VS9",
                                threeVsEight: "3VS8",
                                fourVsSeven: "4VS7",
                                fiveVsSix: "5VS6",
                                sumOneTwo: "冠亚和值",
                                sumOneTwoOddEven: "冠亚和单双",
                                sumOneTwoBigSmall: "冠亚和大小",
                                special: "特码",
                                sum: "和值",
                                hundredsFixedPlace: "百定位",
                                hundredsBS: "百大小",
                                hundredsOE: "百单双",
                                hundredsPC: "百质合",
                                tenFixedPlace: "十定位",
                                tenBS: "十大小",
                                tenOE: "十单双",
                                tenPC: "十质合",
                                unitsFixedPlace: "个定位",
                                unitsBS: "个大小",
                                unitsOE: "个单双",
                                unitsPC: "个质合",
                                spanCompare: "跨度",
                            },
                            entPicture: {
                                ball: "第%@球",
                                bigSmall: "大小",
                                oddEven: "单双",
                                sumOddEven: "总和单双",
                                sumBigSmall: "总和大小",
                                oneVSTwo: "一vs二",
                                oneVSThree: "一vs三",
                                oneVSFour: "一vs四",
                                oneVSFive: "一vs五",
                                twoVSThree: "二vs三",
                                twoVSFour: "二vs四",
                                twoVSFive: "二vs五",
                                threeVSFour: "三vs四",
                                threeVSFive: "三vs五",
                                fourVSFive: "四vs五",
                                NN: "牛牛",
                                NNBigSmall: "牛大小",
                                NNOddEven: "牛单双",
                                oneVsTen: "冠军VS第十名",
                                twoVsNine: "亚军vs第九名",
                                threeVsEight: "季军vs第八名",
                                fourVsSeven: "第四名VS第七名",
                                fiveVsSix: "第五名VS第六名",
                                sumOneTwo: "冠亚和值",
                                sumOneTwoOddEven: "冠亚和单双",
                                sumOneTwoBigSmall: "冠亚和大小",
                                firstBall: "第一球",
                                secondBall: "第二球",
                                thirdBall: "第三球",
                                special: "特码",
                                firstBall_11X5: "第一球",
                                firstBallBS: "第一球大小",
                                firstBallOE: "第一球单双",
                                secondBall_11X5: "第二球",
                                secondBallBS: "第二球大小",
                                secondBallOE: "第二球单双",
                                thirdBall_11X5: "第三球",
                                thirdBallBS: "第三球大小",
                                thirdBallOE: "第三球单双",
                                fourthBall_11X5: "第四球",
                                fourthBallBS: "第四球大小",
                                fourthBallOE: "第四球单双",
                                fifthBall_11X5: "第五球",
                                fifthBallBS: "第五球大小",
                                fifthBallOE: "第五球单双",
                                bankerPlayerTie: "庄闲和",
                                hundredsFixedPlace: "百定位",
                                hundredsBS: "百大小",
                                hundredsOE: "百单双",
                                hundredsPC: "百质合",
                                tenFixedPlace: "十定位",
                                tenBS: "十大小",
                                tenOE: "十单双",
                                tenPC: "十质合",
                                unitsFixedPlace: "个定位",
                                unitsBS: "个大小",
                                unitsOE: "个单双",
                                unitsPC: "个质合",
                                spanCompare: "跨度",
                                KLBigSmall: "大小",
                                KLUpDown: "上下",
                                KLSinglePair: "奇偶",
                                KLOddEven: "单双",
                                KLFiveElements: "五行",
                            },
                            betAmountOverMaxAmount:
                                "您目前的投注金额大于最大可投注金额<br />当前模式最大投注金额为%@元!",
                            userAmount: "账户余额",
                            alreadyChoose: "已选%@组",
                            alreadyChooseStack: "已选",
                            stack: "组",
                            info: "说明",
                            helper: "助手",
                            chooseMode: "选择模式",
                            betOrderConfirm: "投注信息确认",
                            close: "关闭",
                            closed: "已封盘",
                            choosePlayGroup: "玩法选择",
                            fetchBalanceFailed: "获取彩票余额失败",
                            winAmountMaxByNumero: "彩种单期最高奖金",
                            winProfitMaxByNumero: "彩种单期最高利润",
                            winAmountMax: "彩种单笔最高奖金",
                            betAmountMaxByNumero: "彩种单期投注最大金额",
                            betAmountMaxOneBet: "彩种单笔投注最大金额",
                            itemMaxBettingAmountByNumero: "单期限额",
                            winAmountMaxByPlay: "玩法单期最高奖金",
                            drawInterval: "开奖时间",
                            AOZDrawInterval: "澳洲时间",
                            drawFrequency: "开奖频率",
                            drawFrequencyInfo: "每天%@期，%@一期",
                            prizeList: "奖金总览",
                            currency: "¥",
                            currencyThb: "$",
                            prizeListPrizeType:
                                ((t = {}),
                                s(t, null, "玩法奖金"),
                                s(t, "P_FIRST", "一等奖"),
                                s(t, "P_SECOND", "二等奖"),
                                s(t, "P_THIRD", "三等奖"),
                                s(t, "P_FOURTH", "四等奖"),
                                s(t, "P_FIFTH", "五等奖"),
                                s(t, "P_SIXTH", "六等奖"),
                                s(t, "P_SEVENTH", "七等奖"),
                                s(t, "P_EIGHTH", "八等奖"),
                                s(t, "P_NINTH", "九等奖"),
                                s(t, "VTX_BS_BIG", "大"),
                                s(t, "VTX_BS_SMALL", "小"),
                                s(t, "P_PK10_3_4_18_19", "3, 4, 18, 19"),
                                s(t, "P_PK10_5_6_16_17", "5, 6, 16, 17"),
                                s(t, "P_PK10_7_8_14_15", "7, 8, 14, 15"),
                                s(t, "P_PK10_9_10_12_13", "9, 10, 12, 13"),
                                s(t, "P_PK10_11", "11"),
                                s(t, "P_PK10_6_7_26_27", "6, 7, 26, 27"),
                                s(t, "P_PK10_8_25", "8, 25"),
                                s(t, "P_PK10_9_24", "9, 24"),
                                s(t, "P_PK10_10_23", "10, 23"),
                                s(t, "P_PK10_11_22", "11, 22"),
                                s(t, "P_PK10_12_21", "12, 21"),
                                s(t, "P_PK10_13_20", "13, 20"),
                                s(t, "P_PK10_14_19", "14, 19"),
                                s(t, "P_PK10_15_16_17_18", "15, 16, 17, 18"),
                                s(t, "P_11X5_0S5D", "0单5双"),
                                s(t, "P_11X5_5S0D", "5单0双"),
                                s(t, "P_11X5_1S4D", "1单4双"),
                                s(t, "P_11X5_4S1D", "4单1双"),
                                s(t, "P_11X5_2S3D", "2单3双"),
                                s(t, "P_11X5_3S2D", "3单2双"),
                                s(t, "P_11X5_3_9", "3, 9"),
                                s(t, "P_11X5_4_8", "4, 8"),
                                s(t, "P_11X5_5_7", "5, 7"),
                                s(t, "P_11X5_6", "6"),
                                s(t, "P_NOT_PAIR", "非对子"),
                                s(t, "P_PAIR", "对子"),
                                s(t, "P_ZU3", "组三"),
                                s(t, "P_ZU6", "组六"),
                                s(t, "P_ZA6", "杂六"),
                                s(t, "P_STRAIGHT", "顺子"),
                                s(t, "P_HALF_STRAIGHT", "半顺"),
                                s(t, "P_BAOZI", "豹子"),
                                s(t, "P_ANY_DANTUO", "胆拖"),
                                s(t, "P_BIG", "大"),
                                s(t, "P_SMALL", "小"),
                                s(t, "P_ODD", "单"),
                                s(t, "P_EVEN", "双"),
                                s(t, "P_B_O", "大单"),
                                s(t, "P_B_E", "大双"),
                                s(t, "P_S_O", "小单"),
                                s(t, "P_S_E", "小双"),
                                s(t, "PRIME", "质数"),
                                s(t, "COMPOSITE", "合数"),
                                s(t, "P_TIE", "和"),
                                s(t, "P_ANIMAL", "生肖"),
                                s(t, "P_COLOR_RED", "红"),
                                s(t, "P_COLOR_BLUE", "蓝"),
                                s(t, "P_COLOR_GREEN", "绿"),
                                s(t, "P_CB_RO", "红单"),
                                s(t, "P_CB_RE", "红双"),
                                s(t, "P_CB_RB", "红大"),
                                s(t, "P_CB_RS", "红小"),
                                s(t, "P_CB_BO", "蓝单"),
                                s(t, "P_CB_BE", "蓝双"),
                                s(t, "P_CB_BB", "蓝大"),
                                s(t, "P_CB_BS", "蓝小"),
                                s(t, "P_CB_GO", "绿单"),
                                s(t, "P_CB_GE", "绿双"),
                                s(t, "P_CB_GB", "绿大"),
                                s(t, "P_CB_GS", "绿小"),
                                s(t, "P_CB_RBO", "红大单"),
                                s(t, "P_CB_RBE", "红大双"),
                                s(t, "P_CB_RSO", "红小单"),
                                s(t, "P_CB_RSE", "红小双"),
                                s(t, "P_CB_BBO", "蓝大单"),
                                s(t, "P_CB_BBE", "蓝大双"),
                                s(t, "P_CB_BSO", "蓝小单"),
                                s(t, "P_CB_BSE", "蓝小双"),
                                s(t, "P_CB_GBO", "绿大单"),
                                s(t, "P_CB_GBE", "绿大双"),
                                s(t, "P_CB_GSO", "绿小单"),
                                s(t, "P_CB_GSE", "绿小双"),
                                s(t, "P_NORMAL_ANIMAL", "生肖"),
                                s(t, "P_FIRST_ANIMAL", "首肖"),
                                s(t, "P_HEAD_ZERO", "0头"),
                                s(t, "P_HEAD_ONE", "1头"),
                                s(t, "P_HEAD_TWO", "2头"),
                                s(t, "P_HEAD_THREE", "3头"),
                                s(t, "P_HEAD_FOUR", "4头"),
                                s(t, "P_TAIL_ZERO", "0尾"),
                                s(t, "P_TAIL_ONE", "1尾"),
                                s(t, "P_TAIL_TWO", "2尾"),
                                s(t, "P_TAIL_THREE", "3尾"),
                                s(t, "P_TAIL_FOUR", "4尾"),
                                s(t, "P_TAIL_FIVE", "5尾"),
                                s(t, "P_TAIL_SIX", "6尾"),
                                s(t, "P_TAIL_SEVEN", "7尾"),
                                s(t, "P_TAIL_EIGHT", "8尾"),
                                s(t, "P_TAIL_NINE", "9尾"),
                                s(t, "P_COMBINE_TWO", "2合"),
                                s(t, "P_COMBINE_THREE", "3合"),
                                s(t, "P_COMBINE_FOUR", "4合"),
                                s(t, "P_COMBINE_FIVE", "5合"),
                                s(t, "P_COMBINE_SIX", "6合"),
                                s(t, "P_COMBINE_SEVEN", "7合"),
                                s(t, "P_COMBINE_EIGHT", "8合"),
                                s(t, "P_COMBINE_NINE", "9合"),
                                s(t, "P_COMBINE_TEN", "10合"),
                                s(t, "P_COMBINE_ELEVEN", "11合"),
                                s(t, "P_SIX_NOT_IN", "6不中"),
                                s(t, "P_SEVEN_NOT_IN", "7不中"),
                                s(t, "P_EIGHT_NOT_IN", "8不中"),
                                s(t, "P_NINE_NOT_IN", "9不中"),
                                s(t, "P_TEN_NOT_IN", "10不中"),
                                s(t, "P_ELEVEN_NOT_IN", "11不中"),
                                s(t, "P_GENERAL", "龙虎"),
                                s(t, "P_GENERAL_TIE", "和"),
                                s(t, "P_ODD_EVEN", "单双"),
                                s(t, "K3_P_SUM_3", "3"),
                                s(t, "K3_P_SUM_4", "4"),
                                s(t, "K3_P_SUM_5", "5"),
                                s(t, "K3_P_SUM_6", "6"),
                                s(t, "K3_P_SUM_7", "7"),
                                s(t, "K3_P_SUM_8", "8"),
                                s(t, "K3_P_SUM_9", "9"),
                                s(t, "K3_P_SUM_10", "10"),
                                s(t, "K3_P_SUM_11", "11"),
                                s(t, "K3_P_SUM_12", "12"),
                                s(t, "K3_P_SUM_13", "13"),
                                s(t, "K3_P_SUM_14", "14"),
                                s(t, "K3_P_SUM_15", "15"),
                                s(t, "K3_P_SUM_16", "16"),
                                s(t, "K3_P_SUM_17", "17"),
                                s(t, "K3_P_SUM_18", "18"),
                                s(t, "P_Span_0", "0"),
                                s(t, "P_Span_1", "1"),
                                s(t, "P_Span_2", "2"),
                                s(t, "P_Span_3", "3"),
                                s(t, "P_Span_4", "4"),
                                s(t, "P_Span_5", "5"),
                                s(t, "P_Span_6", "6"),
                                s(t, "P_Span_7", "7"),
                                s(t, "P_Span_8", "8"),
                                s(t, "P_Span_9", "9"),
                                s(t, "P_BANKER", "庄"),
                                s(t, "P_PLAYER", "闲"),
                                s(t, "P_BANKER_PAIR", "庄对"),
                                s(t, "P_PLAYER_PAIR", "闲对"),
                                s(t, "4D_Fixed_Place_Unit", "个"),
                                s(t, "4D_Fixed_Place_Ten", "十"),
                                s(t, "4D_Fixed_Place_Hundred", "百"),
                                s(t, "4D_Fixed_Place_Thousand", "千"),
                                s(t, "K3_Span_0", "0"),
                                s(t, "K3_Span_1", "1"),
                                s(t, "K3_Span_2", "2"),
                                s(t, "K3_Span_3", "3"),
                                s(t, "K3_Span_4", "4"),
                                s(t, "K3_Span_5", "5"),
                                s(t, "Hoo_Hey_How_0", "鱼"),
                                s(t, "Hoo_Hey_How_1", "虾"),
                                s(t, "Hoo_Hey_How_2", "蟹"),
                                s(t, "P_Fan_1", "1番"),
                                s(t, "P_Fan_2", "2番"),
                                s(t, "P_Fan_3", "3番"),
                                s(t, "P_Fan_0", "4番"),
                                s(t, "P_Jiao_12", "1-2角"),
                                s(t, "P_Jiao_10", "1-4角"),
                                s(t, "P_Jiao_23", "2-3角"),
                                s(t, "P_Jiao_30", "3-4角"),
                                s(t, "P_1NIAN2", "1念2"),
                                s(t, "P_1NIAN3", "1念3"),
                                s(t, "P_1NIAN4", "1念4"),
                                s(t, "P_2NIAN1", "2念1"),
                                s(t, "P_2NIAN3", "2念3"),
                                s(t, "P_2NIAN4", "2念4"),
                                s(t, "P_3NIAN1", "3念1"),
                                s(t, "P_3NIAN2", "3念2"),
                                s(t, "P_3NIAN4", "3念4"),
                                s(t, "P_4NIAN1", "4念1"),
                                s(t, "P_4NIAN2", "4念2"),
                                s(t, "P_4NIAN3", "4念3"),
                                s(t, "VK3_SINGLE_DICE_1", "单骰"),
                                s(t, "VK3_SINGLE_DICE_2", "双骰"),
                                s(t, "VK3_SINGLE_DICE_3", "三骰"),
                                s(t, "VK3_SUM_4", "和值4"),
                                s(t, "VK3_SUM_5", "和值5"),
                                s(t, "VK3_SUM_6", "和值6"),
                                s(t, "VK3_SUM_7", "和值7"),
                                s(t, "VK3_SUM_8", "和值8"),
                                s(t, "VK3_SUM_9", "和值9"),
                                s(t, "VK3_SUM_10", "和值10"),
                                s(t, "VK3_SUM_11", "和值11"),
                                s(t, "VK3_SUM_12", "和值12"),
                                s(t, "VK3_SUM_13", "和值13"),
                                s(t, "VK3_SUM_14", "和值14"),
                                s(t, "VK3_SUM_15", "和值15"),
                                s(t, "VK3_SUM_16", "和值16"),
                                s(t, "VK3_SUM_17", "和值17"),
                                s(t, "VK3_SURROUND_111", "围骰111"),
                                s(t, "VK3_SURROUND_222", "围骰222"),
                                s(t, "VK3_SURROUND_333", "围骰333"),
                                s(t, "VK3_SURROUND_444", "围骰444"),
                                s(t, "VK3_SURROUND_555", "围骰555"),
                                s(t, "VK3_SURROUND_666", "围骰666"),
                                s(t, "VK3_ALL_SURROUND_1", "全围"),
                                s(t, "VK3_BSOE_BIG", "大"),
                                s(t, "VK3_BSOE_SMALL", "小"),
                                s(t, "VK3_BSOE_ODD", "单"),
                                s(t, "VK3_BSOE_EVEN", "双"),
                                s(t, "VPK10_RANK_1", "猜排名-第一名"),
                                s(t, "VPK10_RANK_2", "猜排名-第二名"),
                                s(t, "VPK10_RANK_3", "猜排名-第三名"),
                                s(t, "VPK10_RANK_4", "猜排名-第四名"),
                                s(t, "VPK10_RANK_5", "猜排名-第五名"),
                                s(t, "VPK10_RANK_6", "猜排名-第六名"),
                                s(t, "VPK10_RANK_7", "猜排名-第七名"),
                                s(t, "VPK10_RANK_8", "猜排名-第八名"),
                                s(t, "VPK10_RANK_9", "猜排名-第九名"),
                                s(t, "VPK10_RANK_10", "猜排名-第十名"),
                                s(t, "VPK10_RANK1_1", "猜排名1-第一名"),
                                s(t, "VPK10_RANK1_2", "猜排名1-第二名"),
                                s(t, "VPK10_RANK1_3", "猜排名1-第三名"),
                                s(t, "VPK10_RANK1_4", "猜排名1-第四名"),
                                s(t, "VPK10_RANK1_5", "猜排名1-第五名"),
                                s(t, "VPK10_RANK1_6", "猜排名1-第六名"),
                                s(t, "VPK10_RANK1_7", "猜排名1-第七名"),
                                s(t, "VPK10_RANK1_8", "猜排名1-第八名"),
                                s(t, "VPK10_RANK1_9", "猜排名1-第九名"),
                                s(t, "VPK10_RANK1_10", "猜排名1-第十名"),
                                s(t, "VPK10_RANK2_1", "猜排名2-第一名"),
                                s(t, "VPK10_RANK2_2", "猜排名2-第二名"),
                                s(t, "VPK10_RANK2_3", "猜排名2-第三名"),
                                s(t, "VPK10_RANK2_4", "猜排名2-第四名"),
                                s(t, "VPK10_RANK2_5", "猜排名2-第五名"),
                                s(t, "VPK10_RANK2_6", "猜排名2-第六名"),
                                s(t, "VPK10_RANK2_7", "猜排名2-第七名"),
                                s(t, "VPK10_RANK2_8", "猜排名2-第八名"),
                                s(t, "VPK10_RANK2_9", "猜排名2-第九名"),
                                s(t, "VPK10_RANK2_10", "猜排名2-第十名"),
                                s(t, "VPK10_RANK3_1", "猜排名3-第一名"),
                                s(t, "VPK10_RANK3_2", "猜排名3-第二名"),
                                s(t, "VPK10_RANK3_3", "猜排名3-第三名"),
                                s(t, "VPK10_RANK3_4", "猜排名3-第四名"),
                                s(t, "VPK10_RANK3_5", "猜排名3-第五名"),
                                s(t, "VPK10_RANK3_6", "猜排名3-第六名"),
                                s(t, "VPK10_RANK3_7", "猜排名3-第七名"),
                                s(t, "VPK10_RANK3_8", "猜排名3-第八名"),
                                s(t, "VPK10_RANK3_9", "猜排名3-第九名"),
                                s(t, "VPK10_RANK3_10", "猜排名3-第十名"),
                                s(t, "VPK10_RANK4_1", "猜排名4-第一名"),
                                s(t, "VPK10_RANK4_2", "猜排名4-第二名"),
                                s(t, "VPK10_RANK4_3", "猜排名4-第三名"),
                                s(t, "VPK10_RANK4_4", "猜排名4-第四名"),
                                s(t, "VPK10_RANK4_5", "猜排名4-第五名"),
                                s(t, "VPK10_RANK4_6", "猜排名4-第六名"),
                                s(t, "VPK10_RANK4_7", "猜排名4-第七名"),
                                s(t, "VPK10_RANK4_8", "猜排名4-第八名"),
                                s(t, "VPK10_RANK4_9", "猜排名4-第九名"),
                                s(t, "VPK10_RANK4_10", "猜排名4-第十名"),
                                s(t, "VPK10_RANK5_1", "猜排名5-第一名"),
                                s(t, "VPK10_RANK5_2", "猜排名5-第二名"),
                                s(t, "VPK10_RANK5_3", "猜排名5-第三名"),
                                s(t, "VPK10_RANK5_4", "猜排名5-第四名"),
                                s(t, "VPK10_RANK5_5", "猜排名5-第五名"),
                                s(t, "VPK10_RANK5_6", "猜排名5-第六名"),
                                s(t, "VPK10_RANK5_7", "猜排名5-第七名"),
                                s(t, "VPK10_RANK5_8", "猜排名5-第八名"),
                                s(t, "VPK10_RANK5_9", "猜排名5-第九名"),
                                s(t, "VPK10_RANK5_10", "猜排名5-第十名"),
                                s(t, "VPK10_RANK6_1", "猜排名6-第一名"),
                                s(t, "VPK10_RANK6_2", "猜排名6-第二名"),
                                s(t, "VPK10_RANK6_3", "猜排名6-第三名"),
                                s(t, "VPK10_RANK6_4", "猜排名6-第四名"),
                                s(t, "VPK10_RANK6_5", "猜排名6-第五名"),
                                s(t, "VPK10_RANK6_6", "猜排名6-第六名"),
                                s(t, "VPK10_RANK6_7", "猜排名6-第七名"),
                                s(t, "VPK10_RANK6_8", "猜排名6-第八名"),
                                s(t, "VPK10_RANK6_9", "猜排名6-第九名"),
                                s(t, "VPK10_RANK6_10", "猜排名6-第十名"),
                                s(t, "VPK10_RANK7_1", "猜排名7-第一名"),
                                s(t, "VPK10_RANK7_2", "猜排名7-第二名"),
                                s(t, "VPK10_RANK7_3", "猜排名7-第三名"),
                                s(t, "VPK10_RANK7_4", "猜排名7-第四名"),
                                s(t, "VPK10_RANK7_5", "猜排名7-第五名"),
                                s(t, "VPK10_RANK7_6", "猜排名7-第六名"),
                                s(t, "VPK10_RANK7_7", "猜排名7-第七名"),
                                s(t, "VPK10_RANK7_8", "猜排名7-第八名"),
                                s(t, "VPK10_RANK7_9", "猜排名7-第九名"),
                                s(t, "VPK10_RANK7_10", "猜排名7-第十名"),
                                s(t, "VPK10_RANK8_1", "猜排名8-第一名"),
                                s(t, "VPK10_RANK8_2", "猜排名8-第二名"),
                                s(t, "VPK10_RANK8_3", "猜排名8-第三名"),
                                s(t, "VPK10_RANK8_4", "猜排名8-第四名"),
                                s(t, "VPK10_RANK8_5", "猜排名8-第五名"),
                                s(t, "VPK10_RANK8_6", "猜排名8-第六名"),
                                s(t, "VPK10_RANK8_7", "猜排名8-第七名"),
                                s(t, "VPK10_RANK8_8", "猜排名8-第八名"),
                                s(t, "VPK10_RANK8_9", "猜排名8-第九名"),
                                s(t, "VPK10_RANK8_10", "猜排名8-第十名"),
                                s(t, "VPK10_RANK9_1", "猜排名9-第一名"),
                                s(t, "VPK10_RANK9_2", "猜排名9-第二名"),
                                s(t, "VPK10_RANK9_3", "猜排名9-第三名"),
                                s(t, "VPK10_RANK9_4", "猜排名9-第四名"),
                                s(t, "VPK10_RANK9_5", "猜排名9-第五名"),
                                s(t, "VPK10_RANK9_6", "猜排名9-第六名"),
                                s(t, "VPK10_RANK9_7", "猜排名9-第七名"),
                                s(t, "VPK10_RANK9_8", "猜排名9-第八名"),
                                s(t, "VPK10_RANK9_9", "猜排名9-第九名"),
                                s(t, "VPK10_RANK9_10", "猜排名9-第十名"),
                                s(t, "VPK10_RANK10_1", "猜排名10-第一名"),
                                s(t, "VPK10_RANK10_2", "猜排名10-第二名"),
                                s(t, "VPK10_RANK10_3", "猜排名10-第三名"),
                                s(t, "VPK10_RANK10_4", "猜排名10-第四名"),
                                s(t, "VPK10_RANK10_5", "猜排名10-第五名"),
                                s(t, "VPK10_RANK10_6", "猜排名10-第六名"),
                                s(t, "VPK10_RANK10_7", "猜排名10-第七名"),
                                s(t, "VPK10_RANK10_8", "猜排名10-第八名"),
                                s(t, "VPK10_RANK10_9", "猜排名10-第九名"),
                                s(t, "VPK10_RANK10_10", "猜排名10-第十名"),
                                s(t, "VPK10_RANK_BSOE_1_BIG", "第一名-大"),
                                s(t, "VPK10_RANK_BSOE_1_SMALL", "第一名-小"),
                                s(t, "VPK10_RANK_BSOE_1_ODD", "第一名-单"),
                                s(t, "VPK10_RANK_BSOE_1_EVEN", "第一名-双"),
                                s(t, "VPK10_RANK_BSOE_2_BIG", "第二名-大"),
                                s(t, "VPK10_RANK_BSOE_2_SMALL", "第二名-小"),
                                s(t, "VPK10_RANK_BSOE_2_ODD", "第二名-单"),
                                s(t, "VPK10_RANK_BSOE_2_EVEN", "第二名-双"),
                                s(t, "VPK10_RANK_BSOE_3_BIG", "第三名-大"),
                                s(t, "VPK10_RANK_BSOE_3_SMALL", "第三名-小"),
                                s(t, "VPK10_RANK_BSOE_3_ODD", "第三名-单"),
                                s(t, "VPK10_RANK_BSOE_3_EVEN", "第三名-双"),
                                s(t, "VPK10_RANK_BSOE_4_BIG", "第四名-大"),
                                s(t, "VPK10_RANK_BSOE_4_SMALL", "第四名-小"),
                                s(t, "VPK10_RANK_BSOE_4_ODD", "第四名-单"),
                                s(t, "VPK10_RANK_BSOE_4_EVEN", "第四名-双"),
                                s(t, "VPK10_RANK_BSOE_5_BIG", "第五名-大"),
                                s(t, "VPK10_RANK_BSOE_5_SMALL", "第五名-小"),
                                s(t, "VPK10_RANK_BSOE_5_ODD", "第五名-单"),
                                s(t, "VPK10_RANK_BSOE_5_EVEN", "第五名-双"),
                                s(t, "VPK10_RANK_BSOE_6_BIG", "第六名-大"),
                                s(t, "VPK10_RANK_BSOE_6_SMALL", "第六名-小"),
                                s(t, "VPK10_RANK_BSOE_6_ODD", "第六名-单"),
                                s(t, "VPK10_RANK_BSOE_6_EVEN", "第六名-双"),
                                s(t, "VPK10_RANK_BSOE_7_BIG", "第七名-大"),
                                s(t, "VPK10_RANK_BSOE_7_SMALL", "第七名-小"),
                                s(t, "VPK10_RANK_BSOE_7_ODD", "第七名-单"),
                                s(t, "VPK10_RANK_BSOE_7_EVEN", "第七名-双"),
                                s(t, "VPK10_RANK_BSOE_8_BIG", "第八名-大"),
                                s(t, "VPK10_RANK_BSOE_8_SMALL", "第八名-小"),
                                s(t, "VPK10_RANK_BSOE_8_ODD", "第八名-单"),
                                s(t, "VPK10_RANK_BSOE_8_EVEN", "第八名-双"),
                                s(t, "VPK10_RANK_BSOE_9_BIG", "第九名-大"),
                                s(t, "VPK10_RANK_BSOE_9_SMALL", "第九名-小"),
                                s(t, "VPK10_RANK_BSOE_9_ODD", "第九名-单"),
                                s(t, "VPK10_RANK_BSOE_9_EVEN", "第九名-双"),
                                s(t, "VPK10_RANK_BSOE_10_BIG", "第十名-大"),
                                s(t, "VPK10_RANK_BSOE_10_SMALL", "第十名-小"),
                                s(t, "VPK10_RANK_BSOE_10_ODD", "第十名-单"),
                                s(t, "VPK10_RANK_BSOE_10_EVEN", "第十名-双"),
                                s(t, "VPK10_1_2_SUM_3", "冠亚和3"),
                                s(t, "VPK10_1_2_SUM_4", "冠亚和4"),
                                s(t, "VPK10_1_2_SUM_5", "冠亚和5"),
                                s(t, "VPK10_1_2_SUM_6", "冠亚和6"),
                                s(t, "VPK10_1_2_SUM_7", "冠亚和7"),
                                s(t, "VPK10_1_2_SUM_8", "冠亚和8"),
                                s(t, "VPK10_1_2_SUM_9", "冠亚和9"),
                                s(t, "VPK10_1_2_SUM_10", "冠亚和10"),
                                s(t, "VPK10_1_2_SUM_11", "冠亚和11"),
                                s(t, "VPK10_1_2_SUM_12", "冠亚和12"),
                                s(t, "VPK10_1_2_SUM_13", "冠亚和13"),
                                s(t, "VPK10_1_2_SUM_14", "冠亚和14"),
                                s(t, "VPK10_1_2_SUM_15", "冠亚和15"),
                                s(t, "VPK10_1_2_SUM_16", "冠亚和16"),
                                s(t, "VPK10_1_2_SUM_17", "冠亚和17"),
                                s(t, "VPK10_1_2_SUM_18", "冠亚和18"),
                                s(t, "VPK10_1_2_SUM_19", "冠亚和19"),
                                s(t, "VPK10_1_2_SUM_BSOE_BIG", "冠亚和-大"),
                                s(t, "VPK10_1_2_SUM_BSOE_SMALL", "冠亚和-小"),
                                s(t, "VPK10_1_2_SUM_BSOE_ODD", "冠亚和-单"),
                                s(t, "VPK10_1_2_SUM_BSOE_EVEN", "冠亚和-双"),
                                s(t, "VPK10_DRAGON_TIGER_1-10_DRAGON", "1-10龙"),
                                s(t, "VPK10_DRAGON_TIGER_1-10_TIGER", "1-10虎"),
                                s(t, "VPK10_DRAGON_TIGER_2-9_DRAGON", "2-9龙"),
                                s(t, "VPK10_DRAGON_TIGER_2-9_TIGER", "2-9虎"),
                                s(t, "VPK10_DRAGON_TIGER_3-8_DRAGON", "3-8龙"),
                                s(t, "VPK10_DRAGON_TIGER_3-8_TIGER", "3-8虎"),
                                s(t, "VPK10_DRAGON_TIGER_4-7_DRAGON", "4-7龙"),
                                s(t, "VPK10_DRAGON_TIGER_4-7_TIGER", "4-7虎"),
                                s(t, "VPK10_DRAGON_TIGER_5-6_DRAGON", "5-6龙"),
                                s(t, "VPK10_DRAGON_TIGER_5-6_TIGER", "5-6虎"),
                                s(t, "P_KENO_ANY1_1", "选1中1"),
                                s(t, "P_KENO_ANY2_2", "选2中2"),
                                s(t, "P_KENO_ANY3_2", "二等奖"),
                                s(t, "P_KENO_ANY3_3", "一等奖"),
                                s(t, "P_KENO_ANY4_2", "三等奖"),
                                s(t, "P_KENO_ANY4_3", "二等奖"),
                                s(t, "P_KENO_ANY4_4", "一等奖"),
                                s(t, "P_KENO_ANY5_3", "三等奖"),
                                s(t, "P_KENO_ANY5_4", "二等奖"),
                                s(t, "P_KENO_ANY5_5", "一等奖"),
                                s(t, "P_KENO_ANY6_3", "四等奖"),
                                s(t, "P_KENO_ANY6_4", "三等奖"),
                                s(t, "P_KENO_ANY6_5", "二等奖"),
                                s(t, "P_KENO_ANY6_6", "一等奖"),
                                s(t, "P_KENO_ANY7_0", "五等奖"),
                                s(t, "P_KENO_ANY7_4", "四等奖"),
                                s(t, "P_KENO_ANY7_5", "三等奖"),
                                s(t, "P_KENO_ANY7_6", "二等奖"),
                                s(t, "P_KENO_ANY7_7", "一等奖"),
                                s(t, "VXD_BS_BIG", "大"),
                                s(t, "VXD_BS_SMALL", "小"),
                                s(t, "VXD_OE_ODD", "单"),
                                s(t, "VXD_OE_EVEN", "双"),
                                s(t, "VXD_4R_1", "全红"),
                                s(t, "VXD_4W_1", "全白"),
                                s(t, "VXD_3W1R_1", "3白+1红"),
                                s(t, "VXD_3R1W_1", "3红+1白"),
                                t),
                            longDragon: "长龙投注",
                            longDragonLott: "彩种类型",
                            refresh: "刷新",
                            longDragonContinuousDraw: "连%@期",
                            voucherCenter: "充值",
                            twoSidePlay: {
                                showAll: "全部",
                                threeRow: "连三",
                                fiveRow: "连五",
                                sevenRow: "连七",
                                nineRow: "连九",
                                allSelected: "全选",
                            },
                            betsNTotalAmount:
                                '您选择了<div class="font-bold">%@</div>注，共<div class="font-bold">%@</div>元，',
                            predictionAmount: '单注最高可中<div class="red-words">%@</div>元',
                            willWin: "预计中奖金额",
                            defaultMode: "预设模式",
                            defaultBetting: "预设玩法",
                            defaultBettingApproach: "预设选号方式",
                            MultipleDefaultBetting: "批量调整预设玩法及选号方式",
                            MultipleDefaultMode: "批量调整预设模式",
                            SaveDefaultPlayBetting: "保存预设玩法及选号方式",
                            MultipleBonusOrBetLimit: "批量调整赔率或限注百分比",
                            MultipleBonus: "批量调整赔率",
                            ResumeAfterSave: "排序时无法进入彩种",
                            ParameterValue: "参数值",
                            AllBets: "全选注数",
                            LimitBets: "被限制注数",
                            LimitOnlyBetMaxOdds: "系列固定最大值",
                            LimitOnlyBetMinOdds: "系列固定最小值",
                            LimitOnlyBetBar: "系列值使用拉杆",
                            NoData: "尚未设定预设玩法",
                            pkModeRedWarning: "【单挑模式】说明：投注的中奖概率低于或等于 %@ 的均为单挑模式。",
                            pkModeRedWarningBracket: "（单挑每期订单奖金上限 %@ ，超出的奖金系统将予以扣除）",
                            crowdfunding: {
                                crowdfundingCart: "合买方案",
                                crowdfunding: "合买",
                                crowdfundingLobby: "合买大厅",
                                planDetail: "方案详情",
                                crowdfundingDetail: "合买投注详情",
                                notIncludeSystemGuaranteed: "不含系统保底",
                                fundingTime: "认购时间",
                                purchaseAmount: "认购金额",
                                fundingStock: "认购份数",
                                stock: "份",
                                resultAmount: "共%@条",
                                goTo: "前往",
                                page: "页",
                                customerName: "发起人",
                                bettingTime: "发起时间",
                                crowdfundingNum: "方案编号",
                                cancelPlan: "撤销",
                                copy: "复制",
                                alreadyCopied: "方案编号已复制",
                                planContent: "方案内容",
                                participantUsers: "参与用户",
                                myInvolved: "我的参与",
                                planStatus: "方案状态",
                                planProgress: "方案进度",
                                numero: "合买期号",
                                winningNumber: "本期开奖号码",
                                totalQuantity: "总份数",
                                winningAmount: "中奖奖金",
                                bettingInfoList: "方案内容",
                                dollar: "元",
                                numeroUnit: "期",
                                lockTime: "封盘时间",
                                progress: "合买进度",
                                totalBetAmount: "方案金额",
                                availableQuantity: "剩余份数",
                                singleBetAmount: "每份金额",
                                availableQuantityAndSingleBetAmount: "剩余份数 | 每份金额",
                                purchase: "我要认购",
                                purchaseNow: "立即认购",
                                outOfQuantity: "已额满",
                                alreadyEnded: "已结束",
                                status: "中奖状态",
                                guaranteed: "系统保底",
                                privicy: "是否公开",
                                quantity: "份",
                                accountFor: "占",
                                gameName: "彩种名称",
                                purchaseNum: "跟单人数",
                                playBonus: "胜率",
                                bettingAmount: "方案金额",
                                progressRate: "进度 + 保底",
                                detail: "操作",
                                search: "搜索",
                                recoverDefault: "恢复默认",
                                percentage: "所占比例",
                                userName: "用户名",
                                crowdfundingSubtotal:
                                    '已有<span class="hl">%@</span>人参与，共认购<span class="hl">%@</span>份',
                                crowdfundingSubtotalOfAmount:
                                    '已有<span class="hl">%@</span>人参与，共认购<span class="hl">%@</span>元',
                                confirmCancelPlan: "请确认撤销信息",
                                purchaseAmountTotal: "已认购金额",
                                cancelPlanWarning: "请注意！撤销方案将连同已参与人订单一起撤单！",
                                cancelPlanQuestion: "是否撤销方案？",
                                cancelPlanSuccess: "撤销方案成功",
                                confirmPurchasePlan: "请确认认购信息",
                                purchasePlanSuccess: "认购方案成功",
                                system: "系统",
                            },
                            planStatus: {
                                IN_PROGRESS: "进行中",
                                WON: "已中奖",
                                NO_PRIZE: "未中奖",
                                TIE: "和局",
                                CANCELLED: "已撤销",
                            },
                            planProgress: {
                                PLAN_ASSIGNED: "提交方案",
                                OPEN_FOR_PURCHASE: "认购中",
                                WAIT_FOR_DRAWING: "待开奖",
                                COMPLETED: "已完成",
                            },
                            planPrivacy: {
                                OPEN: "完全公开",
                                OPEN_AFTER_DRAWING: "截止后公开",
                                OPEN_FOR_PURCHASER: "仅跟单人可见",
                                CONFIDENTIAL: "完全保密",
                            },
                            drawPrize: {
                                specialPrize: "特等奖",
                                firstPrize: "一等奖",
                                secondPrize: "二等奖",
                                thirdPrize: "三等奖",
                                fourthPrize: "四等奖",
                                fifthPrize: "五等奖",
                                sixthPrize: "六等奖",
                                seventhPrize: "七等奖",
                                eighthPrize: "八等奖",
                            },
                            betThenDraw: "即投即开",
                        },
                        i.default
                    ),
                    r.default
                );
                e.default = d;
            },
            3379: function(_, e) {
                function a(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function t(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var t = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? a(Object(t), !0).forEach(function(e) {
                                  n(_, e, t[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(t))
                            : a(Object(t)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(t, e));
                              });
                    }
                    return _;
                }
                function n(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var i = function(_, e) {
                        for (var a = [], t = 0; t < e; t += 1) a.push("".concat(_ + t));
                        return a;
                    },
                    r = i(0, 10),
                    o = ["大", "小", "单", "双"],
                    l = ["大", "小", "单", "双"],
                    u = ["豹子", "顺子", "对子", "杂六", "半顺"],
                    s = ["虎", "龙", "和"],
                    d = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
                    S = i(3, 17),
                    c = i(6, 22),
                    T = i(0, 28),
                    E = ["极大", "极小"],
                    y = ["", "红", "蓝", "绿"],
                    O = ["大单", "大双"],
                    m = ["小单", "小双"],
                    N = ["红", "黑"],
                    p = i(3, 26),
                    P = {
                        12: "1,2",
                        13: "1,3",
                        14: "1,4",
                        15: "1,5",
                        16: "1,6",
                        23: "2,3",
                        24: "2,4",
                        25: "2,5",
                        26: "2,6",
                        34: "3,4",
                        35: "3,5",
                        36: "3,6",
                        45: "4,5",
                        46: "4,6",
                        56: "5,6",
                    },
                    A = i(1, 6),
                    g = { 1: "1,1,1", 2: "2,2,2", 3: "3,3,3", 4: "4,4,4", 5: "5,5,5", 6: "6,6,6" },
                    R = ["任意豹子"],
                    L = { 1: "1,1", 2: "2,2", 3: "3,3", 4: "4,4", 5: "5,5", 6: "6,6" },
                    C = ["和大", "和小", "和单", "和双", "尾大", "尾小"],
                    h = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"],
                    f = function(_, e) {
                        var a = {},
                            t = [];
                        switch (e) {
                            case "straight":
                                t = [].concat(r);
                                break;
                            case "bsoe":
                                t = [].concat(o);
                                break;
                            case "totalsum":
                                t = [].concat(l);
                                break;
                            case "special":
                                t = [].concat(u);
                                break;
                            case "dragon":
                                t = [].concat(s);
                                break;
                            case "pk10Straight":
                                t = [].concat(d);
                                break;
                            case "twoSum":
                                t = [].concat(S);
                                break;
                            case "threeSum":
                                t = [].concat(c);
                                break;
                            case "spcialSum":
                                t = [].concat(T);
                                break;
                            case "extremum":
                                t = [].concat(E);
                                break;
                            case "color":
                                t = [].concat(y);
                                break;
                            case "bigOe":
                                t = [].concat(O);
                                break;
                            case "smallOe":
                                t = [].concat(m);
                                break;
                            case "k3Straight":
                                t = [].concat(p);
                                break;
                            case "k3DifferentTwo":
                                t = P;
                                break;
                            case "k3SingleSame":
                                t = [].concat(A);
                                break;
                            case "k3Boazi":
                                t = g;
                                break;
                            case "k3AnyBoazi":
                                t = [].concat(R);
                                break;
                            case "k3SingleSameTwo":
                                t = L;
                                break;
                            case "k3RB":
                                t = [].concat(N);
                                break;
                            case "11X5TwoSideTotalSumGroup":
                                t = [].concat(C);
                                break;
                            case "11X5Ball":
                                t = [].concat(h);
                        }
                        return (
                            "pk10Straight" === e ||
                            "twoSum" === e ||
                            "threeSum" === e ||
                            "k3Straight" === e ||
                            "k3SingleSame" === e ||
                            "11X5Ball" === e
                                ? t.forEach(function(e) {
                                      a["".concat(_, "_").concat(e)] = e;
                                  })
                                : "bigOe" === e || "smallOe" === e
                                ? t.forEach(function(e, t) {
                                      a["".concat(_, "_").concat(t + 2)] = e;
                                  })
                                : "k3DifferentTwo" === e || "k3Boazi" === e || "k3SingleSameTwo" === e
                                ? Object.keys(t).forEach(function(e) {
                                      a["".concat(_, "_").concat(e)] = t[e];
                                  })
                                : t.forEach(function(e, t) {
                                      a["".concat(_, "_").concat(t)] = e;
                                  }),
                            a
                        );
                    },
                    M = f(1843, "dragon"),
                    b = f(1844, "dragon"),
                    D = f(1845, "dragon"),
                    B = f(1847, "dragon"),
                    I = f(1848, "dragon"),
                    v = f(1849, "dragon"),
                    F = f(1850, "dragon"),
                    K = f(1851, "dragon"),
                    V = f(1852, "dragon"),
                    G = f(1855, "straight"),
                    H = f(1805, "straight"),
                    x = f(1806, "bsoe"),
                    w = f(1808, "straight"),
                    U = f(1809, "bsoe"),
                    X = f(1811, "straight"),
                    k = f(1812, "bsoe"),
                    W = f(1814, "straight"),
                    j = f(1815, "bsoe"),
                    z = f(1817, "straight"),
                    Y = f(1818, "bsoe"),
                    J = f(1820, "special"),
                    q = f(1822, "special"),
                    Z = f(1824, "special"),
                    Q = f(1826, "totalsum"),
                    $ = f(1827, "dragon"),
                    __ = f(1858, "bsoe"),
                    e_ = f(1860, "bsoe"),
                    a_ = f(1861, "dragon"),
                    t_ = f(1863, "bsoe"),
                    n_ = f(1864, "dragon"),
                    i_ = f(1866, "bsoe"),
                    r_ = f(1867, "dragon"),
                    o_ = f(1869, "bsoe"),
                    l_ = f(1870, "dragon"),
                    u_ = f(1872, "bsoe"),
                    s_ = f(1873, "dragon"),
                    d_ = f(1875, "bsoe"),
                    S_ = f(1877, "bsoe"),
                    c_ = f(1879, "bsoe"),
                    T_ = f(1881, "bsoe"),
                    E_ = f(1883, "bsoe"),
                    y_ = f(1889, "pk10Straight"),
                    O_ = f(1890, "pk10Straight"),
                    m_ = f(1891, "pk10Straight"),
                    N_ = f(1892, "pk10Straight"),
                    p_ = f(1893, "pk10Straight"),
                    P_ = f(1894, "pk10Straight"),
                    A_ = f(1895, "pk10Straight"),
                    g_ = f(1896, "pk10Straight"),
                    R_ = f(1897, "pk10Straight"),
                    L_ = f(1898, "pk10Straight"),
                    C_ = f(1861, "dragon"),
                    h_ = f(1864, "dragon"),
                    f_ = f(1867, "dragon"),
                    M_ = f(1870, "dragon"),
                    b_ = f(1873, "dragon"),
                    D_ = f(1885, "twoSum"),
                    B_ = f(1886, "threeSum"),
                    I_ = f(1887, "twoSum"),
                    v_ = f(1907, "spcialSum"),
                    F_ = f(1909, "bsoe"),
                    K_ = f(2167, "bsoe"),
                    V_ = f(2165, "bsoe"),
                    G_ = f(2163, "bsoe"),
                    H_ = f("1910_0", "bigOe"),
                    x_ = f("1910_1", "smallOe"),
                    w_ = f(1911, "extremum"),
                    U_ = f(1913, "color"),
                    X_ = f(1914, "special"),
                    k_ = f(1934, "k3Straight"),
                    W_ = f(2053, "k3Straight"),
                    j_ = f(1936, "bsoe"),
                    z_ = f(2054, "bsoe"),
                    Y_ = f(2238, "bsoe"),
                    J_ = f(2228, "k3RB"),
                    q_ = f(2269, "bsoe"),
                    Z_ = f(2270, "bsoe"),
                    Q_ = f(1938, "k3DifferentTwo"),
                    $_ = f(1940, "k3SingleSame"),
                    _e = f(2243, "k3SingleSame"),
                    ee = f(1942, "k3Boazi"),
                    ae = f(1943, "k3AnyBoazi"),
                    te = f(1945, "k3SingleSameTwo"),
                    ne = f(1948, "11X5TwoSideTotalSumGroup"),
                    ie = f(1950, "bsoe"),
                    re = f(1952, "bsoe"),
                    oe = f(1954, "bsoe"),
                    le = f(1956, "bsoe"),
                    ue = f(1958, "bsoe"),
                    se = f(1961, "11X5Ball"),
                    de = f(1966, "11X5Ball"),
                    Se = f(1971, "11X5Ball"),
                    ce = f(1976, "11X5Ball"),
                    Te = f(1981, "11X5Ball"),
                    Ee = f(2004, "dragon"),
                    ye = f(2005, "dragon"),
                    Oe = f(2006, "dragon"),
                    me = f(2007, "dragon"),
                    Ne = f(2008, "dragon"),
                    pe = f(2009, "dragon"),
                    Pe = f(2010, "dragon"),
                    Ae = f(2011, "dragon"),
                    ge = f(2012, "dragon"),
                    Re = f(2013, "dragon"),
                    Le = t(
                        t(
                            t(
                                t(
                                    t(
                                        t(
                                            t(
                                                t(
                                                    t(
                                                        t(
                                                            t(
                                                                t(
                                                                    t(
                                                                        t(
                                                                            t(
                                                                                t(
                                                                                    t(
                                                                                        t(
                                                                                            t(
                                                                                                t(
                                                                                                    t(
                                                                                                        t(
                                                                                                            t(
                                                                                                                t(
                                                                                                                    t(
                                                                                                                        t(
                                                                                                                            t(
                                                                                                                                t(
                                                                                                                                    t(
                                                                                                                                        t(
                                                                                                                                            t(
                                                                                                                                                t(
                                                                                                                                                    t(
                                                                                                                                                        t(
                                                                                                                                                            t(
                                                                                                                                                                t(
                                                                                                                                                                    t(
                                                                                                                                                                        t(
                                                                                                                                                                            t(
                                                                                                                                                                                t(
                                                                                                                                                                                    t(
                                                                                                                                                                                        t(
                                                                                                                                                                                            t(
                                                                                                                                                                                                t(
                                                                                                                                                                                                    t(
                                                                                                                                                                                                        t(
                                                                                                                                                                                                            t(
                                                                                                                                                                                                                t(
                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                                                                                                                                        t(
                                                                                                                                                                                                                                                                                                                                                                                                                                            t(
                                                                                                                                                                                                                                                                                                                                                                                                                                                t(
                                                                                                                                                                                                                                                                                                                                                                                                                                                    t(
                                                                                                                                                                                                                                                                                                                                                                                                                                                        {},
                                                                                                                                                                                                                                                                                                                                                                                                                                                        M
                                                                                                                                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                                                                                                                                    b
                                                                                                                                                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                                                                                                                                                D
                                                                                                                                                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                                                                                                                                                            B
                                                                                                                                                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                                                                                                                                                        I
                                                                                                                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                                                                                                                    v
                                                                                                                                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                                                                                                                                F
                                                                                                                                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                                                                                                                                            K
                                                                                                                                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                                                                                                                                        V
                                                                                                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                                                                                                    G
                                                                                                                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                                                                                                                H
                                                                                                                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                                                                                                                            x
                                                                                                                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                                                                                                                        w
                                                                                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                                                                                    U
                                                                                                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                                                                                                X
                                                                                                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                                                                                                            k
                                                                                                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                                                                                                        W
                                                                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                                                                    j
                                                                                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                                                                                z
                                                                                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                                                                                            Y
                                                                                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                                                                                        J
                                                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                                                    q
                                                                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                                                                Z
                                                                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                                                                            Q
                                                                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                                                                        $
                                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                                    e_
                                                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                                                a_
                                                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                                                            __
                                                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                                                        t_
                                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                                    n_
                                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                                i_
                                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                                            r_
                                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                                        o_
                                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                                    l_
                                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                                u_
                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                            s_
                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                        d_
                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                    S_
                                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                                c_
                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                            T_
                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                        E_
                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                    D_
                                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                                B_
                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                            I_
                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                        y_
                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                    O_
                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                                m_
                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                            N_
                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                        p_
                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                    P_
                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                A_
                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                            g_
                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                        R_
                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                    L_
                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                p_
                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                            C_
                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                        h_
                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                    f_
                                                                                                                                                                                                                ),
                                                                                                                                                                                                                M_
                                                                                                                                                                                                            ),
                                                                                                                                                                                                            b_
                                                                                                                                                                                                        ),
                                                                                                                                                                                                        v_
                                                                                                                                                                                                    ),
                                                                                                                                                                                                    F_
                                                                                                                                                                                                ),
                                                                                                                                                                                                K_
                                                                                                                                                                                            ),
                                                                                                                                                                                            V_
                                                                                                                                                                                        ),
                                                                                                                                                                                        G_
                                                                                                                                                                                    ),
                                                                                                                                                                                    H_
                                                                                                                                                                                ),
                                                                                                                                                                                x_
                                                                                                                                                                            ),
                                                                                                                                                                            w_
                                                                                                                                                                        ),
                                                                                                                                                                        U_
                                                                                                                                                                    ),
                                                                                                                                                                    X_
                                                                                                                                                                ),
                                                                                                                                                                k_
                                                                                                                                                            ),
                                                                                                                                                            j_
                                                                                                                                                        ),
                                                                                                                                                        Q_
                                                                                                                                                    ),
                                                                                                                                                    $_
                                                                                                                                                ),
                                                                                                                                                _e
                                                                                                                                            ),
                                                                                                                                            ee
                                                                                                                                        ),
                                                                                                                                        ae
                                                                                                                                    ),
                                                                                                                                    te
                                                                                                                                ),
                                                                                                                                W_
                                                                                                                            ),
                                                                                                                            z_
                                                                                                                        ),
                                                                                                                        Y_
                                                                                                                    ),
                                                                                                                    J_
                                                                                                                ),
                                                                                                                q_
                                                                                                            ),
                                                                                                            Z_
                                                                                                        ),
                                                                                                        ne
                                                                                                    ),
                                                                                                    ie
                                                                                                ),
                                                                                                re
                                                                                            ),
                                                                                            oe
                                                                                        ),
                                                                                        le
                                                                                    ),
                                                                                    ue
                                                                                ),
                                                                                se
                                                                            ),
                                                                            de
                                                                        ),
                                                                        Se
                                                                    ),
                                                                    ce
                                                                ),
                                                                Te
                                                            ),
                                                            Ee
                                                        ),
                                                        ye
                                                    ),
                                                    Oe
                                                ),
                                                me
                                            ),
                                            Ne
                                        ),
                                        pe
                                    ),
                                    Pe
                                ),
                                Ae
                            ),
                            ge
                        ),
                        Re
                    );
                e.default = Le;
            },
            5221: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.k3BothSideRank = e.default = void 0);
                e.k3BothSideRank = {
                    "2269_0": "红大小单双:大",
                    "2269_1": "红大小单双:小",
                    "2269_2": "红大小单双:单",
                    "2269_3": "红大小单双:双",
                    "2270_0": "黑大小单双:大",
                    "2270_1": "黑大小单双:小",
                    "2270_2": "黑大小单双:单",
                    "2270_3": "黑大小单双:双",
                    "2228_0": "红黑码:红",
                    "2228_1": "红黑码:黑",
                };
                e.default = {};
            },
            2146: function(_, e) {
                function a(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function t(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var t = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? a(Object(t), !0).forEach(function(e) {
                                  n(_, e, t[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(t))
                            : a(Object(t)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(t, e));
                              });
                    }
                    return _;
                }
                function n(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.lhcPlayKey = e.lhcPlayId = e.lhcBothSideRank = void 0);
                var i = t(
                    t(
                        t(
                            t(
                                t(
                                    t(
                                        t(
                                            t(
                                                t(
                                                    t(
                                                        t(
                                                            t(t({}, { 1615: "特码", 1618: "特码", 1633: "特码" }), {
                                                                1642: "两面",
                                                                1631: "两面",
                                                                1639: "特尾大小",
                                                                1641: "特合大小单双",
                                                                1714: "特天地前后家野肖",
                                                                1648: "总和大小单双",
                                                            }),
                                                            { 1634: "色波", 1635: "色波", 1636: "半波", 1637: "半半波" }
                                                        ),
                                                        { 1691: "特肖", 1693: "特肖" }
                                                    ),
                                                    { 1649: "头尾数", 1651: "头尾数" }
                                                ),
                                                { 1728: "合肖", 1730: "合肖" }
                                            ),
                                            { 1619: "正码", 1621: "正码" }
                                        ),
                                        {
                                            1622: "正码特",
                                            1623: "正一特",
                                            1624: "正二特",
                                            1625: "正三特",
                                            1626: "正四特",
                                            1627: "正五特",
                                            1628: "正六特",
                                            1696: "正一特",
                                            1699: "正二特",
                                            1702: "正三特",
                                            1705: "正四特",
                                            1708: "正五特",
                                            1711: "正六特",
                                            1722: "正一特",
                                            1723: "正二特",
                                            1724: "正三特",
                                            1725: "正四特",
                                            1726: "正五特",
                                            1727: "正六特",
                                        }
                                    ),
                                    {
                                        1657: "正码1-6",
                                        1658: "正码一",
                                        1659: "正码二",
                                        1660: "正码三",
                                        1661: "正码四",
                                        1662: "正码五",
                                        1663: "正码六",
                                        1695: "正码一",
                                        1697: "正码一",
                                        1667: "正码一",
                                        1698: "正码二",
                                        1700: "正码二",
                                        1671: "正码二",
                                        1701: "正码三",
                                        1703: "正码三",
                                        1675: "正码三",
                                        1704: "正码四",
                                        1706: "正码四",
                                        1679: "正码四",
                                        1707: "正码五",
                                        1709: "正码五",
                                        1683: "正码五",
                                        1710: "正码六",
                                        1712: "正码六",
                                        1687: "正码六",
                                        1665: "正码一",
                                        1669: "正码二",
                                        1673: "正码三",
                                        1677: "正码四",
                                        1681: "正码五",
                                        1685: "正码六",
                                    }
                                ),
                                {
                                    1654: "平特肖尾",
                                    1731: "平特一肖",
                                    1655: "平特尾数",
                                    1694: "平特一肖",
                                    1656: "平特尾数",
                                }
                            ),
                            {
                                1688: "自选不中",
                                1689: "自选不中",
                                2147: "五不中",
                                2149: "六不中",
                                2151: "七不中",
                                2153: "八不中",
                                2155: "九不中",
                                2157: "十不中",
                                2159: "十一不中",
                                2161: "十二不中",
                                1690: "自选不中",
                                2148: "五不中",
                                2150: "六不中",
                                2152: "七不中",
                                2154: "八不中",
                                2156: "九不中",
                                2158: "十不中",
                                2160: "十一不中",
                                2162: "十二不中",
                            }
                        ),
                        {
                            2031: "连肖",
                            2032: "二连肖",
                            2033: "二连肖",
                            2034: "三连肖",
                            2035: "三连肖",
                            2036: "四连肖",
                            2037: "四连肖",
                            2038: "五连肖",
                            2039: "五连肖",
                        }
                    ),
                    {
                        2040: "连码",
                        2041: "二全中",
                        2042: "二全中",
                        2043: "三全中",
                        2044: "三全中",
                        2045: "四全中",
                        2046: "四全中",
                        2047: "三中二",
                        2048: "三中二",
                        2049: "二中特",
                        2050: "二中特",
                        2051: "特串",
                        2052: "特串",
                    }
                );
                e.lhcPlayId = i;
                e.lhcBothSideRank = {
                    title: "两面长龙",
                    countNumero: "%@期",
                    "1687_0": "正码六 - 尾大",
                    "1687_1": "正码六 - 尾小",
                    "1712_1": "正码六 - 红波",
                    "1712_2": "正码六 - 蓝波",
                    "1712_3": "正码六 - 绿波",
                    "1685_0": "正码六 - 合大",
                    "1685_1": "正码六 - 合小",
                    "1685_2": "正码六 - 合单",
                    "1685_3": "正码六 - 合双",
                    "1710_0": "正码六 - 大码",
                    "1710_1": "正码六 - 小码",
                    "1710_2": "正码六 - 单码",
                    "1710_3": "正码六 - 双码",
                    "1683_0": "正码五 - 尾大",
                    "1683_1": "正码五 - 尾小",
                    "1709_1": "正码五 - 红波",
                    "1709_2": "正码五 - 蓝波",
                    "1709_3": "正码五 - 绿波",
                    "1681_0": "正码五 - 合大",
                    "1681_1": "正码五 - 合小",
                    "1681_2": "正码五 - 合单",
                    "1681_3": "正码五 - 合双",
                    "1707_0": "正码五 - 大码",
                    "1707_1": "正码五 - 小码",
                    "1707_2": "正码五 - 单码",
                    "1707_3": "正码五 - 双码",
                    "1679_0": "正码四 - 尾大",
                    "1679_1": "正码四 - 尾小",
                    "1706_1": "正码四 - 红波",
                    "1706_2": "正码四 - 蓝波",
                    "1706_3": "正码四 - 绿波",
                    "1677_0": "正码四 - 合大",
                    "1677_1": "正码四 - 合小",
                    "1677_2": "正码四 - 合单",
                    "1677_3": "正码四 - 合双",
                    "1704_0": "正码四 - 大码",
                    "1704_1": "正码四 - 小码",
                    "1704_2": "正码四 - 单码",
                    "1704_3": "正码四 - 双码",
                    "1675_0": "正码三 - 尾大",
                    "1675_1": "正码三 - 尾小",
                    "1703_1": "正码三 - 红波",
                    "1703_2": "正码三 - 蓝波",
                    "1703_3": "正码三 - 绿波",
                    "1673_0": "正码三 - 合大",
                    "1673_1": "正码三 - 合小",
                    "1673_2": "正码三 - 合单",
                    "1673_3": "正码三 - 合双",
                    "1701_0": "正码三 - 大码",
                    "1701_1": "正码三 - 小码",
                    "1701_2": "正码三 - 单码",
                    "1701_3": "正码三 - 双码",
                    "1671_0": "正码二 - 尾大",
                    "1671_1": "正码二 - 尾小",
                    "1700_1": "正码二 - 红波",
                    "1700_2": "正码二 - 蓝波",
                    "1700_3": "正码二 - 绿波",
                    "1669_0": "正码二 - 合大",
                    "1669_1": "正码二 - 合小",
                    "1669_2": "正码二 - 合单",
                    "1669_3": "正码二 - 合双",
                    "1698_0": "正码二 - 大码",
                    "1698_1": "正码二 - 小码",
                    "1698_2": "正码二 - 单码",
                    "1698_3": "正码二 - 双码",
                    "1667_0": "正码一 - 尾大",
                    "1667_1": "正码一 - 尾小",
                    "1697_1": "正码一 - 红波",
                    "1697_2": "正码一 - 蓝波",
                    "1697_3": "正码一 - 绿波",
                    "1665_0": "正码一 - 合大",
                    "1665_1": "正码一 - 合小",
                    "1665_2": "正码一 - 合单",
                    "1665_3": "正码一 - 合双",
                    "1695_0": "正码一 - 大码",
                    "1695_1": "正码一 - 小码",
                    "1695_2": "正码一 - 单码",
                    "1695_3": "正码一 - 双码",
                    "1648_0": "两面 - 总大",
                    "1648_1": "两面 - 总小",
                    "1648_2": "两面 - 总单",
                    "1648_3": "两面 - 总双",
                    "1714_1": "两面 - 特天肖",
                    "1714_2": "两面 - 特地肖",
                    "1714_3": "两面 - 特家肖",
                    "1714_4": "两面 - 特野肖",
                    "1714_5": "两面 - 特前肖",
                    "1714_6": "两面 - 特后肖",
                    "1641_0": "两面 - 特合大",
                    "1641_1": "两面 - 特合小",
                    "1641_2": "两面 - 特合单",
                    "1641_3": "两面 - 特合双",
                    "1639_0": "两面 - 特尾大",
                    "1639_1": "两面 - 特尾小",
                    "1631_0": "两面 - 特大",
                    "1631_1": "两面 - 特小",
                    "1631_2": "两面 - 特单",
                    "1631_3": "两面 - 特双",
                };
                e.lhcPlayKey = {
                    LHCOne: "01",
                    LHCTwo: "02",
                    LHCThree: "03",
                    LHCFour: "04",
                    LHCFive: "05",
                    LHCSix: "06",
                    LHCSeven: "07",
                    LHCEight: "08",
                    LHCNine: "09",
                    10: "10",
                    11: "11",
                    12: "12",
                    13: "13",
                    14: "14",
                    15: "15",
                    16: "16",
                    17: "17",
                    18: "18",
                    19: "19",
                    20: "20",
                    21: "21",
                    22: "22",
                    23: "23",
                    24: "24",
                    25: "25",
                    26: "26",
                    27: "27",
                    28: "28",
                    29: "29",
                    30: "30",
                    31: "31",
                    32: "32",
                    33: "33",
                    34: "34",
                    35: "35",
                    36: "36",
                    37: "37",
                    38: "38",
                    39: "39",
                    40: "40",
                    41: "41",
                    42: "42",
                    43: "43",
                    44: "44",
                    45: "45",
                    46: "46",
                    47: "47",
                    48: "48",
                    49: "49",
                    specialBig: "特大",
                    specialSkyAnimal: "特天肖",
                    specialSmall: "特小",
                    specialGroundAnimal: "特地肖",
                    specialTailBig: "特尾大",
                    specialFirst6Animal: "特前肖",
                    specialTailSmall: "特尾小",
                    specialLast6Animal: "特后肖",
                    specialOdd: "特单",
                    specialHomeAnimal: "特家肖",
                    specialEven: "特双",
                    specialWildAnimal: "特野肖",
                    specialTOSumBig: "特合大",
                    specialSumBig: "总和大",
                    specialTOSumSmall: "特合小",
                    specialSumSmall: "总和小",
                    specialTOSumOdd: "特合单",
                    specialSumOdd: "总和单",
                    specialTOSumEven: "特合双",
                    specialSumEven: "总和双",
                    specialSmallOdd: "特小单",
                    specialSmallEven: "特小双",
                    specialBigOdd: "特大单",
                    specialBigEven: "特大双",
                    colorStraightRed: "红波",
                    colorStraightBlue: "蓝波",
                    colorStraightGreen: "绿波",
                    redOdd: "红单",
                    blueOdd: "蓝单",
                    greenOdd: "绿单",
                    redEven: "红双",
                    blueEven: "蓝双",
                    greenEven: "绿双",
                    redBig: "红大",
                    blueBig: "蓝大",
                    greenBig: "绿大",
                    redSmall: "红小",
                    blueSmall: "蓝小",
                    greenSmall: "绿小",
                    redBigOdd: "红大单",
                    blueBigOdd: "蓝大单",
                    greenBigOdd: "绿大单",
                    redBigEven: "红大双",
                    blueBigEven: "蓝大双",
                    greenBigEven: "绿大双",
                    redSmallOdd: "红小单",
                    blueSmallOdd: "蓝小单",
                    greenSmallOdd: "绿小单",
                    redSmallEven: "红小双",
                    blueSmallEven: "蓝小双",
                    greenSmallEven: "绿小双",
                    totalBig: "总和大",
                    totalSmall: "总和小",
                    totalOdd: "总和单",
                    totalEven: "总和双",
                    firstSumOdd: "正一合单",
                    firstSumEven: "正一合双",
                    secondSumOdd: "正二合单",
                    secondSumEven: "正二合双",
                    thirdSumOdd: "正三合单",
                    thirdSumEven: "正三合双",
                    fourthSumOdd: "正四合单",
                    fourthSumEven: "正四合双",
                    fifthSumOdd: "正五合单",
                    fifthSumEven: "正五合双",
                    sixthSumOdd: "正六合单",
                    sixthSumEven: "正六合双",
                    firstBig: "正一大",
                    firstSmall: "正一小",
                    firstOdd: "正一单",
                    firstEven: "正一双",
                    secondBig: "正二大",
                    secondSmall: "正二小",
                    secondOdd: "正二单",
                    secondEven: "正二双",
                    thirdBig: "正三大",
                    thirdSmall: "正三小",
                    thirdOdd: "正三单",
                    thirdEven: "正三双",
                    fourthBig: "正四大",
                    fourthSmall: "正四小",
                    fourthOdd: "正四单",
                    fourthEven: "正四双",
                    fifthBig: "正五大",
                    fifthSmall: "正五小",
                    fifthOdd: "正五单",
                    fifthEven: "正五双",
                    sixthBig: "正六大",
                    sixthSmall: "正六小",
                    sixthOdd: "正六单",
                    sixthEven: "正六双",
                    firstRed: "正一红",
                    firstBlue: "正一蓝",
                    firstGreen: "正一绿",
                    secondRed: "正二红",
                    secondBlue: "正二蓝",
                    secondGreen: "正二绿",
                    thirdRed: "正三红",
                    thirdBlue: "正三蓝",
                    thirdGreen: "正三绿",
                    fourthRed: "正四红",
                    fourthBlue: "正四蓝",
                    fourthGreen: "正四绿",
                    fifthRed: "正五红",
                    fifthBlue: "正五蓝",
                    fifthGreen: "正五绿",
                    sixthRed: "正六红",
                    sixthBlue: "正六蓝",
                    sixthGreen: "正六绿",
                    tailNine: "9尾",
                    tailEight: "8尾",
                    tailSeven: "7尾",
                    tailSix: "6尾",
                    tailFive: "5尾",
                    tailFour: "4尾",
                    tailThree: "3尾",
                    tailTwo: "2尾",
                    tailOne: "1尾",
                    tailZero: "0尾",
                    headFour: "4头",
                    headThree: "3头",
                    headTwo: "2头",
                    headOne: "1头",
                    headZero: "0头",
                    specialRat: "鼠",
                    specialOx: "牛",
                    specialTiger: "虎",
                    specialRabbit: "兔",
                    specialDragon: "龙",
                    specialSnake: "蛇",
                    specialHorse: "马",
                    specialGoat: "羊",
                    specialMonkey: "猴",
                    specialRooster: "鸡",
                    specialDog: "狗",
                    specialPig: "猪",
                    normalBig: "大码",
                    normalSmall: "小码",
                    normalOdd: "单码",
                    normalEven: "双码",
                    normalTOSumBig: "合大",
                    normalTOSumSmall: "合小",
                    normalTOSumOdd: "合单",
                    normalTOSumEven: "合双",
                    normalTailBig: "尾大",
                    normalTailSmall: "尾小",
                    allThreeSame: "三同号通选",
                    allThreeEven: "三连号通选",
                    any_Boazi: "任意豹子",
                };
            },
            4909: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.pcbPlayKey = e.pcbBothSideRank = e.default = void 0);
                e.pcbPlayKey = {
                    specialBig: "大",
                    specialSmall: "小",
                    specialOdd: "单",
                    specialEven: "双",
                    specialSmallOdd: "小单",
                    specialSmallEven: "小双",
                    specialBigOdd: "大单",
                    specialBigEven: "大双",
                };
                e.pcbBothSideRank = {
                    "2163_0": "大小单双:大",
                    "2163_1": "大小单双:小",
                    "2163_2": "大小单双:单",
                    "2163_3": "大小单双:双",
                    "2165_0": "大小单双:大",
                    "2165_1": "大小单双:小",
                    "2165_2": "大小单双:单",
                    "2165_3": "大小单双:双",
                    "2167_0": "大小单双:大",
                    "2167_1": "大小单双:小",
                    "2167_2": "大小单双:单",
                    "2167_3": "大小单双:双",
                };
                e.default = {};
            },
            7951: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.sscBothSideRank = e.default = void 0);
                e.sscBothSideRank = {
                    "2023_0": "牛牛:无牛",
                    "2023_1": "牛牛:有牛",
                    "2025_0": "牛牛:大",
                    "2025_1": "牛牛:小",
                    "2025_2": "牛牛:单",
                    "2025_3": "牛牛:双",
                };
                e.default = {};
            },
            6349: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                e.default = {
                    "play_id_1@1":
                        "从第一，二，三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致则中奖，奖金10.0000元如：第一位选择01，开奖号码为01****，即为中奖。如：第二位选择05，开奖号码为*05***，即为中奖。如：第三位选择07，开奖号码为**07**，即为中奖",
                    "play_id_1@2":
                        "从第一，二，三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致则中奖，奖金10.0000元如：第一位选择01，开奖号码为01****，即为中奖。如：第二位选择05，开奖号码为*05***，即为中奖。如：第三位选择07，开奖号码为**07**，即为中奖",
                    "play_id_1@3":
                        "从第一，二，三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致则中奖，奖金10.0000元如：第一位选择01，开奖号码为01****，即为中奖。如：第二位选择05，开奖号码为*05***，即为中奖。如：第三位选择07，开奖号码为**07**，即为中奖",
                    "play_id_13@1":
                        "从个位选择1个或多个号码投注，所选号码与开奖号码一致，即为中奖。 如：个位选择3，开奖号码为****3，即为中奖。",
                    "play_id_13@2":
                        '从个位选择1个或多个号码投注，所选号码与开奖号码一致，即为中奖，并根据万位的开奖号码获得相应奖金。 如：个位选择3，开奖号码为****3，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_13@3":
                        "从个位选择1个或多个号码投注，所选号码与开奖号码一致，即为中奖。 如：个位选择3，开奖号码为****3，即为中奖。",
                    "play_id_14@1":
                        "从万位、千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_14@2":
                        "从万位、千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_14@3":
                        "从万位、千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2015@1":
                        "从千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2015@2":
                        "从千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2015@3":
                        "从千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2016@1":
                        "从百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2016@2":
                        "从百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2016@3":
                        "从百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2017@1":
                        "从十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2017@2":
                        "从十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2017@3":
                        "从十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2018@1":
                        "从个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2018@2":
                        "从个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2018@3":
                        "从个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_15@1":
                        '从十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：十位选择3，个位选择4，开奖号码为"***34"，即为中奖。',
                    "play_id_15@2":
                        '从十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖，并根据万位的开奖号码获得相应奖金。 如：十位选择3，个位选择4，开奖号码为***34，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_15@3":
                        '从十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：十位选择3，个位选择4，开奖号码为"***34"，即为中奖。',
                    "play_id_16@1":
                        "玩家从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【十】【个】位的数字号码（不按位置顺序）下注，开奖号码【十】【个】位不是对子（相同号码）而且投注号码与开奖号码相同即中奖。<br/>例如： 玩家投注0、4，开奖号码为“5 2 3 4 0” 或者“5 2 3 0 4”，都中奖。",
                    "play_id_16@2":
                        '玩家从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【十】【个】位的数字号码（不按位置顺序）下注，开奖号码【十】【个】位不是对子（相同号码）而且投注号码与开奖号码相同即中奖，并根据万位的开奖号码获得相应奖金。 如：选择7、8，开奖号码***78或***87，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。<br/>例如： 玩家投注0、4，开奖号码为“5 2 3 4 0” 或者“5 2 3 0 4”，都中奖。',
                    "play_id_16@3":
                        "玩家从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【十】【个】位的数字号码（不按位置顺序）下注，开奖号码【十】【个】位不是对子（相同号码）而且投注号码与开奖号码相同即中奖。<br/>例如： 玩家投注0、4，开奖号码为“5 2 3 4 0” 或者“5 2 3 0 4”，都中奖。",
                    "play_id_17@1":
                        "从十位和个位分别选择每位一个或多个号码投注，对子奖金为100.0000元,非对子奖金50.0000元如：十位选5、6，个位选4、6，开奖号码为***66即中对子；为***56，则中非对子。",
                    "play_id_17@2":
                        "从十位和个位分别选择每位一个或多个号码投注，对子奖金为100.0000元,非对子奖金50.0000元如：十位选5、6，个位选4、6，开奖号码为***66即中对子；为***56，则中非对子。",
                    "play_id_17@3":
                        "从十位和个位分别选择每位一个或多个号码投注，对子奖金为100.0000元,非对子奖金50.0000元如：十位选5、6，个位选4、6，开奖号码为***66即中对子；为***56，则中非对子。",
                    "play_id_18@1":
                        "选择1个或多个和值点投注，中奖号码为对子奖金100.0000元,非对子奖金50.0000元如：选择6，相当于投和值为“6”的所有组选号码。若开出号码是***33，则中对子；若是***42，则中非对子。",
                    "play_id_18@2":
                        "选择1个或多个和值点投注，中奖号码为对子奖金100.0000元,非对子奖金50.0000元如：选择6，相当于投和值为“6”的所有组选号码。若开出号码是***33，则中对子；若是***42，则中非对子。",
                    "play_id_18@3":
                        "选择1个或多个和值点投注，中奖号码为对子奖金100.0000元,非对子奖金50.0000元如：选择6，相当于投和值为“6”的所有组选号码。若开出号码是***33，则中对子；若是***42，则中非对子。",
                    "play_id_19@1":
                        "从十位、个位分别选择1个或多个号码投注，若所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖。 如：十位选择4，个位选择5，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。",
                    "play_id_19@2":
                        '从十位、个位分别选择1个或多个号码投注，若所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖；并根据万位的开奖号码获得相应奖金。 如：十位选择4，个位选择5，开奖号码为***45，****5，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_19@3":
                        "从十位、个位分别选择1个或多个号码投注，若所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖。 如：十位选择4，个位选择5，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。",
                    "play_id_20@1":
                        "从0-18中选择1个或多个号码投注，所选数值为开奖号码后二位的数字相加之和相同，即为中奖。 如：选择1，开奖号码为***10或***01即为中奖。",
                    "play_id_20@2":
                        '从0-18中选择1个或多个号码投注，所选数值为开奖号码后二位的数字相加之和相同，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择1，开奖号码为***10或***01，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_20@3":
                        "从0-18中选择1个或多个号码投注，所选数值为开奖号码后二位的数字相加之和相同，即为中奖。 如：选择1，开奖号码为***10或***01即为中奖。",
                    "play_id_21@1":
                        '从百位、十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：百位选择1，十位选择2，个位选择3，开奖号码为是"**123"，即为中奖。',
                    "play_id_21@2":
                        '从百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖，并根据万位的开奖号码获得相应奖金。 如：百位选择1，十位选择2，个位选择3，开奖号码为**123，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_21@3":
                        '从百位、十位、个位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：百位选择1，十位选择2，个位选择3，开奖号码为是"**123"，即为中奖。',
                    "play_id_22@1":
                        "开奖号码后面三位的数字相加之和，开奖号码为豹子形态奖金1000.0000元,组三型态奖金333.3334元,组六型态奖金166.6667元如：选择10，开奖号码为**055号码，即中组三形态；开奖号码为**046号码，即中组六形态；选择9，开奖号码为**333，即中豹子。",
                    "play_id_22@2":
                        "开奖号码后面三位的数字相加之和，开奖号码为豹子形态奖金1000.0000元,组三型态奖金333.3334元,组六型态奖金166.6667元如：选择10，开奖号码为**055号码，即中组三形态；开奖号码为**046号码，即中组六形态；选择9，开奖号码为**333，即中豹子。",
                    "play_id_22@3":
                        "开奖号码后面三位的数字相加之和，开奖号码为豹子形态奖金1000.0000元,组三型态奖金333.3334元,组六型态奖金166.6667元如：选择10，开奖号码为**055号码，即中组三形态；开奖号码为**046号码，即中组六形态；选择9，开奖号码为**333，即中豹子。",
                    "play_id_23@1":
                        "玩家从0~9共10个数中任选2个或者2个以上号码，系统将自动完成两个相同号码的三位（百、十、个）组合（不按位置顺序）；所选号码与开奖号码的后三位相同 (对子加单码形态) 即中奖。三重号（豹子）不算中奖。\n例如：开彩号码为1 0 5 5 2，玩家若选两个数字5、2，则含“5、5、2”，“5、2、2” 两注“组选3”号码，其中“5、5、2”这注中奖；\n例如：开彩号码为1 0 5 5 2，玩家若选择三个数字5、2、4，则包含“5、 5 、2”，“5、5、4”，“5、2、2”，“4、2、2”，“2、4、4”，“5、4、4” 六注“组选”号码，其中“5 、5、2”这注中奖；",
                    "play_id_23@2":
                        '从0-9中选择2个或多个号码投注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择1、2，开奖号码为**122、**212、**221 、 **112、**121、**211，即为中奖，当万位开奖为非"6"和"9"时，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_23@3":
                        "玩家从0~9共10个数中任选2个或者2个以上号码，系统将自动完成两个相同号码的三位（百、十、个）组合（不按位置顺序）；所选号码与开奖号码的后三位相同 (对子加单码形态) 即中奖。三重号（豹子）不算中奖。\n例如：开彩号码为1 0 5 5 2，玩家若选两个数字5、2，则含“5、5、2”，“5、2、2” 两注“组选3”号码，其中“5、5、2”这注中奖；\n例如：开彩号码为1 0 5 5 2，玩家若选择三个数字5、2、4，则包含“5、 5 、2”，“5、5、4”，“5、2、2”，“4、2、2”，“2、4、4”，“5、4、4” 六注“组选”号码，其中“5 、5、2”这注中奖；",
                    "play_id_24@1":
                        "玩家从0~9 共10个数中任选3个或者3个以上不相同号码，系统将自动完成号码的三位（百、十、个）组合(不按位置顺序)；投注号码与开奖号码相同即中奖。<br/>例如：开彩号码为5 2 4 3 0，玩家若选三个数字0、4、3；则包含“4、3、0” 一注“组选”号码，即中奖。<br/>例如：开彩号码为5 2 4 3 0，玩家若选四个数字0、3、4、5；则包含“0、3、4”，“0、3、5”， “0、4、5”，“3、4、5” 四注“组选”号码，其中“0、3、4”这注中奖；<br/>例如：开彩号码为5 2 4 3 0，玩家若选择五个数字0、3、4、5、6；则包含“0、3、4”，“0、3、5”，“0、3、6”，“0、4、5”，“0、4、6”，“0、5、6”， “3、4、5”，“3、4、6”，“3、5、6”，“4、5、6” 十注“组选”号码，其中“0、3、4”这注中奖。",
                    "play_id_24@2":
                        '从0-9中选择3个或多个号码投注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择1、2、3，开奖号码为**123、**132、**231、 **213、**312、**321，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_24@3":
                        "从0-9中选择3个或多个号码投注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为**123，**132，**231，**213，**312，**321，即为中奖。",
                    "play_id_25@1":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为**321即中组六奖，开奖号码为**545即中组三奖。",
                    "play_id_25@2":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖，并根据万位的开奖号码获得相应奖金。<br />如：手动输入123、455，开奖号码为**545即组三中奖，**321即组六中奖。",
                    "play_id_25@3":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的后三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为**321即中组六奖，开奖号码为**545即中组三奖。",
                    "play_id_26@1":
                        "从百位、十位、个位选择1个或多个号码投注，若所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖。 如：百位选择3，十位选择4，个位选择5，开奖号码为**345，即中一等奖，开奖号码为***45，即中二等奖，开奖号码为****5，即中三等奖。",
                    "play_id_26@2":
                        '从百位、十位、个位中分别选择1个或多个号码投注，若所选号码百位、十位、个位与开奖号码相同；十位、个位与开奖号码相同；个位与开奖号码相同，均为中奖，并根据万位的开奖号码获得相应奖金。 如：百位选择2，十位选择3，个位选择4，开奖号码为**234，***34，****4，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_26@3":
                        "从百位、十位、个位选择1个或多个号码投注，若所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖。 如：百位选择3，十位选择4，个位选择5，开奖号码为**345，即中一等奖，开奖号码为***45，即中二等奖，开奖号码为****5，即中三等奖。",
                    "play_id_27@1":
                        "从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为**234、**243、**324、**342、**432、**423，即中一注奖。",
                    "play_id_27@2":
                        '从0-9中选择3个或以上号码投注，开奖号码的后三位为组六形态即中奖，并根据万位的开奖号码获得相应奖金。 如：选择2、3、4；开奖号码为**234、**243、**324、**342、**432、**423，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_27@3":
                        "从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为**234、**243、**324、**342、**432、**423，即中一注奖。",
                    "play_id_28@1":
                        "从0-27中选择1个或多个号码投注，所选数值为开奖号码后三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为**001、**010、**100，即中后三和值。",
                    "play_id_28@2":
                        '从0-27中选择1个或多个号码投注，所选数值为开奖号码后三位的数字相加之和相同，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择和值1；开奖号码为**001、**010、**100，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_28@3":
                        "从0-27中选择1个或多个号码投注，所选数值为开奖号码后三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为**001、**010、**100，即中后三和值。",
                    "play_id_29@1":
                        '从千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为"*1234"，即为中奖。',
                    "play_id_29@2":
                        '从千位、百位、十位、个位中分别选择1个或多个号码投注，所选号码与开奖号码相同，顺序一致时即为中奖，并根据万位的开奖号码获得相应奖金。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为*1234，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_29@3":
                        '从千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为"*1234"，即为中奖。',
                    "play_id_30@1":
                        "从千位、百位、十位、个位中分别选择1个或多个号码投注，若所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖；若所选号码十位、个位与开奖号码相同，即中三等奖；若所选号码个位与开奖号码相同，即中四等奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。",
                    "play_id_30@2":
                        '从千位、百位、十位、个位中分别选择1个或多个号码投注，若所选号码千位、百位、十位、个位与开奖号码相同，百位、十位、个位与开奖号码相同，十位、个位与开奖号码相同，个位与开奖号码相同，均为中奖，并根据万位的开奖号码获得相应奖金。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为*1234，**234，***34，****4，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_30@3":
                        "从千位、百位、十位、个位中分别选择1个或多个号码投注，若所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖；若所选号码十位、个位与开奖号码相同，即中三等奖；若所选号码个位与开奖号码相同，即中四等奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。",
                    "play_id_31@1":
                        "从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即为中奖。",
                    "play_id_31@3":
                        "从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即为中奖。",
                    "play_id_32@1":
                        "从万位、千位、百位、十位、个位中各选一个号码投注，若所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；若所选号码与开奖号码的前三或后三号码相同且顺序一致，即中二等奖；若所选号码与开奖号码的前二或后二号码相同且顺序一致，即中三等奖。 如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。",
                    "play_id_32@3":
                        "从万位、千位、百位、十位、个位中各选一个号码投注，若所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；若所选号码与开奖号码的前三或后三号码相同且顺序一致，即中二等奖；若所选号码与开奖号码的前二或后二号码相同且顺序一致，即中三等奖。 如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。",
                    "play_id_33@1":
                        "从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；所选号码千位、百位、十位、个位与开奖号码相同，即中二等奖；所选号码百位、十位、个位与开奖号码相同，即中三等奖；所选号码十位、个位与开奖号码相同，即中四等奖；所选号码个位与开奖号码相同，即中五等奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即中一等奖，开奖号码为*2345，即中二等奖，开奖号码为**345，即中三等奖，开奖号码为***45即中四等奖，开奖号码为****5即中五等奖。",
                    "play_id_33@3":
                        "从万位、千位、百位、十位、个位中分别选择1个或多个号码投注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；所选号码千位、百位、十位、个位与开奖号码相同，即中二等奖；所选号码百位、十位、个位与开奖号码相同，即中三等奖；所选号码十位、个位与开奖号码相同，即中四等奖；所选号码个位与开奖号码相同，即中五等奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，个位选择5，开奖号码为12345，即中一等奖，开奖号码为*2345，即中二等奖，开奖号码为**345，即中三等奖，开奖号码为***45即中四等奖，开奖号码为****5即中五等奖。",
                    "play_id_34@1":
                        "从万位、千位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择3，千位选择4，开奖号码为34***，即为中奖。",
                    "play_id_34@3":
                        "从万位、千位分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择3，千位选择4，开奖号码为34***，即为中奖。",
                    "play_id_35@1":
                        "玩家从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【万】【千】位的数字号码（不按位置顺序）下注，开奖号码【万】【千】位不是对子（相同号码）而且投注号码与开奖号码相同即中奖。<br/>例如： 玩家投注2、5，开奖号码为“5 2 3 4 0” 或者“2 5 3 0 4”，都中奖。",
                    "play_id_35@3":
                        "玩家从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【万】【千】位的数字号码（不按位置顺序）下注，开奖号码【万】【千】位不是对子（相同号码）而且投注号码与开奖号码相同即中奖。<br/>例如： 玩家投注2、5，开奖号码为“5 2 3 4 0” 或者“2 5 3 0 4”，都中奖。",
                    "play_id_36@1":
                        "从万位和千位分别选择每位一个或多个号码投注，对子奖金100.0000元,非对子奖金50.0000元如：万位选5、6，千位选4、6，开奖号码为66***即中对子；为56***，则中非对子。",
                    "play_id_36@3":
                        "从万位和千位分别选择每位一个或多个号码投注，对子奖金100.0000元,非对子奖金50.0000元如：万位选5、6，千位选4、6，开奖号码为66***即中对子；为56***，则中非对子。",
                    "play_id_37@1":
                        "选择1个或多个和值点投注，中奖号码为对子奖金100.0000元,非对子奖金50.0000元如：选择6，相当于投和值为“6”的所有组选号码。若开出号码是***33，则中对子；若是***42，则中非对子。",
                    "play_id_37@3":
                        "选择1个或多个和值点投注，中奖号码为对子奖金100.0000元,非对子奖金50.0000元如：选择6，相当于投和值为“6”的所有组选号码。若开出号码是***33，则中对子；若是***42，则中非对子。",
                    "play_id_38@1":
                        "从万位和千位选择1个或多个号码投注，若所选号码万位、千位与开奖号码相同，即中一等奖；若所选号码千位与开奖号码相同，即中二等奖。 如：万位选择5，千位选择4，开奖号码为54***，即中一等奖，开奖号码为*4***，即中二等奖。",
                    "play_id_38@3":
                        "从万位和千位选择1个或多个号码投注，若所选号码万位、千位与开奖号码相同，即中一等奖；若所选号码千位与开奖号码相同，即中二等奖。 如：万位选择5，千位选择4，开奖号码为54***，即中一等奖，开奖号码为*4***，即中二等奖。",
                    "play_id_39@1":
                        "从0-18中选择1个或多个号码投注，所选数值为开奖号码前二位的数字相加之和相同，即为中奖。 如：选择1，开奖号码为10***或01***，即为中奖。",
                    "play_id_39@3":
                        "从0-18中选择1个或多个号码投注，所选数值为开奖号码前二位的数字相加之和相同，即为中奖。 如：选择1，开奖号码为10***或01***，即为中奖。",
                    "play_id_40@1":
                        '从万位、千位、百位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，开奖号码为是"123**"，即为中奖。',
                    "play_id_40@3":
                        '从万位、千位、百位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，开奖号码为是"123**"，即为中奖。',
                    "play_id_41@1":
                        "前面三位的数字相加之和，开奖号码为豹子形态奖金1000.0000元,组三型态奖金333.3334元,组六型态奖金166.6667元如：选择10，开奖号码为055**号码，即中组三形态；开奖号码为046**号码，即中组六形态；选择9，开奖号码为333**，即中豹子。",
                    "play_id_41@3":
                        "前面三位的数字相加之和，开奖号码为豹子形态奖金1000.0000元,组三型态奖金333.3334元,组六型态奖金166.6667元如：选择10，开奖号码为055**号码，即中组三形态；开奖号码为046**号码，即中组六形态；选择9，开奖号码为333**，即中豹子。",
                    "play_id_42@1":
                        "玩家从0~9共10个数中任选2个或者2个以上号码，系统将自动完成两个相同号码的三位（万、千、百）组合（不按位置顺序）；所选号码与开奖号码的前三位相同 (对子加单码形态) 即中奖。三重号（豹子）不算中奖。\n例如：开彩号码为5 2 5 3 0，玩家若选两个数字5、2，则含“5、5、2”，“5、2、2” 两注“组选3”号码，其中“5、5、2”这注中奖；\n例如：开彩号码为5 2 5 3 0，玩家若选择三个数字5、2、4，则包含“5、 5 、2”，“5、5、4”，“5、2、2”，“4、2、2”，“2、4、4”，“5、4、4” 六注“组选”号码，其中“5 、5、2”这注中奖。",
                    "play_id_42@3":
                        "玩家从0~9共10个数中任选2个或者2个以上号码，系统将自动完成两个相同号码的三位（万、千、百）组合（不按位置顺序）；所选号码与开奖号码的前三位相同 (对子加单码形态) 即中奖。三重号（豹子）不算中奖。\n例如：开彩号码为5 2 5 3 0，玩家若选两个数字5、2，则含“5、5、2”，“5、2、2” 两注“组选3”号码，其中“5、5、2”这注中奖；\n例如：开彩号码为5 2 5 3 0，玩家若选择三个数字5、2、4，则包含“5、 5 、2”，“5、5、4”，“5、2、2”，“4、2、2”，“2、4、4”，“5、4、4” 六注“组选”号码，其中“5 、5、2”这注中奖。",
                    "play_id_43@1":
                        "玩家从0~9 共10个数中任选3个或者3个以上不相同号码，系统将自动完成号码的三位（万、千、百）组合(不按位置顺序)；投注号码与开奖号码相同即中奖。<br/>例如：开彩号码为5 2 4 3 0，玩家若选三个数字2、4、5；则包含“2、4、5” 一注“组选”号码，即中奖。<br/>例如：开彩号码为5 2 4 3 0，玩家若选四个数字2、3、4、5；则包含“2、3、4”，“2、3、5”， “2、4、5”，“3、4、5” 四注“组选”号码，其中“2、4、5”这注中奖；<br/>例如：开彩号码为5 2 4 3 0，玩家若选择五个数字2、3、4、5、6；则包含“2、3、4”，“2、3、5”，“2、3、6”，“2、4、5”，“2、4、6”，“2、5、6”， “3、4、5”，“3、4、6”，“3、5、6”，“4、5、6” 十注“组选”号码，其中“2、4、5”这注中奖。",
                    "play_id_43@3":
                        "从0-9中选择3个或多个号码投注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为123**、132**、231** 、 213**、312**、321**，即为中奖。",
                    "play_id_44@1":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为321**即中组六奖，开奖号码为545**即中组三奖。",
                    "play_id_44@3":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的前三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为321**即中组六奖，开奖号码为545**即中组三奖。",
                    "play_id_45@1":
                        "从万位、千位、百位中分别选择1个或多个号码投注，若所选号码万位、千位、百位与开奖号码相同，即中一等奖；若所选号码千位、百位与开奖号码相同，即中二等奖；若所选号码百位与开奖号码相同，即中三等奖。 如：万位选择3，千位选择4，百位选择5，开奖号码为345**，即中一等奖，开奖号码为*45**，即中二等奖，开奖号码为**5**，即中三等奖。",
                    "play_id_45@3":
                        "从万位、千位、百位中分别选择1个或多个号码投注，若所选号码万位、千位、百位与开奖号码相同，即中一等奖；若所选号码千位、百位与开奖号码相同，即中二等奖；若所选号码百位与开奖号码相同，即中三等奖。 如：万位选择3，千位选择4，百位选择5，开奖号码为345**，即中一等奖，开奖号码为*45**，即中二等奖，开奖号码为**5**，即中三等奖。",
                    "play_id_46@1":
                        "从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为234**、243**、324**、342**、432**、423**，即中一注奖。",
                    "play_id_46@3":
                        "从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为234**、243**、324**、342**、432**、423**，即中一注奖。",
                    "play_id_47@1":
                        "从0-27中选择1个或多个号码投注，所选数值为开奖号码前三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为001**、010**、100**，即中前三和值。",
                    "play_id_47@3":
                        "从0-27中选择1个或多个号码投注，所选数值为开奖号码前三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为001**、010**、100**，即中前三和值。",
                    "play_id_48@1":
                        '从万位、千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，开 奖号码为"1234*"，即为中奖。',
                    "play_id_48@3":
                        '从万位、千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，开 奖号码为"1234*"，即为中奖。',
                    "play_id_49@1":
                        "从万位、千位、百位、十位中分别选择1个或多个号码投注，若所选号码万位、千位、百位、十位与开奖号码相同，即中一等奖；若所选号码千位、百位、十位与开奖号码相同，即中二等奖；若所选号码百位、十位与开奖号码相同，即中三等奖；若所选号码十位与开奖号码相同，即中四等奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，开奖号码为1234*，即中一等奖，开奖号码为*234*，即中二等奖，开奖号码为**34*，即中三等奖，开奖号码为***4*即中四等奖。",
                    "play_id_49@3":
                        "从万位、千位、百位、十位中分别选择1个或多个号码投注，若所选号码万位、千位、百位、十位与开奖号码相同，即中一等奖；若所选号码千位、百位、十位与开奖号码相同，即中二等奖；若所选号码百位、十位与开奖号码相同，即中三等奖；若所选号码十位与开奖号码相同，即中四等奖。 如：万位选择1，千位选择2，百位选择3，十位选择4，开奖号码为1234*，即中一等奖，开奖号码为*234*，即中二等奖，开奖号码为**34*，即中三等奖，开奖号码为***4*即中四等奖。",
                    "play_id_50@1":
                        '从千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，开奖号码为是"*123*"，即为中奖。',
                    "play_id_50@2":
                        '从千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖，并根据万位的开奖号码获得相应奖金。 如：千位选择1，百位选择2，十位选择3，开奖号码为*123*，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_50@3":
                        '从千位、百位、十位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，开奖号码为是"*123*"，即为中奖。',
                    "play_id_51@1":
                        "中间三位的数字相加之和，开奖号码为豹子形态奖金1000.0000元,组三型态奖金333.3334元,组六型态奖金166.6667元如：选择10，开奖号码为*055*号码，即中组三形态；开奖号码*046*号码，即中组六形态；选择9，开奖号码为*333*，即中豹子。",
                    "play_id_51@2":
                        "中间三位的数字相加之和，开奖号码为豹子形态奖金1000.0000元,组三型态奖金333.3334元,组六型态奖金166.6667元如：选择10，开奖号码为*055*号码，即中组三形态；开奖号码*046*号码，即中组六形态；选择9，开奖号码为*333*，即中豹子。",
                    "play_id_51@3":
                        "中间三位的数字相加之和，开奖号码为豹子形态奖金1000.0000元,组三型态奖金333.3334元,组六型态奖金166.6667元如：选择10，开奖号码为*055*号码，即中组三形态；开奖号码*046*号码，即中组六形态；选择9，开奖号码为*333*，即中豹子。",
                    "play_id_52@1":
                        "玩家从0~9共10个数中任选2个或者2个以上号码，系统将自动完成两个相同号码的三位（千、百、十）组合（不按位置顺序）；所选号码与开奖号码的中三位相同 (对子加单码形态) 即中奖。三重号（豹子）不算中奖。\n例如：开彩号码为1 2 5 5 0，玩家若选两个数字5、2，则含“5、5、2”，“5、2、2” 两注“组选3”号码，其中“5、5、2”这注中奖；\n例如：开彩号码为1 2 5 5 0，玩家若选择三个数字5、2、4，则包含“5、 5 、2”，“5、5、4”，“5、2、2”，“4、2、2”，“2、4、4”，“5、4、4” 六注“组选”号码，其中“5 、5、2”这注中奖；",
                    "play_id_52@2":
                        '从0-9中选择2个或多个号码投注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择1、2，开奖号码为*122*、*212*、*221* 、 *112*、*121*、*211*，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_52@3":
                        "玩家从0~9共10个数中任选2个或者2个以上号码，系统将自动完成两个相同号码的三位（千、百、十）组合（不按位置顺序）；所选号码与开奖号码的中三位相同 (对子加单码形态) 即中奖。三重号（豹子）不算中奖。\n例如：开彩号码为1 2 5 5 0，玩家若选两个数字5、2，则含“5、5、2”，“5、2、2” 两注“组选3”号码，其中“5、5、2”这注中奖；\n例如：开彩号码为1 2 5 5 0，玩家若选择三个数字5、2、4，则包含“5、 5 、2”，“5、5、4”，“5、2、2”，“4、2、2”，“2、4、4”，“5、4、4” 六注“组选”号码，其中“5 、5、2”这注中奖；",
                    "play_id_53@1":
                        "玩家从0~9 共10个数中任选3个或者3个以上不相同号码，系统将自动完成号码的三位（千、百、十）组合(不按位置顺序)；投注号码与开奖号码相同即中奖。<br/>例如：开彩号码为5 2 4 3 0，玩家若选三个数字2、4、3；则包含“2、4、3” 一注“组选”号码，即中奖。<br/>例如：开彩号码为5 2 4 3 0，玩家若选四个数字2、3、4、5；则包含“2、3、4”，“2、3、5”， “2、4、5”，“3、4、5” 四注“组选”号码，其中“2、3、4”这注中奖；<br/>例如：开彩号码为5 2 4 3 0，玩家若选择五个数字2、3、4、5、6；则包含“2、3、4”，“2、3、5”，“2、3、6”，“2、4、5”，“2、4、6”，“2、5、6”， “3、4、5”，“3、4、6”，“3、5、6”，“4、5、6” 十注“组选”号码，其中“2、3、4”这注中奖。",
                    "play_id_53@2":
                        '从0-9中选择3个或多个号码投注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择1、2、3，开奖号码为*123*、*132*、*231*、 *213*、*312*、*321*，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_53@3":
                        "从0-9中选择3个或多个号码投注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：选择1、2、3，开奖号码为*123*、*132*、*231*、 *213*、*312*、*321*，即为中奖。",
                    "play_id_54@1":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为*321*即中组六奖， 开奖号码为*545*即中组三奖。",
                    "play_id_54@2":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖，并根据万位的开奖号码获得相应奖金。<br />如：手动输入123、455，开奖号码为*545*即组三中奖，开奖号码为*321*即组六中奖。",
                    "play_id_54@3":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的中三位相同，顺序不限，即为中奖。 如：手动输入123、455，开奖号码为*321*即中组六奖， 开奖号码为*545*即中组三奖。",
                    "play_id_55@1":
                        "从千位、百位、十位中分别选择1个或多个号码投注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖。 如：千位选择2，百位选择3，十位选择4，开奖号码为*234*，即中一等奖，开奖号码为**34*，即中二等奖，开奖号码为***4*，即中三等奖。",
                    "play_id_55@2":
                        '从千位、百位、十位、中分别选择1个或多个号码投注，若所选号码千位、百位、十位与开奖号码相同；百位、十位与开奖号码相同；十位与开奖号码相同，均为中奖，并根据万位的开奖号码获得相应奖金。 如：千位选择2，百位选择3，十位选择4，开奖号码为*234*，**34*，***4*，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_55@3":
                        "从千位、百位、十位中分别选择1个或多个号码投注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖。 如：千位选择2，百位选择3，十位选择4，开奖号码为*234*，即中一等奖，开奖号码为**34*，即中二等奖，开奖号码为***4*，即中三等奖。",
                    "play_id_56@1":
                        "从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为*234*、*243*、*324*、*342*、*432*、*423*，即中一注奖。",
                    "play_id_56@2":
                        '从0-9中选择3个或以上号码投注，开奖号码的中三位为组六形态即中奖，并根据万位的开奖号码获得相应奖金。 如：选择2、3、4；开奖号码为*234*、*243*、*324*、*342*、*432*、*423*，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_56@3":
                        "从0-9中选择3个或以上号码投注，开奖号码为组六形态即中奖。 如：选择2、3、4；开奖号码为*234*、*243*、*324*、*342*、*432*、*423*，即中一注奖。",
                    "play_id_57@1":
                        "从0-27中选择1个或多个号码投注，所选数值为开奖号码中三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为*001*、*010*、*100*，即中中三和值。",
                    "play_id_57@2":
                        '从0-27中选择1个或多个号码投注，所选数值为开奖号码中三位的数字相加之和相同，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择和值1；开奖号码为*001*、*010*、*100*，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_57@3":
                        "从0-27中选择1个或多个号码投注，所选数值为开奖号码中三位的数字相加之和相同，即为中奖。 如：选择和值1；开奖号码为*001*、*010*、*100*，即中中三和值。",
                    "play_id_58@1":
                        "从万位、千位、百位、十位、个位中至少一位上选择1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，开奖号码为1****，即为中奖。",
                    "play_id_58@3":
                        "从万位、千位、百位、十位、个位中至少一位上选择1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，开奖号码为1****，即为中奖。",
                    "play_id_59@1":
                        "从万位、千位、百位、十位、个位中至少两位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，开奖号码为12***，即为中奖。",
                    "play_id_59@3":
                        "从万位、千位、百位、十位、个位中至少两位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，开奖号码为12***，即为中奖。",
                    "play_id_60@1":
                        "从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，百位号码为3，开奖号码为123**，即为中奖。",
                    "play_id_60@3":
                        "从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，百位号码为3，开奖号码为123**，即为中奖。",
                    "play_id_61@1":
                        "从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，百位号码为3，十位号码为4，开奖号码为1234*，即为中奖。",
                    "play_id_61@3":
                        "从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择万位号码为1，千位号码为2，百位号码为3，十位号码为4，开奖号码为1234*，即为中奖。",
                    "play_id_62@1":
                        "从万位、千位中的“大、小、单、双”至少各选一个组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：万位选择小，千位选择双，开奖号码为12***，即为中奖。",
                    "play_id_62@3":
                        "从万位、千位中的“大、小、单、双”至少各选一个组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：万位选择小，千位选择双，开奖号码为12***，即为中奖。",
                    "play_id_63@1":
                        "从十位、个位中的“大、小、单、双”至少各选一个组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：十位选择大，个位选择单，开奖号码为***63，即为中奖。",
                    "play_id_63@2":
                        '从十位、个位中的“大、小、单、双”至少各选一个组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖，并根据万位的开奖号码获得相应奖金。 如：十位选择大，个位选择单，开奖号码为***63，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_63@3":
                        "从十位、个位中的“大、小、单、双”至少各选一个组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：十位选择大，个位选择单，开奖号码为***63，即为中奖。",
                    "play_id_64@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位中包含所选号码，即为中奖(含对子号)。 如：选择2，开奖号码为22***即中对子；开奖号码为21***即中非对子。",
                    "play_id_64@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位中包含所选号码，即为中奖(含对子号)。 如：选择2，开奖号码为22***即中对子；开奖号码为21***即中非对子。",
                    "play_id_65@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位中包含所选号码，即为中奖。 如：选择2，开奖号码为2****， *2***，即为中奖。",
                    "play_id_65@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位中包含所选号码，即为中奖。 如：选择2，开奖号码为2****， *2***，即为中奖。",
                    "play_id_66@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为222**即中豹子形态；开奖号码为322**即中组三形态；开奖号码为321**即中组六形态。",
                    "play_id_66@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为222**即中豹子形态；开奖号码为322**即中组三形态；开奖号码为321**即中组六形态。",
                    "play_id_67@1":
                        "从一码、二码中分别选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为222**即中豹子形态；选择21，开奖号码为122**即中组三形态；开奖号码为321**即中组六形态。",
                    "play_id_67@3":
                        "从一码、二码中分别选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为222**即中豹子形态；选择21，开奖号码为122**即中组三形态；开奖号码为321**即中组六形态。",
                    "play_id_68@1":
                        "从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择2，开奖号码为**2**， *2***， 2****，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_68@3":
                        "从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择2，开奖号码为**2**， *2***， 2****，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_69@1":
                        "从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择14，开奖号码为14***， 1*4**， 4*1**， *41**， 41***， *14**，即为中奖。",
                    "play_id_69@3":
                        "从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择14，开奖号码为14***， 1*4**， 4*1**， *41**， 41***， *14**，即为中奖。",
                    "play_id_70@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖(含对子号)。 如：选择2，开奖号码为***22即中对子；开奖号码为***21即中非对子。",
                    "play_id_70@2":
                        '从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖(含对子号)，并根据万位的开奖号码获得相应奖金。 如：选择2，开奖号码为***22即中对子，开奖号码为***21即中非对子，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_70@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖(含对子号)。 如：选择2，开奖号码为***22即中对子；开奖号码为***21即中非对子。",
                    "play_id_71@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖。 如：选择2，开奖号码为***2*， ****2，即为中奖。",
                    "play_id_71@2":
                        '从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择2，开奖号码为***2*， ****2，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_71@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的十位、个位中包含所选号码，即为中奖。 如：选择2，开奖号码为***2*， ****2，即为中奖。",
                    "play_id_72@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为**222即中豹子形态；开奖号码为**322即中组三形态；开奖号码为**321即中组六形态。",
                    "play_id_72@2":
                        '从0-9中选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)，并根据万位的开奖号码获得相应奖金。 如：选择2，开奖号码为**222即中豹子，开奖号码为**322即中组三，开奖号码为**321即中组六；当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_72@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为**222即中豹子形态；开奖号码为**322即中组三形态；开奖号码为**321即中组六形态。",
                    "play_id_73@1":
                        "从一码、二码中分别选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为**222即中豹子形态；选择21，开奖号码**122即中组三形态，开奖号码**321即中组六形态。",
                    "play_id_73@2":
                        '从一码、二码中分别选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)，并根据万位的开奖号码获得相应奖金。 如：选择22，开奖号码为**222即中豹子；选择21，开奖号码为**122即中组三；选择21，开奖号码为**321即中组六；当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_73@3":
                        "从一码、二码中分别选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为**222即中豹子形态；选择21，开奖号码**122即中组三形态，开奖号码**321即中组六形态。",
                    "play_id_74@1":
                        "从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择2，开奖号码为**2**， ***2*， ****2，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_74@2":
                        '从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择2，开奖号码为**2**， ***2*， ****2，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。若开奖结果出现重复数字，则只会派奖一次不累加。',
                    "play_id_74@3":
                        "从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择2，开奖号码为**2**， ***2*， ****2，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_75@1":
                        "从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择14，开奖号码为***14， **1*4， **4*1， ***41，**14* ，**41*，即为中奖。",
                    "play_id_75@2":
                        '从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择14，开奖号码为***14， **1*4， **4*1， ***41，**14* ，**41*，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_75@3":
                        "从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择14，开奖号码为***14， **1*4， **4*1， ***41，**14* ，**41*，即为中奖。",
                    "play_id_76@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为*222*即中豹子形态；开奖号码为*322*即中组三形态；开奖号码为*321*即中组六形态。",
                    "play_id_76@2":
                        '从0-9中选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)，并根据万位的开奖号码获得相应奖金。 如：选择2，开奖号码为*222*即中豹子，开奖号码为*322*即中组三，开奖号码为*321*即中组六，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_76@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择2，开奖号码为*222*即中豹子形态；开奖号码为*322*即中组三形态；开奖号码为*321*即中组六形态。",
                    "play_id_77@1":
                        "从一码、二码中分别选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为*222*即中豹子形态；选择21，开奖号码*122*即中组三形态，开奖号码*321*即中组六形态。",
                    "play_id_77@2":
                        '从一码、二码中分别选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)，并根据万位的开奖号码获得相应奖金。 如：选择22，开奖号码为*222*即中豹子；选择21，开奖号码为*122*即中组三；选择21，开奖号码为*321*即中组六；当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_77@3":
                        "从一码、二码中分别选择1个或多个号码投注，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖(含对子、豹子号)。 如：选择22，开奖号码为*222*即中豹子形态；选择21，开奖号码*122*即中组三形态，开奖号码*321*即中组六形态。",
                    "play_id_78@1":
                        "从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。 如：选择2，开奖号码为*2***， **2**， ***2*，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_78@2":
                        '从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择2，开奖号码为*2***， **2**， ***2*，即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。若开奖结果出现重复数字，则只会派奖一次不累加。',
                    "play_id_78@3":
                        "从0-9中选择1个号码投注，每注由1个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。 如：选择2，开奖号码为*2***， **2**， ***2*，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_79@1":
                        "从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。 如：选择14，开奖号码为**14*， *1*4*， *4*1*， **41*，*14** ，*41**，即为中奖。",
                    "play_id_79@2":
                        '从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖，并根据万位的开奖号码获得相应奖金。 如：选择14，开奖号码为**14*， *1*4*， *4*1*， **41*，*14** ，*41**即为中奖，当万位为非"6"和"9"时，返奖率为100%；当万位为"9"时，返奖率为90%；当万位为"6"时，返奖率为75%。',
                    "play_id_79@3":
                        "从一码、二码中分别选择1个号码投注，每注由2个号码组成，只要开奖号码的千位、百位、十位中包含所选号码，即为中奖。 如：选择14，开奖号码为**14*， *1*4*， *4*1*， **41*，*14** ，*41**，即为中奖。",
                    "play_id_80@1":
                        "手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择12345，开奖号码为12345，即为中奖。",
                    "play_id_80@3":
                        "手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择12345，开奖号码为12345，即为中奖。",
                    "play_id_81@1":
                        "手动输入一个5位数号码组成一注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；前三或后三号码相同且顺序一致，即中二等奖；前二或后二号码相同且顺序一致，即中三等奖。<br />如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。",
                    "play_id_81@3":
                        "手动输入一个5位数号码组成一注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；前三或后三号码相同且顺序一致，即中二等奖；前二或后二号码相同且顺序一致，即中三等奖。<br />如：选择54321，开奖号码为54321，即中一等奖，开奖号码为543**、**321，即中二等奖，开奖号码为54***、***21，即中三等奖。",
                    "play_id_82@1":
                        "手动输入一个5位数号码组成一注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；所选号码千位、百位、十位、个位与开奖号码相同，即中二等奖，依次类推。<br />如：选择12345，开奖号码为12345即中一等奖，开奖号码为*2345即中二等奖，依次类推。",
                    "play_id_82@3":
                        "手动输入一个5位数号码组成一注，所选号码与开奖号码数字全部相同且顺序一致，即中一等奖；所选号码千位、百位、十位、个位与开奖号码相同，即中二等奖，依次类推。<br />如：选择12345，开奖号码为12345即中一等奖，开奖号码为*2345即中二等奖，依次类推。",
                    "play_id_83@1":
                        "手动输入一个4位数号码组成一注，所选号码的万位、千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择1234，开 奖号码为1234*，即为中奖。",
                    "play_id_83@3":
                        "手动输入一个4位数号码组成一注，所选号码的万位、千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择1234，开 奖号码为1234*，即为中奖。",
                    "play_id_84@1":
                        "手动输入一个4位数号码组成一注，所选号码万位、千位、百位、十位与开奖号码相同，即中一等奖；若所选号码千位、百位、十位与开奖号码相同，即中二等奖，依次类推。<br />如：选择1234，开奖号码为1234*，即中一等奖，开奖号码为*234*，即中二等奖，开奖号码为**34*，即中三等奖，开奖号码为***4*即中四等奖。",
                    "play_id_84@3":
                        "手动输入一个4位数号码组成一注，所选号码万位、千位、百位、十位与开奖号码相同，即中一等奖；若所选号码千位、百位、十位与开奖号码相同，即中二等奖，依次类推。<br />如：选择1234，开奖号码为1234*，即中一等奖，开奖号码为*234*，即中二等奖，开奖号码为**34*，即中三等奖，开奖号码为***4*即中四等奖。",
                    "play_id_85@1":
                        '手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择1234，开奖号码为"*1234"，即为中奖。',
                    "play_id_85@2":
                        '手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖，并根据万位的开奖号码获得相应奖金。<br />如：选择1234，开奖号码为"*1234"，即为中奖。',
                    "play_id_85@3":
                        '手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择1234，开奖号码为"*1234"，即为中奖。',
                    "play_id_86@1":
                        "手动输入一个4位数号码组成一注，所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖，依次类推。<br />如：选择1234，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。",
                    "play_id_86@2":
                        "手动输入一个4位数号码组成一注，所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖，依次类推，并根据万位的开奖号码获得相应奖金。<br />如：选择1234，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。",
                    "play_id_86@3":
                        "手动输入一个4位数号码组成一注，所选号码千位、百位、十位、个位与开奖号码相同，即中一等奖；若所选号码百位、十位、个位与开奖号码相同，即中二等奖，依次类推。<br />如：选择1234，开奖号码为*1234，即中一等奖，开奖号码为**234，即中二等奖，开奖号码为***34，即中三等奖，开奖号码为****4即中四等奖。",
                    "play_id_87@1":
                        "手动输入一个3位数号码组成一注，所选号码的万位、千位、百位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择123，开奖号码为123**，即为中奖。",
                    "play_id_87@3":
                        "手动输入一个3位数号码组成一注，所选号码的万位、千位、百位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择123，开奖号码为123**，即为中奖。",
                    "play_id_88@1":
                        "手动输入一个3位数号码组成一注，所选号码万位、千位、百位与开奖号码相同，即中一等奖；若所选号码千位、百位与开奖号码相同，即中二等奖；若所选号码百位与开奖号码相同，即中三等奖。<br />如：选择345，开奖号码为345**，即中一等奖，开奖号码为*45**，即中二等奖，开奖号码为**5**，即中三等奖。",
                    "play_id_88@3":
                        "手动输入一个3位数号码组成一注，所选号码万位、千位、百位与开奖号码相同，即中一等奖；若所选号码千位、百位与开奖号码相同，即中二等奖；若所选号码百位与开奖号码相同，即中三等奖。<br />如：选择345，开奖号码为345**，即中一等奖，开奖号码为*45**，即中二等奖，开奖号码为**5**，即中三等奖。",
                    "play_id_89@1":
                        "手动输入一个3位数号码组成一注，所选号码的千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择123，开奖号码为*123*，即为中奖。",
                    "play_id_89@2":
                        "手动输入一个3位数号码组成一注，所选号码的千位、百位、十位与开奖号码相同，且顺序一致，即为中奖，并根据万位的开奖号码获得相应奖金。<br />如：选择123，开奖号码为*123*，即为中奖。",
                    "play_id_89@3":
                        "手动输入一个3位数号码组成一注，所选号码的千位、百位、十位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择123，开奖号码为*123*，即为中奖。",
                    "play_id_90@1":
                        "手动输入一个3位数号码组成一注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖。<br />如：选择234，开奖号码为*234*，即中一等奖，开奖号码为**34*，即中二等奖，开奖号码为***4*，即中三等奖。",
                    "play_id_90@2":
                        "手动输入一个3位数号码组成一注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖，并根据万位的开奖号码获得相应奖金。<br />如：选择234，开奖号码为*234*，**34*，***4*，即为中奖",
                    "play_id_90@3":
                        "手动输入一个3位数号码组成一注，若所选号码千位、百位、十位与开奖号码相同，即中一等奖；若所选号码百位、十位与开奖号码相同，即中二等奖；若所选号码十位与开奖号码相同，即中三等奖。<br />如：选择234，开奖号码为*234*，即中一等奖，开奖号码为**34*，即中二等奖，开奖号码为***4*，即中三等奖。",
                    "play_id_91@1":
                        "手动输入一个3位数号码组成一注，所选号码的百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择123，开奖号码为**123，即为中奖。",
                    "play_id_91@2":
                        "手动输入一个3位数号码组成一注，所选号码的百位、十位、个位与开奖号码相同，且顺序一致，即为中奖，并根据万位的开奖号码获得相应奖金。<br />如：选择123，开奖号码为**123，即为中奖。",
                    "play_id_91@3":
                        "手动输入一个3位数号码组成一注，所选号码的百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择123，开奖号码为**123，即为中奖。",
                    "play_id_92@1":
                        "手动输入一个3位数号码组成一注，所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖。<br />如：选择345，开奖号码为**345，即中一等奖，开奖号码为***45，即中二等奖，开奖号码为****5，即中三等奖。",
                    "play_id_92@2":
                        "手动输入一个3位数号码组成一注，所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖，并根据万位的开奖号码获得相应奖金。<br />如：选择234，开奖号码为**234，***34，****4，即为中奖。",
                    "play_id_92@3":
                        "手动输入一个3位数号码组成一注，所选号码百位、十位、个位与开奖号码相同，即中一等奖；若所选号码十位、个位与开奖号码相同，即中二等奖；若所选号码个位与开奖号码相同，即中三等奖。<br />如：选择345，开奖号码为**345，即中一等奖，开奖号码为***45，即中二等奖，开奖号码为****5，即中三等奖。",
                    "play_id_93@1":
                        "手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择34，开奖号码为34***，即为中奖。",
                    "play_id_93@3":
                        "手动输入一个2位数号码组成一注，所选号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择34，开奖号码为34***，即为中奖。",
                    "play_id_94@1":
                        "手动输入一个2位数号码组成一注，所选号码万位、千位与开奖号码相同，即中一等奖；若所选号码千位与开奖号码相同，即中二等奖。<br />如：选择54，开奖号码为54***，即中一等奖，开奖号码为*4***，即为中奖。",
                    "play_id_94@3":
                        "手动输入一个2位数号码组成一注，所选号码万位、千位与开奖号码相同，即中一等奖；若所选号码千位与开奖号码相同，即中二等奖。<br />如：选择54，开奖号码为54***，即中一等奖，开奖号码为*4***，即为中奖。",
                    "play_id_95@1":
                        '手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择34，开奖号码为"***34"，即为中奖。',
                    "play_id_95@2":
                        '手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖，并根据万位的开奖号码获得相应奖金。<br />如：选择34，开奖号码为"***34"，即为中奖。',
                    "play_id_95@3":
                        '手动输入一个2位数号码组成一注，所选号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。<br />如：选择34，开奖号码为"***34"，即为中奖。',
                    "play_id_96@1":
                        "手动输入一个2位数号码组成一注，所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖。<br />如：选择45，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。",
                    "play_id_96@2":
                        "手动输入一个2位数号码组成一注，所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖，并根据万位的开奖号码获得相应奖金。<br />如：选择45，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。",
                    "play_id_96@3":
                        "手动输入一个2位数号码组成一注，所选号码十位、个位与开奖号码相同，即中一等奖；若所选号码个位与开奖号码相同，即中二等奖。<br />如：选择45，开奖号码为***45，即中一等奖，开奖号码为****5，即中二等奖。",
                    "play_id_97@1":
                        "从万位、千位、百位、十位、个位中任意勾选两个位置，手动输入一个两位数号码组成一注，所选两个位置和输入的号码都与开奖号码相同，且顺序一致，即为中奖。<br />如：勾选位置千位、个位，输入号码12； 开奖号码：*1**2，即为中奖。",
                    "play_id_97@3":
                        "从万位、千位、百位、十位、个位中任意勾选两个位置，手动输入一个两位数号码组成一注，所选两个位置和输入的号码都与开奖号码相同，且顺序一致，即为中奖。<br />如：勾选位置千位、个位，输入号码12； 开奖号码：*1**2，即为中奖。",
                    "play_id_98@1":
                        "从万位、千位、百位、十位、个位中任意勾选三个位置，在这三个位上至少各选1个号码组成一注，所选三个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。<br />如：勾选位置万位、千位、十位，输入号码152；开奖号码：15*2*，即为中奖。",
                    "play_id_98@3":
                        "从万位、千位、百位、十位、个位中任意勾选三个位置，在这三个位上至少各选1个号码组成一注，所选三个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。<br />如：勾选位置万位、千位、十位，输入号码152；开奖号码：15*2*，即为中奖。",
                    "play_id_99@1":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，在这四个位上至少各选1个号码组成一注，所选四个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。<br />如：勾选位置万位、千位、百位、十位，输入号码1502；开奖号码：1502*，即为中奖。",
                    "play_id_99@3":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，在这四个位上至少各选1个号码组成一注，所选四个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。<br />如：勾选位置万位、千位、百位、十位，输入号码1502；开奖号码：1502*，即为中奖。",
                    "play_id_100@1":
                        "从01-11中任意选择2个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入07 06，开奖号码为 * 07 * 06 *，即为中奖。",
                    "play_id_100@3":
                        "从01-11中任意选择2个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入07 06，开奖号码为 * 07 * 06 *，即为中奖。",
                    "play_id_101@1":
                        "从01-11中任意选择3个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入07 04 11，开奖号码为 * 04 11 07 *，即为中奖。",
                    "play_id_101@3":
                        "从01-11中任意选择3个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入07 04 11，开奖号码为 * 04 11 07 *，即为中奖。",
                    "play_id_102@1":
                        "从01-11中任意选择4个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 04 08 03，开奖号码为08 04 * 05 03，即为中奖。",
                    "play_id_102@3":
                        "从01-11中任意选择4个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 04 08 03，开奖号码为08 04 * 05 03，即为中奖。",
                    "play_id_103@1":
                        "从01-11中任意选择5个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_103@3":
                        "从01-11中任意选择5个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_104@1":
                        "从01-11中任意选择6个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_104@3":
                        "从01-11中任意选择6个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_105@1":
                        "从01-11中任意选择7个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_105@3":
                        "从01-11中任意选择7个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_106@1":
                        "从01-11中任意选择8个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_106@3":
                        "从01-11中任意选择8个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。<br />如：输入05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_107@1":
                        "手动输入3个号码组成一注，所输入的号码与开奖号码中的前3个号码相同，且顺序一致，即为中奖。<br />如：输入01 02 03，开奖号码顺序为01，02，03 * *，即为中奖。",
                    "play_id_107@3":
                        "手动输入3个号码组成一注，所输入的号码与开奖号码中的前3个号码相同，且顺序一致，即为中奖。<br />如：输入01 02 03，开奖号码顺序为01，02，03 * *，即为中奖。",
                    "play_id_108@1":
                        "手动输入3个号码组成一致，所输入的号码与开奖号码中的前3个号码相同，顺序不限，即为中奖。<br />如：输入01 02 03，若开奖号码为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *，即为中奖。",
                    "play_id_108@3":
                        "手动输入3个号码组成一致，所输入的号码与开奖号码中的前3个号码相同，顺序不限，即为中奖。<br />如：输入01 02 03，若开奖号码为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *，即为中奖。",
                    "play_id_109@1":
                        "手动输入2个号码组成一注，所输入的号码与开奖号码中的前2个号码相同，且顺序一致，即为中奖。<br />如：输入01 02，开奖号码01 02 * * *，即为中奖。",
                    "play_id_109@3":
                        "手动输入2个号码组成一注，所输入的号码与开奖号码中的前2个号码相同，且顺序一致，即为中奖。<br />如：输入01 02，开奖号码01 02 * * *，即为中奖。",
                    "play_id_110@1":
                        "手动输入2个号码组成一注，所输入的号码与开奖号码中的前2个号码相同，顺序不限，即为中奖。<br />如：输入01 02，开奖号码为02 01 * * * 或 01 02 * * *，即为中奖。",
                    "play_id_110@3":
                        "手动输入2个号码组成一注，所输入的号码与开奖号码中的前2个号码相同，顺序不限，即为中奖。<br />如：输入01 02，开奖号码为02 01 * * * 或 01 02 * * *，即为中奖。",
                    "play_id_111@1":
                        "手动输入一个3位数号码组成一注，所选号码与开奖号码的相同，且顺序一致，即为中奖。<br />如：手动输入123，开奖号码为123，即为中奖。",
                    "play_id_111@3":
                        "手动输入一个3位数号码组成一注，所选号码与开奖号码的相同，且顺序一致，即为中奖。<br />如：手动输入123，开奖号码为123，即为中奖。",
                    "play_id_112@1":
                        "手动输入一个2个位号码组成一注，所选号码与开奖号码的百位、十位相同，且顺序一致，即为中奖。<br />如：手动输入12，开奖号码为是12*，即为中奖。",
                    "play_id_112@3":
                        "手动输入一个2个位号码组成一注，所选号码与开奖号码的百位、十位相同，且顺序一致，即为中奖。<br />如：手动输入12，开奖号码为是12*，即为中奖。",
                    "play_id_113@1":
                        "手动输入一个2为数号码组成一注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。<br />如：手动输入12，开奖号码为是*12，即为中奖。",
                    "play_id_113@3":
                        "手动输入一个2为数号码组成一注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。<br />如：手动输入12，开奖号码为是*12，即为中奖。",
                    "play_id_114@1":
                        "手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位数字相同，且顺序一致，即为中奖。<br />如：手动输入123，开奖号码为是123**，即为中奖。",
                    "play_id_114@3":
                        "手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位数字相同，且顺序一致，即为中奖。<br />如：手动输入123，开奖号码为是123**，即为中奖。",
                    "play_id_115@1":
                        "手动输入一个2位数号码组成一注，所选号码与开奖号码的万位、千位相同，且顺序一致，即为中奖。<br />如：输入34，开奖号码为34***，即为中奖。",
                    "play_id_115@3":
                        "手动输入一个2位数号码组成一注，所选号码与开奖号码的万位、千位相同，且顺序一致，即为中奖。<br />如：输入34，开奖号码为34***，即为中奖。",
                    "play_id_116@1":
                        "手动输入一个2位数号码组成一注，所选号码与开奖号码的千位、百位相同，且顺序一致，即为中奖。<br />如：输入34，开奖号码为*34**，即为中奖。",
                    "play_id_116@3":
                        "手动输入一个2位数号码组成一注，所选号码与开奖号码的千位、百位相同，且顺序一致，即为中奖。<br />如：输入34，开奖号码为*34**，即为中奖。",
                    "play_id_166@1":
                        "手动输入一个2位数号码组成一注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。<br />如：输入34，开奖号码为***34，即为中奖。",
                    "play_id_166@3":
                        "手动输入一个2位数号码组成一注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。<br />如：输入34，开奖号码为***34，即为中奖。",
                    "play_id_169@1":
                        "从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。如：投注方案：8；开奖号码：至少出现1个8，即中一帆风顺。",
                    "play_id_169@3":
                        "从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。如：投注方案：8；开奖号码：至少出现1个8，即中一帆风顺。",
                    "play_id_170@1":
                        "从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。如：投注方案：8；开奖号码：至少出现2个8，即中好事成双。",
                    "play_id_170@3":
                        "从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。如：投注方案：8；开奖号码：至少出现2个8，即中好事成双。",
                    "play_id_171@1":
                        "从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。如：投注方案：8；开奖号码：至少出现3个8，即中三星报喜。",
                    "play_id_171@3":
                        "从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。如：投注方案：8；开奖号码：至少出现3个8，即中三星报喜。",
                    "play_id_172@1":
                        "从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。如：投注方案：8；开奖号码：至少出现4个8，即中四季发财。",
                    "play_id_172@3":
                        "从0-9中选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。如：投注方案：8；开奖号码：至少出现4个8，即中四季发财。",
                    "play_id_174@1":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择四个号码组成一注，所选4个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择号码1234； 开奖号码：12*34 或 13*24，均中任四组选24。",
                    "play_id_174@3":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择四个号码组成一注，所选4个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择号码1234； 开奖号码：12*34 或 13*24，均中任四组选24。",
                    "play_id_175@1":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，然后选择1个二重号码和2个单号号码组成一注，所选4个位置的开奖号码中包含与所选号码，且所选二重号码在所选4个位置的开奖号码中出现了2次，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择二重号：8，单号：0、6； 开奖号码：88*06 或08*68 均中任四组选12。",
                    "play_id_175@3":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，然后选择1个二重号码和2个单号号码组成一注，所选4个位置的开奖号码中包含与所选号码，且所选二重号码在所选4个位置的开奖号码中出现了2次，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择二重号：8，单号：0、6； 开奖号码：88*06 或08*68 均中任四组选12。",
                    "play_id_176@1":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择2个二重号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选的2个二重号码在所选4个位置的开奖号码中分别出现了2次，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择二重号：6、8； 开奖号码：66*88 或 68*68 均中任四组选6。",
                    "play_id_176@3":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择2个二重号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选的2个二重号码在所选4个位置的开奖号码中分别出现了2次，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择二重号：6、8； 开奖号码：66*88 或 68*68 均中任四组选6。",
                    "play_id_177@1":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择1个三重号和1个单号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选三重号码在所选4个位置的开奖号码中出现了3次，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择三重号：8，单号：0； 开奖号码：88*80 或 80*88 均中任四组选4。",
                    "play_id_177@3":
                        "从万位、千位、百位、十位、个位中任意勾选四个位置，然后从0-9中选择1个三重号和1个单号组成一注，所选4个位置的开奖号码与所选号码一致，并且所选三重号码在所选4个位置的开奖号码中出现了3次，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、十位、个位，选择三重号：8，单号：0； 开奖号码：88*80 或 80*88 均中任四组选4。",
                    "play_id_178@1":
                        "开奖号码任3位为组三或组六形态(不含豹子号)，投注数值等于开奖号前3位数字相加之和，即为中奖。如：勾选位置万位、千位、个位；选择和值8；开奖号码：13**4 顺序不限，即中任三组选和值。",
                    "play_id_178@3":
                        "开奖号码任3位为组三或组六形态(不含豹子号)，投注数值等于开奖号前3位数字相加之和，即为中奖。如：勾选位置万位、千位、个位；选择和值8；开奖号码：13**4 顺序不限，即中任三组选和值。",
                    "play_id_179@1":
                        "玩家从0~9共10个数中任选2个或者2个以上号码，系统将自动完成自定义两个或以上相同号码的三位（万、千、百、十、个）组合（不按位置顺序）；投注号码与开奖号码相同即中奖。<br/>例如：开彩号码为1 0 5 5 2，玩家若勾选百、十、个位选两个数字5、2，则含“5、5、2”，“5、2、2” 两注“组选3”号码，其中“5、5、2”这注中奖；<br/>例如：开彩号码为1 0 5 5 2，玩家若勾选百、十、个位选择三个数字5、2、4，则包含“5、5、2”，“5、5、4”，“5、2、2”，“4、2、2”，“2、4、4”，“5、4、4” 六注“组选”号码，其中“5、5、2”这注中奖；",
                    "play_id_179@3":
                        "从万位、千位、百位、十位、个位中任意勾选三个位置，然后从0-9中选择两个号码组成一注，所选3个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、千位、个位，选择号码18； 开奖号码：11**8 或 18**1，均中任三组三复式。",
                    "play_id_180@1":
                        "玩家从0~9 共10个数中任选3个或者3个以上不相同号码，系统将自动完成自定义位置号码的三位（万、千、百、十、个）组合(不按位置顺序)；投注号码与开奖号码相同即中奖。<br/>例如：开彩号码为5 2 4 3 0，玩家若勾选百、十、个位选三个数字0、4、3；则包含“4、3、0” 一注“组选”号码，即中奖。<br/>例如：开彩号码为5 2 4 3 0，玩家若勾选百、十、个位选四个数字0、3、4、5；则包含“0、3、4”，“0、3、5”， “0、4、5”，“3、4、5” 四注“组选”号码，其中“0、3、4”这注中奖；<br/>例如：开彩号码为5 2 4 3 0，玩家若勾选百、十、个位选择五个数字0、3、4、5、6；则包含“0、3、4”，“0、3、5”，“0、3、6”，“0、4、5”，“0、4、6”，“0、5、6”， “3、4、5”，“3、4、6”，“3、5、6”，“4、5、6” 十注“组选”号码，其中“0、3、4”这注中奖。",
                    "play_id_180@3":
                        "从万位、千位、百位、十位、个位中任意勾选三个位置，然后从0-9中选择三个号码组成一注，所选3个位置的开奖号码与所选号码一致，顺序不限，即为中奖。中奖举例：勾选位置万位、百位、个位，选择号码159； 开奖号码：1*5*9 或 9*1*5，均中任三组六复式。",
                    "play_id_181@1":
                        "从万位、千位、百位、十位、个位中任意勾选三个位置，然后输入三个号码组成一注，所选3个位置的开奖号码与输入号码一致，顺序不限，即为中奖。中奖举例：勾选位置千位、百位、个位，分別投注(0,0,1)，开奖号码：*00*1，顺序不限，均中任三混合组选。",
                    "play_id_181@3":
                        "从万位、千位、百位、十位、个位中任意勾选三个位置，然后输入三个号码组成一注，所选3个位置的开奖号码与输入号码一致，顺序不限，即为中奖。中奖举例：勾选位置千位、百位、个位，分別投注(0,0,1)，开奖号码：*00*1，顺序不限，均中任三混合组选。",
                    "play_id_182@1":
                        "开奖号码任选2位各不相同（不含对子号），投注数值等于开奖号码任选2个数字相加之和，顺序不限，即为中奖。如：勾选位置万位、千位和值1，开奖号码为10**或01**，即为中奖。",
                    "play_id_182@3":
                        "开奖号码任选2位各不相同（不含对子号），投注数值等于开奖号码任选2个数字相加之和，顺序不限，即为中奖。如：勾选位置万位、千位和值1，开奖号码为10**或01**，即为中奖。",
                    "play_id_183@1":
                        "玩家从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【万】【千】【百】【十】【个】任意勾选2位或者2位以上的数字号码（不按位置顺序）下注，开奖号码与下注的位置不是对子（相同号码）而且投注号码与开奖号码相同即中奖。例如： 玩家投注【千】【十】位5、6，开奖号码为“1 5 3 6 0” 或者“1 6 3 5 4”，【千】【十】位都包含5、6即中奖。",
                    "play_id_183@3":
                        "玩家从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【万】【千】【百】【十】【个】任意勾选2位或者2位以上的数字号码（不按位置顺序）下注，开奖号码与下注的位置不是对子（相同号码）而且投注号码与开奖号码相同即中奖。例如： 玩家投注【千】【十】位5、6，开奖号码为“1 5 3 6 0” 或者“1 6 3 5 4”，【千】【十】位都包含5、6即中奖。",
                    "play_id_184@1":
                        "玩家手动输入从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【万】【千】【百】【十】【个】任意勾选2位或者2位以上的数字号码（不按位置顺序）下注，开奖号码与下注的位置不是对子（相同号码）而且投注号码与开奖号码相同即中奖。例如： 玩家投注【千】【十】位5、6，开奖号码为“1 5 3 6 0” 或者“1 6 3 5 4”，【千】【十】位都包含5、6即中奖。",
                    "play_id_184@3":
                        "玩家手动输入从0~9共10个数中任选2个或者2个以上不相同号码，猜开奖号的【万】【千】【百】【十】【个】任意勾选2位或者2位以上的数字号码（不按位置顺序）下注，开奖号码与下注的位置不是对子（相同号码）而且投注号码与开奖号码相同即中奖。例如： 玩家投注【千】【十】位5、6，开奖号码为“1 5 3 6 0” 或者“1 6 3 5 4”，【千】【十】位都包含5、6即中奖。",
                    "play_id_902@1":
                        "从6种不同的单双组合中任意选择1个或多个组合投注，只要当期开奖号码的单双个数与所选单双组合一致，即为中奖。 如：选择0单5双，开奖号码02，04，06，08，10五个双数，即中一等奖。如：选择5单0双，开奖号码01，03，05，07，09五个单数，即中二等奖。如：选择1单4双，开奖号码01，02，04，06，08一个单数四个双数，即中三等奖。如：选择4单1双，开奖号码01，03，05，07，08四个单数一个双数，即中四等奖。如：选择2单3双，开奖号码01，03，04，06，08二个单数三个双数，即中五等奖。如：选择3单2双，开奖号码01，03，05，06，08三个单数二个双数，即中六等奖。",
                    "play_id_902@3":
                        "从6种不同的单双组合中任意选择1个或多个组合投注，只要当期开奖号码的单双个数与所选单双组合一致，即为中奖。 如：选择0单5双，开奖号码02，04，06，08，10五个双数，即中一等奖。如：选择5单0双，开奖号码01，03，05，07，09五个单数，即中二等奖。如：选择1单4双，开奖号码01，02，04，06，08一个单数四个双数，即中三等奖。如：选择4单1双，开奖号码01，03，05，07，08四个单数一个双数，即中四等奖。如：选择2单3双，开奖号码01，03，04，06，08二个单数三个双数，即中五等奖。如：选择3单2双，开奖号码01，03，05，06，08三个单数二个双数，即中六等奖。",
                    "play_id_903@1":
                        "从03-09中选择1个或多个号码投注，所选号码与当期开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。 如：选择08，开奖号码为11，04，09，05，08，按开奖号码的数字大小排列为04，05，08，09，11，中间数08，即为中奖。中奖且中间数为03或09时，为一等奖；中奖且中间数为04或08时，为二等奖；中奖且中间数为05或07时，为三等奖；中奖且中间数为06时，为四等奖。",
                    "play_id_903@3":
                        "从03-09中选择1个或多个号码投注，所选号码与当期开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。 如：选择08，开奖号码为11，04，09，05，08，按开奖号码的数字大小排列为04，05，08，09，11，中间数08，即为中奖。中奖且中间数为03或09时，为一等奖；中奖且中间数为04或08时，为二等奖；中奖且中间数为05或07时，为三等奖；中奖且中间数为06时，为四等奖。",
                    "play_id_907@1":
                        "从第一位、第二位、第三位中选择1个或多个号码投注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：第一位选择01，开奖号码为01 * * * *，即为中奖。如：第二位选择05，开奖号码为* 05 * * *，即为中奖。如：第三位选择07，开奖号码为* * 07 * *，即为中奖。",
                    "play_id_907@3":
                        "从第一位、第二位、第三位中选择1个或多个号码投注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：第一位选择01，开奖号码为01 * * * *，即为中奖。如：第二位选择05，开奖号码为* 05 * * *，即为中奖。如：第三位选择07，开奖号码为* * 07 * *，即为中奖。",
                    "play_id_908@1":
                        "从01-11中任意选择1个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择02，开奖号码为***02*，即为中奖。",
                    "play_id_908@3":
                        "从01-11中任意选择1个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择02，开奖号码为***02*，即为中奖。",
                    "play_id_909@1":
                        "从01-11中任意选择2个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择07 06，开奖号码为 * 07 * 06 *，即为中奖。",
                    "play_id_909@3":
                        "从01-11中任意选择2个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择07 06，开奖号码为 * 07 * 06 *，即为中奖。",
                    "play_id_910@1":
                        "从01-11中任意选择3个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择07 04 11，开奖号码为 * 04 11 07 *，即为中奖。",
                    "play_id_910@3":
                        "从01-11中任意选择3个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择07 04 11，开奖号码为 * 04 11 07 *，即为中奖。",
                    "play_id_911@1":
                        "从01-11中任意选择4个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 08 03，开奖号码为08 04 * 05 03，即为中奖。",
                    "play_id_911@3":
                        "从01-11中任意选择4个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 08 03，开奖号码为08 04 * 05 03，即为中奖。",
                    "play_id_912@1":
                        "从01-11中任意选择5个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_912@3":
                        "从01-11中任意选择5个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_913@1":
                        "从01-11中任意选择6个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_913@3":
                        "从01-11中任意选择6个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 10 04 11 03 08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_914@1":
                        "从01-11中任意选择7个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_914@3":
                        "从01-11中任意选择7个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 10 11 03 08 09，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_915@1":
                        "从01-11中任意选择8个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_915@3":
                        "从01-11中任意选择8个或多个号码投注，只要5个开奖号码中包含所选号码，即为中奖。 如：选择05 04 11 03 08 10 09 01，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_916@1":
                        "从6种不同的单双组合中任意选择1个或多个组合投注，只要当期开奖号码的单双个数与所选单双组合一致，即为中奖。 如：选择0单5双，开奖号码02，04，06，08，10五个双数，即中一等奖。如：选择5单0双，开奖号码01，03，05，07，09五个单数，即中二等奖。如：选择1单4双，开奖号码01，02，04，06，08一个单数四个双数，即中三等奖。如：选择4单1双，开奖号码01，03，05，07，08四个单数一个双数，即中四等奖。如：选择2单3双，开奖号码01，03，04，06，08二个单数三个双数，即中五等奖。如：选择3单2双，开奖号码01，03，05，06，08三个单数二个双数，即中六等奖。",
                    "play_id_916@3":
                        "从6种不同的单双组合中任意选择1个或多个组合投注，只要当期开奖号码的单双个数与所选单双组合一致，即为中奖。 如：选择0单5双，开奖号码02，04，06，08，10五个双数，即中一等奖。如：选择5单0双，开奖号码01，03，05，07，09五个单数，即中二等奖。如：选择1单4双，开奖号码01，02，04，06，08一个单数四个双数，即中三等奖。如：选择4单1双，开奖号码01，03，05，07，08四个单数一个双数，即中四等奖。如：选择2单3双，开奖号码01，03，04，06，08二个单数三个双数，即中五等奖。如：选择3单2双，开奖号码01，03，05，06，08三个单数二个双数，即中六等奖。",
                    "play_id_917@1":
                        "从03-09中选择1个或多个号码投注，所选号码与当期开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。 如：选择08，开奖号码为11，04，09，05，08，按开奖号码的数字大小排列为04，05，08，09，11，中间数08，即为中奖。中奖且中间数为03或09时，为一等奖；中奖且中间数为04或08时，为二等奖；中奖且中间数为05或07时，为三等奖；中奖且中间数为06时，为四等奖。",
                    "play_id_917@3":
                        "从03-09中选择1个或多个号码投注，所选号码与当期开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。 如：选择08，开奖号码为11，04，09，05，08，按开奖号码的数字大小排列为04，05，08，09，11，中间数08，即为中奖。中奖且中间数为03或09时，为一等奖；中奖且中间数为04或08时，为二等奖；中奖且中间数为05或07时，为三等奖；中奖且中间数为06时，为四等奖。",
                    "play_id_918@1":
                        "从01-11中选择3个不重复的号码组成一注，所选号码与当期开奖号码中的前三位号码相同，且顺序一致，即为中奖。 如：第一位选择01，第二位选择02，第三位选择03，开奖号码为01，02，03 * *，即为中奖。",
                    "play_id_918@3":
                        "从01-11中选择3个不重复的号码组成一注，所选号码与当期开奖号码中的前三位号码相同，且顺序一致，即为中奖。 如：第一位选择01，第二位选择02，第三位选择03，开奖号码为01，02，03 * *，即为中奖。",
                    "play_id_919@1":
                        "从01-11中选择3个号码投注，所选号码与开奖号码中的前三个号码相同，顺序不限，即为中奖。 如：选择01 02 03，若开奖号码为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *，即为中奖。",
                    "play_id_919@3":
                        "从01-11中选择3个号码投注，所选号码与开奖号码中的前三个号码相同，顺序不限，即为中奖。 如：选择01 02 03，若开奖号码为01 02 03 * *，01 03 02 * *，02 01 03 * *，02 03 01 * *，03 01 02 * *，03 02 01 * *，即为中奖。",
                    "play_id_920@1":
                        "从01-11中选择2个不重复的号码组成一注，所选号码与当期开奖号码中的前两个号码相同，且顺序一致，即为中奖。 如：第一位选择01，第二位选择02，开奖号码为01 02 * * *，即为中奖。",
                    "play_id_920@3":
                        "从01-11中选择2个不重复的号码组成一注，所选号码与当期开奖号码中的前两个号码相同，且顺序一致，即为中奖。 如：第一位选择01，第二位选择02，开奖号码为01 02 * * *，即为中奖。",
                    "play_id_921@1":
                        "从01-11中选择2个号码投注，所选号码与开奖号码中的前两个号码相同，顺序不限，即为中奖。 如：选择01 02，开奖号码为02 01 * * * 或 01 02 * * *，即为中奖。",
                    "play_id_921@3":
                        "从01-11中选择2个号码投注，所选号码与开奖号码中的前两个号码相同，顺序不限，即为中奖。 如：选择01 02，开奖号码为02 01 * * * 或 01 02 * * *，即为中奖。",
                    "play_id_922@1":
                        "从01-11中选择1个或多个号码投注，只要开奖号码的前三个号码中包含所选号码，顺序不限，即为中奖。",
                    "play_id_922@3":
                        "从01-11中选择1个或多个号码投注，只要开奖号码的前三个号码中包含所选号码，顺序不限，即为中奖。",
                    "play_id_923@1":
                        "从第一位、第二位、第三位、第四位、第五位中选择1个或多个号码投注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：第一位选择01，开奖号码为01 * * * *，即为中奖。如：第二位选择05，开奖号码为 * 05 * * * ，即为中奖。如：第三位选择07，开奖号码为 * * 07 * * ，即为中奖。如：第四位选择08，开奖号码为 * * * 08 * ，即为中奖。如：第五位选择09，开奖号码为 * * * * 09 ，即为中奖。",
                    "play_id_923@3":
                        "从第一位、第二位、第三位、第四位、第五位中选择1个或多个号码投注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：第一位选择01，开奖号码为01 * * * *，即为中奖。如：第二位选择05，开奖号码为 * 05 * * * ，即为中奖。如：第三位选择07，开奖号码为 * * 07 * * ，即为中奖。如：第四位选择08，开奖号码为 * * * 08 * ，即为中奖。如：第五位选择09，开奖号码为 * * * * 09 ，即为中奖。",
                    "play_id_1401@1":
                        "从百位、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。",
                    "play_id_1401@3":
                        "从百位、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。",
                    "play_id_1407@1":
                        "从百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即为中奖。 如：十位选择4，开奖号码为*4*，即为中奖。",
                    "play_id_1407@3":
                        "从百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即为中奖。 如：十位选择4，开奖号码为*4*，即为中奖。",
                    "play_id_1408@1":
                        "从百位、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：百位选择1，十位选择2，个位选择3，开奖号码为123，即为中奖。",
                    "play_id_1408@3":
                        "从百位、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：百位选择1，十位选择2，个位选择3，开奖号码为123，即为中奖。",
                    "play_id_1409@1":
                        "从 0-27 中选择1个或多个号码投注，所选数值等于开奖号码的个位、十位、百位，三个数字相加之和，即中奖。 如：选择1，开奖号码是001，010，100，即为中奖。",
                    "play_id_1409@3":
                        "从 0-27 中选择1个或多个号码投注，所选数值等于开奖号码的个位、十位、百位，三个数字相加之和，即中奖。 如：选择1，开奖号码是001，010，100，即为中奖。",
                    "play_id_1410@1":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的百位、十位、个位中有任意两位数字相同 (对子加单码形态)，且顺序不限，即为中奖。 如：选择12，开奖号码为122，212，221，112，121，211，即为中奖。",
                    "play_id_1410@3":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的百位、十位、个位中有任意两位数字相同 (对子加单码形态)，且顺序不限，即为中奖。 如：选择12，开奖号码为122，212，221，112，121，211，即为中奖。",
                    "play_id_1411@1":
                        "从0-9中选择3个或多个号码投注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。 如：选择123，开奖号码为123，132，231，213，312，321，即为中奖。",
                    "play_id_1411@3":
                        "从0-9中选择3个或多个号码投注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。 如：选择123，开奖号码为123，132，231，213，312，321，即为中奖。",
                    "play_id_1412@1":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。 如：选择123、455，开奖号码为321即中组六奖，开奖号码为545即中组三奖。",
                    "play_id_1412@3":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。 如：选择123、455，开奖号码为321即中组六奖，开奖号码为545即中组三奖。",
                    "play_id_1413@1":
                        "从1-26中选择1个或多个号码投注，所选数值等于开奖号码百位、十位、个位三个数字相加之和，即为中奖(不含豹子号)。 如：选择6，开奖号码为114即中组三奖，开奖号码为015即中组六奖。",
                    "play_id_1413@3":
                        "从1-26中选择1个或多个号码投注，所选数值等于开奖号码百位、十位、个位三个数字相加之和，即为中奖(不含豹子号)。 如：选择6，开奖号码为114即中组三奖，开奖号码为015即中组六奖。",
                    "play_id_1414@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择4，开奖号码为4**、*4*、**4，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_1414@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。 如：选择4，开奖号码为4**、*4*、**4，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_1415@1":
                        "从0-9中选择2个或多个号码投注，开奖号码的百位、十位、个位中同时包含所选的2个号码，即为中奖(含对子号)。 如：选择5、5，开奖号码为*55即中对子，选择4、5，开奖号码为*45，*54即中非对子。",
                    "play_id_1415@3":
                        "从0-9中选择2个或多个号码投注，开奖号码的百位、十位、个位中同时包含所选的2个号码，即为中奖(含对子号)。 如：选择5、5，开奖号码为*55即中对子，选择4、5，开奖号码为*45，*54即中非对子。",
                    "play_id_1416@1":
                        "从百位、十位中各选择1个或多个号码投注，所选号码与开奖号码的百位、十位相同，且顺序一致，即为中奖。 如：百位选择3，十位选择4，开奖号码为34*，即为中奖。",
                    "play_id_1416@3":
                        "从百位、十位中各选择1个或多个号码投注，所选号码与开奖号码的百位、十位相同，且顺序一致，即为中奖。 如：百位选择3，十位选择4，开奖号码为34*，即为中奖。",
                    "play_id_1417@1":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的百位、十位相同，顺序不限，即为中奖。 如：选择7，8，开奖号码为78*，87*，即为中奖。",
                    "play_id_1417@3":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的百位、十位相同，顺序不限，即为中奖。 如：选择7，8，开奖号码为78*，87*，即为中奖。",
                    "play_id_1418@1":
                        "从十位、个位中各选择1个或多个号码投注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。 如：十位选择3，个位选择4，开奖号码为*34，即为中奖。",
                    "play_id_1418@3":
                        "从十位、个位中各选择1个或多个号码投注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。 如：十位选择3，个位选择4，开奖号码为*34，即为中奖。",
                    "play_id_1419@1":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的十位、个位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码为*78或*87，即为中奖。",
                    "play_id_1419@3":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的十位、个位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码为*78或*87，即为中奖。",
                    "play_id_1420@1":
                        '从百位、十位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：百位选择大，十位选择单，开奖号码为63*，即为中奖。',
                    "play_id_1420@3":
                        '从百位、十位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：百位选择大，十位选择单，开奖号码为63*，即为中奖。',
                    "play_id_1421@1":
                        '从十位、个位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：十位选择小，个位选择双，开奖号码为*12，即为中奖。',
                    "play_id_1421@3":
                        '从十位、个位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：十位选择小，个位选择双，开奖号码为*12，即为中奖。',
                    "play_id_1422@1":
                        "从百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即为中奖。 如：十位选择4，开奖号码为*4*，即为中奖。",
                    "play_id_1422@3":
                        "从百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即为中奖。 如：十位选择4，开奖号码为*4*，即为中奖。",
                    "play_id_1423@1":
                        "从万位、千位、百位中选择各选择1个或多个号码投注，所选号码与开奖号码的万位、千位、百位数字相同，且顺序一致，即为中奖。",
                    "play_id_1423@3":
                        "从万位、千位、百位中选择各选择1个或多个号码投注，所选号码与开奖号码的万位、千位、百位数字相同，且顺序一致，即为中奖。",
                    "play_id_1429@1":
                        "从万位、千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即为中奖。 如：十位选择4，开奖号码为*4*，即为中奖。",
                    "play_id_1429@3":
                        "从万位、千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即为中奖。 如：十位选择4，开奖号码为*4*，即为中奖。",
                    "play_id_1430@1":
                        "从万位、千位、百位中选择各选择1个或多个号码投注，所选号码与开奖号码的万位、千位、百位数字相同，且顺序一致，即为中奖。 如：万位选择1，千位选择2，百位选择3，开奖号码为123**，即为中奖。",
                    "play_id_1430@3":
                        "从万位、千位、百位中选择各选择1个或多个号码投注，所选号码与开奖号码的万位、千位、百位数字相同，且顺序一致，即为中奖。 如：万位选择1，千位选择2，百位选择3，开奖号码为123**，即为中奖。",
                    "play_id_1431@1":
                        "从0-27中选择1个或多个号码投注，所选数值等于开奖号码的万位、千位、百位相加之和，即中奖。 如：选择6，开奖号码为123**，141**，114**，006**，060**等任意一个和值为6的结果，即为中奖。",
                    "play_id_1431@3":
                        "从0-27中选择1个或多个号码投注，所选数值等于开奖号码的万位、千位、百位相加之和，即中奖。 如：选择6，开奖号码为123**，141**，114**，006**，060**等任意一个和值为6的结果，即为中奖。",
                    "play_id_1432@1":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的万位、千位、百位中有任意两位数字相同，且顺序不限，即为中奖。 如：选择12，开奖号码为122**，212**，221**，112**，121**，211**，即为中奖。",
                    "play_id_1432@3":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的万位、千位、百位中有任意两位数字相同，且顺序不限，即为中奖。 如：选择12，开奖号码为122**，212**，221**，112**，121**，211**，即为中奖。",
                    "play_id_1433@1":
                        "从0-9中选择3个或多个号码投注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。 如：选择123，开奖号码为123**，132**，231**，213**，312**，321**，即为中奖。",
                    "play_id_1433@3":
                        "从0-9中选择3个或多个号码投注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。 如：选择123，开奖号码为123**，132**，231**，213**，312**，321**，即为中奖。",
                    "play_id_1434@1":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。 如：输入123、455，开奖号码为321**即中组六奖，开奖号码为545**即中组三奖。",
                    "play_id_1434@3":
                        "输入购买号码，3个数字为一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。 如：输入123、455，开奖号码为321**即中组六奖，开奖号码为545**即中组三奖。",
                    "play_id_1435@1":
                        "从1-26中选择1个或多个号码投注，所选数值等于开奖号码万位、千位、百位三个数字相加之和，即为中奖(不含豹子号)。 如：选择6，开奖号码为114**即中组三奖，开奖号码为015**即中组六奖。",
                    "play_id_1435@3":
                        "从1-26中选择1个或多个号码投注，所选数值等于开奖号码万位、千位、百位三个数字相加之和，即为中奖(不含豹子号)。 如：选择6，开奖号码为114**即中组三奖，开奖号码为015**即中组六奖。",
                    "play_id_1436@1":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择4，开奖号码为4****，*4***，**4**，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_1436@3":
                        "从0-9中选择1个或多个号码投注，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。 如：选择4，开奖号码为4****，*4***，**4**，即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_1437@1":
                        "从0-9中选择2个或多个号码投注，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖(含对子号)。 如：选择5、5，开奖号码为*55**即中对子，选择4、5，开奖号码为*45**，*54**，4*5**，5*4**，45***，54***即中非对子。",
                    "play_id_1437@3":
                        "从0-9中选择2个或多个号码投注，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖(含对子号)。 如：选择5、5，开奖号码为*55**即中对子，选择4、5，开奖号码为*45**，*54**，4*5**，5*4**，45***，54***即中非对子。",
                    "play_id_1438@1":
                        "从万位、千位中各选择1个或多个号码投注，所选号码与开奖号码的万位、千位相同，且顺序一致，即为中奖。 如：万位选择3，千位选择4，开奖号码为34***，即为中奖。",
                    "play_id_1438@3":
                        "从万位、千位中各选择1个或多个号码投注，所选号码与开奖号码的万位、千位相同，且顺序一致，即为中奖。 如：万位选择3，千位选择4，开奖号码为34***，即为中奖。",
                    "play_id_1439@1":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的万位、千位相同，顺序不限，即为中奖。 如：选择7，8，开奖号码为78***，87***，即为中奖。",
                    "play_id_1439@3":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的万位、千位相同，顺序不限，即为中奖。 如：选择7，8，开奖号码为78***，87***，即为中奖。",
                    "play_id_1440@1":
                        "从千位、百位中各选择1个或多个号码投注，所选号码与开奖号码的千位、百位相同，且顺序一致，即为中奖。 如：千位选择3，百位选择4，开奖号码为*34**，即为中奖。",
                    "play_id_1440@3":
                        "从千位、百位中各选择1个或多个号码投注，所选号码与开奖号码的千位、百位相同，且顺序一致，即为中奖。 如：千位选择3，百位选择4，开奖号码为*34**，即为中奖。",
                    "play_id_1441@1":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的千位、百位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码为*78**，*87**，即为中奖。",
                    "play_id_1441@3":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的千位、百位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码为*78**，*87**，即为中奖。",
                    "play_id_1442@1":
                        "从十位、个位中各选择1个或多个号码投注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。 如：十位选择3，个位选择4，开奖号码为***34，即为中奖。",
                    "play_id_1442@3":
                        "从十位、个位中各选择1个或多个号码投注，所选号码与开奖号码的十位、个位相同，且顺序一致，即为中奖。 如：十位选择3，个位选择4，开奖号码为***34，即为中奖。",
                    "play_id_1443@1":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的十位、个位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码为***78，***87，即为中奖。",
                    "play_id_1443@3":
                        "从0-9中选择2个或多个号码投注，所选号码与开奖号码的十位、个位相同，顺序不限，即为中奖。 如：选择7、8，开奖号码为***78，***87，即为中奖。",
                    "play_id_1444@1":
                        '从万位、千位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：万位选择大，千位选择单，开奖号码为63***，即为中奖。',
                    "play_id_1444@3":
                        '从万位、千位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：万位选择大，千位选择单，开奖号码为63***，即为中奖。',
                    "play_id_1445@1":
                        '从千位、百位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：千位选择小，百位选择双，开奖号码为*12**，即为中奖。',
                    "play_id_1445@3":
                        '从千位、百位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：千位选择小，百位选择双，开奖号码为*12**，即为中奖。',
                    "play_id_1446@1":
                        '从十位、个位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：十位选择小，个位选择双，开奖号码为***12，即为中奖。',
                    "play_id_1446@3":
                        '从十位、个位中的"大(56789)、小(01234)、单(13579)、双(02468)"中选择1个或多个投注，所选号码与开奖号码的位置、形态相同，即为中奖。 如：十位选择小，个位选择双，开奖号码为***12，即为中奖。',
                    "play_id_1447@1":
                        "从万位、千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即为中奖。 如：十位选择4，开奖号码为*4*，即为中奖。",
                    "play_id_1447@3":
                        "从万位、千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即为中奖。 如：十位选择4，开奖号码为*4*，即为中奖。",
                    "play_id_1457@1":
                        "从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。<br />如：投注方案01，开奖号码：01*********，即中猜前一。",
                    "play_id_1457@3":
                        "从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。<br />如：投注方案01，开奖号码：01*********，即中猜前一。",
                    "play_id_1458@1":
                        "从冠军、亚军投注的两个号码与开奖号码中的前2个号码相同且顺序一致，视为中奖。<br />如：投注方案01、02，开奖号码：01、02********，即中猜前二。",
                    "play_id_1458@3":
                        "从冠军、亚军投注的两个号码与开奖号码中的前2个号码相同且顺序一致，视为中奖。<br />如：投注方案01、02，开奖号码：01、02********，即中猜前二。",
                    "play_id_1459@1":
                        "从冠军、亚军、季军投注的三个号码与开奖号码中的前3个号码相同且顺序一致，视为中奖。<br />如：冠军、亚军、季军位买 01、02、03，开奖号码：冠军、亚军、季军开01、02、03*******，即中猜前三。",
                    "play_id_1459@3":
                        "从冠军、亚军、季军投注的三个号码与开奖号码中的前3个号码相同且顺序一致，视为中奖。<br />如：冠军、亚军、季军位买 01、02、03，开奖号码：冠军、亚军、季军开01、02、03*******，即中猜前三。",
                    "play_id_1460@1":
                        "从冠军、亚军、季军、第四名中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。<br />如：投注01、02、03、04，开奖号码：01、02、03、04 ******，即中猜前四。",
                    "play_id_1460@3":
                        "从冠军、亚军、季军、第四名中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。<br />如：投注01、02、03、04，开奖号码：01、02、03、04 ******，即中猜前四。",
                    "play_id_1461@1":
                        "从冠军、亚军、季军、第四名、第五名中选择一个5位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。<br />如：冠军、亚军、季军、第四名、第五名买01、02、03、04、05，开奖号码：01、02、03、04、05*****，即中猜前五。",
                    "play_id_1461@3":
                        "从冠军、亚军、季军、第四名、第五名中选择一个5位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。<br />如：冠军、亚军、季军、第四名、第五名买01、02、03、04、05，开奖号码：01、02、03、04、05*****，即中猜前五。",
                    "play_id_1462@1":
                        "从冠军位开始选择最少一个,最多十个位置，任意1个位置或者多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。<br />如：投注方案 01（冠军），开奖号码：01*********，即中定位胆。",
                    "play_id_1462@3":
                        "从冠军位开始选择最少一个,最多十个位置，任意1个位置或者多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。<br />如：投注方案 01（冠军），开奖号码：01*********，即中定位胆。",
                    "play_id_1463@1":
                        "从第六名开始选择最少一个,最多十个位置，任意1个位置或者多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。<br />如：投注方案06 （第六名），开奖号码：*****06****，即中定位胆。",
                    "play_id_1463@3":
                        "从第六名开始选择最少一个,最多十个位置，任意1个位置或者多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。<br />如：投注方案06 （第六名），开奖号码：*****06****，即中定位胆。",
                    "play_id_1464@1":
                        "从3-19中任意选择至少一个号码组成一组，开奖号码前两位之和与所选的号码一致即为中奖，顺序不限。<br />如：投注3，开奖号码：0102********，即中冠亚和值。",
                    "play_id_1464@3":
                        "从3-19中任意选择至少一个号码组成一组，开奖号码前两位之和与所选的号码一致即为中奖，顺序不限。<br />如：投注3，开奖号码：0102********，即中冠亚和值。",
                    "play_id_1465@1":
                        "从6-27中任意选择至少一个号码组成一组，开奖号码前三位之和与所选的号码一致即为中奖，顺序不限。<br />如：投注8，开奖号码：01、02、05*******，即中冠亚季和值。",
                    "play_id_1465@3":
                        "从6-27中任意选择至少一个号码组成一组，开奖号码前三位之和与所选的号码一致即为中奖，顺序不限。<br />如：投注8，开奖号码：01、02、05*******，即中冠亚季和值。",
                    "play_id_1466@1":
                        "从3-19中任意选择至少一个号码组成一组，开奖号码冠军和第十名之和与所选的号码一致即为中奖，顺序不限。<br />如：投注8，开奖号码：02*******06，即首尾和值。",
                    "play_id_1466@3":
                        "从3-19中任意选择至少一个号码组成一组，开奖号码冠军和第十名之和与所选的号码一致即为中奖，顺序不限。<br />如：投注8，开奖号码：02*******06，即首尾和值。",
                    "play_id_1467@1":
                        "从冠军、亚军、季军、第四名、第五名中的“大、小、单、双”中至少选一个组成一注。<br />如：投注第一名单，开奖号码：03*********，即中第一名大小单双。",
                    "play_id_1467@3":
                        "从冠军、亚军、季军、第四名、第五名中的“大、小、单、双”中至少选一个组成一注。<br />如：投注第一名单，开奖号码：03*********，即中第一名大小单双。",
                    "play_id_1468@1":
                        "从第六、第七、第八、第九、第十名中的“大、小、单、双”中至少选一个组成一注。<br />如：投注第十名双，开奖号码：*********08，即中第十名大小单双。",
                    "play_id_1468@3":
                        "从第六、第七、第八、第九、第十名中的“大、小、单、双”中至少选一个组成一注。<br />如：投注第十名双，开奖号码：*********08，即中第十名大小单双。",
                    "play_id_1469@1":
                        "从冠亚和值“大、小、单、双”中至少选一个号码形态进行投注，所选的号码与对应开奖号码和值一致则中奖。<br />如：投注方案：小，开奖号码：0506********（顺序不限），则中冠亚和值大小单双。（注：3至11为小，12至19为大）",
                    "play_id_1469@3":
                        "从冠亚和值“大、小、单、双”中至少选一个号码形态进行投注，所选的号码与对应开奖号码和值一致则中奖。<br />如：投注方案：小，开奖号码：0506********（顺序不限），则中冠亚和值大小单双。（注：3至11为小，12至19为大）",
                    "play_id_1470@1":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若冠军车号大于第十名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第一名VS第十名，投注内容：[龙],开奖结果第一名为05，第十名为04，即为中奖。",
                    "play_id_1470@3":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若冠军车号大于第十名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第一名VS第十名，投注内容：[龙],开奖结果第一名为05，第十名为04，即为中奖。",
                    "play_id_1471@1":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若亚军车号大于第九名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第二名VS第九名，投注内容：[龙],开奖结果第二名为05，第九名为04，即为中奖。",
                    "play_id_1471@3":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若亚军车号大于第九名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第二名VS第九名，投注内容：[龙],开奖结果第二名为05，第九名为04，即为中奖。",
                    "play_id_1472@1":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第三名车号大于第八名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第三名VS第八名，投注内容：[龙],开奖结果第三名为05，第八名为04，即为中奖。",
                    "play_id_1472@3":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第三名车号大于第八名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第三名VS第八名，投注内容：[龙],开奖结果第三名为05，第八名为04，即为中奖。",
                    "play_id_1473@1":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第四名车号大于第七名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第四名VS第七名，投注内容：[龙],开奖结果第四名为05，第七名为04，即为中奖。",
                    "play_id_1473@3":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第四名车号大于第七名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第四名VS第七名，投注内容：[龙],开奖结果第四名为05，第七名为04，即为中奖。",
                    "play_id_1474@1":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第五名车号大于第六名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第五名VS第六名，投注内容：[龙],开奖结果第五名为05，第六名为04，即为中奖。",
                    "play_id_1474@3":
                        "龙虎是由两两名次进行号码PK，冠军、亚军、第三名、第四名、第五名为龙，第六名、第七名、第八名、第九名、第十名为虎，若第五名车号大于第六名，则为龙，反之则为虎..以此类推。<br />如投注举例：投注第五名VS第六名，投注内容：[龙],开奖结果第五名为05，第六名为04，即为中奖。",
                    "play_id_1601@1":
                        "从0-9中任意选择5个号码组成一注，1个号码只能选择一次，所选号码与开奖号码的万、千、百、十、个位相同，顺序不限，即为中奖，五个开奖号码中出现重复号则不中奖。例：投注方案：10568开奖号码：10568（顺序不限）即为中奖；开奖号码：10565，出现5为重号则不中奖。",
                    "play_id_1601@3":
                        "从0-9中任意选择5个号码组成一注，1个号码只能选择一次，所选号码与开奖号码的万、千、百、十、个位相同，顺序不限，即为中奖，五个开奖号码中出现重复号则不中奖。例：投注方案：10568开奖号码：10568（顺序不限）即为中奖；开奖号码：10565，出现5为重号则不中奖。",
                    "play_id_1602@1":
                        "选择1个二重号码和3个单号号码组成一注，所选的单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。例：投注方案：二重号8，单号016开奖号码：01688（顺序不限）即为中奖。",
                    "play_id_1602@3":
                        "选择1个二重号码和3个单号号码组成一注，所选的单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。例：投注方案：二重号8，单号016开奖号码：01688（顺序不限）即为中奖。",
                    "play_id_1603@1":
                        "选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选的2个二重号码分别在开奖号码中出现了2次，即为中奖。例：投注方案：二重号68，单号0开奖号码：06688（顺序不限）即为中奖。",
                    "play_id_1603@3":
                        "选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选的2个二重号码分别在开奖号码中出现了2次，即为中奖。例：投注方案：二重号68，单号0开奖号码：06688（顺序不限）即为中奖。",
                    "play_id_1604@1":
                        "选择1个三重号码和2个单号号码组成一注，所选的单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。例：投注方案：三重号8，单号01开奖号码：01888（顺序不限）即为中奖。",
                    "play_id_1604@3":
                        "选择1个三重号码和2个单号号码组成一注，所选的单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。例：投注方案：三重号8，单号01开奖号码：01888（顺序不限）即为中奖。",
                    "play_id_1605@1":
                        "选择1个三重号码和1个二重号码，所选三重号码在开奖号码中出现3次，并且所选二重号码在开奖号码中出现了2次，即为中奖。例：投注方案：三重号8，二重号1开奖号码：11888（顺序不限）即为中奖。",
                    "play_id_1605@3":
                        "选择1个三重号码和1个二重号码，所选三重号码在开奖号码中出现3次，并且所选二重号码在开奖号码中出现了2次，即为中奖。例：投注方案：三重号8，二重号1开奖号码：11888（顺序不限）即为中奖。",
                    "play_id_1606@1":
                        "选择1个四重号码和1个单号号码组成一注，所选的单号存在于开奖号码中，且所选四重号码在开奖号码中出现了4次，即为中奖。例：投注方案：四重号8，单号1开奖号码：18888（顺序不限）即为中奖。",
                    "play_id_1606@3":
                        "选择1个四重号码和1个单号号码组成一注，所选的单号存在于开奖号码中，且所选四重号码在开奖号码中出现了4次，即为中奖。例：投注方案：四重号8，单号1开奖号码：18888（顺序不限）即为中奖。",
                    "play_id_1607@1":
                        "至少选择4个号码投注，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：0568*（顺序不限）即为中奖。",
                    "play_id_1607@3":
                        "至少选择4个号码投注，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：0568*（顺序不限）即为中奖。",
                    "play_id_1608@1":
                        "至少选择1个二重号码和2个单号号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：8806*（顺序不限）即为中奖。",
                    "play_id_1608@3":
                        "至少选择1个二重号码和2个单号号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：8806*（顺序不限）即为中奖。",
                    "play_id_1609@1":
                        "至少选择2个二重号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：2288*（顺序不限）即为中奖。",
                    "play_id_1609@3":
                        "至少选择2个二重号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：2288*（顺序不限）即为中奖。",
                    "play_id_1610@1":
                        "至少选择1个三重号码和1个单号号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：8882*（顺序不限）即为中奖。",
                    "play_id_1610@3":
                        "至少选择1个三重号码和1个单号号码，竞猜开奖号码的前四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：8882*（顺序不限）即为中奖。",
                    "play_id_1611@1":
                        "至少选择4个号码投注，竞猜开奖号码的后4位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：*0568（顺序不限）即为中奖。",
                    "play_id_1611@2":
                        "至少选择4个号码投注，竞猜开奖号码的后4位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：*0568（顺序不限）即为中奖。",
                    "play_id_1611@3":
                        "至少选择4个号码投注，竞猜开奖号码的后4位，号码一致顺序不限，即为中奖。例：投注方案：0568开奖号码：*0568（顺序不限）即为中奖。",
                    "play_id_1612@1":
                        "至少选择1个二重号码和2个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：*8806（顺序不限）即为中奖。",
                    "play_id_1612@2":
                        "至少选择1个二重号码和2个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：*8806（顺序不限）即为中奖。",
                    "play_id_1612@3":
                        "至少选择1个二重号码和2个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号8，单号06开奖号码：*8806（顺序不限）即为中奖。",
                    "play_id_1613@1":
                        "至少选择2个二重号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：*2288（顺序不限）即为中奖。",
                    "play_id_1613@2":
                        "至少选择2个二重号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：*2288（顺序不限）即为中奖。",
                    "play_id_1613@3":
                        "至少选择2个二重号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：二重号28开奖号码：*2288（顺序不限）即为中奖。",
                    "play_id_1614@1":
                        "至少选择1个三重号码和1个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：*8882（顺序不限）即为中奖。",
                    "play_id_1614@2":
                        "至少选择1个三重号码和1个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：*8882（顺序不限）即为中奖。",
                    "play_id_1614@3":
                        "至少选择1个三重号码和1个单号号码，竞猜开奖号码的后四位，号码一致顺序不限，即为中奖。例：投注方案：三重号8，单号2中奖号码：*8882（顺序不限）即为中奖。",
                    "play_id_1732@1":
                        "从冠军、亚军投注的两个号码与开奖号码中的前2个号码相同且顺序一致，视为中奖。<br />如：投注方案01、02，开奖号码：01、02********，即中猜前二。",
                    "play_id_1732@3":
                        "从冠军、亚军投注的两个号码与开奖号码中的前2个号码相同且顺序一致，视为中奖。<br />如：投注方案01、02，开奖号码：01、02********，即中猜前二。",
                    "play_id_1733@1":
                        "从冠军、亚军、季军投注的三个号码与开奖号码中的前3个号码相同且顺序一致，视为中奖。<br />如：冠军、亚军、季军位买 01、02、03，开奖号码：冠军、亚军、季军开01、02、03*******，即中猜前三。",
                    "play_id_1733@3":
                        "从冠军、亚军、季军投注的三个号码与开奖号码中的前3个号码相同且顺序一致，视为中奖。<br />如：冠军、亚军、季军位买 01、02、03，开奖号码：冠军、亚军、季军开01、02、03*******，即中猜前三。",
                    "play_id_1734@1":
                        "从冠军、亚军、季军、第四名中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。<br />如：投注01、02、03、04，开奖号码：01、02、03、04 ******，即中猜前四。",
                    "play_id_1734@3":
                        "从冠军、亚军、季军、第四名中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。<br />如：投注01、02、03、04，开奖号码：01、02、03、04 ******，即中猜前四。",
                    "play_id_1735@1":
                        "从冠军、亚军、季军、第四名、第五名中选择一个5位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。<br />如：冠军、亚军、季军、第四名、第五名买01、02、03、04、05，开奖号码：01、02、03、04、05*****，即中猜前五。",
                    "play_id_1735@3":
                        "从冠军、亚军、季军、第四名、第五名中选择一个5位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。<br />如：冠军、亚军、季军、第四名、第五名买01、02、03、04、05，开奖号码：01、02、03、04、05*****，即中猜前五。",
                    "play_id_1738@1":
                        "从万位、千位上选择一个形态组成一注，万位号码大于千位号码为龙，万位号码小于千位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：64*** ；即中万千玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注万千玩法虎双，开奖号码为98***，则8为虎双中奖。",
                    "play_id_1738@3":
                        "从万位、千位上选择一个形态组成一注，万位号码大于千位号码为龙，万位号码小于千位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：64*** ；即中万千玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注万千玩法虎双，开奖号码为98***，则8为虎双中奖。",
                    "play_id_1739@1":
                        "从万位、百位上选择一个形态组成一注。万位号码大于百位号码为龙，万位号码小于百位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：6*4** ；即中万百玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注万百玩法虎双，开奖号码为9*8**，则8为虎双中奖。",
                    "play_id_1739@3":
                        "从万位、百位上选择一个形态组成一注。万位号码大于百位号码为龙，万位号码小于百位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：6*4** ；即中万百玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注万百玩法虎双，开奖号码为9*8**，则8为虎双中奖。",
                    "play_id_1740@1":
                        "从万位、十位上选择一个形态组成一注。万位号码大于十位号码为龙，万位号码小于十位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：6**4* ；即中万十玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注万十玩法虎双，开奖号码为9**8*，则8为虎双中奖。",
                    "play_id_1740@3":
                        "从万位、十位上选择一个形态组成一注。万位号码大于十位号码为龙，万位号码小于十位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：6**4* ；即中万十玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注万十玩法虎双，开奖号码为9**8*，则8为虎双中奖。",
                    "play_id_1741@1":
                        "从万位、个位上选择一个形态组成一注。万位号码大于个位号码为龙，万位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：6***4 ；即中万个玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注万个玩法虎双，开奖号码为9***8，则8为虎双中奖。",
                    "play_id_1741@3":
                        "从万位、个位上选择一个形态组成一注。万位号码大于个位号码为龙，万位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：6***4 ；即中万个玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注万个玩法虎双，开奖号码为9***8，则8为虎双中奖。",
                    "play_id_1742@1":
                        "从千位、百位上选择一个形态组成一注。千位号码大于百位号码为龙，千位号码小于百位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：*64** ；即中千百玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注千百玩法虎双，开奖号码为*98**，则8为虎双中奖。",
                    "play_id_1742@3":
                        "从千位、百位上选择一个形态组成一注。千位号码大于百位号码为龙，千位号码小于百位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：*64** ；即中千百玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注千百玩法虎双，开奖号码为*98**，则8为虎双中奖。",
                    "play_id_1743@1":
                        "从千位、十位上选择一个形态组成一注。千位号码大于十位号码为龙，千位号码小于十位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：*6*4* ；即中千十玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注千十玩法虎双，开奖号码为*9*8*，则8为虎双中奖。",
                    "play_id_1743@3":
                        "从千位、十位上选择一个形态组成一注。千位号码大于十位号码为龙，千位号码小于十位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：*6*4* ；即中千十玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注千十玩法虎双，开奖号码为*9*8*，则8为虎双中奖。",
                    "play_id_1744@1":
                        "从千位、个位上选择一个形态组成一注。千位号码大于个位号码为龙，千位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：*6**4 ；即中千个玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注千个玩法虎双，开奖号码为*9**8，则8为虎双中奖。",
                    "play_id_1744@3":
                        "从千位、个位上选择一个形态组成一注。千位号码大于个位号码为龙，千位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：*6**4 ；即中千个玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注千个玩法虎双，开奖号码为*9**8，则8为虎双中奖。",
                    "play_id_1745@1":
                        "从百位、十位上选择一个形态组成一注。百位号码大于十位号码为龙，百位号码小于十位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：**64* ；即中百十玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注百十玩法虎双，开奖号码为**98*，则8为虎双中奖。",
                    "play_id_1745@3":
                        "从百位、十位上选择一个形态组成一注。百位号码大于十位号码为龙，百位号码小于十位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：**64* ；即中百十玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注百十玩法虎双，开奖号码为**98*，则8为虎双中奖。",
                    "play_id_1746@1":
                        "从百位、个位上选择一个形态组成一注。百位号码大于个位号码为龙，百位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：**6*4 ；即中百个玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注百个玩法虎双，开奖号码为**9*8，则8为虎双中奖。",
                    "play_id_1746@3":
                        "从百位、个位上选择一个形态组成一注。百位号码大于个位号码为龙，百位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：**6*4 ；即中百个玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注百个玩法虎双，开奖号码为**9*8，则8为虎双中奖。",
                    "play_id_1747@1":
                        "从十位、个位上选择一个形态组成一注。十位号码大于个位号码为龙，十位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：***64 ；即中十个玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注十个玩法虎双，开奖号码为***98，则8为虎双中奖。",
                    "play_id_1747@3":
                        "从十位、个位上选择一个形态组成一注。十位号码大于个位号码为龙，十位号码小于个位号码为虎，号码相同则为和。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注号码：龙；开奖号码：***64 ；即中十个玩法龙。 <br /> 投注单双，开奖号码对应所选的玩法第一位为龙第二位为虎，<br /> 如 投注十个玩法虎双，开奖号码为***98，则8为虎双中奖。",
                    "play_id_2665@1":
                        "根据万位、千位号码数值比大小，万位号码大于千位号码为龙，万位号码小于千位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：53***；开奖号码万位大于千位：龙，即中奖。",
                    "play_id_2665@3":
                        "根据万位、千位号码数值比大小，万位号码大于千位号码为龙，万位号码小于千位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：53***；开奖号码万位大于千位：龙，即中奖。",
                    "play_id_2666@1":
                        "根据万位、百位号码数值比大小，万位号码大于百位号码为龙，万位号码小于百位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：5*3**；开奖号码万位大于百位：龙，即中奖。",
                    "play_id_2666@3":
                        "根据万位、百位号码数值比大小，万位号码大于百位号码为龙，万位号码小于百位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：5*3**；开奖号码万位大于百位：龙，即中奖。",
                    "play_id_2667@1":
                        "根据万位、十位号码数值比大小，万位号码大于十位号码为龙，万位号码小于十位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：5**3*；开奖号码万位大于十位：龙，即中奖。",
                    "play_id_2667@3":
                        "根据万位、十位号码数值比大小，万位号码大于十位号码为龙，万位号码小于十位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：5**3*；开奖号码万位大于十位：龙，即中奖。",
                    "play_id_2668@1":
                        "根据万位、个位号码数值比大小，万位号码大于个位号码为龙，万位号码小于个位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：5***3；开奖号码万位大于个位：龙，即中奖。",
                    "play_id_2668@3":
                        "根据万位、个位号码数值比大小，万位号码大于个位号码为龙，万位号码小于个位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：5***3；开奖号码万位大于个位：龙，即中奖。",
                    "play_id_2669@1":
                        "根据千位、百位号码数值比大小，千位号码大于百位号码为龙，千位号码小于百位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：*53**；开奖号码千位大于百位：龙，即中奖。",
                    "play_id_2669@3":
                        "根据千位、百位号码数值比大小，千位号码大于百位号码为龙，千位号码小于百位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：*53**；开奖号码千位大于百位：龙，即中奖。",
                    "play_id_2670@1":
                        "根据千位、十位号码数值比大小，千位号码大于十位号码为龙，千位号码小于十位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：*5*3*；开奖号码千位大于十位：龙，即中奖。",
                    "play_id_2670@3":
                        "根据千位、十位号码数值比大小，千位号码大于十位号码为龙，千位号码小于十位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：*5*3*；开奖号码千位大于十位：龙，即中奖。",
                    "play_id_2671@1":
                        "根据千位、个位号码数值比大小，千位号码大于个位号码为龙，千位号码小于个位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：*5**3；开奖号码千位大于个位：龙，即中奖。",
                    "play_id_2671@3":
                        "根据千位、个位号码数值比大小，千位号码大于个位号码为龙，千位号码小于个位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：*5**3；开奖号码千位大于个位：龙，即中奖。",
                    "play_id_2672@1":
                        "根据百位、十位号码数值比大小，百位号码大于十位号码为龙，百位号码小于十位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：**53*；开奖号码百位大于十位：龙，即中奖。",
                    "play_id_2672@3":
                        "根据百位、十位号码数值比大小，百位号码大于十位号码为龙，百位号码小于十位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：**53*；开奖号码百位大于十位：龙，即中奖。",
                    "play_id_2673@1":
                        "根据百位、个位号码数值比大小，百位号码大于个位号码为龙，百位号码小于个位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：**5*3；开奖号码百位大于个位：龙，即中奖。",
                    "play_id_2673@3":
                        "根据百位、个位号码数值比大小，百位号码大于个位号码为龙，百位号码小于个位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：**5*3；开奖号码百位大于个位：龙，即中奖。",
                    "play_id_2674@1":
                        "根据十位、个位号码数值比大小，十位号码大于个位号码为龙，十位号码小于个位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：***53；开奖号码十位大于个位：龙，即中奖。",
                    "play_id_2674@3":
                        "根据十位、个位号码数值比大小，十位号码大于个位号码为龙，十位号码小于个位号码为虎，号码相同则和局撤单。所选形态与开奖号码形态一致，即为中奖。 <br />如：投注方案：龙；开奖号码：***53；开奖号码十位大于个位：龙，即中奖。",
                    "play_id_1748@1":
                        "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位、个位中包含所选号码，即为中奖。如：选择一码不定位5，开出*5***、**5**、***5*、****5即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_1748@3":
                        "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位、个位中包含所选号码，即为中奖。如：选择一码不定位5，开出*5***、**5**、***5*、****5即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_1749@1":
                        "从0-9中选择2个号码，每注由2个号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。如：选择二码不定位4、5，开奖号码为*4*5、*45**、***45、**5*4、***54...即为中奖。",
                    "play_id_1749@3":
                        "从0-9中选择2个号码，每注由2个号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。如：选择二码不定位4、5，开奖号码为*4*5、*45**、***45、**5*4、***54...即为中奖。",
                    "play_id_1750@1":
                        "从0-9中选择1个号码，每注由1个号码组成，开奖号码的万位、千位、百位、十位、个位中包含所选的号码，即为中奖。如：选择一码不定位5，开出5****、*5***、**5**、***5*、****5即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_1750@3":
                        "从0-9中选择1个号码，每注由1个号码组成，开奖号码的万位、千位、百位、十位、个位中包含所选的号码，即为中奖。如：选择一码不定位5，开出5****、*5***、**5**、***5*、****5即为中奖。若开奖结果出现重复数字，则只会派奖一次不累加。",
                    "play_id_1751@1":
                        "从0-9中选择2个号码，每注由2个号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。如：选择二码不定位4、5，开奖号码为54*、4*5、*45、*5*4、***54...即为中奖。",
                    "play_id_1751@3":
                        "从0-9中选择2个号码，每注由2个号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。如：选择二码不定位4、5，开奖号码为54*、4*5、*45、*5*4、***54...即为中奖。",
                    "play_id_1752@1":
                        "从0-9中选择3个号码，每注由3个号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的3个号码，即为中奖。如：选择三码不定位3、4、5，开奖号码为543*、4*5*3、**345、3*5*4、*3*54...即为中奖。",
                    "play_id_1752@3":
                        "从0-9中选择3个号码，每注由3个号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的3个号码，即为中奖。如：选择三码不定位3、4、5，开奖号码为543*、4*5*3、**345、3*5*4、*3*54...即为中奖。",
                    "play_id_2029@1":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。",
                    "play_id_2029@3":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。",
                    "play_id_2030@1":
                        "从0-9中选择3个号码，每注由3个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的3个号码，即为中奖。",
                    "play_id_2030@3":
                        "从0-9中选择3个号码，每注由3个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的3个号码，即为中奖。",
                    "play_id_1917@1":
                        "至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中对应奖金。",
                    "play_id_1919@1":
                        "对相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖。",
                    "play_id_1920@1": "选择三同号通选进行投注，任意号码开出为豹子即中奖。",
                    "play_id_1922@1": "从1～6中任选3个或多个不同号码，所选号码与开奖号码的3个号码相同即中奖。",
                    "play_id_1924@1": "对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖。",
                    "play_id_1926@1":
                        "选择1对相同号码（11,22,33,44,55,66）和1个不同号码(1,2,3,4,5,6)投注，选号与奖号相同（顺序不限），即为中奖。",
                    "play_id_1927@1":
                        "从11～66中任选1个或多个号码，选号与奖号（包含11～66，不限顺序）相同，即为中奖 (不包含豹子号)。",
                    "play_id_1929@1": "从1～6中任选2个或多个不同号码，所选号码与开奖号码任意2个号码相同，即中奖。",
                    "play_id_1931@1":
                        "大（11-18）小(3-10) 单（和为单数） 双（和为双数），所选状态与开奖号码3个号码总和值状态相同，即中奖。",
                    "play_id_2236@1":
                        "大单 （11、13、15、17 ）小单（3 、5、 7 、9 ）小双 （4 、6、 8、 10） 大双（12、14、 16 、18 ）,所选状态与开奖号码3个号码总和值状态相同，即中奖。",
                    "play_id_2240@1":
                        "至少选择一个号码投注，投注号码与开奖号码的任意一个号码相同（顺序不限），即视为中奖。出现2个号码以上只派奖1次。※举例：投注者购买号码2，，当期开奖号码如为：121，则视为中奖。",
                    "play_id_2241@1":
                        "至少选择一个号码投注，投注号码与开奖号码的任意一个号码不相同，即视为中奖。※举例：投注者购买号码5，当期开奖号码如为：234，则视为中奖。",
                    "play_id_2272@1": "开奖号码的三位数字都相同(111,222,333,444,555,666)，即中奖。",
                    "play_id_2273@1": "开奖号码的三位数字不分顺序都相连(123,234,345,456)，即中奖。",
                    "play_id_2274@1": "开奖号码的三位数字任意两位数字相同搭配一位不同数字(不含豹子），即中奖。",
                    "play_id_2275@1": "开奖号码的三位数字不分顺序任意两位数字相连且不是全顺及对子，即中奖。",
                    "play_id_2276@1": "开奖号码的三位数字不包括豹子、对子、顺子、半顺的所有开奖号码，即中奖。",
                    "play_id_2277@1": "开奖号码的三位数字任意两位数字相同搭配一位不同数字(不含豹子），即中奖。",
                    "play_id_2278@1": "开奖号码的三位数字都不同，不是对子跟豹子即中奖。",
                    "play_id_1917@3":
                        "至少选择1个和值（3个号码之和）进行投注，所选和值与开奖的3个号码的和值相同即中对应奖金。",
                    "play_id_1919@3":
                        "对相同的三个号码（111、222、333、444、555、666）中的任意一个进行投注，所选号码开出即中奖。",
                    "play_id_1920@3": "选择三同号通选进行投注，任意号码开出为豹子即中奖。",
                    "play_id_1922@3": "从1～6中任选3个或多个不同号码，所选号码与开奖号码的3个号码相同即中奖。",
                    "play_id_1924@3": "对所有3个相连的号码（123、234、345、456）进行投注，任意号码开出即中奖。",
                    "play_id_1926@3":
                        "选择1对相同号码（11,22,33,44,55,66）和1个不同号码(1,2,3,4,5,6)投注，选号与奖号相同（顺序不限），即为中奖。",
                    "play_id_1927@3":
                        "从11～66中任选1个或多个号码，选号与奖号（包含11～66，不限顺序）相同，即为中奖 (不包含豹子号)。",
                    "play_id_1929@3": "从1～6中任选2个或多个不同号码，所选号码与开奖号码任意2个号码相同，即中奖。",
                    "play_id_1931@3":
                        "大（11-18）小(3-10) 单（和为单数） 双（和为双数），所选状态与开奖号码3个号码总和值状态相同，即中奖。",
                    "play_id_2240@3":
                        "至少选择一个号码投注，投注号码与开奖号码的任意一个号码相同（顺序不限），即视为中奖。出现2个号码以上只派奖1次。※举例：投注者购买号码2，，当期开奖号码如为：121，则视为中奖。",
                    "play_id_2241@3":
                        "至少选择一个号码投注，投注号码与开奖号码的任意一个号码不相同，即视为中奖。※举例：投注者购买号码5，当期开奖号码如为：234，则视为中奖。",
                    "play_id_2272@3": "开奖号码的三位数字都相同(111,222,333,444,555,666)，即中奖。",
                    "play_id_2273@3": "开奖号码的三位数字不分顺序都相连(123,234,345,456)，即中奖。",
                    "play_id_2274@3": "开奖号码的三位数字任意两位数字相同搭配一位不同数字(不含豹子），即中奖。",
                    "play_id_2275@3": "开奖号码的三位数字不分顺序任意两位数字相连且不是全顺及对子，即中奖。",
                    "play_id_2276@3": "开奖号码的三位数字不包括豹子、对子、顺子、半顺的所有开奖号码，即中奖。",
                    "play_id_2277@3": "开奖号码的三位数字任意两位数字相同搭配一位不同数字(不含豹子），即中奖。",
                    "play_id_2278@3": "开奖号码的三位数字都不同，不是对子跟豹子即中奖。",
                    "play_id_2014@1":
                        "从千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2014@2":
                        "从千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2071@1":
                        "从总和大、小、单、双中任意选择1个号码形态组成一注，只要所选形态与开奖号码的5位数号码总和（大于等于23：总和大、小于等于22：总和小、单数：总和单、双数：总和双）形态相同，即为中奖。如：投注：总和大；开奖号码：16568，开奖号码的总和26，即中总和大",
                    "play_id_2071@3":
                        "从总和大、小、单、双中任意选择1个号码形态组成一注，只要所选形态与开奖号码的5位数号码总和（大于等于23：总和大、小于等于22：总和小、单数：总和单、双数：总和双）形态相同，即为中奖。如：投注：总和大；开奖号码：16568，开奖号码的总和26，即中总和大",
                    "play_id_2072@1":
                        "从总和大单、小单、大双、小双中任意选择1个号码形态组成一注，只要所选形态与开奖号码的5位数号码总和（大单：23 25 27 29 31 33 35 37 39 41 43 45、小单：1 3 5 7 9 11 13 15 17 19 21、大双：24 26 28 30 32 34 36 38 40 42 44、小双：0 2 4 6 8 10 12 14 16 18 20 22）形态相同，即为中奖。如：投注：总和大双；开奖号码：16568，开奖号码的总和26，即中总和大双",
                    "play_id_2072@3":
                        "从总和大单、小单、大双、小双中任意选择1个号码形态组成一注，只要所选形态与开奖号码的5位数号码总和（大单：23 25 27 29 31 33 35 37 39 41 43 45、小单：1 3 5 7 9 11 13 15 17 19 21、大双：24 26 28 30 32 34 36 38 40 42 44、小双：0 2 4 6 8 10 12 14 16 18 20 22）形态相同，即为中奖。如：投注：总和大双；开奖号码：16568，开奖号码的总和26，即中总和大双",
                    "play_id_2073@1":
                        "从0-9中任意选择1个包胆号码，开奖号码的万位、千位中任意1位包含所选的包胆号码相同（不含对子号），即为中奖。 例如：投注8，开奖号码前二位：出现1个8（不包括2个8），即中前二组选。",
                    "play_id_2073@3":
                        "从0-9中任意选择1个包胆号码，开奖号码的万位、千位中任意1位包含所选的包胆号码相同（不含对子号），即为中奖。 例如：投注8，开奖号码前二位：出现1个8（不包括2个8），即中前二组选。",
                    "play_id_2074@1":
                        "从0-9中任意选择1个包胆号码，开奖号码的十位、个位中任意1位包含所选的包胆号码相同（不含对子号），即为中奖。 例如：投注8，开奖号码后二位：出现1个8（不包括2个8），即中后二组选。",
                    "play_id_2074@3":
                        "从0-9中任意选择1个包胆号码，开奖号码的十位、个位中任意1位包含所选的包胆号码相同（不含对子号），即为中奖。 例如：投注8，开奖号码后二位：出现1个8（不包括2个8），即中后二组选。",
                    "play_id_2075@1":
                        "从0-9中任意选择1个包胆号码，开奖号码的万位、千位、百位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。 例如：投注3，开奖号码前三位：(1)出现3xx或者33x,即中前三组三；(2)出现3xy，即中前三组六。",
                    "play_id_2075@3":
                        "从0-9中任意选择1个包胆号码，开奖号码的万位、千位、百位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。 例如：投注3，开奖号码前三位：(1)出现3xx或者33x,即中前三组三；(2)出现3xy，即中前三组六。",
                    "play_id_2076@1":
                        "从0-9中任意选择1个包胆号码，开奖号码的千位、百位、十位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。 例如：投注3，开奖号码中三位：(1)出现3xx或者33x,即中中三组三；(2)出现3xy，即中中三组六。",
                    "play_id_2076@3":
                        "从0-9中任意选择1个包胆号码，开奖号码的千位、百位、十位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。 例如：投注3，开奖号码中三位：(1)出现3xx或者33x,即中中三组三；(2)出现3xy，即中中三组六。",
                    "play_id_2077@1":
                        "从0-9中任意选择1个包胆号码，开奖号码的百位、十位、个位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。 例如：投注3，开奖号码后三位：(1)出现3xx或者33x,即中后三组三；(2)出现3xy，即中后三组六。",
                    "play_id_2077@3":
                        "从0-9中任意选择1个包胆号码，开奖号码的百位、十位、个位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。 例如：投注3，开奖号码后三位：(1)出现3xx或者33x,即中后三组三；(2)出现3xy，即中后三组六。",
                    "play_id_2078@1":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的前2位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码前2位：(1)开出的2个数字包括0,8即可中前二直选跨度;(2)开出的2个数字包括1,9即可中前二直选跨度。",
                    "play_id_2078@3":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的前2位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码前2位：(1)开出的2个数字包括0,8即可中前二直选跨度;(2)开出的2个数字包括1,9即可中前二直选跨度。",
                    "play_id_2079@1":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的后2位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码后2位：(1)开出的2个数字包括0,8即可中后二直选跨度;(2)开出的2个数字包括1,9即可中后二直选跨度。",
                    "play_id_2079@3":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的后2位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码后2位：(1)开出的2个数字包括0,8即可中后二直选跨度;(2)开出的2个数字包括1,9即可中后二直选跨度。",
                    "play_id_2080@1":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的前3位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码前三位：(1)开出的三个数字包括0,8,x，其中x不为9，即可中前三直选跨度;(2)开出的三个数字包括1,9,x，其中x不为0，即可中前三直选跨度。",
                    "play_id_2080@3":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的前3位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码前三位：(1)开出的三个数字包括0,8,x，其中x不为9，即可中前三直选跨度;(2)开出的三个数字包括1,9,x，其中x不为0，即可中前三直选跨度。",
                    "play_id_2081@1":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的中间3位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码中三位：(1)开出的三个数字包括0,8,x，其中x不为9，即可中中三直选跨度;(2)开出的三个数字包括1,9,x，其中x不为0，即可中中三直选跨度。",
                    "play_id_2081@3":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的中间3位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码中三位：(1)开出的三个数字包括0,8,x，其中x不为9，即可中中三直选跨度;(2)开出的三个数字包括1,9,x，其中x不为0，即可中中三直选跨度。",
                    "play_id_2082@1":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的后3位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码后三位：(1)开出的三个数字包括0,8,x，其中x不为9，即可中后三直选跨度;(2)开出的三个数字包括1,9,x，其中x不为0，即可中后三直选跨度。",
                    "play_id_2082@3":
                        "从0-9中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的后3位最大与最小数字相减之差，即为中奖。 如 ：投注方案：跨度8；开奖号码后三位：(1)开出的三个数字包括0,8,x，其中x不为9，即可中后三直选跨度;(2)开出的三个数字包括1,9,x，其中x不为0，即可中后三直选跨度。",
                    "play_id_2083@1":
                        "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位、十位中包含所选号码，即为中奖。如：投注方案：1；开奖号码前四位：至少出现1个1，即中前四星一码不定位。",
                    "play_id_2083@3":
                        "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位、十位中包含所选号码，即为中奖。如：投注方案：1；开奖号码前四位：至少出现1个1，即中前四星一码不定位。",
                    "play_id_2084@1":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位、十位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码前四位：至少出现1和2各1个，即中前四星二码不定位。",
                    "play_id_2084@3":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位、十位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码前四位：至少出现1和2各1个，即中前四星二码不定位。",
                    "play_id_2085@1":
                        "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位、个位中包含所选号码，即为中奖。如：投注方案：1；开奖号码后四位：至少出现1个1，即中后四星一码不定位。",
                    "play_id_2085@3":
                        "从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位、个位中包含所选号码，即为中奖。如：投注方案：1；开奖号码后四位：至少出现1个1，即中后四星一码不定位。",
                    "play_id_2086@1":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码后四位：至少出现1和2各1个，即中后四星二码不定位。",
                    "play_id_2086@3":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码后四位：至少出现1和2各1个，即中后四星二码不定位。",
                    "play_id_2087@1":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码前三位：至少出现1和2各1个，即中前三二码不定位。",
                    "play_id_2087@3":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码前三位：至少出现1和2各1个，即中前三二码不定位。",
                    "play_id_2088@1":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码中三位：至少出现1和2各1个，即中中三二码不定位。",
                    "play_id_2088@3":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码中三位：至少出现1和2各1个，即中中三二码不定位。",
                    "play_id_2089@1":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的百位、十位、个位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码后三位：至少出现1和2各1个，即中后三二码不定位。",
                    "play_id_2089@3":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的百位、十位、个位中同时包含所选的2个号码，即为中奖。如：投注方案：1,2；开奖号码后三位：至少出现1和2各1个，即中后三二码不定位。",
                    "play_id_2113@1":
                        "豹子：中奖号码的百位千位万位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位千位万位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的百位千位万位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位千位万位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的百位千位万位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖百位千位万位号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。半顺：中奖号码的百位千位万位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。",
                    "play_id_2113@3":
                        "豹子：中奖号码的百位千位万位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位千位万位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的百位千位万位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位千位万位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的百位千位万位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。----如中奖百位千位万位号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。半顺：中奖号码的百位千位万位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连）----如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。",
                    "play_id_2114@1":
                        "豹子：中奖号码的百位千位万位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位千位万位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的百位千位万位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位千位万位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的百位千位万位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。",
                    "play_id_2114@3":
                        "豹子：中奖号码的百位千位万位数字都相同。----如中奖号码为000、111、999等，中奖号码的百位千位万位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的百位千位万位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码百位千位万位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的百位千位万位任意两位数字相同。（不包括豹子）----如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。",
                    "play_id_2115@1":
                        "豹子：中奖号码的十位百位千位数字都相同。如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的十位百位千位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖十位百位千位号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。半顺：中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连）如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。",
                    "play_id_2115@3":
                        "豹子：中奖号码的十位百位千位数字都相同。如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的十位百位千位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖十位百位千位号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。半顺：中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连）如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。",
                    "play_id_2116@1":
                        "豹子：中奖号码的十位百位千位数字都相同。如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的十位百位千位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。",
                    "play_id_2116@3":
                        "豹子：中奖号码的十位百位千位数字都相同。如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的十位百位千位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。",
                    "play_id_2117@1":
                        "豹子：中奖号码的个位十位百位数字都相同。如中奖号码为000、111、999等，中奖号码的个位十位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的个位十位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码个位十位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的个位十位百位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖个位十位百位号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。半顺：中奖号码的个位十位百位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连）如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。",
                    "play_id_2117@3":
                        "豹子：中奖号码的个位十位百位数字都相同。如中奖号码为000、111、999等，中奖号码的个位十位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的个位十位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码个位十位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的个位十位百位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖个位十位百位号码为157，中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。半顺：中奖号码的个位十位百位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连）如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。",
                    "play_id_2118@1":
                        "豹子：中奖号码的个位十位百位数字都相同。如中奖号码为000、111、999等，中奖号码的个位十位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的个位十位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码个位十位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的个位十位百位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。",
                    "play_id_2118@3":
                        "豹子：中奖号码的个位十位百位数字都相同。如中奖号码为000、111、999等，中奖号码的个位十位百位数字相同，则投注豹子者视为中奖，其它视为不中奖。顺子：中奖号码的个位十位百位数字都相连，不分顺序。（数字9、0、1相连）----如中奖号码为123、901、321、546等，中奖号码个位十位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。对子：中奖号码的个位十位百位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。",
                    "play_id_2246@1":
                        "从千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2246@3":
                        "从千位、百位、十位、个位任意位置上至少选择1个号码投注，所选号码与相同位置上的开奖号码一致，即中奖。",
                    "play_id_2249@1":
                        "从千位、百位、十位、个位中至少两位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择千位号码为1，百位号码为2，开奖号码为12**，即为中奖。",
                    "play_id_2249@3":
                        "从千位、百位、十位、个位中至少两位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择千位号码为1，百位号码为2，开奖号码为12**，即为中奖。",
                    "play_id_2250@1":
                        "从千位、百位、十位、个位中任意勾选两个位置，手动输入一个两位数号码组成一注，所选两个位置和输入的号码都与开奖号码相同，且顺序一致，即为中奖。如：勾选位置千位、个位，输入号码12； 开奖号码：1**2，即为中奖。",
                    "play_id_2250@3":
                        "从千位、百位、十位、个位中任意勾选两个位置，手动输入一个两位数号码组成一注，所选两个位置和输入的号码都与开奖号码相同，且顺序一致，即为中奖。如：勾选位置千位、个位，输入号码12； 开奖号码：1**2，即为中奖。",
                    "play_id_2253@1":
                        "从千位、百位、十位、个位中至少三位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择千位号码为1，百位号码为2，十位号码为3，开奖号码为123*，即为中奖。",
                    "play_id_2253@3":
                        "从千位、百位、十位、个位中至少三位上各选1个号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。 如：选择千位号码为1，百位号码为2，十位号码为3，开奖号码为123*，即为中奖。",
                    "play_id_2254@1":
                        "从千位、百位、十位、个位中任意勾选三个位置，在这三个位上至少各选1个号码组成一注，所选三个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。如：勾选位置千位、百位、个位，输入号码152；开奖号码：15*2，即为中奖。",
                    "play_id_2254@3":
                        "从千位、百位、十位、个位中任意勾选三个位置，在这三个位上至少各选1个号码组成一注，所选三个位置上的开奖号码与所选号码完全相同，且顺序一致，即为中奖。如：勾选位置千位、百位、个位，输入号码152；开奖号码：15*2，即为中奖。",
                    "play_id_2257@1":
                        "从千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为1234，即为中奖。",
                    "play_id_2257@3":
                        "从千位、百位、十位、个位中分别选择1个或多个号码投注，号码和顺序都相同，即为中奖。 如：千位选择1，百位选择2，十位选择3，个位选择4，开奖号码为1234，即为中奖。",
                    "play_id_2258@1":
                        '手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择1234，开奖号码为"1234"，即为中奖。',
                    "play_id_2258@3":
                        '手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。如：选择1234，开奖号码为"1234"，即为中奖。',
                    "play_id_2261@1":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖；重号只派发一次。投注方案：1,2；开奖号码的四位：不分位置至少出现1和2各1个，即中二字观不定位。",
                    "play_id_2261@3":
                        "从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖；重号只派发一次。投注方案：1,2；开奖号码的四位：不分位置至少出现1和2各1个，即中二字观不定位。",
                    "play_id_2264@1":
                        "从0-9中选择3个号码，每注由3个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的3个号码，无论顺序先后是否颠倒，都算中奖。开奖号码如果有重复号码，只算一个中奖。投注方案：1,2,3；开奖号码的四位包含下列任一组合即中奖：123x,231x,312x,1x23,2x31,3x12,12x3,23x1,31x2,x123,x231,x312,132x,213x,321x,1x32,2x13,3x21,13x2,21x3,32x1,x132,x213,x321",
                    "play_id_2264@3":
                        "从0-9中选择3个号码，每注由3个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的3个号码，无论顺序先后是否颠倒，都算中奖。开奖号码如果有重复号码，只算一个中奖。投注方案：1,2,3；开奖号码的四位包含下列任一组合即中奖：123x,231x,312x,1x23,2x31,3x12,12x3,23x1,31x2,x123,x231,x312,132x,213x,321x,1x32,2x13,3x21,13x2,21x3,32x1,x132,x213,x321",
                    "play_id_2266@1":
                        "从0-5中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的3位最大与最小数字相减之差，即为中奖。如 ：投注方案：跨度5；开奖号码为：146，最大值为6最小值为1，跨度差为6减1等于5，即可中奖。",
                    "play_id_2266@3":
                        "从0-5中选择1个号码或1个以上号码进行投注，当所选号码等于开奖号码的3位最大与最小数字相减之差，即为中奖。如 ：投注方案：跨度5；开奖号码为：146，最大值为6最小值为1，跨度差为6减1等于5，即可中奖。",
                    "play_id_2572@1":
                        " 分别从胆码与拖码的01-11号码中选择1个号码做为胆码和至少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05，拖码选择08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2573@1":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多2个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05，拖码选择08 03，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2574@1":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多3个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05，拖码选择08 03 11，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2575@1":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多4个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05，拖码选择08 03 11 04，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2576@1":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多5个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05 06，拖码选择08 03 11 04，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2577@1":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多6个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05 06 07，拖码选择08 03 11 04，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2578@1":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多7个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05 06 07 09，拖码选择08 03 11 04，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2572@3":
                        " 分别从胆码与拖码的01-11号码中选择1个号码做为胆码和至少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05，拖码选择08，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2573@3":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多2个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05，拖码选择08 03，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2574@3":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多3个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05，拖码选择08 03 11，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2575@3":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多4个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05，拖码选择08 03 11 04，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2576@3":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多5个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05 06，拖码选择08 03 11 04，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2577@3":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多6个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05 06 07，拖码选择08 03 11 04，开奖号码为08 04 11 05 03，即为中奖。",
                    "play_id_2578@3":
                        "分别从胆码与拖码的01-11号码中选择至少1个最多7个号码做为胆码和最少1个拖码，胆码不可与拖码相同。只要开奖号码五位中包含所选择投注组合即中奖。如：胆码选择05 06 07 09，拖码选择08 03 11 04，开奖号码为08 04 11 05 03，即为中奖。",
                };
            },
            2123: function(_, e, a) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var t = u(a(3379)),
                    n = a(2146),
                    i = a(7951),
                    r = a(4909),
                    o = a(5221),
                    l = u(a(6349));
                function u(_) {
                    return _ && _.__esModule ? _ : { default: _ };
                }
                function s(_, e) {
                    var a = Object.keys(_);
                    if (Object.getOwnPropertySymbols) {
                        var t = Object.getOwnPropertySymbols(_);
                        e &&
                            (t = t.filter(function(e) {
                                return Object.getOwnPropertyDescriptor(_, e).enumerable;
                            })),
                            a.push.apply(a, t);
                    }
                    return a;
                }
                function d(_) {
                    for (var e = 1; e < arguments.length; e++) {
                        var a = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? s(Object(a), !0).forEach(function(e) {
                                  S(_, e, a[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(_, Object.getOwnPropertyDescriptors(a))
                            : s(Object(a)).forEach(function(e) {
                                  Object.defineProperty(_, e, Object.getOwnPropertyDescriptor(a, e));
                              });
                    }
                    return _;
                }
                function S(_, e, a) {
                    return (
                        e in _
                            ? Object.defineProperty(_, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
                            : (_[e] = a),
                        _
                    );
                }
                var c = {
                    playId: d(
                        d(
                            {
                                1: "定位胆",
                                2: "后二",
                                3: "后三",
                                4: "后四",
                                5: "五星",
                                6: "前二",
                                7: "前三",
                                8: "前四",
                                9: "中三",
                                10: "任选",
                                11: "趣味",
                                12: "不定位",
                                13: "一星直选",
                                14: "定位胆 ",
                                15: "后二直选",
                                16: "后二组选",
                                17: "后二分位",
                                18: "后二包点",
                                19: "后二连选",
                                20: "后二和值",
                                21: "后三直选",
                                22: "后三包点",
                                23: "后三组三",
                                24: "后三组六",
                                25: "后三混合组选",
                                26: "后三连选",
                                27: "后三直选组合",
                                28: "后三和值",
                                29: "后四直选",
                                30: "后四连选",
                                31: "五星直选",
                                32: "五星通选",
                                33: "五星连选",
                                34: "前二直选",
                                35: "前二组选",
                                36: "前二分位",
                                37: "前二包点",
                                38: "前二连选",
                                39: "前二和值",
                                40: "前三直选",
                                41: "前三包点",
                                42: "前三组三",
                                43: "前三组六",
                                44: "前三混合组选",
                                45: "前三连选",
                                46: "前三直选组合",
                                47: "前三和值",
                                48: "前四直选",
                                49: "前四连选",
                                50: "中三直选",
                                51: "中三包点",
                                52: "中三组三",
                                53: "中三组六",
                                54: "中三混合组选",
                                55: "中三连选",
                                56: "中三直选组合",
                                57: "中三和值",
                                58: "任一直选",
                                59: "任二直选",
                                60: "任三直选",
                                61: "任四直选",
                                62: "前二大小单双",
                                63: "后二大小单双",
                                64: "不定位前二组选",
                                65: "不定位前二直选",
                                66: "不定位前三组选一胆",
                                67: "不定位前三组选二码",
                                68: "不定位前三直选一码",
                                69: "不定位前三直选二码",
                                70: "不定位后二组选",
                                71: "不定位后二直选",
                                72: "不定位后三组选一胆",
                                73: "不定位后三组选二码",
                                74: "不定位后三直选一码",
                                75: "不定位后三直选二码",
                                76: "不定位中三组选一胆",
                                77: "不定位中三组选二码",
                                78: "不定位中三直选一码",
                                79: "不定位中三直选二码",
                                80: "五星直选（单式）",
                                81: "五星通选（单式）",
                                82: "五星连选（单式）",
                                83: "前四直选（单式）",
                                84: "前四连选（单式）",
                                85: "后四直选（单式）",
                                86: "后四连选（单式）",
                                87: "前三直选（单式）",
                                88: "前三连选（单式）",
                                89: "中三直选（单式）",
                                90: "中三连选（单式）",
                                91: "后三直选（单式）",
                                92: "后三连选（单式）",
                                93: "前二直选（单式）",
                                94: "前二连选（单式）",
                                95: "后二直选（单式）",
                                96: "后二连选（单式）",
                                97: "任二直选（单式）",
                                98: "任三直选（单式）",
                                99: "任四直选（单式）",
                                100: "任二直选（单式）",
                                101: "任三直选（单式）",
                                102: "任四直选（单式）",
                                103: "任五直选（单式）",
                                104: "任六直选（单式）",
                                105: "任七直选（单式）",
                                106: "任八直选（单式）",
                                107: "前三直选（单式）",
                                108: "前三组选（单式）",
                                109: "前二直选（单式）",
                                110: "前二组选（单式）",
                                111: "三星直选（单式）",
                                112: "前二直选（单式）",
                                113: "后二直选（单式）",
                                114: "P3直选（单式）",
                                115: "前二直选（单式）",
                                116: "P3后二直选（单式）",
                                117: "直选",
                                118: "组选",
                                119: "直选",
                                120: "组选",
                                121: "直选",
                                122: "组选",
                                123: "直选",
                                124: "组选",
                                125: "直选",
                                126: "组选",
                                127: "直选",
                                128: "组选",
                                129: "直选",
                                130: "组选",
                                131: "直选",
                                132: "组选",
                                133: "定位胆",
                                134: "直选",
                                135: "组选",
                                136: "大小单双",
                                137: "直选",
                                138: "复式",
                                139: "单式",
                                140: "定单双",
                                141: "猜中位",
                                142: "直选",
                                143: "组选",
                                144: "直选",
                                145: "组选",
                                146: "不定位胆",
                                147: "定位胆",
                                148: "三星",
                                149: "组选",
                                150: "直选",
                                151: "组选",
                                152: "直选",
                                153: "组选",
                                154: "不定位胆",
                                155: "大小单双",
                                156: "定位胆",
                                157: "直选",
                                158: "组选",
                                159: "不定位胆",
                                160: "直选",
                                161: "组选",
                                162: "直选",
                                163: "组选",
                                164: "大小单双",
                                165: "定位胆",
                                166: "P5后二直选（单式）",
                                168: "特殊",
                                169: "一帆风顺",
                                170: "好事成双",
                                171: "三星报喜",
                                172: "四季发财",
                                173: "组选",
                                174: "任四组选24",
                                175: "任四组选12",
                                176: "任四组选6",
                                177: "任四组选4",
                                178: "任三组选和值",
                                179: "任三组三",
                                180: "任三组六",
                                181: "任三混合组选",
                                182: "任二组选和值",
                                183: "任二组选",
                                184: "任二组选（单式）",
                                901: "任选",
                                902: "定单双",
                                903: "猜中位",
                                904: "前三",
                                905: "前二",
                                906: "不定位",
                                907: "定位胆",
                                908: "任一直选",
                                909: "任二直选",
                                910: "任三直选",
                                911: "任四直选",
                                912: "任五直选",
                                913: "任六直选",
                                914: "任七直选",
                                915: "任八直选",
                                916: "定单双",
                                917: "猜中位",
                                918: "前三直选",
                                919: "前三组选",
                                920: "前二直选",
                                921: "前二组选",
                                922: "前三不定位",
                                923: "定位胆",
                                1401: "直选",
                                1403: "不定位",
                                1404: "前二",
                                1405: "后二",
                                1406: "大小单双",
                                1407: "定位胆",
                                1408: "三星直选",
                                1409: "三星直选和值",
                                1410: "三星组三",
                                1411: "三星组六",
                                1412: "三星混合组选",
                                1413: "三星组选和值",
                                1414: "一码不定位",
                                1415: "二码不定位",
                                1416: "前二直选",
                                1417: "前二组选",
                                1418: "后二直选",
                                1419: "后二组选",
                                1420: "前二大小单双",
                                1421: "后二大小单双",
                                1422: "定位胆",
                                1423: "前三",
                                1425: "前三不定位",
                                1426: "前二",
                                1427: "后二",
                                1428: "大小单双",
                                1429: "定位胆",
                                1430: "P3直选",
                                1431: "P3直选和值",
                                1432: "P3组三",
                                1433: "P3组六",
                                1434: "P3混合组选",
                                1435: "P3组选和值",
                                1436: "P3一码不定位",
                                1437: "P3二码不定位",
                                1438: "前二直选",
                                1439: "前二组选",
                                1440: "P3后二直选",
                                1441: "P3后二组选",
                                1442: "P5后二直选",
                                1443: "P5后二组选",
                                1444: "前二大小单双",
                                1445: "P3后二大小单双",
                                1446: "P5后二大小单双",
                                1447: "定位胆",
                                1448: "猜前一",
                                1449: "猜前二",
                                1450: "猜前三",
                                1451: "猜前四",
                                1452: "猜前五",
                                1453: "定位胆",
                                1454: "猜和值",
                                1455: "大小单双",
                                1456: "龙虎斗",
                                1457: "猜前一",
                                1458: "猜前二",
                                1459: "猜前三",
                                1460: "猜前四",
                                1461: "猜前五",
                                1462: "前五定位胆",
                                1463: "后五定位胆",
                                1464: "冠亚和值",
                                1465: "冠亚季和值",
                                1466: "首尾和值",
                                1467: "前五大小单双",
                                1468: "后五大小单双",
                                1469: "冠亚和大小单双",
                                1470: "第一名VS第十名",
                                1471: "第二名VS第九名",
                                1472: "第三名VS第八名",
                                1473: "第四名VS第七名",
                                1474: "第五名VS第六名",
                                1601: "五星组选120",
                                1602: "五星组选60",
                                1603: "五星组选30",
                                1604: "五星组选20",
                                1605: "五星组选10",
                                1606: "五星组选5",
                                1607: "前四组选24",
                                1608: "前四组选12",
                                1609: "前四组选6",
                                1610: "前四组选4",
                                1611: "后四组选24",
                                1612: "后四组选12",
                                1613: "后四组选6",
                                1614: "后四组选4",
                                1732: "猜前二（单式）",
                                1733: "猜前三（单式）",
                                1734: "猜前四（单式）",
                                1735: "猜前五（单式）",
                                1736: "龙虎和",
                                1737: "趣味",
                                1738: "龙虎和-万千",
                                1739: "龙虎和-万百",
                                1740: "龙虎和-万十",
                                1741: "龙虎和-万个",
                                1742: "龙虎和-千百",
                                1743: "龙虎和-千十",
                                1744: "龙虎和-千个",
                                1745: "龙虎和-百十",
                                1746: "龙虎和-百个",
                                1747: "龙虎和-十个",
                                2663: "新龙虎",
                                2664: "趣味",
                                2665: "新龙虎-万千",
                                2666: "新龙虎-万百",
                                2667: "新龙虎-万十",
                                2668: "新龙虎-万个",
                                2669: "新龙虎-千百",
                                2670: "新龙虎-千十",
                                2671: "新龙虎-千个",
                                2672: "新龙虎-百十",
                                2673: "新龙虎-百个",
                                2674: "新龙虎-十个",
                                1748: "不定位后四直选一码",
                                1749: "不定位后四直选二码",
                                1750: "不定位五星直选一码",
                                1751: "不定位五星直选二码",
                                1752: "不定位五星直选三码",
                                2029: "不定位五星組选二胆",
                                2030: "不定位五星組选三胆",
                                99999: "快捷",
                                1753: "整合",
                                1754: "第一球",
                                1764: "第二球",
                                1774: "第三球",
                                1784: "第四球",
                                1794: "第五球",
                                1828: "两面盘",
                                1841: "龙虎斗",
                                1853: "全五中一",
                                1805: "第一球:直选",
                                1806: "第一球:大小单双",
                                1808: "第二球:直选",
                                1809: "第二球:大小单双",
                                1811: "第三球:直选",
                                1812: "第三球:大小单双",
                                1814: "第四球:直选",
                                1815: "第四球:大小单双",
                                1817: "第五球:直选",
                                1818: "第五球:大小单双",
                                1826: "总大小单双",
                                1820: "前三",
                                1822: "中三",
                                1824: "后三",
                                1843: "第一球vs第二球",
                                1844: "第一球vs第三球",
                                1845: "第一球vs第四球",
                                1827: "第一球vs第五球",
                                1847: "第二球vs第三球",
                                1848: "第二球vs第四球",
                                1849: "第二球vs第五球",
                                1850: "第三球vs第四球",
                                1851: "第三球vs第五球",
                                1852: "第四球vs第五球",
                                1855: "全五中一:直选",
                                1856: "两面",
                                1884: "猜和值",
                                1885: "冠亚和值",
                                1886: "冠亚季和值",
                                1887: "首尾和值",
                                1888: "第1-10名",
                                1899: "龙虎斗",
                                1858: "冠亚和:大小单双",
                                1860: "冠军:大小单双",
                                1861: "冠军vs第十名",
                                1863: "亚军:大小单双",
                                1864: "亚军vs第九名",
                                1866: "季军:大小单双",
                                1867: "季军vs第八名",
                                1869: "第四名:大小单双",
                                1870: "第四名vs第七名",
                                1872: "第五名:大小单双",
                                1873: "第五名vs第六名",
                                1875: "第六名:大小单双",
                                1877: "第七名:大小单双",
                                1879: "第八名:大小单双",
                                1881: "第九名:大小单双",
                                1883: "第十名:大小单双",
                                1889: "冠军",
                                1890: "亚军",
                                1891: "季军",
                                1892: "第四名",
                                1893: "第五名",
                                1894: "第六名",
                                1895: "第七名",
                                1896: "第八名",
                                1897: "第九名",
                                1898: "第十名",
                                9999: "第六-十名",
                                1905: "整合",
                                1906: "和值",
                                1907: "和值",
                                1908: "两面",
                                1909: "大小单双",
                                1910: "组合大小单双",
                                2163: "大小单双",
                                2164: "组合大小单双",
                                2165: "大小单双",
                                2166: "组合大小单双",
                                2167: "大小单双",
                                2168: "组合大小单双",
                                1911: "极值",
                                1912: "趣味",
                                1913: "色波",
                                1914: "豹子",
                                1915: "特码包三",
                                1916: "和值",
                                1917: "和值",
                                1918: "三同号",
                                1919: "三同号单选",
                                1920: "三同号通选",
                                1921: "三不同号",
                                1922: "三不同号",
                                1923: "三连号",
                                1924: "三连号通选",
                                1925: "二同号",
                                1926: "二同号单选",
                                1927: "二同号复选",
                                1928: "二不同号",
                                1929: "二不同号",
                                1930: "趣味",
                                1931: "和值大小单双",
                                2236: "和值组合大小单双",
                                2239: "单挑一骰",
                                2271: "梭哈",
                                2272: "豹子",
                                2273: "全顺",
                                2274: "对子",
                                2275: "半顺",
                                2276: "杂三",
                                2277: "二同号通选",
                                2278: "三不同号通选",
                                1932: "整合",
                                1933: "和值",
                                1934: "和值",
                                1935: "和值大小单双",
                                1936: "和值大小单双",
                                2237: "和值组合大小单双",
                                2238: "和值组合大小单双",
                                2240: "猜必出",
                                2241: "猜必不出",
                                1937: "两连",
                                1938: "两连",
                                1939: "独胆",
                                1940: "独胆",
                                1941: "豹子",
                                1942: "豹子",
                                1943: "豹子",
                                1944: "对子",
                                1945: "对子",
                                2242: "不出胆",
                                2243: "不出胆",
                                2541: "番摊",
                                2542: "番",
                                2543: "番摊-番",
                                2544: "角",
                                2545: "番摊-角",
                                2546: "念",
                                2547: "番摊-念",
                                2548: "大小单双",
                                2549: "番摊-大小单双",
                                1946: "两面",
                                1948: "总和",
                                1950: "第一球:大小单双",
                                1952: "第二球:大小单双",
                                1954: "第三球:大小单双",
                                1956: "第四球:大小单双",
                                1958: "第五球:大小单双",
                                1959: "第一球",
                                1961: "第一球",
                                1964: "第二球",
                                1966: "第二球",
                                1969: "第三球",
                                1971: "第三球",
                                1974: "第四球",
                                1976: "第四球",
                                1979: "第五球",
                                1981: "第五球",
                                1984: "任选",
                                1986: "一中一",
                                1987: "二中二",
                                1988: "三中三",
                                1989: "四中四",
                                1990: "五中五",
                                1991: "六中五",
                                1992: "七中五",
                                1993: "八中五",
                                1994: "组选",
                                1996: "前二组选 (娱乐)",
                                1997: "前三组选 (娱乐)",
                                1998: "直选",
                                2e3: "前二直选 (娱乐)",
                                2001: "前三直选 (娱乐)",
                                2002: "龙虎斗",
                                2004: "第一球vs第二球",
                                2005: "第一球vs第三球",
                                2006: "第一球vs第四球",
                                2007: "第一球vs第五球",
                                2008: "第二球vs第三球",
                                2009: "第二球vs第四球",
                                2010: "第二球vs第五球",
                                2011: "第三球vs第四球",
                                2012: "第三球vs第五球",
                                2013: "第四球vs第五球",
                            },
                            n.lhcPlayId
                        ),
                        {},
                        {
                            2014: "定位胆",
                            2015: "定位胆",
                            2016: "定位胆",
                            2017: "定位胆",
                            2018: "定位胆",
                            2019: "牛牛",
                            2021: "牛牛牌型",
                            2023: "牛牛有牛无牛",
                            2025: "牛牛大小单双",
                            2026: "梭哈",
                            2028: "梭哈牌型",
                            2070: "和值",
                            2071: "和值大小单双",
                            2072: "和值组合大小单双",
                            2053: "和值",
                            2054: "和值-大小单双",
                            2056: "上正",
                            2058: "上反",
                            2061: "上正",
                            2063: "上反",
                            2065: "直选加开",
                            2068: "后三不定位",
                            2055: "三数",
                            2057: "上正三位数",
                            2059: "上反三位数",
                            2643: "二等",
                            2644: "二特",
                            2645: "二等三位数",
                            2646: "二特三位数",
                            2675: "越式大小",
                            2676: "大小",
                            2677: "色碟",
                            2678: "大小",
                            2679: "单双",
                            2680: "全红",
                            2681: "全白",
                            2682: "3白+1红",
                            2683: "3红+1白",
                            2060: "二数",
                            2062: "上正二位数",
                            2064: "上反二位数",
                            2066: "下正二位数",
                            2067: "跑数",
                            2069: "上跑三位数",
                            2480: "下正二位数（复式）",
                            2481: "下正二位数（单式）",
                            2482: "上反二位数（复式）",
                            2483: "上正二位数（复式）",
                            2484: "上正二位数（单式）",
                            2485: "上正三位数（复式）",
                            2486: "上正三位数（单式）",
                            2487: "上反三位数（复式）",
                            2297: "鱼虾蟹",
                            2298: "鱼虾蟹",
                            2299: "鱼虾蟹",
                            2497: "番摊",
                            2498: "番",
                            2499: "番",
                            2500: "角",
                            2501: "角",
                            2502: "念",
                            2503: "念",
                            2504: "大小单双",
                            2505: "大小单双",
                            2090: "四数",
                            2095: "三数",
                            2100: "二数",
                            2105: "跑数",
                            2515: "包胆",
                            2528: "包胆",
                            2550: "逆向",
                            2560: "逆向",
                            2598: "串组",
                            2608: "串组",
                            2300: "鱼虾蟹",
                            2488: "番摊",
                            2618: "骰寶快三",
                            2624: "第1-10名排名",
                            2627: "冠亚和值",
                            2630: "龙虎斗",
                            2091: "上正",
                            2093: "上反",
                            2096: "上正",
                            2098: "上反",
                            2101: "上正",
                            2103: "下正",
                            2301: "鱼虾蟹",
                            2489: "番",
                            2491: "角",
                            2493: "念",
                            2495: "大小单双",
                            2619: "单骰",
                            2620: "和值",
                            2621: "围骰",
                            2622: "全围",
                            2623: "大小单双",
                            2625: "第1-10名排名",
                            2626: "第1-10名大小单双",
                            2628: "冠亚和值",
                            2629: "冠亚和大小单双",
                            2631: "龙虎斗",
                            2516: "后二包胆",
                            2520: "后三包胆",
                            2524: "后四包胆",
                            2551: "四位逆向",
                            2554: "八位逆向",
                            2557: "十位逆向",
                            2599: "串2组",
                            2602: "串3组",
                            2605: "串4组",
                            2584: "二数头尾",
                            2529: "后二包胆",
                            2533: "后三包胆",
                            2537: "后四包胆",
                            2561: "四位逆向",
                            2564: "八位逆向",
                            2567: "十位逆向",
                            2609: "串2组",
                            2612: "串3组",
                            2615: "串4组",
                            2591: "二数头尾",
                            2106: "一等二星不定位",
                            2108: "二等二星不定位",
                            2579: "特等二星不定位",
                            2092: "上正四位数",
                            2094: "上反四位数",
                            2097: "上正三位数",
                            2099: "上反三位数",
                            2102: "上正二位数",
                            2104: "下正二位数",
                            2107: "上跑两位数",
                            2109: "下跑两位数",
                            2601: "串2组",
                            2604: "串3组",
                            2607: "串4组",
                            2611: "串2组",
                            2614: "串3组",
                            2617: "串4组",
                            2552: "四不中",
                            2555: "八不中",
                            2558: "十不中",
                            2562: "四不中",
                            2565: "八不中",
                            2568: "十不中",
                            2517: "后二包胆",
                            2521: "后三包胆",
                            2525: "后四包胆",
                            2530: "后二包胆",
                            2534: "后三包胆",
                            2538: "后四包胆",
                            2641: "后二包胆1K",
                            2642: "后二包胆1K",
                            2586: "二数头尾",
                            2589: "二数头",
                            2593: "二数头尾",
                            2596: "二数头",
                            2580: "特等十位",
                            2581: "特等个位",
                            2582: "一等十位",
                            2583: "一等个位",
                            2302: "鱼虾蟹",
                            2490: "番",
                            2492: "角",
                            2494: "念",
                            2496: "大小单双",
                            2518: "后二包胆（复式）",
                            2519: "后二包胆（单式）",
                            2522: "后三包胆（复式）",
                            2523: "后三包胆（单式）",
                            2526: "后四包胆(复式)",
                            2527: "后四包胆(单式)",
                            2553: "四不中(单式)",
                            2556: "八不中(单式)",
                            2559: "十不中(单式)",
                            2587: "二数头尾（复式)",
                            2590: "二数头（复式)",
                            2531: "后二包胆（复式）",
                            2532: "后二包胆（单式）",
                            2535: "后三包胆（复式）",
                            2536: "后三包胆（单式）",
                            2539: "后四包胆(复式)",
                            2540: "后四包胆(单式)",
                            2563: "四不中(单式)",
                            2566: "八不中(单式)",
                            2569: "十不中(单式)",
                            2594: "二数头尾 (复式)",
                            2597: "二数头 (复式)",
                            2286: "上正四位数（复式）",
                            2287: "上正四位数（单式）",
                            2284: "上正三位数（复式）",
                            2285: "上正三位数（单式）",
                            2283: "上反三位数（复式）",
                            2279: "上正二位数（复式）",
                            2280: "上正二位数（单式）",
                            2281: "下正二位数（复式）",
                            2282: "下正二位数（单式）",
                            2127: "四数",
                            2132: "三数",
                            2137: "二数",
                            2142: "跑数",
                            2128: "上正",
                            2130: "上反",
                            2133: "上正",
                            2135: "上反",
                            2138: "上正",
                            2140: "下正",
                            2143: "后二不定位",
                            2145: "前二不定位",
                            2129: "上正四位数",
                            2131: "上反四位数",
                            2134: "上正三位数",
                            2136: "上反三位数",
                            2139: "上正二位数",
                            2141: "下正二位数",
                            2144: "上跑两位数",
                            2146: "下跑两位数",
                            2632: "一数",
                            2633: "一数 (个位)",
                            2634: "一数 (十位)",
                            2635: "一数 (百位)",
                            2636: "一数 (千位)",
                            263700: "一数",
                            2637: "一数 (个位)",
                            2638: "一数 (十位)",
                            2639: "一数 (百位)",
                            2640: "一数 (千位)",
                            2288: "上正二位数（复式）",
                            2289: "上正二位数（单式）",
                            2290: "下正二位数（复式）",
                            2291: "下正二位数（单式）",
                            2292: "上反三位数（复式）",
                            2293: "上正三位数（复式）",
                            2294: "上正三位数（单式）",
                            2295: "上正四位数（复式）",
                            2296: "上正四位数（单式）",
                            2303: "鱼虾蟹",
                            2304: "鱼虾蟹",
                            2305: "鱼虾蟹",
                            2506: "番摊",
                            2507: "番",
                            2508: "番",
                            2509: "角",
                            2510: "角",
                            2511: "念",
                            2512: "念",
                            2513: "大小单双",
                            2514: "大小单双",
                            2073: "前二包胆",
                            2074: "后二包胆",
                            2075: "前三包胆",
                            2076: "中三包胆",
                            2077: "后三包胆",
                            2078: "前二跨度",
                            2079: "后二跨度",
                            2080: "前三跨度",
                            2081: "中三跨度",
                            2082: "后三跨度",
                            2083: "不定位前四组选一胆",
                            2084: "不定位前四组选二胆",
                            2085: "不定位后四组选一胆",
                            2086: "不定位后四组选二胆",
                            2087: "不定位前三组选二胆",
                            2088: "不定位中三组选二胆",
                            2089: "不定位后三组选二胆",
                            2110: "趣味",
                            2111: "趣味",
                            2112: "趣味",
                            2113: "前三特殊号",
                            2114: "前三特殊号",
                            2115: "中三特殊号",
                            2116: "中三特殊号",
                            2117: "后三特殊号",
                            2118: "后三特殊号",
                            2119: "百家乐",
                            2120: "百家乐",
                            2121: "百家乐",
                            2122: "百家乐(无对子)",
                            2123: "百家乐",
                            2125: "百家乐",
                            2126: "百家乐(无对子)",
                            2169: "一字定位",
                            2170: "百定位",
                            2171: "百定位",
                            2172: "大小单双(百定位)",
                            2173: "质合数(百定位)",
                            2174: "十定位",
                            2175: "十定位",
                            2176: "大小单双(十定位)",
                            2177: "质合数(十定位)",
                            2178: "个定位",
                            2179: "个定位",
                            2180: "大小单双(个定位)",
                            2181: "质合数(个定位)",
                            2182: "一字組合",
                            2183: "一字組合",
                            2184: "一字組合",
                            2185: "二字定位",
                            2186: "百十定位",
                            2187: "百十定位",
                            2188: "百个定位",
                            2189: "百个定位",
                            2190: "十个定位",
                            2191: "十个定位",
                            2192: "二字組合",
                            2193: "二字組合",
                            2194: "二字組合",
                            2195: "二字和数",
                            2196: "百十和数",
                            2197: "百十和数",
                            2198: "百十和数尾数",
                            2199: "百个和数",
                            2200: "百个和数",
                            2201: "百个和数尾数",
                            2202: "十个和数",
                            2203: "十个和数",
                            2204: "十个和数尾数",
                            2205: "三字定位",
                            2206: "百十个定位",
                            2207: "百十个定位",
                            2208: "三字组合",
                            2209: "三字组合",
                            2210: "三字组合",
                            2211: "三字和数",
                            2212: "百十个和数",
                            2213: "百十个和数",
                            2214: "百十个和数尾数",
                            2215: "组选三",
                            2216: "组选三",
                            2217: "组选三",
                            2218: "组选六",
                            2219: "组选六",
                            2220: "组选六",
                            2221: "跨度",
                            2222: "跨度",
                            2223: "百十个跨度",
                            2224: "百十跨度",
                            2225: "百个跨度",
                            2226: "十个跨度",
                            2244: "一字定位",
                            2245: "定位胆",
                            2246: "定位胆",
                            2247: "二字定位",
                            2248: "直选",
                            2249: "任二直选",
                            2250: "任二直选（单式）",
                            2251: "三字定位",
                            2252: "直选",
                            2253: "任三直选",
                            2254: "任三直选（单式）",
                            2255: "四字定位",
                            2256: "直选",
                            2257: "任四直选",
                            2258: "任四直选（单式）",
                            2259: "二字现",
                            2260: "不定位",
                            2261: "二字现不定位",
                            2262: "三字现",
                            2263: "不定位",
                            2264: "三字现不定位",
                            2227: "红黑组合",
                            2228: "红黑码",
                            2229: "红码组合",
                            2230: "黑码组合",
                            2269: "红码大小单双",
                            2270: "黑码大小单双",
                            2231: "龙虎和",
                            2232: "龙虎和",
                            2233: "第一球 vs 第二球",
                            2234: "第一球 vs 第三球",
                            2235: "第二球 vs 第三球",
                            2265: "跨度",
                            2266: "跨度",
                            2267: "跨度",
                            2268: "跨度",
                            2570: "任选胆拖",
                            2571: "任选胆拖",
                            2572: "任选二中二",
                            2573: "任选三中三",
                            2574: "任选四中四",
                            2575: "任选五中五",
                            2576: "任选六中五",
                            2577: "任选七中五",
                            2578: "任选八中五",
                            2647: "任选",
                            2656: "趣味",
                            2648: "任选",
                            2657: "总和大小",
                            2658: "总和单双",
                            2659: "总和过关",
                            2660: "上下盘",
                            2661: "奇偶盘",
                            2662: "五行",
                            2649: "任选一",
                            2650: "任选二",
                            2651: "任选三",
                            2652: "任选四",
                            2653: "任选五",
                            2654: "任选六",
                            2655: "任选七",
                            null: " ",
                        }
                    ),
                    playKey: d(
                        d({}, n.lhcPlayKey),
                        {},
                        {
                            zero: "0",
                            one: "1",
                            two: "2",
                            three: "3",
                            four: "4",
                            five: "5",
                            six: "6",
                            seven: "7",
                            eight: "8",
                            nine: "9",
                            ten: "10",
                            eleven: "11",
                            zeroZero: "00",
                            zeroOne: "01",
                            zeroTwo: "02",
                            zeroThree: "03",
                            zeroFour: "04",
                            zeroFive: "05",
                            zeroSix: "06",
                            zeroSeven: "07",
                            zeroEight: "08",
                            zeroNine: "09",
                            comZeroOne: "01",
                            comZeroTwo: "02",
                            comZeroThree: "03",
                            comZeroFour: "04",
                            comZeroFive: "05",
                            comZeroSix: "06",
                            comZeroSeven: "07",
                            comZeroEight: "08",
                            comZeroNine: "09",
                            comTen: "10",
                            comEleven: "11",
                            big: "大",
                            small: "小",
                            odd: "单",
                            even: "双",
                            prime: "质数",
                            composite: "合数",
                            fcprime: "质数",
                            fccomposite: "合数",
                            baozi: "豹子",
                            pair: "对子",
                            straight: "顺子",
                            straightK3: "全顺",
                            halfStraight: "半顺",
                            za3: "杂三",
                            zu6: "杂六",
                            First3: "前三",
                            Middle3: "中三",
                            Last3: "后三",
                            dragon: "龙",
                            tiger: "虎",
                            sum: "和",
                            smallOdd: "小单",
                            smallEven: "小双",
                            bigOdd: "大单",
                            bigEven: "大双",
                            NNOne: "牛一",
                            NNTwo: "牛二",
                            NNThree: "牛三",
                            NNFour: "牛四",
                            NNFive: "牛五",
                            NNSix: "牛六",
                            NNSeven: "牛七",
                            NNEight: "牛八",
                            NNNine: "牛九",
                            NNNN: "牛牛",
                            NNBig: "牛大",
                            NNSmall: "牛小",
                            NNOdd: "牛单",
                            NNEven: "牛双",
                            NNNoHave: "无牛",
                            NNHave: "有牛",
                            FiveOfAKind: "五条",
                            FourOfAKind: "四条",
                            FullHouse: "葫芦",
                            Straight: "顺子",
                            ThreeOfAKind: "三条",
                            TwoPairs: "两对",
                            OnePair: "一对",
                            HighCard: "高牌",
                            Dragon_Tiger_Tie_5_4_ENT: "万千 第一球vs第二球",
                            Dragon_Tiger_Tie_5_3_ENT: "万百 第一球vs第三球",
                            Dragon_Tiger_Tie_5_2_ENT: "万十 第一球vs第四球",
                            Dragon_Tiger_Tie_5_1_ENT: "万个 第一球vs第五球",
                            Dragon_Tiger_Tie_4_3_ENT: "千百 第二球vs第三球",
                            Dragon_Tiger_Tie_4_2_ENT: "千十 第二球vs第四球",
                            Dragon_Tiger_Tie_4_1_ENT: "千个 第二球vs第五球",
                            Dragon_Tiger_Tie_3_2_ENT: "百十 第三球vs第四球",
                            Dragon_Tiger_Tie_3_1_ENT: "百个 第三球vs第五球",
                            Dragon_Tiger_Tie_2_1_ENT: "十个 第四球vs第五球",
                            PK10dragon: "龙",
                            PK10tiger: "虎",
                            PK10dragon1861: "1v10:龙",
                            PK10tiger1861: "1v10:虎",
                            PK10dragon1864: "2v9:龙",
                            PK10tiger1864: "2v9:虎",
                            PK10dragon1867: "3v8:龙",
                            PK10tiger1867: "3v8:虎",
                            PK10dragon1870: "4v7:龙",
                            PK10tiger1870: "4v7:虎",
                            PK10dragon1873: "5v6:龙",
                            PK10tiger1873: "5v6:虎",
                            twoSum3: "3",
                            twoSum4: "4",
                            twoSum5: "5",
                            twoSum6: "6",
                            twoSum7: "7",
                            twoSum8: "8",
                            twoSum9: "9",
                            twoSum10: "10",
                            twoSum11: "11",
                            twoSum12: "12",
                            twoSum13: "13",
                            twoSum14: "14",
                            twoSum15: "15",
                            twoSum16: "16",
                            twoSum17: "17",
                            twoSum18: "18",
                            twoSum19: "19",
                            threeSum6: "6",
                            threeSum7: "7",
                            threeSum8: "8",
                            threeSum9: "9",
                            threeSum10: "10",
                            threeSum11: "11",
                            threeSum12: "12",
                            threeSum13: "13",
                            threeSum14: "14",
                            threeSum15: "15",
                            threeSum16: "16",
                            threeSum17: "17",
                            threeSum18: "18",
                            threeSum19: "19",
                            threeSum20: "20",
                            threeSum21: "21",
                            threeSum22: "22",
                            threeSum23: "23",
                            threeSum24: "24",
                            threeSum25: "25",
                            threeSum26: "26",
                            threeSum27: "27",
                            Dragon_Tiger_1_VS_10_PK10: "冠军vs第十名",
                            Dragon_Tiger_2_VS_9_PK10: "亚军vs第九名",
                            Dragon_Tiger_3_VS_8_PK10: "季军vs第八名",
                            Dragon_Tiger_4_VS_7_PK10: "第四名vs第七名",
                            Dragon_Tiger_5_VS_6_PK10: "第五名vs第六名",
                            extremumBig: "极大",
                            extremumSmall: "极小",
                            specialCom3: "特码包三",
                            different_2_12: "1,2",
                            different_2_13: "1,3",
                            different_2_14: "1,4",
                            different_2_15: "1,5",
                            different_2_16: "1,6",
                            different_2_23: "2,3",
                            different_2_24: "2,4",
                            different_2_25: "2,5",
                            different_2_26: "2,6",
                            different_2_34: "3,4",
                            different_2_35: "3,5",
                            different_2_36: "3,6",
                            different_2_45: "4,5",
                            different_2_46: "4,6",
                            different_2_56: "5,6",
                            single_same_1: "1",
                            single_same_2: "2",
                            single_same_3: "3",
                            single_same_4: "4",
                            single_same_5: "5",
                            single_same_6: "6",
                            any_code_not_win_1: "1",
                            any_code_not_win_2: "2",
                            any_code_not_win_3: "3",
                            any_code_not_win_4: "4",
                            any_code_not_win_5: "5",
                            any_code_not_win_6: "6",
                            boazi_1: "1,1,1",
                            boazi_2: "2,2,2",
                            boazi_3: "3,3,3",
                            boazi_4: "4,4,4",
                            boazi_5: "5,5,5",
                            boazi_6: "6,6,6",
                            any_baozi: "任意豹子",
                            single_same_2_1: "1,1",
                            single_same_2_2: "2,2",
                            single_same_2_3: "3,3",
                            single_same_2_4: "4,4",
                            single_same_2_5: "5,5",
                            single_same_2_6: "6,6",
                            num_combine0: "红码",
                            num_combine1: "黑码",
                            red_num_bsoe_0: "红大",
                            red_num_bsoe_1: "红小",
                            red_num_bsoe_2: "红单",
                            red_num_bsoe_3: "红双",
                            black_num_bsoe_0: "黑大",
                            black_num_bsoe_1: "黑小",
                            black_num_bsoe_2: "黑单",
                            black_num_bsoe_3: "黑双",
                            red_num_com_1: "1",
                            red_num_com_2: "2",
                            red_num_com_3: "3",
                            red_num_com_4: "4",
                            red_num_com_5: "5",
                            red_num_com_6: "6",
                            black_num_com_1: "1",
                            black_num_com_2: "2",
                            black_num_com_3: "3",
                            black_num_com_4: "4",
                            black_num_com_5: "5",
                            black_num_com_6: "6",
                            dragon_tiger_1v2_0: "虎",
                            dragon_tiger_1v2_1: "龙",
                            dragon_tiger_1v2_2: "和",
                            dragon_tiger_1v3_0: "虎",
                            dragon_tiger_1v3_1: "龙",
                            dragon_tiger_1v3_2: "和",
                            dragon_tiger_2v3_0: "虎",
                            dragon_tiger_2v3_1: "龙",
                            dragon_tiger_2v3_2: "和",
                            span_0: "0",
                            span_1: "1",
                            span_2: "2",
                            span_3: "3",
                            span_4: "4",
                            span_5: "5",
                            twoSideSumGroupBig: "和大",
                            twoSideSumGroupSmall: "和小",
                            twoSideSumGroupOdd: "和单",
                            twoSideSumGroupEven: "和双",
                            twoSideSumGroupTailBig: "尾大",
                            twoSideSumGroupTailSmall: "尾小",
                            nn1: "牛ㄧ",
                            nn2: "牛二",
                            nn3: "牛三",
                            nn4: "牛四",
                            nn5: "牛五",
                            nn6: "牛六",
                            nn7: "牛七",
                            nn8: "牛八",
                            nn9: "牛九",
                            nn10: "牛牛",
                            nnHas0: "无牛",
                            nnHas1: "有牛",
                            fiveOfAKind: "五条",
                            fourOfAKind: "四条",
                            fullHouse: "葫芦",
                            treeOfAKind: "三条",
                            twoPair: "两对",
                            onePair: "一对",
                            highCard: "高牌",
                            HK5_SSC_ENT: "百家乐",
                            banker: "庄",
                            player: "闲",
                            tie: "和",
                            bankerPair: "庄对",
                            playerPair: "闲对",
                            Banker: "庄",
                            Player: "闲",
                            Tie: "和",
                            BankerPair: "庄对",
                            PlayerPair: "闲对",
                            keno_big: "大",
                            keno_small: "小",
                            keno_sumOdd: "单",
                            keno_sumEven: "双",
                            keno_sum: "和",
                            keno_bigSumOdd: "大单",
                            keno_bigSumEven: "大双",
                            keno_smallSumOdd: "小单",
                            keno_smallSumEven: "小双",
                            keno_up: "上",
                            keno_down: "下",
                            keno_middle: "中",
                            keno_ballOdd: "奇",
                            keno_ballEven: "偶",
                            keno_equal: "和",
                            keno_gold: "金",
                            keno_wood: "木",
                            keno_water: "水",
                            keno_fire: "火",
                            keno_earth: "土",
                        }
                    ),
                    playRemark: d({}, l.default),
                    bothSideRank: d(
                        d(d(d({}, n.lhcBothSideRank), i.sscBothSideRank), r.pcbBothSideRank),
                        o.k3BothSideRank
                    ),
                    entertainmentBetContent: d({}, t.default),
                    longDragonSpecialPlayId: {
                        1695: "正码一",
                        1665: "正码一",
                        1667: "正码一",
                        1698: "正码二",
                        1669: "正码二",
                        1671: "正码二",
                        1701: "正码三",
                        1673: "正码三",
                        1675: "正码三",
                        1704: "正码四",
                        1677: "正码四",
                        1679: "正码四",
                        1707: "正码五",
                        1681: "正码五",
                        1683: "正码五",
                        1710: "正码六",
                        1685: "正码六",
                        1687: "正码六",
                        1843: "1 vs 2",
                        1844: "1 vs 3",
                        1845: "1 vs 4",
                        1827: "1 vs 5",
                        1847: "2 vs 3",
                        1848: "2 vs 4",
                        1849: "2 vs 5",
                        1850: "3 vs 4",
                        1851: "3 vs 5",
                        1852: "4 vs 5",
                        1858: "冠亚和",
                        1860: "冠军",
                        1863: "亚军",
                        1866: "季军",
                        1869: "第四名",
                        1872: "第五名",
                        1875: "第六名",
                        1877: "第七名",
                        1879: "第八名",
                        1881: "第九名",
                        1883: "第十名",
                        1861: "1 vs 10",
                        1864: "2 vs 9",
                        1867: "3 vs 8",
                        1870: "4 vs 7",
                        1873: "5 vs 6",
                        2004: "1 vs 2",
                        2005: "1 vs 3",
                        2006: "1 vs 4",
                        2007: "1 vs 5",
                        2008: "2 vs 3",
                        2009: "2 vs 4",
                        2010: "2 vs 5",
                        2011: "3 vs 4",
                        2012: "3 vs 5",
                        2013: "4 vs 5",
                    },
                };
                e.default = c;
            },
            3321: function(_, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
                var a = {
                    proTrendChart: {
                        basicChart: "走势图",
                        lineChart: "K线图",
                        barChart: "直方图",
                        drawChart: "历史开奖数据",
                        filterBy: "筛选条件",
                        singleTrend: "定位走势",
                        multipleTrend: "组合走势",
                        dragonTiger: "龙虎",
                        BSOETrend: "大小单双",
                        fanTan: "番摊",
                        kenoSumTrend: "和值走势",
                        kenoUpDown: "上下盘",
                        kenoOddEven: "奇偶盘",
                        kenoTrend: "走勢",
                        All_5: "五星",
                        All_5_Complex: "五星综合",
                        All_4_NumberSpread: "四星分布",
                        First_4: "前四",
                        Last_4: "后四",
                        All_3_NumberSpread: "三星分布",
                        First_3: "前三",
                        Middle_3: "中三",
                        Last_3: "后三",
                        First_2: "前二",
                        Last_2: "后二",
                        Dragon_Tiger: "龙虎",
                        Fan_Tan: "番摊",
                        P3_First_3: "P3前三",
                        P5_Last_3: "P5后三",
                        P3_First_2: "P3前二",
                        P5_Last_2: "P5后二",
                        All_4: "四星",
                        All_3: "三星",
                        "3D_Sum": "和数",
                        Complex: "综合",
                        Complex_LHC: "综合",
                        Complex_PCB: "综合",
                        Digit_Fixed: "正码",
                        Sum: "和值",
                        Number_Spread: "号码分布",
                        first4NumberSpread: "前四号码分布",
                        last4NumberSpread: "后四号码分布",
                        first3NumberSpread: "前三号码分布",
                        middle3NumberSpread: "中三号码分布",
                        last3NumberSpread: "后三号码分布",
                        first2NumberSpread: "前二号码分布",
                        last2NumberSpread: "后二号码分布",
                        Fixed_Place: "定位",
                        Fixed_Place_Complex: "定位综合",
                        BSOE: "大小单双",
                        sumBSOE: "大小单双",
                        fullSpread: "完整分布",
                        First_To_Third: "第1-3名",
                        Fourth_To_Sixth: "第4-6名",
                        Seventh_To_Tenth: "第7-10名",
                        firstSecondSumBSOE: "冠亚和",
                        first5BSOE: "前五",
                        last5BSOE: "后五",
                        kenoSum: "和值",
                        kenoTotalBS: "大小",
                        kenoTotalOE: "单双",
                        kenoTotalFE: "五行",
                        Up_Down: "上下",
                        Odd_Even: "奇偶",
                        numero: "期号",
                        drawNumber: "开奖号码",
                        trend: "走势",
                        TEN_THOUSANDS: "万位",
                        THOUSANDS: "千位",
                        HUNDREDS: "百位",
                        TENS: "十位",
                        ONES: "个位",
                        firstBall: "第一球",
                        secondBall: "第二球",
                        thirdBall: "第三球",
                        fourthBall: "第四球",
                        fifthBall: "第五球",
                        first: "第一位",
                        second: "第二位",
                        third: "第三位",
                        special: "特码",
                        firstPlace: "冠军",
                        secondPlace: "亚军",
                        thirdPlace: "季军",
                        fourthPlace: "第四名",
                        fifthPlace: "第五名",
                        sixthPlace: "第六名",
                        seventhPlace: "第七名",
                        eighthPlace: "第八名",
                        ninthPlace: "第九名",
                        tenthPlace: "第十名",
                        normalOne: "正码一",
                        normalTwo: "正码二",
                        normalThree: "正码三",
                        normalFour: "正码四",
                        normalFive: "正码五",
                        normalSix: "正码六",
                        sumTrend: "和值走势",
                        numberSpread: "号码分布",
                        sum: "和值",
                        total: "总数",
                        span: "跨度",
                        type: "组态",
                        middleNumber: "中位值",
                        largeSmallRatio: "大小比",
                        oddEvenRatio: "单双比",
                        primCompRatio: "质合比",
                        BSType: "大小形态",
                        OEType: "单双形态",
                        PCType: "质合形态",
                        com3: "组三",
                        com6: "组六",
                        baozi: "豹子",
                        pair: "对子",
                        pair_K3: "对子(二同号)",
                        com6_K3: "组六(三不同)",
                        baozi_K3: "豹子(三同号)",
                        firstSecondSum: "冠亚和值",
                        firstSecondThirdSum: "冠亚季和值",
                        firstThirdSum: "首尾和值",
                        Dragon_Tiger_Tie_5_4: "第一球 VS 第二球",
                        Dragon_Tiger_Tie_5_3: "第一球 VS 第三球",
                        Dragon_Tiger_Tie_5_2: "第一球 VS 第四球",
                        Dragon_Tiger_Tie_5_1: "第一球 VS 第五球",
                        Dragon_Tiger_Tie_4_3: "第二球 VS 第三球",
                        Dragon_Tiger_Tie_4_2: "第二球 VS 第四球",
                        Dragon_Tiger_Tie_4_1: "第二球 VS 第五球",
                        Dragon_Tiger_Tie_3_2: "第三球 VS 第四球",
                        Dragon_Tiger_Tie_3_1: "第三球 VS 第五球",
                        Dragon_Tiger_Tie_2_1: "第四球 VS 第五球",
                        Dragon_Tiger_1_VS_10: "第一名 VS 第十名",
                        Dragon_Tiger_2_VS_9: "第二名 VS 第九名",
                        Dragon_Tiger_3_VS_8: "第三名 VS 第八名",
                        Dragon_Tiger_4_VS_7: "第四名 VS 第七名",
                        Dragon_Tiger_5_VS_6: "第五名 VS 第六名",
                        guFan: "孤番",
                        fanBS: "番大小",
                        fanOE: "番单双",
                        firstBSOE: "第一名大小单双",
                        secondBSOE: "第二名大小单双",
                        thirdBSOE: "第三名大小单双",
                        fourthBSOE: "第四名大小单双",
                        fifthBSOE: "第五名大小单双",
                        sixthBSOE: "第六名大小单双",
                        seventhBSOE: "第七名大小单双",
                        eighthBSOE: "第八名大小单双",
                        ninthBSOE: "第九名大小单双",
                        tenthBSOE: "第十名大小单双",
                        firstBallBS: "第一球大小",
                        firstBallOE: "第一球单双",
                        secondBallBS: "第二球大小",
                        secondBallOE: "第二球单双",
                        thirdBallBS: "第三球大小",
                        thirdBallOE: "第三球单双",
                        Hundreds_Tens_Sum: "百十和数",
                        Hundreds_Tens_Sum_Last: "百十和尾",
                        Hundreds_Units_Sum: "百个和数",
                        Hundreds_Units_Sum_Last: "百个合尾",
                        Tens_Units_Sum: "十个和数",
                        Tens_Units_Sum_Last: "十个和尾",
                        Hundreds_Tens_Units_Sum: "百十个和数",
                        Hundreds_Tens_Units_Sum_Tail: "百十个和尾",
                        specialBS: "特码大小",
                        specialOE: "特码单双",
                        totalBS: "总大小",
                        totalOE: "总单双",
                        extremum: "极值",
                        colorBall: "色波",
                        colorBallLHC: "色波",
                        specialBSLHC: "特大小",
                        specialOELHC: "特单双",
                        specialSumBS: "特合大小",
                        specialSumOE: "特合单双",
                        specialTailBS: "特尾大小",
                        big: "大",
                        small: "小",
                        odd: "单",
                        even: "双",
                        prime: "质",
                        composite: "合",
                        dragon: "龙",
                        tiger: "虎",
                        tie: "和",
                        extremumBig: "极大",
                        extremumSmall: "极小",
                        extremumDraw: "-",
                        specialDraw: "-",
                        colorStraightRed: "红波",
                        colorStraightBlue: "蓝波",
                        colorStraightGreen: "绿波",
                        draw: "和局",
                        AllCom120: "五星组选 120",
                        AllCom60: "五星组选 60",
                        AllCom30: "五星组选 30",
                        AllCom20: "五星组选 20",
                        AllCom10: "五星组选 10",
                        AllCom5: "五星组选 5",
                        F4Com24: "前四组选 24",
                        F4Com12: "前四组选 12",
                        F4Com6: "前四组选 6",
                        F4Com4: "前四组选 4",
                        L4Com24: "后四组选 24",
                        L4Com12: "后四组选 12",
                        L4Com6: "后四组选 6",
                        L4Com4: "后四组选 4",
                        noType: "-",
                        kenoUp: "上",
                        kenoMid: "中",
                        kenoDown: "下",
                        kenoOdd: "奇",
                        kenoEqual: "和",
                        kenoEven: "偶",
                        totalTimes: "出现总次数",
                        totalHotGap: "平均遗漏值",
                        maxGap: "最大遗漏值",
                        comboWin: "最大连出值",
                        drawTime: "开奖日期",
                        h5proTrendChart: {
                            Dragon_Tiger_Tie_5_4: "1<br />vs<br />2",
                            Dragon_Tiger_Tie_5_3: "1<br />vs<br />3",
                            Dragon_Tiger_Tie_5_2: "1<br />vs<br />4",
                            Dragon_Tiger_Tie_5_1: "1<br />vs<br />5",
                            Dragon_Tiger_Tie_4_3: "2<br />vs<br />3",
                            Dragon_Tiger_Tie_4_2: "2<br />vs<br />4",
                            Dragon_Tiger_Tie_4_1: "2<br />vs<br />5",
                            Dragon_Tiger_Tie_3_2: "3<br />vs<br />4",
                            Dragon_Tiger_Tie_3_1: "3<br />vs<br />5",
                            Dragon_Tiger_Tie_2_1: "4<br />vs<br />5",
                            Dragon_Tiger_1_VS_10: "1<br />vs<br />10",
                            Dragon_Tiger_2_VS_9: "2<br />vs<br />9",
                            Dragon_Tiger_3_VS_8: "3<br />vs<br />8",
                            Dragon_Tiger_4_VS_7: "4<br />vs<br />7",
                            Dragon_Tiger_5_VS_6: "5<br />vs<br />6",
                            firstBallBS: "第一球",
                            firstBallOE: "第一球",
                            secondBallBS: "第二球",
                            secondBallOE: "第二球",
                            thirdBallBS: "第三球",
                            thirdBallOE: "第三球",
                            pair_K3: "对子<br />(二同号)",
                            com6_K3: "组六<br />(三不同)",
                            baozi_K3: "豹子<br />(三同号)",
                            Hundreds_Tens_Sum: "百十<br />和数",
                            Hundreds_Tens_Sum_Last: "百十<br />和尾",
                            Hundreds_Units_Sum: "百个<br />和数",
                            Hundreds_Units_Sum_Last: "百个<br />合尾",
                            Tens_Units_Sum: "十个<br />和数",
                            Tens_Units_Sum_Last: "十个<br />和尾",
                            Hundreds_Tens_Units_Sum: "百十个<br />和数",
                            Hundreds_Tens_Units_Sum_Tail: "百十个<br />和尾",
                        },
                    },
                };
                e.default = a;
            },
            2471: function(_, e, a) {
                var t = a(9325);
                _.exports = {
                    translatePlayName: function(_, e) {
                        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                        return (0, t.getPlayName)({ playId: _, playCode: e, bettingContent: a });
                    },
                    translateBallContentText: function(_, e, a) {
                        return (0, t.i18nOrderInfo)({ playId: _, bettingContent: e, lang: a });
                    },
                    translatePrizeType: function(_) {
                        return _ && 0 !== _.length ? (0, t.i18n)("prizeListPrizeType.".concat(_)) : "";
                    },
                    translateGameCode: function(_) {
                        return _ && 0 !== _.length ? (0, t.i18n)("gameCode.".concat(_)) : "";
                    },
                    translateGameGroupCode: function(_) {
                        return _ && 0 !== _.length ? (0, t.i18n)("gameGroupCode.".concat(_)) : "";
                    },
                };
            },
            9325: function(_, e, a) {
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.getPlayName = e.getPlayMenuNameWithDigit = e.genOrderNumberText = e.genChasingOrderText = e.default = void 0),
                    Object.defineProperty(e, "i18n", {
                        enumerable: !0,
                        get: function() {
                            return o.i18n;
                        },
                    }),
                    (e.truncBallText = e.i18nOrderInfo = void 0);
                var t = s(a(4006)),
                    n = s(a(3153)),
                    i = s(a(3532)),
                    r = s(a(1099)),
                    o = a(814),
                    l = a(9748),
                    u = s(a(2589));
                function s(_) {
                    return _ && _.__esModule ? _ : { default: _ };
                }
                var d = function(_) {
                    var e = _.playMenu,
                        a = _.startDigit,
                        n = e.playCode,
                        i = e.playId,
                        r = (l.orderDigitsI18n[n] || {}).digitsI18n,
                        u = (0, t.default)(a) && r ? (0, o.i18n)(r[a]) : "";
                    return i >= 1843 && i <= 1852
                        ? ""
                              .concat((0, o.i18n)("playId.1841"), ":")
                              .concat((0, o.i18n)("playId.".concat(i)))
                              .concat(u)
                        : i >= 2231 && i <= 2235
                        ? ""
                              .concat((0, o.i18n)("playId.2231"), ":")
                              .concat((0, o.i18n)("playId.".concat(i)))
                              .concat(u)
                        : [l.PlayMenu.Any2Sum_SSC, l.PlayMenu.Any3Sum_SSC].indexOf(i) >= 0
                        ? (0, o.i18n)("playId.".concat(i))
                        : "".concat((0, o.i18n)("playId.".concat(i))).concat(u);
                };
                e.getPlayMenuNameWithDigit = d;
                var S = function(_) {
                    var e = _.playId,
                        a = _.playCode,
                        t = _.bettingContent,
                        r = { playMenu: { playCode: a, playId: e }, startDigit: "" };
                    if (t) {
                        var o = t.split("");
                        switch (e) {
                            case l.PlayMenu.FixedPlace:
                            case l.PlayMenu.FixedPlace_Last_4:
                            case l.PlayMenu.FixedPlace_Last_3:
                            case l.PlayMenu.FixedPlace_Last_2:
                            case l.PlayMenu.FixedPlace_ZY:
                            case l.PlayMenu.FixedPlace_LF_FC3D:
                            case l.PlayMenu.FixedPlace_LF_P3P5:
                            case l.PlayMenu.FixedPlace_11X5:
                            case l.PlayMenu.Choose1_Fixed_Place_4D:
                                r.startDigit = (0, n.default)((0, i.default)(o), function(_) {
                                    return !isNaN(_);
                                });
                                break;
                            case l.PlayMenu.First5Fixed_PK10:
                            case l.PlayMenu.First5BSOE_PK10:
                                r.startDigit = (0, n.default)(o, function(_) {
                                    return !isNaN(_);
                                });
                                break;
                            case l.PlayMenu.Last5Fixed_PK10:
                            case l.PlayMenu.Last5BSOE_PK10:
                                r.startDigit =
                                    (0, n.default)(o, function(_) {
                                        return !isNaN(_);
                                    }) + 5;
                        }
                    }
                    return d(r);
                };
                e.getPlayName = S;
                var c = function(_) {
                    var e = _.substr(0, 10),
                        a = function(_) {
                            return _.replace(/\|/g, " | ");
                        };
                    if (_.indexOf("(") >= 0 && _.indexOf(")") >= 0) {
                        var t = _.substr(0, _.indexOf(")") + 1);
                        return t.length > 4
                            ? "".concat(t.substr(0, 4), "...")
                            : 5 === e.length
                            ? "".concat(e.substr(0, 5))
                            : "".concat(e.substr(0, 5), "...");
                    }
                    return e.length > 9 ? "".concat(a(e.substr(0, 9)), "...") : a(e);
                };
                e.truncBallText = c;
                var T = function(_, e) {
                    var a = _.orderNumber,
                        t = void 0 === a ? "" : a,
                        n = _.chasing,
                        i = void 0 !== n && n,
                        o = _.chasingOrder,
                        l = void 0 === o ? 0 : o,
                        u = ["tlc557uats", "tlc5577s"].includes(e) ? t : t.slice(-6);
                    if (i) {
                        var s = (0, r.default)(l, 3, "0");
                        return "".concat(u, "-").concat(s);
                    }
                    return u;
                };
                e.genOrderNumberText = T;
                var E = function(_) {
                    var e = _.chasing,
                        a = _.chasingOrder,
                        t = _.chasingPhase;
                    return e
                        ? 1 === a
                            ? (0, o.i18n)("chasingPhaseAmount", t)
                            : (0, o.i18n)("chasingChildOrder")
                        : "-";
                };
                e.genChasingOrderText = E;
                var y = function(_) {
                    var e = _.playId,
                        a = _.bettingContent,
                        t = _.lang;
                    return u.default.getText(e, a, t);
                };
                e.i18nOrderInfo = y;
                var O = {
                    getPlayMenuNameWithDigit: d,
                    truncBallText: c,
                    getPlayName: S,
                    i18nOrderInfo: y,
                    genOrderNumberText: T,
                    genChasingOrderText: E,
                    genBallContentText: y,
                    i18n: o.i18n,
                    i18nWithLang: o.i18nWithLang,
                    lang: o.lang,
                };
                e.default = O;
            },
        },
        e = {};
    function a(t) {
        var n = e[t];
        if (void 0 !== n) return n.exports;
        var i = (e[t] = { id: t, loaded: !1, exports: {} });
        return _[t](i, i.exports, a), (i.loaded = !0), i.exports;
    }
    (a.g = (function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (_) {
            if ("object" == typeof window) return window;
        }
    })()),
        (a.nmd = function(_) {
            return (_.paths = []), _.children || (_.children = []), _;
        });
    var t = a(2471);
    lottTranslator = t;
})();