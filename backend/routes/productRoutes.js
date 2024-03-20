import expresss from 'express'

const  router = expresss.Router();

import  {getAllProducts, deleteProduct, addProduct, updateProduct} from '../controllers/productController.js'

router.get('/products', getAllProducts);
router.delete('/deleteProduct', deleteProduct);
router.put("/productUpdate/:id", updateProduct)
router.post("/createProduct", addProduct)


export default router;