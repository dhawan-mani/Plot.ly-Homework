
    function buildplot(){d3.json("samples.json").then((data) => {
    // console.log(data)
    var sample_values = data.samples.map((row) => row["sample_values"])
    console.log(sample_values);
    var otu_ids = data.samples.map((row) => row["otu_ids"])
    // console.log(otu_ids)
    var otu_labels = data.samples.map((row) => row["otu_labels"])
    console.log(otu_labels)
    var names = data.names
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
    let sorted_list=[]
    for(k=0; k<names.length; k++){
        sorted_list.push([list[k]].sort(compare))
        let top_sample = sorted_list[k].map((row) => row["Sample_Values"].slice(0,10))
        let top_hover_text = sorted_list[k].map((row) => row["Hover_Text"].slice(0,10))
        let top_labels =  sorted_list[k].map((row) => row["OTU_LABELS"].slice(0,10))
    //    console.log(top_hover_text)

        var trace1 = {
                    type: "bar",
                    x: top_sample,
                    y:`OTU${top_labels}`,
                    orientation:'h'
                };
              data = [trace1]
              var layout = {
                xaxis: {
                    autorange: true,
                    type: "linear"
                  }
                
              };  
            Plotly.newPlot("bar",data,layout)
            }  
        })}
        function optionChanged(){
            buildplot()
        }
       
    // //   On change to the DOM, call getData()
    //         var dropdown = d3.selectAll("#selDataset")
    //         function optionChanged(){
    //             input = this.value;
    //             var data = [];
    //             for (i=0; i<names.length;i++){
    //                 if (input === names[i]){
    //                     data = list[i]
    //                 }
    //             }
    //         }




    
    
//    

// });

