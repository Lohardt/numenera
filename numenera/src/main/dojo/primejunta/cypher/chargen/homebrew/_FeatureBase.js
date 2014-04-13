define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/layout/TabContainer",
         "./_ModuleContainer",
         "primejunta/storage/Store",
         "primejunta/ui/util" ],
function( declare,
          lang,
          TabContainer,
          _ModuleContainer,
          Store,
          util )
{
    return declare([ TabContainer ], {
        DATA_STORE_NAME : "_CG_HOMEBREW_STORE",
        featureLabel : "",
        data : [],
        tabPosition : "top",
        nested : false,
        "class" : "cg-nestedTabs cg-leftTabs",
        has_stats : true,
        stat_constraints : {
            min : -9,
            max : 9,
            pattern : "+0;-0"
        },
        buildRendering : function()
        {
            this.inherited( arguments );
        },
        postCreate : function()
        {
            this.inherited( arguments );
            this.storage = new Store( this.DATA_STORE_NAME );
            this.getData();
            this.renderModules();
        },
        renderModules : function()
        {
            for( var o in this.data )
            {
                var _context = this.data[ o ].recursion ? this.data[ o ].recursion : this.data[ o ].origin;
                var _title = util.prettify( _context );
                var mc = new _ModuleContainer({ storage : this.storage, featureLabel : this.featureLabel, context : _context, title : _title, data : this.data[ o ], has_stats : this.has_stats, stat_constraints : this.stat_constraints });
                this.addChild( mc );
            }
        },
        getData : function()
        {
            var _stored = this.storage.getItems( this.featureLabel.toUpperCase() );
            for( var o in _stored )
            {
                var _keys = o.split( "/" );
                // {word},{context},{oid}, can ignore {word} because we requested filtering by it
                if( !this.data[ _keys[ 1 ] ] )
                {
                    this.data[ _keys[ 1 ] ] = {
                        // TODO: populate the object with the required fields,
                        payload_data : {}
                    }
                }
                this.data[ _keys[ 1 ] ].payload_data[ _keys[ 2 ] ] = _stored[ o ];
            }
        }
    });
});