import { createStore } from 'vuex';
import initMap from '@/helpers/map';
import objInfo from '@/helpers/objInfo';
// eslint-disable-next-line
import leaflet from 'leaflet';
import axios from 'axios';

export default createStore({
  state: {
    map: null,
    markersInMap: [],
    workObjectsList: null,
  },
  getters: {
  },
  mutations: {
    initMap(state) {
      state.map = initMap();
    },
    displayObjectMark(state, data) {
      state.markersInMap.push({
        // eslint-disable-next-line
        marker: L.marker(data.objectCoords, {
          // eslint-disable-next-line
          icon: L.icon({
            iconUrl: 'https://hst-api.wialon.com/avl_library_image/5/0/library/unit/s_g_6.svg',
            iconSize: [22, 22],
          }),
        }),
      });

      state.markersInMap.forEach((mark) => {
        if (mark.id === data.objectData.objId) {
          mark.marker
            .bindPopup(objInfo()).openPopup()
            .addTo(state.map);
        }
      });
      state.map.setView(data.objectCoords, 11);
    },
    removeObjectMark(state, objectData) {
      state.markersInMap.forEach((mark, index) => {
        if (mark.id === objectData.objId) {
          state.map.removeLayer(mark.marker);
          state.markersInMap.splice(index, 1);
        }
      });
    },
    loadWorkList(state, objectList) {
      state.workObjectsList = objectList;
    },
  },
  actions: {
    loadWorkList(context) {
      axios.get('/home/objects_list/')
        .then((response) => {
          context.commit('loadWorkList', response.data.objList);
        });
    },
  },
  modules: {
  },
});
