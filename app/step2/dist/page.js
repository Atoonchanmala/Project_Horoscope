'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var AppLayout_1 = require("@/components/AppLayout");
var FrequencySelectorServer_1 = require("@/components/FrequencySelectorServer");
function Step2Page() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), userData = _a[0], setUserData = _a[1];
    react_1.useEffect(function () {
        var storedUserData = localStorage.getItem('userData');
        if (!storedUserData) {
            router.push('/step1');
            return;
        }
        // setUserData(JSON.parse(storedUserData));
        setTimeout(function () {
            setUserData(JSON.parse(storedUserData));
        }, 0);
    }, [router]);
    if (!userData)
        return null;
    return (React.createElement(AppLayout_1.AppLayout, null,
        React.createElement(FrequencySelectorServer_1.FrequencySelectorServer, null)));
}
exports["default"] = Step2Page;
