<template>
  <b-container>
    <navbar />
    <span v-if="!user"></span>
    <span v-else-if="user === -1">Requested user doesn't exist</span>
    <div v-else>
      <h3>Your Profile</h3>
      <strong>Email:</strong> {{ user.email }}
    </div>
  </b-container>
</template>

<script>
  import utils from '@/utils/utils';

  export default {
    name: 'profile-page',
    mounted: function() {
      utils.getCurrentUserInfo(function(success, response) {
        this.user = success ? response : -1;
      }.bind(this));
    },
    data: function() {
      return {
        user: null
      }
    }
  }
</script>
