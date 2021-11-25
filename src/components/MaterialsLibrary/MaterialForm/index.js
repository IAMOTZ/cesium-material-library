import React from 'react';
import { Form, Field } from 'react-final-form';
import ColorPicker from '../ColorPicker';

const MaterialsForm = ({ material, updateMaterial }) => {
  const onSubmit = (values, from) => {
    console.log('submitting')
    updateMaterial({
      materialId: material.id,
      updatedMaterial: values,
    });
  }

  const validate = () => {
    console.log('Validating and that is all')
  }
  return (
    <div className="material-form-wrapper">
      <Form
        className="material-form"
        onSubmit={onSubmit}
        initialValues={material}
        validate={(values) => validate(values)}
        render={({ handleSubmit, hasValidationErrors }) => (
          <>
            <div className="row">
              <div className="fieldItem">
                <Field name="name" format={(value) => value && value.trim()} formatOnBlur >
                  {({ input, meta }) => (
                    <>
                      <input className="formInput" {...input} type="string" placeholder="Material Name" />
                      {meta.error && meta.touched && <p className="errorText">{meta.error}</p>}
                    </>
                  )}
                </Field>
              </div>
              <div className="fieldItem">
                <Field  name="color" parse={(value) => value && value.hex}>
                  {({ input }) => <ColorPicker onChange={input.onChange} currentColor={input.value} />}
                </Field>
              </div>
            </div>

            <div className="row">
              <div className="fieldItem">
                <Field name="volume" parse={value => Number(value)}>
                  {({ input, meta }) => (
                    <>
                      <input {...input} className="formInput" type="number" placeholder="Volume" />
                      {meta.error && meta.touched && <p className="errorText">{meta.error}</p>}
                    </>
                  )}
                </Field>
              </div>
              <div className="fieldItem">
                <Field name="cost" parse={value => Number(value)}>
                  {({ input, meta }) => (
                    <>
                      <input {...input} className="formInput" type="number" placeholder="Cost" />
                      {meta.error && meta.touched && <p className="errorText">{meta.error}</p>}
                    </>
                  )}
                </Field>
              </div>
            </div>

            <div className="row">
              <div className="fieldItem">
                <Field name="deliveryDate" format={(value) => value && value.trim()} formatOnBlur>
                  {({ input, meta }) => (
                    <>
                      <input {...input} className="formInput" type="date" placeholder="Delivery Date" />
                      {meta.error && meta.touched && <p className="errorText">{meta.error}</p>}
                    </>
                  )}
                </Field>

                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </>
        )}

      />
    </div>
  )
}

export default MaterialsForm;
