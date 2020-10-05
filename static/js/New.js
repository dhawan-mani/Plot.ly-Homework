// Declaration of Global Variables
let top_sample = [];
let top_hover_text = [];
let top_labels = [];
let names = [];
let data = [];
let sorted_list = [];
let Demo_ethnicity = [];
let Demo_gender = [];
let Demo_age =[];
let Demo_location = [];
let Demo_bbtype =[];
let Demo_wfreq = [];
d3.select("#sample-metadata").append("div").attr("class","Demographic-info");
let Demographic_info = d3.select(".Demographic-info");

// Main function defined
function init(){
    d3.json("samples.json").then((data) => {
    console.log(data)
    var sample_values = data.samples.map((row) => row["sample_values"])
    var otu_ids = data.samples.map((row) => row["otu_ids"])
    var otu_labels = data.samples.map((row) => row["otu_labels"])
    console.log(otu_labels)
    names = data.names
    Demo_ethnicity = data.metadata.map((row) => row["ethnicity"])
    Demo_gender = data.metadata.map((row) => row["gender"])
    Demo_age = data.metadata.map((row) => row["age"])
    Demo_location = data.metadata.map((row) => row["location"])
    Demo_bbtype = data.metadata.map((row) => row["bbtype"])
    Demo_wfreq = data.metadata.map((row) => row["wfreq"])

    var dropdown = d3.select("#selDataset")

// Appending the dropdown values as from names
    for ( i=0; i< names.length; i++){
        var option = dropdown.append("option")
        option.attr("value",`${names[i]}`)
        option.text(`${names[i]}`)

    }
// Creating a list that will store all the fields that we want from main data
    const list = []
    for (j=0; j<names.length;j++){
        list.push({"OTU": names[j],"Sample_Values":sample_values[j],"OTU_LABELS":otu_ids[j],"Hover_Text":otu_labels[j]})
       
    }
    console.log(list) 
// Sorting the list
    function compare(a,b){
        const sample_1 = a.Sample_Values;
        const sample_2 = b.Sample_Values;
        let comparison = 0;
        if (sample_1 > sample_2){
            comparison = 1
        }
        
        else if  (sample_1<sample_2){
            comparison = -1;
        }
        return comparison;
    }

    for(k=0; k<names.length; k++){
        sorted_list.push([list[k]].sort(compare))
     
    }
  // The data that will be displayed when the page loads initially
    UpdateData(940)

    })}
  //   On change to the DOM, call UpdateData()
  function UpdateData(value){
    for (i=0; i<names.length;i++){
        if (value == names[i]){
            console.log("FOUND");
  // Slicing the data to get the Top 10 values
            top_sample = sorted_list[i].map((row) => row["Sample_Values"].slice(0,10).reverse());
            top_hover_text = sorted_list[i].map((row) => row["Hover_Text"].slice(0,10).reverse());
            top_labels = sorted_list[i].map((row) => row["OTU_LABELS"].slice(0,10).reverse());
            console.log(sorted_list[i])
            Demographic_info.html("")
            Demographic_info.html(`
            <strong>id:${names[i]}<br>
            <strong>ethnicity:${Demo_ethnicity[i]}<br>
            <strong>gender:${Demo_gender[i]}<br>
            <strong>age:${Demo_age[i]}<br>
            <strong>location:${Demo_location[i]}<br>
            <strong>bbtype:${Demo_bbtype[i]}<br>
            <strong>wfreq:${Demo_wfreq[i]}<br>
            `)
// Creating labels for the bar chart
            let New_labels=[];
            for (j=0; j<top_labels[0].length;j++){
                var labels= `OTU ${top_labels[0][j]}`
                New_labels.push(labels)
            }
            console.log(New_labels)
            console.log(top_hover_text[0])
            console.log(top_sample[0])

//----------------------------------- Bar chart--------------------------------
            var trace1 = {
                type: "bar",
                x: top_sample[0],
                y:New_labels,
                orientation:'h',
                text:top_hover_text[0],
                };
            var layout = {
                height: 500,
                width: 400,
               
                };
        Plotly.newPlot("bar",[trace1],layout); 

//------------------------ Bubble Chart----------------------------------------------

              bubble_sample = sorted_list[i].map((row) => row["Sample_Values"])
              bubble_hover_text = sorted_list[i].map((row) => row["Hover_Text"])
              bubble_otu_id = sorted_list[i].map((row) => row["OTU_LABELS"])
              bubble_id = sorted_list[i].map((row) => row["OTU"])

              var trace2 = {
                x: bubble_otu_id[0],
                y: bubble_sample[0],
                mode: 'markers',
                marker: {
                  size: bubble_sample[0],
                  color:bubble_otu_id[0],
// https://plotly.com/javascript/colorscales/
                colorscale:'Jet',  
                cmin: 0,
                cmax: 3500,
                colorbar: {
                    thickness: 10,
                    y: 0.5,
                    ypad: 0,
                    title: 'OTU Samples',
                    titleside: 'bottom',
                    outlinewidth: 1,
                    outlinecolor: 'black',
                    tickfont: {
                      family: 'Lato',
                      size: 14,
                      color: 'green'
                    }
                  }
                },
                text:bubble_hover_text[0]
              };
              
              var data = [trace2];
              
              var layout = {
                title: `Samples of ${bubble_id[0]}`,
                showlegend: false,
                height: 600,
                width: 1000,
                xaxis:{
                    title:"OTU ID"
                }
               
              };
              
            Plotly.newPlot('bubble', data, layout);
// ----------------------------Gauge Chart------------------------------------------------
 
console.log(Demo_wfreq[i])
var degrees = 9 - Demo_wfreq[i],
radius = .5;
var radians = degrees * Math.PI / 9;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
pathX = String(x),
 space = ' ',
 pathY = String(y),
pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);
var data = [{ type: 'scatter',
 x: [0], y:[0],
marker: {size: 28, color:'850000'},
showlegend: false,
name: 'Wash Frequency',
text: Demo_wfreq[i],
// direction: "counter-clockwise",
hoverinfo: 'text+name'},
{ values: [50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50/9,50],
rotation: 90,
text: ['8-9', '7-8', '6-7', '5-6',
      '4-5', '3-4', '2-3', '1-2', '0-1' ,''],
textinfo: 'text',
textposition:'inside',      
marker: {colors:['#006203','#0F9200','#30CB00','#4AE54A','#A4FBA6','#9CB8A0','#D3E0CE','#EAE9E4','#F0F1F4','FFFFFF']},
hoverinfo: 'text',
hole: .5,
type: 'pie',
showlegend: false
}];

var layout = {
shapes:[{
  type: 'path',
    path: path,
   fillcolor: '850000',
   line: {
    color: '850000'
  }
}],
title: '<b>Belly Button washing Frequency</b> <br> Scrubs Per Week',
height: 500,
width: 600,
margin: {
l: 25, r: 25, b: 25, t: 75
},
xaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]},
yaxis: {zeroline:false, showticklabels:false, showgrid: false, range: [-1, 1]}
};
Plotly.newPlot('gauge', data, layout);   

    }
  }        
}
   
// Event listener attached
function optionChanged(newData){
    UpdateData(newData);
   
}     
 // Main function called.
init();
    
    