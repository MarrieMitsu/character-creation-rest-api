// Packages
import * as yup from "yup";

// Character validation
export const characterValidation = yup.object().shape({
    name: yup.string().required(),
    bio: yup.mixed().required(),
    type: yup.string().required(),
    health_point: yup.number().integer().required(),
    mana_point: yup.number().integer().required(),
    damage: yup.number().integer().required(),
    defense: yup.number().integer().required(),
    speed: yup.number().integer().required(),
});

// Custom validation error
export const customValidationErr = (err: yup.ValidationError): any => {
    let customErr: object[] = [];
    err.inner.forEach(item => {
        customErr.push({
            name: item.name,
            field: item.path,
            message: item.message
        });
    });
    return customErr;
} 