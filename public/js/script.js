$(document).ready(function () {
  const loginBtn = $("#login-btn");
  const signupBtn = $("#signup-btn");
  const usernameInput = $("#username-input");
  const passwordInput = $("#password-input");

  // SIGNUP
  // ==================================================
  function signupUser(username, password) {
    // Signup user and redirect to login
    $.post("/api/signup", {
      username: username,
      password: password
    })
      .then(function () {
        window.location.replace("/login");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  signupBtn.on("click", function (e) {
    // Login event handler
    e.preventDefault();
    let user = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    if(user.username === '' || user.password === '') {
      return;
    }
    signupUser(user.username, user.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // LOGIN
  // ==================================================
  function loginUser(username, password) {
    // Login user and redirect to home
    $.post("/api/login", {
      username: username,
      password: password,
    })
      .then(function () {
        window.location.replace("/home");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  loginBtn.on("click", function (e) {
    // Login event handler
    e.preventDefault();
    let user = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (user.username === '' || user.password === '') {
      return;
    }
    loginUser(user.username, user.password);
    usernameInput.val("");
    passwordInput.val("");
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
