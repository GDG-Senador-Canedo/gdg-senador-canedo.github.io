angular.module('gdgXBoomerang')
    .factory('Config', function () {
        return {
            // TODO Modify these to configure your app
            'name': 'GDG Senador Canedo',
            'id': '102698524984620076019',
            'googleApi': 'AIzaSyA-VxjbVX8RK1z_p8jlGNYVlxRIvaqmIVI',
            'pwaId': '6209875710450058305', // Picasa Web Album id, must belong to Google+ id above
            'domain': 'http://www.gdgsenadorcanedo.org',
            'twitter': 'gdgscanedo',
            'facebook': 'gdgsenadorcanedo',
            'meetup': 'pt/GDG-Senador-Canedo-meetup',
            // Change to 'EEEE, MMMM d, y - H:mm' for 24 hour time format.
            'dateFormat': 'EEEE, MMMM d, y - H:mm',
            'cover': {
                title: 'Eventos GDG através do mundo',
                subtitle: 'Eventos organizados por diversos GDGS',
                button: {
                    text: 'Procure um evento GDG',
                    url: 'http://gdg.events/'
                }
            },
            'activities': {
                techTalks: true,
                codeLabs: true,
                hackathons: true,
                devFests: true,
                appClinics: true,
                panels: true,
                designSprints: true,
                roundTables: true
            }
            // To update the snippet which is used for sharing, see the TODO in the index.html.
        };
    });
