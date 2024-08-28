import { ForeignKeyViolationError, UniqueViolationError } from 'objection';

export const duplicateEntryForKey = (error, constraintKey) => {
    if (error instanceof UniqueViolationError) {
        return constraintKey === error.constraint;
    }

    return false;
};

export const foreignKeyConstraintFails = (error, constraintKey) => {
    if (error instanceof ForeignKeyViolationError) {
        return constraintKey === error.constraint;
    }

    return false;
};