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
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/admin/teams/${teamId}/delete`).then(res => {
                        Swal.fire(
                            'Archived!',
                            res.data.message,
                            'success'
                        ).then(() => {
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
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Teams
                    <span class="float-end">
                        <RouterLink class="archive" to="/teams/archive">Archive</RouterLink>
                        <RouterLink class="btn btn-primary" to="/teams/create">Add Team</RouterLink>
                    </span>
                </h4>
                <input type="text" v-model="searchQuery" placeholder="Search..." @input="getTeams">
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="header">ID</th>
                            <th class="header">Team Name</th>
                            <th class="header">Location</th>
                            <th class="header">Conference</th>
                            <th class="header">Image</th>
                            <th class="header">Players</th>
                            <th class="header">Created At</th>
                            <th class="header">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.teams.length > 0">
                        <tr v-for="(team, index) in this.teams" :key="index">
                            <td class="cell">{{ team.id }}</td>
                            <td class="cell">{{ team.team_name }}</td>
                            <td class="cell">{{ team.location }}</td>
                            <td class="cell">{{ team.conference }}</td>
                            <td class="cell">{{ team.image }}</td>
                            <td class="cell">
                                <RouterLink :to="{ path: '/teams/' + team.id + '/info' }">View
                                </RouterLink>
                            </td>
                            <td class="cell">{{ team.created_at }}</td>
                            <td class="cell">
                                <span class="edit">
                                    <RouterLink :to="{ path: '/teams/' + team.id + '/edit' }" class="btn btn-info">Edit
                                    </RouterLink>
                                </span>
                                <button type="button" class="btn btn-danger" @click="deleteTeam(team.id)">Trash</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7" class="cell">NO TEAMS FOUND</td>
                        </tr>
                    </tbody>
                </table>
                <div class="pagination" v-if="this.teams.length > 0">
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
    margin: auto;
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

.archive {
    margin-right: 20px;
    font-size: 15px;
    color: rgb(182, 0, 0);
}

.edit {
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