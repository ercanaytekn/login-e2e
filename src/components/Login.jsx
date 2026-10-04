import React, { useState, useEffect } from 'react';
import {Form, FormGroup, Label, Input, Button, FormFeedback} from 'reactstrap';
import { useNavigate } from 'react-router-dom';



const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({email:false, password:false,terms:false});
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const emailValid = form.email.includes('@') && form.email.includes('.'); 
    const passwordValid = form.password.length >= 4;                             
    const termsValid = form.terms;   
    setErrors({email: !emailValid, password: !passwordValid,terms: !termsValid});
    setIsValid(emailValid && passwordValid && termsValid)
  }, [form])
  
  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!isValid) {
      return;
    }
        navigate('/success')
    
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
       { errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
         { errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>Sign In</Button>
      </FormGroup>
    </Form>
  );
}