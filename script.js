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

    button4.addEventListener('click', function () {
        window.location.href = './pages/Services.html';
    });

    setActiveLink();
});

// underline///
document.addEventListener('DOMContentLoaded', function () {
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
        setUnderline(CategoryTabs[0]);

        CategoryTabs.forEach(option => {
            option.addEventListener('click', function () {
                setUnderline(option);
            });
        });
    }
});

// type selection
const CategoryTabs = document.querySelectorAll('.service-option');
const underline = document.querySelector('.underline');
const allCards = document.querySelectorAll('.ConsultationCards > div');

function setUnderline(option) {
    const optionRect = option.getBoundingClientRect();
    underline.style.width = `${optionRect.width}px`;
}

if (CategoryTabs.length) {
    CategoryTabs.forEach(option => {
        option.addEventListener('click', () => {
            CategoryTabs.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            setUnderline(option);

            const serviceType = option.getAttribute('data-service');
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
        });
    });
}

window.addEventListener('load', () => {
    const selectedTab = document.querySelector('.service-option.selected') || CategoryTabs[0];
    if (selectedTab) {
        selectedTab.classList.add('selected');
        setUnderline(selectedTab);
    } else {
        console.error('No selected tab found.');
    }
});

// -------------------------------------------------------------------------//
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
// --------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const moreServicesButton = document.querySelector('#FSbutton');

    if (moreServicesButton) {
        moreServicesButton.addEventListener('click', function () {
            console.log('Button clicked! Redirecting to services.html...');
            window.location.href = './pages/Services.html';
        });
    } else {
        console.error('Button with ID "FSbutton" not found.');
    }
});

// ---- select  ----
const selectElement = document.querySelector('.Select');
const cards = document.querySelectorAll('.ConsultationCards > div');

function updateCards() {
    const selectedOption = selectElement.querySelector('h4.selected').innerText;

    cards.forEach(card => {
        if (selectedOption === 'All Services') {
            card.style.display = 'block';
        } else if (selectedOption === 'Personal Growth') {
            card.style.display = (Array.from(cards).indexOf(card) < 3) ? 'block' : 'none';
        } else if (selectedOption === 'Career Ambitions') {
            card.style.display = (Array.from(cards).indexOf(card) >= 3) ? 'block' : 'none';
        }
    });
}

if (selectElement) {
    const serviceOptions = selectElement.querySelectorAll('h4');
    serviceOptions.forEach(option => {
        option.addEventListener('click', function () {
            serviceOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            updateCards();
        });
    });

    updateCards();
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');

            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    const button4 = document.getElementById('button4');
    const burger = document.getElementById('burger');
    const navLinksContainer = document.querySelector('.nav-links');
    const LogIn = document.querySelector('.log-in');
    
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
    burger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        burger.classList.toggle('toggle');
        updateButtonVisibility();
    });

    window.addEventListener('resize', updateButtonVisibility);

    // Initial setup
    updateButtonVisibility();
    handleScroll();

    function updateButtonVisibility() {
        if (window.innerWidth > 768) {
            LogIn.style.display = 'block';
        } else if (navLinksContainer.classList.contains('active')) {
            LogIn.style.display = 'block';
        } else {
            LogIn.style.display = 'none';
        }
    }

    // Event listeners for navigation links to enable smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    });

    window.addEventListener('scroll', handleScroll);
});

// services selection option2//
document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.querySelector('.Select');
    const dropdown = selectElement.querySelector('.dropdown-options'); // Ensure this targets the right element
    const dropdownOptions = dropdown.querySelectorAll('.dropdown-option');
    const cards = document.querySelectorAll('.ConsultationCards > div');
    const arrowIcon = selectElement.querySelector('.fa-angle-down'); // Target the arrow icon

    // Function to update the cards based on selected service
    function updateCards(serviceType) {
        cards.forEach(card => {
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

    // Toggle dropdown visibility when clicking the arrow
    arrowIcon.addEventListener('click', function () {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Handle option selection
    dropdownOptions.forEach(option => {
        option.addEventListener('click', function () {
            dropdownOptions.forEach(opt => opt.classList.remove('selected')); // Remove selected class from all options
            this.classList.add('selected'); // Add selected class to clicked option

            const serviceType = this.getAttribute('data-service');
            updateCards(serviceType); // Update the cards based on selected service
            selectElement.querySelector('.service-label').innerText = this.innerText; // Update the displayed selected service text
            dropdown.style.display = 'none'; // Hide dropdown after selection
        });
    });

    // Close dropdown if clicked outside
    window.addEventListener('click', function (e) {
        if (!selectElement.contains(e.target)) {
            dropdown.style.display = 'none'; // Close dropdown if the click was outside
        }
    });
});
