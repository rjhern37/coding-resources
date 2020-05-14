$.ajaxSetup({
  headers: { "x-user-id": localStorage.getItem("userId") },
});

$(document).ready(function () {
  const loginBtn = $("#login-btn");
  const signupBtn = $("#signup-btn");
  const createBtn = $("#create-resource");
  const saveBtn = $(".save-resource");
  const usernameInput = $("#username-input");
  const passwordInput = $("#password-input");
  const nameInput = $("#name-input");
  const linkInput = $("#link-input");
  const descriptionInput = $("#description-input");

  // SIGNUP
  // ==================================================
  function signupUser(username, password) {
    // Signup user and redirect to login
    $.post("/api/signup", {
      username: username,
      password: password,
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
    if (user.username === "" || user.password === "") {
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
      .then(function (data) {
        localStorage.setItem("userId", data.id);
        // Save user ID to local storage
        window.location.replace("/home");
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
      password: passwordInput.val().trim(),
    };
    if (user.username === "" || user.password === "") {
      return;
    }
    loginUser(user.username, user.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // RESOURCES
  // ==================================================
  // CREATE
  function createResource(name, description, link) {
    // Signup user and redirect to login
    $.post("/api/resources", {
      resourceName: name,
      description: description,
      link: link,
    })
      .then(function () {
        window.location.replace("/api/resources");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  createBtn.on("click", function (e) {
    // Login event handler
    e.preventDefault();
    let resource = {
      name: nameInput.val().trim(),
      link: linkInput.val().trim(),
      description: descriptionInput.val().trim(),
    };
    if (
      resource.name === "" ||
      resource.link === "" ||
      resource.description === ""
    ) {
      return;
    }
    createResource(resource.name, resource.description, resource.link);
    nameInput.val(""), linkInput.val(""), descriptionInput.val("");
  });
  // SAVE
  function saveResource(resourceId) {
    $.post("/api/save", {
      ResourceId: resourceId,
    })
      .then(function () {
        window.location.replace("/api/save");
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  $(document).on("click", ".save-resource", function (e) {
    e.preventDefault();
    let resourceId = +$(this).attr("data-id");
    saveResource(resourceId);
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
