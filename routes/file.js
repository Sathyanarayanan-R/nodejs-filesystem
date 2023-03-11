const router = require('express').Router();

const fs = require('fs');

router.get("/", (req, res) => {
    
    // List all the text files in a particular folder/directory (C:\testFolder in WINDOWS or /testFolder in LINUX)
    
    let directory_name = "/testFolder";

    let filenames = fs.readdirSync(directory_name);
    res.send({ filenames });

});

router.post("/create", (req, res) => {

  // To Create a New File in a Particular Folder 

const curTimestamp = Date.now();

let date_ob = new Date(curTimestamp);

var curDateTime = ('0' + date_ob.getDate()).slice(-2) + '.' + ('0' + (date_ob.getMonth() + 1)).slice(-2) + '.' + date_ob.getFullYear() + '-' + date_ob.getHours() + '.' + date_ob.getMinutes() + '.' + date_ob.getSeconds();

let directory_name = '/testFolder';

// Create a Folder/Directory named testFolder
if (!fs.existsSync(directory_name)) {
    fs.mkdirSync(directory_name);
}

// Create a Text File named <current date-time>.txt in a /testFolder Folder/Directory & set the content of that file to current timestamp.

fs.writeFile(`${directory_name}/${curDateTime}.txt`, `${curTimestamp}`, function(err) {
    if(err) {
        res.status(400).json('Error: '+err);
    }
    console.log(`The file named ${curDateTime} was created. Kindly check in Folder C:\\${directory_name.slice(1, directory_name.length)} (WINDOWS) or Directory ${directory_name} (LINUX) in your system`);
    res.status(200).json({message: `The file named ${curDateTime} was created. Kindly check in Folder C:\\${directory_name.slice(1, directory_name.length)} (WINDOWS) or Directory ${directory_name} (LINUX) in your system`});
});

})

module.exports = router;