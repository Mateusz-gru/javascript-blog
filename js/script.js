/*
document.getElementById('test-button').addEventListener('click', function() {
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
});
*/

{
    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        console.log('event', event);
  
        /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */

        console.log('clickedElement:', clickedElement);
        clickedElement.classList.add('active');
  
        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
  
        /* [DONE] get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute('href');
    
        console.log(articleSelector);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);

        console.log(targetArticle);
  
        /* [DONE] add class 'active' to the correct article */
    
        article.classList.add('active');

    }
  
    const links = document.querySelectorAll('.titles a');
  
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
    
    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    
    console.log(articles);
    console.log(customSelector);

    let html = '';

    /* get the article id */
    
    for (let article of articles) {

        const articleId = article.getAttribute('id');
        console.log(articleId);

    /* find the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML);

    /* insert link into titleList */
        titleList.innerHTML = titleList.innerHTML + linkHTML;
        html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
    
}

generateTitleLinks();