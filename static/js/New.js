let top_sample = [];
let top_hover_text = [];
let top_labels = [];
let names = [];
var data = [];
let sorted_list = []

function init(){
    d3.json("samples.json").then((data) => {
    // console.log(data)
    var sample_values = data.samples.map((row) => row["sample_values"])
    console.log(sample_values);
    var otu_ids = data.samples.map((row) => row["otu_ids"])
    // console.log(otu_ids)
    var otu_labels = data.samples.map((row) => row["otu_labels"])
    console.log(otu_labels)
    names = data.names
    // console.log(names) 
    var dropdown = d3.select("#selDataset")
// Appending the dropdown values as from names
    for ( i=0; i< names.length; i++){
    var option = dropdown.append("option")
        option.attr("value",`${names[i]}`)
        option.text(`${names[i]}`)

    }
    const list = []
    for (j=0; j<names.length;j++){
        list.push({"OTU": names[j],"Sample_Values":sample_values[j],"OTU_LABELS":otu_ids[j],"Hover_Text":otu_labels[j]})
       
    }
    console.log(list) 
    
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
    //let sorted_list=[]
    for(k=0; k<names.length; k++){
        sorted_list.push([list[k]].sort(compare))
     
    }
    //    console.log(top_hover_text) 
    })}
function UpdateData(value){
    //   On change to the DOM, call getData()
    // var dropdown = d3.selectAll("#selDataset")
    // var dataset = dropdown.property("value");
    console.log(names);
    // let top_sample = [];
    // let top_hover_text = [];
    // let top_labels = [];
    for (i=0; i<names.length;i++){
        if (value == names[i]){
            console.log("FOUND");
            //data = sorted_list[i]
            top_sample = sorted_list[i].map((row) => row["Sample_Values"].slice(0,10).reverse());
            top_hover_text = sorted_list[i].map((row) => row["Hover_Text"].slice(0,10).reverse());
            top_labels = sorted_list[i].map((row) => row["OTU_LABELS"].slice(0,10).reverse());
            console.log(sorted_list[i])
            
            // top_labels.map((row,index)=> row[index])
            let New_labels=[];
            for (j=0; j<top_labels[0].length;j++){
                var labels= `OTU ${top_labels[0][j]}`
                New_labels.push(labels)
            }
            console.log(New_labels)
            console.log(top_hover_text[0])
            console.log(top_sample[0])
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
                //   colorscale: [[0, 'rgba(200, 255, 200,100)'], [1, 'rgba(120, 100,200,300 )']],
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
              
         
          
            //buildplot(top_sample,top_labels);
        }
        }        
    }
   
function optionChanged(newData){
    UpdateData(newData);
   
}     
          
           
            
init();
    
    