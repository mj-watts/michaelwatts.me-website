---
title: "Exploring possibilities of Tone.js"
pubDate: 2025-08-20
description: "A deep dive into Tone.js synthesisers, envelopes, and effects - creating rich sonic landscapes in the browser."
author: "Michael Watts"
readTime: 5
tags: ["javascript", "music"]
draft: true
---

Web audio has come a long way since the early days of simple beeps and clicks. With Tone.js, we can now create sophisticated synthesised sounds, complex effect chains, and interactive musical experiences right in the browser. Let's explore what makes this library so powerful, particularly when it comes to synthesisers, envelopes, and effects.

## What is Tone.js?

Tone.js is a comprehensive Web Audio framework that provides high-level abstractions for creating music and audio applications. Built on top of the Web Audio API, it offers everything from simple oscillators to complex synthesisers and effects processors, all wrapped in an intuitive, well-documented interface.

## Synthesisers: The Heart of Electronic Music

At its core, a synthesiser generates and shapes sound waves. Tone.js provides several synthesiser types, each with its own character:

### Basic Synthesiser Types

- **Synth**: A simple monophonic synthesiser with one oscillator
- **AMSynth**: Uses amplitude modulation for rich, metallic tones
- **FMSynth**: Employs frequency modulation for bell-like and percussive sounds
- **PolySynth**: Enables polyphonic playback by managing multiple voices

#### More about sythesiser types in this great video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/vuWl9EMDMIU?si=sHaTMJj8DkRABQIv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The beauty of Tone.js synthesisers lies in their flexibility. Each oscillator can use different waveforms (sine, square, sawtooth, triangle), and you can easily modify their parameters in real-time.

## Envelopes: Shaping Sound Over Time

An envelope controls how a parameter changes over time, typically following the classic ADSR model:

- **Attack**: How quickly the sound reaches its peak
- **Decay**: How quickly it falls to the sustain level
- **Sustain**: The level maintained whilst a note is held
- **Release**: How quickly the sound fades after release

Envelopes can control not just volume, but any parameter - filter cutoff, oscillator pitch, or effect parameters. This is where sonic sculpting becomes truly creative.

## Effects: Adding Character and Space

Tone.js includes a comprehensive effects library:

- **Filters**: Shape frequency content (low-pass, high-pass, band-pass)
- **Distortion**: Add harmonic saturation and grit
- **Delay**: Create echoes and rhythmic patterns
- **Reverb**: Add spatial depth and ambience
- **Chorus**: Thicken sounds with modulated delays
- **Compressor**: Control dynamics and add punch

Effects can be chained together, creating complex signal paths that transform basic synthesiser outputs into rich, evolving textures.

## Bringing It All Together: A Practical Example

Here's a complete example that demonstrates synthesisers, envelopes, and effects working together. This creates an atmospheric pad sound with evolving filter sweeps:

<iframe height="700" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/altescape/embed/ZYbrMNP?default-tab=&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/altescape/pen/ZYbrMNP">
  Untitled</a> by Michael Watts (<a href="https://codepen.io/altescape">@altescape</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

And a look at the code:

```html title="synth.html"
<!DOCTYPE html>
<html>
  <head>
    <title>Tone.js Exploration</title>
    <script src="https://unpkg.com/tone@15.1.22/build/Tone.js"></script>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: #1a1a1a;
        color: #fff;
      }
      .controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin: 20px 0;
      }
      .control-group {
        background: #333;
        padding: 15px;
        border-radius: 8px;
      }
      button {
        background: #4caf50;
        border: none;
        color: white;
        padding: 10px 20px;
        font-size: var(--font-size-base);
        border-radius: 4px;
        cursor: pointer;
        margin: 5px;
      }
      button:hover {
        background: #45a049;
      }
      input[type="range"] {
        width: 100%;
        margin: 10px 0;
      }
      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1>Tone.js Sound Explorer</h1>

    <div class="controls">
      <div class="control-group">
        <h3>Playback</h3>
        <button id="startBtn">Start Audio Context</button>
        <button id="playChord">Play Atmospheric Chord</button>
        <button id="playSequence">Play Sequence</button>
      </div>

      <div class="control-group">
        <h3>Filter</h3>
        <label for="cutoff">Filter Cutoff</label>
        <input type="range" id="cutoff" min="100" max="8000" value="2000" />
        <label for="resonance">Resonance</label>
        <input
          type="range"
          id="resonance"
          min="0"
          max="15"
          value="5"
          step="0.1"
        />
      </div>

      <div class="control-group">
        <h3>Effects</h3>
        <label for="reverbWet">Reverb Amount</label>
        <input
          type="range"
          id="reverbWet"
          min="0"
          max="1"
          value="0.3"
          step="0.01"
        />
        <label for="delayTime">Delay Time</label>
        <input
          type="range"
          id="delayTime"
          min="0"
          max="1"
          value="0.25"
          step="0.01"
        />
      </div>

      <div class="control-group">
        <h3>Envelope</h3>
        <label for="attack">Attack</label>
        <input
          type="range"
          id="attack"
          min="0.01"
          max="2"
          value="0.5"
          step="0.01"
        />
        <label for="release">Release</label>
        <input
          type="range"
          id="release"
          min="0.1"
          max="5"
          value="2"
          step="0.1"
        />
      </div>
    </div>

    <script>
      // Create the audio chain
      const filter = new Tone.Filter({
        frequency: 2000,
        type: "lowpass",
        Q: 5,
      });

      const reverb = new Tone.Reverb({
        decay: 4,
        wet: 0.3,
      });

      const delay = new Tone.FeedbackDelay({
        delayTime: "8n",
        feedback: 0.3,
        wet: 0.2,
      });

      // Create a polyphonic synth for chords
      const synth = new Tone.PolySynth(Tone.AMSynth, {
        oscillator: {
          type: "sawtooth",
        },
        envelope: {
          attack: 0.5,
          decay: 0.2,
          sustain: 0.8,
          release: 2,
        },
        modulation: {
          type: "sine",
        },
        modulationEnvelope: {
          attack: 0.1,
          decay: 0.2,
          sustain: 0.3,
          release: 1,
        },
      });

      // Connect the audio chain
      synth.connect(filter);
      filter.connect(delay);
      delay.connect(reverb);
      reverb.toDestination();

      // Create an LFO to modulate the filter
      const filterLFO = new Tone.LFO({
        frequency: 0.2,
        min: 200,
        max: 4000,
      });
      filterLFO.connect(filter.frequency);

      // Event handlers
      document
        .getElementById("startBtn")
        .addEventListener("click", async () => {
          if (Tone.context.state !== "running") {
            await Tone.start();
            filterLFO.start();
            console.log("Audio context started");
          }
        });

      document.getElementById("playChord").addEventListener("click", () => {
        // Play an atmospheric chord progression
        const chords = [
          ["C3", "E3", "G3", "B3"],
          ["A2", "C3", "E3", "A3"],
          ["F2", "A2", "C3", "F3"],
          ["G2", "B2", "D3", "G3"],
        ];

        let time = Tone.now();
        chords.forEach((chord, index) => {
          synth.triggerAttackRelease(chord, "2n", time + index * 2);
        });
      });

      document.getElementById("playSequence").addEventListener("click", () => {
        // Create a sequence with evolving parameters
        const sequence = new Tone.Sequence(
          (time, note) => {
            synth.triggerAttackRelease(note, "8n", time);
            // Modulate filter cutoff during sequence
            filter.frequency.rampTo(Math.random() * 3000 + 500, "8n");
          },
          ["C4", "E4", "G4", "C5", "G4", "E4"],
          "8n"
        );

        sequence.start();
        Tone.Transport.start();

        // Stop after 8 bars
        setTimeout(() => {
          sequence.stop();
          Tone.Transport.stop();
        }, 8000);
      });

      // Real-time parameter controls
      document.getElementById("cutoff").addEventListener("input", (e) => {
        filter.frequency.value = e.target.value;
      });

      document.getElementById("resonance").addEventListener("input", (e) => {
        filter.Q.value = e.target.value;
      });

      document.getElementById("reverbWet").addEventListener("input", (e) => {
        reverb.wet.value = e.target.value;
      });

      document.getElementById("delayTime").addEventListener("input", (e) => {
        delay.delayTime.value = e.target.value;
      });

      document.getElementById("attack").addEventListener("input", (e) => {
        synth.set({ envelope: { attack: e.target.value } });
      });

      document.getElementById("release").addEventListener("input", (e) => {
        synth.set({ envelope: { release: e.target.value } });
      });
    </script>
  </body>
</html>
```
