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
      username: '',
      password: '',
      errors: {
        username: '',
        password: '',
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
      case 'username':
      axios.post(`http://localhost:3001/letters`,validationdata)
        .then(res => {
          if(res.data){
            errors.username = '';
          }
          else{
            errors.username = 'Enter only letters';
          }
        })
        break;
      case 'password':
      axios.post(`http://localhost:3001/letters`,validationdata)
        .then(res => {
          if(res.data){
            errors.password = '';
          }
          else{
            errors.password = 'Enter only letters';
          }
        })
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log(user.username);
    if(validateForm(this.state.errors)) {
      axios.post(`http://localhost:3001/`,user)
        .then(res => {
          if(res.data){
            alert('Login success');
          }
          else{
            alert('Check username or password');
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

      <div className='username'>
        <label htmlFor="username">username:</label>
        <input type='letter' name='username' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.username.length > 0 &&
          <span className='error'>{errors.username}</span>}
      </div>
      <br/>
      <div className='password'>
        <label htmlFor="password">password:</label>
        <input type='text' name='password' onChange={this.handleChange} onBlur={this.handleChange}/>
        {errors.password.length > 0 &&
          <span className='error'>{errors.password}</span>}
      </div>
      <br/>
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
