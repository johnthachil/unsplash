$( document ).ready(function() {

    console.log("Jquery Loaded");
    $(".moreclick").html('MORE');

  var search = "";
  var count = 1;
  var catid = "";
  var query = "https://api.unsplash.com/photos/?client_id=27a78a2fbdd07ecb9bf3c429d80e852ae346d2e59591afc772ef52a7f7b15691&per_page=10";
  $.ajax({
      url:query,
      dataType: "json",
      type: 'GET',
      error: function() { console.log('Uh Oh!'); },
      beforeSend: function() {
         $("#finsearch").blur();
         $("#grid").append(
           '<br><br>'+
           '<div class="three-quarters-loader">'+
           '</div>'
         );
         $(".moreclick").html('WAIT');



      },
      success:function(data) {
        var k = 0;
        $("#grid").empty();
        $(".moreclick").html('MORE');

        console.log(data[0].urls.small);
        for (var key in data) {
          console.log(data[key].urls.full);
          $("#grid").append('<li><a data-lightbox="image-1" data-title="Photo by: '+data[key].user.name+'" href="'+data[key].urls.regular+'"><img class="oneclass" src="'+data[key].urls.small+'"></a></li>');
        }
        // $("#grid").append('<li class="loadmore"><a id="clickMore" href="javascript:void(0);">MORE</a></li>');

        new AnimOnScroll( document.getElementById( 'grid' ), {
  				minDuration : 0.4,
  				maxDuration : 0.7,
  				viewportFactor : 0.2
  			} );
      }
  });
  //form
  $(".fsearch").on('submit',function(e) {
    $(".moreclick").html('MORE');
    count = 0;
    e.preventDefault();
    search=$(this).find("#finsearch").val().replace(/ /g, "%20");
    query = "https://api.unsplash.com/photos/search/?client_id=27a78a2fbdd07ecb9bf3c429d80e852ae346d2e59591afc772ef52a7f7b15691&per_page=10&query="+search;
    $.ajax({
        url:query,
        dataType: "json",
        type: 'GET',
        error: function() { console.log('Uh Oh!'); },
        beforeSend: function() {
           $("#finsearch").blur();
           $("#grid").empty();
           $("#grid").append(
             '<br><br>'+
             '<div class="three-quarters-loader">'+
             '</div>'
           );

        },
        success:function(data) {
          var k = 0;
          $("#grid").empty();
          console.log(data[0].urls.small);
          for (var key in data) {
            console.log(data[key].urls.full);
            $("#grid").append('<li><a data-lightbox="image-1" data-title="Photo by: '+data[key].user.name+'" href="'+data[key].urls.full+'"><img class="oneclass" src="'+data[key].urls.small+'"></a></li>');
          }
          // $("#grid").append('<li><a class="loadmore"></a></li>');

          new AnimOnScroll( document.getElementById( 'grid' ), {
    				minDuration : 0.4,
    				maxDuration : 0.7,
    				viewportFactor : 0.2
    			} );
        }
    });
  });
  // MORE
  $(".moreclick").click(function(){
    // alert(query);
    count++;
    if(query.search("search")>1){
      query = "https://api.unsplash.com/photos/search/?client_id=27a78a2fbdd07ecb9bf3c429d80e852ae346d2e59591afc772ef52a7f7b15691&per_page=10&query="+search+"&page="+count;
    }else if(query.search("categories")>1) {
      query = "https://api.unsplash.com/categories/"+catid+"/photos/?client_id=f4281a65f03576558acf4b03d6be6e1835f9b3f42fb0316d77dcf81564f04c58&page="+count;
    }
    else {
      query = "https://api.unsplash.com/photos/?client_id=27a78a2fbdd07ecb9bf3c429d80e852ae346d2e59591afc772ef52a7f7b15691&per_page=10"+"&page="+count;
    }

    // alert(query);
    $.ajax({
        url:query,
        dataType: "json",
        type: 'GET',
        error: function() { console.log('Uh Oh!'); },
        beforeSend: function() {
          $(".moreclick").html('WAIT');


        },
        success:function(data) {
          function isEmpty(obj) {
              for(var prop in obj) {
                  if(obj.hasOwnProperty(prop))
                      return false;
              }

              return true;
          }
          if(isEmpty(data)){
            $(".moreclick").html('OVER');
            alert("IMAGES OVER");

          }
          else
          {
            $(".moreclick").html('MORE');

          }
          for (var key in data) {
            // console.log(data[key].urls.full);
            $("#grid").append('<li><a data-lightbox="image-1" data-title="Photo by: '+data[key].user.name+'" href="'+data[key].urls.full+'"><img class="lazy" src="'+data[key].urls.small+'"></a></li>');
          }
          // $("#grid").append('<li><a class="loadmore"></a></li>');

          new AnimOnScroll( document.getElementById( 'grid' ), {
    				minDuration : 0.4,
    				maxDuration : 0.7,
    				viewportFactor : 0.2
    			} );
        }

    });
});
/////
  $("#toggleicon").click(function(){
       $( this ).css( "-webkit-transform", "rotate(80deg)" );
       $(".catgories").slideToggle(function(){
         $("#toggleicon" ).css( "-webkit-transform", "rotate(0deg)" );

       });

     });
/////
  $(".catbutton").click(function(){
      count = 1;
      catid = $(this).attr("data-user");
      query ="https://api.unsplash.com/categories/"+catid+"/photos/?client_id=f4281a65f03576558acf4b03d6be6e1835f9b3f42fb0316d77dcf81564f04c58";
      $.ajax({
          url:query,
          dataType: "json",
          type: 'GET',
          error: function() { console.log('Uh Oh!'); },
          beforeSend: function() {
            $("#grid").empty();
             $("#finsearch").blur();
             $("#grid").append(
               '<br><br><br><br><br><br><br>'+
               '<div class="three-quarters-loader">'+
               '</div>'
             );
             $(".moreclick").html('WAIT');



          },
          success:function(data) {
            var k = 0;
            $("#grid").empty();
            $(".moreclick").html('MORE');

            console.log(data[0].urls.small);
            for (var key in data) {
              console.log(data[key].urls.full);
              $("#grid").append('<li><a data-lightbox="image-1" data-title="Photo by: '+data[key].user.name+'" href="'+data[key].urls.full+'"><img class="oneclass" src="'+data[key].urls.small+'"></a></li>');
            }
            // $("#grid").append('<li class="loadmore"><a id="clickMore" href="javascript:void(0);">MORE</a></li>');

            new AnimOnScroll( document.getElementById( 'grid' ), {
      				minDuration : 0.4,
      				maxDuration : 0.7,
      				viewportFactor : 0.2
      			} );
          }
      });
  });

});
