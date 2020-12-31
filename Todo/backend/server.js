const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true,useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.get('/',async(req, res)=> {
    await Todo.find((err, todos)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(todos);
        }
    });
});

todoRoutes.get('/:id',async(req, res)=> {
    let id = req.params.id;
    await Todo.findById(id, (err, todo)=> {
        res.send(todo);
    });
});

todoRoutes.post('/add',async(req, res)=> {
    let todo = await new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).send({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.post('/update/:id',async(req, res)=> {
    await Todo.findById(req.params.id, (err, todo)=> {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.send('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.delete('/delete/:id', async (req, res) => {
    const deletedProduct = await Todo.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.send('Error in Deletion.');
    }
  });

app.use('/todos', todoRoutes);

app.listen(PORT, ()=> {
    console.log("Server is running on Port: " + PORT);
});