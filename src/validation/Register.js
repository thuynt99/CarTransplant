import * as Yup from 'yup';

const PASSWORD_REGEX_CHECK = /^(?=.*[A-Za-z0-9])(?=.*?[^a-zA-Z0-9\\s]).{7,15}$/;

const fullName = Yup.string()
  .min(1, 'Họ và tên quá ngắn')
  .max(50, 'Họ và tên quá dài')
  .required('Bạn chưa nhập họ và tên');

const phoneRegExp = /^0\d{9}$/;

const phone = Yup.string()
  .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
  .required('Bạn chưa nhập số điện thoại');

const email = Yup.string()
  .email('Email không hợp lệ')
  .required('Bạn chưa nhập email');

const password = Yup.string()
  .min(2, 'Mật khẩu quá ngắn')
  .max(50, 'Mật khẩu quá dài')
  .matches(
    PASSWORD_REGEX_CHECK,
    'Mật khẩu chưa đủ mạnh! Mật khẩu phải từ 7-15 kí tự có ít nhất 1 kí tự đặc biệt',
  )
  .required('Bạn chưa nhập mật khẩu');

const RegisterSchema = Yup.object().shape({
  fullName,
  phone,
  email,
  password,
});

export default RegisterSchema;
