import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { BrowserBuilderOptions, executeBrowserBuilder } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';

import { createNyanBuilder } from '../nyan-builder';

function createBrowserPanel(options: BrowserBuilderOptions, context: BuilderContext): Observable<BuilderOutput> {
  const executeNyanBuilder = createNyanBuilder(executeBrowserBuilder);
  return executeNyanBuilder(options, context);
}

export default createBuilder<json.JsonObject & BrowserBuilderOptions>(createBrowserPanel);

