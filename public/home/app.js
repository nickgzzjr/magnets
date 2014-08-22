define(['app'], function(app) {
    // Declare Meteor Collection client side
    var messages = new Meteor.Collection('messages');
    app.register.controller('homeCtrl', ['$scope', 'autorun',
        function($scope, autorun) {
            
        }
    ]);
    return app;
});
