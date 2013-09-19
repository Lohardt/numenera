/**
 * Harmful mutation control. Extends _MutationControlBase.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_MutationControlBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_HarmfulMutationControl.html" ],
function( declare,
          lang,
          _MutationControlBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _MutationControlBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        /**
         * Type.
         */
        type : "harmful",
        /**
         * Base text. They're all inabilities.
         */
        baseText : "Ⓘ",
        /**
         * Template.
         */
        templateString : template
    });
});