const apiKey = "d0037af85d76faae5f5dd6e7d076f49a";  // <-- यहाँ अपना NewsAPI API Key डालो
const country = "us";  // Change as per your requirement

async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    const newsContainer = document.getElementById("news-container");

    try {
        newsContainer.innerHTML = "Fetching latest news...";

        const response = await fetch(url);
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            newsContainer.innerHTML = "⚠ No news found. Try again later.";
            return;
        }

        newsContainer.innerHTML = "";
        data.articles.forEach(article => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(newsItem);
        });
    } catch (error) {
        newsContainer.innerHTML = "❌ Failed to load news. Please try again.";
        console.error("Error fetching news:", error);
    }
}

document.getElementById("refreshBtn").addEventListener("click", fetchNews);
fetchNews();
