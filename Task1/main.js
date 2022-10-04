// HTML Elements
const addArticleForm = document.getElementById("addArticle");
const articlesContainer = document.getElementById("articlesContainer");
const commentForm = document.getElementById("commentForm");
const commentsContainer = document.getElementById("commentsContainer");
const singleArticle = document.getElementById("singleArticle");

// Functions
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];

const createMyElement = (type, parent, txt = null, classes = null) => {
    const element = document.createElement(type);
    parent.appendChild(element);
    element.textContent = txt;
    element.classList = classes;
    return element;
};

const showUser = (article) => {
    setData("article", article);
    window.location.href = "./single.html";
}

const deleteFun = (comments, index) => {
    comments.splice(index, 1);
    setData("comments", comments);
    renderComments(comments);
};

function renderArticles() {
    articlesContainer.innerHTML = "";
    let articles = getData("articles");
    articles.forEach((el) => {
        let div = createMyElement("div", articlesContainer, null, "article");
        createMyElement("h3", div, el.title);
        createMyElement("p", div, el.content);
        div.addEventListener("click", () => {
            showUser(el);
        });
    });
};

const renderComments = () => {
    commentsContainer.innerHTML = "";
    let comments = getData("comments");
    comments.forEach((el, index) => {
        let div = createMyElement("div", commentsContainer, null, "singleComment d-flex");
        createMyElement("h5", div, el.name[0]);
        createMyElement("p", div, el.comment);
        const delBtn = createMyElement("span", div, "x", "delete");
        delBtn.addEventListener("click", () => {
            deleteFun(comments, index);
        });
    });
};

// Conditions and Logic
if(addArticleForm) {
    let articles = getData("articles");
    addArticleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let article = {};
        article.title = this.elements.title.value;
        article.content = this.elements.content.value;
        articles.push(article)
        setData("articles",articles)
        addArticleForm.reset();
        renderArticles()
    });
};

if(articlesContainer) {
    renderArticles()
}

if (singleArticle) {
    let article = getData("article");
    singleArticle.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.content}</p>
    `;
}

if(commentForm) {
    let comments = getData('comments');
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let comment = {};
        comment.name = this.elements.name.value;
        comment.comment = this.elements.commentContent.value;
        comments.push(comment);
        setData('comments',comments);
        this.reset();
        renderComments()
    })
}

if (commentsContainer) {
    renderComments()
}
