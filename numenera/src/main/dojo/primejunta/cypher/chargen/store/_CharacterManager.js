/**
 * Widget for managing a stored character.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/Button",
         "dijit/form/CheckBox",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_CharacterManager.html" ],
function( declare,
          lang,
          Button,
          CheckBox,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        /**
         * If it's just been restored, set to true.
         */
        restored : false,
        /**
         * Extra classes.
         */
        extraClasses : "",
        /**
         * Key for stored character data.
         */
        key : "",
        /**
         * Character name.
         */
        name : "",
        /**
         * Character data.
         */
        data : "",
        /**
         * Creator of the widget.
         */
        manager : {},
        /**
         * Data for the character.
         */
        character : {},
        /**
         * Template.
         */
        templateString : template,
        /**
         * Sets a special CSS class on a just-restored character.
         */
        postMixInProperties : function()
        {
            if( this.restored )
            {
                this.extraClasses = "cg-restoredCharacter";
            }
        },
        /**
         * Calls manager.loadCharacter (from _data).
         */
        loadMe : function()
        {
            this.manager.loadCharacter( this.data, this.name );
        }
    });
});