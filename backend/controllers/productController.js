import  Product from  '../models/productModel.js'

export const getAllProducts = async (req, res) =>{
    try {
        const  products = await Product.find();

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const addProduct = async(req, res) =>{
    try {
        const product = req.body;
        // console.log("hi")
        console.log(req.body)

        // if(product) {
            const p = new Product(product)
            await p.save();

            console.log(p);
        // }

        res.status(200).json({
            succes: true,
            message: "Inserted  Successfully",
        });
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)
        // if(productId) {
            await Product.findByIdAndDelete(id);
        // }

        res.status(200).json({
            succes: true,
            message: "Deleted  Successfully",
        });
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const updateProduct = async(req, res) => {
    try {
        const {id} = req.params;
        console.log(id, req.body)
        const  productNew = await Product.findByIdAndUpdate(id, req.body, {new : true});
        if(!productNew) {
           res.status(404).json({
            success: false,
            message: "Product not found"
           })
        }
    

        res.status(200).json({
            succes: true,
            message: "Updated  Successfully",
        });
    } catch (err) {
        res.status(500).json({error: err});
    }
}