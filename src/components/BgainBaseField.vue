<template>
  <Field
    :label-width="labelWidth"
    label-class="bgain__field-override"
    :maxlength="maxlength"
    :border="true"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <template v-slot:input>
      <slot name="input"></slot>
    </template>
    <template v-slot:button>
      <slot name="button"></slot>
    </template>
  </Field>
</template>

<script>
import { Field } from 'vant';

export default {
  name: 'BgainBaseField',
  props: {
    labelWidth: {
      type: String,
      default: '80px',
      required: false,
    },
    maxlength: {
      type: String,
      default: '50',
      required: false,
    },
  },
  components: {
    Field,
  },
};
</script>

<style lang="scss">
  .van-cell {
    padding: 15px 20px;

    .bgain__field-override {
      span {
        font-size: 15px;
        color: #6A707D;
      }
    }
  }

  .van-cell:not(:last-child)::after {
    left: 22px;
    right: 22px;
  }
</style>
