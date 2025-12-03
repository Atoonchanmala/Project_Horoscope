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
exports.ShareResult = void 0;
var react_1 = require("react");
var react_2 = require("motion/react");
var button_1 = require("./ui/button");
var lucide_react_1 = require("lucide-react");
var lo_1 = require("@/i18n/lo");
var toast_1 = require("./ui/toast");
var socialPlatforms = [
    {
        name: "" + lo_1["default"].itemFacebook,
        icon: lucide_react_1.Facebook,
        color: 'from-[#1877F2] to-[#0C63D4]',
        hoverShadow: 'rgba(24, 119, 242, 0.5)'
    },
    {
        name: "" + lo_1["default"].itemTwitter,
        icon: lucide_react_1.Twitter,
        color: 'from-[#1DA1F2] to-[#0C85D0]',
        hoverShadow: 'rgba(29, 161, 242, 0.5)'
    },
    {
        name: "" + lo_1["default"].itemIG,
        icon: lucide_react_1.Instagram,
        color: 'from-[#E4405F] via-[#F77737] to-[#FCAF45]',
        hoverShadow: 'rgba(228, 64, 95, 0.5)'
    },
    {
        name: "" + lo_1["default"].itemTikTok,
        icon: lucide_react_1.Share2,
        color: 'from-[#FF0050] to-[#00F2EA]',
        hoverShadow: 'rgba(255, 0, 80, 0.5)'
    },
];
function ShareResult(_a) {
    var frequency = _a.frequency, horoscopeData = _a.horoscopeData, horoscopeId = _a.horoscopeId, onRestart = _a.onRestart, onBack = _a.onBack;
    var _b = react_1.useState(null), toastMessage = _b[0], setToastMessage = _b[1];
    var parseHoroscope = function (text) {
        var get = function (label) {
            var regex = new RegExp(label + ":[\\s\\S]*?(?=\\n\\n|$)", "g");
            var match = text.match(regex);
            return match ? match[0].replace(label + ":", "").trim() : "";
        };
        return {
            overall: get("✨ ດວງລວມ"),
            workStudy: get("📚 ການງານ/ການສຶກສາ"),
            health: get("💪 ສຸຂະພາບ"),
            money: get("💰 ການເງິນ"),
            love: get("❤️ ຄວາມຮັກ"),
            blessing: get("🍀 ສິ່ງມຸງຄຸນ"),
            advice: get("💡 ຄຳແນະນຳ")
        };
    };
    var sections = parseHoroscope(horoscopeData);
    var handleShare = function (platform) {
        var shareUrl = window.location.origin + "/share/" + horoscopeId;
        if (platform === "Facebook") {
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl), "_blank");
        }
        else if (platform === "Twitter") {
            window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(shareUrl), "_blank");
        }
        else if (platform === "Instagram" || platform === "TikTok") {
            navigator.clipboard.writeText(shareUrl);
            // alert("Link copied to clipboard!");
            setToastMessage('copy link url success');
            setTimeout(function () { return setToastMessage(null); }, 3000);
        }
    };
    return (React.createElement("div", { className: "max-w-4xl mx-auto space-y-8" },
        React.createElement(react_2.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
            React.createElement("div", { className: "bg-gradient-to-br from-[#1B1B2F] via-[#1B1B2F] to-[#7F5AF0]/20 border border-[#7F5AF0]/30 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(127,90,240,0.4)] relative rounded-xl p-8" },
                React.createElement("div", { className: "absolute inset-0 pointer-events-none" }, __spreadArrays(Array(20)).map(function (_, i) { return (React.createElement(react_2.motion.div, { key: i, className: "absolute w-1 h-1 bg-[#F7EDEA] rounded-full", style: { left: Math.random() * 100 + "%", top: Math.random() * 100 + "%" }, animate: { opacity: [0.3, 1, 0.3] }, transition: { duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() } })); })),
                React.createElement("div", { className: "relative z-10 text-center" },
                    React.createElement(react_2.motion.div, { animate: { rotate: 360 }, transition: { duration: 30, repeat: Infinity, ease: 'linear' }, className: "inline-block text-5xl mb-4" }, "\u2728"),
                    React.createElement("h2", { className: "text-[#F7EDEA] text-2xl font-semibold mb-2" },
                        "\u0E84\u0EB3\u0E97\u0EB3\u0E99\u0EB2\u0E8D\u0EC1\u0E9A\u0E9A ",
                        frequency,
                        " \u0E82\u0EAD\u0E87\u0EC0\u0E88\u0EBB\u0EC9\u0EB2"),
                    React.createElement("p", { className: "text-[#FFCB6B]" }, "Galactic Star Astrology"),
                    React.createElement("div", { className: "grid md:grid-cols-2 gap-4 mb-6 font-lao" },
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line" },
                            React.createElement("h3", { className: "text-[#FFCB6B] font-semibold mb-2" },
                                "\u2728 ",
                                lo_1["default"].AllHoroscope),
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm leading-relaxed" }, sections.overall)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line" },
                            React.createElement("h3", { className: "text-[#FFCB6B] font-semibold mb-2" },
                                "\uD83D\uDCDA ",
                                lo_1["default"].WorkOrStudent),
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm leading-relaxed" }, sections.workStudy)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line" },
                            React.createElement("h3", { className: "text-[#FFCB6B] font-semibold mb-2" },
                                "\uD83D\uDCAA ",
                                lo_1["default"].health),
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm leading-relaxed" }, sections.health)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line" },
                            React.createElement("h3", { className: "text-[#FFCB6B] font-semibold mb-2" },
                                "\uD83D\uDCB0 ",
                                lo_1["default"].finance),
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm leading-relaxed" }, sections.money)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line" },
                            React.createElement("h3", { className: "text-[#FFCB6B] font-semibold mb-2" },
                                "\uD83C\uDF40 ",
                                lo_1["default"].LuckyColor),
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm leading-relaxed" }, sections.blessing)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line" },
                            React.createElement("h3", { className: "text-[#FFCB6B] font-semibold mb-2" },
                                "\u2764\uFE0F ",
                                lo_1["default"].lovely),
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm leading-relaxed" }, sections.love)),
                        React.createElement("div", { className: "bg-[#0D0D12]/60 rounded-lg p-4 border border-[#7F5AF0]/20 whitespace-pre-line md:col-span-2" },
                            React.createElement("h3", { className: "text-[#FFCB6B] font-semibold mb-2" },
                                "\uD83D\uDCA1 ",
                                lo_1["default"].advice),
                            React.createElement("p", { className: "text-[#E0E0E0] text-sm leading-relaxed" }, sections.advice))),
                    React.createElement("div", { className: "text-center pt-4 border-t border-[#7F5AF0]/20" },
                        React.createElement("p", { className: "text-[#BF93F9] text-sm italic" }, "The cosmos reveals its secrets to those who listen \uD83C\uDF19"))))),
        React.createElement(react_2.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "text-center" },
            React.createElement("h3", { className: "text-[#F7EDEA] text-xl font-semibold mb-2" }, lo_1["default"].shareMessage),
            React.createElement("p", { className: "text-[#E0E0E0]" }, lo_1["default"].inspireMessage)),
        React.createElement(react_2.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, socialPlatforms.map(function (platform, index) {
            var Icon = platform.icon;
            return (React.createElement(react_2.motion.div, { key: platform.name, initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.4 + index * 0.1 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
                React.createElement(button_1.Button, { onClick: function () { return handleShare(platform.name); }, className: "w-full h-24 bg-gradient-to-br " + platform.color + " hover:shadow-[0_0_25px_" + platform.hoverShadow + "] text-white transition-all duration-300 flex flex-col items-center justify-center gap-2" },
                    React.createElement(Icon, { className: "w-8 h-8" }),
                    React.createElement("span", { className: "text-sm" }, platform.name))));
        })),
        React.createElement(react_2.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8 }, className: "flex flex-col sm:flex-row gap-4 justify-center" },
            React.createElement(react_2.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
                React.createElement(button_1.Button, { onClick: onBack, variant: "outline", className: "px-8 py-6 bg-[#1B1B2F]/60 border-[#7F5AF0]/50 text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300" },
                    React.createElement(lucide_react_1.ArrowLeft, { className: "mr-2" }),
                    " Back")),
            React.createElement(react_2.motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
                React.createElement(button_1.Button, { onClick: onRestart, variant: "outline", className: "px-8 py-6 bg-[#1B1B2F]/60 border-[#7F5AF0] text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300" },
                    React.createElement(lucide_react_1.RefreshCw, { className: "mr-2" }),
                    " Get Another Reading"))),
        React.createElement(react_2.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1 }, className: "text-center pt-8 border-t border-[#7F5AF0]/20" },
            React.createElement("p", { className: "text-[#E0E0E0] text-sm" }, "Thank you for trusting the cosmos with your journey \uD83C\uDF1F"),
            React.createElement("p", { className: "text-[#7F5AF0] text-xs mt-2" }, "May the stars forever be in your favor")),
        toastMessage && (React.createElement("div", null,
            React.createElement(toast_1["default"], { message: toastMessage, type: 'success' })))));
}
exports.ShareResult = ShareResult;
