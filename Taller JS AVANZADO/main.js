function getMovies() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const movies = [
                { id: 1, title: "InceptiOn", genre: "Sci-Fi", watched: false, releaseYear: 2010 },
                { id: 2, title: "The WhAle", genre: "Drama", watched: true, releaseYear: 2022 },
                { id: 3, title: "ThE Shinning", genre: "Terror", watched: false, releaseYear: 1980 },
                { id: 4, title: "AmAdeUs", genre: "Drama", watched: false, releaseYear: 1984 },
                { id: 5, title: "ThEre WilL Be blooD", genre: "Drama", watched: true, releaseYear: 2007 }
            ];

            resolve(movies);
        }, 1500);
    });
}

async function initApp() {
    try {
        const movies = await getMovies();
        const container = document.getElementById("movie-container");
        const normalizedMovies = movies.map(function (movie) {
            return {
                ...movie,
                title: movie.title.toLowerCase(),
                genre: movie.genre.toLowerCase(),
                type: movie.releaseYear < 2000 ? "Classic" : "Modern"
            };
        });

        normalizedMovies.forEach(function (movie) {

            const card = document.createElement("div");
            card.classList.add("movie-card");

            if (movie.watched) {
                card.classList.add("watched");
            }

            card.innerHTML = `
                <h3>${movie.title}</h3>
                <p><strong>Género:</strong> ${movie.genre}</p>
                <p><strong>Año:</strong> ${movie.releaseYear}</p>
                <p><strong>Tipo:</strong> ${movie.type}</p>
                <p>
                    <strong>Vista:</strong>
                    <span class="status">
                        ${movie.watched ? "✅ Sí" : "❌ No"}
                    </span>
                </p>
                <button>
                    ${movie.watched ? "Marcar como no vista" : "Marcar como vista"}
                </button>
            `;

            const button = card.querySelector("button");
            const statusText = card.querySelector(".status");
            button.addEventListener("click", function () {

                movie.watched = !movie.watched;

                if (movie.watched) {
                    statusText.textContent = "✅ Sí";
                    card.classList.add("watched");
                    button.textContent = "Marcar como no vista";
                } else {
                    statusText.textContent = "❌ No";
                    card.classList.remove("watched");
                    button.textContent = "Marcar como vista";
                }
            });

            container.appendChild(card);
        });

    } catch (error) {
        console.log("Ocurrió un error:", error);
    }
}

initApp();