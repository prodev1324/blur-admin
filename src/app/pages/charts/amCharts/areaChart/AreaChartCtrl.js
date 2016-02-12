/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.amCharts')
      .controller('AreaChartCtrl', AreaChartCtrl);

  /** @ngInject */
  function AreaChartCtrl($scope, layoutColors, $element, tplSkinChartWatcherHelper, layoutPaths) {
    var id = $element[0].getAttribute('id');
    var areaChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      dataProvider: [
        {
          lineColor: layoutColors.dangerCharts,
          date: '2012-01-01',
          duration: 408
        },
        {
          date: '2012-01-02',
          duration: 482
        },
        {
          date: '2012-01-03',
          duration: 562
        },
        {
          date: '2012-01-04',
          duration: 379
        },
        {
          lineColor: layoutColors.successCharts,
          date: '2012-01-05',
          duration: 501
        },
        {
          date: '2012-01-06',
          duration: 443
        },
        {
          date: '2012-01-07',
          duration: 405
        },
        {
          date: '2012-01-08',
          duration: 309,
          lineColor: layoutColors.primaryCharts
        },
        {
          date: '2012-01-09',
          duration: 287
        },
        {
          date: '2012-01-10',
          duration: 485
        },
        {
          date: '2012-01-11',
          duration: 890
        },
        {
          date: '2012-01-12',
          duration: 810
        }
      ],
      balloon: {
        cornerRadius: 6,
        horizontalPadding: 15,
        verticalPadding: 10
      },
      valueAxes: [
        {
          duration: 'mm',
          durationUnits: {
            hh: 'h ',
            mm: 'min'
          },
          axisAlpha: 0
        }
      ],
      graphs: [
        {
          bullet: 'square',
          bulletBorderAlpha: 1,
          bulletBorderThickness: 1,
          fillAlphas: 0.3,
          fillColorsField: 'lineColor',
          legendValueText: '[[value]]',
          lineColorField: 'lineColor',
          title: 'duration',
          valueField: 'duration'
        }
      ],

      chartCursor: {
        categoryBalloonDateFormat: 'YYYY MMM DD',
        cursorAlpha: 0,
        fullWidth: true
      },
      dataDateFormat: 'YYYY-MM-DD',
      categoryField: 'date',
      categoryAxis: {
        dateFormats: [
          {
            period: 'DD',
            format: 'DD'
          },
          {
            period: 'WW',
            format: 'MMM DD'
          },
          {
            period: 'MM',
            format: 'MMM'
          },
          {
            period: 'YYYY',
            format: 'YYYY'
          }
        ],
        parseDates: true,
        autoGridCount: false,
        axisColor: '#555555',
        gridAlpha: 0,
        gridCount: 50
      },
      export: {
        enabled: true
      },
      pathToImages: layoutPaths.images.amChart
    });

    tplSkinChartWatcherHelper.watchAxisChartStyleChanges($scope, areaChart);

    areaChart.addListener('dataUpdated', zoomAreaChart);

    function zoomAreaChart() {
      areaChart.zoomToDates(new Date(2012, 0, 3), new Date(2012, 0, 11));
    }
  }

})();
