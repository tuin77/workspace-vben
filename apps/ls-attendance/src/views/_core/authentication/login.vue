<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';

import { markRaw } from 'vue';
import { useRouter } from 'vue-router';

import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter';

import { Button, Checkbox } from 'ant-design-vue';

const registerPath = '/auth/register';
const showForgetPassword = true;

const forgetPasswordPath = '/auth/forget-password';
const showRegister = true;
const showRememberMe = true;

import type { BasicOption } from '@vben/types';

import { AuthenticationLogin, SliderCaptcha, z } from '@vben/common-ui';

import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'vben',
  },
];

const [Form, { setFieldValue, validate }] = useVbenForm(
  reactive({
    commonConfig: { hideLabel: true, hideRequiredMark: true },
    schema: [
      {
        component: 'Select',
        componentProps: {
          options: MOCK_USER_OPTIONS,
          placeholder: $t('authentication.selectAccount'),
        },
        fieldName: 'selectAccount',
        label: $t('authentication.selectAccount'),
        rules: z
          .string()
          .min(1, { message: $t('authentication.selectAccount') })
          .optional()
          .default('vben'),
      },
      {
        component: 'Input',
        componentProps: {
          size: 'large',
          placeholder: $t('authentication.usernameTip'),
        },
        dependencies: {
          trigger(values, form) {
            if (values.selectAccount) {
              const findUser = MOCK_USER_OPTIONS.find(
                (item) => item.value === values.selectAccount,
              );
              if (findUser) {
                form.setValues({
                  password: '123456',
                  username: findUser.value,
                });
              }
            }
          },
          triggerFields: ['selectAccount'],
        },
        fieldName: 'username',
        label: $t('authentication.username'),
        rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
      },
      {
        component: 'InputPassword',
        componentProps: {
          size: 'large',
          placeholder: $t('authentication.password'),
        },
        fieldName: 'password',
        label: $t('authentication.password'),
        rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
      },
      {
        component: markRaw(SliderCaptcha),
        fieldName: 'captcha',
        rules: z.boolean().refine((value) => value, {
          message: $t('authentication.verifyRequiredTip'),
        }),
      },
    ],
    showDefaultActions: false,
  }),
);
const router = useRouter();

const REMEMBER_ME_KEY = `REMEMBER_ME_USERNAME_${location.hostname}`;

const localUsername = localStorage.getItem(REMEMBER_ME_KEY) || '';

const rememberMe = ref(!!localUsername);

async function handleSubmit() {
  const { valid, values } = await validate();
  if (valid) {
    localStorage.setItem(
      REMEMBER_ME_KEY,
      rememberMe.value ? values?.username : '',
    );

    authStore.authLogin(values as { password: string; username: string });
  }
}

function handleGo(path: string) {
  router.push(path);
}

onMounted(() => {
  if (localUsername) {
    setFieldValue('username', localUsername);
  }
});
</script>

<template>
  <div @keydown.enter.prevent="handleSubmit">
    <div class="mb-7 sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl"
      >
        {{ `${$t('authentication.welcomeBack')} 👋🏻` }}
      </h2>

      <p class="text-muted-foreground lg:text-md text-sm">
        <span class="text-muted-foreground">
          {{ $t('authentication.loginSubtitle') }}
        </span>
      </p>
    </div>

    <Form></Form>

    <div
      v-if="showRememberMe || showForgetPassword"
      class="mb-6 flex justify-between"
    >
      <div class="flex-center">
        <Checkbox
          v-if="showRememberMe"
          v-model:checked="rememberMe"
          name="rememberMe"
        >
          {{ $t('authentication.rememberMe') }}
        </Checkbox>
      </div>

      <span
        v-if="showForgetPassword"
        class="text-primary hover:text-primary-hover active:text-primary-active cursor-pointer text-sm font-normal"
        @click="handleGo(forgetPasswordPath)"
      >
        {{ $t('authentication.forgetPassword') }}
      </span>
    </div>
    <Button
      :class="{
        'cursor-wait': authStore.loginLoading,
      }"
      :loading="authStore.loginLoading"
      aria-label="login"
      class="w-full"
      @click="handleSubmit"
    >
      {{ $t('common.login') }}
    </Button>

    <div v-if="showRegister" class="mt-3 text-center text-sm">
      {{ $t('authentication.accountTip') }}
      <span
        class="text-primary hover:text-primary-hover active:text-primary-active cursor-pointer text-sm font-normal"
        @click="handleGo(registerPath)"
      >
        {{ $t('authentication.createAccount') }}
      </span>
    </div>
  </div>
</template>
