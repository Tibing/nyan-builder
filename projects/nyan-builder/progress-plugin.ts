/* eslint-disable max-params, max-statements */

'use strict';

import { Subject } from 'rxjs';

const webpack = require('webpack');


const camel = str => str.replace(/-([a-z])/, group => group[1].toUpperCase());

function _webpackHook(hookType, compiler, event, callback) {
  if (compiler.hooks) {
    hookType = hookType || 'tap';
    compiler.hooks[camel(event)][hookType]('webpack-dashboard', callback);
  } else {
    compiler.plugin(event, callback);
  }
}

const webpackHook = _webpackHook.bind(null, 'tap');

export class ProgressPlugin {
  constructor(private percent$: Subject<number>) {
  }

  apply(compiler) {
    const progressPlugin = this.createProgressPlugin();
    progressPlugin.apply(compiler);

    webpackHook(compiler, 'done', () => {
      this.publishPercent(1);
    });
  }

  private publishPercent(percent: number) {
    this.percent$.next(percent * 100);
  }

  private createProgressPlugin() {
    return new webpack.ProgressPlugin((percent: number) => this.publishPercent(percent));
  }
}
