class Clock {
    constructor() {
        // 1. Create a Date object.
        const now = new Date();
        // 2. Store the hours, minutes, and seconds.
        this.hours = now.getHours();
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
        // 3. Call printTime.
        this.printTime();
        // 4. Schedule the tick at 1 second intervals.
        setInterval(this._tick.bind(this), 1000);
    }

    printTime() {
        // Format the time in HH:MM:SS
        const timeStr = [this.hours, this.minutes, this.seconds].join(":"); 
        
        // Use console.log to print it.
        console.log(timeStr);
    }

    _tick() {
        // 1. Increment the time by one second.
        this._incrementSeconds();
        // 2. Call printTime.
        this.printTime();
        
    }

    _incrementSeconds() {
        this.seconds += 1;
        if (this.seconds === 60) {
            this.seconds = 0;
            this._incrementMinutes();
        }
    }

    _incrementMinutes() {
        this.seconds += 1;
        if (this.seconds === 60) {
            this.seconds = 0;
            this._incrementHours();
        }
    }
    _incrementHours(){
        this.hours = (this.hours + 1) % 24;
    }
}

// const clock = new Clock();