// 安装依赖
npm install dhtmlx-gantt

// 使用示例（OrderStats.tsx）
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';

const initGantt = () => {
  gantt.init(chartRef.current);
  gantt.parse({
    data: [
      { id: 1, text: "订单#2024001", start_date: "2024-03-01", end_date: "2024-03-15", progress: 0.6 }
    ]
  });
};