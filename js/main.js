// https://www.youtube.com/watch?v=DIVfDZZeGxM&start_radio=1&list=RDQMqGxvJbsDly4
document.getElementById('BMform').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // Get from values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }



  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  /*// Local Storage stylesheet
    localStorage.setItem("test","Hello world");
    console.log(localStorage.getItem("test"));
    localStorage.remove("test");
    console.log(localStorage.getItem("test"));
  // Preventing form for submitting*/

  //Test if bookmark is null
    if (localStorage.getItem("bookmarks") === null)
    {
      // Init array
      var bookmarks = [];
      // Add to array
      bookmarks.push(bookmark);
      // Set to localStorage
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    else {
      // Get bookmarks from local Storage
      var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
      // Add bookmark to array
      bookmarks.push(bookmark);
      // Reset back to local Storage
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    }

    // Clear form
    document.getElementById("BMform").reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}
// Delete bookmarks
function deleteBookmark(url) {
  // Get bookmarks from LocalStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Loop through bookmarks
  for(var i=0; i<bookmarks.length; i++) {
    // Remove from array
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1)
    }
  }
  // Re-set back to localStorage
  localStorage.setItem("bookmarks",JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

function fetchBookmarks(){
  // Get bookmarks from local Storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Get ouput id
  var bookmarksResults = document.getElementById("bookmarksResults");
  // Build output
  bookmarksResults.innerHTML = "";
  for(var i=0; i<bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
                                  ' <a onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a> '+
                                  '</h3>'+
                                  '</div>';
  }
}

function validateForm(siteName, siteUrl){
  if (!siteName || !siteUrl)
  {
    alert("Please fill in the form");
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
