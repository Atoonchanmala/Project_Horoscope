'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AppLayout = void 0;
var react_1 = require("motion/react");
var logo_1 = require("./ui/logo");
var lo_1 = require("@/i18n/lo");
function AppLayout(_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "min-h-screen bg-[#0D0D12] relative overflow-hidden" },
        React.createElement("div", { className: "fixed inset-0 pointer-events-none" },
            React.createElement("div", { className: "absolute inset-0 bg-gradient-radial from-[#7F5AF0]/20 via-[#1B1B2F]/40 to-[#0D0D12]" }),
            __spreadArrays(Array(50)).map(function (_, i) { return (React.createElement(react_1.motion.div, { key: i, className: "absolute w-1 h-1 bg-white rounded-full", style: {
                    left: (i * 7) % 100 + "%",
                    top: (i * 13) % 100 + "%"
                }, animate: {
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.5, 1]
                }, transition: {
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    delay: (i % 5) * 0.4
                } })); }),
            React.createElement(react_1.motion.div, { className: "absolute w-96 h-96 rounded-full bg-[#7F5AF0]/30 blur-[100px]", style: { top: '10%', left: '20%' }, animate: {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }, transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut'
                } }),
            React.createElement(react_1.motion.div, { className: "absolute w-96 h-96 rounded-full bg-[#BF93F9]/20 blur-[100px]", style: { bottom: '20%', right: '10%' }, animate: {
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }, transition: {
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut'
                } })),
        React.createElement("div", { className: "relative z-10 container mx-auto px-4 py-4 max-w-4xl" },
            React.createElement(react_1.motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "text-center mb-12" },
                React.createElement(logo_1["default"], { className: "!max-w-none" }),
                React.createElement(react_1.motion.div, { className: "inline-block mb-4", animate: {
                        rotate: 360
                    }, transition: {
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    } }),
                React.createElement(react_1.motion.div, { className: '-mt-24' },
                    React.createElement(react_1.motion.div, { className: "text-3xl ml-[480px] mb-5", animate: {
                            rotate: 360
                        }, transition: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        } }, "\u2728"),
                    React.createElement("h1", { className: "text-[#F7EDEA] text-xl font-bold mb-2" }, lo_1["default"].HeaderTitle),
                    React.createElement("p", { className: "text-[#E0E0E0] text-sm" }, "Unlock the wisdom of the cosmos"))),
            children)));
}
exports.AppLayout = AppLayout;
