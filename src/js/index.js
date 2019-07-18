var vm = new Vue({
  el: '#index',
  data: {
    datecontext: dayjs(),
    time:{
      min: "25",
      second: "10"
    },
    todos:
    [
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
    newMission: '',
    placeholder: '',
    parse: false,
    once: true,
    bar: null
  },
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
      }
    }
  },
  methods: {
    addNewMission (mission) {
      if (mission === '') {
        return
      }
      this.todos.push(
        {
          completed: false,
          content: mission
        }
      )
      localStorage.setItem('todoList', JSON.stringify(this.todos))
      this.newMission = '';      
    },
    timer () {

      if (!this.parse) {
        this.bar.animate(1.0); //bar_progrss

        var countdown = setInterval(() => {
          this.datecontext = dayjs(`2019-01-01T00:${this.time.min}:${this.time.second}`).subtract(1, "second")
          const secondsLeft = dayjs(this.datecontext).format("mm-ss")
          const minsLeft = dayjs(this.datecontext).format("mm")
          const secondLeft = dayjs(this.datecontext).format("ss")
  
          if (secondsLeft === "00-00" || !this.parse) {
            clearInterval(countdown);    
            return; //exit_function
          }
          vm.time.min = minsLeft;
          vm.time.second = secondLeft;  
          console.log(secondsLeft)    
        }, 1000);
      } else {
        this.bar.stop()
      }
    },
    switchToFirst(index) {
      this.todos.completed = false;
      const temp = this.todos[index];
      this.todos.splice(index, 1);
      this.todos.unshift(temp);
      localStorage.setItem('todoList', JSON.stringify(this.todos))
    },
    initProgressBar() {
      const min = parseInt(this.time.min);
      const sec = parseInt(this.time.second);
      const percentage = (min*60 + sec) * 1000;
      this.bar = new ProgressBar.Circle(progress_bar, {
        strokeWidth: 6,
        easing: 'linear',
        duration: percentage,
        color: '#FF4384',
        svgStyle: null,
      });
    },
    onfocus(event) {
      console.log(event)
      console.log(event.target.placeholder)
      this.placeholder = event.target.placeholder
      event.target.placeholder = ''
    },
    onblur(event) {
      event.target.placeholder = this.placeholder
    }
  },
  mounted (){
    this.initProgressBar();
    // this.progress();
    // console.log(JSON.parse(localStorage.getItem('todoList')))
    const store = localStorage.getItem('todoList');
    if (store) 
      this.todos = JSON.parse(store)
    // } else {
    //   this.todos = [];
    // }
  }
})