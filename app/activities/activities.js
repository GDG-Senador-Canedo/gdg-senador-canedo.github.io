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
