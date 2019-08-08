var bodyParser=require('body-parser');
var urlParser=bodyParser.urlencoded[{extended:false}];
var mongoose=require('mongoose');

mongoose.connect('http://localhost:3000/products', { useNewUrlParser: true });

// data = [{name: 'mobile phone',
//         brand: 'Apple',
//         description: 'Cool phone!'},
//         {name: 'TV',
//         brand: 'BPL',
//         description: 'Cool HD TV!'},
//         {name: 'headphone',
//         brand: 'Sony',
//         description: 'Cool headphone!'}];

var productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    description: String
});
var product=mongoose.model('product',productSchema);

var urlencodedParser=bodyParser.urlencoded({extended:false});

var myCartSchema= new mongoose.Schema({
    product: String
});
var myCart=mongoose.model('myCart',myCartSchema)

module.exports=function(app){
    app.get('/',function(req,resp){
        product.find({},function(err,data){
            resp.render('productpage',{data:data});
        });
    });

    app.get('/cart',function(req,resp){
        myCart.find({},function(err,data){
            resp.render('cart',{data:data});
        });
    })

    app.get('/cart/:item',function(req,resp){
        var newCart = new myCart({product: req.params.item.replace(/\-/g," ")});
        newCart.save(function(err){
            if (err) throw err;
        });
        product.find({},function(err,data){
            resp.render('productpage',{data:data});
        });
    });
    app.post('/insert',urlencodedParser,function(req,resp){
        var newProduct = new product({name: req.body.name, brand: req.body.brand, description: req.body.description});
        newProduct.save(function(err){
            if (err) throw err;
            resp.render('insert');
        })
    });
    app.get('/insert',function(req,resp){
        resp.render('insert');
    });

    app.delete('/delete/:item',function(req,resp){
        myCart.deleteOne({product: req.params.item.replace(/\-/g," ")},function(err,data){
            if(err) throw err;
        });
        myCart.find({},function(err,data){
            resp.render('cart',{data:data});
        });
    });
};