"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const fs = __importStar(require("fs"));
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
            throw new Error(`unsupported OS: ${process.platform}`);
    }
}
exports.findEgisonVersion = findEgisonVersion;
function _findEgisonVersionForLinux(baseInstallDir, version) {
    return __awaiter(this, void 0, void 0, function* () {
        var tmpOutput = baseInstallDir + '/egison.deb';
        var debUrl = `https://raw.githubusercontent.com/egison/egison-package-builder/${version}/packages/egison.x86_64.deb`;
        yield exec.exec(`wget -O ${tmpOutput} ${debUrl}`);
        if (fs.existsSync(tmpOutput)) {
            yield exec.exec(`sudo dpkg -i ${tmpOutput}`);
        }
        else {
            throw new Error(`cannot download egison ${version}`);
        }
        yield io.rmRF(tmpOutput);
    });
}
