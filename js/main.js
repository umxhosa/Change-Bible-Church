// Change Bible Church - Header JavaScript
// Author: Temba Gobingca
// Description: Handles mobile menu toggle, header interactions, and responsive behavior

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryMenu = document.querySelector('#primary-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const siteHeader = document.querySelector('.site-header');
    const mainNavigation = document.querySelector('.main-navigation');
    
    // Bento Menu Elements
    const bentoMenuToggle = document.getElementById('menuToggle');
    const bentoMenu = document.getElementById('bentoMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    let isMenuOpen = false;
    
    // Check if standard mobile menu elements exist
    if (menuToggle && (primaryMenu || mainNavigation)) {
        
        // Toggle mobile menu
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle menu visibility (check which element exists)
            const targetMenu = mainNavigation || primaryMenu;
            targetMenu.classList.toggle('menu-open');
            
            // Toggle hamburger icon animation
            if (menuIcon) {
                menuIcon.classList.toggle('menu-active');
            }
            
            // Toggle body scroll lock when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = event.target.closest('.main-navigation');
            const isClickOnToggle = event.target.closest('.menu-toggle');
            const targetMenu = mainNavigation || primaryMenu;
            const isMenuOpen = targetMenu.classList.contains('menu-open');
            
            if (!isClickInsideNav && !isClickOnToggle && isMenuOpen) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            const targetMenu = mainNavigation || primaryMenu;
            if (event.key === 'Escape' && targetMenu.classList.contains('menu-open')) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when window is resized to desktop
        window.addEventListener('resize', function() {
            const targetMenu = mainNavigation || primaryMenu;
            if (window.innerWidth > 767 && targetMenu.classList.contains('menu-open')) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when clicking on menu items
        const menuItems = document.querySelectorAll('.menu-item a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 767) {
                    closeMobileMenu();
                }
            });
        });
        
        // Handle keyboard navigation in mobile menu
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                const targetMenu = mainNavigation || primaryMenu;
                if (targetMenu.classList.contains('menu-open') && window.innerWidth <= 767) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextIndex = (index + 1) % menuItems.length;
                        menuItems[nextIndex].focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevIndex = index === 0 ? menuItems.length - 1 : index - 1;
                        menuItems[prevIndex].focus();
                    }
                }
            });
        });
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        if (menuToggle && (mainNavigation || primaryMenu)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            const targetMenu = mainNavigation || primaryMenu;
            targetMenu.classList.remove('menu-open');
            if (menuIcon) {
                menuIcon.classList.remove('menu-active');
            }
            document.body.classList.remove('menu-open');
        }
    }
    
    // Bento Menu Functionality
    function toggleBentoMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            if (bentoMenuToggle) bentoMenuToggle.classList.add('menu-active');
            if (bentoMenu) bentoMenu.classList.add('active');
            if (menuOverlay) menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            if (bentoMenuToggle) bentoMenuToggle.classList.remove('menu-active');
            if (bentoMenu) bentoMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Bento menu event listeners
    if (bentoMenuToggle) {
        bentoMenuToggle.addEventListener('click', toggleBentoMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleBentoMenu);
    }
    
    // Close bento menu when clicking on menu items
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            toggleBentoMenu();
        });
    });
    
    // Close bento menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleBentoMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            }
        });
    });
    
    // Header scroll behavior
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling changes
        if (siteHeader) {
            if (scrollTop > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Phone number click tracking (optional analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone number clicked:', this.href);
        });
    });
    
    // Social media click tracking (optional analytics)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Social link clicked:', this.href);
        });
    });
    
    // Donate button click handling
    const donateButton = document.querySelector('.donate-button');
    if (donateButton) {
        donateButton.addEventListener('click', function(e) {
            console.log('Donate button clicked');
            // Add your donation handling logic here
        });
    }
    
    // Ministry card functionality
    const ministryCards = document.querySelectorAll('.ministry-card');
    const learnMoreButtons = document.querySelectorAll('button');
    
    // Add click handlers for Learn More buttons
    learnMoreButtons.forEach(button => {
        if (button.textContent.includes('Learn More')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.ministry-card');
                const ministry = card ? card.dataset.ministry : 'Unknown';
                
                // Simple alert for demonstration - replace with actual navigation
                alert(`Redirecting to ${ministry} ministry page...`);
                
                // Add a loading state
                this.innerHTML = 'Loading...';
                setTimeout(() => {
                    this.innerHTML = 'Learn More →';
                }, 1000);
            });
        }
    });
    
    // Contact Us button handler
    const contactButton = document.querySelector('button:last-child');
    if (contactButton && !contactButton.textContent.includes('Learn More')) {
        contactButton.addEventListener('click', function() {
            alert('Contact form would open here!');
        });
    }
    
    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add hover sound effect simulation
    ministryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Simulate hover sound (you could replace this with actual audio)
            console.log('Hover sound effect for', this.dataset.ministry);
        });
    });
    
    // Add keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Enhance focus visibility
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Preload images for better performance
    const imagesToPreload = [
        'images/CBC2.jpg',
        'images/CBC4.jpg'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Console log for debugging
    console.log('Change Bible Church - Header JavaScript loaded successfully');
});

// Ministry details helper function
function loadMinistryDetails(ministryType) {
    const details = {
        mens: "Men's Ministry meets every Saturday at 7 AM for breakfast and Bible study.",
        womens: "Women's Ministry hosts monthly retreats and weekly prayer circles.",
        childrens: "Children's Ministry serves ages 3-12 with Sunday school and special events.",
        foundations: "Foundations Ministry offers 8-week courses for new believers.",
        membership: "Membership Ministry guides you through our 4-step membership process."
    };
    
    return details[ministryType] || "More information coming soon!";
}