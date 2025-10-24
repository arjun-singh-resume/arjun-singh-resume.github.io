// Main JavaScript for interactive functionality

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Enhanced print functionality with automatic settings
function setupPrint() {
    const printButton = document.querySelector('.print-button');
    
    printButton.addEventListener('click', function() {
        // Create a custom print stylesheet for better control
        const printCSS = `
            @page {
                size: letter;
                margin: 0;
            }
            body {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .sidebar, .page-2-sidebar {
                background: linear-gradient(to bottom, #1a3a5f, #2c5282) !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .resume-container, .page-2 {
                margin: 0 !important;
                box-shadow: none !important;
                min-height: 11in !important;
            }
        `;
        
        // Add the print styles
        const style = document.createElement('style');
        style.innerHTML = printCSS;
        style.setAttribute('media', 'print');
        document.head.appendChild(style);
        
        // Show print dialog
        if (confirm('Ready to print your resume?\n\nAuto settings applied:\n• Paper size: Letter\n• Margins: None\n• Background graphics: Enabled')) {
            window.print();
        }
        
        // Remove the style after printing
        const cleanup = () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
        
        // Cleanup after print or if user cancels
        window.addEventListener('afterprint', cleanup);
        setTimeout(cleanup, 2000);
    });
    
    // Also handle Ctrl+P
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            printButton.click();
        }
    });
}

// Enhanced navigation with active highlighting
function setupNavigation() {
    const sections = document.querySelectorAll('.main-section, .summary');
    const navLinks = document.querySelectorAll('.header-nav a');
    
    // Remove highlight from all sections
    function removeHighlights() {
        sections.forEach(section => {
            section.classList.remove('highlight');
        });
    }
    
    // Add highlight to current section
    function highlightSection(sectionId) {
        removeHighlights();
        const currentSection = document.getElementById(sectionId);
        if (currentSection) {
            currentSection.classList.add('highlight');
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                currentSection.classList.remove('highlight');
            }, 5000);
        }
    }
    
    // Update active nav link and highlight section
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scroll with highlight
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the section
                setTimeout(() => {
                    highlightSection(targetId);
                }, 500);
                
                // Update active nav
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial update
    updateActiveNav();
}

// Add loading animation and setup navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize print functionality
    setupPrint();
    
    // Initialize navigation with highlighting
    setupNavigation();
    
    // Add fade-in animation to elements
    const elements = document.querySelectorAll('.resume-container, .page-2');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Handle responsive behavior
function handleResize() {
    const headerNav = document.querySelector('.header-nav');
    if (window.innerWidth <= 768) {
        // Add mobile-specific behaviors if needed
    } else {
        // Remove mobile-specific behaviors if needed
    }
}

// Initialize on load
window.addEventListener('load', function() {
    handleResize();
    
    // Ensure sidebars have full height
    const sidebars = document.querySelectorAll('.sidebar, .page-2-sidebar');
    sidebars.forEach(sidebar => {
        sidebar.style.minHeight = '11in';
    });
    
    console.log('Resume loaded successfully with enhanced navigation');
});

// Handle window resize
window.addEventListener('resize', handleResize);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close modals (if any added in future)
    if (e.key === 'Escape') {
        // Handle escape key functionality
    }
    
    // Enter key on print button
    if (e.key === 'Enter' && document.activeElement.classList.contains('print-button')) {
        document.querySelector('.print-button').click();
    }
});

// Add click outside to close mobile menu (if needed in future)
document.addEventListener('click', function(e) {
    if (!e.target.closest('.header-nav') && !e.target.closest('.print-button')) {
        // Handle mobile menu close if implemented later
    }
});
