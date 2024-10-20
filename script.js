document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    const button4 = document.getElementById('button4');

    function resetLinkColors() {
        navLinks.forEach(link => {
            link.style.color = '';
        });
    }

    function setActiveLink() {
        let foundActive = false;

        navLinks.forEach(link => {
            const targetHref = link.getAttribute('href');
            const section = document.querySelector(targetHref.startsWith('#') ? targetHref : `#${targetHref.split('/').pop()}`);

            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop - 10 && window.scrollY < sectionTop + sectionHeight) {
                    resetLinkColors();
                    link.style.color = '#317F81';
                    foundActive = true;
                }
            }
        });

        if (!foundActive) {
            resetLinkColors();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            resetLinkColors();
            this.style.color = '#317F81';
            localStorage.setItem('activeLink', this.getAttribute('href'));
        });
    });

    window.addEventListener('scroll', setActiveLink);

    // Ensure button4 exists before adding the click event
    if (button4) {
        button4.addEventListener('click', function () {
            window.location.href = './pages/Services.html';
        });
    }

    setActiveLink();
});
// -------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const moreServicesButton = document.querySelector('#button4');

    if (moreServicesButton) {
        moreServicesButton.addEventListener('click', function () {
            console.log('Button clicked! Redirecting to services.html...');
            window.location.href = './pages/Services.html';
        });
    } else {
        console.error('Button with ID "button4" not found.');
    }
});
// ----------------------------------//

// ----------------------------------//
document.addEventListener('DOMContentLoaded', function () {
    const moreServicesButton = document.querySelector('#FSbutton');

    if (moreServicesButton) {
        moreServicesButton.addEventListener('click', function () {
            console.log('Button clicked! Redirecting to services.html...');
            window.location.href = './pages/Services.html';
        });
    } else {
        console.error('Button with ID "button4" not found.');
    }
});
// Underline functionality
const CategoryTabs = document.querySelectorAll('.service-option');
const underline = document.querySelector('.underline');

function setUnderline(option) {
    const optionRect = option.getBoundingClientRect();
    const selectRect = document.querySelector('.Select').getBoundingClientRect();

    const left = optionRect.left - selectRect.left;
    underline.style.left = `${left - 13}px`;
    underline.style.width = `${optionRect.width + 27}px`;
}

if (CategoryTabs.length) {
    setUnderline(CategoryTabs[0]); // Set initial underline position

    CategoryTabs.forEach(option => {
        option.addEventListener('click', function () {
            setUnderline(option); // Set underline on click
        });
    });
}

// Consultation card selection
const allCards = document.querySelectorAll('.ConsultationCards > div');

function updateCards(serviceType) {
    allCards.forEach(card => {
        if (serviceType === 'all') {
            card.style.display = 'block';
        } else if (serviceType === 'personal') {
            card.style.display = (
                card.classList.contains('Free-Consultation') ||
                card.classList.contains('Online-Coaching') ||
                card.classList.contains('Self-Improvement-Workshop')
            ) ? 'block' : 'none';
        } else if (serviceType === 'career') {
            card.style.display = (
                card.classList.contains('Corporate-Life') ||
                card.classList.contains('Career-Coaching') ||
                card.classList.contains('Group-Coaching')
            ) ? 'block' : 'none';
        }
    });
}

// Selecting category for consultation cards
if (CategoryTabs.length) {
    CategoryTabs.forEach(option => {
        option.addEventListener('click', () => {
            CategoryTabs.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            const serviceType = option.getAttribute('data-service');
            updateCards(serviceType);
            setUnderline(option); // Update underline when changing selection
        });
    });
}

// Scroll Up functionality
const scrollUp = document.querySelector('.ScrollUp');

function handleScroll() {
    if (window.scrollY > 600 && window.innerWidth <= 1024) {
        scrollUp.style.display = 'flex';
    } else {
        scrollUp.style.display = 'none';
    }
}

scrollUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Burger icon functionality
const burger = document.getElementById('burger');
const navLinksContainer = document.querySelector('.nav-links');
const LogIn = document.querySelector('.log-in');

burger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    burger.classList.toggle('toggle');
    updateButtonVisibility();
});

function updateButtonVisibility() {
    if (window.innerWidth > 768) {
        LogIn.style.display = 'block';
    } else if (navLinksContainer.classList.contains('active')) {
        LogIn.style.display = 'block';
    } else {
        LogIn.style.display = 'none';
    }
}

// Initialize functionality
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', updateButtonVisibility);

// Services selection with dropdown
const selectService = document.querySelector('.SelectService');
const dropdown = selectService.querySelector('.dropdown-options');
const dropdownOptions = dropdown.querySelectorAll('.dropdown-option');
const arrowIcon = selectService.querySelector('.fa-angle-down');
const serviceLabel = selectService.querySelector('.service-label');

arrowIcon.addEventListener('click', function () {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

dropdownOptions.forEach(option => {
    option.addEventListener('click', function () {
        dropdownOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');

        const serviceType = this.getAttribute('data-service');
        updateCards(serviceType);
        serviceLabel.innerText = this.innerText;
        dropdown.style.display = 'none';
    });
});

// Close dropdown if clicked outside
window.addEventListener('click', function (e) {
    if (selectService && !selectService.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});
