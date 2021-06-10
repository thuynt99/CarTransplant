import * as Yup from 'yup';

const email = Yup.string()
  .email('Email không hợp lệ')
  .required('Bạn chưa nhập email');

const password = Yup.string()
  .min(2, 'Mật khẩu quá ngắn')
  .max(50, 'Mật khẩu quá dài')
  .required('Bạn chưa nhập mật khẩu');

const LoginSchema = Yup.object().shape({
  email,
  password,
});

export default LoginSchema;
