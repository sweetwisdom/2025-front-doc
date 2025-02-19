// 定义一个动画函数
function animate() {
    // 获取当前时间戳
    const timestamp = performance.now();

    // 在这里编写你的动画逻辑
    // 例如：移动一个元素的位置
    const element = document.getElementById('animatedElement');
    const newPosition = (timestamp / 10) % window.innerWidth; // 简单的水平移动
    element.style.left = `${newPosition}px`;

    // 请求下一帧动画
    requestAnimationFrame(animate);
}

// 启动动画
requestAnimationFrame(animate);