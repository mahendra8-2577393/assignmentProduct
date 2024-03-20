import express  from 'express'
import  productRoutes from './routes/productRoutes.js'
import mongoose from 'mongoose';
import  {getAllProducts, deleteProduct, updateProduct, addProduct}  from  './controllers/productController.js'
import  cors from  'cors';
import  bodyParser from 'body-parser'


const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(bodyParser.json());
// app.use('/api', productRoutes);

app.get('/products', getAllProducts);
app.delete('/deleteProduct/:id', deleteProduct);
app.put("/productUpdate/:id", updateProduct)
app.post("/createProduct", addProduct);
app.get("/", (req, res) => res.send("hi"))

// app.use(express.urlencoded({extended:  true}));

mongoose.connect("mongodb+srv://mahendra21bec40:MfmX4Dac8Rqc9SJV@cluster0.qtgxkld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("connected successfully");
})


app.listen(4000, () =>  console.log("Listening  of port 4000"));

