$(document).ready(function () {
  
  // ==================================================
  // USER
  // ==================================================
  // Sign up
  function signupUser(username, password) {
    // Signup user and redirect to login
    $.post("/api/users/signup", {
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
  $("#signup-btn").on("click", function (e) {
    // Login event handler
    e.preventDefault();
    let user = {
      username: $("#username-input").val().trim(),
      password: $("#password-input").val().trim(),
    };
    if (user.username === "" || user.password === "") {
      return;
    }
    signupUser(user.username, user.password);
    $("#username-input").val("");
    $("#password-input").val("");
  });
  // Login
  function loginUser(username, password) {
    // Login user and redirect to home
    $.post("/api/users/login", {
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
  $("#login-btn").on("click", function (e) {
    // Login event handler
    e.preventDefault();
    let user = {
      username: $("#username-input").val().trim(),
      password: $("#password-input").val().trim(),
    };
    if (user.username === "" || user.password === "") {
      return;
    }
    loginUser(user.username, user.password);
    $("#username-input").val("");
    $("#password-input").val("");
  });

  // ==================================================
  // RESOURCES
  // ==================================================
  // Create new resource
  function createResource(name, description, link) {
    $.post("/api/resources/create", {
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
  $("#create-resource").on("click", function (e) {
    // Login event handler
    e.preventDefault();
    let resource = {
      name: $("#name-input").val().trim(),
      link: $("#link-input").val().trim(),
      description: $("#description-input").val().trim(),
    };
    if (
      resource.name === "" ||
      resource.link === "" ||
      resource.description === ""
    ) {
      return;
    }
    createResource(resource.name, resource.description, resource.link);
    $("#name-input").val(""), $("#link-input").val(""), $("#description-input").val("");
  });
  // Save resource to user saved resources
  function saveResource(resourceId) {
    $.post("/api/resources/save", {
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
  $("#search-btn").on("click", function (e) {
    e.preventDefault();
    let tagId = $("#tag-select").val().trim();
    findResourcesByTag(tagId);
  });
  // Add tag to new resource
  function addTag(tagId, tagName) {
    let tag = `<button class="button" data-id="${tagId}">${tagName}</button>`;
    $("#added-tag-list").append(tag);
  }
  $("#add-tag-btn").on("click", function (e) {
    e.preventDefault();
    let tagId = $("#tag-select").val();
    let tagName = $("#tag-select option:selected").text();
    addTag(tagId, tagName);
  });

  // ==================================================
  // TAGS
  // ==================================================
  // Create tag 
  function createTag(tagName) {
    $.post("/api/tags/create", {
      tagName: tagName
    })
      .then(function () {
        window.location.replace("/create");

        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  $("#create-tag-btn").on("click", function (e) {
    e.preventDefault();
    let tagName = $("#create-tag-input").val().trim();
    createTag(tagName);
  });

});
