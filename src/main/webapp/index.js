"use strict";
exports.__esModule = true;
//initialize variables that will be used in function doOnLoad()
var layout;
var csvGrid;
//var colors = {"Type A":"#69ba00", "Type B": "#4aa397", "Type C": "#de619c"};
//var borders = {"Type A":"#447900", "Type B": "#0a796a", "Type C": "#b7286c"};
//var legendValues = [];
//for(var t in colors)
//    legendValues.push({text:t,color:colors[t]});
//declare var dhtmlXLayoutObject: {};
var $ = require("jquery");
//set up dhtmlx components when page is loaded
function doOnLoad() {
    //set up layout
    layout = new dhtmlXLayoutObject({
        parent: document.body,
        pattern: "3J" // layout's pattern
    });
    layout.cells("a").setText("Upload a CSV");
    layout.cells("c").setText("Previously Uploaded CSVs");
    layout.cells("b").setText("Graph of Data");
    //attach HTML file upload form to layout
    layout.cells("a").attachObject("uploadForm");
    attachCSVGrid();
}
//function that is called when upload button is pressed
function uploadFile(e) {
    //ajax call to upload the file to RESTful webservice, and then call code
    //to graph data without switching pages
    var documentData = new FormData();
    //get uploaded file
    var file = $('input#file.fileData')[0].files[0];
    documentData.append('file', file);
    $.ajax({
        url: 'rest/file/uploader',
        type: 'POST',
        data: documentData,
        cache: false,
        contentType: false,
        processData: false,
        //if successful upload, do this:
        success: function (response) {
            //call method to list this file under previously uploaded files
            addToCSVGrid(file);
            //get filename
            var fileName = file.name;
            //get file extension
            var fileType = fileName.substring(fileName.lastIndexOf("."));
            //if data is in a csv or plain text file
            if (fileType == ".csv" || fileType == "") {
                //instantiate the FileReader to get data from the CSV file
                var read = new FileReader();
                //method that defines what happens once the 
                //FileReader has read in the contents of the file
                read.onloadend = function (e) {
                    var text = read.result;
                    //send CSV string to attachGraph method
                    attachGraph(text);
                };
                //Tells the FileReader to begin reading in data from the file
                read.readAsText(file);
            }
            else {
                alert("The uploaded file is not a CSV");
            }
        }
    });
    return false;
}
//method to parse CSV string and build and attach a scatter chart
function attachGraph(csvData) {
    var chart = layout.cells("b").attachChart({
        view: "scatter",
        xValue: "#data0#",
        yValue: "#data1#"
    });
    var data = csvData.substring(csvData.indexOf("\n") + 1);
    //    console.log(data);
    chart.parse(data, "csv");
}
//method to initialize grid of previously uploaded CSVs
function attachCSVGrid() {
    csvGrid = layout.cells("c").attachGrid();
    csvGrid.setHeader("File Name, Last Modified, Size");
    csvGrid.setColumnIds("name,time,size");
    csvGrid.setInitWidths("150,150,*");
    csvGrid.setColAlign("left,left,left");
    csvGrid.setColTypes("ro,ro,ro");
    csvGrid.setColSorting("str,str,str");
    csvGrid.init();
}
//method to get information about the uploaded file and add it to the upload history
function addToCSVGrid(file) {
    var name = file.name;
    var unixDate = file.lastModified;
    console.log(unixDate);
    var size = file.size;
    var rowId = date;
    var date = new Date(unixDate);
    var dateString = date.toString();
    var lastIndex = dateString.lastIndexOf(":") + 2;
    dateString = dateString.substring(0, lastIndex + 1);
    csvGrid.addRow(unixDate, [name, dateString, size]);
}
