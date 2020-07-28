const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer')
const render = require("./lib/htmlRender")
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const express = require("express")
const app = express();
const port = 8080;
app.listen(port);

// var dbfile = fs.readFileSync(__dirname + "/db.json")
// var db = JSON.parse(dbfile)
var team = [];
function initFunct(){
    addEmployee();
}

function addEmployee(){
    inquirer.prompt([
    {
        name: "name",
        message: "Enter employee's name"
    },
    {
        type: "list",
        name: "position",
        message: "Select employee's position",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        message: "Enter employee id",
        name: "id"
    },
    {
        message: "Enter email",
        name: "email"
    }]).then(function(name, position, id, email){
        console.log(name)
        let positionInfo = '';
        if(position === "Engineer"){
            positionInfo = "GitHub Username"
        }
        else if(position === "Manager"){
            positionInfo = "Office Info"
        }
        else if(position === "Intern"){
            positionInfo = "UniName"
        };


        inquirer.prompt([
            {
            message: `Enter employee's position info${positionInfo}`,
            name: "positionInfo"
            },
            {
            type: "list",
            message: "Add more employees?",
            choices:["yes", "no"],
            name: "addEmployee"
            }
        ],name).then((data)=>{
            let addMember;
            let name = data.name;
            let id = data.id;
            let email = data.email;
            let officeNumber = data.positionInfo;
            if(position === "Engineer"){
                addMember = new Engineer(name, id, email, positionInfo);
            }else if(position === "Intern"){
                addMember = new Intern(name, id, email, positionInfo);
            }
            else{
                addMember = new Manager(name, id, email, officeNumber)
            }
            team.push(addMember);

            // fs.writeFileSync(__dirname + "/db.json", JSON.stringify(db))


            // fs.writeFile(outputPath, render(team), function(err) {
            //     if (err) {
            //         console.log(err);
            //     }
            // });
            // if(data.addMore ==='Yes') {
            //     addMember();
            // }
            // else {
            //     render(team);
            //     // process.exit(1);
            //     };



                app.get('/',function(req, res) {
                    res.send(render(team));
                  });
                console.log("ur url is accessible: http://localhost:8080")
                addEmployee();
        })

    })

}



initFunct();