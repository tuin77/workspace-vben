<script setup lang="ts">
<<<<<<< HEAD
import { computed, toRaw, unref } from 'vue';

import { useSimpleLocale } from '@vben-core/composables';
import { VbenExpandableArrow } from '@vben-core/shadcn-ui';
import { cn, isFunction } from '@vben-core/shared/utils';
=======
import { computed, toRaw, unref, watch } from 'vue';

import { useSimpleLocale } from '@vben-core/composables';
import { VbenExpandableArrow } from '@vben-core/shadcn-ui';
import { cn, isFunction, triggerWindowResize } from '@vben-core/shared/utils';
>>>>>>> target

import { COMPONENT_MAP } from '../config';
import { injectFormProps } from '../use-form-context';

const { $t } = useSimpleLocale();

const [rootProps, form] = injectFormProps();

const collapsed = defineModel({ default: false });

const resetButtonOptions = computed(() => {
  return {
<<<<<<< HEAD
    show: true,
    text: `${$t.value('reset')}`,
=======
    content: `${$t.value('reset')}`,
    show: true,
>>>>>>> target
    ...unref(rootProps).resetButtonOptions,
  };
});

const submitButtonOptions = computed(() => {
  return {
<<<<<<< HEAD
    show: true,
    text: `${$t.value('submit')}`,
=======
    content: `${$t.value('submit')}`,
    show: true,
>>>>>>> target
    ...unref(rootProps).submitButtonOptions,
  };
});

<<<<<<< HEAD
const isQueryForm = computed(() => {
  return !!unref(rootProps).showCollapseButton;
});

const queryFormStyle = computed(() => {
  if (isQueryForm.value) {
=======
// const isQueryForm = computed(() => {
//   return !!unref(rootProps).showCollapseButton;
// });

const queryFormStyle = computed(() => {
  if (!unref(rootProps).actionWrapperClass) {
>>>>>>> target
    return {
      'grid-column': `-2 / -1`,
      marginLeft: 'auto',
    };
  }

  return {};
});

async function handleSubmit(e: Event) {
  e?.preventDefault();
  e?.stopPropagation();
  const { valid } = await form.validate();
  if (!valid) {
    return;
  }
  await unref(rootProps).handleSubmit?.(toRaw(form.values));
}

async function handleReset(e: Event) {
  e?.preventDefault();
  e?.stopPropagation();
  const props = unref(rootProps);
  if (isFunction(props.handleReset)) {
    await props.handleReset?.(form.values);
  } else {
    form.resetForm();
  }
}
<<<<<<< HEAD
</script>
<template>
  <div
    :class="cn('col-span-full w-full text-right', rootProps.actionWrapperClass)"
=======

watch(
  () => collapsed.value,
  () => {
    const props = unref(rootProps);
    if (props.collapseTriggerResize) {
      triggerWindowResize();
    }
  },
);
</script>
<template>
  <div
    :class="
      cn('col-span-full w-full pb-6 text-right', rootProps.actionWrapperClass)
    "
>>>>>>> target
    :style="queryFormStyle"
  >
    <component
      :is="COMPONENT_MAP.DefaultResetActionButton"
      v-if="resetButtonOptions.show"
      class="mr-3"
      type="button"
      @click="handleReset"
      v-bind="resetButtonOptions"
    >
<<<<<<< HEAD
      {{ resetButtonOptions.text }}
=======
      {{ resetButtonOptions.content }}
>>>>>>> target
    </component>

    <component
      :is="COMPONENT_MAP.DefaultSubmitActionButton"
      v-if="submitButtonOptions.show"
      type="button"
      @click="handleSubmit"
      v-bind="submitButtonOptions"
    >
<<<<<<< HEAD
      {{ submitButtonOptions.text }}
=======
      {{ submitButtonOptions.content }}
>>>>>>> target
    </component>

    <VbenExpandableArrow
      v-if="rootProps.showCollapseButton"
      v-model:model-value="collapsed"
      class="ml-2"
    >
      <span>{{ collapsed ? $t('expand') : $t('collapse') }}</span>
    </VbenExpandableArrow>
  </div>
</template>
