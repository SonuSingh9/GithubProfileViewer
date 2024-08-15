const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");

const getUser = async(username) => {
    try {
    const response = await fetch(APIURL + username);
    if(!response.ok) throw new Error('User not found');
    const data = await response.json()
    const card = `
     <div class='card'>
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="${data.name}">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = card;
    getRepos(username)
} catch (error){
    main.innerHTML = `<p>USer not found</p>`;
    console.error(error.message)
}
}

// init call
getUser("bhagirath-wscubetech");

const getRepos = async (username) => {
    try {
        const repos = document.getElementById("repos"); // Correct selector
        const response = await fetch(APIURL + username + "/repos");
        const data = await response.json();

        data.slice(0, 5).forEach((item) => { // Limiting to 5 repos
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem);
        });
    } catch (error) {
        console.error('Failed to load repos:', error.message);
    }
}

const formSubmit = () => {
    const searchBox = document.getElementById("search"); // Correct selector
    if (searchBox.value.trim() !== "") {
        getUser(searchBox.value.trim());
        searchBox.value = "";
    }
    return false;
}

/* <a class="repo" href="#" target="_blank">Repo 1</a>
<a class="repo" href="#" target="_blank">Repo 2</a>
<a class="repo" href="#" target="_blank">Repo 3</a> */