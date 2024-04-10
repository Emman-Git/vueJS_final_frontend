<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      team1: null,
      team2: null,
      count1: 0,
      count2: 0,
      timer: '',
      duration: 30,
      isTimerRunning: false,
      shotClock: 5,
      intervalId: null,
      isShotClockRunning: false,
      shotclockAlert: false,
      shotclockMessage: "SHOTCLOCK VIOLATION",
      TOL1: 5,
      TOL2: 5,
      TO1Alert: false,
      TO1AlertMessage: "No Timeouts Left",
      TO2AlertMessage: "No Timeouts Left",
      TO2Alert: false,
      showModal1: false,
      newPlayerName1: "",
      newPlayerNumber1: "",
      players1: [],
      showModal2: false,
      newPlayerName2: "",
      newPlayerNumber2: "",
      players2: []
    }
  },
  computed: {
    countdown() {
      let minutes = Math.floor(this.duration / 60);
      let seconds = this.duration % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },
  mounted() {
    this.isTimerRunning = false;
  },
  methods: {
    startTimer() {
      if (!this.isTimerRunning) {
        this.isTimerRunning = true;
        this.timer = setInterval(() => {
          if (this.duration > 0) {
            this.duration--;
          } else {
            clearInterval(this.timer);
            this.isTimerRunning = false;
            alert('End of Quarter');
            this.duration = 30;
            this.shotClock = 5;
          }
        }, 1000);
      }
    },
    pauseTimer() {
      if (this.isTimerRunning) {
        this.isTimerRunning = false;
        clearInterval(this.timer);
      }
    },
    resetTimer() {
      this.duration = 30;
    },
    addToCounter1() {
      this.count1 = this.count1 + 1
    },
    twoPtsCounter1() {
      this.count1 = this.count1 + 2
    },
    threePtsCounter1() {
      this.count1 = this.count1 + 3
    },
    addToCounter2() {
      this.count2 = this.count2 + 1
    },
    twoPtsCounter2() {
      this.count2 = this.count2 + 2
    },
    threePtsCounter2() {
      this.count2 = this.count2 + 3
    },
    subtractToCounter1() {
      if (this.count1 > 0) {
        this.count1 = this.count1 - 1
      }
    },
    subtractToCounter2() {
      if (this.count2 > 0) {
        this.count2 = this.count2 - 1
      }
    },
    resetToCounter1() {
      this.count1 = 0
    },
    resetToCounter2() {
      this.count2 = 0
    },
    editTeam1(team1) {
      this.team1
    },
    timeout1() {
      if (this.TOL1 > 0) {
        this.TOL1 = this.TOL1 - 1
      } else {
        this.TO1Alert = true;
      }
    },
    resetTimeout1() {
      this.TOL1 = 5
    },
    closeTOLAlert1() {
      this.TO1Alert = false;
    },
    timeout2() {
      if (this.TOL2 > 0) {
        this.TOL2 = this.TOL2 - 1
      } else {
        this.TO2Alert = true;
      }
    },
    resetTimeout2() {
      this.TOL2 = 5
    },
    closeTOLAlert2() {
      this.TO2Alert = false;
    },
    startShotClock() {
      if (!this.isShotClockRunning) {
        this.isShotClockRunning = true;
        this.intervalId = setInterval(() => {
          if (this.shotClock > 0) {
            this.shotClock--;
          } else { 
            this.shotclockAlert = true;
            this.isShotClockRunning = false;
            clearInterval(this.intervalId);
            this.pauseTimer();
          }
        }, 1000);
      }
    },
    pauseShotClock() {
      if (this.isShotClockRunning) {
        this.isShotClockRunning = false;
        clearInterval(this.intervalId);
      }
    },
    resetShotClock() {
      this.shotClock = 5;
      this.isShotClockRunning = false;
      clearInterval(this.intervalId);
    },
    switchShotClock() {
      this.shotClock = 5;
      this.isShotClockRunning = true;
    },
    closeShotclockAlert() {
      this.shotclockAlert = false;
    },
    addPlayer1() {
      if (!this.newPlayerName1 && !this.newPlayerNumber1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Player Info is Missing",
          footer: "Please input the player's full name and jersey number."
        });
      } else if (!this.newPlayerNumber1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Player Number is Missing",
          footer: "Please input the player's jersey number."
        });
      } else if (!this.newPlayerName1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Player Name is Missing",
          footer: "Please input the player's full name."
        });
      } else {
        this.players1.push({
          id: Math.floor(Math.random() * 1000000),
          name: this.newPlayerName1,
          number: this.newPlayerNumber1,
        });
        this.newPlayerName1 = "";
        this.newPlayerNumber1 = "";
        this.showModal1 = false;
        Swal.fire({
          title: "Success!",
          text: "Player is added to Team 1",
          icon: "success"
        });
      }
    },
    cancelPlayer1() {
      this.newPlayerName1 = "";
      this.newPlayerNumber1 = "";
      this.showModal1 = false;
    },
    addPlayer2() {
      if (!this.newPlayerName2 && !this.newPlayerNumber2) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Player Info is Missing",
          footer: "Please input the player's full name and jersey number."
        });
      } else if (!this.newPlayerNumber2) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Player Number is Missing",
          footer: "Please input the player's jersey number."
        });
      } else if (!this.newPlayerName2) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Player Name is Missing",
          footer: "Please input the player's full name."
        });
      } else {
        this.players2.push({
          id: Math.floor(Math.random() * 1000000),
          name: this.newPlayerName2,
          number: this.newPlayerNumber2,
        });
        this.newPlayerName2 = "";
        this.newPlayerNumber2 = "";
        this.showModal2 = false;
        Swal.fire({
          title: "Success!",
          text: "Player is added to Team 2",
          icon: "success"
        });
      }
    },
    cancelPlayer2() {
      this.newPlayerName2 = "";
      this.newPlayerNumber2 = "";
      this.showModal2 = false;
    },
    removePlayer1(player) {
      Swal.fire({
        title: "Remove Player",
        text: "Are you sure you want to remove this player?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(255, 72, 0)",
        cancelButtonColor: "rgb(83, 83, 83)",
        confirmButtonText: "Yes, remove player"
      }).then((result) => {
        if (result.isConfirmed) {
          this.players1 = this.players1.filter(p => p !== player);
          Swal.fire({
            title: "Removed!",
            text: "Player has been successfully removed.",
            icon: "success"
          });
        }
      });
    },
    removePlayer2(player) {
      Swal.fire({
        title: "Remove Player",
        text: "Are you sure you want to remove this player?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(39, 140, 255)",
        cancelButtonColor: "rgb(83, 83, 83)",
        confirmButtonText: "Yes, remove player"
      }).then((result) => {
        if (result.isConfirmed) {
          this.players2 = this.players2.filter(p => p !== player);
          Swal.fire({
            title: "Removed!",
            text: "Player has been successfully removed.",
            icon: "success"
          });
        }
      });
    },
}};
</script>


<template>
  <main>
    <div class="overlay1" v-if="showModal1">
      <div class="modal1">
        <label for="newPlayerName1" style="font-weight: bolder;">Player Name:</label>
        <input type="text" v-model="newPlayerName1" :style="{ height: '40px' }">
        <label for="newPlayerNumber1" style="margin-top: 20px; font-weight: bolder;">Player Number:</label>
        <input type="number" v-model="newPlayerNumber1" min="0" :style="{ height: '40px' }">
        <button @click="addPlayer1()">Add Player</button>
        <button class="klus" @click="cancelPlayer1()">Cancel</button>
      </div>
    </div>
    <div class="overlay2" v-if="showModal2">
      <div class="modal2">
        <label for="newPlayerName2" style="font-weight: bolder;">Player Name:</label>
        <input type="text" v-model="newPlayerName2" :style="{ height: '40px' }">
        <label for="newPlayerNumber2" style="margin-top: 20px; font-weight: bolder;">Player Number:</label>
        <input type="number" v-model="newPlayerNumber2" min="0" :style="{ height: '40px' }">
        <button @click="addPlayer2()">Add Player</button>
        <button class="klus" @click="cancelPlayer2()">Cancel</button>
      </div>
    </div>
    <div class="container">


      <div class="row">
        <div class="col text-center">
          <div class="kutsManny">
            <p>KUTS MANNY BASKITBOL LEAGUE</p>
          </div>
          <div v-if="shotclockAlert" class="shotclockAlert">
            {{ shotclockMessage }}
            <span class="close" @click="() => {closeShotclockAlert(); resetShotClock();}">&times;</span>
          </div>
          <div class="shotclock">
            <h1 style="font-size: 100px;">{{ countdown }}</h1>
            <button @click="() => {startTimer();}" class="btn btn3-custom"><i class="bi bi-play-fill"></i></button>
            <button @click="() => {pauseTimer(); pauseShotClock();}" class="btn btn3-custom"><i class="bi bi-pause-fill"></i></button>
            <button @click="() => {pauseTimer(); resetTimer(); resetShotClock(); pauseShotClock();}" class="btn btn3-custom"><i class="bi bi-stop-fill"></i></button>
          </div>
          <div class="shotclock">
            <!-- <div class="shotclockbg"> -->
            <h1 style="font-size: 80px;">{{ shotClock }}</h1>
            <button @click="() => {startShotClock(); startTimer();}" class="btn btn3-custom"><i class="bi bi-play-fill"></i></button>
            <!-- <button @click="pauseShotClock()" class="btn btn3-custom"><i class="bi bi-pause-fill"></i></button> -->
            <button @click="switchShotClock()" class="btn btn3-custom">Switch</button>
            <button @click="resetShotClock()" class="btn btn3-custom">Reset</button>
            <!-- </div> -->
          </div>
        </div>
      </div>




      <div class="row">
        <div class="col text-center">
          <div class="team1">
            <h4>
              <input v-model="team1" placeholder="Team 1" class="text-center p-1">
            </h4>
            <h1
              style="font-size: 100px; text-shadow: -2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, 2px 2px 0 #ffffff;">
              {{ count1 }}</h1>
            <button @click="addToCounter1()" class="btn btn1-custom">1pt</button>
            <button @click="twoPtsCounter1()" class="btn btn1-custom">2pts</button>
            <button @click="threePtsCounter1()" class="btn btn1-custom">3pts</button>
            <button @click="resetToCounter1()" class="btn btn1-custom">RESET</button>
            <div class="lowerSection">
              <h5>Timeouts Remaining: {{ TOL1 }} </h5>
              <button @click="timeout1()" class="mx-2">-</button>
              <button @click="resetTimeout1()">RESET</button>
              <div v-if="TO1Alert" class="TOLAlert">
                {{ TO1AlertMessage }}
                <span class="close" @click="closeTOLAlert1">&times;</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col text-center">
          <div class="team2">
            <h4>
              <input v-model="team2" placeholder="Team 2" class="text-center p-1">
            </h4>
            <h1
              style="font-size: 100px; text-shadow: -2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, 2px 2px 0 #ffffff;">
              {{ count2 }}</h1>
            <button @click="addToCounter2()" class="btn btn1-custom">1pt</button>
            <button @click="twoPtsCounter2()" class="btn btn1-custom">2pts</button>
            <button @click="threePtsCounter2()" class="btn btn1-custom">3pts</button>
            <button @click="resetToCounter2()" class="btn btn1-custom">RESET</button>
            <div class="lowerSection">
              <h5>Timeouts Remaining: {{ TOL2 }} </h5>
              <button @click="timeout2()" class="mx-2">-</button>
              <button @click="resetTimeout2()">RESET</button>
              <div v-if="TO2Alert" class="TOLAlert">
                {{ TO2AlertMessage }}
                <span class="close" @click="closeTOLAlert2">&times;</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col text-center">
          <button class="btn addPlayer" @click="showModal1 = true">Add Player <i class="bi bi-plus-circle-dotted"></i></button>
          <div class="team1table">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Pts</th>
                  <th scope="col">Fls</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="player in players1">
                  <th scope="row">{{ player.number }}</th>
                  <td>{{ player.name }}</td>
                  <td><input type="number" class="playerpts" value="0" min="0"></td>
                  <td><input type="number" class="playerfls" value="0" min="0" max="6"></td>
                  <td><button @click="removePlayer1(player)" class="btn trash"><i class="bi bi-trash3"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        <div class="col text-center">
          <button class="btn addPlayer" @click="showModal2 = true">Add Player <i class="bi bi-plus-circle-dotted"></i></button>
          <div class="team2table">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Pts</th>
                  <th scope="col">Fls</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="player in players2">
                  <th scope="row">{{ player.number }}</th>
                  <td>{{ player.name }}</td>
                  <td><input type="number" class="playerpts" value="0" min="0"></td>
                  <td><input type="number" class="playerfls" value="0" min="0" max="6"></td>
                  <td><button @click="removePlayer2(player)" class="btn trash"><i class="bi bi-trash3"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  </main>
</template>


<style scoped>
main {
  background-image: url("./assets/mpbg4.jpg");
  background-repeat: no-repeat;
  background: cover;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}


.shotclock {
  color: red;
  padding-bottom: 20px;
  text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000;
}


.kutsManny {
  color: cornsilk;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 50px;
  text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000;
}


.shotclockAlert {
  padding: 10px;
  background-color: #fd1100;
  color: black;
  font-weight: bold;
  position: relative;
  border: black;
}


.TOLAlert {
  padding: 10px;
  background-color: #ff4336;
  color: black;
  font-weight: bold;
  position: relative;
  margin-top: 5px;
}


.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  cursor: pointer;
}


.team1 {
  background-color: rgb(255, 72, 0);
  padding-top: 30px;
  padding-bottom: 20px;
  border: 3px solid rgba(255, 255, 255, 0.712);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}


.lowerSection {
  margin-top: 30px;
}


.team2 {
  background-color: rgb(39, 140, 255);
  padding-top: 30px;
  padding-bottom: 20px;
  border: 3px solid rgba(255, 255, 255, 0.712);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}


.btn1-custom {
  background-color: rgb(83, 83, 83);
  color: #ffffff;
  margin-right: 5px;
  border: 2px solid rgba(0, 0, 0, 0.24);
  font-size: 20px;
}


.btn1-custom:hover {
  background-color: rgb(63, 63, 63);
  color: white;
  border: 2px solid rgba(0, 0, 0, 0.24);
  margin-right: 5px;
}


.btn3-custom {
  background-color: rgb(83, 83, 83);
  color: #ffffff;
  margin-right: 5px;
}


.btn3-custom:hover {
  background-color: rgb(59, 59, 59);
  color: #ffffff;
  margin-right: 5px;
}


.trash {
  color: red;
}


/* .team1table {
 
}
.team2table {
 
} */
.addPlayer {
  margin-top: 10px;
  width: 100%;
  background-color: rgb(83, 83, 83);
  color: white;
  font-weight: bolder;
  border: 1px solid black;
  border-radius: 0%;
}


.addPlayer:hover {
  margin-top: 10px;
  width: 100%;
  background-color: rgb(54, 54, 54);
  color: white;
  font-weight: bolder;
  border: 1px solid black;
  border-radius: 0%;
}


.overlay1 {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 91, 25, 0.438);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}


.modal1 {
  width: 40%;
  height: 40%;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}


.modal1 button {
  padding: 10px 20px;
  font-size: 20px;
  width: 100%;
  background-color: rgb(255, 72, 0);
  border: none;
  color: rgb(255, 255, 255);
  cursor: pointer;
  margin-top: 40px;
}


.modal1 .klus {
  background-color: rgb(102, 102, 102);
  margin-top: 8px;
}


.overlay2 {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(39, 140, 255, 0.555);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}


.modal2 {
  width: 40%;
  height: 40%;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}


.modal2 button {
  padding: 10px 20px;
  font-size: 20px;
  width: 100%;
  background-color: rgb(39, 140, 255);
  border: none;
  color: rgb(255, 255, 255);
  cursor: pointer;
  margin-top: 40px;
}


.modal2 .klus {
  background-color: rgb(102, 102, 102);
  margin-top: 8px;
}


.playerpts {
  width: 50px;
}


.playerfls {
  width: 50px;
}


.pointer {
  cursor: pointer;
}
</style>