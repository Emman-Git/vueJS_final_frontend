<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
    name: 'playerCreate',
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
                }
            },
            teams: [],
        }
    },
    mounted() {
        this.fetchTeams();
    },
    methods: {
        fetchTeams() {
            axios.get('http://127.0.0.1:8000/api/admin/allteams').then(res => {
                this.teams = res.data.teams
            });
        },
        savePlayer() {
            const formData = new FormData();
            formData.append('player_name', this.model.player.player_name);
            formData.append('team', this.model.player.team);
            formData.append('jersey_number', this.model.player.jersey_number);
            formData.append('position', this.model.player.position);
            formData.append('image', this.model.player.image);

            axios.post('http://127.0.0.1:8000/api/admin/players', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: res.data.message,
                });

                const input = this.$refs.fileInput;
                if (input) {
                    input.value = '';
                }

                this.model.player = {
                    player_name: '',
                    team: '',
                    jersey_number: '',
                    position: '',
                    image: '',
                    imagePreview: '',
                };
                this.errorList = '';

                // location.reload();
            }).catch(error => {
                if (error.response) {
                    if (error.response.status == 422) {
                        this.errorList = error.response.data.errors;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        });
                    }
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
        },
        handleImageUpload(event) {
            this.model.player.image = event.target.files[0];
            this.model.player.imagePreview = URL.createObjectURL(event.target.files[0]);
        }
    },
}
</script>

<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Player</h4>
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
                    <input type="file" ref="fileInput" @change="handleImageUpload" class="form-control">
                    <!-- Image preview -->
                    <div v-if="model.player.imagePreview" class="mt-3 mb-5">
                        <img :src="model.player.imagePreview" alt="Image Preview" style="height:110px; width: 140px;"
                            class="rounded-3 shadow">
                    </div>
                </div>
                <div class="mb-3">
                    <span class="save">
                        <button type="button" class="btn btn-success" @click="savePlayer">Save</button>
                    </span>
                    <RouterLink class="btn btn-secondary" to="/players">Back</RouterLink>
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
