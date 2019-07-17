"use strict";

var vm = new Vue({
  el: '#index',
  data: {
    datecontext: dayjs(),
    time: {
      min: 25,
      second: 0
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
    parse: false
  },
  // computed: {
  //   switchToFirst(index) {
  //     const temp = this.todos[index];
  //     this.todos[index] = this.todos[0];
  //     this.todos[0] = temp;
  //   }
  // },
  methods: {
    addNewMission: function addNewMission(mission) {
      this.todos.push({
        completed: false,
        content: mission
      });
      this.newMission = '';
    },
    timer: function timer() {
      var _this = this;

      var vm = this;
      var now = Date.now(); //-get_timeStamp

      var time = vm.time.min * 60 + vm.time.second;
      var end = now + time * 1000; // this.displayTimeLeft(time);

      countdown = setInterval(function () {
        var secondsLeft = Math.round((end - Date.now()) / 1000); // console.log(secondsLeft)

        if (secondsLeft < 0 || !_this.parse) {
          clearInterval(countdown);
          return; //exit_function
        }

        console.log(secondsLeft);

        _this.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft: function displayTimeLeft(seconds) {
      var vm = this;
      var remain_min = Math.floor(seconds / 60);
      var remain_second = seconds % 60;
      vm.time.min = remain_min;
      vm.time.second = remain_second;

      if (remain_min < 10) {
        vm.minZero = true;
      } else {
        vm.minZero = false;
      }

      if (remain_second < 10) {
        vm.secZero = true;
      } else {
        vm.secZero = false;
      }
    },
    stopTimer: function stopTimer() {},
    isZero: function isZero() {
      var vm = this;

      if (vm.time.min < 10) {
        vm.minZero = true;
      }

      if (vm.time.second < 10) {
        vm.secZero = true;
      }
    },
    switchToFirst: function switchToFirst(index) {
      var temp = this.todos[index];
      this.todos[index] = this.todos[0];
      this.todos[0] = temp;
      console.log(this.todos[0]);
    }
  },
  mounted: function mounted() {
    this.isZero();
    this.datecontext = dayjs("2019-01-01T00:".concat('25', ":", '00')).subtract(1, "minute");
    var date = dayjs(this.datecontext).format("mm-ss");
    console.log(date);
  }
});