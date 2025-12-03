"use client";
"use strict";
exports.__esModule = true;
exports.Toast = void 0;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var lucide_react_1 = require("lucide-react");
exports.Toast = function (_a) {
    var message = _a.message, _b = _a.type, type = _b === void 0 ? "success" : _b;
    var iconConfig = {
        success: {
            bg: "bg-success-soft text-fg-success",
            Icon: lucide_react_1.Check
        },
        error: {
            bg: "bg-red-100 text-red-600",
            Icon: lucide_react_1.XCircle
        },
        warning: {
            bg: "bg-yellow-100 text-yellow-600",
            Icon: lucide_react_1.AlertTriangle
        },
        info: {
            bg: "bg-blue-100 text-blue-600",
            Icon: lucide_react_1.Info
        }
    };
    var _c = iconConfig[type], bg = _c.bg, Icon = _c.Icon;
    return (react_1["default"].createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.25 }, className: "flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default", role: "alert" },
        react_1["default"].createElement("div", { className: "inline-flex items-center justify-center shrink-0 w-7 h-7 rounded " + bg },
            react_1["default"].createElement(Icon, { className: "w-5 h-5" })),
        react_1["default"].createElement("div", { className: "ml-3 text-sm font-normal" }, message)));
};
exports["default"] = exports.Toast;
