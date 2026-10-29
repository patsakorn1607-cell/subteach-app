<!DOCTYPE html>
<html class="">
    <head>
        <meta charset="utf-8">
        <style>
            .error-boundary {
                border: 2px dashed rgba(255, 0, 0, 0.3);
                position: relative;
            }
            .error-boundary::after {
                content: "⚠️";
                position: absolute;
                top: 0;
                right: 0;
                background: rgba(255, 0, 0, 0.1);
                color: red;
                font-size: 14px;
                padding: 2px 6px;
                border-radius: 0 0 0 4px;
                pointer-events: none;
            }
            .loading-spinner {
                @apply flex items-center justify-center;
                @apply min-h-[200px];
                @apply bg-gradient-to-br from-white/5 to-white/10;
                @apply rounded-xl;
                @apply backdrop-blur-sm;
            }
            .loading-spinner::after {
                content: '';
                @apply w-12 h-12;
                @apply border-4 border-primary/20;
                @apply border-t-primary;
                @apply rounded-full;
                @apply animate-spin;
                @apply shadow-lg;
            }

            /* Base text and background colors for all elements */
            body {
                @apply bg-background text-foreground;
            }

            /* Form elements styling */
            input, textarea, select {
                @apply bg-background text-foreground border-input;
                @apply placeholder:text-muted-foreground;
                @apply focus:outline-none focus:ring-2 focus:ring-ring;
            }

            /* Handle filled state */
            input:not(:placeholder-shown),
            textarea:not(:placeholder-shown),
            select:not(:placeholder-shown) {
                @apply bg-background;
            }

            /* Ensure proper contrast in both modes */
            .dark input, .dark textarea, .dark select {
                @apply bg-background/95;
            }

            input, textarea, select {
                @apply bg-background/95;
            }

            /* Handle disabled state */
            input:disabled,
            textarea:disabled,
            select:disabled {
                @apply opacity-50 cursor-not-allowed;
            }

            /* Button styling */
            button {
                @apply bg-primary text-primary-foreground hover:bg-primary/90;
                @apply disabled:opacity-50 disabled:cursor-not-allowed;
                @apply focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2;
            }

            /* Secondary button variant */
            button.secondary {
                @apply bg-secondary text-secondary-foreground hover:bg-secondary/80;
            }

            /* Card styling */
            .card {
                @apply bg-card text-card-foreground;
                @apply border border-border;
                @apply rounded-lg shadow-sm;
            }

            /* Popover and dropdown styling */
            .popover {
                @apply bg-popover text-popover-foreground;
                @apply border border-border;
                @apply shadow-md rounded-md;
            }

            /* Link styling */
            a {
                @apply text-primary hover:text-primary/80;
                @apply focus:outline-none focus:ring-2 focus:ring-ring;
            }

            /* Muted text */
            .text-muted {
                @apply text-muted-foreground;
            }

            /* Accent backgrounds */
            .bg-accent {
                @apply bg-accent text-accent-foreground;
            }

            /* Destructive elements */
            .destructive {
                @apply bg-destructive text-destructive-foreground hover:bg-destructive/90;
            }

            /* Code blocks and pre elements */
            pre, code {
                @apply bg-muted text-muted-foreground;
                @apply rounded px-[0.3em] py-[0.2em];
            }

            /* Table styling */
            table {
                @apply border-collapse w-full;
            }

            th, td {
                @apply border border-border;
                @apply p-2 text-left;
            }

            th {
                @apply bg-muted font-semibold;
            }

            /* Badge/tag styling */
            .badge {
                @apply inline-flex items-center rounded-full;
                @apply px-2.5 py-0.5 text-xs font-semibold;
                @apply bg-primary/10 text-primary-foreground;
            }

            /* Focus outline for accessibility */
            :focus-visible {
                @apply outline-none ring-2 ring-ring ring-offset-2;
            }

            /* Selection styling */
            ::selection {
                @apply bg-primary/20 text-foreground;
            }
        </style>

        <!-- Styles -->
        <style>
            :root {
                --background: 0 0% 100%;
                --foreground: 222.2 84% 4.9%;
                --card: 0 0% 100%;
                --card-foreground: 222.2 84% 4.9%;
                --popover: 0 0% 100%;
                --popover-foreground: 222.2 84% 4.9%;
                --primary: 222.2 47.4% 11.2%;
                --primary-foreground: 210 40% 98%;
                --secondary: 210 40% 96.1%;
                --secondary-foreground: 222.2 47.4% 11.2%;
                --muted: 210 40% 96.1%;
                --muted-foreground: 215.4 16.3% 46.9%;
                --accent: 210 40% 96.1%;
                --accent-foreground: 222.2 47.4% 11.2%;
                --destructive: 0 84.2% 60.2%;
                --destructive-foreground: 210 40% 98%;
                --border: 214.3 31.8% 91.4%;
                --input: 214.3 31.8% 91.4%;
                --ring: 222.2 84% 4.9%;
                --radius: 0.5rem;
            }
            .dark {
                --background: 222.2 84% 4.9%;
                --foreground: 210 40% 98%;
                --card: 222.2 84% 4.9%;
                --card-foreground: 210 40% 98%;
                --popover: 222.2 84% 4.9%;
                --popover-foreground: 210 40% 98%;
                --primary: 210 40% 98%;
                --primary-foreground: 222.2 47.4% 11.2%;
                --secondary: 217.2 32.6% 17.5%;
                --secondary-foreground: 210 40% 98%;
                --muted: 217.2 32.6% 17.5%;
                --muted-foreground: 215 20.2% 65.1%;
                --accent: 217.2 32.6% 17.5%;
                --accent-foreground: 210 40% 98%;
                --destructive: 0 62.8% 30.6%;
                --destructive-foreground: 210 40% 98%;
                --border: 217.2 32.6% 17.5%;
                --input: 217.2 32.6% 17.5%;
                --ring: 212.7 26.8% 83.9%;
            }
        </style>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                darkMode: ["class"],
                theme: {
                    container: {
                        center: true,
                        padding: "2rem",
                        screens: {
                            "2xl": "1400px",
                        },
                    },
                    extend: {
                        colors: {
                            border: "hsl(var(--border))",
                            input: "hsl(var(--input))",
                            ring: "hsl(var(--ring))",
                            background: "hsl(var(--background))",
                            foreground: "hsl(var(--foreground))",
                            primary: {
                                DEFAULT: "hsl(var(--primary))",
                                foreground: "hsl(var(--primary-foreground))",
                            },
                            secondary: {
                                DEFAULT: "hsl(var(--secondary))",
                                foreground: "hsl(var(--secondary-foreground))",
                            },
                            destructive: {
                                DEFAULT: "hsl(var(--destructive))",
                                foreground: "hsl(var(--destructive-foreground))",
                            },
                            muted: {
                                DEFAULT: "hsl(var(--muted))",
                                foreground: "hsl(var(--muted-foreground))",
                            },
                            accent: {
                                DEFAULT: "hsl(var(--accent))",
                                foreground: "hsl(var(--accent-foreground))",
                            },
                            popover: {
                                DEFAULT: "hsl(var(--popover))",
                                foreground: "hsl(var(--popover-foreground))",
                            },
                            card: {
                                DEFAULT: "hsl(var(--card))",
                                foreground: "hsl(var(--card-foreground))",
                            },
                        },
                        borderRadius: {
                            lg: "var(--radius)",
                            md: "calc(var(--radius) - 2px)",
                            sm: "calc(var(--radius) - 4px)",
                        },
                    },
                },
            }
        </script>

        <!-- Load React only -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

        <script>
            // Ensure React and ReactDOM are globally available
            if (!window.React || !window.ReactDOM) {
               throw new Error('React or ReactDOM not loaded');
            }

            window.React = React;
            window.ReactDOM = ReactDOM;
            window.createPortal = ReactDOM.createPortal;
        </script>
    </head>
    <body class="bg-background text-foreground">
        <div id="root"></div>
        <script>
            var App = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
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
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // react-globals:react
  var require_react = __commonJS({
    "react-globals:react"(exports, module) {
      module.exports = window.React;
    }
  });

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    default: () => App
  });
  var import_react = __toESM(require_react());
  var Icon = (_a) => {
    var _b = _a, { name, className = "w-5 h-5" } = _b, props = __objRest(_b, ["name", "className"]);
    switch (name) {
      case "dashboard":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("rect", { x: "3", y: "3", width: "7", height: "7" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "14", y: "3", width: "7", height: "7" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "14", y: "14", width: "7", height: "7" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "3", y: "14", width: "7", height: "7" }));
      case "users":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("path", { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M23 21v-2a4 4 0 00-3-3.87" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M16 3.13a4 4 0 010 7.75" }));
      case "calendar":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" }));
      case "upload":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }), /* @__PURE__ */ import_react.default.createElement("polyline", { points: "17 8 12 3 7 8" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "12", y1: "3", x2: "12", y2: "15" }));
      case "history":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 8v4l3 3" }), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "9" }));
      case "settings":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "3" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" }));
      case "shield":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }));
      case "check":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("polyline", { points: "20 6 9 17 4 12" }));
      case "alert":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("path", { d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "12", y1: "9", x2: "12", y2: "13" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" }));
      case "refresh":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("polyline", { points: "23 4 23 10 17 10" }), /* @__PURE__ */ import_react.default.createElement("polyline", { points: "1 20 1 14 7 14" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" }));
      case "plus":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }));
      case "search":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }));
      case "printer":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("polyline", { points: "6 9 6 2 18 2 18 9" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "6", y: "14", width: "12", height: "8" }));
      case "download":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("path", { d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }), /* @__PURE__ */ import_react.default.createElement("polyline", { points: "7 10 12 15 17 10" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "12", y1: "15", x2: "12", y2: "3" }));
      case "cpu":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ry: "2" }), /* @__PURE__ */ import_react.default.createElement("rect", { x: "9", y: "9", width: "6", height: "6" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "9", y1: "1", x2: "9", y2: "4" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "15", y1: "1", x2: "15", y2: "4" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "9", y1: "20", x2: "9", y2: "23" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "15", y1: "20", x2: "15", y2: "23" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "20", y1: "9", x2: "23", y2: "9" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "20", y1: "15", x2: "23", y2: "15" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "1", y1: "9", x2: "4", y2: "9" }), /* @__PURE__ */ import_react.default.createElement("line", { x1: "1", y1: "15", x2: "4", y2: "15" }));
      case "trash":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" }));
      case "edit":
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("path", { d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" }), /* @__PURE__ */ import_react.default.createElement("path", { d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" }));
      default:
        return /* @__PURE__ */ import_react.default.createElement("svg", __spreadValues({ className, fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react.default.createElement("circle", { cx: "12", cy: "12", r: "10" }));
    }
  };
  var INITIAL_TEACHERS = [
    { id: "T01", code: "MATH01", name: "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C", dept: "\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C", mainSub: "\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21 \u0E21.4", subSub: ["\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19", "\u0E1F\u0E34\u0E2A\u0E34\u0E01\u0E2A\u0E4C\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19"], grades: ["\u0E21.4", "\u0E21.5", "\u0E21.6"], subHours: 2, status: "\u0E1B\u0E01\u0E15\u0E34" },
    { id: "T02", code: "SCI01", name: "\u0E04\u0E23\u0E39\u0E14\u0E23. \u0E19\u0E20\u0E32 \u0E1E\u0E07\u0E28\u0E4C\u0E2A\u0E38\u0E27\u0E23\u0E23\u0E13", dept: "\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C", mainSub: "\u0E40\u0E04\u0E21\u0E35\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C \u0E21.5", subSub: ["\u0E40\u0E04\u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19", "\u0E0A\u0E35\u0E27\u0E27\u0E34\u0E17\u0E22\u0E32"], grades: ["\u0E21.5", "\u0E21.6"], subHours: 5, status: "\u0E1B\u0E01\u0E15\u0E34" },
    { id: "T03", code: "ENG01", name: "\u0E04\u0E23\u0E39\u0E2A\u0E21\u0E0A\u0E32\u0E22 \u0E43\u0E08\u0E14\u0E35", dept: "\u0E20\u0E32\u0E29\u0E32\u0E15\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28", mainSub: "\u0E20\u0E32\u0E29\u0E32\u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23 \u0E21.1", subSub: ["\u0E20\u0E32\u0E29\u0E32\u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29\u0E2D\u0E48\u0E32\u0E19-\u0E40\u0E02\u0E35\u0E22\u0E19", "\u0E20\u0E32\u0E29\u0E32\u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29\u0E1F\u0E31\u0E07-\u0E1E\u0E39\u0E14"], grades: ["\u0E21.1", "\u0E21.2", "\u0E21.3"], subHours: 1, status: "\u0E1B\u0E01\u0E15\u0E34" },
    { id: "T04", code: "THAI01", name: "\u0E04\u0E23\u0E39\u0E2A\u0E38\u0E0A\u0E32\u0E14\u0E32 \u0E27\u0E07\u0E28\u0E4C\u0E1E\u0E32\u0E19\u0E34\u0E0A", dept: "\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22", mainSub: "\u0E27\u0E23\u0E23\u0E13\u0E04\u0E14\u0E35\u0E44\u0E17\u0E22 \u0E21.2", subSub: ["\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19", "\u0E1B\u0E23\u0E30\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E28\u0E34\u0E25\u0E1B\u0E4C"], grades: ["\u0E21.1", "\u0E21.2", "\u0E21.3"], subHours: 4, status: "\u0E1B\u0E01\u0E15\u0E34" },
    { id: "T05", code: "SOC01", name: "\u0E04\u0E23\u0E39\u0E1B\u0E23\u0E30\u0E40\u0E2A\u0E23\u0E34\u0E10 \u0E40\u0E25\u0E34\u0E28\u0E1E\u0E07\u0E28\u0E4C", dept: "\u0E2A\u0E31\u0E07\u0E04\u0E21\u0E28\u0E36\u0E01\u0E29\u0E32", mainSub: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E2A\u0E32\u0E01\u0E25 \u0E21.3", subSub: ["\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E1E\u0E25\u0E40\u0E21\u0E37\u0E2D\u0E07", "\u0E20\u0E39\u0E21\u0E34\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C"], grades: ["\u0E21.1", "\u0E21.2", "\u0E21.3"], subHours: 3, status: "\u0E1B\u0E01\u0E15\u0E34" },
    { id: "T06", code: "COMP01", name: "\u0E04\u0E23\u0E39\u0E21\u0E32\u0E25\u0E34\u0E19\u0E35 \u0E1E\u0E23\u0E2B\u0E21\u0E21\u0E32", dept: "\u0E04\u0E2D\u0E21\u0E1E\u0E34\u0E27\u0E40\u0E15\u0E2D\u0E23\u0E4C", mainSub: "\u0E27\u0E34\u0E17\u0E22\u0E32\u0E01\u0E32\u0E23\u0E04\u0E33\u0E19\u0E27\u0E13 \u0E21.4", subSub: ["\u0E04\u0E2D\u0E21\u0E1E\u0E34\u0E27\u0E40\u0E15\u0E2D\u0E23\u0E4C\u0E01\u0E23\u0E32\u0E1F\u0E34\u0E01", "\u0E01\u0E32\u0E23\u0E40\u0E02\u0E35\u0E22\u0E19\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E15\u0E49\u0E19"], grades: ["\u0E21.4", "\u0E21.5", "\u0E21.6"], subHours: 0, status: "\u0E1B\u0E01\u0E15\u0E34" },
    { id: "T07", code: "MATH02", name: "\u0E04\u0E23\u0E39\u0E18\u0E32\u0E19\u0E35 \u0E2A\u0E38\u0E02\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E34\u0E4C", dept: "\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C", mainSub: "\u0E41\u0E04\u0E25\u0E04\u0E39\u0E25\u0E31\u0E2A\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E15\u0E49\u0E19 \u0E21.6", subSub: ["\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C \u0E21.\u0E15\u0E49\u0E19", "\u0E2A\u0E16\u0E34\u0E15\u0E34"], grades: ["\u0E21.3", "\u0E21.6"], subHours: 6, status: "\u0E1B\u0E01\u0E15\u0E34" },
    { id: "T08", code: "SCI02", name: "\u0E04\u0E23\u0E39\u0E28\u0E34\u0E23\u0E34\u0E1E\u0E23 \u0E2D\u0E23\u0E38\u0E13\u0E23\u0E31\u0E15\u0E19\u0E4C", dept: "\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C", mainSub: "\u0E1F\u0E34\u0E2A\u0E34\u0E01\u0E2A\u0E4C\u0E01\u0E25\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C \u0E21.4", subSub: ["\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B", "\u0E40\u0E04\u0E21\u0E35 \u0E21.\u0E15\u0E49\u0E19"], grades: ["\u0E21.1", "\u0E21.4"], subHours: 2, status: "\u0E1B\u0E01\u0E15\u0E34" }
  ];
  var PERIODS = [
    { id: 1, name: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 1", time: "08:30 - 09:20" },
    { id: 2, name: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 2", time: "09:20 - 10:10" },
    { id: 3, name: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 3", time: "10:10 - 11:00" },
    { id: 4, name: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 4", time: "11:00 - 11:50" },
    { id: "lunch", name: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19", time: "11:50 - 12:40" },
    { id: 5, name: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 5", time: "12:40 - 13:30" },
    { id: 6, name: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 6", time: "13:30 - 14:20" },
    { id: 7, name: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 7", time: "14:20 - 15:15" }
  ];
  var INITIAL_ASSIGNMENTS = [
    { id: "SUB-101", date: "2026-10-30", period: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 2 (09:20 - 10:10)", room: "\u0E2B\u0E49\u0E2D\u0E07 401", subject: "\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21 \u0E21.4", absentTeacher: "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C", subTeacher: "\u0E04\u0E23\u0E39\u0E18\u0E32\u0E19\u0E35 \u0E2A\u0E38\u0E02\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E34\u0E4C", reason: "\u0E15\u0E23\u0E07\u0E15\u0E32\u0E21\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E23\u0E30\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C \u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E16\u0E19\u0E31\u0E14\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E2A\u0E39\u0E07 (\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E30\u0E2A\u0E21 6 \u0E04\u0E32\u0E1A)", subHours: 6, status: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E41\u0E25\u0E49\u0E27" },
    { id: "SUB-102", date: "2026-10-30", period: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 4 (11:00 - 11:50)", room: "\u0E2B\u0E49\u0E2D\u0E07 401", subject: "\u0E1F\u0E34\u0E2A\u0E34\u0E01\u0E2A\u0E4C\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19 \u0E21.4", absentTeacher: "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C", subTeacher: "\u0E04\u0E23\u0E39\u0E28\u0E34\u0E23\u0E34\u0E1E\u0E23 \u0E2D\u0E23\u0E38\u0E13\u0E23\u0E31\u0E15\u0E19\u0E4C", reason: "\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E16\u0E19\u0E31\u0E14\u0E27\u0E34\u0E0A\u0E32\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C/\u0E1F\u0E34\u0E2A\u0E34\u0E01\u0E2A\u0E4C \u0E27\u0E48\u0E32\u0E07\u0E43\u0E19\u0E04\u0E32\u0E1A\u0E14\u0E31\u0E07\u0E01\u0E25\u0E48\u0E32\u0E27 (\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E30\u0E2A\u0E21 2 \u0E04\u0E32\u0E1A)", subHours: 2, status: "\u0E23\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19" },
    { id: "SUB-103", date: "2026-10-30", period: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 3 (10:10 - 11:00)", room: "\u0E2B\u0E49\u0E2D\u0E07 502", subject: "\u0E40\u0E04\u0E21\u0E35\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C \u0E21.5", absentTeacher: "\u0E04\u0E23\u0E39\u0E14\u0E23. \u0E19\u0E20\u0E32 \u0E1E\u0E07\u0E28\u0E4C\u0E2A\u0E38\u0E27\u0E23\u0E23\u0E13", subTeacher: "\u0E04\u0E23\u0E39\u0E21\u0E32\u0E25\u0E34\u0E19\u0E35 \u0E1E\u0E23\u0E2B\u0E21\u0E21\u0E32", reason: "\u0E04\u0E23\u0E39\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E27\u0E34\u0E0A\u0E32\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C \u0E27\u0E48\u0E32\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E19 \u0E44\u0E21\u0E48\u0E15\u0E34\u0E14\u0E2A\u0E2D\u0E19 (\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E30\u0E2A\u0E21 0 \u0E04\u0E32\u0E1A)", subHours: 0, status: "\u0E23\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19" }
  ];
  function App() {
    const [userRole, setUserRole] = (0, import_react.useState)("admin");
    const [activeTab, setActiveTab] = (0, import_react.useState)("dashboard");
    const [toast, setToast] = (0, import_react.useState)(null);
    const [teachers, setTeachers] = (0, import_react.useState)(INITIAL_TEACHERS);
    const [assignments, setAssignments] = (0, import_react.useState)(INITIAL_ASSIGNMENTS);
    const [absentSelected, setAbsentSelected] = (0, import_react.useState)(["T01", "T02"]);
    const [selectedDate, setSelectedDate] = (0, import_react.useState)("2026-10-30");
    const [isAnalyzing, setIsAnalyzing] = (0, import_react.useState)(false);
    const [analysisResults, setAnalysisResults] = (0, import_react.useState)([]);
    const [showTeacherModal, setShowTeacherModal] = (0, import_react.useState)(false);
    const [editingTeacher, setEditingTeacher] = (0, import_react.useState)(null);
    const [ocrStep, OcrSetStep] = (0, import_react.useState)(1);
    const [ocrImageType, setOcrImageType] = (0, import_react.useState)("teacher");
    const [ocrScanning, setOcrScanning] = (0, import_react.useState)(false);
    const [ocrProgress, setOcrProgress] = (0, import_react.useState)(0);
    const [ocrData, setOcrData] = (0, import_react.useState)([
      { id: 1, day: "\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C", period: "\u0E04\u0E32\u0E1A 1", time: "08:30-09:20", room: "\u0E2B\u0E49\u0E2D\u0E07 401", code: "MATH401", name: "\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21", teacher: "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C", confidence: "high", flag: null },
      { id: 2, day: "\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C", period: "\u0E04\u0E32\u0E1A 2", time: "09:20-10:10", room: "\u0E2B\u0E49\u0E2D\u0E07 402", code: "MATH401", name: "\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21", teacher: "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C", confidence: "low", flag: "\u0E0A\u0E37\u0E48\u0E2D\u0E04\u0E23\u0E39\u0E2B\u0E23\u0E37\u0E2D\u0E04\u0E32\u0E1A\u0E2D\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19 (\u0E04\u0E27\u0E32\u0E21\u0E21\u0E31\u0E48\u0E19\u0E43\u0E08 62%)" },
      { id: 3, day: "\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23", period: "\u0E04\u0E32\u0E1A 3", time: "10:10-11:00", room: "\u0E2B\u0E49\u0E2D\u0E07 501", code: "SCI301", name: "\u0E40\u0E04\u0E21\u0E35\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C", teacher: "\u0E04\u0E23\u0E39\u0E14\u0E23. \u0E19\u0E20\u0E32 \u0E1E\u0E07\u0E28\u0E4C\u0E2A\u0E38\u0E27\u0E23\u0E23\u0E13", confidence: "high", flag: null },
      { id: 4, day: "\u0E1E\u0E38\u0E18", period: "\u0E04\u0E32\u0E1A 4", time: "11:00-11:50", room: "\u0E2B\u0E49\u0E2D\u0E07 101", code: "ENG101", name: "\u0E20\u0E32\u0E29\u0E32\u0E2D\u0E31\u0E07\u0E01\u0E24\u0E29\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23", teacher: "\u0E04\u0E23\u0E39\u0E2A\u0E21\u0E0A\u0E32\u0E22 \u0E43\u0E08\u0E14\u0E35", confidence: "medium", flag: "\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E04\u0E32\u0E1A\u0E0B\u0E49\u0E33\u0E0B\u0E49\u0E2D\u0E19\u0E01\u0E31\u0E1A\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2B\u0E49\u0E2D\u0E07 102" }
    ]);
    const [auditLogs, setAuditLogs] = (0, import_react.useState)([
      { id: "LOG-01", timestamp: "2026-10-30 08:15", actor: "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23 (\u0E1E\u0E34\u0E21\u0E1E\u0E23\u0E23\u0E13)", action: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E41\u0E25\u0E30\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34", details: "\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E41\u0E17\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A \u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E41\u0E25\u0E30 \u0E04\u0E23\u0E39\u0E14\u0E23. \u0E19\u0E20\u0E32" },
      { id: "LOG-02", timestamp: "2026-10-29 16:30", actor: "\u0E1C\u0E39\u0E49\u0E14\u0E39\u0E41\u0E25\u0E23\u0E30\u0E1A\u0E1A (Admin)", action: "\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E04\u0E23\u0E39", details: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E27\u0E34\u0E0A\u0E32\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E43\u0E2B\u0E49 \u0E04\u0E23\u0E39\u0E21\u0E32\u0E25\u0E34\u0E19\u0E35 \u0E1E\u0E23\u0E2B\u0E21\u0E21\u0E32" },
      { id: "LOG-03", timestamp: "2026-10-28 09:00", actor: "\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23 (\u0E1C\u0E2D.\u0E40\u0E01\u0E23\u0E35\u0E22\u0E07\u0E44\u0E01\u0E23)", action: "\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C", details: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E23\u0E27\u0E21 12 \u0E04\u0E32\u0E1A" }
    ]);
    const showToast = (message, type = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 4e3);
    };
    const handleRunAnalysis = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        const newResults = [
          {
            id: "ANA-1",
            date: selectedDate,
            period: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 1 (08:30 - 09:20)",
            room: "\u0E2B\u0E49\u0E2D\u0E07 401",
            subject: "\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21 \u0E21.4",
            absentTeacher: "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C",
            recommended: "\u0E04\u0E23\u0E39\u0E18\u0E32\u0E19\u0E35 \u0E2A\u0E38\u0E02\u0E2A\u0E27\u0E31\u0E2A\u0E14\u0E34\u0E4C",
            alternatives: ["\u0E04\u0E23\u0E39\u0E28\u0E34\u0E23\u0E34\u0E1E\u0E23 \u0E2D\u0E23\u0E38\u0E13\u0E23\u0E31\u0E15\u0E19\u0E4C", "\u0E04\u0E23\u0E39\u0E21\u0E32\u0E25\u0E34\u0E19\u0E35 \u0E1E\u0E23\u0E2B\u0E21\u0E21\u0E32"],
            reason: "\u0E15\u0E23\u0E07\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E23\u0E30\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C \u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E16\u0E19\u0E31\u0E14\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E2A\u0E39\u0E07 \u0E04\u0E32\u0E1A\u0E44\u0E21\u0E48\u0E0A\u0E19\u0E01\u0E31\u0E19 \u0E20\u0E32\u0E23\u0E30\u0E2A\u0E30\u0E2A\u0E21\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 (6 \u0E04\u0E32\u0E1A)",
            subHours: 6,
            status: "\u0E23\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19",
            hardPassed: true
          },
          {
            id: "ANA-2",
            date: selectedDate,
            period: "\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 3 (10:10 - 11:00)",
            room: "\u0E2B\u0E49\u0E2D\u0E07 502",
            subject: "\u0E40\u0E04\u0E21\u0E35\u0E2D\u0E34\u0E19\u0E17\u0E23\u0E35\u0E22\u0E4C \u0E21.5",
            absentTeacher: "\u0E04\u0E23\u0E39\u0E14\u0E23. \u0E19\u0E20\u0E32 \u0E1E\u0E07\u0E28\u0E4C\u0E2A\u0E38\u0E27\u0E23\u0E23\u0E13",
            recommended: "\u0E04\u0E23\u0E39\u0E28\u0E34\u0E23\u0E34\u0E1E\u0E23 \u0E2D\u0E23\u0E38\u0E13\u0E23\u0E31\u0E15\u0E19\u0E4C",
            alternatives: ["\u0E04\u0E23\u0E39\u0E21\u0E32\u0E25\u0E34\u0E19\u0E35 \u0E1E\u0E23\u0E2B\u0E21\u0E21\u0E32", "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C (\u0E15\u0E34\u0E14\u0E2A\u0E2D\u0E19\u0E40\u0E2D\u0E07)"],
            reason: "\u0E08\u0E1A\u0E40\u0E2D\u0E01\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C/\u0E1F\u0E34\u0E2A\u0E34\u0E01\u0E2A\u0E4C \u0E27\u0E48\u0E32\u0E07\u0E43\u0E19\u0E04\u0E32\u0E1A\u0E19\u0E35\u0E49 \u0E20\u0E32\u0E23\u0E30\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14\u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E23\u0E30 (2 \u0E04\u0E32\u0E1A)",
            subHours: 2,
            status: "\u0E23\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19",
            hardPassed: true
          }
        ];
        setAnalysisResults(newResults);
        showToast("\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08! \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E02\u0E49\u0E2D\u0E08\u0E33\u0E01\u0E31\u0E14\u0E41\u0E25\u0E30\u0E04\u0E30\u0E41\u0E19\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "success");
      }, 1200);
    };
    const runTestScenario = (scenarioId) => {
      switch (scenarioId) {
        case 1:
          setAbsentSelected(["T01"]);
          setSelectedDate("2026-10-31");
          setActiveTab("substitute");
          showToast("\u0E42\u0E2B\u0E25\u0E14\u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E14\u0E2A\u0E2D\u0E1A: \u0E04\u0E23\u0E39 1 \u0E04\u0E19\u0E25\u0E32 1 \u0E27\u0E31\u0E19 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "info");
          break;
        case 2:
          setAbsentSelected(["T01", "T02", "T04"]);
          setSelectedDate("2026-10-31");
          setActiveTab("substitute");
          showToast("\u0E42\u0E2B\u0E25\u0E14\u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E14\u0E2A\u0E2D\u0E1A: \u0E04\u0E23\u0E39\u0E2B\u0E25\u0E32\u0E22\u0E04\u0E19\u0E25\u0E32\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "info");
          break;
        case 3:
          setAbsentSelected(["T03"]);
          setSelectedDate("2026-10-31");
          setActiveTab("substitute");
          showToast("\u0E42\u0E2B\u0E25\u0E14\u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E14\u0E2A\u0E2D\u0E1A: \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2A\u0E30\u0E2A\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E22\u0E38\u0E15\u0E34\u0E18\u0E23\u0E23\u0E21 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "info");
          break;
        case 4:
          setAbsentSelected(["T02"]);
          setSelectedDate("2026-10-31");
          setActiveTab("substitute");
          showToast("\u0E42\u0E2B\u0E25\u0E14\u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E14\u0E2A\u0E2D\u0E1A: \u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E02\u0E49\u0E2D\u0E08\u0E33\u0E01\u0E31\u0E14\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A (Hard Constraint) \u0E27\u0E34\u0E0A\u0E32\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07 \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "warning");
          break;
        case 5:
          setAbsentSelected(["T01", "T02", "T07", "T08"]);
          setSelectedDate("2026-10-31");
          setActiveTab("substitute");
          showToast("\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19: \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E23\u0E39\u0E27\u0E48\u0E32\u0E07\u0E43\u0E19\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48 2 \u0E41\u0E25\u0E30 4 \u0E23\u0E30\u0E1A\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E1A\u0E38\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48\u0E02\u0E32\u0E14\u0E04\u0E23\u0E39\u0E41\u0E17\u0E19\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19", "error");
          break;
        case 6:
          setActiveTab("ocr");
          OcrSetStep(5);
          showToast("\u0E42\u0E2B\u0E25\u0E14\u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E14\u0E2A\u0E2D\u0E1A: \u0E20\u0E32\u0E1E OCR \u0E2D\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E0A\u0E31\u0E14\u0E41\u0E25\u0E30\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E02\u0E31\u0E14\u0E41\u0E22\u0E49\u0E07", "warning");
          break;
        default:
          break;
      }
    };
    const canPerformAction = (actionType) => {
      if (userRole === "admin")
        return true;
      if (userRole === "academic") {
        return ["analyze", "import", "edit_sub", "confirm"].includes(actionType);
      }
      if (userRole === "executive") {
        return ["approve", "view"].includes(actionType);
      }
      return ["view"].includes(actionType);
    };
    return /* @__PURE__ */ import_react.default.createElement("div", { className: "min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans" }, toast && /* @__PURE__ */ import_react.default.createElement("div", { className: `fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg border flex items-center space-x-3 transition-all animate-bounce ${toast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : toast.type === "warning" ? "bg-amber-50 border-amber-200 text-amber-800" : toast.type === "error" ? "bg-rose-50 border-rose-200 text-rose-800" : "bg-blue-50 border-blue-200 text-blue-800"}` }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: toast.type === "error" ? "alert" : "check", className: "w-5 h-5 flex-shrink-0" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-medium text-sm" }, toast.message)), /* @__PURE__ */ import_react.default.createElement("header", { className: "bg-slate-900 text-white shadow-md sticky top-0 z-40" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-indigo-600 p-2.5 rounded-xl shadow-inner flex items-center justify-center" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "cpu", className: "w-6 h-6 text-white" })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-lg font-bold tracking-tight" }, "SubTeach AI"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30 font-semibold" }, "School Edition 1.0")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-400" }, "\u0E23\u0E30\u0E1A\u0E1A\u0E2D\u0E31\u0E08\u0E09\u0E23\u0E34\u0E22\u0E30\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E44\u0E17\u0E22 | \u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E2D\u0E38\u0E14\u0E21\u0E28\u0E36\u0E01\u0E29\u0E32\u0E1E\u0E31\u0E12\u0E19\u0E27\u0E34\u0E17\u0E22\u0E4C"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-slate-400 px-2 font-medium flex items-center gap-1" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "shield", className: "w-3.5 h-3.5 text-amber-400" }), " \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19:"), [
      { id: "admin", label: "\u0E1C\u0E39\u0E49\u0E14\u0E39\u0E41\u0E25\u0E23\u0E30\u0E1A\u0E1A (Admin)" },
      { id: "academic", label: "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23" },
      { id: "executive", label: "\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23" },
      { id: "general", label: "\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B" }
    ].map((r) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: r.id,
        onClick: () => {
          setUserRole(r.id);
          showToast(`\u0E2A\u0E25\u0E31\u0E1A\u0E42\u0E2B\u0E21\u0E14\u0E40\u0E1B\u0E47\u0E19: ${r.label} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22`, "info");
        },
        className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${userRole === r.id ? "bg-indigo-600 text-white shadow" : "text-slate-300 hover:text-white hover:bg-slate-700/60"}`
      },
      r.label
    ))))), /* @__PURE__ */ import_react.default.createElement("nav", { className: "bg-white border-b border-slate-200 shadow-sm" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-7xl mx-auto px-4 flex overflow-x-auto space-x-1 no-scrollbar" }, [
      { id: "dashboard", label: "1. Dashboard", icon: "dashboard" },
      { id: "substitute", label: "2. \u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19", icon: "calendar" },
      { id: "timetable", label: "3. \u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19", icon: "grid" },
      { id: "teachers", label: "4. \u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E04\u0E23\u0E39\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E16\u0E19\u0E31\u0E14", icon: "users" },
      { id: "ocr", label: "5. \u0E19\u0E33\u0E40\u0E02\u0E49\u0E32\u0E15\u0E32\u0E23\u0E32\u0E07\u0E08\u0E32\u0E01\u0E20\u0E32\u0E1E (OCR)", icon: "upload" },
      { id: "history", label: "6. \u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19", icon: "history" },
      { id: "settings", label: "7. \u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E41\u0E25\u0E30\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E40\u0E04\u0E2A", icon: "settings" }
    ].map((tab) => /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        key: tab.id,
        onClick: () => setActiveTab(tab.id),
        className: `flex items-center space-x-2 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-indigo-600 text-indigo-600 bg-indigo-50/50" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: tab.icon === "grid" ? "calendar" : tab.icon, className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, tab.label)
    )))), /* @__PURE__ */ import_react.default.createElement("main", { className: "flex-1 max-w-7xl w-full mx-auto p-4 md:p-6" }, activeTab === "dashboard" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "bg-indigo-500/40 text-indigo-200 text-xs px-3 py-1 rounded-full border border-indigo-400/35 font-medium" }, "\u0E20\u0E32\u0E04\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 2 / \u0E1B\u0E35\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32 2569"), /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-2xl font-bold" }, "\u0E22\u0E34\u0E19\u0E14\u0E35\u0E15\u0E49\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E2A\u0E39\u0E48 SubTeach AI School Edition"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-sm text-indigo-200 max-w-2xl" }, "\u0E23\u0E30\u0E1A\u0E1A\u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E14\u0E49\u0E27\u0E22 AI \u0E2D\u0E31\u0E08\u0E09\u0E23\u0E34\u0E22\u0E30 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E0E\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E02\u0E49\u0E2D\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A (Hard Constraints) \u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E22\u0E38\u0E15\u0E34\u0E18\u0E23\u0E23\u0E21\u0E43\u0E19\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19 (Soft Constraints)")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col sm:flex-row gap-3" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setActiveTab("substitute"),
        className: "bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-sm"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "calendar", className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E40\u0E23\u0E34\u0E48\u0E21\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49")
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setActiveTab("ocr"),
        className: "bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl border border-white/25 transition flex items-center justify-center space-x-2 text-sm"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "upload", className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E19\u0E33\u0E40\u0E02\u0E49\u0E32\u0E15\u0E32\u0E23\u0E32\u0E07\u0E08\u0E32\u0E01\u0E20\u0E32\u0E1E")
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 font-medium" }, "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E04\u0E23\u0E39\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-2xl font-bold text-slate-900 mt-1" }, teachers.length, " \u0E04\u0E19"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-emerald-600 font-medium mt-1 inline-block" }, "\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E1B\u0E01\u0E15\u0E34\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E2A\u0E2D\u0E19")), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-indigo-50 p-3 rounded-xl text-indigo-600" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "users", className: "w-6 h-6" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 font-medium" }, "\u0E04\u0E23\u0E39\u0E25\u0E32 / \u0E44\u0E21\u0E48\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E2D\u0E19\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-2xl font-bold text-rose-600 mt-1" }, absentSelected.length, " \u0E04\u0E19"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-rose-500 font-medium mt-1 inline-block" }, "\u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E14\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19 ", absentSelected.length * 3, " \u0E04\u0E32\u0E1A")), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-rose-50 p-3 rounded-xl text-rose-600" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "alert", className: "w-6 h-6" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 font-medium" }, "\u0E23\u0E2D\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-2xl font-bold text-amber-600 mt-1" }, assignments.filter((a) => a.status === "\u0E23\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19").length, " \u0E04\u0E32\u0E1A"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-amber-500 font-medium mt-1 inline-block" }, "\u0E23\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14")), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-amber-50 p-3 rounded-xl text-amber-600" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "history", className: "w-6 h-6" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 font-medium" }, "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21"), /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-2xl font-bold text-emerald-600 mt-1" }, "100%"), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-slate-500 font-medium mt-1 inline-block" }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E32\u0E1A\u0E15\u0E01\u0E2B\u0E25\u0E48\u0E19")), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-emerald-50 p-3 rounded-xl text-emerald-600" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "check", className: "w-6 h-6" })))), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mb-4" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-slate-800 text-base" }, "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E07\u0E32\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 (Audit Trail)"), /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => setActiveTab("history"), className: "text-xs text-indigo-600 font-semibold hover:underline" }, "\u0E14\u0E39\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14")), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, auditLogs.map((log, idx) => /* @__PURE__ */ import_react.default.createElement("div", { key: idx, className: "flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-indigo-100 text-indigo-700 p-2 rounded-lg mt-0.5" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "history", className: "w-4 h-4" })), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs font-bold text-slate-900" }, log.action), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs text-slate-400" }, log.timestamp)), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-600 mt-0.5" }, log.details), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded mt-1 inline-block" }, "\u0E1C\u0E39\u0E49\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23: ", log.actor)))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-slate-800 text-base mb-2" }, "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E40\u0E04\u0E2A\u0E01\u0E23\u0E13\u0E35\u0E28\u0E36\u0E01\u0E29\u0E32\u0E14\u0E48\u0E27\u0E19"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mb-4" }, "\u0E17\u0E14\u0E25\u0E2D\u0E07\u0E08\u0E33\u0E25\u0E2D\u0E07\u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E15\u0E48\u0E32\u0E07\u0E46 \u0E15\u0E32\u0E21\u0E42\u0E08\u0E17\u0E22\u0E4C\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 (Test Scenarios)"), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => runTestScenario(1),
        className: "w-full text-left text-xs bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 p-2.5 rounded-xl border border-slate-200 transition font-medium flex items-center justify-between"
      },
      /* @__PURE__ */ import_react.default.createElement("span", null, "1. \u0E04\u0E23\u0E39 1 \u0E04\u0E19\u0E25\u0E32 1 \u0E27\u0E31\u0E19"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "text-indigo-600 font-bold" }, "\u2192")
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => runTestScenario(2),
        className: "w-full text-left text-xs bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 p-2.5 rounded-xl border border-slate-200 transition font-medium flex items-center justify-between"
      },
      /* @__PURE__ */ import_react.default.createElement("span", null, "2. \u0E04\u0E23\u0E39\u0E2B\u0E25\u0E32\u0E22\u0E04\u0E19\u0E25\u0E32\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "text-indigo-600 font-bold" }, "\u2192")
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => runTestScenario(5),
        className: "w-full text-left text-xs bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 p-2.5 rounded-xl border border-slate-200 transition font-medium flex items-center justify-between"
      },
      /* @__PURE__ */ import_react.default.createElement("span", null, "5. \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E23\u0E39\u0E27\u0E48\u0E32\u0E07\u0E43\u0E19\u0E04\u0E32\u0E1A (\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19)"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "text-rose-600 font-bold" }, "\u2192")
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-6 pt-4 border-t border-slate-100" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-amber-50 border border-amber-200 p-3 rounded-xl" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2 text-amber-800 font-semibold text-xs mb-1" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "shield", className: "w-4 h-4 text-amber-600" }), /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19: ", userRole.toUpperCase())), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-[11px] text-amber-700" }, "\u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E33\u0E07\u0E32\u0E19\u0E2A\u0E21\u0E1A\u0E39\u0E23\u0E13\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E27\u0E47\u0E1A\u0E41\u0E25\u0E30\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E33\u0E25\u0E2D\u0E07")))))), activeTab === "substitute" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "\u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2D\u0E31\u0E08\u0E09\u0E23\u0E34\u0E22\u0E30 (Substitute Engine)"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E25\u0E30\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E04\u0E23\u0E39\u0E17\u0E35\u0E48\u0E25\u0E32 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E43\u0E2B\u0E49 AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E41\u0E17\u0E19\u0E15\u0E32\u0E21\u0E01\u0E0E\u0E02\u0E49\u0E2D\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E22\u0E38\u0E15\u0E34\u0E18\u0E23\u0E23\u0E21")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-3 w-full md:w-auto" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-xs font-semibold text-slate-600 mb-1" }, "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19:"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "date",
        value: selectedDate,
        onChange: (e) => setSelectedDate(e.target.value),
        className: "border border-slate-300 rounded-xl px-3 py-2 text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
      }
    )))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-sm font-bold text-slate-800 mb-3 flex items-center space-x-2" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "users", className: "w-4 h-4 text-indigo-600" }), /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E04\u0E23\u0E39\u0E17\u0E35\u0E48\u0E25\u0E32 / \u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E2D\u0E19\u0E44\u0E14\u0E49\u0E43\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ", selectedDate, ":")), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" }, teachers.map((t) => {
      const isSelected = absentSelected.includes(t.id);
      return /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          key: t.id,
          onClick: () => {
            if (isSelected) {
              setAbsentSelected(absentSelected.filter((id) => id !== t.id));
            } else {
              setAbsentSelected([...absentSelected, t.id]);
            }
          },
          className: `cursor-pointer p-3 rounded-xl border transition flex items-center justify-between ${isSelected ? "bg-rose-50 border-rose-300 text-rose-900 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"}`
        },
        /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "font-bold text-xs" }, t.name), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[10px] text-slate-500" }, t.dept)),
        /* @__PURE__ */ import_react.default.createElement("div", { className: `w-5 h-5 rounded-full flex items-center justify-center text-xs ${isSelected ? "bg-rose-600 text-white" : "border border-slate-300"}` }, isSelected && "\u2713")
      );
    })), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-5 flex justify-end" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        disabled: absentSelected.length === 0 || isAnalyzing,
        onClick: handleRunAnalysis,
        className: "bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg transition flex items-center space-x-2 text-sm"
      },
      isAnalyzing ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "refresh", className: "w-4 h-4 animate-spin" }), /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25\u0E02\u0E49\u0E2D\u0E08\u0E33\u0E01\u0E31\u0E14\u0E14\u0E49\u0E27\u0E22 AI...")) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "cpu", className: "w-4 h-4" }), /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19 (", absentSelected.length, " \u0E17\u0E48\u0E32\u0E19\u0E17\u0E35\u0E48\u0E25\u0E32)"))
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-6 border-b border-slate-200 flex justify-between items-center" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-slate-900 text-base" }, "\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E41\u0E25\u0E30\u0E08\u0E31\u0E14\u0E2A\u0E23\u0E23\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500" }, "\u0E41\u0E22\u0E01\u0E02\u0E49\u0E2D\u0E08\u0E33\u0E01\u0E31\u0E14\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A (Hard Constraints \u0E40\u0E0A\u0E48\u0E19 \u0E2B\u0E49\u0E32\u0E21\u0E2A\u0E2D\u0E19\u0E0A\u0E19\u0E04\u0E32\u0E1A, \u0E2B\u0E49\u0E32\u0E21\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E17\u0E35\u0E48\u0E25\u0E32) \u0E41\u0E25\u0E30\u0E04\u0E30\u0E41\u0E19\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21 (Soft Constraints)")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => showToast("\u0E1E\u0E34\u0E21\u0E1E\u0E4C\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E41\u0E15\u0E48\u0E07\u0E15\u0E31\u0E49\u0E07\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "info"),
        className: "bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "printer", className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E1E\u0E34\u0E21\u0E1E\u0E4C")
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => showToast("\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1F\u0E25\u0E4C Excel (CSV) \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "success"),
        className: "bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "download", className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01 Excel")
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ import_react.default.createElement("table", { className: "w-full text-left border-collapse text-xs" }, /* @__PURE__ */ import_react.default.createElement("thead", null, /* @__PURE__ */ import_react.default.createElement("tr", { className: "bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold" }, /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E04\u0E32\u0E1A / \u0E40\u0E27\u0E25\u0E32"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19 / \u0E27\u0E34\u0E0A\u0E32"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E04\u0E23\u0E39\u0E1C\u0E39\u0E49\u0E25\u0E32"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E17\u0E35\u0E48\u0E41\u0E19\u0E30\u0E19\u0E33"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08 (Hard & Soft)"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E30\u0E2A\u0E21"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E2A\u0E16\u0E32\u0E19\u0E30"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5 text-center" }, "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23"))), /* @__PURE__ */ import_react.default.createElement("tbody", { className: "divide-y divide-slate-100" }, (analysisResults.length > 0 ? analysisResults : assignments).map((item, idx) => /* @__PURE__ */ import_react.default.createElement("tr", { key: item.id || idx, className: "hover:bg-slate-50/80" }, /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 font-medium text-slate-900" }, item.period || item.date), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "font-semibold text-slate-800" }, item.room), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-slate-500 text-[11px]" }, item.subject)), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 font-semibold text-rose-600" }, item.absentTeacher), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ import_react.default.createElement(
      "select",
      {
        defaultValue: item.recommended || item.subTeacher,
        onChange: (e) => showToast(`\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E40\u0E1B\u0E47\u0E19 ${e.target.value} \u0E41\u0E25\u0E30\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E02\u0E31\u0E14\u0E41\u0E22\u0E49\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22`, "success"),
        className: "bg-indigo-50 border border-indigo-200 text-indigo-900 font-semibold rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500"
      },
      /* @__PURE__ */ import_react.default.createElement("option", { value: item.recommended || item.subTeacher }, item.recommended || item.subTeacher, " (\u0E41\u0E19\u0E30\u0E19\u0E33)"),
      /* @__PURE__ */ import_react.default.createElement("option", { value: "\u0E04\u0E23\u0E39\u0E28\u0E34\u0E23\u0E34\u0E1E\u0E23 \u0E2D\u0E23\u0E38\u0E13\u0E23\u0E31\u0E15\u0E19\u0E4C" }, "\u0E04\u0E23\u0E39\u0E28\u0E34\u0E23\u0E34\u0E1E\u0E23 \u0E2D\u0E23\u0E38\u0E13\u0E23\u0E31\u0E15\u0E19\u0E4C (\u0E2A\u0E33\u0E23\u0E2D\u0E07)"),
      /* @__PURE__ */ import_react.default.createElement("option", { value: "\u0E04\u0E23\u0E39\u0E21\u0E32\u0E25\u0E34\u0E19\u0E35 \u0E1E\u0E23\u0E2B\u0E21\u0E21\u0E32" }, "\u0E04\u0E23\u0E39\u0E21\u0E32\u0E25\u0E34\u0E19\u0E35 \u0E1E\u0E23\u0E2B\u0E21\u0E21\u0E32 (\u0E2A\u0E33\u0E23\u0E2D\u0E07)")
    )), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 text-slate-600 max-w-xs" }, item.reason), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 font-bold text-slate-700" }, item.subHours, " \u0E04\u0E32\u0E1A"), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ import_react.default.createElement("span", { className: `px-2.5 py-1 rounded-full text-[10px] font-semibold ${item.status === "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E41\u0E25\u0E49\u0E27" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}` }, item.status)), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 text-center" }, canPerformAction("confirm") && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => showToast(`\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 ${item.id || idx} \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22`, "success"),
        className: "bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold transition shadow-sm"
      },
      "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19"
    ))))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-xs text-slate-500" }, "* \u0E23\u0E30\u0E1A\u0E1A\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A\u0E43\u0E0A\u0E49 Hard Constraints \u0E40\u0E15\u0E47\u0E21\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A: \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E32\u0E1A\u0E0A\u0E19, \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E23\u0E39\u0E17\u0E35\u0E48\u0E25\u0E32 \u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E0B\u0E49\u0E33\u0E0B\u0E49\u0E2D\u0E19\u0E43\u0E19\u0E04\u0E32\u0E1A\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19"), canPerformAction("confirm") && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => showToast("\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27 \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E25\u0E07\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E16\u0E32\u0E27\u0E23", "success"),
        className: "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md text-xs transition flex items-center space-x-2"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "check", className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (Confirm All)")
    )))), activeTab === "timetable" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19 (Master Timetable)"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u0E01\u0E33\u0E2B\u0E19\u0E14\u0E04\u0E32\u0E1A\u0E41\u0E25\u0E30\u0E40\u0E27\u0E25\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E2A\u0E35\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E23\u0E30")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-3" }, /* @__PURE__ */ import_react.default.createElement("select", { className: "border border-slate-300 rounded-xl px-3 py-2 text-xs bg-slate-50 font-medium" }, /* @__PURE__ */ import_react.default.createElement("option", null, "\u0E41\u0E2A\u0E14\u0E07\u0E15\u0E32\u0E21: \u0E04\u0E23\u0E39\u0E1C\u0E39\u0E49\u0E2A\u0E2D\u0E19"), /* @__PURE__ */ import_react.default.createElement("option", null, "\u0E41\u0E2A\u0E14\u0E07\u0E15\u0E32\u0E21: \u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19"), /* @__PURE__ */ import_react.default.createElement("option", null, "\u0E41\u0E2A\u0E14\u0E07\u0E15\u0E32\u0E21: \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E23\u0E30")), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => showToast("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E04\u0E32\u0E1A\u0E40\u0E23\u0E35\u0E22\u0E19\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "success"),
        className: "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow transition"
      },
      "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E27\u0E25\u0E32\u0E04\u0E32\u0E1A\u0E40\u0E23\u0E35\u0E22\u0E19"
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ import_react.default.createElement("table", { className: "w-full text-center border-collapse text-xs" }, /* @__PURE__ */ import_react.default.createElement("thead", null, /* @__PURE__ */ import_react.default.createElement("tr", { className: "bg-slate-900 text-white" }, /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5 border border-slate-700" }, "\u0E04\u0E32\u0E1A / \u0E40\u0E27\u0E25\u0E32"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5 border border-slate-700" }, "\u0E27\u0E31\u0E19\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5 border border-slate-700" }, "\u0E27\u0E31\u0E19\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5 border border-slate-700" }, "\u0E27\u0E31\u0E19\u0E1E\u0E38\u0E18"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5 border border-slate-700" }, "\u0E27\u0E31\u0E19\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5 border border-slate-700" }, "\u0E27\u0E31\u0E19\u0E28\u0E38\u0E01\u0E23\u0E4C"))), /* @__PURE__ */ import_react.default.createElement("tbody", { className: "divide-y divide-slate-200" }, PERIODS.map((p) => /* @__PURE__ */ import_react.default.createElement("tr", { key: p.id, className: p.lunch ? "bg-slate-100 font-semibold" : "hover:bg-slate-50" }, /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3 border border-slate-200 bg-slate-50 font-semibold text-slate-700" }, /* @__PURE__ */ import_react.default.createElement("div", null, p.name), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[10px] text-slate-400" }, p.time)), p.lunch ? /* @__PURE__ */ import_react.default.createElement("td", { colSpan: "5", className: "p-3 border border-slate-200 text-slate-500 font-bold bg-amber-50 text-amber-800" }, "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 (11:50 - 12:40)") : ["\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C", "\u0E2D\u0E31\u0E07\u0E04\u0E32\u0E23", "\u0E1E\u0E38\u0E18", "\u0E1E\u0E24\u0E2B\u0E31\u0E2A\u0E1A\u0E14\u0E35", "\u0E28\u0E38\u0E01\u0E23\u0E4C"].map((day, dIdx) => /* @__PURE__ */ import_react.default.createElement("td", { key: dIdx, className: "p-3 border border-slate-200 text-left align-top" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-indigo-50 border border-indigo-100 p-2 rounded-xl" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "font-bold text-indigo-900 text-[11px]" }, "\u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C \u0E21.", dIdx + 1), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-slate-600 text-[10px]" }, "\u0E2B\u0E49\u0E2D\u0E07 40", dIdx + 1), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-slate-500 text-[9px] mt-1" }, "\u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C"))))))))))), activeTab === "teachers" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E04\u0E23\u0E39\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E16\u0E19\u0E31\u0E14 (Teacher Registry)"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E23\u0E39 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E23\u0E30 \u0E27\u0E34\u0E0A\u0E32\u0E17\u0E35\u0E48\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E44\u0E14\u0E49 \u0E41\u0E25\u0E30\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2A\u0E30\u0E2A\u0E21")), canPerformAction("analyze") && /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          setEditingTeacher(null);
          setShowTeacherModal(true);
        },
        className: "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow text-xs flex items-center space-x-2 transition"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "plus", className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E23\u0E39\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A")
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ import_react.default.createElement("table", { className: "w-full text-left border-collapse text-xs" }, /* @__PURE__ */ import_react.default.createElement("thead", null, /* @__PURE__ */ import_react.default.createElement("tr", { className: "bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold" }, /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E23\u0E39"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E23\u0E30"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E27\u0E34\u0E0A\u0E32\u0E2B\u0E25\u0E31\u0E01 / \u0E27\u0E34\u0E0A\u0E32\u0E17\u0E35\u0E48\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E44\u0E14\u0E49"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E0A\u0E31\u0E49\u0E19"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2A\u0E30\u0E2A\u0E21"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E2A\u0E16\u0E32\u0E19\u0E30"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5 text-center" }, "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23"))), /* @__PURE__ */ import_react.default.createElement("tbody", { className: "divide-y divide-slate-100" }, teachers.map((t) => /* @__PURE__ */ import_react.default.createElement("tr", { key: t.id, className: "hover:bg-slate-50/80" }, /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 font-mono font-bold text-indigo-600" }, t.code), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 font-semibold text-slate-900" }, t.name), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 font-medium" }, t.dept)), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "font-semibold text-slate-800" }, t.mainSub), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[10px] text-slate-500" }, "\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19: ", t.subSub.join(", "))), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5" }, t.grades.join(", ")), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 font-bold text-slate-700" }, t.subHours, " \u0E04\u0E32\u0E1A"), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-semibold" }, t.status)), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 text-center" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          setEditingTeacher(t);
          setShowTeacherModal(true);
        },
        className: "bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg transition"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "edit", className: "w-4 h-4" })
    )))))))), showTeacherModal && /* @__PURE__ */ import_react.default.createElement("div", { className: "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-lg font-bold text-slate-900" }, editingTeacher ? "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E23\u0E39" : "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E23\u0E39\u0E43\u0E2B\u0E21\u0E48\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A"), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-xs font-semibold text-slate-600 mb-1" }, "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25:"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "text",
        defaultValue: editingTeacher ? editingTeacher.name : "",
        placeholder: "\u0E40\u0E0A\u0E48\u0E19 \u0E04\u0E23\u0E39\u0E27\u0E34\u0E0A\u0E31\u0E22 \u0E01\u0E38\u0E25\u0E27\u0E13\u0E34\u0E0A\u0E22\u0E4C",
        className: "w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-xs font-semibold text-slate-600 mb-1" }, "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E23\u0E30\u0E01\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49:"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "text",
        defaultValue: editingTeacher ? editingTeacher.dept : "",
        placeholder: "\u0E40\u0E0A\u0E48\u0E19 \u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C",
        className: "w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-xs font-semibold text-slate-600 mb-1" }, "\u0E27\u0E34\u0E0A\u0E32\u0E2B\u0E25\u0E31\u0E01\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A:"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "text",
        defaultValue: editingTeacher ? editingTeacher.mainSub : "",
        placeholder: "\u0E40\u0E0A\u0E48\u0E19 \u0E04\u0E13\u0E34\u0E15\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21 \u0E21.4",
        className: "w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
      }
    ))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-end space-x-2 pt-4 border-t border-slate-100" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setShowTeacherModal(false),
        className: "px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
      },
      "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          setShowTeacherModal(false);
          showToast("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E23\u0E39\u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07 (Audit Log) \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "success");
        },
        className: "bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow transition"
      },
      "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
    ))))), activeTab === "ocr" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200" }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "\u0E19\u0E33\u0E40\u0E02\u0E49\u0E32\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E08\u0E32\u0E01\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E (Image OCR & Vision AI)"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "\u0E2D\u0E31\u0E1B\u0E42\u0E2B\u0E25\u0E14\u0E20\u0E32\u0E1E\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19 (JPG, JPEG, PNG) \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E41\u0E1B\u0E25\u0E07\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21 \u0E15\u0E23\u0E27\u0E08\u0E08\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E02\u0E31\u0E14\u0E41\u0E22\u0E49\u0E07 \u0E41\u0E25\u0E30\u0E43\u0E2B\u0E49\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E48\u0E2D\u0E19\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E16\u0E32\u0E27\u0E23")), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between border-b border-slate-200 pb-4" }, [
      { step: 1, label: "\u0E2D\u0E31\u0E1B\u0E42\u0E2B\u0E25\u0E14\u0E20\u0E32\u0E1E" },
      { step: 2, label: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17" },
      { step: 3, label: "Vision AI \u0E2A\u0E41\u0E01\u0E19" },
      { step: 4, label: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E41\u0E25\u0E30\u0E41\u0E01\u0E49\u0E44\u0E02" },
      { step: 5, label: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01" }
    ].map((s) => /* @__PURE__ */ import_react.default.createElement("div", { key: s.step, className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${ocrStep >= s.step ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"}` }, s.step), /* @__PURE__ */ import_react.default.createElement("span", { className: `text-xs font-semibold ${ocrStep >= s.step ? "text-indigo-900" : "text-slate-400"}` }, s.label)))), ocrStep <= 2 && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100/50 transition" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-indigo-50 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "upload", className: "w-6 h-6" })), /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-slate-800 text-sm" }, "\u0E25\u0E32\u0E01\u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48 (JPG, JPEG, PNG)"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E17\u0E31\u0E49\u0E07\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E41\u0E25\u0E30\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E23\u0E32\u0E22\u0E2B\u0E49\u0E2D\u0E07"), /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        type: "file",
        accept: "image/*",
        onChange: () => OcrSetStep(2),
        className: "mt-4 text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
      }
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 gap-4" }, /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        onClick: () => setOcrImageType("teacher"),
        className: `cursor-pointer p-4 rounded-xl border transition ${ocrImageType === "teacher" ? "bg-indigo-50 border-indigo-300 text-indigo-900 shadow-sm" : "border-slate-200 bg-slate-50"}`
      },
      /* @__PURE__ */ import_react.default.createElement("h4", { className: "font-bold text-xs" }, "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E23\u0E32\u0E22\u0E04\u0E23\u0E39 (Teacher Timetable)"),
      /* @__PURE__ */ import_react.default.createElement("p", { className: "text-[11px] text-slate-500 mt-0.5" }, "\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E42\u0E22\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E31\u0E1A\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E04\u0E23\u0E39\u0E43\u0E19\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19")
    ), /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        onClick: () => setOcrImageType("room"),
        className: `cursor-pointer p-4 rounded-xl border transition ${ocrImageType === "room" ? "bg-indigo-50 border-indigo-300 text-indigo-900 shadow-sm" : "border-slate-200 bg-slate-50"}`
      },
      /* @__PURE__ */ import_react.default.createElement("h4", { className: "font-bold text-xs" }, "\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2A\u0E2D\u0E19\u0E23\u0E32\u0E22\u0E2B\u0E49\u0E2D\u0E07 (Room Timetable)"),
      /* @__PURE__ */ import_react.default.createElement("p", { className: "text-[11px] text-slate-500 mt-0.5" }, "\u0E08\u0E31\u0E14\u0E23\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E1A\u0E15\u0E32\u0E21\u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E1B\u0E23\u0E30\u0E08\u0E33")
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-end" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => {
          OcrSetStep(3);
          setOcrScanning(true);
          setTimeout(() => {
            setOcrScanning(false);
            OcrSetStep(4);
          }, 1500);
        },
        className: "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow transition flex items-center space-x-2"
      },
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E23\u0E30\u0E1A\u0E27\u0E19\u0E01\u0E32\u0E23 OCR & Vision AI"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold" }, "\u2192")
    ))), ocrStep === 3 && ocrScanning && /* @__PURE__ */ import_react.default.createElement("div", { className: "py-16 text-center space-y-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto animate-spin" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "refresh", className: "w-8 h-8" })), /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-slate-800 text-base" }, "Vision AI \u0E01\u0E33\u0E25\u0E31\u0E07\u0E2D\u0E48\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E25\u0E30\u0E41\u0E22\u0E01\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E15\u0E32\u0E23\u0E32\u0E07..."), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500" }, "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E31\u0E19 \u0E04\u0E32\u0E1A \u0E40\u0E27\u0E25\u0E32 \u0E0A\u0E37\u0E48\u0E2D\u0E04\u0E23\u0E39 \u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19 \u0E41\u0E25\u0E30\u0E27\u0E34\u0E0A\u0E32\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")), ocrStep >= 4 && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-center space-x-3" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "alert", className: "w-5 h-5 text-amber-600 flex-shrink-0" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-xs text-amber-800" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold" }, "\u0E04\u0E33\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A:"), " \u0E23\u0E30\u0E1A\u0E1A\u0E17\u0E33\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2B\u0E21\u0E32\u0E22\u0E2A\u0E35\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E07\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E2D\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E0A\u0E31\u0E14 \u0E2B\u0E23\u0E37\u0E2D\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E04\u0E32\u0E1A\u0E0B\u0E49\u0E33\u0E0B\u0E49\u0E2D\u0E19 \u0E42\u0E1B\u0E23\u0E14\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E41\u0E25\u0E30\u0E41\u0E01\u0E49\u0E44\u0E02\u0E43\u0E2B\u0E49\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E16\u0E32\u0E27\u0E23")), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-x-auto border border-slate-200 rounded-xl" }, /* @__PURE__ */ import_react.default.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ import_react.default.createElement("thead", null, /* @__PURE__ */ import_react.default.createElement("tr", { className: "bg-slate-50 border-b border-slate-200 font-semibold text-slate-600" }, /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3" }, "\u0E27\u0E31\u0E19 / \u0E04\u0E32\u0E1A"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3" }, "\u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3" }, "\u0E23\u0E2B\u0E31\u0E2A / \u0E0A\u0E37\u0E48\u0E2D\u0E27\u0E34\u0E0A\u0E32"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3" }, "\u0E0A\u0E37\u0E48\u0E2D\u0E04\u0E23\u0E39\u0E1C\u0E39\u0E49\u0E2A\u0E2D\u0E19"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3" }, "\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E04\u0E27\u0E32\u0E21\u0E21\u0E31\u0E48\u0E19\u0E43\u0E08 (OCR)"))), /* @__PURE__ */ import_react.default.createElement("tbody", { className: "divide-y divide-slate-100" }, ocrData.map((row) => /* @__PURE__ */ import_react.default.createElement("tr", { key: row.id, className: row.confidence === "low" || row.flag ? "bg-amber-50/50" : "hover:bg-slate-50" }, /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3 font-medium text-slate-900" }, row.day, " (", row.period, ")"), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3 font-semibold text-slate-800" }, row.room), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3" }, /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        defaultValue: row.name,
        className: "border border-slate-300 rounded-lg px-2.5 py-1 text-xs w-full bg-white outline-none focus:ring-2 focus:ring-indigo-500"
      }
    )), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3" }, /* @__PURE__ */ import_react.default.createElement(
      "input",
      {
        defaultValue: row.teacher,
        className: "border border-slate-300 rounded-lg px-2.5 py-1 text-xs w-full bg-white outline-none focus:ring-2 focus:ring-indigo-500"
      }
    )), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3" }, row.flag ? /* @__PURE__ */ import_react.default.createElement("span", { className: "bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center space-x-1" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: "alert", className: "w-3 h-3 flex-shrink-0" }), /* @__PURE__ */ import_react.default.createElement("span", null, row.flag)) : /* @__PURE__ */ import_react.default.createElement("span", { className: "bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg text-[10px] font-semibold" }, "\u0E04\u0E27\u0E32\u0E21\u0E21\u0E31\u0E48\u0E19\u0E43\u0E08\u0E2A\u0E39\u0E07 (98%)"))))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between pt-2" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => OcrSetStep(1),
        className: "border border-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition"
      },
      "\u0E2D\u0E31\u0E1B\u0E42\u0E2B\u0E25\u0E14\u0E20\u0E32\u0E1E\u0E43\u0E2B\u0E21\u0E48"
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => showToast("\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E32\u0E01\u0E20\u0E32\u0E1E\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E25\u0E31\u0E01 (Master Database) \u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "success"),
        className: "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow transition flex items-center space-x-2"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "check", className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E41\u0E25\u0E30\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E40\u0E02\u0E49\u0E32\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E25\u0E31\u0E01")
    ))))), activeTab === "history" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E41\u0E25\u0E30\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A (History & Audit Trail)"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u0E1C\u0E39\u0E49\u0E41\u0E01\u0E49\u0E44\u0E02 \u0E1C\u0E39\u0E49\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 \u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E17\u0E31\u0E1A\u0E40\u0E27\u0E25\u0E32\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33")), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => showToast("\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34 Audit Log \u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1F\u0E25\u0E4C Excel \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "success"),
        className: "bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow transition flex items-center space-x-2"
      },
      /* @__PURE__ */ import_react.default.createElement(Icon, { name: "download", className: "w-4 h-4" }),
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34")
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ import_react.default.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ import_react.default.createElement("thead", null, /* @__PURE__ */ import_react.default.createElement("tr", { className: "bg-slate-50 border-b border-slate-200 font-semibold text-slate-600" }, /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E27\u0E31\u0E19\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E17\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E1C\u0E39\u0E49\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23 / \u0E1A\u0E17\u0E1A\u0E32\u0E17"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E17\u0E33 (Action)"), /* @__PURE__ */ import_react.default.createElement("th", { className: "p-3.5" }, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21"))), /* @__PURE__ */ import_react.default.createElement("tbody", { className: "divide-y divide-slate-100" }, auditLogs.map((log, idx) => /* @__PURE__ */ import_react.default.createElement("tr", { key: idx, className: "hover:bg-slate-50" }, /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 font-mono font-bold text-indigo-600" }, log.id), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 text-slate-600" }, log.timestamp), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 font-semibold text-slate-900" }, log.actor), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-medium" }, log.action)), /* @__PURE__ */ import_react.default.createElement("td", { className: "p-3.5 text-slate-600" }, log.details)))))))), activeTab === "settings" && /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200" }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "text-xl font-bold text-slate-900" }, "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E41\u0E25\u0E30\u0E0A\u0E38\u0E14\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1E\u0E34\u0E40\u0E28\u0E29 (Test Scenario Runner)"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E01\u0E23\u0E13\u0E35\u0E28\u0E36\u0E01\u0E29\u0E32\u0E15\u0E32\u0E21\u0E02\u0E49\u0E2D\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E2B\u0E31\u0E27\u0E02\u0E49\u0E2D I \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E2D\u0E31\u0E25\u0E01\u0E2D\u0E23\u0E34\u0E17\u0E36\u0E21\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19")), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
      { id: 1, title: "1. \u0E04\u0E23\u0E39\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E04\u0E19\u0E25\u0E32\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E27\u0E31\u0E19", desc: "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E04\u0E23\u0E39\u0E41\u0E17\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E04\u0E23\u0E39 1 \u0E17\u0E48\u0E32\u0E19\u0E17\u0E35\u0E48\u0E25\u0E32\u0E40\u0E15\u0E47\u0E21\u0E27\u0E31\u0E19", icon: "users" },
      { id: 2, title: "2. \u0E04\u0E23\u0E39\u0E2B\u0E25\u0E32\u0E22\u0E04\u0E19\u0E25\u0E32\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19", desc: "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E2A\u0E23\u0E23\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E21\u0E35\u0E04\u0E23\u0E39\u0E25\u0E32\u0E2B\u0E25\u0E32\u0E22\u0E04\u0E19\u0E43\u0E19\u0E27\u0E31\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19", icon: "alert" },
      { id: 3, title: "3. \u0E20\u0E32\u0E23\u0E30\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2A\u0E30\u0E2A\u0E21\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19 (\u0E04\u0E27\u0E32\u0E21\u0E22\u0E38\u0E15\u0E34\u0E18\u0E23\u0E23\u0E21)", desc: "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E2D\u0E31\u0E25\u0E01\u0E2D\u0E23\u0E34\u0E17\u0E36\u0E21 Soft Constraint \u0E40\u0E01\u0E25\u0E35\u0E48\u0E22\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E18\u0E23\u0E23\u0E21", icon: "check" },
      { id: 4, title: "4. \u0E04\u0E23\u0E39\u0E27\u0E48\u0E32\u0E07\u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E16\u0E19\u0E31\u0E14\u0E43\u0E19\u0E27\u0E34\u0E0A\u0E32\u0E19\u0E31\u0E49\u0E19", desc: "\u0E17\u0E14\u0E2A\u0E2D\u0E1A Hard Constraint \u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E01\u0E32\u0E23\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E04\u0E23\u0E39\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E16\u0E19\u0E31\u0E14\u0E27\u0E34\u0E0A\u0E32\u0E40\u0E09\u0E1E\u0E32\u0E30", icon: "shield" },
      { id: 5, title: "5. \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E23\u0E39\u0E27\u0E48\u0E32\u0E07\u0E43\u0E19\u0E04\u0E32\u0E1A (\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19)", desc: "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E23\u0E30\u0E1A\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E04\u0E32\u0E1A\u0E17\u0E35\u0E48\u0E02\u0E32\u0E14\u0E04\u0E23\u0E39\u0E41\u0E17\u0E19\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E04\u0E23\u0E39\u0E17\u0E35\u0E48\u0E15\u0E34\u0E14\u0E2A\u0E2D\u0E19", icon: "alert" },
      { id: 6, title: "6. OCR \u0E20\u0E32\u0E1E\u0E44\u0E21\u0E48\u0E0A\u0E31\u0E14 / \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E02\u0E31\u0E14\u0E41\u0E22\u0E49\u0E07", desc: "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E02\u0E2D\u0E07 Vision AI \u0E41\u0E25\u0E30\u0E40\u0E15\u0E37\u0E2D\u0E19\u0E2A\u0E35\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E07", icon: "upload" }
    ].map((sc) => /* @__PURE__ */ import_react.default.createElement("div", { key: sc.id, className: "bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between hover:border-indigo-300 transition" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2 text-indigo-600 font-bold text-sm" }, /* @__PURE__ */ import_react.default.createElement(Icon, { name: sc.icon, className: "w-5 h-5" }), /* @__PURE__ */ import_react.default.createElement("span", null, sc.title)), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-500" }, sc.desc)), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-4 pt-3 border-t border-slate-100 flex justify-end" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => runTestScenario(sc.id),
        className: "bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5"
      },
      /* @__PURE__ */ import_react.default.createElement("span", null, "\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E40\u0E04\u0E2A\u0E19\u0E35\u0E49\u0E17\u0E31\u0E19\u0E17\u0E35"),
      /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold" }, "\u2192")
    ))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "font-bold text-slate-900 text-base" }, "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19"), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-xs font-semibold text-slate-600 mb-1" }, "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19:"), /* @__PURE__ */ import_react.default.createElement("input", { type: "text", defaultValue: "\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E2D\u0E38\u0E14\u0E21\u0E28\u0E36\u0E01\u0E29\u0E32\u0E1E\u0E31\u0E12\u0E19\u0E27\u0E34\u0E17\u0E22\u0E4C", className: "w-full border border-slate-300 rounded-xl px-3 py-2 text-sm bg-slate-50 outline-none" })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", { className: "block text-xs font-semibold text-slate-600 mb-1" }, "\u0E1B\u0E35\u0E01\u0E32\u0E23\u0E28\u0E36\u0E01\u0E29\u0E32 / \u0E20\u0E32\u0E04\u0E40\u0E23\u0E35\u0E22\u0E19:"), /* @__PURE__ */ import_react.default.createElement("input", { type: "text", defaultValue: "2569 / \u0E20\u0E32\u0E04\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 2", className: "w-full border border-slate-300 rounded-xl px-3 py-2 text-sm bg-slate-50 outline-none" }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-end pt-2" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => showToast("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22", "success"),
        className: "bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow transition"
      },
      "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32"
    ))))), /* @__PURE__ */ import_react.default.createElement("footer", { className: "bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500" }, "SubTeach AI \u2014 School Edition 1.0 | \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E04\u0E23\u0E39\u0E2A\u0E2D\u0E19\u0E41\u0E17\u0E19\u0E2D\u0E31\u0E08\u0E09\u0E23\u0E34\u0E22\u0E30\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E44\u0E17\u0E22 | \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E14\u0E49\u0E27\u0E22\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E42\u0E1B\u0E23\u0E48\u0E07\u0E43\u0E2A\u0E43\u0E19\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E27\u0E34\u0E0A\u0E32\u0E01\u0E32\u0E23"));
  }
  return __toCommonJS(stdin_exports);
})();

            document.addEventListener('DOMContentLoaded', function() {
                const root = ReactDOM.createRoot(document.getElementById('root'));

                // Include the compiled error boundary code
                var ErrorBoundaryModule = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
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

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type)
            return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type)
            return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE)
            return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning)
              return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
          self = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            void 0,
            void 0,
            oldElement._owner,
            oldElement.props,
            oldElement._debugStack,
            oldElement._debugTask
          );
          oldElement._store && (newKey._store.validated = oldElement._store.validated);
          return newKey;
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function escape(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
        }
        function noop$1() {
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type)
            children = null;
          var invokeCallback = false;
          if (null === children)
            invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children)
            return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ctor = payload._result;
            ctor = ctor();
            ctor.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 1, payload._result = moduleObject;
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status)
                  payload._status = 2, payload._result = error;
              }
            );
            -1 === payload._status && (payload._status = 0, payload._result = ctor);
          }
          if (1 === payload._status)
            return ctor = payload._result, void 0 === ctor && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ctor
            ), "default" in ctor || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ctor
            ), ctor.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function noop() {
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else
              ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else
                    break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        Symbol.for("react.provider");
        var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        }, fnName;
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          V: null,
          actQueue: null,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0
        }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        deprecatedAPIs = {
          "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = deprecatedAPIs["react-stack-bottom-frame"].bind(deprecatedAPIs, UnknownOwner)();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event))
              return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        deprecatedAPIs = Object.freeze({
          __proto__: null,
          c: function(size) {
            return resolveDispatcher().useMemoCache(size);
          }
        });
        exports.Children = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.__COMPILER_RUNTIME = deprecatedAPIs;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$0) {
                        ReactSharedInternals.thrownErrors.push(error$0);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else
                      resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.captureOwnerStack = function() {
          var getCurrentStack = ReactSharedInternals.getCurrentStack;
          return null === getCurrentStack ? null : getCurrentStack();
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName)
            props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(
            element.type,
            key,
            void 0,
            void 0,
            owner,
            props,
            element._debugStack,
            element._debugTask
          );
          for (key = 2; key < arguments.length; key++)
            owner = arguments[key], isValidElement(owner) && owner._store && (owner._store.validated = 1);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          for (var i = 2; i < arguments.length; i++) {
            var node = arguments[i];
            isValidElement(node) && node._store && (node._store.validated = 1);
          }
          i = {};
          node = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), node = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength)
            i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          node && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return ReactElement(
            type,
            node,
            void 0,
            void 0,
            getOwner(),
            i,
            propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement;
        exports.lazy = function(ctor) {
          return {
            $$typeof: REACT_LAZY_TYPE,
            _payload: { _status: -1, _result: ctor },
            _init: lazyInitializer
          };
        };
        exports.memo = function(type, compare) {
          null == type && console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create, createDeps, update) {
          null == create && console.warn(
            "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          var dispatcher = resolveDispatcher();
          if ("function" === typeof update)
            throw Error(
              "useEffect CRUD overload is not enabled in this build of React."
            );
          return dispatcher.useEffect(create, createDeps);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps);
        };
        exports.useInsertionEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useInsertionEffect(create, deps);
        };
        exports.useLayoutEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useLayoutEffect(create, deps);
        };
        exports.useMemo = function(create, deps) {
          return resolveDispatcher().useMemo(create, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState) {
          return resolveDispatcher().useState(initialState);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.1.0";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports, module) {
      var React = require_react();
      function createErrorBoundary() {
        return class ErrorBoundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              hasError: false,
              error: null,
              errorInfo: null,
              isCopied: false,
              isMinimized: false,
              isFullWidth: true,
              copyButtonState: "default"
            };
            this.copyErrorToClipboard = this.copyErrorToClipboard.bind(this);
            this.toggleMinimize = this.toggleMinimize.bind(this);
            this.toggleFullWidth = this.toggleFullWidth.bind(this);
          }
          static getDerivedStateFromError(error) {
            return {
              hasError: true,
              error,
              errorInfo: null,
              isCopied: false,
              isMinimized: false,
              // Start expanded when error occurs
              isFullWidth: false,
              copyButtonState: "default"
            };
          }
          componentDidCatch(error, errorInfo) {
            this.setState({
              error,
              errorInfo
            });
            console.error("Error caught by ErrorBoundary:", error, errorInfo);
          }
          copyErrorToClipboard() {
            if (this.state.error) {
              const errorText = `Error: ${this.state.error.toString()}

Component Stack:
${this.state.errorInfo ? this.state.errorInfo.componentStack : "Not available"}`;
              const fallbackCopyTextToClipboard = (text) => {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                  const successful = document.execCommand("copy");
                  const msg = successful ? "Text copied to clipboard" : "Failed to copy text";
                  console.log(msg);
                  this.setState({
                    isCopied: successful,
                    copyButtonState: successful ? "copied" : "default"
                  });
                  if (successful) {
                    setTimeout(() => {
                      this.setState({
                        isCopied: false,
                        copyButtonState: "default"
                      });
                    }, 2e3);
                  }
                } catch (err) {
                  console.error("Fallback: Failed to copy text: ", err);
                } finally {
                  document.body.removeChild(textArea);
                }
              };
              if (!navigator.clipboard) {
                fallbackCopyTextToClipboard(errorText);
                return;
              }
              navigator.clipboard.writeText(errorText).then(() => {
                this.setState({
                  isCopied: true,
                  copyButtonState: "copied"
                });
                setTimeout(() => {
                  this.setState({
                    isCopied: false,
                    copyButtonState: "default"
                  });
                }, 2e3);
              }).catch((err) => {
                console.error("Failed to copy error details:", err);
                fallbackCopyTextToClipboard(errorText);
              });
            }
          }
          toggleMinimize() {
            this.setState((prevState) => ({
              isMinimized: !prevState.isMinimized,
              // If minimizing, ensure it's not full width
              isFullWidth: prevState.isMinimized ? prevState.isFullWidth : false
            }));
          }
          toggleFullWidth() {
            if (!this.state.isMinimized) {
              this.setState((prevState) => ({
                isFullWidth: !prevState.isFullWidth
              }));
            }
          }
          render() {
            if (this.state.hasError) {
              const { isMinimized, isFullWidth, isCopied, error, errorInfo } = this.state;
              const AlertTriangleIcon = (_a) => {
                var _b = _a, { className } = _b, otherProps = __objRest(_b, ["className"]);
                return /* @__PURE__ */ React.createElement(
                  "svg",
                  __spreadValues({
                    xmlns: "http://www.w3.org/2000/svg",
                    width: isMinimized ? "16" : "20",
                    height: isMinimized ? "16" : "20",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: className || "text-red-500 dark:text-red-400"
                  }, otherProps),
                  /* @__PURE__ */ React.createElement("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
                  /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
                  /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
                );
              };
              const CopyIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
                /* @__PURE__ */ React.createElement("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
              );
              const MinimizeIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
              );
              const ExpandIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("polyline", { points: "15 3 21 3 21 9" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "9 21 3 21 3 15" }),
                /* @__PURE__ */ React.createElement("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
                /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
              );
              const CompressIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("polyline", { points: "4 14 10 14 10 20" }),
                /* @__PURE__ */ React.createElement("polyline", { points: "20 10 14 10 14 4" }),
                /* @__PURE__ */ React.createElement("line", { x1: "14", y1: "10", x2: "21", y2: "3" }),
                /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
              );
              const RefreshIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("path", { d: "M23 4v6h-6" }),
                /* @__PURE__ */ React.createElement("path", { d: "M1 20v-6h6" }),
                /* @__PURE__ */ React.createElement("path", { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" })
              );
              const CheckIcon = () => /* @__PURE__ */ React.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                /* @__PURE__ */ React.createElement("path", { d: "M20 6L9 17l-5-5" })
              );
              if (isMinimized) {
                return /* @__PURE__ */ React.createElement(React.Fragment, null, this.props.children, /* @__PURE__ */ React.createElement(
                  "div",
                  {
                    className: "fixed bottom-4 right-4 z-[9999]",
                    onClick: this.toggleMinimize
                  },
                  /* @__PURE__ */ React.createElement("div", { className: "group flex items-center justify-center w-10 h-10 rounded-full bg-red-500 shadow-lg cursor-pointer hover:bg-red-600 transition-colors dark:bg-red-700 dark:hover:bg-red-600" }, /* @__PURE__ */ React.createElement(AlertTriangleIcon, { className: "text-white dark:text-gray-100" }), /* @__PURE__ */ React.createElement("div", { className: "absolute right-12 bottom-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap dark:bg-gray-900 shadow-md" }, "Error - Click to expand"))
                ));
              }
              const baseContainerClasses = "fixed bottom-0 z-[9999] transition-all duration-300 ease-in-out mb-8";
              const innerBoxBaseClasses = "relative overflow-hidden rounded-lg border border-red-300 bg-white shadow-xl dark:border-red-700 dark:bg-gray-950";
              const positionAndWidthClass = isFullWidth ? "inset-x-0 w-full" : "right-4 w-[32rem] max-w-[90vw]";
              const paddingClass = isFullWidth ? "p-4" : "";
              return /* @__PURE__ */ React.createElement(React.Fragment, null, this.props.children, /* @__PURE__ */ React.createElement("div", { className: `${baseContainerClasses} ${positionAndWidthClass} ${paddingClass}` }, /* @__PURE__ */ React.createElement(
                "div",
                {
                  className: `${innerBoxBaseClasses} ${isFullWidth ? "mx-auto" : ""}`,
                  style: isFullWidth ? { maxWidth: "100%" } : {}
                },
                /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between bg-gradient-to-r from-red-100 to-red-200 px-3 py-2 dark:from-red-950/50 dark:to-red-900/50" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(AlertTriangleIcon, { className: "text-red-500 dark:text-red-400" }), /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-semibold text-red-800 dark:text-red-300" }, "Sorry, something went wrong")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(
                  "button",
                  {
                    onClick: () => window.location.reload(),
                    className: "rounded p-1 text-gray-600 hover:bg-red-200/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-red-800/50 dark:hover:text-gray-200 transition-colors",
                    title: "Refresh page"
                  },
                  /* @__PURE__ */ React.createElement(RefreshIcon, null)
                ), /* @__PURE__ */ React.createElement(
                  "button",
                  {
                    onClick: this.toggleFullWidth,
                    className: "rounded p-1 text-gray-600 hover:bg-red-200/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-red-800/50 dark:hover:text-gray-200 transition-colors",
                    title: isFullWidth ? "Reduce width" : "Expand to full width"
                  },
                  isFullWidth ? /* @__PURE__ */ React.createElement(CompressIcon, null) : /* @__PURE__ */ React.createElement(ExpandIcon, null)
                ), /* @__PURE__ */ React.createElement(
                  "button",
                  {
                    onClick: this.toggleMinimize,
                    className: "rounded p-1 text-gray-600 hover:bg-red-200/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-red-800/50 dark:hover:text-gray-200 transition-colors",
                    title: "Minimize"
                  },
                  /* @__PURE__ */ React.createElement(MinimizeIcon, null)
                ))),
                /* @__PURE__ */ React.createElement("div", { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React.createElement("p", { className: "text-sm text-gray-700 dark:text-gray-300" }, "You can copy the error details and ask Gemini to fix the error.")), /* @__PURE__ */ React.createElement(
                  "div",
                  {
                    className: `overflow-auto rounded bg-gray-50 p-3 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 scrollbar-none ${isFullWidth ? "max-h-[40vh]" : "max-h-60"}`
                  },
                  /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("h4", { className: "text-xs uppercase font-semibold text-gray-500 dark:text-gray-400" }, "Error Message:"), /* @__PURE__ */ React.createElement("p", { className: "font-mono text-xs text-red-700 dark:text-red-400 break-words px-2 py-1.5 bg-red-50 dark:bg-red-900/30 rounded border border-red-100 dark:border-red-900/50" }, error ? error.toString() : "No error message available.")), errorInfo && /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("h4", { className: "text-xs uppercase font-semibold text-gray-500 dark:text-gray-400" }, "Component Stack:"), /* @__PURE__ */ React.createElement("pre", { className: "whitespace-pre-wrap font-mono text-xs text-gray-700 dark:text-gray-300 px-2 py-1.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700" }, errorInfo.componentStack)))
                ), /* @__PURE__ */ React.createElement("div", { className: "mt-4" }, /* @__PURE__ */ React.createElement(
                  "button",
                  {
                    onClick: this.copyErrorToClipboard,
                    className: `flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md transition-colors w-full ${this.state.copyButtonState === "copied" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700"}`
                  },
                  this.state.copyButtonState === "copied" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CheckIcon, null), "Copied to Clipboard!") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CopyIcon, null), "Copy Error Details")
                )))
              )));
            }
            return this.props.children;
          }
        };
      }
      module.exports = { createErrorBoundary };
    }
  });
  return require_stdin();
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/


                // Use the exported createErrorBoundary function
                const ErrorBoundary = ErrorBoundaryModule.createErrorBoundary();

                const AppComponent = React.createElement(
                    ErrorBoundary,
                    null,
                    React.createElement(App.default, null)
                );
                root.render(AppComponent);
            });
        </script>
    </body>
</html>
