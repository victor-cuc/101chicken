const mongoose = require('mongoose'),
	Shop = require('./models/shop'),
	Review = require('./models/review');

var data = [
	{
		name: 'Perfect Fried Chicken',
		image:
			'https://video-images.vice.com/articles/59cbbf4efd5e413f367cc24c/lede/1506525062815-art-school-chicken-shop-tour.jpeg',
		description: 'Wonderful',
		address: "Cluj-Napoca"
	},
	{
		name: 'Taste Of Tennessee',
		image: 'https://assets.londonist.com/uploads/2017/02/i875/image_uploaded_from_ios-4.jpg',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus earum quae illo accusantium, odio, rem qui alias numquam, magni dignissimos accusamus modi eum quaerat quas quo assumenda. A, rem ab!',
		address: "London Camden"
	},
	{
		name: 'Chicken Cottage',
		image: 'http://littleatoms.com/sites/default/files/chicken-cottage.jpg',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus earum quae illo accusantium, odio, rem qui alias numquam, magni dignissimos accusamus modi eum quaerat quas quo assumenda. A, rem ab!',
		address: "Manchester"
	},
	{
		name: "Mama's Kitchen",
		image:
			'https://i2-prod.mirror.co.uk/incoming/article10353130.ece/ALTERNATES/s615/Food-in-disgusting-chicken-shop.jpg',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus earum quae illo accusantium, odio, rem qui alias numquam, magni dignissimos accusamus modi eum quaerat quas quo assumenda. A, rem ab!',
		address: "London Angel"
	}
];

function seedDB() {
	Shop.deleteMany({}, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Deleted Shops');
			Review.deleteMany({}, (err) => {
				if (err) {
					console.log(err);
				} else {
          console.log("Deleted reviews");
					data.forEach((seed) => {
						Shop.create(seed, (err, shop) => {
							if (err) {
								console.log(err);
							} else {
								console.log('Added shop: ' + shop.name);

								Review.create(
									{
										text: "Just great! Sanitary and healthy!",
										rating: 4,
										author: 'Paul Gasca'
									},
									(err, review) => {
										if (err) {
											console.log(err);
										} else {
											shop.reviews.push(review);
											shop.save();
											console.log("Reviewed '" + review.text + "' on '" + shop.name + "'");
										}
									}
								);
							}
						});
					});
				}
			});
		}
	});
}

module.exports = seedDB;
