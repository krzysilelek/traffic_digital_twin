// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../TrafficDigitalTwin/Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.37/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiProject;
        (function (TcHmiProject) {
            function betterHour(milliseconds) {
                let seconds = Math.floor(milliseconds / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);

                seconds = seconds % 60;
                minutes = minutes % 60;
                hours = hours % 24;

                return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
            }
            TcHmiProject.betterHour = betterHour;
        })(TcHmiProject = Functions.TcHmiProject || (Functions.TcHmiProject = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('betterHour', 'TcHmi.Functions.TcHmiProject', TcHmi.Functions.TcHmiProject.betterHour);
