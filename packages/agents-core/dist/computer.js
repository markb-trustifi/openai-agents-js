"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInvokeComputer = isInvokeComputer;
exports.asInvokeComputer = asInvokeComputer;
function isInvokeComputer(computer) {
    return typeof computer.invoke === "function";
}
function asInvokeComputer(computer) {
    return computer;
}
//# sourceMappingURL=computer.js.map