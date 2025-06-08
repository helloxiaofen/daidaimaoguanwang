import React, { useRef, useEffect } from'react';
import * as echarts from 'echarts';
import { useQuery } from '@tanstack/react-query';
import { getOrderStats } from '../services/order';

const OrderStats = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { data: stats } = useQuery(['orderStats'], getOrderStats);

  useEffect(() => {
    if (chartRef.current && stats) {
      const chart = echarts.init(chartRef.current);
      chart.setOption({
        title: { text: '月订单统计' },
        xAxis: { type: 'category', data: stats.months },
        yAxis: { type: 'value' },
        series: [{
          name: '订单量',
          type: 'bar',
          data: stats.counts,
          itemStyle: { color: '#2196F3' }
        }]
      });
    }
  }, [stats]);

  return (
    <div className="order-stats">
      <h2>订单数据统计</h2>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
      <button 
        onClick={() => {
          const imgUrl = chartRef.current?.getElementsByClassName('ec-canvas')[0]?.toDataURL();
          if (imgUrl) {
            const a = document.createElement('a');
            a.href = imgUrl;
            a.download = '订单统计.png';
            a.click();
          }
        }}
      >
        导出图表
      </button>
    </div>
  );
};

export default OrderStats;