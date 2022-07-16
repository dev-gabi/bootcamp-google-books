const submit = document.getElementById('submit');
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('result');

submit.addEventListener('click', searchBooks);

async function searchBooks()
{
    let resultHtml = '';
    let books = await fetchBooks();

    books.items.forEach((b) =>
    {
        console.log(b.volumeInfo);
        resultHtml += renderElement(b.volumeInfo);
        resultContainer.innerHTML = resultHtml;
    });
    searchInput.value = '';
}

async function fetchBooks()
{
    try {
        let res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchInput.value}`
        );
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
function renderElement(volumeInfo)
{
    const desc =
        volumeInfo.description == undefined
            ? ' Description is not available'
            : volumeInfo.description;

    return `<div class="col-4 b-r5 p-5 card row">
               <div class="col-12">
                   <a href="${volumeInfo.previewLink}" target="blank">
                   <h2 class="center">${volumeInfo.title}</h2> </a>
               </div> 
                <div class="col-12">
                        <p class="col-6">${desc}</p>                       
                        <div class="col-6"> <img src='${volumeInfo.imageLinks.thumbnail}' alt='${volumeInfo.title}' class="center"/></div>
                </div>
             </div>`;
}
