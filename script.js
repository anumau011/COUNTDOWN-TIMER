// Timer Module
const Timer = {
    interval: null,
    targetDate: null,

    init(targetDate) {
        this.targetDate = new Date(targetDate).getTime();
        this.stop();
        this.start();
    },

    start() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    },

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    },

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.stop();
            Display.showExpired();
            return;
        }

        const timeData = this.calculateTime(distance);
        Display.updateTime(timeData);
        Display.showActive();
    },

    calculateTime(distance) {
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
    }
};

// Display Module
const Display = {
    elements: {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        message: document.getElementById('message')
    },

    updateTime(timeData) {
        this.elements.days.textContent = this.formatNumber(timeData.days);
        this.elements.hours.textContent = this.formatNumber(timeData.hours);
        this.elements.minutes.textContent = this.formatNumber(timeData.minutes);
        this.elements.seconds.textContent = this.formatNumber(timeData.seconds);
    },

    formatNumber(num) {
        return num.toString().padStart(2, '0');
    },

    showMessage(text, className) {
        this.elements.message.textContent = text;
        this.elements.message.className = `message show ${className}`;
    },

    hideMessage() {
        this.elements.message.className = 'message';
    },

    showExpired() {
        this.showMessage("🎉 Time's Up!", 'expired');
    },

    showActive() {
        this.showMessage('⏳ Countdown Active', 'active');
    }
};

// Input Handler Module
const InputHandler = {
    elements: {
        dateInput: document.getElementById('targetDate'),
        startBtn: document.getElementById('startBtn')
    },

    init() {
        this.setMinDateTime();
        this.elements.startBtn.addEventListener('click', () => this.handleStart());
    },

    setMinDateTime() {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        this.elements.dateInput.min = now.toISOString().slice(0, 16);
    },

    handleStart() {
        const dateValue = this.elements.dateInput.value;

        if (!dateValue) {
            alert('Please select a date and time!');
            return;
        }

        const selectedDate = new Date(dateValue);
        const now = new Date();

        if (selectedDate <= now) {
            alert('Please select a future date and time!');
            return;
        }

        Timer.init(dateValue);
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    InputHandler.init();
});
