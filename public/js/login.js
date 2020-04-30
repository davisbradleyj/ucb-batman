// dynamic generation of registration and login forms
let renderAuthForms = type => {
    let div1 = $("<div>").addClass("form-group");
    let div2 = $("<div>").addClass("form-group");
    let div3 = $("<div>").addClass("form-group");
    let btn = $("<btn>").addClass("form-control btn btn-dark");
    let inputUsername = $("<input>").addClass("form-control").attr({
        id: "username",
        type: "username",
        placeholder: "choose a username",
        autocomplete: "username"
    })
    let inputEmail = $("<input>").addClass("form-control").attr({
        id: "email",
        type: "email",
        placeholder: "enter email address",
        autocomplete: "email"
    });

    let inputPW = $("<input>").addClass("form-control").attr({
        id: "password",
        type: "password",
        placeholder: "enter password",
        autocomplete: "password"
    });

    let form = $("#auth");
    form.empty();

    div1.append(inputUsername);
    div2.append(inputEmail);
    div3.append(inputPW);

    switch (type) {
        case "signin":
            btn.addClass("loginAuth").text("Login");
            form.append(div1, div3, btn);
            break;
        default:
            let div4 = $("<div>").addClass("form-group");
            let inputPWConf = $("<input>").addClass("form-control").attr({
                id: "pwconfirm",
                type: "password",
                placeholder: "confirm password",
                autocomplete: "password-confirm"
            });
            btn.addClass("registerAuth").text("Register");
            div4.append(inputPWConf);
            form.append(div1, div2, div3, div4, btn);

    }
}

// event listener for sign in link
$(document).on("click", ".signin", event => {
    event.preventDefault();
    renderAuthForms("signin")
    $(".signin").addClass("d-none");
    $(".register").addClass("d-none");
})

// event listener for register link
$(document).on("click", ".register", event => {
    event.preventDefault();
    renderAuthForms("register")
    $(".signin").addClass("d-none");
    $(".register").addClass("d-none");
})

// event listener for register button
$(document).on("click", ".registerAuth", event => {
    event.preventDefault();
    console.log("regAuth clicked")
    let username = $("#username");
    let email = $("#email");
    let pw = $("#password");
    let pwconf = $("#pwconfirm");
    
    if (username.val().trim().length < 1) {
        username.focus();
    }

    if (email.val().trim().length < 1) {
        email.focus();
 
    } else if (pw.val().trim().length < 1) {
        pw.focus();

    } else if (pw.val().trim() !== pwconf.val().trim()) {
        pwconf.val("").attr("placeholder", "passwords don't match").focus();

    } else {
        console.log("if 5")
        let user = {
            username: username.val().trim(),
            email: email.val().trim(),
            password: pw.val().trim(),
            favorites: "",
            hasReview: false
          }
        $.ajax({
            url: "/api/user",
            type: "POST",
            data: user
        }).then(conf => {
            if (conf) {
                $("#auth").empty();
                window.location.replace("./main");
            } else {
                console.log("registration failed")
                $("#email").val("").focus();
            }
        })
    }
})

// event listener for login button
$(document).on("click", ".loginAuth", event => {
    event.preventDefault();
    console.log("login clicked")
    let username = $("#username");
    let pw = $("#password");

    if (username.val().trim().length < 1) {
        username.focus();
    } else if (pw.val().trim().length < 1) {
        pw.focus();
    } else {
        let user = {
            username: $("#username").val(),
            password: $("#password").val(),
        }
        $.ajax({
            url: "/api/user",
            type: "PUT",
            data: user,
        }).then(conf => {
            if (conf) {
                console.log("logged in")
                window.localStorage.setItem("user", conf)
                $("#auth").empty();
                window.location.replace("./main");
            } else {
                console.log("login failed")
                $("#password").val("").focus();
            }
        })
    }
})