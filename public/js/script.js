$(document).ready(function () {
  const loginBtn = $("#login-btn");
  const signupBtn = $("#signup-btn");
  const createBtn = $("#create-resource");
  const searchBtn = $("#search-btn");
  const addTagBtn = $("#add-tag-btn");
  const usernameInput = $("#username-input");
  const passwordInput = $("#password-input");
  const nameInput = $("#name-input");
  const linkInput = $("#link-input");
  const descriptionInput = $("#description-input");
  const tagSelect = $("#tag-select");
  const addedTagList = $("#added-tag-list");


  // USER
  // ==================================================
  // Sign up
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
  // Login
  function loginUser(username, password) {
    // Login user and redirect to home
    $.post("/api/login", {
      username: username,
      password: password,
    })
      .then(function (data) {
        window.location.replace("/");
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
  // Create new resource
  function createResource(name, description, link) {
    $.post("/api/create", {
      resourceName: name,
      description: description,
      link: link,
    })
      .then(function () {
        window.location.replace("/");
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
  // Save resource to user saved resources
  function saveResource(resourceId) {
    $.post("/api/save", {
      ResourceId: resourceId,
    })
      .then(function () {
        window.location.replace("/saved");
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
  // Search resources by tag name
  function findResourcesByTag(tagId) {
    $.get("/search/" + tagId)
      .then(function () {
        window.location.replace("/search/" + tagId);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  searchBtn.on("click", function (e) {
    e.preventDefault();
    let tagId = tagSelect.val().trim();
    findResourcesByTag(tagId);
  });
  // Add tag to new resource
  function addTag(tagId, tagName) {
    let tag = `<button class="button" data-id="${tagId}">${tagName}</button>`;
    addedTagList.append(tag);
  }
  addTagBtn.on("click", function (e) {
    e.preventDefault();
    let tagId = tagSelect.val();
    let tagName = $("#tag-select option:selected").text();
    addTag(tagId, tagName);
  });

  // TAGS
  // ==================================================
  // Create tag 
  function createTag(tagId, tagName) {
    let tag = `<button class="button" data-id="${tagId}">${tagName}</button>`;
    addedTagList.append(tag);
  }
  addTagBtn.on("click", function (e) {
    e.preventDefault();
    let tagId = tagSelect.val();
    let tagName = $("#tag-select option:selected").text();
    addTag(tagId, tagName);
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
