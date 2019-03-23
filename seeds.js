const mongoose = require("mongoose"),
      Shop = require("./models/shop"),
      Comment = require("./models/comment");

var data = [
  {
    name: "Perfect Fried Chicken",
    image: "https://video-images.vice.com/articles/59cbbf4efd5e413f367cc24c/lede/1506525062815-art-school-chicken-shop-tour.jpeg",
    description: "Wonderful"
  },
  {
    name: "Taste Of Tennessee",
    image: "https://assets.londonist.com/uploads/2017/02/i875/image_uploaded_from_ios-4.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus earum quae illo accusantium, odio, rem qui alias numquam, magni dignissimos accusamus modi eum quaerat quas quo assumenda. A, rem ab!"
  },
  {
    name: "Chicken Cottage",
    image: "http://littleatoms.com/sites/default/files/chicken-cottage.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus earum quae illo accusantium, odio, rem qui alias numquam, magni dignissimos accusamus modi eum quaerat quas quo assumenda. A, rem ab!"
  },
];

function seedDB() {
  Shop.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Shops");

      data.forEach((seed) => {
        Shop.create(seed, (err, shop) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Added shop: " + shop.name);
            
            Comment.create(
              {
                text: "Looks great, especially how clean it looks. And it's healthy too!",
                author: "Paul Gasca"
              }, (err, comment) => {
                if (err) {
                  console.log(err);
                } else {
                  shop.comments.push(comment);
                  shop.save();
                  console.log("Commented '" + comment.text + "' on '" + shop.name + "'"); 
                }
              }
            )
          }
        })
      })
    }
  })
}

module.exports = seedDB;
      