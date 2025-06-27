import { useMemo, useState, useEffect, useCallback, useContext, createContext } from 'react';
import { jsx } from 'react/jsx-runtime';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    if (r) i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n;else {
      function o(r, n) {
        _regeneratorDefine(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      o("next", 0), o("throw", 1), o("return", 2);
    }
  }, _regeneratorDefine(e, r, n, t);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var JwtAuthClient = /*#__PURE__*/function () {
  function JwtAuthClient() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, JwtAuthClient);
    this.storage = options.storage || window.localStorage;
    this.accessTokenKey = options.accessTokenKey || 'jwt_access_token';
    this.refreshTokenKey = options.refreshTokenKey || 'jwt_refresh_token';
    this.onRefresh = options.onRefresh || null; // User-provided function to call refresh API
  }

  /**
   * Saves the tokens to the configured storage.
   * @param {string} accessToken - The access JWT string.
   * @param {string} [refreshToken] - The optional refresh JWT string.
   */
  return _createClass(JwtAuthClient, [{
    key: "login",
    value: function login(accessToken, refreshToken) {
      if (typeof accessToken !== 'string' || accessToken.split('.').length !== 3) {
        console.error('Invalid Access Token provided to login method.');
        return;
      }
      this.storage.setItem(this.accessTokenKey, accessToken);
      if (refreshToken) {
        this.storage.setItem(this.refreshTokenKey, refreshToken);
      }
    }

    /**
     * Removes tokens from storage.
     */
  }, {
    key: "logout",
    value: function logout() {
      this.storage.removeItem(this.accessTokenKey);
      this.storage.removeItem(this.refreshTokenKey);
    }

    /**
     * Retrieves the raw access token from storage.
     * @returns {string|null} The access token string or null if not found.
     */
  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this.storage.getItem(this.accessTokenKey);
    }

    /**
     * Retrieves the raw refresh token from storage.
     * @returns {string|null} The refresh token string or null if not found.
     */
  }, {
    key: "getRefreshToken",
    value: function getRefreshToken() {
      return this.storage.getItem(this.refreshTokenKey);
    }

    /**
     * Decodes the access token payload.
     * @returns {object|null} The decoded payload object or null if token is invalid/missing.
     */
  }, {
    key: "getPayload",
    value: function getPayload() {
      var token = this.getAccessToken();
      if (!token) return null;
      try {
        var payloadBase64 = token.split('.')[1];
        var decodedJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decodedJson);
      } catch (error) {
        console.error('Failed to decode JWT payload:', error);
        return null;
      }
    }

    /**
     * Checks if the access token is expired.
     * @returns {boolean} True if the token is expired or doesn't exist.
     */
  }, {
    key: "isAccessTokenExpired",
    value: function isAccessTokenExpired() {
      var payload = this.getPayload();
      if (!payload || typeof payload.exp !== 'number') {
        return true;
      }
      var nowInSeconds = Math.floor(Date.now() / 1000);
      return nowInSeconds > payload.exp;
    }

    /**
     * Checks if a valid, non-expired access token exists.
     * @returns {boolean} True if authenticated, false otherwise.
     */
  }, {
    key: "isAuthenticated",
    value: function isAuthenticated() {
      return !this.isAccessTokenExpired();
    }

    /**
     * Attempts to refresh the access token using the stored refresh token.
     * @returns {Promise<boolean>} True if refresh was successful, false otherwise.
     */
  }, {
    key: "refreshAccessToken",
    value: (function () {
      var _refreshAccessToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var refreshToken, _yield$this$onRefresh, newAccessToken, newRefreshToken, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(!this.onRefresh || typeof this.onRefresh !== 'function')) {
                _context.n = 1;
                break;
              }
              console.error('onRefresh function not configured. Cannot refresh token.');
              return _context.a(2, false);
            case 1:
              refreshToken = this.getRefreshToken();
              if (refreshToken) {
                _context.n = 2;
                break;
              }
              console.log('No refresh token available.');
              return _context.a(2, false);
            case 2:
              _context.p = 2;
              _context.n = 3;
              return this.onRefresh(refreshToken);
            case 3:
              _yield$this$onRefresh = _context.v;
              newAccessToken = _yield$this$onRefresh.newAccessToken;
              newRefreshToken = _yield$this$onRefresh.newRefreshToken;
              if (newAccessToken) {
                _context.n = 4;
                break;
              }
              throw new Error("Refresh call did not return a new access token.");
            case 4:
              this.login(newAccessToken, newRefreshToken); // Store new tokens
              return _context.a(2, true);
            case 5:
              _context.p = 5;
              _t = _context.v;
              console.error('Failed to refresh token:', _t);
              // If refresh fails (e.g., refresh token is also expired), log the user out.
              this.logout();
              return _context.a(2, false);
          }
        }, _callee, this, [[2, 5]]);
      }));
      function refreshAccessToken() {
        return _refreshAccessToken.apply(this, arguments);
      }
      return refreshAccessToken;
    }())
  }]);
}();

var AuthContext = /*#__PURE__*/createContext(null);
function AuthProvider(_ref) {
  var children = _ref.children,
    config = _ref.config;
  var authClient = useMemo(function () {
    return new JwtAuthClient(config);
  }, [config]);
  var _useState = useState(authClient.getAccessToken()),
    _useState2 = _slicedToArray(_useState, 2),
    accessToken = _useState2[0],
    setAccessToken = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isRefreshing = _useState6[0],
    setIsRefreshing = _useState6[1];

  // Initial check on component mount
  useEffect(function () {
    var initializeAuth = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var refreshToken, success;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!authClient.isAccessTokenExpired()) {
                _context.n = 2;
                break;
              }
              refreshToken = authClient.getRefreshToken();
              if (!refreshToken) {
                _context.n = 2;
                break;
              }
              setIsRefreshing(true);
              _context.n = 1;
              return authClient.refreshAccessToken();
            case 1:
              success = _context.v;
              if (success) {
                setAccessToken(authClient.getAccessToken());
              }
            case 2:
              setLoading(false);
              setIsRefreshing(false);
            case 3:
              return _context.a(2);
          }
        }, _callee);
      }));
      return function initializeAuth() {
        return _ref2.apply(this, arguments);
      };
    }();
    initializeAuth();
  }, [authClient]);
  var isAuthenticated = useMemo(function () {
    return !!accessToken && !authClient.isAccessTokenExpired();
  }, [accessToken, authClient]);
  var userPayload = useMemo(function () {
    return isAuthenticated ? authClient.getPayload() : null;
  }, [isAuthenticated, authClient]);
  var login = useCallback(function (newAccessToken, newRefreshToken) {
    authClient.login(newAccessToken, newRefreshToken);
    setAccessToken(newAccessToken);
  }, [authClient]);
  var logout = useCallback(function () {
    authClient.logout();
    setAccessToken(null);
  }, [authClient]);
  var refreshAccessToken = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var success;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          setIsRefreshing(true);
          _context2.n = 1;
          return authClient.refreshAccessToken();
        case 1:
          success = _context2.v;
          if (success) {
            setAccessToken(authClient.getAccessToken());
          }
          setIsRefreshing(false);
          return _context2.a(2, success);
      }
    }, _callee2);
  })), [authClient]);
  var value = useMemo(function () {
    return {
      isAuthenticated: isAuthenticated,
      userPayload: userPayload,
      accessToken: accessToken,
      login: login,
      logout: logout,
      loading: loading,
      isRefreshing: isRefreshing,
      refreshAccessToken: refreshAccessToken
    };
  }, [isAuthenticated, userPayload, accessToken, login, logout, loading, isRefreshing, refreshAccessToken]);
  return /*#__PURE__*/jsx(AuthContext.Provider, {
    value: value,
    children: children
  });
}
function useAuth() {
  var context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, JwtAuthClient, useAuth };
//# sourceMappingURL=index.esm.js.map
