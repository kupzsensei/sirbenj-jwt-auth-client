'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
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
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
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

/**
 * @class JwtAuthClient
 * @description A client for handling JWT authentication.
 */
var JwtAuthClient = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {JwtAuthClientOptions} [options] - The options for the client.
   */
  function JwtAuthClient() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, JwtAuthClient);
    this.storage = options.storage || window.localStorage;
    this.accessTokenKey = options.accessTokenKey || 'jwt_access_token';
    this.refreshTokenKey = options.refreshTokenKey || 'jwt_refresh_token';
    this.rolesClaim = options.rolesClaim || 'roles';
    this.permissionsClaim = options.permissionsClaim || 'permissions';
    this.onRefresh = options.onRefresh;
    this.onLogin = options.onLogin;
    this.onVerify = options.onVerify;
    this.loginApiConfig = options.loginApiConfig;
    this.refreshApiConfig = options.refreshApiConfig;
    this.verifyApiConfig = options.verifyApiConfig;
  }
  /**
   * Saves the tokens to the configured storage.
   * @param {string} accessToken - The access JWT string.
   * @param {string} [refreshToken] - The optional refresh JWT string.
   */
  return _createClass(JwtAuthClient, [{
    key: "setTokens",
    value: function setTokens(accessToken, refreshToken) {
      if (typeof accessToken !== 'string' || accessToken.split('.').length !== 3) {
        console.error('Invalid Access Token provided to setTokens method.');
        return;
      }
      this.storage.setItem(this.accessTokenKey, accessToken);
      if (refreshToken) {
        this.storage.setItem(this.refreshTokenKey, refreshToken);
      }
    }
    /**
     * Handles the login process by calling the provided onLogin function or a default fetch.
     * @param {object} credentials - User credentials (e.g., { username, password }).
     * @param {string} [loginUrl] - The URL for the login API endpoint. Overrides the one provided in options.
     * @returns {Promise<{ tokenResponse: TokenResponse, apiResponse: any } | null>} The token response data and the full API response if login was successful, null otherwise.
     */
  }, {
    key: "login",
    value: (function () {
      var _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(credentials, loginUrl) {
        var _a, _b, _c, _d, _e, _f, _g, finalLoginUrl, tokenData, rawResponseData, response, accessToken, refreshToken, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              finalLoginUrl = loginUrl || ((_a = this.loginApiConfig) === null || _a === void 0 ? void 0 : _a.url);
              if (!(!this.onLogin && !finalLoginUrl)) {
                _context.n = 1;
                break;
              }
              console.error('Neither onLogin function nor loginUrl/loginApiConfig provided. Cannot perform login.');
              return _context.a(2, null);
            case 1:
              _context.p = 1;
              if (!this.onLogin) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return this.onLogin(credentials);
            case 2:
              tokenData = _context.v;
              // If onLogin is used, we don't have the raw API response unless the user provides it.
              // For now, we'll just return the tokenData as the apiResponse.
              rawResponseData = tokenData;
              _context.n = 9;
              break;
            case 3:
              if (!finalLoginUrl) {
                _context.n = 8;
                break;
              }
              _context.n = 4;
              return fetch(finalLoginUrl, {
                method: ((_b = this.loginApiConfig) === null || _b === void 0 ? void 0 : _b.method) || 'POST',
                headers: _objectSpread2({
                  'Content-Type': 'application/json'
                }, (_c = this.loginApiConfig) === null || _c === void 0 ? void 0 : _c.headers),
                body: JSON.stringify(credentials)
              });
            case 4:
              response = _context.v;
              if (response.ok) {
                _context.n = 5;
                break;
              }
              throw new Error("Login failed with status: ".concat(response.status));
            case 5:
              _context.n = 6;
              return response.json();
            case 6:
              rawResponseData = _context.v;
              accessToken = this.getDeepValue(rawResponseData, (_e = (_d = this.loginApiConfig) === null || _d === void 0 ? void 0 : _d.responseMapping) === null || _e === void 0 ? void 0 : _e.accessToken);
              refreshToken = this.getDeepValue(rawResponseData, (_g = (_f = this.loginApiConfig) === null || _f === void 0 ? void 0 : _f.responseMapping) === null || _g === void 0 ? void 0 : _g.refreshToken);
              if (accessToken) {
                _context.n = 7;
                break;
              }
              throw new Error('Login response did not contain an access token.');
            case 7:
              tokenData = {
                accessToken: accessToken,
                refreshToken: refreshToken
              };
              _context.n = 9;
              break;
            case 8:
              throw new Error('Login function or URL/API config not configured.');
            case 9:
              this.setTokens(tokenData.accessToken, tokenData.refreshToken);
              return _context.a(2, {
                tokenResponse: tokenData,
                apiResponse: rawResponseData
              });
            case 10:
              _context.p = 10;
              _t = _context.v;
              console.error('Login failed:', _t);
              this.logout(); // Clear any existing tokens on login failure
              return _context.a(2, null);
          }
        }, _callee, this, [[1, 10]]);
      }));
      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
    /**
     * Verifies the access token with the backend using the provided onVerify function or verifyApiConfig.
     * @returns {Promise<boolean>} True if token is valid, false otherwise.
     */
    )
  }, {
    key: "verifyToken",
    value: (function () {
      var _verifyToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _a, accessToken, isValid, response, rawResponseData, _isValid, _t2, _t3;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              accessToken = this.getAccessToken();
              if (accessToken) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, false);
            case 1:
              if (!this.onVerify) {
                _context2.n = 5;
                break;
              }
              _context2.p = 2;
              _context2.n = 3;
              return this.onVerify(accessToken);
            case 3:
              isValid = _context2.v;
              if (!isValid) {
                console.warn('Backend verification failed for access token.');
                this.logout(); // Invalidate local session if backend says token is invalid
              }
              return _context2.a(2, isValid);
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              console.error('Error during token verification:', _t2);
              this.logout(); // Logout on verification error
              return _context2.a(2, false);
            case 5:
              if (!this.verifyApiConfig) {
                _context2.n = 10;
                break;
              }
              _context2.p = 6;
              _context2.n = 7;
              return fetch(this.verifyApiConfig.url, {
                method: this.verifyApiConfig.method || 'POST',
                headers: _objectSpread2({
                  'Authorization': "Bearer ".concat(accessToken)
                }, this.verifyApiConfig.headers)
              });
            case 7:
              response = _context2.v;
              _context2.n = 8;
              return response.json();
            case 8:
              rawResponseData = _context2.v;
              _isValid = this.getDeepValue(rawResponseData, (_a = this.verifyApiConfig.responseMapping) === null || _a === void 0 ? void 0 : _a.isValid);
              if (!_isValid) {
                console.warn('Backend verification failed for access token.');
                this.logout();
              }
              return _context2.a(2, _isValid);
            case 9:
              _context2.p = 9;
              _t3 = _context2.v;
              console.error('Error during token verification:', _t3);
              this.logout();
              return _context2.a(2, false);
            case 10:
              console.warn('onVerify function or verifyApiConfig not configured. Assuming token is valid based on local expiration.');
              return _context2.a(2, !this.isAccessTokenExpired());
            case 11:
              return _context2.a(2);
          }
        }, _callee2, this, [[6, 9], [2, 4]]);
      }));
      function verifyToken() {
        return _verifyToken.apply(this, arguments);
      }
      return verifyToken;
    }()
    /**
     * Retrieves roles from the decoded access token payload.
     * @returns {string[]} An array of roles or an empty array if not found.
     */
    )
  }, {
    key: "getRoles",
    value: function getRoles() {
      var payload = this.getPayload();
      if (payload && Array.isArray(payload[this.rolesClaim])) {
        return payload[this.rolesClaim];
      }
      return [];
    }
    /**
     * Checks if the user has a specific role.
     * @param {string} role - The role to check for.
     * @returns {boolean} True if the user has the role, false otherwise.
     */
  }, {
    key: "hasRole",
    value: function hasRole(role) {
      return this.getRoles().includes(role);
    }
    /**
     * Checks if the user has any of the specified roles.
     * @param {string[]} roles - An array of roles to check for.
     * @returns {boolean} True if the user has at least one of the roles, false otherwise.
     */
  }, {
    key: "hasAnyRole",
    value: function hasAnyRole(roles) {
      var userRoles = this.getRoles();
      return roles.some(function (role) {
        return userRoles.includes(role);
      });
    }
    /**
     * Checks if the user has all of the specified roles.
     * @param {string[]} roles - An array of roles to check for.
     * @returns {boolean} True if the user has all of the roles, false otherwise.
     */
  }, {
    key: "hasAllRoles",
    value: function hasAllRoles(roles) {
      var userRoles = this.getRoles();
      return roles.every(function (role) {
        return userRoles.includes(role);
      });
    }
    /**
     * Retrieves permissions from the decoded access token payload.
     * @returns {string[]} An array of permissions or an empty array if not found.
     */
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      var payload = this.getPayload();
      if (payload && Array.isArray(payload[this.permissionsClaim])) {
        return payload[this.permissionsClaim];
      }
      return [];
    }
    /**
     * Checks if the user has a specific permission.
     * @param {string} permission - The permission to check for.
     * @returns {boolean} True if the user has the permission, false otherwise.
     */
  }, {
    key: "hasPermission",
    value: function hasPermission(permission) {
      return this.getPermissions().includes(permission);
    }
    /**
     * Checks if the user has any of the specified permissions.
     * @param {string[]} permissions - An array of permissions to check for.
     * @returns {boolean} True if the user has at least one of the permissions, false otherwise.
     */
  }, {
    key: "hasAnyPermission",
    value: function hasAnyPermission(permissions) {
      var userPermissions = this.getPermissions();
      return permissions.some(function (permission) {
        return userPermissions.includes(permission);
      });
    }
    /**
     * Checks if the user has all of the specified permissions.
     * @param {string[]} permissions - An array of permissions to check for.
     * @returns {boolean} True if the user has all of the permissions, false otherwise.
     */
  }, {
    key: "hasAllPermissions",
    value: function hasAllPermissions(permissions) {
      var userPermissions = this.getPermissions();
      return permissions.every(function (permission) {
        return userPermissions.includes(permission);
      });
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
     * Attempts to refresh the access token using the stored refresh token or refreshApiConfig.
     * @returns {Promise<boolean>} True if refresh was successful, false otherwise.
     */
  }, {
    key: "refreshAccessToken",
    value: (function () {
      var _refreshAccessToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _a, _b, refreshToken, _yield$this$onRefresh, newAccessToken, newRefreshToken, response, responseData, _newAccessToken, _newRefreshToken, _t4, _t5;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              refreshToken = this.getRefreshToken();
              if (refreshToken) {
                _context3.n = 1;
                break;
              }
              console.log('No refresh token available.');
              return _context3.a(2, false);
            case 1:
              if (!this.onRefresh) {
                _context3.n = 6;
                break;
              }
              _context3.p = 2;
              _context3.n = 3;
              return this.onRefresh(refreshToken);
            case 3:
              _yield$this$onRefresh = _context3.v;
              newAccessToken = _yield$this$onRefresh.newAccessToken;
              newRefreshToken = _yield$this$onRefresh.newRefreshToken;
              if (newAccessToken) {
                _context3.n = 4;
                break;
              }
              throw new Error("Refresh call did not return a new access token.");
            case 4:
              this.setTokens(newAccessToken, newRefreshToken); // Store new tokens
              return _context3.a(2, true);
            case 5:
              _context3.p = 5;
              _t4 = _context3.v;
              console.error('Failed to refresh token:', _t4);
              this.logout();
              return _context3.a(2, false);
            case 6:
              if (!this.refreshApiConfig) {
                _context3.n = 13;
                break;
              }
              _context3.p = 7;
              _context3.n = 8;
              return fetch(this.refreshApiConfig.url, {
                method: this.refreshApiConfig.method || 'POST',
                headers: _objectSpread2({
                  'Content-Type': 'application/json'
                }, this.refreshApiConfig.headers),
                body: JSON.stringify({
                  refreshToken: refreshToken
                })
              });
            case 8:
              response = _context3.v;
              if (response.ok) {
                _context3.n = 9;
                break;
              }
              throw new Error("Refresh failed with status: ".concat(response.status));
            case 9:
              _context3.n = 10;
              return response.json();
            case 10:
              responseData = _context3.v;
              _newAccessToken = this.getDeepValue(responseData, (_a = this.refreshApiConfig.responseMapping) === null || _a === void 0 ? void 0 : _a.newAccessToken);
              _newRefreshToken = this.getDeepValue(responseData, (_b = this.refreshApiConfig.responseMapping) === null || _b === void 0 ? void 0 : _b.newRefreshToken);
              if (_newAccessToken) {
                _context3.n = 11;
                break;
              }
              throw new Error("Refresh call did not return a new access token.");
            case 11:
              this.setTokens(_newAccessToken, _newRefreshToken); // Store new tokens
              return _context3.a(2, true);
            case 12:
              _context3.p = 12;
              _t5 = _context3.v;
              console.error('Failed to refresh token:', _t5);
              this.logout();
              return _context3.a(2, false);
            case 13:
              console.error('onRefresh function or refreshApiConfig not configured. Cannot refresh token.');
              return _context3.a(2, false);
            case 14:
              return _context3.a(2);
          }
        }, _callee3, this, [[7, 12], [2, 5]]);
      }));
      function refreshAccessToken() {
        return _refreshAccessToken.apply(this, arguments);
      }
      return refreshAccessToken;
    }()
    /**
     * Safely extracts a value from an object using a dot-notation path.
     * @param obj The object to extract from.
     * @param path The dot-notation path (e.g., 'data.user.id').
     * @returns The extracted value or undefined if not found.
     */
    )
  }, {
    key: "getDeepValue",
    value: function getDeepValue(obj, path) {
      if (!path || !obj) return undefined;
      return path.split('.').reduce(function (acc, part) {
        return acc && acc[part];
      }, obj);
    }
  }]);
}();

var AuthContext = /*#__PURE__*/React.createContext(null);
function AuthProvider(_ref) {
  var children = _ref.children,
    config = _ref.config;
  var authClient = React.useMemo(function () {
    return new JwtAuthClient(config);
  }, [config]);
  var _useState = React.useState(authClient.getAccessToken()),
    _useState2 = _slicedToArray(_useState, 2),
    accessToken = _useState2[0],
    setAccessToken = _useState2[1];
  var _useState3 = React.useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isRefreshing = _useState6[0],
    setIsRefreshing = _useState6[1];
  var _useState7 = React.useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isVerified = _useState8[0],
    setIsVerified = _useState8[1];
  // Initial check on component mount
  React.useEffect(function () {
    var initializeAuth = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var verified, refreshToken, success;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              verified = false;
              if (!authClient.isAccessTokenExpired()) {
                _context.n = 4;
                break;
              }
              refreshToken = authClient.getRefreshToken();
              if (!refreshToken) {
                _context.n = 3;
                break;
              }
              setIsRefreshing(true);
              _context.n = 1;
              return authClient.refreshAccessToken();
            case 1:
              success = _context.v;
              if (!success) {
                _context.n = 3;
                break;
              }
              setAccessToken(authClient.getAccessToken());
              _context.n = 2;
              return authClient.verifyToken();
            case 2:
              verified = _context.v;
            case 3:
              _context.n = 6;
              break;
            case 4:
              _context.n = 5;
              return authClient.verifyToken();
            case 5:
              verified = _context.v;
            case 6:
              setIsVerified(verified);
              setLoading(false);
              setIsRefreshing(false);
            case 7:
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
  var isAuthenticated = React.useMemo(function () {
    return !!accessToken && !authClient.isAccessTokenExpired() && isVerified;
  }, [accessToken, authClient, isVerified]);
  var userPayload = React.useMemo(function () {
    return isAuthenticated ? authClient.getPayload() : null;
  }, [isAuthenticated, authClient]);
  var login = React.useCallback(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(credentials, loginUrl) {
      var result, verified;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            setLoading(true);
            _context2.n = 1;
            return authClient.login(credentials, loginUrl);
          case 1:
            result = _context2.v;
            if (!result) {
              _context2.n = 3;
              break;
            }
            setAccessToken(authClient.getAccessToken());
            _context2.n = 2;
            return authClient.verifyToken();
          case 2:
            verified = _context2.v;
            setIsVerified(verified);
            _context2.n = 4;
            break;
          case 3:
            setAccessToken(null);
            setIsVerified(false);
          case 4:
            setLoading(false);
            return _context2.a(2, result);
        }
      }, _callee2);
    }));
    return function (_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }(), [authClient]);
  var logout = React.useCallback(function () {
    authClient.logout();
    setAccessToken(null);
  }, [authClient]);
  var refreshAccessToken = React.useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var success;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          setIsRefreshing(true);
          _context3.n = 1;
          return authClient.refreshAccessToken();
        case 1:
          success = _context3.v;
          if (success) {
            setAccessToken(authClient.getAccessToken());
          }
          setIsRefreshing(false);
          return _context3.a(2, success);
      }
    }, _callee3);
  })), [authClient]);
  var verifyToken = React.useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var verified;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          setLoading(true);
          _context4.n = 1;
          return authClient.verifyToken();
        case 1:
          verified = _context4.v;
          setIsVerified(verified);
          setLoading(false);
          return _context4.a(2, verified);
      }
    }, _callee4);
  })), [authClient]);
  var value = React.useMemo(function () {
    return {
      isAuthenticated: isAuthenticated,
      userPayload: userPayload,
      accessToken: accessToken,
      login: login,
      logout: logout,
      loading: loading,
      isRefreshing: isRefreshing,
      refreshAccessToken: refreshAccessToken,
      verifyToken: verifyToken,
      getRoles: function getRoles() {
        return authClient.getRoles();
      },
      hasRole: function hasRole(role) {
        return authClient.hasRole(role);
      },
      hasAnyRole: function hasAnyRole(roles) {
        return authClient.hasAnyRole(roles);
      },
      hasAllRoles: function hasAllRoles(roles) {
        return authClient.hasAllRoles(roles);
      },
      getPermissions: function getPermissions() {
        return authClient.getPermissions();
      },
      hasPermission: function hasPermission(permission) {
        return authClient.hasPermission(permission);
      },
      hasAnyPermission: function hasAnyPermission(permissions) {
        return authClient.hasAnyPermission(permissions);
      },
      hasAllPermissions: function hasAllPermissions(permissions) {
        return authClient.hasAllPermissions(permissions);
      }
    };
  }, [isAuthenticated, userPayload, accessToken, login, logout, loading, isRefreshing, refreshAccessToken, verifyToken, authClient]);
  return /*#__PURE__*/React__default["default"].createElement(AuthContext.Provider, {
    value: value
  }, children);
}
function useAuth() {
  var context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

exports.AuthProvider = AuthProvider;
exports.JwtAuthClient = JwtAuthClient;
exports.useAuth = useAuth;
//# sourceMappingURL=index.js.map
