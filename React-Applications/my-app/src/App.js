import React from 'react';
import './App.css';
import axios from 'axios';


const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      house: '',
      hname: '',
      zipcode: '',
      errors: {
        house: '',
        hname: '',
        zipcode: '',
        fileupload: ''
      }
    };
   }


  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;
    const validationdata = {
      val: value
    };
    switch (name) {
      case 'house':
      axios.post(`http://107.22.151.34:3001/numbers`,validationdata)
        .then(res => {
          if(res.data){
            errors.house = '';
          }
          else{
            errors.house = 'Enter only numbers';
          }
        })
        break;
      case 'hname':
      axios.post(`http://107.22.151.34:3001/letters`,validationdata)
        .then(res => {
          if(res.data){
            errors.hname = '';
          }
          else{
            errors.hname = 'Enter only letters';
          }
        })
        break;
      case 'zipcode':
      axios.post(`http://107.22.151.34:3001/zip`,validationdata)
        .then(res => {
          if(res.data){
            errors.zipcode = '';
          }
          else{
            errors.zipcode = 'enter a number and of 5 digits';
          }
        })
          break;
      case 'fileupload':
      const data = new FormData();
      data.append('file',e.target.files[0]);
      axios.post('http://107.22.151.34:3001/checkfile',data)
        .then(res => {
          if(res.data){
            console.log("true");
            errors.fileupload = '';
          }
          else{
            console.log("false");
            errors.fileupload = 'upload file';
          }
        })
      break;
      default:
        break;
    }
    if(name==='fileupload'){
      this.setState({errors,[name]:e.target.files[0]});
    }
    else{
      this.setState({errors, [name]: value});
    }

  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      house: this.state.house,
      hname: this.state.hname,
      zipcode: this.state.zipcode,
      file: this.state.fileupload
    };
    console.log(user.house);
    if(validateForm(this.state.errors)) {
      axios.post(`http://107.22.151.34:3001/`,user)
        .then(res => {
          if(res.data){
            const data = new FormData();
            data.append('file',this.state.fileupload);
            axios.post('http://107.22.151.34:3001/fileupload',data)
              .then(res => {
                if(res.data){
                  alert('Data sent');
                }
                else{
                  alert('Data not sent');
                }
              });
          }
          else{
            alert('Data not sent');
          }
        })
    }else{
      alert('Invalid Form');
    }
  }

  render(){
    const {errors} = this.state;
    return (
      <div className="wrapper">
      <form className='form-wrapper' onSubmit={this.handleSubmit}>
      <h1>House Details</h1>
      <p><small>*Required</small></p>
      <br/>
      <div className='house'>
        <label htmlFor="house">House No *</label><br/>
        <input type='number' name='house' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.house.length > 0 &&
          <span className='error'>{errors.house}</span>}
      </div>
      <br/>
      <div className='hname'>
        <label htmlFor="hname">House Name *</label><br/>
        <input type='text' name='hname' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.hname.length > 0 &&
          <span className='error'>{errors.hname}</span>}
      </div>
      <br/>
      <div className='zipcode'>
        <label htmlFor="zipcode">Zipcode *</label>
        <p><small>zipcode of a city in USA</small></p><br/>
        <input type='number' name='zipcode' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.zipcode.length > 0 &&
          <span className='error'>{errors.zipcode}</span>}
      </div>
      <br/>
      <div className='fileupload'>
        <label htmlFor="fileupload">House Photo *</label>
        <input type='file' id='fileupload' name='fileupload' accept="imzipcode/png, imzipcode/jpeg" onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.fileupload.length > 0 &&
          <span className='error'>{errors.fileupload}</span>}
      </div>
      <br/>
      <div className='submit'>
        <button>Submit</button>
      </div>

      </form>
      </div>
    );
  }
}

export default App;
