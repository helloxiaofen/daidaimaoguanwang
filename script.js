// 引入Chart.js
document.head.innerHTML += '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>';

// 订单管理
let orders = JSON.parse(localStorage.getItem('orders')) || [];
const orderForm = document.getElementById('orderForm');
const totalOrders = document.getElementById('totalOrders');
const totalAmount = document.getElementById('totalAmount');
const orderList = document.getElementById('orderList');

// 初始化图表
let orderChart, progressChart;

function initCharts() {
    // 订单状态统计图表
    const orderCtx = document.createElement('canvas');
    orderCtx.id = 'orderChart';
    document.querySelector('.stats').appendChild(orderCtx);
    
    orderChart = new Chart(orderCtx, {
        type: 'doughnut',
        data: {
            labels: ['未处理', '处理中', '已完成'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#f44336', '#ff9800', '#4caf50']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // 进度统计图表
    const progressCtx = document.createElement('canvas');
    progressCtx.id = 'progressChart';
    document.querySelector('.stats').appendChild(progressCtx);
    
    progressChart = new Chart(progressCtx, {
        type: 'bar',
        data: {
            labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
            datasets: [{
                label: '订单进度分布',
                data: [0, 0, 0, 0, 0],
                backgroundColor: '#2196F3'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function updateOrderStats() {
    totalOrders.textContent = orders.length;
    totalAmount.textContent = orders.reduce((sum, o) => sum + Number(o.amount), 0).toLocaleString();

    // 更新状态统计图表
    const statusCounts = {
        '未处理': 0,
        '处理中': 0,
        '已完成': 0
    };
    orders.forEach(order => statusCounts[order.status]++);
    orderChart.data.datasets[0].data = Object.values(statusCounts);
    orderChart.update();

    // 更新进度统计图表
    const progressRanges = [0, 0, 0, 0, 0];
    orders.forEach(order => {
        const progress = Number(order.progress);
        if (progress <= 20) progressRanges[0]++;
        else if (progress <= 40) progressRanges[1]++;
        else if (progress <= 60) progressRanges[2]++;
        else if (progress <= 80) progressRanges[3]++;
        else progressRanges[4]++;
    });
    progressChart.data.datasets[0].data = progressRanges;
    progressChart.update();
}

// 订单管理（升级后）
function renderOrders() {
    orderList.innerHTML = orders.map(order => `
        <div class="order-item">
            <p><strong>订单号：</strong>${order.id}</p>
            <p><strong>金额：</strong>${Number(order.amount).toLocaleString()}元</p>
            <p><strong>日期：</strong>${order.date}</p>
            <p class="order-status ${order.status}">${order.status}</p>
            <div class="order-progress">
                <div class="order-progress-bar" style="width: ${order.progress}%"></div>
                <span class="progress-text">${order.progress}%</span>
            </div>
        </div>
    `).join('');
}

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newOrder = {
        id: document.getElementById('orderId').value,
        amount: document.getElementById('orderAmount').value,
        date: document.getElementById('orderDate').value,
        status: document.getElementById('orderStatus').value,
        progress: document.getElementById('orderProgress').value
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    updateOrderStats();
    renderOrders();
    e.target.reset();
    
    // 添加新订单的动画效果
    const newOrderElement = orderList.lastElementChild;
    newOrderElement.style.opacity = '0';
    newOrderElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newOrderElement.style.transition = 'all 0.3s ease';
        newOrderElement.style.opacity = '1';
        newOrderElement.style.transform = 'translateY(0)';
    }, 50);
});

// 初始化
initCharts();
updateOrderStats();
renderOrders();

// 社区论坛（简化版）
let posts = JSON.parse(localStorage.getItem('posts')) || [];
const postForm = document.getElementById('postForm');
const postList = document.getElementById('postList');

function renderPosts() {
    postList.innerHTML = posts.map(post => `
        <div class="post-item">
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            <div class="post-replies">
                ${post.replies.map(reply => `<p>- ${reply}</p>`).join('')}
            </div>
            <form class="reply-form">
                <input type="text" placeholder="输入回复" class="reply-input">
                <button type="submit">回复</button>
            </form>
        </div>
    `).join('');

    // 绑定回复表单事件
    document.querySelectorAll('.reply-form').forEach((form, index) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const replyText = form.querySelector('.reply-input').value;
            posts[index].replies.push(replyText);
            localStorage.setItem('posts', JSON.stringify(posts));
            renderPosts();
        });
    });
}

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    posts.push({
        title: document.getElementById('postTitle').value,
        content: document.getElementById('postContent').value,
        replies: []
    });
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
    e.target.reset();
});

// 初始化帖子数据
renderPosts();

// 轮播图自动切换
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-img');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    const offset = -currentSlide * 100;
    document.querySelector('.slider-container').style.transform = `translateX(${offset}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

// 自动切换（每5秒）
setInterval(() => showSlide(currentSlide + 1), 5000);

// 点击圆点切换
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// 添加滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
});