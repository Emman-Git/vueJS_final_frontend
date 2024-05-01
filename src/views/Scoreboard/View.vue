<script>
import axios from 'axios';
import useSound from 'vue-use-sound';
import buzzer1Sfx from '../../assets/buzzer1.mp3';
import buzzer2Sfx from '../../assets/buzzer2.mp3';
import mpblSfx from '../../assets/mpbl.mp3';
import offenseSfx from '../../assets/offense.mp3';
import defenseSfx from '../../assets/defense.mp3';

export default {
  data() {
    return {
      team1: null,
      team2: null,
      quarterIndex: 0,
      quarters: ['GAME START', '1ST QTR', '2ND QTR', 'HALFTIME', '3RD QTR', '4TH QTR', 'GAME END'],
      endQtr: false,
      count1: 0,
      count2: 0,
      timer: '',
      duration: 30,
      isTimerRunning: false,
      shotClock: 24,
      endSC: false,
      intervalId: null,
      isShotClockRunning: false,
      shotclockAlert: false,
      shotclockMessage: "SHOTCLOCK VIOLATION",
      TOL1: 6,
      TOL2: 6,
      Fls1: 0,
      Fls2: 0,
      Penalty1Message: "BONUS",
      TO2AlertMessage: "BONUS",
      TO2Alert: false,
      showModal1: false,
      newPlayerName1: "",
      newPlayerNumber1: "",
      players1: [],
      showModal2: false,
      newPlayerName2: "",
      newPlayerNumber2: "",
      players2: [],
      teams: [],
    }
  },
  setup() {
    const [playBuzzer1, { stop: stopBuzzer }] = useSound(buzzer1Sfx);
    const [playBuzzer2] = useSound(buzzer2Sfx);
    const [playMPBL, { stop: stopMPBL }] = useSound(mpblSfx);
    const [playOffense, { stop: stopOffense }] = useSound(offenseSfx);
    const [playDefense, { stop: stopDefense }] = useSound(defenseSfx);

    return {
      playBuzzer1,
      playBuzzer2,
      stopBuzzer,
      playMPBL,
      stopMPBL,
      playOffense,
      stopOffense,
      playDefense,
      stopDefense,
    };


  },
  computed: {
    countdown() {
      let minutes = Math.floor(this.duration / 60);
      let seconds = this.duration % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
    previousQuarter() {
      let prevIndex = this.quarterIndex - 1;
      if (prevIndex < 0) {
        prevIndex = this.quarters.length - 1; // Loop back to the last item
      }
      return this.quarters[prevIndex];
    },
  },
  mounted() {
    this.isTimerRunning = false;
    this.fetchTeams();
  },
  watch: {
    team1(newTeamId) {
      if (newTeamId) {
        this.fetchPlayers1(newTeamId);
      }
    },
    team2(newTeamId) {
      if (newTeamId) {
        this.fetchPlayers2(newTeamId);
      }
    },
  },
  methods: {
    fetchTeams() {
      axios.get('http://127.0.0.1:8000/api/admin/allteams').then(res => {
        this.teams = res.data.teams
      });
    },
    fetchPlayers1(teamId) {
      axios.get(`http://127.0.0.1:8000/api/admin/teams/${teamId}/info`)
        .then(response => {
          this.players1 = response.data.players;
        })
        .catch(error => {
          console.error('Error fetching players:', error);
        });
    },
    fetchPlayers2(teamId) {
      axios.get(`http://127.0.0.1:8000/api/admin/teams/${teamId}/info`)
        .then(response => {
          this.players2 = response.data.players;
        })
        .catch(error => {
          console.error('Error fetching players:', error);
        });
    },
    startTimer() {
      if (!this.isTimerRunning) {
        this.isTimerRunning = true;
        this.timer = setInterval(() => {
          if (this.duration > 0) {
            this.duration--;
          } else {
            clearInterval(this.timer);
            this.isTimerRunning = false;
            this.playBuzzer1();
            this.resetTimer();
            this.resetShotClock();
            this.cycleQuarter();
            this.endQtr = true;
            this.resetFoul1();
            this.resetFoul2();
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
    addTime() {
      if (this.duration >= 15) {
        this.duration += 15;
      } else {
        this.duration = 0;
      }
    },
    subtractTime() {
      if (this.duration >= 15) {
        this.duration -= 15;
      } else {
        this.duration = 0;
      }
    },
    resetTimer() {
      this.duration = 30;
    },
    addToCounter1() {
      this.count1 = this.count1 + 1
    },
    twoptsCounter1() {
      this.count1 = this.count1 + 2
    },
    threeptsCounter1() {
      this.count1 = this.count1 + 3
    },
    addToCounter2() {
      this.count2 = this.count2 + 1
    },
    twoptsCounter2() {
      this.count2 = this.count2 + 2
    },
    threeptsCounter2() {
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
        this.TOL1 = this.TOL1 - 1;
        this.playBuzzer1();
      }
    },
    resetTimeout1() {
      this.TOL1 = 6
    },
    foul1() {
      if (this.Fls1 < 5) {
        this.Fls1 = this.Fls1 + 1
      }
    },
    resetFoul1() {
      this.Fls1 = 0
    },
    closePenaltyAlert1() {
      this.Penalty1 = false;
    },
    timeout2() {
      if (this.TOL2 > 0) {
        this.TOL2 = this.TOL2 - 1;
        this.playBuzzer1();
      }
    },
    resetTimeout2() {
      this.TOL2 = 6
    },
    foul2() {
      if (this.Fls2 < 5) {
        this.Fls2 = this.Fls2 + 1
      }
    },
    resetFoul2() {
      this.Fls2 = 0
    },
    closePenaltyAlert2() {
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
            this.playBuzzer1();
            this.isShotClockRunning = false;
            clearInterval(this.intervalId);
            this.pauseTimer();
            this.endSC = true;
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
      this.shotClock = 24;
      this.isShotClockRunning = false;
      clearInterval(this.intervalId);
    },
    switchShotClock() {
      this.shotClock = 24;
      this.isShotClockRunning = true;
    },
    closeShotclockAlert() {
      this.shotclockAlert = false;
    },
    cycleQuarter() {
      this.quarterIndex = (this.quarterIndex + 1) % this.quarters.length;
    },
    buzzer1Sound() {
      this.playBuzzer1();
    },
    buzzer2Sound() {
      this.playBuzzer2();
    },
    stopBuzzerSound() {
      this.stopBuzzer();
    },
    mpblSound() {
      this.playMPBL();
    },
    mpblStopSound() {
      this.stopMPBL();
    },
    offenseArenaSound() {
      this.playOffense();
    },
    defenseArenaSound() {
      this.playDefense();
    },
    offenseStop() {
      this.stopOffense();
    },
    defenseStop() {
      this.stopDefense();
    },
    selectedTeamName1() {
      const selectedTeam1 = this.teams.find(team => team.id === this.team1);
      if (selectedTeam1) {
        return `${selectedTeam1.location} ${selectedTeam1.team_name}`;
      } else {
        return 'Team 1';
      }
    },
    selectedTeamName2() {
      const selectedTeam2 = this.teams.find(team => team.id === this.team2);
      if (selectedTeam2) {
        return `${selectedTeam2.location} ${selectedTeam2.team_name}`;
      } else {
        return 'Team 2';
      }
    },
    resetStats1() {
      this.$refs.ptsInput1.forEach(input => input.value = 0);
      this.$refs.rebInput1.forEach(input => input.value = 0);
      this.$refs.astInput1.forEach(input => input.value = 0);
      this.$refs.flsInput1.forEach(input => input.value = 0);
    },
    resetStats2() {
      this.$refs.ptsInput2.forEach(input => input.value = 0);
      this.$refs.rebInput2.forEach(input => input.value = 0);
      this.$refs.astInput2.forEach(input => input.value = 0);
      this.$refs.flsInput2.forEach(input => input.value = 0);
    },
    closeendofQtr() {
      this.endQtr = false;
    },
    closeendSC() {
      this.endSC = false;
      this.resetShotClock();
    },
  }
};
</script>

<template>
  <div class="whole">
    <div v-if="endQtr" class="overlay1">
      <div class="endofQtr">
        <h1 @click="closeendofQtr()" class="endofQtrFont">END OF {{ previousQuarter }}</h1>
      </div>
    </div>
    <div v-if="endSC" class="overlay1">
      <div class="endSC">
        <h1 @click="closeendSC()" class="endofQtrFont">SHOTCLOCK VIOLATION</h1>
      </div>
    </div>
    <div class="container text-center">
      <img src="/src/assets/MPBL Logo Hori Final.png" alt="MPBL Logo" class="mpblLogo">
      <div class="scoreboard">
        <div class="row">
          <div class="col-4 text-start">
            <div class="row">
              <div class="team1">
                <div class="teamName1">
                  <h1>
                    <select v-model="team1" class="team1Dropdown">
                      <option value="null" disabled selected>Team 1</option>
                      <option v-for="team in teams" :key="team.id" :value="team.id">
                        {{ team.location }} {{ team.team_name }}
                      </option>
                    </select>
                  </h1>
                </div>
                <div class="score1">
                  <h1 class="scoreFont">
                    {{ count1 }}
                  </h1>
                </div>
                <div class="tol1">
                  <div class="row">
                    <div class="col-4 text-center">
                      <h3 :class="{ 'noTOL1': TOL1 === 0 }" style="color: white;">TOL : {{ TOL1 }} </h3>
                    </div>
                    <div class="col-4">
                      <div v-if="Fls2 == 5" class="penalty1">
                        {{ Penalty1Message }}
                      </div>
                    </div>
                    <div class="col-4 text-center">
                      <h3 :class="{ 'noTOL1': Fls1 === 5 }" style="color: white;">FLS : {{ Fls1 }} </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="controlPanel">
                <div class="score1Control">
                  <h6 style="color: white; font-family: 'Poppins';">Score Controls</h6>
                  <button @click="addToCounter1()" class="btn btn1-custom">+1</button>
                  <button @click="twoptsCounter1()" class="btn btn1-custom">+2</button>
                  <button @click="threeptsCounter1()" class="btn btn1-custom">+3</button>
                  <button @click="subtractToCounter1()" class="btn btn1-custom">-1</button>
                  <button @click="resetToCounter1()" class="btn btn1-custom">0</button>
                </div>
                <div class="TOL1Control">
                  <h6 style="color: white; font-family: 'Poppins';">Timeout Controls</h6>
                  <button @click="timeout1()" class="btn btn1-custom">-1</button>
                  <button @click="resetTimeout1()" class="btn btn1-custom">6</button>
                </div>
                <div class="Fls1Control">
                  <h6 style="color: white; font-family: 'Poppins';">Foul Controls</h6>
                  <button @click="foul1()" class="btn btn1-custom">+1</button>
                  <button @click="resetFoul1()" class="btn btn1-custom">0</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 text-center">
            <div class="row">
              <div class="centerBoard">
                <div class="row">
                  <div class="timer">
                    <h1 style="font-size: 110px;">{{ countdown }}</h1>
                  </div>
                </div>
                <div class="row">
                  <div class="period">
                    <div class="periodFont">
                      <p style="font-family: 'Alfa Slab One', sans-serif;"> <span class="pointer" @click="cycleQuarter">
                          {{ quarters[quarterIndex] }} </span></p>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="shotclock">
                    <h1 style="font-size: 80px;">{{ shotClock }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="centercontrolPanel">
                <div class="score1Control">
                  <h6 style="color: white; font-family: 'Poppins';">Timer Controls</h6>
                  <button @click="() => { addTime(); }" class="btn btn3-custom">+15</button>
                  <button @click="() => { startTimer(); }" class="btn btn3-custom"><i
                      class="bi bi-play-fill"></i></button>
                  <button @click="() => { pauseTimer(); pauseShotClock(); }" class="btn btn3-custom"><i
                      class="bi bi-pause-fill"></i></button>
                  <button @click="() => { pauseTimer(); resetTimer(); resetShotClock(); pauseShotClock(); }"
                    class="btn btn3-custom"><i class="bi bi-stop-fill"></i></button>
                  <button @click="() => { subtractTime(); }" class="btn btn3-custom">-15</button>
                </div>
                <div class="TOL1Control">
                  <h6 style="color: white; font-family: 'Poppins';">Shotclock Controls</h6>
                  <button @click="() => { startShotClock(); startTimer(); }" class="btn btn3-custom"><i
                      class="bi bi-play-fill"></i></button>
                  <button @click="switchShotClock()" class="btn btn3-custom"><i
                      class="bi bi-arrow-left-right"></i></button>
                  <button @click="resetShotClock()" class="btn btn3-custom"><i class="bi bi-stop-fill"></i></button>
                </div>
                <div class="Fls1Control">
                  <div class="row">
                    <div class="col-5">
                      <h6 style="color: white; font-family: 'Poppins';">Buzzer</h6>
                      <button @click="buzzer1Sound()" class="btn btn3-custom"><i
                          class="bi bi-volume-up-fill"></i></button>
                      <button @click="buzzer2Sound()" class="btn btn3-custom"><i
                          class="bi bi-volume-down-fill"></i></button>
                    </div>
                    <div class="col-2">
                      <h6 style="color: white; font-family: 'Poppins';">Mute</h6>
                      <button @click="() => { stopBuzzer(); offenseStop(); defenseStop(); mpblStopSound() }"
                        class="btn btn3-custom"><i class="bi bi-volume-mute-fill"></i></button>
                    </div>
                    <div class="col-5">
                      <h6 style="color: white; font-family: 'Poppins';">Music</h6>
                      <button @click="mpblSound()" class="btn btn3-custom"><i
                          class="bi bi-music-note-beamed"></i></button>
                      <button @click="offenseArenaSound()" class="btn btn3-custom">OF</button>
                      <button @click="defenseArenaSound()" class="btn btn3-custom">DF</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 text-end">
            <div class="row">
              <div class="team2">
                <div class="teamName1">
                  <h1>
                    <select v-model="team2" class="team1Dropdown">
                      <option value="null" disabled selected>Team 2</option>
                      <option v-for="team in teams" :key="team.id" :value="team.id">
                        {{ team.location }} {{ team.team_name }}
                      </option>
                    </select>
                  </h1>
                </div>
                <div class="score1">
                  <h1 class="scoreFont">
                    {{ count2 }}
                  </h1>
                </div>
                <div class="tol1">
                  <div class="row">
                    <div class="col-4 text-center">
                      <h3 :class="{ 'noTOL2': TOL2 === 0 }" style="color: white;">TOL : {{ TOL2 }} </h3>
                    </div>
                    <div class="col-4">
                      <div v-if="Fls1 == 5" class="penalty2">
                        {{ Penalty1Message }}
                      </div>
                    </div>
                    <div class="col-4 text-center">
                      <h3 :class="{ 'noTOL2': Fls2 === 5 }" style="color: white;">FLS : {{ Fls2 }} </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="controlPanel">
                <div class="score1Control">
                  <h6 style="color: white; font-family: 'Poppins';">Score Controls</h6>
                  <button @click="addToCounter2()" class="btn btn1-custom">+1</button>
                  <button @click="twoptsCounter2()" class="btn btn1-custom">+2</button>
                  <button @click="threeptsCounter2()" class="btn btn1-custom">+3</button>
                  <button @click="subtractToCounter2()" class="btn btn1-custom">-1</button>
                  <button @click="resetToCounter2()" class="btn btn1-custom">0</button>
                </div>
                <div class="TOL1Control">
                  <h6 style="color: white; font-family: 'Poppins';">Timeout Controls</h6>
                  <button @click="timeout2()" class="btn btn1-custom">-1</button>
                  <button @click="resetTimeout2()" class="btn btn1-custom">6</button>
                </div>
                <div class="Fls1Control">
                  <h6 style="color: white; font-family: 'Poppins';">Foul Controls</h6>
                  <button @click="foul2()" class="btn btn1-custom">+1</button>
                  <button @click="resetFoul2()" class="btn btn1-custom">0</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <div class="team1table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th colspan="6" style="background-color: #034AAD">{{ selectedTeamName1() }} </th>
                  </tr>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Player Name</th>
                    <th scope="col">Pts</th>
                    <th scope="col">Reb</th>
                    <th scope="col">Ast</th>
                    <th scope="col">Fls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in players1">
                    <td>{{ player.jersey_number }}</td>
                    <td>{{ player.player_name }}</td>
                    <td><input type="number" class="playerpts" ref="ptsInput1" value="0" min="0"></td>
                    <td><input type="number" class="playerpts" ref="rebInput1" value="0" min="0"></td>
                    <td><input type="number" class="playerpts" ref="astInput1" value="0" min="0"></td>
                    <td><input type="number" class="playerpts" ref="flsInput1" value="0" min="0" max="6"></td>
                  </tr>
                  <tr>
                    <td colspan="6" class="resetStats"><button class="btn2-custom" @click="resetStats1()">RESET</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col">
            <div class="team2table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th colspan="6" style="background-color: #FF0B01">{{ selectedTeamName2() }}</th>
                  </tr>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Player Name</th>
                    <th scope="col">Pts</th>
                    <th scope="col">Reb</th>
                    <th scope="col">Ast</th>
                    <th scope="col">Fls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in players2">
                    <td>{{ player.jersey_number }}</td>
                    <td>{{ player.player_name }}</td>
                    <td><input type="number" class="playerpts" ref="ptsInput2" value="0" min="0"></td>
                    <td><input type="number" class="playerpts" ref="rebInput2" value="0" min="0"></td>
                    <td><input type="number" class="playerpts" ref="astInput2" value="0" min="0"></td>
                    <td><input type="number" class="playerpts" ref="flsInput2" value="0" min="0" max="6"></td>
                  </tr>
                  <tr>
                    <td colspan="6" class="resetStats"><button class="btn2-custom" @click="resetStats2()">RESET</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.whole {
  width: 100%;
  height: 100%;
  background-color: rgb(37, 37, 37);
  display: flex;
  position: relative;
}

.container {
  /* height: 100vh; */
}

.mpblLogo {
  margin-top: 20px;
  max-width: 350px;
}

.scoreboard {
  margin-top: 60px;
}

.timer {
  color: red;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  margin-top: -20px;
  font-family: 'Chakra Petch', sans-serif;
}

.shotclock {
  color: red;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  margin-top: -10px;
  font-family: 'Chakra Petch', sans-serif;
}

.centerBoard {
  margin: auto;
  /* margin-top: 5px; */
  width: 95%;
  background-color: #1f1f1f;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 3px solid rgba(255, 0, 0, 0.712);
  border-radius: 5%;
}

.period {
  margin-top: -10px;
}

.periodFont {
  color: white;
  font-size: 45px;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
}

.overlay1 {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.356);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.shotclockAlert {
  padding: 10px;
  background-color: #fd1100;
  color: black;
  font-weight: bold;
  position: relative;
  border: black;
}

.endofQtr {
  position: fixed;
  top: 0;
  margin-top: 150px;
  background-color: #1f1f1f;
  padding: 20px;
  border: 3px solid rgba(255, 0, 0, 0.712);
  border-radius: 5%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -12px 40px, #fd1100 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  justify-content: center;
  align-items: center;
}

.endofQtrFont {
  cursor: pointer;
  font-size: 60px;
  color: white;
}

.endSC {
  position: fixed;
  top: 0;
  margin-top: 150px;
  background-color: #1f1f1f;
  padding: 20px;
  border: 3px solid rgba(255, 0, 0, 0.712);
  border-radius: 5%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -12px 40px, #fd1100 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  justify-content: center;
  align-items: center;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 10px;
  cursor: pointer;
}

.btn1-custom {
  background-color: rgb(53, 52, 52);
  color: white;
  margin-right: 5px;
  border: 2px solid rgb(37, 37, 37);
  font-size: 20px;
  width: 50px;
}


.btn1-custom:hover {
  background-color: rgb(63, 63, 63);
  color: rgb(255, 238, 0);
  border: 2px solid white;
  margin-right: 5px;
}

.btn2-custom {
  font-family: 'Poppins';
  background-color: rgb(53, 52, 52);
  color: white;
  margin-right: 5px;
  border: 2px solid rgb(37, 37, 37);
  font-size: 20px;
}


.btn2-custom:hover {
  background-color: rgb(63, 63, 63);
  color: red;
  border: 2px solid white;
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

.team1 {
  background-color: #034AAD;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 3px solid rgba(255, 255, 255, 0.712);
  border-radius: 1%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -12px 60px, #034AAD 0px -12px 60px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  /* margin-left: -200px;
  margin-right: 100px; */
}

.teamName1 {
  text-align: center;
  /* font-family: 'Poppins'; */
}

.team1Dropdown {
  text-align: center;
  background-color: #1f1f1f;
  color: white;
  border: 2px solid rgb(0, 0, 0);
  max-width: 100%
}

.team1Dropdown option {
  text-align: center;
}

.score1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.scoreFont {
  font-size: 140px;
  color: rgb(255, 238, 0);
  text-shadow: -4px -4px 0 black, 4px -4px 0 black, -4px 4px 0 black, 4px 4px 0 black;
  font-family: 'Alfa Slab One', sans-serif;
}

.noTOL1 {
  color: #FF0B01 !important;
}

.noTOL2 {
  color: black !important;
}

.penalty1 {
  padding: 5px;
  background-color: white;
  color: #034AAD;
  font-weight: 800;
  font-size: 25px;
  text-align: center;
}

.penalty2 {
  padding: 5px;
  background-color: white;
  color: #FF0B01;
  font-weight: 800;
  font-size: 25px;
  text-align: center;
}

.controlPanel {
  background-color: rgb(53, 52, 52);
  padding-top: 10px;
  padding-bottom: 10px;
  border: 4px solid rgb(37, 37, 37);
  border-radius: 8%;
  margin-top: 30px;
}

.centercontrolPanel {
  background-color: rgb(53, 52, 52);
  padding-top: 10px;
  padding-bottom: 10px;
  border: 4px solid rgb(37, 37, 37);
  border-radius: 8%;
  margin-top: 35px;
}

.score1Control {
  text-align: center;
}

.TOL1Control {
  text-align: center;
  margin-top: 15px;
}

.Fls1Control {
  text-align: center;
  margin-top: 15px;
}

.team2 {
  background-color: #FF0B01;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 3px solid rgba(255, 255, 255, 0.712);
  border-radius: 2%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px -12px 60px, #a50601 0px -12px 60px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  /* margin-left: -200px;
  margin-right: 100px; */
}

.team1table {}

.table {
  font-family: 'Poppins', sans-serif;
  border: 3px solid rgba(255, 255, 255, 0.712);
}

.table thead th {
  background-color: rgb(53, 52, 52);
  font-weight: 600;
  border: 2px solid black;
  color: white;
}

.table td {
  border: 2px solid black;
}

.team2table {}

.playerpts {
  width: 50px;
  text-align: center;
}

.resetStats {
  background-color: rgb(83, 83, 83);
}


.pointer {
  cursor: pointer;
}
</style>