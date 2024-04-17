<script>
import axios from 'axios'

export default {
    name: 'players',
    data() {
        return {
            players: [],
            currentPage: 1,
            totalPages: 0,
        }
    },
    mounted() {
        this.getPlayers();
    },
    methods: {
        getPlayers() {
            axios.get(`http://127.0.0.1:8000/api/admin/players/archive?page=${this.currentPage}`)
                .then(res => {
                    this.players = res.data.players.data;
                    this.totalPages = res.data.players.last_page;
                })
                .catch(err => console.error(err));
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getPlayers();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getPlayers();
            }
        },
        deletePlayer(playerId) {
            if (confirm('Are you sure? This record will be gone forever.')) {
                axios.delete(`http://127.0.0.1:8000/api/admin/players/${playerId}/hard_delete`).then(res => {
                    alert(res.data.message);

                    location.reload();
                })
                .catch(function (error) {
                    if (error.response) {

                        if(error.response.status == 404) {
                                alert(error.response.data.message);
                        }
                    }
            });
            }
        },
        restorePlayer(playerId) {
            if (confirm('Are you sure to restore this player?')) {
                axios.get(`http://127.0.0.1:8000/api/admin/players/${playerId}/archive`).then(res => {
                    alert(res.data.message);

                    location.reload();
                })
                .catch(function (error) {
                    if (error.response) {

                        if(error.response.status == 404) {
                                alert(error.response.data.message);
                        }
                    }
            });
            }
        }
    },
}
</script>

<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Archived Players
                    <span class="float-end">
                        <RouterLink class="btn btn-secondary" to="/players">Go Back</RouterLink>
                    </span>
                    
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="header">ID</th>
                            <th class="header">Name</th>
                            <th class="header">Team</th>
                            <th class="header">Jersey Number</th>
                            <th class="header">Position</th>
                            <th class="header">Image</th>
                            <th class="header">Deleted At</th>
                            <th class="header">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.players.length > 0">
                        <tr v-for="(player, index) in this.players" :key="index">
                            <td class="cell">{{ player.id }}</td>
                            <td class="cell">{{ player.player_name }}</td>
                            <td class="cell">{{ player.team }}</td>
                            <td class="cell">{{ player.jersey_number }}</td>
                            <td class="cell">{{ player.position }}</td>
                            <td class="cell">{{ player.image }}</td>
                            <td class="cell">{{ player.deleted_at }}</td>
                            <td class="cell">
                                <span class="restore">
                                <button type="button" class="btn btn-success"
                                    @click="restorePlayer(player.id)">Restore</button>
                                </span>
                                <button type="button" class="btn btn-danger"
                                    @click="deletePlayer(player.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="8" class="cell">NO RECORDS FOUND</td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination" v-if="this.players.length > 0">
                    <button class="paginationButton" @click="prevPage" :disabled="currentPage === 1"><i class="bi bi-chevron-left"></i></button>
                    <span>Page {{ currentPage }} of {{ totalPages }}</span>
                    <button class="paginationButton" @click="nextPage" :disabled="currentPage === totalPages"><i class="bi bi-chevron-right"></i></button>
                </div>
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

.restore {
    margin-right: 5px;
}

.paginationButton {
    border: none;
    background-color: white;
    margin-left: 10px;
    margin-right: 10px;
}

.paginationButton:not(:disabled):hover {
    border: none;
    background-color: white;
    color: red;
}
</style>