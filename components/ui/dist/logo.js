'use client';
"use strict";
exports.__esModule = true;
exports.Logo = void 0;
var react_1 = require("motion/react");
var image_1 = require("next/image"); // (recommended for responsive optimization)
var logoImage_png_1 = require("../../asset/logoImage.png");
exports.Logo = function (_a) {
    var className = _a.className;
    return (React.createElement(react_1.motion.div, { className: "inline-block mb-6 " + className, initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.5 } },
        React.createElement(react_1.motion.div, { animate: { y: [0, -10, 0] }, transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }, className: "mx-auto w-full max-w-[650px]" // ⬅️ responsive container
         },
            React.createElement(image_1["default"], { src: logoImage_png_1["default"], alt: "Galactic Star Astrology AI Logo", className: "w-full h-auto" // ⬅️ fully responsive
                , priority: true }))));
};
exports["default"] = exports.Logo;
