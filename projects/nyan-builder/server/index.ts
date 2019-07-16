import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { executeServerBuilder, ServerBuilderOptions } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';

import { nyan } from '../nyan';

function createServerPanel(options: ServerBuilderOptions, context: BuilderContext): Observable<BuilderOutput> {
  return nyan(executeServerBuilder)(options, context);
}

export default createBuilder<json.JsonObject & ServerBuilderOptions>(createServerPanel);

