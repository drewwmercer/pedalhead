$(document).ready(function() {
    // Getting references to the name input and owner container, as well as the table body
    var nameInput = $("#owner-name");
    var ownerList = $("tbody");
    var ownerContainer = $(".owner-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Owner
    $(document).on("submit", "#owner-form", handleOwnerFormSubmit);
    $(document).on("click", ".delete-owner", handleDeleteButtonPress);
  
    // Getting the intiial list of Owners
    getOwners();
  
    // A function to handle what happens when the form is submitted to create a new Owner
    function handleOwnerFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertOwner function and passing in the value of the name input
      upsertOwner({
        name: nameInput
          .val()
          .trim()
      });
    }
  
    // A function for creating an owner. Calls getOwners upon completion
    function upsertOwner(ownerData) {
      $.post("/api/owners", ownerData)
        .then(getOwners);
    }
  
    // Function for creating a new list row for owners
    function createOwnerRow(ownerData) {
      var newTr = $("<tr>");
      newTr.data("owner", ownerData);
      newTr.append("<td>" + onwerData.name + "</td>");
      newTr.append("<td> " + ownerData.Bikes.length + "</td>");
      newTr.append("<td><a href='/blog?owner_id=" + ownerData.id + "'>Go to Bikes</a></td>");
      newTr.append("<td><a href='/cms?owner_id=" + ownerData.id + "'>Create a Bike</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-owner'>Delete Owner</a></td>");
      return newTr;
    }
  
    // Function for retrieving owners and getting them ready to be rendered to the page
    function getOwners() {
      $.get("/api/owners", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createOwnerRow(data[i]));
        }
        renderOwnerList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of owners to the page
    function renderOwnerList(rows) {
      ownerList.children().not(":last").remove();
      ownerContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        ownerList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no owners
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Owner before you can create a Bike.");
      ownerContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("owner");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/owners/" + id
      })
      .done(getOwners);
    }
  });
  