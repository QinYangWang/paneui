import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Icon({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="currentColor" aria-hidden {...props}>
      {children}
    </svg>
  );
}

// Thin round stroke for open glyphs.
const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// Trace every filled shape with this. It puffs the shape out a little and rounds all of its corners.
const puff = { stroke: "currentColor", strokeWidth: 1.5, strokeLinejoin: "round" } as const;

/* ───────────────────────── Basic glyphs (line) ───────────────────────── */

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M4.4 9.6l3 3 6.2-6.4" />
  </Icon>
);

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M9 4.2v9.6M4.2 9h9.6" />
  </Icon>
);

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M4.2 9h9.6" />
  </Icon>
);

export const XIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M5.1 5.1l7.8 7.8M12.9 5.1l-7.8 7.8" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M5.2 7.2L9 11l3.8-3.8" />
  </Icon>
);

export const ChevronUpIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M5.2 10.8L9 7l3.8 3.8" />
  </Icon>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M10.8 5.2L7 9l3.8 3.8" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M7.2 5.2L11 9l-3.8 3.8" />
  </Icon>
);

export const ChevronsUpDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M6 6.6l3-3 3 3M6 11.4l3 3 3-3" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M4 9h10M10 5l4 4-4 4" />
  </Icon>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M14 9H4M8 5L4 9l4 4" />
  </Icon>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M9 14V4M5 8l4-4 4 4" />
  </Icon>
);

export const ArrowDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M9 4v10M5 10l4 4 4-4" />
  </Icon>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M5.2 12.8l7.4-7.4M6.4 5.2h6.4v6.4" />
  </Icon>
);

export const ExternalLinkIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M8 4.2H6.2a2 2 0 00-2 2v5.6a2 2 0 002 2h5.6a2 2 0 002-2V10" />
    <path {...line} d="M10.4 3.9h3.7v3.7M14 4l-5 5" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M3.8 5.2h10.4M3.8 9h10.4M3.8 12.8h10.4" />
  </Icon>
);

export const ListIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M7.4 5.2h6.8M7.4 9h6.8M7.4 12.8h6.8M4.1 5.2h.01M4.1 9h.01M4.1 12.8h.01" />
  </Icon>
);

export const MoreHorizontalIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...puff} cx="4.4" cy="9" r=".55" />
    <circle {...puff} cx="9" cy="9" r=".55" />
    <circle {...puff} cx="13.6" cy="9" r=".55" />
  </Icon>
);

export const MoreVerticalIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...puff} cx="9" cy="4.4" r=".55" />
    <circle {...puff} cx="9" cy="9" r=".55" />
    <circle {...puff} cx="9" cy="13.6" r=".55" />
  </Icon>
);

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} strokeWidth={1.7} cx="8" cy="8" r="4.8" />
    <path {...line} strokeWidth={1.9} d="M11.6 11.6l2.8 2.8" />
  </Icon>
);

export const FilterIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M3.8 5.2h10.4M5.8 9h6.4M7.8 12.8h2.4" />
  </Icon>
);

export const SlidersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M3.8 6h3.4M10.8 6h3.4M3.8 12h6.4M13.6 12h.6" />
    <circle {...puff} cx="9" cy="6" r="1.1" />
    <circle {...puff} cx="12" cy="12" r="1.1" />
  </Icon>
);

export const SortIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M6 13.6V4.4M3.8 6.6L6 4.4l2.2 2.2M12 4.4v9.2M9.8 11.4l2.2 2.2 2.2-2.2" />
  </Icon>
);

export const RefreshIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M13.9 8.2A5 5 0 004.9 6M4.1 9.8a5 5 0 009 2.2" />
    <path {...line} d="M4.6 3.6v2.6h2.6M13.4 14.4v-2.6h-2.6" />
  </Icon>
);

export const LinkIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M8.1 5.6l1.1-1.1a3 3 0 014.3 4.3l-1.1 1.1M9.9 12.4l-1.1 1.1a3 3 0 01-4.3-4.3l1.1-1.1M7.2 10.8l3.6-3.6" />
  </Icon>
);

export const CopyIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...puff} x="7.2" y="7.2" width="6.8" height="6.8" rx="1.2" />
    <path {...line} d="M10.8 4.6a1.4 1.4 0 00-1.4-1H5a1.4 1.4 0 00-1.4 1.4v4.4a1.4 1.4 0 001 1.4" />
  </Icon>
);

export const UploadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M9 11V3.8M6 6.6l3-3 3 3M4 11.4v1.2a1.6 1.6 0 001.6 1.6h6.8a1.6 1.6 0 001.6-1.6v-1.2" />
  </Icon>
);

export const DownloadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M9 3.8V11M6 8l3 3 3-3M4 11.4v1.2a1.6 1.6 0 001.6 1.6h6.8a1.6 1.6 0 001.6-1.6v-1.2" />
  </Icon>
);

export const CodeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M6.2 5.4L2.9 9l3.3 3.6M11.8 5.4L15.1 9l-3.3 3.6" />
  </Icon>
);

export const TerminalIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M4.4 5.4L8 9l-3.6 3.6M9.8 12.8h3.8" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} cx="9" cy="9" r="5.8" />
    <path {...line} d="M9 5.9V9l2 1.4" />
  </Icon>
);

export const InfoIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} cx="9" cy="9" r="5.8" />
    <path {...line} d="M9 8.4v3.4M9 6h.01" />
  </Icon>
);

export const AlertCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} cx="9" cy="9" r="5.8" />
    <path {...line} d="M9 5.9v3.4M9 12h.01" />
  </Icon>
);

export const HelpCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} cx="9" cy="9" r="5.8" />
    <path {...line} d="M7.3 7.3a1.75 1.75 0 013.4.5c0 1.2-1.7 1.4-1.7 2.5M9 12.3h.01" />
  </Icon>
);

export const CheckCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} cx="9" cy="9" r="5.8" />
    <path {...line} d="M6.5 9.2l1.7 1.7 3.3-3.4" />
  </Icon>
);

export const XCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} cx="9" cy="9" r="5.8" />
    <path {...line} d="M7 7l4 4M11 7l-4 4" />
  </Icon>
);

export const WarningIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M7.7 4.2a1.5 1.5 0 012.6 0l4.2 7.6a1.5 1.5 0 01-1.3 2.2H4.8a1.5 1.5 0 01-1.3-2.2z" />
    <path {...line} d="M9 7.4v2.6M9 12h.01" />
  </Icon>
);

export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...line} cx="9" cy="9" r="5.8" />
    <path {...line} d="M3.4 9h11.2M9 3.2c1.6 1.6 2.4 3.5 2.4 5.8S10.6 13.2 9 14.8C7.4 13.2 6.6 11.3 6.6 9S7.4 4.8 9 3.2z" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...line} x="3.3" y="4.5" width="11.4" height="9" rx="2" />
    <path {...line} d="M4.4 6.4L9 9.6l4.6-3.2" />
  </Icon>
);

export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...line} x="3.4" y="4.4" width="11.2" height="10" rx="2" />
    <path {...line} d="M3.6 7.8h10.8M6.4 3.2v2.2M11.6 3.2v2.2" />
  </Icon>
);

export const SidebarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...line} x="3.3" y="3.8" width="11.4" height="10.4" rx="2" />
    <path {...line} d="M7.4 4v10" />
  </Icon>
);

export const GridIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...puff} x="4" y="4" width="3.6" height="3.6" rx=".6" />
    <rect {...puff} x="10.4" y="4" width="3.6" height="3.6" rx=".6" />
    <rect {...puff} x="4" y="10.4" width="3.6" height="3.6" rx=".6" />
    <rect {...puff} x="10.4" y="10.4" width="3.6" height="3.6" rx=".6" />
  </Icon>
);

export const EyeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M2.8 9c1.4-2.7 3.5-4.2 6.2-4.2s4.8 1.5 6.2 4.2c-1.4 2.7-3.5 4.2-6.2 4.2S4.2 11.7 2.8 9z" />
    <circle {...puff} cx="9" cy="9" r="1.2" />
  </Icon>
);

export const EyeOffIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M7.2 5.1A6 6 0 019 4.8c2.7 0 4.8 1.5 6.2 4.2a9 9 0 01-1.5 2.1M11.4 12.6a6 6 0 01-2.4.6C6.3 13.2 4.2 11.7 2.8 9a9 9 0 012.1-2.6" />
    <path {...line} d="M3.6 3.6l10.8 10.8" />
  </Icon>
);

export const LoaderIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M9 3.2a5.8 5.8 0 105.8 5.8" />
  </Icon>
);

/* ───────────────────────── Solid shapes (puff) ───────────────────────── */

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M9 14.3c-.3 0-.6-.1-.86-.27C5.2 12.1 3.2 10 3.2 7.35A2.95 2.95 0 019 6.05a2.95 2.95 0 015.8 1.3c0 2.65-2 4.75-4.94 6.68-.26.17-.56.27-.86.27z" />
  </Icon>
);

export const StarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M9 4.1l1.55 3.13 3.45.5-2.5 2.44.59 3.44L9 11.99l-3.09 1.62.59-3.44L4 7.73l3.45-.5z" />
  </Icon>
);

export const BoltIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M10.1 3.6L5 10.1h3.7L7.9 14.4 13 7.9H9.3z" />
  </Icon>
);

export const SparklesIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M7.6 4.6c.5 2.4 1.4 3.3 3.8 3.8-2.4.5-3.3 1.4-3.8 3.8-.5-2.4-1.4-3.3-3.8-3.8 2.4-.5 3.3-1.4 3.8-3.8z" />
    <path {...puff} d="M12.6 10.8c.25 1.2.7 1.65 1.9 1.9-1.2.25-1.65.7-1.9 1.9-.25-1.2-.7-1.65-1.9-1.9 1.2-.25 1.65-.7 1.9-1.9z" />
  </Icon>
);

export const HomeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M8.3 3.9a1.1 1.1 0 011.4 0l4 3.3c.3.2.4.5.4.9v5.1c0 .6-.5 1.1-1.1 1.1H5c-.6 0-1.1-.5-1.1-1.1V8.1c0-.4.1-.7.4-.9z" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...puff} cx="9" cy="6" r="2.3" />
    <path {...puff} d="M4.4 13.8c0-2.2 2-3.6 4.6-3.6s4.6 1.4 4.6 3.6c0 .4-.3.6-.7.6H5.1c-.4 0-.7-.2-.7-.6z" />
  </Icon>
);

export const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...puff} cx="7" cy="6.2" r="2" />
    <path {...puff} d="M3.2 13.7c0-2 1.6-3.2 3.8-3.2s3.8 1.2 3.8 3.2c0 .3-.2.5-.5.5H3.7c-.3 0-.5-.2-.5-.5z" />
    <path {...line} d="M11.6 4.6a1.9 1.9 0 010 3.4M13.2 10.8c.9.5 1.5 1.3 1.5 2.4" />
  </Icon>
);

export const SettingsIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      {...puff}
      fillRule="evenodd"
      d="M7.99 3.51 L10.01 3.51 L10.46 5.19 L11.69 5.86 L13.37 5.42 L14.38 7.1 L13.14 8.33 L13.14 9.67 L14.38 10.9 L13.37 12.58 L11.69 12.14 L10.46 12.81 L10.01 14.49 L7.99 14.49 L7.54 12.81 L6.31 12.14 L4.63 12.58 L3.62 10.9 L4.86 9.67 L4.86 8.33 L3.62 7.1 L4.63 5.42 L6.31 5.86 L7.54 5.19zM9 6.95a2.05 2.05 0 100 4.1 2.05 2.05 0 000-4.1z"
    />
  </Icon>
);

export const BellIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M9 3.6c-2.2 0-3.9 1.8-3.9 4v2.1l-.9 1.4c-.3.5 0 1 .5 1h8.6c.5 0 .8-.5.5-1l-.9-1.4V7.6c0-2.2-1.7-4-3.9-4z" />
    <path {...line} d="M7.6 14.4h2.8" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M6.4 8V6.3a2.6 2.6 0 015.2 0V8" />
    <rect {...puff} x="4.4" y="8.4" width="9.2" height="6" rx="1.3" />
  </Icon>
);

export const TrashIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M3.9 5.3h10.2M7.4 3.4h3.2" />
    <path {...puff} d="M5.3 7.3h7.4l-.55 6.2c-.05.6-.5 1-1.1 1H6.95c-.6 0-1.05-.4-1.1-1z" />
  </Icon>
);

export const EditIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M11.5 4.3a1.3 1.3 0 011.8 0l.4.4a1.3 1.3 0 010 1.8l-6.6 6.6-2.9.7.7-2.9z" />
  </Icon>
);

export const BookmarkIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M5.6 3.8h6.8c.5 0 .9.4.9.9v9c0 .4-.4.6-.7.4L9 11.9l-3.6 2.2c-.3.2-.7 0-.7-.4v-9c0-.5.4-.9.9-.9z" />
  </Icon>
);

export const FlagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M4.6 15V4" />
    <path {...puff} d="M5 4.4c2.6-1.4 4.4 1 7.8-.2.3-.1.6.1.6.4v5.6c0 .2-.1.4-.3.5-3.3 1.3-5.3-1.3-8.1.1z" />
  </Icon>
);

export const TagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      {...puff}
      fillRule="evenodd"
      d="M3.8 4.6v3.5c0 .3.1.6.3.8l5.2 5.2c.4.4 1 .4 1.4 0l3.4-3.4c.4-.4.4-1 0-1.4L8.9 4.1c-.2-.2-.5-.3-.8-.3H4.6c-.4 0-.8.4-.8.8zM6.7 5.4a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6z"
    />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      {...puff}
      fillRule="evenodd"
      d="M9 3.4c-2.5 0-4.4 1.9-4.4 4.3 0 2.9 2.8 5.3 3.8 6.1.4.3.8.3 1.2 0 1-.8 3.8-3.2 3.8-6.1 0-2.4-1.9-4.3-4.4-4.3zM9 5.9a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4z"
    />
  </Icon>
);

export const FolderIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M3.8 5.4c0-.6.5-1.1 1.1-1.1h2.6c.3 0 .6.1.8.4l.9 1h4c.6 0 1.1.5 1.1 1.1v6c0 .6-.5 1.1-1.1 1.1H4.9c-.6 0-1.1-.5-1.1-1.1z" />
  </Icon>
);

export const FileIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M5.6 3.6h3.9c.3 0 .5.1.7.3l3 3c.2.2.3.4.3.7v6.2c0 .6-.5 1.1-1.1 1.1H5.6c-.6 0-1.1-.5-1.1-1.1V4.7c0-.6.5-1.1 1.1-1.1z" />
  </Icon>
);

export const ImageIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...line} x="3.3" y="3.8" width="11.4" height="10.4" rx="2" />
    <circle {...puff} cx="6.9" cy="7.2" r=".7" />
    <path {...line} d="M4 13l3.4-3.2 2.2 2 1.6-1.4 2.8 2.4" />
  </Icon>
);

export const CameraIcon = (p: IconProps) => (
  <Icon {...p}>
    <path
      {...puff}
      fillRule="evenodd"
      d="M6.6 4.6c.2-.3.5-.5.9-.5h3c.4 0 .7.2.9.5l.6 1h1.3c.6 0 1.1.5 1.1 1.1v5.8c0 .6-.5 1.1-1.1 1.1H4.7c-.6 0-1.1-.5-1.1-1.1V6.7c0-.6.5-1.1 1.1-1.1H6zM9 7.3a2.2 2.2 0 100 4.4 2.2 2.2 0 000-4.4z"
    />
  </Icon>
);

export const ChatIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M5.1 4h7.8c.9 0 1.7.8 1.7 1.7v4.8c0 .9-.8 1.7-1.7 1.7H8.7l-2.6 2c-.3.2-.7 0-.7-.3v-1.7h-.3c-.9 0-1.7-.8-1.7-1.7V5.7C3.4 4.8 4.2 4 5.1 4z" />
  </Icon>
);

export const SendIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M4.1 4.3c-.3-.2-.7.1-.6.5L5 8.4c.1.2.1.4 0 .6l-1.5 3.6c-.1.4.3.7.6.5l9.6-4.1c.3-.1.3-.6 0-.7z" />
  </Icon>
);

export const MicIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...puff} x="7.1" y="3.5" width="3.8" height="6.6" rx="1.9" />
    <path {...line} d="M4.9 8.7a4.1 4.1 0 008.2 0M9 12.9v1.6" />
  </Icon>
);

export const AttachIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M13.3 8.6l-4.4 4.4a3 3 0 01-4.2-4.2l4.9-4.9a2 2 0 012.8 2.8l-4.8 4.8a1 1 0 01-1.4-1.4l4.3-4.3" />
  </Icon>
);

export const PlayIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M6 4.6c0-.6.6-.9 1.1-.6l6.3 4.4c.4.3.4.9 0 1.2L7.1 14c-.5.3-1.1 0-1.1-.6z" />
  </Icon>
);

export const PauseIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...puff} x="5" y="4.3" width="2.4" height="9.4" rx=".6" />
    <rect {...puff} x="10.6" y="4.3" width="2.4" height="9.4" rx=".6" />
  </Icon>
);

export const StopIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...puff} x="4.8" y="4.8" width="8.4" height="8.4" rx="1.4" />
  </Icon>
);

export const MonitorIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...line} x="3.1" y="3.6" width="11.8" height="8.2" rx="2" />
    <path {...line} d="M9 11.8v2.4M6.6 14.4h4.8" />
  </Icon>
);

export const SunIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...puff} cx="9" cy="9" r="2.4" />
    <path
      {...line}
      d="M9 3.3v.8M9 13.9v.8M3.3 9h.8M13.9 9h.8M4.97 4.97l.57.57M12.46 12.46l.57.57M4.97 13.03l.57-.57M12.46 5.54l.57-.57"
    />
  </Icon>
);

export const MoonIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M13.9 10.7A5.2 5.2 0 017.3 4.1a5.4 5.4 0 106.6 6.6z" />
  </Icon>
);

export const CloudIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M5.6 13.4a2.5 2.5 0 01-.4-5 3.9 3.9 0 017.4-.6 2.8 2.8 0 01.3 5.6z" />
  </Icon>
);

export const LightbulbIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M9 3.5a4.1 4.1 0 00-2.6 7.3c.4.3.6.7.6 1.2h4c0-.5.2-.9.6-1.2A4.1 4.1 0 009 3.5z" />
    <path {...line} d="M7.6 14.5h2.8" />
  </Icon>
);

export const ThumbsUpIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...puff} x="3.6" y="8" width="1.8" height="6" rx=".5" />
    <path {...puff} d="M7.4 8l2-4c.9 0 1.7.8 1.5 1.8L10.6 7.6h2.6c.8 0 1.4.8 1.2 1.6l-1 3.9c-.1.6-.7 1-1.3 1H7.4z" />
  </Icon>
);

export const ThumbsDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...puff} x="3.6" y="4" width="1.8" height="6" rx=".5" />
    <path {...puff} d="M7.4 10l2 4c.9 0 1.7-.8 1.5-1.8l-.3-1.8h2.6c.8 0 1.4-.8 1.2-1.6l-1-3.9c-.1-.6-.7-1-1.3-1H7.4z" />
  </Icon>
);

export const CartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M2.9 3.8h1.5l.5 1.6" />
    <path {...puff} d="M5.2 6.2h8.6c.4 0 .7.4.6.8l-.9 3.4c-.1.4-.5.7-.9.7H6.7c-.4 0-.8-.3-.9-.7z" />
    <circle {...puff} cx="7" cy="14" r=".6" />
    <circle {...puff} cx="12" cy="14" r=".6" />
  </Icon>
);

export const CreditCardIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...line} x="3.2" y="4.6" width="11.6" height="8.8" rx="2" />
    <path {...line} d="M3.4 7.6h11.2M5.8 11h2" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...puff} d="M8.6 3.6c.3-.1.5-.1.8 0l3.8 1.4c.4.2.6.5.6.9v2.8c0 2.6-1.7 4.6-4.4 5.6-.3.1-.5.1-.8 0-2.7-1-4.4-3-4.4-5.6V5.9c0-.4.2-.7.6-.9z" />
  </Icon>
);

export const KeyIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle {...puff} cx="6.4" cy="11.6" r="2.3" />
    <path {...line} d="M8.1 9.9l5.3-5.3M11.4 6.6l1.6 1.6" />
  </Icon>
);

export const LogOutIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M7.4 14.2H5.6a1.8 1.8 0 01-1.8-1.8V5.6a1.8 1.8 0 011.8-1.8h1.8M10.8 5.8L14 9l-3.2 3.2M13.8 9H7.6" />
  </Icon>
);

export const DatabaseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M3.9 5.2c0 1 2.3 1.8 5.1 1.8s5.1-.8 5.1-1.8-2.3-1.8-5.1-1.8-5.1.8-5.1 1.8zM3.9 5.2v7.6c0 1 2.3 1.8 5.1 1.8s5.1-.8 5.1-1.8V5.2M3.9 9c0 1 2.3 1.8 5.1 1.8s5.1-.8 5.1-1.8" />
  </Icon>
);

export const ChartIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect {...puff} x="4" y="9.6" width="2" height="4.4" rx=".5" />
    <rect {...puff} x="8" y="4" width="2" height="10" rx=".5" />
    <rect {...puff} x="12" y="7" width="2" height="7" rx=".5" />
  </Icon>
);

export const BotIcon = (p: IconProps) => (
  <Icon {...p}>
    <path {...line} d="M9 3.4v2.2" />
    <path
      {...puff}
      fillRule="evenodd"
      d="M5.4 6.4h7.2c.9 0 1.6.7 1.6 1.6v4.4c0 .9-.7 1.6-1.6 1.6H5.4c-.9 0-1.6-.7-1.6-1.6V8c0-.9.7-1.6 1.6-1.6zM6.9 8.65a1.45 1.45 0 100 2.9 1.45 1.45 0 000-2.9zM11.1 8.65a1.45 1.45 0 100 2.9 1.45 1.45 0 000-2.9z"
    />
  </Icon>
);
