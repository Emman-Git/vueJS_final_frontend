<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    name: 'teamInfo',
    props: ['teamId'],
    data() {
        return {
            players: [],
            teamName: '',
            teamLoc: '',
            teamImage: '',
        };
    },
    mounted() {
        this.fetchPlayers();
    },
    methods: {
        fetchPlayers() {
            axios.get(`http://127.0.0.1:8000/api/admin/teams/${this.teamId}/info`)
                .then(res => {
                    console.log(res.data);
                    this.players = res.data.players;
                    this.teamLoc = res.data.team.location;
                    this.teamName = res.data.team.team_name;
                    this.teamImage = `url(http://127.0.0.1:8000/images/${res.data.team.image})`;
                })
                .catch(error => {
                    console.error('Error fetching players:', error);
                });
        },
    },
};
</script>

<template>
    <div class="whole">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h4>
                        Players of {{ teamLoc }} {{ teamName }}
                        <span class="float-end">
                            <RouterLink class="back-btn" to="/teams">Go Back</RouterLink>
                        </span>

                    </h4>
                </div>
                <div class="card-body">
                    <table class="table table-bordered" :style="{ backgroundImage: teamImage }">
                        <thead>
                            <tr>
                                <th class="header">Player Name</th>
                                <th class="header">Jersey</th>
                                <th class="header">Position</th>
                                <th class="header">Image</th>
                                <th class="header"></th>
                            </tr>
                        </thead>
                        <tbody v-if="this.players.length > 0">
                            <tr v-for="(player, index) in this.players" :key="index">
                                <td class="cell">{{ player.player_name }}</td>
                                <td class="cell">{{ player.jersey_number }}</td>
                                <td class="cell">{{ player.position }}</td>
                                <td class="cell"><img :src="'http://127.0.0.1:8000/images/' + player.image" alt=""
                                        style="height:110px; width: 140px;" class="rounded-3 shadow"
                                        v-if="player.image">
                                </td>
                                <td class="cell">
                                    <RouterLink :to="{ path: '/players/' + player.id + '/info' }">
                                        <button class="view-btn">Edit</button>
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="5" class="cell">TEAM HAS NO CURRENT PLAYERS</td>
                            </tr>
                        </tbody>
                    </table>
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
}

.table {
    border: 3px solid black;
    font-family: 'Poppins';
    /* background-image: url('/src/assets/marc.jpg'); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.table td {
    background-color: rgba(255, 255, 255, 0.88);
    vertical-align: middle;
    font-size: 18px;
    font-weight: 600;
}

.header {
    text-align: center;
    background-color: #034AAD;
    font-weight: 800;
    color: white;
    font-size: 18px;
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