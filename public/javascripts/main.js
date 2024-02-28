const socialsContainer = document.querySelector('.socials');
const icons = socialsContainer.querySelectorAll('.bi');

icons.forEach(icon => {
    icon.addEventListener('click', function () {
        const url = this.getAttribute('data-href');
        window.location.href = url;
    });
});

document.querySelector(".mobile-nav").addEventListener("click", function () {
    var highresNav = document.querySelector(".highres-nav");
    highresNav.style.display = highresNav.style.display === "block" ? "none" : "block";
});

function windowHeightSet() {
    let windowHeight = document.querySelector(".main");
    const newHeight = window.innerHeight - 100;
    windowHeight.style.height = newHeight + "px";
}



document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("#navBar ul li");
    const resumeButton = document.getElementById("resumeBtn");
    const scrollDownButton = document.getElementById("scrollDownButton");

    scrollDownButton.addEventListener("click", function () {
        const targetId = scrollDownButton.querySelector("i").getAttribute("data-href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });

    resumeButton.addEventListener("click", function () {
        window.location.href = "https://drive.google.com/file/d/1XLnU-BvMN2z6MziW83izNsKyW-Tf4MRz/view?usp=sharing";
    });


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

const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const popup = document.getElementById("success-popup");
    const name = document.getElementById('name').value;
    const email = document.getElementById('mail').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const formData = {
        name,
        email,
        message,
    };

    console.log('formdata:', formData);

    try {
        const response = await axios.post('/api/submit', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Form data submitted successfully.');
        popup.style.display = "block";

        setTimeout(function () {
            popup.style.display = "none";
        }, 3000);
        form.reset();
    } catch (error) {
        console.error('Error submitting form data:', error);
    }
});

function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

async function fetchProjects() {
    try {
        let apiUrl;

        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            apiUrl = 'http://localhost:3000/api/data';
        } else {
            apiUrl = 'https://lukaszoles.onrender.com/api/data';
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
            const projectName = document.createElement('h3');
            div.className = "single-project";
            div.style.backgroundImage = item.imgurl;
            details.className = "details";
            buttons.className = "buttons";
            projectName.textContent = item.name;
            buttons.innerHTML = `
            <a href="${item.link}"><i class="bi bi-git"></i></a>
            <a href="${item.live}"><i class="bi bi-search"></i></a>
            `;

            item.skills.forEach((skillItem) => {
                const li = document.createElement('li');
                li.textContent = skillItem;
                ul.appendChild(li);
            });


            projectsContainer.appendChild(div);
            div.appendChild(details);
            details.appendChild(buttons);
            details.appendChild(projectName);
            details.appendChild(ul);


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
        highresNav.style.display = "none";
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
    threshold: 0.1,
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