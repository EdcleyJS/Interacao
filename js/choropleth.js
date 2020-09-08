var filterbymouth,filterbytri,alpha=0,left=200,right=500,leftTaxi=22000,rightTaxi=36000,database,interOn,mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,opcoes=[],GeoLayer,LayerRange,layer,layerTuto3,layerTuto4,LayerTaxi,dataset,max,featurename,selecionados=[],selecionadosC=[],selecionadosT=[],medias=[],hops=true;
var mapVis02 = L.map('vis02',{zoomControl: false,preferCanvas: true,attributionControl: false,crs: L.CRS.Simple}).setView([0.203125,0.6640625], 6);
var mapVisPerguntas = L.map('visPerguntas',{zoomControl: false,preferCanvas: true,attributionControl: false,crs: L.CRS.Simple}).setView([0.203125,0.6640625], 6);

var gradesR=[0,0.12,0.24,0.36,0.48,0.60,0.72,0.84,1];
var databasetaxi,datasettaxi;
mapVis02.dragging.disable();
mapVis02.touchZoom.disable();
mapVis02.doubleClickZoom.disable();
mapVis02.scrollWheelZoom.disable();
mapVis02.boxZoom.disable();
mapVis02.keyboard.disable();
mapVisPerguntas.dragging.disable();
mapVisPerguntas.touchZoom.disable();
mapVisPerguntas.doubleClickZoom.disable();
mapVisPerguntas.scrollWheelZoom.disable();
mapVisPerguntas.boxZoom.disable();
mapVisPerguntas.keyboard.disable();

var bounds = [[0,0], [1000,1000]];
var geodata;

var firstTime = true;

var url_string = window.location.href
var url = new URL(url_string);
var polyfile,polygon;
var distributionfile;
var distribution,distribution_data;
//console.log(polyfile,distributionfile);
function Start_Update_data(){
  if(!polyfile) {
    polyfile = "./data/polygons.geojson";
    //console.log("vazio");
  }else{
    polyfile = polygon;
  }
  d3.json(polyfile,function(error,polygons_far){
    geodata=polygons_far;
  });
  if(!distributionfile) {
    distributionfile = "./data/distribuicao.json";
  }else{
    distributionfile = distribution;
  }
  //debugger
  d3.json(distributionfile,function(error,dist){
    distribution_data=Object.keys(dist).map(function(key) {
      return [dist[key]];
    });
  });
}
//-------------------
//-- DIV INFO DO MAPA CONTROLADO -- 
var infoVis02=L.control();
infoVis02.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
//-- DIV LEGENDA DO MAPA CONTROLADO --
var legendVis02 = L.control({position: 'bottomright'});
legendVis02.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  /*for (var i = 10; i >= 0; i--) {
    grades.push((0.1*i).toFixed(2));
  }*/
  for (var i = (gradesR.length-1); i >=0 ; i--) {
    if(i==0||i==8){
      div.innerHTML +='<i style="color:#'+colorR(gradesR[i])+'; background:#'+colorR(gradesR[i])+'"></i>'+(gradesR[i]*100)+'%</br>';
    }else{
      div.innerHTML +='<i style="color:#'+colorR(gradesR[i])+'; background:#'+colorR(gradesR[i])+'"></i></br>';
    }
  }
  return div;
};
legendVis02.addTo(mapVis02);
var cmpOn=false;
var flag=false;
//-- FUNÇÃO QUE DESENHA E CONTROLA AS AREAS NO MAPA --
var layerTuto2,layerPerguntas;

function Vis02TutorialFunction(){
  if(layerTuto2!= undefined){
      layerTuto2.clearLayers();
    }
    layerTuto2=L.geoJson(geodata,
      {style: function(feature){
          //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
          var probArea= new distribuicaoIntervalo(distribuicaoSin(feature.properties.id,distribution_data),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
      if(feature.properties.highlight==1){
          if(feature.properties.id==0){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(prob),
              fillOpacity: 0.9,
              color: '#e66101'
            };
          }else if(feature.properties.id==1){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(prob),
              fillOpacity: 0.9,
              color: '#d01c8b'
            };
          }else if(feature.properties.id==48){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(prob),
              fillOpacity: 0.9,
              color: '#dfc27d'
            };
          }else if(feature.properties.id==16){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(prob),
              fillOpacity: 0.9,
              color: '#2d004b'
            };
          }
        }else{
              return {
                weight: 0.5,
                opacity: 1,
                fillColor: "#"+colorR(prob),//+colorR(prob),
                color: 'black',
                fillOpacity: 0.9
              };
          }
    },
    onEachFeature: function (feature, layer) {
        var probArea= new distribuicaoIntervalo(distribuicaoSin(feature.properties.id,distribution_data),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
          layer.on({
            dblclick: whenClicked
          });
          layer.on('mouseover', function (e) {
              highlightFeature(e);
          });
          layer.on('mouseout', function (e) {
              layerTuto2.resetStyle(e.target);
              if(selecionados.filter(function(el) { return el.target.feature.properties.id === e.target.feature.properties.id; }).length>0){
                layer.setStyle({
                    weight: 3.5,
                    color: 'black',
                    fillOpacity: 0.9
                });
              }
          });
      }
  }).addTo(mapVis02);
  infoVis02.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };

    infoVis02.addTo(mapVis02);

    //
  //console.log("ok");
}

var infoVisPerguntas=L.control();
infoVisPerguntas.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
//-- DIV LEGENDA DO MAPA CONTROLADO --
var legendVisPerguntas = L.control({position: 'bottomright'});
legendVisPerguntas.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  /*for (var i = 10; i >= 0; i--) {
    grades.push((0.1*i).toFixed(2));
  }*/
  for (var i = (gradesR.length-1); i >=0 ; i--) {
    if(i==0||i==8){
      div.innerHTML +='<i style="color:#'+colorR(gradesR[i])+'; background:#'+colorR(gradesR[i])+'"></i>'+(gradesR[i]*100)+'%</br>';
    }else{
      div.innerHTML +='<i style="color:#'+colorR(gradesR[i])+'; background:#'+colorR(gradesR[i])+'"></i></br>';
    }
  }
  return div;
};
legendVisPerguntas.addTo(mapVisPerguntas);
function VisPerguntas(){
  //console.log(polygon);
  //console.log(distribution);
    if(layerPerguntas!= undefined){
      layerPerguntas.clearLayers();
    }
    layerPerguntas=L.geoJson(geodata,
      {style: function(feature){
        var probArea= new distribuicaoIntervalo(distribuicaoSin(feature.properties.id,distribution_data),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
      if(feature.properties.highlight==1){
          if(feature.properties.id==0){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(prob),
              fillOpacity: 0.9,
              color: '#e66101'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(prob),
              fillOpacity: 0.9,
              color: '#d01c8b'
            };
          }
        }else{
              return {
                weight: 0.5,
                opacity: 1,
                fillColor: "#"+colorR(prob),//+colorR(prob),
                color: 'black',
                fillOpacity: 0.9
              };
          }
    },
    onEachFeature: function (feature, layer) {
        var probArea= new distribuicaoIntervalo(distribuicaoSin(feature.properties.id,distribution_data),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
          layer.on({
            dblclick: whenClicked_Perguntas
          });
          layer.on('mouseover', function (e) {
              highlightFeature(e);
          });
          layer.on('mouseout', function (e) {
              layerPerguntas.resetStyle(e.target);
              if(selecionados_Perguntas.filter(function(el) { return el.target.feature.properties.id === e.target.feature.properties.id; }).length>0){
                layer.setStyle({
                    weight: 3.5,
                    color: 'black',
                    fillOpacity: 0.9
                });
              }
          });
      }
  }).addTo(mapVisPerguntas);
  infoVisPerguntas.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };

    infoVisPerguntas.addTo(mapVisPerguntas);

    //
  //console.log("Perguntas");
}