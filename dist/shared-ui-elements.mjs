import * as j from "react";
import mn, { Children as yv, isValidElement as Ua, cloneElement as Va, createContext as r0, useEffect as Ri, useContext as o0, useMemo as qr, useState as jn, useRef as Vr, useCallback as Kn, forwardRef as ps, useImperativeHandle as bv, useInsertionEffect as xv, useId as _v } from "react";
import Ev from "@emotion/styled";
import { CacheProvider as Tv, Global as Cv, ThemeContext as i0, css as Ov, keyframes as hs } from "@emotion/react";
import { useForm as Sv, FormProvider as wv, useController as Ro, useFormContext as a0, useFieldArray as Rv } from "react-hook-form";
import { Box as an, Tooltip as $v, IconButton as Xa, Stack as Ht, Typography as cr, Autocomplete as s0, TextField as Zr, Radio as Pv, Chip as Iv, RadioGroup as Qu, Dialog as Av, DialogTitle as Mv, DialogContent as Nv, DialogActions as jv, useTheme as ec, Paper as Dv, Accordion as Fv, AccordionSummary as kv, AccordionDetails as Lv, Link as Bv, Alert as zv, InputAdornment as l0, Button as Wv, Menu as Uv, MenuItem as Vv, colors as tc, createTheme as Hv } from "@mui/material";
import { Code as qv, Delete as Zv, ChevronLeft as Kv, Menu as Gv, CheckCircle as Yv, Close as u0, Add as Xv, KeyboardArrowDown as Jv } from "@mui/icons-material";
import { useDrag as Qv, useDrop as e6, DndProvider as t6 } from "react-dnd";
import { HTML5Backend as n6 } from "react-dnd-html5-backend";
import * as $o from "zod";
import { z as $i } from "zod";
import r6 from "@mona-health/react-input-mask";
import { IMaskInput as o6 } from "react-imask";
import nc, { isValidPhoneNumber as i6 } from "libphonenumber-js";
import * as a6 from "react-dom";
import ja from "react-dom";
import * as s6 from "qrcode";
var ur = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Sr(e) {
  if (e.__esModule) return e;
  var n = e.default;
  if (typeof n == "function") {
    var o = function a() {
      return this instanceof a ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments);
    };
    o.prototype = n.prototype;
  } else o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(e).forEach(function(a) {
    var l = Object.getOwnPropertyDescriptor(e, a);
    Object.defineProperty(o, a, l.get ? l : {
      enumerable: !0,
      get: function() {
        return e[a];
      }
    });
  }), o;
}
var Pu = { exports: {} }, ci = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sp;
function l6() {
  if (sp) return ci;
  sp = 1;
  var e = mn, n = Symbol.for("react.element"), o = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, l = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function f(d, h, g) {
    var b, x = {}, _ = null, P = null;
    g !== void 0 && (_ = "" + g), h.key !== void 0 && (_ = "" + h.key), h.ref !== void 0 && (P = h.ref);
    for (b in h) a.call(h, b) && !u.hasOwnProperty(b) && (x[b] = h[b]);
    if (d && d.defaultProps) for (b in h = d.defaultProps, h) x[b] === void 0 && (x[b] = h[b]);
    return { $$typeof: n, type: d, key: _, ref: P, props: x, _owner: l.current };
  }
  return ci.Fragment = o, ci.jsx = f, ci.jsxs = f, ci;
}
var fi = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lp;
function u6() {
  return lp || (lp = 1, process.env.NODE_ENV !== "production" && function() {
    var e = mn, n = Symbol.for("react.element"), o = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), d = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), S = Symbol.iterator, C = "@@iterator";
    function E(w) {
      if (w === null || typeof w != "object")
        return null;
      var K = S && w[S] || w[C];
      return typeof K == "function" ? K : null;
    }
    var $ = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function N(w) {
      {
        for (var K = arguments.length, ce = new Array(K > 1 ? K - 1 : 0), we = 1; we < K; we++)
          ce[we - 1] = arguments[we];
        A("error", w, ce);
      }
    }
    function A(w, K, ce) {
      {
        var we = $.ReactDebugCurrentFrame, Ze = we.getStackAddendum();
        Ze !== "" && (K += "%s", ce = ce.concat([Ze]));
        var nt = ce.map(function(Ue) {
          return String(Ue);
        });
        nt.unshift("Warning: " + K), Function.prototype.apply.call(console[w], console, nt);
      }
    }
    var M = !1, O = !1, k = !1, L = !1, J = !1, le;
    le = Symbol.for("react.module.reference");
    function G(w) {
      return !!(typeof w == "string" || typeof w == "function" || w === a || w === u || J || w === l || w === g || w === b || L || w === P || M || O || k || typeof w == "object" && w !== null && (w.$$typeof === _ || w.$$typeof === x || w.$$typeof === f || w.$$typeof === d || w.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      w.$$typeof === le || w.getModuleId !== void 0));
    }
    function ie(w, K, ce) {
      var we = w.displayName;
      if (we)
        return we;
      var Ze = K.displayName || K.name || "";
      return Ze !== "" ? ce + "(" + Ze + ")" : ce;
    }
    function ae(w) {
      return w.displayName || "Context";
    }
    function ee(w) {
      if (w == null)
        return null;
      if (typeof w.tag == "number" && N("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof w == "function")
        return w.displayName || w.name || null;
      if (typeof w == "string")
        return w;
      switch (w) {
        case a:
          return "Fragment";
        case o:
          return "Portal";
        case u:
          return "Profiler";
        case l:
          return "StrictMode";
        case g:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof w == "object")
        switch (w.$$typeof) {
          case d:
            var K = w;
            return ae(K) + ".Consumer";
          case f:
            var ce = w;
            return ae(ce._context) + ".Provider";
          case h:
            return ie(w, w.render, "ForwardRef");
          case x:
            var we = w.displayName || null;
            return we !== null ? we : ee(w.type) || "Memo";
          case _: {
            var Ze = w, nt = Ze._payload, Ue = Ze._init;
            try {
              return ee(Ue(nt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Q = Object.assign, ne = 0, te, oe, X, Pe, W, Y, he;
    function pe() {
    }
    pe.__reactDisabledLog = !0;
    function re() {
      {
        if (ne === 0) {
          te = console.log, oe = console.info, X = console.warn, Pe = console.error, W = console.group, Y = console.groupCollapsed, he = console.groupEnd;
          var w = {
            configurable: !0,
            enumerable: !0,
            value: pe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: w,
            log: w,
            warn: w,
            error: w,
            group: w,
            groupCollapsed: w,
            groupEnd: w
          });
        }
        ne++;
      }
    }
    function fe() {
      {
        if (ne--, ne === 0) {
          var w = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Q({}, w, {
              value: te
            }),
            info: Q({}, w, {
              value: oe
            }),
            warn: Q({}, w, {
              value: X
            }),
            error: Q({}, w, {
              value: Pe
            }),
            group: Q({}, w, {
              value: W
            }),
            groupCollapsed: Q({}, w, {
              value: Y
            }),
            groupEnd: Q({}, w, {
              value: he
            })
          });
        }
        ne < 0 && N("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ue = $.ReactCurrentDispatcher, ye;
    function ge(w, K, ce) {
      {
        if (ye === void 0)
          try {
            throw Error();
          } catch (Ze) {
            var we = Ze.stack.trim().match(/\n( *(at )?)/);
            ye = we && we[1] || "";
          }
        return `
` + ye + w;
      }
    }
    var me = !1, _e;
    {
      var be = typeof WeakMap == "function" ? WeakMap : Map;
      _e = new be();
    }
    function Z(w, K) {
      if (!w || me)
        return "";
      {
        var ce = _e.get(w);
        if (ce !== void 0)
          return ce;
      }
      var we;
      me = !0;
      var Ze = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var nt;
      nt = ue.current, ue.current = null, re();
      try {
        if (K) {
          var Ue = function() {
            throw Error();
          };
          if (Object.defineProperty(Ue.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Ue, []);
            } catch (Zt) {
              we = Zt;
            }
            Reflect.construct(w, [], Ue);
          } else {
            try {
              Ue.call();
            } catch (Zt) {
              we = Zt;
            }
            w.call(Ue.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Zt) {
            we = Zt;
          }
          w();
        }
      } catch (Zt) {
        if (Zt && we && typeof Zt.stack == "string") {
          for (var Be = Zt.stack.split(`
`), Bt = we.stack.split(`
`), mt = Be.length - 1, _t = Bt.length - 1; mt >= 1 && _t >= 0 && Be[mt] !== Bt[_t]; )
            _t--;
          for (; mt >= 1 && _t >= 0; mt--, _t--)
            if (Be[mt] !== Bt[_t]) {
              if (mt !== 1 || _t !== 1)
                do
                  if (mt--, _t--, _t < 0 || Be[mt] !== Bt[_t]) {
                    var zt = `
` + Be[mt].replace(" at new ", " at ");
                    return w.displayName && zt.includes("<anonymous>") && (zt = zt.replace("<anonymous>", w.displayName)), typeof w == "function" && _e.set(w, zt), zt;
                  }
                while (mt >= 1 && _t >= 0);
              break;
            }
        }
      } finally {
        me = !1, ue.current = nt, fe(), Error.prepareStackTrace = Ze;
      }
      var pr = w ? w.displayName || w.name : "", Tn = pr ? ge(pr) : "";
      return typeof w == "function" && _e.set(w, Tn), Tn;
    }
    function Ee(w, K, ce) {
      return Z(w, !1);
    }
    function H(w) {
      var K = w.prototype;
      return !!(K && K.isReactComponent);
    }
    function Ie(w, K, ce) {
      if (w == null)
        return "";
      if (typeof w == "function")
        return Z(w, H(w));
      if (typeof w == "string")
        return ge(w);
      switch (w) {
        case g:
          return ge("Suspense");
        case b:
          return ge("SuspenseList");
      }
      if (typeof w == "object")
        switch (w.$$typeof) {
          case h:
            return Ee(w.render);
          case x:
            return Ie(w.type, K, ce);
          case _: {
            var we = w, Ze = we._payload, nt = we._init;
            try {
              return Ie(nt(Ze), K, ce);
            } catch {
            }
          }
        }
      return "";
    }
    var st = Object.prototype.hasOwnProperty, ot = {}, Dt = $.ReactDebugCurrentFrame;
    function Ft(w) {
      if (w) {
        var K = w._owner, ce = Ie(w.type, w._source, K ? K.type : null);
        Dt.setExtraStackFrame(ce);
      } else
        Dt.setExtraStackFrame(null);
    }
    function It(w, K, ce, we, Ze) {
      {
        var nt = Function.call.bind(st);
        for (var Ue in w)
          if (nt(w, Ue)) {
            var Be = void 0;
            try {
              if (typeof w[Ue] != "function") {
                var Bt = Error((we || "React class") + ": " + ce + " type `" + Ue + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof w[Ue] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Bt.name = "Invariant Violation", Bt;
              }
              Be = w[Ue](K, Ue, we, ce, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (mt) {
              Be = mt;
            }
            Be && !(Be instanceof Error) && (Ft(Ze), N("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", we || "React class", ce, Ue, typeof Be), Ft(null)), Be instanceof Error && !(Be.message in ot) && (ot[Be.message] = !0, Ft(Ze), N("Failed %s type: %s", ce, Be.message), Ft(null));
          }
      }
    }
    var ze = Array.isArray;
    function xt(w) {
      return ze(w);
    }
    function Ot(w) {
      {
        var K = typeof Symbol == "function" && Symbol.toStringTag, ce = K && w[Symbol.toStringTag] || w.constructor.name || "Object";
        return ce;
      }
    }
    function it(w) {
      try {
        return St(w), !1;
      } catch {
        return !0;
      }
    }
    function St(w) {
      return "" + w;
    }
    function xn(w) {
      if (it(w))
        return N("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ot(w)), St(w);
    }
    var At = $.ReactCurrentOwner, Fe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Te, Lt, ln;
    ln = {};
    function _n(w) {
      if (st.call(w, "ref")) {
        var K = Object.getOwnPropertyDescriptor(w, "ref").get;
        if (K && K.isReactWarning)
          return !1;
      }
      return w.ref !== void 0;
    }
    function Jn(w) {
      if (st.call(w, "key")) {
        var K = Object.getOwnPropertyDescriptor(w, "key").get;
        if (K && K.isReactWarning)
          return !1;
      }
      return w.key !== void 0;
    }
    function xe(w, K) {
      if (typeof w.ref == "string" && At.current && K && At.current.stateNode !== K) {
        var ce = ee(At.current.type);
        ln[ce] || (N('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ee(At.current.type), w.ref), ln[ce] = !0);
      }
    }
    function Le(w, K) {
      {
        var ce = function() {
          Te || (Te = !0, N("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", K));
        };
        ce.isReactWarning = !0, Object.defineProperty(w, "key", {
          get: ce,
          configurable: !0
        });
      }
    }
    function gt(w, K) {
      {
        var ce = function() {
          Lt || (Lt = !0, N("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", K));
        };
        ce.isReactWarning = !0, Object.defineProperty(w, "ref", {
          get: ce,
          configurable: !0
        });
      }
    }
    var En = function(w, K, ce, we, Ze, nt, Ue) {
      var Be = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: w,
        key: K,
        ref: ce,
        props: Ue,
        // Record the component responsible for creating this element.
        _owner: nt
      };
      return Be._store = {}, Object.defineProperty(Be._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Be, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: we
      }), Object.defineProperty(Be, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ze
      }), Object.freeze && (Object.freeze(Be.props), Object.freeze(Be)), Be;
    };
    function Xr(w, K, ce, we, Ze) {
      {
        var nt, Ue = {}, Be = null, Bt = null;
        ce !== void 0 && (xn(ce), Be = "" + ce), Jn(K) && (xn(K.key), Be = "" + K.key), _n(K) && (Bt = K.ref, xe(K, Ze));
        for (nt in K)
          st.call(K, nt) && !Fe.hasOwnProperty(nt) && (Ue[nt] = K[nt]);
        if (w && w.defaultProps) {
          var mt = w.defaultProps;
          for (nt in mt)
            Ue[nt] === void 0 && (Ue[nt] = mt[nt]);
        }
        if (Be || Bt) {
          var _t = typeof w == "function" ? w.displayName || w.name || "Unknown" : w;
          Be && Le(Ue, _t), Bt && gt(Ue, _t);
        }
        return En(w, Be, Bt, Ze, we, At.current, Ue);
      }
    }
    var Ho = $.ReactCurrentOwner, zi = $.ReactDebugCurrentFrame;
    function Qn(w) {
      if (w) {
        var K = w._owner, ce = Ie(w.type, w._source, K ? K.type : null);
        zi.setExtraStackFrame(ce);
      } else
        zi.setExtraStackFrame(null);
    }
    var Jr;
    Jr = !1;
    function qo(w) {
      return typeof w == "object" && w !== null && w.$$typeof === n;
    }
    function Wi() {
      {
        if (Ho.current) {
          var w = ee(Ho.current.type);
          if (w)
            return `

Check the render method of \`` + w + "`.";
        }
        return "";
      }
    }
    function Ks(w) {
      return "";
    }
    var Ui = {};
    function Vi(w) {
      {
        var K = Wi();
        if (!K) {
          var ce = typeof w == "string" ? w : w.displayName || w.name;
          ce && (K = `

Check the top-level render call using <` + ce + ">.");
        }
        return K;
      }
    }
    function Hi(w, K) {
      {
        if (!w._store || w._store.validated || w.key != null)
          return;
        w._store.validated = !0;
        var ce = Vi(K);
        if (Ui[ce])
          return;
        Ui[ce] = !0;
        var we = "";
        w && w._owner && w._owner !== Ho.current && (we = " It was passed a child from " + ee(w._owner.type) + "."), Qn(w), N('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ce, we), Qn(null);
      }
    }
    function qi(w, K) {
      {
        if (typeof w != "object")
          return;
        if (xt(w))
          for (var ce = 0; ce < w.length; ce++) {
            var we = w[ce];
            qo(we) && Hi(we, K);
          }
        else if (qo(w))
          w._store && (w._store.validated = !0);
        else if (w) {
          var Ze = E(w);
          if (typeof Ze == "function" && Ze !== w.entries)
            for (var nt = Ze.call(w), Ue; !(Ue = nt.next()).done; )
              qo(Ue.value) && Hi(Ue.value, K);
        }
      }
    }
    function Gs(w) {
      {
        var K = w.type;
        if (K == null || typeof K == "string")
          return;
        var ce;
        if (typeof K == "function")
          ce = K.propTypes;
        else if (typeof K == "object" && (K.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        K.$$typeof === x))
          ce = K.propTypes;
        else
          return;
        if (ce) {
          var we = ee(K);
          It(ce, w.props, "prop", we, w);
        } else if (K.PropTypes !== void 0 && !Jr) {
          Jr = !0;
          var Ze = ee(K);
          N("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ze || "Unknown");
        }
        typeof K.getDefaultProps == "function" && !K.getDefaultProps.isReactClassApproved && N("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Zo(w) {
      {
        for (var K = Object.keys(w.props), ce = 0; ce < K.length; ce++) {
          var we = K[ce];
          if (we !== "children" && we !== "key") {
            Qn(w), N("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", we), Qn(null);
            break;
          }
        }
        w.ref !== null && (Qn(w), N("Invalid attribute `ref` supplied to `React.Fragment`."), Qn(null));
      }
    }
    var Zi = {};
    function Qr(w, K, ce, we, Ze, nt) {
      {
        var Ue = G(w);
        if (!Ue) {
          var Be = "";
          (w === void 0 || typeof w == "object" && w !== null && Object.keys(w).length === 0) && (Be += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Bt = Ks();
          Bt ? Be += Bt : Be += Wi();
          var mt;
          w === null ? mt = "null" : xt(w) ? mt = "array" : w !== void 0 && w.$$typeof === n ? (mt = "<" + (ee(w.type) || "Unknown") + " />", Be = " Did you accidentally export a JSX literal instead of a component?") : mt = typeof w, N("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", mt, Be);
        }
        var _t = Xr(w, K, ce, Ze, nt);
        if (_t == null)
          return _t;
        if (Ue) {
          var zt = K.children;
          if (zt !== void 0)
            if (we)
              if (xt(zt)) {
                for (var pr = 0; pr < zt.length; pr++)
                  qi(zt[pr], w);
                Object.freeze && Object.freeze(zt);
              } else
                N("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              qi(zt, w);
        }
        if (st.call(K, "key")) {
          var Tn = ee(w), Zt = Object.keys(K).filter(function(Ki) {
            return Ki !== "key";
          }), Ko = Zt.length > 0 ? "{key: someKey, " + Zt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Zi[Tn + Ko]) {
            var el = Zt.length > 0 ? "{" + Zt.join(": ..., ") + ": ...}" : "{}";
            N(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ko, Tn, el, Tn), Zi[Tn + Ko] = !0;
          }
        }
        return w === a ? Zo(_t) : Gs(_t), _t;
      }
    }
    function Ys(w, K, ce) {
      return Qr(w, K, ce, !0);
    }
    function Xs(w, K, ce) {
      return Qr(w, K, ce, !1);
    }
    var Js = Xs, Qs = Ys;
    fi.Fragment = a, fi.jsx = Js, fi.jsxs = Qs;
  }()), fi;
}
process.env.NODE_ENV === "production" ? Pu.exports = l6() : Pu.exports = u6();
var v = Pu.exports;
function $e(e, n) {
  if (e == null) return {};
  var o = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (n.indexOf(a) >= 0) continue;
    o[a] = e[a];
  }
  return o;
}
function I() {
  return I = Object.assign ? Object.assign.bind() : function(e) {
    for (var n = 1; n < arguments.length; n++) {
      var o = arguments[n];
      for (var a in o) ({}).hasOwnProperty.call(o, a) && (e[a] = o[a]);
    }
    return e;
  }, I.apply(null, arguments);
}
var Iu = { exports: {} }, Da = { exports: {} }, Je = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var up;
function c6() {
  if (up) return Je;
  up = 1;
  var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, l = e ? Symbol.for("react.strict_mode") : 60108, u = e ? Symbol.for("react.profiler") : 60114, f = e ? Symbol.for("react.provider") : 60109, d = e ? Symbol.for("react.context") : 60110, h = e ? Symbol.for("react.async_mode") : 60111, g = e ? Symbol.for("react.concurrent_mode") : 60111, b = e ? Symbol.for("react.forward_ref") : 60112, x = e ? Symbol.for("react.suspense") : 60113, _ = e ? Symbol.for("react.suspense_list") : 60120, P = e ? Symbol.for("react.memo") : 60115, S = e ? Symbol.for("react.lazy") : 60116, C = e ? Symbol.for("react.block") : 60121, E = e ? Symbol.for("react.fundamental") : 60117, $ = e ? Symbol.for("react.responder") : 60118, N = e ? Symbol.for("react.scope") : 60119;
  function A(O) {
    if (typeof O == "object" && O !== null) {
      var k = O.$$typeof;
      switch (k) {
        case n:
          switch (O = O.type, O) {
            case h:
            case g:
            case a:
            case u:
            case l:
            case x:
              return O;
            default:
              switch (O = O && O.$$typeof, O) {
                case d:
                case b:
                case S:
                case P:
                case f:
                  return O;
                default:
                  return k;
              }
          }
        case o:
          return k;
      }
    }
  }
  function M(O) {
    return A(O) === g;
  }
  return Je.AsyncMode = h, Je.ConcurrentMode = g, Je.ContextConsumer = d, Je.ContextProvider = f, Je.Element = n, Je.ForwardRef = b, Je.Fragment = a, Je.Lazy = S, Je.Memo = P, Je.Portal = o, Je.Profiler = u, Je.StrictMode = l, Je.Suspense = x, Je.isAsyncMode = function(O) {
    return M(O) || A(O) === h;
  }, Je.isConcurrentMode = M, Je.isContextConsumer = function(O) {
    return A(O) === d;
  }, Je.isContextProvider = function(O) {
    return A(O) === f;
  }, Je.isElement = function(O) {
    return typeof O == "object" && O !== null && O.$$typeof === n;
  }, Je.isForwardRef = function(O) {
    return A(O) === b;
  }, Je.isFragment = function(O) {
    return A(O) === a;
  }, Je.isLazy = function(O) {
    return A(O) === S;
  }, Je.isMemo = function(O) {
    return A(O) === P;
  }, Je.isPortal = function(O) {
    return A(O) === o;
  }, Je.isProfiler = function(O) {
    return A(O) === u;
  }, Je.isStrictMode = function(O) {
    return A(O) === l;
  }, Je.isSuspense = function(O) {
    return A(O) === x;
  }, Je.isValidElementType = function(O) {
    return typeof O == "string" || typeof O == "function" || O === a || O === g || O === u || O === l || O === x || O === _ || typeof O == "object" && O !== null && (O.$$typeof === S || O.$$typeof === P || O.$$typeof === f || O.$$typeof === d || O.$$typeof === b || O.$$typeof === E || O.$$typeof === $ || O.$$typeof === N || O.$$typeof === C);
  }, Je.typeOf = A, Je;
}
var Qe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cp;
function f6() {
  return cp || (cp = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, n = e ? Symbol.for("react.element") : 60103, o = e ? Symbol.for("react.portal") : 60106, a = e ? Symbol.for("react.fragment") : 60107, l = e ? Symbol.for("react.strict_mode") : 60108, u = e ? Symbol.for("react.profiler") : 60114, f = e ? Symbol.for("react.provider") : 60109, d = e ? Symbol.for("react.context") : 60110, h = e ? Symbol.for("react.async_mode") : 60111, g = e ? Symbol.for("react.concurrent_mode") : 60111, b = e ? Symbol.for("react.forward_ref") : 60112, x = e ? Symbol.for("react.suspense") : 60113, _ = e ? Symbol.for("react.suspense_list") : 60120, P = e ? Symbol.for("react.memo") : 60115, S = e ? Symbol.for("react.lazy") : 60116, C = e ? Symbol.for("react.block") : 60121, E = e ? Symbol.for("react.fundamental") : 60117, $ = e ? Symbol.for("react.responder") : 60118, N = e ? Symbol.for("react.scope") : 60119;
    function A(Z) {
      return typeof Z == "string" || typeof Z == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      Z === a || Z === g || Z === u || Z === l || Z === x || Z === _ || typeof Z == "object" && Z !== null && (Z.$$typeof === S || Z.$$typeof === P || Z.$$typeof === f || Z.$$typeof === d || Z.$$typeof === b || Z.$$typeof === E || Z.$$typeof === $ || Z.$$typeof === N || Z.$$typeof === C);
    }
    function M(Z) {
      if (typeof Z == "object" && Z !== null) {
        var Ee = Z.$$typeof;
        switch (Ee) {
          case n:
            var H = Z.type;
            switch (H) {
              case h:
              case g:
              case a:
              case u:
              case l:
              case x:
                return H;
              default:
                var Ie = H && H.$$typeof;
                switch (Ie) {
                  case d:
                  case b:
                  case S:
                  case P:
                  case f:
                    return Ie;
                  default:
                    return Ee;
                }
            }
          case o:
            return Ee;
        }
      }
    }
    var O = h, k = g, L = d, J = f, le = n, G = b, ie = a, ae = S, ee = P, Q = o, ne = u, te = l, oe = x, X = !1;
    function Pe(Z) {
      return X || (X = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), W(Z) || M(Z) === h;
    }
    function W(Z) {
      return M(Z) === g;
    }
    function Y(Z) {
      return M(Z) === d;
    }
    function he(Z) {
      return M(Z) === f;
    }
    function pe(Z) {
      return typeof Z == "object" && Z !== null && Z.$$typeof === n;
    }
    function re(Z) {
      return M(Z) === b;
    }
    function fe(Z) {
      return M(Z) === a;
    }
    function ue(Z) {
      return M(Z) === S;
    }
    function ye(Z) {
      return M(Z) === P;
    }
    function ge(Z) {
      return M(Z) === o;
    }
    function me(Z) {
      return M(Z) === u;
    }
    function _e(Z) {
      return M(Z) === l;
    }
    function be(Z) {
      return M(Z) === x;
    }
    Qe.AsyncMode = O, Qe.ConcurrentMode = k, Qe.ContextConsumer = L, Qe.ContextProvider = J, Qe.Element = le, Qe.ForwardRef = G, Qe.Fragment = ie, Qe.Lazy = ae, Qe.Memo = ee, Qe.Portal = Q, Qe.Profiler = ne, Qe.StrictMode = te, Qe.Suspense = oe, Qe.isAsyncMode = Pe, Qe.isConcurrentMode = W, Qe.isContextConsumer = Y, Qe.isContextProvider = he, Qe.isElement = pe, Qe.isForwardRef = re, Qe.isFragment = fe, Qe.isLazy = ue, Qe.isMemo = ye, Qe.isPortal = ge, Qe.isProfiler = me, Qe.isStrictMode = _e, Qe.isSuspense = be, Qe.isValidElementType = A, Qe.typeOf = M;
  }()), Qe;
}
var fp;
function c0() {
  return fp || (fp = 1, process.env.NODE_ENV === "production" ? Da.exports = c6() : Da.exports = f6()), Da.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var fu, dp;
function d6() {
  if (dp) return fu;
  dp = 1;
  var e = Object.getOwnPropertySymbols, n = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
  function a(u) {
    if (u == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(u);
  }
  function l() {
    try {
      if (!Object.assign)
        return !1;
      var u = new String("abc");
      if (u[5] = "de", Object.getOwnPropertyNames(u)[0] === "5")
        return !1;
      for (var f = {}, d = 0; d < 10; d++)
        f["_" + String.fromCharCode(d)] = d;
      var h = Object.getOwnPropertyNames(f).map(function(b) {
        return f[b];
      });
      if (h.join("") !== "0123456789")
        return !1;
      var g = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(b) {
        g[b] = b;
      }), Object.keys(Object.assign({}, g)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return fu = l() ? Object.assign : function(u, f) {
    for (var d, h = a(u), g, b = 1; b < arguments.length; b++) {
      d = Object(arguments[b]);
      for (var x in d)
        n.call(d, x) && (h[x] = d[x]);
      if (e) {
        g = e(d);
        for (var _ = 0; _ < g.length; _++)
          o.call(d, g[_]) && (h[g[_]] = d[g[_]]);
      }
    }
    return h;
  }, fu;
}
var du, pp;
function rc() {
  if (pp) return du;
  pp = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return du = e, du;
}
var pu, hp;
function f0() {
  return hp || (hp = 1, pu = Function.call.bind(Object.prototype.hasOwnProperty)), pu;
}
var hu, gp;
function p6() {
  if (gp) return hu;
  gp = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var n = rc(), o = {}, a = f0();
    e = function(u) {
      var f = "Warning: " + u;
      typeof console < "u" && console.error(f);
      try {
        throw new Error(f);
      } catch {
      }
    };
  }
  function l(u, f, d, h, g) {
    if (process.env.NODE_ENV !== "production") {
      for (var b in u)
        if (a(u, b)) {
          var x;
          try {
            if (typeof u[b] != "function") {
              var _ = Error(
                (h || "React class") + ": " + d + " type `" + b + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[b] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw _.name = "Invariant Violation", _;
            }
            x = u[b](f, b, h, d, null, n);
          } catch (S) {
            x = S;
          }
          if (x && !(x instanceof Error) && e(
            (h || "React class") + ": type specification of " + d + " `" + b + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof x + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), x instanceof Error && !(x.message in o)) {
            o[x.message] = !0;
            var P = g ? g() : "";
            e(
              "Failed " + d + " type: " + x.message + (P ?? "")
            );
          }
        }
    }
  }
  return l.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (o = {});
  }, hu = l, hu;
}
var gu, mp;
function h6() {
  if (mp) return gu;
  mp = 1;
  var e = c0(), n = d6(), o = rc(), a = f0(), l = p6(), u = function() {
  };
  process.env.NODE_ENV !== "production" && (u = function(d) {
    var h = "Warning: " + d;
    typeof console < "u" && console.error(h);
    try {
      throw new Error(h);
    } catch {
    }
  });
  function f() {
    return null;
  }
  return gu = function(d, h) {
    var g = typeof Symbol == "function" && Symbol.iterator, b = "@@iterator";
    function x(W) {
      var Y = W && (g && W[g] || W[b]);
      if (typeof Y == "function")
        return Y;
    }
    var _ = "<<anonymous>>", P = {
      array: $("array"),
      bigint: $("bigint"),
      bool: $("boolean"),
      func: $("function"),
      number: $("number"),
      object: $("object"),
      string: $("string"),
      symbol: $("symbol"),
      any: N(),
      arrayOf: A,
      element: M(),
      elementType: O(),
      instanceOf: k,
      node: G(),
      objectOf: J,
      oneOf: L,
      oneOfType: le,
      shape: ae,
      exact: ee
    };
    function S(W, Y) {
      return W === Y ? W !== 0 || 1 / W === 1 / Y : W !== W && Y !== Y;
    }
    function C(W, Y) {
      this.message = W, this.data = Y && typeof Y == "object" ? Y : {}, this.stack = "";
    }
    C.prototype = Error.prototype;
    function E(W) {
      if (process.env.NODE_ENV !== "production")
        var Y = {}, he = 0;
      function pe(fe, ue, ye, ge, me, _e, be) {
        if (ge = ge || _, _e = _e || ye, be !== o) {
          if (h) {
            var Z = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw Z.name = "Invariant Violation", Z;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ee = ge + ":" + ye;
            !Y[Ee] && // Avoid spamming the console because they are often not actionable except for lib authors
            he < 3 && (u(
              "You are manually calling a React.PropTypes validation function for the `" + _e + "` prop on `" + ge + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), Y[Ee] = !0, he++);
          }
        }
        return ue[ye] == null ? fe ? ue[ye] === null ? new C("The " + me + " `" + _e + "` is marked as required " + ("in `" + ge + "`, but its value is `null`.")) : new C("The " + me + " `" + _e + "` is marked as required in " + ("`" + ge + "`, but its value is `undefined`.")) : null : W(ue, ye, ge, me, _e);
      }
      var re = pe.bind(null, !1);
      return re.isRequired = pe.bind(null, !0), re;
    }
    function $(W) {
      function Y(he, pe, re, fe, ue, ye) {
        var ge = he[pe], me = te(ge);
        if (me !== W) {
          var _e = oe(ge);
          return new C(
            "Invalid " + fe + " `" + ue + "` of type " + ("`" + _e + "` supplied to `" + re + "`, expected ") + ("`" + W + "`."),
            { expectedType: W }
          );
        }
        return null;
      }
      return E(Y);
    }
    function N() {
      return E(f);
    }
    function A(W) {
      function Y(he, pe, re, fe, ue) {
        if (typeof W != "function")
          return new C("Property `" + ue + "` of component `" + re + "` has invalid PropType notation inside arrayOf.");
        var ye = he[pe];
        if (!Array.isArray(ye)) {
          var ge = te(ye);
          return new C("Invalid " + fe + " `" + ue + "` of type " + ("`" + ge + "` supplied to `" + re + "`, expected an array."));
        }
        for (var me = 0; me < ye.length; me++) {
          var _e = W(ye, me, re, fe, ue + "[" + me + "]", o);
          if (_e instanceof Error)
            return _e;
        }
        return null;
      }
      return E(Y);
    }
    function M() {
      function W(Y, he, pe, re, fe) {
        var ue = Y[he];
        if (!d(ue)) {
          var ye = te(ue);
          return new C("Invalid " + re + " `" + fe + "` of type " + ("`" + ye + "` supplied to `" + pe + "`, expected a single ReactElement."));
        }
        return null;
      }
      return E(W);
    }
    function O() {
      function W(Y, he, pe, re, fe) {
        var ue = Y[he];
        if (!e.isValidElementType(ue)) {
          var ye = te(ue);
          return new C("Invalid " + re + " `" + fe + "` of type " + ("`" + ye + "` supplied to `" + pe + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return E(W);
    }
    function k(W) {
      function Y(he, pe, re, fe, ue) {
        if (!(he[pe] instanceof W)) {
          var ye = W.name || _, ge = Pe(he[pe]);
          return new C("Invalid " + fe + " `" + ue + "` of type " + ("`" + ge + "` supplied to `" + re + "`, expected ") + ("instance of `" + ye + "`."));
        }
        return null;
      }
      return E(Y);
    }
    function L(W) {
      if (!Array.isArray(W))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? u(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : u("Invalid argument supplied to oneOf, expected an array.")), f;
      function Y(he, pe, re, fe, ue) {
        for (var ye = he[pe], ge = 0; ge < W.length; ge++)
          if (S(ye, W[ge]))
            return null;
        var me = JSON.stringify(W, function(be, Z) {
          var Ee = oe(Z);
          return Ee === "symbol" ? String(Z) : Z;
        });
        return new C("Invalid " + fe + " `" + ue + "` of value `" + String(ye) + "` " + ("supplied to `" + re + "`, expected one of " + me + "."));
      }
      return E(Y);
    }
    function J(W) {
      function Y(he, pe, re, fe, ue) {
        if (typeof W != "function")
          return new C("Property `" + ue + "` of component `" + re + "` has invalid PropType notation inside objectOf.");
        var ye = he[pe], ge = te(ye);
        if (ge !== "object")
          return new C("Invalid " + fe + " `" + ue + "` of type " + ("`" + ge + "` supplied to `" + re + "`, expected an object."));
        for (var me in ye)
          if (a(ye, me)) {
            var _e = W(ye, me, re, fe, ue + "." + me, o);
            if (_e instanceof Error)
              return _e;
          }
        return null;
      }
      return E(Y);
    }
    function le(W) {
      if (!Array.isArray(W))
        return process.env.NODE_ENV !== "production" && u("Invalid argument supplied to oneOfType, expected an instance of array."), f;
      for (var Y = 0; Y < W.length; Y++) {
        var he = W[Y];
        if (typeof he != "function")
          return u(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + X(he) + " at index " + Y + "."
          ), f;
      }
      function pe(re, fe, ue, ye, ge) {
        for (var me = [], _e = 0; _e < W.length; _e++) {
          var be = W[_e], Z = be(re, fe, ue, ye, ge, o);
          if (Z == null)
            return null;
          Z.data && a(Z.data, "expectedType") && me.push(Z.data.expectedType);
        }
        var Ee = me.length > 0 ? ", expected one of type [" + me.join(", ") + "]" : "";
        return new C("Invalid " + ye + " `" + ge + "` supplied to " + ("`" + ue + "`" + Ee + "."));
      }
      return E(pe);
    }
    function G() {
      function W(Y, he, pe, re, fe) {
        return Q(Y[he]) ? null : new C("Invalid " + re + " `" + fe + "` supplied to " + ("`" + pe + "`, expected a ReactNode."));
      }
      return E(W);
    }
    function ie(W, Y, he, pe, re) {
      return new C(
        (W || "React class") + ": " + Y + " type `" + he + "." + pe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + re + "`."
      );
    }
    function ae(W) {
      function Y(he, pe, re, fe, ue) {
        var ye = he[pe], ge = te(ye);
        if (ge !== "object")
          return new C("Invalid " + fe + " `" + ue + "` of type `" + ge + "` " + ("supplied to `" + re + "`, expected `object`."));
        for (var me in W) {
          var _e = W[me];
          if (typeof _e != "function")
            return ie(re, fe, ue, me, oe(_e));
          var be = _e(ye, me, re, fe, ue + "." + me, o);
          if (be)
            return be;
        }
        return null;
      }
      return E(Y);
    }
    function ee(W) {
      function Y(he, pe, re, fe, ue) {
        var ye = he[pe], ge = te(ye);
        if (ge !== "object")
          return new C("Invalid " + fe + " `" + ue + "` of type `" + ge + "` " + ("supplied to `" + re + "`, expected `object`."));
        var me = n({}, he[pe], W);
        for (var _e in me) {
          var be = W[_e];
          if (a(W, _e) && typeof be != "function")
            return ie(re, fe, ue, _e, oe(be));
          if (!be)
            return new C(
              "Invalid " + fe + " `" + ue + "` key `" + _e + "` supplied to `" + re + "`.\nBad object: " + JSON.stringify(he[pe], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(W), null, "  ")
            );
          var Z = be(ye, _e, re, fe, ue + "." + _e, o);
          if (Z)
            return Z;
        }
        return null;
      }
      return E(Y);
    }
    function Q(W) {
      switch (typeof W) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !W;
        case "object":
          if (Array.isArray(W))
            return W.every(Q);
          if (W === null || d(W))
            return !0;
          var Y = x(W);
          if (Y) {
            var he = Y.call(W), pe;
            if (Y !== W.entries) {
              for (; !(pe = he.next()).done; )
                if (!Q(pe.value))
                  return !1;
            } else
              for (; !(pe = he.next()).done; ) {
                var re = pe.value;
                if (re && !Q(re[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function ne(W, Y) {
      return W === "symbol" ? !0 : Y ? Y["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && Y instanceof Symbol : !1;
    }
    function te(W) {
      var Y = typeof W;
      return Array.isArray(W) ? "array" : W instanceof RegExp ? "object" : ne(Y, W) ? "symbol" : Y;
    }
    function oe(W) {
      if (typeof W > "u" || W === null)
        return "" + W;
      var Y = te(W);
      if (Y === "object") {
        if (W instanceof Date)
          return "date";
        if (W instanceof RegExp)
          return "regexp";
      }
      return Y;
    }
    function X(W) {
      var Y = oe(W);
      switch (Y) {
        case "array":
        case "object":
          return "an " + Y;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + Y;
        default:
          return Y;
      }
    }
    function Pe(W) {
      return !W.constructor || !W.constructor.name ? _ : W.constructor.name;
    }
    return P.checkPropTypes = l, P.resetWarningCache = l.resetWarningCache, P.PropTypes = P, P;
  }, gu;
}
var mu, vp;
function g6() {
  if (vp) return mu;
  vp = 1;
  var e = rc();
  function n() {
  }
  function o() {
  }
  return o.resetWarningCache = n, mu = function() {
    function a(f, d, h, g, b, x) {
      if (x !== e) {
        var _ = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw _.name = "Invariant Violation", _;
      }
    }
    a.isRequired = a;
    function l() {
      return a;
    }
    var u = {
      array: a,
      bigint: a,
      bool: a,
      func: a,
      number: a,
      object: a,
      string: a,
      symbol: a,
      any: a,
      arrayOf: l,
      element: a,
      elementType: a,
      instanceOf: l,
      node: a,
      objectOf: l,
      oneOf: l,
      oneOfType: l,
      shape: l,
      exact: l,
      checkPropTypes: o,
      resetWarningCache: n
    };
    return u.PropTypes = u, u;
  }, mu;
}
if (process.env.NODE_ENV !== "production") {
  var m6 = c0(), v6 = !0;
  Iu.exports = h6()(m6.isElement, v6);
} else
  Iu.exports = g6()();
var y6 = Iu.exports;
const i = /* @__PURE__ */ gs(y6);
function d0(e) {
  var n, o, a = "";
  if (typeof e == "string" || typeof e == "number") a += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var l = e.length;
    for (n = 0; n < l; n++) e[n] && (o = d0(e[n])) && (a && (a += " "), a += o);
  } else for (o in e) e[o] && (a && (a += " "), a += o);
  return a;
}
function He() {
  for (var e, n, o = 0, a = "", l = arguments.length; o < l; o++) (e = arguments[o]) && (n = d0(e)) && (a && (a += " "), a += n);
  return a;
}
function oc(e, n) {
  const o = I({}, n);
  return Object.keys(e).forEach((a) => {
    if (a.toString().match(/^(components|slots)$/))
      o[a] = I({}, e[a], o[a]);
    else if (a.toString().match(/^(componentsProps|slotProps)$/)) {
      const l = e[a] || {}, u = n[a];
      o[a] = {}, !u || !Object.keys(u) ? o[a] = l : !l || !Object.keys(l) ? o[a] = u : (o[a] = I({}, u), Object.keys(l).forEach((f) => {
        o[a][f] = oc(l[f], u[f]);
      }));
    } else o[a] === void 0 && (o[a] = e[a]);
  }), o;
}
function yt(e, n, o = void 0) {
  const a = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (l) => {
      a[l] = e[l].reduce((u, f) => {
        if (f) {
          const d = n(f);
          d !== "" && u.push(d), o && o[f] && u.push(o[f]);
        }
        return u;
      }, []).join(" ");
    }
  ), a;
}
var $t = {}, p0 = { exports: {} };
(function(e) {
  function n(o) {
    return o && o.__esModule ? o : {
      default: o
    };
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(p0);
var h0 = p0.exports;
function Kr(e) {
  let n = "https://mui.com/production-error/?code=" + e;
  for (let o = 1; o < arguments.length; o += 1)
    n += "&args[]=" + encodeURIComponent(arguments[o]);
  return "Minified MUI error #" + e + "; visit " + n + " for the full message.";
}
const b6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kr
}, Symbol.toStringTag, { value: "Module" })), x6 = /* @__PURE__ */ Sr(b6);
function _6(e, n = Number.MIN_SAFE_INTEGER, o = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, o));
}
const E6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _6
}, Symbol.toStringTag, { value: "Module" })), T6 = /* @__PURE__ */ Sr(E6);
var g0 = h0;
Object.defineProperty($t, "__esModule", {
  value: !0
});
var Or = $t.alpha = b0;
$t.blend = M6;
$t.colorChannel = void 0;
var Au = $t.darken = ac;
$t.decomposeColor = Dn;
$t.emphasize = x0;
var yp = $t.getContrastRatio = R6;
$t.getLuminance = Ja;
$t.hexToRgb = m0;
$t.hslToRgb = y0;
var Mu = $t.lighten = sc;
$t.private_safeAlpha = $6;
$t.private_safeColorChannel = void 0;
$t.private_safeDarken = P6;
$t.private_safeEmphasize = A6;
$t.private_safeLighten = I6;
$t.recomposeColor = Po;
$t.rgbToHex = w6;
var bp = g0(x6), C6 = g0(T6);
function ic(e, n = 0, o = 1) {
  return process.env.NODE_ENV !== "production" && (e < n || e > o) && console.error(`MUI: The value provided ${e} is out of range [${n}, ${o}].`), (0, C6.default)(e, n, o);
}
function m0(e) {
  e = e.slice(1);
  const n = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let o = e.match(n);
  return o && o[0].length === 1 && (o = o.map((a) => a + a)), o ? `rgb${o.length === 4 ? "a" : ""}(${o.map((a, l) => l < 3 ? parseInt(a, 16) : Math.round(parseInt(a, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function O6(e) {
  const n = e.toString(16);
  return n.length === 1 ? `0${n}` : n;
}
function Dn(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Dn(m0(e));
  const n = e.indexOf("("), o = e.substring(0, n);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(o) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : (0, bp.default)(9, e));
  let a = e.substring(n + 1, e.length - 1), l;
  if (o === "color") {
    if (a = a.split(" "), l = a.shift(), a.length === 4 && a[3].charAt(0) === "/" && (a[3] = a[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(l) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${l}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : (0, bp.default)(10, l));
  } else
    a = a.split(",");
  return a = a.map((u) => parseFloat(u)), {
    type: o,
    values: a,
    colorSpace: l
  };
}
const v0 = (e) => {
  const n = Dn(e);
  return n.values.slice(0, 3).map((o, a) => n.type.indexOf("hsl") !== -1 && a !== 0 ? `${o}%` : o).join(" ");
};
$t.colorChannel = v0;
const S6 = (e, n) => {
  try {
    return v0(e);
  } catch {
    return n && process.env.NODE_ENV !== "production" && console.warn(n), e;
  }
};
$t.private_safeColorChannel = S6;
function Po(e) {
  const {
    type: n,
    colorSpace: o
  } = e;
  let {
    values: a
  } = e;
  return n.indexOf("rgb") !== -1 ? a = a.map((l, u) => u < 3 ? parseInt(l, 10) : l) : n.indexOf("hsl") !== -1 && (a[1] = `${a[1]}%`, a[2] = `${a[2]}%`), n.indexOf("color") !== -1 ? a = `${o} ${a.join(" ")}` : a = `${a.join(", ")}`, `${n}(${a})`;
}
function w6(e) {
  if (e.indexOf("#") === 0)
    return e;
  const {
    values: n
  } = Dn(e);
  return `#${n.map((o, a) => O6(a === 3 ? Math.round(255 * o) : o)).join("")}`;
}
function y0(e) {
  e = Dn(e);
  const {
    values: n
  } = e, o = n[0], a = n[1] / 100, l = n[2] / 100, u = a * Math.min(l, 1 - l), f = (g, b = (g + o / 30) % 12) => l - u * Math.max(Math.min(b - 3, 9 - b, 1), -1);
  let d = "rgb";
  const h = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  return e.type === "hsla" && (d += "a", h.push(n[3])), Po({
    type: d,
    values: h
  });
}
function Ja(e) {
  e = Dn(e);
  let n = e.type === "hsl" || e.type === "hsla" ? Dn(y0(e)).values : e.values;
  return n = n.map((o) => (e.type !== "color" && (o /= 255), o <= 0.03928 ? o / 12.92 : ((o + 0.055) / 1.055) ** 2.4)), Number((0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]).toFixed(3));
}
function R6(e, n) {
  const o = Ja(e), a = Ja(n);
  return (Math.max(o, a) + 0.05) / (Math.min(o, a) + 0.05);
}
function b0(e, n) {
  return e = Dn(e), n = ic(n), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${n}` : e.values[3] = n, Po(e);
}
function $6(e, n, o) {
  try {
    return b0(e, n);
  } catch {
    return o && process.env.NODE_ENV !== "production" && console.warn(o), e;
  }
}
function ac(e, n) {
  if (e = Dn(e), n = ic(n), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - n;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let o = 0; o < 3; o += 1)
      e.values[o] *= 1 - n;
  return Po(e);
}
function P6(e, n, o) {
  try {
    return ac(e, n);
  } catch {
    return o && process.env.NODE_ENV !== "production" && console.warn(o), e;
  }
}
function sc(e, n) {
  if (e = Dn(e), n = ic(n), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * n;
  else if (e.type.indexOf("rgb") !== -1)
    for (let o = 0; o < 3; o += 1)
      e.values[o] += (255 - e.values[o]) * n;
  else if (e.type.indexOf("color") !== -1)
    for (let o = 0; o < 3; o += 1)
      e.values[o] += (1 - e.values[o]) * n;
  return Po(e);
}
function I6(e, n, o) {
  try {
    return sc(e, n);
  } catch {
    return o && process.env.NODE_ENV !== "production" && console.warn(o), e;
  }
}
function x0(e, n = 0.15) {
  return Ja(e) > 0.5 ? ac(e, n) : sc(e, n);
}
function A6(e, n, o) {
  try {
    return x0(e, n);
  } catch {
    return o && process.env.NODE_ENV !== "production" && console.warn(o), e;
  }
}
function M6(e, n, o, a = 1) {
  const l = (h, g) => Math.round((h ** (1 / a) * (1 - o) + g ** (1 / a) * o) ** a), u = Dn(e), f = Dn(n), d = [l(u.values[0], f.values[0]), l(u.values[1], f.values[1]), l(u.values[2], f.values[2])];
  return Po({
    type: "rgb",
    values: d
  });
}
var Pi = {}, vu = { exports: {} }, xp;
function N6() {
  return xp || (xp = 1, function(e) {
    function n() {
      return e.exports = n = Object.assign ? Object.assign.bind() : function(o) {
        for (var a = 1; a < arguments.length; a++) {
          var l = arguments[a];
          for (var u in l) ({}).hasOwnProperty.call(l, u) && (o[u] = l[u]);
        }
        return o;
      }, e.exports.__esModule = !0, e.exports.default = e.exports, n.apply(null, arguments);
    }
    e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(vu)), vu.exports;
}
var yu = { exports: {} }, _p;
function j6() {
  return _p || (_p = 1, function(e) {
    function n(o, a) {
      if (o == null) return {};
      var l = {};
      for (var u in o) if ({}.hasOwnProperty.call(o, u)) {
        if (a.indexOf(u) >= 0) continue;
        l[u] = o[u];
      }
      return l;
    }
    e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(yu)), yu.exports;
}
function D6(e) {
  if (e.sheet)
    return e.sheet;
  for (var n = 0; n < document.styleSheets.length; n++)
    if (document.styleSheets[n].ownerNode === e)
      return document.styleSheets[n];
}
function F6(e) {
  var n = document.createElement("style");
  return n.setAttribute("data-emotion", e.key), e.nonce !== void 0 && n.setAttribute("nonce", e.nonce), n.appendChild(document.createTextNode("")), n.setAttribute("data-s", ""), n;
}
var k6 = /* @__PURE__ */ function() {
  function e(o) {
    var a = this;
    this._insertTag = function(l) {
      var u;
      a.tags.length === 0 ? a.insertionPoint ? u = a.insertionPoint.nextSibling : a.prepend ? u = a.container.firstChild : u = a.before : u = a.tags[a.tags.length - 1].nextSibling, a.container.insertBefore(l, u), a.tags.push(l);
    }, this.isSpeedy = o.speedy === void 0 ? process.env.NODE_ENV === "production" : o.speedy, this.tags = [], this.ctr = 0, this.nonce = o.nonce, this.key = o.key, this.container = o.container, this.prepend = o.prepend, this.insertionPoint = o.insertionPoint, this.before = null;
  }
  var n = e.prototype;
  return n.hydrate = function(a) {
    a.forEach(this._insertTag);
  }, n.insert = function(a) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(F6(this));
    var l = this.tags[this.tags.length - 1];
    if (process.env.NODE_ENV !== "production") {
      var u = a.charCodeAt(0) === 64 && a.charCodeAt(1) === 105;
      u && this._alreadyInsertedOrderInsensitiveRule && console.error(`You're attempting to insert the following rule:
` + a + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules."), this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !u;
    }
    if (this.isSpeedy) {
      var f = D6(l);
      try {
        f.insertRule(a, f.cssRules.length);
      } catch (d) {
        process.env.NODE_ENV !== "production" && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(a) && console.error('There was a problem inserting the following rule: "' + a + '"', d);
      }
    } else
      l.appendChild(document.createTextNode(a));
    this.ctr++;
  }, n.flush = function() {
    this.tags.forEach(function(a) {
      return a.parentNode && a.parentNode.removeChild(a);
    }), this.tags = [], this.ctr = 0, process.env.NODE_ENV !== "production" && (this._alreadyInsertedOrderInsensitiveRule = !1);
  }, e;
}(), Yt = "-ms-", Qa = "-moz-", Ge = "-webkit-", lc = "comm", uc = "rule", cc = "decl", L6 = "@import", _0 = "@keyframes", B6 = "@layer", z6 = Math.abs, ms = String.fromCharCode, W6 = Object.assign;
function U6(e, n) {
  return qt(e, 0) ^ 45 ? (((n << 2 ^ qt(e, 0)) << 2 ^ qt(e, 1)) << 2 ^ qt(e, 2)) << 2 ^ qt(e, 3) : 0;
}
function E0(e) {
  return e.trim();
}
function V6(e, n) {
  return (e = n.exec(e)) ? e[0] : e;
}
function Ye(e, n, o) {
  return e.replace(n, o);
}
function Nu(e, n) {
  return e.indexOf(n);
}
function qt(e, n) {
  return e.charCodeAt(n) | 0;
}
function Ti(e, n, o) {
  return e.slice(n, o);
}
function qn(e) {
  return e.length;
}
function fc(e) {
  return e.length;
}
function Fa(e, n) {
  return n.push(e), e;
}
function H6(e, n) {
  return e.map(n).join("");
}
var vs = 1, Oo = 1, T0 = 0, sn = 0, Mt = 0, Io = "";
function ys(e, n, o, a, l, u, f) {
  return { value: e, root: n, parent: o, type: a, props: l, children: u, line: vs, column: Oo, length: f, return: "" };
}
function di(e, n) {
  return W6(ys("", null, null, "", null, null, 0), e, { length: -e.length }, n);
}
function q6() {
  return Mt;
}
function Z6() {
  return Mt = sn > 0 ? qt(Io, --sn) : 0, Oo--, Mt === 10 && (Oo = 1, vs--), Mt;
}
function vn() {
  return Mt = sn < T0 ? qt(Io, sn++) : 0, Oo++, Mt === 10 && (Oo = 1, vs++), Mt;
}
function Gn() {
  return qt(Io, sn);
}
function Ha() {
  return sn;
}
function Ii(e, n) {
  return Ti(Io, e, n);
}
function Ci(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function C0(e) {
  return vs = Oo = 1, T0 = qn(Io = e), sn = 0, [];
}
function O0(e) {
  return Io = "", e;
}
function qa(e) {
  return E0(Ii(sn - 1, ju(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function K6(e) {
  for (; (Mt = Gn()) && Mt < 33; )
    vn();
  return Ci(e) > 2 || Ci(Mt) > 3 ? "" : " ";
}
function G6(e, n) {
  for (; --n && vn() && !(Mt < 48 || Mt > 102 || Mt > 57 && Mt < 65 || Mt > 70 && Mt < 97); )
    ;
  return Ii(e, Ha() + (n < 6 && Gn() == 32 && vn() == 32));
}
function ju(e) {
  for (; vn(); )
    switch (Mt) {
      case e:
        return sn;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ju(Mt);
        break;
      case 40:
        e === 41 && ju(e);
        break;
      case 92:
        vn();
        break;
    }
  return sn;
}
function Y6(e, n) {
  for (; vn() && e + Mt !== 57; )
    if (e + Mt === 84 && Gn() === 47)
      break;
  return "/*" + Ii(n, sn - 1) + "*" + ms(e === 47 ? e : vn());
}
function X6(e) {
  for (; !Ci(Gn()); )
    vn();
  return Ii(e, sn);
}
function J6(e) {
  return O0(Za("", null, null, null, [""], e = C0(e), 0, [0], e));
}
function Za(e, n, o, a, l, u, f, d, h) {
  for (var g = 0, b = 0, x = f, _ = 0, P = 0, S = 0, C = 1, E = 1, $ = 1, N = 0, A = "", M = l, O = u, k = a, L = A; E; )
    switch (S = N, N = vn()) {
      case 40:
        if (S != 108 && qt(L, x - 1) == 58) {
          Nu(L += Ye(qa(N), "&", "&\f"), "&\f") != -1 && ($ = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        L += qa(N);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        L += K6(S);
        break;
      case 92:
        L += G6(Ha() - 1, 7);
        continue;
      case 47:
        switch (Gn()) {
          case 42:
          case 47:
            Fa(Q6(Y6(vn(), Ha()), n, o), h);
            break;
          default:
            L += "/";
        }
        break;
      case 123 * C:
        d[g++] = qn(L) * $;
      case 125 * C:
      case 59:
      case 0:
        switch (N) {
          case 0:
          case 125:
            E = 0;
          case 59 + b:
            $ == -1 && (L = Ye(L, /\f/g, "")), P > 0 && qn(L) - x && Fa(P > 32 ? Tp(L + ";", a, o, x - 1) : Tp(Ye(L, " ", "") + ";", a, o, x - 2), h);
            break;
          case 59:
            L += ";";
          default:
            if (Fa(k = Ep(L, n, o, g, b, l, d, A, M = [], O = [], x), u), N === 123)
              if (b === 0)
                Za(L, n, k, k, M, u, x, d, O);
              else
                switch (_ === 99 && qt(L, 3) === 110 ? 100 : _) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Za(e, k, k, a && Fa(Ep(e, k, k, 0, 0, l, d, A, l, M = [], x), O), l, O, x, d, a ? M : O);
                    break;
                  default:
                    Za(L, k, k, k, [""], O, 0, d, O);
                }
        }
        g = b = P = 0, C = $ = 1, A = L = "", x = f;
        break;
      case 58:
        x = 1 + qn(L), P = S;
      default:
        if (C < 1) {
          if (N == 123)
            --C;
          else if (N == 125 && C++ == 0 && Z6() == 125)
            continue;
        }
        switch (L += ms(N), N * C) {
          case 38:
            $ = b > 0 ? 1 : (L += "\f", -1);
            break;
          case 44:
            d[g++] = (qn(L) - 1) * $, $ = 1;
            break;
          case 64:
            Gn() === 45 && (L += qa(vn())), _ = Gn(), b = x = qn(A = L += X6(Ha())), N++;
            break;
          case 45:
            S === 45 && qn(L) == 2 && (C = 0);
        }
    }
  return u;
}
function Ep(e, n, o, a, l, u, f, d, h, g, b) {
  for (var x = l - 1, _ = l === 0 ? u : [""], P = fc(_), S = 0, C = 0, E = 0; S < a; ++S)
    for (var $ = 0, N = Ti(e, x + 1, x = z6(C = f[S])), A = e; $ < P; ++$)
      (A = E0(C > 0 ? _[$] + " " + N : Ye(N, /&\f/g, _[$]))) && (h[E++] = A);
  return ys(e, n, o, l === 0 ? uc : d, h, g, b);
}
function Q6(e, n, o) {
  return ys(e, n, o, lc, ms(q6()), Ti(e, 2, -2), 0);
}
function Tp(e, n, o, a) {
  return ys(e, n, o, cc, Ti(e, 0, a), Ti(e, a + 1, -1), a);
}
function To(e, n) {
  for (var o = "", a = fc(e), l = 0; l < a; l++)
    o += n(e[l], l, e, n) || "";
  return o;
}
function e7(e, n, o, a) {
  switch (e.type) {
    case B6:
      if (e.children.length) break;
    case L6:
    case cc:
      return e.return = e.return || e.value;
    case lc:
      return "";
    case _0:
      return e.return = e.value + "{" + To(e.children, a) + "}";
    case uc:
      e.value = e.props.join(",");
  }
  return qn(o = To(e.children, a)) ? e.return = e.value + "{" + o + "}" : "";
}
function t7(e) {
  var n = fc(e);
  return function(o, a, l, u) {
    for (var f = "", d = 0; d < n; d++)
      f += e[d](o, a, l, u) || "";
    return f;
  };
}
function n7(e) {
  return function(n) {
    n.root || (n = n.return) && e(n);
  };
}
var r7 = function(n, o, a) {
  for (var l = 0, u = 0; l = u, u = Gn(), l === 38 && u === 12 && (o[a] = 1), !Ci(u); )
    vn();
  return Ii(n, sn);
}, o7 = function(n, o) {
  var a = -1, l = 44;
  do
    switch (Ci(l)) {
      case 0:
        l === 38 && Gn() === 12 && (o[a] = 1), n[a] += r7(sn - 1, o, a);
        break;
      case 2:
        n[a] += qa(l);
        break;
      case 4:
        if (l === 44) {
          n[++a] = Gn() === 58 ? "&\f" : "", o[a] = n[a].length;
          break;
        }
      default:
        n[a] += ms(l);
    }
  while (l = vn());
  return n;
}, i7 = function(n, o) {
  return O0(o7(C0(n), o));
}, Cp = /* @__PURE__ */ new WeakMap(), a7 = function(n) {
  if (!(n.type !== "rule" || !n.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  n.length < 1)) {
    for (var o = n.value, a = n.parent, l = n.column === a.column && n.line === a.line; a.type !== "rule"; )
      if (a = a.parent, !a) return;
    if (!(n.props.length === 1 && o.charCodeAt(0) !== 58 && !Cp.get(a)) && !l) {
      Cp.set(n, !0);
      for (var u = [], f = i7(o, u), d = a.props, h = 0, g = 0; h < f.length; h++)
        for (var b = 0; b < d.length; b++, g++)
          n.props[g] = u[h] ? f[h].replace(/&\f/g, d[b]) : d[b] + " " + f[h];
    }
  }
}, s7 = function(n) {
  if (n.type === "decl") {
    var o = n.value;
    // charcode for l
    o.charCodeAt(0) === 108 && // charcode for b
    o.charCodeAt(2) === 98 && (n.return = "", n.value = "");
  }
}, l7 = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason", u7 = function(n) {
  return n.type === "comm" && n.children.indexOf(l7) > -1;
}, c7 = function(n) {
  return function(o, a, l) {
    if (!(o.type !== "rule" || n.compat)) {
      var u = o.value.match(/(:first|:nth|:nth-last)-child/g);
      if (u) {
        for (var f = !!o.parent, d = f ? o.parent.children : (
          // global rule at the root level
          l
        ), h = d.length - 1; h >= 0; h--) {
          var g = d[h];
          if (g.line < o.line)
            break;
          if (g.column < o.column) {
            if (u7(g))
              return;
            break;
          }
        }
        u.forEach(function(b) {
          console.error('The pseudo class "' + b + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + b.split("-child")[0] + '-of-type".');
        });
      }
    }
  };
}, S0 = function(n) {
  return n.type.charCodeAt(1) === 105 && n.type.charCodeAt(0) === 64;
}, f7 = function(n, o) {
  for (var a = n - 1; a >= 0; a--)
    if (!S0(o[a]))
      return !0;
  return !1;
}, Op = function(n) {
  n.type = "", n.value = "", n.return = "", n.children = "", n.props = "";
}, d7 = function(n, o, a) {
  S0(n) && (n.parent ? (console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."), Op(n)) : f7(o, a) && (console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."), Op(n)));
};
function w0(e, n) {
  switch (U6(e, n)) {
    case 5103:
      return Ge + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Ge + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Ge + e + Qa + e + Yt + e + e;
    case 6828:
    case 4268:
      return Ge + e + Yt + e + e;
    case 6165:
      return Ge + e + Yt + "flex-" + e + e;
    case 5187:
      return Ge + e + Ye(e, /(\w+).+(:[^]+)/, Ge + "box-$1$2" + Yt + "flex-$1$2") + e;
    case 5443:
      return Ge + e + Yt + "flex-item-" + Ye(e, /flex-|-self/, "") + e;
    case 4675:
      return Ge + e + Yt + "flex-line-pack" + Ye(e, /align-content|flex-|-self/, "") + e;
    case 5548:
      return Ge + e + Yt + Ye(e, "shrink", "negative") + e;
    case 5292:
      return Ge + e + Yt + Ye(e, "basis", "preferred-size") + e;
    case 6060:
      return Ge + "box-" + Ye(e, "-grow", "") + Ge + e + Yt + Ye(e, "grow", "positive") + e;
    case 4554:
      return Ge + Ye(e, /([^-])(transform)/g, "$1" + Ge + "$2") + e;
    case 6187:
      return Ye(Ye(Ye(e, /(zoom-|grab)/, Ge + "$1"), /(image-set)/, Ge + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return Ye(e, /(image-set\([^]*)/, Ge + "$1$`$1");
    case 4968:
      return Ye(Ye(e, /(.+:)(flex-)?(.*)/, Ge + "box-pack:$3" + Yt + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Ge + e + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return Ye(e, /(.+)-inline(.+)/, Ge + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (qn(e) - 1 - n > 6) switch (qt(e, n + 1)) {
        case 109:
          if (qt(e, n + 4) !== 45) break;
        case 102:
          return Ye(e, /(.+:)(.+)-([^]+)/, "$1" + Ge + "$2-$3$1" + Qa + (qt(e, n + 3) == 108 ? "$3" : "$2-$3")) + e;
        case 115:
          return ~Nu(e, "stretch") ? w0(Ye(e, "stretch", "fill-available"), n) + e : e;
      }
      break;
    case 4949:
      if (qt(e, n + 1) !== 115) break;
    case 6444:
      switch (qt(e, qn(e) - 3 - (~Nu(e, "!important") && 10))) {
        case 107:
          return Ye(e, ":", ":" + Ge) + e;
        case 101:
          return Ye(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + Ge + (qt(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Ge + "$2$3$1" + Yt + "$2box$3") + e;
      }
      break;
    case 5936:
      switch (qt(e, n + 11)) {
        case 114:
          return Ge + e + Yt + Ye(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return Ge + e + Yt + Ye(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return Ge + e + Yt + Ye(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return Ge + e + Yt + e + e;
  }
  return e;
}
var p7 = function(n, o, a, l) {
  if (n.length > -1 && !n.return) switch (n.type) {
    case cc:
      n.return = w0(n.value, n.length);
      break;
    case _0:
      return To([di(n, {
        value: Ye(n.value, "@", "@" + Ge)
      })], l);
    case uc:
      if (n.length) return H6(n.props, function(u) {
        switch (V6(u, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return To([di(n, {
              props: [Ye(u, /:(read-\w+)/, ":" + Qa + "$1")]
            })], l);
          case "::placeholder":
            return To([di(n, {
              props: [Ye(u, /:(plac\w+)/, ":" + Ge + "input-$1")]
            }), di(n, {
              props: [Ye(u, /:(plac\w+)/, ":" + Qa + "$1")]
            }), di(n, {
              props: [Ye(u, /:(plac\w+)/, Yt + "input-$1")]
            })], l);
        }
        return "";
      });
  }
}, h7 = [p7], g7 = function(n) {
  var o = n.key;
  if (process.env.NODE_ENV !== "production" && !o)
    throw new Error(`You have to configure \`key\` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.
If multiple caches share the same key they might "fight" for each other's style elements.`);
  if (o === "css") {
    var a = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(a, function(C) {
      var E = C.getAttribute("data-emotion");
      E.indexOf(" ") !== -1 && (document.head.appendChild(C), C.setAttribute("data-s", ""));
    });
  }
  var l = n.stylisPlugins || h7;
  if (process.env.NODE_ENV !== "production" && /[^a-z-]/.test(o))
    throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + o + '" was passed');
  var u = {}, f, d = [];
  f = n.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + o + ' "]'),
    function(C) {
      for (var E = C.getAttribute("data-emotion").split(" "), $ = 1; $ < E.length; $++)
        u[E[$]] = !0;
      d.push(C);
    }
  );
  var h, g = [a7, s7];
  process.env.NODE_ENV !== "production" && g.push(c7({
    get compat() {
      return S.compat;
    }
  }), d7);
  {
    var b, x = [e7, process.env.NODE_ENV !== "production" ? function(C) {
      C.root || (C.return ? b.insert(C.return) : C.value && C.type !== lc && b.insert(C.value + "{}"));
    } : n7(function(C) {
      b.insert(C);
    })], _ = t7(g.concat(l, x)), P = function(E) {
      return To(J6(E), _);
    };
    h = function(E, $, N, A) {
      b = N, process.env.NODE_ENV !== "production" && $.map !== void 0 && (b = {
        insert: function(O) {
          N.insert(O + $.map);
        }
      }), P(E ? E + "{" + $.styles + "}" : $.styles), A && (S.inserted[$.name] = !0);
    };
  }
  var S = {
    key: o,
    sheet: new k6({
      key: o,
      container: f,
      nonce: n.nonce,
      speedy: n.speedy,
      prepend: n.prepend,
      insertionPoint: n.insertionPoint
    }),
    nonce: n.nonce,
    inserted: u,
    registered: {},
    insert: h
  };
  return S.sheet.hydrate(d), S;
};
let Du;
typeof document == "object" && (Du = g7({
  key: "css",
  prepend: !0
}));
function R0(e) {
  const {
    injectFirst: n,
    children: o
  } = e;
  return n && Du ? /* @__PURE__ */ v.jsx(Tv, {
    value: Du,
    children: o
  }) : o;
}
process.env.NODE_ENV !== "production" && (R0.propTypes = {
  /**
   * Your component tree.
   */
  children: i.node,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override MUI's styles, set this prop.
   */
  injectFirst: i.bool
});
function m7(e) {
  return e == null || Object.keys(e).length === 0;
}
function dc(e) {
  const {
    styles: n,
    defaultTheme: o = {}
  } = e, a = typeof n == "function" ? (l) => n(m7(l) ? o : l) : n;
  return /* @__PURE__ */ v.jsx(Cv, {
    styles: a
  });
}
process.env.NODE_ENV !== "production" && (dc.propTypes = {
  defaultTheme: i.object,
  styles: i.oneOfType([i.array, i.string, i.object, i.func])
});
/**
 * @mui/styled-engine v5.15.14
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function v7(e, n) {
  const o = Ev(e, n);
  return process.env.NODE_ENV !== "production" ? (...a) => {
    const l = typeof e == "string" ? `"${e}"` : "component";
    return a.length === 0 ? console.error([`MUI: Seems like you called \`styled(${l})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : a.some((u) => u === void 0) && console.error(`MUI: the styled(${l})(...args) API requires all its args to be defined.`), o(...a);
  } : o;
}
const y7 = (e, n) => {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = n(e.__emotion_styles));
}, b7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GlobalStyles: dc,
  StyledEngineProvider: R0,
  ThemeContext: i0,
  css: Ov,
  default: v7,
  internal_processStyles: y7,
  keyframes: hs
}, Symbol.toStringTag, { value: "Module" })), x7 = /* @__PURE__ */ Sr(b7);
function Cr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function $0(e) {
  if (!Cr(e))
    return e;
  const n = {};
  return Object.keys(e).forEach((o) => {
    n[o] = $0(e[o]);
  }), n;
}
function yn(e, n, o = {
  clone: !0
}) {
  const a = o.clone ? I({}, e) : e;
  return Cr(e) && Cr(n) && Object.keys(n).forEach((l) => {
    Cr(n[l]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, l) && Cr(e[l]) ? a[l] = yn(e[l], n[l], o) : o.clone ? a[l] = Cr(n[l]) ? $0(n[l]) : n[l] : a[l] = n[l];
  }), a;
}
const _7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yn,
  isPlainObject: Cr
}, Symbol.toStringTag, { value: "Module" })), E7 = /* @__PURE__ */ Sr(_7);
function Ne(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Kr(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const T7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ne
}, Symbol.toStringTag, { value: "Module" })), C7 = /* @__PURE__ */ Sr(T7);
var Fu = { exports: {} }, et = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sp;
function O7() {
  if (Sp) return et;
  Sp = 1;
  var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), f = Symbol.for("react.context"), d = Symbol.for("react.server_context"), h = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), S;
  S = Symbol.for("react.module.reference");
  function C(E) {
    if (typeof E == "object" && E !== null) {
      var $ = E.$$typeof;
      switch ($) {
        case e:
          switch (E = E.type, E) {
            case o:
            case l:
            case a:
            case g:
            case b:
              return E;
            default:
              switch (E = E && E.$$typeof, E) {
                case d:
                case f:
                case h:
                case _:
                case x:
                case u:
                  return E;
                default:
                  return $;
              }
          }
        case n:
          return $;
      }
    }
  }
  return et.ContextConsumer = f, et.ContextProvider = u, et.Element = e, et.ForwardRef = h, et.Fragment = o, et.Lazy = _, et.Memo = x, et.Portal = n, et.Profiler = l, et.StrictMode = a, et.Suspense = g, et.SuspenseList = b, et.isAsyncMode = function() {
    return !1;
  }, et.isConcurrentMode = function() {
    return !1;
  }, et.isContextConsumer = function(E) {
    return C(E) === f;
  }, et.isContextProvider = function(E) {
    return C(E) === u;
  }, et.isElement = function(E) {
    return typeof E == "object" && E !== null && E.$$typeof === e;
  }, et.isForwardRef = function(E) {
    return C(E) === h;
  }, et.isFragment = function(E) {
    return C(E) === o;
  }, et.isLazy = function(E) {
    return C(E) === _;
  }, et.isMemo = function(E) {
    return C(E) === x;
  }, et.isPortal = function(E) {
    return C(E) === n;
  }, et.isProfiler = function(E) {
    return C(E) === l;
  }, et.isStrictMode = function(E) {
    return C(E) === a;
  }, et.isSuspense = function(E) {
    return C(E) === g;
  }, et.isSuspenseList = function(E) {
    return C(E) === b;
  }, et.isValidElementType = function(E) {
    return typeof E == "string" || typeof E == "function" || E === o || E === l || E === a || E === g || E === b || E === P || typeof E == "object" && E !== null && (E.$$typeof === _ || E.$$typeof === x || E.$$typeof === u || E.$$typeof === f || E.$$typeof === h || E.$$typeof === S || E.getModuleId !== void 0);
  }, et.typeOf = C, et;
}
var tt = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wp;
function S7() {
  return wp || (wp = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), n = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), f = Symbol.for("react.context"), d = Symbol.for("react.server_context"), h = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), S = !1, C = !1, E = !1, $ = !1, N = !1, A;
    A = Symbol.for("react.module.reference");
    function M(H) {
      return !!(typeof H == "string" || typeof H == "function" || H === o || H === l || N || H === a || H === g || H === b || $ || H === P || S || C || E || typeof H == "object" && H !== null && (H.$$typeof === _ || H.$$typeof === x || H.$$typeof === u || H.$$typeof === f || H.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      H.$$typeof === A || H.getModuleId !== void 0));
    }
    function O(H) {
      if (typeof H == "object" && H !== null) {
        var Ie = H.$$typeof;
        switch (Ie) {
          case e:
            var st = H.type;
            switch (st) {
              case o:
              case l:
              case a:
              case g:
              case b:
                return st;
              default:
                var ot = st && st.$$typeof;
                switch (ot) {
                  case d:
                  case f:
                  case h:
                  case _:
                  case x:
                  case u:
                    return ot;
                  default:
                    return Ie;
                }
            }
          case n:
            return Ie;
        }
      }
    }
    var k = f, L = u, J = e, le = h, G = o, ie = _, ae = x, ee = n, Q = l, ne = a, te = g, oe = b, X = !1, Pe = !1;
    function W(H) {
      return X || (X = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function Y(H) {
      return Pe || (Pe = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function he(H) {
      return O(H) === f;
    }
    function pe(H) {
      return O(H) === u;
    }
    function re(H) {
      return typeof H == "object" && H !== null && H.$$typeof === e;
    }
    function fe(H) {
      return O(H) === h;
    }
    function ue(H) {
      return O(H) === o;
    }
    function ye(H) {
      return O(H) === _;
    }
    function ge(H) {
      return O(H) === x;
    }
    function me(H) {
      return O(H) === n;
    }
    function _e(H) {
      return O(H) === l;
    }
    function be(H) {
      return O(H) === a;
    }
    function Z(H) {
      return O(H) === g;
    }
    function Ee(H) {
      return O(H) === b;
    }
    tt.ContextConsumer = k, tt.ContextProvider = L, tt.Element = J, tt.ForwardRef = le, tt.Fragment = G, tt.Lazy = ie, tt.Memo = ae, tt.Portal = ee, tt.Profiler = Q, tt.StrictMode = ne, tt.Suspense = te, tt.SuspenseList = oe, tt.isAsyncMode = W, tt.isConcurrentMode = Y, tt.isContextConsumer = he, tt.isContextProvider = pe, tt.isElement = re, tt.isForwardRef = fe, tt.isFragment = ue, tt.isLazy = ye, tt.isMemo = ge, tt.isPortal = me, tt.isProfiler = _e, tt.isStrictMode = be, tt.isSuspense = Z, tt.isSuspenseList = Ee, tt.isValidElementType = M, tt.typeOf = O;
  }()), tt;
}
process.env.NODE_ENV === "production" ? Fu.exports = O7() : Fu.exports = S7();
var Oi = Fu.exports;
const w7 = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function P0(e) {
  const n = `${e}`.match(w7);
  return n && n[1] || "";
}
function I0(e, n = "") {
  return e.displayName || e.name || P0(e) || n;
}
function Rp(e, n, o) {
  const a = I0(n);
  return e.displayName || (a !== "" ? `${o}(${a})` : o);
}
function R7(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return I0(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Oi.ForwardRef:
          return Rp(e, e.render, "ForwardRef");
        case Oi.Memo:
          return Rp(e, e.type, "memo");
        default:
          return;
      }
  }
}
const $7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: R7,
  getFunctionName: P0
}, Symbol.toStringTag, { value: "Module" })), P7 = /* @__PURE__ */ Sr($7), I7 = ["values", "unit", "step"], A7 = (e) => {
  const n = Object.keys(e).map((o) => ({
    key: o,
    val: e[o]
  })) || [];
  return n.sort((o, a) => o.val - a.val), n.reduce((o, a) => I({}, o, {
    [a.key]: a.val
  }), {});
};
function A0(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: n = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: o = "px",
    step: a = 5
  } = e, l = $e(e, I7), u = A7(n), f = Object.keys(u);
  function d(_) {
    return `@media (min-width:${typeof n[_] == "number" ? n[_] : _}${o})`;
  }
  function h(_) {
    return `@media (max-width:${(typeof n[_] == "number" ? n[_] : _) - a / 100}${o})`;
  }
  function g(_, P) {
    const S = f.indexOf(P);
    return `@media (min-width:${typeof n[_] == "number" ? n[_] : _}${o}) and (max-width:${(S !== -1 && typeof n[f[S]] == "number" ? n[f[S]] : P) - a / 100}${o})`;
  }
  function b(_) {
    return f.indexOf(_) + 1 < f.length ? g(_, f[f.indexOf(_) + 1]) : d(_);
  }
  function x(_) {
    const P = f.indexOf(_);
    return P === 0 ? d(f[1]) : P === f.length - 1 ? h(f[P]) : g(_, f[f.indexOf(_) + 1]).replace("@media", "@media not all and");
  }
  return I({
    keys: f,
    values: u,
    up: d,
    down: h,
    between: g,
    only: b,
    not: x,
    unit: o
  }, l);
}
const M7 = {
  borderRadius: 4
}, wr = process.env.NODE_ENV !== "production" ? i.oneOfType([i.number, i.string, i.object, i.array]) : {};
function xi(e, n) {
  return n ? yn(e, n, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const pc = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, $p = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${pc[e]}px)`
};
function fr(e, n, o) {
  const a = e.theme || {};
  if (Array.isArray(n)) {
    const u = a.breakpoints || $p;
    return n.reduce((f, d, h) => (f[u.up(u.keys[h])] = o(n[h]), f), {});
  }
  if (typeof n == "object") {
    const u = a.breakpoints || $p;
    return Object.keys(n).reduce((f, d) => {
      if (Object.keys(u.values || pc).indexOf(d) !== -1) {
        const h = u.up(d);
        f[h] = o(n[d], d);
      } else {
        const h = d;
        f[h] = n[h];
      }
      return f;
    }, {});
  }
  return o(n);
}
function N7(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((a, l) => {
    const u = e.up(l);
    return a[u] = {}, a;
  }, {})) || {};
}
function j7(e, n) {
  return e.reduce((o, a) => {
    const l = o[a];
    return (!l || Object.keys(l).length === 0) && delete o[a], o;
  }, n);
}
function bs(e, n, o = !0) {
  if (!n || typeof n != "string")
    return null;
  if (e && e.vars && o) {
    const a = `vars.${n}`.split(".").reduce((l, u) => l && l[u] ? l[u] : null, e);
    if (a != null)
      return a;
  }
  return n.split(".").reduce((a, l) => a && a[l] != null ? a[l] : null, e);
}
function es(e, n, o, a = o) {
  let l;
  return typeof e == "function" ? l = e(o) : Array.isArray(e) ? l = e[o] || a : l = bs(e, o) || a, n && (l = n(l, a, e)), l;
}
function Pt(e) {
  const {
    prop: n,
    cssProperty: o = e.prop,
    themeKey: a,
    transform: l
  } = e, u = (f) => {
    if (f[n] == null)
      return null;
    const d = f[n], h = f.theme, g = bs(h, a) || {};
    return fr(f, d, (x) => {
      let _ = es(g, l, x);
      return x === _ && typeof x == "string" && (_ = es(g, l, `${n}${x === "default" ? "" : Ne(x)}`, x)), o === !1 ? _ : {
        [o]: _
      };
    });
  };
  return u.propTypes = process.env.NODE_ENV !== "production" ? {
    [n]: wr
  } : {}, u.filterProps = [n], u;
}
function D7(e) {
  const n = {};
  return (o) => (n[o] === void 0 && (n[o] = e(o)), n[o]);
}
const F7 = {
  m: "margin",
  p: "padding"
}, k7 = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Pp = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, L7 = D7((e) => {
  if (e.length > 2)
    if (Pp[e])
      e = Pp[e];
    else
      return [e];
  const [n, o] = e.split(""), a = F7[n], l = k7[o] || "";
  return Array.isArray(l) ? l.map((u) => a + u) : [a + l];
}), xs = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], _s = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], B7 = [...xs, ..._s];
function Ai(e, n, o, a) {
  var l;
  const u = (l = bs(e, n, !1)) != null ? l : o;
  return typeof u == "number" ? (f) => typeof f == "string" ? f : (process.env.NODE_ENV !== "production" && typeof f != "number" && console.error(`MUI: Expected ${a} argument to be a number or a string, got ${f}.`), u * f) : Array.isArray(u) ? (f) => typeof f == "string" ? f : (process.env.NODE_ENV !== "production" && (Number.isInteger(f) ? f > u.length - 1 && console.error([`MUI: The value provided (${f}) overflows.`, `The supported values are: ${JSON.stringify(u)}.`, `${f} > ${u.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${n}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${n}\` as a number.`].join(`
`))), u[f]) : typeof u == "function" ? u : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${n}\` value (${u}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function M0(e) {
  return Ai(e, "spacing", 8, "spacing");
}
function Mi(e, n) {
  if (typeof n == "string" || n == null)
    return n;
  const o = Math.abs(n), a = e(o);
  return n >= 0 ? a : typeof a == "number" ? -a : `-${a}`;
}
function z7(e, n) {
  return (o) => e.reduce((a, l) => (a[l] = Mi(n, o), a), {});
}
function W7(e, n, o, a) {
  if (n.indexOf(o) === -1)
    return null;
  const l = L7(o), u = z7(l, a), f = e[o];
  return fr(e, f, u);
}
function N0(e, n) {
  const o = M0(e.theme);
  return Object.keys(e).map((a) => W7(e, n, a, o)).reduce(xi, {});
}
function Tt(e) {
  return N0(e, xs);
}
Tt.propTypes = process.env.NODE_ENV !== "production" ? xs.reduce((e, n) => (e[n] = wr, e), {}) : {};
Tt.filterProps = xs;
function Ct(e) {
  return N0(e, _s);
}
Ct.propTypes = process.env.NODE_ENV !== "production" ? _s.reduce((e, n) => (e[n] = wr, e), {}) : {};
Ct.filterProps = _s;
process.env.NODE_ENV !== "production" && B7.reduce((e, n) => (e[n] = wr, e), {});
function U7(e = 8) {
  if (e.mui)
    return e;
  const n = M0({
    spacing: e
  }), o = (...a) => (process.env.NODE_ENV !== "production" && (a.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${a.length}`)), (a.length === 0 ? [1] : a).map((u) => {
    const f = n(u);
    return typeof f == "number" ? `${f}px` : f;
  }).join(" "));
  return o.mui = !0, o;
}
function Es(...e) {
  const n = e.reduce((a, l) => (l.filterProps.forEach((u) => {
    a[u] = l;
  }), a), {}), o = (a) => Object.keys(a).reduce((l, u) => n[u] ? xi(l, n[u](a)) : l, {});
  return o.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((a, l) => Object.assign(a, l.propTypes), {}) : {}, o.filterProps = e.reduce((a, l) => a.concat(l.filterProps), []), o;
}
function Nn(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Fn(e, n) {
  return Pt({
    prop: e,
    themeKey: "borders",
    transform: n
  });
}
const V7 = Fn("border", Nn), H7 = Fn("borderTop", Nn), q7 = Fn("borderRight", Nn), Z7 = Fn("borderBottom", Nn), K7 = Fn("borderLeft", Nn), G7 = Fn("borderColor"), Y7 = Fn("borderTopColor"), X7 = Fn("borderRightColor"), J7 = Fn("borderBottomColor"), Q7 = Fn("borderLeftColor"), ey = Fn("outline", Nn), ty = Fn("outlineColor"), Ts = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const n = Ai(e.theme, "shape.borderRadius", 4, "borderRadius"), o = (a) => ({
      borderRadius: Mi(n, a)
    });
    return fr(e, e.borderRadius, o);
  }
  return null;
};
Ts.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: wr
} : {};
Ts.filterProps = ["borderRadius"];
Es(V7, H7, q7, Z7, K7, G7, Y7, X7, J7, Q7, Ts, ey, ty);
const Cs = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const n = Ai(e.theme, "spacing", 8, "gap"), o = (a) => ({
      gap: Mi(n, a)
    });
    return fr(e, e.gap, o);
  }
  return null;
};
Cs.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: wr
} : {};
Cs.filterProps = ["gap"];
const Os = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const n = Ai(e.theme, "spacing", 8, "columnGap"), o = (a) => ({
      columnGap: Mi(n, a)
    });
    return fr(e, e.columnGap, o);
  }
  return null;
};
Os.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: wr
} : {};
Os.filterProps = ["columnGap"];
const Ss = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const n = Ai(e.theme, "spacing", 8, "rowGap"), o = (a) => ({
      rowGap: Mi(n, a)
    });
    return fr(e, e.rowGap, o);
  }
  return null;
};
Ss.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: wr
} : {};
Ss.filterProps = ["rowGap"];
const ny = Pt({
  prop: "gridColumn"
}), ry = Pt({
  prop: "gridRow"
}), oy = Pt({
  prop: "gridAutoFlow"
}), iy = Pt({
  prop: "gridAutoColumns"
}), ay = Pt({
  prop: "gridAutoRows"
}), sy = Pt({
  prop: "gridTemplateColumns"
}), ly = Pt({
  prop: "gridTemplateRows"
}), uy = Pt({
  prop: "gridTemplateAreas"
}), cy = Pt({
  prop: "gridArea"
});
Es(Cs, Os, Ss, ny, ry, oy, iy, ay, sy, ly, uy, cy);
function Co(e, n) {
  return n === "grey" ? n : e;
}
const fy = Pt({
  prop: "color",
  themeKey: "palette",
  transform: Co
}), dy = Pt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Co
}), py = Pt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Co
});
Es(fy, dy, py);
function gn(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const hy = Pt({
  prop: "width",
  transform: gn
}), hc = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const n = (o) => {
      var a, l;
      const u = ((a = e.theme) == null || (a = a.breakpoints) == null || (a = a.values) == null ? void 0 : a[o]) || pc[o];
      return u ? ((l = e.theme) == null || (l = l.breakpoints) == null ? void 0 : l.unit) !== "px" ? {
        maxWidth: `${u}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: u
      } : {
        maxWidth: gn(o)
      };
    };
    return fr(e, e.maxWidth, n);
  }
  return null;
};
hc.filterProps = ["maxWidth"];
const gy = Pt({
  prop: "minWidth",
  transform: gn
}), my = Pt({
  prop: "height",
  transform: gn
}), vy = Pt({
  prop: "maxHeight",
  transform: gn
}), yy = Pt({
  prop: "minHeight",
  transform: gn
});
Pt({
  prop: "size",
  cssProperty: "width",
  transform: gn
});
Pt({
  prop: "size",
  cssProperty: "height",
  transform: gn
});
const by = Pt({
  prop: "boxSizing"
});
Es(hy, hc, gy, my, vy, yy, by);
const Ni = {
  // borders
  border: {
    themeKey: "borders",
    transform: Nn
  },
  borderTop: {
    themeKey: "borders",
    transform: Nn
  },
  borderRight: {
    themeKey: "borders",
    transform: Nn
  },
  borderBottom: {
    themeKey: "borders",
    transform: Nn
  },
  borderLeft: {
    themeKey: "borders",
    transform: Nn
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: Nn
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Ts
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Co
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Co
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Co
  },
  // spacing
  p: {
    style: Ct
  },
  pt: {
    style: Ct
  },
  pr: {
    style: Ct
  },
  pb: {
    style: Ct
  },
  pl: {
    style: Ct
  },
  px: {
    style: Ct
  },
  py: {
    style: Ct
  },
  padding: {
    style: Ct
  },
  paddingTop: {
    style: Ct
  },
  paddingRight: {
    style: Ct
  },
  paddingBottom: {
    style: Ct
  },
  paddingLeft: {
    style: Ct
  },
  paddingX: {
    style: Ct
  },
  paddingY: {
    style: Ct
  },
  paddingInline: {
    style: Ct
  },
  paddingInlineStart: {
    style: Ct
  },
  paddingInlineEnd: {
    style: Ct
  },
  paddingBlock: {
    style: Ct
  },
  paddingBlockStart: {
    style: Ct
  },
  paddingBlockEnd: {
    style: Ct
  },
  m: {
    style: Tt
  },
  mt: {
    style: Tt
  },
  mr: {
    style: Tt
  },
  mb: {
    style: Tt
  },
  ml: {
    style: Tt
  },
  mx: {
    style: Tt
  },
  my: {
    style: Tt
  },
  margin: {
    style: Tt
  },
  marginTop: {
    style: Tt
  },
  marginRight: {
    style: Tt
  },
  marginBottom: {
    style: Tt
  },
  marginLeft: {
    style: Tt
  },
  marginX: {
    style: Tt
  },
  marginY: {
    style: Tt
  },
  marginInline: {
    style: Tt
  },
  marginInlineStart: {
    style: Tt
  },
  marginInlineEnd: {
    style: Tt
  },
  marginBlock: {
    style: Tt
  },
  marginBlockStart: {
    style: Tt
  },
  marginBlockEnd: {
    style: Tt
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: Cs
  },
  rowGap: {
    style: Ss
  },
  columnGap: {
    style: Os
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: gn
  },
  maxWidth: {
    style: hc
  },
  minWidth: {
    transform: gn
  },
  height: {
    transform: gn
  },
  maxHeight: {
    transform: gn
  },
  minHeight: {
    transform: gn
  },
  boxSizing: {},
  // typography
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
};
function xy(...e) {
  const n = e.reduce((a, l) => a.concat(Object.keys(l)), []), o = new Set(n);
  return e.every((a) => o.size === Object.keys(a).length);
}
function _y(e, n) {
  return typeof e == "function" ? e(n) : e;
}
function j0() {
  function e(o, a, l, u) {
    const f = {
      [o]: a,
      theme: l
    }, d = u[o];
    if (!d)
      return {
        [o]: a
      };
    const {
      cssProperty: h = o,
      themeKey: g,
      transform: b,
      style: x
    } = d;
    if (a == null)
      return null;
    if (g === "typography" && a === "inherit")
      return {
        [o]: a
      };
    const _ = bs(l, g) || {};
    return x ? x(f) : fr(f, a, (S) => {
      let C = es(_, b, S);
      return S === C && typeof S == "string" && (C = es(_, b, `${o}${S === "default" ? "" : Ne(S)}`, S)), h === !1 ? C : {
        [h]: C
      };
    });
  }
  function n(o) {
    var a;
    const {
      sx: l,
      theme: u = {}
    } = o || {};
    if (!l)
      return null;
    const f = (a = u.unstable_sxConfig) != null ? a : Ni;
    function d(h) {
      let g = h;
      if (typeof h == "function")
        g = h(u);
      else if (typeof h != "object")
        return h;
      if (!g)
        return null;
      const b = N7(u.breakpoints), x = Object.keys(b);
      let _ = b;
      return Object.keys(g).forEach((P) => {
        const S = _y(g[P], u);
        if (S != null)
          if (typeof S == "object")
            if (f[P])
              _ = xi(_, e(P, S, u, f));
            else {
              const C = fr({
                theme: u
              }, S, (E) => ({
                [P]: E
              }));
              xy(C, S) ? _[P] = n({
                sx: S,
                theme: u
              }) : _ = xi(_, C);
            }
          else
            _ = xi(_, e(P, S, u, f));
      }), j7(x, _);
    }
    return Array.isArray(l) ? l.map(d) : d(l);
  }
  return n;
}
const ws = j0();
ws.filterProps = ["sx"];
function D0(e, n) {
  const o = this;
  return o.vars && typeof o.getColorSchemeSelector == "function" ? {
    [o.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: n
  } : o.palette.mode === e ? n : {};
}
const Ey = ["breakpoints", "palette", "spacing", "shape"];
function gc(e = {}, ...n) {
  const {
    breakpoints: o = {},
    palette: a = {},
    spacing: l,
    shape: u = {}
  } = e, f = $e(e, Ey), d = A0(o), h = U7(l);
  let g = yn({
    breakpoints: d,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: I({
      mode: "light"
    }, a),
    spacing: h,
    shape: I({}, M7, u)
  }, f);
  return g.applyStyles = D0, g = n.reduce((b, x) => yn(b, x), g), g.unstable_sxConfig = I({}, Ni, f == null ? void 0 : f.unstable_sxConfig), g.unstable_sx = function(x) {
    return ws({
      sx: x,
      theme: this
    });
  }, g;
}
const Ty = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gc,
  private_createBreakpoints: A0,
  unstable_applyStyles: D0
}, Symbol.toStringTag, { value: "Module" })), Cy = /* @__PURE__ */ Sr(Ty), Oy = ["sx"], Sy = (e) => {
  var n, o;
  const a = {
    systemProps: {},
    otherProps: {}
  }, l = (n = e == null || (o = e.theme) == null ? void 0 : o.unstable_sxConfig) != null ? n : Ni;
  return Object.keys(e).forEach((u) => {
    l[u] ? a.systemProps[u] = e[u] : a.otherProps[u] = e[u];
  }), a;
};
function F0(e) {
  const {
    sx: n
  } = e, o = $e(e, Oy), {
    systemProps: a,
    otherProps: l
  } = Sy(o);
  let u;
  return Array.isArray(n) ? u = [a, ...n] : typeof n == "function" ? u = (...f) => {
    const d = n(...f);
    return Cr(d) ? I({}, a, d) : a;
  } : u = I({}, a, n), I({}, l, {
    sx: u
  });
}
const wy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ws,
  extendSxProp: F0,
  unstable_createStyleFunctionSx: j0,
  unstable_defaultSxConfig: Ni
}, Symbol.toStringTag, { value: "Module" })), Ry = /* @__PURE__ */ Sr(wy);
var Ao = h0;
Object.defineProperty(Pi, "__esModule", {
  value: !0
});
var $y = Pi.default = Uy;
Pi.shouldForwardProp = Ka;
Pi.systemDefaultTheme = void 0;
var An = Ao(N6()), ku = Ao(j6()), Ip = ky(x7), Py = E7, Iy = Ao(C7), Ay = Ao(P7), My = Ao(Cy), Ny = Ao(Ry);
const jy = ["ownerState"], Dy = ["variants"], Fy = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function k0(e) {
  if (typeof WeakMap != "function") return null;
  var n = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return (k0 = function(a) {
    return a ? o : n;
  })(e);
}
function ky(e, n) {
  if (e && e.__esModule) return e;
  if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
  var o = k0(n);
  if (o && o.has(e)) return o.get(e);
  var a = { __proto__: null }, l = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if (u !== "default" && Object.prototype.hasOwnProperty.call(e, u)) {
    var f = l ? Object.getOwnPropertyDescriptor(e, u) : null;
    f && (f.get || f.set) ? Object.defineProperty(a, u, f) : a[u] = e[u];
  }
  return a.default = e, o && o.set(e, a), a;
}
function Ly(e) {
  return Object.keys(e).length === 0;
}
function By(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Ka(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const zy = Pi.systemDefaultTheme = (0, My.default)(), Ap = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function ka({
  defaultTheme: e,
  theme: n,
  themeId: o
}) {
  return Ly(n) ? e : n[o] || n;
}
function Wy(e) {
  return e ? (n, o) => o[e] : null;
}
function Ga(e, n) {
  let {
    ownerState: o
  } = n, a = (0, ku.default)(n, jy);
  const l = typeof e == "function" ? e((0, An.default)({
    ownerState: o
  }, a)) : e;
  if (Array.isArray(l))
    return l.flatMap((u) => Ga(u, (0, An.default)({
      ownerState: o
    }, a)));
  if (l && typeof l == "object" && Array.isArray(l.variants)) {
    const {
      variants: u = []
    } = l;
    let d = (0, ku.default)(l, Dy);
    return u.forEach((h) => {
      let g = !0;
      typeof h.props == "function" ? g = h.props((0, An.default)({
        ownerState: o
      }, a, o)) : Object.keys(h.props).forEach((b) => {
        (o == null ? void 0 : o[b]) !== h.props[b] && a[b] !== h.props[b] && (g = !1);
      }), g && (Array.isArray(d) || (d = [d]), d.push(typeof h.style == "function" ? h.style((0, An.default)({
        ownerState: o
      }, a, o)) : h.style));
    }), d;
  }
  return l;
}
function Uy(e = {}) {
  const {
    themeId: n,
    defaultTheme: o = zy,
    rootShouldForwardProp: a = Ka,
    slotShouldForwardProp: l = Ka
  } = e, u = (f) => (0, Ny.default)((0, An.default)({}, f, {
    theme: ka((0, An.default)({}, f, {
      defaultTheme: o,
      themeId: n
    }))
  }));
  return u.__mui_systemSx = !0, (f, d = {}) => {
    (0, Ip.internal_processStyles)(f, (O) => O.filter((k) => !(k != null && k.__mui_systemSx)));
    const {
      name: h,
      slot: g,
      skipVariantsResolver: b,
      skipSx: x,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: _ = Wy(Ap(g))
    } = d, P = (0, ku.default)(d, Fy), S = b !== void 0 ? b : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      g && g !== "Root" && g !== "root" || !1
    ), C = x || !1;
    let E;
    process.env.NODE_ENV !== "production" && h && (E = `${h}-${Ap(g || "Root")}`);
    let $ = Ka;
    g === "Root" || g === "root" ? $ = a : g ? $ = l : By(f) && ($ = void 0);
    const N = (0, Ip.default)(f, (0, An.default)({
      shouldForwardProp: $,
      label: E
    }, P)), A = (O) => typeof O == "function" && O.__emotion_real !== O || (0, Py.isPlainObject)(O) ? (k) => Ga(O, (0, An.default)({}, k, {
      theme: ka({
        theme: k.theme,
        defaultTheme: o,
        themeId: n
      })
    })) : O, M = (O, ...k) => {
      let L = A(O);
      const J = k ? k.map(A) : [];
      h && _ && J.push((ie) => {
        const ae = ka((0, An.default)({}, ie, {
          defaultTheme: o,
          themeId: n
        }));
        if (!ae.components || !ae.components[h] || !ae.components[h].styleOverrides)
          return null;
        const ee = ae.components[h].styleOverrides, Q = {};
        return Object.entries(ee).forEach(([ne, te]) => {
          Q[ne] = Ga(te, (0, An.default)({}, ie, {
            theme: ae
          }));
        }), _(ie, Q);
      }), h && !S && J.push((ie) => {
        var ae;
        const ee = ka((0, An.default)({}, ie, {
          defaultTheme: o,
          themeId: n
        })), Q = ee == null || (ae = ee.components) == null || (ae = ae[h]) == null ? void 0 : ae.variants;
        return Ga({
          variants: Q
        }, (0, An.default)({}, ie, {
          theme: ee
        }));
      }), C || J.push(u);
      const le = J.length - k.length;
      if (Array.isArray(O) && le > 0) {
        const ie = new Array(le).fill("");
        L = [...O, ...ie], L.raw = [...O.raw, ...ie];
      }
      const G = N(L, ...J);
      if (process.env.NODE_ENV !== "production") {
        let ie;
        h && (ie = `${h}${(0, Iy.default)(g || "")}`), ie === void 0 && (ie = `Styled(${(0, Ay.default)(f)})`), G.displayName = ie;
      }
      return f.muiName && (G.muiName = f.muiName), G;
    };
    return N.withConfig && (M.withConfig = N.withConfig), M;
  };
}
const Mp = (e) => e, Vy = () => {
  let e = Mp;
  return {
    configure(n) {
      e = n;
    },
    generate(n) {
      return e(n);
    },
    reset() {
      e = Mp;
    }
  };
}, Hy = Vy(), qy = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function ft(e, n, o = "Mui") {
  const a = qy[n];
  return a ? `${o}-${a}` : `${Hy.generate(e)}-${n}`;
}
function Zy(e, n) {
  return I({
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    }
  }, n);
}
const Si = {
  black: "#000",
  white: "#fff"
}, Ky = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, go = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
}, mo = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
}, pi = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
}, vo = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
}, yo = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
}, bo = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
}, Gy = ["mode", "contrastThreshold", "tonalOffset"], Np = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: Si.white,
    default: Si.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
}, bu = {
  text: {
    primary: Si.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: Si.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function jp(e, n, o, a) {
  const l = a.light || a, u = a.dark || a * 1.5;
  e[n] || (e.hasOwnProperty(o) ? e[n] = e[o] : n === "light" ? e.light = Mu(e.main, l) : n === "dark" && (e.dark = Au(e.main, u)));
}
function Yy(e = "light") {
  return e === "dark" ? {
    main: vo[200],
    light: vo[50],
    dark: vo[400]
  } : {
    main: vo[700],
    light: vo[400],
    dark: vo[800]
  };
}
function Xy(e = "light") {
  return e === "dark" ? {
    main: go[200],
    light: go[50],
    dark: go[400]
  } : {
    main: go[500],
    light: go[300],
    dark: go[700]
  };
}
function Jy(e = "light") {
  return e === "dark" ? {
    main: mo[500],
    light: mo[300],
    dark: mo[700]
  } : {
    main: mo[700],
    light: mo[400],
    dark: mo[800]
  };
}
function Qy(e = "light") {
  return e === "dark" ? {
    main: yo[400],
    light: yo[300],
    dark: yo[700]
  } : {
    main: yo[700],
    light: yo[500],
    dark: yo[900]
  };
}
function eb(e = "light") {
  return e === "dark" ? {
    main: bo[400],
    light: bo[300],
    dark: bo[700]
  } : {
    main: bo[800],
    light: bo[500],
    dark: bo[900]
  };
}
function tb(e = "light") {
  return e === "dark" ? {
    main: pi[400],
    light: pi[300],
    dark: pi[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: pi[500],
    dark: pi[900]
  };
}
function nb(e) {
  const {
    mode: n = "light",
    contrastThreshold: o = 3,
    tonalOffset: a = 0.2
  } = e, l = $e(e, Gy), u = e.primary || Yy(n), f = e.secondary || Xy(n), d = e.error || Jy(n), h = e.info || Qy(n), g = e.success || eb(n), b = e.warning || tb(n);
  function x(C) {
    const E = yp(C, bu.text.primary) >= o ? bu.text.primary : Np.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const $ = yp(C, E);
      $ < 3 && console.error([`MUI: The contrast ratio of ${$}:1 for ${E} on ${C}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return E;
  }
  const _ = ({
    color: C,
    name: E,
    mainShade: $ = 500,
    lightShade: N = 300,
    darkShade: A = 700
  }) => {
    if (C = I({}, C), !C.main && C[$] && (C.main = C[$]), !C.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${E ? ` (${E})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${$}\` property.` : Kr(11, E ? ` (${E})` : "", $));
    if (typeof C.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${E ? ` (${E})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(C.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Kr(12, E ? ` (${E})` : "", JSON.stringify(C.main)));
    return jp(C, "light", N, a), jp(C, "dark", A, a), C.contrastText || (C.contrastText = x(C.main)), C;
  }, P = {
    dark: bu,
    light: Np
  };
  return process.env.NODE_ENV !== "production" && (P[n] || console.error(`MUI: The palette mode \`${n}\` is not supported.`)), yn(I({
    // A collection of common colors.
    common: I({}, Si),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: n,
    // The colors used to represent primary interface elements for a user.
    primary: _({
      color: u,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: _({
      color: f,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: _({
      color: d,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: _({
      color: b,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: _({
      color: h,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: _({
      color: g,
      name: "success"
    }),
    // The grey colors.
    grey: Ky,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: o,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: x,
    // Generate a rich color object.
    augmentColor: _,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: a
  }, P[n]), l);
}
const rb = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function ob(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Dp = {
  textTransform: "uppercase"
}, Fp = '"Roboto", "Helvetica", "Arial", sans-serif';
function ib(e, n) {
  const o = typeof n == "function" ? n(e) : n, {
    fontFamily: a = Fp,
    // The default font size of the Material Specification.
    fontSize: l = 14,
    // px
    fontWeightLight: u = 300,
    fontWeightRegular: f = 400,
    fontWeightMedium: d = 500,
    fontWeightBold: h = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: g = 16,
    // Apply the CSS properties to all the variants.
    allVariants: b,
    pxToRem: x
  } = o, _ = $e(o, rb);
  process.env.NODE_ENV !== "production" && (typeof l != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof g != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const P = l / 14, S = x || (($) => `${$ / g * P}rem`), C = ($, N, A, M, O) => I({
    fontFamily: a,
    fontWeight: $,
    fontSize: S(N),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: A
  }, a === Fp ? {
    letterSpacing: `${ob(M / N)}em`
  } : {}, O, b), E = {
    h1: C(u, 96, 1.167, -1.5),
    h2: C(u, 60, 1.2, -0.5),
    h3: C(f, 48, 1.167, 0),
    h4: C(f, 34, 1.235, 0.25),
    h5: C(f, 24, 1.334, 0),
    h6: C(d, 20, 1.6, 0.15),
    subtitle1: C(f, 16, 1.75, 0.15),
    subtitle2: C(d, 14, 1.57, 0.1),
    body1: C(f, 16, 1.5, 0.15),
    body2: C(f, 14, 1.43, 0.15),
    button: C(d, 14, 1.75, 0.4, Dp),
    caption: C(f, 12, 1.66, 0.4),
    overline: C(f, 12, 2.66, 1, Dp),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return yn(I({
    htmlFontSize: g,
    pxToRem: S,
    fontFamily: a,
    fontSize: l,
    fontWeightLight: u,
    fontWeightRegular: f,
    fontWeightMedium: d,
    fontWeightBold: h
  }, E), _, {
    clone: !1
    // No need to clone deep
  });
}
const ab = 0.2, sb = 0.14, lb = 0.12;
function pt(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${ab})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${sb})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${lb})`].join(",");
}
const ub = ["none", pt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), pt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), pt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), pt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), pt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), pt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), pt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), pt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), pt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), pt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), pt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), pt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), pt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), pt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), pt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), pt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), pt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), pt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), pt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), pt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), pt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), pt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), pt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), pt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], cb = ["duration", "easing", "delay"], fb = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, db = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function kp(e) {
  return `${Math.round(e)}ms`;
}
function pb(e) {
  if (!e)
    return 0;
  const n = e / 36;
  return Math.round((4 + 15 * n ** 0.25 + n / 5) * 10);
}
function hb(e) {
  const n = I({}, fb, e.easing), o = I({}, db, e.duration);
  return I({
    getAutoHeightDuration: pb,
    create: (l = ["all"], u = {}) => {
      const {
        duration: f = o.standard,
        easing: d = n.easeInOut,
        delay: h = 0
      } = u, g = $e(u, cb);
      if (process.env.NODE_ENV !== "production") {
        const b = (_) => typeof _ == "string", x = (_) => !isNaN(parseFloat(_));
        !b(l) && !Array.isArray(l) && console.error('MUI: Argument "props" must be a string or Array.'), !x(f) && !b(f) && console.error(`MUI: Argument "duration" must be a number or a string but found ${f}.`), b(d) || console.error('MUI: Argument "easing" must be a string.'), !x(h) && !b(h) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof u != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(g).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(g).join(",")}].`);
      }
      return (Array.isArray(l) ? l : [l]).map((b) => `${b} ${typeof f == "string" ? f : kp(f)} ${d} ${typeof h == "string" ? h : kp(h)}`).join(",");
    }
  }, e, {
    easing: n,
    duration: o
  });
}
const gb = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, mb = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function vb(e = {}, ...n) {
  const {
    mixins: o = {},
    palette: a = {},
    transitions: l = {},
    typography: u = {}
  } = e, f = $e(e, mb);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Kr(18));
  const d = nb(a), h = gc(e);
  let g = yn(h, {
    mixins: Zy(h.breakpoints, o),
    palette: d,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ub.slice(),
    typography: ib(d, u),
    transitions: hb(l),
    zIndex: I({}, gb)
  });
  if (g = yn(g, f), g = n.reduce((b, x) => yn(b, x), g), process.env.NODE_ENV !== "production") {
    const b = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], x = (_, P) => {
      let S;
      for (S in _) {
        const C = _[S];
        if (b.indexOf(S) !== -1 && Object.keys(C).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const E = ft("", S);
            console.error([`MUI: The \`${P}\` component increases the CSS specificity of the \`${S}\` internal state.`, "You can not override it like this: ", JSON.stringify(_, null, 2), "", `Instead, you need to use the '&.${E}' syntax:`, JSON.stringify({
              root: {
                [`&.${E}`]: C
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          _[S] = {};
        }
      }
    };
    Object.keys(g.components).forEach((_) => {
      const P = g.components[_].styleOverrides;
      P && _.indexOf("Mui") === 0 && x(P, _);
    });
  }
  return g.unstable_sxConfig = I({}, Ni, f == null ? void 0 : f.unstable_sxConfig), g.unstable_sx = function(x) {
    return ws({
      sx: x,
      theme: this
    });
  }, g;
}
const Rs = vb(), $s = "$$material";
function L0(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Wn = (e) => L0(e) && e !== "classes", Re = $y({
  themeId: $s,
  defaultTheme: Rs,
  rootShouldForwardProp: Wn
});
function yb(e) {
  const {
    theme: n,
    name: o,
    props: a
  } = e;
  return !n || !n.components || !n.components[o] || !n.components[o].defaultProps ? a : oc(n.components[o].defaultProps, a);
}
function bb(e) {
  return Object.keys(e).length === 0;
}
function xb(e = null) {
  const n = j.useContext(i0);
  return !n || bb(n) ? e : n;
}
const _b = gc();
function mc(e = _b) {
  return xb(e);
}
function Eb({
  props: e,
  name: n,
  defaultTheme: o,
  themeId: a
}) {
  let l = mc(o);
  return a && (l = l[a] || l), yb({
    theme: l,
    name: n,
    props: e
  });
}
function bt({
  props: e,
  name: n
}) {
  return Eb({
    props: e,
    name: n,
    defaultTheme: Rs,
    themeId: $s
  });
}
const dr = i.oneOfType([i.func, i.object]);
function Mo(e, n) {
  return process.env.NODE_ENV === "production" ? () => null : function(...a) {
    return e(...a) || n(...a);
  };
}
function Tb(e) {
  const {
    prototype: n = {}
  } = e;
  return !!n.isReactComponent;
}
function Cb(e, n, o, a, l) {
  const u = e[n], f = l || n;
  if (u == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let d;
  return typeof u == "function" && !Tb(u) && (d = "Did you accidentally provide a plain function component instead?"), d !== void 0 ? new Error(`Invalid ${a} \`${f}\` supplied to \`${o}\`. Expected an element type that can hold a ref. ${d} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const vc = Mo(i.elementType, Cb);
function Lu(e, n) {
  typeof e == "function" ? e(n) : e && (e.current = n);
}
function en(...e) {
  return j.useMemo(() => e.every((n) => n == null) ? null : (n) => {
    e.forEach((o) => {
      Lu(o, n);
    });
  }, e);
}
const Gr = typeof window < "u" ? j.useLayoutEffect : j.useEffect;
function Eo(e) {
  const n = j.useRef(e);
  return Gr(() => {
    n.current = e;
  }), j.useRef((...o) => (
    // @ts-expect-error hide `this`
    (0, n.current)(...o)
  )).current;
}
const Lp = {};
function Ob(e, n) {
  const o = j.useRef(Lp);
  return o.current === Lp && (o.current = e(n)), o;
}
const Sb = [];
function wb(e) {
  j.useEffect(e, Sb);
}
class Ps {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Ps();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(n, o) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, o();
    }, n);
  }
}
function B0() {
  const e = Ob(Ps.create).current;
  return wb(e.disposeEffect), e;
}
let Is = !0, Bu = !1;
const Rb = new Ps(), $b = {
  text: !0,
  search: !0,
  url: !0,
  tel: !0,
  email: !0,
  password: !0,
  number: !0,
  date: !0,
  month: !0,
  week: !0,
  time: !0,
  datetime: !0,
  "datetime-local": !0
};
function Pb(e) {
  const {
    type: n,
    tagName: o
  } = e;
  return !!(o === "INPUT" && $b[n] && !e.readOnly || o === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Ib(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Is = !0);
}
function xu() {
  Is = !1;
}
function Ab() {
  this.visibilityState === "hidden" && Bu && (Is = !0);
}
function Mb(e) {
  e.addEventListener("keydown", Ib, !0), e.addEventListener("mousedown", xu, !0), e.addEventListener("pointerdown", xu, !0), e.addEventListener("touchstart", xu, !0), e.addEventListener("visibilitychange", Ab, !0);
}
function Nb(e) {
  const {
    target: n
  } = e;
  try {
    return n.matches(":focus-visible");
  } catch {
  }
  return Is || Pb(n);
}
function jb() {
  const e = j.useCallback((l) => {
    l != null && Mb(l.ownerDocument);
  }, []), n = j.useRef(!1);
  function o() {
    return n.current ? (Bu = !0, Rb.start(100, () => {
      Bu = !1;
    }), n.current = !1, !0) : !1;
  }
  function a(l) {
    return Nb(l) ? (n.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: n,
    onFocus: a,
    onBlur: o,
    ref: e
  };
}
function zu(e, n) {
  return zu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, a) {
    return o.__proto__ = a, o;
  }, zu(e, n);
}
function z0(e, n) {
  e.prototype = Object.create(n.prototype), e.prototype.constructor = e, zu(e, n);
}
const Bp = {
  disabled: !1
};
var Db = process.env.NODE_ENV !== "production" ? i.oneOfType([i.number, i.shape({
  enter: i.number,
  exit: i.number,
  appear: i.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && i.oneOfType([i.string, i.shape({
  enter: i.string,
  exit: i.string,
  active: i.string
}), i.shape({
  enter: i.string,
  enterDone: i.string,
  enterActive: i.string,
  exit: i.string,
  exitDone: i.string,
  exitActive: i.string
})]);
const ts = mn.createContext(null);
var Fb = function(n) {
  return n.scrollTop;
}, bi = "unmounted", Lr = "exited", Br = "entering", _o = "entered", Wu = "exiting", Yn = /* @__PURE__ */ function(e) {
  z0(n, e);
  function n(a, l) {
    var u;
    u = e.call(this, a, l) || this;
    var f = l, d = f && !f.isMounting ? a.enter : a.appear, h;
    return u.appearStatus = null, a.in ? d ? (h = Lr, u.appearStatus = Br) : h = _o : a.unmountOnExit || a.mountOnEnter ? h = bi : h = Lr, u.state = {
      status: h
    }, u.nextCallback = null, u;
  }
  n.getDerivedStateFromProps = function(l, u) {
    var f = l.in;
    return f && u.status === bi ? {
      status: Lr
    } : null;
  };
  var o = n.prototype;
  return o.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, o.componentDidUpdate = function(l) {
    var u = null;
    if (l !== this.props) {
      var f = this.state.status;
      this.props.in ? f !== Br && f !== _o && (u = Br) : (f === Br || f === _o) && (u = Wu);
    }
    this.updateStatus(!1, u);
  }, o.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, o.getTimeouts = function() {
    var l = this.props.timeout, u, f, d;
    return u = f = d = l, l != null && typeof l != "number" && (u = l.exit, f = l.enter, d = l.appear !== void 0 ? l.appear : f), {
      exit: u,
      enter: f,
      appear: d
    };
  }, o.updateStatus = function(l, u) {
    if (l === void 0 && (l = !1), u !== null)
      if (this.cancelNextCallback(), u === Br) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var f = this.props.nodeRef ? this.props.nodeRef.current : ja.findDOMNode(this);
          f && Fb(f);
        }
        this.performEnter(l);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === Lr && this.setState({
      status: bi
    });
  }, o.performEnter = function(l) {
    var u = this, f = this.props.enter, d = this.context ? this.context.isMounting : l, h = this.props.nodeRef ? [d] : [ja.findDOMNode(this), d], g = h[0], b = h[1], x = this.getTimeouts(), _ = d ? x.appear : x.enter;
    if (!l && !f || Bp.disabled) {
      this.safeSetState({
        status: _o
      }, function() {
        u.props.onEntered(g);
      });
      return;
    }
    this.props.onEnter(g, b), this.safeSetState({
      status: Br
    }, function() {
      u.props.onEntering(g, b), u.onTransitionEnd(_, function() {
        u.safeSetState({
          status: _o
        }, function() {
          u.props.onEntered(g, b);
        });
      });
    });
  }, o.performExit = function() {
    var l = this, u = this.props.exit, f = this.getTimeouts(), d = this.props.nodeRef ? void 0 : ja.findDOMNode(this);
    if (!u || Bp.disabled) {
      this.safeSetState({
        status: Lr
      }, function() {
        l.props.onExited(d);
      });
      return;
    }
    this.props.onExit(d), this.safeSetState({
      status: Wu
    }, function() {
      l.props.onExiting(d), l.onTransitionEnd(f.exit, function() {
        l.safeSetState({
          status: Lr
        }, function() {
          l.props.onExited(d);
        });
      });
    });
  }, o.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, o.safeSetState = function(l, u) {
    u = this.setNextCallback(u), this.setState(l, u);
  }, o.setNextCallback = function(l) {
    var u = this, f = !0;
    return this.nextCallback = function(d) {
      f && (f = !1, u.nextCallback = null, l(d));
    }, this.nextCallback.cancel = function() {
      f = !1;
    }, this.nextCallback;
  }, o.onTransitionEnd = function(l, u) {
    this.setNextCallback(u);
    var f = this.props.nodeRef ? this.props.nodeRef.current : ja.findDOMNode(this), d = l == null && !this.props.addEndListener;
    if (!f || d) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var h = this.props.nodeRef ? [this.nextCallback] : [f, this.nextCallback], g = h[0], b = h[1];
      this.props.addEndListener(g, b);
    }
    l != null && setTimeout(this.nextCallback, l);
  }, o.render = function() {
    var l = this.state.status;
    if (l === bi)
      return null;
    var u = this.props, f = u.children;
    u.in, u.mountOnEnter, u.unmountOnExit, u.appear, u.enter, u.exit, u.timeout, u.addEndListener, u.onEnter, u.onEntering, u.onEntered, u.onExit, u.onExiting, u.onExited, u.nodeRef;
    var d = $e(u, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ mn.createElement(ts.Provider, {
        value: null
      }, typeof f == "function" ? f(l, d) : mn.cloneElement(mn.Children.only(f), d))
    );
  }, n;
}(mn.Component);
Yn.contextType = ts;
Yn.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: i.shape({
    current: typeof Element > "u" ? i.any : function(e, n, o, a, l, u) {
      var f = e[n];
      return i.instanceOf(f && "ownerDocument" in f ? f.ownerDocument.defaultView.Element : Element)(e, n, o, a, l, u);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: i.oneOfType([i.func.isRequired, i.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: i.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: i.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: i.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: i.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: i.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: i.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(n) {
    var o = Db;
    n.addEndListener || (o = o.isRequired);
    for (var a = arguments.length, l = new Array(a > 1 ? a - 1 : 0), u = 1; u < a; u++)
      l[u - 1] = arguments[u];
    return o.apply(void 0, [n].concat(l));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: i.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: i.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: i.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: i.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: i.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: i.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: i.func
} : {};
function xo() {
}
Yn.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: xo,
  onEntering: xo,
  onEntered: xo,
  onExit: xo,
  onExiting: xo,
  onExited: xo
};
Yn.UNMOUNTED = bi;
Yn.EXITED = Lr;
Yn.ENTERING = Br;
Yn.ENTERED = _o;
Yn.EXITING = Wu;
function kb(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function yc(e, n) {
  var o = function(u) {
    return n && Ua(u) ? n(u) : u;
  }, a = /* @__PURE__ */ Object.create(null);
  return e && yv.map(e, function(l) {
    return l;
  }).forEach(function(l) {
    a[l.key] = o(l);
  }), a;
}
function Lb(e, n) {
  e = e || {}, n = n || {};
  function o(b) {
    return b in n ? n[b] : e[b];
  }
  var a = /* @__PURE__ */ Object.create(null), l = [];
  for (var u in e)
    u in n ? l.length && (a[u] = l, l = []) : l.push(u);
  var f, d = {};
  for (var h in n) {
    if (a[h])
      for (f = 0; f < a[h].length; f++) {
        var g = a[h][f];
        d[a[h][f]] = o(g);
      }
    d[h] = o(h);
  }
  for (f = 0; f < l.length; f++)
    d[l[f]] = o(l[f]);
  return d;
}
function Wr(e, n, o) {
  return o[n] != null ? o[n] : e.props[n];
}
function Bb(e, n) {
  return yc(e.children, function(o) {
    return Va(o, {
      onExited: n.bind(null, o),
      in: !0,
      appear: Wr(o, "appear", e),
      enter: Wr(o, "enter", e),
      exit: Wr(o, "exit", e)
    });
  });
}
function zb(e, n, o) {
  var a = yc(e.children), l = Lb(n, a);
  return Object.keys(l).forEach(function(u) {
    var f = l[u];
    if (Ua(f)) {
      var d = u in n, h = u in a, g = n[u], b = Ua(g) && !g.props.in;
      h && (!d || b) ? l[u] = Va(f, {
        onExited: o.bind(null, f),
        in: !0,
        exit: Wr(f, "exit", e),
        enter: Wr(f, "enter", e)
      }) : !h && d && !b ? l[u] = Va(f, {
        in: !1
      }) : h && d && Ua(g) && (l[u] = Va(f, {
        onExited: o.bind(null, f),
        in: g.props.in,
        exit: Wr(f, "exit", e),
        enter: Wr(f, "enter", e)
      }));
    }
  }), l;
}
var Wb = Object.values || function(e) {
  return Object.keys(e).map(function(n) {
    return e[n];
  });
}, Ub = {
  component: "div",
  childFactory: function(n) {
    return n;
  }
}, bc = /* @__PURE__ */ function(e) {
  z0(n, e);
  function n(a, l) {
    var u;
    u = e.call(this, a, l) || this;
    var f = u.handleExited.bind(kb(u));
    return u.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: f,
      firstRender: !0
    }, u;
  }
  var o = n.prototype;
  return o.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, o.componentWillUnmount = function() {
    this.mounted = !1;
  }, n.getDerivedStateFromProps = function(l, u) {
    var f = u.children, d = u.handleExited, h = u.firstRender;
    return {
      children: h ? Bb(l, d) : zb(l, f, d),
      firstRender: !1
    };
  }, o.handleExited = function(l, u) {
    var f = yc(this.props.children);
    l.key in f || (l.props.onExited && l.props.onExited(u), this.mounted && this.setState(function(d) {
      var h = I({}, d.children);
      return delete h[l.key], {
        children: h
      };
    }));
  }, o.render = function() {
    var l = this.props, u = l.component, f = l.childFactory, d = $e(l, ["component", "childFactory"]), h = this.state.contextValue, g = Wb(this.state.children).map(f);
    return delete d.appear, delete d.enter, delete d.exit, u === null ? /* @__PURE__ */ mn.createElement(ts.Provider, {
      value: h
    }, g) : /* @__PURE__ */ mn.createElement(ts.Provider, {
      value: h
    }, /* @__PURE__ */ mn.createElement(u, d, g));
  }, n;
}(mn.Component);
bc.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: i.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: i.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: i.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: i.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: i.bool,
  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: i.func
} : {};
bc.defaultProps = Ub;
function W0({
  styles: e,
  themeId: n,
  defaultTheme: o = {}
}) {
  const a = mc(o), l = typeof e == "function" ? e(n && a[n] || a) : e;
  return /* @__PURE__ */ v.jsx(dc, {
    styles: l
  });
}
process.env.NODE_ENV !== "production" && (W0.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: i.object,
  /**
   * @ignore
   */
  styles: i.oneOfType([i.array, i.func, i.number, i.object, i.string, i.bool]),
  /**
   * @ignore
   */
  themeId: i.string
});
function ht(e, n, o = "Mui") {
  const a = {};
  return n.forEach((l) => {
    a[l] = ft(e, l, o);
  }), a;
}
function Vb(e) {
  const {
    prototype: n = {}
  } = e;
  return !!n.isReactComponent;
}
function U0(e, n, o, a, l) {
  const u = e[n], f = l || n;
  if (u == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let d;
  const h = u.type;
  return typeof h == "function" && !Vb(h) && (d = "Did you accidentally use a plain function component for an element instead?"), d !== void 0 ? new Error(`Invalid ${a} \`${f}\` supplied to \`${o}\`. Expected an element that can hold a ref. ${d} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ji = Mo(i.element, U0);
ji.isRequired = Mo(i.element.isRequired, U0);
const Hb = "exact-prop: ​";
function V0(e) {
  return process.env.NODE_ENV === "production" ? e : I({}, e, {
    [Hb]: (n) => {
      const o = Object.keys(n).filter((a) => !e.hasOwnProperty(a));
      return o.length > 0 ? new Error(`The following props are not supported: ${o.map((a) => `\`${a}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function wi(e, n, o, a, l) {
  if (process.env.NODE_ENV === "production")
    return null;
  const u = e[n], f = l || n;
  return u == null ? null : u && u.nodeType !== 1 ? new Error(`Invalid ${a} \`${f}\` supplied to \`${o}\`. Expected an HTMLElement.`) : null;
}
function zp(...e) {
  return e.reduce((n, o) => o == null ? n : function(...l) {
    n.apply(this, l), o.apply(this, l);
  }, () => {
  });
}
function H0(e, n = 166) {
  let o;
  function a(...l) {
    const u = () => {
      e.apply(this, l);
    };
    clearTimeout(o), o = setTimeout(u, n);
  }
  return a.clear = () => {
    clearTimeout(o);
  }, a;
}
function _u(e, n) {
  var o, a;
  return /* @__PURE__ */ j.isValidElement(e) && n.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (o = e.type.muiName) != null ? o : (a = e.type) == null || (a = a._payload) == null || (a = a.value) == null ? void 0 : a.muiName
  ) !== -1;
}
function bn(e) {
  return e && e.ownerDocument || document;
}
function Yr(e) {
  return bn(e).defaultView || window;
}
let Wp = 0;
function qb(e) {
  const [n, o] = j.useState(e), a = e || n;
  return j.useEffect(() => {
    n == null && (Wp += 1, o(`mui-${Wp}`));
  }, [n]), a;
}
const Up = j.useId;
function q0(e) {
  if (Up !== void 0) {
    const n = Up();
    return e ?? n;
  }
  return qb(e);
}
function Vp({
  controlled: e,
  default: n,
  name: o,
  state: a = "value"
}) {
  const {
    current: l
  } = j.useRef(e !== void 0), [u, f] = j.useState(n), d = l ? e : u;
  if (process.env.NODE_ENV !== "production") {
    j.useEffect(() => {
      l !== (e !== void 0) && console.error([`MUI: A component is changing the ${l ? "" : "un"}controlled ${a} state of ${o} to be ${l ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${o} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [a, o, e]);
    const {
      current: g
    } = j.useRef(n);
    j.useEffect(() => {
      !l && !Object.is(g, n) && console.error([`MUI: A component is changing the default ${a} state of an uncontrolled ${o} after being initialized. To suppress this warning opt to use a controlled ${o}.`].join(`
`));
    }, [JSON.stringify(n)]);
  }
  const h = j.useCallback((g) => {
    l || f(g);
  }, []);
  return [d, h];
}
function Z0(e) {
  const n = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - n);
}
function Zb(e) {
  const n = typeof e;
  switch (n) {
    case "number":
      return Number.isNaN(e) ? "NaN" : Number.isFinite(e) ? e !== Math.floor(e) ? "float" : "number" : "Infinity";
    case "object":
      return e === null ? "null" : e.constructor.name;
    default:
      return n;
  }
}
function Kb(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Gb = Number.isInteger || Kb;
function K0(e, n, o, a) {
  const l = e[n];
  if (l == null || !Gb(l)) {
    const u = Zb(l);
    return new RangeError(`Invalid ${a} \`${n}\` of type \`${u}\` supplied to \`${o}\`, expected \`integer\`.`);
  }
  return null;
}
function G0(e, n, ...o) {
  return e[n] === void 0 ? null : K0(e, n, ...o);
}
function Uu() {
  return null;
}
G0.isRequired = K0;
Uu.isRequired = Uu;
const Y0 = process.env.NODE_ENV === "production" ? Uu : G0, Yb = /* @__PURE__ */ j.createContext();
process.env.NODE_ENV !== "production" && (i.node, i.bool);
const Xb = () => {
  const e = j.useContext(Yb);
  return e ?? !1;
};
function X0(e) {
  const {
    className: n,
    classes: o,
    pulsate: a = !1,
    rippleX: l,
    rippleY: u,
    rippleSize: f,
    in: d,
    onExited: h,
    timeout: g
  } = e, [b, x] = j.useState(!1), _ = He(n, o.ripple, o.rippleVisible, a && o.ripplePulsate), P = {
    width: f,
    height: f,
    top: -(f / 2) + u,
    left: -(f / 2) + l
  }, S = He(o.child, b && o.childLeaving, a && o.childPulsate);
  return !d && !b && x(!0), j.useEffect(() => {
    if (!d && h != null) {
      const C = setTimeout(h, g);
      return () => {
        clearTimeout(C);
      };
    }
  }, [h, d, g]), /* @__PURE__ */ v.jsx("span", {
    className: _,
    style: P,
    children: /* @__PURE__ */ v.jsx("span", {
      className: S
    })
  });
}
process.env.NODE_ENV !== "production" && (X0.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object.isRequired,
  className: i.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: i.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: i.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: i.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: i.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: i.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: i.number,
  /**
   * exit delay
   */
  timeout: i.number.isRequired
});
const Mn = ht("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), Jb = ["center", "classes", "className"];
let As = (e) => e, Hp, qp, Zp, Kp;
const Vu = 550, Qb = 80, e9 = hs(Hp || (Hp = As`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)), t9 = hs(qp || (qp = As`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)), n9 = hs(Zp || (Zp = As`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)), r9 = Re("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
}), o9 = Re(X0, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(Kp || (Kp = As`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), Mn.rippleVisible, e9, Vu, ({
  theme: e
}) => e.transitions.easing.easeInOut, Mn.ripplePulsate, ({
  theme: e
}) => e.transitions.duration.shorter, Mn.child, Mn.childLeaving, t9, Vu, ({
  theme: e
}) => e.transitions.easing.easeInOut, Mn.childPulsate, n9, ({
  theme: e
}) => e.transitions.easing.easeInOut), J0 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiTouchRipple"
  }), {
    center: l = !1,
    classes: u = {},
    className: f
  } = a, d = $e(a, Jb), [h, g] = j.useState([]), b = j.useRef(0), x = j.useRef(null);
  j.useEffect(() => {
    x.current && (x.current(), x.current = null);
  }, [h]);
  const _ = j.useRef(!1), P = B0(), S = j.useRef(null), C = j.useRef(null), E = j.useCallback((M) => {
    const {
      pulsate: O,
      rippleX: k,
      rippleY: L,
      rippleSize: J,
      cb: le
    } = M;
    g((G) => [...G, /* @__PURE__ */ v.jsx(o9, {
      classes: {
        ripple: He(u.ripple, Mn.ripple),
        rippleVisible: He(u.rippleVisible, Mn.rippleVisible),
        ripplePulsate: He(u.ripplePulsate, Mn.ripplePulsate),
        child: He(u.child, Mn.child),
        childLeaving: He(u.childLeaving, Mn.childLeaving),
        childPulsate: He(u.childPulsate, Mn.childPulsate)
      },
      timeout: Vu,
      pulsate: O,
      rippleX: k,
      rippleY: L,
      rippleSize: J
    }, b.current)]), b.current += 1, x.current = le;
  }, [u]), $ = j.useCallback((M = {}, O = {}, k = () => {
  }) => {
    const {
      pulsate: L = !1,
      center: J = l || O.pulsate,
      fakeElement: le = !1
      // For test purposes
    } = O;
    if ((M == null ? void 0 : M.type) === "mousedown" && _.current) {
      _.current = !1;
      return;
    }
    (M == null ? void 0 : M.type) === "touchstart" && (_.current = !0);
    const G = le ? null : C.current, ie = G ? G.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let ae, ee, Q;
    if (J || M === void 0 || M.clientX === 0 && M.clientY === 0 || !M.clientX && !M.touches)
      ae = Math.round(ie.width / 2), ee = Math.round(ie.height / 2);
    else {
      const {
        clientX: ne,
        clientY: te
      } = M.touches && M.touches.length > 0 ? M.touches[0] : M;
      ae = Math.round(ne - ie.left), ee = Math.round(te - ie.top);
    }
    if (J)
      Q = Math.sqrt((2 * ie.width ** 2 + ie.height ** 2) / 3), Q % 2 === 0 && (Q += 1);
    else {
      const ne = Math.max(Math.abs((G ? G.clientWidth : 0) - ae), ae) * 2 + 2, te = Math.max(Math.abs((G ? G.clientHeight : 0) - ee), ee) * 2 + 2;
      Q = Math.sqrt(ne ** 2 + te ** 2);
    }
    M != null && M.touches ? S.current === null && (S.current = () => {
      E({
        pulsate: L,
        rippleX: ae,
        rippleY: ee,
        rippleSize: Q,
        cb: k
      });
    }, P.start(Qb, () => {
      S.current && (S.current(), S.current = null);
    })) : E({
      pulsate: L,
      rippleX: ae,
      rippleY: ee,
      rippleSize: Q,
      cb: k
    });
  }, [l, E, P]), N = j.useCallback(() => {
    $({}, {
      pulsate: !0
    });
  }, [$]), A = j.useCallback((M, O) => {
    if (P.clear(), (M == null ? void 0 : M.type) === "touchend" && S.current) {
      S.current(), S.current = null, P.start(0, () => {
        A(M, O);
      });
      return;
    }
    S.current = null, g((k) => k.length > 0 ? k.slice(1) : k), x.current = O;
  }, [P]);
  return j.useImperativeHandle(o, () => ({
    pulsate: N,
    start: $,
    stop: A
  }), [N, $, A]), /* @__PURE__ */ v.jsx(r9, I({
    className: He(Mn.root, u.root, f),
    ref: C
  }, d, {
    children: /* @__PURE__ */ v.jsx(bc, {
      component: null,
      exit: !0,
      children: h
    })
  }));
});
process.env.NODE_ENV !== "production" && (J0.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: i.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string
});
function i9(e) {
  return ft("MuiButtonBase", e);
}
const a9 = ht("MuiButtonBase", ["root", "disabled", "focusVisible"]), s9 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"], l9 = (e) => {
  const {
    disabled: n,
    focusVisible: o,
    focusVisibleClassName: a,
    classes: l
  } = e, f = yt({
    root: ["root", n && "disabled", o && "focusVisible"]
  }, i9, l);
  return o && a && (f.root += ` ${a}`), f;
}, u9 = Re("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${a9.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), xc = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiButtonBase"
  }), {
    action: l,
    centerRipple: u = !1,
    children: f,
    className: d,
    component: h = "button",
    disabled: g = !1,
    disableRipple: b = !1,
    disableTouchRipple: x = !1,
    focusRipple: _ = !1,
    LinkComponent: P = "a",
    onBlur: S,
    onClick: C,
    onContextMenu: E,
    onDragLeave: $,
    onFocus: N,
    onFocusVisible: A,
    onKeyDown: M,
    onKeyUp: O,
    onMouseDown: k,
    onMouseLeave: L,
    onMouseUp: J,
    onTouchEnd: le,
    onTouchMove: G,
    onTouchStart: ie,
    tabIndex: ae = 0,
    TouchRippleProps: ee,
    touchRippleRef: Q,
    type: ne
  } = a, te = $e(a, s9), oe = j.useRef(null), X = j.useRef(null), Pe = en(X, Q), {
    isFocusVisibleRef: W,
    onFocus: Y,
    onBlur: he,
    ref: pe
  } = jb(), [re, fe] = j.useState(!1);
  g && re && fe(!1), j.useImperativeHandle(l, () => ({
    focusVisible: () => {
      fe(!0), oe.current.focus();
    }
  }), []);
  const [ue, ye] = j.useState(!1);
  j.useEffect(() => {
    ye(!0);
  }, []);
  const ge = ue && !b && !g;
  j.useEffect(() => {
    re && _ && !b && ue && X.current.pulsate();
  }, [b, _, re, ue]);
  function me(Te, Lt, ln = x) {
    return Eo((_n) => (Lt && Lt(_n), !ln && X.current && X.current[Te](_n), !0));
  }
  const _e = me("start", k), be = me("stop", E), Z = me("stop", $), Ee = me("stop", J), H = me("stop", (Te) => {
    re && Te.preventDefault(), L && L(Te);
  }), Ie = me("start", ie), st = me("stop", le), ot = me("stop", G), Dt = me("stop", (Te) => {
    he(Te), W.current === !1 && fe(!1), S && S(Te);
  }, !1), Ft = Eo((Te) => {
    oe.current || (oe.current = Te.currentTarget), Y(Te), W.current === !0 && (fe(!0), A && A(Te)), N && N(Te);
  }), It = () => {
    const Te = oe.current;
    return h && h !== "button" && !(Te.tagName === "A" && Te.href);
  }, ze = j.useRef(!1), xt = Eo((Te) => {
    _ && !ze.current && re && X.current && Te.key === " " && (ze.current = !0, X.current.stop(Te, () => {
      X.current.start(Te);
    })), Te.target === Te.currentTarget && It() && Te.key === " " && Te.preventDefault(), M && M(Te), Te.target === Te.currentTarget && It() && Te.key === "Enter" && !g && (Te.preventDefault(), C && C(Te));
  }), Ot = Eo((Te) => {
    _ && Te.key === " " && X.current && re && !Te.defaultPrevented && (ze.current = !1, X.current.stop(Te, () => {
      X.current.pulsate(Te);
    })), O && O(Te), C && Te.target === Te.currentTarget && It() && Te.key === " " && !Te.defaultPrevented && C(Te);
  });
  let it = h;
  it === "button" && (te.href || te.to) && (it = P);
  const St = {};
  it === "button" ? (St.type = ne === void 0 ? "button" : ne, St.disabled = g) : (!te.href && !te.to && (St.role = "button"), g && (St["aria-disabled"] = g));
  const xn = en(o, pe, oe);
  process.env.NODE_ENV !== "production" && j.useEffect(() => {
    ge && !X.current && console.error(["MUI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join(`
`));
  }, [ge]);
  const At = I({}, a, {
    centerRipple: u,
    component: h,
    disabled: g,
    disableRipple: b,
    disableTouchRipple: x,
    focusRipple: _,
    tabIndex: ae,
    focusVisible: re
  }), Fe = l9(At);
  return /* @__PURE__ */ v.jsxs(u9, I({
    as: it,
    className: He(Fe.root, d),
    ownerState: At,
    onBlur: Dt,
    onClick: C,
    onContextMenu: be,
    onFocus: Ft,
    onKeyDown: xt,
    onKeyUp: Ot,
    onMouseDown: _e,
    onMouseLeave: H,
    onMouseUp: Ee,
    onDragLeave: Z,
    onTouchEnd: st,
    onTouchMove: ot,
    onTouchStart: Ie,
    ref: xn,
    tabIndex: g ? -1 : ae,
    type: ne
  }, St, te, {
    children: [f, ge ? (
      /* TouchRipple is only needed client-side, x2 boost on the server. */
      /* @__PURE__ */ v.jsx(J0, I({
        ref: Pe,
        center: u
      }, ee))
    ) : null]
  }));
});
process.env.NODE_ENV !== "production" && (xc.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: dr,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: i.bool,
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: vc,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: i.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: i.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: i.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: i.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: i.string,
  /**
   * @ignore
   */
  href: i.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: i.elementType,
  /**
   * @ignore
   */
  onBlur: i.func,
  /**
   * @ignore
   */
  onClick: i.func,
  /**
   * @ignore
   */
  onContextMenu: i.func,
  /**
   * @ignore
   */
  onDragLeave: i.func,
  /**
   * @ignore
   */
  onFocus: i.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: i.func,
  /**
   * @ignore
   */
  onKeyDown: i.func,
  /**
   * @ignore
   */
  onKeyUp: i.func,
  /**
   * @ignore
   */
  onMouseDown: i.func,
  /**
   * @ignore
   */
  onMouseLeave: i.func,
  /**
   * @ignore
   */
  onMouseUp: i.func,
  /**
   * @ignore
   */
  onTouchEnd: i.func,
  /**
   * @ignore
   */
  onTouchMove: i.func,
  /**
   * @ignore
   */
  onTouchStart: i.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * @default 0
   */
  tabIndex: i.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: i.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: i.oneOfType([i.func, i.shape({
    current: i.shape({
      pulsate: i.func.isRequired,
      start: i.func.isRequired,
      stop: i.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: i.oneOfType([i.oneOf(["button", "reset", "submit"]), i.string])
});
function c9(e) {
  return ft("MuiButton", e);
}
const La = ht("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), Q0 = /* @__PURE__ */ j.createContext({});
process.env.NODE_ENV !== "production" && (Q0.displayName = "ButtonGroupContext");
const eh = /* @__PURE__ */ j.createContext(void 0);
process.env.NODE_ENV !== "production" && (eh.displayName = "ButtonGroupButtonContext");
const f9 = ["children", "color", "component", "className", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"], d9 = (e) => {
  const {
    color: n,
    disableElevation: o,
    fullWidth: a,
    size: l,
    variant: u,
    classes: f
  } = e, d = {
    root: ["root", u, `${u}${Ne(n)}`, `size${Ne(l)}`, `${u}Size${Ne(l)}`, `color${Ne(n)}`, o && "disableElevation", a && "fullWidth"],
    label: ["label"],
    startIcon: ["icon", "startIcon", `iconSize${Ne(l)}`],
    endIcon: ["icon", "endIcon", `iconSize${Ne(l)}`]
  }, h = yt(d, c9, f);
  return I({}, f, h);
}, th = (e) => I({}, e.size === "small" && {
  "& > *:nth-of-type(1)": {
    fontSize: 18
  }
}, e.size === "medium" && {
  "& > *:nth-of-type(1)": {
    fontSize: 20
  }
}, e.size === "large" && {
  "& > *:nth-of-type(1)": {
    fontSize: 22
  }
}), p9 = Re(xc, {
  shouldForwardProp: (e) => Wn(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, n[o.variant], n[`${o.variant}${Ne(o.color)}`], n[`size${Ne(o.size)}`], n[`${o.variant}Size${Ne(o.size)}`], o.color === "inherit" && n.colorInherit, o.disableElevation && n.disableElevation, o.fullWidth && n.fullWidth];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var o, a;
  const l = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800], u = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
  return I({}, e.typography.button, {
    minWidth: 64,
    padding: "6px 16px",
    borderRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: e.transitions.duration.short
    }),
    "&:hover": I({
      textDecoration: "none",
      backgroundColor: e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Or(e.palette.text.primary, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, n.variant === "text" && n.color !== "inherit" && {
      backgroundColor: e.vars ? `rgba(${e.vars.palette[n.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Or(e.palette[n.color].main, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, n.variant === "outlined" && n.color !== "inherit" && {
      border: `1px solid ${(e.vars || e).palette[n.color].main}`,
      backgroundColor: e.vars ? `rgba(${e.vars.palette[n.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Or(e.palette[n.color].main, e.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, n.variant === "contained" && {
      backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedHoverBg : u,
      boxShadow: (e.vars || e).shadows[4],
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: (e.vars || e).shadows[2],
        backgroundColor: (e.vars || e).palette.grey[300]
      }
    }, n.variant === "contained" && n.color !== "inherit" && {
      backgroundColor: (e.vars || e).palette[n.color].dark,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: (e.vars || e).palette[n.color].main
      }
    }),
    "&:active": I({}, n.variant === "contained" && {
      boxShadow: (e.vars || e).shadows[8]
    }),
    [`&.${La.focusVisible}`]: I({}, n.variant === "contained" && {
      boxShadow: (e.vars || e).shadows[6]
    }),
    [`&.${La.disabled}`]: I({
      color: (e.vars || e).palette.action.disabled
    }, n.variant === "outlined" && {
      border: `1px solid ${(e.vars || e).palette.action.disabledBackground}`
    }, n.variant === "contained" && {
      color: (e.vars || e).palette.action.disabled,
      boxShadow: (e.vars || e).shadows[0],
      backgroundColor: (e.vars || e).palette.action.disabledBackground
    })
  }, n.variant === "text" && {
    padding: "6px 8px"
  }, n.variant === "text" && n.color !== "inherit" && {
    color: (e.vars || e).palette[n.color].main
  }, n.variant === "outlined" && {
    padding: "5px 15px",
    border: "1px solid currentColor"
  }, n.variant === "outlined" && n.color !== "inherit" && {
    color: (e.vars || e).palette[n.color].main,
    border: e.vars ? `1px solid rgba(${e.vars.palette[n.color].mainChannel} / 0.5)` : `1px solid ${Or(e.palette[n.color].main, 0.5)}`
  }, n.variant === "contained" && {
    color: e.vars ? (
      // this is safe because grey does not change between default light/dark mode
      e.vars.palette.text.primary
    ) : (o = (a = e.palette).getContrastText) == null ? void 0 : o.call(a, e.palette.grey[300]),
    backgroundColor: e.vars ? e.vars.palette.Button.inheritContainedBg : l,
    boxShadow: (e.vars || e).shadows[2]
  }, n.variant === "contained" && n.color !== "inherit" && {
    color: (e.vars || e).palette[n.color].contrastText,
    backgroundColor: (e.vars || e).palette[n.color].main
  }, n.color === "inherit" && {
    color: "inherit",
    borderColor: "currentColor"
  }, n.size === "small" && n.variant === "text" && {
    padding: "4px 5px",
    fontSize: e.typography.pxToRem(13)
  }, n.size === "large" && n.variant === "text" && {
    padding: "8px 11px",
    fontSize: e.typography.pxToRem(15)
  }, n.size === "small" && n.variant === "outlined" && {
    padding: "3px 9px",
    fontSize: e.typography.pxToRem(13)
  }, n.size === "large" && n.variant === "outlined" && {
    padding: "7px 21px",
    fontSize: e.typography.pxToRem(15)
  }, n.size === "small" && n.variant === "contained" && {
    padding: "4px 10px",
    fontSize: e.typography.pxToRem(13)
  }, n.size === "large" && n.variant === "contained" && {
    padding: "8px 22px",
    fontSize: e.typography.pxToRem(15)
  }, n.fullWidth && {
    width: "100%"
  });
}, ({
  ownerState: e
}) => e.disableElevation && {
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none"
  },
  [`&.${La.focusVisible}`]: {
    boxShadow: "none"
  },
  "&:active": {
    boxShadow: "none"
  },
  [`&.${La.disabled}`]: {
    boxShadow: "none"
  }
}), h9 = Re("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.startIcon, n[`iconSize${Ne(o.size)}`]];
  }
})(({
  ownerState: e
}) => I({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4
}, e.size === "small" && {
  marginLeft: -2
}, th(e))), g9 = Re("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.endIcon, n[`iconSize${Ne(o.size)}`]];
  }
})(({
  ownerState: e
}) => I({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8
}, e.size === "small" && {
  marginRight: -2
}, th(e))), nh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = j.useContext(Q0), l = j.useContext(eh), u = oc(a, n), f = bt({
    props: u,
    name: "MuiButton"
  }), {
    children: d,
    color: h = "primary",
    component: g = "button",
    className: b,
    disabled: x = !1,
    disableElevation: _ = !1,
    disableFocusRipple: P = !1,
    endIcon: S,
    focusVisibleClassName: C,
    fullWidth: E = !1,
    size: $ = "medium",
    startIcon: N,
    type: A,
    variant: M = "text"
  } = f, O = $e(f, f9), k = I({}, f, {
    color: h,
    component: g,
    disabled: x,
    disableElevation: _,
    disableFocusRipple: P,
    fullWidth: E,
    size: $,
    type: A,
    variant: M
  }), L = d9(k), J = N && /* @__PURE__ */ v.jsx(h9, {
    className: L.startIcon,
    ownerState: k,
    children: N
  }), le = S && /* @__PURE__ */ v.jsx(g9, {
    className: L.endIcon,
    ownerState: k,
    children: S
  }), G = l || "";
  return /* @__PURE__ */ v.jsxs(p9, I({
    ownerState: k,
    className: He(a.className, L.root, b, G),
    component: g,
    disabled: x,
    focusRipple: !P,
    focusVisibleClassName: He(L.focusVisible, C),
    ref: o,
    type: A
  }, O, {
    classes: L,
    children: [J, d, le]
  }));
});
process.env.NODE_ENV !== "production" && (nh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: i.oneOfType([i.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), i.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: i.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: i.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: i.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: i.bool,
  /**
   * Element placed after the children.
   */
  endIcon: i.node,
  /**
   * @ignore
   */
  focusVisibleClassName: i.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: i.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: i.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: i.oneOfType([i.oneOf(["small", "medium", "large"]), i.string]),
  /**
   * Element placed before the children.
   */
  startIcon: i.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * @ignore
   */
  type: i.oneOfType([i.oneOf(["button", "reset", "submit"]), i.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: i.oneOfType([i.oneOf(["contained", "outlined", "text"]), i.string])
});
function Hu(e) {
  return /* @__PURE__ */ v.jsx(nh, { ...e });
}
function m9(e) {
  return ft("MuiTypography", e);
}
ht("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const v9 = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"], y9 = (e) => {
  const {
    align: n,
    gutterBottom: o,
    noWrap: a,
    paragraph: l,
    variant: u,
    classes: f
  } = e, d = {
    root: ["root", u, e.align !== "inherit" && `align${Ne(n)}`, o && "gutterBottom", a && "noWrap", l && "paragraph"]
  };
  return yt(d, m9, f);
}, b9 = Re("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, o.variant && n[o.variant], o.align !== "inherit" && n[`align${Ne(o.align)}`], o.noWrap && n.noWrap, o.gutterBottom && n.gutterBottom, o.paragraph && n.paragraph];
  }
})(({
  theme: e,
  ownerState: n
}) => I({
  margin: 0
}, n.variant === "inherit" && {
  // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
  font: "inherit"
}, n.variant !== "inherit" && e.typography[n.variant], n.align !== "inherit" && {
  textAlign: n.align
}, n.noWrap && {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, n.gutterBottom && {
  marginBottom: "0.35em"
}, n.paragraph && {
  marginBottom: 16
})), Gp = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
}, x9 = {
  primary: "primary.main",
  textPrimary: "text.primary",
  secondary: "secondary.main",
  textSecondary: "text.secondary",
  error: "error.main"
}, _9 = (e) => x9[e] || e, rh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiTypography"
  }), l = _9(a.color), u = F0(I({}, a, {
    color: l
  })), {
    align: f = "inherit",
    className: d,
    component: h,
    gutterBottom: g = !1,
    noWrap: b = !1,
    paragraph: x = !1,
    variant: _ = "body1",
    variantMapping: P = Gp
  } = u, S = $e(u, v9), C = I({}, u, {
    align: f,
    color: l,
    className: d,
    component: h,
    gutterBottom: g,
    noWrap: b,
    paragraph: x,
    variant: _,
    variantMapping: P
  }), E = h || (x ? "p" : P[_] || Gp[_]) || "span", $ = y9(C);
  return /* @__PURE__ */ v.jsx(b9, I({
    as: E,
    ref: o,
    ownerState: C,
    className: He($.root, d)
  }, S));
});
process.env.NODE_ENV !== "production" && (rh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: i.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: i.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: i.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   */
  paragraph: i.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: i.oneOfType([i.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), i.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: i.object
});
function CA(e) {
  return /* @__PURE__ */ v.jsx(rh, { ...e });
}
function E9(e) {
  var n = typeof e;
  return e != null && (n == "object" || n == "function");
}
var Di = E9, T9 = typeof ur == "object" && ur && ur.Object === Object && ur, oh = T9, C9 = oh, O9 = typeof self == "object" && self && self.Object === Object && self, S9 = C9 || O9 || Function("return this")(), Xn = S9, w9 = Xn, R9 = function() {
  return w9.Date.now();
}, $9 = R9, P9 = /\s/;
function I9(e) {
  for (var n = e.length; n-- && P9.test(e.charAt(n)); )
    ;
  return n;
}
var A9 = I9, M9 = A9, N9 = /^\s+/;
function j9(e) {
  return e && e.slice(0, M9(e) + 1).replace(N9, "");
}
var D9 = j9, F9 = Xn, k9 = F9.Symbol, Ms = k9, Yp = Ms, ih = Object.prototype, L9 = ih.hasOwnProperty, B9 = ih.toString, hi = Yp ? Yp.toStringTag : void 0;
function z9(e) {
  var n = L9.call(e, hi), o = e[hi];
  try {
    e[hi] = void 0;
    var a = !0;
  } catch {
  }
  var l = B9.call(e);
  return a && (n ? e[hi] = o : delete e[hi]), l;
}
var W9 = z9, U9 = Object.prototype, V9 = U9.toString;
function H9(e) {
  return V9.call(e);
}
var q9 = H9, Xp = Ms, Z9 = W9, K9 = q9, G9 = "[object Null]", Y9 = "[object Undefined]", Jp = Xp ? Xp.toStringTag : void 0;
function X9(e) {
  return e == null ? e === void 0 ? Y9 : G9 : Jp && Jp in Object(e) ? Z9(e) : K9(e);
}
var Fi = X9;
function J9(e) {
  return e != null && typeof e == "object";
}
var ki = J9, Q9 = Fi, ex = ki, tx = "[object Symbol]";
function nx(e) {
  return typeof e == "symbol" || ex(e) && Q9(e) == tx;
}
var Ns = nx, rx = D9, Qp = Di, ox = Ns, e1 = NaN, ix = /^[-+]0x[0-9a-f]+$/i, ax = /^0b[01]+$/i, sx = /^0o[0-7]+$/i, lx = parseInt;
function ux(e) {
  if (typeof e == "number")
    return e;
  if (ox(e))
    return e1;
  if (Qp(e)) {
    var n = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Qp(n) ? n + "" : n;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = rx(e);
  var o = ax.test(e);
  return o || sx.test(e) ? lx(e.slice(2), o ? 2 : 8) : ix.test(e) ? e1 : +e;
}
var ah = ux, cx = Di, Eu = $9, t1 = ah, fx = "Expected a function", dx = Math.max, px = Math.min;
function hx(e, n, o) {
  var a, l, u, f, d, h, g = 0, b = !1, x = !1, _ = !0;
  if (typeof e != "function")
    throw new TypeError(fx);
  n = t1(n) || 0, cx(o) && (b = !!o.leading, x = "maxWait" in o, u = x ? dx(t1(o.maxWait) || 0, n) : u, _ = "trailing" in o ? !!o.trailing : _);
  function P(k) {
    var L = a, J = l;
    return a = l = void 0, g = k, f = e.apply(J, L), f;
  }
  function S(k) {
    return g = k, d = setTimeout($, n), b ? P(k) : f;
  }
  function C(k) {
    var L = k - h, J = k - g, le = n - L;
    return x ? px(le, u - J) : le;
  }
  function E(k) {
    var L = k - h, J = k - g;
    return h === void 0 || L >= n || L < 0 || x && J >= u;
  }
  function $() {
    var k = Eu();
    if (E(k))
      return N(k);
    d = setTimeout($, C(k));
  }
  function N(k) {
    return d = void 0, _ && a ? P(k) : (a = l = void 0, f);
  }
  function A() {
    d !== void 0 && clearTimeout(d), g = 0, a = h = l = d = void 0;
  }
  function M() {
    return d === void 0 ? f : N(Eu());
  }
  function O() {
    var k = Eu(), L = E(k);
    if (a = arguments, l = this, h = k, L) {
      if (d === void 0)
        return S(h);
      if (x)
        return clearTimeout(d), d = setTimeout($, n), P(h);
    }
    return d === void 0 && (d = setTimeout($, n)), f;
  }
  return O.cancel = A, O.flush = M, O;
}
var gx = hx;
const sh = /* @__PURE__ */ gs(gx);
var ns = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
ns.exports;
(function(e, n) {
  (function() {
    var o, a = "4.17.21", l = 200, u = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", f = "Expected a function", d = "Invalid `variable` option passed into `_.template`", h = "__lodash_hash_undefined__", g = 500, b = "__lodash_placeholder__", x = 1, _ = 2, P = 4, S = 1, C = 2, E = 1, $ = 2, N = 4, A = 8, M = 16, O = 32, k = 64, L = 128, J = 256, le = 512, G = 30, ie = "...", ae = 800, ee = 16, Q = 1, ne = 2, te = 3, oe = 1 / 0, X = 9007199254740991, Pe = 17976931348623157e292, W = NaN, Y = 4294967295, he = Y - 1, pe = Y >>> 1, re = [
      ["ary", L],
      ["bind", E],
      ["bindKey", $],
      ["curry", A],
      ["curryRight", M],
      ["flip", le],
      ["partial", O],
      ["partialRight", k],
      ["rearg", J]
    ], fe = "[object Arguments]", ue = "[object Array]", ye = "[object AsyncFunction]", ge = "[object Boolean]", me = "[object Date]", _e = "[object DOMException]", be = "[object Error]", Z = "[object Function]", Ee = "[object GeneratorFunction]", H = "[object Map]", Ie = "[object Number]", st = "[object Null]", ot = "[object Object]", Dt = "[object Promise]", Ft = "[object Proxy]", It = "[object RegExp]", ze = "[object Set]", xt = "[object String]", Ot = "[object Symbol]", it = "[object Undefined]", St = "[object WeakMap]", xn = "[object WeakSet]", At = "[object ArrayBuffer]", Fe = "[object DataView]", Te = "[object Float32Array]", Lt = "[object Float64Array]", ln = "[object Int8Array]", _n = "[object Int16Array]", Jn = "[object Int32Array]", xe = "[object Uint8Array]", Le = "[object Uint8ClampedArray]", gt = "[object Uint16Array]", En = "[object Uint32Array]", Xr = /\b__p \+= '';/g, Ho = /\b(__p \+=) '' \+/g, zi = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Qn = /&(?:amp|lt|gt|quot|#39);/g, Jr = /[&<>"']/g, qo = RegExp(Qn.source), Wi = RegExp(Jr.source), Ks = /<%-([\s\S]+?)%>/g, Ui = /<%([\s\S]+?)%>/g, Vi = /<%=([\s\S]+?)%>/g, Hi = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, qi = /^\w*$/, Gs = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Zo = /[\\^$.*+?()[\]{}|]/g, Zi = RegExp(Zo.source), Qr = /^\s+/, Ys = /\s/, Xs = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Js = /\{\n\/\* \[wrapped with (.+)\] \*/, Qs = /,? & /, w = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, K = /[()=,{}\[\]\/\s]/, ce = /\\(\\)?/g, we = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ze = /\w*$/, nt = /^[-+]0x[0-9a-f]+$/i, Ue = /^0b[01]+$/i, Be = /^\[object .+?Constructor\]$/, Bt = /^0o[0-7]+$/i, mt = /^(?:0|[1-9]\d*)$/, _t = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, zt = /($^)/, pr = /['\n\r\u2028\u2029\\]/g, Tn = "\\ud800-\\udfff", Zt = "\\u0300-\\u036f", Ko = "\\ufe20-\\ufe2f", el = "\\u20d0-\\u20ff", Ki = Zt + Ko + el, Dc = "\\u2700-\\u27bf", Fc = "a-z\\xdf-\\xf6\\xf8-\\xff", h2 = "\\xac\\xb1\\xd7\\xf7", g2 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", m2 = "\\u2000-\\u206f", v2 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", kc = "A-Z\\xc0-\\xd6\\xd8-\\xde", Lc = "\\ufe0e\\ufe0f", Bc = h2 + g2 + m2 + v2, tl = "['’]", y2 = "[" + Tn + "]", zc = "[" + Bc + "]", Gi = "[" + Ki + "]", Wc = "\\d+", b2 = "[" + Dc + "]", Uc = "[" + Fc + "]", Vc = "[^" + Tn + Bc + Wc + Dc + Fc + kc + "]", nl = "\\ud83c[\\udffb-\\udfff]", x2 = "(?:" + Gi + "|" + nl + ")", Hc = "[^" + Tn + "]", rl = "(?:\\ud83c[\\udde6-\\uddff]){2}", ol = "[\\ud800-\\udbff][\\udc00-\\udfff]", eo = "[" + kc + "]", qc = "\\u200d", Zc = "(?:" + Uc + "|" + Vc + ")", _2 = "(?:" + eo + "|" + Vc + ")", Kc = "(?:" + tl + "(?:d|ll|m|re|s|t|ve))?", Gc = "(?:" + tl + "(?:D|LL|M|RE|S|T|VE))?", Yc = x2 + "?", Xc = "[" + Lc + "]?", E2 = "(?:" + qc + "(?:" + [Hc, rl, ol].join("|") + ")" + Xc + Yc + ")*", T2 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", C2 = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Jc = Xc + Yc + E2, O2 = "(?:" + [b2, rl, ol].join("|") + ")" + Jc, S2 = "(?:" + [Hc + Gi + "?", Gi, rl, ol, y2].join("|") + ")", w2 = RegExp(tl, "g"), R2 = RegExp(Gi, "g"), il = RegExp(nl + "(?=" + nl + ")|" + S2 + Jc, "g"), $2 = RegExp([
      eo + "?" + Uc + "+" + Kc + "(?=" + [zc, eo, "$"].join("|") + ")",
      _2 + "+" + Gc + "(?=" + [zc, eo + Zc, "$"].join("|") + ")",
      eo + "?" + Zc + "+" + Kc,
      eo + "+" + Gc,
      C2,
      T2,
      Wc,
      O2
    ].join("|"), "g"), P2 = RegExp("[" + qc + Tn + Ki + Lc + "]"), I2 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, A2 = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], M2 = -1, ut = {};
    ut[Te] = ut[Lt] = ut[ln] = ut[_n] = ut[Jn] = ut[xe] = ut[Le] = ut[gt] = ut[En] = !0, ut[fe] = ut[ue] = ut[At] = ut[ge] = ut[Fe] = ut[me] = ut[be] = ut[Z] = ut[H] = ut[Ie] = ut[ot] = ut[It] = ut[ze] = ut[xt] = ut[St] = !1;
    var lt = {};
    lt[fe] = lt[ue] = lt[At] = lt[Fe] = lt[ge] = lt[me] = lt[Te] = lt[Lt] = lt[ln] = lt[_n] = lt[Jn] = lt[H] = lt[Ie] = lt[ot] = lt[It] = lt[ze] = lt[xt] = lt[Ot] = lt[xe] = lt[Le] = lt[gt] = lt[En] = !0, lt[be] = lt[Z] = lt[St] = !1;
    var N2 = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, j2 = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, D2 = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, F2 = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, k2 = parseFloat, L2 = parseInt, Qc = typeof ur == "object" && ur && ur.Object === Object && ur, B2 = typeof self == "object" && self && self.Object === Object && self, Wt = Qc || B2 || Function("return this")(), al = n && !n.nodeType && n, $r = al && !0 && e && !e.nodeType && e, ef = $r && $r.exports === al, sl = ef && Qc.process, Cn = function() {
      try {
        var D = $r && $r.require && $r.require("util").types;
        return D || sl && sl.binding && sl.binding("util");
      } catch {
      }
    }(), tf = Cn && Cn.isArrayBuffer, nf = Cn && Cn.isDate, rf = Cn && Cn.isMap, of = Cn && Cn.isRegExp, af = Cn && Cn.isSet, sf = Cn && Cn.isTypedArray;
    function un(D, z, B) {
      switch (B.length) {
        case 0:
          return D.call(z);
        case 1:
          return D.call(z, B[0]);
        case 2:
          return D.call(z, B[0], B[1]);
        case 3:
          return D.call(z, B[0], B[1], B[2]);
      }
      return D.apply(z, B);
    }
    function z2(D, z, B, de) {
      for (var Ae = -1, Ke = D == null ? 0 : D.length; ++Ae < Ke; ) {
        var Nt = D[Ae];
        z(de, Nt, B(Nt), D);
      }
      return de;
    }
    function On(D, z) {
      for (var B = -1, de = D == null ? 0 : D.length; ++B < de && z(D[B], B, D) !== !1; )
        ;
      return D;
    }
    function W2(D, z) {
      for (var B = D == null ? 0 : D.length; B-- && z(D[B], B, D) !== !1; )
        ;
      return D;
    }
    function lf(D, z) {
      for (var B = -1, de = D == null ? 0 : D.length; ++B < de; )
        if (!z(D[B], B, D))
          return !1;
      return !0;
    }
    function hr(D, z) {
      for (var B = -1, de = D == null ? 0 : D.length, Ae = 0, Ke = []; ++B < de; ) {
        var Nt = D[B];
        z(Nt, B, D) && (Ke[Ae++] = Nt);
      }
      return Ke;
    }
    function Yi(D, z) {
      var B = D == null ? 0 : D.length;
      return !!B && to(D, z, 0) > -1;
    }
    function ll(D, z, B) {
      for (var de = -1, Ae = D == null ? 0 : D.length; ++de < Ae; )
        if (B(z, D[de]))
          return !0;
      return !1;
    }
    function dt(D, z) {
      for (var B = -1, de = D == null ? 0 : D.length, Ae = Array(de); ++B < de; )
        Ae[B] = z(D[B], B, D);
      return Ae;
    }
    function gr(D, z) {
      for (var B = -1, de = z.length, Ae = D.length; ++B < de; )
        D[Ae + B] = z[B];
      return D;
    }
    function ul(D, z, B, de) {
      var Ae = -1, Ke = D == null ? 0 : D.length;
      for (de && Ke && (B = D[++Ae]); ++Ae < Ke; )
        B = z(B, D[Ae], Ae, D);
      return B;
    }
    function U2(D, z, B, de) {
      var Ae = D == null ? 0 : D.length;
      for (de && Ae && (B = D[--Ae]); Ae--; )
        B = z(B, D[Ae], Ae, D);
      return B;
    }
    function cl(D, z) {
      for (var B = -1, de = D == null ? 0 : D.length; ++B < de; )
        if (z(D[B], B, D))
          return !0;
      return !1;
    }
    var V2 = fl("length");
    function H2(D) {
      return D.split("");
    }
    function q2(D) {
      return D.match(w) || [];
    }
    function uf(D, z, B) {
      var de;
      return B(D, function(Ae, Ke, Nt) {
        if (z(Ae, Ke, Nt))
          return de = Ke, !1;
      }), de;
    }
    function Xi(D, z, B, de) {
      for (var Ae = D.length, Ke = B + (de ? 1 : -1); de ? Ke-- : ++Ke < Ae; )
        if (z(D[Ke], Ke, D))
          return Ke;
      return -1;
    }
    function to(D, z, B) {
      return z === z ? o4(D, z, B) : Xi(D, cf, B);
    }
    function Z2(D, z, B, de) {
      for (var Ae = B - 1, Ke = D.length; ++Ae < Ke; )
        if (de(D[Ae], z))
          return Ae;
      return -1;
    }
    function cf(D) {
      return D !== D;
    }
    function ff(D, z) {
      var B = D == null ? 0 : D.length;
      return B ? pl(D, z) / B : W;
    }
    function fl(D) {
      return function(z) {
        return z == null ? o : z[D];
      };
    }
    function dl(D) {
      return function(z) {
        return D == null ? o : D[z];
      };
    }
    function df(D, z, B, de, Ae) {
      return Ae(D, function(Ke, Nt, at) {
        B = de ? (de = !1, Ke) : z(B, Ke, Nt, at);
      }), B;
    }
    function K2(D, z) {
      var B = D.length;
      for (D.sort(z); B--; )
        D[B] = D[B].value;
      return D;
    }
    function pl(D, z) {
      for (var B, de = -1, Ae = D.length; ++de < Ae; ) {
        var Ke = z(D[de]);
        Ke !== o && (B = B === o ? Ke : B + Ke);
      }
      return B;
    }
    function hl(D, z) {
      for (var B = -1, de = Array(D); ++B < D; )
        de[B] = z(B);
      return de;
    }
    function G2(D, z) {
      return dt(z, function(B) {
        return [B, D[B]];
      });
    }
    function pf(D) {
      return D && D.slice(0, vf(D) + 1).replace(Qr, "");
    }
    function cn(D) {
      return function(z) {
        return D(z);
      };
    }
    function gl(D, z) {
      return dt(z, function(B) {
        return D[B];
      });
    }
    function Go(D, z) {
      return D.has(z);
    }
    function hf(D, z) {
      for (var B = -1, de = D.length; ++B < de && to(z, D[B], 0) > -1; )
        ;
      return B;
    }
    function gf(D, z) {
      for (var B = D.length; B-- && to(z, D[B], 0) > -1; )
        ;
      return B;
    }
    function Y2(D, z) {
      for (var B = D.length, de = 0; B--; )
        D[B] === z && ++de;
      return de;
    }
    var X2 = dl(N2), J2 = dl(j2);
    function Q2(D) {
      return "\\" + F2[D];
    }
    function e4(D, z) {
      return D == null ? o : D[z];
    }
    function no(D) {
      return P2.test(D);
    }
    function t4(D) {
      return I2.test(D);
    }
    function n4(D) {
      for (var z, B = []; !(z = D.next()).done; )
        B.push(z.value);
      return B;
    }
    function ml(D) {
      var z = -1, B = Array(D.size);
      return D.forEach(function(de, Ae) {
        B[++z] = [Ae, de];
      }), B;
    }
    function mf(D, z) {
      return function(B) {
        return D(z(B));
      };
    }
    function mr(D, z) {
      for (var B = -1, de = D.length, Ae = 0, Ke = []; ++B < de; ) {
        var Nt = D[B];
        (Nt === z || Nt === b) && (D[B] = b, Ke[Ae++] = B);
      }
      return Ke;
    }
    function Ji(D) {
      var z = -1, B = Array(D.size);
      return D.forEach(function(de) {
        B[++z] = de;
      }), B;
    }
    function r4(D) {
      var z = -1, B = Array(D.size);
      return D.forEach(function(de) {
        B[++z] = [de, de];
      }), B;
    }
    function o4(D, z, B) {
      for (var de = B - 1, Ae = D.length; ++de < Ae; )
        if (D[de] === z)
          return de;
      return -1;
    }
    function i4(D, z, B) {
      for (var de = B + 1; de--; )
        if (D[de] === z)
          return de;
      return de;
    }
    function ro(D) {
      return no(D) ? s4(D) : V2(D);
    }
    function kn(D) {
      return no(D) ? l4(D) : H2(D);
    }
    function vf(D) {
      for (var z = D.length; z-- && Ys.test(D.charAt(z)); )
        ;
      return z;
    }
    var a4 = dl(D2);
    function s4(D) {
      for (var z = il.lastIndex = 0; il.test(D); )
        ++z;
      return z;
    }
    function l4(D) {
      return D.match(il) || [];
    }
    function u4(D) {
      return D.match($2) || [];
    }
    var c4 = function D(z) {
      z = z == null ? Wt : oo.defaults(Wt.Object(), z, oo.pick(Wt, A2));
      var B = z.Array, de = z.Date, Ae = z.Error, Ke = z.Function, Nt = z.Math, at = z.Object, vl = z.RegExp, f4 = z.String, Sn = z.TypeError, Qi = B.prototype, d4 = Ke.prototype, io = at.prototype, ea = z["__core-js_shared__"], ta = d4.toString, rt = io.hasOwnProperty, p4 = 0, yf = function() {
        var t = /[^.]+$/.exec(ea && ea.keys && ea.keys.IE_PROTO || "");
        return t ? "Symbol(src)_1." + t : "";
      }(), na = io.toString, h4 = ta.call(at), g4 = Wt._, m4 = vl(
        "^" + ta.call(rt).replace(Zo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), ra = ef ? z.Buffer : o, vr = z.Symbol, oa = z.Uint8Array, bf = ra ? ra.allocUnsafe : o, ia = mf(at.getPrototypeOf, at), xf = at.create, _f = io.propertyIsEnumerable, aa = Qi.splice, Ef = vr ? vr.isConcatSpreadable : o, Yo = vr ? vr.iterator : o, Pr = vr ? vr.toStringTag : o, sa = function() {
        try {
          var t = jr(at, "defineProperty");
          return t({}, "", {}), t;
        } catch {
        }
      }(), v4 = z.clearTimeout !== Wt.clearTimeout && z.clearTimeout, y4 = de && de.now !== Wt.Date.now && de.now, b4 = z.setTimeout !== Wt.setTimeout && z.setTimeout, la = Nt.ceil, ua = Nt.floor, yl = at.getOwnPropertySymbols, x4 = ra ? ra.isBuffer : o, Tf = z.isFinite, _4 = Qi.join, E4 = mf(at.keys, at), jt = Nt.max, Kt = Nt.min, T4 = de.now, C4 = z.parseInt, Cf = Nt.random, O4 = Qi.reverse, bl = jr(z, "DataView"), Xo = jr(z, "Map"), xl = jr(z, "Promise"), ao = jr(z, "Set"), Jo = jr(z, "WeakMap"), Qo = jr(at, "create"), ca = Jo && new Jo(), so = {}, S4 = Dr(bl), w4 = Dr(Xo), R4 = Dr(xl), $4 = Dr(ao), P4 = Dr(Jo), fa = vr ? vr.prototype : o, ei = fa ? fa.valueOf : o, Of = fa ? fa.toString : o;
      function m(t) {
        if (Et(t) && !Me(t) && !(t instanceof Ve)) {
          if (t instanceof wn)
            return t;
          if (rt.call(t, "__wrapped__"))
            return Sd(t);
        }
        return new wn(t);
      }
      var lo = /* @__PURE__ */ function() {
        function t() {
        }
        return function(r) {
          if (!vt(r))
            return {};
          if (xf)
            return xf(r);
          t.prototype = r;
          var s = new t();
          return t.prototype = o, s;
        };
      }();
      function da() {
      }
      function wn(t, r) {
        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!r, this.__index__ = 0, this.__values__ = o;
      }
      m.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: Ks,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: Ui,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Vi,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: m
        }
      }, m.prototype = da.prototype, m.prototype.constructor = m, wn.prototype = lo(da.prototype), wn.prototype.constructor = wn;
      function Ve(t) {
        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Y, this.__views__ = [];
      }
      function I4() {
        var t = new Ve(this.__wrapped__);
        return t.__actions__ = tn(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = tn(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = tn(this.__views__), t;
      }
      function A4() {
        if (this.__filtered__) {
          var t = new Ve(this);
          t.__dir__ = -1, t.__filtered__ = !0;
        } else
          t = this.clone(), t.__dir__ *= -1;
        return t;
      }
      function M4() {
        var t = this.__wrapped__.value(), r = this.__dir__, s = Me(t), c = r < 0, p = s ? t.length : 0, y = Hg(0, p, this.__views__), T = y.start, R = y.end, F = R - T, U = c ? R : T - 1, V = this.__iteratees__, q = V.length, se = 0, ve = Kt(F, this.__takeCount__);
        if (!s || !c && p == F && ve == F)
          return Gf(t, this.__actions__);
        var Oe = [];
        e:
          for (; F-- && se < ve; ) {
            U += r;
            for (var De = -1, Se = t[U]; ++De < q; ) {
              var We = V[De], qe = We.iteratee, pn = We.type, Qt = qe(Se);
              if (pn == ne)
                Se = Qt;
              else if (!Qt) {
                if (pn == Q)
                  continue e;
                break e;
              }
            }
            Oe[se++] = Se;
          }
        return Oe;
      }
      Ve.prototype = lo(da.prototype), Ve.prototype.constructor = Ve;
      function Ir(t) {
        var r = -1, s = t == null ? 0 : t.length;
        for (this.clear(); ++r < s; ) {
          var c = t[r];
          this.set(c[0], c[1]);
        }
      }
      function N4() {
        this.__data__ = Qo ? Qo(null) : {}, this.size = 0;
      }
      function j4(t) {
        var r = this.has(t) && delete this.__data__[t];
        return this.size -= r ? 1 : 0, r;
      }
      function D4(t) {
        var r = this.__data__;
        if (Qo) {
          var s = r[t];
          return s === h ? o : s;
        }
        return rt.call(r, t) ? r[t] : o;
      }
      function F4(t) {
        var r = this.__data__;
        return Qo ? r[t] !== o : rt.call(r, t);
      }
      function k4(t, r) {
        var s = this.__data__;
        return this.size += this.has(t) ? 0 : 1, s[t] = Qo && r === o ? h : r, this;
      }
      Ir.prototype.clear = N4, Ir.prototype.delete = j4, Ir.prototype.get = D4, Ir.prototype.has = F4, Ir.prototype.set = k4;
      function er(t) {
        var r = -1, s = t == null ? 0 : t.length;
        for (this.clear(); ++r < s; ) {
          var c = t[r];
          this.set(c[0], c[1]);
        }
      }
      function L4() {
        this.__data__ = [], this.size = 0;
      }
      function B4(t) {
        var r = this.__data__, s = pa(r, t);
        if (s < 0)
          return !1;
        var c = r.length - 1;
        return s == c ? r.pop() : aa.call(r, s, 1), --this.size, !0;
      }
      function z4(t) {
        var r = this.__data__, s = pa(r, t);
        return s < 0 ? o : r[s][1];
      }
      function W4(t) {
        return pa(this.__data__, t) > -1;
      }
      function U4(t, r) {
        var s = this.__data__, c = pa(s, t);
        return c < 0 ? (++this.size, s.push([t, r])) : s[c][1] = r, this;
      }
      er.prototype.clear = L4, er.prototype.delete = B4, er.prototype.get = z4, er.prototype.has = W4, er.prototype.set = U4;
      function tr(t) {
        var r = -1, s = t == null ? 0 : t.length;
        for (this.clear(); ++r < s; ) {
          var c = t[r];
          this.set(c[0], c[1]);
        }
      }
      function V4() {
        this.size = 0, this.__data__ = {
          hash: new Ir(),
          map: new (Xo || er)(),
          string: new Ir()
        };
      }
      function H4(t) {
        var r = Oa(this, t).delete(t);
        return this.size -= r ? 1 : 0, r;
      }
      function q4(t) {
        return Oa(this, t).get(t);
      }
      function Z4(t) {
        return Oa(this, t).has(t);
      }
      function K4(t, r) {
        var s = Oa(this, t), c = s.size;
        return s.set(t, r), this.size += s.size == c ? 0 : 1, this;
      }
      tr.prototype.clear = V4, tr.prototype.delete = H4, tr.prototype.get = q4, tr.prototype.has = Z4, tr.prototype.set = K4;
      function Ar(t) {
        var r = -1, s = t == null ? 0 : t.length;
        for (this.__data__ = new tr(); ++r < s; )
          this.add(t[r]);
      }
      function G4(t) {
        return this.__data__.set(t, h), this;
      }
      function Y4(t) {
        return this.__data__.has(t);
      }
      Ar.prototype.add = Ar.prototype.push = G4, Ar.prototype.has = Y4;
      function Ln(t) {
        var r = this.__data__ = new er(t);
        this.size = r.size;
      }
      function X4() {
        this.__data__ = new er(), this.size = 0;
      }
      function J4(t) {
        var r = this.__data__, s = r.delete(t);
        return this.size = r.size, s;
      }
      function Q4(t) {
        return this.__data__.get(t);
      }
      function eg(t) {
        return this.__data__.has(t);
      }
      function tg(t, r) {
        var s = this.__data__;
        if (s instanceof er) {
          var c = s.__data__;
          if (!Xo || c.length < l - 1)
            return c.push([t, r]), this.size = ++s.size, this;
          s = this.__data__ = new tr(c);
        }
        return s.set(t, r), this.size = s.size, this;
      }
      Ln.prototype.clear = X4, Ln.prototype.delete = J4, Ln.prototype.get = Q4, Ln.prototype.has = eg, Ln.prototype.set = tg;
      function Sf(t, r) {
        var s = Me(t), c = !s && Fr(t), p = !s && !c && Er(t), y = !s && !c && !p && po(t), T = s || c || p || y, R = T ? hl(t.length, f4) : [], F = R.length;
        for (var U in t)
          (r || rt.call(t, U)) && !(T && // Safari 9 has enumerable `arguments.length` in strict mode.
          (U == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          p && (U == "offset" || U == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          y && (U == "buffer" || U == "byteLength" || U == "byteOffset") || // Skip index properties.
          ir(U, F))) && R.push(U);
        return R;
      }
      function wf(t) {
        var r = t.length;
        return r ? t[Il(0, r - 1)] : o;
      }
      function ng(t, r) {
        return Sa(tn(t), Mr(r, 0, t.length));
      }
      function rg(t) {
        return Sa(tn(t));
      }
      function _l(t, r, s) {
        (s !== o && !Bn(t[r], s) || s === o && !(r in t)) && nr(t, r, s);
      }
      function ti(t, r, s) {
        var c = t[r];
        (!(rt.call(t, r) && Bn(c, s)) || s === o && !(r in t)) && nr(t, r, s);
      }
      function pa(t, r) {
        for (var s = t.length; s--; )
          if (Bn(t[s][0], r))
            return s;
        return -1;
      }
      function og(t, r, s, c) {
        return yr(t, function(p, y, T) {
          r(c, p, s(p), T);
        }), c;
      }
      function Rf(t, r) {
        return t && Vn(r, kt(r), t);
      }
      function ig(t, r) {
        return t && Vn(r, rn(r), t);
      }
      function nr(t, r, s) {
        r == "__proto__" && sa ? sa(t, r, {
          configurable: !0,
          enumerable: !0,
          value: s,
          writable: !0
        }) : t[r] = s;
      }
      function El(t, r) {
        for (var s = -1, c = r.length, p = B(c), y = t == null; ++s < c; )
          p[s] = y ? o : nu(t, r[s]);
        return p;
      }
      function Mr(t, r, s) {
        return t === t && (s !== o && (t = t <= s ? t : s), r !== o && (t = t >= r ? t : r)), t;
      }
      function Rn(t, r, s, c, p, y) {
        var T, R = r & x, F = r & _, U = r & P;
        if (s && (T = p ? s(t, c, p, y) : s(t)), T !== o)
          return T;
        if (!vt(t))
          return t;
        var V = Me(t);
        if (V) {
          if (T = Zg(t), !R)
            return tn(t, T);
        } else {
          var q = Gt(t), se = q == Z || q == Ee;
          if (Er(t))
            return Jf(t, R);
          if (q == ot || q == fe || se && !p) {
            if (T = F || se ? {} : vd(t), !R)
              return F ? Dg(t, ig(T, t)) : jg(t, Rf(T, t));
          } else {
            if (!lt[q])
              return p ? t : {};
            T = Kg(t, q, R);
          }
        }
        y || (y = new Ln());
        var ve = y.get(t);
        if (ve)
          return ve;
        y.set(t, T), qd(t) ? t.forEach(function(Se) {
          T.add(Rn(Se, r, s, Se, t, y));
        }) : Vd(t) && t.forEach(function(Se, We) {
          T.set(We, Rn(Se, r, s, We, t, y));
        });
        var Oe = U ? F ? Wl : zl : F ? rn : kt, De = V ? o : Oe(t);
        return On(De || t, function(Se, We) {
          De && (We = Se, Se = t[We]), ti(T, We, Rn(Se, r, s, We, t, y));
        }), T;
      }
      function ag(t) {
        var r = kt(t);
        return function(s) {
          return $f(s, t, r);
        };
      }
      function $f(t, r, s) {
        var c = s.length;
        if (t == null)
          return !c;
        for (t = at(t); c--; ) {
          var p = s[c], y = r[p], T = t[p];
          if (T === o && !(p in t) || !y(T))
            return !1;
        }
        return !0;
      }
      function Pf(t, r, s) {
        if (typeof t != "function")
          throw new Sn(f);
        return li(function() {
          t.apply(o, s);
        }, r);
      }
      function ni(t, r, s, c) {
        var p = -1, y = Yi, T = !0, R = t.length, F = [], U = r.length;
        if (!R)
          return F;
        s && (r = dt(r, cn(s))), c ? (y = ll, T = !1) : r.length >= l && (y = Go, T = !1, r = new Ar(r));
        e:
          for (; ++p < R; ) {
            var V = t[p], q = s == null ? V : s(V);
            if (V = c || V !== 0 ? V : 0, T && q === q) {
              for (var se = U; se--; )
                if (r[se] === q)
                  continue e;
              F.push(V);
            } else y(r, q, c) || F.push(V);
          }
        return F;
      }
      var yr = rd(Un), If = rd(Cl, !0);
      function sg(t, r) {
        var s = !0;
        return yr(t, function(c, p, y) {
          return s = !!r(c, p, y), s;
        }), s;
      }
      function ha(t, r, s) {
        for (var c = -1, p = t.length; ++c < p; ) {
          var y = t[c], T = r(y);
          if (T != null && (R === o ? T === T && !dn(T) : s(T, R)))
            var R = T, F = y;
        }
        return F;
      }
      function lg(t, r, s, c) {
        var p = t.length;
        for (s = je(s), s < 0 && (s = -s > p ? 0 : p + s), c = c === o || c > p ? p : je(c), c < 0 && (c += p), c = s > c ? 0 : Kd(c); s < c; )
          t[s++] = r;
        return t;
      }
      function Af(t, r) {
        var s = [];
        return yr(t, function(c, p, y) {
          r(c, p, y) && s.push(c);
        }), s;
      }
      function Ut(t, r, s, c, p) {
        var y = -1, T = t.length;
        for (s || (s = Yg), p || (p = []); ++y < T; ) {
          var R = t[y];
          r > 0 && s(R) ? r > 1 ? Ut(R, r - 1, s, c, p) : gr(p, R) : c || (p[p.length] = R);
        }
        return p;
      }
      var Tl = od(), Mf = od(!0);
      function Un(t, r) {
        return t && Tl(t, r, kt);
      }
      function Cl(t, r) {
        return t && Mf(t, r, kt);
      }
      function ga(t, r) {
        return hr(r, function(s) {
          return ar(t[s]);
        });
      }
      function Nr(t, r) {
        r = xr(r, t);
        for (var s = 0, c = r.length; t != null && s < c; )
          t = t[Hn(r[s++])];
        return s && s == c ? t : o;
      }
      function Nf(t, r, s) {
        var c = r(t);
        return Me(t) ? c : gr(c, s(t));
      }
      function Xt(t) {
        return t == null ? t === o ? it : st : Pr && Pr in at(t) ? Vg(t) : r3(t);
      }
      function Ol(t, r) {
        return t > r;
      }
      function ug(t, r) {
        return t != null && rt.call(t, r);
      }
      function cg(t, r) {
        return t != null && r in at(t);
      }
      function fg(t, r, s) {
        return t >= Kt(r, s) && t < jt(r, s);
      }
      function Sl(t, r, s) {
        for (var c = s ? ll : Yi, p = t[0].length, y = t.length, T = y, R = B(y), F = 1 / 0, U = []; T--; ) {
          var V = t[T];
          T && r && (V = dt(V, cn(r))), F = Kt(V.length, F), R[T] = !s && (r || p >= 120 && V.length >= 120) ? new Ar(T && V) : o;
        }
        V = t[0];
        var q = -1, se = R[0];
        e:
          for (; ++q < p && U.length < F; ) {
            var ve = V[q], Oe = r ? r(ve) : ve;
            if (ve = s || ve !== 0 ? ve : 0, !(se ? Go(se, Oe) : c(U, Oe, s))) {
              for (T = y; --T; ) {
                var De = R[T];
                if (!(De ? Go(De, Oe) : c(t[T], Oe, s)))
                  continue e;
              }
              se && se.push(Oe), U.push(ve);
            }
          }
        return U;
      }
      function dg(t, r, s, c) {
        return Un(t, function(p, y, T) {
          r(c, s(p), y, T);
        }), c;
      }
      function ri(t, r, s) {
        r = xr(r, t), t = _d(t, r);
        var c = t == null ? t : t[Hn(Pn(r))];
        return c == null ? o : un(c, t, s);
      }
      function jf(t) {
        return Et(t) && Xt(t) == fe;
      }
      function pg(t) {
        return Et(t) && Xt(t) == At;
      }
      function hg(t) {
        return Et(t) && Xt(t) == me;
      }
      function oi(t, r, s, c, p) {
        return t === r ? !0 : t == null || r == null || !Et(t) && !Et(r) ? t !== t && r !== r : gg(t, r, s, c, oi, p);
      }
      function gg(t, r, s, c, p, y) {
        var T = Me(t), R = Me(r), F = T ? ue : Gt(t), U = R ? ue : Gt(r);
        F = F == fe ? ot : F, U = U == fe ? ot : U;
        var V = F == ot, q = U == ot, se = F == U;
        if (se && Er(t)) {
          if (!Er(r))
            return !1;
          T = !0, V = !1;
        }
        if (se && !V)
          return y || (y = new Ln()), T || po(t) ? hd(t, r, s, c, p, y) : Wg(t, r, F, s, c, p, y);
        if (!(s & S)) {
          var ve = V && rt.call(t, "__wrapped__"), Oe = q && rt.call(r, "__wrapped__");
          if (ve || Oe) {
            var De = ve ? t.value() : t, Se = Oe ? r.value() : r;
            return y || (y = new Ln()), p(De, Se, s, c, y);
          }
        }
        return se ? (y || (y = new Ln()), Ug(t, r, s, c, p, y)) : !1;
      }
      function mg(t) {
        return Et(t) && Gt(t) == H;
      }
      function wl(t, r, s, c) {
        var p = s.length, y = p, T = !c;
        if (t == null)
          return !y;
        for (t = at(t); p--; ) {
          var R = s[p];
          if (T && R[2] ? R[1] !== t[R[0]] : !(R[0] in t))
            return !1;
        }
        for (; ++p < y; ) {
          R = s[p];
          var F = R[0], U = t[F], V = R[1];
          if (T && R[2]) {
            if (U === o && !(F in t))
              return !1;
          } else {
            var q = new Ln();
            if (c)
              var se = c(U, V, F, t, r, q);
            if (!(se === o ? oi(V, U, S | C, c, q) : se))
              return !1;
          }
        }
        return !0;
      }
      function Df(t) {
        if (!vt(t) || Jg(t))
          return !1;
        var r = ar(t) ? m4 : Be;
        return r.test(Dr(t));
      }
      function vg(t) {
        return Et(t) && Xt(t) == It;
      }
      function yg(t) {
        return Et(t) && Gt(t) == ze;
      }
      function bg(t) {
        return Et(t) && Aa(t.length) && !!ut[Xt(t)];
      }
      function Ff(t) {
        return typeof t == "function" ? t : t == null ? on : typeof t == "object" ? Me(t) ? Bf(t[0], t[1]) : Lf(t) : ip(t);
      }
      function Rl(t) {
        if (!si(t))
          return E4(t);
        var r = [];
        for (var s in at(t))
          rt.call(t, s) && s != "constructor" && r.push(s);
        return r;
      }
      function xg(t) {
        if (!vt(t))
          return n3(t);
        var r = si(t), s = [];
        for (var c in t)
          c == "constructor" && (r || !rt.call(t, c)) || s.push(c);
        return s;
      }
      function $l(t, r) {
        return t < r;
      }
      function kf(t, r) {
        var s = -1, c = nn(t) ? B(t.length) : [];
        return yr(t, function(p, y, T) {
          c[++s] = r(p, y, T);
        }), c;
      }
      function Lf(t) {
        var r = Vl(t);
        return r.length == 1 && r[0][2] ? bd(r[0][0], r[0][1]) : function(s) {
          return s === t || wl(s, t, r);
        };
      }
      function Bf(t, r) {
        return ql(t) && yd(r) ? bd(Hn(t), r) : function(s) {
          var c = nu(s, t);
          return c === o && c === r ? ru(s, t) : oi(r, c, S | C);
        };
      }
      function ma(t, r, s, c, p) {
        t !== r && Tl(r, function(y, T) {
          if (p || (p = new Ln()), vt(y))
            _g(t, r, T, s, ma, c, p);
          else {
            var R = c ? c(Kl(t, T), y, T + "", t, r, p) : o;
            R === o && (R = y), _l(t, T, R);
          }
        }, rn);
      }
      function _g(t, r, s, c, p, y, T) {
        var R = Kl(t, s), F = Kl(r, s), U = T.get(F);
        if (U) {
          _l(t, s, U);
          return;
        }
        var V = y ? y(R, F, s + "", t, r, T) : o, q = V === o;
        if (q) {
          var se = Me(F), ve = !se && Er(F), Oe = !se && !ve && po(F);
          V = F, se || ve || Oe ? Me(R) ? V = R : wt(R) ? V = tn(R) : ve ? (q = !1, V = Jf(F, !0)) : Oe ? (q = !1, V = Qf(F, !0)) : V = [] : ui(F) || Fr(F) ? (V = R, Fr(R) ? V = Gd(R) : (!vt(R) || ar(R)) && (V = vd(F))) : q = !1;
        }
        q && (T.set(F, V), p(V, F, c, y, T), T.delete(F)), _l(t, s, V);
      }
      function zf(t, r) {
        var s = t.length;
        if (s)
          return r += r < 0 ? s : 0, ir(r, s) ? t[r] : o;
      }
      function Wf(t, r, s) {
        r.length ? r = dt(r, function(y) {
          return Me(y) ? function(T) {
            return Nr(T, y.length === 1 ? y[0] : y);
          } : y;
        }) : r = [on];
        var c = -1;
        r = dt(r, cn(Ce()));
        var p = kf(t, function(y, T, R) {
          var F = dt(r, function(U) {
            return U(y);
          });
          return { criteria: F, index: ++c, value: y };
        });
        return K2(p, function(y, T) {
          return Ng(y, T, s);
        });
      }
      function Eg(t, r) {
        return Uf(t, r, function(s, c) {
          return ru(t, c);
        });
      }
      function Uf(t, r, s) {
        for (var c = -1, p = r.length, y = {}; ++c < p; ) {
          var T = r[c], R = Nr(t, T);
          s(R, T) && ii(y, xr(T, t), R);
        }
        return y;
      }
      function Tg(t) {
        return function(r) {
          return Nr(r, t);
        };
      }
      function Pl(t, r, s, c) {
        var p = c ? Z2 : to, y = -1, T = r.length, R = t;
        for (t === r && (r = tn(r)), s && (R = dt(t, cn(s))); ++y < T; )
          for (var F = 0, U = r[y], V = s ? s(U) : U; (F = p(R, V, F, c)) > -1; )
            R !== t && aa.call(R, F, 1), aa.call(t, F, 1);
        return t;
      }
      function Vf(t, r) {
        for (var s = t ? r.length : 0, c = s - 1; s--; ) {
          var p = r[s];
          if (s == c || p !== y) {
            var y = p;
            ir(p) ? aa.call(t, p, 1) : Nl(t, p);
          }
        }
        return t;
      }
      function Il(t, r) {
        return t + ua(Cf() * (r - t + 1));
      }
      function Cg(t, r, s, c) {
        for (var p = -1, y = jt(la((r - t) / (s || 1)), 0), T = B(y); y--; )
          T[c ? y : ++p] = t, t += s;
        return T;
      }
      function Al(t, r) {
        var s = "";
        if (!t || r < 1 || r > X)
          return s;
        do
          r % 2 && (s += t), r = ua(r / 2), r && (t += t);
        while (r);
        return s;
      }
      function ke(t, r) {
        return Gl(xd(t, r, on), t + "");
      }
      function Og(t) {
        return wf(ho(t));
      }
      function Sg(t, r) {
        var s = ho(t);
        return Sa(s, Mr(r, 0, s.length));
      }
      function ii(t, r, s, c) {
        if (!vt(t))
          return t;
        r = xr(r, t);
        for (var p = -1, y = r.length, T = y - 1, R = t; R != null && ++p < y; ) {
          var F = Hn(r[p]), U = s;
          if (F === "__proto__" || F === "constructor" || F === "prototype")
            return t;
          if (p != T) {
            var V = R[F];
            U = c ? c(V, F, R) : o, U === o && (U = vt(V) ? V : ir(r[p + 1]) ? [] : {});
          }
          ti(R, F, U), R = R[F];
        }
        return t;
      }
      var Hf = ca ? function(t, r) {
        return ca.set(t, r), t;
      } : on, wg = sa ? function(t, r) {
        return sa(t, "toString", {
          configurable: !0,
          enumerable: !1,
          value: iu(r),
          writable: !0
        });
      } : on;
      function Rg(t) {
        return Sa(ho(t));
      }
      function $n(t, r, s) {
        var c = -1, p = t.length;
        r < 0 && (r = -r > p ? 0 : p + r), s = s > p ? p : s, s < 0 && (s += p), p = r > s ? 0 : s - r >>> 0, r >>>= 0;
        for (var y = B(p); ++c < p; )
          y[c] = t[c + r];
        return y;
      }
      function $g(t, r) {
        var s;
        return yr(t, function(c, p, y) {
          return s = r(c, p, y), !s;
        }), !!s;
      }
      function va(t, r, s) {
        var c = 0, p = t == null ? c : t.length;
        if (typeof r == "number" && r === r && p <= pe) {
          for (; c < p; ) {
            var y = c + p >>> 1, T = t[y];
            T !== null && !dn(T) && (s ? T <= r : T < r) ? c = y + 1 : p = y;
          }
          return p;
        }
        return Ml(t, r, on, s);
      }
      function Ml(t, r, s, c) {
        var p = 0, y = t == null ? 0 : t.length;
        if (y === 0)
          return 0;
        r = s(r);
        for (var T = r !== r, R = r === null, F = dn(r), U = r === o; p < y; ) {
          var V = ua((p + y) / 2), q = s(t[V]), se = q !== o, ve = q === null, Oe = q === q, De = dn(q);
          if (T)
            var Se = c || Oe;
          else U ? Se = Oe && (c || se) : R ? Se = Oe && se && (c || !ve) : F ? Se = Oe && se && !ve && (c || !De) : ve || De ? Se = !1 : Se = c ? q <= r : q < r;
          Se ? p = V + 1 : y = V;
        }
        return Kt(y, he);
      }
      function qf(t, r) {
        for (var s = -1, c = t.length, p = 0, y = []; ++s < c; ) {
          var T = t[s], R = r ? r(T) : T;
          if (!s || !Bn(R, F)) {
            var F = R;
            y[p++] = T === 0 ? 0 : T;
          }
        }
        return y;
      }
      function Zf(t) {
        return typeof t == "number" ? t : dn(t) ? W : +t;
      }
      function fn(t) {
        if (typeof t == "string")
          return t;
        if (Me(t))
          return dt(t, fn) + "";
        if (dn(t))
          return Of ? Of.call(t) : "";
        var r = t + "";
        return r == "0" && 1 / t == -oe ? "-0" : r;
      }
      function br(t, r, s) {
        var c = -1, p = Yi, y = t.length, T = !0, R = [], F = R;
        if (s)
          T = !1, p = ll;
        else if (y >= l) {
          var U = r ? null : Bg(t);
          if (U)
            return Ji(U);
          T = !1, p = Go, F = new Ar();
        } else
          F = r ? [] : R;
        e:
          for (; ++c < y; ) {
            var V = t[c], q = r ? r(V) : V;
            if (V = s || V !== 0 ? V : 0, T && q === q) {
              for (var se = F.length; se--; )
                if (F[se] === q)
                  continue e;
              r && F.push(q), R.push(V);
            } else p(F, q, s) || (F !== R && F.push(q), R.push(V));
          }
        return R;
      }
      function Nl(t, r) {
        return r = xr(r, t), t = _d(t, r), t == null || delete t[Hn(Pn(r))];
      }
      function Kf(t, r, s, c) {
        return ii(t, r, s(Nr(t, r)), c);
      }
      function ya(t, r, s, c) {
        for (var p = t.length, y = c ? p : -1; (c ? y-- : ++y < p) && r(t[y], y, t); )
          ;
        return s ? $n(t, c ? 0 : y, c ? y + 1 : p) : $n(t, c ? y + 1 : 0, c ? p : y);
      }
      function Gf(t, r) {
        var s = t;
        return s instanceof Ve && (s = s.value()), ul(r, function(c, p) {
          return p.func.apply(p.thisArg, gr([c], p.args));
        }, s);
      }
      function jl(t, r, s) {
        var c = t.length;
        if (c < 2)
          return c ? br(t[0]) : [];
        for (var p = -1, y = B(c); ++p < c; )
          for (var T = t[p], R = -1; ++R < c; )
            R != p && (y[p] = ni(y[p] || T, t[R], r, s));
        return br(Ut(y, 1), r, s);
      }
      function Yf(t, r, s) {
        for (var c = -1, p = t.length, y = r.length, T = {}; ++c < p; ) {
          var R = c < y ? r[c] : o;
          s(T, t[c], R);
        }
        return T;
      }
      function Dl(t) {
        return wt(t) ? t : [];
      }
      function Fl(t) {
        return typeof t == "function" ? t : on;
      }
      function xr(t, r) {
        return Me(t) ? t : ql(t, r) ? [t] : Od(Xe(t));
      }
      var Pg = ke;
      function _r(t, r, s) {
        var c = t.length;
        return s = s === o ? c : s, !r && s >= c ? t : $n(t, r, s);
      }
      var Xf = v4 || function(t) {
        return Wt.clearTimeout(t);
      };
      function Jf(t, r) {
        if (r)
          return t.slice();
        var s = t.length, c = bf ? bf(s) : new t.constructor(s);
        return t.copy(c), c;
      }
      function kl(t) {
        var r = new t.constructor(t.byteLength);
        return new oa(r).set(new oa(t)), r;
      }
      function Ig(t, r) {
        var s = r ? kl(t.buffer) : t.buffer;
        return new t.constructor(s, t.byteOffset, t.byteLength);
      }
      function Ag(t) {
        var r = new t.constructor(t.source, Ze.exec(t));
        return r.lastIndex = t.lastIndex, r;
      }
      function Mg(t) {
        return ei ? at(ei.call(t)) : {};
      }
      function Qf(t, r) {
        var s = r ? kl(t.buffer) : t.buffer;
        return new t.constructor(s, t.byteOffset, t.length);
      }
      function ed(t, r) {
        if (t !== r) {
          var s = t !== o, c = t === null, p = t === t, y = dn(t), T = r !== o, R = r === null, F = r === r, U = dn(r);
          if (!R && !U && !y && t > r || y && T && F && !R && !U || c && T && F || !s && F || !p)
            return 1;
          if (!c && !y && !U && t < r || U && s && p && !c && !y || R && s && p || !T && p || !F)
            return -1;
        }
        return 0;
      }
      function Ng(t, r, s) {
        for (var c = -1, p = t.criteria, y = r.criteria, T = p.length, R = s.length; ++c < T; ) {
          var F = ed(p[c], y[c]);
          if (F) {
            if (c >= R)
              return F;
            var U = s[c];
            return F * (U == "desc" ? -1 : 1);
          }
        }
        return t.index - r.index;
      }
      function td(t, r, s, c) {
        for (var p = -1, y = t.length, T = s.length, R = -1, F = r.length, U = jt(y - T, 0), V = B(F + U), q = !c; ++R < F; )
          V[R] = r[R];
        for (; ++p < T; )
          (q || p < y) && (V[s[p]] = t[p]);
        for (; U--; )
          V[R++] = t[p++];
        return V;
      }
      function nd(t, r, s, c) {
        for (var p = -1, y = t.length, T = -1, R = s.length, F = -1, U = r.length, V = jt(y - R, 0), q = B(V + U), se = !c; ++p < V; )
          q[p] = t[p];
        for (var ve = p; ++F < U; )
          q[ve + F] = r[F];
        for (; ++T < R; )
          (se || p < y) && (q[ve + s[T]] = t[p++]);
        return q;
      }
      function tn(t, r) {
        var s = -1, c = t.length;
        for (r || (r = B(c)); ++s < c; )
          r[s] = t[s];
        return r;
      }
      function Vn(t, r, s, c) {
        var p = !s;
        s || (s = {});
        for (var y = -1, T = r.length; ++y < T; ) {
          var R = r[y], F = c ? c(s[R], t[R], R, s, t) : o;
          F === o && (F = t[R]), p ? nr(s, R, F) : ti(s, R, F);
        }
        return s;
      }
      function jg(t, r) {
        return Vn(t, Hl(t), r);
      }
      function Dg(t, r) {
        return Vn(t, gd(t), r);
      }
      function ba(t, r) {
        return function(s, c) {
          var p = Me(s) ? z2 : og, y = r ? r() : {};
          return p(s, t, Ce(c, 2), y);
        };
      }
      function uo(t) {
        return ke(function(r, s) {
          var c = -1, p = s.length, y = p > 1 ? s[p - 1] : o, T = p > 2 ? s[2] : o;
          for (y = t.length > 3 && typeof y == "function" ? (p--, y) : o, T && Jt(s[0], s[1], T) && (y = p < 3 ? o : y, p = 1), r = at(r); ++c < p; ) {
            var R = s[c];
            R && t(r, R, c, y);
          }
          return r;
        });
      }
      function rd(t, r) {
        return function(s, c) {
          if (s == null)
            return s;
          if (!nn(s))
            return t(s, c);
          for (var p = s.length, y = r ? p : -1, T = at(s); (r ? y-- : ++y < p) && c(T[y], y, T) !== !1; )
            ;
          return s;
        };
      }
      function od(t) {
        return function(r, s, c) {
          for (var p = -1, y = at(r), T = c(r), R = T.length; R--; ) {
            var F = T[t ? R : ++p];
            if (s(y[F], F, y) === !1)
              break;
          }
          return r;
        };
      }
      function Fg(t, r, s) {
        var c = r & E, p = ai(t);
        function y() {
          var T = this && this !== Wt && this instanceof y ? p : t;
          return T.apply(c ? s : this, arguments);
        }
        return y;
      }
      function id(t) {
        return function(r) {
          r = Xe(r);
          var s = no(r) ? kn(r) : o, c = s ? s[0] : r.charAt(0), p = s ? _r(s, 1).join("") : r.slice(1);
          return c[t]() + p;
        };
      }
      function co(t) {
        return function(r) {
          return ul(rp(np(r).replace(w2, "")), t, "");
        };
      }
      function ai(t) {
        return function() {
          var r = arguments;
          switch (r.length) {
            case 0:
              return new t();
            case 1:
              return new t(r[0]);
            case 2:
              return new t(r[0], r[1]);
            case 3:
              return new t(r[0], r[1], r[2]);
            case 4:
              return new t(r[0], r[1], r[2], r[3]);
            case 5:
              return new t(r[0], r[1], r[2], r[3], r[4]);
            case 6:
              return new t(r[0], r[1], r[2], r[3], r[4], r[5]);
            case 7:
              return new t(r[0], r[1], r[2], r[3], r[4], r[5], r[6]);
          }
          var s = lo(t.prototype), c = t.apply(s, r);
          return vt(c) ? c : s;
        };
      }
      function kg(t, r, s) {
        var c = ai(t);
        function p() {
          for (var y = arguments.length, T = B(y), R = y, F = fo(p); R--; )
            T[R] = arguments[R];
          var U = y < 3 && T[0] !== F && T[y - 1] !== F ? [] : mr(T, F);
          if (y -= U.length, y < s)
            return cd(
              t,
              r,
              xa,
              p.placeholder,
              o,
              T,
              U,
              o,
              o,
              s - y
            );
          var V = this && this !== Wt && this instanceof p ? c : t;
          return un(V, this, T);
        }
        return p;
      }
      function ad(t) {
        return function(r, s, c) {
          var p = at(r);
          if (!nn(r)) {
            var y = Ce(s, 3);
            r = kt(r), s = function(R) {
              return y(p[R], R, p);
            };
          }
          var T = t(r, s, c);
          return T > -1 ? p[y ? r[T] : T] : o;
        };
      }
      function sd(t) {
        return or(function(r) {
          var s = r.length, c = s, p = wn.prototype.thru;
          for (t && r.reverse(); c--; ) {
            var y = r[c];
            if (typeof y != "function")
              throw new Sn(f);
            if (p && !T && Ca(y) == "wrapper")
              var T = new wn([], !0);
          }
          for (c = T ? c : s; ++c < s; ) {
            y = r[c];
            var R = Ca(y), F = R == "wrapper" ? Ul(y) : o;
            F && Zl(F[0]) && F[1] == (L | A | O | J) && !F[4].length && F[9] == 1 ? T = T[Ca(F[0])].apply(T, F[3]) : T = y.length == 1 && Zl(y) ? T[R]() : T.thru(y);
          }
          return function() {
            var U = arguments, V = U[0];
            if (T && U.length == 1 && Me(V))
              return T.plant(V).value();
            for (var q = 0, se = s ? r[q].apply(this, U) : V; ++q < s; )
              se = r[q].call(this, se);
            return se;
          };
        });
      }
      function xa(t, r, s, c, p, y, T, R, F, U) {
        var V = r & L, q = r & E, se = r & $, ve = r & (A | M), Oe = r & le, De = se ? o : ai(t);
        function Se() {
          for (var We = arguments.length, qe = B(We), pn = We; pn--; )
            qe[pn] = arguments[pn];
          if (ve)
            var Qt = fo(Se), hn = Y2(qe, Qt);
          if (c && (qe = td(qe, c, p, ve)), y && (qe = nd(qe, y, T, ve)), We -= hn, ve && We < U) {
            var Rt = mr(qe, Qt);
            return cd(
              t,
              r,
              xa,
              Se.placeholder,
              s,
              qe,
              Rt,
              R,
              F,
              U - We
            );
          }
          var zn = q ? s : this, lr = se ? zn[t] : t;
          return We = qe.length, R ? qe = o3(qe, R) : Oe && We > 1 && qe.reverse(), V && F < We && (qe.length = F), this && this !== Wt && this instanceof Se && (lr = De || ai(lr)), lr.apply(zn, qe);
        }
        return Se;
      }
      function ld(t, r) {
        return function(s, c) {
          return dg(s, t, r(c), {});
        };
      }
      function _a(t, r) {
        return function(s, c) {
          var p;
          if (s === o && c === o)
            return r;
          if (s !== o && (p = s), c !== o) {
            if (p === o)
              return c;
            typeof s == "string" || typeof c == "string" ? (s = fn(s), c = fn(c)) : (s = Zf(s), c = Zf(c)), p = t(s, c);
          }
          return p;
        };
      }
      function Ll(t) {
        return or(function(r) {
          return r = dt(r, cn(Ce())), ke(function(s) {
            var c = this;
            return t(r, function(p) {
              return un(p, c, s);
            });
          });
        });
      }
      function Ea(t, r) {
        r = r === o ? " " : fn(r);
        var s = r.length;
        if (s < 2)
          return s ? Al(r, t) : r;
        var c = Al(r, la(t / ro(r)));
        return no(r) ? _r(kn(c), 0, t).join("") : c.slice(0, t);
      }
      function Lg(t, r, s, c) {
        var p = r & E, y = ai(t);
        function T() {
          for (var R = -1, F = arguments.length, U = -1, V = c.length, q = B(V + F), se = this && this !== Wt && this instanceof T ? y : t; ++U < V; )
            q[U] = c[U];
          for (; F--; )
            q[U++] = arguments[++R];
          return un(se, p ? s : this, q);
        }
        return T;
      }
      function ud(t) {
        return function(r, s, c) {
          return c && typeof c != "number" && Jt(r, s, c) && (s = c = o), r = sr(r), s === o ? (s = r, r = 0) : s = sr(s), c = c === o ? r < s ? 1 : -1 : sr(c), Cg(r, s, c, t);
        };
      }
      function Ta(t) {
        return function(r, s) {
          return typeof r == "string" && typeof s == "string" || (r = In(r), s = In(s)), t(r, s);
        };
      }
      function cd(t, r, s, c, p, y, T, R, F, U) {
        var V = r & A, q = V ? T : o, se = V ? o : T, ve = V ? y : o, Oe = V ? o : y;
        r |= V ? O : k, r &= ~(V ? k : O), r & N || (r &= ~(E | $));
        var De = [
          t,
          r,
          p,
          ve,
          q,
          Oe,
          se,
          R,
          F,
          U
        ], Se = s.apply(o, De);
        return Zl(t) && Ed(Se, De), Se.placeholder = c, Td(Se, t, r);
      }
      function Bl(t) {
        var r = Nt[t];
        return function(s, c) {
          if (s = In(s), c = c == null ? 0 : Kt(je(c), 292), c && Tf(s)) {
            var p = (Xe(s) + "e").split("e"), y = r(p[0] + "e" + (+p[1] + c));
            return p = (Xe(y) + "e").split("e"), +(p[0] + "e" + (+p[1] - c));
          }
          return r(s);
        };
      }
      var Bg = ao && 1 / Ji(new ao([, -0]))[1] == oe ? function(t) {
        return new ao(t);
      } : lu;
      function fd(t) {
        return function(r) {
          var s = Gt(r);
          return s == H ? ml(r) : s == ze ? r4(r) : G2(r, t(r));
        };
      }
      function rr(t, r, s, c, p, y, T, R) {
        var F = r & $;
        if (!F && typeof t != "function")
          throw new Sn(f);
        var U = c ? c.length : 0;
        if (U || (r &= ~(O | k), c = p = o), T = T === o ? T : jt(je(T), 0), R = R === o ? R : je(R), U -= p ? p.length : 0, r & k) {
          var V = c, q = p;
          c = p = o;
        }
        var se = F ? o : Ul(t), ve = [
          t,
          r,
          s,
          c,
          p,
          V,
          q,
          y,
          T,
          R
        ];
        if (se && t3(ve, se), t = ve[0], r = ve[1], s = ve[2], c = ve[3], p = ve[4], R = ve[9] = ve[9] === o ? F ? 0 : t.length : jt(ve[9] - U, 0), !R && r & (A | M) && (r &= ~(A | M)), !r || r == E)
          var Oe = Fg(t, r, s);
        else r == A || r == M ? Oe = kg(t, r, R) : (r == O || r == (E | O)) && !p.length ? Oe = Lg(t, r, s, c) : Oe = xa.apply(o, ve);
        var De = se ? Hf : Ed;
        return Td(De(Oe, ve), t, r);
      }
      function dd(t, r, s, c) {
        return t === o || Bn(t, io[s]) && !rt.call(c, s) ? r : t;
      }
      function pd(t, r, s, c, p, y) {
        return vt(t) && vt(r) && (y.set(r, t), ma(t, r, o, pd, y), y.delete(r)), t;
      }
      function zg(t) {
        return ui(t) ? o : t;
      }
      function hd(t, r, s, c, p, y) {
        var T = s & S, R = t.length, F = r.length;
        if (R != F && !(T && F > R))
          return !1;
        var U = y.get(t), V = y.get(r);
        if (U && V)
          return U == r && V == t;
        var q = -1, se = !0, ve = s & C ? new Ar() : o;
        for (y.set(t, r), y.set(r, t); ++q < R; ) {
          var Oe = t[q], De = r[q];
          if (c)
            var Se = T ? c(De, Oe, q, r, t, y) : c(Oe, De, q, t, r, y);
          if (Se !== o) {
            if (Se)
              continue;
            se = !1;
            break;
          }
          if (ve) {
            if (!cl(r, function(We, qe) {
              if (!Go(ve, qe) && (Oe === We || p(Oe, We, s, c, y)))
                return ve.push(qe);
            })) {
              se = !1;
              break;
            }
          } else if (!(Oe === De || p(Oe, De, s, c, y))) {
            se = !1;
            break;
          }
        }
        return y.delete(t), y.delete(r), se;
      }
      function Wg(t, r, s, c, p, y, T) {
        switch (s) {
          case Fe:
            if (t.byteLength != r.byteLength || t.byteOffset != r.byteOffset)
              return !1;
            t = t.buffer, r = r.buffer;
          case At:
            return !(t.byteLength != r.byteLength || !y(new oa(t), new oa(r)));
          case ge:
          case me:
          case Ie:
            return Bn(+t, +r);
          case be:
            return t.name == r.name && t.message == r.message;
          case It:
          case xt:
            return t == r + "";
          case H:
            var R = ml;
          case ze:
            var F = c & S;
            if (R || (R = Ji), t.size != r.size && !F)
              return !1;
            var U = T.get(t);
            if (U)
              return U == r;
            c |= C, T.set(t, r);
            var V = hd(R(t), R(r), c, p, y, T);
            return T.delete(t), V;
          case Ot:
            if (ei)
              return ei.call(t) == ei.call(r);
        }
        return !1;
      }
      function Ug(t, r, s, c, p, y) {
        var T = s & S, R = zl(t), F = R.length, U = zl(r), V = U.length;
        if (F != V && !T)
          return !1;
        for (var q = F; q--; ) {
          var se = R[q];
          if (!(T ? se in r : rt.call(r, se)))
            return !1;
        }
        var ve = y.get(t), Oe = y.get(r);
        if (ve && Oe)
          return ve == r && Oe == t;
        var De = !0;
        y.set(t, r), y.set(r, t);
        for (var Se = T; ++q < F; ) {
          se = R[q];
          var We = t[se], qe = r[se];
          if (c)
            var pn = T ? c(qe, We, se, r, t, y) : c(We, qe, se, t, r, y);
          if (!(pn === o ? We === qe || p(We, qe, s, c, y) : pn)) {
            De = !1;
            break;
          }
          Se || (Se = se == "constructor");
        }
        if (De && !Se) {
          var Qt = t.constructor, hn = r.constructor;
          Qt != hn && "constructor" in t && "constructor" in r && !(typeof Qt == "function" && Qt instanceof Qt && typeof hn == "function" && hn instanceof hn) && (De = !1);
        }
        return y.delete(t), y.delete(r), De;
      }
      function or(t) {
        return Gl(xd(t, o, $d), t + "");
      }
      function zl(t) {
        return Nf(t, kt, Hl);
      }
      function Wl(t) {
        return Nf(t, rn, gd);
      }
      var Ul = ca ? function(t) {
        return ca.get(t);
      } : lu;
      function Ca(t) {
        for (var r = t.name + "", s = so[r], c = rt.call(so, r) ? s.length : 0; c--; ) {
          var p = s[c], y = p.func;
          if (y == null || y == t)
            return p.name;
        }
        return r;
      }
      function fo(t) {
        var r = rt.call(m, "placeholder") ? m : t;
        return r.placeholder;
      }
      function Ce() {
        var t = m.iteratee || au;
        return t = t === au ? Ff : t, arguments.length ? t(arguments[0], arguments[1]) : t;
      }
      function Oa(t, r) {
        var s = t.__data__;
        return Xg(r) ? s[typeof r == "string" ? "string" : "hash"] : s.map;
      }
      function Vl(t) {
        for (var r = kt(t), s = r.length; s--; ) {
          var c = r[s], p = t[c];
          r[s] = [c, p, yd(p)];
        }
        return r;
      }
      function jr(t, r) {
        var s = e4(t, r);
        return Df(s) ? s : o;
      }
      function Vg(t) {
        var r = rt.call(t, Pr), s = t[Pr];
        try {
          t[Pr] = o;
          var c = !0;
        } catch {
        }
        var p = na.call(t);
        return c && (r ? t[Pr] = s : delete t[Pr]), p;
      }
      var Hl = yl ? function(t) {
        return t == null ? [] : (t = at(t), hr(yl(t), function(r) {
          return _f.call(t, r);
        }));
      } : uu, gd = yl ? function(t) {
        for (var r = []; t; )
          gr(r, Hl(t)), t = ia(t);
        return r;
      } : uu, Gt = Xt;
      (bl && Gt(new bl(new ArrayBuffer(1))) != Fe || Xo && Gt(new Xo()) != H || xl && Gt(xl.resolve()) != Dt || ao && Gt(new ao()) != ze || Jo && Gt(new Jo()) != St) && (Gt = function(t) {
        var r = Xt(t), s = r == ot ? t.constructor : o, c = s ? Dr(s) : "";
        if (c)
          switch (c) {
            case S4:
              return Fe;
            case w4:
              return H;
            case R4:
              return Dt;
            case $4:
              return ze;
            case P4:
              return St;
          }
        return r;
      });
      function Hg(t, r, s) {
        for (var c = -1, p = s.length; ++c < p; ) {
          var y = s[c], T = y.size;
          switch (y.type) {
            case "drop":
              t += T;
              break;
            case "dropRight":
              r -= T;
              break;
            case "take":
              r = Kt(r, t + T);
              break;
            case "takeRight":
              t = jt(t, r - T);
              break;
          }
        }
        return { start: t, end: r };
      }
      function qg(t) {
        var r = t.match(Js);
        return r ? r[1].split(Qs) : [];
      }
      function md(t, r, s) {
        r = xr(r, t);
        for (var c = -1, p = r.length, y = !1; ++c < p; ) {
          var T = Hn(r[c]);
          if (!(y = t != null && s(t, T)))
            break;
          t = t[T];
        }
        return y || ++c != p ? y : (p = t == null ? 0 : t.length, !!p && Aa(p) && ir(T, p) && (Me(t) || Fr(t)));
      }
      function Zg(t) {
        var r = t.length, s = new t.constructor(r);
        return r && typeof t[0] == "string" && rt.call(t, "index") && (s.index = t.index, s.input = t.input), s;
      }
      function vd(t) {
        return typeof t.constructor == "function" && !si(t) ? lo(ia(t)) : {};
      }
      function Kg(t, r, s) {
        var c = t.constructor;
        switch (r) {
          case At:
            return kl(t);
          case ge:
          case me:
            return new c(+t);
          case Fe:
            return Ig(t, s);
          case Te:
          case Lt:
          case ln:
          case _n:
          case Jn:
          case xe:
          case Le:
          case gt:
          case En:
            return Qf(t, s);
          case H:
            return new c();
          case Ie:
          case xt:
            return new c(t);
          case It:
            return Ag(t);
          case ze:
            return new c();
          case Ot:
            return Mg(t);
        }
      }
      function Gg(t, r) {
        var s = r.length;
        if (!s)
          return t;
        var c = s - 1;
        return r[c] = (s > 1 ? "& " : "") + r[c], r = r.join(s > 2 ? ", " : " "), t.replace(Xs, `{
/* [wrapped with ` + r + `] */
`);
      }
      function Yg(t) {
        return Me(t) || Fr(t) || !!(Ef && t && t[Ef]);
      }
      function ir(t, r) {
        var s = typeof t;
        return r = r ?? X, !!r && (s == "number" || s != "symbol" && mt.test(t)) && t > -1 && t % 1 == 0 && t < r;
      }
      function Jt(t, r, s) {
        if (!vt(s))
          return !1;
        var c = typeof r;
        return (c == "number" ? nn(s) && ir(r, s.length) : c == "string" && r in s) ? Bn(s[r], t) : !1;
      }
      function ql(t, r) {
        if (Me(t))
          return !1;
        var s = typeof t;
        return s == "number" || s == "symbol" || s == "boolean" || t == null || dn(t) ? !0 : qi.test(t) || !Hi.test(t) || r != null && t in at(r);
      }
      function Xg(t) {
        var r = typeof t;
        return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
      }
      function Zl(t) {
        var r = Ca(t), s = m[r];
        if (typeof s != "function" || !(r in Ve.prototype))
          return !1;
        if (t === s)
          return !0;
        var c = Ul(s);
        return !!c && t === c[0];
      }
      function Jg(t) {
        return !!yf && yf in t;
      }
      var Qg = ea ? ar : cu;
      function si(t) {
        var r = t && t.constructor, s = typeof r == "function" && r.prototype || io;
        return t === s;
      }
      function yd(t) {
        return t === t && !vt(t);
      }
      function bd(t, r) {
        return function(s) {
          return s == null ? !1 : s[t] === r && (r !== o || t in at(s));
        };
      }
      function e3(t) {
        var r = Pa(t, function(c) {
          return s.size === g && s.clear(), c;
        }), s = r.cache;
        return r;
      }
      function t3(t, r) {
        var s = t[1], c = r[1], p = s | c, y = p < (E | $ | L), T = c == L && s == A || c == L && s == J && t[7].length <= r[8] || c == (L | J) && r[7].length <= r[8] && s == A;
        if (!(y || T))
          return t;
        c & E && (t[2] = r[2], p |= s & E ? 0 : N);
        var R = r[3];
        if (R) {
          var F = t[3];
          t[3] = F ? td(F, R, r[4]) : R, t[4] = F ? mr(t[3], b) : r[4];
        }
        return R = r[5], R && (F = t[5], t[5] = F ? nd(F, R, r[6]) : R, t[6] = F ? mr(t[5], b) : r[6]), R = r[7], R && (t[7] = R), c & L && (t[8] = t[8] == null ? r[8] : Kt(t[8], r[8])), t[9] == null && (t[9] = r[9]), t[0] = r[0], t[1] = p, t;
      }
      function n3(t) {
        var r = [];
        if (t != null)
          for (var s in at(t))
            r.push(s);
        return r;
      }
      function r3(t) {
        return na.call(t);
      }
      function xd(t, r, s) {
        return r = jt(r === o ? t.length - 1 : r, 0), function() {
          for (var c = arguments, p = -1, y = jt(c.length - r, 0), T = B(y); ++p < y; )
            T[p] = c[r + p];
          p = -1;
          for (var R = B(r + 1); ++p < r; )
            R[p] = c[p];
          return R[r] = s(T), un(t, this, R);
        };
      }
      function _d(t, r) {
        return r.length < 2 ? t : Nr(t, $n(r, 0, -1));
      }
      function o3(t, r) {
        for (var s = t.length, c = Kt(r.length, s), p = tn(t); c--; ) {
          var y = r[c];
          t[c] = ir(y, s) ? p[y] : o;
        }
        return t;
      }
      function Kl(t, r) {
        if (!(r === "constructor" && typeof t[r] == "function") && r != "__proto__")
          return t[r];
      }
      var Ed = Cd(Hf), li = b4 || function(t, r) {
        return Wt.setTimeout(t, r);
      }, Gl = Cd(wg);
      function Td(t, r, s) {
        var c = r + "";
        return Gl(t, Gg(c, i3(qg(c), s)));
      }
      function Cd(t) {
        var r = 0, s = 0;
        return function() {
          var c = T4(), p = ee - (c - s);
          if (s = c, p > 0) {
            if (++r >= ae)
              return arguments[0];
          } else
            r = 0;
          return t.apply(o, arguments);
        };
      }
      function Sa(t, r) {
        var s = -1, c = t.length, p = c - 1;
        for (r = r === o ? c : r; ++s < r; ) {
          var y = Il(s, p), T = t[y];
          t[y] = t[s], t[s] = T;
        }
        return t.length = r, t;
      }
      var Od = e3(function(t) {
        var r = [];
        return t.charCodeAt(0) === 46 && r.push(""), t.replace(Gs, function(s, c, p, y) {
          r.push(p ? y.replace(ce, "$1") : c || s);
        }), r;
      });
      function Hn(t) {
        if (typeof t == "string" || dn(t))
          return t;
        var r = t + "";
        return r == "0" && 1 / t == -oe ? "-0" : r;
      }
      function Dr(t) {
        if (t != null) {
          try {
            return ta.call(t);
          } catch {
          }
          try {
            return t + "";
          } catch {
          }
        }
        return "";
      }
      function i3(t, r) {
        return On(re, function(s) {
          var c = "_." + s[0];
          r & s[1] && !Yi(t, c) && t.push(c);
        }), t.sort();
      }
      function Sd(t) {
        if (t instanceof Ve)
          return t.clone();
        var r = new wn(t.__wrapped__, t.__chain__);
        return r.__actions__ = tn(t.__actions__), r.__index__ = t.__index__, r.__values__ = t.__values__, r;
      }
      function a3(t, r, s) {
        (s ? Jt(t, r, s) : r === o) ? r = 1 : r = jt(je(r), 0);
        var c = t == null ? 0 : t.length;
        if (!c || r < 1)
          return [];
        for (var p = 0, y = 0, T = B(la(c / r)); p < c; )
          T[y++] = $n(t, p, p += r);
        return T;
      }
      function s3(t) {
        for (var r = -1, s = t == null ? 0 : t.length, c = 0, p = []; ++r < s; ) {
          var y = t[r];
          y && (p[c++] = y);
        }
        return p;
      }
      function l3() {
        var t = arguments.length;
        if (!t)
          return [];
        for (var r = B(t - 1), s = arguments[0], c = t; c--; )
          r[c - 1] = arguments[c];
        return gr(Me(s) ? tn(s) : [s], Ut(r, 1));
      }
      var u3 = ke(function(t, r) {
        return wt(t) ? ni(t, Ut(r, 1, wt, !0)) : [];
      }), c3 = ke(function(t, r) {
        var s = Pn(r);
        return wt(s) && (s = o), wt(t) ? ni(t, Ut(r, 1, wt, !0), Ce(s, 2)) : [];
      }), f3 = ke(function(t, r) {
        var s = Pn(r);
        return wt(s) && (s = o), wt(t) ? ni(t, Ut(r, 1, wt, !0), o, s) : [];
      });
      function d3(t, r, s) {
        var c = t == null ? 0 : t.length;
        return c ? (r = s || r === o ? 1 : je(r), $n(t, r < 0 ? 0 : r, c)) : [];
      }
      function p3(t, r, s) {
        var c = t == null ? 0 : t.length;
        return c ? (r = s || r === o ? 1 : je(r), r = c - r, $n(t, 0, r < 0 ? 0 : r)) : [];
      }
      function h3(t, r) {
        return t && t.length ? ya(t, Ce(r, 3), !0, !0) : [];
      }
      function g3(t, r) {
        return t && t.length ? ya(t, Ce(r, 3), !0) : [];
      }
      function m3(t, r, s, c) {
        var p = t == null ? 0 : t.length;
        return p ? (s && typeof s != "number" && Jt(t, r, s) && (s = 0, c = p), lg(t, r, s, c)) : [];
      }
      function wd(t, r, s) {
        var c = t == null ? 0 : t.length;
        if (!c)
          return -1;
        var p = s == null ? 0 : je(s);
        return p < 0 && (p = jt(c + p, 0)), Xi(t, Ce(r, 3), p);
      }
      function Rd(t, r, s) {
        var c = t == null ? 0 : t.length;
        if (!c)
          return -1;
        var p = c - 1;
        return s !== o && (p = je(s), p = s < 0 ? jt(c + p, 0) : Kt(p, c - 1)), Xi(t, Ce(r, 3), p, !0);
      }
      function $d(t) {
        var r = t == null ? 0 : t.length;
        return r ? Ut(t, 1) : [];
      }
      function v3(t) {
        var r = t == null ? 0 : t.length;
        return r ? Ut(t, oe) : [];
      }
      function y3(t, r) {
        var s = t == null ? 0 : t.length;
        return s ? (r = r === o ? 1 : je(r), Ut(t, r)) : [];
      }
      function b3(t) {
        for (var r = -1, s = t == null ? 0 : t.length, c = {}; ++r < s; ) {
          var p = t[r];
          c[p[0]] = p[1];
        }
        return c;
      }
      function Pd(t) {
        return t && t.length ? t[0] : o;
      }
      function x3(t, r, s) {
        var c = t == null ? 0 : t.length;
        if (!c)
          return -1;
        var p = s == null ? 0 : je(s);
        return p < 0 && (p = jt(c + p, 0)), to(t, r, p);
      }
      function _3(t) {
        var r = t == null ? 0 : t.length;
        return r ? $n(t, 0, -1) : [];
      }
      var E3 = ke(function(t) {
        var r = dt(t, Dl);
        return r.length && r[0] === t[0] ? Sl(r) : [];
      }), T3 = ke(function(t) {
        var r = Pn(t), s = dt(t, Dl);
        return r === Pn(s) ? r = o : s.pop(), s.length && s[0] === t[0] ? Sl(s, Ce(r, 2)) : [];
      }), C3 = ke(function(t) {
        var r = Pn(t), s = dt(t, Dl);
        return r = typeof r == "function" ? r : o, r && s.pop(), s.length && s[0] === t[0] ? Sl(s, o, r) : [];
      });
      function O3(t, r) {
        return t == null ? "" : _4.call(t, r);
      }
      function Pn(t) {
        var r = t == null ? 0 : t.length;
        return r ? t[r - 1] : o;
      }
      function S3(t, r, s) {
        var c = t == null ? 0 : t.length;
        if (!c)
          return -1;
        var p = c;
        return s !== o && (p = je(s), p = p < 0 ? jt(c + p, 0) : Kt(p, c - 1)), r === r ? i4(t, r, p) : Xi(t, cf, p, !0);
      }
      function w3(t, r) {
        return t && t.length ? zf(t, je(r)) : o;
      }
      var R3 = ke(Id);
      function Id(t, r) {
        return t && t.length && r && r.length ? Pl(t, r) : t;
      }
      function $3(t, r, s) {
        return t && t.length && r && r.length ? Pl(t, r, Ce(s, 2)) : t;
      }
      function P3(t, r, s) {
        return t && t.length && r && r.length ? Pl(t, r, o, s) : t;
      }
      var I3 = or(function(t, r) {
        var s = t == null ? 0 : t.length, c = El(t, r);
        return Vf(t, dt(r, function(p) {
          return ir(p, s) ? +p : p;
        }).sort(ed)), c;
      });
      function A3(t, r) {
        var s = [];
        if (!(t && t.length))
          return s;
        var c = -1, p = [], y = t.length;
        for (r = Ce(r, 3); ++c < y; ) {
          var T = t[c];
          r(T, c, t) && (s.push(T), p.push(c));
        }
        return Vf(t, p), s;
      }
      function Yl(t) {
        return t == null ? t : O4.call(t);
      }
      function M3(t, r, s) {
        var c = t == null ? 0 : t.length;
        return c ? (s && typeof s != "number" && Jt(t, r, s) ? (r = 0, s = c) : (r = r == null ? 0 : je(r), s = s === o ? c : je(s)), $n(t, r, s)) : [];
      }
      function N3(t, r) {
        return va(t, r);
      }
      function j3(t, r, s) {
        return Ml(t, r, Ce(s, 2));
      }
      function D3(t, r) {
        var s = t == null ? 0 : t.length;
        if (s) {
          var c = va(t, r);
          if (c < s && Bn(t[c], r))
            return c;
        }
        return -1;
      }
      function F3(t, r) {
        return va(t, r, !0);
      }
      function k3(t, r, s) {
        return Ml(t, r, Ce(s, 2), !0);
      }
      function L3(t, r) {
        var s = t == null ? 0 : t.length;
        if (s) {
          var c = va(t, r, !0) - 1;
          if (Bn(t[c], r))
            return c;
        }
        return -1;
      }
      function B3(t) {
        return t && t.length ? qf(t) : [];
      }
      function z3(t, r) {
        return t && t.length ? qf(t, Ce(r, 2)) : [];
      }
      function W3(t) {
        var r = t == null ? 0 : t.length;
        return r ? $n(t, 1, r) : [];
      }
      function U3(t, r, s) {
        return t && t.length ? (r = s || r === o ? 1 : je(r), $n(t, 0, r < 0 ? 0 : r)) : [];
      }
      function V3(t, r, s) {
        var c = t == null ? 0 : t.length;
        return c ? (r = s || r === o ? 1 : je(r), r = c - r, $n(t, r < 0 ? 0 : r, c)) : [];
      }
      function H3(t, r) {
        return t && t.length ? ya(t, Ce(r, 3), !1, !0) : [];
      }
      function q3(t, r) {
        return t && t.length ? ya(t, Ce(r, 3)) : [];
      }
      var Z3 = ke(function(t) {
        return br(Ut(t, 1, wt, !0));
      }), K3 = ke(function(t) {
        var r = Pn(t);
        return wt(r) && (r = o), br(Ut(t, 1, wt, !0), Ce(r, 2));
      }), G3 = ke(function(t) {
        var r = Pn(t);
        return r = typeof r == "function" ? r : o, br(Ut(t, 1, wt, !0), o, r);
      });
      function Y3(t) {
        return t && t.length ? br(t) : [];
      }
      function X3(t, r) {
        return t && t.length ? br(t, Ce(r, 2)) : [];
      }
      function J3(t, r) {
        return r = typeof r == "function" ? r : o, t && t.length ? br(t, o, r) : [];
      }
      function Xl(t) {
        if (!(t && t.length))
          return [];
        var r = 0;
        return t = hr(t, function(s) {
          if (wt(s))
            return r = jt(s.length, r), !0;
        }), hl(r, function(s) {
          return dt(t, fl(s));
        });
      }
      function Ad(t, r) {
        if (!(t && t.length))
          return [];
        var s = Xl(t);
        return r == null ? s : dt(s, function(c) {
          return un(r, o, c);
        });
      }
      var Q3 = ke(function(t, r) {
        return wt(t) ? ni(t, r) : [];
      }), em = ke(function(t) {
        return jl(hr(t, wt));
      }), tm = ke(function(t) {
        var r = Pn(t);
        return wt(r) && (r = o), jl(hr(t, wt), Ce(r, 2));
      }), nm = ke(function(t) {
        var r = Pn(t);
        return r = typeof r == "function" ? r : o, jl(hr(t, wt), o, r);
      }), rm = ke(Xl);
      function om(t, r) {
        return Yf(t || [], r || [], ti);
      }
      function im(t, r) {
        return Yf(t || [], r || [], ii);
      }
      var am = ke(function(t) {
        var r = t.length, s = r > 1 ? t[r - 1] : o;
        return s = typeof s == "function" ? (t.pop(), s) : o, Ad(t, s);
      });
      function Md(t) {
        var r = m(t);
        return r.__chain__ = !0, r;
      }
      function sm(t, r) {
        return r(t), t;
      }
      function wa(t, r) {
        return r(t);
      }
      var lm = or(function(t) {
        var r = t.length, s = r ? t[0] : 0, c = this.__wrapped__, p = function(y) {
          return El(y, t);
        };
        return r > 1 || this.__actions__.length || !(c instanceof Ve) || !ir(s) ? this.thru(p) : (c = c.slice(s, +s + (r ? 1 : 0)), c.__actions__.push({
          func: wa,
          args: [p],
          thisArg: o
        }), new wn(c, this.__chain__).thru(function(y) {
          return r && !y.length && y.push(o), y;
        }));
      });
      function um() {
        return Md(this);
      }
      function cm() {
        return new wn(this.value(), this.__chain__);
      }
      function fm() {
        this.__values__ === o && (this.__values__ = Zd(this.value()));
        var t = this.__index__ >= this.__values__.length, r = t ? o : this.__values__[this.__index__++];
        return { done: t, value: r };
      }
      function dm() {
        return this;
      }
      function pm(t) {
        for (var r, s = this; s instanceof da; ) {
          var c = Sd(s);
          c.__index__ = 0, c.__values__ = o, r ? p.__wrapped__ = c : r = c;
          var p = c;
          s = s.__wrapped__;
        }
        return p.__wrapped__ = t, r;
      }
      function hm() {
        var t = this.__wrapped__;
        if (t instanceof Ve) {
          var r = t;
          return this.__actions__.length && (r = new Ve(this)), r = r.reverse(), r.__actions__.push({
            func: wa,
            args: [Yl],
            thisArg: o
          }), new wn(r, this.__chain__);
        }
        return this.thru(Yl);
      }
      function gm() {
        return Gf(this.__wrapped__, this.__actions__);
      }
      var mm = ba(function(t, r, s) {
        rt.call(t, s) ? ++t[s] : nr(t, s, 1);
      });
      function vm(t, r, s) {
        var c = Me(t) ? lf : sg;
        return s && Jt(t, r, s) && (r = o), c(t, Ce(r, 3));
      }
      function ym(t, r) {
        var s = Me(t) ? hr : Af;
        return s(t, Ce(r, 3));
      }
      var bm = ad(wd), xm = ad(Rd);
      function _m(t, r) {
        return Ut(Ra(t, r), 1);
      }
      function Em(t, r) {
        return Ut(Ra(t, r), oe);
      }
      function Tm(t, r, s) {
        return s = s === o ? 1 : je(s), Ut(Ra(t, r), s);
      }
      function Nd(t, r) {
        var s = Me(t) ? On : yr;
        return s(t, Ce(r, 3));
      }
      function jd(t, r) {
        var s = Me(t) ? W2 : If;
        return s(t, Ce(r, 3));
      }
      var Cm = ba(function(t, r, s) {
        rt.call(t, s) ? t[s].push(r) : nr(t, s, [r]);
      });
      function Om(t, r, s, c) {
        t = nn(t) ? t : ho(t), s = s && !c ? je(s) : 0;
        var p = t.length;
        return s < 0 && (s = jt(p + s, 0)), Ma(t) ? s <= p && t.indexOf(r, s) > -1 : !!p && to(t, r, s) > -1;
      }
      var Sm = ke(function(t, r, s) {
        var c = -1, p = typeof r == "function", y = nn(t) ? B(t.length) : [];
        return yr(t, function(T) {
          y[++c] = p ? un(r, T, s) : ri(T, r, s);
        }), y;
      }), wm = ba(function(t, r, s) {
        nr(t, s, r);
      });
      function Ra(t, r) {
        var s = Me(t) ? dt : kf;
        return s(t, Ce(r, 3));
      }
      function Rm(t, r, s, c) {
        return t == null ? [] : (Me(r) || (r = r == null ? [] : [r]), s = c ? o : s, Me(s) || (s = s == null ? [] : [s]), Wf(t, r, s));
      }
      var $m = ba(function(t, r, s) {
        t[s ? 0 : 1].push(r);
      }, function() {
        return [[], []];
      });
      function Pm(t, r, s) {
        var c = Me(t) ? ul : df, p = arguments.length < 3;
        return c(t, Ce(r, 4), s, p, yr);
      }
      function Im(t, r, s) {
        var c = Me(t) ? U2 : df, p = arguments.length < 3;
        return c(t, Ce(r, 4), s, p, If);
      }
      function Am(t, r) {
        var s = Me(t) ? hr : Af;
        return s(t, Ia(Ce(r, 3)));
      }
      function Mm(t) {
        var r = Me(t) ? wf : Og;
        return r(t);
      }
      function Nm(t, r, s) {
        (s ? Jt(t, r, s) : r === o) ? r = 1 : r = je(r);
        var c = Me(t) ? ng : Sg;
        return c(t, r);
      }
      function jm(t) {
        var r = Me(t) ? rg : Rg;
        return r(t);
      }
      function Dm(t) {
        if (t == null)
          return 0;
        if (nn(t))
          return Ma(t) ? ro(t) : t.length;
        var r = Gt(t);
        return r == H || r == ze ? t.size : Rl(t).length;
      }
      function Fm(t, r, s) {
        var c = Me(t) ? cl : $g;
        return s && Jt(t, r, s) && (r = o), c(t, Ce(r, 3));
      }
      var km = ke(function(t, r) {
        if (t == null)
          return [];
        var s = r.length;
        return s > 1 && Jt(t, r[0], r[1]) ? r = [] : s > 2 && Jt(r[0], r[1], r[2]) && (r = [r[0]]), Wf(t, Ut(r, 1), []);
      }), $a = y4 || function() {
        return Wt.Date.now();
      };
      function Lm(t, r) {
        if (typeof r != "function")
          throw new Sn(f);
        return t = je(t), function() {
          if (--t < 1)
            return r.apply(this, arguments);
        };
      }
      function Dd(t, r, s) {
        return r = s ? o : r, r = t && r == null ? t.length : r, rr(t, L, o, o, o, o, r);
      }
      function Fd(t, r) {
        var s;
        if (typeof r != "function")
          throw new Sn(f);
        return t = je(t), function() {
          return --t > 0 && (s = r.apply(this, arguments)), t <= 1 && (r = o), s;
        };
      }
      var Jl = ke(function(t, r, s) {
        var c = E;
        if (s.length) {
          var p = mr(s, fo(Jl));
          c |= O;
        }
        return rr(t, c, r, s, p);
      }), kd = ke(function(t, r, s) {
        var c = E | $;
        if (s.length) {
          var p = mr(s, fo(kd));
          c |= O;
        }
        return rr(r, c, t, s, p);
      });
      function Ld(t, r, s) {
        r = s ? o : r;
        var c = rr(t, A, o, o, o, o, o, r);
        return c.placeholder = Ld.placeholder, c;
      }
      function Bd(t, r, s) {
        r = s ? o : r;
        var c = rr(t, M, o, o, o, o, o, r);
        return c.placeholder = Bd.placeholder, c;
      }
      function zd(t, r, s) {
        var c, p, y, T, R, F, U = 0, V = !1, q = !1, se = !0;
        if (typeof t != "function")
          throw new Sn(f);
        r = In(r) || 0, vt(s) && (V = !!s.leading, q = "maxWait" in s, y = q ? jt(In(s.maxWait) || 0, r) : y, se = "trailing" in s ? !!s.trailing : se);
        function ve(Rt) {
          var zn = c, lr = p;
          return c = p = o, U = Rt, T = t.apply(lr, zn), T;
        }
        function Oe(Rt) {
          return U = Rt, R = li(We, r), V ? ve(Rt) : T;
        }
        function De(Rt) {
          var zn = Rt - F, lr = Rt - U, ap = r - zn;
          return q ? Kt(ap, y - lr) : ap;
        }
        function Se(Rt) {
          var zn = Rt - F, lr = Rt - U;
          return F === o || zn >= r || zn < 0 || q && lr >= y;
        }
        function We() {
          var Rt = $a();
          if (Se(Rt))
            return qe(Rt);
          R = li(We, De(Rt));
        }
        function qe(Rt) {
          return R = o, se && c ? ve(Rt) : (c = p = o, T);
        }
        function pn() {
          R !== o && Xf(R), U = 0, c = F = p = R = o;
        }
        function Qt() {
          return R === o ? T : qe($a());
        }
        function hn() {
          var Rt = $a(), zn = Se(Rt);
          if (c = arguments, p = this, F = Rt, zn) {
            if (R === o)
              return Oe(F);
            if (q)
              return Xf(R), R = li(We, r), ve(F);
          }
          return R === o && (R = li(We, r)), T;
        }
        return hn.cancel = pn, hn.flush = Qt, hn;
      }
      var Bm = ke(function(t, r) {
        return Pf(t, 1, r);
      }), zm = ke(function(t, r, s) {
        return Pf(t, In(r) || 0, s);
      });
      function Wm(t) {
        return rr(t, le);
      }
      function Pa(t, r) {
        if (typeof t != "function" || r != null && typeof r != "function")
          throw new Sn(f);
        var s = function() {
          var c = arguments, p = r ? r.apply(this, c) : c[0], y = s.cache;
          if (y.has(p))
            return y.get(p);
          var T = t.apply(this, c);
          return s.cache = y.set(p, T) || y, T;
        };
        return s.cache = new (Pa.Cache || tr)(), s;
      }
      Pa.Cache = tr;
      function Ia(t) {
        if (typeof t != "function")
          throw new Sn(f);
        return function() {
          var r = arguments;
          switch (r.length) {
            case 0:
              return !t.call(this);
            case 1:
              return !t.call(this, r[0]);
            case 2:
              return !t.call(this, r[0], r[1]);
            case 3:
              return !t.call(this, r[0], r[1], r[2]);
          }
          return !t.apply(this, r);
        };
      }
      function Um(t) {
        return Fd(2, t);
      }
      var Vm = Pg(function(t, r) {
        r = r.length == 1 && Me(r[0]) ? dt(r[0], cn(Ce())) : dt(Ut(r, 1), cn(Ce()));
        var s = r.length;
        return ke(function(c) {
          for (var p = -1, y = Kt(c.length, s); ++p < y; )
            c[p] = r[p].call(this, c[p]);
          return un(t, this, c);
        });
      }), Ql = ke(function(t, r) {
        var s = mr(r, fo(Ql));
        return rr(t, O, o, r, s);
      }), Wd = ke(function(t, r) {
        var s = mr(r, fo(Wd));
        return rr(t, k, o, r, s);
      }), Hm = or(function(t, r) {
        return rr(t, J, o, o, o, r);
      });
      function qm(t, r) {
        if (typeof t != "function")
          throw new Sn(f);
        return r = r === o ? r : je(r), ke(t, r);
      }
      function Zm(t, r) {
        if (typeof t != "function")
          throw new Sn(f);
        return r = r == null ? 0 : jt(je(r), 0), ke(function(s) {
          var c = s[r], p = _r(s, 0, r);
          return c && gr(p, c), un(t, this, p);
        });
      }
      function Km(t, r, s) {
        var c = !0, p = !0;
        if (typeof t != "function")
          throw new Sn(f);
        return vt(s) && (c = "leading" in s ? !!s.leading : c, p = "trailing" in s ? !!s.trailing : p), zd(t, r, {
          leading: c,
          maxWait: r,
          trailing: p
        });
      }
      function Gm(t) {
        return Dd(t, 1);
      }
      function Ym(t, r) {
        return Ql(Fl(r), t);
      }
      function Xm() {
        if (!arguments.length)
          return [];
        var t = arguments[0];
        return Me(t) ? t : [t];
      }
      function Jm(t) {
        return Rn(t, P);
      }
      function Qm(t, r) {
        return r = typeof r == "function" ? r : o, Rn(t, P, r);
      }
      function e5(t) {
        return Rn(t, x | P);
      }
      function t5(t, r) {
        return r = typeof r == "function" ? r : o, Rn(t, x | P, r);
      }
      function n5(t, r) {
        return r == null || $f(t, r, kt(r));
      }
      function Bn(t, r) {
        return t === r || t !== t && r !== r;
      }
      var r5 = Ta(Ol), o5 = Ta(function(t, r) {
        return t >= r;
      }), Fr = jf(/* @__PURE__ */ function() {
        return arguments;
      }()) ? jf : function(t) {
        return Et(t) && rt.call(t, "callee") && !_f.call(t, "callee");
      }, Me = B.isArray, i5 = tf ? cn(tf) : pg;
      function nn(t) {
        return t != null && Aa(t.length) && !ar(t);
      }
      function wt(t) {
        return Et(t) && nn(t);
      }
      function a5(t) {
        return t === !0 || t === !1 || Et(t) && Xt(t) == ge;
      }
      var Er = x4 || cu, s5 = nf ? cn(nf) : hg;
      function l5(t) {
        return Et(t) && t.nodeType === 1 && !ui(t);
      }
      function u5(t) {
        if (t == null)
          return !0;
        if (nn(t) && (Me(t) || typeof t == "string" || typeof t.splice == "function" || Er(t) || po(t) || Fr(t)))
          return !t.length;
        var r = Gt(t);
        if (r == H || r == ze)
          return !t.size;
        if (si(t))
          return !Rl(t).length;
        for (var s in t)
          if (rt.call(t, s))
            return !1;
        return !0;
      }
      function c5(t, r) {
        return oi(t, r);
      }
      function f5(t, r, s) {
        s = typeof s == "function" ? s : o;
        var c = s ? s(t, r) : o;
        return c === o ? oi(t, r, o, s) : !!c;
      }
      function eu(t) {
        if (!Et(t))
          return !1;
        var r = Xt(t);
        return r == be || r == _e || typeof t.message == "string" && typeof t.name == "string" && !ui(t);
      }
      function d5(t) {
        return typeof t == "number" && Tf(t);
      }
      function ar(t) {
        if (!vt(t))
          return !1;
        var r = Xt(t);
        return r == Z || r == Ee || r == ye || r == Ft;
      }
      function Ud(t) {
        return typeof t == "number" && t == je(t);
      }
      function Aa(t) {
        return typeof t == "number" && t > -1 && t % 1 == 0 && t <= X;
      }
      function vt(t) {
        var r = typeof t;
        return t != null && (r == "object" || r == "function");
      }
      function Et(t) {
        return t != null && typeof t == "object";
      }
      var Vd = rf ? cn(rf) : mg;
      function p5(t, r) {
        return t === r || wl(t, r, Vl(r));
      }
      function h5(t, r, s) {
        return s = typeof s == "function" ? s : o, wl(t, r, Vl(r), s);
      }
      function g5(t) {
        return Hd(t) && t != +t;
      }
      function m5(t) {
        if (Qg(t))
          throw new Ae(u);
        return Df(t);
      }
      function v5(t) {
        return t === null;
      }
      function y5(t) {
        return t == null;
      }
      function Hd(t) {
        return typeof t == "number" || Et(t) && Xt(t) == Ie;
      }
      function ui(t) {
        if (!Et(t) || Xt(t) != ot)
          return !1;
        var r = ia(t);
        if (r === null)
          return !0;
        var s = rt.call(r, "constructor") && r.constructor;
        return typeof s == "function" && s instanceof s && ta.call(s) == h4;
      }
      var tu = of ? cn(of) : vg;
      function b5(t) {
        return Ud(t) && t >= -X && t <= X;
      }
      var qd = af ? cn(af) : yg;
      function Ma(t) {
        return typeof t == "string" || !Me(t) && Et(t) && Xt(t) == xt;
      }
      function dn(t) {
        return typeof t == "symbol" || Et(t) && Xt(t) == Ot;
      }
      var po = sf ? cn(sf) : bg;
      function x5(t) {
        return t === o;
      }
      function _5(t) {
        return Et(t) && Gt(t) == St;
      }
      function E5(t) {
        return Et(t) && Xt(t) == xn;
      }
      var T5 = Ta($l), C5 = Ta(function(t, r) {
        return t <= r;
      });
      function Zd(t) {
        if (!t)
          return [];
        if (nn(t))
          return Ma(t) ? kn(t) : tn(t);
        if (Yo && t[Yo])
          return n4(t[Yo]());
        var r = Gt(t), s = r == H ? ml : r == ze ? Ji : ho;
        return s(t);
      }
      function sr(t) {
        if (!t)
          return t === 0 ? t : 0;
        if (t = In(t), t === oe || t === -oe) {
          var r = t < 0 ? -1 : 1;
          return r * Pe;
        }
        return t === t ? t : 0;
      }
      function je(t) {
        var r = sr(t), s = r % 1;
        return r === r ? s ? r - s : r : 0;
      }
      function Kd(t) {
        return t ? Mr(je(t), 0, Y) : 0;
      }
      function In(t) {
        if (typeof t == "number")
          return t;
        if (dn(t))
          return W;
        if (vt(t)) {
          var r = typeof t.valueOf == "function" ? t.valueOf() : t;
          t = vt(r) ? r + "" : r;
        }
        if (typeof t != "string")
          return t === 0 ? t : +t;
        t = pf(t);
        var s = Ue.test(t);
        return s || Bt.test(t) ? L2(t.slice(2), s ? 2 : 8) : nt.test(t) ? W : +t;
      }
      function Gd(t) {
        return Vn(t, rn(t));
      }
      function O5(t) {
        return t ? Mr(je(t), -X, X) : t === 0 ? t : 0;
      }
      function Xe(t) {
        return t == null ? "" : fn(t);
      }
      var S5 = uo(function(t, r) {
        if (si(r) || nn(r)) {
          Vn(r, kt(r), t);
          return;
        }
        for (var s in r)
          rt.call(r, s) && ti(t, s, r[s]);
      }), Yd = uo(function(t, r) {
        Vn(r, rn(r), t);
      }), Na = uo(function(t, r, s, c) {
        Vn(r, rn(r), t, c);
      }), w5 = uo(function(t, r, s, c) {
        Vn(r, kt(r), t, c);
      }), R5 = or(El);
      function $5(t, r) {
        var s = lo(t);
        return r == null ? s : Rf(s, r);
      }
      var P5 = ke(function(t, r) {
        t = at(t);
        var s = -1, c = r.length, p = c > 2 ? r[2] : o;
        for (p && Jt(r[0], r[1], p) && (c = 1); ++s < c; )
          for (var y = r[s], T = rn(y), R = -1, F = T.length; ++R < F; ) {
            var U = T[R], V = t[U];
            (V === o || Bn(V, io[U]) && !rt.call(t, U)) && (t[U] = y[U]);
          }
        return t;
      }), I5 = ke(function(t) {
        return t.push(o, pd), un(Xd, o, t);
      });
      function A5(t, r) {
        return uf(t, Ce(r, 3), Un);
      }
      function M5(t, r) {
        return uf(t, Ce(r, 3), Cl);
      }
      function N5(t, r) {
        return t == null ? t : Tl(t, Ce(r, 3), rn);
      }
      function j5(t, r) {
        return t == null ? t : Mf(t, Ce(r, 3), rn);
      }
      function D5(t, r) {
        return t && Un(t, Ce(r, 3));
      }
      function F5(t, r) {
        return t && Cl(t, Ce(r, 3));
      }
      function k5(t) {
        return t == null ? [] : ga(t, kt(t));
      }
      function L5(t) {
        return t == null ? [] : ga(t, rn(t));
      }
      function nu(t, r, s) {
        var c = t == null ? o : Nr(t, r);
        return c === o ? s : c;
      }
      function B5(t, r) {
        return t != null && md(t, r, ug);
      }
      function ru(t, r) {
        return t != null && md(t, r, cg);
      }
      var z5 = ld(function(t, r, s) {
        r != null && typeof r.toString != "function" && (r = na.call(r)), t[r] = s;
      }, iu(on)), W5 = ld(function(t, r, s) {
        r != null && typeof r.toString != "function" && (r = na.call(r)), rt.call(t, r) ? t[r].push(s) : t[r] = [s];
      }, Ce), U5 = ke(ri);
      function kt(t) {
        return nn(t) ? Sf(t) : Rl(t);
      }
      function rn(t) {
        return nn(t) ? Sf(t, !0) : xg(t);
      }
      function V5(t, r) {
        var s = {};
        return r = Ce(r, 3), Un(t, function(c, p, y) {
          nr(s, r(c, p, y), c);
        }), s;
      }
      function H5(t, r) {
        var s = {};
        return r = Ce(r, 3), Un(t, function(c, p, y) {
          nr(s, p, r(c, p, y));
        }), s;
      }
      var q5 = uo(function(t, r, s) {
        ma(t, r, s);
      }), Xd = uo(function(t, r, s, c) {
        ma(t, r, s, c);
      }), Z5 = or(function(t, r) {
        var s = {};
        if (t == null)
          return s;
        var c = !1;
        r = dt(r, function(y) {
          return y = xr(y, t), c || (c = y.length > 1), y;
        }), Vn(t, Wl(t), s), c && (s = Rn(s, x | _ | P, zg));
        for (var p = r.length; p--; )
          Nl(s, r[p]);
        return s;
      });
      function K5(t, r) {
        return Jd(t, Ia(Ce(r)));
      }
      var G5 = or(function(t, r) {
        return t == null ? {} : Eg(t, r);
      });
      function Jd(t, r) {
        if (t == null)
          return {};
        var s = dt(Wl(t), function(c) {
          return [c];
        });
        return r = Ce(r), Uf(t, s, function(c, p) {
          return r(c, p[0]);
        });
      }
      function Y5(t, r, s) {
        r = xr(r, t);
        var c = -1, p = r.length;
        for (p || (p = 1, t = o); ++c < p; ) {
          var y = t == null ? o : t[Hn(r[c])];
          y === o && (c = p, y = s), t = ar(y) ? y.call(t) : y;
        }
        return t;
      }
      function X5(t, r, s) {
        return t == null ? t : ii(t, r, s);
      }
      function J5(t, r, s, c) {
        return c = typeof c == "function" ? c : o, t == null ? t : ii(t, r, s, c);
      }
      var Qd = fd(kt), ep = fd(rn);
      function Q5(t, r, s) {
        var c = Me(t), p = c || Er(t) || po(t);
        if (r = Ce(r, 4), s == null) {
          var y = t && t.constructor;
          p ? s = c ? new y() : [] : vt(t) ? s = ar(y) ? lo(ia(t)) : {} : s = {};
        }
        return (p ? On : Un)(t, function(T, R, F) {
          return r(s, T, R, F);
        }), s;
      }
      function e8(t, r) {
        return t == null ? !0 : Nl(t, r);
      }
      function t8(t, r, s) {
        return t == null ? t : Kf(t, r, Fl(s));
      }
      function n8(t, r, s, c) {
        return c = typeof c == "function" ? c : o, t == null ? t : Kf(t, r, Fl(s), c);
      }
      function ho(t) {
        return t == null ? [] : gl(t, kt(t));
      }
      function r8(t) {
        return t == null ? [] : gl(t, rn(t));
      }
      function o8(t, r, s) {
        return s === o && (s = r, r = o), s !== o && (s = In(s), s = s === s ? s : 0), r !== o && (r = In(r), r = r === r ? r : 0), Mr(In(t), r, s);
      }
      function i8(t, r, s) {
        return r = sr(r), s === o ? (s = r, r = 0) : s = sr(s), t = In(t), fg(t, r, s);
      }
      function a8(t, r, s) {
        if (s && typeof s != "boolean" && Jt(t, r, s) && (r = s = o), s === o && (typeof r == "boolean" ? (s = r, r = o) : typeof t == "boolean" && (s = t, t = o)), t === o && r === o ? (t = 0, r = 1) : (t = sr(t), r === o ? (r = t, t = 0) : r = sr(r)), t > r) {
          var c = t;
          t = r, r = c;
        }
        if (s || t % 1 || r % 1) {
          var p = Cf();
          return Kt(t + p * (r - t + k2("1e-" + ((p + "").length - 1))), r);
        }
        return Il(t, r);
      }
      var s8 = co(function(t, r, s) {
        return r = r.toLowerCase(), t + (s ? tp(r) : r);
      });
      function tp(t) {
        return ou(Xe(t).toLowerCase());
      }
      function np(t) {
        return t = Xe(t), t && t.replace(_t, X2).replace(R2, "");
      }
      function l8(t, r, s) {
        t = Xe(t), r = fn(r);
        var c = t.length;
        s = s === o ? c : Mr(je(s), 0, c);
        var p = s;
        return s -= r.length, s >= 0 && t.slice(s, p) == r;
      }
      function u8(t) {
        return t = Xe(t), t && Wi.test(t) ? t.replace(Jr, J2) : t;
      }
      function c8(t) {
        return t = Xe(t), t && Zi.test(t) ? t.replace(Zo, "\\$&") : t;
      }
      var f8 = co(function(t, r, s) {
        return t + (s ? "-" : "") + r.toLowerCase();
      }), d8 = co(function(t, r, s) {
        return t + (s ? " " : "") + r.toLowerCase();
      }), p8 = id("toLowerCase");
      function h8(t, r, s) {
        t = Xe(t), r = je(r);
        var c = r ? ro(t) : 0;
        if (!r || c >= r)
          return t;
        var p = (r - c) / 2;
        return Ea(ua(p), s) + t + Ea(la(p), s);
      }
      function g8(t, r, s) {
        t = Xe(t), r = je(r);
        var c = r ? ro(t) : 0;
        return r && c < r ? t + Ea(r - c, s) : t;
      }
      function m8(t, r, s) {
        t = Xe(t), r = je(r);
        var c = r ? ro(t) : 0;
        return r && c < r ? Ea(r - c, s) + t : t;
      }
      function v8(t, r, s) {
        return s || r == null ? r = 0 : r && (r = +r), C4(Xe(t).replace(Qr, ""), r || 0);
      }
      function y8(t, r, s) {
        return (s ? Jt(t, r, s) : r === o) ? r = 1 : r = je(r), Al(Xe(t), r);
      }
      function b8() {
        var t = arguments, r = Xe(t[0]);
        return t.length < 3 ? r : r.replace(t[1], t[2]);
      }
      var x8 = co(function(t, r, s) {
        return t + (s ? "_" : "") + r.toLowerCase();
      });
      function _8(t, r, s) {
        return s && typeof s != "number" && Jt(t, r, s) && (r = s = o), s = s === o ? Y : s >>> 0, s ? (t = Xe(t), t && (typeof r == "string" || r != null && !tu(r)) && (r = fn(r), !r && no(t)) ? _r(kn(t), 0, s) : t.split(r, s)) : [];
      }
      var E8 = co(function(t, r, s) {
        return t + (s ? " " : "") + ou(r);
      });
      function T8(t, r, s) {
        return t = Xe(t), s = s == null ? 0 : Mr(je(s), 0, t.length), r = fn(r), t.slice(s, s + r.length) == r;
      }
      function C8(t, r, s) {
        var c = m.templateSettings;
        s && Jt(t, r, s) && (r = o), t = Xe(t), r = Na({}, r, c, dd);
        var p = Na({}, r.imports, c.imports, dd), y = kt(p), T = gl(p, y), R, F, U = 0, V = r.interpolate || zt, q = "__p += '", se = vl(
          (r.escape || zt).source + "|" + V.source + "|" + (V === Vi ? we : zt).source + "|" + (r.evaluate || zt).source + "|$",
          "g"
        ), ve = "//# sourceURL=" + (rt.call(r, "sourceURL") ? (r.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++M2 + "]") + `
`;
        t.replace(se, function(Se, We, qe, pn, Qt, hn) {
          return qe || (qe = pn), q += t.slice(U, hn).replace(pr, Q2), We && (R = !0, q += `' +
__e(` + We + `) +
'`), Qt && (F = !0, q += `';
` + Qt + `;
__p += '`), qe && (q += `' +
((__t = (` + qe + `)) == null ? '' : __t) +
'`), U = hn + Se.length, Se;
        }), q += `';
`;
        var Oe = rt.call(r, "variable") && r.variable;
        if (!Oe)
          q = `with (obj) {
` + q + `
}
`;
        else if (K.test(Oe))
          throw new Ae(d);
        q = (F ? q.replace(Xr, "") : q).replace(Ho, "$1").replace(zi, "$1;"), q = "function(" + (Oe || "obj") + `) {
` + (Oe ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (R ? ", __e = _.escape" : "") + (F ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + q + `return __p
}`;
        var De = op(function() {
          return Ke(y, ve + "return " + q).apply(o, T);
        });
        if (De.source = q, eu(De))
          throw De;
        return De;
      }
      function O8(t) {
        return Xe(t).toLowerCase();
      }
      function S8(t) {
        return Xe(t).toUpperCase();
      }
      function w8(t, r, s) {
        if (t = Xe(t), t && (s || r === o))
          return pf(t);
        if (!t || !(r = fn(r)))
          return t;
        var c = kn(t), p = kn(r), y = hf(c, p), T = gf(c, p) + 1;
        return _r(c, y, T).join("");
      }
      function R8(t, r, s) {
        if (t = Xe(t), t && (s || r === o))
          return t.slice(0, vf(t) + 1);
        if (!t || !(r = fn(r)))
          return t;
        var c = kn(t), p = gf(c, kn(r)) + 1;
        return _r(c, 0, p).join("");
      }
      function $8(t, r, s) {
        if (t = Xe(t), t && (s || r === o))
          return t.replace(Qr, "");
        if (!t || !(r = fn(r)))
          return t;
        var c = kn(t), p = hf(c, kn(r));
        return _r(c, p).join("");
      }
      function P8(t, r) {
        var s = G, c = ie;
        if (vt(r)) {
          var p = "separator" in r ? r.separator : p;
          s = "length" in r ? je(r.length) : s, c = "omission" in r ? fn(r.omission) : c;
        }
        t = Xe(t);
        var y = t.length;
        if (no(t)) {
          var T = kn(t);
          y = T.length;
        }
        if (s >= y)
          return t;
        var R = s - ro(c);
        if (R < 1)
          return c;
        var F = T ? _r(T, 0, R).join("") : t.slice(0, R);
        if (p === o)
          return F + c;
        if (T && (R += F.length - R), tu(p)) {
          if (t.slice(R).search(p)) {
            var U, V = F;
            for (p.global || (p = vl(p.source, Xe(Ze.exec(p)) + "g")), p.lastIndex = 0; U = p.exec(V); )
              var q = U.index;
            F = F.slice(0, q === o ? R : q);
          }
        } else if (t.indexOf(fn(p), R) != R) {
          var se = F.lastIndexOf(p);
          se > -1 && (F = F.slice(0, se));
        }
        return F + c;
      }
      function I8(t) {
        return t = Xe(t), t && qo.test(t) ? t.replace(Qn, a4) : t;
      }
      var A8 = co(function(t, r, s) {
        return t + (s ? " " : "") + r.toUpperCase();
      }), ou = id("toUpperCase");
      function rp(t, r, s) {
        return t = Xe(t), r = s ? o : r, r === o ? t4(t) ? u4(t) : q2(t) : t.match(r) || [];
      }
      var op = ke(function(t, r) {
        try {
          return un(t, o, r);
        } catch (s) {
          return eu(s) ? s : new Ae(s);
        }
      }), M8 = or(function(t, r) {
        return On(r, function(s) {
          s = Hn(s), nr(t, s, Jl(t[s], t));
        }), t;
      });
      function N8(t) {
        var r = t == null ? 0 : t.length, s = Ce();
        return t = r ? dt(t, function(c) {
          if (typeof c[1] != "function")
            throw new Sn(f);
          return [s(c[0]), c[1]];
        }) : [], ke(function(c) {
          for (var p = -1; ++p < r; ) {
            var y = t[p];
            if (un(y[0], this, c))
              return un(y[1], this, c);
          }
        });
      }
      function j8(t) {
        return ag(Rn(t, x));
      }
      function iu(t) {
        return function() {
          return t;
        };
      }
      function D8(t, r) {
        return t == null || t !== t ? r : t;
      }
      var F8 = sd(), k8 = sd(!0);
      function on(t) {
        return t;
      }
      function au(t) {
        return Ff(typeof t == "function" ? t : Rn(t, x));
      }
      function L8(t) {
        return Lf(Rn(t, x));
      }
      function B8(t, r) {
        return Bf(t, Rn(r, x));
      }
      var z8 = ke(function(t, r) {
        return function(s) {
          return ri(s, t, r);
        };
      }), W8 = ke(function(t, r) {
        return function(s) {
          return ri(t, s, r);
        };
      });
      function su(t, r, s) {
        var c = kt(r), p = ga(r, c);
        s == null && !(vt(r) && (p.length || !c.length)) && (s = r, r = t, t = this, p = ga(r, kt(r)));
        var y = !(vt(s) && "chain" in s) || !!s.chain, T = ar(t);
        return On(p, function(R) {
          var F = r[R];
          t[R] = F, T && (t.prototype[R] = function() {
            var U = this.__chain__;
            if (y || U) {
              var V = t(this.__wrapped__), q = V.__actions__ = tn(this.__actions__);
              return q.push({ func: F, args: arguments, thisArg: t }), V.__chain__ = U, V;
            }
            return F.apply(t, gr([this.value()], arguments));
          });
        }), t;
      }
      function U8() {
        return Wt._ === this && (Wt._ = g4), this;
      }
      function lu() {
      }
      function V8(t) {
        return t = je(t), ke(function(r) {
          return zf(r, t);
        });
      }
      var H8 = Ll(dt), q8 = Ll(lf), Z8 = Ll(cl);
      function ip(t) {
        return ql(t) ? fl(Hn(t)) : Tg(t);
      }
      function K8(t) {
        return function(r) {
          return t == null ? o : Nr(t, r);
        };
      }
      var G8 = ud(), Y8 = ud(!0);
      function uu() {
        return [];
      }
      function cu() {
        return !1;
      }
      function X8() {
        return {};
      }
      function J8() {
        return "";
      }
      function Q8() {
        return !0;
      }
      function ev(t, r) {
        if (t = je(t), t < 1 || t > X)
          return [];
        var s = Y, c = Kt(t, Y);
        r = Ce(r), t -= Y;
        for (var p = hl(c, r); ++s < t; )
          r(s);
        return p;
      }
      function tv(t) {
        return Me(t) ? dt(t, Hn) : dn(t) ? [t] : tn(Od(Xe(t)));
      }
      function nv(t) {
        var r = ++p4;
        return Xe(t) + r;
      }
      var rv = _a(function(t, r) {
        return t + r;
      }, 0), ov = Bl("ceil"), iv = _a(function(t, r) {
        return t / r;
      }, 1), av = Bl("floor");
      function sv(t) {
        return t && t.length ? ha(t, on, Ol) : o;
      }
      function lv(t, r) {
        return t && t.length ? ha(t, Ce(r, 2), Ol) : o;
      }
      function uv(t) {
        return ff(t, on);
      }
      function cv(t, r) {
        return ff(t, Ce(r, 2));
      }
      function fv(t) {
        return t && t.length ? ha(t, on, $l) : o;
      }
      function dv(t, r) {
        return t && t.length ? ha(t, Ce(r, 2), $l) : o;
      }
      var pv = _a(function(t, r) {
        return t * r;
      }, 1), hv = Bl("round"), gv = _a(function(t, r) {
        return t - r;
      }, 0);
      function mv(t) {
        return t && t.length ? pl(t, on) : 0;
      }
      function vv(t, r) {
        return t && t.length ? pl(t, Ce(r, 2)) : 0;
      }
      return m.after = Lm, m.ary = Dd, m.assign = S5, m.assignIn = Yd, m.assignInWith = Na, m.assignWith = w5, m.at = R5, m.before = Fd, m.bind = Jl, m.bindAll = M8, m.bindKey = kd, m.castArray = Xm, m.chain = Md, m.chunk = a3, m.compact = s3, m.concat = l3, m.cond = N8, m.conforms = j8, m.constant = iu, m.countBy = mm, m.create = $5, m.curry = Ld, m.curryRight = Bd, m.debounce = zd, m.defaults = P5, m.defaultsDeep = I5, m.defer = Bm, m.delay = zm, m.difference = u3, m.differenceBy = c3, m.differenceWith = f3, m.drop = d3, m.dropRight = p3, m.dropRightWhile = h3, m.dropWhile = g3, m.fill = m3, m.filter = ym, m.flatMap = _m, m.flatMapDeep = Em, m.flatMapDepth = Tm, m.flatten = $d, m.flattenDeep = v3, m.flattenDepth = y3, m.flip = Wm, m.flow = F8, m.flowRight = k8, m.fromPairs = b3, m.functions = k5, m.functionsIn = L5, m.groupBy = Cm, m.initial = _3, m.intersection = E3, m.intersectionBy = T3, m.intersectionWith = C3, m.invert = z5, m.invertBy = W5, m.invokeMap = Sm, m.iteratee = au, m.keyBy = wm, m.keys = kt, m.keysIn = rn, m.map = Ra, m.mapKeys = V5, m.mapValues = H5, m.matches = L8, m.matchesProperty = B8, m.memoize = Pa, m.merge = q5, m.mergeWith = Xd, m.method = z8, m.methodOf = W8, m.mixin = su, m.negate = Ia, m.nthArg = V8, m.omit = Z5, m.omitBy = K5, m.once = Um, m.orderBy = Rm, m.over = H8, m.overArgs = Vm, m.overEvery = q8, m.overSome = Z8, m.partial = Ql, m.partialRight = Wd, m.partition = $m, m.pick = G5, m.pickBy = Jd, m.property = ip, m.propertyOf = K8, m.pull = R3, m.pullAll = Id, m.pullAllBy = $3, m.pullAllWith = P3, m.pullAt = I3, m.range = G8, m.rangeRight = Y8, m.rearg = Hm, m.reject = Am, m.remove = A3, m.rest = qm, m.reverse = Yl, m.sampleSize = Nm, m.set = X5, m.setWith = J5, m.shuffle = jm, m.slice = M3, m.sortBy = km, m.sortedUniq = B3, m.sortedUniqBy = z3, m.split = _8, m.spread = Zm, m.tail = W3, m.take = U3, m.takeRight = V3, m.takeRightWhile = H3, m.takeWhile = q3, m.tap = sm, m.throttle = Km, m.thru = wa, m.toArray = Zd, m.toPairs = Qd, m.toPairsIn = ep, m.toPath = tv, m.toPlainObject = Gd, m.transform = Q5, m.unary = Gm, m.union = Z3, m.unionBy = K3, m.unionWith = G3, m.uniq = Y3, m.uniqBy = X3, m.uniqWith = J3, m.unset = e8, m.unzip = Xl, m.unzipWith = Ad, m.update = t8, m.updateWith = n8, m.values = ho, m.valuesIn = r8, m.without = Q3, m.words = rp, m.wrap = Ym, m.xor = em, m.xorBy = tm, m.xorWith = nm, m.zip = rm, m.zipObject = om, m.zipObjectDeep = im, m.zipWith = am, m.entries = Qd, m.entriesIn = ep, m.extend = Yd, m.extendWith = Na, su(m, m), m.add = rv, m.attempt = op, m.camelCase = s8, m.capitalize = tp, m.ceil = ov, m.clamp = o8, m.clone = Jm, m.cloneDeep = e5, m.cloneDeepWith = t5, m.cloneWith = Qm, m.conformsTo = n5, m.deburr = np, m.defaultTo = D8, m.divide = iv, m.endsWith = l8, m.eq = Bn, m.escape = u8, m.escapeRegExp = c8, m.every = vm, m.find = bm, m.findIndex = wd, m.findKey = A5, m.findLast = xm, m.findLastIndex = Rd, m.findLastKey = M5, m.floor = av, m.forEach = Nd, m.forEachRight = jd, m.forIn = N5, m.forInRight = j5, m.forOwn = D5, m.forOwnRight = F5, m.get = nu, m.gt = r5, m.gte = o5, m.has = B5, m.hasIn = ru, m.head = Pd, m.identity = on, m.includes = Om, m.indexOf = x3, m.inRange = i8, m.invoke = U5, m.isArguments = Fr, m.isArray = Me, m.isArrayBuffer = i5, m.isArrayLike = nn, m.isArrayLikeObject = wt, m.isBoolean = a5, m.isBuffer = Er, m.isDate = s5, m.isElement = l5, m.isEmpty = u5, m.isEqual = c5, m.isEqualWith = f5, m.isError = eu, m.isFinite = d5, m.isFunction = ar, m.isInteger = Ud, m.isLength = Aa, m.isMap = Vd, m.isMatch = p5, m.isMatchWith = h5, m.isNaN = g5, m.isNative = m5, m.isNil = y5, m.isNull = v5, m.isNumber = Hd, m.isObject = vt, m.isObjectLike = Et, m.isPlainObject = ui, m.isRegExp = tu, m.isSafeInteger = b5, m.isSet = qd, m.isString = Ma, m.isSymbol = dn, m.isTypedArray = po, m.isUndefined = x5, m.isWeakMap = _5, m.isWeakSet = E5, m.join = O3, m.kebabCase = f8, m.last = Pn, m.lastIndexOf = S3, m.lowerCase = d8, m.lowerFirst = p8, m.lt = T5, m.lte = C5, m.max = sv, m.maxBy = lv, m.mean = uv, m.meanBy = cv, m.min = fv, m.minBy = dv, m.stubArray = uu, m.stubFalse = cu, m.stubObject = X8, m.stubString = J8, m.stubTrue = Q8, m.multiply = pv, m.nth = w3, m.noConflict = U8, m.noop = lu, m.now = $a, m.pad = h8, m.padEnd = g8, m.padStart = m8, m.parseInt = v8, m.random = a8, m.reduce = Pm, m.reduceRight = Im, m.repeat = y8, m.replace = b8, m.result = Y5, m.round = hv, m.runInContext = D, m.sample = Mm, m.size = Dm, m.snakeCase = x8, m.some = Fm, m.sortedIndex = N3, m.sortedIndexBy = j3, m.sortedIndexOf = D3, m.sortedLastIndex = F3, m.sortedLastIndexBy = k3, m.sortedLastIndexOf = L3, m.startCase = E8, m.startsWith = T8, m.subtract = gv, m.sum = mv, m.sumBy = vv, m.template = C8, m.times = ev, m.toFinite = sr, m.toInteger = je, m.toLength = Kd, m.toLower = O8, m.toNumber = In, m.toSafeInteger = O5, m.toString = Xe, m.toUpper = S8, m.trim = w8, m.trimEnd = R8, m.trimStart = $8, m.truncate = P8, m.unescape = I8, m.uniqueId = nv, m.upperCase = A8, m.upperFirst = ou, m.each = Nd, m.eachRight = jd, m.first = Pd, su(m, function() {
        var t = {};
        return Un(m, function(r, s) {
          rt.call(m.prototype, s) || (t[s] = r);
        }), t;
      }(), { chain: !1 }), m.VERSION = a, On(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
        m[t].placeholder = m;
      }), On(["drop", "take"], function(t, r) {
        Ve.prototype[t] = function(s) {
          s = s === o ? 1 : jt(je(s), 0);
          var c = this.__filtered__ && !r ? new Ve(this) : this.clone();
          return c.__filtered__ ? c.__takeCount__ = Kt(s, c.__takeCount__) : c.__views__.push({
            size: Kt(s, Y),
            type: t + (c.__dir__ < 0 ? "Right" : "")
          }), c;
        }, Ve.prototype[t + "Right"] = function(s) {
          return this.reverse()[t](s).reverse();
        };
      }), On(["filter", "map", "takeWhile"], function(t, r) {
        var s = r + 1, c = s == Q || s == te;
        Ve.prototype[t] = function(p) {
          var y = this.clone();
          return y.__iteratees__.push({
            iteratee: Ce(p, 3),
            type: s
          }), y.__filtered__ = y.__filtered__ || c, y;
        };
      }), On(["head", "last"], function(t, r) {
        var s = "take" + (r ? "Right" : "");
        Ve.prototype[t] = function() {
          return this[s](1).value()[0];
        };
      }), On(["initial", "tail"], function(t, r) {
        var s = "drop" + (r ? "" : "Right");
        Ve.prototype[t] = function() {
          return this.__filtered__ ? new Ve(this) : this[s](1);
        };
      }), Ve.prototype.compact = function() {
        return this.filter(on);
      }, Ve.prototype.find = function(t) {
        return this.filter(t).head();
      }, Ve.prototype.findLast = function(t) {
        return this.reverse().find(t);
      }, Ve.prototype.invokeMap = ke(function(t, r) {
        return typeof t == "function" ? new Ve(this) : this.map(function(s) {
          return ri(s, t, r);
        });
      }), Ve.prototype.reject = function(t) {
        return this.filter(Ia(Ce(t)));
      }, Ve.prototype.slice = function(t, r) {
        t = je(t);
        var s = this;
        return s.__filtered__ && (t > 0 || r < 0) ? new Ve(s) : (t < 0 ? s = s.takeRight(-t) : t && (s = s.drop(t)), r !== o && (r = je(r), s = r < 0 ? s.dropRight(-r) : s.take(r - t)), s);
      }, Ve.prototype.takeRightWhile = function(t) {
        return this.reverse().takeWhile(t).reverse();
      }, Ve.prototype.toArray = function() {
        return this.take(Y);
      }, Un(Ve.prototype, function(t, r) {
        var s = /^(?:filter|find|map|reject)|While$/.test(r), c = /^(?:head|last)$/.test(r), p = m[c ? "take" + (r == "last" ? "Right" : "") : r], y = c || /^find/.test(r);
        p && (m.prototype[r] = function() {
          var T = this.__wrapped__, R = c ? [1] : arguments, F = T instanceof Ve, U = R[0], V = F || Me(T), q = function(We) {
            var qe = p.apply(m, gr([We], R));
            return c && se ? qe[0] : qe;
          };
          V && s && typeof U == "function" && U.length != 1 && (F = V = !1);
          var se = this.__chain__, ve = !!this.__actions__.length, Oe = y && !se, De = F && !ve;
          if (!y && V) {
            T = De ? T : new Ve(this);
            var Se = t.apply(T, R);
            return Se.__actions__.push({ func: wa, args: [q], thisArg: o }), new wn(Se, se);
          }
          return Oe && De ? t.apply(this, R) : (Se = this.thru(q), Oe ? c ? Se.value()[0] : Se.value() : Se);
        });
      }), On(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
        var r = Qi[t], s = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", c = /^(?:pop|shift)$/.test(t);
        m.prototype[t] = function() {
          var p = arguments;
          if (c && !this.__chain__) {
            var y = this.value();
            return r.apply(Me(y) ? y : [], p);
          }
          return this[s](function(T) {
            return r.apply(Me(T) ? T : [], p);
          });
        };
      }), Un(Ve.prototype, function(t, r) {
        var s = m[r];
        if (s) {
          var c = s.name + "";
          rt.call(so, c) || (so[c] = []), so[c].push({ name: r, func: s });
        }
      }), so[xa(o, $).name] = [{
        name: "wrapper",
        func: o
      }], Ve.prototype.clone = I4, Ve.prototype.reverse = A4, Ve.prototype.value = M4, m.prototype.at = lm, m.prototype.chain = um, m.prototype.commit = cm, m.prototype.next = fm, m.prototype.plant = pm, m.prototype.reverse = hm, m.prototype.toJSON = m.prototype.valueOf = m.prototype.value = gm, m.prototype.first = m.prototype.head, Yo && (m.prototype[Yo] = dm), m;
    }, oo = c4();
    $r ? (($r.exports = oo)._ = oo, al._ = oo) : Wt._ = oo;
  }).call(ur);
})(ns, ns.exports);
var mx = ns.exports;
const Ur = /* @__PURE__ */ gs(mx);
function qu(e, n) {
  if (Ur.isArray(e))
    return e.map((o) => qu(o, n));
  if (Ur.isObject(e)) {
    let o = Ur.omit(e, n);
    return o = Ur.mapValues(
      o,
      (a) => qu(a, n)
    ), o;
  } else
    return e;
}
const lh = r0(null);
function No() {
  const e = o0(lh);
  if (!e)
    throw new Error(
      "useCredentialRequestsEditor must be used within a CredentialRequestsEditorProvider"
    );
  return e;
}
function vx(e) {
  const n = Sv({
    defaultValues: { credentialRequests: e.credentialRequests }
  });
  return Ri(() => {
    const o = sh((l, { name: u, type: f }) => {
      if (l.credentialRequests) {
        const d = l.credentialRequests.filter(
          (h) => !!(h != null && h.type)
        );
        e.onChange(
          qu(d, [
            "isNew",
            "id"
          ])
        );
      }
    }, 100);
    return n.watch(o).unsubscribe;
  }, [n.watch]), /* @__PURE__ */ v.jsx(wv, { ...n, children: /* @__PURE__ */ v.jsx(
    lh.Provider,
    {
      value: {
        addButtonText: e.addButtonText,
        schemas: e.schemas,
        features: e.features
      },
      children: e.children
    }
  ) });
}
var Zn = /* @__PURE__ */ ((e) => (e.YES = "yes", e.NO = "no", e.IF_AVAILABLE = "if_available", e))(Zn || {});
const yx = (e) => Object.prototype.hasOwnProperty.call(e || {}, "anyOf") || Object.prototype.hasOwnProperty.call(e || {}, "allOf");
function uh(e, n = [], o = []) {
  return Ur.forOwn(e, (a, l) => {
    (l === "$ref" && typeof a == "string" || l === "$id" && typeof a == "string" && Ur.some(o, (u) => ["allOf", "anyOf", "oneOf"].includes(u))) && n.push(a), Ur.isObject(a) && uh(a, n, [...o, l]);
  }), n;
}
function _c(e, n) {
  const o = n[e];
  return yx(o) ? {
    type: e,
    mandatory: Zn.NO,
    description: "",
    allowUserInput: !0,
    multi: !1,
    children: uh(o).map(
      (l) => _c(l, n)
    )
  } : {
    type: e,
    mandatory: Zn.NO,
    description: "",
    allowUserInput: !0,
    // We want to default to true if is email credential.
    multi: e === "EmailCredential"
  };
}
const ch = r0(null), jo = () => o0(ch);
function bx({
  children: e,
  ...n
}) {
  return /* @__PURE__ */ v.jsx(ch.Provider, { value: n, children: e });
}
function xx(e) {
  return /* @__PURE__ */ v.jsxs("span", { children: [
    e.children,
    /* @__PURE__ */ v.jsx(an, { component: "span", color: "error.main", sx: { ml: 0.5 }, children: "*" })
  ] });
}
const _x = /([A-Z][a-z0-9]+)/gm, fh = (e) => e.split(_x).map((n) => n === "Id" ? "ID" : n === "Zip" ? "ZIP" : n === "Ssn" ? "SSN" : n).filter((n) => n !== "Credential").join(" ");
function dh({ children: e }) {
  return /* @__PURE__ */ v.jsx($v, { title: e, arrow: !0, enterTouchDelay: 0, children: /* @__PURE__ */ v.jsx(
    Xa,
    {
      size: "small",
      onClick: (n) => {
        n.stopPropagation();
      },
      children: /* @__PURE__ */ v.jsx(qv, {})
    }
  ) });
}
function Li(e) {
  const { children: n, title: o, description: a, tip: l, sx: u } = e;
  return /* @__PURE__ */ v.jsxs(Ht, { sx: u, children: [
    /* @__PURE__ */ v.jsxs(Ht, { direction: "row", alignItems: "center", spacing: 0.5, children: [
      /* @__PURE__ */ v.jsx(
        cr,
        {
          variant: "body1",
          sx: { fontSize: "16px", fontWeight: "700" },
          "data-testid": "custom-demo-dialog-data-field-title",
          children: o
        }
      ),
      /* @__PURE__ */ v.jsx(dh, { children: l })
    ] }),
    a && /* @__PURE__ */ v.jsx(
      cr,
      {
        variant: "body2",
        color: "text.secondary",
        sx: {
          textAlign: "left !important",
          fontSize: "12px",
          fontWeight: "400"
        },
        "data-testid": "custom-demo-dialog-data-field-description",
        children: a
      }
    ),
    /* @__PURE__ */ v.jsx(Ht, { sx: { mt: 3 }, children: n })
  ] });
}
function Ex() {
  const e = jo(), n = Ro({
    name: `${e == null ? void 0 : e.path}`
  }), { schemas: o } = No(), a = qr(() => o ? Object.values(o).map((u) => ({
    label: fh(u.$id),
    id: u.$id
  })).filter((u) => !["IdentityCredential"].includes(u.id)).sort((u, f) => u.label < f.label ? -1 : 1) : [], [o]), l = qr(() => {
    var f, d;
    const u = (d = (f = n.field) == null ? void 0 : f.value) == null ? void 0 : d.type;
    return a == null ? void 0 : a.find((h) => h.id === u);
  }, [n, a]);
  return /* @__PURE__ */ v.jsx(
    Li,
    {
      title: "Field Type",
      description: "What type of user data this field is for",
      tip: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsx("pre", { children: "POST /1-click" }),
        /* @__PURE__ */ v.jsx("pre", { children: `{
  type: string
}` })
      ] }),
      children: /* @__PURE__ */ v.jsx(
        s0,
        {
          value: l,
          onChange: (u, f) => {
            f && (e == null || e.fieldArray.update(
              e == null ? void 0 : e.index,
              _c(f.id, o)
            ));
          },
          options: a,
          disablePortal: !0,
          renderInput: (u) => /* @__PURE__ */ v.jsx(
            Zr,
            {
              ...u,
              label: "Type",
              color: "success",
              size: "small",
              className: "original",
              fullWidth: !0,
              inputProps: {
                ...u.inputProps,
                "data-testid": "custom-demo-dialog-data-field-type-input"
              },
              placeholder: "Choose a type..."
            }
          ),
          disabled: ((e == null ? void 0 : e.level) ?? 0) > 0 || o === null
        }
      )
    },
    JSON.stringify(l)
  );
}
function Tx() {
  var h, g;
  const { features: e } = No(), n = ((h = e == null ? void 0 : e.description) == null ? void 0 : h.disabled) === !0, o = jo(), a = Ro({
    name: `${o == null ? void 0 : o.path}.description`
  }), [l, u] = jn(a.field.value ?? ""), f = Vr(
    sh((b) => {
      a.field.onChange({ target: { value: b } });
    }, 500)
  ).current, d = (b) => {
    n || (u(b.target.value), f(b.target.value));
  };
  return /* @__PURE__ */ v.jsx(
    Li,
    {
      title: "Field Description",
      description: "What text appears under the field",
      tip: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsx("pre", { children: "POST /1-click" }),
        /* @__PURE__ */ v.jsx("pre", { children: `{
  description?: string
}` })
      ] }),
      sx: {
        opacity: n ? 0.5 : 1
      },
      children: /* @__PURE__ */ v.jsx(
        Zr,
        {
          ...a.field,
          value: l,
          onChange: d,
          error: !!a.fieldState.error,
          helperText: ((g = a.fieldState.error) == null ? void 0 : g.message) ?? "Optional — defaults to empty",
          label: "Description",
          color: "success",
          size: "small",
          className: "original",
          inputProps: {
            "data-testid": "custom-demo-dialog-data-field-description-input"
          },
          disabled: n
        }
      )
    }
  );
}
function Hr(e) {
  const { isDefault: n, title: o, description: a, tip: l, sx: u, ...f } = e;
  return /* @__PURE__ */ v.jsxs(
    Ht,
    {
      direction: "row",
      justifyContent: "space-between",
      alignItems: "center",
      sx: { mb: 1, ...u },
      children: [
        /* @__PURE__ */ v.jsx(Ht, { sx: { alignItems: "flex-start" }, children: /* @__PURE__ */ v.jsxs(Ht, { direction: "row", spacing: 1, children: [
          /* @__PURE__ */ v.jsx(
            Pv,
            {
              ...f,
              sx: {
                mt: "1px",
                width: 34,
                height: 34,
                ...u,
                "&.Mui-checked": {
                  color: "#0dbc3d"
                }
              }
            }
          ),
          /* @__PURE__ */ v.jsxs(Ht, { children: [
            /* @__PURE__ */ v.jsxs(Ht, { direction: "row", alignItems: "center", spacing: 1, children: [
              /* @__PURE__ */ v.jsx(
                cr,
                {
                  variant: "body1",
                  sx: {
                    fontSize: "16px",
                    fontWeight: "400",
                    textAlign: "left !important"
                  },
                  children: o
                }
              ),
              /* @__PURE__ */ v.jsx(dh, { children: l })
            ] }),
            a && /* @__PURE__ */ v.jsx(
              cr,
              {
                variant: "body2",
                color: "text.disabled",
                sx: {
                  textAlign: "left !important",
                  alignSelf: "flex-start",
                  fontSize: "12px",
                  fontWeight: "400",
                  mt: 0.5
                },
                children: a
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ v.jsx(an, { sx: { mt: 1, alignSelf: "flex-start" }, children: n && /* @__PURE__ */ v.jsx(
          Iv,
          {
            size: "small",
            label: "Default",
            color: "info",
            variant: "outlined",
            sx: { fontWeight: 700 }
          }
        ) })
      ]
    }
  );
}
function Cx() {
  var l;
  const { features: e } = No(), n = ((l = e == null ? void 0 : e.mandatory) == null ? void 0 : l.disabled) === !0, o = jo(), a = Ro({
    name: `${o == null ? void 0 : o.path}.mandatory`
  });
  return /* @__PURE__ */ v.jsx(
    Li,
    {
      title: "Optional or Required",
      description: "Whether it's optional or required for the user to share this data",
      tip: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsx("pre", { children: "POST /1-click" }),
        /* @__PURE__ */ v.jsx("pre", { children: `{
  mandatory?: enum
}` })
      ] }),
      sx: {
        opacity: n ? 0.5 : 1
      },
      children: /* @__PURE__ */ v.jsxs(
        Qu,
        {
          value: a.field.value,
          onChange: (u) => {
            if (n) return;
            const f = u.target.value;
            a.field.onChange({ target: { value: f } });
          },
          children: [
            /* @__PURE__ */ v.jsx(
              Hr,
              {
                isDefault: !0,
                value: Zn.NO,
                title: "Optional",
                description: "Optional for the user to share",
                tip: Zn.NO,
                inputProps: {
                  "data-testid": "custom-demo-dialog-mandatory-no-radio"
                },
                disabled: n
              }
            ),
            /* @__PURE__ */ v.jsx(
              Hr,
              {
                value: Zn.IF_AVAILABLE,
                title: "Required if available",
                description: "Required to share, if the user has it",
                tip: Zn.IF_AVAILABLE,
                inputProps: {
                  "data-testid": "custom-demo-dialog-mandatory-if_available-radio"
                },
                disabled: n
              }
            ),
            /* @__PURE__ */ v.jsx(
              Hr,
              {
                value: Zn.YES,
                title: "Required",
                description: "Required — flow fails if user doesn't have it",
                tip: Zn.YES,
                inputProps: {
                  "data-testid": "custom-demo-dialog-mandatory-yes-radio"
                },
                disabled: n
              }
            )
          ]
        }
      )
    }
  );
}
function Ox() {
  var l;
  const { features: e } = No(), n = ((l = e == null ? void 0 : e.description) == null ? void 0 : l.disabled) === !0, o = jo(), a = Ro({
    name: `${o == null ? void 0 : o.path}.allowUserInput`
  });
  return /* @__PURE__ */ v.jsx(
    Li,
    {
      title: "Allow User Input",
      description: "Whether the user is allowed to add or edit data for this field",
      tip: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsx("pre", { children: "POST /1-click" }),
        /* @__PURE__ */ v.jsx("pre", { children: `{
  allowUserInput?: boolean
}` })
      ] }),
      sx: {
        opacity: n ? 0.5 : 1
      },
      children: /* @__PURE__ */ v.jsxs(
        Qu,
        {
          value: a.field.value,
          onChange: (u, f) => {
            n || a.field.onChange({
              target: { value: f === "true" }
            });
          },
          children: [
            /* @__PURE__ */ v.jsx(
              Hr,
              {
                isDefault: !0,
                value: !0,
                title: "Yes",
                description: "The user can add or edit data for the user to share",
                tip: "true",
                inputProps: {
                  "data-testid": "custom-demo-dialog-user-input-yes-radio"
                },
                disabled: n
              }
            ),
            /* @__PURE__ */ v.jsx(
              Hr,
              {
                value: !1,
                title: "No",
                description: "The user can't add or edit data",
                tip: "false",
                inputProps: {
                  "data-testid": "custom-demo-dialog-user-input-no-radio"
                },
                disabled: n
              }
            )
          ]
        }
      )
    }
  );
}
const n1 = {
  minHeight: 20,
  mt: 2,
  py: 1,
  px: 1.25,
  fontWeight: "800",
  fontSize: "13px"
};
function Sx({
  open: e,
  onClose: n,
  onConfirm: o
}) {
  return /* @__PURE__ */ v.jsxs(Av, { open: e, onClose: n, children: [
    /* @__PURE__ */ v.jsx(Mv, { children: "Delete Data Field?" }),
    /* @__PURE__ */ v.jsx(Nv, { children: /* @__PURE__ */ v.jsx(cr, { children: "Are you sure you want to delete this data field?" }) }),
    /* @__PURE__ */ v.jsxs(jv, { sx: { justifyContent: "space-between" }, children: [
      /* @__PURE__ */ v.jsx(
        Hu,
        {
          variant: "text",
          color: "neutral",
          size: "small",
          onClick: n,
          sx: n1,
          "data-testid": "custom-demo-dialog-data-field-delete-cancel-button",
          children: "Don't Delete"
        }
      ),
      /* @__PURE__ */ v.jsx(
        Hu,
        {
          variant: "contained",
          color: "error",
          size: "small",
          onClick: o,
          sx: n1,
          "data-testid": "custom-demo-dialog-data-field-delete-confirm-button",
          children: "Delete"
        }
      )
    ] })
  ] });
}
function wx() {
  var l;
  const { features: e } = No(), n = ((l = e == null ? void 0 : e.multi) == null ? void 0 : l.disabled) === !0, o = jo(), a = Ro({
    name: `${o == null ? void 0 : o.path}.multi`
  });
  return ((o == null ? void 0 : o.level) ?? 0) > 0 ? null : /* @__PURE__ */ v.jsx(
    Li,
    {
      title: "Multiple Values",
      description: "Whether multiple data values should be included if available",
      tip: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
        /* @__PURE__ */ v.jsx("pre", { children: "POST /1-click" }),
        /* @__PURE__ */ v.jsx("pre", { children: `{
  multi?: boolean
}` })
      ] }),
      sx: {
        opacity: n ? 0.5 : 1
      },
      children: /* @__PURE__ */ v.jsxs(
        Qu,
        {
          value: a.field.value ?? !1,
          onChange: (u, f) => {
            n || a.field.onChange({
              target: { value: f === "true" }
            });
          },
          children: [
            /* @__PURE__ */ v.jsx(
              Hr,
              {
                value: !0,
                title: "Yes",
                description: "Multiple values will be included if available",
                tip: "true",
                inputProps: {
                  "data-testid": "custom-demo-dialog-multi-yes-radio"
                },
                disabled: n
              }
            ),
            /* @__PURE__ */ v.jsx(
              Hr,
              {
                isDefault: !0,
                value: !1,
                title: "No",
                description: "Multiple values won't be included",
                tip: "false",
                inputProps: {
                  "data-testid": "custom-demo-dialog-multi-no-radio"
                },
                disabled: n
              }
            )
          ]
        }
      )
    }
  );
}
function Rx(e) {
  const { defaultExpanded: n } = e, o = jo(), a = a0(), u = Ro({
    name: `${o == null ? void 0 : o.path}`
  }).field.value, f = a.watch("credentialRequests"), d = (o == null ? void 0 : o.field).isNew, [h, g] = jn((n ?? d) || !1), [b, x] = jn(!1), _ = Vr(null), P = String(o == null ? void 0 : o.field.type), S = fh(P || "Choose a type..."), C = ec(), E = "chevron", $ = Kn(
    (G) => {
      const ie = G, ae = o;
      if (!ie || !ae) return !1;
      const ee = (Y) => Y.split(".").slice(0, -2).join("."), Q = ee((ie == null ? void 0 : ie.path) ?? ""), ne = ee((ae == null ? void 0 : ae.path) ?? ""), te = Q === ne, oe = ie.level, X = ie.index, Pe = ae.level, W = ae.index;
      return !(oe !== Pe || X === W || !te);
    },
    [o]
  ), [{ opacity: N }, A, M] = Qv(
    () => ({
      type: "data-field-drag",
      item: () => o,
      collect: (G) => ({
        opacity: G.isDragging() ? 0 : 1
      })
    }),
    [o, f]
  ), [{ opacity: O }, k] = e6(
    () => ({
      accept: "data-field-drag",
      canDrop(G) {
        return $(G);
      },
      drop(G) {
        const ie = G, ae = o;
        if (!ie || !ae || !$(ie)) return;
        const ee = ie.index, Q = ae.index;
        o.fieldArray.move(ee, Q);
      },
      collect: (G) => G.isOver() ? {
        opacity: G.canDrop() ? 0.4 : 1
      } : {
        opacity: 1
      }
    }),
    [o, f]
  ), L = () => {
    if (o) {
      if (x(!1), o.fieldArray.fields.length <= 1) {
        o.onAllFieldsDelete();
        return;
      }
      o.fieldArray.remove(o.index);
    }
  }, J = () => {
    const G = {
      fontStyle: P ? "normal" : "italic",
      fontSize: "16px",
      fontWeight: "800",
      textAlign: "left !important",
      alignSelf: "flex-start"
    };
    return /* @__PURE__ */ v.jsx(cr, { variant: "body1", sx: G, children: u.mandatory !== Zn.NO ? /* @__PURE__ */ v.jsx(xx, { children: S }) : S });
  }, le = () => {
    const G = u.allowUserInput;
    return /* @__PURE__ */ v.jsxs(Ht, { direction: "row", alignItems: "center", spacing: 0.5, pl: 5.25, children: [
      G ? /* @__PURE__ */ v.jsx(
        Yv,
        {
          sx: { fontSize: "12px", color: C.palette.text.disabled }
        }
      ) : /* @__PURE__ */ v.jsx(
        u0,
        {
          sx: { fontSize: "12px", color: C.palette.text.disabled }
        }
      ),
      /* @__PURE__ */ v.jsx(
        cr,
        {
          variant: "body1",
          color: "text.disabled",
          sx: {
            fontSize: "12px",
            fontWeight: "400",
            alignSelf: "flex-start",
            textAlign: "left!important"
          },
          children: "Allow User Input"
        }
      )
    ] });
  };
  return Ri(() => {
    var G;
    d && ((G = _.current) == null || G.scrollIntoView({ behavior: "smooth" }));
  }, [d]), /* @__PURE__ */ v.jsxs(
    Ht,
    {
      ref: k,
      sx: { position: "relative", width: "100%", opacity: O },
      children: [
        /* @__PURE__ */ v.jsx(
          Dv,
          {
            ref: (G) => M(G),
            sx: {
              p: "0!important",
              width: `calc(100% - ${((o == null ? void 0 : o.level) ?? 0) * 30}px)!important`,
              alignSelf: "flex-end",
              opacity: N
            },
            children: /* @__PURE__ */ v.jsx(an, { children: /* @__PURE__ */ v.jsxs(
              Fv,
              {
                defaultExpanded: d,
                expanded: h,
                sx: {
                  boxShadow: "none",
                  "&::before": {
                    display: "none"
                  },
                  my: "0px !important",
                  mt: 0,
                  p: "8px !important"
                },
                "data-testid": "custom-demo-dialog-data-field-accordion",
                children: [
                  /* @__PURE__ */ v.jsx(
                    kv,
                    {
                      onClick: () => {
                        g((G) => !G);
                      },
                      expandIcon: /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
                        /* @__PURE__ */ v.jsx(
                          Xa,
                          {
                            size: "small",
                            onClick: (G) => {
                              G.stopPropagation(), x(!0);
                            },
                            "data-testid": "custom-demo-dialog-data-field-delete-button",
                            children: /* @__PURE__ */ v.jsx(
                              Zv,
                              {
                                fontSize: "small",
                                sx: {
                                  transform: "rotate(0deg)"
                                }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ v.jsx(
                          Ht,
                          {
                            className: E,
                            sx: { ml: 1, alignSelf: "center" },
                            children: /* @__PURE__ */ v.jsx(
                              Kv,
                              {
                                fontSize: "small",
                                sx: {
                                  color: "#0dbc3d",
                                  transform: "rotate(0deg)"
                                }
                              }
                            )
                          }
                        )
                      ] }),
                      sx: {
                        px: 0,
                        minHeight: "auto!important",
                        "& .MuiAccordionSummary-content": {
                          my: "0px !important"
                        },
                        "& .MuiAccordionSummary-expandIconWrapper": {
                          alignSelf: "flex-start",
                          transform: "rotate(0deg) !important",
                          [`& .${E}`]: {
                            transition: "transform .3s"
                          },
                          "&.Mui-expanded": {
                            [`& .${E}`]: {
                              transform: "rotate(-90deg)"
                            }
                          }
                        }
                      },
                      children: /* @__PURE__ */ v.jsx(Ht, { sx: { alignItems: "flex-start", mr: 0.5 }, children: /* @__PURE__ */ v.jsxs(Ht, { direction: "column", alignItems: "flex-start", spacing: 0, children: [
                        /* @__PURE__ */ v.jsxs(Ht, { direction: "row", alignItems: "center", spacing: 1, children: [
                          /* @__PURE__ */ v.jsx(
                            Xa,
                            {
                              ref: A,
                              size: "small",
                              color: "success",
                              onClick: (G) => {
                                G.preventDefault(), G.stopPropagation();
                              },
                              sx: { cursor: "grab" },
                              children: /* @__PURE__ */ v.jsx(Gv, {})
                            }
                          ),
                          J()
                        ] }),
                        le()
                      ] }) })
                    }
                  ),
                  /* @__PURE__ */ v.jsx(Lv, { sx: { pt: 3 }, children: h && /* @__PURE__ */ v.jsxs(Ht, { spacing: 2, children: [
                    /* @__PURE__ */ v.jsx(Ex, {}),
                    /* @__PURE__ */ v.jsx(Tx, {}),
                    /* @__PURE__ */ v.jsx(Cx, {}),
                    /* @__PURE__ */ v.jsx(Ox, {}),
                    /* @__PURE__ */ v.jsx(wx, {})
                  ] }) })
                ]
              }
            ) })
          }
        ),
        /* @__PURE__ */ v.jsx(
          Sx,
          {
            open: b,
            onClose: () => {
              x(!1);
            },
            onConfirm: L
          }
        )
      ]
    }
  );
}
function ph({
  path: e = "credentialRequests",
  parentFieldArray: n,
  parentIndex: o = 0,
  level: a = 0
}) {
  const l = No(), u = a0(), f = Rv({
    control: u.control,
    name: e
  });
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    f.fields.map((d, h) => {
      const g = `${e}.${h}`;
      return /* @__PURE__ */ v.jsxs(
        bx,
        {
          path: g,
          field: d,
          fieldArray: f,
          index: h,
          level: a,
          onAllFieldsDelete: () => {
            var b;
            (b = n ?? f) == null || b.remove(o);
          },
          children: [
            /* @__PURE__ */ v.jsx(Rx, {}),
            Array.isArray(d.children) && /* @__PURE__ */ v.jsx(
              ph,
              {
                path: `${g}.children`,
                parentFieldArray: f,
                parentIndex: h,
                level: a + 1
              },
              `${g}.children`
            )
          ]
        },
        g + d.type
      );
    }),
    e === "credentialRequests" && /* @__PURE__ */ v.jsx(
      Hu,
      {
        type: "button",
        onClick: () => {
          if (!l) return;
          const d = {
            ..._c("", l.schemas),
            isNew: !0
          };
          f.append(d);
        },
        size: "large",
        variant: "outlined",
        startIcon: /* @__PURE__ */ v.jsx(Xv, {}),
        fullWidth: !0,
        sx: { width: "100%" },
        children: l.addButtonText ?? "Add Credential Request"
      }
    )
  ] });
}
function $x() {
  return /* @__PURE__ */ v.jsx(t6, { backend: n6, children: /* @__PURE__ */ v.jsx(Ht, { spacing: 2, children: /* @__PURE__ */ v.jsx(ph, {}) }) });
}
function OA(e) {
  return /* @__PURE__ */ v.jsx(vx, { ...e, children: /* @__PURE__ */ v.jsx($x, {}) });
}
const Px = ({ sx: e, ...n }) => /* @__PURE__ */ v.jsx(
  Bv,
  {
    target: "_blank",
    ...n,
    color: "primary",
    sx: {
      ...e
    },
    children: n.children
  }
), SA = ({
  legalLinkUrl: e = "https://www.verified.inc/legal#terms-of-use"
}) => {
  const n = ec();
  return /* @__PURE__ */ v.jsx(an, { display: "inline-block", children: /* @__PURE__ */ v.jsxs(
    cr,
    {
      align: "center",
      sx: {
        fontSize: ".75rem",
        fontWeight: 400,
        color: n.palette.neutral.main,
        lineHeight: 1.25
      },
      children: [
        "By continuing, you agree to Verified’s",
        " ",
        /* @__PURE__ */ v.jsx(Px, { href: e, children: "Terms of Use" }),
        "."
      ]
    }
  ) });
};
function wA({
  value: e,
  children: n
}) {
  return e ? typeof n == "function" ? /* @__PURE__ */ v.jsx(v.Fragment, { children: n(e) }) : /* @__PURE__ */ v.jsx(v.Fragment, { children: n }) : null;
}
function Ix(e) {
  return bt;
}
function rs(e) {
  return typeof e == "string";
}
function hh(e, n, o) {
  return e === void 0 || rs(e) ? n : I({}, n, {
    ownerState: I({}, n.ownerState, o)
  });
}
function gh(e, n = []) {
  if (e === void 0)
    return {};
  const o = {};
  return Object.keys(e).filter((a) => a.match(/^on[A-Z]/) && typeof e[a] == "function" && !n.includes(a)).forEach((a) => {
    o[a] = e[a];
  }), o;
}
function mh(e, n, o) {
  return typeof e == "function" ? e(n, o) : e;
}
function r1(e) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((o) => !(o.match(/^on[A-Z]/) && typeof e[o] == "function")).forEach((o) => {
    n[o] = e[o];
  }), n;
}
function vh(e) {
  const {
    getSlotProps: n,
    additionalProps: o,
    externalSlotProps: a,
    externalForwardedProps: l,
    className: u
  } = e;
  if (!n) {
    const P = He(o == null ? void 0 : o.className, u, l == null ? void 0 : l.className, a == null ? void 0 : a.className), S = I({}, o == null ? void 0 : o.style, l == null ? void 0 : l.style, a == null ? void 0 : a.style), C = I({}, o, l, a);
    return P.length > 0 && (C.className = P), Object.keys(S).length > 0 && (C.style = S), {
      props: C,
      internalRef: void 0
    };
  }
  const f = gh(I({}, l, a)), d = r1(a), h = r1(l), g = n(f), b = He(g == null ? void 0 : g.className, o == null ? void 0 : o.className, u, l == null ? void 0 : l.className, a == null ? void 0 : a.className), x = I({}, g == null ? void 0 : g.style, o == null ? void 0 : o.style, l == null ? void 0 : l.style, a == null ? void 0 : a.style), _ = I({}, g, o, h, d);
  return b.length > 0 && (_.className = b), Object.keys(x).length > 0 && (_.style = x), {
    props: _,
    internalRef: g.ref
  };
}
const Ax = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function So(e) {
  var n;
  const {
    elementType: o,
    externalSlotProps: a,
    ownerState: l,
    skipResolvingSlotProps: u = !1
  } = e, f = $e(e, Ax), d = u ? {} : mh(a, l), {
    props: h,
    internalRef: g
  } = vh(I({}, f, {
    externalSlotProps: d
  })), b = en(g, d == null ? void 0 : d.ref, (n = e.additionalProps) == null ? void 0 : n.ref);
  return hh(o, I({}, h, {
    ref: b
  }), l);
}
const Mx = ["className", "elementType", "ownerState", "externalForwardedProps", "getSlotOwnerState", "internalForwardedProps"], Nx = ["component", "slots", "slotProps"], jx = ["component"];
function o1(e, n) {
  const {
    className: o,
    elementType: a,
    ownerState: l,
    externalForwardedProps: u,
    getSlotOwnerState: f,
    internalForwardedProps: d
  } = n, h = $e(n, Mx), {
    component: g,
    slots: b = {
      [e]: void 0
    },
    slotProps: x = {
      [e]: void 0
    }
  } = u, _ = $e(u, Nx), P = b[e] || a, S = mh(x[e], l), C = vh(I({
    className: o
  }, h, {
    externalForwardedProps: e === "root" ? _ : void 0,
    externalSlotProps: S
  })), {
    props: {
      component: E
    },
    internalRef: $
  } = C, N = $e(C.props, jx), A = en($, S == null ? void 0 : S.ref, n.ref), M = f ? f(N) : {}, O = I({}, l, M), k = e === "root" ? E || g : E, L = hh(P, I({}, e === "root" && !g && !b[e] && d, e !== "root" && !b[e] && d, N, k && {
    as: k
  }, {
    ref: A
  }), O);
  return Object.keys(M).forEach((J) => {
    delete L[J];
  }), [P, L];
}
const i1 = (e) => {
  let n;
  return e < 1 ? n = 5.11916 * e ** 2 : n = 4.5 * Math.log(e + 1) + 2, (n / 100).toFixed(2);
};
function Ec() {
  const e = mc(Rs);
  return process.env.NODE_ENV !== "production" && j.useDebugValue(e), e[$s] || e;
}
function Dx(e) {
  return ft("MuiPaper", e);
}
ht("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Fx = ["className", "component", "elevation", "square", "variant"], kx = (e) => {
  const {
    square: n,
    elevation: o,
    variant: a,
    classes: l
  } = e, u = {
    root: ["root", a, !n && "rounded", a === "elevation" && `elevation${o}`]
  };
  return yt(u, Dx, l);
}, Lx = Re("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, n[o.variant], !o.square && n.rounded, o.variant === "elevation" && n[`elevation${o.elevation}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var o;
  return I({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !n.square && {
    borderRadius: e.shape.borderRadius
  }, n.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, n.variant === "elevation" && I({
    boxShadow: (e.vars || e).shadows[n.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${Or("#fff", i1(n.elevation))}, ${Or("#fff", i1(n.elevation))})`
  }, e.vars && {
    backgroundImage: (o = e.vars.overlays) == null ? void 0 : o[n.elevation]
  }));
}), Tc = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiPaper"
  }), {
    className: l,
    component: u = "div",
    elevation: f = 1,
    square: d = !1,
    variant: h = "elevation"
  } = a, g = $e(a, Fx), b = I({}, a, {
    component: u,
    elevation: f,
    square: d,
    variant: h
  }), x = kx(b);
  return process.env.NODE_ENV !== "production" && Ec().shadows[f] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${f}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${f}]\` is defined.`].join(`
`)), /* @__PURE__ */ v.jsx(Lx, I({
    as: u,
    ownerState: b,
    className: He(x.root, l),
    ref: o
  }, g));
});
process.env.NODE_ENV !== "production" && (Tc.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Mo(Y0, (e) => {
    const {
      elevation: n,
      variant: o
    } = e;
    return n > 0 && o === "outlined" ? new Error(`MUI: Combining \`elevation={${n}}\` with \`variant="${o}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: i.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: i.oneOfType([i.oneOf(["elevation", "outlined"]), i.string])
});
function Bx(e) {
  return ft("MuiAlert", e);
}
const a1 = ht("MuiAlert", ["root", "action", "icon", "message", "filled", "colorSuccess", "colorInfo", "colorWarning", "colorError", "filledSuccess", "filledInfo", "filledWarning", "filledError", "outlined", "outlinedSuccess", "outlinedInfo", "outlinedWarning", "outlinedError", "standard", "standardSuccess", "standardInfo", "standardWarning", "standardError"]);
function zx(e) {
  return ft("MuiIconButton", e);
}
const Wx = ht("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge"]), Ux = ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"], Vx = (e) => {
  const {
    classes: n,
    disabled: o,
    color: a,
    edge: l,
    size: u
  } = e, f = {
    root: ["root", o && "disabled", a !== "default" && `color${Ne(a)}`, l && `edge${Ne(l)}`, `size${Ne(u)}`]
  };
  return yt(f, zx, n);
}, Hx = Re(xc, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, o.color !== "default" && n[`color${Ne(o.color)}`], o.edge && n[`edge${Ne(o.edge)}`], n[`size${Ne(o.size)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => I({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: e.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  overflow: "visible",
  // Explicitly set the default value to solve a bug on IE11.
  color: (e.vars || e).palette.action.active,
  transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shortest
  })
}, !n.disableRipple && {
  "&:hover": {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Or(e.palette.action.active, e.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  }
}, n.edge === "start" && {
  marginLeft: n.size === "small" ? -3 : -12
}, n.edge === "end" && {
  marginRight: n.size === "small" ? -3 : -12
}), ({
  theme: e,
  ownerState: n
}) => {
  var o;
  const a = (o = (e.vars || e).palette) == null ? void 0 : o[n.color];
  return I({}, n.color === "inherit" && {
    color: "inherit"
  }, n.color !== "inherit" && n.color !== "default" && I({
    color: a == null ? void 0 : a.main
  }, !n.disableRipple && {
    "&:hover": I({}, a && {
      backgroundColor: e.vars ? `rgba(${a.mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Or(a.main, e.palette.action.hoverOpacity)
    }, {
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    })
  }), n.size === "small" && {
    padding: 5,
    fontSize: e.typography.pxToRem(18)
  }, n.size === "large" && {
    padding: 12,
    fontSize: e.typography.pxToRem(28)
  }, {
    [`&.${Wx.disabled}`]: {
      backgroundColor: "transparent",
      color: (e.vars || e).palette.action.disabled
    }
  });
}), yh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiIconButton"
  }), {
    edge: l = !1,
    children: u,
    className: f,
    color: d = "default",
    disabled: h = !1,
    disableFocusRipple: g = !1,
    size: b = "medium"
  } = a, x = $e(a, Ux), _ = I({}, a, {
    edge: l,
    color: d,
    disabled: h,
    disableFocusRipple: g,
    size: b
  }), P = Vx(_);
  return /* @__PURE__ */ v.jsx(Hx, I({
    className: He(P.root, f),
    centerRipple: !0,
    focusRipple: !g,
    disabled: h,
    ref: o
  }, x, {
    ownerState: _,
    children: u
  }));
});
process.env.NODE_ENV !== "production" && (yh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The icon to display.
   */
  children: Mo(i.node, (e) => j.Children.toArray(e.children).some((o) => /* @__PURE__ */ j.isValidElement(o) && o.props.onClick) ? new Error(["MUI: You are providing an onClick event listener to a child of a button element.", "Prefer applying it to the IconButton directly.", "This guarantees that the whole <button> will be responsive to click events."].join(`
`)) : null),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color: i.oneOfType([i.oneOf(["inherit", "default", "primary", "secondary", "error", "info", "success", "warning"]), i.string]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: i.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: i.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: i.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: i.oneOf(["end", "start", !1]),
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: i.oneOfType([i.oneOf(["small", "medium", "large"]), i.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object])
});
function qx(e) {
  return ft("MuiSvgIcon", e);
}
ht("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Zx = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Kx = (e) => {
  const {
    color: n,
    fontSize: o,
    classes: a
  } = e, l = {
    root: ["root", n !== "inherit" && `color${Ne(n)}`, `fontSize${Ne(o)}`]
  };
  return yt(l, qx, a);
}, Gx = Re("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, o.color !== "inherit" && n[`color${Ne(o.color)}`], n[`fontSize${Ne(o.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var o, a, l, u, f, d, h, g, b, x, _, P, S;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // for example heroicons uses fill="none" and stroke="currentColor"
    fill: n.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (o = e.transitions) == null || (a = o.create) == null ? void 0 : a.call(o, "fill", {
      duration: (l = e.transitions) == null || (l = l.duration) == null ? void 0 : l.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((u = e.typography) == null || (f = u.pxToRem) == null ? void 0 : f.call(u, 20)) || "1.25rem",
      medium: ((d = e.typography) == null || (h = d.pxToRem) == null ? void 0 : h.call(d, 24)) || "1.5rem",
      large: ((g = e.typography) == null || (b = g.pxToRem) == null ? void 0 : b.call(g, 35)) || "2.1875rem"
    }[n.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (x = (_ = (e.vars || e).palette) == null || (_ = _[n.color]) == null ? void 0 : _.main) != null ? x : {
      action: (P = (e.vars || e).palette) == null || (P = P.action) == null ? void 0 : P.active,
      disabled: (S = (e.vars || e).palette) == null || (S = S.action) == null ? void 0 : S.disabled,
      inherit: void 0
    }[n.color]
  };
}), os = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiSvgIcon"
  }), {
    children: l,
    className: u,
    color: f = "inherit",
    component: d = "svg",
    fontSize: h = "medium",
    htmlColor: g,
    inheritViewBox: b = !1,
    titleAccess: x,
    viewBox: _ = "0 0 24 24"
  } = a, P = $e(a, Zx), S = /* @__PURE__ */ j.isValidElement(l) && l.type === "svg", C = I({}, a, {
    color: f,
    component: d,
    fontSize: h,
    instanceFontSize: n.fontSize,
    inheritViewBox: b,
    viewBox: _,
    hasSvgAsChild: S
  }), E = {};
  b || (E.viewBox = _);
  const $ = Kx(C);
  return /* @__PURE__ */ v.jsxs(Gx, I({
    as: d,
    className: He($.root, u),
    focusable: "false",
    color: g,
    "aria-hidden": x ? void 0 : !0,
    role: x ? "img" : void 0,
    ref: o
  }, E, P, S && l.props, {
    ownerState: C,
    children: [S ? l.props.children : l, x ? /* @__PURE__ */ v.jsx("title", {
      children: x
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (os.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: i.oneOfType([i.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), i.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: i.oneOfType([i.oneOf(["inherit", "large", "medium", "small"]), i.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: i.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: i.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: i.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: i.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: i.string
});
os.muiName = "SvgIcon";
function Do(e, n) {
  function o(a, l) {
    return /* @__PURE__ */ v.jsx(os, I({
      "data-testid": `${n}Icon`,
      ref: l
    }, a, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (o.displayName = `${n}Icon`), o.muiName = os.muiName, /* @__PURE__ */ j.memo(/* @__PURE__ */ j.forwardRef(o));
}
const Yx = Do(/* @__PURE__ */ v.jsx("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}), "SuccessOutlined"), Xx = Do(/* @__PURE__ */ v.jsx("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}), "ReportProblemOutlined"), Jx = Do(/* @__PURE__ */ v.jsx("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}), "ErrorOutline"), Qx = Do(/* @__PURE__ */ v.jsx("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}), "InfoOutlined"), e_ = Do(/* @__PURE__ */ v.jsx("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close"), t_ = ["action", "children", "className", "closeText", "color", "components", "componentsProps", "icon", "iconMapping", "onClose", "role", "severity", "slotProps", "slots", "variant"], n_ = Ix(), r_ = (e) => {
  const {
    variant: n,
    color: o,
    severity: a,
    classes: l
  } = e, u = {
    root: ["root", `color${Ne(o || a)}`, `${n}${Ne(o || a)}`, `${n}`],
    icon: ["icon"],
    message: ["message"],
    action: ["action"]
  };
  return yt(u, Bx, l);
}, o_ = Re(Tc, {
  name: "MuiAlert",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, n[o.variant], n[`${o.variant}${Ne(o.color || o.severity)}`]];
  }
})(({
  theme: e
}) => {
  const n = e.palette.mode === "light" ? Au : Mu, o = e.palette.mode === "light" ? Mu : Au;
  return I({}, e.typography.body2, {
    backgroundColor: "transparent",
    display: "flex",
    padding: "6px 16px",
    variants: [...Object.entries(e.palette).filter(([, a]) => a.main && a.light).map(([a]) => ({
      props: {
        colorSeverity: a,
        variant: "standard"
      },
      style: {
        color: e.vars ? e.vars.palette.Alert[`${a}Color`] : n(e.palette[a].light, 0.6),
        backgroundColor: e.vars ? e.vars.palette.Alert[`${a}StandardBg`] : o(e.palette[a].light, 0.9),
        [`& .${a1.icon}`]: e.vars ? {
          color: e.vars.palette.Alert[`${a}IconColor`]
        } : {
          color: e.palette[a].main
        }
      }
    })), ...Object.entries(e.palette).filter(([, a]) => a.main && a.light).map(([a]) => ({
      props: {
        colorSeverity: a,
        variant: "outlined"
      },
      style: {
        color: e.vars ? e.vars.palette.Alert[`${a}Color`] : n(e.palette[a].light, 0.6),
        border: `1px solid ${(e.vars || e).palette[a].light}`,
        [`& .${a1.icon}`]: e.vars ? {
          color: e.vars.palette.Alert[`${a}IconColor`]
        } : {
          color: e.palette[a].main
        }
      }
    })), ...Object.entries(e.palette).filter(([, a]) => a.main && a.dark).map(([a]) => ({
      props: {
        colorSeverity: a,
        variant: "filled"
      },
      style: I({
        fontWeight: e.typography.fontWeightMedium
      }, e.vars ? {
        color: e.vars.palette.Alert[`${a}FilledColor`],
        backgroundColor: e.vars.palette.Alert[`${a}FilledBg`]
      } : {
        backgroundColor: e.palette.mode === "dark" ? e.palette[a].dark : e.palette[a].main,
        color: e.palette.getContrastText(e.palette[a].main)
      })
    }))]
  });
}), i_ = Re("div", {
  name: "MuiAlert",
  slot: "Icon",
  overridesResolver: (e, n) => n.icon
})({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: 0.9
}), a_ = Re("div", {
  name: "MuiAlert",
  slot: "Message",
  overridesResolver: (e, n) => n.message
})({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto"
}), s1 = Re("div", {
  name: "MuiAlert",
  slot: "Action",
  overridesResolver: (e, n) => n.action
})({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8
}), l1 = {
  success: /* @__PURE__ */ v.jsx(Yx, {
    fontSize: "inherit"
  }),
  warning: /* @__PURE__ */ v.jsx(Xx, {
    fontSize: "inherit"
  }),
  error: /* @__PURE__ */ v.jsx(Jx, {
    fontSize: "inherit"
  }),
  info: /* @__PURE__ */ v.jsx(Qx, {
    fontSize: "inherit"
  })
}, bh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = n_({
    props: n,
    name: "MuiAlert"
  }), {
    action: l,
    children: u,
    className: f,
    closeText: d = "Close",
    color: h,
    components: g = {},
    componentsProps: b = {},
    icon: x,
    iconMapping: _ = l1,
    onClose: P,
    role: S = "alert",
    severity: C = "success",
    slotProps: E = {},
    slots: $ = {},
    variant: N = "standard"
  } = a, A = $e(a, t_), M = I({}, a, {
    color: h,
    severity: C,
    variant: N,
    colorSeverity: h || C
  }), O = r_(M), k = {
    slots: I({
      closeButton: g.CloseButton,
      closeIcon: g.CloseIcon
    }, $),
    slotProps: I({}, b, E)
  }, [L, J] = o1("closeButton", {
    elementType: yh,
    externalForwardedProps: k,
    ownerState: M
  }), [le, G] = o1("closeIcon", {
    elementType: e_,
    externalForwardedProps: k,
    ownerState: M
  });
  return /* @__PURE__ */ v.jsxs(o_, I({
    role: S,
    elevation: 0,
    ownerState: M,
    className: He(O.root, f),
    ref: o
  }, A, {
    children: [x !== !1 ? /* @__PURE__ */ v.jsx(i_, {
      ownerState: M,
      className: O.icon,
      children: x || _[C] || l1[C]
    }) : null, /* @__PURE__ */ v.jsx(a_, {
      ownerState: M,
      className: O.message,
      children: u
    }), l != null ? /* @__PURE__ */ v.jsx(s1, {
      ownerState: M,
      className: O.action,
      children: l
    }) : null, l == null && P ? /* @__PURE__ */ v.jsx(s1, {
      ownerState: M,
      className: O.action,
      children: /* @__PURE__ */ v.jsx(L, I({
        size: "small",
        "aria-label": d,
        title: d,
        color: "inherit",
        onClick: P
      }, J, {
        children: /* @__PURE__ */ v.jsx(le, I({
          fontSize: "small"
        }, G))
      }))
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (bh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: i.node,
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: i.string,
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: i.oneOfType([i.oneOf(["error", "info", "success", "warning"]), i.string]),
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   *
   * @default {}
   */
  components: i.shape({
    CloseButton: i.elementType,
    CloseIcon: i.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   *
   * @default {}
   */
  componentsProps: i.shape({
    closeButton: i.object,
    closeIcon: i.object
  }),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon: i.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: i.shape({
    error: i.node,
    info: i.node,
    success: i.node,
    warning: i.node
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: i.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: i.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: i.oneOfType([i.oneOf(["error", "info", "success", "warning"]), i.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: i.shape({
    closeButton: i.oneOfType([i.func, i.object]),
    closeIcon: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: i.shape({
    closeButton: i.elementType,
    closeIcon: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: i.oneOfType([i.oneOf(["filled", "outlined", "standard"]), i.string])
});
function RA(e) {
  return /* @__PURE__ */ v.jsx(bh, { ...e });
}
function $A({
  children: e,
  sx: n,
  ...o
}) {
  return /* @__PURE__ */ v.jsx(v.Fragment, { children: /* @__PURE__ */ v.jsx(
    zv,
    {
      severity: "info",
      sx: {
        maxWidth: "100%",
        width: "100%",
        textAlign: "left",
        alignItems: "center",
        ...n
      },
      ...o,
      children: e
    }
  ) });
}
const PA = ({ src: e, alt: n, ...o }) => /* @__PURE__ */ v.jsx(an, { src: e, alt: n, ...o, component: "img" }), s_ = (e) => {
  let n = new Date(Number(e));
  if (!e) {
    const u = /* @__PURE__ */ new Date();
    n = new Date(
      u.getFullYear(),
      u.getMonth(),
      u.getDate()
    );
  }
  const o = String(n.getDate()).padStart(2, "0"), a = String(n.getMonth() + 1).padStart(2, "0"), l = n.getFullYear();
  return [a, o, l].join("/");
}, l_ = (e = 1, n = 1, o = 1900) => new Date(o, n - 1, e, 0, 0, 0, 0), u_ = (e = !0) => {
  const n = /* @__PURE__ */ new Date(), o = e ? 31 : n.getDate(), a = e ? 12 : n.getMonth() + 1, l = e ? 2200 : n.getFullYear();
  return new Date(l, a - 1, o, 23, 59, 59, 999);
}, u1 = {
  // Mask for date of birth in the format of MM/DD/YYYY.
  DOB_MASK: "99/99/9999"
}, Cc = (e) => {
  const n = /* @__PURE__ */ new Date(), o = /* @__PURE__ */ new Date("1900-01-01"), a = new Date(
    n.getFullYear(),
    n.getMonth(),
    n.getDate(),
    23,
    59,
    59,
    999
  ), l = e.replace(/-/g, "/"), u = new Date(l);
  if (u >= o && u <= a) {
    const f = Date.parse(String(new Date(l)));
    return !isNaN(f);
  }
  return !1;
}, IA = $o.string().refine((e) => /\d{2}-\d{2}-\d{4}/.test(e) ? Cc(e) : !1, "Date of Birth is invalid"), AA = $o.string().refine((e) => {
  if (/^\d{2}\d{2}\d{4}$/.test(e)) {
    const o = `${e.slice(0, 2)}/${e.slice(
      2,
      4
    )}/${e.slice(4, 8)}`;
    return Cc(o);
  }
  return !1;
}, "Date of Birth is invalid"), MA = $o.string().refine((e) => {
  if (/^\d{2}\d{2}$/.test(e)) {
    const o = `${e.slice(0, 2)}/${e.slice(2, 4)}/1970`;
    return Cc(o);
  }
  return !1;
}, "Date of Birth is invalid"), c_ = $o.string().refine((e) => {
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(e)) {
    const o = Date.parse(String(new Date(e)));
    return !isNaN(o);
  }
  return !1;
}, "Date is invalid"), NA = $o.string().min(3, "Must have enough description"), jA = $i.string().email(), DA = $i.string().min(1), f_ = $o.string().refine((e) => /\+1\d{3}\d{3}\d{4}/.test(e), "Phone is invalid"), FA = $i.string().regex(/^(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4}$/), kA = $i.string().min(2).max(2), LA = (e = "Invalid Unix string timestamp") => $i.string().refine((n) => /^\d+$/.test(n) && !isNaN(Number(n)) && n.length >= 10 && n.length <= 13, e);
function d_(e) {
  return /* @__PURE__ */ v.jsx(r6, { ...e });
}
const Bi = {
  variant: "outlined",
  size: "small"
};
function p_({
  label: e = "Date of Birth",
  value: n = "",
  error: o,
  helperText: a,
  onChange: l,
  onBlur: u,
  disabled: f,
  allowFutureDates: d = !0,
  ...h
}, g) {
  const [b, x] = jn(
    n ? s_(n) : ""
  );
  Ri(() => {
    n === "" && x("");
  }, [n]);
  const _ = l_(), P = u_(d), S = {
    ...Bi,
    label: e,
    error: o,
    helperText: a,
    inputProps: {
      // Set the input mode to numeric.
      inputMode: "numeric",
      // Tab index for each block.
      tabIndex: 0,
      // Mask type date.
      mask: u1.DOB_MASK
    },
    fullWidth: !0
  };
  return /* @__PURE__ */ v.jsx(an, { width: "100%", children: /* @__PURE__ */ v.jsx(
    d_,
    {
      mask: u1.DOB_MASK,
      maskPlaceholder: null,
      disabled: f,
      value: b,
      onBlur: u,
      onChange: (C) => {
        const E = C.target.value, $ = c_.safeParse(E);
        if (x(E), !$.success)
          return l == null ? void 0 : l({ target: { value: "" } });
        const N = new Date(E);
        if (N < _ || N > P)
          return l == null ? void 0 : l({ target: { value: "" } });
        N.setUTCHours(12), l == null || l({ target: { value: String(+N) } });
      },
      children: /* @__PURE__ */ v.jsx(Zr, { ...S, inputRef: g, ...h })
    }
  ) });
}
const BA = ps(p_);
function h_(e) {
  const [n, o] = mn.useState(e), [a, l] = mn.useState();
  return e !== n && (l(n), o(e)), a;
}
function xh({
  onClick: e,
  handleClear: n
}) {
  return /* @__PURE__ */ v.jsx(l0, { position: "end", children: /* @__PURE__ */ v.jsx(
    Xa,
    {
      "aria-label": "clear value",
      edge: "end",
      size: "small",
      onClick: () => {
        n(), e == null || e();
      },
      children: /* @__PURE__ */ v.jsx(u0, { fontSize: "small" })
    }
  ) });
}
function g_(e, n) {
  const { onChange: o, useOnComplete: a, ...l } = e;
  return /* @__PURE__ */ v.jsx(
    o6,
    {
      ...l,
      inputRef: n,
      onAccept: (u, f, d) => {
        a || o({ target: { name: e.name, value: u } }, d);
      },
      onComplete: (u, f, d) => {
        a && o({ target: { name: e.name, value: u } }, d);
      },
      overwrite: !0
    }
  );
}
const _h = ps(
  g_
);
function zA({
  onChange: e,
  label: n = "Social Security number",
  shouldHaveCloseAdornment: o = !1,
  ...a
}) {
  const [l, u] = jn(""), f = h_(l), d = (b) => {
    u(b), e == null || e({ target: { value: b } });
  }, h = () => {
    d(""), e == null || e({ target: { value: "" } });
  }, g = {
    ...Bi,
    value: l,
    onChange: (b, x) => {
      x && d(b.target.value);
    },
    inputProps: {
      onFocus: () => {
        d("");
      },
      onBlur: () => {
        l != null && l.length || d(f ?? "");
      },
      // Use onChange event.
      useOnComplete: !1,
      // Use unmasked value.
      unmask: !0,
      // Mask in the pattern of SSN.
      mask: "XXX-XX-0000",
      definitions: {
        X: {
          mask: /[0-9•]/,
          displayChar: "•"
        }
      },
      // Set input mode to numeric, so mobile virtual keyboards just show numeric keys.
      inputMode: "numeric",
      overwrite: !1,
      // Tab index for each block.
      tabIndex: 0
    },
    InputProps: {
      inputComponent: _h,
      endAdornment: !!o && /* @__PURE__ */ v.jsx(
        xh,
        {
          onClick: h,
          handleClear: h
        }
      )
    },
    fullWidth: !0,
    label: n
  };
  return /* @__PURE__ */ v.jsx(an, { width: "100%", children: /* @__PURE__ */ v.jsx(Zr, { ...g, ...a }) });
}
function WA({
  options: e,
  defaultOption: n,
  onChange: o,
  onClear: a,
  ...l
}) {
  const [u, f] = jn(null), d = (b) => {
    f(b), o && o(b);
  }, h = () => {
    d(null), a && a();
  }, g = {
    ...Bi,
    inputProps: {
      tabIndex: 0
    },
    fullWidth: !0,
    ...l.InputProps
  };
  return /* @__PURE__ */ v.jsx(
    s0,
    {
      disablePortal: !0,
      autoHighlight: !0,
      defaultValue: n,
      options: e,
      isOptionEqualToValue: (b, x) => (b == null ? void 0 : b.id) === (x == null ? void 0 : x.id),
      value: u,
      onChange: (b, x) => {
        if (!x) {
          h();
          return;
        }
        d(x);
      },
      renderInput: (b) => /* @__PURE__ */ v.jsx(
        Zr,
        {
          ...b,
          ...g,
          inputProps: {
            ...b.inputProps,
            ...g.inputProps
          }
        }
      )
    }
  );
}
function m_() {
  this.__data__ = [], this.size = 0;
}
var v_ = m_;
function y_(e, n) {
  return e === n || e !== e && n !== n;
}
var Eh = y_, b_ = Eh;
function x_(e, n) {
  for (var o = e.length; o--; )
    if (b_(e[o][0], n))
      return o;
  return -1;
}
var js = x_, __ = js, E_ = Array.prototype, T_ = E_.splice;
function C_(e) {
  var n = this.__data__, o = __(n, e);
  if (o < 0)
    return !1;
  var a = n.length - 1;
  return o == a ? n.pop() : T_.call(n, o, 1), --this.size, !0;
}
var O_ = C_, S_ = js;
function w_(e) {
  var n = this.__data__, o = S_(n, e);
  return o < 0 ? void 0 : n[o][1];
}
var R_ = w_, $_ = js;
function P_(e) {
  return $_(this.__data__, e) > -1;
}
var I_ = P_, A_ = js;
function M_(e, n) {
  var o = this.__data__, a = A_(o, e);
  return a < 0 ? (++this.size, o.push([e, n])) : o[a][1] = n, this;
}
var N_ = M_, j_ = v_, D_ = O_, F_ = R_, k_ = I_, L_ = N_;
function Fo(e) {
  var n = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++n < o; ) {
    var a = e[n];
    this.set(a[0], a[1]);
  }
}
Fo.prototype.clear = j_;
Fo.prototype.delete = D_;
Fo.prototype.get = F_;
Fo.prototype.has = k_;
Fo.prototype.set = L_;
var Ds = Fo, B_ = Ds;
function z_() {
  this.__data__ = new B_(), this.size = 0;
}
var W_ = z_;
function U_(e) {
  var n = this.__data__, o = n.delete(e);
  return this.size = n.size, o;
}
var V_ = U_;
function H_(e) {
  return this.__data__.get(e);
}
var q_ = H_;
function Z_(e) {
  return this.__data__.has(e);
}
var K_ = Z_, G_ = Fi, Y_ = Di, X_ = "[object AsyncFunction]", J_ = "[object Function]", Q_ = "[object GeneratorFunction]", eE = "[object Proxy]";
function tE(e) {
  if (!Y_(e))
    return !1;
  var n = G_(e);
  return n == J_ || n == Q_ || n == X_ || n == eE;
}
var Th = tE, nE = Xn, rE = nE["__core-js_shared__"], oE = rE, Tu = oE, c1 = function() {
  var e = /[^.]+$/.exec(Tu && Tu.keys && Tu.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function iE(e) {
  return !!c1 && c1 in e;
}
var aE = iE, sE = Function.prototype, lE = sE.toString;
function uE(e) {
  if (e != null) {
    try {
      return lE.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ch = uE, cE = Th, fE = aE, dE = Di, pE = Ch, hE = /[\\^$.*+?()[\]{}|]/g, gE = /^\[object .+?Constructor\]$/, mE = Function.prototype, vE = Object.prototype, yE = mE.toString, bE = vE.hasOwnProperty, xE = RegExp(
  "^" + yE.call(bE).replace(hE, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function _E(e) {
  if (!dE(e) || fE(e))
    return !1;
  var n = cE(e) ? xE : gE;
  return n.test(pE(e));
}
var EE = _E;
function TE(e, n) {
  return e == null ? void 0 : e[n];
}
var CE = TE, OE = EE, SE = CE;
function wE(e, n) {
  var o = SE(e, n);
  return OE(o) ? o : void 0;
}
var ko = wE, RE = ko, $E = Xn, PE = RE($E, "Map"), Oc = PE, IE = ko, AE = IE(Object, "create"), Fs = AE, f1 = Fs;
function ME() {
  this.__data__ = f1 ? f1(null) : {}, this.size = 0;
}
var NE = ME;
function jE(e) {
  var n = this.has(e) && delete this.__data__[e];
  return this.size -= n ? 1 : 0, n;
}
var DE = jE, FE = Fs, kE = "__lodash_hash_undefined__", LE = Object.prototype, BE = LE.hasOwnProperty;
function zE(e) {
  var n = this.__data__;
  if (FE) {
    var o = n[e];
    return o === kE ? void 0 : o;
  }
  return BE.call(n, e) ? n[e] : void 0;
}
var WE = zE, UE = Fs, VE = Object.prototype, HE = VE.hasOwnProperty;
function qE(e) {
  var n = this.__data__;
  return UE ? n[e] !== void 0 : HE.call(n, e);
}
var ZE = qE, KE = Fs, GE = "__lodash_hash_undefined__";
function YE(e, n) {
  var o = this.__data__;
  return this.size += this.has(e) ? 0 : 1, o[e] = KE && n === void 0 ? GE : n, this;
}
var XE = YE, JE = NE, QE = DE, eT = WE, tT = ZE, nT = XE;
function Lo(e) {
  var n = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++n < o; ) {
    var a = e[n];
    this.set(a[0], a[1]);
  }
}
Lo.prototype.clear = JE;
Lo.prototype.delete = QE;
Lo.prototype.get = eT;
Lo.prototype.has = tT;
Lo.prototype.set = nT;
var rT = Lo, d1 = rT, oT = Ds, iT = Oc;
function aT() {
  this.size = 0, this.__data__ = {
    hash: new d1(),
    map: new (iT || oT)(),
    string: new d1()
  };
}
var sT = aT;
function lT(e) {
  var n = typeof e;
  return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
}
var uT = lT, cT = uT;
function fT(e, n) {
  var o = e.__data__;
  return cT(n) ? o[typeof n == "string" ? "string" : "hash"] : o.map;
}
var ks = fT, dT = ks;
function pT(e) {
  var n = dT(this, e).delete(e);
  return this.size -= n ? 1 : 0, n;
}
var hT = pT, gT = ks;
function mT(e) {
  return gT(this, e).get(e);
}
var vT = mT, yT = ks;
function bT(e) {
  return yT(this, e).has(e);
}
var xT = bT, _T = ks;
function ET(e, n) {
  var o = _T(this, e), a = o.size;
  return o.set(e, n), this.size += o.size == a ? 0 : 1, this;
}
var TT = ET, CT = sT, OT = hT, ST = vT, wT = xT, RT = TT;
function Bo(e) {
  var n = -1, o = e == null ? 0 : e.length;
  for (this.clear(); ++n < o; ) {
    var a = e[n];
    this.set(a[0], a[1]);
  }
}
Bo.prototype.clear = CT;
Bo.prototype.delete = OT;
Bo.prototype.get = ST;
Bo.prototype.has = wT;
Bo.prototype.set = RT;
var Sc = Bo, $T = Ds, PT = Oc, IT = Sc, AT = 200;
function MT(e, n) {
  var o = this.__data__;
  if (o instanceof $T) {
    var a = o.__data__;
    if (!PT || a.length < AT - 1)
      return a.push([e, n]), this.size = ++o.size, this;
    o = this.__data__ = new IT(a);
  }
  return o.set(e, n), this.size = o.size, this;
}
var NT = MT, jT = Ds, DT = W_, FT = V_, kT = q_, LT = K_, BT = NT;
function zo(e) {
  var n = this.__data__ = new jT(e);
  this.size = n.size;
}
zo.prototype.clear = DT;
zo.prototype.delete = FT;
zo.prototype.get = kT;
zo.prototype.has = LT;
zo.prototype.set = BT;
var Oh = zo, zT = "__lodash_hash_undefined__";
function WT(e) {
  return this.__data__.set(e, zT), this;
}
var UT = WT;
function VT(e) {
  return this.__data__.has(e);
}
var HT = VT, qT = Sc, ZT = UT, KT = HT;
function is(e) {
  var n = -1, o = e == null ? 0 : e.length;
  for (this.__data__ = new qT(); ++n < o; )
    this.add(e[n]);
}
is.prototype.add = is.prototype.push = ZT;
is.prototype.has = KT;
var GT = is;
function YT(e, n) {
  for (var o = -1, a = e == null ? 0 : e.length; ++o < a; )
    if (n(e[o], o, e))
      return !0;
  return !1;
}
var XT = YT;
function JT(e, n) {
  return e.has(n);
}
var QT = JT, eC = GT, tC = XT, nC = QT, rC = 1, oC = 2;
function iC(e, n, o, a, l, u) {
  var f = o & rC, d = e.length, h = n.length;
  if (d != h && !(f && h > d))
    return !1;
  var g = u.get(e), b = u.get(n);
  if (g && b)
    return g == n && b == e;
  var x = -1, _ = !0, P = o & oC ? new eC() : void 0;
  for (u.set(e, n), u.set(n, e); ++x < d; ) {
    var S = e[x], C = n[x];
    if (a)
      var E = f ? a(C, S, x, n, e, u) : a(S, C, x, e, n, u);
    if (E !== void 0) {
      if (E)
        continue;
      _ = !1;
      break;
    }
    if (P) {
      if (!tC(n, function($, N) {
        if (!nC(P, N) && (S === $ || l(S, $, o, a, u)))
          return P.push(N);
      })) {
        _ = !1;
        break;
      }
    } else if (!(S === C || l(S, C, o, a, u))) {
      _ = !1;
      break;
    }
  }
  return u.delete(e), u.delete(n), _;
}
var Sh = iC, aC = Xn, sC = aC.Uint8Array, lC = sC;
function uC(e) {
  var n = -1, o = Array(e.size);
  return e.forEach(function(a, l) {
    o[++n] = [l, a];
  }), o;
}
var cC = uC;
function fC(e) {
  var n = -1, o = Array(e.size);
  return e.forEach(function(a) {
    o[++n] = a;
  }), o;
}
var dC = fC, p1 = Ms, h1 = lC, pC = Eh, hC = Sh, gC = cC, mC = dC, vC = 1, yC = 2, bC = "[object Boolean]", xC = "[object Date]", _C = "[object Error]", EC = "[object Map]", TC = "[object Number]", CC = "[object RegExp]", OC = "[object Set]", SC = "[object String]", wC = "[object Symbol]", RC = "[object ArrayBuffer]", $C = "[object DataView]", g1 = p1 ? p1.prototype : void 0, Cu = g1 ? g1.valueOf : void 0;
function PC(e, n, o, a, l, u, f) {
  switch (o) {
    case $C:
      if (e.byteLength != n.byteLength || e.byteOffset != n.byteOffset)
        return !1;
      e = e.buffer, n = n.buffer;
    case RC:
      return !(e.byteLength != n.byteLength || !u(new h1(e), new h1(n)));
    case bC:
    case xC:
    case TC:
      return pC(+e, +n);
    case _C:
      return e.name == n.name && e.message == n.message;
    case CC:
    case SC:
      return e == n + "";
    case EC:
      var d = gC;
    case OC:
      var h = a & vC;
      if (d || (d = mC), e.size != n.size && !h)
        return !1;
      var g = f.get(e);
      if (g)
        return g == n;
      a |= yC, f.set(e, n);
      var b = hC(d(e), d(n), a, l, u, f);
      return f.delete(e), b;
    case wC:
      if (Cu)
        return Cu.call(e) == Cu.call(n);
  }
  return !1;
}
var IC = PC;
function AC(e, n) {
  for (var o = -1, a = n.length, l = e.length; ++o < a; )
    e[l + o] = n[o];
  return e;
}
var MC = AC, NC = Array.isArray, Rr = NC, jC = MC, DC = Rr;
function FC(e, n, o) {
  var a = n(e);
  return DC(e) ? a : jC(a, o(e));
}
var kC = FC;
function LC(e, n) {
  for (var o = -1, a = e == null ? 0 : e.length, l = 0, u = []; ++o < a; ) {
    var f = e[o];
    n(f, o, e) && (u[l++] = f);
  }
  return u;
}
var BC = LC;
function zC() {
  return [];
}
var WC = zC, UC = BC, VC = WC, HC = Object.prototype, qC = HC.propertyIsEnumerable, m1 = Object.getOwnPropertySymbols, ZC = m1 ? function(e) {
  return e == null ? [] : (e = Object(e), UC(m1(e), function(n) {
    return qC.call(e, n);
  }));
} : VC, KC = ZC;
function GC(e, n) {
  for (var o = -1, a = Array(e); ++o < e; )
    a[o] = n(o);
  return a;
}
var YC = GC, XC = Fi, JC = ki, QC = "[object Arguments]";
function eO(e) {
  return JC(e) && XC(e) == QC;
}
var tO = eO, v1 = tO, nO = ki, wh = Object.prototype, rO = wh.hasOwnProperty, oO = wh.propertyIsEnumerable, iO = v1(/* @__PURE__ */ function() {
  return arguments;
}()) ? v1 : function(e) {
  return nO(e) && rO.call(e, "callee") && !oO.call(e, "callee");
}, Rh = iO, as = { exports: {} };
function aO() {
  return !1;
}
var sO = aO;
as.exports;
(function(e, n) {
  var o = Xn, a = sO, l = n && !n.nodeType && n, u = l && !0 && e && !e.nodeType && e, f = u && u.exports === l, d = f ? o.Buffer : void 0, h = d ? d.isBuffer : void 0, g = h || a;
  e.exports = g;
})(as, as.exports);
var $h = as.exports, lO = 9007199254740991, uO = /^(?:0|[1-9]\d*)$/;
function cO(e, n) {
  var o = typeof e;
  return n = n ?? lO, !!n && (o == "number" || o != "symbol" && uO.test(e)) && e > -1 && e % 1 == 0 && e < n;
}
var Ph = cO, fO = 9007199254740991;
function dO(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= fO;
}
var wc = dO, pO = Fi, hO = wc, gO = ki, mO = "[object Arguments]", vO = "[object Array]", yO = "[object Boolean]", bO = "[object Date]", xO = "[object Error]", _O = "[object Function]", EO = "[object Map]", TO = "[object Number]", CO = "[object Object]", OO = "[object RegExp]", SO = "[object Set]", wO = "[object String]", RO = "[object WeakMap]", $O = "[object ArrayBuffer]", PO = "[object DataView]", IO = "[object Float32Array]", AO = "[object Float64Array]", MO = "[object Int8Array]", NO = "[object Int16Array]", jO = "[object Int32Array]", DO = "[object Uint8Array]", FO = "[object Uint8ClampedArray]", kO = "[object Uint16Array]", LO = "[object Uint32Array]", ct = {};
ct[IO] = ct[AO] = ct[MO] = ct[NO] = ct[jO] = ct[DO] = ct[FO] = ct[kO] = ct[LO] = !0;
ct[mO] = ct[vO] = ct[$O] = ct[yO] = ct[PO] = ct[bO] = ct[xO] = ct[_O] = ct[EO] = ct[TO] = ct[CO] = ct[OO] = ct[SO] = ct[wO] = ct[RO] = !1;
function BO(e) {
  return gO(e) && hO(e.length) && !!ct[pO(e)];
}
var zO = BO;
function WO(e) {
  return function(n) {
    return e(n);
  };
}
var UO = WO, ss = { exports: {} };
ss.exports;
(function(e, n) {
  var o = oh, a = n && !n.nodeType && n, l = a && !0 && e && !e.nodeType && e, u = l && l.exports === a, f = u && o.process, d = function() {
    try {
      var h = l && l.require && l.require("util").types;
      return h || f && f.binding && f.binding("util");
    } catch {
    }
  }();
  e.exports = d;
})(ss, ss.exports);
var VO = ss.exports, HO = zO, qO = UO, y1 = VO, b1 = y1 && y1.isTypedArray, ZO = b1 ? qO(b1) : HO, Ih = ZO, KO = YC, GO = Rh, YO = Rr, XO = $h, JO = Ph, QO = Ih, eS = Object.prototype, tS = eS.hasOwnProperty;
function nS(e, n) {
  var o = YO(e), a = !o && GO(e), l = !o && !a && XO(e), u = !o && !a && !l && QO(e), f = o || a || l || u, d = f ? KO(e.length, String) : [], h = d.length;
  for (var g in e)
    (n || tS.call(e, g)) && !(f && // Safari 9 has enumerable `arguments.length` in strict mode.
    (g == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    l && (g == "offset" || g == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    u && (g == "buffer" || g == "byteLength" || g == "byteOffset") || // Skip index properties.
    JO(g, h))) && d.push(g);
  return d;
}
var rS = nS, oS = Object.prototype;
function iS(e) {
  var n = e && e.constructor, o = typeof n == "function" && n.prototype || oS;
  return e === o;
}
var aS = iS;
function sS(e, n) {
  return function(o) {
    return e(n(o));
  };
}
var lS = sS, uS = lS, cS = uS(Object.keys, Object), fS = cS, dS = aS, pS = fS, hS = Object.prototype, gS = hS.hasOwnProperty;
function mS(e) {
  if (!dS(e))
    return pS(e);
  var n = [];
  for (var o in Object(e))
    gS.call(e, o) && o != "constructor" && n.push(o);
  return n;
}
var vS = mS, yS = Th, bS = wc;
function xS(e) {
  return e != null && bS(e.length) && !yS(e);
}
var Ah = xS, _S = rS, ES = vS, TS = Ah;
function CS(e) {
  return TS(e) ? _S(e) : ES(e);
}
var Rc = CS, OS = kC, SS = KC, wS = Rc;
function RS(e) {
  return OS(e, wS, SS);
}
var $S = RS, x1 = $S, PS = 1, IS = Object.prototype, AS = IS.hasOwnProperty;
function MS(e, n, o, a, l, u) {
  var f = o & PS, d = x1(e), h = d.length, g = x1(n), b = g.length;
  if (h != b && !f)
    return !1;
  for (var x = h; x--; ) {
    var _ = d[x];
    if (!(f ? _ in n : AS.call(n, _)))
      return !1;
  }
  var P = u.get(e), S = u.get(n);
  if (P && S)
    return P == n && S == e;
  var C = !0;
  u.set(e, n), u.set(n, e);
  for (var E = f; ++x < h; ) {
    _ = d[x];
    var $ = e[_], N = n[_];
    if (a)
      var A = f ? a(N, $, _, n, e, u) : a($, N, _, e, n, u);
    if (!(A === void 0 ? $ === N || l($, N, o, a, u) : A)) {
      C = !1;
      break;
    }
    E || (E = _ == "constructor");
  }
  if (C && !E) {
    var M = e.constructor, O = n.constructor;
    M != O && "constructor" in e && "constructor" in n && !(typeof M == "function" && M instanceof M && typeof O == "function" && O instanceof O) && (C = !1);
  }
  return u.delete(e), u.delete(n), C;
}
var NS = MS, jS = ko, DS = Xn, FS = jS(DS, "DataView"), kS = FS, LS = ko, BS = Xn, zS = LS(BS, "Promise"), WS = zS, US = ko, VS = Xn, HS = US(VS, "Set"), qS = HS, ZS = ko, KS = Xn, GS = ZS(KS, "WeakMap"), YS = GS, Zu = kS, Ku = Oc, Gu = WS, Yu = qS, Xu = YS, Mh = Fi, Wo = Ch, _1 = "[object Map]", XS = "[object Object]", E1 = "[object Promise]", T1 = "[object Set]", C1 = "[object WeakMap]", O1 = "[object DataView]", JS = Wo(Zu), QS = Wo(Ku), ew = Wo(Gu), tw = Wo(Yu), nw = Wo(Xu), zr = Mh;
(Zu && zr(new Zu(new ArrayBuffer(1))) != O1 || Ku && zr(new Ku()) != _1 || Gu && zr(Gu.resolve()) != E1 || Yu && zr(new Yu()) != T1 || Xu && zr(new Xu()) != C1) && (zr = function(e) {
  var n = Mh(e), o = n == XS ? e.constructor : void 0, a = o ? Wo(o) : "";
  if (a)
    switch (a) {
      case JS:
        return O1;
      case QS:
        return _1;
      case ew:
        return E1;
      case tw:
        return T1;
      case nw:
        return C1;
    }
  return n;
});
var rw = zr, Ou = Oh, ow = Sh, iw = IC, aw = NS, S1 = rw, w1 = Rr, R1 = $h, sw = Ih, lw = 1, $1 = "[object Arguments]", P1 = "[object Array]", Ba = "[object Object]", uw = Object.prototype, I1 = uw.hasOwnProperty;
function cw(e, n, o, a, l, u) {
  var f = w1(e), d = w1(n), h = f ? P1 : S1(e), g = d ? P1 : S1(n);
  h = h == $1 ? Ba : h, g = g == $1 ? Ba : g;
  var b = h == Ba, x = g == Ba, _ = h == g;
  if (_ && R1(e)) {
    if (!R1(n))
      return !1;
    f = !0, b = !1;
  }
  if (_ && !b)
    return u || (u = new Ou()), f || sw(e) ? ow(e, n, o, a, l, u) : iw(e, n, h, o, a, l, u);
  if (!(o & lw)) {
    var P = b && I1.call(e, "__wrapped__"), S = x && I1.call(n, "__wrapped__");
    if (P || S) {
      var C = P ? e.value() : e, E = S ? n.value() : n;
      return u || (u = new Ou()), l(C, E, o, a, u);
    }
  }
  return _ ? (u || (u = new Ou()), aw(e, n, o, a, l, u)) : !1;
}
var fw = cw, dw = fw, A1 = ki;
function Nh(e, n, o, a, l) {
  return e === n ? !0 : e == null || n == null || !A1(e) && !A1(n) ? e !== e && n !== n : dw(e, n, o, a, Nh, l);
}
var jh = Nh, pw = Oh, hw = jh, gw = 1, mw = 2;
function vw(e, n, o, a) {
  var l = o.length, u = l, f = !a;
  if (e == null)
    return !u;
  for (e = Object(e); l--; ) {
    var d = o[l];
    if (f && d[2] ? d[1] !== e[d[0]] : !(d[0] in e))
      return !1;
  }
  for (; ++l < u; ) {
    d = o[l];
    var h = d[0], g = e[h], b = d[1];
    if (f && d[2]) {
      if (g === void 0 && !(h in e))
        return !1;
    } else {
      var x = new pw();
      if (a)
        var _ = a(g, b, h, e, n, x);
      if (!(_ === void 0 ? hw(b, g, gw | mw, a, x) : _))
        return !1;
    }
  }
  return !0;
}
var yw = vw, bw = Di;
function xw(e) {
  return e === e && !bw(e);
}
var Dh = xw, _w = Dh, Ew = Rc;
function Tw(e) {
  for (var n = Ew(e), o = n.length; o--; ) {
    var a = n[o], l = e[a];
    n[o] = [a, l, _w(l)];
  }
  return n;
}
var Cw = Tw;
function Ow(e, n) {
  return function(o) {
    return o == null ? !1 : o[e] === n && (n !== void 0 || e in Object(o));
  };
}
var Fh = Ow, Sw = yw, ww = Cw, Rw = Fh;
function $w(e) {
  var n = ww(e);
  return n.length == 1 && n[0][2] ? Rw(n[0][0], n[0][1]) : function(o) {
    return o === e || Sw(o, e, n);
  };
}
var Pw = $w, Iw = Rr, Aw = Ns, Mw = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Nw = /^\w*$/;
function jw(e, n) {
  if (Iw(e))
    return !1;
  var o = typeof e;
  return o == "number" || o == "symbol" || o == "boolean" || e == null || Aw(e) ? !0 : Nw.test(e) || !Mw.test(e) || n != null && e in Object(n);
}
var $c = jw, kh = Sc, Dw = "Expected a function";
function Pc(e, n) {
  if (typeof e != "function" || n != null && typeof n != "function")
    throw new TypeError(Dw);
  var o = function() {
    var a = arguments, l = n ? n.apply(this, a) : a[0], u = o.cache;
    if (u.has(l))
      return u.get(l);
    var f = e.apply(this, a);
    return o.cache = u.set(l, f) || u, f;
  };
  return o.cache = new (Pc.Cache || kh)(), o;
}
Pc.Cache = kh;
var Fw = Pc, kw = Fw, Lw = 500;
function Bw(e) {
  var n = kw(e, function(a) {
    return o.size === Lw && o.clear(), a;
  }), o = n.cache;
  return n;
}
var zw = Bw, Ww = zw, Uw = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Vw = /\\(\\)?/g, Hw = Ww(function(e) {
  var n = [];
  return e.charCodeAt(0) === 46 && n.push(""), e.replace(Uw, function(o, a, l, u) {
    n.push(l ? u.replace(Vw, "$1") : a || o);
  }), n;
}), qw = Hw;
function Zw(e, n) {
  for (var o = -1, a = e == null ? 0 : e.length, l = Array(a); ++o < a; )
    l[o] = n(e[o], o, e);
  return l;
}
var Kw = Zw, M1 = Ms, Gw = Kw, Yw = Rr, Xw = Ns, Jw = 1 / 0, N1 = M1 ? M1.prototype : void 0, j1 = N1 ? N1.toString : void 0;
function Lh(e) {
  if (typeof e == "string")
    return e;
  if (Yw(e))
    return Gw(e, Lh) + "";
  if (Xw(e))
    return j1 ? j1.call(e) : "";
  var n = e + "";
  return n == "0" && 1 / e == -Jw ? "-0" : n;
}
var Qw = Lh, eR = Qw;
function tR(e) {
  return e == null ? "" : eR(e);
}
var nR = tR, rR = Rr, oR = $c, iR = qw, aR = nR;
function sR(e, n) {
  return rR(e) ? e : oR(e, n) ? [e] : iR(aR(e));
}
var Bh = sR, lR = Ns, uR = 1 / 0;
function cR(e) {
  if (typeof e == "string" || lR(e))
    return e;
  var n = e + "";
  return n == "0" && 1 / e == -uR ? "-0" : n;
}
var Ls = cR, fR = Bh, dR = Ls;
function pR(e, n) {
  n = fR(n, e);
  for (var o = 0, a = n.length; e != null && o < a; )
    e = e[dR(n[o++])];
  return o && o == a ? e : void 0;
}
var zh = pR, hR = zh;
function gR(e, n, o) {
  var a = e == null ? void 0 : hR(e, n);
  return a === void 0 ? o : a;
}
var mR = gR;
function vR(e, n) {
  return e != null && n in Object(e);
}
var yR = vR, bR = Bh, xR = Rh, _R = Rr, ER = Ph, TR = wc, CR = Ls;
function OR(e, n, o) {
  n = bR(n, e);
  for (var a = -1, l = n.length, u = !1; ++a < l; ) {
    var f = CR(n[a]);
    if (!(u = e != null && o(e, f)))
      break;
    e = e[f];
  }
  return u || ++a != l ? u : (l = e == null ? 0 : e.length, !!l && TR(l) && ER(f, l) && (_R(e) || xR(e)));
}
var SR = OR, wR = yR, RR = SR;
function $R(e, n) {
  return e != null && RR(e, n, wR);
}
var PR = $R, IR = jh, AR = mR, MR = PR, NR = $c, jR = Dh, DR = Fh, FR = Ls, kR = 1, LR = 2;
function BR(e, n) {
  return NR(e) && jR(n) ? DR(FR(e), n) : function(o) {
    var a = AR(o, e);
    return a === void 0 && a === n ? MR(o, e) : IR(n, a, kR | LR);
  };
}
var zR = BR;
function WR(e) {
  return e;
}
var UR = WR;
function VR(e) {
  return function(n) {
    return n == null ? void 0 : n[e];
  };
}
var HR = VR, qR = zh;
function ZR(e) {
  return function(n) {
    return qR(n, e);
  };
}
var KR = ZR, GR = HR, YR = KR, XR = $c, JR = Ls;
function QR(e) {
  return XR(e) ? GR(JR(e)) : YR(e);
}
var e$ = QR, t$ = Pw, n$ = zR, r$ = UR, o$ = Rr, i$ = e$;
function a$(e) {
  return typeof e == "function" ? e : e == null ? r$ : typeof e == "object" ? o$(e) ? n$(e[0], e[1]) : t$(e) : i$(e);
}
var Wh = a$, s$ = Wh, l$ = Ah, u$ = Rc;
function c$(e) {
  return function(n, o, a) {
    var l = Object(n);
    if (!l$(n)) {
      var u = s$(o);
      n = u$(n), o = function(d) {
        return u(l[d], d, l);
      };
    }
    var f = e(n, o, a);
    return f > -1 ? l[u ? n[f] : f] : void 0;
  };
}
var f$ = c$;
function d$(e, n, o, a) {
  for (var l = e.length, u = o + (a ? 1 : -1); a ? u-- : ++u < l; )
    if (n(e[u], u, e))
      return u;
  return -1;
}
var p$ = d$, h$ = ah, D1 = 1 / 0, g$ = 17976931348623157e292;
function m$(e) {
  if (!e)
    return e === 0 ? e : 0;
  if (e = h$(e), e === D1 || e === -D1) {
    var n = e < 0 ? -1 : 1;
    return n * g$;
  }
  return e === e ? e : 0;
}
var v$ = m$, y$ = v$;
function b$(e) {
  var n = y$(e), o = n % 1;
  return n === n ? o ? n - o : n : 0;
}
var x$ = b$, _$ = p$, E$ = Wh, T$ = x$, C$ = Math.max;
function O$(e, n, o) {
  var a = e == null ? 0 : e.length;
  if (!a)
    return -1;
  var l = o == null ? 0 : T$(o);
  return l < 0 && (l = C$(a + l, 0)), _$(e, E$(n), l);
}
var S$ = O$, w$ = f$, R$ = S$, $$ = w$(R$), P$ = $$;
const I$ = /* @__PURE__ */ gs(P$), ls = [
  {
    countryName: "Canada",
    countryCode: "CA",
    emoji: "🇨🇦",
    mask: "{+}{1} (000) 000-0000"
  },
  {
    countryName: "United States",
    countryCode: "US",
    emoji: "🇺🇸",
    mask: "{+}{1} (000) 000-0000"
  },
  {
    countryName: "Brazil",
    countryCode: "BR",
    emoji: "🇧🇷",
    mask: "{+}{55} (00) 00000-0000"
  }
];
function UA(e) {
  const n = nc(e);
  return n ? `+${n.countryCallingCode} ${n.formatNational()}` : e;
}
function VA(e) {
  const n = nc(e);
  return ls.find((o) => o.countryCode === (n == null ? void 0 : n.country));
}
function Uh(e, n) {
  return I$(ls, { [e]: n });
}
const A$ = (e, n) => e.countryName.localeCompare(n.countryName), HA = (e) => {
  const n = nc(e);
  return i6(e) && !!(n != null && n.country);
};
function M$({
  shouldShowOnlyNorthAmericanCountries: e = !0,
  ...n
}) {
  var h;
  const [o, a] = jn(null), l = !!o, u = qr(() => {
    let g = [
      ...ls.filter((b) => b.countryCode !== "BR")
    ];
    return e || (g = [...ls]), [...g].sort(A$);
  }, [e]), f = (g) => {
    a(g.currentTarget);
  }, d = () => {
    a(null);
  };
  return /* @__PURE__ */ v.jsxs(v.Fragment, { children: [
    /* @__PURE__ */ v.jsx(
      Wv,
      {
        id: "demo-customized-button",
        "aria-controls": l ? "country-select-button" : void 0,
        "aria-haspopup": "true",
        "aria-expanded": l ? "true" : void 0,
        variant: "text",
        disableElevation: !0,
        onClick: f,
        endIcon: /* @__PURE__ */ v.jsx(Jv, {}),
        children: (h = Uh("countryCode", n.value)) == null ? void 0 : h.emoji
      }
    ),
    /* @__PURE__ */ v.jsx(
      Uv,
      {
        anchorEl: o,
        open: l,
        onClose: d,
        MenuListProps: {
          "aria-labelledby": "country-select-button"
        },
        slotProps: {
          paper: {
            style: {
              maxHeight: 48 * 4.5,
              width: "20ch",
              minWidth: "300px"
            }
          }
        },
        children: u.map((g) => /* @__PURE__ */ v.jsxs(
          Vv,
          {
            role: "menuitem",
            onClick: () => {
              n.onChange(g.countryCode), d();
            },
            children: [
              g.emoji,
              " ",
              g.countryName
            ]
          },
          g.countryCode
        ))
      }
    )
  ] });
}
const N$ = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function j$(e) {
  const n = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(n) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : n;
}
function D$(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const n = (a) => e.ownerDocument.querySelector(`input[type="radio"]${a}`);
  let o = n(`[name="${e.name}"]:checked`);
  return o || (o = n(`[name="${e.name}"]`)), o !== e;
}
function F$(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || D$(e));
}
function k$(e) {
  const n = [], o = [];
  return Array.from(e.querySelectorAll(N$)).forEach((a, l) => {
    const u = j$(a);
    u === -1 || !F$(a) || (u === 0 ? n.push(a) : o.push({
      documentOrder: l,
      tabIndex: u,
      node: a
    }));
  }), o.sort((a, l) => a.tabIndex === l.tabIndex ? a.documentOrder - l.documentOrder : a.tabIndex - l.tabIndex).map((a) => a.node).concat(n);
}
function L$() {
  return !0;
}
function us(e) {
  const {
    children: n,
    disableAutoFocus: o = !1,
    disableEnforceFocus: a = !1,
    disableRestoreFocus: l = !1,
    getTabbable: u = k$,
    isEnabled: f = L$,
    open: d
  } = e, h = j.useRef(!1), g = j.useRef(null), b = j.useRef(null), x = j.useRef(null), _ = j.useRef(null), P = j.useRef(!1), S = j.useRef(null), C = en(n.ref, S), E = j.useRef(null);
  j.useEffect(() => {
    !d || !S.current || (P.current = !o);
  }, [o, d]), j.useEffect(() => {
    if (!d || !S.current)
      return;
    const A = bn(S.current);
    return S.current.contains(A.activeElement) || (S.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), S.current.setAttribute("tabIndex", "-1")), P.current && S.current.focus()), () => {
      l || (x.current && x.current.focus && (h.current = !0, x.current.focus()), x.current = null);
    };
  }, [d]), j.useEffect(() => {
    if (!d || !S.current)
      return;
    const A = bn(S.current), M = (L) => {
      E.current = L, !(a || !f() || L.key !== "Tab") && A.activeElement === S.current && L.shiftKey && (h.current = !0, b.current && b.current.focus());
    }, O = () => {
      const L = S.current;
      if (L === null)
        return;
      if (!A.hasFocus() || !f() || h.current) {
        h.current = !1;
        return;
      }
      if (L.contains(A.activeElement) || a && A.activeElement !== g.current && A.activeElement !== b.current)
        return;
      if (A.activeElement !== _.current)
        _.current = null;
      else if (_.current !== null)
        return;
      if (!P.current)
        return;
      let J = [];
      if ((A.activeElement === g.current || A.activeElement === b.current) && (J = u(S.current)), J.length > 0) {
        var le, G;
        const ie = !!((le = E.current) != null && le.shiftKey && ((G = E.current) == null ? void 0 : G.key) === "Tab"), ae = J[0], ee = J[J.length - 1];
        typeof ae != "string" && typeof ee != "string" && (ie ? ee.focus() : ae.focus());
      } else
        L.focus();
    };
    A.addEventListener("focusin", O), A.addEventListener("keydown", M, !0);
    const k = setInterval(() => {
      A.activeElement && A.activeElement.tagName === "BODY" && O();
    }, 50);
    return () => {
      clearInterval(k), A.removeEventListener("focusin", O), A.removeEventListener("keydown", M, !0);
    };
  }, [o, a, l, f, d, u]);
  const $ = (A) => {
    x.current === null && (x.current = A.relatedTarget), P.current = !0, _.current = A.target;
    const M = n.props.onFocus;
    M && M(A);
  }, N = (A) => {
    x.current === null && (x.current = A.relatedTarget), P.current = !0;
  };
  return /* @__PURE__ */ v.jsxs(j.Fragment, {
    children: [/* @__PURE__ */ v.jsx("div", {
      tabIndex: d ? 0 : -1,
      onFocus: N,
      ref: g,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ j.cloneElement(n, {
      ref: C,
      onFocus: $
    }), /* @__PURE__ */ v.jsx("div", {
      tabIndex: d ? 0 : -1,
      onFocus: N,
      ref: b,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (us.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: ji,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: i.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: i.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: i.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: i.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: i.func,
  /**
   * If `true`, focus is locked.
   */
  open: i.bool.isRequired
});
process.env.NODE_ENV !== "production" && (us.propTypes = V0(us.propTypes));
function B$(e) {
  return typeof e == "function" ? e() : e;
}
const cs = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const {
    children: a,
    container: l,
    disablePortal: u = !1
  } = n, [f, d] = j.useState(null), h = en(/* @__PURE__ */ j.isValidElement(a) ? a.ref : null, o);
  if (Gr(() => {
    u || d(B$(l) || document.body);
  }, [l, u]), Gr(() => {
    if (f && !u)
      return Lu(o, f), () => {
        Lu(o, null);
      };
  }, [o, f, u]), u) {
    if (/* @__PURE__ */ j.isValidElement(a)) {
      const g = {
        ref: h
      };
      return /* @__PURE__ */ j.cloneElement(a, g);
    }
    return /* @__PURE__ */ v.jsx(j.Fragment, {
      children: a
    });
  }
  return /* @__PURE__ */ v.jsx(j.Fragment, {
    children: f && /* @__PURE__ */ a6.createPortal(a, f)
  });
});
process.env.NODE_ENV !== "production" && (cs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: i.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: i.oneOfType([wi, i.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: i.bool
});
process.env.NODE_ENV !== "production" && (cs.propTypes = V0(cs.propTypes));
function z$(e) {
  const n = bn(e);
  return n.body === e ? Yr(e).innerWidth > n.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function _i(e, n) {
  n ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function F1(e) {
  return parseInt(Yr(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function W$(e) {
  const o = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, a = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return o || a;
}
function k1(e, n, o, a, l) {
  const u = [n, o, ...a];
  [].forEach.call(e.children, (f) => {
    const d = u.indexOf(f) === -1, h = !W$(f);
    d && h && _i(f, l);
  });
}
function Su(e, n) {
  let o = -1;
  return e.some((a, l) => n(a) ? (o = l, !0) : !1), o;
}
function U$(e, n) {
  const o = [], a = e.container;
  if (!n.disableScrollLock) {
    if (z$(a)) {
      const f = Z0(bn(a));
      o.push({
        value: a.style.paddingRight,
        property: "padding-right",
        el: a
      }), a.style.paddingRight = `${F1(a) + f}px`;
      const d = bn(a).querySelectorAll(".mui-fixed");
      [].forEach.call(d, (h) => {
        o.push({
          value: h.style.paddingRight,
          property: "padding-right",
          el: h
        }), h.style.paddingRight = `${F1(h) + f}px`;
      });
    }
    let u;
    if (a.parentNode instanceof DocumentFragment)
      u = bn(a).body;
    else {
      const f = a.parentElement, d = Yr(a);
      u = (f == null ? void 0 : f.nodeName) === "HTML" && d.getComputedStyle(f).overflowY === "scroll" ? f : a;
    }
    o.push({
      value: u.style.overflow,
      property: "overflow",
      el: u
    }, {
      value: u.style.overflowX,
      property: "overflow-x",
      el: u
    }, {
      value: u.style.overflowY,
      property: "overflow-y",
      el: u
    }), u.style.overflow = "hidden";
  }
  return () => {
    o.forEach(({
      value: u,
      el: f,
      property: d
    }) => {
      u ? f.style.setProperty(d, u) : f.style.removeProperty(d);
    });
  };
}
function V$(e) {
  const n = [];
  return [].forEach.call(e.children, (o) => {
    o.getAttribute("aria-hidden") === "true" && n.push(o);
  }), n;
}
class H$ {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(n, o) {
    let a = this.modals.indexOf(n);
    if (a !== -1)
      return a;
    a = this.modals.length, this.modals.push(n), n.modalRef && _i(n.modalRef, !1);
    const l = V$(o);
    k1(o, n.mount, n.modalRef, l, !0);
    const u = Su(this.containers, (f) => f.container === o);
    return u !== -1 ? (this.containers[u].modals.push(n), a) : (this.containers.push({
      modals: [n],
      container: o,
      restore: null,
      hiddenSiblings: l
    }), a);
  }
  mount(n, o) {
    const a = Su(this.containers, (u) => u.modals.indexOf(n) !== -1), l = this.containers[a];
    l.restore || (l.restore = U$(l, o));
  }
  remove(n, o = !0) {
    const a = this.modals.indexOf(n);
    if (a === -1)
      return a;
    const l = Su(this.containers, (f) => f.modals.indexOf(n) !== -1), u = this.containers[l];
    if (u.modals.splice(u.modals.indexOf(n), 1), this.modals.splice(a, 1), u.modals.length === 0)
      u.restore && u.restore(), n.modalRef && _i(n.modalRef, o), k1(u.container, n.mount, n.modalRef, u.hiddenSiblings, !1), this.containers.splice(l, 1);
    else {
      const f = u.modals[u.modals.length - 1];
      f.modalRef && _i(f.modalRef, !1);
    }
    return a;
  }
  isTopModal(n) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === n;
  }
}
function q$(e) {
  return typeof e == "function" ? e() : e;
}
function Z$(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const K$ = new H$();
function G$(e) {
  const {
    container: n,
    disableEscapeKeyDown: o = !1,
    disableScrollLock: a = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: l = K$,
    closeAfterTransition: u = !1,
    onTransitionEnter: f,
    onTransitionExited: d,
    children: h,
    onClose: g,
    open: b,
    rootRef: x
  } = e, _ = j.useRef({}), P = j.useRef(null), S = j.useRef(null), C = en(S, x), [E, $] = j.useState(!b), N = Z$(h);
  let A = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (A = !1);
  const M = () => bn(P.current), O = () => (_.current.modalRef = S.current, _.current.mount = P.current, _.current), k = () => {
    l.mount(O(), {
      disableScrollLock: a
    }), S.current && (S.current.scrollTop = 0);
  }, L = Eo(() => {
    const te = q$(n) || M().body;
    l.add(O(), te), S.current && k();
  }), J = j.useCallback(() => l.isTopModal(O()), [l]), le = Eo((te) => {
    P.current = te, te && (b && J() ? k() : S.current && _i(S.current, A));
  }), G = j.useCallback(() => {
    l.remove(O(), A);
  }, [A, l]);
  j.useEffect(() => () => {
    G();
  }, [G]), j.useEffect(() => {
    b ? L() : (!N || !u) && G();
  }, [b, G, N, u, L]);
  const ie = (te) => (oe) => {
    var X;
    (X = te.onKeyDown) == null || X.call(te, oe), !(oe.key !== "Escape" || oe.which === 229 || // Wait until IME is settled.
    !J()) && (o || (oe.stopPropagation(), g && g(oe, "escapeKeyDown")));
  }, ae = (te) => (oe) => {
    var X;
    (X = te.onClick) == null || X.call(te, oe), oe.target === oe.currentTarget && g && g(oe, "backdropClick");
  };
  return {
    getRootProps: (te = {}) => {
      const oe = gh(e);
      delete oe.onTransitionEnter, delete oe.onTransitionExited;
      const X = I({}, oe, te);
      return I({
        role: "presentation"
      }, X, {
        onKeyDown: ie(X),
        ref: C
      });
    },
    getBackdropProps: (te = {}) => {
      const oe = te;
      return I({
        "aria-hidden": !0
      }, oe, {
        onClick: ae(oe),
        open: b
      });
    },
    getTransitionProps: () => {
      const te = () => {
        $(!1), f && f();
      }, oe = () => {
        $(!0), d && d(), u && G();
      };
      return {
        onEnter: zp(te, h == null ? void 0 : h.props.onEnter),
        onExited: zp(oe, h == null ? void 0 : h.props.onExited)
      };
    },
    rootRef: C,
    portalRef: le,
    isTopModal: J,
    exited: E,
    hasTransition: N
  };
}
const Y$ = ["onChange", "maxRows", "minRows", "style", "value"];
function za(e) {
  return parseInt(e, 10) || 0;
}
const X$ = {
  shadow: {
    // Visibility needed to hide the extra text area on iPads
    visibility: "hidden",
    // Remove from the content flow
    position: "absolute",
    // Ignore the scrollbar width
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    // Create a new layer, increase the isolation of the computed values
    transform: "translateZ(0)"
  }
};
function J$(e) {
  return e == null || Object.keys(e).length === 0 || e.outerHeightStyle === 0 && !e.overflowing;
}
const Vh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const {
    onChange: a,
    maxRows: l,
    minRows: u = 1,
    style: f,
    value: d
  } = n, h = $e(n, Y$), {
    current: g
  } = j.useRef(d != null), b = j.useRef(null), x = en(o, b), _ = j.useRef(null), P = j.useCallback(() => {
    const E = b.current, N = Yr(E).getComputedStyle(E);
    if (N.width === "0px")
      return {
        outerHeightStyle: 0,
        overflowing: !1
      };
    const A = _.current;
    A.style.width = N.width, A.value = E.value || n.placeholder || "x", A.value.slice(-1) === `
` && (A.value += " ");
    const M = N.boxSizing, O = za(N.paddingBottom) + za(N.paddingTop), k = za(N.borderBottomWidth) + za(N.borderTopWidth), L = A.scrollHeight;
    A.value = "x";
    const J = A.scrollHeight;
    let le = L;
    u && (le = Math.max(Number(u) * J, le)), l && (le = Math.min(Number(l) * J, le)), le = Math.max(le, J);
    const G = le + (M === "border-box" ? O + k : 0), ie = Math.abs(le - L) <= 1;
    return {
      outerHeightStyle: G,
      overflowing: ie
    };
  }, [l, u, n.placeholder]), S = j.useCallback(() => {
    const E = P();
    if (J$(E))
      return;
    const $ = b.current;
    $.style.height = `${E.outerHeightStyle}px`, $.style.overflow = E.overflowing ? "hidden" : "";
  }, [P]);
  Gr(() => {
    const E = () => {
      S();
    };
    let $;
    const N = () => {
      cancelAnimationFrame($), $ = requestAnimationFrame(() => {
        E();
      });
    }, A = H0(E), M = b.current, O = Yr(M);
    O.addEventListener("resize", A);
    let k;
    return typeof ResizeObserver < "u" && (k = new ResizeObserver(process.env.NODE_ENV === "test" ? N : E), k.observe(M)), () => {
      A.clear(), cancelAnimationFrame($), O.removeEventListener("resize", A), k && k.disconnect();
    };
  }, [P, S]), Gr(() => {
    S();
  });
  const C = (E) => {
    g || S(), a && a(E);
  };
  return /* @__PURE__ */ v.jsxs(j.Fragment, {
    children: [/* @__PURE__ */ v.jsx("textarea", I({
      value: d,
      onChange: C,
      ref: x,
      rows: u,
      style: f
    }, h)), /* @__PURE__ */ v.jsx("textarea", {
      "aria-hidden": !0,
      className: n.className,
      readOnly: !0,
      ref: _,
      tabIndex: -1,
      style: I({}, X$.shadow, f, {
        paddingTop: 0,
        paddingBottom: 0
      })
    })]
  });
});
process.env.NODE_ENV !== "production" && (Vh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  className: i.string,
  /**
   * Maximum number of rows to display.
   */
  maxRows: i.oneOfType([i.number, i.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: i.oneOfType([i.number, i.string]),
  /**
   * @ignore
   */
  onChange: i.func,
  /**
   * @ignore
   */
  placeholder: i.string,
  /**
   * @ignore
   */
  style: i.object,
  /**
   * @ignore
   */
  value: i.oneOfType([i.arrayOf(i.string), i.number, i.string])
});
function Uo({
  props: e,
  states: n,
  muiFormControl: o
}) {
  return n.reduce((a, l) => (a[l] = e[l], o && typeof e[l] > "u" && (a[l] = o[l]), a), {});
}
const Bs = /* @__PURE__ */ j.createContext(void 0);
process.env.NODE_ENV !== "production" && (Bs.displayName = "FormControlContext");
function Vo() {
  return j.useContext(Bs);
}
function Hh(e) {
  return /* @__PURE__ */ v.jsx(W0, I({}, e, {
    defaultTheme: Rs,
    themeId: $s
  }));
}
process.env.NODE_ENV !== "production" && (Hh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: i.oneOfType([i.array, i.func, i.number, i.object, i.string, i.bool])
});
function L1(e) {
  return e != null && !(Array.isArray(e) && e.length === 0);
}
function fs(e, n = !1) {
  return e && (L1(e.value) && e.value !== "" || n && L1(e.defaultValue) && e.defaultValue !== "");
}
function Q$(e) {
  return e.startAdornment;
}
function eP(e) {
  return ft("MuiInputBase", e);
}
const wo = ht("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch", "inputAdornedStart", "inputAdornedEnd", "inputHiddenLabel"]), tP = ["aria-describedby", "autoComplete", "autoFocus", "className", "color", "components", "componentsProps", "defaultValue", "disabled", "disableInjectingGlobalStyles", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "size", "slotProps", "slots", "startAdornment", "type", "value"], zs = (e, n) => {
  const {
    ownerState: o
  } = e;
  return [n.root, o.formControl && n.formControl, o.startAdornment && n.adornedStart, o.endAdornment && n.adornedEnd, o.error && n.error, o.size === "small" && n.sizeSmall, o.multiline && n.multiline, o.color && n[`color${Ne(o.color)}`], o.fullWidth && n.fullWidth, o.hiddenLabel && n.hiddenLabel];
}, Ws = (e, n) => {
  const {
    ownerState: o
  } = e;
  return [n.input, o.size === "small" && n.inputSizeSmall, o.multiline && n.inputMultiline, o.type === "search" && n.inputTypeSearch, o.startAdornment && n.inputAdornedStart, o.endAdornment && n.inputAdornedEnd, o.hiddenLabel && n.inputHiddenLabel];
}, nP = (e) => {
  const {
    classes: n,
    color: o,
    disabled: a,
    error: l,
    endAdornment: u,
    focused: f,
    formControl: d,
    fullWidth: h,
    hiddenLabel: g,
    multiline: b,
    readOnly: x,
    size: _,
    startAdornment: P,
    type: S
  } = e, C = {
    root: ["root", `color${Ne(o)}`, a && "disabled", l && "error", h && "fullWidth", f && "focused", d && "formControl", _ && _ !== "medium" && `size${Ne(_)}`, b && "multiline", P && "adornedStart", u && "adornedEnd", g && "hiddenLabel", x && "readOnly"],
    input: ["input", a && "disabled", S === "search" && "inputTypeSearch", b && "inputMultiline", _ === "small" && "inputSizeSmall", g && "inputHiddenLabel", P && "inputAdornedStart", u && "inputAdornedEnd", x && "readOnly"]
  };
  return yt(C, eP, n);
}, Us = Re("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: zs
})(({
  theme: e,
  ownerState: n
}) => I({}, e.typography.body1, {
  color: (e.vars || e).palette.text.primary,
  lineHeight: "1.4375em",
  // 23px
  boxSizing: "border-box",
  // Prevent padding issue with fullWidth.
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  [`&.${wo.disabled}`]: {
    color: (e.vars || e).palette.text.disabled,
    cursor: "default"
  }
}, n.multiline && I({
  padding: "4px 0 5px"
}, n.size === "small" && {
  paddingTop: 1
}), n.fullWidth && {
  width: "100%"
})), Vs = Re("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: Ws
})(({
  theme: e,
  ownerState: n
}) => {
  const o = e.palette.mode === "light", a = I({
    color: "currentColor"
  }, e.vars ? {
    opacity: e.vars.opacity.inputPlaceholder
  } : {
    opacity: o ? 0.42 : 0.5
  }, {
    transition: e.transitions.create("opacity", {
      duration: e.transitions.duration.shorter
    })
  }), l = {
    opacity: "0 !important"
  }, u = e.vars ? {
    opacity: e.vars.opacity.inputPlaceholder
  } : {
    opacity: o ? 0.42 : 0.5
  };
  return I({
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    border: 0,
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    // Reset 23pxthe native input line-height
    margin: 0,
    // Reset for Safari
    WebkitTapHighlightColor: "transparent",
    display: "block",
    // Make the flex item shrink with Firefox
    minWidth: 0,
    width: "100%",
    // Fix IE11 width issue
    animationName: "mui-auto-fill-cancel",
    animationDuration: "10ms",
    "&::-webkit-input-placeholder": a,
    "&::-moz-placeholder": a,
    // Firefox 19+
    "&:-ms-input-placeholder": a,
    // IE11
    "&::-ms-input-placeholder": a,
    // Edge
    "&:focus": {
      outline: 0
    },
    // Reset Firefox invalid required input style
    "&:invalid": {
      boxShadow: "none"
    },
    "&::-webkit-search-decoration": {
      // Remove the padding when type=search.
      WebkitAppearance: "none"
    },
    // Show and hide the placeholder logic
    [`label[data-shrink=false] + .${wo.formControl} &`]: {
      "&::-webkit-input-placeholder": l,
      "&::-moz-placeholder": l,
      // Firefox 19+
      "&:-ms-input-placeholder": l,
      // IE11
      "&::-ms-input-placeholder": l,
      // Edge
      "&:focus::-webkit-input-placeholder": u,
      "&:focus::-moz-placeholder": u,
      // Firefox 19+
      "&:focus:-ms-input-placeholder": u,
      // IE11
      "&:focus::-ms-input-placeholder": u
      // Edge
    },
    [`&.${wo.disabled}`]: {
      opacity: 1,
      // Reset iOS opacity
      WebkitTextFillColor: (e.vars || e).palette.text.disabled
      // Fix opacity Safari bug
    },
    "&:-webkit-autofill": {
      animationDuration: "5000s",
      animationName: "mui-auto-fill"
    }
  }, n.size === "small" && {
    paddingTop: 1
  }, n.multiline && {
    height: "auto",
    resize: "none",
    padding: 0,
    paddingTop: 0
  }, n.type === "search" && {
    // Improve type search style.
    MozAppearance: "textfield"
  });
}), rP = /* @__PURE__ */ v.jsx(Hh, {
  styles: {
    "@keyframes mui-auto-fill": {
      from: {
        display: "block"
      }
    },
    "@keyframes mui-auto-fill-cancel": {
      from: {
        display: "block"
      }
    }
  }
}), qh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a;
  const l = bt({
    props: n,
    name: "MuiInputBase"
  }), {
    "aria-describedby": u,
    autoComplete: f,
    autoFocus: d,
    className: h,
    components: g = {},
    componentsProps: b = {},
    defaultValue: x,
    disabled: _,
    disableInjectingGlobalStyles: P,
    endAdornment: S,
    fullWidth: C = !1,
    id: E,
    inputComponent: $ = "input",
    inputProps: N = {},
    inputRef: A,
    maxRows: M,
    minRows: O,
    multiline: k = !1,
    name: L,
    onBlur: J,
    onChange: le,
    onClick: G,
    onFocus: ie,
    onKeyDown: ae,
    onKeyUp: ee,
    placeholder: Q,
    readOnly: ne,
    renderSuffix: te,
    rows: oe,
    slotProps: X = {},
    slots: Pe = {},
    startAdornment: W,
    type: Y = "text",
    value: he
  } = l, pe = $e(l, tP), re = N.value != null ? N.value : he, {
    current: fe
  } = j.useRef(re != null), ue = j.useRef(), ye = j.useCallback((Fe) => {
    process.env.NODE_ENV !== "production" && Fe && Fe.nodeName !== "INPUT" && !Fe.focus && console.error(["MUI: You have provided a `inputComponent` to the input component", "that does not correctly handle the `ref` prop.", "Make sure the `ref` prop is called with a HTMLInputElement."].join(`
`));
  }, []), ge = en(ue, A, N.ref, ye), [me, _e] = j.useState(!1), be = Vo();
  process.env.NODE_ENV !== "production" && j.useEffect(() => {
    if (be)
      return be.registerEffect();
  }, [be]);
  const Z = Uo({
    props: l,
    muiFormControl: be,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  Z.focused = be ? be.focused : me, j.useEffect(() => {
    !be && _ && me && (_e(!1), J && J());
  }, [be, _, me, J]);
  const Ee = be && be.onFilled, H = be && be.onEmpty, Ie = j.useCallback((Fe) => {
    fs(Fe) ? Ee && Ee() : H && H();
  }, [Ee, H]);
  Gr(() => {
    fe && Ie({
      value: re
    });
  }, [re, Ie, fe]);
  const st = (Fe) => {
    if (Z.disabled) {
      Fe.stopPropagation();
      return;
    }
    ie && ie(Fe), N.onFocus && N.onFocus(Fe), be && be.onFocus ? be.onFocus(Fe) : _e(!0);
  }, ot = (Fe) => {
    J && J(Fe), N.onBlur && N.onBlur(Fe), be && be.onBlur ? be.onBlur(Fe) : _e(!1);
  }, Dt = (Fe, ...Te) => {
    if (!fe) {
      const Lt = Fe.target || ue.current;
      if (Lt == null)
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `inputComponent` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : Kr(1));
      Ie({
        value: Lt.value
      });
    }
    N.onChange && N.onChange(Fe, ...Te), le && le(Fe, ...Te);
  };
  j.useEffect(() => {
    Ie(ue.current);
  }, []);
  const Ft = (Fe) => {
    ue.current && Fe.currentTarget === Fe.target && ue.current.focus(), G && G(Fe);
  };
  let It = $, ze = N;
  k && It === "input" && (oe ? (process.env.NODE_ENV !== "production" && (O || M) && console.warn("MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set."), ze = I({
    type: void 0,
    minRows: oe,
    maxRows: oe
  }, ze)) : ze = I({
    type: void 0,
    maxRows: M,
    minRows: O
  }, ze), It = Vh);
  const xt = (Fe) => {
    Ie(Fe.animationName === "mui-auto-fill-cancel" ? ue.current : {
      value: "x"
    });
  };
  j.useEffect(() => {
    be && be.setAdornedStart(!!W);
  }, [be, W]);
  const Ot = I({}, l, {
    color: Z.color || "primary",
    disabled: Z.disabled,
    endAdornment: S,
    error: Z.error,
    focused: Z.focused,
    formControl: be,
    fullWidth: C,
    hiddenLabel: Z.hiddenLabel,
    multiline: k,
    size: Z.size,
    startAdornment: W,
    type: Y
  }), it = nP(Ot), St = Pe.root || g.Root || Us, xn = X.root || b.root || {}, At = Pe.input || g.Input || Vs;
  return ze = I({}, ze, (a = X.input) != null ? a : b.input), /* @__PURE__ */ v.jsxs(j.Fragment, {
    children: [!P && rP, /* @__PURE__ */ v.jsxs(St, I({}, xn, !rs(St) && {
      ownerState: I({}, Ot, xn.ownerState)
    }, {
      ref: o,
      onClick: Ft
    }, pe, {
      className: He(it.root, xn.className, h, ne && "MuiInputBase-readOnly"),
      children: [W, /* @__PURE__ */ v.jsx(Bs.Provider, {
        value: null,
        children: /* @__PURE__ */ v.jsx(At, I({
          ownerState: Ot,
          "aria-invalid": Z.error,
          "aria-describedby": u,
          autoComplete: f,
          autoFocus: d,
          defaultValue: x,
          disabled: Z.disabled,
          id: E,
          onAnimationStart: xt,
          name: L,
          placeholder: Q,
          readOnly: ne,
          required: Z.required,
          rows: oe,
          value: re,
          onKeyDown: ae,
          onKeyUp: ee,
          type: Y
        }, ze, !rs(At) && {
          as: It,
          ownerState: I({}, Ot, ze.ownerState)
        }, {
          ref: ge,
          className: He(it.input, ze.className, ne && "MuiInputBase-readOnly"),
          onBlur: ot,
          onChange: Dt,
          onFocus: st
        }))
      }), S, te ? te(I({}, Z, {
        startAdornment: W
      })) : null]
    }))]
  });
});
process.env.NODE_ENV !== "production" && (qh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  "aria-describedby": i.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: i.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: i.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: i.oneOfType([i.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), i.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Input: i.elementType,
    Root: i.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: i.shape({
    input: i.object,
    root: i.object
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: i.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: i.bool,
  /**
   * If `true`, GlobalStyles for the auto-fill keyframes will not be injected/removed on mount/unmount. Make sure to inject them at the top of your application.
   * This option is intended to help with boosting the initial rendering performance if you are loading a big amount of Input components at once.
   * @default false
   */
  disableInjectingGlobalStyles: i.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: i.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: i.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: i.bool,
  /**
   * The id of the `input` element.
   */
  id: i.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: vc,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: i.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: dr,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: i.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: i.oneOfType([i.number, i.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: i.oneOfType([i.number, i.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: i.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: i.string,
  /**
   * Callback fired when the `input` is blurred.
   *
   * Notice that the first argument (event) might be undefined.
   */
  onBlur: i.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: i.func,
  /**
   * @ignore
   */
  onClick: i.func,
  /**
   * @ignore
   */
  onFocus: i.func,
  /**
   * Callback fired when the `input` doesn't satisfy its constraints.
   */
  onInvalid: i.func,
  /**
   * @ignore
   */
  onKeyDown: i.func,
  /**
   * @ignore
   */
  onKeyUp: i.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: i.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: i.bool,
  /**
   * @ignore
   */
  renderSuffix: i.func,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: i.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: i.oneOfType([i.number, i.string]),
  /**
   * The size of the component.
   */
  size: i.oneOfType([i.oneOf(["medium", "small"]), i.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: i.shape({
    input: i.object,
    root: i.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: i.shape({
    input: i.elementType,
    root: i.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: i.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: i.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: i.any
});
const Ic = qh;
function oP(e) {
  return ft("MuiInput", e);
}
const gi = I({}, wo, ht("MuiInput", ["root", "underline", "input"])), iP = ["disableUnderline", "components", "componentsProps", "fullWidth", "inputComponent", "multiline", "slotProps", "slots", "type"], aP = (e) => {
  const {
    classes: n,
    disableUnderline: o
  } = e, l = yt({
    root: ["root", !o && "underline"],
    input: ["input"]
  }, oP, n);
  return I({}, n, l);
}, sP = Re(Us, {
  shouldForwardProp: (e) => Wn(e) || e === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [...zs(e, n), !o.disableUnderline && n.underline];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  let a = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return e.vars && (a = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`), I({
    position: "relative"
  }, n.formControl && {
    "label + &": {
      marginTop: 16
    }
  }, !n.disableUnderline && {
    "&::after": {
      borderBottom: `2px solid ${(e.vars || e).palette[n.color].main}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: e.transitions.create("transform", {
        duration: e.transitions.duration.shorter,
        easing: e.transitions.easing.easeOut
      }),
      pointerEvents: "none"
      // Transparent to the hover style.
    },
    [`&.${gi.focused}:after`]: {
      // translateX(0) is a workaround for Safari transform scale bug
      // See https://github.com/mui/material-ui/issues/31766
      transform: "scaleX(1) translateX(0)"
    },
    [`&.${gi.error}`]: {
      "&::before, &::after": {
        borderBottomColor: (e.vars || e).palette.error.main
      }
    },
    "&::before": {
      borderBottom: `1px solid ${a}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: e.transitions.create("border-bottom-color", {
        duration: e.transitions.duration.shorter
      }),
      pointerEvents: "none"
      // Transparent to the hover style.
    },
    [`&:hover:not(.${gi.disabled}, .${gi.error}):before`]: {
      borderBottom: `2px solid ${(e.vars || e).palette.text.primary}`,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        borderBottom: `1px solid ${a}`
      }
    },
    [`&.${gi.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  });
}), lP = Re(Vs, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: Ws
})({}), Hs = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a, l, u, f;
  const d = bt({
    props: n,
    name: "MuiInput"
  }), {
    disableUnderline: h,
    components: g = {},
    componentsProps: b,
    fullWidth: x = !1,
    inputComponent: _ = "input",
    multiline: P = !1,
    slotProps: S,
    slots: C = {},
    type: E = "text"
  } = d, $ = $e(d, iP), N = aP(d), M = {
    root: {
      ownerState: {
        disableUnderline: h
      }
    }
  }, O = S ?? b ? yn(S ?? b, M) : M, k = (a = (l = C.root) != null ? l : g.Root) != null ? a : sP, L = (u = (f = C.input) != null ? f : g.Input) != null ? u : lP;
  return /* @__PURE__ */ v.jsx(Ic, I({
    slots: {
      root: k,
      input: L
    },
    slotProps: O,
    fullWidth: x,
    inputComponent: _,
    multiline: P,
    ref: o,
    type: E
  }, $, {
    classes: N
  }));
});
process.env.NODE_ENV !== "production" && (Hs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: i.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: i.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: i.oneOfType([i.oneOf(["primary", "secondary"]), i.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Input: i.elementType,
    Root: i.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: i.shape({
    input: i.object,
    root: i.object
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: i.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: i.bool,
  /**
   * If `true`, the `input` will not have an underline.
   */
  disableUnderline: i.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: i.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: i.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: i.bool,
  /**
   * The id of the `input` element.
   */
  id: i.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: i.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: i.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: dr,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: i.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: i.oneOfType([i.number, i.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: i.oneOfType([i.number, i.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: i.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: i.string,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: i.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: i.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: i.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: i.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: i.oneOfType([i.number, i.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: i.shape({
    input: i.object,
    root: i.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: i.shape({
    input: i.elementType,
    root: i.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: i.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: i.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: i.any
});
Hs.muiName = "Input";
function uP(e) {
  return ft("MuiFilledInput", e);
}
const kr = I({}, wo, ht("MuiFilledInput", ["root", "underline", "input"])), cP = ["disableUnderline", "components", "componentsProps", "fullWidth", "hiddenLabel", "inputComponent", "multiline", "slotProps", "slots", "type"], fP = (e) => {
  const {
    classes: n,
    disableUnderline: o
  } = e, l = yt({
    root: ["root", !o && "underline"],
    input: ["input"]
  }, uP, n);
  return I({}, n, l);
}, dP = Re(Us, {
  shouldForwardProp: (e) => Wn(e) || e === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [...zs(e, n), !o.disableUnderline && n.underline];
  }
})(({
  theme: e,
  ownerState: n
}) => {
  var o;
  const a = e.palette.mode === "light", l = a ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)", u = a ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)", f = a ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)", d = a ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
  return I({
    position: "relative",
    backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : u,
    borderTopLeftRadius: (e.vars || e).shape.borderRadius,
    borderTopRightRadius: (e.vars || e).shape.borderRadius,
    transition: e.transitions.create("background-color", {
      duration: e.transitions.duration.shorter,
      easing: e.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.hoverBg : f,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : u
      }
    },
    [`&.${kr.focused}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : u
    },
    [`&.${kr.disabled}`]: {
      backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : d
    }
  }, !n.disableUnderline && {
    "&::after": {
      borderBottom: `2px solid ${(o = (e.vars || e).palette[n.color || "primary"]) == null ? void 0 : o.main}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: e.transitions.create("transform", {
        duration: e.transitions.duration.shorter,
        easing: e.transitions.easing.easeOut
      }),
      pointerEvents: "none"
      // Transparent to the hover style.
    },
    [`&.${kr.focused}:after`]: {
      // translateX(0) is a workaround for Safari transform scale bug
      // See https://github.com/mui/material-ui/issues/31766
      transform: "scaleX(1) translateX(0)"
    },
    [`&.${kr.error}`]: {
      "&::before, &::after": {
        borderBottomColor: (e.vars || e).palette.error.main
      }
    },
    "&::before": {
      borderBottom: `1px solid ${e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})` : l}`,
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: e.transitions.create("border-bottom-color", {
        duration: e.transitions.duration.shorter
      }),
      pointerEvents: "none"
      // Transparent to the hover style.
    },
    [`&:hover:not(.${kr.disabled}, .${kr.error}):before`]: {
      borderBottom: `1px solid ${(e.vars || e).palette.text.primary}`
    },
    [`&.${kr.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  }, n.startAdornment && {
    paddingLeft: 12
  }, n.endAdornment && {
    paddingRight: 12
  }, n.multiline && I({
    padding: "25px 12px 8px"
  }, n.size === "small" && {
    paddingTop: 21,
    paddingBottom: 4
  }, n.hiddenLabel && {
    paddingTop: 16,
    paddingBottom: 17
  }, n.hiddenLabel && n.size === "small" && {
    paddingTop: 8,
    paddingBottom: 9
  }));
}), pP = Re(Vs, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: Ws
})(({
  theme: e,
  ownerState: n
}) => I({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12
}, !e.vars && {
  "&:-webkit-autofill": {
    WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
    caretColor: e.palette.mode === "light" ? null : "#fff",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
  }
}, e.vars && {
  "&:-webkit-autofill": {
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
  },
  [e.getColorSchemeSelector("dark")]: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #266798 inset",
      WebkitTextFillColor: "#fff",
      caretColor: "#fff"
    }
  }
}, n.size === "small" && {
  paddingTop: 21,
  paddingBottom: 4
}, n.hiddenLabel && {
  paddingTop: 16,
  paddingBottom: 17
}, n.startAdornment && {
  paddingLeft: 0
}, n.endAdornment && {
  paddingRight: 0
}, n.hiddenLabel && n.size === "small" && {
  paddingTop: 8,
  paddingBottom: 9
}, n.multiline && {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0
})), qs = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a, l, u, f;
  const d = bt({
    props: n,
    name: "MuiFilledInput"
  }), {
    components: h = {},
    componentsProps: g,
    fullWidth: b = !1,
    // declare here to prevent spreading to DOM
    inputComponent: x = "input",
    multiline: _ = !1,
    slotProps: P,
    slots: S = {},
    type: C = "text"
  } = d, E = $e(d, cP), $ = I({}, d, {
    fullWidth: b,
    inputComponent: x,
    multiline: _,
    type: C
  }), N = fP(d), A = {
    root: {
      ownerState: $
    },
    input: {
      ownerState: $
    }
  }, M = P ?? g ? yn(A, P ?? g) : A, O = (a = (l = S.root) != null ? l : h.Root) != null ? a : dP, k = (u = (f = S.input) != null ? f : h.Input) != null ? u : pP;
  return /* @__PURE__ */ v.jsx(Ic, I({
    slots: {
      root: O,
      input: k
    },
    componentsProps: M,
    fullWidth: b,
    inputComponent: x,
    multiline: _,
    ref: o,
    type: C
  }, E, {
    classes: N
  }));
});
process.env.NODE_ENV !== "production" && (qs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: i.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: i.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: i.oneOfType([i.oneOf(["primary", "secondary"]), i.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Input: i.elementType,
    Root: i.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: i.shape({
    input: i.object,
    root: i.object
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: i.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: i.bool,
  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline: i.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: i.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: i.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: i.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: i.bool,
  /**
   * The id of the `input` element.
   */
  id: i.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: i.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: i.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: dr,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: i.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: i.oneOfType([i.number, i.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: i.oneOfType([i.number, i.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: i.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: i.string,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: i.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: i.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: i.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: i.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: i.oneOfType([i.number, i.string]),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: i.shape({
    input: i.object,
    root: i.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: i.shape({
    input: i.elementType,
    root: i.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: i.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: i.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: i.any
});
qs.muiName = "Input";
var B1;
const hP = ["children", "classes", "className", "label", "notched"], gP = Re("fieldset", {
  shouldForwardProp: Wn
})({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
}), mP = Re("legend", {
  shouldForwardProp: Wn
})(({
  ownerState: e,
  theme: n
}) => I({
  float: "unset",
  // Fix conflict with bootstrap
  width: "auto",
  // Fix conflict with bootstrap
  overflow: "hidden"
}, !e.withLabel && {
  padding: 0,
  lineHeight: "11px",
  // sync with `height` in `legend` styles
  transition: n.transitions.create("width", {
    duration: 150,
    easing: n.transitions.easing.easeOut
  })
}, e.withLabel && I({
  display: "block",
  // Fix conflict with normalize.css and sanitize.css
  padding: 0,
  height: 11,
  // sync with `lineHeight` in `legend` styles
  fontSize: "0.75em",
  visibility: "hidden",
  maxWidth: 0.01,
  transition: n.transitions.create("max-width", {
    duration: 50,
    easing: n.transitions.easing.easeOut
  }),
  whiteSpace: "nowrap",
  "& > span": {
    paddingLeft: 5,
    paddingRight: 5,
    display: "inline-block",
    opacity: 0,
    visibility: "visible"
  }
}, e.notched && {
  maxWidth: "100%",
  transition: n.transitions.create("max-width", {
    duration: 100,
    easing: n.transitions.easing.easeOut,
    delay: 50
  })
})));
function Zh(e) {
  const {
    className: n,
    label: o,
    notched: a
  } = e, l = $e(e, hP), u = o != null && o !== "", f = I({}, e, {
    notched: a,
    withLabel: u
  });
  return /* @__PURE__ */ v.jsx(gP, I({
    "aria-hidden": !0,
    className: n,
    ownerState: f
  }, l, {
    children: /* @__PURE__ */ v.jsx(mP, {
      ownerState: f,
      children: u ? /* @__PURE__ */ v.jsx("span", {
        children: o
      }) : (
        // notranslate needed while Google Translate will not fix zero-width space issue
        B1 || (B1 = /* @__PURE__ */ v.jsx("span", {
          className: "notranslate",
          children: "​"
        }))
      )
    })
  }));
}
process.env.NODE_ENV !== "production" && (Zh.propTypes = {
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The label.
   */
  label: i.node,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: i.bool.isRequired,
  /**
   * @ignore
   */
  style: i.object
});
function vP(e) {
  return ft("MuiOutlinedInput", e);
}
const Tr = I({}, wo, ht("MuiOutlinedInput", ["root", "notchedOutline", "input"])), yP = ["components", "fullWidth", "inputComponent", "label", "multiline", "notched", "slots", "type"], bP = (e) => {
  const {
    classes: n
  } = e, a = yt({
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  }, vP, n);
  return I({}, n, a);
}, xP = Re(Us, {
  shouldForwardProp: (e) => Wn(e) || e === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: zs
})(({
  theme: e,
  ownerState: n
}) => {
  const o = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return I({
    position: "relative",
    borderRadius: (e.vars || e).shape.borderRadius,
    [`&:hover .${Tr.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      [`&:hover .${Tr.notchedOutline}`]: {
        borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : o
      }
    },
    [`&.${Tr.focused} .${Tr.notchedOutline}`]: {
      borderColor: (e.vars || e).palette[n.color].main,
      borderWidth: 2
    },
    [`&.${Tr.error} .${Tr.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.error.main
    },
    [`&.${Tr.disabled} .${Tr.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.action.disabled
    }
  }, n.startAdornment && {
    paddingLeft: 14
  }, n.endAdornment && {
    paddingRight: 14
  }, n.multiline && I({
    padding: "16.5px 14px"
  }, n.size === "small" && {
    padding: "8.5px 14px"
  }));
}), _P = Re(Zh, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline",
  overridesResolver: (e, n) => n.notchedOutline
})(({
  theme: e
}) => {
  const n = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
    borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : n
  };
}), EP = Re(Vs, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: Ws
})(({
  theme: e,
  ownerState: n
}) => I({
  padding: "16.5px 14px"
}, !e.vars && {
  "&:-webkit-autofill": {
    WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
    caretColor: e.palette.mode === "light" ? null : "#fff",
    borderRadius: "inherit"
  }
}, e.vars && {
  "&:-webkit-autofill": {
    borderRadius: "inherit"
  },
  [e.getColorSchemeSelector("dark")]: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #266798 inset",
      WebkitTextFillColor: "#fff",
      caretColor: "#fff"
    }
  }
}, n.size === "small" && {
  padding: "8.5px 14px"
}, n.multiline && {
  padding: 0
}, n.startAdornment && {
  paddingLeft: 0
}, n.endAdornment && {
  paddingRight: 0
})), Zs = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a, l, u, f, d;
  const h = bt({
    props: n,
    name: "MuiOutlinedInput"
  }), {
    components: g = {},
    fullWidth: b = !1,
    inputComponent: x = "input",
    label: _,
    multiline: P = !1,
    notched: S,
    slots: C = {},
    type: E = "text"
  } = h, $ = $e(h, yP), N = bP(h), A = Vo(), M = Uo({
    props: h,
    muiFormControl: A,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
  }), O = I({}, h, {
    color: M.color || "primary",
    disabled: M.disabled,
    error: M.error,
    focused: M.focused,
    formControl: A,
    fullWidth: b,
    hiddenLabel: M.hiddenLabel,
    multiline: P,
    size: M.size,
    type: E
  }), k = (a = (l = C.root) != null ? l : g.Root) != null ? a : xP, L = (u = (f = C.input) != null ? f : g.Input) != null ? u : EP;
  return /* @__PURE__ */ v.jsx(Ic, I({
    slots: {
      root: k,
      input: L
    },
    renderSuffix: (J) => /* @__PURE__ */ v.jsx(_P, {
      ownerState: O,
      className: N.notchedOutline,
      label: _ != null && _ !== "" && M.required ? d || (d = /* @__PURE__ */ v.jsxs(j.Fragment, {
        children: [_, " ", "*"]
      })) : _,
      notched: typeof S < "u" ? S : !!(J.startAdornment || J.filled || J.focused)
    }),
    fullWidth: b,
    inputComponent: x,
    multiline: P,
    ref: o,
    type: E
  }, $, {
    classes: I({}, N, {
      notchedOutline: null
    })
  }));
});
process.env.NODE_ENV !== "production" && (Zs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: i.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: i.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: i.oneOfType([i.oneOf(["primary", "secondary"]), i.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Input: i.elementType,
    Root: i.elementType
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: i.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: i.bool,
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: i.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: i.bool,
  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: i.bool,
  /**
   * The id of the `input` element.
   */
  id: i.string,
  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: i.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: i.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: dr,
  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`.
   */
  label: i.node,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: i.oneOf(["dense", "none"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: i.oneOfType([i.number, i.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: i.oneOfType([i.number, i.string]),
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   * @default false
   */
  multiline: i.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: i.string,
  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: i.bool,
  /**
   * Callback fired when the value is changed.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: i.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: i.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: i.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: i.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: i.oneOfType([i.number, i.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: i.shape({
    input: i.elementType,
    root: i.elementType
  }),
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: i.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: i.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: i.any
});
Zs.muiName = "Input";
function TP(e) {
  return ft("MuiFormLabel", e);
}
const Ei = ht("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]), CP = ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"], OP = (e) => {
  const {
    classes: n,
    color: o,
    focused: a,
    disabled: l,
    error: u,
    filled: f,
    required: d
  } = e, h = {
    root: ["root", `color${Ne(o)}`, l && "disabled", u && "error", f && "filled", a && "focused", d && "required"],
    asterisk: ["asterisk", u && "error"]
  };
  return yt(h, TP, n);
}, SP = Re("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: ({
    ownerState: e
  }, n) => I({}, n.root, e.color === "secondary" && n.colorSecondary, e.filled && n.filled)
})(({
  theme: e,
  ownerState: n
}) => I({
  color: (e.vars || e).palette.text.secondary
}, e.typography.body1, {
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  [`&.${Ei.focused}`]: {
    color: (e.vars || e).palette[n.color].main
  },
  [`&.${Ei.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${Ei.error}`]: {
    color: (e.vars || e).palette.error.main
  }
})), wP = Re("span", {
  name: "MuiFormLabel",
  slot: "Asterisk",
  overridesResolver: (e, n) => n.asterisk
})(({
  theme: e
}) => ({
  [`&.${Ei.error}`]: {
    color: (e.vars || e).palette.error.main
  }
})), Kh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiFormLabel"
  }), {
    children: l,
    className: u,
    component: f = "label"
  } = a, d = $e(a, CP), h = Vo(), g = Uo({
    props: a,
    muiFormControl: h,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  }), b = I({}, a, {
    color: g.color || "primary",
    component: f,
    disabled: g.disabled,
    error: g.error,
    filled: g.filled,
    focused: g.focused,
    required: g.required
  }), x = OP(b);
  return /* @__PURE__ */ v.jsxs(SP, I({
    as: f,
    ownerState: b,
    className: He(x.root, u),
    ref: o
  }, d, {
    children: [l, g.required && /* @__PURE__ */ v.jsxs(wP, {
      ownerState: b,
      "aria-hidden": !0,
      className: x.asterisk,
      children: [" ", "*"]
    })]
  }));
});
process.env.NODE_ENV !== "production" && (Kh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: i.oneOfType([i.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), i.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: i.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: i.bool,
  /**
   * If `true`, the label should use filled classes key.
   */
  filled: i.bool,
  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: i.bool,
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: i.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object])
});
function RP(e) {
  return ft("MuiInputLabel", e);
}
ht("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
const $P = ["disableAnimation", "margin", "shrink", "variant", "className"], PP = (e) => {
  const {
    classes: n,
    formControl: o,
    size: a,
    shrink: l,
    disableAnimation: u,
    variant: f,
    required: d
  } = e, h = {
    root: ["root", o && "formControl", !u && "animated", l && "shrink", a && a !== "normal" && `size${Ne(a)}`, f],
    asterisk: [d && "asterisk"]
  }, g = yt(h, RP, n);
  return I({}, n, g);
}, IP = Re(Kh, {
  shouldForwardProp: (e) => Wn(e) || e === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [{
      [`& .${Ei.asterisk}`]: n.asterisk
    }, n.root, o.formControl && n.formControl, o.size === "small" && n.sizeSmall, o.shrink && n.shrink, !o.disableAnimation && n.animated, o.focused && n.focused, n[o.variant]];
  }
})(({
  theme: e,
  ownerState: n
}) => I({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%"
}, n.formControl && {
  position: "absolute",
  left: 0,
  top: 0,
  // slight alteration to spec spacing to match visual spec result
  transform: "translate(0, 20px) scale(1)"
}, n.size === "small" && {
  // Compensation for the `Input.inputSizeSmall` style.
  transform: "translate(0, 17px) scale(1)"
}, n.shrink && {
  transform: "translate(0, -1.5px) scale(0.75)",
  transformOrigin: "top left",
  maxWidth: "133%"
}, !n.disableAnimation && {
  transition: e.transitions.create(["color", "transform", "max-width"], {
    duration: e.transitions.duration.shorter,
    easing: e.transitions.easing.easeOut
  })
}, n.variant === "filled" && I({
  // Chrome's autofill feature gives the input field a yellow background.
  // Since the input field is behind the label in the HTML tree,
  // the input field is drawn last and hides the label with an opaque background color.
  // zIndex: 1 will raise the label above opaque background-colors of input.
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(12px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, n.size === "small" && {
  transform: "translate(12px, 13px) scale(1)"
}, n.shrink && I({
  userSelect: "none",
  pointerEvents: "auto",
  transform: "translate(12px, 7px) scale(0.75)",
  maxWidth: "calc(133% - 24px)"
}, n.size === "small" && {
  transform: "translate(12px, 4px) scale(0.75)"
})), n.variant === "outlined" && I({
  // see comment above on filled.zIndex
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(14px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, n.size === "small" && {
  transform: "translate(14px, 9px) scale(1)"
}, n.shrink && {
  userSelect: "none",
  pointerEvents: "auto",
  // Theoretically, we should have (8+5)*2/0.75 = 34px
  // but it feels a better when it bleeds a bit on the left, so 32px.
  maxWidth: "calc(133% - 32px)",
  transform: "translate(14px, -9px) scale(0.75)"
}))), Gh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    name: "MuiInputLabel",
    props: n
  }), {
    disableAnimation: l = !1,
    shrink: u,
    className: f
  } = a, d = $e(a, $P), h = Vo();
  let g = u;
  typeof g > "u" && h && (g = h.filled || h.focused || h.adornedStart);
  const b = Uo({
    props: a,
    muiFormControl: h,
    states: ["size", "variant", "required", "focused"]
  }), x = I({}, a, {
    disableAnimation: l,
    formControl: h,
    shrink: g,
    size: b.size,
    variant: b.variant,
    required: b.required,
    focused: b.focused
  }), _ = PP(x);
  return /* @__PURE__ */ v.jsx(IP, I({
    "data-shrink": g,
    ownerState: x,
    ref: o,
    className: He(_.root, f)
  }, d, {
    classes: _
  }));
});
process.env.NODE_ENV !== "production" && (Gh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: i.oneOfType([i.oneOf(["error", "info", "primary", "secondary", "success", "warning"]), i.string]),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: i.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: i.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: i.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: i.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: i.oneOf(["dense"]),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: i.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: i.bool,
  /**
   * The size of the component.
   * @default 'normal'
   */
  size: i.oneOfType([i.oneOf(["normal", "small"]), i.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The variant to use.
   */
  variant: i.oneOf(["filled", "outlined", "standard"])
});
function AP(e) {
  return ft("MuiFormControl", e);
}
ht("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const MP = ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"], NP = (e) => {
  const {
    classes: n,
    margin: o,
    fullWidth: a
  } = e, l = {
    root: ["root", o !== "none" && `margin${Ne(o)}`, a && "fullWidth"]
  };
  return yt(l, AP, n);
}, jP = Re("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: ({
    ownerState: e
  }, n) => I({}, n.root, n[`margin${Ne(e.margin)}`], e.fullWidth && n.fullWidth)
})(({
  ownerState: e
}) => I({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  // Reset fieldset default style.
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top"
}, e.margin === "normal" && {
  marginTop: 16,
  marginBottom: 8
}, e.margin === "dense" && {
  marginTop: 8,
  marginBottom: 4
}, e.fullWidth && {
  width: "100%"
})), Yh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiFormControl"
  }), {
    children: l,
    className: u,
    color: f = "primary",
    component: d = "div",
    disabled: h = !1,
    error: g = !1,
    focused: b,
    fullWidth: x = !1,
    hiddenLabel: _ = !1,
    margin: P = "none",
    required: S = !1,
    size: C = "medium",
    variant: E = "outlined"
  } = a, $ = $e(a, MP), N = I({}, a, {
    color: f,
    component: d,
    disabled: h,
    error: g,
    fullWidth: x,
    hiddenLabel: _,
    margin: P,
    required: S,
    size: C,
    variant: E
  }), A = NP(N), [M, O] = j.useState(() => {
    let ee = !1;
    return l && j.Children.forEach(l, (Q) => {
      if (!_u(Q, ["Input", "Select"]))
        return;
      const ne = _u(Q, ["Select"]) ? Q.props.input : Q;
      ne && Q$(ne.props) && (ee = !0);
    }), ee;
  }), [k, L] = j.useState(() => {
    let ee = !1;
    return l && j.Children.forEach(l, (Q) => {
      _u(Q, ["Input", "Select"]) && (fs(Q.props, !0) || fs(Q.props.inputProps, !0)) && (ee = !0);
    }), ee;
  }), [J, le] = j.useState(!1);
  h && J && le(!1);
  const G = b !== void 0 && !h ? b : J;
  let ie;
  if (process.env.NODE_ENV !== "production") {
    const ee = j.useRef(!1);
    ie = () => (ee.current && console.error(["MUI: There are multiple `InputBase` components inside a FormControl.", "This creates visual inconsistencies, only use one `InputBase`."].join(`
`)), ee.current = !0, () => {
      ee.current = !1;
    });
  }
  const ae = j.useMemo(() => ({
    adornedStart: M,
    setAdornedStart: O,
    color: f,
    disabled: h,
    error: g,
    filled: k,
    focused: G,
    fullWidth: x,
    hiddenLabel: _,
    size: C,
    onBlur: () => {
      le(!1);
    },
    onEmpty: () => {
      L(!1);
    },
    onFilled: () => {
      L(!0);
    },
    onFocus: () => {
      le(!0);
    },
    registerEffect: ie,
    required: S,
    variant: E
  }), [M, f, h, g, k, G, x, _, ie, S, C, E]);
  return /* @__PURE__ */ v.jsx(Bs.Provider, {
    value: ae,
    children: /* @__PURE__ */ v.jsx(jP, I({
      as: d,
      ownerState: N,
      className: He(A.root, u),
      ref: o
    }, $, {
      children: l
    }))
  });
});
process.env.NODE_ENV !== "production" && (Yh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: i.oneOfType([i.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), i.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled: i.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: i.bool,
  /**
   * If `true`, the component is displayed in focused state.
   */
  focused: i.bool,
  /**
   * If `true`, the component will take up the full width of its container.
   * @default false
   */
  fullWidth: i.bool,
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel: i.bool,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: i.oneOf(["dense", "none", "normal"]),
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required: i.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: i.oneOfType([i.oneOf(["medium", "small"]), i.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: i.oneOf(["filled", "outlined", "standard"])
});
function DP(e) {
  return ft("MuiFormHelperText", e);
}
const z1 = ht("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var W1;
const FP = ["children", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"], kP = (e) => {
  const {
    classes: n,
    contained: o,
    size: a,
    disabled: l,
    error: u,
    filled: f,
    focused: d,
    required: h
  } = e, g = {
    root: ["root", l && "disabled", u && "error", a && `size${Ne(a)}`, o && "contained", d && "focused", f && "filled", h && "required"]
  };
  return yt(g, DP, n);
}, LP = Re("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, o.size && n[`size${Ne(o.size)}`], o.contained && n.contained, o.filled && n.filled];
  }
})(({
  theme: e,
  ownerState: n
}) => I({
  color: (e.vars || e).palette.text.secondary
}, e.typography.caption, {
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${z1.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
  },
  [`&.${z1.error}`]: {
    color: (e.vars || e).palette.error.main
  }
}, n.size === "small" && {
  marginTop: 4
}, n.contained && {
  marginLeft: 14,
  marginRight: 14
})), Xh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiFormHelperText"
  }), {
    children: l,
    className: u,
    component: f = "p"
  } = a, d = $e(a, FP), h = Vo(), g = Uo({
    props: a,
    muiFormControl: h,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  }), b = I({}, a, {
    component: f,
    contained: g.variant === "filled" || g.variant === "outlined",
    variant: g.variant,
    size: g.size,
    disabled: g.disabled,
    error: g.error,
    filled: g.filled,
    focused: g.focused,
    required: g.required
  }), x = kP(b);
  return /* @__PURE__ */ v.jsx(LP, I({
    as: f,
    ownerState: b,
    className: He(x.root, u),
    ref: o
  }, d, {
    children: l === " " ? (
      // notranslate needed while Google Translate will not fix zero-width space issue
      W1 || (W1 = /* @__PURE__ */ v.jsx("span", {
        className: "notranslate",
        children: "​"
      }))
    ) : l
  }));
});
process.env.NODE_ENV !== "production" && (Xh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: i.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: i.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: i.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: i.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: i.oneOf(["dense"]),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: i.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The variant to use.
   */
  variant: i.oneOfType([i.oneOf(["filled", "outlined", "standard"]), i.string])
});
const Jh = /* @__PURE__ */ j.createContext({});
process.env.NODE_ENV !== "production" && (Jh.displayName = "ListContext");
function BP(e) {
  return ft("MuiList", e);
}
ht("MuiList", ["root", "padding", "dense", "subheader"]);
const zP = ["children", "className", "component", "dense", "disablePadding", "subheader"], WP = (e) => {
  const {
    classes: n,
    disablePadding: o,
    dense: a,
    subheader: l
  } = e;
  return yt({
    root: ["root", !o && "padding", a && "dense", l && "subheader"]
  }, BP, n);
}, UP = Re("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, !o.disablePadding && n.padding, o.dense && n.dense, o.subheader && n.subheader];
  }
})(({
  ownerState: e
}) => I({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), Qh = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiList"
  }), {
    children: l,
    className: u,
    component: f = "ul",
    dense: d = !1,
    disablePadding: h = !1,
    subheader: g
  } = a, b = $e(a, zP), x = j.useMemo(() => ({
    dense: d
  }), [d]), _ = I({}, a, {
    component: f,
    dense: d,
    disablePadding: h
  }), P = WP(_);
  return /* @__PURE__ */ v.jsx(Jh.Provider, {
    value: x,
    children: /* @__PURE__ */ v.jsxs(UP, I({
      as: f,
      className: He(P.root, u),
      ref: o,
      ownerState: _
    }, b, {
      children: [g, l]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Qh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: i.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: i.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: i.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object])
});
const VP = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function wu(e, n, o) {
  return e === n ? e.firstChild : n && n.nextElementSibling ? n.nextElementSibling : o ? null : e.firstChild;
}
function U1(e, n, o) {
  return e === n ? o ? e.firstChild : e.lastChild : n && n.previousElementSibling ? n.previousElementSibling : o ? null : e.lastChild;
}
function e2(e, n) {
  if (n === void 0)
    return !0;
  let o = e.innerText;
  return o === void 0 && (o = e.textContent), o = o.trim().toLowerCase(), o.length === 0 ? !1 : n.repeating ? o[0] === n.keys[0] : o.indexOf(n.keys.join("")) === 0;
}
function mi(e, n, o, a, l, u) {
  let f = !1, d = l(e, n, n ? o : !1);
  for (; d; ) {
    if (d === e.firstChild) {
      if (f)
        return !1;
      f = !0;
    }
    const h = a ? !1 : d.disabled || d.getAttribute("aria-disabled") === "true";
    if (!d.hasAttribute("tabindex") || !e2(d, u) || h)
      d = l(e, d, o);
    else
      return d.focus(), !0;
  }
  return !1;
}
const t2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: a,
    autoFocus: l = !1,
    autoFocusItem: u = !1,
    children: f,
    className: d,
    disabledItemsFocusable: h = !1,
    disableListWrap: g = !1,
    onKeyDown: b,
    variant: x = "selectedMenu"
  } = n, _ = $e(n, VP), P = j.useRef(null), S = j.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Gr(() => {
    l && P.current.focus();
  }, [l]), j.useImperativeHandle(a, () => ({
    adjustStyleForScrollbar: (A, {
      direction: M
    }) => {
      const O = !P.current.style.width;
      if (A.clientHeight < P.current.clientHeight && O) {
        const k = `${Z0(bn(A))}px`;
        P.current.style[M === "rtl" ? "paddingLeft" : "paddingRight"] = k, P.current.style.width = `calc(100% + ${k})`;
      }
      return P.current;
    }
  }), []);
  const C = (A) => {
    const M = P.current, O = A.key, k = bn(M).activeElement;
    if (O === "ArrowDown")
      A.preventDefault(), mi(M, k, g, h, wu);
    else if (O === "ArrowUp")
      A.preventDefault(), mi(M, k, g, h, U1);
    else if (O === "Home")
      A.preventDefault(), mi(M, null, g, h, wu);
    else if (O === "End")
      A.preventDefault(), mi(M, null, g, h, U1);
    else if (O.length === 1) {
      const L = S.current, J = O.toLowerCase(), le = performance.now();
      L.keys.length > 0 && (le - L.lastTime > 500 ? (L.keys = [], L.repeating = !0, L.previousKeyMatched = !0) : L.repeating && J !== L.keys[0] && (L.repeating = !1)), L.lastTime = le, L.keys.push(J);
      const G = k && !L.repeating && e2(k, L);
      L.previousKeyMatched && (G || mi(M, k, !1, h, wu, L)) ? A.preventDefault() : L.previousKeyMatched = !1;
    }
    b && b(A);
  }, E = en(P, o);
  let $ = -1;
  j.Children.forEach(f, (A, M) => {
    if (!/* @__PURE__ */ j.isValidElement(A)) {
      $ === M && ($ += 1, $ >= f.length && ($ = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Oi.isFragment(A) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), A.props.disabled || (x === "selectedMenu" && A.props.selected || $ === -1) && ($ = M), $ === M && (A.props.disabled || A.props.muiSkipListHighlight || A.type.muiSkipListHighlight) && ($ += 1, $ >= f.length && ($ = -1));
  });
  const N = j.Children.map(f, (A, M) => {
    if (M === $) {
      const O = {};
      return u && (O.autoFocus = !0), A.props.tabIndex === void 0 && x === "selectedMenu" && (O.tabIndex = 0), /* @__PURE__ */ j.cloneElement(A, O);
    }
    return A;
  });
  return /* @__PURE__ */ v.jsx(Qh, I({
    role: "menu",
    ref: E,
    className: d,
    onKeyDown: C,
    tabIndex: l ? 0 : -1
  }, _, {
    children: N
  }));
});
process.env.NODE_ENV !== "production" && (t2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: i.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: i.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: i.node,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: i.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: i.bool,
  /**
   * @ignore
   */
  onKeyDown: i.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: i.oneOf(["menu", "selectedMenu"])
});
const n2 = (e) => e.scrollTop;
function ds(e, n) {
  var o, a;
  const {
    timeout: l,
    easing: u,
    style: f = {}
  } = e;
  return {
    duration: (o = f.transitionDuration) != null ? o : typeof l == "number" ? l : l[n.mode] || 0,
    easing: (a = f.transitionTimingFunction) != null ? a : typeof u == "object" ? u[n.mode] : u,
    delay: f.transitionDelay
  };
}
const HP = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Ju(e) {
  return `scale(${e}, ${e ** 2})`;
}
const qP = {
  entering: {
    opacity: 1,
    transform: Ju(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Ru = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Ac = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const {
    addEndListener: a,
    appear: l = !0,
    children: u,
    easing: f,
    in: d,
    onEnter: h,
    onEntered: g,
    onEntering: b,
    onExit: x,
    onExited: _,
    onExiting: P,
    style: S,
    timeout: C = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: E = Yn
  } = n, $ = $e(n, HP), N = B0(), A = j.useRef(), M = Ec(), O = j.useRef(null), k = en(O, u.ref, o), L = (ne) => (te) => {
    if (ne) {
      const oe = O.current;
      te === void 0 ? ne(oe) : ne(oe, te);
    }
  }, J = L(b), le = L((ne, te) => {
    n2(ne);
    const {
      duration: oe,
      delay: X,
      easing: Pe
    } = ds({
      style: S,
      timeout: C,
      easing: f
    }, {
      mode: "enter"
    });
    let W;
    C === "auto" ? (W = M.transitions.getAutoHeightDuration(ne.clientHeight), A.current = W) : W = oe, ne.style.transition = [M.transitions.create("opacity", {
      duration: W,
      delay: X
    }), M.transitions.create("transform", {
      duration: Ru ? W : W * 0.666,
      delay: X,
      easing: Pe
    })].join(","), h && h(ne, te);
  }), G = L(g), ie = L(P), ae = L((ne) => {
    const {
      duration: te,
      delay: oe,
      easing: X
    } = ds({
      style: S,
      timeout: C,
      easing: f
    }, {
      mode: "exit"
    });
    let Pe;
    C === "auto" ? (Pe = M.transitions.getAutoHeightDuration(ne.clientHeight), A.current = Pe) : Pe = te, ne.style.transition = [M.transitions.create("opacity", {
      duration: Pe,
      delay: oe
    }), M.transitions.create("transform", {
      duration: Ru ? Pe : Pe * 0.666,
      delay: Ru ? oe : oe || Pe * 0.333,
      easing: X
    })].join(","), ne.style.opacity = 0, ne.style.transform = Ju(0.75), x && x(ne);
  }), ee = L(_), Q = (ne) => {
    C === "auto" && N.start(A.current || 0, ne), a && a(O.current, ne);
  };
  return /* @__PURE__ */ v.jsx(E, I({
    appear: l,
    in: d,
    nodeRef: O,
    onEnter: le,
    onEntered: G,
    onEntering: J,
    onExit: ae,
    onExited: ee,
    onExiting: ie,
    addEndListener: Q,
    timeout: C === "auto" ? null : C
  }, $, {
    children: (ne, te) => /* @__PURE__ */ j.cloneElement(u, I({
      style: I({
        opacity: 0,
        transform: Ju(0.75),
        visibility: ne === "exited" && !d ? "hidden" : void 0
      }, qP[ne], S, u.props.style),
      ref: k
    }, te))
  }));
});
process.env.NODE_ENV !== "production" && (Ac.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: i.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: i.bool,
  /**
   * A single child content element.
   */
  children: ji.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: i.oneOfType([i.shape({
    enter: i.string,
    exit: i.string
  }), i.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: i.bool,
  /**
   * @ignore
   */
  onEnter: i.func,
  /**
   * @ignore
   */
  onEntered: i.func,
  /**
   * @ignore
   */
  onEntering: i.func,
  /**
   * @ignore
   */
  onExit: i.func,
  /**
   * @ignore
   */
  onExited: i.func,
  /**
   * @ignore
   */
  onExiting: i.func,
  /**
   * @ignore
   */
  style: i.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: i.oneOfType([i.oneOf(["auto"]), i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })])
});
Ac.muiSupportAuto = !0;
const ZP = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], KP = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, r2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = Ec(), l = {
    enter: a.transitions.duration.enteringScreen,
    exit: a.transitions.duration.leavingScreen
  }, {
    addEndListener: u,
    appear: f = !0,
    children: d,
    easing: h,
    in: g,
    onEnter: b,
    onEntered: x,
    onEntering: _,
    onExit: P,
    onExited: S,
    onExiting: C,
    style: E,
    timeout: $ = l,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: N = Yn
  } = n, A = $e(n, ZP), M = j.useRef(null), O = en(M, d.ref, o), k = (Q) => (ne) => {
    if (Q) {
      const te = M.current;
      ne === void 0 ? Q(te) : Q(te, ne);
    }
  }, L = k(_), J = k((Q, ne) => {
    n2(Q);
    const te = ds({
      style: E,
      timeout: $,
      easing: h
    }, {
      mode: "enter"
    });
    Q.style.webkitTransition = a.transitions.create("opacity", te), Q.style.transition = a.transitions.create("opacity", te), b && b(Q, ne);
  }), le = k(x), G = k(C), ie = k((Q) => {
    const ne = ds({
      style: E,
      timeout: $,
      easing: h
    }, {
      mode: "exit"
    });
    Q.style.webkitTransition = a.transitions.create("opacity", ne), Q.style.transition = a.transitions.create("opacity", ne), P && P(Q);
  }), ae = k(S), ee = (Q) => {
    u && u(M.current, Q);
  };
  return /* @__PURE__ */ v.jsx(N, I({
    appear: f,
    in: g,
    nodeRef: M,
    onEnter: J,
    onEntered: le,
    onEntering: L,
    onExit: ie,
    onExited: ae,
    onExiting: G,
    addEndListener: ee,
    timeout: $
  }, A, {
    children: (Q, ne) => /* @__PURE__ */ j.cloneElement(d, I({
      style: I({
        opacity: 0,
        visibility: Q === "exited" && !g ? "hidden" : void 0
      }, KP[Q], E, d.props.style),
      ref: O
    }, ne))
  }));
});
process.env.NODE_ENV !== "production" && (r2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: i.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: i.bool,
  /**
   * A single child content element.
   */
  children: ji.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: i.oneOfType([i.shape({
    enter: i.string,
    exit: i.string
  }), i.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: i.bool,
  /**
   * @ignore
   */
  onEnter: i.func,
  /**
   * @ignore
   */
  onEntered: i.func,
  /**
   * @ignore
   */
  onEntering: i.func,
  /**
   * @ignore
   */
  onExit: i.func,
  /**
   * @ignore
   */
  onExited: i.func,
  /**
   * @ignore
   */
  onExiting: i.func,
  /**
   * @ignore
   */
  style: i.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: i.oneOfType([i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })])
});
function GP(e) {
  return ft("MuiBackdrop", e);
}
ht("MuiBackdrop", ["root", "invisible"]);
const YP = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], XP = (e) => {
  const {
    classes: n,
    invisible: o
  } = e;
  return yt({
    root: ["root", o && "invisible"]
  }, GP, n);
}, JP = Re("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, o.invisible && n.invisible];
  }
})(({
  ownerState: e
}) => I({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, e.invisible && {
  backgroundColor: "transparent"
})), o2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a, l, u;
  const f = bt({
    props: n,
    name: "MuiBackdrop"
  }), {
    children: d,
    className: h,
    component: g = "div",
    components: b = {},
    componentsProps: x = {},
    invisible: _ = !1,
    open: P,
    slotProps: S = {},
    slots: C = {},
    TransitionComponent: E = r2,
    transitionDuration: $
  } = f, N = $e(f, YP), A = I({}, f, {
    component: g,
    invisible: _
  }), M = XP(A), O = (a = S.root) != null ? a : x.root;
  return /* @__PURE__ */ v.jsx(E, I({
    in: P,
    timeout: $
  }, N, {
    children: /* @__PURE__ */ v.jsx(JP, I({
      "aria-hidden": !0
    }, O, {
      as: (l = (u = C.root) != null ? u : b.Root) != null ? l : g,
      className: He(M.root, h, O == null ? void 0 : O.className),
      ownerState: I({}, A, O == null ? void 0 : O.ownerState),
      classes: M,
      ref: o,
      children: d
    }))
  }));
});
process.env.NODE_ENV !== "production" && (o2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Root: i.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: i.shape({
    root: i.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: i.bool,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: i.shape({
    root: i.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: i.shape({
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: i.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: i.oneOfType([i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })])
});
function QP(e) {
  return ft("MuiModal", e);
}
ht("MuiModal", ["root", "hidden", "backdrop"]);
const eI = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], tI = (e) => {
  const {
    open: n,
    exited: o,
    classes: a
  } = e;
  return yt({
    root: ["root", !n && o && "hidden"],
    backdrop: ["backdrop"]
  }, QP, a);
}, nI = Re("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.root, !o.open && o.exited && n.hidden];
  }
})(({
  theme: e,
  ownerState: n
}) => I({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !n.open && n.exited && {
  visibility: "hidden"
})), rI = Re(o2, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, n) => n.backdrop
})({
  zIndex: -1
}), i2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a, l, u, f, d, h;
  const g = bt({
    name: "MuiModal",
    props: n
  }), {
    BackdropComponent: b = rI,
    BackdropProps: x,
    className: _,
    closeAfterTransition: P = !1,
    children: S,
    container: C,
    component: E,
    components: $ = {},
    componentsProps: N = {},
    disableAutoFocus: A = !1,
    disableEnforceFocus: M = !1,
    disableEscapeKeyDown: O = !1,
    disablePortal: k = !1,
    disableRestoreFocus: L = !1,
    disableScrollLock: J = !1,
    hideBackdrop: le = !1,
    keepMounted: G = !1,
    onBackdropClick: ie,
    open: ae,
    slotProps: ee,
    slots: Q
    // eslint-disable-next-line react/prop-types
  } = g, ne = $e(g, eI), te = I({}, g, {
    closeAfterTransition: P,
    disableAutoFocus: A,
    disableEnforceFocus: M,
    disableEscapeKeyDown: O,
    disablePortal: k,
    disableRestoreFocus: L,
    disableScrollLock: J,
    hideBackdrop: le,
    keepMounted: G
  }), {
    getRootProps: oe,
    getBackdropProps: X,
    getTransitionProps: Pe,
    portalRef: W,
    isTopModal: Y,
    exited: he,
    hasTransition: pe
  } = G$(I({}, te, {
    rootRef: o
  })), re = I({}, te, {
    exited: he
  }), fe = tI(re), ue = {};
  if (S.props.tabIndex === void 0 && (ue.tabIndex = "-1"), pe) {
    const {
      onEnter: Ee,
      onExited: H
    } = Pe();
    ue.onEnter = Ee, ue.onExited = H;
  }
  const ye = (a = (l = Q == null ? void 0 : Q.root) != null ? l : $.Root) != null ? a : nI, ge = (u = (f = Q == null ? void 0 : Q.backdrop) != null ? f : $.Backdrop) != null ? u : b, me = (d = ee == null ? void 0 : ee.root) != null ? d : N.root, _e = (h = ee == null ? void 0 : ee.backdrop) != null ? h : N.backdrop, be = So({
    elementType: ye,
    externalSlotProps: me,
    externalForwardedProps: ne,
    getSlotProps: oe,
    additionalProps: {
      ref: o,
      as: E
    },
    ownerState: re,
    className: He(_, me == null ? void 0 : me.className, fe == null ? void 0 : fe.root, !re.open && re.exited && (fe == null ? void 0 : fe.hidden))
  }), Z = So({
    elementType: ge,
    externalSlotProps: _e,
    additionalProps: x,
    getSlotProps: (Ee) => X(I({}, Ee, {
      onClick: (H) => {
        ie && ie(H), Ee != null && Ee.onClick && Ee.onClick(H);
      }
    })),
    className: He(_e == null ? void 0 : _e.className, x == null ? void 0 : x.className, fe == null ? void 0 : fe.backdrop),
    ownerState: re
  });
  return !G && !ae && (!pe || he) ? null : /* @__PURE__ */ v.jsx(cs, {
    ref: W,
    container: C,
    disablePortal: k,
    children: /* @__PURE__ */ v.jsxs(ye, I({}, be, {
      children: [!le && b ? /* @__PURE__ */ v.jsx(ge, I({}, Z)) : null, /* @__PURE__ */ v.jsx(us, {
        disableEnforceFocus: M,
        disableAutoFocus: A,
        disableRestoreFocus: L,
        isEnabled: Y,
        open: ae,
        children: /* @__PURE__ */ j.cloneElement(S, ue)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (i2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: i.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: i.object,
  /**
   * A single child content element.
   */
  children: ji.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: i.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: i.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: i.shape({
    Backdrop: i.elementType,
    Root: i.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: i.shape({
    backdrop: i.oneOfType([i.func, i.object]),
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: i.oneOfType([wi, i.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: i.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: i.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: i.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: i.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: i.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: i.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: i.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: i.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: i.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: i.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: i.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: i.func,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: i.shape({
    backdrop: i.oneOfType([i.func, i.object]),
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: i.shape({
    backdrop: i.elementType,
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object])
});
function oI(e) {
  return ft("MuiPopover", e);
}
ht("MuiPopover", ["root", "paper"]);
const iI = ["onEntering"], aI = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], sI = ["slotProps"];
function V1(e, n) {
  let o = 0;
  return typeof n == "number" ? o = n : n === "center" ? o = e.height / 2 : n === "bottom" && (o = e.height), o;
}
function H1(e, n) {
  let o = 0;
  return typeof n == "number" ? o = n : n === "center" ? o = e.width / 2 : n === "right" && (o = e.width), o;
}
function q1(e) {
  return [e.horizontal, e.vertical].map((n) => typeof n == "number" ? `${n}px` : n).join(" ");
}
function Ya(e) {
  return typeof e == "function" ? e() : e;
}
const lI = (e) => {
  const {
    classes: n
  } = e;
  return yt({
    root: ["root"],
    paper: ["paper"]
  }, oI, n);
}, uI = Re(i2, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), a2 = Re(Tc, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (e, n) => n.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), s2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a, l, u;
  const f = bt({
    props: n,
    name: "MuiPopover"
  }), {
    action: d,
    anchorEl: h,
    anchorOrigin: g = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: b,
    anchorReference: x = "anchorEl",
    children: _,
    className: P,
    container: S,
    elevation: C = 8,
    marginThreshold: E = 16,
    open: $,
    PaperProps: N = {},
    slots: A,
    slotProps: M,
    transformOrigin: O = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: k = Ac,
    transitionDuration: L = "auto",
    TransitionProps: {
      onEntering: J
    } = {},
    disableScrollLock: le = !1
  } = f, G = $e(f.TransitionProps, iI), ie = $e(f, aI), ae = (a = M == null ? void 0 : M.paper) != null ? a : N, ee = j.useRef(), Q = en(ee, ae.ref), ne = I({}, f, {
    anchorOrigin: g,
    anchorReference: x,
    elevation: C,
    marginThreshold: E,
    externalPaperSlotProps: ae,
    transformOrigin: O,
    TransitionComponent: k,
    transitionDuration: L,
    TransitionProps: G
  }), te = lI(ne), oe = j.useCallback(() => {
    if (x === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (b || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), b;
    const Ee = Ya(h), H = Ee && Ee.nodeType === 1 ? Ee : bn(ee.current).body, Ie = H.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const st = H.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && st.top === 0 && st.left === 0 && st.right === 0 && st.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: Ie.top + V1(Ie, g.vertical),
      left: Ie.left + H1(Ie, g.horizontal)
    };
  }, [h, g.horizontal, g.vertical, b, x]), X = j.useCallback((Ee) => ({
    vertical: V1(Ee, O.vertical),
    horizontal: H1(Ee, O.horizontal)
  }), [O.horizontal, O.vertical]), Pe = j.useCallback((Ee) => {
    const H = {
      width: Ee.offsetWidth,
      height: Ee.offsetHeight
    }, Ie = X(H);
    if (x === "none")
      return {
        top: null,
        left: null,
        transformOrigin: q1(Ie)
      };
    const st = oe();
    let ot = st.top - Ie.vertical, Dt = st.left - Ie.horizontal;
    const Ft = ot + H.height, It = Dt + H.width, ze = Yr(Ya(h)), xt = ze.innerHeight - E, Ot = ze.innerWidth - E;
    if (E !== null && ot < E) {
      const it = ot - E;
      ot -= it, Ie.vertical += it;
    } else if (E !== null && Ft > xt) {
      const it = Ft - xt;
      ot -= it, Ie.vertical += it;
    }
    if (process.env.NODE_ENV !== "production" && H.height > xt && H.height && xt && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${H.height - xt}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), E !== null && Dt < E) {
      const it = Dt - E;
      Dt -= it, Ie.horizontal += it;
    } else if (It > Ot) {
      const it = It - Ot;
      Dt -= it, Ie.horizontal += it;
    }
    return {
      top: `${Math.round(ot)}px`,
      left: `${Math.round(Dt)}px`,
      transformOrigin: q1(Ie)
    };
  }, [h, x, oe, X, E]), [W, Y] = j.useState($), he = j.useCallback(() => {
    const Ee = ee.current;
    if (!Ee)
      return;
    const H = Pe(Ee);
    H.top !== null && (Ee.style.top = H.top), H.left !== null && (Ee.style.left = H.left), Ee.style.transformOrigin = H.transformOrigin, Y(!0);
  }, [Pe]);
  j.useEffect(() => (le && window.addEventListener("scroll", he), () => window.removeEventListener("scroll", he)), [h, le, he]);
  const pe = (Ee, H) => {
    J && J(Ee, H), he();
  }, re = () => {
    Y(!1);
  };
  j.useEffect(() => {
    $ && he();
  }), j.useImperativeHandle(d, () => $ ? {
    updatePosition: () => {
      he();
    }
  } : null, [$, he]), j.useEffect(() => {
    if (!$)
      return;
    const Ee = H0(() => {
      he();
    }), H = Yr(h);
    return H.addEventListener("resize", Ee), () => {
      Ee.clear(), H.removeEventListener("resize", Ee);
    };
  }, [h, $, he]);
  let fe = L;
  L === "auto" && !k.muiSupportAuto && (fe = void 0);
  const ue = S || (h ? bn(Ya(h)).body : void 0), ye = (l = A == null ? void 0 : A.root) != null ? l : uI, ge = (u = A == null ? void 0 : A.paper) != null ? u : a2, me = So({
    elementType: ge,
    externalSlotProps: I({}, ae, {
      style: W ? ae.style : I({}, ae.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: C,
      ref: Q
    },
    ownerState: ne,
    className: He(te.paper, ae == null ? void 0 : ae.className)
  }), _e = So({
    elementType: ye,
    externalSlotProps: (M == null ? void 0 : M.root) || {},
    externalForwardedProps: ie,
    additionalProps: {
      ref: o,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: ue,
      open: $
    },
    ownerState: ne,
    className: He(te.root, P)
  }), {
    slotProps: be
  } = _e, Z = $e(_e, sI);
  return /* @__PURE__ */ v.jsx(ye, I({}, Z, !rs(ye) && {
    slotProps: be,
    disableScrollLock: le
  }, {
    children: /* @__PURE__ */ v.jsx(k, I({
      appear: !0,
      in: $,
      onEntering: pe,
      onExited: re,
      timeout: fe
    }, G, {
      children: /* @__PURE__ */ v.jsx(ge, I({}, me, {
        children: _
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (s2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: dr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Mo(i.oneOfType([wi, i.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const n = Ya(e.anchorEl);
      if (n && n.nodeType === 1) {
        const o = n.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && o.top === 0 && o.left === 0 && o.right === 0 && o.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${n}\` instead.`].join(`
`));
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: i.shape({
    horizontal: i.oneOfType([i.oneOf(["center", "left", "right"]), i.number]).isRequired,
    vertical: i.oneOfType([i.oneOf(["bottom", "center", "top"]), i.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: i.shape({
    left: i.number.isRequired,
    top: i.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: i.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: i.oneOfType([wi, i.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: i.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Y0,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: i.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: i.func,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: i.shape({
    component: vc
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: i.shape({
    paper: i.oneOfType([i.func, i.object]),
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: i.shape({
    paper: i.elementType,
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: i.shape({
    horizontal: i.oneOfType([i.oneOf(["center", "left", "right"]), i.number]).isRequired,
    vertical: i.oneOfType([i.oneOf(["bottom", "center", "top"]), i.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: i.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: i.oneOfType([i.oneOf(["auto"]), i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: i.object
});
function cI(e) {
  return ft("MuiMenu", e);
}
ht("MuiMenu", ["root", "paper", "list"]);
const fI = ["onEntering"], dI = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], pI = {
  vertical: "top",
  horizontal: "right"
}, hI = {
  vertical: "top",
  horizontal: "left"
}, gI = (e) => {
  const {
    classes: n
  } = e;
  return yt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, cI, n);
}, mI = Re(s2, {
  shouldForwardProp: (e) => Wn(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), vI = Re(a2, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (e, n) => n.paper
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), yI = Re(t2, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, n) => n.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), l2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a, l;
  const u = bt({
    props: n,
    name: "MuiMenu"
  }), {
    autoFocus: f = !0,
    children: d,
    className: h,
    disableAutoFocusItem: g = !1,
    MenuListProps: b = {},
    onClose: x,
    open: _,
    PaperProps: P = {},
    PopoverClasses: S,
    transitionDuration: C = "auto",
    TransitionProps: {
      onEntering: E
    } = {},
    variant: $ = "selectedMenu",
    slots: N = {},
    slotProps: A = {}
  } = u, M = $e(u.TransitionProps, fI), O = $e(u, dI), k = Xb(), L = I({}, u, {
    autoFocus: f,
    disableAutoFocusItem: g,
    MenuListProps: b,
    onEntering: E,
    PaperProps: P,
    transitionDuration: C,
    TransitionProps: M,
    variant: $
  }), J = gI(L), le = f && !g && _, G = j.useRef(null), ie = (X, Pe) => {
    G.current && G.current.adjustStyleForScrollbar(X, {
      direction: k ? "rtl" : "ltr"
    }), E && E(X, Pe);
  }, ae = (X) => {
    X.key === "Tab" && (X.preventDefault(), x && x(X, "tabKeyDown"));
  };
  let ee = -1;
  j.Children.map(d, (X, Pe) => {
    /* @__PURE__ */ j.isValidElement(X) && (process.env.NODE_ENV !== "production" && Oi.isFragment(X) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), X.props.disabled || ($ === "selectedMenu" && X.props.selected || ee === -1) && (ee = Pe));
  });
  const Q = (a = N.paper) != null ? a : vI, ne = (l = A.paper) != null ? l : P, te = So({
    elementType: N.root,
    externalSlotProps: A.root,
    ownerState: L,
    className: [J.root, h]
  }), oe = So({
    elementType: Q,
    externalSlotProps: ne,
    ownerState: L,
    className: J.paper
  });
  return /* @__PURE__ */ v.jsx(mI, I({
    onClose: x,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: k ? "right" : "left"
    },
    transformOrigin: k ? pI : hI,
    slots: {
      paper: Q,
      root: N.root
    },
    slotProps: {
      root: te,
      paper: oe
    },
    open: _,
    ref: o,
    transitionDuration: C,
    TransitionProps: I({
      onEntering: ie
    }, M),
    ownerState: L
  }, O, {
    classes: S,
    children: /* @__PURE__ */ v.jsx(yI, I({
      onKeyDown: ae,
      actions: G,
      autoFocus: f && (ee === -1 || g),
      autoFocusItem: le,
      variant: $
    }, b, {
      className: He(J.list, b.className),
      children: d
    }))
  }));
});
process.env.NODE_ENV !== "production" && (l2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: i.oneOfType([wi, i.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: i.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: i.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: i.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: i.func,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: i.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: i.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: i.shape({
    paper: i.oneOfType([i.func, i.object]),
    root: i.oneOfType([i.func, i.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: i.shape({
    paper: i.elementType,
    root: i.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: i.oneOfType([i.oneOf(["auto"]), i.number, i.shape({
    appear: i.number,
    enter: i.number,
    exit: i.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: i.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: i.oneOf(["menu", "selectedMenu"])
});
function bI(e) {
  return ft("MuiNativeSelect", e);
}
const Mc = ht("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]), xI = ["className", "disabled", "error", "IconComponent", "inputRef", "variant"], _I = (e) => {
  const {
    classes: n,
    variant: o,
    disabled: a,
    multiple: l,
    open: u,
    error: f
  } = e, d = {
    select: ["select", o, a && "disabled", l && "multiple", f && "error"],
    icon: ["icon", `icon${Ne(o)}`, u && "iconOpen", a && "disabled"]
  };
  return yt(d, bI, n);
}, u2 = ({
  ownerState: e,
  theme: n
}) => I({
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: "none",
  borderRadius: 0,
  // Reset
  cursor: "pointer",
  "&:focus": I({}, n.vars ? {
    backgroundColor: `rgba(${n.vars.palette.common.onBackgroundChannel} / 0.05)`
  } : {
    backgroundColor: n.palette.mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)"
  }, {
    borderRadius: 0
    // Reset Chrome style
  }),
  // Remove IE11 arrow
  "&::-ms-expand": {
    display: "none"
  },
  [`&.${Mc.disabled}`]: {
    cursor: "default"
  },
  "&[multiple]": {
    height: "auto"
  },
  "&:not([multiple]) option, &:not([multiple]) optgroup": {
    backgroundColor: (n.vars || n).palette.background.paper
  },
  // Bump specificity to allow extending custom inputs
  "&&&": {
    paddingRight: 24,
    minWidth: 16
    // So it doesn't collapse.
  }
}, e.variant === "filled" && {
  "&&&": {
    paddingRight: 32
  }
}, e.variant === "outlined" && {
  borderRadius: (n.vars || n).shape.borderRadius,
  "&:focus": {
    borderRadius: (n.vars || n).shape.borderRadius
    // Reset the reset for Chrome style
  },
  "&&&": {
    paddingRight: 32
  }
}), EI = Re("select", {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: Wn,
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.select, n[o.variant], o.error && n.error, {
      [`&.${Mc.multiple}`]: n.multiple
    }];
  }
})(u2), c2 = ({
  ownerState: e,
  theme: n
}) => I({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: "absolute",
  right: 0,
  top: "calc(50% - .5em)",
  // Center vertically, height is 1em
  pointerEvents: "none",
  // Don't block pointer events on the select under the icon.
  color: (n.vars || n).palette.action.active,
  [`&.${Mc.disabled}`]: {
    color: (n.vars || n).palette.action.disabled
  }
}, e.open && {
  transform: "rotate(180deg)"
}, e.variant === "filled" && {
  right: 7
}, e.variant === "outlined" && {
  right: 7
}), TI = Re("svg", {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.icon, o.variant && n[`icon${Ne(o.variant)}`], o.open && n.iconOpen];
  }
})(c2), f2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const {
    className: a,
    disabled: l,
    error: u,
    IconComponent: f,
    inputRef: d,
    variant: h = "standard"
  } = n, g = $e(n, xI), b = I({}, n, {
    disabled: l,
    variant: h,
    error: u
  }), x = _I(b);
  return /* @__PURE__ */ v.jsxs(j.Fragment, {
    children: [/* @__PURE__ */ v.jsx(EI, I({
      ownerState: b,
      className: He(x.select, a),
      disabled: l,
      ref: d || o
    }, g)), n.multiple ? null : /* @__PURE__ */ v.jsx(TI, {
      as: f,
      ownerState: b,
      className: x.icon
    })]
  });
});
process.env.NODE_ENV !== "production" && (f2.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * The CSS class name of the select element.
   */
  className: i.string,
  /**
   * If `true`, the select is disabled.
   */
  disabled: i.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: i.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: i.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: dr,
  /**
   * @ignore
   */
  multiple: i.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: i.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: i.func,
  /**
   * The input value.
   */
  value: i.any,
  /**
   * The variant to use.
   */
  variant: i.oneOf(["standard", "outlined", "filled"])
});
function CI(e) {
  return ft("MuiSelect", e);
}
const vi = ht("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]);
var Z1;
const OI = ["aria-describedby", "aria-label", "autoFocus", "autoWidth", "children", "className", "defaultOpen", "defaultValue", "disabled", "displayEmpty", "error", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"], SI = Re("div", {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [
      // Win specificity over the input base
      {
        [`&.${vi.select}`]: n.select
      },
      {
        [`&.${vi.select}`]: n[o.variant]
      },
      {
        [`&.${vi.error}`]: n.error
      },
      {
        [`&.${vi.multiple}`]: n.multiple
      }
    ];
  }
})(u2, {
  // Win specificity over the input base
  [`&.${vi.select}`]: {
    height: "auto",
    // Resets for multiple select with chips
    minHeight: "1.4375em",
    // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
}), wI = Re("svg", {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (e, n) => {
    const {
      ownerState: o
    } = e;
    return [n.icon, o.variant && n[`icon${Ne(o.variant)}`], o.open && n.iconOpen];
  }
})(c2), RI = Re("input", {
  shouldForwardProp: (e) => L0(e) && e !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (e, n) => n.nativeInput
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});
function K1(e, n) {
  return typeof n == "object" && n !== null ? e === n : String(e) === String(n);
}
function $I(e) {
  return e == null || typeof e == "string" && !e.trim();
}
const PI = (e) => {
  const {
    classes: n,
    variant: o,
    disabled: a,
    multiple: l,
    open: u,
    error: f
  } = e, d = {
    select: ["select", o, a && "disabled", l && "multiple", f && "error"],
    icon: ["icon", `icon${Ne(o)}`, u && "iconOpen", a && "disabled"],
    nativeInput: ["nativeInput"]
  };
  return yt(d, CI, n);
}, d2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  var a;
  const {
    "aria-describedby": l,
    "aria-label": u,
    autoFocus: f,
    autoWidth: d,
    children: h,
    className: g,
    defaultOpen: b,
    defaultValue: x,
    disabled: _,
    displayEmpty: P,
    error: S = !1,
    IconComponent: C,
    inputRef: E,
    labelId: $,
    MenuProps: N = {},
    multiple: A,
    name: M,
    onBlur: O,
    onChange: k,
    onClose: L,
    onFocus: J,
    onOpen: le,
    open: G,
    readOnly: ie,
    renderValue: ae,
    SelectDisplayProps: ee = {},
    tabIndex: Q,
    value: ne,
    variant: te = "standard"
  } = n, oe = $e(n, OI), [X, Pe] = Vp({
    controlled: ne,
    default: x,
    name: "Select"
  }), [W, Y] = Vp({
    controlled: G,
    default: b,
    name: "Select"
  }), he = j.useRef(null), pe = j.useRef(null), [re, fe] = j.useState(null), {
    current: ue
  } = j.useRef(G != null), [ye, ge] = j.useState(), me = en(o, E), _e = j.useCallback((xe) => {
    pe.current = xe, xe && fe(xe);
  }, []), be = re == null ? void 0 : re.parentNode;
  j.useImperativeHandle(me, () => ({
    focus: () => {
      pe.current.focus();
    },
    node: he.current,
    value: X
  }), [X]), j.useEffect(() => {
    b && W && re && !ue && (ge(d ? null : be.clientWidth), pe.current.focus());
  }, [re, d]), j.useEffect(() => {
    f && pe.current.focus();
  }, [f]), j.useEffect(() => {
    if (!$)
      return;
    const xe = bn(pe.current).getElementById($);
    if (xe) {
      const Le = () => {
        getSelection().isCollapsed && pe.current.focus();
      };
      return xe.addEventListener("click", Le), () => {
        xe.removeEventListener("click", Le);
      };
    }
  }, [$]);
  const Z = (xe, Le) => {
    xe ? le && le(Le) : L && L(Le), ue || (ge(d ? null : be.clientWidth), Y(xe));
  }, Ee = (xe) => {
    xe.button === 0 && (xe.preventDefault(), pe.current.focus(), Z(!0, xe));
  }, H = (xe) => {
    Z(!1, xe);
  }, Ie = j.Children.toArray(h), st = (xe) => {
    const Le = Ie.find((gt) => gt.props.value === xe.target.value);
    Le !== void 0 && (Pe(Le.props.value), k && k(xe, Le));
  }, ot = (xe) => (Le) => {
    let gt;
    if (Le.currentTarget.hasAttribute("tabindex")) {
      if (A) {
        gt = Array.isArray(X) ? X.slice() : [];
        const En = X.indexOf(xe.props.value);
        En === -1 ? gt.push(xe.props.value) : gt.splice(En, 1);
      } else
        gt = xe.props.value;
      if (xe.props.onClick && xe.props.onClick(Le), X !== gt && (Pe(gt), k)) {
        const En = Le.nativeEvent || Le, Xr = new En.constructor(En.type, En);
        Object.defineProperty(Xr, "target", {
          writable: !0,
          value: {
            value: gt,
            name: M
          }
        }), k(Xr, xe);
      }
      A || Z(!1, Le);
    }
  }, Dt = (xe) => {
    ie || [
      " ",
      "ArrowUp",
      "ArrowDown",
      // The native select doesn't respond to enter on macOS, but it's recommended by
      // https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
      "Enter"
    ].indexOf(xe.key) !== -1 && (xe.preventDefault(), Z(!0, xe));
  }, Ft = re !== null && W, It = (xe) => {
    !Ft && O && (Object.defineProperty(xe, "target", {
      writable: !0,
      value: {
        value: X,
        name: M
      }
    }), O(xe));
  };
  delete oe["aria-invalid"];
  let ze, xt;
  const Ot = [];
  let it = !1, St = !1;
  (fs({
    value: X
  }) || P) && (ae ? ze = ae(X) : it = !0);
  const xn = Ie.map((xe) => {
    if (!/* @__PURE__ */ j.isValidElement(xe))
      return null;
    process.env.NODE_ENV !== "production" && Oi.isFragment(xe) && console.error(["MUI: The Select component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`));
    let Le;
    if (A) {
      if (!Array.isArray(X))
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: The `value` prop must be an array when using the `Select` component with `multiple`." : Kr(2));
      Le = X.some((gt) => K1(gt, xe.props.value)), Le && it && Ot.push(xe.props.children);
    } else
      Le = K1(X, xe.props.value), Le && it && (xt = xe.props.children);
    return Le && (St = !0), /* @__PURE__ */ j.cloneElement(xe, {
      "aria-selected": Le ? "true" : "false",
      onClick: ot(xe),
      onKeyUp: (gt) => {
        gt.key === " " && gt.preventDefault(), xe.props.onKeyUp && xe.props.onKeyUp(gt);
      },
      role: "option",
      selected: Le,
      value: void 0,
      // The value is most likely not a valid HTML attribute.
      "data-value": xe.props.value
      // Instead, we provide it as a data attribute.
    });
  });
  process.env.NODE_ENV !== "production" && j.useEffect(() => {
    if (!St && !A && X !== "") {
      const xe = Ie.map((Le) => Le.props.value);
      console.warn([`MUI: You have provided an out-of-range value \`${X}\` for the select ${M ? `(name="${M}") ` : ""}component.`, "Consider providing a value that matches one of the available options or ''.", `The available values are ${xe.filter((Le) => Le != null).map((Le) => `\`${Le}\``).join(", ") || '""'}.`].join(`
`));
    }
  }, [St, Ie, A, M, X]), it && (A ? Ot.length === 0 ? ze = null : ze = Ot.reduce((xe, Le, gt) => (xe.push(Le), gt < Ot.length - 1 && xe.push(", "), xe), []) : ze = xt);
  let At = ye;
  !d && ue && re && (At = be.clientWidth);
  let Fe;
  typeof Q < "u" ? Fe = Q : Fe = _ ? null : 0;
  const Te = ee.id || (M ? `mui-component-select-${M}` : void 0), Lt = I({}, n, {
    variant: te,
    value: X,
    open: Ft,
    error: S
  }), ln = PI(Lt), _n = I({}, N.PaperProps, (a = N.slotProps) == null ? void 0 : a.paper), Jn = q0();
  return /* @__PURE__ */ v.jsxs(j.Fragment, {
    children: [/* @__PURE__ */ v.jsx(SI, I({
      ref: _e,
      tabIndex: Fe,
      role: "combobox",
      "aria-controls": Jn,
      "aria-disabled": _ ? "true" : void 0,
      "aria-expanded": Ft ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": u,
      "aria-labelledby": [$, Te].filter(Boolean).join(" ") || void 0,
      "aria-describedby": l,
      onKeyDown: Dt,
      onMouseDown: _ || ie ? null : Ee,
      onBlur: It,
      onFocus: J
    }, ee, {
      ownerState: Lt,
      className: He(ee.className, ln.select, g),
      id: Te,
      children: $I(ze) ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        Z1 || (Z1 = /* @__PURE__ */ v.jsx("span", {
          className: "notranslate",
          children: "​"
        }))
      ) : ze
    })), /* @__PURE__ */ v.jsx(RI, I({
      "aria-invalid": S,
      value: Array.isArray(X) ? X.join(",") : X,
      name: M,
      ref: he,
      "aria-hidden": !0,
      onChange: st,
      tabIndex: -1,
      disabled: _,
      className: ln.nativeInput,
      autoFocus: f,
      ownerState: Lt
    }, oe)), /* @__PURE__ */ v.jsx(wI, {
      as: C,
      className: ln.icon,
      ownerState: Lt
    }), /* @__PURE__ */ v.jsx(l2, I({
      id: `menu-${M || ""}`,
      anchorEl: be,
      open: Ft,
      onClose: H,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center"
      }
    }, N, {
      MenuListProps: I({
        "aria-labelledby": $,
        role: "listbox",
        "aria-multiselectable": A ? "true" : void 0,
        disableListWrap: !0,
        id: Jn
      }, N.MenuListProps),
      slotProps: I({}, N.slotProps, {
        paper: I({}, _n, {
          style: I({
            minWidth: At
          }, _n != null ? _n.style : null)
        })
      }),
      children: xn
    }))]
  });
});
process.env.NODE_ENV !== "production" && (d2.propTypes = {
  /**
   * @ignore
   */
  "aria-describedby": i.string,
  /**
   * @ignore
   */
  "aria-label": i.string,
  /**
   * @ignore
   */
  autoFocus: i.bool,
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: i.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `<MenuItem>` elements.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * The CSS class name of the select element.
   */
  className: i.string,
  /**
   * If `true`, the component is toggled on mount. Use when the component open state is not controlled.
   * You can only use it when the `native` prop is `false` (default).
   */
  defaultOpen: i.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: i.any,
  /**
   * If `true`, the select is disabled.
   */
  disabled: i.bool,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   */
  displayEmpty: i.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: i.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: i.elementType.isRequired,
  /**
   * Imperative handle implementing `{ value: T, node: HTMLElement, focus(): void }`
   * Equivalent to `ref`
   */
  inputRef: dr,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: i.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: i.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   */
  multiple: i.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: i.string,
  /**
   * @ignore
   */
  onBlur: i.func,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * @param {object} [child] The react element that was selected.
   */
  onChange: i.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: i.func,
  /**
   * @ignore
   */
  onFocus: i.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: i.func,
  /**
   * If `true`, the component is shown.
   */
  open: i.bool,
  /**
   * @ignore
   */
  readOnly: i.bool,
  /**
   * Render the selected value.
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: i.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: i.object,
  /**
   * @ignore
   */
  tabIndex: i.oneOfType([i.number, i.string]),
  /**
   * @ignore
   */
  type: i.any,
  /**
   * The input value.
   */
  value: i.any,
  /**
   * The variant to use.
   */
  variant: i.oneOf(["standard", "outlined", "filled"])
});
const II = Do(/* @__PURE__ */ v.jsx("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown"), AI = ["autoWidth", "children", "classes", "className", "defaultOpen", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"], MI = ["root"], NI = (e) => {
  const {
    classes: n
  } = e;
  return n;
}, Nc = {
  name: "MuiSelect",
  overridesResolver: (e, n) => n.root,
  shouldForwardProp: (e) => Wn(e) && e !== "variant",
  slot: "Root"
}, jI = Re(Hs, Nc)(""), DI = Re(Zs, Nc)(""), FI = Re(qs, Nc)(""), jc = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    name: "MuiSelect",
    props: n
  }), {
    autoWidth: l = !1,
    children: u,
    classes: f = {},
    className: d,
    defaultOpen: h = !1,
    displayEmpty: g = !1,
    IconComponent: b = II,
    id: x,
    input: _,
    inputProps: P,
    label: S,
    labelId: C,
    MenuProps: E,
    multiple: $ = !1,
    native: N = !1,
    onClose: A,
    onOpen: M,
    open: O,
    renderValue: k,
    SelectDisplayProps: L,
    variant: J = "outlined"
  } = a, le = $e(a, AI), G = N ? f2 : d2, ie = Vo(), ae = Uo({
    props: a,
    muiFormControl: ie,
    states: ["variant", "error"]
  }), ee = ae.variant || J, Q = I({}, a, {
    variant: ee,
    classes: f
  }), ne = NI(Q), te = $e(ne, MI), oe = _ || {
    standard: /* @__PURE__ */ v.jsx(jI, {
      ownerState: Q
    }),
    outlined: /* @__PURE__ */ v.jsx(DI, {
      label: S,
      ownerState: Q
    }),
    filled: /* @__PURE__ */ v.jsx(FI, {
      ownerState: Q
    })
  }[ee], X = en(o, oe.ref);
  return /* @__PURE__ */ v.jsx(j.Fragment, {
    children: /* @__PURE__ */ j.cloneElement(oe, I({
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent: G,
      inputProps: I({
        children: u,
        error: ae.error,
        IconComponent: b,
        variant: ee,
        type: void 0,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple: $
      }, N ? {
        id: x
      } : {
        autoWidth: l,
        defaultOpen: h,
        displayEmpty: g,
        labelId: C,
        MenuProps: E,
        onClose: A,
        onOpen: M,
        open: O,
        renderValue: k,
        SelectDisplayProps: I({
          id: x
        }, L)
      }, P, {
        classes: P ? yn(te, P.classes) : te
      }, _ ? _.props.inputProps : {})
    }, ($ && N || g) && ee === "outlined" ? {
      notched: !0
    } : {}, {
      ref: X,
      className: He(oe.props.className, d, ne.root)
    }, !_ && {
      variant: ee
    }, le))
  });
});
process.env.NODE_ENV !== "production" && (jc.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: i.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
   * You can only use it when the `native` prop is `false` (default).
   * @default false
   */
  defaultOpen: i.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: i.any,
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: i.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: i.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: i.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: i.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: i.object,
  /**
   * See [OutlinedInput#label](/material-ui/api/outlined-input/#props)
   */
  label: i.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: i.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: i.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: i.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: i.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: i.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: i.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: i.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: i.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: i.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: i.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: i.oneOfType([i.oneOf([""]), i.any]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: i.oneOf(["filled", "outlined", "standard"])
});
jc.muiName = "Select";
function kI(e) {
  return ft("MuiTextField", e);
}
ht("MuiTextField", ["root"]);
const LI = ["autoComplete", "autoFocus", "children", "className", "color", "defaultValue", "disabled", "error", "FormHelperTextProps", "fullWidth", "helperText", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "select", "SelectProps", "type", "value", "variant"], BI = {
  standard: Hs,
  filled: qs,
  outlined: Zs
}, zI = (e) => {
  const {
    classes: n
  } = e;
  return yt({
    root: ["root"]
  }, kI, n);
}, WI = Re(Yh, {
  name: "MuiTextField",
  slot: "Root",
  overridesResolver: (e, n) => n.root
})({}), p2 = /* @__PURE__ */ j.forwardRef(function(n, o) {
  const a = bt({
    props: n,
    name: "MuiTextField"
  }), {
    autoComplete: l,
    autoFocus: u = !1,
    children: f,
    className: d,
    color: h = "primary",
    defaultValue: g,
    disabled: b = !1,
    error: x = !1,
    FormHelperTextProps: _,
    fullWidth: P = !1,
    helperText: S,
    id: C,
    InputLabelProps: E,
    inputProps: $,
    InputProps: N,
    inputRef: A,
    label: M,
    maxRows: O,
    minRows: k,
    multiline: L = !1,
    name: J,
    onBlur: le,
    onChange: G,
    onFocus: ie,
    placeholder: ae,
    required: ee = !1,
    rows: Q,
    select: ne = !1,
    SelectProps: te,
    type: oe,
    value: X,
    variant: Pe = "outlined"
  } = a, W = $e(a, LI), Y = I({}, a, {
    autoFocus: u,
    color: h,
    disabled: b,
    error: x,
    fullWidth: P,
    multiline: L,
    required: ee,
    select: ne,
    variant: Pe
  }), he = zI(Y);
  process.env.NODE_ENV !== "production" && ne && !f && console.error("MUI: `children` must be passed when using the `TextField` component with `select`.");
  const pe = {};
  Pe === "outlined" && (E && typeof E.shrink < "u" && (pe.notched = E.shrink), pe.label = M), ne && ((!te || !te.native) && (pe.id = void 0), pe["aria-describedby"] = void 0);
  const re = q0(C), fe = S && re ? `${re}-helper-text` : void 0, ue = M && re ? `${re}-label` : void 0, ye = BI[Pe], ge = /* @__PURE__ */ v.jsx(ye, I({
    "aria-describedby": fe,
    autoComplete: l,
    autoFocus: u,
    defaultValue: g,
    fullWidth: P,
    multiline: L,
    name: J,
    rows: Q,
    maxRows: O,
    minRows: k,
    type: oe,
    value: X,
    id: re,
    inputRef: A,
    onBlur: le,
    onChange: G,
    onFocus: ie,
    placeholder: ae,
    inputProps: $
  }, pe, N));
  return /* @__PURE__ */ v.jsxs(WI, I({
    className: He(he.root, d),
    disabled: b,
    error: x,
    fullWidth: P,
    ref: o,
    required: ee,
    color: h,
    variant: Pe,
    ownerState: Y
  }, W, {
    children: [M != null && M !== "" && /* @__PURE__ */ v.jsx(Gh, I({
      htmlFor: re,
      id: ue
    }, E, {
      children: M
    })), ne ? /* @__PURE__ */ v.jsx(jc, I({
      "aria-describedby": fe,
      id: re,
      labelId: ue,
      value: X,
      input: ge
    }, te, {
      children: f
    })) : ge, S && /* @__PURE__ */ v.jsx(Xh, I({
      id: fe
    }, _, {
      children: S
    }))]
  }));
});
process.env.NODE_ENV !== "production" && (p2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: i.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: i.bool,
  /**
   * @ignore
   */
  children: i.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: i.object,
  /**
   * @ignore
   */
  className: i.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: i.oneOfType([i.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), i.string]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: i.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: i.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: i.bool,
  /**
   * Props applied to the [`FormHelperText`](/material-ui/api/form-helper-text/) element.
   */
  FormHelperTextProps: i.object,
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: i.bool,
  /**
   * The helper text content.
   */
  helperText: i.node,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: i.string,
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   */
  InputLabelProps: i.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: i.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: i.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: dr,
  /**
   * The label content.
   */
  label: i.node,
  /**
   * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
   * @default 'none'
   */
  margin: i.oneOf(["dense", "none", "normal"]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: i.oneOfType([i.number, i.string]),
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: i.oneOfType([i.number, i.string]),
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline: i.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: i.string,
  /**
   * @ignore
   */
  onBlur: i.func,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: i.func,
  /**
   * @ignore
   */
  onFocus: i.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: i.string,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: i.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: i.oneOfType([i.number, i.string]),
  /**
   * Render a [`Select`](/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select: i.bool,
  /**
   * Props applied to the [`Select`](/material-ui/api/select/) element.
   */
  SelectProps: i.object,
  /**
   * The size of the component.
   */
  size: i.oneOfType([i.oneOf(["medium", "small"]), i.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: i.oneOfType([i.arrayOf(i.oneOfType([i.func, i.object, i.bool])), i.func, i.object]),
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type: i.string,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: i.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: i.oneOf(["filled", "outlined", "standard"])
});
function UI(e) {
  return /* @__PURE__ */ v.jsx(p2, { ...e });
}
const VI = ({ variant: e = "outlined", margin: n = "normal", ...o }, a) => /* @__PURE__ */ v.jsx(
  UI,
  {
    inputRef: a,
    ...Bi,
    variant: e,
    margin: n,
    fullWidth: !0,
    ...o
  }
), HI = ps(VI);
function qA({
  label: e = "Phone",
  name: n = "phone",
  helperText: o,
  onChange: a,
  onValidPhone: l,
  initialValue: u = "",
  error: f = !1,
  handleChangeCountry: d,
  value: h,
  InputProps: g,
  shouldHaveClearButton: b = !1
}) {
  const x = Vr(null), [_, P] = jn("US"), [S, C] = jn(u), E = qr(
    () => Uh("countryCode", _),
    [_]
  ), $ = (O) => {
    P(O), d && d(O), setTimeout(() => {
      var k;
      (k = x.current) == null || k.focus();
    }, 10);
  }, N = (O) => {
    f_.safeParse(S).success && (l == null || l(O));
  }, A = (O) => {
    C(O), a == null || a(O);
  };
  Ri(() => {
    N(S);
  }, [S]);
  const M = {
    inputRef: x,
    ...Bi,
    label: e,
    name: `_${n}`,
    helperText: o,
    // if the value prop is passed, use it, otherwise use the value from component state
    // this allows the parent component to control the value of the input field
    value: h ?? S,
    error: f,
    onChange: (O) => {
      A(O.target.value);
    },
    inputProps: {
      // Receive unmasked value on change.
      unmask: !0,
      // Make placeholder always visible
      lazy: !1,
      mask: E == null ? void 0 : E.mask,
      placeholderChar: "_",
      // Tab index for each block.
      tabIndex: 0
    },
    InputProps: {
      ...g,
      inputComponent: _h,
      startAdornment: /* @__PURE__ */ v.jsx(l0, { position: "start", children: /* @__PURE__ */ v.jsx(M$, { value: _, onChange: $ }) }),
      endAdornment: b && /* @__PURE__ */ v.jsx(
        xh,
        {
          handleClear: () => {
            A("");
          }
        }
      )
    },
    fullWidth: !0
  };
  return /* @__PURE__ */ v.jsxs(an, { width: "100%", children: [
    /* @__PURE__ */ v.jsx("input", { name: n, value: S, readOnly: !0, type: "hidden", hidden: !0 }),
    /* @__PURE__ */ v.jsx(HI, { ...M })
  ] });
}
let Wa;
const qI = new Uint8Array(16);
function ZI() {
  if (!Wa && (Wa = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Wa))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Wa(qI);
}
const Vt = [];
for (let e = 0; e < 256; ++e)
  Vt.push((e + 256).toString(16).slice(1));
function KI(e, n = 0) {
  return Vt[e[n + 0]] + Vt[e[n + 1]] + Vt[e[n + 2]] + Vt[e[n + 3]] + "-" + Vt[e[n + 4]] + Vt[e[n + 5]] + "-" + Vt[e[n + 6]] + Vt[e[n + 7]] + "-" + Vt[e[n + 8]] + Vt[e[n + 9]] + "-" + Vt[e[n + 10]] + Vt[e[n + 11]] + Vt[e[n + 12]] + Vt[e[n + 13]] + Vt[e[n + 14]] + Vt[e[n + 15]];
}
const GI = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), G1 = {
  randomUUID: GI
};
function YI(e, n, o) {
  if (G1.randomUUID && !n && !e)
    return G1.randomUUID();
  e = e || {};
  const a = e.random || (e.rng || ZI)();
  return a[6] = a[6] & 15 | 64, a[8] = a[8] & 63 | 128, KI(a);
}
function XI(e, n) {
  const o = ec(), a = Vr(Array.from({ length: 6 }, () => YI())), [l, u] = jn([]), f = Vr(null), d = Vr([]), [h, g] = jn(!1);
  bv(
    n,
    () => ({
      get value() {
        return l.join("");
      },
      set value($) {
        var N;
        u($.split("")), (N = e.onChange) == null || N.call(e, { target: { value: $ } });
      },
      focus() {
        var $, N;
        ($ = d.current[0]) == null || $.click(), (N = d.current[0]) == null || N.focus();
      },
      blur() {
        d.current.forEach(($) => $ == null ? void 0 : $.blur());
      },
      clear() {
        u([]);
      }
    }),
    [e, l]
  );
  const b = {
    boxSizing: "content-box",
    direction: "row",
    alignItems: "center",
    spacing: 1.25,
    sx: {
      "& input": {
        textAlign: "center",
        fontWeight: 500,
        height: 30,
        [o.breakpoints.down("xs")]: {
          height: 16,
          fontSize: 16,
          pt: 1,
          pb: 1,
          px: 1
        },
        [o.breakpoints.up("xs")]: {
          fontSize: 28,
          px: 1
        },
        fontSize: 32,
        py: 1.75
      }
    }
  }, x = qr(
    () => ({
      inputProps: {
        inputMode: "numeric",
        pattern: "[0-9]*",
        autoCorrect: "off",
        autoCapitalize: "off"
      },
      sx: {
        pointerEvents: "none",
        ...h && {
          "&:hover fieldset": {
            borderColor: `${o.palette.primary.main}!important`
          },
          "& fieldset": {
            borderWidth: 2,
            borderColor: o.palette.primary.main
          }
        }
      }
    }),
    [h, o.palette.primary.main]
  ), _ = Kn(() => {
    const $ = l.join(""), N = d.current[$.length];
    N == null || N.focus(), N == null || N.select();
  }, [l]), P = Kn(
    ($) => {
      const N = $.target.value;
      !N.length || !/^[0-9]{1,6}$/.test(N) || u((A) => {
        var k;
        const M = N.length === 6 ? [...N] : [...A, ...N], O = M.join("");
        return f.current && (f.current.value = M.join("")), O.length === 6 && ((k = e.onChange) == null || k.call(e, { target: { value: O } })), M;
      });
    },
    [e]
  ), S = Kn(($) => {
    $.key === "Backspace" && u((N) => {
      const A = [...N.slice(0, -1)];
      return f.current && (f.current.value = A.join("")), A;
    });
  }, []), C = Kn(() => {
    _(), g(!0);
  }, [_]), E = Kn(
    ($) => new Array(3).fill(void 0).map((N, A) => /* @__PURE__ */ v.jsx(
      Zr,
      {
        inputRef: (M) => d.current[A + $] = M,
        autoComplete: "one-time-code",
        autoFocus: A + $ === 0,
        value: l[A + $] || "",
        disabled: e.disabled,
        onChange: P,
        onKeyUp: S,
        onFocus: C,
        onBlur: () => {
          g(!1);
        },
        ...x,
        "data-testid": `otp-input-${A + $}`
      },
      a.current[A + $]
    )),
    [
      P,
      C,
      S,
      x,
      e.disabled,
      l
    ]
  );
  return Ri(() => {
    _();
  }, [_]), /* @__PURE__ */ v.jsxs(an, { width: "100%", sx: e.sx, children: [
    /* @__PURE__ */ v.jsx("div", { style: { display: "none!important", pointerEvents: "none" }, children: /* @__PURE__ */ v.jsx(
      Zr,
      {
        inputRef: f,
        name: e.name,
        type: "text",
        value: l.join("") || "",
        sx: { pointerEvents: "none", display: "none" },
        inputProps: { hidden: !0 }
      }
    ) }),
    /* @__PURE__ */ v.jsxs(Ht, { ...b, onClick: _, children: [
      E(0),
      /* @__PURE__ */ v.jsx(cr, { sx: { fontWeight: "700", fontSize: 32 }, children: "-" }),
      E(3)
    ] })
  ] });
}
const ZA = ps(XI);
function KA(e) {
  return /* @__PURE__ */ v.jsx(
    an,
    {
      component: "svg",
      xmlns: "http://www.w3.org/2000/svg",
      width: 268,
      height: 270,
      sx: e.sx,
      children: /* @__PURE__ */ v.jsxs("g", { fill: "none", fillRule: "nonzero", transform: "translate(.07)", children: [
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M241.767 233.564a.487.487 0 0 1-.388-.78 90.679 90.679 0 0 0 2.515-3.475.485.485 0 1 1 .8.551 92.592 92.592 0 0 1-2.54 3.513.483.483 0 0 1-.387.191ZM247.253 225.485a.486.486 0 0 1-.415-.737 87.053 87.053 0 0 0 9.446-22.082 87.336 87.336 0 0 0 3.019-25.12.485.485 0 0 1 .474-.497.496.496 0 0 1 .497.474 88.343 88.343 0 0 1-3.053 25.4 87.985 87.985 0 0 1-9.55 22.327.491.491 0 0 1-.418.235Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M251.876 205.767a2.867 2.867 0 0 1-2.757-3.648 2.82 2.82 0 0 1 1.356-1.708 2.835 2.835 0 0 1 2.172-.245 2.869 2.869 0 0 1 1.962 3.534 2.82 2.82 0 0 1-1.356 1.709 2.842 2.842 0 0 1-1.377.358Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M251.852 201.024c-.315 0-.625.079-.907.235a1.856 1.856 0 0 0-.893 1.125 1.894 1.894 0 0 0 1.298 2.335c.483.14.993.083 1.432-.161.439-.243.755-.642.892-1.125a1.896 1.896 0 0 0-1.822-2.41ZM255.991 195.465a.499.499 0 0 1-.227-.055c-2.719-1.435-5.336-3.118-5.362-3.134a.486.486 0 0 1-.01-.81l5.333-3.635a.485.485 0 0 1 .76.402l-.007 6.747a.485.485 0 0 1-.487.485Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M251.55 191.852a81.89 81.89 0 0 0 3.957 2.316l.004-5.016-3.96 2.7Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.light,
            d: "M22.552 136.302c20.526-20.907-18.147-59.85-8.532-87.986 12.944-37.88 118.252-70.356 189.133-29.118 54.566 31.746 76.598 112.277 54.04 143.691-11.424 15.907-33.943 18.864-36.905 37.949-2.807 18.078 15.73 26.173 12.95 39.434-4.824 23.008-68.388 35.652-123.097 25.849-17.025-3.051-77.386-14.423-100.386-60.187-1.826-3.633-19.098-38.718-2.844-58.235 5.633-6.77 10.169-5.824 15.641-11.397Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M134.755 179.656H51.647a30.635 30.635 0 0 1-21.291-8.549c-5.797-5.55-9.101-12.992-9.305-20.95a37.996 37.996 0 0 1 5.566-20.857c.14-.23.44-.301.669-.162.228.14.3.439.16.668-3.555 5.802-5.435 12.498-5.435 19.363 0 .322.004.642.012.962.196 7.702 3.395 14.901 9.004 20.276a29.675 29.675 0 0 0 20.62 8.277h83.108a.486.486 0 0 1 0 .972ZM75.607 74.022a.486.486 0 0 1-.363-.809 93.923 93.923 0 0 1 4.106-4.316.485.485 0 0 1 .681.69 93.544 93.544 0 0 0-4.063 4.273.474.474 0 0 1-.361.162ZM110.32 49.703a.485.485 0 0 1-.18-.937c11.108-4.44 22.77-6.69 34.664-6.69.505 0 1.01.004 1.515.011a.486.486 0 0 1-.007.972h-.009c-.5-.01-.999-.012-1.5-.012-11.769 0-23.31 2.228-34.3 6.62a.5.5 0 0 1-.182.036ZM190.005 54.797a.472.472 0 0 1-.236-.061 92.198 92.198 0 0 0-29.28-10.345.486.486 0 1 1 .165-.958 93.207 93.207 0 0 1 29.589 10.455.485.485 0 0 1-.238.91Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M194.766 57.641a.493.493 0 0 1-.262-.076 92.554 92.554 0 0 0-4.736-2.83.485.485 0 1 1 .474-.847c1.613.9 3.223 1.86 4.787 2.858a.485.485 0 0 1-.263.895ZM250.49 122.686a.491.491 0 0 1-.272-.084 37.555 37.555 0 0 0-14.685-5.946.486.486 0 0 1-.392-.377 91.874 91.874 0 0 0-8.148-22.957.486.486 0 0 1 .865-.443 92.805 92.805 0 0 1 8.165 22.879 38.516 38.516 0 0 1 14.737 6.041.485.485 0 0 1-.27.887ZM242.209 179.656h-22.876a.486.486 0 0 1 0-.972h22.876c13.516 0 24.586-10.943 24.678-24.393l.002-.266a37.852 37.852 0 0 0-10.987-26.701.485.485 0 0 1 .689-.683 38.824 38.824 0 0 1 11.27 27.387l-.002.27c-.096 13.982-11.602 25.358-25.65 25.358Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "M25.212 149.169c0-18.346 14.558-33.29 32.752-33.911 9.116-39.534 44.534-69.009 86.837-69.009 43.79 0 80.203 31.587 87.7 73.218 17.516 1.78 31.184 16.574 31.184 34.56v.242c-.082 11.758-9.718 21.213-21.477 21.213H51.647c-14.211 0-26.061-11.225-26.424-25.431a35.281 35.281 0 0 1-.011-.882Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M242.209 175.968H51.647a26.97 26.97 0 0 1-18.74-7.523c-5.089-4.874-7.99-11.402-8.168-18.381a36.32 36.32 0 0 1-.012-.894c0-8.985 3.442-17.487 9.691-23.94 6.148-6.348 14.36-10.047 23.16-10.442 4.53-19.269 15.55-36.743 31.057-49.236a89.273 89.273 0 0 1 25.872-14.536c9.701-3.484 19.894-5.251 30.297-5.251 21.134 0 41.65 7.498 57.773 21.112 15.839 13.374 26.603 31.882 30.34 52.149 8.49.952 16.33 4.963 22.107 11.32a35.139 35.139 0 0 1 9.15 23.684v.245c-.085 11.96-9.937 21.693-21.965 21.693ZM144.802 46.735c-41.532 0-77.045 28.222-86.364 68.632l-.083.365-.373.013c-18.103.62-32.285 15.302-32.285 33.427 0 .29.005.58.01.87C26.058 163.804 37.695 175 51.645 175H242.21c11.496 0 20.913-9.3 20.992-20.73v-.24c0-17.646-13.219-32.295-30.749-34.077l-.364-.036-.064-.36c-7.598-42.198-44.28-72.822-87.222-72.822Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M60.193 249.298c3.116-2.546 6.387-4.918 9.735-7.183 6.798-4.594 13.962-8.7 21.203-12.679 3.809-2.093 7.764-3.987 11.667-5.934 3.927-1.96 7.865-3.901 11.804-5.842 3.6-1.773 7.2-3.548 10.792-5.33 8.167-27.61 17.037-58.912 15.276-58.912l-133.91-3.78c-3.152 0-5.267 2.565-4.714 5.717l16.228 92.527c.553 3.152 3.567 5.716 6.72 5.716h29.799c1.758-1.48 3.622-2.848 5.4-4.3Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M54.794 254.084H24.995c-3.377 0-6.606-2.744-7.197-6.119L1.57 155.437c-.295-1.685.095-3.271 1.1-4.468.986-1.173 2.439-1.818 4.093-1.818l133.923 3.78a.62.62 0 0 1 .492.259c.434.582 1.588 2.127-15.315 59.275a.485.485 0 0 1-.25.297 4618.546 4618.546 0 0 1-10.794 5.332c-3.978 1.959-7.873 3.88-11.803 5.84-.882.441-1.766.879-2.65 1.316-2.98 1.473-6.061 2.996-9.001 4.612-6.45 3.544-14.009 7.82-21.165 12.656-3.666 2.478-6.84 4.818-9.7 7.156-.782.639-1.592 1.27-2.376 1.882-1.002.78-2.037 1.587-3.018 2.414a.484.484 0 0 1-.312.114ZM6.75 150.123c-1.35 0-2.538.523-3.336 1.473-.816.972-1.132 2.277-.886 3.674l16.228 92.527c.513 2.93 3.313 5.314 6.24 5.314h29.622c.954-.799 1.947-1.572 2.91-2.323.78-.607 1.585-1.236 2.36-1.868 2.882-2.356 6.078-4.714 9.77-7.208 7.19-4.858 14.773-9.147 21.241-12.703 2.96-1.625 6.049-3.154 9.039-4.63.883-.437 1.765-.874 2.646-1.313 3.932-1.962 7.828-3.884 11.807-5.844 3.537-1.742 7.073-3.484 10.602-5.235 14.144-47.828 15.593-56.678 15.424-58.092L6.749 150.123Zm133.902 3.78h.02-.02Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M144.494 149.96H9.538c-2.978 0-4.97 2.415-4.448 5.393l16.228 92.527c.522 2.978 3.36 5.393 6.34 5.393h134.955c2.978 0 4.97-2.415 4.448-5.393l-16.228-92.527c-.522-2.978-3.36-5.393-6.34-5.393Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M162.614 253.76H27.657c-3.199 0-6.257-2.599-6.818-5.795L4.611 155.437c-.28-1.6.09-3.106 1.042-4.24.933-1.111 2.314-1.724 3.885-1.724h134.956c3.199 0 6.257 2.6 6.818 5.796l16.228 92.526c.28 1.6-.09 3.106-1.042 4.24-.933 1.113-2.313 1.726-3.884 1.726ZM9.538 150.447c-1.278 0-2.394.488-3.14 1.378-.766.91-1.06 2.134-.828 3.446l16.227 92.527c.483 2.753 3.112 4.99 5.862 4.99h134.955c1.28 0 2.395-.488 3.141-1.377.765-.91 1.059-2.134.83-3.446l-16.229-92.529c-.482-2.753-3.112-4.99-5.86-4.99H9.537Z"
          }
        ),
        /* @__PURE__ */ v.jsxs("g", { fill: "#000", children: [
          /* @__PURE__ */ v.jsx("path", { d: "M82.291 253.687H27.198a4.033 4.033 0 0 0-4.028 4.029 4.033 4.033 0 0 0 4.028 4.028h56.739c2.222-.001-1.646-8.057-1.646-8.057Z" }),
          /* @__PURE__ */ v.jsx("path", { d: "M83.937 262.228H27.198a4.52 4.52 0 0 1-4.514-4.514 4.518 4.518 0 0 1 4.514-4.514h55.093c.188 0 .357.107.438.275.744 1.552 3.1 6.733 2.146 8.252-.204.324-.536.501-.938.501Zm-56.739-8.055a3.547 3.547 0 0 0-3.543 3.543 3.547 3.547 0 0 0 3.543 3.543h56.739c.086 0 .1-.02.116-.047.446-.708-.708-4.143-2.069-7.039H27.198Z" })
        ] }),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.dark,
            d: "M193.874 253.687H63.82a4.028 4.028 0 1 0 0 8.057h130.053a4.028 4.028 0 1 0 0-8.057Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M193.874 262.228H63.82a4.52 4.52 0 0 1-4.514-4.514 4.518 4.518 0 0 1 4.514-4.514h130.053a4.52 4.52 0 0 1 4.514 4.514 4.518 4.518 0 0 1-4.514 4.514ZM63.82 254.173a3.547 3.547 0 0 0-3.543 3.543 3.546 3.546 0 0 0 3.543 3.543h130.053a3.548 3.548 0 0 0 3.542-3.543 3.548 3.548 0 0 0-3.542-3.543H63.82Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "M141.327 157.69H15.417c-1.306 0-2.18 1.06-1.951 2.366l.305 1.74c.23 1.307 1.475 2.366 2.781 2.366h125.91c1.306 0 2.18-1.059 1.951-2.365l-.305-1.74c-.23-1.307-1.475-2.366-2.781-2.366Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M141.284 160.926c.151.86-.424 1.558-1.284 1.558-.86 0-1.68-.697-1.831-1.558-.15-.86.424-1.557 1.284-1.557.86 0 1.68.697 1.831 1.557Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "M71.632 243.357a39.18 39.18 0 0 1-3.484-.158.487.487 0 0 1 .088-.968 37.42 37.42 0 0 0 3.83.152h.006a.485.485 0 0 1 .006.971c-.149.003-.297.003-.446.003Zm4.312-.256a.485.485 0 0 1-.057-.966 32.772 32.772 0 0 0 3.766-.676.486.486 0 0 1 .228.945 34.02 34.02 0 0 1-3.877.696l-.06.001Zm-11.596-.441a.491.491 0 0 1-.092-.01 41.754 41.754 0 0 1-3.82-.92.486.486 0 1 1 .272-.932 40.88 40.88 0 0 0 3.73.898.486.486 0 0 1-.09.964Zm19.128-1.381a.487.487 0 0 1-.171-.94 29.732 29.732 0 0 0 3.481-1.569.485.485 0 1 1 .457.857 30.743 30.743 0 0 1-3.596 1.621.47.47 0 0 1-.17.03Zm-26.58-.781a.475.475 0 0 1-.177-.034 45.367 45.367 0 0 1-3.59-1.591.487.487 0 0 1 .432-.87c1.15.57 2.33 1.093 3.51 1.557a.485.485 0 0 1-.175.938Zm33.419-2.857a.484.484 0 0 1-.283-.88 28.56 28.56 0 0 0 2.945-2.426.485.485 0 0 1 .667.705 29.124 29.124 0 0 1-3.046 2.51.491.491 0 0 1-.283.09Zm-40.371-.59a.492.492 0 0 1-.252-.07 48.117 48.117 0 0 1-3.269-2.17.486.486 0 0 1 .57-.787 47.276 47.276 0 0 0 3.204 2.126.485.485 0 0 1-.253.901Zm-6.287-4.553a.484.484 0 0 1-.316-.117 48.73 48.73 0 0 1-2.874-2.671.487.487 0 0 1 .69-.685 46.739 46.739 0 0 0 2.816 2.617.486.486 0 0 1-.316.856Zm52.282-.176a.486.486 0 0 1-.379-.79 28.36 28.36 0 0 0 2.182-3.13.486.486 0 0 1 .834.5 29.243 29.243 0 0 1-2.257 3.239.494.494 0 0 1-.38.181Zm-57.747-5.336a.484.484 0 0 1-.371-.172 47.49 47.49 0 0 1-2.402-3.104.485.485 0 1 1 .792-.562 46.933 46.933 0 0 0 2.353 3.04.486.486 0 0 1-.372.798Zm61.74-1.302a.485.485 0 0 1-.445-.677c.5-1.16.934-2.37 1.286-3.597a.486.486 0 0 1 .934.27 30.935 30.935 0 0 1-1.327 3.713.49.49 0 0 1-.448.291Zm-66.23-5.029a.482.482 0 0 1-.418-.24 45 45 0 0 1-1.841-3.466.485.485 0 1 1 .876-.417 44.114 44.114 0 0 0 1.802 3.392.487.487 0 0 1-.418.731Zm68.373-2.416a.484.484 0 0 1-.48-.562c.196-1.243.32-2.525.37-3.806a.492.492 0 0 1 .505-.467c.268.01.477.236.467.505a33.686 33.686 0 0 1-.382 3.92.487.487 0 0 1-.48.41Zm-71.704-4.592a.484.484 0 0 1-.455-.317 41.599 41.599 0 0 1-1.185-3.746.486.486 0 0 1 .939-.249 40.27 40.27 0 0 0 1.157 3.658.484.484 0 0 1-.456.654Zm72.016-3.153a.488.488 0 0 1-.484-.451 37.613 37.613 0 0 0-.47-3.805.485.485 0 1 1 .957-.166c.228 1.301.39 2.615.482 3.904a.486.486 0 0 1-.45.519l-.035-.001Zm-73.995-4.346a.485.485 0 0 1-.479-.408 37.756 37.756 0 0 1-.43-3.91.484.484 0 0 1 .457-.512.48.48 0 0 1 .512.456 37.09 37.09 0 0 0 .42 3.81.487.487 0 0 1-.48.564Zm72.917-2.333a.485.485 0 0 1-.471-.368 40.795 40.795 0 0 0-1.112-3.671.486.486 0 1 1 .916-.325c.44 1.238.823 2.503 1.14 3.76a.485.485 0 0 1-.473.604Zm-73.352-5.41h-.026a.486.486 0 0 1-.46-.51c.07-1.321.22-2.638.44-3.915a.482.482 0 0 1 .562-.394.484.484 0 0 1 .395.561 32.504 32.504 0 0 0-.427 3.8.484.484 0 0 1-.484.458Zm70.76-1.901a.486.486 0 0 1-.442-.283 43.529 43.529 0 0 0-1.764-3.41.486.486 0 0 1 .842-.483 44.976 44.976 0 0 1 1.804 3.487.485.485 0 0 1-.44.689Zm-69.429-5.731a.486.486 0 0 1-.465-.626 30.427 30.427 0 0 1 1.39-3.691.486.486 0 0 1 .885.4 29.808 29.808 0 0 0-1.345 3.573.487.487 0 0 1-.465.344Zm65.568-1.002a.484.484 0 0 1-.399-.21 46.538 46.538 0 0 0-2.32-3.064.484.484 0 0 1 .066-.683.484.484 0 0 1 .683.066 47.608 47.608 0 0 1 2.37 3.129.484.484 0 0 1-.4.762Zm-4.935-5.99a.485.485 0 0 1-.348-.148 47.219 47.219 0 0 0-2.79-2.646.484.484 0 1 1 .64-.73c.981.858 1.94 1.767 2.846 2.7a.484.484 0 0 1-.348.824Zm-57.435-.065a.487.487 0 0 1-.412-.743 28.95 28.95 0 0 1 2.313-3.197.487.487 0 0 1 .748.621 28.182 28.182 0 0 0-2.235 3.091.488.488 0 0 1-.414.228Zm51.591-5.046c-.1 0-.201-.031-.29-.095a46.75 46.75 0 0 0-3.18-2.16.485.485 0 1 1 .513-.826 47.773 47.773 0 0 1 3.246 2.205.486.486 0 0 1-.289.876Zm-46.635-.903a.486.486 0 0 1-.327-.844 29.307 29.307 0 0 1 3.088-2.456.485.485 0 1 1 .552.8 28.267 28.267 0 0 0-2.986 2.374.492.492 0 0 1-.327.126Zm40.04-3.187a.5.5 0 0 1-.221-.053 44.252 44.252 0 0 0-3.495-1.596.486.486 0 1 1 .366-.9c1.2.485 2.402 1.033 3.57 1.63a.487.487 0 0 1-.22.919Zm-33.67-1.216a.486.486 0 0 1-.22-.918 30.802 30.802 0 0 1 3.62-1.561.484.484 0 1 1 .327.914c-1.205.43-2.384.94-3.506 1.511a.465.465 0 0 1-.221.054Zm26.477-1.694a.528.528 0 0 1-.141-.02 41.35 41.35 0 0 0-3.72-.944.487.487 0 0 1 .194-.952c1.268.26 2.55.584 3.808.966a.486.486 0 0 1-.14.95Zm-19.185-.92a.487.487 0 0 1-.107-.96 34.095 34.095 0 0 1 3.885-.637.486.486 0 0 1 .102.965 33.47 33.47 0 0 0-3.775.62.516.516 0 0 1-.105.012Zm11.585-.624-.051-.003a37.807 37.807 0 0 0-3.827-.202.485.485 0 1 1 0-.971c1.299.001 2.62.071 3.926.207a.486.486 0 0 1-.048.969Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.light,
            d: "M59.692 174.788c-17.324 0-28.904 14.044-25.866 31.366 3.038 17.323 19.544 31.365 36.867 31.365 17.324 0 28.904-14.043 25.866-31.365-3.038-17.324-19.544-31.366-36.867-31.366Zm9.973 56.864c-14.082 0-27.502-11.416-29.97-25.498-2.47-14.082 6.943-25.5 21.026-25.5 14.082 0 27.502 11.418 29.971 25.5 2.47 14.083-6.945 25.498-21.027 25.498Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.dark,
            d: "m43.48 188.786-4.88-4.151a24.72 24.72 0 0 0-2.931 4.912l5.588 2.96a20.037 20.037 0 0 1 2.223-3.72Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "m60.612 174.802 1.03 5.872c6.133.216 12.097 2.57 17.036 6.338l3.286-4.266c-6.167-4.76-13.657-7.724-21.352-7.944Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.dark,
            d: "M80.233 188.273c5.335 4.602 9.238 10.915 10.459 17.88.386 2.205.481 4.345.313 6.385l5.917 1.72c.235-2.585.129-5.302-.363-8.104-1.517-8.645-6.386-16.474-13.039-22.148l-3.287 4.267Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "m86.905 223.522 4.88 4.152c2.529-3.294 4.236-7.26 4.919-11.657l-5.914-1.719c-.559 3.47-1.905 6.603-3.885 9.224ZM50.153 224.034c-5.335-4.602-9.237-10.915-10.459-17.88-.765-4.364-.389-8.471.913-12.062l-5.59-2.962c-1.655 4.46-2.145 9.58-1.19 15.024 1.517 8.644 6.387 16.473 13.04 22.147l3.286-4.267Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.dark,
            d: "M85.834 224.82c-3.635 4.044-8.946 6.59-15.255 6.813l1.03 5.872c7.928-.23 14.59-3.43 19.105-8.534l-4.88-4.151ZM44.55 187.487c3.636-4.044 8.947-6.59 15.256-6.813l-1.03-5.872c-7.928.23-14.591 3.43-19.105 8.534l4.88 4.151ZM69.773 237.506l-1.03-5.871c-6.133-.215-12.097-2.57-17.037-6.338l-3.285 4.265c6.169 4.76 13.656 7.723 21.352 7.944Z"
          }
        ),
        /* @__PURE__ */ v.jsx("g", { fill: "#000", children: /* @__PURE__ */ v.jsx("path", { d: "M68.717 226.733c-2.632 0-5.28-.49-7.868-1.457a.485.485 0 1 1 .34-.91c2.48.926 5.013 1.396 7.528 1.396 8.516 0 15.03-5.437 16.209-13.53a.485.485 0 1 1 .961.139c-1.252 8.591-8.152 14.362-17.17 14.362ZM83.908 201.936a.486.486 0 0 1-.45-.3 23.99 23.99 0 0 0-2.719-4.843.485.485 0 1 1 .786-.569 24.996 24.996 0 0 1 2.83 5.041.486.486 0 0 1-.447.671ZM54.974 222.03c-.1 0-.2-.03-.286-.093-5.332-3.904-9.002-9.627-10.067-15.699-.977-5.568.298-10.792 3.59-14.712 3.222-3.838 8.002-5.95 13.458-5.95 2.139 0 4.302.327 6.432.97a.486.486 0 0 1-.28.931 21.213 21.213 0 0 0-6.15-.929c-5.164 0-9.68 1.991-12.715 5.604-3.104 3.695-4.303 8.639-3.376 13.92 1.023 5.827 4.553 11.324 9.684 15.082a.486.486 0 0 1-.29.876Z" }) }),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.dark,
            d: "m85.63 26.791 7.024 53.118a74.05 74.05 0 0 0 30.874 50.907l16.405 11.513a11.64 11.64 0 0 0 13.827-.335l14.353-11.146a74.05 74.05 0 0 0 28.015-48.954l7.142-55.043a11.189 11.189 0 0 0-8.188-12.244l-35.7-9.608a60.2 60.2 0 0 0-31.76.129l-33.896 9.417a11.187 11.187 0 0 0-8.095 12.246Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M192.775 81.942a.485.485 0 0 1-.481-.549l7.144-55.042c.47-3.619-1.834-7.064-5.358-8.011a.485.485 0 1 1 .253-.938c3.992 1.074 6.6 4.975 6.069 9.075l-7.144 55.042a.49.49 0 0 1-.483.423ZM161.545 9.566a.52.52 0 0 1-.126-.016l-3.04-.818a56.591 56.591 0 0 0-29.718.12.486.486 0 0 1-.26-.936 57.577 57.577 0 0 1 30.232-.123l3.04.818a.485.485 0 0 1-.128.955ZM95.12 73.25a.485.485 0 0 1-.482-.423l-6.137-46.416c-.539-4.074 2.04-7.976 6-9.076l9.087-2.525a.487.487 0 0 1 .26.936l-9.087 2.525c-3.496.971-5.773 4.416-5.298 8.014l6.138 46.417a.486.486 0 0 1-.481.548ZM146.62 141.542a8.698 8.698 0 0 1-5.023-1.587l-16.404-11.514a71.021 71.021 0 0 1-9.175-7.675.485.485 0 1 1 .683-.69 70.062 70.062 0 0 0 9.049 7.57l16.405 11.513a7.73 7.73 0 0 0 4.464 1.41 7.704 7.704 0 0 0 4.769-1.634l14.352-11.146a.485.485 0 1 1 .596.768l-14.353 11.146a8.657 8.657 0 0 1-5.362 1.839Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "circle",
          {
            cx: 144.507,
            cy: 64.121,
            r: 29.904,
            fill: "#FFF",
            transform: "rotate(-45 144.507 64.121)"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "M142.874 84.791a3.722 3.722 0 0 1-3.204-1.83l-12.473-21.147a3.72 3.72 0 1 1 6.41-3.78l9.149 15.513 13.952-25.462a3.72 3.72 0 1 1 6.525 3.576l-17.095 31.2a3.719 3.719 0 0 1-3.204 1.932c-.02-.002-.04-.002-.06-.002Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.dark,
            d: "m66.447 95.778-3.274 1.178.467 3.77c-.71.409-1.377.87-1.994 1.38l-3.366-1.754-2.247 2.656 2.291 3.034c-.404.7-.749 1.432-1.031 2.19l-3.798.165-.617 3.425 3.496 1.478c0 .802.069 1.61.206 2.415l-3.206 2.041 1.178 3.274 3.77-.467c.409.71.87 1.377 1.38 1.994l-1.754 3.366 2.656 2.246 3.034-2.29c.7.403 1.434.749 2.19 1.032l.165 3.798 3.425.617 1.478-3.496c.802 0 1.61-.069 2.415-.206l2.041 3.206 3.274-1.177-.467-3.771c.71-.408 1.376-.87 1.994-1.38l3.366 1.754 2.246-2.656-2.29-3.034c.403-.7.749-1.434 1.032-2.19l3.798-.165.617-3.424-3.496-1.48c0-.8-.069-1.608-.206-2.414l3.206-2.04-1.177-3.274-3.771.466a14.364 14.364 0 0 0-1.38-1.994l1.754-3.365-2.656-2.247-3.034 2.29c-.7-.403-1.434-.748-2.19-1.032l-.165-3.798-3.424-.617-1.48 3.496c-.8 0-1.608.069-2.414.206l-2.042-3.206Zm12.88 14.497a8.956 8.956 0 0 1-5.398 11.46 8.958 8.958 0 1 1 5.399-11.46Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M68.685 133.364a.573.573 0 0 1-.087-.008l-3.424-.618a.486.486 0 0 1-.4-.457l-.15-3.48a15.169 15.169 0 0 1-1.68-.791l-2.78 2.099a.488.488 0 0 1-.607-.016l-2.656-2.247a.486.486 0 0 1-.117-.595l1.606-3.084c-.38-.482-.734-.994-1.058-1.53l-3.455.427a.485.485 0 0 1-.516-.317l-1.178-3.274a.486.486 0 0 1 .196-.575l2.938-1.869a14.76 14.76 0 0 1-.158-1.853l-3.204-1.356a.485.485 0 0 1-.288-.534l.617-3.424a.486.486 0 0 1 .457-.4l3.48-.15c.228-.575.493-1.137.79-1.68l-2.098-2.779a.488.488 0 0 1 .016-.607l2.247-2.656a.489.489 0 0 1 .595-.117l3.085 1.606c.481-.38.995-.735 1.53-1.058l-.428-3.455a.485.485 0 0 1 .317-.516l3.275-1.178a.484.484 0 0 1 .575.196l1.87 2.937a14.76 14.76 0 0 1 1.853-.158l1.356-3.203c.089-.21.31-.326.534-.288l3.424.617c.224.041.389.23.4.457l.15 3.48c.575.23 1.138.494 1.68.79l2.78-2.098a.488.488 0 0 1 .607.016l2.656 2.247a.486.486 0 0 1 .117.595l-1.606 3.083c.38.482.734.995 1.058 1.53l3.455-.427a.484.484 0 0 1 .516.318l1.178 3.273a.486.486 0 0 1-.196.575l-2.938 1.87c.093.618.145 1.24.158 1.853l3.204 1.356c.209.09.329.31.288.534l-.617 3.424a.486.486 0 0 1-.457.4l-3.48.15a15.169 15.169 0 0 1-.791 1.68l2.1 2.78a.488.488 0 0 1-.017.607l-2.247 2.657a.484.484 0 0 1-.595.117l-3.084-1.606c-.48.38-.994.734-1.53 1.057l.429 3.455a.485.485 0 0 1-.318.516l-3.275 1.178a.486.486 0 0 1-.574-.196l-1.87-2.937c-.62.092-1.242.145-1.853.158l-1.356 3.203a.494.494 0 0 1-.45.296Zm-2.956-1.513 2.659.48 1.328-3.138a.485.485 0 0 1 .448-.297h.005c.765 0 1.55-.067 2.33-.199a.482.482 0 0 1 .49.218l1.832 2.88 2.544-.915-.42-3.386a.488.488 0 0 1 .24-.482 13.938 13.938 0 0 0 1.926-1.332.485.485 0 0 1 .534-.056l3.022 1.574 1.747-2.064-2.057-2.723a.486.486 0 0 1-.032-.536c.39-.674.726-1.387.998-2.116a.487.487 0 0 1 .434-.316l3.41-.148.48-2.66-3.138-1.328a.485.485 0 0 1-.297-.447c0-.768-.067-1.554-.199-2.335a.486.486 0 0 1 .218-.491l2.879-1.833-.915-2.544-3.386.42a.483.483 0 0 1-.481-.24 13.938 13.938 0 0 0-1.333-1.926.485.485 0 0 1-.055-.534l1.574-3.022-2.064-1.747-2.724 2.057a.486.486 0 0 1-.535.032 14.257 14.257 0 0 0-2.117-.998.487.487 0 0 1-.316-.434l-.148-3.41-2.66-.48-1.329 3.138a.485.485 0 0 1-.447.297h-.006c-.767 0-1.55.067-2.329.199a.483.483 0 0 1-.491-.218l-1.833-2.879-2.544.914.42 3.387a.488.488 0 0 1-.24.481c-.686.395-1.334.844-1.926 1.333a.482.482 0 0 1-.534.055l-3.022-1.574-1.745 2.064 2.056 2.724c.117.155.13.367.034.535-.39.676-.726 1.388-.998 2.118a.487.487 0 0 1-.434.316l-3.41.148-.48 2.66 3.138 1.327c.18.077.297.252.297.448 0 .768.067 1.554.199 2.335a.486.486 0 0 1-.218.491l-2.879 1.833.914 2.544 3.387-.42a.479.479 0 0 1 .481.24c.395.684.843 1.332 1.333 1.926.124.15.146.36.055.534l-1.574 3.022 2.064 1.745 2.724-2.056a.486.486 0 0 1 .535-.033c.675.39 1.387.726 2.118.998a.487.487 0 0 1 .316.434l.147 3.41Zm4.433-7.55a9.407 9.407 0 0 1-4.018-.905 9.377 9.377 0 0 1-4.86-5.347 9.381 9.381 0 0 1 .343-7.22 9.377 9.377 0 0 1 5.348-4.86 9.375 9.375 0 0 1 7.218.344 9.377 9.377 0 0 1 4.861 5.348 9.381 9.381 0 0 1-.344 7.218 9.377 9.377 0 0 1-5.347 4.861 9.429 9.429 0 0 1-3.2.562Zm.012-17.922c-.967 0-1.935.166-2.872.503a8.415 8.415 0 0 0-4.797 4.362 8.422 8.422 0 0 0-.31 6.477 8.41 8.41 0 0 0 4.363 4.798 8.419 8.419 0 0 0 6.476.308 8.41 8.41 0 0 0 4.797-4.362 8.419 8.419 0 0 0 .309-6.475 8.41 8.41 0 0 0-4.362-4.798 8.422 8.422 0 0 0-3.604-.813Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.dark,
            d: "m27.982 41.908-5.604 2.014.8 6.453a24.65 24.65 0 0 0-3.41 2.36l-5.761-3-3.846 4.546 3.92 5.191a24.95 24.95 0 0 0-1.765 3.748l-6.5.282-1.057 5.86 5.981 2.532c0 1.37.119 2.753.353 4.134L5.608 79.52l2.014 5.602 6.454-.798a24.778 24.778 0 0 0 2.359 3.41l-3 5.761 4.546 3.846 5.191-3.92a24.95 24.95 0 0 0 3.748 1.765l.282 6.5 5.86 1.057 2.532-5.982c1.37 0 2.753-.118 4.134-.352l3.493 5.485 5.602-2.014-.798-6.454a24.778 24.778 0 0 0 3.41-2.359l5.761 3 3.846-4.546-3.92-5.192a24.95 24.95 0 0 0 1.765-3.747l6.5-.282 1.057-5.86-5.981-2.532c0-1.37-.119-2.753-.353-4.134l5.485-3.493-2.014-5.602-6.454.8a24.65 24.65 0 0 0-2.359-3.411l3-5.76-4.546-3.846-5.19 3.92a24.95 24.95 0 0 0-3.748-1.766l-.282-6.499-5.86-1.057-2.532 5.98c-1.37 0-2.753.12-4.133.353l-3.495-5.486Zm22.042 24.808c2.864 7.966-1.272 16.746-9.238 19.608-7.967 2.864-16.746-1.272-19.609-9.239-2.864-7.966 1.273-16.745 9.239-19.608 7.966-2.864 16.744 1.273 19.608 9.239Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M31.813 105.877a.573.573 0 0 1-.086-.007l-5.86-1.058a.486.486 0 0 1-.4-.456l-.267-6.18a25.636 25.636 0 0 1-3.239-1.526l-4.935 3.727a.488.488 0 0 1-.607-.016l-4.546-3.846a.486.486 0 0 1-.117-.595l2.852-5.477c-.74-.92-1.425-1.91-2.04-2.949l-6.137.76a.484.484 0 0 1-.516-.318L3.9 82.334a.486.486 0 0 1 .196-.575l5.216-3.32a25.086 25.086 0 0 1-.304-3.573L3.32 72.46a.485.485 0 0 1-.288-.534l1.058-5.86a.486.486 0 0 1 .456-.4l6.179-.267a25.636 25.636 0 0 1 1.525-3.239l-3.727-4.935a.488.488 0 0 1 .016-.607l3.846-4.546a.488.488 0 0 1 .595-.117l5.477 2.854a25.533 25.533 0 0 1 2.949-2.04l-.76-6.137a.485.485 0 0 1 .317-.517l5.602-2.014a.484.484 0 0 1 .575.196l3.32 5.216a25.341 25.341 0 0 1 3.572-.305l2.408-5.688a.49.49 0 0 1 .534-.288l5.86 1.058c.224.04.389.23.4.456l.267 6.18c1.112.432 2.198.944 3.238 1.526l4.936-3.727a.488.488 0 0 1 .607.016l4.546 3.846a.486.486 0 0 1 .117.595l-2.852 5.477a25.407 25.407 0 0 1 2.04 2.949l6.137-.76a.486.486 0 0 1 .516.318l2.014 5.602a.486.486 0 0 1-.196.575l-5.216 3.32c.187 1.194.29 2.394.306 3.573l5.687 2.406c.209.089.329.31.288.534l-1.058 5.86a.486.486 0 0 1-.456.399l-6.18.268a25.732 25.732 0 0 1-1.526 3.238l3.727 4.935a.488.488 0 0 1-.016.607l-3.845 4.547a.486.486 0 0 1-.596.117l-5.476-2.853c-.92.74-1.91 1.425-2.95 2.04l.761 6.136a.485.485 0 0 1-.317.516L42.136 105a.486.486 0 0 1-.575-.196l-3.32-5.216c-1.196.187-2.395.29-3.573.306l-2.407 5.687a.487.487 0 0 1-.448.297Zm-5.392-1.953 5.095.92 2.38-5.624a.485.485 0 0 1 .448-.297h.01c1.33 0 2.688-.117 4.041-.345a.483.483 0 0 1 .492.218l3.284 5.157 4.872-1.75-.752-6.07a.487.487 0 0 1 .24-.48 24.184 24.184 0 0 0 3.344-2.315.485.485 0 0 1 .534-.055l5.417 2.821 3.343-3.952-3.686-4.881a.486.486 0 0 1-.032-.536 24.616 24.616 0 0 0 1.732-3.674.487.487 0 0 1 .434-.316l6.11-.265.92-5.095-5.624-2.38a.485.485 0 0 1-.297-.447c0-1.334-.115-2.698-.345-4.052a.486.486 0 0 1 .218-.492l5.158-3.283-1.751-4.873-6.068.752a.479.479 0 0 1-.481-.24 24.223 24.223 0 0 0-2.314-3.344.485.485 0 0 1-.056-.534l2.822-5.416-3.952-3.344-4.882 3.686a.486.486 0 0 1-.535.032 24.693 24.693 0 0 0-3.674-1.732.487.487 0 0 1-.316-.434l-.265-6.11-5.095-.92-2.38 5.624a.485.485 0 0 1-.447.297c0-.003-.008 0-.01 0-1.332 0-2.69.116-4.042.345a.481.481 0 0 1-.492-.218l-3.284-5.157-4.872 1.75.752 6.068a.488.488 0 0 1-.24.481 24.223 24.223 0 0 0-3.344 2.314.482.482 0 0 1-.534.056l-5.417-2.822-3.343 3.953 3.686 4.88c.117.157.13.368.033.536a24.693 24.693 0 0 0-1.732 3.675.487.487 0 0 1-.434.316l-6.11.264-.92 5.095 5.624 2.38c.18.076.297.252.297.448 0 1.335.116 2.699.345 4.052a.486.486 0 0 1-.217.491L4.95 82.366l1.75 4.872 6.068-.751a.48.48 0 0 1 .482.24 24.184 24.184 0 0 0 2.314 3.343c.124.151.146.36.055.534L12.8 96.021l3.952 3.344 4.881-3.686a.489.489 0 0 1 .536-.034 24.624 24.624 0 0 0 3.674 1.732.487.487 0 0 1 .316.434l.263 6.113Zm7.921-13.552c-2.3 0-4.589-.508-6.73-1.517a15.707 15.707 0 0 1-8.14-8.955c-2.95-8.205 1.326-17.28 9.531-20.23a15.708 15.708 0 0 1 12.09.576c3.82 1.8 6.712 4.98 8.14 8.955a15.708 15.708 0 0 1-.576 12.09 15.707 15.707 0 0 1-8.955 8.14c-1.748.628-3.558.94-5.36.94Zm-.004-30.664c-1.663 0-3.353.282-5.006.876a14.745 14.745 0 0 0-8.405 7.642 14.751 14.751 0 0 0-.541 11.346c2.769 7.702 11.287 11.714 18.988 8.946a14.745 14.745 0 0 0 8.405-7.641 14.751 14.751 0 0 0 .541-11.347c-2.175-6.048-7.897-9.822-13.982-9.822Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "M220.93 210.918h-87.812a5.855 5.855 0 1 0 0 11.71h87.812a5.855 5.855 0 1 0 0-11.71ZM162.822 192.27h-48.5a5.435 5.435 0 1 0 0 10.872h48.5a5.436 5.436 0 0 0 0-10.872ZM184.913 197.706a5.436 5.436 0 1 1-10.873-.001 5.436 5.436 0 0 1 10.873.001Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M223.948 147.672c3.617 2.813 8.97 6.975 16.569 6.818 1.203-.025 11.017-.374 15.531-7.71.594-.964 3.299-5.36 1.783-9.45-1.613-4.357-6.573-4.478-6.81-7.298-.315-3.744 8.329-4.632 9.916-9.975 1.711-5.765-5.408-14.623-13.418-18.829-9.649-5.065-18.623-2.346-20.684-7.359-1.195-2.906 1.48-4.65.145-8.611-1.422-4.223-6.632-8.687-11.235-7.134-2.933.989-5.268 4.302-4.994 7.31.335 3.686 4.337 4.244 6.598 7.49 5.771 8.284-9.405 20.26-6.559 35.918 1.82 10.014 10.085 16.44 13.158 18.83Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M208.052 104.462s-4.602 1.639-10.271 8.98c-5.67 7.34-18.433 7.753-22.558 2.71-4.126-5.044-3.677-6.44-3.677-6.44l-1.507 4.326s1.21 21.78 20.862 18.425c4.045-.69 9.85-1.977 12.233-4.071 9.197-8.078 4.918-23.93 4.918-23.93Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M186.964 133.3c-3.883 0-7.215-1.095-9.946-3.271-6.803-5.426-7.44-15.538-7.463-15.965a.51.51 0 0 1 .027-.187l1.506-4.326.922.31s.007-.014.01-.043c-.001.014-.157 1.455 3.58 6.023 1.676 2.05 5.005 3.246 8.909 3.185 5.203-.073 10.141-2.328 12.887-5.882 5.692-7.368 10.3-9.07 10.494-9.14a.484.484 0 0 1 .63.333c.179.66 4.25 16.236-5.065 24.422-1.927 1.692-6.123 3.1-12.473 4.183a23.908 23.908 0 0 1-4.018.357Zm-16.433-19.196c.08 1.026.967 10.286 7.097 15.17 3.404 2.712 7.844 3.625 13.193 2.71 6.082-1.038 10.23-2.406 11.994-3.956 7.913-6.951 5.534-20.039 4.902-22.885-1.324.648-5.117 2.855-9.55 8.595-2.923 3.784-8.15 6.181-13.643 6.259-4.203.066-7.813-1.265-9.675-3.54-1.94-2.372-2.907-3.984-3.376-5.052l-.942 2.699Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M199.61 137.654c4.414-17.998-1.178-25.58 5.15-31.142 5.793-5.092 15.825-3.444 20.168-2.73 4.925.81 9.005 1.48 11.78 4.604a8.553 8.553 0 0 1 1.617 2.624v-.003c5.301 9.982 1.005 20.287-1.645 25.047-.438 19.089 7.12 24.824 2.143 31.895-5.388 7.655-18.706 7.27-25.7 5.744-2.454-.535-16.208-3.844-19.35-13.757-2.058-6.499 2.593-9.059 5.836-22.282Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M221.793 175.087c-3.287 0-6.389-.399-8.772-.918-3.843-.838-16.618-4.328-19.71-14.085-1.251-3.952-.103-6.578 1.636-10.551 1.267-2.895 2.844-6.499 4.191-11.995 2.02-8.232 1.93-14.17 1.86-18.942-.083-5.601-.137-9.3 3.444-12.448 5.965-5.243 16.196-3.562 20.565-2.844 4.924.809 9.174 1.508 12.065 4.761a9.028 9.028 0 0 1 1.69 2.728c5.286 9.968 1.301 20.145-1.598 25.394-.187 8.855 1.327 14.68 2.544 19.365 1.37 5.272 2.276 8.753-.487 12.678-3.727 5.294-10.932 6.857-17.428 6.857Zm-21.711-37.317c-1.368 5.577-2.964 9.222-4.245 12.15-1.709 3.908-2.742 6.266-1.6 9.87 3.01 9.498 16.349 12.853 18.992 13.43 6.385 1.392 19.869 2.023 25.199-5.55 2.503-3.556 1.69-6.688.34-11.875-1.172-4.513-2.779-10.694-2.572-19.752a.486.486 0 0 1 .061-.225c2.804-5.039 6.745-14.924 1.662-24.543a.567.567 0 0 1-.046-.09 8.06 8.06 0 0 0-1.528-2.476c-2.66-2.996-6.56-3.637-11.496-4.447-4.233-.696-14.148-2.324-19.768 2.615-3.244 2.851-3.194 6.184-3.112 11.704.071 4.827.16 10.835-1.887 19.189Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M205.097 131.725s-11.345-4.135-14.886-11.696l-7.302-6.805s.104 3.29 2.271 4.664c0 0-1.862 3.749.885 6.335 0 0 2.06 1.637 3.289 1.667 0 0 3.597 11.814 13.305 15.33 0 0 2.727-4.145 2.438-9.495Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M202.659 141.706a.464.464 0 0 1-.165-.03c-9.065-3.283-12.857-13.407-13.507-15.34-1.323-.247-3.02-1.57-3.224-1.733l-.031-.026c-2.434-2.294-1.56-5.431-1.15-6.517-2.035-1.59-2.156-4.682-2.16-4.82a.489.489 0 0 1 .819-.371l7.302 6.805a.494.494 0 0 1 .108.149c3.417 7.295 14.502 11.405 14.613 11.446a.486.486 0 0 1 .319.43c.293 5.446-2.403 9.613-2.519 9.787a.484.484 0 0 1-.405.22Zm-16.276-17.85c.553.436 2.118 1.528 2.98 1.549.21.004.393.143.454.344.035.114 3.549 11.317 12.633 14.874.592-1.041 2.305-4.422 2.176-8.557-1.878-.731-11.476-4.752-14.814-11.746l-6.214-5.79c.238.976.749 2.253 1.841 2.945.211.133.286.404.176.626-.069.14-1.656 3.45.768 5.755ZM215.32 145.121c-3.377 0-7.26-.594-11.598-2.203a.486.486 0 1 1 .338-.91c15.98 5.928 25.577-2.315 25.672-2.398a.486.486 0 0 1 .645.727c-.075.065-5.544 4.784-15.056 4.784ZM209.525 132.331c-.759 0-1.547-.04-2.365-.123a.487.487 0 0 1-.435-.532.49.49 0 0 1 .533-.435c7.44.755 13.238-2.045 17.228-8.326 2.997-4.719 3.793-9.715 3.8-9.767a.486.486 0 1 1 .962.148c-.033.212-.836 5.25-3.941 10.138-2.65 4.17-7.484 8.897-15.782 8.897ZM175.487 104.024l9.274 33.027-10.876-3.142-10.217-32.545z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M169.59 120.37s-2.79-2.937-3.439-5.269c-.646-2.332 3.44-7.461 3.44-7.461v12.73Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M169.59 120.857a.488.488 0 0 1-.352-.15c-.117-.125-2.882-3.053-3.555-5.474-.693-2.499 3.093-7.35 3.527-7.895a.486.486 0 0 1 .864.302v12.73a.485.485 0 0 1-.484.487Zm-.485-11.747c-1.24 1.77-2.86 4.51-2.486 5.862.391 1.405 1.634 3.078 2.486 4.106v-9.968ZM203.134 126.376a.486.486 0 0 1-.48-.415c-1.537-10.506 3.18-16.316 3.381-16.559a.485.485 0 1 1 .747.62c-.046.056-4.636 5.745-3.166 15.797a.486.486 0 0 1-.482.557ZM202.984 214.042c0 2.14 4.98.127 11.24 1.51 9.115 2.013 13.698-1.753 13.698-3.894 0-2.14-6.841-1.492-13.28-1.492-6.44 0-11.658 1.736-11.658 3.876Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "m208.386 208.358 27.583 36.636 4.4-3.89s-11.442-29.68-21.501-32.557l-7.484-4.566-2.998 4.377Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "m235.969 245.48-.048-.003a.486.486 0 0 1-.34-.192l-27.583-36.636a.486.486 0 0 1-.013-.566l2.997-4.378a.485.485 0 0 1 .654-.14l7.428 4.531c10.157 3.012 21.287 31.612 21.757 32.83a.485.485 0 0 1-.132.539l-4.4 3.892a.472.472 0 0 1-.32.123Zm-26.985-37.135 27.057 35.938 3.752-3.317c-1.261-3.177-11.893-29.329-21.06-31.953a.46.46 0 0 1-.12-.052l-7.09-4.326-2.539 3.71Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M217.765 204.236s4.894 10.374 3.524 21.745c-1.371 11.373-7.048 31.195-7.048 31.195h-7.048l1.66-54.265 8.912 1.325Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M214.241 257.662h-7.048a.486.486 0 0 1-.484-.5l1.659-54.266a.48.48 0 0 1 .174-.357.49.49 0 0 1 .383-.108l8.913 1.325a.48.48 0 0 1 .367.274c.05.105 4.938 10.63 3.568 22.01-1.36 11.28-7.007 31.072-7.062 31.27a.49.49 0 0 1-.47.352Zm-6.546-.972h6.18c.765-2.712 5.683-20.392 6.932-30.767 1.226-10.166-2.677-19.651-3.376-21.247l-8.11-1.205-1.626 53.22Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M192.32 263.261c1.839-2.72 8.73-7.088 15.004-10.343l3.3.01a1.487 1.487 0 0 1 1.461 1.734l-.236 1.405 2.27-2.094a1.188 1.188 0 0 1 1.945.53c.53 1.756 1.21 4.559 1.155 7.23a2 2 0 0 1-1.196 1.789c-2.412 1.063-12.1 3.741-21.908 3.323-1.796-.075-2.803-2.095-1.795-3.584Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M195.013 265.233c-.466 0-.936-.004-1.414-.015a.487.487 0 0 1 .01-.97h.01c13.763.296 22.496-3.876 22.584-3.918a.486.486 0 0 1 .425.873c-.086.04-8.418 4.03-21.615 4.03ZM205.011 260.296a.487.487 0 0 1-.467-.35c-.007-.029-.833-2.812-2.735-3.626a.486.486 0 1 1 .382-.893c2.329.997 3.25 4.117 3.287 4.249a.486.486 0 0 1-.467.62ZM200.934 261.82a.486.486 0 0 1-.48-.425c-.293-2.325-1.77-3.087-1.832-3.117a.488.488 0 0 1-.221-.65.484.484 0 0 1 .645-.225c.082.04 2.01.997 2.371 3.869a.486.486 0 0 1-.483.548Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "m233.217 242.139 2.3-1.717a1.402 1.402 0 0 1 2.084.478l.549 1.057.49-2.68a1.087 1.087 0 0 1 1.714-.682c1.323.972 3.297 2.602 4.684 4.527a1.79 1.79 0 0 1 .107 1.923c-1.154 2.058-6.643 9.185-13.883 14.164-1.325.912-3.132.01-3.212-1.599-.148-2.935 2.43-9.768 5.167-15.471Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M229.762 258.453a.485.485 0 0 1-.284-.88c10.009-7.194 13.992-14.856 14.031-14.932a.487.487 0 0 1 .866.441c-.163.322-4.13 7.949-14.327 15.28a.496.496 0 0 1-.286.091ZM235.27 248.799a.493.493 0 0 1-.291-.097c-.02-.016-2.094-1.549-3.865-1.113a.486.486 0 0 1-.233-.943c2.224-.547 4.582 1.205 4.681 1.28a.485.485 0 0 1-.292.873ZM233.175 252.081a.483.483 0 0 1-.348-.147c-1.458-1.504-2.924-1.234-2.937-1.23a.486.486 0 0 1-.189-.953c.08-.016 2.003-.373 3.825 1.507a.485.485 0 0 1-.35.823Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.dark,
            d: "M227.289 211.822c-1.709-11.677 1.097-30.525 3.878-49.335 0 0-12.214-14.604-23.156-13.761-7.077.544-6.614 13.761-6.614 13.761l2.042 51.555s9.105-4.286 23.85-2.22Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M203.439 214.528a.48.48 0 0 1-.485-.465l-2.042-51.555c-.019-.56-.392-13.692 7.064-14.265 11.063-.856 23.06 13.33 23.565 13.934.09.107.129.246.108.383l-.045.306c-2.715 18.36-5.522 37.343-3.832 48.887a.485.485 0 0 1-.547.551c-14.412-2.018-23.488 2.139-23.577 2.18a.559.559 0 0 1-.21.044Zm5.492-65.352c-.295 0-.588.012-.882.034-6.531.503-6.171 13.132-6.167 13.261l2.014 50.85c2.325-.923 10.526-3.658 22.825-2.067-1.52-11.733 1.245-30.434 3.922-48.533l.013-.086c-1.343-1.546-12.003-13.459-21.725-13.459Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M233.946 171.725a.484.484 0 0 1-.46-.64v-.001c.056-.165 1.31-4.11-2.669-8.262a.485.485 0 0 1 .7-.671c4.405 4.594 2.953 9.057 2.888 9.244a.486.486 0 0 1-.46.33Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#FFF",
            d: "M211.788 92.608c1.483-1.533 4.325-6.38 4.322-6.217-.035 1.604 3.296 2.057 5.537 3.529 2.241 1.471-.83 4.22-.83 4.22s2.224-1.766 2.591.597c.212 1.37-1.401 1.79-2.699 1.892.041.413.094.922.151 1.478a6.782 6.782 0 0 0 4.592 5.737l-11.417 4.704-.888-4.402 1.163-.478a2.551 2.551 0 0 0 1.553-1.98l.275-3.145c-.558.147-1.233.292-1.756.286-1.042-.011-1.854-.705-2.048-1.729-.268-1.404-.212-2.726.147-3.793l-.693-.699Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M214.035 109.034a.482.482 0 0 1-.475-.39l-.888-4.401a.487.487 0 0 1 .29-.546l1.165-.478a2.079 2.079 0 0 0 1.258-1.603l.214-2.446c-.482.1-.884.144-1.22.145-1.269-.015-2.28-.867-2.52-2.122-.26-1.362-.233-2.651.074-3.75l-.489-.493a.486.486 0 0 1-.004-.68c.993-1.027 2.678-3.687 3.582-5.116.853-1.348.853-1.345 1.227-1.232.21.063.352.262.347.48-.014.684 1.235 1.204 2.558 1.755.891.372 1.902.791 2.76 1.355.79.519.997 1.17 1.03 1.623.05.661-.219 1.324-.566 1.884.167.005.334.034.496.097.546.213.887.733 1.013 1.543.079.512-.037.983-.335 1.36-.426.539-1.203.887-2.312 1.039l.103.996a6.314 6.314 0 0 0 4.262 5.327.484.484 0 0 1 .031.909l-11.415 4.704a.461.461 0 0 1-.186.04Zm-.334-4.59.694 3.431 9.806-4.042a7.288 7.288 0 0 1-3.825-5.677c-.057-.557-.11-1.064-.15-1.478a.485.485 0 0 1 .444-.533c1.049-.083 1.821-.347 2.12-.725.133-.167.175-.362.137-.609-.047-.306-.157-.69-.405-.788-.39-.151-1.115.269-1.406.497a.487.487 0 0 1-.626-.743c.437-.392 1.556-1.62 1.485-2.57-.027-.348-.221-.638-.596-.884-.782-.513-1.705-.898-2.599-1.27-1.14-.473-2.237-.931-2.788-1.619l-.15.239c-.894 1.411-2.334 3.685-3.385 4.92l.37.372c.13.13.174.323.115.497-.336 1.001-.382 2.228-.13 3.548.152.801.77 1.323 1.577 1.332.387-.007.935-.086 1.626-.27a.488.488 0 0 1 .609.512l-.275 3.145a3.063 3.063 0 0 1-1.852 2.387l-.796.327Z"
          }
        ),
        /* @__PURE__ */ v.jsx("path", { fill: "#FFF", d: "m216.972 98.257-.832.284.832-.284Z" }),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M216.14 99.027a.486.486 0 0 1-.157-.945l.833-.284c.255-.088.529.05.615.303a.484.484 0 0 1-.302.616l-.833.284a.457.457 0 0 1-.156.026ZM204.188 13.654a.485.485 0 0 1-.343-.83l9.908-9.876a.485.485 0 0 1 .685.687l-9.908 9.877a.478.478 0 0 1-.342.142ZM206.902 17.806a.484.484 0 0 1-.234-.912l17.476-9.623a.485.485 0 1 1 .468.851l-17.476 9.624a.485.485 0 0 1-.234.06ZM223.234 22.068h-15.19a.486.486 0 0 1 0-.971h15.19a.486.486 0 0 1 0 .971ZM219.333 59.304a3.576 3.576 0 0 1-3.575-3.57 3.577 3.577 0 0 1 3.575-3.571.486.486 0 0 1 0 .971 2.605 2.605 0 0 0-2.604 2.6 2.605 2.605 0 0 0 5.208 0 .486.486 0 0 1 .97 0 3.576 3.576 0 0 1-3.574 3.57Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "M62.22 30.07c1.07-.48 2.32.015 2.793 1.11.471 1.094-.014 2.37-1.085 2.853-1.07.482-2.322-.014-2.794-1.108-.472-1.096.015-2.373 1.085-2.854Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: "#000",
            d: "M110.796 176.059a.484.484 0 0 1-.351-.82l1.529-1.598a.485.485 0 0 1 .7.671l-1.528 1.598a.483.483 0 0 1-.35.149ZM105.448 181.65a.485.485 0 0 1-.351-.82l1.529-1.599a.484.484 0 0 1 .686-.014c.194.186.2.493.014.686l-1.528 1.597a.488.488 0 0 1-.35.15ZM106.948 176.144a.484.484 0 0 1-.341-.14l-1.552-1.53a.484.484 0 0 1-.005-.685.484.484 0 0 1 .686-.005l1.552 1.529a.484.484 0 0 1-.34.83ZM112.377 181.494a.484.484 0 0 1-.34-.14l-1.552-1.529a.484.484 0 0 1-.005-.686.484.484 0 0 1 .686-.004l1.552 1.528a.484.484 0 0 1-.34.831Z"
          }
        ),
        /* @__PURE__ */ v.jsx(
          "path",
          {
            fill: e.theme.main,
            d: "M73.194 23.916c1.28-.577 2.775.017 3.34 1.325.563 1.308-.018 2.835-1.298 3.411-1.28.576-2.774-.018-3.339-1.325-.563-1.308.018-2.835 1.297-3.411Z"
          }
        )
      ] })
    }
  );
}
function GA(e) {
  return /* @__PURE__ */ v.jsx(an, { component: "svg", width: 100, viewBox: "0 0 212 40", ...e, children: /* @__PURE__ */ v.jsx("g", { fill: "#fff", transform: "translate(-401.7632, 0)", children: /* @__PURE__ */ v.jsx("path", { d: "M580.676 32.09h-4.041V14.773h4.041zM583.885 32.09V19.765h2.282c.23 0 .422.051.577.154a.825.825 0 0 1 .327.464l.214.713c.237-.222.483-.428.737-.618.253-.19.525-.35.814-.481a4.833 4.833 0 0 1 2.038-.422c.674 0 1.27.116 1.79.35.518.234.956.559 1.312.975.357.416.626.911.809 1.486a6.16 6.16 0 0 1 .273 1.872v7.832h-3.685v-7.832c0-.603-.138-1.072-.416-1.409-.277-.337-.685-.505-1.224-.505-.404 0-.784.087-1.14.261a4.437 4.437 0 0 0-1.023.702v8.783h-3.685ZM606.564 22.689c-.111.134-.218.241-.321.32-.103.08-.25.12-.44.12a.947.947 0 0 1-.493-.131c-.147-.087-.311-.185-.494-.291a3.742 3.742 0 0 0-.642-.292c-.245-.087-.55-.13-.915-.13-.451 0-.842.083-1.17.25-.33.166-.6.403-.815.712a3.259 3.259 0 0 0-.475 1.135 6.78 6.78 0 0 0-.155 1.516c0 1.18.228 2.088.684 2.722.455.634 1.083.95 1.884.95.428 0 .766-.053 1.016-.16a3.08 3.08 0 0 0 .636-.356l.481-.363a.89.89 0 0 1 .553-.166c.293 0 .515.107.666.32l1.07 1.32a5.82 5.82 0 0 1-2.49 1.705c-.44.155-.882.262-1.326.321-.444.06-.876.09-1.296.09a5.56 5.56 0 0 1-2.157-.428 5.285 5.285 0 0 1-1.807-1.242c-.519-.543-.93-1.21-1.236-2.003-.305-.793-.457-1.696-.457-2.71 0-.888.132-1.718.398-2.49a5.653 5.653 0 0 1 1.177-2.009 5.471 5.471 0 0 1 1.925-1.337c.765-.325 1.65-.487 2.657-.487.966 0 1.814.154 2.543.463.73.31 1.387.76 1.973 1.355l-.974 1.296ZM608.513 30.224c0-.285.053-.55.16-.796.107-.246.254-.46.44-.642a2.098 2.098 0 0 1 1.492-.594c.293 0 .566.053.82.16.253.107.475.252.665.434a1.967 1.967 0 0 1 .607 1.438c0 .286-.054.553-.16.803-.108.25-.256.465-.447.647-.19.183-.412.325-.665.428a2.158 2.158 0 0 1-.82.155 2.19 2.19 0 0 1-.832-.155 2.017 2.017 0 0 1-.66-.428 2.015 2.015 0 0 1-.6-1.45ZM447.596 8.275h4.475c.483 0 .878.11 1.185.329.307.219.527.51.658.872l4.64 12.834c.209.56.42 1.168.634 1.826.214.658.414 1.35.6 2.073.154-.724.332-1.415.535-2.073.203-.658.403-1.267.6-1.826l4.608-12.834c.11-.307.323-.584.641-.831.319-.247.708-.37 1.169-.37h4.508l-9.609 23.973h-5.035l-9.609-23.973ZM478.99 14.922c1.13 0 2.164.175 3.102.526a6.742 6.742 0 0 1 2.418 1.53c.675.67 1.201 1.49 1.58 2.46.378.971.568 2.071.568 3.3 0 .383-.017.696-.05.937a1.485 1.485 0 0 1-.18.576.689.689 0 0 1-.355.296 1.657 1.657 0 0 1-.567.083h-9.84c.165 1.426.598 2.46 1.3 3.101.702.642 1.607.963 2.715.963.592 0 1.103-.071 1.53-.214a7.72 7.72 0 0 0 1.144-.477c.334-.176.642-.335.921-.477.28-.143.573-.214.88-.214.406 0 .714.148.922.444l1.48 1.826a7.582 7.582 0 0 1-1.702 1.473 8.85 8.85 0 0 1-1.876.889c-.642.213-1.283.362-1.925.444-.642.082-1.253.123-1.835.123a9.58 9.58 0 0 1-3.364-.584 7.732 7.732 0 0 1-2.748-1.736c-.785-.768-1.404-1.722-1.86-2.863-.455-1.14-.682-2.468-.682-3.982 0-1.14.194-2.22.584-3.241a7.983 7.983 0 0 1 1.678-2.682 7.99 7.99 0 0 1 2.65-1.826c1.036-.45 2.207-.675 3.512-.675Zm.099 3.521c-.976 0-1.739.277-2.287.831-.549.554-.91 1.352-1.086 2.394h6.367c0-.406-.052-.8-.156-1.185a2.872 2.872 0 0 0-.51-1.028 2.595 2.595 0 0 0-.93-.732c-.384-.187-.85-.28-1.398-.28ZM489.586 32.248V15.185h3.028c.252 0 .463.022.633.066.17.044.313.112.428.206a.878.878 0 0 1 .263.37c.06.153.113.34.157.56l.28 1.595c.625-.965 1.327-1.727 2.106-2.287.778-.56 1.628-.839 2.55-.839.779 0 1.404.187 1.876.56l-.659 3.751c-.043.23-.131.392-.263.485-.131.094-.307.14-.526.14-.187 0-.406-.024-.658-.074a5.102 5.102 0 0 0-.955-.074c-1.338 0-2.391.713-3.159 2.14v10.464h-5.1ZM508.443 15.185v17.063h-5.101V15.185h5.1Zm.592-4.673c0 .406-.082.787-.247 1.144a3.01 3.01 0 0 1-.675.938 3.303 3.303 0 0 1-.995.641 3.09 3.09 0 0 1-1.21.239c-.416 0-.806-.08-1.168-.239a3.284 3.284 0 0 1-.962-.641c-.28-.269-.5-.582-.658-.938a2.775 2.775 0 0 1-.239-1.144c0-.417.08-.806.239-1.168a3.082 3.082 0 0 1 1.62-1.596 2.96 2.96 0 0 1 1.169-.23c.427 0 .83.076 1.209.23a3.106 3.106 0 0 1 1.67 1.596c.165.362.247.751.247 1.168ZM541.333 14.922c1.13 0 2.164.175 3.102.526a6.742 6.742 0 0 1 2.418 1.53c.675.67 1.201 1.49 1.58 2.46.378.971.568 2.071.568 3.3 0 .383-.017.696-.05.937a1.485 1.485 0 0 1-.18.576.689.689 0 0 1-.355.296 1.657 1.657 0 0 1-.567.083h-9.84c.165 1.426.598 2.46 1.3 3.101.702.642 1.607.963 2.715.963.592 0 1.103-.071 1.53-.214a7.72 7.72 0 0 0 1.144-.477c.334-.176.642-.335.921-.477.28-.143.573-.214.88-.214.406 0 .714.148.922.444l1.48 1.826a7.582 7.582 0 0 1-1.702 1.473 8.85 8.85 0 0 1-1.876.889c-.642.213-1.283.362-1.925.444-.642.082-1.253.123-1.835.123a9.58 9.58 0 0 1-3.364-.584 7.732 7.732 0 0 1-2.748-1.736c-.785-.768-1.404-1.722-1.86-2.863-.455-1.14-.682-2.468-.682-3.982 0-1.14.194-2.22.584-3.241a7.983 7.983 0 0 1 1.678-2.682 7.99 7.99 0 0 1 2.65-1.826c1.036-.45 2.207-.675 3.512-.675Zm.099 3.521c-.976 0-1.739.277-2.287.831-.549.554-.91 1.352-1.086 2.394h6.367c0-.406-.052-.8-.156-1.185a2.872 2.872 0 0 0-.51-1.028 2.595 2.595 0 0 0-.93-.732c-.384-.187-.85-.28-1.398-.28ZM563.908 32.248c-.318 0-.584-.071-.798-.214-.214-.143-.365-.356-.453-.642l-.395-1.3c-.34.362-.696.692-1.07.988a6.726 6.726 0 0 1-1.208.765c-.434.214-.9.378-1.399.493a7.2 7.2 0 0 1-1.62.173 5.255 5.255 0 0 1-2.469-.592c-.757-.395-1.41-.965-1.958-1.711-.548-.746-.979-1.66-1.291-2.74-.313-1.08-.47-2.312-.47-3.694 0-1.272.176-2.454.527-3.546.351-1.091.847-2.034 1.49-2.83a6.915 6.915 0 0 1 2.311-1.867c.9-.45 1.892-.675 2.978-.675.878 0 1.62.129 2.23.387.608.258 1.16.595 1.653 1.012V7.616h5.1v24.632h-3.158Zm-5.167-3.653c.373 0 .71-.036 1.012-.107.302-.071.579-.173.831-.304.252-.132.491-.296.716-.494.225-.197.447-.428.666-.69v-7.24c-.395-.428-.814-.727-1.258-.897a3.902 3.902 0 0 0-1.407-.255c-.472 0-.905.093-1.3.28-.395.186-.738.485-1.029.896-.29.411-.518.946-.682 1.604-.165.658-.247 1.454-.247 2.386 0 .9.066 1.657.197 2.27.132.615.316 1.111.551 1.49.236.378.519.65.848.814.329.165.696.247 1.102.247ZM513.313 32.248V18.69l-1.119-.23c-.384-.088-.694-.225-.93-.412-.235-.186-.353-.46-.353-.822v-2.008h2.402v-.97c0-.977.156-1.86.469-2.65a5.606 5.606 0 0 1 1.349-2.024c.587-.559 1.303-.992 2.147-1.3.845-.307 1.805-.46 2.88-.46.417 0 .803.025 1.16.074.356.05.726.129 1.11.238l-.098 2.485a.823.823 0 0 1-.14.436.988.988 0 0 1-.305.28c-.12.071-.255.123-.403.156-.148.033-.293.05-.436.05-.45 0-.85.043-1.2.131a1.924 1.924 0 0 0-.881.469 2.11 2.11 0 0 0-.535.889c-.12.367-.181.83-.181 1.39v.806h4.015v3.488h-3.85v13.542h-5.101ZM529.844 15.185v17.063h-5.101V15.185h5.1Zm.592-4.673c0 .406-.082.787-.247 1.144a3.01 3.01 0 0 1-.675.938 3.303 3.303 0 0 1-.995.641 3.09 3.09 0 0 1-1.21.239c-.416 0-.806-.08-1.168-.239a3.284 3.284 0 0 1-.962-.641c-.28-.269-.5-.582-.658-.938a2.775 2.775 0 0 1-.239-1.144c0-.417.08-.806.239-1.168a3.082 3.082 0 0 1 1.62-1.596 2.96 2.96 0 0 1 1.169-.23c.427 0 .83.076 1.209.23a3.106 3.106 0 0 1 1.67 1.596c.165.362.247.751.247 1.168ZM423 0a7.702 7.702 0 0 1 6.71 3.915 7.701 7.701 0 0 1 7.432 1.998 7.702 7.702 0 0 1 1.99 7.46A7.702 7.702 0 0 1 443 20.055a7.702 7.702 0 0 1-3.867 6.682 7.702 7.702 0 0 1-1.99 7.46 7.702 7.702 0 0 1-7.488 1.983A7.702 7.702 0 0 1 423 40a7.701 7.701 0 0 1-6.655-3.82 7.702 7.702 0 0 1-7.487-1.983 7.702 7.702 0 0 1-1.99-7.46A7.702 7.702 0 0 1 403 20.056a7.702 7.702 0 0 1 3.867-6.682 7.702 7.702 0 0 1 1.99-7.46 7.702 7.702 0 0 1 7.434-1.998A7.701 7.701 0 0 1 423 0Zm7.4 12.754h-.056c-.688.017-1.259.252-1.713.706l-8.076 8.076-3.186-3.186a2.342 2.342 0 0 0-1.71-.702c-.436-.019-1.165.167-1.701.703a2.457 2.457 0 0 0-.705 1.702c.015.683.25 1.252.706 1.707l4.89 4.891c.318.318.696.53 1.132.634.196.05.375.07.517.072l.061.003c.15.002.34-.018.549-.07a2.33 2.33 0 0 0 1.152-.639l9.781-9.781c.452-.452.688-1.022.71-1.71a2.494 2.494 0 0 0-.709-1.7 2.442 2.442 0 0 0-1.698-.706h.055Z" }) }) });
}
function YA(e) {
  return { set: (l) => {
    const u = typeof l == "string" ? l : JSON.stringify(l);
    localStorage.setItem(e, u);
  }, get: () => {
    const l = localStorage.getItem(e);
    if (l)
      try {
        return JSON.parse(l);
      } catch {
        return l;
      }
    return null;
  }, remove: () => {
    localStorage.removeItem(e);
  } };
}
function XA({
  type: e = "text/plain"
}) {
  return { copy: async (o) => {
    var a;
    if ((a = navigator.clipboard) != null && a.write) {
      const l = {};
      switch (e) {
        case "text/html":
          l["text/plain"] = new Blob([o], {
            type: "text/plain"
          }), l[e] = new Blob([o], { type: e });
          break;
        default:
          l[e] = new Blob([o], { type: e });
      }
      const u = [new ClipboardItem(l)];
      await navigator.clipboard.write(u);
    } else {
      const l = document.createElement("textarea");
      o instanceof Blob ? l.value = await o.text() : l.value = o.toString(), l.select(), document.execCommand("copy");
    }
  } };
}
function Y1(e, n = []) {
  const o = Vr(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return xv(() => {
    o.current = e;
  }), Kn((...a) => {
    var l;
    return (l = o.current) == null ? void 0 : l.call(o, ...a);
  }, n);
}
function JA(e = {}) {
  const {
    onClose: n,
    onOpen: o,
    open: a,
    id: l
  } = e, u = Y1(o), f = Y1(n), [d, h] = jn(e.defaultOpen ?? !1), g = a ?? d, b = a !== void 0, x = _v(), _ = l ?? `disclosure-${x}`, P = Kn(() => {
    b || h(!1), f == null || f();
  }, [b, f]), S = Kn(() => {
    b || h(!0), u == null || u();
  }, [b, u]), C = Kn(() => {
    g ? P() : S();
  }, [g, S, P]);
  function E(N = {}) {
    return {
      ...N,
      "aria-expanded": g,
      "aria-controls": _,
      onClick(A) {
        var M;
        (M = N.onClick) == null || M.call(N, A), C();
      }
    };
  }
  function $(N = {}) {
    return {
      ...N,
      hidden: !g,
      id: _
    };
  }
  return {
    open: g,
    onOpen: S,
    onClose: P,
    onToggle: C,
    isControlled: b,
    getButtonProps: E,
    getDisclosureProps: $
  };
}
function JI(e) {
  const o = qr(
    () => s6.create(e.data),
    [e.data]
  ).modules.data;
  return qr(() => {
    const a = e.size / Math.sqrt(o.length);
    let l = `<svg viewBox="0 0 ${e.size} ${e.size}" xmlns="http://www.w3.org/2000/svg">`;
    const u = e.imageSize, f = (e.size - u) / 2, d = (e.size - u) / 2;
    for (let h = 0; h < o.length; h++) {
      const g = h % Math.sqrt(o.length) * a, b = Math.floor(h / Math.sqrt(o.length)) * a, x = a / 2, _ = o[h] === 1, P = g + a >= f && g < f + u && b + a >= d && b < d + u;
      !_ || P || (l += `<rect x="${g}" y="${b}" width="${a}" height="${a}" rx="${x}" ry="${x}" fill='${e.fill || "#000000"}' />`);
    }
    return l += "</svg>", l;
  }, [o, e]);
}
function QA({
  data: e,
  asset: n,
  svgSize: o = 300,
  logoSize: a = 0,
  fill: l = "#000000"
}) {
  const u = JI({
    data: e,
    size: o,
    imageSize: a,
    fill: l
  });
  return /* @__PURE__ */ v.jsxs(an, { position: "relative", children: [
    /* @__PURE__ */ v.jsx(
      an,
      {
        display: "flex",
        sx: { "& svg": { width: "100%", height: "auto", aspectRatio: 1 } },
        dangerouslySetInnerHTML: { __html: u }
      }
    ),
    /* @__PURE__ */ v.jsx(
      an,
      {
        component: "img",
        src: n,
        sx: {
          position: "absolute",
          width: a / o * 100 + "%",
          maxWidth: a + "px",
          height: "auto",
          inset: 0,
          aspectRatio: 1,
          m: "auto",
          p: 0.5
        }
      }
    )
  ] });
}
const QI = "rgba(0,0,0,0.26)", yi = "#ffffff", eM = "#000000", $u = "#0dbc3d", eA = "#5ef06d", X1 = "#008a01", J1 = "#164fd6", Q1 = "#657bff", e0 = "#0028a3", tA = "#eb0d28", nA = "#ff5952", rA = "#b00000", t0 = "#F5D328", tM = "#5ef06d", oA = "#bea008", nM = "#625410", iA = "#09225E", aA = "#F9F9FB", n0 = "#bdbdbd", sA = "#797979", lA = tc.grey[400], uA = tc.grey[500], cA = tc.grey[600], rM = ({ primaryFontFace: e }) => Hv({
  typography: {
    fontFamily: e.style.fontFamily
  },
  palette: {
    text: {
      disabled: QI
    },
    primary: {
      main: $u,
      light: eA,
      dark: X1,
      contrastText: yi
    },
    secondary: {
      main: J1,
      light: Q1,
      dark: e0,
      contrastText: yi
    },
    error: {
      main: tA,
      light: nA,
      dark: rA,
      contrastText: yi
    },
    warning: {
      main: t0,
      light: t0,
      dark: oA,
      contrastText: yi
    },
    success: {
      main: $u,
      light: $u,
      dark: X1,
      contrastText: yi
    },
    info: {
      main: J1,
      light: Q1,
      dark: e0,
      contrastText: iA
    },
    neutral: {
      main: n0,
      light: aA,
      dark: sA
    },
    neutralContrast: {
      main: uA,
      light: lA,
      dark: cA
    }
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 34
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 800
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        circular: {
          width: 42,
          height: 42
        },
        sizeSmall: {
          width: 40,
          height: 40
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            svg: {
              opacity: 0.4
            }
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 800
        }
      }
    },
    MuiDialog: {
      defaultProps: {
        maxWidth: "xs"
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 20,
          fontWeight: 800,
          textAlign: "center"
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: "8px!important",
          paddingBottom: 8
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 24,
          justifyContent: "space-between",
          "& .MuiButton-root": {
            marginTop: 0
          }
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          maxWidth: "339px"
        },
        action: {
          padding: "8px 0",
          marginRight: 0,
          alignItems: "center",
          "& button, & a": {
            lineHeight: "0"
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: `${n0} !important`
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "& th.MuiTableCell-root": {
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1
          },
          "& td.MuiTableCell-root": {
            fontSize: 20,
            fontWeight: 300
          }
        }
      }
    }
  }
});
async function oM(e) {
  try {
    return [await e, null];
  } catch (n) {
    return [null, n];
  }
}
export {
  SA as AcceptTermsNotice,
  RA as Alert,
  Hu as Button,
  OA as CredentialRequestsEditor,
  BA as DateInput,
  $A as FullWidthAlert,
  PA as Image,
  ZA as OTPInput,
  qA as PhoneInput,
  QA as QRCodeDisplay,
  zA as SSNInput,
  FA as SSNSchema,
  WA as SelectInput,
  CA as Typography,
  c_ as USDateSchema,
  KA as VerifiedImage,
  GA as VerifiedIncLogo,
  wA as When,
  IA as birthDateSchema,
  eM as black,
  J1 as blue,
  ls as countries,
  e0 as darkBlue,
  X1 as darkGreen,
  sA as darkGrey,
  cA as darkGreyContrast,
  rA as darkRed,
  oA as darkYellow,
  NA as descriptionSchema,
  jA as emailSchema,
  DA as fieldSchema,
  s_ as formatDateMMDDYYYY,
  u_ as getMaxDateInstance,
  l_ as getMinDateInstance,
  VA as getPhoneData,
  Uh as getPhoneDataByFieldName,
  LA as getUnixSchema,
  $u as green,
  n0 as grey,
  uA as greyContrast,
  iA as infoContrast,
  Q1 as lightBlue,
  eA as lightGreen,
  aA as lightGrey,
  lA as lightGreyContrast,
  nA as lightRed,
  tM as lightYellow,
  u1 as masks,
  qu as omitProperties,
  UA as parseToPhoneNational,
  f_ as phoneSchema,
  tA as red,
  MA as shortenBirthDateSchema,
  AA as simpleBirthDateSchema,
  A$ as sortByCountryName,
  kA as stateSchema,
  QI as textDisabled,
  rM as theme,
  Y1 as useCallbackRef,
  XA as useCopyToClipboard,
  JA as useDisclosure,
  YA as useLocalStorage,
  JI as useQRCode,
  HA as validatePhone,
  nM as warningContrast,
  yi as white,
  oM as wrapPromise,
  t0 as yellow
};
