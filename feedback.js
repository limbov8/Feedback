/**
 * Google Analytics Feedback Widget
 * Version 1.0.6 by Xavi Esteve
 * http://xaviesteve.com
 * Version 1.1 by Libo Liu
 */
var Namespace = Namespace || {};
(function(e, t) {
    "use strict";
    t.gaf = {
        init: function(e) {
            this.options = e;
            this.loadHtml();
            this.loadButton()
        },
        loadHtml: function() {
            this.buttonHtml = '<a id="gaf-button" style="" href="#">' + this.options.open + "</a>";
            this.dialogHtml = '<div id="gaf-dialog"><h5>' + this.options.title 
                            + '</h5><a id="gaf-dialog-close" href="#">&times;</a>' 
                            + '<label class="gaf-text-label" for="gaf-text-1">' + this.options.question1 + '</label>'
                            + '<input id="gaf-text-1" class="gaf-text" type="text" maxlength="500">' 
                            + '<label class="gaf-text-label" for="gaf-text-2">' + this.options.question2 + '</label>'
                            + '<input id="gaf-text-2" class="gaf-text" type="text" maxlength="500">' 
                            + '<a id="gaf-submit" href="#">' 
                            + this.options.send + "</a>"
        },
        loadButton: function() {
            e.body.innerHTML += this.buttonHtml;
            e.getElementById("gaf-button").addEventListener("click", function(e) {
                t.gaf.loadDialog();
                e.preventDefault()
            }, !1)
        },
        loadDialog: function() {
            e.getElementById("gaf-button").removeEventListener("click", function() {}, !1);
            e.body.removeChild(e.getElementById("gaf-button"));
            e.body.innerHTML += this.dialogHtml;
            e.getElementById("gaf-text-1").focus();
            e.getElementById("gaf-dialog-close").addEventListener("click", function(e) {
                t.gaf.closeDialog();
                e.preventDefault()
            }, !1);
            e.getElementById("gaf-submit").addEventListener("click", function(e) {
                t.gaf.sendFeedback();
                e.preventDefault()
            }, !1)
        },
        closeDialog: function() {
            e.getElementById("gaf-dialog-close").removeEventListener("click", function() {}, !1);
            e.getElementById("gaf-submit").removeEventListener("click", function() {}, !1);
            e.body.removeChild(e.getElementById("gaf-dialog"));
            this.loadButton()
        },
        sendFeedback: function() {
            if (e.getElementById("gaf-text-1").value.trim().length < 1) {
                document.getElementById("gaf-text-1").style.border = "2px solid #c00";
                e.getElementById("gaf-text-1").focus();
                return !1
            }
            window.ga("send", {
                hitType: "event",
                eventCategory: this.options.eventCategory,
                eventAction: "Question1: " + this.options.question1,
                eventLabel: e.getElementById("gaf-text-1").value,
                eventValue: 1
            });
            if (e.getElementById("gaf-text-2").value.trim().length > 0) {
                window.ga("send", {
                    hitType: "event",
                    eventCategory: this.options.eventCategory,
                    eventAction: "Question2: " + this.options.question2,
                    eventLabel: e.getElementById("gaf-text-2").value,
                    eventValue: 1
                });
            }
            
            alert(this.options.thankyou);
            this.closeDialog()
        }
    }
})(document, Namespace);