'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_2 = require("motion/react");
var AppLayout_1 = require("@/components/AppLayout");
var ShareResult_1 = require("@/components/ShareResult");
function Step4Page() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(''), frequency = _a[0], setFrequency = _a[1];
    var _b = react_1.useState(null), horoscopeData = _b[0], setHoroscopeData = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    react_1.useEffect(function () {
        var loadData = function () {
            try {
                // ===================== Get User info (phone, birthdate, gender) =====================
                var storedFrequency = localStorage.getItem('plan');
                var storedHoroscope = localStorage.getItem('horoscopeData'); // get br dai
                console.log("plan /step4: ", storedFrequency);
                console.log("horoscope /step4: ", storedHoroscope);
                // If any required data missing → restart flow
                if (!storedFrequency || !storedHoroscope) {
                    // Redirect to step 1 if data is missing
                    router.push('/step1');
                    return;
                }
                // Parse Data
                setFrequency(storedFrequency);
                setHoroscopeData(JSON.parse(storedHoroscope));
            }
            catch (err) {
                console.error('Error loading confirmation data:', err);
                router.push('/step1');
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
    }, [router]);
    // ================= function handle restart =====================
    var handleRestart = function () {
        sessionStorage.clear();
        router.push('/step1');
    };
    // ================= function handle back =====================
    var handleBack = function () {
        router.push('/step3');
    };
    if (!horoscopeData) {
        return null;
    }
    return (React.createElement(AppLayout_1.AppLayout, null,
        React.createElement(react_2.motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 } },
            React.createElement(ShareResult_1.ShareResult, { frequency: frequency, horoscopeData: horoscopeData.horoscope, horoscopeId: horoscopeData.horo_id, onRestart: handleRestart, onBack: handleBack }))));
}
exports["default"] = Step4Page;
