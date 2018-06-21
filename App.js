Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
      this.add({
          xtype: 'rallymilestonecombobox',
          itemId: 'milestoneComboBox',
          fieldLabel: 'Filter by MileStone:',
          model: 'Defect',
          field: 'Milestones',
          listeners: {
              select: this._onSelect,
              ready: this._onLoad,
              scope: this
          }
      });
    },
    _onLoad: function() {
      console.log(this._getMilestoneFilter());
          this.add({
              xtype: 'rallygrid',
              columnCfgs: [
                  'FormattedID',
                  'Name',
                  'Description',
                  'AffectsDoc'
              ],
              context: this.getContext(),
              storeConfig: {
                  model: 'defect',
                  filters: [
                    this._getMilestoneFilter(),
                  ]
              }
          });
      },

      _getMilestoneFilter: function() {
          return [{
              property: 'Milestones',
              operator: '=',
              value: this.down('#milestoneComboBox').getValue()
          },
          {
            property: 'AffectsDoc',
            operator: '=',
            value: 'true'
          }]
          ;
      },

      _onSelect: function() {
          var grid = this.down('rallygrid'),
              store = grid.getStore();

          store.clearFilter(true);
          store.filter(this._getMilestoneFilter());
      }
    //  AFFECTS DOCUMENTATION
});
