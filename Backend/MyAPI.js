const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./config/admin');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
const PORT = process.env.PORT || 5555
app.listen(PORT, function () {
    console.log(`Server ${PORT} is running ... `);
})

//Firebase
app.get('/', function (req, res) {
    res.send('Hello World');
})

//GET
app.get("/RFID", async (req, res) => {
    const cRef = db.collection('RFID');
    try {
        cRef.get().then((snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }
            ))
            console.log(items);
            res.status(201).json(items);
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
    // res.status(201).json(items);
})

//POST 
app.post('/RFID', async (req, res) => {
    const { id, name, gender, email } = req.body;
    // var d = new Date();
    console.log(req.body)
    // res.send('aa')
    var datatest = {
        id: id,
        name: name,
        gender: gender,
        email: email
    }
    console.log(datatest)
    const data = req.body;
    const docRef = db.collection('RFID').doc(`${id}`);
    docRef.set(data)
        .then(() => {
            console.log('Tài liệu đã được tạo thành công!');
        })
        .catch((error) => { console.error('Lỗi khi tạo tài liệu: ', error); });
    res.send('add successfully')
});
//delete
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const documentRef = db.collection('RFID').doc(id);
        documentRef.delete();
        res.send('delete successfully')
    } catch (error) {
        console.error('Error deleting document', error);
    }
});
//update
app.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const document = db.collection('RFID').doc(id);
    const dataToUpdate = req.body;
    try {

        await document.update(dataToUpdate);
        console.log(dataToUpdate);
        res.send(`Document ${id} has been updated successfully.`);
    } catch (error) {
        console.error('Error updating document', error);
    }
});
//getById
app.get('/RFID/:id', async (req, res) => {
    try {
        const rfidRef = db.collection("RFID").doc(req.params.id);
        const response = await rfidRef.get();
        res.send(response.data())
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

//UPDATE
app.put('/RFID/:id', async (req, res) => {
    const id = req.params.id;
    const data = await db.collection('RFID').get();
    try {
        let isIdExist = false;
        data.forEach(doc => {
            if (doc.id == req.params.id)
                isIdExist = true;
        });
        if (isIdExist) {
            data.forEach(doc => {
                const tempDoc = doc.data()
                if (tempDoc.id == req.params.id) {
                    const pushData = {
                        id: doc.id,
                        ...tempDoc,
                        status: tempDoc.status === "checkin" ? "checkout" : "checkin",
                    }
                    if (tempDoc.status !== "checkin") {
                        const today = new Date();
                        pushData.timein = today.toLocaleDateString() + ' ' + today.toLocaleTimeString();
                        pushData.timeout = null;
                    }
                    if (tempDoc.status !== "checkout") {
                        const today = new Date();
                        pushData.timeout = today.toLocaleDateString() + ' ' + today.toLocaleTimeString();
                    }
                    db.collection('RFID').doc(id).set(pushData);
                    console.log(pushData)
                }
            })
            res.send(`Id ${id} has been updated successfully.`);
        } else {
            res.status(400).send({ error: `Id ${id} is not exist please` });
        }
    } catch (error) {
        console.error('Error updating Id', error);
    }
});

//getAllDHT22

app.get("/DHT22", async (req, res) => {
  const cRef = db.collection("sensors");
  try {
    cRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(items);
      res.status(201).json(items);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  // res.status(201).json(items);
});

//POST
app.post("/DHT22/post", async (req, res) => {
  const { id,temperatute, humid} = req.body;
  console.log(req.body);
  // res.senyd('aa')
  var datatest = {
    id: id,
    humid: humid,
    temperature: temperatute,
    // atTime:atTime
  };
  console.log(datatest);
  const data = req.body;
  const docRef = db.collection("sensors").doc(`${id}`);
  docRef
    .set(data)
    .then(() => {
      console.log("Tài liệu đã được tạo thành công!");
    })
    .catch((error) => {
      console.error("Lỗi khi tạo tài liệu: ", error);
    });
  res.send("add successfully");
});
