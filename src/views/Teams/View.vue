<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'teams',
    data() {
        return {
            teams: [],
            currentPage: 1,
            totalPages: 0,
            searchQuery: '',
        }
    },
    mounted() {
        this.getTeams();
    },
    methods: {
        getTeams() {
            axios.get(`http://127.0.0.1:8000/api/admin/teams?page=${this.currentPage}&search=${this.searchQuery}`)
                .then(res => {
                    this.teams = res.data.teams.data;
                    this.totalPages = res.data.teams.last_page;
                })
                .catch(err => console.error(err));
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getTeams();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getTeams();
            }
        },
        deleteTeam(teamId) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Proceeding will add this team to the archive",
                icon: 'warning',
                iconColor: '#d81b0d',
                showCancelButton: true,
                confirmButtonColor: '#d81b0d',
                cancelButtonColor: 'rgb(63, 62, 62)',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/admin/teams/${teamId}/delete`).then(res => {
                        Swal.fire({
                            title: 'Archived!',
                            text: res.data.message,
                            icon: 'success',
                            iconColor: '#034AAD',
                            confirmButtonColor: '#034AAD',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            location.reload();
                        });
                    }).catch(error => {
                        if (error.response) {
                            if (error.response.status == 404) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: error.response.data.message,
                                });
                            }
                        }
                    });
                }
            });
        },
    },
}
</script>

<template>
    <div class="whole">
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h4>
                        All Teams
                        <span class="float-end">
                            <RouterLink class="archive" to="/teams/archive">Archive</RouterLink>
                            <RouterLink class="add-btn" to="/teams/create">Add Team</RouterLink>
                        </span>
                    </h4>
                    <input type="text" v-model="searchQuery" placeholder="Search..." @input="getTeams"
                        class="searchBox">
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="header">ID</th>
                                <th class="header">Team Name</th>
                                <th class="header">Location</th>
                                <th class="header">Conference</th>
                                <th class="header">Logo</th>
                                <th class="header">Created At</th>
                                <th class="header">Players</th>
                                <th class="header">Action</th>
                                <!-- <th class="header">W</th>
                                <th class="header">L</th> -->
                            </tr>
                        </thead>
                        <tbody v-if="this.teams.length > 0">
                            <tr v-for="(team, index) in this.teams" :key="index">
                                <td class="cell">{{ team.id }}</td>
                                <td class="cell">{{ team.team_name }}</td>
                                <td class="cell">{{ team.location }}</td>
                                <td class="cell">{{ team.conference }}</td>
                                <td class="cell"><img :src="'http://127.0.0.1:8000/images/' + team.image" alt=""
                                        style="height:105px; width: 135px;" class="rounded-3 shadow" v-if="team.image">
                                </td>
                                <td class="cell">{{ team.created_at }}</td>
                                <td class="cell">
                                    <RouterLink :to="{ path: '/teams/' + team.id + '/info' }"><button class="view-btn">View</button>
                                    </RouterLink>
                                </td>
                                <td class="cell">
                                    <span class="edit">
                                        <RouterLink :to="{ path: '/teams/' + team.id + '/edit' }" class="edit-btn">
                                            Edit
                                        </RouterLink>
                                    </span>
                                    <button type="button" class="trash-btn" @click="deleteTeam(team.id)">Trash</button>
                                </td>
                                <!-- <td class="cell">{{ team.wins }}</td>
                                <td class="cell">{{ team.losses }}</td> -->
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="8" class="cell">NO TEAMS FOUND</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination float-end" v-if="this.teams.length > 0">
                        <button class="paginationButton" @click="prevPage" :disabled="currentPage === 1"><i
                                class="bi bi-chevron-left"></i></button>
                        <span style="color: white; font-family: 'Poppins'; font-size: 18px;">Page {{ currentPage }} of
                            {{ totalPages }}</span>
                        <button class="paginationButton" @click="nextPage" :disabled="currentPage === totalPages"><i
                                class="bi bi-chevron-right"></i></button>
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

.searchBox {
    padding: 3px 10px;
    font-size: 16px;
    border: 2px solid black;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
}

.add-btn {
    background-color: #034AAD;
    border: 2px solid white;
    border-radius: 10%;
    color: white;
    padding: 10px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.add-btn:hover {
    background-color: #1a64ca;
}

.card-body {
    background-color: rgb(83, 83, 83);
}

.table {
    border: 3px solid black;
    font-family: 'Poppins';
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

.edit-btn {
    background-color: rgb(63, 62, 62);
    border: none;
    border-radius: 8%;
    color: white;
    padding: 6px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s ease;
}

.edit-btn:hover {
    background-color: rgb(92, 92, 92);
}

.trash-btn {
    background-color: #d81b0d;
    border: none;
    border-radius: 8%;
    color: white;
    padding: 6px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s ease;
}

.trash-btn:hover {
    background-color: #a7150b;
}

.archive {
    margin-right: 25px;
    font-size: 18px;
    color: #ff3d2f;
}

.archive:hover {
    color: #ff928a;
    transition: all 0.3s ease;
}


.edit {
    margin-right: 5px;
}

.paginationButton {
    border: none;
    background-color: rgb(83, 83, 83);
    margin-left: 10px;
    margin-right: 10px;
    color: white;
    transition: all 0.3s ease;
    font-size: 18px;
}

.paginationButton:disabled {
    color: rgba(255, 255, 255, 0.404);
}

.paginationButton:not(:disabled):hover {
    border: none;
    background-color: rgb(83, 83, 83);
    color: red;
}
</style>