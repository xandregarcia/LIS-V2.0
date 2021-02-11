<template>
<div class="card p-fluid p-shadow-5 ml" >
    <div class="p-grid">
        <div class="p-col-6 p-d-none p-d-md-inline-flex p-ai-center p-jc-center">
            <img alt="session" src="assets/images/sessionhall.jpg" style="width: 100%; " class="p-shadow-3 p-d-none p-d-md-inline-flex"/>
        </div>
        <div class="p-col-1 p-d-md-inline-flex">
            <Divider layout="vertical"/>
        </div> 
        <!-- <div class="p-fluid" style="margin-top:50px"> -->
        <form @submit.prevent="login">
            <Card class="cm p-shadow-2 p-mb-2 p-d-block p-jc-center">
                <template #title>
                    <div class="p-text-center font">
                    LOG IN
                    </div>
                    <Divider/>
                </template> 
                <template #content> 
                    <div class="p-field">
                        <label for="Email">Email</label>
                        <InputText id="Email" type="email" :class="{'p-invalid': validations.email && validations.email[0]}" v-model="user.email" />
                        <small class="p-error">{{ validations.email && validations.email[0] }}</small>
                    </div>
                    <div class="p-field">
                        <label for="password">Password</label>
                        <InputText id="password" type="password" :class="{'p-invalid': validations.email && validations.email[0]}" v-model="user.password" />
                        <small class="p-error">{{ validations.password && validations.password[0] }}</small>
                    </div>
                    <div class="p-field">
                        <small class="p-error" v-show="unauthenticated">Your email or password is incorrect</small>
                    </div>
                    <Button type="submit" label="Login"></Button> 
                    
                </template>
                
            </Card>
        </form>            
    </div> 
    {{year}} LIS      
</div>
</template>

<script>
import Button from "primevue/button";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Card from "primevue/card";

export default {
    components: {
        Button,
        Divider,
        InputText,
        Card
    },
    data() {
        return {
            year: new Date().getFullYear(),
            user: {
                email: null,
                password: null,
                
            },
            
        }
    },
    computed: {
        validations() {
            return this.$store.state.validations
        },
        unauthenticated() {
            return this.$store.state.unauthenticated === true
        }
    },
    methods: {
        login() {
            this.$store.dispatch('LOGIN',this.user)
        }
    },
    mounted() {

    }
}
</script>
<style>
body{
    background: rgba(0, 128, 0, 0.3)
}
.ml{
    margin-right:auto;
    margin-left:auto;
    margin-top:50px;
    width:1000px; 
    height:425px;

}
.cm{
    width: 25rem; 
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;

}
.primebackground{
    background-color: cornsilk;
}
.font{
     font-family: "Times New Roman", Times, serif;
}
</style>
