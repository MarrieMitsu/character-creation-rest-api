// Interface
interface DatetimeFormatProp {
    toMysql(): string;
}

// DatetimeFormat
export default class DatetimeFormat implements DatetimeFormatProp {
    private dd(d: number) {
        if (0 <= d && d < 10) return "0" + d.toString();
        if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
        return d.toString();
    }
    toMysql(): string {
        const date = new Date;
        return date.getFullYear() + "-" + this.dd(1 + date.getMonth()) + "-" + this.dd(date.getDate()) + " " + this.dd(date.getHours()) + ":" + this.dd(date.getMinutes()) + ":" + this.dd(date.getSeconds());
    }
}