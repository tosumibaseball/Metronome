window.metronome = {

    timer: null,

    audioCtx: null,

    click() {

        if (!this.audioCtx)
            this.audioCtx = new AudioContext();

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "square";
        osc.frequency.value = 1000;

        gain.gain.value = 0.25;

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            this.audioCtx.currentTime + 0.04);

        osc.stop(this.audioCtx.currentTime + 0.04);
    },

    start(bpm) {

        this.stop();

        const interval = 60000 / bpm;

        this.click();

        this.timer = setInterval(() => {
            this.click();
        }, interval);

    },

    stop() {

        if (this.timer)
            clearInterval(this.timer);

        this.timer = null;

    },

    setTempo(bpm) {

        if (this.timer)
            this.start(bpm);

    }

};