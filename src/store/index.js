import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@modules/auth';
import user from '@modules/user';
import activity from '@modules/activity';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    activity,
  },
});
