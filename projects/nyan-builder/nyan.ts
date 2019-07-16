import { BuilderContext } from '@angular-devkit/architect';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { Observable } from 'rxjs';
import * as webpack from 'webpack';
import * as NyanProgressPlugin from 'nyan-progress-webpack-plugin';

interface BuilderTransforms {
  webpackConfiguration?: ExecutionTransformer<webpack.Configuration>;
  logging?: WebpackLoggingCallback;
}

type Builder<T, R> = (options: T, context: BuilderContext, transforms?: BuilderTransforms) => Observable<R>;

export function nyan<T, R>(builder: Builder<T, R>) {
  return (options: any, context: BuilderContext) => {
    return builder(options, context, {
      webpackConfiguration(input) {
        input.plugins.push(new NyanProgressPlugin());
        return input;
      },
    });
  };
}
