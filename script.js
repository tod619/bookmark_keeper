const modalShow = document.getElementById('show-modal')
const modal = document.getElementById('modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const wensiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

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


// Event listners
modalShow.addEventListener('click', showModal)

modalClose.addEventListener('click', closeModal)

window.addEventListener('click', (e) => {
    e.target === modal ? closeModal() : false
})