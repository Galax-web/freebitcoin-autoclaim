// ==UserScript==
// @name         freebitco.in autoclaim
// @namespace    https://freebitco.in/?r=1985913
// @version      0.1.1
// @description  autoclaim freebitco.in
// @author       fabiojsousa
// @match        https://freebitco.in/?op=home
// @match        https://freebitco.in/
// @grant        none
// ==/UserScript==
try{
  $(document).ready(function(){
      setTimeout(function(){

        /****Variáveis para definir o comportamento do bot****/
        var ativarRewards = true;
        var ativarBonus = true;
        var ativarCompraTickets = true;
        /*****************************************************/

        var rewards = document.getElementsByClassName('reward_table_box br_0_0_5_5 user_reward_points font_bold')[0].innerText.replace(',','');
        var id = document.getElementsByClassName('left bold')[0].innerHTML;

        if ($('#free_play_form_button').is(':visible') && !$('#play_without_captchas_button').is(':visible')) {

            if ($('#bonus_container_free_points').is(':visible'))
              console.log('O bônus já está ativado!!!');
            else if(ativarRewards){
              if(rewards >= 12 && rewards < 120)
                RedeemRPProduct('free_points_1');
              else if(rewards >= 120 && rewards < 300)
                RedeemRPProduct('free_points_10');
              else if(rewards >= 300 && rewards < 600)
                RedeemRPProduct('free_points_25');
              else if(rewards >= 600 && rewards < 1200)
                RedeemRPProduct('free_points_50');
              else if(rewards >= 1200)
                RedeemRPProduct('free_points_100');
              if(rewards-3200 >= 1200 && ativarBonus)
                  setTimeout(function(){RedeemRPProduct('fp_bonus_1000');},500);
            }
            setTimeout(function(){
              $('#free_play_form_button').trigger('click');},4000);
        }
        else if($('#play_without_captchas_button').is(':visible')){
          //caso dê algum erro no console quando for verificar os requisitos para o roll
          try{
              if($('#req_for_bonuses_link').is(':visible')){
                $('#account_unblock_modal').trigger('click')

                console.log('Click efetuado para saber os requisitos para desbloquear o roll.');

                var ticketsParaComprar = document.getElementsByClassName('account_unblock_span option_play_multiply_span')[0].innerHTML;

                if(ticketsParaComprar.match(/,/))
                    ticketsParaComprar = ticketsParaComprar.replace(',','');

                var comprarTickets;

                if(ativarCompraTickets){
                  if(ticketsParaComprar<=350){
                    comprarTickets = ticketsParaComprar * 2;

                    document.getElementById('lottery_tickets_purchase_count').value = comprarTickets;

                    $('#purchase_lottery_tickets_button').trigger('click');

                    console.log(comprarTickets + ' tickets de loteria foram comprados!');

                    setTimeout(function(){window.location.reload();},32000);
                  }
                  else
                    comprarTickets = 0;
                }

              else
                console.log('Os tickets a serem comprados são muito elevados: '+comprarTickets);
              }
          }
          //se der erro, a página será recarregada
          catch(err){window.location.reload();}
          }
        else
          console.log('Ainda não deu o tempo.');

        setTimeout(function(){window.location.reload();},1800000);//recarregar a página a cada 30 minutos.
      },6000);
  });
}
//Atualizar a página em caso de erro
catch(err){
  document.cookie='cf_use_ob=0;path=/';window.location.reload();
}