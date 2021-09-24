<template>
  <b-modal
    :id="id"
    ref="modal"
    :title="title"
    header-bg-variant="dark"
    header-text-variant="light"
    header-border-variant="dark"
    body-bg-variant="dark"
    body-text-variant="light"
    footer-bg-variant="dark"
    footer-text-variant="light"
    footer-border-variant="dark"
    ok-only
    @show="$emit('reset', $event)"
    @hidden="$emit('reset', $event)"
    @ok="$emit('ok', $event)"
  >
    <slot />
    <template slot="modal-ok">
      <slot name="ok-button" />
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>
