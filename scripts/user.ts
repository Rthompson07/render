"use strict";

namespace core {

    export class User {

        // Constructors
        private m_firstname: string | number | string[] | undefined;
        private m_lastname: string;
        private m_emailaddress: string;
        private m_username: string;
        private m_password: string;
        constructor(firstName : string = "", lastName: string = "", username : string = "",
                    emailAddress : string = "", password : string = "") {
            this.m_firstname = firstName;
            this.m_lastname = lastName;
            this.m_username = username;
            this.m_emailaddress = emailAddress;
            this.m_password = password;
        }

        // Setters
        public set FirstName(firstName: string | number | string[] | undefined) {
            this.m_firstname = firstName;
        }

        public set LastName(lastName : string) {
            this.m_lastname = lastName;
        }

        public set EmailAddress(emailAddress : string) {
            this.m_emailaddress = emailAddress;
        }

        public set Username(username : string) {
            this.m_username = username;
        }

        public set Password(password : string) {
            this.m_password = password;
        }

        // Getters
        public get FirstName() : string | number | string[] | undefined {
            return this.m_firstname;
        }

        public get LastName() : string {
            return this.m_lastname;
        }

        public get EmailAddress() : string {
            return this.m_emailaddress;
        }

        public get Username() : string {
            return this.m_username;
        }

        public get Password() : string {
            return this.m_password;
        }

        // Methods
        public toString() : string {
            let output = `First Name: ${this.FirstName}\n`;
            output += `Last Name: ${this.LastName}\n`;
            output += `Email Address: ${this.EmailAddress}\n`;
            output += `Username: ${this.Username}`;

            return output;
        }

        public toJSON() : { firstName: string | number | string[] | undefined; lastName: string; emailAddress: string; password: string; username: string }

        {
            return {
                "firstName" : this.m_firstname,
                "lastName" : this.m_lastname,
                "emailAddress" : this.m_emailaddress,
                "username" : this.m_username,
                "password" : this.m_password
            }
        }

        fromJSON(data : User){
            this.m_firstname = data.FirstName;
            this.m_lastname = data.LastName;
            this.m_emailaddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }

        public serialize() : string | null{
            if (this.FirstName !== "" && this.LastName !== "" && this.EmailAddress !== ""
                && this.Username !== "" && this.Password !== "") {
                return `${this.FirstName},${this.LastName},${this.EmailAddress},${this.Username},${this.Password}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }

        public deserialize(data : string ) : void {
            let propertyArray = data.split(",");
            this.FirstName = propertyArray[0];
            this.LastName = propertyArray[1];
            this.EmailAddress = propertyArray[2];
            this.Username = propertyArray[3];
            this.Password = propertyArray[4];
        }
    }

}