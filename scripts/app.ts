/**
 * Rhys Thompson
 * Last Update: 03/20/2023
 * Current Update: 03/23/2023
 * File Name: app.js
 * Description: This is our JavaScript file using a different variety of different functions & tags.
 * In this assignment our group demonstrates the different types of logic used to create a basic webpage
 * including two navbars. The top navbar contains the websites name, 5 options for the user to choose from,
 * and the bottom navbar having our groups name plus the current date.
 */

"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function (){
    /** @Start
     * This function loads all the information about the pages from JavaScript to our website.
     */

    /**
     * Returns functions for the activeLink (current path) to display
     * @returns {function}
     */
    function ActiveLinkCallback() : Function{

        switch(router.ActiveLink)
        {
            case "home" : return DisplayHomePage;
            case "about" : return DisplayAboutUsPage;
            case "services" : return DisplayServicesPage;
            case "contact" : return DisplayContactUsPage;
            case "contact-list" : return DisplayContactListPage;
            case "products" : return DisplayProjectsPage;
            case "register" : return DisplayRegisterPage;
            case "login" : return DisplayLoginPage;
            case "edit" : return DisplayEditContactPage;
            case "404" : return Display404Page;
            default:
                console.error("Error: callback does not exist " + router.ActiveLink);
                return new Function();
        }

    }


    function Display404Page() : void {
        console.log("404 Page Displayed!")
    }

    function capitalizeFirstCharacter(str : string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function LoadLink(link : string, data : string = "") : void{

        router.ActiveLink = link;

        AuthGuard();

        router.LinkData = data;

        history.pushState({}, "", router.ActiveLink);

        document.title = capitalizeFirstCharacter(router.ActiveLink);

        $("ul>li>a").each(function (){
           $(this).removeClass("active");

        });
        $(`li>a:contains(${document.title})`).addClass("active")

        LoadContent();
    }

    function AddNavigationEvents(){

        let navLinks = $("ul>li>a");

        navLinks.off("click");
        navLinks.off("mouseover");

        navLinks.on("click", function () {
           LoadLink($(this).attr("data") as string);
        });
        navLinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }

    function AddLinkEvents(register: string) : void {


        let link: any;
        let linkquery = $(`a.link[data=${link}]`);

        linkquery.off("click");
        linkquery.off("mouseover");
        linkquery.off("mouseout");

        linkquery.css("text-decoration", "underline")
        linkquery.css("color","blue")

        linkquery.on("click",function() {
            LoadLink(`${link}`);
        });

        linkquery.on("mouseover",function() {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });


        linkquery.on("mouseout",function() {
            $(this).css("font-weight", "normal");
        });
    }



    function LoadHeader() : void{

        $.get("/views/components/header.html", function (html_data){
            $("header").html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });

    }

    function LoadContent() : void{

        let page = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`/views/content/${page}.html`, function (html_data){

            $("main").html(html_data);
            CheckLogin();
            callback();
        });


    }

    function LoadFooter() : void{
        $.get("/views/components/footer.html", function (html_data){

            $("footer").html(html_data);
        });
    }


    function Start() {
        console.log("App Started!")

        LoadHeader();

        LoadLink("home");

        LoadFooter();

    }
    window.addEventListener("load", Start)

    //
    //
    // Display Pages
    //
    //

    /** @DisplayHomePage
     * This function displays the home page when user clicks the home button.
     */
    function DisplayHomePage() : void {
        console.log("Home Page");

        $("#AboutUsBtn").on("click", () => {
        LoadLink("about");
        });


        $("main").append(`<p id="MainParagraph" class="mt-3">This is the main Paragraph</p>`)
        $("main").append(`<article> <p id="MainParagraph" class="mt-3">This is a article</p></article>`)
    }

    /** @DisplayProjectsPage
     * This function displays the projects page on our website.
     */
    function DisplayProjectsPage() : void {
        console.log("Display Projects Page");

        $("*main")
            .append(`<h1 class="mb-3">Rob and Rhys' Projects</h1>`)
            .append(`<p id="para1"></p>`)
            .append(`<hr/>`);
        $("#para1")
            .append(`<h1 class="robh1">Rob's Projects</h1>`)
            .append(`<hr/>`)
            .append(`<p>Here are all three of Rob's personal projects he has worked on over the years</p>`)
            .append(`<img class="img-amazon" src="../images/amazon.png" alt="No Image Found">`)
            .append(`<img class="img-facebook" src="../images/Screen_of_Facebook.png" alt="No Image Found">`)
            .append(`<img class="img-twitter" src="../images/twitter.png" alt="No Image Found">`)
            .append(`<br>`)
            .append(`<br>`)
            .append(`<p>Rob has worked for Amazon, Facebook, and Twitter working on their login pages</p>`)
            .append(`<hr/>`)
            .append(`<h1 class="rhysh1">Rhys' Projects</h1>`)
            .append(`<hr/>`)
            .append(`<p>Here are all three of Rhys' personal projects he has worked on over the years</p>`)


            .append(`<p>Rhys has worked on installing scaffold at scotia bank arena, designed an app 
                        called parkhub and installed Windows 7 through a virtual machine.</p>`);
    }

    /** @DisplayServicePage
     * This function displays our services page.
     */
    function DisplayServicesPage() : void {
        console.log("Display Services Page");

        $("*main")
            .append(`<h1 class="mb-3">Services We Provide:</h1>`)
            .append(`<h1 class="robh1">Rob's Skills</h1>`)
            .append(`<p>
                        <li>HTML/PHP/JavaScript</li>
                        <li>C#/Visual Studio</li>
                        <li>COBOL</li>
                     </p>`)
            .append(`<h1 class="rhysh1">Rhys' Skills:</h1>`)
            .append(`<p>
                        <li>Cloud</li>
                        <li>C#/Visual Studio</li>
                        <li>Python</li>
                     </p>`);
    }

    /** @DisplayAboutUsPage
     * This function displays the About Us page on our website.
     */
    function DisplayAboutUsPage() : void {
        console.log("Display About Us Page");

        $("*main")

            .append(`<h1 class="robh1">Rob Savoie</h1>`)
            .append(`<hr/>`)
            .append(`<p id="imageSection1">
                         <p class="mt-3">Rob is a 2nd Year Student at Durham College currently enrolled in the 
                                         Computer Programing Analysis program which is a 3-year course.
                         </p>
                     </p>`)
            .append(`<h1 class="rhysh1">Rhys Thompson</h1>`)
            .append(`<hr/>`)
            .append(`<p id="imageSection2">
                         <p class="mt-3">Rhys is a 2nd Year Student at Durham College currently enrolled in the 
                         Computer Programing Course which is a 2-year course. Rhys Plans to graduate this semester!
                         </p>
                     </p>`);
        $("#imageSection1")
            .append($(`<img class="img-square" src="../images/Rob.jpg" alt="Rob.jpg">`));
        $("#imageSection2")
            .append($(`<img class="img-square" src="../images/rhyswithtt.png" alt="Unable to find Rhys image">`));
    }

    /** @DisplayHRPage
     * This function displays the Human Resources page on our website.
     */
    function DisplayHRPage() {
        console.log("Display Human Resources Page");
        $("*main").append(`<h1 class="mb-3">Human Resources</h1>`);
    }

    /** @DisplayContactUsPage
     * This function displays the Contact Us page on our website.
     */
    function DisplayContactUsPage() :void {
        console.log("Display About Us Page");

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function(){
            LoadLink("contact-list");
        });

        ContactFormValidation();
        let sendButton = document.getElementById("sendButton") as HTMLElement
        let subscribeCheckbox = document.getElementById("subscriptionCheckbox") as HTMLInputElement;

       sendButton.addEventListener("click", function (){
            if(subscribeCheckbox.checked){
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let email = document.forms[0].email.value;
                let message = document.forms[0].message.value;

                AddContact(fullName, contactNumber, email, message);
                location.href = "/contact-list";
            }
        });

        $("*main")
            .append($(`<h5 class="mb-3">Rob Savoie</h5>`))
            .append(`<p>Email Address: robert.savoie1@dcmail.ca</p>`)
            .append($(`<hr/>`))
            .append(`<h5 class="mb-3">Rhys Thompson</h5>`)
            .append(`<p>Email Address: rhys.thompson@dcmail.ca</p>`);
    }

    /**
     * @DisplayContactListPage
     * This function displays the contact list page.
     */
    function DisplayContactListPage() : void {
        console.log("Display Contact List Page")

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";
            // Add deserialized data from localStorage
            let keys = Object.keys(localStorage);
            // return a string array of keys
            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key) as string;
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td>${contact.Message}</td>                         
                         <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                            <i class="fa-solid fa-edit fa-sm"></i> Edit
                            </button>
                         </td>
                         <td>
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                            <i class="fa-regular fa-trash-alt fa-sm"></i> Delete
                            </button>
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;
            $("#AddBtn").on("click", () => {
                LoadLink("edit", "add");
            });
            $("button.delete").on("click", function () {
                if(confirm("Are you sure you want to delete this contact?")){
                    localStorage.removeItem($(this).val() as string);
                    LoadLink("contact-list");
                }
            });
            $("button.edit").on("click", function () {
                LoadLink("edit", $(this).val() as string);

            });
        }
    }

    /**
     * @DisplayEditContactPage
     * This function displays the edit contact list page
     */
    function DisplayEditContactPage() : void{
        console.log("Display Edit Contact Page")

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                // noinspection JSJQueryEfficiency
                $("#EditBtn").html(`<i class="fas fa-plus fa-sm"></i> Add`).on("click", (event) => {
                    event.preventDefault();

                    let fullName = document.forms[0].fullName.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let email = document.forms[0].email.value;
                    let message = document.forms[0].message.value;

                    AddContact(fullName, contactNumber, email, message);
                    LoadLink("contact-list");
                });

                // noinspection JSJQueryEfficiency
                $("#CancelBtn").on("click", () => {
                    LoadLink("contact-list");
                });
                break;
            default:{
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#email").val(contact.EmailAddress);
                $("#message").val(contact.Message);
                $("#EditBtn").on("click", (event) => {
                    event.preventDefault();

                    contact.FullName = $("#fullName").val() as string;
                    contact.ContactNumber = $("#contactNumber").val() as string;
                    contact.EmailAddress = $("#email").val() as string;
                    contact.Message = $("#message").val() as string;

                    localStorage.setItem(page, contact.serialize() as string);
                    LoadLink("contact-list");
                });
                $("#CancelBtn").on("click", () => {
                    LoadLink("contact-list");
                });
                break;
            }
        }
    }

    /**
     * @DisplayLoginPage
     * This function displays the login page
     */
    function DisplayLoginPage() : void{
        console.log("Display Login Page")

        let messageArea = $("#messageArea");
        messageArea.hide();

        AddLinkEvents("register");

        $("#loginBtn").on("click", function(){
            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){
                for(const u of data.users){

                    let userName = document.forms[0].userName.value
                    let password = document.forms[0].password.value


                    if(userName === u.Username && password === u.Password){
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }
                if(success){
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                }
                else{
                    $("#userName").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Failed to authenticate").show();
                }
            });
        });
        $("#cancelBtn").on("click", function(){
            document.forms[0].reset();
            LoadLink("login");
        })
    }

    /**
     * @DisplayRegisterPage
     * This function displays the register page
     */
    function DisplayRegisterPage() : void{
        console.log("Display Register Page")

        $("<div id='messageArea'></div>").insertAfter($("#heading")).hide();
        // Register validation function. Checks to make sure all text fields are the correct input
        RegisterFormValidation();

        $("#registerBtn").on("click", function(event){
            event.preventDefault();

            let success = false;
            let newUser = new core.User();
            let confirmPassword = document.forms[0].confirmPassword.value;
            let username = document.forms[0].username.value;
            let email = document.forms[0].email.value;
            let password = document.forms[0].password.value;

            $.get("./data/user.json", function(data){

                for(const u of data.users){
                    if(email.value === u.EmailAddress){
                        $("#messageArea").addClass("alert alert-danger").text("Error: Email address already in use").show();
                        break;
                    }
                    if(username.value === u.Username){
                        $("#messageArea").addClass("alert alert-danger").text("Error: User already exists").show();
                        break;
                    }
                    else{
                        if(password.value === confirmPassword.value){
                            success = true;
                            break;
                        }
                        else{
                            $("#messageArea").addClass("alert alert-danger").text("Error: Passwords must match").show();
                        }
                    }
                }
                // When all text fields are filled. Register page will direct user to login page.
                if(success){
                    newUser.FirstName = $("#firstName").val() as string;
                    newUser.LastName = $("#lastName").val() as string;
                    newUser.EmailAddress = $("#email").val() as string;
                    newUser.Username = $("#username").val() as string;
                    newUser.Password = $("#password").val() as string;
                    console.log(newUser.toString());
                    $("#messageArea").removeAttr("class").hide();
                    $("#registerForm").trigger("reset");
                    // location.href = "login.html?username=" + newUser.Username + "&password=" + newUser.Password;
                }
            });
        });
    }

    /**
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     * @param message
     * @AddContact
     * Add contact infor such as fullname, contact number, email address, and
     * message
     */
    function AddContact(fullName : string, contactNumber : string, emailAddress : string, message: string) : void
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress, message);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }


    /**
     * @AuthGuard
     *
     *
     */
    function AuthGuard() : void {
        let protected_routes : string[] = ["contact-list"];

        if(protected_routes.indexOf(router.ActiveLink) > -1) {
          if (!sessionStorage.getItem("user")) {
            router.ActiveLink="/login";
          }
        }


    }



    /**
     * @CheckLogin
     * This function validates user input information.
     */
    function CheckLogin() : void{
        if(sessionStorage.getItem("user")){
            $("#loginHeader").html(`<a id="logoutHeader" class="nav-link" href="#">
                            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`);

            $(`<li class='nav-item'>
                <a id='user' class='nav-link' href='#'></a>
                </li>`).insertAfter($("#contactHeader"));

            let user = new core.User();
            let userData = sessionStorage.getItem("user");
            // user.deserialize(userData);

            $("#user").text(user.Username);
        }
        $("#logoutHeader").on("click", function(){
            sessionStorage.clear();
            LoadLink("home");
        })
    }

    /**
     * @ContactFormValidation
     * This function validates the contact page input information.
     */
    function ContactFormValidation() : void{
        // Validate full name
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
            "Please enter a valid first and last name (ex. Mr. Peter Parker)");
        // Validate Phone Number
        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone number (ex. 555 555-5555");
        // Validate Email Address
        ValidateField("#email",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address (ex. example@email.com");
    }

    /**
     * @RegisterFormValidation
     * This function validates the input in register form page.
     */

    function RegisterFormValidation(){
        ValidateField("#firstName",
            /^[a-zA-Z]{2,}$/,
            "First name must be at least 2 characters");
        // Validate full name
        ValidateField("#lastName",
            /^[a-zA-Z]{2,}$/,
            "Last name must be at least 2 characters");
        // Validate Phone Number
        ValidateField("#email",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Email must be at least 8 characters and have an @ symbol");
        ValidateField("#username",
            /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Characters must range from 6-20 (ex: johndoe07)");
        // Enter password validation
        ValidateField("#password",
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
            "Please enter a valid password. Must have a minimum of 6 characters, " +
            "1 letter, and one special character.");
    }

    /**
     * @param inputFieldID
     * @param regularExpression
     * @param errorMessage
     * @ValidateField
     * This validates user info such as input id,
     * regular expression, error message.
     */
    function ValidateField(inputFieldID : string, regularExpression : RegExp, errorMessage : string) : void{
        let messageArea = $("#messageArea");

        $(inputFieldID).on("blur", function(){

            let inputFieldText = $(this).val() as string;
            if(!regularExpression.test(inputFieldText)){
                // fail validation
                $(this).trigger("focus").trigger("select"); // go back to the fullName text
                messageArea.addClass("alert alert-danger").text(errorMessage).show();

            }else{
                //pass validation
                messageArea.removeAttr("class").hide();
            }
        });
    }
})();