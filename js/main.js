// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  //console.log("Hi there. It works!");
  // Get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;
  //console.log(siteName, siteUrl);

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  // bookmark array of objects
  var bookmark = {
    name: siteName,
    url: siteUrl
  };
  // console.log(bookmark);

  /*
  // Local Storage Test
  // Set something on localStorage
  localStorage.setItem("test", "Hello World");
  // get an item
  console.log(localStorage.getItem("test"));
  // remove the item
  localStorage.removeItem("test");
  console.log(localStorage.getItem("test"));
*/

  // Test if bookmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    // Init array
    var bookmarks = [];
    // Add to array; push(): append the bookmark into array
    bookmarks.push(bookmark);
    // Set to localStorage; stringify takes JSON array and turn it into string before we save it into localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from LocalStorage; JSON.parse turn string back to JSON
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Reset back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById("myForm").reset();

  // Re-Fetch bookmarks
  fetchBookmarks();

  // Prevent Form from submitting
  e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
  //console.log(url);

  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    // if the current iteration url is passed in here
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1); //add/removes the items from the array
    }
  }

  // Reset back to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-Fetch bookmarks
  fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks() {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  console.log(bookmarks);

  let output = "";

  $.each(bookmarks, (index, bookmark) => {
    output += `
          <div class = "col-md-3 col-sm-3">
            <div class = "well text-center">
              <h3>${bookmark.name}</h3><hr>
              <a class = "btn btn-primary" target = "_blank" href = "${bookmark.url}">Visit</a>
             <a onclick = "deleteBookmark('${bookmark.url}')" class = "btn btn-danger" href = "#">Delete</a> 
            </div>
          </div>
        `;
  });
  $("#bookmarksResults").html(output);

}

// Validate Form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill in the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  // if it passes return true
  return true;
}
