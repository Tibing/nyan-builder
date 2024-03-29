import { Tree } from '@angular-devkit/schematics';
import { readJSON, writeJSON } from './file';

const packageJsonName = 'package.json';

interface PackageJson {
  version: string;
  dependencies: { [key: string]: string },
  devDependencies: { [key: string]: string },
  peerDependencies: { [key: string]: string },
}

export function version(): string {
  return getPackageJson().version;
}

export function getPeerDependencyVersionFromPackageJson(packageName: string): string {
  const packageJson: PackageJson = getPackageJson();

  if (noInfoAboutPeerDependency(packageJson, packageName)) {
    throwNoPackageInfoInPackageJson(packageName);
  }

  return packageJson.peerDependencies[packageName];
}

/**
 * Gets the version of the specified dependency by looking at the package.json in the specified tree
 * */
export function getDependencyVersionFromPackageJson(tree: Tree, packageName: string): string {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (noInfoAboutDependency(packageJson, packageName)) {
    throwNoPackageInfoInPackageJson(packageName);
  }

  return packageJson.dependencies[packageName];
}

export function addDependencyToPackageJson(tree: Tree, packageName: string, packageVersion: string, force = false) {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }

  if (!packageJson.dependencies[packageName] || force) {
    packageJson.dependencies[packageName] = packageVersion;
    packageJson.dependencies = sortObjectByKeys(packageJson.dependencies);
  }

  writeJSON(tree, packageJsonName, packageJson);
}

export function addDevDependencyToPackageJson(tree: Tree, packageName: string, packageVersion: string) {
  if (!tree.exists(packageJsonName)) {
    throwNoPackageJsonError();
  }

  const packageJson: PackageJson = readJSON(tree, packageJsonName);

  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {};
  }

  if (!packageJson.devDependencies[packageName]) {
    packageJson.devDependencies[packageName] = packageVersion;
    packageJson.devDependencies = sortObjectByKeys(packageJson.devDependencies);
  }

  writeJSON(tree, packageJsonName, packageJson);
}

function throwNoPackageJsonError() {
  throw new Error('No package.json found in the tree.');
}

function throwNoPackageInfoInPackageJson(packageName: string) {
  throw new Error(`No info found in package.json for ${packageName}`);
}

/**
 * Validates packageJson has dependencies, also as specified dependency not exists.
 * */
function noInfoAboutDependency(packageJson: PackageJson, packageName: string): boolean {
  return !dependencyAlreadyExists(packageJson, packageName);
}

/**
 * Validates packageJson has peerDependencies, also as specified peerDependency not exists.
 * */
function noInfoAboutPeerDependency(packageJson: PackageJson, packageName: string): boolean {
  return !peerDependencyAlreadyExists(packageJson, packageName);
}

/**
 * Validates packageJson has dependencies, also as specified dependency exists.
 * */
function dependencyAlreadyExists(packageJson: PackageJson, packageName: string): boolean {
  return !!(packageJson.dependencies && packageJson.dependencies[packageName]);
}

/**
 * Validates packageJson has peerDependencies, also as specified peerDependency exists.
 * */
function peerDependencyAlreadyExists(packageJson: PackageJson, packageName: string): boolean {
  return !!(packageJson.peerDependencies && packageJson.peerDependencies[packageName]);
}

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: object) {
  return Object.keys(obj).sort().reduce((result, key) => (result[key] = obj[key]) && result, {});
}

function getPackageJson(): PackageJson {
  return require('../../package.json');
}
