import { emailValidator } from "../utils/vaildators";

export class LoginModel {
  constructor(
    private email: string,
    private password: string,
    public returnSecureToken: boolean = true
  ) {}

  get isEmailValid(): { isValid: boolean; error?: string } {
    if (this.email.trim() === "")
      return { isValid: false, error: "Please enter your email" };

    const isValid = emailValidator(this.email);
    if (!isValid) return { isValid: false, error: "Email is not valid" };

    return { isValid: true };
  }

  get isPasswordValid(): { isValid: boolean; error?: string } {
    if (this.password.trim() === "")
      return { isValid: false, error: "Please enter your password" };

    return { isValid: true };
  }

  get isFormValid() {
    return this.isEmailValid.isValid && this.isPasswordValid.isValid;
  }
}
