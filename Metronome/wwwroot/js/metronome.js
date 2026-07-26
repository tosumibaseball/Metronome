window.metronome = {

    timer: null,

    bpm: 85,

    audioContext: null,


    start: function (bpm) {

        this.bpm = bpm;

        this.stop();

        if (!this.audioContext) {
            this.audioContext =
                new (window.AudioContext ||
                    window.webkitAudioContext)();
        }

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

        this.animateBeat();

        this.playClick();

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


    playClick: function () {

        if (!this.audioContext)
            return;


        let oscillator =
            this.audioContext.createOscillator();

        let gain =
            this.audioContext.createGain();


        oscillator.frequency.value = 1200;

        gain.gain.value = 0.15;


        oscillator.connect(gain);

        gain.connect(
            this.audioContext.destination);


        oscillator.start();

        oscillator.stop(
            this.audioContext.currentTime + 0.05);

    },


    registerKeyboard: function (dotnet) {

        document.addEventListener(
            "keydown",
            function (e) {


                if (e.code === "Space") {

                    e.preventDefault();

                    dotnet.invokeMethodAsync(
                        "KeyboardToggle");

                }


                if (e.code === "ArrowUp") {

                    dotnet.invokeMethodAsync(
                        "KeyboardTempoChange",
                        1);

                }


                if (e.code === "ArrowDown") {

                    dotnet.invokeMethodAsync(
                        "KeyboardTempoChange",
                        -1);

                }

            });

    }

};