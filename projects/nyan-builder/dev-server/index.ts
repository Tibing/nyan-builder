import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { DevServerBuilderOptions, DevServerBuilderOutput, executeDevServerBuilder } from '@angular-devkit/build-angular';
import { Observable } from 'rxjs';

import { createNyanBuilder } from '../nyan-builder';

function createDevServerBuilder(options: DevServerBuilderOptions, context: BuilderContext): Observable<DevServerBuilderOutput> {
  const executeNyanBuilder = createNyanBuilder(executeDevServerBuilder);
  return executeNyanBuilder(options, context);
}

export default createBuilder<DevServerBuilderOptions, DevServerBuilderOutput>(createDevServerBuilder);

