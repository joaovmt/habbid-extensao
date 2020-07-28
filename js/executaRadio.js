dadosPlayerFuncionar();	

function start(){
    $('#playerHabbid').trigger("play");
	var verifica = "start";
	chrome.browserAction.setIcon({path:'128_ativo.png'});
}

function stop(){
   $('#playerHabbid').trigger("pause");
   var verifica = "stop";
   chrome.browserAction.setIcon({path:'128.png'});
}

function verificaBotao() {
    var player = document.getElementById("playerHabbid");
    return !player.paused && !player.ended && 0 < player.currentTime;
}

function dadosPlayerFuncionar(){		
			$.ajax({
				url: 'http://www.habbid.com.br/api/dados_radio.json',
				dataType: 'json',
				success: function(data, status){
					var url = "http://" + data['ip'] + ":" + data['porta'];
					document.getElementById('montaplayer').innerHTML = "<audio id=\"playerHabbid\" preload=\"none\" volume=\"1\"  onended=\"this.currentTime = 0; this.load()\"><source src=\"" + url + "/;type=mp3\" type=\"audio/mpeg\"><source src=\"" + url + "/;type=ogg\" type=\"audio/ogg\"><source src=\"" + url + "/;type=aacplus\"><source src=\"" + url + "/;type=wav\" type=\"audio/wav\">Seu navegador não suporta este tipo de áudio. Atualize para ouvir a rádio.</audio>";
				},
			});
};