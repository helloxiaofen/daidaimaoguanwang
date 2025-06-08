import React from'react';
import './Logo.scss';

const Logo = () => {
  return (
    <div className="logo-container">
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
        {/* 猫咪轮廓 */}
        <path 
          d="M10 20 Q20 5 30 20 T50 35 Q60 50 70 35 T90 20 Q100 5 110 20" 
          stroke="#673AB7" 
          strokeWidth="2"
          fill="url(#catGradient)"
        />
        {/* 代码波浪尾巴 */}
        <path 
          d="M80 35 C85 40 90 30 95 35 C100 40 105 30 110 35" 
          stroke="#90CAF9" 
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="catGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7E57C2" />
            <stop offset="100%" stopColor="#3949AB" />
          </linearGradient>
        </defs>
      </svg>
      <h1 className="logo-text">代代猫科技</h1>
    </div>
  );
};

export default Logo;