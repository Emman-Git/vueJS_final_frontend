<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Standings',
  data() {
    return {
      conference: '',
      standings: [],
      teams: [],
      errorMessage: '',
    };
  },
  mounted() {
    this.fetchStandings();
  },
  methods: {
    fetchStandings() {

      axios.get('http://127.0.0.1:8000/api/admin/teams/standings')
        .then(response => {
          this.standings = response.data.teamsByConference;
        })
        .catch(error => {
          console.error('Error fetching standings:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: this.errorMessage,
          });
        });
    }
  }
};
</script>

<template>
  <div class="whole">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h3>
            League Standings
            <span class="float-end">
              <RouterLink class="back-btn" to="/teams">Go Back</RouterLink>
            </span>
          </h3>
        </div>
        <div class="card-body">
          <div v-for="(teams, conference) in standings" :key="conference">
            <h4>{{ conference }}</h4>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th class="header" style="width: 10%;">Rank</th>
                  <th class="header" style="width: 20%;">Logo</th>
                  <th class="header" style="width: 40%;">Team</th>
                  <th class="header" style="width: 15%;">Wins</th>
                  <th class="header" style="width: 15%;">Losses</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(team, index) in teams" :key="index">
                  <td class="cell">{{ index + 1 }}</td>
                  <td class="cell">
                    <img :src="'http://127.0.0.1:8000/images/' + team.image" alt="" style="height:70px; width: 95px;"
                      class="rounded-3 shadow" v-if="team.image">
                  </td>
                  <td class="cell">{{ team.location }} {{ team.team_name }}</td>

                  <td class="cell">{{ team.wins }}</td>
                  <td class="cell">{{ team.losses }}</td>
                </tr>
              </tbody>
              <!-- <tbody v-else>
                <tr>
                  <td colspan="5" class="cell">NO TEAMS FOUND</td>
                </tr>
              </tbody> -->
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.whole {
  width: 100%;
  height: 90vh;
  background-color: rgb(37, 37, 37);
  display: flex;
  position: relative;
  overflow-y: auto;
}

.container {
  /* padding-bottom: 50px; */
}

.card {
  margin-top: 15px;
  /* margin-bottom: 30px; */
  border: 2px solid white;
}

.card-header {
  font-family: 'Poppins';
  background-color: rgb(53, 52, 52);
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}

.back-btn {
  background-color: whitesmoke;
  border: 2px solid black;
  border-radius: 10%;
  color: black;
  padding: 10px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: rgb(168, 168, 168);
}

.card-body {
  background-color: rgb(83, 83, 83);
  color: white;
  font-family: 'Poppins';
}

.table {
  border: 3px solid black;
  font-family: 'Poppins';
  margin-bottom: 30px;
}

.table td {
  background-color: whitesmoke;
  vertical-align: middle;
  font-size: 16px;
}

.header {
  text-align: center;
  background-color: #034AAD;
  font-weight: bold;
  color: white;
  font-size: 16px;
}

.cell {
  text-align: center;
  background-color: rgb(249, 249, 249);
}

.view-btn {
  background-color: #034AAD;
  border: none;
  border-radius: 8%;
  color: white;
  padding: 6px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.view-btn:hover {
  background-color: #1a64ca;
}
</style>