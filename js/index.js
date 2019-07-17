"use strict";

var vm = new Vue({
  el: '#index',
  data: {
    datecontext: dayjs(),
    time: {
      min: "25",
      second: "10"
    },
    todos: [{
      completed: false,
      content: 'THE FIRST THING TO DO TODAY'
    }, {
      completed: false,
      content: 'THE SECOND THING TO DO TODAY'
    }, {
      completed: false,
      content: 'THE THIRD THING TO DO TODAY'
    }, {
      completed: false,
      content: 'THE FORTH THING TO DO TODAY'
    }],
    minZero: false,
    secZero: false,
    newMission: 'ADD A NEW MISSION',
    parse: false,
    once: true,
    bar: null
  },
  computed: {
    percentage: {
      get: function get() {
        console.log('computed getter');
        var min = parseInt(this.time.min);
        var sec = parseInt(this.time.second);
        return this.percentage = (min * 60 + sec) * 1000;
      },
      set: function set(value) {
        console.log('computed setter');
      }
    }
  },
  methods: {
    addNewMission: function addNewMission(mission) {
      this.todos.push({
        completed: false,
        content: mission
      });
      localStorage.setItem('todoList', JSON.stringify(this.todos));
      this.newMission = '';
    },
    timer: function timer() {
      var _this = this;

      if (!this.parse) {
        this.bar.animate(1.0); //bar_progrss

        var countdown = setInterval(function () {
          _this.datecontext = dayjs("2019-01-01T00:".concat(_this.time.min, ":").concat(_this.time.second)).subtract(1, "second");
          var secondsLeft = dayjs(_this.datecontext).format("mm-ss");
          var minsLeft = dayjs(_this.datecontext).format("mm");
          var secondLeft = dayjs(_this.datecontext).format("ss");

          if (secondsLeft === "00-00" || !_this.parse) {
            clearInterval(countdown);
            return; //exit_function
          }

          vm.time.min = minsLeft;
          vm.time.second = secondLeft;
          console.log(secondsLeft);
        }, 1000);
      } else {
        this.bar.stop();
      }
    },
    switchToFirst: function switchToFirst(index) {
      this.todos.completed = false;
      var temp = this.todos[index];
      this.todos.splice(index, 1);
      this.todos.unshift(temp);
      localStorage.setItem('todoList', JSON.stringify(this.todos));
    },
    initProgressBar: function initProgressBar() {
      var min = parseInt(this.time.min);
      var sec = parseInt(this.time.second);
      var percentage = (min * 60 + sec) * 1000;
      this.bar = new ProgressBar.Circle(progress_bar, {
        strokeWidth: 6,
        easing: 'linear',
        duration: percentage,
        color: '#FF4384',
        svgStyle: null
      });
    }
  },
  mounted: function mounted() {
    this.initProgressBar(); // this.progress();
    // console.log(JSON.parse(localStorage.getItem('todoList')))

    var store = localStorage.getItem('todoList');
    if (store) this.todos = JSON.parse(store); // } else {
    //   this.todos = [];
    // }
  }
});