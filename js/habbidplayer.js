$(document).ready(function(){
	dadosAtualiza();
	atualizaNoticias();

    var bkg = chrome.extension.getBackgroundPage();

	if(bkg.verificaBotao()){
			document.getElementById('botao').className = "botaoPause";
		}else{
			document.getElementById('botao').className = "botaoPlay";
	}

	$("#botao").click(function(){
		if(bkg.verificaBotao()){
			bkg.stop();
			document.getElementById('botao').className = "botaoPlay";
		}else{

			bkg.start();
			document.getElementById('botao').className = "botaoPause";
		}
	});

	function dadosAtualiza(){
			document.getElementById('locutor').innerHTML = "...";
			document.getElementById('programa').innerHTML = "...";
			document.getElementById('ouvintes').innerHTML = "...";

			$.ajax({
				url: 'http://www.habbid.com.br/api/dados_radio.json',
				dataType: 'json',
				success: function(data, status){
					document.getElementById('locutor').innerHTML = data['locutor'];
					document.getElementById('programa').innerHTML = data['programa'];
					document.getElementById('ouvintes').innerHTML = data['ouvintes'];
					document.getElementById('avatarRadio').innerHTML = "<img src=\"https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=gif&user=" + data['locutor'] + "&action=wav&direction=2&head_direction=3&gesture=sml&size=b\" />";
				},
				error: function(jqXHR, textStatus, errorThrown){
					document.getElementById('locutor').innerHTML = "Sem conexão...";
					document.getElementById('programa').innerHTML = "Sem conexão...";
					document.getElementById('ouvintes').innerHTML = "Sem conexão...";
					document.getElementById('avatarRadio').innerHTML = "<img src=\"defaultavatar.png\"/>";
				},
			});
		};
		// setTimeout(dadosAtualiza, 2000);

	function atualizaNoticias(){
			document.getElementById('noticiasD').innerHTML = "...";

			$.ajax({
				url: 'http://www.habbid.com.br/api/noticias.json',
				dataType: 'json',
				success: function(data, status){
					document.getElementById('noticiasD').innerHTML = "<img src=\"http://www.habbid.com.br/"+data[0]['imagem']+"\"> <a target=\"_blank\" href=\""+data[0]['link']+"\">"+data[0]['titulo']+"</a><br><img src=\"http://www.habbid.com.br/"+data[1]['imagem']+"\"> <a target=\"_blank\" href=\""+data[1]['link']+"\">"+data[1]['titulo']+"</a><br><img src=\"http://www.habbid.com.br/"+data[2]['imagem']+"\"> <a target=\"_blank\" href=\""+data[2]['link']+"\">"+data[2]['titulo']+"</a><br>";
				},
				error: function(jqXHR, textStatus, errorThrown){
					document.getElementById('noticiasD').innerHTML = "Sem conexão...";
				},
			});
	};

	(function(){
		$("#locutor,#programa,#ouvintes").click(function(){
				dadosAtualiza()
			});
			}) (jQuery);
});
