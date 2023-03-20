<template>
  <section class="work-area" id="work_area">
    <ObjectsList />
  </section>
</template>

<script>
import ObjectsList from '@/modules/WorkList/components/ObjectsList.vue';

export default {
  name: 'WorkArea',
  components: { ObjectsList },
};
</script>
