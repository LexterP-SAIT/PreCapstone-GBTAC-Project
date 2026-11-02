// A walking researcher, feet at (0,0). Legs swing through the .leg CSS animation while the parent has class "walking".
interface PersonProps {
  coat: string;
  arm: string;
  pants: string;
  cap?: string;
  capBrim?: string;
  hardHat?: boolean;
  carry?: "clipboard" | "plans";
}

const Person = ({ coat, arm, pants, cap, capBrim, hardHat = false, carry = "clipboard" }: PersonProps) => {
  return (
    <g>
      <ellipse cx="2" cy="2" rx="26" ry="5" fill="#2F6B2A" opacity=".25" />
      <g className="leg">
        <rect x="-12" y="-54" width="11" height="54" rx="4" fill="#F2C9A5" /><rect x="-12" y="-54" width="11" height="26" rx="4" fill={pants} />
        <rect x="-14" y="-9" width="16" height="9" rx="3.5" fill="#F4F6F8" />
      </g>
      <g className="leg b">
        <rect x="2" y="-54" width="11" height="54" rx="4" fill="#F2C9A5" /><rect x="2" y="-54" width="11" height="26" rx="4" fill={pants} />
        <rect x="0" y="-9" width="16" height="9" rx="3.5" fill="#F4F6F8" />
      </g>
      <rect x="-17" y="-102" width="34" height="56" rx="11" fill={coat} />
      <circle cx="2" cy="-118" r="12" fill="#F2C9A5" />
      {hardHat ? (
        <>
          <path d="M-12 -121 A14 14 0 0 1 16 -121 Z" fill="#F2B632" />
          <rect x="-14" y="-122" width="34" height="4" rx="2" fill="#D99A14" />
        </>
      ) : (
        <>
          <path d="M-11 -120 A13 13 0 0 1 15 -120 Z" fill={cap} />
          <rect x="2" y="-123" width="24" height="5" rx="2.5" fill={capBrim} />
        </>
      )}
      <rect x="6" y="-98" width="9" height="36" rx="4.5" fill={arm} />
      {carry === "plans" ? (
        <>
          <rect x="12" y="-96" width="9" height="42" rx="4.5" fill="#3D7BC7" stroke="#1E4C82" strokeWidth="1.5" />
          <circle cx="16.5" cy="-66" r="4.5" fill="#F2C9A5" />
        </>
      ) : (
        <>
          <rect x="13" y="-86" width="24" height="31" rx="2" fill="#fff" stroke="#2B3A45" strokeWidth="2" />
          <rect x="20" y="-89" width="10" height="6" rx="1" fill="#2B3A45" />
          <path d="M17 -77h16M17 -71h16M17 -65h9" stroke="#8D9BAA" strokeWidth="2" />
          <circle cx="13" cy="-62" r="4.5" fill="#F2C9A5" />
        </>
      )}
    </g>
  );
};

export default Person;
