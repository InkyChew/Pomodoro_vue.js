"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var vm = new Vue({
  el: '#index',
  data: {
    datecontext: dayjs(),
    time: {
      min: "10",
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
    percentage: 0
  },
  store: new Vuex.Store({
    state: {
      todos: {
        completed: false,
        content: ''
      }
    },
    getters: {
      getToDos: function getToDos(state) {
        return state.todos;
      }
    },
    actions: {
      setToDos: function setToDos(_ref, data) {
        var commit = _ref.commit;
        commit("TODOS", data);
      }
    },
    mutations: _defineProperty({}, "TODOS", function TODOS(state, data) {
      state.todos = _objectSpread({}, data);
    })
  }),
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
        this.firstName = value.split(' ')[0];
        this.lastName = value.split(' ')[1];
      }
    }
  },
  methods: {
    addNewMission: function addNewMission(mission) {
      this.todos.push({
        completed: false,
        content: mission
      });
      this.newMission = '';
      this.$setToDos({
        completed: false,
        content: mission
      });
    },
    timer: function timer() {
      var _this = this;

      if (this.once) {
        this.once = false;
        this.progress();
      }

      if (!this.parse) {
        countdown = setInterval(function () {
          _this.datecontext = dayjs("2019-01-01T00:".concat(_this.time.min, ":").concat(_this.time.second)).subtract(1, "second");
          var secondsLeft = dayjs(_this.datecontext).format("mm-ss");
          var minsLeft = dayjs(_this.datecontext).format("mm");
          var secondLeft = dayjs(_this.datecontext).format("ss");

          if (secondsLeft === "00-00" || !_this.parse) {
            clearInterval(countdown);
            vm.time.min = minsLeft;
            vm.time.second = secondLeft;
            return; //exit_function
          }

          vm.time.min = minsLeft;
          vm.time.second = secondLeft;
          console.log(secondsLeft);
        }, 1000);
      }
    },
    switchToFirst: function switchToFirst(index) {
      this.todos.completed = false;
      var temp = this.todos[index];
      this.todos.splice(index, 1);
      this.todos.unshift(temp);
      this.$setToDos(todos);
    },
    progress: function progress() {
      var min = parseInt(this.time.min);
      var sec = parseInt(this.time.second);
      var percentage = (min * 60 + sec) * 1000; // console.log(this.percentage);

      var bar = new ProgressBar.Circle(progress_bar, {
        strokeWidth: 6,
        easing: 'linear',
        duration: percentage,
        color: '#FF4384',
        svgStyle: null,
        step: function step() {
          if (this.parse) {
            bar.stop();
          }
        }
      });
      bar.animate(1.0); // Number from 0.0 to 1.
    }
  },
  mounted: function mounted() {// this.progress();
    // console.log(Date.parse(this.datecontext))
    // this.isZero();
  },
  updated: function updated() {},
  created: function created() {
    Vue.prototype.$setToDos = function (data) {
      this.$store.dispatch("setToDos", data);
    };
  }
});