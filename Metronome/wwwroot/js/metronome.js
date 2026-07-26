window.metronome = {

    timer: null,

    bpm: 85,


    start: function (bpm) {

        this.bpm = bpm;

        this.stop();

        this.timer = setInterval(() => {

            this.tick();

        }, 60000 / this.bpm);

    },


    stop: function () {

        if (this.timer) {

            clearInterval(this.timer);
            this.timer = null;

        }

    },


    setTempo: function (bpm) {

        this.bpm = bpm;

        if (this.timer) {

            this.start(bpm);

        }

    },


    tick: function () {

        let element =
            document.querySelector(".beat");


        if (element) {
            element.classList.remove("active");

            void element.offsetWidth;

            element.classList.add("active");
        }


        let audio =
            new AudioContext();


        let oscillator =
            audio.createOscillator();


        oscillator.frequency.value = 1000;

        oscillator.connect(
            audio.destination);

        oscillator.start();

        oscillator.stop(
            audio.currentTime + .05);

    }

};