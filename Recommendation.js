<script>
  $( document ).ready(function() {
   getRecommendationList();
});
 
  function getRecommendationList()
    {
      
      $('.slider').slick('slickRemove');
      $.ajax({
      url: '/cart.js',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
         const cart_productIds = response.items.map(item => item.product_id);
         const cart_items = response.items.length;
         let fetch_item=1;
         if(cart_items > 3) {
           fetch_item = 1;
         }
         getRecommendation(cart_productIds,fetch_item);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      }
    });
    }
    
 function getRecommendation(cartArryIds,numfetch)
 {
        var num_of_fetch = numfetch;
        $.map(cartArryIds, function(itemproduct_Id, index ) {
            console.log(itemproduct_Id);
        $.ajax({
            url: '/recommendations/products.json',
            type: 'GET',
            dataType: 'json',
            data: {
               product_id: itemproduct_Id,
            },
          success: function(response) {
          if(response.products)
          {
            for (let i = 0; i < numfetch; i++) {
            $data = response.products[i];
           if($data && ($.inArray($data.id, cartArryIds) === -1))
           {
         var newDataId = $data.variants['0'].id;
          // Check if an item with the same data-id already exists
          var existingItem = $('.alsolike-content-inner[data-id="' + newDataId + '"]');
          if (existingItem.length === 0) {
            $(".ajax-rec-container").append('<div class="alsolike-content-inner" data-id="'+$data.variants['0'].id+'">\n' +
              '                     <div class="img_wrapper">\n' +
              '                       <img class="rec_product_img lazyautosizes lazyloaded" src="'+$data.featured_image+'" alt="">\n' +
              '                     </div>\n' +
              '                      <div class="d_fl">\n' +
              '                      <p class="rec_product_title">'+$data.title+'</p>\n' +
              '                      <span class="cs-price-cs">'+theme.Currency.formatMoney($data.price, theme.moneyFormatWithCurrency)+'</span>\n' +
              '                      <button type="button" class="btn  AJAX_addto_Cart" data-vid="'+$data.variants['0'].id+'" >AGREGAR</button>\n' +
              '                      </div>\n' +
              '                   </div>');
              }
             $('.section-alsolike-main .alsolike-content').slick("refresh");
                }
            }
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(textStatus, errorThrown);
        }
      });
    }); 
  }

</script>