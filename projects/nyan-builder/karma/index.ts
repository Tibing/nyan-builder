import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { executeKarmaBuilder, KarmaBuilderOptions } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';

import { nyan } from '../nyan';

function createKarmaBuilder(options: KarmaBuilderOptions, context: BuilderContext): Observable<BuilderOutput> {
  return nyan(executeKarmaBuilder)(options, context);
}

export default createBuilder<json.JsonObject & KarmaBuilderOptions>(createKarmaBuilder);

