"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Calendar = void 0;
var React = require("react");
var lucide_react_1 = require("lucide-react");
var react_day_picker_1 = require("react-day-picker");
var utils_1 = require("@/lib/utils");
function Calendar(_a) {
    var className = _a.className, classNames = _a.classNames, _b = _a.showOutsideDays, showOutsideDays = _b === void 0 ? true : _b, props = __rest(_a, ["className", "classNames", "showOutsideDays"]);
    var _c = React.useState(props.selected ? new Date(props.selected) : new Date()), month = _c[0], setMonth = _c[1];
    var currentYear = new Date().getFullYear();
    var years = Array.from({ length: 121 }, function (_, i) { return currentYear - i; });
    var months = [
        "ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ",
        "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ"
    ];
    return (React.createElement(react_day_picker_1.DayPicker, __assign({ month: month, onMonthChange: setMonth, showOutsideDays: showOutsideDays, className: utils_1.cn("p-3 sm:p-4 md:p-5 space-y-4 w-full max-w-full mx-auto", className), classNames: __assign({ 
            /** Month container **/
            months: "flex flex-col items-center w-full", month: "w-full space-y-3", 
            /** Header caption **/
            caption: "flex flex-col items-center gap-3 w-full", caption_label: "hidden", 
            /** Navigation (prev/next) **/
            nav: "flex items-center justify-between w-full px-1", nav_button: "p-2 rounded-lg hover:bg-accent transition active:scale-95", 
            /** Table layout **/
            table: "w-full", head_row: "grid grid-cols-7", head_cell: "text-muted-foreground text-[10px] sm:text-xs md:text-sm font-medium flex justify-center", row: "grid grid-cols-7 gap-[2px] sm:gap-1 md:gap-2", cell: "flex justify-center", 
            /** Days **/
            day: utils_1.cn("flex items-center justify-center rounded-md sm:rounded-lg md:rounded-xl", "cursor-pointer transition select-none", 
            // Responsive size
            "w-8 h-8 text-[11px]", // mobile
            "sm:w-9 sm:h-9 sm:text-xs", // sm mobile
            "md:w-10 md:h-10 md:text-sm", // tablet
            "lg:w-11 lg:h-11"), day_today: "border border-primary text-primary font-medium", day_selected: "bg-primary text-primary-foreground font-semibold", day_outside: "text-muted-foreground opacity-40", day_disabled: "opacity-30 cursor-not-allowed" }, classNames), components: {
            /** Nav Buttons Icons **/
            IconLeft: function () { return React.createElement(lucide_react_1.ChevronLeft, { className: "h-5 w-5" }); },
            IconRight: function () { return React.createElement(lucide_react_1.ChevronRight, { className: "h-5 w-5" }); },
            /** Month + Year Select **/
            Caption: function (_a) {
                var displayMonth = _a.displayMonth;
                var handleMonth = function (e) {
                    var newMonthIndex = months.indexOf(e.target.value);
                    var newDate = new Date(displayMonth);
                    newDate.setMonth(newMonthIndex);
                    setMonth(newDate);
                };
                var handleYear = function (e) {
                    var newDate = new Date(displayMonth);
                    newDate.setFullYear(Number(e.target.value));
                    setMonth(newDate);
                };
                return (React.createElement("div", { className: "flex flex-col items-center gap-2 w-full" },
                    React.createElement("div", { className: "\n                  grid grid-cols-2 gap-2 w-full\n                  sm:max-w-[320px]\n                  md:max-w-[360px]\n                  lg:flex lg:gap-4 lg:justify-center\n                " },
                        React.createElement("select", { value: months[displayMonth.getMonth()], onChange: handleMonth, className: "\n                    bg-[#1B1B2F] border border-[#7F5AF0]/40 text-white \n                    rounded-md px-2 sm:px-3 py-2\n                    text-xs sm:text-sm md:text-base w-full\n                  " }, months.map(function (m) { return (React.createElement("option", { key: m, value: m }, m)); })),
                        React.createElement("select", { value: displayMonth.getFullYear(), onChange: handleYear, className: "\n                    bg-[#1B1B2F] border border-[#7F5AF0]/40 text-white \n                    rounded-md px-2 sm:px-3 py-2\n                    text-xs sm:text-sm md:text-base w-full\n                  " }, years.map(function (y) { return (React.createElement("option", { key: y, value: y }, y)); })))));
            }
        } }, props)));
}
exports.Calendar = Calendar;
