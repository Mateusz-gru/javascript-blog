const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
};

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
  
  };

  // eslint-disable-next-line no-unused-vars
  const links = document.querySelectorAll('.titles a');

}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

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

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + linkHTML;
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for (let link of links) {

    // eslint-disable-next-line no-undef

    link.addEventListener('click', titleClickHandler);

  }
  
}

generateTitleLinks();

function calculateTagsParams() {

  let allTags = {};

  const params = {
      max: 0,
      min: 999999
  };
  for (let tag in allTags) {
      console.log(tag + ' is used ' + allTags[tag] + ' times');

      params.max = Math.max(allTags[tag], params.max);
      params.min = Math.min(allTags[tag], params.min);
  }
  return params;
}

//calculateTagClass

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const tagCloudClass = optCloudClassPrefix + classNumber;
  return tagCloudClass;
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty array */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const tags = article.getAttribute('data-tags');

    /* split tags into array */

    const tagsArray = tags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of tagsArray) {

      /* generate HTML of the link */

      const linkHTMLData = {id: tagId, title: tagTitle};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */

      html = html + tagLink + (' ');

      /* [NEW] check if this link is NOT already in allTags */

      if (!allTags[tag]) {

        /* [NEW] add tag to allTags object */

        allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      }

      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

   /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)

  /* [NEW] create variable for all links HTML code */

  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */

  for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */

    //allTagsHTML += tag + ' (' + allTags[tag] + ') ';

    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a></li>';
    console.log('tagLinkHTML:', tagLinkHTML);

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

    /* [NEW] END LOOP: for each tag in allTags: */

  }

  /*[NEW] add HTML from allTagsHTML to tagList */

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);

}

generateTags();

const tagClickHandler = function() {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const tagActive = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */

  for (let tagActive of tagActive) {

    /* remove class active */

    tagActive.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {

    /* add class active */

    tagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

const tags = document.querySelectorAll('.post-tags a');

for(let tag of tags) {
  tag.addEventListener('click', tagClickHandler);
}
const addClickListenersToTags = function() {

  /* find all links to tags */

  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let linkToTag of linksToTags) {

    /* add tagClickHandler as event listener for that link */

    linkToTag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */

  }

}

addClickListenersToTags();

// Generate Authors

const generateAuthors = function() {

  /* [done] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [done] START LOOP: for every article: */

  for (let article of articles) {

    /* find authors wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* [Done] make html variable with empty string */

    let html = '';

    /* [done] get authors from data-author attribute */

    const author = article.getAttribute('data-author');

    const author_name = author.replace(' ', '_');

    /* generate HTML of the link */

    const linkHTMLData = {id: authorId, title: authorTitle};
    const linkHTML = templates.authorLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + authorLink;

   /* END LOOP: for each author */
  }

}

generateAuthors();

const authorClickHandler = function(event) {
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

   /* make a new constant "href" and read the attribute "href" of the clicked element */

   const href = clickedElement.getAttribute('href');

   /* make a new constant "author" and extract tag from the "href" constant */

   const author = href.replace('#author-', '');

   const authorWithout_ = author.replace('_', ' ');

  /* find all authors links with class active */

  const authorActives = document.querySelectorAll('a.active[href^="#author"]');

  /* START LOOP: for each active author link */

  for (let authorDeactive of authorActives) {

    /* remove class active */

    authorDeactive.classList.remove('active');
    console.log('deaktywne tagiAutorow:', authorDeactive);

    /* END LOOP: for each active author link */

  }

  /* find all author links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('article[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let authorLink of authorLinks) {

    /* add class active */

    authorLink.classList.add('active');
    console.log('autorzy aktywni: ', authorLink);

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + authorWithout_ + '"]');

}


/* find all links to authors */

const Auhtors = document.querySelectorAll('.post-author a');

/* START LOOP: for each authors */

  for (let author of Auhtors) {

    /* add authorClickHandler as event listener for that author */

    author.addEventListener('click', authorClickHandler);

  /* END LOOP: for each authors */
  }

  const addClickListenersToAuthors = function() {
    const linksToAuthors = document.querySelectorAll('a[href^="#author"]');

    for (const linkToAuthor of linksToAuthors) {

      linkToAuthor.addEventListener('click', authorClickHandler);
    }


  }


}

addClickListenersToAuthors ();
