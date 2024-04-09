<script>
import axios from 'axios';

export default {
    name: 'teamInfo',
    props: ['teamId'],
    data() {
        return {
            players: [],
            teamName: '',
            teamLoc: '',
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
                })
                .catch(error => {
                    console.error('Error fetching players:', error);
                });
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Players of {{ teamLoc }} {{ teamName }}
                    <span class="float-end">
                        <RouterLink class="btn btn-secondary" to="/teams">Go Back</RouterLink>
                    </span>
                    
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="header">Player Name</th>
                            <th class="header">Jersey</th>
                            <th class="header">Position</th>
                            <th class="header">Image</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.players.length > 0">
                        <tr v-for="(player, index) in this.players" :key="index">
                            <td class="cell">{{ player.player_name }}</td>
                            <td class="cell">{{ player.jersey_number }}</td>
                            <td class="cell">{{ player.position }}</td>
                            <td class="cell">{{ player.image }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="4" class="cell">TEAM HAS NO CURRENT PLAYERS</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    height: 100%;
}

.container {
    margin-top: 20px;
}

.header {
    text-align: center;
    background-color: rgb(255, 29, 29);
    font-weight: bold;
    color: white;
}

.cell {
    text-align: center;
}
</style>