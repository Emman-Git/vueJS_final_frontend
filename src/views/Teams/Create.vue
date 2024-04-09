<script>
import axios from 'axios'

export default {
    name: 'teamCreate',
    data() {
        return {
            teamId: '',
            errorList: '',
            model: {
                team: {
                    team_name: '',
                    location: '',
                    conference: '',
                    image: '',
                }
            },
            players: [],
        }
    },
    mounted() {
        this.fetchPlayers();
    },
    methods: {
        fetchPlayers() {
            axios.get('http://127.0.0.1:8000/api/admin/teams').then(res => {
                this.teams = res.data.teams
            });
        },
        saveTeam() {
            var mythis = this;
            axios.post('http://127.0.0.1:8000/api/admin/teams', this.model.team).then(res => {
                console.log(res)
                alert(res.data.message);

                this.model.team = {
                    team_name: '',
                    location: '',
                    conference: '',
                    image: '',
                }
                this.errorList = '';
            })
                .catch(function (error) {
                    if (error.response) {

                        if (error.response.status == 422) {
                            mythis.errorList = error.response.data.errors;
                        }
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
        },
        handleImageUpload(event) {
            this.model.team.image = event.target.files[0];
        }
    },
}
</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Team</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="">Team Name</label>
                    <input type="text" v-model="model.team.team_name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Location</label>
                    <input type="text" v-model="model.team.location" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Conference</label>
                    <select v-model="model.team.conference" class="form-select">
                        <option value="" disabled>Select a conference</option>
                        <option value="NCR">NCR</option>
                        <option value="East Luzon">East Luzon</option>
                        <option value="North Luzon">North Luzon</option>
                        <option value="South Luzon">South Luzon</option>
                        <option value="Visayas">Visayas</option>
                        <option value="Mindanao">Mindanao</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="">Image</label>
                    <input type="file" @change="handleImageUpload" class="form-control">
                </div>
                <div class="mb-3">
                    <span class="save">
                        <button type="button" class="btn btn-success" @click="saveTeam">Save</button>
                    </span>
                    <RouterLink class="btn btn-secondary" to="/teams">Back</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.save {
    margin-right: 10px;
}
</style>
