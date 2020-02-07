var clndr ;

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

  // Default
  // =========================================================================
  clndr = $('#clndr-calendar').clndr(
     {
      formatWeekdayHeader: function (day) {
        return day.format('dddd');
      },
      forceSixRows: true,
      showAdjacentMonths: true,
      adjacentDaysChangeMonth: true,
      ready: function () {
        console.log('The callbacks calendar just called ready()');
      },
      clickEvents: {
        click: function (target) {
          if ($(target.element).hasClass('inactive')){
            alert('You can\'t pick that date.')
          }else if($(target.element).hasClass('adjacent-month')){

          }
          else{
            target1 = target;
            $("#eventDetails").val('');
            $("#myModal").modal('show');
          }
        },
        today: function (month) {
          console.log('today', month);
        },
        nextYear: function (month) {
          
        },
        nextMonth: function (month) {
          
        },
        previousYear: function (month) {
          
        },
        onYearChange: function (month) {
          
        },
        previousMonth: function (month) {
          
          
        },
        onMonthChange: function (month) {

        }
      },
      doneRendering: function () {
        if(this.eventsThisInterval){
          var strings = String(this.intervalEnd._d);
          lastDayofMonth = strings.split(" ")[2];
          process(this.eventsThisInterval);
        }
      }
    }
  );
  
  // single day event to clndr's eveent array
  function addingEvent(title){ 
    eventsArray = [{title: title, date: target1.date._i}];
    if(title != null){
      clndr.addEvents(eventsArray);
      //process(clndr.eventsThisInterval);
    }else{
    }
  }

  // multi day event to clndr's eveent array
  function addingEvent1(){ 
    multidayArray=[{
      title: inputVal1,
      endDate: moment().format('YYYY-MM-') + endDate,
      startDate: moment().format('YYYY-MM-') + startDate
    }]; 
    clndr.options.multiDayEvents = {
      singleDay: 'date',
      endDate: 'endDate',
      startDate: 'startDate'
    };
    clndr.addEvents(multidayArray);
    //process(clndr.eventsThisInterval);
    
  }
  
  // processing event
  function process(eventsArray){
    eventsArray.forEach(element => {
      if(element.date){
        addEventsItemProcess(element.title, element.date);
      }else{
        addEventsItemProcess1(element.title, element.endDate, element.startDate);
      }
    });
  }

  // when user click add button of single day event's modal, add event to calendar
  $('#add').click(function() {
    validate(); // validate input value
    addingEvent(inputVal);
    $('#myModal').modal('hide');
  });

  // //when user click add button of multi day event's modal, add event to calendar
  $('#add1').click(function() {
    validate1(); // validate input value 
    addingEvent1();
    $('#Multi-days-event-modal').modal('hide');
  });

  // when user click 'Add Multi-days Event' button, just show modal to input event details
  $('#multi-event-button').click(function() {
    $('#Multi-days-event-modal').modal('show');
    $("#eventDetails1").val('');
    $("#start-date").val('');
    $("#end-date").val('');
  });

  // validate single day event details
  function validate(){
    inputVal = document.getElementById("eventDetails").value;
    if(inputVal == ''){
      alert("Please enter eventDetails");
      throw "Please enter eventDetails";
    }else{
    }
  }

  // validate multi day event details
  function validate1(){
    inputVal1 = document.getElementById("eventDetails1").value;
    startDate = document.getElementById("start-date").value;
    endDate = document.getElementById("end-date").value;
    if(inputVal1 == ''){
      alert("Please enter eventDetails");
      throw "Please enter eventDetails";
    }else if(startDate == '' || isNaN(startDate)){
      alert("Please enter startDate or correct number");
      throw "Please enter startDate or correct number";
    }else if(endDate == '' || isNaN(endDate)){
      alert("Please enter endDate or correct number");
      throw "Please enter endDate or correct number";
    }else if(parseInt(endDate) < parseInt(startDate)){
      console.log("end date",endDate);
      console.log(startDate);
      alert("End date must be bigger than start date");
      throw "End date must be bigger than start date";
    }else if(parseInt(startDate) < 1){
      alert("start date is not correct");
      throw "start date is not correct";
    }else if(parseInt(endDate) > lastDayofMonth){
      alert("end date is not correct");
      throw "end date is not correct";
    }
    else{
    }
  }

  // add single day event details template to calendar
  function addEventsItemProcess(title, date){
    var node = "<div class = 'card' style='width:100%;margin-bottom:20px;margin-top:20px;'>" 
                + "<div class = 'card-body'>" 
                    + "<h5 class ='card-title'> Event </h5>"
                    + "<h6 class ='card-subtitle mb-2 text-muted'> Event Type: Single Day</h6>"
                    + "<h6 class ='card-subtitle mb-2 text-muted'> Date: " + date + '</h6>'
                    + "<h6 class ='card-subtitle mb-2 text-muted'> Details</h6>"
                    + "<p class='card-text'>" + title +'</p>' 
                + '</div>' 
              + '</div>';
    $('#clndr-event-listing').append(node);
  }
  // add multi day event details template to calendar
  function addEventsItemProcess1(title, endDate, startDate){
    var node = "<div class = 'card' style='width:100%;margin-bottom:20px;margin-top:20px;'>" 
                + "<div class = 'card-body'>" 
                    + "<h5 class ='card-title'> Event </h5>"
                    + "<h6 class ='card-subtitle mb-2 text-muted'> Event Type: Multi Day</h6>"
                    + "<h6 class ='card-subtitle mb-2 text-muted'> Start Date: " + startDate + " End Date: " + endDate + '</h6>'
                    + "<h6 class ='card-subtitle mb-2 text-muted'> Details</h6>"
                    + "<p class='card-text'>" + title +'</p>' 
                + '</div>' 
              + '</div>';
    $('#clndr-event-listing').append(node);
  }

  // Test showAdjacentMonths and adjacentDaysChangeMonth.
  // Edges of other months should be visible and clicking them should switch
  // the month.
  // =========================================================================
  // clndr.adjacent = $('#adjacent').clndr({
  //   showAdjacentMonths: true,
  //   adjacentDaysChangeMonth: true
  // });

  // // Pass in a template
  // // =========================================================================
  // clndr.passInATemplate = $('#pass-in-a-template').clndr({
  //   template: $('#clndr-template').html()
  // });

  // // Pass in events
  // // =========================================================================
  // clndr.passInEvents = $('#pass-in-events').clndr({
  //   events: eventsArray
  // });

  // // Test the clickEvent callbacks
  // // =========================================================================
  // clndr.callbacks = $('#callbacks').clndr({
  //   ready: function () {
  //     console.log('The callbacks calendar just called ready()');
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log('click', target);
  //     },
  //     today: function (month) {
  //       console.log('today', month);
  //     },
  //     nextYear: function (month) {
  //       console.log('next year', month);
  //     },
  //     nextMonth: function (month) {
  //       console.log('next month', month);
  //     },
  //     previousYear: function (month) {
  //       console.log('previous year', month);
  //     },
  //     onYearChange: function (month) {
  //       console.log('on year change', month);
  //     },
  //     previousMonth: function (month) {
  //       console.log('previous month', month);
  //     },
  //     onMonthChange: function (month) {
  //       console.log('on month change', month);
  //     }
  //   },
  //   doneRendering: function () {
  //     console.log('The callbacks calendar just called doneRendering()');
  //   }
  // });

  // // Test multi-day events
  // // =========================================================================
  // multidayArray = [
  //   {
  //     title: 'Multi1',
  //     endDate: moment().format('YYYY-MM-') + '17',
  //     startDate: moment().format('YYYY-MM-') + '12'
  //   }, {
  //     title: 'Multi2',
  //     endDate: moment().format('YYYY-MM-') + '27',
  //     startDate: moment().format('YYYY-MM-') + '24'
  //   }
  // ];

  // clndr.multiday = $('#multiday').clndr({
  //   events: multidayArray,
  //   multiDayEvents: {
  //     endDate: 'endDate',
  //     startDate: 'startDate'
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log(target);
  //     }
  //   }
  // });

  // // Test multi-day events
  // // =========================================================================
  // multidayMixedArray = [
  //   {
  //     title: 'Multi1',
  //     endDate: moment().format('YYYY-MM-') + '17',
  //     startDate: moment().format('YYYY-MM-') + '12'
  //   }, {
  //     title: 'Multi2',
  //     endDate: moment().format('YYYY-MM-') + '27',
  //     startDate: moment().format('YYYY-MM-') + '24'
  //   }, {
  //     title: 'Single',
  //     date: moment().format('YYYY-MM-') + '19'
  //   }
  // ];

  // clndr.multidayMixed = $('#multiday-mixed').clndr({
  //   events: multidayMixedArray,
  //   multiDayEvents: {
  //     singleDay: 'date',
  //     endDate: 'endDate',
  //     startDate: 'startDate'
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log(target);
  //     }
  //   }
  // });

  // // Test multi-day event performance
  // // =========================================================================
  // // Start with two truly multiday events.
  // multidayMixedPerfArray = [
  //   {
  //     title: 'Multi1',
  //     endDate: moment().format('YYYY-MM-') + '17',
  //     startDate: moment().format('YYYY-MM-') + '12'
  //   }, {
  //     title: 'Multi2',
  //     endDate: moment().format('YYYY-MM-') + '27',
  //     startDate: moment().format('YYYY-MM-') + '24'
  //   }
  // ];

  // // Add ten events every day this month that are only a day long,
  // // which triggers clndr to use a performance optimization.
  // daysInMonth = moment().daysInMonth();

  // for (i = 1; i <= daysInMonth; i++) {
  //   padDay = (i < 10)
  //     ? '0' + i
  //     : i;

  //   for (j = 0; j < 10; j++) {
  //     multidayMixedPerfArray.push({
  //       endDate: moment().format('YYYY-MM-') + padDay,
  //       startDate: moment().format('YYYY-MM-') + padDay
  //     });
  //   }
  // }

  // // Start timer
  // start = moment();

  // clndr.multidayMixedPerformance = $('#multiday-mixed-performance').clndr({
  //   events: multidayMixedPerfArray,
  //   multiDayEvents: {
  //     singleDay: 'date',
  //     endDate: 'endDate',
  //     startDate: 'startDate'
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log(target);
  //     }
  //   }
  // });

  // // Capture the end time
  // performanceSeconds = moment.duration(moment().diff(start)).asSeconds();

  // $('#multiday-mixed-performance-val').text(performanceSeconds);

  // // Test really long multi-day events
  // // =========================================================================
  // multidayLongArray = [
  //   {
  //     title: 'Multi1',
  //     endDate: moment().format('YYYY-MM-') + '17',
  //     startDate: moment().subtract(3, 'months').format('YYYY-MM-') + '12'
  //   }, {
  //     title: 'Multi2',
  //     startDate: moment().format('YYYY-MM-') + '24',
  //     endDate: moment().add(4, 'months').format('YYYY-MM-') + '27'
  //   }
  // ];

  // clndr.multidayLong = $('#multiday-long').clndr({
  //   events: multidayLongArray,
  //   multiDayEvents: {
  //     endDate: 'endDate',
  //     startDate: 'startDate'
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log(target);
  //     }
  //   }
  // });

  // // Test constraints
  // // The 4th of this month to the 12th of next month
  // // =========================================================================
  // clndr.constraints = $('#constraints').clndr({
  //   constraints: {
  //     startDate: moment().format('YYYY-MM-') + '04',
  //     endDate: moment().add(1, 'months').format('YYYY-MM-12')
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       if ($(target.element).hasClass('inactive')) {
  //         console.log('You can\'t pick that date.');
  //       } else {
  //         console.log('You picked a valid date.');
  //       }
  //     }
  //   }
  // });

  // // Test constraints
  // // The 22nd of previous month to the 5th of next month
  // // =========================================================================
  // clndr.prevNextMonthConstraints = $('#prev-next-month-constraints').clndr({
  //   constraints: {
  //     endDate: moment().add(1, 'months').format('YYYY-MM-05'),
  //     startDate: moment().subtract(1, 'months').format('YYYY-MM-') + '22'
  //   }
  // });

  // // Test constraints
  // // The 2nd to the 5th of previous month
  // // =========================================================================
  // clndr.prevMonthConstraints = $('#prev-month-constraints').clndr({
  //   constraints: {
  //     endDate: moment().subtract(1, 'months').format('YYYY-MM-05'),
  //     startDate: moment().subtract(1, 'months').format('YYYY-MM-') + '02'
  //   }
  // });

  // // Test constraints
  // // The 22nd to the 25th of next month
  // // =========================================================================
  // clndr.nextMonthConstraints = $('#next-month-constraints').clndr({
  //   constraints: {
  //     endDate: moment().add(1, 'months').format('YYYY-MM-25'),
  //     startDate: moment().add(1, 'months').format('YYYY-MM-') + '22'
  //   }
  // });

  // // Test the start constraint by itself (4th of this month)
  // // =========================================================================
  // clndr.startConstraint = $('#start-constraint').clndr({
  //   constraints: {
  //     startDate: moment().format('YYYY-MM-') + '04'
  //   }
  // });

  // // Test the end constraint by itself (12th of next month)
  // // =========================================================================
  // clndr.endConstraint = $('#end-constraint').clndr({
  //   constraints: {
  //     endDate: moment().add(1, 'months').format('YYYY-MM-') + '12'
  //   }
  // });

  // // Test API
  // // You could do this with any instance but this makes for a nice reminder
  // // =========================================================================
  // clndr.api = $('#api').clndr({
  //   clickEvents: {
  //     onMonthChange: function (month) {
  //       console.log('onMonthChange was called.', month);
  //     },
  //     onYearChange: function (month) {
  //       console.log('onYearChange was called.', month);
  //     }
  //   }
  // });

  // // Test forceSixRows option
  // // =========================================================================
  // clndr.sixRows = $('#six-rows').clndr({
  //   forceSixRows: true
  // });

  // // Test options.classes
  // // =========================================================================
  // clndr.customClasses = $('#custom-classes').clndr({
  //   events: eventsArray,
  //   classes: {
  //     past: "my-past",
  //     today: "my-today",
  //     event: "my-event",
  //     inactive: "my-inactive",
  //     lastMonth: "my-last-month",
  //     nextMonth: "my-next-month",
  //     adjacentMonth: "my-adjacent-month"
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log(target);
  //     }
  //   }
  // });

  // // Test lengthOfTime.months option (three month views in one)
  // // =========================================================================
  // clndr.threeMonths = $('#three-months').clndr({
  //   template: $('#clndr-multimonth-template').html(),
  //   lengthOfTime: {
  //     months: 3,
  //     interval: 1,
  //     startDate: moment().subtract(1, 'months').startOf('month')
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log(target);
  //     },
  //     previousInterval: function (start, end) {
  //       console.log('previous interval:', start, end);
  //     },
  //     nextInterval: function (start, end) {
  //       console.log('next interval:', start, end);
  //     },
  //     onIntervalChange: function (start, end) {
  //       console.log('interval change:', start, end);
  //     }
  //   }
  // });

  // // Test lengthOfTime.months option (three month views in one)
  // // =========================================================================
  // clndr.threeMonthsWithEvents = $('#three-months-with-events').clndr({
  //   template: $('#clndr-multimonth-template').html(),
  //   events: multidayArray,
  //   lengthOfTime: {
  //     months: 3,
  //     interval: 1,
  //     startDate: moment().subtract(1, 'months').startOf('month')
  //   },
  //   multiDayEvents: {
  //     endDate: 'endDate',
  //     startDate: 'startDate'
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log(target);
  //     },
  //     previousInterval: function (start, end) {
  //       console.log('previous interval:', start, end);
  //     },
  //     nextInterval: function (start, end) {
  //       console.log('next interval:', start, end);
  //     },
  //     onIntervalChange: function (start, end) {
  //       console.log('interval change:', start, end);
  //     }
  //   }
  // });

  // // Test lengthOfTime.months option (three month views in one)
  // // =========================================================================
  // clndr.threeMonthsWithContraints = $('#three-months-with-constraints').clndr({
  //   template: $('#clndr-multimonth-template').html(),
  //   events: multidayArray,
  //   lengthOfTime: {
  //     months: 3,
  //     interval: 1,
  //     startDate: moment().subtract(1, 'months').startOf('month')
  //   },
  //   multiDayEvents: {
  //     endDate: 'endDate',
  //     startDate: 'startDate'
  //   },
  //   clickEvents: {
  //     click: function (target) {
  //       console.log(target);
  //     },
  //     previousInterval: function (start, end) {
  //       console.log('previous interval:', start, end);
  //     },
  //     nextInterval: function (start, end) {
  //       console.log('next interval:', start, end);
  //     },
  //     onIntervalChange: function (start, end) {
  //       console.log('interval change:', start, end);
  //     }
  //   },
  //   constraints: {
  //     endDate: moment().add(1, 'months').format('YYYY-MM-12'),
  //     startDate: moment().subtract(2, 'months').format('YYYY-MM-DD')
  //   }
  // });

  // // Test lengthOfTime.days option (14 days incremented by 7)
  // // =========================================================================
  // clndr.twoWeeks = $('#one-week').clndr({
  //   template: $('#clndr-oneweek-template').html(),
  //   lengthOfTime: {
  //     days: 14,
  //     interval: 7,
  //     startDate: moment().weekday(0)
  //   }
  // });

  // // Test lengthOfTime.days option (14 days incremented by 7)
  // // =========================================================================
  // clndr.twoWeeksWithConstraints = $('#one-week-with-constraints').clndr({
  //   template: $('#clndr-oneweek-template').html(),
  //   events: multidayArray,
  //   multiDayEvents: {
  //     endDate: 'endDate',
  //     startDate: 'startDate'
  //   },
  //   lengthOfTime: {
  //     days: 14,
  //     interval: 7,
  //     startDate: moment().weekday(0)
  //   },
  //   constraints: {
  //     startDate: moment().format('YYYY-MM-04'),
  //     endDate: moment().add(1, 'months').format('YYYY-MM-12')
  //   }
  // });

  // // Test lengthOfTime.days option with constraints (14 days incremented by 7)
  // // The 2nd to the 5th of previous month
  // // =========================================================================
  // clndr.twoWeeksWithPrevMonthConstraints = $('#one-week-with-prev-month-constraints').clndr({
  //   template: $('#clndr-oneweek-template').html(),
  //   lengthOfTime: {
  //     days: 14,
  //     interval: 7,
  //     startDate: moment().weekday(0)
  //   },
  //   constraints: {
  //     endDate: moment().subtract(1, 'months').format('YYYY-MM-05'),
  //     startDate: moment().subtract(1, 'months').format('YYYY-MM-02')
  //   }
  // });

  // // Test lengthOfTime.days option with constraints (14 days incremented by 7)
  // // The 22nd to the 25th of next month
  // // =========================================================================
  // clndr.twoWeeksWithNextMonthConstraints = $('#one-week-with-next-month-constraints').clndr({
  //   template: $('#clndr-oneweek-template').html(),
  //   lengthOfTime: {
  //     days: 14,
  //     interval: 7,
  //     startDate: moment().weekday(0)
  //   },
  //   constraints: {
  //     endDate: moment().add(1, 'months').format('YYYY-MM-25'),
  //     startDate: moment().add(1, 'months').format('YYYY-MM-22')
  //   }
  // });

  // // Test selectedDate option
  // // =========================================================================
  // clndr.selectedDate = $('#selected-date').clndr({
  //   trackSelectedDate: true,
  //   template: $('#clndr-template').html()
  // });

  // // Test selectedDate option with ignoreInactiveDaysInSelection
  // // =========================================================================
  // clndr.selectedDateIgnoreInactive = $('#selected-date-ignore-inactive').clndr({
  //   template: $('#clndr-template').html(),
  //   trackSelectedDate: true,
  //   ignoreInactiveDaysInSelection: true,
  //   constraints: {
  //     endDate: moment().add(1, 'months').format('YYYY-MM-12'),
  //     startDate: moment().subtract(1, 'months').format('YYYY-MM-DD')
  //   }
  // });

  // // Test weekOffset option
  // // =========================================================================
  // clndr.weekOffset = $('#week-offset').clndr({
  //   template: $('#clndr-oneweek-template').html(),
  //   weekOffset: 5,
  //   lengthOfTime: {
  //     days: 28,
  //     interval: 28,
  //     startDate: moment().day(5)
  //   }
  // });

  // // Test invalid weekOffset option
  // // =========================================================================
  // clndr.weekOffsetInvalid = $('#week-offset-invalid').clndr({
  //   template: $('#clndr-oneweek-template').html(),
  //   weekOffset: 7,
  //   lengthOfTime: {
  //     days: 28,
  //     interval: 28,
  //     startDate: moment().day(5)
  //   }
  // });

  // // Test selectedDate option with adjacentDaysChangeMonth
  // // =========================================================================
  // clndr.selectedDateAdjacentDays = $('#selected-date-adjacent-days').clndr({
  //   trackSelectedDate: true,
  //   showAdjacentMonths: true,
  //   adjacentDaysChangeMonth: true,
  //   template: $('#clndr-template').html()
  // });

  // // Test custom targets.day option with constraints (#330)
  // // =========================================================================
  // clndr.constraintsCustomDayTarget = $('#constraints-custom-day-target').clndr({
  //   targets: {
  //     day: 'my-day'
  //   },
  //   constraints: {
  //     startDate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
  //     endDate: moment().add(1, 'month').format('YYYY-MM-DD')
  //   },
  //   template: $('#clndr-template').html()
  // });

  // Test formatWeekdayHeader option (#342)
  // =========================================================================
  // clndr.formatWeekdayHeader = $('#format-weekday-header').clndr({
  //   formatWeekdayHeader: function (day) {
  //     return day.format('dddd');
  //   }
  // });
});
