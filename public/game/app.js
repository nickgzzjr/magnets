define(['app'], function(app) {
    app.register.controller('gameCtrl', ['$scope', '$state', 'autorun',
        function($scope, $state, autorun) {
            var movie = bonsai.run(document.getElementById('movie'), {
                code: function() {
                    var magnitude = 5,
                        position = {
                            x: 400,
                            y: 200
                        },
                        redMagnet = new Group()
                        .addTo(stage)
                        .animate('500ms', {
                            x: 500,
                            y: 300
                        }, {
                            easing: 'expoIn'
                        }),
                        blueMagnet = new Group()
                        .addTo(stage)
                        .animate('500ms', {
                            x: position.x,
                            y: position.y
                        }, {
                            easing: 'expoIn'
                        })
                        .on('pointermove', function(e) {
                            this.animate('100ms', {
                                x: e.x > position.x ? position.x = position.x - magnitude : position.x = position.x + magnitude,
                                y: e.y > position.y ? position.y = position.y - magnitude : position.y = position.y + magnitude,
                            }, {
                                easing: 'expoOut'
                            })
                            if (position.x < 0 || position.x > stage.width || position.y < 0 || position.y > stage.height) {
                                stage.sendMessage('game-over', {});
                            }
                        });
                    new Circle(0, 0, 30).addTo(blueMagnet)
                    new Circle(0, 0, 10).addTo(blueMagnet).fill('#00ABEA')

                    new Circle(0, 0, 30).addTo(redMagnet)
                    new Circle(0, 0, 10).addTo(redMagnet).fill('#E9405A')
                },
                width: '100%',
                height: 400
            });
            movie.on('load', function() {
                // receive event from the runner context
                movie.on('message:game-over', function() {
                	$state.go('game-over');
                });
            });
        }
    ]);
    return app;
});
