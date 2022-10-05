'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">Users Service API Documentation (v26)</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ClientsModule.html\" data-type=\"entity-link\" >ClientsModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ConfigurationModule.html\" data-type=\"entity-link\" >ConfigurationModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-ConfigurationModule-0a673ffff082dcf09c8c5d5f17c33609bb2230876cb049badbd67e2d45d25417ae22bc7b37381e33a6ab7f75c47e81f4fb906a60d3192d53cb907e0e1d12846a"' : 'data-target="#xs-injectables-links-module-ConfigurationModule-0a673ffff082dcf09c8c5d5f17c33609bb2230876cb049badbd67e2d45d25417ae22bc7b37381e33a6ab7f75c47e81f4fb906a60d3192d53cb907e0e1d12846a"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-ConfigurationModule-0a673ffff082dcf09c8c5d5f17c33609bb2230876cb049badbd67e2d45d25417ae22bc7b37381e33a6ab7f75c47e81f4fb906a60d3192d53cb907e0e1d12846a"' : 'id="xs-injectables-links-module-ConfigurationModule-0a673ffff082dcf09c8c5d5f17c33609bb2230876cb049badbd67e2d45d25417ae22bc7b37381e33a6ab7f75c47e81f4fb906a60d3192d53cb907e0e1d12846a"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/SecretManagerService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SecretManagerService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/GuardsModule.html\" data-type=\"entity-link\" >GuardsModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-GuardsModule-0cf1edcd63c55891ce8d33d117671364c2618c8930145783af114060400dd2c2763dd5b0b3ef32c7c9c8c34d0f01834b37b8ee38a7c3282944f511ddc4c8c592"' : 'data-target="#xs-injectables-links-module-GuardsModule-0cf1edcd63c55891ce8d33d117671364c2618c8930145783af114060400dd2c2763dd5b0b3ef32c7c9c8c34d0f01834b37b8ee38a7c3282944f511ddc4c8c592"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-GuardsModule-0cf1edcd63c55891ce8d33d117671364c2618c8930145783af114060400dd2c2763dd5b0b3ef32c7c9c8c34d0f01834b37b8ee38a7c3282944f511ddc4c8c592"' : 'id="xs-injectables-links-module-GuardsModule-0cf1edcd63c55891ce8d33d117671364c2618c8930145783af114060400dd2c2763dd5b0b3ef32c7c9c8c34d0f01834b37b8ee38a7c3282944f511ddc4c8c592"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ApiKeyGrpcGuard.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ApiKeyGrpcGuard</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ApiKeyHttpGuard.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ApiKeyHttpGuard</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ApiKeyTcpGuard.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ApiKeyTcpGuard</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/HealthModule.html\" data-type=\"entity-link\" >HealthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#controllers-links-module-HealthModule-8a2e5a156fc28e48517caaca9de2d8ecec4e94b9a639b521ae7eaa05e34fc9e3f4798f016617d1d62181090e8b82a376538aa09c8eb40910fdf247d3cb3e1a2a"' : 'data-target="#xs-controllers-links-module-HealthModule-8a2e5a156fc28e48517caaca9de2d8ecec4e94b9a639b521ae7eaa05e34fc9e3f4798f016617d1d62181090e8b82a376538aa09c8eb40910fdf247d3cb3e1a2a"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-HealthModule-8a2e5a156fc28e48517caaca9de2d8ecec4e94b9a639b521ae7eaa05e34fc9e3f4798f016617d1d62181090e8b82a376538aa09c8eb40910fdf247d3cb3e1a2a"' : 'id="xs-controllers-links-module-HealthModule-8a2e5a156fc28e48517caaca9de2d8ecec4e94b9a639b521ae7eaa05e34fc9e3f4798f016617d1d62181090e8b82a376538aa09c8eb40910fdf247d3cb3e1a2a"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/HealthController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HealthController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/LoggingModule.html\" data-type=\"entity-link\" >LoggingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/PipesModule.html\" data-type=\"entity-link\" >PipesModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-PipesModule-3ded6af21f0ba542231ceb023f1f8c19e9c2d1706d4c62e9e8e51dc6d12c840a56b308c63b9bc2260c8fe8bc7f439cf72aacdb4ce231a49ba7f04802e5bea476"' : 'data-target="#xs-injectables-links-module-PipesModule-3ded6af21f0ba542231ceb023f1f8c19e9c2d1706d4c62e9e8e51dc6d12c840a56b308c63b9bc2260c8fe8bc7f439cf72aacdb4ce231a49ba7f04802e5bea476"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-PipesModule-3ded6af21f0ba542231ceb023f1f8c19e9c2d1706d4c62e9e8e51dc6d12c840a56b308c63b9bc2260c8fe8bc7f439cf72aacdb4ce231a49ba7f04802e5bea476"' : 'id="xs-injectables-links-module-PipesModule-3ded6af21f0ba542231ceb023f1f8c19e9c2d1706d4c62e9e8e51dc6d12c840a56b308c63b9bc2260c8fe8bc7f439cf72aacdb4ce231a49ba7f04802e5bea476"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/HashPipe.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HashPipe</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/UsersModule.html\" data-type=\"entity-link\" >UsersModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#controllers-links-module-UsersModule-d26007639d5454d19b2ebf56641f88c083cb5fb0b582db30e0c8e9b1190659acb59be6184a3a9f2568b25e9d999b6f6d24a836e73fca6d3720d88dafc8b2a1f9"' : 'data-target="#xs-controllers-links-module-UsersModule-d26007639d5454d19b2ebf56641f88c083cb5fb0b582db30e0c8e9b1190659acb59be6184a3a9f2568b25e9d999b6f6d24a836e73fca6d3720d88dafc8b2a1f9"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-UsersModule-d26007639d5454d19b2ebf56641f88c083cb5fb0b582db30e0c8e9b1190659acb59be6184a3a9f2568b25e9d999b6f6d24a836e73fca6d3720d88dafc8b2a1f9"' : 'id="xs-controllers-links-module-UsersModule-d26007639d5454d19b2ebf56641f88c083cb5fb0b582db30e0c8e9b1190659acb59be6184a3a9f2568b25e9d999b6f6d24a836e73fca6d3720d88dafc8b2a1f9"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/UsersHttpController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UsersHttpController</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"controllers/UsersTcpController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UsersTcpController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/ApiKeyDto.html\" data-type=\"entity-link\" >ApiKeyDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CreateUserDto.html\" data-type=\"entity-link\" >CreateUserDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GuidDto.html\" data-type=\"entity-link\" >GuidDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ReadUserDto.html\" data-type=\"entity-link\" >ReadUserDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateUserDto.html\" data-type=\"entity-link\" >UpdateUserDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/User.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/User-1.html\" data-type=\"entity-link\" >User</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UserListDto.html\" data-type=\"entity-link\" >UserListDto</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/GrpcUsersClient.html\" data-type=\"entity-link\" >GrpcUsersClient</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/HttpExceptionInterceptor.html\" data-type=\"entity-link\" >HttpExceptionInterceptor</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/LoggingService.html\" data-type=\"entity-link\" >LoggingService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TcpUsersClient.html\" data-type=\"entity-link\" >TcpUsersClient</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UsersDatabaseService.html\" data-type=\"entity-link\" >UsersDatabaseService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UsersService.html\" data-type=\"entity-link\" >UsersService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"', ">\n                            <span class=\"icon ion-ios-lock\"></span>\n                            <span>Guards</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"', ">\n                            <li class=\"link\">\n                                <a href=\"guards/ApiKeyGuard.html\" data-type=\"entity-link\" >ApiKeyGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/IGrpcUsersService.html\" data-type=\"entity-link\" >IGrpcUsersService</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ILoggingService.html\" data-type=\"entity-link\" >ILoggingService</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IUsersClient.html\" data-type=\"entity-link\" >IUsersClient</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IUsersDatabaseService.html\" data-type=\"entity-link\" >IUsersDatabaseService</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/IUsersService.html\" data-type=\"entity-link\" >IUsersService</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/typealiases.html\" data-type=\"entity-link\">Type aliases</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));