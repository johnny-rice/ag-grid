var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ContinuousScale } from './continuousScale';
import generateTicks, { range } from '../util/ticks';
import { format } from '../util/numberFormat';
import { NUMBER, Validate } from '../util/validation';
const identity = (x) => x;
export class LogScale extends ContinuousScale {
    constructor() {
        super([1, 10], [0, 1]);
        this.type = 'log';
        this.base = 10;
        this.cacheProps = ['domain', 'range', 'nice', 'tickCount', 'base'];
        this.baseLog = identity;
        this.basePow = identity;
        this.log = (x) => {
            return this.domain[0] >= 0 ? this.baseLog(x) : -this.baseLog(-x);
        };
        this.pow = (x) => {
            return this.domain[0] >= 0 ? this.basePow(x) : -this.basePow(-x);
        };
    }
    toDomain(d) {
        return d;
    }
    transform(x) {
        return this.domain[0] >= 0 ? Math.log(x) : -Math.log(-x);
    }
    transformInvert(x) {
        return this.domain[0] >= 0 ? Math.exp(x) : -Math.exp(-x);
    }
    update() {
        if (!this.domain || this.domain.length < 2) {
            return;
        }
        this.updateLogFn();
        this.updatePowFn();
        if (this.nice) {
            this.updateNiceDomain();
        }
    }
    updateLogFn() {
        const { base } = this;
        let log;
        if (base === 10) {
            log = Math.log10;
        }
        else if (base === Math.E) {
            log = Math.log;
        }
        else if (base === 2) {
            log = Math.log2;
        }
        else {
            const logBase = Math.log(base);
            log = (x) => Math.log(x) / logBase;
        }
        this.baseLog = log;
    }
    updatePowFn() {
        const { base } = this;
        let pow;
        if (base === 10) {
            pow = LogScale.pow10;
        }
        else if (base === Math.E) {
            pow = Math.exp;
        }
        else {
            pow = (x) => Math.pow(base, x);
        }
        this.basePow = pow;
    }
    updateNiceDomain() {
        const [d0, d1] = this.domain;
        const n0 = this.pow(Math.floor(this.log(d0)));
        const n1 = this.pow(Math.ceil(this.log(d1)));
        this.niceDomain = [n0, n1];
    }
    static pow10(x) {
        return x >= 0 ? Math.pow(10, x) : 1 / Math.pow(10, -x);
    }
    ticks() {
        var _a;
        const count = (_a = this.tickCount) !== null && _a !== void 0 ? _a : 10;
        if (!this.domain || this.domain.length < 2 || count < 1) {
            return [];
        }
        this.refresh();
        const base = this.base;
        const [d0, d1] = this.getDomain();
        let p0 = this.log(d0);
        let p1 = this.log(d1);
        if (this.interval) {
            const step = Math.abs(this.interval);
            const absDiff = Math.abs(p1 - p0);
            const ticks = range(p0, p1, Math.min(absDiff, step))
                .map((x) => this.pow(x))
                .filter((t) => t >= d0 && t <= d1);
            if (!this.isDenseInterval({ start: d0, stop: d1, interval: step, count: ticks.length })) {
                return ticks;
            }
        }
        const isBaseInteger = base % 1 === 0;
        const isDiffLarge = p1 - p0 >= count;
        if (!isBaseInteger || isDiffLarge) {
            // Returns [10^1, 10^2, 10^3, 10^4, ...]
            return generateTicks(p0, p1, Math.min(p1 - p0, count)).map((x) => this.pow(x));
        }
        const ticks = [];
        const isPositive = d0 > 0;
        p0 = Math.floor(p0) - 1;
        p1 = Math.round(p1) + 1;
        const min = Math.min(...this.range);
        const max = Math.max(...this.range);
        const availableSpacing = (max - min) / count;
        let lastTickPosition = Infinity;
        for (let p = p0; p <= p1; p++) {
            const nextMagnitudeTickPosition = this.convert(this.pow(p + 1));
            for (let k = 1; k < base; k++) {
                const q = isPositive ? k : base - k + 1;
                const t = this.pow(p) * q;
                const tickPosition = this.convert(t);
                const prevSpacing = Math.abs(lastTickPosition - tickPosition);
                const nextSpacing = Math.abs(tickPosition - nextMagnitudeTickPosition);
                const fits = prevSpacing >= availableSpacing && nextSpacing >= availableSpacing;
                if (t >= d0 && t <= d1 && (k === 1 || fits)) {
                    ticks.push(t);
                    lastTickPosition = tickPosition;
                }
            }
        }
        return ticks;
    }
    tickFormat({ count, ticks, specifier, }) {
        const { base } = this;
        if (specifier == null) {
            specifier = (base === 10 ? '.0e' : ',');
        }
        if (typeof specifier !== 'function') {
            specifier = format(specifier);
        }
        if (count === Infinity) {
            return specifier;
        }
        if (ticks == null) {
            this.ticks();
        }
        return (d) => {
            return specifier(d);
        };
    }
}
__decorate([
    Validate(NUMBER(0))
], LogScale.prototype, "base", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nU2NhbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NhbGUvbG9nU2NhbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXRELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFL0IsTUFBTSxPQUFPLFFBQVMsU0FBUSxlQUF1QjtJQUdqRDtRQUNJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBSGxCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFXdEIsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQVNBLGVBQVUsR0FBc0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFhbkYsWUFBTyxHQUEwQixRQUFRLENBQUM7UUFDMUMsWUFBTyxHQUEwQixRQUFRLENBQUM7UUFFMUMsUUFBRyxHQUFHLENBQUMsQ0FBUyxFQUFFLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDO1FBRU0sUUFBRyxHQUFHLENBQUMs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UUFFN0IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQVM7UUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELEtBQUs7O1FBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBQSxJQUFJLENBQUMsU0FBUyxtQ0FBSSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDckQsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFbEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVB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