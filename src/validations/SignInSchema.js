import * as yup from "yup";

const SignInSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
});

export default SignInSchema;