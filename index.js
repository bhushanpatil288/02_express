import 'dotenv/config'
import express from 'express';

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json())

let coffeeData = [];
let nextId = 1;

// add coffee
app.post('/coffees', (req, res)=>{
  const {name, price} = req.body;
  const newCoffee = {id: nextId++, name, price};
  coffeeData.push(newCoffee);
  res.status(201).send(newCoffee);
})

// show coffees
app.get('/coffees', (req, res)=>{
  res.status(200).send(coffeeData)
})

// get specific coffee
app.get('/coffees/:id', (req, res)=>{
  // res.status(200).send(coffeeData[parseInt(req.params.id-1)]);
  const coffee = coffeeData.find(coffee=> coffee.id === parseInt(req.params.id))
  if (!coffee){
    return res.status(404).send("Coffee not found!");
  }
  res.status(200).send(coffee);
})

// update coffee
app.put('/coffees/:id', (req, res)=>{
  const coffeId = req.params.id;
  const coffee = coffeeData.find(coffee=>coffee.id === parseInt(coffeId));

  if(!coffee){
    return res.status(404).send("Coffee not found");
  }

  const {name, price} = req.body;
  coffee.name = name;
  coffee.price = price;
  res.send(200).send(coffee);
})

// delete coffee
app.delete('/coffees/:id', (req, res)=>{
  const coffeeId = parseInt(req.params.id);
  // coffeeData = coffeeData.filter(coffee=> coffee.id !== coffeeId);
  const index = coffeeData.findIndex(coffee => coffee.id === coffeeId);
  if (index === -1){
    return res.status(404).send("Coffee not found!")
  }
  coffeeData.splice(index, 1);
  return res.status(204).send("Coffee is removed");
})

app.listen(port, ()=>{
  console.log(`Listning on port ${port}`);
})

