(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'yz-react-deliveri-newpochta'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('yz-react-deliveri-newpochta'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.yzReactDeliveriNewpochta);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _yzReactDeliveriNewpochta) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _yzReactDeliveriNewpochta2 = _interopRequireDefault(_yzReactDeliveriNewpochta);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var FormNovaPochta = function (_React$Component) {
    _inherits(FormNovaPochta, _React$Component);

    function FormNovaPochta(props) {
      _classCallCheck(this, FormNovaPochta);

      var _this = _possibleConstructorReturn(this, (FormNovaPochta.__proto__ || Object.getPrototypeOf(FormNovaPochta)).call(this, props));

      _this.Api = new _yzReactDeliveriNewpochta2.default();
      _this.state = {
        listCities: [],
        listCitiesCurrent: [],
        selectCity: null,
        selectCityVal: '',
        listWarehouses: [],
        selectWarehousVal: null,
        listAreas: [],
        selectArea: null,
        selectAreaVal: ''
      };
      _this.cbCities = _this.cbCities.bind(_this);
      _this.cbWarehouse = _this.cbWarehouse.bind(_this);
      _this.cbAreas = _this.cbAreas.bind(_this);

      _this.onChangeCity = _this.onChangeCity.bind(_this);
      _this.onChangeWarehous = _this.onChangeWarehous.bind(_this);
      _this.onChangeArea = _this.onChangeArea.bind(_this);

      _this.getCitiesOfArea = _this.getCitiesOfArea.bind(_this);
      _this.apiKey = props.apiKey;
      _this.stylesNP = _this.stylesNP.bind(_this);
      _this.s = _this.stylesNP();
      return _this;
    }

    _createClass(FormNovaPochta, [{
      key: 'stylesNP',
      value: function stylesNP() {
        return {
          container: {
            margin: '0 auto',
            padding: '0 0 40px',
            maxWidth: '380px'
          },
          select: {
            marginTop: '20px',
            display: 'block',
            boxSizing: 'border-box',
            padding: '10px 16px',
            width: '100%',
            height: '46px',
            outline: '0',
            border: '1px solid #ccc',
            borderRadius: '10px',
            background: '#fff',
            boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
            color: '#616161',
            fontSize: '18px',
            lineHeight: '1.333',
            transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s'
          }
        };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {

        console.log('constructor apiKey:', this.apiKey);
        console.log('this.Api.getAreas', this.Api.getAreas);
        console.log('this.cbAreas', this.cbAreas);

        this.Api.getAreas(this.cbAreas, this.apiKey);
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate() {
        if (!this.state.selectArea) {
          console.log('should: Not selectArea', this.state);
          return false;
        } else if (!this.state.selectCity) {
          console.log('should: Not selectCities', this.state);
          return false;
        } else return true;
      }
    }, {
      key: 'cbAreas',
      value: function cbAreas(result) {
        console.log('cbAreas', result);
        var res = [];
        result.data.forEach(function (item) {
          res.push({
            Description: item.Description,
            Ref: item.Ref,
            AreasCenter: item.AreasCenter
          });
        });
        if (res.length > 0) {
          this.setState({
            listAreas: res,
            selectAreaVal: '1',
            selectArea: res[1],
            listWarehouses: []
          });
          this.Api.getCities(this.cbCities, this.apiKey);
        }
      }
    }, {
      key: 'cbCities',
      value: function cbCities(result) {
        var res = [];
        result.data.forEach(function (item) {
          res.push({
            Description: item.Description,
            DescriptionRu: item.DescriptionRu,
            Ref: item.Ref,
            Area: item.Area
          });
        });

        if (res.length > 0) {
          var selectCities = this.getCitiesOfArea(res, this.state.selectArea);
          this.setState({
            listCities: res,
            listCitiesCurrent: selectCities,
            selectCity: selectCities[0],
            selectCityVal: '0'
          });

          if (this.state.selectArea) {
            this.Api.getWarehouses(this.cbWarehouse, this.apiKey, { "CityName": this.getCitiesOfArea(res, this.state.selectArea)[0].Description });
          }
        }
      }
    }, {
      key: 'cbWarehouse',
      value: function cbWarehouse(result) {
        var res = [];
        result.data.forEach(function (item) {
          res.push(item.Description);
        });
        this.setState({ listWarehouses: res });
      }
    }, {
      key: 'getCitiesOfArea',
      value: function getCitiesOfArea(listCities, area) {
        return listCities.filter(function (i) {
          return area.Ref === i.Area;
        });
      }
    }, {
      key: 'onChangeArea',
      value: function onChangeArea(e) {
        var value = e.target.value;
        var selectArea = this.state.listAreas[parseInt(value)];
        var selectCity = this.getCitiesOfArea(this.state.listCities, selectArea);
        if (selectCity.length > 0) {
          this.setState({
            selectArea: selectArea,
            selectAreaVal: value,
            listCitiesCurrent: selectCity,
            selectCity: selectCity[0],
            selectCityVal: '0',
            selectWarehousVal: '0'
          });
          this.Api.getWarehouses(this.cbWarehouse, this.apiKey, { "CityName": selectCity[0].Description });
        } else {
          var space = [{
            Ref: '-',
            Description: '- - - - - - - - - - - - - - - - '
          }];

          this.setState({
            selectArea: selectArea,
            selectAreaVal: value,
            listCitiesCurrent: space,
            selectCity: space[0],
            selectCityVal: '0',
            listWarehouses: ['- - - - - - - - - - - - - - - - '],
            selectWarehousVal: '0'
          });
        }
      }
    }, {
      key: 'onChangeCity',
      value: function onChangeCity(e) {
        var value = e.target.value;
        this.setState({
          selectCity: this.state.listCitiesCurrent[parseInt(value)],
          selectCityVal: value,
          selectWarehousVal: '0'

        });
        this.Api.getWarehouses(this.cbWarehouse, this.apiKey, { "CityName": this.state.listCitiesCurrent[parseInt(value)].Description });
      }
    }, {
      key: 'onChangeWarehous',
      value: function onChangeWarehous(e) {
        console.log(e.target.value);
        this.setState({ selectWarehousVal: e.target.value });
      }
    }, {
      key: 'render',
      value: function render() {
        //    console.log('render');
        return _react2.default.createElement(
          'div',
          { style: this.s.container },
          _react2.default.createElement(
            'select',
            { style: this.s.select,
              onChange: this.onChangeArea,
              value: this.state.selectAreaVal
            },
            this.state.listAreas.map(function (i, ind) {
              return _react2.default.createElement(
                'option',
                { value: ind, key: ind },
                i.Description
              );
            })
          ),
          _react2.default.createElement(
            'select',
            { style: this.s.select,
              onChange: this.onChangeCity,
              value: this.state.selectCityVal
            },
            this.state.listCitiesCurrent.map(function (i, ind) {
              return _react2.default.createElement(
                'option',
                { value: ind, key: ind },
                i.Description
              );
            })
          ),
          _react2.default.createElement(
            'select',
            { style: this.s.select,
              onChange: this.onChangeWarehous
            },
            this.state.listWarehouses.map(function (i, ind) {
              return _react2.default.createElement(
                'option',
                { value: ind, key: ind },
                i
              );
            })
          )
        );
      }
    }]);

    return FormNovaPochta;
  }(_react2.default.Component);

  FormNovaPochta.propTypes = {
    apiKey: _react.PropTypes.string.isRequired
  };

  exports.default = FormNovaPochta;
});