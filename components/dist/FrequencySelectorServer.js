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
exports.__esModule = true;
exports.FrequencySelectorServer = void 0;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_2 = require("motion/react");
var button_1 = require("./ui/button");
var lucide_react_1 = require("lucide-react");
var bs_1 = require("react-icons/bs");
var carousel_1 = require("./ui/carousel");
var embla_carousel_autoplay_1 = require("embla-carousel-autoplay");
var lo_1 = require("@/i18n/lo");
// =================== mock card data ====================
var frequencies = [
    {
        id: 'daily',
        title: "" + lo_1["default"].openDay,
        description: "" + lo_1["default"].descriptionDay,
        icon: lucide_react_1.Sun,
        color: 'from-[#FFCB6B] to-[#F7EDEA]',
        glow: 'rgba(255, 203, 107, 0.4)'
    },
    {
        id: 'weekly',
        title: "" + lo_1["default"].openWeekly,
        description: "" + lo_1["default"].descriptionWeekly,
        icon: lucide_react_1.Calendar,
        color: 'from-[#7F5AF0] to-[#BF93F9]',
        glow: 'rgba(127, 90, 240, 0.4)'
    },
    {
        id: 'monthly',
        title: "" + lo_1["default"].openMonthly,
        description: "" + lo_1["default"].descriptionMonth,
        icon: lucide_react_1.CalendarRange,
        color: 'from-[#BF93F9] to-[#7F5AF0]',
        glow: 'rgba(191, 147, 249, 0.4)'
    },
];
function FrequencySelectorServer() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), selectedFrequency = _a[0], setSelectedFrequency = _a[1];
    var _b = react_1.useState(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var handleSelect = function () { return __awaiter(_this, void 0, void 0, function () {
        var storedUser, userData, payload, res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedFrequency)
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    localStorage.setItem("plan", selectedFrequency);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    storedUser = localStorage.getItem("userData");
                    if (!storedUser) {
                        router.push("/step1");
                        return [2 /*return*/];
                    }
                    userData = JSON.parse(storedUser);
                    payload = {
                        phone: userData.phone,
                        birthdate: userData.birthdate,
                        gender: userData.gender,
                        plan: selectedFrequency
                    };
                    return [4 /*yield*/, fetch('/api/horoscope', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    console.log("response data: ", data);
                    if (!res.ok)
                        throw new Error("API request failed");
                    localStorage.setItem("horoscopeData", JSON.stringify(data));
                    router.push('/step3');
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error('Error generating horoscope:', err_1);
                    setIsSubmitting(false);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // =========== function auto plugin =============== 
    var autoplayPlugin = react_1.useRef(embla_carousel_autoplay_1["default"]({
        delay: 3000,
        stopOnInteraction: true,
        stopOnMouseEnter: true
    }));
    return (React.createElement("div", { className: "space-y-8" },
        React.createElement(react_2.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-center" },
            React.createElement("div", { className: "flex items-center justify-center gap-2 mb-2" },
                React.createElement(lucide_react_1.Sparkles, { className: "w-6 h-6 text-[#FFCB6B]" }),
                React.createElement("h2", { className: "text-[#F7EDEA] text-sm font-normal" }, lo_1["default"].choose)),
            React.createElement("h3", { className: "text-[#F7EDEA] text-sm font-normal" }, lo_1["default"].SelectHoroscope)),
        React.createElement(react_2.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "bg-[#1B1B2F]/40 border border-[#7F5AF0]/30 backdrop-blur-sm rounded-lg p-6" },
            React.createElement("div", { className: "text-center mb-6" },
                React.createElement("h3", { className: "text-[#F7EDEA] flex items-center justify-center gap-2 mb-1" },
                    React.createElement(lucide_react_1.Sparkles, { className: "w-5 h-5 text-[#FFCB6B]" }),
                    React.createElement("span", null, lo_1["default"].horoScopeCategory)),
                React.createElement("p", { className: "text-[#E0E0E0]/70 text-sm" }, "Personalized insights delivered to you")),
            React.createElement(carousel_1.Carousel, { plugins: [autoplayPlugin.current], opts: {
                    align: "start",
                    loop: true,
                    duration: 50,
                    skipSnaps: false,
                    dragFree: false,
                    slidesToScroll: 1
                }, className: "w-full max-w-5xl mx-auto", onMouseEnter: function () { return autoplayPlugin.current.stop(); }, onMouseLeave: function () { return autoplayPlugin.current.play(); } },
                React.createElement(carousel_1.CarouselContent, { className: "-ml-2 md:-ml-4", style: {
                        transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        willChange: 'transform'
                    } },
                    React.createElement(carousel_1.CarouselItem, { className: "pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5" },
                        React.createElement(react_2.motion.div, { whileHover: { scale: 1.05 }, className: "p-4 text-center transition-all duration-300 h-full" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "\uD83D\uDCB0"),
                            React.createElement("div", { className: "text-[#F7EDEA] text-sm" }, lo_1["default"].finance))),
                    React.createElement(carousel_1.CarouselItem, { className: "pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5" },
                        React.createElement(react_2.motion.div, { whileHover: { scale: 1.05 }, className: "p-4 text-center transition-all duration-300 h-full" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "\uD83D\uDCBC"),
                            React.createElement("div", { className: "text-[#F7EDEA] text-sm" }, lo_1["default"].carer))),
                    React.createElement(carousel_1.CarouselItem, { className: "pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5" },
                        React.createElement(react_2.motion.div, { whileHover: { scale: 1.05 }, className: "p-4 text-center transition-all duration-300 h-full" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "\u2764\uFE0F"),
                            React.createElement("div", { className: "text-[#F7EDEA] text-sm" }, lo_1["default"].lovely))),
                    React.createElement(carousel_1.CarouselItem, { className: "pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5" },
                        React.createElement(react_2.motion.div, { whileHover: { scale: 1.05 }, className: "p-4 text-center transition-all duration-300 h-full" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "\uD83E\uDDD8"),
                            React.createElement("div", { className: "text-[#F7EDEA] text-sm" }, lo_1["default"].health))),
                    React.createElement(carousel_1.CarouselItem, { className: "pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5" },
                        React.createElement(react_2.motion.div, { whileHover: { scale: 1.05 }, className: "p-4 text-center transition-all duration-300 h-full" },
                            React.createElement("div", { className: "text-3xl mb-2" }, "\uD83C\uDF08"),
                            React.createElement("div", { className: "text-[#F7EDEA] text-sm" }, lo_1["default"].LuckyColor)))))),
        React.createElement("div", { className: "grid md:grid-cols-3 gap-6 mt-5" }, frequencies.map(function (frequency) {
            var Icon = frequency.icon;
            var isSelected = selectedFrequency === frequency.id;
            return (React.createElement(react_2.motion.div, { key: frequency.id, onClick: function () { return setSelectedFrequency(frequency.id); }, whileHover: {
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 10px 25px " + frequency.glow
                }, transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 12
                }, className: "relative cursor-pointer p-6 border-2 rounded-xl\n                " + (isSelected ? 'border-[#7F5AF0]' : 'border-[#7F5AF0]/30') + "\n              " },
                isSelected && (React.createElement("div", { className: "absolute bottom-42 left-60" },
                    React.createElement(bs_1.BsCheckCircleFill, { className: "w-8 h-8 text-[#7F5AF0] " }))),
                React.createElement("div", { className: "flex justify-center mb-4" },
                    React.createElement("div", { className: "w-16 h-16 rounded-full bg-gradient-to-br " + frequency.color + " flex items-center justify-center" },
                        React.createElement(Icon, { className: "w-8 h-8 text-black" }))),
                React.createElement("h3", { className: "text-center text-white text-lg" }, frequency.title),
                React.createElement("p", { className: "text-center text-gray-300 text-sm" }, frequency.description)));
        })),
        React.createElement("div", { className: "flex gap-4 justify-center" },
            React.createElement(button_1.Button, { onClick: function () { return router.push('/step1'); }, variant: "outline" },
                React.createElement(lucide_react_1.ArrowLeft, { className: "mr-2" }),
                lo_1["default"].back),
            React.createElement(button_1.Button, { onClick: handleSelect, disabled: !selectedFrequency || isSubmitting, className: " bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] hover:from-[#BF93F9] hover:to-[#7F5AF0] text-[#F7EDEA] shadow-[0_0_20px_rgba(127,90,240,0.5)] transition-all duration-300" }, isSubmitting ? "ກຳລັງທຳນາຍດວງສະຕາ..." : "" + lo_1["default"].buttonHoroScope))));
}
exports.FrequencySelectorServer = FrequencySelectorServer;
