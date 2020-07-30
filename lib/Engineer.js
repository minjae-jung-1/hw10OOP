const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
    getEmail(){
        return this.email
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
}

module.exports = Engineer;