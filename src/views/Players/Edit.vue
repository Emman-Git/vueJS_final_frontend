<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'playerEdit',
    data() {
        return {
            playerId: '',
            errorList: '',
            model: {
                player: {
                    player_name: '',
                    team: '',
                    jersey_number: '',
                    position: '',
                    image: '',
                    imagePreview: '',
                },
            },
            teams: [],
        };
    },
    mounted() {
        this.fetchTeams();
        this.playerId = this.$route.params.id;
        this.getPlayerData(this.$route.params.id);
    },
    methods: {
        fetchTeams() {
            axios.get('http://127.0.0.1:8000/api/admin/allteams').then((res) => {
                this.teams = res.data.teams;
            });
        },
        getPlayerData(playerId) {
            axios.get(`http://127.0.0.1:8000/api/admin/players/${playerId}/edit`)
                .then((res) => {
                    this.model.player = res.data.player;


                    if (this.model.player.image) {
                        this.model.player.imagePreview = 'http://127.0.0.1:8000/images/' + this.model.player.image;
                    }
                })
                .catch((error) => {
                    console.error('Error fetching player data:', error);
                });
        },
        updatePlayer() {
            axios.put(`http://127.0.0.1:8000/api/admin/players/${this.playerId}/edit`, this.model.player)
            .then((res) => {
                // alert(res.data.message);
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: res.data.message,
                })
                this.errorList = '';

            }).catch((error) => {
                if (error.response && error.response.status === 422) {
                    this.errorList = error.response.data.errors;
                } else {
                    console.error('Error updating player:', error);
                }
            });
        },
    },
};
</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Player</h4>
            </div>
            <div class="card-body">

                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>

                <div class="mb-3">
                    <label for="">Player Name</label>
                    <input type="text" v-model="model.player.player_name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Team</label>
                    <select v-model="model.player.team" class="form-select">
                        <option value="" disabled>Select a team</option>
                        <option v-for="team in teams" :key="team.id" :value="team.team_name">{{ team.team_name }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="">Jersey Number</label>
                    <input type="number" v-model="model.player.jersey_number" class="form-control" max="99" min="0">
                </div>
                <div class="mb-3">
                    <label for="">Position</label>
                    <select v-model="model.player.position" class="form-select">
                        <option value="" disabled>Select a position</option>
                        <option value="PG">Point Guard</option>
                        <option value="SG">Shooting Guard</option>
                        <option value="SF">Small Forward</option>
                        <option value="PF">Power Forward</option>
                        <option value="C">Center</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="">Image</label>
                    <input type="file" @change="handleImageUpload" class="form-control">
                    <!-- Image preview -->
                    <div v-if="model.player.imagePreview" class="mt-3 mb-5">
                        <img :src="model.player.imagePreview" alt="Image Preview" style="height:110px; width: 140px;"
                            class="rounded-3 shadow">
                    </div>
                </div>
                <div class="mb-3">
                    <span class="update">
                        <button type="button" class="btn btn-success" @click="updatePlayer">Update</button>
                    </span>
                    <RouterLink class="btn btn-secondary" to="/players">Back</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.update {
    margin-right: 10px;
}
</style>
