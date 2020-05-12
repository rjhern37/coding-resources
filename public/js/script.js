$(document).ready(function () {
  const loginBtn = $("#login-btn");
  const signupBtn = $("#signup-btn");
  const loginInput = $("#login-username");
  const usernameSignup = $("#signup-username");


  function loginUser(user) { // Login user and redirect to home
    $.post("/api/login", {
      username: user
    })
      .then(function() {
        window.location.replace("/home");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }


  loginBtn.on("click", function(e) { // Login event handler
    e.preventDefault();
    let user = {
      username: loginInput.val().trim()
    };
    if (!loginInput) {
      return;
    }
    loginUser(user.username);
    loginInput.val("");
  });

  

  // var nameInput = $("#line-name")
  // //adding more var

  // $(document).on("submit", ".line-form", handleLineFormSubmit);
  // $(document).on("click", ".delete-line", handleDeleteButtonPress);

  // getLine();

  // function handleLineFormSubmit(event) {
  //     event.preventDefault();
  //     //if
  // }

  // upsertLine({
  //     name: nameInput
  //     .val()
  //     .trim()
  // });

  // function infoData(userData) {
  //     $.post("/api/info", userData)
  //     .then(getInfo);
  // }

  // function createInfoRow(userData) {
  //     var newTr = $("<tr>");
  //     newTr.data("<td>" + userData);
  //     newTr.append("<td>" + userData.name + "</td>");
  //     if (userData.Posts) {
  //         newTr.append("<td>" + userData.name + "</td>");
  //     } else {
  //         newTr.append("<td>0</td>");

  //     }
  //     return newTr;
  // }

  // function getLine() {
  //     $.get("/api/Line", function(data) {
  //         var rowsToAdd = [];
  //         for (var i = 0; i <data.length; i++) {
  //             rowsToAdd.push(creatLineRow(data[i]));
  //         }
  //         renderLineList(rowsToAdd);
  //         nameInput.Val("");
  //     });
  // }

  // function renderLineList(rows) {
  //     authorList.children().not(":list").remove();
  //     authorContainer.children(".alert").remove();
  //     if (rows.length) {
  //         console.long(rows);
  //         authorList.prepend(rows);
  //     }
  //     else {
  //         renderEmpty();
  //     }
  // }

  // function renderEmpty() {
  //     var alertDiv = $("<div>");
  //     alertDiv.addClass("alert alert danger");
  //     alertDiv.text("You must create a line before you can make a post.")
  //     authorContainer.append(alertDiv);
  // }

  // function handleDeleteButtonPress() {
  //     var listItemData = $(this).parent("td").parent("tr").data("author");
  //     var id = listItemData.id;
  //     $.ajax({
  //         method: "DELETE",
  //         url: "/api/line/" + id
  //     })
  //     .then(getLine);
  // }
});
