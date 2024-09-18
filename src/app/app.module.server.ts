import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HighchartsChartModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
