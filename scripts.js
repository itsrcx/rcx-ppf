document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to dark theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(themeToggle, true);
    }

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcon(themeToggle, isLight);
    });

    // Update theme icon
    function updateThemeIcon(toggleButton, isLight) {
        const icon = toggleButton.querySelector('i');
        if (isLight) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Skill progress bar animation
    const skillItems = document.querySelectorAll('.skill-item');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar && !progressBar.classList.contains('animated')) {
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.setProperty('--progress-width', width + '%');
                    progressBar.style.width = width + '%';
                    progressBar.classList.add('animated');
                }
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    // Fallback for immediate animation on desktop
    setTimeout(() => {
        skillItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                const progressBar = item.querySelector('.skill-progress');
                if (progressBar && !progressBar.classList.contains('animated')) {
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.width = width + '%';
                    progressBar.classList.add('animated');
                }
            }
        });
    }, 500);

    // Add stagger animation to cards
    const cards = document.querySelectorAll('.cert-card, .portfolio-item, .detail-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
});
