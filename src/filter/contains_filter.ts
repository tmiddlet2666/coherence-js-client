import { ComparisonFilter } from './base_filter';
import { ValueExtractor } from '../extractor/value_extractor';

export class ContainsFilter<T, E>
    extends ComparisonFilter<T, E, E> {

    values: any;

    constructor(extractor: ValueExtractor<T, E>, value: E) {
        super('ContainsFilter', extractor, value);
    }
}