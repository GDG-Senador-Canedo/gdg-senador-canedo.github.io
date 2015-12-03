angular.module('gdgXBoomerang', ['ngRoute', 'ngSanitize', 'ngAria', 'ngAnimate', 'ngMaterial'])
.controller('MainController', function ($rootScope, $mdMedia, $mdSidenav, Config, NavService) {
    var mc = this;
    mc.chapterName = Config.name;
    mc.googlePlusLink = 'https://plus.google.com/' + Config.id;
    mc.gdgLink = 'https://developers.google.com/groups/chapter/' + Config.id + '/';
    mc.twitterLink = Config.twitter ? 'https://twitter.com/' + Config.twitter : null;
    mc.facebookLink = Config.facebook ? 'https://www.facebook.com/' + Config.facebook : null;
    mc.meetupLink = Config.meetup ? 'http://www.meetup.com/' + Config.meetup : null;
    $rootScope.$mdMedia = $mdMedia;
    $rootScope.$mdSidenav = $mdSidenav;
    $rootScope.canonical = Config.domain;

    NavService.registerNavListener(function (tab) {
        mc.navTab = tab;
    });
});

angular.module('gdgXBoomerang')
.config(function ($routeProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider.
        when('/about', {templateUrl: 'app/about/about.html', controller: 'AboutController', controllerAs: 'vm'}).
        when('/news', {templateUrl: 'app/news/news.html', controller: 'NewsController', controllerAs: 'vm'}).
        when('/events', {templateUrl: 'app/events/events.html', controller: 'EventsController', controllerAs: 'vm'}).
        when('/photos', {templateUrl: 'app/photos/photos.html', controller: 'PhotosController', controllerAs: 'vm'}).
        when('/activities', {templateUrl: 'app/activities/activities.html',
            controller: 'ActivitiesController', controllerAs: 'vm'}).
        when('/organizers', {templateUrl: 'app/organizers/organizers.html',
            controller: 'OrganizersController', controllerAs: 'vm'}).
        otherwise({ redirectTo: '/about' });

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('green', {
            'default': 'A700'
        });

    $mdIconProvider.fontSet('fa', 'fontawesome');
});

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

angular.module('gdgXBoomerang')
.factory('NavService', function () {
    var navTab = '0';
    var navListener;

    return {
        setNavTab: setNavTab,
        getNavTab: getNavTab,
        registerNavListener: registerNavListener
    };

    function setNavTab(tabValue) {
        navTab = tabValue;
        if (navListener) {
            navListener(navTab);
        }
    }

    function getNavTab() {
        return navTab;
    }

    function registerNavListener(listenerToRegister) {
        navListener = listenerToRegister;
    }
});

angular.module('gdgXBoomerang')
.controller('ActivitiesController', function (Config, NavService) {
    var vm = this;
    vm.loading = false;
    NavService.setNavTab(3);
    vm.activities = [];

    var activityList = {
        techTalks: {
            name: 'Palestras',
            description: 'As palestras são apresentadas por especialistas técnicos que abramgem um amplo ' +
            'conhecimento em tecnologias e áreas afins.',
            color: 'purple',
            icon: '/app/images/icons/ic_mic_48px.svg'
        },
        roundTables: {
            name: 'Mesa redonda',
            description: 'Evento informal onde todos da comunidade podem participar e dar suas opniões.',
            color: 'darkBlue',
            icon: '/app/images/icons/ic_local_pizza_48px.svg'
        },
        codeLabs: {
            name: 'Code Labs',
            description: 'Este tipo de evento é preparado para fornecer instruções passo-a-passo de uma determinada ' +
            'tecnologia, é utilizado em introduções em novas tecnologias e maximizar o aprendizado prático',
            color: 'green',
            icon: '/app/images/icons/ic_code_48px.svg'
        },
        devFests: {
            name: 'Dev Fests',
            description: 'GDG Dev Fests são grades eventos, onde reunimos uma grande quantidade de pessoas ' +
            'interessadas em tecnologias e são realizados palestras, codelabs, hackatons e muito mais...',
            color: 'deepBlue',
            icon: '/app/images/icons/ic_event_48px.svg'
        },
        appClinics: {
            name: 'App Clinics',
            description: 'Estes eventos voltado para comunidade que procura reunir desenvolvedores, desings, ' +
            'testers e especialistas em usabilidade para avaliar aplicativos específicos com foco na ' +
            'crítica construtiva, resolução de problemas e colaboração',
            color: 'yellow',
            icon: '/app/images/icons/ic_local_hospital_48px.svg'
        },
        panels: {
            name: 'Panels',
            description: 'Este evento reune vários especialistas sobre um determinado tópico, e são realizados ' +
            'palestras, debates, mesas redondas tudo com interação da plateia.',
            color: 'lightPurple',
            icon: '/app/images/icons/ic_people_48px.svg'
        },
        hackathons: {
            name: 'Hackathons',
            description: 'Este evento envolve uma competição de código, onde o participante colabora intensivamente ' +
            'em um projeto especifico ou desafios.Muitas veses os participantes possuiem tempo e ganhadores ' +
            'recebem premios',
            color: 'red',
            icon: '/app/images/icons/ic_timer_48px.svg'
        },
        designSprints: {
            name: 'Design Sprints',
            description: 'Evento com foco em Brainstorming colaborativos e intensos, onde o desing do produto é ' +
            'fundamental, iterar através das diversas fases: entendimento, esboço, decisão, prototipo e testes',
            color: 'pink',
            icon: '/app/images/icons/ic_directions_run_48px.svg'
        }
    };

    if (Config.activities.techTalks) {
        vm.activities.push(activityList.techTalks);
    }
    if (Config.activities.roundTables) {
        vm.activities.push(activityList.roundTables);
    }
    if (Config.activities.codeLabs) {
        vm.activities.push(activityList.codeLabs);
    }
    if (Config.activities.devFests) {
        vm.activities.push(activityList.devFests);
    }
    if (Config.activities.appClinics) {
        vm.activities.push(activityList.appClinics);
    }
    if (Config.activities.panels) {
        vm.activities.push(activityList.panels);
    }
    if (Config.activities.hackathons) {
        vm.activities.push(activityList.hackathons);
    }
    if (Config.activities.designSprints) {
        vm.activities.push(activityList.designSprints);
    }
});

angular.module('gdgXBoomerang')
.controller('AboutController', function ($http, $sce, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(0);
    vm.cover = Config.cover;

    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
            '?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key=' + Config.googleApi).
        success(function (data) {
            vm.desc = data.aboutMe;
            $sce.trustAsHtml(vm.desc);

            if (data.cover && data.cover.coverPhoto.url) {
                vm.cover.url = data.cover.coverPhoto.url;
            }
            vm.loading = false;
            vm.status = 'ready';
        })
        .error(function (error) {
            vm.desc = 'Sorry, we failed to retrieve the About text from the Google+ API.';
            vm.loading = false;
            vm.status = 'ready';
        });
});

angular.module('gdgXBoomerang')
.controller('EventsController', function ($http, $log, $filter, Config, NavService) {
    var vm = this;
    NavService.setNavTab(2);
    vm.chapterName = Config.name;
    vm.loading = true;
    vm.dateFormat = Config.dateFormat;
    vm.events = { past:[], future:[] };

    var url = 'https://hub.gdgx.io/api/v1/chapters/' + Config.id + '/events/upcoming?callback=JSON_CALLBACK';
    var headers = { 'headers': { 'Accept': 'application/json;' }, 'timeout': 2000 };
    $http.jsonp(url, headers)
        .success(function (data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                if (data.items[i].about) {
                    data.items[i].about =
                        data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                } else {
                    data.items[i].about = '';
                }
                vm.events.future.push(data.items[i]);
            }
            vm.events.future = $filter('orderBy')(vm.events.future, 'start', false);
            vm.loading = false;
            vm.status = 'ready';
        })
        .error(function (response) {
            vm.upcomingError = 'Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API.';
            vm.loading = false;
            vm.status = 'ready';
            $log.debug('Sorry, we failed to retrieve the upcoming events from the GDG-X Hub API: ' + response);
        });

    var getPastEventsPage = function(page) {
        var url = 'https://hub.gdgx.io/api/v1/chapters/' + Config.id +
            '/events/past?callback=JSON_CALLBACK&page=' + page;
        var headers = { 'headers': {'Accept': 'application/json;'}, 'timeout': 2000 };
        $http.jsonp(url, headers)
            .success(function (data) {
                var i;
                for (i = data.items.length - 1; i >= 0; i--) {
                    if (data.items[i].about) {
                        data.items[i].about =
                            data.items[i].about.replace(/<br\s*\/?><br\s*\/?><br\s*\/?><br\s*\/?>/g, '<br><br>');
                    } else {
                        data.items[i].about = '';
                    }
                    vm.events.past.push(data.items[i]);
                }
                if (data.pages === page) {
                    vm.events.past = $filter('orderBy')(vm.events.past, 'start', true);
                    vm.loading = false;
                    vm.status = 'ready';
                } else {
                    getPastEventsPage(page + 1);
                }
            })
            .error(function (response) {
                vm.pastError = 'Sorry, we failed to retrieve the past events from the GDG-X Hub API.';
                vm.loading = false;
                vm.status = 'ready';
                $log.debug('Sorry, we failed to retrieve the past events from the GDG-X Hub API: ' + response);
            });
    };
    getPastEventsPage(1);
});

// Google+ hashtag linky from http://plnkr.co/edit/IEpLfZ8gO2B9mJcTKuWY?p=preview
angular.module('gdgXBoomerang')
.filter('hashLinky', function() {
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var linkifiedDOM = document.createElement('div');
    var inputDOM = document.createElement('div');

    return function(input) {
        inputDOM.innerHTML = input;
        return hashLinky(inputDOM).innerHTML;
    };

    function hashLinky(startNode) {
        var i, currentNode;
        for (i = 0; i < startNode.childNodes.length; i++) {
            currentNode = startNode.childNodes[i];

            switch (currentNode.nodeType) {
                case ELEMENT_NODE:
                    hashLinky(currentNode);
                    break;
                case TEXT_NODE:
                    var hashtagRegex = /#([A-Za-z0-9-_]+)/g;
                    currentNode.textContent =  currentNode.textContent.replace(hashtagRegex,
                        '<a href="https://plus.google.com/s/%23$1" target="_blank">#$1</a>');

                    linkifiedDOM.innerHTML = currentNode.textContent;
                    i += linkifiedDOM.childNodes.length - 1;

                    while (linkifiedDOM.childNodes.length) {
                        startNode.insertBefore(linkifiedDOM.childNodes[0], currentNode);
                    }
                    startNode.removeChild(currentNode);
            }
        }
        return startNode;
    }
});

// HTML-ified linky from http://plnkr.co/edit/IEpLfZ8gO2B9mJcTKuWY?p=preview
angular.module('gdgXBoomerang')
.filter('htmlLinky', function($filter) {
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3;
    var linkifiedDOM = document.createElement('div');
    var inputDOM = document.createElement('div');

    return function(input) {
        inputDOM.innerHTML = input;
        return linkify(inputDOM).innerHTML;
    };

    function linkify(startNode) {
        var i, currentNode;
        for (i = 0; i < startNode.childNodes.length; i++) {
            currentNode = startNode.childNodes[i];

            switch (currentNode.nodeType) {
                case ELEMENT_NODE:
                    linkify(currentNode);
                    break;
                case TEXT_NODE:
                    linkifiedDOM.innerHTML = $filter('linky')(currentNode.textContent, '_blank');
                    i += linkifiedDOM.childNodes.length - 1;

                    while (linkifiedDOM.childNodes.length) {
                        startNode.insertBefore(linkifiedDOM.childNodes[0], currentNode);
                    }

                    startNode.removeChild(currentNode);
            }
        }
        return startNode;
    }
});

(function () {

    'use strict';
    angular.module('ngLocale', [], ['$provide', function ($provide) {
        var PLURAL_CATEGORY = {ZERO: 'zero', ONE: 'one', TWO: 'two', FEW: 'few', MANY: 'many', OTHER: 'other'};
        $provide.value('$locale', {
            'DATETIME_FORMATS': {
                'AMPMS': [
                    'AM',
                    'PM'
                ],
                'DAY': [
                    'domingo',
                    'segunda-feira',
                    'ter\u00e7a-feira',
                    'quarta-feira',
                    'quinta-feira',
                    'sexta-feira',
                    's\u00e1bado'
                ],
                'ERANAMES': [
                    'Antes de Cristo',
                    'Ano do Senhor'
                ],
                'ERAS': [
                    'a.C.',
                    'd.C.'
                ],
                'FIRSTDAYOFWEEK': 6,
                'MONTH': [
                    'janeiro',
                    'fevereiro',
                    'mar\u00e7o',
                    'abril',
                    'maio',
                    'junho',
                    'julho',
                    'agosto',
                    'setembro',
                    'outubro',
                    'novembro',
                    'dezembro'
                ],
                'SHORTDAY': [
                    'dom',
                    'seg',
                    'ter',
                    'qua',
                    'qui',
                    'sex',
                    's\u00e1b'
                ],
                'SHORTMONTH': [
                    'jan',
                    'fev',
                    'mar',
                    'abr',
                    'mai',
                    'jun',
                    'jul',
                    'ago',
                    'set',
                    'out',
                    'nov',
                    'dez'
                ],
                'WEEKENDRANGE': [
                    5,
                    6
                ],
                'fullDate': 'EEEE, d, MMMM, y',
                'longDate': 'd, MMMM, y',
                'medium': 'd, MMM, y HH:mm:ss',
                'mediumDate': 'd, MMM, y',
                'mediumTime': 'HH:mm:ss',
                'short': 'dd/MM/yy HH:mm',
                'shortDate': 'dd/MM/yy',
                'shortTime': 'HH:mm'
            },
            'NUMBER_FORMATS': {
                'CURRENCY_SYM': 'R$',
                'DECIMAL_SEP': ',',
                'GROUP_SEP': '.',
                'PATTERNS': [
                    {
                        'gSize': 3,
                        'lgSize': 3,
                        'maxFrac': 3,
                        'minFrac': 0,
                        'minInt': 1,
                        'negPre': '-',
                        'negSuf': '',
                        'posPre': '',
                        'posSuf': ''
                    },
                    {
                        'gSize': 3,
                        'lgSize': 3,
                        'maxFrac': 2,
                        'minFrac': 2,
                        'minInt': 1,
                        'negPre': '-\u00a4',
                        'negSuf': '',
                        'posPre': '\u00a4',
                        'posSuf': ''
                    }
                ]
            },
            'id': 'pt-br',
            'pluralCat': function (n, optPrecision) {
                if (n >= 0 && n <= 2 && n !== 2) {
                    return PLURAL_CATEGORY.ONE;
                }
                return PLURAL_CATEGORY.OTHER;
            }
        });
    }]);
})();

angular.module('gdgXBoomerang')
.controller('NewsController', function ($http, $timeout, $filter, $log, $sce, Config, NavService) {
    var vm = this;
    NavService.setNavTab(1);
    vm.loading = true;
    vm.chapterName = Config.name;

    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id +
        '/activities/public?callback=JSON_CALLBACK&maxResults=20&key=' + Config.googleApi)
        .success(function (response) {
            var entries = [], i;
            var item, actor, object, itemTitle, html;
            var published, actorImage, entry;

            if (!response.items) {
                handleError('Response from server contained no news items.');
                return;
            }

            for (i = 0; i < response.items.length; i++) {
                item = response.items[i];
                actor = item.actor || {};
                object = item.object || {};
                itemTitle = object.content;
                published = $filter('date')(new Date(item.published), 'fullDate');
                html = [];

                html.push(itemTitle.replace(new RegExp('\n', 'g'), '<br />').replace('<br><br>', '<br />'));
                html = html.join('');
                html = $sce.trustAsHtml(html);

                actorImage = actor.image.url;
                actorImage = actorImage.substr(0, actorImage.length - 2) + '16';

                entry = {
                    via: {
                        name: 'Google+',
                        url: item.url
                    },
                    published: published,
                    body: html,
                    date: item.updated,
                    reshares: (object.resharers || {}).totalItems,
                    plusones: (object.plusoners || {}).totalItems,
                    comments: (object.replies || {}).totalItems,
                    icon: actorImage,
                    item: item,
                    object: object
                };

                entries.push(entry);
            }
            vm.news = $filter('orderBy')(entries, 'date', true);
            $timeout(function () {
                gapi.plusone.go();
            });
            vm.loading = false;
            vm.status = 'ready';
        })
        .error(handleError);

    function handleError(error) {
        vm.desc = 'Sorry, we failed to retrieve the news from the Google+ API.';
        vm.loading = false;
        vm.status = 'ready';
        $log.debug('Sorry, we failed to retrieve the news from the Google+ API: ' + error);
    }
});

angular.module('gdgXBoomerang')
.controller('OrganizersController', function ($http, Config, NavService) {
    var vm = this;
    vm.loading = false;
    NavService.setNavTab(4);

    var url = 'https://hub.gdgx.io/api/v1/chapters/' + Config.id + '?callback=JSON_CALLBACK';
    var headers = { 'headers': { 'Accept': 'application/json;' }, 'timeout': 2000 };
    $http.jsonp(url, headers).success(function (data) {
        if (data.organizers) {
            vm.organizers = data.organizers;
        }
    });
});

angular.module('gdgXBoomerang')
.controller('PhotosController', function ($http, Config, NavService) {
    var vm = this;
    vm.loading = true;
    NavService.setNavTab(5);
    vm.chapterName = Config.name;
    vm.photos = [];

    var pwa = 'https://picasaweb.google.com/data/feed/api/user/' + Config.id + '/albumid/' + Config.pwaId +
        '?access=public&alt=json-in-script&kind=photo&max-results=50&' +
        'fields=entry(title,link/@href,summary,content/@src)&v=2.0&callback=JSON_CALLBACK';

    $http.jsonp(pwa).
        success(function (data) {
            var photoList = data.feed.entry;
            var i;
            if (photoList) {
                // Use reverse ordering newest first
                for (i = photoList.length - 1; i >= 0; i--) {
                    var photo = {
                        link: photoList[i].link[2].href,
                        src: photoList[i].content.src,
                        alt: photoList[i].title.$t,
                        title: photoList[i].summary.$t
                    };
                    vm.photos.push(photo);
                }
            }
            vm.loading = false;
        })
        .error(function () {
            vm.errorMsg = 'Sorry, we failed to retrieve the photos from the Picasa Web Albums API. ' +
                'Logging out of your Google Account and logging back in may resolve this issue.';
            vm.loading = false;
        });
});

angular.module('gdgXBoomerang')
.directive('gplusAlbum', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusAlbum.html'
    };
});

angular.module('gdgXBoomerang')
.directive('gplusArticle', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusArticle.html'
    };
});

angular.module('gdgXBoomerang')
.directive('gplusEvent', function () {
    return {
        scope: { article: '=' },
        templateUrl: '/app/news/components/gplusEvent.html'
    };
});

angular.module('gdgXBoomerang')
.directive('gplusNoAttachments', function () {
    return {
        scope: { article: '=' },
        templateUrl: '/app/news/components/gplusNoAttachments.html'
    };
});

angular.module('gdgXBoomerang')
.directive('gplusPhotoVideo', function () {
    return {
        scope: {
            article: '=',
            attachment: '='
        },
        templateUrl: '/app/news/components/gplusPhotoVideo.html'
    };
});

angular.module('gdgXBoomerang')
.directive('gplusPostContent', function () {
    return {
        transclude: true,
        templateUrl: '/app/news/components/gplusPostContent.html'
    };
});

angular.module('gdgXBoomerang')
.directive('gplusPostImage', function () {
    return {
        templateUrl: '/app/news/components/gplusPostImage.html'
    };
});

angular.module('gdgXBoomerang')
.directive('gplusPostVideo', function ($sce) {
    return {
        link: function (scope, element) {
            scope.videoUrl = $sce.trustAsResourceUrl(scope.attachment.embed.url);
            scope.getDynamicHeight = function () {
                return (element.prop('clientWidth') * 0.6) + 'px';
            };
        },
        templateUrl: '/app/news/components/gplusPostVideo.html'
    };
});

angular.module('gdgXBoomerang')
.directive('newsItemFooter', function () {
    return {
        templateUrl: '/app/news/components/newsItemFooter.html'
    };
});

'use strict';

angular.module('gdgXBoomerang')
.directive('gplusPerson', function ($http, $filter, Config) {
    return {
        restrict: 'EA',
        templateUrl: 'app/organizers/components/gplus_person.html',
        scope: {
            gplusId: '='
        },
        link: function (scope) {
            scope.$watch('gplusId', function (oldVal, newVal) {
                if (newVal) {
                    $http.jsonp('https://www.googleapis.com/plus/v1/people/' + newVal +
                        '?callback=JSON_CALLBACK&fields=aboutMe%2CdisplayName%2Cimage&key=' + Config.googleApi)
                        .success(function (data) {
                            if (data && data.image && data.image.url) {
                                data.image.url = data.image.url.replace('sz=50', 'sz=170');
                            }
                            scope.person = data;
                        });
                }
            });
        }
    };
});
