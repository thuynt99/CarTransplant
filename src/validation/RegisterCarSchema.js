import * as Yup from 'yup';

const vehicleBrand = Yup.string()
  .min(1, 'Fullname too Short!')
  .max(50, 'Fullname too Long!')
  .required('Fullname is required');

const vehicleModal = Yup.string()
  .min(1, 'Fullname too Short!')
  .max(50, 'Fullname too Long!')
  .required('Fullname is required');

const licensePlate = Yup.string()
  .min(1, 'Fullname too Short!')
  .max(50, 'Fullname too Long!')
  .required('Fullname is required');

const vehicleColor = Yup.string()
  .min(1, 'Fullname too Short!')
  .max(50, 'Fullname too Long!')
  .required('Fullname is required');

const bookingType = Yup.string()
  .min(1, 'Fullname too Short!')
  .max(50, 'Fullname too Long!')
  .required('Fullname is required');

const phoneRegExp = /^0\d{9}$/;

const phone = Yup.string()
  .matches(phoneRegExp, 'Phone number is not valid')
  .required('Phone is required');

const RegisterCarSchema = Yup.object().shape({
  vehicleBrand,
  vehicleModal,
  licensePlate,
  vehicleColor,
  bookingType,
});

export default RegisterCarSchema;
