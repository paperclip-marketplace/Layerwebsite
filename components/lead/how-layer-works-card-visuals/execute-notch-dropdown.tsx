import Image from "next/image";
import { EXECUTE_CARD_ASSETS } from "./execute-card-assets";
import styles from "./execute-notch-dropdown.module.css";

/** Wave bar heights from Figma 1822:24195–24206 */
const WAVEFORM_BARS = [
  20.883, 11.602, 6.961, 23.203, 11.602, 6.961, 16.242, 4.641, 2.32, 6.961,
  11.602, 6.961,
] as const;

const WAVEFORM_MAX = 23.203;

/** Figma 1822:24189 — Notch dropdown panel (header + approval body) */
export function ExecuteNotchDropdown() {
  return (
    <div className={styles.panel} data-node-id="1822:24189">
      <div className={styles.header} data-node-id="1822:24190">
        <div className={styles.headerSlot} data-node-id="1822:24191">
          <div
            className={styles.iconWrap}
            data-node-id="1822:24192"
            data-name="icon"
          >
            <Image
              src={EXECUTE_CARD_ASSETS.notchIcon}
              alt=""
              fill
              className={styles.icon}
              aria-hidden
            />
          </div>
        </div>

        <div
          className={styles.camera}
          data-node-id="1822:24193"
          data-name="Camera"
        >
          <Image
            src={EXECUTE_CARD_ASSETS.notchCamera}
            alt=""
            fill
            className={styles.cameraImg}
            aria-hidden
          />
        </div>

        <div className={styles.waveform} aria-hidden data-node-id="1822:24194">
          {WAVEFORM_BARS.map((h, i) => (
            <span
              key={i}
              className={styles.waveBar}
              style={{ height: `${(h / WAVEFORM_MAX) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className={styles.body} data-node-id="1822:24207">
        <div className={styles.prompt} data-node-id="1822:24208">
          <p className={styles.promptLabel} data-node-id="1822:24209">
            Approval
          </p>
          <p className={styles.promptText} data-node-id="1822:24210">
            {"Discount represents 22%, this is above your approval authority of 15%.  Should I trigger approval flow? "}
          </p>
        </div>

        <div className={styles.options} data-node-id="1822:24211">
          <div className={styles.optionRow} data-node-id="1822:24212">
            <div className={styles.optionRowInner} data-node-id="1822:24213">
              <div className={styles.optionMain} data-node-id="1822:24214">
                <span className={styles.optionKey} data-node-id="1822:24215">
                  <span data-node-id="1822:24216">A</span>
                </span>
                <span className={styles.optionLabel} data-node-id="1822:24217">
                  Send Approval flow to Manager
                </span>
              </div>
              <div className={styles.shortcut} data-node-id="1822:24218">
                <span className={styles.shortcutGroup} data-node-id="1822:24219">
                  <span
                    className={styles.shortcutIconWrap}
                    data-node-id="1822:24220"
                  >
                    <Image
                      src={EXECUTE_CARD_ASSETS.notchOption}
                      alt=""
                      fill
                      className={styles.shortcutIcon}
                      aria-hidden
                    />
                  </span>
                  <span data-node-id="1822:24221">option</span>
                </span>
                <span
                  className="material-symbols-rounded"
                  aria-hidden
                  data-node-id="1822:24222"
                >
                  add
                </span>
                <span data-node-id="1822:24223">A</span>
              </div>
            </div>
          </div>

          <div className={styles.optionRow} data-node-id="1822:24224">
            <div className={styles.optionRowInner} data-node-id="1822:24225">
              <div className={styles.optionMain} data-node-id="1822:24226">
                <span className={styles.optionKey} data-node-id="1822:24227">
                  <span data-node-id="1822:24228">B</span>
                </span>
                <span className={styles.optionLabel} data-node-id="1822:24229">
                  Write and send custom response
                </span>
              </div>
              <div className={styles.shortcut} data-node-id="1822:24230">
                <span className={styles.shortcutGroup} data-node-id="1822:24231">
                  <span
                    className={styles.shortcutIconWrap}
                    data-node-id="1822:24232"
                  >
                    <Image
                      src={EXECUTE_CARD_ASSETS.notchCommand}
                      alt=""
                      fill
                      className={styles.shortcutIcon}
                      aria-hidden
                    />
                  </span>
                  <span data-node-id="1822:24234">command</span>
                </span>
                <span
                  className="material-symbols-rounded"
                  aria-hidden
                  data-node-id="1822:24235"
                >
                  add
                </span>
                <span data-node-id="1822:24236">T</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
