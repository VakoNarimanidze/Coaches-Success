document.addEventListener('DOMContentLoaded', function () {
    const button4 = document.getElementById('button4');
    const moreServicesButton = document.querySelector('#FSbutton');
    const aboutMeButton = document.querySelector('.FirstButt')
    const scrollUp = document.querySelector('.ScrollUp');
    const burger = document.getElementById('burger');
    const navLinksContainer = document.querySelector('.nav-links');
    const LogIn = document.querySelector('.log-in');
    const selectService = document.querySelector('.SelectService');
    const dropdown = selectService ? selectService.querySelector('.dropdown-options') : null;
    const dropdownOptions = dropdown ? dropdown.querySelectorAll('.dropdown-option') : [];
    const arrowIcon = selectService ? selectService.querySelector('.fa-angle-down') : null;
    const serviceLabel = selectService ? selectService.querySelector('.service-label') : null;

      
    // Button 4 functionality
    if (button4) {
        button4.addEventListener('click', function () {
            console.log('Button clicked! Redirecting to services.html...');
            window.location.href = 'services.html';
        });
    } else {
        console.error('Button with ID "button4" not found.');
    }

    // More services button functionality
    if (moreServicesButton) {
        moreServicesButton.addEventListener('click', function () {
            console.log('Button clicked! Redirecting to services.html...');
            window.location.href = 'services.html';
        });
    } else {
        console.error('Button with ID "FSbutton" not found.');
    }
    // About Me Button Click Functionality
    if (aboutMeButton) {
        aboutMeButton.addEventListener('click', function () {
            console.log('Button clicked! Redirecting to aboutMe.html...');
            window.location.href = 'aboutMe.html';
        });
    } else {
        console.error('Button with class "FirstButt" not found.');
    }

    // Underline functionality for category tabs
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
                CategoryTabs.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                const serviceType = option.getAttribute('data-service');
                updateCards(serviceType);
                setUnderline(option); // Update underline when changing selection
            });
        });
    }

    // Consultation card selection functionality
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

    // Scroll Up functionality
    function handleScroll() {
        if (scrollUp) {
            if (window.scrollY > 500 && window.innerWidth <= 1024) {
                scrollUp.style.display = 'flex';
            } else {
                scrollUp.style.display = 'none';
            }
        }
    }

    // Scroll Up click functionality
    if (scrollUp) {
        scrollUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.error('.ScrollUp element not found.');
    }

    // Burger icon functionality
    
    if (burger && navLinksContainer) {
        burger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active'); // Toggle visibility of nav-links
            burger.classList.toggle('toggle'); // Toggle animation on burger icon
            updateButtonVisibility(); // Ensure no unexpected behavior in visibility
        });
    } else {
        console.error('Burger icon or navigation links container not found.');
    }

    function updateButtonVisibility() {
        if (LogIn) {
            if (window.innerWidth > 1024) {
                LogIn.style.display = 'block';
            } else if (navLinksContainer.classList.contains('active')) {
                LogIn.style.display = 'block';
            } else {
                LogIn.style.display = 'none';
            }
        } else {
        }
    }

    // Initialize functionality
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateButtonVisibility);

    // Services selection with dropdown
    if (dropdown && arrowIcon) {
        arrowIcon.addEventListener('click', function () {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });

        dropdownOptions.forEach(option => {
            option.addEventListener('click', function () {
                dropdownOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                const serviceType = this.getAttribute('data-service');
                updateCards(serviceType);
                if (serviceLabel) {
                    serviceLabel.innerText = this.innerText;
                }
                dropdown.style.display = 'none';
            });
        });

        // Close dropdown if clicked outside
        window.addEventListener('click', function (e) {
            if (selectService && !selectService.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    } else {
        console.error('Dropdown or arrow icon not found.');
    }

  // Plans card dropdown functionality
const plansCards = document.querySelectorAll(".PlansCard");
const toggleIcons = document.querySelectorAll(".toggle-benefits");

// Function to reorder the plans cards based on screen size
function reorderPlansCards() {
    const plansBoxFlex = document.querySelector('.PlansBoxFlex');

    if (window.innerWidth <= 768) {
        // Move the second card to the first position
        if (plansBoxFlex && plansCards.length >= 2) {
            plansBoxFlex.insertBefore(plansCards[1], plansCards[0]);
        }
    } else {
        // Ensure the cards are in the original order when above 768px
        if (plansBoxFlex && plansCards.length >= 3) {
            plansBoxFlex.appendChild(plansCards[0]); // First card
            plansBoxFlex.appendChild(plansCards[1]); // Second card
            plansBoxFlex.appendChild(plansCards[2]); // Third card
        }
    }
}

// Set initial display for plans benefits based on window width
plansCards.forEach(card => {
    const benefits = card.querySelector(".plansBenefits");

    if (window.innerWidth > 768) {
        benefits.style.display = "flex"; // Visible above 768px
    } else {
        benefits.style.display = "none"; // Hidden below 768px
    }
});

// Toggle benefits visibility when clicking the icons
toggleIcons.forEach((icon, index) => {
    icon.addEventListener("click", function() {
        const benefits = plansCards[index].querySelector(".plansBenefits");
        const hrElement = plansCards[index].querySelector("hr");

        if (window.innerWidth <= 768) {
            const isVisible = getComputedStyle(benefits).display === "flex";

            if (!isVisible) {
                benefits.style.display = "flex"; 
                hrElement.style.display = "none"; 
                icon.classList.remove("fa-chevron-down");
                icon.classList.add("fa-chevron-up"); 
            } else {
                benefits.style.display = "none"; 
                hrElement.style.display = "flex"; 
                icon.classList.remove("fa-chevron-up");
                icon.classList.add("fa-chevron-down"); 
            }
        }
    });
});

// Initial check for layout and dropdown display
reorderPlansCards();

// Check on window resize
window.addEventListener("resize", function() {
    reorderPlansCards();
    plansCards.forEach(card => {
        const benefits = card.querySelector(".plansBenefits");
        if (window.innerWidth > 768) {
            benefits.style.display = "flex"; // Visible above 768px
        } else {
            benefits.style.display = "none"; // Hidden below 768px
        }
    });
});

// Call the function on initial load
reorderPlansCards();

});

// Blog functionality//

document.addEventListener("DOMContentLoaded", function() {
    const blogCards = {
        1: ['.FirstBlogCard', '.SecondBlogCard'],
        2: ['.ThirdBlogCard', '.ForthBlogCard'],
        3: ['.FifthBlogCard', '.SixthBlogCard']
    };

    let currentPage = 1;
    const maxPage = 3;
    
    const rightArrow = document.querySelector('.right-arrow');
    const leftArrow = document.querySelector('.left-arrow');

    // Function to show the specific cards for the selected page
    function showBlogCards(page) {
        Object.keys(blogCards).forEach(key => {
            blogCards[key].forEach(selector => {
                document.querySelector(selector).style.display = key == page ? 'flex' : 'none';
            });
        });
    }

    // Function to update the active page number color
    function updatePageNumberColor(page) {
        document.querySelectorAll('.BlogPageLocations span').forEach(item => {
            if (parseInt(item.textContent) === page) {
                item.style.color = 'green';  // Set active page to green
            } else {
                item.style.color = '';  // Reset other pages to default color
            }
        });
    }

    // Function to update arrow styles based on the current page
    function updateArrowStyles() {
        // Left arrow should be grayed out on the first page
        if (currentPage === 1) {
            leftArrow.style.color = 'gray';
            leftArrow.style.opacity = '0.6';
            leftArrow.style.pointerEvents = 'none';  // Disable click
        } else {
            leftArrow.style.color = '';
            leftArrow.style.opacity = '';
            leftArrow.style.pointerEvents = 'auto';  // Enable click
        }

        // Right arrow should be grayed out on the last (third) page
        if (currentPage === maxPage) {
            rightArrow.style.color = 'gray';
            rightArrow.style.opacity = '0.6';
            rightArrow.style.pointerEvents = 'none';  // Disable click
        } else {
            rightArrow.style.color = '';
            rightArrow.style.opacity = '';
            rightArrow.style.pointerEvents = 'auto';  // Enable click
        }

    }

    // Initial page load (show first page, highlight 1st page number, and update arrows)
    showBlogCards(currentPage);
    updatePageNumberColor(currentPage);
    updateArrowStyles();

    // Handle click on page numbers
    document.querySelectorAll('.BlogPageLocations span').forEach(item => {
        item.addEventListener('click', function() {
            const selectedPage = parseInt(this.textContent);
            currentPage = selectedPage;
            showBlogCards(currentPage);
            updatePageNumberColor(currentPage);
            updateArrowStyles();
        });
    });

    // Handle click on the right arrow
    rightArrow.addEventListener('click', function() {
        if (currentPage < maxPage) {
            currentPage++;
            showBlogCards(currentPage);
            updatePageNumberColor(currentPage);
            updateArrowStyles();
        }
    });

    // Handle click on the left arrow
    leftArrow.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showBlogCards(currentPage);
            updatePageNumberColor(currentPage);
            updateArrowStyles();
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Select all heart icons
    document.querySelectorAll('.Likes i').forEach(heartIcon => {
        heartIcon.addEventListener('click', function() {
            const likeCounter = this.previousElementSibling; // The <span> with the likes count
            let currentLikes = parseInt(likeCounter.textContent);

            // Toggle heart class and update likes count
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                this.classList.remove('fas'); // Change to regular heart
                this.classList.add('fa-regular');
                currentLikes--;  // Decrease likes count
            } else {
                this.classList.add('liked');
                this.classList.remove('fa-regular'); // Change to solid heart
                this.classList.add('fas');
                currentLikes++;  // Increase likes count
            }

            // Update the displayed like count
            likeCounter.textContent = currentLikes;

            // Add animation for the heart
            this.classList.add('animate');
            setTimeout(() => {
                this.classList.remove('animate');
            }, 300); // Remove animation after 300ms
        });
    });
});

// Select All Functionality
document.getElementById('select-all').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.file-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

// Toggle Star Icon Color
document.querySelectorAll('.favorite-icon').forEach(star => {
    star.addEventListener('click', function() {
        if (this.classList.contains('far')) {
            this.classList.remove('far');
            this.classList.add('fas');
        } else {
            this.classList.remove('fas');
            this.classList.add('far');
        }
    });
});
document.getElementById('sort-arrow-up').addEventListener('click', toggleSortMenu);
document.getElementById('sort-arrow-down').addEventListener('click', toggleSortMenu);

function toggleSortMenu() {
  const menu = document.getElementById('sort-menu');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}
// log In//
function validateForm() {
    // Determine which form is currently being submitted
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    let isLoginForm = false;

    // Check if the login form is currently visible
    if (loginForm.style.display !== 'none') {
        isLoginForm = true;
    }

    // Select inputs based on the form type
    const inputs = isLoginForm 
        ? loginForm.querySelectorAll('input[required]') 
        : signupForm.querySelectorAll('input[required]');

    let emptyFound = false; 

    for (let input of inputs) {
        if (!input.value.trim()) {
            emptyFound = true; 
            input.focus(); 
            break;
        }
    }

    // Show alert only if there was an empty input
    if (emptyFound) {
        alert("Please fill the empty blank.");
        return false; 
    }

    // Additional password length check for sign-up form
    if (!isLoginForm) {
        const newPassword = document.getElementById('newPassword').value;
        if (newPassword.length < 8) {
            alert("Password must have at least 8 letters.");
            return false; 
        }
    }

    return true; 
}





function toggleForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginHeader = loginForm.querySelector('h2');

    // Toggle visibility of forms and the header
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginHeader.style.display = 'block';
    } else {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        loginHeader.style.display = 'block';
    }
}

// innerblog


const blogCardsContainer = document.querySelector('.innerBlogCards');
const cards = document.querySelectorAll('.innerBlogCards .border');
const dots = document.querySelectorAll('.dot');

// Function to update active dot based on scroll position
function updateActiveDot() {
    const scrollPosition = blogCardsContainer.scrollLeft;
    const cardWidth = blogCardsContainer.clientWidth; // Width of the visible area
    const activeIndex = Math.floor(scrollPosition / cardWidth); // Updated to Math.floor for correct index

    // Update active class on dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// Scroll event listener to update the active dot as you scroll
blogCardsContainer.addEventListener('scroll', updateActiveDot);

// Scroll to specific card when a dot is clicked
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const cardWidth = blogCardsContainer.clientWidth; // Width of the visible area

        // Scroll to the selected card
        blogCardsContainer.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    });
});

// Initialize active dot on load
window.addEventListener('load', updateActiveDot);

// All posts Click//

const SeeAll = document.getElementById('SeeAll');
if (SeeAll) {
    SeeAll.addEventListener('click', function () {
        window.location.href = "./blogFeed.html";
    });
} else {
    console.error('Element with ID "SeeAll" not found.');
}
// SecondTableContainer favIcon//
