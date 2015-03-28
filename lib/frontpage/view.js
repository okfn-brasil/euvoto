/**
 * Module dependencies.
 */

var page = require('page');
var template = require('./template');
var t = require('t');
var View = require('view');

/**
 * Expose CustomView
 */

module.exports = Frontpage;

/**
 * Creates a Frontpage
 * domifies the template inside `this.el`
 */

function Frontpage() {
  if (!(this instanceof Frontpage)) {
    return new Frontpage();
  };

  View.call(this, template);
}

/**
 * Inherit from `View`
 */

View(Frontpage);
