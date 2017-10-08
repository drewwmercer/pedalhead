$(document).ready(function() {
    /* global moment */
  
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
  
    // This function constructs a bike's HTML
    function createNewRow(bike) {
      var formattedDate = new Date(bike.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
      var newBikePanel = $("<div>");
      newBikePanel.addClass("panel panel-default");
      var newBikePanelHeading = $("<div>");
      newBikePanelHeading.addClass("panel-heading");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var newBikeTitle = $("<h2>");
      var newBikeDate = $("<small>");
      var newBikeOwner = $("<h5>");
      newBikeOwner.text("Owned by: " + bike.Owner.name);
      newBikeOwner.css({
        float: "right",
        color: "blue",
        "margin-top":
        "-10px"
      });
      var newBikePanelBody = $("<div>");
      newBikePanelBody.addClass("panel-body");
      var newBikeBody = $("<p>");
      newBikeTitle.text(bike.title + " ");
      newBikeBody.text(bike.body);
      newBikeDate.text(formattedDate);
      newBikeTitle.append(newBikeDate);
      newBikePanelHeading.append(deleteBtn);
      newBikePanelHeading.append(editBtn);
      newBikePanelHeading.append(newBikeTitle);
      newBikePanelHeading.append(newBikeOwner);
      newBikePanelBody.append(newBikeBody);
      newBikePanel.append(newBikePanelHeading);
      newBikePanel.append(newBikePanelBody);
      newBikePanel.data("bike", bike);
      return newBikePanel;
    }
  
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
  