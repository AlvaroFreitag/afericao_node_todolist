export function validateSchema(schema, values) {
    const { error, value: body } = schema.validate(values, { abortEarly: false });
    return {
        values: body
    };
}