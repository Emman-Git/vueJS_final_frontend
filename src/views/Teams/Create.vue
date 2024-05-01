<script>
import axios from 'axios';
import Swal from 'sweetalert2';

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
                    wins: '',
                    losses: '',
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
            if (this.model.team.wins === '') {
                this.model.team.wins = 0;
            }
            if (this.model.team.losses === '') {
                this.model.team.losses = 0;
            }

            const formData = new FormData();
            formData.append('team_name', this.model.team.team_name);
            formData.append('location', this.model.team.location);
            formData.append('conference', this.model.team.conference);
            formData.append('image', this.model.team.image);
            formData.append('wins', this.model.team.wins);
            formData.append('losses', this.model.team.losses);

            axios.post('http://127.0.0.1:8000/api/admin/teams', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res)
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    iconColor: '#034AAD',
                    confirmButtonColor: '#034AAD',
                    confirmButtonText: 'OK'
                });

                const input = this.$refs.fileInput;

                if (input) {
                    input.value = '';
                }

                this.model.team = {
                    team_name: '',
                    location: '',
                    conference: '',
                    image: '',
                    wins: '',
                    losses: '',
                    imagePreview: '',
                }
                this.errorList = '';
            }).catch(error => {
                if (error.response) {
                    if (error.response.status == 422) {
                        Swal.fire({
                            icon: 'error',
                            iconColor: '#d81b0d',
                            title: 'Please Try Again',
                            text: 'Some information are missing/incorrect',
                            confirmButtonColor: '#034AAD',
                        });
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
            this.model.team.image = event.target.files[0];
            this.model.team.imagePreview = URL.createObjectURL(event.target.files[0]);
        }
    },
}
</script>

<template>
    <div class="whole">
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <div class="card">
                        <div class="card-header">
                            <h4>Logo Preview</h4>
                        </div>
                        <div class="card-body">
                            <div class="">
                                <div v-if="model.team.imagePreview" class="mt-3 mb-4 text-center">
                                    <img :src="model.team.imagePreview" alt="Image Preview"
                                        style="height:170px; width: 225px;" class="rounded-4 shadow">
                                </div>
                                <div v-else class="mt-3 mb-4 text-center">
                                    <img src="/src/assets/team.jpg" alt="Image Preview"
                                        style="height:170px; width: 225px;" class="rounded-4 shadow">
                                </div>
                                <label for="">Upload Image</label>
                                <input type="file" ref="fileInput" @change="handleImageUpload" class="form-control"
                                    accept="image/*">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="card">
                        <div class="card-header">
                            <h4>Add Team</h4>
                        </div>
                        <div class="card-body">

                            <ul class="errorList" v-if="Object.keys(this.errorList).length > 0">
                                <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                                    {{ error[0] }}
                                </li>
                            </ul>

                            <div class="mb-3">
                                <label for="">Team Name</label>
                                <input type="text" v-model="model.team.team_name" class="form-control" maxlength="50">
                            </div>
                            <div class="mb-3">
                                <label for="">Location</label>
                                <input type="text" v-model="model.team.location" class="form-control" maxlength="50">
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
                            <div class="row">
                                <div class="col-3">
                                    <div class="mb-3">
                                        <label for="">Wins</label>
                                        <input type="number" v-model="model.team.wins" class="form-control" min="0">
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="">
                                        <label for="">Losses</label>
                                        <input type="number" v-model="model.team.losses" class="form-control" min="0">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3 float-end">
                                <span class="save">
                                    <button type="button" class="save-btn" @click="saveTeam">Save</button>
                                </span>
                                <RouterLink class="back-btn" to="/teams">Back</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.whole {
    width: 100%;
    height: 88.5vh;
    background-color: rgb(37, 37, 37);
    display: flex;
    position: relative;
    overflow-y: auto;
}

.card {
    margin-top: 20px;
    margin-bottom: 30px;
    border: 2px solid white;
}

.card-header {
    font-family: 'Poppins';
    background-color: rgb(53, 52, 52);
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
}

.card-body {
    background-color: rgb(83, 83, 83);
    font-family: 'Poppins';
}

.errorList {
    padding: 5px;
    padding-inline-start: 15px;
    border: 2px solid #d81b0d;
    border-radius: 10px;
    background-color: #ff928a;
    color: black;
    transition: background-color 0.3s ease;
}

.errorList:hover {
    background-color: #e4827b;
}

label {
    color: white;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
}

input {
    border: 2px solid black;
    font-size: 18px;
}

input:focus {
    border: 2px solid #034AAD
}

input:hover {
    border: 2px solid #034AAD
}

select {
    border: 2px solid black;
}

select:focus {
    border: 2px solid #034AAD
}

select:hover {
    border: 2px solid #034AAD
}

.back-btn {
    background-color: whitesmoke;
    border: 2px solid black;
    border-radius: 10%;
    color: black;
    padding: 5px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    transition: background-color 0.3s ease;
}

.back-btn:hover {
    background-color: rgb(168, 168, 168);
}

.save-btn {
    background-color: #034AAD;
    border: 2px solid black;
    border-radius: 10%;
    color: white;
    padding: 5px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
    transition: background-color 0.3s ease;
}

.save-btn:hover {
    background-color: #1a64ca;
}

.save {
    margin-right: 10px;
}
</style>
