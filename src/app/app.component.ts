// app.component.ts
import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Ensure this is correct
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  connection: signalR.HubConnection;
  chart!: Highcharts.Chart;
  
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7042/saleshub")
      .build();
    this.connection.start();
  
    this.connection.on("receiveMessage", (messageList: any[]) => {
      messageList.forEach(message => {
        this.updateChartSeries(message.name, message.data);
      });
    });
  }

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      style: {
        fontFamily: 'Arial, sans-serif'
      },
      shadow: true
    },
    title: {
      text: 'Sales Analysis',
      align: 'center',
      style: {
        color: '#333333',
        fontSize: '24px',
        fontWeight: 'bold'
      }
    },
    subtitle: {
      text: 'Monthly Sales Data',
      align: 'center',
      style: {
        color: '#666666',
        fontSize: '16px'
      }
    },
    yAxis: {
      title: {
        text: 'Sales Quantity',
        style: {
          color: '#333333',
          fontWeight: 'bold'
        }
      },
      gridLineColor: '#e6e6e6',
      labels: {
        style: {
          color: '#333333'
        }
      }
    },
    xAxis: {
      type: 'category',
      categories: ['Product A', 'Product B'], // Add your categories here
      labels: {
        style: {
          color: '#333333'
        }
      },
      lineColor: '#e6e6e6',
      tickColor: '#e6e6e6'
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderRadius: 5,
      itemStyle: {
        color: '#333333',
        fontWeight: 'normal'
      },
      itemHoverStyle: {
        color: '#000000'
      }
    },
    tooltip: {
      shared: true,
    },
    plotOptions: {
      column: {
        grouping: true,
        shadow: false,
        borderWidth: 0,
        dataLabels: {
          enabled: true
        }
      }
    },
    series: []
  };

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chart = chart;
  };

  updateChartSeries(name: string, data: number[]) {
    const seriesOptions: Highcharts.SeriesColumnOptions = {
      type: 'column',
      name: name,
      data: data
    };

    if (this.chart) {
      const existingSeries = this.chart.series.find(series => series.name === name);
      if (existingSeries) {
        existingSeries.setData(data, true);
      } else {
        this.chart.addSeries(seriesOptions, true);
      }
    }
  }
}
