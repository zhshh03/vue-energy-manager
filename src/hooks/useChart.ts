import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref,markRaw } from 'vue'
import * as echarts from 'echarts'

export const useChart = (chartRef: Ref<HTMLElement | null>, setChartData: any) => {
  const chartIntence = ref<echarts.ECharts|null>(null)

  const initChart = async() => {
    chartIntence.value = markRaw(echarts.init(chartRef.value))
    const options = await setChartData()
    chartIntence.value.setOption(options)
  }
  const resizeChart = () => {
    chartIntence.value?.resize()
  }
  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    if(chartIntence.value) {
      chartIntence.value.dispose()
      chartIntence.value = null
    }
  })
}