Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
      this.milestoneCombobox = this.add({
           xtype: 'rallymilestonecombobox',
           listeners: {
               ready: this._onMilestoneComboboxLoad,
               select: this._onMilestoneComboboxChanged,
               scope: this
           }
       });
    },
   _onMilestoneComboboxLoad: function() {
      var rallyGridConfig = {
      xtype: 'rallygrid',
      context: this.getContext(),
      columnCfgs: [
        'FormattedID',
        'Name',
        'State',
        'Priority',
        'Severity',
        'Milestone'
      ],
      types: ['Defect'],
      attribute: 'MileStone',
      storeConfig: {
          filters: [this.milestoneCombobox.getQueryFromSelected()]
      }
    };
    this.rallyGrid = this.add(rallyGridConfig);
  },
  _onMilestoneComboboxChanged: function() {
    var config = {
      storeConfig: {
          filters: [this.milestoneCombobox.getQueryFromSelected()]
        }
      };
    this.rallyGrid.refresh(config);
  }
    //  AFFECTS DOCUMENTATION
});
