var sucesso=0;
function refresh(){
  if(sucesso==2){
      window.location.reload(true);
  }
}
var maior=0,menor=+Infinity;
function distribuicaoSin(id,disttomap){
  var distSin=[];
  disttomap.forEach(function(d,i){
    distSin.push(Number(d[0][id]));
    if(maior<Number(d[0][id])){
      maior=d[0][id];
    }
    if(menor>Number(d[0][id])){
      menor=d[0][id];
    }
  });
  return distSin;
}
function infoprops(props){
  return '<h4> Informações gerais.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
}
// DESTACA O LAYER DE UM POLIGONO NOS MAPAS
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 1.5,
    color: 'black',
    fillOpacity: 0.7
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
function colorR(prob){
  var cbf = palette('cb-BuGn', 9);
  var color;
  gradesR.forEach(function(d,i){
    if(Number(prob)>=d){
      color=cbf[i];
    }
  });
  return color;
}
//COMPARA DOIS ARRAYS DE DISTRUIBUIÇÕES IGUAIS E RETORNA A PROBABILIDADE DO PRIMEIRO SER MENOR QUE O SEGUNDO.
function cmp(dist1,dist2){
  //console.log(dist1);
  //console.log(dist2);
  var count=0;
  var numTests = 1000;
  for(let i = 0 ; i < numTests ; i++){
    if(dist1[Math.floor(Math.random()*dist1.length)]>dist2[Math.floor(Math.random()*dist1.length)]){
      count++;
    }
  }
  //dist1.forEach(function(d,i){
  //});
  return (count/1000);//dist1.length);
}
// ALTERA A ORDEM DE OBJETOS EM UM ARRAY DE MODO ALEATÓRIO
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
  }
  return array;
}
// ESSA FUNÇÃO EMBARALHA AS PERGUNTAS CONTIDAS NO ARRAY DE PERGUNTAS E PREENCHE AUTOMATICAMENTO O HTML COM A NOVA ORDEM.
function geraperguntas(perguntas,index,vis){
  var d1= document.createElement("div");
  var d2= document.createElement("div");
  d2.setAttribute('class','card');
  var pergunta= perguntas[index-1];
  //debugger
  var label = document.createElement("label");
  label.setAttribute('style',"font-weight:bold;");
  label.setAttribute('for',"pergunta1");
  label.setAttribute('id',"pergunta1");
  label.innerText= pergunta.question_text;
      var div1 = document.createElement("div");
      div1.setAttribute('class','col-sm-3 col-md-3 col-lg-3 col-xl-3');

      var input1= document.createElement("input");
      input1.setAttribute('type','hidden');
      input1.setAttribute('class','clicks');
      input1.setAttribute('id','CLC'+pergunta.id);
      input1.setAttribute('name','CLC'+pergunta.id);
      input1.setAttribute('value','');

      var input2= document.createElement("input");
      input2.setAttribute('type','hidden');
      input2.setAttribute('class','tempo');
      input2.setAttribute('id','TMP'+pergunta.id);
      input2.setAttribute('name','TMP'+pergunta.id);
      input2.setAttribute('value','');

      var inputR= document.createElement("input");
      inputR.setAttribute('type','hidden');
      inputR.setAttribute('id','ANS'+pergunta.id);
      inputR.setAttribute('name','ANS'+pergunta.id);
      inputR.setAttribute('value',''+pergunta.answer);

      if(pergunta.size.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','SIZE:'+pergunta.size);
      }else if(pergunta.variance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','VARIANCE:'+pergunta.variance);
      }else if(pergunta.distance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','DISTANCE:'+pergunta.distance);
      }else{
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','');
      }

      if(pergunta.size.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','SIZE:'+pergunta.size);
      }else if(pergunta.variance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','VARIANCE:'+pergunta.variance);
      }else if(pergunta.distance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','DISTANCE:'+pergunta.distance);
      }else{
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id);
        inputS.setAttribute('name','CDC'+pergunta.id);
        inputS.setAttribute('value','');
      }

      var label2 = document.createElement("label");
      label2.setAttribute('for','CNFC'+pergunta.id);
      label2.setAttribute('style',"font-weight:bold;");
      label2.innerText='De 1 a 5 sendo 1 pouco confiante e 5 muito confiante, quão confiante você está da sua resposta?';

      var input3= document.createElement("input");
      input3.setAttribute('type','text');
      input3.setAttribute('class','ioRangerSlider');
      input3.setAttribute('id','CNFC'+pergunta.id);
      input3.setAttribute('name','CNFC'+pergunta.id);
      input3.setAttribute('value','');
      input3.required=true;

      var input8= document.createElement("input");
      input8.setAttribute('type','text');
      input8.setAttribute('id',""+pergunta.id);
      input8.setAttribute('name',"PGT"+pergunta.id);
      input8.setAttribute('class','form-control');
      input8.setAttribute('value','');
      input8.setAttribute('placeholder','Ex: 50');
      input8.required=true;
        var input4= document.createElement("div");
        var input7= document.createElement("br");
        var input6= document.createElement("p");
        input4.setAttribute('class','invalid-feedback');
        input6.innerText='Você Precisa Inserir um Valor.';
        input4.appendChild(input7);
        input4.appendChild(input6);
      div1.appendChild(input8);
      div1.appendChild(input4);
      d2.appendChild(label);
      d1.appendChild(div1);
      d2.appendChild(d1);

  d2.appendChild(label2);
  d2.appendChild(input3);
  var input5= document.createElement("div");
  input5.setAttribute('class','invalid-feedback');
  input5.innerText='Você precisa escolher um';
  d2.appendChild(input5);
  d2.appendChild(input1);
  d2.appendChild(input2);
  d2.appendChild(inputR);
  d2.appendChild(inputS);
  return d2;
}
// QUANDO O RECPATHCA É COMPLETADO SUBMETE OS FORMS.
function recaptcha_callback(){
  tempofinal= new Date();
  duracaoPerguntas= tempofinal-tempotutorial;
  duracaoPerguntas=math.round(((duracaoPerguntas/1000)/60)*100)/100;

  duracao= tempofinal-tempoinicial;
  duracao=math.round(((duracao/1000)/60)*100)/100;
  $('#duracaototal').val(duracao);
  $('#duracaotutorial').val(duracaotutorial);
  $('#duracaoperguntas').val(duracaoPerguntas);
  
  $('#5Form').submit();
  $('#feedback').val($('#feedback2').val());
  $('#ordem').val(arr.join());
  $('#2Form').submit();
  $('#vis').css('display','none');
  $('#footer').css('display','');
}
function bring_front(map){
  for (l in map._layers) {
      if(map._layers[parseInt(l)].feature!=undefined && map._layers[parseInt(l)].feature.properties.highlight==1){
      map._layers[parseInt(l)].bringToFront();
    }
  }
}
//QUANDO INVOCADA ESSA FUNÇÃO COMPARA UMA AREA COM AS DEMAIS PARA TECNICA DE INTERVALO.
function whenClicked(e) {
  $('#slidert').addClass("disabledslider");
  comparando(e);              
}
function whenClicked_Perguntas(e) {
  $('#div_slider_Perguntas').addClass("disabledslider");
  comparando_Perguntas(e);              
}
var size,distance,variance_large,variance_small;
function compare(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,distribution_data),distribuicaoSin(dataset[1].properties.id,distribution_data));
  infoVis02.remove();
  if(layerTuto2!= null){
      layerTuto2.clearLayers();
  }
  layerTuto2 =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }

          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }

        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVis02);
  infoVis02.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  infoVis02.addTo(mapVis02);
}
function compare_Perguntas(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,distribution_data),distribuicaoSin(dataset[1].properties.id,distribution_data));
  infoVisPerguntas.remove();
  if(layerPerguntas!= null){
      layerPerguntas.clearLayers();
  }
  layerPerguntas =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }

          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }

        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked_Perguntas
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerPerguntas.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVisPerguntas);
  infoVisPerguntas.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  infoVisPerguntas.addTo(mapVisPerguntas);
}
function comparando_Perguntas(e){
  //console.log(e);
  var exists=false;
    selecionados_Perguntas.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados_Perguntas.push(e);
      if(selecionados_Perguntas.length==2){
        layerPerguntas.clearLayers();
        var newdata=[];
        selecionados_Perguntas.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare_Perguntas(newdata);
      }
    }else if(exists==true && selecionados_Perguntas.length>0){
      selecionados_Perguntas=[];
      $('#div_slider_Perguntas').removeClass("disabledslider");
      VisPerguntas();
      bring_front(mapVisPerguntas);
    }else if(exists){
      var filtered = selecionados_Perguntas.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados_Perguntas=filtered;
      layerPerguntas.resetStyle(e.target);
    }
}
function comparando(e){
  //console.log(e);
  var exists=false;
    selecionados.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados.push(e);
      if(selecionados.length==2){
        layerTuto2.clearLayers();
        var newdata=[];
        selecionados.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare(newdata);
      }
    }else if(exists==true && selecionados.length>0){
      selecionados=[];
      $('#slidert').removeClass("disabledslider");
      Vis02TutorialFunction(geodata,true);
      bring_front(mapVis02);
    }else if(exists){
      var filtered = selecionados.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados=filtered;
      layerTuto2.resetStyle(e.target);
    }
}
function proxima_view(id){
  switch(id) {
  case "01":
    polygon='./synthetic-data/data/distance/distance_near.geojson';
    distribution='./synthetic-data/data/distance/distance_1.json';
    break;
  case "02":
    polygon='./synthetic-data/data/distance/distance_near.geojson';
    distribution='./synthetic-data/data/distance/distance_2.json';
    break;
  case "03":
    polygon='./synthetic-data/data/distance/distance_near.geojson';
    distribution='./synthetic-data/data/distance/distance_3.json';
    break;
  case "04":
    polygon='./synthetic-data/data/distance/distance_near.geojson';
    distribution='./synthetic-data/data/distance/distance_4.json';
    break;
  case "05": //01
    polygon='./synthetic-data/data/distance/distance_medium.geojson';
    distribution='./synthetic-data/data/distance/distance_1.json';
    break;
  case "06":
    polygon='./synthetic-data/data/distance/distance_medium.geojson';
    distribution='./synthetic-data/data/distance/distance_2.json';
    break;
  case "07":
    polygon='./synthetic-data/data/distance/distance_medium.geojson';
    distribution='./synthetic-data/data/distance/distance_3.json';
    break;
  case "08":
    polygon='./synthetic-data/data/distance/distance_medium.geojson';
    distribution='./synthetic-data/data/distance/distance_4.json';
    break;
  case "09":// Distance Far
    polygon='./synthetic-data/data/distance/distance_far.geojson';
    distribution='./synthetic-data/data/distance/distance_1.json';
    break;
  case "10":
    polygon='./synthetic-data/data/distance/distance_far.geojson';
    distribution='./synthetic-data/data/distance/distance_2.json';
    break;
  case "11":
    polygon='./synthetic-data/data/distance/distance_far.geojson';
    distribution='./synthetic-data/data/distance/distance_3.json';
    break;
  case "12":
    polygon='./synthetic-data/data/distance/distance_far.geojson';
    distribution='./synthetic-data/data/distance/distance_4.json';
    break;
  case "13":// Size Small
    polygon='./synthetic-data/data/size/size_small.geojson';
    distribution='./synthetic-data/data/size/size_1.json';
    break;
  case "14":
    polygon='./synthetic-data/data/size/size_small.geojson';
    distribution='./synthetic-data/data/size/size_2.json';
    break;
  case "15":
    polygon='./synthetic-data/data/size/size_small.geojson';
    distribution='./synthetic-data/data/size/size_3.json';
    break;
  case "16":
    polygon='./synthetic-data/data/size/size_small.geojson';
    distribution='./synthetic-data/data/size/size_4.json';
    break;
  case "17"://Size Medium
    polygon='./synthetic-data/data/size/size_medium.geojson';
    distribution='./synthetic-data/data/size/size_1.json';
    break;
  case "18":
    polygon='./synthetic-data/data/size/size_medium.geojson';
    distribution='./synthetic-data/data/size/size_2.json';
    break;
  case "19":
    polygon='./synthetic-data/data/size/size_medium.geojson';
    distribution='./synthetic-data/data/size/size_3.json';
    break;
  case "20":
    polygon='./synthetic-data/data/size/size_medium.geojson';
    distribution='./synthetic-data/data/size/size_4.json';
    break;
  case "21":// Size Large
    polygon='./synthetic-data/data/size/size_large.geojson';
    distribution='./synthetic-data/data/size/size_1.json';
    break;
  case "22":
    polygon='./synthetic-data/data/size/size_large.geojson';
    distribution='./synthetic-data/data/size/size_2.json';
    break;
  case "23":
    polygon='./synthetic-data/data/size/size_large.geojson';
    distribution='./synthetic-data/data/size/size_3.json';
    break;
  case "24":
    polygon='./synthetic-data/data/size/size_large.geojson';
    distribution='./synthetic-data/data/size/size_4.json';
    break;
  case "25":// Number Regions Small
    polygon='./synthetic-data/data/number_regions/number_regions_small.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_1.json';
    break;
  case "26":
    polygon='./synthetic-data/data/number_regions/number_regions_small.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_2.json';
    break;
  case "27":
    polygon='./synthetic-data/data/number_regions/number_regions_small.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_3.json';
    break;
  case "28":
    polygon='./synthetic-data/data/number_regions/number_regions_small.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_4.json';
    break;
  case "29"://Medium
    polygon='./synthetic-data/data/number_regions/number_regions_medium.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_1.json';
    break;
  case "30":
    polygon='./synthetic-data/data/number_regions/number_regions_medium.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_2.json';
    break;
  case "31":
    polygon='./synthetic-data/data/number_regions/number_regions_medium.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_3.json';
    break;
  case "32":
    polygon='./synthetic-data/data/number_regions/number_regions_medium.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_4.json';
    break;
  case "33"://Large
    polygon='./synthetic-data/data/number_regions/number_regions_large.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_1.json';
    break;
  case "34":
    polygon='./synthetic-data/data/number_regions/number_regions_large.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_2.json';
    break;
  case "35":
    polygon='./synthetic-data/data/number_regions/number_regions_large.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_3.json';
    break;
  case "36":
    polygon='./synthetic-data/data/number_regions/number_regions_large.geojson';
    distribution='./synthetic-data/data/number_regions/number_regions_4.json';
    break;
  default:
    // code block
  }
}