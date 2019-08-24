import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@modules/auth';
import user from '@modules/user';
import activity from '@modules/activity';
import race from '@modules/race';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    activity,
    race,
  },
});
