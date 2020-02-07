var clndr = [];

if (!window.console) {
  window.console = {
    log: function () {
      // sad face.
    }
  };
}

$( function() {
  // Set up the events array
  var eventsArray = [
    {
      title: 'This is an Event',
      date: moment().format('YYYY-MM-') + '07'
    }, {
      title: 'Another Event',
      date: moment().format('YYYY-MM-') + '23'
    }
  ];

  // Declare all vars at the top
  var i;
  var j;
  var start;
  var padDay;
  var daysInMonth;
  var multidayArray = [];
  var multidayMixedArray
  var multidayLongArray;
  var performanceSeconds; 
  var multidayMixedPerfArray;
  var target1;
  var inputVal;
  var inputVal1;
  var startDate;
  var endDate;
  var lastDayofMonth;

  // =========================================================================
  
  // Test showAdjacentMonths and adjacentDaysChangeMonth.
  // Edges of other months should be visible and clicking them should switch
  // the month.
  // =========================================================================
  clndr.adjacent = $('#adjacent').clndr({
    showAdjacentMonths: true,
    adjacentDaysChangeMonth: true
  });

  // Pass in events
  // =========================================================================
  clndr.passInEvents = $('#pass-in-events').clndr({
    events: eventsArray
  });

  // Test multi-day events
  // =========================================================================
  multidayArray = [
    {
      title: 'Multi1',
      endDate: moment().format('YYYY-MM-') + '17',
      startDate: moment().format('YYYY-MM-') + '12'
    }, {
      title: 'Multi2',
      endDate: moment().format('YYYY-MM-') + '27',
      startDate: moment().format('YYYY-MM-') + '24'
    }
  ];

  clndr.multiday = $('#multiday').clndr({
    events: multidayArray,
    multiDayEvents: {
      endDate: 'endDate',
      startDate: 'startDate'
    },
    clickEvents: {
      click: function (target) {
        console.log(target);
      }
    }
  });

  // Test multi-day events
  // =========================================================================
  multidayMixedArray = [
    {
      title: 'Multi1',
      endDate: moment().format('YYYY-MM-') + '17',
      startDate: moment().format('YYYY-MM-') + '12'
    }, {
      title: 'Multi2',
      endDate: moment().format('YYYY-MM-') + '27',
      startDate: moment().format('YYYY-MM-') + '24'
    }, {
      title: 'Single',
      date: moment().format('YYYY-MM-') + '19'
    }
  ];

  clndr.multidayMixed = $('#multiday-mixed').clndr({
    events: multidayMixedArray,
    multiDayEvents: {
      singleDay: 'date',
      endDate: 'endDate',
      startDate: 'startDate'
    },
    clickEvents: {
      click: function (target) {
        console.log(target);
      }
    }
  });

  // Test really long multi-day events
  // =========================================================================
  multidayLongArray = [
    {
      title: 'Multi1',
      endDate: moment().format('YYYY-MM-') + '17',
      startDate: moment().subtract(3, 'months').format('YYYY-MM-') + '12'
    }, {
      title: 'Multi2',
      startDate: moment().format('YYYY-MM-') + '24',
      endDate: moment().add(4, 'months').format('YYYY-MM-') + '27'
    }
  ];

  clndr.multidayLong = $('#multiday-long').clndr({
    events: multidayLongArray,
    multiDayEvents: {
      endDate: 'endDate',
      startDate: 'startDate'
    },
    clickEvents: {
      click: function (target) {
        console.log(target);
      }
    }
  });

  // Test constraints
  // The 4th of this month to the 12th of next month
  // =========================================================================
  clndr.constraints = $('#constraints').clndr({
    constraints: {
      startDate: moment().format('YYYY-MM-') + '04',
      endDate: moment().add(1, 'months').format('YYYY-MM-12')
    },
    clickEvents: {
      click: function (target) {
        if ($(target.element).hasClass('inactive')) {
          console.log('You can\'t pick that date.');
        } else {
          console.log('You picked a valid date.');
        }
      }
    }
  });

  // Test constraints
  // The 22nd of previous month to the 5th of next month
  // =========================================================================
  clndr.prevNextMonthConstraints = $('#prev-next-month-constraints').clndr({
    constraints: {
      endDate: moment().add(1, 'months').format('YYYY-MM-05'),
      startDate: moment().subtract(1, 'months').format('YYYY-MM-') + '22'
    }
  });

  // Test constraints
  // The 2nd to the 5th of previous month
  // =========================================================================
  clndr.prevMonthConstraints = $('#prev-month-constraints').clndr({
    constraints: {
      endDate: moment().subtract(1, 'months').format('YYYY-MM-05'),
      startDate: moment().subtract(1, 'months').format('YYYY-MM-') + '02'
    }
  });

  // Test the start constraint by itself (4th of this month)
  // =========================================================================
  clndr.startConstraint = $('#start-constraint').clndr({
    constraints: {
      startDate: moment().format('YYYY-MM-') + '04'
    }
  });

  // Test the end constraint by itself (12th of next month)
  // =========================================================================
  clndr.endConstraint = $('#end-constraint').clndr({
    constraints: {
      endDate: moment().add(1, 'months').format('YYYY-MM-') + '12'
    }
  });

  // Test forceSixRows option
  // =========================================================================
  clndr.sixRows = $('#six-rows').clndr({
    forceSixRows: true
  });

  // Test formatWeekdayHeader option (#342)
  // =========================================================================
  clndr.formatWeekdayHeader = $('#format-weekday-header').clndr({
    formatWeekdayHeader: function (day) {
      return day.format('dddd');
    }
  });
});
