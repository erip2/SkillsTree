import * as yup from "yup";

const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

export default SignInSchema;