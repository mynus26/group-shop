//----------------------------------------------------------------
// Group Shop (contains the products)
//----------------------------------------------------------------

angular.module('groupShopApp').factory('shop', function ($http) {

 var shop = function () {
      this.products = [];
      var self = this;
      $http.get('/api/product').success(function (data) {

        var tmpProducts = data.products;

        for (var i = 0; i < tmpProducts.length; i++)
        {
            var myProduct = {id:tmpProducts[i].sku,
                              name: tmpProducts[i].name,
                              description: tmpProducts[i].longDescription,
                              price: tmpProducts[i].salePrice,
                              reviewCount: tmpProducts[i].customerReviewCount,
                              reviewAvg: tmpProducts[i].customerReviewAverage,
                              thumbnail:tmpProducts[i].thumbnailImage,
                              image: tmpProducts[i].image
                          };
            self.products.push(myProduct);

        }
     });

//     this.products = [
//         new product("1", "Samsung HDTV", "LED H8000 Series Smart TV - 65” Class (64.5” Diag.)", 1250.49, 
//         			"Samsung 65 inch Black LED 1080P 3D Smart HDTV - UN65H8000 / UN65H8000AFXZA Be drawn in and immersed and feel like you’re part of the picture with the Samsungs UN65H8000 Curved Smart LED H8000. Bask in the vibrant picture quality as Auto Depth Enhancer and Micro Dimming Ultimate analyze the image for the perfect contrast, depth and brightness levels. Accessing your favorite entertainment is also faster with the Quad Core Plus processor and upgraded Smart Hub, featuring 5 distinct panels. Become completely immersed with the new H8000."),
        
//         new product("2", "SONY Google TV", "65” Class (diag) X950B Flagship 4K Ultra HD TV", 625.99, 
//         		"The Ultimate Standard in 4K Ultra HD  There are 4K Ultra HD TVs, and then there is Sony’s flagship 4K Ultra HD TV with four times the clarity of HD, more brilliant expanded color and up to 3x the brightness range of standard LED HDTVs. Breathtaking detail is depicted with pinpoint accuracy for the most natural images. The TRILUMINOS display produces the widest color spectrum we've ever offered in a TV. But what really sets this TV apart is Sony’s exclusive X-tended Dynamic Range PRO full array local dimming technology for up to 3x the brightness range. The range of peak brightness to the deepest of blacks is unlike any contrast Sony has ever offered in a TV. It's quite simply the most immersive, highest resolution TV experience possible."),
//         new product("3", "VIZIO TV", "VIZIO E480i-B2 48” 1080p 120Hz Full-Array LED Smart HDTV", 812, 
//         		"Introducing the all-new 2014 E-Series E480-B2 VIZIO LED HDTV with an ultra-narrow frame and crystal-clear picture. Full-Array LED delivers brilliant picture quality as it distributes LEDs behind the entire screen for superior light uniformity and picture performance. Full HD 1080p resolution means crystal-clear detail in every image."),
        		
//         new product("4", "Toshiba TV", "Toshiba - 65” Class - LED - 1080p - 120Hz - HDTV",709.49, 
//         		"Enjoy striking image quality with this Toshiba 65HT2U 65” LCD TV that features a CineSpeed panel and ClearFrame 120Hz technology for enhanced clarity of high-speed images. The 1080p resolution delivers crisp, lifelike visuals."),
//         new product("5", "Sharp TV", "Sharp - 50” - LED - 1080p - 120Hz - HDTV", 549, 
//         		"Enjoy lush, crisp images with this Sharp LC-50LB150U 50” class LED TV that features 1080p resolution and direct-lit LED backlighting for a vibrant, high-definition picture. DTS sound and 2 built-in 10W speakers provide rich, immersive audio.")
//     ];
 }

shop.prototype.getProduct = function (id) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].id == id)
            return this.products[i];
    }
}

return shop;

})