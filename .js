document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 移动端导航栏切换逻辑
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // 切换导航显示
        nav.classList.toggle('nav-active');

        // 链接动画
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // 汉堡按钮动画
        burger.classList.toggle('toggle');
    });

    // 2. 平滑滚动 (点击导航链接时)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // 如果是在移动端，点击链接后关闭菜单
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => link.style.animation = '');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 计算偏移量，减去导航栏高度
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. 滚动显现动画 (Intersection Observer)
    // 当元素进入视口时，添加 visible 类
    const observerOptions = {
        threshold: 0.1 // 元素出现 10% 时触发
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 可选：如果只想动画一次，取消注释下面这行
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 选择需要动画的元素 (这里以卡片为例)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // 初始状态可以在 CSS 中设置 opacity: 0, transform: translateY(20px)
        // 这里为了简单，我们直接在 JS 里加一个类，你需要在 CSS 中补充 .visible 的样式
        // 或者直接使用 CSS 中的 fade-in 类配合 observer
        
        // 简单示例：添加一个淡入效果
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(card);
    });

    // 修改 observer 回调以应用具体样式
    const showOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => showOnScroll.observe(card));

    // 4. 按钮点击交互示例
    const exploreBtn = document.getElementById('exploreBtn');
    if(exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            alert('欢迎进入数字敦煌虚拟游览系统！\n（此处可链接到具体的全景页面）');
            // window.location.href = 'tour.html'; 
        });
    }
});