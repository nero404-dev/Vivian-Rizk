//  js loading - loads the whole code 
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");

    const sources = new Set();

    // 1. All <img> tags
    document.querySelectorAll("img").forEach(img => {
        if (img.src) sources.add(img.src);
    });

    // 2. All elements with inline background-image
    document.querySelectorAll("*").forEach(el => {
        const style = getComputedStyle(el);
        const bg = style.backgroundImage;
        if (bg && bg !== "none") {
            const matches = bg.match(/url\((['"])?(.*?)\1\)/g);
            if (matches) {
                matches.forEach(m => {
                    const url = m.replace(/^url\((['"])?(.*?)\1\)$/, "$2");
                    sources.add(url);
                });
            }
        }
    });

    // 3. All data-bg attributes (like in your sidenav)
    document.querySelectorAll("[data-bg]").forEach(el => {
        const bg = el.getAttribute("data-bg");
        if (bg) {
            const url = bg.replace(/^url\((['"])?(.*?)\1\)$/, "$2");
            sources.add(url);
        }
    });

    // Turn into array
    const images = Array.from(sources);
    let loaded = 0;

    if (images.length === 0) {
        // no images? just hide loader immediately
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
            content.style.display = "block";
            content.style.opacity = "1";
        }, 600);
        return;
    }

    // Preload them all
    images.forEach(src => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loaded++;
            if (loaded === images.length) {
                preloader.style.opacity = "0";
                setTimeout(() => {
                    preloader.style.display = "none";
                    content.style.display = "block";
                    content.style.opacity = "1";
                }, 600);
            }
        };
        img.src = src;
    });
});

//  js - only remove hash after nav clicks 
document.querySelectorAll('a[data-target]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

//  js resp nav 
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//  js side nav - animation 
const sidenav = document.getElementById('mySidenav');
const links = sidenav.querySelectorAll('a[data-bg]');
// ✅ Get default background-image from CSS
const defaultBg = getComputedStyle(sidenav).backgroundImage;

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const bg = link.getAttribute('data-bg');
        sidenav.style.backgroundImage = bg;
    });
    link.addEventListener('mouseleave', () => {
        sidenav.style.backgroundImage = defaultBg;
    });
});

//  js - nav active state 
// Select all links that have data-target
const allLinks = document.querySelectorAll("a[data-target]");

allLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const target = link.getAttribute("data-target");

        // Remove active class from all links
        allLinks.forEach(l => l.classList.remove("active"));

        // Add active class to all links that match the clicked target
        allLinks.forEach(l => {
            if (l.getAttribute("data-target") === target) {
                l.classList.add("active");
            }
        });
    });
});

// //  js - landing background animation slideshow 
// document.addEventListener("DOMContentLoaded", () => {
//     const slides = [
//         { image: "pictures/fineas-anton-VV_AtjLknlA-unsplash.jpg", title: "Dinner Show" },
//         { image: "pictures/Gradient_Background-Becoming_Social.png", title: "Luxury Night" },
//         { image: "pictures/sycgsdyvgsdv.png", title: "Exclusive Vibes" }
//     ];

//     let currentSlide = 0;
//     const landing = document.querySelector(".landing");
//     const titleElement = document.querySelector(".landing .title h1");

//     // Initial setup
//     landing.style.backgroundImage = `url('${slides[currentSlide].image}')`;
//     titleElement.textContent = slides[currentSlide].title;

//     function changeSlide() {
//         titleElement.style.opacity = 0; // fade out
//         setTimeout(() => {
//             currentSlide = (currentSlide + 1) % slides.length;
//             landing.style.backgroundImage = `url('${slides[currentSlide].image}')`;
//             titleElement.textContent = slides[currentSlide].title;
//             titleElement.style.opacity = 1; // fade in
//         }, 500); // half-second fade out
//     }

//     // First quick change (flashy)
//     setTimeout(() => {
//         changeSlide();

//         // After first change, start slow luxury slideshow
//         setInterval(changeSlide, 4000); // change every 4s
//     }, 1500); // first change after 1.5s
// });

    // // <!-- adjust light -> dark mode for desktop -->
    // // Select the toggle button
    // const themeToggleButton = document.getElementById('theme-toggle');

    // // Add an event listener to the button
    // themeToggleButton.addEventListener('click', () => {
    //     // Toggle the 'dark-mode' class on the body
    //     document.body.classList.toggle('dark-mode');

    //     // Update the button text based on the current mode
    //     if (document.body.classList.contains('dark-mode')) {
    //         themeToggleButton.textContent = 'Switch to Light Mode';
    //     } else {
    //         themeToggleButton.textContent = 'Switch to Dark Mode';
    //     }
    // });

    // // Select the checkbox input, not the button
    // const themeCheckbox = document.getElementById('input');

    // // Listen for change on the checkbox
    // themeCheckbox.addEventListener('change', () => {
    //     document.body.classList.toggle('dark-mode', themeCheckbox.checked);
    // });

    const themeCheckbox = document.getElementById('input');

themeCheckbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', input.checked);
});


    // <!-- adjust light -> dark mode for resp -->
    // Select the toggle button
    const respThemeToggleButton = document.getElementById('resp-theme-toggle');

    // Add an event listener to the button
    respThemeToggleButton.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body
        document.body.classList.toggle('dark-mode');

        // Update the button text based on the current mode
        if (document.body.classList.contains('dark-mode')) {
            respThemeToggleButton.textContent = 'Switch to Light Mode';
        } else {
            respThemeToggleButton.textContent = 'Switch to Dark Mode';
        }
    });

//     const skillsContainer = document.querySelector('.skills-container');
//     const skillBars = document.querySelectorAll('.skill-progress');

//     // Check if element is in viewport
// function isElementInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//       rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
//       rect.bottom >= 0
//     );
//   }

//     // Check if elements are in the viewport
// function checkElementsInViewport() {
//     // Skills section
//     if (isElementInViewport(skillsContainer) && !skillsContainer.classList.contains('visible')) {
//         skillsContainer.classList.add('visible');
//         // Animate skill bars
//         setTimeout(() => {
//             skillBars.forEach(bar => {
//                 const percentage = bar.getAttribute('data-percentage');
//                 bar.style.width = percentage + '%';
//             });
//         }, 400);
//     }
// }

const skillsContainer = document.querySelector('.skills-container');
const skillBars = document.querySelectorAll('.skill-progress');

// Check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

// Function to check visibility and trigger animation
function checkElementsInViewport() {
    if (isElementInViewport(skillsContainer) && !skillsContainer.classList.contains('visible')) {
        skillsContainer.classList.add('visible');
        // Animate skill bars
        setTimeout(() => {
            skillBars.forEach(bar => {
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = percentage + '%';
            });
        }, 400);
    }
}

// Listen for scroll and on-load
window.addEventListener('scroll', checkElementsInViewport);
window.addEventListener('load', checkElementsInViewport);

// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         skillsContainer.classList.add('visible');
//         skillBars.forEach(bar => {
//           const percentage = bar.getAttribute('data-percentage');
//           bar.style.width = percentage + '%';
//         });
//         observer.unobserve(skillsContainer); // run once
//       }
//     });
//   });
  
//   observer.observe(skillsContainer);