import {
    Record,
    Static,
} from 'runtypes';

export const IEmptyRuntype = Record({
});
type IEmpty = Static<typeof IEmptyRuntype>;
export default IEmpty;
