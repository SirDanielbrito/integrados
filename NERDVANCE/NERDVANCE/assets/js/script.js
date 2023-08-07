(function(){
  var contact = function(){
    var init = function() {
      $('#form-contact #phone').phoneBrazil();

      $('#form-contact').validate({
        rules : {
          nome: "required",
          sobrenome: "required",,
          nickname: { required: true, minlength: 14 },
          email: "required",
          senha: "required"
		  comfirmasenha: "required"
        },
        messages: {
          nome: { required: "*", nome: "*" },
          sobrenome: "*",
          nickname: "*",
          email: { required: "*", email: "*" },
          senha: { required: "*", senha: "*" },
		  confirmasenha: { required: "*", confirmasenha: "*" },
        },
        submitHandler: function(form) {
          var $form = $(form);

          var params = {
            nome: $form.find('#nome').val(),
            sobrenome: $form.find('#sobrenome').val(),
            nickname: $form.find('#nickname').val(),
            email: $form.find('#email').val(),
            senha: $form.find('#senha').val()
			confirmasenha: $form.find('#confirmasenha').val()
          };

          $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: params,
            success: function( data ) {
              if(data == "true") {
                $form.find('.input input').val("");
                setMessage("Mission accomplished. <strong>"+ params.email +"</strong> was successfully added to list.", "success");
              } else {
                setMessage("Mission failed. <strong>"+ params.email +"</strong> not was added to list.", "error");
              }
            },
            error: function( data ) {
              setMessage("Mission failed in connection. Try again.", "error");
            }
          });

          return false;
        }
      });
    };

    var setMessage = function($message, $type) {
      $('.form-message').html($message).addClass($type);

      setTimeout(function(){
        $('.form-message').removeClass($type);
      }, 6000);
    };

    return {init: init};
  }();

  $(document).ready(contact.init);
})();
