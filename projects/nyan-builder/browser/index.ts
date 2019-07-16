import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { BrowserBuilderOptions, executeBrowserBuilder } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';

import { nyan } from '../nyan';

function createBrowserPanel(options: BrowserBuilderOptions, context: BuilderContext): Observable<BuilderOutput> {
  return nyan(executeBrowserBuilder)(options, context);
}

export default createBuilder<json.JsonObject & BrowserBuilderOptions>(createBrowserPanel);

