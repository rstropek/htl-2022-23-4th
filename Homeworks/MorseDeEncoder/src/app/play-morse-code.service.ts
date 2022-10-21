import { Injectable } from '@angular/core';

/** Duration of a dot sound */
export const DOT_TIME = 50;

/** Duration of a dash sound */
export const DASH_TIME = DOT_TIME * 3;

/** Waiting time between dashes and dots */
export const SYMBOL_BREAK = DOT_TIME;

/** Waiting time between dashes and dots */
export const LETTER_BREAK = DOT_TIME * 3;

/** Waiting time between words */
export const WORD_BREAK = DOT_TIME * 7;

@Injectable({
  providedIn: 'root'
})
export class PlayMorseCodeService {
  note_context?: AudioContext;
  note_node?: OscillatorNode;
  gain_node?: GainNode;

  public initializeAudioContext() {
    this.note_context = new AudioContext();
    this.note_node = this.note_context.createOscillator();
    this.gain_node = this.note_context.createGain();
    this.note_node.frequency.value = 440;
    this.gain_node.gain.value = 0;
    this.note_node.connect(this.gain_node);
    this.gain_node.connect(this.note_context.destination);
    this.note_node.start();
  }

  public startNotePlaying() {
    // Pass a start time of 0 so it starts ramping up immediately.
    this.gain_node?.gain.setTargetAtTime(0.1, 0, 0.001)
  }

  public stopNotePlaying() {
    // Pass a start time of 0 so it starts ramping down immediately.
    this.gain_node?.gain.setTargetAtTime(0, 0, 0.001)
  }

  /** Sleep for a given amount of miliseconds */
  public sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** Play a dash sound */
  public async playDash() {
    this.startNotePlaying();
    await this.sleep(DASH_TIME);
    this.stopNotePlaying();
  }

  /** Play a dot sound */
  public async playDot() {
    this.startNotePlaying();
    await this.sleep(DOT_TIME);
    this.stopNotePlaying();
  }
}