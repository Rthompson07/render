"use strict";
var core;
(function (core) {
    class User {
        m_firstname;
        m_lastname;
        m_emailaddress;
        m_username;
        m_password;
        constructor(firstName = "", lastName = "", username = "", emailAddress = "", password = "") {
            this.m_firstname = firstName;
            this.m_lastname = lastName;
            this.m_username = username;
            this.m_emailaddress = emailAddress;
            this.m_password = password;
        }
        set FirstName(firstName) {
            this.m_firstname = firstName;
        }
        set LastName(lastName) {
            this.m_lastname = lastName;
        }
        set EmailAddress(emailAddress) {
            this.m_emailaddress = emailAddress;
        }
        set Username(username) {
            this.m_username = username;
        }
        set Password(password) {
            this.m_password = password;
        }
        get FirstName() {
            return this.m_firstname;
        }
        get LastName() {
            return this.m_lastname;
        }
        get EmailAddress() {
            return this.m_emailaddress;
        }
        get Username() {
            return this.m_username;
        }
        get Password() {
            return this.m_password;
        }
        toString() {
            let output = `First Name: ${this.FirstName}\n`;
            output += `Last Name: ${this.LastName}\n`;
            output += `Email Address: ${this.EmailAddress}\n`;
            output += `Username: ${this.Username}`;
            return output;
        }
        toJSON() {
            return {
                "firstName": this.m_firstname,
                "lastName": this.m_lastname,
                "emailAddress": this.m_emailaddress,
                "username": this.m_username,
                "password": this.m_password
            };
        }
        fromJSON(data) {
            this.m_firstname = data.FirstName;
            this.m_lastname = data.LastName;
            this.m_emailaddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }
        serialize() {
            if (this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== ""
                && this.Username !== "" && this.Password !== "") {
                return `${this.FirstName},${this.LastName},${this.EmailAddress},${this.Username},${this.Password}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.FirstName = propertyArray[0];
            this.LastName = propertyArray[1];
            this.EmailAddress = propertyArray[2];
            this.Username = propertyArray[3];
            this.Password = propertyArray[4];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map