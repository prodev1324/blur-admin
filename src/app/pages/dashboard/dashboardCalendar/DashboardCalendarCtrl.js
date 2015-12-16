/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardCalendarCtrl', DashboardCalendarCtrl);

  /** @ngInject */
  function DashboardCalendarCtrl(layoutColors) {
    var $element = $('#calendar').fullCalendar({
      //height: 335,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2015-07-12',
      selectable: true,
      selectHelper: true,
      select: function (start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $element.fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $element.fullCalendar('unselect');
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2015-07-01'
        },
        {
          title: 'Long Event',
          start: '2015-07-07',
          end: '2015-07-10',
          color: layoutColors.danger
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2015-07-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2015-07-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2015-07-11',
          end: '2015-07-13',
          color: layoutColors.successLight
        },
        {
          title: 'Meeting',
          start: '2015-07-12T10:30:00',
          end: '2015-07-12T12:30:00',
          color: layoutColors.danger
        },
        {
          title: 'Meeting',
          start: '2015-07-14T14:30:00',
          color: layoutColors.successLight
        },
        {
          title: 'Dinner',
          start: '2015-07-14T20:00:00',
          color: layoutColors.success
        },
        {
          title: 'Birthday Party',
          start: '2015-07-13T07:00:00',
          color: layoutColors.success
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2015-07-28'
        }
      ]
    });
  }
})();