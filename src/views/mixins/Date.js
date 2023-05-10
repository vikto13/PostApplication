
export const DateMixin = {
    methods: {
        getDate({ created_at, updated_at }) {
            return this.getTime(updated_at ? updated_at : created_at)
            // return `${date.getFullYear()}-${this.convertTwoDigit(date.getMonth() + 1)}-${this.convertTwoDigit(date.getDate())} ${this.convertTwoDigit(date.getUTCHours())}:${this.convertTwoDigit(date.getUTCMinutes())}:${date.getSeconds()}`;
        },
        convertTwoDigit: (data) => String(data).length == 1 ? `0${data}` : data,
        getTime(time) {
            if (!time) return '-'
            let date = new Date(time)
            let options = { timeZone: date.getTimezoneOffset(), hour12: false };
            return date.toLocaleString(options)
        }
    }
}