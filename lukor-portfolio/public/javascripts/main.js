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



window.onload = fetchProjects;
window.onscroll = changeNavBar;