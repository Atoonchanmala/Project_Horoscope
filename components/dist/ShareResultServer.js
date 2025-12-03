'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ShareResultServer = void 0;
var react_1 = require("motion/react");
var button_1 = require("./ui/button");
var lucide_react_1 = require("lucide-react");
var horoscope_actions_1 = require("@/actions/horoscope-actions");
var navigation_1 = require("next/navigation");
var react_2 = require("react");
var socialPlatforms = [
    {
        name: 'Facebook',
        icon: lucide_react_1.Facebook,
        color: 'from-[#1877F2] to-[#0C63D4]',
        hoverShadow: 'rgba(24, 119, 242, 0.5)'
    },
    {
        name: 'Instagram',
        icon: lucide_react_1.Instagram,
        color: 'from-[#E4405F] via-[#F77737] to-[#FCAF45]',
        hoverShadow: 'rgba(228, 64, 95, 0.5)'
    },
    {
        name: 'Twitter',
        icon: lucide_react_1.Twitter,
        color: 'from-[#1DA1F2] to-[#0C85D0]',
        hoverShadow: 'rgba(29, 161, 242, 0.5)'
    },
    {
        name: 'TikTok',
        icon: lucide_react_1.Share2,
        color: 'from-[#FF0050] to-[#00F2EA]',
        hoverShadow: 'rgba(255, 0, 80, 0.5)'
    },
];
// ***** ບໍ່ໄດ້ໃຊ້ *****
function ShareResultServer(_a) {
    var _this = this;
    var frequency = _a.frequency, horoscopeData = _a.horoscopeData;
    var router = navigation_1.useRouter();
    var _b = react_2.useState(false), isRestarting = _b[0], setIsRestarting = _b[1];
    var handleShare = function (platform) {
        console.log("Sharing to " + platform + "...");
    };
    var handleRestart = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsRestarting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, horoscope_actions_1.restartHoroscope()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    setIsRestarting(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleBack = function () {
        router.push('/step3');
    };
    return (React.createElement("div", { className: "max-w-4xl mx-auto space-y-8" },
        React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
            React.createElement("div", { className: "bg-gradient-to-br from-[#1B1B2F] via-[#1B1B2F] to-[#7F5AF0]/20 border border-[#7F5AF0]/30 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(127,90,240,0.4)] relative rounded-xl p-8" },
                React.createElement("div", { className: "absolute inset-0 pointer-events-none" }, __spreadArrays(Array(20)).map(function (_, i) { return (React.createElement(react_1.motion.div, { key: i, className: "absolute w-1 h-1 bg-[#F7EDEA] rounded-full", style: {
                        left: (i * 7) % 100 + "%",
                        top: (i * 13) % 100 + "%"
                    }, animate: {
                        opacity: [0.3, 1, 0.3]
                    }, transition: {
                        duration: 2 + (i % 3),
                        repeat: Infinity,
                        delay: (i % 5) * 0.4
                    } })); })),
                React.createElement("div", { className: "relative z-10" },
                    React.createElement("div", { className: "text-center mb-6" },
                        React.createElement(react_1.motion.div, { animate: { rotate: 360 }, transition: { duration: 30, repeat: Infinity, ease: 'linear' }, className: "inline-block text-5xl mb-4" }, "\u2728"),
                        React.createElement("h2", { className: "text-[#F7EDEA] text-2xl font-semibold mb-2" },
                            "Your ",
                            frequency,
                            " Horoscope"),
                        React.createElement("p", { className: "text-[#FFCB6B]" }, "Galactic Star Astrology")),
                    React.createElement("div", { className: "grid md:grid-cols-2 gap-4 mb-6" },
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20" },
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm mb-1" }, horoscopeData.finance)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20" },
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm mb-1" }, horoscopeData.career)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20" },
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm mb-1" }, horoscopeData.love)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20" },
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm mb-1" }, horoscopeData.health)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20" },
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm mb-1" }, horoscopeData.luckyColor)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20" },
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm mb-1" }, horoscopeData.unluckyColor)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 md:col-span-2" },
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm mb-1" }, horoscopeData.luckyNumber))),
                    React.createElement("div", { className: "text-center pt-4 border-t border-[#7F5AF0]/20" },
                        React.createElement("p", { className: "text-[#BF93F9] text-sm italic" }, "\"The cosmos reveals its secrets to those who listen\" \uD83C\uDF19"))))),
        React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "text-center" },
            React.createElement("h3", { className: "text-[#F7EDEA] text-xl font-semibold mb-2" }, "Share Your Cosmic Wisdom"),
            React.createElement("p", { className: "text-[#E0E0E0]" }, "Inspire others with your astrological insights")),
        React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, socialPlatforms.map(function (platform, index) {
            var Icon = platform.icon;
            return (React.createElement(react_1.motion.div, { key: platform.name, initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.4 + index * 0.1 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
                React.createElement(button_1.Button, { onClick: function () { return handleShare(platform.name); }, className: "w-full h-24 bg-gradient-to-br " + platform.color + " hover:shadow-[0_0_25px_" + platform.hoverShadow + "] text-white transition-all duration-300 flex flex-col items-center justify-center gap-2" },
                    React.createElement(Icon, { className: "w-8 h-8" }),
                    React.createElement("span", { className: "text-sm" }, platform.name))));
        })),
        React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8 }, className: "flex flex-col sm:flex-row gap-4 justify-center" },
            React.createElement(react_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
                React.createElement(button_1.Button, { onClick: handleBack, variant: "outline", className: "px-8 py-6 bg-[#1B1B2F]/60 border-[#7F5AF0]/50 text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300" },
                    React.createElement(lucide_react_1.ArrowLeft, { className: "mr-2" }),
                    "Back")),
            React.createElement(react_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
                React.createElement(button_1.Button, { onClick: handleRestart, disabled: isRestarting, variant: "outline", className: "px-8 py-6 bg-[#1B1B2F]/60 border-[#7F5AF0] text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300 disabled:opacity-50" },
                    React.createElement(lucide_react_1.RefreshCw, { className: "mr-2" }),
                    isRestarting ? 'Restarting...' : 'Get Another Reading')),
            React.createElement(react_1.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
                React.createElement(button_1.Button, { onClick: function () { return console.log('Downloading share card...'); }, className: "px-8 py-6 bg-gradient-to-r from-[#FFCB6B] to-[#F7EDEA] text-[#0D0D12] hover:from-[#F7EDEA] hover:to-[#FFCB6B] shadow-[0_0_20px_rgba(255,203,107,0.4)] transition-all duration-300" },
                    React.createElement(lucide_react_1.Share2, { className: "mr-2" }),
                    "Download Share Card"))),
        React.createElement(react_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1 }, className: "text-center pt-8 border-t border-[#7F5AF0]/20" },
            React.createElement("p", { className: "text-[#E0E0E0] text-sm" }, "Thank you for trusting the cosmos with your journey \uD83C\uDF1F"),
            React.createElement("p", { className: "text-[#7F5AF0] text-xs mt-2" }, "May the stars forever be in your favor"))));
}
exports.ShareResultServer = ShareResultServer;
