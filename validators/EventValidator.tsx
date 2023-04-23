import { EventForm } from 'api/Api';
import dayjs from 'dayjs';
import { Validator } from 'fluentvalidation-ts';


export class EventValidator extends Validator<EventForm> {
    constructor() {
        super();

        this.ruleFor('title')
            .notEmpty()
            .withMessage('Title cannot be empty')

        this.ruleFor('name')
            .notEmpty()
            .withMessage('Name cannot be empty')

        this.ruleFor('latitude')
            .notEmpty()
            .withMessage('Latitude cannot be empty')

        this.ruleFor('longitude')
            .notEmpty()
            .withMessage('Longtitude cannot be empty')

        this.ruleFor('maxPlace')
            .notNull()
            .withMessage('Max places cannot be empty')
            .greaterThan(0)
            .withMessage('Max places must be greater than 0')

        this.ruleFor('startTime')
            .notNull()
            .greaterThan(0)
            .withMessage('Start time cannot be null')

        this.ruleFor('endTime')
            .notNull()
            .greaterThan(0)
            .withMessage('End time cannot be null')

        this.ruleFor('categoriesIds')
            .must(categoriesIds => categoriesIds.length > 0)
            .withMessage('You need to select at least one category')

     }
}