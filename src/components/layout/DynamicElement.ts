import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'DynamicElement',
  props: {
    tag: { type: String, default: 'div' },
  },
  setup(props, { slots }) {
    return () => h(props.tag, slots.default ? slots.default() : undefined);
  },
});
