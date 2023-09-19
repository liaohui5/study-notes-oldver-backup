## 何时测试组件?

一般业务组件是不写测试的, 只有在写组件库(如: [element-plus](https://github.com/element-plus/element-plus)) 的时候才会写单元测试,

原因是因为业务组件可能会经常的改动, 写测试没有多大意义, 还不如直接手动测试

但是 UI 组件库中的组件一般是不会随便改动功能的

## 如何测试组件?

> 如何将组件挂载到内存中?

- [@vue/test-utils](https://github.com/vuejs/test-utils)

> 如何模拟用户操作事件?

- [@vue/test-utils API#trigger](https://test-utils.vuejs.org/api/#trigger)

## 测试例子

```typescript
import XButton from './index.vue';
import { mount } from '@vue/test-utils';

describe('XButton', () => {
  it('render', () => {
    const wrapper = mount(XButton);
    expect(wrapper.classes()).toContain('xbtn');
    expect(wrapper.classes()).toContain('default');
    expect(wrapper.text()).toContain('button');
  });

  it('should be set text when set props text field', () => {
    const text = 'clickMe';
    const wrapper = mount(XButton, { props: { text } });
    expect(wrapper.text()).toContain(text);
  });

  it('should be add color className when set props color field', () => {
    const wrapper = mount(XButton, {
      props: {
        color: 'info',
      },
    });

    expect(wrapper.classes()).toContain('info');
  });

  it('should be trigger click event', () => {
    const onClick = vi.fn();
    const wrapper = mount(XButton, {
      props: {
        onClick,
      },
    });

    wrapper.find('button').trigger('click');
    expect(onClick).toBeCalled();
  });

  it('should be not trigger click event when disabled is true', () => {
    const onClick = vi.fn();
    const wrapper = mount(XButton, {
      props: {
        onClick,
        disabled: true,
      },
    });

    wrapper.find('button').trigger('click');
    expect(onClick).not.toBeCalled();
  });
});
```

## 源码实现

> x-button.vue

```vue
<template>
  <button :class="classes" :disabled="props.disabled" @click="handleClick">
    {{ props.text }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { buttonProps, buttonEmits, COMPONENT_NAME, useButton } from './button';

defineOptions({
  name: COMPONENT_NAME,
});

const props = defineProps(buttonProps);
const emits = defineEmits(buttonEmits);

const classes = computed(() => {
  let classNames = ['xbtn'];
  if (props.color === 'default') {
    classNames.push('default');
  } else {
    classNames.push(props.color);
  }
  return classNames;
});

/* @ts-ignore */
const { handleClick } = useButton(props, emits);
</script>

<style lang="scss" scoped>
.xbtn {
  margin: 0;
  border: none;
  padding: 10px 20px;
  display: inline-flex;
  color: #f8f8f8;
  &.default {
    background: #c8c9cc;
    color: #909399;
  }
  &.primary {
    background-color: #409eff;
  }
  &.info {
    background-color: #b1b3b8;
  }
  &.dadnger {
    background-color: #f56c6c;
  }
  &.success {
    background-color: #67c23a;
  }
  &.warning {
    background-color: #e6a23c;
  }
}
</style>
```

> button.ts

```ts
import { ExtractPropTypes, SetupContext } from 'vue';

export const COMPONENT_NAME = 'XButton';

const buttonColors = ['default', 'primary', 'success', 'info', 'danger', 'warning'];

export const buttonProps = {
  text: {
    type: String,
    default: 'button',
  },

  color: {
    type: String,
    values: buttonColors,
    default: 'default',
  },

  disabled: Boolean,
} as const;

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
};

export function useButton(props: ButtonPropsType, emit: SetupContext<ButtonEmitsType>['emit']) {
  function handleClick(e: MouseEvent) {
    if (props.disabled) {
      return;
    }
    emit('click', e);
  }

  return {
    handleClick,
  };
}

// types
export type ButtonPropsType = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmitsType = ExtractPropTypes<typeof buttonProps>;
```
