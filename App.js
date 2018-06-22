Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items: [
        {
            xtype: 'container',
            itemId: 'exportButton'
        }],

 //   ************* My Code *******************
    launch: function() {
      this._loadMilestones();
      exportToExcel = {
                  xtype: 'rallybutton',
                  handler: this._callConfluence,
                  rtl: true,
                  iconCls: 'icon-export',
                  toolTip:'Export to Excel',
                  layout: {
                      type: 'hbox',
                      align: 'right'
                  },
                  style: {
                      float: 'right'
                  },
                  scope: this
              };
              this.down('#exportButton').add(exportToExcel);
      console.log("Inside 'Launch")
    },

    _callConfluence: function() {
        var grid = this.down('rallygrid'),
              store = grid.getStore();
             console.log("Inside confluence csll");
             console.log(store);
             console.log("Inside confluence csll2");
             console.log(store.data);
           var  items = store.data.items;
           var loop = [];
        for(var i=0; i<items.length; i++) {
          loop.push({title: items[i].data.Name, description: items[i].data.Description});
        }
        var data = JSON.stringify({array: loop});
        console.log(data);
      //  this._createConfluencePage();
    },

    _createConfluencePage : function() {
      // console.log("inside confluence page");
      // var url = "https://docops-temp.ca.com/rest/api/content";
      //
      // var data = {
      //             "type":"page",
      //             "title":"My Test Page",
      //         "space": {
      //             "key":"SEOT"
      //                   },
      //                   "body": {
      //                 "storage": {
      //                       "value":"<p>This is a new page</p>",
      //                       "representation":"storage"
      //                 }
      //         }
      // };

      // Ext.Ajax.request({
      //       url:url,
      //       method: 'POST',
      //       jsonData: data,
      //       useDefaultXhrHeader: false,
      //       withCredentials: true,
      //        headers : {
      //            'Authorization': 'Basic U2hhbmtlcjpjaGlydQ==',
      //             'Content-Type': 'application/json;charset=UTF-8',
      //        },
      //       success: function(response) {
      //             console.log("successful");
      //       },
      //       failure: function(response) {
      //             console.log("failures");
      //       }
      // });

//      console.log("outside");

    },

    _loadMilestones: function() {
      console.log("Inside 'Milestone")
      this.milestoneComboBox = Ext.create('Rally.ui.combobox.MilestoneComboBox',{
            fieldLabel: 'Milestone',
            hideLabel: false,
            labelAlign: 'right',
            listeners: {
                  ready: function(combobox) {
                        this._loadData();
                  },

                        select: function(combobox, records) {
                        this._loadData();
                  },
            //    success: this._onStoreBuilt,
                  scope: this
            }
        });
      this.add(this.milestoneComboBox);
    },

    //Get data from rally
    _loadData: function() {
      console.log("Inside Load")
      var selectedMilestone = this.milestoneComboBox.getRecord().get('_ref');
      //console.log("Selected Milestone", selectedMilestone);
      var defectfilters = [
          {
            property: 'Milestones',
            operator: '=',
            value: selectedMilestone
            },
           {
              property: 'AffectsDoc',
              operator: '=',
              value: 'true'
           }
        ];

      if(this.defectStore){
            this.defectStore.setFilter(defectfilters);
            this.defectStore.load();
      }
      else {
      this.defectStore =  Ext.create('Rally.data.wsapi.Store', {
      model: 'Defect',
      autoLoad: true,
        filters: defectfilters,
      listeners: {
              load: function(mystore, mydata, success) {
              if(!this.myGrid) {
              this._createGrid(mystore);
              }
              },
                scope:this
      },
      fetch: ['FormattedID', 'Name', 'Description', 'AffectsDoc']
      });
      console.log("Store Data :",this.defectStore);
      }
    },

    //Show the data fetched in a grid
    _createGrid: function(myDefectStore) {
      console.log("Inside 'Grid")
      this.myGrid = Ext.create('Rally.ui.grid.Grid', {
                  store: myDefectStore,
                  columnCfgs: [
                        'FormattedID', 'Name', 'Description', 'AffectsDoc'
                  ]
        });
     console.log('my grid', this.myGrid);
     this.add(this.myGrid);
    },
});
