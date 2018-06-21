// defines a class named CustomApp that extends the App SDK base class (Rally.app.App) and creates a stub launch method
Ext.define('CustomApp', {
   // extend app from Rally.app.App
    extend: 'Rally.app.App',
    componentCls: 'app',
    // A stub is a small program routine that substitutes for a longer program, possibly to be loaded later or that is located remotely.
    launch: function() {
      // The app itself is a container, and calling this.add adds components
      // to the container.
      this.add({
          // The xtype is a shorthand way of specifying what type of component you want to add.
          xtype: 'rallymilestonecombobox',
          // An itemId can be used as an alternative way to get a reference to
          // a component when no object reference is available
          itemId: 'milestoneComboBox',
          // The label for the field
          fieldLabel: 'Filter by MileStone',
          hideLabel: false,
          labelSeparator: ':',
          listeners: {
              // event listeners executes on select value in dopdown
              select: this._onSelect,
              // event listeners excutes on page ready
              ready: this._onLoad,
              // this is the scope (this reference) in which the handler function is executed.
              scope: this
          },
          defaultSelectionPosition: '',
      });
    },
    _onLoad: function() {
          this.add({
              xtype: 'rallygrid',
              // column configs string to use the default renderer for the type
              columnCfgs: [
                  'FormattedID',
                  'Name',
                  'Description',
                  'AffectsDoc'
              ],
              // Current application context object (user, workspace, project, scoping, etc.)
              context: this.getContext(),
              // add filter params to the store.
              storeConfig: {
                  model: 'defect',
                  filters: this._getMilestoneFilter(),
              }
          });
      },

      _getMilestoneFilter: function() {
         // send values to filter
          return [
            {
              property: 'Milestones',
              operator: '=',
              value: this.down('#milestoneComboBox').getValue()
          },
          {
            property: 'AffectsDoc',
            operator: '=',
            value: 'true'
          }
        ];
      },

      _onSelect: function() {
        // The up and down methods are used to traverse the component tree.
          var grid = this.down('rallygrid'),
        //
          store = grid.getStore();
        //
          store.clearFilter(true);
          store.filter(this._getMilestoneFilter());
      }
    //  AFFECTS DOCUMENTATION
});
