  //BEGIN USER AUTHENTICATION CODE


    // This is automatically called via the onload parameter in the platform.js <script> tag.
    function gapiInit() {

        // Load the auth2 module into the Google API object.
        gapi.load('auth2', function() {

            console.log('Loaded auth2');
            let googleUser;

            // Init the auth2 module with our client ID
            // https://developers.google.com/identity/sign-in/web/devconsole-project
            const googleAuth = gapi.auth2.init({
                client_id: '349091180718-scvujbn59thrl1fo0q85au262el78o1g.apps.googleusercontent.com'
            });

            // Wait until the auth module is finished loading via a Promise.
            googleAuth.then(() => {

                // The user may have gotten automatically signed-in via Google.
                if (googleAuth.isSignedIn.get()) {
                    console.log('User was logged in on page load.')
                    validateUser(googleAuth.currentUser.get());
                }

                // Listen for changes in the user's signed-in status.
                googleAuth.isSignedIn.listen((signedIn) => {
                    if (signedIn) {
                        console.log('User just signed in manually.');
                        validateUser(googleAuth.currentUser.get());
                    } else {
                        console.log('User just signed out.');
                    }
                });
            }, (error) => console.error(error));

        });
    }

    const validateUser = (user) => {
        console.log(`ID Token: ${user.getAuthResponse().id_token}`);

        const profile = user.getBasicProfile();
        console.log(`ID: ${profile.getId()}`);
        console.log(`Name: ${profile.getName()}`);
        console.log(`Email: ${profile.getEmail()}`);
        console.log(`ImageUrl: ${profile.getImageUrl()}`);

        // 1. Send the token to the backend...
        // 2. so that we can use the google-auth-library to...
        // 3. verify whether the info is valid or if a malicious user is spoofing a Google account.
        $.get(`/api/auth?token=${user.getAuthResponse().id_token}`)
            .then((response) => {
                console.log('Response from /api/auth:', response);

                if (response.valid) {
                    // The 'sub' key should be the same as the Profile ID we printed out on line 5 here.
                    $("#reserve-unique-id").val(response.sub);
                } else {
                    // The backend authetnication failed. The front-end user was trying to spoof
                    // and impersonate a Google account.
                    console.error(response.error);
                }
            });
    };

     function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
      }

      //// END USER AUTHENTICATION CODE


// Former prog.js code start
// ============================
var Response = document.getElementById('response');

var Input = document.getElementById('yourInput');


$(".dropdown-item").on("click", function() {
    console.log($(this).text());

    var Option = $(this).text();

    $("#dropdownMenu2").text(Option);
});
// ============================
// Former prog.js code end



$(document).ready(function() {
    /* global moment */
    console.log("APP.JS CONNECTED"); 


    // appContainer holds all of our bikes
    var appContainer = $(".app-container");
    var bikeCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleBikeDelete);
    $(document).on("click", "button.edit", handleBikeEdit);
    // Variable to hold our bikes
    var bikes;
  
    // The code below handles the case where we want to get bikes for a specific owner
    // Looks for a query param in the url for owner_id
    var url = window.location.search;
    var ownerId;
    if (url.indexOf("?owner_id=") !== -1) {
      ownerId = url.split("=")[1];
      getBikes(ownerId);
    }
    // If there's no ownerId we just get all bikes as usual
    else {
      getBikes();
    }
  
  
    // This function grabs bikes from the database and updates the view
    function getBikes(owner) {
      ownerId = owner || "";
      if (ownerId) {
        ownerId = "/?owner_id=" + ownerId;
      }
      $.get("/api/bikes" + ownerId, function(data) {
        console.log("Bikes", data);
        bikes = data;
        if (!bikes || !bikes.length) {
          displayEmpty(owner);
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete bikes
    function deleteBike(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/bikes/" + id
      })
      .done(function() {
        getBikes(bikeCategorySelect.val());
      });
    }
  
    // InitializeRows handles appending all of our constructed bike HTML inside blogContainer
    function initializeRows() {
      appContainer.empty();
      var bikesToAdd = [];
      for (var i = 0; i < bikes.length; i++) {
        bikesToAdd.push(createNewRow(bikes[i]));
      }
      appContainer.append(bikesToAdd);
    }
  

  
  $('#addBikeButton').on('click', function(event) {
      event.preventDefault();
      alert("Hey the button worked!"); 
  
      var newBike = {bikes: $('#ca').val()};
  
      $.ajax('/api/addnewbike', {
        type: 'POST',
        data: newBike
      }).then(function() {
        console.log('New bike was added');
        location.reload();
      });
    });


    // This function figures out which bike we want to delete and then calls deleteBike
    function handleBikeDelete() {
      var currentBike = $(this)
        .parent()
        .parent()
        .data("bike");
      deleteBike(currentBike.id);
    }
  
    // This function figures out which bike we want to edit and takes it to the appropriate url
    function handleBikeEdit() {
      var currentBike = $(this)
        .parent()
        .parent()
        .data("bike");
      window.location.href = "/cms?bike_id=" + currentBike.id;
    }
  
    // This function displays a messgae when there are no bikes
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Owner #" + id;
      }
      appContainer.empty();
      var messageh2 = $("<h2>");
      messageh2.css({ "text-align": "center", "margin-top": "50px" });
      messageh2.html("No bikes yet" + partial + ", navigate <a href='/app" + query +
      "'>here</a> in order to get started.");
      blogContainer.append(messageh2);
    }

  });
  