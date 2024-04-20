const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const Review = require("../models/reviews");

//New Route for Review
router.get("/:id/newReview", async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  res.render("newReview.ejs", {
    product: foundProduct,
  });
});

// Create Route for Review
router.post("/:id", async (req, res) => {
  const productId = req.body.productId;
  try {
    const newReview = await Review.create(req.body);
    res.redirect(`/products/${productId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//Index Route for all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("index.ejs", {
      product: products,
    });
    const reviews = await Review.find({});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

//Edit Route for Review
router.get("/:id/:reviewId/edit", async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  const reviewId = req.params.reviewId;
  let selectedReview = await Review.find({ _id: reviewId });
  res.render("edit.ejs", {
    review: selectedReview,
    product: foundProduct,
  });
});

// Update Route for Review
router.put("/:id", async (req, res) => {
  try {
    const reviewId = req.body._id;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });
    res.redirect(`/products/${req.params.id}`);
  } catch (err) {
    console.log("ERROR IN EDIT ROUTE: ", err);
    res.status(500).send(err);
  }
});

//Delete Route for Review
router.delete("/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.body._id);
    if (!deletedReview) {
      return res.status(404).send("Review not found");
    }

    res.redirect(`/products/${req.params.id}`);
  } catch (err) {
    res.status(500).send("Error deleting review");
  }
});

// Show route for products
router.get("/:id", async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  const reviews = await Review.find({ productId: foundProduct._id });
  // reviews is an array of objects with a given product id
  res.render("show.ejs", {
    product: foundProduct,
    allReviews: reviews,
  });
});

//Seed data for products
router.get("/seed", async (req, res) => {
  const products = await Product.create([
    {
      name: "Elysian Sofa",
      price: 2300,
      description: "Luxurious and stylish sofa",
      imgURL: [
        "https://assets.wfcdn.com/im/05248582/resize-h700-w700%5Ecompr-r85/2571/257118386/Lisbon+98%27%27+Chenille+Round+Arm+Sofa.jpg",
        "https://assets.wfcdn.com/im/63013338/resize-h700-w700%5Ecompr-r85/2571/257118375/Lisbon+98%27%27+Chenille+Round+Arm+Sofa.jpg",
        "https://assets.wfcdn.com/im/16748468/resize-h700-w700%5Ecompr-r85/2554/255478707/Lisbon+98%27%27+Chenille+Round+Arm+Sofa.jpg",
      ],
    },
    {
      name: "Celestial Dining Table",
      price: 1800,
      description: "Elegant dining table for celestial gatherings",
      imgURL: [
        "https://assets.wfcdn.com/im/83835098/resize-h700-w700%5Ecompr-r85/2557/255785560/Ashleyne+Solid+Wood+Rectangular+Dining+Table.jpg",
        "https://assets.wfcdn.com/im/31362923/resize-h700-w700%5Ecompr-r85/2557/255785543/Ashleyne+Solid+Wood+Rectangular+Dining+Table.jpg",
        "https://assets.wfcdn.com/im/41340720/resize-h1066-w1600%5Ecompr-r85/2557/255785540/Ashleyne+Solid+Wood+Rectangular+Dining+Table.jpg",
      ],
    },
    {
      name: "Nirvana Bed",
      price: 2000,
      description: "King-size bed for dreamy nights",
      imgURL: [
        "https://assets.wfcdn.com/im/21816970/resize-h700-w700%5Ecompr-r85/2401/240142079/Vivian+Solid+Wood+Platform+Bed+with+Headboard%2C+Rustic+Bed+Frame.jpg",
        "https://assets.wfcdn.com/im/99115144/resize-h700-w700%5Ecompr-r85/2401/240142077/Vivian+Solid+Wood+Platform+Bed+with+Headboard%2C+Rustic+Bed+Frame.jpg",
        "https://assets.wfcdn.com/im/83104087/resize-h700-w700%5Ecompr-r85/2485/248581402/Vivian+Solid+Wood+Platform+Bed+with+Headboard%2C+Rustic+Bed+Frame.jpg",
      ],
    },
    {
      name: "Aether Wardrobe",
      price: 1000,
      description: "Spacious wardrobe to organize your ethereal collection",
      imgURL: [
        "https://assets.wfcdn.com/im/77402875/resize-h700-w700%5Ecompr-r85/2656/265687594/Ambroz+Solid+Wood+Armoire.jpg",
        "https://assets.wfcdn.com/im/47209926/resize-h1600-w1600%5Ecompr-r85/2656/265687593/Ambroz+Solid+Wood+Armoire.jpg",
        "https://assets.wfcdn.com/im/63057298/resize-h1600-w1600%5Ecompr-r85/2656/265687601/Ambroz+Solid+Wood+Armoire.jpg",
      ],
    },
    {
      name: "Luminous Coffee Table",
      price: 1200,
      description: "Modern coffee table that brightens up the room",
      imgURL: [
        "https://assets.wfcdn.com/im/14036281/resize-h700-w700%5Ecompr-r85/2772/277234395/Rakibur+Coffee+Table.jpg",
        "https://assets.wfcdn.com/im/15333791/resize-h1600-w1600%5Ecompr-r85/2768/276854381/Rakibur+Coffee+Table.jpg",
        "https://assets.wfcdn.com/im/00309296/resize-h1600-w1600%5Ecompr-r85/2772/277234402/Rakibur+Coffee+Table.jpg",
      ],
    },
    {
      name: "Harmony Bookshelf",
      price: 850,
      description: "Tall wooden bookshelf for balanced aesthetics",
      imgURL: [
        "https://assets.wfcdn.com/im/99526191/resize-h700-w700%5Ecompr-r85/2470/247005864/Bawer+Storage+Bookcase.jpg",
        "https://assets.wfcdn.com/im/30835882/resize-h700-w700%5Ecompr-r85/2470/247005838/Bawer+Storage+Bookcase.jpg",
        "https://assets.wfcdn.com/im/00263361/resize-h1000-w1000%5Ecompr-r85/2470/247005602/Bawer+Storage+Bookcase.jpg",
      ],
    },
    {
      name: "Serenity Desk",
      price: 600,
      description: "Study desk designed for peaceful work",
      imgURL: [
        "https://assets.wfcdn.com/im/09550819/resize-h700-w700%5Ecompr-r85/2537/253747686/Arden+Height+Adjustable+Standing+Desk.jpg",
        "https://assets.wfcdn.com/im/09214373/resize-h700-w700%5Ecompr-r85/2413/241327379/Arden+Height+Adjustable+Standing+Desk.jpg",
        "https://assets.wfcdn.com/im/48452989/resize-h1600-w1600%5Ecompr-r85/2448/244819572/Arden+Height+Adjustable+Standing+Desk.jpg",
      ],
    },
    {
      name: "Astral Lamp",
      price: 250,
      description: "Modern standing lamp that lights up your space",
      imgURL: [
        "https://assets.wfcdn.com/im/03286128/resize-h700-w700%5Ecompr-r85/7124/71241235/Olie+62%22+Floor+Lamp.jpg",
        "https://assets.wfcdn.com/im/50996810/resize-h1600-w1600%5Ecompr-r85/6535/65355791/Olie+62%22+Floor+Lamp.jpg",
        "https://assets.wfcdn.com/im/90108781/resize-h700-w700%5Ecompr-r85/1241/124196137/Olie+62%22+Floor+Lamp.jpg",
      ],
    },
    {
      name: "Ethereal Rug",
      price: 500,
      description: "Soft and cozy rug for heavenly comfort",
      imgURL: [
        "https://assets.wfcdn.com/im/48704548/resize-h700-w700%5Ecompr-r85/2212/221290429/Albion+Oriental+Rug.jpg",
        "https://assets.wfcdn.com/im/45058258/resize-h700-w700%5Ecompr-r85/2178/217866566/Albion+Oriental+Rug.jpg",
        "https://assets.wfcdn.com/im/80386906/resize-h1600-w1600%5Ecompr-r85/1828/182856834/Albion+Oriental+Rug.jpg",
      ],
    },
    {
      name: "Zenith Side Table",
      price: 80,
      description: "Designer side table for elevated living",
      imgURL: [
        "https://assets.wfcdn.com/im/05483218/resize-h700-w700%5Ecompr-r85/1502/150202409/Plaisance+Rustic+Farmhouse+Cottage+Core+Accent+End+Table%2C+Natural+Tray+Top+Side+Table+Nightstand.jpg",
        "https://assets.wfcdn.com/im/22707900/resize-h700-w700%5Ecompr-r85/2541/254181969/Plaisance+Rustic+Farmhouse+Cottage+Core+Accent+End+Table%2C+Natural+Tray+Top+Side+Table+Nightstand.jpg",
        "https://assets.wfcdn.com/im/40729217/resize-h1600-w1600%5Ecompr-r85/1788/178839486/Plaisance+Rustic+Farmhouse+Cottage+Core+Accent+End+Table%2C+Natural+Tray+Top+Side+Table+Nightstand.jpg",
      ],
    },
  ]);

  res.redirect("/products");
});

//Seed data for reviews
router.get("/addNewReviews", async (req, res) => {
  const reviews = await Review.create([
    {
      productId: "66209d1074148a7ec8db700e",
      content:
        "Absolutely stunning sofa! The design is luxurious and it is incredibly comfortable.",
      rating: 5,
    },
    {
      productId: "66209d1074148a7ec8db700e",
      content: "The color is beautiful but the fabric stains easily.",
      rating: 4,
    },
    {
      productId: "66209d1074148a7ec8db700e",
      content: "The assembly was a bit challenging but worth it.",
      rating: 4.5,
    },
    {
      productId: "66209d1074148a7ec8db700e",
      content: "The sofa adds a touch of elegance to my living room.",
      rating: 5,
    },
    {
      productId: "66209d1074148a7ec8db700e",
      content: "I wish it came with better care instructions.",
      rating: 3.5,
    },
    {
      productId: "66209d1074148a7ec8db700f",
      content:
        "Beautiful dining table that adds an elegant touch to my dining room.",
      rating: 4.5,
    },
    {
      productId: "66209d1074148a7ec8db700f",
      content: "The table wobbles a bit, but it's manageable.",
      rating: 3.5,
    },
    {
      productId: "66209d1074148a7ec8db700f",
      content: "The finish is lovely and matches my decor perfectly.",
      rating: 4.7,
    },
    {
      productId: "66209d1074148a7ec8db700f",
      content: "Assembly was straightforward with two people.",
      rating: 4,
    },
    {
      productId: "66209d1074148a7ec8db700f",
      content: "A few minor scratches were present upon arrival.",
      rating: 3,
    },
    {
      productId: "66209d1074148a7ec8db7010",
      content:
        "This bed is a dream! It is so comfortable and looks great in my bedroom.",
      rating: 5,
    },
    {
      productId: "66209d1074148a7ec8db7010",
      content: "The bed frame squeaks a little, but it's not too bothersome.",
      rating: 4,
    },
    {
      productId: "66209d1074148a7ec8db7010",
      content: "The headboard design is unique and stylish.",
      rating: 4.5,
    },
    {
      productId: "66209d1074148a7ec8db7010",
      content: "Assembly took some time, but the instructions were clear.",
      rating: 4,
    },
    {
      productId: "66209d1074148a7ec8db7010",
      content: "I wish the slats were a bit sturdier.",
      rating: 3.5,
    },
    {
      productId: "66209d1074148a7ec8db7011",
      content:
        "Spacious and well-designed wardrobe. Fits all my clothes perfectly.",
      rating: 4.8,
    },
    {
      productId: "66209d1074148a7ec8db7011",
      content: "The doors don't align perfectly, but it's a minor issue.",
      rating: 4,
    },
    {
      productId: "66209d1074148a7ec8db7011",
      content: "The finish is beautiful and looks great in my bedroom.",
      rating: 4.7,
    },
    {
      productId: "66209d1074148a7ec8db7011",
      content: "Assembly was straightforward with the provided instructions.",
      rating: 4.5,
    },
    {
      productId: "66209d1074148a7ec8db7011",
      content: "Some parts were missing, but customer service was helpful.",
      rating: 3.5,
    },
    {
      productId: "66209d1074148a7ec8db7012",
      content:
        "This coffee table is the centerpiece of my living room. Love it!",
      rating: 4.9,
    },
    {
      productId: "66209d1074148a7ec8db7012",
      content:
        "The table arrived with a small scratch, but it's hardly noticeable.",
      rating: 4,
    },
    {
      productId: "66209d1074148a7ec8db7012",
      content: "The finish is beautiful and matches my decor perfectly.",
      rating: 4.7,
    },
    {
      productId: "66209d1074148a7ec8db7012",
      content: "Assembly was a bit challenging, but I managed.",
      rating: 4,
    },
    {
      productId: "66209d1074148a7ec8db7012",
      content: "I wish it came with touch-up paint for minor scratches.",
      rating: 3.8,
    },
    {
      productId: "66209d1074148a7ec8db7013",
      content: "Tall and sturdy bookshelf that looks great in my home office.",
      rating: 4.7,
    },
    {
      productId: "66209d1074148a7ec8db7013",
      content: "The finish is beautiful and matches my furniture.",
      rating: 4.8,
    },
    {
      productId: "66209d1074148a7ec8db7013",
      content: "Assembly took some time, but the end result is worth it.",
      rating: 4.5,
    },
    {
      productId: "66209d1074148a7ec8db7013",
      content: "The bookshelf is a great addition to my home office.",
      rating: 4.6,
    },
    {
      productId: "66209d1074148a7ec8db7013",
      content: "I wish it had more adjustable shelves.",
      rating: 3.8,
    },
    {
      productId: "66209d1074148a7ec8db7014",
      content:
        "This desk is perfect for my home office. It is spacious and well-designed.",
      rating: 4.9,
    },
    {
      productId: "66209d1074148a7ec8db7014",
      content:
        "The desk arrived with a few minor dents, but they're not very noticeable.",
      rating: 4,
    },
    {
      productId: "66209d1074148a7ec8db7014",
      content: "The adjustable height feature is great for my needs.",
      rating: 4.7,
    },
    {
      productId: "66209d1074148a7ec8db7014",
      content: "Assembly was straightforward with the provided instructions.",
      rating: 4.5,
    },
    {
      productId: "66209d1074148a7ec8db7014",
      content: "The desk is sturdy and looks great in my home office.",
      rating: 4.8,
    },
    {
      productId: "66209d1074148a7ec8db7015",
      content:
        "This lamp is a beautiful addition to my living room. It provides great lighting.",
      rating: 4.6,
    },
    {
      productId: "66209d1074148a7ec8db7015",
      content: "The lampshade arrived without any dents or damage.",
      rating: 4.8,
    },
    {
      productId: "66209d1074148a7ec8db7015",
      content: "The lightbulb has a nice warm glow.",
      rating: 4.7,
    },
    {
      productId: "66209d1074148a7ec8db7015",
      content: "The base is stable and the lamp doesn't wobble.",
      rating: 4.5,
    },
    {
      productId: "66209d1074148a7ec8db7015",
      content: "I wish it came with a dimmer switch.",
      rating: 3.8,
    },
    {
      productId: "66209d1074148a7ec8db7016",
      content: "This rug is so soft and comfortable. It feels great underfoot.",
      rating: 4.9,
    },
    {
      productId: "66209d1074148a7ec8db7016",
      content: "The rug arrived without any strong chemical smells.",
      rating: 4.8,
    },
    {
      productId: "66209d1074148a7ec8db7016",
      content: "The colors are lovely and match my decor perfectly.",
      rating: 4.7,
    },
    {
      productId: "66209d1074148a7ec8db7016",
      content: "The rug is holding up well to daily use.",
      rating: 4.6,
    },
    {
      productId: "66209d1074148a7ec8db7016",
      content: "I wish it came in a larger size.",
      rating: 3.5,
    },
    {
      productId: "66209d1074148a7ec8db7017",
      content:
        "This side table is the perfect addition to my living room. It is stylish and functional.",
      rating: 4.7,
    },
    {
      productId: "66209d1074148a7ec8db7017",
      content: "The table arrived without any scratches or damage.",
      rating: 4.8,
    },
    {
      productId: "66209d1074148a7ec8db7017",
      content: "The finish is lovely and matches my other furniture.",
      rating: 4.6,
    },
    {
      productId: "66209d1074148a7ec8db7017",
      content: "Assembly was straightforward with the provided instructions.",
      rating: 4.5,
    },
    {
      productId: "66209d1074148a7ec8db7017",
      content: "The table is sturdy and looks great next to my sofa.",
      rating: 4.7,
    },
  ]);
  res.redirect("/products");
});

// Deleting all reviews
// router.get('/deleteAll', async (req, res) => {
//   try {
//     console.log('TRYING')
//     await Review.deleteMany({});
//     res.send('All reviews deleted');
//   } catch (err) {
//     res.status(500).send('Error deleting products');
//   }
// });

module.exports = router;
