<template>
  <b-row class="list">
    <b-col v-for="option in options" :key="option.cycles">
      <p :class="'suggestion ' + option.class">
        {{ formatDate(option.time) }} for {{ option.cycle }} sleep
        {{ pluralizeCycles(option.cycle) }}
      </p>
    </b-col>
  </b-row>
</template>

<script>
import FormatDateMixin from '~/mixin/format-date-mixin'

export default {
  name: 'TimeRecommendationList',
  mixins: [FormatDateMixin],
  props: {
    options: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  methods: {
    pluralizeCycles (cycles) {
      if (cycles === 1) { return 'cycle' } else { return 'cycles' }
    }
  }
}
</script>

<style lang="scss">
.list {
  margin: 45px 0 25px 0;

  .suggestion {
    border-radius: 50rem;
    background: $secondary;
    padding: 15px;
    color: $background !important;
    border: 2px solid $background;

    &.good {
      border-color: #30b881;
    }

    &.ok {
      border-color: #cfa440;
    }

    &.bad {
      border-color: #c95034;
    }
  }
}
</style>
