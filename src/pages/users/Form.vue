<template>
  <div>
      <MyBreadcrumb :home="home" :items="items" />
      <div class="p-grid">
        <div class="p-col-12 p-mt-2">
          <form @submit="onSubmit">
              <div class="card p-fluid">
                  <h5><i class="pi pi-user"></i> User Information</h5>
                  <hr />
                  <div class="p-grid">
                      <div class="p-field p-lg-4 p-md-12">
                          <label for="firstname">First Name</label>
                          <InputText id="firstname" type="text" placeholder="Enter First Name" v-model="firstname" :class="{'p-invalid': firstnameError}" />
                          <small class="p-error">{{ firstnameError }}</small>                       
                      </div>
                      <div class="p-field p-lg-4 p-md-12">
                          <label for="middlename">Middle Name</label>
                          <InputText id="middlename" type="text" placeholder="Enter Middle Name" v-model="middlename" />
                      </div>
                      <div class="p-field p-lg-4 p-md-12">
                          <label for="lastname">Last Name</label>
                          <InputText id="lastname" type="text" placeholder="Enter Last Name" v-model="lastname" :class="{'p-invalid': lastnameError}" />
                          <small class="p-error">{{ lastnameError }}</small>                        
                      </div>
                  </div>
                  <div class="p-grid">
                      <div class="p-field p-lg-4 p-md-12">
                          <label for="email">Email Address</label>
                          <InputText id="email" type="email" placeholder="Enter Email Address" v-model="email" :class="{'p-invalid': emailError}" />
                          <small class="p-error">{{ emailError }}</small>                       
                      </div>
                  </div>
              </div>
              <div class="p-d-flex">
                  <Button label="Submit" type="submit" class="p-button-primary" />
              </div>
          </form>
        </div>
    </div>        
  </div>
</template>

<script>
import MyBreadcrumb from "../../components/MyBreadcrumb.vue";
import InputText from "primevue/inputtext/sfc";
import Button from "primevue/button/sfc";
import BlockUI from "primevue/blockui/sfc";
import ToggleButton from "primevue/togglebutton/sfc";
import Dropdown from "primevue/dropdown/sfc";
import Divider from "primevue/divider/sfc";
import { user } from "../../stores/users.js";
import store from "../../store.js";
import { useForm, useField } from "vee-validate";
import { useRoute } from "vue-router";
import { watch } from "vue";

export default {
  props: ["editOn"],
  setup(props) {
    
    const editMode = eval(props.editOn);
    const route = useRoute();
    const params = route.params;
    const userId = params.id || null;
    const { state, dispatch } = store

    const init = {
        initialValues: {
            user: {...user}
        }
    }

    const { setValues, handleSubmit, resetForm } = useForm(init);

    watch(
        () => state.users.user,
        (data, prevData) => {
            setValues({
                user: {...data}
            })
        }
    )

    if (editMode) { // Edit
        dispatch('users/GET_USER', { id: userId })
    } else { // New
        resetForm();
    }

    const onSubmit = handleSubmit((values, actions) => {
        const { resetForm } = actions
        const { user } = values
        if (editMode) {
            dispatch('users/UPDATE_USER', user)
        } else {
            dispatch('users/CREATE_USER', user)
            resetForm();
        }
    });

    function validateField(value) {
        if (!value) {
            return "This field is required";
        }
        return true;
    }
    function validField(value) {
        return true;
    }
    
    // No need to define rules for fields
    const { value: id } = useField('user.id',validField);
    const { value: firstname, errorMessage: firstnameError } = useField('user.firstname',validateField);
    const { value: middlename, errorMessage: middlenameError } = useField('user.middlename',validField);
    const { value: lastname, errorMessage: lastnameError } = useField('user.lastname',validateField);
    const { value: email, errorMessage: emailError } = useField('user.email',validateField);

    return {
      editMode,
      onSubmit,
      id,
      firstname,
      middlename,
      lastname,
      email,
      firstnameError,
      middlenameError,
      lastnameError,
      emailError,
    };

  },
  components: {
    MyBreadcrumb,
    BlockUI,
    ToggleButton,
    InputText,
    Button,
    Divider,
    Dropdown,
  },

  data() {
    return {
      home: { icon: "pi pi-home", to: "/users" },
      items: [
        {
          label: this.editMode ? "Edit User" : "New User",
          to: `${this.$route.fullPath}`,
        },
      ],
      Groups: [
        { name: "Admin", code: "ADMN" },
        { name: "Secretariat", code: "SEC" },
        { name: "Board Member", code: "BM" },
      ],
    };
  },
};
</script>

<style scoped>
</style>