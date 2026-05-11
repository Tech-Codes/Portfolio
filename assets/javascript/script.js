// Particle System
        class ParticleSystem {
            constructor() {
                this.canvas = document.getElementById('particles-canvas');
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.mouse = { x: 0, y: 0 };
                this.init();
            }

            init() {
                this.resize();
                window.addEventListener('resize', () => this.resize());
                window.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                });
                this.animate();
                this.createParticles();
            }

            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            createParticles() {
                for (let i = 0; i < 100; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        radius: Math.random() * 2 + 1,
                        alpha: Math.random() * 0.5 + 0.2,
                        color: `hsl(${Math.random() * 60 + 220}, 70%, 60%)`
                    });
                }
            }

            animate() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.particles.forEach(particle => {
                    // Physics
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Bounce off edges
                    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
                    
                    // Mouse attraction
                    const dx = this.mouse.x - particle.x;
                    const dy = this.mouse.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        particle.vx += dx * 0.01;
                        particle.vy += dy * 0.01;
                    }
                    
                    // Draw
                    this.ctx.save();
                    this.ctx.globalAlpha = particle.alpha;
                    this.ctx.fillStyle = particle.color;
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                });
                
                requestAnimationFrame(() => this.animate());
            }
        }

        // Smooth Scrolling & Navbar
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize particles
            new ParticleSystem();

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                }

                // Scroll indicator
                const indicator = document.getElementById('scrollIndicator');
                if (window.scrollY > 300) {
                    indicator.classList.add('show');
                } else {
                    indicator.classList.remove('show');
                }
            });

            // Scroll indicator click
            document.getElementById('scrollIndicator').addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Smooth scrolling for nav links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });

            // Form submission
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you! Your message has been sent. 🚀');
                this.reset();
            });

            // Intersection Observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            });

            document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                el.style.transition = 'all 0.6s ease';
                observer.observe(el);
            });
        });

        // Typing effect for hero
        const text = "Creative Developer";
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                document.querySelector('.hero-subtitle').textContent = text.slice(0, i + 1) + '|';
                i++;
                setTimeout(typeWriter, 100);
            } else {
                document.querySelector('.hero-subtitle').textContent = text;
            }
        };
        setTimeout(typeWriter, 1500);



        // Enhanced Skills Section JavaScript
        class SkillsAnimator {
            constructor() {
                this.progressBars = document.querySelectorAll('.progress-fill');
                this.skillPoints = document.querySelectorAll('.skill-point');
                this.init();
            }

            init() {
                this.animateProgressBars();
                this.animateRadarChart();
                this.observeSkillsSection();
            }

            animateProgressBars() {
                this.progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }

            animateRadarChart() {
                // Animate skill points with stagger
                this.skillPoints.forEach((point, index) => {
                    setTimeout(() => {
                        point.classList.add('active');
                    }, index * 200);
                });
            }

            observeSkillsSection() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Trigger animations when skills section is visible
                            this.animateProgressBars();
                            this.animateRadarChart();
                        }
                    });
                }, { threshold: 0.3 });

                const skillsSection = document.querySelector('.skills-section');
                observer.observe(skillsSection);
            }
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            // Particle system (same as before)
            new ParticleSystem();
            
            // New Skills Animator
            new SkillsAnimator();

            // Rest of the JavaScript (navbar, smooth scroll, etc.) same as before
            // ... (previous JavaScript code)
        });