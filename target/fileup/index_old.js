dhtmlxEvent(window, "load", function () {
    //set up the layout of the file, 
    //three cells, one across the bottom and two across the top
    var layout = new dhtmlXLayoutObject(document.body, "3U");
    var internsGrid = layout.cells("a").attachGrid();
    layout.cells("a").setText("Intern Names");
    layout.cells("b").setText("Intern Information");
    layout.cells("c").setText("Forum");
    layout.cells("a").setHeight(300);
    //add menu across top of the page, see data/menu.xml for more info
    //possibly only works if hosted on a server???
    var menu = layout.attachMenu();
    menu.setIconsPath("icons/");
    menu.loadStruct("data/menu.xml");
    //add toolbar under menu, see data/toolbar.xml for more info
    var toolbar = layout.attachToolbar();
    toolbar.setIconsPath("icons/");
    toolbar.loadStruct("data/toolbar.xml");
    //add content to grids
    internsGrid.setHeader("Name, Last Name, Email, Favorite Color");
    internsGrid.setColumnIds("fname,lname,email,color");
    internsGrid.setInitWidths("150,150,*,150");
    internsGrid.setColAlign("left,left,left,left");
    internsGrid.setColTypes("ro,ro,ro,ro");
    internsGrid.setColSorting("str,str,str,str");
    internsGrid.init();
    //            internsGrid.load("data/interns.php");
    internsGrid.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter");
    //create form to view/edit/save intern information
    var internForm = layout.cells("b").attachForm();
    internForm.loadStruct("data/form.xml");
    internForm.bind(internsGrid);
    //add data processor to save changes from form
    /*            var dpg = new dataProcessor("data/interns.php");
                dpg.init(internsGrid);
                dpg.attachEvent("onAfterUpdate",function(sid,action,tid,tag){ //sid is row index, tid is row id
                    if (action == "inserted"){
                        internsGrid.selectRowById(tid);
                        internForm.setFocusOnFirstActive();
                    }
                });*/
    internForm.attachEvent("onButtonClick", function (name) {
        internForm.save();
    });
    //add and delete intern functionality
    toolbar.attachEvent("onclick", function (id) {
        if (id == "newIntern") {
            var rowId = internsGrid.uid();
            var pos = internsGrid.getRowsNum();
            internsGrid.addRow(rowId, ["New intern", "", ""], pos);
        }
        else if (id == "delIntern") {
            var rowId = internsGrid.getSelectedRowId();
            var rowIndex = internsGrid.getRowIndex(rowId);
            if (rowId != null) {
                internsGrid.deleteRow(rowId);
                if (rowIndex != (internsGrid.getRowsNum() - 1)) {
                    internsGrid.selectRow(rowIndex + 1, true);
                }
                else {
                    internsGrid.selectRow(rowIndex - 1, true);
                }
            }
        }
    });
});
