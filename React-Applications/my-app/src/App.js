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
      firstname: '',
      lastname: '',
      middlename: '',
      age: '',
      errors: {
        firstname: '',
        lastname: '',
        middlename: '',
        age: '',
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
      case 'firstname':
      axios.post(`http://localhost:3001/letters`,validationdata)
        .then(res => {
          if(res.data){
            errors.firstname = '';
          }
          else{
            errors.firstname = 'Enter only letters';
          }
        })
        break;
      case 'lastname':
      axios.post(`http://localhost:3001/letters`,validationdata)
        .then(res => {
          if(res.data){
            errors.lastname = '';
          }
          else{
            errors.lastname = 'Enter only letters';
          }
        })
        break;
      case 'middlename':
      axios.post(`http://localhost:3001/letters`,validationdata)
        .then(res => {
          if(res.data){
            errors.middlename = '';
          }
          else{
            errors.middlename = 'Enter only letters';
          }
        })
        break;
      case 'age':
      axios.post(`http://localhost:3001/numbers`,validationdata)
        .then(res => {
          if(res.data){
            errors.age = '';
          }
          else{
            errors.age = 'Enter only numbers';
          }
        })
          break;
      case 'fileupload':
      const data = new FormData();
      data.append('file',e.target.files[0]);
      axios.post('http://localhost:3001/checkfile',data)
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
    if(name=='fileupload'){
      this.setState({errors,[name]:e.target.files[0]});
    }
    else{
      this.setState({errors, [name]: value});
    }

  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      age: this.state.age,
      file: this.state.fileupload
    };
    console.log(user.firstname);
    if(validateForm(this.state.errors)) {
      axios.post(`http://localhost:3001/`,user)
        .then(res => {
          if(res.data){
            const data = new FormData();
            data.append('file',this.state.fileupload);
            axios.post('http://localhost:3001/fileupload',data)
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

      <div className='firstname'>
        <label htmlFor="firstname">First Name:</label>
        <input type='letter' name='firstname' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.firstname.length > 0 &&
          <span className='error'>{errors.firstname}</span>}
      </div>
      <br/>
      <div className='lastname'>
        <label htmlFor="lastname">Last Name:</label>
        <input type='text' name='lastname' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.lastname.length > 0 &&
          <span className='error'>{errors.lastname}</span>}
      </div>
      <br/>
      <div className='middlename'>
        <label htmlFor="middlename">Middle Name:</label>
        <input type='text' name='middlename' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.middlename.length > 0 &&
          <span className='error'>{errors.middlename}</span>}
      </div>
      <br/>
      <div className='age'>
        <label htmlFor="age">Age:</label>
        <input type='number' name='age' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.age.length > 0 &&
          <span className='error'>{errors.age}</span>}
      </div>
      <br/>
      <div className='fileupload'>
        <label htmlFor="fileupload">File Upload:</label>
        <input type='file' id='fileupload' name='fileupload' accept="image/png, image/jpeg" onChange={this.handleChange} onBlur={this.handleChange}/>
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
