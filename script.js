// Initialize external libraries
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Initialize AOS (Animate on Scroll)
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // 3. Navbar Glassmorphism Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-space-900/80', 'border-space-800');
            navbar.classList.remove('bg-space-900/20', 'border-transparent');
        } else {
            navbar.classList.remove('bg-space-900/80', 'border-space-800');
            navbar.classList.add('bg-space-900/20', 'border-transparent');
        }
    });

    // 4. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
        mobileNav.classList.toggle('flex');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.add('hidden');
            mobileNav.classList.remove('flex');
        });
    });

    // 5. Count-Up Animation for Metrics
    const animateCountUp = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.innerText = current.toFixed(decimals);
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target.toFixed(decimals);
            }
        };
        updateCounter();
    };

    // Trigger count-up when in view
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => animateCountUp(counter));
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.grid.grid-cols-2');
    if (statsSection) observer.observe(statsSection);
});

// ==========================================
    // 6. Image Comparison Slider Logic
    // ==========================================
    
    // CONFIG FLAG: Set to false to hide demo elements if needed
    const isDemoMode = true; 

    const sliderContainer = document.getElementById('slider-container');
    const sliderHandle = document.getElementById('slider-handle');
    const sliderOverlay = document.getElementById('slider-overlay');
    let isDragging = false;

    if (sliderContainer && sliderHandle && sliderOverlay && isDemoMode) {
        
        const moveSlider = (clientX) => {
            const rect = sliderContainer.getBoundingClientRect();
            // Calculate percentage based on mouse position within the container
            let position = ((clientX - rect.left) / rect.width) * 100;
            
            // Constrain between 0% and 100%
            position = Math.max(0, Math.min(position, 100));
            
            // Update handle position and image clipping path
            sliderHandle.style.left = `${position}%`;
            sliderOverlay.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
        };

        // Mouse Events
        sliderContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            moveSlider(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        });

        // Touch Events (Mobile Support)
        sliderContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            moveSlider(e.touches[0].clientX);
        }, {passive: true});

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            moveSlider(e.touches[0].clientX);
        }, {passive: true});
    }

    // ==========================================
    // 7. Match Points Toggle Logic
    // ==========================================
    const matchPointsToggle = document.getElementById('toggle-match-points');
    const matchPointsContainer = document.getElementById('match-points-container');

    // Dummy coordinate data (percentages) to mimic actual match points
    const dummyMatchPoints = [
        { x: 25, y: 30 }, { x: 45, y: 60 }, { x: 75, y: 40 }, 
        { x: 15, y: 80 }, { x: 85, y: 20 }, { x: 55, y: 15 },
        { x: 65, y: 75 }, { x: 35, y: 50 }, { x: 80, y: 85 }
    ];

    if (matchPointsToggle && matchPointsContainer) {
        
        // Generate the HTML for the points
        dummyMatchPoints.forEach(point => {
            const dot = document.createElement('div');
            dot.className = 'absolute w-3 h-3 border border-accent-cyan rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 opacity-80';
            dot.style.left = `${point.x}%`;
            dot.style.top = `${point.y}%`;
            
            const innerDot = document.createElement('div');
            innerDot.className = 'w-1 h-1 bg-accent-cyan rounded-full';
            
            dot.appendChild(innerDot);
            matchPointsContainer.appendChild(dot);
        });

        // Toggle visibility
        matchPointsToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                matchPointsContainer.classList.remove('hidden');
            } else {
                matchPointsContainer.classList.add('hidden');
            }
        });
    }

    // ==========================================
// 0. Placeholder Metrics Data (Edit here later)
// ==========================================
const metricsData = {
    labels: ['OHRC (High Res)', 'TMC-2 (Med Res)', 'IIRS (Low Res)'],
    // Inlier Ratio % (Higher is better)
    inlierRatios: [96.4, 92.1, 88.5],
    // RMSE in pixels (Lower is better)
    rmseScores: [0.32, 0.45, 0.61]
};

// ==========================================
    // 8. Chart.js Initialization
    // ==========================================
    const ctx = document.getElementById('performanceChart');
    
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: metricsData.labels,
                datasets: [
                    {
                        label: 'Inlier Ratio (%)',
                        data: metricsData.inlierRatios,
                        backgroundColor: 'rgba(102, 252, 241, 0.8)', // accent-cyan
                        borderColor: '#66FCF1',
                        borderWidth: 1,
                        borderRadius: 2,
                        yAxisID: 'y'
                    },
                    {
                        label: 'RMSE (pixels)',
                        data: metricsData.rmseScores,
                        backgroundColor: 'rgba(69, 162, 158, 0.5)', // accent-muted
                        borderColor: '#45A29E',
                        borderWidth: 1,
                        borderRadius: 2,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#C5C6C7', // accent-silver
                            font: { family: "'JetBrains Mono', monospace", size: 11 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1F2833',
                        titleColor: '#fff',
                        bodyColor: '#C5C6C7',
                        borderColor: '#45A29E',
                        borderWidth: 1,
                        font: { family: "'Inter', sans-serif" }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(31, 40, 51, 0.5)' },
                        ticks: { color: '#C5C6C7', font: { family: "'Inter', sans-serif" } }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Inlier Ratio (%)',
                            color: '#66FCF1',
                            font: { family: "'JetBrains Mono', monospace", size: 10 }
                        },
                        grid: { color: 'rgba(31, 40, 51, 0.5)' },
                        ticks: { color: '#C5C6C7' },
                        suggestedMin: 50,
                        suggestedMax: 100
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'RMSE (px)',
                            color: '#45A29E',
                            font: { family: "'JetBrains Mono', monospace", size: 10 }
                        },
                        grid: { drawOnChartArea: false }, // Prevent gridline overlap
                        ticks: { color: '#C5C6C7' },
                        suggestedMin: 0,
                        suggestedMax: 1.0
                    }
                }
            }
        });
    }   

    // ==========================================
    // 9. Dataset Selector Logic
    // ==========================================
    const datasetBtns = document.querySelectorAll('.dataset-btn');
    const demoRefImage = document.querySelector('#slider-container img[alt="Reference Image"]');
    const demoSrcImage = document.querySelector('#slider-overlay img[alt="Registered Source Image"]');
    
    // Grab the metric elements
    const rmseDisplay = document.querySelector('[data-target="0.32"]').parentElement; // Finds the RMSE text
    const inlierDisplay = document.querySelector('[data-target="2418"]').parentElement;
    
    // EDIT: Add your actual pre-processed image paths and metrics here
    const testCases = [
        {
            name: "OHRC",
            refImage: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000", 
            srcImage: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000",
            rmse: "0.32",
            inliers: "2418"
        },
        {
            name: "TMC",
            refImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000", // Swap with real TMC ref
            srcImage: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?q=80&w=1000", // Swap with real TMC src
            rmse: "0.45",
            inliers: "1850"
        },
        {
            name: "IIRS",
            refImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000", // Swap with real IIRS ref
            srcImage: "https://images.unsplash.com/photo-1614726365723-48ee367f3392?q=80&w=1000", // Swap with real IIRS src
            rmse: "0.61",
            inliers: "920"
        }
    ];

    datasetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active button styling
            datasetBtns.forEach(b => {
                b.classList.remove('border-accent-cyan', 'bg-accent-cyan/10', 'text-accent-cyan');
                b.classList.add('border-space-700', 'text-accent-silver');
            });
            e.target.classList.remove('border-space-700', 'text-accent-silver');
            e.target.classList.add('border-accent-cyan', 'bg-accent-cyan/10', 'text-accent-cyan');

            // Swap images and text
            const caseIndex = e.target.getAttribute('data-case');
            const data = testCases[caseIndex];
            
            if (demoRefImage && demoSrcImage) {
                demoRefImage.src = data.refImage;
                demoSrcImage.src = data.srcImage;
            }
            
            // Update the metrics display instantly
            if (rmseDisplay) rmseDisplay.innerHTML = `${data.rmse} <span class="text-lg text-space-700">px</span>`;
            if (inlierDisplay) inlierDisplay.innerHTML = `${data.inliers}`;
        });
    });