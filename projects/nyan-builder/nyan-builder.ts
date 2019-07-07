import { BuilderContext } from '@angular-devkit/architect';
import { executeBrowserBuilder, ExecutionTransformer } from '@angular-devkit/build-angular';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { createBrowserLoggingCallback } from '@angular-devkit/build-angular/src/browser';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import * as webpack from 'webpack';
import * as nyanProgress from 'nyan-progress';

import { DeferredLogger } from './deferred-logger';
import { ProgressPlugin } from './progress-plugin';

interface BuilderTransforms {
  webpackConfiguration?: ExecutionTransformer<webpack.Configuration>;
  logging?: WebpackLoggingCallback;
}

type Builder<T, R> = (options: T, context: BuilderContext, transforms?: BuilderTransforms) => Observable<R>;

export function createNyanBuilder<T, R>(builder: Builder<T, R>) {
  return (options: any, context: BuilderContext) => {
    const deferredLogger = new DeferredLogger(context.logger);
    const logging = createBrowserLoggingCallback(!!options.verbose, deferredLogger);

    const percent$ = new Subject<number>();
    // @ts-ignore
    const multiplier = builder === executeBrowserBuilder ? 2 : 1;
    const nyan = new NyanCat(percent$, multiplier);

    options.progress = false;
    const progressPlugin: ProgressPlugin = new ProgressPlugin(percent$);
    const transforms = {
      logging,
      webpackConfiguration(config) {
        return ({
          ...config,
          plugins: [
            ...config.plugins,
            progressPlugin,
          ],
        });
      },
    };

    const build$: Observable<R> = builder(options, context, transforms);

    return build$.pipe(
      tap(() => {
        nyan.tick(100);
        deferredLogger.logLastMessage();
      }),
    );
  };
}

export class NyanCat {

  private prog: number;
  private progress = nyanProgress();

  constructor(private percent$: Observable<number>,
              private multiplier: number) {
    this.progress.start({
      width: 80,

      // Disable auto rendering
      renderThrottle: Number.MAX_SAFE_INTEGER,
    });
    percent$
      .pipe(distinctUntilChanged())
      .subscribe(p => {
        if (p === 0) {
          this.prog = 0;
          this.tick(p - this.prog);
          console.clear();
        } else {
          this.tick(p - this.prog);
          this.prog = p;
        }
      });
  }

  tick(value: number) {
    this.progress.tick(value);
    this.progress.animate();
  }
}
