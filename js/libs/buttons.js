var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],clicks=0,d1 = new Date(),stepper1,stepper2,stepper3,stepper4,d4,list,d2,diff,post_url,request_method,form_data,forms;
var novodataset;
var tempoinicial=new Date(),tempofinal,tempotutorial,duracaoPerguntas,duracaotutorial,duracao;
var selecionados_Perguntas=[],selecionados_distance_near=[],selecionados_size_large=[],selecionados_size_small=[],selecionados_variance_small=[],selecionados_variance_large=[];
function buildSlider() {
    // ATUALIZA OS VALORES DO MAPA DE PROB COM INTERVALO QUANDO O SLIDER MUDA NA ETAPA DO TUTORIAL.
    let myMin = math.floor(menor);
    let myMax = math.ceil(maior);

    left=0.2*myMax;
    right=0.8*myMax;
    
	$("#Vis02Tuto").ionRangeSlider({
		type: "double",
	    min: myMin,
            max: myMax,
            from: 0.2*myMax,
            to: 0.8*myMax,
        step: 1,
        drag_interval: true,
        skin: "big",
        grid: true,
        onChange: function (data) {
        	opcoes=[];
        	//opcoes=['Recife','Caruaru'];
            left=data.from;
            right=data.to;
            Vis02TutorialFunction();
            bring_front(mapVis02);

        }
	});
	$("#slider_Perguntas").ionRangeSlider({
		type: "double",
	    min: myMin,
            max: myMax,
            from: 0.2*myMax,
            to: 0.8*myMax,
        step: 1,
        drag_interval: true,
        skin: "big",
        grid: true,
        onChange: function (data) {
            left=data.from;
            right=data.to;
            VisPerguntas();
            bring_front(mapVisPerguntas);
            mapVisPerguntas.invalidateSize();
        }
	});
}
function updateSliderPerguntas(){
	let myMin = math.floor(menor);
    let myMax = math.ceil(maior);
    left=0.2*myMax;
    right=0.8*myMax;
    var instance=$("#slider_Perguntas").data("ionRangeSlider");
    if(instance){
    	instance.update({
		   min: myMin, max:myMax,from:left,to:right
		});
    }
}
d3.json("./data/perguntas.json",function(error,data){
	novodataset=data;
});

$(document).ready(function () {
	//PREENCHE TODAS AS PERGUNTAS.
	arr=shuffle(arr);
	arr.forEach(function(d,i){
		d4= geraperguntas(novodataset,d,3);
		list = document.getElementById((i+1)+"p");
		list.insertBefore(d4, list.childNodes[0]);
	});
	$('#pills-tab >li >a')[0].click();
	$('#pills-tab >li')[1].classList.add('disabled');
	// BLOCO PARA INICIAR OS STEPS DE CADA ETAPA DO SISTEMA
	stepper0 = new Stepper($('.bs-stepper')[0]);
	stepper2 = new Stepper($('.bs-stepper')[1]);
	//OCULTA A TELA INICIAL E EXIBE O TUTORIAL
	$('#iniciar').click(function(){
		if($('input[name ="inlineRadioOptions"]:checked').val()==undefined || $('input[name ="inlineRadioOptions"]:checked').val()=='Não'){
			$('.alert').addClass("show");
		}else{
			$('.alert').removeClass("show");
	    	$('#header').css('display','none');
	    	$('#tutorial').css('display','');
	    	Start_Update_data();
		}
    });
	// CONTA OS CLICKS PARA DEPOIS ENVIAR COM OS FORMULÁRIOS.
    $(document).on("click",function() {
        clicks+=1;
    });
    // REDUZ RESETA O NÚMERO DE CLICKS JÁ CONSIDERANDO O BOTÃO DE PASSAGEM (NEXT)
    $(".custom-control-input").click(function() {
    	clicks-=1;
    });
    $(".ioRangerSlider").ionRangeSlider({
		min: 1,
        max: 5,
        skin: "big",
        grid: true,
        onChange: function (data) {
        	$('#'+data.input[0].id).value=data.input[0].value; 
        }
	});
	// PARA A ETAPA DE TUTORIAL CORRIGE O PROBLEMA DO TAMANHO DO MAPA POR CONTA DAS ANIMAÇÕES E INICIA OS MAPAS.
	$('.bs-stepper')[0].addEventListener('shown.bs-stepper', function (event) {
		if(event.detail.indexStep==5){
			mapVis02.invalidateSize();
    		Vis02TutorialFunction();
    		buildSlider();
    		Vis02TutorialFunction();
    		bring_front(mapVis02);
    	}
    	if(event.detail.indexStep==6){
    		//console.log(event.detail.from);
	    	if($('#pergunta_text')[0].checkValidity()==false || $('#pergunta_text')[0].value>60 || $('#pergunta_text')[0].value<40){
	    		$('#pergunta_text')[0].value="";
				$('#FormTeste')[0].classList.add("was-validated");
				stepper0.to(6);
			}else{
				$('#FormTeste').removeClass("was-validated");
			}
    	}
	});
	function validar_teste(){
	}
	// VALIDA AS RESPOSTAS DOS FORMS, DESTACA AS ÁREAS PERGUNTADAS E SETA OS VALORES DE TEMPO E CLICK PARA CADA PERGUNTA.
	$(".btn-next-form").click(function() {
		if($(this).hasClass('tutorial')==false){
			var ent= $(this).parent().find('.form-group > div > div> div >').siblings()[0].name;
			var entid= $(this).parent().find('.form-group > div > div> div >').siblings()[0].id;
			if($('input[name='+ent+']:checked').val()==undefined && $('input[name='+ent+']').hasClass('custom-control-input')==true){
				$(this).parent().parent()[0].classList.add('was-validated');
			}else if($('input[name='+ent+']').val()==""&& $('input[name='+ent+']').hasClass('custom-control-input')==false){
				$(this).parent().parent()[0].classList.add('was-validated');
			}else if($('#'+entid).val()==undefined && $('#'+entid).children().length>0){
				$(this).parent().parent()[0].classList.add('was-validated');
			}else{
			   	opcoes=[];
			   		stepper2.next();
			   		$(this).parent().parent().removeClass("was-validated");
			   		var id= $(this).parent().next().find('div >div > div> ').siblings()[0].id;
			   		//debugger
			   		proxima_view(id);
			   		Start_Update_data();
			    	setTimeout(function(){
			    		maior=0;menor=+Infinity;			    		
			    		VisPerguntas();
				    	updateSliderPerguntas();
				    	VisPerguntas();
				    	bring_front(mapVisPerguntas);
				    	mapVisPerguntas.invalidateSize();
			    	},400);
				$(this).parent().find('.form-group > div >.clicks')[0].value = clicks;
				d2 = new Date();
				diff = Math.abs(d1-d2)/1000;
				$(this).parent().find('.form-group > div >.tempo')[0].value = (Math.round((diff/60)*100)/100);
				clicks=-1;
				d1 = new Date();		
			}
		}else{
			//VALIDA O FORM COM INFORMAÇÕES PESSOAIS
			if($(this)[0].id=='btuto1'){
				if($('#5Form')[0].checkValidity()==false){
					$('#5Form')[0].classList.add("was-validated");
				}else{
					stepper0.next();
				}
			// PREPARA E INICIA A ETAPA DE PERGUNTAS PÓS TUTORIAL
			}else if($(this)[0].id=='btuto10'){
				tempotutorial= new Date();
				duracaotutorial= tempotutorial-tempoinicial;
				duracaotutorial= math.round(((duracaotutorial/1000)/60)*100)/100;
				alpha=0;
				clicks=0;
				$('#tutorial').css('display','none');
	    		$('#vis').css('display','');
				if($('#2Form').is(':visible')){
					var id= $('#2Form > div.active > div > div > input')[0].id.substring(4,6);
					//var id= $('#2Form > div.active > div > div > input')[0].id.substring(4,6);
					//debugger
			   		proxima_view(id);
			   		Start_Update_data();
			    	setTimeout(function(){
			    		maior=0;menor=+Infinity;
			    		VisPerguntas();
				    	updateSliderPerguntas();
				    	mapVisPerguntas.invalidateSize();
			    	},600);
			    	setTimeout(function(){
			    		VisPerguntas();
				    	bring_front(mapVisPerguntas);
			    	},700);
				}
			}else{
				stepper0.next();
			}
		}
	});
	$('.btn-previous-form').click(function(){
		stepper0.previous();
	});
	$("#btn1,#2btn1,#3btn1,#4btn1,#btuto10").css('float','right');
	// PARA CADA BOTÃO DA ÚLTIMA PERGUNTA DE CADA TÉCNICA PREPARA A PRÓXIMA TAB PARA SER EXIBIDA.
	$("#btn1,#2btn1,#3btn1,#4btn1").click(function() {
		var ent= $(this).parent().find('.form-group > div > div> div >').siblings()[0].name;
		if($('input[name='+ent+']:checked').val()==undefined && $('input[name='+ent+']').hasClass('custom-control-input')==true){
			$(this).parent().parent()[0].classList.add('was-validated');
		}else if($('input[name='+ent+']').val()==""&& $('input[name='+ent+']').hasClass('custom-control-input')==false){
			$(this).parent().parent()[0].classList.add('was-validated');
		}else{
			d2 = new Date();
			var ent= $(this).parent().find('.form-group > div >.clicks')[0].value = clicks;
			diff = Math.abs(d1-d2)/1000;
			var ent=$(this).parent().find('.form-group > div >.tempo')[0].value = (Math.round((diff/60)*100)/100);
			$('#pills-tab > li> a.active').parent().next()[0].classList.remove("disabled");
			$('#pills-tab > li> a.active').parent().next().find('a').click();
			$('#pills-tab > li> a.active').parent().prev()[0].classList.add("disabled");
			if($(this).parent().parent().hasClass('was-validated')){
				$(this).parent().parent()[0].classList.remove("was-validated");
			}
			clicks=-1;
			d1 = new Date();
		}
	});
	// SUBMETE OS FORMS PARA O GOOGLE SCRIPT WEB SERVICE PARA A API GRAVAR OS DADOS NO GOOGLE SHEETS.
    $('#Form,#2Form,#3Form,#4Form,#5Form').submit(function(){
    	var nameform=$(this)[0];
    		$.ajax({
		    	type: "POST",
			    url: $(this).attr('action'),
			    data : $(this).serialize(),
			    success: function(result, status, request){
			        console.log(nameform.id+" Estado atual ---\n" + status + "\nResultado: " + JSON.stringify(result));
			        sucesso++;
			    	refresh();
			    },
			    error: function (request, status, erro) {
			      	console.log(nameform.id+" Problema ocorrido: " + status + "\nDescrição: " + erro);
			      	$.ajax(this);
			      	return;
			    }
		    });
	    return false;
	});
	$('input[type=radio][name=inlineRadioOptions]').change(function() {
	    if (this.value == 'Sim') {
	        $('.alert').removeClass("show");
	    }
	});
});