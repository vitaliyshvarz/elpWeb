/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../typings/globals/jquery/index.d.ts" />
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';
import { enableProdMode }         from '@angular/core';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
