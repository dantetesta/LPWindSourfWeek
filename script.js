// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate nav items
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        navLinksItems.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .feature-card, .content-card, .bonus-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.003);
    }
});

// Add hover effect to cards
document.querySelectorAll('.feature-card, .content-card, .bonus-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// YouTube Player API
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        videoId: 'CRwHmYJA0M8',
        playerVars: {
            autoplay: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            enablejsapi: 1,
            modestbranding: 1,
            mute: 1,
            playsinline: 1,
            start: 170,
            playlist: 'CRwHmYJA0M8' // Required for looping
        },
        events: {
            onReady: function(e) {
                e.target.mute();
                e.target.playVideo();
                
                // Set quality after video starts
                setTimeout(() => {
                    e.target.setPlaybackQuality('hd1080');
                }, 1000);
            },
            onStateChange: function(e) {
                if (e.data === YT.PlayerState.ENDED) {
                    player.seekTo(170);
                    player.playVideo();
                }
            }
        }
    });
}

// Handle video resize
function handleVideoResize() {
    const videoContainer = document.querySelector('.video-container');
    const iframe = document.querySelector('#youtube-player');
    if (!videoContainer || !iframe) return;

    const containerWidth = videoContainer.offsetWidth;
    const containerHeight = videoContainer.offsetHeight;
    const aspectRatio = 16 / 9;

    let width = containerWidth;
    let height = containerWidth / aspectRatio;

    if (height < containerHeight) {
        height = containerHeight;
        width = height * aspectRatio;
    }

    iframe.style.width = width + 'px';
    iframe.style.height = height + 'px';
    iframe.style.left = (containerWidth - width) / 2 + 'px';
    iframe.style.top = (containerHeight - height) / 2 + 'px';
}

// Add resize listener
window.addEventListener('resize', handleVideoResize);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card, .content-card, .bonus-card {
        transition: transform 0.3s ease;
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
