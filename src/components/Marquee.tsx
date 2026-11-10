import { MARQUEE } from "@/lib/data";

export default function Marquee() {
  const track = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee">
      <p className="sr-only">Crypto locked in a smart contract. Pay the seller directly. Release only after payment arrives. Public vouches.</p>
      <div className="mq-track" aria-hidden>
        {track.map((m, i) => (
          <span key={i}>
            {m}
            <i aria-hidden> ◆ </i>
          </span>
        ))}
      </div>
    </div>
  );
}
