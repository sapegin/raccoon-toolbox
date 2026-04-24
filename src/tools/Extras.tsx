import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { externalTools } from '../externalTools';
import { getShortcut } from '../util/getShortcut';

export function Extras() {
  return (
    <Screen title="More tools">
      <div className="flex flex-col gap-4 overflow-auto p-2">
        <p className="typo-body">
          Other useful tools and resources. Press {getShortcut('K')} for search.
        </p>
        <ul className="flex flex-col gap-2">
          {externalTools.map((tool) => (
            <li key={tool.name}>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex link items-baseline gap-1"
              >
                <span>{tool.name}</span>
                <span>
                  <Icon icon="external" className="size-3" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  );
}
