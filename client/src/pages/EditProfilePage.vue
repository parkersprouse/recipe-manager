<template>
  <div>
    <div v-if="!user"></div>
    <div v-else-if="user === -1" class="has-text-centered">Requested user doesn't exist</div>
    <div v-else>

      <!-- Current Password Field -->
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <div class="content">
              <div class="notification is-danger" v-if="!!errors.currentPassword">
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                {{ errors.currentPassword }}
              </div>
              <div class="field">
                <label class="label">Current Password <span class="required-field-marker">*</span></label>
                <div class="control has-icons-left">
                  <input class="input" :class="!state.currentPassword ? 'is-danger' : ''" v-model="form.currentPassword" type="password" placeholder="Current Password">
                  <span class="icon is-small is-left">
                    <i class="fa fa-unlock-alt"></i>
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Account Info Form -->
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <h4 class="title is-4">Edit Account</h4>
            <div class="content">
              <form @submit.prevent="submitAccount">
                <div class="notification is-danger" v-if="!!errors.email">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                  {{ errors.email }}
                </div>
                <div class="notification is-success" v-if="accountSuccess">
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                  Your profile has been updated successfully
                </div>
                <div class="field">
                  <label class="label">Email <span class="required-field-marker">*</span></label>
                  <div class="control has-icons-left">
                    <input class="input" :class="!state.email ? 'is-danger' : ''" v-model="form.email" type="email" placeholder="Email">
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <p class="control has-text-centered">
                    <button class="button is-primary" :class="submitting ? 'is-loading' : ''" :disabled="submitting" type="submit">
                      Edit Account
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <h4 class="title is-4">Edit Password</h4>
            <div class="content">
              <form @submit.prevent="submitPassword">
                <div class="notification is-danger" v-if="!!errors.newPassword">
                  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                  {{ errors.newPassword }}
                </div>
                <div class="notification is-success" v-if="passwordSuccess">
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                  Your password has been updated successfully
                </div>
                <div class="field">
                  <label class="label">New Password <span class="required-field-marker">*</span></label>
                  <div class="control has-icons-left">
                    <input class="input" :class="!state.newPassword ? 'is-danger' : ''" v-model="form.newPassword" type="password" placeholder="New Password">
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Confirm New Password <span class="required-field-marker">*</span></label>
                  <div class="control has-icons-left">
                    <input class="input" :class="!state.newPasswordConfirm ? 'is-danger' : ''" v-model="form.newPasswordConfirm" type="password" placeholder="Confirm New Password">
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <p class="control has-text-centered">
                    <button class="button is-primary" :class="submitting ? 'is-loading' : ''" :disabled="submitting" type="submit">
                      Edit Password
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </article>
        </div>
      </div>

      <div class="require-field-notice">
        <span class="required-field-marker">*</span> Required Field
      </div>

    </div>
  </div>

</template>

<script>
  import utils from '@/utils/utils';
  import api from '@/utils/api';

  export default {
    name: 'edit-profile-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        this.user = success ? response : -1;
        this.form.email = this.user.email;
      }.bind(this));
    },
    data: function() {
      return {
        user: null,
        submitting: false,
        accountSuccess: false,
        passwordSuccess: false,
        form: {
          currentPassword: '',
          email: '',
          newPassword: '',
          newPasswordConfirm: ''
        },
        state: {
          currentPassword: true,
          email: true,
          newPassword: true,
          newPasswordConfirm: true
        },
        errors: {
          general: null,
          currentPassword: null,
          email: null,
          newPassword: null
        }
      }
    },
    methods: {
      resetVerificationErrors() {
        this.errors.currentPassword = null;
        this.state.currentPassword = true;
      },
      resetAccountErrors() {
        this.accountSuccess = false;
        this.errors.email = null;
        this.state.email = true;
      },
      resetPasswordErrors() {
        this.passwordSuccess = false;
        this.errors.newPassword = null;
        this.state.newPassword = true;
        this.state.newPasswordConfirm = true;
      },
      submitAccount(event) {
        this.resetVerificationErrors();
        this.resetAccountErrors();
        this.submitting = true;

        const data = {
          id: this.user.id,
          email: this.form.email,
          currentPassword: this.form.currentPassword
        };

        api.updateUser(data, function(success, response) {
          if (success) {
            this.accountSuccess = true;
          }
          else {
            this.errors.email = response.data.messages.emailErr;
            this.errors.currentPassword = response.data.messages.verifyErr;
            this.state.email = response.data.content.emailState;
            this.state.currentPassword = response.data.content.currentPasswordState;
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
          newPassword: this.form.newPassword,
          newPasswordConfirm: this.form.newPasswordConfirm,
          currentPassword: this.form.currentPassword
        };

        api.updateUserPassword(data, function(success, response) {
          if (success) {
            this.passwordSuccess = true;
          }
          else {
            this.errors.newPassword = response.data.messages.passwordErr;
            this.errors.currentPassword = response.data.messages.verifyErr;
            this.state.newPassword = response.data.content.newPasswordState;
            this.state.newPasswordConfirm = response.data.content.newPasswordConfirmState;
            this.state.currentPassword = response.data.content.currentPasswordState;
          }
          this.submitting = false;
        }.bind(this));
      }
    }
  }
</script>
