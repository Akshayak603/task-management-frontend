import * as Yup from 'yup';

export const customValidation= Yup.object().shape({
    title: Yup.string().required("Task title is required!"),
    description: Yup.string().required("Title description is required!")
});
