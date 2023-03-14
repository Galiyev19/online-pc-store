const express = require('express')
const fs = require('fs')
const { request } = require('http')
const bp = require('body-parser')
const { response } = require('express')


const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const responseObj = {
    message: "Hello from server",
}

const error = {
    message: 'Username or password incorrect'
}


const errorReg = {
    message: "Такой пользователь уже есть"
}

app.get('/products',(request, response) => {
    const products = fs.readFileSync('products.json','utf-8')
    const data = JSON.parse(products)
    // console.log(request.query);
    // console.log(data)
    response.send(data)

})

app.get('/products/:id', (request, response) => {

    const id = request.params.id;
    //console.log(typeof(id))
    const products = fs.readFileSync('products.json','utf-8');
    const data = JSON.parse(products);
    

    const product = data.find(item => item.id === parseInt(id))

    //console.log(product)
    if(product){
        response.send(product);
    }
    else{
        response.status(404).send();
    }
})


app.get('/catalog/:name', (request, response) => {

    const name = request.params.name;
    const products = fs.readFileSync('products.json','utf-8');
    const data = JSON.parse(products);
    const arr = []

    data.map(item => {
        if(item.category === name || item.subCategory === name){
            arr.push(item)
        }
    })

    // console.log(arr)

    if(arr){
        response.send(arr);
    }
    else{
        response.status(404).send();
    }
})

app.get('/products/:catalog/:name', (request, response) => {

    let catalogName = request.params["catalog"];
    let brandName = request.params['name']
    const products = fs.readFileSync('products.json','utf-8');
    const data = JSON.parse(products);
    const arr = []

    data.map(item => {
        if(item.category === catalogName) {
            arr.push(item)
        }
    })


    const res = []

    arr.map((item) => {
        if(item.brand === brandName){
            res.push(item)
        }
    })

    console.log(res)
    // if(arr){
    //     response.send(arr);
    // }
    // else{
    //     response.status(404).send();
    // }
})

app.get('/categories', (request, response) => {
    const products = fs.readFileSync('categories.json','utf-8')
    const data = JSON.parse(products)
    response.send(data)
})

app.get('/user/:id',( request, response ) => {
    const id = request.params.id;
    const products = fs.readFileSync('users.json','utf-8')
    const data = JSON.parse(products)

    const user = data.find(item => item.id?.toLowerCase() === id?.toLowerCase())

    if(user){
        response.send(user);
    }
    else{
        response.status(404).send();
    }
})

app.post("/addOrder", (request, response) => {
    const databaseJson = fs.readFileSync('users.json', 'utf-8');
    const database = JSON.parse(databaseJson);

    const {token} = request.body

    const idx = database.findIndex(item => item.id === token)

    const obj = database.find(item => item.id=== token)

    console.log(obj?.hasOwnProperty("orders"))
    console.log(obj)

    if(!obj?.hasOwnProperty("orders")){
        const temp = []
        temp.push(request.body)
        obj.orders = temp
    }else{
        obj.orders.push(request.body)
    }

    const temp  = [...database.slice(0, idx), ...database.slice(idx + 1)]
    temp.push(obj)

    fs.writeFileSync("users.json", JSON.stringify(database, null, 2));

})



app.post('/signIn', (request, response) => {
    const databaseJson = fs.readFileSync('users.json', 'utf-8');
    const database = JSON.parse(databaseJson);

    const {email,password} = request.body

    const user = database.find(item => item.email?.toLowerCase() === email?.toLowerCase() && item.password === password )

    console.log(user)

    if(user){
        response.json(user)
    }else{
        response.json(error)
    }

})


app.post("/signUp", (request ,response) => {
    const databaseJson = fs.readFileSync('users.json', 'utf-8');
    const database = JSON.parse(databaseJson);

    const { id, userName, email, password , orders} = request.body

    const candidate = database.find(item => item.id === id)



    if(!candidate){

        const user = {
            id: id,
            username: userName,
            email: email,
            password: password,
        };

        const databaseJson = fs.readFileSync('users.json', 'utf-8');

        const database = JSON.parse(databaseJson);

        database.push(user);

        fs.writeFileSync("users.json", JSON.stringify(database, null, 2));
        response.json(responseObj)
    }else{
        response.json(error)
    }
})

app.listen(7000, () => {
    console.log("Server is started")
})
