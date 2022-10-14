<template>
  <div>
    <div class="team">
      <h2 id="active-core-team-members">
        核心团队成员
      </h2>
      <VuerProfile v-for="profile in members" :key="profile.name" :profile="profile" :use-miles="useMiles"/>
    </div>
  </div>
</template>

<script>
import members from './members'

const cityCoordsFor = {
  // 'Annecy, France': [45.899247, 6.129384],
}

export default {
  components: {
    VuerProfile: () => import('./vuer-profile')
  },

  data: () => ({

  }),

  computed: {
    members () {
      return members;
    },
  },

  methods: {

  },

  mounted () {
   
  }
}
</script>

<style lang="scss" scoped>
.vuer+.vuer {
  border-top: 1px dotted #ddd;
}

.get-position-button {
  float: right;
  margin-top: .3em;
}
</style>
