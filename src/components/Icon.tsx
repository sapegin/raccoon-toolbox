import { IconBase } from './IconBase';

interface IconInfo {
  path?: string;
  children?: React.ReactElement;
  size?: number;
}

// Icons from https://iconoir.com/

const BASE_SIZE = 24;
const DEFAULT_SIZE = 24;
const ICONS: Record<string, IconInfo> = {
  sidebar: {
    children: (
      <>
        <path
          d="M19 21L5 21C3.89543 21 3 20.1046 3 19L3 5C3 3.89543 3.89543 3 5 3L19 3C20.1046 3 21 3.89543 21 5L21 19C21 20.1046 20.1046 21 19 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M9.5 21V3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </>
    ),
  },
  search: {
    children: (
      <>
        <path
          d="M17 17L21 21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </>
    ),
  },
};

export type IconName = keyof typeof ICONS;

interface Props {
  icon: IconName;
  size?: number;
}

export function Icon({ icon, size = DEFAULT_SIZE }: Props) {
  const { path, size: baseSize, children } = ICONS[icon];
  return (
    <IconBase
      viewBox={{
        width: baseSize ?? BASE_SIZE,
        height: baseSize ?? BASE_SIZE,
      }}
      width={size}
      height={size}
    >
      {path && <path d={path} />}
      {children}
    </IconBase>
  );
}
