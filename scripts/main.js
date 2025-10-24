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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
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

// Add active state to navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.main-section, .summary');
    const navLinks = document.querySelectorAll('.header-nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize print functionality
    setupPrint();
    
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

// Add active class to current section in navigation
function highlightNavigation() {
    const sections = document.querySelectorAll('.main-section, .summary');
    const navLinks = document.querySelectorAll('.header-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Call the function on scroll
window.addEventListener('scroll', highlightNavigation);

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
    
    console.log('Resume loaded successfully with enhanced print features');
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
