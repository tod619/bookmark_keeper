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

    console.log(bookmarks)
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