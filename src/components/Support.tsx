import { LINKS } from "@/lib/data";
import { TelegramIcon } from "./Icons";

export default function Support() {
  return (
    <section className="sec" id="support">
      <div className="wrap">
        <div className="sec-head rv">
          <h2>Support lives in Telegram, same as the bot.</h2>
        </div>
        <div className="sup-grid rv">
          <a className="sup-cell" href={LINKS.support} target="_blank" rel="noopener noreferrer">
            <span className="role">Support</span>
            <span className="handle">{LINKS.supportHandle}</span>
            <span className="note">Deals, disputes, account access</span>
          </a>
          <a className="sup-cell" href={LINKS.line1} target="_blank" rel="noopener noreferrer">
            <span className="role">Support · line 2</span>
            <span className="handle">@zvaku</span>
            <span className="note">Backup contact</span>
          </a>
          <a className="sup-cell" href={LINKS.developer} target="_blank" rel="noopener noreferrer">
            <span className="role">Developer</span>
            <span className="handle">@letef</span>
            <span className="note">Same person behind the bot</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final">
      <div className="wrap">
        <div className="in">
          <div>
            <h2>Open a deal.</h2>
            <p className="sub">
              Join <a href={LINKS.group} target="_blank" rel="noopener noreferrer">{LINKS.groupHandle}</a> and{" "}
              <a href={LINKS.channel} target="_blank" rel="noopener noreferrer">{LINKS.channelHandle}</a>, then run /deal.
            </p>
          </div>
          <a className="btn btn-y" href={LINKS.bot} target="_blank" rel="noopener noreferrer">
            <TelegramIcon /> Open Telegram Bot
          </a>
        </div>
      </div>
    </section>
  );
}
