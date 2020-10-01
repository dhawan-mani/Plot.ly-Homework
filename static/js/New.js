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
    // console.log(list)
    function compare(a,b){
        const sample_1 = a.Sample_Values;
        const sample_2 = b.sample_values;
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
            top_sample = sorted_list[i].map((row) => row["Sample_Values"].slice(0,10));
            top_hover_text = sorted_list[i].map((row) => row["Hover_Text"].slice(0,10));
            top_labels = sorted_list[i].map((row) => row["OTU_LABELS"].slice(0,10));
            // top_labels.map((row,index)=> row[index])
            let New_labels=[];
            for (j=0; j<top_labels[0].length;j++){
                var labels= `OTU ${top_labels[0][j]}`
                New_labels.push(labels)
            }
            console.log(New_labels)
            console.log(top_labels[0])
            console.log(top_sample[0])
            var trace1 = {
                type: "bar",
                x: top_sample[0],
                y:New_labels,
                orientation:'h'
            };
            var layout = {
                height: 600,
                width: 800
              };
        //var data = [trace1];
        // var layout = {
        // yaxis: {
        //     labels:New_labels
        //     }
        
        // };  
            Plotly.newPlot("bar",[trace1],layout);    
            //buildplot(top_sample,top_labels);
        }
        }        
    }
    //console.log(data);
    //console.log(top_sample);
   
    

function buildplot(top_sample, top_labels){
    //data['orientation']  = 'h';
    var trace1 = {
                type: "bar",
                x: top_sample,
                y:`OTU${top_labels}`,
                orientation:'h'
    };
    var data = [trace1];
    // var layout = {
    // xaxis: {
    //     autorange: true,
    //     //type: "linear"
    //     }

    // };  
    Plotly.newPlot("bar",data);
}         
function optionChanged(newData){
    UpdateData(newData);
   
}     
          
           
            
init();
    
    