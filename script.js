
const api_key = '84aa4085891a4ee8b1b7d6a4d0bd0878';
const url = 'https://newsapi.org/v2/everything?q=';


document.addEventListener('DOMContentLoaded', ()=> fetchNews('india'));

async function fetchNews(query){
    try{
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${api_key}`);
        if(!response.ok){
            console.log('An Error While Fetching');
        }
        const data = await response.json();
        bindData(data.articles);
    }
    catch(err){
        // console.log('An Error While Fetching',err);
    }
}

function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsCardsTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML = '';
    articles.forEach(articles => {
        if(!articles.urlToImage) return;
        const cardClone = newsCardsTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, articles);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, articles){
    const newsImg = cardClone.getElementById('news-image');
    const newsTitle = cardClone.getElementById('news-title');
    const newsSource = cardClone.getElementById('news-source');
    const newsDesc = cardClone.getElementById('news-desc');

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;
    const date = new Date(articles.publishedAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    newsSource.innerHTML = `${articles.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(articles.url,'_blank');
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    const navLinks = document.querySelector('#nav-links');
    console.log(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
    navLinks.classList.add('active')
}

const searchBtn = document.getElementById('search-btn');
const searchTxt = document.getElementById('search-text');
searchBtn.addEventListener('click',()=>{
    const query = searchTxt.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav = null;
    curSelectedNav?.classList.remove('active');
})

function reload(){
    window.location.reload();
}
const menuIcon = document.querySelector('#menu-icon');
menuIcon.addEventListener('click',()=>{
    const navLinks = document.querySelector('#nav-links');
    if(!navLinks.classList.contains('active')){
        navLinks.classList.add('active');
    }
    else{
        navLinks.classList.remove('active');
    }
})