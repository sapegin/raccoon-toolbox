import { Screen } from '../components/Screen';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { Icon } from '../components/Icon';
import { css } from '../../styled-system/css';
import { externalTools } from '../externalTools';
import { getShortcut } from '../util/getShortcut';
import { Link } from '../../styled-system/jsx';

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
