import { Validator } from 'fluentvalidation-ts';

export type RegisterData = {
  name: string,
  email: string,
  password: string
}

export class RegisterValidator extends Validator<RegisterData> {
  constructor() {
    super();

    this.ruleFor('name')
      .notEmpty()
      .withMessage('Name cannot be empty')
      .minLength(5)
      .withMessage('Name should be 5-30 characters')
      .maxLength(30)
      .withMessage('Name should be 5-30 characters');
    
    this.ruleFor('password')
      .notEmpty()
      .withMessage('Password cannot be empty')
      .minLength(10)
      .withMessage('Password should be at least 10 characters');
    
    this.ruleFor('email')
      .notEmpty()
      .withMessage('E-mail cannot be empty')
      .emailAddress()
      .withMessage('Incorrect address');
  }
}