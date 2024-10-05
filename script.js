document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');


    function resetLinkColors() {
        navLinks.forEach(link => {
            link.style.color = '';
        });
    }

    const activeLink = localStorage.getItem('activeLink');
    if (activeLink) {
        const savedLink = document.querySelector(`a[href="${activeLink}"]`);
        if (savedLink) {
            savedLink.style.color = '#317F81';
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            resetLinkColors();
            this.style.color = '#317F81';
            localStorage.setItem('activeLink', this.getAttribute('href'));
        });
    });
});





const CategoryTabs = document.querySelectorAll('.service-option');
const underline = document.querySelector('.underline');

function setUnderline(option) {
    const optionRect = option.getBoundingClientRect();
    const selectRect = document.querySelector('.Select').getBoundingClientRect();

    const left = optionRect.left - selectRect.left + optionRect.width / 1 - 60;
    underline.style.left = `${left}px`;
}


setUnderline(CategoryTabs[0]);


CategoryTabs.forEach(option => {
    option.addEventListener('click', () => {
        CategoryTabs.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        setUnderline(option);

        const serviceType = option.getAttribute('data-service');
        const allCards = document.querySelectorAll('.ConsultationCards div');

        allCards.forEach(card => {
            if (serviceType === 'all') {
                card.style.display = 'block';
            } else if (serviceType === 'personal') {
                card.style.display = card.classList.contains('Free-Consultation') ||
                    card.classList.contains('Online-Coaching') ||
                    card.classList.contains('Self-Improvement-Workshop') ? 'block' : 'none';
            } else if (serviceType === 'career') {
                card.style.display = card.classList.contains('Corporate-Life') ||
                    card.classList.contains('Career-Coaching') ||
                    card.classList.contains('Group-Coaching') ? 'block' : 'none';
            }
        });
    });
});


// Initialize card display on page load
updateCards(currentSelection);



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
