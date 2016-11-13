import React, {PropTypes} from 'react';
import ApiNovaPochta from 'yz-react-deliveri-newpochta';

class FormNovaPochta extends React.Component {

  constructor(props) {
    super(props);
    this.Api = new ApiNovaPochta;
    this.state = {
      listAreas: [],
      listCities: [],
      listCitiesCurrent: [],
      listWarehouses: [],
      selectArea: null,
      selectCity: null,
      selectWarehous: null,
      selectCityVal: '',
      selectWarehousVal: '',
      selectAreaVal: ''
    };
    this.cbCities = this.cbCities.bind(this);
    this.cbWarehouse = this.cbWarehouse.bind(this);
    this.cbAreas = this.cbAreas.bind(this);

    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeWarehous = this.onChangeWarehous.bind(this);
    this.onChangeArea = this.onChangeArea.bind(this);

    this.getCitiesOfArea = this.getCitiesOfArea.bind(this);
    this.apiKey = props.apiKey;
    this.stylesNP = this.stylesNP.bind(this);
    this.s = this.stylesNP();

    this.result = this.props.cb;
  }

  stylesNP() {
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
    }
  }

  componentDidMount() {
    this.Api.getAreas(this.cbAreas, this.apiKey);
  }

  componentDidUpdate() {
    let res = {
      selectArea: this.state.selectArea.Description,
      selectCity: this.state.selectCity.Description,
      selectWarehous: this.state.selectWarehous.Description,
    };
//    console.log('componentDidUpdate', this.state);
    this.result(res);
  }

  shouldComponentUpdate() {
    if (!this.state.selectArea) {
      return false;
    }
    else if ( !this.state.selectCity ) {
      return false;
    }
    else {
      return true
    };
  }

  cbAreas(result) {
    let res = [];
    result.data.forEach((item)=> {
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
  cbCities(result) {
    let res = [];
    result.data.forEach((item)=> {
      res.push({
        Description: item.Description,
        DescriptionRu: item.DescriptionRu,
        Ref: item.Ref,
        Area: item.Area
      });
    });

    if (res.length > 0) {
      let selectCities = this.getCitiesOfArea(res, this.state.selectArea);
      this.setState({
        listCities: res,
        listCitiesCurrent: selectCities,
        selectCity: selectCities[0],
        selectCityVal: '0',
        selectWarehousVal: '0',
      });

      if (this.state.selectArea) {
        this.Api.getWarehouses(
          this.cbWarehouse, this.apiKey, {"CityName": this.getCitiesOfArea(res, this.state.selectArea)[0].Description});
      }
    }
  }
  cbWarehouse(result) {
    let space = [{
      Ref: '-',
      Description: '- - - - - - - - - - - - - - - - '
    }];
    let res = [];
    result.data.forEach((item)=> {
      res.push({
        Ref: item.Ref,
        Description: item.Description
      });
    });
    let warehousVal = this.state.selectWarehousVal;
    let warehous = res.length>0 ? res[warehousVal] : space;
    this.setState(
      {
        listWarehouses: res,
        selectWarehous: warehous
      });
  }

  getCitiesOfArea(listCities, area) {
    return listCities.filter((i) => area.Ref === i.Area)
  }

  onChangeArea(e) {
    let value = e.target.value;
    let selectArea = this.state.listAreas[parseInt(value)];
    let selectCity = this.getCitiesOfArea(this.state.listCities, selectArea);
    if (selectCity.length > 0) {
      this.setState({
        selectArea: selectArea,
        selectCity: selectCity[0],
        listCitiesCurrent: selectCity,
        selectAreaVal: value,
        selectCityVal: '0',
        selectWarehousVal: '0'
      });
      this.Api.getWarehouses(
        this.cbWarehouse,
        this.apiKey,
        {"CityName": selectCity[0].Description});
    } else {
      let space = [{
        Ref: '-',
        Description: '- - - - - - - - - - - - - - - - '
      }];

      this.setState({
        selectArea: selectArea,
        selectCity: space[0],
        selectWarehous: space[0],
        listCitiesCurrent: space,
        listWarehouses: ['- - - - - - - - - - - - - - - - '],
        selectAreaVal: value,
        selectCityVal: '0',
        selectWarehousVal: '0',
      });
    }
  }
  onChangeCity(e) {
    let value = e.target.value;
    this.setState({
      selectCity: this.state.listCitiesCurrent[parseInt(value)],
      selectCityVal: value,
      selectWarehousVal: '0'

    });
    this.Api.getWarehouses(
      this.cbWarehouse,
      this.apiKey,
      {"CityName": this.state.listCitiesCurrent[parseInt(value)].Description});
  }
  onChangeWarehous(e) {
    let warehousVal = e.target.value;
    let warehous = typeof parseInt(warehousVal) === typeof 1 ? this.state.listWarehouses[warehousVal] : '';
    this.setState(
      {
        selectWarehousVal: warehousVal,
        selectWarehous: warehous
      });
  }

  render() {
    return (
      <div style={this.s.container}>
        <select style={this.s.select}
                name="areas"
                onChange={ this.onChangeArea }
                value={this.state.selectAreaVal}
        >
          { this.state.listAreas.map((i, ind) => ( <option value={ind} key={ind}> {i.Description} </option> )) }
        </select>
        <select style={this.s.select}
                name="cities"
                onChange={ this.onChangeCity }
                value={this.state.selectCityVal}
        >
          { this.state.listCitiesCurrent.map((i, ind) => ( <option value={ind} key={ind}>{i.Description}</option> )) }
        </select>
        <select style={this.s.select}
                name="warehouses"
                onChange={ this.onChangeWarehous }
        >
          { this.state.listWarehouses.map((i, ind) => ( <option value={ind} key={ind}>{i.Description}</option> )) }
        </select>
      </div>
    )
  }
}

FormNovaPochta.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default FormNovaPochta;
