var vm = new Vue({
  el: '#index',
  data: {
    datecontext: dayjs(),
    time:{
      min: "10",
      second: "10"
    },
    todos: [
      {
        completed: false,
        content: 'THE FIRST THING TO DO TODAY',
      },
      {
        completed: false,
        content: 'THE SECOND THING TO DO TODAY',
      },
      {
        completed: false,
        content: 'THE THIRD THING TO DO TODAY',
      },
      {
        completed: false,
        content: 'THE FORTH THING TO DO TODAY',
      }
    ],
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
      getToDos: state => state.todos
    },
    actions: {
      setToDos({ commit }, data) {
        commit("TODOS", data)
      }
    },
    mutations: {
      ["TODOS"](state, data) {
        state.todos = {
          ...data
        };
      }
    }
  }),
  computed: {
    percentage: {
      get () {
          console.log('computed getter')
          var min = parseInt(this.time.min);
          var sec = parseInt(this.time.second);
          return this.percentage = (min*60 + sec) * 1000;
      },
      set (value) {
          console.log('computed setter')
          this.firstName = value.split(' ')[0]
          this.lastName = value.split(' ')[1]
      }
    }
  },
  methods: {
    addNewMission (mission) {
      this.todos.push(
        {
          completed: false,
          content: mission
        }
      )
      this.newMission = '';
      this.$setToDos({
        completed: false,
        content: mission
      });
    },
    timer () {
      if (this.once) {
        this.once = false;
        this.progress();
      }
      if (!this.parse) {
        countdown = setInterval(() => {
          this.datecontext = dayjs(`2019-01-01T00:${this.time.min}:${this.time.second}`).subtract(1, "second")
          const secondsLeft = dayjs(this.datecontext).format("mm-ss")
          const minsLeft = dayjs(this.datecontext).format("mm")
          const secondLeft = dayjs(this.datecontext).format("ss")
  
          if (secondsLeft === "00-00" || !this.parse) {
            clearInterval(countdown);
            vm.time.min = minsLeft;
            vm.time.second = secondLeft;        
            return; //exit_function
          }
          vm.time.min = minsLeft;
          vm.time.second = secondLeft;  
          console.log(secondsLeft)    
        }, 1000);
      }
    },
    switchToFirst(index) {
      this.todos.completed = false;
      const temp = this.todos[index];
      this.todos.splice(index, 1);
      this.todos.unshift(temp);
      this.$setToDos(todos);
    },
    progress () {
      const min = parseInt(this.time.min);
      const sec = parseInt(this.time.second);
      const percentage = (min*60 + sec) * 1000;
      // console.log(this.percentage);
      var bar = new ProgressBar.Circle(progress_bar, {
        strokeWidth: 6,
        easing: 'linear',
        duration: percentage,
        color: '#FF4384',
        svgStyle: null,
        step: function() {
          if (this.parse) {
            bar.stop()
          }
        }
      });      
      bar.animate(1.0);  // Number from 0.0 to 1.
    }
  },
  mounted (){
    // this.progress();
    // console.log(Date.parse(this.datecontext))
    // this.isZero();
  },
  updated () {

  },
  created () {
    Vue.prototype.$setToDos = function(data) {
      this.$store.dispatch("setToDos", data);
    };
  }
})