"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEgisonVersion = void 0;
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
        var revision = _packageRevisionOf(version);
        var debUrl = `https://raw.githubusercontent.com/egison/egison-package-builder/${revision}/packages/egison.x86_64.deb`;
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
function _packageRevisionOf(version) {
    switch (version) {
        case '4.1.2':
            return '24ee26b8824c78a7a7a3faca542325d045a6530a';
        case '4.1.1':
            return 'af41aa2841afd001f3b5c31d339dc0a5c8790ad6';
        case '4.1.0':
            return '60b353932b8ffdf0b36ec4034408d229f30e4737';
        case '4.0.3':
            return '2a39d25c446b494d6abe50b824191d5da3175cc7';
        case '4.0.0':
            return '09b9229017513aefbec18eb2e11c2ba6717711bb';
        case '3.10.3':
            return '744e59bf2ac0828ed45ed71ff81cf29c2c2f0fca';
        case '3.9.4':
            return '3418c471b9a9649dc1e46cd2e23c09b0c04da7d9';
        default:
            throw new Error(`unsupported egison ${version}`);
    }
}
