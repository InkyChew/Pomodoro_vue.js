var vm = new Vue({
  el: '#index',
  data: {
    datecontext: dayjs(),
    time:{
      min: 25,
      second: 0
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
    addNewMission (mission) {
      this.todos.push(
        {
          completed: false,
          content: mission
        }
      )
      this.newMission = '';
    },
    timer () {
      var vm = this
      const now = Date.now(); //-get_timeStamp
      const time = vm.time.min*60 + vm.time.second;
      const end = now + time*1000;
      // this.displayTimeLeft(time);

      countdown = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now())/1000);

        // console.log(secondsLeft)
        if (secondsLeft < 0 || !this.parse) {
          clearInterval(countdown);
          return; //exit_function
        }
        console.log(secondsLeft)
        this.displayTimeLeft(secondsLeft);

      }, 1000);
    },
    displayTimeLeft(seconds) {
      var vm = this;
      let remain_min = Math.floor(seconds/60);
      let remain_second = seconds % 60;

      vm.time.min = remain_min;
      vm.time.second = remain_second;
      
      if (remain_min < 10) {
        vm.minZero = true
      }else{
        vm.minZero = false
      }

      if (remain_second < 10) {
        vm.secZero = true
      }else{
        vm.secZero = false
      }
    },
    stopTimer() {

    },
    isZero() {
      var vm = this;
      if (vm.time.min < 10) {
        vm.minZero = true
      }
      if (vm.time.second < 10) {
        vm.secZero = true
      }
    },
    switchToFirst(index) {
      const temp = this.todos[index];
      this.todos[index] = this.todos[0];
      this.todos[0] = temp;
      console.log(this.todos[0]);
    }
  },
  mounted (){
    this.isZero();

    this.datecontext = dayjs(`2019-01-01T00:${'25'}:${'00'}`).subtract(1, "minute")
    const date = dayjs(this.datecontext).format("mm-ss")
    console.log(date)
  }
})