// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../TrafficDigitalTwin/Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.37/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiProject;
        (function (TcHmiProject) {
            function whichDay(dayIndex) {
                return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex-1] || '';
            }
            TcHmiProject.whichDay = whichDay;
        })(TcHmiProject = Functions.TcHmiProject || (Functions.TcHmiProject = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('whichDay', 'TcHmi.Functions.TcHmiProject', TcHmi.Functions.TcHmiProject.whichDay);
