import {
    Boolean,
    Record,
    Static,
} from 'runtypes';

export const IAppleRuntype = Record({
    isGreen: Boolean,
    isYummy: Boolean,
});
type IApple = Static<typeof IAppleRuntype>;
export default IApple;
