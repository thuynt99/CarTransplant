import * as Yup from 'yup';

const phoneRegExp = /^0\d{9}$/;

const phone = Yup.string()
  .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
  .required('Bạn chưa nhập số điện thoại');

const ForgotSchema = Yup.object().shape({
  phone,
});

export default ForgotSchema;
