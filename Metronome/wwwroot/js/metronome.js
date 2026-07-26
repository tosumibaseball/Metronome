window.metronome = {


    timer: null,

    bpm: 85,

    beat: 0,

    beatsPerMeasure: 4,

    volume: 0.5,

    audioContext: null,


    start: function (bpm, beats, volume) {

        this.bpm = bpm;

        this.beatsPerMeasure = beats;

        this.volume = volume;


        this.stop();


        if (!this.audioContext) {
            this.audioContext =
                new AudioContext();
        }


        this.timer = setInterval(() => {
            this.tick();

        }, 60000 / this.bpm);

    },



    stop: function () {

        clearInterval(this.timer);

        this.timer = null;

        this.beat = 0;

    },



    setTempo: function (bpm) {
        this.bpm = bpm;

        if (this.timer)
            this.start(
                this.bpm,
                this.beatsPerMeasure,
                this.volume);
    },



    setBeatsPerMeasure: function (value) {
        this.beatsPerMeasure = value;
    },



    setVolume: function (value) {
        this.volume = value;
    },



    tick: function () {

        this.beat++;


        if (this.beat >
            this.beatsPerMeasure) {
            this.beat = 1;
        }


        this.animateBeat();


        this.playClick(
            this.beat === 1);

    },



    animateBeat: function () {

        let beat =
            document.querySelector(".beat");


        if (beat) {
            beat.classList.remove("active");

            void beat.offsetWidth;

            beat.classList.add("active");
        }

    },



    playClick: function (accent) {

        let osc =
            this.audioContext.createOscillator();


        let gain =
            this.audioContext.createGain();



        osc.frequency.value =
            accent ? 1600 : 1000;


        gain.gain.value =
            this.volume;



        osc.connect(gain);

        gain.connect(
            this.audioContext.destination);



        osc.start();

        osc.stop(
            this.audioContext.currentTime + .05);

    }

};