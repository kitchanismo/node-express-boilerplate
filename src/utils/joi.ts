import Joi = require('joi')

export const onValidate = (data: {}, validator: Joi.SchemaMap<any>) => {
  const schema = Joi.object(validator).options({ abortEarly: false })

  const { error } = schema.validate(data)

  if (!error) return null

  const errors: any = {}

  error.details.forEach((item) => (errors[item.path[0]] = item.message))

  return errors
}

export const lettersOnly = (label: string) => {
  return Joi.string()
    .label(label)
    .regex(/^[A-Za-z\s]*$/)
    .error((errors: any) => {
      errors.forEach((err: any) => {
        switch (err.code) {
          case 'any.empty':
            err.message = `"${label}" is not allowed to be empty`
            break
          case 'string.pattern.base':
            err.message = `"${label}" must not have a number or special character`
            break
          default:
            break
        }
      })
      return errors
    })
}
