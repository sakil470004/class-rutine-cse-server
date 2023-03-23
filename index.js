const express = require('express');
// for parse xlsx file
const XLSX = require("xlsx")
const cors = require('cors');
// const fileUpload = require('express-fileupload');

// middleware
// require('dotenv').config()
const app = express();
app.use(express.json());


app.use(cors());
// app.use(fileUpload());



// const pipeline = promisify(require("stream").pipeline);

const port = process.env.PORT || 5000;


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.poyqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri)

// const client = new MongoClient(uri);



async function run() {
    try {

        // =====================***test start***=========================//


        // =====================***test end***=========================//






        // GET API
        app.get('/', async (req, res) => {
            res.json({ hi: 'OK EVERYTHING' })
        })

        // get the xlsx data

        app.get('/getRoutine', async (req, res) => {
            try {

                const fileName = 'cseRoutine.xlsx'
                const workbook = await XLSX.readFile(`${__dirname}/${fileName}`, { cellDates: true });
                // const worksheet = workbook.Sheets["Q-A"]
                const worksheet = await workbook.Sheets[await workbook.SheetNames[0]]
                const sheetJsonData = await XLSX.utils.sheet_to_json(worksheet);

                res.json({
                    status: 'success',
                    data: sheetJsonData,
                })
            }
            catch (e) {
                res.json({
                    error: e
                })
            }

        })


    } finally {
        // await client.close();
    }
}

run().catch(console.dir);




app.listen(port, () => {
    console.log('your node server is running ', port)

})
