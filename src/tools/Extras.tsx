import { css } from '../../styled-system/css';
import { Link, Stack } from '../../styled-system/jsx';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { Text } from '../components/Text';
import { externalTools } from '../externalTools';
import { getShortcut } from '../util/getShortcut';

export function Extras() {
  return (
    <Screen title="More tools">
      <Stack gap="m" overflow="auto" p="s">
        <Text>
          Other useful tools and resources. Press {getShortcut('K')} for search.
        </Text>
        <Stack as="ul" gap="s">
          {externalTools.map((tool) => (
            <li key={tool.name}>
              <Link
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  gap: 'xs',
                })}
              >
                <span>{tool.name}</span>
                <span>
                  <Icon icon="external" size={12} />
                </span>
              </Link>
            </li>
          ))}
        </Stack>
      </Stack>
    </Screen>
  );
}
