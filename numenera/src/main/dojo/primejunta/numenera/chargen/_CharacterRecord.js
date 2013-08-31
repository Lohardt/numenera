define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_CharacterRecord.html" ],
function( declare,
          lang,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        TRAINED_STR : "Ⓣ",
        SPECIALIZED_STR: "<span class=\"cg-specialized\">Ⓢ</span>",
        iconSource : require.toUrl( "primejunta/numenera/chargen/themes/images" ),
        manager : {},
        templateString : template,
        postCreate : function()
        {
            window.scroll( 0, 0 );
            this._sv( "name_field", "characterNameInput" );
            this._sv( "descriptor_field", "descriptorSelect", 1 );
            this._sv( "type_field", "typeSelect", 1 );
            this._sv( "focus_field", "focusSelect", 1 );
            this._sv( "character_tier", "character_tier" );
            this._sv( "character_effort", "character_effort" );
            this._sv( "might_pool", "might_pool" );
            this._sv( "might_edge", "might_edge" );
            this._sv( "speed_pool", "speed_pool" );
            this._sv( "speed_edge", "speed_edge" );
            this._sv( "intellect_pool", "intellect_pool" );
            this._sv( "intellect_edge", "intellect_edge" );
            this._sv( "recovery_roll", "recovery_roll" );
            this._sv( "cypher_count", "cypher_count" );
            this._sv( "shin_count", "shin_count" );
            this._st( "description_text", this._getDescriptionText() );
            this._st( "armor_value", this._getArmorValue() );
            this._wl( "attack_list", this._getAttackList() );
            this._wl( "ability_list", this._getSkillList() );
            this._wl( "special_list", this._listAsText( "special_list") );
            this._wl( "cypher_list", this._listAsText( "cypher_list") );
            this._wl( "equipment_list", this._listAsText( "equipment_list") );
            this._wl( "notes_list", this._listAsText( "reference_list" ) );
        },
        closeMe : function()
        {
            this.manager.domNode.style.display = "block";
            this.destroy();
        },
        _getDescriptionText : function()
        {
            var dt = this.manager.description_text.get( "value" );
            dt = dt.split( "\n" );
            dt = dt.join( "<br/>" );
            return dt;
        },
        _getSkillList : function()
        {
            var list = this._listAsText( "ability_list" );
            list.sort();
            if( list.length < 2 )
            {
                return list;
            }
            var out = [];
            out.push( list[ 0 ] );
            for( var i = 1; i < list.length; i++ )
            {
                if( list[ i ].toLowerCase() == list[ i - 1 ].toLowerCase() && list[ i ].indexOf( this.TRAINED_STR ) != -1 )
                {
                    var cur = out[ out.length - 1 ];
                    out[ out.length - 1 ] = this.SPECIALIZED_STR + cur.substring( cur.indexOf( this.TRAINED_STR ) + this.TRAINED_STR.length ) + "</span>";
                }
                else
                {
                    out.push( list[ i ] );
                }
            }
            out.sort();
            return out;
        },
        _getAttackList : function()
        {
            var eq = this._listAsText( "equipment_list" );
            var out = [];
            for( var i = 0; i < eq.length; i++ )
            {
                if( eq[ i ].indexOf( "Light Weapon" ) != -1 )
                {
                    eq[ i ] += " (2)";
                }
                else if( eq[ i ].indexOf( "Medium Weapon" ) != -1  )
                {
                    eq[ i ] += " (4)";
                }
                else if( eq[ i ].indexOf( "Heavy Weapon" ) != -1  )
                {
                    eq[ i ] += " (6)";
                }
                if( eq[ i ].indexOf( "Weapon" ) != -1 )
                {
                    out.push( eq[ i ] );
                }
            }
            return out;
        },
        _getArmorValue : function()
        {
            var base = parseInt( this._gf( "armor_bonus" ) );
            var eq = this._listAsText( "equipment_list" ).join( "," ).toLowerCase();
            if( eq.indexOf( "heavy armor" ) != -1 )
            {
                base += 3;
            }
            else if( eq.indexOf( "medium armor" ) != -1 )
            {
                base += 2;
            }
            else if( eq.indexOf( "light armor" ) != -1 )
            {
                base += 1;
            }
            eq = this._listAsText( "special_list" ).join( "," ).toLowerCase();
            if( eq.indexOf( "ward (+1 armor)" ) != -1 )
            {
                base += 1;
            }
            return base;
        },
        _listAsText : function( list )
        {
            return this.manager.listAsText( list );
        },
        _wl : function( to, list )
        {
            var out = "";
            while( list.length > 0 )
            {
                out += list.shift() + "<br/>";
            }
            this[ to ].innerHTML = out;
        },
        _gf : function( fld )
        {
            if( !this.manager[ fld ] )
            {
                return false;
            }
            return this.manager[ fld ].value;
        },
        _gs : function( sel )
        {
            return this.manager._selVal( this.manager[ sel ] ).label;
        },
        _sv : function( to, from, sel )
        {
            this[ to ].innerHTML = sel ? this._gs( from ) : this._gf( from );
        },
        _st : function( to, val )
        {
            this[ to ].innerHTML = val;
        }
    });
});