<template>
  <li class="work-list__item obj__item" data-detail="close">
    <input type="checkbox"
           :id="object.id"
           class="gen-check obj-show-map"
           @change="changeStateMarkInMap"
    />
    <label :for="object.id" class="gen-label work-list__check"></label>

    <img :src="object.icon"
         :alt="object.name"
         class="obj-icon pointer"
         @click.prevent="showDetail"
         @keyup="showDetail"
    >

    <p class="work-list__obj-name obj__name" :title="object.name">{{ object.name }}</p>

    <button class="btn-reset work-icon work-icon--more icon--more"
            type="button"
    ></button>
    <button class="btn-reset work-icon work-icon--sett icon--sett"
            type="button"
    ></button>
    <button class="btn-reset work-icon work-icon--remove icon--remove"
            type="button"
            @click="removeObj"
    >
    </button>
    <div class="work-list__tooltip" id="wl_tooltip"></div>
  </li>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import objInfo from '@/helpers/objInfo';

export default {
  name: 'ObjectItem',
  props: {
    object: Object,
  },
  methods: {
    ...mapMutations(['removeObjectMark']),
    changeStateMarkInMap(event) {
      if (event.target.checked) {
        this.getLastCoords(this.object.id)
          .then((data) => {
            this.$store.commit('displayObjectMark', {
              objectData: this.object,
              objectCoords: data.data.coords,
            });
          });
      } else this.$store.commit('removeObjectMark', this.object);
    },
    getLastCoords(objId) {
      return axios.get(`map/get_last_mess/${objId}/`);
    },
    removeObj() {
      this.$emit('remove-obj-from-list', this.object.id);
      this.removeObjectMark(this.object);
    },
    showDetail(event) {
      const item = event.target.closest('li.work-list__item');
      if (item.dataset.detail === 'open') {
        item.nextElementSibling.remove();
        item.setAttribute('data-detail', 'close');
      } else {
        item.setAttribute('data-detail', 'open');
        const wrapper = document.createElement('li');
        wrapper.className = 'work-list__detail';
        wrapper.innerHTML = objInfo();
        wrapper.querySelector('.obj-info__head').classList.add('is-hidden');
        item.after(wrapper);
      }
    },
  },
};
</script>
