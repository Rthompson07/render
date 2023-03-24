"use strict";
var core;
(function (core) {
    class Contact {
        m_fullname;
        m_contactnumber;
        m_emailaddress;
        m_message;
        constructor(fullName = "", contactNumber = "", emailAddress = "", message = "") {
            this.m_fullname = fullName;
            this.m_contactnumber = contactNumber;
            this.m_emailaddress = emailAddress;
            this.m_message = message;
        }
        set FullName(fullName) {
            this.m_fullname = fullName;
        }
        set ContactNumber(contactNumber) {
            this.m_contactnumber = contactNumber;
        }
        set EmailAddress(emailAddress) {
            this.m_emailaddress = emailAddress;
        }
        set Message(message) {
            this.m_message = message;
        }
        get FullName() {
            return this.m_fullname;
        }
        get ContactNumber() {
            return this.m_contactnumber;
        }
        get EmailAddress() {
            return this.m_emailaddress;
        }
        get Message() {
            return this.m_message;
        }
        toString() {
            return `Full Name: ${this.FullName}\n 
                Contact Number: ${this.ContactNumber}\n 
                Email Address: ${this.EmailAddress}\n
                Message: ${this.Message}`;
        }
        serialize() {
            if (this.FullName !== "" && this.ContactNumber !== ""
                && this.EmailAddress !== "" && this.Message !== "") {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress},${this.Message}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.m_fullname = propertyArray[0];
            this.m_contactnumber = propertyArray[1];
            this.m_emailaddress = propertyArray[2];
            this.m_message = propertyArray[3];
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map