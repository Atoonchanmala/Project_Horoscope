'use client';
"use strict";
exports.__esModule = true;
exports.WhatsAppConfirmation = void 0;
var react_1 = require("motion/react");
var card_1 = require("./ui/card");
var button_1 = require("./ui/button");
var lucide_react_1 = require("lucide-react");
var lo_1 = require("@/i18n/lo");
function WhatsAppConfirmation(_a) {
    var frequency = _a.frequency, phoneNumber = _a.phoneNumber, horoscopeData = _a.horoscopeData, onContinue = _a.onContinue, onBack = _a.onBack;
    return (React.createElement(react_1.motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "max-w-2xl mx-auto" },
        React.createElement(card_1.Card, { className: "bg-[#1B1B2F]/60 border-[#7F5AF0]/30 backdrop-blur-sm p-8 shadow-[0_0_40px_rgba(127,90,240,0.3)]" },
            React.createElement(react_1.motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.2, type: 'spring', stiffness: 200 }, className: "flex justify-center mb-6" },
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { className: "w-20 h-20 bg-gradient-to-br from-[#7F5AF0] to-[#BF93F9] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(127,90,240,0.6)]" },
                        React.createElement(lucide_react_1.CheckCircle, { className: "w-10 h-10 text-[#F7EDEA]" })),
                    React.createElement(react_1.motion.div, { className: "absolute inset-0 rounded-full border-2 border-[#7F5AF0]", animate: {
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 0, 0.8]
                        }, transition: {
                            duration: 2,
                            repeat: Infinity
                        } }))),
            React.createElement("div", { className: "text-center mb-8" },
                React.createElement("h2", { className: "text-[#F7EDEA] text-xl font-semibold mb-3" },
                    "\u2728 \u0E84\u0EB3\u0E97\u0EB3\u0E99\u0EB2\u0E8D\u0E94\u0EA7\u0E87\u0EC1\u0E9A\u0E9A ",
                    frequency,
                    " \u0E82\u0EAD\u0E87\u0EC0\u0E88\u0EBB\u0EC9\u0EB2\u0E9E\u0EC9\u0EAD\u0EA1\u0EC3\u0EAB\u0EC9\u0EAD\u0EC8\u0EB2\u0E99\u0EC1\u0EA5\u0EC9\u0EA7!"),
                React.createElement("p", { className: "text-[#E0E0E0] text-md" },
                    "Your personalized cosmic reading has been prepared and will be sent to",
                    ' ',
                    React.createElement("span", { className: "text-[#FFCB6B]" }, phoneNumber),
                    " via WhatsApp")),
            React.createElement("div", { className: "bg-[#0D0D12]/80 border border-[#7F5AF0]/40 rounded-lg p-6 mb-6" },
                React.createElement("div", { className: "flex items-center gap-3 mb-4 pb-4 border-b border-[#7F5AF0]/20" },
                    React.createElement("div", { className: "w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center" },
                        React.createElement(lucide_react_1.MessageCircle, { className: "w-5 h-5 text-white" })),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-[#F7EDEA] text-sm" }, lo_1["default"].horoscope),
                        React.createElement("p", { className: "text-[#E0E0E0] text-sm" }, lo_1["default"].horoscopeTitle))),
                React.createElement("div", { className: "space-y-3 text-sm text-[#E0E0E0] leading-relaxed" },
                    React.createElement("div", { className: "bg-[#1F1F2E] p-4 rounded-xl shadow-md border border-[#7F5AF0]/20 whitespace-pre-line" }, horoscopeData)),
                React.createElement("div", { className: "mt-6 pt-4 border-t border-[#7F5AF0]/20 text-center" },
                    React.createElement("p", { className: "text-[#BF93F9] text-sm italic" },
                        "\"",
                        lo_1["default"].slogan,
                        "\" \u2728"))),
            React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "bg-[#7F5AF0]/10 border border-[#7F5AF0]/30 rounded-lg p-4 mb-6" },
                React.createElement("div", { className: "flex gap-3" },
                    React.createElement(lucide_react_1.Sparkles, { className: "w-5 h-5 text-[#FFCB6B] flex-shrink-0 mt-0.5" }),
                    React.createElement("div", { className: "flex text-[#E0E0E0]", style: { fontSize: "13px" } },
                        React.createElement("strong", { className: "text-[#F7EDEA]" },
                            lo_1["default"].note,
                            ":"),
                        React.createElement("p", { className: 'px-1' }, lo_1["default"].noteScript)))),
            React.createElement("div", { className: "flex flex-col sm:flex-row gap-4" },
                React.createElement(react_1.motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "flex-1" },
                    React.createElement(button_1.Button, { onClick: onBack, variant: "outline", className: "w-full bg-[#1B1B2F]/60 border-[#7F5AF0]/50 text-[#F7EDEA] hover:bg-[#7F5AF0]/20 hover:border-[#BF93F9] transition-all duration-300" },
                        React.createElement(lucide_react_1.ArrowLeft, { className: "mr-2" }),
                        lo_1["default"].back)),
                React.createElement(react_1.motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "flex-1" },
                    React.createElement(button_1.Button, { onClick: onContinue, className: "w-full bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] hover:from-[#BF93F9] hover:to-[#7F5AF0] text-[#F7EDEA] shadow-[0_0_20px_rgba(127,90,240,0.5)] transition-all duration-300" }, lo_1["default"].shareHoroscope))))));
}
exports.WhatsAppConfirmation = WhatsAppConfirmation;
