document.querySelector(".mobile-nav").addEventListener("click", function () {
    var highresNav = document.querySelector(".highres-nav");
    highresNav.style.display = highresNav.style.display === "block" ? "none" : "block";
});

function windowHeightSet() {
    let height = document.querySelector(".main");
    const newHeight = window.innerHeight - 100;
    height.style.height = newHeight + "px";

}

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("#navBar ul li h2");


    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: "smooth",
                });
            }
        });
    });
});

async function fetchProjects() {
    try {
        // Define the base URL for your API
        let apiUrl;

        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // If running on localhost, use the local development server
            apiUrl = 'http://localhost:3000/api/data';
        } else {
            // Otherwise, use the remote API URL
            apiUrl = 'https://lukaszoles.render.com/api/data';
        }
        const mongoResponse = await axios.get(apiUrl);
        const mongoData = mongoResponse.data;

        const projectsContainer = document.getElementById('projectsContainer');

        mongoData.forEach((item) => {
            const div = document.createElement('div');
            const background = document.createElement('div');
            const details = document.createElement('div');
            const ul = document.createElement('ul');
            const buttons = document.createElement('div');
            div.className = "single-project";
            div.style.backgroundImage = item.imgurl;
            details.className = "details";
            buttons.className = "buttons";

            buttons.innerHTML = `
            <a href="${item.link}"><i class="bi bi-git"></i></a>
            <a href="${item.live}"><i class="bi bi-search"></i></a>
            `;

            item.skills.forEach((skillItem) => {
                const li = document.createElement('li');
                li.textContent = skillItem;
                ul.appendChild(li);
            });

            div.addEventListener('mouseenter', () => {
                details.style.display = 'block';
            });

            div.addEventListener('mouseleave', () => {
                details.style.display = 'none';
            });

            projectsContainer.appendChild(div);

            div.appendChild(details);
            details.appendChild(buttons);
            details.appendChild(ul);

            details.style.display = 'none';
        });

    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
}

function updateHighresNavDisplay() {
    var highresNav = document.querySelector(".highres-nav");

    if (window.innerWidth > 800) {
        highresNav.style.display = "flex";
    } else {
        highresNav.style.display = "none"; // or "block" if needed
    }
}

function changeNavBar() {
    const navBarWrapper = document.getElementById("navWrapper");
    const navBar = document.getElementById("navBar");
    const offset = navBar.offsetTop;
    if (navBarWrapper.offsetTop > 60) {
        navBar.classList.add("scrolled-nav");
    } else {
        navBar.classList.remove("scrolled-nav");
    }
}

function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5, // Adjust this threshold as needed
});

const welcomeMsg = document.querySelector('.welcome-msg');
const aboutText = document.querySelector('.about-me');
observer.observe(welcomeMsg);
observer.observe(aboutText);

window.addEventListener("load", fetchProjects);
window.addEventListener("load", windowHeightSet);
window.addEventListener("resize", windowHeightSet);
window.onscroll = changeNavBar;
window.addEventListener("resize", updateHighresNavDisplay);