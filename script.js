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
            const section = document.querySelector(link.getAttribute('href'));
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

    setUnderline(CategoryTabs[0]);

    CategoryTabs.forEach(option => {
        option.addEventListener('click', function () {
            setUnderline(option);
        });
    });
});

// type selection


const CategoryTabs = document.querySelectorAll('.service-option');
const underline = document.querySelector('.underline');
const allCards = document.querySelectorAll('.ConsultationCards > div');


function setUnderline(option) {
    const optionRect = option.getBoundingClientRect();
    const parentRect = option.parentElement.getBoundingClientRect();

    underline.style.width = `${optionRect.width}px`;
}


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

window.addEventListener('load', () => {
    const selectedTab = document.querySelector('.service-option.selected') || CategoryTabs[0];
    selectedTab.classList.add('selected');
    setUnderline(selectedTab);
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
        console.error('Button with class "button4" not found.');
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
        }
        else if (selectedOption === 'Personal Growth') {
            card.style.display = (Array.from(cards).indexOf(card) < 3) ? 'block' : 'none';
        }
        else if (selectedOption === 'Career Ambitions') {
            card.style.display = (Array.from(cards).indexOf(card) >= 3) ? 'block' : 'none';
        }
    });
}

const serviceOptions = selectElement.querySelectorAll('h4');
serviceOptions.forEach(option => {
    option.addEventListener('click', function () {
        serviceOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        updateCards();
    });
});

updateCards();

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');

            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 900);
        });
    });
});


