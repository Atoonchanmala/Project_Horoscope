'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_2 = require("motion/react");
var AppLayout_1 = require("@/components/AppLayout");
var WhatsAppConfirmation_1 = require("@/components/WhatsAppConfirmation");
function Step3Page() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), userData = _a[0], setUserData = _a[1];
    var _b = react_1.useState(''), frequency = _b[0], setFrequency = _b[1];
    var _c = react_1.useState(null), horoscopeData = _c[0], setHoroscopeData = _c[1];
    // const [horoscopeData, setHoroscopeData] = useState<string>('');
    var _d = react_1.useState(true), loading = _d[0], setLoading = _d[1];
    console.log("userData: ", userData);
    console.log("plan: ", frequency);
    console.log("horoscope: ", horoscopeData === null || horoscopeData === void 0 ? void 0 : horoscopeData.horoscope);
    react_1.useEffect(function () {
        var loadData = function () {
            try {
                // ===================== Get User info (phone, birthdate, gender) =====================
                var storedUserData = localStorage.getItem('userData');
                var storedFrequency = localStorage.getItem('plan');
                var storedHoroscope = localStorage.getItem('horoscopeData'); // get br dai
                // If any required data missing → restart flow
                if (!storedUserData || !storedFrequency || !storedHoroscope) {
                    router.push('/step1');
                    return;
                }
                // Parse Data
                setUserData(JSON.parse(storedUserData));
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
    // ================= LOADING UI =================
    if (loading) {
        return (React.createElement(AppLayout_1.AppLayout, null,
            React.createElement("div", { className: "flex items-center justify-center min-h-[60vh]" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4" }),
                    React.createElement("p", { className: "text-gray-400" }, "Loading your horoscope...")))));
    }
    if (!userData || !horoscopeData) {
        return null;
    }
    // function handleContinue
    var handleContinue = function () {
        if (!(horoscopeData === null || horoscopeData === void 0 ? void 0 : horoscopeData.horo_id)) {
            console.error("not fount error page 4");
            return;
        }
        router.push("/step4/" + horoscopeData.horo_id);
    };
    // function handleBack
    var handleBack = function () { return router.push('/step2'); };
    return (React.createElement(AppLayout_1.AppLayout, null,
        React.createElement(react_2.motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 } },
            React.createElement(WhatsAppConfirmation_1.WhatsAppConfirmation, { frequency: frequency, phoneNumber: userData.phone, horoscopeData: horoscopeData.horoscope, onContinue: handleContinue, onBack: handleBack }))));
}
exports["default"] = Step3Page;
;
