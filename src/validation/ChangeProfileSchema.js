import * as Yup from 'yup';

const fullName = Yup.string()
  .min(1, 'Tên quá ngắn!')
  .max(50, 'Tên quá dài!')
  .required('Vui lòng thay đổi thông tin trước khi xác nhận');

const phoneRegExp = /^0\d{9}$/;

const phone = Yup.string()
  .matches(phoneRegExp, 'Số điện thoại không chính xác')
  .required('Vui lòng thay đổi thông tin trước khi xác nhận');

const ChangeProfileSchema = Yup.object().shape({
  fullName,
  phone,
});

export default ChangeProfileSchema;
