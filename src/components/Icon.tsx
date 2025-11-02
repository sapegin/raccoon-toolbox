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
