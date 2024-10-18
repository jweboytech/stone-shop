import { object, string } from 'yup';

const schema = object().shape({
  firstName: string(),
});

export const form = {
  schema,
  items: [
    {
      component: 'input',
      name: 'firstName',
      label: 'First name',
      placeholder: 'First name',
    },
    {
      component: 'input',
      name: 'lastName',
      label: 'Last name',
      placeholder: 'Last name',
    },
    {
      component: 'input',
      name: 'email',
      label: 'Email',
      isDisabled: true,
      isClearable: false,
      description: "Email used for login can't be changed",
    },
  ],
};

const addressSchema = object().shape({
  country: string().required('Country cannot be blank'),
  line1: string().required('Address1 cannot be blank'),
  city: string().required('City cannot be blank'),
  state: string().required('State cannot be blank'),
  postalCode: string().required('PostalCode cannot be blank'),
});

export const addressForm = {
  schema: addressSchema,
  items: [
    {
      component: 'select',
      name: 'country',
      label: 'Country',
      placeholder: 'Country/region',
    },
    [
      {
        component: 'input',
        name: 'firstName',
        label: 'First name',
        placeholder: 'First name',
      },
      {
        component: 'input',
        name: 'lastName',
        label: 'Last name',
        placeholder: 'Last name',
      },
    ],
    {
      component: 'input',
      name: 'line1',
      label: 'Address1',
      placeholder: 'Address',
    },
    {
      component: 'input',
      name: 'line2',
      label: 'Address2',
      placeholder: 'Apartment,suite,etc（optional）',
    },
    [
      {
        component: 'input',
        name: 'city',
        label: 'City',
        placeholder: 'City',
      },
      {
        component: 'input',
        name: 'state',
        label: 'State',
        placeholder: 'State',
      },
      {
        component: 'input',
        name: 'postalCode',
        label: 'Postal code',
        placeholder: 'Postal code',
      },
    ],
    {
      component: 'input',
      name: 'phone',
      label: 'Phone',
      placeholder: 'Phone',
    },
  ],
};
