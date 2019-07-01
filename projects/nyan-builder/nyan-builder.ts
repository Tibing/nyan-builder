import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { BrowserBuilderOptions, executeBrowserBuilder } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { NEVER, Observable } from 'rxjs';
import * as nyanProgress from 'nyan-progress';

import { NyanBuilderSchema } from './schema';
import { DeferredLogger } from './deferred-logger';
import { createBrowserLoggingCallback } from '@angular-devkit/build-angular/src/browser';

type Options = NyanBuilderSchema & BrowserBuilderOptions;

function createCliPanel(options: Options, context: BuilderContext): Observable<BuilderOutput> {
  const deferredLogger = new DeferredLogger(context.logger);
  const logging = createBrowserLoggingCallback(!!options.verbose, deferredLogger);

  const opts = { ...options, progress: false };

  const progress = nyanProgress(); // initialize
  progress.start({ width: 80 }); // start the progress

  const timer = setInterval(() => {
    progress.tick();

    if (progress.isComplete) {
      clearInterval(timer);
      deferredLogger.logLastMessage();
    }
  }, 20);

  executeBrowserBuilder(opts, context, { logging })
    .subscribe(() => {
    });

  return NEVER;
}

export default createBuilder<json.JsonObject & Options>(createCliPanel);

