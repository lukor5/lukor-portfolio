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
        const mongoResponse = await axios.get('http://localhost:3000/api/data');
        const mongoData = mongoResponse.data;

        const projectsContainer = document.getElementById('projectsContainer');

        mongoData.forEach((item) => {
            const div = document.createElement('div');
            const details = document.createElement('div');
            const ul = document.createElement('ul');
            div.className = "single-project";
            div.textContent = item.name; 
            details.className = "details";
            const detailsContent = `<button class="link-button" href="${item.link}">bla</button>`;
            details.innerHTML = detailsContent;

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
            details.appendChild(ul);

            details.style.display = 'none';
          });

    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
}

function changeNavBar(){
    const navBarWrapper = document.getElementById("navWrapper");
    const navBar = document.getElementById("navBar");
    const offset = navBar.offsetTop;
    if(navBarWrapper.offsetTop > 60) {
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

window.onload = fetchProjects;
window.onscroll = changeNavBar;