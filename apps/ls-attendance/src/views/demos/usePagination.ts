import { ref, reactive, computed, watchEffect, watch } from 'vue';
import axios from 'axios';

export function usePagination(queryData, options) {
  const dataSource = ref([]);
  const loading = ref(false);
  const currentPage = ref(1);
  const currentPageSize = ref(10);
  const totalItems = ref(0);

  const run = async (params) => {
    loading.value = true;
    try {
      const response = await queryData(params);
      const formattedData = options.formatResult
        ? options.formatResult(response)
        : response.data;
      dataSource.value = formattedData;
      totalItems.value = totalItems.value = options.totalKey
        ? response.data[options.totalKey]
        : response.data.length;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.value = false;
    }
  };

  const {
    pagination: { currentKey = 'page', pageSizeKey = 'results' } = {},
    formatResult,
    totalKey,
  } = options;

  // 使用 watchEffect 替代 watch
  const stop = watchEffect(() => {
    const params = {
      [currentKey]: currentPage.value,
      [pageSizeKey]: currentPageSize.value,
    };
    run(params);
  });

  // 返回一个停止监听的函数，以便在组件卸载时清理
  return {
    data: dataSource,
    run,
    loading,
    current: currentPage,
    pageSize: currentPageSize,
    stop,
  };
}
