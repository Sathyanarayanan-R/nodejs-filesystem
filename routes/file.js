const router = require('express').Router();

const fs = require('fs');

router.get("/", (req, res) => {

    // List all the text files in a particular directory (/opt/render/project/src/testFolder) on server.

    let directory_name = "testFolder";

    try {

        let filenames = fs.readdirSync(directory_name);
        res.status(200).json({ "Text Filenames in directory /opt/render/project/src/testFolder on server": filenames });

    } catch (err) {
        res.status(400).json('Error: ' + err);
    }

});

router.post("/create", (req, res) => {

    // To Create a New File in a Particular Directory on Server

    const curTimestamp = Date.now();

    let date_ob = new Date(curTimestamp);

    var curDateTime = ('0' + date_ob.getDate()).slice(-2) + '.' + ('0' + (date_ob.getMonth() + 1)).slice(-2) + '.' + date_ob.getFullYear() + '-' + date_ob.getHours() + '.' + date_ob.getMinutes() + '.' + date_ob.getSeconds();

    let directory_name = 'testFolder';

    // Create a Directory named testFolder on server(path : /opt/render/project/src/).
    if (!fs.existsSync(directory_name)) {
        fs.mkdirSync(directory_name);
    }

    // Create a Text File named <current date-time>.txt in /opt/render/project/src/testFolder Directory on server & set the content of that file to current timestamp.

    fs.writeFile(`${directory_name}/${curDateTime}.txt`, `${curTimestamp}`, function (err) {
        if (err) {
            res.status(400).json('Error: ' + err);
        }
        console.log(`The file named ${curDateTime} was created in directory /opt/render/project/src/testFolder on server.`);
        res.status(200).json({ message: `The file named ${curDateTime} was created in directory /opt/render/project/src/testFolder on server.` });
    });

})

module.exports = router;
