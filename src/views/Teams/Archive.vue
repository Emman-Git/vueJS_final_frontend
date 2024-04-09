<script>
import axios from 'axios'

export default {
    name: 'teams',
    data() {
        return {
            teams: []
        }
    },
    mounted() {
        this.getTeams();
    },
    methods: {
        getTeams() {
            axios.get('http://127.0.0.1:8000/api/admin/teams/archive').then(res => {
                this.teams = res.data.teams
            });
        },
        deleteTeam(teamId) {
            if (confirm('Are you sure? This record will be gone forever.')) {
                axios.delete(`http://127.0.0.1:8000/api/admin/teams/${teamId}/hard_delete`).then(res => {
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
        restoreTeam(teamId) {
            if (confirm('Are you sure to restore this team?')) {
                axios.get(`http://127.0.0.1:8000/api/admin/teams/${teamId}/archive`).then(res => {
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
                    Archived Teams
                    <span class="float-end">
                        <RouterLink class="btn btn-secondary" to="/teams">Go Back</RouterLink>
                    </span>
                    
                </h4>
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
                            <th class="header">Deleted At</th>
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
                            <td class="cell">{{ team.deleted_at }}</td>
                            <td class="cell">
                                <span class="restore">
                                <button type="button" class="btn btn-success"
                                    @click="restoreTeam(team.id)">Restore</button>
                                </span>
                                <button type="button" class="btn btn-danger"
                                    @click="deleteTeam(team.id)">Trash</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7" class="cell">NO RECORDS FOUND</td>
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

.restore {
    margin-right: 5px;
}
</style>