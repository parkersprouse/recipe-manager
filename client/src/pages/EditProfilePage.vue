<template>
  <b-container>
    <navbar />
    <div>
      Edit Profile
    </div>
    <span v-if="!user"></span>
    <span v-else-if="user === -1">Requested user doesn't exist</span>
    <!-- THINK ABOUT MAKING THESE COMPONENTS -->
    <div v-else>
      <b-form-group id="currentPasswordGroup" label="Current Password:" label-for="currentPasswordField">
        <b-form-input id="currentPasswordField" type="password" v-model="currentPassword" placeholder="Current Password" :state="currentPasswordState" />
      </b-form-group>

      <hr />

      <b-form @submit.prevent="submitAccount">
        <b-form-group id="editEmailGroup" label="Email:" label-for="editEmailField">
          <b-form-input id="editEmailField" type="text" v-model="accountForm.email" placeholder="Email" :state="emailState" />
        </b-form-group>
        <div class="centered-text">
          <b-button type="submit" variant="primary" :disabled="false">Edit Account</b-button>
        </div>
      </b-form>

      <hr />

      <b-form @submit.prevent="submitPassword">
        <b-form-group id="editPasswordGroup" label="New Password:" label-for="editPasswordField">
          <b-form-input id="editPasswordField" type="password" v-model="passwordForm.newPassword" placeholder="New Password" :state="newPasswordState" />
        </b-form-group>
        <b-form-group id="editPasswordConfirmGroup" label="Confirm New Password:" label-for="editPasswordConfirmField">
          <b-form-input id="editPasswordConfirmField" type="password" v-model="passwordForm.newPasswordConfirm" placeholder="Confirm New Password" :state="newPasswordConfirmState" />
        </b-form-group>
        <div class="centered-text">
          <b-button type="submit" variant="primary" :disabled="false">Edit Password</b-button>
        </div>
      </b-form>

    </div>
  </b-container>
</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

  export default {
    name: 'edit-profile-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        this.user = success ? response : -1;
      }.bind(this));
    },
    data: function() {
      return {
        user: null,
        currentPassword: '',
        currentPasswordState: 'valid',
        emailState: 'valid',
        newPasswordState: 'valid',
        newPasswordConfirmState: 'valid',
        accountForm: {
          email: ''
        },
        passwordForm: {
          newPassword: '',
          newPasswordConfirm: ''
        }
      }
    },
    methods: {
      submitAccount(event) {

      },
      submitPassword(event) {

      },
    }
  }
</script>
