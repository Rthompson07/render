"use strict";

namespace core {

    export class Contact {

        // Constructors
        private m_fullname: string;
        private m_contactnumber: string;
        private m_emailaddress: string;
        private m_message: string;
        constructor(fullName : string = "", contactNumber : string = "", emailAddress : string = "",
                    message : string = "") {
            this.m_fullname = fullName;
            this.m_contactnumber = contactNumber;
            this.m_emailaddress = emailAddress;
            this.m_message = message;
        }

        // Setters
        public set FullName(fullName: string) {
            this.m_fullname = fullName;
        }

        public set ContactNumber(contactNumber: string) {
            this.m_contactnumber = contactNumber;
        }

        public set EmailAddress(emailAddress: string) {
            this.m_emailaddress = emailAddress;
        }

        public set Message(message: string) {
            this.m_message = message;
        }

        // Getters
        public get FullName() : string {
            return this.m_fullname;
        }

        public get ContactNumber() : string {
            return this.m_contactnumber;
        }

        public get EmailAddress() : string {
            return this.m_emailaddress;
        }

        public get Message() : string {
            return this.m_message;
        }

        // Methods
        public toString() : string{
            return `Full Name: ${this.FullName}\n 
                Contact Number: ${this.ContactNumber}\n 
                Email Address: ${this.EmailAddress}\n
                Message: ${this.Message}`;
        }

        public serialize() : string | null{
            if (this.FullName !== "" && this.ContactNumber !== ""
                && this.EmailAddress !== "" && this.Message !== "") {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress},${this.Message}`;
            }
            console.error("One of more of the contact attributes is/are empty or missing");
            return null;
        }

        public deserialize(data : string) {
            let propertyArray = data.split(",");
            this.m_fullname = propertyArray[0];
            this.m_contactnumber = propertyArray[1];
            this.m_emailaddress = propertyArray[2];
            this.m_message = propertyArray[3];
        }

    }

}