// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../TrafficDigitalTwin/Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.37/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiProject;
		(function (TcHmiProject) {

			var wait = (ms) => {
				const start = Date.now();
				let now = start;
				while (now - start < ms) {
					now = Date.now();
				}
			}

			function checkIfRoutesAreCalculated() {
				let check = new TcHmi.Symbol('%s%PLC1.MAIN.bShouldCalculate%/s%');
				check.readEx(function (data) {
					if (data.error === TcHmi.Errors.NONE) {
						if (data.value == true) {
							wait(100);
							checkIfRoutesAreCalculated();
						}
					}
				});
			}

            function getDataToDatagrid(timer) {

				new TcHmi.Symbol('%s%PLC1.TICK.canGrabTableData%/s%').readEx(function (data) {
					if (data.error === TcHmi.Errors.NONE) {
						if (data.value != true) {
							return;
                        }
					}
				});
				
				let originalEntry;
				let originalExit;

				new TcHmi.Symbol('%s%PLC1.GLOBALS.nStartPosition%/s%').readEx(function (data) {
					if (data.error === TcHmi.Errors.NONE) {
						originalEntry = data.value;
					}
				});

				new TcHmi.Symbol('%s%PLC1.GLOBALS.nEndPosition%/s%').readEx(function (data) {
					if (data.error === TcHmi.Errors.NONE) {
						originalExit = data.value;
					}
				});
				
				let neededDistances = new Array();
				let letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
				let which_entrance = 1;

				for (let j = 0; j < letters.length; j++) {
					TcHmi.Symbol.writeEx('%s%PLC1.GLOBALS.nStartPosition%/s%', which_entrance);
					TcHmi.Symbol.writeEx('%s%PLC1.MAIN.bShouldCalculate%/s%', true);
					which_entrance += 2;

					checkIfRoutesAreCalculated();

					let allDistances = new TcHmi.Symbol('%s%PLC1.GLOBALS.aDistances%/s%');
					allDistances.readEx(function (data) {
						if (data.error === TcHmi.Errors.NONE) {
							for (var i = 1; i < letters.length * 2; i += 2) {
								neededDistances.push({ value: `${data.value[i]}` });
							}
						}
						if (j == letters.length - 1) {
							let bigJSON = new Array();
							for (let i = 0; i < 8; i++) {
								bigJSON.push({
									L: letters[i],
									LA: neededDistances[i].value,
									LB: neededDistances[i + 8].value,
									LC: neededDistances[i + 16].value,
									LD: neededDistances[i + 24].value,
									LE: neededDistances[i + 32].value,
									LF: neededDistances[i + 40].value,
									LG: neededDistances[i + 48].value,
									LH: neededDistances[i + 56].value
								});
							}
							TcHmi.Symbol.writeEx('%ctrl%TcHmiDatagrid::SrcData%/ctrl%', JSON.stringify(bigJSON));

							TcHmi.Symbol.writeEx('%s%PLC1.GLOBALS.nStartPosition%/s%', originalEntry);
							TcHmi.Symbol.writeEx('%s%PLC1.GLOBALS.nEndPosition%/s%', originalExit);
							TcHmi.Symbol.writeEx('%s%PLC1.TICK.canGrabTableData%/s%', false);
							
						}
					});
				}
            }
            TcHmiProject.getDataToDatagrid = getDataToDatagrid;
        })(TcHmiProject = Functions.TcHmiProject || (Functions.TcHmiProject = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('getDataToDatagrid', 'TcHmi.Functions.TcHmiProject', TcHmi.Functions.TcHmiProject.getDataToDatagrid);
