import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { DevServerBuilderOptions, DevServerBuilderOutput, executeDevServerBuilder } from '@angular-devkit/build-angular';
import { Observable } from 'rxjs';

import { nyan } from '../nyan';

function createDevServerBuilder(options: DevServerBuilderOptions, context: BuilderContext): Observable<DevServerBuilderOutput> {
  return nyan(executeDevServerBuilder)(options, context);
}

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(createDevServerBuilder);

