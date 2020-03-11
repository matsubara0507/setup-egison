import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as fs from 'fs';

export function findEgisonVersion(baseInstallDir: string, version: string) {
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

async function _findEgisonVersionForLinux(
  baseInstallDir: string,
  version: string
) {
  var tmpOutput = baseInstallDir + '/egison.deb';
  var debUrl = `https://raw.githubusercontent.com/egison/egison-package-builder/${version}/packages/egison.x86_64.deb`;
  await exec.exec(`wget -O ${tmpOutput} ${debUrl}`);
  if (fs.existsSync(tmpOutput)) {
    await exec.exec(`sudo dpkg -i ${tmpOutput}`);
  } else {
    throw new Error(`cannot download egison ${version}`);
  }
  await io.rmRF(tmpOutput);
}
