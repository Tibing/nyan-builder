/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { Schema } from './schema';
/**
 * This utils has to imported directly from the `/util/package`, not from the `/util/`.
 * Other utilities use `@angular/sdk/schematics` and `@schematics/angular` packages.
 * But these packages are not installed in this step.
 * */
import { addDevDependencyToPackageJson, getPeerDependencyVersionFromPackageJson, version } from '../util/package';

/**
 * ng-add schematics, installs peer dependencies and runs project setup schematics.
 * */
export default function(options: Schema): Rule {
  return runSetupSchematics(options);
}

/**
 * Runs `npm install`, then `post-install` schematic and after complete runs `setup` schematics.
 * The rest part of the ng-add schematics uses `@angular/cdk/schematics` and `@schematics/angular`
 * utilities. That's why we have to install `@angular/cdk` and `@schematics/angular` package
 * before running Nebular setup in the project.
 *
 * The only possibility to run `setup` schematics after required packages installed
 * is to use context tasks and add `npm install` task as the dependency to `setup` schematics task.
 * */
function runSetupSchematics(options: Schema) {
  return (tree: Tree, context: SchematicContext) => {
    const nebularThemeVersion = version();
    const angularCoreVersion = getPeerDependencyVersionFromPackageJson('@angular/core');
    const angularCdkVersion = getPeerDependencyVersionFromPackageJson('@angular/cdk');

    addDevDependencyToPackageJson(tree, 'nyan-builder', nebularThemeVersion);
    addDevDependencyToPackageJson(tree, '@angular/cdk', angularCdkVersion);
    addDevDependencyToPackageJson(tree, '@schematics/angular', angularCoreVersion);

    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('setup', options), [installTaskId]);
  };
}
