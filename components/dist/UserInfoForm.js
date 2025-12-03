'use client';
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
exports.__esModule = true;
exports.UserInfoForm = void 0;
var react_1 = require("react");
var react_2 = require("motion/react");
var button_1 = require("./ui/button");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var select_1 = require("./ui/select");
var calendar_1 = require("./ui/calendar");
var popover_1 = require("./ui/popover");
var card_1 = require("./ui/card");
var lucide_react_1 = require("lucide-react");
var lo_1 = require("@/i18n/lo");
function UserInfoForm(_a) {
    var initialData = _a.initialData;
    var _b = react_1.useState(initialData), formData = _b[0], setFormData = _b[1];
    var _c = react_1.useState({}), errors = _c[0], setErrors = _c[1];
    var _d = react_1.useTransition(), isPending = _d[0], startTransition = _d[1];
    console.log("forData: ", formData);
    var validateForm = function () {
        var newErrors = {};
        if (!formData.phone)
            newErrors.phone = 'Phone number is required';
        else if (!/^\+?[\d\s-()]+$/.test(formData.phone))
            newErrors.phone = 'Please enter a valid phone number';
        if (!formData.birthdate)
            newErrors.birthdate = 'Date of birth is required';
        if (!formData.gender)
            newErrors.gender = 'Please select your gender';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!validateForm())
            return;
        // Save to localStorage
        localStorage.setItem("userData", JSON.stringify(formData));
        // Redirect step2  client
        startTransition(function () {
            window.location.href = "/step2";
        });
    };
    var formatDate = function (date) {
        if (!date)
            return '';
        var d = new Date(date);
        return d.toLocaleDateString('lo-LA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    return (React.createElement(card_1.Card, { className: "bg-[#1B1B2F]/60 border-[#7F5AF0]/30 backdrop-blur-sm p-8 shadow-[0_0_40px_rgba(127,90,240,0.3)]" },
        React.createElement(react_2.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
            React.createElement("div", { className: "flex items-center gap-2 mb-6" },
                React.createElement(lucide_react_1.Sparkles, { className: "w-6 h-6 text-[#FFCB6B]" }),
                React.createElement("h2", { className: "text-[#F7EDEA] text-2xl font-semibold" }, lo_1["default"].InfoHoroscope)),
            React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement(label_1.Label, { htmlFor: "phone", className: "text-[#F7EDEA]" },
                        lo_1["default"].phone,
                        React.createElement("span", { className: "text-[#7F5AF0]" }, "*")),
                    React.createElement(input_1.Input, { id: "phone", type: "tel", placeholder: "85620 223 556 10", value: formData.phone, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { phone: e.target.value })); }, className: "bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] focus:border-[#BF93F9] focus:ring-[#BF93F9]/50 transition-all duration-300" }),
                    errors.phone && React.createElement("p", { className: "text-red-400 text-sm" }, errors.phone)),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement(label_1.Label, { className: "text-[#F7EDEA]" },
                        lo_1["default"].birthDate,
                        React.createElement("span", { className: "text-[#7F5AF0]" }, "*")),
                    React.createElement(popover_1.Popover, null,
                        React.createElement(popover_1.PopoverTrigger, { asChild: true },
                            React.createElement(button_1.Button, { variant: "outline", className: "w-full justify-start text-left bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] hover:bg-[#1B1B2F] hover:border-[#BF93F9] transition-all duration-300" },
                                React.createElement(lucide_react_1.CalendarIcon, { className: "mr-2 h-4 w-4 text-[#7F5AF0]" }),
                                formData.birthdate ? formatDate(formData.birthdate) : 'ເລືອກວັນເດືອນປີເກີດຂອງເຈົ້າ')),
                        React.createElement(popover_1.PopoverContent, { className: "w-auto p-0 bg-[#1B1B2F] border-[#7F5AF0]/50" },
                            React.createElement(calendar_1.Calendar, { mode: "single", selected: formData.birthdate ? new Date(formData.birthdate) : undefined, onSelect: function (date) {
                                    return setFormData(__assign(__assign({}, formData), { birthdate: date ? date.toISOString().split('T')[0] : '' }));
                                }, disabled: function (date) { return date > new Date() || date < new Date('1900-01-01'); }, className: "text-[#E0E0E0]" }))),
                    errors.birthdate && React.createElement("p", { className: "text-red-400 text-sm" }, errors.birthdate)),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement(label_1.Label, { className: "text-[#F7EDEA]" },
                        lo_1["default"].gender,
                        React.createElement("span", { className: "text-[#7F5AF0]" }, "*")),
                    React.createElement(select_1.Select, { value: formData.gender, onValueChange: function (value) { return setFormData(__assign(__assign({}, formData), { gender: value })); } },
                        React.createElement(select_1.SelectTrigger, { className: "bg-[#0D0D12] border-[#7F5AF0]/50 text-[#E0E0E0] focus:border-[#BF93F9] focus:ring-[#BF93F9]/50 transition-all duration-300" },
                            React.createElement(select_1.SelectValue, { placeholder: "\u0E81\u0EB0\u0EA5\u0EB8\u0E99\u0EB2\u0EC0\u0EA5\u0EB7\u0EAD\u0E81\u0EC0\u0E9E\u0E94\u0E82\u0EAD\u0E87\u0EC0\u0E88\u0EBB\u0EC9\u0EB2" })),
                        React.createElement(select_1.SelectContent, { className: "bg-[#1B1B2F] border-[#7F5AF0]/50" },
                            React.createElement(select_1.SelectItem, { value: "male", className: "text-[#E0E0E0]" }, lo_1["default"].genderGirl),
                            React.createElement(select_1.SelectItem, { value: "female", className: "text-[#E0E0E0]" }, lo_1["default"].genderBoy))),
                    errors.gender && React.createElement("p", { className: "text-red-400 text-sm" }, errors.gender)),
                React.createElement(react_2.motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } },
                    React.createElement(button_1.Button, { type: "submit", disabled: isPending, className: "w-full bg-gradient-to-r from-[#7F5AF0] to-[#BF93F9] hover:from-[#BF93F9] hover:to-[#7F5AF0] text-[#F7EDEA] shadow-[0_0_20px_rgba(127,90,240,0.5)] transition-all duration-300" }, isPending ? 'ກຳລັງດຳເນີນການ...' : "" + lo_1["default"].buttonContinue))))));
}
exports.UserInfoForm = UserInfoForm;
