const modalShow = document.getElementById('show-modal')
const modal = document.getElementById('modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = []

// Functions
// show modal function
function showModal() {
    modal.classList.add('show-modal')
    websiteNameEl.focus()
}

// Close modal
function closeModal() {
    modal.classList.remove('show-modal')
}

// Validate form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression)
    if(!nameValue || !urlValue) {
        alert('Please submit values for both fields')
        return false
    }
    if(!urlValue.match(regex)){
        alert('Please provide a valid web address')
        return false
    }

    // Valid form
    return true

}

// Insert bookmark data from localstorage to the DOM
function buildBookmarks() {
    //console.log(bookmarks)
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark
        //console.log(name, url)

        //create item
        const item = document.createElement('div')
        item.classList.add('item')

        // Close icon
        const closeIcon = document.createElement('i')
        closeIcon.classList.add('fas', 'fa-times')
        closeIcon.setAttribute('title','Delete Bookmark')
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)

        //Favicon
        const linkInfo = document.createElement('div')
        linkInfo.classList.add('name')
        const favicon = document.createElement('img')
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicon?domain=${url}`)
        favicon.setAttribute('alt', 'Favicon')
        // https://s2.googleusercontent.com/s2/favicon?domain=

        // Link
        const link = document.createElement('a')
        link.setAttribute('href', `${url}`)
        link.setAttribute('target', '_blank')
        link.textContent = name

        // Append to bookmarks container
        linkInfo.append(favicon, link)
        item.append(closeIcon, linkInfo)
        bookmarksContainer.appendChild(item)
    })
    
}

// Fetch bookmarks from local storage
function fetchBookmarks() {
    // Get bookmarks from localstorage if available
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } else {
        // Create a bookmark example
        bookmarks = [
            {
                name: 'google',
                url: 'https://google.com',
            },
        ]

        localStorage.setItem('Bookmarks', JSON.stringify(bookmarks))
    }

    buildBookmarks()
}

// handle data from form
function storeBookmark(e) {
    e.preventDefault()
    const nameValue = websiteNameEl.value
    let urlValue = websiteUrlEl.value

    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`; 
    }
    if(!validate(nameValue,urlValue)) {
        return false
    }
    
    const bookmark = {
        name: nameValue,
        url: urlValue,
    }

    bookmarks.push(bookmark)

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
    bookmarkForm.reset()
    websiteNameEl.focus()

}

// note mistake
// if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
//      urlValue = `https://${urlValue}`; 
// }

// Event listners
modalShow.addEventListener('click', showModal)

modalClose.addEventListener('click', closeModal)

window.addEventListener('click', (e) => {
    e.target === modal ? closeModal() : false
})

// Bookmark event listner
bookmarkForm.addEventListener('submit', storeBookmark)


// On load fetch bookmarks from local storage
fetchBookmarks()

