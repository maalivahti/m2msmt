<template>
  <article class="work-list" id="work_list">
    <div class="work-list__header work-header">
      <button class="btn-reset work-icon work-icon--type icon--toObj"
              data-work-list="objects"
              type="button"
      ></button>
      <button class="btn-reset work-icon work-icon--add-elem icon--add-elem"
              type="button"
              @click="openSearch"
      ></button>
      <label>
        <input class="work-header__search"
             id="work_list_search"
             type="search"
             name="work-list-search"
             placeholder="Поиск"
             @input="listSearch"
        ></label>
    </div>
    <div class="work-list__wrap">
      <ul id="work-list">
        <object-item v-for="obj in objectList"
                     :key="obj.id"
                     :object="obj"
                     @remove-obj-from-list="removeObjFromList"
        />
      </ul>
    </div>
    <div class="work-list__add add-item"
         id="add_item_block"
         :class="{ 'add-item--open': searchOpen }"
    >
      <!-- eslint-disable-next-line -->
      <input class="add-item__search" id="add_item_search" type="search" placeholder="Поиск">
      <simplebar>
        <ul class="add-item__list">
        <li class="add-item__item"
            data-object="obj__all"
            @click="addAllObj"
          @keyup.enter="addAllObj"
        >
          <span class="add-item__name">Добавить все</span>
        </li>
        <li class="add-item__item"
            v-for="obj in $store.state.workObjectsList"
            :data-object-id="obj.id"
            :key="obj.id"
            @click="addObj"
            @keyup.enter="addObj"
        >
          <span class="add-item__name">{{ obj.name }}</span>
        </li>
      </ul>
      </simplebar>
    </div>
  </article>
</template>

<script>
import ObjectItem from '@/modules/WorkList/components/ObjectItem.vue';
import searchToList from '@/helpers/listSearch';
import objInfo from '@/helpers/objInfo';
import simplebar from 'simplebar-vue';
import 'simplebar-vue/dist/simplebar.min.css';

export default {
  name: 'ObjectsList',
  components: { ObjectItem, simplebar },
  data() {
    return {
      objectList: [],
      searchOpen: false,
      tooltip: false,
    };
  },
  computed: {
    objectLoadList() {
      return this.$store.state.workObjectsList;
    },
  },
  watch: {
    objectLoadList(val) {
      this.objectList = val;
    },
  },
  methods: {
    listSearch(event) {
      searchToList(document.getElementById('work-list'), event.target);
    },
    openSearch() {
      this.searchOpen = !this.searchOpen;
    },
    removeObjFromList(objId) {
      this.objectList = this.objectList.filter((obj) => obj.id !== objId);
    },
    addAllObj() {
      this.$store.dispatch('loadWorkList');
    },
    addObj(event) {
      const objectId = +event.currentTarget.dataset.objectId;
      const findObject = this.objectLoadList.filter((obj) => obj.id === objectId);
      this.objectList.push(findObject[0]);
    },
    showTooltip(event) {
      if (this.tooltip === true) return;
      this.tooltip = true;
      const tooltip = document.getElementById('wl_tooltip');
      tooltip.style.top = `${event.layerY}px`;
      tooltip.style.left = `${event.layerX}px`;
      tooltip.innerHTML = objInfo();
      setTimeout(() => { tooltip.classList.remove('is-hidden'); }, 200);
    },
    hideTooltip() {
      if (this.tooltip === false) return;
      this.tooltip = false;
      const tooltip = document.getElementById('wl_tooltip');
      setTimeout(() => { tooltip.classList.add('is-hidden'); }, 200);
    },
  },
};
</script>

<style lang="scss">
  .work-list__tooltip {
    position: absolute;
    z-index: 10000;
  }
</style>
