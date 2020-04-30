// dynamic generation of registration and login forms
let renderAuthForms = type => {
    let div1 = $("<div>").addClass("form-group");
    let div2 = $("<div>").addClass("form-group");
    let btn = $("<btn>"),addClass("form-control btn btn-dark");
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

    div1.append(inputEmail)
}