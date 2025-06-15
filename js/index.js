document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#github-form");
    const searchInput = document.querySelector("#search");
    const userList = document.querySelector("user-list");
    const reposList = document.querySelector("#repos-list");
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
});
const searchTerm = searchInput.value;
userList.innerHTML = "";
reposList.innerHTML = "";

fetch(`https://api.github.com/seach/users?q=${searchTerm}`)
.then((res) => res.json())
.then((data) => {
    data.items.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <h3>${user.login}</h3>
        <img src="${user.avatar_url}" width="100" />
        <p><a href="${user.html_url}" target="_blank">view Profile</a></p>
        `;
        li.addEventListener("click", () => {
            fetchUserRepos(user.login);
        });
        function fetchUserRepos(username) {
            reposList.innerHTML = `<h3>Loading ${username}'s repos...</h3>`;
            fetch(`https://api.github.com/users/${username}/repos`)
            .then((res) => res.json())
            .then((repos) => {

                reposList.innerHTML = `<h3>${username}"s Repositories:</h3>`;
                repos.forEach((repo) => {
                    const li = document.createElement("li");
                    li.innerHTML = `<a href='${repo.html_url}" target="_blank">${repo.name}</a>`;
                    reposList.appendChild(li);

                    let searchType = "user";
                });
            })
        }
    })
})
