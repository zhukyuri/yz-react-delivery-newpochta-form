import React, {PropTypes} from 'react';
import ApiNovaPochta from 'yz-react-deliveri-newpochta';


class FormNovaPochta extends React.Component {

  constructor(props) {
    super(props);
    this.Api = new ApiNovaPochta;
    this.state = {
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

  shouldComponentUpdate() {
    if (!this.state.selectArea) {
//      console.log('should: Not selectArea', this.state);
      return false;
    }
    else if (!this.state.selectCity) {
//      console.log('should: Not selectCities', this.state);
      return false;
    }
    else return true;
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
        selectCityVal: '0'
      });

      if (this.state.selectArea) {
        this.Api.getWarehouses(
          this.cbWarehouse, this.apiKey, {"CityName": this.getCitiesOfArea(res, this.state.selectArea)[0].Description});
      }
    }
  }
  cbWarehouse(result) {
    let res = [];
    result.data.forEach((item)=> {
      res.push(item.Description);
    });
    this.setState({listWarehouses: res});
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
        selectAreaVal: value,
        listCitiesCurrent: selectCity,
        selectCity: selectCity[0],
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
        selectAreaVal: value,
        listCitiesCurrent: space,
        selectCity: space[0],
        selectCityVal: '0',
        listWarehouses: ['- - - - - - - - - - - - - - - - '],
        selectWarehousVal: '0'
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
    this.setState({selectWarehousVal: e.target.value});
  }

  render() {
    return (
      <div style={this.s.container}>
        <select style={this.s.select}
                onChange={ this.onChangeArea }
                value={this.state.selectAreaVal}
        >
          { this.state.listAreas.map((i, ind) => ( <option value={ind} key={ind}>{i.Description}</option> )) }
        </select>
        <select style={this.s.select}
                onChange={ this.onChangeCity }
                value={this.state.selectCityVal}
        >
          {
            this.state.listCitiesCurrent.map((i, ind) => ( <option value={ind} key={ind}>{i.Description}</option> )) }
        </select>
        <select style={this.s.select}
                onChange={ this.onChangeWarehous }
        >
          { this.state.listWarehouses.map((i, ind) => ( <option value={ind} key={ind}>{i}</option> )) }
        </select>
      </div>
    )
  }
}

FormNovaPochta.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default FormNovaPochta;
