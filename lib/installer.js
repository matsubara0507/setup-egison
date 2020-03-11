"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const exec = __importStar(require("@actions/exec"));
const io = __importStar(require("@actions/io"));
function findEgisonVersion(baseInstallDir, version) {
    if (!baseInstallDir) {
        throw new Error('baseInstallDir parameter is required');
    }
    if (!version) {
        throw new Error('versionSpec parameter is required');
    }
    switch (process.platform) {
        case 'linux':
            _findEgisonVersionForLinux(baseInstallDir, version);
            break;
        default:
            throw new Error(`Unsupported OS: ${process.platform}`);
    }
}
exports.findEgisonVersion = findEgisonVersion;
function _findEgisonVersionForLinux(baseInstallDir, version) {
    var tmpOutput = baseInstallDir + '/egison.deb';
    exec.exec(`wget -o ${tmpOutput} https://git.io/egison.x86_64.deb`);
    exec.exec(`sudo dpkg -i ${tmpOutput}`);
    io.rmRF(tmpOutput);
}
