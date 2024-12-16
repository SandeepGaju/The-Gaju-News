const API_KEY = "7786315860bb432387f4f2536c1971c4";
                const url = "https://newsapi.org/v2/everything?q=";
                
                window.addEventListener("load", () => fetchNews("India"));

                function reload() {
                    window.location.reload();
                }
                
                async function fetchNews(query) {
                    try {
                        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
                        if (!res.ok) {
                            throw new Error(`HTTP Error: ${res.status}`);
                        }
                        const data = await res.json();
                        console.log(data);
                
                        bindData(data.articles);
                    } catch (error) {
                        console.error("Error fetching news:", error);
                    }
                }
                
                function bindData(articles) {
                    const cardsContainer = document.getElementById('cards-container');
                    const newsCardTemplate = document.getElementById('template-news-card');
                
                    cardsContainer.innerHTML = ""; // Clear previous content
                
                    articles.forEach (article => {
                        if (!article.urlToImage) return; // Skip articles without images
                
                        const cardClone = newsCardTemplate.content.cloneNode(true);


                        fillDataInCard(cardClone, article);
                
                        cardsContainer.appendChild(cardClone);
                    });
                    
                }



                function fillDataInCard(cardClone, article) {
                    const newsImg = cardClone.querySelector('#news-img');
                    const newsTitle = cardClone.querySelector('#news-title');
                    const newsSource = cardClone.querySelector('#news-source');
                    const newsDesc = cardClone.querySelector('#news-desc');
                    const newsDate = cardClone.querySelector('#news-date'); // Ensure a date element exists in the card
                
                    if (newsImg && article.urlToImage) {
                        newsImg.src = article.urlToImage;
                    }
                
                    if (newsTitle && article.title) {
                        newsTitle.innerHTML = article.title;
                    }
                
                    if (newsSource && article.source?.name) {
                        newsSource.innerHTML = article.source.name;
                    }
                
                    if (newsDesc && article.description) {
                        newsDesc.innerHTML = article.description;
                    }




                    const date = new Date(article.publishedAt).toLocaleString("en-US" ,{
                        timeZone: "Asia/Jakarta"
                    });


            newsSource.innerHTML = `${article.source.name} ➡️ ${date}` ;

            

            cardClone.firstElementChild.addEventListener("click", () =>{
                window.open(article.url, "_blank")
            } );
            
        }

        let curSelectedNav=null;
        function onNavItemClick(id){
            fetchNews(id);

            const navItem = document.getElementById(id);
            curSelectedNav?.classList.remove("active");
            curSelectedNav = navItem;
            curSelectedNav.classList.add("active");
        }


        const searchButton = document.getElementById("search-button");
        const searchText = document.getElementById("search-text")


        searchButton.addEventListener("click", () => {
            const query = searchText.value;
            if(!query) return;
            fetchNews(query);
            curSelectedNav?.classList.remove('active');
            curSelectedNav=null;
        });





















