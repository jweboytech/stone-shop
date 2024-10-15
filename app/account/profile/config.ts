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
