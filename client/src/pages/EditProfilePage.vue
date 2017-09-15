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
      <div class="row justify-content-md-center align-items-center">
        <div class="col col-lg-6">

          <b-card>
            <b-alert variant="danger" :show="!!verificationForm.errorMsg">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ verificationForm.errorMsg }}
            </b-alert>
            <b-form-group id="currentPasswordGroup" label="Current Password:" label-for="currentPasswordField">
              <b-input-group>
                <b-input-group-addon>
                  <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                </b-input-group-addon>
                <b-form-input id="currentPasswordField" type="password" v-model="verificationForm.currentPassword" placeholder="Current Password" :state="verificationForm.currentPasswordState" />
              </b-input-group>
            </b-form-group>
          </b-card>

          <hr />

          <b-card>
            <b-alert variant="danger" :show="!!accountForm.errorMsg">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ accountForm.errorMsg }}
            </b-alert>
            <b-alert variant="success" :show="accountForm.updateSuccessful">
              <i class="fa fa-check-circle" aria-hidden="true"></i> Your profile has been updated successfully
            </b-alert>
            <b-form @submit.prevent="submitAccount">
              <b-form-group id="editEmailGroup" label="Email:" label-for="editEmailField">
                <b-input-group>
                  <b-input-group-addon>
                    <i class="fa fa-envelope-o" aria-hidden="true"></i>
                  </b-input-group-addon>
                  <b-form-input id="editEmailField" type="text" v-model="accountForm.email" placeholder="Email" :state="accountForm.emailState" />
                </b-input-group>
              </b-form-group>
              <div class="centered-text">
                <b-button type="submit" variant="primary" :disabled="submitting">Edit Account</b-button>
              </div>
            </b-form>
          </b-card>

          <hr />

          <b-card>
            <b-alert variant="danger" :show="!!passwordForm.errorMsg">
              <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {{ passwordForm.errorMsg }}
            </b-alert>
            <b-alert variant="success" :show="passwordForm.updateSuccessful">
              <i class="fa fa-check-circle" aria-hidden="true"></i> Your password has been updated successfully
            </b-alert>
            <b-form @submit.prevent="submitPassword">
              <b-form-group id="editPasswordGroup" label="New Password:" label-for="editPasswordField">
                <b-input-group>
                  <b-input-group-addon>
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </b-input-group-addon>
                  <b-form-input id="editPasswordField" type="password" v-model="passwordForm.newPassword" placeholder="New Password" :state="passwordForm.newPasswordState" />
                </b-input-group>
              </b-form-group>
              <b-form-group id="editPasswordConfirmGroup" label="Confirm New Password:" label-for="editPasswordConfirmField">
                <b-input-group>
                  <b-input-group-addon>
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </b-input-group-addon>
                  <b-form-input id="editPasswordConfirmField" type="password" v-model="passwordForm.newPasswordConfirm" placeholder="Confirm New Password" :state="passwordForm.newPasswordConfirmState" />
                </b-input-group>
              </b-form-group>
              <div class="centered-text">
                <b-button type="submit" variant="primary" :disabled="submitting">Edit Password</b-button>
              </div>
            </b-form>
          </b-card>

        </div>
      </div>
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
        this.accountForm.email = this.user.email;
      }.bind(this));
    },
    data: function() {
      return {
        user: null,
        submitting: false,
        verificationForm: {
          currentPassword: '',
          currentPasswordState: 'valid',
          errorMsg: ''
        },
        accountForm: {
          updateSuccessful: false,
          email: '',
          emailState: 'valid',
          errorMsg: ''
        },
        passwordForm: {
          updateSuccessful: false,
          newPassword: '',
          newPasswordConfirm: '',
          newPasswordState: 'valid',
          newPasswordConfirmState: 'valid',
          errorMsg: null
        }
      }
    },
    methods: {
      resetVerificationErrors() {
        this.verificationForm.errorMsg = null;
        this.verificationForm.currentPasswordState = 'valid';
      },
      resetAccountErrors() {
        this.accountForm.updateSuccessful = false;
        this.accountForm.errorMsg = null;
        this.accountForm.emailState = 'valid';
      },
      resetPasswordErrors() {
        this.passwordForm.updateSuccessful = false;
        this.passwordForm.errorMsg = null;
        this.passwordForm.newPasswordState = 'valid';
        this.passwordForm.newPasswordConfirmState = 'valid';
      },
      submitAccount(event) {
        this.resetVerificationErrors();
        this.resetAccountErrors();
        this.submitting = true;

        const data = {
          id: this.user.id,
          email: this.accountForm.email,
          currentPassword: this.verificationForm.currentPassword
        };

        api.updateUser(data, function(success, response) {
          if (success) {
            this.accountForm.updateSuccessful = true;
          }
          else {
            this.accountForm.errorMsg = response.data.messages.emailErr;
            this.verificationForm.errorMsg = response.data.messages.verifyErr;
            this.accountForm.emailState = response.data.content.emailState || 'valid';
            this.verificationForm.currentPasswordState = response.data.content.currentPasswordState || 'valid';
          }
          this.submitting = false;
        }.bind(this));
      },
      submitPassword(event) {
        this.resetVerificationErrors();
        this.resetPasswordErrors();
        this.submitting = true;

        const data = {
          id: this.user.id,
          newPassword: this.passwordForm.newPassword,
          newPasswordConfirm: this.passwordForm.newPasswordConfirm,
          currentPassword: this.verificationForm.currentPassword
        };

        api.updateUserPassword(data, function(success, response) {
          if (success) {
            this.passwordForm.updateSuccessful = true;
          }
          else {
            this.passwordForm.errorMsg = response.data.messages.passwordErr;
            this.verificationForm.errorMsg = response.data.messages.verifyErr;
            this.passwordForm.newPasswordState = response.data.content.newPasswordState || 'valid';
            this.passwordForm.newPasswordConfirmState = response.data.content.newPasswordConfirmState || 'valid';
            this.verificationForm.currentPasswordState = response.data.content.currentPasswordState || 'valid';
          }
          this.submitting = false;
        }.bind(this));
      }
    }
  }
</script>
