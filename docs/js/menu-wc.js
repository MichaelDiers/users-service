'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">UsersService API Documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ClientsModule.html" data-type="entity-link" >ClientsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigurationModule.html" data-type="entity-link" >ConfigurationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConfigurationModule-bc5d0c0fbc60d33949642efe34aab11467ed6d2eafc9d7f0c84b8b681ebd6125a27b8865ba8577fc52301e4fb124ba9bfb3dd3417f3440ea16b32f7f1447a65d"' : 'data-target="#xs-injectables-links-module-ConfigurationModule-bc5d0c0fbc60d33949642efe34aab11467ed6d2eafc9d7f0c84b8b681ebd6125a27b8865ba8577fc52301e4fb124ba9bfb3dd3417f3440ea16b32f7f1447a65d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConfigurationModule-bc5d0c0fbc60d33949642efe34aab11467ed6d2eafc9d7f0c84b8b681ebd6125a27b8865ba8577fc52301e4fb124ba9bfb3dd3417f3440ea16b32f7f1447a65d"' :
                                        'id="xs-injectables-links-module-ConfigurationModule-bc5d0c0fbc60d33949642efe34aab11467ed6d2eafc9d7f0c84b8b681ebd6125a27b8865ba8577fc52301e4fb124ba9bfb3dd3417f3440ea16b32f7f1447a65d"' }>
                                        <li class="link">
                                            <a href="injectables/SecretManagerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecretManagerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GuardsModule.html" data-type="entity-link" >GuardsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GuardsModule-0cf1edcd63c55891ce8d33d117671364c2618c8930145783af114060400dd2c2763dd5b0b3ef32c7c9c8c34d0f01834b37b8ee38a7c3282944f511ddc4c8c592"' : 'data-target="#xs-injectables-links-module-GuardsModule-0cf1edcd63c55891ce8d33d117671364c2618c8930145783af114060400dd2c2763dd5b0b3ef32c7c9c8c34d0f01834b37b8ee38a7c3282944f511ddc4c8c592"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GuardsModule-0cf1edcd63c55891ce8d33d117671364c2618c8930145783af114060400dd2c2763dd5b0b3ef32c7c9c8c34d0f01834b37b8ee38a7c3282944f511ddc4c8c592"' :
                                        'id="xs-injectables-links-module-GuardsModule-0cf1edcd63c55891ce8d33d117671364c2618c8930145783af114060400dd2c2763dd5b0b3ef32c7c9c8c34d0f01834b37b8ee38a7c3282944f511ddc4c8c592"' }>
                                        <li class="link">
                                            <a href="injectables/ApiKeyGrpcGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiKeyGrpcGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ApiKeyHttpGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiKeyHttpGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ApiKeyTcpGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApiKeyTcpGuard</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthChecksModule.html" data-type="entity-link" >HealthChecksModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HealthChecksModule-2402604034b93d4fa57d4862afc25aa3e4818247ab74d4329f0b7a81160377a86c344eb782b631f7ea60265dad6f67f22d06d09483eb935316db249998c35170"' : 'data-target="#xs-injectables-links-module-HealthChecksModule-2402604034b93d4fa57d4862afc25aa3e4818247ab74d4329f0b7a81160377a86c344eb782b631f7ea60265dad6f67f22d06d09483eb935316db249998c35170"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HealthChecksModule-2402604034b93d4fa57d4862afc25aa3e4818247ab74d4329f0b7a81160377a86c344eb782b631f7ea60265dad6f67f22d06d09483eb935316db249998c35170"' :
                                        'id="xs-injectables-links-module-HealthChecksModule-2402604034b93d4fa57d4862afc25aa3e4818247ab74d4329f0b7a81160377a86c344eb782b631f7ea60265dad6f67f22d06d09483eb935316db249998c35170"' }>
                                        <li class="link">
                                            <a href="injectables/UsersGrpcHealthCheck.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersGrpcHealthCheck</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HealthModule-85abcd66fc19314553a65de99f8e2c879dc46cbea55bbc50c7f0841b6e6441f287187bcda701c83b5c1b3f220d41de09fbd5492e510584c5a3b62ddf9d4feade"' : 'data-target="#xs-controllers-links-module-HealthModule-85abcd66fc19314553a65de99f8e2c879dc46cbea55bbc50c7f0841b6e6441f287187bcda701c83b5c1b3f220d41de09fbd5492e510584c5a3b62ddf9d4feade"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-85abcd66fc19314553a65de99f8e2c879dc46cbea55bbc50c7f0841b6e6441f287187bcda701c83b5c1b3f220d41de09fbd5492e510584c5a3b62ddf9d4feade"' :
                                            'id="xs-controllers-links-module-HealthModule-85abcd66fc19314553a65de99f8e2c879dc46cbea55bbc50c7f0841b6e6441f287187bcda701c83b5c1b3f220d41de09fbd5492e510584c5a3b62ddf9d4feade"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link" >PipesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PipesModule-3ded6af21f0ba542231ceb023f1f8c19e9c2d1706d4c62e9e8e51dc6d12c840a56b308c63b9bc2260c8fe8bc7f439cf72aacdb4ce231a49ba7f04802e5bea476"' : 'data-target="#xs-injectables-links-module-PipesModule-3ded6af21f0ba542231ceb023f1f8c19e9c2d1706d4c62e9e8e51dc6d12c840a56b308c63b9bc2260c8fe8bc7f439cf72aacdb4ce231a49ba7f04802e5bea476"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PipesModule-3ded6af21f0ba542231ceb023f1f8c19e9c2d1706d4c62e9e8e51dc6d12c840a56b308c63b9bc2260c8fe8bc7f439cf72aacdb4ce231a49ba7f04802e5bea476"' :
                                        'id="xs-injectables-links-module-PipesModule-3ded6af21f0ba542231ceb023f1f8c19e9c2d1706d4c62e9e8e51dc6d12c840a56b308c63b9bc2260c8fe8bc7f439cf72aacdb4ce231a49ba7f04802e5bea476"' }>
                                        <li class="link">
                                            <a href="injectables/HashPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HashPipe</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-d26007639d5454d19b2ebf56641f88c083cb5fb0b582db30e0c8e9b1190659acb59be6184a3a9f2568b25e9d999b6f6d24a836e73fca6d3720d88dafc8b2a1f9"' : 'data-target="#xs-controllers-links-module-UsersModule-d26007639d5454d19b2ebf56641f88c083cb5fb0b582db30e0c8e9b1190659acb59be6184a3a9f2568b25e9d999b6f6d24a836e73fca6d3720d88dafc8b2a1f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-d26007639d5454d19b2ebf56641f88c083cb5fb0b582db30e0c8e9b1190659acb59be6184a3a9f2568b25e9d999b6f6d24a836e73fca6d3720d88dafc8b2a1f9"' :
                                            'id="xs-controllers-links-module-UsersModule-d26007639d5454d19b2ebf56641f88c083cb5fb0b582db30e0c8e9b1190659acb59be6184a3a9f2568b25e9d999b6f6d24a836e73fca6d3720d88dafc8b2a1f9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersHttpController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersHttpController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UsersTcpController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersTcpController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/GrpcUsersService.html" data-type="entity-link" >GrpcUsersService</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersHttpController.html" data-type="entity-link" >UsersHttpController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersTcpController.html" data-type="entity-link" >UsersTcpController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiKeyDto.html" data-type="entity-link" >ApiKeyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GuidDto.html" data-type="entity-link" >GuidDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserListDto.html" data-type="entity-link" >UserListDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiKeyGrpcGuard.html" data-type="entity-link" >ApiKeyGrpcGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiKeyHttpGuard.html" data-type="entity-link" >ApiKeyHttpGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ApiKeyTcpGuard.html" data-type="entity-link" >ApiKeyTcpGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GrpcUsersClient.html" data-type="entity-link" >GrpcUsersClient</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashPipe.html" data-type="entity-link" >HashPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpExceptionInterceptor.html" data-type="entity-link" >HttpExceptionInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingService.html" data-type="entity-link" >LoggingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SecretManagerService.html" data-type="entity-link" >SecretManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcpUsersClient.html" data-type="entity-link" >TcpUsersClient</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersDatabaseService.html" data-type="entity-link" >UsersDatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersGrpcHealthCheck.html" data-type="entity-link" >UsersGrpcHealthCheck</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ApiKeyGuard.html" data-type="entity-link" >ApiKeyGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IGrpcUsersService.html" data-type="entity-link" >IGrpcUsersService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILoggingService.html" data-type="entity-link" >ILoggingService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISecretManagerService.html" data-type="entity-link" >ISecretManagerService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsersClient.html" data-type="entity-link" >IUsersClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsersDatabaseService.html" data-type="entity-link" >IUsersDatabaseService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUsersService.html" data-type="entity-link" >IUsersService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});