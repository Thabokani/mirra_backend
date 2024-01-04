(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a2, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a2, prop, b2[prop]);
      }
    return a2;
  };
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports2, module2) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = (/* @__PURE__ */ new Date()).getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, currentProgress, showing, progressTimerId = null, fadeTimerId = null, delayTimerId = null, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(
            Math.ceil(currentProgress * canvas.width),
            options.barThickness / 2
          );
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function(delay) {
            if (showing)
              return;
            if (delay) {
              if (delayTimerId)
                return;
              delayTimerId = setTimeout(() => topbar2.show(), delay);
            } else {
              showing = true;
              if (fadeTimerId !== null)
                window2.cancelAnimationFrame(fadeTimerId);
              if (!canvas)
                createCanvas();
              canvas.style.opacity = 1;
              canvas.style.display = "block";
              topbar2.progress(0);
              if (options.autoRun) {
                (function loop() {
                  progressTimerId = window2.requestAnimationFrame(loop);
                  topbar2.progress(
                    "+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2)
                  );
                })();
              }
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            clearTimeout(delayTimerId);
            delayTimerId = null;
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module2 === "object" && typeof module2.exports === "object") {
          module2.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports2, window, document);
    }
  });

  // node_modules/google-protobuf/google-protobuf.js
  var require_google_protobuf = __commonJS({
    "node_modules/google-protobuf/google-protobuf.js"(exports, module) {
      var $jscomp = $jscomp || {};
      $jscomp.scope = {};
      $jscomp.findInternal = function(a2, b2, c2) {
        a2 instanceof String && (a2 = String(a2));
        for (var d2 = a2.length, e2 = 0; e2 < d2; e2++) {
          var f2 = a2[e2];
          if (b2.call(c2, f2, e2, a2))
            return { i: e2, v: f2 };
        }
        return { i: -1, v: void 0 };
      };
      $jscomp.ASSUME_ES5 = false;
      $jscomp.ASSUME_NO_NATIVE_MAP = false;
      $jscomp.ASSUME_NO_NATIVE_SET = false;
      $jscomp.SIMPLE_FROUND_POLYFILL = false;
      $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a2, b2, c2) {
        a2 != Array.prototype && a2 != Object.prototype && (a2[b2] = c2.value);
      };
      $jscomp.getGlobal = function(a2) {
        return "undefined" != typeof window && window === a2 ? a2 : "undefined" != typeof global && null != global ? global : a2;
      };
      $jscomp.global = $jscomp.getGlobal(exports);
      $jscomp.polyfill = function(a2, b2, c2, d2) {
        if (b2) {
          c2 = $jscomp.global;
          a2 = a2.split(".");
          for (d2 = 0; d2 < a2.length - 1; d2++) {
            var e2 = a2[d2];
            e2 in c2 || (c2[e2] = {});
            c2 = c2[e2];
          }
          a2 = a2[a2.length - 1];
          d2 = c2[a2];
          b2 = b2(d2);
          b2 != d2 && null != b2 && $jscomp.defineProperty(c2, a2, { configurable: true, writable: true, value: b2 });
        }
      };
      $jscomp.polyfill("Array.prototype.findIndex", function(a2) {
        return a2 ? a2 : function(a3, c2) {
          return $jscomp.findInternal(this, a3, c2).i;
        };
      }, "es6", "es3");
      $jscomp.checkStringArgs = function(a2, b2, c2) {
        if (null == a2)
          throw new TypeError("The 'this' value for String.prototype." + c2 + " must not be null or undefined");
        if (b2 instanceof RegExp)
          throw new TypeError("First argument to String.prototype." + c2 + " must not be a regular expression");
        return a2 + "";
      };
      $jscomp.polyfill("String.prototype.endsWith", function(a2) {
        return a2 ? a2 : function(a3, c2) {
          var b2 = $jscomp.checkStringArgs(this, a3, "endsWith");
          a3 += "";
          void 0 === c2 && (c2 = b2.length);
          c2 = Math.max(0, Math.min(c2 | 0, b2.length));
          for (var e2 = a3.length; 0 < e2 && 0 < c2; )
            if (b2[--c2] != a3[--e2])
              return false;
          return 0 >= e2;
        };
      }, "es6", "es3");
      $jscomp.polyfill("Array.prototype.find", function(a2) {
        return a2 ? a2 : function(a3, c2) {
          return $jscomp.findInternal(this, a3, c2).v;
        };
      }, "es6", "es3");
      $jscomp.polyfill("String.prototype.startsWith", function(a2) {
        return a2 ? a2 : function(a3, c2) {
          var b2 = $jscomp.checkStringArgs(this, a3, "startsWith");
          a3 += "";
          var e2 = b2.length, f2 = a3.length;
          c2 = Math.max(0, Math.min(c2 | 0, b2.length));
          for (var g = 0; g < f2 && c2 < e2; )
            if (b2[c2++] != a3[g++])
              return false;
          return g >= f2;
        };
      }, "es6", "es3");
      $jscomp.polyfill("String.prototype.repeat", function(a2) {
        return a2 ? a2 : function(a3) {
          var b2 = $jscomp.checkStringArgs(this, null, "repeat");
          if (0 > a3 || 1342177279 < a3)
            throw new RangeError("Invalid count value");
          a3 |= 0;
          for (var d2 = ""; a3; )
            if (a3 & 1 && (d2 += b2), a3 >>>= 1)
              b2 += b2;
          return d2;
        };
      }, "es6", "es3");
      var COMPILED = true;
      var goog = goog || {};
      goog.global = exports || self;
      goog.exportPath_ = function(a2, b2, c2) {
        a2 = a2.split(".");
        c2 = c2 || goog.global;
        a2[0] in c2 || "undefined" == typeof c2.execScript || c2.execScript("var " + a2[0]);
        for (var d2; a2.length && (d2 = a2.shift()); )
          a2.length || void 0 === b2 ? c2 = c2[d2] && c2[d2] !== Object.prototype[d2] ? c2[d2] : c2[d2] = {} : c2[d2] = b2;
      };
      goog.define = function(a2, b2) {
        if (!COMPILED) {
          var c2 = goog.global.CLOSURE_UNCOMPILED_DEFINES, d2 = goog.global.CLOSURE_DEFINES;
          c2 && void 0 === c2.nodeType && Object.prototype.hasOwnProperty.call(c2, a2) ? b2 = c2[a2] : d2 && void 0 === d2.nodeType && Object.prototype.hasOwnProperty.call(d2, a2) && (b2 = d2[a2]);
        }
        return b2;
      };
      goog.FEATURESET_YEAR = 2012;
      goog.DEBUG = true;
      goog.LOCALE = "en";
      goog.TRUSTED_SITE = true;
      goog.STRICT_MODE_COMPATIBLE = false;
      goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
      goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = false;
      goog.provide = function(a2) {
        if (goog.isInModuleLoader_())
          throw Error("goog.provide cannot be used within a module.");
        if (!COMPILED && goog.isProvided_(a2))
          throw Error('Namespace "' + a2 + '" already declared.');
        goog.constructNamespace_(a2);
      };
      goog.constructNamespace_ = function(a2, b2) {
        if (!COMPILED) {
          delete goog.implicitNamespaces_[a2];
          for (var c2 = a2; (c2 = c2.substring(0, c2.lastIndexOf("."))) && !goog.getObjectByName(c2); )
            goog.implicitNamespaces_[c2] = true;
        }
        goog.exportPath_(a2, b2);
      };
      goog.getScriptNonce = function(a2) {
        if (a2 && a2 != goog.global)
          return goog.getScriptNonce_(a2.document);
        null === goog.cspNonce_ && (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document));
        return goog.cspNonce_;
      };
      goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
      goog.cspNonce_ = null;
      goog.getScriptNonce_ = function(a2) {
        return (a2 = a2.querySelector && a2.querySelector("script[nonce]")) && (a2 = a2.nonce || a2.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(a2) ? a2 : "";
      };
      goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
      goog.module = function(a2) {
        if ("string" !== typeof a2 || !a2 || -1 == a2.search(goog.VALID_MODULE_RE_))
          throw Error("Invalid module identifier");
        if (!goog.isInGoogModuleLoader_())
          throw Error("Module " + a2 + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
        if (goog.moduleLoaderState_.moduleName)
          throw Error("goog.module may only be called once per module.");
        goog.moduleLoaderState_.moduleName = a2;
        if (!COMPILED) {
          if (goog.isProvided_(a2))
            throw Error('Namespace "' + a2 + '" already declared.');
          delete goog.implicitNamespaces_[a2];
        }
      };
      goog.module.get = function(a2) {
        return goog.module.getInternal_(a2);
      };
      goog.module.getInternal_ = function(a2) {
        if (!COMPILED) {
          if (a2 in goog.loadedModules_)
            return goog.loadedModules_[a2].exports;
          if (!goog.implicitNamespaces_[a2])
            return a2 = goog.getObjectByName(a2), null != a2 ? a2 : null;
        }
        return null;
      };
      goog.ModuleType = { ES6: "es6", GOOG: "goog" };
      goog.moduleLoaderState_ = null;
      goog.isInModuleLoader_ = function() {
        return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
      };
      goog.isInGoogModuleLoader_ = function() {
        return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
      };
      goog.isInEs6ModuleLoader_ = function() {
        if (goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6)
          return true;
        var a2 = goog.global.$jscomp;
        return a2 ? "function" != typeof a2.getCurrentModulePath ? false : !!a2.getCurrentModulePath() : false;
      };
      goog.module.declareLegacyNamespace = function() {
        if (!COMPILED && !goog.isInGoogModuleLoader_())
          throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
        if (!COMPILED && !goog.moduleLoaderState_.moduleName)
          throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
        goog.moduleLoaderState_.declareLegacyNamespace = true;
      };
      goog.declareModuleId = function(a2) {
        if (!COMPILED) {
          if (!goog.isInEs6ModuleLoader_())
            throw Error("goog.declareModuleId may only be called from within an ES6 module");
          if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName)
            throw Error("goog.declareModuleId may only be called once per module.");
          if (a2 in goog.loadedModules_)
            throw Error('Module with namespace "' + a2 + '" already exists.');
        }
        if (goog.moduleLoaderState_)
          goog.moduleLoaderState_.moduleName = a2;
        else {
          var b2 = goog.global.$jscomp;
          if (!b2 || "function" != typeof b2.getCurrentModulePath)
            throw Error('Module with namespace "' + a2 + '" has been loaded incorrectly.');
          b2 = b2.require(b2.getCurrentModulePath());
          goog.loadedModules_[a2] = { exports: b2, type: goog.ModuleType.ES6, moduleId: a2 };
        }
      };
      goog.setTestOnly = function(a2) {
        if (goog.DISALLOW_TEST_ONLY_CODE)
          throw a2 = a2 || "", Error("Importing test-only code into non-debug environment" + (a2 ? ": " + a2 : "."));
      };
      goog.forwardDeclare = function(a2) {
      };
      COMPILED || (goog.isProvided_ = function(a2) {
        return a2 in goog.loadedModules_ || !goog.implicitNamespaces_[a2] && null != goog.getObjectByName(a2);
      }, goog.implicitNamespaces_ = { "goog.module": true });
      goog.getObjectByName = function(a2, b2) {
        a2 = a2.split(".");
        b2 = b2 || goog.global;
        for (var c2 = 0; c2 < a2.length; c2++)
          if (b2 = b2[a2[c2]], null == b2)
            return null;
        return b2;
      };
      goog.globalize = function(a2, b2) {
        b2 = b2 || goog.global;
        for (var c2 in a2)
          b2[c2] = a2[c2];
      };
      goog.addDependency = function(a2, b2, c2, d2) {
        !COMPILED && goog.DEPENDENCIES_ENABLED && goog.debugLoader_.addDependency(a2, b2, c2, d2);
      };
      goog.ENABLE_DEBUG_LOADER = true;
      goog.logToConsole_ = function(a2) {
        goog.global.console && goog.global.console.error(a2);
      };
      goog.require = function(a2) {
        if (!COMPILED) {
          goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(a2);
          if (goog.isProvided_(a2)) {
            if (goog.isInModuleLoader_())
              return goog.module.getInternal_(a2);
          } else if (goog.ENABLE_DEBUG_LOADER) {
            var b2 = goog.moduleLoaderState_;
            goog.moduleLoaderState_ = null;
            try {
              goog.debugLoader_.load_(a2);
            } finally {
              goog.moduleLoaderState_ = b2;
            }
          }
          return null;
        }
      };
      goog.requireType = function(a2) {
        return {};
      };
      goog.basePath = "";
      goog.nullFunction = function() {
      };
      goog.abstractMethod = function() {
        throw Error("unimplemented abstract method");
      };
      goog.addSingletonGetter = function(a2) {
        a2.instance_ = void 0;
        a2.getInstance = function() {
          if (a2.instance_)
            return a2.instance_;
          goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a2);
          return a2.instance_ = new a2();
        };
      };
      goog.instantiatedSingletons_ = [];
      goog.LOAD_MODULE_USING_EVAL = true;
      goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
      goog.loadedModules_ = {};
      goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
      goog.TRANSPILE = "detect";
      goog.ASSUME_ES_MODULES_TRANSPILED = false;
      goog.TRANSPILE_TO_LANGUAGE = "";
      goog.TRANSPILER = "transpile.js";
      goog.hasBadLetScoping = null;
      goog.useSafari10Workaround = function() {
        if (null == goog.hasBadLetScoping) {
          try {
            var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";');
          } catch (b2) {
            a = false;
          }
          goog.hasBadLetScoping = a;
        }
        return goog.hasBadLetScoping;
      };
      goog.workaroundSafari10EvalBug = function(a2) {
        return "(function(){" + a2 + "\n;})();\n";
      };
      goog.loadModule = function(a2) {
        var b2 = goog.moduleLoaderState_;
        try {
          goog.moduleLoaderState_ = { moduleName: "", declareLegacyNamespace: false, type: goog.ModuleType.GOOG };
          if (goog.isFunction(a2))
            var c2 = a2.call(void 0, {});
          else if ("string" === typeof a2)
            goog.useSafari10Workaround() && (a2 = goog.workaroundSafari10EvalBug(a2)), c2 = goog.loadModuleFromSource_.call(void 0, a2);
          else
            throw Error("Invalid module definition");
          var d2 = goog.moduleLoaderState_.moduleName;
          if ("string" === typeof d2 && d2)
            goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(
              d2,
              c2
            ) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof c2 && null != c2 && Object.seal(c2), goog.loadedModules_[d2] = { exports: c2, type: goog.ModuleType.GOOG, moduleId: goog.moduleLoaderState_.moduleName };
          else
            throw Error('Invalid module name "' + d2 + '"');
        } finally {
          goog.moduleLoaderState_ = b2;
        }
      };
      goog.loadModuleFromSource_ = function(a) {
        eval(a);
        return {};
      };
      goog.normalizePath_ = function(a2) {
        a2 = a2.split("/");
        for (var b2 = 0; b2 < a2.length; )
          "." == a2[b2] ? a2.splice(b2, 1) : b2 && ".." == a2[b2] && a2[b2 - 1] && ".." != a2[b2 - 1] ? a2.splice(--b2, 2) : b2++;
        return a2.join("/");
      };
      goog.loadFileSync_ = function(a2) {
        if (goog.global.CLOSURE_LOAD_FILE_SYNC)
          return goog.global.CLOSURE_LOAD_FILE_SYNC(a2);
        try {
          var b2 = new goog.global.XMLHttpRequest();
          b2.open("get", a2, false);
          b2.send();
          return 0 == b2.status || 200 == b2.status ? b2.responseText : null;
        } catch (c2) {
          return null;
        }
      };
      goog.transpile_ = function(a2, b2, c2) {
        var d2 = goog.global.$jscomp;
        d2 || (goog.global.$jscomp = d2 = {});
        var e2 = d2.transpile;
        if (!e2) {
          var f2 = goog.basePath + goog.TRANSPILER, g = goog.loadFileSync_(f2);
          if (g) {
            (function() {
              (0, eval)(g + "\n//# sourceURL=" + f2);
            }).call(goog.global);
            if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile)
              throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
            goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
            d2 = goog.global.$jscomp;
            e2 = d2.transpile;
          }
        }
        e2 || (e2 = d2.transpile = function(a3, b3) {
          goog.logToConsole_(b3 + " requires transpilation but no transpiler was found.");
          return a3;
        });
        return e2(a2, b2, c2);
      };
      goog.typeOf = function(a2) {
        var b2 = typeof a2;
        if ("object" == b2)
          if (a2) {
            if (a2 instanceof Array)
              return "array";
            if (a2 instanceof Object)
              return b2;
            var c2 = Object.prototype.toString.call(a2);
            if ("[object Window]" == c2)
              return "object";
            if ("[object Array]" == c2 || "number" == typeof a2.length && "undefined" != typeof a2.splice && "undefined" != typeof a2.propertyIsEnumerable && !a2.propertyIsEnumerable("splice"))
              return "array";
            if ("[object Function]" == c2 || "undefined" != typeof a2.call && "undefined" != typeof a2.propertyIsEnumerable && !a2.propertyIsEnumerable("call"))
              return "function";
          } else
            return "null";
        else if ("function" == b2 && "undefined" == typeof a2.call)
          return "object";
        return b2;
      };
      goog.isArray = function(a2) {
        return "array" == goog.typeOf(a2);
      };
      goog.isArrayLike = function(a2) {
        var b2 = goog.typeOf(a2);
        return "array" == b2 || "object" == b2 && "number" == typeof a2.length;
      };
      goog.isDateLike = function(a2) {
        return goog.isObject(a2) && "function" == typeof a2.getFullYear;
      };
      goog.isFunction = function(a2) {
        return "function" == goog.typeOf(a2);
      };
      goog.isObject = function(a2) {
        var b2 = typeof a2;
        return "object" == b2 && null != a2 || "function" == b2;
      };
      goog.getUid = function(a2) {
        return Object.prototype.hasOwnProperty.call(a2, goog.UID_PROPERTY_) && a2[goog.UID_PROPERTY_] || (a2[goog.UID_PROPERTY_] = ++goog.uidCounter_);
      };
      goog.hasUid = function(a2) {
        return !!a2[goog.UID_PROPERTY_];
      };
      goog.removeUid = function(a2) {
        null !== a2 && "removeAttribute" in a2 && a2.removeAttribute(goog.UID_PROPERTY_);
        try {
          delete a2[goog.UID_PROPERTY_];
        } catch (b2) {
        }
      };
      goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
      goog.uidCounter_ = 0;
      goog.getHashCode = goog.getUid;
      goog.removeHashCode = goog.removeUid;
      goog.cloneObject = function(a2) {
        var b2 = goog.typeOf(a2);
        if ("object" == b2 || "array" == b2) {
          if ("function" === typeof a2.clone)
            return a2.clone();
          b2 = "array" == b2 ? [] : {};
          for (var c2 in a2)
            b2[c2] = goog.cloneObject(a2[c2]);
          return b2;
        }
        return a2;
      };
      goog.bindNative_ = function(a2, b2, c2) {
        return a2.call.apply(a2.bind, arguments);
      };
      goog.bindJs_ = function(a2, b2, c2) {
        if (!a2)
          throw Error();
        if (2 < arguments.length) {
          var d2 = Array.prototype.slice.call(arguments, 2);
          return function() {
            var c3 = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c3, d2);
            return a2.apply(b2, c3);
          };
        }
        return function() {
          return a2.apply(b2, arguments);
        };
      };
      goog.bind = function(a2, b2, c2) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
        return goog.bind.apply(null, arguments);
      };
      goog.partial = function(a2, b2) {
        var c2 = Array.prototype.slice.call(arguments, 1);
        return function() {
          var b3 = c2.slice();
          b3.push.apply(b3, arguments);
          return a2.apply(this, b3);
        };
      };
      goog.mixin = function(a2, b2) {
        for (var c2 in b2)
          a2[c2] = b2[c2];
      };
      goog.now = goog.TRUSTED_SITE && Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      goog.globalEval = function(a2) {
        if (goog.global.execScript)
          goog.global.execScript(a2, "JavaScript");
        else if (goog.global.eval) {
          if (null == goog.evalWorksForGlobals_) {
            try {
              goog.global.eval("var _evalTest_ = 1;");
            } catch (d2) {
            }
            if ("undefined" != typeof goog.global._evalTest_) {
              try {
                delete goog.global._evalTest_;
              } catch (d2) {
              }
              goog.evalWorksForGlobals_ = true;
            } else
              goog.evalWorksForGlobals_ = false;
          }
          if (goog.evalWorksForGlobals_)
            goog.global.eval(a2);
          else {
            var b2 = goog.global.document, c2 = b2.createElement("script");
            c2.type = "text/javascript";
            c2.defer = false;
            c2.appendChild(b2.createTextNode(a2));
            b2.head.appendChild(c2);
            b2.head.removeChild(c2);
          }
        } else
          throw Error("goog.globalEval not available");
      };
      goog.evalWorksForGlobals_ = null;
      goog.getCssName = function(a2, b2) {
        if ("." == String(a2).charAt(0))
          throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a2);
        var c2 = function(a3) {
          return goog.cssNameMapping_[a3] || a3;
        }, d2 = function(a3) {
          a3 = a3.split("-");
          for (var b3 = [], d3 = 0; d3 < a3.length; d3++)
            b3.push(c2(a3[d3]));
          return b3.join("-");
        };
        d2 = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c2 : d2 : function(a3) {
          return a3;
        };
        a2 = b2 ? a2 + "-" + d2(b2) : d2(a2);
        return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a2) : a2;
      };
      goog.setCssNameMapping = function(a2, b2) {
        goog.cssNameMapping_ = a2;
        goog.cssNameMappingStyle_ = b2;
      };
      !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
      goog.getMsg = function(a2, b2, c2) {
        c2 && c2.html && (a2 = a2.replace(/</g, "&lt;"));
        b2 && (a2 = a2.replace(/\{\$([^}]+)}/g, function(a3, c3) {
          return null != b2 && c3 in b2 ? b2[c3] : a3;
        }));
        return a2;
      };
      goog.getMsgWithFallback = function(a2, b2) {
        return a2;
      };
      goog.exportSymbol = function(a2, b2, c2) {
        goog.exportPath_(a2, b2, c2);
      };
      goog.exportProperty = function(a2, b2, c2) {
        a2[b2] = c2;
      };
      goog.inherits = function(a2, b2) {
        function c2() {
        }
        c2.prototype = b2.prototype;
        a2.superClass_ = b2.prototype;
        a2.prototype = new c2();
        a2.prototype.constructor = a2;
        a2.base = function(a3, c3, f2) {
          for (var d2 = Array(arguments.length - 2), e2 = 2; e2 < arguments.length; e2++)
            d2[e2 - 2] = arguments[e2];
          return b2.prototype[c3].apply(a3, d2);
        };
      };
      goog.scope = function(a2) {
        if (goog.isInModuleLoader_())
          throw Error("goog.scope is not supported within a module.");
        a2.call(goog.global);
      };
      COMPILED || (goog.global.COMPILED = COMPILED);
      goog.defineClass = function(a2, b2) {
        var c2 = b2.constructor, d2 = b2.statics;
        c2 && c2 != Object.prototype.constructor || (c2 = function() {
          throw Error("cannot instantiate an interface (no constructor defined).");
        });
        c2 = goog.defineClass.createSealingConstructor_(c2, a2);
        a2 && goog.inherits(c2, a2);
        delete b2.constructor;
        delete b2.statics;
        goog.defineClass.applyProperties_(c2.prototype, b2);
        null != d2 && (d2 instanceof Function ? d2(c2) : goog.defineClass.applyProperties_(c2, d2));
        return c2;
      };
      goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
      goog.defineClass.createSealingConstructor_ = function(a2, b2) {
        if (!goog.defineClass.SEAL_CLASS_INSTANCES)
          return a2;
        var c2 = !goog.defineClass.isUnsealable_(b2), d2 = function() {
          var b3 = a2.apply(this, arguments) || this;
          b3[goog.UID_PROPERTY_] = b3[goog.UID_PROPERTY_];
          this.constructor === d2 && c2 && Object.seal instanceof Function && Object.seal(b3);
          return b3;
        };
        return d2;
      };
      goog.defineClass.isUnsealable_ = function(a2) {
        return a2 && a2.prototype && a2.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
      };
      goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
      goog.defineClass.applyProperties_ = function(a2, b2) {
        for (var c2 in b2)
          Object.prototype.hasOwnProperty.call(b2, c2) && (a2[c2] = b2[c2]);
        for (var d2 = 0; d2 < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d2++)
          c2 = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d2], Object.prototype.hasOwnProperty.call(b2, c2) && (a2[c2] = b2[c2]);
      };
      goog.tagUnsealableClass = function(a2) {
        !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a2.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = true);
      };
      goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
      !COMPILED && goog.DEPENDENCIES_ENABLED && (goog.inHtmlDocument_ = function() {
        var a2 = goog.global.document;
        return null != a2 && "write" in a2;
      }, goog.isDocumentLoading_ = function() {
        var a2 = goog.global.document;
        return a2.attachEvent ? "complete" != a2.readyState : "loading" == a2.readyState;
      }, goog.findBasePath_ = function() {
        if (void 0 != goog.global.CLOSURE_BASE_PATH && "string" === typeof goog.global.CLOSURE_BASE_PATH)
          goog.basePath = goog.global.CLOSURE_BASE_PATH;
        else if (goog.inHtmlDocument_()) {
          var a2 = goog.global.document, b2 = a2.currentScript;
          a2 = b2 ? [b2] : a2.getElementsByTagName("SCRIPT");
          for (b2 = a2.length - 1; 0 <= b2; --b2) {
            var c2 = a2[b2].src, d2 = c2.lastIndexOf("?");
            d2 = -1 == d2 ? c2.length : d2;
            if ("base.js" == c2.substr(d2 - 7, 7)) {
              goog.basePath = c2.substr(0, d2 - 7);
              break;
            }
          }
        }
      }, goog.findBasePath_(), goog.Transpiler = function() {
        this.requiresTranspilation_ = null;
        this.transpilationTarget_ = goog.TRANSPILE_TO_LANGUAGE;
      }, goog.Transpiler.prototype.createRequiresTranspilation_ = function() {
        function a(a2, b2) {
          e ? d[a2] = true : b2() ? (c = a2, d[a2] = false) : e = d[a2] = true;
        }
        function b(a) {
          try {
            return !!eval(a);
          } catch (h) {
            return false;
          }
        }
        var c = "es3", d = { es3: false }, e = false, f = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
        a("es5", function() {
          return b("[1,].length==1");
        });
        a("es6", function() {
          return f.match(/Edge\/(\d+)(\.\d)*/i) ? false : b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()');
        });
        a("es7", function() {
          return b("2 ** 2 == 4");
        });
        a("es8", function() {
          return b("async () => 1, true");
        });
        a("es9", function() {
          return b("({...rest} = {}), true");
        });
        a("es_next", function() {
          return false;
        });
        return { target: c, map: d };
      }, goog.Transpiler.prototype.needsTranspile = function(a2, b2) {
        if ("always" == goog.TRANSPILE)
          return true;
        if ("never" == goog.TRANSPILE)
          return false;
        if (!this.requiresTranspilation_) {
          var c2 = this.createRequiresTranspilation_();
          this.requiresTranspilation_ = c2.map;
          this.transpilationTarget_ = this.transpilationTarget_ || c2.target;
        }
        if (a2 in this.requiresTranspilation_)
          return this.requiresTranspilation_[a2] ? true : !goog.inHtmlDocument_() || "es6" != b2 || "noModule" in goog.global.document.createElement("script") ? false : true;
        throw Error("Unknown language mode: " + a2);
      }, goog.Transpiler.prototype.transpile = function(a2, b2) {
        return goog.transpile_(a2, b2, this.transpilationTarget_);
      }, goog.transpiler_ = new goog.Transpiler(), goog.protectScriptTag_ = function(a2) {
        return a2.replace(/<\/(SCRIPT)/ig, "\\x3c/$1");
      }, goog.DebugLoader_ = function() {
        this.dependencies_ = {};
        this.idToPath_ = {};
        this.written_ = {};
        this.loadingDeps_ = [];
        this.depsToLoad_ = [];
        this.paused_ = false;
        this.factory_ = new goog.DependencyFactory(goog.transpiler_);
        this.deferredCallbacks_ = {};
        this.deferredQueue_ = [];
      }, goog.DebugLoader_.prototype.bootstrap = function(a2, b2) {
        function c2() {
          d2 && (goog.global.setTimeout(d2, 0), d2 = null);
        }
        var d2 = b2;
        if (a2.length) {
          b2 = [];
          for (var e2 = 0; e2 < a2.length; e2++) {
            var f2 = this.getPathFromDeps_(a2[e2]);
            if (!f2)
              throw Error("Unregonized namespace: " + a2[e2]);
            b2.push(this.dependencies_[f2]);
          }
          f2 = goog.require;
          var g = 0;
          for (e2 = 0; e2 < a2.length; e2++)
            f2(a2[e2]), b2[e2].onLoad(function() {
              ++g == a2.length && c2();
            });
        } else
          c2();
      }, goog.DebugLoader_.prototype.loadClosureDeps = function() {
        this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath + "deps.js"), "deps.js", [], [], {}, false));
        this.loadDeps_();
      }, goog.DebugLoader_.prototype.requested = function(a2, b2) {
        (a2 = this.getPathFromDeps_(a2)) && (b2 || this.areDepsLoaded_(this.dependencies_[a2].requires)) && (b2 = this.deferredCallbacks_[a2]) && (delete this.deferredCallbacks_[a2], b2());
      }, goog.DebugLoader_.prototype.setDependencyFactory = function(a2) {
        this.factory_ = a2;
      }, goog.DebugLoader_.prototype.load_ = function(a2) {
        if (this.getPathFromDeps_(a2)) {
          var b2 = this, c2 = [], d2 = function(a3) {
            var e2 = b2.getPathFromDeps_(a3);
            if (!e2)
              throw Error("Bad dependency path or symbol: " + a3);
            if (!b2.written_[e2]) {
              b2.written_[e2] = true;
              a3 = b2.dependencies_[e2];
              for (e2 = 0; e2 < a3.requires.length; e2++)
                goog.isProvided_(a3.requires[e2]) || d2(a3.requires[e2]);
              c2.push(a3);
            }
          };
          d2(a2);
          a2 = !!this.depsToLoad_.length;
          this.depsToLoad_ = this.depsToLoad_.concat(c2);
          this.paused_ || a2 || this.loadDeps_();
        } else
          throw a2 = "goog.require could not find: " + a2, goog.logToConsole_(a2), Error(a2);
      }, goog.DebugLoader_.prototype.loadDeps_ = function() {
        for (var a2 = this, b2 = this.paused_; this.depsToLoad_.length && !b2; )
          (function() {
            var c2 = false, d2 = a2.depsToLoad_.shift(), e2 = false;
            a2.loading_(d2);
            var f2 = { pause: function() {
              if (c2)
                throw Error("Cannot call pause after the call to load.");
              b2 = true;
            }, resume: function() {
              c2 ? a2.resume_() : b2 = false;
            }, loaded: function() {
              if (e2)
                throw Error("Double call to loaded.");
              e2 = true;
              a2.loaded_(d2);
            }, pending: function() {
              for (var b3 = [], c3 = 0; c3 < a2.loadingDeps_.length; c3++)
                b3.push(a2.loadingDeps_[c3]);
              return b3;
            }, setModuleState: function(a3) {
              goog.moduleLoaderState_ = { type: a3, moduleName: "", declareLegacyNamespace: false };
            }, registerEs6ModuleExports: function(a3, b3, c3) {
              c3 && (goog.loadedModules_[c3] = { exports: b3, type: goog.ModuleType.ES6, moduleId: c3 || "" });
            }, registerGoogModuleExports: function(a3, b3) {
              goog.loadedModules_[a3] = { exports: b3, type: goog.ModuleType.GOOG, moduleId: a3 };
            }, clearModuleState: function() {
              goog.moduleLoaderState_ = null;
            }, defer: function(b3) {
              if (c2)
                throw Error("Cannot register with defer after the call to load.");
              a2.defer_(
                d2,
                b3
              );
            }, areDepsLoaded: function() {
              return a2.areDepsLoaded_(d2.requires);
            } };
            try {
              d2.load(f2);
            } finally {
              c2 = true;
            }
          })();
        b2 && this.pause_();
      }, goog.DebugLoader_.prototype.pause_ = function() {
        this.paused_ = true;
      }, goog.DebugLoader_.prototype.resume_ = function() {
        this.paused_ && (this.paused_ = false, this.loadDeps_());
      }, goog.DebugLoader_.prototype.loading_ = function(a2) {
        this.loadingDeps_.push(a2);
      }, goog.DebugLoader_.prototype.loaded_ = function(a2) {
        for (var b2 = 0; b2 < this.loadingDeps_.length; b2++)
          if (this.loadingDeps_[b2] == a2) {
            this.loadingDeps_.splice(b2, 1);
            break;
          }
        for (b2 = 0; b2 < this.deferredQueue_.length; b2++)
          if (this.deferredQueue_[b2] == a2.path) {
            this.deferredQueue_.splice(b2, 1);
            break;
          }
        if (this.loadingDeps_.length == this.deferredQueue_.length && !this.depsToLoad_.length)
          for (; this.deferredQueue_.length; )
            this.requested(this.deferredQueue_.shift(), true);
        a2.loaded();
      }, goog.DebugLoader_.prototype.areDepsLoaded_ = function(a2) {
        for (var b2 = 0; b2 < a2.length; b2++) {
          var c2 = this.getPathFromDeps_(a2[b2]);
          if (!c2 || !(c2 in this.deferredCallbacks_ || goog.isProvided_(a2[b2])))
            return false;
        }
        return true;
      }, goog.DebugLoader_.prototype.getPathFromDeps_ = function(a2) {
        return a2 in this.idToPath_ ? this.idToPath_[a2] : a2 in this.dependencies_ ? a2 : null;
      }, goog.DebugLoader_.prototype.defer_ = function(a2, b2) {
        this.deferredCallbacks_[a2.path] = b2;
        this.deferredQueue_.push(a2.path);
      }, goog.LoadController = function() {
      }, goog.LoadController.prototype.pause = function() {
      }, goog.LoadController.prototype.resume = function() {
      }, goog.LoadController.prototype.loaded = function() {
      }, goog.LoadController.prototype.pending = function() {
      }, goog.LoadController.prototype.registerEs6ModuleExports = function(a2, b2, c2) {
      }, goog.LoadController.prototype.setModuleState = function(a2) {
      }, goog.LoadController.prototype.clearModuleState = function() {
      }, goog.LoadController.prototype.defer = function(a2) {
      }, goog.LoadController.prototype.areDepsLoaded = function() {
      }, goog.Dependency = function(a2, b2, c2, d2, e2) {
        this.path = a2;
        this.relativePath = b2;
        this.provides = c2;
        this.requires = d2;
        this.loadFlags = e2;
        this.loaded_ = false;
        this.loadCallbacks_ = [];
      }, goog.Dependency.prototype.getPathName = function() {
        var a2 = this.path, b2 = a2.indexOf("://");
        0 <= b2 && (a2 = a2.substring(b2 + 3), b2 = a2.indexOf("/"), 0 <= b2 && (a2 = a2.substring(b2 + 1)));
        return a2;
      }, goog.Dependency.prototype.onLoad = function(a2) {
        this.loaded_ ? a2() : this.loadCallbacks_.push(a2);
      }, goog.Dependency.prototype.loaded = function() {
        this.loaded_ = true;
        var a2 = this.loadCallbacks_;
        this.loadCallbacks_ = [];
        for (var b2 = 0; b2 < a2.length; b2++)
          a2[b2]();
      }, goog.Dependency.defer_ = false, goog.Dependency.callbackMap_ = {}, goog.Dependency.registerCallback_ = function(a2) {
        var b2 = Math.random().toString(32);
        goog.Dependency.callbackMap_[b2] = a2;
        return b2;
      }, goog.Dependency.unregisterCallback_ = function(a2) {
        delete goog.Dependency.callbackMap_[a2];
      }, goog.Dependency.callback_ = function(a2, b2) {
        if (a2 in goog.Dependency.callbackMap_) {
          for (var c2 = goog.Dependency.callbackMap_[a2], d2 = [], e2 = 1; e2 < arguments.length; e2++)
            d2.push(arguments[e2]);
          c2.apply(void 0, d2);
        } else
          throw Error("Callback key " + a2 + " does not exist (was base.js loaded more than once?).");
      }, goog.Dependency.prototype.load = function(a2) {
        if (goog.global.CLOSURE_IMPORT_SCRIPT)
          goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a2.loaded() : a2.pause();
        else if (goog.inHtmlDocument_()) {
          var b2 = goog.global.document;
          if ("complete" == b2.readyState && !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
            if (/\bdeps.js$/.test(this.path)) {
              a2.loaded();
              return;
            }
            throw Error('Cannot write "' + this.path + '" after document load');
          }
          if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && goog.isDocumentLoading_()) {
            var c2 = goog.Dependency.registerCallback_(function(b3) {
              goog.DebugLoader_.IS_OLD_IE_ && "complete" != b3.readyState || (goog.Dependency.unregisterCallback_(c2), a2.loaded());
            }), d2 = !goog.DebugLoader_.IS_OLD_IE_ && goog.getScriptNonce() ? ' nonce="' + goog.getScriptNonce() + '"' : "";
            d2 = '<script src="' + this.path + '" ' + (goog.DebugLoader_.IS_OLD_IE_ ? "onreadystatechange" : "onload") + `="goog.Dependency.callback_('` + c2 + `', this)" type="text/javascript" ` + (goog.Dependency.defer_ ? "defer" : "") + d2 + "><\/script>";
            b2.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(d2) : d2);
          } else {
            var e2 = b2.createElement("script");
            e2.defer = goog.Dependency.defer_;
            e2.async = false;
            e2.type = "text/javascript";
            (d2 = goog.getScriptNonce()) && e2.setAttribute("nonce", d2);
            goog.DebugLoader_.IS_OLD_IE_ ? (a2.pause(), e2.onreadystatechange = function() {
              if ("loaded" == e2.readyState || "complete" == e2.readyState)
                a2.loaded(), a2.resume();
            }) : e2.onload = function() {
              e2.onload = null;
              a2.loaded();
            };
            e2.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path) : this.path;
            b2.head.appendChild(e2);
          }
        } else
          goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), "deps.js" == this.relativePath ? (goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."), a2.loaded()) : a2.pause();
      }, goog.Es6ModuleDependency = function(a2, b2, c2, d2, e2) {
        goog.Dependency.call(this, a2, b2, c2, d2, e2);
      }, goog.inherits(goog.Es6ModuleDependency, goog.Dependency), goog.Es6ModuleDependency.prototype.load = function(a2) {
        function b2(a3, b3) {
          a3 = b3 ? '<script type="module" crossorigin>' + b3 + "<\/script>" : '<script type="module" crossorigin src="' + a3 + '"><\/script>';
          d2.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(a3) : a3);
        }
        function c2(a3, b3) {
          var c3 = d2.createElement("script");
          c3.defer = true;
          c3.async = false;
          c3.type = "module";
          c3.setAttribute("crossorigin", true);
          var e3 = goog.getScriptNonce();
          e3 && c3.setAttribute("nonce", e3);
          b3 ? c3.textContent = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScript(b3) : b3 : c3.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(a3) : a3;
          d2.head.appendChild(c3);
        }
        if (goog.global.CLOSURE_IMPORT_SCRIPT)
          goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a2.loaded() : a2.pause();
        else if (goog.inHtmlDocument_()) {
          var d2 = goog.global.document, e2 = this;
          if (goog.isDocumentLoading_()) {
            var f2 = b2;
            goog.Dependency.defer_ = true;
          } else
            f2 = c2;
          var g = goog.Dependency.registerCallback_(function() {
            goog.Dependency.unregisterCallback_(g);
            a2.setModuleState(goog.ModuleType.ES6);
          });
          f2(void 0, 'goog.Dependency.callback_("' + g + '")');
          f2(this.path, void 0);
          var h = goog.Dependency.registerCallback_(function(b3) {
            goog.Dependency.unregisterCallback_(h);
            a2.registerEs6ModuleExports(e2.path, b3, goog.moduleLoaderState_.moduleName);
          });
          f2(void 0, 'import * as m from "' + this.path + '"; goog.Dependency.callback_("' + h + '", m)');
          var k = goog.Dependency.registerCallback_(function() {
            goog.Dependency.unregisterCallback_(k);
            a2.clearModuleState();
            a2.loaded();
          });
          f2(void 0, 'goog.Dependency.callback_("' + k + '")');
        } else
          goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), a2.pause();
      }, goog.TransformedDependency = function(a2, b2, c2, d2, e2) {
        goog.Dependency.call(this, a2, b2, c2, d2, e2);
        this.contents_ = null;
        this.lazyFetch_ = !goog.inHtmlDocument_() || !("noModule" in goog.global.document.createElement("script"));
      }, goog.inherits(goog.TransformedDependency, goog.Dependency), goog.TransformedDependency.prototype.load = function(a2) {
        function b2() {
          e2.contents_ = goog.loadFileSync_(e2.path);
          e2.contents_ && (e2.contents_ = e2.transform(e2.contents_), e2.contents_ && (e2.contents_ += "\n//# sourceURL=" + e2.path));
        }
        function c2() {
          e2.lazyFetch_ && b2();
          if (e2.contents_) {
            f2 && a2.setModuleState(goog.ModuleType.ES6);
            try {
              var c3 = e2.contents_;
              e2.contents_ = null;
              goog.globalEval(c3);
              if (f2)
                var d3 = goog.moduleLoaderState_.moduleName;
            } finally {
              f2 && a2.clearModuleState();
            }
            f2 && goog.global.$jscomp.require.ensure([e2.getPathName()], function() {
              a2.registerEs6ModuleExports(
                e2.path,
                goog.global.$jscomp.require(e2.getPathName()),
                d3
              );
            });
            a2.loaded();
          }
        }
        function d2() {
          var a3 = goog.global.document, b3 = goog.Dependency.registerCallback_(function() {
            goog.Dependency.unregisterCallback_(b3);
            c2();
          }), d3 = '<script type="text/javascript">' + goog.protectScriptTag_('goog.Dependency.callback_("' + b3 + '");') + "<\/script>";
          a3.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(d3) : d3);
        }
        var e2 = this;
        if (goog.global.CLOSURE_IMPORT_SCRIPT)
          b2(), this.contents_ && goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_) ? (this.contents_ = null, a2.loaded()) : a2.pause();
        else {
          var f2 = this.loadFlags.module == goog.ModuleType.ES6;
          this.lazyFetch_ || b2();
          var g = 1 < a2.pending().length, h = g && goog.DebugLoader_.IS_OLD_IE_;
          g = goog.Dependency.defer_ && (g || goog.isDocumentLoading_());
          if (h || g)
            a2.defer(function() {
              c2();
            });
          else {
            var k = goog.global.document;
            h = goog.inHtmlDocument_() && "ActiveXObject" in goog.global;
            if (f2 && goog.inHtmlDocument_() && goog.isDocumentLoading_() && !h) {
              goog.Dependency.defer_ = true;
              a2.pause();
              var l = k.onreadystatechange;
              k.onreadystatechange = function() {
                "interactive" == k.readyState && (k.onreadystatechange = l, c2(), a2.resume());
                goog.isFunction(l) && l.apply(void 0, arguments);
              };
            } else
              !goog.DebugLoader_.IS_OLD_IE_ && goog.inHtmlDocument_() && goog.isDocumentLoading_() ? d2() : c2();
          }
        }
      }, goog.TransformedDependency.prototype.transform = function(a2) {
      }, goog.TranspiledDependency = function(a2, b2, c2, d2, e2, f2) {
        goog.TransformedDependency.call(this, a2, b2, c2, d2, e2);
        this.transpiler = f2;
      }, goog.inherits(goog.TranspiledDependency, goog.TransformedDependency), goog.TranspiledDependency.prototype.transform = function(a2) {
        return this.transpiler.transpile(a2, this.getPathName());
      }, goog.PreTranspiledEs6ModuleDependency = function(a2, b2, c2, d2, e2) {
        goog.TransformedDependency.call(this, a2, b2, c2, d2, e2);
      }, goog.inherits(goog.PreTranspiledEs6ModuleDependency, goog.TransformedDependency), goog.PreTranspiledEs6ModuleDependency.prototype.transform = function(a2) {
        return a2;
      }, goog.GoogModuleDependency = function(a2, b2, c2, d2, e2, f2, g) {
        goog.TransformedDependency.call(this, a2, b2, c2, d2, e2);
        this.needsTranspile_ = f2;
        this.transpiler_ = g;
      }, goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency), goog.GoogModuleDependency.prototype.transform = function(a2) {
        this.needsTranspile_ && (a2 = this.transpiler_.transpile(a2, this.getPathName()));
        return goog.LOAD_MODULE_USING_EVAL && void 0 !== goog.global.JSON ? "goog.loadModule(" + goog.global.JSON.stringify(a2 + "\n//# sourceURL=" + this.path + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + a2 + "\n;return exports});\n//# sourceURL=" + this.path + "\n";
      }, goog.DebugLoader_.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.DebugLoader_.prototype.addDependency = function(a2, b2, c2, d2) {
        b2 = b2 || [];
        a2 = a2.replace(/\\/g, "/");
        var e2 = goog.normalizePath_(goog.basePath + a2);
        d2 && "boolean" !== typeof d2 || (d2 = d2 ? { module: goog.ModuleType.GOOG } : {});
        c2 = this.factory_.createDependency(e2, a2, b2, c2, d2, goog.transpiler_.needsTranspile(d2.lang || "es3", d2.module));
        this.dependencies_[e2] = c2;
        for (c2 = 0; c2 < b2.length; c2++)
          this.idToPath_[b2[c2]] = e2;
        this.idToPath_[a2] = e2;
      }, goog.DependencyFactory = function(a2) {
        this.transpiler = a2;
      }, goog.DependencyFactory.prototype.createDependency = function(a2, b2, c2, d2, e2, f2) {
        return e2.module == goog.ModuleType.GOOG ? new goog.GoogModuleDependency(
          a2,
          b2,
          c2,
          d2,
          e2,
          f2,
          this.transpiler
        ) : f2 ? new goog.TranspiledDependency(a2, b2, c2, d2, e2, this.transpiler) : e2.module == goog.ModuleType.ES6 ? "never" == goog.TRANSPILE && goog.ASSUME_ES_MODULES_TRANSPILED ? new goog.PreTranspiledEs6ModuleDependency(a2, b2, c2, d2, e2) : new goog.Es6ModuleDependency(a2, b2, c2, d2, e2) : new goog.Dependency(a2, b2, c2, d2, e2);
      }, goog.debugLoader_ = new goog.DebugLoader_(), goog.loadClosureDeps = function() {
        goog.debugLoader_.loadClosureDeps();
      }, goog.setDependencyFactory = function(a2) {
        goog.debugLoader_.setDependencyFactory(a2);
      }, goog.global.CLOSURE_NO_DEPS || goog.debugLoader_.loadClosureDeps(), goog.bootstrap = function(a2, b2) {
        goog.debugLoader_.bootstrap(a2, b2);
      });
      goog.TRUSTED_TYPES_POLICY_NAME = "";
      goog.identity_ = function(a2) {
        return a2;
      };
      goog.createTrustedTypesPolicy = function(a2) {
        var b2 = null, c2 = goog.global.trustedTypes || goog.global.TrustedTypes;
        if (!c2 || !c2.createPolicy)
          return b2;
        try {
          b2 = c2.createPolicy(a2, { createHTML: goog.identity_, createScript: goog.identity_, createScriptURL: goog.identity_, createURL: goog.identity_ });
        } catch (d2) {
          goog.logToConsole_(d2.message);
        }
        return b2;
      };
      goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base") : null;
      goog.object = {};
      goog.object.is = function(a2, b2) {
        return a2 === b2 ? 0 !== a2 || 1 / a2 === 1 / b2 : a2 !== a2 && b2 !== b2;
      };
      goog.object.forEach = function(a2, b2, c2) {
        for (var d2 in a2)
          b2.call(c2, a2[d2], d2, a2);
      };
      goog.object.filter = function(a2, b2, c2) {
        var d2 = {}, e2;
        for (e2 in a2)
          b2.call(c2, a2[e2], e2, a2) && (d2[e2] = a2[e2]);
        return d2;
      };
      goog.object.map = function(a2, b2, c2) {
        var d2 = {}, e2;
        for (e2 in a2)
          d2[e2] = b2.call(c2, a2[e2], e2, a2);
        return d2;
      };
      goog.object.some = function(a2, b2, c2) {
        for (var d2 in a2)
          if (b2.call(c2, a2[d2], d2, a2))
            return true;
        return false;
      };
      goog.object.every = function(a2, b2, c2) {
        for (var d2 in a2)
          if (!b2.call(c2, a2[d2], d2, a2))
            return false;
        return true;
      };
      goog.object.getCount = function(a2) {
        var b2 = 0, c2;
        for (c2 in a2)
          b2++;
        return b2;
      };
      goog.object.getAnyKey = function(a2) {
        for (var b2 in a2)
          return b2;
      };
      goog.object.getAnyValue = function(a2) {
        for (var b2 in a2)
          return a2[b2];
      };
      goog.object.contains = function(a2, b2) {
        return goog.object.containsValue(a2, b2);
      };
      goog.object.getValues = function(a2) {
        var b2 = [], c2 = 0, d2;
        for (d2 in a2)
          b2[c2++] = a2[d2];
        return b2;
      };
      goog.object.getKeys = function(a2) {
        var b2 = [], c2 = 0, d2;
        for (d2 in a2)
          b2[c2++] = d2;
        return b2;
      };
      goog.object.getValueByKeys = function(a2, b2) {
        var c2 = goog.isArrayLike(b2), d2 = c2 ? b2 : arguments;
        for (c2 = c2 ? 0 : 1; c2 < d2.length; c2++) {
          if (null == a2)
            return;
          a2 = a2[d2[c2]];
        }
        return a2;
      };
      goog.object.containsKey = function(a2, b2) {
        return null !== a2 && b2 in a2;
      };
      goog.object.containsValue = function(a2, b2) {
        for (var c2 in a2)
          if (a2[c2] == b2)
            return true;
        return false;
      };
      goog.object.findKey = function(a2, b2, c2) {
        for (var d2 in a2)
          if (b2.call(c2, a2[d2], d2, a2))
            return d2;
      };
      goog.object.findValue = function(a2, b2, c2) {
        return (b2 = goog.object.findKey(a2, b2, c2)) && a2[b2];
      };
      goog.object.isEmpty = function(a2) {
        for (var b2 in a2)
          return false;
        return true;
      };
      goog.object.clear = function(a2) {
        for (var b2 in a2)
          delete a2[b2];
      };
      goog.object.remove = function(a2, b2) {
        var c2;
        (c2 = b2 in a2) && delete a2[b2];
        return c2;
      };
      goog.object.add = function(a2, b2, c2) {
        if (null !== a2 && b2 in a2)
          throw Error('The object already contains the key "' + b2 + '"');
        goog.object.set(a2, b2, c2);
      };
      goog.object.get = function(a2, b2, c2) {
        return null !== a2 && b2 in a2 ? a2[b2] : c2;
      };
      goog.object.set = function(a2, b2, c2) {
        a2[b2] = c2;
      };
      goog.object.setIfUndefined = function(a2, b2, c2) {
        return b2 in a2 ? a2[b2] : a2[b2] = c2;
      };
      goog.object.setWithReturnValueIfNotSet = function(a2, b2, c2) {
        if (b2 in a2)
          return a2[b2];
        c2 = c2();
        return a2[b2] = c2;
      };
      goog.object.equals = function(a2, b2) {
        for (var c2 in a2)
          if (!(c2 in b2) || a2[c2] !== b2[c2])
            return false;
        for (var d2 in b2)
          if (!(d2 in a2))
            return false;
        return true;
      };
      goog.object.clone = function(a2) {
        var b2 = {}, c2;
        for (c2 in a2)
          b2[c2] = a2[c2];
        return b2;
      };
      goog.object.unsafeClone = function(a2) {
        var b2 = goog.typeOf(a2);
        if ("object" == b2 || "array" == b2) {
          if (goog.isFunction(a2.clone))
            return a2.clone();
          b2 = "array" == b2 ? [] : {};
          for (var c2 in a2)
            b2[c2] = goog.object.unsafeClone(a2[c2]);
          return b2;
        }
        return a2;
      };
      goog.object.transpose = function(a2) {
        var b2 = {}, c2;
        for (c2 in a2)
          b2[a2[c2]] = c2;
        return b2;
      };
      goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
      goog.object.extend = function(a2, b2) {
        for (var c2, d2, e2 = 1; e2 < arguments.length; e2++) {
          d2 = arguments[e2];
          for (c2 in d2)
            a2[c2] = d2[c2];
          for (var f2 = 0; f2 < goog.object.PROTOTYPE_FIELDS_.length; f2++)
            c2 = goog.object.PROTOTYPE_FIELDS_[f2], Object.prototype.hasOwnProperty.call(d2, c2) && (a2[c2] = d2[c2]);
        }
      };
      goog.object.create = function(a2) {
        var b2 = arguments.length;
        if (1 == b2 && Array.isArray(arguments[0]))
          return goog.object.create.apply(null, arguments[0]);
        if (b2 % 2)
          throw Error("Uneven number of arguments");
        for (var c2 = {}, d2 = 0; d2 < b2; d2 += 2)
          c2[arguments[d2]] = arguments[d2 + 1];
        return c2;
      };
      goog.object.createSet = function(a2) {
        var b2 = arguments.length;
        if (1 == b2 && Array.isArray(arguments[0]))
          return goog.object.createSet.apply(null, arguments[0]);
        for (var c2 = {}, d2 = 0; d2 < b2; d2++)
          c2[arguments[d2]] = true;
        return c2;
      };
      goog.object.createImmutableView = function(a2) {
        var b2 = a2;
        Object.isFrozen && !Object.isFrozen(a2) && (b2 = Object.create(a2), Object.freeze(b2));
        return b2;
      };
      goog.object.isImmutableView = function(a2) {
        return !!Object.isFrozen && Object.isFrozen(a2);
      };
      goog.object.getAllPropertyNames = function(a2, b2, c2) {
        if (!a2)
          return [];
        if (!Object.getOwnPropertyNames || !Object.getPrototypeOf)
          return goog.object.getKeys(a2);
        for (var d2 = {}; a2 && (a2 !== Object.prototype || b2) && (a2 !== Function.prototype || c2); ) {
          for (var e2 = Object.getOwnPropertyNames(a2), f2 = 0; f2 < e2.length; f2++)
            d2[e2[f2]] = true;
          a2 = Object.getPrototypeOf(a2);
        }
        return goog.object.getKeys(d2);
      };
      goog.object.getSuperClass = function(a2) {
        return (a2 = Object.getPrototypeOf(a2.prototype)) && a2.constructor;
      };
      var jspb = { asserts: {} };
      jspb.asserts.doAssertFailure = function(a2, b2, c2, d2) {
        var e2 = "Assertion failed";
        if (c2) {
          e2 += ": " + c2;
          var f2 = d2;
        } else
          a2 && (e2 += ": " + a2, f2 = b2);
        throw Error("" + e2, f2 || []);
      };
      jspb.asserts.assert = function(a2, b2, c2) {
        for (var d2 = [], e2 = 2; e2 < arguments.length; ++e2)
          d2[e2 - 2] = arguments[e2];
        a2 || jspb.asserts.doAssertFailure("", null, b2, d2);
        return a2;
      };
      jspb.asserts.assertString = function(a2, b2, c2) {
        for (var d2 = [], e2 = 2; e2 < arguments.length; ++e2)
          d2[e2 - 2] = arguments[e2];
        "string" !== typeof a2 && jspb.asserts.doAssertFailure("Expected string but got %s: %s.", [goog.typeOf(a2), a2], b2, d2);
        return a2;
      };
      jspb.asserts.assertArray = function(a2, b2, c2) {
        for (var d2 = [], e2 = 2; e2 < arguments.length; ++e2)
          d2[e2 - 2] = arguments[e2];
        Array.isArray(a2) || jspb.asserts.doAssertFailure("Expected array but got %s: %s.", [goog.typeOf(a2), a2], b2, d2);
        return a2;
      };
      jspb.asserts.fail = function(a2, b2) {
        for (var c2 = [], d2 = 1; d2 < arguments.length; ++d2)
          c2[d2 - 1] = arguments[d2];
        throw Error("Failure" + (a2 ? ": " + a2 : ""), c2);
      };
      jspb.asserts.assertInstanceof = function(a2, b2, c2, d2) {
        for (var e2 = [], f2 = 3; f2 < arguments.length; ++f2)
          e2[f2 - 3] = arguments[f2];
        a2 instanceof b2 || jspb.asserts.doAssertFailure("Expected instanceof %s but got %s.", [jspb.asserts.getType(b2), jspb.asserts.getType(a2)], c2, e2);
        return a2;
      };
      jspb.asserts.getType = function(a2) {
        return a2 instanceof Function ? a2.displayName || a2.name || "unknown type name" : a2 instanceof Object ? a2.constructor.displayName || a2.constructor.name || Object.prototype.toString.call(a2) : null === a2 ? "null" : typeof a2;
      };
      jspb.BinaryConstants = {};
      jspb.ConstBinaryMessage = function() {
      };
      jspb.BinaryMessage = function() {
      };
      jspb.BinaryConstants.FieldType = { INVALID: -1, DOUBLE: 1, FLOAT: 2, INT64: 3, UINT64: 4, INT32: 5, FIXED64: 6, FIXED32: 7, BOOL: 8, STRING: 9, GROUP: 10, MESSAGE: 11, BYTES: 12, UINT32: 13, ENUM: 14, SFIXED32: 15, SFIXED64: 16, SINT32: 17, SINT64: 18, FHASH64: 30, VHASH64: 31 };
      jspb.BinaryConstants.WireType = { INVALID: -1, VARINT: 0, FIXED64: 1, DELIMITED: 2, START_GROUP: 3, END_GROUP: 4, FIXED32: 5 };
      jspb.BinaryConstants.FieldTypeToWireType = function(a2) {
        var b2 = jspb.BinaryConstants.FieldType, c2 = jspb.BinaryConstants.WireType;
        switch (a2) {
          case b2.INT32:
          case b2.INT64:
          case b2.UINT32:
          case b2.UINT64:
          case b2.SINT32:
          case b2.SINT64:
          case b2.BOOL:
          case b2.ENUM:
          case b2.VHASH64:
            return c2.VARINT;
          case b2.DOUBLE:
          case b2.FIXED64:
          case b2.SFIXED64:
          case b2.FHASH64:
            return c2.FIXED64;
          case b2.STRING:
          case b2.MESSAGE:
          case b2.BYTES:
            return c2.DELIMITED;
          case b2.FLOAT:
          case b2.FIXED32:
          case b2.SFIXED32:
            return c2.FIXED32;
          default:
            return c2.INVALID;
        }
      };
      jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1;
      jspb.BinaryConstants.FLOAT32_EPS = 1401298464324817e-60;
      jspb.BinaryConstants.FLOAT32_MIN = 11754943508222875e-54;
      jspb.BinaryConstants.FLOAT32_MAX = 34028234663852886e22;
      jspb.BinaryConstants.FLOAT64_EPS = 5e-324;
      jspb.BinaryConstants.FLOAT64_MIN = 22250738585072014e-324;
      jspb.BinaryConstants.FLOAT64_MAX = 17976931348623157e292;
      jspb.BinaryConstants.TWO_TO_20 = 1048576;
      jspb.BinaryConstants.TWO_TO_23 = 8388608;
      jspb.BinaryConstants.TWO_TO_31 = 2147483648;
      jspb.BinaryConstants.TWO_TO_32 = 4294967296;
      jspb.BinaryConstants.TWO_TO_52 = 4503599627370496;
      jspb.BinaryConstants.TWO_TO_63 = 9223372036854776e3;
      jspb.BinaryConstants.TWO_TO_64 = 18446744073709552e3;
      jspb.BinaryConstants.ZERO_HASH = "\0\0\0\0\0\0\0\0";
      goog.debug = {};
      goog.debug.Error = function(a2) {
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, goog.debug.Error);
        else {
          var b2 = Error().stack;
          b2 && (this.stack = b2);
        }
        a2 && (this.message = String(a2));
        this.reportErrorToServer = true;
      };
      goog.inherits(goog.debug.Error, Error);
      goog.debug.Error.prototype.name = "CustomError";
      goog.dom = {};
      goog.dom.NodeType = { ELEMENT: 1, ATTRIBUTE: 2, TEXT: 3, CDATA_SECTION: 4, ENTITY_REFERENCE: 5, ENTITY: 6, PROCESSING_INSTRUCTION: 7, COMMENT: 8, DOCUMENT: 9, DOCUMENT_TYPE: 10, DOCUMENT_FRAGMENT: 11, NOTATION: 12 };
      goog.asserts = {};
      goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
      goog.asserts.AssertionError = function(a2, b2) {
        goog.debug.Error.call(this, goog.asserts.subs_(a2, b2));
        this.messagePattern = a2;
      };
      goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
      goog.asserts.AssertionError.prototype.name = "AssertionError";
      goog.asserts.DEFAULT_ERROR_HANDLER = function(a2) {
        throw a2;
      };
      goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
      goog.asserts.subs_ = function(a2, b2) {
        a2 = a2.split("%s");
        for (var c2 = "", d2 = a2.length - 1, e2 = 0; e2 < d2; e2++)
          c2 += a2[e2] + (e2 < b2.length ? b2[e2] : "%s");
        return c2 + a2[d2];
      };
      goog.asserts.doAssertFailure_ = function(a2, b2, c2, d2) {
        var e2 = "Assertion failed";
        if (c2) {
          e2 += ": " + c2;
          var f2 = d2;
        } else
          a2 && (e2 += ": " + a2, f2 = b2);
        a2 = new goog.asserts.AssertionError("" + e2, f2 || []);
        goog.asserts.errorHandler_(a2);
      };
      goog.asserts.setErrorHandler = function(a2) {
        goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a2);
      };
      goog.asserts.assert = function(a2, b2, c2) {
        goog.asserts.ENABLE_ASSERTS && !a2 && goog.asserts.doAssertFailure_("", null, b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertExists = function(a2, b2, c2) {
        goog.asserts.ENABLE_ASSERTS && null == a2 && goog.asserts.doAssertFailure_("Expected to exist: %s.", [a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.fail = function(a2, b2) {
        goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a2 ? ": " + a2 : ""), Array.prototype.slice.call(arguments, 1)));
      };
      goog.asserts.assertNumber = function(a2, b2, c2) {
        goog.asserts.ENABLE_ASSERTS && "number" !== typeof a2 && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a2), a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertString = function(a2, b2, c2) {
        goog.asserts.ENABLE_ASSERTS && "string" !== typeof a2 && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a2), a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertFunction = function(a2, b2, c2) {
        goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a2) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a2), a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertObject = function(a2, b2, c2) {
        goog.asserts.ENABLE_ASSERTS && !goog.isObject(a2) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a2), a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertArray = function(a2, b2, c2) {
        goog.asserts.ENABLE_ASSERTS && !Array.isArray(a2) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a2), a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertBoolean = function(a2, b2, c2) {
        goog.asserts.ENABLE_ASSERTS && "boolean" !== typeof a2 && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a2), a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertElement = function(a2, b2, c2) {
        !goog.asserts.ENABLE_ASSERTS || goog.isObject(a2) && a2.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a2), a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertInstanceof = function(a2, b2, c2, d2) {
        !goog.asserts.ENABLE_ASSERTS || a2 instanceof b2 || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b2), goog.asserts.getType_(a2)], c2, Array.prototype.slice.call(arguments, 3));
        return a2;
      };
      goog.asserts.assertFinite = function(a2, b2, c2) {
        !goog.asserts.ENABLE_ASSERTS || "number" == typeof a2 && isFinite(a2) || goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.", [a2], b2, Array.prototype.slice.call(arguments, 2));
        return a2;
      };
      goog.asserts.assertObjectPrototypeIsIntact = function() {
        for (var a2 in Object.prototype)
          goog.asserts.fail(a2 + " should not be enumerable in Object.prototype.");
      };
      goog.asserts.getType_ = function(a2) {
        return a2 instanceof Function ? a2.displayName || a2.name || "unknown type name" : a2 instanceof Object ? a2.constructor.displayName || a2.constructor.name || Object.prototype.toString.call(a2) : null === a2 ? "null" : typeof a2;
      };
      goog.array = {};
      goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
      goog.array.ASSUME_NATIVE_FUNCTIONS = 2012 < goog.FEATURESET_YEAR;
      goog.array.peek = function(a2) {
        return a2[a2.length - 1];
      };
      goog.array.last = goog.array.peek;
      goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a2, b2, c2) {
        goog.asserts.assert(null != a2.length);
        return Array.prototype.indexOf.call(a2, b2, c2);
      } : function(a2, b2, c2) {
        c2 = null == c2 ? 0 : 0 > c2 ? Math.max(0, a2.length + c2) : c2;
        if ("string" === typeof a2)
          return "string" !== typeof b2 || 1 != b2.length ? -1 : a2.indexOf(b2, c2);
        for (; c2 < a2.length; c2++)
          if (c2 in a2 && a2[c2] === b2)
            return c2;
        return -1;
      };
      goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a2, b2, c2) {
        goog.asserts.assert(null != a2.length);
        return Array.prototype.lastIndexOf.call(a2, b2, null == c2 ? a2.length - 1 : c2);
      } : function(a2, b2, c2) {
        c2 = null == c2 ? a2.length - 1 : c2;
        0 > c2 && (c2 = Math.max(0, a2.length + c2));
        if ("string" === typeof a2)
          return "string" !== typeof b2 || 1 != b2.length ? -1 : a2.lastIndexOf(b2, c2);
        for (; 0 <= c2; c2--)
          if (c2 in a2 && a2[c2] === b2)
            return c2;
        return -1;
      };
      goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a2, b2, c2) {
        goog.asserts.assert(null != a2.length);
        Array.prototype.forEach.call(a2, b2, c2);
      } : function(a2, b2, c2) {
        for (var d2 = a2.length, e2 = "string" === typeof a2 ? a2.split("") : a2, f2 = 0; f2 < d2; f2++)
          f2 in e2 && b2.call(c2, e2[f2], f2, a2);
      };
      goog.array.forEachRight = function(a2, b2, c2) {
        var d2 = a2.length, e2 = "string" === typeof a2 ? a2.split("") : a2;
        for (--d2; 0 <= d2; --d2)
          d2 in e2 && b2.call(c2, e2[d2], d2, a2);
      };
      goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a2, b2, c2) {
        goog.asserts.assert(null != a2.length);
        return Array.prototype.filter.call(a2, b2, c2);
      } : function(a2, b2, c2) {
        for (var d2 = a2.length, e2 = [], f2 = 0, g = "string" === typeof a2 ? a2.split("") : a2, h = 0; h < d2; h++)
          if (h in g) {
            var k = g[h];
            b2.call(c2, k, h, a2) && (e2[f2++] = k);
          }
        return e2;
      };
      goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a2, b2, c2) {
        goog.asserts.assert(null != a2.length);
        return Array.prototype.map.call(a2, b2, c2);
      } : function(a2, b2, c2) {
        for (var d2 = a2.length, e2 = Array(d2), f2 = "string" === typeof a2 ? a2.split("") : a2, g = 0; g < d2; g++)
          g in f2 && (e2[g] = b2.call(c2, f2[g], g, a2));
        return e2;
      };
      goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a2, b2, c2, d2) {
        goog.asserts.assert(null != a2.length);
        d2 && (b2 = goog.bind(b2, d2));
        return Array.prototype.reduce.call(a2, b2, c2);
      } : function(a2, b2, c2, d2) {
        var e2 = c2;
        goog.array.forEach(a2, function(c3, g) {
          e2 = b2.call(d2, e2, c3, g, a2);
        });
        return e2;
      };
      goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a2, b2, c2, d2) {
        goog.asserts.assert(null != a2.length);
        goog.asserts.assert(null != b2);
        d2 && (b2 = goog.bind(b2, d2));
        return Array.prototype.reduceRight.call(a2, b2, c2);
      } : function(a2, b2, c2, d2) {
        var e2 = c2;
        goog.array.forEachRight(a2, function(c3, g) {
          e2 = b2.call(d2, e2, c3, g, a2);
        });
        return e2;
      };
      goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a2, b2, c2) {
        goog.asserts.assert(null != a2.length);
        return Array.prototype.some.call(a2, b2, c2);
      } : function(a2, b2, c2) {
        for (var d2 = a2.length, e2 = "string" === typeof a2 ? a2.split("") : a2, f2 = 0; f2 < d2; f2++)
          if (f2 in e2 && b2.call(c2, e2[f2], f2, a2))
            return true;
        return false;
      };
      goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a2, b2, c2) {
        goog.asserts.assert(null != a2.length);
        return Array.prototype.every.call(a2, b2, c2);
      } : function(a2, b2, c2) {
        for (var d2 = a2.length, e2 = "string" === typeof a2 ? a2.split("") : a2, f2 = 0; f2 < d2; f2++)
          if (f2 in e2 && !b2.call(c2, e2[f2], f2, a2))
            return false;
        return true;
      };
      goog.array.count = function(a2, b2, c2) {
        var d2 = 0;
        goog.array.forEach(a2, function(a3, f2, g) {
          b2.call(c2, a3, f2, g) && ++d2;
        }, c2);
        return d2;
      };
      goog.array.find = function(a2, b2, c2) {
        b2 = goog.array.findIndex(a2, b2, c2);
        return 0 > b2 ? null : "string" === typeof a2 ? a2.charAt(b2) : a2[b2];
      };
      goog.array.findIndex = function(a2, b2, c2) {
        for (var d2 = a2.length, e2 = "string" === typeof a2 ? a2.split("") : a2, f2 = 0; f2 < d2; f2++)
          if (f2 in e2 && b2.call(c2, e2[f2], f2, a2))
            return f2;
        return -1;
      };
      goog.array.findRight = function(a2, b2, c2) {
        b2 = goog.array.findIndexRight(a2, b2, c2);
        return 0 > b2 ? null : "string" === typeof a2 ? a2.charAt(b2) : a2[b2];
      };
      goog.array.findIndexRight = function(a2, b2, c2) {
        var d2 = a2.length, e2 = "string" === typeof a2 ? a2.split("") : a2;
        for (--d2; 0 <= d2; d2--)
          if (d2 in e2 && b2.call(c2, e2[d2], d2, a2))
            return d2;
        return -1;
      };
      goog.array.contains = function(a2, b2) {
        return 0 <= goog.array.indexOf(a2, b2);
      };
      goog.array.isEmpty = function(a2) {
        return 0 == a2.length;
      };
      goog.array.clear = function(a2) {
        if (!Array.isArray(a2))
          for (var b2 = a2.length - 1; 0 <= b2; b2--)
            delete a2[b2];
        a2.length = 0;
      };
      goog.array.insert = function(a2, b2) {
        goog.array.contains(a2, b2) || a2.push(b2);
      };
      goog.array.insertAt = function(a2, b2, c2) {
        goog.array.splice(a2, c2, 0, b2);
      };
      goog.array.insertArrayAt = function(a2, b2, c2) {
        goog.partial(goog.array.splice, a2, c2, 0).apply(null, b2);
      };
      goog.array.insertBefore = function(a2, b2, c2) {
        var d2;
        2 == arguments.length || 0 > (d2 = goog.array.indexOf(a2, c2)) ? a2.push(b2) : goog.array.insertAt(a2, b2, d2);
      };
      goog.array.remove = function(a2, b2) {
        b2 = goog.array.indexOf(a2, b2);
        var c2;
        (c2 = 0 <= b2) && goog.array.removeAt(a2, b2);
        return c2;
      };
      goog.array.removeLast = function(a2, b2) {
        b2 = goog.array.lastIndexOf(a2, b2);
        return 0 <= b2 ? (goog.array.removeAt(a2, b2), true) : false;
      };
      goog.array.removeAt = function(a2, b2) {
        goog.asserts.assert(null != a2.length);
        return 1 == Array.prototype.splice.call(a2, b2, 1).length;
      };
      goog.array.removeIf = function(a2, b2, c2) {
        b2 = goog.array.findIndex(a2, b2, c2);
        return 0 <= b2 ? (goog.array.removeAt(a2, b2), true) : false;
      };
      goog.array.removeAllIf = function(a2, b2, c2) {
        var d2 = 0;
        goog.array.forEachRight(a2, function(e2, f2) {
          b2.call(c2, e2, f2, a2) && goog.array.removeAt(a2, f2) && d2++;
        });
        return d2;
      };
      goog.array.concat = function(a2) {
        return Array.prototype.concat.apply([], arguments);
      };
      goog.array.join = function(a2) {
        return Array.prototype.concat.apply([], arguments);
      };
      goog.array.toArray = function(a2) {
        var b2 = a2.length;
        if (0 < b2) {
          for (var c2 = Array(b2), d2 = 0; d2 < b2; d2++)
            c2[d2] = a2[d2];
          return c2;
        }
        return [];
      };
      goog.array.clone = goog.array.toArray;
      goog.array.extend = function(a2, b2) {
        for (var c2 = 1; c2 < arguments.length; c2++) {
          var d2 = arguments[c2];
          if (goog.isArrayLike(d2)) {
            var e2 = a2.length || 0, f2 = d2.length || 0;
            a2.length = e2 + f2;
            for (var g = 0; g < f2; g++)
              a2[e2 + g] = d2[g];
          } else
            a2.push(d2);
        }
      };
      goog.array.splice = function(a2, b2, c2, d2) {
        goog.asserts.assert(null != a2.length);
        return Array.prototype.splice.apply(a2, goog.array.slice(arguments, 1));
      };
      goog.array.slice = function(a2, b2, c2) {
        goog.asserts.assert(null != a2.length);
        return 2 >= arguments.length ? Array.prototype.slice.call(a2, b2) : Array.prototype.slice.call(a2, b2, c2);
      };
      goog.array.removeDuplicates = function(a2, b2, c2) {
        b2 = b2 || a2;
        var d2 = function(a3) {
          return goog.isObject(a3) ? "o" + goog.getUid(a3) : (typeof a3).charAt(0) + a3;
        };
        c2 = c2 || d2;
        d2 = {};
        for (var e2 = 0, f2 = 0; f2 < a2.length; ) {
          var g = a2[f2++], h = c2(g);
          Object.prototype.hasOwnProperty.call(d2, h) || (d2[h] = true, b2[e2++] = g);
        }
        b2.length = e2;
      };
      goog.array.binarySearch = function(a2, b2, c2) {
        return goog.array.binarySearch_(a2, c2 || goog.array.defaultCompare, false, b2);
      };
      goog.array.binarySelect = function(a2, b2, c2) {
        return goog.array.binarySearch_(a2, b2, true, void 0, c2);
      };
      goog.array.binarySearch_ = function(a2, b2, c2, d2, e2) {
        for (var f2 = 0, g = a2.length, h; f2 < g; ) {
          var k = f2 + (g - f2 >>> 1);
          var l = c2 ? b2.call(e2, a2[k], k, a2) : b2(d2, a2[k]);
          0 < l ? f2 = k + 1 : (g = k, h = !l);
        }
        return h ? f2 : -f2 - 1;
      };
      goog.array.sort = function(a2, b2) {
        a2.sort(b2 || goog.array.defaultCompare);
      };
      goog.array.stableSort = function(a2, b2) {
        for (var c2 = Array(a2.length), d2 = 0; d2 < a2.length; d2++)
          c2[d2] = { index: d2, value: a2[d2] };
        var e2 = b2 || goog.array.defaultCompare;
        goog.array.sort(c2, function(a3, b3) {
          return e2(a3.value, b3.value) || a3.index - b3.index;
        });
        for (d2 = 0; d2 < a2.length; d2++)
          a2[d2] = c2[d2].value;
      };
      goog.array.sortByKey = function(a2, b2, c2) {
        var d2 = c2 || goog.array.defaultCompare;
        goog.array.sort(a2, function(a3, c3) {
          return d2(b2(a3), b2(c3));
        });
      };
      goog.array.sortObjectsByKey = function(a2, b2, c2) {
        goog.array.sortByKey(a2, function(a3) {
          return a3[b2];
        }, c2);
      };
      goog.array.isSorted = function(a2, b2, c2) {
        b2 = b2 || goog.array.defaultCompare;
        for (var d2 = 1; d2 < a2.length; d2++) {
          var e2 = b2(a2[d2 - 1], a2[d2]);
          if (0 < e2 || 0 == e2 && c2)
            return false;
        }
        return true;
      };
      goog.array.equals = function(a2, b2, c2) {
        if (!goog.isArrayLike(a2) || !goog.isArrayLike(b2) || a2.length != b2.length)
          return false;
        var d2 = a2.length;
        c2 = c2 || goog.array.defaultCompareEquality;
        for (var e2 = 0; e2 < d2; e2++)
          if (!c2(a2[e2], b2[e2]))
            return false;
        return true;
      };
      goog.array.compare3 = function(a2, b2, c2) {
        c2 = c2 || goog.array.defaultCompare;
        for (var d2 = Math.min(a2.length, b2.length), e2 = 0; e2 < d2; e2++) {
          var f2 = c2(a2[e2], b2[e2]);
          if (0 != f2)
            return f2;
        }
        return goog.array.defaultCompare(a2.length, b2.length);
      };
      goog.array.defaultCompare = function(a2, b2) {
        return a2 > b2 ? 1 : a2 < b2 ? -1 : 0;
      };
      goog.array.inverseDefaultCompare = function(a2, b2) {
        return -goog.array.defaultCompare(a2, b2);
      };
      goog.array.defaultCompareEquality = function(a2, b2) {
        return a2 === b2;
      };
      goog.array.binaryInsert = function(a2, b2, c2) {
        c2 = goog.array.binarySearch(a2, b2, c2);
        return 0 > c2 ? (goog.array.insertAt(a2, b2, -(c2 + 1)), true) : false;
      };
      goog.array.binaryRemove = function(a2, b2, c2) {
        b2 = goog.array.binarySearch(a2, b2, c2);
        return 0 <= b2 ? goog.array.removeAt(a2, b2) : false;
      };
      goog.array.bucket = function(a2, b2, c2) {
        for (var d2 = {}, e2 = 0; e2 < a2.length; e2++) {
          var f2 = a2[e2], g = b2.call(c2, f2, e2, a2);
          void 0 !== g && (d2[g] || (d2[g] = [])).push(f2);
        }
        return d2;
      };
      goog.array.toObject = function(a2, b2, c2) {
        var d2 = {};
        goog.array.forEach(a2, function(e2, f2) {
          d2[b2.call(c2, e2, f2, a2)] = e2;
        });
        return d2;
      };
      goog.array.range = function(a2, b2, c2) {
        var d2 = [], e2 = 0, f2 = a2;
        c2 = c2 || 1;
        void 0 !== b2 && (e2 = a2, f2 = b2);
        if (0 > c2 * (f2 - e2))
          return [];
        if (0 < c2)
          for (a2 = e2; a2 < f2; a2 += c2)
            d2.push(a2);
        else
          for (a2 = e2; a2 > f2; a2 += c2)
            d2.push(a2);
        return d2;
      };
      goog.array.repeat = function(a2, b2) {
        for (var c2 = [], d2 = 0; d2 < b2; d2++)
          c2[d2] = a2;
        return c2;
      };
      goog.array.flatten = function(a2) {
        for (var b2 = [], c2 = 0; c2 < arguments.length; c2++) {
          var d2 = arguments[c2];
          if (Array.isArray(d2))
            for (var e2 = 0; e2 < d2.length; e2 += 8192) {
              var f2 = goog.array.slice(d2, e2, e2 + 8192);
              f2 = goog.array.flatten.apply(null, f2);
              for (var g = 0; g < f2.length; g++)
                b2.push(f2[g]);
            }
          else
            b2.push(d2);
        }
        return b2;
      };
      goog.array.rotate = function(a2, b2) {
        goog.asserts.assert(null != a2.length);
        a2.length && (b2 %= a2.length, 0 < b2 ? Array.prototype.unshift.apply(a2, a2.splice(-b2, b2)) : 0 > b2 && Array.prototype.push.apply(a2, a2.splice(0, -b2)));
        return a2;
      };
      goog.array.moveItem = function(a2, b2, c2) {
        goog.asserts.assert(0 <= b2 && b2 < a2.length);
        goog.asserts.assert(0 <= c2 && c2 < a2.length);
        b2 = Array.prototype.splice.call(a2, b2, 1);
        Array.prototype.splice.call(a2, c2, 0, b2[0]);
      };
      goog.array.zip = function(a2) {
        if (!arguments.length)
          return [];
        for (var b2 = [], c2 = arguments[0].length, d2 = 1; d2 < arguments.length; d2++)
          arguments[d2].length < c2 && (c2 = arguments[d2].length);
        for (d2 = 0; d2 < c2; d2++) {
          for (var e2 = [], f2 = 0; f2 < arguments.length; f2++)
            e2.push(arguments[f2][d2]);
          b2.push(e2);
        }
        return b2;
      };
      goog.array.shuffle = function(a2, b2) {
        b2 = b2 || Math.random;
        for (var c2 = a2.length - 1; 0 < c2; c2--) {
          var d2 = Math.floor(b2() * (c2 + 1)), e2 = a2[c2];
          a2[c2] = a2[d2];
          a2[d2] = e2;
        }
      };
      goog.array.copyByIndex = function(a2, b2) {
        var c2 = [];
        goog.array.forEach(b2, function(b3) {
          c2.push(a2[b3]);
        });
        return c2;
      };
      goog.array.concatMap = function(a2, b2, c2) {
        return goog.array.concat.apply([], goog.array.map(a2, b2, c2));
      };
      goog.crypt = {};
      goog.crypt.stringToByteArray = function(a2) {
        for (var b2 = [], c2 = 0, d2 = 0; d2 < a2.length; d2++) {
          var e2 = a2.charCodeAt(d2);
          255 < e2 && (b2[c2++] = e2 & 255, e2 >>= 8);
          b2[c2++] = e2;
        }
        return b2;
      };
      goog.crypt.byteArrayToString = function(a2) {
        if (8192 >= a2.length)
          return String.fromCharCode.apply(null, a2);
        for (var b2 = "", c2 = 0; c2 < a2.length; c2 += 8192) {
          var d2 = goog.array.slice(a2, c2, c2 + 8192);
          b2 += String.fromCharCode.apply(null, d2);
        }
        return b2;
      };
      goog.crypt.byteArrayToHex = function(a2, b2) {
        return goog.array.map(a2, function(a3) {
          a3 = a3.toString(16);
          return 1 < a3.length ? a3 : "0" + a3;
        }).join(b2 || "");
      };
      goog.crypt.hexToByteArray = function(a2) {
        goog.asserts.assert(0 == a2.length % 2, "Key string length must be multiple of 2");
        for (var b2 = [], c2 = 0; c2 < a2.length; c2 += 2)
          b2.push(parseInt(a2.substring(c2, c2 + 2), 16));
        return b2;
      };
      goog.crypt.stringToUtf8ByteArray = function(a2) {
        for (var b2 = [], c2 = 0, d2 = 0; d2 < a2.length; d2++) {
          var e2 = a2.charCodeAt(d2);
          128 > e2 ? b2[c2++] = e2 : (2048 > e2 ? b2[c2++] = e2 >> 6 | 192 : (55296 == (e2 & 64512) && d2 + 1 < a2.length && 56320 == (a2.charCodeAt(d2 + 1) & 64512) ? (e2 = 65536 + ((e2 & 1023) << 10) + (a2.charCodeAt(++d2) & 1023), b2[c2++] = e2 >> 18 | 240, b2[c2++] = e2 >> 12 & 63 | 128) : b2[c2++] = e2 >> 12 | 224, b2[c2++] = e2 >> 6 & 63 | 128), b2[c2++] = e2 & 63 | 128);
        }
        return b2;
      };
      goog.crypt.utf8ByteArrayToString = function(a2) {
        for (var b2 = [], c2 = 0, d2 = 0; c2 < a2.length; ) {
          var e2 = a2[c2++];
          if (128 > e2)
            b2[d2++] = String.fromCharCode(e2);
          else if (191 < e2 && 224 > e2) {
            var f2 = a2[c2++];
            b2[d2++] = String.fromCharCode((e2 & 31) << 6 | f2 & 63);
          } else if (239 < e2 && 365 > e2) {
            f2 = a2[c2++];
            var g = a2[c2++], h = a2[c2++];
            e2 = ((e2 & 7) << 18 | (f2 & 63) << 12 | (g & 63) << 6 | h & 63) - 65536;
            b2[d2++] = String.fromCharCode(55296 + (e2 >> 10));
            b2[d2++] = String.fromCharCode(56320 + (e2 & 1023));
          } else
            f2 = a2[c2++], g = a2[c2++], b2[d2++] = String.fromCharCode((e2 & 15) << 12 | (f2 & 63) << 6 | g & 63);
        }
        return b2.join("");
      };
      goog.crypt.xorByteArray = function(a2, b2) {
        goog.asserts.assert(a2.length == b2.length, "XOR array lengths must match");
        for (var c2 = [], d2 = 0; d2 < a2.length; d2++)
          c2.push(a2[d2] ^ b2[d2]);
        return c2;
      };
      goog.dom.asserts = {};
      goog.dom.asserts.assertIsLocation = function(a2) {
        if (goog.asserts.ENABLE_ASSERTS) {
          var b2 = goog.dom.asserts.getWindow_(a2);
          b2 && (!a2 || !(a2 instanceof b2.Location) && a2 instanceof b2.Element) && goog.asserts.fail("Argument is not a Location (or a non-Element mock); got: %s", goog.dom.asserts.debugStringForType_(a2));
        }
        return a2;
      };
      goog.dom.asserts.assertIsElementType_ = function(a2, b2) {
        if (goog.asserts.ENABLE_ASSERTS) {
          var c2 = goog.dom.asserts.getWindow_(a2);
          c2 && "undefined" != typeof c2[b2] && (a2 && (a2 instanceof c2[b2] || !(a2 instanceof c2.Location || a2 instanceof c2.Element)) || goog.asserts.fail("Argument is not a %s (or a non-Element, non-Location mock); got: %s", b2, goog.dom.asserts.debugStringForType_(a2)));
        }
        return a2;
      };
      goog.dom.asserts.assertIsHTMLAnchorElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLAnchorElement");
      };
      goog.dom.asserts.assertIsHTMLButtonElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLButtonElement");
      };
      goog.dom.asserts.assertIsHTMLLinkElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLLinkElement");
      };
      goog.dom.asserts.assertIsHTMLImageElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLImageElement");
      };
      goog.dom.asserts.assertIsHTMLAudioElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLAudioElement");
      };
      goog.dom.asserts.assertIsHTMLVideoElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLVideoElement");
      };
      goog.dom.asserts.assertIsHTMLInputElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLInputElement");
      };
      goog.dom.asserts.assertIsHTMLTextAreaElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLTextAreaElement");
      };
      goog.dom.asserts.assertIsHTMLCanvasElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLCanvasElement");
      };
      goog.dom.asserts.assertIsHTMLEmbedElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLEmbedElement");
      };
      goog.dom.asserts.assertIsHTMLFormElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLFormElement");
      };
      goog.dom.asserts.assertIsHTMLFrameElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLFrameElement");
      };
      goog.dom.asserts.assertIsHTMLIFrameElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLIFrameElement");
      };
      goog.dom.asserts.assertIsHTMLObjectElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLObjectElement");
      };
      goog.dom.asserts.assertIsHTMLScriptElement = function(a2) {
        return goog.dom.asserts.assertIsElementType_(a2, "HTMLScriptElement");
      };
      goog.dom.asserts.debugStringForType_ = function(a2) {
        if (goog.isObject(a2))
          try {
            return a2.constructor.displayName || a2.constructor.name || Object.prototype.toString.call(a2);
          } catch (b2) {
            return "<object could not be stringified>";
          }
        else
          return void 0 === a2 ? "undefined" : null === a2 ? "null" : typeof a2;
      };
      goog.dom.asserts.getWindow_ = function(a2) {
        try {
          var b2 = a2 && a2.ownerDocument, c2 = b2 && (b2.defaultView || b2.parentWindow);
          c2 = c2 || goog.global;
          if (c2.Element && c2.Location)
            return c2;
        } catch (d2) {
        }
        return null;
      };
      goog.functions = {};
      goog.functions.constant = function(a2) {
        return function() {
          return a2;
        };
      };
      goog.functions.FALSE = function() {
        return false;
      };
      goog.functions.TRUE = function() {
        return true;
      };
      goog.functions.NULL = function() {
        return null;
      };
      goog.functions.identity = function(a2, b2) {
        return a2;
      };
      goog.functions.error = function(a2) {
        return function() {
          throw Error(a2);
        };
      };
      goog.functions.fail = function(a2) {
        return function() {
          throw a2;
        };
      };
      goog.functions.lock = function(a2, b2) {
        b2 = b2 || 0;
        return function() {
          return a2.apply(this, Array.prototype.slice.call(arguments, 0, b2));
        };
      };
      goog.functions.nth = function(a2) {
        return function() {
          return arguments[a2];
        };
      };
      goog.functions.partialRight = function(a2, b2) {
        var c2 = Array.prototype.slice.call(arguments, 1);
        return function() {
          var b3 = Array.prototype.slice.call(arguments);
          b3.push.apply(b3, c2);
          return a2.apply(this, b3);
        };
      };
      goog.functions.withReturnValue = function(a2, b2) {
        return goog.functions.sequence(a2, goog.functions.constant(b2));
      };
      goog.functions.equalTo = function(a2, b2) {
        return function(c2) {
          return b2 ? a2 == c2 : a2 === c2;
        };
      };
      goog.functions.compose = function(a2, b2) {
        var c2 = arguments, d2 = c2.length;
        return function() {
          var a3;
          d2 && (a3 = c2[d2 - 1].apply(this, arguments));
          for (var b3 = d2 - 2; 0 <= b3; b3--)
            a3 = c2[b3].call(this, a3);
          return a3;
        };
      };
      goog.functions.sequence = function(a2) {
        var b2 = arguments, c2 = b2.length;
        return function() {
          for (var a3, e2 = 0; e2 < c2; e2++)
            a3 = b2[e2].apply(this, arguments);
          return a3;
        };
      };
      goog.functions.and = function(a2) {
        var b2 = arguments, c2 = b2.length;
        return function() {
          for (var a3 = 0; a3 < c2; a3++)
            if (!b2[a3].apply(this, arguments))
              return false;
          return true;
        };
      };
      goog.functions.or = function(a2) {
        var b2 = arguments, c2 = b2.length;
        return function() {
          for (var a3 = 0; a3 < c2; a3++)
            if (b2[a3].apply(this, arguments))
              return true;
          return false;
        };
      };
      goog.functions.not = function(a2) {
        return function() {
          return !a2.apply(this, arguments);
        };
      };
      goog.functions.create = function(a2, b2) {
        var c2 = function() {
        };
        c2.prototype = a2.prototype;
        c2 = new c2();
        a2.apply(c2, Array.prototype.slice.call(arguments, 1));
        return c2;
      };
      goog.functions.CACHE_RETURN_VALUE = true;
      goog.functions.cacheReturnValue = function(a2) {
        var b2 = false, c2;
        return function() {
          if (!goog.functions.CACHE_RETURN_VALUE)
            return a2();
          b2 || (c2 = a2(), b2 = true);
          return c2;
        };
      };
      goog.functions.once = function(a2) {
        var b2 = a2;
        return function() {
          if (b2) {
            var a3 = b2;
            b2 = null;
            a3();
          }
        };
      };
      goog.functions.debounce = function(a2, b2, c2) {
        var d2 = 0;
        return function(e2) {
          goog.global.clearTimeout(d2);
          var f2 = arguments;
          d2 = goog.global.setTimeout(function() {
            a2.apply(c2, f2);
          }, b2);
        };
      };
      goog.functions.throttle = function(a2, b2, c2) {
        var d2 = 0, e2 = false, f2 = [], g = function() {
          d2 = 0;
          e2 && (e2 = false, h());
        }, h = function() {
          d2 = goog.global.setTimeout(g, b2);
          a2.apply(c2, f2);
        };
        return function(a3) {
          f2 = arguments;
          d2 ? e2 = true : h();
        };
      };
      goog.functions.rateLimit = function(a2, b2, c2) {
        var d2 = 0, e2 = function() {
          d2 = 0;
        };
        return function(f2) {
          d2 || (d2 = goog.global.setTimeout(e2, b2), a2.apply(c2, arguments));
        };
      };
      goog.dom.HtmlElement = function() {
      };
      goog.dom.TagName = function(a2) {
        this.tagName_ = a2;
      };
      goog.dom.TagName.prototype.toString = function() {
        return this.tagName_;
      };
      goog.dom.TagName.A = new goog.dom.TagName("A");
      goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
      goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
      goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
      goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
      goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
      goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
      goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
      goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
      goog.dom.TagName.B = new goog.dom.TagName("B");
      goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
      goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
      goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
      goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
      goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
      goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
      goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
      goog.dom.TagName.BR = new goog.dom.TagName("BR");
      goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
      goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
      goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
      goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
      goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
      goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
      goog.dom.TagName.COL = new goog.dom.TagName("COL");
      goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
      goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
      goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
      goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
      goog.dom.TagName.DD = new goog.dom.TagName("DD");
      goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
      goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
      goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
      goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
      goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
      goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
      goog.dom.TagName.DL = new goog.dom.TagName("DL");
      goog.dom.TagName.DT = new goog.dom.TagName("DT");
      goog.dom.TagName.EM = new goog.dom.TagName("EM");
      goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
      goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
      goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
      goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
      goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
      goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
      goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
      goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
      goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
      goog.dom.TagName.H1 = new goog.dom.TagName("H1");
      goog.dom.TagName.H2 = new goog.dom.TagName("H2");
      goog.dom.TagName.H3 = new goog.dom.TagName("H3");
      goog.dom.TagName.H4 = new goog.dom.TagName("H4");
      goog.dom.TagName.H5 = new goog.dom.TagName("H5");
      goog.dom.TagName.H6 = new goog.dom.TagName("H6");
      goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
      goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
      goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
      goog.dom.TagName.HR = new goog.dom.TagName("HR");
      goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
      goog.dom.TagName.I = new goog.dom.TagName("I");
      goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
      goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
      goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
      goog.dom.TagName.INS = new goog.dom.TagName("INS");
      goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
      goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
      goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
      goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
      goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
      goog.dom.TagName.LI = new goog.dom.TagName("LI");
      goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
      goog.dom.TagName.MAIN = new goog.dom.TagName("MAIN");
      goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
      goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
      goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
      goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
      goog.dom.TagName.MENUITEM = new goog.dom.TagName("MENUITEM");
      goog.dom.TagName.META = new goog.dom.TagName("META");
      goog.dom.TagName.METER = new goog.dom.TagName("METER");
      goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
      goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
      goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
      goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
      goog.dom.TagName.OL = new goog.dom.TagName("OL");
      goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
      goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
      goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
      goog.dom.TagName.P = new goog.dom.TagName("P");
      goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
      goog.dom.TagName.PICTURE = new goog.dom.TagName("PICTURE");
      goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
      goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
      goog.dom.TagName.Q = new goog.dom.TagName("Q");
      goog.dom.TagName.RP = new goog.dom.TagName("RP");
      goog.dom.TagName.RT = new goog.dom.TagName("RT");
      goog.dom.TagName.RTC = new goog.dom.TagName("RTC");
      goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
      goog.dom.TagName.S = new goog.dom.TagName("S");
      goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
      goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
      goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
      goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
      goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
      goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
      goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
      goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
      goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
      goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
      goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
      goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
      goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
      goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
      goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
      goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
      goog.dom.TagName.TD = new goog.dom.TagName("TD");
      goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
      goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
      goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
      goog.dom.TagName.TH = new goog.dom.TagName("TH");
      goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
      goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
      goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
      goog.dom.TagName.TR = new goog.dom.TagName("TR");
      goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
      goog.dom.TagName.TT = new goog.dom.TagName("TT");
      goog.dom.TagName.U = new goog.dom.TagName("U");
      goog.dom.TagName.UL = new goog.dom.TagName("UL");
      goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
      goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
      goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
      goog.dom.tags = {};
      goog.dom.tags.VOID_TAGS_ = { area: true, base: true, br: true, col: true, command: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true };
      goog.dom.tags.isVoidTag = function(a2) {
        return true === goog.dom.tags.VOID_TAGS_[a2];
      };
      goog.html = {};
      goog.html.trustedtypes = {};
      goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#html") : null;
      goog.string = {};
      goog.string.TypedString = function() {
      };
      goog.string.Const = function(a2, b2) {
        this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a2 === goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ && b2 || "";
        this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
      };
      goog.string.Const.prototype.implementsGoogStringTypedString = true;
      goog.string.Const.prototype.getTypedStringValue = function() {
        return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
      };
      goog.DEBUG && (goog.string.Const.prototype.toString = function() {
        return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}";
      });
      goog.string.Const.unwrap = function(a2) {
        if (a2 instanceof goog.string.Const && a2.constructor === goog.string.Const && a2.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_)
          return a2.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
        goog.asserts.fail("expected object of type Const, got '" + a2 + "'");
        return "type_error:Const";
      };
      goog.string.Const.from = function(a2) {
        return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_, a2);
      };
      goog.string.Const.TYPE_MARKER_ = {};
      goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {};
      goog.string.Const.EMPTY = goog.string.Const.from("");
      goog.html.SafeScript = function() {
        this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
        this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
      };
      goog.html.SafeScript.prototype.implementsGoogStringTypedString = true;
      goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
      goog.html.SafeScript.fromConstant = function(a2) {
        a2 = goog.string.Const.unwrap(a2);
        return 0 === a2.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeScript.fromConstantAndArgs = function(a2, b2) {
        for (var c2 = [], d2 = 1; d2 < arguments.length; d2++)
          c2.push(goog.html.SafeScript.stringify_(arguments[d2]));
        return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("(" + goog.string.Const.unwrap(a2) + ")(" + c2.join(", ") + ");");
      };
      goog.html.SafeScript.fromJson = function(a2) {
        return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(goog.html.SafeScript.stringify_(a2));
      };
      goog.html.SafeScript.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
      };
      goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
        return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}";
      });
      goog.html.SafeScript.unwrap = function(a2) {
        return goog.html.SafeScript.unwrapTrustedScript(a2).toString();
      };
      goog.html.SafeScript.unwrapTrustedScript = function(a2) {
        if (a2 instanceof goog.html.SafeScript && a2.constructor === goog.html.SafeScript && a2.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
          return a2.privateDoNotAccessOrElseSafeScriptWrappedValue_;
        goog.asserts.fail("expected object of type SafeScript, got '" + a2 + "' of type " + goog.typeOf(a2));
        return "type_error:SafeScript";
      };
      goog.html.SafeScript.stringify_ = function(a2) {
        return JSON.stringify(a2).replace(/</g, "\\x3c");
      };
      goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a2) {
        return new goog.html.SafeScript().initSecurityPrivateDoNotAccessOrElse_(a2);
      };
      goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a2) {
        this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScript(a2) : a2;
        return this;
      };
      goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
      goog.fs = {};
      goog.fs.url = {};
      goog.fs.url.createObjectUrl = function(a2) {
        return goog.fs.url.getUrlObject_().createObjectURL(a2);
      };
      goog.fs.url.revokeObjectUrl = function(a2) {
        goog.fs.url.getUrlObject_().revokeObjectURL(a2);
      };
      goog.fs.url.UrlObject_ = function() {
      };
      goog.fs.url.UrlObject_.prototype.createObjectURL = function(a2) {
      };
      goog.fs.url.UrlObject_.prototype.revokeObjectURL = function(a2) {
      };
      goog.fs.url.getUrlObject_ = function() {
        var a2 = goog.fs.url.findUrlObject_();
        if (null != a2)
          return a2;
        throw Error("This browser doesn't seem to support blob URLs");
      };
      goog.fs.url.findUrlObject_ = function() {
        return void 0 !== goog.global.URL && void 0 !== goog.global.URL.createObjectURL ? goog.global.URL : void 0 !== goog.global.webkitURL && void 0 !== goog.global.webkitURL.createObjectURL ? goog.global.webkitURL : void 0 !== goog.global.createObjectURL ? goog.global : null;
      };
      goog.fs.url.browserSupportsObjectUrls = function() {
        return null != goog.fs.url.findUrlObject_();
      };
      goog.fs.blob = {};
      goog.fs.blob.getBlob = function(a2) {
        var b2 = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;
        if (void 0 !== b2) {
          b2 = new b2();
          for (var c2 = 0; c2 < arguments.length; c2++)
            b2.append(arguments[c2]);
          return b2.getBlob();
        }
        return goog.fs.blob.getBlobWithProperties(goog.array.toArray(arguments));
      };
      goog.fs.blob.getBlobWithProperties = function(a2, b2, c2) {
        var d2 = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;
        if (void 0 !== d2) {
          d2 = new d2();
          for (var e2 = 0; e2 < a2.length; e2++)
            d2.append(a2[e2], c2);
          return d2.getBlob(b2);
        }
        if (void 0 !== goog.global.Blob)
          return d2 = {}, b2 && (d2.type = b2), c2 && (d2.endings = c2), new Blob(a2, d2);
        throw Error("This browser doesn't seem to support creating Blobs");
      };
      goog.i18n = {};
      goog.i18n.bidi = {};
      goog.i18n.bidi.FORCE_RTL = false;
      goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)) || 7 <= goog.LOCALE.length && ("-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) && ("adlm" == goog.LOCALE.substring(3, 7).toLowerCase() || "arab" == goog.LOCALE.substring(3, 7).toLowerCase() || "hebr" == goog.LOCALE.substring(3, 7).toLowerCase() || "nkoo" == goog.LOCALE.substring(
        3,
        7
      ).toLowerCase() || "rohg" == goog.LOCALE.substring(3, 7).toLowerCase() || "thaa" == goog.LOCALE.substring(3, 7).toLowerCase()) || 8 <= goog.LOCALE.length && ("-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4)) && ("adlm" == goog.LOCALE.substring(4, 8).toLowerCase() || "arab" == goog.LOCALE.substring(4, 8).toLowerCase() || "hebr" == goog.LOCALE.substring(4, 8).toLowerCase() || "nkoo" == goog.LOCALE.substring(4, 8).toLowerCase() || "rohg" == goog.LOCALE.substring(4, 8).toLowerCase() || "thaa" == goog.LOCALE.substring(4, 8).toLowerCase());
      goog.i18n.bidi.Format = { LRE: "\u202A", RLE: "\u202B", PDF: "\u202C", LRM: "\u200E", RLM: "\u200F" };
      goog.i18n.bidi.Dir = { LTR: 1, RTL: -1, NEUTRAL: 0 };
      goog.i18n.bidi.RIGHT = "right";
      goog.i18n.bidi.LEFT = "left";
      goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
      goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
      goog.i18n.bidi.toDir = function(a2, b2) {
        return "number" == typeof a2 ? 0 < a2 ? goog.i18n.bidi.Dir.LTR : 0 > a2 ? goog.i18n.bidi.Dir.RTL : b2 ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a2 ? null : a2 ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
      };
      goog.i18n.bidi.ltrChars_ = "A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0900-\u1FFF\u200E\u2C00-\uD801\uD804-\uD839\uD83C-\uDBFF\uF900-\uFB1C\uFE00-\uFE6F\uFEFD-\uFFFF";
      goog.i18n.bidi.rtlChars_ = "\u0591-\u06EF\u06FA-\u08FF\u200F\uD802-\uD803\uD83A-\uD83B\uFB1D-\uFDFF\uFE70-\uFEFC";
      goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
      goog.i18n.bidi.stripHtmlIfNeeded_ = function(a2, b2) {
        return b2 ? a2.replace(goog.i18n.bidi.htmlSkipReg_, "") : a2;
      };
      goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
      goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
      goog.i18n.bidi.hasAnyRtl = function(a2, b2) {
        return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a2, b2));
      };
      goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
      goog.i18n.bidi.hasAnyLtr = function(a2, b2) {
        return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a2, b2));
      };
      goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
      goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
      goog.i18n.bidi.isRtlChar = function(a2) {
        return goog.i18n.bidi.rtlRe_.test(a2);
      };
      goog.i18n.bidi.isLtrChar = function(a2) {
        return goog.i18n.bidi.ltrRe_.test(a2);
      };
      goog.i18n.bidi.isNeutralChar = function(a2) {
        return !goog.i18n.bidi.isLtrChar(a2) && !goog.i18n.bidi.isRtlChar(a2);
      };
      goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
      goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
      goog.i18n.bidi.startsWithRtl = function(a2, b2) {
        return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a2, b2));
      };
      goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
      goog.i18n.bidi.startsWithLtr = function(a2, b2) {
        return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a2, b2));
      };
      goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
      goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
      goog.i18n.bidi.isNeutralText = function(a2, b2) {
        a2 = goog.i18n.bidi.stripHtmlIfNeeded_(a2, b2);
        return goog.i18n.bidi.isRequiredLtrRe_.test(a2) || !goog.i18n.bidi.hasAnyLtr(a2) && !goog.i18n.bidi.hasAnyRtl(a2);
      };
      goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
      goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
      goog.i18n.bidi.endsWithLtr = function(a2, b2) {
        return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a2, b2));
      };
      goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
      goog.i18n.bidi.endsWithRtl = function(a2, b2) {
        return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a2, b2));
      };
      goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
      goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
      goog.i18n.bidi.isRtlLanguage = function(a2) {
        return goog.i18n.bidi.rtlLocalesRe_.test(a2);
      };
      goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
      goog.i18n.bidi.guardBracketInText = function(a2, b2) {
        b2 = (void 0 === b2 ? goog.i18n.bidi.hasAnyRtl(a2) : b2) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
        return a2.replace(goog.i18n.bidi.bracketGuardTextRe_, b2 + "$&" + b2);
      };
      goog.i18n.bidi.enforceRtlInHtml = function(a2) {
        return "<" == a2.charAt(0) ? a2.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a2 + "</span>";
      };
      goog.i18n.bidi.enforceRtlInText = function(a2) {
        return goog.i18n.bidi.Format.RLE + a2 + goog.i18n.bidi.Format.PDF;
      };
      goog.i18n.bidi.enforceLtrInHtml = function(a2) {
        return "<" == a2.charAt(0) ? a2.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a2 + "</span>";
      };
      goog.i18n.bidi.enforceLtrInText = function(a2) {
        return goog.i18n.bidi.Format.LRE + a2 + goog.i18n.bidi.Format.PDF;
      };
      goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
      goog.i18n.bidi.leftRe_ = /left/gi;
      goog.i18n.bidi.rightRe_ = /right/gi;
      goog.i18n.bidi.tempRe_ = /%%%%/g;
      goog.i18n.bidi.mirrorCSS = function(a2) {
        return a2.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
      };
      goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
      goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
      goog.i18n.bidi.normalizeHebrewQuote = function(a2) {
        return a2.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05F4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05F3");
      };
      goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
      goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
      goog.i18n.bidi.rtlDetectionThreshold_ = 0.4;
      goog.i18n.bidi.estimateDirection = function(a2, b2) {
        var c2 = 0, d2 = 0, e2 = false;
        a2 = goog.i18n.bidi.stripHtmlIfNeeded_(a2, b2).split(goog.i18n.bidi.wordSeparatorRe_);
        for (b2 = 0; b2 < a2.length; b2++) {
          var f2 = a2[b2];
          goog.i18n.bidi.startsWithRtl(f2) ? (c2++, d2++) : goog.i18n.bidi.isRequiredLtrRe_.test(f2) ? e2 = true : goog.i18n.bidi.hasAnyLtr(f2) ? d2++ : goog.i18n.bidi.hasNumeralsRe_.test(f2) && (e2 = true);
        }
        return 0 == d2 ? e2 ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c2 / d2 > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
      };
      goog.i18n.bidi.detectRtlDirectionality = function(a2, b2) {
        return goog.i18n.bidi.estimateDirection(a2, b2) == goog.i18n.bidi.Dir.RTL;
      };
      goog.i18n.bidi.setElementDirAndAlign = function(a2, b2) {
        a2 && (b2 = goog.i18n.bidi.toDir(b2)) && (a2.style.textAlign = b2 == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a2.dir = b2 == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
      };
      goog.i18n.bidi.setElementDirByTextDirectionality = function(a2, b2) {
        switch (goog.i18n.bidi.estimateDirection(b2)) {
          case goog.i18n.bidi.Dir.LTR:
            a2.dir = "ltr";
            break;
          case goog.i18n.bidi.Dir.RTL:
            a2.dir = "rtl";
            break;
          default:
            a2.removeAttribute("dir");
        }
      };
      goog.i18n.bidi.DirectionalString = function() {
      };
      goog.html.TrustedResourceUrl = function(a2, b2) {
        this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a2 === goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ && b2 || "";
        this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
      };
      goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = true;
      goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString();
      };
      goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = true;
      goog.html.TrustedResourceUrl.prototype.getDirection = function() {
        return goog.i18n.bidi.Dir.LTR;
      };
      goog.html.TrustedResourceUrl.prototype.cloneWithParams = function(a2, b2) {
        var c2 = goog.html.TrustedResourceUrl.unwrap(this);
        c2 = goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(c2);
        var d2 = c2[3] || "";
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(c2[1] + goog.html.TrustedResourceUrl.stringifyParams_("?", c2[2] || "", a2) + goog.html.TrustedResourceUrl.stringifyParams_("#", d2, b2));
      };
      goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
        return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}";
      });
      goog.html.TrustedResourceUrl.unwrap = function(a2) {
        return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(a2).toString();
      };
      goog.html.TrustedResourceUrl.unwrapTrustedScriptURL = function(a2) {
        if (a2 instanceof goog.html.TrustedResourceUrl && a2.constructor === goog.html.TrustedResourceUrl && a2.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
          return a2.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
        goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a2 + "' of type " + goog.typeOf(a2));
        return "type_error:TrustedResourceUrl";
      };
      goog.html.TrustedResourceUrl.format = function(a2, b2) {
        var c2 = goog.string.Const.unwrap(a2);
        if (!goog.html.TrustedResourceUrl.BASE_URL_.test(c2))
          throw Error("Invalid TrustedResourceUrl format: " + c2);
        a2 = c2.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function(a3, e2) {
          if (!Object.prototype.hasOwnProperty.call(b2, e2))
            throw Error('Found marker, "' + e2 + '", in format string, "' + c2 + '", but no valid label mapping found in args: ' + JSON.stringify(b2));
          a3 = b2[e2];
          return a3 instanceof goog.string.Const ? goog.string.Const.unwrap(a3) : encodeURIComponent(String(a3));
        });
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
      goog.html.TrustedResourceUrl.BASE_URL_ = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i;
      goog.html.TrustedResourceUrl.URL_PARAM_PARSER_ = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
      goog.html.TrustedResourceUrl.formatWithParams = function(a2, b2, c2, d2) {
        return goog.html.TrustedResourceUrl.format(a2, b2).cloneWithParams(c2, d2);
      };
      goog.html.TrustedResourceUrl.fromConstant = function(a2) {
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a2));
      };
      goog.html.TrustedResourceUrl.fromConstants = function(a2) {
        for (var b2 = "", c2 = 0; c2 < a2.length; c2++)
          b2 += goog.string.Const.unwrap(a2[c2]);
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b2);
      };
      goog.html.TrustedResourceUrl.fromSafeScript = function(a2) {
        a2 = goog.fs.blob.getBlobWithProperties([goog.html.SafeScript.unwrap(a2)], "text/javascript");
        a2 = goog.fs.url.createObjectUrl(a2);
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
      goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a2) {
        a2 = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScriptURL(a2) : a2;
        return new goog.html.TrustedResourceUrl(goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_, a2);
      };
      goog.html.TrustedResourceUrl.stringifyParams_ = function(a2, b2, c2) {
        if (null == c2)
          return b2;
        if ("string" === typeof c2)
          return c2 ? a2 + encodeURIComponent(c2) : "";
        for (var d2 in c2) {
          var e2 = c2[d2];
          e2 = Array.isArray(e2) ? e2 : [e2];
          for (var f2 = 0; f2 < e2.length; f2++) {
            var g = e2[f2];
            null != g && (b2 || (b2 = a2), b2 += (b2.length > a2.length ? "&" : "") + encodeURIComponent(d2) + "=" + encodeURIComponent(String(g)));
          }
        }
        return b2;
      };
      goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
      goog.string.internal = {};
      goog.string.internal.startsWith = function(a2, b2) {
        return 0 == a2.lastIndexOf(b2, 0);
      };
      goog.string.internal.endsWith = function(a2, b2) {
        var c2 = a2.length - b2.length;
        return 0 <= c2 && a2.indexOf(b2, c2) == c2;
      };
      goog.string.internal.caseInsensitiveStartsWith = function(a2, b2) {
        return 0 == goog.string.internal.caseInsensitiveCompare(b2, a2.substr(0, b2.length));
      };
      goog.string.internal.caseInsensitiveEndsWith = function(a2, b2) {
        return 0 == goog.string.internal.caseInsensitiveCompare(b2, a2.substr(a2.length - b2.length, b2.length));
      };
      goog.string.internal.caseInsensitiveEquals = function(a2, b2) {
        return a2.toLowerCase() == b2.toLowerCase();
      };
      goog.string.internal.isEmptyOrWhitespace = function(a2) {
        return /^[\s\xa0]*$/.test(a2);
      };
      goog.string.internal.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a2) {
        return a2.trim();
      } : function(a2) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a2)[1];
      };
      goog.string.internal.caseInsensitiveCompare = function(a2, b2) {
        a2 = String(a2).toLowerCase();
        b2 = String(b2).toLowerCase();
        return a2 < b2 ? -1 : a2 == b2 ? 0 : 1;
      };
      goog.string.internal.newLineToBr = function(a2, b2) {
        return a2.replace(/(\r\n|\r|\n)/g, b2 ? "<br />" : "<br>");
      };
      goog.string.internal.htmlEscape = function(a2, b2) {
        if (b2)
          a2 = a2.replace(goog.string.internal.AMP_RE_, "&amp;").replace(goog.string.internal.LT_RE_, "&lt;").replace(goog.string.internal.GT_RE_, "&gt;").replace(goog.string.internal.QUOT_RE_, "&quot;").replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.internal.NULL_RE_, "&#0;");
        else {
          if (!goog.string.internal.ALL_RE_.test(a2))
            return a2;
          -1 != a2.indexOf("&") && (a2 = a2.replace(goog.string.internal.AMP_RE_, "&amp;"));
          -1 != a2.indexOf("<") && (a2 = a2.replace(
            goog.string.internal.LT_RE_,
            "&lt;"
          ));
          -1 != a2.indexOf(">") && (a2 = a2.replace(goog.string.internal.GT_RE_, "&gt;"));
          -1 != a2.indexOf('"') && (a2 = a2.replace(goog.string.internal.QUOT_RE_, "&quot;"));
          -1 != a2.indexOf("'") && (a2 = a2.replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;"));
          -1 != a2.indexOf("\0") && (a2 = a2.replace(goog.string.internal.NULL_RE_, "&#0;"));
        }
        return a2;
      };
      goog.string.internal.AMP_RE_ = /&/g;
      goog.string.internal.LT_RE_ = /</g;
      goog.string.internal.GT_RE_ = />/g;
      goog.string.internal.QUOT_RE_ = /"/g;
      goog.string.internal.SINGLE_QUOTE_RE_ = /'/g;
      goog.string.internal.NULL_RE_ = /\x00/g;
      goog.string.internal.ALL_RE_ = /[\x00&<>"']/;
      goog.string.internal.whitespaceEscape = function(a2, b2) {
        return goog.string.internal.newLineToBr(a2.replace(/  /g, " &#160;"), b2);
      };
      goog.string.internal.contains = function(a2, b2) {
        return -1 != a2.indexOf(b2);
      };
      goog.string.internal.caseInsensitiveContains = function(a2, b2) {
        return goog.string.internal.contains(a2.toLowerCase(), b2.toLowerCase());
      };
      goog.string.internal.compareVersions = function(a2, b2) {
        var c2 = 0;
        a2 = goog.string.internal.trim(String(a2)).split(".");
        b2 = goog.string.internal.trim(String(b2)).split(".");
        for (var d2 = Math.max(a2.length, b2.length), e2 = 0; 0 == c2 && e2 < d2; e2++) {
          var f2 = a2[e2] || "", g = b2[e2] || "";
          do {
            f2 = /(\d*)(\D*)(.*)/.exec(f2) || ["", "", "", ""];
            g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
            if (0 == f2[0].length && 0 == g[0].length)
              break;
            c2 = 0 == f2[1].length ? 0 : parseInt(f2[1], 10);
            var h = 0 == g[1].length ? 0 : parseInt(g[1], 10);
            c2 = goog.string.internal.compareElements_(c2, h) || goog.string.internal.compareElements_(0 == f2[2].length, 0 == g[2].length) || goog.string.internal.compareElements_(f2[2], g[2]);
            f2 = f2[3];
            g = g[3];
          } while (0 == c2);
        }
        return c2;
      };
      goog.string.internal.compareElements_ = function(a2, b2) {
        return a2 < b2 ? -1 : a2 > b2 ? 1 : 0;
      };
      goog.html.SafeUrl = function(a2, b2) {
        this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = a2 === goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ && b2 || "";
        this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
      };
      goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
      goog.html.SafeUrl.prototype.implementsGoogStringTypedString = true;
      goog.html.SafeUrl.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
      };
      goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = true;
      goog.html.SafeUrl.prototype.getDirection = function() {
        return goog.i18n.bidi.Dir.LTR;
      };
      goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
        return "SafeUrl{" + this.privateDoNotAccessOrElseSafeUrlWrappedValue_ + "}";
      });
      goog.html.SafeUrl.unwrap = function(a2) {
        if (a2 instanceof goog.html.SafeUrl && a2.constructor === goog.html.SafeUrl && a2.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
          return a2.privateDoNotAccessOrElseSafeUrlWrappedValue_;
        goog.asserts.fail("expected object of type SafeUrl, got '" + a2 + "' of type " + goog.typeOf(a2));
        return "type_error:SafeUrl";
      };
      goog.html.SafeUrl.fromConstant = function(a2) {
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a2));
      };
      goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i;
      goog.html.SafeUrl.isSafeMimeType = function(a2) {
        return goog.html.SAFE_MIME_TYPE_PATTERN_.test(a2);
      };
      goog.html.SafeUrl.fromBlob = function(a2) {
        a2 = goog.html.SafeUrl.isSafeMimeType(a2.type) ? goog.fs.url.createObjectUrl(a2) : goog.html.SafeUrl.INNOCUOUS_STRING;
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeUrl.fromMediaSource = function(a2) {
        goog.asserts.assert("MediaSource" in goog.global, "No support for MediaSource");
        a2 = a2 instanceof MediaSource ? goog.fs.url.createObjectUrl(a2) : goog.html.SafeUrl.INNOCUOUS_STRING;
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.DATA_URL_PATTERN_ = /^data:(.*);base64,[a-z0-9+\/]+=*$/i;
      goog.html.SafeUrl.fromDataUrl = function(a2) {
        a2 = a2.replace(/(%0A|%0D)/g, "");
        var b2 = a2.match(goog.html.DATA_URL_PATTERN_);
        b2 = b2 && goog.html.SafeUrl.isSafeMimeType(b2[1]);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b2 ? a2 : goog.html.SafeUrl.INNOCUOUS_STRING);
      };
      goog.html.SafeUrl.fromTelUrl = function(a2) {
        goog.string.internal.caseInsensitiveStartsWith(a2, "tel:") || (a2 = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SIP_URL_PATTERN_ = /^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i;
      goog.html.SafeUrl.fromSipUrl = function(a2) {
        goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(a2)) || (a2 = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeUrl.fromFacebookMessengerUrl = function(a2) {
        goog.string.internal.caseInsensitiveStartsWith(a2, "fb-messenger://share") || (a2 = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeUrl.fromWhatsAppUrl = function(a2) {
        goog.string.internal.caseInsensitiveStartsWith(a2, "whatsapp://send") || (a2 = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeUrl.fromSmsUrl = function(a2) {
        goog.string.internal.caseInsensitiveStartsWith(a2, "sms:") && goog.html.SafeUrl.isSmsUrlBodyValid_(a2) || (a2 = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeUrl.isSmsUrlBodyValid_ = function(a2) {
        var b2 = a2.indexOf("#");
        0 < b2 && (a2 = a2.substring(0, b2));
        b2 = a2.match(/[?&]body=/gi);
        if (!b2)
          return true;
        if (1 < b2.length)
          return false;
        a2 = a2.match(/[?&]body=([^&]*)/)[1];
        if (!a2)
          return true;
        try {
          decodeURIComponent(a2);
        } catch (c2) {
          return false;
        }
        return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(a2);
      };
      goog.html.SafeUrl.fromSshUrl = function(a2) {
        goog.string.internal.caseInsensitiveStartsWith(a2, "ssh://") || (a2 = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeUrl.sanitizeChromeExtensionUrl = function(a2, b2) {
        return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\/\/([^\/]+)\//, a2, b2);
      };
      goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function(a2, b2) {
        return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\/\/([^\/]+)\//, a2, b2);
      };
      goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function(a2, b2) {
        return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\/\/([^\/]+)\//, a2, b2);
      };
      goog.html.SafeUrl.sanitizeExtensionUrl_ = function(a2, b2, c2) {
        (a2 = a2.exec(b2)) ? (a2 = a2[1], -1 == (c2 instanceof goog.string.Const ? [goog.string.Const.unwrap(c2)] : c2.map(function(a3) {
          return goog.string.Const.unwrap(a3);
        })).indexOf(a2) && (b2 = goog.html.SafeUrl.INNOCUOUS_STRING)) : b2 = goog.html.SafeUrl.INNOCUOUS_STRING;
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b2);
      };
      goog.html.SafeUrl.fromTrustedResourceUrl = function(a2) {
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a2));
      };
      goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
      goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;
      goog.html.SafeUrl.sanitize = function(a2) {
        if (a2 instanceof goog.html.SafeUrl)
          return a2;
        a2 = "object" == typeof a2 && a2.implementsGoogStringTypedString ? a2.getTypedStringValue() : String(a2);
        goog.html.SAFE_URL_PATTERN_.test(a2) || (a2 = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeUrl.sanitizeAssertUnchanged = function(a2, b2) {
        if (a2 instanceof goog.html.SafeUrl)
          return a2;
        a2 = "object" == typeof a2 && a2.implementsGoogStringTypedString ? a2.getTypedStringValue() : String(a2);
        if (b2 && /^data:/i.test(a2) && (b2 = goog.html.SafeUrl.fromDataUrl(a2), b2.getTypedStringValue() == a2))
          return b2;
        goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test(a2), "%s does not match the safe URL pattern", a2) || (a2 = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
      goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a2) {
        return new goog.html.SafeUrl(goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_, a2);
      };
      goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
      goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
      goog.html.SafeStyle = function() {
        this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
        this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
      };
      goog.html.SafeStyle.prototype.implementsGoogStringTypedString = true;
      goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
      goog.html.SafeStyle.fromConstant = function(a2) {
        a2 = goog.string.Const.unwrap(a2);
        if (0 === a2.length)
          return goog.html.SafeStyle.EMPTY;
        goog.asserts.assert(goog.string.internal.endsWith(a2, ";"), "Last character of style string is not ';': " + a2);
        goog.asserts.assert(goog.string.internal.contains(a2, ":"), `Style string must contain at least one ':', to specify a "name: value" pair: ` + a2);
        return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeStyle.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
      };
      goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
        return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}";
      });
      goog.html.SafeStyle.unwrap = function(a2) {
        if (a2 instanceof goog.html.SafeStyle && a2.constructor === goog.html.SafeStyle && a2.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
          return a2.privateDoNotAccessOrElseSafeStyleWrappedValue_;
        goog.asserts.fail("expected object of type SafeStyle, got '" + a2 + "' of type " + goog.typeOf(a2));
        return "type_error:SafeStyle";
      };
      goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a2) {
        return new goog.html.SafeStyle().initSecurityPrivateDoNotAccessOrElse_(a2);
      };
      goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a2) {
        this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a2;
        return this;
      };
      goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
      goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
      goog.html.SafeStyle.create = function(a2) {
        var b2 = "", c2;
        for (c2 in a2) {
          if (!/^[-_a-zA-Z0-9]+$/.test(c2))
            throw Error("Name allows only [-_a-zA-Z0-9], got: " + c2);
          var d2 = a2[c2];
          null != d2 && (d2 = Array.isArray(d2) ? goog.array.map(d2, goog.html.SafeStyle.sanitizePropertyValue_).join(" ") : goog.html.SafeStyle.sanitizePropertyValue_(d2), b2 += c2 + ":" + d2 + ";");
        }
        return b2 ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b2) : goog.html.SafeStyle.EMPTY;
      };
      goog.html.SafeStyle.sanitizePropertyValue_ = function(a2) {
        if (a2 instanceof goog.html.SafeUrl)
          return 'url("' + goog.html.SafeUrl.unwrap(a2).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
        a2 = a2 instanceof goog.string.Const ? goog.string.Const.unwrap(a2) : goog.html.SafeStyle.sanitizePropertyValueString_(String(a2));
        if (/[{;}]/.test(a2))
          throw new goog.asserts.AssertionError("Value does not allow [{;}], got: %s.", [a2]);
        return a2;
      };
      goog.html.SafeStyle.sanitizePropertyValueString_ = function(a2) {
        var b2 = a2.replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1").replace(goog.html.SafeStyle.FUNCTIONS_RE_, "$1").replace(goog.html.SafeStyle.URL_RE_, "url");
        if (goog.html.SafeStyle.VALUE_RE_.test(b2)) {
          if (goog.html.SafeStyle.COMMENT_RE_.test(a2))
            return goog.asserts.fail("String value disallows comments, got: " + a2), goog.html.SafeStyle.INNOCUOUS_STRING;
          if (!goog.html.SafeStyle.hasBalancedQuotes_(a2))
            return goog.asserts.fail("String value requires balanced quotes, got: " + a2), goog.html.SafeStyle.INNOCUOUS_STRING;
          if (!goog.html.SafeStyle.hasBalancedSquareBrackets_(a2))
            return goog.asserts.fail("String value requires balanced square brackets and one identifier per pair of brackets, got: " + a2), goog.html.SafeStyle.INNOCUOUS_STRING;
        } else
          return goog.asserts.fail("String value allows only " + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + " and simple functions, got: " + a2), goog.html.SafeStyle.INNOCUOUS_STRING;
        return goog.html.SafeStyle.sanitizeUrl_(a2);
      };
      goog.html.SafeStyle.hasBalancedQuotes_ = function(a2) {
        for (var b2 = true, c2 = true, d2 = 0; d2 < a2.length; d2++) {
          var e2 = a2.charAt(d2);
          "'" == e2 && c2 ? b2 = !b2 : '"' == e2 && b2 && (c2 = !c2);
        }
        return b2 && c2;
      };
      goog.html.SafeStyle.hasBalancedSquareBrackets_ = function(a2) {
        for (var b2 = true, c2 = /^[-_a-zA-Z0-9]$/, d2 = 0; d2 < a2.length; d2++) {
          var e2 = a2.charAt(d2);
          if ("]" == e2) {
            if (b2)
              return false;
            b2 = true;
          } else if ("[" == e2) {
            if (!b2)
              return false;
            b2 = false;
          } else if (!b2 && !c2.test(e2))
            return false;
        }
        return b2;
      };
      goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ = `[-,."'%_!# a-zA-Z0-9\\[\\]]`;
      goog.html.SafeStyle.VALUE_RE_ = new RegExp("^" + goog.html.SafeStyle.VALUE_ALLOWED_CHARS_ + "+$");
      goog.html.SafeStyle.URL_RE_ = /\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;
      goog.html.SafeStyle.ALLOWED_FUNCTIONS_ = "calc cubic-bezier fit-content hsl hsla linear-gradient matrix minmax repeat rgb rgba (rotate|scale|translate)(X|Y|Z|3d)?".split(" ");
      goog.html.SafeStyle.FUNCTIONS_RE_ = new RegExp("\\b(" + goog.html.SafeStyle.ALLOWED_FUNCTIONS_.join("|") + ")\\([-+*/0-9a-z.%\\[\\], ]+\\)", "g");
      goog.html.SafeStyle.COMMENT_RE_ = /\/\*/;
      goog.html.SafeStyle.sanitizeUrl_ = function(a2) {
        return a2.replace(goog.html.SafeStyle.URL_RE_, function(a3, c2, d2, e2) {
          var b2 = "";
          d2 = d2.replace(/^(['"])(.*)\1$/, function(a4, c3, d3) {
            b2 = c3;
            return d3;
          });
          a3 = goog.html.SafeUrl.sanitize(d2).getTypedStringValue();
          return c2 + b2 + a3 + b2 + e2;
        });
      };
      goog.html.SafeStyle.concat = function(a2) {
        var b2 = "", c2 = function(a3) {
          Array.isArray(a3) ? goog.array.forEach(a3, c2) : b2 += goog.html.SafeStyle.unwrap(a3);
        };
        goog.array.forEach(arguments, c2);
        return b2 ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b2) : goog.html.SafeStyle.EMPTY;
      };
      goog.html.SafeStyleSheet = function() {
        this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
        this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
      };
      goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = true;
      goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
      goog.html.SafeStyleSheet.createRule = function(a2, b2) {
        if (goog.string.internal.contains(a2, "<"))
          throw Error("Selector does not allow '<', got: " + a2);
        var c2 = a2.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
        if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(c2))
          throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: " + a2);
        if (!goog.html.SafeStyleSheet.hasBalancedBrackets_(c2))
          throw Error("() and [] in selector must be balanced, got: " + a2);
        b2 instanceof goog.html.SafeStyle || (b2 = goog.html.SafeStyle.create(b2));
        a2 = a2 + "{" + goog.html.SafeStyle.unwrap(b2).replace(/</g, "\\3C ") + "}";
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeStyleSheet.hasBalancedBrackets_ = function(a2) {
        for (var b2 = { "(": ")", "[": "]" }, c2 = [], d2 = 0; d2 < a2.length; d2++) {
          var e2 = a2[d2];
          if (b2[e2])
            c2.push(b2[e2]);
          else if (goog.object.contains(b2, e2) && c2.pop() != e2)
            return false;
        }
        return 0 == c2.length;
      };
      goog.html.SafeStyleSheet.concat = function(a2) {
        var b2 = "", c2 = function(a3) {
          Array.isArray(a3) ? goog.array.forEach(a3, c2) : b2 += goog.html.SafeStyleSheet.unwrap(a3);
        };
        goog.array.forEach(arguments, c2);
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b2);
      };
      goog.html.SafeStyleSheet.fromConstant = function(a2) {
        a2 = goog.string.Const.unwrap(a2);
        if (0 === a2.length)
          return goog.html.SafeStyleSheet.EMPTY;
        goog.asserts.assert(!goog.string.internal.contains(a2, "<"), "Forbidden '<' character in style sheet string: " + a2);
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a2);
      };
      goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
      };
      goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
        return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}";
      });
      goog.html.SafeStyleSheet.unwrap = function(a2) {
        if (a2 instanceof goog.html.SafeStyleSheet && a2.constructor === goog.html.SafeStyleSheet && a2.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
          return a2.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
        goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a2 + "' of type " + goog.typeOf(a2));
        return "type_error:SafeStyleSheet";
      };
      goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a2) {
        return new goog.html.SafeStyleSheet().initSecurityPrivateDoNotAccessOrElse_(a2);
      };
      goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a2) {
        this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a2;
        return this;
      };
      goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
      goog.labs = {};
      goog.labs.userAgent = {};
      goog.labs.userAgent.util = {};
      goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
        var a2 = goog.labs.userAgent.util.getNavigator_();
        return a2 && (a2 = a2.userAgent) ? a2 : "";
      };
      goog.labs.userAgent.util.getNavigator_ = function() {
        return goog.global.navigator;
      };
      goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
      goog.labs.userAgent.util.setUserAgent = function(a2) {
        goog.labs.userAgent.util.userAgent_ = a2 || goog.labs.userAgent.util.getNativeUserAgentString_();
      };
      goog.labs.userAgent.util.getUserAgent = function() {
        return goog.labs.userAgent.util.userAgent_;
      };
      goog.labs.userAgent.util.matchUserAgent = function(a2) {
        var b2 = goog.labs.userAgent.util.getUserAgent();
        return goog.string.internal.contains(b2, a2);
      };
      goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a2) {
        var b2 = goog.labs.userAgent.util.getUserAgent();
        return goog.string.internal.caseInsensitiveContains(b2, a2);
      };
      goog.labs.userAgent.util.extractVersionTuples = function(a2) {
        for (var b2 = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c2 = [], d2; d2 = b2.exec(a2); )
          c2.push([d2[1], d2[2], d2[3] || void 0]);
        return c2;
      };
      goog.labs.userAgent.browser = {};
      goog.labs.userAgent.browser.matchOpera_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Opera");
      };
      goog.labs.userAgent.browser.matchIE_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
      };
      goog.labs.userAgent.browser.matchEdgeHtml_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Edge");
      };
      goog.labs.userAgent.browser.matchEdgeChromium_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Edg/");
      };
      goog.labs.userAgent.browser.matchOperaChromium_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("OPR");
      };
      goog.labs.userAgent.browser.matchFirefox_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Firefox") || goog.labs.userAgent.util.matchUserAgent("FxiOS");
      };
      goog.labs.userAgent.browser.matchSafari_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdgeHtml_() || goog.labs.userAgent.browser.matchEdgeChromium_() || goog.labs.userAgent.browser.matchOperaChromium_() || goog.labs.userAgent.browser.matchFirefox_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
      };
      goog.labs.userAgent.browser.matchCoast_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Coast");
      };
      goog.labs.userAgent.browser.matchIosWebview_ = function() {
        return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && !goog.labs.userAgent.browser.matchFirefox_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
      };
      goog.labs.userAgent.browser.matchChrome_ = function() {
        return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdgeHtml_();
      };
      goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
      };
      goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
      goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
      goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdgeHtml_;
      goog.labs.userAgent.browser.isEdgeChromium = goog.labs.userAgent.browser.matchEdgeChromium_;
      goog.labs.userAgent.browser.isOperaChromium = goog.labs.userAgent.browser.matchOperaChromium_;
      goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
      goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
      goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
      goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
      goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
      goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
      goog.labs.userAgent.browser.isSilk = function() {
        return goog.labs.userAgent.util.matchUserAgent("Silk");
      };
      goog.labs.userAgent.browser.getVersion = function() {
        function a2(a3) {
          a3 = goog.array.find(a3, d2);
          return c2[a3] || "";
        }
        var b2 = goog.labs.userAgent.util.getUserAgent();
        if (goog.labs.userAgent.browser.isIE())
          return goog.labs.userAgent.browser.getIEVersion_(b2);
        b2 = goog.labs.userAgent.util.extractVersionTuples(b2);
        var c2 = {};
        goog.array.forEach(b2, function(a3) {
          c2[a3[0]] = a3[1];
        });
        var d2 = goog.partial(goog.object.containsKey, c2);
        return goog.labs.userAgent.browser.isOpera() ? a2(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a2(["Edge"]) : goog.labs.userAgent.browser.isEdgeChromium() ? a2(["Edg"]) : goog.labs.userAgent.browser.isChrome() ? a2(["Chrome", "CriOS", "HeadlessChrome"]) : (b2 = b2[2]) && b2[1] || "";
      };
      goog.labs.userAgent.browser.isVersionOrHigher = function(a2) {
        return 0 <= goog.string.internal.compareVersions(goog.labs.userAgent.browser.getVersion(), a2);
      };
      goog.labs.userAgent.browser.getIEVersion_ = function(a2) {
        var b2 = /rv: *([\d\.]*)/.exec(a2);
        if (b2 && b2[1])
          return b2[1];
        b2 = "";
        var c2 = /MSIE +([\d\.]+)/.exec(a2);
        if (c2 && c2[1])
          if (a2 = /Trident\/(\d.\d)/.exec(a2), "7.0" == c2[1])
            if (a2 && a2[1])
              switch (a2[1]) {
                case "4.0":
                  b2 = "8.0";
                  break;
                case "5.0":
                  b2 = "9.0";
                  break;
                case "6.0":
                  b2 = "10.0";
                  break;
                case "7.0":
                  b2 = "11.0";
              }
            else
              b2 = "7.0";
          else
            b2 = c2[1];
        return b2;
      };
      goog.html.SafeHtml = function() {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
        this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
        this.dir_ = null;
      };
      goog.html.SafeHtml.ENABLE_ERROR_MESSAGES = goog.DEBUG;
      goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE = true;
      goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = true;
      goog.html.SafeHtml.prototype.getDirection = function() {
        return this.dir_;
      };
      goog.html.SafeHtml.prototype.implementsGoogStringTypedString = true;
      goog.html.SafeHtml.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
      };
      goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
        return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
      });
      goog.html.SafeHtml.unwrap = function(a2) {
        return goog.html.SafeHtml.unwrapTrustedHTML(a2).toString();
      };
      goog.html.SafeHtml.unwrapTrustedHTML = function(a2) {
        if (a2 instanceof goog.html.SafeHtml && a2.constructor === goog.html.SafeHtml && a2.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)
          return a2.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
        goog.asserts.fail("expected object of type SafeHtml, got '" + a2 + "' of type " + goog.typeOf(a2));
        return "type_error:SafeHtml";
      };
      goog.html.SafeHtml.htmlEscape = function(a2) {
        if (a2 instanceof goog.html.SafeHtml)
          return a2;
        var b2 = "object" == typeof a2, c2 = null;
        b2 && a2.implementsGoogI18nBidiDirectionalString && (c2 = a2.getDirection());
        a2 = b2 && a2.implementsGoogStringTypedString ? a2.getTypedStringValue() : String(a2);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.htmlEscape(a2), c2);
      };
      goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a2) {
        if (a2 instanceof goog.html.SafeHtml)
          return a2;
        a2 = goog.html.SafeHtml.htmlEscape(a2);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.newLineToBr(goog.html.SafeHtml.unwrap(a2)), a2.getDirection());
      };
      goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a2) {
        if (a2 instanceof goog.html.SafeHtml)
          return a2;
        a2 = goog.html.SafeHtml.htmlEscape(a2);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.whitespaceEscape(goog.html.SafeHtml.unwrap(a2)), a2.getDirection());
      };
      goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
      goog.html.SafeHtml.comment = function(a2) {
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!--" + goog.string.internal.htmlEscape(a2) + "-->", null);
      };
      goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
      goog.html.SafeHtml.URL_ATTRIBUTES_ = { action: true, cite: true, data: true, formaction: true, href: true, manifest: true, poster: true, src: true };
      goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = { APPLET: true, BASE: true, EMBED: true, IFRAME: true, LINK: true, MATH: true, META: true, OBJECT: true, SCRIPT: true, STYLE: true, SVG: true, TEMPLATE: true };
      goog.html.SafeHtml.create = function(a2, b2, c2) {
        goog.html.SafeHtml.verifyTagName(String(a2));
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a2), b2, c2);
      };
      goog.html.SafeHtml.verifyTagName = function(a2) {
        if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a2))
          throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "Invalid tag name <" + a2 + ">." : "");
        if (a2.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_)
          throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "Tag name <" + a2 + "> is not allowed for SafeHtml." : "");
      };
      goog.html.SafeHtml.createIframe = function(a2, b2, c2, d2) {
        a2 && goog.html.TrustedResourceUrl.unwrap(a2);
        var e2 = {};
        e2.src = a2 || null;
        e2.srcdoc = b2 && goog.html.SafeHtml.unwrap(b2);
        a2 = goog.html.SafeHtml.combineAttributes(e2, { sandbox: "" }, c2);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a2, d2);
      };
      goog.html.SafeHtml.createSandboxIframe = function(a2, b2, c2, d2) {
        if (!goog.html.SafeHtml.canUseSandboxIframe())
          throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? "The browser does not support sandboxed iframes." : "");
        var e2 = {};
        e2.src = a2 ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a2)) : null;
        e2.srcdoc = b2 || null;
        e2.sandbox = "";
        a2 = goog.html.SafeHtml.combineAttributes(e2, {}, c2);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a2, d2);
      };
      goog.html.SafeHtml.canUseSandboxIframe = function() {
        return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype;
      };
      goog.html.SafeHtml.createScriptSrc = function(a2, b2) {
        goog.html.TrustedResourceUrl.unwrap(a2);
        a2 = goog.html.SafeHtml.combineAttributes({ src: a2 }, {}, b2);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", a2);
      };
      goog.html.SafeHtml.createScript = function(a2, b2) {
        for (var c2 in b2) {
          var d2 = c2.toLowerCase();
          if ("language" == d2 || "src" == d2 || "text" == d2 || "type" == d2)
            throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Cannot set "' + d2 + '" attribute' : "");
        }
        c2 = "";
        a2 = goog.array.concat(a2);
        for (d2 = 0; d2 < a2.length; d2++)
          c2 += goog.html.SafeScript.unwrap(a2[d2]);
        a2 = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c2, goog.i18n.bidi.Dir.NEUTRAL);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", b2, a2);
      };
      goog.html.SafeHtml.createStyle = function(a2, b2) {
        b2 = goog.html.SafeHtml.combineAttributes({ type: "text/css" }, {}, b2);
        var c2 = "";
        a2 = goog.array.concat(a2);
        for (var d2 = 0; d2 < a2.length; d2++)
          c2 += goog.html.SafeStyleSheet.unwrap(a2[d2]);
        a2 = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c2, goog.i18n.bidi.Dir.NEUTRAL);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", b2, a2);
      };
      goog.html.SafeHtml.createMetaRefresh = function(a2, b2) {
        a2 = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a2));
        (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.internal.contains(a2, ";") && (a2 = "'" + a2.replace(/'/g, "%27") + "'");
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", { "http-equiv": "refresh", content: (b2 || 0) + "; url=" + a2 });
      };
      goog.html.SafeHtml.getAttrNameAndValue_ = function(a2, b2, c2) {
        if (c2 instanceof goog.string.Const)
          c2 = goog.string.Const.unwrap(c2);
        else if ("style" == b2.toLowerCase())
          if (goog.html.SafeHtml.SUPPORT_STYLE_ATTRIBUTE)
            c2 = goog.html.SafeHtml.getStyleValue_(c2);
          else
            throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "style" not supported.' : "");
        else {
          if (/^on/i.test(b2))
            throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "' + b2 + '" requires goog.string.Const value, "' + c2 + '" given.' : "");
          if (b2.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
            if (c2 instanceof goog.html.TrustedResourceUrl)
              c2 = goog.html.TrustedResourceUrl.unwrap(c2);
            else if (c2 instanceof goog.html.SafeUrl)
              c2 = goog.html.SafeUrl.unwrap(c2);
            else if ("string" === typeof c2)
              c2 = goog.html.SafeUrl.sanitize(c2).getTypedStringValue();
            else
              throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "' + b2 + '" on tag "' + a2 + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c2 + '" given.' : "");
        }
        c2.implementsGoogStringTypedString && (c2 = c2.getTypedStringValue());
        goog.asserts.assert("string" === typeof c2 || "number" === typeof c2, "String or number value expected, got " + typeof c2 + " with value: " + c2);
        return b2 + '="' + goog.string.internal.htmlEscape(String(c2)) + '"';
      };
      goog.html.SafeHtml.getStyleValue_ = function(a2) {
        if (!goog.isObject(a2))
          throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a2 + " given: " + a2 : "");
        a2 instanceof goog.html.SafeStyle || (a2 = goog.html.SafeStyle.create(a2));
        return goog.html.SafeStyle.unwrap(a2);
      };
      goog.html.SafeHtml.createWithDir = function(a2, b2, c2, d2) {
        b2 = goog.html.SafeHtml.create(b2, c2, d2);
        b2.dir_ = a2;
        return b2;
      };
      goog.html.SafeHtml.join = function(a2, b2) {
        a2 = goog.html.SafeHtml.htmlEscape(a2);
        var c2 = a2.getDirection(), d2 = [], e2 = function(a3) {
          Array.isArray(a3) ? goog.array.forEach(a3, e2) : (a3 = goog.html.SafeHtml.htmlEscape(a3), d2.push(goog.html.SafeHtml.unwrap(a3)), a3 = a3.getDirection(), c2 == goog.i18n.bidi.Dir.NEUTRAL ? c2 = a3 : a3 != goog.i18n.bidi.Dir.NEUTRAL && c2 != a3 && (c2 = null));
        };
        goog.array.forEach(b2, e2);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d2.join(goog.html.SafeHtml.unwrap(a2)), c2);
      };
      goog.html.SafeHtml.concat = function(a2) {
        return goog.html.SafeHtml.join(goog.html.SafeHtml.EMPTY, Array.prototype.slice.call(arguments));
      };
      goog.html.SafeHtml.concatWithDir = function(a2, b2) {
        var c2 = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
        c2.dir_ = a2;
        return c2;
      };
      goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
      goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a2, b2) {
        return new goog.html.SafeHtml().initSecurityPrivateDoNotAccessOrElse_(a2, b2);
      };
      goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a2, b2) {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY ? goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createHTML(a2) : a2;
        this.dir_ = b2;
        return this;
      };
      goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a2, b2, c2) {
        var d2 = null;
        var e2 = "<" + a2 + goog.html.SafeHtml.stringifyAttributes(a2, b2);
        null == c2 ? c2 = [] : Array.isArray(c2) || (c2 = [c2]);
        goog.dom.tags.isVoidTag(a2.toLowerCase()) ? (goog.asserts.assert(!c2.length, "Void tag <" + a2 + "> does not allow content."), e2 += ">") : (d2 = goog.html.SafeHtml.concat(c2), e2 += ">" + goog.html.SafeHtml.unwrap(d2) + "</" + a2 + ">", d2 = d2.getDirection());
        (a2 = b2 && b2.dir) && (d2 = /^(ltr|rtl|auto)$/i.test(a2) ? goog.i18n.bidi.Dir.NEUTRAL : null);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(
          e2,
          d2
        );
      };
      goog.html.SafeHtml.stringifyAttributes = function(a2, b2) {
        var c2 = "";
        if (b2)
          for (var d2 in b2) {
            if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d2))
              throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Invalid attribute name "' + d2 + '".' : "");
            var e2 = b2[d2];
            null != e2 && (c2 += " " + goog.html.SafeHtml.getAttrNameAndValue_(a2, d2, e2));
          }
        return c2;
      };
      goog.html.SafeHtml.combineAttributes = function(a2, b2, c2) {
        var d2 = {}, e2;
        for (e2 in a2)
          goog.asserts.assert(e2.toLowerCase() == e2, "Must be lower case"), d2[e2] = a2[e2];
        for (e2 in b2)
          goog.asserts.assert(e2.toLowerCase() == e2, "Must be lower case"), d2[e2] = b2[e2];
        if (c2)
          for (e2 in c2) {
            var f2 = e2.toLowerCase();
            if (f2 in a2)
              throw Error(goog.html.SafeHtml.ENABLE_ERROR_MESSAGES ? 'Cannot override "' + f2 + '" attribute, got "' + e2 + '" with value "' + c2[e2] + '"' : "");
            f2 in b2 && delete d2[f2];
            d2[e2] = c2[e2];
          }
        return d2;
      };
      goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
      goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
      goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
      goog.html.uncheckedconversions = {};
      goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a2, b2, c2) {
        goog.asserts.assertString(goog.string.Const.unwrap(a2), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a2)), "must provide non-empty justification");
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b2, c2 || null);
      };
      goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a2, b2) {
        goog.asserts.assertString(goog.string.Const.unwrap(a2), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a2)), "must provide non-empty justification");
        return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b2);
      };
      goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a2, b2) {
        goog.asserts.assertString(goog.string.Const.unwrap(a2), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a2)), "must provide non-empty justification");
        return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b2);
      };
      goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a2, b2) {
        goog.asserts.assertString(goog.string.Const.unwrap(a2), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a2)), "must provide non-empty justification");
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b2);
      };
      goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a2, b2) {
        goog.asserts.assertString(goog.string.Const.unwrap(a2), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a2)), "must provide non-empty justification");
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b2);
      };
      goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a2, b2) {
        goog.asserts.assertString(goog.string.Const.unwrap(a2), "must provide justification");
        goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a2)), "must provide non-empty justification");
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b2);
      };
      goog.dom.safe = {};
      goog.dom.safe.InsertAdjacentHtmlPosition = { AFTERBEGIN: "afterbegin", AFTEREND: "afterend", BEFOREBEGIN: "beforebegin", BEFOREEND: "beforeend" };
      goog.dom.safe.insertAdjacentHtml = function(a2, b2, c2) {
        a2.insertAdjacentHTML(b2, goog.html.SafeHtml.unwrapTrustedHTML(c2));
      };
      goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = { MATH: true, SCRIPT: true, STYLE: true, SVG: true, TEMPLATE: true };
      goog.dom.safe.isInnerHtmlCleanupRecursive_ = goog.functions.cacheReturnValue(function() {
        if (goog.DEBUG && "undefined" === typeof document)
          return false;
        var a2 = document.createElement("div"), b2 = document.createElement("div");
        b2.appendChild(document.createElement("div"));
        a2.appendChild(b2);
        if (goog.DEBUG && !a2.firstChild)
          return false;
        b2 = a2.firstChild.firstChild;
        a2.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(goog.html.SafeHtml.EMPTY);
        return !b2.parentElement;
      });
      goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse = function(a2, b2) {
        if (goog.dom.safe.isInnerHtmlCleanupRecursive_())
          for (; a2.lastChild; )
            a2.removeChild(a2.lastChild);
        a2.innerHTML = goog.html.SafeHtml.unwrapTrustedHTML(b2);
      };
      goog.dom.safe.setInnerHtml = function(a2, b2) {
        if (goog.asserts.ENABLE_ASSERTS) {
          var c2 = a2.tagName.toUpperCase();
          if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c2])
            throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a2.tagName + ".");
        }
        goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(a2, b2);
      };
      goog.dom.safe.setOuterHtml = function(a2, b2) {
        a2.outerHTML = goog.html.SafeHtml.unwrapTrustedHTML(b2);
      };
      goog.dom.safe.setFormElementAction = function(a2, b2) {
        b2 = b2 instanceof goog.html.SafeUrl ? b2 : goog.html.SafeUrl.sanitizeAssertUnchanged(b2);
        goog.dom.asserts.assertIsHTMLFormElement(a2).action = goog.html.SafeUrl.unwrap(b2);
      };
      goog.dom.safe.setButtonFormAction = function(a2, b2) {
        b2 = b2 instanceof goog.html.SafeUrl ? b2 : goog.html.SafeUrl.sanitizeAssertUnchanged(b2);
        goog.dom.asserts.assertIsHTMLButtonElement(a2).formAction = goog.html.SafeUrl.unwrap(b2);
      };
      goog.dom.safe.setInputFormAction = function(a2, b2) {
        b2 = b2 instanceof goog.html.SafeUrl ? b2 : goog.html.SafeUrl.sanitizeAssertUnchanged(b2);
        goog.dom.asserts.assertIsHTMLInputElement(a2).formAction = goog.html.SafeUrl.unwrap(b2);
      };
      goog.dom.safe.setStyle = function(a2, b2) {
        a2.style.cssText = goog.html.SafeStyle.unwrap(b2);
      };
      goog.dom.safe.documentWrite = function(a2, b2) {
        a2.write(goog.html.SafeHtml.unwrapTrustedHTML(b2));
      };
      goog.dom.safe.setAnchorHref = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLAnchorElement(a2);
        b2 = b2 instanceof goog.html.SafeUrl ? b2 : goog.html.SafeUrl.sanitizeAssertUnchanged(b2);
        a2.href = goog.html.SafeUrl.unwrap(b2);
      };
      goog.dom.safe.setImageSrc = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLImageElement(a2);
        if (!(b2 instanceof goog.html.SafeUrl)) {
          var c2 = /^data:image\//i.test(b2);
          b2 = goog.html.SafeUrl.sanitizeAssertUnchanged(b2, c2);
        }
        a2.src = goog.html.SafeUrl.unwrap(b2);
      };
      goog.dom.safe.setAudioSrc = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLAudioElement(a2);
        if (!(b2 instanceof goog.html.SafeUrl)) {
          var c2 = /^data:audio\//i.test(b2);
          b2 = goog.html.SafeUrl.sanitizeAssertUnchanged(b2, c2);
        }
        a2.src = goog.html.SafeUrl.unwrap(b2);
      };
      goog.dom.safe.setVideoSrc = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLVideoElement(a2);
        if (!(b2 instanceof goog.html.SafeUrl)) {
          var c2 = /^data:video\//i.test(b2);
          b2 = goog.html.SafeUrl.sanitizeAssertUnchanged(b2, c2);
        }
        a2.src = goog.html.SafeUrl.unwrap(b2);
      };
      goog.dom.safe.setEmbedSrc = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLEmbedElement(a2);
        a2.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b2);
      };
      goog.dom.safe.setFrameSrc = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLFrameElement(a2);
        a2.src = goog.html.TrustedResourceUrl.unwrap(b2);
      };
      goog.dom.safe.setIframeSrc = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLIFrameElement(a2);
        a2.src = goog.html.TrustedResourceUrl.unwrap(b2);
      };
      goog.dom.safe.setIframeSrcdoc = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLIFrameElement(a2);
        a2.srcdoc = goog.html.SafeHtml.unwrapTrustedHTML(b2);
      };
      goog.dom.safe.setLinkHrefAndRel = function(a2, b2, c2) {
        goog.dom.asserts.assertIsHTMLLinkElement(a2);
        a2.rel = c2;
        goog.string.internal.caseInsensitiveContains(c2, "stylesheet") ? (goog.asserts.assert(b2 instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a2.href = goog.html.TrustedResourceUrl.unwrap(b2)) : a2.href = b2 instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b2) : b2 instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b2) : goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitizeAssertUnchanged(b2));
      };
      goog.dom.safe.setObjectData = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLObjectElement(a2);
        a2.data = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b2);
      };
      goog.dom.safe.setScriptSrc = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLScriptElement(a2);
        a2.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b2);
        (b2 = goog.getScriptNonce()) && a2.setAttribute("nonce", b2);
      };
      goog.dom.safe.setScriptContent = function(a2, b2) {
        goog.dom.asserts.assertIsHTMLScriptElement(a2);
        a2.text = goog.html.SafeScript.unwrapTrustedScript(b2);
        (b2 = goog.getScriptNonce()) && a2.setAttribute("nonce", b2);
      };
      goog.dom.safe.setLocationHref = function(a2, b2) {
        goog.dom.asserts.assertIsLocation(a2);
        b2 = b2 instanceof goog.html.SafeUrl ? b2 : goog.html.SafeUrl.sanitizeAssertUnchanged(b2);
        a2.href = goog.html.SafeUrl.unwrap(b2);
      };
      goog.dom.safe.assignLocation = function(a2, b2) {
        goog.dom.asserts.assertIsLocation(a2);
        b2 = b2 instanceof goog.html.SafeUrl ? b2 : goog.html.SafeUrl.sanitizeAssertUnchanged(b2);
        a2.assign(goog.html.SafeUrl.unwrap(b2));
      };
      goog.dom.safe.replaceLocation = function(a2, b2) {
        b2 = b2 instanceof goog.html.SafeUrl ? b2 : goog.html.SafeUrl.sanitizeAssertUnchanged(b2);
        a2.replace(goog.html.SafeUrl.unwrap(b2));
      };
      goog.dom.safe.openInWindow = function(a2, b2, c2, d2, e2) {
        a2 = a2 instanceof goog.html.SafeUrl ? a2 : goog.html.SafeUrl.sanitizeAssertUnchanged(a2);
        b2 = b2 || goog.global;
        c2 = c2 instanceof goog.string.Const ? goog.string.Const.unwrap(c2) : c2 || "";
        return b2.open(goog.html.SafeUrl.unwrap(a2), c2, d2, e2);
      };
      goog.dom.safe.parseFromStringHtml = function(a2, b2) {
        return goog.dom.safe.parseFromString(a2, b2, "text/html");
      };
      goog.dom.safe.parseFromString = function(a2, b2, c2) {
        return a2.parseFromString(goog.html.SafeHtml.unwrapTrustedHTML(b2), c2);
      };
      goog.dom.safe.createImageFromBlob = function(a2) {
        if (!/^image\/.*/g.test(a2.type))
          throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");
        var b2 = goog.global.URL.createObjectURL(a2);
        a2 = new goog.global.Image();
        a2.onload = function() {
          goog.global.URL.revokeObjectURL(b2);
        };
        goog.dom.safe.setImageSrc(a2, goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Image blob URL."), b2));
        return a2;
      };
      goog.string.DETECT_DOUBLE_ESCAPING = false;
      goog.string.FORCE_NON_DOM_HTML_UNESCAPING = false;
      goog.string.Unicode = { NBSP: "\xA0" };
      goog.string.startsWith = goog.string.internal.startsWith;
      goog.string.endsWith = goog.string.internal.endsWith;
      goog.string.caseInsensitiveStartsWith = goog.string.internal.caseInsensitiveStartsWith;
      goog.string.caseInsensitiveEndsWith = goog.string.internal.caseInsensitiveEndsWith;
      goog.string.caseInsensitiveEquals = goog.string.internal.caseInsensitiveEquals;
      goog.string.subs = function(a2, b2) {
        for (var c2 = a2.split("%s"), d2 = "", e2 = Array.prototype.slice.call(arguments, 1); e2.length && 1 < c2.length; )
          d2 += c2.shift() + e2.shift();
        return d2 + c2.join("%s");
      };
      goog.string.collapseWhitespace = function(a2) {
        return a2.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
      };
      goog.string.isEmptyOrWhitespace = goog.string.internal.isEmptyOrWhitespace;
      goog.string.isEmptyString = function(a2) {
        return 0 == a2.length;
      };
      goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
      goog.string.isEmptyOrWhitespaceSafe = function(a2) {
        return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a2));
      };
      goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
      goog.string.isBreakingWhitespace = function(a2) {
        return !/[^\t\n\r ]/.test(a2);
      };
      goog.string.isAlpha = function(a2) {
        return !/[^a-zA-Z]/.test(a2);
      };
      goog.string.isNumeric = function(a2) {
        return !/[^0-9]/.test(a2);
      };
      goog.string.isAlphaNumeric = function(a2) {
        return !/[^a-zA-Z0-9]/.test(a2);
      };
      goog.string.isSpace = function(a2) {
        return " " == a2;
      };
      goog.string.isUnicodeChar = function(a2) {
        return 1 == a2.length && " " <= a2 && "~" >= a2 || "\x80" <= a2 && "\uFFFD" >= a2;
      };
      goog.string.stripNewlines = function(a2) {
        return a2.replace(/(\r\n|\r|\n)+/g, " ");
      };
      goog.string.canonicalizeNewlines = function(a2) {
        return a2.replace(/(\r\n|\r|\n)/g, "\n");
      };
      goog.string.normalizeWhitespace = function(a2) {
        return a2.replace(/\xa0|\s/g, " ");
      };
      goog.string.normalizeSpaces = function(a2) {
        return a2.replace(/\xa0|[ \t]+/g, " ");
      };
      goog.string.collapseBreakingSpaces = function(a2) {
        return a2.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
      };
      goog.string.trim = goog.string.internal.trim;
      goog.string.trimLeft = function(a2) {
        return a2.replace(/^[\s\xa0]+/, "");
      };
      goog.string.trimRight = function(a2) {
        return a2.replace(/[\s\xa0]+$/, "");
      };
      goog.string.caseInsensitiveCompare = goog.string.internal.caseInsensitiveCompare;
      goog.string.numberAwareCompare_ = function(a2, b2, c2) {
        if (a2 == b2)
          return 0;
        if (!a2)
          return -1;
        if (!b2)
          return 1;
        for (var d2 = a2.toLowerCase().match(c2), e2 = b2.toLowerCase().match(c2), f2 = Math.min(d2.length, e2.length), g = 0; g < f2; g++) {
          c2 = d2[g];
          var h = e2[g];
          if (c2 != h)
            return a2 = parseInt(c2, 10), !isNaN(a2) && (b2 = parseInt(h, 10), !isNaN(b2) && a2 - b2) ? a2 - b2 : c2 < h ? -1 : 1;
        }
        return d2.length != e2.length ? d2.length - e2.length : a2 < b2 ? -1 : 1;
      };
      goog.string.intAwareCompare = function(a2, b2) {
        return goog.string.numberAwareCompare_(a2, b2, /\d+|\D+/g);
      };
      goog.string.floatAwareCompare = function(a2, b2) {
        return goog.string.numberAwareCompare_(a2, b2, /\d+|\.\d+|\D+/g);
      };
      goog.string.numerateCompare = goog.string.floatAwareCompare;
      goog.string.urlEncode = function(a2) {
        return encodeURIComponent(String(a2));
      };
      goog.string.urlDecode = function(a2) {
        return decodeURIComponent(a2.replace(/\+/g, " "));
      };
      goog.string.newLineToBr = goog.string.internal.newLineToBr;
      goog.string.htmlEscape = function(a2, b2) {
        a2 = goog.string.internal.htmlEscape(a2, b2);
        goog.string.DETECT_DOUBLE_ESCAPING && (a2 = a2.replace(goog.string.E_RE_, "&#101;"));
        return a2;
      };
      goog.string.E_RE_ = /e/g;
      goog.string.unescapeEntities = function(a2) {
        return goog.string.contains(a2, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a2) : goog.string.unescapePureXmlEntities_(a2) : a2;
      };
      goog.string.unescapeEntitiesWithDocument = function(a2, b2) {
        return goog.string.contains(a2, "&") ? goog.string.unescapeEntitiesUsingDom_(a2, b2) : a2;
      };
      goog.string.unescapeEntitiesUsingDom_ = function(a2, b2) {
        var c2 = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"' };
        var d2 = b2 ? b2.createElement("div") : goog.global.document.createElement("div");
        return a2.replace(goog.string.HTML_ENTITY_PATTERN_, function(a3, b3) {
          var e2 = c2[a3];
          if (e2)
            return e2;
          "#" == b3.charAt(0) && (b3 = Number("0" + b3.substr(1)), isNaN(b3) || (e2 = String.fromCharCode(b3)));
          e2 || (goog.dom.safe.setInnerHtml(d2, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(
            goog.string.Const.from("Single HTML entity."),
            a3 + " "
          )), e2 = d2.firstChild.nodeValue.slice(0, -1));
          return c2[a3] = e2;
        });
      };
      goog.string.unescapePureXmlEntities_ = function(a2) {
        return a2.replace(/&([^;]+);/g, function(a3, c2) {
          switch (c2) {
            case "amp":
              return "&";
            case "lt":
              return "<";
            case "gt":
              return ">";
            case "quot":
              return '"';
            default:
              return "#" != c2.charAt(0) || (c2 = Number("0" + c2.substr(1)), isNaN(c2)) ? a3 : String.fromCharCode(c2);
          }
        });
      };
      goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
      goog.string.whitespaceEscape = function(a2, b2) {
        return goog.string.newLineToBr(a2.replace(/  /g, " &#160;"), b2);
      };
      goog.string.preserveSpaces = function(a2) {
        return a2.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
      };
      goog.string.stripQuotes = function(a2, b2) {
        for (var c2 = b2.length, d2 = 0; d2 < c2; d2++) {
          var e2 = 1 == c2 ? b2 : b2.charAt(d2);
          if (a2.charAt(0) == e2 && a2.charAt(a2.length - 1) == e2)
            return a2.substring(1, a2.length - 1);
        }
        return a2;
      };
      goog.string.truncate = function(a2, b2, c2) {
        c2 && (a2 = goog.string.unescapeEntities(a2));
        a2.length > b2 && (a2 = a2.substring(0, b2 - 3) + "...");
        c2 && (a2 = goog.string.htmlEscape(a2));
        return a2;
      };
      goog.string.truncateMiddle = function(a2, b2, c2, d2) {
        c2 && (a2 = goog.string.unescapeEntities(a2));
        if (d2 && a2.length > b2) {
          d2 > b2 && (d2 = b2);
          var e2 = a2.length - d2;
          a2 = a2.substring(0, b2 - d2) + "..." + a2.substring(e2);
        } else
          a2.length > b2 && (d2 = Math.floor(b2 / 2), e2 = a2.length - d2, a2 = a2.substring(0, d2 + b2 % 2) + "..." + a2.substring(e2));
        c2 && (a2 = goog.string.htmlEscape(a2));
        return a2;
      };
      goog.string.specialEscapeChars_ = { "\0": "\\0", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "	": "\\t", "\v": "\\x0B", '"': '\\"', "\\": "\\\\", "<": "\\u003C" };
      goog.string.jsEscapeCache_ = { "'": "\\'" };
      goog.string.quote = function(a2) {
        a2 = String(a2);
        for (var b2 = ['"'], c2 = 0; c2 < a2.length; c2++) {
          var d2 = a2.charAt(c2), e2 = d2.charCodeAt(0);
          b2[c2 + 1] = goog.string.specialEscapeChars_[d2] || (31 < e2 && 127 > e2 ? d2 : goog.string.escapeChar(d2));
        }
        b2.push('"');
        return b2.join("");
      };
      goog.string.escapeString = function(a2) {
        for (var b2 = [], c2 = 0; c2 < a2.length; c2++)
          b2[c2] = goog.string.escapeChar(a2.charAt(c2));
        return b2.join("");
      };
      goog.string.escapeChar = function(a2) {
        if (a2 in goog.string.jsEscapeCache_)
          return goog.string.jsEscapeCache_[a2];
        if (a2 in goog.string.specialEscapeChars_)
          return goog.string.jsEscapeCache_[a2] = goog.string.specialEscapeChars_[a2];
        var b2 = a2.charCodeAt(0);
        if (31 < b2 && 127 > b2)
          var c2 = a2;
        else {
          if (256 > b2) {
            if (c2 = "\\x", 16 > b2 || 256 < b2)
              c2 += "0";
          } else
            c2 = "\\u", 4096 > b2 && (c2 += "0");
          c2 += b2.toString(16).toUpperCase();
        }
        return goog.string.jsEscapeCache_[a2] = c2;
      };
      goog.string.contains = goog.string.internal.contains;
      goog.string.caseInsensitiveContains = goog.string.internal.caseInsensitiveContains;
      goog.string.countOf = function(a2, b2) {
        return a2 && b2 ? a2.split(b2).length - 1 : 0;
      };
      goog.string.removeAt = function(a2, b2, c2) {
        var d2 = a2;
        0 <= b2 && b2 < a2.length && 0 < c2 && (d2 = a2.substr(0, b2) + a2.substr(b2 + c2, a2.length - b2 - c2));
        return d2;
      };
      goog.string.remove = function(a2, b2) {
        return a2.replace(b2, "");
      };
      goog.string.removeAll = function(a2, b2) {
        b2 = new RegExp(goog.string.regExpEscape(b2), "g");
        return a2.replace(b2, "");
      };
      goog.string.replaceAll = function(a2, b2, c2) {
        b2 = new RegExp(goog.string.regExpEscape(b2), "g");
        return a2.replace(b2, c2.replace(/\$/g, "$$$$"));
      };
      goog.string.regExpEscape = function(a2) {
        return String(a2).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
      };
      goog.string.repeat = String.prototype.repeat ? function(a2, b2) {
        return a2.repeat(b2);
      } : function(a2, b2) {
        return Array(b2 + 1).join(a2);
      };
      goog.string.padNumber = function(a2, b2, c2) {
        a2 = void 0 !== c2 ? a2.toFixed(c2) : String(a2);
        c2 = a2.indexOf(".");
        -1 == c2 && (c2 = a2.length);
        return goog.string.repeat("0", Math.max(0, b2 - c2)) + a2;
      };
      goog.string.makeSafe = function(a2) {
        return null == a2 ? "" : String(a2);
      };
      goog.string.buildString = function(a2) {
        return Array.prototype.join.call(arguments, "");
      };
      goog.string.getRandomString = function() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
      };
      goog.string.compareVersions = goog.string.internal.compareVersions;
      goog.string.hashCode = function(a2) {
        for (var b2 = 0, c2 = 0; c2 < a2.length; ++c2)
          b2 = 31 * b2 + a2.charCodeAt(c2) >>> 0;
        return b2;
      };
      goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
      goog.string.createUniqueString = function() {
        return "goog_" + goog.string.uniqueStringCounter_++;
      };
      goog.string.toNumber = function(a2) {
        var b2 = Number(a2);
        return 0 == b2 && goog.string.isEmptyOrWhitespace(a2) ? NaN : b2;
      };
      goog.string.isLowerCamelCase = function(a2) {
        return /^[a-z]+([A-Z][a-z]*)*$/.test(a2);
      };
      goog.string.isUpperCamelCase = function(a2) {
        return /^([A-Z][a-z]*)+$/.test(a2);
      };
      goog.string.toCamelCase = function(a2) {
        return String(a2).replace(/\-([a-z])/g, function(a3, c2) {
          return c2.toUpperCase();
        });
      };
      goog.string.toSelectorCase = function(a2) {
        return String(a2).replace(/([A-Z])/g, "-$1").toLowerCase();
      };
      goog.string.toTitleCase = function(a2, b2) {
        b2 = "string" === typeof b2 ? goog.string.regExpEscape(b2) : "\\s";
        return a2.replace(new RegExp("(^" + (b2 ? "|[" + b2 + "]+" : "") + ")([a-z])", "g"), function(a3, b3, e2) {
          return b3 + e2.toUpperCase();
        });
      };
      goog.string.capitalize = function(a2) {
        return String(a2.charAt(0)).toUpperCase() + String(a2.substr(1)).toLowerCase();
      };
      goog.string.parseInt = function(a2) {
        isFinite(a2) && (a2 = String(a2));
        return "string" === typeof a2 ? /^\s*-?0x/i.test(a2) ? parseInt(a2, 16) : parseInt(a2, 10) : NaN;
      };
      goog.string.splitLimit = function(a2, b2, c2) {
        a2 = a2.split(b2);
        for (var d2 = []; 0 < c2 && a2.length; )
          d2.push(a2.shift()), c2--;
        a2.length && d2.push(a2.join(b2));
        return d2;
      };
      goog.string.lastComponent = function(a2, b2) {
        if (b2)
          "string" == typeof b2 && (b2 = [b2]);
        else
          return a2;
        for (var c2 = -1, d2 = 0; d2 < b2.length; d2++)
          if ("" != b2[d2]) {
            var e2 = a2.lastIndexOf(b2[d2]);
            e2 > c2 && (c2 = e2);
          }
        return -1 == c2 ? a2 : a2.slice(c2 + 1);
      };
      goog.string.editDistance = function(a2, b2) {
        var c2 = [], d2 = [];
        if (a2 == b2)
          return 0;
        if (!a2.length || !b2.length)
          return Math.max(a2.length, b2.length);
        for (var e2 = 0; e2 < b2.length + 1; e2++)
          c2[e2] = e2;
        for (e2 = 0; e2 < a2.length; e2++) {
          d2[0] = e2 + 1;
          for (var f2 = 0; f2 < b2.length; f2++)
            d2[f2 + 1] = Math.min(d2[f2] + 1, c2[f2 + 1] + 1, c2[f2] + Number(a2[e2] != b2[f2]));
          for (f2 = 0; f2 < c2.length; f2++)
            c2[f2] = d2[f2];
        }
        return d2[b2.length];
      };
      goog.labs.userAgent.engine = {};
      goog.labs.userAgent.engine.isPresto = function() {
        return goog.labs.userAgent.util.matchUserAgent("Presto");
      };
      goog.labs.userAgent.engine.isTrident = function() {
        return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
      };
      goog.labs.userAgent.engine.isEdge = function() {
        return goog.labs.userAgent.util.matchUserAgent("Edge");
      };
      goog.labs.userAgent.engine.isWebKit = function() {
        return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
      };
      goog.labs.userAgent.engine.isGecko = function() {
        return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
      };
      goog.labs.userAgent.engine.getVersion = function() {
        var a2 = goog.labs.userAgent.util.getUserAgent();
        if (a2) {
          a2 = goog.labs.userAgent.util.extractVersionTuples(a2);
          var b2 = goog.labs.userAgent.engine.getEngineTuple_(a2);
          if (b2)
            return "Gecko" == b2[0] ? goog.labs.userAgent.engine.getVersionForKey_(a2, "Firefox") : b2[1];
          a2 = a2[0];
          var c2;
          if (a2 && (c2 = a2[2]) && (c2 = /Trident\/([^\s;]+)/.exec(c2)))
            return c2[1];
        }
        return "";
      };
      goog.labs.userAgent.engine.getEngineTuple_ = function(a2) {
        if (!goog.labs.userAgent.engine.isEdge())
          return a2[1];
        for (var b2 = 0; b2 < a2.length; b2++) {
          var c2 = a2[b2];
          if ("Edge" == c2[0])
            return c2;
        }
      };
      goog.labs.userAgent.engine.isVersionOrHigher = function(a2) {
        return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a2);
      };
      goog.labs.userAgent.engine.getVersionForKey_ = function(a2, b2) {
        return (a2 = goog.array.find(a2, function(a3) {
          return b2 == a3[0];
        })) && a2[1] || "";
      };
      goog.labs.userAgent.platform = {};
      goog.labs.userAgent.platform.isAndroid = function() {
        return goog.labs.userAgent.util.matchUserAgent("Android");
      };
      goog.labs.userAgent.platform.isIpod = function() {
        return goog.labs.userAgent.util.matchUserAgent("iPod");
      };
      goog.labs.userAgent.platform.isIphone = function() {
        return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
      };
      goog.labs.userAgent.platform.isIpad = function() {
        return goog.labs.userAgent.util.matchUserAgent("iPad");
      };
      goog.labs.userAgent.platform.isIos = function() {
        return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
      };
      goog.labs.userAgent.platform.isMacintosh = function() {
        return goog.labs.userAgent.util.matchUserAgent("Macintosh");
      };
      goog.labs.userAgent.platform.isLinux = function() {
        return goog.labs.userAgent.util.matchUserAgent("Linux");
      };
      goog.labs.userAgent.platform.isWindows = function() {
        return goog.labs.userAgent.util.matchUserAgent("Windows");
      };
      goog.labs.userAgent.platform.isChromeOS = function() {
        return goog.labs.userAgent.util.matchUserAgent("CrOS");
      };
      goog.labs.userAgent.platform.isChromecast = function() {
        return goog.labs.userAgent.util.matchUserAgent("CrKey");
      };
      goog.labs.userAgent.platform.isKaiOS = function() {
        return goog.labs.userAgent.util.matchUserAgentIgnoreCase("KaiOS");
      };
      goog.labs.userAgent.platform.getVersion = function() {
        var a2 = goog.labs.userAgent.util.getUserAgent(), b2 = "";
        goog.labs.userAgent.platform.isWindows() ? (b2 = /Windows (?:NT|Phone) ([0-9.]+)/, b2 = (a2 = b2.exec(a2)) ? a2[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b2 = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b2 = (a2 = b2.exec(a2)) && a2[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b2 = /Mac OS X ([0-9_.]+)/, b2 = (a2 = b2.exec(a2)) ? a2[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isKaiOS() ? (b2 = /(?:KaiOS)\/(\S+)/i, b2 = (a2 = b2.exec(a2)) && a2[1]) : goog.labs.userAgent.platform.isAndroid() ? (b2 = /Android\s+([^\);]+)(\)|;)/, b2 = (a2 = b2.exec(a2)) && a2[1]) : goog.labs.userAgent.platform.isChromeOS() && (b2 = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b2 = (a2 = b2.exec(a2)) && a2[1]);
        return b2 || "";
      };
      goog.labs.userAgent.platform.isVersionOrHigher = function(a2) {
        return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a2);
      };
      goog.reflect = {};
      goog.reflect.object = function(a2, b2) {
        return b2;
      };
      goog.reflect.objectProperty = function(a2, b2) {
        return a2;
      };
      goog.reflect.sinkValue = function(a2) {
        goog.reflect.sinkValue[" "](a2);
        return a2;
      };
      goog.reflect.sinkValue[" "] = goog.nullFunction;
      goog.reflect.canAccessProperty = function(a2, b2) {
        try {
          return goog.reflect.sinkValue(a2[b2]), true;
        } catch (c2) {
        }
        return false;
      };
      goog.reflect.cache = function(a2, b2, c2, d2) {
        d2 = d2 ? d2(b2) : b2;
        return Object.prototype.hasOwnProperty.call(a2, d2) ? a2[d2] : a2[d2] = c2(b2);
      };
      goog.userAgent = {};
      goog.userAgent.ASSUME_IE = false;
      goog.userAgent.ASSUME_EDGE = false;
      goog.userAgent.ASSUME_GECKO = false;
      goog.userAgent.ASSUME_WEBKIT = false;
      goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
      goog.userAgent.ASSUME_OPERA = false;
      goog.userAgent.ASSUME_ANY_VERSION = false;
      goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
      goog.userAgent.getUserAgentString = function() {
        return goog.labs.userAgent.util.getUserAgent();
      };
      goog.userAgent.getNavigatorTyped = function() {
        return goog.global.navigator || null;
      };
      goog.userAgent.getNavigator = function() {
        return goog.userAgent.getNavigatorTyped();
      };
      goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
      goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
      goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
      goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
      goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
      goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
      goog.userAgent.isMobile_ = function() {
        return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
      };
      goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
      goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
      goog.userAgent.determinePlatform_ = function() {
        var a2 = goog.userAgent.getNavigatorTyped();
        return a2 && a2.platform || "";
      };
      goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
      goog.userAgent.ASSUME_MAC = false;
      goog.userAgent.ASSUME_WINDOWS = false;
      goog.userAgent.ASSUME_LINUX = false;
      goog.userAgent.ASSUME_X11 = false;
      goog.userAgent.ASSUME_ANDROID = false;
      goog.userAgent.ASSUME_IPHONE = false;
      goog.userAgent.ASSUME_IPAD = false;
      goog.userAgent.ASSUME_IPOD = false;
      goog.userAgent.ASSUME_KAIOS = false;
      goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
      goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
      goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
      goog.userAgent.isLegacyLinux_ = function() {
        return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
      };
      goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
      goog.userAgent.isX11_ = function() {
        var a2 = goog.userAgent.getNavigatorTyped();
        return !!a2 && goog.string.contains(a2.appVersion || "", "X11");
      };
      goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
      goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
      goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
      goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
      goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
      goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
      goog.userAgent.KAIOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_KAIOS : goog.labs.userAgent.platform.isKaiOS();
      goog.userAgent.determineVersion_ = function() {
        var a2 = "", b2 = goog.userAgent.getVersionRegexResult_();
        b2 && (a2 = b2 ? b2[1] : "");
        return goog.userAgent.IE && (b2 = goog.userAgent.getDocumentMode_(), null != b2 && b2 > parseFloat(a2)) ? String(b2) : a2;
      };
      goog.userAgent.getVersionRegexResult_ = function() {
        var a2 = goog.userAgent.getUserAgentString();
        if (goog.userAgent.GECKO)
          return /rv:([^\);]+)(\)|;)/.exec(a2);
        if (goog.userAgent.EDGE)
          return /Edge\/([\d\.]+)/.exec(a2);
        if (goog.userAgent.IE)
          return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a2);
        if (goog.userAgent.WEBKIT)
          return /WebKit\/(\S+)/.exec(a2);
        if (goog.userAgent.OPERA)
          return /(?:Version)[ \/]?(\S+)/.exec(a2);
      };
      goog.userAgent.getDocumentMode_ = function() {
        var a2 = goog.global.document;
        return a2 ? a2.documentMode : void 0;
      };
      goog.userAgent.VERSION = goog.userAgent.determineVersion_();
      goog.userAgent.compare = function(a2, b2) {
        return goog.string.compareVersions(a2, b2);
      };
      goog.userAgent.isVersionOrHigherCache_ = {};
      goog.userAgent.isVersionOrHigher = function(a2) {
        return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, a2, function() {
          return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a2);
        });
      };
      goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
      goog.userAgent.isDocumentModeOrHigher = function(a2) {
        return Number(goog.userAgent.DOCUMENT_MODE) >= a2;
      };
      goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
      goog.userAgent.DOCUMENT_MODE = function() {
        if (goog.global.document && goog.userAgent.IE) {
          var a2 = goog.userAgent.getDocumentMode_();
          return a2 ? a2 : parseInt(goog.userAgent.VERSION, 10) || void 0;
        }
      }();
      goog.userAgent.product = {};
      goog.userAgent.product.ASSUME_FIREFOX = false;
      goog.userAgent.product.ASSUME_IPHONE = false;
      goog.userAgent.product.ASSUME_IPAD = false;
      goog.userAgent.product.ASSUME_ANDROID = false;
      goog.userAgent.product.ASSUME_CHROME = false;
      goog.userAgent.product.ASSUME_SAFARI = false;
      goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
      goog.userAgent.product.OPERA = goog.userAgent.OPERA;
      goog.userAgent.product.IE = goog.userAgent.IE;
      goog.userAgent.product.EDGE = goog.userAgent.EDGE;
      goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
      goog.userAgent.product.isIphoneOrIpod_ = function() {
        return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
      };
      goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
      goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
      goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
      goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
      goog.userAgent.product.isSafariDesktop_ = function() {
        return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
      };
      goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
      goog.crypt.base64 = {};
      goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + "+/=";
      goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_ + "-_.";
      goog.crypt.base64.Alphabet = { DEFAULT: 0, NO_PADDING: 1, WEBSAFE: 2, WEBSAFE_DOT_PADDING: 3, WEBSAFE_NO_PADDING: 4 };
      goog.crypt.base64.paddingChars_ = "=.";
      goog.crypt.base64.isPadding_ = function(a2) {
        return goog.string.contains(goog.crypt.base64.paddingChars_, a2);
      };
      goog.crypt.base64.byteToCharMaps_ = {};
      goog.crypt.base64.charToByteMap_ = null;
      goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ = goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI || goog.userAgent.OPERA;
      goog.crypt.base64.HAS_NATIVE_ENCODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || "function" == typeof goog.global.btoa;
      goog.crypt.base64.HAS_NATIVE_DECODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || !goog.userAgent.product.SAFARI && !goog.userAgent.IE && "function" == typeof goog.global.atob;
      goog.crypt.base64.encodeByteArray = function(a2, b2) {
        goog.asserts.assert(goog.isArrayLike(a2), "encodeByteArray takes an array as a parameter");
        void 0 === b2 && (b2 = goog.crypt.base64.Alphabet.DEFAULT);
        goog.crypt.base64.init_();
        b2 = goog.crypt.base64.byteToCharMaps_[b2];
        for (var c2 = [], d2 = 0; d2 < a2.length; d2 += 3) {
          var e2 = a2[d2], f2 = d2 + 1 < a2.length, g = f2 ? a2[d2 + 1] : 0, h = d2 + 2 < a2.length, k = h ? a2[d2 + 2] : 0, l = e2 >> 2;
          e2 = (e2 & 3) << 4 | g >> 4;
          g = (g & 15) << 2 | k >> 6;
          k &= 63;
          h || (k = 64, f2 || (g = 64));
          c2.push(b2[l], b2[e2], b2[g] || "", b2[k] || "");
        }
        return c2.join("");
      };
      goog.crypt.base64.encodeString = function(a2, b2) {
        return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !b2 ? goog.global.btoa(a2) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a2), b2);
      };
      goog.crypt.base64.decodeString = function(a2, b2) {
        if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !b2)
          return goog.global.atob(a2);
        var c2 = "";
        goog.crypt.base64.decodeStringInternal_(a2, function(a3) {
          c2 += String.fromCharCode(a3);
        });
        return c2;
      };
      goog.crypt.base64.decodeStringToByteArray = function(a2, b2) {
        var c2 = [];
        goog.crypt.base64.decodeStringInternal_(a2, function(a3) {
          c2.push(a3);
        });
        return c2;
      };
      goog.crypt.base64.decodeStringToUint8Array = function(a2) {
        goog.asserts.assert(!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"), "Browser does not support typed arrays");
        var b2 = a2.length, c2 = 3 * b2 / 4;
        c2 % 3 ? c2 = Math.floor(c2) : goog.crypt.base64.isPadding_(a2[b2 - 1]) && (c2 = goog.crypt.base64.isPadding_(a2[b2 - 2]) ? c2 - 2 : c2 - 1);
        var d2 = new Uint8Array(c2), e2 = 0;
        goog.crypt.base64.decodeStringInternal_(a2, function(a3) {
          d2[e2++] = a3;
        });
        return d2.subarray(0, e2);
      };
      goog.crypt.base64.decodeStringInternal_ = function(a2, b2) {
        function c2(b3) {
          for (; d2 < a2.length; ) {
            var c3 = a2.charAt(d2++), e3 = goog.crypt.base64.charToByteMap_[c3];
            if (null != e3)
              return e3;
            if (!goog.string.isEmptyOrWhitespace(c3))
              throw Error("Unknown base64 encoding at char: " + c3);
          }
          return b3;
        }
        goog.crypt.base64.init_();
        for (var d2 = 0; ; ) {
          var e2 = c2(-1), f2 = c2(0), g = c2(64), h = c2(64);
          if (64 === h && -1 === e2)
            break;
          b2(e2 << 2 | f2 >> 4);
          64 != g && (b2(f2 << 4 & 240 | g >> 2), 64 != h && b2(g << 6 & 192 | h));
        }
      };
      goog.crypt.base64.init_ = function() {
        if (!goog.crypt.base64.charToByteMap_) {
          goog.crypt.base64.charToByteMap_ = {};
          for (var a2 = goog.crypt.base64.DEFAULT_ALPHABET_COMMON_.split(""), b2 = ["+/=", "+/", "-_=", "-_.", "-_"], c2 = 0; 5 > c2; c2++) {
            var d2 = a2.concat(b2[c2].split(""));
            goog.crypt.base64.byteToCharMaps_[c2] = d2;
            for (var e2 = 0; e2 < d2.length; e2++) {
              var f2 = d2[e2], g = goog.crypt.base64.charToByteMap_[f2];
              void 0 === g ? goog.crypt.base64.charToByteMap_[f2] = e2 : goog.asserts.assert(g === e2);
            }
          }
        }
      };
      jspb.utils = {};
      jspb.utils.split64Low = 0;
      jspb.utils.split64High = 0;
      jspb.utils.splitUint64 = function(a2) {
        var b2 = a2 >>> 0;
        a2 = Math.floor((a2 - b2) / jspb.BinaryConstants.TWO_TO_32) >>> 0;
        jspb.utils.split64Low = b2;
        jspb.utils.split64High = a2;
      };
      jspb.utils.splitInt64 = function(a2) {
        var b2 = 0 > a2;
        a2 = Math.abs(a2);
        var c2 = a2 >>> 0;
        a2 = Math.floor((a2 - c2) / jspb.BinaryConstants.TWO_TO_32);
        a2 >>>= 0;
        b2 && (a2 = ~a2 >>> 0, c2 = (~c2 >>> 0) + 1, 4294967295 < c2 && (c2 = 0, a2++, 4294967295 < a2 && (a2 = 0)));
        jspb.utils.split64Low = c2;
        jspb.utils.split64High = a2;
      };
      jspb.utils.splitZigzag64 = function(a2) {
        var b2 = 0 > a2;
        a2 = 2 * Math.abs(a2);
        jspb.utils.splitUint64(a2);
        a2 = jspb.utils.split64Low;
        var c2 = jspb.utils.split64High;
        b2 && (0 == a2 ? 0 == c2 ? c2 = a2 = 4294967295 : (c2--, a2 = 4294967295) : a2--);
        jspb.utils.split64Low = a2;
        jspb.utils.split64High = c2;
      };
      jspb.utils.splitFloat32 = function(a2) {
        var b2 = 0 > a2 ? 1 : 0;
        a2 = b2 ? -a2 : a2;
        if (0 === a2)
          0 < 1 / a2 ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 0) : (jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483648);
        else if (isNaN(a2))
          jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483647;
        else if (a2 > jspb.BinaryConstants.FLOAT32_MAX)
          jspb.utils.split64High = 0, jspb.utils.split64Low = (b2 << 31 | 2139095040) >>> 0;
        else if (a2 < jspb.BinaryConstants.FLOAT32_MIN)
          a2 = Math.round(a2 / Math.pow(2, -149)), jspb.utils.split64High = 0, jspb.utils.split64Low = (b2 << 31 | a2) >>> 0;
        else {
          var c2 = Math.floor(Math.log(a2) / Math.LN2);
          a2 *= Math.pow(2, -c2);
          a2 = Math.round(a2 * jspb.BinaryConstants.TWO_TO_23);
          16777216 <= a2 && ++c2;
          jspb.utils.split64High = 0;
          jspb.utils.split64Low = (b2 << 31 | c2 + 127 << 23 | a2 & 8388607) >>> 0;
        }
      };
      jspb.utils.splitFloat64 = function(a2) {
        var b2 = 0 > a2 ? 1 : 0;
        a2 = b2 ? -a2 : a2;
        if (0 === a2)
          jspb.utils.split64High = 0 < 1 / a2 ? 0 : 2147483648, jspb.utils.split64Low = 0;
        else if (isNaN(a2))
          jspb.utils.split64High = 2147483647, jspb.utils.split64Low = 4294967295;
        else if (a2 > jspb.BinaryConstants.FLOAT64_MAX)
          jspb.utils.split64High = (b2 << 31 | 2146435072) >>> 0, jspb.utils.split64Low = 0;
        else if (a2 < jspb.BinaryConstants.FLOAT64_MIN) {
          var c2 = a2 / Math.pow(2, -1074);
          a2 = c2 / jspb.BinaryConstants.TWO_TO_32;
          jspb.utils.split64High = (b2 << 31 | a2) >>> 0;
          jspb.utils.split64Low = c2 >>> 0;
        } else {
          c2 = a2;
          var d2 = 0;
          if (2 <= c2)
            for (; 2 <= c2 && 1023 > d2; )
              d2++, c2 /= 2;
          else
            for (; 1 > c2 && -1022 < d2; )
              c2 *= 2, d2--;
          c2 = a2 * Math.pow(2, -d2);
          a2 = c2 * jspb.BinaryConstants.TWO_TO_20 & 1048575;
          c2 = c2 * jspb.BinaryConstants.TWO_TO_52 >>> 0;
          jspb.utils.split64High = (b2 << 31 | d2 + 1023 << 20 | a2) >>> 0;
          jspb.utils.split64Low = c2;
        }
      };
      jspb.utils.splitHash64 = function(a2) {
        var b2 = a2.charCodeAt(0), c2 = a2.charCodeAt(1), d2 = a2.charCodeAt(2), e2 = a2.charCodeAt(3), f2 = a2.charCodeAt(4), g = a2.charCodeAt(5), h = a2.charCodeAt(6);
        a2 = a2.charCodeAt(7);
        jspb.utils.split64Low = b2 + (c2 << 8) + (d2 << 16) + (e2 << 24) >>> 0;
        jspb.utils.split64High = f2 + (g << 8) + (h << 16) + (a2 << 24) >>> 0;
      };
      jspb.utils.joinUint64 = function(a2, b2) {
        return b2 * jspb.BinaryConstants.TWO_TO_32 + (a2 >>> 0);
      };
      jspb.utils.joinInt64 = function(a2, b2) {
        var c2 = b2 & 2147483648;
        c2 && (a2 = ~a2 + 1 >>> 0, b2 = ~b2 >>> 0, 0 == a2 && (b2 = b2 + 1 >>> 0));
        a2 = jspb.utils.joinUint64(a2, b2);
        return c2 ? -a2 : a2;
      };
      jspb.utils.toZigzag64 = function(a2, b2, c2) {
        var d2 = b2 >> 31;
        return c2(a2 << 1 ^ d2, (b2 << 1 | a2 >>> 31) ^ d2);
      };
      jspb.utils.joinZigzag64 = function(a2, b2) {
        return jspb.utils.fromZigzag64(a2, b2, jspb.utils.joinInt64);
      };
      jspb.utils.fromZigzag64 = function(a2, b2, c2) {
        var d2 = -(a2 & 1);
        return c2((a2 >>> 1 | b2 << 31) ^ d2, b2 >>> 1 ^ d2);
      };
      jspb.utils.joinFloat32 = function(a2, b2) {
        b2 = 2 * (a2 >> 31) + 1;
        var c2 = a2 >>> 23 & 255;
        a2 &= 8388607;
        return 255 == c2 ? a2 ? NaN : Infinity * b2 : 0 == c2 ? b2 * Math.pow(2, -149) * a2 : b2 * Math.pow(2, c2 - 150) * (a2 + Math.pow(2, 23));
      };
      jspb.utils.joinFloat64 = function(a2, b2) {
        var c2 = 2 * (b2 >> 31) + 1, d2 = b2 >>> 20 & 2047;
        a2 = jspb.BinaryConstants.TWO_TO_32 * (b2 & 1048575) + a2;
        return 2047 == d2 ? a2 ? NaN : Infinity * c2 : 0 == d2 ? c2 * Math.pow(2, -1074) * a2 : c2 * Math.pow(2, d2 - 1075) * (a2 + jspb.BinaryConstants.TWO_TO_52);
      };
      jspb.utils.joinHash64 = function(a2, b2) {
        return String.fromCharCode(a2 >>> 0 & 255, a2 >>> 8 & 255, a2 >>> 16 & 255, a2 >>> 24 & 255, b2 >>> 0 & 255, b2 >>> 8 & 255, b2 >>> 16 & 255, b2 >>> 24 & 255);
      };
      jspb.utils.DIGITS = "0123456789abcdef".split("");
      jspb.utils.ZERO_CHAR_CODE_ = 48;
      jspb.utils.A_CHAR_CODE_ = 97;
      jspb.utils.joinUnsignedDecimalString = function(a2, b2) {
        function c2(a3, b3) {
          a3 = a3 ? String(a3) : "";
          return b3 ? "0000000".slice(a3.length) + a3 : a3;
        }
        if (2097151 >= b2)
          return "" + jspb.utils.joinUint64(a2, b2);
        var d2 = (a2 >>> 24 | b2 << 8) >>> 0 & 16777215;
        b2 = b2 >> 16 & 65535;
        a2 = (a2 & 16777215) + 6777216 * d2 + 6710656 * b2;
        d2 += 8147497 * b2;
        b2 *= 2;
        1e7 <= a2 && (d2 += Math.floor(a2 / 1e7), a2 %= 1e7);
        1e7 <= d2 && (b2 += Math.floor(d2 / 1e7), d2 %= 1e7);
        return c2(b2, 0) + c2(d2, b2) + c2(a2, 1);
      };
      jspb.utils.joinSignedDecimalString = function(a2, b2) {
        var c2 = b2 & 2147483648;
        c2 && (a2 = ~a2 + 1 >>> 0, b2 = ~b2 + (0 == a2 ? 1 : 0) >>> 0);
        a2 = jspb.utils.joinUnsignedDecimalString(a2, b2);
        return c2 ? "-" + a2 : a2;
      };
      jspb.utils.hash64ToDecimalString = function(a2, b2) {
        jspb.utils.splitHash64(a2);
        a2 = jspb.utils.split64Low;
        var c2 = jspb.utils.split64High;
        return b2 ? jspb.utils.joinSignedDecimalString(a2, c2) : jspb.utils.joinUnsignedDecimalString(a2, c2);
      };
      jspb.utils.hash64ArrayToDecimalStrings = function(a2, b2) {
        for (var c2 = Array(a2.length), d2 = 0; d2 < a2.length; d2++)
          c2[d2] = jspb.utils.hash64ToDecimalString(a2[d2], b2);
        return c2;
      };
      jspb.utils.decimalStringToHash64 = function(a2) {
        function b2(a3, b3) {
          for (var c3 = 0; 8 > c3 && (1 !== a3 || 0 < b3); c3++)
            b3 = a3 * e2[c3] + b3, e2[c3] = b3 & 255, b3 >>>= 8;
        }
        function c2() {
          for (var a3 = 0; 8 > a3; a3++)
            e2[a3] = ~e2[a3] & 255;
        }
        jspb.asserts.assert(0 < a2.length);
        var d2 = false;
        "-" === a2[0] && (d2 = true, a2 = a2.slice(1));
        for (var e2 = [0, 0, 0, 0, 0, 0, 0, 0], f2 = 0; f2 < a2.length; f2++)
          b2(10, a2.charCodeAt(f2) - jspb.utils.ZERO_CHAR_CODE_);
        d2 && (c2(), b2(1, 1));
        return goog.crypt.byteArrayToString(e2);
      };
      jspb.utils.splitDecimalString = function(a2) {
        jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a2));
      };
      jspb.utils.toHexDigit_ = function(a2) {
        return String.fromCharCode(10 > a2 ? jspb.utils.ZERO_CHAR_CODE_ + a2 : jspb.utils.A_CHAR_CODE_ - 10 + a2);
      };
      jspb.utils.fromHexCharCode_ = function(a2) {
        return a2 >= jspb.utils.A_CHAR_CODE_ ? a2 - jspb.utils.A_CHAR_CODE_ + 10 : a2 - jspb.utils.ZERO_CHAR_CODE_;
      };
      jspb.utils.hash64ToHexString = function(a2) {
        var b2 = Array(18);
        b2[0] = "0";
        b2[1] = "x";
        for (var c2 = 0; 8 > c2; c2++) {
          var d2 = a2.charCodeAt(7 - c2);
          b2[2 * c2 + 2] = jspb.utils.toHexDigit_(d2 >> 4);
          b2[2 * c2 + 3] = jspb.utils.toHexDigit_(d2 & 15);
        }
        return b2.join("");
      };
      jspb.utils.hexStringToHash64 = function(a2) {
        a2 = a2.toLowerCase();
        jspb.asserts.assert(18 == a2.length);
        jspb.asserts.assert("0" == a2[0]);
        jspb.asserts.assert("x" == a2[1]);
        for (var b2 = "", c2 = 0; 8 > c2; c2++) {
          var d2 = jspb.utils.fromHexCharCode_(a2.charCodeAt(2 * c2 + 2)), e2 = jspb.utils.fromHexCharCode_(a2.charCodeAt(2 * c2 + 3));
          b2 = String.fromCharCode(16 * d2 + e2) + b2;
        }
        return b2;
      };
      jspb.utils.hash64ToNumber = function(a2, b2) {
        jspb.utils.splitHash64(a2);
        a2 = jspb.utils.split64Low;
        var c2 = jspb.utils.split64High;
        return b2 ? jspb.utils.joinInt64(a2, c2) : jspb.utils.joinUint64(a2, c2);
      };
      jspb.utils.numberToHash64 = function(a2) {
        jspb.utils.splitInt64(a2);
        return jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High);
      };
      jspb.utils.countVarints = function(a2, b2, c2) {
        for (var d2 = 0, e2 = b2; e2 < c2; e2++)
          d2 += a2[e2] >> 7;
        return c2 - b2 - d2;
      };
      jspb.utils.countVarintFields = function(a2, b2, c2, d2) {
        var e2 = 0;
        d2 = 8 * d2 + jspb.BinaryConstants.WireType.VARINT;
        if (128 > d2)
          for (; b2 < c2 && a2[b2++] == d2; )
            for (e2++; ; ) {
              var f2 = a2[b2++];
              if (0 == (f2 & 128))
                break;
            }
        else
          for (; b2 < c2; ) {
            for (f2 = d2; 128 < f2; ) {
              if (a2[b2] != (f2 & 127 | 128))
                return e2;
              b2++;
              f2 >>= 7;
            }
            if (a2[b2++] != f2)
              break;
            for (e2++; f2 = a2[b2++], 0 != (f2 & 128); )
              ;
          }
        return e2;
      };
      jspb.utils.countFixedFields_ = function(a2, b2, c2, d2, e2) {
        var f2 = 0;
        if (128 > d2)
          for (; b2 < c2 && a2[b2++] == d2; )
            f2++, b2 += e2;
        else
          for (; b2 < c2; ) {
            for (var g = d2; 128 < g; ) {
              if (a2[b2++] != (g & 127 | 128))
                return f2;
              g >>= 7;
            }
            if (a2[b2++] != g)
              break;
            f2++;
            b2 += e2;
          }
        return f2;
      };
      jspb.utils.countFixed32Fields = function(a2, b2, c2, d2) {
        return jspb.utils.countFixedFields_(a2, b2, c2, 8 * d2 + jspb.BinaryConstants.WireType.FIXED32, 4);
      };
      jspb.utils.countFixed64Fields = function(a2, b2, c2, d2) {
        return jspb.utils.countFixedFields_(a2, b2, c2, 8 * d2 + jspb.BinaryConstants.WireType.FIXED64, 8);
      };
      jspb.utils.countDelimitedFields = function(a2, b2, c2, d2) {
        var e2 = 0;
        for (d2 = 8 * d2 + jspb.BinaryConstants.WireType.DELIMITED; b2 < c2; ) {
          for (var f2 = d2; 128 < f2; ) {
            if (a2[b2++] != (f2 & 127 | 128))
              return e2;
            f2 >>= 7;
          }
          if (a2[b2++] != f2)
            break;
          e2++;
          for (var g = 0, h = 1; f2 = a2[b2++], g += (f2 & 127) * h, h *= 128, 0 != (f2 & 128); )
            ;
          b2 += g;
        }
        return e2;
      };
      jspb.utils.debugBytesToTextFormat = function(a2) {
        var b2 = '"';
        if (a2) {
          a2 = jspb.utils.byteSourceToUint8Array(a2);
          for (var c2 = 0; c2 < a2.length; c2++)
            b2 += "\\x", 16 > a2[c2] && (b2 += "0"), b2 += a2[c2].toString(16);
        }
        return b2 + '"';
      };
      jspb.utils.debugScalarToTextFormat = function(a2) {
        return "string" === typeof a2 ? goog.string.quote(a2) : a2.toString();
      };
      jspb.utils.stringToByteArray = function(a2) {
        for (var b2 = new Uint8Array(a2.length), c2 = 0; c2 < a2.length; c2++) {
          var d2 = a2.charCodeAt(c2);
          if (255 < d2)
            throw Error("Conversion error: string contains codepoint outside of byte range");
          b2[c2] = d2;
        }
        return b2;
      };
      jspb.utils.byteSourceToUint8Array = function(a2) {
        if (a2.constructor === Uint8Array)
          return a2;
        if (a2.constructor === ArrayBuffer || a2.constructor === Array)
          return new Uint8Array(a2);
        if (a2.constructor === String)
          return goog.crypt.base64.decodeStringToUint8Array(a2);
        if (a2 instanceof Uint8Array)
          return new Uint8Array(a2.buffer, a2.byteOffset, a2.byteLength);
        jspb.asserts.fail("Type not convertible to Uint8Array.");
        return new Uint8Array(0);
      };
      jspb.BinaryDecoder = function(a2, b2, c2) {
        this.bytes_ = null;
        this.cursor_ = this.end_ = this.start_ = 0;
        this.error_ = false;
        a2 && this.setBlock(a2, b2, c2);
      };
      jspb.BinaryDecoder.instanceCache_ = [];
      jspb.BinaryDecoder.alloc = function(a2, b2, c2) {
        if (jspb.BinaryDecoder.instanceCache_.length) {
          var d2 = jspb.BinaryDecoder.instanceCache_.pop();
          a2 && d2.setBlock(a2, b2, c2);
          return d2;
        }
        return new jspb.BinaryDecoder(a2, b2, c2);
      };
      jspb.BinaryDecoder.prototype.free = function() {
        this.clear();
        100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
      };
      jspb.BinaryDecoder.prototype.clone = function() {
        return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_);
      };
      jspb.BinaryDecoder.prototype.clear = function() {
        this.bytes_ = null;
        this.cursor_ = this.end_ = this.start_ = 0;
        this.error_ = false;
      };
      jspb.BinaryDecoder.prototype.getBuffer = function() {
        return this.bytes_;
      };
      jspb.BinaryDecoder.prototype.setBlock = function(a2, b2, c2) {
        this.bytes_ = jspb.utils.byteSourceToUint8Array(a2);
        this.start_ = void 0 !== b2 ? b2 : 0;
        this.end_ = void 0 !== c2 ? this.start_ + c2 : this.bytes_.length;
        this.cursor_ = this.start_;
      };
      jspb.BinaryDecoder.prototype.getEnd = function() {
        return this.end_;
      };
      jspb.BinaryDecoder.prototype.setEnd = function(a2) {
        this.end_ = a2;
      };
      jspb.BinaryDecoder.prototype.reset = function() {
        this.cursor_ = this.start_;
      };
      jspb.BinaryDecoder.prototype.getCursor = function() {
        return this.cursor_;
      };
      jspb.BinaryDecoder.prototype.setCursor = function(a2) {
        this.cursor_ = a2;
      };
      jspb.BinaryDecoder.prototype.advance = function(a2) {
        this.cursor_ += a2;
        jspb.asserts.assert(this.cursor_ <= this.end_);
      };
      jspb.BinaryDecoder.prototype.atEnd = function() {
        return this.cursor_ == this.end_;
      };
      jspb.BinaryDecoder.prototype.pastEnd = function() {
        return this.cursor_ > this.end_;
      };
      jspb.BinaryDecoder.prototype.getError = function() {
        return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
      };
      jspb.BinaryDecoder.prototype.readSplitVarint64 = function(a2) {
        for (var b2 = 128, c2 = 0, d2 = 0, e2 = 0; 4 > e2 && 128 <= b2; e2++)
          b2 = this.bytes_[this.cursor_++], c2 |= (b2 & 127) << 7 * e2;
        128 <= b2 && (b2 = this.bytes_[this.cursor_++], c2 |= (b2 & 127) << 28, d2 |= (b2 & 127) >> 4);
        if (128 <= b2)
          for (e2 = 0; 5 > e2 && 128 <= b2; e2++)
            b2 = this.bytes_[this.cursor_++], d2 |= (b2 & 127) << 7 * e2 + 3;
        if (128 > b2)
          return a2(c2 >>> 0, d2 >>> 0);
        jspb.asserts.fail("Failed to read varint, encoding is invalid.");
        this.error_ = true;
      };
      jspb.BinaryDecoder.prototype.readSplitZigzagVarint64 = function(a2) {
        return this.readSplitVarint64(function(b2, c2) {
          return jspb.utils.fromZigzag64(b2, c2, a2);
        });
      };
      jspb.BinaryDecoder.prototype.readSplitFixed64 = function(a2) {
        var b2 = this.bytes_, c2 = this.cursor_;
        this.cursor_ += 8;
        for (var d2 = 0, e2 = 0, f2 = c2 + 7; f2 >= c2; f2--)
          d2 = d2 << 8 | b2[f2], e2 = e2 << 8 | b2[f2 + 4];
        return a2(d2, e2);
      };
      jspb.BinaryDecoder.prototype.skipVarint = function() {
        for (; this.bytes_[this.cursor_] & 128; )
          this.cursor_++;
        this.cursor_++;
      };
      jspb.BinaryDecoder.prototype.unskipVarint = function(a2) {
        for (; 128 < a2; )
          this.cursor_--, a2 >>>= 7;
        this.cursor_--;
      };
      jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function() {
        var a2 = this.bytes_;
        var b2 = a2[this.cursor_ + 0];
        var c2 = b2 & 127;
        if (128 > b2)
          return this.cursor_ += 1, jspb.asserts.assert(this.cursor_ <= this.end_), c2;
        b2 = a2[this.cursor_ + 1];
        c2 |= (b2 & 127) << 7;
        if (128 > b2)
          return this.cursor_ += 2, jspb.asserts.assert(this.cursor_ <= this.end_), c2;
        b2 = a2[this.cursor_ + 2];
        c2 |= (b2 & 127) << 14;
        if (128 > b2)
          return this.cursor_ += 3, jspb.asserts.assert(this.cursor_ <= this.end_), c2;
        b2 = a2[this.cursor_ + 3];
        c2 |= (b2 & 127) << 21;
        if (128 > b2)
          return this.cursor_ += 4, jspb.asserts.assert(this.cursor_ <= this.end_), c2;
        b2 = a2[this.cursor_ + 4];
        c2 |= (b2 & 15) << 28;
        if (128 > b2)
          return this.cursor_ += 5, jspb.asserts.assert(this.cursor_ <= this.end_), c2 >>> 0;
        this.cursor_ += 5;
        128 <= a2[this.cursor_++] && 128 <= a2[this.cursor_++] && 128 <= a2[this.cursor_++] && 128 <= a2[this.cursor_++] && 128 <= a2[this.cursor_++] && jspb.asserts.assert(false);
        jspb.asserts.assert(this.cursor_ <= this.end_);
        return c2;
      };
      jspb.BinaryDecoder.prototype.readSignedVarint32 = function() {
        return ~~this.readUnsignedVarint32();
      };
      jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function() {
        return this.readUnsignedVarint32().toString();
      };
      jspb.BinaryDecoder.prototype.readSignedVarint32String = function() {
        return this.readSignedVarint32().toString();
      };
      jspb.BinaryDecoder.prototype.readZigzagVarint32 = function() {
        var a2 = this.readUnsignedVarint32();
        return a2 >>> 1 ^ -(a2 & 1);
      };
      jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function() {
        return this.readSplitVarint64(jspb.utils.joinUint64);
      };
      jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function() {
        return this.readSplitVarint64(jspb.utils.joinUnsignedDecimalString);
      };
      jspb.BinaryDecoder.prototype.readSignedVarint64 = function() {
        return this.readSplitVarint64(jspb.utils.joinInt64);
      };
      jspb.BinaryDecoder.prototype.readSignedVarint64String = function() {
        return this.readSplitVarint64(jspb.utils.joinSignedDecimalString);
      };
      jspb.BinaryDecoder.prototype.readZigzagVarint64 = function() {
        return this.readSplitVarint64(jspb.utils.joinZigzag64);
      };
      jspb.BinaryDecoder.prototype.readZigzagVarintHash64 = function() {
        return this.readSplitZigzagVarint64(jspb.utils.joinHash64);
      };
      jspb.BinaryDecoder.prototype.readZigzagVarint64String = function() {
        return this.readSplitZigzagVarint64(jspb.utils.joinSignedDecimalString);
      };
      jspb.BinaryDecoder.prototype.readUint8 = function() {
        var a2 = this.bytes_[this.cursor_ + 0];
        this.cursor_ += 1;
        jspb.asserts.assert(this.cursor_ <= this.end_);
        return a2;
      };
      jspb.BinaryDecoder.prototype.readUint16 = function() {
        var a2 = this.bytes_[this.cursor_ + 0], b2 = this.bytes_[this.cursor_ + 1];
        this.cursor_ += 2;
        jspb.asserts.assert(this.cursor_ <= this.end_);
        return a2 << 0 | b2 << 8;
      };
      jspb.BinaryDecoder.prototype.readUint32 = function() {
        var a2 = this.bytes_[this.cursor_ + 0], b2 = this.bytes_[this.cursor_ + 1], c2 = this.bytes_[this.cursor_ + 2], d2 = this.bytes_[this.cursor_ + 3];
        this.cursor_ += 4;
        jspb.asserts.assert(this.cursor_ <= this.end_);
        return (a2 << 0 | b2 << 8 | c2 << 16 | d2 << 24) >>> 0;
      };
      jspb.BinaryDecoder.prototype.readUint64 = function() {
        var a2 = this.readUint32(), b2 = this.readUint32();
        return jspb.utils.joinUint64(a2, b2);
      };
      jspb.BinaryDecoder.prototype.readUint64String = function() {
        var a2 = this.readUint32(), b2 = this.readUint32();
        return jspb.utils.joinUnsignedDecimalString(a2, b2);
      };
      jspb.BinaryDecoder.prototype.readInt8 = function() {
        var a2 = this.bytes_[this.cursor_ + 0];
        this.cursor_ += 1;
        jspb.asserts.assert(this.cursor_ <= this.end_);
        return a2 << 24 >> 24;
      };
      jspb.BinaryDecoder.prototype.readInt16 = function() {
        var a2 = this.bytes_[this.cursor_ + 0], b2 = this.bytes_[this.cursor_ + 1];
        this.cursor_ += 2;
        jspb.asserts.assert(this.cursor_ <= this.end_);
        return (a2 << 0 | b2 << 8) << 16 >> 16;
      };
      jspb.BinaryDecoder.prototype.readInt32 = function() {
        var a2 = this.bytes_[this.cursor_ + 0], b2 = this.bytes_[this.cursor_ + 1], c2 = this.bytes_[this.cursor_ + 2], d2 = this.bytes_[this.cursor_ + 3];
        this.cursor_ += 4;
        jspb.asserts.assert(this.cursor_ <= this.end_);
        return a2 << 0 | b2 << 8 | c2 << 16 | d2 << 24;
      };
      jspb.BinaryDecoder.prototype.readInt64 = function() {
        var a2 = this.readUint32(), b2 = this.readUint32();
        return jspb.utils.joinInt64(a2, b2);
      };
      jspb.BinaryDecoder.prototype.readInt64String = function() {
        var a2 = this.readUint32(), b2 = this.readUint32();
        return jspb.utils.joinSignedDecimalString(a2, b2);
      };
      jspb.BinaryDecoder.prototype.readFloat = function() {
        var a2 = this.readUint32();
        return jspb.utils.joinFloat32(a2, 0);
      };
      jspb.BinaryDecoder.prototype.readDouble = function() {
        var a2 = this.readUint32(), b2 = this.readUint32();
        return jspb.utils.joinFloat64(a2, b2);
      };
      jspb.BinaryDecoder.prototype.readBool = function() {
        return !!this.bytes_[this.cursor_++];
      };
      jspb.BinaryDecoder.prototype.readEnum = function() {
        return this.readSignedVarint32();
      };
      jspb.BinaryDecoder.prototype.readString = function(a2) {
        var b2 = this.bytes_, c2 = this.cursor_;
        a2 = c2 + a2;
        for (var d2 = [], e2 = ""; c2 < a2; ) {
          var f2 = b2[c2++];
          if (128 > f2)
            d2.push(f2);
          else if (192 > f2)
            continue;
          else if (224 > f2) {
            var g = b2[c2++];
            d2.push((f2 & 31) << 6 | g & 63);
          } else if (240 > f2) {
            g = b2[c2++];
            var h = b2[c2++];
            d2.push((f2 & 15) << 12 | (g & 63) << 6 | h & 63);
          } else if (248 > f2) {
            g = b2[c2++];
            h = b2[c2++];
            var k = b2[c2++];
            f2 = (f2 & 7) << 18 | (g & 63) << 12 | (h & 63) << 6 | k & 63;
            f2 -= 65536;
            d2.push((f2 >> 10 & 1023) + 55296, (f2 & 1023) + 56320);
          }
          8192 <= d2.length && (e2 += String.fromCharCode.apply(null, d2), d2.length = 0);
        }
        e2 += goog.crypt.byteArrayToString(d2);
        this.cursor_ = c2;
        return e2;
      };
      jspb.BinaryDecoder.prototype.readStringWithLength = function() {
        var a2 = this.readUnsignedVarint32();
        return this.readString(a2);
      };
      jspb.BinaryDecoder.prototype.readBytes = function(a2) {
        if (0 > a2 || this.cursor_ + a2 > this.bytes_.length)
          return this.error_ = true, jspb.asserts.fail("Invalid byte length!"), new Uint8Array(0);
        var b2 = this.bytes_.subarray(this.cursor_, this.cursor_ + a2);
        this.cursor_ += a2;
        jspb.asserts.assert(this.cursor_ <= this.end_);
        return b2;
      };
      jspb.BinaryDecoder.prototype.readVarintHash64 = function() {
        return this.readSplitVarint64(jspb.utils.joinHash64);
      };
      jspb.BinaryDecoder.prototype.readFixedHash64 = function() {
        var a2 = this.bytes_, b2 = this.cursor_, c2 = a2[b2 + 0], d2 = a2[b2 + 1], e2 = a2[b2 + 2], f2 = a2[b2 + 3], g = a2[b2 + 4], h = a2[b2 + 5], k = a2[b2 + 6];
        a2 = a2[b2 + 7];
        this.cursor_ += 8;
        return String.fromCharCode(c2, d2, e2, f2, g, h, k, a2);
      };
      jspb.BinaryReader = function(a2, b2, c2) {
        this.decoder_ = jspb.BinaryDecoder.alloc(a2, b2, c2);
        this.fieldCursor_ = this.decoder_.getCursor();
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
        this.error_ = false;
        this.readCallbacks_ = null;
      };
      jspb.BinaryReader.instanceCache_ = [];
      jspb.BinaryReader.alloc = function(a2, b2, c2) {
        if (jspb.BinaryReader.instanceCache_.length) {
          var d2 = jspb.BinaryReader.instanceCache_.pop();
          a2 && d2.decoder_.setBlock(a2, b2, c2);
          return d2;
        }
        return new jspb.BinaryReader(a2, b2, c2);
      };
      jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc;
      jspb.BinaryReader.prototype.free = function() {
        this.decoder_.clear();
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
        this.error_ = false;
        this.readCallbacks_ = null;
        100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
      };
      jspb.BinaryReader.prototype.getFieldCursor = function() {
        return this.fieldCursor_;
      };
      jspb.BinaryReader.prototype.getCursor = function() {
        return this.decoder_.getCursor();
      };
      jspb.BinaryReader.prototype.getBuffer = function() {
        return this.decoder_.getBuffer();
      };
      jspb.BinaryReader.prototype.getFieldNumber = function() {
        return this.nextField_;
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "getFieldNumber", jspb.BinaryReader.prototype.getFieldNumber);
      jspb.BinaryReader.prototype.getWireType = function() {
        return this.nextWireType_;
      };
      jspb.BinaryReader.prototype.isDelimited = function() {
        return this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED;
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "isDelimited", jspb.BinaryReader.prototype.isDelimited);
      jspb.BinaryReader.prototype.isEndGroup = function() {
        return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "isEndGroup", jspb.BinaryReader.prototype.isEndGroup);
      jspb.BinaryReader.prototype.getError = function() {
        return this.error_ || this.decoder_.getError();
      };
      jspb.BinaryReader.prototype.setBlock = function(a2, b2, c2) {
        this.decoder_.setBlock(a2, b2, c2);
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
      };
      jspb.BinaryReader.prototype.reset = function() {
        this.decoder_.reset();
        this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
        this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
      };
      jspb.BinaryReader.prototype.advance = function(a2) {
        this.decoder_.advance(a2);
      };
      jspb.BinaryReader.prototype.nextField = function() {
        if (this.decoder_.atEnd())
          return false;
        if (this.getError())
          return jspb.asserts.fail("Decoder hit an error"), false;
        this.fieldCursor_ = this.decoder_.getCursor();
        var a2 = this.decoder_.readUnsignedVarint32(), b2 = a2 >>> 3;
        a2 &= 7;
        if (a2 != jspb.BinaryConstants.WireType.VARINT && a2 != jspb.BinaryConstants.WireType.FIXED32 && a2 != jspb.BinaryConstants.WireType.FIXED64 && a2 != jspb.BinaryConstants.WireType.DELIMITED && a2 != jspb.BinaryConstants.WireType.START_GROUP && a2 != jspb.BinaryConstants.WireType.END_GROUP)
          return jspb.asserts.fail(
            "Invalid wire type: %s (at position %s)",
            a2,
            this.fieldCursor_
          ), this.error_ = true, false;
        this.nextField_ = b2;
        this.nextWireType_ = a2;
        return true;
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "nextField", jspb.BinaryReader.prototype.nextField);
      jspb.BinaryReader.prototype.unskipHeader = function() {
        this.decoder_.unskipVarint(this.nextField_ << 3 | this.nextWireType_);
      };
      jspb.BinaryReader.prototype.skipMatchingFields = function() {
        var a2 = this.nextField_;
        for (this.unskipHeader(); this.nextField() && this.getFieldNumber() == a2; )
          this.skipField();
        this.decoder_.atEnd() || this.unskipHeader();
      };
      jspb.BinaryReader.prototype.skipVarintField = function() {
        this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT ? (jspb.asserts.fail("Invalid wire type for skipVarintField"), this.skipField()) : this.decoder_.skipVarint();
      };
      jspb.BinaryReader.prototype.skipDelimitedField = function() {
        if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED)
          jspb.asserts.fail("Invalid wire type for skipDelimitedField"), this.skipField();
        else {
          var a2 = this.decoder_.readUnsignedVarint32();
          this.decoder_.advance(a2);
        }
      };
      jspb.BinaryReader.prototype.skipFixed32Field = function() {
        this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32 ? (jspb.asserts.fail("Invalid wire type for skipFixed32Field"), this.skipField()) : this.decoder_.advance(4);
      };
      jspb.BinaryReader.prototype.skipFixed64Field = function() {
        this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64 ? (jspb.asserts.fail("Invalid wire type for skipFixed64Field"), this.skipField()) : this.decoder_.advance(8);
      };
      jspb.BinaryReader.prototype.skipGroup = function() {
        var a2 = this.nextField_;
        do {
          if (!this.nextField()) {
            jspb.asserts.fail("Unmatched start-group tag: stream EOF");
            this.error_ = true;
            break;
          }
          if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP) {
            this.nextField_ != a2 && (jspb.asserts.fail("Unmatched end-group tag"), this.error_ = true);
            break;
          }
          this.skipField();
        } while (1);
      };
      jspb.BinaryReader.prototype.skipField = function() {
        switch (this.nextWireType_) {
          case jspb.BinaryConstants.WireType.VARINT:
            this.skipVarintField();
            break;
          case jspb.BinaryConstants.WireType.FIXED64:
            this.skipFixed64Field();
            break;
          case jspb.BinaryConstants.WireType.DELIMITED:
            this.skipDelimitedField();
            break;
          case jspb.BinaryConstants.WireType.FIXED32:
            this.skipFixed32Field();
            break;
          case jspb.BinaryConstants.WireType.START_GROUP:
            this.skipGroup();
            break;
          default:
            jspb.asserts.fail("Invalid wire encoding for field.");
        }
      };
      jspb.BinaryReader.prototype.registerReadCallback = function(a2, b2) {
        null === this.readCallbacks_ && (this.readCallbacks_ = {});
        jspb.asserts.assert(!this.readCallbacks_[a2]);
        this.readCallbacks_[a2] = b2;
      };
      jspb.BinaryReader.prototype.runReadCallback = function(a2) {
        jspb.asserts.assert(null !== this.readCallbacks_);
        a2 = this.readCallbacks_[a2];
        jspb.asserts.assert(a2);
        return a2(this);
      };
      jspb.BinaryReader.prototype.readAny = function(a2) {
        this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(a2);
        var b2 = jspb.BinaryConstants.FieldType;
        switch (a2) {
          case b2.DOUBLE:
            return this.readDouble();
          case b2.FLOAT:
            return this.readFloat();
          case b2.INT64:
            return this.readInt64();
          case b2.UINT64:
            return this.readUint64();
          case b2.INT32:
            return this.readInt32();
          case b2.FIXED64:
            return this.readFixed64();
          case b2.FIXED32:
            return this.readFixed32();
          case b2.BOOL:
            return this.readBool();
          case b2.STRING:
            return this.readString();
          case b2.GROUP:
            jspb.asserts.fail("Group field type not supported in readAny()");
          case b2.MESSAGE:
            jspb.asserts.fail("Message field type not supported in readAny()");
          case b2.BYTES:
            return this.readBytes();
          case b2.UINT32:
            return this.readUint32();
          case b2.ENUM:
            return this.readEnum();
          case b2.SFIXED32:
            return this.readSfixed32();
          case b2.SFIXED64:
            return this.readSfixed64();
          case b2.SINT32:
            return this.readSint32();
          case b2.SINT64:
            return this.readSint64();
          case b2.FHASH64:
            return this.readFixedHash64();
          case b2.VHASH64:
            return this.readVarintHash64();
          default:
            jspb.asserts.fail("Invalid field type in readAny()");
        }
        return 0;
      };
      jspb.BinaryReader.prototype.readMessage = function(a2, b2) {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var c2 = this.decoder_.getEnd(), d2 = this.decoder_.readUnsignedVarint32();
        d2 = this.decoder_.getCursor() + d2;
        this.decoder_.setEnd(d2);
        b2(a2, this);
        this.decoder_.setCursor(d2);
        this.decoder_.setEnd(c2);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readMessage", jspb.BinaryReader.prototype.readMessage);
      jspb.BinaryReader.prototype.readGroup = function(a2, b2, c2) {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP);
        jspb.asserts.assert(this.nextField_ == a2);
        c2(b2, this);
        this.error_ || this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP || (jspb.asserts.fail("Group submessage did not end with an END_GROUP tag"), this.error_ = true);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readGroup", jspb.BinaryReader.prototype.readGroup);
      jspb.BinaryReader.prototype.getFieldDecoder = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var a2 = this.decoder_.readUnsignedVarint32(), b2 = this.decoder_.getCursor(), c2 = b2 + a2;
        a2 = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), b2, a2);
        this.decoder_.setCursor(c2);
        return a2;
      };
      jspb.BinaryReader.prototype.readInt32 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint32();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readInt32", jspb.BinaryReader.prototype.readInt32);
      jspb.BinaryReader.prototype.readInt32String = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint32String();
      };
      jspb.BinaryReader.prototype.readInt64 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readInt64", jspb.BinaryReader.prototype.readInt64);
      jspb.BinaryReader.prototype.readInt64String = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64String();
      };
      jspb.BinaryReader.prototype.readUint32 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint32();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readUint32", jspb.BinaryReader.prototype.readUint32);
      jspb.BinaryReader.prototype.readUint32String = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint32String();
      };
      jspb.BinaryReader.prototype.readUint64 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint64();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readUint64", jspb.BinaryReader.prototype.readUint64);
      jspb.BinaryReader.prototype.readUint64String = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readUnsignedVarint64String();
      };
      jspb.BinaryReader.prototype.readSint32 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint32();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readSint32", jspb.BinaryReader.prototype.readSint32);
      jspb.BinaryReader.prototype.readSint64 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint64();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readSint64", jspb.BinaryReader.prototype.readSint64);
      jspb.BinaryReader.prototype.readSint64String = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarint64String();
      };
      jspb.BinaryReader.prototype.readFixed32 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readUint32();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readFixed32", jspb.BinaryReader.prototype.readFixed32);
      jspb.BinaryReader.prototype.readFixed64 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readUint64();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readFixed64", jspb.BinaryReader.prototype.readFixed64);
      jspb.BinaryReader.prototype.readFixed64String = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readUint64String();
      };
      jspb.BinaryReader.prototype.readSfixed32 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readInt32();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readSfixed32", jspb.BinaryReader.prototype.readSfixed32);
      jspb.BinaryReader.prototype.readSfixed32String = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readInt32().toString();
      };
      jspb.BinaryReader.prototype.readSfixed64 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readInt64();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readSfixed64", jspb.BinaryReader.prototype.readSfixed64);
      jspb.BinaryReader.prototype.readSfixed64String = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readInt64String();
      };
      jspb.BinaryReader.prototype.readFloat = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
        return this.decoder_.readFloat();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readFloat", jspb.BinaryReader.prototype.readFloat);
      jspb.BinaryReader.prototype.readDouble = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readDouble();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readDouble", jspb.BinaryReader.prototype.readDouble);
      jspb.BinaryReader.prototype.readBool = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return !!this.decoder_.readUnsignedVarint32();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readBool", jspb.BinaryReader.prototype.readBool);
      jspb.BinaryReader.prototype.readEnum = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSignedVarint64();
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readEnum", jspb.BinaryReader.prototype.readEnum);
      jspb.BinaryReader.prototype.readString = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var a2 = this.decoder_.readUnsignedVarint32();
        return this.decoder_.readString(a2);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readString", jspb.BinaryReader.prototype.readString);
      jspb.BinaryReader.prototype.readBytes = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var a2 = this.decoder_.readUnsignedVarint32();
        return this.decoder_.readBytes(a2);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readBytes", jspb.BinaryReader.prototype.readBytes);
      jspb.BinaryReader.prototype.readVarintHash64 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readVarintHash64();
      };
      jspb.BinaryReader.prototype.readSintHash64 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readZigzagVarintHash64();
      };
      jspb.BinaryReader.prototype.readSplitVarint64 = function(a2) {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSplitVarint64(a2);
      };
      jspb.BinaryReader.prototype.readSplitZigzagVarint64 = function(a2) {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
        return this.decoder_.readSplitVarint64(function(b2, c2) {
          return jspb.utils.fromZigzag64(b2, c2, a2);
        });
      };
      jspb.BinaryReader.prototype.readFixedHash64 = function() {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readFixedHash64();
      };
      jspb.BinaryReader.prototype.readSplitFixed64 = function(a2) {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
        return this.decoder_.readSplitFixed64(a2);
      };
      jspb.BinaryReader.prototype.readPackedField_ = function(a2) {
        jspb.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
        var b2 = this.decoder_.readUnsignedVarint32();
        b2 = this.decoder_.getCursor() + b2;
        for (var c2 = []; this.decoder_.getCursor() < b2; )
          c2.push(a2.call(this.decoder_));
        return c2;
      };
      jspb.BinaryReader.prototype.readPackedInt32 = function() {
        return this.readPackedField_(this.decoder_.readSignedVarint32);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedInt32", jspb.BinaryReader.prototype.readPackedInt32);
      jspb.BinaryReader.prototype.readPackedInt32String = function() {
        return this.readPackedField_(this.decoder_.readSignedVarint32String);
      };
      jspb.BinaryReader.prototype.readPackedInt64 = function() {
        return this.readPackedField_(this.decoder_.readSignedVarint64);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedInt64", jspb.BinaryReader.prototype.readPackedInt64);
      jspb.BinaryReader.prototype.readPackedInt64String = function() {
        return this.readPackedField_(this.decoder_.readSignedVarint64String);
      };
      jspb.BinaryReader.prototype.readPackedUint32 = function() {
        return this.readPackedField_(this.decoder_.readUnsignedVarint32);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedUint32", jspb.BinaryReader.prototype.readPackedUint32);
      jspb.BinaryReader.prototype.readPackedUint32String = function() {
        return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
      };
      jspb.BinaryReader.prototype.readPackedUint64 = function() {
        return this.readPackedField_(this.decoder_.readUnsignedVarint64);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedUint64", jspb.BinaryReader.prototype.readPackedUint64);
      jspb.BinaryReader.prototype.readPackedUint64String = function() {
        return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
      };
      jspb.BinaryReader.prototype.readPackedSint32 = function() {
        return this.readPackedField_(this.decoder_.readZigzagVarint32);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedSint32", jspb.BinaryReader.prototype.readPackedSint32);
      jspb.BinaryReader.prototype.readPackedSint64 = function() {
        return this.readPackedField_(this.decoder_.readZigzagVarint64);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedSint64", jspb.BinaryReader.prototype.readPackedSint64);
      jspb.BinaryReader.prototype.readPackedSint64String = function() {
        return this.readPackedField_(this.decoder_.readZigzagVarint64String);
      };
      jspb.BinaryReader.prototype.readPackedFixed32 = function() {
        return this.readPackedField_(this.decoder_.readUint32);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedFixed32", jspb.BinaryReader.prototype.readPackedFixed32);
      jspb.BinaryReader.prototype.readPackedFixed64 = function() {
        return this.readPackedField_(this.decoder_.readUint64);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedFixed64", jspb.BinaryReader.prototype.readPackedFixed64);
      jspb.BinaryReader.prototype.readPackedFixed64String = function() {
        return this.readPackedField_(this.decoder_.readUint64String);
      };
      jspb.BinaryReader.prototype.readPackedSfixed32 = function() {
        return this.readPackedField_(this.decoder_.readInt32);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedSfixed32", jspb.BinaryReader.prototype.readPackedSfixed32);
      jspb.BinaryReader.prototype.readPackedSfixed64 = function() {
        return this.readPackedField_(this.decoder_.readInt64);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedSfixed64", jspb.BinaryReader.prototype.readPackedSfixed64);
      jspb.BinaryReader.prototype.readPackedSfixed64String = function() {
        return this.readPackedField_(this.decoder_.readInt64String);
      };
      jspb.BinaryReader.prototype.readPackedFloat = function() {
        return this.readPackedField_(this.decoder_.readFloat);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedFloat", jspb.BinaryReader.prototype.readPackedFloat);
      jspb.BinaryReader.prototype.readPackedDouble = function() {
        return this.readPackedField_(this.decoder_.readDouble);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedDouble", jspb.BinaryReader.prototype.readPackedDouble);
      jspb.BinaryReader.prototype.readPackedBool = function() {
        return this.readPackedField_(this.decoder_.readBool);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedBool", jspb.BinaryReader.prototype.readPackedBool);
      jspb.BinaryReader.prototype.readPackedEnum = function() {
        return this.readPackedField_(this.decoder_.readEnum);
      };
      goog.exportProperty(jspb.BinaryReader.prototype, "readPackedEnum", jspb.BinaryReader.prototype.readPackedEnum);
      jspb.BinaryReader.prototype.readPackedVarintHash64 = function() {
        return this.readPackedField_(this.decoder_.readVarintHash64);
      };
      jspb.BinaryReader.prototype.readPackedFixedHash64 = function() {
        return this.readPackedField_(this.decoder_.readFixedHash64);
      };
      jspb.BinaryEncoder = function() {
        this.buffer_ = [];
      };
      jspb.BinaryEncoder.prototype.length = function() {
        return this.buffer_.length;
      };
      jspb.BinaryEncoder.prototype.end = function() {
        var a2 = this.buffer_;
        this.buffer_ = [];
        return a2;
      };
      jspb.BinaryEncoder.prototype.writeSplitVarint64 = function(a2, b2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(b2 == Math.floor(b2));
        jspb.asserts.assert(0 <= a2 && a2 < jspb.BinaryConstants.TWO_TO_32);
        for (jspb.asserts.assert(0 <= b2 && b2 < jspb.BinaryConstants.TWO_TO_32); 0 < b2 || 127 < a2; )
          this.buffer_.push(a2 & 127 | 128), a2 = (a2 >>> 7 | b2 << 25) >>> 0, b2 >>>= 7;
        this.buffer_.push(a2);
      };
      jspb.BinaryEncoder.prototype.writeSplitFixed64 = function(a2, b2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(b2 == Math.floor(b2));
        jspb.asserts.assert(0 <= a2 && a2 < jspb.BinaryConstants.TWO_TO_32);
        jspb.asserts.assert(0 <= b2 && b2 < jspb.BinaryConstants.TWO_TO_32);
        this.writeUint32(a2);
        this.writeUint32(b2);
      };
      jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        for (jspb.asserts.assert(0 <= a2 && a2 < jspb.BinaryConstants.TWO_TO_32); 127 < a2; )
          this.buffer_.push(a2 & 127 | 128), a2 >>>= 7;
        this.buffer_.push(a2);
      };
      jspb.BinaryEncoder.prototype.writeSignedVarint32 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(a2 >= -jspb.BinaryConstants.TWO_TO_31 && a2 < jspb.BinaryConstants.TWO_TO_31);
        if (0 <= a2)
          this.writeUnsignedVarint32(a2);
        else {
          for (var b2 = 0; 9 > b2; b2++)
            this.buffer_.push(a2 & 127 | 128), a2 >>= 7;
          this.buffer_.push(1);
        }
      };
      jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(0 <= a2 && a2 < jspb.BinaryConstants.TWO_TO_64);
        jspb.utils.splitInt64(a2);
        this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeSignedVarint64 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(a2 >= -jspb.BinaryConstants.TWO_TO_63 && a2 < jspb.BinaryConstants.TWO_TO_63);
        jspb.utils.splitInt64(a2);
        this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(a2 >= -jspb.BinaryConstants.TWO_TO_31 && a2 < jspb.BinaryConstants.TWO_TO_31);
        this.writeUnsignedVarint32((a2 << 1 ^ a2 >> 31) >>> 0);
      };
      jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(a2 >= -jspb.BinaryConstants.TWO_TO_63 && a2 < jspb.BinaryConstants.TWO_TO_63);
        jspb.utils.splitZigzag64(a2);
        this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function(a2) {
        this.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(a2));
      };
      jspb.BinaryEncoder.prototype.writeZigzagVarintHash64 = function(a2) {
        var b2 = this;
        jspb.utils.splitHash64(a2);
        jspb.utils.toZigzag64(jspb.utils.split64Low, jspb.utils.split64High, function(a3, d2) {
          b2.writeSplitVarint64(a3 >>> 0, d2 >>> 0);
        });
      };
      jspb.BinaryEncoder.prototype.writeUint8 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(0 <= a2 && 256 > a2);
        this.buffer_.push(a2 >>> 0 & 255);
      };
      jspb.BinaryEncoder.prototype.writeUint16 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(0 <= a2 && 65536 > a2);
        this.buffer_.push(a2 >>> 0 & 255);
        this.buffer_.push(a2 >>> 8 & 255);
      };
      jspb.BinaryEncoder.prototype.writeUint32 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(0 <= a2 && a2 < jspb.BinaryConstants.TWO_TO_32);
        this.buffer_.push(a2 >>> 0 & 255);
        this.buffer_.push(a2 >>> 8 & 255);
        this.buffer_.push(a2 >>> 16 & 255);
        this.buffer_.push(a2 >>> 24 & 255);
      };
      jspb.BinaryEncoder.prototype.writeUint64 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(0 <= a2 && a2 < jspb.BinaryConstants.TWO_TO_64);
        jspb.utils.splitUint64(a2);
        this.writeUint32(jspb.utils.split64Low);
        this.writeUint32(jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeInt8 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(-128 <= a2 && 128 > a2);
        this.buffer_.push(a2 >>> 0 & 255);
      };
      jspb.BinaryEncoder.prototype.writeInt16 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(-32768 <= a2 && 32768 > a2);
        this.buffer_.push(a2 >>> 0 & 255);
        this.buffer_.push(a2 >>> 8 & 255);
      };
      jspb.BinaryEncoder.prototype.writeInt32 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(a2 >= -jspb.BinaryConstants.TWO_TO_31 && a2 < jspb.BinaryConstants.TWO_TO_31);
        this.buffer_.push(a2 >>> 0 & 255);
        this.buffer_.push(a2 >>> 8 & 255);
        this.buffer_.push(a2 >>> 16 & 255);
        this.buffer_.push(a2 >>> 24 & 255);
      };
      jspb.BinaryEncoder.prototype.writeInt64 = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(a2 >= -jspb.BinaryConstants.TWO_TO_63 && a2 < jspb.BinaryConstants.TWO_TO_63);
        jspb.utils.splitInt64(a2);
        this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeInt64String = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(+a2 >= -jspb.BinaryConstants.TWO_TO_63 && +a2 < jspb.BinaryConstants.TWO_TO_63);
        jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a2));
        this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeFloat = function(a2) {
        jspb.asserts.assert(Infinity === a2 || -Infinity === a2 || isNaN(a2) || a2 >= -jspb.BinaryConstants.FLOAT32_MAX && a2 <= jspb.BinaryConstants.FLOAT32_MAX);
        jspb.utils.splitFloat32(a2);
        this.writeUint32(jspb.utils.split64Low);
      };
      jspb.BinaryEncoder.prototype.writeDouble = function(a2) {
        jspb.asserts.assert(Infinity === a2 || -Infinity === a2 || isNaN(a2) || a2 >= -jspb.BinaryConstants.FLOAT64_MAX && a2 <= jspb.BinaryConstants.FLOAT64_MAX);
        jspb.utils.splitFloat64(a2);
        this.writeUint32(jspb.utils.split64Low);
        this.writeUint32(jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeBool = function(a2) {
        jspb.asserts.assert("boolean" === typeof a2 || "number" === typeof a2);
        this.buffer_.push(a2 ? 1 : 0);
      };
      jspb.BinaryEncoder.prototype.writeEnum = function(a2) {
        jspb.asserts.assert(a2 == Math.floor(a2));
        jspb.asserts.assert(a2 >= -jspb.BinaryConstants.TWO_TO_31 && a2 < jspb.BinaryConstants.TWO_TO_31);
        this.writeSignedVarint32(a2);
      };
      jspb.BinaryEncoder.prototype.writeBytes = function(a2) {
        this.buffer_.push.apply(this.buffer_, a2);
      };
      jspb.BinaryEncoder.prototype.writeVarintHash64 = function(a2) {
        jspb.utils.splitHash64(a2);
        this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeFixedHash64 = function(a2) {
        jspb.utils.splitHash64(a2);
        this.writeUint32(jspb.utils.split64Low);
        this.writeUint32(jspb.utils.split64High);
      };
      jspb.BinaryEncoder.prototype.writeString = function(a2) {
        var b2 = this.buffer_.length;
        jspb.asserts.assertString(a2);
        for (var c2 = 0; c2 < a2.length; c2++) {
          var d2 = a2.charCodeAt(c2);
          if (128 > d2)
            this.buffer_.push(d2);
          else if (2048 > d2)
            this.buffer_.push(d2 >> 6 | 192), this.buffer_.push(d2 & 63 | 128);
          else if (65536 > d2)
            if (55296 <= d2 && 56319 >= d2 && c2 + 1 < a2.length) {
              var e2 = a2.charCodeAt(c2 + 1);
              56320 <= e2 && 57343 >= e2 && (d2 = 1024 * (d2 - 55296) + e2 - 56320 + 65536, this.buffer_.push(d2 >> 18 | 240), this.buffer_.push(d2 >> 12 & 63 | 128), this.buffer_.push(d2 >> 6 & 63 | 128), this.buffer_.push(d2 & 63 | 128), c2++);
            } else
              this.buffer_.push(d2 >> 12 | 224), this.buffer_.push(d2 >> 6 & 63 | 128), this.buffer_.push(d2 & 63 | 128);
        }
        return this.buffer_.length - b2;
      };
      jspb.arith = {};
      jspb.arith.UInt64 = function(a2, b2) {
        this.lo = a2;
        this.hi = b2;
      };
      jspb.arith.UInt64.prototype.cmp = function(a2) {
        return this.hi < a2.hi || this.hi == a2.hi && this.lo < a2.lo ? -1 : this.hi == a2.hi && this.lo == a2.lo ? 0 : 1;
      };
      jspb.arith.UInt64.prototype.rightShift = function() {
        return new jspb.arith.UInt64((this.lo >>> 1 | (this.hi & 1) << 31) >>> 0, this.hi >>> 1 >>> 0);
      };
      jspb.arith.UInt64.prototype.leftShift = function() {
        return new jspb.arith.UInt64(this.lo << 1 >>> 0, (this.hi << 1 | this.lo >>> 31) >>> 0);
      };
      jspb.arith.UInt64.prototype.msb = function() {
        return !!(this.hi & 2147483648);
      };
      jspb.arith.UInt64.prototype.lsb = function() {
        return !!(this.lo & 1);
      };
      jspb.arith.UInt64.prototype.zero = function() {
        return 0 == this.lo && 0 == this.hi;
      };
      jspb.arith.UInt64.prototype.add = function(a2) {
        return new jspb.arith.UInt64((this.lo + a2.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a2.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a2.lo ? 1 : 0) >>> 0);
      };
      jspb.arith.UInt64.prototype.sub = function(a2) {
        return new jspb.arith.UInt64((this.lo - a2.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a2.hi & 4294967295) >>> 0) - (0 > this.lo - a2.lo ? 1 : 0) >>> 0);
      };
      jspb.arith.UInt64.mul32x32 = function(a2, b2) {
        var c2 = a2 & 65535;
        a2 >>>= 16;
        var d2 = b2 & 65535, e2 = b2 >>> 16;
        b2 = c2 * d2 + 65536 * (c2 * e2 & 65535) + 65536 * (a2 * d2 & 65535);
        for (c2 = a2 * e2 + (c2 * e2 >>> 16) + (a2 * d2 >>> 16); 4294967296 <= b2; )
          b2 -= 4294967296, c2 += 1;
        return new jspb.arith.UInt64(b2 >>> 0, c2 >>> 0);
      };
      jspb.arith.UInt64.prototype.mul = function(a2) {
        var b2 = jspb.arith.UInt64.mul32x32(this.lo, a2);
        a2 = jspb.arith.UInt64.mul32x32(this.hi, a2);
        a2.hi = a2.lo;
        a2.lo = 0;
        return b2.add(a2);
      };
      jspb.arith.UInt64.prototype.div = function(a2) {
        if (0 == a2)
          return [];
        var b2 = new jspb.arith.UInt64(0, 0), c2 = new jspb.arith.UInt64(this.lo, this.hi);
        a2 = new jspb.arith.UInt64(a2, 0);
        for (var d2 = new jspb.arith.UInt64(1, 0); !a2.msb(); )
          a2 = a2.leftShift(), d2 = d2.leftShift();
        for (; !d2.zero(); )
          0 >= a2.cmp(c2) && (b2 = b2.add(d2), c2 = c2.sub(a2)), a2 = a2.rightShift(), d2 = d2.rightShift();
        return [b2, c2];
      };
      jspb.arith.UInt64.prototype.toString = function() {
        for (var a2 = "", b2 = this; !b2.zero(); ) {
          b2 = b2.div(10);
          var c2 = b2[0];
          a2 = b2[1].lo + a2;
          b2 = c2;
        }
        "" == a2 && (a2 = "0");
        return a2;
      };
      jspb.arith.UInt64.fromString = function(a2) {
        for (var b2 = new jspb.arith.UInt64(0, 0), c2 = new jspb.arith.UInt64(0, 0), d2 = 0; d2 < a2.length; d2++) {
          if ("0" > a2[d2] || "9" < a2[d2])
            return null;
          var e2 = parseInt(a2[d2], 10);
          c2.lo = e2;
          b2 = b2.mul(10).add(c2);
        }
        return b2;
      };
      jspb.arith.UInt64.prototype.clone = function() {
        return new jspb.arith.UInt64(this.lo, this.hi);
      };
      jspb.arith.Int64 = function(a2, b2) {
        this.lo = a2;
        this.hi = b2;
      };
      jspb.arith.Int64.prototype.add = function(a2) {
        return new jspb.arith.Int64((this.lo + a2.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a2.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a2.lo ? 1 : 0) >>> 0);
      };
      jspb.arith.Int64.prototype.sub = function(a2) {
        return new jspb.arith.Int64((this.lo - a2.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a2.hi & 4294967295) >>> 0) - (0 > this.lo - a2.lo ? 1 : 0) >>> 0);
      };
      jspb.arith.Int64.prototype.clone = function() {
        return new jspb.arith.Int64(this.lo, this.hi);
      };
      jspb.arith.Int64.prototype.toString = function() {
        var a2 = 0 != (this.hi & 2147483648), b2 = new jspb.arith.UInt64(this.lo, this.hi);
        a2 && (b2 = new jspb.arith.UInt64(0, 0).sub(b2));
        return (a2 ? "-" : "") + b2.toString();
      };
      jspb.arith.Int64.fromString = function(a2) {
        var b2 = 0 < a2.length && "-" == a2[0];
        b2 && (a2 = a2.substring(1));
        a2 = jspb.arith.UInt64.fromString(a2);
        if (null === a2)
          return null;
        b2 && (a2 = new jspb.arith.UInt64(0, 0).sub(a2));
        return new jspb.arith.Int64(a2.lo, a2.hi);
      };
      jspb.BinaryWriter = function() {
        this.blocks_ = [];
        this.totalLength_ = 0;
        this.encoder_ = new jspb.BinaryEncoder();
        this.bookmarks_ = [];
      };
      jspb.BinaryWriter.prototype.appendUint8Array_ = function(a2) {
        var b2 = this.encoder_.end();
        this.blocks_.push(b2);
        this.blocks_.push(a2);
        this.totalLength_ += b2.length + a2.length;
      };
      jspb.BinaryWriter.prototype.beginDelimited_ = function(a2) {
        this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED);
        a2 = this.encoder_.end();
        this.blocks_.push(a2);
        this.totalLength_ += a2.length;
        a2.push(this.totalLength_);
        return a2;
      };
      jspb.BinaryWriter.prototype.endDelimited_ = function(a2) {
        var b2 = a2.pop();
        b2 = this.totalLength_ + this.encoder_.length() - b2;
        for (jspb.asserts.assert(0 <= b2); 127 < b2; )
          a2.push(b2 & 127 | 128), b2 >>>= 7, this.totalLength_++;
        a2.push(b2);
        this.totalLength_++;
      };
      jspb.BinaryWriter.prototype.writeSerializedMessage = function(a2, b2, c2) {
        this.appendUint8Array_(a2.subarray(b2, c2));
      };
      jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function(a2, b2, c2) {
        null != a2 && null != b2 && null != c2 && this.writeSerializedMessage(a2, b2, c2);
      };
      jspb.BinaryWriter.prototype.reset = function() {
        this.blocks_ = [];
        this.encoder_.end();
        this.totalLength_ = 0;
        this.bookmarks_ = [];
      };
      jspb.BinaryWriter.prototype.getResultBuffer = function() {
        jspb.asserts.assert(0 == this.bookmarks_.length);
        for (var a2 = new Uint8Array(this.totalLength_ + this.encoder_.length()), b2 = this.blocks_, c2 = b2.length, d2 = 0, e2 = 0; e2 < c2; e2++) {
          var f2 = b2[e2];
          a2.set(f2, d2);
          d2 += f2.length;
        }
        b2 = this.encoder_.end();
        a2.set(b2, d2);
        d2 += b2.length;
        jspb.asserts.assert(d2 == a2.length);
        this.blocks_ = [a2];
        return a2;
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "getResultBuffer", jspb.BinaryWriter.prototype.getResultBuffer);
      jspb.BinaryWriter.prototype.getResultBase64String = function(a2) {
        return goog.crypt.base64.encodeByteArray(this.getResultBuffer(), a2);
      };
      jspb.BinaryWriter.prototype.beginSubMessage = function(a2) {
        this.bookmarks_.push(this.beginDelimited_(a2));
      };
      jspb.BinaryWriter.prototype.endSubMessage = function() {
        jspb.asserts.assert(0 <= this.bookmarks_.length);
        this.endDelimited_(this.bookmarks_.pop());
      };
      jspb.BinaryWriter.prototype.writeFieldHeader_ = function(a2, b2) {
        jspb.asserts.assert(1 <= a2 && a2 == Math.floor(a2));
        this.encoder_.writeUnsignedVarint32(8 * a2 + b2);
      };
      jspb.BinaryWriter.prototype.writeAny = function(a2, b2, c2) {
        var d2 = jspb.BinaryConstants.FieldType;
        switch (a2) {
          case d2.DOUBLE:
            this.writeDouble(b2, c2);
            break;
          case d2.FLOAT:
            this.writeFloat(b2, c2);
            break;
          case d2.INT64:
            this.writeInt64(b2, c2);
            break;
          case d2.UINT64:
            this.writeUint64(b2, c2);
            break;
          case d2.INT32:
            this.writeInt32(b2, c2);
            break;
          case d2.FIXED64:
            this.writeFixed64(b2, c2);
            break;
          case d2.FIXED32:
            this.writeFixed32(b2, c2);
            break;
          case d2.BOOL:
            this.writeBool(b2, c2);
            break;
          case d2.STRING:
            this.writeString(b2, c2);
            break;
          case d2.GROUP:
            jspb.asserts.fail("Group field type not supported in writeAny()");
            break;
          case d2.MESSAGE:
            jspb.asserts.fail("Message field type not supported in writeAny()");
            break;
          case d2.BYTES:
            this.writeBytes(b2, c2);
            break;
          case d2.UINT32:
            this.writeUint32(b2, c2);
            break;
          case d2.ENUM:
            this.writeEnum(b2, c2);
            break;
          case d2.SFIXED32:
            this.writeSfixed32(b2, c2);
            break;
          case d2.SFIXED64:
            this.writeSfixed64(b2, c2);
            break;
          case d2.SINT32:
            this.writeSint32(b2, c2);
            break;
          case d2.SINT64:
            this.writeSint64(b2, c2);
            break;
          case d2.FHASH64:
            this.writeFixedHash64(b2, c2);
            break;
          case d2.VHASH64:
            this.writeVarintHash64(b2, c2);
            break;
          default:
            jspb.asserts.fail("Invalid field type in writeAny()");
        }
      };
      jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32(b2));
      };
      jspb.BinaryWriter.prototype.writeSignedVarint32_ = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b2));
      };
      jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64(b2));
      };
      jspb.BinaryWriter.prototype.writeSignedVarint64_ = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64(b2));
      };
      jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint32(b2));
      };
      jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64(b2));
      };
      jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64String(b2));
      };
      jspb.BinaryWriter.prototype.writeZigzagVarintHash64_ = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarintHash64(b2));
      };
      jspb.BinaryWriter.prototype.writeInt32 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(b2 >= -jspb.BinaryConstants.TWO_TO_31 && b2 < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_(a2, b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeInt32", jspb.BinaryWriter.prototype.writeInt32);
      jspb.BinaryWriter.prototype.writeInt32String = function(a2, b2) {
        null != b2 && (b2 = parseInt(b2, 10), jspb.asserts.assert(b2 >= -jspb.BinaryConstants.TWO_TO_31 && b2 < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_(a2, b2));
      };
      jspb.BinaryWriter.prototype.writeInt64 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(b2 >= -jspb.BinaryConstants.TWO_TO_63 && b2 < jspb.BinaryConstants.TWO_TO_63), this.writeSignedVarint64_(a2, b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeInt64", jspb.BinaryWriter.prototype.writeInt64);
      jspb.BinaryWriter.prototype.writeInt64String = function(a2, b2) {
        null != b2 && (b2 = jspb.arith.Int64.fromString(b2), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSplitVarint64(b2.lo, b2.hi));
      };
      jspb.BinaryWriter.prototype.writeUint32 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(0 <= b2 && b2 < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a2, b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeUint32", jspb.BinaryWriter.prototype.writeUint32);
      jspb.BinaryWriter.prototype.writeUint32String = function(a2, b2) {
        null != b2 && (b2 = parseInt(b2, 10), jspb.asserts.assert(0 <= b2 && b2 < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a2, b2));
      };
      jspb.BinaryWriter.prototype.writeUint64 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(0 <= b2 && b2 < jspb.BinaryConstants.TWO_TO_64), this.writeUnsignedVarint64_(a2, b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeUint64", jspb.BinaryWriter.prototype.writeUint64);
      jspb.BinaryWriter.prototype.writeUint64String = function(a2, b2) {
        null != b2 && (b2 = jspb.arith.UInt64.fromString(b2), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSplitVarint64(b2.lo, b2.hi));
      };
      jspb.BinaryWriter.prototype.writeSint32 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(b2 >= -jspb.BinaryConstants.TWO_TO_31 && b2 < jspb.BinaryConstants.TWO_TO_31), this.writeZigzagVarint32_(a2, b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeSint32", jspb.BinaryWriter.prototype.writeSint32);
      jspb.BinaryWriter.prototype.writeSint64 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(b2 >= -jspb.BinaryConstants.TWO_TO_63 && b2 < jspb.BinaryConstants.TWO_TO_63), this.writeZigzagVarint64_(a2, b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeSint64", jspb.BinaryWriter.prototype.writeSint64);
      jspb.BinaryWriter.prototype.writeSintHash64 = function(a2, b2) {
        null != b2 && this.writeZigzagVarintHash64_(a2, b2);
      };
      jspb.BinaryWriter.prototype.writeSint64String = function(a2, b2) {
        null != b2 && this.writeZigzagVarint64String_(a2, b2);
      };
      jspb.BinaryWriter.prototype.writeFixed32 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(0 <= b2 && b2 < jspb.BinaryConstants.TWO_TO_32), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeUint32(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeFixed32", jspb.BinaryWriter.prototype.writeFixed32);
      jspb.BinaryWriter.prototype.writeFixed64 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(0 <= b2 && b2 < jspb.BinaryConstants.TWO_TO_64), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeUint64(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeFixed64", jspb.BinaryWriter.prototype.writeFixed64);
      jspb.BinaryWriter.prototype.writeFixed64String = function(a2, b2) {
        null != b2 && (b2 = jspb.arith.UInt64.fromString(b2), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeSplitFixed64(b2.lo, b2.hi));
      };
      jspb.BinaryWriter.prototype.writeSfixed32 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(b2 >= -jspb.BinaryConstants.TWO_TO_31 && b2 < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeInt32(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeSfixed32", jspb.BinaryWriter.prototype.writeSfixed32);
      jspb.BinaryWriter.prototype.writeSfixed64 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(b2 >= -jspb.BinaryConstants.TWO_TO_63 && b2 < jspb.BinaryConstants.TWO_TO_63), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeInt64(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeSfixed64", jspb.BinaryWriter.prototype.writeSfixed64);
      jspb.BinaryWriter.prototype.writeSfixed64String = function(a2, b2) {
        null != b2 && (b2 = jspb.arith.Int64.fromString(b2), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeSplitFixed64(b2.lo, b2.hi));
      };
      jspb.BinaryWriter.prototype.writeFloat = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeFloat(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeFloat", jspb.BinaryWriter.prototype.writeFloat);
      jspb.BinaryWriter.prototype.writeDouble = function(a2, b2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeDouble(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeDouble", jspb.BinaryWriter.prototype.writeDouble);
      jspb.BinaryWriter.prototype.writeBool = function(a2, b2) {
        null != b2 && (jspb.asserts.assert("boolean" === typeof b2 || "number" === typeof b2), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeBool(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeBool", jspb.BinaryWriter.prototype.writeBool);
      jspb.BinaryWriter.prototype.writeEnum = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(b2 >= -jspb.BinaryConstants.TWO_TO_31 && b2 < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeEnum", jspb.BinaryWriter.prototype.writeEnum);
      jspb.BinaryWriter.prototype.writeString = function(a2, b2) {
        null != b2 && (a2 = this.beginDelimited_(a2), this.encoder_.writeString(b2), this.endDelimited_(a2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeString", jspb.BinaryWriter.prototype.writeString);
      jspb.BinaryWriter.prototype.writeBytes = function(a2, b2) {
        null != b2 && (b2 = jspb.utils.byteSourceToUint8Array(b2), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(b2.length), this.appendUint8Array_(b2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeBytes", jspb.BinaryWriter.prototype.writeBytes);
      jspb.BinaryWriter.prototype.writeMessage = function(a2, b2, c2) {
        null != b2 && (a2 = this.beginDelimited_(a2), c2(b2, this), this.endDelimited_(a2));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeMessage", jspb.BinaryWriter.prototype.writeMessage);
      jspb.BinaryWriter.prototype.writeMessageSet = function(a2, b2, c2) {
        null != b2 && (this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.START_GROUP), this.writeFieldHeader_(2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(a2), a2 = this.beginDelimited_(3), c2(b2, this), this.endDelimited_(a2), this.writeFieldHeader_(1, jspb.BinaryConstants.WireType.END_GROUP));
      };
      jspb.BinaryWriter.prototype.writeGroup = function(a2, b2, c2) {
        null != b2 && (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.START_GROUP), c2(b2, this), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.END_GROUP));
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeGroup", jspb.BinaryWriter.prototype.writeGroup);
      jspb.BinaryWriter.prototype.writeFixedHash64 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(8 == b2.length), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeFixedHash64(b2));
      };
      jspb.BinaryWriter.prototype.writeVarintHash64 = function(a2, b2) {
        null != b2 && (jspb.asserts.assert(8 == b2.length), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeVarintHash64(b2));
      };
      jspb.BinaryWriter.prototype.writeSplitFixed64 = function(a2, b2, c2) {
        this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.FIXED64);
        this.encoder_.writeSplitFixed64(b2, c2);
      };
      jspb.BinaryWriter.prototype.writeSplitVarint64 = function(a2, b2, c2) {
        this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT);
        this.encoder_.writeSplitVarint64(b2, c2);
      };
      jspb.BinaryWriter.prototype.writeSplitZigzagVarint64 = function(a2, b2, c2) {
        this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.VARINT);
        var d2 = this.encoder_;
        jspb.utils.toZigzag64(b2, c2, function(a3, b3) {
          d2.writeSplitVarint64(a3 >>> 0, b3 >>> 0);
        });
      };
      jspb.BinaryWriter.prototype.writeRepeatedInt32 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeSignedVarint32_(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedInt32", jspb.BinaryWriter.prototype.writeRepeatedInt32);
      jspb.BinaryWriter.prototype.writeRepeatedInt32String = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeInt32String(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writeRepeatedInt64 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeSignedVarint64_(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedInt64", jspb.BinaryWriter.prototype.writeRepeatedInt64);
      jspb.BinaryWriter.prototype.writeRepeatedSplitFixed64 = function(a2, b2, c2, d2) {
        if (null != b2)
          for (var e2 = 0; e2 < b2.length; e2++)
            this.writeSplitFixed64(a2, c2(b2[e2]), d2(b2[e2]));
      };
      jspb.BinaryWriter.prototype.writeRepeatedSplitVarint64 = function(a2, b2, c2, d2) {
        if (null != b2)
          for (var e2 = 0; e2 < b2.length; e2++)
            this.writeSplitVarint64(a2, c2(b2[e2]), d2(b2[e2]));
      };
      jspb.BinaryWriter.prototype.writeRepeatedSplitZigzagVarint64 = function(a2, b2, c2, d2) {
        if (null != b2)
          for (var e2 = 0; e2 < b2.length; e2++)
            this.writeSplitZigzagVarint64(a2, c2(b2[e2]), d2(b2[e2]));
      };
      jspb.BinaryWriter.prototype.writeRepeatedInt64String = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeInt64String(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writeRepeatedUint32 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeUnsignedVarint32_(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedUint32", jspb.BinaryWriter.prototype.writeRepeatedUint32);
      jspb.BinaryWriter.prototype.writeRepeatedUint32String = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeUint32String(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writeRepeatedUint64 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeUnsignedVarint64_(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedUint64", jspb.BinaryWriter.prototype.writeRepeatedUint64);
      jspb.BinaryWriter.prototype.writeRepeatedUint64String = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeUint64String(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writeRepeatedSint32 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeZigzagVarint32_(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedSint32", jspb.BinaryWriter.prototype.writeRepeatedSint32);
      jspb.BinaryWriter.prototype.writeRepeatedSint64 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeZigzagVarint64_(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedSint64", jspb.BinaryWriter.prototype.writeRepeatedSint64);
      jspb.BinaryWriter.prototype.writeRepeatedSint64String = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeZigzagVarint64String_(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writeRepeatedSintHash64 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeZigzagVarintHash64_(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeFixed32(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedFixed32", jspb.BinaryWriter.prototype.writeRepeatedFixed32);
      jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeFixed64(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedFixed64", jspb.BinaryWriter.prototype.writeRepeatedFixed64);
      jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeFixed64String(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedFixed64String", jspb.BinaryWriter.prototype.writeRepeatedFixed64String);
      jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeSfixed32(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedSfixed32", jspb.BinaryWriter.prototype.writeRepeatedSfixed32);
      jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeSfixed64(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedSfixed64", jspb.BinaryWriter.prototype.writeRepeatedSfixed64);
      jspb.BinaryWriter.prototype.writeRepeatedSfixed64String = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeSfixed64String(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writeRepeatedFloat = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeFloat(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedFloat", jspb.BinaryWriter.prototype.writeRepeatedFloat);
      jspb.BinaryWriter.prototype.writeRepeatedDouble = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeDouble(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedDouble", jspb.BinaryWriter.prototype.writeRepeatedDouble);
      jspb.BinaryWriter.prototype.writeRepeatedBool = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeBool(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedBool", jspb.BinaryWriter.prototype.writeRepeatedBool);
      jspb.BinaryWriter.prototype.writeRepeatedEnum = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeEnum(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedEnum", jspb.BinaryWriter.prototype.writeRepeatedEnum);
      jspb.BinaryWriter.prototype.writeRepeatedString = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeString(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedString", jspb.BinaryWriter.prototype.writeRepeatedString);
      jspb.BinaryWriter.prototype.writeRepeatedBytes = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeBytes(a2, b2[c2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedBytes", jspb.BinaryWriter.prototype.writeRepeatedBytes);
      jspb.BinaryWriter.prototype.writeRepeatedMessage = function(a2, b2, c2) {
        if (null != b2)
          for (var d2 = 0; d2 < b2.length; d2++) {
            var e2 = this.beginDelimited_(a2);
            c2(b2[d2], this);
            this.endDelimited_(e2);
          }
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedMessage", jspb.BinaryWriter.prototype.writeRepeatedMessage);
      jspb.BinaryWriter.prototype.writeRepeatedGroup = function(a2, b2, c2) {
        if (null != b2)
          for (var d2 = 0; d2 < b2.length; d2++)
            this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.START_GROUP), c2(b2[d2], this), this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.END_GROUP);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writeRepeatedGroup", jspb.BinaryWriter.prototype.writeRepeatedGroup);
      jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeFixedHash64(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function(a2, b2) {
        if (null != b2)
          for (var c2 = 0; c2 < b2.length; c2++)
            this.writeVarintHash64(a2, b2[c2]);
      };
      jspb.BinaryWriter.prototype.writePackedInt32 = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeSignedVarint32(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedInt32", jspb.BinaryWriter.prototype.writePackedInt32);
      jspb.BinaryWriter.prototype.writePackedInt32String = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeSignedVarint32(parseInt(b2[c2], 10));
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedInt64 = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeSignedVarint64(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedInt64", jspb.BinaryWriter.prototype.writePackedInt64);
      jspb.BinaryWriter.prototype.writePackedSplitFixed64 = function(a2, b2, c2, d2) {
        if (null != b2) {
          a2 = this.beginDelimited_(a2);
          for (var e2 = 0; e2 < b2.length; e2++)
            this.encoder_.writeSplitFixed64(c2(b2[e2]), d2(b2[e2]));
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedSplitVarint64 = function(a2, b2, c2, d2) {
        if (null != b2) {
          a2 = this.beginDelimited_(a2);
          for (var e2 = 0; e2 < b2.length; e2++)
            this.encoder_.writeSplitVarint64(c2(b2[e2]), d2(b2[e2]));
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedSplitZigzagVarint64 = function(a2, b2, c2, d2) {
        if (null != b2) {
          a2 = this.beginDelimited_(a2);
          for (var e2 = this.encoder_, f2 = 0; f2 < b2.length; f2++)
            jspb.utils.toZigzag64(c2(b2[f2]), d2(b2[f2]), function(a3, b3) {
              e2.writeSplitVarint64(a3 >>> 0, b3 >>> 0);
            });
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedInt64String = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++) {
            var d2 = jspb.arith.Int64.fromString(b2[c2]);
            this.encoder_.writeSplitVarint64(d2.lo, d2.hi);
          }
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedUint32 = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeUnsignedVarint32(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedUint32", jspb.BinaryWriter.prototype.writePackedUint32);
      jspb.BinaryWriter.prototype.writePackedUint32String = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeUnsignedVarint32(parseInt(b2[c2], 10));
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedUint64 = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeUnsignedVarint64(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedUint64", jspb.BinaryWriter.prototype.writePackedUint64);
      jspb.BinaryWriter.prototype.writePackedUint64String = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++) {
            var d2 = jspb.arith.UInt64.fromString(b2[c2]);
            this.encoder_.writeSplitVarint64(d2.lo, d2.hi);
          }
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedSint32 = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeZigzagVarint32(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedSint32", jspb.BinaryWriter.prototype.writePackedSint32);
      jspb.BinaryWriter.prototype.writePackedSint64 = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeZigzagVarint64(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedSint64", jspb.BinaryWriter.prototype.writePackedSint64);
      jspb.BinaryWriter.prototype.writePackedSint64String = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(b2[c2]));
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedSintHash64 = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeZigzagVarintHash64(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      jspb.BinaryWriter.prototype.writePackedFixed32 = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeUint32(b2[a2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedFixed32", jspb.BinaryWriter.prototype.writePackedFixed32);
      jspb.BinaryWriter.prototype.writePackedFixed64 = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeUint64(b2[a2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedFixed64", jspb.BinaryWriter.prototype.writePackedFixed64);
      jspb.BinaryWriter.prototype.writePackedFixed64String = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b2.length), a2 = 0; a2 < b2.length; a2++) {
            var c2 = jspb.arith.UInt64.fromString(b2[a2]);
            this.encoder_.writeSplitFixed64(c2.lo, c2.hi);
          }
      };
      jspb.BinaryWriter.prototype.writePackedSfixed32 = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeInt32(b2[a2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedSfixed32", jspb.BinaryWriter.prototype.writePackedSfixed32);
      jspb.BinaryWriter.prototype.writePackedSfixed64 = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeInt64(b2[a2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedSfixed64", jspb.BinaryWriter.prototype.writePackedSfixed64);
      jspb.BinaryWriter.prototype.writePackedSfixed64String = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeInt64String(b2[a2]);
      };
      jspb.BinaryWriter.prototype.writePackedFloat = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(4 * b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeFloat(b2[a2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedFloat", jspb.BinaryWriter.prototype.writePackedFloat);
      jspb.BinaryWriter.prototype.writePackedDouble = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeDouble(b2[a2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedDouble", jspb.BinaryWriter.prototype.writePackedDouble);
      jspb.BinaryWriter.prototype.writePackedBool = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeBool(b2[a2]);
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedBool", jspb.BinaryWriter.prototype.writePackedBool);
      jspb.BinaryWriter.prototype.writePackedEnum = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeEnum(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      goog.exportProperty(jspb.BinaryWriter.prototype, "writePackedEnum", jspb.BinaryWriter.prototype.writePackedEnum);
      jspb.BinaryWriter.prototype.writePackedFixedHash64 = function(a2, b2) {
        if (null != b2 && b2.length)
          for (this.writeFieldHeader_(a2, jspb.BinaryConstants.WireType.DELIMITED), this.encoder_.writeUnsignedVarint32(8 * b2.length), a2 = 0; a2 < b2.length; a2++)
            this.encoder_.writeFixedHash64(b2[a2]);
      };
      jspb.BinaryWriter.prototype.writePackedVarintHash64 = function(a2, b2) {
        if (null != b2 && b2.length) {
          a2 = this.beginDelimited_(a2);
          for (var c2 = 0; c2 < b2.length; c2++)
            this.encoder_.writeVarintHash64(b2[c2]);
          this.endDelimited_(a2);
        }
      };
      jspb.Map = function(a2, b2) {
        this.arr_ = a2;
        this.valueCtor_ = b2;
        this.map_ = {};
        this.arrClean = true;
        0 < this.arr_.length && this.loadFromArray_();
      };
      goog.exportSymbol("jspb.Map", jspb.Map);
      jspb.Map.prototype.loadFromArray_ = function() {
        for (var a2 = 0; a2 < this.arr_.length; a2++) {
          var b2 = this.arr_[a2], c2 = b2[0];
          this.map_[c2.toString()] = new jspb.Map.Entry_(c2, b2[1]);
        }
        this.arrClean = true;
      };
      jspb.Map.prototype.toArray = function() {
        if (this.arrClean) {
          if (this.valueCtor_) {
            var a2 = this.map_, b2;
            for (b2 in a2)
              if (Object.prototype.hasOwnProperty.call(a2, b2)) {
                var c2 = a2[b2].valueWrapper;
                c2 && c2.toArray();
              }
          }
        } else {
          this.arr_.length = 0;
          a2 = this.stringKeys_();
          a2.sort();
          for (b2 = 0; b2 < a2.length; b2++) {
            var d2 = this.map_[a2[b2]];
            (c2 = d2.valueWrapper) && c2.toArray();
            this.arr_.push([d2.key, d2.value]);
          }
          this.arrClean = true;
        }
        return this.arr_;
      };
      goog.exportProperty(jspb.Map.prototype, "toArray", jspb.Map.prototype.toArray);
      jspb.Map.prototype.toObject = function(a2, b2) {
        for (var c2 = this.toArray(), d2 = [], e2 = 0; e2 < c2.length; e2++) {
          var f2 = this.map_[c2[e2][0].toString()];
          this.wrapEntry_(f2);
          var g = f2.valueWrapper;
          g ? (jspb.asserts.assert(b2), d2.push([f2.key, b2(a2, g)])) : d2.push([f2.key, f2.value]);
        }
        return d2;
      };
      goog.exportProperty(jspb.Map.prototype, "toObject", jspb.Map.prototype.toObject);
      jspb.Map.fromObject = function(a2, b2, c2) {
        b2 = new jspb.Map([], b2);
        for (var d2 = 0; d2 < a2.length; d2++) {
          var e2 = a2[d2][0], f2 = c2(a2[d2][1]);
          b2.set(e2, f2);
        }
        return b2;
      };
      goog.exportProperty(jspb.Map, "fromObject", jspb.Map.fromObject);
      jspb.Map.ArrayIteratorIterable_ = function(a2) {
        this.idx_ = 0;
        this.arr_ = a2;
      };
      jspb.Map.ArrayIteratorIterable_.prototype.next = function() {
        return this.idx_ < this.arr_.length ? { done: false, value: this.arr_[this.idx_++] } : { done: true, value: void 0 };
      };
      "undefined" != typeof Symbol && (jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] = function() {
        return this;
      });
      jspb.Map.prototype.getLength = function() {
        return this.stringKeys_().length;
      };
      goog.exportProperty(jspb.Map.prototype, "getLength", jspb.Map.prototype.getLength);
      jspb.Map.prototype.clear = function() {
        this.map_ = {};
        this.arrClean = false;
      };
      goog.exportProperty(jspb.Map.prototype, "clear", jspb.Map.prototype.clear);
      jspb.Map.prototype.del = function(a2) {
        a2 = a2.toString();
        var b2 = this.map_.hasOwnProperty(a2);
        delete this.map_[a2];
        this.arrClean = false;
        return b2;
      };
      goog.exportProperty(jspb.Map.prototype, "del", jspb.Map.prototype.del);
      jspb.Map.prototype.getEntryList = function() {
        var a2 = [], b2 = this.stringKeys_();
        b2.sort();
        for (var c2 = 0; c2 < b2.length; c2++) {
          var d2 = this.map_[b2[c2]];
          a2.push([d2.key, d2.value]);
        }
        return a2;
      };
      goog.exportProperty(jspb.Map.prototype, "getEntryList", jspb.Map.prototype.getEntryList);
      jspb.Map.prototype.entries = function() {
        var a2 = [], b2 = this.stringKeys_();
        b2.sort();
        for (var c2 = 0; c2 < b2.length; c2++) {
          var d2 = this.map_[b2[c2]];
          a2.push([d2.key, this.wrapEntry_(d2)]);
        }
        return new jspb.Map.ArrayIteratorIterable_(a2);
      };
      goog.exportProperty(jspb.Map.prototype, "entries", jspb.Map.prototype.entries);
      jspb.Map.prototype.keys = function() {
        var a2 = [], b2 = this.stringKeys_();
        b2.sort();
        for (var c2 = 0; c2 < b2.length; c2++)
          a2.push(this.map_[b2[c2]].key);
        return new jspb.Map.ArrayIteratorIterable_(a2);
      };
      goog.exportProperty(jspb.Map.prototype, "keys", jspb.Map.prototype.keys);
      jspb.Map.prototype.values = function() {
        var a2 = [], b2 = this.stringKeys_();
        b2.sort();
        for (var c2 = 0; c2 < b2.length; c2++)
          a2.push(this.wrapEntry_(this.map_[b2[c2]]));
        return new jspb.Map.ArrayIteratorIterable_(a2);
      };
      goog.exportProperty(jspb.Map.prototype, "values", jspb.Map.prototype.values);
      jspb.Map.prototype.forEach = function(a2, b2) {
        var c2 = this.stringKeys_();
        c2.sort();
        for (var d2 = 0; d2 < c2.length; d2++) {
          var e2 = this.map_[c2[d2]];
          a2.call(b2, this.wrapEntry_(e2), e2.key, this);
        }
      };
      goog.exportProperty(jspb.Map.prototype, "forEach", jspb.Map.prototype.forEach);
      jspb.Map.prototype.set = function(a2, b2) {
        var c2 = new jspb.Map.Entry_(a2);
        this.valueCtor_ ? (c2.valueWrapper = b2, c2.value = b2.toArray()) : c2.value = b2;
        this.map_[a2.toString()] = c2;
        this.arrClean = false;
        return this;
      };
      goog.exportProperty(jspb.Map.prototype, "set", jspb.Map.prototype.set);
      jspb.Map.prototype.wrapEntry_ = function(a2) {
        return this.valueCtor_ ? (a2.valueWrapper || (a2.valueWrapper = new this.valueCtor_(a2.value)), a2.valueWrapper) : a2.value;
      };
      jspb.Map.prototype.get = function(a2) {
        if (a2 = this.map_[a2.toString()])
          return this.wrapEntry_(a2);
      };
      goog.exportProperty(jspb.Map.prototype, "get", jspb.Map.prototype.get);
      jspb.Map.prototype.has = function(a2) {
        return a2.toString() in this.map_;
      };
      goog.exportProperty(jspb.Map.prototype, "has", jspb.Map.prototype.has);
      jspb.Map.prototype.serializeBinary = function(a2, b2, c2, d2, e2) {
        var f2 = this.stringKeys_();
        f2.sort();
        for (var g = 0; g < f2.length; g++) {
          var h = this.map_[f2[g]];
          b2.beginSubMessage(a2);
          c2.call(b2, 1, h.key);
          this.valueCtor_ ? d2.call(b2, 2, this.wrapEntry_(h), e2) : d2.call(b2, 2, h.value);
          b2.endSubMessage();
        }
      };
      goog.exportProperty(jspb.Map.prototype, "serializeBinary", jspb.Map.prototype.serializeBinary);
      jspb.Map.deserializeBinary = function(a2, b2, c2, d2, e2, f2, g) {
        for (; b2.nextField() && !b2.isEndGroup(); ) {
          var h = b2.getFieldNumber();
          1 == h ? f2 = c2.call(b2) : 2 == h && (a2.valueCtor_ ? (jspb.asserts.assert(e2), g || (g = new a2.valueCtor_()), d2.call(b2, g, e2)) : g = d2.call(b2));
        }
        jspb.asserts.assert(void 0 != f2);
        jspb.asserts.assert(void 0 != g);
        a2.set(f2, g);
      };
      goog.exportProperty(jspb.Map, "deserializeBinary", jspb.Map.deserializeBinary);
      jspb.Map.prototype.stringKeys_ = function() {
        var a2 = this.map_, b2 = [], c2;
        for (c2 in a2)
          Object.prototype.hasOwnProperty.call(a2, c2) && b2.push(c2);
        return b2;
      };
      jspb.Map.Entry_ = function(a2, b2) {
        this.key = a2;
        this.value = b2;
        this.valueWrapper = void 0;
      };
      jspb.ExtensionFieldInfo = function(a2, b2, c2, d2, e2) {
        this.fieldIndex = a2;
        this.fieldName = b2;
        this.ctor = c2;
        this.toObjectFn = d2;
        this.isRepeated = e2;
      };
      goog.exportSymbol("jspb.ExtensionFieldInfo", jspb.ExtensionFieldInfo);
      jspb.ExtensionFieldBinaryInfo = function(a2, b2, c2, d2, e2, f2) {
        this.fieldInfo = a2;
        this.binaryReaderFn = b2;
        this.binaryWriterFn = c2;
        this.binaryMessageSerializeFn = d2;
        this.binaryMessageDeserializeFn = e2;
        this.isPacked = f2;
      };
      goog.exportSymbol("jspb.ExtensionFieldBinaryInfo", jspb.ExtensionFieldBinaryInfo);
      jspb.ExtensionFieldInfo.prototype.isMessageType = function() {
        return !!this.ctor;
      };
      goog.exportProperty(jspb.ExtensionFieldInfo.prototype, "isMessageType", jspb.ExtensionFieldInfo.prototype.isMessageType);
      jspb.Message = function() {
      };
      goog.exportSymbol("jspb.Message", jspb.Message);
      jspb.Message.GENERATE_TO_OBJECT = true;
      goog.exportProperty(jspb.Message, "GENERATE_TO_OBJECT", jspb.Message.GENERATE_TO_OBJECT);
      jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE;
      goog.exportProperty(jspb.Message, "GENERATE_FROM_OBJECT", jspb.Message.GENERATE_FROM_OBJECT);
      jspb.Message.GENERATE_TO_STRING = true;
      jspb.Message.ASSUME_LOCAL_ARRAYS = false;
      jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS = true;
      jspb.Message.SUPPORTS_UINT8ARRAY_ = "function" == typeof Uint8Array;
      jspb.Message.prototype.getJsPbMessageId = function() {
        return this.messageId_;
      };
      goog.exportProperty(jspb.Message.prototype, "getJsPbMessageId", jspb.Message.prototype.getJsPbMessageId);
      jspb.Message.getIndex_ = function(a2, b2) {
        return b2 + a2.arrayIndexOffset_;
      };
      jspb.Message.hiddenES6Property_ = function() {
      };
      jspb.Message.getFieldNumber_ = function(a2, b2) {
        return b2 - a2.arrayIndexOffset_;
      };
      jspb.Message.initialize = function(a2, b2, c2, d2, e2, f2) {
        a2.wrappers_ = null;
        b2 || (b2 = c2 ? [c2] : []);
        a2.messageId_ = c2 ? String(c2) : void 0;
        a2.arrayIndexOffset_ = 0 === c2 ? -1 : 0;
        a2.array = b2;
        jspb.Message.initPivotAndExtensionObject_(a2, d2);
        a2.convertedPrimitiveFields_ = {};
        jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS || (a2.repeatedFields = e2);
        if (e2)
          for (b2 = 0; b2 < e2.length; b2++)
            c2 = e2[b2], c2 < a2.pivot_ ? (c2 = jspb.Message.getIndex_(a2, c2), a2.array[c2] = a2.array[c2] || jspb.Message.EMPTY_LIST_SENTINEL_) : (jspb.Message.maybeInitEmptyExtensionObject_(a2), a2.extensionObject_[c2] = a2.extensionObject_[c2] || jspb.Message.EMPTY_LIST_SENTINEL_);
        if (f2 && f2.length)
          for (b2 = 0; b2 < f2.length; b2++)
            jspb.Message.computeOneofCase(a2, f2[b2]);
      };
      goog.exportProperty(jspb.Message, "initialize", jspb.Message.initialize);
      jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [];
      jspb.Message.isArray_ = function(a2) {
        return jspb.Message.ASSUME_LOCAL_ARRAYS ? a2 instanceof Array : Array.isArray(a2);
      };
      jspb.Message.isExtensionObject_ = function(a2) {
        return null !== a2 && "object" == typeof a2 && !jspb.Message.isArray_(a2) && !(jspb.Message.SUPPORTS_UINT8ARRAY_ && a2 instanceof Uint8Array);
      };
      jspb.Message.initPivotAndExtensionObject_ = function(a2, b2) {
        var c2 = a2.array.length, d2 = -1;
        if (c2 && (d2 = c2 - 1, c2 = a2.array[d2], jspb.Message.isExtensionObject_(c2))) {
          a2.pivot_ = jspb.Message.getFieldNumber_(a2, d2);
          a2.extensionObject_ = c2;
          return;
        }
        -1 < b2 ? (a2.pivot_ = Math.max(b2, jspb.Message.getFieldNumber_(a2, d2 + 1)), a2.extensionObject_ = null) : a2.pivot_ = Number.MAX_VALUE;
      };
      jspb.Message.maybeInitEmptyExtensionObject_ = function(a2) {
        var b2 = jspb.Message.getIndex_(a2, a2.pivot_);
        a2.array[b2] || (a2.extensionObject_ = a2.array[b2] = {});
      };
      jspb.Message.toObjectList = function(a2, b2, c2) {
        for (var d2 = [], e2 = 0; e2 < a2.length; e2++)
          d2[e2] = b2.call(a2[e2], c2, a2[e2]);
        return d2;
      };
      goog.exportProperty(jspb.Message, "toObjectList", jspb.Message.toObjectList);
      jspb.Message.toObjectExtension = function(a2, b2, c2, d2, e2) {
        for (var f2 in c2) {
          var g = c2[f2], h = d2.call(a2, g);
          if (null != h) {
            for (var k in g.fieldName)
              if (g.fieldName.hasOwnProperty(k))
                break;
            b2[k] = g.toObjectFn ? g.isRepeated ? jspb.Message.toObjectList(h, g.toObjectFn, e2) : g.toObjectFn(e2, h) : h;
          }
        }
      };
      goog.exportProperty(jspb.Message, "toObjectExtension", jspb.Message.toObjectExtension);
      jspb.Message.serializeBinaryExtensions = function(a2, b2, c2, d2) {
        for (var e2 in c2) {
          var f2 = c2[e2], g = f2.fieldInfo;
          if (!f2.binaryWriterFn)
            throw Error("Message extension present that was generated without binary serialization support");
          var h = d2.call(a2, g);
          if (null != h)
            if (g.isMessageType())
              if (f2.binaryMessageSerializeFn)
                f2.binaryWriterFn.call(b2, g.fieldIndex, h, f2.binaryMessageSerializeFn);
              else
                throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
            else
              f2.binaryWriterFn.call(b2, g.fieldIndex, h);
        }
      };
      goog.exportProperty(jspb.Message, "serializeBinaryExtensions", jspb.Message.serializeBinaryExtensions);
      jspb.Message.readBinaryExtension = function(a2, b2, c2, d2, e2) {
        var f2 = c2[b2.getFieldNumber()];
        if (f2) {
          c2 = f2.fieldInfo;
          if (!f2.binaryReaderFn)
            throw Error("Deserializing extension whose generated code does not support binary format");
          if (c2.isMessageType()) {
            var g = new c2.ctor();
            f2.binaryReaderFn.call(b2, g, f2.binaryMessageDeserializeFn);
          } else
            g = f2.binaryReaderFn.call(b2);
          c2.isRepeated && !f2.isPacked ? (b2 = d2.call(a2, c2)) ? b2.push(g) : e2.call(a2, c2, [g]) : e2.call(a2, c2, g);
        } else
          b2.skipField();
      };
      goog.exportProperty(jspb.Message, "readBinaryExtension", jspb.Message.readBinaryExtension);
      jspb.Message.getField = function(a2, b2) {
        if (b2 < a2.pivot_) {
          b2 = jspb.Message.getIndex_(a2, b2);
          var c2 = a2.array[b2];
          return c2 === jspb.Message.EMPTY_LIST_SENTINEL_ ? a2.array[b2] = [] : c2;
        }
        if (a2.extensionObject_)
          return c2 = a2.extensionObject_[b2], c2 === jspb.Message.EMPTY_LIST_SENTINEL_ ? a2.extensionObject_[b2] = [] : c2;
      };
      goog.exportProperty(jspb.Message, "getField", jspb.Message.getField);
      jspb.Message.getRepeatedField = function(a2, b2) {
        return jspb.Message.getField(a2, b2);
      };
      goog.exportProperty(jspb.Message, "getRepeatedField", jspb.Message.getRepeatedField);
      jspb.Message.getOptionalFloatingPointField = function(a2, b2) {
        a2 = jspb.Message.getField(a2, b2);
        return null == a2 ? a2 : +a2;
      };
      goog.exportProperty(jspb.Message, "getOptionalFloatingPointField", jspb.Message.getOptionalFloatingPointField);
      jspb.Message.getBooleanField = function(a2, b2) {
        a2 = jspb.Message.getField(a2, b2);
        return null == a2 ? a2 : !!a2;
      };
      goog.exportProperty(jspb.Message, "getBooleanField", jspb.Message.getBooleanField);
      jspb.Message.getRepeatedFloatingPointField = function(a2, b2) {
        var c2 = jspb.Message.getRepeatedField(a2, b2);
        a2.convertedPrimitiveFields_ || (a2.convertedPrimitiveFields_ = {});
        if (!a2.convertedPrimitiveFields_[b2]) {
          for (var d2 = 0; d2 < c2.length; d2++)
            c2[d2] = +c2[d2];
          a2.convertedPrimitiveFields_[b2] = true;
        }
        return c2;
      };
      goog.exportProperty(jspb.Message, "getRepeatedFloatingPointField", jspb.Message.getRepeatedFloatingPointField);
      jspb.Message.getRepeatedBooleanField = function(a2, b2) {
        var c2 = jspb.Message.getRepeatedField(a2, b2);
        a2.convertedPrimitiveFields_ || (a2.convertedPrimitiveFields_ = {});
        if (!a2.convertedPrimitiveFields_[b2]) {
          for (var d2 = 0; d2 < c2.length; d2++)
            c2[d2] = !!c2[d2];
          a2.convertedPrimitiveFields_[b2] = true;
        }
        return c2;
      };
      goog.exportProperty(jspb.Message, "getRepeatedBooleanField", jspb.Message.getRepeatedBooleanField);
      jspb.Message.bytesAsB64 = function(a2) {
        if (null == a2 || "string" === typeof a2)
          return a2;
        if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a2 instanceof Uint8Array)
          return goog.crypt.base64.encodeByteArray(a2);
        jspb.asserts.fail("Cannot coerce to b64 string: " + goog.typeOf(a2));
        return null;
      };
      goog.exportProperty(jspb.Message, "bytesAsB64", jspb.Message.bytesAsB64);
      jspb.Message.bytesAsU8 = function(a2) {
        if (null == a2 || a2 instanceof Uint8Array)
          return a2;
        if ("string" === typeof a2)
          return goog.crypt.base64.decodeStringToUint8Array(a2);
        jspb.asserts.fail("Cannot coerce to Uint8Array: " + goog.typeOf(a2));
        return null;
      };
      goog.exportProperty(jspb.Message, "bytesAsU8", jspb.Message.bytesAsU8);
      jspb.Message.bytesListAsB64 = function(a2) {
        jspb.Message.assertConsistentTypes_(a2);
        return a2.length && "string" !== typeof a2[0] ? goog.array.map(a2, jspb.Message.bytesAsB64) : a2;
      };
      goog.exportProperty(jspb.Message, "bytesListAsB64", jspb.Message.bytesListAsB64);
      jspb.Message.bytesListAsU8 = function(a2) {
        jspb.Message.assertConsistentTypes_(a2);
        return !a2.length || a2[0] instanceof Uint8Array ? a2 : goog.array.map(a2, jspb.Message.bytesAsU8);
      };
      goog.exportProperty(jspb.Message, "bytesListAsU8", jspb.Message.bytesListAsU8);
      jspb.Message.assertConsistentTypes_ = function(a2) {
        if (goog.DEBUG && a2 && 1 < a2.length) {
          var b2 = goog.typeOf(a2[0]);
          goog.array.forEach(a2, function(a3) {
            goog.typeOf(a3) != b2 && jspb.asserts.fail("Inconsistent type in JSPB repeated field array. Got " + goog.typeOf(a3) + " expected " + b2);
          });
        }
      };
      jspb.Message.getFieldWithDefault = function(a2, b2, c2) {
        a2 = jspb.Message.getField(a2, b2);
        return null == a2 ? c2 : a2;
      };
      goog.exportProperty(jspb.Message, "getFieldWithDefault", jspb.Message.getFieldWithDefault);
      jspb.Message.getBooleanFieldWithDefault = function(a2, b2, c2) {
        a2 = jspb.Message.getBooleanField(a2, b2);
        return null == a2 ? c2 : a2;
      };
      goog.exportProperty(jspb.Message, "getBooleanFieldWithDefault", jspb.Message.getBooleanFieldWithDefault);
      jspb.Message.getFloatingPointFieldWithDefault = function(a2, b2, c2) {
        a2 = jspb.Message.getOptionalFloatingPointField(a2, b2);
        return null == a2 ? c2 : a2;
      };
      goog.exportProperty(jspb.Message, "getFloatingPointFieldWithDefault", jspb.Message.getFloatingPointFieldWithDefault);
      jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault;
      goog.exportProperty(jspb.Message, "getFieldProto3", jspb.Message.getFieldProto3);
      jspb.Message.getMapField = function(a2, b2, c2, d2) {
        a2.wrappers_ || (a2.wrappers_ = {});
        if (b2 in a2.wrappers_)
          return a2.wrappers_[b2];
        var e2 = jspb.Message.getField(a2, b2);
        if (!e2) {
          if (c2)
            return;
          e2 = [];
          jspb.Message.setField(a2, b2, e2);
        }
        return a2.wrappers_[b2] = new jspb.Map(e2, d2);
      };
      goog.exportProperty(jspb.Message, "getMapField", jspb.Message.getMapField);
      jspb.Message.setField = function(a2, b2, c2) {
        jspb.asserts.assertInstanceof(a2, jspb.Message);
        b2 < a2.pivot_ ? a2.array[jspb.Message.getIndex_(a2, b2)] = c2 : (jspb.Message.maybeInitEmptyExtensionObject_(a2), a2.extensionObject_[b2] = c2);
        return a2;
      };
      goog.exportProperty(jspb.Message, "setField", jspb.Message.setField);
      jspb.Message.setProto3IntField = function(a2, b2, c2) {
        return jspb.Message.setFieldIgnoringDefault_(a2, b2, c2, 0);
      };
      goog.exportProperty(jspb.Message, "setProto3IntField", jspb.Message.setProto3IntField);
      jspb.Message.setProto3FloatField = function(a2, b2, c2) {
        return jspb.Message.setFieldIgnoringDefault_(a2, b2, c2, 0);
      };
      goog.exportProperty(jspb.Message, "setProto3FloatField", jspb.Message.setProto3FloatField);
      jspb.Message.setProto3BooleanField = function(a2, b2, c2) {
        return jspb.Message.setFieldIgnoringDefault_(a2, b2, c2, false);
      };
      goog.exportProperty(jspb.Message, "setProto3BooleanField", jspb.Message.setProto3BooleanField);
      jspb.Message.setProto3StringField = function(a2, b2, c2) {
        return jspb.Message.setFieldIgnoringDefault_(a2, b2, c2, "");
      };
      goog.exportProperty(jspb.Message, "setProto3StringField", jspb.Message.setProto3StringField);
      jspb.Message.setProto3BytesField = function(a2, b2, c2) {
        return jspb.Message.setFieldIgnoringDefault_(a2, b2, c2, "");
      };
      goog.exportProperty(jspb.Message, "setProto3BytesField", jspb.Message.setProto3BytesField);
      jspb.Message.setProto3EnumField = function(a2, b2, c2) {
        return jspb.Message.setFieldIgnoringDefault_(a2, b2, c2, 0);
      };
      goog.exportProperty(jspb.Message, "setProto3EnumField", jspb.Message.setProto3EnumField);
      jspb.Message.setProto3StringIntField = function(a2, b2, c2) {
        return jspb.Message.setFieldIgnoringDefault_(a2, b2, c2, "0");
      };
      goog.exportProperty(jspb.Message, "setProto3StringIntField", jspb.Message.setProto3StringIntField);
      jspb.Message.setFieldIgnoringDefault_ = function(a2, b2, c2, d2) {
        jspb.asserts.assertInstanceof(a2, jspb.Message);
        c2 !== d2 ? jspb.Message.setField(a2, b2, c2) : b2 < a2.pivot_ ? a2.array[jspb.Message.getIndex_(a2, b2)] = null : (jspb.Message.maybeInitEmptyExtensionObject_(a2), delete a2.extensionObject_[b2]);
        return a2;
      };
      jspb.Message.addToRepeatedField = function(a2, b2, c2, d2) {
        jspb.asserts.assertInstanceof(a2, jspb.Message);
        b2 = jspb.Message.getRepeatedField(a2, b2);
        void 0 != d2 ? b2.splice(d2, 0, c2) : b2.push(c2);
        return a2;
      };
      goog.exportProperty(jspb.Message, "addToRepeatedField", jspb.Message.addToRepeatedField);
      jspb.Message.setOneofField = function(a2, b2, c2, d2) {
        jspb.asserts.assertInstanceof(a2, jspb.Message);
        (c2 = jspb.Message.computeOneofCase(a2, c2)) && c2 !== b2 && void 0 !== d2 && (a2.wrappers_ && c2 in a2.wrappers_ && (a2.wrappers_[c2] = void 0), jspb.Message.setField(a2, c2, void 0));
        return jspb.Message.setField(a2, b2, d2);
      };
      goog.exportProperty(jspb.Message, "setOneofField", jspb.Message.setOneofField);
      jspb.Message.computeOneofCase = function(a2, b2) {
        for (var c2, d2, e2 = 0; e2 < b2.length; e2++) {
          var f2 = b2[e2], g = jspb.Message.getField(a2, f2);
          null != g && (c2 = f2, d2 = g, jspb.Message.setField(a2, f2, void 0));
        }
        return c2 ? (jspb.Message.setField(a2, c2, d2), c2) : 0;
      };
      goog.exportProperty(jspb.Message, "computeOneofCase", jspb.Message.computeOneofCase);
      jspb.Message.getWrapperField = function(a2, b2, c2, d2) {
        a2.wrappers_ || (a2.wrappers_ = {});
        if (!a2.wrappers_[c2]) {
          var e2 = jspb.Message.getField(a2, c2);
          if (d2 || e2)
            a2.wrappers_[c2] = new b2(e2);
        }
        return a2.wrappers_[c2];
      };
      goog.exportProperty(jspb.Message, "getWrapperField", jspb.Message.getWrapperField);
      jspb.Message.getRepeatedWrapperField = function(a2, b2, c2) {
        jspb.Message.wrapRepeatedField_(a2, b2, c2);
        b2 = a2.wrappers_[c2];
        b2 == jspb.Message.EMPTY_LIST_SENTINEL_ && (b2 = a2.wrappers_[c2] = []);
        return b2;
      };
      goog.exportProperty(jspb.Message, "getRepeatedWrapperField", jspb.Message.getRepeatedWrapperField);
      jspb.Message.wrapRepeatedField_ = function(a2, b2, c2) {
        a2.wrappers_ || (a2.wrappers_ = {});
        if (!a2.wrappers_[c2]) {
          for (var d2 = jspb.Message.getRepeatedField(a2, c2), e2 = [], f2 = 0; f2 < d2.length; f2++)
            e2[f2] = new b2(d2[f2]);
          a2.wrappers_[c2] = e2;
        }
      };
      jspb.Message.setWrapperField = function(a2, b2, c2) {
        jspb.asserts.assertInstanceof(a2, jspb.Message);
        a2.wrappers_ || (a2.wrappers_ = {});
        var d2 = c2 ? c2.toArray() : c2;
        a2.wrappers_[b2] = c2;
        return jspb.Message.setField(a2, b2, d2);
      };
      goog.exportProperty(jspb.Message, "setWrapperField", jspb.Message.setWrapperField);
      jspb.Message.setOneofWrapperField = function(a2, b2, c2, d2) {
        jspb.asserts.assertInstanceof(a2, jspb.Message);
        a2.wrappers_ || (a2.wrappers_ = {});
        var e2 = d2 ? d2.toArray() : d2;
        a2.wrappers_[b2] = d2;
        return jspb.Message.setOneofField(a2, b2, c2, e2);
      };
      goog.exportProperty(jspb.Message, "setOneofWrapperField", jspb.Message.setOneofWrapperField);
      jspb.Message.setRepeatedWrapperField = function(a2, b2, c2) {
        jspb.asserts.assertInstanceof(a2, jspb.Message);
        a2.wrappers_ || (a2.wrappers_ = {});
        c2 = c2 || [];
        for (var d2 = [], e2 = 0; e2 < c2.length; e2++)
          d2[e2] = c2[e2].toArray();
        a2.wrappers_[b2] = c2;
        return jspb.Message.setField(a2, b2, d2);
      };
      goog.exportProperty(jspb.Message, "setRepeatedWrapperField", jspb.Message.setRepeatedWrapperField);
      jspb.Message.addToRepeatedWrapperField = function(a2, b2, c2, d2, e2) {
        jspb.Message.wrapRepeatedField_(a2, d2, b2);
        var f2 = a2.wrappers_[b2];
        f2 || (f2 = a2.wrappers_[b2] = []);
        c2 = c2 ? c2 : new d2();
        a2 = jspb.Message.getRepeatedField(a2, b2);
        void 0 != e2 ? (f2.splice(e2, 0, c2), a2.splice(e2, 0, c2.toArray())) : (f2.push(c2), a2.push(c2.toArray()));
        return c2;
      };
      goog.exportProperty(jspb.Message, "addToRepeatedWrapperField", jspb.Message.addToRepeatedWrapperField);
      jspb.Message.toMap = function(a2, b2, c2, d2) {
        for (var e2 = {}, f2 = 0; f2 < a2.length; f2++)
          e2[b2.call(a2[f2])] = c2 ? c2.call(a2[f2], d2, a2[f2]) : a2[f2];
        return e2;
      };
      goog.exportProperty(jspb.Message, "toMap", jspb.Message.toMap);
      jspb.Message.prototype.syncMapFields_ = function() {
        if (this.wrappers_)
          for (var a2 in this.wrappers_) {
            var b2 = this.wrappers_[a2];
            if (Array.isArray(b2))
              for (var c2 = 0; c2 < b2.length; c2++)
                b2[c2] && b2[c2].toArray();
            else
              b2 && b2.toArray();
          }
      };
      jspb.Message.prototype.toArray = function() {
        this.syncMapFields_();
        return this.array;
      };
      goog.exportProperty(jspb.Message.prototype, "toArray", jspb.Message.prototype.toArray);
      jspb.Message.GENERATE_TO_STRING && (jspb.Message.prototype.toString = function() {
        this.syncMapFields_();
        return this.array.toString();
      });
      jspb.Message.prototype.getExtension = function(a2) {
        if (this.extensionObject_) {
          this.wrappers_ || (this.wrappers_ = {});
          var b2 = a2.fieldIndex;
          if (a2.isRepeated) {
            if (a2.isMessageType())
              return this.wrappers_[b2] || (this.wrappers_[b2] = goog.array.map(this.extensionObject_[b2] || [], function(b3) {
                return new a2.ctor(b3);
              })), this.wrappers_[b2];
          } else if (a2.isMessageType())
            return !this.wrappers_[b2] && this.extensionObject_[b2] && (this.wrappers_[b2] = new a2.ctor(this.extensionObject_[b2])), this.wrappers_[b2];
          return this.extensionObject_[b2];
        }
      };
      goog.exportProperty(jspb.Message.prototype, "getExtension", jspb.Message.prototype.getExtension);
      jspb.Message.prototype.setExtension = function(a2, b2) {
        this.wrappers_ || (this.wrappers_ = {});
        jspb.Message.maybeInitEmptyExtensionObject_(this);
        var c2 = a2.fieldIndex;
        a2.isRepeated ? (b2 = b2 || [], a2.isMessageType() ? (this.wrappers_[c2] = b2, this.extensionObject_[c2] = goog.array.map(b2, function(a3) {
          return a3.toArray();
        })) : this.extensionObject_[c2] = b2) : a2.isMessageType() ? (this.wrappers_[c2] = b2, this.extensionObject_[c2] = b2 ? b2.toArray() : b2) : this.extensionObject_[c2] = b2;
        return this;
      };
      goog.exportProperty(jspb.Message.prototype, "setExtension", jspb.Message.prototype.setExtension);
      jspb.Message.difference = function(a2, b2) {
        if (!(a2 instanceof b2.constructor))
          throw Error("Messages have different types.");
        var c2 = a2.toArray();
        b2 = b2.toArray();
        var d2 = [], e2 = 0, f2 = c2.length > b2.length ? c2.length : b2.length;
        a2.getJsPbMessageId() && (d2[0] = a2.getJsPbMessageId(), e2 = 1);
        for (; e2 < f2; e2++)
          jspb.Message.compareFields(c2[e2], b2[e2]) || (d2[e2] = b2[e2]);
        return new a2.constructor(d2);
      };
      goog.exportProperty(jspb.Message, "difference", jspb.Message.difference);
      jspb.Message.equals = function(a2, b2) {
        return a2 == b2 || !(!a2 || !b2) && a2 instanceof b2.constructor && jspb.Message.compareFields(a2.toArray(), b2.toArray());
      };
      goog.exportProperty(jspb.Message, "equals", jspb.Message.equals);
      jspb.Message.compareExtensions = function(a2, b2) {
        a2 = a2 || {};
        b2 = b2 || {};
        var c2 = {}, d2;
        for (d2 in a2)
          c2[d2] = 0;
        for (d2 in b2)
          c2[d2] = 0;
        for (d2 in c2)
          if (!jspb.Message.compareFields(a2[d2], b2[d2]))
            return false;
        return true;
      };
      goog.exportProperty(jspb.Message, "compareExtensions", jspb.Message.compareExtensions);
      jspb.Message.compareFields = function(a2, b2) {
        if (a2 == b2)
          return true;
        if (!goog.isObject(a2) || !goog.isObject(b2))
          return "number" === typeof a2 && isNaN(a2) || "number" === typeof b2 && isNaN(b2) ? String(a2) == String(b2) : false;
        if (a2.constructor != b2.constructor)
          return false;
        if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a2.constructor === Uint8Array) {
          if (a2.length != b2.length)
            return false;
          for (var c2 = 0; c2 < a2.length; c2++)
            if (a2[c2] != b2[c2])
              return false;
          return true;
        }
        if (a2.constructor === Array) {
          var d2 = void 0, e2 = void 0, f2 = Math.max(a2.length, b2.length);
          for (c2 = 0; c2 < f2; c2++) {
            var g = a2[c2], h = b2[c2];
            g && g.constructor == Object && (jspb.asserts.assert(void 0 === d2), jspb.asserts.assert(c2 === a2.length - 1), d2 = g, g = void 0);
            h && h.constructor == Object && (jspb.asserts.assert(void 0 === e2), jspb.asserts.assert(c2 === b2.length - 1), e2 = h, h = void 0);
            if (!jspb.Message.compareFields(g, h))
              return false;
          }
          return d2 || e2 ? (d2 = d2 || {}, e2 = e2 || {}, jspb.Message.compareExtensions(d2, e2)) : true;
        }
        if (a2.constructor === Object)
          return jspb.Message.compareExtensions(a2, b2);
        throw Error("Invalid type in JSPB array");
      };
      goog.exportProperty(jspb.Message, "compareFields", jspb.Message.compareFields);
      jspb.Message.prototype.cloneMessage = function() {
        return jspb.Message.cloneMessage(this);
      };
      goog.exportProperty(jspb.Message.prototype, "cloneMessage", jspb.Message.prototype.cloneMessage);
      jspb.Message.prototype.clone = function() {
        return jspb.Message.cloneMessage(this);
      };
      goog.exportProperty(jspb.Message.prototype, "clone", jspb.Message.prototype.clone);
      jspb.Message.clone = function(a2) {
        return jspb.Message.cloneMessage(a2);
      };
      goog.exportProperty(jspb.Message, "clone", jspb.Message.clone);
      jspb.Message.cloneMessage = function(a2) {
        return new a2.constructor(jspb.Message.clone_(a2.toArray()));
      };
      jspb.Message.copyInto = function(a2, b2) {
        jspb.asserts.assertInstanceof(a2, jspb.Message);
        jspb.asserts.assertInstanceof(b2, jspb.Message);
        jspb.asserts.assert(a2.constructor == b2.constructor, "Copy source and target message should have the same type.");
        a2 = jspb.Message.clone(a2);
        for (var c2 = b2.toArray(), d2 = a2.toArray(), e2 = c2.length = 0; e2 < d2.length; e2++)
          c2[e2] = d2[e2];
        b2.wrappers_ = a2.wrappers_;
        b2.extensionObject_ = a2.extensionObject_;
      };
      goog.exportProperty(jspb.Message, "copyInto", jspb.Message.copyInto);
      jspb.Message.clone_ = function(a2) {
        if (Array.isArray(a2)) {
          for (var b2 = Array(a2.length), c2 = 0; c2 < a2.length; c2++) {
            var d2 = a2[c2];
            null != d2 && (b2[c2] = "object" == typeof d2 ? jspb.Message.clone_(jspb.asserts.assert(d2)) : d2);
          }
          return b2;
        }
        if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a2 instanceof Uint8Array)
          return new Uint8Array(a2);
        b2 = {};
        for (c2 in a2)
          d2 = a2[c2], null != d2 && (b2[c2] = "object" == typeof d2 ? jspb.Message.clone_(jspb.asserts.assert(d2)) : d2);
        return b2;
      };
      jspb.Message.registerMessageType = function(a2, b2) {
        b2.messageId = a2;
      };
      goog.exportProperty(jspb.Message, "registerMessageType", jspb.Message.registerMessageType);
      jspb.Message.messageSetExtensions = {};
      jspb.Message.messageSetExtensionsBinary = {};
      jspb.Export = {};
      "object" === typeof exports && (exports.Map = jspb.Map, exports.Message = jspb.Message, exports.BinaryReader = jspb.BinaryReader, exports.BinaryWriter = jspb.BinaryWriter, exports.ExtensionFieldInfo = jspb.ExtensionFieldInfo, exports.ExtensionFieldBinaryInfo = jspb.ExtensionFieldBinaryInfo, exports.exportSymbol = goog.exportSymbol, exports.inherits = goog.inherits, exports.object = { extend: goog.object.extend }, exports.typeOf = goog.typeOf);
    }
  });

  // js/protobuf/messages_pb.js
  var require_messages_pb = __commonJS({
    "js/protobuf/messages_pb.js"(exports2) {
      var jspb2 = require_google_protobuf();
      var goog2 = jspb2;
      var global3 = typeof globalThis !== "undefined" && globalThis || typeof window !== "undefined" && window || typeof global3 !== "undefined" && global3 || typeof self !== "undefined" && self || function() {
        return this;
      }.call(null) || Function("return this")();
      goog2.exportSymbol("proto.Direction", null, global3);
      goog2.exportSymbol("proto.GameState", null, global3);
      goog2.exportSymbol("proto.Player", null, global3);
      goog2.exportSymbol("proto.Position", null, global3);
      proto.Direction = function(opt_data) {
        jspb2.Message.initialize(this, opt_data, 0, -1, null, null);
      };
      goog2.inherits(proto.Direction, jspb2.Message);
      if (goog2.DEBUG && !COMPILED) {
        proto.Direction.displayName = "proto.Direction";
      }
      proto.Position = function(opt_data) {
        jspb2.Message.initialize(this, opt_data, 0, -1, null, null);
      };
      goog2.inherits(proto.Position, jspb2.Message);
      if (goog2.DEBUG && !COMPILED) {
        proto.Position.displayName = "proto.Position";
      }
      proto.Player = function(opt_data) {
        jspb2.Message.initialize(this, opt_data, 0, -1, null, null);
      };
      goog2.inherits(proto.Player, jspb2.Message);
      if (goog2.DEBUG && !COMPILED) {
        proto.Player.displayName = "proto.Player";
      }
      proto.GameState = function(opt_data) {
        jspb2.Message.initialize(this, opt_data, 0, -1, null, null);
      };
      goog2.inherits(proto.GameState, jspb2.Message);
      if (goog2.DEBUG && !COMPILED) {
        proto.GameState.displayName = "proto.GameState";
      }
      if (jspb2.Message.GENERATE_TO_OBJECT) {
        proto.Direction.prototype.toObject = function(opt_includeInstance) {
          return proto.Direction.toObject(opt_includeInstance, this);
        };
        proto.Direction.toObject = function(includeInstance, msg) {
          var f2, obj = {
            x: jspb2.Message.getFloatingPointFieldWithDefault(msg, 1, 0),
            y: jspb2.Message.getFloatingPointFieldWithDefault(msg, 2, 0)
          };
          if (includeInstance) {
            obj.$jspbMessageInstance = msg;
          }
          return obj;
        };
      }
      proto.Direction.deserializeBinary = function(bytes) {
        var reader = new jspb2.BinaryReader(bytes);
        var msg = new proto.Direction();
        return proto.Direction.deserializeBinaryFromReader(msg, reader);
      };
      proto.Direction.deserializeBinaryFromReader = function(msg, reader) {
        while (reader.nextField()) {
          if (reader.isEndGroup()) {
            break;
          }
          var field = reader.getFieldNumber();
          switch (field) {
            case 1:
              var value = (
                /** @type {number} */
                reader.readFloat()
              );
              msg.setX(value);
              break;
            case 2:
              var value = (
                /** @type {number} */
                reader.readFloat()
              );
              msg.setY(value);
              break;
            default:
              reader.skipField();
              break;
          }
        }
        return msg;
      };
      proto.Direction.prototype.serializeBinary = function() {
        var writer = new jspb2.BinaryWriter();
        proto.Direction.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
      };
      proto.Direction.serializeBinaryToWriter = function(message, writer) {
        var f2 = void 0;
        f2 = message.getX();
        if (f2 !== 0) {
          writer.writeFloat(
            1,
            f2
          );
        }
        f2 = message.getY();
        if (f2 !== 0) {
          writer.writeFloat(
            2,
            f2
          );
        }
      };
      proto.Direction.prototype.getX = function() {
        return (
          /** @type {number} */
          jspb2.Message.getFloatingPointFieldWithDefault(this, 1, 0)
        );
      };
      proto.Direction.prototype.setX = function(value) {
        return jspb2.Message.setProto3FloatField(this, 1, value);
      };
      proto.Direction.prototype.getY = function() {
        return (
          /** @type {number} */
          jspb2.Message.getFloatingPointFieldWithDefault(this, 2, 0)
        );
      };
      proto.Direction.prototype.setY = function(value) {
        return jspb2.Message.setProto3FloatField(this, 2, value);
      };
      if (jspb2.Message.GENERATE_TO_OBJECT) {
        proto.Position.prototype.toObject = function(opt_includeInstance) {
          return proto.Position.toObject(opt_includeInstance, this);
        };
        proto.Position.toObject = function(includeInstance, msg) {
          var f2, obj = {
            x: jspb2.Message.getFloatingPointFieldWithDefault(msg, 1, 0),
            y: jspb2.Message.getFloatingPointFieldWithDefault(msg, 2, 0)
          };
          if (includeInstance) {
            obj.$jspbMessageInstance = msg;
          }
          return obj;
        };
      }
      proto.Position.deserializeBinary = function(bytes) {
        var reader = new jspb2.BinaryReader(bytes);
        var msg = new proto.Position();
        return proto.Position.deserializeBinaryFromReader(msg, reader);
      };
      proto.Position.deserializeBinaryFromReader = function(msg, reader) {
        while (reader.nextField()) {
          if (reader.isEndGroup()) {
            break;
          }
          var field = reader.getFieldNumber();
          switch (field) {
            case 1:
              var value = (
                /** @type {number} */
                reader.readFloat()
              );
              msg.setX(value);
              break;
            case 2:
              var value = (
                /** @type {number} */
                reader.readFloat()
              );
              msg.setY(value);
              break;
            default:
              reader.skipField();
              break;
          }
        }
        return msg;
      };
      proto.Position.prototype.serializeBinary = function() {
        var writer = new jspb2.BinaryWriter();
        proto.Position.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
      };
      proto.Position.serializeBinaryToWriter = function(message, writer) {
        var f2 = void 0;
        f2 = message.getX();
        if (f2 !== 0) {
          writer.writeFloat(
            1,
            f2
          );
        }
        f2 = message.getY();
        if (f2 !== 0) {
          writer.writeFloat(
            2,
            f2
          );
        }
      };
      proto.Position.prototype.getX = function() {
        return (
          /** @type {number} */
          jspb2.Message.getFloatingPointFieldWithDefault(this, 1, 0)
        );
      };
      proto.Position.prototype.setX = function(value) {
        return jspb2.Message.setProto3FloatField(this, 1, value);
      };
      proto.Position.prototype.getY = function() {
        return (
          /** @type {number} */
          jspb2.Message.getFloatingPointFieldWithDefault(this, 2, 0)
        );
      };
      proto.Position.prototype.setY = function(value) {
        return jspb2.Message.setProto3FloatField(this, 2, value);
      };
      if (jspb2.Message.GENERATE_TO_OBJECT) {
        proto.Player.prototype.toObject = function(opt_includeInstance) {
          return proto.Player.toObject(opt_includeInstance, this);
        };
        proto.Player.toObject = function(includeInstance, msg) {
          var f2, obj = {
            id: jspb2.Message.getFieldWithDefault(msg, 1, 0),
            speed: jspb2.Message.getFloatingPointFieldWithDefault(msg, 2, 0),
            position: (f2 = msg.getPosition()) && proto.Position.toObject(includeInstance, f2),
            size: jspb2.Message.getFloatingPointFieldWithDefault(msg, 4, 0),
            life: jspb2.Message.getFieldWithDefault(msg, 5, 0)
          };
          if (includeInstance) {
            obj.$jspbMessageInstance = msg;
          }
          return obj;
        };
      }
      proto.Player.deserializeBinary = function(bytes) {
        var reader = new jspb2.BinaryReader(bytes);
        var msg = new proto.Player();
        return proto.Player.deserializeBinaryFromReader(msg, reader);
      };
      proto.Player.deserializeBinaryFromReader = function(msg, reader) {
        while (reader.nextField()) {
          if (reader.isEndGroup()) {
            break;
          }
          var field = reader.getFieldNumber();
          switch (field) {
            case 1:
              var value = (
                /** @type {number} */
                reader.readUint64()
              );
              msg.setId(value);
              break;
            case 2:
              var value = (
                /** @type {number} */
                reader.readFloat()
              );
              msg.setSpeed(value);
              break;
            case 3:
              var value = new proto.Position();
              reader.readMessage(value, proto.Position.deserializeBinaryFromReader);
              msg.setPosition(value);
              break;
            case 4:
              var value = (
                /** @type {number} */
                reader.readFloat()
              );
              msg.setSize(value);
              break;
            case 5:
              var value = (
                /** @type {number} */
                reader.readUint64()
              );
              msg.setLife(value);
              break;
            default:
              reader.skipField();
              break;
          }
        }
        return msg;
      };
      proto.Player.prototype.serializeBinary = function() {
        var writer = new jspb2.BinaryWriter();
        proto.Player.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
      };
      proto.Player.serializeBinaryToWriter = function(message, writer) {
        var f2 = void 0;
        f2 = message.getId();
        if (f2 !== 0) {
          writer.writeUint64(
            1,
            f2
          );
        }
        f2 = message.getSpeed();
        if (f2 !== 0) {
          writer.writeFloat(
            2,
            f2
          );
        }
        f2 = message.getPosition();
        if (f2 != null) {
          writer.writeMessage(
            3,
            f2,
            proto.Position.serializeBinaryToWriter
          );
        }
        f2 = message.getSize();
        if (f2 !== 0) {
          writer.writeFloat(
            4,
            f2
          );
        }
        f2 = message.getLife();
        if (f2 !== 0) {
          writer.writeUint64(
            5,
            f2
          );
        }
      };
      proto.Player.prototype.getId = function() {
        return (
          /** @type {number} */
          jspb2.Message.getFieldWithDefault(this, 1, 0)
        );
      };
      proto.Player.prototype.setId = function(value) {
        return jspb2.Message.setProto3IntField(this, 1, value);
      };
      proto.Player.prototype.getSpeed = function() {
        return (
          /** @type {number} */
          jspb2.Message.getFloatingPointFieldWithDefault(this, 2, 0)
        );
      };
      proto.Player.prototype.setSpeed = function(value) {
        return jspb2.Message.setProto3FloatField(this, 2, value);
      };
      proto.Player.prototype.getPosition = function() {
        return (
          /** @type{?proto.Position} */
          jspb2.Message.getWrapperField(this, proto.Position, 3)
        );
      };
      proto.Player.prototype.setPosition = function(value) {
        return jspb2.Message.setWrapperField(this, 3, value);
      };
      proto.Player.prototype.clearPosition = function() {
        return this.setPosition(void 0);
      };
      proto.Player.prototype.hasPosition = function() {
        return jspb2.Message.getField(this, 3) != null;
      };
      proto.Player.prototype.getSize = function() {
        return (
          /** @type {number} */
          jspb2.Message.getFloatingPointFieldWithDefault(this, 4, 0)
        );
      };
      proto.Player.prototype.setSize = function(value) {
        return jspb2.Message.setProto3FloatField(this, 4, value);
      };
      proto.Player.prototype.getLife = function() {
        return (
          /** @type {number} */
          jspb2.Message.getFieldWithDefault(this, 5, 0)
        );
      };
      proto.Player.prototype.setLife = function(value) {
        return jspb2.Message.setProto3IntField(this, 5, value);
      };
      if (jspb2.Message.GENERATE_TO_OBJECT) {
        proto.GameState.prototype.toObject = function(opt_includeInstance) {
          return proto.GameState.toObject(opt_includeInstance, this);
        };
        proto.GameState.toObject = function(includeInstance, msg) {
          var f2, obj = {
            playersMap: (f2 = msg.getPlayersMap()) ? f2.toObject(includeInstance, proto.Player.toObject) : []
          };
          if (includeInstance) {
            obj.$jspbMessageInstance = msg;
          }
          return obj;
        };
      }
      proto.GameState.deserializeBinary = function(bytes) {
        var reader = new jspb2.BinaryReader(bytes);
        var msg = new proto.GameState();
        return proto.GameState.deserializeBinaryFromReader(msg, reader);
      };
      proto.GameState.deserializeBinaryFromReader = function(msg, reader) {
        while (reader.nextField()) {
          if (reader.isEndGroup()) {
            break;
          }
          var field = reader.getFieldNumber();
          switch (field) {
            case 1:
              var value = msg.getPlayersMap();
              reader.readMessage(value, function(message, reader2) {
                jspb2.Map.deserializeBinary(message, reader2, jspb2.BinaryReader.prototype.readUint64, jspb2.BinaryReader.prototype.readMessage, proto.Player.deserializeBinaryFromReader, 0, new proto.Player());
              });
              break;
            default:
              reader.skipField();
              break;
          }
        }
        return msg;
      };
      proto.GameState.prototype.serializeBinary = function() {
        var writer = new jspb2.BinaryWriter();
        proto.GameState.serializeBinaryToWriter(this, writer);
        return writer.getResultBuffer();
      };
      proto.GameState.serializeBinaryToWriter = function(message, writer) {
        var f2 = void 0;
        f2 = message.getPlayersMap(true);
        if (f2 && f2.getLength() > 0) {
          f2.serializeBinary(1, writer, jspb2.BinaryWriter.prototype.writeUint64, jspb2.BinaryWriter.prototype.writeMessage, proto.Player.serializeBinaryToWriter);
        }
      };
      proto.GameState.prototype.getPlayersMap = function(opt_noLazyCreate) {
        return (
          /** @type {!jspb.Map<number,!proto.Player>} */
          jspb2.Message.getMapField(
            this,
            1,
            opt_noLazyCreate,
            proto.Player
          )
        );
      };
      proto.GameState.prototype.clearPlayersMap = function() {
        this.getPlayersMap().clear();
        return this;
      };
      goog2.object.extend(exports2, proto);
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event2, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event2, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), submit = document.createElement("input"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "none";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      submit.type = "submit";
      form.appendChild(submit);
      submit.click();
    }
    window.addEventListener("click", function(e2) {
      var element = e2.target;
      if (e2.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e2.preventDefault();
          e2.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method")) {
          handleClick(element, e2.metaKey || e2.shiftKey);
          e2.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e2) {
      var message = e2.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e2.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global2 = globalSelf || phxWindow || global2;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event2, payload, timeout) {
      this.channel = channel;
      this.event = event2;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    /**
     *
     * @param {number} timeout
     */
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    /**
     *
     */
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    /**
     *
     * @param {*} status
     * @param {*} callback
     */
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    /**
     * @private
     */
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    /**
     * @private
     */
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    /**
     * @private
     */
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    /**
     * @private
     */
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    /**
     * @private
     */
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    /**
     * @private
     */
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    /**
     * @private
     */
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    /**
     * Cancels any previous scheduleTimeout and schedules callback
     */
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(
        this.socket.onOpen(() => {
          this.rejoinTimer.reset();
          if (this.isErrored()) {
            this.rejoin();
          }
        })
      );
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    /**
     * Join the channel
     * @param {integer} timeout
     * @returns {Push}
     */
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    /**
     * Hook into channel close
     * @param {Function} callback
     */
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    /**
     * Hook into channel errors
     * @param {Function} callback
     */
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    /**
     * Subscribes on channel events
     *
     * Subscription returns a ref counter, which can be used later to
     * unsubscribe the exact event listener
     *
     * @example
     * const ref1 = channel.on("event", do_stuff)
     * const ref2 = channel.on("event", do_other_stuff)
     * channel.off("event", ref1)
     * // Since unsubscription, do_stuff won't fire,
     * // while do_other_stuff will keep firing on the "event"
     *
     * @param {string} event
     * @param {Function} callback
     * @returns {integer} ref
     */
    on(event2, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event: event2, ref, callback });
      return ref;
    }
    /**
     * Unsubscribes off of channel events
     *
     * Use the ref returned from a channel.on() to unsubscribe one
     * handler, or pass nothing for the ref to unsubscribe all
     * handlers for the given event.
     *
     * @example
     * // Unsubscribe the do_stuff handler
     * const ref1 = channel.on("event", do_stuff)
     * channel.off("event", ref1)
     *
     * // Unsubscribe all handlers from event
     * channel.off("event")
     *
     * @param {string} event
     * @param {integer} ref
     */
    off(event2, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event2 && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    /**
     * @private
     */
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    /**
     * Sends a message `event` to phoenix with the payload `payload`.
     * Phoenix receives this in the `handle_in(event, payload, socket)`
     * function. if phoenix replies or it times out (default 10000ms),
     * then optionally the reply can be received.
     *
     * @example
     * channel.push("event")
     *   .receive("ok", payload => console.log("phoenix replied:", payload))
     *   .receive("error", err => console.log("phoenix errored", err))
     *   .receive("timeout", () => console.log("timed out pushing"))
     * @param {string} event
     * @param {Object} payload
     * @param {number} [timeout]
     * @returns {Push}
     */
    push(event2, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event2}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event2, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    /** Leaves the channel
     *
     * Unsubscribes from server events, and
     * instructs channel to terminate on server
     *
     * Triggers onClose() hooks
     *
     * To receive leave acknowledgements, use the `receive`
     * hook to bind to the server ack, ie:
     *
     * @example
     * channel.leave().receive("ok", () => alert("left!") )
     *
     * @param {integer} timeout
     * @returns {Push}
     */
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling
     * before dispatching to the channel callbacks.
     *
     * Must return the payload, modified or unmodified
     * @param {string} event
     * @param {Object} payload
     * @param {integer} ref
     * @returns {Object}
     */
    onMessage(_event, payload, _ref) {
      return payload;
    }
    /**
     * @private
     */
    isMember(topic, event2, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event: event2, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    /**
     * @private
     */
    joinRef() {
      return this.joinPush.ref;
    }
    /**
     * @private
     */
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    /**
     * @private
     */
    trigger(event2, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event2, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event2);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    /**
     * @private
     */
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    /**
     * @private
     */
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    /**
     * @private
     */
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    /**
     * @private
     */
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    /**
     * @private
     */
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    /**
     * @private
     */
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global2.XDomainRequest) {
        let req = new global2.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global2.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e2) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages: messages2 } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages2.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    // we collect all pushes within the current event loop by
    // setTimeout 0, which optimizes back-to-back procedural
    // pushes against an empty buffer
    send(body) {
      if (typeof body !== "string") {
        body = arrayBufferToBase64(body);
      }
      if (this.currentBatch) {
        this.currentBatch.push(body);
      } else if (this.awaitingBatchAck) {
        this.batchBuffer.push(body);
      } else {
        this.currentBatch = [body];
        this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch);
          this.currentBatch = null;
        }, 0);
      }
    }
    batchSend(messages2) {
      this.awaitingBatchAck = true;
      this.ajax("POST", "application/x-ndjson", messages2.join("\n"), () => this.onerror("timeout"), (resp) => {
        this.awaitingBatchAck = false;
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        } else if (this.batchBuffer.length > 0) {
          this.batchSend(this.batchBuffer);
          this.batchBuffer = [];
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      this.batchBuffer = [];
      clearTimeout(this.currentBatchTimer);
      this.currentBatchTimer = null;
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, contentType, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event2, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event: event2, payload });
      }
    },
    // private
    binaryEncode(message) {
      let { join_ref, ref, event: event2, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event2.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event2.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event2, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event2 = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event: event2, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event2 = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event2, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event2 = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event: event2, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global2.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    /**
     * Returns the LongPoll transport reference
     */
    getLongPollTransport() {
      return LongPoll;
    }
    /**
     * Disconnects and replaces the active transport
     *
     * @param {Function} newTransport - The new transport class to instantiate
     *
     */
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    /**
     * Returns the socket protocol
     *
     * @returns {string}
     */
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    /**
     * The fully qualified socket url
     *
     * @returns {string}
     */
    endPointURL() {
      let uri = Ajax.appendParams(
        Ajax.appendParams(this.endPoint, this.params()),
        { vsn: this.vsn }
      );
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    /**
     * Disconnects the socket
     *
     * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
     *
     * @param {Function} callback - Optional callback which is called after socket is disconnected.
     * @param {integer} code - A status code for disconnection (Optional).
     * @param {string} reason - A textual description of the reason to disconnect. (Optional)
     */
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    /**
     *
     * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
     *
     * Passing params to connect is deprecated; pass them in the Socket constructor instead:
     * `new Socket("/socket", {params: {user_id: userToken}})`.
     */
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event2) => this.onConnMessage(event2);
      this.conn.onclose = (event2) => this.onConnClose(event2);
    }
    /**
     * Logs the message. Override `this.logger` for specialized logging. noops by default
     * @param {string} kind
     * @param {string} msg
     * @param {Object} data
     */
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    /**
     * Returns true if a logger has been set on this socket.
     */
    hasLogger() {
      return this.logger !== null;
    }
    /**
     * Registers callbacks for connection open events
     *
     * @example socket.onOpen(function(){ console.info("the socket was opened") })
     *
     * @param {Function} callback
     */
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection close events
     * @param {Function} callback
     */
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection error events
     *
     * @example socket.onError(function(error){ alert("An error occurred") })
     *
     * @param {Function} callback
     */
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection message events
     * @param {Function} callback
     */
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    /**
     * Pings the server and invokes the callback with the RTT in milliseconds
     * @param {Function} callback
     *
     * Returns true if the ping was pushed or false if unable to be pushed.
     */
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    /**
     * @private
     */
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    /**
     * @private
     */
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event2) {
      let closeCode = event2 && event2.code;
      if (this.hasLogger())
        this.log("transport", "close", event2);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event2));
    }
    /**
     * @private
     */
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    /**
     * @private
     */
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    /**
     * @returns {string}
     */
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    /**
     * @returns {boolean}
     */
    isConnected() {
      return this.connectionState() === "open";
    }
    /**
     * @private
     *
     * @param {Channel}
     */
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c2) => c2.joinRef() !== channel.joinRef());
    }
    /**
     * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
     *
     * @param {refs} - list of refs returned by calls to
     *                 `onOpen`, `onClose`, `onError,` and `onMessage`
     */
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    /**
     * Initiates a new channel for the given topic
     *
     * @param {string} topic
     * @param {Object} chanParams - Parameters for the channel
     * @returns {Channel}
     */
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    /**
     * @param {Object} data
     */
    push(data) {
      if (this.hasLogger()) {
        let { topic, event: event2, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event2} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    /**
     * Return the next message ref, accounting for overflows
     * @returns {string}
     */
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event: event2, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event2} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event2, payload, join_ref)) {
            continue;
          }
          channel.trigger(event2, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c2) => c2.topic === topic && (c2.isJoined() || c2.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF = "data-phx-ref";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_MAGIC_ID = "data-phx-id";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_PAGE_LOADING = "page-loading";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_LOADING_CLASS = "phx-loading";
  var PHX_NO_FEEDBACK_CLASS = "phx-no-feedback";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_CLIENT_ERROR_CLASS = "phx-client-error";
  var PHX_SERVER_ERROR_CLASS = "phx-server-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_VIEWPORT_TOP = "viewport-top";
  var PHX_VIEWPORT_BOTTOM = "viewport-bottom";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_FEEDBACK_FOR = "feedback-for";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_STREAM = "stream";
  var PHX_STREAM_REF = "data-phx-stream";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_PROGRESS = "progress";
  var PHX_MOUNTED = "mounted";
  var LOADER_TIMEOUT = 1;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var DYNAMICS = "d";
  var STATIC = "s";
  var ROOT = "r";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var STREAM = "stream";
  var EntryUploader = class {
    constructor(entry, chunkSize, liveSocket2) {
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunkSize;
      this.chunkTimer = null;
      this.errored = false;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      if (this.errored) {
        return;
      }
      this.uploadChannel.leave();
      this.errored = true;
      clearTimeout(this.chunkTimer);
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e2) => {
        if (e2.target.error === null) {
          this.offset += e2.target.result.byteLength;
          this.pushChunk(e2.target.result);
        } else {
          return logError("Read error: " + e2.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      }).receive("error", ({ reason }) => this.error(reason));
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => {
    let type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    let ids = /* @__PURE__ */ new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`) && !el.disabled) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config.chunk_size, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          let hashEl = this.getHashTargetEl(window.location.hash);
          if (hashEl) {
            hashEl.scrollIntoView();
          } else if (meta.type === "redirect") {
            window.scroll(0, 0);
          }
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value) {
      document.cookie = `${name}=${value}`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    redirect(toURL, flash) {
      if (flash) {
        Browser.setCookie("__phoenix_flash__", flash + "; max-age=60000; path=/");
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    isAutoUpload(inputEl) {
      return inputEl.hasAttribute("data-phx-auto-upload");
    },
    findUploadInputs(node) {
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    wantsNewTab(e2) {
      let wantsNewTab = e2.ctrlKey || e2.shiftKey || e2.metaKey || e2.button && e2.button === 1;
      let isDownload = e2.target instanceof HTMLAnchorElement && e2.target.hasAttribute("download");
      let isTargetBlank = e2.target.hasAttribute("target") && e2.target.getAttribute("target").toLowerCase() === "_blank";
      return wantsNewTab || isTargetBlank || isDownload;
    },
    isUnloadableFormSubmit(e2) {
      let isDialogSubmit = e2.target && e2.target.getAttribute("method") === "dialog" || e2.submitter && e2.submitter.getAttribute("formmethod") === "dialog";
      if (isDialogSubmit) {
        return false;
      } else {
        return !e2.defaultPrevented && !this.wantsNewTab(e2);
      }
    },
    isNewPageClick(e2, currentLocation) {
      let href = e2.target instanceof HTMLAnchorElement ? e2.target.getAttribute("href") : null;
      let url;
      if (e2.defaultPrevented || href === null || this.wantsNewTab(e2)) {
        return false;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
      }
      if (e2.target.isContentEditable) {
        return false;
      }
      try {
        url = new URL(href);
      } catch (e22) {
        try {
          url = new URL(href, currentLocation);
        } catch (e3) {
          return true;
        }
      }
      if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
        if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
          return url.hash === "" && !url.href.endsWith("#");
        }
      }
      return url.protocol.startsWith("http");
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findParentCIDs(node, cids) {
      let initial = new Set(cids);
      let parentCids = cids.reduce((acc, cid) => {
        let selector = `[${PHX_COMPONENT}="${cid}"] [${PHX_COMPONENT}]`;
        this.filterWithinSameLiveView(this.all(node, selector), node).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => acc.delete(childCID));
        return acc;
      }, initial);
      return parentCids.size === 0 ? new Set(cids) : parentCids;
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      let existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      if (titleEl) {
        let { prefix, suffix } = titleEl.dataset;
        document.title = `${prefix || ""}${str}${suffix || ""}`;
      } else {
        document.title = str;
      }
    },
    debounce(el, event2, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      let value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => callback());
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event2.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event2.key);
              newKeyDown = prevKey !== event2.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              this.putPrivate(el, THROTTLED, true);
              setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => this.triggerCycle(el, DEBOUNCE_TRIGGER));
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      let [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    maybeAddPrivateHooks(el, phxViewportTop, phxViewportBottom) {
      if (el.hasAttribute && (el.hasAttribute(phxViewportTop) || el.hasAttribute(phxViewportBottom))) {
        el.setAttribute("data-phx-hook", "Phoenix.InfiniteScroll");
      }
    },
    maybeHideFeedback(container, inputs, phxFeedbackFor) {
      let feedbacks = [];
      inputs.forEach((input) => {
        if (!(this.private(input, PHX_HAS_FOCUSED) || this.private(input, PHX_HAS_SUBMITTED))) {
          feedbacks.push(input.name);
          if (input.name.endsWith("[]")) {
            feedbacks.push(input.name.slice(0, -2));
          }
        }
      });
      if (feedbacks.length > 0) {
        let selector = feedbacks.map((f2) => `[${phxFeedbackFor}="${f2}"]`).join(", ");
        DOM.all(container, selector, (el) => el.classList.add(PHX_NO_FEEDBACK_CLASS));
      }
    },
    resetForm(form, phxFeedbackFor) {
      Array.from(form.elements).forEach((input) => {
        let query = `[${phxFeedbackFor}="${input.id}"],
                   [${phxFeedbackFor}="${input.name}"],
                   [${phxFeedbackFor}="${input.name.replace(/\[\]$/, "")}"]`;
        this.deletePrivate(input, PHX_HAS_FOCUSED);
        this.deletePrivate(input, PHX_HAS_SUBMITTED);
        this.all(document, query, (feedbackEl) => {
          feedbackEl.classList.add(PHX_NO_FEEDBACK_CLASS);
        });
      });
    },
    showError(inputEl, phxFeedbackFor) {
      if (inputEl.id || inputEl.name) {
        this.all(inputEl.form, `[${phxFeedbackFor}="${inputEl.id}"], [${phxFeedbackFor}="${inputEl.name}"]`, (el) => {
          this.removeClass(el, PHX_NO_FEEDBACK_CLASS);
        });
      }
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    dispatchEvent(target, name, opts = {}) {
      let bubbles = opts.bubbles === void 0 ? true : !!opts.bubbles;
      let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
      let event2 = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event2);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    mergeAttrs(target, source, opts = {}) {
      let exclude = opts.exclude || [];
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        let name = sourceAttrs[i].name;
        if (exclude.indexOf(name) < 0) {
          target.setAttribute(name, source.getAttribute(name));
        }
      }
      let targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        let name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (focused.readOnly) {
        focused.blur();
      }
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null;
    },
    syncPendingRef(fromEl, toEl, disableWith) {
      let ref = fromEl.getAttribute(PHX_REF);
      if (ref === null) {
        return true;
      }
      let refSrc = fromEl.getAttribute(PHX_REF_SRC);
      if (DOM.isFormInput(fromEl) || fromEl.getAttribute(disableWith) !== null) {
        if (DOM.isUploadInput(fromEl)) {
          DOM.mergeAttrs(fromEl, toEl, { isIgnored: true });
        }
        DOM.putPrivate(fromEl, PHX_REF, toEl);
        return false;
      } else {
        PHX_EVENT_CLASSES.forEach((className) => {
          fromEl.classList.contains(className) && toEl.classList.add(className);
        });
        toEl.setAttribute(PHX_REF, ref);
        toEl.setAttribute(PHX_REF_SRC, refSrc);
        return true;
      }
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = /* @__PURE__ */ new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        let [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      let stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        let existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      let ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    constructor(fileEl, file, view) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    cancel() {
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      if (!dom_default.isAutoUpload(this.fileEl)) {
        LiveUploader.clearFiles(this.fileEl);
      }
    }
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        relative_path: this.file.webkitRelativePath,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref,
        meta: typeof this.file.meta === "function" ? this.file.meta() : void 0
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.last_modified = file.lastModified;
        entry.name = file.name || entry.ref;
        entry.relative_path = file.webkitRelativePath;
        entry.type = file.type;
        entry.size = file.size;
        if (typeof file.meta === "function") {
          entry.meta = file.meta();
        }
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f2) => !Object.is(f2, file)));
    }
    static trackFiles(inputEl, files, dataTransfer) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f2) => Object.is(f2, file)));
        dom_default.putPrivate(inputEl, "files", this.activeFiles(inputEl).concat(newFiles));
        inputEl.value = null;
      } else {
        if (dataTransfer && dataTransfer.files.length > 0) {
          inputEl.files = dataTransfer.files;
        }
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f2) => UploadEntry.isActive(input, f2));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f2) => !UploadEntry.isPreflighted(input, f2));
    }
    constructor(inputEl, view, onComplete) {
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view));
      this.numEntriesInProgress = this._entries.length;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        entry.zipPostFlight(resp);
        entry.onDone(() => {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        });
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        if (!entry.meta) {
          return acc;
        }
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var ARIA = {
    focusMain() {
      let target = document.querySelector("main h1, main, h1");
      if (target) {
        let origTabIndex = target.tabIndex;
        target.tabIndex = -1;
        target.focus();
        target.tabIndex = origTabIndex;
      }
    },
    anyOf(instance, classes) {
      return classes.find((name) => instance instanceof name);
    },
    isFocusable(el, interactiveOnly) {
      return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !el.disabled && this.anyOf(el, [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLButtonElement]) || el instanceof HTMLIFrameElement || (el.tabIndex > 0 || !interactiveOnly && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true");
    },
    attemptFocus(el, interactiveOnly) {
      if (this.isFocusable(el, interactiveOnly)) {
        try {
          el.focus();
        } catch (e2) {
        }
      }
      return !!document.activeElement && document.activeElement.isSameNode(el);
    },
    focusFirstInteractive(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child, true) || this.focusFirstInteractive(child, true)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusFirst(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusFirst(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusLast(el) {
      let child = el.lastElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusLast(child)) {
          return true;
        }
        child = child.previousElementSibling;
      }
    }
  };
  var aria_default = ARIA;
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view.cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    },
    FocusWrap: {
      mounted() {
        this.focusStart = this.el.firstElementChild;
        this.focusEnd = this.el.lastElementChild;
        this.focusStart.addEventListener("focus", () => aria_default.focusLast(this.el));
        this.focusEnd.addEventListener("focus", () => aria_default.focusFirst(this.el));
        this.el.addEventListener("phx:show-end", () => this.el.focus());
        if (window.getComputedStyle(this.el).display !== "none") {
          aria_default.focusFirst(this.el);
        }
      }
    }
  };
  var scrollTop = () => document.documentElement.scrollTop || document.body.scrollTop;
  var winHeight = () => window.innerHeight || document.documentElement.clientHeight;
  var isAtViewportTop = (el) => {
    let rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.top <= winHeight();
  };
  var isAtViewportBottom = (el) => {
    let rect = el.getBoundingClientRect();
    return rect.right >= 0 && rect.left >= 0 && rect.bottom <= winHeight();
  };
  var isWithinViewport = (el) => {
    let rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.top <= winHeight();
  };
  Hooks.InfiniteScroll = {
    mounted() {
      let scrollBefore = scrollTop();
      let topOverran = false;
      let throttleInterval = 500;
      let pendingOp = null;
      let onTopOverrun = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => true;
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id, _overran: true }, () => {
          pendingOp = null;
        });
      });
      let onFirstChildAtTop = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => firstChild.scrollIntoView({ block: "start" });
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id }, () => {
          pendingOp = null;
          if (!isWithinViewport(firstChild)) {
            firstChild.scrollIntoView({ block: "start" });
          }
        });
      });
      let onLastChildAtBottom = this.throttle(throttleInterval, (bottomEvent, lastChild) => {
        pendingOp = () => lastChild.scrollIntoView({ block: "end" });
        this.liveSocket.execJSHookPush(this.el, bottomEvent, { id: lastChild.id }, () => {
          pendingOp = null;
          if (!isWithinViewport(lastChild)) {
            lastChild.scrollIntoView({ block: "end" });
          }
        });
      });
      this.onScroll = (e2) => {
        let scrollNow = scrollTop();
        if (pendingOp) {
          scrollBefore = scrollNow;
          return pendingOp();
        }
        let rect = this.el.getBoundingClientRect();
        let topEvent = this.el.getAttribute(this.liveSocket.binding("viewport-top"));
        let bottomEvent = this.el.getAttribute(this.liveSocket.binding("viewport-bottom"));
        let lastChild = this.el.lastElementChild;
        let firstChild = this.el.firstElementChild;
        let isScrollingUp = scrollNow < scrollBefore;
        let isScrollingDown = scrollNow > scrollBefore;
        if (isScrollingUp && topEvent && !topOverran && rect.top >= 0) {
          topOverran = true;
          onTopOverrun(topEvent, firstChild);
        } else if (isScrollingDown && topOverran && rect.top <= 0) {
          topOverran = false;
        }
        if (topEvent && isScrollingUp && isAtViewportTop(firstChild)) {
          onFirstChildAtTop(topEvent, firstChild);
        } else if (bottomEvent && isScrollingDown && isAtViewportBottom(lastChild)) {
          onLastChildAtBottom(bottomEvent, lastChild);
        }
        scrollBefore = scrollNow;
      };
      window.addEventListener("scroll", this.onScroll);
    },
    destroyed() {
      window.removeEventListener("scroll", this.onScroll);
    },
    throttle(interval, callback) {
      let lastCallAt = 0;
      let timer;
      return (...args) => {
        let now = Date.now();
        let remainingTime = interval - (now - lastCallAt);
        if (remainingTime <= 0 || remainingTime > interval) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          lastCallAt = now;
          callback(...args);
        } else if (!timer) {
          timer = setTimeout(() => {
            lastCallAt = Date.now();
            timer = null;
            callback(...args);
          }, remainingTime);
        }
      };
    }
  };
  var hooks_default = Hooks;
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = /* @__PURE__ */ new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d2 = fromNodeAttrs.length - 1; d2 >= 0; d2--) {
      attr = fromNodeAttrs[d2];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
        toNode = toNode.firstElementChild;
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var skipFromChildren = options.skipFromChildren || noop;
      var addChild = options.addChild || function(parent, child) {
        return parent.appendChild(child);
      };
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = /* @__PURE__ */ Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(curFromNodeChild, fromEl, true);
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          if (onBeforeElUpdated(fromEl, toEl) === false) {
            return;
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var skipFrom = skipFromChildren(fromEl, toEl);
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (!skipFrom && curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(curFromNodeChild, fromEl, true);
                          }
                          curFromNodeChild = matchingFromEl;
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(curFromNodeChild, fromEl, true);
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              if (!skipFrom) {
                addChild(fromEl, matchingFromEl);
              }
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                addChild(fromEl, curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    static patchEl(fromEl, toEl, activeElement) {
      morphdom_esm_default(fromEl, toEl, {
        childrenOnly: false,
        onBeforeElUpdated: (fromEl2, toEl2) => {
          if (activeElement && activeElement.isSameNode(fromEl2) && dom_default.isFormInput(fromEl2)) {
            dom_default.mergeFocusedInput(fromEl2, toEl2);
            return false;
          }
        }
      });
    }
    constructor(view, container, id, html, streams, targetCID) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.streams = streams;
      this.streamInserts = {};
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.pendingRemoves = [];
      this.phxRemove = this.liveSocket.binding("remove");
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: [],
        aftertransitionsDiscarded: []
      };
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      let phxUpdate = this.liveSocket.binding(PHX_UPDATE);
      dom_default.all(this.container, `[${phxUpdate}=${PHX_STREAM}]`, (el) => el.innerHTML = "");
      dom_default.all(this.container, `[${phxUpdate}=append] > *, [${phxUpdate}=prepend] > *`, (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform(isJoinPatch) {
      let { view, liveSocket: liveSocket2, container, html } = this;
      let targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxFeedbackFor = liveSocket2.binding(PHX_FEEDBACK_FOR);
      let disableWith = liveSocket2.binding(PHX_DISABLE_WITH);
      let phxViewportTop = liveSocket2.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = liveSocket2.binding(PHX_VIEWPORT_BOTTOM);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let added = [];
      let trackedInputs = [];
      let updates = [];
      let appendPrependUpdates = [];
      let externalFormTriggered = null;
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        this.streams.forEach(([ref, inserts, deleteIds, reset]) => {
          Object.entries(inserts).forEach(([key, [streamAt, limit]]) => {
            this.streamInserts[key] = { ref, streamAt, limit, resetKept: false };
          });
          if (reset !== void 0) {
            dom_default.all(container, `[${PHX_STREAM_REF}="${ref}"]`, (child) => {
              if (inserts[child.id]) {
                this.streamInserts[child.id].resetKept = true;
              } else {
                this.removeStreamChildElement(child);
              }
            });
          }
          deleteIds.forEach((id) => {
            let child = container.querySelector(`[id="${id}"]`);
            if (child) {
              this.removeStreamChildElement(child);
            }
          });
        });
        morphdom_esm_default(targetContainer, html, {
          childrenOnly: targetContainer.getAttribute(PHX_COMPONENT) === null,
          getNodeKey: (node) => {
            if (dom_default.isPhxDestroyed(node)) {
              return null;
            }
            if (isJoinPatch) {
              return node.id;
            }
            return node.id || node.getAttribute && node.getAttribute(PHX_MAGIC_ID);
          },
          skipFromChildren: (from) => {
            return from.getAttribute(phxUpdate) === PHX_STREAM;
          },
          addChild: (parent, child) => {
            let { ref, streamAt, limit } = this.getStreamInsert(child);
            if (ref === void 0) {
              return parent.appendChild(child);
            }
            dom_default.putSticky(child, PHX_STREAM_REF, (el) => el.setAttribute(PHX_STREAM_REF, ref));
            if (streamAt === 0) {
              parent.insertAdjacentElement("afterbegin", child);
            } else if (streamAt === -1) {
              parent.appendChild(child);
            } else if (streamAt > 0) {
              let sibling = Array.from(parent.children)[streamAt];
              parent.insertBefore(child, sibling);
            }
            let children = limit !== null && Array.from(parent.children);
            let childrenToRemove = [];
            if (limit && limit < 0 && children.length > limit * -1) {
              childrenToRemove = children.slice(0, children.length + limit);
            } else if (limit && limit >= 0 && children.length > limit) {
              childrenToRemove = children.slice(limit);
            }
            childrenToRemove.forEach((removeChild) => {
              if (!this.streamInserts[removeChild.id]) {
                this.removeStreamChildElement(removeChild);
              }
            });
          },
          onBeforeNodeAdded: (el) => {
            dom_default.maybeAddPrivateHooks(el, phxViewportTop, phxViewportBottom);
            this.trackBefore("added", el);
            return el;
          },
          onNodeAdded: (el) => {
            if (el.getAttribute) {
              this.maybeReOrderStream(el);
            }
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            if (el.getAttribute && el.getAttribute("name") && dom_default.isFormInput(el)) {
              trackedInputs.push(el);
            }
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onBeforeElChildrenUpdated: (fromEl, toEl) => {
            if (fromEl.getAttribute(phxUpdate) === PHX_STREAM) {
              let toIds = Array.from(toEl.children).map((child) => child.id);
              Array.from(fromEl.children).filter((child) => {
                let { resetKept } = this.getStreamInsert(child);
                return resetKept;
              }).sort((a2, b2) => {
                let aIdx = toIds.indexOf(a2.id);
                let bIdx = toIds.indexOf(b2.id);
                if (aIdx === bIdx) {
                  return 0;
                } else if (aIdx < bIdx) {
                  return -1;
                } else {
                  return 1;
                }
              }).forEach((child) => fromEl.appendChild(child));
            }
          },
          onNodeDiscarded: (el) => this.onNodeDiscarded(el),
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentElement !== null && el.id && dom_default.isPhxUpdate(el.parentElement, phxUpdate, [PHX_STREAM, "append", "prepend"])) {
              return false;
            }
            if (this.maybePendingRemove(el)) {
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
            this.maybeReOrderStream(el);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.maybeAddPrivateHooks(toEl, phxViewportTop, phxViewportBottom);
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            if (!dom_default.syncPendingRef(fromEl, toEl, disableWith)) {
              if (dom_default.isUploadInput(fromEl)) {
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            if (isFocusedFormEl && fromEl.type !== "hidden") {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              trackedInputs.push(fromEl);
              return false;
            } else {
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              if (toEl.getAttribute("name") && dom_default.isFormInput(toEl)) {
                trackedInputs.push(toEl);
              }
              this.trackBefore("updated", fromEl, toEl);
              return true;
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      dom_default.maybeHideFeedback(targetContainer, trackedInputs, phxFeedbackFor);
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      this.transitionPendingRemoves();
      if (externalFormTriggered) {
        liveSocket2.unload();
        Object.getPrototypeOf(externalFormTriggered).submit.call(externalFormTriggered);
      }
      return true;
    }
    onNodeDiscarded(el) {
      if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
        this.liveSocket.destroyViewByEl(el);
      }
      this.trackAfter("discarded", el);
    }
    maybePendingRemove(node) {
      if (node.getAttribute && node.getAttribute(this.phxRemove) !== null) {
        this.pendingRemoves.push(node);
        return true;
      } else {
        return false;
      }
    }
    removeStreamChildElement(child) {
      if (!this.maybePendingRemove(child)) {
        child.remove();
        this.onNodeDiscarded(child);
      }
    }
    getStreamInsert(el) {
      let insert = el.id ? this.streamInserts[el.id] : {};
      return insert || {};
    }
    maybeReOrderStream(el) {
      let { ref, streamAt, limit } = this.getStreamInsert(el);
      if (streamAt === void 0) {
        return;
      }
      dom_default.putSticky(el, PHX_STREAM_REF, (el2) => el2.setAttribute(PHX_STREAM_REF, ref));
      if (streamAt === 0) {
        el.parentElement.insertBefore(el, el.parentElement.firstElementChild);
      } else if (streamAt > 0) {
        let children = Array.from(el.parentElement.children);
        let oldIndex = children.indexOf(el);
        if (streamAt >= children.length - 1) {
          el.parentElement.appendChild(el);
        } else {
          let sibling = children[streamAt];
          if (oldIndex > streamAt) {
            el.parentElement.insertBefore(el, sibling);
          } else {
            el.parentElement.insertBefore(el, sibling.nextElementSibling);
          }
        }
      }
    }
    transitionPendingRemoves() {
      let { pendingRemoves, liveSocket: liveSocket2 } = this;
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves);
        liveSocket2.requestDOMUpdate(() => {
          pendingRemoves.forEach((el) => {
            let child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfter("transitionsDiscarded", pendingRemoves);
        });
      }
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.hasAttribute(PHX_SKIP);
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    indexOf(parent, child) {
      return Array.from(parent.children).indexOf(child);
    }
  };
  var VOID_TAGS = /* @__PURE__ */ new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  var endingTagNameChars = /* @__PURE__ */ new Set([">", "/", " ", "\n", "	", "\r"]);
  var quoteChars = /* @__PURE__ */ new Set(["'", '"']);
  var modifyRoot = (html, attrs, clearInnerHTML) => {
    let i = 0;
    let insideComment = false;
    let beforeTag, afterTag, tag, tagNameEndsAt, id, newHTML;
    while (i < html.length) {
      let char = html.charAt(i);
      if (insideComment) {
        if (char === "-" && html.slice(i, i + 3) === "-->") {
          insideComment = false;
          i += 3;
        } else {
          i++;
        }
      } else if (char === "<" && html.slice(i, i + 4) === "<!--") {
        insideComment = true;
        i += 4;
      } else if (char === "<") {
        beforeTag = html.slice(0, i);
        let iAtOpen = i;
        i++;
        for (i; i < html.length; i++) {
          if (endingTagNameChars.has(html.charAt(i))) {
            break;
          }
        }
        tagNameEndsAt = i;
        tag = html.slice(iAtOpen + 1, tagNameEndsAt);
        for (i; i < html.length; i++) {
          if (html.charAt(i) === ">") {
            break;
          }
          if (html.charAt(i) === "=") {
            let isId = html.slice(i - 3, i) === " id";
            i++;
            let char2 = html.charAt(i);
            if (quoteChars.has(char2)) {
              let attrStartsAt = i;
              i++;
              for (i; i < html.length; i++) {
                if (html.charAt(i) === char2) {
                  break;
                }
              }
              if (isId) {
                id = html.slice(attrStartsAt + 1, i);
                break;
              }
            }
          }
        }
        break;
      } else {
        i++;
      }
    }
    if (!tag) {
      throw new Error(`malformed html ${html}`);
    }
    let closeAt = html.length - 1;
    insideComment = false;
    while (closeAt >= beforeTag.length + tag.length) {
      let char = html.charAt(closeAt);
      if (insideComment) {
        if (char === "-" && html.slice(closeAt - 3, closeAt) === "<!-") {
          insideComment = false;
          closeAt -= 4;
        } else {
          closeAt -= 1;
        }
      } else if (char === ">" && html.slice(closeAt - 2, closeAt) === "--") {
        insideComment = true;
        closeAt -= 3;
      } else if (char === ">") {
        break;
      } else {
        closeAt -= 1;
      }
    }
    afterTag = html.slice(closeAt + 1, html.length);
    let attrsStr = Object.keys(attrs).map((attr) => attrs[attr] === true ? attr : `${attr}="${attrs[attr]}"`).join(" ");
    if (clearInnerHTML) {
      let idAttrStr = id ? ` id="${id}"` : "";
      if (VOID_TAGS.has(tag)) {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}/>`;
      } else {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}></${tag}>`;
      }
    } else {
      let rest = html.slice(tagNameEndsAt, closeAt + 1);
      newHTML = `<${tag}${attrsStr === "" ? "" : " "}${attrsStr}${rest}`;
    }
    return [newHTML, beforeTag, afterTag];
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.magicId = 0;
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      let [str, streams] = this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids, true, {});
      return [str, streams];
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids, changeTracking, rootAttrs) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids, streams: /* @__PURE__ */ new Set() };
      this.toOutputBuffer(rendered, null, output, changeTracking, rootAttrs);
      return [output.buffer, output.streams];
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (let cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff, true);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 || oldc[cid] === void 0 ? cdiff : this.cloneMerge(oldc[cid], cdiff, false);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        let isObjVal = isObject(val);
        if (isObjVal && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
      if (target[ROOT]) {
        target.newRender = true;
      }
    }
    cloneMerge(target, source, pruneMagicId) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val, pruneMagicId);
        }
      }
      if (pruneMagicId) {
        delete merged.magicId;
        delete merged.newRender;
      } else if (target[ROOT]) {
        merged.newRender = true;
      }
      return merged;
    }
    componentToString(cid) {
      let [str, streams] = this.recursiveCIDToString(this.rendered[COMPONENTS], cid, null);
      let [strippedHTML, _before, _after] = modifyRoot(str, {});
      return [strippedHTML, streams];
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    nextMagicID() {
      this.magicId++;
      return `${this.parentViewId()}-${this.magicId}`;
    }
    toOutputBuffer(rendered, templates, output, changeTracking, rootAttrs = {}) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, templates, output);
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      let isRoot = rendered[ROOT];
      let prevBuffer = output.buffer;
      if (isRoot) {
        output.buffer = "";
      }
      if (changeTracking && isRoot && !rendered.magicId) {
        rendered.newRender = true;
        rendered.magicId = this.nextMagicID();
      }
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output, changeTracking);
        output.buffer += statics[i];
      }
      if (isRoot) {
        let skip = false;
        let attrs;
        if (changeTracking || Object.keys(rootAttrs).length > 0) {
          skip = !rendered.newRender;
          attrs = __spreadValues({ [PHX_MAGIC_ID]: rendered.magicId }, rootAttrs);
        } else {
          attrs = rootAttrs;
        }
        if (skip) {
          attrs[PHX_SKIP] = true;
        }
        let [newRoot, commentBefore, commentAfter] = modifyRoot(output.buffer, attrs, skip);
        rendered.newRender = false;
        output.buffer = prevBuffer + commentBefore + newRoot + commentAfter;
      }
    }
    comprehensionToBuffer(rendered, templates, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics, [STREAM]: stream } = rendered;
      let [_ref, _inserts, deleteIds, reset] = stream || [null, {}, [], null];
      statics = this.templateStatic(statics, templates);
      let compTemplates = templates || rendered[TEMPLATES];
      for (let d2 = 0; d2 < dynamics.length; d2++) {
        let dynamic = dynamics[d2];
        output.buffer += statics[0];
        for (let i = 1; i < statics.length; i++) {
          let changeTracking = false;
          this.dynamicToBuffer(dynamic[i - 1], compTemplates, output, changeTracking);
          output.buffer += statics[i];
        }
      }
      if (stream !== void 0 && (rendered[DYNAMICS].length > 0 || deleteIds.length > 0 || reset)) {
        delete rendered[STREAM];
        rendered[DYNAMICS] = [];
        output.streams.add(stream);
      }
    }
    dynamicToBuffer(rendered, templates, output, changeTracking) {
      if (typeof rendered === "number") {
        let [str, streams] = this.recursiveCIDToString(output.components, rendered, output.onlyCids);
        output.buffer += str;
        output.streams = /* @__PURE__ */ new Set([...output.streams, ...streams]);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output, changeTracking, {});
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let attrs = { [PHX_COMPONENT]: cid };
      let skip = onlyCids && !onlyCids.has(cid);
      component.newRender = !skip;
      component.magicId = `${this.parentViewId()}-c-${cid}`;
      let changeTracking = true;
      let [html, streams] = this.recursiveToString(component, components, onlyCids, changeTracking, attrs);
      return [html, streams];
    }
  };
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return el.phxHookId;
    }
    constructor(view, el, callbacks) {
      this.__view = view;
      this.liveSocket = view.liveSocket;
      this.__callbacks = callbacks;
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      this.el = el;
      this.el.phxHookId = this.constructor.makeID();
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    pushEvent(event2, payload = {}, onReply = function() {
    }) {
      return this.__view.pushHookEvent(this.el, null, event2, payload, onReply);
    }
    pushEventTo(phxTarget, event2, payload = {}, onReply = function() {
    }) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(this.el, targetCtx, event2, payload, onReply);
      });
    }
    handleEvent(event2, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event2 : callback(customEvent.detail);
      window.addEventListener(`phx:${event2}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event2 = callbackRef(null, true);
      window.removeEventListener(`phx:${event2}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view.dispatchUploads(null, name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        view.dispatchUploads(targetCtx, name, files);
      });
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var focusStack = null;
  var JS = {
    exec(eventType, phxEvent, view, sourceEl, defaults) {
      let [defaultKind, defaultArgs] = defaults || [null, { callback: defaults && defaults.callback }];
      let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind && defaultArgs.data) {
          args.data = Object.assign(args.data || {}, defaultArgs.data);
          args.callback = args.callback || defaultArgs.callback;
        }
        this.filterToEls(sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    },
    exec_exec(eventType, phxEvent, view, sourceEl, el, [attr, to]) {
      let nodes = to ? dom_default.all(document, to) : [sourceEl];
      nodes.forEach((node) => {
        let encodedJS = node.getAttribute(attr);
        if (!encodedJS) {
          throw new Error(`expected ${attr} to contain JS command on "${to}"`);
        }
        view.liveSocket.execJS(node, encodedJS, eventType);
      });
    },
    exec_dispatch(eventType, phxEvent, view, sourceEl, el, { to, event: event2, detail, bubbles }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      dom_default.dispatchEvent(el, event2, { detail, bubbles });
    },
    exec_push(eventType, phxEvent, view, sourceEl, el, args) {
      if (!view.isConnected()) {
        return;
      }
      let { event: event2, data, target, page_loading, loading, value, dispatcher, callback } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      view.withinTargets(phxTarget, (targetView, targetCtx) => {
        if (eventType === "change") {
          let { newCid, _target } = args;
          _target = _target || (dom_default.isFormInput(sourceEl) ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event2 || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          let { submitter } = args;
          targetView.submitForm(sourceEl, targetCtx, event2 || phxEvent, submitter, pushOpts, callback);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event2 || phxEvent, data, pushOpts, callback);
        }
      });
    },
    exec_navigate(eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.historyRedirect(href, replace ? "replace" : "push");
    },
    exec_patch(eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.pushHistoryPatch(href, replace ? "replace" : "push", sourceEl);
    },
    exec_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.attemptFocus(el));
    },
    exec_focus_first(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el));
    },
    exec_push_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => focusStack = el || sourceEl);
    },
    exec_pop_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => {
        if (focusStack) {
          focusStack.focus();
        }
        focusStack = null;
      });
    },
    exec_add_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view);
    },
    exec_remove_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view);
    },
    exec_transition(eventType, phxEvent, view, sourceEl, el, { time, transition }) {
      this.addOrRemoveClasses(el, [], [], transition, time, view);
    },
    exec_toggle(eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time }) {
      this.toggle(eventType, view, el, display, ins, outs, time);
    },
    exec_show(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.show(eventType, view, el, display, transition, time);
    },
    exec_hide(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.hide(eventType, view, el, display, transition, time);
    },
    exec_set_attr(eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    show(eventType, view, el, display, transition, time) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time);
      }
    },
    hide(eventType, view, el, display, transition, time) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time) {
      let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          let onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          if (eventType === "remove") {
            return;
          }
          let onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, inEndClasses, inStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:show-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      } else {
        if (this.isVisible(el)) {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:hide-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:show-start"));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view) {
      let [transitionRun, transitionStart, transitionEnd] = transition || [[], [], []];
      if (transitionRun.length > 0) {
        let onStart = () => {
          this.addOrRemoveClasses(el, transitionStart, [].concat(transitionRun).concat(transitionEnd));
          window.requestAnimationFrame(() => {
            this.addOrRemoveClasses(el, transitionRun, []);
            window.requestAnimationFrame(() => this.addOrRemoveClasses(el, transitionEnd, transitionStart));
          });
        };
        let onDone = () => this.addOrRemoveClasses(el, adds.concat(transitionEnd), removes.concat(transitionRun).concat(transitionStart));
        return view.transition(time, onStart, onDone);
      }
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(sourceEl, { to }) {
      return to ? dom_default.all(document, to) : [sourceEl];
    },
    defaultDisplay(el) {
      return { tr: "table-row", td: "table-cell" }[el.tagName.toLowerCase()] || "block";
    }
  };
  var js_default = JS;
  var serializeForm = (form, metadata, onlyNames = []) => {
    let _a = metadata, { submitter } = _a, meta = __objRest(_a, ["submitter"]);
    let formData = new FormData(form);
    if (submitter && submitter.hasAttribute("name") && submitter.form && submitter.form === form) {
      formData.append(submitter.name, submitter.value);
    }
    let toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    let params = new URLSearchParams();
    for (let [key, val] of formData.entries()) {
      if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
        params.append(key, val);
      }
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class {
    constructor(el, liveSocket2, parentView, flash, liveReferer) {
      this.isDead = false;
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      this.id = this.el.id;
      this.ref = 0;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pruningCIDs = [];
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.uploaders = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        let url = this.href && this.expandURL(this.href);
        return {
          redirect: this.redirect ? url : void 0,
          url: this.redirect ? void 0 : url || void 0,
          params: this.connectParams(liveReferer),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.hasAttribute(PHX_MAIN);
    }
    connectParams(liveReferer) {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      params["_live_referer"] = liveReferer;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(PHX_CONNECTED_CLASS, PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS, PHX_SERVER_ERROR_CLASS);
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_LOADING_CLASS);
      }
    }
    execAll(binding) {
      dom_default.all(this.el, `[${binding}]`, (el) => this.liveSocket.execJS(el, el.getAttribute(binding)));
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
      this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    withinTargets(phxTarget, callback) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        let targets = dom_default.findComponentNodeList(this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, parseInt(phxTarget));
        }
      } else {
        let targets = Array.from(document.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      callback({ diff, reply, events });
      if (title) {
        window.requestAnimationFrame(() => dom_default.putTitle(title));
      }
    }
    onJoin(resp) {
      let { rendered, container } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let [html, streams] = this.renderContainer(null, "join");
        this.dropPendingRefs();
        let forms = this.formsForRecovery(html);
        this.joinCount++;
        if (forms.length > 0) {
          forms.forEach(([form, newForm, newCid], i) => {
            this.pushFormRecovery(form, newCid, (resp2) => {
              if (i === forms.length - 1) {
                this.onJoinComplete(resp2, html, streams, events);
              }
            });
          });
        } else {
          this.onJoinComplete(resp, html, streams, events);
        }
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}]`, (el) => {
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
      });
    }
    onJoinComplete({ live_patch }, html, streams, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, streams, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, streams, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    execNewMounted() {
      let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
      dom_default.all(this.el, `[${phxViewportTop}], [${phxViewportBottom}]`, (hookEl) => {
        dom_default.maybeAddPrivateHooks(hookEl, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(hookEl);
      });
      dom_default.all(this.el, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        this.maybeAddNewHook(hookEl);
      });
      dom_default.all(this.el, `[${this.binding(PHX_MOUNTED)}]`, (el) => this.maybeMounted(el));
    }
    applyJoinPatch(live_patch, html, streams, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false, true);
      this.joinNewChildren();
      this.execNewMounted();
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    maybeMounted(el) {
      let phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
      let hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
      if (phxMounted && !hasBeenInvoked) {
        this.liveSocket.execJS(el, phxMounted);
        dom_default.putPrivate(el, "mounted", true);
      }
    }
    maybeAddNewHook(el, force) {
      let newHook = this.addHook(el);
      if (newHook) {
        newHook.__mounted();
      }
    }
    performPatch(patch, pruneCids, isJoinPatch = false) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = /* @__PURE__ */ new Set();
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        this.maybeAddNewHook(el);
        if (el.getAttribute) {
          this.maybeMounted(el);
        }
      });
      patch.after("phxChildAdded", (el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform(isJoinPatch);
      this.afterElementsRemoved(removedEls, pruneCids);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      let destroyedCIDs = [];
      elements.forEach((parent) => {
        let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
        let hooks2 = dom_default.all(parent, `[${this.binding(PHX_HOOK)}]`);
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
        });
        hooks2.concat(parent).forEach((hookEl) => {
          let hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      if (el.id === this.id) {
        return this;
      } else {
        return this.children[el.getAttribute(PHX_PARENT_ID)][el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let [html, streams] = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff).concat(this.pruningCIDs) : null;
        let [html, streams] = this.rendered.toString(cids);
        return [`<${tag}>${html}</${tag}>`, streams];
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let [html, streams] = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, streams, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      if (ViewHook.elementID(el) || !el.getAttribute) {
        return;
      }
      let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
      if (hookName && !this.ownsElement(el)) {
        return;
      }
      let callbacks = this.liveSocket.getHookCallbacks(hookName);
      if (callbacks) {
        if (!el.id) {
          logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
        }
        let hook = new ViewHook(this, el, callbacks);
        this.viewHooks[ViewHook.elementID(hook.el)] = hook;
        return hook;
      } else if (hookName !== null) {
        logError(`unknown hook found for "${hookName}"`, el);
      }
    }
    destroyHook(hook) {
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[ViewHook.elementID(hook.el)];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
      this.eachChild((child) => child.applyPendingUpdates());
    }
    eachChild(callback) {
      let children = this.root.children[this.id] || {};
      for (let id in children) {
        callback(this.getChildById(id));
      }
    }
    onChannel(event2, cb) {
      this.liveSocket.onChannel(this.channel, event2, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
        });
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      this.eachChild((child) => child.destroy());
    }
    onLiveRedirect(redir) {
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      this.liveSocket.historyRedirect(url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash }) {
      this.liveSocket.redirect(to, flash);
    }
    isDestroyed() {
      return this.destroyed;
    }
    joinDead() {
      this.isDead = true;
    }
    join(callback) {
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.liveSocket.wrapPush(this, { timeout: false }, () => {
        return this.channel.join().receive("ok", (data) => {
          if (!this.isDestroyed()) {
            this.liveSocket.requestDOMUpdate(() => this.onJoin(data));
          }
        }).receive("error", (resp) => !this.isDestroyed() && this.onJoinError(resp)).receive("timeout", () => !this.isDestroyed() && this.onJoinError({ reason: "timeout" }));
      });
    }
    onJoinError(resp) {
      if (resp.reason === "reload") {
        this.log("error", () => [`failed mount with ${resp.status}. Falling back to page request`, resp]);
        if (this.isMain()) {
          this.onRedirect({ to: this.href });
        }
        return;
      } else if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        if (this.isMain()) {
          this.onRedirect({ to: this.href });
        }
        return;
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
      this.log("error", () => ["unable to join", resp]);
      if (this.liveSocket.isConnected()) {
        this.liveSocket.reloadWithJitter(this);
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        if (this.liveSocket.isConnected()) {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
        } else {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS]);
        }
      }
    }
    displayError(classes) {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
      }
      this.showLoader();
      this.setContainerClasses(...classes);
      this.execAll(this.binding("disconnected"));
    }
    pushWithReply(refGenerator, event2, payload, onReply = function() {
    }) {
      if (!this.isConnected()) {
        return;
      }
      let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
      let onLoadingDone = function() {
      };
      if (opts.page_loading || el && el.getAttribute(this.binding(PHX_PAGE_LOADING)) !== null) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return this.liveSocket.wrapPush(this, { timeout: true }, () => {
        return this.channel.push(event2, payload, PUSH_TIMEOUT).receive("ok", (resp) => {
          let finish = (hookReply) => {
            if (resp.redirect) {
              this.onRedirect(resp.redirect);
            }
            if (resp.live_patch) {
              this.onLivePatch(resp.live_patch);
            }
            if (resp.live_redirect) {
              this.onLiveRedirect(resp.live_redirect);
            }
            onLoadingDone();
            onReply(resp, hookReply);
          };
          if (resp.diff) {
            this.liveSocket.requestDOMUpdate(() => {
              this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                if (ref !== null) {
                  this.undoRefs(ref);
                }
                this.update(diff, events);
                finish(reply);
              });
            });
          } else {
            if (ref !== null) {
              this.undoRefs(ref);
            }
            finish(null);
          }
        });
      });
    }
    undoRefs(ref) {
      if (!this.isConnected()) {
        return;
      }
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}="${ref}"]`, (el) => {
        let disabledVal = el.getAttribute(PHX_DISABLED);
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
        if (el.getAttribute(PHX_READONLY) !== null) {
          el.readOnly = false;
          el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          el.disabled = disabledVal === "true" ? true : false;
          el.removeAttribute(PHX_DISABLED);
        }
        PHX_EVENT_CLASSES.forEach((className) => dom_default.removeClass(el, className));
        let disableRestore = el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          el.innerText = disableRestore;
          el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let toEl = dom_default.private(el, PHX_REF);
        if (toEl) {
          let hook = this.triggerBeforeUpdateHook(el, toEl);
          DOMPatch.patchEl(el, toEl, this.liveSocket.getActiveElement());
          if (hook) {
            hook.__updated();
          }
          dom_default.deletePrivate(el, PHX_REF);
        }
      });
    }
    putRef(elements, event2, opts = {}) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        elements = elements.concat(dom_default.all(document, opts.loading));
      }
      elements.forEach((el) => {
        el.classList.add(`phx-${event2}-loading`);
        el.setAttribute(PHX_REF, newRef);
        el.setAttribute(PHX_REF_SRC, this.el.id);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          if (disableText !== "") {
            el.innerText = disableText;
          }
          el.setAttribute("disabled", "");
        }
      });
      return [newRef, elements, opts];
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      let cidOrSelector = opts.target || target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(el, targetCtx, event2, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event2, payload]);
        return false;
      }
      let [ref, els, opts] = this.putRef([el], "hook");
      this.pushWithReply(() => [ref, els, opts], "event", {
        type: "hook",
        event: event2,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }, (resp, reply) => onReply(reply, ref));
      return ref;
    }
    extractMeta(el, meta, value) {
      let prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        let name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0 && !(el instanceof HTMLFormElement)) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (let key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}, onReply) {
      this.pushWithReply(() => this.putRef([el], type, opts), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      }, (resp, reply) => onReply && onReply(reply));
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }, onReply);
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx, opts);
      let refGenerator = () => this.putRef([inputEl, inputEl.form], "change", opts);
      let formData;
      let meta = this.extractMeta(inputEl.form);
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta), [inputEl.name]);
      } else {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta));
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event2 = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event2, (resp) => {
        dom_default.showError(inputEl, this.liveSocket.binding(PHX_FEEDBACK_FOR));
        if (dom_default.isUploadInput(inputEl) && dom_default.isAutoUpload(inputEl)) {
          if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
            let [ref, _els] = refGenerator();
            this.uploadFiles(inputEl.form, targetCtx, ref, cid, (_uploads) => {
              callback && callback(resp);
              this.triggerAwaitingSubmit(inputEl.form);
            });
          }
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref);
          return false;
        } else {
          return true;
        }
      });
    }
    disableForm(formEl, opts = {}) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let formElements = Array.from(formEl.elements);
      let disables = formElements.filter(filterDisables);
      let buttons = formElements.filter(filterButton).filter(filterIgnored);
      let inputs = formElements.filter(filterInput).filter(filterIgnored);
      buttons.forEach((button) => {
        button.setAttribute(PHX_DISABLED, button.disabled);
        button.disabled = true;
      });
      inputs.forEach((input) => {
        input.setAttribute(PHX_READONLY, input.readOnly);
        input.readOnly = true;
        if (input.files) {
          input.setAttribute(PHX_DISABLED, input.disabled);
          input.disabled = true;
        }
      });
      formEl.setAttribute(this.binding(PHX_PAGE_LOADING), "");
      return this.putRef([formEl].concat(disables).concat(buttons).concat(inputs), "submit", opts);
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply) {
      let refGenerator = () => this.disableForm(formEl, opts);
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        let push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, targetCtx, ref, cid, (_uploads) => {
          let meta = this.extractMeta(formEl);
          let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }, onReply);
        });
      } else if (!(formEl.hasAttribute(PHX_REF) && formEl.classList.contains("phx-submit-loading"))) {
        let meta = this.extractMeta(formEl);
        let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }, onReply);
      }
    }
    uploadFiles(formEl, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        this.uploaders[inputEl] = uploader;
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload, (resp) => {
          this.log("upload", () => ["got preflight response", resp]);
          if (resp.error) {
            this.undoRefs(ref);
            let [entry_ref, reason] = resp.error;
            this.log("upload", () => [`error for entry ${entry_ref}`, reason]);
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    dispatchUploads(targetCtx, name, filesOrBlobs) {
      let targetElement = this.targetCtxElement(targetCtx) || this.el;
      let inputs = dom_default.findUploadInputs(targetElement).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
      }
    }
    targetCtxElement(targetCtx) {
      if (isCid(targetCtx)) {
        let [target] = dom_default.findComponentNodeList(this.el, targetCtx);
        return target;
      } else if (targetCtx) {
        return targetCtx;
      } else {
        return null;
      }
    }
    pushFormRecovery(form, newCid, callback) {
      this.liveSocket.withinOwners(form, (view, targetCtx) => {
        let phxChange = this.binding("change");
        let inputs = Array.from(form.elements).filter((el) => dom_default.isFormInput(el) && el.name && !el.hasAttribute(phxChange));
        if (inputs.length === 0) {
          return;
        }
        inputs.forEach((input2) => input2.hasAttribute(PHX_UPLOAD_REF) && LiveUploader.clearFiles(input2));
        let input = inputs.find((el) => el.type !== "hidden") || inputs[0];
        let phxEvent = form.getAttribute(this.binding(PHX_AUTO_RECOVER)) || form.getAttribute(this.binding("change"));
        js_default.exec("change", phxEvent, view, input, ["push", { _target: input.name, newCid, callback }]);
      });
    }
    pushLinkPatch(href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let refGen = targetEl ? () => this.putRef([targetEl], "click") : null;
      let fallback = () => this.liveSocket.redirect(window.location.href);
      let url = href.startsWith("/") ? `${location.protocol}//${location.host}${href}` : href;
      let push = this.pushWithReply(refGen, "live_patch", { url }, (resp) => {
        this.liveSocket.requestDOMUpdate(() => {
          if (resp.link_redirect) {
            this.liveSocket.replaceMain(href, null, callback, linkRef);
          } else {
            if (this.liveSocket.commitPendingLink(linkRef)) {
              this.href = href;
            }
            this.applyPendingUpdates();
            callback && callback(linkRef);
          }
        });
      });
      if (push) {
        push.receive("timeout", fallback);
      } else {
        fallback();
      }
    }
    formsForRecovery(html) {
      if (this.joinCount === 0) {
        return [];
      }
      let phxChange = this.binding("change");
      let template = document.createElement("template");
      template.innerHTML = html;
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id && this.ownsElement(form)).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
        const phxChangeValue = form.getAttribute(phxChange).replaceAll(/([\[\]"])/g, "\\$1");
        let newForm = template.content.querySelector(`form[id="${form.id}"][${phxChange}="${phxChangeValue}"]`);
        if (newForm) {
          return [form, newForm, this.targetComponentID(newForm)];
        } else {
          return [form, form, this.targetComponentID(form)];
        }
      }).filter(([form, newForm, newCid]) => newForm);
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      if (willDestroyCIDs.length > 0) {
        this.pruningCIDs.push(...willDestroyCIDs);
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }, () => {
          this.pruningCIDs = this.pruningCIDs.filter((cid) => willDestroyCIDs.indexOf(cid) !== -1);
          let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
            return dom_default.findComponentNodeList(this.el, cid).length === 0;
          });
          if (completelyDestroyCIDs.length > 0) {
            this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }, (resp) => {
              this.rendered.pruneCIDs(resp.cids);
            });
          }
        });
      }
    }
    ownsElement(el) {
      let parentViewEl = el.closest(PHX_VIEW_SELECTOR);
      return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
    }
    submitForm(form, targetCtx, phxEvent, submitter, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      let phxFeedback = this.liveSocket.binding(PHX_FEEDBACK_FOR);
      let inputs = Array.from(form.elements);
      inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, submitter, opts, () => {
        inputs.forEach((input) => dom_default.showError(input, phxFeedback));
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.domCallbacks = Object.assign({ onNodeAdded: closure2(), onBeforeElUpdated: closure2() }, opts.dom || {});
      this.transitions = new TransitionSet();
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      let doConnect = () => {
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        } else {
          this.bindTopLevelEvents({ dead: true });
        }
        this.joinDeadView();
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      this.owner(el, (view) => js_default.exec(eventType, encodedJS, view, el));
    }
    execJSHookPush(el, phxEvent, data, callback) {
      this.withinOwners(el, (view) => {
        js_default.exec("hook", phxEvent, view, el, ["push", { data, callback }]);
      });
    }
    unload() {
      if (this.unloaded) {
        return;
      }
      if (this.main && this.isConnected()) {
        this.log(this.main, "socket", () => ["disconnect for page nav"]);
      }
      this.unloaded = true;
      this.destroyAllViews();
      this.disconnect();
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel, event2, cb) {
      channel.on(event2, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          setTimeout(() => cb(data), latency);
        }
      });
    }
    wrapPush(view, opts, push) {
      let latency = this.getLatencySim();
      let oldJoinCount = view.joinCount;
      if (!latency) {
        if (this.isConnected() && opts.timeout) {
          return push().receive("timeout", () => {
            if (view.joinCount === oldJoinCount && !view.isDestroyed()) {
              this.reloadWithJitter(view, () => {
                this.log(view, "timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          });
        } else {
          return push();
        }
      }
      let fakePush = {
        receives: [],
        receive(kind, cb) {
          this.receives.push([kind, cb]);
        }
      };
      setTimeout(() => {
        if (view.isDestroyed()) {
          return;
        }
        fakePush.receives.reduce((acc, [kind, cb]) => acc.receive(kind, cb), push());
      }, latency);
      return fakePush;
    }
    reloadWithJitter(view, log) {
      clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries > this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
        if (tries > this.maxReloads) {
          this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        }
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinDeadView() {
      let body = document.body;
      if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
        let view = this.newRootView(body);
        view.setHref(this.getHref());
        view.joinDead();
        if (!this.main) {
          this.main = view;
        }
        window.requestAnimationFrame(() => view.execNewMounted());
      }
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.hasAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash) {
      this.unload();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      let liveReferer = this.currentLocation.href;
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      let newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash, liveReferer);
      this.main.setRedirect(href);
      this.transitionRemoves();
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && requestAnimationFrame(() => callback(linkRef));
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements) {
      let removeAttr = this.binding("remove");
      elements = elements || dom_default.all(document, `[${removeAttr}]`);
      elements.forEach((el) => {
        this.execJS(el, el.getAttribute(removeAttr), "remove");
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash, liveReferer) {
      let view = new View(el, this, null, flash, liveReferer);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el)) || this.main;
      if (view) {
        callback(view);
      }
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    setActiveElement(target) {
      if (this.activeElement === target) {
        return;
      }
      this.activeElement = target;
      let cancel = () => {
        if (target === this.activeElement) {
          this.activeElement = null;
        }
        target.removeEventListener("mouseup", this);
        target.removeEventListener("touchend", this);
      };
      target.addEventListener("mouseup", cancel);
      target.addEventListener("touchend", cancel);
    }
    getActiveElement() {
      if (document.activeElement === document.body) {
        return this.activeElement || document.activeElement;
      } else {
        return document.activeElement || document.body;
      }
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents({ dead } = {}) {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.socket.onClose((event2) => {
        if (event2 && event2.code === 1e3 && this.main) {
          return this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e2) => {
        if (e2.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      if (!dead) {
        this.bindNav();
      }
      this.bindClicks();
      if (!dead) {
        this.bindForms();
      }
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e2, type, view, targetEl, phxEvent, phxTarget) => {
        let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e2.key && e2.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        let data = __spreadValues({ key: e2.key }, this.eventMeta(type, e2, targetEl));
        js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e2, type, view, targetEl, phxEvent, phxTarget) => {
        if (!phxTarget) {
          let data = __spreadValues({ key: e2.key }, this.eventMeta(type, e2, targetEl));
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e2, type, view, targetEl, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          let data = this.eventMeta(type, e2, targetEl);
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      window.addEventListener("dragover", (e2) => e2.preventDefault());
      window.addEventListener("drop", (e2) => {
        e2.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e2.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e2.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files, e2.dataTransfer);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e2) => {
        let uploadTarget = e2.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e2.detail.files || []).filter((f2) => f2 instanceof File || f2 instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e2, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e2, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      return this.linkRef;
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event2 in events) {
        let browserEventName = events[event2];
        this.on(browserEventName, (e2) => {
          let binding = this.binding(event2);
          let windowBinding = this.binding(`window-${event2}`);
          let targetPhxEvent = e2.target.getAttribute && e2.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e2.target, e2, browserEventName, () => {
              this.withinOwners(e2.target, (view) => {
                callback(e2, event2, view, e2.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e2, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(e2, event2, view, el, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      window.addEventListener("mousedown", (e2) => this.clickStartedAtTarget = e2.target);
      this.bindClick("click", "click", false);
      this.bindClick("mousedown", "capture-click", true);
    }
    bindClick(eventName, bindingName, capture) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e2) => {
        let target = null;
        if (capture) {
          target = e2.target.matches(`[${click}]`) ? e2.target : e2.target.querySelector(`[${click}]`);
        } else {
          let clickStartedAtTarget = this.clickStartedAtTarget || e2.target;
          target = closestPhxBinding(clickStartedAtTarget, click);
          this.dispatchClickAway(e2, clickStartedAtTarget);
          this.clickStartedAtTarget = null;
        }
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          if (!capture && dom_default.isNewPageClick(e2, window.location)) {
            this.unload();
          }
          return;
        }
        if (target.getAttribute("href") === "#") {
          e2.preventDefault();
        }
        if (target.hasAttribute(PHX_REF)) {
          return;
        }
        this.debounce(target, e2, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec("click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e2, target) }]);
          });
        });
      }, capture);
    }
    dispatchClickAway(e2, clickStartedAt) {
      let phxClickAway = this.binding("click-away");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
          this.withinOwners(e2.target, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el) && js_default.isInViewport(el)) {
              js_default.exec("click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e2, e2.target) }]);
            }
          });
        }
      });
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event2) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, id, root, scroll } = event2.state || {};
        let href = window.location.href;
        dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: type === "patch", pop: true } });
        this.requestDOMUpdate(() => {
          if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
            this.main.pushLinkPatch(href, null, () => {
              this.maybeScroll(scroll);
            });
          } else {
            this.replaceMain(href, null, () => {
              if (root) {
                this.replaceRootHistory();
              }
              this.maybeScroll(scroll);
            });
          }
        });
      }, false);
      window.addEventListener("click", (e2) => {
        let target = closestPhxBinding(e2.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e2)) {
          return;
        }
        let href = target.href instanceof SVGAnimatedString ? target.href.baseVal : target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e2.preventDefault();
        e2.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(href, linkState);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
          let phxClick = target.getAttribute(this.binding("click"));
          if (phxClick) {
            this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
          }
        });
      }, false);
    }
    maybeScroll(scroll) {
      if (typeof scroll === "number") {
        requestAnimationFrame(() => {
          window.scrollTo(0, scroll);
        });
      }
    }
    dispatchEvent(event2, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event2}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event2, payload]) => this.dispatchEvent(event2, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(href, linkState, targetEl) {
      if (!this.isConnected()) {
        return browser_default.redirect(href);
      }
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      browser_default.pushState(linkState, { type: "patch", id: this.main.id }, href);
      dom_default.dispatchEvent(window, "phx:navigate", { detail: { patch: true, href, pop: false } });
      this.registerNewLocation(window.location);
    }
    historyRedirect(href, linkState, flash) {
      if (!this.isConnected()) {
        return browser_default.redirect(href, flash);
      }
      if (/^\/$|^\/[^\/]+.*$/.test(href)) {
        let { protocol, host } = window.location;
        href = `${protocol}//${host}${href}`;
      }
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, (linkRef) => {
          if (linkRef === this.linkRef) {
            browser_default.pushState(linkState, { type: "redirect", id: this.main.id, scroll }, href);
            dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: false, pop: false } });
            this.registerNewLocation(window.location);
          }
          done();
        });
      });
    }
    replaceRootHistory() {
      browser_default.pushState("replace", { root: true, type: "patch", id: this.main.id });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      let externalFormSubmitted = false;
      this.on("submit", (e2) => {
        let phxSubmit = e2.target.getAttribute(this.binding("submit"));
        let phxChange = e2.target.getAttribute(this.binding("change"));
        if (!externalFormSubmitted && phxChange && !phxSubmit) {
          externalFormSubmitted = true;
          e2.preventDefault();
          this.withinOwners(e2.target, (view) => {
            view.disableForm(e2.target);
            window.requestAnimationFrame(() => {
              if (dom_default.isUnloadableFormSubmit(e2)) {
                this.unload();
              }
              e2.target.submit();
            });
          });
        }
      }, true);
      this.on("submit", (e2) => {
        let phxEvent = e2.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          if (dom_default.isUnloadableFormSubmit(e2)) {
            this.unload();
          }
          return;
        }
        e2.preventDefault();
        e2.target.disabled = true;
        this.withinOwners(e2.target, (view) => {
          js_default.exec("submit", phxEvent, view, e2.target, ["push", { submitter: e2.submitter }]);
        });
      }, false);
      for (let type of ["change", "input"]) {
        this.on(type, (e2) => {
          let phxChange = this.binding("change");
          let input = e2.target;
          let inputEvent = input.getAttribute(phxChange);
          let formEvent = input.form && input.form.getAttribute(phxChange);
          let phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let dispatcher = inputEvent ? input : input.form;
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type === "change" && lastType === "input") {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e2, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              if (!dom_default.isTextualInput(input)) {
                this.setActiveElement(input);
              }
              js_default.exec("change", phxEvent, view, input, ["push", { _target: e2.target.name, dispatcher }]);
            });
          });
        }, false);
      }
      this.on("reset", (e2) => {
        let form = e2.target;
        dom_default.resetForm(form, this.binding(PHX_FEEDBACK_FOR));
        let input = Array.from(form.elements).find((el) => el.type === "reset");
        window.requestAnimationFrame(() => {
          input.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));
        });
      });
    }
    debounce(el, event2, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(el, event2, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
          callback();
        });
      });
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event2, callback) {
      window.addEventListener(event2, (e2) => {
        if (!this.silenced) {
          callback(e2);
        }
      });
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = /* @__PURE__ */ new Set();
      this.pendingOps = [];
    }
    reset() {
      this.transitions.forEach((timer) => {
        clearTimeout(timer);
        this.transitions.delete(timer);
      });
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      let timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        this.flushPendingOps();
      }, time);
      this.transitions.add(timer);
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size;
    }
    flushPendingOps() {
      if (this.size() > 0) {
        return;
      }
      let op = this.pendingOps.shift();
      if (op) {
        op();
        this.flushPendingOps();
      }
    }
  };

  // js/app.js
  var import_topbar = __toESM(require_topbar());

  // js/game/player.js
  var messages = require_messages_pb();
  var Player = class {
    constructor(game_id) {
      this.socket = new WebSocket(this.getplayConnection(game_id));
    }
    move(direction_x, direction_y) {
      let moveMsg = this.createMoveMessage(direction_x, direction_y);
      this.socket.send(moveMsg);
    }
    createMoveMessage(direction_x, direction_y) {
      var message = new messages.Direction();
      message.setX(direction_x);
      message.setY(direction_y);
      console.log("Pressed: " + event.key + ". Msg: [" + message.getX() + ", " + message.getY() + "]");
      return message.serializeBinary();
    }
    getplayConnection(game_id) {
      let protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      let host = window.location.host;
      let path = "/play";
      return `${protocol}${host}${path}/${game_id}`;
    }
  };

  // js/hooks/play.js
  var Play = function() {
    this.mounted = function() {
      let player_id = document.getElementById("board_game").dataset.playerId;
      let player = new Player(player_id);
      document.addEventListener("keypress", function onPress(event2) {
        if (event2.key === "a") {
          player.move(-1, 0);
        }
        if (event2.key === "w") {
          player.move(0, -1);
        }
        if (event2.key === "s") {
          player.move(0, 1);
        }
        if (event2.key === "d") {
          player.move(1, 0);
        }
      });
    };
  };

  // js/app.js
  var hooks = {
    Play: new Play()
  };
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var liveSocket = new LiveSocket("/live", Socket, { params: { _csrf_token: csrfToken }, hooks });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (_info) => import_topbar.default.show(300));
  window.addEventListener("phx:page-loading-stop", (_info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 2.0.0, 2023-02-04
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */